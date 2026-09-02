// fix-pronouns.js — deterministic he/him/his -> she/her repair for female enemies.
//
//   node tools/fix-pronouns.js <lane> <ownerKey> [<ownerKey> ...] [--write]
//
// WHY THIS IS SAFE TO DO MECHANICALLY
// This corpus addresses the OWNER in second person ("you", "your"). A third-person
// pronoun therefore refers to the ENEMY. So when the enemy is female per
// champ-data/champ-gender.js, every he/him/his in that matchup's prose is wrong, and the
// correction needs no judgement:
//
//   "break every rule he learned"        -> "...she learned"
//   "out-angle him with dash-charm picks" -> "...her..."
//   "Q through his last-hit"              -> "...her last-hit"
//
// 1,251 such fields shipped across five champions because the templates were authored for
// a male enemy and only the champion NAME was substituted. No model is needed to fix that,
// which matters: this runs at zero agent cost.
//
// LIMITS
//   - Only touches matchups whose enemy is female. Never rewrites in the other direction.
//   - Standalone possessive "his" (as in "that shield is his") would want "hers", not
//     "her". It does not occur in this corpus's voice; determiner use is what appears.
//   - Emits proposals for tools/apply-proposals.js rather than writing champ-data, so the
//     stale-`before` check, the length band and chart atomicity all still apply.
'use strict';
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const rest = args.filter(a => !a.startsWith('--'));
const LANE = rest[0];
const OWNERS = rest.slice(1);
if (!LANE || !OWNERS.length) {
  console.error('usage: node tools/fix-pronouns.js <lane> <ownerKey> [...] [--write]');
  process.exit(2);
}
const REPO = path.resolve(__dirname, '..');
const LANES = {
  top: ['champ-data/content', 'champ-data', ''],
  mid: ['champ-data/content/mid', 'champ-data/mid', '_mid'],
  bot: ['champ-data/content/bot', 'champ-data/bot', '_bot'],
  support: ['champ-data/content/sup', 'champ-data/sup', '_sup'],
};
const [CONTENT_DIR, FULL_DIR, SUFFIX] = LANES[LANE] || [];
if (!CONTENT_DIR) { console.error('unknown lane: ' + LANE); process.exit(2); }

const gw = {};
new Function('window', fs.readFileSync(path.join(REPO, 'champ-data/champ-gender.js'), 'utf8'))(gw);

// Case-preserving, word-boundary swap. Ordered longest-first so "himself" is not
// half-eaten by the "him" rule.
// ALL-CAPS forms are included because this corpus emphasises with capitals — five HIMs
// survived a first pass that only covered lowercase and Title case.
const RULES = [
  [/\bHIMSELF\b/g, 'HERSELF'], [/\bhimself\b/g, 'herself'], [/\bHimself\b/g, 'Herself'],
  [/\bHE'S\b/g, "SHE'S"], [/\bhe's\b/g, "she's"], [/\bHe's\b/g, "She's"],
  [/\bHE’S\b/g, 'SHE’S'], [/\bhe’s\b/g, 'she’s'], [/\bHe’s\b/g, 'She’s'],
  [/\bHIS\b/g, 'HER'], [/\bhis\b/g, 'her'], [/\bHis\b/g, 'Her'],
  [/\bHIM\b/g, 'HER'], [/\bhim\b/g, 'her'], [/\bHim\b/g, 'Her'],
  [/\bHE\b/g, 'SHE'], [/\bhe\b/g, 'she'], [/\bHe\b/g, 'She'],
];
const swap = s => RULES.reduce((acc, [re, to]) => acc.replace(re, to), s);
const hasMale = s => /\b(he|him|his|himself|he's|he’s)\b/i.test(s);

// Writable paths only — must match apply-proposals.js WRITABLE_FULL / WRITABLE_CONTENT.
const FULL_SCALARS = ['tldr', 'winCon', 'enemyWin', 'tradeGood', 'tradeBad', 'ahead', 'loading'];
const CONTENT_SCALARS = ['early', 'mid', 'late'];

function loadFull(file, ownerKey) {
  const w = {};
  new Function('window', fs.readFileSync(file, 'utf8'))(w);
  return (w.CHAMP_FULL || {})[ownerKey] || null;
}
function loadContent(file, ownerKey) {
  const w = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
  new Function('window', fs.readFileSync(file, 'utf8'))(w);
  const by = {};
  for (const c of w.MC_CONTENT_EXTRA) if (c.a === ownerKey) by[c.b] = c;
  return by;
}

let totalEdits = 0, totalMatchups = 0, totalFiles = 0;

for (const ownerKey of OWNERS) {
  const base = ownerKey.replace(new RegExp(SUFFIX + '$'), '');
  const fFile = path.join(REPO, FULL_DIR, base + '.full.js');
  const cFile = path.join(REPO, CONTENT_DIR, base + '.js');
  if (!fs.existsSync(fFile)) { console.error(`  SKIP ${ownerKey}: no ${fFile}`); continue; }

  const FULL = loadFull(fFile, ownerKey);
  const CONTENT = fs.existsSync(cFile) ? loadContent(cFile, ownerKey) : {};
  if (!FULL) { console.error(`  SKIP ${ownerKey}: no CHAMP_FULL entry`); continue; }

  let champEdits = 0, champMatchups = 0;

  for (const [enemy, entry] of Object.entries(FULL)) {
    if (!gw.MC_IS_FEMALE(enemy)) continue;
    if (!entry || typeof entry !== 'object') continue;
    const edits = [];
    const push = (layer, p, before) => {
      if (typeof before !== 'string' || !hasMale(before)) return;
      const after = swap(before);
      if (after !== before) edits.push({ layer, path: p, before, after });
    };

    for (const f of FULL_SCALARS) push('full', f, entry[f]);
    for (const [k, v] of Object.entries(entry.breakdown || {})) push('full', 'breakdown.' + k, v);
    (entry.phases || []).forEach((p, i) => p && push('full', `phases[${i}].why`, p.why));
    for (const arr of ['dosFull', 'dontsFull']) {
      (entry[arr] || []).forEach((d, i) => {
        if (!d) return;
        push('full', `${arr}[${i}].t`, d.t);
        push('full', `${arr}[${i}].d`, d.d);
      });
    }
    (entry.report || []).forEach((r, i) => {
      if (!r) return;
      push('full', `report[${i}].h`, r.h);
      push('full', `report[${i}].t`, r.t);
    });
    if (entry.focus && typeof entry.focus.text === 'string') push('full', 'focus.text', entry.focus.text);

    const c = CONTENT[enemy];
    if (c) {
      for (const f of CONTENT_SCALARS) push('content', f, c[f]);
      (c.whys || []).forEach((v, i) => push('content', `whys[${i}]`, v));
      (c.spikes || []).forEach((s, i) => s && push('content', `spikes[${i}].text`, s.text));
      ((c.wants && c.wants.you) || []).forEach((v, i) => push('content', `wants.you[${i}]`, v));
      // wants.foe[] is DELIBERATELY EXCLUDED. Its voice is inverted: it is written from
      // the FOE's point of view, so "you" is the foe and a third-person pronoun refers to
      // the OWNER. "his Heroic Swing" in akshan vs lillia is Akshan's own ability and is
      // correctly male. An earlier version of this tool swept it anyway and wrongly
      // flipped 57 owner pronouns in top and 1 in mid; all were reverted.
      // Do not re-add it — the two referents cannot be told apart mechanically here.
    }

    if (!edits.length) continue;
    champEdits += edits.length; champMatchups++;

    if (WRITE) {
      const dest = path.join(REPO, 'audits', LANE, `${ownerKey}__${enemy}__pronoun.json`);
      fs.writeFileSync(dest, JSON.stringify({
        ownerKey, enemy, lane: LANE,
        audit: [{
          point: 4, status: 'needs-correction',
          whatIsWrong: `${enemy} is she/her, but ${edits.length} field(s) in this matchup use he/him/his for her.`,
          why: 'The prose addresses the owner in second person, so third-person pronouns refer to the enemy. These templates were authored for a male enemy and only the champion name was substituted, leaving the pronouns wrong. champ-data/champ-gender.js is the authority.',
          corrected: `${edits.length} pronoun field(s) corrected to she/her`,
          confidence: 'High',
          sources: ['champ-data/champ-gender.js'],
        }],
        edits,
        notes: 'PRONOUN REPAIR — generated by tools/fix-pronouns.js, no model in the path. Word-boundary, case-preserving swap on female-enemy matchups only.',
      }, null, 1));
      totalFiles++;
    }
  }

  console.log(`  ${ownerKey.padEnd(18)} ${String(champMatchups).padStart(3)} matchups, ${String(champEdits).padStart(4)} fields`);
  totalEdits += champEdits; totalMatchups += champMatchups;
}

console.log(`\n${totalMatchups} matchups, ${totalEdits} fields` + (WRITE ? `, ${totalFiles} proposal files written` : ' (dry run — pass --write)'));
if (WRITE) console.log(`then: node tools/apply-proposals.js ${LANE} --write --champ <ownerKey>`);

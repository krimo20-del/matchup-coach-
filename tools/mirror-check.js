// mirror-check.js — every matchup exists twice (A vs B and B vs A). This finds every
// place the two directions contradict each other. Deterministic, no model.
//
//   node tools/mirror-check.js            # all lanes
//   node tools/mirror-check.js top        # one lane
//   node tools/mirror-check.js top --champ nasus
//
// The rules a mirrored pair must satisfy, per stage of the 7-stage level chart:
//   RATING   A says 3/10 at Level 1  =>  B must say 7/10 at Level 1   (they sum to 10)
//   SIDE     both pages must name the SAME champion as ahead at that stage
//   WIN[]    same, in the content layer
//   WINRATE  A-vs-B% + B-vs-A% must equal 100
//   DIFF     the difficulty labels must be a legal pair (a matchup cannot be HARD for
//            both sides). Allowed: FAV/HARD, FAV/TRICKY, EVEN/EVEN, EVEN/TRICKY,
//            TRICKY/TRICKY, MIRROR/MIRROR.
//
// Writes audits/_mirror-conflicts.json so a fixing pass can consume it.
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const LANE = args[0] && !args[0].startsWith('--') ? args[0] : null;
const ci = args.indexOf('--champ');
const ONLY = ci > -1 ? args[ci + 1] : null;

const LANES = [
  { key: 'top', dir: 'champ-data/content', full: 'champ-data', suffix: '' },
  { key: 'mid', dir: 'champ-data/content/mid', full: 'champ-data/mid', suffix: '_mid' },
  { key: 'bot', dir: 'champ-data/content/bot', full: 'champ-data/bot', suffix: '_bot' },
  { key: 'support', dir: 'champ-data/content/sup', full: 'champ-data/sup', suffix: '_sup' },
].filter(L => !LANE || L.key === LANE);

const STAGES = ['Level 1', 'Level 2', 'Level 3', 'Levels 4-5', 'Level 6', 'First item', 'Two+ items'];
const norm = s => String(s == null ? '' : s).toLowerCase().replace(/[^a-z0-9]/g, '');
const LEGAL_DIFF = new Set(['fav|hard', 'hard|fav', 'fav|tricky', 'tricky|fav', 'even|even',
  'even|tricky', 'tricky|even', 'tricky|tricky', 'mirror|mirror']);

function ratingNum(r) {
  const m = /^\s*([\d.]+)\s*\/\s*10\s*$/.exec(String(r || ''));
  return m ? parseFloat(m[1]) : null;
}

const conflicts = [];
let pairsChecked = 0;

for (const L of LANES) {
  if (!fs.existsSync(L.dir)) continue;

  // load every champion in the lane once
  const champs = {};
  for (const file of fs.readdirSync(L.dir).filter(f => f.endsWith('.js'))) {
    const slug = file.replace('.js', ''), key = slug + L.suffix;
    const w = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
    try { new Function('window', fs.readFileSync(path.join(L.dir, file), 'utf8'))(w); } catch (e) { continue; }
    const entries = {};
    for (const c of w.MC_CONTENT_EXTRA) if (c.a === key) entries[c.b] = c;
    if (!Object.keys(entries).length) continue;

    let full = {};
    const fp = path.join(L.full, slug + '.full.js');
    if (fs.existsSync(fp)) {
      const fw = {};
      try { new Function('window', fs.readFileSync(fp, 'utf8'))(fw); full = (fw.CHAMP_FULL || {})[key] || {}; } catch (e) {}
    }
    champs[slug] = { slug, key, entries, full, wr: w.MC_WR_TABLES[key] || {}, games: w.MC_REAL_GAMES[key] || {} };
  }

  const slugs = Object.keys(champs);
  for (const a of slugs) {
    if (ONLY && a !== ONLY && champs[ONLY] === undefined) continue;
    for (const b of slugs) {
      if (a >= b) continue;                    // each unordered pair once
      if (ONLY && a !== ONLY && b !== ONLY) continue;
      const A = champs[a], B = champs[b];
      const ab = A.entries[b], ba = B.entries[a];
      if (!ab || !ba) continue;                // only pairs that exist in both directions
      pairsChecked++;
      const issues = [];

      // --- win rates must sum to 100 ---
      const wa = A.wr[b], wb = B.wr[a];
      if (typeof wa === 'number' && typeof wb === 'number' && Math.abs(wa + wb - 100) > 0.15) {
        issues.push({ kind: 'winrate-sum', detail: `${a} vs ${b} = ${wa}%, ${b} vs ${a} = ${wb}% (sum ${(wa + wb).toFixed(2)}, must be 100)` });
      }

      // --- content win[] must name the same champion each stage ---
      if (Array.isArray(ab.win) && Array.isArray(ba.win) && ab.win.length === 7 && ba.win.length === 7) {
        for (let i = 0; i < 7; i++) {
          const x = norm(ab.win[i]), y = norm(ba.win[i]);
          const neutral = v => ['skill', 'even', 'mirror'].includes(v);
          if (neutral(x) && neutral(y)) continue;
          if (neutral(x) !== neutral(y) || (!neutral(x) && x !== y)) {
            issues.push({ kind: 'win-side', stage: STAGES[i], detail: `${a} page says "${ab.win[i]}", ${b} page says "${ba.win[i]}" — both describe the same fight` });
          }
        }
      }

      // --- full phases: side must agree, rating must sum to 10 ---
      const fa = A.full[b], fb = B.full[a];
      if (fa && fb && Array.isArray(fa.phases) && Array.isArray(fb.phases)) {
        for (let i = 0; i < Math.min(fa.phases.length, fb.phases.length, 7); i++) {
          const pa = fa.phases[i], pb = fb.phases[i];
          if (!pa || !pb) continue;
          const x = norm(pa.side), y = norm(pb.side);
          const neutral = v => ['skill', 'even', 'mirror'].includes(v);
          if (!(neutral(x) && neutral(y)) && (neutral(x) !== neutral(y) || (!neutral(x) && x !== y))) {
            issues.push({ kind: 'phase-side', stage: STAGES[i], detail: `${a} page: side="${pa.side}", ${b} page: side="${pb.side}"` });
          }
          const ra = ratingNum(pa.rating), rb = ratingNum(pb.rating);
          if (ra != null && rb != null && Math.abs(ra + rb - 10) > 0.01) {
            issues.push({ kind: 'rating-sum', stage: STAGES[i], detail: `${a} says ${pa.rating}, ${b} says ${pb.rating} — must sum to 10 (e.g. 3/10 opposite 7/10)` });
          }
        }
        // --- difficulty labels must be a legal pair ---
        const da = norm(fa.diff), db = norm(fb.diff);
        if (da && db && !LEGAL_DIFF.has(`${da}|${db}`)) {
          issues.push({ kind: 'diff-pair', detail: `${a} says "${fa.diff}", ${b} says "${fb.diff}" — not a legal mirrored pair` });
        }
      }

      // --- content win[] vs full phases[] within the SAME page ---
      for (const [who, ent, fu] of [[a, ab, fa], [b, ba, fb]]) {
        if (!fu || !Array.isArray(fu.phases) || !Array.isArray(ent.win)) continue;
        for (let i = 0; i < Math.min(7, fu.phases.length, ent.win.length); i++) {
          const x = norm(ent.win[i]), y = norm(fu.phases[i] && fu.phases[i].side);
          const neutral = v => ['skill', 'even', 'mirror'].includes(v);
          if (!(neutral(x) && neutral(y)) && (neutral(x) !== neutral(y) || (!neutral(x) && x !== y))) {
            issues.push({ kind: 'layer-disagreement', stage: STAGES[i], detail: `${who}'s own two layers disagree: win[]="${ent.win[i]}" vs phases[].side="${fu.phases[i].side}"` });
          }
        }
      }

      if (issues.length) conflicts.push({ lane: L.key, a, b, issues });
    }
  }
}

fs.mkdirSync('audits', { recursive: true });
fs.writeFileSync(path.join('audits', '_mirror-conflicts.json'), JSON.stringify(conflicts, null, 1));

const byKind = {};
let total = 0;
for (const c of conflicts) for (const i of c.issues) { byKind[i.kind] = (byKind[i.kind] || 0) + 1; total++; }

console.log(`=== mirror consistency ${LANE ? '(' + LANE + ')' : '(all lanes)'}${ONLY ? ' champ=' + ONLY : ''} ===`);
console.log(`mirrored pairs checked : ${pairsChecked}`);
console.log(`pairs with conflicts   : ${conflicts.length}`);
console.log(`total contradictions   : ${total}`);
console.log('');
Object.entries(byKind).sort((x, y) => y[1] - x[1]).forEach(([k, n]) => console.log(String(n).padStart(6) + '  ' + k));
if (conflicts.length) {
  console.log('\n--- first 12 conflicting pairs ---');
  conflicts.slice(0, 12).forEach(c => {
    console.log(`\n  ${c.a} <-> ${c.b}  (${c.issues.length})`);
    c.issues.slice(0, 3).forEach(i => console.log(`    [${i.kind}${i.stage ? ' @ ' + i.stage : ''}] ${i.detail}`));
  });
}
console.log(`\nwritten to audits/_mirror-conflicts.json`);

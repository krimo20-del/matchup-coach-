#!/usr/bin/env node
/**
 * build-briefs.js — one prepared file per matchup, so an agent needs ONE read, not six.
 *
 * WHY
 *   Measured 2026-08-10 on the darius run: 7.2 tool calls per proposal, of which exactly 1
 *   was the Write. The other ~6 were ls / cat / node -e re-parsing the same files.
 *   The commands themselves are cheap — a node spawn is 67ms and reading a kit is 33ms —
 *   so execution was never the cost. Each tool call is a MODEL ROUND TRIP (~10s), and six
 *   of them is ~60s per matchup. That is the whole reason throughput sits near 60-150/hr.
 *
 *   So: do all the gathering here, deterministically, once. The agent reads one file and
 *   spends its turns on judgement instead of fetching.
 *
 * WHAT EACH BRIEF CONTAINS
 *   - both kits, trimmed to what the audit actually uses (names, cooldowns, range, flags)
 *   - the packet row for the matchup (winRate, games, levelChart, defects, suspectNames)
 *   - the _missing interactions that apply to THIS matchup
 *   - whether the mirror (enemy__owner) is already audited, and its findings
 *   - THE EXACT CURRENT TEXT of every writable field
 *
 *   That last item matters twice over: it removes the reads an agent would make to find
 *   `before` strings, and it removes the STALE rejections caused by retyping them. mel lost
 *   5 matchups and 12 edits to "disk differs from before".
 *
 * Usage: node tools/build-briefs.js <lane> --champ <ownerKey>
 * Output: tools/audit-run/briefs/<lane>/<ownerKey>__<enemy>.json
 */

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const LANE_DIR = {
  top: ['champ-data', 'champ-data/content'],
  mid: ['champ-data/mid', 'champ-data/content/mid'],
  bot: ['champ-data/bot', 'champ-data/content/bot'],
  sup: ['champ-data/sup', 'champ-data/content/sup'],
};

const args = process.argv.slice(2);
const lane = args.find(a => LANE_DIR[a]);
const ci = args.indexOf('--champ');
const only = ci === -1 ? null : args[ci + 1];
if (!lane || !only) {
  console.error('usage: node tools/build-briefs.js <top|mid|bot|sup> --champ <ownerKey>');
  process.exit(1);
}
const [FULL_DIR, CONTENT_DIR] = LANE_DIR[lane];
const slug = k => k.replace(/_(mid|bot|sup)$/, '');

const readJSON = p => { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; } };

// Kits are the authority on names and cooldowns. Keep only the fields the audit uses —
// a full kit dump would just move the token cost rather than remove it.
function trimKit(k) {
  if (!k) return null;
  return {
    name: k.name,
    abilities: (k.abilities || []).map(a => ({
      slot: a.slot, name: a.name, cd: a.cooldown || a.cd || null,
      range: a.range || null, cost: a.cost || null,
      flags: a.flags || [],
      // 400 chars of Riot text was 2.1KB per brief. 300 keeps the mechanics sentence —
      // which is where the real interactions live — and drops the scaling tail, which the
      // audit never quotes.
      text: (a.description || a.text || '').slice(0, 300),
    })),
  };
}

function loadWindow(file, seed) {
  const w = seed || {};
  try { new Function('window', fs.readFileSync(file, 'utf8'))(w); } catch { return null; }
  return w;
}

const ownerSlug = slug(only);
const kitDir = path.join(REPO, 'champ-data/_kits');
const ownerKit = trimKit(readJSON(path.join(kitDir, ownerSlug + '.json')));

const packet = readJSON(path.join(REPO, 'tools/audit-run/packets', only + '.json')) || {};
const packetByEnemy = {};
for (const e of (packet.entries || [])) packetByEnemy[e.enemy] = e;

const missing = readJSON(path.join(kitDir, '_missing', only + '.json')) || {};

const contentFile = path.join(REPO, CONTENT_DIR, ownerSlug + '.js');
const fullFile = path.join(REPO, FULL_DIR, ownerSlug + '.full.js');
const wc = loadWindow(contentFile, { MC_CONTENT_EXTRA: [], MC_WR_TABLES: {}, MC_REAL_GAMES: {}, __mcLoaded: {} });
const wf = loadWindow(fullFile, {});
if (!wc || !wf) { console.error('could not load champion files'); process.exit(1); }

const games = wc.MC_REAL_GAMES[only] || {};
const contentByEnemy = {};
for (const c of wc.MC_CONTENT_EXTRA) if (c.a === only) contentByEnemy[c.b] = c;
const fullEntries = (wf.CHAMP_FULL && wf.CHAMP_FULL[only]) || {};

const outDir = path.join(REPO, 'tools/audit-run/briefs', lane);
fs.mkdirSync(outDir, { recursive: true });

// Exact current strings for every writable path. The agent copies these into `before`
// verbatim rather than reading the file and retyping them.
function currentFull(entry) {
  if (!entry) return null;
  const out = {};
  for (const f of ['tldr', 'winCon', 'enemyWin', 'diff', 'tone', 'diffRating', 'carryRating',
    'tradeGood', 'tradeBad', 'ahead', 'loading']) if (entry[f] !== undefined) out[f] = entry[f];
  if (entry.focus && entry.focus.text !== undefined) out['focus.text'] = entry.focus.text;
  (entry.phases || []).forEach((p, i) => {
    if (!p) return;
    for (const k of ['why', 'side', 'rating', 'label']) if (p[k] !== undefined) out[`phases[${i}].${k}`] = p[k];
  });
  for (const [k, v] of Object.entries(entry.breakdown || {})) out[`breakdown.${k}`] = v;
  for (const arr of ['dosFull', 'dontsFull']) (entry[arr] || []).forEach((x, i) => {
    if (!x) return;
    if (x.t !== undefined) out[`${arr}[${i}].t`] = x.t;
    if (x.d !== undefined) out[`${arr}[${i}].d`] = x.d;
  });
  (entry.report || []).forEach((r, i) => {
    if (!r) return;
    if (r.h !== undefined) out[`report[${i}].h`] = r.h;
    if (r.t !== undefined) out[`report[${i}].t`] = r.t;
  });
  return out;
}
function currentContent(c) {
  if (!c) return null;
  const out = {};
  (c.win || []).forEach((v, i) => out[`win[${i}]`] = v);
  (c.whys || []).forEach((v, i) => out[`whys[${i}]`] = v);
  (c.spikes || []).forEach((s, i) => {
    if (!s) return;
    if (s.text !== undefined) out[`spikes[${i}].text`] = s.text;
    if (s.when !== undefined) out[`spikes[${i}].when`] = s.when;
  });
  for (const f of ['early', 'mid', 'late']) if (c[f] !== undefined) out[f] = c[f];
  ((c.wants && c.wants.you) || []).forEach((v, i) => out[`wants.you[${i}]`] = v);
  ((c.wants && c.wants.foe) || []).forEach((v, i) => out[`wants.foe[${i}]`] = v);
  return out;
}

// ---- pre-computed mechanical defects, per matchup -------------------------------------
// A tool call is a MODEL ROUND TRIP (~10s) — that is the whole economics of this pipeline
// and the reason this file exists. Making agents DISCOVER these by running
// tools/matchup-lint.js and iterating cost several round trips per champion. Everything
// that linter finds is derivable RIGHT HERE from currentText, deterministically, for free.
// So hand the agent the exact field list and it fixes them inside the proposal it was
// already going to write: zero extra round trips, same result.
const genderW = {};
new Function('window', fs.readFileSync(path.join(REPO, 'champ-data/champ-gender.js'), 'utf8'))(genderW);
const MALE_PRON = /\b(he|him|his)\b/i;
const ARTIFACT = /<[A-Za-z][A-Za-z ]{0,20}>/;
const PLACEHOLDER = /\b[A-Z][\w'’-]*(?:'s)?-(?:equivalent|type|style|like)\b|\bequivalent items\b/i;
const HEDGE = /\b(generally speaking|generally|typically|usually|tends to|more often than not)\b/i;
const MAGNITUDE = /\b(halves|doubles|triples|negates|nullifies)\s+(your|his|her|their|the|what|every|all)\b/i;

function lintMatchup(enemy, cur) {
  const out = [];
  if (!cur || !cur.full) return out;
  const female = genderW.MC_IS_FEMALE(enemy);
  const tg = String(cur.full.tradeGood || ''), tb = String(cur.full.tradeBad || '');
  for (const [field, val] of Object.entries(cur.full)) {
    if (typeof val !== 'string' || !val.trim()) continue;
    if (female && MALE_PRON.test(val)) {
      out.push({ code: 'MISGENDER', field, detail: `"${(val.match(MALE_PRON) || [])[0]}" — ${enemy} is she/her` });
    }
    if (ARTIFACT.test(val)) out.push({ code: 'DISPLAY_ARTIFACT', field, detail: (val.match(ARTIFACT) || [])[0] });
    if (PLACEHOLDER.test(val)) out.push({ code: 'PLACEHOLDER_PHRASING', field, detail: (val.match(PLACEHOLDER) || [])[0] });
    if (HEDGE.test(val)) out.push({ code: 'HEDGING', field, detail: (val.match(HEDGE) || [])[0] });
    if (MAGNITUDE.test(val) && !/\d/.test(val)) {
      out.push({ code: 'UNSUPPORTED_MAGNITUDE', field, detail: (val.match(MAGNITUDE) || [])[0] + ' with no number' });
    }
    if (/^(dosFull|dontsFull)\[\d+\]\.d$/.test(field) && val.length >= 25) {
      if (val === tg) out.push({ code: 'COPY_PASTE_BLEED', field, detail: 'verbatim tradeGood under an unrelated title' });
      else if (val === tb) out.push({ code: 'COPY_PASTE_BLEED', field, detail: 'verbatim tradeBad under an unrelated title' });
    }
  }
  const cd = cur.full['breakdown.cooldowns'];
  if (typeof cd === 'string' && cd.trim() && !/\d/.test(cd)) {
    out.push({ code: 'COOLDOWN_NO_DIGIT', field: 'breakdown.cooldowns', detail: 'no number in the cooldowns field' });
  }
  return out;
}

let written = 0, skipped = 0, deferred = 0, lintTotal = 0;
for (const enemy of Object.keys(contentByEnemy)) {
  if (!games[enemy]) { deferred++; continue; }             // 0 games = deferred, no brief
  const dest = path.join(outDir, `${only}__${enemy}.json`);
  const proposal = path.join(REPO, 'audits', lane, `${only}__${enemy}.json`);
  if (fs.existsSync(proposal)) { skipped++; continue; }     // already audited

  const mirrorPath = path.join(REPO, 'audits', lane, `${enemy}__${ownerSlug}.json`);
  const mirror = readJSON(mirrorPath);

  const applicable = [];
  for (const [k, v] of Object.entries(missing)) {
    const blob = JSON.stringify(v);
    if (k === enemy || blob.includes(`"${enemy}"`)) applicable.push({ key: k, data: v });
  }

  const cur = { full: currentFull(fullEntries[enemy]), content: currentContent(contentByEnemy[enemy]) };
  const lint = lintMatchup(enemy, cur);
  lintTotal += lint.length;

  fs.writeFileSync(dest, JSON.stringify({
    ownerKey: only, enemy, lane,
    games: games[enemy],
    packet: packetByEnemy[enemy] || null,
    ownerKit,
    enemyKit: trimKit(readJSON(path.join(kitDir, enemy + '.json'))),
    missingInteractions: applicable.slice(0, 12),
    mirrorAlreadyAudited: !!mirror,
    // Was 7.7KB — 27% of the brief — carrying six full audit records with whatIsWrong/why/
    // corrected in longhand. The agent only needs the CONCLUSIONS so the two directions
    // agree; the full mirror file is still on disk if it ever needs the reasoning.
    mirrorFindings: mirror ? {
      keyPoints: (mirror.audit || []).filter(a => [2, 3, 4].includes(a.point))
        .slice(0, 4).map(a => ({ point: a.point, corrected: String(a.corrected || '').slice(0, 300) })),
      notes: String(mirror.notes || '').slice(0, 400),
    } : null,
    currentText: cur,
    // Pre-computed, exact, and NOT optional: every entry names a field that is wrong right
    // now. Fix all of them in this matchup's proposal. Do not run a linter to rediscover
    // them — that is what this list replaces.
    lintFindings: lint,
  }, null, 1));
  written++;
}

console.log(`${only} (${lane}): ${written} briefs written, ${skipped} already audited, ${deferred} deferred (0 games)`);
console.log(`   pre-computed lint findings embedded: ${lintTotal}`);
console.log(`-> tools/audit-run/briefs/${lane}/`);

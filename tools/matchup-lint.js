// matchup-lint.js — mechanical defect detector for one champion's matchup data.
//
//   node tools/matchup-lint.js <ownerKey> <fullFile> <contentFile> [--json] [--max N]
//
// WHY THIS EXISTS
// regression-check.js answers "did this audit BREAK something that worked?". It is
// baseline-relative and deliberately blind to defects that were already there. That is
// correct for a ship gate, but it means a champion can ship green while carrying every
// fault the QA agents kept reporting by hand: female enemies called "he", a cooldowns
// field with no number in it, a Do's bullet whose body is the generic trade line pasted
// under an unrelated title, "<Ability> (Stun)" leaking into prose.
//
// This tool is ABSOLUTE, not baseline-relative. It reports the current state of the file
// regardless of who caused it. It is INFORMATION by default; the runner decides which
// classes block a ship. Every finding names the exact field so it can be fixed with a
// proposal rather than hunted for.
//
// FALSE POSITIVES: the pronoun check assumes this data's voice — the owner is addressed
// as "you", so a third-person pronoun refers to the ENEMY. That holds across the corpus
// but is not a law; a line that genuinely discusses the jungler will read as a miss.
'use strict';
const fs = require('fs');
const path = require('path');

const [ownerKey, fullFile, contentFile] = process.argv.slice(2).filter(a => !a.startsWith('--'));
const AS_JSON = process.argv.includes('--json');
const mi = process.argv.indexOf('--max');
const MAX = mi > -1 ? +process.argv[mi + 1] : 6;
if (!ownerKey || !fullFile) {
  console.error('usage: node tools/matchup-lint.js <ownerKey> <fullFile> <contentFile> [--json] [--max N]');
  process.exit(2);
}
const REPO = path.resolve(__dirname, '..');
const rel = p => path.isAbsolute(p) ? p : path.join(REPO, p);

// ---------- load ----------
function loadFull(file) {
  const w = {};
  new Function('window', fs.readFileSync(rel(file), 'utf8'))(w);
  return (w.CHAMP_FULL || {})[ownerKey] || null;
}
function loadContent(file) {
  const w = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
  new Function('window', fs.readFileSync(rel(file), 'utf8'))(w);
  const by = {};
  for (const c of w.MC_CONTENT_EXTRA) if (c.a === ownerKey) by[c.b] = c;
  return by;
}
const gw = {};
new Function('window', fs.readFileSync(path.join(REPO, 'champ-data/champ-gender.js'), 'utf8'))(gw);
const isFemale = gw.MC_IS_FEMALE;

let FULL, CONTENT;
try { FULL = loadFull(fullFile); } catch (e) { console.error('FAIL: cannot load ' + fullFile + ' — ' + e.message); process.exit(2); }
if (!FULL) { console.error(`FAIL: no CHAMP_FULL['${ownerKey}'] in ${fullFile}`); process.exit(2); }
try { CONTENT = contentFile ? loadContent(contentFile) : {}; } catch (e) { CONTENT = {}; }

// ---------- field walk ----------
const FULL_TEXT_FIELDS = ['tldr', 'winCon', 'enemyWin', 'tradeGood', 'tradeBad', 'ahead', 'loading'];
const BREAKDOWN_KEYS = ['early', 'mid', 'wave', 'cooldowns', 'trading', 'spikes', 'feeding', 'carry', 'difficulty', 'late'];

function fieldsOf(entry) {
  const out = [];
  for (const f of FULL_TEXT_FIELDS) if (typeof entry[f] === 'string') out.push([f, entry[f]]);
  for (const k of BREAKDOWN_KEYS) {
    const v = entry.breakdown && entry.breakdown[k];
    if (typeof v === 'string') out.push(['breakdown.' + k, v]);
  }
  (entry.phases || []).forEach((p, i) => { if (p && typeof p.why === 'string') out.push([`phases[${i}].why`, p.why]); });
  (entry.dosFull || []).forEach((d, i) => {
    if (d && typeof d.t === 'string') out.push([`dosFull[${i}].t`, d.t]);
    if (d && typeof d.d === 'string') out.push([`dosFull[${i}].d`, d.d]);
  });
  (entry.dontsFull || []).forEach((d, i) => {
    if (d && typeof d.t === 'string') out.push([`dontsFull[${i}].t`, d.t]);
    if (d && typeof d.d === 'string') out.push([`dontsFull[${i}].d`, d.d]);
  });
  (entry.report || []).forEach((r, i) => { if (r && typeof r.t === 'string') out.push([`report[${i}].t`, r.t]); });
  return out;
}

// ---------- findings ----------
const findings = {};
const add = (code, msg) => { (findings[code] = findings[code] || []).push(msg); };

const MALE_PRON = /\b(he|him|his)\b/i;
// "Flash Frost (Stun)" / "Apprehend (Pull)" is the AbilityName (Effect) convention used
// throughout the corpus — legitimate, not an artifact. Only an UNFILLED placeholder is.
const ARTIFACT = /<[A-Za-z][A-Za-z ]{0,20}>/;
const PLACEHOLDER = /\b[A-Z][\w'’-]*(?:'s)?-(?:equivalent|type|style|like)\b|\bequivalent items\b/i;
const HEDGE = /\b(generally speaking|generally|typically|usually|tends to|more often than not)\b/i;
// "so both halves land" is a noun. Require a verb-shaped object so only real magnitude
// claims ("halves what your combo does") are caught.
const VAGUE_MAGNITUDE = /\b(halves|doubles|triples|negates|nullifies)\s+(your|his|her|their|the|what|every|all)\b/i;

for (const [enemy, entry] of Object.entries(FULL)) {
  if (!entry || typeof entry !== 'object') continue;
  const fields = fieldsOf(entry);
  const enemyFemale = isFemale(enemy);

  for (const [fname, text] of fields) {
    if (enemyFemale && MALE_PRON.test(text)) {
      const hit = (text.match(MALE_PRON) || [])[0];
      add('MISGENDER', `${enemy}.${fname}: "${hit}" — ${enemy} is she/her`);
    }
    if (ARTIFACT.test(text)) add('DISPLAY_ARTIFACT', `${enemy}.${fname}: ${(text.match(ARTIFACT) || [])[0]}`);
    if (PLACEHOLDER.test(text)) add('PLACEHOLDER_PHRASING', `${enemy}.${fname}: ${(text.match(PLACEHOLDER) || [])[0]}`);
    if (HEDGE.test(text)) add('HEDGING', `${enemy}.${fname}: "${(text.match(HEDGE) || [])[0]}"`);
  }

  // cooldowns field with no number in it
  const cd = entry.breakdown && entry.breakdown.cooldowns;
  if (typeof cd === 'string' && cd.trim() && !/\d/.test(cd)) {
    add('COOLDOWN_NO_DIGIT', `${enemy}.breakdown.cooldowns has no number`);
  }

  // a Do/Don't body that is just the generic trade line pasted in
  const tg = String(entry.tradeGood || ''), tb = String(entry.tradeBad || '');
  for (const arr of ['dosFull', 'dontsFull']) {
    (entry[arr] || []).forEach((d, i) => {
      if (!d || typeof d.d !== 'string') return;
      if (d.d.length < 25) return;
      if (d.d === tg) add('COPY_PASTE_BLEED', `${enemy}.${arr}[${i}].d is verbatim tradeGood`);
      else if (d.d === tb) add('COPY_PASTE_BLEED', `${enemy}.${arr}[${i}].d is verbatim tradeBad`);
    });
  }

  // magnitude words that assert a ratio the kit rarely supports
  for (const [fname, text] of fields) {
    if (VAGUE_MAGNITUDE.test(text) && !/\d/.test(text)) {
      add('UNSUPPORTED_MAGNITUDE', `${enemy}.${fname}: "${(text.match(VAGUE_MAGNITUDE) || [])[0]}" with no number`);
    }
  }

  // content layer: whys[i] present where win[i] is absent, and vice versa
  const c = CONTENT[enemy];
  if (c && Array.isArray(c.win) && Array.isArray(c.whys)) {
    for (let i = 0; i < Math.max(c.win.length, c.whys.length); i++) {
      // Both sides must be coerced to boolean. Comparing a non-empty string against a
      // boolean is never equal, which fired this on every healthy row.
      const hasW = !!(c.win[i] !== undefined && String(c.win[i]).trim());
      const hasY = !!(c.whys[i] !== undefined && String(c.whys[i]).trim());
      if (hasW !== hasY) add('CHART_ROW_GAP', `${enemy} row ${i}: win=${hasW ? 'set' : 'EMPTY'} whys=${hasY ? 'set' : 'EMPTY'}`);
    }
  }
}

// ---------- template survival (structural, across this champion's matchups) ----------
const NAMES = new Set();
{
  const rw = {};
  new Function('window', fs.readFileSync(path.join(REPO, 'champ-data/rosters.js'), 'utf8'))(rw);
  Object.values(rw.ROSTERS).forEach(gs => gs.forEach(g => g.c.forEach(n => {
    NAMES.add(n.toLowerCase());
    n.toLowerCase().split(/[^a-z']+/).filter(t => t.length > 2).forEach(t => NAMES.add(t));
  })));
}
const esc = s => s.split('').map(ch => /[a-z0-9' ]/i.test(ch) ? ch : '.').join('');
const nameRe = new RegExp('\\b(' + [...NAMES].sort((a, b) => b.length - a.length).map(esc).join('|') + ')\\b', 'gi');
const skel = s => s.replace(nameRe, '~').replace(/\([^)]*\)/g, '~')
  .replace(/\b[A-Z][a-zA-Z'’-]*(\s+[A-Z][a-zA-Z'’-]*)*/g, '~')
  .replace(/\d+(\.\d+)?/g, '#').toLowerCase()
  .replace(/[^a-z#~ ]/g, '').replace(/~+/g, '~').replace(/\s+/g, ' ').trim();

const TEMPLATE_THRESHOLD = 0.60;   // a field repeating one skeleton across >60% of matchups
const perField = {};
for (const entry of Object.values(FULL)) {
  if (!entry || typeof entry !== 'object') continue;
  for (const [fname, text] of fieldsOf(entry)) {
    const key = fname.replace(/\[\d+\]/g, '[N]');
    const m = (perField[key] = perField[key] || { n: 0, sk: {} });
    m.n++;
    const k = skel(text);
    m.sk[k] = (m.sk[k] || 0) + 1;
  }
}
for (const [fname, m] of Object.entries(perField)) {
  if (m.n < 10) continue;
  const top = Object.entries(m.sk).sort((a, b) => b[1] - a[1])[0];
  if (!top) continue;
  const share = top[1] / m.n;
  if (share > TEMPLATE_THRESHOLD) {
    add('TEMPLATE_SURVIVAL', `${fname}: one phrasing covers ${top[1]}/${m.n} (${(share * 100).toFixed(0)}%)`);
  }
}

// ---------- report ----------
const ORDER = ['MISGENDER', 'DISPLAY_ARTIFACT', 'PLACEHOLDER_PHRASING', 'COPY_PASTE_BLEED',
  'COOLDOWN_NO_DIGIT', 'UNSUPPORTED_MAGNITUDE', 'CHART_ROW_GAP', 'HEDGING', 'TEMPLATE_SURVIVAL'];
const counts = {};
ORDER.forEach(c => counts[c] = (findings[c] || []).length);
const total = Object.values(counts).reduce((a, b) => a + b, 0);

if (AS_JSON) {
  console.log(JSON.stringify({ ownerKey, matchups: Object.keys(FULL).length, counts, findings }, null, 1));
  process.exit(0);
}
console.log(`${ownerKey}: ${Object.keys(FULL).length} matchups — ${total} findings`);
for (const code of ORDER) {
  const list = findings[code] || [];
  if (!list.length) continue;
  console.log(`\n  ${code} (${list.length})`);
  list.slice(0, MAX).forEach(m => console.log('    - ' + m));
  if (list.length > MAX) console.log(`    ... and ${list.length - MAX} more`);
}
if (!total) console.log('\n  clean — no mechanical defects found');
process.exit(0);

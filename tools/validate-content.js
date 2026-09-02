// validate-content.js — structural guard for champ-data/content/**.
// Run after ANY edit to a content file. Exits non-zero and prints the reason
// if the file is corrupt, lost entries, or drifted from its win-rate tables.
//
//   node tools/validate-content.js                          # every lane
//   node tools/validate-content.js champ-data/content/mid/azir.js
//
// This exists because these files hold months of hand-authored matchup work and
// a single bad regex rewrite is unrecoverable outside git.
const fs = require('fs');
const path = require('path');

const LANES = [
  { key: 'top', dir: 'champ-data/content', suffix: '' },
  { key: 'mid', dir: 'champ-data/content/mid', suffix: '_mid' },
  { key: 'bot', dir: 'champ-data/content/bot', suffix: '_bot' },
  { key: 'support', dir: 'champ-data/content/sup', suffix: '_sup' },
];
const REQUIRED_STR = ['early', 'mid', 'late'];
const STAGES = 7, SPIKES = 4;

function laneOf(file) {
  const p = file.replace(/\\/g, '/');
  // longest dir match wins, so .../content/mid never matches .../content
  return LANES.slice().sort((a, b) => b.dir.length - a.dir.length)
    .find(L => p.startsWith(L.dir + '/') && p.slice(L.dir.length + 1).indexOf('/') === -1);
}

function load(file) {
  const w = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
  new Function('window', fs.readFileSync(file, 'utf8'))(w);
  return w;
}

function checkFile(file) {
  const errs = [];
  const L = laneOf(file);
  if (!L) return [`${file}: not inside a known content directory`];

  let w;
  try { w = load(file); }
  catch (e) { return [`${file}: FAILED TO PARSE — ${e.message}`]; }

  const key = path.basename(file, '.js') + L.suffix;
  const entries = w.MC_CONTENT_EXTRA.filter(c => c.a === key);
  if (!entries.length) return [`${file}: no entries with a="${key}" — the file no longer contributes anything`];

  const wr = w.MC_WR_TABLES[key] || {};
  const seen = new Set();

  for (const c of entries) {
    const at = `${file} [${key} vs ${c.b}]`;
    if (!c.b) { errs.push(`${at}: missing "b" (enemy slug)`); continue; }
    if (seen.has(c.b)) errs.push(`${at}: DUPLICATE entry for this enemy`);
    seen.add(c.b);

    if (!Array.isArray(c.win) || c.win.length !== STAGES) errs.push(`${at}: win[] must have ${STAGES} stages, found ${c.win ? c.win.length : 'none'}`);
    if (!Array.isArray(c.whys) || c.whys.length !== STAGES) errs.push(`${at}: whys[] must have ${STAGES} entries (one per stage), found ${c.whys ? c.whys.length : 'none'}`);
    if (!Array.isArray(c.spikes) || c.spikes.length !== SPIKES) errs.push(`${at}: spikes[] must have ${SPIKES} entries, found ${c.spikes ? c.spikes.length : 'none'}`);
    else c.spikes.forEach((s, i) => {
      if (!s || typeof s.when !== 'string' || !s.when.trim()) errs.push(`${at}: spikes[${i}] missing "when" label`);
      if (!s || typeof s.text !== 'string' || !s.text.trim()) errs.push(`${at}: spikes[${i}] missing "text"`);
    });

    if (!c.wants || !Array.isArray(c.wants.you) || !Array.isArray(c.wants.foe)) errs.push(`${at}: wants.you / wants.foe must both be arrays`);
    else {
      if (!c.wants.you.length) errs.push(`${at}: wants.you is empty`);
      if (!c.wants.foe.length) errs.push(`${at}: wants.foe is empty`);
      [...c.wants.you, ...c.wants.foe].forEach((t, i) => { if (typeof t !== 'string' || !t.trim()) errs.push(`${at}: wants entry ${i} is empty`); });
    }

    for (const k of REQUIRED_STR) if (typeof c[k] !== 'string' || !c[k].trim()) errs.push(`${at}: "${k}" prose is missing or empty`);
    (c.whys || []).forEach((t, i) => { if (typeof t !== 'string' || !t.trim()) errs.push(`${at}: whys[${i}] is empty`); });

    if (wr[c.b] === undefined) errs.push(`${at}: has content but no entry in MC_WR_TABLES.${key} — the page will render without a win rate`);
  }

  for (const b of Object.keys(wr)) if (!seen.has(b)) errs.push(`${file}: MC_WR_TABLES.${key} lists "${b}" but there is no matchup entry for it`);
  return errs;
}

const args = process.argv.slice(2);
let files = args;
if (!files.length) {
  files = [];
  for (const L of LANES) {
    if (!fs.existsSync(L.dir)) continue;
    for (const f of fs.readdirSync(L.dir)) if (f.endsWith('.js')) files.push(L.dir + '/' + f);
  }
}

let bad = 0, total = 0;
const allErrs = [];
for (const f of files) {
  if (!fs.existsSync(f)) { allErrs.push(`${f}: does not exist`); bad++; continue; }
  total++;
  const e = checkFile(f);
  if (e.length) { bad++; allErrs.push(...e); }
}

if (allErrs.length) {
  console.error('CONTENT VALIDATION FAILED\n');
  allErrs.slice(0, 200).forEach(e => console.error('  ' + e));
  if (allErrs.length > 200) console.error(`  ...and ${allErrs.length - 200} more`);
  console.error(`\n${bad} of ${total} file(s) invalid, ${allErrs.length} problem(s).`);
  process.exit(1);
}
console.log(`content OK — ${total} file(s) validated, no structural problems.`);

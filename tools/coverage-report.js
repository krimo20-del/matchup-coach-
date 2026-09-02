// coverage-report.js — the definitive answer to "is every matchup done?"
//
//   node tools/coverage-report.js            # all lanes
//   node tools/coverage-report.js top        # one lane
//
// Enumerates EVERY matchup that exists in champ-data, checks whether it has a proposal
// file in audits/<lane>/, and writes the outstanding list to audits/_gaps.json so a
// gap-filling pass can consume it. Deterministic, no model, no guessing.
//
// A matchup counts as covered only when its proposal file exists AND parses AND carries
// at least one audit entry. A file that exists but is empty is a gap, not a success.
const fs = require('fs');
const path = require('path');

const ONLY = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : null;

const LANES = [
  { key: 'top', dir: 'champ-data/content', suffix: '' },
  { key: 'mid', dir: 'champ-data/content/mid', suffix: '_mid' },
  { key: 'bot', dir: 'champ-data/content/bot', suffix: '_bot' },
  { key: 'support', dir: 'champ-data/content/sup', suffix: '_sup' },
].filter(L => !ONLY || L.key === ONLY);
const DO_JUNGLE = !ONLY || ONLY === 'jungle';

const bare = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');

function covered(lane, ownerKey, enemy) {
  const f = path.join('audits', lane, `${ownerKey}__${enemy}.json`);
  if (!fs.existsSync(f)) return false;
  try {
    const p = JSON.parse(fs.readFileSync(f, 'utf8'));
    return Array.isArray(p.audit) && p.audit.length > 0;
  } catch (e) { return false; }
}

const gaps = [];
const perChampion = [];
let total = 0, done = 0, deferred = 0;

for (const L of LANES) {
  if (!fs.existsSync(L.dir)) continue;
  for (const file of fs.readdirSync(L.dir).filter(f => f.endsWith('.js'))) {
    const w = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
    try { new Function('window', fs.readFileSync(path.join(L.dir, file), 'utf8'))(w); } catch (e) { continue; }
    const ownerKey = file.replace('.js', '') + L.suffix;
    const entries = w.MC_CONTENT_EXTRA.filter(c => c.a === ownerKey);
    if (!entries.length) continue;
    const games = w.MC_REAL_GAMES[ownerKey] || {};

    let c = 0, d = 0, miss = [];
    for (const e of entries) {
      total++;
      // 0-game matchups were deliberately deferred by the user; they are not gaps.
      if (!games[e.b]) { deferred++; d++; continue; }
      if (covered(L.key, ownerKey, e.b)) { done++; c++; }
      else { miss.push(e.b); gaps.push({ lane: L.key, ownerKey, enemy: e.b }); }
    }
    perChampion.push({ lane: L.key, ownerKey, total: entries.length, done: c, deferred: d, missing: miss.length });
  }
}

if (DO_JUNGLE && fs.existsSync('champ-data/jg')) {
  const w = {};
  for (const f of fs.readdirSync('champ-data/jg').filter(x => x.endsWith('.js') && !x.startsWith('_'))) {
    try { new Function('window', fs.readFileSync(path.join('champ-data/jg', f), 'utf8'))(w); } catch (e) {}
  }
  for (const [champ, opps] of Object.entries(w.JG_DB || {})) {
    let c = 0, miss = [];
    const keys = Object.keys(opps);
    for (const enemy of keys) {
      total++;
      if (covered('jungle', champ, enemy)) { done++; c++; }
      else { miss.push(enemy); gaps.push({ lane: 'jungle', ownerKey: champ, enemy }); }
    }
    perChampion.push({ lane: 'jungle', ownerKey: champ, total: keys.length, done: c, deferred: 0, missing: miss.length });
  }
}

fs.mkdirSync('audits', { recursive: true });
fs.writeFileSync(path.join('audits', '_gaps.json'), JSON.stringify(gaps, null, 1));

const pct = total ? Math.round(done / (total - deferred) * 100) : 0;
console.log(`=== coverage ${ONLY ? '(' + ONLY + ')' : '(all lanes)'} ===`);
console.log(`matchups in data : ${total}`);
console.log(`deferred (0 games): ${deferred}   <- excluded by the user, not gaps`);
console.log(`audited          : ${done}`);
console.log(`OUTSTANDING      : ${gaps.length}   (${pct}% of auditable work done)`);
console.log('');
console.log('--- per lane ---');
const byLane = {};
for (const p of perChampion) {
  const b = byLane[p.lane] = byLane[p.lane] || { champs: 0, done: 0, missing: 0, deferred: 0, complete: 0 };
  b.champs++; b.done += p.done; b.missing += p.missing; b.deferred += p.deferred;
  if (!p.missing) b.complete++;
}
for (const [lane, b] of Object.entries(byLane)) {
  console.log(`${lane.padEnd(8)} champions ${String(b.complete).padStart(3)}/${String(b.champs).padEnd(3)} complete   matchups ${String(b.done).padStart(5)} done, ${String(b.missing).padStart(5)} outstanding`);
}
console.log('');
console.log('--- champions fully done ---');
const full = perChampion.filter(p => !p.missing).map(p => p.ownerKey);
console.log(full.length ? full.join(', ') : '(none yet)');
console.log('');
console.log('--- next 15 champions with the most outstanding ---');
perChampion.filter(p => p.missing).sort((a, b) => b.missing - a.missing).slice(0, 15)
  .forEach(p => console.log(`  ${p.lane.padEnd(8)} ${p.ownerKey.padEnd(20)} ${String(p.missing).padStart(3)} outstanding of ${p.total}`));
console.log(`\noutstanding list written to audits/_gaps.json (${gaps.length} entries)`);

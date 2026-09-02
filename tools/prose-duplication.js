const fs = require('fs');
// run from the repo root

// Build a champion-name matcher from the rosters so a templated sentence that
// merely swaps the champion in collapses onto its skeleton regardless of where
// the name sits. Stripping only capitalised runs is not enough: enemyWin always
// STARTS with the champion name, and lowercasing the first char to protect
// sentence case left that name in place, scoring a fully templated field 0%.
const w0 = {};
new Function('window', fs.readFileSync('champ-data/rosters.js', 'utf8'))(w0);
const NAMES = new Set();
Object.values(w0.ROSTERS).forEach(gs => gs.forEach(g => g.c.forEach(n => {
  NAMES.add(n.toLowerCase());
  n.toLowerCase().split(/[^a-z']+/).filter(t => t.length > 2).forEach(t => NAMES.add(t));
})));
const esc = s => s.split('').map(c => /[a-z0-9' ]/i.test(c) ? c : '.').join('');
const nameRe = new RegExp('\\b(' + [...NAMES].sort((a, b) => b.length - a.length).map(esc).join('|') + ')\\b', 'gi');

const FIELDS = ['tldr', 'winCon', 'enemyWin', 'tradeGood', 'tradeBad', 'ahead', 'loading',
  'breakdown.early', 'breakdown.mid', 'breakdown.wave', 'breakdown.cooldowns', 'breakdown.trading',
  'breakdown.spikes', 'breakdown.feeding', 'breakdown.carry', 'breakdown.difficulty', 'breakdown.late'];
const get = (o, p) => p.split('.').reduce((a, k) => a && a[k], o);

const norm = s => s
  .replace(nameRe, '~')                                        // champion names, any position
  .replace(/\([^)]*\)/g, '~')                                  // parenthetical ability tags
  .replace(/\b[A-Z][a-zA-Z'\u2019-]*(\s+[A-Z][a-zA-Z'\u2019-]*)*/g, '~')  // ability names
  .replace(/\d+(\.\d+)?/g, '#')
  .toLowerCase()
  .replace(/[^a-z#~ ]/g, '')
  .replace(/~+/g, '~')
  .replace(/\s+/g, ' ')
  .trim();

const files = fs.readdirSync('champ-data').filter(f => f.endsWith('.full.js'));
const agg = {};
FIELDS.forEach(f => agg[f] = { tot: 0, exact: 0, struct: 0 });
const worstByChamp = {};

for (const file of files) {
  const w = {};
  try { new Function('window', fs.readFileSync('champ-data/' + file, 'utf8'))(w); } catch (e) { continue; }
  const CF = w.CHAMP_FULL;
  if (!CF) continue;
  for (const o of Object.keys(CF)) {
    const es = Object.values(CF[o] || {});
    if (!es.length) continue;
    let champStruct = 0, champTot = 0;
    for (const f of FIELDS) {
      const v = es.map(e => get(e, f)).filter(x => typeof x === 'string' && x.trim());
      if (!v.length) continue;
      agg[f].tot += v.length;
      agg[f].exact += v.length - new Set(v).size;
      const sk = v.length - new Set(v.map(norm)).size;
      agg[f].struct += sk;
      champStruct += sk; champTot += v.length;
    }
    if (champTot) worstByChamp[o] = 100 * champStruct / champTot;
  }
}

console.log('field'.padEnd(22) + 'n'.padStart(6) + 'exact'.padStart(9) + 'STRUCTURAL'.padStart(13));
FIELDS.map(f => ({ f, ...agg[f] })).filter(r => r.tot).sort((a, b) => b.struct / b.tot - a.struct / a.tot)
  .forEach(r => console.log(r.f.padEnd(22) + String(r.tot).padStart(6) +
    ((100 * r.exact / r.tot).toFixed(1) + '%').padStart(9) +
    ((100 * r.struct / r.tot).toFixed(1) + '%').padStart(13)));

const tot = FIELDS.reduce((s, f) => s + agg[f].tot, 0);
const st = FIELDS.reduce((s, f) => s + agg[f].struct, 0);
console.log('\nALL FIELDS: ' + (100 * st / tot).toFixed(1) + '% structurally duplicated (' + st + ' of ' + tot + ')');

console.log('\nsanity — locke enemyWin skeletons (should be identical):');
const w = {};
new Function('window', fs.readFileSync('champ-data/locke.full.js', 'utf8'))(w);
Object.values(w.CHAMP_FULL.locke).slice(0, 3).forEach(e => console.log('  ' + norm(e.enemyWin)));

const ranked = Object.entries(worstByChamp).sort((a, b) => b[1] - a[1]);
console.log('\nworst 6 champions overall: ' + ranked.slice(0, 6).map(r => r[0] + ' ' + r[1].toFixed(0) + '%').join(', '));
console.log('best 6 champions overall:  ' + ranked.slice(-6).map(r => r[0] + ' ' + r[1].toFixed(0) + '%').join(', '));

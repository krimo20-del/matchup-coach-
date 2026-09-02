const fs = require('fs');
const w = { CHAMP_FULL: {}, MC_CONTENT_EXTRA: [], MC_WR_TABLES: {}, MC_REAL_GAMES: {}, __mcLoaded: {} };
new Function('window', fs.readFileSync('champ-data/sup/braum.full.js', 'utf8'))(w);
new Function('window', fs.readFileSync('champ-data/content/sup/braum.js', 'utf8'))(w);

const full = w.CHAMP_FULL['braum_sup'] || {};
const contentExtra = w.MC_CONTENT_EXTRA.filter(c => c.a === 'braum_sup');

const fullSections = ['tldr','winCon','enemyWin','diff','diffRating','carryRating','breakdown','dosFull','dontsFull','tradeGood','tradeBad','ahead'];
const issues = [];

for (const [enemy, entry] of Object.entries(full)) {
  for (const sec of fullSections) {
    const v = entry[sec];
    if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)) {
      issues.push(`${enemy}.${sec} MISSING/EMPTY`);
    }
  }
  // phases (level chart): 7 phases, each side+why
  const lc = entry.phases;
  if (Array.isArray(lc)) {
    if (lc.length !== 7) issues.push(`${enemy}.phases has ${lc.length} phases, expected 7`);
    lc.forEach((p, i) => {
      if (!p.side) issues.push(`${enemy}.phases[${i}] missing side`);
      if (!p.why) issues.push(`${enemy}.phases[${i}] missing why`);
    });
  } else {
    issues.push(`${enemy}.phases not array`);
  }
}

for (const c of contentExtra) {
  const enemy = c.b;
  if (!c.win || c.win.length !== 7) issues.push(`content ${enemy}.win missing or not len7`);
  if (!c.whys || c.whys.length !== 7) issues.push(`content ${enemy}.whys missing or not len7`);
  if (!c.spikes || c.spikes.length === 0) issues.push(`content ${enemy}.spikes missing/empty`);
  else if (c.spikes.length !== 4) issues.push(`content ${enemy}.spikes has ${c.spikes.length}, expected 4`);
  if (!c.wants) issues.push(`content ${enemy}.wants missing`);
  if (!c.early) issues.push(`content ${enemy}.early missing`);
  if (!c.mid) issues.push(`content ${enemy}.mid missing`);
  if (!c.late) issues.push(`content ${enemy}.late missing`);
}

console.log('full entries:', Object.keys(full).length, 'contentExtra entries:', contentExtra.length);
console.log('ISSUES:', issues.length);
issues.forEach(i => console.log(' -', i));

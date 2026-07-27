// Slug-consistency audit: does slug(rosterDisplayName) actually find the data?
// The app looks up CHAMP_DATA[<youKey>][slug(enemyDisplayName)] where
// slug = lowercase + strip non-alphanumerics. If the data stores a DIFFERENT
// opponent key (e.g. 'renata' while the roster says "Renata Glasc" -> renataglasc),
// every matchup against that champion silently falls back to generic content.
const fs = require('fs');
const slug = (x) => (x || '').toLowerCase().replace(/[^a-z0-9]/g, '');

global.window = {};
new Function('window', fs.readFileSync('champ-data/rosters.js', 'utf8'))(global.window);
const ROSTERS = global.window.ROSTERS;

const LANES = [
  { lane: 'top', roster: 'top', dir: 'champ-data', suffix: '' },
  { lane: 'mid', roster: 'mid', dir: 'champ-data/mid', suffix: '_mid' },
  { lane: 'bot', roster: 'bot', dir: 'champ-data/bot', suffix: '_bot' },
  { lane: 'support', roster: 'support', dir: 'champ-data/sup', suffix: '_sup' },
];

let problems = 0;
for (const L of LANES) {
  const names = []; ROSTERS[L.roster].forEach(g => g.c.forEach(n => names.push(n)));
  const rosterSlugs = names.map(slug);

  // Load every champ data file for this lane into one window
  const w = { CHAMP_DATA: {}, CHAMP_FULL: {} };
  const files = fs.readdirSync(L.dir).filter(f => f.endsWith('.js') && !f.includes('.full.') && !f.startsWith('_'));
  for (const f of files) {
    try { new Function('window', fs.readFileSync(L.dir + '/' + f, 'utf8'))(w); } catch (e) {}
  }
  const dataKeys = Object.keys(w.CHAMP_DATA).filter(k => L.suffix ? k.endsWith(L.suffix) : !/_(mid|bot|sup)$/.test(k));

  console.log('\n===== ' + L.lane.toUpperCase() + ' — roster ' + names.length + ', data keys ' + dataKeys.length + ' =====');

  // 1) every roster champ must have a data key that the app can reach
  //    (app resolves via CHAMP_CONFIGS/CHAMPS dataKey, so we check by presence of SOME key)
  const keyBase = dataKeys.map(k => L.suffix ? k.slice(0, -L.suffix.length) : k);
  const missingSelf = rosterSlugs.filter(s => !keyBase.includes(s));
  if (missingSelf.length) {
    console.log('  NOTE self-key slug differs from roster slug: ' + missingSelf.join(', '));
    console.log('        (fine IF the app config maps the display name -> the real dataKey)');
  }

  // 2) THE REAL RISK: opponent keys inside each champ's data vs slug(rosterName)
  const badOpp = {};
  for (const dk of dataKeys) {
    const opps = Object.keys(w.CHAMP_DATA[dk] || {});
    for (const rs of rosterSlugs) {
      const selfBase = L.suffix ? dk.slice(0, -L.suffix.length) : dk;
      if (rs === selfBase) continue;              // no self-matchup
      if (!opps.includes(rs)) {
        // roster champ NOT reachable as an opponent under its own slug
        (badOpp[rs] = badOpp[rs] || []).push(dk);
      }
    }
  }
  const broken = Object.keys(badOpp).filter(rs => badOpp[rs].length > 2); // systemic, not a one-off gap
  if (broken.length) {
    for (const rs of broken) {
      const disp = names[rosterSlugs.indexOf(rs)];
      // what DO the files call this champ?
      const sample = w.CHAMP_DATA[dataKeys[0]] || {};
      const near = Object.keys(sample).filter(k => k.startsWith(rs.slice(0, 5)) || rs.startsWith(k.slice(0, 5)));
      console.log('  PROBLEM: "' + disp + '" -> slug "' + rs + '" is NOT an opponent key in ' + badOpp[rs].length + '/' + dataKeys.length + ' files.');
      console.log('           files actually use: ' + (near.length ? near.join(', ') : '(no near match)'));
      problems++;
    }
  } else {
    console.log('  opponent-key slugs: all roster champs reachable ✓');
  }
}
console.log('\n========== SLUG PROBLEMS: ' + problems + ' ==========');

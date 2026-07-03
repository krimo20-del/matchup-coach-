// Add Locke (patch 26.13) to the mid lane, both directions:
//   1) Generate champ-data/mid/locke.js / locke.full.js / locke-loadouts.js from
//      the engine + GEN_MID_CFGS_12 (Locke's cfg).
//   2) Append a "locke" enemy entry into each of the 46 existing mid champs' three
//      files. The shipped .full.js files carry post-generation polish, so we do NOT
//      regenerate them — we string-append the new entry before the final "};",
//      leaving every existing byte untouched.
// Enemy-side diff verdicts are WR-driven (mirror-consistent with Locke's own diffEx):
// band(100 - lockeWR) per _locke-wr.json.
const fs = require('fs');
const path = require('path');
global.window = {};
const CD = path.join(__dirname, 'champ-data');
require(path.join(CD, '_gen-engine-mid.js'));
let cfgs = [];
for (let i = 1; i <= 20; i++) {
  const p = path.join(CD, '_gen-mid-cfg-' + i + '.js');
  if (!fs.existsSync(p)) continue;
  require(p);
  const arr = window['GEN_MID_CFGS_' + i];
  if (Array.isArray(arr)) cfgs = cfgs.concat(arr);
}
const ENGINE = window.GEN_ENGINE_MID;
const WR = JSON.parse(fs.readFileSync(path.join(__dirname, '_locke-wr.json'), 'utf8'));

const lockeCfg = cfgs.find(c => c.key === 'locke');
if (!lockeCfg) throw new Error('locke cfg not found');

// ---- 1) Locke's own files -------------------------------------------------
const out = ENGINE.gen(lockeCfg);
fs.writeFileSync(path.join(CD, 'mid', 'locke.js'),
  '// MatchupCoach — Locke (Mid) matchup data. Generated from _gen-mid-cfg. Patch 26.13.\n' +
  'window.CHAMP_DATA = window.CHAMP_DATA || {};\n' +
  'window.CHAMP_DATA["locke_mid"] = ' + JSON.stringify(out.data) + ';\n');
fs.writeFileSync(path.join(CD, 'mid', 'locke.full.js'),
  '// MatchupCoach — Locke (Mid) FULL matchup reports. Generated.\n' +
  'window.CHAMP_FULL = window.CHAMP_FULL || {};\n' +
  'window.CHAMP_FULL["locke_mid"] =  ' + JSON.stringify(out.full) + ';\n');
fs.writeFileSync(path.join(CD, 'mid', 'locke-loadouts.js'),
  '// MatchupCoach — Locke (Mid) loadouts. Generated.\n' +
  'window.CHAMP_LOADOUTS = window.CHAMP_LOADOUTS || {};\n' +
  'window.CHAMP_LOADOUTS["locke_mid"] = ' + JSON.stringify(out.loadouts) + ';\n');

// ---- 2) Inject "locke" into the 46 existing champs ------------------------
function appendEntry(file, entryJson) {
  let s = fs.readFileSync(file, 'utf8');
  if (s.indexOf('"locke":') >= 0) return 'already';
  const at = s.lastIndexOf('};');
  if (at < 0) throw new Error('no closing }; in ' + file);
  s = s.slice(0, at) + ',"locke":' + entryJson + s.slice(at);
  fs.writeFileSync(file, s);
  return 'added';
}

let injected = 0, skipped = 0;
cfgs.filter(c => c.key !== 'locke').forEach(cfg => {
  // enemy-side verdict from the same WR the Locke side uses (mirror-consistent)
  const w = WR[cfg.key];
  const cfg2 = Object.assign({}, cfg, { diffEx: Object.assign({}, cfg.diffEx, w ? { locke: w.enemyDiff } : {}) });
  const g = ENGINE.gen(cfg2);
  const results = [
    appendEntry(path.join(CD, 'mid', cfg.key + '.js'), JSON.stringify(g.data.locke)),
    appendEntry(path.join(CD, 'mid', cfg.key + '.full.js'), JSON.stringify(g.full.locke)),
    appendEntry(path.join(CD, 'mid', cfg.key + '-loadouts.js'), JSON.stringify(g.loadouts.locke))
  ];
  results.forEach(r => r === 'added' ? injected++ : skipped++);
});
console.log(JSON.stringify({ lockeMatchups: Object.keys(out.data).length, filesInjected: injected, skipped }));

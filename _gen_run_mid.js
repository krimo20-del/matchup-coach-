// Regenerate the mid-lane champ data files from _gen-engine-mid.js + _gen-mid-cfg-*.js.
// Usage:
//   node _gen_run_mid.js verify   -> writes to a temp dir and byte-diffs vs champ-data/mid/
//   node _gen_run_mid.js write    -> writes straight into champ-data/mid/
// The engine is deterministic, so `verify` proves the runner reproduces the shipped
// files exactly before any table change (e.g. adding a new enemy to ETAG).
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
const mode = process.argv[2] || 'verify';
const outDir = mode === 'write' ? path.join(CD, 'mid') : path.join(__dirname, '_gen_mid_check');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function fileTriplet(cfg, out) {
  return [
    [cfg.key + '.js',
      '// MatchupCoach — ' + cfg.name + ' (Mid) matchup data. Generated from _gen-mid-cfg. Patch 26.x.\n' +
      'window.CHAMP_DATA = window.CHAMP_DATA || {};\n' +
      'window.CHAMP_DATA["' + cfg.key + '_mid"] = ' + JSON.stringify(out.data) + ';\n'],
    [cfg.key + '.full.js',
      '// MatchupCoach — ' + cfg.name + ' (Mid) FULL matchup reports. Generated.\n' +
      'window.CHAMP_FULL = window.CHAMP_FULL || {};\n' +
      'window.CHAMP_FULL["' + cfg.key + '_mid"] =  ' + JSON.stringify(out.full) + ';\n'],
    [cfg.key + '-loadouts.js',
      '// MatchupCoach — ' + cfg.name + ' (Mid) loadouts. Generated.\n' +
      'window.CHAMP_LOADOUTS = window.CHAMP_LOADOUTS || {};\n' +
      'window.CHAMP_LOADOUTS["' + cfg.key + '_mid"] = ' + JSON.stringify(out.loadouts) + ';\n']
  ];
}

let wrote = 0, same = 0, diff = [], missing = [];
cfgs.forEach(cfg => {
  const out = ENGINE.gen(cfg);
  fileTriplet(cfg, out).forEach(([fname, content]) => {
    if (mode === 'verify') {
      const ref = path.join(CD, 'mid', fname);
      if (!fs.existsSync(ref)) { missing.push(fname); return; }
      const cur = fs.readFileSync(ref, 'utf8');
      if (cur === content) same++;
      else {
        diff.push(fname);
        fs.writeFileSync(path.join(outDir, fname), content);
      }
    } else {
      fs.writeFileSync(path.join(CD, 'mid', fname), content);
      wrote++;
    }
  });
});
console.log(JSON.stringify({ mode, cfgs: cfgs.length, identical: same, different: diff.slice(0, 10), diffCount: diff.length, missing: missing.slice(0, 5), wrote }));

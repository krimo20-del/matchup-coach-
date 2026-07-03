// Generate Locke's TOP-lane playable files from GEN_ENGINE + GEN_CFGS_4 (ziggs-style
// off-meta path): champ-data/locke.js / locke.full.js / locke-loadouts.js.
const fs = require('fs');
const path = require('path');
global.window = {};
const CD = path.join(__dirname, 'champ-data');
require(path.join(CD, '_gen-engine.js'));
require(path.join(CD, '_gen-config-4.js'));
require(path.join(CD, 'rosters.js'));
const ENGINE = window.GEN_ENGINE;
const cfg = window.GEN_CFGS_4[0];

// slug -> display name map from all rosters (covers the whole top enemy pool)
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const NAME = {};
Object.values(window.ROSTERS).forEach(groups => groups.forEach(g => g.c.forEach(n => { NAME[slug(n)] = n; })));
NAME.locke = 'Locke';

const missing = Object.keys(ENGINE.ETAG).filter(k => !NAME[k]);
if (missing.length) console.log('WARN unmapped slugs (fallback capitalization):', missing.join(','));

const out = ENGINE.gen(cfg, { NAME });
const n = Object.keys(out.data).length;
fs.writeFileSync(path.join(CD, 'locke.js'),
  '// MatchupCoach — Locke (Top) champion matchup data. Patch 26.13. ' + n + ' matchups (generated, Locke-voiced).\n' +
  'window.CHAMP_DATA = window.CHAMP_DATA || {};\n' +
  'window.CHAMP_DATA.locke = ' + JSON.stringify(out.data) + ';\n');
fs.writeFileSync(path.join(CD, 'locke.full.js'),
  '// MatchupCoach — Locke FULL matchup content. Patch 26.13. ' + n + ' matchups (generated, Locke-voiced).\n' +
  'window.CHAMP_FULL = window.CHAMP_FULL || {};\n' +
  'window.CHAMP_FULL.locke =  ' + JSON.stringify(out.full) + ';\n');
fs.writeFileSync(path.join(CD, 'locke-loadouts.js'),
  '// MatchupCoach — Locke structured loadouts (CHAMP_LOADOUTS registry).\n' +
  'window.CHAMP_LOADOUTS = window.CHAMP_LOADOUTS || {};\n' +
  'window.CHAMP_LOADOUTS.locke = ' + JSON.stringify(out.loadouts) + ';\n');
console.log(JSON.stringify({ matchups: n, files: 3 }));

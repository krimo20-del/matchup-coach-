// Prepare a mid-lane bespoke-content authoring job for a champ.
// Mid DOES have a verified favour-timeline store — it's embedded as the FIX object
// inside champ-data/_label-text-fixes.js (keyed by dataKey, e.g. "ahri_mid"), extracted
// once into _label-text-fix-store.json. That store is authoritative (its retry interval
// runs forever, so it wins over anything else) — lockWin MUST come from it, not from the
// raw algorithmic chart (_bespoke_mid_charts/), which was found to diverge on ~12% of
// cells. Champs/opponents missing from the store fall back to the chart (Locke-style).
// Usage: node _bespoke_prep_mid.js <champSlug> <champDisp> <scratch>
const fs = require('fs'), path = require('path');
const champ = process.argv[2], champDisp = process.argv[3], scratch = process.argv[4];
const dataKey = champ + '_mid';
const wr = JSON.parse(fs.readFileSync(path.join(__dirname, '_wr_mid_' + champ + '.json'), 'utf8'));
const STORE = JSON.parse(fs.readFileSync(path.join(__dirname, '_label-text-fix-store.json'), 'utf8'));
const store = STORE[dataKey] || {};
const chartFile = path.join(__dirname, '_bespoke_mid_charts', champ + '.json');
const chart = fs.existsSync(chartFile) ? JSON.parse(fs.readFileSync(chartFile, 'utf8')).matchups : {};
const P = JSON.parse(fs.readFileSync(path.join(__dirname, '_bespoke_pool_mid.json'), 'utf8'));
const disp = P.disp;
global.window = {};
try { require(path.join(__dirname, 'champ-data', 'enemy-kits-mid.js')); } catch (e) {}
try { require(path.join(__dirname, 'champ-data', 'enemy-kits.js')); } catch (e) {}
const k = (window.ENEMY_KITS || {})[champ];
const kit = k ? { cls: k.cls, P: k.P && k.P.n, Q: k.Q && k.Q.n, W: k.W && k.W.n, E: k.E && k.E.n, R: k.R && k.R.n } : { note: 'use your own accurate knowledge of ' + champDisp + "'s kit" };

const STAGES = ['level 1', 'level 2', 'level 3', 'levels 4-5', 'level 6', 'first item', '2+ items'];
function chartWin(opp) {
  const m = chart[opp]; if (!m || !m.phases) return null;
  const win = new Array(7).fill(null);
  m.phases.forEach(p => {
    const i = STAGES.indexOf(String(p.label || '').toLowerCase());
    if (i >= 0) win[i] = p.side;
  });
  return win.every(Boolean) ? win : null;
}
function lockWinFor(opp) {
  if (store[opp] && store[opp].length === 7) return store[opp];
  return chartWin(opp);
}

const opps = Object.keys(wr).sort();
const fromStore = opps.filter(o => store[o] && store[o].length === 7);
const fromChart = opps.filter(o => !(store[o] && store[o].length === 7) && chartWin(o));
const missing = opps.filter(o => !lockWinFor(o));
const matchups = opps.map(opp => ({
  opp, oppDisp: disp[opp] || (opp.charAt(0).toUpperCase() + opp.slice(1)),
  wr: wr[opp].wr, games: wr[opp].games,
  lockWin: lockWinFor(opp)
}));
const dir = path.join(scratch, 'bespoke-mid', champ);
fs.mkdirSync(path.join(dir, 'out'), { recursive: true });
fs.writeFileSync(path.join(dir, 'job.json'), JSON.stringify({ champ, champSlug: champ, champDataKey: dataKey, champDisp, kit, matchups }));
const groups = []; const per = 7;
const slugs = matchups.map(m => m.opp);
for (let i = 0; i < slugs.length; i += per) groups.push(slugs.slice(i, i + per));
fs.writeFileSync(path.join(dir, 'groups.json'), JSON.stringify(groups));
console.log(JSON.stringify({ champ, matchups: matchups.length, groups: groups.length, fromStore: fromStore.length, fromChart: fromChart.length, missing }));

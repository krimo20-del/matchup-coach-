// Prepare a bespoke-content authoring job for a champ.
// Reads _wr_<champ>.json ({opp:{wr,games}}) + _label-corrections.json (authoritative
// favour timeline = the chart) + enemy-kits (kit note), writes:
//   <scratch>/bespoke/<champ>/job.json   {champ, champDisp, kit, matchups:[{opp,oppDisp,wr,games,lockWin=store}]}
//   <scratch>/bespoke/<champ>/groups.json  (10 opponent-slug groups)
// Usage: node _bespoke_prep.js <champ> <champDisp> <scratch>
const fs = require('fs'), path = require('path');
const champ = process.argv[2], champDisp = process.argv[3], scratch = process.argv[4];
const wr = JSON.parse(fs.readFileSync(path.join(__dirname, '_wr_' + champ + '.json'), 'utf8'));
const STORE = JSON.parse(fs.readFileSync(path.join(__dirname, '_label-corrections.json'), 'utf8'));
// most champ keys are the lowercase slug, but a few legacy ones are display-cased (e.g. "Wukong")
const store = STORE[champ] || STORE[champDisp] || STORE[champ.charAt(0).toUpperCase() + champ.slice(1)];
if (!store) throw new Error('no store timeline for ' + champ);
const P = JSON.parse(fs.readFileSync(path.join(__dirname, '_bespoke_pool.json'), 'utf8'));
const disp = P.disp;
global.window = {};
require(path.join(__dirname, 'champ-data', 'enemy-kits.js'));
try { require(path.join(__dirname, 'champ-data', 'enemy-kits-mid.js')); } catch (e) {}
const k = (window.ENEMY_KITS || {})[champ];
const kit = k ? { cls: k.cls, P: k.P && k.P.n, Q: k.Q && k.Q.n, W: k.W && k.W.n, E: k.E && k.E.n, R: k.R && k.R.n } : { note: 'use your own accurate knowledge of ' + champDisp + "'s kit" };

const opps = Object.keys(wr).sort();
const missingStore = opps.filter(o => !store[o]);
const matchups = opps.map(opp => ({
  opp, oppDisp: disp[opp] || (opp.charAt(0).toUpperCase() + opp.slice(1)),
  wr: wr[opp].wr, games: wr[opp].games,
  lockWin: store[opp] || null
}));
const dir = path.join(scratch, 'bespoke', champ);
fs.mkdirSync(path.join(dir, 'out'), { recursive: true });
fs.writeFileSync(path.join(dir, 'job.json'), JSON.stringify({ champ, champDisp, kit, matchups }));
const groups = []; const per = 7;
const slugs = matchups.map(m => m.opp);
for (let i = 0; i < slugs.length; i += per) groups.push(slugs.slice(i, i + per));
fs.writeFileSync(path.join(dir, 'groups.json'), JSON.stringify(groups));
console.log(JSON.stringify({ champ, matchups: matchups.length, groups: groups.length, missingStore, kit }));

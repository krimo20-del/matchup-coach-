// Prepare a support-lane bespoke-content authoring job for a champ.
// Bot has a verified favour-timeline store (the FIX object inside champ-data/_label-text-fixes.js,
// keyed by dataKey e.g. "aphelios_sup"), extracted into _label-text-fix-store.json. That store is
// authoritative — lockWin MUST come from it. All 30 bot champs are fully in the store, so there is
// no chart fallback (unlike some mid champs). The self-mirror opponent is excluded (29 matchups).
// Usage: node _bespoke_prep_sup.js <champSlug> <champDisp> <scratch>
const fs = require('fs'), path = require('path');
const champ = process.argv[2], champDisp = process.argv[3], scratch = process.argv[4];
const dataKey = champ + '_sup';
const wr = JSON.parse(fs.readFileSync(path.join(__dirname, '_wr_sup_' + champ + '.json'), 'utf8'));
const STORE = JSON.parse(fs.readFileSync(path.join(__dirname, '_label-text-fix-store.json'), 'utf8'));
const store = STORE[dataKey] || {};
const P = JSON.parse(fs.readFileSync(path.join(__dirname, '_bespoke_pool_sup.json'), 'utf8'));
const disp = P.disp;
global.window = {};
try { require(path.join(__dirname, 'champ-data', 'enemy-kits-sup.js')); } catch (e) {}
try { require(path.join(__dirname, 'champ-data', 'enemy-kits.js')); } catch (e) {}
const k = (window.ENEMY_KITS || {})[champ];
const kit = k ? { cls: k.cls, P: k.P && k.P.n, Q: k.Q && k.Q.n, W: k.W && k.W.n, E: k.E && k.E.n, R: k.R && k.R.n } : { note: 'use your own accurate knowledge of ' + champDisp + "'s kit" };

function lockWinFor(opp) {
  if (store[opp] && store[opp].length === 7) return store[opp];
  return null;
}

// opponents = every bot champ we have a WR for, excluding the self-mirror
const opps = Object.keys(wr).filter(o => o !== champ).sort();
const fromStore = opps.filter(o => store[o] && store[o].length === 7);
const missing = opps.filter(o => !lockWinFor(o));
const matchups = opps.map(opp => ({
  opp, oppDisp: disp[opp] || (opp.charAt(0).toUpperCase() + opp.slice(1)),
  wr: wr[opp].wr, games: wr[opp].games,
  lockWin: lockWinFor(opp)
}));
const dir = path.join(scratch, 'bespoke-sup', champ);
fs.mkdirSync(path.join(dir, 'out'), { recursive: true });
fs.writeFileSync(path.join(dir, 'job.json'), JSON.stringify({ champ, champSlug: champ, champDataKey: dataKey, champDisp, kit, matchups }));
const groups = []; const per = 6;
const slugs = matchups.map(m => m.opp);
for (let i = 0; i < slugs.length; i += per) groups.push(slugs.slice(i, i + per));
fs.writeFileSync(path.join(dir, 'groups.json'), JSON.stringify(groups));
console.log(JSON.stringify({ champ, matchups: matchups.length, groups: groups.length, fromStore: fromStore.length, missing }));

// Locke-specific job builder: Locke is NOT in the label-fix store, so its favour
// timeline comes from its generated CHAMP_FULL chart (_locke_chart.json). Mirrors
// _bespoke_prep.js output shape so _bespoke_genwf.js works unchanged.
// Usage: node _bespoke_prep_locke.js <scratch>
const fs = require('fs'), path = require('path');
const scratch = process.argv[2];
const wr = JSON.parse(fs.readFileSync(path.join(__dirname, '_wr_locke.json'), 'utf8'));
const chart = JSON.parse(fs.readFileSync(path.join(__dirname, '_locke_chart.json'), 'utf8'));
const P = JSON.parse(fs.readFileSync(path.join(__dirname, '_bespoke_pool.json'), 'utf8'));
const disp = P.disp;
const kit = { cls: 'AP Assassin · Execute Totem', P: 'Silver Stake (missing-HP on-hit)', Q: 'Ritual Nails (mark stacks + slow)', W: 'Soul Ignition (grey-health steroid, self-damage)', E: 'Ashen Pursuit (blink + dash-through, resets on takedown)', R: 'Purgatory (execute totem below a growing threshold)' };
const opps = Object.keys(wr).sort();
const missingChart = opps.filter(o => !chart[o]);
const matchups = opps.map(opp => ({
  opp, oppDisp: disp[opp] || (opp.charAt(0).toUpperCase() + opp.slice(1)),
  wr: wr[opp].wr, games: wr[opp].games,
  lockWin: chart[opp] || null
}));
const dir = path.join(scratch, 'bespoke', 'locke');
fs.mkdirSync(path.join(dir, 'out'), { recursive: true });
fs.writeFileSync(path.join(dir, 'job.json'), JSON.stringify({ champ: 'locke', champDisp: 'Locke', kit, matchups }));
const groups = []; const per = 7; const slugs = matchups.map(m => m.opp);
for (let i = 0; i < slugs.length; i += per) groups.push(slugs.slice(i, i + per));
fs.writeFileSync(path.join(dir, 'groups.json'), JSON.stringify(groups));
console.log(JSON.stringify({ champ: 'locke', matchups: matchups.length, groups: groups.length, missingChart }));

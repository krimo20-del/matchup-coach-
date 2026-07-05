// Heuristic chart↔content consistency audit for a bespoke content file.
// For each phase, infer the why's favour polarity and flag it when it clearly
// contradicts win[i] (green=champ / red=opp / amber=skill). Advisory (heuristics
// are imperfect on rich prose) — use to spot-check, not as a hard gate.
// Usage: node _bespoke_consistency.js <champSlug> <champDisp>
const fs = require('fs'), path = require('path');
const champ = process.argv[2], champDisp = process.argv[3];
global.window = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
require(path.join(__dirname, 'champ-data', 'content', champ + '.js'));
const P = JSON.parse(fs.readFileSync(path.join(__dirname, '_bespoke_pool.json'))); const disp = P.disp;
const SELF = /\byou can\b|your window|you punish|punish|trade freely|you commit|you win|you out|you bully|dominate|in your favou?r|your lane|free trade|you threaten|you force/i;
const ENEMY = /respect|you'?re behind|concede|do not trade|don'?t trade|dangerous|you lose|out-?trades you|out-?ranges you|out-?scales you|he out|she out|they out|avoid|survive|back off|give up|you cannot|you can'?t|zoned|deny you/i;
let flags = [], total = 0;
(window.MC_CONTENT_EXTRA || []).forEach(e => {
  const oppDisp = disp[e.b] || e.b;
  for (let i = 0; i < 7; i++) {
    total++;
    const w = e.win[i], why = String(e.whys[i] || '');
    const self = SELF.test(why), enemy = ENEMY.test(why);
    let bad = false;
    if (w === champDisp && enemy && !self) bad = true;       // green phase, why reads enemy-favoured
    else if (w === oppDisp && self && !enemy) bad = true;     // red phase, why reads champ-favoured
    if (bad) flags.push({ opp: e.b, i, win: w, why: why.slice(0, 90) });
  }
});
console.log(JSON.stringify({ champ, phases: total, flagged: flags.length }));
flags.slice(0, 25).forEach(f => console.log('  [' + f.opp + ' #' + f.i + '] win=' + f.win + ' :: ' + f.why));

// Add Locke (patch 26.13) to the JUNGLE, both directions:
//   1) champ-data/jg/locke.js  — JG_DB['Locke'] with a report vs all 49 junglers.
//   2) Append a "Locke" report into each existing jungler's jg file (49 files).
// Stage labels are emitted in the headsup/window-labels grammar and the score rows for
// Locke were added to those layers' S/S6/P/U/LS tables, so the runtime recompute keeps
// every stage mirror-consistent with the live duel model. WR flavour from
// _locke-wr-topjg.json (jungle: 43.9% overall — Locke is a weak-side jungler).
const fs = require('fs');
const path = require('path');
global.window = {};
const JD = path.join(__dirname, 'champ-data', 'jg');
fs.readdirSync(JD).filter(f => f.endsWith('.js') && !f.startsWith('_')).forEach(f => { try { require(path.join(JD, f)); } catch (e) {} });
const DB = window.JG_DB;
const enemies = Object.keys(DB).filter(n => n !== 'Locke');
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

// ---- pull the live duel-model tables out of the fix layers -----------------
function grab(file, varName) {
  const src = fs.readFileSync(file, 'utf8');
  const at = src.indexOf('var ' + varName + ' = {');
  const start = src.indexOf('{', at);
  let depth = 0, end = start;
  for (let i = start; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (!depth) { end = i + 1; break; } }
  }
  return eval('(' + src.slice(start, end) + ')');
}
const HU = path.join(JD, '_jg-headsup-fixes.js');
const WL = path.join(JD, '_jg-window-labels.js');
const S = grab(HU, 'S'), S6 = grab(HU, 'S6'), U = grab(HU, 'U');
const LS = grab(WL, 'LS');
const SHORT = { 'Nunu & Willump': 'Nunu', 'Jarvan IV': 'Jarvan', 'Master Yi': 'Yi', 'Xin Zhao': 'Xin', 'Lee Sin': 'Lee' };
const shortName = (n) => SHORT[n] || n;
const WRJ = JSON.parse(fs.readFileSync(path.join(__dirname, '_locke-wr-topjg.json'), 'utf8')).jungle.vs;

const STAGES = ['Level 1 Clear', 'Level 2 Skirmish', 'Level 3 Route', 'Levels 4-5 Macro', 'Level 6 Breakpoint', 'First Item Spike', '2+ Items Scaling'];

function duelLabel(you, foe, d) {
  if (d >= 2) return you + ' Dominant';
  if (d >= 0.75) return you + ' Favored';
  if (d > -0.75) return 'Even Skirmish';
  if (d > -2) return 'Respect ' + shortName(foe);
  return 'Danger — Avoid ' + shortName(foe);
}
function ultLabel(you, foe, d) {
  const uy = U[you] || { ult: 'R' };
  if (d >= 0.75) return uy.ult + ' Favored';
  if (d > -0.75) return 'Even Ult Window';
  if (d > -2.25) return "Respect " + shortName(foe) + "'s R";
  return "Danger — " + shortName(foe) + "'s R";
}
function lateLabel(you, foe, d) {
  if (d >= 0.5) return you + ' Favored at Full Build';
  if (d > -0.5) return 'Even Scaling — Prep Decides';
  if (d > -1.25) return 'Respect ' + shortName(foe) + ' Late — End Early';
  return 'Danger — ' + shortName(foe) + ' Outscales';
}

// ---- Locke's report vs an enemy jungler (Locke perspective) -----------------
function lockeReport(foe) {
  const uf = U[foe] || { threat: foe + ' wins committed duels', tool: 'track their power windows before every contest' };
  const sMe = S['Locke'], sFo = S[foe] || [5, 5, 5];
  const wr = WRJ[slug(foe)];
  const hardNote = wr && wr.wr <= 45.5;
  const stages = STAGES.map((st, i) => {
    let adv, why;
    if (i <= 2) {
      adv = duelLabel('Locke', foe, sMe[i] - (sFo[i] || 5));
      why = ['Q nail volleys clear at range while banking marks — trade only with stacks loaded and E held as the exit; ',
             'the blink-auto consume chunks hard at level 2, but a spent E is a spent escape — ',
             'full basic kit online: nail the scuttle contact, ignite the soul for the sprint, and '][i]
        + (i === 2 ? uf.tool.charAt(0).toLowerCase() + uf.tool.slice(1) + '.' : 'remember ' + uf.threat + '.');
    } else if (i === 3) {
      adv = 'Even — Farm & Track';
      why = 'Levels 4-5 are a farm-and-track window vs ' + foe + ' — bank camps, keep river vision, and hold the fight for your level-6 totem instead of coin-flipping.';
    } else if (i === 4) {
      adv = ultLabel('Locke', foe, S6['Locke'] - (S6[foe] != null ? S6[foe] : 5));
      why = 'Purgatory rewrites the skirmish: anyone who fights below the floor inside your totem is already dead. But respect the counter-window — ' + uf.threat + '. Drop the totem where the fight ends, not where it starts.';
    } else if (i === 5) {
      adv = 'Lich Bane / Shadowflame Spike';
      why = 'Lich Bane turns every blink-consume into a Spellblade chunk and Shadowflame sharpens the low-HP crunch. This is your strongest duel window of the game — cash it on a pick, not a coin-flip.';
    } else {
      adv = lateLabel('Locke', foe, LS['Locke'] - (LS[foe] != null ? LS[foe] : 6.5));
      why = 'Late game you are a cleanup engine, not a frontliner: enter second, blink the marked kill, and chain E resets. Every sealed soul permanently raises the totem floor — your scaling is the seal count.';
    }
    return { stage: st, adv, why };
  });
  return {
    tldr: foe + ' out-duels you in most honest windows' + (hardNote ? ' — and the numbers agree (' + wr.wr + '% at emerald+)' : '') + ': Locke jungles like an assassin accountant — farm the marks, skip the coin-flips, and collect executes where ' + uf.threat.replace(/\.$/, '') + ' can’t reach you.',
    stages,
    start: 'Start Red with a leash and Q the camp from max nail range — W’s grey-health refund keeps the clear honest, but full clears cost real HP, so path toward a healthy scuttle, not a fight.',
    scuttle: 'Contest scuttle only with marks banked and E up — a blink-auto consume wins the contact trade, but ' + uf.tool.charAt(0).toLowerCase() + uf.tool.slice(1) + '.',
    topObj: 'Grubs and herald are execute windows post-6: drop Purgatory on the pit and anyone who commits below the floor pays for the objective twice.',
    invade: 'Invade only on vision of ' + shortName(foe) + ' cross-map — your 1v1 is a losing proposition until Lich Bane, and E spent on a camp is E not spent on leaving.',
    watch: 'Watch for ' + uf.threat + ' — respect that window and hand back tempo rather than health bars.',
    weak: 'When your lanes lose priority, drop contests entirely: farm nails, stack camps, and wait — a Locke behind on seals is quiet, but a Locke who coin-flipped into ' + shortName(foe) + ' is a lane behind too.',
    split: 'You side-lane like an assassin: the totem punishes anyone who duels you long, and E resets turn a caught splitter into a chain. Never split with E down.',
    picks: 'Your picks are scripted: nail string from fog, blink the consume, totem the exit path. One landed Q string is a kill call — ping it before you throw it.',
    win: 'Concede the duel war, win the execute war: farm to Lich Bane, seal every low-HP fight the totem referees, and let the permanent floor make the late game smaller for them every kill.'
  };
}

// ---- the enemy jungler's report vs Locke (their perspective) ----------------
function enemyReport(you) {
  const uy = U[you] || { ult: 'your ultimate', plan: 'your kit wins committed fights', threat: '', tool: '' };
  const sMe = S[you] || [5, 5, 5], sFo = S['Locke'];
  const wr = WRJ[slug(you)];
  const winNote = wr ? ' (' + (100 - wr.wr).toFixed(1) + '% for you at emerald+)' : '';
  const stages = STAGES.map((st, i) => {
    let adv, why;
    if (i <= 2) {
      adv = duelLabel(you, 'Locke', (sMe[i] || 5) - sFo[i]);
      why = ['Locke clears at range but pays mana and HP for it — his level 1 duel is honest only with nail marks banked, so fight him marks-zero. ',
             'His E is engage AND escape in one button: the ten seconds after his blink are your whole trade window. ',
             'Full kits online — sidestep the Q recasts and his burst never adds up; '][i]
        + (i === 2 ? uy.plan.charAt(0).toLowerCase() + uy.plan.slice(1) + '.' : 'take the contact trades your kit is built for.');
    } else if (i === 3) {
      adv = 'Even — Farm & Track';
      why = 'Levels 4-5 vs Locke are a tempo war — he wants quiet farm into his 6; tax his camps, keep his marks off you at contests, and bank the gold lead his weak duel hands you.';
    } else if (i === 4) {
      adv = ultLabel(you, 'Locke', (S6[you] != null ? S6[you] : 5) - S6['Locke']);
      why = 'Purgatory executes anyone who fights below the floor inside his totem — disengage above ~15% or leave the zone entirely. Outside the totem, ' + uy.plan.charAt(0).toLowerCase() + uy.plan.slice(1) + '.';
    } else if (i === 5) {
      adv = 'Lich Bane / Shadowflame Spike';
      why = 'His Lich Bane spike is real: the blink-consume chunk one-shots chipped squishies. Respect the first-item window, then note his E is still a one-way door — punish every spent blink.';
    } else {
      adv = lateLabel(you, 'Locke', (LS[you] != null ? LS[you] : 6.5) - LS['Locke']);
      why = 'Late-game Locke scales with his seal count, not his items — deny executes and his floor never rises. Focus him when E is down and never let "almost dead" linger inside Purgatory.';
    }
    return { stage: st, adv, why };
  });
  return {
    tldr: 'Locke is a weak-side execute jungler' + winNote + ': he loses honest duels and farms for the totem — fight him marks-zero, punish every spent blink, and never coin-flip at sliver HP inside Purgatory.',
    stages,
    start: 'Standard start — his level-1 clear is ranged but mana-hungry and his duel is honest at best; you dictate the early tempo, not him.',
    scuttle: 'Take the first scuttle contact with confidence unless you’re carrying 2-3 nail marks — his blink-consume needs stacks, so an unmarked contest is yours.',
    topObj: 'Contest grubs and herald hard pre-6; post-6, watch the totem drop — leave the pit above the execute floor and re-enter when it expires.',
    invade: 'Invade the quadrant he shows opposite — his escape is one blink on a ten-second timer, and a Locke who spends E on a camp is a kill waiting for a ping.',
    watch: 'Watch your own mark stacks like a cooldown: a stacked nail string into the blink-through consume deletes half a health bar — drop stacks before they mature.',
    weak: 'If he executes a lane early, respect the seal — his floor just rose permanently. Deny the snowball by matching his ganks cross-map rather than duelling into his counter-window.',
    split: 'He punishes greedy splitters with totem duels — send answers in pairs or shove the opposite side; solo brawls at low HP are exactly the fight he farms.',
    picks: 'His picks start with a nail string from fog — hug vision lines, and treat three stacks plus his E up as a dive threat even at even HP.',
    win: 'Win the duel war he keeps declining: invade the spent-blink windows, end fights above his floor, and starve the seal count that his whole late game is built on.'
  };
}

// ---- write Locke's own DB --------------------------------------------------
const lockeDB = {};
enemies.forEach(foe => { lockeDB[foe] = lockeReport(foe); });
fs.writeFileSync(path.join(JD, 'locke.js'),
  '// MatchupCoach — Locke (Jungle) matchup reports. Generated (patch 26.13); stages 0-4 & 6 are\n' +
  '// recomputed at runtime by _jg-headsup-fixes.js/_jg-window-labels.js from the shared duel model.\n' +
  "window.JG_DB = window.JG_DB || {};\n" +
  "window.JG_DB['Locke'] = " + JSON.stringify(lockeDB) + ';\n');

// ---- inject a "Locke" report into every existing jungler's file -------------
const fileFor = {};
fs.readdirSync(JD).filter(f => f.endsWith('.js') && !f.startsWith('_') && f !== 'locke.js').forEach(f => {
  const src = fs.readFileSync(path.join(JD, f), 'utf8');
  const m = /window\.JG_DB\[(?:"([^"]+)"|'([^']+)')\]/.exec(src);
  if (m) fileFor[m[1] || m[2]] = f;
});
let injected = 0, missing = [];
enemies.forEach(you => {
  const f = fileFor[you];
  if (!f) { missing.push(you); return; }
  let s = fs.readFileSync(path.join(JD, f), 'utf8');
  if (s.indexOf('"Locke":') >= 0) return;
  const at = s.lastIndexOf('};');
  s = s.slice(0, at) + ',"Locke":' + JSON.stringify(enemyReport(you)) + s.slice(at);
  fs.writeFileSync(path.join(JD, f), s);
  injected++;
});
console.log(JSON.stringify({ enemies: enemies.length, lockeReports: Object.keys(lockeDB).length, injected, missing }));

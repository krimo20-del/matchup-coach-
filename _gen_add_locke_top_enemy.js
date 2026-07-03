// Append a "locke" enemy entry to every TOP champ's root data files (X vs Locke).
// The 71 top files are hand-authored, so like the mid pass we string-append the new
// entry before the final "};" — no existing byte changes. Text comes from four
// enemy-archetype templates (how a jugg/diver/tank/ranged top-laner plays VS Locke),
// with WR-driven verdicts where fetched (_locke-wr-topjg.json) and group defaults else.
const fs = require('fs');
const path = require('path');
global.window = {};
const CD = path.join(__dirname, 'champ-data');
require(path.join(CD, '_gen-engine.js'));   // for ETAG groups + TONE/RATING
require(path.join(CD, 'rosters.js'));
const ETAG = window.GEN_ENGINE.ETAG;
const TONE = { FAVOURED: '#3ddc97', EVEN: '#e8b84b', TRICKY: '#ff8b3d', HARD: '#ff5d6c' };
const RATING = { HARD: ['8/10','8.5/10'], TRICKY: ['7/10','7.5/10'], EVEN: ['5.5/10','6/10'], FAVOURED: ['4/10','5/10'] };
const WRJ = JSON.parse(fs.readFileSync(path.join(__dirname, '_locke-wr-topjg.json'), 'utf8')).top.vs;
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const NAME = {};
window.ROSTERS.top.forEach(g => g.c.forEach(n => { NAME[slug(n)] = n; }));
delete NAME.locke; // added separately as playable; no self-entry

const GRP_DEFAULT = { jugg: 'EVEN', diver: 'FAVOURED', tank: 'FAVOURED', ranged: 'EVEN' };
const KEY = { slot:'Q', name:'Ritual Nails (Marks)', cd:'10s',
  note:'The nail marks are his whole engine — without 2-3 stacks on you his blink-in barely dents; sidestep the recasts and punish the ten seconds of nothing.',
  winT:'NAILS DOWN' };

// ---- enemy-perspective templates (ME = the top champ, vs Locke) ---------------
const T = {
  jugg: {
    tldr: (me)=>`He needs six clean windows to do what your one all-in does — deny the nail stacks and ${me} turns his blink lane into a walk home.`,
    breakdown: (me)=>`Locke wins by taxing you with Ritual Nails and cashing marks with a blink-bite. Refuse the tax: sidestep the recasts, hold your engage for the ten seconds after his E, and force the long brawl his kit dodges. Post-6, respect Purgatory — never keep fighting below ~15% inside his totem, and never chase him at sliver HP.`,
    dos: ['Sidestep the Q recasts — no marks, no lane','All-in the window right after his E is spent','Break off fights before the Purgatory floor, not at it'],
    donts: ['Trade while holding 2-3 nail marks','Burn your gap-closer while his E is up','Coin-flip at low HP inside his totem zone'],
    win: 'Dodge the nails, force the brawl his blink can’t leave, and end fights above his execute floor.'
  },
  diver: {
    tldr: (me)=>`You stat-check him in every honest window — his only outs are the mark tax and the totem, so give him neither and ${me} runs the lane.`,
    breakdown: (me)=>`Locke cannot match your trade pattern: his E is engage AND escape, so every commit he makes is a one-way door. Dodge the nail recasts, then dive the ten-second window after his blink — he has 125 range and no answer. The one honest threat is Purgatory: leave fights above ~15% or leave his zone entirely, and his 6 becomes a light show.`,
    dos: ['Punish the post-E window with your full pattern','Stand where the Q recast lines are blocked by minions','Snowball plates — he farms scared without E up'],
    donts: ['Dive him at low HP with his totem down','Eat three nail stacks before you commit','Let W’s grey health refund his mistakes — kill through the window, not around it'],
    win: 'Dodge nails, dive the spent blink, and finish fights fast enough that grey health refunds nothing.'
  },
  tank: {
    tldr: (me)=>`His whole kit is designed for HP bars that end — yours doesn't. Soak the nail tax, waste his windows, and ${me} out-scales the executioner.`,
    breakdown: (me)=>`Locke's damage is windows and marks, and tanks make both unprofitable: his passive scales with missing health you barely miss, and his execute floor needs a fight your engage decides anyway. Eat the nails, farm the lane, and engage on the E-down window when your jungler shows. His one real win condition is you coin-flipping at sliver HP inside Purgatory — simply don't.`,
    dos: ['Trade right after his E blink is spent','Sit on your engage until his nails whiff','Back off at low HP when the totem drops — it can’t chase'],
    donts: ['Stand in the full Q recast line for free','Fight at sliver HP inside Purgatory','Let him free-shove and roam — his ganks execute low lanes'],
    win: 'Soak the tax, punish the spent blink, and make the execute floor irrelevant by never fighting under it.'
  },
  ranged: {
    tldr: (me)=>`He's a 125-range mana champ walking into your poke — win the lane at range and never gift the one blink window that flips it.`,
    breakdown: (me)=>`Pre-6 this lane is yours for free: he pays HP for every CS and his only engage is a blink he can't spend twice. Poke, but track his marks — 2-3 nail stacks on you plus E up is his entire kill script, so drop stacks (back off, let them expire) before they mature. Post-6 keep a health margin: Purgatory turns 'I survived his combo at 20%' into a death sentence.`,
    dos: ['Poke the mana bar as hard as the health bar','Reset your nail stacks before they hit three','Hold your self-peel strictly for his blink'],
    donts: ['Stand at max nail range while marked','Waste your escape on poke spacing','Fight inside the totem below a quarter HP'],
    win: 'Own the range war, break the mark chain, and never let one blink undo ten minutes of poke.'
  }
};

const STAGE_LABELS = ['Level 1','Level 2','Level 3','Levels 4-5','Level 6','First item','2+ items'];
const DIFF_SCORE = { FAVOURED: 1.3, EVEN: 0, TRICKY: -0.7, HARD: -1.5 };
// Locke's power curve from the ENEMY's viewpoint (his 6/first-item spikes are their dips)
const VS_LOCKE_MOD = [0.3, 0.2, 0.1, 0.1, -0.6, -0.7, 0.1];
const PHASE_WHY = [
  'Level 1 he’s a 125-range mana champ throwing nails — step off the recast lines and take what the range difference offers.',
  'His E is online but it’s also his only exit — any trade he takes is a one-way door you get to close.',
  'Full kit online for both of you — the mark count decides every exchange, so watch your own debuff bar like a cooldown.',
  'Levels 4-5 the nail tax ramps — drop your stacks before they hit three and punish the ten seconds after each spent blink.',
  'Purgatory changes the rules: fights now end at HIS floor — disengage above ~15% or leave the totem zone entirely.',
  'Lich Bane spike — his blink-bite now genuinely one-shots marked squishies. Respect the all-in until his E is down.',
  'At two-plus items his execute stops scaling faster than your build — play your own win condition and end fights above the floor.'
];
function phasesFor(diff, meName) {
  const out = [];
  for (let i = 0; i < 7; i++) {
    const score = DIFF_SCORE[diff] + VS_LOCKE_MOD[i];
    let side = 'Skill';
    if (score > 0.55) side = meName;
    else if (score < -0.55) side = 'Locke';
    const rating = side === 'Skill' ? (i >= 4 ? '6/10' : '5/10')
      : (5 + Math.min(3, Math.round(Math.abs(score) * 1.6))) + '/10';
    out.push({ label: STAGE_LABELS[i], side, rating, why: PHASE_WHY[i] });
  }
  return out;
}

function buildEntries(k) {
  const me = NAME[k];
  const grp = (ETAG[k] || { grp: 'jugg' }).grp;
  const t = T[grp];
  const diff = (WRJ[k] && WRJ[k].enemyDiff) || GRP_DEFAULT[grp];
  const tone = TONE[diff];
  const dr = RATING[diff];
  const dos = t.dos, donts = t.donts;
  const winS = 'His nails just whiffed and the blink is down — this is the window the whole lane waits for.';
  const dataEntry = {
    diff, tone,
    tldr: t.tldr(me),
    breakdown: t.breakdown(me),
    dos, donts,
    key: { slot: KEY.slot, name: KEY.name, cd: KEY.cd, note: KEY.note, winT: KEY.winT, winS },
    win: t.win
  };
  const tradeGood = 'His Q recasts whiffed and E is spent — take the trade your kit is built for.';
  const tradeBad = 'Fighting with 2-3 nail marks on you while his E is up — that’s his entire kill script, pre-paid.';
  const winCon = t.win.replace(/\.$/, '') + '. Track Ritual Nails before every commit and watch your own mark count like a cooldown.';
  const phases = phasesFor(diff, me);
  const wave = 'Best wave: a slow-push he must clear at 125 range while your poke or engage taxes him. Worst wave: a frozen line he can blink-bite across for free. Crash timing: crash to reset, take plates, or shadow his roams — a shoved-in Locke executes low side lanes.';
  const mistakes = donts.map(s => s.replace(/\.$/, '')).join('. ') + '. Don’t spend your ultimate on chip damage — it is the kill window.';
  const ahead = 'Snowball the E-down windows: every spent blink is a free dive, and a Locke behind on seals never gets his late-game floor.';
  const behind = 'Behind, break the mark chain and farm safe — his kill script needs stacks AND his blink; deny either and the lane resets. Never re-enter Purgatory range at low HP.';
  const fullEntry = {
    tldr: dataEntry.tldr,
    winCon,
    enemyWin: 'Locke wins by landing Ritual Nails (Marks), stacking you to 2-3, and cashing the blink-bite — then Purgatory forecloses any fight you keep taking at low HP.',
    diff, tone, diffRating: dr[0], carryRating: dr[1],
    phases,
    breakdown: {
      early: 'Levels 1-3: he pays for every CS at 125 range — tax him, but step off the Q recast lines; the mark stacks are the only currency he trades in.',
      mid: 'Post-6: the totem rewrites fight math — win exchanges early, disengage above the floor, and punish the ten seconds after every spent E.',
      wave,
      cooldowns: '- Locke Ritual Nails (Marks): matchup-defining — ' + KEY.note + ' Track it before every step-up. - Locke E (Ashen Pursuit): his ONLY mobility, resets on takedowns — the post-E window is the lane. - Locke R (Purgatory): never fight at sliver HP inside the zone.',
      trading: 'Good trade: ' + tradeGood + ' Bad trade: ' + tradeBad,
      spikes: 'His spikes: level 6 (Purgatory), Q max at 9, Lich Bane. Your anti-spikes: his E cooldown, expired marks, and any fight that ends above his floor.',
      feeding: 'If Locke gets one kill, respect the seal — his execute floor just rose permanently. Two kills: play for the team and never coin-flip low-HP fights near his totem.',
      carry: 'Carry pattern vs Locke: deny seals. A Locke without executes never scales his floor, and a Locke without E up is a minion with a health bar.',
      difficulty: (diff === 'HARD' ? 'Hard matchup' : diff === 'TRICKY' ? 'Tricky matchup' : diff === 'FAVOURED' ? 'Favoured matchup' : 'Even matchup') + ' — difficulty ' + dr[0] + ', Locke carry threat ' + dr[1] + '.',
      late: 'Late: his floor is as high as his seal count — end fights above it, focus him when E is down, and never let "almost dead" linger inside Purgatory.'
    },
    loading: '- ' + me + ' vs Locke - Track: Locke Ritual Nails (Marks). - Watch your own mark stacks like a cooldown. - Engage only on the post-E window. - Never fight at sliver HP inside Purgatory.',
    focus: { text: 'Locke Ritual Nails (Marks)', letters: ['Q'] },
    dosFull: [
      { t: dos[0], d: KEY.note + ' Only commit once it is down or baited.' },
      { t: dos[1], d: tradeGood },
      { t: dos[2], d: 'Locke wastes Ritual Nails — that is your full-commit window.' }
    ],
    dontsFull: [
      { t: donts[0], d: 'That is Locke’s favourite window — refusing it removes half his win condition.' },
      { t: donts[1], d: 'E is his engage AND escape — a spent blink is the lane’s biggest cooldown; don’t waste yours before it.' },
      { t: donts[2], d: tradeBad }
    ],
    tradeGood, tradeBad,
    ahead,
    report: [
      { h: 'TL;DR', t: dataEntry.tldr },
      { h: 'Core Lane Win Condition', t: winCon },
      { h: 'Level Advantage Chart', t: 'Skill-based; spikes decide it. See the level-by-level chart for the swing points.' },
      { h: 'Trading Rules', t: 'Good trade: ' + tradeGood + ' Great trade: Locke wastes Ritual Nails — commit immediately. Bad trade: ' + tradeBad },
      { h: 'Wave Management', t: wave },
      { h: 'Key Ability Interactions', t: 'Track Locke’s Ritual Nails (Marks): ' + KEY.note + ' Commit only while it is down.' },
      { h: 'Rune Setup', t: 'Take your standard rune page for this class — into Locke, prioritize sustain-through-poke (Second Wind/Doran’s Shield pattern) if you’re melee, and Bone Plating to blunt the blink-bite.' },
      { h: 'Summoner Spells', t: 'Standard for your champion. His kill script needs Flash less than yours does — E is his Flash, and it’s on a 10-second timer you can see.' },
      { h: 'Itemization', t: 'Early HP and MR blunt the nail chip (his damage is AP). A stopwatch/Zhonya’s-class answer beats Purgatory outright: untargetable at the floor = execute denied. Anti-heal is optional — his sustain is self-refund, not lifesteal.' },
      { h: 'All-In Windows', t: 'Commit on the post-E window, on whiffed nail recasts, and with your jungler when his totem is down. Bait his answer first.' },
      { h: 'Roam & Jungle Interaction', t: 'A shoved-in Locke roams like an assassin — his ganks execute chipped lanes. Match his roams or tax his tower; ping the moment he leaves lane with 6 up.' },
      { h: 'Common Mistakes', t: mistakes },
      { h: 'How to Play From Behind', t: behind },
      { h: 'How to Snowball', t: ahead },
      { h: 'Final Matchup Rating', t: (diff === 'HARD' ? 'Hard matchup' : diff === 'TRICKY' ? 'Tricky matchup' : diff === 'FAVOURED' ? 'Favoured matchup' : 'Even matchup') + ' — difficulty ' + dr[0] + ', Locke carry threat ' + dr[1] + '.' }
    ]
  };
  return { dataEntry, fullEntry };
}

function appendEntry(file, entryJson) {
  let s = fs.readFileSync(file, 'utf8');
  if (s.indexOf('"locke":') >= 0) return 'already';
  const at = s.lastIndexOf('};');
  if (at < 0) return 'noclose';
  s = s.slice(0, at) + ',"locke":' + entryJson + s.slice(at);
  fs.writeFileSync(file, s);
  return 'added';
}

// Irregular layouts: galio's short-card data lives in galio-champ.js; masteryi has
// no CHAMP_DATA file at all (renders from CHAMP_FULL + MC_WR_TABLES only).
const DATA_FILE = { galio: 'galio-champ.js', masteryi: null };
let added = 0, skipped = [], missingFiles = [];
Object.keys(NAME).forEach(k => {
  const dfName = DATA_FILE[k] !== undefined ? DATA_FILE[k] : k + '.js';
  const df = dfName ? path.join(CD, dfName) : null;
  const ff = path.join(CD, k + '.full.js');
  if ((df && !fs.existsSync(df)) || !fs.existsSync(ff)) { missingFiles.push(k); return; }
  const { dataEntry, fullEntry } = buildEntries(k);
  if (df) {
    const r1 = appendEntry(df, JSON.stringify(dataEntry));
    if (r1 === 'added') added++; else skipped.push(k + ':' + r1);
  }
  const r2 = appendEntry(ff, JSON.stringify(fullEntry));
  if (r2 === 'added') added++; else skipped.push(k + '.full:' + r2);
});
console.log(JSON.stringify({ topChamps: Object.keys(NAME).length, filesAppended: added, missingFiles, skipped: skipped.slice(0, 8) }));

// _reddit-validated-fixes.js — hand-validated matchup corrections.
//
// Loaded LAST (after _phase-accuracy-fixes.js). Cross-references matchups against
// current win-rate / counter data (lolalytics primarily — Emerald+ samples) and
// corrects the VERDICT (diff) + the 7-stage FAVOUR WINDOWS where the generated
// data was wrong. Where a real win rate is known it is also written to
// window.MC_REAL_WR so the app shows the REAL number (not the verdict estimate)
// AND the verdict is derived from that number, so they can never disagree.
//
// `win` (optional) = who owns each lane stage, in order:
//   [Level 1, Level 2, Level 3, Levels 4-5, Level 6, First item, 2+ items]
//   — a champion display name, or 'Skill' for an even window. null = don't touch.
// Same idempotent retry pattern as the other fix files; longest loop so this layer
// settles AFTER the generated phase layers (it is the source of truth).
(function () {
  'use strict';
  var TONE = { FAVOURED: '#3ddc97', HARD: '#ff5d6c', EVEN: '#e8b84b', TRICKY: '#ff8b3d', MIRROR: '#e8b84b' };
  var STAGES = ['level 1', 'level 2', 'level 3', 'levels 4-5', 'level 6', 'first item', '2+ items'];
  var DISP = { chogath: "Cho'Gath", drmundo: 'Dr. Mundo', ksante: "K'Sante", tahmkench: 'Tahm Kench' };
  function disp(s) { return DISP[s] || (s.charAt(0).toUpperCase() + s.slice(1)); }

  // ===== hand-set top-lane pairs (verdict + windows) =====
  var FIX = [
    { a: 'darius',   b: 'garen',       da: 'FAVOURED', db: 'TRICKY',   win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Garen'] },
    { a: 'camille',  b: 'fiora',       da: 'FAVOURED', db: 'TRICKY',   win: ['Fiora', 'Skill', 'Skill', 'Skill', 'Skill', 'Camille', 'Camille'] },
    { a: 'renekton', b: 'darius',      da: 'FAVOURED', db: 'TRICKY',   win: ['Darius', 'Renekton', 'Renekton', 'Renekton', 'Skill', 'Skill', 'Darius'] },
    { a: 'darius',   b: 'nasus',       da: 'FAVOURED', db: 'TRICKY',   win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Nasus'] },
    { a: 'darius',   b: 'mordekaiser', da: 'FAVOURED', db: 'TRICKY',   win: ['Darius', 'Darius', 'Darius', 'Darius', 'Mordekaiser', 'Skill', 'Skill'] },
    { a: 'fiora',    b: 'jax',         da: 'EVEN',     db: 'EVEN',     win: ['Skill', 'Skill', 'Skill', 'Skill', 'Skill', 'Fiora', 'Fiora'] },
    { a: 'malphite', b: 'tryndamere',  da: 'FAVOURED', db: 'HARD',     win: ['Tryndamere', 'Tryndamere', 'Skill', 'Skill', 'Malphite', 'Malphite', 'Malphite'] }
  ];

  // ===== AATROX (top) — real lolalytics win rates (Emerald+, patch 26.12) =====
  // The verdict AND the displayed win rate both come from these numbers. Aatrox is
  // one of the WEAKEST level 1-3 champions in the game, so his favoured lanes use a
  // "no level-1" window (even L1-2, Aatrox owns L3 -> first item; hard-scalers take
  // 2+ items). Sources: lolalytics aatrox/vs/<x> + aatrox/counters.
  window.MC_REAL_WR = window.MC_REAL_WR || {};
  var WR = {
    aatrox: {
      // losses (lolalytics Emerald+) — scalers, ranged poke, mobile skirmishers
      kayle: 44.9, singed: 45.1, kennen: 45.6, cassiopeia: 46.2, ornn: 47.6, zed: 47.7,
      irelia: 47.9, malphite: 48.3,
      // even (~49-52%)
      urgot: 49.0, kled: 49.1, wukong: 49.5, aurora: 49.8, fiora: 49.8, illaoi: 49.8,
      gangplank: 49.9, sylas: 50.5, yone: 50.8, pantheon: 50.7, garen: 51.2, volibear: 51.2,
      gnar: 51.3, warwick: 51.3, renekton: 51.1, olaf: 51.7, darius: 51.8, riven: 50.3,
      ryze: 50.3, gragas: 50.4, tryndamere: 50.6, quinn: 50.6, jayce: 50.7, jax: 52.1,
      nasus: 52.4, ambessa: 52.4, heimerdinger: 52.4, yasuo: 52.5,
      // favoured (>=52.5%)
      ksante: 52.8, gwen: 52.9, trundle: 53.0, mordekaiser: 53.1, sett: 53.2, sion: 53.4,
      chogath: 53.7, yorick: 53.8, rumble: 53.9, teemo: 53.9, akali: 53.9, vayne: 54.1,
      camille: 54.5, shen: 54.5, vladimir: 55.3, poppy: 55.7, varus: 55.9, naafiri: 56.0,
      drmundo: 56.3, swain: 57.1, tahmkench: 58.2,
      // off-meta / flex opponents — real lolalytics Emerald+ top-lane samples (patch 16.12)
      galio: 52.6, kassadin: 48.9, lucian: 50.6, akshan: 47.0, graves: 51.9, ziggs: 54.5,
      karma: 51.3, neeko: 53.5, maokai: 48.0, sejuani: 51.8, zac: 56.2, lillia: 52.3,
      nautilus: 51.2, mel: 56.2
    }
  };
  // hard-scalers who reclaim the 2+ item window even in an Aatrox-favoured lane
  var SCALER = { vladimir: 1, kassadin: 1, nasus: 1, chogath: 1, camille: 1, vayne: 1, kayle: 1, ryze: 1, gangplank: 1, kled: 1, cassiopeia: 1, yorick: 1, akali: 1, gwen: 1, ksante: 1, yasuo: 1 };
  function diffFromWr(wr) { return wr >= 52.5 ? 'FAVOURED' : wr >= 48.5 ? 'EVEN' : wr >= 45.5 ? 'TRICKY' : 'HARD'; }
  function mirrorDiff(d) { return d === 'FAVOURED' ? 'TRICKY' : d === 'EVEN' ? 'EVEN' : 'FAVOURED'; }
  Object.keys(WR).forEach(function (champ) {
    var m = WR[champ];
    Object.keys(m).forEach(function (en) {
      var wr = m[en], da = diffFromWr(wr);
      window.MC_REAL_WR[champ] = window.MC_REAL_WR[champ] || {}; window.MC_REAL_WR[champ][en] = wr;
      window.MC_REAL_WR[en] = window.MC_REAL_WR[en] || {}; window.MC_REAL_WR[en][champ] = Math.round((100 - wr) * 10) / 10;
      // window override only for the favoured lanes (where the "Aatrox owns L1" bug lives)
      var win = (da === 'FAVOURED')
        ? ['Skill', 'Skill', disp(champ), disp(champ), disp(champ), disp(champ), SCALER[en] ? disp(en) : 'Skill']
        : null;
      FIX.push({ a: champ, b: en, da: da, db: mirrorDiff(da), win: win });
    });
  });

  // ===== per-matchup BREAKDOWN + level-by-level WHY rewrites =====
  // Bespoke, level-specific text for matchups whose call changed (so the writeup
  // matches the new verdict instead of contradicting it). early = levels 1-3,
  // mid = levels 4-6, late = late game; whys[] = one line per stage
  // [L1, L2, L3, L4-5, L6, first item, 2+ items].
  var CONTENT = [
    {
      a: 'aatrox', b: 'teemo',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 2–3', text: 'Your Q+W+E combo comes online — first window to punish him through a blind.' },
        { when: 'Lvl 6', text: 'R + Serrated Dirk: your hardest all-in. Run him down on his blind cooldown.' },
        { when: '1st item', text: 'Eclipse / Profane Hydra — your power peak. Force every all-in here.' },
        { when: 'Late', text: 'You fall off vs his shrooms + splitpush. Close the lane before ~25 min.' }
      ],
      wants: {
        you: ['Bait the blind (Q), then E-W-Q all-in before it comes back up', 'Reach your level 2-3 combo and force trades his poke can’t sustain', 'Snowball and end before his shrooms / splitpush take over'],
        foe: ['Blind your Q autos every trade and kite back with move speed', 'Poke you down and stack shrooms on chokes and objectives', 'Survive lane and scale into a splitpush + vision threat']
      },
      early: "Teemo's blind (Q) is the whole early game — it shuts off your Q autos and W, so don't step into auto range to throw a Q he can just blind. Farm safely with the tip of Q and accept you'll take a little poke. The good news: his poke can't out-damage your sustain, and he has no escape once you reach him.",
      mid: "This is your takeover. With Serrated Dirk and your Q cooldown dropping you out-trade his poke and heal it back; bait the blind, then E in, W-pull, and Q-sweetspot. At 6 your R turns every all-in lethal — Teemo can't kite a healing juggernaut sitting on top of him with no dash.",
      late: "You own the straight 1v1 all game, but Teemo stops being a laner and becomes a map problem — shrooms on objectives and splitpush. Win lane hard early so his scaling utility never matters, and never facecheck a brush near dragon/herald.",
      whys: [
        "His blind (Q) cancels your Q autos and W. At level 1 he can only poke — last-hit with Q range, stay out of his autos, and don't burn E chasing.",
        "He'll blind the instant you step up. Bait the blind before you commit your own combo — once Q is down he has nothing to stop you.",
        "With all three abilities you E in, W-pull, and Q-sweetspot through the blind window. One full combo halves a squishy, escape-less Teemo.",
        "Your Q cooldown drops and sustain comes online — you out-trade his poke and heal it back. Engage every time his blind is on cooldown.",
        "R + E runs him down: no dash, no escape, and your healing eats his DPS. This is your cleanest kill window of the lane.",
        "Your Serrated/Eclipse spike outpaces his — keep forcing the all-in on his blind timer; he can't trade back.",
        "You still win the duel, but his shrooms and splitpush start to matter. Respect mushroom walls around objectives and don't facecheck brush."
      ]
    },
    {
      a: 'aatrox', b: 'tahmkench',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 3', text: 'Combo online — you out-trade a weak laning Tahm immediately.' },
        { when: 'Lvl 6', text: 'R runs him down; his grey-health W only delays it.' },
        { when: '1st item', text: 'Your spike vs his nothing — the hardest stomp window of any lane.' },
        { when: 'Late', text: 'He becomes a teamfight tank; your 1v1 edge holds but his team utility grows.' }
      ],
      wants: {
        you: ['Pin him under tower and deny CS — he has no waveclear', 'All-in on every cooldown; he can’t trade back pre-6', 'Convert the stomp to plates, roams and tempo'],
        foe: ['Survive lane with W (Devour) grey health and farm what he can', 'Avoid your all-ins and scale to a teamfight tank / peeler', 'Use R to roam and make plays elsewhere on the map']
      },
      early: "Your single best matchup. Tahm has no waveclear and a feeble level 1, so he can't contest you — but don't walk face-first into a W (Devour) animation for a free grey-health trade. Set the wave up, poke with Q tip, and wait for your combo to come online; there's no rush against a champ who just wants to survive.",
      mid: "You stomp this window. Full combo (E in, W-pull, Q-sweetspot) chunks him and his grey-health shield only delays it — he literally cannot trade back. Crash waves and force him under tower where his W can't reposition him out, and deny every CS you can.",
      late: "Tahm becomes a teamfight tank/peeler, not a duelist — in lane he never beats you. You've already won; convert the lead to plates, roams, and tempo before his pick/peel utility starts to matter for his team.",
      whys: [
        "Tahm has no waveclear and a weak level 1, but don't over-commit into a W (Devour). Farm and set up — you don't need to force anything yet.",
        "He'll W-devour you if you dive in carelessly. Poke with Q tip and don't hand him a free grey-health trade.",
        "Full combo online — Q-sweetspot + W-pull chunks him and he can't answer. His only out is to W away or eat it.",
        "You out-sustain and out-damage; his grey-health just delays the kill. Crash the wave and pin him under tower where W can't save him.",
        "R plus your sustain runs him down. His R is a roam/engage tool, not a 1v1 button — he loses the all-in flatly.",
        "Your spike is huge and his is nothing — the hardest you'll ever stomp a lane. Deny CS, take plates, snowball.",
        "He turns into a teamfight tank/peeler. You won lane long ago — translate it to the map before his utility matters."
      ]
    },
    {
      a: 'aatrox', b: 'vladimir',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Vladimir'],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo bursts him before pool — bait the W, then all-in.' },
        { when: 'Lvl 6', text: 'R + pull out of pool range = your cleanest kill window.' },
        { when: '1st item', text: 'Your bruiser spike still beats his first AP item — close NOW.' },
        { when: '2+ items', text: 'Vlad takes over — full-AP scaling kites and bursts you.' }
      ],
      wants: {
        you: ['Bully his weak early; bait Sanguine Pool (W) then all-in', 'Deny Q stacks and kill him before his items', 'Snowball lane so his late-game scaling never matters'],
        foe: ['Pool (W) your burst / CC and survive the early', 'Farm safely and stack health + AP toward Rylai’s', 'Out-scale into an unkillable late-game AP threat']
      },
      early: "Vlad is one of the weakest level-1 champs in the game and has no escape until his pool (W) — but you're also weak at 1, so don't force a fight you can't finish. Deny his Q last-hits, watch your mana, and set up the lane for your level-3 spike.",
      mid: "Your kill window. Bait the Sanguine Pool (W) — once it's down he has no defensive tool, so E in, W-pull, Q-sweetspot for the burst. Keep him low, deny his Q stacks, and force him to pool early so its long cooldown is up when you all-in.",
      late: "This is a race against his scaling. Full-AP Vlad with Rylai's/Cosmic Drive out-sustains and kites you — if you didn't snowball lane, late game is his. Close it out before his second item, then play safe and let your team handle late Vlad.",
      whys: [
        "Vlad is one of the weakest level-1s — but so are you. Don't force; deny his Q last-hits and set the lane up.",
        "He has no escape until W. Poke with Q, mind your mana — neither of you wants a long fight yet.",
        "Your combo bursts him before pool comes up. Bait the W — once it's down he's defenseless and you all-in.",
        "You out-trade and out-sustain a pre-Rylai's Vlad. Keep him low and force the pool so its cooldown is up when you commit.",
        "Pull him out of pool range and R for the kill — your last clean window before his items take over.",
        "Your bruiser spike still beats his first AP item. Close the lane out NOW; every minute past here swings to him.",
        "He out-scales hard: full-AP Vlad kites and bursts you. You needed the lead by now — play safe and let your team deal with him."
      ]
    },
    {
      a: 'aatrox', b: 'camille',
      win: ['Camille', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Camille'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Camille’s window: E-Q out-trades your weak early. Concede trades.' },
        { when: 'Lvl 3–6', text: 'Your sustain flips it — drain-tank wins the extended fight.' },
        { when: '1st item', text: 'Your Eclipse spike beats her first item in a long trade.' },
        { when: '2+ items', text: 'Camille flips it — R isolation + true damage shred you in a pick.' }
      ],
      wants: {
        you: ['Survive her early E-Q, then drain-tank the extended fights', 'Bait her E (escape / reset) before you R all-in', 'Win lane mid-game before her item spikes swing it'],
        foe: ['Out-trade you early with the E-Q hookshot burst', 'Avoid long fights; poke, reset, and scale', 'Use R to isolate and 1v1 you in the side lane late']
      },
      early: "Camille's E-Q (hookshot into empowered auto) genuinely out-trades you early — her true damage and shield beat your weak level 1-2. Concede the first couple of trades, stand away from terrain so her hookshot has no stun, and farm until your sustain comes online.",
      mid: "The drain-tank flips it. Eat her burst, then Q-sweetspot + W-pull and out-heal the trade — she can't kill you and you out-DPS her in a long fight. Bait her E (the escape/reset) before you all-in; without it she has no way out of your R.",
      late: "Two items in she swings it back — her R isolation + true damage shred you in a pick. You own the lane and the extended 1v1 mid-game, but late she wins the side-lane skirmish, so don't get caught alone.",
      whys: [
        "Camille's E-Q out-trades you at level 1 — true damage + shield beat your weak early. Concede the first trades and farm.",
        "She'll E off a wall and Q you. Stand away from terrain so the hookshot can't stun, and bait the E before stepping up.",
        "Now your sustain flips it — eat her burst, then Q-sweetspot + W-pull and out-heal the trade. She can't kill you.",
        "Drain-tank takes over: long fights are yours. Force extended trades where her burst-then-wait loses to your healing.",
        "Bait her E escape, then R + pull — without the hookshot reset she's dead. Your strongest kill window.",
        "Your Eclipse/Goredrinker spike beats her first item in a sustained fight — keep forcing the all-in, deny the poke-and-reset.",
        "Two items in she flips it: R isolation + true damage shred you in a pick. You win lane; she wins the late side-lane 1v1."
      ]
    },
    {
      a: 'aatrox', b: 'vayne',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Vayne'],
      spikes: [
        { when: 'Lvl 3', text: 'You catch her — E-W-Q is a kill on her tumble cooldown.' },
        { when: 'Lvl 6', text: 'R + pull deletes a squishy, escape-less Vayne.' },
        { when: '1st item', text: 'Your spike crushes a one-item Vayne — end the lane.' },
        { when: '2+ items', text: 'Do-or-die: at 2+ items she out-scales the entire map.' }
      ],
      wants: {
        you: ['Catch her with E-W-pull; she has no escape but Condemn', 'Deny CS relentlessly — starve her scaling', 'Kill her before items or she becomes unbeatable'],
        foe: ['Poke with tumble + autos and stay off walls so you can’t chase', 'Survive lane and farm to crit items', 'Scale into a %-HP true-damage hypercarry']
      },
      early: "Vayne top is short-range, squishy, and has no escape from your pull-knockup — she can only poke with autos + tumble (Q) and stun you on a wall with Condemn (E). Farm, stay off walls, and don't waste your E; her chip damage means nothing against your sustain.",
      mid: "Hard-stomp window. E in, W-pull, Q-sweetspot — one full combo on her tumble cooldown is a kill, and she has no way out but Condemn. Deny her CS relentlessly: her entire game is scaling, so every missed minion delays the carry she becomes.",
      late: "This is do-or-die. If Vayne survived to 2+ items she out-scales the entire map — her %-HP true damage shreds even a tanky Aatrox. You had to kill her early; if she's farmed, the late game is hers, full stop.",
      whys: [
        "Vayne pokes with autos + tumble but can't all-in a sustain bruiser. Farm, stay off walls (Condemn stun), don't waste E.",
        "She'll tumble-auto for poke — chip you heal back. Deny CS and wait for your combo to come online.",
        "Now you catch her: E in, W-pull, Q-sweetspot. No escape but Condemn — stand off walls and she dies to one combo.",
        "You hard-stomp here: squishy, no sustain. Every all-in on her tumble cooldown is a kill; deny CS so she never scales.",
        "R + pull deletes her — do-or-die window. If she farms to items she becomes a problem, so end the lane now.",
        "Your spike still crushes a one-item Vayne. Force the all-in, take her tower, deny her power curve.",
        "If she hit 2+ items she out-scales everyone — %-HP true damage shreds tanky Aatrox. You needed her dead; late is hers."
      ]
    },
    {
      a: 'aatrox', b: 'shen',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 3', text: 'Full combo out-trades his weak base damage.' },
        { when: 'Lvl 6', text: 'You win the 1v1; watch his R to punish the wave when he globals.' },
        { when: '1st item', text: 'Your spike dwarfs his — take tower, force the roam choice.' },
        { when: 'Late', text: 'Shen is a teamfight engage / peeler; the game is about his global.' }
      ],
      wants: {
        you: ['Out-trade his weak damage and bait his taunt (E)', 'Track his R and punish the wave when he globals', 'Shove and force him to choose farm vs roam'],
        foe: ['Farm even and scale; his solo kill pressure is low', 'Use R to impact other lanes globally', 'Become a teamfight engage / peel frontliner']
      },
      early: "Shen has weak base damage and zero kill pressure — he just wants to scale and use R for the map. Farm even, don't over-extend for a fight he can't start, and respect that his value is global, not the 1v1.",
      mid: "You out-trade him in every extended fight — Q-sweetspot through his sword (Q) procs and bait his taunt (E), his only peel. The real game here is tracking his R: when he globals to save a teammate, punish the wave for free plates and CS.",
      late: "He's a teamfight engage/peeler, not a laner. You win the 1v1 all game; the match now hinges on who uses Shen's global better — so keep shoving and force him to choose between farming and roaming.",
      whys: [
        "Shen has weak base damage and no kill pressure. Farm even — don't waste resources on a scale-and-roam champ.",
        "His Q (sword) is his only poke. Trade when it's on cooldown and you out-damage him easily.",
        "Full combo out-trades him hard — Q-sweetspot through his trades; his taunt (E) is his only peel and you bait it.",
        "You win every extended fight. Track his R — when he globals to defend a teammate, shove and punish the wave.",
        "You beat him 1v1; his R is for the map. Punish every time he ults away — free plates and CS.",
        "Your spike dwarfs his. Take tower and force him to choose between farming and roaming — you profit either way.",
        "Late he's a teamfight engage/peeler, not a laner. You won lane; the game is about who uses Shen's global better."
      ]
    },
    {
      a: 'aatrox', b: 'swain',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Swain'],
      spikes: [
        { when: 'Lvl 1–2', text: 'His E (root) is the only threat — dodge it and he’s weak.' },
        { when: 'Lvl 3–5', text: 'Bait the root, then E-W-Q all-in; your sustain beats his W.' },
        { when: 'Lvl 6', text: 'Kill him FAST before R drain ramps — don’t poke in the ult radius.' },
        { when: '2+ items', text: 'Full-build Swain is a drain-tank that out-sustains you.' }
      ],
      wants: {
        you: ['Dodge Nevermove (E) and all-in when it whiffs', 'Deny soul-fragment stacks that fuel his R', 'Win lane early before his drain-tank scaling'],
        foe: ['Land E (root) to set up his all-in', 'Stack passive fragments and survive to 6', 'Scale into a drain-tank teamfighter with R']
      },
      early: "Swain's E (Nevermove root) is the only thing to fear — never get rooted from bush range, because that's his entire kill setup. Beyond the root his level 1-2 is a weak melee-range mage; farm with Q tip and don't facecheck for the E.",
      mid: "Dodge the root and he has nothing. Bait the E, then E-W-Q all-in — your sustain beats his W poke and he has no escape. Keep him low and deny his passive (soul fragment) stacks, since those are what fuel his ultimate.",
      late: "His R (Demonic Ascension) drain is dangerous in a long fight, so kill him FAST — burst him before R ramps, don't sit in the ult radius poking. Full-build Swain becomes a drain-tank teamfighter who out-sustains you, so the lead has to come early.",
      whys: [
        "Swain's E (root) is the danger — never get rooted from bush range. His level 1 is weak; farm and respect the E.",
        "Dodge the E and he has no trade. Poke with Q tip and don't facecheck for the root.",
        "If he whiffs E you all-in free. Bait the root, then E-W-Q — no escape, and your sustain beats his W poke.",
        "You out-trade a pre-6 Swain easily. Keep him low and deny the soul-fragment stacks that fuel his R.",
        "His R drain is scary in a long fight — kill him FAST, burst before R ramps. Don't sit in the ult radius poking.",
        "Your bruiser spike beats his first item. Force short, decisive all-ins, not drawn-out fights his R out-sustains.",
        "Full-build Swain is a drain-tank teamfighter who out-sustains you in long fights — win lane early so it never matters."
      ]
    },
    {
      a: 'aatrox', b: 'kayle',
      win: ['Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Kayle'],
      spikes: [
        { when: 'Lvl 2–5', text: 'Your window: Kayle can’t fight back pre-6. All-in repeatedly.' },
        { when: 'Lvl 6', text: 'R kills her; her R only delays. Force the all-in.' },
        { when: '1st item', text: 'Last clean window — her ranged form at 11 flips it.' },
        { when: 'Lvl 11 / 16', text: 'Kayle’s spikes — ranged form (11) and untouchable R (16) win the game.' }
      ],
      wants: {
        you: ['Trap her under tower; deny CS and XP to delay her spikes', 'All-in on every cooldown pre-6 — she can’t fight back', 'Build a huge lead before level 11 or she out-scales'],
        foe: ['Survive the brutal early and farm safely', 'Hit level 11 (ranged form) to flip the lane', 'Reach level 16 R and become an unkillable carry']
      },
      early: "You stomp the LANE — Kayle is the single weakest early champion in the game — but the matchup is rated hard because she wins the GAME if she scales. Your whole job from minute one is to deny her: slow-push to trap her under tower and starve her of CS and XP.",
      mid: "Free-kill territory. She has no escape, no range edge yet, and dies to one combo — all-in on every cooldown and perma-zone her off the wave. Dive her under tower with any jungle help; you must build a lead so big she's irrelevant before level 11.",
      late: "This is why it's HARD despite you crushing lane: at 2 items + level 11 her ranged form out-ranges you, and by 16 her R makes her untouchable. Win the GAME early — end it on the map — or you simply lose it late.",
      whys: [
        "Kayle is the weakest level-1 in the game — but you can't kill her yet either. Set a slow push to trap her under tower.",
        "Now you bully: no escape, no range edge, dies to one combo. Deny every CS — her game is scaling, so starve it.",
        "All-in on cooldown — she can't fight back pre-6. Free kill window; perma-zone her off the wave.",
        "Keep her broke. Every missed minion delays her 11/16 spikes. Dive under tower with jungle — you must build a huge lead.",
        "Your R kills her; her R (invuln) only delays it. Force all-ins, take her tower, make her irrelevant before she scales.",
        "Still your window — but the clock's ticking. If she's not dead/zoned by now, her ranged form at 11 flips the lane.",
        "Why it's HARD: at 2 items + 11 she out-ranges and out-scales you, and by 16 she's untouchable. Win the GAME early or lose it late."
      ]
    },
    {
      a: 'aatrox', b: 'cassiopeia',
      win: ['Cassiopeia', 'Cassiopeia', 'Cassiopeia', 'Skill', 'Aatrox', 'Skill', 'Cassiopeia'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Cassio’s window: out-ranges and pokes you out; W grounds your dashes.' },
        { when: 'Lvl 6', text: 'Your one window — R + pull if her Miasma (W) is down.' },
        { when: '1st item', text: 'Roughly even spike; buy MR + grievous wounds.' },
        { when: '2+ items', text: 'Cassio takes over — Rylai’s / Liandry’s kite and ground you forever.' }
      ],
      wants: {
        you: ['Hug caster minions and farm through her poke', 'All-in at 6 only when her Miasma (W) is down', 'Buy MR / grievous early and avoid the long poke war'],
        foe: ['Poke you out with Q/W poison from max range', 'Ground you with Miasma (W) to kill your dash + escape', 'Scale into an unkitable DPS mage with Rylai’s / Liandry’s']
      },
      early: "One of your real counters. Cassiopeia out-ranges you and pokes with Q/W poison you can't trade back into — and her W (Miasma) GROUNDS you, switching off your E dash and your R escape. Hug your caster minions, last-hit with Q tip, and never path through the poison cloud.",
      mid: "It's a poke war you're behind in until you can reach her. Take short trades only when her Q is down, and try to freeze near tower so she has to walk up to you. Your one window is level 6: if she's already used Miasma, R + pull deletes her squishy frame — but if W is up, her ult (Petrify) stuns you mid-dash.",
      late: "She out-scales the poke war — Rylai's + Liandry's let her kite and ground you forever. You needed to all-in her on a Miasma cooldown during the lane; if it went even, the late game belongs to her. Buy MR and grievous wounds and play around your team.",
      whys: [
        "Cassiopeia out-ranges you and pokes with Q/W poison — you can't trade back at 1. Hug caster minions, farm with Q tip.",
        "Her W (Miasma) grounds you, turning off your E dash and R escape. Never path through the cloud; walk around it.",
        "She chunks you every step toward CS. Trade only when her Q is down, and freeze near tower so she comes to you.",
        "You start to sustain through poke if you reach her, but one grounded combo gets you killed. Don't fall behind.",
        "Your one window: if she's used Miasma, R + pull deletes her. If W is up, her ult stuns you mid-dash — only commit when it's down.",
        "Her poke and your sustain roughly cancel; whoever spikes first edges it. Buy Merc's + grievous wounds.",
        "She out-scales the poke war — Rylai's + Liandry's kite and ground you forever. You needed the all-in earlier; late is hers."
      ]
    },
    {
      a: 'aatrox', b: 'renekton',
      win: ['Renekton', 'Renekton', 'Renekton', 'Renekton', 'Skill', 'Aatrox', 'Aatrox'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Renekton’s window — empowered Q sustain + stun (W) out-trade your weak early. Give ground.' },
        { when: 'Lvl 6', text: 'Both ult — the lane stabilizes; stop feeding his snowball.' },
        { when: '1st item', text: 'Your Eclipse spike flips the lane — start forcing all-ins.' },
        { when: 'Late', text: 'You out-scale hard — Renekton falls off, your sustain takes over.' }
      ],
      wants: {
        you: ['Survive his level 1-5 without dying, then scale', 'Bait his W (stun) and E dashes before you commit', 'Out-scale him — your power curve dwarfs his late'],
        foe: ['Snowball the early all-in with empowered Q + stun', 'Use fury dashes (E-E) to engage and escape', 'Convert an early lead before you out-scale him']
      },
      early: "Renekton is the canonical early bully and you are the weakest early juggernaut — this window is his. His empowered Q heals and chunks, his W is a point-blank stun, and double-E lets him dash in and out of any trade. Don't try to win levels 1-4: concede CS if you must, dodge the stun, and just survive without dying or getting dove.",
      mid: "Around 6 the lane stabilizes — both of you have R, and his fury burst stops being enough to kill a healing Aatrox. Stop over-respecting him: bait the W stun and his E dashes, then take measured trades. Your job through this window is to deny him the snowball until your first item arrives.",
      late: "You out-scale him hard. Renekton is a front-loaded champion who falls off a cliff, while your sustain and DPS only grow — once you hit Eclipse the lane is yours, and by two items it isn't close. Survive his early and the late game is a free win.",
      whys: [
        "Renekton's empowered Q out-trades your weak early and heals it back. Don't contest — last-hit and respect the all-in.",
        "His W is a point-blank stun into burst. Stay out of dash range; give up a CS rather than eat the stun combo.",
        "Double-E lets him engage and escape any trade. This is his hardest window — survive, don't trade into fury.",
        "He'll keep forcing all-ins while he's ahead on the curve. Dodge the stun, deny the snowball, wait for 6.",
        "Both have R now — your healing pulls you out of his burst range. The lane stabilizes; stop over-respecting him.",
        "Your Eclipse spike flips it — now your sustain beats his fury trades. Start forcing the all-ins you avoided early.",
        "He falls off and you take over — two items in, your DPS + healing dwarf his. The late game is a free win."
      ]
    },
    {
      a: 'aatrox', b: 'darius',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Aatrox', 'Aatrox'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Darius’s window — his grab (E) + bleed win every early all-in. Don’t get pulled.' },
        { when: 'Lvl 6', text: 'Both ult — his R executes off bleed stacks; play around your healing.' },
        { when: '1st item', text: 'Your spike flips it — space the Q sweetspot, out-sustain the bleed.' },
        { when: 'Late', text: 'You out-scale — Darius falls off, your DPS + heal grind him down.' }
      ],
      wants: {
        you: ['Avoid his E (pull) — never get yanked into the bleed', 'Space the Q sweetspot from max range', 'Scale past his early and out-sustain the Hemorrhage'],
        foe: ['Land E (Apprehend) to start the all-in', 'Stack Hemorrhage bleed and R-execute', 'Win before your sustain and items come online']
      },
      early: "Darius owns this early — his E pull yanks you into the bleed stacks, his Q heals, and his passive shreds you. The whole lane is his Apprehend (E): if he lands it, he wins the trade. Stand away from him, never get pulled, and don't walk up to contest CS into a level-1 Darius.",
      mid: "Level 6 is the dangerous spike — his R (Noxian Guillotine) executes you off five bleed stacks and the cooldown refreshes on a kill. Play around your healing: keep your HP above execute range, bait the E, and don't take a long trade while you're bleeding. One bad pull here ends you.",
      late: "Once you hit your first item the lane flips. You space the Q sweetspot, out-sustain the bleed, and your scaling leaves him behind — Darius is front-loaded and you are not. Survive the E and the level-6 execute window, and the late game is comfortably yours.",
      whys: [
        "Darius's E pull starts every all-in into his bleed. Stand back, last-hit at range, never get yanked in.",
        "His Q heals and his passive bleeds you out. Don't contest trades — give CS rather than stack Hemorrhage.",
        "A full early combo off the E will kill you. This is his window; survive it, don't trade into the pull.",
        "He'll keep fishing for the E. Space it, deny the grab, and don't bleed out walking to CS.",
        "His R executes off bleed stacks and resets on a kill. Stay above execute HP, bait the E, lean on your healing.",
        "Your first item flips it — now you space the sweetspot and out-sustain the bleed. Start taking the trades.",
        "You out-scale him flatly. Darius falls off; your DPS + healing grind him down. Late game is yours."
      ]
    },
    {
      a: 'aatrox', b: 'jax',
      win: ['Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill', 'Aatrox', 'Jax'],
      spikes: [
        { when: 'Lvl 2–5', text: 'Your window — bait Counterstrike (E), then all-in while it’s down.' },
        { when: 'Lvl 6', text: 'Both ult — even fight; don’t dump your combo into a fresh E.' },
        { when: '1st item', text: 'Your Eclipse spike beats a one-item Jax — force it now.' },
        { when: '2+ items', text: 'Jax takes over — his item scaling out-duels you late.' }
      ],
      wants: {
        you: ['Bait Counterstrike (E), then all-in on its cooldown', 'Win the mid-game before his item spikes', 'Grind short trades on his E cooldown with your sustain'],
        foe: ['Dodge your combo with Counterstrike (E) and stun back', 'Stall the lane and scale to his item spikes', 'Out-duel you late with Grandmaster’s + Jax items']
      },
      early: "Jax's E (Counterstrike) is the entire matchup — it dodges your Q sweetspot and stuns you if you trade into it. The trick is patience: don't throw your combo while E is up. Bait it out (poke, then back off during the two seconds), and once it's down you have a free window on a weak-early Jax.",
      mid: "This is your window. With your Q cooldown low you out-trade him every time Counterstrike is down — E in, W-pull, Q-sweetspot, then disengage before he can re-E. At 6 it's an even ult-vs-ult fight, so don't blow your combo into a fresh E; make him respect the bait first.",
      late: "Jax is one of the best scaling duelists in the game — two items in, his Grandmaster's passive + item spikes out-DPS your sustain and he wins the extended 1v1. You have to press your mid-game lead and close the lane before then. If it goes even into late, the duel belongs to Jax.",
      whys: [
        "Jax's E negates your combo and stuns you. Level 1 is even — don't commit into a held Counterstrike.",
        "Now you can punish: bait the E, then E-in W-pull while it's down. He's weak early and can't answer.",
        "Full combo online — every time Counterstrike is down you out-trade him. Force those windows.",
        "Keep grinding short trades on his E cooldown. Your sustain wins the war he can't disengage.",
        "Both ult now — it's an even all-in. Don't dump your combo into a fresh E; make him use it first.",
        "Your Eclipse spike beats a one-item Jax. This is your last clean window — force the all-in before he scales.",
        "Two items in he flips it — Grandmaster's + item spikes out-duel you. Close the lane before late, or it's his."
      ]
    },
    {
      a: 'aatrox', b: 'garen',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 2–3', text: 'Your combo out-damages his Q-silence trade — bait the Q, then all-in.' },
        { when: 'Lvl 6', text: 'Your R out-sustains his execute — stay above his Demacian Justice threshold.' },
        { when: '1st item', text: 'Eclipse spike — you win every extended fight; force them.' },
        { when: 'Late', text: 'Roughly even — his tankiness vs your DPS; teamfights diverge by role.' }
      ],
      wants: {
        you: ['Force extended fights where your sustain beats his regen', 'Bait the Q (silence) before you commit', 'Stay above his R execute threshold with your healing'],
        foe: ['Land Q (silence) for a short burst trade, then disengage', 'Use passive regen to negate your poke', 'Execute you with R (Demacian Justice) when low']
      },
      early: "Garen wants short, sharp trades — Q silences you and adds burst, then he spins (E) and walks away to regen it all with his passive. Don't try to poke him; his regen erases it. Last-hit, dodge the Q-silence if you can, and wait for your level-3 combo to turn the extended fight in your favour.",
      mid: "Your sustain beats his regen in any long fight. Bait the Q, then E-in W-pull Q-sweetspot — once you're past the silence he can't out-trade your healing. At 6 watch his R: Demacian Justice executes low targets, so keep your HP topped with your drain and you stay out of its range while you grind him down.",
      late: "It evens out — Garen builds tanky and his regen + R stay relevant, while your DPS and sustain scale the other way. In lane you hold the edge through extended-fight sustain; in teamfights you diverge — he's a frontline diver, you're a drain-tank bruiser. Press the lane edge while you have it.",
      whys: [
        "Garen's Q silences and bursts, then his passive regens it back. Don't poke into the regen — wait for your spike.",
        "His Q-silence shuts off your combo for a short trade. Bait it, then commit once it's down.",
        "Now your combo out-damages his trade. Bait the Q, E-in W-pull — your sustain wins the extended fight.",
        "Long fights are yours: his regen can't keep up with your healing. Force extended trades, not short ones.",
        "His R executes low targets — keep your HP up with your drain and you stay out of Demacian Justice range.",
        "Your Eclipse spike wins every extended all-in. Force them while you hold the mid-game edge.",
        "It evens late — his tankiness + regen vs your DPS. You edge lane; teamfights diverge by role."
      ]
    },
    {
      a: 'aatrox', b: 'pantheon',
      win: ['Pantheon', 'Pantheon', 'Pantheon', 'Skill', 'Skill', 'Aatrox', 'Aatrox'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Pantheon’s window — Q poke + W stun chunk your weak early. Survive it.' },
        { when: 'Lvl 6', text: 'Both ult — lane stabilizes as he starts to fall off.' },
        { when: '1st item', text: 'Your spike flips it — Pantheon drops off, you take over.' },
        { when: 'Late', text: 'You out-scale hard — he’s an early-game champ with no late.' }
      ],
      wants: {
        you: ['Survive his early poke + all-in without dying', 'Wait out his fall-off, then scale past him', 'Punish his short range once your items come online'],
        foe: ['Bully your weak early with Q (spear) + W (stun)', 'All-in before level 6 while he holds the edge', 'Roam with R to snowball elsewhere before falling off']
      },
      early: "Pantheon is a brutal early bully into your weakest phase — his Q spear pokes from range, his W is a point-click stun into burst, and his E blocks your trades back. Levels 1-3 are his to win. Don't contest: farm at max range, dodge what you can, and accept you'll lose some CS. Your only job here is to not die and not get dove.",
      mid: "Around 6 the lane starts to stabilize as he falls off — his early burst stops one-shotting a healing Aatrox, and your sustain catches up. Be careful of his R roaming to other lanes if he can't kill you. Hold the wave, deny the dive, and wait for your item spike to arrive.",
      late: "You out-scale him completely. Pantheon is a front-loaded early-game champion with essentially no late game, while you only get stronger — once you hit Eclipse you win every all-in, and by two items he can't fight you at all. Survive the early, then take the lane and the map.",
      whys: [
        "Pantheon's Q out-ranges you and his W stuns into burst. Level 1 is his — last-hit at range, don't contest.",
        "His point-click W stun sets up a burst you can't trade back into. Dodge it, give CS, survive.",
        "His E blocks your trades while he pokes. This is his hardest window — don't all-in, just farm and live.",
        "He starts to fall off here — your sustain catches up. Hold the wave, watch for his roam (R).",
        "Both ult now and his burst can't kill a healing you. Lane stabilizes; deny the dive and wait to spike.",
        "Your Eclipse spike flips it — now you out-sustain and out-DPS him. Start forcing the all-ins.",
        "You out-scale completely — he has no late game. Two items in he can't fight you. Take the lane."
      ]
    },
    {
      a: 'aatrox', b: 'fiora',
      win: ['Skill', 'Skill', 'Skill', 'Skill', 'Skill', 'Aatrox', 'Fiora'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Even and parry-dependent — don’t telegraph your Q sweetspot into her W.' },
        { when: 'Lvl 6', text: 'Your R is a big window — but she can parry the knockup; bait it first.' },
        { when: '1st item', text: 'Your Eclipse spike edges a one-item Fiora in a long fight.' },
        { when: '2+ items', text: 'Fiora takes over — vitals + true damage shred you late.' }
      ],
      wants: {
        you: ['Bait her parry (W) before committing Q or R', 'Win the extended fight with sustain before she scales', 'Deny her vital procs by spacing your stance'],
        foe: ['Parry (W) your Q sweetspot or R for the stun', 'Proc vitals to shred and heal in the duel', 'Out-scale into a one-item-spike duelist']
      },
      early: "The whole lane is her W (Riposte). Fiora parries your Q sweetspot or your R knockup — landing it stuns you and wins the trade, wasting it hands you a free all-in. Levels 1-3 are even and skill-dependent: don't telegraph your sweetspot, vary your timing, and don't commit a combo while her parry is up.",
      mid: "Bait the parry, then punish. If you can force her W early — or read it — your sustain wins the extended fight. At 6 your R is a huge swing, but she can Riposte the knockup, so make her burn it first. Space her vitals: every one she procs shreds your armour and heals her, so don't stand still in her Q range.",
      late: "Fiora out-scales you. Two items in, her vitals + true damage shred even a tanky Aatrox and her duelling overtakes your sustain. The lane is roughly even early and skill-decided through mid; if it reaches late even, the side-lane 1v1 is hers. Press your item spike while you have the edge.",
      whys: [
        "Fiora's W parries your sweetspot or R. Level 1 is even — don't telegraph the Q, vary your timing.",
        "She'll Riposte your committal abilities for a stun. Bait it before you swing the sweetspot.",
        "Vitals shred and heal her. Space your stance, don't stand in her Q angle, keep the trade neutral.",
        "Still parry-dependent — read the W, punish the whiff, don't feed a clean Riposte. Even window.",
        "Your R is a big all-in, but she can parry the knockup. Make her burn W first, then commit the ult.",
        "Your Eclipse spike edges a one-item Fiora in a long fight. Force the extended trade while you're ahead.",
        "Two items in she flips it — vitals + true damage shred you. She wins the late side-lane duel."
      ]
    },
    {
      a: 'aatrox', b: 'riven',
      win: ['Skill', 'Skill', 'Skill', 'Skill', 'Skill', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Even — she out-mobilities you; land W-pull to lock her down.' },
        { when: 'Lvl 6', text: 'Both ult — your R out-sustains her burst in a long fight.' },
        { when: '1st item', text: 'Your Eclipse spike edges her one-item all-in.' },
        { when: '2+ items', text: 'Roughly even — both spike; skill and cooldowns decide.' }
      ],
      wants: {
        you: ['Land W (pull) to cancel her mobility and lock her in', 'Win the extended fight with sustain, not the burst trade', 'Punish her cooldowns after she dumps her combo'],
        foe: ['Dodge your sweetspot with Q dashes + E shield', 'Burst you in a short trade, then disengage', 'Animation-cancel combos to out-tempo your cooldowns']
      },
      early: "Riven out-mobilities you — three Q dashes and an E shield/dash let her dodge your Q sweetspot and dance around your combo. Your answer is the W (pull): land it and she's locked in your Q zone with no escape. Levels 1-3 are even and mechanics-driven; don't swing the sweetspot at empty air while she dashes.",
      mid: "Don't try to win her short burst trade — win the long one. Your sustain out-lasts her combo: eat the initial burst, land W to hold her, then Q-sweetspot and heal through it. At 6 your R turns the extended fight in your favour. Punish her after she dumps her combo, when all her dashes are on cooldown.",
      late: "Roughly even into late — both spike on items and cooldowns, and the duel comes down to who lands their key ability (your W-pull vs her dodge-and-burst). You hold a slight sustain edge in long fights; she holds the tempo edge in short ones. Force the extended all-in where your healing matters most.",
      whys: [
        "Riven's Q dashes and E dodge your sweetspot. Level 1 is even — don't swing at air, wait for a clean W.",
        "She dances around your combo with mobility. Land the W-pull to cancel it and lock her in your Q zone.",
        "Her burst comes in a short window; your sustain wins the long one. Hold her with W, heal through it.",
        "Punish her after she dumps her dashes — that's when she's stuck and your combo lands clean.",
        "Both ult now — your R out-sustains her burst in an extended fight. Force the long trade, not the short.",
        "Your Eclipse spike edges her one-item all-in. Land W, commit the combo, out-heal the trade.",
        "Even into late — both spike. The duel hinges on your W-pull vs her dodge. Force the fight where sustain wins."
      ]
    },
    {
      a: 'aatrox', b: 'mordekaiser',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Mordekaiser', 'Aatrox', 'Aatrox'],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo out-trades his short-range Q — space the sweetspot.' },
        { when: 'Lvl 6', text: 'Morde’s window — his R (Realm) isolates you 1v1; play safe at low HP.' },
        { when: '1st item', text: 'Your Eclipse spike beats his first AP item — force the all-in.' },
        { when: 'Late', text: 'You hold the edge — out-sustain his magic DPS in extended fights.' }
      ],
      wants: {
        you: ['Space the Q sweetspot outside his short Q range', 'Respect his R (Death Realm) at 6 — don’t int it', 'Out-sustain his magic DPS in the extended fight'],
        foe: ['Land E (pull) into Q for his trade pattern', 'Isolate you with R (Realm) and win the 1v1', 'Stack passive shield + AP to out-sustain you']
      },
      early: "You hold the edge here but Morde isn't free — his Q is a chunky short-range hit and his E pulls you in for it. Space the Q sweetspot from outside his range, don't get yanked, and don't let him stack his passive (the rings around you) for the bonus magic damage. Through levels 3-5 your combo out-trades his.",
      mid: "Level 6 is HIS window: Realm of Death (R) drags you into an isolated 1v1, steals a chunk of your stats, and his sustained magic damage is strong inside it. Don't fight him at low HP when his R is up — play around it. Once it's down, you're back in control: your sustain and DPS beat his in a straight extended fight.",
      late: "You hold the matchup. Outside his R window your healing out-lasts his magic DPS, and your Eclipse spike beats his first AP item. The lane is favoured — just respect the level-6 Realm timing and don't hand him an isolated kill. Force the all-ins when his R is down and you grind him out.",
      whys: [
        "Morde's Q is short-range and his E sets it up. Space the sweetspot outside his range — don't get pulled in.",
        "Don't let him stack his passive for bonus magic damage. Trade when his Q is down and you come out ahead.",
        "Your full combo out-trades his short-range kit. Space the sweetspot and force the trade.",
        "You out-trade him through 4-5 — keep spacing the Q, deny the E-pull, stay healthy for his ult.",
        "His R isolates you 1v1 and steals your stats — his window. Don't fight low; wait it out, then re-engage.",
        "Your Eclipse spike beats his first AP item. Once R is down, force the all-in — your sustain wins it.",
        "You hold the edge late — out-heal his magic DPS in long fights. Respect the Realm, grind everything else."
      ]
    },
    {
      a: 'aatrox', b: 'irelia',
      win: ['Skill', 'Skill', 'Aatrox', 'Skill', 'Irelia', 'Irelia', 'Irelia'],
      spikes: [
        { when: 'Lvl 2–3', text: 'Your small window — combo her before she stacks her passive.' },
        { when: 'Lvl 6', text: 'Irelia’s window — R (stun) + stacks flip the extended fight.' },
        { when: '1st item', text: 'She out-DPS you once stacked — her W blunts your burst.' },
        { when: '2+ items', text: 'Irelia takes over — Q resets + true damage kite and shred you.' }
      ],
      wants: {
        you: ['All-in early before she stacks her passive', 'Bait her W (Defiant Dance) before committing', 'Win before her items — she out-DPS you stacked'],
        foe: ['Stack passive on minions, then out-trade you', 'Blunt your burst with W damage reduction', 'Q-reset around the fight and scale to items']
      },
      early: "Irelia is weak before she stacks her passive, so your only real window is a level 2-3 all-in before she's ramped. Her W (Defiant Dance) is the problem — it reduces your burst and stuns if you trade into the channel — so bait it out first. Deny her minion resets and don't let her free-stack off the wave.",
      mid: "Once she has stacks and items, she out-DPS you. Her Q resets on kills and low minions let her reposition through your combo, and at 6 her R is a ranged stun that starts the fight on her terms. Take short trades only when her W is down; don't sit in an extended fight you no longer win.",
      late: "Irelia takes over. Stacked, with two items, her on-hit damage and Q resets shred you while she dances out of your sweetspot. This is a tricky lane — your edge is the early window, so press it; if it goes even into the mid-game, the duel tilts to her.",
      whys: [
        "Irelia is weak before she stacks. Level 1 is even — set up so you can punish before she ramps.",
        "Your window opens at 2 — combo her before the passive stacks. Don't let her free-stack off the wave.",
        "Now or never early: all-in while she's unstacked. Bait her W first — it blunts your burst and stuns.",
        "She starts to out-trade you as stacks build. Take short trades only; don't commit into a fresh W.",
        "Her R is a ranged stun that opens the fight on her terms. Respect it — don't get caught stepping up.",
        "Stacked + one item she out-DPS you; her W eats your burst. Trade only on her W cooldown.",
        "Two items in she kites and shreds you with Q resets + true damage. Your edge was early — late is hers."
      ]
    },
    {
      a: 'aatrox', b: 'malphite',
      win: ['Skill', 'Skill', 'Aatrox', 'Skill', 'Skill', 'Malphite', 'Malphite'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Even farm lane — his Q poke + shield blunt your trades.' },
        { when: 'Lvl 3–5', text: 'Small window — all-in when his passive shield is popped.' },
        { when: '1st item', text: 'His armour stacking starves your AD — you can’t crack him.' },
        { when: 'Late', text: 'Malphite scales to a teamfight R; lane goes even-to-his.' }
      ],
      wants: {
        you: ['All-in when his passive shield is down', 'Force trades before he stacks armour', 'Snowball early — you can’t kill a built Malphite'],
        foe: ['Poke with Q (slow) and farm behind the shield', 'Stack armour to neutralise your AD', 'Scale to a teamfight R (Unstoppable Force)']
      },
      early: "Malphite just wants to farm behind his Q poke and passive shield — and his W armour directly cuts your AD, so you can't simply out-trade him. It's an even farm lane early. Your only openings come when his passive shield is popped: catch him mid-poke without it and punish.",
      mid: "You get a small window in the levels 3-5 range when his shield is down and his armour is still low — all-in then. Once he starts stacking armour items, your damage falls off a cliff and you physically can't kill him. Don't waste resources chipping a tank who just out-sustains it.",
      late: "Malphite scales into a teamfight monster — his R (Unstoppable Force) is a game-swinging engage and his armour neutralises your whole damage profile. The lane drifts from even to his. Snowball early off the shield windows or accept you won't crack him, and play for tempo elsewhere.",
      whys: [
        "Malphite pokes with Q and shields with his passive. Level 1 is even — farm, don't force into the shield.",
        "His W armour cuts your AD trades. Wait for the shield to pop before you step up.",
        "Your window: all-in when his passive shield is down and his armour is still low.",
        "He starts stacking armour — your damage drops. Take the trade only on a popped shield.",
        "Even-to-his now; you can't crack a stacking tank. Don't waste resources chipping him.",
        "His armour items neutralise your AD. You physically can't kill a built Malphite — play elsewhere.",
        "He scales to a teamfight R. The lane goes from even to his — snowball early or play for tempo."
      ]
    },
    {
      a: 'aatrox', b: 'ornn',
      win: ['Skill', 'Skill', 'Aatrox', 'Skill', 'Ornn', 'Ornn', 'Ornn'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Even — his Q poke + brittle out-trade once the combo is online.' },
        { when: 'Lvl 6', text: 'Ornn’s window — brittle (W) + R knockup flip the all-in.' },
        { when: '1st item', text: 'He out-sustains and out-tanks you; his upgrades come free.' },
        { when: 'Late', text: 'Ornn scales to an unkillable teamfight tank with item upgrades.' }
      ],
      wants: {
        you: ['All-in before his brittle (W passive) combo is online', 'Dodge his Q (pillar) so he can’t brittle-detonate', 'Win early — you can’t out-tank a built Ornn'],
        foe: ['Brittle you with W, then detonate for bonus + slow', 'Poke with Q and out-sustain your trades', 'Scale to an unkillable tank with free item upgrades']
      },
      early: "Ornn is genuinely tank-favoured into bruisers like you — his W passive (Brittle) makes you take bonus damage and lets him detonate it with any CC, and his Q pillar pokes from range. Levels 1-3 are even on farm, but the moment his brittle combo is online he out-trades you. Dodge the Q so he can't set up the detonation.",
      mid: "From 6 the lane tilts to him — his R knockup detonates brittle for a big swing, and he out-sustains your poke while building tanky. You can't out-tank an Ornn who upgrades his items for free. Take trades only when his W is down, and never walk into a Q-pillar that sets up the brittle.",
      late: "Ornn scales into an unkillable teamfight tank — free item upgrades, two engage tools, and resistances your AD can't punch through. The lane drifts to his. Your only path is to win the early before his brittle and items come online; if it goes even, you simply can't kill him late.",
      whys: [
        "Ornn's Q pokes and his W brittle makes you take bonus damage. Level 1 is even — don't feed the combo.",
        "He out-trades once brittle is online. Dodge the Q-pillar so he can't detonate it on you.",
        "Your small window: all-in before his brittle combo and armour come together.",
        "He out-sustains your poke and builds tanky. Trade only when his W is down.",
        "His R detonates brittle for a big swing — his window. Respect the knockup, don't all-in into it.",
        "He out-tanks you with free item upgrades. You can't crack him — don't waste resources.",
        "Ornn scales to an unkillable teamfight tank. The lane goes to his — win early or not at all."
      ]
    },
    {
      a: 'aatrox', b: 'sett',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo out-trades his short-range punches — space the sweetspot.' },
        { when: 'Lvl 6', text: 'Respect his W (true damage) when his grit is full — bait it first.' },
        { when: '1st item', text: 'Your Eclipse spike beats his — force the all-in.' },
        { when: 'Late', text: 'You hold the edge — out-sustain his burst in extended fights.' }
      ],
      wants: {
        you: ['Space the Q sweetspot outside his punch range', 'Bait his W (Haymaker) before it’s loaded with grit', 'Out-sustain his burst in the extended fight'],
        foe: ['Build grit, then W (Haymaker) for a true-damage chunk', 'Land E (Facebreaker stun) into his combo', 'Pull you in with R for an all-in']
      },
      early: "You hold the edge — Sett's kit is short-range and you out-space it. His threat is the W (Haymaker): true damage scaled off the grit he banks from taking hits, so don't feed it. Space your Q sweetspot outside his punch range, and his level 1-3 can't match your trade.",
      mid: "Bait the W before it's loaded. If you trade when his grit is empty, his Haymaker is weak and you win the exchange clean. Watch his E (Facebreaker) stun setting up the W, and at 6 his R pulls you in for the all-in — but your sustain out-lasts his front-loaded burst once the W is spent.",
      late: "You hold the matchup. Sett is a burst-then-nothing fighter; once you eat or bait his Haymaker, your healing grinds him down in the extended fight. Your Eclipse spike beats his, and by two items the lane is comfortably yours. Just respect the grit-loaded W and the R engage.",
      whys: [
        "Sett's punches are short-range. Space the Q sweetspot and you out-trade his weak early.",
        "His W (Haymaker) scales off banked grit. Don't feed it — trade when his grit is empty.",
        "Your full combo out-trades his short kit. Space the sweetspot, force the trade.",
        "Bait the W before it's loaded. With empty grit his Haymaker is weak and you win clean.",
        "His E stuns into W and his R pulls you in. Respect the engage, but your sustain out-lasts his burst.",
        "Your Eclipse spike beats his. Once the W is spent, force the all-in — your healing wins it.",
        "You hold the edge late — out-heal his front-loaded burst in long fights. Respect the grit W."
      ]
    },
    {
      a: 'aatrox', b: 'sion',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo out-trades him — dodge his Q (charged knockup).' },
        { when: 'Lvl 6', text: 'You win the 1v1; his R is an engage tool, not a duel button.' },
        { when: '1st item', text: 'Your Eclipse spike dwarfs his — take tower.' },
        { when: 'Late', text: 'Sion becomes a teamfight tank; you won lane long ago.' }
      ],
      wants: {
        you: ['Dodge his Q (charged knockup) — it’s his only burst', 'Out-trade his weak early before he stacks tanky', 'Snowball lane — he just wants to farm and scale'],
        foe: ['Land the charged Q knockup for a trade', 'Farm safely (even dead, via passive) and scale', 'Become a teamfight engage tank with R']
      },
      early: "You out-trade Sion's weak early — his only real threat is the charged Q, a telegraphed knockup you can sidestep. Don't stand still while he winds it up. Without the Q he has no answer to your combo, and his passive means he just wants to farm and scale, not duel you.",
      mid: "You win every 1v1. Dodge the Q, then E-in W-pull Q-sweetspot — his W shield and E poke don't out-trade your sustain. His R is a long-range engage for the map, not a button that wins the duel, so don't panic when he ults; just don't get knocked into his team.",
      late: "Sion becomes a teamfight tank and engage threat, but in lane he never beats you. You should have a lead by now — your Eclipse spike dwarfs his, so take his tower and snowball. The game becomes about who uses Sion's R engage better, not the 1v1, which you own.",
      whys: [
        "Sion's charged Q is his only burst — telegraphed and dodgeable. Sidestep it and his early collapses.",
        "Without the Q he can't trade. Dodge it, then punish — your combo out-damages his.",
        "Full combo out-trades him hard. Dodge the knockup and force the all-in.",
        "His W shield + E poke don't beat your sustain. Win every extended trade.",
        "His R is map engage, not a duel button. You win the 1v1 — just don't get knocked into his team.",
        "Your Eclipse spike dwarfs his. Take tower and snowball — he can't fight you.",
        "Late he's a teamfight tank; you won lane long ago. The game is about his R, not the 1v1."
      ]
    },
    {
      a: 'aatrox', b: 'nasus',
      win: ['Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Nasus'],
      spikes: [
        { when: 'Lvl 2–5', text: 'Your window — bully him off Q stacks before he scales.' },
        { when: 'Lvl 6', text: 'You win the 1v1; his W (Wither) only slows your chase.' },
        { when: '1st item', text: 'Your Eclipse spike crushes a low-stack Nasus — force it.' },
        { when: '2+ items', text: 'Nasus takes over — stacked Q + tanky scaling out-duel you.' }
      ],
      wants: {
        you: ['Deny Q stacks relentlessly — zone him off CS', 'All-in early before his stacks and items', 'Snowball lane so his scaling never matters'],
        foe: ['Stack Q on every last-hit, even under tower', 'Slow your all-in with W (Wither) and survive', 'Out-scale into a stacked, tanky late-game monster']
      },
      early: "Nasus is the ultimate scaler and weak early — your whole job is to deny his Q stacks. Zone him off the wave, deny last-hits, and bully him whenever he steps up to farm. His W (Wither) cripples your attack speed and movement, so don't waste it — bait the W before you all-in.",
      mid: "This is your window. You out-trade a low-stack Nasus easily, and at 6 his R (tanky + lifesteal) doesn't make him a duelist — it just helps him survive. Keep zoning his CS, force all-ins on his W cooldown, and build the biggest lead you can before his stacks and items come online.",
      late: "Nasus takes over at two items. A stacked Q on a tanky body out-duels you flatly, and his W shuts off your chase. The lane is even on paper precisely because you crush early and he crushes late — so press every inch of the early game, and end it before his scaling makes him unkillable.",
      whys: [
        "Nasus is weak early and lives to stack Q. Level 1 is even — set up to zone his CS.",
        "Your window opens — bully him off the wave and deny every Q stack you can.",
        "You out-trade a low-stack Nasus. Bait his W (Wither) before you all-in.",
        "Keep zoning. Every denied stack delays the monster he becomes. Force trades on his W cooldown.",
        "His R is survival, not a duel button — you still win the 1v1. Snowball the lead.",
        "Your Eclipse spike crushes a low-stack Nasus. Force the all-in, take his tower.",
        "Two items in, stacked Q + tanky body out-duel you. You own early; he owns late — end it first."
      ]
    },
    {
      a: 'aatrox', b: 'trundle',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo out-trades him — but his Q (Chomp) steals your AD.' },
        { when: 'Lvl 6', text: 'You hold the 1v1; his R drains your resistances in a long fight.' },
        { when: '1st item', text: 'Your Eclipse spike beats his — force the all-in.' },
        { when: 'Late', text: 'You edge it — out-DPS his sustain before his tank-buster scaling.' }
      ],
      wants: {
        you: ['Bait his Q (Chomp) — it steals your AD', 'Win the all-in before his R drains your resistances', 'Out-DPS his sustain in the extended fight'],
        foe: ['Bite (Q) to steal your AD and heal', 'Zone you with E (Pillar) and out-sustain trades', 'Drain your resistances + HP with R in a long fight']
      },
      early: "You hold the edge but Trundle isn't free — his Q (Chomp) steals your AD and heals him, and his E pillar can peel or zone you. Space your Q sweetspot and bait his bite before you commit; if he wastes Q on a minion, your trade window is open. Through levels 3-5 your combo out-trades his.",
      mid: "You win the 1v1 if you respect the R. Trundle's ult (Subjugate) drains your resistances and HP in a long fight, so don't get dragged into an extended slugfest on his terms — burst him on your spike and disengage if his R flips it. His sustain is real, so commit only when you can finish.",
      late: "You edge the matchup — your DPS out-paces his sustain before he scales into a tank-buster. Your Eclipse spike beats his first item. Keep trades short and decisive so his R-drain never tips the long fight, and the lane stays yours. Don't let him out-sustain a drawn-out poke war.",
      whys: [
        "Trundle's Q steals your AD and heals him. Bait the bite before you commit your combo.",
        "His E pillar zones and peels. Space the sweetspot, trade when his Q is on a minion.",
        "Your full combo out-trades him — but mind the stolen AD. Force the trade on his Q cooldown.",
        "You out-trade through 4-5. Keep it short; his sustain wins a drawn-out fight.",
        "His R drains your resistances + HP in a long fight. Burst on your spike, disengage if R flips it.",
        "Your Eclipse spike beats his. Force a short, decisive all-in — don't let his R tip it.",
        "You edge it late — out-DPS his sustain. Keep trades short before his tank-buster scaling."
      ]
    },
    {
      a: 'aatrox', b: 'chogath',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', "Cho'Gath"],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo out-trades him — dodge his Q (rupture) + W (silence).' },
        { when: 'Lvl 6', text: 'You win the 1v1; respect his R true-damage execute when low.' },
        { when: '1st item', text: 'Your Eclipse spike crushes a low-stack Cho — force it.' },
        { when: '2+ items', text: 'Cho takes over — stacked HP + true-damage R make him unkillable.' }
      ],
      wants: {
        you: ['Dodge his Q (rupture) and W (scream silence)', 'All-in early before he stacks HP off his R', 'Snowball lane before his tank scaling takes over'],
        foe: ['Land Q (knockup) into W (silence) for a trade', 'Farm safely and stack HP with R (Feast)', 'Scale into an unkillable true-damage teamfight tank']
      },
      early: "Cho'Gath is a weak-early tank scaler — you out-trade him so long as you dodge his combo. His Q (Rupture) is a telegraphed knockup and his W (Feral Scream) silences; sidestep the Q and his trade falls apart. Don't get silenced mid-combo. He just wants to farm and stack, so deny what you can.",
      mid: "You win the 1v1 through the mid-game. Dodge the Q-W and your sustain out-trades him easily — but respect his R (Feast): it's a true-damage execute that ignores your healing, so don't all-in while you're low. Zone his CS and force trades to keep him off his HP stacks.",
      late: "Cho takes over at two items. Stacked HP off his R plus true damage make him an unkillable teamfight tank your AD can't punch through. The lane is favoured because you own the early — so press it, deny his farm, and build a lead before his scaling makes him irrelevant to kill.",
      whys: [
        "Cho is weak early. Dodge his Q (rupture) knockup and his trade collapses. Level 1 is even.",
        "His W silences mid-combo. Sidestep the Q first so he can't chain it.",
        "Your full combo out-trades a weak-early Cho. Dodge the Q-W and force the trade.",
        "You out-trade through the mid-game. Zone his CS to keep him off HP stacks.",
        "His R is a true-damage execute that ignores your healing — don't all-in while low.",
        "Your Eclipse spike crushes a low-stack Cho. Force the all-in, deny his farm.",
        "Two items in, stacked HP + true damage make him unkillable. You own early — end it first."
      ]
    },
    {
      a: 'aatrox', b: 'drmundo',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 2–5', text: 'Your window — Mundo can’t fight back. Bully him off every CS.' },
        { when: 'Lvl 6', text: 'Out-DPS his R heal — don’t let him reset and walk away.' },
        { when: '1st item', text: 'Your Eclipse spike crushes a tanky-but-toothless Mundo.' },
        { when: 'Late', text: 'He scales to a regen tank — bring grievous wounds; you won lane.' }
      ],
      wants: {
        you: ['Bully his feeble early — he has no kill pressure', 'Deny CS and snowball before his HP scaling', 'Bring grievous wounds for his R + passive regen'],
        foe: ['Throw cleavers (Q) and farm through your poke', 'Survive to his R heal and HP/regen scaling', 'Become a tanky cleaver-throwing frontliner']
      },
      early: "Dr. Mundo is one of your best lanes — he has zero kill pressure early and can only chuck cleavers (Q) while he farms. He literally cannot fight you levels 1-5. Bully him off the wave, deny CS, and start the snowball; the only thing he threatens is poking with Q, which your sustain laughs off.",
      mid: "Keep stomping. Your combo out-damages and out-heals him through 6 — and when he ults (a big heal + move speed + AD), don't panic: out-DPS the heal and don't let him reset the fight and stroll away. Pick up grievous wounds (Executioner's/Bramble) so his regen stops mattering, then force the all-ins.",
      late: "Mundo scales into a tanky, regen-heavy cleaver frontliner, but you won this lane in the first five levels. With antiheal his sustain is cut and your lead holds. Don't let a fed-from-elsewhere Mundo become a problem — close his tower and translate the early stomp to the map.",
      whys: [
        "Mundo has no early kill pressure — only cleaver (Q) poke. Step up and deny CS; he can't punish you.",
        "Still toothless — your sustain eats his Q poke. Keep bullying him off the wave.",
        "Your combo out-damages and out-heals him. Force trades; he can't fight back.",
        "You stomp this window — deny CS relentlessly and snowball before his HP scaling.",
        "His R is a big heal + AD — out-DPS it, don't let him reset and walk away. Bring grievous wounds.",
        "Your Eclipse spike crushes a tanky-but-toothless Mundo. Take his tower.",
        "He scales to a regen tank — antiheal keeps your lead. You won lane long ago; play the map."
      ]
    },
    {
      a: 'aatrox', b: 'naafiri',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo out-trades her squishy, sustain-less kit.' },
        { when: 'Lvl 6', text: 'Her all-in window (R packmates + W dash) — don’t be low when it’s up.' },
        { when: '1st item', text: 'Your Eclipse spike deletes a one-item Naafiri — force it.' },
        { when: 'Late', text: 'She’s a roaming assassin; you own the 1v1 — deny her roams.' }
      ],
      wants: {
        you: ['Out-sustain her poke — she has no healing', 'Catch her with W-pull; she only has one dash out', 'Punish her squishy frame before she roams'],
        foe: ['Poke with Q (packmate daggers) and stack damage', 'All-in with W + R when you’re low', 'Roam with R to snowball other lanes']
      },
      early: "Naafiri top is a squishy AD assassin with no sustain — exactly what your drain-tank style crushes. Her Q (packmate daggers) pokes and her W is a dash that deals burst, but she has to commit to trade, and your healing erases her poke. Don't get caught by a full Q-W combo at low HP, but otherwise farm and wait for your spike.",
      mid: "From 3 your combo out-trades her — E in, W-pull, Q-sweetspot, and she has only one dash to escape. Her one real window is level 6: R summons extra packmates and gives her dashes for an all-in burst, so don't be sitting at low HP when it's up. Healthy, you out-sustain and out-duel her every time.",
      late: "Naafiri becomes a roaming assassin who looks for picks across the map — but in a straight lane 1v1 you own her. Deny her roams by shoving and tracking her, punish her squishy frame whenever she steps up, and don't let her snowball off other lanes. The duel is never hers.",
      whys: [
        "Naafiri is squishy with no sustain. Her Q pokes but your healing erases it. Farm and wait.",
        "She has to commit to trade. Don't eat a full W-Q at low HP; otherwise out-sustain the poke.",
        "Your combo out-trades her — W-pull and she has one dash out. Force the trade.",
        "You out-duel her healthy. Keep her honest and deny the roam-setup.",
        "Her R (packmates + dashes) is a burst all-in — don't be low when it's up. Healthy, you win it.",
        "Your Eclipse spike deletes a one-item Naafiri. Force the all-in, take her tower.",
        "She's a roaming assassin late — you own the 1v1. Shove, track her, deny the picks."
      ]
    },
    {
      a: 'aatrox', b: 'varus',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo punishes his squishy, escape-less frame.' },
        { when: 'Lvl 6', text: 'His R (root chain) is his only peel — bait it, then all-in.' },
        { when: '1st item', text: 'Your Eclipse spike deletes a one-item Varus — close it.' },
        { when: 'Late', text: 'He’s a teamfight poke carry; you own the 1v1 — end lane early.' }
      ],
      wants: {
        you: ['Walk through his poke — sustain beats Q/E chip', 'Bait his R (root) before you commit the all-in', 'Kill him before he scales into a poke carry'],
        foe: ['Poke with Q (Piercing Arrow) + E (slow zone) from range', 'Stack W blight and kite back', 'Root you with R and scale to a teamfight carry']
      },
      early: "Varus top pokes with Q (Piercing Arrow) and his E slow-zone, but he's a squishy marksman with no dash — his only escape is the R root, which is a peel, not a getaway. Walk through the chip (your sustain heals it), hug your minions to dodge the charged Q, and wait to close the gap.",
      mid: "Once you reach him he folds. E in, W-pull, Q-sweetspot — he can't kite a healing juggernaut sitting on top of him. His one defensive tool is R (a root chain): bait it or eat it on the way in, and once it's down he's dead. Don't all-in into a held R, but the moment it's gone, commit.",
      late: "Varus scales into a teamfight poke/DPS carry, but he never wins the lane 1v1 — your sustain and gap-close beat his entire kit. End the lane early so his scaling never matters, deny his CS, and don't let him farm safely into relevance. The duel is always yours.",
      whys: [
        "Varus pokes with Q + E but has no dash. Your sustain heals the chip — hug minions, dodge the charged Q.",
        "He kites with the E slow, not an escape. Walk it down; your healing out-paces his poke.",
        "Your combo punishes his squishy frame — W-pull and he can't kite you. Force the trade.",
        "You own the gap-close. Keep walking him down; his poke can't out-damage your sustain.",
        "His R root is his only peel — bait it or eat it on entry, then all-in once it's down.",
        "Your Eclipse spike deletes a one-item Varus. Close the lane, take his tower.",
        "He's a teamfight poke carry late — you own the 1v1. End lane early so his scaling never matters."
      ]
    },
    {
      a: 'aatrox', b: 'poppy',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo out-damages her low base damage — out-trade her.' },
        { when: 'Lvl 6', text: 'Her R can knock you away — don’t get walled, but you out-DPS her.' },
        { when: '1st item', text: 'Your Eclipse spike beats her — she has no kill threat.' },
        { when: 'Late', text: 'She’s a tanky peeler; you won the 1v1 lane.' }
      ],
      wants: {
        you: ['Out-trade her low damage with your combo', 'Stand off walls so her E (stun) can’t pin you', 'Win the lane she can’t kill you in'],
        foe: ['Stun you into a wall with E (Heroic Charge)', 'Stop your E dash with her W passive', 'Scale to a tanky teamfight peeler']
      },
      early: "Poppy is durable and annoying but deals low damage — she can't actually kill you. Her threats are positional: E (Heroic Charge) stuns you if it slams you into a wall, and her W passive grounds you and can stop your E dash if you're next to her. Stand away from terrain, farm, and don't feed her the wall-stun.",
      mid: "Your sustain and combo simply out-damage her. Trade freely when you're not near a wall — she has no way to win the damage race. Watch her W when you go to E-dash in (it can cancel the dash), so close with care, but once you're on her, Q-sweetspot and W-pull grind her down. Her low kill pressure means you can play aggressive.",
      late: "Poppy scales into a tanky teamfight peeler with a big R disengage, but the lane 1v1 was never hers — she can't out-damage your sustain. You won this lane; convert it. Don't get caught next to a wall in a side-lane skirmish, but otherwise you hold the edge all game in the duel.",
      whys: [
        "Poppy deals low damage and can't kill you. Stand off walls so her E can't stun you. Farm freely.",
        "Her threats are positional, not damage. Out-trade her with your combo away from terrain.",
        "Your combo out-damages her — Q-sweetspot, W-pull. She has no answer in the damage race.",
        "You out-trade her easily. Mind her W canceling your E-dash, but press the aggression.",
        "Her R can knock you off, but she can't out-DPS you. Don't get walled; otherwise you win.",
        "Your Eclipse spike beats her — she has no kill threat. Take tower.",
        "She's a tanky peeler late — you won the 1v1. Don't get wall-stunned in side lane; hold your edge."
      ]
    },
    {
      a: 'aatrox', b: 'yorick',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Yorick'],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo out-trades him before Maiden — punish him now.' },
        { when: 'Lvl 6', text: 'Maiden (R) ramps his sustained damage — don’t fight in his ghoul wall.' },
        { when: '1st item', text: 'Your Eclipse spike beats him 1v1 — force it off his cage cooldown.' },
        { when: '2+ items', text: 'Yorick takes over — Maiden + ghouls out-DPS you in extended fights.' }
      ],
      wants: {
        you: ['All-in before Maiden and ghouls are online', 'Bait his W (cage) — don’t get trapped mid-fight', 'Burst him 1v1 before his sustained ghoul DPS'],
        foe: ['Wall you in with W (cage) and pile on ghouls', 'Ramp sustained damage with Maiden (R)', 'Out-DPS you late and splitpush with Maiden']
      },
      early: "Yorick out-sustains and out-DPSes you in a long fight once his ghouls and Maiden are up, so your edge is the early game before that. Levels 1-3 your raw combo out-trades him — punish him while he's just a melee juggernaut with mist ghouls (E mark + W). Don't let him free-farm into his power spike.",
      mid: "His W (Dark Procession) is a ghoul cage that traps you mid-fight — never all-in when it's up, and bait it before you commit. At 6 his Maiden (R) ramps his sustained damage hard, so don't sit in a wall of ghouls trading; pick your moment when his cage is down and burst him 1v1, where your combo still wins.",
      late: "Yorick takes over in the extended fight — Maiden plus a full ghoul pack out-DPS your sustain, and he'll splitpush with Maiden's pressure. The lane is favoured because you crush the early; press it, deny his farm, and end it before his 2-item Maiden setup out-grinds you. Don't get caged in a side lane late.",
      whys: [
        "Yorick is just a melee juggernaut early. Your combo out-trades him before Maiden — punish now.",
        "Don't let him free-farm to his spike. Trade while he's only got mist ghouls.",
        "Your full combo out-trades a pre-Maiden Yorick. Force the trade, deny his setup.",
        "Keep punishing — every level before 6 is your window. Bait his W cage before committing.",
        "Maiden (R) ramps his sustained DPS. Don't trade in a ghoul wall; burst him 1v1 off cage cooldown.",
        "Your Eclipse spike beats him 1v1. Force the all-in when his cage is down.",
        "Two items in, Maiden + ghouls out-DPS your sustain. You own early — end it before his scaling."
      ]
    },
    {
      a: 'aatrox', b: 'rumble',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 3', text: 'Close the gap — your combo beats his short-range flamespitter.' },
        { when: 'Lvl 6', text: 'Dodge his R (Equalizer) zone — don’t fight inside the fire.' },
        { when: '1st item', text: 'Your Eclipse spike beats his — force the all-in.' },
        { when: 'Late', text: 'You hold the edge — out-sustain his magic poke if you close.' }
      ],
      wants: {
        you: ['Close the gap past his shield (W) and slow (E)', 'Dodge his R (Equalizer) fire zone', 'Out-sustain his Q flamespitter poke'],
        foe: ['Poke with Q (Flamespitter) in his Heat window', 'Kite with W (shield + MS) and E (harpoon slow)', 'Zone you with R (Equalizer) and overheat burst']
      },
      early: "Rumble pokes with his Q (Flamespitter) — strong when he's in the Heat/Danger Zone — and kites with W (shield + move speed) and E (harpoon slow). Your job is to close the gap: his damage is all short-range AP, and once you're on him with your sustain, his squishy frame loses. Walk through the poke behind minions and force him to use W early.",
      mid: "Once you stick to him he can't escape your combo. Bait his W shield/MS, eat the E slow on the way in, then E-W-Q and out-sustain the flamespitter. At 6 respect his R (The Equalizer) — a long fire zone that zones and burns — don't fight inside it, and don't let an overheated Rumble dump full burst on you in the fire. Close on his cooldowns.",
      late: "You hold the matchup — Rumble is a kite-and-poke AP fighter, and your sustain + gap-close beat him whenever you reach him. Your Eclipse spike beats his first item. Keep forcing the gap-close, deny the kite, and respect only his R zone in skirmishes. If you close, you win; if he kites freely, you stall — so make him fight.",
      whys: [
        "Rumble's Q flamespitter pokes but it's short-range AP. Walk through it behind minions and close the gap.",
        "He kites with W (shield + MS) and E (slow). Bait the W early, then commit when it's down.",
        "Your combo beats his squishy frame once you stick. Eat the E slow, E-in, force the trade.",
        "Stick to him — he can't escape your combo. Out-sustain the flamespitter and grind him down.",
        "His R (Equalizer) is a fire zone — don't fight inside it. Dodge it, then all-in on the clean ground.",
        "Your Eclipse spike beats his. Force the all-in when his W is down.",
        "You hold the edge late — out-sustain his poke if you close. Make him fight; don't let him kite free."
      ]
    },
    {
      a: 'aatrox', b: 'akali',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Akali'],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo out-trades her squishy, sustain-less early.' },
        { when: 'Lvl 6', text: 'Her all-in spikes with R (two dashes) — don’t be low when it’s up.' },
        { when: '1st item', text: 'Your Eclipse spike beats a one-item Akali — force it.' },
        { when: '2+ items', text: 'Akali takes over — her assassin item spikes out-burst you.' }
      ],
      wants: {
        you: ['Out-sustain her Q poke — she has no healing', 'Punish her in/around shroud (W) — your pull is positional', 'Kill her before her assassin item spikes'],
        foe: ['Poke with Q and hide in W (shroud) to reset', 'All-in with E + R dashes at level 6', 'Scale into a burst assassin with item spikes']
      },
      early: "Akali is a slippery AP assassin but squishy with no sustain — your drain-tank style beats her in a straight lane. Her Q pokes and her W (Twilight Shroud) gives invisibility to dodge and reset, but she can't out-trade your healing. Don't waste your combo chasing her into shroud; farm, and punish when she steps up to poke.",
      mid: "From 3 you out-trade her — your W-pull is a positional zone, not a target lock, so it can still catch her near shroud, and once you land it she's in your Q-sweetspot with only E to escape. Her real spike is level 6: R gives her two dashes for an all-in burst, so don't be low when it's up. Healthy, your sustain out-lasts her combo.",
      late: "Akali scales into a high-burst assassin — at two items her combo can delete you before your sustain matters, and she roams for picks. The lane is favoured because you crush her early and mid; press it, deny her farm, and build a lead before her item spikes flip the duel. Don't get caught low with her R up.",
      whys: [
        "Akali is squishy with no sustain. Her Q pokes but can't beat your healing. Farm and wait.",
        "Don't chase her into shroud (W). Punish her when she steps up to trade.",
        "Your combo out-trades her — W-pull is positional, it catches her near shroud. Force the trade.",
        "You out-duel her healthy. Keep her off farm; deny the roam setup.",
        "Her R gives two dashes for an all-in burst — don't be low when it's up. Healthy, you win.",
        "Your Eclipse spike beats a one-item Akali. Force the all-in, take her tower.",
        "Two items in her assassin spikes out-burst you. You own early-mid — end it before she scales."
      ]
    },
    {
      a: 'aatrox', b: 'gwen',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Gwen'],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo out-trades her weak early — punish before she scales.' },
        { when: 'Lvl 6', text: 'Don’t chase her into W (mist) — you can’t hit her from outside it.' },
        { when: '1st item', text: 'Your Eclipse spike beats a one-item Gwen — force it now.' },
        { when: '2+ items', text: 'Gwen takes over — her AP scaling + true damage shred you.' }
      ],
      wants: {
        you: ['All-in early before her item scaling', 'Don’t chase her into the W (mist) — fight her outside it', 'Win the lane before her two-item spike'],
        foe: ['Hide in W (mist) — untargetable from outside', 'Poke with Q (true damage) and scale', 'Out-scale into an AP bruiser that shreds tanks']
      },
      early: "Gwen has a weak early game and scales into a tank-shredding AP bruiser, so your window is now. Levels 1-3 your combo out-trades her — punish her before she gets going. Her Q deals true damage on the final snip and her E gives attack speed + a dash, but early she can't match your trade. Deny her farm and force the issue.",
      mid: "Her W (Hallowed Mist) is the key — inside it she's untargetable to anything from outside the cloud, so don't chase her into it; you'll just whiff your combo. Force her to fight outside the mist, where your sustain and W-pull win. Keep her off CS — every minion she misses delays the scaling that beats you.",
      late: "Gwen takes over at two items — her AP scaling and true damage shred even a tanky Aatrox, and her W keeps her safe while she snips you down. The lane is favoured because you crush the early; you must build a lead before her spike. If it goes even into the mid-game, her scaling flips the duel — so close it fast.",
      whys: [
        "Gwen is weak early and scales hard. Your combo out-trades her now — punish before she gets going.",
        "Her Q true damage + E dash come online, but she can't match your early trade. Deny her farm.",
        "Your full combo out-trades a weak-early Gwen. Force the all-in, take CS off her.",
        "Keep her off farm — every missed minion delays her scaling. Out-trade her outside the mist.",
        "Her W (mist) makes her untargetable from outside — don't chase in. Fight her on open ground.",
        "Your Eclipse spike beats a one-item Gwen. Force it now, before her two-item spike.",
        "Two items in, her AP + true damage shred you. You own early — close the lane before she scales."
      ]
    },
    {
      a: 'aatrox', b: 'ksante',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', "K'Sante"],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo out-trades a pre-item K’Sante — punish him now.' },
        { when: 'Lvl 6', text: 'His R (All Out) turns him into a duelist — respect the burst window.' },
        { when: '1st item', text: 'Your Eclipse spike beats him before he’s tanky — force it.' },
        { when: '2+ items', text: 'K’Sante takes over — tanky stance + items out-sustain you.' }
      ],
      wants: {
        you: ['All-in before his items make him tanky', 'Bait his W (block) — don’t feed it your burst', 'Punish him outside his R duel form'],
        foe: ['Block your combo with W (damage reduction)', 'Knock you with Q and dash with E', 'Pop R (All Out) to duel, or stay tanky to scale']
      },
      early: "K'Sante is weak before items and scales into a tanky skirmisher, so your edge is the early game. Levels 1-3 your combo out-trades him — his Q is a knockback, his E a dash + shield, but he can't match your raw trade yet. His W blocks damage and reduces it (and can interrupt), so don't dump your burst into a held W; bait it first.",
      mid: "His big spike is R (All Out): he sheds tankiness to become a high-damage duelist with extra dashes, so respect that burst window — don't all-in a fresh R at low HP. Outside of it, your sustain out-trades his tankier stance. Bait his W block, then commit your combo, and keep him off the items that make him unkillable.",
      late: "K'Sante takes over at two items — his tank stance plus item sustain out-grinds you, and his R lets him pick the duel terms. The lane is favoured because you crush him early; press it, deny his farm, and build a lead before his scaling. If it reaches late even, his tankiness and R flip the side-lane 1v1.",
      whys: [
        "K'Sante is weak pre-item. Your combo out-trades him now — punish before he scales.",
        "His Q knocks back and E dashes + shields, but he can't match your early trade. Force it.",
        "Your full combo out-trades a pre-item K'Sante. Bait his W block, then commit.",
        "Keep punishing — deny his farm so his item spikes come late. Trade on his W cooldown.",
        "His R (All Out) makes him a burst duelist — respect it at low HP. Outside R, you out-trade him.",
        "Your Eclipse spike beats him before he's tanky. Force the all-in, take his tower.",
        "Two items in, tank stance + items out-sustain you. You own early — end it before his scaling."
      ]
    },
    {
      a: 'aatrox', b: 'yasuo',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Yasuo'],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo out-trades him — W-pull catches him through his dashes.' },
        { when: 'Lvl 6', text: 'He needs a knockup for R — deny the setup, you out-sustain his burst.' },
        { when: '1st item', text: 'Your Eclipse spike beats a one-item Yasuo — force it.' },
        { when: '2+ items', text: 'Yasuo takes over — crit item spikes out-DPS your sustain.' }
      ],
      wants: {
        you: ['Catch him with W-pull through his E dashes', 'Out-sustain his shield-and-poke trades', 'Win before his crit item spikes (2 items)'],
        foe: ['Poke with Q tornado and dash on minions (E)', 'Shield your trades with his passive', 'Scale into a crit hypercarry at 2 items']
      },
      early: "Yasuo dashes around with E (through minions) and pokes with Q, and his passive shield blunts your poke — but he's melee-range and your W-pull is a positional lock he can't dash out of once it lands. His windwall (W) mostly doesn't matter against you since your Q is melee, not a projectile. Farm, and look to catch him stepping up for CS.",
      mid: "From 3 you out-trade him — land W to cancel his mobility, then Q-sweetspot through his shield; your sustain out-lasts his trade. At 6 his R needs a knockup to use, which he lacks solo, so deny him a setup and he has no burst all-in. Healthy, you win every duel; just don't let him free-poke you down with Q from range.",
      late: "Yasuo scales into a crit hypercarry — at two items (IE + crit) his DPS out-paces your sustain and the duel flips. The lane is favoured because you out-trade his early and mid; press it, deny his farm, and build a lead before his crit spike. If it goes even into late, his items take over the 1v1 — so close it.",
      whys: [
        "Yasuo dashes with E and pokes with Q, but your W-pull locks him — he can't dash out once it lands.",
        "His windwall barely matters vs your melee Q. Farm and catch him stepping up for CS.",
        "Your combo out-trades him — W to cancel mobility, Q-sweetspot through his shield. Force it.",
        "You out-duel him healthy. Don't let him free-poke with Q; close and trade on your terms.",
        "His R needs a knockup he lacks solo — deny the setup and he has no all-in. You out-sustain his burst.",
        "Your Eclipse spike beats a one-item Yasuo. Force the all-in before his crit spike.",
        "Two items in (IE + crit) he out-DPS your sustain. You own early-mid — close before he scales."
      ]
    },
    {
      a: 'aatrox', b: 'singed',
      win: ['Singed', 'Singed', 'Skill', 'Singed', 'Skill', 'Singed', 'Singed'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Singed proxies and kites — don’t chase him through his poison.' },
        { when: 'Lvl 6', text: 'His R + goo (W) makes him uncatchable — don’t tower-dive the chase.' },
        { when: '1st item', text: 'He out-farms you via proxy; clean kills are scarce.' },
        { when: 'Late', text: 'Proxy Singed is a macro problem, not a duel — answer on the map.' }
      ],
      wants: {
        you: ['Catch him only when his goo (W) / R are down', 'Match his proxy CS instead of chasing', 'Ward flanks so he can’t fling you under tower'],
        foe: ['Proxy the wave and kite you through poison', 'Fling (E) you under tower with goo + R', 'Out-macro the lane without ever fighting']
      },
      early: "Singed doesn't duel you — he proxies the wave behind your tower and kites you through his poison trail and goo (W slow). Chasing him is how you die: you eat poison, he flings (E) you under his tower, and his R makes him faster than you. Don't take the bait. Match his CS, hold your wave, and play for your jungler.",
      mid: "Your only kill windows are the rare moments you catch him with goo and R down — and even then his slow and movement make it hard. At 6 his R is a big speed steroid; do not tower-dive a Singed who runs circles around you. Accept the lane is a farming contest and don't over-extend into ganks his kiting sets up.",
      late: "Proxy Singed is a macro headache, not a 1v1 — he splitpushes and flings your carries in fights. You can't reliably solo-kill him, so answer him on the map: match his side-lane pressure, group with your team, and let your CC peel his fling. Don't tilt-chase; that's exactly the game he wants.",
      whys: [
        "Singed proxies behind your tower and kites through poison. Don't chase — match his CS, hold your wave.",
        "His goo (W) slows you in the poison trail. Stepping in to trade just feeds the kite.",
        "Rare window: if you catch him with W down you can trade — otherwise don't bite.",
        "Chasing him through poison is how you die. Ward flanks, don't get flung under tower.",
        "His R speed makes him uncatchable — never tower-dive the chase. Farm instead.",
        "He out-farms you via proxy; clean kills are scarce. Play the map, not the bait.",
        "Proxy Singed is a macro problem. Group, peel his fling, match side pressure — don't tilt-chase."
      ]
    },
    {
      a: 'aatrox', b: 'kennen',
      win: ['Kennen', 'Kennen', 'Skill', 'Kennen', 'Kennen', 'Kennen', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Kennen pokes you out with Q from range — farm and respect it.' },
        { when: 'Lvl 6', text: 'His R (AOE stun) + E burst is a real kill threat — don’t get chunked low.' },
        { when: '1st item', text: 'He pokes you down before you can close — buy MR, hug minions.' },
        { when: 'Late', text: 'Catch him once (W-pull) and he dies — but he kites all game.' }
      ],
      wants: {
        you: ['Hug minions to dodge his Q poke', 'Catch him with W-pull — he’s squishy and dies', 'Buy MR + close the gap on his E cooldown'],
        foe: ['Poke you out with Q (shuriken) from range', 'Kite with E (Lightning Rush move speed)', 'Burst you with R (stun) + E when you’re low']
      },
      early: "Kennen out-ranges you and pokes with Q (shuriken) — a hard lane because you can't trade back at range, and his E (Lightning Rush) lets him dart in for a mark and back out. Hug your minions to body-block the Q, last-hit carefully, and accept some chip. Don't step into open ground where he free-pokes you.",
      mid: "His damage ramps and at 6 his R (Slicing Maelstrom) is an AOE stun that, with a full E-Q-R combo, chunks you from range — don't be at low HP when it's up. Buy MR early. Your one path is to catch him: land W-pull when his E is down and delete his squishy frame, but he'll kite most attempts.",
      late: "Kennen is squishy — land a full combo and he dies — but his whole game is kiting and poking so you rarely get the chance. He scales into a teamfight AOE-stun threat. Win by closing on his E cooldown in skirmishes, building MR, and not letting him free-poke you down before you reach him.",
      whys: [
        "Kennen out-ranges you with Q poke. Hug minions to block it; you can't trade back at range.",
        "His E (Lightning Rush) darts in for a mark and out. Don't chase — farm and respect the poke.",
        "Rare window: if his E is down, W-pull and punish his squishy frame. Otherwise he kites.",
        "He pokes you down between trades. Buy MR, hug minions, don't step into open ground.",
        "His R (AOE stun) + E combo bursts you from range — don't be low when it's up.",
        "He out-pokes your gap-close. Close only on his E cooldown; otherwise he kites free.",
        "Catch him once and he dies — but he kites all game. Build MR, close in skirmishes, deny the poke."
      ]
    },
    {
      a: 'aatrox', b: 'urgot',
      win: ['Skill', 'Urgot', 'Urgot', 'Skill', 'Skill', 'Aatrox', 'Aatrox'],
      spikes: [
        { when: 'Lvl 2–3', text: 'Urgot’s window — his W (shotgun knees) + Q out-trade you early.' },
        { when: 'Lvl 6', text: 'His R can execute you low — keep your HP above the threshold.' },
        { when: '1st item', text: 'Your Eclipse spike flips it — out-sustain his shield trades.' },
        { when: 'Late', text: 'You edge it — your DPS + heal beat his shotgun poke.' }
      ],
      wants: {
        you: ['Survive his strong level 2-3, then scale', 'Stay above his R execute threshold', 'Out-sustain his W shield trades mid-game'],
        foe: ['Out-trade early with W (shotgun knees) + Q', 'Flip you with E into his shotgun stance', 'Execute you with R when you drop low']
      },
      early: "Urgot's early is strong — his W (shotgun knees) shreds you up close and his Q adds poke, so levels 2-3 are his window. His E flips over you and shields him. Don't sit in his W stance trading autos; take the poke on the chin, last-hit, and wait for your spike. Respect that he out-trades you right now.",
      mid: "Your sustain catches up and flips the lane. Once you hit your first item you out-heal his shotgun trades — but watch his R (Fear Beyond Death): it executes you below a health threshold and refreshes, so keep your HP topped and don't all-in while low. Bait his E flip, then commit your combo.",
      late: "You edge the matchup — your DPS and healing out-grind his shotgun poke in the extended fight. Stay above his R execute line and you win the duel. Press your item spikes, force the all-ins your sustain wins, and don't feed him a low-HP execute. Survive his strong early and the back half is yours.",
      whys: [
        "Urgot's early is strong — his W + Q out-trade you at 2-3. Don't contest; take the poke and farm.",
        "His W (shotgun knees) shreds you up close. Don't sit in his stance trading autos.",
        "Still his window — his E flip + shield wins the trade. Survive it, wait for your spike.",
        "Your sustain starts catching up. Bait his E flip before you commit anything.",
        "His R executes you below a threshold and refreshes — keep your HP up, don't all-in low.",
        "Your Eclipse spike flips it — out-heal his shotgun trades. Start forcing the all-ins.",
        "You edge it late — DPS + heal beat his poke. Stay above his execute line and you win."
      ]
    },
    {
      a: 'aatrox', b: 'kled',
      win: ['Kled', 'Kled', 'Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Kled’s window — mounted aggression + grab (Q) bully your weak early.' },
        { when: 'Lvl 6', text: 'Dismount him — off Skaarl he’s weak; punish before he remounts.' },
        { when: '1st item', text: 'Your Eclipse spike flips it — out-sustain his courage trades.' },
        { when: 'Late', text: 'You out-scale — Kled falls off, your sustain takes over.' }
      ],
      wants: {
        you: ['Survive his mounted early aggression', 'Dismount him, then punish before he remounts', 'Out-scale his falloff with your sustain'],
        foe: ['Bully your weak early while mounted (Skaarl)', 'Grab you with Q and burst with W courage', 'Snowball before you out-scale him']
      },
      early: "Mounted Kled is a hyper-aggressive early bully — his Q (Beartrap) grabs you, his W stacks courage for burst, and he wants to all-in your weak levels 1-2. Don't feed the grab. Take the poke, deny what you can, and survive: his entire plan is to snowball before your sustain comes online.",
      mid: "The key is dismounting him. Trade enough to strip Skaarl and off his mount Kled is weak and slow — punish that window hard before he restores courage and remounts. From around 5-6 your sustain flips the lane; bait his W burst, then E-W-Q and out-heal the trade. Don't let him reset and remount for free.",
      late: "You out-scale him. Kled is a front-loaded early bully who falls off, while your sustain and DPS only grow. Survive the mounted aggression, punish every dismount, and by your item spikes the lane is yours. Don't chase a remounting Kled into his jungle — make him fight you in lane where you win the long game.",
      whys: [
        "Mounted Kled bullies your weak early with Q grab + W burst. Don't feed the grab — survive.",
        "His courage stacks make level 1-2 his window. Take the poke, deny CS, wait it out.",
        "Trade to dismount him — off Skaarl he's weak. Punish before he remounts.",
        "Keep stripping his mount. Dismounted Kled is slow and vulnerable; that's your window.",
        "Your sustain flips it now — bait his W burst, then E-W-Q and out-heal the trade.",
        "Your Eclipse spike beats his — force the all-in, deny the remount reset.",
        "You out-scale — Kled falls off. Punish dismounts, don't chase the remount; win the long game."
      ]
    },
    {
      a: 'aatrox', b: 'wukong',
      win: ['Skill', 'Skill', 'Skill', 'Wukong', 'Wukong', 'Aatrox', 'Aatrox'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Even — his Q (armor shred) out-trades short pokes; bait the clone.' },
        { when: 'Lvl 4–6', text: 'Wukong’s window — clone (W) juke + E-R knockup all-in.' },
        { when: '1st item', text: 'Your Eclipse spike flips it — out-sustain once his combo is down.' },
        { when: 'Late', text: 'You edge it — your sustain beats his cooldown-reliant burst.' }
      ],
      wants: {
        you: ['Bait his clone (W) before you commit', 'Out-sustain his burst once his combo is down', 'Punish him on his E / R cooldowns'],
        foe: ['Out-trade with Q (armor shred) auto-resets', 'Juke your combo with the clone (W)', 'All-in with E-dash into R (spin knockup)']
      },
      early: "Wukong out-trades short exchanges early — his Q shreds your armour and resets his auto, and his clone (W) jukes your combo and disengages. Levels 1-3 are even on farm; don't dump your combo at a clone. Bait the W out, then trade when it's down. Respect that his Q makes his autos hurt more than you'd think.",
      mid: "Levels 4-6 are his window — with E (dash) into R (spin knockup) plus the clone, he has a real burst all-in. Don't get caught at low HP when his combo is up, and watch for the clone juke mid-fight. Bait or eat the W, survive the knockup, and your sustain stabilizes the trade. Track his E and R cooldowns.",
      late: "You edge it once you have items — Wukong's damage is cooldown-reliant burst, and when his combo is down your sustain out-grinds him. Punish him on his E/R cooldowns, bait the clone before committing, and out-heal the extended fight. Your Eclipse spike beats his; force the all-ins where his burst is down.",
      whys: [
        "Wukong's Q shreds armour and resets his auto. Even at 1 — don't trade into a clone.",
        "His clone (W) jukes your combo. Bait it out before you commit anything.",
        "Even on farm — trade when his W is down. His autos hit harder than they look (Q shred).",
        "His window: E-dash into R knockup + clone is a burst all-in. Don't be low when it's up.",
        "Survive the knockup and clone juke — then your sustain stabilizes. Track his cooldowns.",
        "Your Eclipse spike flips it — out-sustain once his combo is down. Force the all-in.",
        "You edge it late — his burst is cooldown-reliant. Punish his E/R downtime, out-heal the fight."
      ]
    },
    {
      a: 'aatrox', b: 'illaoi',
      win: ['Skill', 'Skill', 'Skill', 'Skill', 'Illaoi', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Fight OUTSIDE her tentacles — dodge her E (Test of Spirit).' },
        { when: 'Lvl 6', text: 'Illaoi’s window — R spawns a wall of tentacles; never fight in them.' },
        { when: '1st item', text: 'Even — whoever controls the tentacle ground wins the trade.' },
        { when: 'Late', text: 'Don’t side-lane in her tentacle nest; fight on open ground.' }
      ],
      wants: {
        you: ['Fight on open ground away from her tentacles', 'Dodge her E (Test of Spirit) — it rips your soul', 'All-in her when her tentacles aren’t set up'],
        foe: ['Spawn tentacles and fight inside them', 'Rip your soul with E (Test of Spirit)', 'Slam you with empowered W in her tentacle zone']
      },
      early: "Illaoi is all about positioning. Inside her tentacle field she does monstrous damage; out of it she's slow and beatable. Her E (Test of Spirit) rips your soul — dodge it, because letting her hit it means she can beat your spirit-vessel for huge damage. Levels 1-3, fight only on open ground away from her tentacles, and don't path into her Q slams.",
      mid: "Level 6 is her window — R (Leap of Faith) spawns a wall of tentacles and turns any fight into a beating. Never all-in her standing in her nest; you'll get slammed from five directions. Bait her R or fight before it, drag her onto fresh ground where her tentacles aren't, and your sustain wins the open duel.",
      late: "The lane stays a positioning chess match — whoever controls the tentacle ground wins the trade. Don't side-lane into her nest late; her R + tentacles shred you and your team in a contained fight. Pull her onto open ground, dodge the E, and fight when her tentacles are down. Respect her teamfight, win the spacing.",
      whys: [
        "Illaoi is lethal inside her tentacles, weak outside. Fight on open ground; dodge her E soul-rip.",
        "Don't let her land E (Test of Spirit) — beating your vessel deals huge damage. Sidestep it.",
        "Even on open ground — all-in her when no tentacles are set up nearby.",
        "Don't path into her Q slams or stand by her tentacles. Drag the fight to fresh ground.",
        "Her R spawns a tentacle wall — never fight inside it. Bait the R or fight before 6.",
        "Even — whoever owns the tentacle ground wins. Force fights where hers are down.",
        "Don't side-lane into her nest late. Pull her to open ground, dodge E, win the spacing."
      ]
    },
    {
      a: 'aatrox', b: 'gangplank',
      win: ['Skill', 'Skill', 'Aatrox', 'Skill', 'Skill', 'Aatrox', 'Gangplank'],
      spikes: [
        { when: 'Lvl 1–3', text: 'He pokes with Q (Parrrley) — close and punish his squishy frame.' },
        { when: 'Lvl 6', text: 'Even — his W cleanses your slow; bait it before you all-in.' },
        { when: '1st item', text: 'Your Eclipse spike beats a one-item GP — force it before barrels.' },
        { when: '2+ items', text: 'Gangplank takes over — crit + barrel chains out-DPS you.' }
      ],
      wants: {
        you: ['Close the gap and punish his squishy frame', 'Detonate or dodge his barrels (E)', 'Win before his crit items come online'],
        foe: ['Poke with Q (Parrrley) and chain barrels (E)', 'Cleanse your CC + slow with W (Remove Scurvy)', 'Out-scale into a crit + barrel teamfight threat']
      },
      early: "Gangplank pokes with Q (Parrrley) and sets up barrels (E), but he's squishy and has no escape — once you close, your combo punishes him hard. Don't let him free-poke from range; walk him down behind minions and destroy his barrels before they chain. Levels 1-3 you out-trade him if you reach him.",
      mid: "It's even through 6 — his W (Remove Scurvy) cleanses your W-pull slow and heals, so bait it before you all-in or your engage fizzles. Keep destroying his barrels so he can't combo them, and force trades where his squishy frame loses to your sustain. Don't get chunked by a full barrel-Q chain from range.",
      late: "Gangplank takes over at two items — crit Q + chained barrels out-DPS your sustain and his R (Cannon Barrage) zones the map. The lane is even because you crush him early-mid and he crushes late. Press your spike, deny his farm and barrel setups, and end it before his crit items make the poke lethal.",
      whys: [
        "GP pokes with Q but is squishy with no escape. Close the gap and punish — don't eat free poke.",
        "Destroy his barrels (E) before they chain. Walk him down behind minions.",
        "Your combo punishes him once you reach him. Force the trade on his squishy frame.",
        "Even through here — keep popping barrels and deny the poke chain.",
        "His W cleanses your slow and heals — bait it before you all-in, or your engage fizzles.",
        "Your Eclipse spike beats a one-item GP. Force the all-in before his crit comes online.",
        "Two items in, crit + barrels out-DPS you. You own early — end it before his scaling."
      ]
    },
    {
      a: 'aatrox', b: 'sylas',
      win: ['Skill', 'Skill', 'Aatrox', 'Skill', 'Skill', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your combo out-trades him — but his W heals the trade back.' },
        { when: 'Lvl 6', text: 'He can steal your R — bait it, and don’t all-in into his E stun.' },
        { when: '1st item', text: 'Your Eclipse spike edges his — force the extended fight.' },
        { when: 'Late', text: 'Roughly even — both sustain; whoever lands their combo wins.' }
      ],
      wants: {
        you: ['Catch him with W-pull through his E dash', 'Out-DPS his W self-heal in the extended fight', 'Bait his E (chain stun) before committing'],
        foe: ['Poke with Q (double whip) and heal with W', 'Dash + chain-stun you with E', 'Steal and turn your R against you']
      },
      early: "Sylas is an AP skirmisher with his own sustain — his Q (double whip) pokes and his W heals off it, so a poke war favours him. Your edge is the all-in: your combo out-trades his, but his W heals the trade back, so you need to commit fully, not chip. Land W-pull to stop his E dash and lock him in your Q-sweetspot.",
      mid: "Respect two things: his E is a two-part dash + chain stun (don't all-in into a held E), and his R steals YOUR ultimate — a stolen Aatrox R is a strong all-in, so bait it out or fight when it's down. Through the mid-game your sustain and his roughly cancel; whoever lands their combo cleanly wins the trade.",
      late: "Roughly even into late — both of you sustain through fights, so the duel comes down to who lands their key ability (your W-pull vs his E stun) and who spikes first. Your Eclipse edges his first item in an extended fight. Force the long all-in, out-DPS his self-heal, and don't hand him a free stolen-R window.",
      whys: [
        "Sylas pokes with Q and heals with W — a poke war favours him. Commit to all-ins, not chip.",
        "His W heals the trade back. You out-trade only if you fully commit, not poke.",
        "Your combo out-trades him — W-pull to stop his E dash, then Q-sweetspot. Force it.",
        "Even sustain trades — land your full combo or don't bother. Bait his E first.",
        "His E is a dash + chain stun and his R steals yours — bait both before you all-in.",
        "Your Eclipse spike edges his — force the extended fight where you out-DPS his heal.",
        "Even late — both sustain. Whoever lands their combo wins; deny his stolen-R window."
      ]
    },
    {
      a: 'aatrox', b: 'yone',
      win: ['Skill', 'Skill', 'Aatrox', 'Skill', 'Skill', 'Aatrox', 'Yone'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your combo out-trades him — W-pull catches him mid-dash.' },
        { when: 'Lvl 6', text: 'His R (knockup dash) is a strong all-in — don’t be low when it’s up.' },
        { when: '1st item', text: 'Your Eclipse spike edges a one-item Yone — force it.' },
        { when: '2+ items', text: 'Yone takes over — crit + mobility out-DPS your sustain.' }
      ],
      wants: {
        you: ['Catch him with W-pull through his Q dash / E', 'Out-sustain his trades before his crit items', 'Punish him after he commits E (spirit form)'],
        foe: ['Poke with Q and dash on the third cast', 'Retreat with E (spirit form snaps him back)', 'All-in with R (knockup) and scale to crit']
      },
      early: "Yone is a mobile skirmisher — his Q dashes on the third cast, his E (spirit form) lets him commit then snap back to safety, and his passive gives shields and crit. Your answer is W-pull: land it to cancel his mobility and lock him in your sweetspot. Levels 1-3 your combo out-trades him if you catch him; don't swing at a dashing Yone.",
      mid: "His big window is R (Fate Sealed) — a knockup dash all-in, often comboed off E, that chunks you, so don't sit at low HP when it's up. Punish him after he commits E: he's locked into the return path. Through the mid-game your sustain out-lasts his trades when you land W; force the fight after his dashes are spent.",
      late: "Yone takes over at two items — crit + his mobility let him out-DPS and kite your sustain, and his E/R make him slippery. The lane is even because you out-trade his early-mid and he scales past you. Press your spike, land your W-pulls, and build a lead before his crit items flip the duel. Don't let him free-poke into scaling.",
      whys: [
        "Yone dashes with Q and darts with E. W-pull cancels his mobility — catch him and you win the trade.",
        "Don't swing at a dashing Yone. Wait for a clean W, then commit your combo.",
        "Your combo out-trades him once locked. Force the trade after his dash is down.",
        "Even trades — punish him after he commits E (he's locked into the return). Land W first.",
        "His R (knockup dash) is a strong all-in off E — don't be low when it's up.",
        "Your Eclipse spike edges a one-item Yone. Force the all-in on his dash cooldowns.",
        "Two items in, crit + mobility out-DPS your sustain. You own early — close before he scales."
      ]
    },
    {
      a: 'aatrox', b: 'olaf',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your combo out-trades him early — dodge his axe (Q).' },
        { when: 'Lvl 6', text: 'His R makes him CC-immune — don’t rely on W-pull to peel his all-in.' },
        { when: '1st item', text: 'Your Eclipse spike beats his — out-sustain his reckless trades.' },
        { when: 'Late', text: 'You edge it — your sustain out-grinds his lifesteal in long fights.' }
      ],
      wants: {
        you: ['Dodge his axe (Q) — without it he can’t slow/chase', 'Out-sustain his reckless lifesteal trades', 'Kite his R (CC-immune) — don’t rely on W to peel'],
        foe: ['Pick up his axe (Q) to slow and out-trade you', 'Ramp attack speed + lifesteal as he drops low', 'Go CC-immune with R for an unstoppable all-in']
      },
      early: "Olaf out-trades recklessly — his Q axe slows you and his passive gives attack speed and lifesteal as his HP drops, so a careless brawl can favour him. The counter is the axe: if he misses Q (or you make him walk to pick it up), he can't slow or chase you. Dodge it, and your combo out-trades him early.",
      mid: "His R (Ragnarok) is the key — it makes him CC-immune, so your W-pull and knockup won't peel his all-in once it's active. Don't rely on CC to stop a R'd Olaf; kite the duration or pre-empt the fight before he ults. Your sustain out-lasts his reckless trades when his axe is down and his R isn't up.",
      late: "You edge the matchup — in an extended fight your healing out-grinds his lifesteal, and outside his R window you control him by dodging the axe. Your Eclipse spike beats his. Force trades on his Q and R cooldowns, out-sustain the brawl, and don't get baited into an all-in the moment his Ragnarok is up.",
      whys: [
        "Olaf's Q axe slows and sets up his trade. Dodge it — without the axe he can't chase you.",
        "His passive ramps attack speed + lifesteal as he drops low. Don't brawl carelessly into it.",
        "Your combo out-trades him when his axe is down. Force the trade on the Q cooldown.",
        "You out-trade through 4-5 — keep dodging the axe and out-sustaining the brawl.",
        "His R makes him CC-immune — W-pull won't peel his all-in. Kite the duration or fight before 6.",
        "Your Eclipse spike beats his — out-sustain his reckless trades. Force the all-in.",
        "You edge it late — your heal out-grinds his lifesteal. Fight on his Q/R cooldowns."
      ]
    },
    {
      a: 'aatrox', b: 'warwick',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your combo out-trades him — he’s a weak laner before items.' },
        { when: 'Lvl 6', text: 'His R is a point-blank suppress all-in — don’t get caught low.' },
        { when: '1st item', text: 'Your Eclipse spike beats his — out-DPS his lifesteal.' },
        { when: 'Late', text: 'You edge it — your sustain out-grinds his low-HP healing.' }
      ],
      wants: {
        you: ['Out-trade his weak early before his lifesteal ramps', 'Stay healthy so his R all-in can’t finish you', 'Out-DPS his Q lifesteal in the extended fight'],
        foe: ['Sustain with Q lifesteal (huge when you’re low)', 'Chase you down with W (move speed on low HP)', 'All-in with R (point-blank suppress)']
      },
      early: "Warwick is a weak laner before items — his Q heals him (more the lower you are) and his W gives chase speed, but early he can't out-trade your combo. Punish that: levels 1-3 you win the trade. Just don't drop low yourself, because his Q lifesteal scales off your missing health and his W will run you down.",
      mid: "His all-in is R (Infinite Duress) — a point-blank suppress that locks you for a full combo, so don't get caught at low HP within his jump range. Outside the ult, your combo out-trades him and your sustain matches his. Bait or respect the R, stay healthy, and force trades where his lifesteal can't out-heal your DPS.",
      late: "You edge it — in the extended fight your healing out-grinds his Q lifesteal, especially if you keep your HP up so his low-health bonuses don't trigger. Your Eclipse spike beats his. Force the all-ins, deny him the low-HP windows his kit feeds on, and don't walk into a R suppress while chunked.",
      whys: [
        "Warwick is a weak early laner. Your combo out-trades him at 1-3 — punish before his items.",
        "His Q heals more the lower you are. Win the trade but don't drop low into his lifesteal.",
        "Your full combo out-trades him. Force the trade while he's weak and item-less.",
        "You out-trade through 4-5 — keep your HP up so his low-health bonuses don't kick in.",
        "His R is a point-blank suppress all-in — don't get caught low in his jump range.",
        "Your Eclipse spike beats his — out-DPS his lifesteal. Force the all-in, stay healthy.",
        "You edge it late — your heal out-grinds his low-HP healing. Deny him the low windows."
      ]
    },
    {
      a: 'aatrox', b: 'gnar',
      win: ['Gnar', 'Skill', 'Aatrox', 'Skill', 'Skill', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Mini Gnar pokes and kites — farm through the boomerang chip.' },
        { when: 'Mega form', text: 'When he transforms, his W stun + burst are the danger — avoid walls.' },
        { when: '1st item', text: 'Catch him in Mini form — your combo beats a squishy ranged Gnar.' },
        { when: 'Late', text: 'Even — the lane swings on his rage bar, not the clock.' }
      ],
      wants: {
        you: ['All-in when he’s in Mini form / out of rage', 'Dodge Mega Gnar’s W (stun) and avoid walls', 'Out-sustain the Mini-Gnar boomerang poke'],
        foe: ['Poke + kite in Mini form with Q (boomerang) + E hop', 'Build rage, transform, and W-stun you for burst', 'Use Mega R to knock you into walls / tower']
      },
      early: "Gnar's threat is his rage bar, not his level. In Mini form he's a squishy ranged kite — Q boomerang poke, E hop to reposition — and you out-trade him the moment you reach him. The danger is when his rage fills and he transforms to Mega: a tanky form with a W stun and burst. Farm through the Mini poke and watch his rage.",
      mid: "Time your aggression to his form. All-in when he's Mini and out of rage — your combo deletes a squishy ranged Gnar whose only escape is the E hop. Don't commit when he's about to transform: Mega Gnar's W stuns you and his combo chunks, and his R can knock you into a wall. Don't fight near terrain when he's Mega.",
      late: "It's even — the lane swings on his rage management, not the game clock. In teamfights respect Mega Gnar's R (a wall-pin AOE), but in the side lane you out-duel Mini Gnar all day. Keep punishing his Mini windows, dodge the Mega W stun, and never let him combo you against a wall.",
      whys: [
        "Mini Gnar pokes and kites with Q boomerang + E hop. Farm through the chip — you out-trade him up close.",
        "He builds rage as he pokes. Punish the Mini form before he can transform to Mega.",
        "Your combo beats a squishy ranged Gnar — catch him in Mini form and all-in.",
        "Watch his rage bar — don't commit right as he's about to transform to Mega.",
        "Mega Gnar's W stuns and bursts — don't get caught, and stay off walls for his R.",
        "Catch him Mini again — your combo deletes him. Avoid the Mega-form windows.",
        "Even — it swings on his rage, not the clock. Out-duel Mini, dodge Mega's W, avoid walls."
      ]
    },
    {
      a: 'aatrox', b: 'gragas',
      win: ['Skill', 'Skill', 'Aatrox', 'Skill', 'Skill', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'He pokes with Q and reduces your damage with W — bait the W.' },
        { when: 'Lvl 6', text: 'His R (cask) can peel or set up — don’t get knocked under tower.' },
        { when: '1st item', text: 'Your Eclipse spike edges his — out-sustain the poke war.' },
        { when: 'Late', text: 'Even — both sustain; whoever lands their engage wins.' }
      ],
      wants: {
        you: ['Bait his W (damage reduction) before you commit', 'Dodge his E (body slam) — it stuns and escapes', 'Out-sustain his Q poke in the extended fight'],
        foe: ['Poke with Q (cask) and heal with W', 'Engage or escape with E (body slam stun)', 'Knock you out of position with R (cask)']
      },
      early: "Gragas pokes with his Q (cask) and his W reduces incoming damage while healing him — so trading into a raised W is a waste. He also has an E (Body Slam) dash-stun for engage or escape. Levels 1-3, last-hit through the Q poke, don't dump your combo into his W, and wait to bait it before you commit.",
      mid: "Bait the W, then all-in — once his damage reduction is down your combo out-trades him. Respect his E: it's a dash-stun he uses to escape your engage or to gap-close, so try to W-pull him before he can E away. At 6 his R (Explosive Cask) can knock you under his tower or peel you off — don't fight near his turret.",
      late: "Even into late — both of you sustain through fights, so the duel comes down to who lands their engage (your W-pull vs his E-stun) and whether he can cask you out of position. Your Eclipse edges his first item. Force the extended trade, bait the W, and don't get knocked into a bad spot by his R.",
      whys: [
        "Gragas pokes with Q and heals/reduces damage with W. Don't trade into a raised W — bait it first.",
        "His E (body slam) is a dash-stun for engage or escape. Mind it before you commit.",
        "Bait the W, then your combo out-trades him. Force the trade once his damage-reduction is down.",
        "Try to W-pull him before he can E away. Out-sustain the Q poke in the extended fight.",
        "His R can knock you under tower or peel — don't fight near his turret when it's up.",
        "Your Eclipse spike edges his — force the long all-in. Bait the W, deny the poke.",
        "Even late — both sustain. Whoever lands their engage wins; don't get cask'd out of position."
      ]
    },
    {
      a: 'aatrox', b: 'volibear',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Skill', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your combo out-trades him — but his W (bite) heals the trade back.' },
        { when: 'Lvl 6', text: 'His R (dive + tanky) is a strong all-in — don’t get caught low.' },
        { when: '1st item', text: 'Your Eclipse spike edges his — out-DPS his W lifesteal.' },
        { when: 'Late', text: 'Even — your sustain vs his; force fights on his Q/R cooldowns.' }
      ],
      wants: {
        you: ['Out-DPS his W (bite) self-heal in long fights', 'Dodge his Q (slow → empowered fist) all-in', 'Bait his R before committing your combo'],
        foe: ['All-in with Q (slow + stun) into W (bite heal)', 'Sustain through trades with W lifesteal', 'Dive with R (untargetable tower, tanky)']
      },
      early: "Volibear is an aggressive sustain bruiser — his Q slows and empowers his next hit (a stun if he closes the distance), and his W (bite) heals him off you. Your combo out-trades him, but his W heals the trade back, so commit fully rather than chip. Don't get caught by a Q-into-W all-in when you're already low.",
      mid: "Through the mid-game you trade roughly even with a slight edge — out-DPS his W heal in extended fights and dodge his Q empowerment to deny the stun. His big spike is R (Stratospheric Force): a dive that disables a tower and makes him tanky, so don't get caught low when it's up. Bait the R or fight before 6, then your sustain wins the long fight.",
      late: "Even into late — your sustain versus his lifesteal. Force fights on his Q and R cooldowns, where your healing out-grinds his W. Your Eclipse spike edges his first item. Commit fully to all-ins (chip just feeds his heal), stay above the HP where his R-dive kills you, and out-last him in the extended brawl.",
      whys: [
        "Voli's Q slows + empowers (stun if he closes) and W heals off you. Your combo out-trades — but commit fully.",
        "His W (bite) heals the trade back. Chip damage just feeds him — all-in or don't.",
        "Your combo out-trades him — dodge the Q empowerment to deny the stun, then force it.",
        "You edge the trades — out-DPS his W heal in the extended fight. Keep committing fully.",
        "His R is a tanky tower-dive all-in — don't get caught low when it's up. Bait it or fight before 6.",
        "Your Eclipse spike edges his — out-DPS his lifesteal. Force the all-in on his cooldowns.",
        "Even late — your sustain vs his. Fight on his Q/R cooldowns; out-last him in the brawl."
      ]
    },
    {
      a: 'aatrox', b: 'tryndamere',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Skill', 'Aatrox', 'Tryndamere'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your combo out-trades a low-fury Trynd — punish before his crit.' },
        { when: 'Lvl 6', text: 'His R (Undying Rage) means you can’t burst him — bait it out.' },
        { when: '1st item', text: 'Your Eclipse spike beats his — force it before his crit items.' },
        { when: '2+ items', text: 'Tryndamere takes over — crit + R make him an unkillable duelist.' }
      ],
      wants: {
        you: ['Out-trade his low-fury early before crit items', 'Bait his R (5s of undying) before you commit lethal', 'Win the lane before his crit scaling'],
        foe: ['Spin (E) + crit with Q heal as fury builds', 'Reduce your AD with W and slow you', 'Scale into a crit duelist with R (can’t die 5s)']
      },
      early: "Tryndamere out-trades when his fury is high (Q heals, crits spike), so fight him when his fury bar is low. His W reduces your AD and slows, and his E is a spin gap-close/escape. Levels 1-3 your combo out-trades a low-fury Trynd — punish those windows before his crit items come online and deny him easy fury stacking.",
      mid: "Respect his R (Undying Rage): for five seconds he can't drop below 1 HP, so blowing your full combo to 'kill' him just wastes it — he survives and crits you back. Bait the R out (force him to use it), then re-engage once it's down. Through the mid-game your sustain matches his; force trades when his fury and R are both low.",
      late: "Tryndamere takes over at two items — crit + Undying Rage make him a duelist you can't burst, and his Q heal off crits out-sustains you. The lane is even because you out-trade his early and he out-scales late. Press your spike, deny his farm, and end the lane before his crit items flip the 1v1. Don't side-lane a fed Trynd late.",
      whys: [
        "Tryndamere spikes with fury (Q heal + crits). Fight him at low fury — your combo out-trades it.",
        "His W cuts your AD and slows. Trade when his fury is low and punish before his crit items.",
        "Your combo out-trades a low-fury Trynd. Force the trade, deny his fury stacking.",
        "You out-trade through 4-5 — keep fighting on low-fury windows before he scales.",
        "His R means he can't die for 5s — don't dump your combo to 'kill' him. Bait the R first.",
        "Your Eclipse spike beats his — force it before his crit items. Re-engage after his R is down.",
        "Two items in, crit + R make him an unkillable duelist. You own early — end it before he scales."
      ]
    },
    {
      a: 'aatrox', b: 'quinn',
      win: ['Quinn', 'Skill', 'Aatrox', 'Skill', 'Skill', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Quinn pokes with autos + Q (blind) — farm and respect the range.' },
        { when: 'Lvl 6', text: 'Her R roams — punish the wave when she leaves, don’t get picked.' },
        { when: '1st item', text: 'Catch her with W-pull — she’s squishy and dies to your combo.' },
        { when: 'Late', text: 'Even — she roams for picks; you own the straight 1v1.' }
      ],
      wants: {
        you: ['Hug minions through her auto + Q (blind) poke', 'Catch her with W-pull — she has only E (vault) to escape', 'Punish the wave when she roams with R'],
        foe: ['Poke with autos + Q (Blinding Assault) from range', 'Vault over you with E for poke + reset', 'Roam with R (Behind Enemy Lines) to make plays']
      },
      early: "Quinn is a ranged lane bully — she pokes with autos and her Q (Blinding Assault) blinds your autos and chunks you, and her E (Vault) hops over you for a marked-target trade then resets. Levels 1-2 she out-ranges you; hug your minions to limit the poke, last-hit carefully, and don't step into open ground where she free-pokes.",
      mid: "Once you can close, she folds — she's squishy and her only escape is the E vault. Land W-pull when her E is down and your combo deletes her. Her R (Behind Enemy Lines) is a roam tool: when she uses it to make a play elsewhere, punish her wave for free CS and plates rather than chasing. Don't get caught out by a roam.",
      late: "Even — Quinn's late game is roaming for picks with her R, not winning the side-lane 1v1, which you own. Shove and track her: when she roams, take the wave; when she's in lane, threaten the all-in she can't survive. Build a lead, deny her pick potential, and don't facecheck for her vault-poke.",
      whys: [
        "Quinn pokes with autos + Q (blind) from range. Hug minions, last-hit carefully, respect the poke.",
        "Her E (vault) hops over you for a trade and reset. Don't step into open ground.",
        "Catch her with W-pull when her E is down — your combo deletes a squishy Quinn.",
        "She's squishy with only the vault to escape. Force the all-in whenever you reach her.",
        "Her R roams for picks — punish the wave when she leaves; don't chase or get caught.",
        "Your Eclipse spike kills her outright. Force it, take her tower.",
        "Even — she roams late, you own the 1v1. Shove, track her, deny the picks."
      ]
    },
    {
      a: 'aatrox', b: 'jayce',
      win: ['Jayce', 'Jayce', 'Skill', 'Jayce', 'Skill', 'Aatrox', 'Aatrox'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Jayce out-pokes you hard — cannon Q + W chunk you. Farm safe.' },
        { when: 'Lvl 6', text: 'Even — his poke vs your sustain; don’t get bursted by his melee combo.' },
        { when: '1st item', text: 'Your Eclipse spike flips it — close the gap and punish.' },
        { when: 'Late', text: 'You out-scale — Jayce falls off, your sustain takes over.' }
      ],
      wants: {
        you: ['Survive his early poke without dying', 'Close the gap past his cannon range, then all-in', 'Out-scale his falloff with your sustain'],
        foe: ['Poke from range with cannon Q + W (Hyper Charge)', 'Burst with the melee E-knockback → Q combo', 'Snowball the early before you out-scale him']
      },
      early: "Jayce is one of the hardest early pokes in the game — his cannon-stance Q (Shock Blast) through W (Hyper Charge) chunks you from range before you can do anything, and his melee E-knockback into Q bursts you if you walk up. Levels 1-3 are his. Farm at max range, take the poke on the chin, and don't step into a gate-empowered Shock Blast.",
      mid: "It stays his poke vs your sustain through the mid-game — heal the chip between trades and don't get caught by his full melee burst combo (E knockback into hammer Q). Be patient: he's trying to chunk you before you can close. Once you reach him with your combo he has to disengage, and his squishy frame can't trade back.",
      late: "You out-scale him hard. Jayce is a lane bully who falls off — his poke stops one-shotting once you have items and sustain, while your DPS only grows. Survive his brutal early, close the gap on his cannon cooldown, and by your item spikes the lane flips entirely. Make him fight you up close, where he loses.",
      whys: [
        "Jayce out-pokes you hard — cannon Q + W chunk you from range. Farm safe, don't contest.",
        "His melee E-knockback → Q bursts you if you walk up. Stay at max range, take the poke.",
        "Still his window — don't step into a gate-empowered Shock Blast. Heal and survive.",
        "His poke vs your sustain — heal the chip, don't get caught by the full burst combo.",
        "Even at 6 — your sustain catches up. Close on his cannon cooldown, don't get poked low.",
        "Your Eclipse spike flips it — close the gap and punish his squishy frame. Force the all-in.",
        "You out-scale — Jayce falls off. Make him fight up close; your sustain takes over late."
      ]
    },
    {
      a: 'aatrox', b: 'ryze',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Ryze'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your combo out-trades a weak-early Ryze — punish before he scales.' },
        { when: 'Lvl 6', text: 'Dodge his W (root) — it’s his only lock; without it you all-in.' },
        { when: '1st item', text: 'Your Eclipse spike beats him — force it before his item scaling.' },
        { when: '2+ items', text: 'Ryze takes over — mana-stacked, tanky, he out-DPS you late.' }
      ],
      wants: {
        you: ['All-in early before his item scaling', 'Dodge his W (root) — bait it before you commit', 'Win the lane before he stacks mana + items'],
        foe: ['Poke with Q-E spread combo from range', 'Lock you with W (root) to kite', 'Out-scale into a tanky, high-DPS mana mage']
      },
      early: "Ryze is weak early and scales into a tanky DPS mage, so your window is now. He pokes with his Q (and E spreads it), and his W is a point-blank root — his only hard CC. Levels 1-3 your combo out-trades him; punish him before he gets items. Don't get rooted from bush range into a full Q-combo, but otherwise force the issue.",
      mid: "The whole lane is dodging his W root. If he whiffs it, he has no way to stop your all-in — E in, W-pull, Q-sweetspot, and he's squishy enough to delete. Bait the W before you commit. Keep him off CS and deny his mana/item stacking, because every minute that passes moves the matchup toward him.",
      late: "Ryze takes over at two items — stacked mana plus tank items make him a high-DPS, hard-to-kill mage, and his root + poke control the fight. The lane is even because you crush his early and he out-scales your late. Press your spike hard, deny his farm, and end the lane before his item spikes flip the duel.",
      whys: [
        "Ryze is weak early and scales hard. Your combo out-trades him now — punish before his items.",
        "His Q-E poke chips but he can't match your trade yet. Deny his farm, force the issue.",
        "Your full combo out-trades a weak-early Ryze. Dodge his W root, then all-in.",
        "Keep punishing — bait the W before you commit. Every level before his items is yours.",
        "Dodge his W (root) — it's his only lock. Without it your all-in deletes his squishy frame.",
        "Your Eclipse spike beats him. Force the all-in before his mana + item scaling.",
        "Two items in, mana-stacked and tanky, he out-DPS you. You own early — end it before he scales."
      ]
    },
    {
      a: 'aatrox', b: 'heimerdinger',
      win: ['Skill', 'Skill', 'Aatrox', 'Skill', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'His turrets zone your CS — kill turrets, dodge the E stun.' },
        { when: 'Lvl 6', text: 'Catch him — he’s squishy; W-pull past the turrets and all-in.' },
        { when: '1st item', text: 'Your Eclipse spike deletes him if you reach him through the turrets.' },
        { when: 'Late', text: 'Even — his turret zone vs your all-in; respect the E grenade stun.' }
      ],
      wants: {
        you: ['Kill his turrets to break the zone, then all-in', 'Dodge his E (grenade stun) — it sets up his combo', 'Catch him with W-pull — he’s squishy and dies'],
        foe: ['Zone your CS with H-28 turrets (Q)', 'Poke with W (rockets) and stun with E (grenade)', 'Wall you off and scale his turret damage with R']
      },
      early: "Heimerdinger zones you with his turrets (Q) — they deny your CS and poke you whenever you step up — and his E (grenade) stuns to set up his W rocket poke. Levels 1-3, focus turrets down when you can, dodge the E stun (it's his whole combo setup), and accept that last-hitting under his turret zone is awkward. Don't facecheck for the grenade.",
      mid: "Your path to winning is catching him — Heimer is squishy and immobile, so if you W-pull him past his turrets and land your combo, he dies. The hard part is the E grenade stun, which interrupts your engage. Bait or dodge the E, then commit. Kill his turrets first so they can't kite you with their damage while he repositions.",
      late: "Even — his turret zone control versus your all-in threat. He'll wall off chokes and his R upgrades his turret damage, but in a straight fight he's a squishy with no escape. Respect the E grenade stun, clear his turrets before you commit, and your combo deletes him whenever you reach him. Don't get poked out trying to siege his zone.",
      whys: [
        "Heimer's turrets (Q) zone your CS and poke you. Kill turrets when you can; last-hit is awkward.",
        "His E (grenade) stuns to set up his W rockets. Dodge it — don't facecheck for the grenade.",
        "Your combo deletes a squishy Heimer — W-pull him past the turrets and all-in.",
        "Clear his turrets first so they can't kite you. Then force the trade on his immobile frame.",
        "Catch him — he's squishy with no escape. Bait the E stun, then W-pull and combo.",
        "Your Eclipse spike kills him if you reach him through the turrets. Force it.",
        "Even — his turret zone vs your all-in. Respect the E stun, clear turrets, delete him when you reach him."
      ]
    },
    {
      a: 'aatrox', b: 'aurora',
      win: ['Skill', 'Skill', 'Aatrox', 'Skill', 'Aurora', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'She pokes with Q + E (slow) and self-heals — bait her W dash.' },
        { when: 'Lvl 6', text: 'Aurora’s window — R zone + untargetability let her escape your all-in.' },
        { when: '1st item', text: 'Your Eclipse spike edges her — catch her when W is down.' },
        { when: 'Late', text: 'Even — her mobility + poke vs your sustain; land W to win.' }
      ],
      wants: {
        you: ['Catch her with W-pull when her W (dash) is down', 'Out-sustain her Q/E poke in the extended fight', 'Punish her after she commits her W escape'],
        foe: ['Poke with Q (bolt) + E (80% slow) and self-heal', 'Dodge your combo with W (dash + invisibility)', 'Zone and escape with R (untargetable rift)']
      },
      early: "Aurora is a mobile AP skirmisher with her own sustain — her Q pokes (recast for missing-HP damage), her E slows you 80% while recoiling her to safety, and her passive heals her off you. Her W is a dash into invisibility — her escape and repositioning tool. Levels 1-3, last-hit through the poke and don't commit your combo while her W is up to dodge it.",
      mid: "Your window is catching her with W-pull when her W dash is on cooldown — locked in your sweetspot she can't kite, and your combo out-trades her. Bait the W out first (force her to use it to dodge), then re-engage. Her level-6 R creates a rift she can dash through to become untargetable, so it's a strong escape from your all-in — respect it.",
      late: "Even into late — her mobility and poke versus your sustain. The duel comes down to whether you land W before she dashes; if you do, you out-trade and out-sustain her, and if she kites freely she pokes you down. Your Eclipse edges her first item. Force fights on her W cooldown, punish her after she commits an escape, and don't chase her into her R rift.",
      whys: [
        "Aurora pokes with Q + E (80% slow) and self-heals off you. Last-hit through it; don't commit into her W.",
        "Her W is a dash into invisibility — her escape. Don't dump your combo while it's up to dodge.",
        "Your combo out-trades her — W-pull when her dash is down and she can't kite. Force it.",
        "Bait her W out first, then re-engage. Out-sustain her poke in the extended fight.",
        "Her R rift lets her dash to untargetability — a strong escape from your all-in. Respect it.",
        "Your Eclipse spike edges her — catch her when W is down and delete her squishy frame.",
        "Even late — her mobility + poke vs your sustain. Land W to win; don't chase into her R rift."
      ]
    },
    {
      a: 'aatrox', b: 'ambessa',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Ambessa', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Even skirmish — bait her E (shield-brace) before you commit.' },
        { when: 'Lvl 6', text: 'Ambessa’s window — her R (blink + suppress + stun) is a hard all-in.' },
        { when: '1st item', text: 'Your Eclipse spike edges her — out-sustain her dash combo.' },
        { when: 'Late', text: 'Even — both skirmish; your sustain vs her mobility + R engage.' }
      ],
      wants: {
        you: ['Bait her E (Repudiation shield) before committing burst', 'Out-sustain her Q-W dash combo in the long fight', 'Respect her R (suppress) — don’t get caught low'],
        foe: ['Chain dashes (passive) into the Q → W combo', 'Brace your burst with E (shield + counter-smash)', 'All-in with R (blink behind + suppress + stun)']
      },
      early: "Ambessa is a high-mobility AD skirmisher — her passive grants free dashes during her abilities, her Q (cone slash) enables her W (line slam) for a burst combo, and her E (Repudiation) braces for a shield then smashes, hitting harder if the shield absorbed your damage. So don't dump your burst into her E. Levels 1-3 are an even skirmish; bait the E before you commit.",
      mid: "Through the mid-game your sustain holds the extended fight — she out-bursts in a short window with her dash combo, but you out-last her if you bait the E and don't get chunked early. Her big spike is R (Public Execution): she blinks behind you, suppresses, and stuns for a full combo, so don't be at low HP when it's up. Respect that all-in window.",
      late: "Even into late — both of you skirmish, your sustain versus her mobility and R engage. Your Eclipse edges her first item in an extended fight. Force the long trade where your healing beats her burst, bait her E shield before committing, and play around her R (the suppress all-in is her main kill threat). Don't get caught alone at low HP.",
      whys: [
        "Ambessa chains dashes into a Q → W burst combo. Even skirmish at 1-3 — don't trade recklessly.",
        "Her E (Repudiation) shields then smashes harder if it absorbed your hit. Don't dump burst into it.",
        "Your combo out-trades once you bait the E. Force the trade after her shield is spent.",
        "You out-last her in extended fights — out-sustain the dash combo. Keep it long, not bursty.",
        "Her R blinks behind you, suppresses and stuns for a full combo — don't be low when it's up.",
        "Your Eclipse spike edges her — out-sustain her burst. Force the long all-in, bait the E.",
        "Even late — your sustain vs her mobility + R. Play around the suppress; don't get caught low."
      ]
    },
    {
      a: 'aatrox', b: 'galio',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo out-trades him — bait his W (damage reduction) first.' },
        { when: 'Lvl 6', text: 'You win the 1v1; his R is a global peel, not a duel button.' },
        { when: '1st item', text: 'Your Eclipse spike beats a tanky-but-passive Galio.' },
        { when: 'Late', text: 'He’s a teamfight tank-mage; you own the lane 1v1.' }
      ],
      wants: {
        you: ['Bait his W (damage reduction) before committing', 'Out-trade his poke once W is down', 'Snowball the lane — he’s a scaling teamfighter'],
        foe: ['Poke with Q (windblast) and farm safely', 'Soak your burst with W (damage reduction + taunt)', 'Roam / impact the map with global R']
      },
      early: "Galio pokes with Q (a windblast) and farms safely behind his W (Shield of Durand), which reduces incoming damage and taunts if he channels it. Don't dump your combo into a raised W — it eats your burst and can taunt you. Last-hit through the Q poke and wait to bait the W; his early kill pressure on you is low.",
      mid: "Once you bait the W, your combo out-trades him — he's a tanky control mage, not a duelist. His E (dash + knockup) is his engage/escape; respect it but don't fear his 1v1. At 6 his R is a global peel/engage for other lanes, not a button that beats you — when he ults away, punish the wave. Keep him pinned and deny the roam value.",
      late: "Galio scales into a teamfight tank-mage with global presence, but in lane the 1v1 was never his — you out-trade and out-pressure him. Your Eclipse spike beats his passive, tanky frame. Press the lane, take his tower, and don't let his R swing other lanes; the duel is yours all game.",
      whys: [
        "Galio pokes with Q and soaks damage with W. Don't trade into a raised W — bait it first.",
        "His W reduces damage and can taunt. Wait it out, then your combo out-trades him.",
        "Bait the W, then all-in — he's a tanky mage, not a duelist. Force the trade.",
        "You out-trade him through the mid-game. Respect his E knockup but don't fear the 1v1.",
        "His R is a global peel/engage, not a duel button. When he ults away, punish the wave.",
        "Your Eclipse spike beats a tanky-but-passive Galio. Take his tower, snowball.",
        "He's a teamfight tank-mage late — you own the lane 1v1. Deny his roam, press your edge."
      ]
    },
    {
      a: 'aatrox', b: 'ziggs',
      win: ['Ziggs', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Ziggs pokes from max range with Q — hug minions, take the chip.' },
        { when: 'Lvl 6', text: 'Catch him — he’s squishy; W-pull past his satchel and all-in.' },
        { when: '1st item', text: 'Your Eclipse spike deletes him if you reach him.' },
        { when: 'Late', text: 'You own the 1v1 — close the gap; his only escape is W (satchel).' }
      ],
      wants: {
        you: ['Hug minions to dodge his Q bomb poke', 'Catch him with W-pull — he’s squishy and dies', 'Bait his W (satchel) escape before you commit'],
        foe: ['Poke from max range with Q (bouncing bomb)', 'Escape your gap-close with W (Satchel Charge)', 'Zone you with E (minefield) and nuke with R']
      },
      early: "Ziggs is pure artillery — his Q (bouncing bomb) out-ranges everything and pokes you whenever you step to CS, and his E lays a slowing minefield to keep you out. He has no stun, but his W (Satchel Charge) blasts him to safety. Levels 1-2, hug your minions to body-block the Q, take the chip your sustain heals, and don't path through the minefield.",
      mid: "Your whole game is closing the gap. Ziggs is squishy and immobile except for the W satchel — bait or eat it, then W-pull him and your combo deletes him. He can't kite a healing juggernaut once you're on top of him with no satchel up. Force him to burn W early, then all-in on its cooldown.",
      late: "You own the 1v1 — if you reach Ziggs he dies, full stop. His threat is range and zone control, not the duel. Close on his satchel cooldown, deny him free poke by hugging minions, and end the lane. Don't get chunked sieging his minefield; pick your gap-close and commit when his escape is down.",
      whys: [
        "Ziggs out-ranges you with Q bomb poke. Hug minions to block it; take the chip you heal back.",
        "His E minefield zones you out. Don't path through it — wait for your window to close.",
        "Your combo deletes a squishy Ziggs — close the gap and force the trade.",
        "He has no stun, only the W satchel escape. Bait it, then commit.",
        "Catch him — W-pull past the satchel and all-in. He can't kite you once you're on him.",
        "Your Eclipse spike kills him outright if you reach him. Close on his W cooldown.",
        "You own the 1v1 — his only escape is W. Force the gap-close, deny the poke, end it."
      ]
    },
    {
      a: 'aatrox', b: 'neeko',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo out-trades her squishy frame — bait the E (root).' },
        { when: 'Lvl 6', text: 'Don’t get caught by her R (AOE stun) into burst — dodge the windup.' },
        { when: '1st item', text: 'Your Eclipse spike deletes a one-item Neeko — force it.' },
        { when: 'Late', text: 'You own the 1v1 — she’s a teamfight burst mage, not a duelist.' }
      ],
      wants: {
        you: ['Bait her E (root) before you commit', 'Catch her with W-pull — she’s squishy and dies', 'Dodge her R (stun) windup at level 6'],
        foe: ['Poke with Q (Blooming Burst) and root with E', 'Disguise as a minion/ally with W (clone)', 'All-in with R (Pop Blossom AOE stun)']
      },
      early: "Neeko pokes with Q (Blooming Burst) and her E (Tangle-Barbs) roots you to set up damage, but she's squishy and her kit is built for picks, not dueling. Her W disguises her (as a minion or ally) — don't get fooled by a clone. Levels 1-3, last-hit through the poke, dodge the E root (it's her whole setup), and your combo out-trades her up close.",
      mid: "Bait the E root, then all-in — once it's down she has no way to stop your combo and her squishy frame folds. At 6 respect her R (Pop Blossom): a delayed AOE stun she leaps in with, often from a disguise, so watch the windup and don't get caught flat-footed. Land W-pull and she dies; she can't trade back in a straight fight.",
      late: "You own the 1v1 — Neeko is a teamfight burst/pick mage, not a side-lane duelist. If you reach her she dies, and your Eclipse spike makes that instant. Press the lane, deny her roams (her R + disguise are pick tools), and don't facecheck a 'minion' that might be her W clone. The duel is always yours.",
      whys: [
        "Neeko pokes with Q and roots with E, but she's squishy. Bait the E, then out-trade her.",
        "Her W disguises her as a minion or ally — don't get fooled by a clone. Farm and respect the root.",
        "Your combo out-trades her squishy frame — bait the E root, then commit.",
        "You out-trade her up close. Keep her off farm and deny the roam setup.",
        "Her R (Pop Blossom) is a delayed AOE stun, often from a disguise — dodge the windup.",
        "Your Eclipse spike deletes a one-item Neeko. W-pull and force the all-in.",
        "You own the 1v1 — she's a teamfight pick mage. Don't facecheck her clones; press your edge."
      ]
    },
    {
      a: 'aatrox', b: 'zac',
      win: ['Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Zac'],
      spikes: [
        { when: 'Lvl 2–5', text: 'Your window — Zac is a weak early laner. Bully him off CS.' },
        { when: 'Lvl 6', text: 'Out-DPS his passive blob heals — don’t let him reset the fight.' },
        { when: '1st item', text: 'Your Eclipse spike crushes a pre-tank Zac — snowball.' },
        { when: '2+ items', text: 'Zac takes over — stacked HP + heals make him a teamfight tank.' }
      ],
      wants: {
        you: ['Bully his weak early — he has low kill pressure', 'Deny CS + his passive blobs (bring grievous wounds)', 'Snowball before his HP/heal tank scaling'],
        foe: ['Poke with Q (stretchy arm) and farm safely', 'Sustain with passive blobs + W', 'Scale into an HP-stacking teamfight tank with R']
      },
      early: "Zac is a weak early laner — his Q (stretchy-arm grab) pokes and his W chips, but he has little kill pressure and just wants to farm and scale. This is your window: bully him off the wave levels 2-5, deny CS, and step on his passive blobs so he can't pick them up to heal. Don't let him free-farm into his tank spike.",
      mid: "Keep stomping. Your combo out-trades and out-heals him, and his passive blob-heals only delay it — bring grievous wounds (Executioner's/Bramble) so his sustain stops mattering. At 6 his R is a teamfight engage, not a 1v1 button; out-DPS his heals, deny the reset, and snowball the lead before he stacks HP.",
      late: "Zac takes over at two items — stacked HP plus his passive and blob heals make him an unkillable teamfight tank your AD can't punch through. The lane is heavily favoured because you crush the early; press it, deny his farm, and build a lead so his late-game tankiness never matters. Antiheal keeps your edge.",
      whys: [
        "Zac is a weak early laner with low kill pressure. Bully him off CS — this is your window.",
        "Step on his passive blobs so he can't heal. Out-trade his weak early.",
        "Your combo out-trades him — deny CS and force trades while he's squishy.",
        "Keep stomping — every denied stack of farm delays his tank spike. Bring grievous wounds.",
        "His R is a teamfight engage, not a duel button. Out-DPS his blob heals, deny the reset.",
        "Your Eclipse spike crushes a pre-tank Zac. Snowball, take his tower.",
        "Two items in, stacked HP + heals make him a teamfight tank. You own early — end it first."
      ]
    },
    {
      a: 'aatrox', b: 'mel',
      win: ['Mel', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Mel pokes from range with Q — hug minions, take the chip.' },
        { when: 'Lvl 6', text: 'Catch her — she’s squishy; bait her W shield, then W-pull and all-in.' },
        { when: '1st item', text: 'Your Eclipse spike deletes her if you reach her.' },
        { when: 'Late', text: 'You own the 1v1 — she’s a teamfight poke mage with no escape but W.' }
      ],
      wants: {
        you: ['Hug minions through her Q (Radiant Volley) poke', 'Dodge her E (Solar Snare root) — it sets up her damage', 'Catch her with W-pull — she’s squishy and dies'],
        foe: ['Poke from range with Q (Radiant Volley)', 'Root you with E (Solar Snare) to land poke / R', 'Self-peel with W (shield + move speed)']
      },
      early: "Mel is a squishy artillery mage — her Q (Radiant Volley) rains bolts on you from range and her E (Solar Snare) roots you to land more poke. Her W (Rebuttal) reflects enemy projectiles, but your kit is melee so it's just a shield + move-speed peel against you. Levels 1-2, hug your minions to limit the Q, dodge the E root, and take the chip your sustain heals.",
      mid: "Once you can close, she folds — Mel has no real escape but the W move-speed, and she's squishy. Dodge or bait the E root (it's how she sets up her damage and R), bait the W shield, then W-pull and your combo deletes her. Force her to burn W, then all-in on its cooldown; she can't trade back up close.",
      late: "You own the 1v1 — if you reach Mel she dies. Her threat is ranged poke and her R (a global mark-execute in teamfights), not the side-lane duel. Close on her W cooldown, deny free poke by hugging minions, and end the lane. Don't get rooted into her full combo; dodge the E and you win every all-in.",
      whys: [
        "Mel pokes from range with Q (Radiant Volley). Hug minions, take the chip you heal back.",
        "Her E (Solar Snare) roots you to set up poke. Dodge it — don't get chained into her combo.",
        "Your combo deletes a squishy Mel — close the gap and force the trade.",
        "Her W reflects projectiles but you're melee — it's just a shield + MS peel. Keep closing.",
        "Catch her — bait the W shield, then W-pull and all-in. She can't trade back up close.",
        "Your Eclipse spike kills her if you reach her. Close on her W cooldown.",
        "You own the 1v1 — she's a teamfight poke mage. Dodge the E root and win every all-in."
      ]
    },
    {
      a: 'aatrox', b: 'kassadin',
      win: ['Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Kassadin'],
      spikes: [
        { when: 'Lvl 1–5', text: 'Your window — Kassadin is one of the weakest early champs. Bully him.' },
        { when: 'Lvl 6', text: 'His R (Riftwalk) gives an escape — all-in before he can blink away.' },
        { when: '1st item', text: 'Your Eclipse spike crushes him — but the clock is ticking.' },
        { when: '2+ items', text: 'Kassadin takes over — at 16 + items he out-scales the game.' }
      ],
      wants: {
        you: ['Bully his brutal early — deny CS and XP relentlessly', 'All-in before his R (Riftwalk) escape', 'Snowball huge before his level 16 / item spike'],
        foe: ['Survive lane with Q (spell shield) and farm', 'Blink away from your all-in with R (Riftwalk)', 'Out-scale into an unkillable late-game assassin']
      },
      early: "Kassadin is one of the weakest early-game champions in the game and you are a juggernaut who spikes at 3 — this is a hard stomp window. His Q gives a spell shield (it blocks one ability, so don't waste your combo into it) and his E slows, but he can't trade with you. Bully him off every CS, deny XP, and starve his scaling from minute one.",
      mid: "Keep him broke. Your combo out-trades him flatly through the mid-game; all-in repeatedly and zone him off the wave. At 6 his R (Riftwalk) gives a blink escape, so engage before he can flash-blink away and dive him under tower with any jungle help. Every level and item you deny delays the carry he becomes.",
      late: "Kassadin takes over hard at two items and level 16 — his Riftwalk stacking burst out-scales the entire game and he becomes nearly unkillable. The lane is even on paper precisely because you crush the early and he crushes the late. You MUST snowball lane into a game-ending lead; if he farms to his spike, you simply lose the late game.",
      whys: [
        "Kassadin is one of the weakest early champs. You spike at 3 — bully him off every CS.",
        "His Q is a spell shield — don't waste your combo into it. Otherwise he can't trade you.",
        "Your combo out-trades him flatly. Deny CS + XP — starve his scaling.",
        "Keep him broke through the mid-game. Every denied minion delays his spike.",
        "His R (Riftwalk) is a blink escape — all-in before he can flash-blink away. Dive with jungle.",
        "Your Eclipse spike crushes him — but the clock's ticking. Build a game-ending lead now.",
        "Two items + level 16 he out-scales everyone. You crush early or you lose late — snowball hard."
      ]
    },
    {
      a: 'aatrox', b: 'lucian',
      win: ['Lucian', 'Skill', 'Aatrox', 'Skill', 'Skill', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Lucian pokes with Q + passive double-shot — hug minions.' },
        { when: 'Lvl 6', text: 'Catch him — W-pull through his E dash and your combo deletes him.' },
        { when: '1st item', text: 'Your Eclipse spike beats a one-item Lucian — force it.' },
        { when: 'Late', text: 'Even — he pokes and kites; you own the all-in when you land W.' }
      ],
      wants: {
        you: ['Hug minions through his Q + passive double-shot poke', 'Catch him with W-pull when his E dash is down', 'Force the all-in — he’s squishy and folds up close'],
        foe: ['Poke with Q (line) + passive double-shot', 'Dash around your combo with E (Relentless Pursuit)', 'Kite you and scale into a DPS marksman']
      },
      early: "Lucian top is a ranged lane bully — his Q (Piercing Light) pokes through minions, his passive double-shot adds chip after every ability, and his E (Relentless Pursuit) dashes to reposition. Levels 1-2 he out-ranges and pokes you; hug your minions to limit the Q, last-hit carefully, and take the chip your sustain heals back.",
      mid: "Your window is catching him — Lucian is squishy and relies on the E dash to stay safe. Land W-pull when his E is down and your combo deletes him; he can't kite a healing juggernaut once he's locked in your sweetspot. Bait the E (force him to dash early), then all-in on its cooldown. Don't get poked low chasing him in open ground.",
      late: "Even into late — Lucian pokes and kites with his dashes and scales as a DPS marksman, but he never wins the all-in once you land W. The duel comes down to whether you catch him: hug minions to deny free poke, close on his E cooldown, and your Eclipse spike beats his. If he kites freely he chips you; if you land W, he dies.",
      whys: [
        "Lucian pokes with Q + passive double-shot from range. Hug minions, take the chip you heal.",
        "His E (Relentless Pursuit) dashes to reposition. Don't chase into open ground — wait for a clean W.",
        "Catch him — W-pull when his E is down and your combo deletes a squishy Lucian.",
        "He kites with the E dash. Bait it out, then all-in on its cooldown.",
        "Don't get poked low chasing. Force the fight when his dash is down.",
        "Your Eclipse spike beats a one-item Lucian. Land W, force the all-in.",
        "Even late — he pokes and kites, but loses the all-in when you land W. Catch him and he dies."
      ]
    },
    {
      a: 'aatrox', b: 'graves',
      win: ['Skill', 'Graves', 'Graves', 'Skill', 'Skill', 'Aatrox', 'Aatrox'],
      spikes: [
        { when: 'Lvl 2–3', text: 'Graves’ window — shotgun Q burst + E dash out-trade you early.' },
        { when: 'Lvl 6', text: 'Even — don’t get blinded (W smoke) mid all-in; bait it first.' },
        { when: '1st item', text: 'Your Eclipse spike flips it — out-sustain his burst.' },
        { when: 'Late', text: 'You edge it — your sustain out-grinds his cooldown burst.' }
      ],
      wants: {
        you: ['Survive his strong level 2-3 burst, then scale', 'Bait his W (smoke screen blind) before committing', 'Out-sustain his shotgun burst in the long fight'],
        foe: ['Burst you with shotgun Q + E (dash + armor)', 'Blind + slow you with W (Smoke Screen)', 'Kite with his dash and out-trade short fights']
      },
      early: "Graves out-trades you early — his Q (shotgun double-shot) is heavy point-blank burst, his E dashes and stacks armour for the trade, and his W (Smoke Screen) blinds and slows you to shut off your autos. Levels 2-3 are his window. Don't brawl into a full shotgun-E combo; take the poke, last-hit, and respect that his early burst beats yours.",
      mid: "It evens out around 6 — your sustain starts matching his burst. The key is his W smoke: don't all-in through the blind (it cancels your auto-attacks mid-combo), so bait it first or fight when it's down. His damage is cooldown-reliant burst, so punish him after he dumps Q-E, when he has to wait for cooldowns.",
      late: "You edge the matchup — in the extended fight your healing out-grinds his cooldown burst, and once you have items his shotgun stops chunking you. Your Eclipse spike flips the lane. Force long trades where his burst-then-wait loses to your sustain, bait the smoke blind, and don't get caught by a fresh shotgun-E combo while low.",
      whys: [
        "Graves' shotgun Q + E burst out-trade you early. Don't brawl into the full combo — take the poke.",
        "His E dashes and stacks armour for the trade. Levels 2-3 are his — survive, don't contest.",
        "Still his window — his burst beats yours pre-item. Last-hit and wait for your spike.",
        "Your sustain starts matching him. Bait his W smoke before you commit anything.",
        "Don't all-in through his W blind — it cancels your autos. Bait it, then fight.",
        "Your Eclipse spike flips it — out-sustain his burst. Punish him after he dumps Q-E.",
        "You edge it late — your heal out-grinds his cooldown burst. Force the long fight."
      ]
    },
    {
      a: 'aatrox', b: 'karma',
      win: ['Skill', 'Skill', 'Aatrox', 'Skill', 'Skill', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'She pokes with Q and shields herself — bait the shield, then trade.' },
        { when: 'Lvl 6', text: 'Catch her — W-pull and your combo deletes a squishy Karma.' },
        { when: '1st item', text: 'Your Eclipse spike beats her if you reach her.' },
        { when: 'Late', text: 'You own the 1v1 — she’s a poke/utility mage, not a duelist.' }
      ],
      wants: {
        you: ['Bait her E (shield + MS) before you all-in', 'Catch her with W-pull — she’s squishy and folds', 'Don’t get kited by her W (root tether)'],
        foe: ['Poke with Q (Inner Flame) — empowered by R (Mantra)', 'Root you with W (Focused Resolve) tether', 'Self-peel with E (shield + move speed)']
      },
      early: "Karma pokes with her Q (Inner Flame, empowered by her R Mantra) and peels herself with E (a shield + move speed). Her W (Focused Resolve) is a tether that roots if she channels it fully — don't let her hold it on you while she kites. Levels 1-3, last-hit through the poke, bait or break the W tether, and don't trade into a fresh E shield.",
      mid: "Your path is catching her — Karma is squishy and her only defensive tools are the E shield and the W kite. Bait the E, then W-pull and your combo deletes her. Don't get rooted by a full W tether mid-engage; close the distance fast or break line of sight on it. Once you're on her with no shield up, she folds.",
      late: "You own the 1v1 — Karma is a poke/utility mage, not a side-lane duelist. If you reach her she dies, and your Eclipse spike makes it quick. Press the lane, deny her poke by hugging minions, and don't get kited by W + E. Her value is utility for her team, not beating you one-on-one.",
      whys: [
        "Karma pokes with Q (Mantra-empowered) and shields with E. Bait the shield before you trade.",
        "Her W (Focused Resolve) tethers and roots if she channels it. Break it or close fast.",
        "Your combo out-trades a squishy Karma — bait the E, then commit.",
        "Don't get kited by W + E. Force the gap-close when her shield is down.",
        "Catch her — W-pull and your combo deletes her. She can't trade back up close.",
        "Your Eclipse spike beats her if you reach her. Force the all-in.",
        "You own the 1v1 — she's a poke/utility mage. Hug minions, deny the poke, press your edge."
      ]
    },
    {
      a: 'aatrox', b: 'sejuani',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo out-trades her weak early — dodge her Q (charge).' },
        { when: 'Lvl 6', text: 'You win the 1v1; her R is a teamfight stun, not a duel button.' },
        { when: '1st item', text: 'Your Eclipse spike beats a low-damage Sejuani — snowball.' },
        { when: 'Late', text: 'She’s a teamfight tank; you own the lane 1v1.' }
      ],
      wants: {
        you: ['Out-trade her weak early before she stacks tanky', 'Dodge her Q (charge) and avoid the Frost (E) stun', 'Snowball — she has low solo kill pressure'],
        foe: ['Engage with Q (charge knockup)', 'Stack Frost (E) for a stun, farm and scale', 'Become a teamfight engage tank with R']
      },
      early: "Sejuani is a weak early laner with low damage — she wants to farm and scale into a teamfight tank. Her Q is a charge knockup (dodgeable) and her E stacks Frost for a stun, but in lane she can't out-trade you. Levels 1-3 your combo wins; dodge the Q, don't let her free-stack Frost on you, and bully her off CS.",
      mid: "You win every 1v1. Her W cleaves and her passive adds true damage, but it's not enough to beat your sustain — out-trade her and keep her off farm. At 6 her R is a long-range engage stun for teamfights, not a button that wins the duel, so don't fear it in lane; just don't get chain-CC'd into her jungler.",
      late: "Sejuani scales into a teamfight engage tank, but in the side lane she never beats you. Your Eclipse spike beats her low-damage frame, so press the lane and take her tower. The game becomes about her R engage in fights, not the 1v1 — which you own. Snowball your early edge before her tankiness matters.",
      whys: [
        "Sejuani is a weak early laner with low damage. Dodge her Q charge — your combo out-trades her.",
        "Don't let her free-stack Frost (E) for the stun. Bully her off CS while she's weak.",
        "Your combo out-trades her — force the trade, deny her farm.",
        "You out-trade her through the mid-game. Her cleave + true damage can't beat your sustain.",
        "Her R is a teamfight engage stun, not a duel button. You win the 1v1 — don't get chain-CC'd.",
        "Your Eclipse spike beats a low-damage Sejuani. Snowball, take her tower.",
        "She's a teamfight tank late — you own the lane 1v1. Press your early edge."
      ]
    },
    {
      a: 'aatrox', b: 'lillia',
      win: ['Skill', 'Skill', 'Aatrox', 'Skill', 'Skill', 'Aatrox', 'Lillia'],
      spikes: [
        { when: 'Lvl 3', text: 'Your combo out-trades her — W-pull catches her through the kite.' },
        { when: 'Lvl 6', text: 'Don’t get put to sleep by her R (Dream-Laden Bough) chain-CC.' },
        { when: '1st item', text: 'Your Eclipse spike beats a one-item Lillia — force it.' },
        { when: '2+ items', text: 'Lillia takes over — AP on-hit + mobility kite and shred you.' }
      ],
      wants: {
        you: ['Catch her with W-pull through her E dash + Q kite', 'All-in before her AP scaling comes online', 'Punish her after she commits her E dash'],
        foe: ['Kite with Q (swirl) movement + E (dash + slow)', 'Stack passive burn and scale AP on-hit', 'Set up ganks / picks with R (sleep)']
      },
      early: "Lillia is a mobile AP skirmisher who kites — her Q (Blooming Blows) deals AOE and ramps her move speed, and her E (Watch Out!) is a dash + slow. She has no hard early trade; your combo out-trades her if you catch her. Levels 1-3, land W-pull to cancel her kite and lock her in your sweetspot, and don't whiff your combo chasing a dancing Lillia.",
      mid: "Your window is catching her — bait or punish her E dash (she's committed after it), then W-pull and out-trade her. At 6 respect her R (Dream-Laden Bough): a delayed sleep that sets up a burst all-in or a gank, so don't get drowsy-then-slept in a bad spot. Keep her off farm; her whole game is scaling AP on-hit.",
      late: "Lillia takes over at two items — AP on-hit damage plus her constant mobility let her kite and shred you while staying out of your sweetspot. The lane is even because you out-trade her early and she scales past you. Press your spike, land your W-pulls, and build a lead before her items flip the duel. Don't get slept and bursted.",
      whys: [
        "Lillia kites with Q move speed + E dash. W-pull cancels the kite — catch her and you out-trade.",
        "She has no hard early trade. Don't whiff your combo chasing — wait for a clean W.",
        "Your combo out-trades her once locked. Force the trade after her E dash is down.",
        "Punish her after she commits E (she's stuck on the return). Land W first.",
        "Her R is a delayed sleep that sets up burst or ganks — don't get slept in a bad spot.",
        "Your Eclipse spike beats a one-item Lillia. Land W, force the all-in.",
        "Two items in, AP on-hit + mobility kite and shred you. You own early — close before she scales."
      ]
    },
    {
      a: 'aatrox', b: 'nautilus',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Dodge his Q (hook) — without it he can’t start a trade.' },
        { when: 'Lvl 6', text: 'You win the 1v1; his R (single-target knockup) is a peel/pick tool.' },
        { when: '1st item', text: 'Your Eclipse spike beats a low-damage Nautilus.' },
        { when: 'Late', text: 'He’s a CC tank for teamfights; you own the lane 1v1.' }
      ],
      wants: {
        you: ['Dodge his Q (Dredge Line hook) — it starts everything', 'Out-trade his low damage once the hook is down', 'Snowball — he’s a teamfight CC tank, not a duelist'],
        foe: ['Hook you in with Q (Dredge Line)', 'Chunk with W (shield + bonus on-hit) + E (AOE)', 'Lock you down with R + passive root for a gank']
      },
      early: "Nautilus is a CC tank with low damage — his whole trade starts with the Q hook (Dredge Line). Dodge it and he has nothing; eat it and he gets a free W (shield + bonus damage) and E AOE on you. Levels 1-3, respect the hook from bush range, sidestep it, and once it's down your combo out-trades his low-damage frame.",
      mid: "You win the 1v1. Without the hook he can't engage, and his W shield + E poke don't out-trade your sustain. At 6 his R is a single-target knockup — a pick/peel tool that's dangerous with a jungler around (his passive also roots), but in a straight duel it doesn't beat you. Dodge the hook, punish, and deny ganks by tracking his R.",
      late: "Nautilus scales into a teamfight CC tank, but in lane the 1v1 is yours — he can't out-damage your sustain and his engage relies on the hook you dodge. Your Eclipse spike beats his low-damage frame. Press the lane, take his tower, and respect his R + jungler for picks, but never fear him one-on-one.",
      whys: [
        "Nautilus' trade starts with the Q hook. Dodge it from bush range and he has nothing.",
        "Eat the hook and he gets a free W + E on you. Sidestep it — that's the whole matchup.",
        "Once the hook is down your combo out-trades his low-damage frame. Force the trade.",
        "You out-trade him — his W shield + E poke don't beat your sustain. Keep punishing.",
        "His R is a single-target knockup pick/peel tool — dangerous with a jungler. You win the 1v1.",
        "Your Eclipse spike beats a low-damage Nautilus. Take his tower, snowball.",
        "He's a teamfight CC tank late — you own the lane 1v1. Respect his R for picks, not the duel."
      ]
    },
    {
      a: 'aatrox', b: 'akshan',
      win: ['Akshan', 'Akshan', 'Skill', 'Akshan', 'Skill', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Akshan pokes with Q + autos and swings around terrain — hard to catch.' },
        { when: 'Lvl 6', text: 'His R sniper poke + roam pressure — don’t get picked stepping up.' },
        { when: '1st item', text: 'Catch him with W-pull and he dies — but he’s slippery.' },
        { when: 'Late', text: 'Tricky — he kites and roams; you only win when you land W.' }
      ],
      wants: {
        you: ['Hug minions through his Q (boomerang) + auto poke', 'Catch him with W-pull when his E swing is down', 'Deny his roams — track him and punish the wave'],
        foe: ['Poke with Q (Avengerang) + passive double-shot', 'Swing around terrain with E (Heroic Swing)', 'Roam and pick with R (Comeuppance sniper)']
      },
      early: "Akshan is a slippery ranged skirmisher — he pokes with Q (Avengerang, which returns) and autos, and his E (Heroic Swing) lets him swing off terrain to kite, dodge, and reposition around you. Levels 1-3 he out-ranges and out-mobilities you; hug your minions to limit the poke, don't chase his swing into open ground, and accept some chip. This is a tricky lane.",
      mid: "Your only path is catching him — when his E swing is on cooldown, land W-pull and your combo deletes his squishy frame. The problem is he rarely gives that window: the swing resets and kites you constantly. Bait the E, then commit. At 6 his R (Comeuppance) is long-range execute-poke and a roam threat, so don't get caught stepping up, and track him when he leaves lane.",
      late: "Tricky into late — Akshan kites with his swing and roams for picks with R, and you only win the exchange when you actually land W on him. Hug minions to deny free poke, close on his E cooldown, and punish his roams by taking the wave. If he swings freely he chips and escapes; your whole game is the one clean W-pull that catches him.",
      whys: [
        "Akshan pokes with Q + autos and swings around terrain. He out-ranges you — hug minions, take chip.",
        "His E (Heroic Swing) kites and repositions off terrain. Don't chase it into open ground.",
        "Brief window — if his swing is down, W-pull and punish. Otherwise he kites you.",
        "He resets the swing constantly. Bait the E, then commit your combo when it's down.",
        "His R is long-range execute-poke + a roam threat — don't get picked stepping up. Track him.",
        "Catch him with W-pull and he dies — but he's slippery. Close on his E cooldown.",
        "Tricky late — he kites and roams. You only win when you land W; deny his roams, hug minions."
      ]
    },
    {
      a: 'aatrox', b: 'maokai',
      win: ['Skill', 'Skill', 'Aatrox', 'Skill', 'Maokai', 'Maokai', 'Maokai'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Small window — all-in before his sustain + roots come online.' },
        { when: 'Lvl 6', text: 'Maokai’s window — his R (root wave) + sapling sustain flip it.' },
        { when: '1st item', text: 'He out-sustains and out-tanks you; you can’t crack him.' },
        { when: 'Late', text: 'Maokai scales to a CC tank that out-sustains your DPS.' }
      ],
      wants: {
        you: ['All-in early before his sustain + W root', 'Dodge his W (root) and the sapling (E) zone', 'Win early — you can’t out-tank a built Maokai'],
        foe: ['Poke + sustain with E (saplings) and passive heal', 'Root you with W (Twisted Advance)', 'Out-tank you and lock you down with R (root wave)']
      },
      early: "Maokai is tank-favoured into bruisers like you — his passive heals him off spells, his E (saplings) pokes and zones, and his W (Twisted Advance) roots you for a free trade. Levels 1-3 are your only real window: all-in before his sustain and roots make him unkillable. Dodge the W root and don't path through his sapling zone.",
      mid: "From 6 the lane tilts to him — his R (Nature's Grasp) is a long root wave that locks you for his combo, and his sapling + passive sustain out-heal your poke. You can't out-tank a Maokai who builds resistances and heals off every ability. Take trades only when his W is down, and never get rooted into a full combo.",
      late: "Maokai scales into a CC tank that out-sustains your DPS and locks you down — resistances your AD can't punch through, plus two roots. The lane drifts to his. Your only path is winning the early before his sustain and items come online; if it goes even, you simply can't kill him, so play for tempo elsewhere and let your team handle late Maokai.",
      whys: [
        "Maokai heals off spells and zones with saplings. Level 1 is even — don't feed his sustain.",
        "His W (Twisted Advance) roots you for a free trade. Dodge it; don't path through saplings.",
        "Your small window: all-in before his sustain + roots make him unkillable.",
        "He out-sustains your poke with saplings + passive. Trade only when his W is down.",
        "His R (root wave) locks you for his combo — his window. Don't get rooted into a full trade.",
        "He out-tanks and out-sustains you with resistances. You can't crack a built Maokai.",
        "Maokai scales to a CC tank that out-sustains your DPS. Win early or play for tempo elsewhere."
      ]
    }
  ];
  window.MC_MATCHUP_EXTRA = window.MC_MATCHUP_EXTRA || {};
  function applyContent() {
    var F = window.CHAMP_FULL; if (!F) return;
    CONTENT.forEach(function (c) {
      // per-matchup "What X wants" + power-spike windows (read by renderVals)
      if (c.wants || c.spikes) {
        window.MC_MATCHUP_EXTRA[c.a] = window.MC_MATCHUP_EXTRA[c.a] || {};
        window.MC_MATCHUP_EXTRA[c.a][c.b] = { wants: c.wants || null, spikes: c.spikes || null };
      }
      var e = F[c.a] && F[c.a][c.b]; if (!e) return;
      if (e.breakdown) { if (c.early) e.breakdown.early = c.early; if (c.mid) e.breakdown.mid = c.mid; if (c.late) e.breakdown.late = c.late; }
      if (e.phases) e.phases.forEach(function (p) {
        var i = stageIdx(p.label); if (i < 0) return;
        if (c.win && c.win[i]) p.side = c.win[i];   // keep windows locked to the whys
        if (c.whys && c.whys[i]) p.why = c.whys[i];
      });
      // Mirror the favour-timeline SIDE onto the reverse matchup so b-vs-a shows the
      // same windows (win[] uses absolute display names, so it reads correctly from
      // either page). Whys/breakdown stay a-perspective on the a-vs-b page only.
      var rev = F[c.b] && F[c.b][c.a];
      if (rev && rev.phases && c.win) rev.phases.forEach(function (p) {
        var i = stageIdx(p.label); if (i >= 0 && c.win[i]) p.side = c.win[i];
      });
    });
  }

  function stageIdx(label) {
    var l = String(label || '').toLowerCase();
    var i = STAGES.indexOf(l);
    if (i >= 0) return i;
    for (var k = 0; k < STAGES.length; k++) { if (l.slice(0, 7) === STAGES[k].slice(0, 7)) return k; }
    return -1;
  }
  function setWindows(entry, win) {
    if (!entry || !entry.phases || !win) return;
    entry.phases.forEach(function (p) { var i = stageIdx(p.label); if (i >= 0 && win[i]) p.side = win[i]; });
  }
  function patch(store, slug, enemy, diff, win) {
    if (!store || !store[slug] || !store[slug][enemy]) return;
    var e = store[slug][enemy];
    e.diff = diff;
    e.tone = TONE[diff] || e.tone;
    setWindows(e, win);
  }
  function apply() {
    var F = window.CHAMP_FULL, D = window.CHAMP_DATA;
    if (!F && !D) return;
    FIX.forEach(function (f) {
      [F, D].forEach(function (store) {
        patch(store, f.a, f.b, f.da, f.win);
        patch(store, f.b, f.a, f.db, f.win);
      });
    });
    applyContent();
  }
  apply();
  if (typeof setTimeout === 'function') {
    var t = 0, iv = setInterval(function () { apply(); if (++t >= 50) clearInterval(iv); }, 320);
  }
})();

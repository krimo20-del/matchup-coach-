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
      drmundo: 56.3, swain: 57.1, tahmkench: 58.2
    }
  };
  // hard-scalers who reclaim the 2+ item window even in an Aatrox-favoured lane
  var SCALER = { vladimir: 1, kassadin: 1, nasus: 1, chogath: 1, camille: 1, vayne: 1, kayle: 1, ryze: 1, gangplank: 1, kled: 1, cassiopeia: 1 };
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

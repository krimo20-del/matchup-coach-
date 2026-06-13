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
    // (renekton/darius removed — real lolalytics has Darius FAVOURED 53.2%, not Renekton; handled in CONTENT)
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
    },
    // ===== DARIUS (top) — real lolalytics win rates (Emerald+, patch 16.12) =====
    // Darius is the inverse of Aatrox: a hyper early-mid lane bully whose E-pull +
    // Hemorrhage bleed + R execute win almost every melee all-in levels 1-9. His
    // favoured lanes give HIM the early window; he loses to rangers who kite his E
    // (Quinn/Jayce/Teemo) and hard scalers who survive to out-item him. Windows are
    // set per-matchup in CONTENT (early-weighted), not by the Aatrox auto-pattern.
    darius: {
      garen: 53.2, renekton: 53.2, sett: 50.8, fiora: 49.7, teemo: 49.6, vayne: 52.6,
      mordekaiser: 53.6, nasus: 53.4, camille: 51.6, jax: 48.2, quinn: 45.7, aatrox: 51.0,
      irelia: 53.8, riven: 50.8, sion: 53.0, ornn: 50.4, malphite: 49.0, pantheon: 49.9,
      kled: 49.4, urgot: 48.2, olaf: 49.8, tryndamere: 49.1, illaoi: 51.9, vladimir: 47.9,
      shen: 53.0, swain: 52.2, trundle: 52.2, warwick: 51.6, volibear: 51.7, wukong: 48.0,
      yasuo: 54.1, yone: 51.9, yorick: 50.0, gnar: 50.8, gragas: 54.3, gangplank: 48.9,
      drmundo: 46.6, chogath: 53.1, tahmkench: 49.6, ksante: 50.6, poppy: 49.6, kayle: 48.8,
      kennen: 47.1, singed: 54.5, ryze: 51.3, rumble: 49.7, akali: 55.1, cassiopeia: 49.7,
      galio: 51.7, gwen: 50.6, jayce: 49.5, kassadin: 50.9, lucian: 52.3, maokai: 47.3,
      sylas: 50.8, graves: 54.3, heimerdinger: 48.6, sejuani: 50.3, zac: 54.0, ziggs: 49.1,
      akshan: 51.1, ambessa: 53.8, aurora: 51.2, karma: 53.1, lillia: 55.0, mel: 57.2,
      nautilus: 50.2, neeko: 52.5
    },
    // ===== GAREN (top) — real lolalytics win rates (Emerald+, patch 16.12) =====
    // Garen wins short Q-silence trades then disengages to regen (passive), and runs
    // squishies down with Q→E→R (Demacian Justice % true-damage execute). His W
    // (damage reduction + tenacity) blunts burst combos. He loses to true-damage
    // duelists who ignore his armour (Camille) and gets kited by mobile carries late.
    garen: {
      darius: 50.6, aatrox: 52.0, fiora: 48.8, teemo: 51.3, jax: 55.6, trundle: 52.6,
      renekton: 53.7, sett: 50.9, mordekaiser: 51.4, vayne: 52.0, camille: 46.7, nasus: 56.8,
      irelia: 57.2, riven: 57.8, sion: 52.3, ornn: 52.3, malphite: 51.9, pantheon: 53.2,
      kled: 53.1, urgot: 48.7, olaf: 54.8, tryndamere: 49.6, illaoi: 54.7, vladimir: 50.3,
      shen: 52.7, swain: 53.7, warwick: 53.1, volibear: 52.3, wukong: 50.8, yasuo: 54.8,
      yone: 54.4, yorick: 50.1, gnar: 49.9, gragas: 53.6, gangplank: 51.1, quinn: 50.7,
      drmundo: 55.3, chogath: 51.8, tahmkench: 53.2, ksante: 58.1, poppy: 52.7, kayle: 47.3,
      kennen: 52.7, singed: 54.5, ryze: 55.8, rumble: 57.6, akali: 55.8, cassiopeia: 51.1,
      galio: 52.7, gwen: 57.8, jayce: 52.1, kassadin: 50.9, lucian: 54.7, maokai: 51.8,
      sylas: 51.6, graves: 53.1, heimerdinger: 50.9, sejuani: 51.3, zac: 51.2, ziggs: 56.6,
      nautilus: 52.9, aurora: 55.7, ambessa: 53.7, akshan: 49.3, karma: 53.8, lillia: 51.3,
      mel: 61.2, neeko: 55.2
    }
  };
  // hard-scalers who reclaim the 2+ item window even in an Aatrox-favoured lane
  var SCALER = { vladimir: 1, kassadin: 1, nasus: 1, chogath: 1, camille: 1, vayne: 1, kayle: 1, ryze: 1, gangplank: 1, kled: 1, cassiopeia: 1, yorick: 1, akali: 1, gwen: 1, ksante: 1, yasuo: 1 };
  function diffFromWr(wr) { return wr >= 52.5 ? 'FAVOURED' : wr >= 48.5 ? 'EVEN' : wr >= 45.5 ? 'TRICKY' : 'HARD'; }
  function mirrorDiff(d) { return d === 'FAVOURED' ? 'TRICKY' : d === 'EVEN' ? 'EVEN' : 'FAVOURED'; }
  // REAL tracks which (champ|enemy) ordered pairs came from that champ's OWN
  // lolalytics page, so a later champ's mirror write never clobbers a real number
  // (e.g. aatrox/vs/darius = 51.8 and darius/vs/aatrox = 50.97 are independent
  // samples — each page keeps its own real value instead of forcing 100-x).
  var REAL = {};
  Object.keys(WR).forEach(function (champ) {
    var m = WR[champ];
    Object.keys(m).forEach(function (en) {
      var wr = m[en], da = diffFromWr(wr);
      window.MC_REAL_WR[champ] = window.MC_REAL_WR[champ] || {}; window.MC_REAL_WR[champ][en] = wr; REAL[champ + '|' + en] = 1;
      window.MC_REAL_WR[en] = window.MC_REAL_WR[en] || {};
      if (!REAL[en + '|' + champ]) window.MC_REAL_WR[en][champ] = Math.round((100 - wr) * 10) / 10;
      // Aatrox-specific early-skip auto-window (his "weakest early" pattern). Other
      // champs (Darius is an early bully) get diff-only here — their windows come
      // from the bespoke CONTENT entries below, which are early-weighted instead.
      var win = (champ === 'aatrox' && da === 'FAVOURED')
        ? ['Skill', 'Skill', disp(champ), disp(champ), disp(champ), disp(champ), SCALER[en] ? disp(en) : 'Skill']
        : null;
      // fwd: this verdict is forward-only — each champion's page shows its OWN
      // lolalytics number/verdict. The reverse page gets ITS verdict from the
      // opponent's own table (once that champ is processed), not a mirror guess,
      // since the two pages are independent samples that can straddle a boundary.
      FIX.push({ a: champ, b: en, da: da, db: mirrorDiff(da), win: win, fwd: true });
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
    },
    {
      a: 'darius', b: 'garen',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Garen'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E-pull into Q outer-edge + bleed out-trades his Q-silence.' },
        { when: 'Lvl 6', text: 'R executes him off bleed stacks — he can’t regen through Noxian Might.' },
        { when: '1st item', text: 'Your spike + bleed beats his short Q trade; force every all-in.' },
        { when: 'Late', text: 'He out-scales tanky + R — close the lane before he stacks resists.' }
      ],
      wants: {
        you: ['Land E (pull) to start the bleed all-in', 'Stack Hemorrhage and execute with R', 'Win before he builds tanky and out-regens you'],
        foe: ['Q-silence to cut your combo, then disengage to regen', 'Spin (E) + passive regen to negate your bleed chip', 'Out-scale tanky and R-execute you when low']
      },
      early: "You out-bully Garen early — land E (Apprehend) and your Q outer-edge + W bleed shred him before his passive regen matters. His Q silences you for a short burst trade, so don't let him kite the silence into a disengage-and-regen; stick to him with W's slow and keep the bleed stacking. Levels 1-3 are yours.",
      mid: "Keep him bleeding. At 5 stacks Noxian Might makes your Q apply full Hemorrhage and your damage spikes — he can't out-regen that. Your R executes him off the bleed, and a kill refreshes it. Don't chase him through his spin (E) into open ground where he regens; pin him with E and W and force the extended all-in he loses.",
      late: "Garen out-scales you if the game drags — he builds tanky, his passive regen ramps, and his R executes you when you're low. Your edge is the early-mid stomp, so press it: snowball off the bleed all-ins, take his tower, and end the lane before his resistances make your bleed tickle. Don't let a fed-elsewhere Garen flip the side lane.",
      whys: [
        "E-pull into Q outer-edge + bleed out-trades his Q-silence. Stick to him — level 1 is yours.",
        "Don't let him kite the silence into a regen reset. Keep W's slow on him and bleed.",
        "Your full combo + bleed beats his short trade. Force the all-in, deny the disengage.",
        "Keep him bleeding — Noxian Might at 5 stacks spikes your damage past his regen.",
        "R executes him off bleed stacks and resets on the kill. He can't regen through Might.",
        "Your spike beats his Q trade. Force every all-in; snowball before he builds tanky.",
        "He out-scales tanky + R-execute late. Close the lane early before his resists matter."
      ]
    },
    {
      a: 'darius', b: 'renekton',
      win: ['Darius', 'Renekton', 'Renekton', 'Renekton', 'Skill', 'Darius', 'Darius'],
      spikes: [
        { when: 'Lvl 1', text: 'Your window — bleed + W out-trade him before his Fury combo is online.' },
        { when: 'Lvl 2–4', text: 'Renekton’s window — empowered Q sustain + stun out-trade you. Give ground.' },
        { when: '1st item', text: 'Your bleed + Might flip it back — he falls off, you don’t.' },
        { when: '2+ items', text: 'You out-scale him — Renekton has no late; your all-in wins.' }
      ],
      wants: {
        you: ['Win the level 1 all-in before his Fury combo', 'Survive his level 2-5, then out-scale him', 'Land E + bleed and execute once he falls off'],
        foe: ['Bully levels 2-5 with empowered Q + W stun', 'Use double-E to dodge your pull and trade', 'Snowball the early before you out-scale']
      },
      early: "Level 1 is actually yours — your Hemorrhage bleed + Crippling Strike (W) out-trade Renekton before his Fury-empowered combo is online, so you can win the first all-in if he over-commits. But levels 2-5 flip to him: empowered Q heals and chunks, his W stuns, and double-E lets him dodge your pull. Concede that window — don't feed his snowball.",
      mid: "Survive his level 2-5 spike, then the lane swings back. Renekton is front-loaded and falls off; you are not. Once you hit your first item your bleed + Noxian Might out-trade his fury, and his early kill pressure dries up. Land E to pin him, stack Hemorrhage, and punish him for over-staying his power window.",
      late: "You out-scale him flatly. Renekton has essentially no late game while your bleed all-in + R execute only get stronger. The lane is favoured for you overall (you win level 1 and the back half) — you just have to weather his fury window in the middle. Don't die levels 2-5, then take over.",
      whys: [
        "Your bleed + W out-trade him at level 1, before his Fury combo. Punish an over-commit.",
        "Levels 2-4 are his — empowered Q + W stun out-trade you. Give ground, don't feed the snowball.",
        "His double-E dodges your pull and trades back. Survive this window; don't die to fury.",
        "Concede the mid-levels and farm — his power is front-loaded and about to expire.",
        "Around 6 it stabilizes — your bleed catches up as his fury edge fades.",
        "Your first item + Might flip it back. Land E, stack bleed, punish his fall-off.",
        "You out-scale him — he has no late. Your all-in + R execute win; he can't fight back."
      ]
    },
    {
      a: 'darius', b: 'sett',
      win: ['Darius', 'Darius', 'Skill', 'Skill', 'Sett', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — E-pull + bleed out-trade him before his grit + W.' },
        { when: 'Lvl 6', text: 'Sett’s window — full-grit W (true damage) + E stun answer your all-in.' },
        { when: '1st item', text: 'Even — bleed vs grit; whoever lands their CC (your E / his E) wins.' },
        { when: 'Late', text: 'Even juggernaut brawl — your bleed execute vs his true-damage burst.' }
      ],
      wants: {
        you: ['Land E (pull) and stack bleed before he banks grit', 'Trade when his W (Haymaker) grit is empty', 'Execute him with R off Hemorrhage stacks'],
        foe: ['Bank grit, then W (Haymaker) for a true-damage chunk', 'Land E (Facebreaker stun) into his combo', 'Pull you in with R and out-trade your bleed']
      },
      early: "You win the early — land E and your bleed + W out-trade Sett before he's banked grit for his W (Haymaker). Trade when his grit is empty; a fully-loaded Haymaker does true damage that hurts, so don't sit in a long fight feeding it. Levels 1-2 are yours; punish him before his W comes online.",
      mid: "Level 6 is his window — full grit W + E (Facebreaker) stun answer your all-in, and his R pulls you in for an even brawl. The lane is even here: it comes down to whose CC lands. If you land E and he has empty grit, you win; if he stuns you into a loaded Haymaker, he does. Bait his W before you commit your combo.",
      late: "Even juggernaut brawl — your bleed + R execute versus his grit-shield true-damage burst. Both of you want the extended all-in, so it hinges on CC timing and grit management. Force trades when his grit is low, stack Hemorrhage for the execute, and don't all-in into a full Haymaker. Slightly your favour early, his at 6.",
      whys: [
        "E-pull + bleed out-trade him before he banks grit. Level 1-2 are yours — punish early.",
        "Trade when his W grit is empty; a loaded Haymaker does true damage. Don't feed it.",
        "Even as his grit comes online — bait the W before you commit your combo.",
        "Keep bleed on him and force short trades, not long ones his grit wins.",
        "His window: full-grit W + E stun answer your all-in. Don't get stunned into a Haymaker.",
        "Even — whoever lands CC wins. Land E on empty grit and you take the trade.",
        "Even brawl late — your bleed execute vs his burst. Stack Hemorrhage, time your E."
      ]
    },
    {
      a: 'darius', b: 'fiora',
      win: ['Darius', 'Darius', 'Skill', 'Skill', 'Skill', 'Skill', 'Fiora'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — E-pull + bleed before she can parry-punish you.' },
        { when: 'Lvl 3+', text: 'Her W (Riposte) parries your E or Q — don’t telegraph your combo.' },
        { when: '1st item', text: 'Even — bait the parry, then all-in; she out-trades if she lands it.' },
        { when: '2+ items', text: 'Fiora takes over — vitals + true damage shred you in the long fight.' }
      ],
      wants: {
        you: ['Land E + bleed early before her parry mastery matters', 'Bait her W (Riposte) before committing Q/E', 'Win before her vital + item scaling'],
        foe: ['Parry (W) your E-pull or Q for the stun', 'Proc vitals to shred and heal through your bleed', 'Out-scale into a one-item-spike duelist']
      },
      early: "Levels 1-2 are yours — land E and stack bleed before Fiora has the tools or the parry timing to punish you. Her whole game is W (Riposte): it parries your E-pull or your Q and stuns you, flipping the trade. Early, she's less able to threaten the all-in, so press your bleed advantage before she gets going.",
      mid: "From level 3 it's a parry chess match — don't telegraph your E or Q, because a parried pull is a lost trade and a free vital. Bait the W out (feint, then commit), and your bleed all-in still wins if she wastes it. Force short, decisive trades on her parry cooldown; don't let her proc vitals and heal through your Hemorrhage in a drawn-out fight.",
      late: "Fiora out-scales you. Two items in, her vitals + true damage shred even a tanky Darius and her duelling overtakes your bleed. The lane is even overall — you bully the early, she takes the late. Snowball your level 1-2 edge, bait her parry through the mid-game, and close the lane before her item spike flips the side-lane 1v1.",
      whys: [
        "E-pull + bleed before she can parry-punish — levels 1-2 are yours. Press the early.",
        "Her W parries your E or Q for a stun. Don't telegraph; bait it before you commit.",
        "Parry chess — feint, then all-in. A parried pull is a lost trade and a free vital.",
        "Force short trades on her W cooldown; don't let her proc vitals and out-heal your bleed.",
        "Even — bait the Riposte, then commit. She out-trades only if she lands it.",
        "Your bleed all-in still wins a wasted parry. Force it before her items.",
        "Two items in she flips it — vitals + true damage shred you. She wins the late duel."
      ]
    },
    {
      a: 'darius', b: 'teemo',
      win: ['Teemo', 'Teemo', 'Skill', 'Darius', 'Skill', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Teemo’s window — his blind (Q) shuts off your W bleed autos.' },
        { when: 'Lvl 3–6', text: 'Your window — land E + Q and the all-in kills him through a blind.' },
        { when: '1st item', text: 'Even — he pokes + shrooms; you win when you catch him with E.' },
        { when: 'Late', text: 'He becomes a splitpush/shroom map problem — end lane early.' }
      ],
      wants: {
        you: ['Land E (pull) to catch him — he has no escape', 'All-in through the blind; your Q + bleed don’t need autos', 'Kill him before his shrooms + splitpush scale'],
        foe: ['Blind your W (Crippling Strike) and auto-bleed', 'Poke with Q + autos and stack shrooms', 'Survive and scale into splitpush + map control']
      },
      early: "Teemo's blind (Q) is the early problem — it shuts off your autos and W (Crippling Strike), which is how you apply bleed. Levels 1-2 he pokes you and blinds your trades; don't walk up to auto into a blind. The good news: he's short-range and escape-less, and your Q + bleed don't fully rely on autos, so you're never far from a kill window.",
      mid: "This is your takeover. Land E (Apprehend) and he has no way out — your Q outer-edge + bleed kill him even through a blind, since the blind only stops autos, not your spin or your pull. Bait the blind, then E-Q-W and stack Hemorrhage. Once you catch him with E, a squishy escape-less Teemo dies; his poke can't out-damage your all-in.",
      late: "Teemo stops being a laner and becomes a map problem — shrooms on objectives, splitpush, vision. You win every straight 1v1 if you catch him, so close the lane early before his scaling utility matters. Don't facecheck shroom-walled brush near objectives, and don't chase him through a minefield; make him fight you in lane where your E ends it.",
      whys: [
        "Teemo's blind (Q) shuts off your W bleed autos. Don't auto into a blind — levels 1-2 are his.",
        "He pokes you while your autos are blinded. Farm, wait for your E window.",
        "Your window opens — land E and his short range can't escape. All-in.",
        "Q outer-edge + bleed kill him through a blind (it only stops autos). Catch him with E and commit.",
        "Bait the blind, then E-Q-W. A squishy escape-less Teemo dies to your all-in.",
        "Even — he pokes and shrooms, you win when you land E. Force the catch.",
        "He becomes a splitpush/shroom map problem. End lane early; don't facecheck his brush."
      ]
    },
    {
      a: 'darius', b: 'vayne',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Vayne'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — land E and a squishy Vayne dies to bleed + Q.' },
        { when: 'Lvl 6', text: 'R executes her off bleed stacks — she can’t survive your all-in.' },
        { when: '1st item', text: 'Still your stomp — deny CS so she never scales.' },
        { when: '2+ items', text: 'Do-or-die: at 2+ items Vayne out-scales the entire map.' }
      ],
      wants: {
        you: ['Land E (pull) — she has no escape but Condemn', 'Deny CS relentlessly to starve her scaling', 'Kill her before crit items or she becomes unbeatable'],
        foe: ['Kite with tumble (Q) + autos, stay off walls', 'Condemn (E) you on a wall to peel the all-in', 'Survive lane and scale into a %-HP hypercarry']
      },
      early: "You crush Vayne early — she's short-range, squishy, and her only peel is Condemn (E), which needs a wall behind you. Land your E (Apprehend) and she's dead: Q outer-edge + bleed shred her tiny health bar, and her tumble can't out-trade a pull. Stand away from walls so she can't stun you, deny her CS relentlessly, and punish every step she takes toward a minion.",
      mid: "Hard-stomp window. With Noxian Might your Q applies full bleed and your R executes her off stacks — a single all-in ends her. Her tumble + Condemn buy a few seconds but can't escape your E. Keep her starved of farm: her entire game is scaling, so every denied minion delays the carry she becomes. Dive her with any jungle help.",
      late: "Do-or-die. If Vayne survived to two crit items she out-scales the entire map — her %-HP true damage shreds even a tanky Darius. You had to kill her early and end the game; if she's farmed, the late game is hers, full stop. Press your massive early lead into objectives and towers before her power curve arrives.",
      whys: [
        "Land E and a squishy Vayne dies to bleed + Q. Stand off walls so she can't Condemn-stun you.",
        "Her tumble can't out-trade your pull. Deny CS — starve her scaling.",
        "Your full combo deletes her. Catch her with E and she has no answer but Condemn.",
        "Hard-stomp — every all-in on her tumble cooldown is a kill. Keep her broke.",
        "R executes her off bleed stacks. She can't survive your all-in — dive with jungle.",
        "Still your stomp at one item. Deny CS, take her tower, end the game.",
        "Do-or-die: at 2+ items she out-scales everyone. You needed her dead — close the game early."
      ]
    },
    {
      a: 'darius', b: 'mordekaiser',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Mordekaiser', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–4', text: 'Your window — E-pull + bleed out-trade his short-range Q.' },
        { when: 'Lvl 6', text: 'Morde’s window — his R (Realm) isolates you; don’t int the 1v1.' },
        { when: '1st item', text: 'Outside his R, your bleed all-in beats his first AP item.' },
        { when: 'Late', text: 'You edge it — out-bleed his magic DPS when his R is down.' }
      ],
      wants: {
        you: ['Land E + bleed before his passive shield stacks', 'Respect his R (Death Realm) at 6 — fight when it’s down', 'Stack Hemorrhage and execute outside the Realm'],
        foe: ['Pull you in with E into his Q for the trade', 'Isolate you with R (Realm) and win the 1v1', 'Stack passive shield + AP to out-sustain your bleed']
      },
      early: "You out-trade Morde early — land E and your bleed + Q outer-edge beat his short-range Q before his passive shield (Indestructible) stacks up. Don't let him pull you (E) into his Q while you're already bleeding for him, but in a straight trade levels 1-4 are yours. Keep Hemorrhage stacking and don't let him free-farm his shield passive.",
      mid: "Level 6 is HIS window: Realm of Death (R) drags you into an isolated 1v1, steals your stats, and his sustained magic damage is strong inside it. Don't int the Realm at low HP — play around its cooldown. Once R is down, you're back in control: your bleed all-in and R execute out-trade him, and his first AP item doesn't save him.",
      late: "You edge the matchup — outside his R window your bleed + execute out-grind his magic DPS. Respect the level-6 (and later) Realm timings: don't get caught low when R is up. Otherwise force the all-ins, stack Hemorrhage, and execute him before his AP scaling stabilizes. The lane is yours if you play around the one button that beats you.",
      whys: [
        "E-pull + bleed out-trade his short-range Q before his shield stacks. Level 1-4 are yours.",
        "Don't let him E-pull you into Q while you're bleeding for him. Trade on your terms.",
        "Your Q outer-edge + bleed beat his trade. Keep Hemorrhage stacking.",
        "Keep him off his passive-shield farm. Force the bleed all-in through level 4-5.",
        "His R isolates you and steals your stats — his window. Don't int the Realm at low HP.",
        "Outside R, your bleed all-in beats his first AP item. Execute him when Realm is down.",
        "You edge it late — out-bleed his magic DPS off-Realm. Respect the R, win everything else."
      ]
    },
    {
      a: 'darius', b: 'nasus',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Nasus'],
      spikes: [
        { when: 'Lvl 1–5', text: 'Your window — bully him off Q stacks; E + bleed crush a weak Nasus.' },
        { when: 'Lvl 6', text: 'R executes him; his W (Wither) only slows your chase, not the kill.' },
        { when: '1st item', text: 'Still your stomp — deny stacks so his scaling never arrives.' },
        { when: '2+ items', text: 'Nasus takes over — stacked Q + tanky body out-grind your bleed.' }
      ],
      wants: {
        you: ['Zone him off Q stacks relentlessly', 'Land E + bleed and all-in his weak early', 'Snowball before his stacks + items come online'],
        foe: ['Stack Q on every last-hit, even under tower', 'Cripple your all-in with W (Wither)', 'Out-scale into a stacked, tanky late-game monster']
      },
      early: "You hard-bully Nasus — he's one of the weakest early laners and you're one of the strongest. Land E (Apprehend) and your bleed + Q outer-edge crush him, and every trade zones him off Q stacks. His W (Wither) cripples your movement and attack speed, so bait it before you commit; otherwise farm-denial is the whole game. Starve his stacks from minute one.",
      mid: "Keep stomping. Your all-in out-trades a low-stack Nasus flatly, and at 6 your R executes him off bleed — his R (tanky + lifesteal) helps him survive but doesn't win the 1v1. Bait the Wither, then E-Q-W and stack Hemorrhage. Every Q stack you deny and every plate you take delays the monster he becomes.",
      late: "Nasus takes over at two items — a stacked Q on a tanky body out-grinds your bleed and his Wither shuts off your all-in. The lane is favoured because you crush the entire early game and he crushes the very late. You MUST snowball this into a lead big enough to end before his stacks matter; a farmed Nasus out-scales you.",
      whys: [
        "Nasus is weak early and you're a bully. Land E + bleed and crush him; zone his Q stacks.",
        "His W (Wither) cripples your all-in. Bait it, then commit and deny his farm.",
        "Your combo out-trades a low-stack Nasus flatly. Force trades, deny stacks.",
        "Keep him off Q — every denied stack delays his scaling. Take plates and snowball.",
        "R executes him off bleed; his R only helps him survive, not win. Bait Wither, all-in.",
        "Still your stomp at one item. Starve his farm so his scaling never arrives.",
        "Two items in, stacked Q + tanky body out-grind your bleed. End the game before that."
      ]
    },
    {
      a: 'darius', b: 'camille',
      win: ['Darius', 'Darius', 'Skill', 'Skill', 'Skill', 'Camille', 'Camille'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — E-pull + bleed out-trade her before her E-Q spike.' },
        { when: 'Lvl 3–6', text: 'Even — her E-Q true damage + shield trade back; bait her E escape.' },
        { when: '1st item', text: 'Camille’s spike — her item power + R isolation start to win.' },
        { when: '2+ items', text: 'Camille takes over — R + true damage shred you in a pick.' }
      ],
      wants: {
        you: ['Land E + bleed early before her E-Q combo spikes', 'Bait her E (hookshot escape) before you all-in', 'Win the lane before her item + R scaling'],
        foe: ['Out-trade with E-Q (hookshot) true damage + shield', 'Reset trades with the E escape, then poke again', 'Isolate and 1v1 you with R in the side lane late']
      },
      early: "Levels 1-2 are yours — land E and your bleed + Q out-trade Camille before her E-Q (hookshot) combo and shield come fully online. Stand away from terrain so her E can't stun you, and punish her early with the pull she can't answer yet. Get Hemorrhage stacking before she has the tools to reset trades.",
      mid: "From 3 it evens out — her E-Q does true damage and shields her, and she resets trades by hookshotting away to poke again. Bait her E (the escape) before you all-in; without it she can't get out of your pull + bleed. Force the extended fight where your sustain through bleed beats her burst-then-wait, and don't chase a reset into her item spikes.",
      late: "Camille takes over from her first item — her power spikes hard, and at two items her R isolation + true damage shred you in a pick. The lane is even overall: you bully the early, she wins the mid-to-late. Snowball your level 1-2 edge, bait her E to land your all-ins, and close the lane before her scaling makes the side-lane 1v1 hers.",
      whys: [
        "E-pull + bleed out-trade her before her E-Q spike. Levels 1-2 are yours — punish early.",
        "Stand off terrain so her E can't stun you. Get bleed stacking before she has her tools.",
        "Even from 3 — her E-Q true damage + shield trade back. Bait her E escape first.",
        "Force the extended fight where bleed beats her burst. Don't chase her reset.",
        "Her item spike starts to win — bait the E, then all-in before she's fully online.",
        "Camille's first item flips it — her power + R isolation start to take over.",
        "Two items in, R + true damage shred you in a pick. You win early; she wins late."
      ]
    },
    {
      a: 'darius', b: 'jax',
      win: ['Darius', 'Skill', 'Skill', 'Jax', 'Jax', 'Jax', 'Jax'],
      spikes: [
        { when: 'Lvl 1', text: 'Your only clean window — E + bleed before his E (Counterstrike).' },
        { when: 'Lvl 3+', text: 'Jax’s window — his E dodges your Q/W and stuns; don’t all-in into it.' },
        { when: '1st item', text: 'He out-trades on his E cooldown — bait Counterstrike, then commit.' },
        { when: '2+ items', text: 'Jax takes over — his item scaling out-duels your bleed.' }
      ],
      wants: {
        you: ['All-in level 1 before his E (Counterstrike) is online', 'Bait his E, then E-pull + bleed on its cooldown', 'Win before his item spikes out-scale you'],
        foe: ['Dodge your combo with E (Counterstrike) and stun back', 'Stall the lane and scale to his item spikes', 'Out-duel you late with Grandmaster’s + Jax items']
      },
      early: "Your one clean window is level 1, before Jax has E (Counterstrike) — land your bleed + W and you out-trade him. From level 2-3 on, his E is the whole matchup: it dodges your Q and W autos and stuns you if you trade into it, blunting your bleed all-in. Don't commit your combo while Counterstrike is up.",
      mid: "This is a tricky lane because his E negates your strength. Bait it out — make him pop Counterstrike, then E-pull and stack bleed on its cooldown. If you all-in into a held E, you eat a stun and lose the trade. Be patient, punish his E downtime, and don't let him scale freely; your damage is on a clock against his.",
      late: "Jax out-scales you hard — two items in, his Grandmaster's passive + item spikes out-duel your bleed and he wins the extended 1v1. The lane is tricky and tips toward him over time. Your only path is to punish his E cooldowns early and snowball a lead before he comes online; if it goes even into late, the duel is his.",
      whys: [
        "Level 1 — all-in with bleed + W before his E is online. Your one clean window.",
        "From 2 his E dodges your Q/W and stuns. Don't trade into a held Counterstrike.",
        "Bait the E, then E-pull + bleed on its cooldown. Punish his downtime.",
        "His window — he out-trades when E is up. Be patient, force his Counterstrike first.",
        "Don't all-in into a fresh E or you eat the stun. Trade only when it's down.",
        "He out-trades on his E cooldown. Bait it, commit bleed, deny his scaling.",
        "Two items in his item scaling out-duels your bleed. Snowball early or lose late."
      ]
    },
    {
      a: 'darius', b: 'quinn',
      win: ['Quinn', 'Quinn', 'Skill', 'Quinn', 'Quinn', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Quinn’s window — autos + Q (blind) poke and kite your bleed off.' },
        { when: 'Lvl 6', text: 'She roams (R) — punish the wave, but don’t get picked stepping up.' },
        { when: '1st item', text: 'Your only kills come from landing E — she’s squishy if you catch her.' },
        { when: 'Late', text: 'Tricky — she pokes and roams; you win only when you land E.' }
      ],
      wants: {
        you: ['Land E (pull) — a caught Quinn dies to bleed', 'Hug minions through her Q (blind) + auto poke', 'Punish her roams; deny CS when you can'],
        foe: ['Poke with autos + Q (Blinding Assault) and kite', 'Vault (E) over you to reset and dodge your pull', 'Roam with R (Behind Enemy Lines) for picks']
      },
      early: "Quinn is a hard lane for you — she's ranged, pokes with autos + Q (which blinds your bleed autos), and her E (Vault) hops over you to dodge your pull and reset. Levels 1-2 she out-ranges and kites you; hug your minions to limit the poke, don't walk up into a blind, and accept some chip. You can't bleed what you can't touch.",
      mid: "Your only kills come from landing E — a caught Quinn is squishy and dies to your bleed all-in, but she rarely gives you the window (Vault + blind keep her safe). Bait the E (Vault), then pull on its cooldown. At 6 her R is a roam tool; when she leaves to make a play, punish her wave for CS and plates rather than chasing.",
      late: "Tricky into late — Quinn pokes and roams for picks, and you only win the exchange when you actually land E on her. Hug minions to deny free poke, close on her Vault cooldown, and punish her roams on the map. If she kites freely she chips you down; your entire game is the one clean E-pull that lets your bleed finish her.",
      whys: [
        "Quinn out-ranges you and her Q blinds your bleed autos. Hug minions — levels 1-2 are hers.",
        "Her E (Vault) hops over you to dodge the pull and reset. Don't step into open ground.",
        "Brief window — if her Vault is down, land E and a squishy Quinn dies to bleed.",
        "She kites your bleed off with poke + mobility. Bait the Vault before you commit.",
        "Her R roams for picks — punish the wave when she leaves; don't get caught stepping up.",
        "Your kills come from landing E. Close on her Vault cooldown; otherwise she kites.",
        "Tricky late — she pokes and roams. You win only when you land E; deny her roams."
      ]
    },
    {
      a: 'darius', b: 'aatrox',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Aatrox', 'Aatrox'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E-pull + bleed crush Aatrox’s weak early.' },
        { when: 'Lvl 6', text: 'Both ult — R executes him off bleed before his healing stabilizes.' },
        { when: '1st item', text: 'Aatrox flips it — his Eclipse sustain out-heals your bleed.' },
        { when: '2+ items', text: 'Aatrox takes over — drain-tank sustain out-grinds your all-in.' }
      ],
      wants: {
        you: ['Bully his weak early — land E + bleed levels 1-3', 'Execute him with R before his sustain comes online', 'Win the lane before his Eclipse spike flips it'],
        foe: ['Survive your early all-in, then out-sustain you', 'Space the Q sweetspot to out-trade your bleed', 'Out-scale into a drain-tank that out-heals Hemorrhage']
      },
      early: "You bully Aatrox's early — he's one of the weakest level 1-3 juggernauts and you're one of the strongest. Land E (Apprehend) and your bleed + Q out-trade him before his combo and sustain come online. Don't get caught spacing into his Q sweetspot, but in a straight all-in levels 1-3 are decisively yours. Stack Hemorrhage and force the issue early.",
      mid: "Around 6 it's a knife's edge — both ult, and your R can execute him off bleed stacks before his healing stabilizes the fight. This is your last big window: if you've kept him low and bleeding, the execute closes it. Once he hits his first item (Eclipse), his sustain starts out-healing your bleed and the lane flips, so press hard now.",
      late: "Aatrox out-scales you — his drain-tank sustain out-heals your Hemorrhage in the extended fight, and two items in he out-grinds your all-in. The lane is even overall: you own the early, he owns the late. You have to convert your level 1-3 dominance into a lead and end before his Eclipse spike; if it goes even, his healing takes over.",
      whys: [
        "E-pull + bleed crush Aatrox's weak early — levels 1-3 are decisively yours. Force the all-in.",
        "He can't out-trade your bleed yet. Stack Hemorrhage and bully him off the wave.",
        "Your full combo out-trades a weak-early Aatrox. Keep him low and bleeding.",
        "Keep the pressure — every bleed stack sets up your level-6 execute window.",
        "Both ult — R executes him off bleed before his healing stabilizes. Your last big window.",
        "His Eclipse spike flips it — his sustain out-heals your bleed. You needed the lead by now.",
        "Two items in, his drain-tank out-grinds your all-in. You own early; he owns late — end it first."
      ]
    },
    {
      a: 'darius', b: 'irelia',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Irelia'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed crush her before she stacks her passive.' },
        { when: 'Lvl 6', text: 'R executes her off bleed; her W blunts burst but not Hemorrhage.' },
        { when: '1st item', text: 'Still your stomp — deny her minion resets and stacks.' },
        { when: '2+ items', text: 'Irelia takes over — stacked Q resets + true damage out-grind you.' }
      ],
      wants: {
        you: ['Land E + bleed before she stacks her passive', 'Deny her minion Q-resets and CS', 'Execute her before her item + stack scaling'],
        foe: ['Stack passive on minions, then out-trade you', 'Blunt your burst with W (Defiant Dance)', 'Q-reset around your pull and scale to items']
      },
      early: "You crush Irelia early — she's weak before she stacks her passive, and your E-pull + bleed beat her unstacked. Her W (Defiant Dance) reduces your burst and stuns if you trade into the channel, so don't dump your combo into a raised W; otherwise levels 1-3 are decisively yours. Deny her the minion Q-resets that let her stack and farm safely.",
      mid: "Keep her starved. Your bleed all-in out-trades a low-stack Irelia, and your R executes her off Hemorrhage even though her W blunts upfront burst. Bait the W, then E-Q-W and stack bleed. The longer you keep her off CS and stacks, the longer you delay the carry she becomes — dive her with jungle help if she's already behind.",
      late: "Irelia takes over at two items — stacked, her Q resets and on-hit true damage out-grind your bleed and she dances out of your pull. The lane is favoured because you dominate the early; you must convert it. Snowball off the level 1-5 stomp, deny her farm, and end before her item + stack spike flips the side-lane duel.",
      whys: [
        "E + bleed crush an unstacked Irelia. Levels 1-3 are yours — deny her passive stacks.",
        "Don't trade into her W (Defiant Dance) — it blunts burst and stuns. Bait it first.",
        "Your full combo out-trades a low-stack Irelia. Deny her minion Q-resets.",
        "Keep her off CS and stacks — every denied minion delays her carry spike.",
        "R executes her off bleed; her W stops burst, not Hemorrhage. Bait W, then all-in.",
        "Still your stomp at one item. Snowball the lead, take her tower.",
        "Two items in, stacked resets + true damage out-grind your bleed. End it before that."
      ]
    },
    {
      a: 'darius', b: 'riven',
      win: ['Darius', 'Darius', 'Skill', 'Skill', 'Skill', 'Riven', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — E + bleed out-trade her before her combo spikes.' },
        { when: 'Lvl 3–6', text: 'Even — she dashes around your E; land the pull and she’s locked.' },
        { when: '1st item', text: 'Riven’s spike — her item power + mobility trade back.' },
        { when: 'Late', text: 'Even — your bleed all-in vs her combo; whoever lands their key skill.' }
      ],
      wants: {
        you: ['Land E (pull) to cancel her mobility and lock her in', 'Win the early before her combo + item spike', 'Stack bleed and execute once she’s pinned'],
        foe: ['Dodge your E with Q dashes + E shield', 'Burst you in a short trade, then disengage', 'Animation-cancel combos to out-tempo your bleed']
      },
      early: "Levels 1-2 are yours — land E (Apprehend) and your bleed + W out-trade Riven before her combo comes fully online. Her three Q dashes and E shield let her dodge your pull and dance around your combo, so the whole matchup is landing E: pinned in your bleed, she loses; dancing free, she pokes and resets. Punish her early before she has the tools.",
      mid: "From 3 it evens — she out-mobilities you, so don't whiff E on a dashing Riven. Bait her dashes (she's committed after Q3 + E), then pull and stack bleed; she can't out-trade your Hemorrhage once locked. Force the extended fight where her burst-then-wait loses to your sustained bleed, not the short trade she wants.",
      late: "Even into late — your bleed all-in versus her combo, decided by who lands their key skill (your E vs her dodge-and-burst). She spikes on items and tempo; you spike on landing the pull. Force fights after she dumps her dashes, when she's stuck and your E lands clean. Don't chase her resets into open ground where she kites your bleed off.",
      whys: [
        "E + bleed out-trade her before her combo spikes. Levels 1-2 are yours — punish early.",
        "Her Q dashes + E shield dodge your pull. Don't whiff E on a dancing Riven.",
        "Even from 3 — bait her dashes, then land E and she's locked in your bleed.",
        "Force the long fight where bleed beats her burst. Don't trade the short one she wants.",
        "Punish her after she commits Q3 + E — that's when your pull lands clean.",
        "Her item spike trades back — land E to lock her, or she kites your bleed off.",
        "Even late — whoever lands their key skill wins. Force fights when her dashes are down."
      ]
    },
    {
      a: 'darius', b: 'sion',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed out-trade him; dodge his Q (charged knockup).' },
        { when: 'Lvl 6', text: 'R executes him; his R is map engage, not a duel button.' },
        { when: '1st item', text: 'Still your stomp — bleed beats a low-damage Sion.' },
        { when: 'Late', text: 'Sion becomes a teamfight tank; you won the lane 1v1.' }
      ],
      wants: {
        you: ['Dodge his Q (charged knockup), then E + bleed', 'Out-trade his weak early before he stacks tanky', 'Snowball — he just wants to farm and scale'],
        foe: ['Land the charged Q knockup for a trade', 'Farm safely (even dead, via passive) and scale', 'Become a teamfight engage tank with R']
      },
      early: "You out-bully Sion's weak early — his only real threat is the charged Q (a telegraphed knockup you can sidestep). Don't stand still while he winds it up; dodge it, land E, and your bleed + Q shred him. Without the Q he has no answer to your all-in, and his passive means he just wants to farm and scale, not fight you. Levels 1-3 are yours.",
      mid: "Keep stomping. Your bleed out-trades him in every extended fight, and your R executes him off stacks. His W shield + E poke don't out-trade your Hemorrhage, and his R is a long-range engage for the map, not a 1v1 button — don't panic when he ults; just don't get knocked into his team. Deny CS and snowball off the bleed all-ins.",
      late: "Sion becomes a teamfight tank and engage threat, but in lane the 1v1 was never his — you out-trade him all game. Your bleed beats his low-damage frame and your execute punishes any over-extension. Snowball the early, take his tower, and end before his tankiness matters; the game becomes about his R engage, not the duel you own.",
      whys: [
        "Sion's charged Q is his only burst — dodge it, then E + bleed shred his weak early.",
        "Without the Q he can't trade. Land your pull and stack Hemorrhage.",
        "Your full combo out-trades him hard. Force the all-in, deny his farm.",
        "His W shield + E poke don't beat your bleed. Keep punishing through 4-5.",
        "R executes him off stacks. His R is map engage, not a duel — don't get knocked into his team.",
        "Still your stomp — bleed beats a low-damage Sion. Snowball, take tower.",
        "Late he's a teamfight tank; you won the lane. End before his tankiness matters."
      ]
    },
    {
      a: 'darius', b: 'ornn',
      win: ['Darius', 'Darius', 'Darius', 'Skill', 'Ornn', 'Skill', 'Ornn'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed out-trade him before his brittle combo.' },
        { when: 'Lvl 6', text: 'Ornn’s window — brittle (W) + R detonation answer your all-in.' },
        { when: '1st item', text: 'He out-sustains and out-tanks you; his upgrades come free.' },
        { when: 'Late', text: 'Ornn scales to an unkillable tank — close the lane early.' }
      ],
      wants: {
        you: ['Land E + bleed before his brittle combo is online', 'Dodge his Q (pillar) so he can’t brittle-detonate', 'Win early — you can’t out-bleed a built Ornn'],
        foe: ['Brittle you with W, then detonate for bonus + slow', 'Poke with Q and out-sustain your bleed', 'Scale to an unkillable tank with free item upgrades']
      },
      early: "Levels 1-3 are yours — land E and your bleed + Q out-trade Ornn before his brittle (W) combo comes online. His Q pillar pokes and his W makes you take bonus damage he can detonate with CC, so dodge the Q so he can't set up the brittle. Press your early bleed advantage before his sustain and tankiness arrive.",
      mid: "From 6 the lane tilts to him — his R detonates brittle for a big swing and he out-sustains your bleed while building tanky. You can't out-grind an Ornn who upgrades his items for free. Take trades only when his W is down, land E to keep him in your bleed, and don't walk into a Q-pillar that sets up the brittle detonation.",
      late: "Ornn scales into an unkillable teamfight tank — free item upgrades, two engage tools, and resistances that make your bleed tickle. The lane is even because you bully the early and he out-tanks the late. Your only path is the early stomp: snowball levels 1-3, take plates, and end before his brittle + items flip the matchup. A built Ornn doesn't die to bleed.",
      whys: [
        "E + bleed out-trade him before his brittle combo. Levels 1-3 are yours — dodge his Q pillar.",
        "Don't let him land Q to set up the brittle. Press your early bleed advantage.",
        "Your full combo out-trades a pre-brittle Ornn. Force the all-in, take plates.",
        "He starts to out-sustain — trade only when his W is down. Keep E on him.",
        "His R detonates brittle for a big swing — his window. Don't all-in into it.",
        "He out-tanks your bleed with free upgrades. You can't crack a built Ornn.",
        "Ornn scales to an unkillable tank. Win the early stomp or end the game before late."
      ]
    },
    {
      a: 'darius', b: 'malphite',
      win: ['Darius', 'Darius', 'Skill', 'Skill', 'Skill', 'Malphite', 'Malphite'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — E + bleed before his armour + shield come online.' },
        { when: 'Lvl 3–5', text: 'All-in when his passive shield is popped and armour is low.' },
        { when: '1st item', text: 'His armour stacking starves your AD bleed — you can’t crack him.' },
        { when: 'Late', text: 'Malphite scales to a teamfight R; lane goes even-to-his.' }
      ],
      wants: {
        you: ['Land E + bleed before he stacks armour', 'All-in when his passive shield is down', 'Snowball early — you can’t out-bleed a built Malphite'],
        foe: ['Poke with Q (slow) and farm behind the shield', 'Stack armour to neutralise your AD bleed', 'Scale to a teamfight R (Unstoppable Force)']
      },
      early: "Levels 1-2 are your window — land E and your bleed + Q out-trade Malphite before his armour and passive shield are online. His W armour directly cuts your AD (and your bleed scales off AD), so the longer the lane goes the less you hurt him. Punish him early, catch him with E when his shield is popped, and don't let him free-farm into armour.",
      mid: "You get a small window levels 3-5 when his shield is down and his armour is still low — land E and all-in then. Once he stacks armour items, your bleed falls off and you physically can't crack him; don't waste resources chipping a tank who out-sustains it. Catch him without the shield or accept the lane stalls out.",
      late: "Malphite scales into a teamfight monster — his R (Unstoppable Force) is a game-swinging engage and his armour neutralises your whole AD-bleed profile. The lane drifts from even to his. Snowball hard off your early E-windows or accept you won't kill a built Malphite, and play for tempo elsewhere — roam, take plates, help other lanes.",
      whys: [
        "E + bleed out-trade him before his armour + shield. Levels 1-2 are your window.",
        "His W armour cuts your AD bleed. Punish early, catch him when his shield pops.",
        "All-in when his passive shield is down and armour is still low. Land E.",
        "He starts stacking armour — your bleed drops. Trade only on a popped shield.",
        "His armour items neutralise your AD. You can't crack a built Malphite — don't waste resources.",
        "Even-to-his now. Snowball your early windows or play elsewhere.",
        "He scales to a teamfight R. The lane goes from even to his — win early or roam."
      ]
    },
    {
      a: 'darius', b: 'pantheon',
      win: ['Pantheon', 'Pantheon', 'Skill', 'Darius', 'Skill', 'Darius', 'Darius'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Pantheon’s window — Q poke + W stun + E block answer your early.' },
        { when: 'Lvl 4–6', text: 'Your window — once you land E, bleed out-trades a falling-off Pantheon.' },
        { when: '1st item', text: 'You out-scale him — bleed + Might beat his front-loaded kit.' },
        { when: 'Late', text: 'You take over — Pantheon has no late; your all-in wins.' }
      ],
      wants: {
        you: ['Survive his early poke + stun, then out-scale', 'Land E from his blind side (his E only blocks one direction)', 'Out-bleed a falling-off Pantheon mid-game'],
        foe: ['Bully your early with Q (spear) + W (stun)', 'Block your autos/Q with E (Aegis) from one side', 'Snowball before you out-scale him']
      },
      early: "Pantheon contests your early — his Q spear pokes, his W is a point-click stun, and his E (Aegis) blocks attacks from one direction, which can negate your autos and Q. Levels 1-2 are his; don't walk into the W-stun-into-burst. Take the poke, and remember his E only blocks one way — angle your E-pull and combo so his block faces the wrong direction.",
      mid: "Levels 4-6 swing to you. Pantheon is front-loaded and starts falling off, while your bleed only grows. Once you land E (Apprehend) and stack Hemorrhage, his early burst can't out-trade your sustained all-in. Be wary of his R roam if he can't kill you, but in a straight fight the lane is now tilting your way.",
      late: "You take over — Pantheon has essentially no late game while your bleed + Might + R execute keep scaling. The lane is even overall because he bullies the early and you own the rest. Survive his level 1-2 window, land your E from his blind side, and grind him out; by your item spikes he can't fight you at all.",
      whys: [
        "Pantheon's Q + W stun bully your early. His E blocks one direction — levels 1-2 are his.",
        "Don't walk into the point-click W stun into burst. Take the poke and survive.",
        "Even as he starts to fall off — angle your E so his E-block faces the wrong way.",
        "Your window: land E and bleed out-trades a falling-off Pantheon.",
        "Once you stack Hemorrhage his burst can't out-trade you. Watch his R roam.",
        "You out-scale him — bleed + Might beat his front-loaded kit. Force the all-in.",
        "You take over — he has no late. Survive the early, then the lane is yours."
      ]
    },
    {
      a: 'darius', b: 'kled',
      win: ['Kled', 'Skill', 'Darius', 'Darius', 'Skill', 'Darius', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Kled’s window — mounted aggression + grab (Q) contest your early.' },
        { when: 'Lvl 3–6', text: 'Your window — dismount him, then E + bleed crush dismounted Kled.' },
        { when: '1st item', text: 'Even — bleed vs courage; whoever commits the all-in first.' },
        { when: 'Late', text: 'You out-scale — Kled falls off; your bleed all-in takes over.' }
      ],
      wants: {
        you: ['Trade to dismount him, then E + bleed punish', 'Survive his mounted level 1-2 aggression', 'Out-scale his falloff with bleed + Might'],
        foe: ['Bully your early while mounted with Q grab + W', 'Use E (dash) to engage and escape your pull', 'Snowball before you out-scale and out-bleed him']
      },
      early: "Both of you want to fight early, but mounted Kled's level 1-2 is genuinely scary — his Q (Beartrap) grabs you and his W stacks courage for burst. Don't feed the grab; take the early trades carefully. Your bleed and his courage race each other, so don't over-commit into a fully-stacked mounted Kled. Survive his peak aggression window.",
      mid: "Your window opens when you dismount him. Trade enough to strip Skaarl, and a dismounted Kled is weak and slow — land E and your bleed crushes him before he restores courage and remounts. From 3-6 your sustained all-in beats his now-weaker form; don't let him reset and remount for free. Stack Hemorrhage and punish the dismount.",
      late: "You out-scale him — Kled is a front-loaded bully who falls off, while your bleed + Might + R execute keep growing. The lane is even because his early aggression matches your strength, but the back half is yours. Survive the mounted window, punish every dismount, and by your item spikes your all-in simply wins.",
      whys: [
        "Mounted Kled's Q grab + W burst contest your early. Don't feed the grab — survive level 1-2.",
        "His courage stacks make him scary mounted. Trade carefully, don't over-commit.",
        "Dismount him — off Skaarl he's weak. Land E + bleed and crush him.",
        "Your window — your all-in beats dismounted Kled. Don't let him remount free.",
        "Even as he remounts — whoever commits the all-in first. Stack bleed.",
        "Your bleed beats his courage trade. Force the all-in, punish the dismount.",
        "You out-scale — Kled falls off. Your bleed all-in takes over the back half."
      ]
    },
    {
      a: 'darius', b: 'urgot',
      win: ['Skill', 'Urgot', 'Urgot', 'Urgot', 'Urgot', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1', text: 'Your only clean window — E + bleed before his W shotgun trades.' },
        { when: 'Lvl 2–6', text: 'Urgot’s window — W (shotgun knees) + E flip out-trade your bleed.' },
        { when: '1st item', text: 'He out-trades you; his R executes you off your own low HP.' },
        { when: 'Late', text: 'Tricky — his shotgun shred + execute beat your all-in.' }
      ],
      wants: {
        you: ['Land E early before his W shotgun comes online', 'Stay above his R execute threshold', 'Stack bleed fast and disengage his shotgun stance'],
        foe: ['Out-trade with W (shotgun knees) + Q poke', 'Flip you with E into his shotgun stance', 'Execute you with R when your HP drops']
      },
      early: "This is a tricky lane — Urgot out-trades you. His W (shotgun knees) shreds you up close, his Q pokes, and his E flips over you for a free trade. Level 1 is your only clean window before his W is online: land E and bleed him, but from level 2 on his shotgun out-damages your bleed in a stand-still fight. Don't sit in his W stance.",
      mid: "Urgot owns the mid-levels. His shotgun + E flip beat your all-in, and his R (Fear Beyond Death) executes you below a health threshold and refreshes on the kill — so the bleed war that drops YOU low is dangerous. Stay above his execute line, land E only when you can finish fast, and don't get flipped into his stance for a free shotgun combo.",
      late: "Tricky into late — his shotgun shred + execute beat your bleed all-in, and he out-trades the extended fight juggernaut-mirror. Your path is the level-1 window and landing E for a fast kill before his W ramps; if it goes even, his kit out-trades yours. Respect the R execute, don't feed him low-HP windows, and look for jungle help.",
      whys: [
        "Level 1 — E + bleed before his W shotgun is online. Your only clean window.",
        "From 2 his W (shotgun knees) out-trades your bleed up close. Don't sit in his stance.",
        "His E flips you into his shotgun for a free trade. His window — don't get caught.",
        "Urgot owns the mid-levels. Land E only when you can finish fast.",
        "His R executes you below a threshold and refreshes — stay above his execute line.",
        "He out-trades you; the bleed war that drops you low feeds his execute. Be careful.",
        "Tricky late — his shotgun + execute beat your all-in. Win level 1 or look for jungle."
      ]
    },
    {
      a: 'darius', b: 'olaf',
      win: ['Darius', 'Darius', 'Skill', 'Skill', 'Olaf', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — E + bleed out-trade him; dodge his axe (Q).' },
        { when: 'Lvl 6', text: 'Olaf’s window — R makes him CC-immune, so your E-pull won’t peel.' },
        { when: '1st item', text: 'Even — your bleed vs his reckless lifesteal trades.' },
        { when: 'Late', text: 'Even — out-bleed his lifesteal when his R is down.' }
      ],
      wants: {
        you: ['Dodge his axe (Q), then E + bleed out-trade him', 'Stack Hemorrhage before his R window', 'Fight on his Q and R cooldowns'],
        foe: ['Pick up his axe (Q) to slow and out-trade you', 'Ramp attack speed + lifesteal as he drops low', 'Go CC-immune with R — your E-pull / slow won’t hold him']
      },
      early: "Levels 1-2 are yours — land E and your bleed + Q out-trade Olaf, especially if you dodge his axe (Q). Without the axe he can't slow or chase you, so sidestep it and punish. But beware his passive: as his HP drops he gains attack speed and lifesteal, so don't let a reckless brawl drag on into his comeback window.",
      mid: "His R (Ragnarok) is the key problem — it makes him CC-immune, so your E-pull, W-slow, and knockup won't peel or hold his all-in once it's active. Don't rely on CC to stop a R'd Olaf; fight before he ults or kite the duration. When his R is down and his axe is on cooldown, your bleed out-trades his reckless trades.",
      late: "Even into late — your bleed versus his lifesteal. Force fights on his Q and R cooldowns, where your Hemorrhage out-grinds his sustain. Stack bleed early in the fight, and don't get baited into an all-in the moment his Ragnarok is up (your whole kit's CC is useless then). Slightly your favour early, his at the R window.",
      whys: [
        "E + bleed out-trade him — dodge his axe (Q) and he can't slow or chase. Levels 1-2 are yours.",
        "His passive ramps attack speed + lifesteal as he drops low. Don't brawl recklessly.",
        "Even as his sustain comes online — fight when his axe is down.",
        "Keep dodging the axe and stacking bleed before his R window.",
        "His R makes him CC-immune — your E-pull and slow won't hold him. Fight before 6 or kite it.",
        "Even — your bleed vs his lifesteal. Force trades on his Q/R cooldowns.",
        "Even late — out-bleed his lifesteal when his R is down. Stack Hemorrhage early."
      ]
    },
    {
      a: 'darius', b: 'tryndamere',
      win: ['Darius', 'Darius', 'Skill', 'Skill', 'Skill', 'Skill', 'Tryndamere'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — E + bleed out-trade a low-fury Trynd.' },
        { when: 'Lvl 6', text: 'His R (Undying Rage) survives your execute — bait it, don’t waste R.' },
        { when: '1st item', text: 'Trynd’s crit scaling starts to trade back — win before it.' },
        { when: '2+ items', text: 'Tryndamere takes over — crit + R make him an unkillable duelist.' }
      ],
      wants: {
        you: ['Out-trade his low-fury early before crit items', 'Bait his R (5s undying) before you execute', 'Win the lane before his crit scaling'],
        foe: ['Spin (E) + crit with Q heal as fury builds', 'Reduce your AD bleed with W and slow you', 'Scale into a crit duelist with R (can’t die 5s)']
      },
      early: "Levels 1-2 are yours — land E and your bleed out-trades a low-fury Tryndamere. Fight him when his fury bar is low; high fury means Q heals and crits spike. His W reduces your AD (and your bleed scales off AD) and slows you, so bait it before you commit. Punish his early windows before his crit items come online.",
      mid: "Respect his R (Undying Rage): for five seconds he can't drop below 1 HP, so your R execute won't kill him through it — blowing Noxian Guillotine into a fresh Undying just wastes it. Bait the R out (force him to use it), then re-engage and execute once it's down. Through the mid-game your bleed matches his fury when his R is on cooldown.",
      late: "Tryndamere takes over at two items — crit + Undying Rage make him a duelist you can't execute, and his Q heal off crits out-sustains your bleed. The lane is even because you out-trade his early and he out-scales the late. Snowball your level 1-2 edge, bait his R to land your kills, and end before his crit items flip the 1v1.",
      whys: [
        "E + bleed out-trade a low-fury Trynd. Fight him at low fury — levels 1-2 are yours.",
        "His W cuts your AD bleed and slows. Bait it, punish before his crit items.",
        "Even as his fury builds — Q heal + crits spike. Trade on low-fury windows.",
        "Keep punishing low-fury Trynd; don't feed his fury stacking.",
        "His R survives your execute (can't die 5s) — bait it, don't waste R into a fresh Undying.",
        "His crit scaling trades back — re-engage and execute after his R is down.",
        "Two items in, crit + R make him unkillable. You own early — end it before he scales."
      ]
    },
    {
      a: 'darius', b: 'illaoi',
      win: ['Darius', 'Darius', 'Skill', 'Skill', 'Illaoi', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — E-pull + bleed out-trade her on open ground.' },
        { when: 'Lvl 6', text: 'Illaoi’s window — R spawns a tentacle wall; never fight in it.' },
        { when: '1st item', text: 'Even — control the tentacle ground and you win the trade.' },
        { when: 'Late', text: 'Even — fight her on open ground; don’t side-lane in her nest.' }
      ],
      wants: {
        you: ['Fight on open ground away from her tentacles', 'Use E-pull to drag her off her tentacle nest', 'Dodge her E (Test of Spirit) soul-rip'],
        foe: ['Spawn tentacles and fight inside them', 'Rip your soul with E (Test of Spirit)', 'Slam you with empowered W in her tentacle zone']
      },
      early: "It's a positioning matchup, and your E-pull is a great tool here — you can yank Illaoi off her tentacle nest onto open ground, where she's slow and beatable. Levels 1-2, land E and your bleed out-trades her away from tentacles. Dodge her E (Test of Spirit): if she rips your soul, she beats your vessel for huge damage, so sidestep it.",
      mid: "Level 6 is her window — R (Leap of Faith) spawns a wall of tentacles and turns any fight into a beating. Never all-in her standing in her nest; you'll get slammed from all sides. Bait or fight before her R, use E to drag her onto fresh ground, and stack bleed where her tentacles aren't. Don't path into her Q slams.",
      late: "Even into late — whoever controls the tentacle ground wins. Your E-pull is the equalizer: drag her out of position, fight on open ground, and your bleed out-grinds her. Don't side-lane into her nest, where her R + tentacles shred you and your team. Dodge the E, pull her off her spots, and win the spacing.",
      whys: [
        "Illaoi is lethal in her tentacles, weak outside. E-pull her onto open ground — levels 1-2 are yours.",
        "Dodge her E (Test of Spirit) soul-rip — beating your vessel deals huge damage.",
        "Even on open ground — bleed out-trades her away from tentacles.",
        "Don't path into her Q slams or stand by her tentacles. Use E to reposition the fight.",
        "Her R spawns a tentacle wall — never fight in it. Bait it or fight before 6.",
        "Even — control the tentacle ground. Pull her off her spots and bleed her out.",
        "Even late — fight her on open ground. Don't side-lane into her nest; win the spacing."
      ]
    },
    {
      a: 'darius', b: 'vladimir',
      win: ['Darius', 'Darius', 'Darius', 'Skill', 'Skill', 'Vladimir', 'Vladimir'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed crush his weak early before pool.' },
        { when: 'Lvl 6', text: 'His pool (W) dodges your E-pull and R execute — bait it first.' },
        { when: '1st item', text: 'Vlad’s spike — his AP sustain starts to out-heal your bleed.' },
        { when: '2+ items', text: 'Vladimir takes over — full-AP scaling kites and bursts you.' }
      ],
      wants: {
        you: ['Land E + bleed early before his pool + scaling', 'Bait his Sanguine Pool (W) before you all-in / execute', 'Win the lane before his AP item scaling'],
        foe: ['Pool (W) your E-pull, bleed, and R execute — untargetable', 'Farm safely and stack health + AP toward Rylai’s', 'Out-scale into an unkillable late-game AP threat']
      },
      early: "Levels 1-3 are yours — Vladimir is one of the weakest early laners and your E + bleed crush him before his pool and scaling come online. The catch is his W (Sanguine Pool): it makes him untargetable, dodging your E-pull, your bleed application, and your R execute. Bait the pool out, then all-in; force him to burn it so its long cooldown is up when you commit.",
      mid: "This is a race against his scaling. Your bleed out-trades a pre-Rylai's Vlad, but his pool resets the fight and his AP sustain ramps. Bait the W, then E-Q-W and stack Hemorrhage fast — and remember he can pool mid-execute to survive your R, so time it for when W is down. Keep him low, deny his Q stacks, and snowball before his items.",
      late: "Vladimir takes over — full-AP Vlad with Rylai's/Cosmic Drive out-sustains and kites you, and his pool dodges your entire all-in on demand. The lane is tricky because you crush the early but he out-scales hard. You had to snowball the level 1-3 window into a lead; if it went even, the late game is his. Close it out before his second item.",
      whys: [
        "Vlad is one of the weakest early laners. E + bleed crush him — levels 1-3 are yours.",
        "He has no escape until pool. Punish his weak early before his W comes online.",
        "Your full combo out-trades a pre-pool Vlad. Stack bleed and keep him low.",
        "His pool (W) makes him untargetable — bait it before you all-in or execute.",
        "He can pool mid-execute to survive your R — time it for when W is down.",
        "His AP sustain starts out-healing your bleed. Snowball before his items.",
        "Two items in, full-AP Vlad kites and bursts you. You own early — close it before his spike."
      ]
    },
    {
      a: 'darius', b: 'shen',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed out-trade his weak base damage.' },
        { when: 'Lvl 6', text: 'R executes him; track his R when he globals to punish the wave.' },
        { when: '1st item', text: 'Still your stomp — bleed + Might beat a low-damage Shen.' },
        { when: 'Late', text: 'Shen is a teamfight peeler; you own the lane 1v1.' }
      ],
      wants: {
        you: ['Out-trade his weak damage and bait his taunt (E)', 'Punish the wave when he R-globals away', 'Snowball — his solo kill pressure is near zero'],
        foe: ['Farm even and scale; his solo pressure is low', 'Use R to impact other lanes globally', 'Become a teamfight engage / peel frontliner']
      },
      early: "You out-bully Shen — he has weak base damage and almost no solo kill pressure, so levels 1-3 are decisively yours. Land E and your bleed + Q shred him; his Q (sword) is his only poke and his E (taunt) is his only peel, so bait the taunt before you commit. He just wants to farm and scale for the map, not duel you.",
      mid: "Keep him bleeding. Your all-in out-trades him through every level, and your R executes him off stacks. The real game is tracking his R (Stand United) — when he globals to save a teammate, shove and punish his wave for free CS and plates. Don't let his map value snowball other lanes while you sit even; make him pay for leaving.",
      late: "Shen is a teamfight engage/peeler, not a laner — you win the 1v1 all game. You should have a big lead by now: your bleed + Might dwarf his low-damage frame. Keep shoving and force him to choose between farming and roaming, and the match comes down to who uses Shen's global better, not the duel you own.",
      whys: [
        "Shen has weak base damage and no kill pressure. E + bleed out-trade him — levels 1-3 are yours.",
        "His Q (sword) is his only poke. Trade when it's down and you out-damage him easily.",
        "Bait his E (taunt) — his only peel — then all-in. Your bleed shreds him.",
        "Keep punishing — your all-in out-trades him. Watch for his R global.",
        "R executes him off stacks. When he globals away, shove and punish his wave.",
        "Still your stomp — bleed + Might beat a low-damage Shen. Take plates, snowball.",
        "Late he's a teamfight peeler; you own the lane. The game is about his global, not the 1v1."
      ]
    },
    {
      a: 'darius', b: 'swain',
      win: ['Darius', 'Darius', 'Darius', 'Skill', 'Skill', 'Skill', 'Swain'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed crush his weak melee-mage early.' },
        { when: 'Lvl 6', text: 'Kill him fast — his R drain out-sustains a drawn-out fight.' },
        { when: '1st item', text: 'Even — your bleed vs his W poke + soul-fragment sustain.' },
        { when: '2+ items', text: 'Swain takes over — full-build drain-tank out-sustains your bleed.' }
      ],
      wants: {
        you: ['Land E + bleed before his R drain ramps', 'Dodge his E (Nevermove root) all-in setup', 'Kill him fast — short, decisive trades beat his drain'],
        foe: ['Land E (root) to set up his all-in', 'Stack soul fragments and out-sustain with W poke', 'Scale into a drain-tank teamfighter with R']
      },
      early: "Levels 1-3 are yours — Swain is a weak melee-range mage early, and your E + bleed crush him. His one threat is E (Nevermove), a root that sets up his all-in, so never get rooted from bush range. Land your own E, stack Hemorrhage, and deny his soul-fragment passive stacks that fuel his ultimate. Punish him before he comes online.",
      mid: "His R (Demonic Ascension) drain is dangerous in a long fight, so kill him FAST — burst him with your bleed all-in before R ramps, and don't sit in the ult radius trading. Bait or dodge his E root before you commit. Through the mid-game it's even-ish: your bleed beats him in short trades, his drain wins drawn-out ones.",
      late: "Swain takes over at full build — he becomes a drain-tank teamfighter who out-sustains your bleed in long fights. The lane is even overall because you crush his early and he out-scales the late. Snowball your level 1-3 dominance, force short decisive all-ins (not drain-fests), and close the lane before his items make him unkillable.",
      whys: [
        "Swain is a weak melee-mage early. E + bleed crush him — levels 1-3 are yours.",
        "His E (root) is his all-in setup — never get rooted from bush. Land your own E first.",
        "Your bleed all-in out-trades a pre-6 Swain. Deny his soul-fragment stacks.",
        "Even as his W poke + sustain ramp. Force short trades, not drawn-out ones.",
        "His R drain wins long fights — kill him FAST. Don't sit in the ult radius.",
        "Even — your bleed vs his sustain. Short decisive all-ins beat his drain.",
        "Full-build Swain is a drain-tank that out-sustains your bleed. Win early, close it out."
      ]
    },
    {
      a: 'darius', b: 'trundle',
      win: ['Darius', 'Darius', 'Darius', 'Skill', 'Skill', 'Skill', 'Trundle'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed out-trade him before his sustain ramps.' },
        { when: 'Lvl 6', text: 'His R drains your resistances — burst him before the long fight.' },
        { when: '1st item', text: 'Even — bait his Q (Chomp) which steals your AD bleed.' },
        { when: '2+ items', text: 'Trundle takes over — sustain + R drain out-grind your all-in.' }
      ],
      wants: {
        you: ['Land E + bleed before his sustain comes online', 'Bait his Q (Chomp) — it steals your AD (and bleed)', 'Win short trades before his R drains your resists'],
        foe: ['Bite (Q) to steal your AD and heal', 'Zone you with E (Pillar) and out-sustain trades', 'Drain your resistances + HP with R in a long fight']
      },
      early: "Levels 1-3 are yours — land E and your bleed out-trades Trundle before his sustain ramps. His Q (Chomp) steals your AD — and since your bleed scales off AD, a bite weakens your whole kit — so bait it before you commit. His E (pillar) can zone or peel; play around it. Press your early bleed advantage before his items.",
      mid: "It evens out as his sustain comes online. His R (Subjugate) drains your resistances and HP in a long fight, so don't get dragged into an extended slugfest on his terms — burst him with your bleed all-in and back off if his R flips it. Bait the Chomp, then E-Q-W and stack Hemorrhage. Keep trades short and decisive.",
      late: "Trundle takes over at two items — his sustain + R drain out-grind your bleed, and he's a tank-buster who melts your resistances. The lane is even overall: you bully early, he out-sustains late. Snowball your level 1-3 edge, force short all-ins where your bleed bursts him before his R ramps, and close the lane before his scaling.",
      whys: [
        "E + bleed out-trade him before his sustain ramps. Levels 1-3 are yours.",
        "His Q (Chomp) steals your AD — and your bleed. Bait it before you commit.",
        "Your bleed all-in beats a low-sustain Trundle. Press the early advantage.",
        "Even as his sustain comes online — play around his E pillar zone.",
        "His R drains your resistances + HP — burst him before the long fight, back off if R flips it.",
        "Even — bait the Chomp, force short decisive trades. Stack bleed fast.",
        "Two items in, sustain + R drain out-grind your all-in. Win early, close it out."
      ]
    },
    {
      a: 'darius', b: 'warwick',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Warwick', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed crush a weak-early Warwick.' },
        { when: 'Lvl 6', text: 'Warwick’s window — his R (suppress) all-in; stay healthy.' },
        { when: '1st item', text: 'Even — your bleed vs his low-HP lifesteal; keep your HP up.' },
        { when: 'Late', text: 'You edge it — out-bleed his sustain when his R is down.' }
      ],
      wants: {
        you: ['Out-trade his weak early before his lifesteal ramps', 'Stay healthy so his R all-in can’t finish you', 'Land E + bleed and out-DPS his Q lifesteal'],
        foe: ['Sustain with Q lifesteal (huge when you’re low)', 'Chase you down with W (move speed on low HP)', 'All-in with R (point-blank suppress)']
      },
      early: "Levels 1-3 are yours — Warwick is a weak early laner, and your E + bleed crush him before his lifesteal ramps. His Q heals more the lower you are and his W gives chase speed, but early he can't out-trade your all-in. Punish him, stack Hemorrhage, and just don't drop low yourself — his kit feeds on your missing health.",
      mid: "His all-in is R (Infinite Duress) — a point-blank suppress that locks you for a full combo, so don't get caught at low HP in his jump range at 6. Outside the ult your bleed out-trades him. Bait or respect the R, keep your HP topped (so his Q lifesteal and R execute-feel can't finish you), and force trades where his lifesteal can't out-heal your bleed.",
      late: "You edge it — in the extended fight your bleed out-grinds his Q lifesteal, especially if you keep your HP up so his low-health bonuses don't trigger. Force the all-ins, deny him the low-HP windows his kit feeds on, and don't walk into a R suppress while chunked. The lane is yours early and slightly yours late if you respect the ult.",
      whys: [
        "Warwick is a weak early laner. E + bleed crush him — levels 1-3 are yours.",
        "His Q heals more the lower you are. Win the trade but don't drop low.",
        "Your full combo out-trades him. Stack bleed while he's weak and item-less.",
        "You out-trade through 4-5 — keep your HP up so his low-HP bonuses don't kick in.",
        "His R is a point-blank suppress all-in — don't get caught low in his jump range.",
        "Even — your bleed vs his lifesteal. Force the all-in, stay healthy.",
        "You edge it late — out-bleed his sustain when his R is down. Deny the low windows."
      ]
    },
    {
      a: 'darius', b: 'volibear',
      win: ['Darius', 'Darius', 'Skill', 'Skill', 'Volibear', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — E + bleed out-trade him before his W heal.' },
        { when: 'Lvl 6', text: 'Volibear’s window — his R (dive + tanky) is a strong all-in.' },
        { when: '1st item', text: 'Even — your bleed vs his W lifesteal; commit fully, not chip.' },
        { when: 'Late', text: 'Even — out-bleed his sustain on his Q/R cooldowns.' }
      ],
      wants: {
        you: ['Land E + bleed before his W (bite) heal ramps', 'Dodge his Q empowerment (the stun) before all-in', 'Commit fully — chip just feeds his W lifesteal'],
        foe: ['All-in with Q (slow + stun) into W (bite heal)', 'Sustain through trades with W lifesteal', 'Dive with R (untargetable tower, tanky)']
      },
      early: "Levels 1-2 are yours — land E and your bleed out-trades Volibear before his W (bite) heal ramps. His Q slows and empowers his next hit (a stun if he closes), and his W heals off you, so commit fully rather than chip; a half-hearted trade just feeds his lifesteal. Dodge his Q empowerment to deny the stun, then stack Hemorrhage.",
      mid: "Level 6 is his window — R (Stratospheric Force) is a dive that disables your tower and makes him tanky, a strong all-in if you're caught low. Don't fight him at low HP when R is up; bait it or fight before 6. Outside the ult your bleed all-in out-trades his sustain when you commit fully and dodge the Q stun.",
      late: "Even into late — your bleed versus his W lifesteal. Force fights on his Q and R cooldowns, where your Hemorrhage out-grinds his sustain. Commit fully to all-ins (chip feeds his heal), stay above the HP where his R-dive kills you, and out-last him in the extended brawl. The lane is yours early, his at the R window, even overall.",
      whys: [
        "E + bleed out-trade him before his W heal ramps. Levels 1-2 are yours — commit fully.",
        "His W (bite) heals off you. Chip just feeds him — all-in or don't.",
        "Even as his sustain ramps — dodge the Q empowerment to deny the stun, then commit.",
        "Force full trades where your bleed beats his lifesteal, not short ones.",
        "His R is a tanky tower-dive all-in — don't get caught low when it's up.",
        "Even — your bleed vs his W lifesteal. Force trades on his Q/R cooldowns.",
        "Even late — out-bleed his sustain. Commit fully, stay above his R-dive threshold."
      ]
    },
    {
      a: 'darius', b: 'wukong',
      win: ['Darius', 'Skill', 'Skill', 'Wukong', 'Wukong', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1', text: 'Your window — E + bleed before his Q shred + clone come online.' },
        { when: 'Lvl 4–6', text: 'Wukong’s window — clone (W) jukes your E + combo; E-R all-in.' },
        { when: '1st item', text: 'He out-trades on the clone — bait the W before you pull.' },
        { when: 'Late', text: 'Tricky — his cooldown burst beats your bleed if the clone juke lands.' }
      ],
      wants: {
        you: ['Land E level 1 before his clone + Q shred', 'Bait the clone (W) before you commit your pull', 'Punish him on his E / R cooldowns'],
        foe: ['Out-trade with Q (armor shred) auto-resets', 'Juke your E + combo with the clone (W)', 'All-in with E-dash into R (spin knockup)']
      },
      early: "Your one clean window is level 1, before Wukong's clone and Q shred come online — land E and your bleed out-trades him. From level 2 on, his Q shreds your armour and resets his auto, and his clone (W) lets him juke your E-pull and your combo, dodging the bleed all-in. Don't waste your E on a clone; bait the W first.",
      mid: "Levels 4-6 are his window — clone juke into E (dash) + R (spin knockup) is a real burst all-in that can chunk you before your bleed ramps. This is a tricky lane because the clone negates your engage. Bait the W out, then land E on the real Wukong and stack Hemorrhage. Don't all-in into a fresh clone — you'll pull the wrong one and eat his combo.",
      late: "Tricky into late — Wukong's damage is cooldown-reliant burst, and if his clone juke lands he out-trades your bleed. Your path is punishing his E/R downtime: when his combo is on cooldown, land E and your bleed out-grinds him. Bait the clone before every all-in, and don't get caught by the W juke at low HP. It tips his way if he plays the clone well.",
      whys: [
        "Level 1 — E + bleed before his clone + Q shred. Your one clean window.",
        "His Q shreds armour and resets his auto. His clone jukes your E — don't waste it.",
        "Bait the clone (W) before you pull. Don't engage into a juke.",
        "His window — clone into E-R knockup is a burst all-in. Don't be low when it's up.",
        "Survive the juke + knockup, then your bleed stabilizes. Track his cooldowns.",
        "He out-trades on the clone — bait the W, then land E on the real him.",
        "Tricky late — his cooldown burst beats your bleed if the juke lands. Punish his downtime."
      ]
    },
    {
      a: 'darius', b: 'yasuo',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Yasuo'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E-pull locks him through his dashes; bleed crushes him.' },
        { when: 'Lvl 6', text: 'R executes him; he needs a knockup for his R, which he lacks solo.' },
        { when: '1st item', text: 'Still your stomp — deny CS so his crit spike comes late.' },
        { when: '2+ items', text: 'Yasuo takes over — crit item spikes out-DPS your bleed.' }
      ],
      wants: {
        you: ['Land E (pull) — he can’t dash out once it lands', 'Stack bleed and execute his squishy frame', 'Win before his crit item spikes (2 items)'],
        foe: ['Poke with Q tornado and dash on minions (E)', 'Shield your trades with his passive', 'Scale into a crit hypercarry at 2 items']
      },
      early: "You crush Yasuo early — your E (Apprehend) is a positional pull he can't dash out of once it lands, so his whole mobility kit (E through minions, dashes) doesn't save him. Land E, stack bleed, and his passive shield won't out-trade your Hemorrhage. His windwall (W) blocks projectiles, but your kit is melee, so it barely matters. Levels 1-3 are yours.",
      mid: "Keep stomping. Your all-in out-trades him and your R executes his squishy frame off bleed stacks. At 6 his R needs a knockup to use, which he lacks solo, so he has no burst all-in to answer yours — deny him a setup and just run him down. Keep him off CS: his only path back is a crit spike, so every denied minion delays it.",
      late: "Yasuo takes over at two items — IE + crit out-DPS your bleed and he duels back. The lane is favoured because you dominate the early-mid; you must convert it. Snowball off the E-pull all-ins, deny his farm, take his tower, and end before his crit spike. A farmed Yasuo flips the 1v1, so close the game on your lead.",
      whys: [
        "E-pull locks him — he can't dash out once it lands. Stack bleed; levels 1-3 are yours.",
        "His passive shield won't out-trade your bleed. His windwall barely matters vs melee. All-in.",
        "Your full combo crushes him — E, then Q-W and stack Hemorrhage.",
        "Keep him off CS — his only comeback is a crit spike. Deny it.",
        "R executes him off bleed; his R needs a knockup he lacks solo. Run him down.",
        "Still your stomp — deny farm so his crit spike comes late. Take his tower.",
        "Two items in, crit out-DPS your bleed. You own early — close the game on your lead."
      ]
    },
    {
      a: 'darius', b: 'yone',
      win: ['Darius', 'Darius', 'Darius', 'Skill', 'Skill', 'Skill', 'Yone'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E-pull catches him through his dashes; bleed crushes him.' },
        { when: 'Lvl 6', text: 'R executes him; punish him after he commits E (spirit form).' },
        { when: '1st item', text: 'Even — your bleed vs his mobility; land E to lock him.' },
        { when: '2+ items', text: 'Yone takes over — crit + mobility out-DPS your bleed.' }
      ],
      wants: {
        you: ['Land E (pull) to cancel his Q dash / E mobility', 'Punish him after he commits E (he’s locked into the return)', 'Win before his crit item spikes'],
        foe: ['Poke with Q and dash on the third cast', 'Retreat with E (spirit form snaps him back)', 'All-in with R (knockup) and scale to crit']
      },
      early: "Levels 1-3 are yours — your E (Apprehend) cancels Yone's mobility, locking him in your bleed where his Q dash and E can't save him. Land E and your Hemorrhage out-trades him; don't whiff the pull on a dashing Yone. His passive shields and crit make him slippery, but pinned in your combo he loses the early trades. Punish before he scales.",
      mid: "Keep punishing. Your bleed out-trades him and your R executes off stacks. His E (spirit form) lets him commit then snap back to safety, so punish him after he uses it — he's locked into the return path and can't escape your E. At 6 his R is a knockup all-in, but pinned by your pull he rarely lands the setup. Deny his farm.",
      late: "Yone takes over at two items — crit + his mobility out-DPS and kite your bleed, and his E/R make him slippery. The lane is even because you out-trade his early-mid and he scales past you. Snowball off the E-pull all-ins, land your pulls cleanly, and build a lead before his crit items flip the duel. Don't let him free-poke into scaling.",
      whys: [
        "E-pull cancels his mobility — locked in your bleed, his dashes can't save him. Levels 1-3 are yours.",
        "Don't whiff E on a dashing Yone. Land it and your Hemorrhage out-trades him.",
        "Your full combo crushes a pinned Yone. Stack bleed, force the trade.",
        "Even as his crit comes online — punish him after he commits E (locked into the return).",
        "R executes him off stacks. Pinned by your pull, his R setup rarely lands.",
        "Even — your bleed vs his mobility. Land E to lock him; deny his farm.",
        "Two items in, crit + mobility out-DPS your bleed. You own early — close before he scales."
      ]
    },
    {
      a: 'darius', b: 'yorick',
      win: ['Darius', 'Darius', 'Darius', 'Skill', 'Yorick', 'Skill', 'Yorick'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed out-trade him before Maiden + ghouls.' },
        { when: 'Lvl 6', text: 'Yorick’s window — Maiden (R) + W cage answer your all-in.' },
        { when: '1st item', text: 'Even — burst him 1v1 off his cage cooldown.' },
        { when: '2+ items', text: 'Yorick takes over — Maiden + ghouls out-DPS your bleed.' }
      ],
      wants: {
        you: ['Land E + bleed before Maiden and ghouls are online', 'Bait his W (cage) — don’t get trapped mid-fight', 'Burst him 1v1 before his sustained ghoul DPS'],
        foe: ['Wall you in with W (cage) and pile on ghouls', 'Ramp sustained damage with Maiden (R)', 'Out-DPS you late and splitpush with Maiden']
      },
      early: "Levels 1-3 are yours — land E and your bleed out-trades Yorick before his ghouls and Maiden are up. While he's just a melee juggernaut with mist ghouls, punish him; don't let him free-farm into his power spike. His E (mist) marks you for ghoul damage, so dodge it where you can, and stack Hemorrhage before he comes online.",
      mid: "His W (Dark Procession) is a ghoul cage that traps you mid-fight — never all-in when it's up, and bait it before you commit. At 6 his Maiden (R) ramps his sustained damage, so don't sit in a wall of ghouls trading; pick your moment when his cage is down and burst him 1v1 with your bleed, where your all-in still wins.",
      late: "Yorick takes over in the extended fight — Maiden plus a full ghoul pack out-DPS your bleed, and he splitpushes with Maiden pressure. The lane is even because you crush the early and he out-grinds the late. Snowball your level 1-3 edge, deny his farm, and end before his 2-item Maiden setup. Don't get caged in a side lane late.",
      whys: [
        "E + bleed out-trade him before Maiden. Levels 1-3 are yours — punish the melee juggernaut.",
        "Dodge his E (mist mark) and don't let him free-farm to his spike.",
        "Your bleed all-in beats a pre-Maiden Yorick. Force the trade, deny his setup.",
        "Even as Maiden nears — bait his W cage before committing.",
        "Maiden (R) ramps his DPS — don't trade in a ghoul wall. Burst him 1v1 off cage cooldown.",
        "Even — burst him 1v1 when his cage is down. Your bleed all-in wins the short fight.",
        "Two items in, Maiden + ghouls out-DPS your bleed. You own early — end it before his scaling."
      ]
    },
    {
      a: 'darius', b: 'gnar',
      win: ['Gnar', 'Skill', 'Darius', 'Darius', 'Skill', 'Darius', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Mini Gnar kites and pokes — farm through the boomerang chip.' },
        { when: 'Mini form', text: 'Your window — land E on Mini Gnar and bleed deletes him.' },
        { when: 'Mega form', text: 'Mega Gnar’s W stun + R wall answer your all-in — avoid walls.' },
        { when: 'Late', text: 'Even — the lane swings on his rage bar, not the clock.' }
      ],
      wants: {
        you: ['Land E on Mini Gnar — he can’t kite your pull', 'All-in when he’s Mini / out of rage', 'Avoid walls and dodge Mega Gnar’s W stun'],
        foe: ['Poke + kite in Mini form with Q (boomerang) + E hop', 'Build rage, transform, and W-stun you for burst', 'Use Mega R to knock you into walls / tower']
      },
      early: "Gnar's threat is his rage bar, not his level. In Mini form he's a squishy ranged kite — Q boomerang poke, E hop — and your E-pull is the answer: land it on Mini Gnar and he can't kite, so your bleed deletes him. Farm through his Mini poke, watch his rage, and look for the pull window before he transforms.",
      mid: "Time your all-ins to his form. Land E on a Mini, out-of-rage Gnar and your bleed crushes his squishy frame. Don't commit when he's about to transform: Mega Gnar's W stuns you and his combo chunks, and his R can knock you into a wall. Bait or wait out the Mega window, then catch him Mini again with your pull.",
      late: "Even — the lane swings on his rage management, not the game clock. In teamfights respect Mega Gnar's R (a wall-pin AOE), but in the side lane you out-duel Mini Gnar whenever you land E. Keep punishing his Mini windows with the pull + bleed, dodge the Mega W stun, and never let him combo you against a wall.",
      whys: [
        "Mini Gnar pokes and kites. Farm through the chip — your E-pull catches him when he's Mini.",
        "He builds rage as he pokes. Land E on Mini Gnar before he transforms to Mega.",
        "Your window — E on Mini Gnar and bleed deletes his squishy frame.",
        "All-in when he's Mini and out of rage — he can't kite your pull.",
        "Mega Gnar's W stuns and bursts — don't get caught, stay off walls for his R.",
        "Catch him Mini again with E + bleed. Avoid the Mega-form windows.",
        "Even — it swings on his rage, not the clock. Out-duel Mini, dodge Mega's W, avoid walls."
      ]
    },
    {
      a: 'darius', b: 'gragas',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed out-trade him; bait his W (damage reduction).' },
        { when: 'Lvl 6', text: 'R executes him; don’t get knocked under tower by his R (cask).' },
        { when: '1st item', text: 'Your bleed + Might beat his poke; force every all-in.' },
        { when: 'Late', text: 'You hold the edge — out-bleed his sustain in the extended fight.' }
      ],
      wants: {
        you: ['Bait his W (damage reduction) before you commit', 'Land E before he E-dashes away', 'Out-bleed his Q poke in the extended fight'],
        foe: ['Poke with Q (cask) and heal with W', 'Engage or escape with E (body slam stun)', 'Knock you out of position with R (cask)']
      },
      early: "You out-bully Gragas — levels 1-3 are yours. He pokes with Q (cask) and his W reduces incoming damage while healing, so don't dump your combo into a raised W; bait it first, then land E and your bleed out-trades him. His E (body slam) is a dash-stun for engage or escape, so try to pull him before he can E away.",
      mid: "Keep him bleeding. Bait the W, then E-Q-W and your Hemorrhage + Might out-trade his poke. Your R executes him off stacks. At 6 watch his R (Explosive Cask) — it can knock you under his tower or peel you off — so don't all-in near his turret. Land E to pin him, stack bleed, and force the extended fight he loses.",
      late: "You hold the edge — your bleed out-grinds his Q poke and W sustain in the extended fight. Force the all-ins, bait the W, and don't get cask'd out of position. Snowball your early dominance into towers and plates; Gragas is a utility/teamfight pick late, not a duelist who beats your bleed. The lane stays yours.",
      whys: [
        "E + bleed out-trade him — bait his W (damage reduction) first. Levels 1-3 are yours.",
        "His E (body slam) is a dash-stun. Land your pull before he can E away.",
        "Your bleed all-in beats his poke. Force the trade once his W is down.",
        "Keep him bleeding — your Hemorrhage + Might out-trade his Q poke.",
        "R executes him off stacks. Don't all-in near his tower — his R can knock you in.",
        "Your bleed + Might beat his poke. Force every all-in, bait the W.",
        "You hold the edge late — out-bleed his sustain. Don't get cask'd out of position."
      ]
    },
    {
      a: 'darius', b: 'gangplank',
      win: ['Darius', 'Darius', 'Skill', 'Skill', 'Skill', 'Skill', 'Gangplank'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — E-pull catches a squishy GP; bleed crushes him.' },
        { when: 'Lvl 6', text: 'Even — his W cleanses your slow; your E-pull still lands instantly.' },
        { when: '1st item', text: 'GP’s spike — his crit Q + barrels start to out-poke you.' },
        { when: '2+ items', text: 'Gangplank takes over — crit + barrel chains out-DPS your bleed.' }
      ],
      wants: {
        you: ['Land E (pull) — a caught GP is squishy and dies to bleed', 'Detonate or dodge his barrels (E)', 'Win before his crit items come online'],
        foe: ['Poke with Q (Parrrley) and chain barrels (E)', 'Cleanse your slow / CC with W (Remove Scurvy)', 'Out-scale into a crit + barrel teamfight threat']
      },
      early: "Levels 1-2 are yours — Gangplank pokes with Q (Parrrley) and sets up barrels (E), but he's squishy with no escape, so land E (Apprehend) and your bleed crushes him. Don't let him free-poke from range; walk him down behind minions and destroy his barrels before they chain. Catch him once and the bleed all-in ends him.",
      mid: "It evens through the mid-game — his W (Remove Scurvy) cleanses CC and heals, but it can't stop your E-pull (an instant grab), so you can still catch him; just don't waste your slow into a ready W. Keep destroying his barrels so he can't combo them, and force trades where his squishy frame loses to your bleed before his crit items.",
      late: "Gangplank takes over at two items — crit Q + chained barrels out-DPS your bleed and his R (Cannon Barrage) zones the map. The lane is even because you crush him early and he crushes late. Press your spike, land E to delete him before he's online, deny his barrel setups, and end the lane before his crit items make the poke lethal.",
      whys: [
        "GP pokes with Q but is squishy with no escape. Land E and your bleed crushes him. Levels 1-2 are yours.",
        "Destroy his barrels (E) before they chain. Walk him down behind minions.",
        "Even — his W cleanses CC but not your instant E-pull. Catch him, don't waste the slow.",
        "Keep popping barrels and force trades on his squishy frame.",
        "His crit spike nears — force the all-in before his items. Land E, stack bleed.",
        "GP's first item flips it — crit Q + barrels out-poke you. Close before that.",
        "Two items in, crit + barrels out-DPS your bleed. You own early — end it before his scaling."
      ]
    },
    {
      a: 'darius', b: 'drmundo',
      win: ['Darius', 'Darius', 'Skill', 'Skill', 'Dr. Mundo', 'Dr. Mundo', 'Dr. Mundo'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — E + bleed before his HP + regen come online.' },
        { when: 'Lvl 6', text: 'His R heal + regen out-sustain your bleed — kill him before he resets.' },
        { when: '1st item', text: 'He out-tanks your bleed — Bramble/antiheal is mandatory.' },
        { when: 'Late', text: 'Mundo takes over — HP-stacking regen tank shrugs off Hemorrhage.' }
      ],
      wants: {
        you: ['Land E + bleed early before his HP scaling', 'Buy grievous wounds (Bramble) for his regen + R', 'Snowball fast — you can’t out-bleed a built Mundo'],
        foe: ['Throw cleavers (Q) and farm through your bleed', 'Out-sustain Hemorrhage with passive regen + R heal', 'Stack HP and become an unkillable regen tank']
      },
      early: "This is a tricky lane — Mundo out-sustains your bleed. Your one window is levels 1-2 before his HP and regen ramp: land E and stack Hemorrhage while he's still squishy. He just throws cleavers (Q) and farms, but his passive regen and HP scaling mean your bleed stops mattering quickly. Punish hard early or not at all.",
      mid: "From 6 he tilts the lane — his R is a massive heal + AD, and his regen shrugs off your Hemorrhage in any drawn-out fight. Grievous wounds (Bramble Vest / Executioner's) is mandatory: without antiheal you literally cannot out-damage his sustain. Kill him fast before his R resets the fight, or don't commit at all.",
      late: "Mundo takes over — a full-HP-stacking regen tank that your AD bleed can't crack, and his cleavers chunk you while he out-sustains everything. The lane is tricky because he out-scales your damage profile. Snowball the level 1-2 window into a real lead, build antiheal, and end the game before his HP makes Hemorrhage irrelevant.",
      whys: [
        "E + bleed before his HP + regen come online. Levels 1-2 are your only real window.",
        "He throws cleavers and farms. Punish hard now — his sustain ramps fast.",
        "His passive regen starts out-sustaining your bleed. Buy grievous wounds.",
        "You can't out-bleed his regen without antiheal. Bramble Vest is mandatory.",
        "His R heal + regen reset the fight — kill him fast or don't commit.",
        "He out-tanks your bleed. Snowball your early window or you fall behind.",
        "Mundo takes over — HP-stacking regen tank shrugs off Hemorrhage. End the game early."
      ]
    },
    {
      a: 'darius', b: 'chogath',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', "Cho'Gath"],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed crush him; dodge his Q (rupture) + W (silence).' },
        { when: 'Lvl 6', text: 'R executes him; respect his R true-damage chunk when you’re low.' },
        { when: '1st item', text: 'Still your stomp — deny stacks so his HP scaling never arrives.' },
        { when: '2+ items', text: 'Cho takes over — stacked HP + true-damage R out-tank your bleed.' }
      ],
      wants: {
        you: ['Land E + bleed before he stacks HP off his R', 'Dodge his Q (rupture) and W (scream silence)', 'Snowball before his tank scaling takes over'],
        foe: ['Land Q (knockup) into W (silence) for a trade', 'Farm safely and stack HP with R (Feast)', 'Scale into an unkillable true-damage teamfight tank']
      },
      early: "You crush Cho'Gath early — he's a weak-early tank scaler, and your E + bleed out-trade him as long as you dodge his combo. His Q (Rupture) is a telegraphed knockup and his W (Feral Scream) silences; sidestep the Q and his trade falls apart. Land your pull, stack Hemorrhage, and deny the farm that lets him stack. Levels 1-3 are decisively yours.",
      mid: "Keep stomping. Your bleed all-in out-trades a low-stack Cho, and your R executes him off Hemorrhage — but respect his R (Feast): it's a true-damage nuke that can chunk you when you're low, so don't all-in at low HP. Zone his CS to keep him off HP stacks, and dive him with jungle help if he's already behind.",
      late: "Cho takes over at two items — stacked HP off his R plus true damage make him a teamfight tank your AD bleed can't crack. The lane is favoured because you dominate the early; you must convert it. Snowball off the level 1-5 stomp, deny his farm, and end before his HP stacking makes Hemorrhage tickle.",
      whys: [
        "Cho is weak early. Dodge his Q (rupture) and E + bleed crush him. Levels 1-3 are yours.",
        "His W silences mid-combo. Sidestep the Q first so he can't chain it.",
        "Your full combo out-trades a weak-early Cho. Stack bleed, deny his farm.",
        "Keep him off HP stacks — zone his CS. Your all-in out-trades him.",
        "R executes him off bleed; respect his R true-damage chunk when you're low.",
        "Still your stomp at one item. Deny stacks so his scaling never arrives.",
        "Two items in, stacked HP + true damage out-tank your bleed. End the game early."
      ]
    },
    {
      a: 'darius', b: 'tahmkench',
      win: ['Darius', 'Darius', 'Skill', 'Skill', 'Skill', 'Tahm Kench', 'Tahm Kench'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — E + bleed punish his weak early before grey health.' },
        { when: 'Lvl 6', text: 'His W (Devour) grey health resets your bleed — burst him fast.' },
        { when: '1st item', text: 'Even — he out-sustains with grey health; commit to fast kills.' },
        { when: 'Late', text: 'Tahm takes over — tanky grey-health frontliner shrugs your bleed.' }
      ],
      wants: {
        you: ['Land E + bleed before his grey health + tank items', 'Burst him fast — grey health (W passive) heals your bleed off', 'Pin him under tower; he has no waveclear'],
        foe: ['Tank your bleed with grey health (passive)', 'Reposition out of your pull with W (Devour escape)', 'Scale into a tanky teamfight peeler / saver']
      },
      early: "Levels 1-2 are your window — Tahm Kench has a weak early and no waveclear, so land E and your bleed punishes him before his grey health and tank items come online. Don't walk into a W (Devour) animation for a free grey-health trade, but otherwise pin him and deny CS; he just wants to survive and scale.",
      mid: "His grey health (passive) is the problem — it banks a chunk of the damage you deal as a shield that heals back, which resets your bleed pressure. Burst him fast in a single committed all-in rather than chipping, and stack Hemorrhage quickly. His W can also reposition him out of your pull, so don't let him W away mid-fight to safety.",
      late: "Tahm takes over — he becomes a tanky grey-health frontliner/peeler who shrugs off your bleed and saves his carries. The lane is even because you bully the early and he out-sustains the late. Snowball your level 1-2 window, force fast committed kills before his grey health resets, and end before his tank items make Hemorrhage irrelevant.",
      whys: [
        "Tahm has no waveclear and a weak early. E + bleed punish him — levels 1-2 are yours.",
        "Don't walk into a W (Devour) for a free grey-health trade. Pin him, deny CS.",
        "His grey health banks your damage as a healing shield. Burst fast, don't chip.",
        "Commit to single fast all-ins — drawn-out bleed just feeds his grey health.",
        "His W resets your bleed and can reposition him out of your pull. Burst him fast.",
        "Even — he out-sustains with grey health. Commit to fast kills before it resets.",
        "Tahm takes over — tanky grey-health frontliner shrugs your bleed. End early."
      ]
    },
    {
      a: 'darius', b: 'ksante',
      win: ['Darius', 'Darius', 'Darius', 'Skill', 'Skill', 'Skill', "K'Sante"],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed out-trade a pre-item K’Sante.' },
        { when: 'Lvl 6', text: 'His R (All Out) turns him into a duelist — respect the burst window.' },
        { when: '1st item', text: 'Even — bait his W (block), which can interrupt your combo.' },
        { when: '2+ items', text: 'K’Sante takes over — tanky stance + items out-sustain your bleed.' }
      ],
      wants: {
        you: ['Land E + bleed before his items make him tanky', 'Bait his W (block) — don’t feed it your combo', 'Win before his R duel form + item scaling'],
        foe: ['Block your combo with W (damage reduction)', 'Knock you with Q and dash with E (shield)', 'Pop R (All Out) to duel, or stay tanky to scale']
      },
      early: "Levels 1-3 are yours — K'Sante is weak before items, and your E + bleed out-trade him. His W blocks damage and can interrupt (don't dump your combo into a held W), his Q knocks back, and his E dashes + shields. Bait the W, then land E and stack Hemorrhage. Press your early bleed advantage before his item spikes arrive.",
      mid: "His big spike is R (All Out): he sheds tankiness to become a high-damage duelist with extra dashes, so respect that burst window — don't all-in a fresh R at low HP. Outside of it, your bleed out-trades his tankier stance. Bait his W block, then commit your combo, and keep him off the items that make him unkillable.",
      late: "K'Sante takes over at two items — his tank stance plus item sustain out-grind your bleed, and his R lets him pick the duel terms. The lane is even because you crush him early and he out-scales late. Snowball your level 1-3 edge, deny his farm, and end the lane before his scaling flips the side-lane 1v1.",
      whys: [
        "K'Sante is weak pre-item. E + bleed out-trade him — levels 1-3 are yours.",
        "His W blocks and can interrupt. Don't dump your combo into a held W — bait it.",
        "Your bleed all-in out-trades a pre-item K'Sante. Force the trade, deny his farm.",
        "Keep punishing — deny his farm so his item spikes come late.",
        "His R (All Out) makes him a burst duelist — respect it at low HP.",
        "Even — bait his W block, then commit. Out-trade his tankier stance.",
        "Two items in, tank stance + items out-sustain your bleed. End it before his scaling."
      ]
    },
    {
      a: 'darius', b: 'poppy',
      win: ['Darius', 'Darius', 'Darius', 'Skill', 'Skill', 'Skill', 'Poppy'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed out-damage her low base damage.' },
        { when: 'Lvl 6', text: 'R executes her; her R knockback only delays your all-in.' },
        { when: '1st item', text: 'Still your edge — she has no kill threat; deny her farm.' },
        { when: 'Late', text: 'Poppy out-tanks you — she scales to a teamfight peeler.' }
      ],
      wants: {
        you: ['Land E + bleed — she can’t out-damage you', 'Stand off walls so her E (stun) can’t pin you', 'Snowball before she builds tanky'],
        foe: ['Stun you into a wall with E (Heroic Charge)', 'Stop dash-engages with her W passive', 'Scale to a tanky teamfight peeler']
      },
      early: "Levels 1-3 are yours — Poppy deals low damage and can't out-trade your E + bleed. Her threats are positional: E (Heroic Charge) stuns you if it slams you into a wall, so stand away from terrain. Her W passive grounds dash-users, but your E is a pull, not a dash, so it lands fine. Punish her low damage and stack Hemorrhage.",
      mid: "Your bleed simply out-damages her. Trade freely away from walls — she has no way to win the damage race. Her R (Keeper's Verdict) can knock you away to delay your all-in, but it doesn't save her from a committed bleed combo. Land E, stack Hemorrhage, and keep her off farm; her low kill pressure means you dictate the lane.",
      late: "Poppy out-tanks you eventually — she builds resistances and becomes a teamfight peeler with a big R disengage, and your AD bleed cracks her less over time. The lane is even because you bully the early and she out-tanks the late. Snowball your level 1-3 dominance, take plates, and end before her tankiness makes Hemorrhage tickle.",
      whys: [
        "Poppy deals low damage. E + bleed out-damage her — levels 1-3 are yours.",
        "Her E stuns you into a wall. Stand off terrain; her W doesn't stop your pull (it's not a dash).",
        "Your bleed out-damages her. Force the trade away from walls.",
        "Keep her off farm — she has no kill threat. Stack Hemorrhage and pressure.",
        "R executes her; her R knockback only delays your all-in.",
        "Still your edge — deny her farm before she builds tanky.",
        "Poppy out-tanks you late — she scales to a teamfight peeler. End early."
      ]
    },
    {
      a: 'darius', b: 'kayle',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Kayle'],
      spikes: [
        { when: 'Lvl 1–5', text: 'Your window — Kayle is the weakest early champ. E + bleed stomp her.' },
        { when: 'Lvl 6', text: 'R executes her; her R (invuln) only delays it. All-in on cooldown.' },
        { when: '1st item', text: 'Still your stomp — trap her under tower, deny CS + XP.' },
        { when: 'Lvl 11 / 16', text: 'Kayle’s spikes — ranged form (11) + untouchable R (16) win the game.' }
      ],
      wants: {
        you: ['Trap her under tower; deny CS and XP relentlessly', 'Land E + bleed on every cooldown pre-11', 'Build a game-ending lead before her level 11 spike'],
        foe: ['Survive the brutal early and farm safely', 'Hit level 11 (ranged form) to flip the lane', 'Reach level 16 R and become an unkillable carry']
      },
      early: "You stomp the LANE — Kayle is the single weakest early champion in the game and you're the strongest bully. Land E and your bleed deletes her; she has no escape and can't trade back. But the matchup is rated even because she wins the GAME if she scales, so your whole job from minute one is to deny her: trap her under tower and starve CS + XP.",
      mid: "Free-kill territory. She dies to a single bleed all-in, so all-in on every cooldown and perma-zone her off the wave. Your R executes her, and her R (Intervention invuln) only delays the kill — wait it out, then finish. Dive her under tower with any jungle help; you must build a lead so big she's irrelevant before level 11.",
      late: "This is why it's even despite you crushing lane: at level 11 her ranged form out-ranges you, and by 16 her R makes her an untouchable carry. You must win the GAME early — end it on the map with your lead — or you simply lose it late. Snowball the lane stomp into objectives and towers; don't let a farmed Kayle reach her spikes.",
      whys: [
        "Kayle is the weakest level-1 in the game. E + bleed stomp her — but you can't let her scale.",
        "She has no escape and dies to one combo. Trap her under tower, deny CS + XP.",
        "All-in on cooldown — she can't fight back. Perma-zone her off the wave.",
        "Keep her broke — every denied minion delays her 11/16 spikes. Dive with jungle.",
        "R executes her; her R (invuln) only delays it. Wait it out, then finish.",
        "Still your stomp — build a game-ending lead before level 11.",
        "Why it's even: at 11 she out-ranges you, by 16 she's untouchable. Win the game early or lose late."
      ]
    },
    {
      a: 'darius', b: 'kennen',
      win: ['Kennen', 'Kennen', 'Skill', 'Kennen', 'Kennen', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Kennen pokes you out with Q from range — hug minions, take the chip.' },
        { when: 'Lvl 6', text: 'His R (AOE stun) + E burst is a real kill threat — don’t get chunked low.' },
        { when: '1st item', text: 'He pokes you down before you can land E — buy MR, hug minions.' },
        { when: 'Late', text: 'Catch him once (E) and bleed deletes him — but he kites all game.' }
      ],
      wants: {
        you: ['Land E (pull) — a caught Kennen dies to bleed', 'Hug minions to dodge his Q poke', 'Buy MR + close the gap on his E cooldown'],
        foe: ['Poke you out with Q (shuriken) from range', 'Kite with E (Lightning Rush move speed)', 'Burst you with R (stun) + E when you’re low']
      },
      early: "Kennen out-ranges you and pokes with Q (shuriken) — a hard lane because you can't trade back at range, and his E (Lightning Rush) lets him dart in and out. Hug your minions to body-block the Q, last-hit carefully, and accept the chip. You can't bleed what you can't catch, so don't step into open ground where he free-pokes.",
      mid: "His damage ramps and at 6 his R (Slicing Maelstrom) is an AOE stun that, with E-Q, chunks you from range — don't be at low HP when it's up. Buy MR early. Your only path is to land E: a caught Kennen is squishy and your bleed deletes him, but he'll kite most attempts with his E and movement. Catch him on his E cooldown.",
      late: "Kennen is squishy — land E and your bleed ends him — but his whole game is kiting and poking, so you rarely get the chance. He scales into a teamfight AOE-stun threat. Win by closing on his E cooldown in skirmishes, building MR, and not letting him free-poke you down before your pull lands. Tricky and tilted his way if he kites well.",
      whys: [
        "Kennen out-ranges you with Q poke. Hug minions — you can't trade back at range.",
        "His E (Lightning Rush) darts in and out. Don't chase — farm and respect the poke.",
        "Land E and a squishy Kennen dies to bleed — but he kites most attempts.",
        "He pokes you down between trades. Buy MR, hug minions, don't step into open ground.",
        "His R (AOE stun) + E combo bursts you from range — don't be low when it's up.",
        "He out-pokes your gap-close. Land E only on his E cooldown.",
        "Catch him once and bleed deletes him — but he kites all game. Build MR, close in skirmishes."
      ]
    },
    {
      a: 'darius', b: 'singed',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E-pull catches him mid-proxy; bleed punishes the kite.' },
        { when: 'Lvl 6', text: 'R executes him; his R speed can’t outrun a landed E + bleed.' },
        { when: '1st item', text: 'Your edge holds — keep catching him with E on his fling cooldown.' },
        { when: 'Late', text: 'He splitpushes; you won lane — match his side pressure or group.' }
      ],
      wants: {
        you: ['Land E (pull) — it cancels his kite and starts the bleed', 'Punish his fling (E) cooldown with your pull', 'Snowball before he proxies into a farm lead'],
        foe: ['Proxy the wave and kite you through poison', 'Fling (E) you into bad spots with goo + R', 'Out-macro the lane without committing']
      },
      early: "Unlike most melees, you actually beat Singed — your E (Apprehend) is the answer to his kite. Land it as he flings or walks up, and your bleed punishes him before his R speed can carry him away. Don't chase him blindly through poison, but when he steps in to fling or proxy near you, pull him and stack Hemorrhage. Levels 1-3 are yours if you land E.",
      mid: "Keep catching him. Your R executes him off bleed, and his R speed steroid can't outrun a landed pull + slow (W). Punish his E (Fling) cooldown — after he flings, he's committed and your E lands clean. Don't tower-dive a Singed who can kite, but in lane your pull turns his hit-and-run game into a kill every time it connects.",
      late: "Singed becomes a splitpush/proxy menace, but you won the lane — your E-pull denied his kite all game. Match his side-lane pressure or group with your team and let your CC peel his fling in fights. Don't tilt-chase him through poison, but you hold the lane edge; convert it into towers and tempo before his macro pressure mounts.",
      whys: [
        "Your E-pull cancels his kite. Land it mid-proxy and bleed punishes him. Levels 1-3 are yours.",
        "Don't chase blindly through poison. Wait for him to step up, then pull.",
        "Your bleed all-in beats him once you land E. Punish his fling cooldown.",
        "Keep catching him — after he flings he's committed and your E lands clean.",
        "R executes him; his R speed can't outrun a landed E + slow.",
        "Your edge holds — keep pulling him on his fling cooldown. Snowball.",
        "He splitpushes late; you won lane. Match his side pressure or group — don't tilt-chase."
      ]
    },
    {
      a: 'darius', b: 'ryze',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Skill', 'Ryze'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed crush a weak-early Ryze.' },
        { when: 'Lvl 6', text: 'R executes him; dodge his W (root) — it’s his only lock.' },
        { when: '1st item', text: 'Still your stomp — deny CS so his item scaling comes late.' },
        { when: '2+ items', text: 'Ryze takes over — mana-stacked, tanky, he out-DPS your bleed.' }
      ],
      wants: {
        you: ['Land E + bleed early before his item scaling', 'Dodge his W (root) — bait it before you commit', 'Snowball before he stacks mana + items'],
        foe: ['Poke with Q-E spread combo from range', 'Lock you with W (root) to kite', 'Out-scale into a tanky, high-DPS mana mage']
      },
      early: "Ryze is weak early and scales into a tanky DPS mage, so your window is now. He pokes with Q (E spreads it), and his W is a point-blank root — his only hard CC. Levels 1-3 your E + bleed crush him; punish before he gets items. Don't get rooted from bush range into a full Q-combo, but otherwise land your pull and stack Hemorrhage.",
      mid: "Dodging his W root is the whole mid-game. If he whiffs it, he has no way to stop your all-in — E in, Q-W, and his squishy frame folds to your bleed. Bait the W before you commit, and your R executes him off stacks. Keep him off CS and deny his mana/item stacking — every minute moves the matchup toward him.",
      late: "Ryze takes over at two items — stacked mana plus tank items make him a high-DPS, hard-to-kill mage, and his root + poke control the fight. The lane is even because you crush his early and he out-scales the late. Press your spike hard, deny his farm, and end the lane before his item spikes flip the duel.",
      whys: [
        "Ryze is weak early and scales hard. E + bleed crush him now — punish before his items.",
        "His Q-E poke chips but he can't match your trade. Land your pull, stack bleed.",
        "Your full combo out-trades a weak-early Ryze. Dodge his W root, then all-in.",
        "Keep punishing — bait the W before you commit. Every level before his items is yours.",
        "R executes him; dodge his W (root) — his only lock. Without it your all-in deletes him.",
        "Still your stomp — deny CS so his item scaling comes late.",
        "Two items in, mana-stacked and tanky, he out-DPS your bleed. End it before he scales."
      ]
    },
    {
      a: 'darius', b: 'rumble',
      win: ['Darius', 'Darius', 'Skill', 'Skill', 'Rumble', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — land E past his kite; bleed crushes his squishy frame.' },
        { when: 'Lvl 6', text: 'Dodge his R (Equalizer) zone — don’t bleed-fight inside the fire.' },
        { when: '1st item', text: 'Even — close the gap on his W (shield) cooldown, then E + bleed.' },
        { when: 'Late', text: 'Even — you win if you catch him; he wins if he kites free.' }
      ],
      wants: {
        you: ['Land E to close past his W (shield) + E (slow) kite', 'Dodge his R (Equalizer) fire zone', 'Burst him with bleed once you stick'],
        foe: ['Poke with Q (Flamespitter) in his Heat window', 'Kite with W (shield + MS) and E (harpoon slow)', 'Zone you with R (Equalizer) and overheat burst']
      },
      early: "Levels 1-2 are your window — Rumble pokes with Q (Flamespitter) and kites with W (shield + move speed) and E (harpoon slow), but he's squishy AP, so land E (Apprehend) and your bleed crushes him. Walk through the poke behind minions, bait his W shield, and pull him in. Once you stick to him, his short-range damage can't out-trade your Hemorrhage.",
      mid: "It's even through the mid-game — his kite vs your pull. Bait his W shield/MS, eat the E slow on the way in, then land E and stack bleed. At 6 respect his R (The Equalizer): a long fire zone that zones and burns, so don't bleed-fight inside it. Don't let an overheated Rumble dump full burst on you in the fire; close on his cooldowns.",
      late: "Even into late — you win if you catch him, he wins if he kites free. Rumble is a kite-and-poke AP fighter; your E-pull + bleed beat him whenever you reach him, but a good Rumble plays around your pull cooldown with his shield and slow. Keep forcing the gap-close, dodge his R zone, and make him fight rather than letting him kite.",
      whys: [
        "Rumble's Q pokes but he's squishy AP. Land E past his kite and bleed crushes him. Levels 1-2 are yours.",
        "He kites with W (shield + MS) and E (slow). Bait the W, then pull.",
        "Even — close past his kite on his W cooldown, then E + bleed.",
        "Stick to him — his short-range damage can't out-trade your Hemorrhage.",
        "His R (Equalizer) is a fire zone — don't bleed-fight inside it. Dodge it first.",
        "Even — close on his cooldowns. Don't eat an overheated burst in the fire.",
        "Even late — you win if you catch him, he wins if he kites. Make him fight."
      ]
    },
    {
      a: 'darius', b: 'akali',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Akali'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — land E and bleed deletes her squishy, sustain-less frame.' },
        { when: 'Lvl 6', text: 'R executes her; her R dashes can’t escape a landed pull.' },
        { when: '1st item', text: 'Still your stomp — deny CS before her assassin item spikes.' },
        { when: '2+ items', text: 'Akali takes over — her item spikes out-burst you if you’re low.' }
      ],
      wants: {
        you: ['Land E (pull) — drag her out of shroud and bleed her', 'Out-sustain her Q poke — she has no healing', 'Kill her before her assassin item spikes'],
        foe: ['Poke with Q and hide in W (shroud) to reset', 'All-in with E + R dashes at level 6', 'Scale into a burst assassin with item spikes']
      },
      early: "You crush Akali early — she's a squishy AP assassin with no sustain, and your E + bleed delete her. Her Q pokes and her W (Twilight Shroud) gives invis to dodge and reset, but your E is a positional pull that drags her out of position regardless. Land E, stack Hemorrhage, and her poke can't out-trade your bleed. Levels 1-3 are decisively yours.",
      mid: "Keep stomping. Your bleed all-in out-trades her and your R executes her off stacks — her E and R dashes can't escape a landed pull. Her real threat is level 6: R gives her two dashes for a burst all-in, so don't be at low HP when it's up. Healthy, you run her down; deny her CS so her item spikes come late.",
      late: "Akali takes over at two items — her assassin item spikes let her burst you from shroud before your bleed matters, and she roams for picks. The lane is favoured because you dominate the early-mid; you must convert it. Snowball off the E-pull all-ins, deny her farm, and end before her items flip the duel. Don't get caught low with her R up.",
      whys: [
        "Akali is squishy with no sustain. E + bleed delete her — levels 1-3 are yours.",
        "Your E drags her out of shroud regardless of invis. Land it and stack bleed.",
        "Your full combo out-trades her — her poke can't beat your Hemorrhage.",
        "Keep her off farm — deny the assassin item spikes. Run her down.",
        "R executes her; her R dashes can't escape a landed pull. Don't be low at 6, though.",
        "Still your stomp — deny CS before her item spikes.",
        "Two items in, her spikes out-burst you if low. You own early — end it before she scales."
      ]
    },
    {
      a: 'darius', b: 'cassiopeia',
      win: ['Cassiopeia', 'Cassiopeia', 'Darius', 'Darius', 'Skill', 'Skill', 'Cassiopeia'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Cassio’s window — she out-ranges and pokes you with Q/W poison.' },
        { when: 'Lvl 3–5', text: 'Your window — land E and bleed crushes her squishy frame.' },
        { when: '1st item', text: 'Even — buy MR; her poke vs your all-in if you reach her.' },
        { when: '2+ items', text: 'Cassiopeia takes over — Rylai’s / Liandry’s kite and ground you.' }
      ],
      wants: {
        you: ['Hug minions through her Q/W poison poke', 'Land E (pull) — a caught Cassio dies to bleed', 'All-in before her item scaling; buy MR early'],
        foe: ['Poke you out with Q/W poison from range', 'Ground you with W (Miasma) to slow your chase', 'Scale into an unkitable DPS mage with Rylai’s / Liandry’s']
      },
      early: "Levels 1-2 are hers — Cassiopeia out-ranges you and pokes with Q/W poison you can't trade back into, and her W (Miasma) grounds you to keep you off her. Hug your caster minions, last-hit through the chip, and don't path through her poison cloud. Your job early is to not get poked too low before you can reach her.",
      mid: "Levels 3-5 are your window — land E (Apprehend) and a squishy Cassiopeia dies to your bleed all-in. The grounding from her W slows your chase but your pull is instant, so look for the catch when her Miasma is down. Don't sit in a poke war you lose; force the single all-in where your Hemorrhage ends her.",
      late: "Cassiopeia takes over at two items — Rylai's + Liandry's let her kite and ground you forever, out-DPSing your bleed if you can't reach her. The lane is even-ish because she pokes early and you all-in mid, but late tilts to her. Buy MR, land your E-pulls when her W is down, and end the lane before her scaling makes her unkitable.",
      whys: [
        "Cassio out-ranges you and pokes with Q/W poison. Hug minions — levels 1-2 are hers.",
        "Her W (Miasma) grounds you. Don't path through the cloud; wait for your window.",
        "Your window — land E and bleed crushes her squishy frame.",
        "All-in when her Miasma is down — your pull is instant and your bleed ends her.",
        "Even — your all-in if you reach her. Buy MR for her poke.",
        "Even — her poke vs your bleed. Force the catch when W is down.",
        "Two items in, Rylai's + Liandry's kite and ground you. End the lane before her scaling."
      ]
    },
    {
      a: 'darius', b: 'galio',
      win: ['Darius', 'Darius', 'Darius', 'Skill', 'Skill', 'Skill', 'Galio'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed out-trade him; bait his W (damage reduction).' },
        { when: 'Lvl 6', text: 'R executes him; his R is a global peel, not a 1v1 button.' },
        { when: '1st item', text: 'Even — punish the wave when he R-globals away.' },
        { when: 'Late', text: 'Galio out-tanks you — he scales to a teamfight frontliner.' }
      ],
      wants: {
        you: ['Bait his W (damage reduction) before you commit', 'Land E + bleed before he builds tanky', 'Punish the wave when he R-globals away'],
        foe: ['Poke with Q (windblast) and soak burst with W', 'Taunt you with a channeled W (Shield of Durand)', 'Roam / impact the map with global R']
      },
      early: "Levels 1-3 are yours — land E and your bleed out-trades Galio before he builds tanky. His W (Shield of Durand) reduces incoming damage and taunts if he channels it, so don't dump your combo into a raised W; bait it first. His Q pokes and his E is a dash-knockup, but his early kill pressure on you is low. Stack Hemorrhage and press.",
      mid: "Bait the W, then your bleed all-in out-trades him — he's a tanky control mage, not a duelist. Your R executes him off stacks. At 6 his R (Hero's Entrance) is a global peel/engage for other lanes, not a 1v1 button — when he ults away to help a teammate, shove and punish his wave for CS and plates. Keep him pinned and deny the roam value.",
      late: "Galio out-tanks you eventually — he builds resistances and becomes a teamfight frontliner whose W soaks your burst. The lane is even because you bully the early and he out-scales into utility. Snowball your level 1-3 edge, deny his farm, and end before his tankiness makes your bleed tickle. Don't let his global swing other lanes.",
      whys: [
        "E + bleed out-trade him — bait his W (damage reduction) first. Levels 1-3 are yours.",
        "His W reduces damage and can taunt. Wait it out, then commit your combo.",
        "Your bleed all-in out-trades a tanky mage. Force the trade, stack Hemorrhage.",
        "Keep him pinned — deny the farm that lets him build tanky.",
        "R executes him; his R is a global peel, not a duel button. Punish the wave when he ults away.",
        "Even — snowball your early edge before he scales into a frontliner.",
        "Galio out-tanks you late — he scales to a teamfight frontliner. End the lane early."
      ]
    },
    {
      a: 'darius', b: 'gwen',
      win: ['Darius', 'Darius', 'Darius', 'Skill', 'Skill', 'Skill', 'Gwen'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed crush a weak-early Gwen.' },
        { when: 'Lvl 6', text: 'R executes her; don’t chase into W (mist) — you can’t pull her from outside.' },
        { when: '1st item', text: 'Still your edge — deny farm before her AP scaling.' },
        { when: '2+ items', text: 'Gwen takes over — AP scaling + true damage shred your bleed.' }
      ],
      wants: {
        you: ['Land E + bleed before her item scaling', 'Don’t commit into her W (mist) — fight her outside it', 'Win the lane before her two-item spike'],
        foe: ['Hide in W (mist) — untargetable from outside', 'Poke with Q (true damage) and scale', 'Out-scale into an AP bruiser that shreds tanks']
      },
      early: "Levels 1-3 are yours — Gwen has a weak early game and scales into a tank-shredding AP bruiser, so punish her now. Land E and your bleed out-trades her before she gets going. Her Q deals true damage on the final snip and her E gives attack speed + a dash, but early she can't match your trade. Deny her farm and stack Hemorrhage.",
      mid: "Her W (Hallowed Mist) is the key — inside it she's untargetable to your E-pull from outside the cloud, so don't chase her in; you'll whiff and she'll snip you. Force her to fight outside the mist, where your pull + bleed win. Your R executes her off stacks. Keep her off CS — every minion she misses delays the scaling that beats you.",
      late: "Gwen takes over at two items — her AP scaling and true damage shred even a tanky Darius, and her W keeps her safe while she snips you down. The lane is even because you crush the early and she out-scales late. Snowball your level 1-3 dominance, deny her farm, and close the lane before her item spike flips the duel.",
      whys: [
        "Gwen is weak early and scales hard. E + bleed crush her now — levels 1-3 are yours.",
        "Her Q true damage + E dash come online, but she can't match your early trade. Deny her farm.",
        "Your bleed all-in out-trades a weak-early Gwen. Force the trade, take CS off her.",
        "Keep her off farm — every missed minion delays her scaling.",
        "R executes her; don't chase into her W (mist) — your pull can't reach her there.",
        "Still your edge — deny farm before her two-item spike.",
        "Two items in, AP + true damage shred your bleed. End the lane before she scales."
      ]
    },
    {
      a: 'darius', b: 'jayce',
      win: ['Jayce', 'Jayce', 'Skill', 'Darius', 'Skill', 'Darius', 'Darius'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Jayce out-pokes you hard — cannon Q + W chunk you. Hug minions.' },
        { when: 'Lvl 4–6', text: 'Your window — land E past his poke and bleed punishes him.' },
        { when: '1st item', text: 'You out-scale — close the gap and bleed him out.' },
        { when: 'Late', text: 'You take over — Jayce falls off; your all-in wins.' }
      ],
      wants: {
        you: ['Survive his early poke without dying', 'Land E to close past his cannon range, then bleed', 'Out-scale his falloff with bleed + Might'],
        foe: ['Poke from range with cannon Q + W (Hyper Charge)', 'Burst with the melee E-knockback → Q combo', 'Snowball the early poke before you out-scale']
      },
      early: "Jayce out-pokes you hard early — his cannon-stance Q (Shock Blast) through W (Hyper Charge) chunks you from range, and his melee E-knockback into Q bursts you if you walk up carelessly. Levels 1-2 are his. Hug your minions, take the poke on the chin, and don't step into a gate-empowered Shock Blast. Survive to your gap-close.",
      mid: "Your window opens once you can land E — Jayce is squishy, so a landed pull + bleed punishes him hard, and his poke can't out-trade your Hemorrhage once you're on him. Be patient through his poke, then commit when he steps up or whiffs his cannon Q. Don't get caught by the full melee burst combo while chunked.",
      late: "You take over — Jayce is a lane bully who falls off, while your bleed + Might + R execute only grow. The lane is even because he bullies the early and you own the rest. Survive his brutal poke, land E on his cannon cooldown, and grind him out; by your item spikes he can't fight you up close at all.",
      whys: [
        "Jayce out-pokes you — cannon Q + W chunk you from range. Hug minions, levels 1-2 are his.",
        "His melee E-knockback → Q bursts you if you walk up. Stay at range, take the poke.",
        "Even as he starts to fall off — survive the poke, look for your E window.",
        "Your window — land E past his poke and bleed punishes his squishy frame.",
        "Be patient — commit when he whiffs his cannon Q. Don't eat the full burst combo low.",
        "You out-scale — close the gap on his cannon cooldown and bleed him out.",
        "You take over — Jayce falls off. Land E up close; your all-in wins late."
      ]
    },
    {
      a: 'darius', b: 'kassadin',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Kassadin'],
      spikes: [
        { when: 'Lvl 1–5', text: 'Your window — Kassadin is one of the weakest early champs. E + bleed stomp him.' },
        { when: 'Lvl 6', text: 'R executes him; his R (Riftwalk) escape — all-in before he blinks.' },
        { when: '1st item', text: 'Still your stomp — deny CS + XP to delay his spike.' },
        { when: '2+ items', text: 'Kassadin takes over — at 16 + items he out-scales the game.' }
      ],
      wants: {
        you: ['Bully his brutal early — deny CS and XP relentlessly', 'Land E + bleed before his R (Riftwalk) escape', 'Build a game-ending lead before his level 16 spike'],
        foe: ['Survive lane with Q (spell shield) and farm', 'Blink away from your all-in with R (Riftwalk)', 'Out-scale into an unkillable late-game assassin']
      },
      early: "You hard-stomp Kassadin's lane — he's one of the weakest early champions and you're the strongest bully. Land E and your bleed deletes him; his Q gives a spell shield (it blocks one ability, so don't waste your combo into it) and his E slows, but he can't trade with you. Bully him off every CS and deny XP from minute one.",
      mid: "Keep him broke. Your bleed all-in out-trades him flatly, and your R executes him off stacks. At 6 his R (Riftwalk) gives a blink escape, so all-in before he can flash-blink away, and dive him under tower with jungle help. Every level and item you deny delays the hyper-carry he becomes — perma-zone him off the wave.",
      late: "Kassadin takes over hard at two items and level 16 — his Riftwalk stacking burst out-scales the entire game and he becomes nearly unkillable. The lane is even on paper precisely because you crush the early and he crushes the late. You MUST snowball this into a game-ending lead; if he farms to his spike, you lose the late game outright.",
      whys: [
        "Kassadin is one of the weakest early champs. E + bleed stomp him — bully every CS.",
        "His Q is a spell shield — don't waste your combo into it. Otherwise he can't trade you.",
        "Your bleed all-in out-trades him flatly. Deny CS + XP — starve his scaling.",
        "Keep him broke — every denied minion delays his spike. Perma-zone him.",
        "R executes him; his R (Riftwalk) is a blink escape — all-in before he blinks. Dive with jungle.",
        "Still your stomp — build a game-ending lead before level 16.",
        "Two items + 16 he out-scales the game. Crush early or lose late — snowball hard."
      ]
    },
    {
      a: 'darius', b: 'lucian',
      win: ['Lucian', 'Skill', 'Darius', 'Darius', 'Skill', 'Darius', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Lucian pokes with Q + passive double-shot — hug minions.' },
        { when: 'Lvl 3–6', text: 'Your window — land E through his dash and bleed deletes him.' },
        { when: '1st item', text: 'Your edge — a caught Lucian dies; he’s squishy.' },
        { when: 'Late', text: 'Even — he pokes and kites; you win when you land E.' }
      ],
      wants: {
        you: ['Hug minions through his Q + passive poke', 'Land E when his E (dash) is down — bleed deletes him', 'Force the all-in — he’s squishy and folds'],
        foe: ['Poke with Q (line) + passive double-shot', 'Dash around your pull with E (Relentless Pursuit)', 'Kite you and scale into a DPS marksman']
      },
      early: "Lucian top is a ranged lane bully — his Q (Piercing Light) pokes through minions, his passive double-shot chips after every ability, and his E (Relentless Pursuit) dashes to reposition. Levels 1-2 he out-ranges and pokes you; hug your minions to limit the Q, last-hit carefully, and take the chip your bleed-less early can absorb. Survive to your catch window.",
      mid: "Your window is landing E — Lucian is squishy and relies on his E dash to stay safe, so pull him when his E is down and your bleed deletes him. He can't kite you once locked in your combo. Bait the E (force him to dash early), then E-Q-W on its cooldown. Don't get poked low chasing him in open ground.",
      late: "Even into late — Lucian pokes and kites with his dashes and scales as a DPS marksman, but he never survives the all-in once you land E. The duel comes down to whether you catch him: hug minions to deny free poke, close on his E cooldown, and your bleed ends him. If he kites freely he chips you; if you land E, he dies.",
      whys: [
        "Lucian pokes with Q + passive double-shot from range. Hug minions — levels 1-2 are his.",
        "His E (Relentless Pursuit) dashes to reposition. Don't chase into open ground.",
        "Your window — land E when his E is down and bleed deletes a squishy Lucian.",
        "He kites with the E dash. Bait it out, then all-in on its cooldown.",
        "Don't get poked low chasing. Force the fight when his dash is down.",
        "Your edge — a caught Lucian dies. Land E, force the all-in.",
        "Even late — he pokes and kites, but folds when you land E. Catch him and he dies."
      ]
    },
    {
      a: 'darius', b: 'maokai',
      win: ['Darius', 'Darius', 'Skill', 'Skill', 'Maokai', 'Maokai', 'Maokai'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — E + bleed before his sustain + roots come online.' },
        { when: 'Lvl 6', text: 'Maokai’s window — his R (root wave) + sapling sustain flip it.' },
        { when: '1st item', text: 'He out-sustains your bleed — antiheal helps but he out-tanks you.' },
        { when: 'Late', text: 'Maokai scales to a CC tank that shrugs your bleed.' }
      ],
      wants: {
        you: ['Land E + bleed before his sustain + W root', 'Dodge his W (root) and the sapling (E) zone', 'Win early — you can’t out-bleed a built Maokai'],
        foe: ['Poke + sustain with E (saplings) and passive heal', 'Root you with W (Twisted Advance)', 'Out-tank you and lock you down with R (root wave)']
      },
      early: "This is a tricky lane — Maokai out-sustains your bleed. Your window is levels 1-2 before his sustain and roots ramp: land E and stack Hemorrhage while he's still beatable. His passive heals him off spells, his E (saplings) pokes and zones, and his W (Twisted Advance) roots you for a free trade. Dodge the W and punish early or not at all.",
      mid: "From 6 the lane tilts to him — his R (Nature's Grasp) is a long root wave that locks you for his combo, and his sapling + passive sustain out-heal your bleed. Grievous wounds helps, but you can't out-tank a Maokai who builds resistances. Take trades only when his W is down, and never get rooted into a full combo. Kill him fast or back off.",
      late: "Maokai scales into a CC tank that out-sustains your bleed and locks you down — resistances your AD can't punch through, plus two roots. The lane is tricky because he out-scales your damage profile. Snowball the level 1-2 window into a lead, build antiheal, and end before his sustain + items make Hemorrhage irrelevant.",
      whys: [
        "Maokai heals off spells and zones with saplings. E + bleed early — levels 1-2 are your window.",
        "His W (Twisted Advance) roots you for a free trade. Dodge it; don't path through saplings.",
        "He starts to out-sustain your bleed. Trade only when his W is down.",
        "Antiheal helps but he out-tanks you. Kill fast or back off.",
        "His R (root wave) locks you for his combo — his window. Don't get rooted into a full trade.",
        "He out-sustains your bleed with resistances. You can't crack a built Maokai.",
        "Maokai scales to a CC tank that shrugs your bleed. Win early or play for tempo."
      ]
    },
    {
      a: 'darius', b: 'sylas',
      win: ['Darius', 'Darius', 'Darius', 'Skill', 'Skill', 'Skill', 'Sylas'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed out-trade him before his W heal ramps.' },
        { when: 'Lvl 6', text: 'R executes him — but he can steal your R; bait it first.' },
        { when: '1st item', text: 'Even — commit fully; his W (heal) resets a chipped trade.' },
        { when: '2+ items', text: 'Sylas takes over — AP sustain + mobility out-scale your bleed.' }
      ],
      wants: {
        you: ['Land E + bleed before his W self-heal ramps', 'Commit fully — chip just feeds his W heal', 'Bait his E (chain stun) and don’t feed him your R'],
        foe: ['Poke with Q (double whip) and heal with W', 'Dash + chain-stun you with E', 'Steal and turn your R against you']
      },
      early: "Levels 1-3 are yours — land E and your bleed out-trades Sylas before his W self-heal ramps. He pokes with Q and heals off it, so a poke war favours him; commit to the all-in instead. His E is a two-part dash + chain stun (don't all-in into a held E), and your pull locks him in your bleed where his sustain can't keep up. Punish early.",
      mid: "Respect his R — he can steal YOUR Noxian Guillotine and use its execute against you, so bait it out or fight when it's down. Your own R executes him off stacks. Commit fully to all-ins because his W heals a chipped trade back; force the single decisive fight, not the drawn-out poke war his sustain wins.",
      late: "Sylas takes over at two items — AP sustain + mobility out-scale your bleed, and his W out-heals your Hemorrhage in extended fights. The lane is even because you bully the early and he out-sustains the late. Snowball your level 1-3 edge, force fast committed kills, and end before his items flip the duel. Don't feed him a stolen R.",
      whys: [
        "E + bleed out-trade him before his W heal ramps. Levels 1-3 are yours.",
        "His Q poke + W heal favour a poke war. Commit to the all-in instead.",
        "Your bleed all-in out-trades him — but his E is a dash + chain stun. Don't all-in into a held E.",
        "Commit fully — chip just feeds his W heal. Force the single decisive fight.",
        "R executes him — but he can steal yours. Bait it before you commit your R.",
        "Even — commit fully; his W resets a chipped trade. Force fast kills.",
        "Two items in, AP sustain + mobility out-scale your bleed. End it before he scales."
      ]
    },
    {
      a: 'darius', b: 'graves',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Graves'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E-pull + bleed out-trade his shotgun before he scales.' },
        { when: 'Lvl 6', text: 'R executes him; don’t all-in through his W (smoke) blind.' },
        { when: '1st item', text: 'Still your edge — bait the smoke, then E + bleed.' },
        { when: '2+ items', text: 'Graves takes over — his DPS scaling out-trades your bleed.' }
      ],
      wants: {
        you: ['Land E-pull + bleed before his DPS scaling', 'Bait his W (smoke) — don’t all-in through the blind', 'Win the early before his item spikes'],
        foe: ['Burst you with shotgun Q + E (dash + armor)', 'Blind + slow you with W (Smoke Screen)', 'Out-trade you late with his marksman DPS']
      },
      early: "Levels 1-3 are yours — your E-pull + bleed out-trade Graves' shotgun before he scales. His Q (double-shot) is heavy point-blank burst and his E dashes + stacks armour, but a landed pull locks him in your Hemorrhage where he can't kite. His W (Smoke Screen) blinds and slows to shut off your autos, so bait it before you commit your combo.",
      mid: "Keep punishing. Your bleed all-in out-trades him and your R executes off stacks — but don't all-in through his W blind (it cancels your auto-attacks mid-combo). Bait the smoke or fight when it's down, then land E and stack Hemorrhage. His damage is cooldown-reliant burst, so punish him after he dumps Q-E.",
      late: "Graves takes over at two items — his marksman DPS out-trades your bleed in the extended fight once he's itemized. The lane is favoured because you dominate the early-mid; you must convert it. Snowball off the E-pull all-ins, bait his smoke, deny his farm, and end before his DPS scaling flips the duel.",
      whys: [
        "E-pull + bleed out-trade his shotgun before he scales. Levels 1-3 are yours.",
        "His E dashes + stacks armour, but a landed pull locks him in your bleed. Force it.",
        "Your bleed all-in out-trades him — bait his W smoke before you commit.",
        "Keep punishing — don't all-in through the blind. Fight when his W is down.",
        "R executes him; punish him after he dumps Q-E (cooldown-reliant burst).",
        "Still your edge — bait the smoke, then E + bleed. Deny his farm.",
        "Two items in, his DPS scaling out-trades your bleed. End it before that."
      ]
    },
    {
      a: 'darius', b: 'heimerdinger',
      win: ['Heimerdinger', 'Heimerdinger', 'Darius', 'Skill', 'Skill', 'Darius', 'Heimerdinger'],
      spikes: [
        { when: 'Lvl 1–2', text: 'His turrets zone your CS — clear turrets, dodge the E stun.' },
        { when: 'Lvl 3–6', text: 'Your window — land E past the turrets and bleed deletes him.' },
        { when: '1st item', text: 'Even — bait/dodge the E (grenade) stun, then pull him.' },
        { when: 'Late', text: 'Even — his turret zone vs your all-in; respect the E grenade.' }
      ],
      wants: {
        you: ['Land E (pull) past his turrets — bleed deletes a squishy Heimer', 'Dodge his E (grenade stun) — it sets up his combo', 'Clear turrets so they can’t kite you'],
        foe: ['Zone your CS with H-28 turrets (Q)', 'Poke with W (rockets) and stun with E (grenade)', 'Wall you off and scale his turret damage with R']
      },
      early: "Heimerdinger zones you with turrets (Q) — they deny your CS and poke whenever you step up — and his E (grenade) stuns to set up his W rocket poke. Levels 1-2, clear turrets when you can, dodge the E stun (it's his whole combo setup), and accept that last-hitting under his zone is awkward. Don't facecheck for the grenade.",
      mid: "Your path is landing E — Heimer is squishy and immobile, so a pull past his turrets into your bleed deletes him. The hard part is the E grenade stun, which interrupts your engage. Bait or dodge the E, then pull and stack Hemorrhage. Clear his turrets first so they can't kite you with their damage while he repositions.",
      late: "Even — his turret zone control versus your all-in threat. He'll wall off chokes and his R upgrades his turret damage, but in a straight fight he's a squishy with no escape and your bleed ends him. Respect the E grenade stun, clear turrets before you commit, and land E whenever you reach him. Don't get poked out sieging his zone.",
      whys: [
        "Heimer's turrets (Q) zone your CS and poke you. Clear turrets — last-hit is awkward.",
        "His E (grenade) stuns to set up his W rockets. Dodge it — don't facecheck the grenade.",
        "Your window — land E past the turrets and bleed deletes a squishy Heimer.",
        "Clear his turrets first so they can't kite you. Then force the trade.",
        "Even — bait the E stun, then pull and stack Hemorrhage.",
        "Even — land E whenever you reach him. His turret zone vs your all-in.",
        "Even — his turret zone vs your all-in. Respect the E stun, clear turrets, delete him on the pull."
      ]
    },
    {
      a: 'darius', b: 'sejuani',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Skill', 'Sejuani'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed out-trade her weak damage; dodge her Q (charge).' },
        { when: 'Lvl 6', text: 'R executes her; her R is a teamfight stun, not a duel button.' },
        { when: '1st item', text: 'Still your edge — she has low solo kill pressure.' },
        { when: 'Late', text: 'Sejuani out-tanks you — she scales to a teamfight engage tank.' }
      ],
      wants: {
        you: ['Out-trade her weak early before she stacks tanky', 'Dodge her Q (charge) and avoid the Frost (E) stun', 'Snowball — she has low solo kill pressure'],
        foe: ['Engage with Q (charge knockup)', 'Stack Frost (E) for a stun, farm and scale', 'Become a teamfight engage tank with R']
      },
      early: "Levels 1-3 are yours — Sejuani is a weak early laner with low damage who wants to farm and scale. Land E and your bleed out-trades her; her Q is a charge knockup (dodgeable) and her E stacks Frost for a stun, but she can't win the trade. Sidestep the Q, don't let her free-stack Frost on you, and bully her off CS.",
      mid: "Keep punishing. Your bleed all-in out-trades her, and your R executes off stacks. Her W cleaves and her passive adds true damage, but it's not enough to beat your Hemorrhage. At 6 her R is a long-range engage stun for teamfights, not a button that wins the duel, so don't fear it in lane — just don't get chain-CC'd into her jungler.",
      late: "Sejuani out-tanks you eventually — she scales into a teamfight engage tank with resistances your bleed can't crack. The lane is even because you bully the early and she out-scales into utility. Snowball your level 1-3 dominance, take plates, and end before her tankiness matters; the game becomes about her R engage, not the 1v1 you own.",
      whys: [
        "Sejuani is a weak early laner with low damage. E + bleed out-trade her — dodge her Q charge.",
        "Don't let her free-stack Frost (E) for the stun. Bully her off CS while she's weak.",
        "Your bleed all-in out-trades her. Force the trade, deny her farm.",
        "You out-trade her — her cleave + true damage can't beat your Hemorrhage.",
        "R executes her; her R is a teamfight engage stun, not a duel button. Don't get chain-CC'd.",
        "Still your edge — she has low kill pressure. Snowball before she builds tanky.",
        "Sejuani out-tanks you late — she scales to a teamfight engage tank. End early."
      ]
    },
    {
      a: 'darius', b: 'zac',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Zac'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed crush a weak-early Zac.' },
        { when: 'Lvl 6', text: 'R executes him; out-DPS his blob heals, deny the reset.' },
        { when: '1st item', text: 'Still your stomp — step on his blobs, bring grievous wounds.' },
        { when: '2+ items', text: 'Zac takes over — HP-stacking tank shrugs off your bleed.' }
      ],
      wants: {
        you: ['Bully his weak early — he has low kill pressure', 'Deny CS + his passive blobs; bring grievous wounds', 'Snowball before his HP/heal tank scaling'],
        foe: ['Poke with Q (stretchy arm) and farm safely', 'Sustain with passive blobs + W', 'Scale into an HP-stacking teamfight tank with R']
      },
      early: "Levels 1-3 are yours — Zac is a weak early laner with little kill pressure, and your E + bleed crush him. He pokes with Q (stretchy arm) and chips with W, but he just wants to farm and scale. Land your pull, stack Hemorrhage, deny CS, and step on his passive blobs so he can't pick them up to heal. Bully him hard now.",
      mid: "Keep stomping. Your bleed all-in out-trades him and your R executes off stacks — but his passive blob-heals reset your pressure, so bring grievous wounds (Bramble/Executioner's) and out-DPS the heals. His R at 6 is a teamfight engage, not a 1v1 button. Deny CS and snowball off the bleed all-ins before he stacks HP.",
      late: "Zac takes over at two items — an HP-stacking regen tank that your AD bleed can't crack, and his blob heals out-sustain everything. The lane is favoured because you crush the early; you must convert it. Snowball the level 1-3 stomp, build antiheal, and end the game before his HP makes Hemorrhage irrelevant.",
      whys: [
        "Zac is a weak early laner with low kill pressure. E + bleed crush him — levels 1-3 are yours.",
        "Step on his passive blobs so he can't heal. Bully him off CS.",
        "Your bleed all-in out-trades him. Force the trade, deny his farm.",
        "Keep stomping — bring grievous wounds; his blob heals reset your pressure.",
        "R executes him; out-DPS his blob heals and deny the reset. His R is teamfight engage.",
        "Still your stomp — step on his blobs, snowball before his HP scaling.",
        "Two items in, HP-stacking tank shrugs your bleed. End the game before that."
      ]
    },
    {
      a: 'darius', b: 'ziggs',
      win: ['Ziggs', 'Skill', 'Darius', 'Skill', 'Skill', 'Darius', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Ziggs pokes from max range with Q — hug minions, take the chip.' },
        { when: 'Lvl 3–6', text: 'Your window — land E past his satchel and bleed deletes him.' },
        { when: '1st item', text: 'Your edge — a caught Ziggs dies; bait his W (satchel) first.' },
        { when: 'Late', text: 'Even — close the gap; his only escape is W (satchel).' }
      ],
      wants: {
        you: ['Hug minions to dodge his Q bomb poke', 'Land E when his W (satchel) is down — bleed deletes him', 'Bait his satchel escape before you commit'],
        foe: ['Poke from max range with Q (bouncing bomb)', 'Escape your pull with W (Satchel Charge)', 'Zone you with E (minefield) and nuke with R']
      },
      early: "Ziggs is pure artillery — his Q (bouncing bomb) out-ranges everything and pokes you whenever you step to CS, and his E lays a slowing minefield to keep you out. He has no stun, but his W (Satchel Charge) blasts him to safety from your pull. Levels 1-2, hug your minions to body-block the Q, take the chip, and don't path through the minefield.",
      mid: "Your window is landing E — Ziggs is squishy and immobile except for the W satchel, so pull him when his satchel is down and your bleed deletes him. He can't kite you once you're on top of him. Bait or eat the W, then E-Q-W and stack Hemorrhage. Force him to burn satchel early, then all-in on its cooldown.",
      late: "Even into late — if you reach Ziggs he dies, but his range and zone control keep him safe. Close on his satchel cooldown, deny him free poke by hugging minions, and land E to end him. Don't get chunked sieging his minefield; pick your gap-close and commit when his escape is down. The lane hinges on the one clean pull.",
      whys: [
        "Ziggs out-ranges you with Q bomb poke. Hug minions — take the chip. Levels 1-2 are his.",
        "His E minefield zones you out. Don't path through it — wait for your window.",
        "Your window — land E when his satchel is down and bleed deletes a squishy Ziggs.",
        "He has no stun, only the W satchel escape. Bait it, then commit.",
        "Force him to burn satchel, then all-in on its cooldown.",
        "Your edge — a caught Ziggs dies. Bait the W first, then pull.",
        "Even late — close on his satchel cooldown. His only escape is W; land E and he dies."
      ]
    },
    {
      a: 'darius', b: 'akshan',
      win: ['Akshan', 'Akshan', 'Darius', 'Skill', 'Skill', 'Darius', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Akshan pokes with Q + autos and swings around terrain — hug minions.' },
        { when: 'Lvl 3–6', text: 'Your window — land E when his E (swing) is down and bleed deletes him.' },
        { when: '1st item', text: 'Your edge — a caught Akshan dies; deny his roams.' },
        { when: 'Late', text: 'Even — he kites and roams; you win when you land E.' }
      ],
      wants: {
        you: ['Hug minions through his Q (boomerang) + auto poke', 'Land E when his E (swing) is down — bleed deletes him', 'Deny his roams; punish the wave when he leaves'],
        foe: ['Poke with Q (Avengerang) + passive double-shot', 'Swing around terrain with E (Heroic Swing)', 'Roam and pick with R (Comeuppance sniper)']
      },
      early: "Akshan is a slippery ranged skirmisher — he pokes with Q (Avengerang) and autos, and his E (Heroic Swing) lets him swing off terrain to kite and reposition around you. Levels 1-2 he out-ranges and out-mobilities you; hug your minions to limit the poke, don't chase his swing into open ground, and accept some chip. Wait for your catch window.",
      mid: "Your window is landing E — when his swing is on cooldown, pull him and your bleed deletes his squishy frame. The problem is he rarely gives that window: the swing resets and kites you. Bait the E, then commit your pull on its cooldown. At 6 his R (Comeuppance) is long-range execute-poke and a roam threat, so don't get caught stepping up, and track his roams.",
      late: "Even into late — Akshan kites with his swing and roams for picks with R, and you only win the exchange when you land E. Hug minions to deny free poke, close on his E cooldown, and punish his roams by taking the wave. If he swings freely he chips you; your whole game is the one clean pull that lets your bleed finish him.",
      whys: [
        "Akshan pokes with Q + autos and swings around terrain. He out-ranges you — hug minions, take chip.",
        "His E (Heroic Swing) kites off terrain. Don't chase it into open ground.",
        "Your window — land E when his swing is down and bleed deletes him.",
        "He resets the swing constantly. Bait the E, then pull on its cooldown.",
        "His R is long-range execute-poke + a roam threat — don't get picked stepping up.",
        "Your edge — a caught Akshan dies. Close on his E cooldown; deny his roams.",
        "Even late — he kites and roams. You win when you land E; hug minions, punish roams."
      ]
    },
    {
      a: 'darius', b: 'ambessa',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Ambessa', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed out-trade her; bait her E (shield-brace).' },
        { when: 'Lvl 6', text: 'Ambessa’s window — her R (blink + suppress) is a hard all-in.' },
        { when: '1st item', text: 'Your edge — your bleed out-trades her dash combo.' },
        { when: 'Late', text: 'You hold the edge — out-bleed her in the extended fight.' }
      ],
      wants: {
        you: ['Land E + bleed before she chains her dash combo', 'Bait her E (Repudiation shield) before committing', 'Respect her R (suppress) — don’t get caught low'],
        foe: ['Chain dashes (passive) into the Q → W combo', 'Brace your burst with E (shield + counter-smash)', 'All-in with R (blink behind + suppress + stun)']
      },
      early: "Levels 1-3 are yours — land E and your bleed out-trades Ambessa before she chains her dash combo. Her passive grants free dashes, her Q enables her W (line slam) for burst, and her E (Repudiation) braces for a shield then smashes harder if it absorbed your damage — so don't dump your combo into her E. Bait it, then pull her in and stack Hemorrhage.",
      mid: "Through the mid-game your bleed holds the extended fight — she out-bursts in a short window with her dash combo, but you out-grind her once you land E and don't get chunked. Her big spike is R (Public Execution): she blinks behind you, suppresses, and stuns for a full combo, so don't be at low HP when it's up. Respect that all-in window.",
      late: "You hold the edge — your bleed + R execute out-grind her in the extended fight, and a landed pull cancels her mobility. The lane is favoured because you bully the early and trade well throughout. Force the long all-in where your Hemorrhage beats her burst, bait her E shield, and play around her R (the suppress is her main kill threat). Don't get caught low.",
      whys: [
        "E + bleed out-trade her before her dash combo. Levels 1-3 are yours.",
        "Her E (Repudiation) shields then smashes harder if it absorbed your hit. Don't dump burst into it.",
        "Your bleed all-in out-trades her — bait the E, then pull her in.",
        "You out-grind her in extended fights once you land E. Keep it long, not bursty.",
        "Her R blinks behind you, suppresses and stuns for a full combo — don't be low when it's up.",
        "Your edge — your bleed out-trades her dash combo. Force the long all-in.",
        "You hold the edge late — out-bleed her in the extended fight. Play around her R."
      ]
    },
    {
      a: 'darius', b: 'aurora',
      win: ['Darius', 'Darius', 'Darius', 'Skill', 'Aurora', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E + bleed out-trade her; she has no escape but W.' },
        { when: 'Lvl 6', text: 'Aurora’s window — R zone + untargetability let her escape your all-in.' },
        { when: '1st item', text: 'Even — catch her with E when her W (dash) is down.' },
        { when: 'Late', text: 'Even — her mobility + poke vs your bleed; land E to win.' }
      ],
      wants: {
        you: ['Land E when her W (dash) is down — bleed deletes her', 'Out-trade her Q/E poke before her item scaling', 'Punish her after she commits her W escape'],
        foe: ['Poke with Q (bolt) + E (80% slow) and self-heal', 'Dodge your pull with W (dash + invisibility)', 'Zone and escape with R (untargetable rift)']
      },
      early: "Levels 1-3 are yours — Aurora is a mobile AP skirmisher, but land E and your bleed out-trades her. Her Q pokes (recast for missing-HP damage), her E slows you 80% while recoiling her back, and her passive heals her off you — but her only real escape is her W (a dash into invisibility). Don't commit your pull while her W is up to dodge it; bait it first.",
      mid: "Your window is catching her when her W dash is on cooldown — pull her into your bleed and she can't kite. Bait the W out (force her to use it), then re-engage and stack Hemorrhage. Her level-6 R creates a rift she can dash through to become untargetable, so it's a strong escape from your all-in — respect it and commit when it's down.",
      late: "Even into late — her mobility and poke versus your bleed. The duel comes down to whether you land E before she dashes; if you do, your Hemorrhage out-trades her, and if she kites freely she pokes you down. Force fights on her W cooldown, punish her after she commits an escape, and don't chase her into her R rift.",
      whys: [
        "E + bleed out-trade her — she has no escape but W. Levels 1-3 are yours.",
        "Her W is a dash into invisibility. Don't commit your pull while it's up to dodge.",
        "Your bleed all-in out-trades her — bait the W, then pull her in.",
        "Catch her when her W dash is down — pull her into your bleed and she can't kite.",
        "Her R rift lets her dash to untargetability — a strong escape. Respect it, commit when it's down.",
        "Even — land E when her W is down. Out-trade her poke.",
        "Even late — her mobility + poke vs your bleed. Land E to win; don't chase into her R rift."
      ]
    },
    {
      a: 'darius', b: 'karma',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Karma'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — land E and bleed deletes a squishy Karma.' },
        { when: 'Lvl 6', text: 'R executes her; bait her E (shield) before committing.' },
        { when: '1st item', text: 'Your edge — she has no kill threat; deny her farm.' },
        { when: 'Late', text: 'You own the 1v1 — she’s a poke/utility mage, not a duelist.' }
      ],
      wants: {
        you: ['Land E (pull) — a caught Karma dies to bleed', 'Bait her E (shield + MS) before you all-in', 'Don’t get kited by her W (root tether)'],
        foe: ['Poke with Q (Inner Flame) — empowered by R (Mantra)', 'Root you with W (Focused Resolve) tether', 'Self-peel with E (shield + move speed)']
      },
      early: "Levels 1-3 are yours — land E and your bleed deletes a squishy Karma. She pokes with Q (Mantra-empowered) and peels herself with E (shield + move speed). Her W (Focused Resolve) is a tether that roots if she channels it fully — don't let her hold it on you while she kites, and don't trade into a fresh E shield. Pull her in and stack Hemorrhage.",
      mid: "Your path is catching her — Karma is squishy and her only defensive tools are the E shield and the W kite. Bait the E, then E-pull and your bleed all-in deletes her; your R executes off stacks. Don't get rooted by a full W tether mid-engage; close the distance fast. Once you're on her with no shield up, she folds.",
      late: "You own the 1v1 — Karma is a poke/utility mage, not a side-lane duelist. If you reach her she dies, and your bleed makes it quick. Press the lane, deny her poke by hugging minions, and don't get kited by W + E. Her value is utility for her team, not beating you one-on-one. Snowball your dominance.",
      whys: [
        "Karma pokes with Q and shields with E. Land E and bleed deletes her — levels 1-3 are yours.",
        "Her W (Focused Resolve) tethers and roots if she channels it. Break it or close fast.",
        "Your bleed all-in out-trades a squishy Karma — bait the E, then commit.",
        "Don't get kited by W + E. Force the gap-close when her shield is down.",
        "R executes her; bait her E (shield) before committing. She can't trade back.",
        "Your edge — she has no kill threat. Deny her farm, snowball.",
        "You own the 1v1 — she's a poke/utility mage. Hug minions, press your edge."
      ]
    },
    {
      a: 'darius', b: 'lillia',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Lillia'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — E-pull cancels her kite; bleed crushes her.' },
        { when: 'Lvl 6', text: 'R executes her; don’t get put to sleep by her R (Dream-Laden Bough).' },
        { when: '1st item', text: 'Your edge — deny farm before her AP on-hit scaling.' },
        { when: '2+ items', text: 'Lillia takes over — AP on-hit + mobility kite and shred you.' }
      ],
      wants: {
        you: ['Land E to cancel her Q (swirl) + E (dash) kite', 'Punish her after she commits her E dash', 'Win before her AP scaling comes online'],
        foe: ['Kite with Q (swirl) movement + E (dash + slow)', 'Stack passive burn and scale AP on-hit', 'Set up ganks / picks with R (sleep)']
      },
      early: "Levels 1-3 are yours — Lillia is a mobile AP skirmisher who kites, but your E (Apprehend) cancels her kite and locks her in your bleed. Her Q (Blooming Blows) ramps her move speed and her E is a dash + slow, so don't whiff your pull chasing a dancing Lillia; wait for a clean E, then stack Hemorrhage. She has no hard early trade.",
      mid: "Keep punishing. Your bleed all-in out-trades her and your R executes off stacks. Punish her after she commits her E dash — she's locked on the return path and can't escape your pull. At 6 respect her R (Dream-Laden Bough): a delayed sleep that sets up a burst all-in or a gank, so don't get drowsy-then-slept in a bad spot.",
      late: "Lillia takes over at two items — AP on-hit damage plus her constant mobility let her kite and shred you while staying out of your reach. The lane is favoured because you out-trade her early and she scales past you. Snowball off the E-pull all-ins, land your pulls, and build a lead before her items flip the duel. Don't get slept and bursted.",
      whys: [
        "Lillia kites with Q move speed + E dash. E-pull cancels it — levels 1-3 are yours.",
        "She has no hard early trade. Don't whiff your pull chasing — wait for a clean E.",
        "Your bleed all-in out-trades a pinned Lillia. Force the trade, deny her farm.",
        "Punish her after she commits E (locked into the return). Land E first.",
        "R executes her; her R is a delayed sleep — don't get slept in a bad spot.",
        "Your edge — deny farm before her AP on-hit scaling.",
        "Two items in, AP on-hit + mobility kite and shred you. End it before she scales."
      ]
    },
    {
      a: 'darius', b: 'mel',
      win: ['Mel', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1', text: 'Mel pokes from range with Q — hug minions, take the chip.' },
        { when: 'Lvl 2–6', text: 'Your window — land E past her poke and bleed deletes her.' },
        { when: '1st item', text: 'Your stomp — a caught Mel dies; dodge her E (root).' },
        { when: 'Late', text: 'You own the 1v1 — she’s a teamfight poke mage with no escape.' }
      ],
      wants: {
        you: ['Hug minions through her Q (Radiant Volley) poke', 'Land E — a caught Mel dies to bleed (her W reflect is melee-proof)', 'Dodge her E (Solar Snare root) that sets up her damage'],
        foe: ['Poke from range with Q (Radiant Volley)', 'Root you with E (Solar Snare) to land poke / R', 'Self-peel with W (shield + move speed)']
      },
      early: "Mel is a squishy artillery mage — at level 1 she pokes you with Q (Radiant Volley) from range and her E (Solar Snare) roots you to land more. Her W (Rebuttal) reflects projectiles, but your kit is melee so it's just a shield + move-speed peel against you — it can't stop your bleed. Hug minions through the early poke and dodge the E root.",
      mid: "Your window opens fast — Mel has no real escape but the W move-speed, and she's squishy. Land E (Apprehend) past her poke and your bleed deletes her; a landed pull plus Hemorrhage ends her. Dodge or bait the E root (it's how she sets up her damage and R), then commit. This is one of your best lanes once you close the gap.",
      late: "You own the 1v1 — if you reach Mel she dies, full stop. Her threat is ranged poke and her R (a global mark-execute in teamfights), not the side-lane duel. Close on her W cooldown, deny free poke by hugging minions, and end the lane. Don't get rooted into her combo; dodge the E and you win every all-in. Snowball your dominance.",
      whys: [
        "Mel pokes from range with Q (Radiant Volley). Hug minions, take the chip. Level 1 is hers.",
        "Your window — land E past her poke and bleed deletes her squishy frame.",
        "Her W reflects projectiles but you're melee — it can't stop your bleed. Keep closing.",
        "Dodge her E (Solar Snare root) that sets up her poke. Then commit your pull.",
        "A caught Mel dies — land E and stack Hemorrhage. One of your best lanes.",
        "Your stomp — deny free poke, close on her W cooldown.",
        "You own the 1v1 — she's a teamfight poke mage. Dodge the E and win every all-in."
      ]
    },
    {
      a: 'darius', b: 'nautilus',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Skill', 'Nautilus'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — dodge his Q (hook), then E + bleed out-trade him.' },
        { when: 'Lvl 6', text: 'R executes him; his R (knockup) is a pick/peel tool, not a duel button.' },
        { when: '1st item', text: 'Still your edge — he has low damage; deny his farm.' },
        { when: 'Late', text: 'Nautilus out-tanks you — he scales to a CC frontliner.' }
      ],
      wants: {
        you: ['Dodge his Q (Dredge Line hook) — it starts everything', 'E + bleed out-trade his low damage', 'Snowball before he builds tanky'],
        foe: ['Hook you in with Q (Dredge Line)', 'Chunk with W (shield + on-hit) + E (AOE)', 'Lock you down with R + passive root for a gank']
      },
      early: "Levels 1-3 are yours — Nautilus is a CC tank with low damage, and his whole trade starts with the Q hook (Dredge Line). Dodge it and he has nothing; eat it and he gets a free W (shield + bonus damage) and E on you. Sidestep the hook from bush range, then land your own E and your bleed out-trades his low-damage frame.",
      mid: "Keep punishing. Without the hook he can't engage, and his W shield + E poke don't out-trade your Hemorrhage. Your R executes him off stacks. At 6 his R is a single-target knockup — a pick/peel tool that's dangerous with a jungler around (his passive also roots), but in a straight duel it doesn't beat you. Dodge the hook, all-in, and track his R for ganks.",
      late: "Nautilus out-tanks you eventually — he scales into a teamfight CC frontliner with resistances your bleed cracks less over time. The lane is even because you bully the early and he out-tanks the late. Snowball your level 1-3 dominance, deny his farm, and end before his tankiness matters. Respect his R + jungler for picks, but never fear the 1v1.",
      whys: [
        "Nautilus' trade starts with the Q hook. Dodge it from bush range and he has nothing.",
        "Eat the hook and he gets a free W + E. Sidestep it — that's the whole matchup.",
        "Land your own E and bleed out-trades his low-damage frame. Force the trade.",
        "Without the hook he can't engage. Keep punishing; deny his farm.",
        "R executes him; his R is a pick/peel tool, not a duel button. You win the 1v1.",
        "Still your edge — he has low damage. Snowball before he builds tanky.",
        "Nautilus out-tanks you late — he scales to a CC frontliner. End early; respect his R for picks."
      ]
    },
    {
      a: 'darius', b: 'neeko',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Neeko'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — land E and bleed deletes her squishy frame.' },
        { when: 'Lvl 6', text: 'R executes her; dodge her R (Pop Blossom AOE stun) windup.' },
        { when: '1st item', text: 'Your edge — deny CS before her burst scaling.' },
        { when: 'Late', text: 'You own the 1v1 — she’s a teamfight burst mage, not a duelist.' }
      ],
      wants: {
        you: ['Land E (pull) — a caught Neeko dies to bleed', 'Bait her E (root) before you commit', 'Dodge her R (stun) windup at level 6'],
        foe: ['Poke with Q (Blooming Burst) and root with E', 'Disguise as a minion/ally with W (clone)', 'All-in with R (Pop Blossom AOE stun)']
      },
      early: "Levels 1-3 are yours — Neeko pokes with Q and her E (Tangle-Barbs) roots you to set up damage, but she's squishy and built for picks, not dueling. Land E and your bleed deletes her. Her W disguises her (as a minion or ally), so don't get fooled by a clone. Dodge the E root, pull her in, and stack Hemorrhage.",
      mid: "Keep stomping. Bait the E root, then E-pull and your bleed all-in folds her squishy frame; your R executes off stacks. At 6 respect her R (Pop Blossom): a delayed AOE stun she leaps in with, often from a disguise, so watch the windup and don't get caught flat-footed. Land your pull and she dies; she can't trade back.",
      late: "You own the 1v1 — Neeko is a teamfight burst/pick mage, not a side-lane duelist. If you reach her she dies, and your bleed makes it instant. Press the lane, deny her roams (her R + disguise are pick tools), and don't facecheck a 'minion' that might be her W clone. The duel is always yours; snowball your dominance.",
      whys: [
        "Neeko pokes with Q and roots with E, but she's squishy. Land E and bleed deletes her.",
        "Her W disguises her as a minion or ally — don't get fooled by a clone. Dodge the root.",
        "Your bleed all-in folds her squishy frame — bait the E root, then commit.",
        "Keep her off farm — deny the burst scaling. Land your pull.",
        "R executes her; dodge her R (Pop Blossom) AOE stun windup at 6.",
        "Your edge — deny CS before her burst scaling.",
        "You own the 1v1 — she's a teamfight pick mage. Don't facecheck her clones; press your edge."
      ]
    },
    {
      a: 'garen', b: 'darius',
      win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Garen'],
      spikes: [
        { when: 'Lvl 1–5', text: 'Darius’s window — his E-pull + bleed out-trade you. Use W to survive.' },
        { when: 'Lvl 6', text: 'His R executes off bleed — stay above the threshold, W the all-in.' },
        { when: '1st item', text: 'It stabilizes — your regen + W shield even out his bleed trades.' },
        { when: 'Late', text: 'You edge it — you out-scale tanky while his bleed falls off.' }
      ],
      wants: {
        you: ['Use W (damage reduction) to survive his bleed all-in', 'Q-silence to cut his combo, then disengage to regen', 'Out-scale him tanky — his bleed falls off late'],
        foe: ['Land E (pull) to start the bleed all-in', 'Stack Hemorrhage and R-execute you', 'Win before your regen + tankiness come online']
      },
      early: "Darius owns the early — his E (Apprehend) pull yanks you into his bleed, and his Q heals while his passive shreds you. Don't get pulled: stand away from him, last-hit carefully, and use W (Courage) to eat his all-in damage when he commits. Your Q silences his combo for a short trade, but levels 1-5 are his window — survive without feeding the snowball.",
      mid: "Watch his R (Noxian Guillotine): it executes you off five bleed stacks, so keep your HP above the threshold and pop W to survive the all-in. Q-silence him to cut the combo, then disengage and regen with your passive — don't sit in a drawn-out bleed war you lose. From your first item the lane stabilizes as your tankiness catches up.",
      late: "You edge it late — you out-scale Darius into a tanky bruiser while his front-loaded bleed falls off, and your R execute + Villain mark stay relevant. Survive his level 1-5 window with W and regen, deny the snowball, and the back half is yours. Don't get caught by a low-HP R, but in the extended game your durability wins.",
      whys: [
        "Darius's E-pull starts the bleed all-in. Stand back, last-hit, use W to survive — levels 1-5 are his.",
        "His Q heals and his passive bleeds you. Q-silence to cut a trade, then disengage and regen.",
        "His full combo off the E hurts. Pop W (damage reduction) to eat it; don't trade into the pull.",
        "Keep your HP up and regen between trades. Don't bleed out in a long fight.",
        "His R executes off bleed stacks — stay above the threshold, W the all-in.",
        "It stabilizes — your regen + W shield even out his bleed trades. Hold the lane.",
        "You edge it late — out-scale him tanky while his bleed falls off. Your R stays relevant."
      ]
    },
    {
      a: 'garen', b: 'aatrox',
      win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — Q-silence trades beat his weak early.' },
        { when: 'Lvl 3–6', text: 'Aatrox’s window — his sustain out-heals your short trades.' },
        { when: '1st item', text: 'His Eclipse spike — out-sustains your Q-E; trade short, then regen.' },
        { when: 'Late', text: 'Even — your R execute + tankiness vs his drain-tank sustain.' }
      ],
      wants: {
        you: ['Win short Q-silence trades at level 1-2', 'Trade then disengage — don’t let him heal a long fight', 'Use R execute + Villain to punish him low'],
        foe: ['Out-sustain your short trades with his healing', 'Space the Q sweetspot and W-pull you in', 'Drain-tank the extended fight you can’t disengage']
      },
      early: "Levels 1-2 are your window — Aatrox is one of the weakest early juggernauts, and your Q-silence trade beats him before his combo and sustain come online. Poke with Q, eat little in return, and don't let him reach his level-3 spike for free. Once his sustain is up, short decisive trades are your friend, not drawn-out fights.",
      mid: "From 3 his sustain flips it — he out-heals your short trades and his W-pull locks you in his Q sweetspot. Don't sit in an extended fight his drain-tank wins; trade with Q-silence to deny his combo, then disengage and regen with your passive. His Eclipse spike at first item out-sustains your damage, so pick your trades and don't overstay.",
      late: "Even into late — your R execute + Villain mark and tanky scaling versus his drain-tank sustain. You can't out-DPS his healing in a long fight, so play for short bursts, R-execute him when he's low, and rely on your durability. Don't get caught in a sustained 1v1 where his lifesteal grinds you down; force the fight on your terms.",
      whys: [
        "Aatrox is weak early. Your Q-silence trade beats him at level 1-2 — punish before his spike.",
        "Poke with Q and don't let him reach level 3 for free. Short trades favour you.",
        "His sustain comes online — he out-heals your short trades. Trade then disengage.",
        "Don't sit in an extended fight his drain-tank wins. Q-silence, then regen.",
        "His W-pull locks you in his sweetspot. Pop W, trade short, don't overstay.",
        "His Eclipse spike out-sustains your Q-E. Pick your trades, regen between them.",
        "Even late — your R execute + tankiness vs his sustain. Burst short, don't grind long."
      ]
    },
    {
      a: 'garen', b: 'fiora',
      win: ['Garen', 'Skill', 'Skill', 'Skill', 'Skill', 'Skill', 'Fiora'],
      spikes: [
        { when: 'Lvl 1', text: 'Your window — Q-silence + E out-trade her before her parry mastery.' },
        { when: 'Lvl 3+', text: 'Her W (Riposte) parries your Q or E — don’t telegraph your combo.' },
        { when: '1st item', text: 'Even — bait her parry, then Q-silence; she out-trades if she lands it.' },
        { when: '2+ items', text: 'Fiora takes over — vitals + true damage ignore your W armour.' }
      ],
      wants: {
        you: ['Q-silence + E early before she masters the parry', 'Bait her W (Riposte) before committing Q or E', 'Trade short, then disengage and regen'],
        foe: ['Parry (W) your Q or E for the stun', 'Proc vitals — true damage ignores your W armour', 'Out-scale into a one-item-spike duelist']
      },
      early: "Level 1 is your window — your Q-silence + E spin out-trade Fiora before she has the tools or timing to punish you. Her whole game is W (Riposte): it parries your Q or E and stuns you, flipping the trade. Early, she's less able to threaten, so press your Q-silence advantage and poke her down before she gets going.",
      mid: "From 3 it's a parry chess match — don't telegraph your Q or E into her W, because a parried ability is a lost trade and a free vital. Bait the W (feint, then commit), and your short trade still wins if she wastes it. Her vitals deal true damage that ignores your W armour, so don't sit in a long fight; trade with Q-silence, then disengage and regen.",
      late: "Fiora out-scales you. Two items in, her vitals + true damage shred through your W and tankiness, and her duelling overtakes your short trades. The lane is even overall — you bully level 1 and short windows, she takes the extended late. Press your early edge, bait her parry, and don't let her proc vitals in a drawn-out 1v1.",
      whys: [
        "Q-silence + E out-trade her at level 1, before her parry mastery. Press the early.",
        "Her W parries your Q or E for a stun. Don't telegraph; bait it first.",
        "Vitals deal true damage that ignores your W armour. Trade short, then regen.",
        "Don't sit in a long fight — Q-silence, disengage, and reset with your passive.",
        "Bait the Riposte, then commit. She out-trades only if she lands it.",
        "Even — your short trade beats a wasted parry. Force it before her items.",
        "Two items in she flips it — vitals + true damage shred your W. She wins the late duel."
      ]
    },
    {
      a: 'garen', b: 'teemo',
      win: ['Teemo', 'Teemo', 'Skill', 'Garen', 'Garen', 'Garen', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Teemo pokes and blinds your E/autos — farm, your regen heals it.' },
        { when: 'Lvl 4–6', text: 'Your window — Q (cleanse + MS) runs him down through the blind.' },
        { when: '1st item', text: 'You out-sustain his poke; force the all-in on his blind cooldown.' },
        { when: 'Late', text: 'He becomes a shroom/splitpush map problem — close lane early.' }
      ],
      wants: {
        you: ['Use Q (cleanse + move speed) to run him down', 'Out-sustain his poke with your passive regen', 'All-in on his blind cooldown — he has no escape'],
        foe: ['Blind your E spin + autos every trade', 'Poke you down and stack shrooms', 'Survive and scale into splitpush + vision']
      },
      early: "Teemo's blind (Q) shuts off your E spin and autos, so levels 1-2 he pokes you and you can't trade back cleanly. But your passive regen heals his poke between waves, so don't panic — last-hit, take the chip, and wait for your run-down window. His move-speed kite is annoying, but he has no escape once you reach him.",
      mid: "Your window opens with Q (Decisive Strike) — it cleanses his blind's slow and gives you move speed to close the gap and run him down. Bait the blind, then Q-in, E-spin, and silence him so he can't reposition. At 6 your R executes him. He can't kite a Garen who out-sustains his poke and sticks with Q; force the all-in when his blind is down.",
      late: "Teemo stops being a laner and becomes a map problem — shrooms on objectives, splitpush, vision. You win the straight 1v1 once you reach him, so close the lane early before his scaling utility matters. Don't facecheck shroom-walled brush near objectives, and use Q's cleanse to push through his slows when you commit.",
      whys: [
        "Teemo's blind shuts off your E + autos. Farm — your regen heals the poke. Levels 1-2 are his.",
        "He pokes and kites with move speed. Take the chip, wait for your Q window.",
        "Your Q cleanses his blind's slow and gives MS. Bait the blind, then run him down.",
        "Q-in, E-spin, silence him — he can't reposition. Out-sustain the poke.",
        "Your R executes him. All-in on his blind cooldown; he has no escape.",
        "You out-sustain his poke — force the all-in when his blind is down.",
        "He becomes a shroom/splitpush problem. Close lane early; don't facecheck brush."
      ]
    },
    {
      a: 'garen', b: 'jax',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Jax'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence cuts his combo; W blunts his burst.' },
        { when: 'Lvl 6', text: 'R executes him; your W reduces his E-empowered all-in.' },
        { when: '1st item', text: 'Still your edge — silence + W shut down his combo reliance.' },
        { when: '2+ items', text: 'Jax takes over — his item scaling out-duels you late.' }
      ],
      wants: {
        you: ['Q-silence to cut his combo before he E-stuns', 'Use W (damage reduction) to blunt his burst', 'Win before his item spikes; R-execute him low'],
        foe: ['Dodge your spin with E (Counterstrike) and stun back', 'Stall the lane and scale to his item spikes', 'Out-duel you late with Grandmaster’s + Jax items']
      },
      early: "You out-trade Jax early — your Q silences his combo (he can't dump his E-W-Q burst while silenced), and your W (Courage) reduces the damage of whatever he does land. His E (Counterstrike) dodges your E spin and stuns, so don't dump your spin into a held E; Q-silence him first, then commit. Levels 1-3 are yours.",
      mid: "Keep punishing. Q-silence cuts his combo reliance, W blunts his Counterstrike-empowered burst, and your E spin out-damages his short trades. At 6 your R executes him off your sustained pressure. Bait his E (make him pop Counterstrike), then Q-E and trade; his burst can't break a tanky, silencing Garen with W up.",
      late: "Jax is one of the best scaling duelists in the game — two items in, his Grandmaster's passive + item spikes out-duel you and he wins the extended 1v1. The lane is favoured because you crush his early-mid with silence + W; you must convert it. Press your lead, R-execute him, and close the lane before his item scaling flips the duel.",
      whys: [
        "Q-silence cuts his combo and W blunts his burst. Levels 1-3 are yours.",
        "His E (Counterstrike) dodges your spin and stuns. Q-silence first, then commit.",
        "Your E spin out-damages his short trades. Bait his E, then Q-E.",
        "Keep punishing — silence + W shut down his combo reliance.",
        "R executes him; your W reduces his E-empowered all-in.",
        "Still your edge — force the all-in before his item spikes.",
        "Two items in his scaling out-duels you. Close the lane before late, or it's his."
      ]
    },
    {
      a: 'garen', b: 'trundle',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Skill', 'Trundle'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E out-trade him before his sustain.' },
        { when: 'Lvl 6', text: 'His R drains your resistances + W shield — burst short, then regen.' },
        { when: '1st item', text: 'Your edge — bait his Q (Chomp), which steals your AD.' },
        { when: '2+ items', text: 'Trundle takes over — sustain + R drain out-grind your trades.' }
      ],
      wants: {
        you: ['Q-silence + E out-trade him before his sustain ramps', 'Bait his Q (Chomp) — it steals your AD', 'Trade short, then disengage and regen'],
        foe: ['Bite (Q) to steal your AD and heal', 'Zone you with E (Pillar) and out-sustain trades', 'Drain your resistances + W with R in a long fight']
      },
      early: "Levels 1-3 are yours — your Q-silence + E spin out-trade Trundle before his sustain ramps. His Q (Chomp) steals your AD and heals him, so bait it before you commit; a bite weakens your whole trade. His E (pillar) zones and peels, so play around it. Press your early Q-silence advantage and don't let his sustain take over.",
      mid: "His R (Subjugate) drains your resistances — including the armour/MR your W (Courage) stacks — in a long fight, so don't get dragged into an extended slugfest. Burst him with Q-E in a short window, then disengage and regen with your passive. Bait the Chomp, trade, and back off before his R and sustain flip the drawn-out fight.",
      late: "Trundle takes over at two items — his sustain + R drain out-grind your trades, and as a tank-buster he melts your resistances. The lane is favoured because you bully the early, so press it. Force short Q-silence trades, R-execute him when low, and close the lane before his scaling. Don't let him out-sustain a long fight; keep it short.",
      whys: [
        "Q-silence + E out-trade him before his sustain ramps. Levels 1-3 are yours.",
        "His Q (Chomp) steals your AD. Bait it before you commit your trade.",
        "His E pillar zones and peels. Trade short when his Q is down, then regen.",
        "Keep punishing — your Q-silence beats his early. Don't let his sustain ramp.",
        "His R drains your resistances + W in a long fight — burst short, then disengage.",
        "Your edge — bait the Chomp, then Q-E. Force short trades.",
        "Two items in, sustain + R drain out-grind you. Keep it short; close the lane early."
      ]
    },
    {
      a: 'garen', b: 'renekton',
      win: ['Renekton', 'Renekton', 'Skill', 'Garen', 'Garen', 'Garen', 'Garen'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Renekton’s window — empowered Q + W stun out-trade you. Use W.' },
        { when: 'Lvl 4–6', text: 'Your window — silence his fury combo; out-scale his falloff.' },
        { when: '1st item', text: 'Your edge — your tankiness + R beat a falling-off Renekton.' },
        { when: 'Late', text: 'You out-scale — Renekton has no late; your durability wins.' }
      ],
      wants: {
        you: ['Survive his level 1-2 with W (damage reduction)', 'Q-silence his fury combo, then out-scale him', 'Out-last his falloff — you’re tankier late'],
        foe: ['Bully levels 1-2 with empowered Q + W stun', 'Use double-E to engage and escape your trades', 'Snowball the early before you out-scale']
      },
      early: "Renekton's early is his window — empowered Q heals and chunks, his W is a point-blank stun, and double-E lets him dash in and out. Levels 1-2 he out-trades you; pop W (Courage) to reduce his burst, don't get caught by the stun-combo, and concede a little CS rather than feed his fury snowball. Survive his peak.",
      mid: "From 4-6 the lane swings to you. Q-silence shuts off his fury combo, and as a front-loaded champion he starts to fall off while you only get tankier. Trade with Q-E when his W stun is down, use W to blunt his all-in, and deny him the snowball. Your R executes him if he over-stays his fading power window.",
      late: "You out-scale him — Renekton has essentially no late game while your tankiness, regen, and R execute keep growing. Survive his level 1-2 spike with W, weather the fury window, and the back half is decisively yours. Don't trade into a fresh W stun, but once he falls off, you run the lane and the side-lane 1v1.",
      whys: [
        "Renekton's empowered Q + W stun out-trade you early. Pop W to survive — levels 1-2 are his.",
        "His double-E engages and escapes. Concede a little CS, don't feed the fury snowball.",
        "Your window opens — Q-silence his fury combo when his W is down.",
        "He starts to fall off while you get tankier. Trade with Q-E, deny the snowball.",
        "Your R executes a falling-off Renekton. Use W to blunt his all-in.",
        "Your edge — your tankiness + R beat him now. Press the lane.",
        "You out-scale — he has no late. Survive the early, then run the 1v1."
      ]
    },
    {
      a: 'garen', b: 'sett',
      win: ['Garen', 'Garen', 'Skill', 'Skill', 'Skill', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — Q-silence + E out-trade his short-range early.' },
        { when: 'Lvl 6', text: 'His W (true damage) + R answer you — W reduces it; trade short.' },
        { when: '1st item', text: 'Even — bait his W (Haymaker) when his grit is empty.' },
        { when: 'Late', text: 'Even juggernaut brawl — your R execute vs his grit burst.' }
      ],
      wants: {
        you: ['Q-silence + E out-trade his short-range punches', 'Use W to reduce his Haymaker (true damage)', 'Trade when his grit is empty, then disengage'],
        foe: ['Build grit, then W (Haymaker) for a true-damage chunk', 'Land E (Facebreaker stun) into his combo', 'Pull you in with R for an all-in']
      },
      early: "Levels 1-2 are your window — Sett's kit is short-range, and your Q-silence + E spin out-trade his early before he's banked grit. His W (Haymaker) deals true damage scaled off the grit he stores from taking hits, so don't feed it: trade when his grit is empty, pop W to reduce the Haymaker, and press your early Q advantage.",
      mid: "It evens around 6 — his W (true damage) and E (Facebreaker) stun set up a real all-in, and his R pulls you in. Your W (Courage) reduces the Haymaker's burst, but don't sit in a long fight feeding his grit. Bait his W when it's empty, trade short with Q-E, then disengage and regen. Watch his E-stun-into-W combo.",
      late: "Even juggernaut brawl — your R execute + tankiness versus his grit-shield true-damage burst. Both of you want the all-in, so it hinges on grit management and CC timing. Trade short when his grit is low, use W to blunt the Haymaker, and R-execute him when low. Don't all-in into a full grit Haymaker; keep the fights on your terms.",
      whys: [
        "Q-silence + E out-trade his short-range early. Levels 1-2 are yours.",
        "His W (Haymaker) scales off grit. Trade when it's empty; pop W to reduce it.",
        "Even as his grit comes online — bait the W before you commit.",
        "Don't feed his grit in a long fight. Trade short, then regen.",
        "His E stuns into W and his R pulls you in — W reduces it; trade short.",
        "Even — bait his W when his grit is empty, then Q-E.",
        "Even brawl late — your R execute vs his grit burst. Keep fights short."
      ]
    },
    {
      a: 'garen', b: 'mordekaiser',
      win: ['Garen', 'Garen', 'Skill', 'Skill', 'Mordekaiser', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — Q-silence stops his Q; W (MR) blunts his magic.' },
        { when: 'Lvl 6', text: 'Morde’s window — R (Realm) isolates you 1v1; don’t int it.' },
        { when: '1st item', text: 'Even — W gives MR; trade short, then regen the magic chip.' },
        { when: 'Late', text: 'Even — your R execute + MR vs his isolated R damage.' }
      ],
      wants: {
        you: ['Q-silence to stop his Q before it lands', 'Build/use W for MR against his magic damage', 'Respect his R (Realm) at 6 — fight when it’s down'],
        foe: ['Land E (pull) into Q for his trade pattern', 'Isolate you with R (Realm) and win the 1v1', 'Stack passive shield + AP to out-sustain you']
      },
      early: "Levels 1-2 are your window — your Q silences Morde before he can land his Q (his main damage), and your W (Courage) stacks MR to blunt his magic. Don't let him E-pull you into his Q combo or stack his passive shield freely. Poke with Q-silence trades, use your MR, and press the early before his ramp.",
      mid: "Level 6 is HIS window — Realm of Death (R) drags you into an isolated 1v1, steals your stats, and his sustained magic damage is strong inside it. Don't int the Realm at low HP; play around its cooldown. Your W's MR and damage reduction help you survive it, but respect the timing. Outside R, your Q-silence + short trades hold the lane.",
      late: "Even into late — your R execute + Villain mark and W's MR versus his isolated Realm damage. He out-sustains a long fight with his passive shield, so trade short with Q-silence, regen between, and burst him with R when low. Build MR (your W helps), respect the Realm windows, and the lane stays roughly even — slightly yours if you dodge his R timings.",
      whys: [
        "Q-silence stops his Q before it lands; W gives MR. Levels 1-2 are your window.",
        "Don't let him E-pull you into Q or stack his shield. Poke with Q-silence.",
        "He out-sustains a long fight with his shield. Trade short, then regen.",
        "Build/use W's MR — his magic chip hurts less. Keep trades short.",
        "His R isolates you and steals your stats — his window. Don't int it; W helps you survive.",
        "Even — W's MR blunts his magic. Trade short, regen the chip.",
        "Even late — your R execute + MR vs his Realm damage. Respect the R timings."
      ]
    },
    {
      a: 'garen', b: 'vayne',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Vayne'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q (cleanse + MS) runs her down; silence stops her kite.' },
        { when: 'Lvl 6', text: 'R executes her squishy frame — all-in on her tumble cooldown.' },
        { when: '1st item', text: 'Still your stomp — deny CS so she never scales.' },
        { when: '2+ items', text: 'Do-or-die: at 2+ items Vayne out-scales the entire map.' }
      ],
      wants: {
        you: ['Use Q (cleanse + move speed) to run her down', 'Silence her so she can’t kite, then E + R', 'Kill her before crit items or she becomes unbeatable'],
        foe: ['Kite with tumble (Q) + autos, stay off walls', 'Condemn (E) you on a wall to peel the all-in', 'Survive lane and scale into a %-HP hypercarry']
      },
      early: "You run Vayne down early — she's short-range and squishy, and your Q (Decisive Strike) cleanses her slows and gives you move speed to close, while the silence stops her from repositioning. Her tumble (Q) and Condemn (E) buy distance, but stand off walls so she can't stun you, deny her CS, and your Q-E shred her tiny health bar. Levels 1-3 are yours.",
      mid: "Hard-stomp window. Q-in, silence, E-spin, and at 6 your R executes her squishy frame off her own missing health. All-in on her tumble cooldown — she has no sustain and folds to your combo. Her whole game is scaling, so deny every minion: every denied CS delays the hypercarry she becomes. Dive her with jungle help if she's behind.",
      late: "Do-or-die. If Vayne survived to two crit items she out-scales the entire map — her %-HP true damage shreds even a tanky Garen, and she kites your run-down. You had to kill her early and end the game; if she's farmed, the late game is hers. Press your massive early lead into objectives before her power curve arrives.",
      whys: [
        "Your Q cleanses her slows + gives MS to run her down. Silence stops her kite. Levels 1-3 are yours.",
        "Stand off walls so she can't Condemn-stun you. Deny CS, starve her scaling.",
        "Q-in, silence, E-spin — she folds. She has no sustain and can't kite a cleansing Garen.",
        "Hard-stomp — every all-in on her tumble cooldown is a kill. Keep her broke.",
        "R executes her squishy frame off her missing HP. Dive with jungle.",
        "Still your stomp — deny CS, take her tower, end the game.",
        "Do-or-die: at 2+ items she out-scales everyone. Close the game on your lead."
      ]
    },
    {
      a: 'garen', b: 'camille',
      win: ['Skill', 'Camille', 'Camille', 'Camille', 'Camille', 'Skill', 'Camille'],
      spikes: [
        { when: 'Lvl 1', text: 'Your window — Q-silence trade before her E-Q combo spikes.' },
        { when: 'Lvl 2–6', text: 'Camille’s window — her E-Q true damage ignores your W armour.' },
        { when: '1st item', text: 'She out-trades you — her true damage shreds your tankiness.' },
        { when: '2+ items', text: 'Camille takes over — R isolation + true damage win the side lane.' }
      ],
      wants: {
        you: ['Q-silence a short trade at level 1, then disengage', 'Stand off terrain so her E can’t stun you', 'Bait her E (escape) — but she out-trades you most windows'],
        foe: ['Out-trade you with E-Q (hookshot) true damage + shield', 'Her true damage ignores your W armour', 'Isolate and 1v1 you with R in the side lane']
      },
      early: "This is a hard lane — Camille's E-Q (hookshot into empowered auto) does true damage that ignores your W (Courage) armour, and her shield blunts your trade back. Level 1 is your only real window before her combo spikes: a quick Q-silence poke. Stand away from terrain so her E can't stun you, and don't get caught in an extended trade her true damage wins.",
      mid: "Camille owns the mid-levels. Her E-Q out-trades you, her true damage shreds your tankiness, and she resets trades by hookshotting away. Your Q-silence can interrupt her if you catch the combo, but she out-trades most windows. Trade short, disengage, and regen with your passive — don't sit in a fight where her true damage and shield grind you down.",
      late: "Camille takes over — two items in, her R isolation + true damage win the side-lane 1v1 outright, and your W armour does nothing against her. The lane is tricky and tilted her way. Your best path is the level-1 window and short Q-silence pokes; if it goes even into late, she wins the duel. Play safe and rely on your R execute + team.",
      whys: [
        "Camille's E-Q true damage ignores your W armour. Q-silence a short trade at level 1 — your window.",
        "Stand off terrain so her E can't stun you. Her combo out-trades you from level 2.",
        "Her true damage shreds your tankiness. Trade short, disengage, regen.",
        "She resets trades by hookshotting away. Don't chase into her item spikes.",
        "Your Q-silence can interrupt her combo, but she out-trades most windows.",
        "She out-trades you — her true damage beats your W. Play short and safe.",
        "Two items in, R isolation + true damage win the side lane. Rely on R execute + team."
      ]
    },
    {
      a: 'garen', b: 'nasus',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Nasus'],
      spikes: [
        { when: 'Lvl 1–5', text: 'Your window — Q-silence + E bully him off Q stacks.' },
        { when: 'Lvl 6', text: 'R executes him; his W (Wither) cripples your run-down — bait it.' },
        { when: '1st item', text: 'Still your stomp — deny stacks so his scaling never arrives.' },
        { when: '2+ items', text: 'Nasus takes over — stacked Q + tanky body out-grind you.' }
      ],
      wants: {
        you: ['Bully his weak early — Q-silence + E deny his stacks', 'Bait his W (Wither) before you all-in', 'Snowball before his stacks + items come online'],
        foe: ['Stack Q on every last-hit, even under tower', 'Cripple your run-down with W (Wither)', 'Out-scale into a stacked, tanky late-game monster']
      },
      early: "You hard-bully Nasus — he's one of the weakest early laners, and your Q-silence + E spin deny his Q stacks and zone him off CS. His W (Wither) cripples your move speed and attack speed, shutting off your run-down, so bait it before you commit (your Q cleanse helps vs the slow). Press every trade, starve his stacks, and own levels 1-5.",
      mid: "Keep stomping. Your Q-E out-trade a low-stack Nasus, and at 6 your R executes him. His W cripple is his main tool against you, so bait or cleanse it, then all-in. Every Q stack you deny and every plate you take delays the monster he becomes — zone him hard and snowball before his scaling arrives.",
      late: "Nasus takes over at two items — a stacked Q on a tanky body out-grinds your trades, and his Wither shuts off your kite-and-execute. The lane is favoured because you crush the entire early game and he crushes the very late. You MUST snowball this into a game-ending lead; deny his stacks and end before his Q makes him unbeatable.",
      whys: [
        "Nasus is weak early. Q-silence + E bully him off Q stacks. Levels 1-5 are yours.",
        "His W (Wither) cripples your run-down. Bait it — your Q cleanse helps vs the slow.",
        "Your Q-E out-trade a low-stack Nasus. Zone him off CS, deny stacks.",
        "Keep stomping — every denied stack delays his scaling. Take plates.",
        "R executes him; bait his W, then all-in. Don't let him stack freely.",
        "Still your stomp — starve his farm so his scaling never arrives.",
        "Two items in, stacked Q + tanky body out-grind you. End the game before that."
      ]
    },
    {
      a: 'garen', b: 'irelia',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Irelia'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence cuts her combo before she stacks.' },
        { when: 'Lvl 6', text: 'R executes her; W blunts her stacked burst, silence stops the reset.' },
        { when: '1st item', text: 'Still your stomp — deny her minion Q-resets and stacks.' },
        { when: '2+ items', text: 'Irelia takes over — stacked Q resets + true damage out-grind you.' }
      ],
      wants: {
        you: ['Q-silence to cut her combo and stun-channel', 'Deny her minion Q-resets and stacks', 'W (damage reduction) to blunt her stacked burst'],
        foe: ['Stack passive on minions, then out-trade you', 'Blunt your trade with W (Defiant Dance)', 'Q-reset around your spin and scale to items']
      },
      early: "You hard-counter early Irelia — your Q silences her so she can't chain her Q-E-W combo, and she's weak before she stacks her passive anyway. Deny her minion Q-resets, poke with Q-silence, and don't let her free-stack off the wave. Her W (Defiant Dance) reduces your burst and stuns if you spin into the channel, so trade with Q first, then E.",
      mid: "Keep her starved. Your W blunts her stacked burst, and a silenced Irelia can't reset or dance through your trades. At 6 your R executes her. Bait the W, then Q-silence, E-spin, and run her down with Q's move speed. Every Q stack you deny delays the carry she becomes — zone her hard off CS.",
      late: "Irelia takes over at two items — stacked, her Q resets and on-hit true damage out-grind your trades and she dances out of your spin. The lane is favoured because you dominate the early; convert it. Snowball off the silence stomp, deny her farm, and end before her item + stack spike flips the side-lane duel.",
      whys: [
        "Q-silence cuts her combo before she stacks. She's weak early — levels 1-3 are yours.",
        "Deny her minion Q-resets. Don't let her free-stack off the wave.",
        "Her W blunts burst and stuns — Q-silence first, then E-spin.",
        "Keep her starved off CS — every denied stack delays her carry spike.",
        "R executes her; W blunts her stacked burst, silence stops the reset.",
        "Still your stomp — run her down with Q's move speed. Snowball.",
        "Two items in, stacked resets + true damage out-grind you. End it before that."
      ]
    },
    {
      a: 'garen', b: 'riven',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Riven'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence interrupts her combo mid-cast.' },
        { when: 'Lvl 6', text: 'R executes her; W blunts her burst, silence cancels the all-in.' },
        { when: '1st item', text: 'Still your stomp — silence shuts down her combo reliance.' },
        { when: '2+ items', text: 'Riven takes over — her item spikes out-trade you late.' }
      ],
      wants: {
        you: ['Q-silence mid-combo to cancel her burst', 'W (damage reduction) to eat her shielded all-in', 'Run her down with Q’s move speed; R-execute low'],
        foe: ['Dodge your spin with Q dashes + E shield', 'Burst you in a short combo window', 'Animation-cancel to out-tempo you late']
      },
      early: "You hard-counter Riven — her entire game is her combo, and your Q silences it mid-cast, cancelling her burst. She out-mobilities you with Q dashes and an E shield, but a well-timed Q-silence shuts her down, and your W (Courage) eats the burst she does land. Levels 1-3 are decisively yours; punish her every time she commits.",
      mid: "Keep punishing. Silence her combo, W her burst, E-spin for damage, and run her down with Q's move speed — she can't dance away from a silenced engage. At 6 your R executes her squishy frame. Bait her dashes, then Q-silence when she commits; she's stuck without her combo and folds to your trade.",
      late: "Riven takes over only if she snowballs to items — two items in, her spikes let her out-trade you in the short window before your silence. The lane is heavily favoured because you shut down her combo early; you must convert it. Snowball off the silence stomp, R-execute her, and close the lane before her item scaling gives her enough burst to beat the silence.",
      whys: [
        "Q-silence interrupts her combo mid-cast, cancelling her burst. Levels 1-3 are yours.",
        "Her Q dashes + E shield dodge your spin — but silence shuts her down when she commits.",
        "W eats the burst she lands. Silence, W, then E-spin and run her down.",
        "Bait her dashes, then Q-silence when she commits. She folds without her combo.",
        "R executes her squishy frame; silence cancels the all-in.",
        "Still your stomp — silence shuts down her combo reliance. Snowball.",
        "Two items in her spikes out-trade you. Close the lane before her item scaling."
      ]
    },
    {
      a: 'garen', b: 'sion',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Skill', 'Sion'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E out-trade him; dodge his Q (charged knockup).' },
        { when: 'Lvl 6', text: 'R executes him; his R is map engage, not a duel button.' },
        { when: '1st item', text: 'Still your edge — out-trade a low-damage Sion.' },
        { when: 'Late', text: 'Sion out-tanks you — he scales to a teamfight engage tank.' }
      ],
      wants: {
        you: ['Dodge his Q (charged knockup), then Q-silence + E', 'Out-trade his weak early before he stacks tanky', 'Trade then regen — he just wants to farm and scale'],
        foe: ['Land the charged Q knockup for a trade', 'Farm safely (even dead, via passive) and scale', 'Become a teamfight engage tank with R']
      },
      early: "Levels 1-3 are yours — you out-trade Sion's weak early. His only real threat is the charged Q (a telegraphed knockup you can sidestep), so don't stand still while he winds it up. Dodge it, then Q-silence and E-spin; without the Q he can't trade back, and his passive means he just wants to farm and scale, not fight you.",
      mid: "Keep punishing. Your Q-E out-trade his W shield + E poke, and at 6 your R executes him. His R is a long-range engage for the map, not a 1v1 button, so don't panic when he ults — just don't get knocked into his team. Deny CS, regen between trades, and pressure him off the wave while he's a low-damage scaler.",
      late: "Sion out-tanks you eventually — he scales into a teamfight engage tank with resistances your trades crack less over time. The lane is even-ish because you bully the early and he out-tanks the late. Snowball your level 1-3 edge, take plates, and end before his tankiness matters; the game becomes about his R engage, not the 1v1 you own early.",
      whys: [
        "Sion's charged Q is his only burst — dodge it, then Q-silence + E. Levels 1-3 are yours.",
        "Without the Q he can't trade. Punish his weak early.",
        "Your Q-E out-trade his W shield + E poke. Force the trade.",
        "Keep punishing — deny CS while he's a low-damage scaler.",
        "R executes him; his R is map engage, not a duel button. Don't get knocked into his team.",
        "Still your edge — out-trade a low-damage Sion. Take plates.",
        "Sion out-tanks you late — he scales to a teamfight engage tank. End early."
      ]
    },
    {
      a: 'garen', b: 'ornn',
      win: ['Garen', 'Garen', 'Garen', 'Skill', 'Ornn', 'Skill', 'Ornn'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E out-trade him before his brittle combo.' },
        { when: 'Lvl 6', text: 'Ornn’s window — brittle (W) + R detonation answer your trades.' },
        { when: '1st item', text: 'He out-sustains and out-tanks you; his upgrades come free.' },
        { when: 'Late', text: 'Ornn scales to an unkillable tank — close the lane early.' }
      ],
      wants: {
        you: ['Q-silence + E before his brittle combo is online', 'Dodge his Q (pillar) so he can’t brittle-detonate', 'Win early — you can’t out-trade a built Ornn'],
        foe: ['Brittle you with W, then detonate for bonus + slow', 'Poke with Q and out-sustain your trades', 'Scale to an unkillable tank with free item upgrades']
      },
      early: "Levels 1-3 are yours — your Q-silence + E spin out-trade Ornn before his brittle (W) combo comes online. His Q pillar pokes and his W makes you take bonus damage he can detonate with CC, so dodge the Q so he can't set up the brittle. Press your early Q advantage; your regen heals his poke between trades.",
      mid: "From 6 the lane tilts to him — his R detonates brittle for a big swing, and he out-sustains your trades while building tanky. You can't out-trade an Ornn who upgrades his items for free. Q-silence and trade only when his W is down, use W (Courage) to blunt his brittle burst, and don't walk into a Q-pillar that sets up the detonation.",
      late: "Ornn scales into an unkillable teamfight tank — free item upgrades, two engage tools, and resistances your trades can't crack. The lane is even because you bully the early and he out-tanks the late. Snowball your level 1-3 edge, take plates, and end before his brittle + items flip the matchup. A built Ornn doesn't fold to your trades.",
      whys: [
        "Q-silence + E out-trade him before his brittle combo. Levels 1-3 are yours — dodge his Q.",
        "Don't let him land Q to set up the brittle. Press your early Q advantage.",
        "Your Q-E out-trade a pre-brittle Ornn. Regen heals his poke between trades.",
        "He starts to out-sustain — trade only when his W is down; W blunts his brittle burst.",
        "His R detonates brittle for a big swing — his window. Don't trade into it.",
        "He out-tanks you with free upgrades. You can't crack a built Ornn.",
        "Ornn scales to an unkillable tank. Win the early or end the game before late."
      ]
    },
    {
      a: 'garen', b: 'malphite',
      win: ['Garen', 'Garen', 'Skill', 'Skill', 'Skill', 'Malphite', 'Malphite'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — Q-silence + E before his armour + shield come online.' },
        { when: 'Lvl 3–5', text: 'All-in when his passive shield is popped and armour is low.' },
        { when: '1st item', text: 'His armour stacking starves your AD — you can’t crack him.' },
        { when: 'Late', text: 'Malphite scales to a teamfight R; lane goes even-to-his.' }
      ],
      wants: {
        you: ['Q-silence + E when his passive shield is down', 'Trade before he stacks armour', 'Snowball early — you can’t out-trade a built Malphite'],
        foe: ['Poke with Q (slow) and farm behind the shield', 'Stack armour to neutralise your AD', 'Scale to a teamfight R (Unstoppable Force)']
      },
      early: "Levels 1-2 are your window — your Q-silence + E out-trade Malphite before his armour and passive shield are online. His W armour directly cuts your AD, so the longer the lane goes the less you hurt him. Catch him mid-poke without his shield, Q-silence, and E-spin; don't let him free-farm into armour. Your Q cleanse helps vs his slow.",
      mid: "You get a small window levels 3-5 when his shield is down and his armour is still low — Q-silence and all-in then. Once he stacks armour items, your damage falls off and you can't crack him; don't waste resources chipping a tank who out-sustains it with his passive and your regen war goes nowhere. Catch him without the shield or accept the stall.",
      late: "Malphite scales into a teamfight monster — his R (Unstoppable Force) is a game-swinging engage and his armour neutralises your AD. The lane drifts from even to his. Snowball early off the shield windows or accept you won't crack a built Malphite, and play for tempo elsewhere — roam, take plates, help other lanes with your R-execute pressure.",
      whys: [
        "Q-silence + E out-trade him before his armour + shield. Levels 1-2 are your window.",
        "His W armour cuts your AD. Catch him when his shield pops; your Q cleanse beats his slow.",
        "All-in when his passive shield is down and armour is still low.",
        "He starts stacking armour — your damage drops. Trade only on a popped shield.",
        "His armour items neutralise your AD. You can't crack a built Malphite.",
        "Even-to-his now. Snowball your early windows or play elsewhere.",
        "He scales to a teamfight R. The lane goes from even to his — win early or roam."
      ]
    },
    {
      a: 'garen', b: 'pantheon',
      win: ['Pantheon', 'Pantheon', 'Skill', 'Garen', 'Garen', 'Garen', 'Garen'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Pantheon’s window — Q poke + W stun bully you. Use W to survive.' },
        { when: 'Lvl 4–6', text: 'Your window — out-scale his falloff; Q-silence + regen take over.' },
        { when: '1st item', text: 'You out-scale him — your tankiness + R beat his early kit.' },
        { when: 'Late', text: 'You take over — Pantheon has no late; your durability wins.' }
      ],
      wants: {
        you: ['Survive his early poke + stun with W (damage reduction)', 'Out-scale his falloff with regen + tankiness', 'Q-silence + E once his power fades; R-execute low'],
        foe: ['Bully your early with Q (spear) + W (stun)', 'Block your trades with E (Aegis) from one side', 'Snowball before you out-scale him']
      },
      early: "Pantheon contests your early — his Q spear pokes, his W is a point-click stun, and his E (Aegis) blocks attacks from one direction, negating your autos/E spin. Levels 1-2 are his; don't walk into the W-stun-into-burst. Pop W (Courage) to reduce his burst, take the poke, and remember his E only blocks one way — angle your spin so his block faces the wrong direction.",
      mid: "Levels 4-6 swing to you. Pantheon is front-loaded and starts falling off, while your tankiness and regen grow. Q-silence his combo, E-spin, and out-trade a fading Pantheon. Be wary of his R roam if he can't kill you, but in a straight fight the lane now tilts your way; your regen heals his poke and your R executes him.",
      late: "You take over — Pantheon has essentially no late game while your tankiness + R execute + Villain keep scaling. The lane is favoured because he bullies the early and you own the rest. Survive his level 1-2 window with W, weather his poke, and grind him out; by your item spikes he can't fight you at all.",
      whys: [
        "Pantheon's Q + W stun bully your early. Pop W to survive — levels 1-2 are his.",
        "His E blocks one direction — angle your spin so his block faces the wrong way.",
        "Even as he starts to fall off — Q-silence his combo, regen the poke.",
        "Your window — out-trade a fading Pantheon with Q-E. Watch his R roam.",
        "Your regen heals his poke and your R executes him. Press the lane.",
        "You out-scale him — your tankiness + R beat his early kit.",
        "You take over — he has no late. Survive the early, then the lane is yours."
      ]
    },
    {
      a: 'garen', b: 'kled',
      win: ['Kled', 'Skill', 'Garen', 'Garen', 'Skill', 'Garen', 'Garen'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Kled’s window — mounted aggression + grab (Q) bully you. Use W.' },
        { when: 'Lvl 3–6', text: 'Your window — Q-silence + W blunt his all-in; out-scale his falloff.' },
        { when: '1st item', text: 'Your edge — your tankiness + R beat a falling-off Kled.' },
        { when: 'Late', text: 'You out-scale — Kled falls off; your durability wins.' }
      ],
      wants: {
        you: ['Survive his mounted early with W (damage reduction)', 'Q-silence his all-in, then out-scale him', 'Out-last his falloff — you’re tankier late'],
        foe: ['Bully your early while mounted with Q grab + W', 'Use E (dash) to engage and escape your trades', 'Snowball before you out-scale him']
      },
      early: "Mounted Kled's level 1-2 is his window — his Q (Beartrap) grabs you and his W stacks courage for burst. Pop W (Courage) to reduce his all-in, don't feed the grab, and concede a little CS rather than eat his fully-stacked aggression. Survive his peak; his entire plan is to snowball before you out-scale him.",
      mid: "From 3 the lane swings to you. Q-silence his courage burst, W blunts the all-in, and you out-trade him as his front-loaded power starts to fade. Trade enough to dismount him — off Skaarl he's weak — then Q-E and run him down. Don't let him reset and remount for free; your R executes him if he over-stays.",
      late: "You out-scale him — Kled is a front-loaded bully who falls off, while your tankiness + R execute only grow. Survive the mounted window with W, punish every dismount, and the back half is yours. Don't chase a remounting Kled into his jungle; make him fight you in lane where your durability wins the long game.",
      whys: [
        "Mounted Kled's Q grab + W burst bully your early. Pop W to survive — levels 1-2 are his.",
        "Don't feed the grab. Concede a little CS, don't eat his stacked aggression.",
        "Your window — Q-silence his burst, W blunts the all-in. Out-trade his fade.",
        "Trade to dismount him — off Skaarl he's weak. Q-E and run him down.",
        "Don't let him remount free. Your R executes him if he over-stays.",
        "Your edge — your tankiness + R beat a falling-off Kled.",
        "You out-scale — Kled falls off. Punish dismounts; your durability wins late."
      ]
    },
    {
      a: 'garen', b: 'urgot',
      win: ['Skill', 'Urgot', 'Urgot', 'Skill', 'Urgot', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1', text: 'Your window — Q-silence trade before his W shotgun is online.' },
        { when: 'Lvl 2–6', text: 'Urgot’s window — W (shotgun knees) + E flip out-trade you.' },
        { when: '1st item', text: 'He out-trades you; W blunts it but his R executes you low.' },
        { when: 'Late', text: 'Even-to-his — his shotgun shred + execute vs your tankiness.' }
      ],
      wants: {
        you: ['Q-silence a short trade early, then disengage', 'Use W to blunt his shotgun + stay above R execute', 'Trade then regen — don’t sit in his W stance'],
        foe: ['Out-trade with W (shotgun knees) + Q poke', 'Flip you with E into his shotgun stance', 'Execute you with R when your HP drops']
      },
      early: "Urgot out-trades you — his W (shotgun knees) shreds you up close, his Q pokes, and his E flips over you for a free trade. Level 1 is your window for a quick Q-silence poke before his W is online; from level 2 on, his shotgun out-damages your short trades. Pop W (Courage) to blunt his burst, don't sit in his W stance, and play for short Q-silence trades.",
      mid: "Urgot owns the mid-levels. His shotgun + E flip beat your trades, and his R (Fear Beyond Death) executes you below a health threshold and refreshes on the kill. Stay above his execute line, use W to survive his all-in, and Q-silence to deny his combo. Trade short, then disengage and regen — don't get flipped into his stance for a free shotgun.",
      late: "Even-to-his into late — his shotgun shred + execute versus your tankiness. Your W and regen let you survive, but he out-trades the extended fight. Play for short Q-silence trades, stay above his R execute, and rely on your durability + R-execute pressure. Don't feed him low-HP windows; keep the fights short and on your terms.",
      whys: [
        "Level 1 — Q-silence a short trade before his W shotgun is online. Your window.",
        "From 2 his W (shotgun knees) out-trades you up close. Don't sit in his stance.",
        "His E flips you into his shotgun. Pop W to blunt it; trade short.",
        "Urgot owns the mid-levels. Q-silence his combo, regen between trades.",
        "His R executes you below a threshold — stay above his execute line.",
        "He out-trades you; W blunts it but his execute punishes you low.",
        "Even-to-his late — short Q-silence trades, stay above his execute, rely on durability."
      ]
    },
    {
      a: 'garen', b: 'olaf',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Olaf', 'Garen', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q (cleanse) removes his axe slow; out-trade him.' },
        { when: 'Lvl 6', text: 'Olaf’s window — R makes him CC-immune, so your Q-silence won’t stop him.' },
        { when: '1st item', text: 'Your edge — W blunts his reckless burst; trade then regen.' },
        { when: 'Late', text: 'You edge it — your tankiness + R vs his lifesteal.' }
      ],
      wants: {
        you: ['Use Q (cleanse) to remove his axe (Q) slow', 'W (damage reduction) to blunt his reckless trades', 'Trade when his axe is down; R-execute low'],
        foe: ['Pick up his axe (Q) to slow and out-trade you', 'Ramp attack speed + lifesteal as he drops low', 'Go CC-immune with R — your silence won’t stop him']
      },
      early: "Levels 1-3 are yours — your Q (Decisive Strike) cleanses Olaf's axe (Q) slow, which is the core of his kit, and gives you move speed to trade or disengage. His passive ramps attack speed + lifesteal as his HP drops, so don't let a reckless brawl drag on, but with your Q cleanse and W (Courage) blunting his burst, you out-trade his early.",
      mid: "His R (Ragnarok) is the key problem — it makes him CC-immune, so your Q-silence won't stop his all-in once it's active. Don't rely on the silence to peel a R'd Olaf; fight before he ults or trade short and disengage during the duration. When his R is down and his axe is on cooldown, your Q-E + W out-trade his reckless trades.",
      late: "You edge the matchup — your tankiness + R execute versus his lifesteal, and your Q cleanse keeps his axe slow off you. Trade when his axe is down, W his burst, R-execute him when low, and don't get baited into an all-in the moment his Ragnarok is up. Keep your HP healthy so his lifesteal-on-low-HP comeback never triggers.",
      whys: [
        "Your Q cleanses his axe slow — the core of his kit. Out-trade his early. Levels 1-3 are yours.",
        "His passive ramps lifesteal as he drops low. Don't brawl recklessly into it.",
        "Your Q-E + W out-trade him when his axe is down. Force the trade.",
        "Keep trading on his axe cooldown; your cleanse beats his slow.",
        "His R makes him CC-immune — your silence won't stop his all-in. Fight before 6 or trade short.",
        "Your edge — W blunts his reckless burst. Trade then regen.",
        "You edge it late — your tankiness + R vs his lifesteal. Stay healthy."
      ]
    },
    {
      a: 'garen', b: 'tryndamere',
      win: ['Garen', 'Garen', 'Skill', 'Skill', 'Skill', 'Skill', 'Tryndamere'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — Q-silence + E out-trade a low-fury Trynd.' },
        { when: 'Lvl 6', text: 'His R (Undying Rage) survives your R execute — bait it out.' },
        { when: '1st item', text: 'Trynd’s crit scaling trades back — W blunts it; trade short.' },
        { when: '2+ items', text: 'Tryndamere takes over — crit + R make him an unkillable duelist.' }
      ],
      wants: {
        you: ['Out-trade his low-fury early with Q-E', 'Use Q (cleanse) vs his W slow + W (Courage) vs his crits', 'Bait his R (5s undying) before you R-execute'],
        foe: ['Spin (E) + crit with Q heal as fury builds', 'Reduce your AD with W and slow you', 'Scale into a crit duelist with R (can’t die 5s)']
      },
      early: "Levels 1-2 are yours — your Q-silence + E out-trade a low-fury Tryndamere. Fight him when his fury bar is low; high fury means Q heals and crits spike. His W reduces your AD and slows, but your Q cleanses the slow and your W (Courage) blunts his crits. Press your early trades before his crit items come online.",
      mid: "Respect his R (Undying Rage): for five seconds he can't drop below 1 HP, so your R execute won't kill him through it — wasting Demacian Justice into a fresh Undying is a mistake. Bait the R out (force him to use it), then re-engage and execute once it's down. Through the mid-game, W blunts his crits and your Q-E trade evenly when his R is on cooldown.",
      late: "Tryndamere takes over at two items — crit + Undying Rage make him a duelist you can't execute, and his Q heal off crits out-sustains your trades. The lane is even because you out-trade his early and he out-scales the late. Snowball your level 1-2 edge, bait his R to land your kills, and end before his crit items flip the 1v1.",
      whys: [
        "Q-silence + E out-trade a low-fury Trynd. Fight him at low fury — levels 1-2 are yours.",
        "His W cuts your AD and slows — your Q cleanses it, W blunts his crits. Trade early.",
        "Even as his fury builds — Q heal + crits spike. Trade on low-fury windows.",
        "Keep punishing low-fury Trynd; don't feed his fury stacking.",
        "His R survives your execute (can't die 5s) — bait it, don't waste R.",
        "His crit scaling trades back — W blunts it; trade short, re-engage after his R.",
        "Two items in, crit + R make him unkillable. You own early — end it before he scales."
      ]
    },
    {
      a: 'garen', b: 'illaoi',
      win: ['Garen', 'Garen', 'Garen', 'Skill', 'Illaoi', 'Garen', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q (move speed) lets you fight on open ground.' },
        { when: 'Lvl 6', text: 'Illaoi’s window — R spawns a tentacle wall; never fight in it.' },
        { when: '1st item', text: 'Your edge — Q-silence her E (Test of Spirit); out-sustain her poke.' },
        { when: 'Late', text: 'You hold it — Q-mobility keeps you out of her tentacle nest.' }
      ],
      wants: {
        you: ['Use Q (move speed) to fight on open ground / leave her tentacles', 'Q-silence her E (Test of Spirit) soul-rip', 'Out-sustain her poke with passive regen'],
        foe: ['Spawn tentacles and fight inside them', 'Rip your soul with E (Test of Spirit)', 'Slam you with empowered W in her tentacle zone']
      },
      early: "You're favoured — Illaoi is lethal inside her tentacle field but slow and beatable outside it, and your Q (Decisive Strike) gives you the move speed to fight on open ground or walk out of her nest. Her E (Test of Spirit) rips your soul; Q-silence or dodge it, because beating your vessel deals huge damage. Levels 1-3, fight on fresh ground and your regen heals her poke.",
      mid: "Level 6 is her window — R (Leap of Faith) spawns a wall of tentacles and turns any fight into a beating. Never trade inside her nest; use Q's move speed to leave it or fight before her R. Q-silence her E so she can't set up the soul-vessel, out-sustain her poke with your passive, and run her down on open ground.",
      late: "You hold the matchup — your Q-mobility keeps you out of her tentacle nest, your regen out-sustains her poke, and your R executes her. Don't side-lane into her tentacles where her R shreds you, but on open ground you win. Pull the fight to fresh ground, silence the E, and grind her out. Respect her teamfight, win the spacing.",
      whys: [
        "Your Q (move speed) lets you fight on open ground or leave her tentacles. Levels 1-3 are yours.",
        "Q-silence or dodge her E (Test of Spirit) — beating your vessel deals huge damage.",
        "Your regen heals her poke. Fight on fresh ground, away from tentacles.",
        "Don't path into her Q slams. Use Q's mobility to control the spacing.",
        "Her R spawns a tentacle wall — never fight in it. Use Q to leave it or fight before 6.",
        "Your edge — Q-silence her E; out-sustain her poke. Run her down on open ground.",
        "You hold it — Q-mobility keeps you out of her nest. Win the spacing; R-execute her."
      ]
    },
    {
      a: 'garen', b: 'vladimir',
      win: ['Garen', 'Garen', 'Garen', 'Skill', 'Skill', 'Vladimir', 'Vladimir'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence stops his Q; bully his weak early.' },
        { when: 'Lvl 6', text: 'His pool (W) dodges your R execute + Q — bait it first.' },
        { when: '1st item', text: 'Vlad’s spike — his AP sustain starts to out-heal your trades.' },
        { when: '2+ items', text: 'Vladimir takes over — full-AP scaling kites and bursts you.' }
      ],
      wants: {
        you: ['Q-silence to stop his Q before it lands', 'Bully his weak early before pool + scaling', 'Bait his Sanguine Pool (W) before you R-execute'],
        foe: ['Pool (W) your R execute, Q, and trades — untargetable', 'Farm safely and stack health + AP toward Rylai’s', 'Out-scale into an unkillable late-game AP threat']
      },
      early: "Levels 1-3 are your window — Vladimir is one of the weakest early laners, and your Q silences his Q (his main poke) while your W stacks MR against his magic. Bully him off the wave with Q-E, deny his Q stacks, and don't let him farm safely. His only escape is pool (W), so press the early before he has it; your regen negates his poke.",
      mid: "His W (Sanguine Pool) is the problem — it makes him untargetable, dodging your R execute, your Q, and your trade. Bait the pool out (force him to use it), then all-in when its long cooldown is up. Q-silence him, E-spin, and keep him low; deny his Q stacks. His AP sustain starts to out-heal your trades around his first item, so press now.",
      late: "Vladimir takes over — full-AP Vlad with Rylai's/Cosmic Drive out-sustains and kites you, and his pool dodges your entire all-in on demand. The lane is even because you crush the early but he out-scales hard. You had to snowball the level 1-3 window into a lead; if it went even, the late game is his. Close it out before his second item, build MR.",
      whys: [
        "Vlad is one of the weakest early laners. Q-silence stops his Q — bully him. Levels 1-3 are yours.",
        "Deny his Q stacks. Your W's MR and regen negate his poke. Press the early.",
        "Your Q-E out-trade a pre-pool Vlad. Keep him low.",
        "His W (pool) makes him untargetable — bait it before you R-execute or all-in.",
        "He can pool mid-execute to survive your R — time it for when W is down.",
        "His AP sustain starts out-healing your trades. Snowball before his items.",
        "Two items in, full-AP Vlad kites and bursts you. Close it before his second item; build MR."
      ]
    },
    {
      a: 'garen', b: 'shen',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E out-trade his weak base damage.' },
        { when: 'Lvl 6', text: 'R executes him; track his R when he globals to punish the wave.' },
        { when: '1st item', text: 'Still your stomp — out-trade a low-damage Shen.' },
        { when: 'Late', text: 'Shen is a teamfight peeler; you own the lane 1v1.' }
      ],
      wants: {
        you: ['Out-trade his weak damage and bait his taunt (E)', 'Punish the wave when he R-globals away', 'Snowball — his solo kill pressure is near zero'],
        foe: ['Farm even and scale; his solo pressure is low', 'Use R to impact other lanes globally', 'Become a teamfight engage / peel frontliner']
      },
      early: "You out-bully Shen — he has weak base damage and almost no solo kill pressure, so levels 1-3 are yours. Q-silence his trades, E-spin, and run him down; his Q (sword) is his only poke and his E (taunt) his only peel, so bait the taunt before you commit. He just wants to farm and scale for the map, not duel you.",
      mid: "Keep him pressured. Your Q-E out-trade him through every level, and your R executes him off your damage. The real game is tracking his R (Stand United) — when he globals to save a teammate, shove and punish his wave for CS and plates. Don't let his map value snowball other lanes while you sit even; make him pay for leaving.",
      late: "Shen is a teamfight engage/peeler, not a laner — you win the 1v1 all game. You should have a lead by now: your trades + R execute beat his low-damage frame. Keep shoving and force him to choose between farming and roaming, and the match comes down to who uses Shen's global better, not the duel you own.",
      whys: [
        "Shen has weak base damage and no kill pressure. Q-silence + E out-trade him — levels 1-3 are yours.",
        "His Q (sword) is his only poke. Trade when it's down and you out-damage him.",
        "Bait his E (taunt) — his only peel — then E-spin and run him down.",
        "Keep punishing — your Q-E out-trade him. Watch for his R global.",
        "R executes him; when he globals away, shove and punish his wave.",
        "Still your stomp — out-trade a low-damage Shen. Take plates.",
        "Late he's a teamfight peeler; you own the lane. The game is about his global."
      ]
    },
    {
      a: 'garen', b: 'swain',
      win: ['Garen', 'Garen', 'Garen', 'Skill', 'Skill', 'Skill', 'Swain'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence stops his E (root); bully his weak early.' },
        { when: 'Lvl 6', text: 'Kill him fast — his R drain out-sustains a long fight.' },
        { when: '1st item', text: 'Even — your trades vs his W poke + soul-fragment sustain.' },
        { when: '2+ items', text: 'Swain takes over — full-build drain-tank out-sustains you.' }
      ],
      wants: {
        you: ['Q-silence to stop his E (Nevermove root)', 'Bully his weak melee-mage early', 'Build/use W for MR; trade short, then regen'],
        foe: ['Land E (root) to set up his all-in', 'Stack soul fragments and out-sustain with W poke', 'Scale into a drain-tank teamfighter with R']
      },
      early: "Levels 1-3 are yours — Swain is a weak melee-range mage early, and your Q-silence stops his E (Nevermove root), which is his entire kill setup. Bully him with Q-E, deny his soul-fragment passive stacks, and don't get rooted from bush range. Your W stacks MR against his magic and your regen heals his poke between trades.",
      mid: "His R (Demonic Ascension) drain is dangerous in a long fight, so kill him FAST — burst him with Q-E before R ramps, and don't sit in the ult radius. Q-silence his root, use W's MR, and trade short. Around his first item it evens out as his W poke and sustain ramp; force decisive trades, not drain-fests.",
      late: "Swain takes over at full build — he becomes a drain-tank teamfighter who out-sustains your trades in long fights. The lane is favoured because you crush his early and he out-scales the late. Snowball your level 1-3 dominance, build MR, force short Q-silence trades, and R-execute him before his items make him unkillable.",
      whys: [
        "Q-silence stops his E (root) — his kill setup. Bully his weak early. Levels 1-3 are yours.",
        "Deny his soul-fragment stacks. W's MR + regen negate his poke.",
        "Your Q-E out-trade a pre-6 Swain. Force the trade, deny his stacks.",
        "Even as his W poke + sustain ramp. Trade short, not drawn-out.",
        "His R drain wins long fights — kill him FAST. Don't sit in the ult radius.",
        "Even — your trades vs his sustain. Short decisive trades beat his drain.",
        "Full-build Swain is a drain-tank. Win early, build MR, R-execute him."
      ]
    },
    {
      a: 'garen', b: 'warwick',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Warwick', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E out-trade a weak-early Warwick.' },
        { when: 'Lvl 6', text: 'Warwick’s window — his R (suppress) all-in; stay healthy + W it.' },
        { when: '1st item', text: 'Even — your trades vs his low-HP lifesteal; keep your HP up.' },
        { when: 'Late', text: 'You edge it — out-trade his sustain when his R is down.' }
      ],
      wants: {
        you: ['Out-trade his weak early before his lifesteal ramps', 'Stay healthy so his R all-in can’t finish you; W reduces it', 'Q-silence + E out-DPS his lifesteal'],
        foe: ['Sustain with Q lifesteal (huge when you’re low)', 'Chase you down with W (move speed on low HP)', 'All-in with R (point-blank suppress)']
      },
      early: "Levels 1-3 are yours — Warwick is a weak early laner, and your Q-silence + E out-trade him before his lifesteal ramps. His Q heals more the lower you are and his W gives chase speed, but early he can't out-trade you. Punish him, and just don't drop low yourself — his kit feeds on your missing health.",
      mid: "His all-in is R (Infinite Duress) — a point-blank suppress that locks you for a full combo, so don't get caught at low HP in his jump range at 6, and pop W (Courage) to survive it. Outside the ult your Q-E out-trade him. Keep your HP topped (so his Q lifesteal and R can't finish you) and force trades where his sustain can't out-heal you.",
      late: "You edge it — in the extended fight your trades + R execute out-grind his Q lifesteal, especially if you keep your HP up so his low-health bonuses don't trigger. Force the all-ins, deny him the low-HP windows his kit feeds on, and don't walk into a R suppress while chunked. The lane is yours early and slightly yours late if you respect the ult.",
      whys: [
        "Warwick is a weak early laner. Q-silence + E out-trade him — levels 1-3 are yours.",
        "His Q heals more the lower you are. Win the trade but don't drop low.",
        "Your Q-E out-trade him. Punish while he's weak and item-less.",
        "You out-trade through 4-5 — keep your HP up so his low-HP bonuses don't kick in.",
        "His R is a point-blank suppress all-in — stay healthy, pop W to survive it.",
        "Even — your trades vs his lifesteal. Force the all-in, stay healthy.",
        "You edge it late — out-trade his sustain when his R is down. Deny the low windows."
      ]
    },
    {
      a: 'garen', b: 'volibear',
      win: ['Garen', 'Garen', 'Skill', 'Skill', 'Volibear', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — Q-silence + E out-trade him before his W heal.' },
        { when: 'Lvl 6', text: 'Volibear’s window — his R (dive + tanky) is a strong all-in.' },
        { when: '1st item', text: 'Even — your trades vs his W lifesteal; trade short, then regen.' },
        { when: 'Late', text: 'Even — out-trade his sustain on his Q/R cooldowns.' }
      ],
      wants: {
        you: ['Q-silence his Q empowerment to deny the stun', 'Use W to blunt his all-in; trade short then regen', 'Out-trade before his W heal ramps'],
        foe: ['All-in with Q (slow + stun) into W (bite heal)', 'Sustain through trades with W lifesteal', 'Dive with R (untargetable tower, tanky)']
      },
      early: "Levels 1-2 are your window — your Q-silence + E out-trade Volibear before his W (bite) heal ramps. His Q slows and empowers his next hit (a stun if he closes), so Q-silence him to deny the stun and pop W to blunt the burst. His W heals off you, so trade decisively, then disengage and regen rather than feeding his lifesteal.",
      mid: "Level 6 is his window — R (Stratospheric Force) is a dive that disables your tower and makes him tanky, a strong all-in if you're caught low. Don't fight him at low HP when R is up; W it or fight before 6. Outside the ult your Q-E out-trade his sustain when you Q-silence the empowerment and trade short.",
      late: "Even into late — your trades versus his W lifesteal. Force fights on his Q and R cooldowns, where your Q-E + R execute out-grind his sustain. Q-silence the empowerment, W his burst, trade short and regen — don't sit in a long fight his bite-heal wins. The lane is yours early, his at the R window, even overall.",
      whys: [
        "Q-silence + E out-trade him before his W heal ramps. Levels 1-2 are yours.",
        "His Q empowerment is a stun if he closes — Q-silence it, pop W to blunt the burst.",
        "Even as his sustain ramps — trade decisively, then disengage and regen.",
        "Don't feed his W lifesteal in a long fight. Trade short.",
        "His R is a tanky tower-dive all-in — don't get caught low; W it or fight before 6.",
        "Even — your trades vs his W lifesteal. Fight on his Q/R cooldowns.",
        "Even late — out-trade his sustain. Q-silence the empowerment, trade short."
      ]
    },
    {
      a: 'garen', b: 'wukong',
      win: ['Garen', 'Garen', 'Skill', 'Wukong', 'Wukong', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — Q-silence cuts his combo; W blunts his burst.' },
        { when: 'Lvl 4–6', text: 'Wukong’s window — clone (W) juke + E-R knockup all-in.' },
        { when: '1st item', text: 'Even — Q-silence his combo, bait the clone, then trade.' },
        { when: 'Late', text: 'Even — your trades vs his cooldown burst; silence is key.' }
      ],
      wants: {
        you: ['Q-silence to cut his combo before the knockup', 'W (damage reduction) to blunt his burst', 'Bait the clone (W) before you commit'],
        foe: ['Out-trade with Q (armor shred) auto-resets', 'Juke your spin with the clone (W)', 'All-in with E-dash into R (spin knockup)']
      },
      early: "Levels 1-2 are your window — your Q silences Wukong's combo and your W blunts his burst. His Q shreds your armour and resets his auto, and his clone (W) jukes your E-spin and disengages, so don't dump your spin at a clone. Bait the W, Q-silence, then E-spin; your regen heals his poke between trades.",
      mid: "Levels 4-6 are his window — clone juke into E (dash) + R (spin knockup) is a real burst all-in. Don't get caught at low HP when his combo is up. Q-silence him as he commits to cancel the knockup, W the burst, and survive the clone juke. Track his E and R cooldowns; bait the clone before you trade.",
      late: "Even into late — Wukong's damage is cooldown-reliant burst, and your Q-silence is the key: cancel his combo and he can't trade. When his clone and cooldowns are down, your Q-E + W out-trade him. Bait the clone before every commit, R-execute him low, and don't get caught by the W juke at low HP. Silence timing decides it.",
      whys: [
        "Q-silence cuts his combo and W blunts his burst. Levels 1-2 are your window.",
        "His clone (W) jukes your spin. Bait it before you commit; don't spin at a clone.",
        "Even — Q-silence, then E-spin. Your regen heals his poke.",
        "His window — clone into E-R knockup is a burst all-in. Don't be low when it's up.",
        "Q-silence as he commits to cancel the knockup; W the burst, survive the juke.",
        "Even — Q-silence his combo, bait the clone, then trade.",
        "Even late — your trades vs his cooldown burst. Silence is key; R-execute low."
      ]
    },
    {
      a: 'garen', b: 'yasuo',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Yasuo'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence cuts his combo; run him down with Q.' },
        { when: 'Lvl 6', text: 'R executes him; he needs a knockup for his R, which he lacks solo.' },
        { when: '1st item', text: 'Still your stomp — deny CS so his crit spike comes late.' },
        { when: '2+ items', text: 'Yasuo takes over — crit item spikes out-DPS your trades.' }
      ],
      wants: {
        you: ['Q-silence to cut his combo and dashes', 'Run him down with Q (move speed); W blunts his burst', 'Win before his crit item spikes; R-execute low'],
        foe: ['Poke with Q tornado and dash on minions (E)', 'Shield your trades with his passive', 'Scale into a crit hypercarry at 2 items']
      },
      early: "You stomp Yasuo early — your Q (Decisive Strike) silences him so he can't dash-combo, and gives you move speed to run him down. His passive shield blunts a little, but your W (Courage) eats his burst and your E-spin out-damages him. His windwall (W) blocks projectiles, but your kit isn't projectile-based, so it barely matters. Levels 1-3 are yours.",
      mid: "Keep punishing. Q-silence cancels his dashes and combo, W blunts his burst, and at 6 your R executes him. His R needs a knockup to use, which he lacks solo, so he has no burst all-in to answer yours. Run him down with Q's move speed, deny his CS, and don't let him free-poke; his only comeback is a crit spike.",
      late: "Yasuo takes over at two items — IE + crit out-DPS your trades and he duels back. The lane is favoured because you dominate the early-mid with silence; convert it. Snowball off the Q-silence stomp, R-execute him, deny his farm, and end before his crit spike. A farmed Yasuo flips the 1v1, so close the game on your lead.",
      whys: [
        "Q-silence cuts his dash-combo; Q gives MS to run him down. Levels 1-3 are yours.",
        "His passive shield blunts a little — W eats his burst, E-spin out-damages him.",
        "His windwall barely matters vs your kit. Run him down, force trades.",
        "Keep him off CS — his only comeback is a crit spike. Deny it.",
        "R executes him; his R needs a knockup he lacks solo. No all-in to answer yours.",
        "Still your stomp — deny farm so his crit spike comes late.",
        "Two items in, crit out-DPS your trades. Close the game on your lead."
      ]
    },
    {
      a: 'garen', b: 'yone',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Yone'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence cuts his dashes; run him down with Q.' },
        { when: 'Lvl 6', text: 'R executes him; punish him after he commits E (spirit form).' },
        { when: '1st item', text: 'Still your stomp — W blunts his burst; deny CS.' },
        { when: '2+ items', text: 'Yone takes over — crit + mobility out-DPS your trades.' }
      ],
      wants: {
        you: ['Q-silence to cut his Q dash + combo', 'Run him down with Q (move speed); W blunts his burst', 'Punish him after he commits E (spirit form)'],
        foe: ['Poke with Q and dash on the third cast', 'Retreat with E (spirit form snaps him back)', 'All-in with R (knockup) and scale to crit']
      },
      early: "You stomp Yone early — your Q silences him so he can't dash-combo, and gives you move speed to stick to him. His Q dashes on the third cast and his E (spirit form) lets him commit then snap back, but a silenced Yone can't combo or escape cleanly. W (Courage) eats his burst, E-spin out-damages him. Levels 1-3 are yours.",
      mid: "Keep punishing. Punish him after he commits E — he's locked into the return path and can't escape your run-down. Q-silence his combo, W his burst, and at 6 your R executes him. His R is a knockup all-in, but a silenced Yone rarely lands the setup. Run him down with Q's move speed and deny his CS.",
      late: "Yone takes over at two items — crit + his mobility out-DPS and kite your trades, and his E/R make him slippery. The lane is favoured because you out-trade his early-mid with silence; convert it. Snowball off the Q-silence stomp, R-execute him, and build a lead before his crit items flip the duel. Don't let him free-poke into scaling.",
      whys: [
        "Q-silence cuts his dash-combo; Q gives MS to stick. Levels 1-3 are yours.",
        "His Q dashes and E darts, but a silenced Yone can't combo or escape. W eats his burst.",
        "Your Q-E out-trade him. Run him down with Q's move speed.",
        "Punish him after he commits E (locked into the return). Q-silence his combo.",
        "R executes him; a silenced Yone rarely lands his R setup.",
        "Still your stomp — W blunts his burst; deny CS.",
        "Two items in, crit + mobility out-DPS your trades. Close before he scales."
      ]
    },
    {
      a: 'garen', b: 'yorick',
      win: ['Garen', 'Garen', 'Garen', 'Skill', 'Yorick', 'Skill', 'Yorick'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E out-trade him before Maiden + ghouls.' },
        { when: 'Lvl 6', text: 'Yorick’s window — Maiden (R) + W cage answer your trades.' },
        { when: '1st item', text: 'Even — burst him 1v1 off his cage cooldown.' },
        { when: '2+ items', text: 'Yorick takes over — Maiden + ghouls out-DPS your trades.' }
      ],
      wants: {
        you: ['Q-silence + E before Maiden and ghouls are online', 'Use Q (move speed) to leave his W (cage)', 'Burst him 1v1 before his sustained ghoul DPS'],
        foe: ['Wall you in with W (cage) and pile on ghouls', 'Ramp sustained damage with Maiden (R)', 'Out-DPS you late and splitpush with Maiden']
      },
      early: "Levels 1-3 are yours — your Q-silence + E out-trade Yorick before his ghouls and Maiden are up. While he's just a melee juggernaut with mist ghouls, punish him; don't let him free-farm into his power spike. His E (mist) marks you for ghoul damage, so dodge it, and your Q's move speed lets you stick or disengage.",
      mid: "His W (Dark Procession) is a ghoul cage that traps you mid-fight — but your Q (Decisive Strike) gives move speed to walk out of it before it fully forms. At 6 his Maiden (R) ramps his sustained damage, so don't trade in a wall of ghouls; pick your moment when his cage is down and burst him 1v1, where your Q-E still win.",
      late: "Yorick takes over in the extended fight — Maiden plus a full ghoul pack out-DPS your trades, and he splitpushes with Maiden pressure. The lane is even because you crush the early and he out-grinds the late. Snowball your level 1-3 edge, use Q to escape his cage, and end before his 2-item Maiden setup out-grinds you.",
      whys: [
        "Q-silence + E out-trade him before Maiden. Levels 1-3 are yours — punish the melee juggernaut.",
        "Dodge his E (mist mark) and don't let him free-farm to his spike.",
        "Your Q-E out-trade a pre-Maiden Yorick. Force the trade, deny his setup.",
        "Even as Maiden nears — use Q's move speed to leave his W cage.",
        "Maiden (R) ramps his DPS — don't trade in a ghoul wall. Burst him 1v1 off cage cooldown.",
        "Even — burst him 1v1 when his cage is down. Q-walk out of the cage.",
        "Two items in, Maiden + ghouls out-DPS your trades. End it before his scaling."
      ]
    },
    {
      a: 'garen', b: 'gnar',
      win: ['Gnar', 'Skill', 'Garen', 'Garen', 'Skill', 'Garen', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Mini Gnar pokes and kites — farm, your regen heals it.' },
        { when: 'Mini form', text: 'Your window — Q (move speed) runs down a Mini Gnar.' },
        { when: 'Mega form', text: 'Mega Gnar’s W stun + R wall answer you — W it, avoid walls.' },
        { when: 'Late', text: 'Even — the lane swings on his rage bar, not the clock.' }
      ],
      wants: {
        you: ['Use Q (move speed) to run down Mini Gnar', 'All-in when he’s Mini / out of rage', 'Avoid walls; W (damage reduction) his Mega burst'],
        foe: ['Poke + kite in Mini form with Q (boomerang) + E hop', 'Build rage, transform, and W-stun you for burst', 'Use Mega R to knock you into walls / tower']
      },
      early: "Gnar's threat is his rage bar, not his level. In Mini form he's a squishy ranged kite — Q boomerang poke, E hop — but your Q (Decisive Strike) gives the move speed to close and run him down. Farm through his Mini poke (your regen heals it), watch his rage, and look for the run-down window before he transforms.",
      mid: "Time your aggression to his form. Q-in and run down a Mini, out-of-rage Gnar — your Q-E shred his squishy frame. Don't commit when he's about to transform: Mega Gnar's W stuns you and his combo chunks, and his R can knock you into a wall. Pop W to blunt the Mega burst, avoid terrain, then catch him Mini again.",
      late: "Even — the lane swings on his rage management, not the game clock. In teamfights respect Mega Gnar's R (a wall-pin AOE), but in the side lane you out-duel Mini Gnar whenever your Q closes the gap. Keep punishing his Mini windows, dodge the Mega W stun, and never let him combo you against a wall.",
      whys: [
        "Mini Gnar pokes and kites. Farm — your regen heals it. Q closes the gap. Levels 1-2 are his.",
        "He builds rage as he pokes. Q-in on a Mini Gnar before he transforms.",
        "Your window — Q's move speed runs down a Mini Gnar. Q-E shred him.",
        "All-in when he's Mini and out of rage. He can't kite a Q-empowered Garen.",
        "Mega Gnar's W stuns and bursts — W it, stay off walls for his R.",
        "Catch him Mini again with Q + E. Avoid the Mega-form windows.",
        "Even — it swings on his rage, not the clock. Out-duel Mini, dodge Mega's W."
      ]
    },
    {
      a: 'garen', b: 'gragas',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E out-trade him; bait his W.' },
        { when: 'Lvl 6', text: 'R executes him; don’t get knocked under tower by his R (cask).' },
        { when: '1st item', text: 'Your edge — out-trade his poke; force trades on his W cooldown.' },
        { when: 'Late', text: 'You hold it — out-trade his sustain in short fights.' }
      ],
      wants: {
        you: ['Bait his W (damage reduction) before you commit', 'Q-silence + E out-trade his poke', 'Out-trade short; R-execute him low'],
        foe: ['Poke with Q (cask) and heal with W', 'Engage or escape with E (body slam stun)', 'Knock you out of position with R (cask)']
      },
      early: "Levels 1-3 are yours — your Q-silence + E out-trade Gragas. He pokes with Q (cask) and his W reduces incoming damage while healing, so don't dump your combo into a raised W; bait it, then Q-silence and E-spin. His E (body slam) is a dash-stun for engage or escape, so play around it. Your regen heals his poke between trades.",
      mid: "Keep punishing. Bait the W, then Q-E and out-trade his poke; your R executes him off your damage. At 6 watch his R (Explosive Cask) — it can knock you under his tower or peel you off — so don't all-in near his turret. Q-silence his combo, trade short, and force the fight when his W is down.",
      late: "You hold the edge — your Q-E + R execute out-trade his poke and W sustain in short fights. Force the all-ins, bait the W, and don't get cask'd out of position. Snowball your early dominance into towers and plates; Gragas is a utility/teamfight pick late, not a duelist who beats your trades. The lane stays yours.",
      whys: [
        "Q-silence + E out-trade him — bait his W first. Levels 1-3 are yours.",
        "His E (body slam) is a dash-stun. Play around it; your regen heals his poke.",
        "Your Q-E out-trade his poke. Force the trade once his W is down.",
        "Keep punishing — out-trade his poke; force trades on his W cooldown.",
        "R executes him. Don't all-in near his tower — his R can knock you in.",
        "Your edge — bait the W, then Q-E. Trade short.",
        "You hold it — out-trade his sustain in short fights. Don't get cask'd out of position."
      ]
    },
    {
      a: 'garen', b: 'gangplank',
      win: ['Garen', 'Garen', 'Skill', 'Garen', 'Skill', 'Skill', 'Gangplank'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — Q (move speed) closes on a squishy GP; silence + E.' },
        { when: 'Lvl 6', text: 'R executes him; his W cleanses your slow but not your silence.' },
        { when: '1st item', text: 'GP’s spike — his crit Q + barrels start to out-poke you.' },
        { when: '2+ items', text: 'Gangplank takes over — crit + barrel chains out-DPS you.' }
      ],
      wants: {
        you: ['Use Q (move speed) to close on a squishy GP', 'Detonate or dodge his barrels (E)', 'Q-silence + E; win before his crit items'],
        foe: ['Poke with Q (Parrrley) and chain barrels (E)', 'Cleanse your CC / slow with W (Remove Scurvy)', 'Out-scale into a crit + barrel teamfight threat']
      },
      early: "Levels 1-2 are your window — Gangplank pokes with Q (Parrrley) and sets up barrels (E), but he's squishy with no escape, so your Q (Decisive Strike) closes the gap and your Q-silence + E shred him. Don't let him free-poke from range; walk him down behind minions and destroy his barrels before they chain. Catch him once and you win the trade.",
      mid: "His W (Remove Scurvy) cleanses your Q slow and heals, but it can't stop the silence portion — Q-silence him to cut his barrel detonation, then E-spin. Keep destroying his barrels so he can't combo them, and force trades where his squishy frame loses to your damage. At 6 your R executes him before his crit items.",
      late: "Gangplank takes over at two items — crit Q + chained barrels out-DPS your trades and his R (Cannon Barrage) zones the map. The lane is even because you crush him early and he crushes late. Press your spike, run him down with Q, deny his barrel setups, and end before his crit items make the poke lethal.",
      whys: [
        "GP pokes with Q but is squishy. Your Q closes the gap — silence + E shred him. Levels 1-2 are yours.",
        "Destroy his barrels (E) before they chain. Walk him down behind minions.",
        "Q-silence cuts his barrel detonation. Force the trade on his squishy frame.",
        "Run him down with Q — his crit spike nears, so force trades now.",
        "R executes him; his W cleanses your slow but not your silence.",
        "GP's first item flips it — crit Q + barrels out-poke you. Close before that.",
        "Two items in, crit + barrels out-DPS you. End it before his scaling."
      ]
    },
    {
      a: 'garen', b: 'quinn',
      win: ['Quinn', 'Skill', 'Garen', 'Garen', 'Skill', 'Garen', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Quinn pokes with autos + Q (blind) — farm, your regen heals it.' },
        { when: 'Lvl 4–6', text: 'Your window — Q (cleanse + MS) runs her down through the kite.' },
        { when: '1st item', text: 'You catch her — Q-silence stops her kite; she’s squishy.' },
        { when: 'Late', text: 'Even — she roams for picks; you win when you catch her.' }
      ],
      wants: {
        you: ['Use Q (cleanse + move speed) to run her down', 'Q-silence stops her kite; she’s squishy and folds', 'Punish her roams; out-sustain her poke with regen'],
        foe: ['Poke with autos + Q (Blinding Assault) and kite', 'Vault (E) over you to reset and dodge', 'Roam with R (Behind Enemy Lines) for picks']
      },
      early: "Quinn is a ranged lane bully — she pokes with autos and Q (which blinds your E spin + autos), and her E (Vault) hops over you to reset. Levels 1-2 she out-ranges you; hug your minions, take the chip (your regen heals it), and wait for your run-down window. Her move-speed kite is annoying, but she has no escape once you reach her.",
      mid: "Your window opens with Q (Decisive Strike) — it cleanses her blind's slow and gives move speed to close, and the silence stops her from kiting or vaulting away cleanly. Bait the Vault, then Q-in, E-spin, and run her down; at 6 your R executes her squishy frame. She can't kite a Q-empowered, silencing Garen who out-sustains her poke.",
      late: "Even — Quinn's late game is roaming for picks with her R, not winning the side-lane 1v1, which you own once you catch her. Hug minions to deny free poke, close on her Vault cooldown with Q, and punish her roams by taking the wave. If she kites freely she chips you; your whole game is the Q-run-down that catches her.",
      whys: [
        "Quinn pokes with autos + Q (blind) and kites. Farm — your regen heals it. Levels 1-2 are hers.",
        "Her E (vault) hops over you to reset. Hug minions, wait for your Q window.",
        "Your Q cleanses her blind's slow + gives MS. Bait the vault, then run her down.",
        "Q-in, E-spin, silence her — she can't kite or vault away cleanly.",
        "R executes her squishy frame. She can't kite a Q-empowered Garen.",
        "You catch her — Q-silence stops her kite; she's squishy and folds.",
        "Even — she roams late, you win when you catch her. Punish her roams."
      ]
    },
    {
      a: 'garen', b: 'drmundo',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Dr. Mundo'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E out-trade a low-HP Mundo.' },
        { when: 'Lvl 6', text: 'R is % missing-HP true damage — it cuts through his regen.' },
        { when: '1st item', text: 'Your edge — your R execute beats his HP; force trades.' },
        { when: 'Late', text: 'Mundo out-tanks trades, but your R + Villain still threaten him.' }
      ],
      wants: {
        you: ['Out-trade his weak early before his HP scaling', 'Use R (% missing-HP true damage) to punch through his regen', 'Q-silence + E; bring grievous wounds for his sustain'],
        foe: ['Throw cleavers (Q) and farm through your trades', 'Out-sustain with passive regen + R heal', 'Stack HP and become an unkillable regen tank']
      },
      early: "Levels 1-3 are yours — Mundo has no early kill pressure and only chucks cleavers (Q), so your Q-silence + E out-trade him while he's still low-HP. Unlike most bruisers, you have an answer to his scaling: your R (Demacian Justice) deals true damage scaling with his missing health, punching through the regen tank he becomes. Bully him off CS now.",
      mid: "Keep pressuring. Your Q-E out-trade his cleaver poke, and grievous wounds (bring it) cuts his regen and R heal. The key tool is your R — as a % missing-HP true-damage execute, it ignores his armour and HP stacking, so a chunked Mundo is always in execute range. Deny CS and snowball before his HP gets out of hand.",
      late: "Mundo out-tanks your basic trades eventually — his HP + regen shrug off your Q-E — but your R execute and Villain mark keep threatening him in a way most champs can't. The lane is favoured because you bully the early and your R answers his scaling. Snowball the lead, bring antiheal, and use R to punish him whenever he's low.",
      whys: [
        "Mundo has no early kill pressure. Q-silence + E out-trade a low-HP Mundo. Levels 1-3 are yours.",
        "He throws cleavers and farms. Bully him off CS while he's squishy.",
        "Your Q-E out-trade his poke. Bring grievous wounds for his regen.",
        "Keep pressuring — your R (% missing-HP true damage) punches through his tankiness.",
        "R is % missing-HP true damage — it cuts through his regen. A chunked Mundo is in range.",
        "Your edge — your R execute beats his HP. Force trades, snowball.",
        "Mundo out-tanks trades late, but your R + Villain still threaten him. Antiheal + R."
      ]
    },
    {
      a: 'garen', b: 'chogath',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Skill', "Cho'Gath"],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E crush him; dodge his Q (rupture).' },
        { when: 'Lvl 6', text: 'His R is true-damage — R-execute him before he stacks HP.' },
        { when: '1st item', text: 'Still your edge — deny stacks so his HP scaling never arrives.' },
        { when: '2+ items', text: 'Cho takes over — stacked HP + true-damage R out-tank you.' }
      ],
      wants: {
        you: ['Q-silence his W (scream); dodge his Q (rupture)', 'Out-trade before he stacks HP off his R', 'Use R execute before his tank scaling'],
        foe: ['Land Q (knockup) into W (silence) for a trade', 'Farm safely and stack HP with R (Feast)', 'Scale into an unkillable true-damage teamfight tank']
      },
      early: "Levels 1-3 are yours — Cho'Gath is a weak-early tank scaler, and your Q-silence + E out-trade him so long as you dodge his combo. His Q (Rupture) is a telegraphed knockup and his W (Feral Scream) silences; sidestep the Q, Q-silence him first so he can't chain it, and bully him off CS. Deny the farm that lets him stack.",
      mid: "Keep him starved. Your Q-E out-trade a low-stack Cho, and your R (% missing-HP true damage) threatens him even as he builds HP — but respect his R (Feast), a true-damage nuke that chunks you when low. Don't trade at low HP. Zone his CS to keep him off HP stacks, and snowball before his scaling.",
      late: "Cho takes over at two items — stacked HP off his R plus true damage make him a teamfight tank your trades can't crack. The lane is even-favoured because you dominate the early; convert it. Snowball off the early stomp, deny his farm, use R to punish him low, and end before his HP stacking makes you irrelevant.",
      whys: [
        "Cho is weak early. Q-silence + E crush him — dodge his Q (rupture). Levels 1-3 are yours.",
        "His W silences mid-combo. Q-silence him first so he can't chain it.",
        "Your Q-E out-trade a weak-early Cho. Zone his CS, deny stacks.",
        "Keep him off HP stacks — your R threatens him even as he builds HP.",
        "His R is a true-damage nuke — R-execute him before he stacks; don't trade low.",
        "Still your edge — deny stacks so his scaling never arrives.",
        "Two items in, stacked HP + true damage out-tank you. End the game early."
      ]
    },
    {
      a: 'garen', b: 'tahmkench',
      win: ['Garen', 'Garen', 'Garen', 'Skill', 'Skill', 'Skill', 'Tahm Kench'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Your window — Q-silence + E punish his weak early.' },
        { when: 'Lvl 6', text: 'His W (Devour) grey health resets trades — R-execute him fast.' },
        { when: '1st item', text: 'Even — he out-sustains with grey health; trade decisively.' },
        { when: 'Late', text: 'Tahm takes over — tanky grey-health frontliner shrugs your trades.' }
      ],
      wants: {
        you: ['Q-silence + E his weak early before grey health', 'R-execute fast — grey health (W passive) heals your trades off', 'Pin him under tower; he has no waveclear'],
        foe: ['Tank your trades with grey health (passive)', 'Reposition out of position with W (Devour escape)', 'Scale into a tanky teamfight peeler / saver']
      },
      early: "Levels 1-2 are your window — Tahm Kench has a weak early and no waveclear, so your Q-silence + E punish him before his grey health and tank items come online. Don't walk into a W (Devour) for a free grey-health trade, but otherwise pin him, deny CS, and bully him; he just wants to survive and scale.",
      mid: "His grey health (passive) banks a chunk of your damage as a healing shield, resetting your trade pressure. Burst him decisively — Q-silence, E-spin, and at 6 R-execute him (your true damage still threatens through grey health) rather than chipping. His W can reposition him out of your run-down, so don't let him W away mid-fight to safety.",
      late: "Tahm takes over — he becomes a tanky grey-health frontliner/peeler who shrugs off your trades and saves his carries. The lane is favoured because you bully the early and he out-sustains the late. Snowball your level 1-2 window, force fast committed trades + R execute before his grey health resets, and end before his tank items make you irrelevant.",
      whys: [
        "Tahm has no waveclear and a weak early. Q-silence + E punish him — levels 1-2 are yours.",
        "Don't walk into a W (Devour) for a free grey-health trade. Pin him, deny CS.",
        "His grey health banks your damage as a healing shield. Burst decisively, don't chip.",
        "Commit to single fast trades — drawn-out trades feed his grey health.",
        "His W resets trades and repositions him. R-execute him fast through grey health.",
        "Even — he out-sustains with grey health. Commit to fast trades + R.",
        "Tahm takes over — tanky grey-health frontliner shrugs your trades. End early."
      ]
    },
    {
      a: 'garen', b: 'ksante',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill', "K'Sante"],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E out-trade a pre-item K’Sante.' },
        { when: 'Lvl 6', text: 'His R (All Out) duel form — W blunts it, R-execute him low.' },
        { when: '1st item', text: 'Still your stomp — bait his W (block); deny his farm.' },
        { when: '2+ items', text: 'K’Sante takes over — tanky stance + items out-sustain you.' }
      ],
      wants: {
        you: ['Q-silence + E before his items make him tanky', 'Bait his W (block) — don’t feed it your spin', 'W blunts his R duel form; R-execute him low'],
        foe: ['Block your combo with W (damage reduction)', 'Knock you with Q and dash with E (shield)', 'Pop R (All Out) to duel, or stay tanky to scale']
      },
      early: "Levels 1-3 are yours — K'Sante is weak before items, and your Q-silence + E out-trade him (this is one of your strongest lanes). His W blocks damage and can interrupt, so don't dump your spin into a held W; Q-silence him, bait the W, then E. His Q knocks back and his E dashes + shields, but he can't match your raw trade pre-item.",
      mid: "His big spike is R (All Out): he sheds tankiness to become a high-damage duelist with extra dashes, so pop W (Courage) to blunt that burst and R-execute him when low. Outside of it, your Q-E out-trade his tankier stance. Bait his W block, then commit, and keep him off the items that make him unkillable.",
      late: "K'Sante takes over at two items — his tank stance plus item sustain out-grind your trades, and his R lets him pick the duel terms. The lane is heavily favoured because you crush him early; convert it. Snowball your level 1-3 edge, R-execute him, deny his farm, and end before his scaling flips the side-lane 1v1.",
      whys: [
        "K'Sante is weak pre-item. Q-silence + E out-trade him — one of your best lanes. Levels 1-3 are yours.",
        "His W blocks and can interrupt. Q-silence, bait the W, then E — don't feed it.",
        "Your Q-E out-trade a pre-item K'Sante. Force the trade, deny his farm.",
        "Keep punishing — deny his farm so his item spikes come late.",
        "His R (All Out) is a burst duel form — W blunts it, R-execute him low.",
        "Still your stomp — bait his W block, then commit. Snowball.",
        "Two items in, tank stance + items out-sustain you. End it before his scaling."
      ]
    },
    {
      a: 'garen', b: 'poppy',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Skill', 'Poppy'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E out-damage her low base damage.' },
        { when: 'Lvl 6', text: 'R executes her; her R knockback only delays your trade.' },
        { when: '1st item', text: 'Still your edge — she has no kill threat; deny her farm.' },
        { when: 'Late', text: 'Poppy out-tanks you — she scales to a teamfight peeler.' }
      ],
      wants: {
        you: ['Q-silence + E out-damage her low damage', 'Stand off walls so her E (stun) can’t pin you', 'Snowball before she builds tanky'],
        foe: ['Stun you into a wall with E (Heroic Charge)', 'Stop dash-engages with her W passive', 'Scale to a tanky teamfight peeler']
      },
      early: "Levels 1-3 are yours — Poppy deals low damage and can't out-trade your Q-silence + E. Her threats are positional: E (Heroic Charge) stuns you if it slams you into a wall, so stand away from terrain. Her W passive grounds dash-users, but you don't rely on dashes, so it barely affects you. Punish her low damage and bully her off CS.",
      mid: "Your Q-E simply out-damage her. Trade freely away from walls — she has no way to win the damage race — and at 6 your R executes her. Her R (Keeper's Verdict) can knock you away to delay your trade, but it doesn't save her from your run-down. Q-silence, E-spin, and keep her off farm; her low kill pressure means you dictate the lane.",
      late: "Poppy out-tanks you eventually — she builds resistances and becomes a teamfight peeler with a big R disengage, and your trades crack her less over time. The lane is favoured because you bully the early and she out-tanks the late. Snowball your level 1-3 dominance, take plates, and end before her tankiness makes your trades tickle.",
      whys: [
        "Poppy deals low damage. Q-silence + E out-damage her — levels 1-3 are yours.",
        "Her E stuns you into a wall. Stand off terrain; her W doesn't affect your kit.",
        "Your Q-E out-damage her. Force the trade away from walls.",
        "Keep her off farm — she has no kill threat. Bully her.",
        "R executes her; her R knockback only delays your trade.",
        "Still your edge — deny her farm before she builds tanky.",
        "Poppy out-tanks you late — she scales to a teamfight peeler. End early."
      ]
    },
    {
      a: 'garen', b: 'kayle',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Kayle'],
      spikes: [
        { when: 'Lvl 1–5', text: 'Your window — Kayle is the weakest early champ. Q-silence + E stomp her.' },
        { when: 'Lvl 6', text: 'R executes her; her R (invuln) only delays it. All-in on cooldown.' },
        { when: '1st item', text: 'Still your stomp — trap her under tower, deny CS + XP.' },
        { when: 'Lvl 11 / 16', text: 'Kayle’s spikes — ranged form (11) + untouchable R (16) win the game.' }
      ],
      wants: {
        you: ['Trap her under tower; deny CS and XP relentlessly', 'Q-silence + E + run-down on every cooldown pre-11', 'Build a game-ending lead before her level 11 spike'],
        foe: ['Survive the brutal early and farm safely', 'Hit level 11 (ranged form) to flip the lane', 'Reach level 16 R and become an unkillable carry']
      },
      early: "You stomp the LANE — Kayle is the single weakest early champion, and your Q-silence + E + Q-run-down delete her. She has no escape and can't trade back. But the matchup is rated tricky because she wins the GAME if she scales, so your whole job from minute one is to deny her: trap her under tower and starve CS + XP.",
      mid: "Free-kill territory. She dies to your combo, so all-in on every cooldown and perma-zone her off the wave. Your R executes her, and her R (Intervention invuln) only delays the kill — wait it out, then finish. Use Q's move speed to run her down, dive her under tower with jungle help; you must build a lead so big she's irrelevant before level 11.",
      late: "This is why it's tricky despite you crushing lane: at level 11 her ranged form out-ranges you, and by 16 her R makes her an untouchable carry. You must win the GAME early — end it on the map with your lead — or you simply lose it late. Snowball the lane stomp into objectives and towers; don't let a farmed Kayle reach her spikes.",
      whys: [
        "Kayle is the weakest level-1 in the game. Q-silence + E stomp her — but you can't let her scale.",
        "She has no escape and dies to your combo. Trap her under tower, deny CS + XP.",
        "All-in on cooldown — run her down with Q. Perma-zone her off the wave.",
        "Keep her broke — every denied minion delays her 11/16 spikes. Dive with jungle.",
        "R executes her; her R (invuln) only delays it. Wait it out, then finish.",
        "Still your stomp — build a game-ending lead before level 11.",
        "Why it's tricky: at 11 she out-ranges you, by 16 she's untouchable. Win the game early or lose late."
      ]
    },
    {
      a: 'garen', b: 'kennen',
      win: ['Kennen', 'Skill', 'Garen', 'Garen', 'Skill', 'Garen', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Kennen pokes with Q from range — farm, your regen heals it.' },
        { when: 'Lvl 4–6', text: 'Your window — Q (move speed) + W (MR) close and run him down.' },
        { when: '1st item', text: 'You catch him — Q-silence + R execute delete a squishy Kennen.' },
        { when: 'Late', text: 'Even-to-yours — build MR; you win when you reach him.' }
      ],
      wants: {
        you: ['Use Q (move speed) to close his poke; W for MR', 'Q-silence + R-execute a squishy Kennen once you catch him', 'Out-sustain his poke with your passive regen'],
        foe: ['Poke you out with Q (shuriken) from range', 'Kite with E (Lightning Rush move speed)', 'Burst you with R (stun) + E when you’re low']
      },
      early: "Kennen out-ranges you and pokes with Q (shuriken), so levels 1-2 he chips you — but your passive regen heals it between waves, and your W stacks MR against his magic. Hug your minions, take the poke, and wait for your run-down window. Unlike most melees, you have the tools (Q move speed, W MR, regen) to beat a kiting Kennen.",
      mid: "Your window opens with Q (Decisive Strike) — its move speed closes the gap his E tries to keep, and W (Courage) blunts his burst. Q-silence him when you reach him (it stops his combo), E-spin, and at 6 your R executes his squishy frame. Build MR, close on his E cooldown, and run him down; he can't kite a Q-empowered Garen forever.",
      late: "Even-to-yours into late — Kennen kites and pokes, but your mobility + MR + R execute mean you win every time you reach him. Hug minions to deny free poke, build MR, and close on his E cooldown with Q. He scales into a teamfight AOE-stun threat, so close the lane and don't let him free-poke you down before your run-down lands.",
      whys: [
        "Kennen out-ranges you with Q poke. Hug minions — your regen heals it. Levels 1-2 are his.",
        "His E (Lightning Rush) darts in and out. Take the poke, wait for your Q window.",
        "Your Q (move speed) + W (MR) close the gap. Run him down.",
        "Q-silence + E once you reach him — your regen out-sustains his poke.",
        "R executes his squishy frame. Build MR, close on his E cooldown.",
        "You catch him — Q-silence + R execute delete a squishy Kennen.",
        "Even-to-yours late — build MR; you win when you reach him. Close the lane."
      ]
    },
    {
      a: 'garen', b: 'singed',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q (cleanse + MS) runs him down through his goo.' },
        { when: 'Lvl 6', text: 'R executes him; his R speed can’t outrun a Q-empowered Garen.' },
        { when: '1st item', text: 'Your edge — Q cleanses his goo slow; catch him on his fling cooldown.' },
        { when: 'Late', text: 'He splitpushes; you won lane — match his side pressure or group.' }
      ],
      wants: {
        you: ['Use Q (cleanse + move speed) to run him down through goo', 'Q-silence + E once you catch him; R-execute low', 'Punish his fling (E) cooldown'],
        foe: ['Proxy the wave and kite you through poison', 'Fling (E) you into bad spots with goo + R', 'Out-macro the lane without committing']
      },
      early: "You beat Singed — your Q (Decisive Strike) cleanses his W (goo) slow and gives move speed, so you can actually run him down through his poison, unlike most champs he kites. Land Q, catch him as he flings or proxies, Q-silence and E-spin. Don't chase blindly into his team, but in lane your Q-mobility turns his kite game into a kill.",
      mid: "Keep catching him. Your R executes him, and his R speed steroid can't outrun a Q-empowered Garen with cleanse. Punish his E (Fling) cooldown — after he flings, he's committed and your Q closes the gap clean. Don't tower-dive a Singed who can kite, but in lane your run-down beats his hit-and-run every time it connects.",
      late: "Singed becomes a splitpush/proxy menace, but you won the lane — your Q-mobility denied his kite all game. Match his side-lane pressure or group with your team; your Q cleanse and run-down let you catch him in skirmishes too. Don't tilt-chase through poison, but you hold the lane edge — convert it into towers and tempo.",
      whys: [
        "Your Q cleanses his goo slow + gives MS to run him down. Levels 1-3 are yours.",
        "Don't chase blindly into his team. Catch him as he flings or proxies.",
        "Q-silence + E once you catch him. Your cleanse beats his slow.",
        "Keep catching him — punish his fling cooldown with Q's move speed.",
        "R executes him; his R speed can't outrun a Q-empowered Garen.",
        "Your edge — Q cleanses his goo; catch him on his fling cooldown.",
        "He splitpushes late; you won lane. Match his side pressure or group."
      ]
    },
    {
      a: 'garen', b: 'ryze',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Ryze'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence stops his combo; bully his weak early.' },
        { when: 'Lvl 6', text: 'R executes him; dodge his W (root), then Q-silence + E.' },
        { when: '1st item', text: 'Still your stomp — deny CS so his item scaling comes late.' },
        { when: '2+ items', text: 'Ryze takes over — mana-stacked, tanky, he out-DPS you.' }
      ],
      wants: {
        you: ['Q-silence to stop his Q-E combo', 'Bully his weak early before his item scaling', 'W for MR; run him down with Q, R-execute low'],
        foe: ['Poke with Q-E spread combo from range', 'Lock you with W (root) to kite', 'Out-scale into a tanky, high-DPS mana mage']
      },
      early: "Levels 1-3 are yours — Ryze is weak early, and your Q silences his Q-E combo (his whole damage pattern) while your W stacks MR. Bully him off the wave with Q-E, deny his mana/item stacking, and don't get rooted from bush range into a full combo. Your Q's move speed closes the gap his poke tries to keep, and your regen heals the chip.",
      mid: "Dodging his W root is the key — if he whiffs it, your Q-silence shuts off his combo and you run him down. Bait the W, then Q-in, silence, E-spin, and at 6 your R executes him. Keep him off CS and deny his mana/item stacking; every minute that passes moves the matchup toward him, so press now.",
      late: "Ryze takes over at two items — stacked mana plus tank items make him a high-DPS, hard-to-kill mage, and his root + poke control the fight. The lane is favoured because you crush his early and he out-scales the late. Snowball your level 1-3 dominance, R-execute him, deny his farm, and end before his item spikes flip the duel.",
      whys: [
        "Ryze is weak early. Q-silence stops his combo — bully him. Levels 1-3 are yours.",
        "Deny his mana/item stacking. W's MR + regen negate his poke.",
        "Your Q-E out-trade a weak-early Ryze. Don't get rooted from bush.",
        "Keep punishing — dodge his W root, then Q-silence + E and run him down.",
        "R executes him; dodge his W (root), then commit.",
        "Still your stomp — deny CS so his item scaling comes late.",
        "Two items in, mana-stacked and tanky, he out-DPS you. End it before he scales."
      ]
    },
    {
      a: 'garen', b: 'rumble',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Rumble', 'Garen', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q (cleanse + MS) closes his kite; silence + E.' },
        { when: 'Lvl 6', text: 'Dodge his R (Equalizer) zone; R-execute him outside the fire.' },
        { when: '1st item', text: 'Your edge — run him down with Q; W for MR.' },
        { when: 'Late', text: 'You hold it — your mobility + MR + R beat his kite.' }
      ],
      wants: {
        you: ['Use Q (cleanse his E slow + MS) to close the gap', 'Q-silence + E his squishy frame; W for MR', 'Dodge his R (Equalizer) fire zone'],
        foe: ['Poke with Q (Flamespitter) in his Heat window', 'Kite with W (shield + MS) and E (harpoon slow)', 'Zone you with R (Equalizer) and overheat burst']
      },
      early: "Levels 1-3 are yours — Rumble pokes with Q (Flamespitter) and kites with W (shield + MS) and E (harpoon slow), but your Q (Decisive Strike) cleanses his E slow and gives move speed to close, and your W stacks MR against his magic. Walk through the poke behind minions, Q-in, silence, and E-spin; his squishy frame folds once you stick.",
      mid: "Once you close he can't escape your run-down. Q cleanses his slow, W blunts his flamespitter, and at 6 respect his R (The Equalizer) — a long fire zone — so don't fight inside it; R-execute him on clean ground. Don't let an overheated Rumble dump burst on you in the fire, but on open ground your mobility + MR win.",
      late: "You hold the matchup — your Q-mobility, W's MR, and R execute beat a kite-and-poke Rumble whenever you reach him. Keep forcing the gap-close with Q, dodge his R zone, and run him down. If you close, you win; if he kites freely, you stall — so use Q's cleanse + move speed to make him fight on your terms.",
      whys: [
        "Your Q cleanses his E slow + gives MS to close. W for MR. Levels 1-3 are yours.",
        "He kites with W (shield + MS) and E (slow). Q through it, then commit.",
        "Q-silence + E his squishy frame once you stick. W blunts his flamespitter.",
        "Run him down with Q — his short-range damage can't beat your trades.",
        "His R (Equalizer) is a fire zone — dodge it, R-execute him on clean ground.",
        "Your edge — run him down with Q; W for MR.",
        "You hold it — your mobility + MR + R beat his kite. Make him fight."
      ]
    },
    {
      a: 'garen', b: 'akali',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Akali'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E run down a squishy, sustain-less Akali.' },
        { when: 'Lvl 6', text: 'R executes her; her R dashes can’t escape a Q-empowered run-down.' },
        { when: '1st item', text: 'Still your stomp — deny CS before her assassin item spikes.' },
        { when: '2+ items', text: 'Akali takes over — her item spikes out-burst you if you’re low.' }
      ],
      wants: {
        you: ['Q-silence + E her squishy frame; W blunts her burst', 'Run her down with Q; she has no sustain', 'Kill her before her assassin item spikes'],
        foe: ['Poke with Q and hide in W (shroud) to reset', 'All-in with E + R dashes at level 6', 'Scale into a burst assassin with item spikes']
      },
      early: "Levels 1-3 are yours — Akali is a squishy AP assassin with no sustain, and your Q-silence + E + Q-run-down crush her. Her Q pokes and her W (Twilight Shroud) gives invis to dodge and reset, but your Q's move speed sticks to her and your W (Courage) blunts her burst. Don't waste resources chasing into shroud; punish when she steps up.",
      mid: "Keep stomping. Q-silence cuts her combo, W blunts her burst, and at 6 your R executes her — her E and R dashes can't escape a Q-empowered run-down. Her real threat is level 6: R gives two dashes for an all-in burst, so don't be low when it's up. Healthy, you run her down; deny her CS so her item spikes come late.",
      late: "Akali takes over at two items — her assassin item spikes let her burst you from shroud before your trades matter, and she roams for picks. The lane is favoured because you dominate the early-mid; convert it. Snowball off the Q-silence stomp, R-execute her, deny her farm, and end before her items flip the duel.",
      whys: [
        "Akali is squishy with no sustain. Q-silence + E run her down — levels 1-3 are yours.",
        "Don't chase into shroud (W). Q sticks to her; W blunts her burst. Punish when she steps up.",
        "Your Q-E out-trade her — her poke can't beat your damage.",
        "Keep her off farm — deny the assassin item spikes. Run her down.",
        "R executes her; her R dashes can't escape your Q run-down. Don't be low at 6.",
        "Still your stomp — deny CS before her item spikes.",
        "Two items in, her spikes out-burst you if low. End it before she scales."
      ]
    },
    {
      a: 'garen', b: 'cassiopeia',
      win: ['Cassiopeia', 'Cassiopeia', 'Garen', 'Garen', 'Skill', 'Skill', 'Cassiopeia'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Cassio’s window — she out-ranges and pokes you with Q/W poison.' },
        { when: 'Lvl 3–5', text: 'Your window — Q (cleanse + MS) runs her down; silence + R-execute.' },
        { when: '1st item', text: 'Even — build MR; your run-down vs her poke + grounding.' },
        { when: '2+ items', text: 'Cassiopeia takes over — Rylai’s / Liandry’s kite and ground you.' }
      ],
      wants: {
        you: ['Use Q (cleanse + MS) to close through her poison', 'Q-silence + R-execute a squishy Cassio once you catch her', 'Build MR; out-sustain her poke with regen'],
        foe: ['Poke you out with Q/W poison from range', 'Ground you with W (Miasma) to slow your chase', 'Scale into an unkitable DPS mage with Rylai’s / Liandry’s']
      },
      early: "Levels 1-2 are hers — Cassiopeia out-ranges you and pokes with Q/W poison you can't trade back into, and her W (Miasma) grounds you to keep you off her. Hug your caster minions, take the chip (your regen heals it), build MR, and don't path through her poison. Wait for your run-down window.",
      mid: "Levels 3-5 are your window — your Q (Decisive Strike) cleanses her grounding/slow and gives move speed to close, and once you reach her, Q-silence + E + R-execute delete her squishy frame. Look for the catch when her Miasma is down. Don't sit in a poke war you lose; force the single run-down where your damage ends her.",
      late: "Cassiopeia takes over at two items — Rylai's + Liandry's let her kite and ground you forever, out-DPSing your trades if you can't reach her. The lane is even because she pokes early and you run her down mid, but late tilts to her. Build MR, Q-close when her W is down, R-execute her, and end the lane before her scaling makes her unkitable.",
      whys: [
        "Cassio out-ranges you and pokes with Q/W poison. Hug minions — levels 1-2 are hers.",
        "Her W (Miasma) grounds you. Don't path through it; build MR, regen the chip.",
        "Your window — Q cleanses her grounding + gives MS to close. Run her down.",
        "Q-silence + R-execute her squishy frame once you catch her.",
        "All-in when her Miasma is down — Q closes and your damage ends her.",
        "Even — build MR; your run-down vs her poke. Force the catch when W is down.",
        "Two items in, Rylai's + Liandry's kite and ground you. End the lane before her scaling."
      ]
    },
    {
      a: 'garen', b: 'galio',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Skill', 'Galio'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E out-trade him; bait his W.' },
        { when: 'Lvl 6', text: 'R executes him; his R is a global peel, not a 1v1 button.' },
        { when: '1st item', text: 'Still your edge — punish the wave when he R-globals away.' },
        { when: 'Late', text: 'Galio out-tanks you — he scales to a teamfight frontliner.' }
      ],
      wants: {
        you: ['Bait his W (damage reduction) before you commit', 'Q-silence + E before he builds tanky', 'Punish the wave when he R-globals away'],
        foe: ['Poke with Q (windblast) and soak burst with W', 'Taunt you with a channeled W (Shield of Durand)', 'Roam / impact the map with global R']
      },
      early: "Levels 1-3 are yours — your Q-silence + E out-trade Galio before he builds tanky. His W (Shield of Durand) reduces incoming damage and taunts if he channels it, so don't dump your spin into a raised W; Q-silence him, bait the W, then E. His Q pokes and his E is a dash-knockup, but his early kill pressure is low.",
      mid: "Bait the W, then your Q-E out-trade him — he's a tanky control mage, not a duelist. Your R executes him. At 6 his R (Hero's Entrance) is a global peel/engage for other lanes, not a 1v1 button — when he ults away to help a teammate, shove and punish his wave for CS and plates. Keep him pinned and deny the roam value.",
      late: "Galio out-tanks you eventually — he builds resistances and becomes a teamfight frontliner whose W soaks your burst. The lane is favoured because you bully the early and he out-scales into utility. Snowball your level 1-3 edge, deny his farm, and end before his tankiness makes your trades tickle. Don't let his global swing other lanes.",
      whys: [
        "Q-silence + E out-trade him — bait his W (damage reduction) first. Levels 1-3 are yours.",
        "His W reduces damage and can taunt. Q-silence, bait it, then E.",
        "Your Q-E out-trade a tanky mage. Force the trade, deny his farm.",
        "Keep him pinned — deny the farm that lets him build tanky.",
        "R executes him; his R is a global peel. Punish the wave when he ults away.",
        "Still your edge — snowball before he scales into a frontliner.",
        "Galio out-tanks you late — he scales to a teamfight frontliner. End early."
      ]
    },
    {
      a: 'garen', b: 'gwen',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Gwen'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E run down a weak-early Gwen.' },
        { when: 'Lvl 6', text: 'R executes her; don’t chase into W (mist) — you can’t hit her there.' },
        { when: '1st item', text: 'Still your stomp — deny farm before her AP scaling.' },
        { when: '2+ items', text: 'Gwen takes over — AP scaling + true damage shred your trades.' }
      ],
      wants: {
        you: ['Q-silence + E before her item scaling', 'Don’t chase into her W (mist) — fight her outside it', 'Run her down with Q; win before her two-item spike'],
        foe: ['Hide in W (mist) — untargetable from outside', 'Poke with Q (true damage) and scale', 'Out-scale into an AP bruiser that shreds tanks']
      },
      early: "Levels 1-3 are yours — Gwen has a weak early game and scales into a tank-shredding AP bruiser, so punish her now. Your Q-silence + E + Q-run-down crush her before she gets going. Her Q deals true damage on the final snip and her E gives attack speed + a dash, but early she can't match your trade. Deny her farm.",
      mid: "Her W (Hallowed Mist) is the key — inside it she's untargetable to you from outside the cloud, so don't chase her in; you'll whiff and she'll snip you. Force her to fight outside the mist, where your Q-silence + run-down win. Your R executes her. Keep her off CS — every minion she misses delays the scaling that beats you.",
      late: "Gwen takes over at two items — her AP scaling and true damage shred even a tanky Garen, and her W keeps her safe while she snips you down. The lane is favoured because you crush the early and she out-scales late. Snowball your level 1-3 dominance, R-execute her, deny her farm, and close the lane before her item spike flips the duel.",
      whys: [
        "Gwen is weak early and scales hard. Q-silence + E run her down — levels 1-3 are yours.",
        "Her Q true damage + E dash come online, but she can't match your early trade. Deny her farm.",
        "Your Q-E out-trade a weak-early Gwen. Force the trade, take CS off her.",
        "Keep her off farm — every missed minion delays her scaling.",
        "R executes her; don't chase into her W (mist) — you can't hit her there.",
        "Still your stomp — deny farm before her two-item spike.",
        "Two items in, AP + true damage shred your trades. End the lane before she scales."
      ]
    },
    {
      a: 'garen', b: 'jayce',
      win: ['Jayce', 'Jayce', 'Skill', 'Garen', 'Garen', 'Garen', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Jayce out-pokes you hard — cannon Q + W chunk you. Hug minions.' },
        { when: 'Lvl 4–6', text: 'Your window — Q (move speed) closes past his poke; out-scale him.' },
        { when: '1st item', text: 'You out-scale — close the gap and out-trade.' },
        { when: 'Late', text: 'You take over — Jayce falls off; your durability wins.' }
      ],
      wants: {
        you: ['Survive his early poke with regen', 'Use Q (move speed) to close past his cannon range', 'Out-scale his falloff with tankiness + R'],
        foe: ['Poke from range with cannon Q + W (Hyper Charge)', 'Burst with the melee E-knockback → Q combo', 'Snowball the early poke before you out-scale']
      },
      early: "Jayce out-pokes you hard early — his cannon-stance Q (Shock Blast) through W (Hyper Charge) chunks you from range, and his melee E-knockback into Q bursts you if you walk up. Levels 1-2 are his. Hug your minions, let your regen heal the poke between waves, and don't step into a gate-empowered Shock Blast. Survive to your gap-close.",
      mid: "Your window opens with Q (Decisive Strike) — its move speed closes the gap his poke tries to keep, and once you reach him, Q-silence + E out-trade his squishy frame. Be patient through his poke, then commit when he steps up or whiffs his cannon Q. Your regen out-sustains his chip; don't get caught by the full melee burst combo.",
      late: "You take over — Jayce is a lane bully who falls off, while your tankiness + R execute only grow. The lane is even because he bullies the early and you own the rest. Survive his brutal poke with regen, close the gap on his cannon cooldown, and grind him out; by your item spikes he can't fight you up close at all.",
      whys: [
        "Jayce out-pokes you — cannon Q + W chunk you. Hug minions, your regen heals it. Levels 1-2 are his.",
        "His melee E-knockback → Q bursts you if you walk up. Stay at range, take the poke.",
        "Even as he starts to fall off — survive the poke, look for your Q window.",
        "Your window — Q's move speed closes past his poke. Out-trade his squishy frame.",
        "Your regen out-sustains his chip. Commit when he whiffs his cannon Q.",
        "You out-scale — close the gap on his cannon cooldown and out-trade.",
        "You take over — Jayce falls off. Your durability wins late."
      ]
    },
    {
      a: 'garen', b: 'kassadin',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Kassadin'],
      spikes: [
        { when: 'Lvl 1–5', text: 'Your window — Kassadin is one of the weakest early champs. Q-silence + E stomp him.' },
        { when: 'Lvl 6', text: 'R executes him; his R (Riftwalk) escape — all-in before he blinks.' },
        { when: '1st item', text: 'Still your stomp — deny CS + XP to delay his spike.' },
        { when: '2+ items', text: 'Kassadin takes over — at 16 + items he out-scales the game.' }
      ],
      wants: {
        you: ['Bully his brutal early — deny CS and XP relentlessly', 'Q-silence + E + run-down before his R escape', 'Build a game-ending lead before his level 16 spike'],
        foe: ['Survive lane with Q (spell shield) and farm', 'Blink away from your all-in with R (Riftwalk)', 'Out-scale into an unkillable late-game assassin']
      },
      early: "You hard-stomp Kassadin's lane — he's one of the weakest early champions, and your Q-silence + E + Q-run-down delete him. His Q gives a spell shield (it blocks one ability, so don't waste your spin into it), and his E slows, but he can't trade with you. Bully him off every CS and deny XP from minute one.",
      mid: "Keep him broke. Your Q-E out-trade him flatly, and your R executes him. At 6 his R (Riftwalk) gives a blink escape, so all-in before he can flash-blink away, and run him down with Q's move speed. Dive him under tower with jungle help; every level and item you deny delays the hyper-carry he becomes.",
      late: "Kassadin takes over hard at two items and level 16 — his Riftwalk stacking burst out-scales the entire game and he becomes nearly unkillable. The lane is even on paper because you crush the early and he crushes the late. You MUST snowball this into a game-ending lead; if he farms to his spike, you lose the late game outright.",
      whys: [
        "Kassadin is one of the weakest early champs. Q-silence + E stomp him — bully every CS.",
        "His Q is a spell shield — don't waste your spin into it. Otherwise he can't trade you.",
        "Your Q-E out-trade him flatly. Deny CS + XP — starve his scaling.",
        "Keep him broke — every denied minion delays his spike. Run him down with Q.",
        "R executes him; his R (Riftwalk) is a blink escape — all-in before he blinks.",
        "Still your stomp — build a game-ending lead before level 16.",
        "Two items + 16 he out-scales the game. Crush early or lose late — snowball hard."
      ]
    },
    {
      a: 'garen', b: 'lucian',
      win: ['Lucian', 'Skill', 'Garen', 'Garen', 'Skill', 'Garen', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Lucian pokes with Q + passive — farm, your regen heals it.' },
        { when: 'Lvl 4–6', text: 'Your window — Q (move speed) runs him down through his dash.' },
        { when: '1st item', text: 'You catch him — Q-silence + R execute delete a squishy Lucian.' },
        { when: 'Late', text: 'Even-to-yours — you win when you reach him.' }
      ],
      wants: {
        you: ['Use Q (move speed) to close past his Q + dash', 'Q-silence + R-execute a squishy Lucian once you catch him', 'Out-sustain his poke with regen'],
        foe: ['Poke with Q (line) + passive double-shot', 'Dash around your run-down with E (Relentless Pursuit)', 'Kite you and scale into a DPS marksman']
      },
      early: "Lucian out-ranges you and pokes with Q (Piercing Light) + passive double-shot, so levels 1-2 he chips you — but your passive regen heals it between waves. His E (Relentless Pursuit) dashes to reposition, but you have the tools (Q move speed, regen) to beat a kiting Lucian. Hug minions, take the poke, and wait for your run-down window.",
      mid: "Your window opens with Q (Decisive Strike) — its move speed closes the gap his E tries to keep. Q-in, silence (stops his combo), E-spin, and at 6 your R executes his squishy frame. Bait the E (force him to dash early), then commit on its cooldown. Don't get poked low chasing in open ground; close when his dash is down.",
      late: "Even-to-yours into late — Lucian pokes and kites with his dashes, but your mobility + R execute mean you win every time you reach him. Hug minions to deny free poke, close on his E cooldown with Q, and run him down. He scales as a DPS marksman, so close the lane and don't let him free-poke before your run-down lands.",
      whys: [
        "Lucian pokes with Q + passive. Farm — your regen heals it. Levels 1-2 are his.",
        "His E (Relentless Pursuit) dashes to reposition. Take the poke, wait for your Q window.",
        "Your Q (move speed) closes past his dash. Run him down.",
        "Q-silence + E once you reach him — your regen out-sustains his poke.",
        "R executes his squishy frame. Bait the E, then commit on its cooldown.",
        "You catch him — Q-silence + R execute delete a squishy Lucian.",
        "Even-to-yours late — you win when you reach him. Close the lane."
      ]
    },
    {
      a: 'garen', b: 'maokai',
      win: ['Garen', 'Garen', 'Garen', 'Skill', 'Maokai', 'Skill', 'Maokai'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E out-trade him before his sustain.' },
        { when: 'Lvl 6', text: 'Maokai’s window — his R (root wave) + sapling sustain answer you.' },
        { when: '1st item', text: 'He out-sustains your trades — Q-silence his W root.' },
        { when: 'Late', text: 'Maokai scales to a CC tank that out-tanks your trades.' }
      ],
      wants: {
        you: ['Q-silence + E before his sustain + W root', 'Q-silence his W (Twisted Advance) to deny the root', 'Win early — you can’t out-trade a built Maokai'],
        foe: ['Poke + sustain with E (saplings) and passive heal', 'Root you with W (Twisted Advance)', 'Out-tank you and lock you down with R (root wave)']
      },
      early: "Levels 1-3 are yours — your Q-silence + E out-trade Maokai before his sustain ramps. His passive heals him off spells, his E (saplings) pokes and zones, and his W (Twisted Advance) roots you for a free trade. Q-silence to deny the W root, dodge the saplings, and press your early advantage; your regen heals his poke between trades.",
      mid: "From 6 the lane tilts to him — his R (Nature's Grasp) is a long root wave that locks you for his combo, and his sapling + passive sustain out-heal your trades. You can't out-trade a Maokai who builds resistances. Q-silence his W, trade only when it's down, and don't get rooted into a full combo. Kill him fast or back off.",
      late: "Maokai scales into a CC tank that out-sustains your trades and locks you down — resistances your trades can't crack, plus two roots. The lane is even because you bully the early and he out-tanks the late. Snowball the level 1-3 window, R-execute him when low, and end before his sustain + items make your trades tickle.",
      whys: [
        "Q-silence + E out-trade him before his sustain. Levels 1-3 are yours.",
        "His W (Twisted Advance) roots you. Q-silence it; dodge the saplings.",
        "Your Q-E out-trade a low-sustain Maokai. Press the early advantage.",
        "He starts to out-sustain your trades. Trade only when his W is down.",
        "His R (root wave) locks you for his combo — his window. Don't get rooted in.",
        "He out-sustains your trades — Q-silence his W root, kill fast or back off.",
        "Maokai scales to a CC tank that out-tanks your trades. Win early."
      ]
    },
    {
      a: 'garen', b: 'sylas',
      win: ['Garen', 'Garen', 'Garen', 'Skill', 'Skill', 'Skill', 'Sylas'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence cuts his combo; W for MR.' },
        { when: 'Lvl 6', text: 'R executes him — but he can steal your R; bait it first.' },
        { when: '1st item', text: 'Even — commit decisively; his W (heal) resets a chipped trade.' },
        { when: '2+ items', text: 'Sylas takes over — AP sustain + mobility out-scale your trades.' }
      ],
      wants: {
        you: ['Q-silence to cut his combo before his E stun', 'Build/use W for MR; trade decisively', 'Bait his E (chain stun) and don’t feed him your R'],
        foe: ['Poke with Q (double whip) and heal with W', 'Dash + chain-stun you with E', 'Steal and turn your R against you']
      },
      early: "Levels 1-3 are yours — your Q silences Sylas's combo and your W stacks MR against his magic. He pokes with Q and heals off it (W), so a poke war favours him; commit to decisive trades instead. His E is a two-part dash + chain stun, so don't trade into a held E — Q-silence him when he commits, then E-spin. Bully his early.",
      mid: "Respect his R — he can steal YOUR Demacian Justice and turn the execute on you, so bait it out or fight when it's down. Your own R executes him. Commit fully to trades because his W heals a chipped one back; Q-silence his combo, W his magic, and force the single decisive fight, not the drawn-out poke war his sustain wins.",
      late: "Sylas takes over at two items — AP sustain + mobility out-scale your trades, and his W out-heals you in extended fights. The lane is even because you bully the early and he out-sustains the late. Snowball your level 1-3 edge, build MR, R-execute him, and end before his items flip the duel. Don't feed him a stolen R.",
      whys: [
        "Q-silence cuts his combo; W gives MR. Levels 1-3 are yours.",
        "His Q poke + W heal favour a poke war. Commit to decisive trades instead.",
        "His E is a dash + chain stun. Don't trade into a held E — Q-silence when he commits.",
        "Commit fully — his W heals a chipped trade. Force the single decisive fight.",
        "R executes him — but he can steal yours. Bait it before you commit your R.",
        "Even — commit decisively; his W resets a chipped trade.",
        "Two items in, AP sustain + mobility out-scale your trades. End it before he scales."
      ]
    },
    {
      a: 'garen', b: 'graves',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Skill', 'Graves'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E out-trade his shotgun; W blunts burst.' },
        { when: 'Lvl 6', text: 'R executes him; don’t spin through his W (smoke) blind.' },
        { when: '1st item', text: 'Still your edge — bait the smoke, then Q-silence + E.' },
        { when: '2+ items', text: 'Graves takes over — his DPS scaling out-trades you late.' }
      ],
      wants: {
        you: ['Q-silence + E out-trade his shotgun; W blunts the burst', 'Bait his W (smoke) — it blinds your E spin', 'Win the early before his DPS scaling; R-execute low'],
        foe: ['Burst you with shotgun Q + E (dash + armor)', 'Blind + slow you with W (Smoke Screen)', 'Out-trade you late with his marksman DPS']
      },
      early: "Levels 1-3 are yours — your Q-silence + E out-trade Graves' shotgun, and your W (Courage) blunts his point-blank burst. His Q (double-shot) is heavy burst and his E dashes + stacks armour, but a silenced Graves can't combo cleanly. His W (Smoke Screen) blinds your E spin and slows, so bait it before you commit; your regen heals the chip.",
      mid: "Keep punishing. Your Q-E out-trade him and your R executes him off your damage — but don't spin through his W blind (it cancels your E). Bait the smoke or fight when it's down, then Q-silence and E. His damage is cooldown-reliant burst, so punish him after he dumps Q-E; W blunts whatever he lands.",
      late: "Graves takes over at two items — his marksman DPS out-trades you in the extended fight once itemized. The lane is favoured because you dominate the early-mid; convert it. Snowball off the early trades, R-execute him, bait his smoke, and end before his DPS scaling flips the duel. Don't sit in a long fight his itemized DPS wins.",
      whys: [
        "Q-silence + E out-trade his shotgun; W blunts the burst. Levels 1-3 are yours.",
        "His E dashes + stacks armour, but a silenced Graves can't combo cleanly.",
        "Your Q-E out-trade him — bait his W smoke before you commit.",
        "Keep punishing — don't spin through the blind. Fight when his W is down.",
        "R executes him; punish him after he dumps Q-E (cooldown-reliant burst).",
        "Still your edge — bait the smoke, then Q-silence + E.",
        "Two items in, his DPS scaling out-trades you. End it before that."
      ]
    },
    {
      a: 'garen', b: 'heimerdinger',
      win: ['Heimerdinger', 'Heimerdinger', 'Garen', 'Skill', 'Garen', 'Garen', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'His turrets zone your CS — clear turrets, dodge the E stun.' },
        { when: 'Lvl 3–6', text: 'Your window — Q (move speed) closes past turrets; R-execute him.' },
        { when: '1st item', text: 'Even — bait/dodge the E (grenade) stun, then run him down.' },
        { when: 'Late', text: 'Even — his turret zone vs your run-down; respect the E grenade.' }
      ],
      wants: {
        you: ['Use Q (move speed) to close past his turrets', 'Q-silence + R-execute a squishy Heimer once you reach him', 'Dodge his E (grenade stun) — it sets up his combo'],
        foe: ['Zone your CS with H-28 turrets (Q)', 'Poke with W (rockets) and stun with E (grenade)', 'Wall you off and scale his turret damage with R']
      },
      early: "Heimerdinger zones you with turrets (Q) — they deny your CS and poke whenever you step up — and his E (grenade) stuns to set up his W rocket poke. Levels 1-2, clear turrets when you can, dodge the E stun (it's his whole combo setup), and let your regen heal the chip. Don't facecheck for the grenade.",
      mid: "Your window opens with Q (Decisive Strike) — its move speed closes the gap past his turrets, and once you reach him, Q-silence + E + R-execute delete his squishy frame. The hard part is the E grenade stun, which interrupts your engage. Bait or dodge the E, then Q-in. Clear his turrets first so they can't kite you while he repositions.",
      late: "Even — his turret zone control versus your run-down. He'll wall off chokes and his R upgrades his turret damage, but in a straight fight he's a squishy with no escape and your run-down ends him. Respect the E grenade stun, clear turrets before you commit, and Q-close whenever you reach him. Don't get poked out sieging his zone.",
      whys: [
        "Heimer's turrets (Q) zone your CS and poke you. Clear turrets — your regen heals the chip.",
        "His E (grenade) stuns to set up his W rockets. Dodge it — don't facecheck the grenade.",
        "Your window — Q's move speed closes past his turrets. R-execute his squishy frame.",
        "Clear his turrets first so they can't kite you. Then run him down.",
        "Even — bait the E stun, then Q-in and R-execute.",
        "Even — Q-close whenever you reach him. His turret zone vs your run-down.",
        "Even — respect the E stun, clear turrets, delete him on the run-down."
      ]
    },
    {
      a: 'garen', b: 'sejuani',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Skill', 'Sejuani'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E out-trade her weak damage; dodge her Q.' },
        { when: 'Lvl 6', text: 'R executes her; her R is a teamfight stun, not a duel button.' },
        { when: '1st item', text: 'Still your edge — she has low solo kill pressure.' },
        { when: 'Late', text: 'Sejuani out-tanks you — she scales to a teamfight engage tank.' }
      ],
      wants: {
        you: ['Out-trade her weak early before she stacks tanky', 'Dodge her Q (charge) and avoid the Frost (E) stun', 'Snowball — she has low solo kill pressure'],
        foe: ['Engage with Q (charge knockup)', 'Stack Frost (E) for a stun, farm and scale', 'Become a teamfight engage tank with R']
      },
      early: "Levels 1-3 are yours — Sejuani is a weak early laner with low damage who wants to farm and scale. Your Q-silence + E out-trade her; her Q is a charge knockup (dodgeable) and her E stacks Frost for a stun, but she can't win the trade. Sidestep the Q, don't let her free-stack Frost on you, and bully her off CS.",
      mid: "Keep punishing. Your Q-E out-trade her, and your R executes her. Her W cleaves and her passive adds true damage, but it's not enough to beat your trades. At 6 her R is a long-range engage stun for teamfights, not a button that wins the duel, so don't fear it in lane — just don't get chain-CC'd into her jungler.",
      late: "Sejuani out-tanks you eventually — she scales into a teamfight engage tank with resistances your trades can't crack. The lane is even because you bully the early and she out-scales into utility. Snowball your level 1-3 dominance, take plates, and end before her tankiness matters; the game becomes about her R engage, not the 1v1.",
      whys: [
        "Sejuani is a weak early laner with low damage. Q-silence + E out-trade her — dodge her Q charge.",
        "Don't let her free-stack Frost (E) for the stun. Bully her off CS.",
        "Your Q-E out-trade her. Force the trade, deny her farm.",
        "Keep punishing — her cleave + true damage can't beat your trades.",
        "R executes her; her R is a teamfight engage stun, not a duel button.",
        "Still your edge — she has low kill pressure. Snowball before she builds tanky.",
        "Sejuani out-tanks you late — she scales to a teamfight engage tank. End early."
      ]
    },
    {
      a: 'garen', b: 'zac',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Skill', 'Zac'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E crush a weak-early Zac.' },
        { when: 'Lvl 6', text: 'R executes him; out-DPS his blob heals, deny the reset.' },
        { when: '1st item', text: 'Still your edge — step on his blobs, bring grievous wounds.' },
        { when: '2+ items', text: 'Zac takes over — HP-stacking tank shrugs off your trades.' }
      ],
      wants: {
        you: ['Bully his weak early — he has low kill pressure', 'Step on his passive blobs; bring grievous wounds', 'Snowball before his HP/heal tank scaling'],
        foe: ['Poke with Q (stretchy arm) and farm safely', 'Sustain with passive blobs + W', 'Scale into an HP-stacking teamfight tank with R']
      },
      early: "Levels 1-3 are yours — Zac is a weak early laner with little kill pressure, and your Q-silence + E crush him. He pokes with Q (stretchy arm) and chips with W, but he just wants to farm and scale. Q-silence, E-spin, deny CS, and step on his passive blobs so he can't pick them up to heal. Bully him hard now.",
      mid: "Keep stomping. Your Q-E out-trade him and your R executes him — but his passive blob-heals reset your pressure, so bring grievous wounds (Bramble/Executioner's) and out-DPS the heals. His R at 6 is a teamfight engage, not a 1v1 button. Deny CS and snowball off your trades before he stacks HP.",
      late: "Zac takes over at two items — an HP-stacking regen tank that your trades crack less over time, and his blob heals out-sustain everything. The lane is even because you crush the early and he out-tanks the late. Snowball the level 1-3 stomp, build antiheal, R-execute him low, and end before his HP makes your trades irrelevant.",
      whys: [
        "Zac is a weak early laner with low kill pressure. Q-silence + E crush him. Levels 1-3 are yours.",
        "Step on his passive blobs so he can't heal. Bully him off CS.",
        "Your Q-E out-trade him. Force the trade, deny his farm.",
        "Keep stomping — bring grievous wounds; his blob heals reset your pressure.",
        "R executes him; out-DPS his blob heals and deny the reset.",
        "Still your edge — step on his blobs, snowball before his HP scaling.",
        "Two items in, HP-stacking tank shrugs off your trades. End the game before that."
      ]
    },
    {
      a: 'garen', b: 'ziggs',
      win: ['Ziggs', 'Skill', 'Garen', 'Garen', 'Skill', 'Garen', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Ziggs pokes from max range with Q — farm, your regen heals it.' },
        { when: 'Lvl 3–6', text: 'Your window — Q (move speed) closes past his satchel; R-execute.' },
        { when: '1st item', text: 'Your edge — a caught Ziggs dies; bait his W (satchel) first.' },
        { when: 'Late', text: 'Even-to-yours — close the gap; his only escape is W (satchel).' }
      ],
      wants: {
        you: ['Use Q (move speed) to close past his minefield + poke', 'Q-silence + R-execute a squishy Ziggs once you catch him', 'Bait his W (satchel) escape before you commit'],
        foe: ['Poke from max range with Q (bouncing bomb)', 'Escape your run-down with W (Satchel Charge)', 'Zone you with E (minefield) and nuke with R']
      },
      early: "Ziggs is pure artillery — his Q (bouncing bomb) out-ranges everything and pokes you whenever you step to CS, and his E lays a slowing minefield. He has no stun, but his W (Satchel Charge) blasts him to safety from your run-down. Levels 1-2, hug your minions, let your regen heal the chip, and don't path through the minefield. Wait for your gap-close.",
      mid: "Your window opens with Q (Decisive Strike) — its move speed closes the gap past his minefield, and once you reach him, Q-silence + E + R-execute delete his squishy frame. He's immobile except for the W satchel, so bait or eat it, then close. Force him to burn satchel early, then run him down on its cooldown.",
      late: "Even-to-yours into late — if you reach Ziggs he dies, but his range and zone control keep him safe. Close on his satchel cooldown with Q, deny him free poke by hugging minions, and R-execute him. Don't get chunked sieging his minefield; pick your gap-close and commit when his escape is down. Your run-down beats his poke.",
      whys: [
        "Ziggs out-ranges you with Q poke. Hug minions — your regen heals it. Levels 1-2 are his.",
        "His E minefield zones you out. Don't path through it — wait for your Q window.",
        "Your window — Q's move speed closes past his satchel. R-execute his squishy frame.",
        "He has no stun, only the W satchel escape. Bait it, then close.",
        "Force him to burn satchel, then run him down on its cooldown.",
        "Your edge — a caught Ziggs dies. Bait the W first, then Q-close.",
        "Even-to-yours late — close on his satchel cooldown. Your run-down beats his poke."
      ]
    },
    {
      a: 'garen', b: 'nautilus',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Skill', 'Nautilus'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — dodge his Q (hook), then Q-silence + E out-trade him.' },
        { when: 'Lvl 6', text: 'R executes him; his R (knockup) is a pick/peel tool, not a duel button.' },
        { when: '1st item', text: 'Still your edge — he has low damage; deny his farm.' },
        { when: 'Late', text: 'Nautilus out-tanks you — he scales to a CC frontliner.' }
      ],
      wants: {
        you: ['Dodge his Q (Dredge Line hook) — it starts everything', 'Q-silence + E out-trade his low damage', 'Snowball before he builds tanky'],
        foe: ['Hook you in with Q (Dredge Line)', 'Chunk with W (shield + on-hit) + E (AOE)', 'Lock you down with R + passive root for a gank']
      },
      early: "Levels 1-3 are yours — Nautilus is a CC tank with low damage, and his whole trade starts with the Q hook (Dredge Line). Dodge it and he has nothing; eat it and he gets a free W (shield + bonus damage) and E on you. Sidestep the hook from bush range, then Q-silence + E and your trades beat his low-damage frame.",
      mid: "Keep punishing. Without the hook he can't engage, and his W shield + E poke don't out-trade your Q-E. Your R executes him. At 6 his R is a single-target knockup — a pick/peel tool that's dangerous with a jungler around (his passive also roots), but in a straight duel it doesn't beat you. Dodge the hook, run him down, and track his R for ganks.",
      late: "Nautilus out-tanks you eventually — he scales into a teamfight CC frontliner with resistances your trades crack less over time. The lane is favoured because you bully the early and he out-tanks the late. Snowball your level 1-3 dominance, deny his farm, and end before his tankiness matters. Respect his R + jungler for picks, but never fear the 1v1.",
      whys: [
        "Nautilus' trade starts with the Q hook. Dodge it from bush range and he has nothing.",
        "Eat the hook and he gets a free W + E. Sidestep it — that's the whole matchup.",
        "Q-silence + E out-trade his low-damage frame. Force the trade.",
        "Without the hook he can't engage. Keep punishing; deny his farm.",
        "R executes him; his R is a pick/peel tool, not a duel button. You win the 1v1.",
        "Still your edge — he has low damage. Snowball before he builds tanky.",
        "Nautilus out-tanks you late — he scales to a CC frontliner. End early."
      ]
    },
    {
      a: 'garen', b: 'aurora',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Aurora'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E run her down; W for MR.' },
        { when: 'Lvl 6', text: 'R executes her; her R rift escape — bait it, don’t over-chase.' },
        { when: '1st item', text: 'Still your stomp — deny farm before her AP scaling.' },
        { when: 'Late', text: 'Even-to-yours — your mobility + MR + R beat her kite.' }
      ],
      wants: {
        you: ['Q-silence + E her squishy frame; W for MR', 'Run her down with Q when her W (dash) is down', 'Punish her after she commits her W escape'],
        foe: ['Poke with Q (bolt) + E (80% slow) and self-heal', 'Dodge your run-down with W (dash + invisibility)', 'Zone and escape with R (untargetable rift)']
      },
      early: "Levels 1-3 are yours — Aurora is a mobile AP skirmisher, but your Q-silence + E + Q-run-down crush her. Her Q pokes, her E slows you 80% while recoiling her back, and her passive heals her, but your Q (Decisive Strike) cleanses the slow and gives chase speed, and your W stacks MR. Her only real escape is W (a dash into invis); don't commit while it's up.",
      mid: "Keep stomping. Run her down with Q when her W dash is on cooldown — Q-silence cuts her combo, W blunts her burst, and your R executes her. Bait the W out (force her to use it), then re-engage. Her level-6 R creates a rift she can dash through to become untargetable, so don't over-chase into it — bait it and punish.",
      late: "Even-to-yours into late — her mobility and poke versus your run-down + MR + R execute. You win whenever you reach her, which your Q's move speed lets you do. Force fights on her W cooldown, punish her after she commits an escape, build MR, and don't chase into her R rift. She scales, so close the lane before her items.",
      whys: [
        "Q-silence + E run down a mobile Aurora; W for MR. Levels 1-3 are yours.",
        "Your Q cleanses her E slow + gives chase speed. Don't commit while her W is up.",
        "Your Q-E out-trade her — run her down when her W dash is down.",
        "Bait her W out, then re-engage. W blunts her burst.",
        "R executes her; her R rift is an escape — bait it, don't over-chase.",
        "Still your stomp — deny farm before her AP scaling.",
        "Even-to-yours late — your mobility + MR + R beat her kite. Close before her items."
      ]
    },
    {
      a: 'garen', b: 'ambessa',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Ambessa', 'Skill', 'Skill'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence cuts her dash combo; W blunts her burst.' },
        { when: 'Lvl 6', text: 'Ambessa’s window — her R (blink + suppress) is a hard all-in; W it.' },
        { when: '1st item', text: 'Your edge — Q-silence + E out-trade her combo.' },
        { when: 'Late', text: 'You hold it — your tankiness + R vs her mobility.' }
      ],
      wants: {
        you: ['Q-silence to cut her dash combo', 'W (damage reduction) to blunt her burst + her R', 'Out-trade her with Q-E; R-execute low'],
        foe: ['Chain dashes (passive) into the Q → W combo', 'Brace your burst with E (shield + counter-smash)', 'All-in with R (blink behind + suppress + stun)']
      },
      early: "Levels 1-3 are yours — your Q silences Ambessa's combo and your W blunts her burst. Her passive grants free dashes, her Q enables her W (line slam) for burst, and her E (Repudiation) braces for a shield then smashes harder if it absorbed your damage — so don't dump your spin into her E. Q-silence her when she commits, then E. Bully her early.",
      mid: "Through the mid-game your Q-silence + W hold the trades — she out-bursts in a short dash-combo window, but a silenced Ambessa can't chain it. Her big spike is R (Public Execution): she blinks behind you, suppresses, and stuns for a full combo, so pop W (Courage) to survive it and don't be at low HP when it's up. Respect that all-in window.",
      late: "You hold the edge — your tankiness + R execute versus her mobility, and your Q-silence shuts down her combo whenever she commits. The lane is favoured because you bully the early and trade well throughout. Q-silence her dash combo, W her burst, R-execute her low, and play around her R (the suppress is her main kill threat). Don't get caught low.",
      whys: [
        "Q-silence cuts her dash combo; W blunts her burst. Levels 1-3 are yours.",
        "Her E (Repudiation) shields then smashes harder if it absorbed your hit. Don't spin into it.",
        "A silenced Ambessa can't chain her combo. Q-silence, then E.",
        "Your Q-E out-trade her — force the trade after her dashes are spent.",
        "Her R blinks behind you, suppresses and stuns — pop W to survive it, don't be low.",
        "Your edge — Q-silence + E out-trade her combo.",
        "You hold it — your tankiness + R vs her mobility. Play around her R."
      ]
    },
    {
      a: 'garen', b: 'akshan',
      win: ['Akshan', 'Skill', 'Garen', 'Garen', 'Skill', 'Garen', 'Skill'],
      spikes: [
        { when: 'Lvl 1–2', text: 'Akshan pokes with Q + autos and swings — farm, regen heals it.' },
        { when: 'Lvl 4–6', text: 'Your window — Q (move speed) runs him down through his swing.' },
        { when: '1st item', text: 'You catch him — Q-silence + R execute delete a squishy Akshan.' },
        { when: 'Late', text: 'Even — he kites and roams; you win when you catch him.' }
      ],
      wants: {
        you: ['Use Q (move speed) to close his poke + swing kite', 'Q-silence + R-execute a squishy Akshan once you catch him', 'Deny his roams; punish the wave when he leaves'],
        foe: ['Poke with Q (Avengerang) + passive double-shot', 'Swing around terrain with E (Heroic Swing)', 'Roam and pick with R (Comeuppance sniper)']
      },
      early: "Akshan is a slippery ranged skirmisher — he pokes with Q (Avengerang) and autos, and his E (Heroic Swing) lets him swing off terrain to kite and reposition. Levels 1-2 he out-ranges you; hug minions, let your regen heal the chip, and don't chase his swing into open ground. Wait for your run-down window.",
      mid: "Your window opens with Q (Decisive Strike) — its move speed closes the gap his swing tries to keep. Q-in, silence (stops his combo), E-spin, and at 6 your R executes his squishy frame. The hard part is he resets the swing constantly; bait the E, then commit on its cooldown. Don't get poked low chasing in open ground.",
      late: "Even into late — Akshan kites with his swing and roams for picks with R, and you win the exchange when you catch him. Hug minions to deny free poke, close on his E cooldown with Q, and punish his roams by taking the wave. If he swings freely he chips you; your whole game is the Q-run-down that catches him.",
      whys: [
        "Akshan pokes with Q + autos and swings around terrain. Regen heals it. Levels 1-2 are his.",
        "His E (Heroic Swing) kites off terrain. Don't chase into open ground.",
        "Your window — Q's move speed runs him down through his swing.",
        "He resets the swing constantly. Bait the E, then commit on its cooldown.",
        "Q-silence + R execute a squishy Akshan once you catch him.",
        "You catch him — close on his E cooldown with Q. Deny his roams.",
        "Even late — he kites and roams. You win when you catch him; punish his roams."
      ]
    },
    {
      a: 'garen', b: 'karma',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Karma'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E run down a squishy Karma.' },
        { when: 'Lvl 6', text: 'R executes her; bait her E (shield) before committing.' },
        { when: '1st item', text: 'Your edge — she has no kill threat; deny her farm.' },
        { when: 'Late', text: 'You own the 1v1 — she’s a poke/utility mage, not a duelist.' }
      ],
      wants: {
        you: ['Q-silence + E + run-down her squishy frame', 'Bait her E (shield + MS) before you all-in', 'Don’t get kited by her W (root tether)'],
        foe: ['Poke with Q (Inner Flame) — empowered by R (Mantra)', 'Root you with W (Focused Resolve) tether', 'Self-peel with E (shield + move speed)']
      },
      early: "Levels 1-3 are yours — Karma pokes with Q (Mantra-empowered) and peels herself with E (shield + move speed), but she's squishy and your Q-silence + E + Q-run-down crush her. Her W (Focused Resolve) is a tether that roots if she channels it fully — Q-silence or break it, and don't trade into a fresh E shield. Run her down.",
      mid: "Your Q (Decisive Strike) gives the move speed to close her kite, and Q-silence stops her combo. Bait the E, then E-spin and your R executes her squishy frame. Don't get rooted by a full W tether mid-engage; close the distance fast or break line of sight. Once you're on her with no shield up, she folds.",
      late: "You own the 1v1 — Karma is a poke/utility mage, not a side-lane duelist. If you reach her she dies, and your Q-run-down + R make it quick. Press the lane, deny her poke by hugging minions, and don't get kited by W + E. Her value is utility for her team, not beating you one-on-one. Snowball your dominance.",
      whys: [
        "Karma pokes with Q and shields with E. Q-silence + E run her down — levels 1-3 are yours.",
        "Her W (Focused Resolve) tethers and roots. Q-silence or break it; close fast.",
        "Your Q-E out-trade a squishy Karma — bait the E, then commit.",
        "Don't get kited by W + E. Q-close when her shield is down.",
        "R executes her; bait her E (shield) before committing.",
        "Your edge — she has no kill threat. Deny her farm, snowball.",
        "You own the 1v1 — she's a poke/utility mage. Hug minions, press your edge."
      ]
    },
    {
      a: 'garen', b: 'lillia',
      win: ['Garen', 'Garen', 'Garen', 'Skill', 'Skill', 'Skill', 'Lillia'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q (move speed) closes her kite; silence + E.' },
        { when: 'Lvl 6', text: 'R executes her; don’t get put to sleep by her R (Dream-Laden Bough).' },
        { when: '1st item', text: 'Your edge — run her down with Q before her AP scaling.' },
        { when: '2+ items', text: 'Lillia takes over — AP on-hit + mobility kite and shred you.' }
      ],
      wants: {
        you: ['Use Q (cleanse her E slow + MS) to close her kite', 'Q-silence + E her squishy frame; W for MR', 'Win before her AP scaling comes online'],
        foe: ['Kite with Q (swirl) movement + E (dash + slow)', 'Stack passive burn and scale AP on-hit', 'Set up ganks / picks with R (sleep)']
      },
      early: "Levels 1-3 are yours — Lillia is a mobile AP skirmisher who kites, but your Q (Decisive Strike) cleanses her E slow and gives move speed to close, and your W stacks MR. Her Q (Blooming Blows) ramps her move speed and her E is a dash + slow, so Q-in to stick, silence her combo, and E-spin. She has no hard early trade.",
      mid: "Keep punishing. Q closes her kite, Q-silence cuts her combo, and your R executes her. At 6 respect her R (Dream-Laden Bough): a delayed sleep that sets up a burst all-in or a gank, so don't get drowsy-then-slept in a bad spot. Run her down on her dash cooldown and deny her farm before her AP scaling.",
      late: "Lillia takes over at two items — AP on-hit damage plus her constant mobility let her kite and shred you while staying out of reach. The lane is even because you out-trade her early and she scales past you. Snowball off the Q-run-down, R-execute her, build a lead before her items flip the duel. Don't get slept and bursted.",
      whys: [
        "Your Q cleanses her E slow + gives MS to close her kite. W for MR. Levels 1-3 are yours.",
        "She has no hard early trade. Q-in to stick, silence her combo, E-spin.",
        "Your Q-E out-trade a pinned Lillia. Run her down on her dash cooldown.",
        "Keep punishing — deny her farm before her AP scaling.",
        "R executes her; her R is a delayed sleep — don't get slept in a bad spot.",
        "Your edge — run her down with Q before her AP scaling.",
        "Two items in, AP on-hit + mobility kite and shred you. Close before she scales."
      ]
    },
    {
      a: 'garen', b: 'mel',
      win: ['Mel', 'Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill'],
      spikes: [
        { when: 'Lvl 1', text: 'Mel pokes from range with Q — hug minions, your regen heals it.' },
        { when: 'Lvl 2–6', text: 'Your window — Q (move speed) runs her down; silence + R-execute.' },
        { when: '1st item', text: 'Your stomp — a caught Mel dies; dodge her E (root).' },
        { when: 'Late', text: 'You own the 1v1 — she’s a teamfight poke mage with no escape.' }
      ],
      wants: {
        you: ['Use Q (move speed) to close her poke; W for MR', 'Q-silence + R-execute a squishy Mel once you catch her', 'Dodge her E (Solar Snare root) that sets up her damage'],
        foe: ['Poke from range with Q (Radiant Volley)', 'Root you with E (Solar Snare) to land poke / R', 'Self-peel with W (shield + move speed)']
      },
      early: "Mel is a squishy artillery mage and one of your best lanes — at level 1 she pokes you with Q (Radiant Volley) and her E (Solar Snare) roots you to land more. Her W (Rebuttal) reflects projectiles, but your kit isn't projectile-based, so it does nothing against you. Hug minions, let your regen heal the early poke, and dodge the E root.",
      mid: "Your window opens fast — Mel has no real escape but the W move-speed, and she's squishy. Your Q (Decisive Strike) closes the gap her poke tries to keep, and once you reach her, Q-silence + E + R-execute delete her. Dodge or bait the E root (it sets up her damage and R), then commit. You run her down and she can't kite a Q-empowered Garen.",
      late: "You own the 1v1 — if you reach Mel she dies, full stop, and your Q-mobility + W's MR + R execute mean you always reach her. Her threat is ranged poke and her R (a global mark-execute in teamfights), not the side-lane duel. Close on her W cooldown, build MR, and end the lane. Dodge the E and you win every all-in.",
      whys: [
        "Mel pokes from range with Q. Hug minions, your regen heals it. Level 1 is hers.",
        "Your window — Q's move speed runs her down. W for MR.",
        "Her W reflects projectiles but your kit isn't projectile-based — it does nothing. Keep closing.",
        "Dodge her E (Solar Snare root) that sets up her poke. Then commit.",
        "Q-silence + R-execute a squishy Mel once you reach her.",
        "Your stomp — a caught Mel dies. Close on her W cooldown, build MR.",
        "You own the 1v1 — she's a teamfight poke mage. Dodge the E and win every all-in."
      ]
    },
    {
      a: 'garen', b: 'neeko',
      win: ['Garen', 'Garen', 'Garen', 'Garen', 'Garen', 'Skill', 'Neeko'],
      spikes: [
        { when: 'Lvl 1–3', text: 'Your window — Q-silence + E run down her squishy frame.' },
        { when: 'Lvl 6', text: 'R executes her; dodge her R (Pop Blossom AOE stun) windup.' },
        { when: '1st item', text: 'Your edge — deny CS before her burst scaling.' },
        { when: 'Late', text: 'You own the 1v1 — she’s a teamfight burst mage, not a duelist.' }
      ],
      wants: {
        you: ['Q-silence + E + run down her squishy frame', 'Bait/Q-silence her E (root) before you commit', 'Dodge her R (stun) windup at level 6'],
        foe: ['Poke with Q (Blooming Burst) and root with E', 'Disguise as a minion/ally with W (clone)', 'All-in with R (Pop Blossom AOE stun)']
      },
      early: "Levels 1-3 are yours — Neeko pokes with Q and her E (Tangle-Barbs) roots you to set up damage, but she's squishy and built for picks, not dueling. Your Q-silence + E + Q-run-down crush her. Her W disguises her (as a minion or ally), so don't get fooled by a clone. Q-silence the E or dodge it, then run her down.",
      mid: "Keep stomping. Q-silence her combo, E-spin, and your R executes her squishy frame. At 6 respect her R (Pop Blossom): a delayed AOE stun she leaps in with, often from a disguise, so watch the windup and don't get caught flat-footed. Run her down with Q's move speed; she can't trade back.",
      late: "You own the 1v1 — Neeko is a teamfight burst/pick mage, not a side-lane duelist. If you reach her she dies, and your Q-run-down + R make it instant. Press the lane, deny her roams (her R + disguise are pick tools), and don't facecheck a 'minion' that might be her W clone. The duel is always yours; snowball your dominance.",
      whys: [
        "Neeko pokes with Q and roots with E, but she's squishy. Q-silence + E run her down.",
        "Her W disguises her as a minion or ally — don't get fooled by a clone. Dodge the root.",
        "Your Q-E out-trade her squishy frame — Q-silence the E, then commit.",
        "Keep her off farm — deny the burst scaling. Run her down.",
        "R executes her; dodge her R (Pop Blossom) AOE stun windup at 6.",
        "Your edge — deny CS before her burst scaling.",
        "You own the 1v1 — she's a teamfight pick mage. Don't facecheck her clones; press your edge."
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
        if (!f.fwd) patch(store, f.b, f.a, f.db, f.win);   // hand-set pairs stay mirrored; WR-generated verdicts are forward-only
      });
    });
    applyContent();
  }
  apply();
  if (typeof setTimeout === 'function') {
    var t = 0, iv = setInterval(function () { apply(); if (++t >= 50) clearInterval(iv); }, 320);
  }
})();

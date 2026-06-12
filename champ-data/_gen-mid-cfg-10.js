// MatchupCoach — MID generator configs batch 10: Naafiri, Qiyana, Sylas, Talon, Zed.
window.GEN_MID_CFGS_10 = [

// ============================== NAAFIRI ==============================
{
  key:'naafiri', name:'Naafiri',
  curve:[0.3,0.3,0.4,0.3,0.4,0.4,-0.1],
  lvl:[
    "Q-Q the bleed-consume on his last hits — the double dagger chunks harder than the lobby expects at one.",
    "Pack pressure begins: hounds chase what you Q — trade where the dogs can pile on.",
    "W online: the lock-on dive threatens anyone past the wave's midline. The lane plays scared now.",
    "Q-E strings on every contact — the pack heals you through trades and the bleed math compounds.",
    "R online: the vision sweep plus bigger pack makes every roam a scheduled accident for a side lane.",
    "First item spike: the W dive plus full string deletes squishies. Hunt the half-bars.",
    "Late Naafiri flanks: R the sweep, W the carry, and let the pack vote on the peel."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'EVEN', fighter:'TRICKY' },
  diffEx:{ cassiopeia:'HARD', lissandra:'HARD', vex:'HARD',
    kassadin:'FAVOURED',
    xerath:'FAVOURED', lux:'FAVOURED', ziggs:'FAVOURED', zoe:'FAVOURED', twistedfate:'FAVOURED', hwei:'FAVOURED', brand:'FAVOURED',
    syndra:'TRICKY', galio:'TRICKY', pantheon:'TRICKY', irelia:'TRICKY', yasuo:'TRICKY', yone:'TRICKY', annie:'TRICKY', neeko:'TRICKY', malzahar:'EVEN', anivia:'EVEN', swain:'HARD',
    zed:'EVEN', katarina:'EVEN', akali:'EVEN', fizz:'EVEN', ekko:'EVEN', diana:'EVEN', talon:'EVEN', qiyana:'EVEN', leblanc:'EVEN', sylas:'EVEN', ahri:'EVEN', viktor:'EVEN', orianna:'EVEN', azir:'EVEN', vladimir:'EVEN', taliyah:'EVEN', ryze:'EVEN', veigar:'EVEN', karma:'EVEN', mel:'EVEN', aurora:'EVEN' },
  vs:{
    control:{
      tldr:"He pokes a pack — the hounds tank skillshots, the Q bleeds through trades, and the W dive ends the range debate.",
      breakdown:"Walk the hounds between you and his lines; they eat the skillshots his lane needs. Q-Q the contacts, and from level 3 the W threat means his every overstep is a vote for the dogs.",
      dos:["Body-block his lines with the pack","Q-Q the bleed-consume on contacts","W the overstep, E through the kill"],
      donts:["Dive into held CC — the dogs can't dodge","Trade with the pack dead","Shove blind past his one answer spell"],
      win:"Let the pack eat the skillshots and the W dive eat the mage."
    },
    burst:{
      tldr:"His combo targets one body and you brought six — trade behind the pack and dive the cooldown silence.",
      breakdown:"The hounds soak the setup spells his burst chains from: trade Q-E behind them, and W the gap the moment his rotation is spent. Your E dash-heal makes even exchanges profitable.",
      dos:["Trade behind the hound screen","W-dive his post-combo silence","E-heal through the exchange math"],
      donts:["Eat his setup spell pack-less","Dive while his CC is loaded","Trade at half HP without E banked"],
      win:"Spend the dogs on his setup and the dive on his silence."
    },
    assassin:{
      tldr:"An assassin duel where you brought backup — even strings favor the side with six health bars.",
      breakdown:"Trade strings with the pack piling on and hold W as the re-engage his resets can't match. Your sustain through E wins the war of attrition that assassin mirrors secretly are.",
      dos:["String with the pack piling on","Hold W as the re-engage trump","Out-sustain the mirror with E heals"],
      donts:["Coin-flip openers without the pack up","W first into his held answer","Chase resets past your dogs"],
      win:"Out-number the mirror — six bodies vote louder than resets."
    },
    fighter:{
      tldr:"He out-brawls the pack if it stays — strike in Q-E passes, heal through, and dive only the spent engage.",
      breakdown:"Fighters grind through hounds eventually: trade in passes, let E's heal pay the toll, and save W for the window after his gap-closer commits. Never let the pack die for a trade you didn't need.",
      dos:["Pass-trade Q-E and disengage","Heal the toll through E's dash","W only after his engage is spent"],
      donts:["Leave the pack in his AoE","Brawl past the bleed windows","Dive with the dogs on respawn"],
      win:"Pass-trade the brawler and dive the one window his engage left open."
    }
  },
  mirror:{
    tldr:"Pack mirror — whoever's hounds survive the opener wins the trade; whoever Ws second dives smarter.",
    breakdown:"Kill her dogs with AoE passes first, trade behind yours, and hold W until her dive commits — the counter-dive always lands on fewer answers.",
    dos:["Clear her pack before trading","W second in the dive war","Win the E-sustain ledger"],
    donts:["Trade into a fuller pack","Dive first at even HP","Spend Q on hounds when champions bleed"],
    win:"More dogs, later dive — the patient pack eats.",
    winS:"Her pack is dead — six on one; do the math."
  },
  winS:"His answer is spent — W the dive and let the pack pile.",
  tradeGood:"Q the bleed, Q the consume, E through with the pack piling — a six-body trade he answered with one rotation.",
  tradeBad:"W-diving into held CC — the lock-on telegraphs, the dogs can't dodge, and the lane's one button answers everything.",
  waveBest:"a Q-shoved crash that funds an R-swept roam — your ganks arrive with vision and a head count.",
  waveWorst:"a frozen wave with the pack on respawn — Naafiri without dogs is a dagger with opinions.",
  early:"Trade behind the screen and bleed the contacts — your early strings out-stat most of the lane's expectations.",
  mid:"R-roam on every crash: the sweep finds the target, the W reaches it, the pack ends it. Two converted roams is a won map.",
  late:"You are the flank with a head count: R the approach, W through the front line, and let the hounds peel-proof the exit.",
  safetyTool:"E Eviscerate",
  spikesLine:"Level 3 W threat bends the lane; level 6 schedules the roams; first item makes dives lethal.",
  carryLine:"Carry through the hunt — sweeps find targets, dives reach them, and the pack does arithmetic peel can't argue with.",
  behindShort:"farm with Q bleeds and stay relevant through pack utility.",
  loadingRule:"Trade where the dogs can pile — alone you're half a champion.",
  dontDetail:"The W locks its path on cast — diving into held CC donates the whole pack to one button.",
  aheadTpl:"Ahead, hunt openly: zone {E} with dive threat, R-sweep the rivers, and feed the pack the map's mistakes.",
  behindTpl:"Behind, hunt quietly: bleed the farm, hold W for their dives, and let the pack's sustain rebuild the ledger.",
  spikeName:"first item",
  runeReport:"Electrocute or First Strike, Sudden Impact, Eyeball Collection, Relentless Hunter; secondary Precision — Presence of Mind + Coup de Grace.",
  summReport:"Flash + Ignite — the dive wants a closer; TP into the HARD column only.",
  itemReport:"Start Doran's Blade + pot. Eclipse or Profane-line first, Lucidity/Steelcaps, then Serylda's paths.",
  jungleLine:"Your W holds the gank target mid-dive and the R sweep clears the counter-gank fog — Naafiri-jungler dives are head-count arguments.",
  redditLine:"dogs first, dive second, and never W into a held stun — Naafiri wins by outnumbering duels that were supposed to be fair.",
  load:{
    sub:"r/NaafiriMains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Serrated Dirk (≈1100g) — strings start chunking",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Eclipse / Profane Hydra",
    secondItem:"Serylda's path",
    boots:"Ionian Lucidity",
    bootsVsAP:"Mercury's Treads / Lucidity",
    bootsVsAD:"Plated Steelcaps / Lucidity",
    spike:"First lethality item — W dives plus the pack delete squishies.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Sudden Impact","Eyeball Collection","Relentless Hunter"], tree:"Precision", secondary:["Presence of Mind","Coup de Grace"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    cassiopeia:{ tldr:"Her W grounds the dive AND the dash — the pack arrives without you; farm bleeds, skip the dives, and roam for a living." },
    lissandra:{ tldr:"Root, self-stun, and AoE that deletes hounds — the anti-pack pick; trade only behind a full screen and never W past the wave." },
    vex:{ tldr:"Your W and E both feed her fear schedule — dive only after her pulse is spent, and let the dogs eat the gloom marks first." }
  }
},

// ============================== QIYANA ==============================
{
  key:'qiyana', name:'Qiyana',
  curve:[0.2,0.3,0.3,0.3,0.5,0.5,0.1],
  lvl:[
    "Grass Q from the river brush line — the stealth-empowered poke chunks and the lane learns to fear hedges.",
    "W element economy begins: ice for the trades, rock for the executes, grass for the angles.",
    "E joins: the stick-dash into ice-Q root is your first real kill pattern — pick one window per wave.",
    "Element-cycle the trades: E-ice-Q roots, auto, rock-Q the execute line. The lane is a terrain quiz.",
    "Supreme Display online — any fight near a wall is a stun lottery you rigged. Hug terrain like rent depends on it.",
    "First item spike: the full element string deletes squishies. Force the brush-line fights.",
    "Late Qiyana flanks through her own R: shockwave the objective wall, string the stunned, and vanish into grass."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'EVEN', fighter:'TRICKY' },
  diffEx:{ lissandra:'HARD', vex:'HARD',
    kassadin:'FAVOURED',
    xerath:'FAVOURED', lux:'FAVOURED', ziggs:'FAVOURED', zoe:'FAVOURED', hwei:'FAVOURED', brand:'FAVOURED', twistedfate:'FAVOURED',
    syndra:'TRICKY', galio:'TRICKY', pantheon:'TRICKY', irelia:'TRICKY', yasuo:'TRICKY', yone:'TRICKY', annie:'TRICKY', neeko:'TRICKY', anivia:'TRICKY', malzahar:'EVEN', swain:'EVEN', cassiopeia:'EVEN',
    zed:'EVEN', katarina:'EVEN', akali:'EVEN', fizz:'EVEN', ekko:'EVEN', diana:'EVEN', talon:'EVEN', leblanc:'EVEN', naafiri:'EVEN', sylas:'EVEN', ahri:'EVEN', viktor:'EVEN', orianna:'EVEN', azir:'EVEN', vladimir:'EVEN', taliyah:'EVEN', ryze:'EVEN', veigar:'EVEN', karma:'EVEN', mel:'EVEN', aurora:'EVEN' },
  vs:{
    control:{
      tldr:"He needs the lane to stay a shooting range — your elements turn it into terrain, and terrain is yours.",
      breakdown:"Poke from grass stealth he can't pre-aim, root the step-ups with ice, and rock-execute the chip he thought was safe. The brush line is your poke range and his blind spot in one.",
      dos:["Grass-Q from the brush lines","Ice-root the step-up, string the root","Rock-Q the sub-half execute windows"],
      donts:["Trade in open mid like a sportsman","E in with his CC loaded","Burn W swaps without a plan"],
      win:"Drag the shooting range into the hedges and execute the mage who followed."
    },
    burst:{
      tldr:"His combo wants open ground — fight him in elements: stealth breaks his aim, ice breaks his spacing, rock breaks his health bar.",
      breakdown:"Trade from grass angles his skillshots can't pre-fire, and hold E for the post-combo silence. The R wall-stun flips any all-in he forces near terrain — which, in mid, is everywhere that matters.",
      dos:["Trade from stealth angles only","E-string his post-combo silence","R the all-in he forces near walls"],
      donts:["Stand in open lane trading combos","E in while his setup is loaded","Waste rock executes on full bars"],
      win:"Deny the aim, string the silence, and stun the wall he forgot existed."
    },
    assassin:{
      tldr:"An assassin duel where the floor votes — your elements out-tool the mirror and the R ends ties against terrain.",
      breakdown:"Trade strings evenly and bank the W swaps as tempo: ice answers his engage, grass answers his vision, rock answers his health bar. Hold R for the committed all-in near any wall.",
      dos:["Ice-root his engage commit","Grass-reset the trades he tracks","R the wall fight he can't refuse"],
      donts:["Coin-flip openers without an element","Burn E entering when it exits too","Duel in open ground at even HP"],
      win:"Out-element the mirror — the assassin with terrain wins the tie."
    },
    fighter:{
      tldr:"He brawls in straight lines and your kit sells corners — pass-trade the edges and stun the wall he chased you to.",
      breakdown:"Never stand the brawl: ice-Q the engage, pass through with E strings, and rock-execute only the locked. The R against any wall converts his chase into your fight.",
      dos:["Ice the engage, pass-trade the slow","Kite to walls and cash the R stun","Execute with rock only below half"],
      donts:["Brawl in open lane at even HP","E in with no element loaded","Chase past your terrain"],
      win:"Sell the brawler a corner and collect at the wall."
    }
  },
  mirror:{
    tldr:"Element mirror — whoever holds the right element at the right second wins each string; the R wall war ends it.",
    breakdown:"Track her loaded element like a cooldown: ice means don't engage, grass means watch the fog, rock means don't be low. Hold your R for the wall fight hers wants.",
    dos:["Read her loaded element constantly","Trade against the wrong element","R second at the wall standoff"],
    donts:["Engage into her loaded ice","Walk the brush line she stealthed","Trade rock-for-rock at low HP"],
    win:"Right element, right second — the better terrain lawyer wins.",
    winS:"Her dash is down — string her; the floor is just floor for her now."
  },
  winS:"His answer is spent — ice the window and run the string.",
  tradeGood:"Grass-Q from stealth, E-ice the answer, auto, walk back into the hedge — terrain trades he experiences as ambush weather.",
  tradeBad:"E-ing in with no element loaded and his CC banked — Qiyana without terrain prep is a dagger doing improv.",
  waveBest:"a Q-cleared push that crashes by the river brush — your kill windows live where the hedges meet the wave.",
  waveWorst:"a frozen wave in open lane — no grass, no walls, no business model.",
  early:"Fight where the floor helps — brush Qs, ice roots, rock receipts. Open-ground Qiyana is a balance change away from honest.",
  mid:"First item onward, own the rivers: the brush is your poke, the walls are your stuns, and every objective pit is a Supreme Display venue.",
  late:"You are the wall-stun flank: R the pit fight, string the stunned line, and grass-vanish before the response compiles.",
  safetyTool:"W Terrashape (element swap)",
  spikesLine:"Level 3 ice-strings set the pattern; level 6 weaponizes walls; first item makes strings lethal.",
  carryLine:"Carry through terrain — every pit fight starts with your R threatening the wall; your job is the angle and the element loaded for it.",
  behindShort:"farm with Q passes and stay relevant through R wall-stuns.",
  loadingRule:"Element before engagement — the loaded W is the plan.",
  dontDetail:"Your E sticks to the target it chose — dashing onto a held stun is a subpoena you served yourself.",
  aheadTpl:"Ahead, own the floor: zone {E} from hedges, root the answers, and R every wall fight — fed Qiyana makes geometry a banable offense.",
  behindTpl:"Behind, farm the elements: ice the dives, grass the resets, and wait for the pit fight where one R rewrites the ledger.",
  spikeName:"first item",
  runeReport:"Electrocute or First Strike, Sudden Impact, Eyeball Collection, Relentless Hunter; secondary Precision — Presence of Mind + Coup de Grace.",
  summReport:"Flash + Ignite — the string wants a signature. TP into the HARD column.",
  itemReport:"Start Doran's Blade + pot. Eclipse or Profane-line, Lucidity/Steelcaps, then Serylda's-Axiom paths.",
  jungleLine:"Ice-root on arrival plus an R that stuns the whole gank lane — Qiyana ganks near walls are pre-written verdicts.",
  redditLine:"grass for angles, ice for answers, rock for receipts — Qiyana wins by suing the floor plan.",
  load:{
    sub:"r/QiyanaMains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Serrated Dirk (≈1100g) — strings start chunking",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Eclipse / Profane Hydra",
    secondItem:"Serylda's path",
    boots:"Ionian Lucidity",
    bootsVsAP:"Mercury's Treads / Lucidity",
    bootsVsAD:"Plated Steelcaps / Lucidity",
    spike:"First lethality item — element strings delete squishies near any wall.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Sudden Impact","Eyeball Collection","Relentless Hunter"], tree:"Precision", secondary:["Presence of Mind","Coup de Grace"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    lissandra:{ tldr:"Her root catches the stick-dash and her tomb laughs at the wall stun — the anti-Qiyana pick; poke from grass and win the map, not the lane." },
    vex:{ tldr:"Your E and R-dash feed her fears — trade on foot from stealth angles and dash only after the pulse is banked." },
    yasuo:{ tldr:"Wind Wall eats the Q and his dashes ignore your ice — string only behind the wall's cooldown and R the knockup clump he builds for you." }
  }
},

// ============================== SYLAS ==============================
{
  key:'sylas', name:'Sylas',
  curve:[-0.3,-0.1,0.2,0.3,0.7,0.5,0.4],
  lvl:[
    "Q-poke the wave contacts — the chain detonation chips while you wait for the real kit at 3.",
    "W joins: the heal-strike makes even trades dishonest — yours refunds, his doesn't.",
    "Full kit: E2-chain into Q-W with passive whirls is the lane's best level-3 all-in nobody respects yet.",
    "Chain-trade on cooldown: shield in, stun, whirl the passive autos, heal out. The brawl is the plan.",
    "Hijack online — your R is whatever his best button is. The lane's power budget just became a shared account.",
    "First item spike: full chains with a stolen ult delete or out-brawl anything mid offers.",
    "Late Sylas shops the enemy team: steal the fight-flipper, flank with it, and heal through the refund policy."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'EVEN', fighter:'EVEN' },
  diffEx:{ vex:'HARD',
    malzahar:'FAVOURED', syndra:'FAVOURED', lux:'FAVOURED', xerath:'FAVOURED', ziggs:'FAVOURED', hwei:'FAVOURED', brand:'FAVOURED', twistedfate:'FAVOURED', zoe:'FAVOURED',
    zed:'TRICKY', talon:'TRICKY', qiyana:'TRICKY', naafiri:'TRICKY', cassiopeia:'TRICKY', galio:'TRICKY', irelia:'TRICKY', yasuo:'TRICKY', yone:'TRICKY', pantheon:'TRICKY',
    leblanc:'EVEN', katarina:'EVEN', akali:'EVEN', fizz:'EVEN', ekko:'EVEN', diana:'EVEN', kassadin:'EVEN', vladimir:'EVEN', lissandra:'EVEN', anivia:'EVEN', swain:'EVEN', ryze:'EVEN', taliyah:'EVEN', orianna:'EVEN', viktor:'EVEN', azir:'EVEN', veigar:'EVEN', annie:'EVEN', ahri:'EVEN', neeko:'EVEN', karma:'EVEN', mel:'EVEN', aurora:'EVEN' },
  vs:{
    control:{
      tldr:"He poked a brawler with a budget for his ultimate — chain in on the gaps and spend HIS R better than he does.",
      breakdown:"Eat the early poke with W refunds and shield-dash the rest. From 6, his ult is your ult with better delivery: most control Rs (shockwaves, storms, lasers) flank better from a chain-stun engage than from their owner.",
      dos:["Chain his cooldown gaps, whirl, heal out","Steal early — his R recharges your threat","Open fights with his own teamfight button"],
      donts:["Eat full rotations waiting to scale","Chain into his loaded CC","Hold the steal for a 'better' fight forever"],
      win:"Brawl the gaps and spend his ultimate with better manners than he ever did."
    },
    burst:{
      tldr:"His combo is a sprint and yours is a treadmill — shield the opener, heal the middle, and out-last the math.",
      breakdown:"E1's shield blunts his burst and W's heal refunds the rest; your chains then hold him for the extended exchange his kit dreads. Steal whatever execute or dash he carries and return the assassination attempt.",
      dos:["E-shield the opener, W-heal the rest","Chain-stun the post-combo silence","Steal his best button and reply with it"],
      donts:["Trade at his range during his window","Burn the dash entering when it shields","Brawl at half HP without W up"],
      win:"Out-last the sprint and answer it with his own punctuation."
    },
    assassin:{
      tldr:"An assassin duel you fight as a bruiser — shield, chain, heal, and let the stolen ult vote twice.",
      breakdown:"Your kit out-sustains every assassin mirror: shield the opener, whirl the trade, heal the difference. Their ults steal beautifully — a borrowed Death Mark or Chronobreak ends the rivalry with prejudice.",
      dos:["Sustain the mirror with W timing","Chain the reset attempts","Steal his signature and duel with it"],
      donts:["Trade burst-for-burst at his pace","Chase resets past your chains","Shield late — it's the opener answer"],
      win:"Bruise through the mirror and counter-sign with his own ultimate."
    },
    fighter:{
      tldr:"A brawl both kits want — yours heals and borrows; trade whirls behind W timing and steal the duel-flipper.",
      breakdown:"You match fighters at their own game: passive whirls, W refunds, chain interrupts. The stolen R decides — most fighter ults (rages, transformations) wear your AP ratios surprisingly well.",
      dos:["Whirl-trade behind W refunds","Chain the engage mid-wind-up","Steal the duel ult and re-duel"],
      donts:["Brawl with W down — the math flips","Chain in without the shield","Trade at his item spikes blind"],
      win:"Out-heal the brawl and borrow the button that was supposed to win it."
    }
  },
  mirror:{
    tldr:"Chain mirror — two thieves, one lane; whoever steals the better third-party ult wins the argument neither kit can settle.",
    breakdown:"The mirror is decided by W timing and the steal menu: heal second, chain first, and take the teamfight R while he takes the duel one — fights have more bodies than duels.",
    dos:["Heal second in the brawl exchanges","Chain his W wind-up","Steal for the fight, not the duel"],
    donts:["Trade W-for-W on his timer","Hijack his Hijack — it's a mirror, think","Brawl at even HP with shields down"],
    win:"Better W timing, better shopping — the mirror goes to the smarter thief.",
    winS:"His W is down — the brawl math is yours; commit."
  },
  winS:"His engage is spent — chain in and out-brawl the silence.",
  tradeGood:"E-shield in, E2-chain, Q-W with whirls between, heal out — the full brawl string he answered with one rotation and regret.",
  tradeBad:"Chaining into a loaded CC with W down — Sylas without the heal is a mage who chose melee for the aesthetic.",
  waveBest:"a Q-detonated push that crashes as your steal comes off cooldown — every crash window shops the enemy team.",
  waveWorst:"a frozen wave pre-3 against poke — the brawler era hasn't started and the mage era is billing you.",
  early:"Survive to 3, then brawl the gaps — your level 3-5 all-in is the lane's best-kept secret. Steal opinions at 6.",
  mid:"First item onward, the account is shared: chain the rivers with their best ult in your pocket and heal through the counter-argument.",
  late:"You are whatever the enemy drafted best: steal the fight-flipper, flank with chains, and let W make their focus-fire a rounding error.",
  safetyTool:"E Abscond (shield-dash)",
  spikesLine:"Level 3 chains start the brawls; level 6 opens the shop; first item makes the borrowing lethal.",
  carryLine:"Carry through theft — the enemy's win condition is on your hotbar; your job is spending it with a chain-stun delivery they never had.",
  behindShort:"farm with Q detonations and stay relevant through stolen ults.",
  loadingRule:"Shop before you fight — the steal IS the game plan.",
  dontDetail:"Your W heals double when you're wounded — burning it at full HP is paying retail for a clearance kit.",
  aheadTpl:"Ahead, monopolize: brawl {E} off every contact, steal the map's best button on cooldown, and flank fights with their own game plan.",
  behindTpl:"Behind, the shop stays open: farm chains, steal the fight-flipper, and let one borrowed teamfight reset the books.",
  spikeName:"first item",
  runeReport:"Electrocute or Conqueror, Sudden Impact, Eyeball Collection, Ultimate Hunter; secondary Precision — Presence of Mind + Coup de Grace.",
  summReport:"Flash + Ignite for kill lanes; Flash + TP when the steal menu suggests patience.",
  itemReport:"Start Doran's Ring or Shield + pots. Riftmaker into Mercs/Sorcerer's, then Zhonya's and Cosmic Drive — HP scales the whirls AND the steals.",
  jungleLine:"Chain-on-arrival holds any gank target, and a stolen enemy-jungler ult mid-river is the rudest 2v2 swing in the game.",
  redditLine:"shield in, chain the answer, heal wounded — and always know what you're stealing before the fight starts; Sylas wins with other people's homework.",
  load:{
    sub:"r/SylasMains",
    start:"Doran's Shield + Health Potion",
    normalBack:"Hextech Alternator (≈1100g) — chains start chunking",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Riftmaker",
    secondItem:"Zhonya's / Cosmic Drive",
    boots:"Mercury's Treads / Sorcerer's",
    bootsVsAP:"Mercury's Treads",
    bootsVsAD:"Plated Steelcaps",
    spike:"Riftmaker — the brawl heals through everything and the steals hit like rent.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Sudden Impact","Eyeball Collection","Ultimate Hunter"], tree:"Precision", secondary:["Presence of Mind","Coup de Grace"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    vex:{ tldr:"Your E feeds her fear and her R steals terribly — the worst trade agreement in mid; brawl on foot post-pulse and shop elsewhere." },
    malzahar:{ tldr:"Steal the suppression and silence the silencer — his R is your best item this game; pop the shield with Q first, always.",
      dos:["Pop his shield before every chain","Steal R early — it's a kill button","Suppress him as the gank lands"] },
    syndra:{ tldr:"Her orbs hurt but her R steals beautifully — survive the poke to 6 and return the Unleashed Power with chain-stun delivery." }
  }
},

// ============================== TALON ==============================
{
  key:'talon', name:'Talon',
  curve:[0.3,0.4,0.4,0.3,0.4,0.4,-0.1],
  lvl:[
    "W the wave and his chest — the return pass is the damage; stand where the boomerang's geometry doubles.",
    "Q-leap trades begin: W-Q-auto procs the bleed at 2 and most mids don't budget for it.",
    "Full kit: the parkour opens — every wall on mid's border is now a gank route or an exit visa.",
    "Bleed-string the contacts: W both passes, Q the gap, auto the third stack. The lane bleeds rent.",
    "Shadow Assault online — the roam game doubles and the all-in wraps targets in a blade carousel.",
    "First item spike: the full string one-rotations squishies. Shove and parkour — side lanes owe you taxes.",
    "Late Talon flanks from coordinates wards don't cover: R in, string the carry, blade-exit through the wall."
  ],
  diffBase:{ control:'FAVOURED', burst:'EVEN', assassin:'EVEN', fighter:'TRICKY' },
  diffEx:{ galio:'HARD', pantheon:'HARD', lissandra:'HARD', vex:'HARD',
    kassadin:'FAVOURED', vladimir:'FAVOURED',
    zoe:'FAVOURED', lux:'FAVOURED', xerath:'FAVOURED', ziggs:'FAVOURED', hwei:'FAVOURED', brand:'FAVOURED', twistedfate:'FAVOURED',
    irelia:'TRICKY', yasuo:'TRICKY', yone:'TRICKY', annie:'TRICKY', sylas:'TRICKY', neeko:'TRICKY', aurora:'TRICKY',
    malzahar:'EVEN', cassiopeia:'EVEN', anivia:'EVEN', swain:'EVEN', syndra:'EVEN', taliyah:'EVEN', ekko:'EVEN', diana:'EVEN', zed:'EVEN', katarina:'EVEN', akali:'EVEN', fizz:'EVEN', leblanc:'EVEN', qiyana:'EVEN', naafiri:'EVEN', veigar:'EVEN', ahri:'EVEN', karma:'EVEN', mel:'EVEN', viktor:'EVEN', orianna:'EVEN', azir:'EVEN', ryze:'EVEN' },
  vs:{
    control:{
      tldr:"He needs distance and you commute through walls — bleed the contacts, shove, and tax the side lanes he can't warn fast enough.",
      breakdown:"W-string every wave contact and the chip war is yours; his answer spell is the only sentence to respect. From 6 the question changes: kill him, or shove and parkour to someone less prepared — both pay.",
      dos:["W both passes on every contact","String the bleed at his step-ups","Shove-and-parkour on roam timers"],
      donts:["Leap into his held CC","Linger at melee after the string","Roam without crashing first"],
      win:"Bleed the lane or leave it — either way the map pays Noxian rates."
    },
    burst:{
      tldr:"His combo is aimed and yours is administered — string the bleed before his setup lands and exit through the geometry.",
      breakdown:"Your W out-trades his poke and your Q gap-close punishes the cast animations his combo needs. Hold the leap for the post-setup silence and the rake's return makes every trade double-entry.",
      dos:["W-trade his cast animations","Q the post-setup silence","Keep the rake's return line honest"],
      donts:["Leap during his loaded window","Trade at his range without the bleed","All-in shieldless setups blind"],
      win:"Administer the bleed faster than his aim can schedule the answer."
    },
    assassin:{
      tldr:"A roam race with knives — string even trades and win the map: your parkour means your ganks arrive first.",
      breakdown:"The lane mirror is close to even; the map mirror isn't. Bleed-trade the contacts, then crash and parkour — every side-lane kill you take while he resets mid is the matchup working as designed.",
      dos:["Trade strings, then race the map","Crash before every parkour exit","R the duels his resets can't insure"],
      donts:["Coin-flip lane all-ins at even tempo","Roam without the crash alibi","Duel inside his reset resources"],
      win:"Split the difference in lane and win the commute by three kills."
    },
    fighter:{
      tldr:"He out-stats the duel — so don't duel: rake the edges, bleed the engage, and pay the lane forward to your side lanes.",
      breakdown:"Fighters beat your melee math: W from range, Q only the spent engage, and spend your tempo on the parkour economy. The R all-in exists for chipped fighters, not healthy ones.",
      dos:["Rake from the edges exclusively","Q only his spent-engage windows","Bank tempo into roams, not trades"],
      donts:["Brawl the stat check at even HP","Leap in with his engage loaded","R a healthy fighter out of boredom"],
      win:"Refuse the duel and invoice the rest of the map instead."
    }
  },
  mirror:{
    tldr:"Blade mirror — whoever lands the rake return wins each trade; whoever roams off the first crash wins the game.",
    breakdown:"Sidestep his W return line and land yours, then race the map: the mirror is a tempo contest where the lane is the slow lane.",
    dos:["Dodge his return, land yours","Win the first-crash roam race","R second in the lane standoff"],
    donts:["Trade inside his return geometry","Mirror his roam instead of cross-mapping","Duel at even bleed stacks"],
    win:"Rake cleaner, roam first — the faster blade wins.",
    winS:"His W is down — step in; the geometry is yours."
  },
  winS:"His answer is spent — W-Q the string and bleed the rest.",
  tradeGood:"W on the contact, Q the gap, auto for the bleed, walk through the return — three stacks of rent he paid for one trade.",
  tradeBad:"Q-leaping into a held CC for style — Talon without the gap-closer is a roamer stuck in traffic.",
  waveBest:"a W-shoved crash that funds a parkour exit — every wave you clear is a side lane invoice in transit.",
  waveWorst:"a frozen wave in open lane vs a pointed CC — the assassin commuting on foot through a toll booth.",
  early:"Bleed the contacts and bank the tempo — your 2-5 is a bully window the lobby keeps forgetting.",
  mid:"Crash, parkour, collect: the E economy means your ganks arrive before their pings do. Two side-lane kills per R cycle is the quota.",
  late:"You are the flank from nowhere: parkour the unwarded wall, R the carry, string the exit — and the obituary lists 'map design' as cause.",
  safetyTool:"E Assassin's Path",
  spikesLine:"Level 2 strings bully; level 6 doubles the roam threat; first item makes rotations one-shot.",
  carryLine:"Carry through the commute — the lane funds the roams and the roams fund the game; your walls are everyone else's wards.",
  behindShort:"farm with W passes and stay relevant through roam tempo.",
  loadingRule:"Stand where the rake's return doubles — geometry is the poke.",
  dontDetail:"Each wall's parkour has its own cooldown — the exit you used entering is the exit you don't have leaving.",
  aheadTpl:"Ahead, raise the rent: bleed {E} off every contact, crash-and-parkour the rivers, and R the side lanes into receivership.",
  behindTpl:"Behind, rake from range and commute — Talon deficits are lane-shaped; the map still pays parkour rates.",
  spikeName:"first item",
  runeReport:"Electrocute or First Strike, Sudden Impact, Eyeball Collection, Relentless Hunter; secondary Precision — Presence of Mind + Coup de Grace.",
  summReport:"Flash + Ignite — the string wants a closer; TP only into the HARD column.",
  itemReport:"Start Doran's Blade + pot. Profane Hydra or Eclipse, Lucidity, then Serylda's-Axiom paths. Lethality is the language.",
  jungleLine:"Parkour to counter-gank angles no ward covers — Talon-jungler river fights start 2v1 because you arrived through the wall.",
  redditLine:"return passes, wall cooldowns, and a commuter's calendar — Talon wins by being where the map insists he can't be.",
  load:{
    sub:"r/Talonmains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Serrated Dirk (≈1100g) — strings start one-rotating math",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Profane Hydra / Eclipse",
    secondItem:"Serylda's path",
    boots:"Ionian Lucidity",
    bootsVsAP:"Mercury's Treads / Lucidity",
    bootsVsAD:"Plated Steelcaps / Lucidity",
    spike:"First lethality item — the full string one-rotations squishies.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Sudden Impact","Eyeball Collection","Relentless Hunter"], tree:"Precision", secondary:["Presence of Mind","Coup de Grace"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    galio:{ tldr:"MR, a dash-catching taunt, and AoE that ruins your melee window — the anti-Talon statue; rake from range and pay the side lanes instead." },
    pantheon:{ tldr:"His E blocks the string from the front and his early stats out-duel yours — trade W-only until his W is spent, and parkour past the problem." },
    lissandra:{ tldr:"Root catches the leap, tomb cancels the R carousel — string only her cooldown gaps and commute for a living." }
  }
},

// ============================== ZED ==============================
{
  key:'zed', name:'Zed',
  curve:[0.3,0.4,0.4,0.3,0.6,0.5,0.1],
  lvl:[
    "Q through the wave's gaps on his last-hits — energy refunds on hits mean accuracy IS your mana bar.",
    "W opens the double-shuriken angles: shadow wide, Q the scissor — the geometry chips half bars by 3.",
    "E joins: W-E-Q strings slow and shred. Pick the angle his minion cover doesn't block.",
    "Poke the scissors on cooldown and bank energy before every real string — the lane bleeds to geometry.",
    "Death Mark online — anyone below 60% in lane is now a math problem with a three-second answer.",
    "First item spike: R-strings delete squishies through pots. Hunt the chip thresholds.",
    "Late Zed picks: mark the carry, swap through the peel, and let the death note collect the paperwork."
  ],
  diffBase:{ control:'FAVOURED', burst:'EVEN', assassin:'EVEN', fighter:'TRICKY' },
  diffEx:{ lissandra:'HARD', vex:'HARD',
    kassadin:'EVEN', malzahar:'EVEN', anivia:'EVEN', cassiopeia:'EVEN', syndra:'EVEN', ekko:'EVEN', diana:'EVEN', katarina:'EVEN', akali:'EVEN', fizz:'EVEN', leblanc:'EVEN', talon:'EVEN', qiyana:'EVEN', naafiri:'EVEN', ahri:'EVEN', annie:'EVEN', viktor:'EVEN', orianna:'EVEN', azir:'EVEN', taliyah:'EVEN', ryze:'EVEN', swain:'EVEN', veigar:'EVEN', karma:'EVEN', mel:'EVEN', aurora:'EVEN', neeko:'EVEN', vladimir:'EVEN',
    zoe:'FAVOURED', lux:'FAVOURED', xerath:'FAVOURED', ziggs:'FAVOURED', hwei:'FAVOURED', brand:'FAVOURED', twistedfate:'FAVOURED',
    galio:'TRICKY', irelia:'TRICKY', yasuo:'TRICKY', yone:'TRICKY', pantheon:'TRICKY', sylas:'TRICKY' },
  vs:{
    control:{
      tldr:"You were drafted to end exactly this — scissor the poke war, chip past 60%, and let Death Mark do the literature.",
      breakdown:"Double-shuriken angles out-chip his rotation and your energy refunds outlast his mana. Respect the one CC spell, chip to the R threshold, and the level 6 all-in is a formality with a cinematic.",
      dos:["Scissor-poke the wave contacts","Chip him below 60% before 6 windows","R only with his answer spell down"],
      donts:["Dive into held CC for highlights","Waste W's energy on dry pokes","Linger post-R at his tower's range"],
      win:"Chip the threshold, dodge the one answer, and let the mark notarize the lane."
    },
    burst:{
      tldr:"His burst is magic, yours is paperwork — shadow-dodge the rotation and serve the mark in the silence after.",
      breakdown:"Your W doubles as the combo-dodge his aim can't pre-read: swap out of the setup, scissor the gap, and R the cooldown silence. Zhonya's-class answers are his only appeal — track them like summoners.",
      dos:["W-swap out of his setup spell","Scissor the post-combo silence","Track his stopwatch before every R"],
      donts:["R into a banked Zhonya's","Trade inside his loaded window","Spend both shadows entering"],
      win:"Dodge the scheduled burst and administer the unscheduled one."
    },
    assassin:{
      tldr:"The reference assassin mirror — energy versus resets; whoever lands the poke war serves the first mark.",
      breakdown:"Scissor-chip wins most assassin mirrors before all-ins exist: poke the thresholds, hold W as the disengage his engage can't follow, and R second when his answer is provably down.",
      dos:["Win the scissor chip war first","Hold W as the mirror's disengage","Mark second, with his answer down"],
      donts:["Coin-flip first R at even HP","Spend energy below 100 entering","Duel inside his reset windows"],
      win:"Out-chip the mirror and counter-mark the impatient half of it."
    },
    fighter:{
      tldr:"He stat-checks the all-in you must not sign — scissor from range, refuse the brawl, and mark only the chipped.",
      breakdown:"Fighters survive your R-string and then audit it: poke W-E-Q from geometry, never melee at even health, and spend the mark on sub-half targets or roams. The lane is a chip clinic, not a duel.",
      dos:["Scissor exclusively from range","Mark sub-half targets only","Bank tempo into roams when the lane stalls"],
      donts:["Melee-trade the stat check","R a healthy bruiser for pride","Burn shadows defensively then poke naked"],
      win:"Chip from geometry and let the mark visit someone its math actually kills."
    }
  },
  mirror:{
    tldr:"Shadow mirror — energy discipline and scissor accuracy; whoever Rs first donates the swap-dodge to the other.",
    breakdown:"Win the W-E-Q chip war and hold R second: his mark teleports him to a Zed whose W is banked for exactly that. The patient shadow collects.",
    dos:["Win the scissor accuracy war","Bank W for his R arrival","Mark second, always"],
    donts:["R first at even health","Trade energy-broke","Stand inside the double-shuriken lanes"],
    win:"Second mark wins — his R arrival is your W's favorite appointment.",
    winS:"His W is down — scissor freely; the geometry is yours alone."
  },
  winS:"His answer is spent — mark the window and finish the paperwork.",
  tradeGood:"W wide, E the slow, Q the scissor from two angles — half a bar of geometry he answered by standing still wrong.",
  tradeBad:"R-ing into a banked stopwatch or held CC — the mark schedules YOUR death three seconds out when the answer was visible.",
  waveBest:"a scissor-thinned slow push that holds the chip war at your range — crash only when the roam or the mark is scheduled.",
  waveWorst:"a frozen wave at his tower with both shadows down — an energy assassin doing manual labor in ward range.",
  early:"Win the chip war — scissors out-trade every mage contact and the energy refunds keep the meter running. 60% is the magic number.",
  mid:"First item onward, serve the marks: lane kills at thresholds, roam kills off crashes, and always leave the swap home for the answer.",
  late:"You are the carry subpoena: mark the priority target, swap through the peel, and let the death note argue with their items.",
  safetyTool:"W Living Shadow (swap)",
  spikesLine:"Level 3 scissors run the chip war; level 6 schedules executions; first item makes marks lethal through answers.",
  carryLine:"Carry through subpoenas — one marked carry per fight; your job is the threshold math and the swap you saved for their answer.",
  behindShort:"farm with Q geometry and stay relevant through mark picks.",
  loadingRule:"Chip to 60% before any mark — the R is a calculator, not a coin.",
  dontDetail:"The shadow swap is your only defense — both shadows spent entering is a cinematic with no second act.",
  aheadTpl:"Ahead, audit the map: scissor {E} off every contact, mark the thresholds, and roam the crashes — fed Zed makes health bars legal documents.",
  behindTpl:"Behind, chip from geometry: scissor-farm, bank the swap for dives, and serve the one mark that resets the ledger.",
  spikeName:"first item",
  runeReport:"Electrocute or First Strike, Sudden Impact, Eyeball Collection, Ultimate Hunter; secondary Precision — Presence of Mind + Coup de Grace.",
  summReport:"Flash + Ignite — the mark wants a cosigner. TP into the Lissandra-Vex column you should have banned.",
  itemReport:"Start Doran's Blade + pot. Profane Hydra or Eclipse, Lucidity, then Serylda's and Axiom Arc — the ult-haste loops the subpoenas.",
  jungleLine:"Your W-E slow is gank setup and your R follows their Flash — Zed-jungler dives convert at signature rates; ping the 60% bars.",
  redditLine:"scissors before swords, 60% before R, and save the swap for their answer — Zed wins by doing the math the highlight reels skip.",
  load:{
    sub:"r/zedmains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Serrated Dirk (≈1100g) — scissors start shredding",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Profane Hydra / Eclipse",
    secondItem:"Serylda's / Axiom Arc",
    boots:"Ionian Lucidity",
    bootsVsAP:"Mercury's Treads / Lucidity",
    bootsVsAD:"Plated Steelcaps / Lucidity",
    spike:"First lethality item — R-strings delete squishies through their pots.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Sudden Impact","Eyeball Collection","Ultimate Hunter"], tree:"Precision", secondary:["Presence of Mind","Coup de Grace"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    lissandra:{ tldr:"She self-tombs your mark and roots the body that delivered it — the textbook counter; chip from max geometry and mark literally anyone else." },
    vex:{ tldr:"Your W, R, and dreams all feed her fear schedule — scissor on foot, swap only after her pulse, and mark the gloom-less windows." },
    malzahar:{ tldr:"His shield eats a scissor and his R interrupts your cinematic — pop the shield before trades and mark only with his suppression confirmed down." }
  }
}
];

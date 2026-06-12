// MatchupCoach — generator configs batch 1: Ziggs, Sylas, Sejuani, Ryze, Neeko.
window.GEN_CFGS_1 = [

// ============================== ZIGGS ==============================
{
  key:'ziggs', name:'Ziggs',
  curve:[0.8,0.6,0.6,0.6,0.3,0.5,-0.3],
  lvl:[
    "Q bombs out-range every melee tool in the game — chunk {E} on every last-hit attempt, but respect early minion aggro.",
    "W Satchel online — your disengage button. You can now take a greedy trade and blast yourself out of the answer.",
    "Full kit: E minefield behind you makes you nearly unchaseable. Bounce Q off the wave so {E} can't read the angle.",
    "Stack Manaflow and chip {E} below 60% — that's the zone where R + jungle help executes. Track {K} before every step-up.",
    "Mega Inferno Bomb online — any chipped target or crashing wave is now your gold. Hold it for the sub-60% HP window.",
    "Blackfire Torch spike — your Q chunks become unhealable burn chip. {E} now chooses between farm and HP every wave.",
    "Shadowflame + Torch makes the full rotation lethal, but the map matters more — rotate R to sieges and skirmishes."
  ],
  diffBase:{ jugg:'FAVOURED', diver:'TRICKY', tank:'FAVOURED', ranged:'EVEN' },
  diffEx:{ garen:'EVEN', urgot:'EVEN', irelia:'HARD', yasuo:'HARD', yone:'HARD', camille:'HARD', ambessa:'HARD',
    warwick:'EVEN', gragas:'EVEN', vayne:'EVEN', ksante:'EVEN', poppy:'EVEN', zac:'TRICKY', maokai:'EVEN', nautilus:'EVEN',
    akali:'HARD', sylas:'HARD', kassadin:'FAVOURED', quinn:'TRICKY', rumble:'TRICKY', lucian:'TRICKY',
    cassiopeia:'TRICKY', akshan:'TRICKY', graves:'TRICKY', galio:'TRICKY', mel:'TRICKY' },
  vs:{
    jugg:{
      tldr:"He has to walk through three minefields to touch you — bomb every step-up and never stand still once {K} is up.",
      breakdown:"Q from max range on his last-hits, drop E between you the moment he walks forward, and keep W strictly for {K}. He kills you exactly once per game: when you stand still without Satchel.",
      dos:["Bomb his last-hits from max Q range","Drop E minefield the instant he steps forward","Hold W Satchel strictly for {K}"],
      donts:["Stand inside {K} range with W down","Use W aggressively while his engage is up","Push past river without vision"],
      win:"Poke him off CS and satchel away from every engage."
    },
    diver:{
      tldr:"His dashes beat your range the moment you waste W — satchel his engage, not your tempo.",
      breakdown:"This lane is a cooldown ledger: his {K} versus your Satchel. Pre-place E on his dash path, poke only when the trade back is impossible, and accept farming under tower when his kit is loaded.",
      dos:["Track {K} like a summoner spell","Pre-place E minefields on his dash path","Satchel the engage, then resume the poke"],
      donts:["Waste W on poke or wave-clear","Trade inside his effective dash range","Greed for plates while {K} is up"],
      win:"Deny the engage and grind him down between his cooldowns."
    },
    tank:{
      tldr:"Free poke lane — win by denying farm and rotating R, not by trying to kill a raid boss.",
      breakdown:"Bully levels 1-5 with Q on every CS, then stop sinking full rotations into a full-HP tank. Shove with E + Q, take plates with W's tower demolish, and spend R on skirmishes elsewhere.",
      dos:["Poke him off CS hard at levels 1-3","Shove and rotate R to river skirmishes","Chip tower plates with W demolish"],
      donts:["Dump full rotations into a full-HP tank","Facecheck his engage range in brush","Sit top when R wins a fight elsewhere"],
      win:"Starve him early, then out-map him with R and satchel sieges."
    },
    ranged:{
      tldr:"A real poke war — your Q out-ranges, his {K} punishes. Trade bombs and dodge the answer.",
      breakdown:"You win the spell-for-spell war on range and AoE, he wins on whatever {K} enables. Sidestep it, keep the wave near the middle, and let Scorch + Torch math grind him out of lane.",
      dos:["Win level 1 with raw Q range","Sidestep {K} before committing your own poke","Use E zones to control where the trade happens"],
      donts:["Eat free poke while your Q is on cooldown","Burn W while his all-in tool is up","Ignore your mana bar in a spam war"],
      win:"Out-poke and out-shove him; Satchel resets every mistake."
    }
  },
  mirror:{
    tldr:"Bomb mirror — whoever lands more Qs and holds Satchel longer wins the war of attrition.",
    breakdown:"Identical kits make this pure geometry: bounce Q off minions at angles he can't read, hold W longer than he does, and only step to a wave his minefield doesn't own.",
    dos:["Bounce Q at unreadable angles","Hold W longer than he holds his","Trade only with more mana banked"],
    donts:["Stand inside his minefield zone","Satchel first without a kill window","Shove into his R count"],
    win:"Out-land Qs and out-discipline the Satchel war.",
    winS:"His Satchel is down — he can't escape your chain."
  },
  winS:"No engage left — chunk him for free.",
  tradeGood:"Bounce Q off the wave into {E}'s sidestep lane, step up to threaten the E zone, then back off before he closes — repeat until he's executable.",
  tradeBad:"Burning W Satchel for damage and then standing in {K} range with no escape — the only way this lane kills you.",
  waveBest:"a slow push you control from max range — {E} farms under poke while you bank a cannon crash for recall or roam.",
  waveWorst:"a frozen wave near his tower while {K} is up — every CS costs HP and jungle exposure.",
  early:"Win the first three levels on raw range: Q every last-hit attempt, E the space he wants to stand in, and respect only {K}.",
  mid:"Shove, chip, and win the mana war. Once Blackfire Torch completes, {E} farms at half HP forever — call jungle dives on anyone chipped below 60%.",
  late:"Your job is sieges and zone control — R the wave before objectives, satchel-peel divers off you, and never get flanked mid-poke.",
  safetyTool:"W Satchel",
  spikesLine:"Blackfire Torch is the first real spike; level 6 adds the half-map R execute; Shadowflame turns poke into kill pressure.",
  carryLine:"Carry by making waves and sieges unplayable — R and minefields decide objective fights from two screens away.",
  behindShort:"farm with max-range Q and stay relevant through wave-clear.",
  loadingRule:"Keep max Q range — never let him close for free.",
  dontDetail:"Your Satchel is your Flash — burning it for damage leaves you naked for twenty seconds.",
  aheadTpl:"You broke the lane — convert it: shove, demolish plates with W, and rotate R to every skirmish. Zone {E} off the comeback farm with minefields.",
  behindTpl:"Behind, farm at max range and wave-clear — Ziggs is never out of the game while towers need defending. Stop coin-flipping Satchel plays and scale your poke.",
  spikeName:"Blackfire Torch",
  runeReport:"Arcane Comet, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight. Comet plus minefield slows is near-guaranteed poke.",
  summReport:"Flash + Teleport is standard — TP survives juggernaut lanes and converts wave-clear into map plays. Ignite only into squishy duel lanes.",
  itemReport:"Start Doran's Ring + 2 pots. First: Blackfire Torch into Sorcerer's Shoes; then Shadowflame and Rabadon's. Zhonya's vs hard dive.",
  jungleLine:"Your E minefield is elite gank setup — drop it on {E}'s escape path the moment your jungler commits. Ward deep; you have no dash, only Satchel.",
  redditLine:"max Q, poke the lane off CS, and hold Satchel for {K} — Ziggs top wins by making the wave unplayable, not by all-inning.",
  load:{
    sub:"r/ZiggsMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — solves the mana war",
    antihealBack:"Oblivion Orb (≈800g) — cuts his healing",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Blackfire Torch",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Rabadon's third — your poke becomes execute damage.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall eats your entire kit — bait it with a cheap Q, then unload only after it's burned.",
      dos:["Bait Wind Wall with a throwaway Q","Drop E zones he must dash through","Hold W to break his EQ engage"],
      donts:["Poke into an available Wind Wall","Stand near the wave when his tornado is loaded","Burn W before his engage starts"] },
    mel:{ tldr:"Her Rebuttal reflects your bombs back — poke only while it glows on cooldown.",
      dos:["Count Rebuttal before every rotation","Trade E zones for her snare","Out-range her after the reflect is spent"] },
    kassadin:{ tldr:"He's a melee mage with no shield against your AoE — bully him off every CS pre-6 and end before Riftwalk scales." }
  }
},

// ============================== SYLAS ==============================
{
  key:'sylas', name:'Sylas',
  curve:[-0.5,-0.2,0.2,0.3,0.8,0.6,0.4],
  lvl:[
    "Q poke is your only level-1 tool — chain it on his step-ups but don't force anything; your power arrives with levels.",
    "W online — the burst-heal turns even trades into wins. Take the extended trade only when his answer is down.",
    "Full kit: E2 chain into Q-W-AA is a real chunk, and E1's shield eats the counter-trade. Trade in full rotations.",
    "Weave passive autos between every spell. Trade around {K} and bank small HP leads — they compound at 6.",
    "Hijack online — you now own a copy of {E}'s ultimate. The all-in math and every 2v2 swing your way.",
    "Riftmaker spike — your full chain with the W heal wins almost any extended 1v1 that starts even.",
    "Two items plus a stolen ult makes you a teamfight flex — flank, burst the carry, and steal the scariest R on cooldown."
  ],
  diffBase:{ jugg:'EVEN', diver:'TRICKY', tank:'FAVOURED', ranged:'EVEN' },
  diffEx:{ aatrox:'TRICKY', darius:'TRICKY', illaoi:'TRICKY', sett:'TRICKY', trundle:'TRICKY', urgot:'TRICKY', volibear:'TRICKY',
    nasus:'FAVOURED', irelia:'HARD', fiora:'HARD', renekton:'HARD', olaf:'HARD', pantheon:'HARD',
    tryndamere:'EVEN', gragas:'EVEN', ksante:'EVEN', poppy:'TRICKY', shen:'EVEN', tahmkench:'EVEN', nautilus:'EVEN', galio:'EVEN',
    kayle:'FAVOURED', teemo:'TRICKY', jayce:'TRICKY', quinn:'TRICKY', heimerdinger:'TRICKY', rumble:'TRICKY', gnar:'TRICKY',
    lucian:'TRICKY', graves:'TRICKY', akshan:'TRICKY', cassiopeia:'TRICKY', kassadin:'EVEN' },
  vs:{
    jugg:{
      tldr:"Long-fight specialist vs long-fight specialist — your W heal and a stolen R win it if you dodge {K}.",
      breakdown:"He wants the same extended brawl you do, so the lane is decided by whose key tool lands. Dodge {K} with E2, weave passive autos through every rotation, and remember his own ultimate is on your roster at 6.",
      dos:["Trade in full spell rotations, never flat autos","Save E2 to dodge {K}, not to engage","Steal his R and use it better than he does"],
      donts:["Burn both E charges to start a trade","Brawl into his sustain without your W ready","All-in before 6 without jungle help"],
      win:"Out-rotate his kit, dodge {K}, and beat him with his own ultimate."
    },
    diver:{
      tldr:"He skirmishes like you but spikes earlier — survive the early levels and your level 6 outscales his.",
      breakdown:"Respect his early windows: hold E1's shield for the engage burst and W the moment damage lands, not before. Once Hijack is up, his own ultimate usually turns the duel.",
      dos:["Hold E1 shield for his engage burst","W after his burst lands, not before","Chain E2 onto his exit when he disengages"],
      donts:["Trade while {K} is loaded","Open with E2 into a full-HP kit","Spend the shield on poke"],
      win:"Absorb the dive with E1 + W, then counter-chain with his stolen R."
    },
    tank:{
      tldr:"Free sustain lane and a premium ultimate to steal — bully with Q + passive, then carry skirmishes with his R.",
      breakdown:"He can't kill you and you heal everything he chips. Poke Q on every CS, shove and roam with MS, and treat his teamfight ultimate as your real lane prize — take it before every objective.",
      dos:["Poke Q + passive autos on every CS he takes","Steal his teamfight R before objectives","Run him down with W + MS when he's low"],
      donts:["Dive his tank stats without jungle help","Get hit by {K} for free","Stay top when your stolen R wins a fight elsewhere"],
      win:"Bully the farm lane and weaponize his own ultimate at every objective."
    },
    ranged:{
      tldr:"Get on him with E2 the moment {K} is down — one full chain with the W heal erases a poke deficit.",
      breakdown:"He pokes, you erase it: shield E1 through the harass, then chain in on the cooldown gap and dump the full rotation. At 6, Hijack plus Ignite kills almost every ranged top from 70%.",
      dos:["E2-engage only on {K}'s cooldown","Shield E1 through the poke before closing","All-in at 6 with the Hijack burst"],
      donts:["Walk up mid-wave with no shield","Trade single Qs into his poke at his range","Sit on a stolen ult — use it every fight"],
      win:"Erase his poke with W and kill him in one chained rotation."
    }
  },
  mirror:{
    tldr:"Mirror of thieves — whoever steals and spends the better ultimate first wins the skirmish.",
    breakdown:"Identical kits with one twist: at 6 you each carry the other's Hijack. Bait his chain first, keep your shield for his rotation, and fight when your passive stacks are loaded and his aren't.",
    dos:["Bait his E2 before committing yours","Trade with passive autos loaded","Win the Hijack mind-game at 6"],
    donts:["Chain into his ready shield","Brawl with W down","Forget he holds your ult too"],
    win:"Cleaner chains and better Hijack timing.",
    winS:"His chain is down — yours isn't. Go."
  },
  winS:"His answer is down — chain in and burst.",
  tradeGood:"E1 shield through his poke, E2 chain onto him, Q-W-AA with the heal, and walk as your passive expires — every exchange your shield starts is a win.",
  tradeBad:"Engaging with both E charges spent — no shield, no stun, and you're a melee mage standing in the open.",
  waveBest:"a slight freeze on your side — your E2 threat covers every CS he wants, and ganks finish what your burst starts.",
  waveWorst:"shoved into his tower while {K} is up — you can't engage and your sustain bleeds out to poke.",
  early:"Respect the first two levels, then start chaining Q and passive autos on his mistakes. The W heal quietly turns even trades into wins.",
  mid:"At 6 the lane becomes yours to command — steal his ultimate on cooldown and pick the fight he doesn't want. Look for flank angles in river skirmishes.",
  late:"You're the teamfight flex: steal the best R on the enemy team, flank, and burst the carry. W keeps you alive through the counter-dive.",
  safetyTool:"E1 shield",
  spikesLine:"Level 3 full kit, level 6 Hijack, and Riftmaker are the three doors — each upgrades the all-in math.",
  carryLine:"Carry by stealing the right ultimate at the right time — a Sylas holding Malphite's R carries harder than Malphite.",
  behindShort:"farm with Q, hold E for survival, and remember one good Hijack resets the game.",
  loadingRule:"Shield first, engage second.",
  dontDetail:"Both E charges spent means no shield and no exit — you're a melee mage in the open.",
  aheadTpl:"Snowball through skirmishes — shove, roam with a stolen ult, and force {E} to choose between tower and teammates. Zone him off farm with the E2 threat.",
  behindTpl:"Behind, you're still a Hijack delivery system — farm safe, keep E for survival, and flip one fight with the best stolen R on the map.",
  spikeName:"Riftmaker",
  runeReport:"Conqueror, Triumph, Legend: Tenacity, Last Stand; secondary Resolve — Second Wind + Unflinching. Conqueror plus the W heal is your extended-trade engine.",
  summReport:"Flash + Ignite for kill pressure at 6; swap to TP into hard-losing or heavy-scaling lanes.",
  itemReport:"Start Doran's Ring + 2 pots. First: Riftmaker into Mercs or Steelcaps; then Zhonya's and Cosmic Drive. Abyssal Mask vs AP.",
  jungleLine:"E2 is gank setup on demand — ping your jungler the moment {E} steps past river. A stolen ult doubles every 2v2.",
  redditLine:"shield through the poke, chain in on cooldown gaps, and treat Hijack as the win condition — Sylas top is a skirmish bully from 6 onward.",
  load:{
    sub:"r/SylasMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Fated Ashes + Dark Seal (≈1100g)",
    antihealBack:"Oblivion Orb (≈800g) — cuts his healing",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Riftmaker",
    secondItem:"Zhonya's Hourglass",
    boots:"Mercury's Treads",
    bootsVsAP:"Mercury's Treads",
    bootsVsAD:"Plated Steelcaps",
    spike:"Cosmic Drive third — your chase and rotation uptime doubles.",
    runes:{ keystone:"Conqueror", primaryTree:"Precision", primary:["Triumph","Legend: Tenacity","Last Stand"], tree:"Resolve", secondary:["Second Wind","Unflinching"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    malphite:{ tldr:"His R is the best steal in the game — bully the rock, take Unstoppable Force, and win every teamfight he starts." },
    fiora:{ tldr:"Riposte parries your chain and her vitals shred your brawls — bait W before every E2 or don't go at all." },
    mordekaiser:{ tldr:"His R drags you into a 1v1 — but yours now does too. Steal Realm of Death and turn his iso game against him." }
  }
},

// ============================== SEJUANI ==============================
{
  key:'sejuani', name:'Sejuani',
  curve:[-0.5,-0.3,-0.2,0,0.3,0.2,0.8],
  lvl:[
    "One of the weakest level 1s in top lane — take W, hit the wave, last-hit, and give absolutely nothing.",
    "Q online gives you an exit — use it to leave fights, not to start them, until your tank stats exist.",
    "Full kit: W-W into E Permafrost is your trade — land it on his step-up and walk before his counter-pattern starts.",
    "Frost stacks decide every trade: fight only when the full Q-W-E chain is available. Track {K} before stepping up.",
    "Glacial Prison online — every jungle visit is now a guaranteed CC chain. Your lane becomes a gank magnet.",
    "First tank item ends the squishy phase — you stop losing the trades your stun starts.",
    "You're a teamfight engine now — the lane barely matters if your R hits two people at the dragon pit."
  ],
  diffBase:{ jugg:'TRICKY', diver:'HARD', tank:'EVEN', ranged:'TRICKY' },
  diffEx:{ drmundo:'EVEN', nasus:'EVEN', mordekaiser:'TRICKY', yorick:'TRICKY',
    riven:'TRICKY', renekton:'TRICKY', yasuo:'TRICKY', yone:'TRICKY', tryndamere:'TRICKY', wukong:'TRICKY',
    warwick:'TRICKY', gragas:'EVEN', pantheon:'TRICKY', kled:'TRICKY', zaahen:'TRICKY',
    teemo:'HARD', quinn:'HARD', vayne:'HARD', kayle:'TRICKY', kassadin:'FAVOURED', singed:'EVEN', galio:'EVEN', heimerdinger:'HARD' },
  vs:{
    jugg:{
      tldr:"He out-trades you flat — give early respect, stun-trade only, and out-teamfight him from 6 on.",
      breakdown:"You cannot brawl a juggernaut with jungle stats, so don't: last-hit, absorb with W on the wave, and only exchange through a full Permafrost chain. Your game starts when the river fights do.",
      dos:["Trade only through full Permafrost chains","Use Q to leave fights, not enter them, pre-6","Call your jungler — your CC chain IS the gank"],
      donts:["Take extended trades into {K}","Burn Q for damage with no exit plan","Pick fights before your first tank item"],
      win:"Survive the lane, land R chains, and win the map in teamfights."
    },
    diver:{
      tldr:"His dueling stats bully your lane phase — concede the 1v1 and make every gank a guaranteed kill.",
      breakdown:"He wins the straight fight at almost every stage, so play for the chain: Permafrost his engage when he dives, Q out when {K} is loaded, and turn jungle attention into kills only your CC can deliver.",
      dos:["Permafrost his engage and walk away","Keep Q strictly as the exit","Turn every gank into a guaranteed CC chain"],
      donts:["Duel him on even HP","Get baited past the wave","Trade while {K} is up"],
      win:"Give the 1v1, take the map — your CC chain wins every 2v2."
    },
    tank:{
      tldr:"Tank mirror — nobody dies; win the wave, the plates, and the first river fight.",
      breakdown:"Neither of you has lane kill threat, so the matchup is map play: shove with W, hit plates, and arrive at scuttle fights first. Your R is the better teamfight button — bank it for picks.",
      dos:["Shove with W and contest plates","Rotate to river fights first","Bank R for multi-man picks"],
      donts:["Wail on a tank for nothing","Miss CS to force dead trades","Let him roam while you watch a frozen wave"],
      win:"Out-rotate him — your R chain decides the fights that matter."
    },
    ranged:{
      tldr:"Poke lane — absorb with Doran's Shield + Second Wind, then punish one overstep with the full chain.",
      breakdown:"He chips you for free until you're 3, so take the sustain package and farm. The moment he oversteps with {K} down, Q-W-Permafrost erases half his HP and sets up your jungler forever.",
      dos:["Absorb poke with sustain runes and last-hit","Q-W-E trade the instant he oversteps","Hold R for ganks rather than lane flips"],
      donts:["Bleed HP contesting every CS","Q into a ready {K}","Coin-flip the lane when teamfights are your win condition"],
      win:"Survive the poke, punish one mistake, and carry the mid game with R."
    }
  },
  mirror:{
    tldr:"Boar mirror — nobody wins lane; the better R at the first objective decides everything.",
    breakdown:"Two unkillable teamfight tanks farming at each other. Take the wave lead, arrive at river first, and land the multi-man Glacial Prison before she does.",
    dos:["Win the CS and plate war","Rotate to fights first","Save R for two-plus targets"],
    donts:["Force dead 1v1 trades","Burn Q into her Frost chain","R a single tank"],
    win:"Better rotations and the better Glacial Prison.",
    winS:"Her dash is down — she can't escape the chain."
  },
  winS:"No answer up — chain the stun and call the gank.",
  tradeGood:"Q onto his step-up, double W flail for Frost stacks, Permafrost stun, finish the second W arc, and walk before his pattern restarts.",
  tradeBad:"Q-engaging a full-HP laner pre-6 with no jungler nearby — you trade your only exit for a stun nothing follows up.",
  waveBest:"a wave that crashes into your tower then resets — you farm safe, absorb poke, and your jungler arrives to a loaded CC chain.",
  waveWorst:"a slow push toward him while {K} is up — you're exposed in the open with no exit and no kill threat.",
  early:"Concede the early lane with grace: W the wave, last-hit, and bank your full Q-W-E chain for his oversteps. You're playing for level 6 and the river.",
  mid:"From 6, every gank you receive is a kill and every river fight is yours to start — land Permafrost or R on two people and the map snowballs.",
  late:"You're the engage button: R the carry, Permafrost the peel, and let your team play cleanup. Lane gold stopped mattering an hour ago.",
  safetyTool:"Q dash",
  spikesLine:"Level 6 Glacial Prison and your first tank item are the spikes — before them you survive, after them you dictate.",
  carryLine:"Carry by landing multi-man R chains at objectives — one good Glacial Prison is worth more than ten lane kills.",
  behindShort:"absorb, farm, and remember your R doesn't scale off gold.",
  loadingRule:"Trade only through full Permafrost chains.",
  dontDetail:"Q is your only exit — spending it for damage leaves you stranded in jungle-gank range.",
  aheadTpl:"Ahead, force the map: shove with W, invade with your jungler, and turn every river skirmish into a 2v2 your CC chain wins. Zone {E} off the wave with stun threat.",
  behindTpl:"Behind barely matters — keep farming, keep absorbing, and land one multi-man Glacial Prison at the next objective. Your R doesn't read the gold ledger.",
  spikeName:"first tank item",
  runeReport:"Grasp of the Undying, Demolish, Second Wind, Overgrowth; secondary Inspiration — Biscuits + Cosmic Insight. Grasp procs on the W arcs keep you in lane.",
  summReport:"Flash + Teleport — you have no business taking fights that Ignite would decide. TP to objectives is your carry tool.",
  itemReport:"Start Doran's Shield + pots. First: Sunfire Aegis into Plated Steelcaps or Mercs; then Thornmail or Kaenic Rookern by damage type.",
  jungleLine:"You are the gank magnet — every visit converts to a kill through Q-E-R chains. Hover your stun for the jungler's arrival, not before.",
  redditLine:"give up the 1v1 fantasy — Permafrost trades, R at objectives, and jungle synergy are the whole champion top side.",
  load:{
    sub:"r/SejuaniMains",
    start:"Doran's Shield + 1 Health Potion",
    normalBack:"Bami's Cinder (≈900g) — wave control online",
    antihealBack:"Bramble Vest (≈800g) — cuts his healing",
    antihealNote:"Bramble Vest early into his sustain.",
    firstItem:"Sunfire Aegis",
    secondItem:"Thornmail / Kaenic Rookern (by damage type)",
    boots:"Plated Steelcaps",
    bootsVsAP:"Mercury's Treads",
    bootsVsAD:"Plated Steelcaps",
    spike:"Full Sunfire + Steelcaps — you stop losing the trades your stun starts.",
    runes:{ keystone:"Grasp of the Undying", primaryTree:"Resolve", primary:["Demolish","Second Wind","Overgrowth"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Health","Health"] }
  },
  specials:{
    kassadin:{ tldr:"The one lane you bully — he's melee, shieldless against your damage type, and allergic to your level-3 chain." },
    vayne:{ tldr:"She shreds tank stats with Silver Bolts — survive lane, then never fight her without your team's follow-up." }
  }
},

// ============================== RYZE ==============================
{
  key:'ryze', name:'Ryze',
  curve:[-0.6,-0.3,0,0.2,0.4,0.7,1.2],
  lvl:[
    "Q poke only — farm, respect everything, and bank Manaflow stacks. You're buying time, not fighting.",
    "W root threatens jungle follow-up, but it's also your kite tool — spending it greedily is how you die.",
    "Full kit: E-Flux into W root into Q chain is your trade. Fluxed minions make the wave itself your weapon.",
    "Phase Rush turns his engage into your trade window — combo, proc the speed, and walk away untouched.",
    "Realm Warp opens flanks and escapes, and your EQ DPS now duels most tops on their cooldown gaps.",
    "Rod of Ages ends the HP problem — your short trades become favourable on raw math.",
    "Seraph's online — you out-DPS and out-tank everyone in extended fights. Side-lane and Warp to every fight."
  ],
  diffBase:{ jugg:'EVEN', diver:'HARD', tank:'FAVOURED', ranged:'EVEN' },
  diffEx:{ darius:'TRICKY', garen:'TRICKY', illaoi:'TRICKY', sett:'TRICKY', renekton:'HARD', irelia:'HARD', yasuo:'HARD',
    yone:'TRICKY', fiora:'HARD', jax:'TRICKY', riven:'TRICKY', gragas:'EVEN', warwick:'TRICKY', tryndamere:'TRICKY',
    vayne:'TRICKY', gwen:'TRICKY', wukong:'TRICKY', kled:'TRICKY', ksante:'EVEN', poppy:'EVEN',
    teemo:'TRICKY', akali:'HARD', kassadin:'EVEN', heimerdinger:'TRICKY', lucian:'TRICKY', akshan:'TRICKY',
    graves:'TRICKY', quinn:'TRICKY', kayle:'EVEN', sylas:'TRICKY' },
  vs:{
    jugg:{
      tldr:"Kite the brawler — Phase Rush makes his engage a free trade for you if you dodge {K}.",
      breakdown:"He needs to touch you; you need him to try. E the wave, root the step-up, and Q-kite with Phase Rush every time he walks at you. The lane flips permanently at Rod of Ages.",
      dos:["E-Flux the wave so roots chain off minions","Combo + Phase Rush away when he steps up","Scale to ROA — the lane flips there"],
      donts:["Stand still spamming Q into {K} range","Spend W as poke instead of insurance","Fight at his item spikes before yours"],
      win:"Kite his engages and out-scale him by the first item."
    },
    diver:{
      tldr:"His dash beats your root if you're greedy — hold W for the engage and farm to your spikes.",
      breakdown:"This is the lane where Ryze suffers: he closes gaps faster than you re-root. Hold W strictly for {K}, take Second Wind trades, and accept that your win condition is the 25-minute version of you.",
      dos:["Hold W root strictly for his engage","Farm with E-Q through the wave","Call ganks — your root is reliable setup"],
      donts:["Walk up with W on cooldown","Burn Phase Rush on the way in instead of out","Fight before Rod of Ages on his terms"],
      win:"Survive the dives, hit your item spikes, and out-scale brutally."
    },
    tank:{
      tldr:"Your EQ shreds tanks — farm, poke, and out-scale a lane that can't ever kill you.",
      breakdown:"He has no kill threat and you have permanent Flux poke. Chain E-Q on him and the wave together, take free plates, and Warp for your team before he finishes a single item that matters.",
      dos:["Poke E-Q through the wave for free","Take plates while he farms passively","Open the map early with Realm Warp"],
      donts:["Mana-dump on a full-HP tank","Eat {K} for free in a lane you own","Stay top when Warp wins fights elsewhere"],
      win:"Free farm, free poke, and a Warp flank he can't answer."
    },
    ranged:{
      tldr:"Trade rotations, not autos — your EQ out-damages his poke if you land Flux chains.",
      breakdown:"You lose the auto-attack war and win the rotation war. E first so the root chains, take Second Wind, and grind him down with Q math — your mid-game DPS embarrasses his.",
      dos:["Lead with E so W and Q chain through the wave","Trade full rotations on {K}'s cooldown","Stack Manaflow on his step-ups"],
      donts:["Auto-trade at his range","Walk up without Flux loaded","Ignore the scaling — you win at two items"],
      win:"Land rooted rotations and out-scale every trade by mid game."
    }
  },
  mirror:{
    tldr:"Rune mage mirror — whoever lands the cleaner Flux chains and times Phase Rush better wins.",
    breakdown:"Identical math: the Ryze who keeps Flux on the wave, roots second (counter-root wins), and banks more Manaflow ends up the real one. ROA timing is the whole game.",
    dos:["Counter-root rather than first-root","Keep Flux loaded on the wave","Race the ROA timing"],
    donts:["Trade with Flux down","Burn Phase Rush for nothing","Fall behind on farm"],
    win:"Cleaner chains and the earlier Rod of Ages.",
    winS:"His root is down — chain yours now."
  },
  winS:"His engage is down — root and unload the chain.",
  tradeGood:"E-Flux the minion next to him, W root through the wave, Q twice as Phase Rush procs, and walk out of his answer with the speed boost.",
  tradeBad:"Spamming Q in the open with W down — every dash and engage in the game punishes a rooted-out-of-roots Ryze.",
  waveBest:"a controlled slow push — Fluxed waves are ammunition, and the crash sets up your recall on perfect ROA timing.",
  waveWorst:"frozen near his tower while {K} is up — you're farming inside his engage range with no minions to chain roots off.",
  early:"Survive and stack: Manaflow, Tear, and CS. Trade only with full rotations through Fluxed minions, and treat {K} as the only thing that can kill you.",
  mid:"Rod of Ages flips the lane — your rotations now win on raw math. Look for Realm Warp flanks the moment your team groups mid.",
  late:"Seraph's Ryze is a side-lane monster: shove, Warp to fights, and melt frontlines with EQ spam. You out-scale virtually everyone you laned against.",
  safetyTool:"W root",
  spikesLine:"Rod of Ages, then Seraph's — the two-item Ryze is a different champion from the laning one. Level 6 adds Warp map pressure.",
  carryLine:"Carry through scaling inevitability — perfect CS plus Warp flanks turns even lanes into won games by 25 minutes.",
  behindShort:"farm with E-Q, stack Tear, and let the item curve rescue you.",
  loadingRule:"Full rotations through Fluxed minions only.",
  dontDetail:"W is your anti-dive insurance — spending it on poke invites every engage in his kit.",
  aheadTpl:"Ahead, become inevitable: shove with EQ, deny {E} the wave, and Warp to every skirmish — your rotations win 2v2s that look unwinnable.",
  behindTpl:"Behind, Ryze barely notices — farm safely, finish Tear and ROA on schedule, and rejoin the game at two items as the best scaler in it.",
  spikeName:"Rod of Ages",
  runeReport:"Phase Rush, Manaflow Band, Transcendence, Scorch; secondary Resolve — Second Wind + Bone Plating into bullies. Phase Rush is your entire kiting game.",
  summReport:"Flash + Teleport, always — TP doubles down on your scaling identity and Warp already covers the map play Ignite would buy.",
  itemReport:"Start Doran's Ring + 2 pots, Tear on first back. Rod of Ages into Sorcerer's Shoes or Mercs, then Seraph's Embrace and Cosmic Drive.",
  jungleLine:"Your W is the most reliable root setup in top lane — hold it as your jungler paths in. Post-6, Warp turns his ganks into 3-man dives.",
  redditLine:"stack Tear, kite with Phase Rush, and stop fighting before Rod of Ages — laning Ryze is the tax you pay for the two-item monster.",
  load:{
    sub:"r/RyzeMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Tear of the Goddess + Dark Seal (≈800g)",
    antihealBack:"Tear + Oblivion Orb path — cuts his healing",
    antihealNote:"Slot Oblivion Orb into the ROA path vs his sustain.",
    firstItem:"Rod of Ages",
    secondItem:"Seraph's Embrace",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Mercury's Treads",
    bootsVsAD:"Plated Steelcaps / Sorcerer's Shoes",
    spike:"Seraph's second — extended fights stop being losable.",
    runes:{ keystone:"Phase Rush", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Resolve", secondary:["Second Wind","Bone Plating"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    fiora:{ tldr:"Riposte eats your root and her dashes dodge Q — the classic Ryze nightmare. Farm, don't feed, pray for 2 items." },
    nasus:{ tldr:"Scaling war you win — Phase Rush ignores Wither's threat and your EQ out-damages his stacks at every spike." }
  }
},

// ============================== NEEKO ==============================
{
  key:'neeko', name:'Neeko',
  curve:[0.4,0.4,0.5,0.4,0.7,0.5,0],
  lvl:[
    "Open disguised as something harmless — the first Q trade lands while {E} is still reading the wave.",
    "W clone sells fake recalls and fake engages — send it at him and take the real trade from the other angle.",
    "Full kit: E root through a minion into double-bloom Q is your core chunk. The root stretches longer through targets.",
    "Trade Q on his CS timings and hold E for the step-up. The disguise resets every bad position you take.",
    "Pop Blossom online — your all-in is a setup puzzle: E root, walk in as a clone or minion, R the panic.",
    "Stormsurge spike — a rooted target now loses half their HP to one rotation.",
    "You're the teamfight flank now: disguise, walk into the clump, and R three people. Lane leads become fight wins."
  ],
  diffBase:{ jugg:'FAVOURED', diver:'TRICKY', tank:'FAVOURED', ranged:'EVEN' },
  diffEx:{ darius:'EVEN', garen:'EVEN', urgot:'EVEN', irelia:'HARD', yasuo:'HARD', yone:'HARD', camille:'HARD',
    ambessa:'HARD', akali:'HARD', sylas:'HARD', olaf:'TRICKY', ksante:'EVEN', poppy:'EVEN', maokai:'EVEN',
    nautilus:'EVEN', zac:'TRICKY', kassadin:'FAVOURED', vladimir:'EVEN', heimerdinger:'EVEN', cassiopeia:'TRICKY',
    lucian:'TRICKY', graves:'TRICKY', akshan:'TRICKY', quinn:'TRICKY', galio:'TRICKY', mel:'TRICKY' },
  vs:{
    jugg:{
      tldr:"He has to wade through roots and blooms to farm — chunk every step-up and never get touched.",
      breakdown:"Your E root through the wave hits him exactly where he must stand to CS. Poke Q liberally, save E for {K}, and remember: the disguise means he can never be sure which Neeko is real.",
      dos:["Root through minions onto his CS position","Poke Q on every last-hit window","Save E to interrupt {K}"],
      donts:["Walk inside {K} range with E down","Waste the root on poke when his engage is up","Burn R on one tanky target"],
      win:"Root the step-ups and chip him out of his own lane."
    },
    diver:{
      tldr:"His mobility dodges your root — bait the dash with a clone, then land E on the landing spot.",
      breakdown:"Straight root attempts whiff into his dashes, so cheat: send the W clone as bait, hold E for the end of {K}, and keep R as the anti-dive panic button he has to respect.",
      dos:["Bait his dash with the W clone first","Root the landing spot of {K}","Keep R as the anti-dive answer"],
      donts:["Throw E at a champion with dashes loaded","Trade inside his engage range with E down","Panic-R before his burst commits"],
      win:"Bait the dash, root the landing, and counter-burst the dive."
    },
    tank:{
      tldr:"Free poke lane — root-Q every CS attempt and save your R for the river, not the raid boss.",
      breakdown:"He can't threaten you and your root-bloom combo taxes every minion he wants. Build your lead through plates and tempo, and spend Pop Blossom where it hits two-plus targets.",
      dos:["Tax every CS with Q blooms","Shove and rotate to river fights","Hold R for multi-man fights"],
      donts:["Dump rotations into a full-HP tank","Get hit by {K} in a lane you own","Stay top when your flank wins fights elsewhere"],
      win:"Bully the farm phase and out-rotate him with disguise roams."
    },
    ranged:{
      tldr:"Poke war with a twist — your clone and disguise create trades he literally cannot read.",
      breakdown:"Even ranged trades favour the one with information, and you control all of it: fake retreats, clone sidesteps, disguised angle changes. Land E through a minion and the full combo follows free.",
      dos:["Trade right after he commits {K}","Use the clone to eat his key skillshot","Root through minions for safe engages"],
      donts:["Take extended auto wars at his range","Stand in the open with E down","Show the real Neeko on cooldown gaps"],
      win:"Win the information war — every fake creates a free rotation."
    }
  },
  mirror:{
    tldr:"Chameleon mirror — the Neeko who reads clones better lands the real root first.",
    breakdown:"Both of you are lying constantly. Watch for missing passive swaps, root the real one through the wave, and hold R until her clone tricks are spent.",
    dos:["Track which one is real","Counter-root after her E whiffs","Hold R for the real all-in"],
    donts:["Burst the clone","Trade with E down","R into her ready R"],
    win:"Read the fakes better and root the real one.",
    winS:"Her root is down — the real one is exposed."
  },
  winS:"No answer left — root him and unload.",
  tradeGood:"Root through the minion he's last-hitting, double-bloom Q on the rooted target, weave one auto, and fade back behind the wave before his counter lands.",
  tradeBad:"Throwing E at a mobile champion in the open and walking forward anyway — you've spent your only CC and the all-in math just flipped.",
  waveBest:"a slow push you tax with Q blooms — he farms inside your root line and your jungler arrives to a loaded E.",
  waveWorst:"crashed into his tower with your E down — no root, no disguise angle, and every engage in his kit is live.",
  early:"Open with information warfare: disguise cheese at level 1, clone fakes at 2, and root-bloom trades on every CS he takes from level 3.",
  mid:"At 6 you're a kill lane and a roam threat at once — shove, disguise, and walk down mid for flanks nobody wards against.",
  late:"One good Pop Blossom wins the fight: flank disguised, walk into the clump, and R when their cooldowns commit. Your root peels whatever survives.",
  safetyTool:"W clone + disguise",
  spikesLine:"Level 6 Pop Blossom and Stormsurge are the spikes — root-into-rotation deletes squishies from then on.",
  carryLine:"Carry through flanks: a disguised Neeko reaching the backline forces three summoner spells minimum.",
  behindShort:"farm with Q through the wave and stay a flank threat — Pop Blossom doesn't read the gold ledger.",
  loadingRule:"Root through minions — never in the open.",
  dontDetail:"E is your only CC and your only setup — whiffing it into a dash means no combo and no escape for ten seconds.",
  aheadTpl:"Ahead, weaponize the lies — shove, roam disguised, and force {E} to play scared of every minion in his wave. Convert with multi-man R flanks.",
  behindTpl:"Behind, stay patient: farm at range with Q, hold E for survival, and remember one disguised flank with R can flip any fight after 6.",
  spikeName:"Stormsurge",
  runeReport:"Arcane Comet, Manaflow Band, Transcendence, Scorch; secondary Resolve — Second Wind + Overgrowth into melee. Comet follows every root automatically.",
  summReport:"Flash + Teleport standard; Ignite into squishy or dive-prone lanes where the level-6 root-R combo executes outright.",
  itemReport:"Start Doran's Ring + 2 pots. First: Stormsurge into Sorcerer's Shoes; then Shadowflame and Zhonya's into dive.",
  jungleLine:"E through the wave is premium gank setup, and your clone fakes river entries — ping in your jungler whenever {E} pushes past the midline.",
  redditLine:"root through minions, lie constantly with W, and treat R as a flank weapon — Neeko top wins lanes with information, not stats.",
  load:{
    sub:"r/NeekoMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Fated Ashes + refill pot (≈1000g)",
    antihealBack:"Oblivion Orb (≈800g) — cuts his healing",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Stormsurge",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Zhonya's third — R flanks stop being suicide missions.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Resolve", secondary:["Second Wind","Overgrowth"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall blocks Q and E both — trade only after it's burned, and root the end of his dash chain." },
    kassadin:{ tldr:"Shieldless melee mage — root him off every CS pre-6 and end the lane before Riftwalk exists." }
  }
}
];

// MatchupCoach — generator configs batch 3: Karma, Graves, Cassiopeia, Akshan.
window.GEN_CFGS_3 = [

// ============================== KARMA ==============================
{
  key:'karma', name:'Karma',
  curve:[0.9,0.7,0.6,0.5,0.3,0.3,-0.4],
  lvl:[
    "Q poke at level 1 is among the best in the game — chunk {E} on every last-hit and start the Mantra economy.",
    "W tether threatens the root — anyone who steps to you early eats Q-W and donates the trade.",
    "Full kit: E shield-speed makes you untouchable in short trades. Mantra-Q (RQ) on cooldown gaps is a third of his HP.",
    "Spam the RQ slow-field on his farming spots and keep your shield for {K} — the lane is a toll booth and you own it.",
    "No new ultimate at 6 — your Mantra has been online since level 1. His spike is the danger window: respect it.",
    "First item amplifies the RQ chunk — keep him under 60% and the lane stays yours by default.",
    "You drift toward utility now — peel, shield, and speed your carries while the RQ poke softens objectives."
  ],
  diffBase:{ jugg:'FAVOURED', diver:'HARD', tank:'FAVOURED', ranged:'EVEN' },
  diffEx:{ darius:'EVEN', garen:'EVEN', urgot:'EVEN', riven:'TRICKY', renekton:'TRICKY', warwick:'EVEN',
    gragas:'EVEN', vayne:'TRICKY', olaf:'TRICKY', tryndamere:'TRICKY', yasuo:'HARD', irelia:'HARD',
    akali:'HARD', sylas:'HARD', kassadin:'FAVOURED', teemo:'EVEN', heimerdinger:'EVEN', zac:'TRICKY',
    ksante:'EVEN', poppy:'EVEN', maokai:'EVEN', nautilus:'EVEN', galio:'TRICKY', lucian:'TRICKY',
    graves:'TRICKY', akshan:'TRICKY', quinn:'TRICKY', cassiopeia:'TRICKY', mel:'TRICKY' },
  vs:{
    jugg:{
      tldr:"A toll booth he can't afford — RQ every step-up and tether the one chase he tries.",
      breakdown:"Your Q out-ranges everything he does and the RQ slow-field makes his farm spots radioactive. Hold E's shield for {K}, and if he ever commits, W-root turns his engage into a kill for your jungler.",
      dos:["RQ his last-hit positions on cooldown","Hold E shield-speed for {K}","Tether-root the overcommit"],
      donts:["Stand inside {K} range with E down","Spend Mantra on the wave when he can answer","Let him freeze the lane on his side"],
      win:"Poke him off the wave and root the one mistake he makes."
    },
    diver:{
      tldr:"His dash beats your poke rhythm — shield the engage, root the exit, and respect the all-in windows.",
      breakdown:"You can't out-trade a committed diver, so make commitment expensive: E yourself the moment {K} starts, W the landing so the root threatens, and RQ him as he disengages. Farm safe when his kit is loaded.",
      dos:["Shield yourself the instant {K} starts","W-tether the dive so the root lands","RQ the disengage window"],
      donts:["Poke inside his engage range with E down","Burn Mantra on waveclear when he has kill pressure","Trade flat at his item spikes"],
      win:"Tax the approach, survive the dive, and grind him down between windows."
    },
    tank:{
      tldr:"Free poke forever — he farms at half HP and your real job is exporting Mantra to the river.",
      breakdown:"He can't kill you and can't out-sustain mantra'd Q math. Chip every CS, take plates with your speed, and arrive at every skirmish with RQ + shields your team doesn't expect.",
      dos:["RQ-chip every CS he takes","Take plates behind your E speed","Rotate to river fights with Mantra up"],
      donts:["Mantra a full-HP tank for nothing","Eat {K} for free in a won lane","Stay top when your shields win fights elsewhere"],
      win:"Poke him irrelevant and out-rotate the map."
    },
    ranged:{
      tldr:"Poke war on your terms — RQ out-trades any single spell, and your shield erases his answer.",
      breakdown:"You have the better poke rotation and the only defensive button in the lane. Trade Q for Q and you win on Mantra math; the only loss condition is eating {K} during your cooldown gaps.",
      dos:["Win every Q-for-Q exchange with Mantra","E through his poke before stepping up","W-root when he oversteps for harass"],
      donts:["Trade while RQ and E are both down","Get hit by {K} chasing chip damage","Push without vision past river"],
      win:"Out-poke the poker and shield the difference."
    }
  },
  mirror:{
    tldr:"Mantra mirror — whoever spends RQ smarter and shields the other's burst wins the chip war.",
    breakdown:"Identical toolkits, one ledger: trade RQ only when hers is down, shield her Mantra burst, and never let the tether complete on you.",
    dos:["Trade RQ into her cooldown","Shield her Mantra, not her chip","Break her tether early"],
    donts:["Match Mantras blindly","Eat the full tether root","Lose the mana war"],
    win:"Smarter Mantra economy wins.",
    winS:"Her Mantra is down — yours isn't. Chunk her."
  },
  winS:"His answer is down — RQ and step up.",
  tradeGood:"RQ his farming spot, walk forward behind the slow-field so the W tether threatens, take one auto, and E away before his answer comes off cooldown.",
  tradeBad:"Standing in {K} range with E already spent on poke — your only defensive layer is gone and the full engage lands on a squishy enchanter.",
  waveBest:"a slow push you tax from range — every CS he takes costs HP and your Mantra economy compounds.",
  waveWorst:"frozen near his tower with your E down — you can't poke safely and one engage ends you.",
  early:"Open the toll booth: Q every last-hit, RQ the cooldown gaps, and hold E strictly for {K}. The lane is yours until he spikes.",
  mid:"Keep him under 60% with RQ and rotate hard — your shields and speed turn every river skirmish, and plates fall fast behind your poke.",
  late:"Transition to the team: RE speed-ups, big shields on your carry, and RQ zone-poke before objectives. You win fights you never enter.",
  safetyTool:"E shield",
  spikesLine:"Mantra is online from level 1 — your spikes are component items; his are levels. Win big early or drift to utility.",
  carryLine:"Carry through tempo — a Karma lane lead converts to plates, roams, and a mid game where your team moves 20% faster.",
  behindShort:"poke from max range and shield the engages — your utility never falls off.",
  loadingRule:"Hold the shield for his engage, always.",
  dontDetail:"E is your only defensive button — spending it on poke speed leaves you naked to the full engage.",
  aheadTpl:"Ahead, squeeze: RQ {E} off every wave, take plates with your speed, and roam mid with shields the enemy never sees coming.",
  behindTpl:"Behind, you're still useful — farm safe, shield the dives, and convert to full utility; a behind Karma still wins teamfights with RE + shields.",
  spikeName:"first item",
  runeReport:"Arcane Comet, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight. Comet rides every RQ slow-field.",
  summReport:"Flash + Teleport — you bully lanes but win maps; TP keeps the toll booth open after every back.",
  itemReport:"Start Doran's Ring + 2 pots. First: Malignance or Blackfire Torch into Sorcs; then Cosmic Drive / Zhonya's by threat.",
  jungleLine:"W-root plus RQ slow is gank setup most junglers dream about — ping in anything with legs when {E} pushes past the midline.",
  redditLine:"RQ the farming spots, hold E for the engage, and stop fighting at his spikes — Karma top is a tax collector, not a duelist.",
  load:{
    sub:"r/KarmaMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — Mantra economy secured",
    antihealBack:"Oblivion Orb (≈800g) — cuts his healing",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Malignance / Blackfire Torch",
    secondItem:"Cosmic Drive",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Zhonya's third — dive comps stop having a Karma answer.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall blocks Q, RQ, and W's tether — poke only when it's down and shield his dash-ins; this lane is his to lose." },
    kassadin:{ tldr:"Shieldless melee mage — RQ him off every CS pre-6 and bank a lane lead before Riftwalk exists." }
  }
},

// ============================== GRAVES ==============================
{
  key:'graves', name:'Graves',
  curve:[0.7,0.7,0.7,0.5,0.3,0.6,0],
  lvl:[
    "Four shells of buckshot win any level-1 face-off — trade autos point-blank where every pellet lands.",
    "E online — dash-reload weaving starts: auto, E for the grit armor and reset, auto again. Most champs lose this flat.",
    "Full kit: Q's wall-bounce return is your real damage — fight near terrain so both hits connect.",
    "Trade in shell rhythm: two autos and out. Track {K}; your armor stacks from E make his short trades unprofitable.",
    "Collateral Damage adds an execute and a disengage knockback in one — hold it for either, never for chip.",
    "First item spike — the point-blank Q-AA-E-AA pattern now removes half bars. Force fights near walls.",
    "You out-skirmish but the crit scalers pass you — convert to picks with smoke-screen blinds and R snipes."
  ],
  diffBase:{ jugg:'FAVOURED', diver:'EVEN', tank:'TRICKY', ranged:'EVEN' },
  diffEx:{ darius:'EVEN', garen:'EVEN', sett:'EVEN', urgot:'EVEN', irelia:'TRICKY', fiora:'TRICKY', jax:'HARD',
    yasuo:'TRICKY', yone:'TRICKY', camille:'TRICKY', gwen:'TRICKY', olaf:'EVEN', warwick:'EVEN',
    malphite:'HARD', poppy:'TRICKY', ornn:'TRICKY', sion:'EVEN', chogath:'EVEN', maokai:'EVEN', nautilus:'EVEN',
    zac:'EVEN', sejuani:'EVEN', galio:'FAVOURED', shen:'TRICKY', tahmkench:'TRICKY', ksante:'TRICKY',
    teemo:'TRICKY', quinn:'EVEN', heimerdinger:'TRICKY', kennen:'TRICKY', vladimir:'EVEN', kayle:'FAVOURED',
    kassadin:'FAVOURED', lucian:'EVEN', akshan:'EVEN', cassiopeia:'TRICKY', mel:'TRICKY', akali:'TRICKY', sylas:'EVEN' },
  vs:{
    jugg:{
      tldr:"Buckshot the brawler — point-blank shells hurt more than his trades and your E resets the spacing.",
      breakdown:"You out-damage him up close, which no juggernaut expects from a ranged top. Q against walls for the double hit, E sideways from {K}, and reload behind the wave before his pattern resets.",
      dos:["Take point-blank trades where all pellets land","Q against terrain for the return hit","E sideways out of {K}, never backwards"],
      donts:["Trade at half-range where pellets scatter","Burn E before his engage commits","Forget to reload before stepping up"],
      win:"Out-brawl the brawler with shells and dash discipline."
    },
    diver:{
      tldr:"He wants the same close-range brawl — your E grit-armor decides who actually wins it.",
      breakdown:"This is a real skirmish: his {K} versus your dash-reload weave. Keep two shells loaded before every exchange, E the moment his engage commits for the armor stacks, and R-knockback the second wind he counts on.",
      dos:["Keep two shells chambered before trades","E into his engage for the grit armor","Hold R as the disengage knockback"],
      donts:["Get caught mid-reload","Burn E for damage with {K} loaded","Extend trades past your shell count"],
      win:"Win the armor-stack math and deny his extended pattern."
    },
    tank:{
      tldr:"He stacks exactly the stat that blanks you — chip early, then stop donating shells to armor.",
      breakdown:"Pre-armor he's just a slow target; post-armor your pellets bounce off. Bully levels 1-5 hard, take plates, then convert to roams and R picks rather than sieging a wall that out-scales your buckshot.",
      dos:["Bully hard before his armor items","Take plates and leave on time","Use smoke + R for picks elsewhere"],
      donts:["Fight a finished Thornmail head-on","Eat {K} for free in a chip lane","Stay top past the second armor item"],
      win:"Cash the early window and export the lead before armor math wins."
    },
    ranged:{
      tldr:"He pokes at range where your pellets scatter — close behind smoke and win the point-blank exchange.",
      breakdown:"At max range you lose the poke war; at zero range you delete him. Use W's smoke to break his targeting, E in behind it when {K} is down, and unload the full shell pattern before he can reset.",
      dos:["Close the gap behind W smoke","E in only when {K} is down","Unload point-blank where all pellets hit"],
      donts:["Trade scattered pellets at his range","Walk up mid-reload","Burn R on chip instead of executes"],
      win:"Erase the range difference with smoke and win every close exchange."
    }
  },
  mirror:{
    tldr:"Shotgun mirror — whoever keeps shells loaded and lands the wall-bounce Q wins the draw.",
    breakdown:"Same gun, same rules: count his shells, fight when yours are full and his aren't, and use smoke to break his pattern mid-exchange.",
    dos:["Count his shells like cooldowns","Fight full-chamber vs empty","Smoke his reset windows"],
    donts:["Brawl mid-reload","Eat the double Q hit","Waste R while he holds his"],
    win:"Better shell discipline wins the draw.",
    winS:"He's reloading — you're not. Draw."
  },
  winS:"His answer is down — close and unload.",
  tradeGood:"Q against the wall so both hits land, step in for two point-blank autos, E sideways for the grit armor, and finish the string before he answers — then reload behind the wave.",
  tradeBad:"Getting caught mid-reload at half-range — scattered pellets, no dash, and his full pattern lands on a marksman with no exit.",
  waveBest:"a wave held near the middle — you can threaten point-blank trades and smoke-escape ganks in either direction.",
  waveWorst:"crashed into his tower with E down — no grit armor, no escape, and every engage in his kit is live.",
  early:"Bully with buckshot: point-blank trades on every CS, Q off walls for the bounce, and the E-weave that makes short trades unprofitable for him.",
  mid:"Snowball the skirmishes — your 2v2 with smoke + knockback is elite. Take plates, then start R-sniping low-HP recalls across walls.",
  late:"Play assassin-marksman: smoke their engage, E through fights for armor, and save R as either the execute or the peel knockback. Crit carries out-DPS you — picks don't care.",
  safetyTool:"E dash",
  spikesLine:"Levels 1-3 and your first item are the spikes — the shell-weave pattern peaks before crit scalers come online.",
  carryLine:"Carry through skirmish math — Graves with E loaded wins almost every river 2v2 before 25 minutes.",
  behindShort:"farm with Q wall-bounces and play for smoke picks — your burst stays relevant at even items.",
  loadingRule:"Two shells chambered before every trade.",
  dontDetail:"The reload is your hidden cooldown — stepping up on an empty chamber is stepping up unarmed.",
  aheadTpl:"Ahead, hunt: point-blank {E} off every wave, smoke his jungler's ganks into farce, and R-snipe the recalls. Plates fund the snowball.",
  behindTpl:"Behind, fight only at full chamber near walls — the Q bounce plus grit armor keeps you skirmish-relevant at any deficit.",
  spikeName:"first item",
  runeReport:"Fleet Footwork, Triumph, Legend: Alacrity, Coup de Grace; secondary Resolve — Second Wind + Bone Plating. Fleet smooths the reload windows.",
  summReport:"Flash + Teleport standard; Ghost into immobile lanes turns every point-blank trade into a run-down.",
  itemReport:"Start Doran's Blade + pot. First: Eclipse or Hubris into Berserker's or Steelcaps; then The Collector / Serylda's into armor.",
  jungleLine:"Your W smoke blinds tower dives and breaks gank pathing — drop it on arrival and turn their 2v1 into a coin flip you win.",
  redditLine:"all pellets or no trade — fight point-blank near walls, count the reload, and convert the early skirmish lead into picks.",
  load:{
    sub:"r/GravesMains",
    start:"Doran's Blade + 1 Health Potion",
    normalBack:"Serrated Dirk (≈1100g) — lethality spike",
    antihealBack:"Executioner's Calling (≈800g) — cuts his healing",
    antihealNote:"Executioner's Calling early into his sustain.",
    firstItem:"Eclipse / Hubris",
    secondItem:"The Collector",
    boots:"Plated Steelcaps",
    bootsVsAP:"Mercury's Treads",
    bootsVsAD:"Plated Steelcaps",
    spike:"Serylda's third — armor stackers stop being walls.",
    runes:{ keystone:"Fleet Footwork", primaryTree:"Precision", primary:["Triumph","Legend: Alacrity","Coup de Grace"], tree:"Resolve", secondary:["Second Wind","Bone Plating"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    malphite:{ tldr:"He stacks armor and your whole kit is physical — win levels 1-5 or accept a farm lane; never fight a finished Thornmail." },
    jax:{ tldr:"Counter Strike dodges every pellet — your entire kit — for two seconds. Trade strictly while his E is down or lose the exchange wholesale." },
    teemo:{ tldr:"The blind blanks your autos but not your Q — fight in Q-bounce range when his dart is down and smoke his kiting angles." }
  }
},

// ============================== CASSIOPEIA ==============================
{
  key:'cassiopeia', name:'Cassiopeia',
  curve:[0.2,0.3,0.6,0.6,0.8,0.8,0.6],
  lvl:[
    "Q poke on his last-hits starts the poison economy — you're annoying now and lethal in ten minutes.",
    "W Miasma online — the grounding zone deletes dash kits from the matchup while it sits there.",
    "Full kit: Q poison into E-spam is real DPS already. Twin Fangs cost almost nothing on poisoned targets.",
    "The DPS treadmill builds — poison, E, E, E. Drop W on his approach path and {K} stops being scary.",
    "Petrifying Gaze online — the face-check stun flips every all-in: they engage, you R, they die in the E-spam.",
    "Seraph's or Liandry's spike — your sustained DPS now out-damages every melee top in an extended exchange.",
    "Late game you out-DPS carries while walking — speed from level scaling, R the dive, E-spam whatever's stunned."
  ],
  diffBase:{ jugg:'FAVOURED', diver:'EVEN', tank:'FAVOURED', ranged:'EVEN' },
  diffEx:{ irelia:'TRICKY', fiora:'TRICKY', jax:'TRICKY', olaf:'TRICKY', vayne:'TRICKY', gwen:'TRICKY',
    yasuo:'EVEN', camille:'EVEN', riven:'EVEN', tryndamere:'EVEN', warwick:'EVEN',
    ksante:'EVEN', poppy:'EVEN', galio:'TRICKY', quinn:'TRICKY', lucian:'TRICKY', graves:'TRICKY',
    akshan:'TRICKY', heimerdinger:'TRICKY', kayle:'EVEN', kassadin:'FAVOURED', vladimir:'EVEN',
    mel:'TRICKY', akali:'HARD', sylas:'TRICKY', kennen:'EVEN', teemo:'EVEN' },
  vs:{
    jugg:{
      tldr:"A DPS check he fails — poison every step-up, ground his approach, and E-spam him off the wave.",
      breakdown:"He has to walk at you through Miasma and poison to do anything. Q his farming spots, drop W the moment he leans in, and remember your E out-damages his entire trade pattern on poisoned targets.",
      dos:["Q-poison every last-hit attempt","Drop W Miasma on his approach path","E-spam only poisoned targets"],
      donts:["Stand inside {K} range with W down","Spam E without poison and drain your mana","Push past river without vision"],
      win:"Poison the wave, ground the approach, and out-DPS the brawl he never starts."
    },
    diver:{
      tldr:"Miasma is the anti-dash button — ground his engage and the dive kit becomes a farm bot.",
      breakdown:"His mobility is the whole threat and your W turns it off in a circle. Hold Miasma for {K}, keep R facing the engage angle, and E-spam anything that commits through the poison.",
      dos:["Hold W strictly for his dash window","Face the engage so R stuns, not slows","E-spam him while he's grounded"],
      donts:["Waste Miasma on poke spacing","Get flanked with R already spent","Trade flat while {K} is loaded and W is down"],
      win:"Ground the engage, stun the commit, and melt him in the E-spam."
    },
    tank:{
      tldr:"Poison shreds HP stacking — free DPS lane where only his engage cooldown deserves respect.",
      breakdown:"Tanks pay full price for the poison treadmill and can't threaten you back. Chip with Q, take plates, and bank R for river fights where a multi-man stun decides the objective.",
      dos:["Tax every CS with Q poison","Take plates behind your DPS threat","Bank R for multi-man river stuns"],
      donts:["Mana-dump E on a full-HP tank","Eat {K} for free in a farm lane","Stay top when your R wins fights elsewhere"],
      win:"Out-DPS the HP bar and own the objective fights."
    },
    ranged:{
      tldr:"He pokes in bursts, you poke forever — survive the early chip and the treadmill out-grinds him.",
      breakdown:"His poke pattern has cooldowns; your E doesn't. Land Q through minions, drop W on his harass angles, and force the lane into the sustained-DPS war only you can win.",
      dos:["Land Q from fog angles","Ground his sidestep lanes with W","Win extended exchanges with E-spam"],
      donts:["Eat his burst rotation with W down","E-spam unpoisoned targets at range","Forget R's stun wins any face-to-face"],
      win:"Outlast the burst poke and grind him down with the treadmill."
    }
  },
  mirror:{
    tldr:"Serpent mirror — whoever lands Q first owns the E-spam exchange; never face-check her R.",
    breakdown:"First poison wins each trade. Q from fog angles, side-step hers, and keep your back half-turned when her R timing comes up.",
    dos:["Win the Q-landing war","Turn away from her R","Ground her retreat with W"],
    donts:["E-trade unpoisoned","Face her at 6 with R up","Lose the mana ledger"],
    win:"First poison, better R discipline.",
    winS:"Her W is down — your fangs are free."
  },
  winS:"His engage is dead in the Miasma — spam him down.",
  tradeGood:"Q-poison his last-hit, E twice on the poison timer, drop W as he steps at you, and walk the grounded zone's edge while the fangs finish the math.",
  tradeBad:"Spamming E without poison until your mana bar dies — and then standing in {K} range with Miasma on cooldown.",
  waveBest:"a slow push you poison-tax from range — every CS costs him a Q-E-E rotation's worth of HP.",
  waveWorst:"crashed into his tower with W down — no grounding zone between you and his whole engage kit.",
  early:"Build the treadmill: Q poke on every CS, E only on poisoned targets, and W held as the anti-engage trump card.",
  mid:"From 6 you win every face-to-face — R the engage, ground the exit, E-spam the body. Take plates and force river fights where your DPS is unmatched.",
  late:"You're a hyper-carry mage: walk-and-spam E with level-scaling speed, R two divers at once, and melt frontlines that took thirty minutes to build.",
  safetyTool:"W Miasma",
  spikesLine:"Level 6 Gaze and the Seraph's/Liandry's timing are the spikes — face-checks die and tanks melt from there on.",
  carryLine:"Carry through sustained DPS — no champion out-damages a positioned Cassiopeia past two items.",
  behindShort:"keep farming with Q-E on the wave — your DPS curve forgives a lost lane.",
  loadingRule:"E only poisoned targets — mana is the lane.",
  dontDetail:"Miasma is your only anti-engage tool — wasting it on spacing chip leaves the dash window wide open.",
  aheadTpl:"Ahead, suffocate: poison {E} off every wave, ground his trades into farce, and force fights at the pace only your mana pool sustains.",
  behindTpl:"Behind, farm the treadmill — Q-E the wave from safety, hold W and R as the anti-dive package, and let the DPS curve carry you back by two items.",
  spikeName:"Seraph's / Liandry's",
  runeReport:"Conqueror, Presence of Mind, Legend: Haste, Last Stand; secondary Sorcery — Manaflow + Transcendence. Conqueror stacks instantly on E-spam.",
  summReport:"Flash + Teleport — no boots means Flash discipline matters double; TP funds the mana-item powerspike tempo.",
  itemReport:"No boots — ever; her passive replaces them. Tear early, then Seraph's or Liandry's, Rylai's, and Rabadon's by game state.",
  jungleLine:"W + R is a double-stun gank package — any jungler converts your lane. Hold Miasma for the moment {E} turns to run.",
  redditLine:"poison first, fangs second, Miasma for the dash — Cass top is a DPS treadmill that most melees step onto and die.",
  load:{
    sub:"r/CassiopeiaMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Tear of the Goddess + Dark Seal (≈800g)",
    antihealBack:"Oblivion Orb (≈800g) — cuts his healing",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Seraph's Embrace / Liandry's Torment",
    secondItem:"Rylai's Crystal Scepter",
    boots:"No boots — Serpentine Grace scales with level",
    bootsVsAP:"No boots — bank the gold into MR via Rookern later",
    bootsVsAD:"No boots — bank the gold into Zhonya's earlier",
    spike:"Rylai's second — nothing ever walks away from the fangs again.",
    runes:{ keystone:"Conqueror", primaryTree:"Precision", primary:["Presence of Mind","Legend: Haste","Last Stand"], tree:"Sorcery", secondary:["Manaflow Band","Transcendence"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    akali:{ tldr:"Shroud breaks your E targeting completely — the one assassin matchup where your DPS can't find the body. Ground her exits and pray for vision." },
    yasuo:{ tldr:"Wind Wall blocks Q and E both, but Miasma grounds his dashes — an honest fight between his wall cooldown and your zone." },
    kassadin:{ tldr:"Shieldless melee mage who wants spell-spam lanes — unfortunately your E feeds his passive less than it hurts him. Bully pre-6 relentlessly." }
  }
},

// ============================== AKSHAN ==============================
{
  key:'akshan', name:'Akshan',
  curve:[0.8,0.7,0.7,0.5,0.5,0.5,-0.2],
  lvl:[
    "Three-hit passive trades win level 1 — boomerang the wave, double-auto the step-up, and back off before the return.",
    "Q max gets the return hit — both boomerang passes on him plus the passive proc is a third of his HP bar.",
    "Full kit: E swing around terrain fires while moving — trades start at angles melee kits literally cannot answer.",
    "Trade on his CS timings and bank the passive shield-sprints. Track {K}; the swing dies to one good answer.",
    "Comeuppance online — the lock-on execute closes everything you chip. Scoundrels die; teammates revive.",
    "First item spike — the swing-fire pattern now removes half bars. Take over the lane and start roaming for revives.",
    "Crit items even out the field — your edge stays the map game: revives, executes, and swings nobody wards."
  ],
  diffBase:{ jugg:'FAVOURED', diver:'EVEN', tank:'FAVOURED', ranged:'EVEN' },
  diffEx:{ darius:'EVEN', garen:'EVEN', urgot:'EVEN', volibear:'EVEN', irelia:'TRICKY', jax:'HARD',
    fiora:'TRICKY', yasuo:'HARD', yone:'TRICKY', camille:'TRICKY', gwen:'TRICKY', olaf:'TRICKY',
    pantheon:'TRICKY', renekton:'TRICKY', riven:'TRICKY', warwick:'EVEN', wukong:'EVEN', vayne:'EVEN',
    malphite:'TRICKY', poppy:'EVEN', shen:'TRICKY', ksante:'EVEN', tahmkench:'EVEN', ornn:'EVEN',
    teemo:'TRICKY', kennen:'TRICKY', heimerdinger:'TRICKY', kayle:'FAVOURED', kassadin:'FAVOURED',
    vladimir:'EVEN', cassiopeia:'TRICKY', mel:'TRICKY', akali:'TRICKY', sylas:'EVEN', lucian:'EVEN',
    graves:'EVEN', quinn:'EVEN', ambessa:'TRICKY', zaahen:'TRICKY' },
  vs:{
    jugg:{
      tldr:"Swing circles around the brawler — three-hit trades on every CS and an E angle for every engage he tries.",
      breakdown:"He can't touch a marksman who attacks while swinging around terrain. Boomerang his farming spots, proc the three-hit passive on step-ups, and keep E pre-aimed at a wall whenever {K} threatens.",
      dos:["Q his last-hit positions for both passes","Proc the three-hit passive and disengage","Pre-aim E at terrain when {K} is up"],
      donts:["Stand still trading autos in his range","Swing INTO his kit without the kill","Burn the passive sprint-shield on poke"],
      win:"Chip him off the wave and swing away from everything he commits."
    },
    diver:{
      tldr:"He can follow the swing — trade in short bursts and save E as the exit, not the highlight reel.",
      breakdown:"Divers answer your mobility with their own, so discipline the pattern: three-hit trades that end before {K}, E strictly as the disengage, and R only when his gap-closers are spent.",
      dos:["End trades before {K} comes online","Hold E as the exit from his engage","R only after his dashes are spent"],
      donts:["Swing into a loaded engage kit","Extend past the three-hit proc","Channel R in his dash range"],
      win:"Short trades, disciplined swings, and the execute when his kit is down."
    },
    tank:{
      tldr:"Free harass lane — three-hit every CS, take plates, and export the revive economy to the map.",
      breakdown:"He can't punish the boomerang pattern and your passive shreds his early resists. Bully the farm phase, then swing into the river for picks — your R execute and ally revives decide skirmishes.",
      dos:["Three-hit proc him off every wave","Take plates behind the harass","Roam for picks and revive plays"],
      donts:["Sink full patterns into finished tank items","Eat {K} for free in a won lane","Channel R into his peel range"],
      win:"Win the chip war early and out-map him with revives and executes."
    },
    ranged:{
      tldr:"Poke mirror with a trump card — your swing creates angles his kit can't answer.",
      breakdown:"Straight poke is even; swinging poke isn't. Use terrain to open trades from stealth-grass angles, three-hit and rotate out, and force his answer before committing the R channel.",
      dos:["Open trades from terrain angles with E","Proc three hits and rotate out","Bait {K} before the R channel"],
      donts:["Trade flat at his preferred range","Swing predictably on cooldown","Channel R while his interrupt is up"],
      win:"Out-angle the poke war and execute the chip with R."
    }
  },
  mirror:{
    tldr:"Rogue mirror — whoever swings second and interrupts the other's R channel wins the duel.",
    breakdown:"Identical tricks: bait his swing first, shoot him off the rope mid-arc, and never channel Comeuppance while his boomerang is loaded.",
    dos:["Shoot him off his own swing","Bait the swing before yours","Interrupt his R channel"],
    donts:["Swing first without info","Channel into his full kit","Lose the three-hit race"],
    win:"Swing discipline and channel timing.",
    winS:"His swing is down — he's just an immobile ADC now."
  },
  winS:"His answer is down — swing in and finish it.",
  tradeGood:"Q for both boomerang passes, double-auto the three-hit proc, and sprint-shield away on the passive MS before his trade pattern starts.",
  tradeBad:"Swinging INTO a loaded kit for style points — one interrupt mid-arc and you're a stationary marksman in melee range.",
  waveBest:"a wave near the middle with terrain on your side — every trade opens from a swing angle he can't pre-aim.",
  waveWorst:"crashed into his tower with E down — no angles, no exit, and the gank corridor is open.",
  early:"Bully with geometry: boomerang the wave, three-hit the step-ups, and open every real trade from a terrain swing he can't answer.",
  mid:"Convert chips into executes — R closes everything you start, and every skirmish kill you revive swings the map twice. Roam through walls nobody wards.",
  late:"Play the pick game: swing angles into their backline, execute the chipped, revive the fallen. Straight teamfights favor the crit ADCs — avoid them.",
  safetyTool:"E swing",
  spikesLine:"Levels 1-3, level 6's execute, and your first item are the spikes — Akshan frontloads hard and converts through the map game.",
  carryLine:"Carry through the revive economy — every pick you R becomes a 5v4, and every ally revive un-loses a fight.",
  behindShort:"farm with Q through the wave and stay an execute threat — R math doesn't care about deficits.",
  loadingRule:"Three hits and out — never flat trades.",
  dontDetail:"The swing has one interrupt answer — using E as an entrance instead of an exit hands him that answer for free.",
  aheadTpl:"Ahead, terrorize: three-hit {E} off every wave, take plates, and roam through jungle walls with E — the revive on any pick doubles your lead.",
  behindTpl:"Behind, shorten your trades and lengthen your swings — farm safe, chip with Q, and wait for the R windows that reset the scoreboard.",
  spikeName:"first item",
  runeReport:"Press the Attack, Triumph, Legend: Alacrity, Coup de Grace; secondary Sorcery — Absolute Focus + Gathering Storm. PTA pops on the three-hit proc naturally.",
  summReport:"Flash + Teleport standard; Ignite supercharges the level 2-6 execute windows if you want a kill lane.",
  itemReport:"Start Doran's Blade + pot. First: Kraken Slayer or Hubris into Berserker's; then The Collector for the execute double-dip.",
  jungleLine:"Gank-friendly twice over: your chip sets up dives, and a successful gank near a dead scoundrel revives your jungler's HP bar of regrets. Swing-scout pixel brushes for free.",
  redditLine:"three-hit and out, E is the exit, and hold the R for closed windows — Akshan top is a geometry lesson most melees fail.",
  load:{
    sub:"r/AkshanMains",
    start:"Doran's Blade + 1 Health Potion",
    normalBack:"Pickaxe or Cull + Dirk path (≈1100g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his healing",
    antihealNote:"Executioner's Calling early into his sustain.",
    firstItem:"Kraken Slayer / Hubris",
    secondItem:"The Collector",
    boots:"Berserker's Greaves",
    bootsVsAP:"Berserker's Greaves / Mercury's Treads",
    bootsVsAD:"Berserker's Greaves / Plated Steelcaps",
    spike:"Collector second — your R execute threshold effectively doubles.",
    runes:{ keystone:"Press the Attack", primaryTree:"Precision", primary:["Triumph","Legend: Alacrity","Coup de Grace"], tree:"Sorcery", secondary:["Absolute Focus","Gathering Storm"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    jax:{ tldr:"Counter Strike dodges your autos — your whole kit — and stuns the swing arc. Trade only while his E is down; respect the scaling cliff." },
    yasuo:{ tldr:"Wind Wall blocks Q, autos, and your R channel wholesale — bait it before every commit and swing angles around it." },
    malphite:{ tldr:"Armor stacking blanks your physical kit — cash the early chip window, then convert to roams before his W cleave math wins." }
  }
}
];

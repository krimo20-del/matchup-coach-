// MatchupCoach — BOT generator configs batch 5: Senna, Sivir, Varus, Xayah.
window.GEN_BOT_CFGS_5 = [

{
  key:'senna', name:'Senna',
  curve:[-0.1,0.0,0.1,0.2,0.3,0.4,0.8],
  lvl:[
    "Q off minions and wards to chip the duo — your poke casts off anything targetable; the angles are the lane.",
    "Soul discipline begins: every wave drops souls — the collection IS your scaling stat.",
    "W threats open: any clumped duo trade now risks the spreading root.",
    "Q-chip on cooldown and collect the ledger — your range grows with every soul banked.",
    "Dawning Shadow online — the global beam saves dives and finishes recalls; the map is your lane now.",
    "First item spike: the Q chip chunks and the soul range starts mocking trade math.",
    "Late Senna out-ranges the game: infinite souls, cross-map beams, and a mist that hides whole teamfights."
  ],
  diffBase:{ hyper:'EVEN', utility:'EVEN', apc:'EVEN' },
  diffEx:{ caitlyn:'TRICKY', draven:'HARD', lucian:'TRICKY', samira:'TRICKY', tristana:'TRICKY', kalista:'TRICKY', missfortune:'TRICKY',
    jinx:'EVEN', kogmaw:'EVEN', twitch:'EVEN', vayne:'EVEN', zeri:'EVEN', smolder:'EVEN', aphelios:'EVEN', nilah:'FAVOURED', kaisa:'EVEN', ashe:'EVEN', jhin:'EVEN',
    heimerdinger:'TRICKY', seraphine:'EVEN', ziggs:'TRICKY', karthus:'EVEN', veigar:'EVEN', swain:'EVEN', corki:'EVEN', ezreal:'EVEN', sivir:'EVEN', varus:'EVEN', xayah:'EVEN' },
  vs:{
    hyper:{
      tldr:"A scaling duel where your curve has no cap — chip the souls, root the all-ins, and out-infinite the finite.",
      breakdown:"Trade Q-angles off minions and bank souls; his items plateau and your collection doesn't. The W root punishes every committed engage and the mist hides your worst moments.",
      dos:["Q-chip off minions and wards","Root the engage as it commits","Bank souls — the curve is the matchup"],
      donts:["Auto-war his spikes at parity","Stand on your minions vs his trades","Spend the mist on tempo"],
      win:"Out-collect the curve war — infinity outlasts items."
    },
    utility:{
      tldr:"A utility mirror your soul math tilts — trade tools evenly and let the collection decide the second half.",
      breakdown:"Match his poke with Q-angles, dodge {K}, and root the trick exchanges. Your R answers cross-map what his toolbox answers locally.",
      dos:["Win the poke-angle war with Q","Root his tool windows","Beam the cross-map saves"],
      donts:["Eat {K} collecting greedily","Trade at his trick's range","Mist the farm instead of the fight"],
      win:"Out-tool the toolbox locally and out-range it globally."
    },
    apc:{
      tldr:"A poke war your heal taxes — Q through the chip, root the zone-steps, and out-sustain the rotation class.",
      breakdown:"Mage poke meets a poke that heals: Q-trade through your own duo for the sustain, dodge the rotation's centerpiece, and root the greed it eventually buys.",
      dos:["Q through allies for the heal-chip","Dodge the centerpiece, root the follow","Beam the execute he walks home with"],
      donts:["Eat rotations at soul range","Clump for his AoE with the duo","Mist reactively instead of preemptively"],
      win:"Heal through the poke war and root the rotation's one mistake."
    }
  },
  mirror:{
    tldr:"Soul mirror — collection economy and root discipline; whoever banks faster out-ranges the other forever.",
    breakdown:"Win the soul race, dodge her W behind spread positioning, and beam second — her save windows feed yours information.",
    dos:["Win the visible soul race","Spread off her W lines","Beam second in the save war"],
    donts:["Trade at collection deficit","Stand on minions vs her root","Mist-duel at parity"],
    win:"Faster collection, later beam — the better curator wins.",
    winS:"Her root is down — collect forward freely."
  },
  winS:"His escape is spent — root the window and chip the verdict.",
  tradeGood:"Q off a minion through the duo, auto the mark, walk — chip that healed your carry and grew your range.",
  tradeBad:"Greeding soul pickups inside his all-in range — the collection funds the curve; dying for one soul refunds his.",
  waveBest:"a slow push you collect behind — every wave is range and the crash is a covered withdrawal.",
  waveWorst:"a shoved wave with souls uncollected on his side — the ledger growing where you can't bank it.",
  early:"Collect and chip — the lane is a savings account with a gun attached.",
  mid:"First item onward, the angles multiply: Q the sieges, root the picks, and beam the map's emergencies.",
  late:"You out-range the game: chip from two screens, mist the engages, and beam the verdicts globally.",
  safetyTool:"E Curse of the Black Mist",
  spikesLine:"First item arms the chip; level 6 makes you global; the soul curve never stops.",
  carryLine:"Carry through infinity — the collection has no cap; your job is the patience and the angles.",
  behindShort:"farm with Q angles and stay relevant through roots and beams.",
  loadingRule:"Cast Q off anything targetable — the angles are the champion.",
  dontDetail:"The mist hides teams, not mistakes — walking into hooks to collect is how curators retire early.",
  aheadTpl:"Ahead, compound the collection: chip {E} off every angle, root the answers, and beam the map into submission.",
  behindTpl:"Behind, the souls still drop: collect safely, mist their dives, and let infinity rebuild the ledger.",
  spikeName:"first item",
  runeReport:"Fleet Footwork or Grasp-lines, Presence of Mind, Legend: Bloodline, Cut Down; secondary Inspiration — Magical Footwear + Approach Velocity.",
  summReport:"Flash + Heal standard; the R is a third Heal the map shares.",
  itemReport:"Start the support-adjacent or Doran's start by build. BotRK-Eclipse... standard carry Senna: Statikk or BotRK first, Swifties, then RFC paths — range feeds range.",
  jungleLine:"Your W roots ganks from soul range and the mist hides the approach — ping dives the fog can chaperone.",
  redditLine:"angles, souls, and global receipts — Senna wins by collecting what other carries cap.",
  load:{
    sub:"r/sennamains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Pickaxe / Zeal piece (≈1000g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Statikk / BotRK",
    secondItem:"RFC path",
    boots:"Swiftness / Berserker's",
    bootsVsAP:"Mercury's Treads",
    bootsVsAD:"Plated Steelcaps",
    spike:"First item + soul thresholds — the chip war becomes a range war you pre-won.",
    runes:{ keystone:"Fleet Footwork", primaryTree:"Precision", primary:["Presence of Mind","Legend: Bloodline","Cut Down"], tree:"Inspiration", secondary:["Magical Footwear","Approach Velocity"], shards:["Attack Speed","Adaptive Force","Health"] }
  },
  specials:{
    draven:{ tldr:"His act out-bills your collection era — concede the volume, collect behind the wave, and out-range the show when souls mature." },
    nilah:{ tldr:"Her veil dodges autos but not your Q — chip through it, root the surf, and out-scale the joy with souls." }
  }
},

{
  key:'sivir', name:'Sivir',
  curve:[0.2,0.3,0.3,0.3,0.3,0.4,0.3],
  lvl:[
    "Q both passes through the contacts — the boomerang bills twice; stand where the return doubles.",
    "W-bounce the duo trades: the ricochet taxes his support for standing in formation.",
    "Spell shield games begin: every ability he aims is now a mana refund audition.",
    "Shove the metronome: your W clears set the lane's tempo — he farms under tower or fights your timing.",
    "On the Hunt online — the team-speed flips engages both directions; the map plays at your pace.",
    "First item spike: the ricochet shreds duos and the shove becomes weather.",
    "Late Sivir conducts: speed the engage, shield the answer, and ricochet the teamfight through its own front line."
  ],
  diffBase:{ hyper:'EVEN', utility:'EVEN', apc:'EVEN' },
  diffEx:{ caitlyn:'TRICKY', draven:'TRICKY', lucian:'TRICKY', samira:'EVEN', tristana:'EVEN', kalista:'EVEN', missfortune:'EVEN',
    jinx:'EVEN', kogmaw:'EVEN', twitch:'EVEN', vayne:'EVEN', zeri:'EVEN', smolder:'EVEN', aphelios:'EVEN', senna:'EVEN', nilah:'EVEN', kaisa:'EVEN', ashe:'EVEN', jhin:'EVEN',
    heimerdinger:'TRICKY', seraphine:'EVEN', ziggs:'EVEN', karthus:'EVEN', veigar:'FAVOURED', swain:'EVEN', corki:'EVEN', ezreal:'EVEN', varus:'EVEN', xayah:'EVEN' },
  vs:{
    hyper:{
      tldr:"His curve needs waves you intend to delete — shove the metronome, shield the all-in, and out-tempo the scaling.",
      breakdown:"Your W shove makes him farm under tower all laning phase; the missed CS is your real poke. Spell-shield his engage tool and the lane stays a schedule he doesn't set.",
      dos:["Shove the metronome relentlessly","Spell-shield his engage tool","Q both passes through the contests"],
      donts:["Auto-war his spikes at parity","Burn E on poke out of boredom","Chase kills off your tempo"],
      win:"Tax the curve in missed CS and conduct the mid game at your pace."
    },
    utility:{
      tldr:"A utility mirror your shield referees — eat his trick with E and bill the refund in boomerangs.",
      breakdown:"His toolbox has a centerpiece; your E eats it once per fight. Bait it with spacing, shield the real cast, and Q the silence.",
      dos:["Shield the centerpiece, not the chip","Bill the refund in Q passes","Out-shove his tempo tools"],
      donts:["E the bait cast — react to the real one","Trade inside his trick window","Shove without river vision"],
      win:"Eat the trick once per fight and out-tempo the rest."
    },
    apc:{
      tldr:"A spell war against a spell shield — his rotation has a keystone and your E owns it.",
      breakdown:"Mage rotations collapse when the centerpiece refunds your mana: shield it, shove the zone he wanted to cast over, and speed the engage his cooldowns can't answer.",
      dos:["Shield his keystone spell exactly","Shove through the zone window","R-speed the engage post-rotation"],
      donts:["E the poke instead of the keystone","Eat rotations at even HP","Siege the nest shield-down"],
      win:"Own the keystone with E and conduct the silence after."
    }
  },
  mirror:{
    tldr:"Boomerang mirror — shield chicken and shove tempo; whoever eats the other's Q with E wins the exchange economy.",
    breakdown:"Bait her E with auto threats, shield her Q (the only spell that matters), and win the shove war — the mirror is a metronome contest.",
    dos:["Shield her Q, nothing else","Win the shove metronome","Bait her E with auto feints"],
    donts:["Q into her ready shield","Trade at shield parity","R-duel without the tempo lead"],
    win:"Better shield reads, faster metronome — the conductor wins.",
    winS:"Her shield is down — the Q passes bill in full."
  },
  winS:"His answer is spent — Q both passes and conduct the trade.",
  tradeGood:"Q the contact both ways, W-bounce the duo, walk — the trade taxed two people and refunded your mana bar.",
  tradeBad:"Spending E on chip damage and eating the engage it existed to eat — the shield is the matchup; spend it like a verdict.",
  waveBest:"a permanent shove — the metronome IS the champion; his missed CS is your poke ledger.",
  waveWorst:"a frozen wave you allowed — Sivir without tempo is a boomerang museum.",
  early:"Set the metronome — shove, bounce, shield; the lane plays at your pace or under its tower.",
  mid:"R economy runs the rivers: speed the engages, shield the counter-picks, and ricochet the skirmish seams.",
  late:"You conduct the teamfight: hunt-speed the engage, shield their opener, and shred the formation through its own tanks.",
  safetyTool:"E Spell Shield",
  spikesLine:"First item arms the ricochet; level 6 speeds the map; the shield is a spike on a 22-second loop.",
  carryLine:"Carry through tempo — the shove taxes lanes and the R moves teams; your job is the keystone reads.",
  behindShort:"farm with W clears and stay relevant through the shield and R utility.",
  loadingRule:"Shield the keystone — the E is a verdict, not a flinch.",
  dontDetail:"The shield eats ONE spell — spent on bait, the real cast arrives to a refunded apology.",
  aheadTpl:"Ahead, conduct louder: shove {E} under tower permanently, shield the comeback tools, and speed the map into your tempo.",
  behindTpl:"Behind, the metronome holds: clear safely, shield their dives, and speed one engage that resets the score.",
  spikeName:"first item",
  runeReport:"Fleet Footwork or Lethal Tempo, Presence of Mind, Legend: Bloodline, Cut Down; secondary Inspiration — Biscuits + Cosmic Insight.",
  summReport:"Flash + Heal standard; the E is your Cleanse if you read keystones honestly.",
  itemReport:"Start Doran's Blade + pot. ER or Statikk first, Berserker's, then IE-Runaan's — the ricochet wants crit volume.",
  jungleLine:"Your R speeds the gank's arrival and the escape's failure — ping engages; Sivir 3v2s arrive early and leave late.",
  redditLine:"shove the clock, shield the keystone, and speed the team — Sivir wins games as the metronome.",
  load:{
    sub:"r/sivirmains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Noonquiver (≈1000g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Essence Reaver / Statikk",
    secondItem:"IE / Runaan's",
    boots:"Berserker's Greaves",
    bootsVsAP:"Mercury's Treads / Berserker's",
    bootsVsAD:"Plated Steelcaps / Berserker's",
    spike:"Two items — the ricochet shreds formations and the metronome owns the map.",
    runes:{ keystone:"Fleet Footwork", primaryTree:"Precision", primary:["Presence of Mind","Legend: Bloodline","Cut Down"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Attack Speed","Adaptive Force","Health"] }
  },
  specials:{
    veigar:{ tldr:"Your shield eats the cage OR the R — pick the cage every time; an uncaged Sivir out-tempos the homework dragon... gremlin." },
    heimerdinger:{ tldr:"The nest out-shoves even your metronome — W the turrets with the wave, shield the grenade, and conduct from beyond the complex." }
  }
},

{
  key:'varus', name:'Varus',
  curve:[0.3,0.3,0.4,0.3,0.4,0.4,0.2],
  lvl:[
    "Q-charge the contacts — your poke out-ranges the lane and the charge telegraph is your only tax.",
    "W stacks begin: three autos then Q is the real trade math — sequence it.",
    "E-zone the sustain lanes: the grievous rain decides every heal war before it starts.",
    "Poke the ledger: charged Qs on cooldown and blight-detonations on the step-ups.",
    "Chain of Corruption online — the spreading root turns any duo clump into a dive invitation.",
    "First item spike: the blight math chunks and the poke war is officially priced in your favor.",
    "Late Varus picks and sieges: root the flank, charge the setup, and detonate the formation's blight."
  ],
  diffBase:{ hyper:'EVEN', utility:'EVEN', apc:'EVEN' },
  diffEx:{ caitlyn:'TRICKY', draven:'TRICKY', lucian:'TRICKY', samira:'EVEN', tristana:'EVEN', kalista:'EVEN', missfortune:'EVEN',
    jinx:'FAVOURED', kogmaw:'EVEN', twitch:'EVEN', vayne:'EVEN', zeri:'EVEN', smolder:'EVEN', aphelios:'EVEN', senna:'EVEN', nilah:'FAVOURED', kaisa:'EVEN', ashe:'EVEN', jhin:'EVEN',
    heimerdinger:'TRICKY', seraphine:'EVEN', ziggs:'EVEN', karthus:'EVEN', veigar:'EVEN', swain:'EVEN', corki:'EVEN', ezreal:'EVEN', sivir:'EVEN', xayah:'EVEN' },
  vs:{
    hyper:{
      tldr:"His curve farms what your poke taxes — charge the contacts, root the all-in, and price the lane out of his budget.",
      breakdown:"Q-poke every CS attempt and detonate blight on the trades; his scaling needs HP your arrows keep repossessing. The R flips his one all-in window into your dive.",
      dos:["Charge-poke every CS attempt","Detonate three-stack blight windows","Root the all-in he saves up for"],
      donts:["Auto-war his spikes at parity","Charge predictably on his rhythm","Spend R on poke-range prayers"],
      win:"Tax the curve per arrow and root the refund request."
    },
    utility:{
      tldr:"A poke mirror your blight tilts — trade charges evenly and let the stack detonations bill the margins.",
      breakdown:"Match his tools with Q-range, dodge {K}, and E the sustain exchanges — grievous rain decides utility wars quietly.",
      dos:["Win the charge-range war","E-zone his sustain windows","Detonate stacks before disengaging"],
      donts:["Eat {K} mid-charge","Trade autos inside his trick range","Hold R for perfect flanks forever"],
      win:"Out-poke the toolbox and let blight do the bookkeeping."
    },
    apc:{
      tldr:"An artillery duel with a root attached — match his range, dodge the rotation, and chain the cooldown silence.",
      breakdown:"Trade charged Qs for his spells on even cadence, E his casting zone, and R the gap his rotation leaves — a rooted mage meets the full blight ledger.",
      dos:["Match his cadence with charged Qs","E the zone he casts from","Chain the post-rotation silence"],
      donts:["Eat the rotation holding your charge","Walk the painted floor for stacks","Siege the nest without the root"],
      win:"Out-range the rotation and root its one quiet moment."
    }
  },
  mirror:{
    tldr:"Arrow mirror — charge discipline and root chicken; whoever lands the chain first dives first.",
    breakdown:"Dodge his charge at the telegraph, land yours off blight threats, and R second — his chain groups your team for yours.",
    dos:["Juke the charge telegraph late","Detonate stacks before he does","Chain second with information"],
    donts:["Charge-duel at even rhythm","Stand near allies vs his R","Trade stacks at parity"],
    win:"Later chain, cleaner jukes — the patient arrow lands.",
    winS:"His chain is down — poke freely; the dive threat is yours."
  },
  winS:"His answer is spent — chain the window and detonate the ledger.",
  tradeGood:"Three autos, Q-detonate the blight, walk — the stack math chunks harder than the trade looked.",
  tradeBad:"Holding the charge so long the trade window closes — the arrow taxes movement; hoarding it taxes you.",
  waveBest:"a poke-thinned slow push — every charged Q is a toll and the wave is the booth.",
  waveWorst:"a shoved wave against divers with R down — the artillery with no insurance policy.",
  early:"Price the lane — charged Qs tax everything that moves and the blight bills what stands still.",
  mid:"Chain economy: root the river picks, E the objective sustain, and charge the sieges from fog.",
  late:"You are the pick and the siege: chain the flank, charge the setup, and let the spreading root start the teamfight early.",
  safetyTool:"R Chain of Corruption (defensive)",
  spikesLine:"First item prices the poke war; level 6 adds the dive starter; two items make blight detonations executions.",
  carryLine:"Carry through the chain — one spreading root is a started teamfight; your job is the angle and the blight ledger behind it.",
  behindShort:"farm with Q poke and stay relevant through R picks.",
  loadingRule:"Three stacks then Q — the blight detonation is the real trade.",
  dontDetail:"The chain spreads off the FIRST target — rooting a tank roots a tank; aim at the spreader.",
  aheadTpl:"Ahead, raise the toll: charge {E} off every CS, chain the river picks, and siege the map at arrow range.",
  behindTpl:"Behind, the artillery holds: poke safely, root their dives, and chain one flank that restarts the game.",
  spikeName:"first item",
  runeReport:"Lethal Tempo (on-hit) or Arcane Comet (poke), Presence of Mind, Legend: Bloodline, Cut Down; secondary Sorcery — Manaflow + Gathering Storm.",
  summReport:"Flash + Heal standard; the R is your peel if the flank reads wrong.",
  itemReport:"Start Doran's Blade + pot. Build by identity: on-hit (BotRK-Terminus) or lethality-poke (Manamune-Serylda's). Both feed the blight.",
  jungleLine:"Your R is the dive starter junglers dream about — chain the duo and the 3v2 begins rooted; ping the windows.",
  redditLine:"charge the tax, stack the bill, and chain the spreader — Varus wins lanes at range and fights at the root.",
  load:{
    sub:"r/VarusMains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Recurve / Tear by build (≈1000g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"BotRK / Manamune",
    secondItem:"Terminus / Serylda's",
    boots:"Berserker's / Lucidity",
    bootsVsAP:"Mercury's Treads",
    bootsVsAD:"Plated Steelcaps",
    spike:"First item — blight detonations chunk and the poke war is priced.",
    runes:{ keystone:"Lethal Tempo", primaryTree:"Precision", primary:["Presence of Mind","Legend: Bloodline","Cut Down"], tree:"Sorcery", secondary:["Manaflow Band","Gathering Storm"], shards:["Attack Speed","Adaptive Force","Health"] }
  },
  specials:{
    sivir:{ tldr:"Her shield eats the chain OR the charge — feint the Q to draw it, then root the refund window." },
    samira:{ tldr:"Her whirl deletes the arrow AND the chain mid-flight — poke only post-spin and root the surf's landing." }
  }
},

{
  key:'xayah', name:'Xayah',
  curve:[0.2,0.3,0.3,0.3,0.4,0.4,0.3],
  lvl:[
    "Q-feather the contacts — the lines drop ammunition; the floor behind him is your second health bar.",
    "W-trades begin: the plumage window out-DPSes his pattern; trade inside it.",
    "E threats open: three feathers is a root — the lane now answers to your floor plan.",
    "Stack lines on every trade and call them on the disengage — the bill roots.",
    "Featherstorm online — your counter-engage deletes dives mid-flight and reloads the floor.",
    "First item spike: the feather math chunks and the root chains start kill windows.",
    "Late Xayah un-dives: R their engage, call the storm's feathers, and root the formation that thought it committed."
  ],
  diffBase:{ hyper:'EVEN', utility:'EVEN', apc:'EVEN' },
  diffEx:{ caitlyn:'TRICKY', draven:'TRICKY', lucian:'TRICKY', samira:'FAVOURED', tristana:'EVEN', kalista:'EVEN', missfortune:'EVEN',
    jinx:'EVEN', kogmaw:'EVEN', twitch:'EVEN', vayne:'EVEN', zeri:'EVEN', smolder:'EVEN', aphelios:'EVEN', senna:'EVEN', nilah:'EVEN', kaisa:'EVEN', ashe:'EVEN', jhin:'EVEN',
    heimerdinger:'TRICKY', seraphine:'EVEN', ziggs:'TRICKY', karthus:'EVEN', veigar:'EVEN', swain:'EVEN', corki:'EVEN', ezreal:'EVEN', sivir:'EVEN', varus:'EVEN' },
  vs:{
    hyper:{
      tldr:"A scaling mirror your roots referee — trade feather windows and un-dive the all-in his curve eventually buys.",
      breakdown:"Match his farm, stack lines on every trade, and hold E for the commits. The R answers his item-spike all-in personally — dives on Xayah are donations.",
      dos:["Stack feather lines per trade","Root the committed engage","R the dive — it reloads the floor"],
      donts:["Auto-war outside your W window","Call empty floors for style","R the poke instead of the dive"],
      win:"Out-trade the windows and un-dive the curve's one argument."
    },
    utility:{
      tldr:"A utility mirror with a floor plan — trade tools evenly and let the feather geometry bill the margins.",
      breakdown:"Dodge {K}, stack the lines through his windows, and call the root on his trick's cooldown — the floor remembers what his toolbox forgets.",
      dos:["Stack through his tool windows","Call the root on his cooldown","W-trade inside the plumage only"],
      donts:["Eat {K} standing on your own line","Trade outside the W window","Waste R answering poke"],
      win:"Out-geometry the toolbox — the floor keeps better books."
    },
    apc:{
      tldr:"He zones the floor you decorate — dodge the rotation, feather the gaps, and root the mage who walks his own zone.",
      breakdown:"Mage zones and feather lines fight for the same floor: lay yours through his casting spots, W-trade the gaps, and R his all-in rotation into a reloaded root.",
      dos:["Feather his casting positions","R the rotation, then call the storm","Trade strictly in his cooldown gaps"],
      donts:["Stand in his zone stacking lines","Call feathers his minions block","Dive the nest without the R"],
      win:"Decorate his zone with roots and un-cast his best rotation."
    }
  },
  mirror:{
    tldr:"Feather mirror — floor geometry against floor geometry; whoever calls the fuller line roots the trade.",
    breakdown:"Track both floors, dodge her E lines laterally, and R second — her storm reloads your dodge window's information.",
    dos:["Call fuller lines than hers","Dodge laterally off her floor","R second in the storm war"],
    donts:["Stand on either floor carelessly","Trade at feather parity","Storm first at even HP"],
    win:"Better floor accounting wins — the tidier bird roots.",
    winS:"Her feathers are spent — the floor is just floor; trade."
  },
  winS:"His answer is spent — call the line and root the verdict.",
  tradeGood:"Q the line, W-trade three autos, E the disengage — the bill roots him on the floor he ignored.",
  tradeBad:"Calling two feathers out of impatience — the root needs three; early calls are confetti.",
  waveBest:"a controlled push that drops lines through his camp spots — the floor is the setup and the wave is the brush.",
  waveWorst:"a shoved empty lane — no minions, no lines, no luggage; just a bird with opinions.",
  early:"Decorate and trade — the feather geometry compounds while the lane reads it as chip.",
  mid:"Root economy: call the river picks, W the skirmish windows, and R the dives into reloaded floors.",
  late:"You are the un-dive: R their engage mid-flight, call the storm's full line, and root the formation into your team's spreadsheet.",
  safetyTool:"R Featherstorm",
  spikesLine:"Level 3 roots threaten; level 6 deletes dives; first item makes the lines lethal.",
  carryLine:"Carry through geometry — the floor roots what items can't; your job is the lines and the patience to call them full.",
  behindShort:"farm with Q lines and stay relevant through root peel.",
  loadingRule:"Three feathers or no call — the root math is absolute.",
  dontDetail:"The R is untargetability AND a reload — spent on poke dodges, the real dive arrives to a bare floor.",
  aheadTpl:"Ahead, decorate the map: line {E}'s every path, root the answers, and storm the comeback dives into confetti.",
  behindTpl:"Behind, the floor still works: stack safely, root their engages, and let one full-line call reset the lane's memory.",
  spikeName:"first item",
  runeReport:"Lethal Tempo or PTA, Triumph, Legend: Bloodline, Coup de Grace; secondary Domination — Taste of Blood + Treasure Hunter.",
  summReport:"Flash + Heal standard; the R is your Cleanse against dives if the timing is honest.",
  itemReport:"Start Doran's Blade + pot. ER or Collector... standard: Statikk or Collector first, Berserker's, then IE — crit feeds the feather scaling.",
  jungleLine:"Your E roots ganks the floor pre-wrote — drop lines through the lane before your jungler commits; the 3v2 starts rooted.",
  redditLine:"lines before calls, three before one, and storm the dive not the poke — Xayah wins on floors she swept in advance.",
  load:{
    sub:"r/XayahMains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Pickaxe / Zeal piece (≈1000g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Statikk / Collector",
    secondItem:"Infinity Edge",
    boots:"Berserker's Greaves",
    bootsVsAP:"Mercury's Treads / Berserker's",
    bootsVsAD:"Plated Steelcaps / Berserker's",
    spike:"Two crit items — the feather calls execute and the un-dive ends arguments.",
    runes:{ keystone:"Lethal Tempo", primaryTree:"Precision", primary:["Triumph","Legend: Bloodline","Coup de Grace"], tree:"Domination", secondary:["Taste of Blood","Treasure Hunter"], shards:["Attack Speed","Adaptive Force","Health"] }
  },
  specials:{
    samira:{ tldr:"Your R dodges her blender mid-grade and the feathers root the surf — the counter-pick; bait the whirl with a Q line, then call the verdict." },
    heimerdinger:{ tldr:"The nest blocks your lines and out-zones the floor — feather the turret spots at range and storm only the grenade's cooldown." }
  }
}
];

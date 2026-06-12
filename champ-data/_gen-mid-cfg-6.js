// MatchupCoach — MID generator configs batch 6: Karma, Lux, Mel, Neeko.
window.GEN_MID_CFGS_6 = [

// ============================== KARMA ==============================
{
  key:'karma', name:'Karma',
  curve:[0.5,0.4,0.4,0.3,0.2,0.3,-0.3],
  lvl:[
    "Q-poke wins level 1 against nearly everyone — the lane starts as your spam war; respect only mana.",
    "Mantra online from level 1 means RQ is already a third of a health bar — spend it on real windows, not waves.",
    "Full kit: W tether roots overstayers and E speeds every trade exit. Your early is the best in the utility class.",
    "Lost Chapter timing — the RQ chunk cycles every 30 seconds. Chip him below half and hold the kill window.",
    "No new ult — your 6 is a Mantra rank: faster cycles, bigger RQs. Press the early lead before scaling lanes wake up.",
    "Blackfire/Luden's spike: RQ-W chains threaten kills outright. The lane is now or never — you fall off politely.",
    "Late Karma is a utility engine: RE shields the team, W roots the diver, and RQ pokes the objective setup."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'TRICKY', fighter:'TRICKY' },
  diffEx:{ kassadin:'FAVOURED', twistedfate:'FAVOURED',
    katarina:'EVEN', galio:'EVEN', sylas:'EVEN', anivia:'EVEN', taliyah:'EVEN', lux:'EVEN', ziggs:'EVEN', malzahar:'EVEN', ahri:'EVEN', zoe:'EVEN', annie:'EVEN', veigar:'EVEN', vex:'EVEN', brand:'EVEN', neeko:'EVEN', mel:'EVEN', aurora:'EVEN',
    yasuo:'TRICKY', yone:'TRICKY', fizz:'TRICKY', zed:'TRICKY', leblanc:'TRICKY', akali:'TRICKY', irelia:'TRICKY', pantheon:'TRICKY', ekko:'TRICKY', diana:'TRICKY', qiyana:'TRICKY', talon:'TRICKY', naafiri:'TRICKY', lissandra:'TRICKY',
    syndra:'TRICKY', xerath:'TRICKY', viktor:'TRICKY', orianna:'TRICKY', azir:'TRICKY', cassiopeia:'TRICKY', vladimir:'TRICKY', hwei:'TRICKY', swain:'TRICKY', ryze:'TRICKY' },
  vs:{
    control:{
      tldr:"You own the first ten minutes against scalers — RQ the lane into submission before his items vote.",
      breakdown:"Your early poke beats almost every control kit: Q his last-hits, RQ the real windows, and E-speed away from answers. The deadline is real — his two-item spike out-values your whole curve, so the lead must become towers and roams before it expires.",
      dos:["RQ his step-ups every Mantra cycle","Q-poke the last-hits relentlessly","Convert the lead to plates before two items"],
      donts:["Coast on even farm — you LOSE even","Spend Mantra on waves pre-spike","Trade at his range once items arrive"],
      win:"Cash the early lead into plates and roams before his scaling forecloses on you."
    },
    burst:{
      tldr:"Your poke starts the kill his combo needs full health to answer — chip first, shield his response, root the greed.",
      breakdown:"RE shields blunt his rotation and the W tether punishes the range he must enter to combo you. Chip with Q, hold the shield for his real window, and root whoever stays to finish the job they started behind.",
      dos:["Chip him below combo-survival range","RE-shield his burst window","W-root the overstay after his rotation"],
      donts:["Eat his poke during Mantra downtime","Burn the shield on chip damage","Trade combos at even HP — chip first"],
      win:"Win the chip war, shield the answer, and root the burst mage who fell behind on it."
    },
    assassin:{
      tldr:"He dives a shield, a root tether, and a speed boost — annoying, but your damage falls off before his patience does.",
      breakdown:"You frustrate assassins rather than beat them: RE the dive, W-root the commit, E-speed the disengage. Bully hard pre-6 — it's the only window where your damage threatens — then play utility and shove his roam timers.",
      dos:["Bully levels 1-5 — it's your whole window","RE + W the dive package","Crash waves and ping his roams"],
      donts:["Look for kills post-items — peel instead","Break your tether walking backward","Shove past river with E down"],
      win:"Win early, frustrate the dives, and out-utility his snowball with shields and roots."
    },
    fighter:{
      tldr:"He runs at a tether that roots and a shield that speeds — the run-down never quite arrives if you space it right.",
      breakdown:"W is the matchup: tether his engage, hold the root through his gap-closer, and RE-speed out of the all-in. Your poke wins every pre-engage minute; spend them chipping so his eventual commit starts at a deficit.",
      dos:["Tether his engage and hold the root","RE-speed the disengage window","Chip relentlessly between his windows"],
      donts:["Stand within his reach during tether","Spend Mantra on damage when RE survives","Trade extended past your root"],
      win:"Root the run-down, speed the exit, and bill him a health bar per attempt."
    }
  },
  mirror:{
    tldr:"Mantra mirror — whoever spends RQ on champions instead of waves wins; the tether war decides the all-ins.",
    breakdown:"Identical kits reward discipline: dodge her RQ (it's the whole trade), land yours, and never break your own tether early — the root is the only hard CC either of you owns.",
    dos:["Dodge her RQ at all costs","Hold your tether through her E speed","Win the Manaflow banking race"],
    donts:["Spend Mantra on waves while she banks hers","Trade Q-for-Q during her RQ window","Chase through her shield speed"],
    win:"Land RQ, dodge hers — the Mantra ledger decides the lane.",
    winS:"Her Mantra is spent — trade freely for thirty seconds."
  },
  winS:"His engage is spent — RQ the retreat and walk forward.",
  tradeGood:"Q the last-hit, and on real windows RQ-W: the chunk plus tether-root turns a poke trade into a kill setup — E out before the answer.",
  tradeBad:"Spending Mantra on wave-clear while behind on poke — Karma without RQ banked is a support who took mid's farm.",
  waveBest:"a Q-thinned slow push you RQ-crash on roam timers — your E speeds the whole team's rotations, not just yours.",
  waveWorst:"a frozen wave at his tower post-two-items — your kill window died there and the lane just hasn't noticed yet.",
  early:"Bully from minute one — your level 1-5 is the best in the utility class and the only phase where Karma kills people. Spend it loudly.",
  mid:"Convert before the curve flips: plates, roams, river picks with W roots. Every minute past your spike is a minute rented from his.",
  late:"You are the team's engine room: RE the engage, W-root the diver, RQ the siege — Karma late wins by making four teammates faster and safer.",
  safetyTool:"RE shield-speed",
  spikesLine:"Level 1 RQ is the earliest spike in the class; Blackfire/Luden's is the kill window; past two items you transition to utility.",
  carryLine:"Carry early or enable late — RQ chips win lanes; RE + roots win the teamfights your early lead bought.",
  behindShort:"farm with Q and stay relevant through shields and roots.",
  loadingRule:"Spend Mantra on champions, not waves — RQ is the lane.",
  dontDetail:"Your tether breaks if YOU walk away — holding the root means holding your ground for two seconds you must plan for.",
  aheadTpl:"Ahead, sprint: RQ {E} off every wave, take plates with the lead, and W-root river picks — Karma leads are sprints, not marathons.",
  behindTpl:"Behind, transition early: shield the carries, root the divers, speed the engages — Karma is never useless, just quieter.",
  spikeName:"Blackfire Torch",
  runeReport:"Arcane Comet or Aery, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight. Aery rides both RQ pokes and RE shields.",
  summReport:"Flash + Teleport standard; Ignite into lanes where the level 2-5 bully window can genuinely kill.",
  itemReport:"Start Doran's Ring + 2 pots. Blackfire Torch into Sorcerer's, then Shadowflame or transition utility (Redemption lines) as the game demands.",
  jungleLine:"Your W root plus E speed makes ganks arrive faster and stick harder — RQ chips the target below all-in range before the jungler even commits.",
  redditLine:"RQ people not minions, hold the tether's ground, and respect the fall-off — Karma wins early or enables late, never neither.",
  load:{
    sub:"r/KarmaMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — the spam war funds itself",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Blackfire Torch",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Blackfire + Shadowflame — the RQ window where Karma genuinely kills people.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    kassadin:{ tldr:"The melee mage is your favorite customer — Q every CS attempt, RQ every level, and make his pre-6 a subscription to half health." },
    yasuo:{ tldr:"Wind Wall eats Q and RQ — tether through it (W is wall-proof) and shield his dash-chain instead of racing his poke." },
    twistedfate:{ tldr:"You out-poke him at every range and your E matches his R roams — chip the card-locker and follow every Destiny with speed." }
  }
},

// ============================== LUX ==============================
{
  key:'lux', name:'Lux',
  curve:[0.3,0.3,0.4,0.3,0.5,0.5,0.3],
  lvl:[
    "E-poke from max range on his last-hits — the slow zone plus passive auto is your chip engine from level 1.",
    "Q joins: the root threat re-prices every step he takes past the wave's midline.",
    "Full kit: Q-E-auto with the passive detonations is a real chunk. Shield his answer and walk.",
    "Lost Chapter timing — E every wave contact. Bank Manaflow and hold Q for his aggression, not yours.",
    "Final Spark online — anything the root catches dies to the laser math. The lane becomes a geometry quiz.",
    "Luden's spike: Q-E-R deletes squishies from root range. Force him to dodge or die on every contact.",
    "Late Lux decides fights from a screen away: root the entry, slow the pit, and laser the clump your team froze."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'HARD', fighter:'HARD' },
  diffEx:{ syndra:'HARD', kassadin:'TRICKY',
    xerath:'TRICKY', ahri:'TRICKY', zoe:'TRICKY', azir:'TRICKY', cassiopeia:'TRICKY', vladimir:'TRICKY', malzahar:'TRICKY', hwei:'TRICKY', galio:'TRICKY', lissandra:'TRICKY',
    ziggs:'EVEN', viktor:'EVEN', orianna:'EVEN', anivia:'EVEN', taliyah:'EVEN', swain:'EVEN', ryze:'EVEN', twistedfate:'EVEN', veigar:'EVEN', annie:'EVEN', vex:'EVEN', brand:'EVEN', neeko:'EVEN', karma:'EVEN', mel:'EVEN', aurora:'EVEN' },
  vs:{
    control:{
      tldr:"A geometry war at equal range — E the contact point, hold Q for his step-up, and let the passive autos tip the ledger.",
      breakdown:"You trade evenly on spells but your passive auto-weave wins the margins: E his farm spot, detonate, auto when safe, and bank the root for his aggression. Post-6 every landed Q is a laser invoice he can't contest.",
      dos:["E his last-hit spot every cycle","Weave the passive auto after each spell","Hold Q for his step-ups, R for his roots"],
      donts:["Q-poke into a dodging target","Eat his poke during E downtime","Burn R on waves while fights spawn"],
      win:"Win the margins with passive autos, then convert one root per cycle into laser math."
    },
    burst:{
      tldr:"His combo wants him close, yours works from a postcode away — keep the fight at YOUR range and the trade never gets fair.",
      breakdown:"W is the equalizer his kit doesn't expect: shield his burst window and the exchange flips. E-poke the approach, root the commit, and remember Final Spark finishes trades he thought he survived.",
      dos:["Poke the approach before his range exists","W-shield his combo on the tell","Root the commit, laser the regret"],
      donts:["Trade inside his combo range","Hold the shield too long to use it","Waste the root on chip spacing"],
      win:"Deny his range, shield his window, and laser the half-health retreat."
    },
    assassin:{
      tldr:"You are the textbook assassin target — the lane is root-or-die, and the root better be banked when he commits.",
      breakdown:"Everything depends on Q discipline: held for the dive you survive, spent on poke you don't. Keep the wave centered, W-shield the opener, and laser the post-dive reset window. Even lanes are won lanes — his roams are where you actually lose.",
      dos:["Bank Q exclusively for his engage","Keep the wave centered and flanks warded","Shove and ping every roam window"],
      donts:["Q-poke near his engage timers","Shove past river post-6","Greed the E detonation at half HP"],
      win:"Root the dive, shield the burst, and tax the roams with permanent shove."
    },
    fighter:{
      tldr:"He fights through your slow zone if the root misses — so the root doesn't miss: bank it, bait the dash, then bind.",
      breakdown:"Dash-fighters eat E-poke all day and kill you once: poke with E only, hold Q until his gap-closer is spent, and W-shield the all-in. The laser punishes his every reset — half-health fighters can't walk to lane against you.",
      dos:["E-poke, Q only after his dash is spent","Shield the all-in's biggest hit","R the reset walk he keeps taking"],
      donts:["Root predictively into held dashes","Trade inside his reach with Q down","Stand at the wave's edge unshielded"],
      win:"Bait the dash, bind the landing, and laser the lane into a no-walk zone."
    }
  },
  mirror:{
    tldr:"Light mirror — whoever lands Q first wins each exchange; whoever burns W second wins the all-in.",
    breakdown:"Identical kits reduce to the binding war: minion-block hers, throw yours off E-slow setup, and keep the shield for her laser, not her poke.",
    dos:["Minion-block her Q permanently","Set your root up with E slow","Shield her R, never her E"],
    donts:["Trade E-for-E without the auto weave","Burn W on chip damage","Laser-duel at even HP without root"],
    win:"Land the first binding — everything else in the mirror is bookkeeping.",
    winS:"Her root is down — walk up and take the trade free."
  },
  winS:"His engage is spent — root the retreat and finish with R.",
  tradeGood:"E the contact, detonate, weave the passive auto, and keep Q visibly loaded — the chip is free and the root threat does the zoning.",
  tradeBad:"Q-poking on cooldown and facing the dive with an empty root slot — Lux without the binding banked is everyone's favorite snack.",
  waveBest:"an E-cleared slow push that crashes on your roam-or-recall timer — the slow zone makes the crash safe to set up.",
  waveWorst:"a frozen wave near his tower with Q down — the immobile root-bot walking up to farm is mid's most quoted death.",
  early:"Chip with E and the passive weave — your poke is honest and your root threat is the law. Bank Manaflow; the laser runs on it.",
  mid:"Luden's onward, every root is a kill: shove, hover the river, and Q-R the first contest. Your range decides objective setups alone.",
  late:"You are the longest 'no' in the game: root the engage, slow the pit, and laser whatever your team's front line holds still.",
  safetyTool:"W Prismatic Barrier",
  spikesLine:"Lost Chapter steadies the chip; level 6 turns roots into kills; Luden's makes Q-E-R a deletion.",
  carryLine:"Carry through the root-laser pipeline — one binding per fight, converted at screen range; your job is owning the geometry that makes it land.",
  behindShort:"farm with E clears and stay relevant through root picks.",
  loadingRule:"Bank the root for engages — Q spent on poke is a death sentence cosigned.",
  dontDetail:"Your W answers exactly one combo per fight — shield the spell that kills, not the one that stings.",
  aheadTpl:"Ahead, own the geometry: E {E} off every contact, root the answers, and laser the river fights from fog — fed Lux turns vision lines into kill lines.",
  behindTpl:"Behind, the laser still fires: E-farm from max range, bank the root for their dives, and snipe resets with R — Lux deficits are positioning problems, not damage ones.",
  spikeName:"Luden's",
  runeReport:"Arcane Comet or Aery, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight.",
  summReport:"Flash + Teleport standard; Cleanse into pick comps; Ignite only when the lane is a bully script you intend to follow.",
  itemReport:"Start Doran's Ring + 2 pots. Luden's into Sorcerer's, then Shadowflame and Rabadon's. Zhonya's vs dive — at the assassin's 6, not after.",
  jungleLine:"Q-E on arrival is a guaranteed gank: root, slow, detonate. Post-6 your R cleans the Flash they burn — ping your jungler every Mantra... every laser cycle.",
  redditLine:"the root is rent, the shield is for lasers not pokes, and the laser is for roots not waves — Lux wins by sequencing three buttons in the only correct order.",
  load:{
    sub:"r/LuxMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — the chip war funds itself",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Luden's Companion",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Luden's + Shadowflame — Q-E-R deletes squishies from root range.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall eats your entire kit — every spell. Bait it with a cheap E, root the dash-chain's END, and accept the farm lane until the wall miscounts.",
      dos:["Bait the wall before any combo","Root the last dash, not the first","Shield the tornado window on repeat"] },
    syndra:{ tldr:"She out-trades you at every stage and her R ignores your shield math — dodge the QE line, match her farm, and win the game at dragon pits instead." },
    kassadin:{ tldr:"Bully the melee mage all lane — but every spell you cast feeds his shield; poke with E placement and autos, save Q for the post-shield window." }
  }
},

// ============================== MEL ==============================
{
  key:'mel', name:'Mel',
  curve:[0.3,0.3,0.4,0.3,0.4,0.4,0.2],
  lvl:[
    "Q-volley his last-hits — the radiant barrage chips from a range most mids can't answer at one.",
    "W online: Rebuttal turns his poke into YOUR poke. The reflect re-prices every projectile in the lane.",
    "E completes the kit: the snare into full volley is your kill pattern. Hold it for real windows.",
    "Lost Chapter timing — volley every wave contact and bank the overwhelm stacks on his health bar.",
    "Golden Eclipse online — the execute threshold turns your chip war into a countdown he can see.",
    "Luden's spike: snare-volley chunks half bars and the execute cleans the remainder. Force contacts.",
    "Late Mel is a counter-artillery battery: reflect their poke, snare their dive, and execute the chipped."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'TRICKY', fighter:'HARD' },
  diffEx:{ lux:'FAVOURED', ziggs:'FAVOURED',
    xerath:'EVEN', syndra:'EVEN', zed:'EVEN', hwei:'EVEN', viktor:'EVEN', orianna:'EVEN', anivia:'EVEN', azir:'EVEN', taliyah:'EVEN', malzahar:'EVEN', swain:'EVEN', ryze:'EVEN', vladimir:'EVEN', cassiopeia:'EVEN', twistedfate:'EVEN', veigar:'EVEN', annie:'EVEN', ahri:'EVEN', zoe:'EVEN', vex:'EVEN', brand:'EVEN', neeko:'EVEN', karma:'EVEN', aurora:'EVEN', lissandra:'EVEN', kassadin:'EVEN', galio:'EVEN',
    fizz:'HARD',
    katarina:'TRICKY', leblanc:'TRICKY', akali:'TRICKY', ekko:'TRICKY', diana:'TRICKY', qiyana:'TRICKY', talon:'TRICKY', naafiri:'TRICKY', sylas:'TRICKY' },
  vs:{
    control:{
      tldr:"Your W makes his poke a liability — reflect the rotation he built his lane around and volley the confusion.",
      breakdown:"Projectile mages feed Rebuttal: hold it for his real rotation (not the chip), return it with interest, and volley the gap while his plan reloads. Track {K} and the lane is a mirror he keeps losing.",
      dos:["Hold W for his full rotation, not chip","Volley his last-hits between his windows","Snare the step-up after his reflect-loss"],
      donts:["Burn Rebuttal on single-spell poke","Trade during your W downtime","Forget which of his spells AREN'T projectiles"],
      win:"Reflect the rotation, volley the gap, and execute the chip war he can't win."
    },
    burst:{
      tldr:"His combo is a projectile parade — Rebuttal turns the parade around, and the executes clean the float.",
      breakdown:"Time W against his combo's centerpiece and the burst math collapses on his side of the lane. Snare his approach, volley the snared, and let the overwhelm stacks tick toward the execute he keeps funding.",
      dos:["Rebuttal the combo's biggest spell","Snare the approach, volley the snared","Bank overwhelm stacks every contact"],
      donts:["Reflect chip and face the combo bare","Trade at his range with W down","Spend the snare on spacing"],
      win:"Turn his combo around once, and spend the rest of the lane executing the lesson."
    },
    assassin:{
      tldr:"His dive isn't a projectile — the reflect bluff still buys space, but the snare is your real answer; bank it.",
      breakdown:"Melee assassins ignore your W's text but respect its glow: hold the bluff, snare the actual commit, and volley the rooted regret. Keep waves centered and accept that your execute punishes his resets harder than most mages can.",
      dos:["Snare the engage, volley the root","Use the W glow as spacing even vs melee","Execute his low-HP reset windows with R"],
      donts:["Burn the snare on poke","Stand past the wave's midline post-6","Trust the reflect against non-projectiles"],
      win:"Snare the dive, chip the resets, and execute the assassin who keeps leaving at 30%."
    },
    fighter:{
      tldr:"He walks through reflect bluffs and chip — the snare-volley package is your only real sentence; punctuate with range.",
      breakdown:"Dash-fighters are your hardest read: poke at max range only, snare the committed engage, and W the projectile half of mixed kits. Never let the trade reach melee — your kit has no second act there.",
      dos:["Poke only from maximum range","Snare the engage mid-dash","Reflect the ranged half of mixed kits"],
      donts:["Trade inside his reach — ever","Spend snare before the real commit","Stand still volleying against a loaded dash"],
      win:"Snare the bridge, volley the toll, and keep the fight at a range his kit resents."
    }
  },
  mirror:{
    tldr:"Mirror of mirrors — two Rebuttals staring at each other; whoever baits the other's reflect first owns the next ten seconds.",
    breakdown:"Never volley into her glowing W: bait with single Qs, count both reflect timers aloud, and spend your full rotations only in the off-window.",
    dos:["Bait her W with single volleys","Count both Rebuttal timers","Full-rotate only in her off-window"],
    donts:["Rotation-dump into her glow","Mirror her reflect timing","Snare-duel at even cooldowns"],
    win:"Win the reflect chicken — the patient mirror shatters the eager one.",
    winS:"Her Rebuttal is down — volley the whole pattern free."
  },
  winS:"His engage is spent — snare the retreat and volley it down.",
  tradeGood:"Q-volley the last-hit, bank the overwhelm stacks, and keep W glowing — the chip is free while his best spells are hostages.",
  tradeBad:"Burning Rebuttal on chip and then eating the full rotation it existed to return — the reflect is the matchup; spend it like a verdict.",
  waveBest:"a volley-thinned slow push behind a glowing W — he can't contest the crash without feeding the reflect.",
  waveWorst:"a frozen wave near his tower with W and E down — the counter-battery with no counters left is just a battery.",
  early:"Chip and bank: volleys on last-hits, stacks on his health bar, and the W glow doing the zoning. The execute math starts at minute one.",
  mid:"Luden's onward, force contacts: snare-volley the river fights, reflect their poke comp's opener, and execute everything that leaves chipped.",
  late:"You are the anti-poke and the cleanup: Rebuttal their artillery, snare their dive, and let Golden Eclipse audit every chipped health bar on the map.",
  safetyTool:"W Rebuttal",
  spikesLine:"Level 2 W re-prices the lane; level 6 starts the execute countdown; Luden's makes snare-volley half a bar.",
  carryLine:"Carry through subtraction — every reflect deletes their best spell and every execute deletes their worst decision; you win fights by accounting.",
  behindShort:"farm with volleys and stay relevant through reflect + execute utility.",
  loadingRule:"Hold Rebuttal for his rotation — the reflect is a verdict, not a flinch.",
  dontDetail:"Your W only answers projectiles — know which of his spells aren't, or the glow is just a light show.",
  aheadTpl:"Ahead, audit the lane: volley {E} off every contact, reflect his comeback attempt, and execute the deficit — Mel leads compound like interest.",
  behindTpl:"Behind, the reflect still works: farm at max range, return their poke, and bank executes — Mel from behind taxes fights she didn't win.",
  spikeName:"Luden's",
  runeReport:"Arcane Comet or First Strike, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight.",
  summReport:"Flash + Teleport standard; Cleanse into pick comps. The reflect already plays half your defensive summoner.",
  itemReport:"Start Doran's Ring + 2 pots. Luden's into Sorcerer's, then Shadowflame and Rabadon's. Zhonya's vs the divers your W can't answer.",
  jungleLine:"Snare-on-arrival is clean setup, and the reflect punishes counter-gank poke — ping your jungler when the enemy's projectile comp groups river.",
  redditLine:"reflect rotations not pokes, snare commits not spaces, and count the execute — Mel wins by making the enemy's damage a rounding error in hers.",
  load:{
    sub:"r/MelMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — volleys go infinite",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Luden's Companion",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Luden's + Shadowflame — snare-volley chunks half bars; the execute audits the rest.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    fizz:{ tldr:"Nothing he does is reflectable and everything he does is a dive — the worst matchup for your kit; snare discipline and tower-hugging are the whole script." },
    lux:{ tldr:"Her entire kit is projectiles — Rebuttal her laser back through her own root and the lane becomes a comedy you're directing.",
      dos:["Reflect the Final Spark, always","Bait her Q with the W glow","Volley her root-less windows hard"] },
    yasuo:{ tldr:"His Wind Wall and your Rebuttal cancel each other into a melee race his dashes win — snare the chain early and never volley into the wall." }
  }
},

// ============================== NEEKO ==============================
{
  key:'neeko', name:'Neeko',
  curve:[0.2,0.2,0.3,0.3,0.5,0.4,0.2],
  lvl:[
    "Q-poke the last-hits — the triple bloom on a rooted or low target already stings at one.",
    "W online: the clone walks one way, you walk the other — the lane's information war starts now.",
    "E completes the kill pattern: root into full bloom is half a health bar with ignite from level 3.",
    "Lost Chapter timing — bloom every wave contact and run clone mind-games on every reset.",
    "Pop Blossom online — the disguise plus R turns any clump into a 3-second knockup ambush.",
    "Luden's spike: root-bloom deletes squishies and the clone sells the angle. Force the contact war.",
    "Late Neeko is an ambush: disguise into their formation, R the clump, and root whatever scatters."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'TRICKY', fighter:'TRICKY' },
  diffEx:{ yasuo:'HARD', fizz:'HARD', irelia:'HARD', pantheon:'HARD', yone:'HARD',
    katarina:'EVEN', kassadin:'EVEN', ziggs:'EVEN', lux:'EVEN', viktor:'EVEN', orianna:'EVEN', anivia:'EVEN', azir:'EVEN', cassiopeia:'EVEN', vladimir:'EVEN', malzahar:'EVEN', taliyah:'EVEN', hwei:'EVEN', swain:'EVEN', ryze:'EVEN', twistedfate:'EVEN', veigar:'EVEN', annie:'EVEN', ahri:'EVEN', vex:'EVEN', brand:'EVEN', karma:'EVEN', mel:'EVEN', aurora:'EVEN', lissandra:'EVEN', galio:'EVEN',
    zed:'TRICKY', leblanc:'TRICKY', akali:'TRICKY', syndra:'TRICKY', xerath:'TRICKY', zoe:'TRICKY', ekko:'TRICKY', diana:'TRICKY', qiyana:'TRICKY', talon:'TRICKY', naafiri:'TRICKY', sylas:'TRICKY' },
  vs:{
    control:{
      tldr:"An even poke war with a lying clone — trade blooms honestly and spend the W on information he can't afford to guess wrong.",
      breakdown:"Your Q trades evenly with his kit; the clone doesn't. Send it to fake roams, fake recalls, fake engages — every wrong guess he makes is a wave or a plate. Hold E for his step-ups and the bloom math does the rest.",
      dos:["Bloom his last-hit contact each cycle","Run clone mind-games on every reset","Root the step-up, triple-bloom the root"],
      donts:["Waste E on poke spacing","Clone predictably — same trick twice is zero tricks","Trade during his key-spell window"],
      win:"Break even on spells and win on lies — the clone taxes every guess he makes."
    },
    burst:{
      tldr:"His combo wants certainty — your whole champion is doubt. Root the real engage and bloom the body that guessed wrong.",
      breakdown:"The clone eats skillshots his combo needed: walk them side-by-side at trade range and his setup spell has a coin-flip target. Root his commit, bloom the root, and hold R for the all-in he eventually forces blind.",
      dos:["Walk the clone at trade range as a decoy","Root his commit the moment it shows","R the all-in he takes on bad information"],
      donts:["Trade while his setup spell is loaded","Spend the root on chip","Disguise-engage without R ready"],
      win:"Make his certainty cost a clone-guess, then root-bloom the mistake."
    },
    assassin:{
      tldr:"He dives a champion who might be a minion — the clone and root buy the seconds his combo can't afford to lose.",
      breakdown:"Survival is layered lies: clone the recall, disguise in the wave, root the dive that picks wrong. Post-6, the self-R punishes his commit outright — crouch in the wave and let Pop Blossom answer the assassination attempt.",
      dos:["Hold E strictly for his engage","Disguise in the wave when he hits 6","Self-R the committed dive"],
      donts:["Spend the clone on idle fakes near his timers","Shove past river without the root banked","Greed blooms at half HP"],
      win:"Lie until he commits wrong, then root-R the dive into a counter-kill."
    },
    fighter:{
      tldr:"He runs down the real you if he finds it — root the charge, bloom the root, and keep two Neekos between you and the truth.",
      breakdown:"Dash-fighters punish the bloom's cast time, so sequence backward: E first always, Q the rooted target, and W-clone the disengage so the chase splits wrong. The R is your all-in insurance — crouch, pop, and walk out of the crater.",
      dos:["Root first, bloom second — always here","Clone the disengage to split his chase","Self-R his all-in commit"],
      donts:["Q-poke inside his engage range","Save E for 'a better window' that won't come","Trade extended past the root"],
      win:"Root the run-down, bloom the toll, and let the crater answer the all-in."
    }
  },
  mirror:{
    tldr:"Clone mirror — four Neekos, two truths; whoever roots the real one first wins the only fight that happens.",
    breakdown:"Track her clone tells (clones don't last-hit), root the real body, and never disguise-engage into a held E. The R standoff goes to whoever crouches second.",
    dos:["Watch which body last-hits — that's her","Root the truth, ignore the lie","Crouch your R second in all-ins"],
    donts:["E the clone — fourteen seconds of regret","Mirror her disguise games","Pop first into her held root"],
    win:"Find the truth first and root it — the mirror is an epistemology exam.",
    winS:"Her root is down — the real you can finally walk forward."
  },
  winS:"His engage is spent — root the retreat and bloom it.",
  tradeGood:"E his step-up, Q the rooted target for all three blooms, auto the passive, walk — the full package is half a bar at level 3.",
  tradeBad:"Q-poking with E banked 'for safety' until the lane forgets your kill threat exists — the root IS the threat; the bloom is just the receipt.",
  waveBest:"a bloom-cleared push that crashes while your clone walks somewhere worth lying about — every shove is also a misdirection.",
  waveWorst:"a frozen wave near his tower with E down and the clone on cooldown — one honest Neeko is half a champion.",
  early:"Poke blooms and tell lies — your trades are even and your information war isn't. Every clone he answers wrong is tempo.",
  mid:"Post-6, hunt clumps: disguise into the wave, R the river contest, root the scatter. One good crouch is a won objective.",
  late:"You are the ambush their comp can't draft against: disguise, flank, Pop Blossom on three, root the survivors. The clone scouts the setup for free.",
  safetyTool:"W Shapesplitter clone",
  spikesLine:"Level 3 root-bloom is the kill pattern; level 6 adds the ambush; Luden's makes the package lethal.",
  carryLine:"Carry through deception — every fight you start disguised begins 5v4 in spirit; your job is the patience the crouch demands.",
  behindShort:"farm with blooms and stay relevant through root picks and clone scouting.",
  loadingRule:"Root before bloom — E-Q is the sentence, Q alone is a comment.",
  dontDetail:"The clone is your scout, your fake, and your escape — spending it on idle tricks near assassin timers is how Neekos get audited.",
  aheadTpl:"Ahead, weaponize the lies: zone {E} with root threat, fake roams that cost him plates either way, and crouch the river fights — fed Neeko is a horror film.",
  behindTpl:"Behind, lie harder: clone-cover your farm, hold the root for dives, and save R for their clump — one ambush resets any deficit Neeko respects.",
  spikeName:"Luden's",
  runeReport:"Electrocute, Cheap Shot, Eyeball Collection, Ultimate Hunter; secondary Sorcery — Manaflow + Transcendence.",
  summReport:"Flash + Ignite into kill lanes (the root-bloom-ignite math is rude); Flash + TP when the matchup reads survival.",
  itemReport:"Start Doran's Ring + 2 pots. Luden's into Sorcerer's, then Shadowflame and Rabadon's. Zhonya's vs dive — cast it mid-Pop Blossom for maximum comedy.",
  jungleLine:"Root-on-arrival plus a clone that fakes the retreat lane — Neeko ganks convert absurdly; ping your jungler whenever E is banked and {E} is shoved.",
  redditLine:"root first bloom second, lie with purpose, and crouch where they group — Neeko wins by making information the most expensive resource in the game.",
  load:{
    sub:"r/NeekoMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — blooms go sustainable",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Luden's Companion",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Luden's + Shadowflame — root-bloom deletes squishies; the crouch deletes teams.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Cheap Shot","Eyeball Collection","Ultimate Hunter"], tree:"Sorcery", secondary:["Manaflow Band","Transcendence"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall eats your root and blooms, and his dashes find the real you fast — clone-feint his wall out FIRST, then root the dash-chain behind it.",
      dos:["Feint with the clone to burn the wall","Root the chain's last dash","Never bloom into an up wall"] },
    fizz:{ tldr:"His E dodges the root, the bloom, AND the crouch — the kit counter; hug tower post-6 and spend the clone on pure survival information." },
    katarina:{ tldr:"Your root interrupts her resets and your R deletes her Lotus — stand near your wave, root the Shunpo, and crouch when she commits.",
      dos:["Root her Shunpo arrival","Self-R her Death Lotus dive","Clone-split so her daggers guess wrong"] }
  }
}
];

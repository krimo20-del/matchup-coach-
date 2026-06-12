// MatchupCoach — SUPPORT generator configs batch 3: Alistar, Braum, Galio, Leona, Maokai, Poppy.
function _supBase3(o){ return Object.assign({
  curve:[0.2,0.3,0.3,0.3,0.3,0.3,0.2],
  winS:"His answer is spent — start the chain with your carry ready.",
  waveBest:"a lane your carry holds at the midline while your engage threat zones — the wave is bait and you are the trap.",
  waveWorst:"a shoved wave with your engage on cooldown — the tank with no buttons is furniture with a ward.",
  behindShort:"peel only and rebuild through vision and engage discipline.",
  loadingRule:"Engage when their answer is down — the chain only needs one clean start.",
  summReport:"Flash + Ignite into kill lanes, Flash + Exhaust into burst duos — your engage IS the second summoner.",
  jungleLine:"Your engage plus jungler arrival is a guaranteed kill — ping the windows when their disengage shows.",
  tradeGood:"Bait the answer, start the chain, and let your carry collect — engage trades are all-or-nothing; pick the all.",
  tradeBad:"Engaging into a banked disengage — the chain that starts answered is a donation with armor.",
  early:"Zone with the threat — the engage you don't use governs more than the one you do.",
  mid:"Chain economy: convert the ganks, start the rivers, peel the picks.",
  late:"You start the fights your team finishes — chain the carry, peel the counter, hold the line.",
  spikesLine:"Level 2-3 chains govern; level 6 hardens the all-in; first item funds the front line.",
  carryLine:"Carry by starting it — one clean chain per fight; your carry does the arithmetic.",
  runeReport:"Aftershock, Font of Life, Bone Plating, Unflinching; secondary Inspiration — Biscuits + Cosmic Insight.",
  itemReport:"World Atlas start. Locket or Zeke's line, Mobility-Mercs by lane, then Knight's Vow paths.",
}, o); }
window.GEN_SUP_CFGS_3 = [

_supBase3({
  key:'alistar', name:'Alistar',
  lvl:[
    "Trade autos behind the roar sustain — the cow chips politely until level 2 changes religions.",
    "W-Q online — the combo is live and every squishy support is now flash-range nervous.",
    "Full kit: headbutt-pulverize the carry off any wave state; trample the disengage.",
    "Zone with combo threat — their carry farms at the range your W defines.",
    "Unbreakable Will online — tower dives become appointments; the cow ignores the counter-CC.",
    "First item: the front line holds and the combos chain into jungler arrivals.",
    "Late Alistar opens and survives: combo the carry, ult the focus, and trample the cleanup."
  ],
  diffBase:{ enchanter:'FAVOURED', warden:'EVEN', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ janna:'EVEN', lulu:'EVEN', milio:'EVEN', morgana:'TRICKY',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'TRICKY', neeko:'TRICKY',
    soraka:'FAVOURED', sona:'FAVOURED', yuumi:'FAVOURED', seraphine:'EVEN', nami:'EVEN', senna:'EVEN', zilean:'EVEN', renata:'EVEN', karma:'TRICKY',
    blitzcrank:'EVEN', thresh:'EVEN', pyke:'EVEN', nautilus:'EVEN', rakan:'EVEN', bard:'EVEN',
    braum:'EVEN', galio:'EVEN', leona:'EVEN', maokai:'EVEN', poppy:'EVEN', rell:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"Their shields answer chip, not cows — combo the carry through the math and trample the apology.",
      breakdown:"Enchanter kits insure trades, not W-Q combos: bait the shield with auto threat, then run the full stampede.",
      dos:["Bait the shield before the combo","W-Q the carry, not the healer","Trample the disengage attempt"],
      donts:["Chip into their sustain politely","Combo the support for pride","Wait for a perfect wave forever"],
      win:"Out-violence the insurance class."
    },
    warden:{
      tldr:"An engage mirror — whoever's chain starts first finishes first; bait his and start yours.",
      breakdown:"Trade engage threats and hold yours one beat longer; the counter-combo always collects more.",
      dos:["Bait his chain with spacing","Combo second, harder","Peel with Q if he starts first"],
      donts:["Engage-race at even cooldowns","Trade tank stats politely","Burn R before his chain shows"],
      win:"Second chain wins the warden war."
    },
    catcher:{
      tldr:"His hook and your headbutt want the same fight — yours is point-and-click; start it.",
      breakdown:"Dodge the hook behind minions and answer with the combo — a caught cow is also a delivered cow.",
      dos:["Stand behind minions pre-combo","Combo the hook's cooldown window","Q-peel the catch that lands"],
      donts:["Eat the hook walking up","Engage into his banked chain","Trade at his catch tempo"],
      win:"Out-start the catcher — point-and-click beats aim."
    },
    mage:{
      tldr:"He pokes the pasture — close once per rotation and make the visit cost the lane.",
      breakdown:"Poke supports tax your approach: eat the chip at the edges, then combo the cooldown gap with everything.",
      dos:["Engage strictly in rotation gaps","Eat poke at maximum range only","R the burst if you must dive the zone"],
      donts:["Walk the zone at half HP","Combo into a banked root","Trade chip with a cow's kit"],
      win:"Survive the chip and deliver the stampede once."
    }
  },
  mirror:{
    tldr:"Cow mirror — combo chicken; whoever headbutts second headbutts a committed target.",
    breakdown:"Bait his W with spacing and combo the recovery; the R war answers itself.",
    dos:["Combo second, always","Bait the headbutt range","R second in the dive war"],
    donts:["W-duel at even range","Trade trample ticks","Engage his banked R"],
    win:"Second stampede wins.",
    winS:"His combo is down — your carry trades free."
  },
  safetyTool:"R Unbreakable Will",
  dontDetail:"The W sends THEM flying — headbutting the carry out of your own Q is the oldest cow blooper reel.",
  aheadTpl:"Ahead, stampede: combo {E}'s carry off every wave and dive with the R discount.",
  behindTpl:"Behind, peel: Q the divers, headbutt the focus, and rebuild through engage discipline.",
  spikeName:"first item",
  redditLine:"W into Q not through it, bait the shield first, and dive like the R is a religion — Alistar wins fights he starts.",
  load:{ sub:"r/AlistarMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Bramble piece vs sustain duos", antihealNote:"Anti-heal into their sustain.", firstItem:"Locket / Zeke's", secondItem:"Knight's Vow path", boots:"Mercury's / Steelcaps", bootsVsAP:"Mercury's", bootsVsAD:"Steelcaps", spike:"First item — the front line holds and the combos chain.", runes:{ keystone:"Aftershock", primaryTree:"Resolve", primary:["Font of Life","Bone Plating","Unflinching"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    morgana:{ tldr:"The black shield eats your combo's whole thesis — pop it with the trample tick or auto threat BEFORE the W-Q." },
    janna:{ tldr:"The tornado un-headbutts the headbutt — bait the gale with a feint walk-up, then combo the cooldown." }
  }
}),

_supBase3({
  key:'braum', name:'Braum',
  lvl:[
    "Q-poke the contacts — the stack passive means your carry's autos are CC in progress.",
    "Concussive trades begin: three hits and the stun votes; trade in stack windows.",
    "Full kit: E eats their poke and W teleports the peel — the lane plays through your shield.",
    "Stack the margins — every traded auto is a quarter-stun; their math hates it.",
    "Glacial Fissure online — the line knockup starts dives and ends theirs.",
    "First item: the wall hardens and the stack windows chain into kills.",
    "Late Braum is the wall: E their teamfight's biggest cast, R their engage, stun whoever touches the carry."
  ],
  diffBase:{ enchanter:'EVEN', warden:'EVEN', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ blitzcrank:'FAVOURED', thresh:'EVEN', pyke:'EVEN', nautilus:'EVEN', rakan:'EVEN', bard:'EVEN',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'EVEN', morgana:'EVEN', neeko:'EVEN',
    soraka:'EVEN', janna:'EVEN', lulu:'EVEN', milio:'EVEN', nami:'EVEN', sona:'FAVOURED', seraphine:'EVEN', senna:'EVEN', yuumi:'EVEN', zilean:'EVEN', renata:'EVEN', karma:'EVEN',
    alistar:'EVEN', galio:'EVEN', leona:'EVEN', maokai:'EVEN', poppy:'EVEN', rell:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"Their sustain answers chip — your stacks answer their carry's face; trade in stun windows.",
      breakdown:"Q the contacts and let your carry's autos carry the count; the concussive math beats heal margins.",
      dos:["Open stacks with Q on contact","Count to four with your carry","E their poke's biggest cast"],
      donts:["Chip-duel their sustain","Stack onto the support","Wall reactively at half value"],
      win:"Out-stun the sustain margins."
    },
    warden:{
      tldr:"An engage mirror your wall referees — eat his chain's projectile link and stun the rest.",
      breakdown:"Bait his engage, E the cast that travels, and W-Q the recovery; the counter-warden always collects.",
      dos:["E the chain's projectile link","W to the target he picked","Stun the post-engage window"],
      donts:["Engage-race the warden","Wall his poke for sport","Trade his flash window"],
      win:"Referee the engage war and counter-stun it."
    },
    catcher:{
      tldr:"The hook meets a shield the size of a door — eat it, then stun the hand that threw it.",
      breakdown:"Your E deletes the hook's whole thesis: hold it for the throw, W the caught if you miss, and stack the counter-trade.",
      dos:["E the hook itself — it's a projectile","W-peel the caught instantly","Stack the counter-trade window"],
      donts:["E the poke instead of the hook","Stand wall-less in hook lanes","Trade at his catch tempo"],
      win:"Door-check the catch class."
    },
    mage:{
      tldr:"He pokes around the door — E the rotation's centerpiece and stack the gaps.",
      breakdown:"The wall eats one big cast per fight; spend it on the keystone and trade autos in the silence.",
      dos:["E the keystone cast exactly","Trade stacks in the cooldown gap","R the all-in his poke funds"],
      donts:["Wall the chip","Stand zone-center stacking","Trade at his max range"],
      win:"Door the keystone and stun the silence."
    }
  },
  mirror:{
    tldr:"Door mirror — wall chicken and stack races; whoever Es the more important cast wins.",
    breakdown:"Bait his wall with feints, stack first, and R second — his fissure shows your line.",
    dos:["Bait his E with feint casts","Win the stack race","R second along his line"],
    donts:["Wall-duel at even timers","Trade Qs through his door","Fissure first"],
    win:"Better door economics wins.",
    winS:"His wall is down — every projectile lands; commit."
  },
  safetyTool:"E Unbreakable",
  dontDetail:"The door eats ONE direction — flanks ignore the poro's whole thesis; angle it honestly.",
  aheadTpl:"Ahead, hold the door open: stack {E}'s carry into stun debt and fissure the recovery.",
  behindTpl:"Behind, the door still holds: E their snowball's casts, W the focus, and rebuild behind the shield.",
  spikeName:"first item",
  redditLine:"door the cast that matters, count to four out loud, and W to the problem — Braum wins by standing in the way.",
  load:{ sub:"r/BraumMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Bramble piece vs sustain", antihealNote:"Anti-heal into their sustain.", firstItem:"Locket / Knight's Vow", secondItem:"Zeke's path", boots:"Mercury's / Steelcaps", bootsVsAP:"Mercury's", bootsVsAD:"Steelcaps", spike:"First item — the door hardens and stacks chain.", runes:{ keystone:"Guardian", primaryTree:"Resolve", primary:["Font of Life","Bone Plating","Unflinching"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    blitzcrank:{ tldr:"Your E eats his entire champion — hold the door for the hook and the lane is a farming documentary." },
    zyra:{ tldr:"The garden pokes around doors — E the root, stand off the seed lines, and stack only in her cooldown gaps." }
  }
}),

_supBase3({
  key:'galio', name:'Galio',
  lvl:[
    "Q the pair — the tornado tick chips duos that stand in formation.",
    "W charge threat begins: the taunt governs their engage plans already.",
    "Full kit: E-W the committed trade and the magic shield refunds their poke.",
    "Zone with taunt threat and shield the margins — AP duos pay double rent.",
    "Hero's Entrance online — every roam your duo survives, you end.",
    "First item: the taunt rotation chunks and the MR makes mage supports cry.",
    "Late Galio is the anti-dive: taunt their engage off your carry and R the map's emergencies."
  ],
  diffBase:{ enchanter:'EVEN', warden:'EVEN', catcher:'EVEN', mage:'EVEN' },
  diffEx:{ zyra:'EVEN', brand:'FAVOURED', velkoz:'EVEN', xerath:'TRICKY', lux:'EVEN', hwei:'FAVOURED', swain:'EVEN', morgana:'FAVOURED', neeko:'FAVOURED',
    soraka:'FAVOURED', janna:'EVEN', lulu:'EVEN', milio:'EVEN', nami:'EVEN', sona:'FAVOURED', seraphine:'FAVOURED', senna:'EVEN', yuumi:'FAVOURED', zilean:'EVEN', renata:'EVEN', karma:'EVEN',
    blitzcrank:'EVEN', thresh:'EVEN', pyke:'EVEN', nautilus:'EVEN', rakan:'EVEN', bard:'EVEN',
    alistar:'EVEN', braum:'EVEN', leona:'EVEN', maokai:'EVEN', poppy:'EVEN', rell:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"Their kits are magic and yours eats magic — taunt the carry through the shields and bill the rest.",
      breakdown:"The passive shield refunds enchanter poke; close with E-W on the gaps and the insurance class meets a statue.",
      dos:["Shield-trade their chip for free","E-W the carry on cooldown gaps","Q the pair's formation per wave"],
      donts:["Chip-duel at their range","Taunt the support for sport","Charge W through warded brush"],
      win:"Eat the magic and taunt the margins."
    },
    warden:{
      tldr:"An engage mirror your taunt referees — his chain starts fights; yours redirects them.",
      breakdown:"Bait his engage and W the diver mid-chain — a taunted warden hits a statue while your carry votes.",
      dos:["Taunt his chain mid-flight","E the recovery window","Shield-bait his poke links"],
      donts:["Engage-race at even cooldowns","W on feints","Trade his flash window evenly"],
      win:"Redirect the engage war — statues don't flinch."
    },
    catcher:{
      tldr:"His catch meets a taunt-shaped refund — shield the chain and W whoever follows the hook in.",
      breakdown:"The hook starts it; your W ends it: taunt the diver, shield the caught, and Q the regroup.",
      dos:["W the post-hook diver instantly","Shield the caught carry","Stand taunt-range of your carry"],
      donts:["Eat the hook charging W","Taunt the hook's owner across the lane","Trade at his catch tempo"],
      win:"Refund the catch with a taunt receipt."
    },
    mage:{
      tldr:"He pokes a magic sponge — shield the rotation, dodge the root, and taunt the conversion.",
      breakdown:"Your MR math beats mage supports at even items: eat the chip, close on the gaps, and W the all-in attempt.",
      dos:["Shield-eat the rotation freely","E-W the cooldown gaps","Taunt the all-in mid-cast"],
      donts:["Eat the AD carry's autos instead","Charge through the zone blind","Trade at artillery range"],
      win:"Sponge the poke and taunt the plan."
    }
  },
  mirror:{
    tldr:"Statue mirror — taunt chicken; whoever charges second charges the committed.",
    breakdown:"Bait his W with feint walks and charge the recovery; the R war goes to the better map reader.",
    dos:["Charge second, always","Bait with feint approaches","R the better side fight"],
    donts:["W-duel at even charge","Trade Q ticks for pride","R the same fight he does"],
    win:"Second taunt, better map.",
    winS:"His taunt is down — your duo trades free."
  },
  safetyTool:"W Shield of Durand",
  dontDetail:"The R needs a parked lane — channeling mid-crash donates two waves and the tower's opinion.",
  aheadTpl:"Ahead, tax both maps: taunt {E}'s duo off every contact and R the fights your roams find.",
  behindTpl:"Behind, the statue holds: shield the dives, taunt their engage, and arrive where the R is needed.",
  spikeName:"first item",
  redditLine:"shield the magic, taunt the commit, park the wave before the R — support Galio wins three lanes from bot.",
  load:{ sub:"r/GalioMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Oblivion Orb piece vs sustain", antihealNote:"Anti-heal into their sustain.", firstItem:"Locket / Hollow Radiance piece", secondItem:"Abyssal / Knight's Vow", boots:"Mercury's", bootsVsAP:"Mercury's", bootsVsAD:"Steelcaps", spike:"First MR item — mage lanes become donations.", runes:{ keystone:"Aftershock", primaryTree:"Resolve", primary:["Shield Bash","Second Wind","Overgrowth"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    xerath:{ tldr:"Artillery from beyond taunt range — the one mage your sponge can't reach; shield the carry and spend the lane R-ing elsewhere." },
    brand:{ tldr:"His whole rotation feeds your shield and your MR — taunt the ablaze-stun window and bill the arsonist." }
  }
}),

_supBase3({
  key:'leona', name:'Leona',
  lvl:[
    "Auto-trade behind passive marks — your carry's follow-up hits harder than the lane reads.",
    "E-Q online — the chain is live and the lane's geometry answers to your blade.",
    "Full chain: E-Q-W locks a carry for the full duo rotation; pick the window.",
    "Zone with chain threat — their carry farms where your E says.",
    "Solar Flare online — dives start from two screens and the sun votes center-stun.",
    "First item: the chain hardens and every landed E is a kill.",
    "Late Leona starts everything: flare the entry, chain the carry, eclipse the answer."
  ],
  diffBase:{ enchanter:'FAVOURED', warden:'EVEN', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ janna:'TRICKY', lulu:'TRICKY', milio:'TRICKY', morgana:'TRICKY',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'TRICKY', neeko:'TRICKY',
    soraka:'FAVOURED', sona:'FAVOURED', yuumi:'FAVOURED', seraphine:'FAVOURED', nami:'EVEN', senna:'FAVOURED', zilean:'EVEN', renata:'EVEN', karma:'TRICKY',
    blitzcrank:'EVEN', thresh:'EVEN', pyke:'EVEN', nautilus:'EVEN', rakan:'EVEN', bard:'EVEN',
    alistar:'EVEN', braum:'EVEN', galio:'EVEN', maokai:'EVEN', poppy:'EVEN', rell:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"Their shields delay the chain by one link — start it anyway; the sun doesn't negotiate with insurance.",
      breakdown:"Bait the shield with auto threat, then run E-Q-W through the refund; enchanter math loses to lockdown.",
      dos:["Bait the shield pre-chain","Chain the carry through the refund","Zone with E threat between windows"],
      donts:["Chip-trade their sustain","Chain the support","Wait for perfect — good enough is lethal"],
      win:"Lock the insurance class through its own paperwork."
    },
    warden:{
      tldr:"An engage mirror at high noon — whoever chains second chains a stunned target.",
      breakdown:"Bait his start with spacing and counter-chain the recovery; the second sun always sets last.",
      dos:["Counter-chain his recovery","Bait with blade-range feints","W the trade he starts"],
      donts:["Engage-race at even chains","Trade tank stats politely","Flare the feint"],
      win:"Second chain wins the noon duel."
    },
    catcher:{
      tldr:"His hook and your blade want the same carry — yours roots on the way in; race him to it.",
      breakdown:"Dodge the hook behind minions and answer with E — the chain you start beats the catch he aims.",
      dos:["Stand behind minions pre-chain","E the hook's cooldown window","Q-lock what his catch missed"],
      donts:["Eat the hook walking the line","Chain into his banked peel","Trade catches at even tempo"],
      win:"Out-start the catch class — roots beat aims."
    },
    mage:{
      tldr:"He pokes the approach your chain needs — eat the rent at the edges and chain the rotation gap once.",
      breakdown:"Poke supports tax your geometry: hold the E until his keystone shows, then chain everything into the silence.",
      dos:["Chain strictly in rotation gaps","Eat poke at maximum range","Flare the zone he casts from"],
      donts:["Walk the zone at half HP","E into a banked root","Trade chip with a sword"],
      win:"Pay the rent once and foreclose with the chain."
    }
  },
  mirror:{
    tldr:"Sun mirror — chain chicken; the second blade roots a committed Leona.",
    breakdown:"Bait her E with feint walks, counter-chain the landing, and flare second.",
    dos:["Counter-chain her landing","Bait the blade with feints","Flare second along her angle"],
    donts:["E-duel at even cooldowns","Trade W ticks for pride","Flare the feint"],
    win:"Second sunrise wins.",
    winS:"Her blade is down — your duo trades free."
  },
  safetyTool:"W Eclipse",
  dontDetail:"The E pulls YOU to them — chaining into a 2v1 collapse delivers the sun to the wrong funeral.",
  aheadTpl:"Ahead, eclipse the lane: chain {E}'s carry off every wave and flare the recovery attempts.",
  behindTpl:"Behind, peel: Q the divers, eclipse the focus, and rebuild through chain discipline.",
  spikeName:"first item",
  redditLine:"bait the shield, chain the carry, and flare center-stun — Leona wins every fight she starts on time.",
  load:{ sub:"r/LeonaMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Bramble piece vs sustain", antihealNote:"Anti-heal into their sustain.", firstItem:"Locket / Zeke's", secondItem:"Knight's Vow path", boots:"Mercury's / Steelcaps", bootsVsAP:"Mercury's", bootsVsAD:"Steelcaps", spike:"First item — every landed E is a kill window.", runes:{ keystone:"Aftershock", primaryTree:"Resolve", primary:["Font of Life","Bone Plating","Unflinching"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    morgana:{ tldr:"The black shield eats your entire chain — pop it with an auto-W trade FIRST or chain the spellshield-less half of the duo." },
    janna:{ tldr:"The tornado un-chains the chain mid-blade — bait the gale with a feint E walk, then chain the twelve-second silence." }
  }
}),

_supBase3({
  key:'maokai', name:'Maokai',
  lvl:[
    "Sapling the brush — the lane's hedges are yours now; trades start with a tree's consent.",
    "W threat begins: the point-click root governs their carry's spacing.",
    "Full kit: E-zone the trades, W the commits, Q the disengage — the swamp votes.",
    "Sustain the margins with passive heals and sapling chip — attrition is a tree's game.",
    "Nature's Grasp online — the root wave starts fights from fog and ends dives in it.",
    "First item: the roots chain and the saplings tax every brush.",
    "Late Maokai is the engage forest: R the formation, W the carry, and Q whatever the roots deliver."
  ],
  diffBase:{ enchanter:'EVEN', warden:'EVEN', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'EVEN', morgana:'TRICKY', neeko:'EVEN',
    soraka:'FAVOURED', janna:'EVEN', lulu:'EVEN', milio:'EVEN', nami:'EVEN', sona:'FAVOURED', seraphine:'EVEN', senna:'EVEN', yuumi:'FAVOURED', zilean:'EVEN', renata:'EVEN', karma:'EVEN',
    blitzcrank:'EVEN', thresh:'EVEN', pyke:'EVEN', nautilus:'EVEN', rakan:'EVEN', bard:'EVEN',
    alistar:'EVEN', braum:'EVEN', galio:'EVEN', leona:'EVEN', poppy:'EVEN', rell:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"Their sustain answers chip — your W answers their carry directly; root the windows.",
      breakdown:"Sapling the brush they sustain from and W-root the carry's trade attempts; attrition favors bark.",
      dos:["Sapling their sustain brush","W the carry's trade windows","Heal-trade the margins patiently"],
      donts:["Chip-race their heals","Root the support","Spend saplings on the wave"],
      win:"Out-attrition the insurance class with roots."
    },
    warden:{
      tldr:"An engage mirror your saplings scout — his chain walks through your intel; root the conclusion.",
      breakdown:"Sapling his engage paths and counter-root the commit; the informed tree always votes last.",
      dos:["Sapling his approach lanes","W the chain's diver","E-zone the recovery"],
      donts:["Engage-race blind","Trade tank stats politely","R the feint"],
      win:"Scout the engage war and root its loser."
    },
    catcher:{
      tldr:"His hook fishes a forest — saplings light the brush and your W answers the catch.",
      breakdown:"The catcher's fog game dies to sapling vision; root the post-hook chain and Q the cleanup.",
      dos:["Sapling every hook brush","W the post-catch chain","Stand root-range of your carry"],
      donts:["Eat the hook placing saplings","Root the hook's owner across the lane","Trade at his tempo"],
      win:"Light the fog and root the fisherman."
    },
    mage:{
      tldr:"He pokes the bark — sustain through the chip, sapling his casting spots, and root the conversion.",
      breakdown:"Poke taxes trees slowly: passive-heal the margins, zone with saplings, and W the all-in his mana funds.",
      dos:["Sustain the chip patiently","Sapling his favorite cast spots","Root the conversion attempt"],
      donts:["Trade at his max range","Walk the zone for sapling spots","Q the poke instead of the dive"],
      win:"Out-patience the poke and root its plan."
    }
  },
  mirror:{
    tldr:"Forest mirror — sapling economy and root chicken; the better-lit swamp wins.",
    breakdown:"Out-sapling the brush war, dodge his Q shove, and R second — his wave shows your angle.",
    dos:["Win the brush-light war","Root second with information","R along his committed line"],
    donts:["Sapling-duel the same bush","Trade roots at even cooldowns","R the feint"],
    win:"Better lighting, later roots.",
    winS:"His root is down — your duo trades free."
  },
  safetyTool:"Q Bramble Smash",
  dontDetail:"The W roots YOU in place mid-flight — diving into a collapse delivers the tree to the chipper.",
  aheadTpl:"Ahead, forest the lane: root {E}'s carry off every window and R the recovery formations.",
  behindTpl:"Behind, the swamp holds: sapling the chokes, root their dives, and out-sustain the deficit.",
  spikeName:"first item",
  redditLine:"saplings are wards that fight, the W is point-and-click — Maokai wins by lighting the map and rooting its mistakes.",
  load:{ sub:"r/MaokaiMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Bramble piece vs sustain", antihealNote:"Anti-heal into their sustain.", firstItem:"Locket / Zeke's", secondItem:"Knight's Vow path", boots:"Mercury's / Steelcaps", bootsVsAP:"Mercury's", bootsVsAD:"Steelcaps", spike:"First item — the roots chain and the saplings govern brush.", runes:{ keystone:"Guardian", primaryTree:"Resolve", primary:["Font of Life","Bone Plating","Overgrowth"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    zyra:{ tldr:"Garden versus forest — her plants out-chip your saplings; root the E window and let the bark out-sustain the thorns." },
    morgana:{ tldr:"The black shield eats your point-and-click thesis — pop it with saplings or Q before any real root." }
  }
}),

_supBase3({
  key:'poppy', name:'Poppy',
  lvl:[
    "Q the contacts — the hammer chunk is honest and the passive shield toss annoys.",
    "W governs dashes already — their mobility kit just lost its lane privileges.",
    "Full kit: E the wall-adjacent and Q the pinned — the lane's geometry is a weapon.",
    "Zone with W threat — engage supports pay a no-dash tax to play.",
    "Keeper's Verdict online — the dive that survives everything still flies home.",
    "First item: the pins chunk and the W deletes engage comps.",
    "Late Poppy un-dives: W their mobility, E their carry into walls, and R the unstoppable problem."
  ],
  diffBase:{ enchanter:'EVEN', warden:'FAVOURED', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ rakan:'FAVOURED', alistar:'FAVOURED', rell:'FAVOURED', leona:'EVEN', nautilus:'EVEN', blitzcrank:'EVEN', thresh:'EVEN', pyke:'FAVOURED', bard:'EVEN',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'EVEN', morgana:'EVEN', neeko:'EVEN',
    soraka:'EVEN', janna:'EVEN', lulu:'EVEN', milio:'EVEN', nami:'EVEN', sona:'FAVOURED', seraphine:'EVEN', senna:'EVEN', yuumi:'EVEN', zilean:'EVEN', renata:'EVEN', karma:'EVEN',
    braum:'EVEN', galio:'EVEN', maokai:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"Their kit insures trades — your E uninsures the carry against the nearest wall.",
      breakdown:"Pin the carry on the lane's walls and Q the held; enchanter shields don't answer terrain.",
      dos:["E the carry onto lane walls","Q the pinned immediately","Shield-toss the chip margins"],
      donts:["Chip-duel their sustain","Pin the support","E without a wall in the math"],
      win:"Uninsure the carry against architecture."
    },
    warden:{
      tldr:"His engage is a dash and you are the anti-dash — the W deletes his whole opening chapter.",
      breakdown:"Hold W for his chain's dash link and the engage comp becomes a walking simulator.",
      dos:["W his chain's dash exactly","E the stranded diver","Q the grounded regret"],
      donts:["W the feint","Engage-race when you can veto","R the poke"],
      win:"Veto the dash class — the hammer reads the fine print."
    },
    catcher:{
      tldr:"His hook isn't a dash — respect it; but everything after it is, and the W owns that half.",
      breakdown:"Dodge the hook honestly and W the follow-up chain; the catch without its dive is a rope trick.",
      dos:["Stand behind minions for the hook","W the post-hook dive","E the chain's second body"],
      donts:["W the hook — it isn't a dash","Trade at catch tempo","Pin into his collapse"],
      win:"Concede the rope and confiscate the dive."
    },
    mage:{
      tldr:"He pokes around the hammer — eat the rent, pin the rotation gap, and R the all-in artillery.",
      breakdown:"Poke supports out-range the pin: trade at the edges, E the gap once per rotation, and verdict the dive his zone funds.",
      dos:["Pin strictly in rotation gaps","Eat the chip at max range","R the committed all-in home"],
      donts:["Walk the zone for pins","W the poke","Trade chip with a hammer"],
      win:"Pay the rent once and pin the foreclosure."
    }
  },
  mirror:{
    tldr:"Hammer mirror — W chicken and wall geometry; whoever pins second pins the committed.",
    breakdown:"Bait her E with wall-adjacent feints and counter-pin the landing; the R war answers itself.",
    dos:["Counter-pin her landing","Bait with wall feints","R second in the verdict war"],
    donts:["E-duel at even walls","W her walk-up","Verdict the feint"],
    win:"Second hammer wins.",
    winS:"Her W is down — dash freely; the zone is gone."
  },
  safetyTool:"W Steadfast Presence",
  dontDetail:"The R channel telegraphs across the map — tap-R the dive instead when the fight needs you present.",
  aheadTpl:"Ahead, hammer the geometry: pin {E}'s carry off every wall and veto the recovery engages.",
  behindTpl:"Behind, the veto holds: W their snowball dives, R the worst threat home, and rebuild behind the hammer.",
  spikeName:"first item",
  redditLine:"walls are ammunition, dashes are appointments you cancel — Poppy wins by reading mobility its rights.",
  load:{ sub:"r/PoppyMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Bramble piece vs sustain", antihealNote:"Anti-heal into their sustain.", firstItem:"Locket / Zeke's", secondItem:"Knight's Vow path", boots:"Mercury's / Steelcaps", bootsVsAP:"Mercury's", bootsVsAD:"Steelcaps", spike:"First item — the pins chunk and the W deletes engage comps.", runes:{ keystone:"Aftershock", primaryTree:"Resolve", primary:["Font of Life","Bone Plating","Unflinching"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    rakan:{ tldr:"His entire kit is dashes your W reads aloud — hold the zone for the Grand Entrance and the bird walks home." },
    zyra:{ tldr:"No dashes to veto and a garden that out-chips the hammer — dodge the root, pin the rotation gaps, and pay rent quietly." }
  }
})
];

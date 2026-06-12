// MatchupCoach — BOT generator configs batch 1: Aphelios, Ashe, Caitlyn, Draven, Jhin.
window.GEN_BOT_CFGS_1 = [

{
  key:'aphelios', name:'Aphelios',
  curve:[-0.3,-0.2,-0.1,0.1,0.3,0.5,1.0],
  lvl:[
    "Learn your opening gun pair and farm — your level 1 is a spreadsheet, not a fight.",
    "Trade only when your loaded pair wants to — sniper pokes, flamethrower shoves, gravity catches.",
    "Track the queue: the next gun decides your next thirty seconds. Plan trades two weapons ahead.",
    "Gravity-gun windows are your kill setups — root the overstep and let the off-hand finish.",
    "Moonlight Vigil online — every gun's R is a different teamfight; sniper executes, flamethrower melts clumps.",
    "First item spike: the gun rotation starts out-trading single-kit marksmen on pure variety.",
    "Late Aphelios is five carries in a trench coat — the right gun at the right fight deletes teams."
  ],
  diffBase:{ hyper:'EVEN', utility:'EVEN', apc:'EVEN' },
  diffEx:{ caitlyn:'TRICKY', draven:'HARD', lucian:'TRICKY', kalista:'TRICKY', missfortune:'TRICKY', samira:'TRICKY', tristana:'TRICKY',
    jinx:'EVEN', kogmaw:'EVEN', twitch:'EVEN', vayne:'EVEN', zeri:'EVEN', smolder:'EVEN', senna:'EVEN', nilah:'EVEN',
    heimerdinger:'TRICKY', karthus:'EVEN', seraphine:'EVEN', swain:'TRICKY', veigar:'EVEN', ziggs:'TRICKY', ashe:'EVEN', jhin:'EVEN', kaisa:'EVEN', corki:'EVEN', ezreal:'EVEN', sivir:'EVEN', varus:'EVEN', xayah:'EVEN' },
  vs:{
    hyper:{
      tldr:"A scaling duel where your kit has five answers — survive his bully window with the right gun and out-rotate the late game.",
      breakdown:"Match his trade pattern with the counter-gun: gravity roots his engage, flamethrower beats his wave crash, sniper out-pokes his chip. The queue is the skill check — read it and the matchup is yours from two items.",
      dos:["Trade with the pair that counters his pattern","Root the engage with gravity windows","Bank the scaling — your curve is steeper"],
      donts:["Fight his spike with your worst pair","Waste the root window on poke","Coin-flip level 2 against bullies"],
      win:"Answer each phase with the right gun and out-scale the single-kit carry."
    },
    utility:{
      tldr:"His utility is fixed and yours rotates — out-poke the poker with sniper, out-shove the shover with fire.",
      breakdown:"Utility marksmen win with one trick per fight; you carry five. Respect {K}, mirror his strength with the matching gun, and let the rotation out-value his kit by mid game.",
      dos:["Mirror his trick with the matching gun","Dodge {K} before committing a window","Out-rotate the poke war at range"],
      donts:["Trade into his utility window blind","Burn gravity on spaced poke","Ignore the queue mid-trade"],
      win:"Out-tool the toolbox — five guns beat one trick."
    },
    apc:{
      tldr:"He pokes on cooldowns, you DPS on rotation — dodge the chip and the sustained gun war is no contest.",
      breakdown:"Mages out-range your average gun but not your sniper pair: poke back at their range, root the all-in, and force extended fights their mana can't attend.",
      dos:["Sniper-poke his casting windows","Root the engage he eventually forces","Drag fights past his mana budget"],
      donts:["Eat poke during your short-range pairs","Clump with your support vs his AoE","Dive a turret nest without the right pair"],
      win:"Out-range the mage with the sniper pair and out-last him with the rest."
    }
  },
  mirror:{
    tldr:"Gun mirror — whoever reads both queues better wins; the gravity-root war decides the all-ins.",
    breakdown:"Track his pair AND yours: trade your strong window into his weak one, and hold the root for his commit.",
    dos:["Trade your strong pair into his weak","Root second in the gravity war","Read his queue aloud"],
    donts:["Mirror trades at pair parity","Waste R on a defensive pair","Fight his flamethrower wave window"],
    win:"Better queue literacy wins the mirror.",
    winS:"His pair is defensive — force the trade now."
  },
  winS:"His escape is spent — root the window and unload the pair.",
  tradeGood:"Poke with the sniper pair, root the answer with gravity, and swap to the finisher — the rotation does what single kits can't.",
  tradeBad:"Fighting a bully's spike with your utility pair loaded — the spreadsheet says wait; listen to it.",
  waveBest:"a flamethrower-shoved crash timed to your support's roam — your wave control changes per gun; plan the queue.",
  waveWorst:"a frozen wave with a defensive pair and no support — the librarian of guns, caught between chapters.",
  early:"Farm the spreadsheet — your early is reading, not fighting. Respect bully windows and bank the curve.",
  mid:"First item onward, rotate answers: root the dives, melt the clumps, snipe the sieges. The queue is your macro.",
  late:"Five carries, one body: pick the gun the fight wants and delete accordingly. Position like the gun demands.",
  safetyTool:"gravity-gun root",
  spikesLine:"First item starts the rotation paying; two items makes every pair lethal; late game you are five champions.",
  carryLine:"Carry through variety — no marksman answers more situations; your job is the literacy to pick right.",
  behindShort:"farm with the wave-clear pairs and stay relevant through the rotation.",
  loadingRule:"Read the queue — plan trades two guns ahead.",
  dontDetail:"The gravity root is your only hard CC — spent on poke, the next dive arrives unanswered.",
  aheadTpl:"Ahead, rotate ruthlessly: bully {E} with the pair that counters him and bank the curve into unanswerable teamfights.",
  behindTpl:"Behind, the spreadsheet still compounds: farm safe pairs, root the dives, and arrive at three items as five champions.",
  spikeName:"first item",
  runeReport:"Press the Attack or Fleet, Presence of Mind, Legend: Bloodline, Coup de Grace; secondary Sorcery — Manaflow + Gathering Storm.",
  summReport:"Flash + Heal standard; Cleanse into hard-pick supports — your kit has no other escape.",
  itemReport:"Start Doran's Blade + pot. Kraken or Collector first, Berserker's, then Infinity Edge and Runaan's. Standard crit spine, five triggers.",
  jungleLine:"Your gravity root converts any support engage into a kill — ping the pair windows so your duo fights on your queue.",
  redditLine:"read the queue, root the commits, and never fight on the wrong pair — Aphelios wins by literacy.",
  load:{
    sub:"r/ApheliosMains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Noonquiver / Pickaxe (≈1000g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Kraken Slayer / Collector",
    secondItem:"Infinity Edge",
    boots:"Berserker's Greaves",
    bootsVsAP:"Mercury's Treads / Berserker's",
    bootsVsAD:"Plated Steelcaps / Berserker's",
    spike:"Two crit items — every pair in the rotation is lethal.",
    runes:{ keystone:"Press the Attack", primaryTree:"Precision", primary:["Presence of Mind","Legend: Bloodline","Coup de Grace"], tree:"Sorcery", secondary:["Manaflow Band","Gathering Storm"], shards:["Attack Speed","Adaptive Force","Health"] }
  },
  specials:{
    draven:{ tldr:"He out-stats every pair you own pre-items — concede the bully window, deny the axe spots, and end his lane lead with one gravity-root counter-kill." },
    samira:{ tldr:"Her W deletes your whole damage profile for a second — hold the gravity root until the whirl spins, then unload the pair." }
  }
},

{
  key:'ashe', name:'Ashe',
  curve:[0.2,0.2,0.3,0.3,0.4,0.4,0.2],
  lvl:[
    "W the wave contact — your volley poke starts the chip ledger at one.",
    "Frost-slow trades begin: every auto you land makes his disengage slower than his decision.",
    "Volley on cooldown and kite the answers — the slow stacks into trades he can't leave.",
    "Q windows decide skirmishes: the flurry doubles your DPS for its duration — pick the moment.",
    "Crystal Arrow online — every fog lane is now a stun lottery; your picks start cross-map.",
    "First item spike: the slow-kite war is officially unfair. Chip, arrow, collect.",
    "Late Ashe starts every fight: arrow the pick, slow the front line, and hawkshot the next objective blind."
  ],
  diffBase:{ hyper:'EVEN', utility:'EVEN', apc:'EVEN' },
  diffEx:{ draven:'HARD', caitlyn:'TRICKY', lucian:'TRICKY', samira:'TRICKY', tristana:'TRICKY', kalista:'TRICKY', missfortune:'TRICKY',
    jinx:'EVEN', kogmaw:'EVEN', twitch:'EVEN', vayne:'EVEN', zeri:'TRICKY', smolder:'EVEN', senna:'EVEN', aphelios:'EVEN', jhin:'EVEN', kaisa:'EVEN', nilah:'EVEN',
    heimerdinger:'TRICKY', seraphine:'TRICKY', ziggs:'TRICKY', karthus:'EVEN', veigar:'EVEN', swain:'TRICKY', corki:'EVEN', ezreal:'EVEN', sivir:'EVEN', varus:'EVEN', xayah:'EVEN' },
  vs:{
    hyper:{
      tldr:"A DPS race you referee with slows — chip the laning phase and arrow the scaling phase before it testifies.",
      breakdown:"Your frost makes every even trade yours to end: volley the contacts, kite his commits, and spend arrows on his reset windows. His curve beats yours late — the arrow exists to end games before that court convenes.",
      dos:["Volley every wave contact","Kite his engage with frost discipline","Arrow his reset and recall windows"],
      donts:["Race DPS at his item spikes","Waste the arrow on full-HP picks","Trade without the slow established"],
      win:"Chip the lane and arrow the game shut before his curve matures."
    },
    utility:{
      tldr:"A utility mirror your slow wins — his trick happens once, your frost happens every auto.",
      breakdown:"Trade volleys evenly and let the perma-slow decide extended exchanges. Dodge {K} and the lane is a ledger of small frost wins.",
      dos:["Win the volley-for-volley war","Stack frost in every extended trade","Hawkshot his roam timers"],
      donts:["Eat {K} at even HP","Trade inside his utility window","Burn Q outside kill windows"],
      win:"Out-utility the utility class — frost is a trick that never cools down."
    },
    apc:{
      tldr:"He pokes from range, you slow from longer — volley the casting windows and arrow the mage who got greedy.",
      breakdown:"Mage poke beats your sustain but not your pick game: respect the chip, farm with W, and spend the arrow on his over-extensions — a stunned mage is a dead one.",
      dos:["Volley his casting animations","Arrow the overstep, always","Farm through the chip with W range"],
      donts:["Stand in his rotation trading","Clump for his AoE with your support","Arrow waves out of boredom"],
      win:"Survive the poke and arrow the one positioning error per game he owes you."
    }
  },
  mirror:{
    tldr:"Frost mirror — volley accuracy and arrow discipline; whoever lands the first stun wins the only fight.",
    breakdown:"Trade volleys off-rhythm, dodge hers at range (it grows), and hold your arrow for her commit.",
    dos:["Dodge her arrow laterally late","Volley off her rhythm","Arrow second, off her commit"],
    donts:["Trade volley-for-volley on her timer","Arrow first without follow-up","Kite into her hawkshot lines"],
    win:"Second arrow wins — patience beats range in the mirror.",
    winS:"Her arrow is down — play forward for ninety seconds."
  },
  winS:"His escape is spent — slow him in and finish the chip.",
  tradeGood:"Volley the contact, auto twice with frost stacking, and walk — the trade ends when YOU say, because he leaves at your speed.",
  tradeBad:"Trading into a bully's spike at even HP — Ashe has no escape; the frost kites fights, not mistakes.",
  waveBest:"a volley-thinned slow push that crashes on arrow timers — your picks start before the wave does.",
  waveWorst:"a shoved wave with no vision and no W — the slowest carry in the game, freelancing as bait.",
  early:"Chip with volleys and bank the frost ledger — your utility wins lanes politely.",
  mid:"Arrow economy runs the map: pick the fog lanes, slow the objectives, and hawkshot the calls your team won't make.",
  late:"You start every fight: arrow the carry, slow the dive, and kite the survivors into your team's spreadsheet.",
  safetyTool:"R Crystal Arrow (defensive)",
  spikesLine:"First item makes the kite war unfair; level 6 starts cross-map picks; two items turn frost into a sentence.",
  carryLine:"Carry through initiation — the arrow is the best fight-starter in bot; your job is the vision that aims it.",
  behindShort:"farm with W clears and stay relevant through arrow picks.",
  loadingRule:"Frost before commitment — slow them in, never chase them out.",
  dontDetail:"You have NO escape — the arrow you hold defensively is the only Flash you'll ever own.",
  aheadTpl:"Ahead, freeze the map: chip {E} off every wave, arrow the resets, and hawkshot the objectives bare.",
  behindTpl:"Behind, the utility never falls off: slow their dives, arrow their engages, and let the team cash your initiation.",
  spikeName:"first item",
  runeReport:"Lethal Tempo or Fleet, Presence of Mind, Legend: Bloodline, Cut Down; secondary Inspiration — Biscuits + Approach Velocity.",
  summReport:"Flash + Heal standard; Cleanse into hook supports — remember the arrow can peel for you too.",
  itemReport:"Start Doran's Blade + pot. Kraken or Statikk first, Berserker's, then IE-Runaan's. The frost scales every crit you buy.",
  jungleLine:"Your arrow is the gank that arrives before the jungler does — fire it down fog lanes on his timers and let the team follow.",
  redditLine:"volley contacts, hold the arrow, and never walk anywhere alone — Ashe wins games as the slowest player in them.",
  load:{
    sub:"r/AsheMains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Noonquiver piece (≈1000g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Kraken / Statikk Shiv",
    secondItem:"Infinity Edge / Runaan's",
    boots:"Berserker's Greaves",
    bootsVsAP:"Mercury's Treads / Berserker's",
    bootsVsAD:"Plated Steelcaps / Berserker's",
    spike:"Two items — the slow-kite war becomes a sentence.",
    runes:{ keystone:"Lethal Tempo", primaryTree:"Precision", primary:["Presence of Mind","Legend: Bloodline","Cut Down"], tree:"Inspiration", secondary:["Biscuit Delivery","Approach Velocity"], shards:["Attack Speed","Adaptive Force","Health"] }
  },
  specials:{
    draven:{ tldr:"He out-damages your chip war at every stage — deny axe spots, never trade at even HP, and arrow the cash-out attempt." },
    zeri:{ tldr:"She out-kites the kiter — your frost barely lands on the wall-dash; volley the Q-block windows and arrow the surge cooldown." }
  }
},

{
  key:'caitlyn', name:'Caitlyn',
  curve:[0.6,0.5,0.5,0.4,0.3,0.4,-0.1],
  lvl:[
    "Range bully from minute one — headshot every contact; your level 1 out-ranges the entire lane.",
    "Trap the brush lines: the lane's geometry now answers to you.",
    "Net-trap combo live — anyone who steps wrong eats the root-headshot chain.",
    "Sit at max range and tax every CS — the lane is a toll road and you own the booth.",
    "Ace in the Hole online — low-HP resets die from two screens. Chip, snipe, repeat.",
    "First item spike: headshots crit and the bully window peaks. Cash the lead NOW.",
    "Late Caitlyn sieges: trap the chokes, headshot from brush range, and snipe the cleanup."
  ],
  diffBase:{ hyper:'FAVOURED', utility:'EVEN', apc:'EVEN' },
  diffEx:{ draven:'EVEN', lucian:'EVEN', samira:'EVEN', tristana:'EVEN', kalista:'EVEN', missfortune:'EVEN',
    jinx:'FAVOURED', kogmaw:'FAVOURED', twitch:'FAVOURED', vayne:'FAVOURED', zeri:'FAVOURED', smolder:'FAVOURED', aphelios:'FAVOURED', senna:'EVEN', nilah:'FAVOURED', kaisa:'FAVOURED', jhin:'EVEN', ashe:'EVEN',
    heimerdinger:'TRICKY', seraphine:'EVEN', ziggs:'TRICKY', karthus:'EVEN', veigar:'EVEN', swain:'EVEN', corki:'EVEN', ezreal:'EVEN', sivir:'EVEN', varus:'EVEN', xayah:'EVEN' },
  vs:{
    hyper:{
      tldr:"Your bully window is his whole laning phase — tax every CS and end the game before his curve files an appeal.",
      breakdown:"You out-range every hypercarry: headshot the contacts, trap his farm path, and zone him off the wave entirely when your support engages. His scaling beats your fall-off — the lead must become towers.",
      dos:["Headshot every last-hit attempt","Trap the brush and his farm path","Convert the lead to plates before three items"],
      donts:["Coast at even farm — your window expires","Trade at his range when he spikes","Trap reactively instead of predictively"],
      win:"Bully the scaling out of the game before it grows up."
    },
    utility:{
      tldr:"An even lane your range tilts — poke the poker from further and trap the trick he needs proximity for.",
      breakdown:"Utility marksmen match your lane but not your reach: Q the angles, headshot off trap roots, and respect {K} as the one equalizer.",
      dos:["Win the range war on raw numbers","Trap his engage and escape paths","Dodge {K} before stepping to poke"],
      donts:["Eat his utility trick at even HP","Push past river without trap cover","Greed plates through his poke"],
      win:"Out-range the toolbox and trap the trick."
    },
    apc:{
      tldr:"A range duel against spells — headshot between his cooldowns and trap the zone he casts from.",
      breakdown:"Mages match your reach with cooldowns; you answer with uptime. Trade autos in his gaps, trap his favorite casting spot, and snipe the half-HP recall he thinks is safe.",
      dos:["Auto the cooldown gaps relentlessly","Trap his casting positions","Ace the chip he walks home with"],
      donts:["Eat full rotations for one auto","Dive turret nests without traps down","Stand still charging trades"],
      win:"Out-uptime the cooldown class and snipe the remainder."
    }
  },
  mirror:{
    tldr:"Range mirror — brush control decides headshot tempo; whoever traps smarter owns the lane's geometry.",
    breakdown:"Fight for the hedges (brush headshots charge faster), counter-trap her lines, and dodge the Q she casts off her own root.",
    dos:["Own the brush for headshot tempo","Counter-trap her trap lines","Dodge the net-trap combo angles"],
    donts:["Stand on any square she trapped","Trade headshot-for-headshot off-tempo","Ace first in the snipe war"],
    win:"Better geometry wins — the lane belongs to whoever owns the grass.",
    winS:"Her traps are spent — walk the lane freely."
  },
  winS:"His escape is spent — net back, trap the path, headshot the verdict.",
  tradeGood:"Headshot the CS attempt from max range and walk — the toll booth doesn't negotiate; it collects.",
  tradeBad:"Greeding plates inside his all-in range at even HP — the bully who forgets her fall-off funds the comeback.",
  waveBest:"a slow push you tax from maximum range — every minion he wants costs a headshot.",
  waveWorst:"a frozen wave near his tower past two items — the bully window closed and the rent came due.",
  early:"Tax everything — your 1-5 is the strongest range window in bot. The lane is yours until proven otherwise.",
  mid:"Trap the map: chokes, pits, flanks. Your siege range takes towers your team merely watches.",
  late:"You are the siege: headshot from brush range, trap the engage lanes, and ace whatever leaves low.",
  safetyTool:"E 90 Caliber Net",
  spikesLine:"Level 1 is the bully window; first item peaks it; late game you trade DPS for siege range.",
  carryLine:"Carry through geometry — traps turn the map into your range; your job is spending the early lead before the fall-off.",
  behindShort:"farm at max range and stay relevant through siege poke.",
  loadingRule:"Tax every CS — the lane is a toll road and your range is the booth.",
  dontDetail:"The net jumps you BACKWARD from your aim — panicking with it pointed wrong is the classic Caitlyn obituary.",
  aheadTpl:"Ahead, evict: zone {E} off the wave entirely, take every plate, and trap the jungle entrances — Caitlyn leads are measured in towers.",
  behindTpl:"Behind, siege from range: trap defensively, headshot the dive attempts, and poke the comeback one toll at a time.",
  spikeName:"first item",
  runeReport:"Fleet Footwork or Lethal Tempo, Presence of Mind, Legend: Bloodline, Cut Down; secondary Inspiration — Biscuits + Cosmic Insight.",
  summReport:"Flash + Heal standard; Cleanse into hook lanes you intend to bully anyway.",
  itemReport:"Start Doran's Blade + pot. Collector or Statikk first, Berserker's, then IE and Rapid Firecannon — the RFC extends the toll booth.",
  jungleLine:"Pre-trap the gank lane before your jungler arrives — the root-headshot chain converts any 3v2 into a double kill.",
  redditLine:"tax the lane, trap the future, and respect your own fall-off — Caitlyn wins by evicting scaling before it pays rent.",
  load:{
    sub:"r/CaitlynMains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Serrated Dirk / Cloak (≈1100g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Collector / Statikk",
    secondItem:"Infinity Edge",
    boots:"Berserker's Greaves",
    bootsVsAP:"Mercury's Treads / Berserker's",
    bootsVsAD:"Plated Steelcaps / Berserker's",
    spike:"Collector + IE — headshots execute and the bully window peaks.",
    runes:{ keystone:"Fleet Footwork", primaryTree:"Precision", primary:["Presence of Mind","Legend: Bloodline","Cut Down"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Attack Speed","Adaptive Force","Health"] }
  },
  specials:{
    heimerdinger:{ tldr:"The turret nest out-zones even your range — Q the turrets from max distance, trap his rebuild paths, and never step into the nest without the grenade dodged." },
    draven:{ tldr:"The one bully who out-trades your range up close — poke the axe-juggle from beyond catch range and trap the spots his axes land on." }
  }
},

{
  key:'draven', name:'Draven',
  curve:[0.7,0.6,0.6,0.5,0.4,0.4,-0.2],
  lvl:[
    "Axe up before the wave meets — your level 1 out-damages everything that walks into bot lane.",
    "Two axes spinning is a kill threat at 2 — trade anyone who contests a CS.",
    "W-chase trades: catch, run, throw, catch — the juggle is the lane and the lane is afraid.",
    "Stack the passive and bully the ledger — every catch is gold and every trade is a tax.",
    "Whirling Death online — low-HP escapes die to the return pass. The lane has no exits now.",
    "First item spike: the juggle one-shots. Cash the passive on a kill and the lane is a bank.",
    "Late Draven is a DPS check the enemy keeps failing — but one death drops the act; juggle responsibly."
  ],
  diffBase:{ hyper:'FAVOURED', utility:'FAVOURED', apc:'FAVOURED' },
  diffEx:{ caitlyn:'EVEN', lucian:'EVEN', samira:'EVEN', kalista:'EVEN', missfortune:'EVEN', tristana:'EVEN', ashe:'EVEN', jhin:'EVEN',
    vayne:'FAVOURED', jinx:'FAVOURED', kogmaw:'FAVOURED', twitch:'FAVOURED', zeri:'FAVOURED', smolder:'FAVOURED', aphelios:'FAVOURED', senna:'EVEN', nilah:'EVEN', kaisa:'FAVOURED',
    heimerdinger:'TRICKY', seraphine:'EVEN', ziggs:'EVEN', karthus:'EVEN', veigar:'EVEN', swain:'EVEN', corki:'EVEN', ezreal:'EVEN', sivir:'EVEN', varus:'EVEN', xayah:'EVEN' },
  vs:{
    hyper:{
      tldr:"Your axes out-stat his entire laning phase — bully the farm, cash the kill, and end before his items argue back.",
      breakdown:"No hypercarry trades with two axes spinning: zone the CS, all-in off your support's CC, and cash the passive early. His curve is the clock; your juggle is the alarm.",
      dos:["Zone the CS with axe threat","All-in off any support CC","Cash the passive on the first kill"],
      donts:["Drop axes chasing style points","Coast at even farm — the act has a runtime","Trade at his spike with axes down"],
      win:"Bully the curve out of the game and cash the act early."
    },
    utility:{
      tldr:"His utility wants tempo and your axes ARE tempo — out-trade the trick and juggle through the answer.",
      breakdown:"Utility marksmen need their one tool to land; your DPS punishes the cooldown. Dodge {K}, keep both axes spinning, and the math does the rest.",
      dos:["Punish his tool's cooldown with all-ins","Keep two axes spinning in every trade","Catch on spots that advance, not retreat"],
      donts:["Eat {K} mid-juggle","Chase catches into fog","Trade one-axe out of impatience"],
      win:"Out-tempo the toolbox — axes don't have cooldowns."
    },
    apc:{
      tldr:"He pokes the juggler — close the distance off any CC and the mage meets the full circus.",
      breakdown:"Mage poke taxes your catch pattern: stand off the obvious spots, W through the chip, and all-in the cooldown gap with your support. One connection ends the poke debate.",
      dos:["Vary your catch spots vs his poke","W-sprint the cooldown gap all-in","Cash the kill before his next rotation"],
      donts:["Catch axes standing in his zone","Trade chip-for-chip at range","Dive the nest with axes dropped"],
      win:"Survive the chip and deliver the circus to his face once."
    }
  },
  mirror:{
    tldr:"Axe mirror — whoever drops fewer axes wins; the cash-out race decides the lane's economy.",
    breakdown:"Deny his catch spots bodily, keep your own juggle clean, and all-in when his axes hit the floor.",
    dos:["Stand on his catch spots","All-in the dropped-axe windows","Win the cash-out race"],
    donts:["Trade at axe parity blind","Chase his catches into CC","Cash late at half value"],
    win:"Cleaner juggle, earlier cash — the better showman wins.",
    winS:"His axes dropped — the act is yours; all-in."
  },
  winS:"His escape is spent — run him down with both axes spinning.",
  tradeGood:"Catch-throw-catch through a short trade and walk — two axes of damage for one rotation of his; the math is the show.",
  tradeBad:"Chasing an axe into the enemy support's CC — the juggle that catches everything except the hook.",
  waveBest:"a controlled push you bully from axe range — the wave is the stage and the CS is the cover charge.",
  waveWorst:"a frozen wave with your passive stacked and uncashed — a rich man in a poor position is everyone's favorite gank.",
  early:"Bully everything — your 1-5 out-damages the entire role. The only question is whether you cash it.",
  mid:"Cash and compound: the passive gold buys your spike a full item early. Group where the axes can perform.",
  late:"You are a DPS check with stage fright about CC — juggle behind your front line and let the return-R clean the exits.",
  safetyTool:"E Stand Aside",
  spikesLine:"Level 1 is the strongest in the role; first item one-shots; the act runs until one death drops it.",
  carryLine:"Carry through the show — the axes out-DPS everything that respects them; your job is the discipline the act demands.",
  behindShort:"farm with safe catches and stay relevant through raw DPS.",
  loadingRule:"Two axes or no trade — the juggle IS the matchup.",
  dontDetail:"Your E is the only 'no' you own — spent on poke spacing, the next engage arrives unimpeded.",
  aheadTpl:"Ahead, perform: zone {E} off the wave entirely, cash every bounty, and make the lane a ticketed event.",
  behindTpl:"Behind, juggle quietly: catch safe, farm the stage, and wait for the one fight where the DPS check still clears.",
  spikeName:"first item",
  runeReport:"Conqueror or Hail of Blades, Triumph, Legend: Bloodline, Last Stand; secondary Domination — Taste of Blood + Treasure Hunter.",
  summReport:"Flash + Heal or Flash + Ghost — Ghost-juggle run-downs are the champion's id; pick by support.",
  itemReport:"Start Doran's Blade + pot. Bloodthirster or Collector first, Berserker's, then IE — the BT shield underwrites the juggle.",
  jungleLine:"Any CC your duo lands is a double-axe deletion — ping the all-in windows; Draven ganks pay double through the passive.",
  redditLine:"catch forward not backward, cash early not perfectly, and respect the hook — Draven wins by charging admission.",
  load:{
    sub:"r/Dravenmains",
    start:"Doran's Blade + Health Potion",
    normalBack:"B.F. Sword (≈1300g) if the lane paid",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Bloodthirster / Collector",
    secondItem:"Infinity Edge",
    boots:"Berserker's Greaves",
    bootsVsAP:"Mercury's Treads / Berserker's",
    bootsVsAD:"Plated Steelcaps / Berserker's",
    spike:"First item — the juggle one-shots and the act sells out.",
    runes:{ keystone:"Conqueror", primaryTree:"Precision", primary:["Triumph","Legend: Bloodline","Last Stand"], tree:"Domination", secondary:["Taste of Blood","Treasure Hunter"], shards:["Attack Speed","Adaptive Force","Health"] }
  },
  specials:{
    heimerdinger:{ tldr:"The nest taxes your catch spots and the grenade punishes the juggle — clear turrets with axes at range and all-in only with the stun dodged." },
    caitlyn:{ tldr:"She taxes from beyond catch range — W through the poke, all-in off any root, and remember her fall-off arrives before your act ends." }
  }
},

{
  key:'jhin', name:'Jhin',
  curve:[0.3,0.3,0.4,0.4,0.4,0.5,0.2],
  lvl:[
    "Fourth-shot trades from one — count to four out loud; the execute crit out-trades anything that forgets.",
    "W joins: any chip becomes a root — trade, then threaten the Flourish on the walk-away.",
    "Q-bounce the low minions into his face — the grenade grows off kills; the wave is your ammunition.",
    "Trade on fourth shots and reload behind minions — your tempo is a waltz; his is a metronome you ignore.",
    "Curtain Call online — low-HP lanes pay from two screens; the root-into-snipe chain starts picks.",
    "First item spike: fourth shots delete squishies. The performance has a body count now.",
    "Late Jhin is the pick and the siege: root from fog, snipe the objective setup, and let four shots end the act."
  ],
  diffBase:{ hyper:'EVEN', utility:'EVEN', apc:'EVEN' },
  diffEx:{ draven:'TRICKY', caitlyn:'TRICKY', lucian:'TRICKY', samira:'TRICKY', tristana:'TRICKY', kalista:'TRICKY',
    jinx:'EVEN', kogmaw:'EVEN', twitch:'EVEN', vayne:'EVEN', zeri:'TRICKY', smolder:'EVEN', aphelios:'EVEN', senna:'EVEN', nilah:'EVEN', kaisa:'EVEN', ashe:'EVEN', missfortune:'EVEN',
    heimerdinger:'TRICKY', seraphine:'EVEN', ziggs:'TRICKY', karthus:'EVEN', veigar:'EVEN', swain:'TRICKY', corki:'EVEN', ezreal:'EVEN', sivir:'EVEN', varus:'EVEN', xayah:'EVEN' },
  vs:{
    hyper:{
      tldr:"His DPS is a stream and yours is punctuation — trade fourth shots, root the answers, and end sentences early.",
      breakdown:"You lose auto wars and win exchanges: open trades on a loaded fourth, W the disengage, and reset behind minions while he wonders where the damage came from. His curve demands the game go long; your picks insist otherwise.",
      dos:["Open trades with the fourth loaded","Root the walk-away after any chip","Reset the count behind minions"],
      donts:["Auto-war a hypercarry mid-clip","Trade on shots one and two","Linger reloading in his range"],
      win:"Punctuate the lane with fourth shots and root the scaling before it streams."
    },
    utility:{
      tldr:"A utility duel of setups — your root out-ranges his trick and your fourth shot out-prices it.",
      breakdown:"Trade tool-for-tool but yours chain: chip, Flourish, fourth shot. Dodge {K} and the exchange rate stays criminal.",
      dos:["Chain chip into root into fourth","Dodge {K} before setting up","Trap the objective pits early"],
      donts:["Trade during your reload","Waste W without prior damage","Stand on his setup lines"],
      win:"Out-setup the setup class — the root chains and theirs doesn't."
    },
    apc:{
      tldr:"He casts on cooldowns and you fire on counts — dodge the rotation and the fourth shot answers every spell.",
      breakdown:"Mage poke matches your chip; your pick game doesn't reciprocate. Farm the count, root his greedy casts, and snipe the half-bar recalls his mana bought.",
      dos:["Dodge the rotation, then fourth-shot","Root his casting animations","Curtain Call the chip he walks home with"],
      donts:["Eat poke mid-reload","Clump with your support vs AoE","Channel R inside his range"],
      win:"Trade counts for cooldowns and snipe the difference."
    }
  },
  mirror:{
    tldr:"Performance mirror — whoever lands the first Flourish chains the first kill; count both clips aloud.",
    breakdown:"Trade only when his count is low and yours is loaded, dodge the cross-map W after every scratch, and out-trap the pits.",
    dos:["Trade your four into his two","Dodge his W after any chip","Win the trap war at objectives"],
    donts:["Mirror his count rhythm","Eat the fourth at even HP","Channel R first in the duel"],
    win:"Better counting wins — the lane is arithmetic in formal wear.",
    winS:"His clip is empty — walk forward and perform."
  },
  winS:"His escape is spent — root the exit and deliver the fourth.",
  tradeGood:"Open on a loaded fourth, crit the chip, W the retreat — three-part trades that end before his DPS math starts.",
  tradeBad:"Auto-warring on shots one and two — Jhin trades are sentences; starting mid-clause is how the act flops.",
  waveBest:"a Q-bounced thin push with traps at the river mouth — the wave feeds the grenade and the grenade feeds the count.",
  waveWorst:"a shoved wave mid-reload with no support — four shots of nothing in a lane full of consequences.",
  early:"Count and chip — your fourth-shot trades out-price the lane while the W threat taxes every scratch.",
  mid:"Pick and siege: root from fog, trap the pits, and Curtain Call the rotations. The map is your stage from 6.",
  late:"You are the opener and the closer: root the pick, snipe the siege, and fourth-shot whatever the fight leaves standing.",
  safetyTool:"W Deadly Flourish (defensive root)",
  spikesLine:"Level 1 fourth shots bully; level 6 starts the cross-map act; first item makes the count lethal.",
  carryLine:"Carry through punctuation — one root per fight becomes one kill per fight; your job is the count that makes it certain.",
  behindShort:"farm with Q bounces and stay relevant through root picks.",
  loadingRule:"Count to four — trades start loaded or not at all.",
  dontDetail:"The reload is your weakness window — every great Jhin death happens on shot zero.",
  aheadTpl:"Ahead, direct the show: zone {E} with fourth-shot threat, trap the map, and snipe the comeback attempts at curtain.",
  behindTpl:"Behind, the count still works: chip safely, root their dives, and let the picks rebuild the ledger one act at a time.",
  spikeName:"first item",
  runeReport:"Fleet Footwork or Dark Harvest, Presence of Mind/Sudden Impact lines, Legend: Bloodline, Coup de Grace; secondary Sorcery — Manaflow + Gathering Storm.",
  summReport:"Flash + Heal standard; Ghost-Jhin exists for the move-speed truthers — the crits feed it.",
  itemReport:"Start Doran's Blade + pot. Collector first, Boots of Swiftness/Berserker's, then IE and Rapid Firecannon — speed and crit feed the fourth.",
  jungleLine:"Your W converts any jungler's chip into a root from two screens — ping ganks AFTER the poke, not before.",
  redditLine:"count aloud, root the scratched, and never get caught on shot zero — Jhin wins because four is enough.",
  load:{
    sub:"r/JhinMains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Serrated Dirk / Pickaxe (≈1100g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"The Collector",
    secondItem:"Infinity Edge / RFC",
    boots:"Swiftness / Berserker's",
    bootsVsAP:"Mercury's Treads",
    bootsVsAD:"Plated Steelcaps",
    spike:"Collector + IE — fourth shots execute and the act has a body count.",
    runes:{ keystone:"Fleet Footwork", primaryTree:"Precision", primary:["Presence of Mind","Legend: Bloodline","Coup de Grace"], tree:"Sorcery", secondary:["Manaflow Band","Gathering Storm"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    samira:{ tldr:"Her W eats your fourth shot AND your R — the projectile-deleting heckler; hold the finale until the whirl spins, then perform." },
    zeri:{ tldr:"She out-tempos your count with wall-dashes — root the surge cooldown and fourth-shot the landing; never duel her DPS stream straight." }
  }
}
];

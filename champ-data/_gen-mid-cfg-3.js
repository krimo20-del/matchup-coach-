// MatchupCoach — MID generator configs batch 3: Ryze, Swain, Syndra, Taliyah.
window.GEN_MID_CFGS_3 = [

// ============================== RYZE ==============================
{
  key:'ryze', name:'Ryze',
  curve:[-0.3,-0.1,0.1,0.2,0.3,0.6,0.9],
  lvl:[
    "Q-farm at max range — your level 1 is honest at best. Bank Tear stacks and give nothing away.",
    "W online: the point-blank root answers anyone who closes. Trade Q-W-Q only when his engage tool is down.",
    "E unlocks the real combo: E-Q flux chunks and the wave-bounce clears. The lane starts being yours to play.",
    "Tear + Lost Chapter and the EQ machine hums — short-trade his every wave contact and walk away before the answer.",
    "Realm Warp online — you are now a map play waiting to happen. The lane is a timer: shove and warp somewhere profitable.",
    "RoA spike: your combo chunks half bars and your root starts kill chains. Force the trades you spent five levels avoiding.",
    "Two items and you ARE the win condition: EQ deletes carries, W stops divers, and Realm Warp turns objectives into ambushes."
  ],
  diffBase:{ control:'TRICKY', burst:'TRICKY', assassin:'TRICKY', fighter:'EVEN' },
  diffEx:{ yasuo:'HARD', fizz:'HARD', leblanc:'HARD', syndra:'HARD',
    kassadin:'FAVOURED', katarina:'FAVOURED',
    zed:'TRICKY', lux:'TRICKY', xerath:'TRICKY', ziggs:'TRICKY', viktor:'TRICKY', orianna:'TRICKY', azir:'TRICKY', cassiopeia:'TRICKY', akali:'TRICKY', qiyana:'TRICKY', talon:'TRICKY', zoe:'TRICKY', irelia:'TRICKY', yone:'TRICKY', pantheon:'TRICKY',
    anivia:'EVEN', vladimir:'EVEN', malzahar:'EVEN', galio:'EVEN', sylas:'EVEN', ekko:'EVEN', diana:'EVEN', naafiri:'EVEN', ahri:'EVEN', annie:'EVEN', vex:'EVEN', veigar:'EVEN', brand:'EVEN', twistedfate:'EVEN' },
  vs:{
    control:{
      tldr:"He out-ranges your combo for five levels — farm the Tear, dodge the big spell, and let the item curve flip the lane.",
      breakdown:"Pre-items you lose the poke war, so don't enter it: Q-farm, bank stacks, and short-trade only off his whiffs. From RoA onward your EQ out-damages his rotation and your W punishes the range he has to give up to kill you. Patience is the pick.",
      dos:["Bank Tear stacks off every safe Q","Short-trade E-Q on his whiffed key spell","Shove-and-warp the moment 6 lands"],
      donts:["Trade rotations before your items","Eat poke for CS you can Q from range","Waste W on poke spacing"],
      win:"Survive the range war, hit RoA, and out-combo him for the rest of the game."
    },
    burst:{
      tldr:"His burst wins the first ten seconds, your root and shield win the rest — make every exchange last eleven.",
      breakdown:"Hold W for his engage spell and the burst math collapses: rooted mages don't finish combos. Trade E-Q in his cooldown gaps, keep the passive shield up through Q-cycling, and remember the lane is a stalling action until your items make it a mugging.",
      dos:["Root his engage spell on arrival","Cycle Q to keep the passive shield loaded","Punish cooldown gaps with full E-Q-W chains"],
      donts:["Trade while his combo is loaded","Burn the root on poke","Stand mid-range at half HP with W down"],
      win:"Root the burst window shut, then out-rotate the gap — your combo cycles faster than his."
    },
    assassin:{
      tldr:"He dives a point-and-click root with a shield behind it — survivable, if you hold W like it's your pulse.",
      breakdown:"The root is the matchup: spent on poke you die, held for the dive you win. Keep the wave centered, Q-farm with the shield cycling, and warp out of (or your jungler into) every committed dive after 6. The assassin's clock runs out at your second item.",
      dos:["Hold W strictly for his commit","Keep the wave centered and flanks warded","Realm Warp your jungler onto his dive"],
      donts:["Spend the root on chip damage","Shove past river pre-items","Greed Tear stacks at half HP in his range"],
      win:"Root the dive, shield the burst, and out-scale him into irrelevance by two items."
    },
    fighter:{
      tldr:"He runs at a champion whose kit was built for kiting runners — root, flux, walk, repeat.",
      breakdown:"Your W-E-Q kite pattern beats run-down fighters cleanly once items arrive; before that, respect the dash windows and farm the Tear. Never stand and trade — Ryze fights are always moving backward while the flux bounces forward.",
      dos:["Kite backward through every trade","Root the dash the moment it commits","Flux the wave so E bounces reach him"],
      donts:["Stand and trade autos with a fighter","Burn W before his gap-closer","Fight inside his wave at even HP"],
      win:"Root the run-down, kite the flux, and let the item curve end the argument."
    }
  },
  mirror:{
    tldr:"Rune mirror — Tear race and root discipline; whoever lands W first wins each trade, whoever warps better wins the map.",
    breakdown:"Identical scaling makes the lane a banking competition. Dodge his EQ line, root first in every exchange, and spend your 6 on warp plays his lane lead can't answer.",
    dos:["Root first in every real trade","Out-bank the Tear race","Warp to fights he can't match"],
    donts:["Trade EQ-for-EQ at even items","Waste W second in the root war","Shove without warp or wards"],
    win:"First root wins the trade; better warps win the game.",
    winS:"His root is down — combo him point-blank for free."
  },
  winS:"His engage is spent — root him and run the full chain.",
  tradeGood:"E the wave, Q the flux bounce, and W-root if he steps to answer — three-spell trades that end before his combo starts.",
  tradeBad:"Spending W on poke and then face-tanking the engage it was born to stop — rootless Ryze is a Tear with a health bar.",
  waveBest:"an EQ-bounced shove that crashes as your warp comes off cooldown — Ryze waves are map plays with a timer attached.",
  waveWorst:"a frozen wave at his tower pre-items — every Q you walk up to cast is a duel invitation you can't accept yet.",
  early:"Farm the Tear, hold the root, dodge the headline spell. Ryze early is a savings account — deposits only.",
  mid:"RoA onward, mug the lane: EQ every wave contact, root every step-up, and shove-warp to bot the moment plates stop paying. Your map game IS your win condition.",
  late:"Two items and you delete carries with one rotation: warp the flank, root the peel, EQ the target. Realm Warp around objectives makes every Baron a 5v3.",
  safetyTool:"W Rune Prison",
  spikesLine:"Tear + Lost Chapter steadies the engine; RoA is the inflection; two items makes EQ a carry-deletion combo.",
  carryLine:"Carry through warps — no mid converts a shoved wave into cross-map kills like Ryze; the lane is a battery for the map.",
  behindShort:"farm with EQ bounces and stay relevant through Realm Warp plays.",
  loadingRule:"Bank Tear stacks — every Q is a deposit toward the two-item mugging.",
  dontDetail:"Your root is your only 'stop' button — a W spent poking is a Zed mark you can't answer.",
  aheadTpl:"Ahead, tax the map: shove with EQ, warp to bot dives, and root anything that contests — {E} can't match a lane lead that teleports.",
  behindTpl:"Behind, the savings plan holds: Q-farm, bank stacks, hold W, and re-enter at RoA + Seraph's — Ryze deficits expire at two items.",
  spikeName:"Rod of Ages",
  runeReport:"Phase Rush or First Strike, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight. Phase Rush makes the kite pattern unchaseable.",
  summReport:"Flash + Teleport, always — Ryze is a scaling map champion and TP doubles the thesis. Nothing else is defensible on him.",
  itemReport:"Start Doran's Ring + 2 pots (Tear first back). RoA into Seraph's, then Rabadon's; Zhonya's vs dive. The mana items ARE the damage items — never skip the battery.",
  jungleLine:"Realm Warp is the best objective-setup ultimate in the game — warp your jungler behind their Baron position and the fight is over before it starts. Pre-6, your root makes any mid gank a kill.",
  redditLine:"farm the Tear, hold the W, and spend your ult on the map not the lane — Ryze wins games at coordinates the enemy didn't ward.",
  load:{
    sub:"r/ryzemains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Tear of the Goddess + Catalyst piece (≈1100g)",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Rod of Ages",
    secondItem:"Seraph's Embrace",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"RoA + Seraph's — EQ chunks become carry deletions and the shield never drops.",
    runes:{ keystone:"Phase Rush", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall eats Q and E mid-flight and his dashes laugh at your kite — root the dash-chain and trade only in the wall's cooldown.",
      dos:["Root him mid dash-chain, not after","Bait the wall with a max-range Q","EQ only while Wind Wall is down"] },
    kassadin:{ tldr:"You bully him for eleven levels — Q every CS attempt, root every step-up, and end the game before his third item argues back." },
    fizz:{ tldr:"His E dodges your root and his burst beats your shield — hold W until the hop is SPENT, then root the landing." }
  }
},

// ============================== SWAIN ==============================
{
  key:'swain', name:'Swain',
  curve:[-0.1,0.2,0.3,0.3,0.6,0.5,0.4],
  lvl:[
    "Q-poke through the wave — the hand hurts more than people remember. Farm safely; your real spells arrive next.",
    "E online: the root that defines the lane. Land it and the Q follow-up chunks; miss it and you farm for fourteen seconds.",
    "W completes the setup: vision + slow from across the map. Root-into-W never misses, and the passive soul fragments heal you.",
    "Lost Chapter timing — Q-spam stops costing the lane. Poke the wave contact and pull every rooted target with the passive.",
    "Demonic Ascension online — you are now a drain-tank mage who WANTS the all-in everyone else fears. Invite the dive.",
    "Liandry's spike: the drain outpaces their damage in any extended fight. Force rivers, root the entry, ascend, profit.",
    "Late Swain is the anti-team: flank-root their engage, ascend in their backline, and demonflare the clump that forms around you."
  ],
  diffBase:{ control:'TRICKY', burst:'EVEN', assassin:'FAVOURED', fighter:'EVEN' },
  diffEx:{ xerath:'HARD', ziggs:'HARD', syndra:'HARD',
    katarina:'FAVOURED', ekko:'FAVOURED', diana:'FAVOURED', naafiri:'FAVOURED',
    lux:'TRICKY', viktor:'TRICKY', orianna:'TRICKY', azir:'TRICKY', hwei:'TRICKY', cassiopeia:'TRICKY', ahri:'TRICKY', zoe:'TRICKY', karma:'TRICKY', leblanc:'TRICKY', fizz:'TRICKY', zed:'TRICKY',
    anivia:'EVEN', taliyah:'EVEN', vladimir:'EVEN', malzahar:'EVEN', ryze:'EVEN', twistedfate:'EVEN', veigar:'EVEN', annie:'EVEN', vex:'EVEN', brand:'EVEN', neeko:'EVEN', kassadin:'EVEN', akali:'EVEN', qiyana:'EVEN', talon:'EVEN', sylas:'EVEN', yasuo:'EVEN', yone:'EVEN', irelia:'EVEN', pantheon:'EVEN', galio:'EVEN' },
  vs:{
    control:{
      tldr:"He out-ranges the general — farm through the poke, land ONE root per wave cycle, and drag the lane toward the brawl you win.",
      breakdown:"Artillery and long-range control beat you at their distance, so collapse it on your terms: hold E for his step-ups, W his retreat path, and pull the root with your passive for free chunks plus healing. Post-6 his poke lead becomes irrelevant the moment any fight lasts six seconds.",
      dos:["Land one root per wave cycle, then trade","W his retreat after every E connect","Ascend the moment a skirmish starts"],
      donts:["Trade poke-for-poke at his max range","Burn E on minions or spacing","Stand in the open at half HP pre-6"],
      win:"Survive the poke, root the step-up, and turn every fight after 6 into a drain he can't out-damage."
    },
    burst:{
      tldr:"His combo is a sprint, your R is a marathon — survive the opening rotation and the drain wins everything after.",
      breakdown:"Burst mages must kill what they engage; Demonic Ascension makes you unkillable on their budget. Hold E for the engage spell, eat the combo with R already channelling, and demonflare the panic. Pre-6, respect the windows; post-6, invite them.",
      dos:["Root his engage spell on cast","Ascend EARLY in the exchange, not late","Demonflare the disengage clump"],
      donts:["Eat the full combo with R unspent","Trade pre-6 with your E down","Burn the root on poke he sidesteps"],
      win:"Make his burst land on an ascending Swain — the drain refunds his whole combo."
    },
    assassin:{
      tldr:"He dives a champion who heals off his damage — root the entry, ascend, and watch the assassination become a donation.",
      breakdown:"Your kit is an assassin trap: E punishes the gap-close, R out-sustains the burst, and W lights the flanks he roams through. Keep the wave near the middle, hold the root for his commit, and remember every dive he survives still cost him tempo your drain didn't lose.",
      dos:["Hold E strictly for his engage","W the flank paths on his roam timers","Ascend the instant he commits"],
      donts:["Spend the root before the dive","Shove past river pre-6 without vision","Chase a reset assassin through your wave"],
      win:"Root the dive, drain the diver, and tax his roams with W vision."
    },
    fighter:{
      tldr:"He wants the extended fight — so do you, and yours comes with a health-bar refund. Root, ascend, out-last.",
      breakdown:"This is the rare lane where both sides want the brawl: yours is better. Root the run-down, walk the drain backward through your wave, and demonflare when he commits anyway. Buy one HP item and his all-in becomes a sunk cost.",
      dos:["Root the run-down on contact","Drag the drain fight through your wave","Demonflare his second commit"],
      donts:["Brawl pre-6 at even health","Panic-R on a feint","Trade autos while his passive stacks"],
      win:"Accept the brawl he offers — your drain math wins it from level 6 onward."
    }
  },
  mirror:{
    tldr:"Raven mirror — whoever lands the first root eats the other's HP bar; whoever ascends second wins the drain war.",
    breakdown:"Identical drain kits reduce to root discipline and R timing: dodge his E, land yours, and ascend AFTER his demon form shows — the second drain outlasts the first.",
    dos:["Dodge his E before throwing yours","Ascend second in the R standoff","Pull every root with the passive instantly"],
    donts:["Trade roots at even cooldowns","Ascend first without jungle help","Brawl inside his soul-fragment wave"],
    win:"First root wins trades; second Ascension wins fights.",
    winS:"His root is down — walk up and trade for free."
  },
  winS:"His escape is spent — root, pull, and let the drain finish.",
  tradeGood:"E his step-up, passive-pull the root for the chunk + heal, Q the retreat — every landed root is a won trade with a health refund attached.",
  tradeBad:"Brawling pre-6 like the demon is already online — Swain without R is a slow mage with a dream and a root on cooldown.",
  waveBest:"a Q-cleared slow push with W covering the river — your shove funds vision, and rooted gank targets pay double.",
  waveWorst:"a frozen wave near his tower against artillery — every last-hit is a free poke window for him and a long rootless walk for you.",
  early:"Farm through the poke and land one root per cycle — pre-6 Swain is a promise with a vision ward. Spend nothing you can't refund.",
  mid:"Post-6, drag the game to rivers: root the entry, ascend early, and demonflare the clump. Your W turns every objective setup into information warfare.",
  late:"You are the anti-engage AND the engage: flank-root their opener, ascend in the middle of their team, and let the drain math argue with their carries.",
  safetyTool:"E Nevermove",
  spikesLine:"Lost Chapter steadies the lane; level 6 inverts every all-in; Liandry's makes the drain outpace entire teams.",
  carryLine:"Carry through inevitability — rooted targets die, diving teams feed the drain, and your W sees the future; Swain wins by being where fights are longest.",
  behindShort:"farm with Q clears and stay relevant through root picks and R frontline.",
  loadingRule:"Land the root before spending anything else — E is the lane.",
  dontDetail:"Your E is the entire kill pattern — a root thrown at minions is fourteen seconds of being a Doran's Ring with a cape.",
  aheadTpl:"Ahead, become the map: W every objective setup, root every contest, and ascend into fights {E} has to take — the drain converts leads into inevitabilities.",
  behindTpl:"Behind, hold the line: Q-farm, root the dives, and ascend defensively — Swain from behind is still the best comeback frontline a mage roster can buy.",
  spikeName:"Liandry's",
  runeReport:"Electrocute or Conqueror, Cheap Shot, Eyeball Collection, Ultimate Hunter; secondary Sorcery — Manaflow + Transcendence. Conqueror feeds the drain-brawl identity.",
  summReport:"Flash + Teleport standard; Ghost is the galaxy-brain pick for R-form chases; Ignite into lanes you plan to drain face-first.",
  itemReport:"Start Doran's Ring + 2 pots. Liandry's into Sorcerer's, then Rylai's and Zhonya's — HP items are damage items when your R scales off survival.",
  jungleLine:"Root-on-arrival makes every mid gank a kill, and your W scouts the enemy jungler for free — Swain mid is a vision-and-CC subscription his whole team benefits from.",
  redditLine:"one root per cycle, ascend early not late, and buy HP like it's AP — Swain wins every fight the enemy can't end in five seconds.",
  load:{
    sub:"r/SwainMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — steadies the Q-spam",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Liandry's Torment",
    secondItem:"Rylai's Crystal Scepter",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Liandry's + Rylai's — the drain slows, burns, and out-heals everything that commits.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Cheap Shot","Eyeball Collection","Ultimate Hunter"], tree:"Sorcery", secondary:["Manaflow Band","Transcendence"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    xerath:{ tldr:"Pure artillery — he poke-wins every screen distance you don't collapse. Farm the deficit, root ONE mistake, and end the lane in the drain." },
    katarina:{ tldr:"Her daggers land in your drain radius — root the Shunpo, ascend the Lotus, and heal off the blender that was supposed to kill you.",
      dos:["Hold E for her Shunpo commit","Ascend the instant she goes in","Demonflare her reset window"] },
    yasuo:{ tldr:"Wind Wall blocks your Q and E lines — root AROUND it off W slows, and remember the drain doesn't care about his wall once he commits." }
  }
},

// ============================== SYNDRA ==============================
{
  key:'syndra', name:'Syndra',
  curve:[0.5,0.5,0.5,0.4,0.6,0.5,0.3],
  lvl:[
    "Q on every last-hit he takes — your level 1 poke is the best in the mage pool. Leave spheres on the ground; they're ammo.",
    "Q-E already threatens the stun — most mids don't respect it at 2 and pay a Flash for the lesson.",
    "Full kit: W-slow into QE stun into Q again is a half-bar rotation. The lane is yours to bully from here.",
    "Splinter stacks build toward empowered Q — keep poking; every sphere thrown is scaling AND pressure at once.",
    "Unleashed Power online — count spheres before every trade: three-plus on the field means most mids die to R alone.",
    "Luden's spike: QE-stun into full rotation deletes squishies. Force the wave contact trades he cannot refuse.",
    "Late Syndra is a one-button court-martial: flank, QE the carry, R the verdict. Spheres on the ground are sentences waiting."
  ],
  diffBase:{ control:'FAVOURED', burst:'EVEN', assassin:'TRICKY', fighter:'TRICKY' },
  diffEx:{ yasuo:'HARD', yone:'HARD', irelia:'HARD', fizz:'HARD',
    orianna:'FAVOURED', anivia:'FAVOURED', azir:'FAVOURED', viktor:'FAVOURED', cassiopeia:'FAVOURED', vladimir:'FAVOURED', lux:'FAVOURED', twistedfate:'FAVOURED', ryze:'FAVOURED', swain:'FAVOURED',
    zed:'TRICKY', kassadin:'TRICKY', akali:'TRICKY', ekko:'TRICKY', diana:'TRICKY', qiyana:'TRICKY', talon:'TRICKY', naafiri:'TRICKY', sylas:'TRICKY', galio:'TRICKY', pantheon:'TRICKY', zoe:'EVEN', leblanc:'EVEN', katarina:'EVEN',
    xerath:'EVEN', ziggs:'EVEN', malzahar:'EVEN', hwei:'EVEN', taliyah:'EVEN', veigar:'EVEN', annie:'EVEN', vex:'EVEN', brand:'EVEN', neeko:'EVEN', ahri:'EVEN' },
  vs:{
    control:{
      tldr:"You out-poke, out-burst, and out-stun the control class — bully the lane like it owes you LP.",
      breakdown:"Your Q range and cast speed beat his rotation rhythm: sphere his last-hits, keep two orbs grounded near the wave, and the QE threat alone zones him off CS. Force the trades — every one of them favours your kit until his second item.",
      dos:["Q every last-hit he attempts","Keep two spheres banked near the wave","QE-stun his first aggressive step"],
      donts:["Let the lane go quiet at even farm","Burn E on spacing instead of stuns","Push past river with R down and no wards"],
      win:"Out-poke the poke class, stun the answers, and cash the lead with R at 6."
    },
    burst:{
      tldr:"A burst race you start ahead — your Q poke wins the chip war, and the loser of the chip war loses the all-in.",
      breakdown:"You both have one-rotation kill plans; yours is enabled by poke that costs you nothing. Chip him below the R-execute line, hold E for his engage spell, and pull the trigger the moment three spheres and a stun line up. Don't gamble at even HP — you never have to.",
      dos:["Win the chip war before any all-in","Hold E to interrupt his engage","Count spheres aloud before committing R"],
      donts:["All-in at even HP when poke is free","Waste W's slow on a farming target","Eat his poke while admiring your orbs"],
      win:"Chip first, stun the response, and execute with R math he can't audit."
    },
    assassin:{
      tldr:"He dives the best self-peel stun in the class — make every engage meet a QE wall, and every roam meet a crashed wave.",
      breakdown:"Your QE answers the dash and your R deletes him before his combo finishes — IF you keep spheres banked and the stun unspent. Poke with Q only, hold E like a summoner spell, and shove his roam windows into his tower. He kills disciplined Syndras rarely and greedy ones always.",
      dos:["Bank spheres before he hits engage range","Hold E exclusively for the dive","Crash waves on his roam timers"],
      donts:["Spend E on poke — ever, in this lane","Stand sphere-less at half HP","Chase kills past your stun cooldown"],
      win:"Wall the dive with QE, win the shove war, and R the assassin who ran out of patience."
    },
    fighter:{
      tldr:"He dashes through spheres that exist to stop exactly that — stun the chain, kite the wreckage, and never trade twice.",
      breakdown:"Dash-fighters survive your poke and punish your immobility, so the lane is a discipline test: W-slow the approach, QE the committed dash, and accept farming at range when cooldowns are down. R solves the fight your poke can't end — spend it like the lane decider it is.",
      dos:["W-slow the approach before it starts","QE the dash mid-flight, not after","Spend R early in his all-in, not as a finisher"],
      donts:["Poke at the edge of his engage range with E down","Trade extended in his wave","Save R for a kill that needs it NOW"],
      win:"Stun the engage, kite the gap, and let R settle the all-in he keeps threatening."
    }
  },
  mirror:{
    tldr:"Sphere mirror — orb economy and the first QE decide it; the R standoff goes to whoever banked more ammunition.",
    breakdown:"Identical range means the stun war is everything: dodge her QE line laterally, land yours off W-slow setup, and count both R sphere-banks before any all-in.",
    dos:["Dodge her QE before casting yours","Bank more grounded spheres than she does","Count both R values before the 6 standoff"],
    donts:["Trade Q-for-Q without a stun threat","Stand on the orb line she's staring at","Coin-flip R-for-R behind on spheres"],
    win:"Win the orb economy and land the first stun — the rest is sentencing.",
    winS:"Her stun is down — walk up and trade for free."
  },
  winS:"His engage is spent — QE the panic and finish the sentence.",
  tradeGood:"Q the last-hit, W-slow the dodge attempt, QE the slowed line, Q again — a full bar of damage that started as routine poke.",
  tradeBad:"Spending E on chip-spacing and then watching the dash you bought it for arrive unanswered — the stun is the matchup, not the damage.",
  waveBest:"a Q-shoved crash with spheres banked at the river entrance — your roam-follow and stun setup are both already loaded.",
  waveWorst:"a frozen wave at his tower with E down — immobile, stunless, and famous: the exact Syndra every assassin queue-dodges for.",
  early:"Bully from minute one: Q poke is free, QE is terror, and most lanes concede CS by level 3. Bank splinters and spheres in equal measure.",
  mid:"Post-6, the lane is a courtroom: chip with Q, stun the objection, R the verdict. Rotate to rivers with spheres pre-banked — your pick game wins drakes alone.",
  late:"You are the carry-deleter: flank the fight, QE the priority target, and R them out of the game before their team notices. Sphere discipline is damage discipline.",
  safetyTool:"E Scatter the Weak",
  spikesLine:"Level 2 QE is the first Flash tax; level 6 R is an execute audit; Luden's makes the full rotation a deletion.",
  carryLine:"Carry through picks — QE-into-R removes one carry per fight before it starts; your job is the sphere bank that makes it arithmetic.",
  behindShort:"farm with Q clears and stay relevant through QE pick threat.",
  loadingRule:"Count your spheres before every fight — three-plus grounded means R kills.",
  dontDetail:"Your E is the dive answer AND the pick starter — spent on poke, it is fifteen seconds of being the squishiest scaling story in mid.",
  aheadTpl:"Ahead, prosecute: zone {E} off CS with Q threat, stun every answer, and roam with pre-banked spheres — a fed Syndra turns rivers into sentencing hearings.",
  behindTpl:"Behind, poke is still free: chip from max Q range, hold E for their dives, and rebuild through the R executes their carries keep walking into.",
  spikeName:"Luden's",
  runeReport:"Electrocute or First Strike, Cheap Shot / Magical Footwear, Eyeball Collection, Ultimate Hunter; secondary Sorcery — Manaflow + Transcendence. Electrocute pays the QE pattern instantly.",
  summReport:"Flash + Teleport standard; Ignite into lanes you intend to end by level 6 — Syndra's kill threat converts it better than most mages.",
  itemReport:"Start Doran's Ring + 2 pots. Luden's Companion into Sorcerer's, then Shadowflame and Rabadon's. Zhonya's vs dive comps — buy the stopwatch at assassin-6.",
  jungleLine:"Your QE is the cleanest gank-setup stun in mid — sphere down BEFORE the jungler arrives and the stun is point-and-click. R turns every 2v2 into a 2v1.",
  redditLine:"poke costs you nothing and the stun costs them everything — bank spheres, hold E, and count to three before pressing R.",
  load:{
    sub:"r/syndramains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — the poke goes infinite",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Luden's Companion",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Luden's + Shadowflame — QE-stun into rotation is a guaranteed deletion on squishies.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Cheap Shot","Eyeball Collection","Ultimate Hunter"], tree:"Sorcery", secondary:["Manaflow Band","Transcendence"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall eats Q, E, and R spheres mid-flight — the counter-pick. Poke only through minion-line angles and stun the THIRD dash, not the first.",
      dos:["Bait the wall with a single throwaway Q","QE his dash-chain's last hop","Keep the wave between you at all times"] },
    fizz:{ tldr:"His E hops over your stun and his dive ignores your poke lead — hold E until the hop lands and never stand sphere-less past river." },
    zed:{ tldr:"You win every level until 6, then his R tests your E discipline — chip him below execute range BEFORE his all-in window opens.",
      dos:["Chip him hard levels 1-5 — it's free","Hold E for the R arrival, stun the mark","Bank three spheres the moment he hits 6"] }
  }
},

// ============================== TALIYAH (MID) ==============================
{
  key:'taliyah', name:'Taliyah',
  curve:[0.3,0.3,0.4,0.4,0.4,0.4,0.1],
  lvl:[
    "Q on fresh ground shreds level-1 trades — most mids don't expect five stones at minute two. Manage your Worked Ground like mana.",
    "W online: the shove-displacement already threatens kill angles against overstep-happy laners.",
    "Full kit: W-into-E is the signature burst — shove him across the stones and watch half a health bar disappear.",
    "Lost Chapter timing — Q-poke on every wave contact. Fresh-ground positioning is your real skill expression now.",
    "Weaver's Wall online — you are now the best roaming mid in the game. Every shove is a bot-lane gank announcement.",
    "Luden's spike: the W-E-Q rotation deletes squishies. Force river fights where your stones pre-seed the geometry.",
    "Late Taliyah edits maps: wall their reinforcements, shove their frontline into your team, and Q whatever stands on stones."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'TRICKY', fighter:'TRICKY' },
  diffEx:{ fizz:'HARD', pantheon:'HARD',
    katarina:'FAVOURED',
    zed:'TRICKY', leblanc:'TRICKY', kassadin:'TRICKY', akali:'TRICKY', syndra:'TRICKY', xerath:'TRICKY', azir:'TRICKY', ekko:'TRICKY', diana:'TRICKY', qiyana:'TRICKY', naafiri:'TRICKY', sylas:'TRICKY', talon:'TRICKY', zoe:'TRICKY', yasuo:'TRICKY', yone:'TRICKY', irelia:'TRICKY', vladimir:'TRICKY',
    lux:'EVEN', ziggs:'EVEN', viktor:'EVEN', orianna:'EVEN', anivia:'EVEN', cassiopeia:'EVEN', malzahar:'EVEN', hwei:'EVEN', swain:'EVEN', ryze:'EVEN', twistedfate:'EVEN', veigar:'EVEN', annie:'EVEN', ahri:'EVEN', vex:'EVEN', brand:'EVEN', neeko:'EVEN', galio:'EVEN' },
  vs:{
    control:{
      tldr:"Even spell war with one cheat code: your roams are faster than his pings — win the map while the lane stays polite.",
      breakdown:"Trade Q on fresh ground and respect his rotation windows; the lane itself is roughly fair. The matchup is decided on the map: every shove buys a wall-surf roam he cannot match, and every roam converts your even lane into his team's deficit.",
      dos:["Q-poke on fresh ground at wave contact","Shove and roam on every crash","Pre-seed E at the river entrances"],
      donts:["Stand on your own Worked Ground trading","Roam without crashing the wave first","Waste W's displacement on poke"],
      win:"Break even in lane and win the game three roams to none."
    },
    burst:{
      tldr:"His burst needs him stationary and aiming — your W-E flips the geometry mid-cast and the stones bite back.",
      breakdown:"Hold W as the combo-breaker: shoved mages drop their aim, and shoved-onto-stones mages drop half a health bar. Poke with fresh-ground Q, keep E between you when his engage spell is up, and let the wall make your jungler's ganks unanswerable.",
      dos:["Hold W to break his combo geometry","Pre-stone the space between you two","Q-poke only from fresh ground"],
      donts:["Trade inside his setup-spell range","Burn W on a farming target","Stand still mid-Q against a burst window"],
      win:"Break the combo with W, punish on stones, and out-roam the lane he thought was even."
    },
    assassin:{
      tldr:"His dashes detonate your stones — pre-seed the minefield and his mobility becomes a self-harm clause.",
      breakdown:"E is the anti-assassin cheat: dashes across it take the full detonation, so seed it on his engage path BEFORE he commits. W breaks the dive that gets through, and your roam game punishes every minute he spends resetting. Respect his level windows; own the rest.",
      dos:["Pre-seed E on his dash path every reset","W him backward mid-engage","Crash and roam on his back-timers"],
      donts:["Save E for after the dash already landed","Shove past river at his level-6 spike","Trade at melee range with W down"],
      win:"Mine the dive lanes, shove the roam windows, and let his own dashes pay the stone tax."
    },
    fighter:{
      tldr:"He dashes, your stones detonate; he runs, your W shoves — the lane is a geometry quiz he keeps failing.",
      breakdown:"Dash-fighters feed your E passive damage, so make every engage cross stones: seed defensively, shove the committed dash backward with W, and Q from fresh ground while he recalculates. Never brawl on Worked Ground — your damage halves exactly when you need it.",
      dos:["Seed E across his engage lane","W the committed dash backward","Kite to fresh ground between every Q"],
      donts:["Fight standing on your own Worked Ground","Let him dash-tax-free through old stones","Extend trades past your E duration"],
      win:"Tax the dashes, shove the all-ins, and Q the fighter stranded on your geometry."
    }
  },
  mirror:{
    tldr:"Stoneweaver mirror — fresh-ground discipline decides trades, and the better wall decides the map.",
    breakdown:"Identical kits make ground state the whole game: fight where YOUR ground is fresh and hers is worked, dodge her W-E line, and spend your wall on roams before she spends hers.",
    dos:["Fight on your fresh ground, her worked","Dodge the W-E angle, not the W","Out-roam her wall with yours"],
    donts:["Trade on her fresh ground","Mirror her roam instead of cross-roaming","Waste the wall reactively"],
    win:"Win the ground war and the roam race — geometry settles the rest.",
    winS:"Her W is down — walk the stones safely and trade."
  },
  winS:"His engage is spent — W him onto the stones and finish.",
  tradeGood:"Q from fresh ground on his last-hit, and if he steps to answer, W-shove him across the E-field — the full geometry trade is half a health bar.",
  tradeBad:"Trading while standing on your own Worked Ground — one-stone Qs lose every exchange your positioning already conceded.",
  waveBest:"a fast Q-shoved crash that funds a wall-surf roam — Taliyah waves are gank announcements with a fuse.",
  waveWorst:"a frozen wave on ground you've already worked — no burst, no shove angle, and a roamless lane is a Taliyah wasted.",
  early:"Poke from fresh ground and manage the floor like a resource — Taliyah lanes are won by whoever's geometry is newer.",
  mid:"Post-6 you are the map: crash, wall-surf, gank, repeat. Three roams by 14 minutes is the benchmark — the lane is just the metronome between them.",
  late:"You edit the endgame: wall Baron reinforcements, shove divers off your carry, and Q the choke your E pre-seeded. Geometry is your sixth item.",
  safetyTool:"W Seismic Shove",
  spikesLine:"Level 3 W-E is the first kill threat; level 6 makes you the best roamer in the game; Luden's turns the rotation lethal.",
  carryLine:"Carry through the map — nobody converts lane tempo into cross-map kills faster; the wall turns even games into geography lessons.",
  behindShort:"farm with fresh-ground Qs and stay relevant through wall utility.",
  loadingRule:"Fight on fresh ground only — Worked Ground is the enemy's terrain.",
  dontDetail:"Your W is the combo-breaker and the kill-starter in one — spent on poke, both jobs go unfilled for fourteen seconds.",
  aheadTpl:"Ahead, multiply: crash waves, wall-surf to every lane, and seed stones at each objective — a roaming Taliyah lead compounds faster than any lane bully's.",
  behindTpl:"Behind, the map still loves you: clear safely with Q, seed defensive stones, and spend the wall on your team's fights — Taliyah utility survives any deficit.",
  spikeName:"Luden's",
  runeReport:"Electrocute or First Strike, Cheap Shot, Eyeball Collection, Relentless / Ultimate Hunter; secondary Sorcery — Manaflow + Transcendence. Electrocute pays the W-E combo instantly.",
  summReport:"Flash + Teleport or Ignite — TP doubles the roam thesis; Ignite converts the W-E burst into early deletions. Pick by how hard you intend to roam.",
  itemReport:"Start Doran's Ring + 2 pots. Luden's Companion into Sorcerer's, then Shadowflame and Rabadon's. Zhonya's vs dive — the stopwatch covers your cast-time windows.",
  jungleLine:"W-E on arrival is elite gank setup, and your wall turns every river fight into a 5v3 — ping your jungler the moment you hit 6; Taliyah-jungler duos win maps, not lanes.",
  redditLine:"fresh ground or no ground, shove the dash not the champion, and roam like the lane is a side quest — Taliyah wins games at bot lane.",
  load:{
    sub:"r/TaliyahMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — the poke goes sustainable",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Luden's Companion",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Luden's + Shadowflame — the W-E-Q geometry trade becomes a deletion.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Cheap Shot","Eyeball Collection","Ultimate Hunter"], tree:"Sorcery", secondary:["Manaflow Band","Transcendence"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall eats your Q stones but his dashes detonate your E — seed the minefield on the wave line and let his own mobility bill him.",
      dos:["Seed E across his dash-chain lane","W him out of his EQ3 wind-up","Q only from angles his wall can't cover"] },
    fizz:{ tldr:"His E hops over your W and his dive ignores stones — the hardest assassin for your kit; hug tower post-6 and roam from safety instead." },
    katarina:{ tldr:"Every Shunpo crosses your stones and every Lotus dies to your W — seed daggers' landing zones and shove her mid-spin.",
      dos:["Pre-stone her dagger drop zones","W her out of Death Lotus instantly","Q her reset window from fresh ground"] }
  }
}
];

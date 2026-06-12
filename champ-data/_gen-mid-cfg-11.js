// MatchupCoach — MID generator configs batch 11: Galio, Irelia, Pantheon, Yasuo, Yone.
window.GEN_MID_CFGS_11 = [

// ============================== GALIO ==============================
{
  key:'galio', name:'Galio',
  curve:[0.0,0.1,0.2,0.3,0.5,0.4,0.3],
  lvl:[
    "Q the wave contacts — the windblast's tornado tick chunks mages who stand in it for the full duration.",
    "W charge threat begins: anyone who steps to punish your Q eats a taunt audition.",
    "Full kit: E-dash into W-taunt is the lane's rudest counter-engage. Magic damage starts paying your shield.",
    "Trade into AP freely — your passive shield refunds their poke and your taunt taxes their commits.",
    "Hero's Entrance online — every shoved side lane is now your teleport gym. The map owes you taxes.",
    "First item spike: the full taunt rotation chunks and your MR makes AP trades a subscription you sell.",
    "Late Galio is the anti-engage: taunt their dive, shield their magic, and R the teammate they thought was alone."
  ],
  diffBase:{ control:'EVEN', burst:'FAVOURED', assassin:'EVEN', fighter:'EVEN' },
  diffEx:{ fizz:'FAVOURED', leblanc:'FAVOURED', talon:'FAVOURED', katarina:'FAVOURED', akali:'FAVOURED', kassadin:'FAVOURED', vladimir:'FAVOURED', malzahar:'FAVOURED', ahri:'FAVOURED', hwei:'FAVOURED', viktor:'FAVOURED', zoe:'FAVOURED',
    irelia:'TRICKY', pantheon:'TRICKY', yasuo:'TRICKY', xerath:'TRICKY', ziggs:'TRICKY',
    zed:'EVEN', qiyana:'EVEN', naafiri:'EVEN', akshan:'EVEN', ekko:'EVEN', diana:'EVEN', sylas:'EVEN', yone:'EVEN', syndra:'EVEN', lux:'EVEN', orianna:'EVEN', anivia:'EVEN', azir:'EVEN', cassiopeia:'EVEN', taliyah:'EVEN', swain:'EVEN', ryze:'EVEN', twistedfate:'EVEN', veigar:'EVEN', annie:'EVEN', vex:'EVEN', brand:'EVEN', neeko:'EVEN', karma:'EVEN', mel:'EVEN', aurora:'EVEN', lissandra:'EVEN' },
  vs:{
    control:{
      tldr:"His poke is magic and your passive eats magic — trade Qs behind the shield and taunt the step-up he eventually risks.",
      breakdown:"AP poke refunds into your shield math: Q-trade the contacts, hold E-W for his aggressive window, and from 6 punish his shoves by leaving — Hero's Entrance pays better than the lane does.",
      dos:["Q-trade behind the passive shield","Taunt the step-up, not the retreat","R the side lanes his shoves can't warn"],
      donts:["Eat poke with the shield down","Charge W through his minion line","Burn E to farm when it's your engage"],
      win:"Refund the poke war with MR math and tax the map with R."
    },
    burst:{
      tldr:"His combo is magic hitting a magic sponge — shield the opener, taunt the author, and counter-rotate the silence.",
      breakdown:"You were designed against this lane: the passive blunts his burst, W-taunt interrupts the follow-up, and your own rotation chunks squishy mages. Force him to engage your shield, then make him regret authorship.",
      dos:["Shield-bait his combo, then taunt","E-Q the cooldown silence after","Stand in his engage range on purpose"],
      donts:["Trade with the passive on cooldown","Taunt the minion wave by panic","Chase kills past your tower's math"],
      win:"Sponge the burst and taunt the burster — the design brief, executed."
    },
    assassin:{
      tldr:"AP assassins picked the wrong statue — taunt the dive, shield the burst, and watch the assassination become community service.",
      breakdown:"Against AP divers your kit is a complete answer: W the engage, passive the damage, Q the retreat. AD assassins are honest fights — respect their lethality spikes and trade behind your E-dash discipline.",
      dos:["W-taunt the dive on arrival","Q the disengage he takes after","Hold E as the gap answer vs AD kits"],
      donts:["Charge W predictively on feints","Trade AD lethality spikes at even HP","Roam with E down and the wave crashing"],
      win:"Taunt the dive and let the shield do the arguing — AP assassins fund your lane."
    },
    fighter:{
      tldr:"An honest brawl your taunt referees — trade rotations behind the shield and let the W decide who commits on whose terms.",
      breakdown:"Fighters out-stat your extended trades, so rotate in bursts: Q-E-auto, taunt the answer, walk. The R threat means his jungler's ganks come with a guest you invited.",
      dos:["Rotate in bursts, taunt the answer","Keep the wave middle for R timing","Trade only with the shield banked"],
      donts:["Brawl past your rotation's length","Taunt-engage without follow-up damage","Spend the dash entering when it exits"],
      win:"Referee the brawl with taunts and let R turn every gank into a counter-gank."
    }
  },
  mirror:{
    tldr:"Statue mirror — whoever taunts second taunts the committed; whoever Rs the better side fight wins the map.",
    breakdown:"Shield math cancels out, so the lane is W discipline: bait his charge, taunt the recovery, and spend your R on the side lane his can't reach in time.",
    dos:["Bait his W before committing yours","Win the R map race","Q-trade the contact windows"],
    donts:["Charge-duel at even shields","R the same fight he Rs","Trade during your passive's downtime"],
    win:"Second taunt, first R — the patient gargoyle wins.",
    winS:"His taunt is down — step in and rotate freely."
  },
  winS:"His engage is spent — taunt the retreat and rotate him down.",
  tradeGood:"Q the contact, let the tornado tick, E-auto if he answers, W-taunt the commit — a full rotation where his half landed on a shield.",
  tradeBad:"Charging W through a minion line at a mage holding his answer — the statue mid-charge is the lane's easiest skillshot target.",
  waveBest:"a Q-cleared middle wave that keeps your R timer flexible — Galio waves are about being free to leave.",
  waveWorst:"a hard-shoved wave when your bot lane is fighting — the R you couldn't channel is the fight your team lost.",
  early:"Shield-trade the contacts and taunt the over-steps — your lane is a toll booth for magic damage.",
  mid:"From 6, the lane is secondary: keep it middle, watch the map, and R the fight that needs a gargoyle. Your TP-ult economy decides games.",
  late:"You are the anti-dive: taunt their engage off your carry, shield the magic, and R the flank their comp built around.",
  safetyTool:"W Shield of Durand",
  spikesLine:"Level 3 taunt rotations tax commits; level 6 makes you a map event; first item turns AP lanes into subscriptions.",
  carryLine:"Carry through arrivals — Hero's Entrance turns every losing skirmish your team starts into a 5v4 with a knockup.",
  behindShort:"farm with Q clears and stay relevant through taunt peel and R arrivals.",
  loadingRule:"Trade behind the shield — the passive is the matchup vs AP.",
  dontDetail:"Your R locks you in place mid-channel — casting it without the wave parked is donating two waves and a tower.",
  aheadTpl:"Ahead, tax both maps: zone {E} with taunt threat, keep the wave middle, and R every skirmish — fed Galio makes the enemy jungler unemployed.",
  behindTpl:"Behind, the statue still stands: shield the dives, taunt their engage, and R the fights your team can win with one more gargoyle.",
  spikeName:"first item",
  runeReport:"Aftershock or Phase Rush, Shield Bash, Second Wind, Overgrowth; secondary Inspiration — Biscuits + Cosmic Insight.",
  summReport:"Flash + Teleport — your whole identity is arriving; double down on it. Ignite only into the FAVOURED dive lanes.",
  itemReport:"Start Doran's Shield + pot. Hollow Radiance or Riftmaker-tank lines, Mercs, then Abyssal Mask and Zhonya's — MR is your damage.",
  jungleLine:"Your W-taunt is the best gank setup in the fighter class, and your R counter-ganks every lane at once — play mid like a switchboard.",
  redditLine:"shield the magic, taunt the commit, and park the wave before every R — Galio wins three lanes from the middle one.",
  load:{
    sub:"r/GalioMains",
    start:"Doran's Shield + Health Potion",
    normalBack:"Bami's Cinder / Spectre's Cowl piece (≈1000g)",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Hollow Radiance / Riftmaker",
    secondItem:"Abyssal Mask",
    boots:"Mercury's Treads",
    bootsVsAP:"Mercury's Treads",
    bootsVsAD:"Plated Steelcaps",
    spike:"First MR-HP item — AP trades become donations and the taunt rotation chunks.",
    runes:{ keystone:"Aftershock", primaryTree:"Resolve", primary:["Shield Bash","Second Wind","Overgrowth"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    xerath:{ tldr:"Artillery from beyond your engage range and your MR can't refund what doesn't hit you — farm with Q, dodge the stun, and spend the lane R-ing other people's problems." },
    irelia:{ tldr:"Mixed damage, dash resets, and a stun your taunt can't out-tempo — respect her wave control, trade behind full shields, and call your jungler honestly." },
    zed:{ tldr:"AD through your AP-sponge identity — the shield does nothing; trade Q-for-energy evenly, taunt the R arrival, and build the Steelcaps your passive wishes it was." }
  }
},

// ============================== IRELIA ==============================
{
  key:'irelia', name:'Irelia',
  curve:[0.2,0.3,0.4,0.4,0.4,0.5,0.2],
  lvl:[
    "Q the low minions and keep the blade moving — your level 1 reset dance already out-trades careless mages.",
    "W joins: the channel shreds incoming damage — hold it for his trade spell, not his autos.",
    "E completes the engine: the stun into stacked-passive autos is half a health bar at 3. Mid lane rarely budgets for it.",
    "Reset-dance the wave into his face: four stacks, E-stun, Q the kill threat. The lane is a minion-count quiz.",
    "Vanguard's Edge online — the all-in caps with a wall of disengage-proof marks. Dive with the wave as your fuel.",
    "First item spike: stacked trades delete mages and your sustain mocks their poke math.",
    "Late Irelia surfs the fight: Q-reset through their line, stun the carry pair, and shred whoever peels."
  ],
  diffBase:{ control:'FAVOURED', burst:'FAVOURED', assassin:'TRICKY', fighter:'EVEN' },
  diffEx:{ vex:'HARD',
    akshan:'FAVOURED', kassadin:'FAVOURED', aurora:'FAVOURED', veigar:'FAVOURED', mel:'FAVOURED', zoe:'FAVOURED', lux:'FAVOURED', ziggs:'FAVOURED', xerath:'FAVOURED', twistedfate:'FAVOURED', hwei:'FAVOURED', brand:'FAVOURED', syndra:'FAVOURED', orianna:'FAVOURED', viktor:'FAVOURED', azir:'FAVOURED', neeko:'FAVOURED',
    galio:'TRICKY', pantheon:'TRICKY', zed:'TRICKY', akali:'TRICKY',
    anivia:'EVEN', malzahar:'EVEN', swain:'EVEN', vladimir:'EVEN', cassiopeia:'EVEN', lissandra:'EVEN', yasuo:'EVEN', yone:'EVEN', katarina:'EVEN', fizz:'EVEN', ekko:'EVEN', diana:'EVEN', leblanc:'EVEN', talon:'EVEN', qiyana:'EVEN', naafiri:'EVEN', sylas:'EVEN', annie:'EVEN', karma:'EVEN', taliyah:'EVEN', ryze:'EVEN', ahri:'EVEN' },
  vs:{
    control:{
      tldr:"He needs minions to hide behind and you eat minions for movement — dance the wave into his face and stun the apology.",
      breakdown:"Every low minion is a dash: manage the wave so the reset path ends on his chest, E-stun the panic, and let four-stack autos do the arithmetic. His range advantage dies the moment the wave does.",
      dos:["Q-reset the wave into his face","Stack four before every real commit","E-stun the disengage he attempts"],
      donts:["Dash in under-stacked for pride","Eat poke during your reset downtime","Shove the dashes away mindlessly"],
      win:"Make the wave a runway and the mage a destination."
    },
    burst:{
      tldr:"His combo is one window and your W shreds windows — channel the burst, dance the gap, and stun the cooldown silence.",
      breakdown:"Hold W for his damage spell and the trade flips mid-cast; your sustain then wins everything after. Track his escape before committing the E — a stunned burst mage with no answer is a finished story.",
      dos:["W-channel his burst spell exactly","E-stun after his escape is spent","Reset-chase through the wave he hid behind"],
      donts:["Burn W on poke autos","Commit stacks into a loaded escape","Trade at his range between waves"],
      win:"Shred the one window his kit owns and own all the others."
    },
    assassin:{
      tldr:"A duel of windows — his burst versus your sustain; stack before his commit and the stat check votes Ionian.",
      breakdown:"Assassins beat under-stacked Irelia and lose to prepared ones: keep four stacks near his engage timers, W his burst, and E the reset he needs. Lethality spikes are the only timers to fear.",
      dos:["Hold four stacks through his windows","W the burst, stun the exit","Sustain the war his resets can't"],
      donts:["Get caught mid-wave under-stacked","Trade at his item spike blind","Chase resets past your own wave"],
      win:"Stat-check the assassin every window he doesn't one-shot you in."
    },
    fighter:{
      tldr:"A skirmish mirror your resets referee — trade stacked windows and let the wave decide who dances longer.",
      breakdown:"Even brawls go to whoever manages stacks and minions better: dance the resets, W his biggest hit, and R the disengage when the brawl finally matters. Wave HP is your mobility bar — budget it.",
      dos:["Budget the wave like a mana bar","W his highest-damage window","R the brawl's disengage attempt"],
      donts:["Brawl under-stacked at even HP","Burn the wave your dashes needed","E predictably along his axis"],
      win:"Out-dance the mirror — the better wave accountant wins."
    }
  },
  mirror:{
    tldr:"Blade mirror — stack discipline and wave accounting; whoever dances on a fuller tank wins each exchange.",
    breakdown:"Deny her reset minions, hold your W for her stacked window, and E second — the counter-stun catches the dash her stun missed.",
    dos:["Deny her low-HP reset minions","E second in the stun war","Trade only at stack parity or better"],
    donts:["Dance into her four stacks at two","W her autos instead of the window","Race R-walls at even HP"],
    win:"Fuller stacks, later stun — the cleaner dancer wins.",
    winS:"Her stacks are down — stat-check the window now."
  },
  winS:"His escape is spent — stun the window and dance through.",
  tradeGood:"Q-reset through two low minions onto his chest, four-stack autos, E-stun the retreat — the wave-funded all-in he budgeted zero for.",
  tradeBad:"Dashing in under-stacked with W down — Irelia without the engine is a melee minion with a famous haircut.",
  waveBest:"a slow push of low-HP minions — every one is a dash and the crash is an all-in announcement you control.",
  waveWorst:"a crashed wave and an empty lane — no minions, no dashes, no Irelia.",
  early:"Dance the contacts — your 1-3 out-trades everything that doesn't respect the reset math. Build the lane around minion HP.",
  mid:"First item onward, the wave is a weapon: crash it into all-ins, R the disengage, and surf the side-lane resets between objectives.",
  late:"You are the front-to-back blender: Q through their line, stun the carries, and let the marks ground the peel.",
  safetyTool:"W Defiant Dance",
  spikesLine:"Level 3 stacked stuns surprise mid; level 6 walls the disengage; first item makes stacked trades lethal.",
  carryLine:"Carry through the dance — the wave funds dives no cooldown can, and your R turns skirmishes into no-exit interviews.",
  behindShort:"farm with Q resets and stay relevant through stacked windows.",
  loadingRule:"Four stacks before commits — the passive is the all-in.",
  dontDetail:"Your dashes live in the wave's health bar — shoving mindlessly is deleting your own mobility.",
  aheadTpl:"Ahead, dance louder: crash waves into {E}'s face, stun the answers, and surf resets through every river fight.",
  behindTpl:"Behind, farm the engine: reset-dance safely, W their dives, and re-enter at the item spike with the wave as your wingman.",
  spikeName:"first item",
  runeReport:"Conqueror, Triumph, Legend: Alacrity, Last Stand; secondary Resolve — Bone Plating + Second Wind.",
  summReport:"Flash + Ignite into kill lanes; Flash + TP when the column reads survival. The resets already half-play Flash.",
  itemReport:"Start Doran's Blade + pot. Blade of the Ruined King into Berserker's, then Wit's End/Steelcaps paths — on-hit is the language.",
  jungleLine:"Your E-stun plus four stacks makes any gank a kill, and R walls the disengage — ping the crashed-wave windows; they're dive contracts.",
  redditLine:"minions are mana, stacks are the matchup, and the wall catches what the stun missed — Irelia wins by accounting, then dancing.",
  load:{
    sub:"r/Ireliamains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Recurve Bow (≈1000g) — the on-hit engine starts",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Blade of the Ruined King",
    secondItem:"Wit's End / Steelcaps path",
    boots:"Berserker's Greaves",
    bootsVsAP:"Mercury's Treads",
    bootsVsAD:"Plated Steelcaps",
    spike:"BotRK — stacked trades delete mages and the sustain mocks poke math.",
    runes:{ keystone:"Conqueror", primaryTree:"Precision", primary:["Triumph","Legend: Alacrity","Last Stand"], tree:"Resolve", secondary:["Bone Plating","Second Wind"], shards:["Attack Speed","Adaptive Force","Health"] }
  },
  specials:{
    vex:{ tldr:"Every reset dash feeds her fear and her poke ignores your sustain — the anti-Irelia mage; dance only post-pulse and all-in off jungle CC." },
    pantheon:{ tldr:"His E blocks your stacked window and his early stats match yours — trade around the shield's facing and stun him mid-W wind-up." },
    akali:{ tldr:"A reset duel where her smoke hides your stun targets — fight her at wave contacts, not in shroud, and W the energy dumps." }
  }
},

// ============================== PANTHEON ==============================
{
  key:'pantheon', name:'Pantheon',
  curve:[0.5,0.5,0.5,0.4,0.3,0.4,-0.3],
  lvl:[
    "Q the contacts — the spear chunks at one and the empowered version executes; mid rarely respects either.",
    "W point-and-click stun joins: the level 2 all-in is the lane's first ultimatum. Most mids pay it.",
    "Full kit: W-stun, empowered Q or E-block — you out-trade everything for five levels. Spend the window loudly.",
    "Empowered-spear the step-ups and block the answer with E — the lane is a toll road with a spear booth.",
    "Grand Starfall online — your shoves become bot-lane invoices. The early lead must become the map now.",
    "First item spike: the stun-spear rotation deletes squishies. Last call before scaling lanes wake.",
    "Late Pantheon is a starting pistol: R the flank, stun the carry, block the counter — and let the team finish what the spear started."
  ],
  diffBase:{ control:'FAVOURED', burst:'FAVOURED', assassin:'EVEN', fighter:'EVEN' },
  diffEx:{ akali:'FAVOURED', kassadin:'FAVOURED', vladimir:'FAVOURED', irelia:'FAVOURED', akshan:'FAVOURED', aurora:'FAVOURED', taliyah:'FAVOURED', twistedfate:'FAVOURED', zoe:'FAVOURED', lux:'FAVOURED', ziggs:'FAVOURED', xerath:'FAVOURED', hwei:'FAVOURED', brand:'FAVOURED', syndra:'FAVOURED', orianna:'FAVOURED', viktor:'FAVOURED', azir:'FAVOURED', neeko:'FAVOURED', veigar:'FAVOURED', mel:'FAVOURED', talon:'FAVOURED',
    galio:'TRICKY',
    anivia:'EVEN', malzahar:'EVEN', cassiopeia:'EVEN', swain:'EVEN', lissandra:'EVEN', vex:'EVEN', annie:'EVEN', karma:'EVEN', ryze:'EVEN', ahri:'EVEN', diana:'EVEN', leblanc:'EVEN', qiyana:'EVEN', naafiri:'EVEN', sylas:'EVEN', fizz:'EVEN', katarina:'EVEN', ekko:'EVEN', zed:'EVEN', yone:'EVEN', yasuo:'EVEN' },
  vs:{
    control:{
      tldr:"He scales and you collect early — spear every contact, stun the level-2 window, and convert before his items file an appeal.",
      breakdown:"Your 1-5 out-stats his entire class: Q the last-hits, W the first overstep, and E-block the panic rotation. The lead is a loan against your fall-off — spend it on plates, roams, and his mental.",
      dos:["Spear every last-hit attempt","Cash the level 2 stun window","Convert leads to plates before two items"],
      donts:["Coast at even farm — you LOSE even","Hold the empowered spear for perfect moments","Trade at his range after his first item"],
      win:"Bully the spear window and bank it before the scaling court convenes."
    },
    burst:{
      tldr:"His combo needs casting time your stun doesn't grant — W the wind-up, block the rotation, and spear the silence.",
      breakdown:"Point-and-click stun beats skillshot setup every even exchange: W his aggression, E his damage window, and empowered-Q the cooldown gap. He gets one mistake per wave; you get a spear per mistake.",
      dos:["W-stun his setup spell mid-cast","E-block the rotation he panics out","Empowered-Q the gap that follows"],
      donts:["Eat poke between stun windows","Block the wrong direction on flanks","All-in past your E's duration blind"],
      win:"Stun the author mid-sentence and block the rebuttal."
    },
    assassin:{
      tldr:"An assassin duel where your shield votes — W the opener, block the burst window entirely, and out-stat the survivor.",
      breakdown:"Your E is the anti-assassin clause: aimed right it deletes his whole window. Trade W-strings early, hold the block for his real combo, and respect only the resets that outlast your shield.",
      dos:["Block his burst window, then trade","W-string the early stat checks","Spear the reset attempts at range"],
      donts:["Face the block away from his angle","Spend E on poke-level damage","Duel past your shield at his spike"],
      win:"Aim the shield right and the assassination happens to someone else."
    },
    fighter:{
      tldr:"An early-game mirror you start ahead — stun-spear the first five levels, block the brawl, and leave before the scaling argues.",
      breakdown:"You out-trade fighters early and lose the long game: spend the W windows on damage, E the extended exchange, and R away to fights your curve still owns. The lane is a heist, not a residence.",
      dos:["Cash every early W window","E-block the brawl's biggest hit","R out to softer fights mid-game"],
      donts:["Extended-brawl past your curve","Trade at his item spikes evenly","Stay mid when the map pays better"],
      win:"Rob the early game and leave before the lease expires."
    }
  },
  mirror:{
    tldr:"Spear mirror — whoever lands the empowered Q first runs the lane; whoever blocks the right direction wins the all-in.",
    breakdown:"Trade W-for-W evenly and win on E facing: block his empowered window, spear his block's expiry, and R second to counter his map play.",
    dos:["Block his empowered window exactly","Spear the shield's expiry frame","R-follow his map plays"],
    donts:["Stun-trade into his held E","Empowered-poke his block","R first without a wave parked"],
    win:"Right block, later R — the cleaner spartan wins.",
    winS:"His shield is spent — stun and run the full string."
  },
  winS:"His answer is down — stun-spear the window and collect.",
  tradeGood:"W the step-up, empowered-Q the stun, E the answer, walk — the full toll he paid for one last-hit.",
  tradeBad:"Spending the all-in into a held escape at even HP — Pantheon trades are loans; defaulting on one funds his whole comeback.",
  waveBest:"a shoved crash that funds an R departure — your waves are runway, and the runway points at bot lane.",
  waveWorst:"a frozen stall at two items — the fall-off arrived and the lane is now a museum of your level 3.",
  early:"Collect loudly — your 1-5 is the best in the lane and everyone knows it except the people who keep walking up.",
  mid:"R the map on every crash: the starfall lead converts to dragons and bot-lane towers before your curve flattens.",
  late:"You are the opener: R the flank, stun the carry, block the counter-burst — then let the people with scaling finish the paperwork.",
  safetyTool:"E Aegis Assault",
  spikesLine:"Level 2 W is the first ultimatum; level 6 invoices the map; first item is the last call — spend it all.",
  carryLine:"Carry by starting things — the stun opens fights, the block survives them, and the R makes sure they happen where you're winning.",
  behindShort:"farm with Q and stay relevant through stun engages and R arrivals.",
  loadingRule:"Spend the early windows loudly — the lead has a sell-by date.",
  dontDetail:"Your E only blocks the direction you face — a flanked Aegis is a cape, not a shield.",
  aheadTpl:"Ahead, sprint: stun-spear {E} off the wave, take every plate, and R bot on cooldown — Pantheon leads are measured in objectives, not KDA.",
  behindTpl:"Behind, become the utility: stun their dives, block their bursts, and R the fights your team starts — the spear still opens doors it can't close.",
  spikeName:"first item",
  runeReport:"Conqueror or Hail of Blades, Triumph, Legend: Alacrity, Coup de Grace; secondary Inspiration — Biscuits + Cosmic Insight.",
  summReport:"Flash + Ignite — the early windows want a closer; the R is your Teleport already.",
  itemReport:"Start Doran's Blade + pot. Eclipse into Lucidity, then Serylda's-Steraks paths — lethality early, survivability when the curve flattens.",
  jungleLine:"W-on-arrival is a guaranteed gank and your R counter-ganks the whole map — play mid like a dispatcher with a spear.",
  redditLine:"spend the early like it's stolen, face the block like it matters, and R away from even fights — Pantheon wins games before they start.",
  load:{
    sub:"r/PantheonMains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Serrated Dirk (≈1100g) — the spear math sharpens",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Eclipse",
    secondItem:"Serylda's / Sterak's path",
    boots:"Ionian Lucidity",
    bootsVsAP:"Mercury's Treads / Lucidity",
    bootsVsAD:"Plated Steelcaps / Lucidity",
    spike:"Eclipse — the stun-spear rotation deletes squishies; last call before scaling wakes.",
    runes:{ keystone:"Conqueror", primaryTree:"Precision", primary:["Triumph","Legend: Alacrity","Coup de Grace"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    galio:{ tldr:"Your damage is physical but his taunt out-tempos your stun and his shields blunt the windows — trade spears at range and spend the lead on the map instead." },
    malzahar:{ tldr:"His shield eats the stun that starts everything — poke it off with Q first, always, and never dive past 6 with his R live." },
    vex:{ tldr:"Your W is a dash and she charges rent on dashes — stun only post-pulse, block her Q line, and spear the gloom windows." }
  }
},

// ============================== YASUO ==============================
{
  key:'yasuo', name:'Yasuo',
  curve:[0.3,0.4,0.4,0.4,0.4,0.5,0.3],
  lvl:[
    "Q the contacts and stack flow off the wave dashes — your level 1 already out-trades careless casters.",
    "E-dance through the wave: the dash web makes you unhittable to anything aimed. Build the tornado quietly.",
    "Wind Wall online — the mage lane's entire business model is now a suggestion. Wall the rotation, not the poke.",
    "EQ-cycle the wave into his face: flow shields eat his chip and the knockup threat taxes his every step.",
    "Last Breath online — any knockup is now a deletion: yours, your jungler's, anyone's. The lane plays grounded.",
    "First item spike: crit-EQ trades chunk and the all-in math turns lethal off one tornado.",
    "Late Yasuo flanks the wombo: wall their poke, ride the knockup chain, and Last Breath the clump your engage lifted."
  ],
  diffBase:{ control:'FAVOURED', burst:'FAVOURED', assassin:'EVEN', fighter:'EVEN' },
  diffEx:{ lissandra:'HARD',
    anivia:'FAVOURED', syndra:'FAVOURED', lux:'FAVOURED', xerath:'FAVOURED', ziggs:'FAVOURED', zoe:'FAVOURED', hwei:'FAVOURED', orianna:'FAVOURED', azir:'FAVOURED', neeko:'FAVOURED', veigar:'FAVOURED', aurora:'FAVOURED', brand:'FAVOURED', twistedfate:'FAVOURED', viktor:'FAVOURED', ryze:'FAVOURED', akshan:'FAVOURED',
    vex:'TRICKY', galio:'TRICKY', cassiopeia:'TRICKY',
    malzahar:'EVEN', vladimir:'EVEN', swain:'EVEN', taliyah:'EVEN', annie:'EVEN', karma:'EVEN', mel:'EVEN', ahri:'EVEN', kassadin:'EVEN', pantheon:'EVEN', irelia:'EVEN', yone:'EVEN', zed:'EVEN', akali:'EVEN', katarina:'EVEN', fizz:'EVEN', ekko:'EVEN', diana:'EVEN', leblanc:'EVEN', talon:'EVEN', qiyana:'EVEN', naafiri:'EVEN', sylas:'EVEN' },
  vs:{
    control:{
      tldr:"His kit is projectiles and yours is a wall — dash the gaps, wall the rotation, and bill the lane for every wave he can't contest.",
      breakdown:"The dash web closes his range and the wall deletes his answer: EQ through the wave, wall his real rotation (never his chip), and stack the tornado for the knockup his immobility can't refuse.",
      dos:["EQ-cycle the wave into his face","Wall the rotation, not the poke","Land the tornado off dash-web angles"],
      donts:["Wall chip damage out of reflex","Dash predictably along one axis","All-in into his held CC at even HP"],
      win:"Close the range with dashes and delete the answer with the wall."
    },
    burst:{
      tldr:"His combo is aimed at a man with twelve dashes and a wall — make the aiming the whole story of his lane.",
      breakdown:"Flow shields eat his opener, the wall eats his centerpiece, and your EQ web punishes the cooldown silence. Respect held CC; everything else is wind.",
      dos:["Bait the combo with dash feints","Wall the centerpiece mid-flight","Punish the silence with EQ strings"],
      donts:["Dash into held CC for tempo","Spend the wall on chip","Trade shieldless at his range"],
      win:"Make his burst a skillshot exam he keeps failing."
    },
    assassin:{
      tldr:"A skirmish mirror your shield and wall referee — trade strings, wall his burst half, and out-sustain the windows.",
      breakdown:"Your passive shield wins even exchanges and the wall deletes whichever half of his kit flies: trade EQ strings, hold the knockup for his commit, and Last Breath the window he opens.",
      dos:["String trades behind the flow shield","Wall the ranged half of his kit","R the knockup his engage donates"],
      donts:["Coin-flip openers at even HP","Burn the wall pre-commit","Chase resets through his wave"],
      win:"Referee the mirror with the wall and collect on the knockup."
    },
    fighter:{
      tldr:"An honest brawl with a dishonest wall — string the trades, wall the poke half, and ride any knockup to the verdict.",
      breakdown:"Fighters match your stats but not your web: EQ-cycle the wave, wall what flies, and brawl only with flow banked. The R chains off every knockup in the game — including your own third Q.",
      dos:["Brawl with flow shields banked","Wall the mixed kit's ranged half","Tornado the extended exchange"],
      donts:["Trade shieldless at even stats","Dash the web dry before the all-in","R a 1v1 the wall already won"],
      win:"String the brawl behind the shield and let the tornado notarize it."
    }
  },
  mirror:{
    tldr:"Wind mirror — wall-for-wall and web-for-web; whoever lands the tornado in the wall's downtime wins the only trade that matters.",
    breakdown:"The walls cancel and the webs mirror — flow discipline decides: trade shielded, bait his wall with a fake tornado, and EQ-R the real one behind it.",
    dos:["Bait his wall with the fake tornado","Trade only at flow parity","R second off his knockup greed"],
    donts:["Wall his autos out of panic","Web-chase at even shields","Tornado on cooldown into a held wall"],
    win:"Fake the first tornado and land the second — the patient wind wins.",
    winS:"His wall is down — every projectile you own lands now."
  },
  winS:"His answer is spent — EQ the window and let the steel sing.",
  tradeGood:"EQ through the wave onto his chest, auto with the shield up, dash out the web — the trade his aim never got to vote on.",
  tradeBad:"Dashing the web dry into held CC — twelve dashes spent arriving is zero dashes left for the leaving.",
  waveBest:"a full wave between you and him — every minion is a dash and the web is your range stat.",
  waveWorst:"an empty lane and a held stun — no minions, no web, no wind, just a man walking.",
  early:"Stack flow and string the contacts — your shield-funded trades beat the mage class while the wall holds their business hostage.",
  mid:"First item onward, hunt knockups: yours, your jungler's, anyone's — every airborne enemy in two screens is a Last Breath appointment.",
  late:"You are the wombo's closer: flank, wall their disengage poke, and R the multi-knockup your front line manufactures.",
  safetyTool:"W Wind Wall",
  spikesLine:"Level 2 web closes ranges; level 6 converts knockups; first crit item makes EQ strings lethal.",
  carryLine:"Carry through the wall and the chain — one good wall deletes a teamfight's damage, one good R ends its formation.",
  behindShort:"farm with EQ cycles and stay relevant through wall utility.",
  loadingRule:"Wall the rotation, never the chip — the wall is a teamfight item on a cooldown.",
  dontDetail:"The web is your mobility AND your dodge — a dry web at the wrong moment is the only way mages ever catch you.",
  aheadTpl:"Ahead, raise the wind: zone {E} off the wave with EQ threat, wall his every answer, and R the river knockups — fed Yasuo makes casting feel optional.",
  behindTpl:"Behind, farm the web: string what's free, wall their poke comp's openers, and wait for the one teamfight knockup that pays all debts.",
  spikeName:"first crit item",
  runeReport:"Lethal Tempo or Conqueror, Triumph, Legend: Alacrity, Last Stand; secondary Resolve — Bone Plating + Second Wind.",
  summReport:"Flash + Ignite into kill lanes; Flash + TP when the column reads patience. The web plays half your Flash already.",
  itemReport:"Start Doran's Blade + pot. Berserker's into Blade of the Ruined King or Immortal Shieldbow, then Infinity Edge — two crit items is the deadline.",
  jungleLine:"Any jungler with a knockup is your duo — their CC is your R range; ping the dive windows and ride the chain.",
  redditLine:"wall rotations not reflexes, keep one dash home, and treat every knockup on the map as yours — Yasuo wins by taxing the air.",
  load:{
    sub:"r/YasuoMains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Noonquiver / Cloak piece (≈1000g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"BotRK / Immortal Shieldbow",
    secondItem:"Infinity Edge",
    boots:"Berserker's Greaves",
    bootsVsAP:"Mercury's Treads / Berserker's",
    bootsVsAD:"Plated Steelcaps / Berserker's",
    spike:"Two crit items — EQ strings chunk and one tornado is a kill sentence.",
    runes:{ keystone:"Lethal Tempo", primaryTree:"Precision", primary:["Triumph","Legend: Alacrity","Last Stand"], tree:"Resolve", secondary:["Bone Plating","Second Wind"], shards:["Attack Speed","Adaptive Force","Health"] }
  },
  specials:{
    lissandra:{ tldr:"Nothing she casts is wallable and her root catches the web mid-dash — the anti-Yasuo mage; farm the shield trades and all-in only off jungle knockups." },
    vex:{ tldr:"Twelve dashes versus a fear subscription — trade on foot when her glow is up and spend the web only after the pulse is banked." },
    cassiopeia:{ tldr:"Her W grounds your web, her E isn't wallable, and her R doesn't care about your dash — respect the miasma zones and string only outside them." }
  }
},

// ============================== YONE ==============================
{
  key:'yone', name:'Yone',
  curve:[0.2,0.3,0.4,0.4,0.5,0.5,0.3],
  lvl:[
    "Q the contacts and stack the gathering storm of your third-strike knockup — mid rarely respects melee poke until it lifts them.",
    "W joins: the cone shield turns even trades dishonest — yours comes with a refund.",
    "E online — the soul window: dash in, trade everything, snap back with the receipt. The lane's rudest tempo trick.",
    "E-Q3-W cycles on cooldown: enter spirit form, trade the knockup window, return before the answer matters.",
    "Fate Sealed online — the R lines up entire waves of people: knockup into full string into snap-back safety.",
    "First item spike: soul-window trades chunk half bars and the mixed damage laughs at single-stat defenses.",
    "Late Yone flanks in spirit: E behind the fight, R the line your team froze, and snap back out of the obituary."
  ],
  diffBase:{ control:'FAVOURED', burst:'FAVOURED', assassin:'EVEN', fighter:'EVEN' },
  diffEx:{ vex:'HARD',
    anivia:'FAVOURED', syndra:'FAVOURED', orianna:'FAVOURED', azir:'FAVOURED', ziggs:'FAVOURED', lux:'FAVOURED', xerath:'FAVOURED', hwei:'FAVOURED', zoe:'FAVOURED', neeko:'FAVOURED', veigar:'FAVOURED', brand:'FAVOURED', twistedfate:'FAVOURED', viktor:'FAVOURED', mel:'FAVOURED',
    galio:'EVEN', irelia:'EVEN', yasuo:'EVEN', pantheon:'EVEN', lissandra:'EVEN', cassiopeia:'EVEN', malzahar:'EVEN', vladimir:'EVEN', swain:'EVEN', kassadin:'EVEN', akali:'EVEN', zed:'EVEN', katarina:'EVEN', fizz:'EVEN', ekko:'EVEN', diana:'EVEN', leblanc:'EVEN', talon:'EVEN', qiyana:'EVEN', naafiri:'EVEN', sylas:'EVEN', akshan:'EVEN', taliyah:'EVEN', ryze:'EVEN', ahri:'EVEN', annie:'EVEN', karma:'EVEN', aurora:'EVEN' },
  vs:{
    control:{
      tldr:"He pokes a man with a return ticket — E in, spend everything, snap back before his answer clears customs.",
      breakdown:"The soul window inverts the range war: enter on his cooldown gap, Q3-W the trade, and return to a body his rotation can't reach. Track his one CC spell; it's the only visa that matters.",
      dos:["E-trade his cooldown gaps","Q3 the knockup inside the window","Snap back before his answer lands"],
      donts:["Enter spirit form into held CC","Linger past the window for one more auto","Trade on foot at his range"],
      win:"Commute through the range war and bill him for every round trip."
    },
    burst:{
      tldr:"His combo needs your real body — the soul window hides it, the shield blunts it, and the snap-back files the complaint.",
      breakdown:"Trade in windows his targeting can't schedule: W the opener, E the silence, and R the line when his escape is spent. The mixed damage means his armor choice is always wrong.",
      dos:["W-shield his combo's center","E the post-combo silence","R the line his escape can't exit"],
      donts:["Trade at his range between windows","Enter with the snap-back unplanned","Eat poke during your E cooldown"],
      win:"Hide the body his combo needed and audit the silence after."
    },
    assassin:{
      tldr:"A window duel — his burst versus your round trip; shield the opener and snap back from exchanges he can't unwrite.",
      breakdown:"Your W out-values his opener and the E return un-commits your mistakes: trade windows behind the shield, hold R for his committed engage, and let the mixed damage out-pace his single-stat spike.",
      dos:["Shield-trade his burst windows","Snap back from sour exchanges","R the commit his resets funded"],
      donts:["Coin-flip openers shieldless","Spend the E window on chip","Duel his lethality spike blind"],
      win:"Out-window the assassin — the round trip beats the one-way every audit."
    },
    fighter:{
      tldr:"A brawl mirror with a return policy — string the windows, shield the answers, and R the line when the exchange matures.",
      breakdown:"Even stats, uneven tempo: your E lets you take brawls and un-take them. Trade Q3-W cycles, snap back at the window's edge, and spend R on the multi-lift the wave geometry eventually offers.",
      dos:["Cycle the windows on cooldown","Exit at the edge, never past it","R the multi-lift the lane lines up"],
      donts:["Brawl past the snap-back math","Shield late in the exchange","Q3 into his held interrupt"],
      win:"Brawl with a receipt and let the R settle the mature exchange."
    }
  },
  mirror:{
    tldr:"Spirit mirror — window-for-window; whoever snaps back with the better ledger wins each cycle.",
    breakdown:"Trade Q3s in opposite windows, shield his third strike, and R second — his line lifts you both into whoever held the later button.",
    dos:["Offset your window from his","W his Q3, land yours","R second in the line war"],
    donts:["Mirror his E timing","Linger to out-trade past the edge","Knockup-race at even flow"],
    win:"Better ledger per window — the cleaner spirit wins.",
    winS:"His E is down — the next trade has no undo for him."
  },
  winS:"His answer is spent — E the window and run the full string.",
  tradeGood:"E in on the cooldown gap, Q3-W the lift, autos through the shield, snap back — the round trip he answered with a whiff.",
  tradeBad:"Lingering past the window for one more auto into held CC — the snap-back is the champion; outliving it is freelance.",
  waveBest:"a slow push that parks the wave where your E window reaches him — geometry is the entry fee.",
  waveWorst:"a crashed wave and a held stun — entering spirit form into CC is pre-writing the clip.",
  early:"Cycle the windows and stack the storm — your trades carry receipts the mage class can't file against.",
  mid:"First item onward, the windows turn lethal: E-string the contacts, R the river lines, and snap back out of every counter-argument.",
  late:"You are the flank with a return ticket: E behind their line, R the lift, string the landing — and let the snap-back disappoint their peel.",
  safetyTool:"E Soul Unbound (snap-back)",
  spikesLine:"Level 3 windows set the tempo; level 6 lines up teams; first item makes round trips lethal.",
  carryLine:"Carry through the windows — every fight is two fights when one of you can un-attend; the R line turns freezes into formations.",
  behindShort:"farm with Q cycles and stay relevant through window trades.",
  loadingRule:"Enter on his gaps, exit at the edge — the window is the matchup.",
  dontDetail:"The snap-back announces your return address — exchanges that end at your E marker end at a scheduled ambush if they warded it.",
  aheadTpl:"Ahead, cycle louder: window-trade {E} off every wave, R the river lines, and snap back through the panic — fed Yone makes melee feel like artillery.",
  behindTpl:"Behind, trade in receipts: shield-farm the windows, hold R for their formation, and let one good line reset the ledger.",
  spikeName:"first item",
  runeReport:"Lethal Tempo or Conqueror, Triumph, Legend: Alacrity, Last Stand; secondary Resolve — Bone Plating + Second Wind.",
  summReport:"Flash + Ignite into kill lanes; Flash + TP for the patient columns. The E already half-plays Flash both directions.",
  itemReport:"Start Doran's Blade + pot. Berserker's into BotRK or Shieldbow, then Infinity Edge and Death's Dance — mixed damage, mixed defenses.",
  jungleLine:"Your R lines up the gank lane for any follow-up and the E window means you can engage 2v2s your body never attends — ping the freeze windows.",
  redditLine:"windows not wishes, edges not encores, and R the line not the legend — Yone wins by attending only the halves of fights he booked.",
  load:{
    sub:"r/YoneMains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Noonquiver / Cloak piece (≈1000g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"BotRK / Immortal Shieldbow",
    secondItem:"Infinity Edge",
    boots:"Berserker's Greaves",
    bootsVsAP:"Mercury's Treads / Berserker's",
    bootsVsAD:"Plated Steelcaps / Berserker's",
    spike:"Two crit items — soul-window trades chunk half bars and the R line ends formations.",
    runes:{ keystone:"Lethal Tempo", primaryTree:"Precision", primary:["Triumph","Legend: Alacrity","Last Stand"], tree:"Resolve", secondary:["Bone Plating","Second Wind"], shards:["Attack Speed","Adaptive Force","Health"] }
  },
  specials:{
    vex:{ tldr:"Your E entry, Q3, and R all feed her fear schedule — the anti-Yone mage; window only post-pulse and let the snap-back be the whole plan." },
    lissandra:{ tldr:"Her root catches the window's entry and the tomb outlasts the snap-back — trade her cooldown gaps and never linger near the marker she's staring at." },
    yasuo:{ tldr:"The brother war — his wall blocks your Q3 wind; bait it with the second Q, window behind it, and R only when his web runs dry." }
  }
}
];

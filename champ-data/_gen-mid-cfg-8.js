// MatchupCoach — MID generator configs batch 8: Akali, Akshan, Diana, Ekko.
window.GEN_MID_CFGS_8 = [

// ============================== AKALI ==============================
{
  key:'akali', name:'Akali',
  curve:[0.0,0.1,0.2,0.3,0.6,0.5,0.3],
  lvl:[
    "Q the wave edge and his toes — the energy crunch is real, so every kama needs to farm AND poke at once.",
    "More Q pressure — hold the energy bar above 100 so a real trade window never finds you broke.",
    "Shroud online: the trade pattern is Q-auto, shroud the answer, Q again from the smoke. Most mids lose this exchange.",
    "Passive-weave every trade: spell, walk out of the ring, auto the edge — the energy refunds pay the whole lane.",
    "Perfect Execution online — the double-dash R turns half-health mages into clean-up duty. Look for the all-in.",
    "First item spike: shroud trades become kill threats. Force the wave contact and punish every spell he whiffs.",
    "Late Akali erases carries: R in through the front line, shroud the response, E-reset out with the kill."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'EVEN', fighter:'TRICKY' },
  diffEx:{ lissandra:'HARD', vex:'HARD', pantheon:'HARD',
    galio:'TRICKY', malzahar:'TRICKY', viktor:'TRICKY', anivia:'TRICKY', diana:'TRICKY', leblanc:'TRICKY', fizz:'TRICKY', irelia:'TRICKY', yasuo:'TRICKY', yone:'TRICKY', syndra:'TRICKY', veigar:'TRICKY', annie:'TRICKY', neeko:'TRICKY', aurora:'TRICKY', karma:'TRICKY', ryze:'TRICKY', taliyah:'TRICKY',
    hwei:'FAVOURED', xerath:'FAVOURED', ziggs:'FAVOURED', lux:'FAVOURED', zoe:'FAVOURED', brand:'FAVOURED', twistedfate:'FAVOURED',
    zed:'EVEN', kassadin:'EVEN', ekko:'EVEN', katarina:'EVEN', talon:'EVEN', qiyana:'EVEN', naafiri:'EVEN', sylas:'EVEN', ahri:'EVEN', cassiopeia:'EVEN', vladimir:'EVEN', swain:'EVEN', orianna:'EVEN', azir:'EVEN', mel:'EVEN' },
  vs:{
    control:{
      tldr:"He pokes until you shroud, then the lane belongs to the smoke — trade in obscured windows and energy-walk the rest.",
      breakdown:"Eat the early poke gracefully and farm with Q range. Once shroud is up the exchange inverts: he can't hit what he can't see, and your Q-auto weave out of the smoke chunks harder than his blind rotation.",
      dos:["Trade only with shroud available","Weave passive autos out of the smoke","Q his toes on every last-hit"],
      donts:["Burn shroud to farm safely","Trade pre-3 at his range","Dive past minions with energy under 100"],
      win:"Survive the poke, then win every shrouded exchange until one becomes a kill."
    },
    burst:{
      tldr:"His combo needs a target — the shroud deletes the targeting. Bait the rotation, vanish, and counter through the smoke.",
      breakdown:"Hold W for his real combo and his burst hits fog. Your counter-window is the 10+ seconds of cooldowns that follow: Q-auto-E chains end burst mages who spent everything on smoke.",
      dos:["Shroud his combo, not his poke","Counter-burst during his cooldown gap","Track his setup spell before stepping up"],
      donts:["Trade while his full rotation is loaded","Shroud-farm under pressure","All-in with energy broke"],
      win:"Make his burst hit smoke, then erase him in the cooldown silence."
    },
    assassin:{
      tldr:"A reset duel — your shroud out-stalls his window, and the one who picks the second fight usually wins it.",
      breakdown:"Both kits want a clean opening; deny his with W and keep yours flexible with E's return charge. Trade short until 6, then play the R-range chess: whoever commits first donates the counter-kill.",
      dos:["Stall his window with shroud","Hold E's return as the disengage","Commit R second in the standoff"],
      donts:["Coin-flip the level 6 race","Burn both E casts going in","Fight inside his wave at even HP"],
      win:"Out-stall the mirror-class duel and counter-kill the first commitment."
    },
    fighter:{
      tldr:"He out-stats the brawl you must not have — kite the ring, poke the edges, and only all-in off his whiffed engage.",
      breakdown:"Fighters beat shrouded Akali in extended trades, so trade in flashes: Q the edge, passive-auto, gone. The shroud is for his engage, not your greed, and your R is the punish for the gap-closer he wastes.",
      dos:["Q-poke the edges and leave","Shroud his engage, not your trades","R the whiffed gap-closer window"],
      donts:["Brawl inside the shroud vs sustain","Trade extended at even health","Spend E aggressively with his engage up"],
      win:"Flash-trade the edges and all-in only the engage he already wasted."
    }
  },
  mirror:{
    tldr:"Smoke mirror — energy discipline and shroud timing; whoever wastes W first fights blind.",
    breakdown:"Trade Q-for-Q until someone's shroud commits, then punish the smokeless seconds. The R standoff goes to whoever holds the second charge longer.",
    dos:["Shroud second, always","Punish her smokeless window hard","Bank energy before every exchange"],
    donts:["Q-spam to zero energy","Dive her shroud with your R","Trade E-for-E without follow-up"],
    win:"Hold the shroud longer and the mirror fights blind first.",
    winS:"Her shroud is down — every spell you have lands now."
  },
  winS:"His engage is spent — Q-auto the window and chain the kill.",
  tradeGood:"Q his toes on a last-hit, weave the passive ring auto, and step back — energy-positive chip that stacks toward the shroud all-in.",
  tradeBad:"Dumping Qs to zero energy and shroud-farming — broke and smokeless Akali is a melee minion with a dream.",
  waveBest:"a Q-thinned slow push you crash before roam timers — your kill windows live at wave contact.",
  waveWorst:"a frozen wave near his tower with W down — walking up energy-broke is the only way most lanes ever kill you.",
  early:"Farm with Q range, bank energy, and pick one shrouded trade per wave cycle — the lane tilts one exchange at a time.",
  mid:"First item onward, hunt: shroud the river fights, R the chipped, and E-reset out. Your roams hit harder than your pings suggest.",
  late:"You are the carry-eraser: R through the front line, shroud their answer, execute, E out. One deletion per fight is the contract.",
  safetyTool:"W Twilight Shroud",
  spikesLine:"Level 3 shroud trades tilt the lane; level 6 adds the execute; first item makes shrouded windows lethal.",
  carryLine:"Carry through deletions — one carry per fight, every fight; the shroud buys the time and the resets pay the exit.",
  behindShort:"farm with Q range and stay relevant through shroud picks.",
  loadingRule:"Trade only with shroud available — the smoke is the matchup.",
  dontDetail:"The shroud spent farming is the dive you can't answer — W is your Flash, your Zhonya's, and your opening all at once.",
  aheadTpl:"Ahead, erase the lane: shroud every contact, all-in the whiffs, and roam with R banked — fed Akali turns mid into a no-cast zone for {E}.",
  behindTpl:"Behind, the smoke still works: Q-farm, shroud the dives, and wait for the teamfight where one R deletes their carry anyway.",
  spikeName:"first item",
  runeReport:"Electrocute or Conqueror, Sudden Impact, Eyeball Collection, Ultimate Hunter; secondary Precision — Presence of Mind + Coup de Grace.",
  summReport:"Flash + Ignite — Akali lanes are kill scripts; TP only into the HARD column.",
  itemReport:"Start Doran's Shield or Ring + pots. Riftmaker or Stormsurge-line first, Sorcerer's/Mercs, then Zhonya's into burst, Rabadon's after.",
  jungleLine:"Your shroud turns 2v2s — the enemy jungler fights blind while yours doesn't. Shroud ON the fight, not behind it.",
  redditLine:"energy over ego, shroud engages not farm, and weave the ring auto every spell — Akali wins the lane one disciplined trade at a time.",
  load:{
    sub:"r/akalimains",
    start:"Doran's Shield + Health Potion",
    normalBack:"Hextech Alternator (≈1100g) — trades start killing",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Riftmaker / Stormsurge",
    secondItem:"Zhonya's Hourglass",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Mercury's Treads / Sorcerer's Shoes",
    bootsVsAD:"Plated Steelcaps / Sorcerer's Shoes",
    spike:"First item + 6 — shrouded windows become deletions.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Sudden Impact","Eyeball Collection","Ultimate Hunter"], tree:"Precision", secondary:["Presence of Mind","Coup de Grace"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    lissandra:{ tldr:"Her W roots you in the shroud you trusted and her self-R laughs at your all-in — the anti-Akali pick; farm with Q range and win elsewhere." },
    vex:{ tldr:"Every dash you cast feeds her fear schedule — trade on foot, shroud her pulse, and dash only after the glow is spent." },
    yasuo:{ tldr:"His passive shield eats your opener and Wind Wall blocks the kama — break the shield with a throwaway Q, trade behind the wall's cooldown, and shroud his knockup window." }
  }
},

// ============================== AKSHAN ==============================
{
  key:'akshan', name:'Akshan',
  curve:[0.4,0.4,0.4,0.3,0.4,0.4,0.1],
  lvl:[
    "Auto-Q the wave contact — your three-hit passive plus the boomerang's double pass bullies melee and mage alike at one.",
    "E unlocked: scout the swing angles now — every wall on the map is a gank escape or an entrance.",
    "Full kit: Q-auto-passive chunks, W camouflage resets trades, and the swing turns jungle walls into highways.",
    "Trade on every Q cooldown — the boomerang's return hit makes close-range trades double-dip.",
    "Avengerang... no — R online: Vengeance executes the chipped from two screens. Chip, then channel.",
    "First item spike: swing-autos shred. Force extended trades the passive shield math wins.",
    "Late Akshan picks and avenges: swing the flank, execute the carry, and revive your team's mistakes... by avenging their killers."
  ],
  diffBase:{ control:'FAVOURED', burst:'EVEN', assassin:'TRICKY', fighter:'TRICKY' },
  diffEx:{ pantheon:'HARD', irelia:'HARD', yasuo:'HARD',
    yone:'TRICKY', zed:'TRICKY', katarina:'TRICKY', akali:'TRICKY', fizz:'TRICKY', malzahar:'TRICKY', vex:'TRICKY', galio:'TRICKY', syndra:'TRICKY', annie:'TRICKY', lissandra:'TRICKY', neeko:'TRICKY',
    kassadin:'FAVOURED',
    leblanc:'EVEN', ekko:'EVEN', diana:'EVEN', talon:'EVEN', qiyana:'EVEN', naafiri:'EVEN', sylas:'EVEN', ahri:'EVEN', zoe:'EVEN', veigar:'EVEN', vladimir:'EVEN', cassiopeia:'EVEN', swain:'EVEN', ryze:'EVEN', karma:'EVEN', mel:'EVEN', aurora:'EVEN', brand:'EVEN', twistedfate:'EVEN' },
  vs:{
    control:{
      tldr:"You out-auto the spell class — three-hit trades on every contact and the lane is a subscription he keeps paying.",
      breakdown:"Your auto-Q-auto pattern out-damages mage rotations at even range, and W camouflage resets the trades he thought he tracked. Dodge the one key spell and the rest of his kit loses the DPS race.",
      dos:["Three-hit trade every wave contact","Dodge his key spell, then commit the pattern","Swing-reset trades through walls"],
      donts:["Eat poke during your Q cooldown","Trade inside his all-in range at half HP","Spend the swing greedily without vision"],
      win:"Win the auto war the mage class never drafted for."
    },
    burst:{
      tldr:"His combo beats your health bar — your shield and camouflage beat his targeting. Trade in passes, vanish between.",
      breakdown:"Take three-hit trades and break line of sight before his rotation answers. The passive shield blunts the opener and your E swing makes the follow-up a geometry problem he fails.",
      dos:["Trade in passes, vanish via W between","Hold the swing as the combo dodge","Punish his cooldown gap with full strings"],
      donts:["Stand and DPS into his loaded combo","Swing predictably along warded walls","Trade at half HP without the shield"],
      win:"Bleed him in passes and dodge the one rotation that mattered."
    },
    assassin:{
      tldr:"He dives a marksman with a grappling hook — annoying for him, lethal for you if the swing is down.",
      breakdown:"Your range bullies his approach but one clean engage erases you: keep the swing banked, trade at max auto range, and W-stealth the resets. Post-6, R executes his low-health roam returns.",
      dos:["Bank E strictly for his engage","Kite at maximum auto range","R-execute his chipped resets"],
      donts:["Swing in for style points","Trade inside his dash range","Push past river with E down"],
      win:"Bully the approach, swing out of the dive, and execute the resets from two screens."
    },
    fighter:{
      tldr:"He runs at a kiting machine — autos and boomerangs tax the approach, the swing refuses the arrival.",
      breakdown:"Keep the fight at auto range forever: Q the approach, kite the gap, and swing over the wall when his engage finally lands. Your DPS wins any fight that stays at your range and loses every fight that doesn't.",
      dos:["Kite the approach with Q-auto strings","Swing out the moment he connects","Shield-trade his poke phase"],
      donts:["Brawl inside his reach","Waste W's stealth on tempo","Let the wave pull you into engage range"],
      win:"Tax the approach and refuse the arrival — range is the whole sentence."
    }
  },
  mirror:{
    tldr:"Swing mirror — auto efficiency and wall discipline; whoever lands more three-hit strings owns the lane.",
    breakdown:"Trade pattern-for-pattern and dodge his Q returns. The swing duel goes to whoever banks E second; the R duel to whoever chipped first.",
    dos:["Win the three-hit string count","Dodge the boomerang's return pass","Hold the swing longer than he does"],
    donts:["Trade during your Q downtime","Swing first in the standoff","Channel R inside his auto range"],
    win:"Out-string and out-swing — the cleaner scoundrel wins.",
    winS:"His swing is down — force the trade he can't exit."
  },
  winS:"His engage is spent — string the trade and swing the exit.",
  tradeGood:"Auto-Q-auto at wave contact so the boomerang double-passes, then break line of sight — three-hit math he answers with one spell.",
  tradeBad:"Swinging in to 'finish' a trade with his answer loaded — the rope is your escape, and spent ropes write obituaries.",
  waveBest:"an auto-shoved push that crashes while you swing-scout the river — your tempo lives on wall access.",
  waveWorst:"a frozen wave at his tower with E down — a marksman with no rope is a bounty with a boomerang.",
  early:"Bully the contact points — your string trades beat almost everything mid at level 1-3. Bank the lane lead before assassin timers start.",
  mid:"First item onward, play pick-and-execute: chip with strings, swing the flanks, and R the runners. Every wall is your jungle entrance.",
  late:"You are the flank executioner: swing behind the fight, string the carry, R whatever flees — and keep one wall between you and their answer.",
  safetyTool:"E Heroic Swing",
  spikesLine:"Level 1 strings bully; level 6 adds the execute; first item makes swing-autos shred.",
  carryLine:"Carry through strings and executes — chip everything, finish anything under a third, and let the swing write angles no one wards.",
  behindShort:"farm with Q strings and stay relevant through R executes.",
  loadingRule:"Three-hit strings or nothing — half trades waste the passive.",
  dontDetail:"The swing is your entrance AND your exit — never spend both directions in one play.",
  aheadTpl:"Ahead, bully harder: string {E} off every contact, swing-roam the rivers, and execute the map's mistakes with R.",
  behindTpl:"Behind, string from range: farm safe, bank the swing for dives, and chip toward the executes that reset deficits.",
  spikeName:"first item",
  runeReport:"Press the Attack or First Strike, Presence of Mind, Legend: Alacrity, Coup de Grace; secondary Domination — Taste of Blood + Treasure Hunter.",
  summReport:"Flash + Ignite into kill lanes; Flash + TP into the HARD column. The swing already half-plays Flash.",
  itemReport:"Start Doran's Blade + pot. Kraken or Stormrazor-line first, Berserker's, then Infinity Edge path. Standard marksman spine with assassin manners.",
  jungleLine:"Swing-scout for your jungler and string the gank target — your passive shield makes you the best 2v2 marksman mid offers.",
  redditLine:"strings not pokes, walls not lanes, and avenge with manners — Akshan wins by being a marksman where assassins expected a victim.",
  load:{
    sub:"r/AkshanMains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Noonquiver piece (≈1000g) — strings start shredding",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Kraken Slayer / Stormrazor",
    secondItem:"Infinity Edge path",
    boots:"Berserker's Greaves",
    bootsVsAP:"Mercury's Treads / Berserker's",
    bootsVsAD:"Plated Steelcaps / Berserker's",
    spike:"First crit item — swing-autos shred and the executes start landing.",
    runes:{ keystone:"Press the Attack", primaryTree:"Precision", primary:["Presence of Mind","Legend: Alacrity","Coup de Grace"], tree:"Domination", secondary:["Taste of Blood","Treasure Hunter"], shards:["Attack Speed","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall eats your autos, your Q, AND your R channel — the marksman nightmare. String only behind the wall's cooldown and never channel R in his screen." },
    pantheon:{ tldr:"His E blocks your strings from the front and his W stun starts the dive you can't shield through — trade only from angles, and swing the moment the vault is down." },
    kassadin:{ tldr:"A melee mage with no shield against autos — string him off every CS and end the lane before Riftwalk makes the rope feel short." }
  }
},

// ============================== DIANA ==============================
{
  key:'diana', name:'Diana',
  curve:[0.0,0.1,0.2,0.3,0.6,0.5,0.4],
  lvl:[
    "Q the wave's edge and his face in one arc — the crescent farms and pokes at once; learn the curve's sweet spot.",
    "W shield-trade window: orbs absorb his poke and pay it back on the three-hit passive.",
    "E pull joins... no — your dash threat begins: Q-mark into E reset chases are live; trade on every landed crescent.",
    "Mark-dash trades on cooldown — Q, E to the mark, passive three-hit, walk. The lane respects the curve now.",
    "Moonfall online — the R pull turns any clumped trade into your fight. With jungle help it's a guaranteed flip.",
    "First item spike: the mark-dash combo chunks half bars and the reset chains through waves.",
    "Late Diana dives: E the carry through the front line, R the clump that collapses, and reset through the wreckage."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'EVEN', fighter:'EVEN' },
  diffEx:{ syndra:'HARD',
    kassadin:'FAVOURED',
    xerath:'TRICKY', ziggs:'TRICKY', lux:'TRICKY', leblanc:'TRICKY', yasuo:'TRICKY', yone:'TRICKY', irelia:'TRICKY', fizz:'TRICKY', malzahar:'TRICKY', lissandra:'TRICKY', vex:'TRICKY', annie:'TRICKY', galio:'TRICKY', pantheon:'TRICKY', akali:'TRICKY', zed:'TRICKY', hwei:'TRICKY', viktor:'TRICKY', orianna:'TRICKY', anivia:'TRICKY', karma:'TRICKY', taliyah:'TRICKY', neeko:'TRICKY', aurora:'TRICKY', mel:'TRICKY', zoe:'TRICKY',
    katarina:'EVEN', ekko:'EVEN', talon:'EVEN', qiyana:'EVEN', naafiri:'EVEN', sylas:'EVEN', ahri:'EVEN', cassiopeia:'EVEN', vladimir:'EVEN', swain:'EVEN', ryze:'EVEN', twistedfate:'EVEN', veigar:'EVEN', brand:'EVEN', azir:'EVEN' },
  vs:{
    control:{
      tldr:"He pokes until a crescent lands — then the dash erases the range that protected him. One Q per kill window.",
      breakdown:"Farm through the poke with W shields and Q sweet spots. Every landed crescent is a free dash with a three-hit rider; chain enough of them and the all-in at 6 is just arithmetic.",
      dos:["Land Q through the wave onto his chest","Shield-trade with W's orb timing","Dash only onto marked targets"],
      donts:["E without a mark to reset off","Eat poke with W down","Force the all-in before a Q lands"],
      win:"Survive the range war one crescent at a time, then dash through the math at 6."
    },
    burst:{
      tldr:"His combo is scheduled — yours is reactive. Shield the rotation, mark the caster, and arrive before his cooldowns do.",
      breakdown:"W absorbs the opener and your mark-dash punishes the gap: Q as his combo ends, E the mark, three-hit through the panic. The R pull finishes anyone who thought walking away was an option.",
      dos:["W-shield his opening rotation","Q-E the cooldown gap instantly","R the disengage attempt"],
      donts:["Dash in while his combo is loaded","Trade shield-less at his range","Spend E without the reset mark"],
      win:"Absorb the burst, dash the silence, and pull the conclusion."
    },
    assassin:{
      tldr:"A dive mirror where your shield votes — trade three-hit strings behind W and out-sustain the burst exchange.",
      breakdown:"Your W gives you the stat edge in assassin mirrors: short trades behind orbs, mark-dash the disengage, and hold R for his committed all-in. The second fight is always yours.",
      dos:["Trade behind W orbs every exchange","Mark-dash his disengage windows","Hold R to flip his committed all-in"],
      donts:["Coin-flip the first level 6 window","Dash in without the shield up","Chase resets through his wave"],
      win:"Win the shielded exchanges and flip the all-in with Moonfall."
    },
    fighter:{
      tldr:"You out-burst what he out-brawls — strike in moon-phases: mark, dash, three hits, gone before the sustain argues.",
      breakdown:"Never stand in the extended fight: Q-E in, passive string, W as you leave. The R pull is your all-in punctuation when his engage is finally spent — until then, phases only.",
      dos:["Trade in three-hit phases, then leave","W as you exit, not as you enter","R only after his engage is spent"],
      donts:["Brawl past your passive string","Dash in with W on cooldown","Trade inside his wave at even HP"],
      win:"Phase-trade the brawler and pull the finale on your timer."
    }
  },
  mirror:{
    tldr:"Moon mirror — whoever lands the first crescent dashes first, and whoever holds R second pulls the winning fight.",
    breakdown:"Dodge her Q arc, land yours, and trade behind your W orbs. The R standoff goes to the second caster — her pull groups you for yours.",
    dos:["Dodge the arc, land the arc","Shield-trade every exchange","R second in the pull war"],
    donts:["Dash unmarked into her shield","Trade W-less at even HP","Pull first without follow-up"],
    win:"First crescent runs the lane; second Moonfall wins the fight.",
    winS:"Her shield is down — mark and dash the window."
  },
  winS:"His engage is spent — Q-E the mark and string the kill.",
  tradeGood:"Q through the wave onto his chest, E the mark, three-hit string, walk — the phase trade he answers after you've left.",
  tradeBad:"Dashing onto an unmarked target with W down — Diana without the reset or the shield is a melee mage donating proximity.",
  waveBest:"a Q-cleared slow push you crash before roam windows — the crescent farms the wave and threatens the lane in one cast.",
  waveWorst:"a frozen wave near his tower with E down — walking up markless into poke is the lane's only losing pattern.",
  early:"Farm the sweet spots and shield-trade — your early is sturdier than assassin stereotypes. Every landed Q is a banked dash.",
  mid:"First item onward, chain the phases: mark-dash the contacts, R the river clumps, and reset through whatever groups.",
  late:"You are the dive: E through the front line onto their carry, R the collapse, and let the resets carry you out famous.",
  safetyTool:"W Pale Cascade",
  spikesLine:"Level 3 mark-dash sets the pattern; level 6 adds the pull; first item makes phases lethal.",
  carryLine:"Carry through the dive — mark, dash, pull, delete; your R turns their teamfight spacing into a suggestion.",
  behindShort:"farm with Q arcs and stay relevant through R engage.",
  loadingRule:"Dash only onto marks — the reset is the kit.",
  dontDetail:"Your W is the trade — entering without orbs is volunteering for his combo at melee range.",
  aheadTpl:"Ahead, phase harder: zone {E} with crescent threat, dive the river fights, and R every clump — fed Diana makes grouping illegal.",
  behindTpl:"Behind, shield-farm the arcs and hold R for their clump — one five-man Moonfall resets any scoreboard Diana acknowledges.",
  spikeName:"first item",
  runeReport:"Electrocute or Conqueror, Sudden Impact, Eyeball Collection, Ultimate Hunter; secondary Precision — Presence of Mind + Coup de Grace.",
  summReport:"Flash + Ignite for kill lanes; Flash + TP into the poke columns you must survive first.",
  itemReport:"Start Doran's Shield or Ring + pots. Stormsurge or Riftmaker line, Sorcerer's/Mercs, then Zhonya's and Rabadon's.",
  jungleLine:"Your R pull is the best clump-setup in mid — dive with your jungler and Moonfall the collapse; pre-6, mark-dash makes any gank stick.",
  redditLine:"crescent first, dash second, pull last — Diana wins by sequencing three buttons into one funeral.",
  load:{
    sub:"r/DianaMains",
    start:"Doran's Shield + Health Potion",
    normalBack:"Hextech Alternator (≈1100g) — phases start chunking",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Stormsurge / Riftmaker",
    secondItem:"Zhonya's Hourglass",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Mercury's Treads / Sorcerer's",
    bootsVsAD:"Plated Steelcaps / Sorcerer's",
    spike:"First item + 6 — mark-dash phases become deletions with a pull attached.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Sudden Impact","Eyeball Collection","Ultimate Hunter"], tree:"Precision", secondary:["Presence of Mind","Coup de Grace"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    syndra:{ tldr:"She out-ranges the crescent and her E stops the dash mid-flight — the anti-Diana mage; farm sweet spots, shield the QE, and all-in only off her cooldown gaps." },
    yasuo:{ tldr:"Wind Wall eats the crescent your whole kit keys off — bait it before any commit, and R his knockup clump back at him." },
    kassadin:{ tldr:"Bully the melee mage with arcs and strings all lane — his shield eats one Q, not the dash-string behind it; end before three items." }
  }
},

// ============================== EKKO ==============================
{
  key:'ekko', name:'Ekko',
  curve:[0.0,0.1,0.2,0.3,0.5,0.5,0.4],
  lvl:[
    "Q the wave and his toes — the return pass chunks; learn the slow zone's drag on his dodge patterns.",
    "E blink-strike window opens: Q-E-auto is your first real trade and the third passive hit stings already.",
    "W zone games begin: drop it on his retreat line BEFORE trading and the stun finds him mid-regret.",
    "Three-hit trades on cooldown — Q in, E the gap, passive proc, walk. Bank the tempo for 6.",
    "Chronobreak online — your aggression gets a save file. Trade like the rewind exists, because it does.",
    "First item spike: the full string deletes half bars and the rewind erases the counter-argument.",
    "Late Ekko picks and survives: dive the carry, W the peel, and Chronobreak out of whatever they answered with."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'EVEN', fighter:'TRICKY' },
  diffEx:{ lissandra:'HARD', vex:'HARD',
    kassadin:'FAVOURED', twistedfate:'FAVOURED',
    syndra:'TRICKY', xerath:'TRICKY', viktor:'TRICKY', malzahar:'TRICKY', annie:'TRICKY', veigar:'TRICKY', swain:'TRICKY', galio:'TRICKY', yasuo:'TRICKY', yone:'TRICKY', irelia:'TRICKY', pantheon:'TRICKY', fizz:'TRICKY', zed:'TRICKY', neeko:'TRICKY', aurora:'TRICKY', karma:'TRICKY', taliyah:'TRICKY',
    katarina:'EVEN', akali:'EVEN', leblanc:'EVEN', talon:'EVEN', qiyana:'EVEN', naafiri:'EVEN', sylas:'EVEN', diana:'EVEN', ahri:'EVEN', zoe:'EVEN', lux:'EVEN', ziggs:'EVEN', cassiopeia:'EVEN', vladimir:'EVEN', anivia:'EVEN', orianna:'EVEN', azir:'EVEN', hwei:'EVEN', ryze:'EVEN', brand:'EVEN', mel:'EVEN', annie:'TRICKY' },
  vs:{
    control:{
      tldr:"He pokes a champion with an undo button — trade Q passes, blink the gaps, and rewind the lane's one mistake.",
      breakdown:"Farm through the early range tax with Q returns, then trade in strings once E is up. Post-6 you can take exchanges nobody else would — Chronobreak refunds the trades that go wrong and doubles the ones that go right.",
      dos:["Q both passes through his position","String trades only with E available","Rewind aggressive trades that sour"],
      donts:["Blink in with his key spell loaded","Trade pre-3 at his range","Save R so long it expires unused"],
      win:"Tax the lane in strings and let the rewind underwrite the all-in."
    },
    burst:{
      tldr:"His rotation kills the version of you from four seconds ago — the present one rewinds out and counter-strings.",
      breakdown:"Bait the combo with hologram positioning, eat what you must, and Chronobreak the refund. Your W stun zone pre-placed on his engage line turns his own setup into your opener.",
      dos:["Pre-place W on his engage line","Trade strings during his cooldown gap","Rewind the combo he lands — then re-enter"],
      donts:["Blink into a loaded rotation","Drop W reactively — it's a prophecy tool","Trade at half HP without R up"],
      win:"Let his combo hit the past and answer it from the present."
    },
    assassin:{
      tldr:"A reset duel where yours rewinds — trade strings, bank the hologram, and counter-kill the all-in he can't take back.",
      breakdown:"You both want short violent exchanges; yours come with insurance. String behind W zones, hold R for his committed window, and remember the second fight after his cooldowns is always yours.",
      dos:["String trades behind W prophecy zones","Hold R for his real commitment","Punish the post-combo silence hard"],
      donts:["Coin-flip level 6 with R down","Blink in for greed without the string","Fight in his wave at even HP"],
      win:"Out-insure the assassin mirror and rewind the duel he thought he won."
    },
    fighter:{
      tldr:"He brawls, you phase — three hits and gone, with a rewind for the one time the door closes too slow.",
      breakdown:"Never give the extended fight: Q-E-auto and leave, W his chase line, and spend R the moment his engage finally connects. Your kit out-tempos sustain; it never out-stats it.",
      dos:["Phase-trade three hits and leave","W the chase lane pre-emptively","Rewind the connected engage instantly"],
      donts:["Brawl past the passive proc","Blink in with R down vs all-in kits","Trade inside his wave"],
      win:"Phase the brawl and rewind the single mistake the brawler was waiting for."
    }
  },
  mirror:{
    tldr:"Rewind mirror — whoever lands the string lands the stun; whoever rewinds second rewinds smarter.",
    breakdown:"Track his hologram like a second champion, dodge the Q returns, and W where his rewind will land — stunning the arrival is the mirror's only clean kill.",
    dos:["Watch his hologram's position always","W his rewind landing spot","String first, rewind second"],
    donts:["Trade during his W zone window","Rewind predictively at even HP","Chase through his slow zone"],
    win:"Stun the rewind's arrival — the mirror is won at the hologram.",
    winS:"His R is down — the next string has no undo."
  },
  winS:"His engage is spent — string the window; he can't take it back.",
  tradeGood:"Q through him, E the gap, passive third hit, walk out through the slow — the full string chunks and the return pass pays the exit.",
  tradeBad:"Blinking in with R down against a loaded kit — Ekko without the rewind is a mid laner doing parkour at a funeral.",
  waveBest:"a Q-cleared push that crashes while your hologram bank stays healthy — tempo with insurance.",
  waveWorst:"a frozen wave near his tower with E down — no blink, no string, no business being there.",
  early:"String what's free and bank what isn't — your early is honest until 6 makes it dishonest in your favor.",
  mid:"First item onward, trade like the rewind exists: dive the chipped, W the peel, R the answer. Your tempo compounds.",
  late:"You are the pick that survives the response: dive their carry, Chronobreak the collapse, and W-stun the chase that follows you out.",
  safetyTool:"R Chronobreak",
  spikesLine:"Level 3 strings set the pattern; level 6 underwrites the aggression; first item makes strings lethal.",
  carryLine:"Carry through insured dives — one carry per rewind cycle; your job is spending R as a weapon, not an apology.",
  behindShort:"farm with Q passes and stay relevant through W stuns and R picks.",
  loadingRule:"String with E available, dive with R available — never neither.",
  dontDetail:"The rewind heals off the hologram's path — diving away from your own past is how Ekkos die with R up.",
  aheadTpl:"Ahead, compound the tempo: string {E} off every contact, dive the rivers insured, and rewind the audits — fed Ekko makes time a one-way argument.",
  behindTpl:"Behind, phase quietly: Q-farm, W the dives, and hold R as the comeback button it literally is.",
  spikeName:"first item",
  runeReport:"Electrocute or Conqueror, Sudden Impact, Eyeball Collection, Ultimate Hunter; secondary Precision — Presence of Mind + Coup de Grace.",
  summReport:"Flash + Ignite standard — the string-plus-ignite math closes most mids; TP into the HARD column.",
  itemReport:"Start Doran's Shield or Ring + pots. Hextech Rocketbelt or Stormsurge line, Sorcerer's, then Zhonya's-Lich Bane paths.",
  jungleLine:"Pre-place W on the gank lane and the stun does the jungler's job — post-6 you can dive any counter-gank knowing the rewind votes last.",
  redditLine:"string in threes, prophecy the W, and spend the rewind like a weapon — Ekko wins by living four seconds ahead of the lane.",
  load:{
    sub:"r/EkkoMains",
    start:"Doran's Shield + Health Potion",
    normalBack:"Hextech Alternator (≈1100g) — strings start chunking",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Hextech Rocketbelt / Stormsurge",
    secondItem:"Zhonya's / Lich Bane",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Mercury's Treads / Sorcerer's",
    bootsVsAD:"Plated Steelcaps / Sorcerer's",
    spike:"First item + 6 — strings delete half bars and the rewind erases rebuttals.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Sudden Impact","Eyeball Collection","Ultimate Hunter"], tree:"Precision", secondary:["Presence of Mind","Coup de Grace"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    lissandra:{ tldr:"Her W roots the blink and her R freezes the rewind window — the anti-Ekko pick; string only off her cooldown gaps and rewind EARLY, not desperately." },
    vex:{ tldr:"Your E and R both feed her fear schedule — phase on foot when the glow is up and spend the rewind only after her pulse is banked." },
    twistedfate:{ tldr:"He locks gold at a melee blink champion — string him before the card locks, and rewind out of the gank his R schedules; you win every honest exchange." }
  }
}
];

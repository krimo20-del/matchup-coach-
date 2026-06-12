// MatchupCoach — MID generator configs batch 1: Anivia, Aurelion Sol, Azir, Cassiopeia.
window.GEN_MID_CFGS_1 = [

// ============================== ANIVIA ==============================
{
  key:'anivia', name:'Anivia',
  curve:[-0.4,-0.2,0.0,0.2,0.7,0.6,0.8],
  lvl:[
    "Q only — last-hit with autos and save the stun strictly for his step-ups. Your egg is NOT a license to int level 1.",
    "Q-E online — a landed stun now means a real chunk. Trade only when his engage tool is down; your mana hates wasted rotations.",
    "Full basic kit: W cuts the lane in half. Wall his path to the wave when your jungler shadows — free stun setups.",
    "Hit Lost Chapter timing and the mana war ends. Chip {E} with max-range Q threats and bank Manaflow stacks.",
    "Glacial Storm changes everything — your wave-clear is instant and the Q-R-E execute is real. {E} must respect every stun line now.",
    "Seraph's/RoA spike: your storm stays on longer than his patience. Zone him off the wave and call jungle dives onto the chill slow.",
    "You are now a teamfight wall: storm the choke, wall the flank, and double-damage E anything that touches the slow zone."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'TRICKY', fighter:'TRICKY' },
  diffEx:{ fizz:'HARD', yasuo:'HARD', yone:'HARD', syndra:'HARD', cassiopeia:'HARD',
    katarina:'FAVOURED', kassadin:'EVEN', talon:'EVEN', naafiri:'EVEN', irelia:'EVEN', galio:'EVEN',
    xerath:'TRICKY', ziggs:'TRICKY', viktor:'TRICKY', azir:'TRICKY', karma:'TRICKY', zoe:'TRICKY', leblanc:'TRICKY' },
  vs:{
    control:{
      tldr:"A wave-clear war you eventually win — survive his range early, then R erases waves while your stun threatens his face.",
      breakdown:"Pre-6 he out-tempos you, so farm with autos and Q only on real windows. Post-6 your storm clears faster than his rotation and every Q he dodges costs him position. Track {K} and step forward the moment it is spent.",
      dos:["Bank Manaflow off max-range Q threats","Match his shove with R the instant you have 6","Wall off his retreat when your jungler shows"],
      donts:["Spam Q into a full health bar pre-6","Stand in his poke pattern while last-hitting","Push past river with your egg down"],
      win:"Survive the early range war, then out-clear and out-zone him with storm + wall."
    },
    burst:{
      tldr:"He needs a full combo to pop the egg AND the bird — make the combo cost a stun to attempt.",
      breakdown:"Your passive breaks his assassination math: he must burst you twice. Hold Q for his commit, wall his exit, and E him while he panics over the egg. Respect only the windows where {K} plus ignite genuinely clears both health bars.",
      dos:["Hold Q strictly for his engage commit","Wall his exit path the moment he dives","Track {K} before stepping past river"],
      donts:["Egg-check his full combo at half HP","Waste the stun on poke he can sidestep","Fight far from your tower pre-6"],
      win:"Make him kill you twice through a stun and a wall — then storm the wave he stopped farming."
    },
    assassin:{
      tldr:"The egg ruins his one-shot plan — but only if your Q and wall make the second kill attempt lethal for HIM.",
      breakdown:"He dives, you stun, the egg laughs. That is the design — but it needs discipline: hoard Flash and W for the dive, keep the wave near your tower, and never show him a no-cooldowns window. Post-6 the storm makes his roam-shove impossible.",
      dos:["Keep the wave on your side of the lane","Save W to block his dive path or exit","Stun him INSIDE your tower range when he commits"],
      donts:["Walk up with Q on cooldown","Burn W for poke spacing","Chase a reset assassin through his own wave"],
      win:"Tax every dive with stun-wall-tower math, then out-scale him into a teamfight he cannot enter."
    },
    fighter:{
      tldr:"He walks through your damage if you let him walk in a straight line — never let the line exist.",
      breakdown:"Dash-fighters beat Anivia by closing fast and hitting the bird, not the egg. Pre-place the wall thought: every trade happens with W charged and an escape angle planned. The storm zone post-6 is your no-fly zone — fight from inside it or not at all.",
      dos:["Fight only from inside or behind your storm","Wall his dash path mid-engage","Chill him with R before E for double damage"],
      donts:["Trade in the open with W down","Let him snowball level 2-3 for free","Stand at max storm range where he can flank"],
      win:"Zone him off the wave with storm math he cannot trade into, and wall every all-in."
    }
  },
  mirror:{
    tldr:"Bird mirror — whoever lands the first stun wins the trade, whoever wastes R on a wave loses the fight.",
    breakdown:"Identical kits, brutal mana war. Dodge her Q at all costs (your egg math equals hers), bank Manaflow harder, and only commit when her E double-damage window is offline because you dodged the stun.",
    dos:["Dodge her Q before throwing yours","Win the Manaflow banking war","Egg-bait her storm, then re-engage"],
    donts:["Trade stun-for-stun on her terms","Storm a wave while she storms you","Waste your wall on spacing she controls"],
    win:"Land the first stun and convert with double-damage E — mechanics decide it.",
    winS:"Her stun is down — step up and chunk for free."
  },
  winS:"No stun threat — walk up and trade freely.",
  tradeGood:"Threaten Q until {E} burns his sidestep tool, land it, then E + auto and walk before the answer — chilled E double-damage is the whole trade.",
  tradeBad:"Spamming Q on cooldown until you are out of mana with no stun threat left — that is when {E} walks straight at you.",
  waveBest:"a slow push you bank pre-6 and an instant R-clear shove post-6 — roam-timer mid is yours once the storm is online.",
  waveWorst:"a frozen wave near his tower pre-6 — every last-hit walks you into {K} with no wall charged.",
  early:"Survive levels 1-5: auto-farm, Q only real windows, and treat the egg as insurance, not a strategy. Lost Chapter is your first power spike.",
  mid:"Post-6 the lane inverts: R clears any wave instantly, so shove and force {E} to farm under tower while you bank plates and Manaflow. Call jungle dives — your chill slow plus wall is the best setup in the game.",
  late:"You own every choke: storm the objective pit, wall their engage, and E anything chilled. Nobody walks through an Anivia who holds her stun.",
  safetyTool:"W Crystallize",
  spikesLine:"Lost Chapter ends the mana war; level 6 inverts the tempo; Seraph's/RoA makes the storm permanent.",
  carryLine:"Carry by controlling space — storm and wall decide where fights happen, and your stun decides who dies first inside them.",
  behindShort:"farm with R wave-clear and stay relevant through zone control.",
  loadingRule:"Hold Q for his engage — never spend the stun on poke.",
  dontDetail:"Your wall is your Flash — a wasted Crystallize means the next gank kills the bird AND the egg.",
  aheadTpl:"Ahead, the lane is a prison: storm every wave, wall {E} away from the comeback farm, and rotate first to every river fight with your stun loaded.",
  behindTpl:"Behind, hug tower and R-clear — Anivia is never out of a game that reaches teamfights. Bank mana items, hold the stun, and let the egg discourage dives.",
  spikeName:"Seraph's",
  runeReport:"Electrocute or Arcane Comet, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight. Comet rewards the chill-slow synergy.",
  summReport:"Flash + Teleport standard — TP covers your weak early and converts post-6 shoves into map plays. Ignite only into dive comps you must kill twice.",
  itemReport:"Start Doran's Ring + 2 pots. Lost Chapter rush into Rod of Ages or Seraph's; then Archangel's, Rabadon's, Zhonya's vs dive. Mana is your real first item.",
  jungleLine:"Your wall + chill is elite gank setup — wall behind {E} the moment your jungler commits and the kill is guaranteed. You are immobile: ward both river entrances always.",
  redditLine:"survive to Lost Chapter, hold the stun for engages, and let the egg ruin assassination math — Anivia wins every game that goes long.",
  load:{
    sub:"r/Anivia",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — ends the mana war",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Rod of Ages / Seraph's",
    secondItem:"Archangel's Staff",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Seraph's + RoA online — the storm never turns off and the egg has a shield behind it.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall blocks your Q and E — trade only with the wall down, and wall HIS dash path instead.",
      dos:["Bait Wind Wall with a slow max-range Q","Use W to cut his dash-chain through the wave","Storm the wave from angles his wall can't cover"],
      donts:["Throw Q into an available Wind Wall","Let him EQ-dash through your wave for free","Fight in his minion wave post-6"] },
    fizz:{ tldr:"His E dodges your stun and his burst pops bird-then-egg — hoard W and Flash for the level-6 dive windows.",
      dos:["Hold Q until his E hop is spent","Wall between you and his Q engage line","Hug tower from 6 until Seraph's"] },
    katarina:{ tldr:"Your storm is a Death Lotus delete button — stand in it and she cannot enter the fight.",
      dos:["Drop R on her dagger the moment she commits","Hold Q for her Shunpo landing spot","Wall her reset path out of the fight"] },
    kassadin:{ tldr:"Bully him off CS pre-6 — but his R is a blink, not a dash: your wall stops nothing after 6, so win NOW." }
  }
},

// ============================== AURELION SOL ==============================
{
  key:'aurelionsol', name:'Aurelion Sol',
  curve:[-0.7,-0.5,-0.3,0.0,0.5,0.6,1.0],
  lvl:[
    "Q-channel last hits only — you are the weakest level-1 champion in the lane. Give ground, take CS, stack the first stardust.",
    "Still farming. Drag the Q beam across his face only when he steps onto your caster minions — every champion tick is permanent stacks.",
    "E online: drop the black hole ON the wave and Q the pull — your first real clear pattern, and every execute tick stacks stardust.",
    "W lets you Q while flying — the burn-flyby trade is real now. In-and-out: never land inside his engage range.",
    "Falling Star online — the self-peel stun your kit was missing. With R up, his dive math suddenly has a second variable.",
    "RoA/Seraph timing: your E executes the back line of every wave and the stardust curve bends upward for good.",
    "You are the scaling endgame: The Skies Descend flips entire objective fights and your Q melts anything that stands in the singularity."
  ],
  diffBase:{ control:'TRICKY', burst:'TRICKY', assassin:'HARD', fighter:'HARD' },
  diffEx:{ ziggs:'EVEN', anivia:'EVEN', veigar:'EVEN', vladimir:'EVEN', malzahar:'TRICKY', kassadin:'TRICKY',
    katarina:'TRICKY', annie:'TRICKY', twistedfate:'TRICKY', neeko:'TRICKY', lux:'TRICKY', karma:'TRICKY', orianna:'TRICKY',
    syndra:'HARD', leblanc:'HARD', zoe:'TRICKY', vex:'TRICKY', hwei:'TRICKY', galio:'TRICKY' },
  vs:{
    control:{
      tldr:"He wins lane, you win the game — every minute you survive with stacks intact is a minute he wasted winning a lane that doesn't matter.",
      breakdown:"Concede the early range war gracefully: farm with Q ticks, drag the beam over him only on his step-ups, and spend nothing trying to 'win' pre-RoA. Your stardust curve beats his lane lead if you simply do not die. Track {K} so the farming never costs HP.",
      dos:["Stack stardust off every champion Q tick","Farm the back line with E executes","Match his roams with W cross-lane Q burns"],
      donts:["Force trades before your item spike","Channel Q predictably into his poke answer","Fly W into his cooldown-loaded face"],
      win:"Trade lane for curve — survive, stack, and erase him from one item onward."
    },
    burst:{
      tldr:"His burst window is real and yours is a slow burn — give him nothing to burst until Falling Star changes the math.",
      breakdown:"You cannot out-trade a burst mage pre-6, so don't audition: stand off his combo lines, farm with E + Q ticks, and bank stacks. Post-6, R is the anti-dive stun and your W flyby punishes his cooldown gaps. Respect {K} every second it is up.",
      dos:["Stand off his combo line while channelling Q","Hold R as the anti-dive stun post-6","Punish his cooldown gap with W flybys"],
      donts:["Eat poke while greeding beam ticks","Fly in while his burst is loaded","Trade HP for stacks below half health"],
      win:"Deny the burst window, bank the curve, and make every fight after 25 minutes a stargazing accident."
    },
    assassin:{
      tldr:"You are his favourite food pre-6 — play like it. Tower-hug, stack quietly, and let R + items end the bullying.",
      breakdown:"The lane is survival math: he kills you through most all-ins, so don't be all-in-able. Freeze near tower, Q-farm at max range, hoard Flash, and ward both flanks. From level 6 your R stun punishes the commit, and from two items your flyby burn kills him before he reaches you.",
      dos:["Freeze near tower until level 6","Hold Flash + R as a paired dive answer","Ward both flanks and track his roam timers"],
      donts:["Channel Q in his engage range","Push the wave with no escape banked","Contest his shove pre-item spike"],
      win:"Survive the assassin tax window, then out-scale so hard he becomes a minion with a kill counter."
    },
    fighter:{
      tldr:"He runs THROUGH your beam — never give him a straight line. Farm the curve and fight only with the R stun loaded.",
      breakdown:"Dash-fighters invalidate your channel pattern, so reframe: the Q beam is for after his dashes are spent, not before. E slows his run-down, W keeps the burn out of his reach, and R interrupts the all-in. Until items, treat every trade as a toll you pay reluctantly.",
      dos:["Beam him AFTER his dashes are spent","E-slow the run-down path","Save R to break his all-in"],
      donts:["Stand and channel into his dash range","Spend W to poke when it is your escape","Fight inside his minion wave"],
      win:"Make his engage cost dashes, then burn the stranded fighter from beam range."
    }
  },
  mirror:{
    tldr:"Star dragon mirror — whoever banks more stardust and wastes fewer flights wins the late game both of you are playing for.",
    breakdown:"Pure farming race with occasional beam duels. Win the duels by channelling second: drag your Q over his channel, E his retreat, and break even on stacks while ahead on HP.",
    dos:["Channel second in beam duels","Bank stacks off his predictable channel","Trade E zones for his retreat path"],
    donts:["Mirror his channel face-to-face","Waste W matching his farm flights","Coin-flip the level 6 R standoff"],
    win:"Out-stack and out-position — the bigger dragon at 30 minutes wins.",
    winS:"His flight is down — beam the stranded dragon."
  },
  winS:"His escape is spent — drag the beam across him for free.",
  tradeGood:"W-flyby: fly a lateral arc, drag Q across {E} for two seconds of burn + stacks, and land outside his answer range — repeat forever from one item.",
  tradeBad:"Channelling Q face-to-face inside his engage range with W down — every champion that touches you wins that exchange pre-items.",
  waveBest:"a back-line E execute pattern that clears from safety while you bank stardust — the wave dies and you never stepped forward.",
  waveWorst:"a shoved wave at his tower pre-6 with your W down — you are the slowest, most killable mage in the game in that picture.",
  early:"Levels 1-5 are a tax you pay: farm with Q ticks and E executes, stack quietly, spend nothing. Your lane opponent is the farm counter, not the champion.",
  mid:"From RoA/Seraph's the curve bends: E executes whole waves, W flybys chip {E} out of lane, and your R turns dives into stuns. Play the map — your Q burns through skirmishes two lanes away.",
  late:"You are the win condition: The Skies Descend onto grouped objectives, Q-melt the knockup, and watch the stardust math you banked all game pay out at once.",
  safetyTool:"W Astral Flight",
  spikesLine:"RoA/Seraph's is the inflection; level 6 adds the self-peel stun; The Skies Descend upgrade turns teamfights into patch notes.",
  carryLine:"Carry by scaling honestly — every stardust stack is permanent, and the 30-minute version of you wins fights your laning self cannot imagine.",
  behindShort:"farm with E executes and stay relevant through the stardust curve.",
  loadingRule:"Stack stardust on every safe Q tick — the curve is the win condition.",
  dontDetail:"Your flight is your only escape — a W spent poking is a death sentence against the next gank.",
  aheadTpl:"Ahead, compound it: shove with E executes, burn {E} on every W rotation, and group early — your beam turns small mid-game leads into unanswerable objective control.",
  behindTpl:"Behind, nothing changes: farm, stack, survive. Aurelion Sol from behind at 30 minutes is still bigger than most mids ahead — protect the curve and stop fighting.",
  spikeName:"Rod of Ages",
  runeReport:"Arcane Comet, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight. The Comet-on-beam pattern is near-guaranteed poke.",
  summReport:"Flash + Teleport, no exceptions — TP protects the stacking curve through bad recalls and converts your scaling into map presence.",
  itemReport:"Start Doran's Ring + 2 pots. Rod of Ages rush (or Seraph's), then Archangel's, Liandry's, Rabadon's. Zhonya's vs dive comps. Never skip the mana battery.",
  jungleLine:"You have no setup CC pre-6, so trade your jungler tempo instead: match {E}'s roams with cross-map W burns and pings. Post-6, R is the best gank-assist stun in the lane.",
  redditLine:"farm the curve, hold W as the escape, and stop fighting pre-RoA — Asol wins every game where the early deaths column reads zero.",
  load:{
    sub:"r/AurelionSolMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Catalyst of Aeons (≈1300g) — the survival battery",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Rod of Ages",
    secondItem:"Archangel's Staff",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"RoA + Seraph's — the beam burns forever and the stack curve goes vertical.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall does NOT block your beam — but his dashes beat your channel anyway. Beam him only after the E-chain is spent.",
      dos:["Q him while his dash chain is on cooldown","E-slow his run-down angle","Save R for the EQ-knockup window"] },
    malzahar:{ tldr:"His silence breaks your channel and his R is a free kill on you — poke the spell shield BEFORE every trade and never step up with his 6 online." },
    zed:{ tldr:"The worst matchup on the roster — tower-hug, Q-farm, and treat level 6-to-Zhonya's as a survival speedrun.",
      dos:["Freeze near tower from level 3 onward","Hold R for the Death Mark commit","Rush Zhonya's components second back"] }
  }
},

// ============================== AZIR ==============================
{
  key:'azir', name:'Azir',
  curve:[-0.2,0.0,0.2,0.3,0.5,0.6,0.9],
  lvl:[
    "W a soldier behind the wave and farm THROUGH it — your auto range is the soldier's range. Don't poke yet; sand costs mana.",
    "Two soldiers up means a real trade: W-Q the drag-through and step back. The poke is free only when his engage is down.",
    "E completes the safety net — you now have the shield-dash out. Greedier soldier placements are allowed, not encouraged.",
    "Nashor's components arrive and the soldier DPS starts to sting. Drag Qs through {E} on every last-hit he takes.",
    "Emperor's Divide online — the dive insurance and the insec flip. With R up you win every 2v2 your jungler joins.",
    "Nashor's spike: your soldier poke becomes shred. Shove crashes and rotate — the soldiers siege towers better than any mid.",
    "Full build Azir is a teamfight: R cuts the fight in half, soldiers melt whoever is on your side of the wall."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'TRICKY', fighter:'TRICKY' },
  diffEx:{ fizz:'HARD', leblanc:'HARD', syndra:'HARD', yasuo:'HARD', irelia:'HARD', yone:'HARD', pantheon:'HARD',
    zed:'TRICKY', kassadin:'TRICKY', akali:'TRICKY', vex:'TRICKY', taliyah:'TRICKY', cassiopeia:'TRICKY',
    xerath:'TRICKY', ziggs:'TRICKY', vladimir:'TRICKY', katarina:'EVEN', anivia:'EVEN', viktor:'EVEN', orianna:'EVEN', lux:'EVEN', malzahar:'EVEN' },
  vs:{
    control:{
      tldr:"Soldier range vs spell range — poke through the wave he has to stand in, and dodge the answer he throws back.",
      breakdown:"Your W-Q drag hits him on every last-hit while soldiers do the standing for you. He wins only the exchanges where his key spell lands clean — so make it not land. Mana discipline decides the lane: every missed sand volley is three of his spells in tempo.",
      dos:["Drag W-Q through his last-hit position","Stand outside his answer while soldiers poke","Bank Manaflow before contesting shoves"],
      donts:["Spam soldiers into a dodging target","Trade HP for poke with E down","Shove past river without flank wards"],
      win:"Out-poke through soldiers, dodge the answer, and out-scale into the siege machine he cannot match."
    },
    burst:{
      tldr:"His burst beats your shield once — make him spend it into E, then poke the cooldown gap to death.",
      breakdown:"You are squishy and your soldiers don't block skillshots — but E's shield plus R's wall make his all-in survivable exactly once per rotation. Bait the combo, shield through the half that lands, and drag soldiers over his retreat. Track {K} like your rank depends on it; it does.",
      dos:["Hold E to shield-dash out of his combo","Punish his cooldown gap with full soldier volleys","Wall him INTO your team when he overcommits"],
      donts:["Stand at soldier max range with E down","Trade while his full combo is loaded","Use R aggressively when it is your only out"],
      win:"Survive the burst window with E + R, then out-DPS the long fight his kit was never built for."
    },
    assassin:{
      tldr:"He has to enter soldier range to kill you — that trip costs HP, and your E + R make the return trip expensive too.",
      breakdown:"Soldiers zone the approach, E escapes the commit, R cancels the dive. The lane is yours to lose: keep two soldiers between you and him, never burn E for poke, and hold the wall for the moment he is INSIDE your team's range. His roams are the real threat — shove and ping relentlessly.",
      dos:["Keep a soldier between you and his engage line","Shove crashes and ping his every roam","Hold R to flip his dive into your kill"],
      donts:["Burn E for trade damage","Step past your soldiers to greed poke","Let him shove-and-roam without pings"],
      win:"Tax the approach with soldiers, cancel the dive with R, and starve his roam game with shoves."
    },
    fighter:{
      tldr:"He fights through your soldiers if you let the fight start — the drag-poke must end the lane before his engage does.",
      breakdown:"Dash-fighters break your poke rhythm, so poke in bursts: W-Q the wave contact, then reposition before his window. E is strictly the escape, and the R wall is the anti-engage that makes his all-in a sunk cost. The matchup is a metronome — poke, step, poke, step.",
      dos:["Poke on wave contact, reposition after","Hold E strictly as the disengage","R-wall his engage the moment he commits"],
      donts:["Stand still admiring your soldier DPS","Trade inside his dash range with E down","Waste the wall on a half-committed engage"],
      win:"Bleed him at soldier range, wall the all-in, and out-scale into the shred he cannot survive."
    }
  },
  mirror:{
    tldr:"Sand mirror — soldier placement and mana discipline decide everything; the better emperor sieges first.",
    breakdown:"Identical poke ranges make this a positioning duel: place soldiers where his drag can't answer, dodge his volleys, and bank the mana advantage into the first crash-and-rotate.",
    dos:["Place soldiers off his drag angles","Win the Manaflow banking race","Dodge his volley before casting yours"],
    donts:["Mirror his soldier placement","Coin-flip the level 6 insec war","Shove without river vision"],
    win:"Out-place and out-dodge — the cleaner emperor takes the lane.",
    winS:"His shift is down — drag the full volley through him."
  },
  winS:"His escape is spent — full soldier volley, free.",
  tradeGood:"W behind the wave, Q-drag the soldier through {E} on his last-hit, auto once through the soldier, step back — two-second trades he cannot answer without overextending.",
  tradeBad:"Standing at max soldier range admiring your poke with E on cooldown — that is the engage window every {E} player is waiting for.",
  waveBest:"a controlled slow push you crash with soldier autos — the crash funds your roam, your plates, and your scuttle-fight presence.",
  waveWorst:"a frozen wave near his tower with your E down — walking up to reset it is the most-ganked walk in mid lane.",
  early:"Farm through soldiers and poke only on last-hit windows. Pre-Nashor's you are a promise, not a threat — spend mana like it is HP.",
  mid:"Nashor's onward: shove crashes, soldier-siege plates, and rotate to river fights where your R turns 3v3s into 3v1s. The insec flip wins drakes by itself.",
  late:"You are the best siege and the best counter-engage in the game: wall their dive, melt their frontline, and never fight without three soldiers banked.",
  safetyTool:"E Shifting Sands",
  spikesLine:"Nashor's Tooth is the inflection; level 6 adds dive insurance; Rabadon's turns poke into deletion.",
  carryLine:"Carry through siege control — soldiers take plates, R denies engages, and your DPS curve outlasts every assassin spike in the lobby.",
  behindShort:"farm at soldier range and stay relevant through wave control.",
  loadingRule:"Poke through soldiers on his last-hits — never step past your own sand.",
  dontDetail:"Your E is your Flash — burning the shield-dash for damage leaves the emperor on foot for nineteen seconds.",
  aheadTpl:"Ahead, siege: crash waves with soldier autos, take every plate, and rotate to river with R held — your wall converts even fights into massacres.",
  behindTpl:"Behind, soldier-farm from safety and scale — Azir's DPS curve forgives bad earlies. Hold R for their engage and re-enter the game at Nashor's + Rabadon's.",
  spikeName:"Nashor's Tooth",
  runeReport:"Lethal Tempo or Conqueror, Presence of Mind, Legend: Alacrity, Coup de Grace; secondary Sorcery — Manaflow + Transcendence. The attack-speed keystones feed soldier DPS.",
  summReport:"Flash + Teleport standard — TP protects your scaling and converts crashes into bot-lane flanks. Ignite is a trap on a scaler.",
  itemReport:"Start Doran's Ring + 2 pots. Nashor's Tooth rush into Sorcerer's, then Liandry's and Rabadon's. Zhonya's vs dive; Banshee's vs pick comps.",
  jungleLine:"Your R is the best insec in the game — wall {E} INTO your jungler on every gank. Pre-6 you set up with soldier slows; ward deep, your escape has a cooldown.",
  redditLine:"drag Qs through last-hits, save E for your life, and remember the wall points BACKWARD — Azir wins lanes with discipline and games with Nashor's.",
  load:{
    sub:"r/azirmains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Recurve Bow or Lost Chapter piece (≈1000g)",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Nashor's Tooth",
    secondItem:"Liandry's Torment",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Nashor's + Liandry's — soldier pokes become tower-siege shred.",
    runes:{ keystone:"Lethal Tempo", primaryTree:"Precision", primary:["Presence of Mind","Legend: Alacrity","Coup de Grace"], tree:"Sorcery", secondary:["Manaflow Band","Transcendence"], shards:["Attack Speed","Adaptive Force","Health"] }
  },
  specials:{
    fizz:{ tldr:"His E dodges your volley and his dive ignores soldiers — hold YOUR E for his Q commit and never stand at max range with it down.",
      dos:["Hold E strictly for his Q-onto-you","Keep the wave middle so his roams are visible","R him backward the instant he hops in"] },
    yasuo:{ tldr:"Wind Wall does NOT block soldier autos — but his dash-chain through the wave reaches you anyway; poke and PIVOT before the third dash.",
      dos:["Poke on wave contact and immediately reposition","Wall his EQ-knockup engage with R","Drag soldiers across his dash lane"] },
    vex:{ tldr:"Her passive punishes your E and her fear breaks soldier rhythm — dash BEFORE the fight, never during her glow." }
  }
},

// ============================== CASSIOPEIA ==============================
{
  key:'cassiopeia', name:'Cassiopeia',
  curve:[0.2,0.3,0.4,0.4,0.5,0.6,0.4],
  lvl:[
    "Q poke on his last-hits — the poison-into-E pattern starts at level 1 and your DPS already out-trades most mids.",
    "W changes the geometry: miasma GROUNDS dashes. Drop it on his engage path and the lane's mobility advantage evaporates.",
    "Full kit: Q-poison into spammable E twin fangs is real sustained damage. Trade anyone who steps into Q range.",
    "Tear stacking quietly while your E heals off poisoned targets — you win every extended trade from here.",
    "Petrifying Gaze online — the all-in answer. Face-stun his engage or slow his retreat; either way the fangs finish it.",
    "Seraph's/Liandry's spike: your DPS is now the highest in the lane, melee-DPS-carry high. Force extended trades on every cooldown gap.",
    "Late-game Cass is a hyper-carry: ground their divers, petrify their engage, and machine-gun whoever is closest."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'EVEN', fighter:'EVEN' },
  diffEx:{ katarina:'FAVOURED', kassadin:'FAVOURED', naafiri:'FAVOURED', anivia:'FAVOURED',
    syndra:'HARD', xerath:'HARD',
    leblanc:'TRICKY', ziggs:'TRICKY', lux:'TRICKY', viktor:'TRICKY', orianna:'TRICKY', azir:'TRICKY', hwei:'TRICKY', zoe:'TRICKY', fizz:'TRICKY', pantheon:'TRICKY', zed:'TRICKY' },
  vs:{
    control:{
      tldr:"He pokes in bursts, you damage in streams — close to Q range on his cooldowns and the DPS war is no contest.",
      breakdown:"Artillery and control mages out-range you, so the lane is about closing distance on YOUR timer: dodge the big cooldown, walk forward, and land Q — once poisoned, your E spam out-damages anything he answers with. Miasma covers the re-engage he wants.",
      dos:["Step forward the moment his key spell whiffs","Land Q, then machine-gun E while poisoned","Ground his retreat path with W"],
      donts:["Eat poke at his max range for free","Walk forward with his full rotation loaded","Spam E unpoisoned — the mana dies fast"],
      win:"Dodge the burst, close the gap, and out-DPS him in the mid-range war he cannot win."
    },
    burst:{
      tldr:"His combo chunks, your stream kills — survive the rotation, then fang him down in the fifteen seconds he has nothing.",
      breakdown:"Burst mages live on cooldown windows; Cassiopeia does not have cooldown windows. Respect the full combo, hold R for his engage, and the moment his burst is spent walk forward and start the poison metronome. Few burst mages survive ten seconds of fangs.",
      dos:["Bait the combo before walking forward","R-stun his engage commit face-on","Q-E chain the cooldown gap relentlessly"],
      donts:["Stand mid-range while his combo is loaded","Petrify defensively when it can win the fight","Trade fang-for-burst at half HP"],
      win:"Make his burst hit a Petrifying Gaze, then DPS the fifteen-second gap where he is a minion."
    },
    assassin:{
      tldr:"Miasma turns assassins off — ground the dash, petrify the dive, and fang the helpless body that was supposed to one-shot you.",
      breakdown:"Your W beats his entire game plan: grounded targets cannot dash, and a dashless assassin in fang range is dead. Hold W for the engage (not poke), face him while he winds up, and R-stun the commit. The numbers say this is your lane — play it with that confidence.",
      dos:["Hold W strictly for his dive path","Face his engage so the R stuns, not slows","Punish every farm-approach with Q poke"],
      donts:["Waste miasma on wave or spacing","Turn your back during his commit","Chase resets past your own miasma"],
      win:"Ground the dive, petrify the diver, and machine-gun the assassin who picked the wrong mage."
    },
    fighter:{
      tldr:"He wants to run you down — grounded fighters don't run anywhere, and petrified ones don't fight.",
      breakdown:"Dash-fighters lose their dashes in miasma and their nerve to your DPS: kite back with Q slows, ground the bridge he dashes across, and hold R face-on for the moment he commits anyway. Extended fights favour the snake — his sustain loses to your poison math.",
      dos:["Kite backward with Q's movement-speed slow","Ground his dash bridge mid-engage","Hold R face-on for the all-in"],
      donts:["Burn W on poke spacing","Fight inside his wave at even HP","Pop R on a feint before the real commit"],
      win:"Ground the run-down, petrify the commit, and out-DPS the extended fight he thought he wanted."
    }
  },
  mirror:{
    tldr:"Snake mirror — whoever lands Q first runs the trade; whoever faces the wrong way during R loses the fight.",
    breakdown:"Identical DPS makes the poison-first rule absolute: dodge her Q, land yours, and the E-spam war is yours. Save R for hers — petrifying a petrifier is the cleanest counter in the game.",
    dos:["Dodge her Q before casting yours","Bank Tear stacks harder than she does","Turn away from her R, then turn back and fang"],
    donts:["Trade fang-for-fang unpoisoned","Stand in her miasma admiring yours","Face her R like it's a staring contest"],
    win:"Land Q first and face the right direction — the rest is fang math.",
    winS:"Her W is down — walk through where the ground used to be."
  },
  winS:"His mobility is grounded — fang the stationary target.",
  tradeGood:"Q the last-hit window, E-E-E while the poison ticks, and walk back as it fades — three fangs and out, repeat until {E} is executable.",
  tradeBad:"Spamming unpoisoned fangs at full mana cost, or holding W so long the dash you were saving it for already happened.",
  waveBest:"a fast Q-E shove that crashes and funds Tear stacks — your DPS clears faster than most control mages from level 5 on.",
  waveWorst:"a frozen wave at his tower while an assassin roams — you have no boots (passive) but no dash either; warded rivers or no shoves.",
  early:"Q-poke the lane from level 1 — you are a lane bully who happens to scale. Build the Tear early and the mana anxiety disappears.",
  mid:"From Seraph's your DPS leads the game: force extended trades, ground every gank, and rotate to rivers where your R flips 2v2s. Buy the slot item your missing boots refund.",
  late:"You are the carry: ground their frontline bridge, petrify the dive onto you, and melt whatever the tank line was protecting. Position like an ADC with a stun.",
  safetyTool:"R Petrifying Gaze",
  spikesLine:"Tear + Lost Chapter ends mana anxiety; level 6 adds the all-in answer; Seraph's + Liandry's is the highest sustained DPS in the mid pool.",
  carryLine:"Carry by DPS — no mid matches your damage-per-second from two items; your job is staying alive long enough to prove it.",
  behindShort:"farm with Q-E clears and stay relevant through grounded peel.",
  loadingRule:"Land Q before spending E — unpoisoned fangs lose the mana war.",
  dontDetail:"Your miasma is the anti-dive — spending it on poke means the next engage arrives ungrounded and you have no boots to run.",
  aheadTpl:"Ahead, suffocate: poison every last-hit, zone {E} off the wave with fang threat, and call your jungler — your W makes every gank a guaranteed kill.",
  behindTpl:"Behind, farm the stream: Q-E clears keep you in the game and your DPS curve forgives deficits. Hold R for their engage and re-enter at Seraph's.",
  spikeName:"Seraph's",
  runeReport:"Conqueror, Presence of Mind, Legend: Haste, Last Stand; secondary Sorcery — Manaflow + Transcendence. Conqueror stacks instantly off E spam and feeds the drain fight.",
  summReport:"Flash + Teleport standard; Ignite into assassin lanes you intend to bully — your DPS converts Ignite better than most mids.",
  itemReport:"Start Doran's Ring + 2 pots (Tear first back). Seraph's into Liandry's, then Rabadon's; Zhonya's vs dive. No boots — her passive replaces them; spend the slot on damage.",
  jungleLine:"Your W is the best gank-assist in mid lane — ground {E}'s escape the moment your jungler commits and the kill is arithmetic. Ward deep: no boots means no outrunning anyone.",
  redditLine:"poison before fangs, save W for dashes not damage, and face the engage when you R — Cass is an ADC with a stun and the lane respects DPS.",
  load:{
    sub:"r/CassiopeiaMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Tear of the Goddess + Dark Seal (≈800g)",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Seraph's Embrace",
    secondItem:"Liandry's Torment",
    boots:"No boots — passive grants scaling move speed (extra item slot)",
    bootsVsAP:"No boots — passive move speed (slot goes to Mercury's-substitute MR if needed)",
    bootsVsAD:"No boots — passive move speed (slot goes to armor/Zhonya's earlier)",
    spike:"Seraph's + Liandry's — the fang stream becomes the best sustained DPS in the game.",
    runes:{ keystone:"Conqueror", primaryTree:"Precision", primary:["Presence of Mind","Legend: Haste","Last Stand"], tree:"Sorcery", secondary:["Manaflow Band","Transcendence"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall blocks NOTHING that matters — Q is ground-cast, W is a zone, E is point-and-click. Ground his dash chain and fang him down.",
      dos:["Drop W on his dash lane mid-engage","Fang through Wind Wall — it can't block them","R face-on when he commits the knockup"] },
    syndra:{ tldr:"She outranges your entire kit and her burst beats your stream — dodge the QE line and only walk forward on her cooldown gaps." },
    xerath:{ tldr:"Pure artillery — you lose the range war at every distance except fang range. Dodge-walk forward patiently; one grounded root and he dies." },
    katarina:{ tldr:"Your W ruins her resets and your R interrupts Death Lotus — stand on your miasma and she literally cannot play the game.",
      dos:["Hold W for her Shunpo commit","R her Death Lotus instantly","Fang her every dagger pickup attempt"] }
  }
}
];

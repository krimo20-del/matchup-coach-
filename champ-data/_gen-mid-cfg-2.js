// MatchupCoach — MID generator configs batch 2: Hwei, Lissandra, Malzahar, Orianna.
window.GEN_MID_CFGS_2 = [

// ============================== HWEI ==============================
{
  key:'hwei', name:'Hwei',
  curve:[0.3,0.3,0.4,0.4,0.4,0.5,0.3],
  lvl:[
    "QQ out-ranges almost everything mid — paint his last-hits from angles he can't answer. Watch mana; art is expensive.",
    "The double-paint mark comes online — land any two spells and the passive burst makes the trade real.",
    "Full palette: EE fear or EQ root into QQ is a genuine kill threat. He has to respect every brush-stroke from here.",
    "Lost Chapter timing — the palette stops costing you the lane. Poke the wave contact, mark, detonate, reset.",
    "Spiraling Despair online — the teamfight eye. In lane it's the all-in: R-QQ-QE deletes half bars through the slow.",
    "Blackfire/Luden's spike: every QQ chunks a quarter bar. Shove with QA and rotate — your siege poke wins rivers.",
    "Late Hwei is a fight-opener: R the carry, paint the fear wall behind their front line, and QQ the panic."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'HARD', fighter:'HARD' },
  diffEx:{ ziggs:'EVEN', xerath:'TRICKY', syndra:'TRICKY', leblanc:'HARD', yasuo:'HARD', katarina:'HARD',
    kassadin:'TRICKY', vladimir:'TRICKY', vex:'TRICKY', ahri:'TRICKY', galio:'TRICKY', zoe:'TRICKY',
    cassiopeia:'TRICKY', taliyah:'EVEN', anivia:'EVEN', viktor:'EVEN', orianna:'EVEN', lux:'EVEN', malzahar:'EVEN', veigar:'EVEN', twistedfate:'EVEN' },
  vs:{
    control:{
      tldr:"A painter's duel at max range — your palette out-options his kit, but only the mage who dodges gets to keep painting.",
      breakdown:"You have an answer for every spacing he picks: QQ beats long range, EQ roots his step-up, WW repositions the duel. Trade paint-for-paint only when his key spell is down, and let the two-hit mark math win the exchanges he thought were even.",
      dos:["Open trades with the spell his spacing least expects","Detonate the mark with QQ before he resets","Bank Manaflow off max-range paint"],
      donts:["Spam the same palette pattern twice","Eat his poke while admiring your range","Paint waves when his jungler is missing"],
      win:"Out-option the poke war and detonate marks he cannot afford to keep eating."
    },
    burst:{
      tldr:"His combo is one sentence — your palette is a paragraph. Dodge the opening line and out-write him.",
      breakdown:"Burst mages need their setup spell to land; your job is making it whiff and punishing the cooldown with a full marked rotation. Hold WG (shield) for the combo you can't dodge and keep the fear paint loaded as the disengage.",
      dos:["Sidestep his setup spell before painting","Punish his cooldown gap with QQ-E rotations","Hold the W shield for his real combo"],
      donts:["Trade while his full combo is loaded","Burn E paint on poke spacing","Stand mid-range at half HP — that's his font size"],
      win:"Make the setup spell miss, then paint the fifteen-second gap where he has nothing."
    },
    assassin:{
      tldr:"You are canvas to him — the fear paint and your wave discipline are the whole survival kit.",
      breakdown:"No dashes, big health bar, long cast times: assassins love Hwei. Keep the wave centered, hold EE fear for the engage, and spend WG on the burst you couldn't stop. Post-6, R-on-the-diver flips dives — but the honest answer is positioning that never offers the dive.",
      dos:["Keep the wave centered and warded","Hold EE fear strictly for his engage","R the diver the instant he commits"],
      donts:["Shove past river with no escape paint","Burn the fear on poke","Greed the third QQ when his engage is up"],
      win:"Fear the dive, shield the burst, and tax his approach until your paint out-scales his patience."
    },
    fighter:{
      tldr:"He dashes through paragraphs — keep the fear loaded, the wave middle, and the trade short.",
      breakdown:"Dash-fighters punish your cast times, so paint in bursts: QQ the wave contact, EE his engage angle, and reposition with WW speed before his window opens. Never duel inside his dash range; your art needs distance to breathe.",
      dos:["QQ on wave contact, reposition after","EE-fear the dash mid-flight","Use WW speed paths to reset spacing"],
      donts:["Stand still mid-rotation in dash range","Trade extended at melee range","Spend the fear before his real engage"],
      win:"Fear the run-down, kite with speed paint, and bleed him at brush length."
    }
  },
  mirror:{
    tldr:"Painter mirror — whoever lands the first two-spell mark runs the trade; whoever wastes the fear loses the all-in.",
    breakdown:"Identical palettes make this a prediction war: vary your opening spell, dodge his predictable QQ line, and bank the mark detonations. The fear paint is the duel-decider — hold it longest.",
    dos:["Vary your opening paint every trade","Dodge the QQ line laterally late","Hold EE fear longer than he does"],
    donts:["Open with the same spell twice","Trade mark-for-mark at even mana","Paint his Rebuttal-window... wait, wrong artist — don't trade into his loaded palette"],
    win:"Out-predict the palette war — first mark detonation wins each exchange.",
    winS:"His CC paint is spent — walk the canvas freely."
  },
  winS:"His escape is down — full rotation, free.",
  tradeGood:"QQ his last-hit, weave any second spell for the mark, detonate, and reset to max range — two-spell trades he answers only by overextending.",
  tradeBad:"Standing mid-cast-animation inside his engage range with the fear already spent — every assassin and fighter in the pool is waiting for exactly that frame.",
  waveBest:"a QA-cleared slow push that crashes on your roam timer — your wave-clear is elite and your map poke (R) travels with you.",
  waveWorst:"a frozen wave near his tower with EE down — the immobile artist walking up to last-hit is mid lane's most gankable picture.",
  early:"Out-range the lane from level 1 but respect mana — paint last-hits, bank Manaflow, and treat the fear as your Flash until 6.",
  mid:"Lost Chapter onward you own the poke war: mark-detonate every wave contact, shove with QA, and rotate to rivers where R + QE turns skirmishes into murals.",
  late:"You are the siege and the opener: R their carry at max range, wall the choke with fear paint, and QQ whatever the slow catches. Position two brush-lengths behind your front line.",
  safetyTool:"E fear paint",
  spikesLine:"Lost Chapter ends the mana war; level 6 adds the fight-opener; Blackfire/Luden's makes every QQ a quarter-bar statement.",
  carryLine:"Carry through range — no mid pool champion paints a teamfight from further away; your R + QQ decides objectives before they start.",
  behindShort:"farm with QA clears and stay relevant through max-range poke.",
  loadingRule:"Land any two paints for the mark — the detonation is the real damage.",
  dontDetail:"The fear paint is your only 'no' button — spending it on poke means the next dive is a portrait of you dying.",
  aheadTpl:"Ahead, paint the prison: mark-detonate {E} on every last-hit, shove with QA, and rotate first to every river — your R range means you join fights he can't even see.",
  behindTpl:"Behind, QA-farm from fountain range and scale the poke — Hwei from behind still sieges. Hold the fear, bank items, and re-enter through max-range rotations.",
  spikeName:"Blackfire Torch",
  runeReport:"Arcane Comet or First Strike, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight. Comet converts the QQ slow-chip pattern.",
  summReport:"Flash + Teleport standard — TP covers the immobile early game. Cleanse into hard-pick comps; Ignite only if you intend to bully a melee.",
  itemReport:"Start Doran's Ring + 2 pots. Blackfire Torch or Luden's into Sorcerer's, then Shadowflame and Rabadon's. Zhonya's vs dive — buy it earlier than feels comfortable.",
  jungleLine:"Your EQ root and EE fear are elite gank setup — paint {E}'s retreat the moment your jungler shows. You have zero dashes: deep wards are your boots.",
  redditLine:"vary the palette, hold the fear, and respect every assassin timer — Hwei wins by making the whole map his canvas after 6.",
  load:{
    sub:"r/HweiMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — the palette stops costing the lane",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Blackfire Torch / Luden's",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Blackfire + Shadowflame — every marked rotation deletes half a health bar.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall eats your entire palette — bait it with a cheap QE, then unload only while it's down; fear his dash-chain mid-flight.",
      dos:["Bait Wind Wall with a throwaway paint","EE his EQ-engage mid-dash","Trade only in the wall's cooldown window"] },
    mel:{ tldr:"Her Rebuttal reflects your whole rotation — count it before every trade and paint only while it glows on cooldown." },
    katarina:{ tldr:"Your cast times are her dance floor — hold EE for her Shunpo and EQ-root her Death Lotus instantly or don't bother casting it." }
  }
},

// ============================== LISSANDRA ==============================
{
  key:'lissandra', name:'Lissandra',
  curve:[-0.1,0.1,0.3,0.3,0.6,0.5,0.2],
  lvl:[
    "Q-shatter the wave and chip his melee step-ups — your early Q harass is better than the lane gives it credit for.",
    "W online: anyone who closes onto you eats a root. The anti-engage layer is already real at level 2.",
    "E claw completes the kit — you now have the lane's strangest engage and a guaranteed exit. Greed carefully; the claw is slow.",
    "Lost Chapter timing — Q spam stops hurting your mana. Chip {E} every time he touches the wave.",
    "Frozen Tomb online — you are now the best anti-assassin and anti-dive mid in the game. Self-R turns every dive into a counter-kill.",
    "Malignance spike: your R comes back absurdly fast and every tomb chains into the slow field. Force picks with E-W-R.",
    "Late Liss opens every fight: claw in, tomb the carry, root the peel, and walk out through the panic."
  ],
  diffBase:{ control:'TRICKY', burst:'EVEN', assassin:'FAVOURED', fighter:'EVEN' },
  diffEx:{ zed:'FAVOURED', katarina:'FAVOURED', akali:'FAVOURED', fizz:'FAVOURED', yasuo:'FAVOURED',
    syndra:'HARD', xerath:'HARD',
    leblanc:'TRICKY', ziggs:'TRICKY', lux:'TRICKY', orianna:'TRICKY', viktor:'TRICKY', azir:'TRICKY', hwei:'TRICKY', zoe:'TRICKY', cassiopeia:'TRICKY',
    anivia:'EVEN', vladimir:'EVEN', malzahar:'EVEN', taliyah:'EVEN', kassadin:'EVEN', sylas:'EVEN', yone:'EVEN', veigar:'EVEN', annie:'EVEN', twistedfate:'EVEN', vex:'EVEN', brand:'EVEN' },
  vs:{
    control:{
      tldr:"He out-ranges you — close the gap on YOUR timer with E threats, or concede the poke war and win the picks instead.",
      breakdown:"Pure range loses to him, so stop playing range: farm with Q shatters, hold HP for one good claw window per wave cycle, and make every river skirmish a Lissandra fight — claw, root, tomb. Your lane is even the moment a fight stops being about poke.",
      dos:["Farm with Q shatters through the wave","Pick ONE claw window per wave cycle","Drag every skirmish into W-R range"],
      donts:["Trade poke-for-poke at his max range","Claw in with W on cooldown","Self-R to survive poke — it's your engage too"],
      win:"Survive the poke war and convert rivers into pick-offs his range can't answer."
    },
    burst:{
      tldr:"His burst needs a clean window — your root and tomb make every window cost a health bar.",
      breakdown:"You both want short, decisive exchanges; yours come with crowd control attached. Hold W for his engage spell, tomb his commit, and Q-shatter the disengage. The self-R is the trump card: his perfect combo into your Frozen Tomb is a refund he can't afford twice.",
      dos:["Root his engage spell on arrival","Self-R the all-in and counter-burst","Trade Q shatters between his cooldowns"],
      donts:["Eat poke while waiting for the dream root","Burn the claw to dodge what W answers","Tomb him while his burst is already spent"],
      win:"Turn his kill windows into tomb refunds, then out-pick him in every river."
    },
    assassin:{
      tldr:"You are the assassin's nightmare pick — root the dash, tomb the dive, and counter-kill the reset he no longer has.",
      breakdown:"Everything in your kit is anti-assassin: W roots the gap-close, self-R laughs at the burst, and the claw escapes what's left. Play forward with confidence, force his engage onto your cooldown schedule, and call your jungler — every dive he attempts is a 2v1 in your favor.",
      dos:["Stand close enough to invite the dive","Self-R his burst, then W-Q the counter","Claw out the moment the exchange sours"],
      donts:["Hold W so long the dash already landed","Waste the tomb on poke-level damage","Chase resets past your claw range"],
      win:"Invite the dive, tomb it, and counter-kill — the lane is a trap with your name on it."
    },
    fighter:{
      tldr:"He runs at you in a straight line — your entire kit is built to punish straight lines.",
      breakdown:"Root the run-down, shatter the slow, and save the tomb for the moment he commits past the wave. Fighters out-trade you in extended fights, so refuse them: every exchange is root-shatter-walk, and the all-in he eventually forces meets a Frozen Tomb with jungle follow-up.",
      dos:["W-root the run-down on contact","Q-shatter through the rooted target","Hold R for his real commit, not the feint"],
      donts:["Extend trades past your root duration","Fight inside his wave at even HP","Claw in when he has the gap-closer banked"],
      win:"Root, shatter, walk — and tomb the all-in he was always going to force."
    }
  },
  mirror:{
    tldr:"Ice mirror — whoever lands the first root chains the kill; whoever self-Rs second wins the all-in.",
    breakdown:"Identical kits with one rule: the self-R baits the other's commit. Claw second, root first, and hold your tomb until hers is spent — patience beats aggression in the mirror.",
    dos:["Root first in every exchange","Self-R second in the all-in","Punish her claw cooldown with yours"],
    donts:["Claw in while her W is loaded","Tomb first without jungle follow-up","Trade Q-for-Q at her wave advantage"],
    win:"Land the first root and hold the second tomb — order of operations decides it.",
    winS:"Her claw is down — she has no exit; commit."
  },
  winS:"His escape is spent — claw in and chain the kill.",
  tradeGood:"Q-shatter his wave contact, and when he steps to punish, W-root into full rotation and walk — the root tax makes every aggressive step expensive.",
  tradeBad:"Clawing in with W on cooldown 'to poke' — an engage tool spent on chip damage is a Lissandra standing in melee range with no ice left.",
  waveBest:"a Q-shattered slow push that crashes into your roam timer — your E over walls makes you the fastest roaming control mage alive.",
  waveWorst:"a shoved wave at his tower with the claw down — immobile, rootless, and a long walk home past two warded brushes.",
  early:"Q-farm and pick your moments — your harass is real but mana-hungry. The lane is about reaching 6 with the claw and tomb intact.",
  mid:"From Malignance your tomb is on a skirmish timer: claw into rivers, root the carry, tomb the dive, and let your team convert. You decide where fights start.",
  late:"You are the opener AND the insurance: flank-claw their backline or self-tomb their engage — either way the fight starts on ice. Hold the root for the cleanup peel.",
  safetyTool:"R Frozen Tomb (self-cast)",
  spikesLine:"Lost Chapter steadies the lane; level 6 makes you the anti-dive queen; Malignance puts Frozen Tomb on a skirmish cooldown.",
  carryLine:"Carry through picks — claw-root-tomb converts vision into kills better than any control mage; the map shrinks every time your E is up.",
  behindShort:"farm with Q shatters and stay relevant through self-R utility.",
  loadingRule:"Hold W for his gap-close — the root IS the matchup.",
  dontDetail:"The claw is your entrance AND your exit — spending both directions on one greedy play is how Lissandras die famous.",
  aheadTpl:"Ahead, hunt: claw into every river skirmish first, tomb the carry, and snowball picks — {E} farming under tower can't stop a roaming Lissandra.",
  behindTpl:"Behind, play warden: Q-farm safely, self-R their dives, and root the engage off your carries — Liss from behind is still the best anti-assassin in the game.",
  spikeName:"Malignance",
  runeReport:"Electrocute, Cheap Shot, Eyeball Collection, Ultimate Hunter; secondary Sorcery — Manaflow + Transcendence. Electrocute pays the root-shatter pattern instantly.",
  summReport:"Flash + Teleport standard; Ignite into assassin lanes you intend to counter-kill — your tomb converts Ignite all-ins brutally.",
  itemReport:"Start Doran's Ring + 2 pots. Malignance rush into Sorcerer's, then Zhonya's and Rabadon's. The Malignance burn-field chains perfectly off both tombs.",
  jungleLine:"You are the best gank-setup mid in the game — W-root on arrival, tomb the Flash, claw to cut the runback. Tell your jungler to path mid early and farm the bounty.",
  redditLine:"root the dash not the champion, self-R one second later than feels right, and claw with a plan for both directions — Liss wins games through picks.",
  load:{
    sub:"r/LissandraMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — steadies the Q-spam mana",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Malignance",
    secondItem:"Zhonya's Hourglass",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Malignance + Zhonya's — tomb on a skirmish timer with a survival button behind it.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Cheap Shot","Eyeball Collection","Ultimate Hunter"], tree:"Sorcery", secondary:["Manaflow Band","Transcendence"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    zed:{ tldr:"The classic counter-pick — let him R you, self-tomb the mark, and root the body that appears behind you. He dies to his own aggression.",
      dos:["Self-R the Death Mark instantly","W-root his R-arrival spot","Call jungle the moment he hits 6 — he WILL dive"] },
    yasuo:{ tldr:"Nothing in your kit is a projectile he can wall — root the dash-chain, tomb the knockup attempt, and shatter the windwall-shaped hole in his plan.",
      dos:["W-root him mid dash-chain","Self-R his EQ3 knockup window","Q through minions — the shatter ignores his wall"] },
    syndra:{ tldr:"She outranges everything you have and her sphere burst beats your tomb math — dodge the QE line and live on the claw's cooldown discipline." },
    sylas:{ tldr:"He steals a discount tomb — fine; yours chains W-Q behind it and his doesn't. Root his E2 chain and out-rotate the brawl." }
  }
},

// ============================== MALZAHAR ==============================
{
  key:'malzahar', name:'Malzahar',
  curve:[-0.1,0.1,0.2,0.3,0.7,0.5,0.3],
  lvl:[
    "E a caster minion and let the visions farm for you — your lane is a macro pattern, not a duel, from the first wave.",
    "Q online: the silence is your trade answer. Use it on his engage spell, not on poke he can walk around.",
    "W voidlings turn your shove permanent — the wave hits his tower while you ward, roam-shadow, or just exist safely.",
    "Lost Chapter and the machine is complete: E-hops fund themselves, the wave is always crashing, and his tower is always bleeding.",
    "Nether Grasp online — with ANY jungle presence you now have a guaranteed kill button. The lane bends around your 6.",
    "Liandry's spike: visions melt waves AND health bars. Suppress-into-burn kills through most defensive answers.",
    "Late Malz is a number: one suppression on their carry equals one won teamfight. Shield up, flank smart, press R."
  ],
  diffBase:{ control:'EVEN', burst:'TRICKY', assassin:'EVEN', fighter:'EVEN' },
  diffEx:{ katarina:'FAVOURED', fizz:'HARD', sylas:'HARD',
    irelia:'TRICKY', leblanc:'TRICKY', zed:'TRICKY', akali:'TRICKY', talon:'TRICKY', xerath:'TRICKY', ziggs:'TRICKY',
    lux:'TRICKY', syndra:'TRICKY', ahri:'TRICKY', zoe:'TRICKY', galio:'TRICKY', pantheon:'TRICKY',
    kassadin:'EVEN', yasuo:'EVEN', yone:'EVEN', orianna:'EVEN', viktor:'EVEN', anivia:'EVEN', vladimir:'EVEN', cassiopeia:'EVEN', azir:'EVEN', taliyah:'EVEN', veigar:'EVEN', vex:'EVEN', brand:'EVEN', neeko:'EVEN', twistedfate:'EVEN', ekko:'EVEN', diana:'EVEN', qiyana:'EVEN', naafiri:'EVEN' },
  vs:{
    control:{
      tldr:"His poke pops your shield, your shove pops his tempo — the lane is a war between his range and your metronome.",
      breakdown:"He wins exchanges when your passive is down, so manage it like a health bar: take poke only when the shield eats it, reset it in the wave's shadow, and keep the E-W shove relentless. Post-6 the calculus flips — his immobility is a Nether Grasp invitation.",
      dos:["Reset your shield before every real trade","Keep the E-W shove permanently rolling","Grasp him the moment your jungler shadows"],
      donts:["Eat shield-pop poke twice in one wave","Q-silence on poke instead of his key spell","Step up at half shield and full his-mana"],
      win:"Out-shove his tempo, shield-manage his poke, and convert 6 into point-and-click kills."
    },
    burst:{
      tldr:"His combo through a broken shield kills you — so the shield is the matchup. Guard it like a third summoner.",
      breakdown:"Burst mages pop the passive with cheap spells then combo the gap; deny the rhythm. Hold distance while the shield rebuilds, Q-silence his setup spell, and remember your R suppresses through his entire plan if he ever steps into walk-up range.",
      dos:["Track your shield rebuild timer out loud","Q-silence his setup spell on cast","Suppress his aggression the moment 6 lands"],
      donts:["Stand in cheap-spell range with shield down","Trade combo-for-combo — you lose that race","Waste the silence on a spell that already fired"],
      win:"Keep the shield up, silence the setup, and suppress the burst mage who got greedy once."
    },
    assassin:{
      tldr:"He has to dive a spell shield, a silence, and a suppression — the math says he dies more often than you do.",
      breakdown:"Your kit pre-answers assassination: passive eats the opener, Q silences the follow-up, R suppresses the escape. Keep the wave crashing so his roams cost towers, ward both flanks, and treat every visible dive attempt as a gift — Grasp plus a jungler is a counter-kill.",
      dos:["Crash waves so his roams bleed plates","Silence the engage spell, not the poke","Suppress the dive and call the collapse"],
      donts:["Burn Q before his real engage","Shove blind into his level-6 window","Greed plates with shield down and R spent"],
      win:"Tax his roams with permanent shove, shield-silence the dive, and Grasp the over-commit."
    },
    fighter:{
      tldr:"He fights through your damage but not through your silence — Q the engage, void the run-down, and never duel honestly.",
      breakdown:"Fighters out-stat you in extended trades, so don't trade — manage. Voidlings and E keep the wave hitting his tower, Q silences the dash-engage mid-wind-up, and your R turns his every all-in into five suppressed seconds of regret with jungle follow-up.",
      dos:["Q-silence his engage mid-windup","Shove with W-E and concede nothing else","Hold R as the all-in flip"],
      donts:["Trade autos with a fighter ever","Step past the wave with Q down","Use R to start fights you can't finish"],
      win:"Silence the engage, out-shove the lane, and suppress the all-in into a counter-kill."
    }
  },
  mirror:{
    tldr:"Void mirror — whoever controls the voidling shove owns the lane; whoever pops the other's shield first owns the all-in.",
    breakdown:"The E-transfer war decides the farm and the shield war decides the kill. Pop his passive with Q before any real exchange, keep yours rebuilt, and R second — suppressing a suppressor is the cleanest counter in the mirror.",
    dos:["Pop his shield before committing anything","Win the E-transfer minion war","R second in the suppression standoff"],
    donts:["Trade with your shield down and his up","Let his voidlings snowball your wave","Suppress first into his jungler's pocket"],
    win:"Win the shield war and the shove war — the R war then wins itself.",
    winS:"His shield is popped — every spell you have lands full."
  },
  winS:"His escape is spent — Grasp him and watch the visions finish.",
  tradeGood:"Pop-and-punish: poke his shield off with a cheap E-tick, then Q-W-E the gap before it rebuilds — full rotations only ever land on shieldless targets.",
  tradeBad:"Trading into him with YOUR shield down — you are the squishiest scaling mage in the pool the moment the purple bubble disappears.",
  waveBest:"a permanently crashing E-W shove — his tower bleeds plates, his roams cost waves, and your visions did all the work.",
  waveWorst:"a frozen wave near his tower with no voidlings up — walking to it is the only time Malzahar is ever actually alone.",
  early:"Set the metronome: E the wave, shield-manage the poke, and silence only what matters. You are not dueling anyone — you are billing them for tempo.",
  mid:"Post-6 every lane state includes the Grasp threat: shove, ward, and punish anyone who walks into point-and-click range. With a jungler nearby, your R is a written guarantee.",
  late:"You are a suppression delivery system: shield up, hold a flank, and Grasp their carry the moment the fight breathes. The visions and burn do the rest.",
  safetyTool:"spell shield (Iron Boundary)",
  spikesLine:"Lost Chapter completes the shove engine; level 6 adds the kill guarantee; Liandry's makes the suppression lethal solo.",
  carryLine:"Carry by subtraction — every fight starts 4v5 when your R lands; your job is the wave control that makes the fight happen on your timer.",
  behindShort:"farm with E-W shoves and stay relevant through the R guarantee.",
  loadingRule:"Guard the spell shield — trade only when it is intact.",
  dontDetail:"Your Q is the only interrupt you own — silencing poke instead of his engage spell is how Malzahars get dove.",
  aheadTpl:"Ahead, suffocate: perma-shove with visions, Grasp every over-step, and rotate your R threat to rivers — {E} cannot farm a wave that is always crashing.",
  behindTpl:"Behind, the metronome still ticks: E-W waves from safety, shield-manage, and hold R — one suppression on their carry resets any deficit into a won fight.",
  spikeName:"Liandry's",
  runeReport:"Arcane Comet or First Strike, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight. The E-tick pattern procs Comet endlessly.",
  summReport:"Flash + Teleport standard — TP doubles your shove-tax map game. Ghost-cleanse setups exist into hard dive; Ignite pairs with R kill threats if you want lane blood.",
  itemReport:"Start Doran's Ring + 2 pots. Liandry's Torment rush into Sorcerer's, then Rylai's and Rabadon's. Banshee's into pick comps — a second spell shield on the spell-shield champion.",
  jungleLine:"Your R is the best gank setup in League — full stop. Suppress on arrival and the kill is guaranteed; pre-6, your Q-silence still strands {E} for any decent collapse.",
  redditLine:"shield is a resource, silence is an interrupt, R is a contract — Malzahar wins by billing the enemy for every minute of tempo.",
  load:{
    sub:"r/MalzaharMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — the shove engine completes",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Liandry's Torment",
    secondItem:"Rylai's Crystal Scepter",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Liandry's + Rylai's — the suppression chains into a burn-slow nobody walks away from.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    fizz:{ tldr:"His E dodges your R mid-channel — the one assassin your kit doesn't pre-answer. Bait the hop with Q threat BEFORE committing the suppression.",
      dos:["Bait his E with Q-silence threat first","R him only after the hop is spent","Keep the wave crashing — his roams are worse than his dives"] },
    sylas:{ tldr:"He steals your R and uses it better in a brawl — never let the lane become a brawl. Silence his E2 chain and shove him under tower forever." },
    katarina:{ tldr:"Q-silence cancels Death Lotus and R suppresses her resets — you are her worst matchup; play forward and punish every dagger.",
      dos:["Silence her the instant she Shunpos in","Suppress her mid-Lotus, every time","Stand near your wave so voidlings eat her resets"] },
    yasuo:{ tldr:"Wind Wall blocks your Q but not your E, W, or R — shove him under tower and suppress the knockup window his whole kit waits for." }
  }
},

// ============================== ORIANNA ==============================
{
  key:'orianna', name:'Orianna',
  curve:[0.1,0.2,0.2,0.3,0.4,0.5,0.6],
  lvl:[
    "Ball on the wave, autos on his face — your passive-stacked autos win level 1 against almost every mid. Place, don't throw.",
    "Q-W online: the classic chunk combo. Trade it on his last-hits and keep the ball where his approach must cross it.",
    "E completes the kit: ball-on-self beats his engage, ball-on-wave farms, ball-on-him threatens. The chess match begins.",
    "Lost Chapter timing — Q-W every wave contact now. The Dissonance field controls every step he takes near the ball.",
    "Shockwave online — your lane presence doubles without casting anything. Every wave he contests is a potential flip.",
    "Luden's spike: Q-W chunks a third of his bar. Shove, rotate, and let the ball-delivery threat run the river fights.",
    "Late Ori is the teamfight: protect-ball on your diver, shockwave their clump, and dissonance the choke they retreat through."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'TRICKY', fighter:'HARD' },
  diffEx:{ fizz:'HARD', yasuo:'HARD', yone:'HARD', irelia:'HARD', pantheon:'HARD',
    zed:'TRICKY', kassadin:'TRICKY', leblanc:'TRICKY', akali:'TRICKY', sylas:'TRICKY', syndra:'TRICKY', xerath:'TRICKY', vladimir:'TRICKY', zoe:'TRICKY', karma:'TRICKY',
    katarina:'EVEN', galio:'EVEN', ziggs:'EVEN', lux:'EVEN', viktor:'EVEN', anivia:'EVEN', azir:'EVEN', cassiopeia:'EVEN', malzahar:'EVEN', taliyah:'EVEN', hwei:'EVEN', veigar:'EVEN', annie:'EVEN', ahri:'EVEN', vex:'EVEN', brand:'EVEN', neeko:'EVEN', twistedfate:'EVEN' },
  vs:{
    control:{
      tldr:"The cleanest control mirror in the game — ball placement against his cooldowns, and the better-positioned sphere wins.",
      breakdown:"You trade evenly on spells, so win on geometry: park the ball where his farm path crosses it, Q-W the contact, and auto-weave when he steps to answer. The Shockwave threat from 6 makes every river skirmish yours to call.",
      dos:["Park the ball on his farm path","Q-W his wave contacts on cooldown","Auto-weave the passive between casts"],
      donts:["Throw the ball idle to max range","Trade with the ball stranded behind you","Shockwave a wave when fights are spawning"],
      win:"Out-position the ball war, win wave contacts, and own every river with Shockwave threat."
    },
    burst:{
      tldr:"His combo beats yours in one rotation — your ball-on-self beats his combo. Order of operations decides everything.",
      breakdown:"E-on-self plus W blunts his burst and speeds your disengage; the trick is pre-casting it on his tells, not after. Trade Q-W on his cooldown gaps and remember your sustained DPS out-writes his rotation if the first ten seconds go even.",
      dos:["Ball-on-self the instant he tells his engage","Punish his cooldown gap with full Q-W-auto","Hold Shockwave for his commit, not his poke"],
      donts:["Trade while his full combo is loaded","Strand the ball offensively when you need the shield","Burn R defensively when E already answers"],
      win:"Shield the burst window, out-DPS the gap, and flip his all-in with Shockwave."
    },
    assassin:{
      tldr:"He dives a ball that shields, slows, and flips — keep it close, keep the wave middle, and make his dive a Shockwave donation.",
      breakdown:"Your survival is ball discipline: within E-range at all times once he hits 6. The W slow-field ruins his exit, Shockwave flips the dive, and your shove punishes the roams he takes instead. The lane is won by the boring version of you.",
      dos:["Keep the ball within E-on-self range always","Slow-field his exit path mid-dive","Crash waves and ping his every roam"],
      donts:["Strand the ball poking when he hits 6","Shove past river without flank wards","Greed the third Q-W when his engage is up"],
      win:"Make every dive land on shield-slow-Shockwave, and tax his roams with permanent shove."
    },
    fighter:{
      tldr:"He fights through your damage if the fight is ever fair — dissonance the ground, shield the engage, and never let it be fair.",
      breakdown:"Dash-fighters force your kit defensive: ball hovers between you and him, W zones the dash lane, E pre-answers the all-in. Trade only off his whiffs and respect that your R is the only spell that genuinely turns his engage around.",
      dos:["Hover the ball between you and his dash lane","W the ground he must dash across","Save R to flip the committed all-in"],
      donts:["Trade extended inside his reach","Move the ball offensively with his engage up","Fight in his wave at even health"],
      win:"Zone the dash lane, shield the commit, and Shockwave the all-in backward."
    }
  },
  mirror:{
    tldr:"Ball mirror — geometry war. Whoever's sphere holds better ground wins lane; whoever's Shockwave lands first wins every fight after.",
    breakdown:"Identical kits reduce to placement and patience: keep your ball forward of hers, dodge her Q-line by walking off the wave axis, and bank the first clean Shockwave — it decides the river game.",
    dos:["Hold forward ball position","Dodge off the wave axis, not along it","Land the first Shockwave of every fight"],
    donts:["Trade with your ball behind hers","Mirror her Q timing predictably","Flip R-for-R without jungle nearby"],
    win:"Win the geometry, land the first flip — the better-placed ball runs the game.",
    winS:"Her ball is stranded — step up and chunk for free."
  },
  winS:"His engage is down — Q-W him off the wave for free.",
  tradeGood:"Ball on his farm path, Q-W the last-hit contact, auto-weave once, and recall the ball — three-second trades his combo math can't answer.",
  tradeBad:"Poking with the ball stranded at max range when his engage is up — an Orianna without her ball is a Doran's Ring with legs.",
  waveBest:"a Q-W slow push you crash on roam timers — your clear is instant from Luden's and the ball travels with the shove.",
  waveWorst:"a frozen wave at his tower with the ball behind you — walking up ball-less into gank season is how Ori lanes end.",
  early:"Win the auto-weave levels: passive stacks hurt, ball placement zones, and Q-W trades punish every wave contact. Mana is the only brake.",
  mid:"From Luden's you run rivers: shove the wave, hover the ball at the choke, and Shockwave the first clump that contests. Protect-ball on your jungler doubles every gank.",
  late:"You are the fight: ball on the diver, Shockwave the clump, Dissonance the retreat. Position behind your front line and let the sphere do the dying.",
  safetyTool:"E Command: Protect",
  spikesLine:"Lost Chapter steadies the trade game; level 6 doubles your lane presence; Luden's makes Q-W a third of a health bar.",
  carryLine:"Carry through the ball — no champion controls teamfight space like Orianna; one Shockwave on three is a won game, and you decide when it happens.",
  behindShort:"farm with Q-W clears and stay relevant through Shockwave threat.",
  loadingRule:"Track the ball's position like a second health bar — yours and theirs.",
  dontDetail:"Ball-on-self is your Flash — stranding the sphere at poke range with his engage loaded is the only way this lane kills you.",
  aheadTpl:"Ahead, run the clock: shove with Q-W, zone {E} off every contact with ball threat, and rotate first to rivers — your Shockwave makes every skirmish a 5v4 audition.",
  behindTpl:"Behind, hug the ball: E-shield the dives, clear with Q-W, and scale — Orianna from behind still flips fights with one R. Protect the sphere, protect the game.",
  spikeName:"Luden's",
  runeReport:"Arcane Comet or Phase Rush, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight. Comet rides the Q-W slow reliably.",
  summReport:"Flash + Teleport standard — the scaling control mage's insurance. Cleanse into hard-pick comps where one root means one Shockwave-less death.",
  itemReport:"Start Doran's Ring + 2 pots. Luden's Companion into Sorcerer's, then Shadowflame and Rabadon's. Zhonya's vs dive — buy the stopwatch the moment Zed hits 6.",
  jungleLine:"Protect-ball on your diving jungler is the best gank-assist buff in the game — shield, speed, and a travelling Shockwave. Pre-6, the W slow-field strands {E} for any collapse.",
  redditLine:"the ball is the champion and the robot is the mount — place it like it costs gold, shield like it's a summoner, and Shockwave clumps, not champions.",
  load:{
    sub:"r/OriannaMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — the trade engine steadies",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Luden's Companion",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Luden's + Shadowflame — Q-W becomes a third of a health bar per rotation.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall eats the ball mid-flight — move it AROUND the wall or hover it on yourself and let him dash into the Dissonance field.",
      dos:["Ball-on-self when his wall is up","W the ground his dash-chain crosses","Shockwave the EQ3 commit backward"] },
    zed:{ tldr:"The classic test: ball-on-self at 6, Zhonya's by 9, and Shockwave his R return spot — boring Ori beats brilliant Zed.",
      dos:["Ball-on-self the moment he casts R","Shockwave his shadow-return spot","Rush the Zhonya's stopwatch at 6"] },
    sylas:{ tldr:"He steals Shockwave and throws it back better in a brawl — hold yours until his is spent and never group ball-adjacent when he engages." }
  }
}
];

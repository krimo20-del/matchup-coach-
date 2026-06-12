// MatchupCoach — MID generator configs batch 4: Viktor, Vladimir, Xerath, Ziggs.
window.GEN_MID_CFGS_4 = [

// ============================== VIKTOR ==============================
{
  key:'viktor', name:'Viktor',
  curve:[0.0,0.1,0.2,0.3,0.4,0.5,0.8],
  lvl:[
    "Q-shield trades on his last-hits — the empowered auto walk-away is sneakily one of the better level-1 trades mid.",
    "E online: the laser farms AND pokes in one cast. Aim it through minions into his chest on every wave contact.",
    "Full kit: W zones his aggression and the E-Q-auto trade pattern is fully armed. Stack your first augment quietly.",
    "Lost Chapter timing — laser every wave contact and bank Manaflow. Each augment makes the same spells quietly crueler.",
    "Chaos Storm online — your all-in answer and teamfight entry. In lane it's the kill: W-E-R on anyone who oversteps.",
    "Luden's spike: the laser chunks a third bar and the storm executes the remainder. Force extended rotations.",
    "Evolved late-game Viktor is a zone the enemy can't enter: W the choke, E the clump, and steer R through the retreat."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'TRICKY', fighter:'HARD' },
  diffEx:{ fizz:'HARD', syndra:'HARD', yasuo:'HARD', yone:'HARD', irelia:'HARD', pantheon:'HARD',
    katarina:'EVEN', ziggs:'EVEN', lux:'EVEN', orianna:'EVEN', anivia:'EVEN', azir:'EVEN', vladimir:'EVEN', malzahar:'EVEN', taliyah:'EVEN', hwei:'EVEN', swain:'EVEN', ryze:'EVEN', twistedfate:'EVEN', veigar:'EVEN', annie:'EVEN', vex:'EVEN', brand:'EVEN', neeko:'EVEN', ahri:'EVEN',
    zed:'TRICKY', kassadin:'TRICKY', leblanc:'TRICKY', akali:'TRICKY', cassiopeia:'TRICKY', xerath:'TRICKY', zoe:'TRICKY', ekko:'TRICKY', diana:'TRICKY', qiyana:'TRICKY', talon:'TRICKY', naafiri:'TRICKY', sylas:'TRICKY', galio:'TRICKY' },
  vs:{
    control:{
      tldr:"A scaling duel you win by attrition — laser every wave contact and let augment math out-pace his rotation.",
      breakdown:"Neither of you kills the other without a mistake; your job is making the mistakes profitable. E through the wave into his position, Q-shield his answer, and bank augments — by third item your 'even lane' was a slow-motion victory.",
      dos:["Laser his wave contact every cycle","Q-shield before eating his answer","Bank Manaflow and augments relentlessly"],
      donts:["Trade rotations at his optimal range","Waste W on a target who isn't committing","Roam-chase when scaling is the plan"],
      win:"Break even loudly, scale quietly, and own every fight from two items on."
    },
    burst:{
      tldr:"His combo is rude but your Q-shield blunts the opener and your W punishes the dive that follows.",
      breakdown:"Pre-cast Q on his engage tells: the shield plus empowered auto refunds half his opener. W the ground he must stand on to finish, E the disengage, and hold R as the all-in equalizer. From Luden's onward your sustained rotation out-values his cooldown gamble.",
      dos:["Pre-shield his engage spell on the tell","W the ground his combo needs","Punish cooldown gaps with full E-Q rotations"],
      donts:["Eat the full combo shieldless","Drop W after the dive already landed","Trade at half HP while his R is up"],
      win:"Shield the burst, zone the follow-up, and out-rotate the gap his combo leaves."
    },
    assassin:{
      tldr:"He has to stand in Gravity Field range to kill you — make the field the whole conversation.",
      breakdown:"W is the matchup: dropped early it zones the engage, dropped late it stuns the dive. Keep the wave centered, laser from behind your minions, and hold R to melt him during the stun he keeps risking. Respect the roams — shove and ping like it's your job, because it is.",
      dos:["Hold W for the committed dive","Laser from behind the minion line","Crash waves and ping his roam timers"],
      donts:["Drop W on spacing instead of commits","Shove past river at his 6 without vision","Greed augment farm at half HP"],
      win:"Stun the dive with W, melt it with R, and tax the roams with permanent shove."
    },
    fighter:{
      tldr:"He runs through lasers if you aim them late — zone first, shoot second, and never trade inside his reach.",
      breakdown:"Dash-fighters punish your cast times, so invert the order: W the dash lane BEFORE poking, E from max range, and Q-shield the trade you couldn't refuse. Your R steers — drag the storm along his retreat and the extended fight he wanted becomes a chase scene he loses.",
      dos:["W the dash lane before you poke","E from angles outside his engage range","Steer R along his retreat line"],
      donts:["Cast E inside his gap-close range","Trade extended at melee distance","Save W for after the engage lands"],
      win:"Zone the engage lane, kite the storm, and let augment scaling end the argument."
    }
  },
  mirror:{
    tldr:"Machine mirror — augment economy and laser accuracy; whoever lands more Es wins lane, whoever steers R better wins fights.",
    breakdown:"Identical scaling reduces to mechanics: dodge his laser line by moving perpendicular late, land yours through minion cover, and keep your W between you in the 6 standoff.",
    dos:["Dodge his E late and lateral","Laser through minion cover","Hold W for his R commit"],
    donts:["Trade laser-for-laser predictably","Stand in his W arguing with fate","Steer R head-on into his shield"],
    win:"Out-laser the lane and out-steer the storm — augments settle the rest.",
    winS:"His field is down — walk up and run the full rotation."
  },
  winS:"His engage is spent — laser the retreat and walk forward.",
  tradeGood:"E through the wave into his chest, Q-shield the response, empowered-auto, and walk — a full trade where his answer hit a shield.",
  tradeBad:"Casting E at melee-adjacent range against a loaded engage — Viktor's cast times are an assassin's favorite metronome.",
  waveBest:"a lasered slow push that crashes on your terms — the E clears and pokes in the same cast, so every shove is also a trade.",
  waveWorst:"a frozen wave near his tower with W down — walking up shieldless into gank season is how augment stories end early.",
  early:"Trade Q-shield and laser contacts — your early is sturdier than the scaling-mage stereotype. Bank everything; the machine compounds.",
  mid:"Luden's onward you rotate hard: laser the wave, W the river chokes, and steer R through every skirmish. Your DPS curve is the cleanest in the class.",
  late:"You are the evolved teamfight: W their entry, E the clump, steer the storm through their carries, and Q-shield whatever reaches you. Glorious indeed.",
  safetyTool:"W Gravity Field",
  spikesLine:"Lost Chapter steadies the engine; level 6 adds the storm; Luden's + augments turn rotations into deletions.",
  carryLine:"Carry through evolution — Viktor's third item is an event; your job is reaching it with the game still winnable, then ending it personally.",
  behindShort:"farm with E clears and stay relevant through W zone control.",
  loadingRule:"Aim the laser through minions into his chest — every E should farm AND poke.",
  dontDetail:"Your W is the anti-dive AND the kill-setup — dropped on nothing, both jobs wait seventeen seconds while assassins do math.",
  aheadTpl:"Ahead, evolve faster: laser {E} off every contact, zone the comeback farm with W, and steer storms through each river fight — fed Viktor is a deadline.",
  behindTpl:"Behind, the machine still compounds: E-farm safely, shield the dives, and reach third item — evolved Viktor forgives early balance sheets.",
  spikeName:"Luden's",
  runeReport:"Arcane Comet or First Strike, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight. First Strike funds the augment curve fastest.",
  summReport:"Flash + Teleport standard — the scaling thesis insurance. Cleanse into chain-CC pick comps that erase cast-time champions.",
  itemReport:"Start Doran's Ring + 2 pots. Luden's Companion into Sorcerer's, then Shadowflame and Rabadon's. Zhonya's vs dive — the stopwatch covers your cast windows.",
  jungleLine:"W-on-arrival makes any mid gank a stun-kill, and your laser chunks the retreat — ping your jungler at 6: storm plus any CC is a guaranteed river win.",
  redditLine:"laser through the wave not around it, drop W before the dive not after, and respect the cast times — Viktor wins games his early game merely survives.",
  load:{
    sub:"r/viktormains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — the laser goes infinite",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Luden's Companion",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Luden's + Shadowflame — the laser rotation chunks thirds and the storm finishes the math.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall eats your laser and Q — W his dash-chain lane FIRST, then cast only what the wall can't reach.",
      dos:["Drop W across his dash lane pre-trade","Bait the wall before committing E","Steer R behind him where the wall isn't"] },
    fizz:{ tldr:"His E hops the Gravity Field and his burst beats your shield — the hardest dive in the pool; hug tower post-6 and laser from fountain range." },
    syndra:{ tldr:"She out-pokes and out-bursts you pre-augments — dodge the QE line, farm with lasers, and survive to the second item where the math flips." }
  }
},

// ============================== VLADIMIR ==============================
{
  key:'vladimir', name:'Vladimir',
  curve:[-0.5,-0.3,-0.1,0.1,0.4,0.5,1.0],
  lvl:[
    "Q-farm and nothing else — your level 1 is among the worst mid. Give CS you can't Q safely and smile about it.",
    "Still surviving. Q on cooldown when free, pool saved for the jungler you haven't seen yet.",
    "E charges join the pattern: Q-E wave contact trades start mattering. Health is your mana — spend like an accountant.",
    "The crimson rush timing — Q empowers every third-ish cast and the sustain war starts tilting your way.",
    "Hemoplague online — the all-in inverts: Q-E-R-E with ignite kills most mids who thought they were winning.",
    "Riftmaker timing: every trade heals more than it costs. Extended fights are now donations to your health bar.",
    "Late Vlad is a raid boss: pool their engage, R their clump, and drain whatever stayed to argue."
  ],
  diffBase:{ control:'TRICKY', burst:'TRICKY', assassin:'EVEN', fighter:'EVEN' },
  diffEx:{ syndra:'HARD',
    zed:'EVEN', katarina:'EVEN', kassadin:'EVEN', ekko:'EVEN', diana:'EVEN', qiyana:'EVEN', sylas:'EVEN', yasuo:'EVEN', yone:'EVEN', galio:'TRICKY', malzahar:'EVEN', anivia:'EVEN', swain:'EVEN', ryze:'EVEN', twistedfate:'EVEN', veigar:'EVEN', annie:'EVEN', vex:'EVEN', neeko:'EVEN',
    fizz:'TRICKY', leblanc:'TRICKY', akali:'TRICKY', talon:'TRICKY', naafiri:'TRICKY', lux:'TRICKY', xerath:'TRICKY', ziggs:'TRICKY', viktor:'TRICKY', orianna:'TRICKY', azir:'TRICKY', cassiopeia:'TRICKY', taliyah:'TRICKY', hwei:'TRICKY', ahri:'TRICKY', zoe:'TRICKY', brand:'TRICKY', irelia:'TRICKY', pantheon:'TRICKY' },
  vs:{
    control:{
      tldr:"He pokes a champion whose poke heals — survive the early tax bracket and the sustain math forecloses on him.",
      breakdown:"You lose the first fifteen minutes of poke war on purpose: Q-farm what's safe, concede what isn't, and keep the pool for his kill-window spell. From one item your Q out-heals his chip and every extended exchange becomes a transfusion in the literal direction.",
      dos:["Q-farm and bank the sustain war","Pool his ONE kill-window spell only","Force extended trades from Riftmaker on"],
      donts:["Trade rotations during his lane lead","Pool poke that your Q heals back anyway","E-charge at half HP inside his range"],
      win:"Survive the poke mortgage, hit one item, and drain the lane he thought he owned."
    },
    burst:{
      tldr:"His full combo meets a two-second pool — the whole lane is the timing war over one untargetable button.",
      breakdown:"Burst mages must hit ALL of their rotation to kill you; Sanguine Pool deletes the half that matters. Don't pool the poke — pool the engage spell, then Q-E the cooldown gap while his plan reboots. Post-6, your R turns his 'winning' trades into shared health crises.",
      dos:["Pool the engage spell, never the poke","Q-E the cooldown gap after his combo","R him the moment his burst is spent"],
      donts:["Panic-pool chip damage","Trade at his optimal range pre-items","Stand at half HP with pool down"],
      win:"Pool the combo's keystone, drain the gap, and out-scale the mage who needs windows you keep closing."
    },
    assassin:{
      tldr:"He dives a champion who becomes a puddle — pool the burst, drain the confusion, and out-scale the frustration.",
      breakdown:"Your pool answers his entire profession once per twenty-something seconds: spend it on his real combo and the assassination becomes a sparring session. Keep waves centered pre-6, Q relentlessly for the sustain, and remember Hemoplague plus ignite kills HIM in the window after his failed dive.",
      dos:["Pool his commit, then turn immediately","Q-sustain through his chip phase","R + ignite the failed dive's retreat"],
      donts:["Pool early on the feint","Greed E charges in his engage range","Push past river with pool down"],
      win:"Make the dive hit a puddle, then drain the assassin who spent everything on it."
    },
    fighter:{
      tldr:"He brawls, you drain — the extended fight he forces is the exact fight your kit monetizes.",
      breakdown:"Fighters win early exchanges, so don't have them: Q-farm, pool the all-in, scale. From Riftmaker the same brawl inverts — your E-Q cycle out-heals his DPS and your R makes his health bar a joint account. Let him think the lane is his until it suddenly never was.",
      dos:["Concede early trades gracefully","Pool the all-in, walk, repeat","Invite the brawl from Riftmaker onward"],
      donts:["Brawl pre-items out of pride","Burn pool on trade-chip","E-charge inside his reach early"],
      win:"Survive the bully phase and then drain the brawl he kept asking for."
    }
  },
  mirror:{
    tldr:"Blood mirror — whoever manages health-as-mana better wins; the second pool always beats the first.",
    breakdown:"Identical sustain makes the all-in math everything: bait his pool with a fake commit, R second, and E-Q the window where he is poolless and plagued.",
    dos:["Bait his pool before committing yours","R second in the plague standoff","Win the Q-sustain accounting war"],
    donts:["Pool first on a feint","Trade E-for-E at even charges","All-in without ignite advantage"],
    win:"Second pool, second R, first kill — order of operations is the mirror.",
    winS:"His pool is down — all-in the unprotected health bar."
  },
  winS:"His escape is spent — R, ignite, and drain the ending.",
  tradeGood:"Q the last-hit, E-charge as he steps to answer, release and walk — the trade costs him HP and pays yours.",
  tradeBad:"Pooling his poke and then eating the real engage at half HP with nothing — the pool is a combo-breaker, not a flinch reflex.",
  waveBest:"an E-Q cleared push you crash at your item timings — Vlad waves are about arriving at spikes on schedule, not tempo.",
  waveWorst:"a frozen wave near his tower pre-items — every Q walk-up is a poke donation to a lane you're trying to mortgage.",
  early:"Pay the early tax quietly: Q-farm, pool discipline, zero pride. Vladimir's lane is a loan application — approval comes at first item.",
  mid:"Riftmaker onward, collect: extended trades heal you, R-ignite kills through sustain answers, and your roams arrive with a health bar lanes can't match.",
  late:"You are the late game: pool their engage, R the clump of five, and drain the teamfight your team merely attends. Hemoplague pops win games on their own.",
  safetyTool:"W Sanguine Pool",
  spikesLine:"First item flips the sustain war; level 6 adds the all-in; Riftmaker + Cosmic Drive makes extended fights unloseable.",
  carryLine:"Carry through inevitability — no resource bar, no real counter to time; your job is reaching three items with the game still on the map.",
  behindShort:"farm with Q sustain and stay relevant through the scaling curve.",
  loadingRule:"Health is mana — spend E and trades like an accountant, not a gambler.",
  dontDetail:"The pool is your only 'no' — spent on poke, the next gank finds a Vladimir who is just a wet mage with a cape.",
  aheadTpl:"Ahead, compound the interest: zone {E} off CS with Q threat, R every skirmish clump, and force the extended fights your kit literally banks.",
  behindTpl:"Behind, nothing changed: Q-farm, pool the dives, hit item timings — Vladimir from behind at 30 minutes is ahead; protect the curve and stop donating.",
  spikeName:"Riftmaker",
  runeReport:"Phase Rush (kite/escape) or Predator roam builds; Manaflow replaced — take Nimbus Cloak + Transcendence, Scorch; secondary Resolve — Bone Plating + Overgrowth into dive.",
  summReport:"Flash + Ghost or Flash + Ignite — Ghost converts the drain-chase identity; Ignite turns the level-6 invert into a guarantee. TP if the lane is pure survival.",
  itemReport:"Start Doran's Shield or Ring + pots. Riftmaker into Sorcerer's/Swifties, then Cosmic Drive and Rabadon's. Zhonya's-Protobelt lines exist into dive — no mana items, ever.",
  jungleLine:"You set up ganks by existing — every {E} who plays correctly against Vlad shoves, and shoved lanes are gank lanes. Pool guarantees you survive the counter-gank math.",
  redditLine:"pool the spell that matters, treat HP as mana, and arrive at item timings on schedule — Vlad loses lanes on purpose and wins games by appointment.",
  load:{
    sub:"r/VladimirMains",
    start:"Doran's Shield + Health Potion",
    normalBack:"Amplifying Tome + Boots (≈900g)",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Riftmaker",
    secondItem:"Cosmic Drive",
    boots:"Sorcerer's Shoes / Swiftness",
    bootsVsAP:"Mercury's Treads / Sorcerer's Shoes",
    bootsVsAD:"Plated Steelcaps / Sorcerer's Shoes",
    spike:"Riftmaker + Cosmic Drive — every extended trade becomes a transfusion in your favor.",
    runes:{ keystone:"Phase Rush", primaryTree:"Sorcery", primary:["Nimbus Cloak","Transcendence","Scorch"], tree:"Resolve", secondary:["Bone Plating","Overgrowth"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    syndra:{ tldr:"The classic Vlad counter — her poke out-paces your sustain and her R ignores your pool math. Take Doran's Shield, farm with Q only, and survive to Riftmaker." },
    zed:{ tldr:"Pool his Death Mark — the whole matchup in three words. Farm the early poke patiently; post-6 his all-in feeds your R-ignite counter-kill.",
      dos:["Pool the R, not the poke","Q-sustain through the energy chip","R + ignite his failed dive window"] },
    kassadin:{ tldr:"A scaling race where you bully the checkpoints — Q him off CS pre-6 and force the R-ignite all-ins before his third item argues." },
    galio:{ tldr:"His MR scaling and engage-taunt are built against you — don't brawl him; farm, scale, and drain his backline instead of the statue." }
  }
},

// ============================== XERATH ==============================
{
  key:'xerath', name:'Xerath',
  curve:[0.5,0.4,0.5,0.4,0.4,0.4,0.2],
  lvl:[
    "Q from fog-of-war range on his every last-hit — level 1 Xerath is the longest gun in the lane. Mana is the only governor.",
    "W joins the pattern: Q-W on the slowed target is the chip combo that defines the next twenty minutes.",
    "E completes the kill kit: the stun into full rotation is real damage even now. Hold it for HIS aggression, not yours.",
    "Lost Chapter timing — the artillery goes infinite. Poke the wave contact, the trade attempt, and the recall walk.",
    "Rite of the Arcane online — chipped targets anywhere in the lane's zip code are now finishable. Shove and snipe.",
    "Luden's spike: Q-W chunks third-bars. He farms at half HP forever or he doesn't farm.",
    "Late Xerath wins fights from the next postal code: stun the entry, barrage the objective, and never be seen."
  ],
  diffBase:{ control:'FAVOURED', burst:'EVEN', assassin:'HARD', fighter:'HARD' },
  diffEx:{ syndra:'EVEN', ziggs:'EVEN', hwei:'EVEN', lux:'EVEN', zoe:'EVEN', azir:'EVEN', veigar:'EVEN', annie:'EVEN', vex:'EVEN', brand:'EVEN', neeko:'EVEN', karma:'EVEN', twistedfate:'FAVOURED',
    ahri:'TRICKY', kassadin:'TRICKY', galio:'TRICKY',
    leblanc:'HARD', fizz:'HARD', zed:'HARD', katarina:'HARD', akali:'HARD', yasuo:'HARD', talon:'HARD', qiyana:'HARD', ekko:'HARD', diana:'HARD', naafiri:'HARD', sylas:'HARD', irelia:'HARD', pantheon:'HARD', yone:'HARD' },
  vs:{
    control:{
      tldr:"You out-range the range class — every spell he lands cost him three steps into your artillery to cast.",
      breakdown:"Nobody in the control pool casts from your distance: Q his last-hits from beyond retaliation, W the dodge attempt, and hold E for the one gap-closer-shaped mistake he makes per game. The mana war is the only war — Manaflow first, opinions second.",
      dos:["Q from beyond his maximum answer range","W the lateral dodge after every Q","Bank Manaflow before contesting anything"],
      donts:["Step inside his range to 'finish' chip","Spend E aggressively without jungle nearby","Push past river to extend a poke lead"],
      win:"Win the range war you were drafted for — chip, stun the mistake, and snipe the remainder."
    },
    burst:{
      tldr:"His combo needs proximity your artillery exists to deny — poke the approach, stun the commit, finish by mail.",
      breakdown:"Every step he takes toward combo range eats a Q; every dodge eats the W that follows. The E stun is your entire defense — held for his engage it wins the lane, spent on poke it loses the game. Post-6, half-HP burst mages simply stop being able to walk to lane.",
      dos:["Tax every step toward his combo range","Hold E exclusively for the engage","R the recall walk after each chip war"],
      donts:["Let him close distance during your cooldowns","Stun-poke and then face the engage empty","Trade at the range where his burst reaches"],
      win:"Deny the approach, stun the commit, and let the barrage collect what the poke invoiced."
    },
    assassin:{
      tldr:"You are the snack his champion was designed to eat — the lane is a survival course with a sniper rifle as consolation.",
      breakdown:"He dashes through your poke lead at 6 and the artillery can't fire backward: keep waves centered, hold E like a heartbeat, and accept that even lanes are won lanes here. Your R punishes his roams from base — the map pays what the lane can't.",
      dos:["Keep the wave centered, always","Hold E for the dive — it is your whole defense","R his roams and low-HP resets from safety"],
      donts:["Shove past river after his 6 — ever","Spend the stun on chip damage","Greed one more Q at half HP"],
      win:"Survive the dive windows with E discipline and out-range the rest of his game from the map."
    },
    fighter:{
      tldr:"He runs through poke that doesn't stun — so the E always stuns: hold it, land it, and rebuild the distance.",
      breakdown:"Dash-fighters close your range gap in one cooldown: poke at max distance only, E the committed engage mid-flight, and W-slow the rebuild walk. From Luden's the chip math means he arrives at half HP — if he arrives at all.",
      dos:["Poke only from your maximum range","E his engage mid-dash, not on arrival","W-slow the gap rebuild after each stun"],
      donts:["Q at distances his dash covers","Spend E before his real commit","Stand near the wave when his engage is loaded"],
      win:"Stun the bridge, rebuild the moat, and bill him a third-bar per crossing attempt."
    }
  },
  mirror:{
    tldr:"Artillery mirror — the longest game of dodgeball in League; whoever lands Q-W first runs each exchange.",
    breakdown:"Identical ranges make movement the whole game: strafe off-rhythm, cast second when his cooldowns show, and win the Manaflow bank. The E standoff decides all-ins — hold it longer.",
    dos:["Strafe off-rhythm between his casts","Cast second, punish his cooldowns","Hold E longest in the standoff"],
    donts:["Trade Q-for-Q on his rhythm","Stand still mid-W channel","R first and eat his counter-barrage"],
    win:"Dodge better, bank better, stun last — the patient battery wins.",
    winS:"His stun is down — walk forward and chip freely."
  },
  winS:"His gap-closer is spent — artillery the stranded target.",
  tradeGood:"Q the last-hit from beyond his answer range, W the lateral dodge, and walk — a one-way trade he can only end by leaving the lane.",
  tradeBad:"Spending E on chip and then watching the dash you bought it for arrive on schedule — the stun is your only 'no' and everyone knows it.",
  waveBest:"a Q-thinned slow push that crashes while you snipe from two screens — Xerath waves manage themselves if your poke owns the contact point.",
  waveWorst:"a frozen wave near his tower past minute six — the immobile artillery walking up to reset is the most assassinated picture in mid.",
  early:"Open the chip ledger immediately: Q every last-hit, W every dodge, and bank Manaflow — Xerath lanes are won at minute three, collected at minute twenty.",
  mid:"Post-6 you shove-and-snipe: crash the wave, R the chipped, and rotate your barrage to every river contest — your poke decides objectives you never attend.",
  late:"You are off-screen and decisive: stun the engage, barrage the pit, and re-position before the minimap finds you. Distance is your defense and your damage.",
  safetyTool:"E Shocking Orb",
  spikesLine:"Lost Chapter makes the artillery infinite; level 6 finishes what poke starts; Luden's turns chip into third-bars.",
  carryLine:"Carry from the next postal code — no champion converts vision and distance into damage like Xerath; your job is never being where the fight thinks you are.",
  behindShort:"farm with max-range Qs and stay relevant through R snipes.",
  loadingRule:"Hold E for his engage — the stun is your entire defense.",
  dontDetail:"Your E is a single 'no' per fourteen seconds — spent on poke, every assassin and fighter in the lobby hears the silence.",
  aheadTpl:"Ahead, extend the artillery line: chip {E} off every CS, R his recalls, and rotate barrages to rivers — a fed Xerath taxes the whole map from fog.",
  behindTpl:"Behind, the rifle still fires: Q-farm from safety, hold E for dives, and snipe comebacks with R — Xerath deficits are range-shaped and range never falls behind.",
  spikeName:"Luden's",
  runeReport:"Arcane Comet, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight. Comet plus W-slow is near-guaranteed chip.",
  summReport:"Flash + Teleport standard; Cleanse into hard-pick comps; Exhaust exists for the assassin lanes you cannot range away from.",
  itemReport:"Start Doran's Ring + 2 pots. Luden's Companion into Sorcerer's, then Shadowflame and Rabadon's. Zhonya's vs dive — buy the stopwatch at assassin-6, not after.",
  jungleLine:"Your E is clean gank setup and your W slows the runback — but your real gift is R: tell your jungler to fight ANY skirmish; your barrage attends from base.",
  redditLine:"max range or no range, hold the stun like it's rent, and snipe the recalls — Xerath wins by making the lane a no-walk zone.",
  load:{
    sub:"r/XerathMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — the artillery goes infinite",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Luden's Companion",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Luden's + Shadowflame — Q-W chip becomes third-bar artillery.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall eats your entire kit and his dashes close your range in two cooldowns — poke through minion-gap angles only and stun the LAST dash of his chain.",
      dos:["Bait the wall with a throwaway Q","E the final hop of his dash chain","Keep the wave between you permanently"] },
    zed:{ tldr:"You chip him for five levels and then his 6 asks one question per wave: is your E up? Make the answer always yes — Zhonya's by second back after his R debut." },
    ahri:{ tldr:"Her charm out-duels your stun at mid range and her R closes your long range — keep the trade at YOUR distance and dodge-trade charms for Qs." }
  }
},

// ============================== ZIGGS (MID) ==============================
{
  key:'ziggs', name:'Ziggs',
  curve:[0.6,0.5,0.5,0.4,0.3,0.5,0.0],
  lvl:[
    "Q bombs out-range nearly every mid — chunk his last-hit attempts from angles the wave can't block.",
    "W Satchel online — your disengage button. You can now take a greedy trade and blast yourself out of the answer.",
    "Full kit: E minefield behind you makes you nearly unchaseable. Bounce Q off the wave so he can't read the angle.",
    "Stack Manaflow and chip him below 60% — that's the zone where R + jungle help executes. Track his engage before every step-up.",
    "Mega Inferno Bomb online — any chipped target or crashing wave is now your gold. Hold it for the sub-60% HP window.",
    "Blackfire Torch spike — your Q chunks become unhealable burn chip. He now chooses between farm and HP every wave.",
    "Shadowflame + Torch makes the full rotation lethal, but the map matters more — rotate R to sieges and skirmishes."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'HARD', fighter:'HARD' },
  diffEx:{ xerath:'EVEN', malzahar:'EVEN', anivia:'EVEN', viktor:'EVEN', orianna:'EVEN', lux:'EVEN', vladimir:'EVEN', taliyah:'EVEN', hwei:'EVEN', ryze:'EVEN', veigar:'EVEN', annie:'EVEN', brand:'EVEN', neeko:'EVEN', twistedfate:'EVEN', kassadin:'EVEN',
    swain:'FAVOURED',
    syndra:'TRICKY', cassiopeia:'TRICKY', azir:'TRICKY', ahri:'TRICKY', zoe:'TRICKY', vex:'TRICKY', galio:'TRICKY', karma:'TRICKY', mel:'TRICKY' },
  vs:{
    control:{
      tldr:"A real poke war — your Q out-ranges, his key spell punishes. Trade bombs and dodge the answer.",
      breakdown:"You win the spell-for-spell war on range and AoE; he wins on whatever his signature spell enables. Sidestep it, keep the wave near the middle, and let Scorch + Torch math grind him out of lane.",
      dos:["Win level 1 with raw Q range","Sidestep his key spell before committing your own poke","Use E zones to control where the trade happens"],
      donts:["Eat free poke while your Q is on cooldown","Burn W while his all-in tool is up","Ignore your mana bar in a spam war"],
      win:"Out-poke and out-shove him; Satchel resets every mistake."
    },
    burst:{
      tldr:"His rotation beats yours up close — so it never happens up close. Bomb the approach and satchel the window shut.",
      breakdown:"Burst mages need a range you simply refuse to offer: Q from maximum distance, E the space between you, and keep W charged for the engage spell. The chip war is yours by default — his combo expires unfired if he never crosses the minefield.",
      dos:["Bomb from beyond his combo range","Pre-place E on his approach line","Satchel his engage spell mid-cast"],
      donts:["Drift into his rotation range chasing chip","Burn W for damage or tempo","Trade at half HP while his combo is loaded"],
      win:"Refuse his range, chip from yours, and satchel the one window he forces."
    },
    assassin:{
      tldr:"His dashes beat your range the moment you waste W — satchel his engage, not your tempo.",
      breakdown:"This lane is a cooldown ledger: his engage versus your Satchel. Pre-place E on his dash path, poke only when the trade back is impossible, and accept farming under tower when his kit is loaded.",
      dos:["Track his engage like a summoner spell","Pre-place E minefields on his dash path","Satchel the engage, then resume the poke"],
      donts:["Waste W on poke or wave-clear","Trade inside his effective dash range","Greed for plates while his engage is up"],
      win:"Deny the engage and grind him down between his cooldowns."
    },
    fighter:{
      tldr:"He has to walk through three minefields to touch you — bomb every step-up and never stand still once his engage is up.",
      breakdown:"Q from max range on his last-hits, drop E between you the moment he walks forward, and keep W strictly for his gap-close. He kills you exactly once per game: when you stand still without Satchel.",
      dos:["Bomb his last-hits from max Q range","Drop E minefield the instant he steps forward","Hold W Satchel strictly for his engage"],
      donts:["Stand inside his engage range with W down","Use W aggressively while his all-in is up","Push past river without vision"],
      win:"Poke him off CS and satchel away from every engage."
    }
  },
  mirror:{
    tldr:"Bomb mirror — whoever lands more Qs and holds Satchel longer wins the war of attrition.",
    breakdown:"Identical kits make this pure geometry: bounce Q off minions at angles he can't read, hold W longer than he does, and only step to a wave his minefield doesn't own.",
    dos:["Bounce Q at unreadable angles","Hold W longer than he holds his","Trade only with more mana banked"],
    donts:["Stand inside his minefield zone","Satchel first without a kill window","Shove into his R count"],
    win:"Out-land Qs and out-discipline the Satchel war.",
    winS:"His Satchel is down — he can't escape your chain."
  },
  winS:"No engage left — chunk him for free.",
  tradeGood:"Bounce Q off the wave into his sidestep lane, step up to threaten the E zone, then back off before he closes — repeat until he's executable.",
  tradeBad:"Burning W Satchel for damage and then standing in his engage range with no escape — the only way this lane kills you.",
  waveBest:"a slow push you control from max range — he farms under poke while you bank a cannon crash for recall or roam.",
  waveWorst:"a frozen wave near his tower while his engage is up — every CS costs HP and jungle exposure.",
  early:"Win the first three levels on raw range: Q every last-hit attempt, E the space he wants to stand in, and respect only his engage tool.",
  mid:"Shove, chip, and win the mana war. Once Blackfire Torch completes, he farms at half HP forever — call jungle dives on anyone chipped below 60%.",
  late:"Your job is sieges and zone control — R the wave before objectives, satchel-peel divers off you, and never get flanked mid-poke.",
  safetyTool:"W Satchel",
  spikesLine:"Blackfire Torch is the first real spike; level 6 adds the half-map R execute; Shadowflame turns poke into kill pressure.",
  carryLine:"Carry by making waves and sieges unplayable — R and minefields decide objective fights from two screens away.",
  behindShort:"farm with max-range Q and stay relevant through wave-clear.",
  loadingRule:"Keep max Q range — never let him close for free.",
  dontDetail:"Your Satchel is your Flash — burning it for damage leaves you naked for twenty seconds.",
  aheadTpl:"You broke the lane — convert it: shove, demolish plates with W, and rotate R to every skirmish. Zone {E} off the comeback farm with minefields.",
  behindTpl:"Behind, farm at max range and wave-clear — Ziggs is never out of the game while towers need defending. Stop coin-flipping Satchel plays and scale your poke.",
  spikeName:"Blackfire Torch",
  runeReport:"Arcane Comet, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight. Comet plus minefield slows is near-guaranteed poke.",
  summReport:"Flash + Teleport is standard — TP survives dive lanes and converts wave-clear into map plays. Ignite only into squishy duel lanes.",
  itemReport:"Start Doran's Ring + 2 pots. First: Blackfire Torch into Sorcerer's Shoes; then Shadowflame and Rabadon's. Zhonya's vs hard dive.",
  jungleLine:"Your E minefield is elite gank setup — drop it on {E}'s escape path the moment your jungler commits. Ward deep; you have no dash, only Satchel.",
  redditLine:"max Q, poke the lane off CS, and hold Satchel for the engage — Ziggs mid wins by making the wave unplayable, not by all-inning.",
  load:{
    sub:"r/ZiggsMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — solves the mana war",
    antihealBack:"Oblivion Orb (≈800g) — cuts his healing",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Blackfire Torch",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Rabadon's third — your poke becomes execute damage.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall eats your entire kit — bait it with a cheap Q, then unload only after it's burned.",
      dos:["Bait Wind Wall with a throwaway Q","Drop E zones he must dash through","Hold W to break his EQ engage"],
      donts:["Poke into an available Wind Wall","Stand near the wave when his tornado is loaded","Burn W before his engage starts"] },
    mel:{ tldr:"Her Rebuttal reflects your bombs back — poke only while it glows on cooldown.",
      dos:["Count Rebuttal before every rotation","Trade E zones for her snare","Out-range her after the reflect is spent"] },
    kassadin:{ tldr:"He's a melee mage with no shield against your AoE — bully him off every CS pre-6 and end before Riftwalk scales." }
  }
}
];

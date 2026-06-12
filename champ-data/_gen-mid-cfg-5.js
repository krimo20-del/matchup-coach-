// MatchupCoach — MID generator configs batch 5: Ahri, Annie, Aurora, Brand.
window.GEN_MID_CFGS_5 = [

// ============================== AHRI ==============================
{
  key:'ahri', name:'Ahri',
  curve:[0.1,0.2,0.3,0.3,0.5,0.4,0.3],
  lvl:[
    "Q both ways through the wave on his last-hits — the true-damage return is most of your early poke.",
    "W joins the pattern: Q-W on anyone who eats the orb return is a real chunk already.",
    "Charm online — the lane's first kill threat. Hold it for his step-up, not for prayer-range poke.",
    "Lost Chapter timing — orb every wave contact and bank the passive heals off full clears.",
    "Spirit Rush online — three dashes change every rule: charm angles multiply and ganks stop working on you.",
    "Malignance spike: R cooldown drops and every dash window chains a full charm combo.",
    "Late Ahri is a pick machine: flank dash, charm the carry, and orb the body your team converges on."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'EVEN', fighter:'TRICKY' },
  diffEx:{ katarina:'FAVOURED', twistedfate:'FAVOURED',
    yasuo:'TRICKY', yone:'TRICKY', irelia:'TRICKY', fizz:'TRICKY', kassadin:'TRICKY', malzahar:'TRICKY', galio:'TRICKY', vex:'TRICKY', veigar:'TRICKY', cassiopeia:'TRICKY', xerath:'TRICKY', ziggs:'EVEN', pantheon:'TRICKY',
    zed:'EVEN', akali:'EVEN', leblanc:'EVEN', syndra:'EVEN', lux:'EVEN', zoe:'EVEN', viktor:'EVEN', orianna:'EVEN', anivia:'EVEN', azir:'EVEN', vladimir:'EVEN', swain:'EVEN', ryze:'EVEN', taliyah:'EVEN', hwei:'EVEN' },
  vs:{
    control:{
      tldr:"Even spell war with a mobility cheat — trade orbs honestly, then break every rule he learned the moment you hit 6.",
      breakdown:"Pre-6 you trade Q-for-spell and dodge his key line; it's fair. Post-6 it isn't: R repositions your charm to angles no control mage can ward against. Track {K}, bank passive heals, and pick the one dash-window fight per cooldown that ends the politeness.",
      dos:["Q through his last-hit position both ways","Hold charm for his step-up after 6","Heal off full waves before trading"],
      donts:["Burn R dashes for poke spacing","Charm at prayer range on cooldown","Trade while his key spell is loaded"],
      win:"Break even pre-6, then out-angle him with dash-charm picks he cannot ward."
    },
    burst:{
      tldr:"His combo needs a landed setup — yours needs a landed charm. Whoever hits the skillshot first runs the exchange.",
      breakdown:"Dodge his setup spell behind minions and answer with charm the moment it whiffs: a charmed burst mage eats your full rotation plus the second-Q true damage. R is both your dodge and your execute — never spend all three dashes going in.",
      dos:["Stand behind minions while his setup is up","Punish the whiff with instant charm","Keep one R dash banked for the exit"],
      donts:["Trade combos at even cooldowns","Spend three dashes on the way in","Eat poke while your passive heal is banked"],
      win:"Make the setup spell miss, land the charm, and out-rotate the gap with dash angles."
    },
    assassin:{
      tldr:"You are the assassin-proof mage — charm beats the engage, R beats the reset, and your poke wins everything between.",
      breakdown:"This is why Ahri gets blind-picked: his dive eats a charm, your R re-opens the spacing he closed, and the passive heals back his chip. Poke with Q, hold E strictly for his commit, and never use the last dash aggressively while he's alive.",
      dos:["Hold charm exclusively for his engage","Keep the last R dash defensive","Q-poke the farm he has to walk to"],
      donts:["Charm-poke and face the dive empty","Burn R before his engage shows","Shove past river with E down"],
      win:"Charm the dive, dash out of the reset, and bleed him with poke he can't answer."
    },
    fighter:{
      tldr:"He fights through your poke if it ever becomes a fight — charm the engage, dash the gap, and keep it a tax audit.",
      breakdown:"Dash-fighters beat your short trades, so keep them shorter: Q from max range, W only on charmed or committed targets, and spend R laterally — never backward into a wall. The charm that interrupts his engage mid-dash is the whole matchup.",
      dos:["Charm his engage mid-dash","Q from max range, always both hits","Dash laterally, never into corners"],
      donts:["Trade extended inside his reach","Waste charm on a shielded window","Stand still admiring the orb return"],
      win:"Interrupt the engage with charm and tax the lane from orb range."
    }
  },
  mirror:{
    tldr:"Fox mirror — whoever lands charm first wins each fight; whoever holds the last dash longer wins the game.",
    breakdown:"Identical kits make charm discipline everything: dodge hers behind minions, throw yours off W-threat, and count both R dash banks before any commit.",
    dos:["Dodge her charm before throwing yours","Count both dash banks pre-fight","Heal-reset between trades off waves"],
    donts:["Trade orb-for-orb without charm threat","Spend the last dash going in","Charm-duel at her minion line"],
    win:"First charm wins the fight; last dash wins the war.",
    winS:"Her charm is down — step up and run the full combo."
  },
  winS:"His engage is spent — charm the retreat and collect.",
  tradeGood:"Q through his last-hit so both hits land, W if he eats the return, and walk — repeat until the charm window is lethal instead of optimistic.",
  tradeBad:"Charming on cooldown for chip damage and then facing his real engage with nothing — the charm is the matchup, not the poke.",
  waveBest:"a Q-cleared slow push that crashes on your roam timer — your R makes you the safest roaming mage in the pool.",
  waveWorst:"a frozen wave near his tower with R down pre-6 — Ahri without dashes is just a mage with a heal and a reputation.",
  early:"Trade orbs and bank heals — your pre-6 is honest and your 6 is not. Reach it healthy and the lane re-prices.",
  mid:"Malignance onward you hunt: shove, dash-flank the river, and charm whoever fronts the skirmish. One charm per fight is one kill per fight.",
  late:"You are the pick and the cleanup: flank-charm the carry, orb the convergence, and dash out through the chaos you started.",
  safetyTool:"R Spirit Rush (last dash)",
  spikesLine:"Level 6 triples your angles; Malignance puts R on a skirmish timer; Shadowflame makes the charm combo lethal alone.",
  carryLine:"Carry through picks — a landed charm is a won fight, and your dashes manufacture charm angles no one wards against.",
  behindShort:"farm with Q clears and stay relevant through charm picks.",
  loadingRule:"Hold charm for engages — never spend it as poke.",
  dontDetail:"The last dash is your life insurance — an Ahri who spends all three going in is an assassin's favorite story.",
  aheadTpl:"Ahead, hunt the map: shove with Q, dash-flank every river, and charm-pick {E}'s teammates until the lane lead is a game lead.",
  behindTpl:"Behind, play the safe pick you are: Q-farm, heal off waves, hold charm for dives — Ahri from behind still wins games with one flank charm.",
  spikeName:"Malignance",
  runeReport:"Electrocute, Cheap Shot, Eyeball Collection, Ultimate Hunter; secondary Sorcery — Manaflow + Transcendence. Electrocute pays the charm combo instantly.",
  summReport:"Flash + Ignite into killable lanes, Flash + TP into scaling ones — your R already covers half of Flash's job description.",
  itemReport:"Start Doran's Ring + 2 pots. Malignance into Sorcerer's, then Shadowflame and Rabadon's. Zhonya's vs dive comps.",
  jungleLine:"Charm-on-arrival makes any gank a kill, and your R follows the Flash they burn — ping your jungler at 6; Ahri ganks convert at the highest rate in mid.",
  redditLine:"both Q hits or no Q, charm engages not health bars, and save the last dash — Ahri is the safest blind pick in the game for exactly these three rules.",
  load:{
    sub:"r/AhriMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — the orb goes infinite",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Malignance",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Malignance + Shadowflame — every dash window is a full charm-kill combo.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Cheap Shot","Eyeball Collection","Ultimate Hunter"], tree:"Sorcery", secondary:["Manaflow Band","Transcendence"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall eats orb AND charm — bait it with a half-range Q, then charm his dash-chain only while the wall is down.",
      dos:["Bait the wall before any real combo","Charm him mid dash-chain","Keep the wave between you pre-6"] },
    katarina:{ tldr:"Charm interrupts everything she does — hold it for the Shunpo and her resets become donations.",
      dos:["Charm her Shunpo arrival, every time","Q the dagger she has to walk to","R away from Death Lotus, then charm it"] },
    malzahar:{ tldr:"His shield eats your charm and his R doesn't care about your dashes — poke the shield off before every trade and hold one dash for the suppression follow-up." }
  }
},

// ============================== ANNIE ==============================
{
  key:'annie', name:'Annie',
  curve:[0.2,0.2,0.3,0.3,0.7,0.4,0.2],
  lvl:[
    "Q last-hits refund mana on kill — farm with it for free and let the stun counter tick where he can see it.",
    "W joins the stack engine: the cone clears and counts. A stocked stun at level 2 already makes him flinch.",
    "E shield completes the loop: stack the passive on your own shield safely. Trade only with the stun loaded.",
    "Hold the four-stack glow and watch him orbit at max range — a stocked Annie controls the lane by standing there.",
    "Tibbers online — Flash-R-W-Q deletes most mids from full health. The lane is now a geometry problem about your Flash range.",
    "Luden's/Stormsurge spike: the stun-burst math kills through Doran's defenses. Stock, walk forward, win.",
    "Late Annie flips fights with one button: flash-Tibbers the clump, peel with the bear, and re-stock off the chaos."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'EVEN', fighter:'TRICKY' },
  diffEx:{ katarina:'FAVOURED',
    yasuo:'TRICKY', yone:'TRICKY', irelia:'TRICKY', fizz:'TRICKY', zed:'TRICKY', leblanc:'TRICKY', galio:'TRICKY', pantheon:'TRICKY',
    syndra:'TRICKY', xerath:'TRICKY', ziggs:'TRICKY', viktor:'TRICKY', orianna:'TRICKY', azir:'TRICKY', cassiopeia:'TRICKY', hwei:'TRICKY', malzahar:'TRICKY', karma:'TRICKY',
    kassadin:'EVEN', akali:'EVEN', lux:'EVEN', anivia:'EVEN', vladimir:'EVEN', taliyah:'EVEN', swain:'EVEN', ryze:'EVEN', twistedfate:'EVEN', veigar:'EVEN', vex:'EVEN', zoe:'EVEN', brand:'EVEN', neeko:'EVEN', mel:'EVEN', aurora:'EVEN', lissandra:'EVEN', ekko:'EVEN', diana:'EVEN', qiyana:'EVEN', talon:'EVEN', naafiri:'EVEN', sylas:'EVEN' },
  vs:{
    control:{
      tldr:"He out-ranges you — but a stocked stun makes every step into your Flash radius a coin he can't afford to flip.",
      breakdown:"Concede the long-range poke war and play the threat game: farm with Q refunds, hold four stacks visibly, and let the Flash-Tibbers radius zone him better than spells could. One overstep per game is all the lane needs.",
      dos:["Farm Q refunds and stack quietly","Hold the four-stack glow as zone control","Flash-R the one overstep he donates"],
      donts:["Trade into his range with stacks down","Burn the stun on poke he can answer","Walk up unstacked to contest CS"],
      win:"Survive the range war with a loaded gun and collect the one mistake it was built for."
    },
    burst:{
      tldr:"A burst duel where your combo is point-and-click — stock the stun and his setup-spell dependency becomes the whole gap.",
      breakdown:"His combo needs a landed skillshot; yours needs a walk forward. Trade only at four stacks, open with the stun so the full rotation is guaranteed, and E-shield his answer. The math is rude and it's yours.",
      dos:["Open every trade with the stocked stun","E-shield his combo before it lands","Re-stock instantly off the wave after trading"],
      donts:["Trade at three stacks like they're four","Eat his poke during your stack rebuild","Hold Tibbers for a 'better' fight that isn't coming"],
      win:"Stun first, burst second — point-and-click beats skillshot-dependent every even trade."
    },
    assassin:{
      tldr:"He has to dive a stocked stun and a bear — the assassination math fails as long as the counter glows.",
      breakdown:"Your E shield plus stocked stun makes you the worst dive target in the burst class: he commits, gets stunned, meets Tibbers. The discipline is keeping four stacks BANKED whenever he's visible — an unstacked Annie is the snack version.",
      dos:["Keep four stacks banked while he's alive","E-shield the engage, stun the arrival","Drop Tibbers ON yourself when dove"],
      donts:["Spend the stun on wave-clear near his timers","Shove past river unstacked","Chase resets past your bear"],
      win:"Make every dive meet a stun and a bear — then walk forward and return the favor."
    },
    fighter:{
      tldr:"He runs at a point-and-click stun — the run costs him the fight if your counter is glowing.",
      breakdown:"Fighters break even trades with sustain and reach, so don't trade — punish: stun the engage, W-Q the locked target, and shield the answer. Tibbers peels the extended fight you should never be in.",
      dos:["Stun the engage, not the poke window","Shield-trade only at four stacks","Tibbers between you and the run-down"],
      donts:["Extended-trade inside his reach","Walk to lane unstacked after resets","Spend Flash while the stun could answer"],
      win:"Make the run-down cost a stun-burst every time and the runner stops running."
    }
  },
  mirror:{
    tldr:"Bear mirror — whoever stocks first zones first, and whoever Flash-Tibbers second wins the fight that matters.",
    breakdown:"Identical point-and-click kits make stack state the whole lane: track her counter like a health bar, trade only with yours ahead, and hold Tibbers for hers.",
    dos:["Track her stack counter constantly","Trade only stack-advantaged","Tibbers second in the standoff"],
    donts:["Walk up at three to her four","Burn E before her stun shows","Flash-R into a shielded Annie"],
    win:"Stay one stack ahead and one bear behind — the patient pyromaniac wins.",
    winS:"Her stun is spent — walk forward and trade for free."
  },
  winS:"His engage is spent — stun-burst the retreat.",
  tradeGood:"At four stacks: walk forward, Q-stun, W, auto, walk away re-stacking off the wave — a guaranteed chunk he answered with nothing.",
  tradeBad:"Spending the stocked stun on wave-clear with his engage loaded — unstacked Annie is the most killable mage in the lane.",
  waveBest:"a Q-refund farmed wave you never push past river — your kill threat is Flash radius, not wave state.",
  waveWorst:"a shoved wave with zero stacks and Tibbers down — every assassin timer in the game points at that picture.",
  early:"Farm refunds, stack quietly, and hold the glow — pre-6 Annie wins by threat, not action. The lane is a hostage negotiation.",
  mid:"Post-6 every fight inside Flash range is yours to start: stock, hover the river, and Flash-Tibbers the first clump that forgets you exist.",
  late:"You are one button from a won fight all game: flash-R the carry pair, peel with the bear, stun the second wave. Stack management IS positioning.",
  safetyTool:"E Molten Shield",
  spikesLine:"Level 6 + Flash is the kill threat; Luden's/Stormsurge makes it lethal from full; Rabadon's makes Tibbers a war crime.",
  carryLine:"Carry through the one button — Flash-Tibbers on two is a won fight; your whole game is engineering the radius.",
  behindShort:"farm with Q refunds and stay relevant through stocked-stun threat.",
  loadingRule:"Trade only at four stacks — the glow is the matchup.",
  dontDetail:"Your shield stacks the passive safely — burning E for damage instead of stack tempo is how Annies arrive at fights unstunned.",
  aheadTpl:"Ahead, shrink the lane: hold the glow, zone {E} off CS by existing, and Flash-Tibbers the recovery attempt — fed Annie ends games at 20.",
  behindTpl:"Behind, the button still works: farm refunds, stack, and hold Flash-R for their carry — one bear on the right target resets any scoreline.",
  spikeName:"Stormsurge",
  runeReport:"Electrocute, Cheap Shot, Eyeball Collection, Ultimate Hunter; secondary Sorcery — Manaflow + Scorch. Electrocute completes the one-shot math.",
  summReport:"Flash + Ignite — Flash IS your engage range and Ignite signs the Tibbers math. TP only into lanes you can't fight.",
  itemReport:"Start Doran's Ring + 2 pots. Luden's or Stormsurge into Sorcerer's, then Shadowflame and Rabadon's. Zhonya's vs dive — cast it mid-Tibbers.",
  jungleLine:"A stocked stun is the easiest gank setup in League — point, click, kill. Ping your jungler whenever the glow is up and {E} is past river.",
  redditLine:"four stacks or don't bother, Flash radius is your range stat, and Tibbers the clump not the tank — Annie wins by making one button count.",
  load:{
    sub:"r/AnnieMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — refunds become a war chest",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Stormsurge / Luden's",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Stormsurge + Shadowflame — Flash-Tibbers deletes carries from full health.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Cheap Shot","Eyeball Collection","Ultimate Hunter"], tree:"Sorcery", secondary:["Manaflow Band","Scorch"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    katarina:{ tldr:"Point-and-click stun versus a channel-dependent blender — stun the Shunpo, Tibbers the Lotus, and she never finishes a combo all game.",
      dos:["Hold the stun for her Shunpo","Tibbers her Death Lotus instantly","Stand off her dagger landing spots"] },
    yasuo:{ tldr:"Wind Wall can't block point-and-click — but his dashes dodge your stun timing. Stun the dash ARRIVAL, not the wind-up, and shield his tornado window." },
    malzahar:{ tldr:"His shield eats your stun and ruins the whole combo — poke the shield off with W cone before any real trade, and never walk up with his R live." }
  }
},

// ============================== AURORA ==============================
{
  key:'aurora', name:'Aurora',
  curve:[0.2,0.2,0.3,0.3,0.4,0.4,0.2],
  lvl:[
    "Q-poke and recast on his last-hits — the spirit-mark detonation chips harder than the lane expects.",
    "W online: the hop + brief stealth is your trade exit and your gank insurance in one button.",
    "E completes the trade loop: the knockback-slow into Q-recast is your bread-and-butter chunk.",
    "Lost Chapter timing — three-spell spirit stacks proc your passive haste; trade in full patterns now.",
    "Between Worlds online — the zone re-prices every fight: enemies inside feed you speed and exits.",
    "Luden's spike: the full Q-E-Q rotation chunks half bars. Force trades on his cooldown gaps.",
    "Late Aurora warps teamfight space: drop R on the objective clump and hop through the panic."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'TRICKY', fighter:'TRICKY' },
  diffEx:{ yasuo:'HARD', fizz:'HARD', irelia:'HARD', pantheon:'HARD',
    yone:'TRICKY', zed:'TRICKY', katarina:'TRICKY', akali:'TRICKY', leblanc:'TRICKY', syndra:'TRICKY', xerath:'TRICKY', vex:'TRICKY', galio:'TRICKY', cassiopeia:'TRICKY',
    kassadin:'EVEN', ziggs:'EVEN', lux:'EVEN', malzahar:'EVEN', viktor:'EVEN', orianna:'EVEN', anivia:'EVEN', azir:'EVEN', vladimir:'EVEN', taliyah:'EVEN', hwei:'EVEN', swain:'EVEN', ryze:'EVEN', twistedfate:'EVEN', veigar:'EVEN', annie:'EVEN', ahri:'EVEN', zoe:'EVEN', brand:'EVEN', neeko:'EVEN', karma:'EVEN', mel:'EVEN', lissandra:'EVEN' },
  vs:{
    control:{
      tldr:"An even spell war you tilt with mobility — trade the full Q-E-Q pattern and hop out before his answer lands.",
      breakdown:"Your patterns trade evenly with his; your W exit doesn't. Take the three-spell trade, hop the answer, and bank the passive haste. Track {K} so the hop is a choice, not a panic.",
      dos:["Trade full Q-E-Q patterns, then hop","Bank spirit-stack haste before commits","Dodge his key line during your recast window"],
      donts:["Hop in aggressively with his answer loaded","Poke without the recast planned","Stand in his rotation during E cooldown"],
      win:"Trade even and exit free — the hop turns fair exchanges into profitable ones."
    },
    burst:{
      tldr:"His combo wants a stationary target — your whole kit is an argument against standing still.",
      breakdown:"Dodge his setup spell with the W hop held as the counter, not the opener. Punish the whiff with the full pattern, and post-6 drag exchanges into your R zone where his burst math meets your speed math.",
      dos:["Hold W for his setup spell","Punish whiffs with the full pattern","Fight inside your R zone post-6"],
      donts:["Hop forward while his combo is loaded","Trade at his optimal range","Burn the stealth on tempo"],
      win:"Make the setup miss, pattern the gap, and out-speed every fight inside your zone."
    },
    assassin:{
      tldr:"He dives a champion who hops, stealths, and exits through her own ult — slippery, but only if the W stays banked.",
      breakdown:"The hop answers his engage exactly once per cooldown: spend it on the real dive, keep the wave centered, and post-6 fight near your R drop so the exit portal exists. His roams are the real cost — shove and ping relentlessly.",
      dos:["Bank W exclusively for his engage","Fight near your R zone's exit edge","Crash waves and ping his roams"],
      donts:["Hop for poke spacing — ever, here","Shove past river with W down","Greed the recast at half HP"],
      win:"Hop the dive, exit the zone, and tax his failed timers with poke he can't return."
    },
    fighter:{
      tldr:"He fights through your patterns if they ever stop moving — E the engage, hop the gap, and keep the trade rented.",
      breakdown:"The E knockback-slow is your anti-engage and your trade-starter in one: throw it on his commit, Q-recast the slowed body, and hop before the second wind. Never spend W and E in the same exchange unless it ends the fight.",
      dos:["E his engage, Q-recast the slow","Keep one of W/E banked at all times","Kite through your R zone in all-ins"],
      donts:["Trade extended inside his reach","Spend both escapes in one exchange","Fight outside the zone post-6 if it's down"],
      win:"Knock back the engage, pattern the slow, and out-speed the fight your zone hosts."
    }
  },
  mirror:{
    tldr:"Spirit mirror — pattern discipline and hop timing; whoever holds W longer wins the exchange that decides the lane.",
    breakdown:"Identical kits reward the counter-puncher: dodge her Q line, answer with your full pattern, and hop second — the first hop is information, the second is an exit.",
    dos:["Hop second in every exchange","Punish her recast window","Fight inside your zone, not hers"],
    donts:["Mirror her pattern timing","Spend W on her poke","Overlap R zones — yours loses value"],
    win:"Counter-pattern and out-hop — patience wins the spirit war.",
    winS:"Her hop is down — commit the full pattern free."
  },
  winS:"His engage is spent — full pattern, free exit.",
  tradeGood:"Q the last-hit, E the step-up, Q-recast the slowed target, hop out — a full pattern he answered with a whiff.",
  tradeBad:"Hopping IN with W and trading while his engage is still loaded — the exit spent as an entrance is how Auroras get coached postmortem.",
  waveBest:"a Q-recast cleared push that crashes on your trade timers — your patterns farm and poke in the same cast.",
  waveWorst:"a frozen wave near his tower with W down — hop-less Aurora is a skinny mage with a haste passive and regrets.",
  early:"Trade patterns and exits — your early is honest plus an escape hatch. Bank the haste and the lane stays yours to pace.",
  mid:"Post-6, fight where you dropped the zone: the speed differential turns even skirmishes into chases you win both directions.",
  late:"You warp the fight: R the clump, hop through the middle, and pattern whoever the zone slows. The exit portal is your insurance.",
  safetyTool:"W Across the Veil",
  spikesLine:"Full kit at 3 sets the pattern; level 6 adds the zone; Luden's makes the rotation half a bar.",
  carryLine:"Carry through tempo — patterns that exit free compound; your zone turns objective fights into speed checks they fail.",
  behindShort:"farm with Q recasts and stay relevant through zone utility.",
  loadingRule:"Hold the hop for his engage — the exit is the matchup.",
  dontDetail:"W spent as an entrance is W unavailable as an exit — the whole kit's promise breaks on that one greed.",
  aheadTpl:"Ahead, pace the lane: pattern {E} off every contact, hop his answers, and drop R on each river fight — the zone converts leads into routs.",
  behindTpl:"Behind, pattern from safety: Q-recast farm, bank W for dives, and re-enter through zone fights your speed still wins.",
  spikeName:"Luden's",
  runeReport:"Electrocute or Summon Aery, Cheap Shot, Eyeball Collection, Ultimate Hunter; secondary Sorcery — Manaflow + Transcendence.",
  summReport:"Flash + Ignite into killable lanes; Flash + TP when the matchup is survival. The hop covers half your Flash jobs already.",
  itemReport:"Start Doran's Ring + 2 pots. Luden's into Sorcerer's, then Shadowflame and Rabadon's. Zhonya's vs dive.",
  jungleLine:"Your E knockback-slow is clean gank setup and the R zone traps the runback — ping your jungler post-6; zone fights are free wins.",
  redditLine:"pattern in, hop out, and drop the zone where the fight already is — Aurora wins by renting space the enemy thought was theirs.",
  load:{
    sub:"r/AuroraMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — patterns go sustainable",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Luden's Companion",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Luden's + Shadowflame — the Q-E-Q pattern becomes half a health bar.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Cheap Shot","Eyeball Collection","Ultimate Hunter"], tree:"Sorcery", secondary:["Manaflow Band","Transcendence"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall eats your Q both directions and his dashes outpace your patterns — E his dash-chain and trade only behind the wall's cooldown.",
      dos:["E the dash-chain mid-flight","Q only while Wind Wall is down","Hop his EQ3 wind-up, not his poke"] },
    fizz:{ tldr:"His E dodges your full pattern and his dive ignores the knockback — the W hop is your only honest answer; bank it like rent and hug tower post-6." },
    vex:{ tldr:"Your hop feeds her passive fear — pattern WITHOUT the W when her glow is up, and hop only after the fear is spent." }
  }
},

// ============================== BRAND ==============================
{
  key:'brand', name:'Brand',
  curve:[0.2,0.3,0.4,0.3,0.4,0.5,0.2],
  lvl:[
    "W-poke his last-hits from max range — the pillar chunks early and the lane learns to flinch by level 2.",
    "E joins: the point-and-click ablaze into Q-stun threat is already a kill pattern with jungle help.",
    "Full kit: E-Q stun into W is half a health bar at level 3. He respects every cast from here or pays.",
    "Lost Chapter timing — rotation poke on every wave contact. Blaze stacks make even chip trades unfair.",
    "Pyroclasm online — any clumped trade is now a detonation chain. Lane all-ins favor the arsonist.",
    "Liandry's spike: the burn makes every rotation percent-health math. Force extended exchanges.",
    "Late Brand is a teamfight detonator: spread Blaze, R the clump, and watch three health bars argue with physics."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'HARD', fighter:'HARD' },
  diffEx:{ vladimir:'FAVOURED', swain:'FAVOURED',
    kassadin:'EVEN', neeko:'EVEN', lux:'EVEN', ziggs:'EVEN', viktor:'EVEN', orianna:'EVEN', anivia:'EVEN', taliyah:'EVEN', malzahar:'EVEN', ryze:'EVEN', twistedfate:'EVEN', veigar:'EVEN', annie:'EVEN', hwei:'EVEN', lissandra:'EVEN',
    xerath:'TRICKY', syndra:'TRICKY', ahri:'TRICKY', zoe:'TRICKY', azir:'TRICKY', cassiopeia:'TRICKY', galio:'TRICKY', vex:'TRICKY', karma:'TRICKY', mel:'TRICKY', aurora:'TRICKY' },
  vs:{
    control:{
      tldr:"Your rotation out-damages his at every overlap range — trade spell-for-spell and let the burn math win the ledger.",
      breakdown:"W his last-hits, E-ablaze his step-ups, and save Q strictly for the stun window. He wins range skirmishes only if you cast predictably — vary the opener and the Blaze stacks decide every extended exchange.",
      dos:["W his last-hit position on cooldown","E-ablaze before any real trade","Hold Q strictly for the ablaze stun"],
      donts:["Q-poke unablazed targets","Eat his poke during your cooldown gaps","Spend the full rotation on a full-HP tank... mage"],
      win:"Out-burn the spell war and stun the answer — the ledger always reads Blaze."
    },
    burst:{
      tldr:"His combo is front-loaded, yours keeps ticking — survive the opener and the DoT math finishes the argument.",
      breakdown:"Trade rotations only when his setup spell is down, open with E so the Q stun is threatened from the first second, and remember your damage keeps running after the trade ends. Even exchanges are wins on the walk-away burn.",
      dos:["Open trades with E for instant ablaze","Threaten Q-stun through every exchange","Walk away and let the DoT finish even trades"],
      donts:["Trade into his loaded setup spell","Burn Q early without the ablaze","Stand mid-range at half HP — that's his font"],
      win:"Survive the front-load, stun the follow-up, and let the burn outlast his arithmetic."
    },
    assassin:{
      tldr:"You are flammable AND immobile — the lane is a survival course where your only weapon is making the dive cost a stun-burst.",
      breakdown:"Keep the wave centered, hold E-Q as the anti-dive package (instant ablaze into stun), and accept that even lanes are wins here. Your R peels: the bounce prioritizes and punishes the assassin who dove into your minions.",
      dos:["Hold E-Q strictly as the dive answer","Keep the wave centered and flanks warded","R the dive — the bounces peel for you"],
      donts:["Spend E on poke near his timers","Shove past river post-6","Greed the third W when his engage is up"],
      win:"Stun-burn the dive, tax the roams with shove, and out-scale his patience."
    },
    fighter:{
      tldr:"He walks through poke that doesn't stun — so every real trade starts with E and threatens Q; make the walk expensive.",
      breakdown:"Dash-fighters punish your immobility, so poke in packages: E-ablaze, Q-stun threat, W the committed path. Never poke with W alone when his engage is loaded — the pillar is your damage, the stun is your life.",
      dos:["Package every trade as E-Q threat first","W the path his engage must cross","Pillar the wave to deny engage angles"],
      donts:["Poke W-only with his engage up","Trade extended inside his reach","Waste the stun on a shielded window"],
      win:"Stun the engage, pillar the path, and burn the fighter who keeps paying the toll."
    }
  },
  mirror:{
    tldr:"Arson mirror — whoever lands the first ablaze-stun runs the trade; whoever clumps at 6 loses the fight.",
    breakdown:"Identical burn math makes the stun war everything: dodge his Q line after eating any spell, land yours off E's instant ablaze, and never stand near your own minions when his R flies.",
    dos:["Dodge his Q-line while ablaze","E-Q first in every real trade","Spread from minions at his 6"],
    donts:["Trade W-for-W into his stun window","Stack Blaze on yourself chasing trades","R a lone target — yours bounces too"],
    win:"First stun wins the trade, better spacing wins the detonation war.",
    winS:"His stun is down — rotate freely through him."
  },
  winS:"His engage is spent — E-Q the retreat and burn it down.",
  tradeGood:"E the instant ablaze, Q the stun, W the stunned body, walk — the full package chunks half a bar and the burn writes the receipt.",
  tradeBad:"W-poking on cooldown with Q unbanked while his engage is loaded — Brand without the stun threat is a bonfire waiting for company.",
  waveBest:"a W-E cleared push that crashes on your rotation timer — your AoE shove is elite and the poke rides along free.",
  waveWorst:"a frozen wave near his tower with E-Q down — the immobile arsonist walking up to farm is mid lane's favorite obituary.",
  early:"Open the burn ledger at one: W the last-hits, E-Q the step-ups, and make level 3 the lane's scariest timer.",
  mid:"Liandry's onward, force the extended exchanges: every rotation is percent-health math and every river clump is a Pyroclasm invoice.",
  late:"You are the detonator: spread Blaze with E-W, R the clump, and watch the bounces win the objective fight your team merely attended.",
  safetyTool:"E-Q stun package",
  spikesLine:"Level 3 E-Q is the first kill pattern; level 6 punishes clumps; Liandry's turns rotations into percent-health verdicts.",
  carryLine:"Carry through AoE math — no burst mage damages three targets like Brand; your job is the spacing that lets the bounces vote.",
  behindShort:"farm with W-E clears and stay relevant through stun-burn peel.",
  loadingRule:"Ablaze before the stun — E-Q is the package, Q alone is a prayer.",
  dontDetail:"Your stun only exists on ablaze targets — a Q thrown at a clean health bar is the most expensive miss in your kit.",
  aheadTpl:"Ahead, scorch the map: rotation-poke {E} off every wave, stun the answers, and R every river clump — fed Brand turns skirmishes into actuarial tables.",
  behindTpl:"Behind, burn from range: W-E farm safely, hold the stun package for dives, and re-enter through the teamfight AoE your kit never stopped owning.",
  spikeName:"Liandry's",
  runeReport:"Arcane Comet or Electrocute, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight. Comet rides every DoT tick.",
  summReport:"Flash + Teleport standard; Ignite into squishy lanes where the level-3 package plus burn already threatens lethal.",
  itemReport:"Start Doran's Ring + 2 pots. Liandry's into Sorcerer's, then Rylai's or Shadowflame, Rabadon's after. Zhonya's vs dive comps.",
  jungleLine:"E-Q on arrival is instant setup — ablaze, stun, done. Your R turns any 2v2 river fight into a bounce lottery you rigged.",
  redditLine:"E before Q always, poke in packages not prayers, and R the clump — Brand wins lanes with one stun and teamfights with three health bars.",
  load:{
    sub:"r/BrandMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — rotations go sustainable",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Liandry's Torment",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Liandry's + Shadowflame — every rotation is percent-health math with a stun attached.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall eats Q, W's cast is dodgeable, and his dashes laugh at your immobility — E is your only wall-proof spell; package trades around it and pillar his dash lane.",
      dos:["Open with E — the wall can't block it","Pillar his dash-chain lane","Stun the EQ3 wind-up, not the poke"] },
    vladimir:{ tldr:"Your passive burns percent-MAX-health — the anti-Vlad clause. Poke him off every CS; his pool dodges one spell of a three-spell rotation.",
      dos:["Rotate THROUGH his pool timing","Stack Blaze before his trade windows","Stun the post-pool surfacing"] },
    kassadin:{ tldr:"Bully the melee mage off every CS pre-6 — but your whole kit is projectiles his shield eats; lead with W placement, not Q hope." }
  }
}
];

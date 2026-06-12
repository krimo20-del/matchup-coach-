// MatchupCoach — generator configs batch 2: Mel, Lucian, Lillia, Kassadin.
window.GEN_CFGS_2 = [

// ============================== MEL ==============================
{
  key:'mel', name:'Mel',
  curve:[0.7,0.5,0.5,0.5,0.5,0.5,0],
  lvl:[
    "Q volleys win every level-1 range war — fan them across his last-hit positions and stack Overwhelm early.",
    "W Rebuttal online — the reflect turns his poke into your poke. Hold it for his real spell, not for chip.",
    "Full kit: E snare into full Q volleys is your core chunk. Snare through the wave where he must stand to farm.",
    "Stack Overwhelm with every hit — once he's marked deep, your execute math starts working. Track {K} before stepping up.",
    "Golden Eclipse online — anyone you've stacked is now walking around with a countdown. Chip, stack, execute.",
    "Blackfire Torch spike — your volleys burn through sustain and your snare-volley rotation chunks half bars.",
    "Two items in, you're an execute platform: stack in teamfights and R the moment the bar fills. Watch your flanks."
  ],
  diffBase:{ jugg:'FAVOURED', diver:'HARD', tank:'FAVOURED', ranged:'EVEN' },
  diffEx:{ darius:'FAVOURED', garen:'EVEN', urgot:'EVEN', gragas:'EVEN', warwick:'EVEN', vayne:'EVEN', tryndamere:'TRICKY',
    gwen:'TRICKY', riven:'TRICKY', yasuo:'HARD', irelia:'HARD', ambessa:'HARD', akali:'HARD', sylas:'HARD',
    zac:'TRICKY', ksante:'EVEN', poppy:'EVEN', nautilus:'EVEN', maokai:'EVEN', kassadin:'FAVOURED',
    heimerdinger:'EVEN', cassiopeia:'TRICKY', lucian:'TRICKY', graves:'TRICKY', akshan:'TRICKY', quinn:'TRICKY', galio:'TRICKY' },
  vs:{
    jugg:{
      tldr:"He can't reach you and you reflect what he throws — stack Overwhelm on every step-up and execute at 6.",
      breakdown:"Fan Q volleys across his farming positions and let Overwhelm stacks build the execute. Hold W for {K} — no-selling his one engage tool resets the lane in your favour every time.",
      dos:["Fan Q across his last-hit positions","Hold W Rebuttal for {K}","Snare the step-up, then unload full volleys"],
      donts:["Stand inside {K} range with W down","Burn the reflect on minion-wave chip","Let him freeze and force you to overextend"],
      win:"Stack, snare, and execute — he never gets to play."
    },
    diver:{
      tldr:"His dash goes through your reflect — snare the landing spot and save W for the burst, not the engage.",
      breakdown:"Rebuttal doesn't stop a body landing on you, so spend it on the damage that follows. Snare {K}'s landing point, kite with the MS from W, and accept farming safe when his kit is loaded.",
      dos:["Snare the landing spot of {K}","Spend W on his burst, not his dash","Kite with the W move speed out of his reach"],
      donts:["Reflex-W his gap-closer","Trade inside his effective range with E down","Greed stacks when his all-in is loaded"],
      win:"Survive the dive windows and execute him in the gaps."
    },
    tank:{
      tldr:"Free stacking lane — every Q volley builds your execute while he farms politely.",
      breakdown:"He has no kill threat, so play the long con: chip, stack Overwhelm, take plates, and rotate your snare to river fights. Your R eventually executes even tanks through their items.",
      dos:["Stack Overwhelm on every trade","Take plates while he plays safe","Rotate E + R to river skirmishes"],
      donts:["Force full rotations into full-HP tank stats","Eat {K} for free in a won lane","Sit top when your execute wins fights elsewhere"],
      win:"Stack him into execute range and own the tempo."
    },
    ranged:{
      tldr:"Poke mirror you usually win — your reflect makes his best spell a liability.",
      breakdown:"Trade volleys and keep W loaded: the first time he commits {K}, return it to sender and counter-trade with the full rotation. Overwhelm math means even trades still build your execute.",
      dos:["Trade Q volleys at max fan width","Reflect {K} back the moment he commits","Snare his sidestep lanes behind minions"],
      donts:["Eat poke with W on cooldown","Snare in the open without minion cover","Forget your R execute math below 30%"],
      win:"Reflect the poke war in your favour and execute the chip."
    }
  },
  mirror:{
    tldr:"Reflect mirror — never throw a real spell into a glowing Rebuttal; whoever baits better wins.",
    breakdown:"Both of you carry a mirror. Bait her W with an empty volley, then commit the snare-volley rotation while hers is down. The first one to stack deep wins the execute race.",
    dos:["Bait her W with cheap volleys","Commit only while her reflect is down","Win the Overwhelm stacking race"],
    donts:["Poke into the glow","Burn W early","Lose the stack ledger"],
    win:"Bait the reflect, win the stacking race.",
    winS:"Her Rebuttal is down — your volleys land clean."
  },
  winS:"His answer is spent — snare and unload.",
  tradeGood:"Snare through the wave onto his farming spot, fan two full Q volleys while he's locked, and step back with W ready before his answer comes off cooldown.",
  tradeBad:"Burning Rebuttal on chip damage and then standing in {K} range — your only defensive layer is gone for twenty seconds.",
  waveBest:"a slow push you tax from max range — he farms inside your snare line and your stacks build toward the execute.",
  waveWorst:"frozen near his tower while {K} is up — you stack nothing and risk everything for each CS.",
  early:"Win the range war from minute one: Q volleys on every last-hit, W held for his one real spell, snare only behind minion cover.",
  mid:"At 6 the lane becomes an execute countdown — keep stacking, keep him under 60%, and R the moment the math turns lethal. Rotate the snare to river fights.",
  late:"Teamfight as the back-line metronome: volley the frontline, reflect the scariest projectile, and bank R for the execute sweep when their HP bars dip.",
  safetyTool:"W Rebuttal",
  spikesLine:"Level 6 Golden Eclipse and Blackfire Torch are the spikes — chip damage becomes kill pressure at both.",
  carryLine:"Carry through executes — a stacked teamfight R can sweep two or three kills the moment the bars dip.",
  behindShort:"farm at max range, keep stacking, and let the execute math carry you back.",
  loadingRule:"Hold the reflect for his real spell.",
  dontDetail:"Rebuttal is your only defensive layer — spending it on chip leaves you naked to the real engage.",
  aheadTpl:"Ahead, turn the screws: shove with volleys, zone {E} off CS with the snare threat, and roam with R ready — a stacked execute travels well.",
  behindTpl:"Behind, stay on the stacking plan — farm at max range, reflect the kill attempts, and remember your R math doesn't care about his gold lead.",
  spikeName:"Blackfire Torch",
  runeReport:"Arcane Comet, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight. Comet plus the snare is free poke all lane.",
  summReport:"Flash + Teleport standard — TP covers the juggernaut sustain lanes; Ignite only when you want level-2 execute cheese.",
  itemReport:"Start Doran's Ring + 2 pots. First: Blackfire Torch into Sorcerer's Shoes; then Shadowflame and Rabadon's. Zhonya's into dive comps.",
  jungleLine:"Your E snare is gank setup from two screens away — land it as your jungler enters and the kill is bookkeeping. You have no dash, so ward the river deep.",
  redditLine:"fan the volleys, save Rebuttal for the spell that matters, and stack Overwhelm like a ledger — Mel top is an execute countdown, not a duel.",
  load:{
    sub:"r/MelMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — the mana war is won here",
    antihealBack:"Oblivion Orb (≈800g) — cuts his healing",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Blackfire Torch",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Rabadon's third — the execute bar fills twice as fast.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall and your Rebuttal cancel out — the real fight is his dash chain vs your snare; never volley into the wall." },
    jayce:{ tldr:"His whole kit is projectiles and yours reflects — return one Shock Blast to his face and he stops playing." },
    kassadin:{ tldr:"Shieldless melee mage pre-6 — stack him off every CS and have the execute ready before Riftwalk matters." }
  }
},

// ============================== LUCIAN ==============================
{
  key:'lucian', name:'Lucian',
  curve:[1,0.8,0.8,0.6,0.4,0.5,-0.6],
  lvl:[
    "Passive double-shots win level 1 outright — Q through the wave on his last-hits and weave doubletaps on every step-up.",
    "E online — dash-weave trades start now: spell, double-shot, dash out before his answer lands.",
    "Full kit: Q-AA-E-AA-W-AA strings chunk a third of his HP. Trade on every CS he takes from the wrong angle.",
    "Keep the pressure rolling but track {K} — your lead is HP-bar bullying, not all-in math, until items arrive.",
    "The Culling adds lane-clear and execute chip — use it through walls on recalls and low-HP escapes.",
    "First item spike is your kill window — the dash-weave combo now deletes half bars. Force the issue before he stabilizes.",
    "You fall off relative to top-lane scalers — convert the lead into towers and roams before the 3-item brawlers arrive."
  ],
  diffBase:{ jugg:'FAVOURED', diver:'EVEN', tank:'FAVOURED', ranged:'EVEN' },
  diffEx:{ garen:'EVEN', volibear:'EVEN', urgot:'EVEN', irelia:'TRICKY', jax:'HARD', yasuo:'TRICKY', yone:'TRICKY',
    fiora:'TRICKY', camille:'TRICKY', gwen:'TRICKY', olaf:'EVEN', warwick:'EVEN', malphite:'EVEN', ksante:'EVEN',
    poppy:'EVEN', shen:'TRICKY', tahmkench:'EVEN', nautilus:'EVEN', teemo:'TRICKY', kennen:'TRICKY',
    heimerdinger:'TRICKY', akali:'TRICKY', cassiopeia:'TRICKY', mel:'TRICKY', kayle:'FAVOURED', kassadin:'FAVOURED',
    sylas:'EVEN', vladimir:'EVEN', quinn:'EVEN' },
  vs:{
    jugg:{
      tldr:"Kite the brawler — double-shot every step-up and dash away from the one button that matters.",
      breakdown:"He needs one connection; you need him to never connect. Q through minions on his CS, weave passive autos relentlessly, and treat E as the answer to {K} — never as a damage tool while it's up.",
      dos:["Q through the wave onto his last-hits","Weave double-shots on every step-up","Keep E as the answer to {K}"],
      donts:["Burn E for damage while his engage is up","Trade inside his effective range on cooldown","Coast — your lead has a timer"],
      win:"Bully him off CS early and convert before you fall off."
    },
    diver:{
      tldr:"A skirmish on his terms is death — dash-weave short trades and never show him a locked E.",
      breakdown:"He's built to close the gap you live behind. Take the short string — Q-AA-E-AA — and end trades before his pattern starts. {K} is the lane: count it out loud if you have to.",
      dos:["Take short strings and exit before his combo","Count {K} before every trade","Use W's mark + MS to kite his approach"],
      donts:["Extend trades past two dashes","E toward him with his engage loaded","Fight his first-item spike head-on"],
      win:"Win the first ten minutes hard enough that his mid game never matters."
    },
    tank:{
      tldr:"Shred the stat wall — free pressure all lane, just don't let him cash one engage.",
      breakdown:"He can't trade back, so double-shot him off every CS and chip plates relentlessly. Your only loss condition is eating {K} with E down and donating a gank kill.",
      dos:["Harass every CS with double-shots","Take plates — your lead is towers, not kills","Dodge {K} with E held in reserve"],
      donts:["Sink full combos into tank stats for nothing","Stand in engage range with E down","Stay top once the tower falls — roam"],
      win:"Starve him, break the tower early, and export the lead."
    },
    ranged:{
      tldr:"Range war you win up close — dash-weave burst beats poke if you pick the moment.",
      breakdown:"He wants a long lane of chip; you want four seconds of violence. Slide in behind your Q-E weave when {K} is down, unload the string, and exit before his pattern resets.",
      dos:["Engage the string when {K} is down","Weave every auto between spells","Shove crash-waves and roam mid"],
      donts:["Trade poke at his preferred range","Burn E in, with nothing held to exit","Let him farm even — bully or bust"],
      win:"Pick the four-second windows and out-burst the poke war."
    }
  },
  mirror:{
    tldr:"Lightslinger mirror — whoever weaves cleaner strings and wastes fewer dashes wins.",
    breakdown:"Same kit, same windows. Bait his E with a half-string, then commit yours; the Lucian with E available when the other doesn't wins every exchange.",
    dos:["Bait his dash with half-strings","Commit only with E advantage","Win the level-2 race"],
    donts:["Mirror his trades with E down","Eat doubletaps at the wave for free","Coast on an early lead"],
    win:"Cleaner weaves, better dash discipline.",
    winS:"His dash is down — yours isn't. Unload."
  },
  winS:"No answer up — unload the full string.",
  tradeGood:"Q through the wave as he last-hits, step in for the passive doubletap, E sideways, doubletap again, and walk out before his trade pattern even starts.",
  tradeBad:"Dashing IN to start a trade with {K} still loaded — you've spent the exit, and everything he saved now lands on a stationary marksman.",
  waveBest:"a fast crash into his tower — he loses CS to the tower while you doubletap him, then you roam mid before it bounces.",
  waveWorst:"a freeze just outside his tower — you can't safely harass and one gank ends your tempo lead.",
  early:"This is your game: doubletap every step-up, win the level-2 race, and chip him below all-in HP before he finishes a single component.",
  mid:"Convert or fade — take the tower plates, roam mid with crash waves, and force the map to pay out your lane lead before the scalers come online.",
  late:"You're a second ADC now — play with the team, weave through fights, and burst the divers your carry can't shake. Your splitpush days ended at 25 minutes.",
  safetyTool:"E dash",
  spikesLine:"Levels 1-3 and your first item are the spikes — Lucian's whole game is cashing them before the opponent's curve catches up.",
  carryLine:"Carry by frontloading: a tower by 14 minutes and two roam kills is a won game even if you never duel again.",
  behindShort:"farm with Q through the wave and play for the doubletap windows — never coin-flip from behind.",
  loadingRule:"Short strings only — exit before his pattern starts.",
  dontDetail:"E is the exit, not the entrance — spending it to start a trade is how marksmen die top lane.",
  aheadTpl:"Ahead, sprint: plates, tower, roam mid, repeat. Zone {E} off the wave with doubletap threat and make the map pay before your relative falloff.",
  behindTpl:"Behind, shorten the game loop — farm safe with Q, take the doubletap windows that cost nothing, and roam with your crash waves. You still out-skirmish most tops at even items.",
  spikeName:"first item",
  runeReport:"Press the Attack, Triumph, Legend: Alacrity, Coup de Grace; secondary Resolve — Second Wind + Bone Plating into bullies. PTA pops inside one weave string.",
  summReport:"Flash + Teleport is the disciplined pick; Ignite turns the level 2-6 windows into hard kill pressure if you trust the lane.",
  itemReport:"Start Doran's Blade + pot. First: Kraken Slayer or Essence Reaver into Berserker's Greaves; then Navori / The Collector by lane state.",
  jungleLine:"Your burst makes any gank lethal pre-6 — ping in your jungler the moment {E} pushes past the midline. Ward deep; everyone paths at fallen-off Lucians.",
  redditLine:"weave every auto, treat E as the exit, and convert the early lead into towers — Lucian top is a 15-minute argument you must win.",
  load:{
    sub:"r/LucianMains",
    start:"Doran's Blade + 1 Health Potion",
    normalBack:"Pickaxe or Cull + boots (≈1100g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his healing",
    antihealNote:"Executioner's Calling early into his sustain.",
    firstItem:"Kraken Slayer / Essence Reaver",
    secondItem:"Navori Flickerblade / The Collector",
    boots:"Berserker's Greaves",
    bootsVsAP:"Berserker's Greaves / Mercury's Treads",
    bootsVsAD:"Berserker's Greaves / Plated Steelcaps",
    spike:"First full item — your dash-weave string starts deleting half bars.",
    runes:{ keystone:"Press the Attack", primaryTree:"Precision", primary:["Triumph","Legend: Alacrity","Coup de Grace"], tree:"Resolve", secondary:["Second Wind","Bone Plating"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    jax:{ tldr:"Counter Strike eats your whole string — autos are your kit and he dodges all of them. Trade only while his E is down, and respect the scaling cliff." },
    yasuo:{ tldr:"Wind Wall blocks Q, R, and every auto — bait it with a half-string, then burst in the twenty seconds it's gone." },
    shen:{ tldr:"His W spirit-blade blanks your autos — drag trades away from the blade zone or burn it with a fake string first." }
  }
},

// ============================== LILLIA ==============================
{
  key:'lillia', name:'Lillia',
  curve:[0.2,0.3,0.5,0.6,0.8,0.6,0.3],
  lvl:[
    "Q's outer ring on his last-hits plus the passive speed means he literally cannot touch you at level 1.",
    "W sweetspot threat starts — anyone chasing you eats the big hit while your Dream Dust burns their HP bar.",
    "Full kit: Q-kite in circles, E from fog for the slow, and the passive speed makes every trade yours to end.",
    "The lane is a treadmill he can't get off — Q every step-up, kite the {K} window, and bank Dream Dust burn.",
    "Lilting Lullaby online — your jungler's ganks are now guaranteed, and any overstep becomes a sleep-execute.",
    "Liandry's spike — Dream Dust plus the burn melts juggernauts and tanks alike while you jog circles around them.",
    "You're a teamfight nightmare now: sleep two, kite the rest, and let the burn do the bookkeeping."
  ],
  diffBase:{ jugg:'FAVOURED', diver:'TRICKY', tank:'FAVOURED', ranged:'EVEN' },
  diffEx:{ garen:'EVEN', darius:'FAVOURED', irelia:'HARD', fiora:'HARD', camille:'HARD', ambessa:'HARD',
    yasuo:'TRICKY', yone:'TRICKY', olaf:'TRICKY', warwick:'TRICKY', jax:'TRICKY', gwen:'TRICKY', akali:'HARD',
    sylas:'TRICKY', teemo:'TRICKY', quinn:'TRICKY', vayne:'TRICKY', lucian:'TRICKY', graves:'TRICKY',
    akshan:'TRICKY', kennen:'EVEN', cassiopeia:'TRICKY', ksante:'EVEN', poppy:'EVEN', maokai:'EVEN',
    nautilus:'EVEN', zac:'EVEN', kassadin:'FAVOURED', kayle:'EVEN' },
  vs:{
    jugg:{
      tldr:"He's a treadmill victim — Q the outer ring on every step-up and jog away from {K} forever.",
      breakdown:"Your passive speed means he never closes and your Q ring means every chase costs him HP. Respect exactly one thing — {K} — and the lane is a sustained-damage seminar he's not enrolled in.",
      dos:["Hit the Q outer ring on every step-up","Kite the {K} window with passive speed","Let Dream Dust burn do the trading"],
      donts:["Get clipped by {K} mid-kite","Stand still to force the W sweetspot","Chase kills through fog without vision"],
      win:"Kite, burn, and never be where his buttons land."
    },
    diver:{
      tldr:"His dash interrupts your jog — hold E for the engage and sleep the dive at 6.",
      breakdown:"The treadmill breaks if he can dash onto you, so kite wider: E from range to slow the approach, save W's sweetspot for the landing, and treat R as the anti-dive reset that flips his all-in.",
      dos:["E the approach before he dashes","Hold R to sleep the committed dive","W-sweetspot his landing point"],
      donts:["Jog in small circles near his dash range","Burn R for poke or waveclear","Trade flat while {K} is loaded"],
      win:"Slow the engage, sleep the dive, and burn him down in the reset."
    },
    tank:{
      tldr:"Burn-tank paradise — Dream Dust eats %HP and he has no way to stop the jog.",
      breakdown:"Max-HP burn is exactly the tax tanks can't pay. Q-poke every CS, take plates with the tempo your speed buys, and sleep-flank river fights where your R turns 50/50s into massacres.",
      dos:["Q-ring poke on every CS he takes","Use the speed for plates and tempo","Sleep multi-man fights in river"],
      donts:["Respect a kill threat he doesn't have","Eat {K} mid-jog for free","Stay top when your R wins fights elsewhere"],
      win:"Burn the HP pool he's proudest of and out-tempo the map."
    },
    ranged:{
      tldr:"He pokes, you jog through it — close the gap diagonally and make every trade end on your Q ring.",
      breakdown:"His poke needs you predictable; your speed makes you anything but. Weave toward him at angles, Q-ring the trades, and dodge {K} as the one spell that resets his lane.",
      dos:["Approach at angles behind your speed","End every trade on the Q outer ring","Dodge {K} — it's his whole reset button"],
      donts:["Walk straight lines into poke","Trade without passive speed stacked","Force the W sweetspot on a kiting target"],
      win:"Out-maneuver the poke and grind him down with burn trades."
    }
  },
  mirror:{
    tldr:"Dream mirror — whoever lands more outer rings and sleeps second wins the jog-off.",
    breakdown:"Two treadmills, one lane. Hit the Q ring more often, hold your R until hers whiffs, and the Dream Dust ledger settles the rest.",
    dos:["Win the Q-ring accuracy war","Sleep second, not first","Kite her W sweetspot"],
    donts:["Eat rings while chasing","Burn R into her ready R","Stand still, ever"],
    win:"More rings landed, better sleep timing.",
    winS:"Her sleep is down — yours isn't."
  },
  winS:"His engage is down — jog in and ring him.",
  tradeGood:"Q outer ring as he steps to the wave, jog through his answer with passive speed, ring him once more on the disengage, and let Dream Dust finish the math.",
  tradeBad:"Getting clipped by {K} mid-jog — your whole kit assumes you're moving, and one lockdown turns the deer into a kill notification.",
  waveBest:"a slow push you poke behind — he farms inside your Q ring and your jungler's ganks arrive onto a loaded sleep.",
  waveWorst:"a crashed wave with your E and R down — you're jogging in the open and every engage tool in his kit is live.",
  early:"Establish the treadmill: Q rings on every step-up, passive speed always rolling, and W held as the anti-chase deterrent.",
  mid:"From 6, you're the best gank-assist top in the game — sleep anything that oversteps and let the burn + jungler do the rest. Take plates with your tempo.",
  late:"Teamfights are your stage: E-R from fog onto two targets, kite the frontline in circles, and burn whole HP bars while never being touchable.",
  safetyTool:"passive move speed",
  spikesLine:"Level 6 Lullaby and Liandry's are the spikes — ganks become executes and your burn starts eating tanks.",
  carryLine:"Carry by making fights unfair — a two-man sleep from fog decides objectives before they start.",
  behindShort:"keep farming with Q rings and stay a sleep-flank threat — your R doesn't need gold.",
  loadingRule:"Never stop moving — stillness is death.",
  dontDetail:"Your entire kit assumes motion — one lockdown while jogging predictable lines is the only way this lane kills you.",
  aheadTpl:"Ahead, stretch the lead: poke {E} off the wave with rings, take every plate your speed buys, and export sleeps to river fights.",
  behindTpl:"Behind, jog it off — farm at the edge of your Q ring, hold R for survival or jungler arrivals, and let Liandry's bring you back into relevance.",
  spikeName:"Liandry's",
  runeReport:"Grasp of the Undying (procs on the Q ring), Demolish, Second Wind, Overgrowth; secondary Sorcery — Transcendence + Celerity. Conqueror works equally into extended-trade lanes.",
  summReport:"Flash + Teleport — your speed already covers the map; TP doubles your plate-and-tempo game. Ghost is a spicy duel pick into immobile lanes.",
  itemReport:"Start Doran's Ring + 2 pots. First: Liandry's Torment into Swifties or Sorcs; then Riftmaker / Rylai's by lane.",
  jungleLine:"Post-6 your lane is a guaranteed gank payout — sleep on arrival and it's a free kill every time. Pre-6, E from fog covers your jungler's entry.",
  redditLine:"hit the outer ring, never stop jogging, and save the sleep for committed engages — Lillia top wins by exhaustion, not execution.",
  load:{
    sub:"r/LilliaMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Fated Ashes (≈900g) — burn comes online",
    antihealBack:"Oblivion Orb (≈800g) — cuts his healing",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Liandry's Torment",
    secondItem:"Riftmaker / Rylai's Crystal Scepter",
    boots:"Boots of Swiftness",
    bootsVsAP:"Mercury's Treads / Swifties",
    bootsVsAD:"Plated Steelcaps / Swifties",
    spike:"Riftmaker second — extended kite-fights become unwinnable for him.",
    runes:{ keystone:"Grasp of the Undying", primaryTree:"Resolve", primary:["Demolish","Second Wind","Overgrowth"], tree:"Sorcery", secondary:["Transcendence","Celerity"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    irelia:{ tldr:"Her Q resets chase you through the wave — kill the treadmill fantasy, hold E for her engage, and sleep the second dash." },
    kassadin:{ tldr:"Shieldless melee mage — ring him off every CS and have the lane won before Riftwalk gets stacks." }
  }
},

// ============================== KASSADIN ==============================
{
  key:'kassadin', name:'Kassadin',
  curve:[-1.2,-1,-0.8,-0.6,0.3,0.6,1.5],
  lvl:[
    "Your worst level in the game — Q shield on cooldown, last-hit from maximum range, and concede every trade.",
    "W restores mana and adds a real auto — but you're still farming, not fighting. Give nothing away.",
    "Full kit and still underpowered — E only charges when spells fly, so passive lanes starve your waveclear too.",
    "The survival grind: Q the wave from range, bank CS, and track {K} purely so it doesn't kill you on the way to 6.",
    "Riftwalk online — you're mobile at last. Short blink-trades start working: R in, Q-E, walk the cooldown.",
    "Rod of Ages turns survival into stats — the blink-trade pattern now genuinely chunks people.",
    "The monster is awake: stacked Riftwalks plus Seraph's makes you the best scaling champion in the lobby. Hunt."
  ],
  diffBase:{ jugg:'HARD', diver:'HARD', tank:'TRICKY', ranged:'EVEN' },
  diffEx:{ nasus:'TRICKY', drmundo:'EVEN', mordekaiser:'EVEN', yorick:'TRICKY', gwen:'TRICKY', gragas:'EVEN',
    malphite:'EVEN', ornn:'EVEN', maokai:'EVEN', sion:'EVEN', chogath:'EVEN', galio:'EVEN',
    jayce:'HARD', quinn:'HARD', lucian:'HARD', graves:'HARD', akshan:'HARD', gnar:'HARD', gangplank:'TRICKY',
    vladimir:'FAVOURED', heimerdinger:'TRICKY', sylas:'TRICKY', akali:'TRICKY', teemo:'EVEN', kennen:'EVEN',
    rumble:'EVEN', swain:'EVEN', singed:'EVEN', cassiopeia:'EVEN', ziggs:'TRICKY', karma:'TRICKY', mel:'TRICKY', lillia:'EVEN' },
  vs:{
    jugg:{
      tldr:"Survive the bully — every minute you're alive pre-6 is a minute closer to him being unable to play.",
      breakdown:"He owns the first ten minutes; you own everything after. Q-shield his poke pattern, farm at max range, take the Second Wind package, and never be reachable when {K} is loaded.",
      dos:["Last-hit at maximum range, always","Q-shield right before his trade lands","Bank levels — 6, 11, 16 are the lane"],
      donts:["Trade before 6 under any flag","Walk reachable with {K} up","Tilt-fight after one death — scale anyway"],
      win:"Survive to 6, then blink-trade him into irrelevance."
    },
    diver:{
      tldr:"He dives, you can't answer yet — give the lane and steal the game at three items.",
      breakdown:"Pre-6 you have no exit and he has three entrances. Hug XP range, spend Q's shield on his burst opener, and remember every Riftwalk after 6 makes his engage tools look slower and slower.",
      dos:["Hug XP range and absorb with Q shield","Save everything for survival pre-6","Blink-kite his dives after 6"],
      donts:["Match his early skirmish tempo","Stand past the river bush line","Buy fight items before Rod of Ages"],
      win:"Concede early, then out-blink every dive he commits."
    },
    tank:{
      tldr:"Two scalers, one lane — except your curve goes vertical and his plateaus. Farm politely and win later.",
      breakdown:"Nobody dies here, which suits you fine: his AP damage feeds your Q shield, your E charges off his spell spam, and the 30-minute version of you solos the 30-minute version of him.",
      dos:["Farm the truce lane cleanly","Absorb his magic poke with Q","Spike ROA on schedule — then bully"],
      donts:["Force kills neither kit supports","Eat {K} during the boring minutes","Forget Mercs flip his CC math"],
      win:"Out-scale on a steeper curve and own every fight past 25 minutes."
    },
    ranged:{
      tldr:"If his damage is magic, your Q eats it — if it's physical, this is a real lane. Either way: level 6 changes everything.",
      breakdown:"Against AP poke your passive plus Q shield makes their harass embarrassing; against AD poke take the sustain package and grind. Riftwalk turns any ranged top into your personal blink-target.",
      dos:["Soak magic poke with passive + Q shield","Blink onto him the moment {K} is down post-6","Stack Tear through the survival phase"],
      donts:["Stand in poke with Q down pre-6","Riftwalk in while his answer is loaded","Spend mana you'll want for the all-in"],
      win:"Absorb the poke phase and blink-execute from 6 onward."
    }
  },
  mirror:{
    tldr:"Void mirror — two timebombs farming; whoever hits two items with more CS detonates first.",
    breakdown:"Comically passive until someone's R has more stacks. Win the CS war, match his Riftwalk count, and force the fight at YOUR item spike, not his.",
    dos:["Win the farm war","Track his Riftwalk stacks","Fight on your spike timing"],
    donts:["Fight at even stacks for pride","Burn mana pre-6","Let him free-roam at 11"],
    win:"Better CS, better stack discipline, first to detonate.",
    winS:"Your stacks are higher — the math is yours."
  },
  winS:"His answer is down — Riftwalk in and burst.",
  tradeGood:"Riftwalk onto him the instant {K} goes down, Q-E-W in one breath, and walk out as the shield absorbs his counter — repeat every six seconds.",
  tradeBad:"Any trade before level 6 — you have no mobility, no real damage, and every juggernaut pattern in the game beats your face in a straight exchange.",
  waveBest:"a frozen wave near your tower pre-6 — you farm in safety while his kill pressure rots; post-6, any wave works because you blink.",
  waveWorst:"a shoved wave pre-6 — you're a slow melee mage standing in a gank corridor with no escape tool.",
  early:"Accept the tax bracket: you are the worst champion in the game for ten minutes. Q shield, max-range CS, Second Wind, and zero pride.",
  mid:"Level 6 flips the physics — blink-trades on cooldown gaps, then ROA, then nobody in this lane can touch you again. Start hunting oversteps.",
  late:"Stacked Riftwalk Kassadin is the endgame boss: blink onto carries, Q-silence the counterplay, and leave before the fight even registers you.",
  safetyTool:"Q shield",
  spikesLine:"Level 6, Rod of Ages, and level 11 are the three detonations — each one deletes another chunk of the matchup table.",
  carryLine:"Carry by time-travel: lose the minutes everyone watches and win the ones that decide the game.",
  behindShort:"keep farming — Kassadin behind on kills but even on CS is still a hyperscaling monster.",
  loadingRule:"No trades before 6 — not one.",
  dontDetail:"You have no escape until 6 — every step past the wave is a coin-flip with a ganking jungler.",
  aheadTpl:"Ahead post-6, become the problem: blink onto {E} every time {K} is down, shove with E waves, and roam to mid with R — your gank arrives faster than wards report.",
  behindTpl:"Behind is your natural habitat — farm, stack Tear, hit the ROA timing, and re-enter the game at 11 as if the lane never happened.",
  spikeName:"Rod of Ages",
  runeReport:"Fleet Footwork, Triumph, Legend: Tenacity, Last Stand; secondary Resolve — Second Wind + Bone Plating. Fleet plus Q shield is how you survive the bully phase.",
  summReport:"Flash + Teleport, non-negotiable — TP fixes the lane attrition that defines your early game and converts to map presence at 11.",
  itemReport:"Start Doran's Shield or Ring by lane. Tear early, Rod of Ages into Mercs or Sorcs, then Seraph's Embrace and Zhonya's.",
  jungleLine:"Pre-6 you NEED jungle attention — ward both brushes and ping every push. Post-6 return the favor: your R makes you the fastest follow-up in the game.",
  redditLine:"the lane is a tax you pay for the late game — Q shield, max-range CS, and zero trades until Riftwalk; then the game starts.",
  load:{
    sub:"r/KassadinMains",
    start:"Doran's Shield + 1 Health Potion",
    normalBack:"Tear of the Goddess + Dark Seal (≈800g)",
    antihealBack:"Tear + Oblivion Orb path — cuts his healing",
    antihealNote:"Slot Oblivion Orb into the build vs his sustain.",
    firstItem:"Rod of Ages",
    secondItem:"Seraph's Embrace",
    boots:"Mercury's Treads",
    bootsVsAP:"Mercury's Treads",
    bootsVsAD:"Plated Steelcaps",
    spike:"Level 11 + Seraph's — the matchup table stops applying to you.",
    runes:{ keystone:"Fleet Footwork", primaryTree:"Precision", primary:["Triumph","Legend: Tenacity","Last Stand"], tree:"Resolve", secondary:["Second Wind","Bone Plating"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    vladimir:{ tldr:"An AP scaler your Q literally eats — soak his poke for free and out-curve the curve king." },
    mordekaiser:{ tldr:"His damage is all magic — your passive and Q shrug the trades that bully everyone else. Respect only the Realm 1v1 window." },
    jayce:{ tldr:"AD poke from range is your nightmare format — Doran's Shield, Second Wind, and prayer until 6." }
  }
}
];

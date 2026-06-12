// MatchupCoach — MID generator configs batch 9: Fizz, Kassadin, Katarina, LeBlanc.
window.GEN_MID_CFGS_9 = [

// ============================== FIZZ ==============================
{
  key:'fizz', name:'Fizz',
  curve:[0.0,0.2,0.3,0.3,0.7,0.5,0.3],
  lvl:[
    "W-empowered last hits and short Q trades — your passive ignores minion block, so fish through the wave freely.",
    "Q-W trade pattern live: dash through, bleed, walk out through the wave nobody else can walk through.",
    "E online — the troll pole changes everything: you now dodge one full rotation per fight and they know it.",
    "Q-W-E strings on his cooldown gaps — never hop first; the pole is your dodge before it's your damage.",
    "Chum the Waters online — the shark plus full string deletes most mids from 70%. The lane is now a horror film.",
    "First item spike: the string one-shots squishies who eat the shark. Fish aggressively.",
    "Late Fizz erases one carry per fight: shark the entry, string the target, pole the response, swim away."
  ],
  diffBase:{ control:'FAVOURED', burst:'FAVOURED', assassin:'EVEN', fighter:'TRICKY' },
  diffEx:{ lissandra:'HARD', galio:'HARD',
    malzahar:'FAVOURED', kassadin:'FAVOURED',
    vex:'EVEN', annie:'EVEN', vladimir:'EVEN', zed:'EVEN', katarina:'EVEN', akali:'EVEN', ekko:'EVEN', diana:'EVEN', talon:'EVEN', qiyana:'EVEN', naafiri:'EVEN', sylas:'EVEN', leblanc:'EVEN', neeko:'EVEN', ahri:'TRICKY',
    irelia:'TRICKY', yasuo:'TRICKY', yone:'TRICKY', pantheon:'TRICKY' },
  vs:{
    control:{
      tldr:"You are the reason his class dodges queues — fish through the wave, hop the one answer, and erase him at 6.",
      breakdown:"Pre-6 trade Q-W strings through the minions he hides behind; post-6 the shark removes the choice. His only answer is the one CC spell — pole it, then collect. Track {K} and the lane is a menu.",
      dos:["Fish Q-W strings through his wave","Pole his ONE answer spell, then commit","Shark the recall walk after chip wins"],
      donts:["Hop in before his CC is down or baited","Burn E for farm or spacing","Dive at even HP pre-6 out of boredom"],
      win:"Bleed him pre-6 and let the shark formalize the relationship after."
    },
    burst:{
      tldr:"His combo meets a pole — yours doesn't. Bait the rotation, hop it entirely, and string the silence.",
      breakdown:"Your E dodges his whole opener if timed on the centerpiece spell. Bait with a Q feint, pole the answer, and the 10-second cooldown gap is a Fizz string with no rebuttal. The shark makes round two academic.",
      dos:["Bait his combo with Q-feints","Pole the centerpiece, string the gap","Shark round two before his cooldowns return"],
      donts:["Hop predictably on cooldown","Trade combos pole-less at even HP","Respect feints — pole real casts only"],
      win:"Dodge the one rotation that mattered and erase the mage holding the receipt."
    },
    assassin:{
      tldr:"A burst mirror where your untargetability votes last — string second, pole his opener, and out-reset the exchange.",
      breakdown:"Both kits delete; yours has a built-in Zhonya's. Let him commit first, pole the burst, and counter-string with the shark queued. The discipline is patience — the second assassin usually swims home.",
      dos:["Commit second in every standoff","Pole his opener, counter the gap","Queue the shark before the re-engage"],
      donts:["Coin-flip openers pole-less","Fight inside his reset resources","Hop for damage when it's your dodge"],
      win:"Out-patience the mirror — the pole turns his opener into your turn."
    },
    fighter:{
      tldr:"He sustains through strings and punishes hops — phase-trade, pole the engage, and only all-in with the shark landed.",
      breakdown:"Fighters out-stat your extended fight: Q-W and leave, pole his gap-closer, and commit only behind a landed R. The wave-walk passive keeps your phases safe; greed is the only thing that kills you here.",
      dos:["Phase Q-W trades and leave","Pole the gap-closer, not the poke","All-in only behind a landed shark"],
      donts:["Brawl past your W bleed","Hop in with E down","Trade in his wave at even HP"],
      win:"Phase the brawler and let the shark schedule the only fight you fully attend."
    }
  },
  mirror:{
    tldr:"Fish mirror — whoever poles second poles smarter; the shark that lands first ends the argument.",
    breakdown:"Bait his E with Q feints and hold yours for his real string. The R duel goes to whoever chipped first — fish the early W bleeds harder.",
    dos:["Bait his pole before spending yours","Win the W bleed war early","Shark off chip advantage, not hope"],
    donts:["Hop first in the standoff","Trade strings pole-less","Eat the shark — sidestep early, it's slow"],
    win:"Second pole, first shark — order decides the fishing contest.",
    winS:"His E is down — the next string has no escape hatch."
  },
  winS:"His answer is spent — string him; there's no second no.",
  tradeGood:"Q through him, W bleed, walk out through the wave — the fish phases in and out before his answer finds a target.",
  tradeBad:"Hopping in first against a held CC — the pole spent as an entrance is the whole kit spent as a coin flip.",
  waveBest:"a passively-thinned wave you fish through at will — your minion-walk makes every wave state a trade state.",
  waveWorst:"a frozen wave near his tower with E down — a poleless fish at the wrong address.",
  early:"Fish the strings and respect one spell — his CC is the lane; everything else is water.",
  mid:"Shark the rivers: chip, R the entry, string the target, pole the response. One deletion per shark cycle.",
  late:"You are the carry-eraser with insurance: shark the backline, string the catch, pole their answer, and swim out of the obituary.",
  safetyTool:"E Playful / Trickster",
  spikesLine:"Level 3 pole re-prices everything; level 6 adds the shark; first item makes the string a one-shot.",
  carryLine:"Carry through deletions — shark, string, pole, repeat; one carry per fight is the contract and the pole notarizes it.",
  behindShort:"farm with W last-hits and stay relevant through pole plays.",
  loadingRule:"The pole is your dodge before it's your damage — spend it on his answer.",
  dontDetail:"E used to engage is E unavailable to dodge — the trickster who hops first gets audited.",
  aheadTpl:"Ahead, fish openly: zone {E} with string threat, shark every river, and pole the counterplay — fed Fizz makes the map an aquarium.",
  behindTpl:"Behind, fish quietly: W-farm, pole the dives, and wait for the one shark that resets the books.",
  spikeName:"first item",
  runeReport:"Electrocute, Sudden Impact, Eyeball Collection, Ultimate Hunter; secondary Precision — Presence of Mind + Coup de Grace.",
  summReport:"Flash + Ignite — Fizz lanes are kill scripts with a fish. TP only into Lissandra-Galio shaped problems.",
  itemReport:"Start Doran's Shield or Ring + pots. Stormsurge or Rocketbelt line, Sorcerer's, then Zhonya's-Rabadon paths.",
  jungleLine:"Shark-on-arrival is the cleanest dive setup in mid — R the target as your jungler commits and the knockup does the rest.",
  redditLine:"pole their answer not your entrance, shark from fog, and fish through waves like they're doors — Fizz wins by being untouchable exactly once per fight.",
  load:{
    sub:"r/FizzMains",
    start:"Doran's Shield + Health Potion",
    normalBack:"Hextech Alternator (≈1100g) — strings start one-shotting math",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Stormsurge / Rocketbelt",
    secondItem:"Zhonya's / Rabadon's path",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Mercury's Treads / Sorcerer's",
    bootsVsAD:"Plated Steelcaps / Sorcerer's",
    spike:"First item + 6 — shark-string deletes squishies from 70%.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Sudden Impact","Eyeball Collection","Ultimate Hunter"], tree:"Precision", secondary:["Presence of Mind","Coup de Grace"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    lissandra:{ tldr:"Her W is point-blank, instant, and pole-proof timing-wise — the anti-Fizz pick; fish the farm, skip the dives, and shark only with jungle cover." },
    galio:{ tldr:"MR scaling, anti-magic shield, and a taunt that catches poles — your strings tickle him; farm to items and erase his backline instead of the statue." },
    vex:{ tldr:"Your Q and R-string feed her fear schedule — pole her pulse FIRST, then string; a feared fish is a dead fish." }
  }
},

// ============================== KASSADIN ==============================
{
  key:'kassadin', name:'Kassadin',
  curve:[-0.8,-0.6,-0.4,-0.2,0.3,0.5,1.2],
  lvl:[
    "Q-shield the poke and last-hit with W refunds — you are pre-paying for level 16; act like it.",
    "Survive. The shield eats one spell per trade — make it his important one and concede the rest.",
    "E joins once spells fly — the slow wave covers your farm walks. Still: survive, stack, smile.",
    "W-refund farming keeps mana honest — take what's free, shield what isn't, and watch the clock.",
    "Riftwalk online — the map shrinks and the lane tax ends. One blink changes every gank, trade, and dive equation.",
    "First item spike: blink-strings start chunking. Take the trades you spent five levels refusing.",
    "Three items, level 16: you are the endgame — blink through their team, silence the carry, and repeat every two seconds."
  ],
  diffBase:{ control:'TRICKY', burst:'TRICKY', assassin:'TRICKY', fighter:'TRICKY' },
  diffEx:{ cassiopeia:'HARD', karma:'HARD', ryze:'HARD', fizz:'HARD', ekko:'HARD', diana:'HARD', pantheon:'HARD', akshan:'HARD', vex:'HARD', irelia:'HARD',
    syndra:'EVEN', xerath:'EVEN', ziggs:'EVEN', lux:'EVEN', ahri:'EVEN', anivia:'EVEN', malzahar:'EVEN', lissandra:'EVEN', vladimir:'EVEN', swain:'EVEN', viktor:'EVEN', orianna:'EVEN', azir:'EVEN', taliyah:'EVEN', hwei:'EVEN', zoe:'EVEN', veigar:'EVEN', annie:'EVEN', brand:'EVEN', neeko:'EVEN', mel:'EVEN', aurora:'EVEN', twistedfate:'EVEN', katarina:'EVEN', akali:'EVEN', sylas:'EVEN', galio:'TRICKY', zed:'TRICKY', talon:'TRICKY', qiyana:'TRICKY', leblanc:'TRICKY', naafiri:'TRICKY', yasuo:'TRICKY', yone:'TRICKY' },
  vs:{
    control:{
      tldr:"His poke is magic and your shield eats magic — the lane he was promised never quite arrives, and yours does at 16.",
      breakdown:"Q-shield his key spell every trade and the chip war stalls. Farm with W refunds, stack levels, and from 6 the Riftwalk threat ends the bullying. You out-scale him so hard the lane is a formality with homework.",
      dos:["Q-shield his most expensive spell","Farm W refunds and watch the clock","Blink-trade his cooldown gaps post-6"],
      donts:["Trade pre-6 beyond the shield's math","Stack stacks at half HP","Force anything before two items"],
      win:"Eat the magic with the shield and serve the late game he can't cancel."
    },
    burst:{
      tldr:"His rotation hits a magic shield and a blink — survive the windows, then out-burst the burster from level 11 on.",
      breakdown:"The shield blunts his opener and Riftwalk dodges the follow-up; your job is reaching that sentence alive. Hug the wave's shadow pre-6, shield the centerpiece, and from one item the blink-string out-trades his entire plan.",
      dos:["Shield the centerpiece spell, always","Blink OUT of his combos until items","Blink IN on his cooldown gaps after"],
      donts:["Trade pre-6 at his optimal range","Burn R greedily for farm","Stand at half HP within his reach"],
      win:"Survive the burst era, then out-burst it with a two-second cooldown."
    },
    assassin:{
      tldr:"AD assassins skip your shield — the hardest version of your weak era; survive on geometry, then out-scale the profession.",
      breakdown:"Your passive does nothing against physical kits, so play pure spacing: wave centered, E-slow the engage, R the moment it exists. Their mid-game spike races your late-game one — every minute you don't die, you win.",
      dos:["Keep the wave centered religiously","E-slow his engage, walk, repeat","Spend R on escapes until two items"],
      donts:["Trade with an AD assassin pre-items","Shield-bluff what the shield can't eat","Greed stacks in his kill windows"],
      win:"Concede the lane, keep the deaths column empty, and foreclose at three items."
    },
    fighter:{
      tldr:"He stat-checks the weak era and loses the strong one — give him nothing for eleven levels, then everything after.",
      breakdown:"Fighters bully you honestly pre-6: farm with W refunds, shield the magic half of mixed kits, and blink out of the all-ins. From level 11 the silence-string wins the duels he spent the game winning.",
      dos:["Farm refunds and concede the duels","Blink out of every committed all-in","Re-enter the duel ledger at level 11"],
      donts:["Brawl pre-items out of pride","Waste E's slow on poke","Burn R toward him before the flip"],
      win:"Pay the fighter tax early and repossess everything from 11 on."
    }
  },
  mirror:{
    tldr:"Void mirror — a scaling race where both lanes are stalls; whoever wastes fewer Riftwalk stacks wins the only fight.",
    breakdown:"Farm the mirror politely and track both R stack counts: the Kassadin who blinks last in the all-in blinks cheapest, and the cheaper blink wins level 16.",
    dos:["Out-farm the stall politely","Blink second in every exchange","Count both stack debts aloud"],
    donts:["Stack Riftwalk for show","Trade shields at even mana","Force fights before 16 — it's a draw until then"],
    win:"Stall cleaner and blink cheaper — the patient void wins.",
    winS:"His R stacks are bloated — yours is cheap; take the exchange."
  },
  winS:"His engage is spent — blink the gap and silence the answer.",
  tradeGood:"Q-shield his key spell, W refund the auto, walk — pre-6 trades are accounting; post-6 add a blink and they're arguments you win.",
  tradeBad:"Trading like the late game already arrived — a level 5 Kassadin with ambitions is a gold bounty with a shield.",
  waveBest:"a centered wave you farm with refunds — your whole laning phase is a parking job; park it well.",
  waveWorst:"a shoved wave at his tower pre-6 — the weakest early champion in mid, two screens from help, on purpose, apparently.",
  early:"Survive: shield the centerpiece, refund the farm, watch the clock. Every quiet minute is a loan against level 16.",
  mid:"Riftwalk changes the tax bracket: blink-trade the gaps, follow roams instantly, and stack items toward the inevitability.",
  late:"You ARE the late game: blink every two seconds, silence every carry, and collect the game your laning phase pre-paid.",
  safetyTool:"R Riftwalk",
  spikesLine:"Level 6 ends the bullying; two items start the arguments; level 16 ends them all.",
  carryLine:"Carry through inevitability — no champion converts time into power like Kassadin; your job is making the clock run.",
  behindShort:"farm with W refunds and stay relevant through the scaling curve.",
  loadingRule:"Shield the centerpiece spell — the passive is the matchup pre-6.",
  dontDetail:"Riftwalk stacks double the cost — the panic-blink chain that saves you now is the mana bar that kills you next fight.",
  aheadTpl:"Ahead, accelerate the clock: blink-trade {E}'s every gap, follow each roam instantly, and reach three items before the map adjusts.",
  behindTpl:"Behind, nothing changed: shield, farm, stall — Kassadin deficits expire at 16; protect the clock and stop donating.",
  spikeName:"Rod of Ages",
  runeReport:"Fleet Footwork or First Strike, Presence of Mind, Legend: Tenacity... no — secondary Sorcery: Manaflow + Transcendence. Fleet funds the survival era.",
  summReport:"Flash + Teleport — the survival era demands both; Ignite Kassadin is a contradiction in terms.",
  itemReport:"Start Doran's Shield + pot. Rod of Ages into Seraph's, Sorcerer's/Mercs, then Zhonya's and Rabadon's — mana is stacks is power.",
  jungleLine:"Pre-6 you NEED jungle attention — ping the shield matchups honestly. Post-6 you need none: Riftwalk follows every roam {E} ever takes.",
  redditLine:"shield the right spell, refund the farm, and respect the clock — Kassadin loses forty trades to win the only one scheduled at 16.",
  load:{
    sub:"r/Kassadinmains",
    start:"Doran's Shield + Health Potion",
    normalBack:"Catalyst of Aeons (≈1300g) — the survival battery",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Rod of Ages",
    secondItem:"Seraph's Embrace",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Mercury's Treads",
    bootsVsAD:"Plated Steelcaps / Sorcerer's",
    spike:"RoA + Seraph's — blink-strings start collecting the lane's unpaid debts.",
    runes:{ keystone:"Fleet Footwork", primaryTree:"Precision", primary:["Presence of Mind","Legend: Tenacity","Last Stand"], tree:"Sorcery", secondary:["Manaflow Band","Transcendence"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    cassiopeia:{ tldr:"Sustained DPS ignores your shield math and her grounds don't care about your blink — the foreclosure pick; farm scraps and pray the game goes 35 minutes." },
    fizz:{ tldr:"He dives through your shield era with physicals and pokes — the bully you can't shield; hug tower, refund farm, and let 16 hold the grudge." },
    ryze:{ tldr:"He bullies your weak era AND out-scales politely — concede the lane, perfect-park the wave, and win the one teamfight at 16 his comp can't." }
  }
},

// ============================== KATARINA ==============================
{
  key:'katarina', name:'Katarina',
  curve:[0.1,0.2,0.3,0.3,0.6,0.5,0.3],
  lvl:[
    "Q the wave and collect the dagger — every pickup is a free spin; the lane learns your dagger geometry or bleeds.",
    "W joins: drop, dance, collect — the self-dagger speeds your trades and your exits both.",
    "Full kit: E to daggers, not faces — the blink economy is the champion; trade only through steel on the ground.",
    "Dagger-trade on cooldown: Q-E-W-E strings chunk and the resets... wait for kills. Bank the patterns.",
    "Death Lotus online — any 2v2 near your daggers is a blender invoice. The reset engine is armed.",
    "First item spike: full dagger strings delete squishies and one kill opens the chain reaction.",
    "Late Kata is a chain reaction: enter on daggers, lotus the clump, reset through the wreckage, repeat until silence."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'EVEN', fighter:'TRICKY' },
  diffEx:{ anivia:'HARD', cassiopeia:'HARD', lissandra:'HARD', malzahar:'HARD', swain:'HARD', taliyah:'HARD', annie:'HARD', ahri:'HARD', vex:'HARD', ryze:'HARD',
    lux:'FAVOURED', xerath:'FAVOURED', ziggs:'FAVOURED', zoe:'FAVOURED', brand:'FAVOURED', hwei:'FAVOURED', twistedfate:'FAVOURED',
    diana:'EVEN', ekko:'EVEN', fizz:'EVEN', zed:'EVEN', akali:'EVEN', leblanc:'EVEN', talon:'EVEN', qiyana:'EVEN', naafiri:'EVEN', sylas:'EVEN', kassadin:'EVEN', karma:'EVEN', syndra:'EVEN', neeko:'EVEN', viktor:'EVEN', orianna:'EVEN', azir:'EVEN', veigar:'EVEN', mel:'EVEN', aurora:'EVEN', vladimir:'EVEN',
    galio:'TRICKY', irelia:'TRICKY', yasuo:'TRICKY', yone:'TRICKY', pantheon:'TRICKY' },
  vs:{
    control:{
      tldr:"No-CC mages are lunch and CC mages are landlords — know which one he is before the first dagger drops.",
      breakdown:"Against clean-kit control you shunpo through everything they aim: dagger-trade on cooldown and lotus the gank. Against held CC, the entire lane is baiting that one spell before your string — patience is the pick here.",
      dos:["Trade through grounded daggers only","Bait his CC before any full string","Lotus only with his answer confirmed down"],
      donts:["Shunpo into a held stun — ever","Spin predictable dagger spots","All-in into spell-shield kits unbroken"],
      win:"Bait the answer, then blend the mage who spent it."
    },
    burst:{
      tldr:"His combo is scheduled, yours is improvised — dance the daggers around his rotation and reset through the gap.",
      breakdown:"Trade in dagger geometry he can't pre-aim: W behind, E across, Q the bounce. His burst needs your position; you don't have one. The lotus punishes his all-in the moment his CC is down.",
      dos:["Dance the daggers off his aim lines","String the cooldown gap after his combo","Hold E's second use as the exit"],
      donts:["Stand on your own dagger predictably","Trade while his CC is loaded","Lotus through an alive interrupt"],
      win:"Be where his combo wasn't, and blend where his cooldowns are."
    },
    assassin:{
      tldr:"A reset duel — your daggers out-sustain his windows, and the first kill in any skirmish turns you into the weather.",
      breakdown:"Trade strings evenly and play for the 2v2: your resets scale with bodies and his don't. Hold E's flexibility as the trump — blink to daggers he can't track and lotus the moment his interrupt is spent.",
      dos:["Force 2v2s — resets love company","Blink to daggers, not targets","Lotus after his interrupt, never before"],
      donts:["Coin-flip solo all-ins at even HP","Burn both E uses entering","Fight away from your steel"],
      win:"Drag the duel into a skirmish and let the resets vote."
    },
    fighter:{
      tldr:"He sustains the blender if it starts at melee — poke with bounces, dance the edges, and lotus only the locked-down.",
      breakdown:"Fighters interrupt your lotus with one hand and out-trade your strings with the other: Q-bounce poke, W-speed retreats, and full commits only behind hard CC from someone else. The lane is a farming exercise with daggers.",
      dos:["Poke with Q bounces off minions","Keep W speed as the spacing tool","Commit only behind allied CC"],
      donts:["Lotus into an alive interrupt","Brawl at melee without resets banked","Shunpo in with both uses spent"],
      win:"Farm the bounce poke and save the blender for fights with seatbelts."
    }
  },
  mirror:{
    tldr:"Blender mirror — whoever picks up the other's daggers wins trades; whoever lotuses second lotuses alive.",
    breakdown:"Stand on her dagger landing spots, deny the pickups, and hold your lotus until her interrupt-proof window closes. The reset war goes to whoever kills first — so don't die first.",
    dos:["Deny her dagger pickups bodily","Lotus second, always","Trade only with E's return banked"],
    donts:["Spin on her timer","Stack daggers in shared space","Coin-flip the first reset"],
    win:"Steal her steel and lotus last — the patient blender drinks.",
    winS:"Her E is spent — she's a melee minion until it returns."
  },
  winS:"His answer is down — dagger in and start the chain.",
  tradeGood:"Q the bounce, E to the landed dagger, W as you spin out — steel-routed trades his aim can't follow.",
  tradeBad:"Shunpo onto a face with the CC still loaded — Katarina dies to held buttons, not skill, and everyone holding one knows it.",
  waveBest:"a Q-bounced thin push with daggers banked at the river mouth — your roams arrive with luggage.",
  waveWorst:"a frozen wave near a CC mage's tower — every pickup walk is a stun audition.",
  early:"Dagger geometry and patience — chip the no-CC kits, bait the CC ones, and bank patterns for the 6 that changes the lane's species.",
  mid:"First item onward, hunt skirmishes: every 2v2 near your daggers is a reset chain waiting for a signature. Roam when mid stalls.",
  late:"You are the cleanup that starts fights: enter on steel, lotus the clump, reset through the kill, and exit through the panic.",
  safetyTool:"E Shunpo (second use)",
  spikesLine:"Level 3 dagger strings set the lane; level 6 arms the blender; first item makes resets explosive.",
  carryLine:"Carry through chain reactions — one kill is three; your job is the first domino and the discipline to wait for it.",
  behindShort:"farm with Q bounces and stay relevant through reset potential.",
  loadingRule:"Blink to daggers, not faces — the steel is the champion.",
  dontDetail:"Your lotus dies to one interrupt — counting their CC before spinning is the entire skill floor of the champion.",
  aheadTpl:"Ahead, chain it: zone {E} off daggers, lotus every skirmish, and reset through the map — fed Katarina is a weather event.",
  behindTpl:"Behind, dance quietly: bounce-farm, bank daggers at chokes, and wait for the one teamfight where resets erase ledgers.",
  spikeName:"first item",
  runeReport:"Conqueror or Electrocute, Sudden Impact, Eyeball Collection, Relentless Hunter; secondary Precision — Presence of Mind + Coup de Grace.",
  summReport:"Flash + Ignite — the kill chain wants a lighter. TP belongs to the HARD column lanes only.",
  itemReport:"Start Doran's Shield or Blade + pots. Stormsurge or Nashor-AP lines, Sorcerer's, then Zhonya's-Rabadon's. Build for the reset, not the poke.",
  jungleLine:"Gank for HER: any CC your jungler lands is a full string plus lotus — ping the dagger-banked windows and watch the chain react.",
  redditLine:"daggers are the champion, lotus after the interrupt, and one kill is never one kill — Katarina wins by arithmetic dressed as chaos.",
  load:{
    sub:"r/KatarinaMains",
    start:"Doran's Shield + Health Potion",
    normalBack:"Hextech Alternator (≈1100g) — strings start chunking",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Stormsurge / Nashor's line",
    secondItem:"Zhonya's Hourglass",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Mercury's Treads / Sorcerer's",
    bootsVsAD:"Plated Steelcaps / Sorcerer's",
    spike:"First item + 6 — dagger strings delete and one kill opens the chain.",
    runes:{ keystone:"Conqueror", primaryTree:"Precision", primary:["Presence of Mind","Legend: Alacrity","Coup de Grace"], tree:"Domination", secondary:["Sudden Impact","Relentless Hunter"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    cassiopeia:{ tldr:"Grounds, interrupts, and DPS — the full anti-Kata package; farm bounces, never lotus in her W, and roam for a living." },
    malzahar:{ tldr:"His Q silences the lotus and his R suppresses the reset — bait the silence with a feint spin, and only commit with his shield popped and Q down." },
    lux:{ tldr:"One root, zero mobility, all projectiles — lunch with a laser; dodge the Q behind your daggers and blend her every cooldown gap.",
      dos:["Shunpo through her Q line","String her every E-cooldown window","Lotus the moment the root whiffs"] }
  }
},

// ============================== LEBLANC ==============================
{
  key:'leblanc', name:'LeBlanc',
  curve:[0.3,0.4,0.4,0.3,0.5,0.4,-0.1],
  lvl:[
    "Q-auto the trades — the sigil mark is half your damage; never throw Q without the detonation plan.",
    "W online: the Q-W double-proc chunk is live, and the return trip makes it free. The lane flinches now.",
    "E joins: Q-E chains hold targets for the full string. Pick one tether window per wave.",
    "W-poke the wave contacts and return before his answer — distortion math is the whole champion.",
    "Mimic online — the double-dash crosses the lane and the burst doubles. Most mids die to the first full chain.",
    "First item spike: Q-W-RW deletes squishies. Spend the lane lead before scaling lanes wake.",
    "Late LeBlanc picks: W the flank, chain the carry, mimic the exit — and vanish before the obituary prints."
  ],
  diffBase:{ control:'FAVOURED', burst:'EVEN', assassin:'EVEN', fighter:'TRICKY' },
  diffEx:{ galio:'HARD', vex:'HARD',
    kassadin:'EVEN', malzahar:'TRICKY', lissandra:'EVEN', syndra:'EVEN', ahri:'EVEN', zoe:'EVEN', katarina:'EVEN', akali:'EVEN', fizz:'EVEN', zed:'EVEN', talon:'EVEN', qiyana:'EVEN', ekko:'EVEN', diana:'EVEN', naafiri:'EVEN', sylas:'EVEN', annie:'EVEN', neeko:'EVEN', karma:'EVEN', mel:'EVEN', aurora:'EVEN', veigar:'EVEN', cassiopeia:'EVEN', anivia:'EVEN', orianna:'EVEN', viktor:'EVEN', swain:'EVEN', taliyah:'EVEN',
    vladimir:'FAVOURED', ryze:'FAVOURED', hwei:'FAVOURED', lux:'FAVOURED', xerath:'FAVOURED', ziggs:'FAVOURED', azir:'FAVOURED', twistedfate:'FAVOURED', brand:'FAVOURED',
    yasuo:'TRICKY', yone:'TRICKY', irelia:'TRICKY', pantheon:'TRICKY' },
  vs:{
    control:{
      tldr:"You were drafted to eat exactly this — W through the wave, double-proc the sigil, and return before his rotation loads.",
      breakdown:"His kit needs setup time yours refuses to grant: Q-W the contact, detonate, return. The chain at 6 converts any half-bar into a kill, and his immobility makes every tether honest. Spend the lead before two items — you fall off politely.",
      dos:["Q-W double-proc every wave contact","Chain the half-bar windows at 6","Cash the lead into plates and roams early"],
      donts:["Linger past the W return window","Trade into his one CC spell","Coast — your lead has a sell-by date"],
      win:"Burst the setup class before it sets up, and bank the lead before the curve flips."
    },
    burst:{
      tldr:"A burst mirror where your damage travels round-trip — combo second, return first, and let his rotation hit the after-image.",
      breakdown:"Trade W-pokes until his centerpiece is down, then chain the full string. The clone passive insures the one combo that catches you; spend the insurance on information, not panic.",
      dos:["Bait his centerpiece before the chain","W-return out of his counter-window","Use the clone to sell wrong directions"],
      donts:["Combo first at even cooldowns","Stay past the return timer for greed","Panic-clone predictably toward tower"],
      win:"Second combo, first exit — round-trip burst beats one-way burst."
    },
    assassin:{
      tldr:"An assassin mirror at distortion range — your burst is faster, your exit is scheduled, and the chain decides ties.",
      breakdown:"You out-range every melee assassin's opener: W-poke the approach, chain the commit, and return before his resets matter. Hold the second R-W as the exit when his all-in finally connects.",
      dos:["Poke the approach he must walk","Chain his committed engage","Bank RW as the scheduled exit"],
      donts:["Trade at his melee range pre-items","Burn the return for chip damage","Duel his reset resources at even HP"],
      win:"Out-range the opener, chain the commit, and leave on the timer he can't read."
    },
    fighter:{
      tldr:"He survives your burst and owns the brawl — poke round-trips only, chain his gap-closer, and never attend round two.",
      breakdown:"Your full string doesn't kill bruisers, so stop auditioning: W-poke, return, repeat, and tether the engage so the lane stays a commute. Mimic is your second exit, not your second entrance, here.",
      dos:["W-poke and return, nothing fancier","Chain his gap-closer mid-flight","Keep mimic as the second exit"],
      donts:["Full-commit strings into bruiser HP","Stand past the return window","Trade autos at melee — at all"],
      win:"Commute through the lane with round-trip pokes and never sign the brawl."
    }
  },
  mirror:{
    tldr:"Deception mirror — four dashes, two clones, one truth; whoever wastes the return trip first becomes catchable.",
    breakdown:"Track her W return timer like a stun window — she's killable at the landing spot. Chain the return, not the dash, and hold your own W until hers is spent.",
    dos:["Punish her W return spot","Chain the landing, not the flight","Hold your W until hers commits"],
    donts:["Trade during her loaded W","Chase the clone — watch the sigils","Mimic in while her chain is up"],
    win:"Punish the return trips — the LeBlanc with the later W wins.",
    winS:"Her W is spent — fourteen seconds of honest mage; collect."
  },
  winS:"His engage is spent — W in, double-proc, and return with the kill.",
  tradeGood:"Q the sigil, W the detonation, return before the answer — a half-bar round trip he experienced as weather.",
  tradeBad:"Staying at the W landing spot for one more auto — the return timer is your champion; outliving it is optional.",
  waveBest:"a W-cleared shove that funds round-trip roams — your waves crash and your burst commutes.",
  waveWorst:"a frozen wave with W down — fourteen seconds of being an immobile mage with a famous name.",
  early:"Double-proc the contacts and bank the flinch — your levels 2-5 bully harder than the lobby remembers.",
  mid:"Chain the 6-to-two-items window hard: every half-bar mid is a kill, every roam is a chain into someone's bot lane. The lead is now or never.",
  late:"You are the pick, not the teamfight: W the flank, chain the carry, mimic whichever direction the obituary isn't.",
  safetyTool:"W Distortion (return)",
  spikesLine:"Level 2 Q-W bullies; level 6 doubles the burst; first item is the kill window — spend it loudly.",
  carryLine:"Carry through picks — one chained carry per objective; your job is the flank angle and the discipline to leave after.",
  behindShort:"farm with W clears and stay relevant through chain picks.",
  loadingRule:"Never throw Q without the detonation plan — the sigil is half the champion.",
  dontDetail:"The W return is your life — greed that outlives the timer is the only way this champion dies in lane.",
  aheadTpl:"Ahead, sprint the window: chain {E} off every contact, roam with round-trip math, and end before two items dull the knife.",
  behindTpl:"Behind, poke the commute: W-return farm, chain their dives, and pick the overextended — LeBlanc from behind is still a flank nobody schedules.",
  spikeName:"first item",
  runeReport:"Electrocute, Cheap Shot, Eyeball Collection, Ultimate Hunter; secondary Sorcery — Manaflow + Transcendence.",
  summReport:"Flash + Ignite — the chain wants a closer. TP only into Galio-Vex shaped sentences.",
  itemReport:"Start Doran's Ring + 2 pots. Stormsurge or Luden's, Sorcerer's, then Shadowflame and Rabadon's. Spend gold like the lead expires — it does.",
  jungleLine:"Chain-on-arrival holds the gank target for the full collapse — and your W return means you can engage ganks nobody else survives starting.",
  redditLine:"sigil math, return timers, and a calendar — LeBlanc wins early, leaves loudly, and never apologizes for the scaling she skipped.",
  load:{
    sub:"r/LeBlancMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Hextech Alternator (≈1100g) — double-procs start deleting",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Stormsurge / Luden's",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Mercury's Treads / Sorcerer's",
    bootsVsAD:"Plated Steelcaps / Sorcerer's",
    spike:"First item + 6 — Q-W-RW deletes squishies on a commute schedule.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Cheap Shot","Eyeball Collection","Ultimate Hunter"], tree:"Sorcery", secondary:["Manaflow Band","Transcendence"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    galio:{ tldr:"MR scaling, a taunt that catches dashes, and AoE your clone can't fool — the anti-LeBlanc statue; poke round-trips only and win a different lane with roams." },
    vex:{ tldr:"Every dash in your kit feeds her fear — the W return arrives pre-feared; poke on foot, chain her pulse window, and roam where she isn't." },
    kassadin:{ tldr:"Bully the shield off him every wave — but the chain feeds his passive; lead with W damage and save Q-E for the popped windows; end before three items." }
  }
}
];

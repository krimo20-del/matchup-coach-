// MatchupCoach — MID generator configs batch 7: Twisted Fate, Veigar, Vex, Zoe.
window.GEN_MID_CFGS_7 = [

// ============================== TWISTED FATE ==============================
{
  key:'twistedfate', name:'Twisted Fate',
  curve:[-0.3,-0.1,0.0,0.1,0.6,0.4,0.2],
  lvl:[
    "Q-farm from range and concede the duel question entirely — your level 1 is a wallet, not a weapon.",
    "W online: the gold card re-prices his every step-up. Lock yellow when he walks forward and the lane behaves.",
    "Full kit: stacked-deck autos plus card cycling is a real short trade — but your game is the clock, not the lane.",
    "Lost Chapter timing — Q the wave, lock cards on cooldown, and watch side lanes like they're your KDA.",
    "Destiny online — THE level in this lane. Every shove is now a bot-lane death sentence with a 130-second timer.",
    "Lich Bane spike: gold card chunks half bars. The lane still isn't the point — the map pays your salary.",
    "Late TF is a coin with two good sides: split the side lane R-safe, or hold Destiny as the pick-and-collapse button."
  ],
  diffBase:{ control:'TRICKY', burst:'TRICKY', assassin:'HARD', fighter:'HARD' },
  diffEx:{ syndra:'HARD', irelia:'HARD', pantheon:'HARD', yone:'HARD', yasuo:'HARD',
    malzahar:'EVEN', swain:'EVEN', ryze:'EVEN', galio:'EVEN', veigar:'EVEN', annie:'EVEN', anivia:'TRICKY',
    kassadin:'TRICKY', xerath:'TRICKY', ziggs:'TRICKY', lux:'TRICKY', viktor:'TRICKY', orianna:'TRICKY', azir:'TRICKY', cassiopeia:'TRICKY', vladimir:'TRICKY', taliyah:'TRICKY', hwei:'TRICKY', ahri:'TRICKY', zoe:'TRICKY', vex:'TRICKY', brand:'TRICKY', neeko:'TRICKY', karma:'TRICKY', mel:'TRICKY', aurora:'TRICKY', lissandra:'TRICKY' },
  vs:{
    control:{
      tldr:"He wins the lane on paper — you win the map on schedule. Farm, lock cards defensively, and make 6 the whole story.",
      breakdown:"Don't out-trade a control mage; out-rotate him. Q-farm from range, gold-card his step-ups, and shove the wave the moment Destiny lights up. Every R that lands bot is worth more than ten won trades you weren't going to win anyway.",
      dos:["Q-farm and bank the deck quietly","Gold-card his aggression, never open with it","Shove-and-Destiny on every ult timer"],
      donts:["Trade rotations with a real mage","Burn Destiny to escape what cards answer","Stay mid when the map is paying double"],
      win:"Concede the lane politely and invoice the map — Destiny converts shoves into cross-lane kills."
    },
    burst:{
      tldr:"His combo beats your deck in a fair fight — the gold card exists to make fights unfair first.",
      breakdown:"Lock yellow BEFORE his engage range exists and his combo starts stunned. Q only when he's carded or distant, keep the wave middle, and spend Destiny on his roam-answer windows — a burst mage who follows your R arrives late to everything.",
      dos:["Lock gold before his engage range","Q only carded or distant targets","Destiny when he can't follow — tax his choice"],
      donts:["Cycle cards inside his combo range","Trade at even HP without yellow locked","Shove blind into his level-6 window"],
      win:"Stun the fight before it starts, and play the map war his lane lead can't attend."
    },
    assassin:{
      tldr:"You are the dictionary entry next to 'gank me' — yellow card is the lane's only law, and Destiny is your alibi.",
      breakdown:"He kills you through most honest exchanges, so don't have any: freeze-farm with Q, hold gold card like a heartbeat, and ward both flanks. Your 6 punishes his 6 — every roam he takes, your R follows from safety and arrives first.",
      dos:["Hold gold card permanently while he's alive","Freeze near tower and farm with Q","R-follow his roams — you arrive first"],
      donts:["Cycle W for damage near his timers","Shove past river — ever, in this lane","Greed plates with the card spent"],
      win:"Survive on yellow-card discipline and out-map his snowball with Destiny answers."
    },
    fighter:{
      tldr:"He runs through cards that aren't gold — so they're always gold; the lane is a stun-tax checkpoint until 6 changes the venue.",
      breakdown:"Fighters force the question your deck hates: lock yellow early, Q from max range, and never let stacked-deck greed put you inside his reach. Post-6, leave — the side lanes pay better and his engage can't cross the map with you.",
      dos:["Lock yellow the moment he steps forward","Q from maximum range only","Take the map exit at 6 — venue change"],
      donts:["Auto-weave inside his engage range","Trade extended with any card but gold","Match his all-in pride with your deck"],
      win:"Tax the engage with gold cards until 6, then win a different lane entirely."
    }
  },
  mirror:{
    tldr:"Card mirror — whoever locks gold second locks it smarter, and whoever spends Destiny on the better map wins the game.",
    breakdown:"Identical decks make this a scheduling war: track his R timer, shove before yours, and follow his Destiny the moment it channels — arriving second to his play beats starting your own.",
    dos:["Track both Destiny timers aloud","Shove first on every ult window","R-follow his teleport instantly"],
    donts:["Gold-card duel at even tempo","Burn R first without a target","Trade autos mid-cycle"],
    win:"Win the scheduling war — the better calendar beats the better cards.",
    winS:"His gold card is spent — step up and cycle freely."
  },
  winS:"His engage is spent — gold card the retreat and collect.",
  tradeGood:"Lock gold off-screen, walk up once, card-auto-Q, and leave — one stun-chunk per cycle is all the lane asks of you.",
  tradeBad:"Cycling cards inside his engage range for stacked-deck greed — TF dies in exactly one mistimed auto-walk per game; don't pre-book it.",
  waveBest:"a Q-shoved crash timed to your Destiny cooldown — TF waves are appointments; the map is the actual client.",
  waveWorst:"a frozen wave near his tower with gold card down — the global champion dying locally is the worst trade in League.",
  early:"Farm, lock defensively, and watch the clock — pre-6 TF is a savings bond. Your job is reaching Destiny with the deck intact.",
  mid:"Destiny onward, the map is the lane: shove, R the overextended side lane, collect, repeat. Two converted ults is a won game.",
  late:"You are the pick threat and the splitpush insurance: R-flank their carry rotation or split R-safe — either way the map plays scared.",
  safetyTool:"W gold card",
  spikesLine:"Level 6 is the whole story; Lich Bane makes the card chunk; from two items every R is a kill or a tower.",
  carryLine:"Carry through geography — TF wins games at coordinates the enemy didn't ward; your KDA lives in other people's lanes.",
  behindShort:"farm with Q and stay relevant through Destiny map plays.",
  loadingRule:"Gold card is the law — locked before his engage range, always.",
  dontDetail:"Destiny spent escaping is Destiny not spent collecting — your ult is a paycheck; cards are your insurance.",
  aheadTpl:"Ahead, run the schedule: shove on every R timer, Destiny the overextension, and gold-card the counter-play — TF leads are measured in towers, not kills.",
  behindTpl:"Behind, the clock still ticks: farm safe, hold yellow, and R the map's mistakes — TF from behind needs one converted Destiny to re-enter the books.",
  spikeName:"Lich Bane",
  runeReport:"First Strike or Phase Rush, Magical Footwear/Cash Back, Biscuits, Cosmic Insight; secondary Sorcery — Manaflow + Transcendence. First Strike funds the map game.",
  summReport:"Flash + Teleport — yes, both: TP doubles the global math and protects the pre-6 wallet. Ignite TF is for coin-flippers.",
  itemReport:"Start Doran's Ring + 2 pots. Lich Bane into Sorcerer's/Lucidity, then Rapid Firecannon or Shadowflame. Zhonya's vs the assassins who live mid.",
  jungleLine:"Gold card is the best gank-setup stun in mid — lock before the jungler shows, not after. Post-6, your R turns HIS ganks into 3v2s anywhere on the map.",
  redditLine:"yellow before yourself, Destiny before drama, and the map before the matchup — TF loses lanes professionally and wins games on commission.",
  load:{
    sub:"r/TwistedFateMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Sheen (≈900g) — the card chunk begins",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Lich Bane",
    secondItem:"Rapid Firecannon / Shadowflame",
    boots:"Sorcerer's Shoes / Ionian Lucidity",
    bootsVsAP:"Mercury's Treads / Sorcerer's Shoes",
    bootsVsAD:"Plated Steelcaps / Sorcerer's Shoes",
    spike:"Lich Bane + boots — every Destiny is a half-bar gold card with a zip code.",
    runes:{ keystone:"First Strike", primaryTree:"Inspiration", primary:["Magical Footwear","Biscuit Delivery","Cosmic Insight"], tree:"Sorcery", secondary:["Manaflow Band","Transcendence"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    syndra:{ tldr:"She bullies the wallet phase brutally — Q-farm from fog range, never contest her shove, and pay her lane tax until Destiny starts the real business." },
    yasuo:{ tldr:"Wind Wall eats Q and the card — yes, the card is a projectile. Lock gold and walk it INSIDE the wall's edge or play the map and skip the argument." },
    zed:{ tldr:"His 6 hunts you, yours leaves — trade the question: gold-card his R arrival (point-blank, undodgeable) and Destiny away from the second attempt.",
      dos:["Hold gold for the Death Mark landing","Zhonya's after the card, not before","R out of lane when his timer is up"] }
  }
},

// ============================== VEIGAR ==============================
{
  key:'veigar', name:'Veigar',
  curve:[-0.2,0.0,0.1,0.2,0.4,0.4,0.9],
  lvl:[
    "Q through two units on every last-hit — each stack is permanent AP; the lane is a savings account from level 1.",
    "W on cage-stunned or rooted targets only — uncaged Dark Matter is a donation to his dodge stats.",
    "Cage online: drop it ON yourself when he engages, behind him when he farms — the geometry does the fighting.",
    "Lost Chapter timing — Q-stack on cooldown and double-stack off cannon waves. The curve is the matchup.",
    "Primordial Burst online — anyone under half is now a math problem with one answer. Count R damage out loud.",
    "Luden's spike: cage-W-Q-R deletes squishies who touch the wall. Your zone is a courtroom now.",
    "Late Veigar IS the scaling argument: cage the choke, burst the carry, and let infinite AP write the closing statement."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'TRICKY', fighter:'TRICKY' },
  diffEx:{ yasuo:'HARD', fizz:'HARD', irelia:'HARD', pantheon:'HARD', yone:'HARD',
    katarina:'EVEN', syndra:'EVEN', xerath:'EVEN', ziggs:'EVEN', lux:'EVEN', viktor:'EVEN', orianna:'EVEN', anivia:'EVEN', azir:'EVEN', cassiopeia:'EVEN', vladimir:'EVEN', malzahar:'EVEN', taliyah:'EVEN', hwei:'EVEN', swain:'EVEN', ryze:'EVEN', twistedfate:'EVEN', annie:'EVEN', ahri:'EVEN', zoe:'EVEN', vex:'EVEN', brand:'EVEN', neeko:'EVEN', karma:'EVEN', mel:'EVEN', aurora:'EVEN', lissandra:'EVEN',
    zed:'TRICKY', kassadin:'TRICKY', leblanc:'TRICKY', akali:'TRICKY', galio:'TRICKY', ekko:'TRICKY', diana:'TRICKY', qiyana:'TRICKY', talon:'TRICKY', naafiri:'TRICKY', sylas:'TRICKY' },
  vs:{
    control:{
      tldr:"A scaling race you win by definition — stack through his poke, cage his aggression, and let infinity argue the late game.",
      breakdown:"He pokes, you bank: every Q is permanent AP and his chip damage isn't. Trade only off cage-edge stuns, double-stack cannon waves, and accept bad minutes for good hours. By third item the matchup is a formality with your name on it.",
      dos:["Q-stack through two units every cast","Cage his step-ups, W the stun","Bank the bad minutes — they're loans"],
      donts:["Trade rotations during his range window","W open ground like it might hit","Contest shoves your stacks don't need"],
      win:"Stack through the lane and let the infinite curve foreclose on his finite one."
    },
    burst:{
      tldr:"His burst is rented, yours compounds — survive the windows and the cage-R math eventually answers everything.",
      breakdown:"Respect his combo timings and give the lane nothing to burst: cage ON yourself when he engages, W the edge-stun, and R the half-health retreat. Your execute out-scales his rotation from level 11 onward — the lane is a stall with interest.",
      dos:["Self-cage his engage windows","R the sub-half retreat instantly","Stack relentlessly between his windows"],
      donts:["Trade at his combo range uncaged","Burn R above the execute line","Eat poke while W is off cooldown"],
      win:"Stall with cage geometry and let Primordial math win every fight past two items."
    },
    assassin:{
      tldr:"He dives a champion whose E was designed for this exact conversation — the cage is your Flash, your peel, and his mistake.",
      breakdown:"Self-cage is the whole defense: drop it ON your own hitbox when he commits and his dash hits the wall mid-animation. Stack from range, keep the wave centered, and remember your R executes HIS reset health bar better than his executes yours.",
      dos:["Self-cage the engage — center, not edge","Hold R for his sub-half reset windows","Stack off the wave, not his patience"],
      donts:["Cage predictively before the dash shows","Shove past river with E down","Greed stacks at half HP near his timers"],
      win:"Wall the dive mid-dash, burst the reset, and out-scale the assassin's entire business model."
    },
    fighter:{
      tldr:"He runs at a wall that stuns — the run-down dies in the cage if your geometry beats his patience.",
      breakdown:"Fighters give you the cleanest cage angles in the game: drop E on his approach lane, W the edge-stun, and kite the Q-stacks backward. Never fight uncaged — your kit minus the wall is a tutorial reward.",
      dos:["Cage the approach lane, not the champion","W-Q the edge-stun every time it lands","Kite backward stacking through his wave"],
      donts:["Fight with E on cooldown — leave instead","Cage behind him while he's already on you","Trade autos with anything, ever"],
      win:"Stun the run-down at the wall and bill the toll until the curve makes it lethal."
    }
  },
  mirror:{
    tldr:"Stack mirror — whoever banks more AP wins the inevitable; whoever self-cages second wins the all-ins between.",
    breakdown:"Pure farming race with cage chicken: dodge his Q-lines behind double minions, out-stack off cannons, and hold R for his half-health moments before he holds yours.",
    dos:["Win the stack count every wave","Self-cage his engage, edge-cage his farm","R first the moment he's under half"],
    donts:["Eat Q-stacks standing on the minion line","Cage-duel at even cooldowns","Trade W-for-W in open ground"],
    win:"Out-stack and out-execute — the bigger number wins the mirror by design.",
    winS:"His cage is down — walk forward; the floor is just floor now."
  },
  winS:"His engage is spent — cage the retreat and run the full audit.",
  tradeGood:"Cage his step-up, W the edge-stun, Q-auto, and walk — a half-bar trade that also deposited three stacks into the curve.",
  tradeBad:"W-ing open ground on a moving target and trading uncaged 'just to stack' — Veigar without the wall is a piggy bank with a hat.",
  waveBest:"a Q-double-stacked slow push you cage-protect — every cannon wave is six stacks and the crash funds the next deposit.",
  waveWorst:"a frozen wave near his tower with E down — walking up to stack into gank season is how curves get repossessed.",
  early:"Stack, cage, survive — in that order. Pre-6 Veigar is a promise with a wall; spend nothing the curve doesn't refund.",
  mid:"Luden's onward, the zone is law: cage the river chokes, W the edge-stuns, and R-audit every half-health visitor. The curve starts collecting.",
  late:"You are the infinite argument: cage the objective choke, burst their carry from execute range, and let the biggest number in the lobby close the game.",
  safetyTool:"E Event Horizon (self-cage)",
  spikesLine:"Lost Chapter steadies the bank; level 6 adds the execute; two items plus the curve makes every cage a verdict.",
  carryLine:"Carry through arithmetic — your AP has no ceiling and your R reads health bars like invoices; the game ends when the number says so.",
  behindShort:"farm with Q stacks and stay relevant through cage utility and the infinite curve.",
  loadingRule:"Two units per Q, every Q — the stack count is the matchup.",
  dontDetail:"The cage's CENTER is safe and the EDGE stuns — self-cage means standing where they can't, and panicking means forgetting which is which.",
  aheadTpl:"Ahead, compound it: zone {E} with cage threat, double-stack his conceded waves, and R-audit every skirmish — fed Veigar is a deadline with a hat.",
  behindTpl:"Behind, nothing changed: stack, cage, survive — Veigar deficits expire at third item; protect the curve and let infinity do the comeback.",
  spikeName:"Luden's",
  runeReport:"Arcane Comet or Phase Rush, Manaflow Band, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight.",
  summReport:"Flash + Teleport standard — TP protects the stacking curve. Ignite Veigar is for lanes you intend to cage-execute personally.",
  itemReport:"Start Doran's Ring + 2 pots. Luden's into Sorcerer's, then Seraph's or Zhonya's, Rabadon's after — every item multiplies the stack bank.",
  jungleLine:"Your cage is the best gank wall in League — drop it BEHIND {E} as the jungler commits and the lane becomes a courtroom. W lands free on anything stunned.",
  redditLine:"stack like rent is due, self-cage like it's Flash, and count R damage before pressing it — Veigar wins by making time itself the carry.",
  load:{
    sub:"r/veigarmains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — the bank opens",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Luden's Companion",
    secondItem:"Seraph's / Zhonya's",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Luden's + the stack curve — cage-W-Q-R deletes anyone who touches the wall.",
    runes:{ keystone:"Arcane Comet", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"His dashes thread your cage and Wind Wall eats Q, W, and R — self-cage center, stun the chain's THIRD dash, and never R into the wall.",
      dos:["Self-cage and hold the center","Stun the last dash, not the first","R only with his wall confirmed down"] },
    zed:{ tldr:"Self-cage his R arrival — he lands edge-adjacent by design. Stack through the energy poke and R his reset before his R resets you.",
      dos:["Self-cage the Death Mark landing","Hold W for the cage-stun follow-up","Zhonya's the mark, R the regret"] },
    fizz:{ tldr:"His E hops the cage entirely — the geometry counter. Self-cage anyway (it catches the Q-dash), hug tower post-6, and out-scale his patience." }
  }
},

// ============================== VEX ==============================
{
  key:'vex', name:'Vex',
  curve:[0.2,0.3,0.3,0.3,0.5,0.4,0.2],
  lvl:[
    "Q-poke the last-hits — the accelerating bolt chips from a deceptive range and Gloom marks tax every connect.",
    "W online: the shield-fear pulse means anyone who dashes onto you regrets the itinerary.",
    "Full kit: E-mark into Q-fear is your trade engine — every passive proc is crowd control he scheduled for you.",
    "Lost Chapter timing — mark-and-bolt every wave contact; the fear windows zone harder than the damage.",
    "Shadow Surge online — any skirmish in missile range is now your business; the reset execute travels.",
    "Luden's spike: the full marked rotation chunks half bars and fears the answer. Force the gloom war.",
    "Late Vex is anti-engage incarnate: their dive feeds your fears, your R feeds on their deaths."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'FAVOURED', fighter:'EVEN' },
  diffEx:{ syndra:'HARD', xerath:'HARD',
    fizz:'EVEN', kassadin:'FAVOURED', ahri:'FAVOURED', aurora:'FAVOURED',
    ziggs:'TRICKY', lux:'TRICKY', viktor:'TRICKY', orianna:'TRICKY', cassiopeia:'TRICKY', hwei:'TRICKY', zoe:'TRICKY',
    anivia:'EVEN', azir:'EVEN', vladimir:'EVEN', malzahar:'EVEN', taliyah:'EVEN', swain:'EVEN', ryze:'EVEN', twistedfate:'EVEN', veigar:'EVEN', annie:'EVEN', brand:'EVEN', neeko:'EVEN', karma:'EVEN', mel:'EVEN', lissandra:'EVEN', galio:'EVEN', pantheon:'EVEN' },
  vs:{
    control:{
      tldr:"An even poke war where his mobility advantage doesn't exist — trade marked rotations and let Gloom math grind the margins.",
      breakdown:"Without dashes to feed your passive, this is honest mage chess: E-mark the contact, Q the fear window, and dodge his key line. Your R adds a skirmish dimension his kit can't follow — spend it on river fights, not lane pride.",
      dos:["E-mark before every real trade","Q the fear window the mark opens","R into river skirmishes he can't reach"],
      donts:["Trade unmarked rotations","Burn the fear pulse on spacing","Poke into his shield/answer window"],
      win:"Win the marked-rotation war and convert R range into skirmish kills he can't match."
    },
    burst:{
      tldr:"His combo is a sprint through your fear field — mark the approach and his engage spell arrives pre-interrupted.",
      breakdown:"Burst mages must close or land long setup; both feed you. E the space he wants, Q the marked line, and hold W's pulse for the commit. Your R finishes the half-health retreat his combo budget didn't plan for.",
      dos:["E the space his combo needs","Hold W's pulse for the real commit","R the retreat below half"],
      donts:["Trade while his setup spell is loaded","Fear-pulse his poke instead of his engage","Stand at his max range unmarked"],
      win:"Pre-interrupt the engage with fear geometry and execute the budget shortfall with R."
    },
    assassin:{
      tldr:"He picked the one mage whose passive eats assassins — every dash he casts is a fear he donated; smile and collect.",
      breakdown:"This is your design brief: his engage dashes proc Doom, your W pulse punishes the arrival, and your R resets off the kill he became. Play forward with the glow up, hold the pulse for his commit, and let his mobility pay your bills.",
      dos:["Play forward whenever Doom glows","W-pulse his dash arrival, every time","R-execute the failed dive's retreat"],
      donts:["Waste the glow window farming passively","Pulse early on the feint dash","Chase resets past your fear cooldowns"],
      win:"Tax every dash with fear, pulse the dive, and R the assassin who funded your kit."
    },
    fighter:{
      tldr:"His dash-chains read as a fear donation schedule — pulse the engage, mark the brawl, and never let the fight outlast your gloom.",
      breakdown:"Dash-fighters feed your passive but out-trade your base numbers: fear the engage, Q-E the marked window, and disengage before his sustain argues. The R execute punishes his every low-health calculation.",
      dos:["Pulse the engage dash on arrival","Trade only inside marked windows","Disengage before his sustain window opens"],
      donts:["Brawl past your fear durations","Mark-poke inside his reach","Hold R so long the execute window closes"],
      win:"Fear the engage, trade the marked window, and execute the brawl he thought he was winning."
    }
  },
  mirror:{
    tldr:"Gloom mirror — whoever manages Doom windows better owns the trades; dashless mirrors are won on mark discipline.",
    breakdown:"Neither of you feeds the other's passive, so it's pure rotation chess: dodge her Q at mid-range, mark first, and hold your pulse for her glow window.",
    dos:["Mark first in every exchange","Dodge her bolt at its slow mid-range","Pulse her glow-window aggression"],
    donts:["Trade unmarked into her marked","Overlap R dives — yours second","Waste fear on her poke"],
    win:"Out-mark and out-window — the gloomier kid wins.",
    winS:"Her fear is spent — step up and trade clean."
  },
  winS:"His engage is spent — mark, fear, and run the rotation.",
  tradeGood:"E-mark the contact, Q through the marked line for the fear, auto, walk — every trade he answers with a dash just schedules the next fear.",
  tradeBad:"Spending the W pulse on poke spacing and then eating the real engage unfeared — the pulse is the matchup against everything that moves fast.",
  waveBest:"an E-Q cleared push that crashes with Doom glowing — your shove doubles as a fear-loaded threat display.",
  waveWorst:"a frozen wave near his tower with W down and no glow — the anti-dive mage with no anti or dive left.",
  early:"Mark and bolt — your trades are honest and your passive makes his mobility dishonest. Bank Gloom procs like currency.",
  mid:"Luden's onward, hunt the skirmishes: R into river fights, fear the convergence, and reset off whatever dies. Your range is wherever the missile reaches.",
  late:"You are the engage tax: their dive comp feeds your fears, your R feeds on their commitments, and the carry they sent dies mid-dash, repeatedly.",
  safetyTool:"W Personal Space",
  spikesLine:"Level 2 W re-prices dives; level 6 adds the traveling execute; Luden's makes marked rotations half a bar.",
  carryLine:"Carry by punishing motion — every dash in their comp is a fear you scheduled; your job is being where their mobility wants to go.",
  behindShort:"farm with Q-E clears and stay relevant through anti-dive fears.",
  loadingRule:"Mark before you trade — unmarked rotations are half rotations.",
  dontDetail:"The pulse answers exactly one engage per cooldown — spent on spacing, the next dash arrives to a quiet, fearless, dead Vex.",
  aheadTpl:"Ahead, gloom harder: zone {E} with marked-rotation threat, R every skirmish his team starts, and reset through the kills — fed Vex makes mobility a typo.",
  behindTpl:"Behind, the passive still works: farm marked clears, pulse their dives, and R-execute the overconfident — Vex from behind is still the worst news their assassin owns.",
  spikeName:"Luden's",
  runeReport:"Electrocute, Cheap Shot, Eyeball Collection, Ultimate Hunter; secondary Sorcery — Manaflow + Transcendence.",
  summReport:"Flash + Ignite into dive comps you intend to counter-kill; Flash + TP into poke wars where the lane is a stall.",
  itemReport:"Start Doran's Ring + 2 pots. Luden's into Sorcerer's, then Shadowflame and Rabadon's. Zhonya's vs the burst that ignores fear math.",
  jungleLine:"Your fear pulse turns 2v2s — the enemy jungler's gap-close feeds Doom and dies afraid. Ping for ganks whenever the glow is banked.",
  redditLine:"glow up play up, pulse engages not feints, and R the skirmish not the wave — Vex wins by charging rent on every dash in the lobby.",
  load:{
    sub:"r/VexMains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — the gloom goes sustainable",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Luden's Companion",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Luden's + Shadowflame — marked rotations chunk half bars and the R resets clean up.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Cheap Shot","Eyeball Collection","Ultimate Hunter"], tree:"Sorcery", secondary:["Manaflow Band","Transcendence"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    syndra:{ tldr:"No dashes to feed you and range you can't argue with — the anti-Vex mage. Dodge the QE line, farm marked clears, and win at skirmishes instead." },
    yasuo:{ tldr:"Every dash he casts re-arms your passive — but Wind Wall eats Q and R. Pulse his chain on arrival and rotate only behind the wall's cooldown.",
      dos:["Pulse the dash-chain arrival","Q only while his wall is down","Fear resets every time he Es a minion"] },
    fizz:{ tldr:"His hops feed your fear but his E dodges your everything — pulse the Q-dash (it's dodgeable-proof), and hold R for after the trickster lands." }
  }
},

// ============================== ZOE ==============================
{
  key:'zoe', name:'Zoe',
  curve:[0.2,0.2,0.3,0.3,0.4,0.4,0.2],
  lvl:[
    "Q-flick the last-hits — even short paddles chip, and the passive auto after each cast adds up fast.",
    "W watch begins: every summoner he spends becomes your loot — track the drops like a second income.",
    "E online: the bubble over the wall into max-range Q is the entire kill pattern, available from level 3.",
    "Lost Chapter timing — bubble threat zones the wave and your Q distance math starts deleting chip bars.",
    "Portal Jump online — your Q angles multiply and gank dodges get disrespectful. The sniper has a slide.",
    "Luden's spike: sleep into max-range Q one-shots squishies. The lane is a dodgeball final now.",
    "Late Zoe is a pick lottery the enemy keeps buying tickets for: bubble the fog, Q the dream, loot the wreck."
  ],
  diffBase:{ control:'EVEN', burst:'EVEN', assassin:'HARD', fighter:'HARD' },
  diffEx:{ syndra:'EVEN', xerath:'EVEN', hwei:'EVEN', leblanc:'TRICKY', kassadin:'TRICKY',
    ziggs:'TRICKY', lux:'TRICKY', viktor:'TRICKY', orianna:'TRICKY', anivia:'TRICKY', azir:'TRICKY', cassiopeia:'TRICKY', malzahar:'TRICKY', taliyah:'TRICKY', swain:'TRICKY', ryze:'TRICKY', galio:'TRICKY', vex:'TRICKY', brand:'TRICKY', lissandra:'TRICKY',
    vladimir:'EVEN', twistedfate:'EVEN', veigar:'EVEN', annie:'EVEN', ahri:'EVEN', neeko:'EVEN', karma:'EVEN', mel:'EVEN', aurora:'EVEN' },
  vs:{
    control:{
      tldr:"A dodgeball duel at sniper range — your max-distance Q out-damages his whole rotation if the bubble lands first.",
      breakdown:"Trade flick-Qs evenly and hunt the one bubble window per wave: over the minions, off the wall, through the fog. A slept control mage eats a Q that costs him half a bar — the lane is patience plus one connected dream.",
      dos:["Flick short Qs between bubble windows","Bubble through walls and minion gaps","Max the Q's travel BEFORE the redirect"],
      donts:["Bubble on cooldown into minion block","Trade while his key spell is loaded","Stand still spinning the Q — you're the target too"],
      win:"Land one bubble per cycle and convert each dream into half a health bar."
    },
    burst:{
      tldr:"Both kits one-shot — yours starts from two screens and his needs an introduction; keep the relationship long-distance.",
      breakdown:"His combo needs proximity your spacing refuses: bubble the approach, Q the sleeper, and W-loot the summoners he burns escaping. The R blink baits his engage — port forward, snap back, and watch his combo hit the afterimage.",
      dos:["Bubble the approach before his range exists","Bait his engage with R's snap-back","Loot every summoner drop on sight"],
      donts:["Trade inside his combo radius","R toward him with his engage loaded","Sleep-poke when the kill math isn't there"],
      win:"Keep the fight at dream range and execute the first impatient step."
    },
    assassin:{
      tldr:"He dives the squishiest sniper in League — the lane is bubble-or-die and the bubble better be banked.",
      breakdown:"Your E is the dive answer and the kill starter; against assassins it's only the former. Keep the wave centered, hold the bubble for his commit, and R-dodge the skillshot half of his combo. Even lanes are victories — his roams are the real war; shove and ping.",
      dos:["Bank the bubble exclusively for his engage","R-dodge the skillshot half of his dive","Crash waves and ping his roam timers"],
      donts:["Sleep-poke near his engage timers","Shove past river post-6","Greed the max-range Q at half HP"],
      win:"Sleep the dive, blink the burst, and tax his roams with shove-and-ping discipline."
    },
    fighter:{
      tldr:"He runs through dreams that miss — so they don't: bubble the engage lane, Q the sleeper, and never let the gap close awake.",
      breakdown:"Dash-fighters punish your cast animations: bubble held for the commit, Q pre-positioned behind you for the redirect, and R only ever laterally. The sleep that lands mid-dash is the fight; everything else is cardio.",
      dos:["Bubble his engage lane, not his body","Pre-spin Q behind you for the redirect","R laterally — never toward, never cornered"],
      donts:["Cast bubbles inside his dash range","Trade extended within his reach","Bait yourself with greedy paddle distance"],
      win:"Sleep the dash mid-flight and convert each dream into the chunk that keeps him home."
    }
  },
  mirror:{
    tldr:"Dream mirror — two snipers, one bubble each; whoever sleeps first shoots first, and whoever loots better scales the chaos.",
    breakdown:"Bubble discipline decides everything: dodge hers behind minions, land yours through fog, and never stand at max-Q range with your E down — that's her whole turn.",
    dos:["Dodge her bubble first, always","Land yours from fog angles","Win the W loot race off both teams"],
    donts:["Bubble-duel at even cooldowns","Stand at her max-Q line bubbleless","R predictably — the snap-back is readable"],
    win:"First dream wins the exchange; better loot wins the lane.",
    winS:"Her bubble is down — walk up and take the trade free."
  },
  winS:"His engage is spent — bubble the retreat and shoot the dream.",
  tradeGood:"Bubble over terrain or minions, max-range Q the sleeper, passive auto, walk — one connected dream per wave cycle wins the lane on its own.",
  tradeBad:"Bubbling into the minion line on cooldown until the assassin notices your E timer — the bubble is your life AND your kill; budget it like both.",
  waveBest:"a Q-flicked thin push that holds mid-lane — your kill pattern needs the bubble lane open, not the wave crashed.",
  waveWorst:"a shoved wave at his tower with E down — the sniper with no sleep is just a small child at the wrong address.",
  early:"Flick, watch, and loot — your chip is honest and the bubble windows are the lane. One dream per cycle is winning.",
  mid:"Luden's onward, hunt from fog: bubble the river entries, Q the dreams, and loot the summoner panic. Your pick game sets up every objective.",
  late:"You are the lottery their positioning keeps funding: bubble the choke, one-shot the sleeper, and portal out of the consequences.",
  safetyTool:"R Portal Jump",
  spikesLine:"Level 3 bubble-Q is the pattern; level 6 multiplies the angles; Luden's makes the dream a deletion.",
  carryLine:"Carry through picks — one slept carry per objective is a won game; your job is the fog discipline that makes dreams land.",
  behindShort:"farm with Q flicks and stay relevant through sleep picks.",
  loadingRule:"The bubble is your life and your kill — never spend both meanings at once.",
  dontDetail:"Your R returns you to the cast spot — every blink writes a two-second appointment an assassin can keep.",
  aheadTpl:"Ahead, haunt the fog: bubble {E}'s every path, one-shot the dreams, and loot the map's panic — fed Zoe makes vision score a survival stat.",
  behindTpl:"Behind, the lottery still runs: farm flicks, bank bubbles for dives, and pick the overextended — one dream-shot resets any deficit Zoe acknowledges.",
  spikeName:"Luden's",
  runeReport:"Electrocute, Cheap Shot, Eyeball Collection, Ultimate Hunter; secondary Sorcery — Manaflow + Transcendence (Scorch alt).",
  summReport:"Flash + Ignite or Flash + TP — and remember you'll loot half a dozen more summoners off W; spend the stolen Flashes rudely.",
  itemReport:"Start Doran's Ring + 2 pots. Luden's into Sorcerer's, then Shadowflame and Rabadon's. Zhonya's vs dive — the stopwatch covers your R return spot.",
  jungleLine:"A landed bubble is the easiest gank in League — sleep, point, collect. Bubble the river entry as your jungler paths and the kill pre-books itself.",
  redditLine:"distance is damage, the bubble is both your lives, and loot everything — Zoe wins by making the map dream at the worst possible times.",
  load:{
    sub:"r/zoemains",
    start:"Doran's Ring + 2 Health Potions",
    normalBack:"Lost Chapter (≈1300g) — flicks go infinite",
    antihealBack:"Oblivion Orb (≈800g) — cuts his sustain",
    antihealNote:"Oblivion Orb early into his sustain.",
    firstItem:"Luden's Companion",
    secondItem:"Shadowflame",
    boots:"Sorcerer's Shoes",
    bootsVsAP:"Sorcerer's Shoes / Mercury's Treads",
    bootsVsAD:"Sorcerer's Shoes / Plated Steelcaps",
    spike:"Luden's + Shadowflame — sleep into max-range Q one-shots squishies.",
    runes:{ keystone:"Electrocute", primaryTree:"Domination", primary:["Cheap Shot","Eyeball Collection","Ultimate Hunter"], tree:"Sorcery", secondary:["Manaflow Band","Transcendence"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    yasuo:{ tldr:"Wind Wall eats the bubble AND the Q — the full kit. Bait the wall with a short flick, bubble behind his dash-chain, and accept the farm lane until he miscounts.",
      dos:["Bait the wall before the real bubble","Sleep the chain's landing spot","Never max-range Q into an up wall"] },
    fizz:{ tldr:"His E dodges the bubble, the Q, and the consequences — the design counter. Hug tower post-6, bubble his Q-dash only, and loot your way to relevance." },
    kassadin:{ tldr:"Bully the melee mage with flicks all lane — but his shield eats the bubble's magic; sleep him AFTER the shield pops, and end before Riftwalk argues." }
  }
}
];

// MatchupCoach — BOT generator configs batch 4: Corki, Ezreal, Kalista, Lucian, Miss Fortune.
window.GEN_BOT_CFGS_4 = [

{
  key:'corki', name:'Corki',
  curve:[0.0,0.1,0.2,0.3,0.3,0.4,0.4],
  lvl:[
    "Q-poke the contacts — the bomb splashes the duo and your mixed autos confuse every armor plan at one.",
    "Trade short and strafe out — your kit wants skirmishes measured in seconds.",
    "Full kit: Q-E trades shred resists and the W keeps every exchange optional.",
    "R-spam the poke war — every third missile is a BIG one; count them like a fourth ability.",
    "The Big One count begins — the barrage spike flips river fights; time it like an objective spawn.",
    "First item spike: the missile chip war is officially yours — siege with the count.",
    "Late Corki is a poke siege with mixed damage: missile the setup, Big One the engage, strafe the answer."
  ],
  diffBase:{ hyper:'EVEN', utility:'EVEN', apc:'EVEN' },
  diffEx:{ caitlyn:'TRICKY', draven:'TRICKY', lucian:'TRICKY', samira:'EVEN', tristana:'EVEN', kalista:'EVEN', missfortune:'EVEN',
    jinx:'EVEN', kogmaw:'TRICKY', twitch:'EVEN', vayne:'EVEN', zeri:'EVEN', smolder:'EVEN', aphelios:'EVEN', senna:'EVEN', nilah:'TRICKY', kaisa:'EVEN', ashe:'EVEN', jhin:'EVEN',
    heimerdinger:'TRICKY', seraphine:'EVEN', ziggs:'TRICKY', karthus:'EVEN', veigar:'EVEN', swain:'EVEN', ezreal:'EVEN', sivir:'EVEN', varus:'EVEN', xayah:'EVEN' },
  vs:{
    hyper:{
      tldr:"His curve wants a quiet lane — your missiles bill it per wave and the two-item spike audits the all-in.",
      breakdown:"Chip with R on every contact, splash Q the duo, and strafe the engage windows. The mixed damage means his armor page lies to him all game.",
      dos:["Missile-chip every wave contact","Splash the duo with Q bombs","Big One the river fight he forces"],
      donts:["Race auto DPS at his spikes","Strafe for tempo instead of exits","Hold the big missile for perfect moments"],
      win:"Bill the lane in missiles and audit the scaling with the two-item spike."
    },
    utility:{
      tldr:"A utility mirror with mixed damage cheating — trade tool-for-tool and let the resist confusion pay the margins.",
      breakdown:"Match his poke with R-counts, dodge {K}, and gatling the extended exchanges — his armor answers half your kit and the other half collects.",
      dos:["Win the poke count war with R","Gatling the extended trade windows","Dodge {K} before stepping to missile"],
      donts:["Face-tank his signature spell at even HP","Waste W on poke spacing","Trade autos inside his range trick"],
      win:"Out-poke the toolbox with mixed math it can't itemize against."
    },
    apc:{
      tldr:"A poke war against real cooldowns — your missiles cycle faster than his rotation and the Big One ends sieges.",
      breakdown:"Trade missile-for-spell and win on cadence: his rotation has gaps, your R barely does. The Big One breaks the siege stalemate his zone built.",
      dos:["Out-cadence his rotation with R","Big One the siege stalemate","Q-splash the casting positions"],
      donts:["Eat full rotations for one missile","Walk the painted floor for chip","Dive the nest without Valkyrie"],
      win:"Out-cycle the cooldown class and deliver the tiebreaker by air."
    }
  },
  mirror:{
    tldr:"Missile mirror — big-missile counts and Valkyrie timers; whoever lands the Big One first flips the lane.",
    breakdown:"Track both big-missile counters, trade on his small ones, and hold your Valkyrie for his engage — the counter-strafe wins.",
    dos:["Trade into his small-missile windows","Counter-Valkyrie his engage","Win the count war aloud"],
    donts:["Eat the big one at even HP","Ult first without setup","Strafe-duel at parity"],
    win:"Better counting, later Valkyrie — the cleaner pilot wins.",
    winS:"His escape is spent — missile the window and gatling the rest."
  },
  winS:"His escape is spent — missile the window and gatling the rest.",
  tradeGood:"Q-splash the contact, R the retreat, strafe back — a three-part chip his armor page mispriced.",
  tradeBad:"Spending W on spacing and meeting the engage on foot — the strafe is your Flash with a burn trail; budget it.",
  waveBest:"a missile-thinned slow push that crashes on your Big One windows — the barrage is the play; the wave is the alibi.",
  waveWorst:"a shoved wave with Valkyrie burned — a poke pilot with no dash and no exits.",
  early:"Chip in mixed denominations — the lane can't itemize against you; bank the confusion.",
  mid:"Missile economy runs the rivers: missile the setups, Big One the engages, and strafe the answers.",
  late:"You are the siege: R the choke from fog, Big One the stalled fight, and gatling whatever the burn trail herds.",
  safetyTool:"W Valkyrie",
  spikesLine:"First item arms the missile war; the Big One flips rivers; two items make the chip a siege.",
  carryLine:"Carry through cadence — the missiles never stop billing; your job is the count and the Big One timing.",
  behindShort:"farm with Q splash and stay relevant through missile poke.",
  loadingRule:"Count to the big missile — it's your fourth ability.",
  dontDetail:"The Big One is a resource — wasting it on a dead lane is a dragon given away.",
  aheadTpl:"Ahead, raise the postage: missile {E} off every wave, Big One the fights he avoids, and siege the towers bare.",
  behindTpl:"Behind, the mail still runs: chip from range, strafe their dives, and land one Big One that resets the river.",
  spikeName:"first item",
  runeReport:"Fleet Footwork or First Strike, Presence of Mind, Legend: Bloodline, Coup de Grace; secondary Sorcery — Manaflow + Gathering Storm.",
  summReport:"Flash + Heal standard — the W is the third summoner; spend it like one.",
  itemReport:"Start Doran's Blade + pot. Trinity or ER first, Berserker's, then mixed-damage paths — the kit splits their armory.",
  jungleLine:"Ult WITH your jungler's gank and the river fight starts 2v0 — ping your Big One windows like drake timers.",
  redditLine:"count the missiles, time the mail, and strafe with a plan — Corki wins by billing in two currencies.",
  load:{
    sub:"r/CorkiMains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Sheen (≈900g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Trinity Force / ER",
    secondItem:"Mixed-damage path",
    boots:"Berserker's / Sorcerer's",
    bootsVsAP:"Mercury's Treads",
    bootsVsAD:"Plated Steelcaps",
    spike:"Trinity + missiles — the chip war becomes a siege engine.",
    runes:{ keystone:"Fleet Footwork", primaryTree:"Precision", primary:["Presence of Mind","Legend: Bloodline","Coup de Grace"], tree:"Sorcery", secondary:["Manaflow Band","Gathering Storm"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    heimerdinger:{ tldr:"The nest out-zones your strafe range — Q-splash the turrets from max distance and save the Big One for the apartment complex itself." },
    caitlyn:{ tldr:"She out-ranges the missile war — chip off cooldown from fog angles and Big One the trap geometry she hides behind." }
  }
},

{
  key:'ezreal', name:'Ezreal',
  curve:[0.1,0.2,0.2,0.3,0.4,0.4,0.3],
  lvl:[
    "Q the gaps on every contact — each hit refunds the next; accuracy is your tempo stat.",
    "W-Q double-procs begin: the orb detonation is the real chunk; sequence it.",
    "Arcane Shift online — the lane's safest carry just clocked in; poke like rent is due.",
    "Q-cadence the wave contacts and stack the passive — your DPS ramps off your own aim.",
    "Trueshot Barrage online — clear their reset wave from base and chip the objective setups.",
    "Trinity/Muramana spike: the Q chip becomes a mugging — every gap is a health bar invoice.",
    "Late Ezreal kites from postcode range: W-Q the divers, E the answer, and barrage the cleanup."
  ],
  diffBase:{ hyper:'EVEN', utility:'EVEN', apc:'EVEN' },
  diffEx:{ caitlyn:'TRICKY', draven:'TRICKY', lucian:'TRICKY', samira:'EVEN', tristana:'EVEN', kalista:'EVEN', missfortune:'TRICKY',
    jinx:'EVEN', kogmaw:'EVEN', twitch:'EVEN', vayne:'EVEN', zeri:'EVEN', smolder:'EVEN', aphelios:'EVEN', senna:'EVEN', nilah:'EVEN', kaisa:'EVEN', ashe:'EVEN', jhin:'EVEN',
    heimerdinger:'TRICKY', seraphine:'TRICKY', ziggs:'TRICKY', karthus:'EVEN', veigar:'EVEN', swain:'TRICKY', corki:'EVEN', sivir:'EVEN', varus:'EVEN', xayah:'EVEN' },
  vs:{
    hyper:{
      tldr:"His stream needs proximity your blink refuses — Q the gaps, E the engages, and out-tempo the curve with chip.",
      breakdown:"Poke the contacts and never offer the auto war: your Q refund out-cycles his DPS windows and the E deletes his all-in. The mugging compounds while his curve waits.",
      dos:["Q-chip every wave contact","E the all-in he eventually forces","W-Q the duo trade windows"],
      donts:["Auto-war a hypercarry at parity","Blink for tempo instead of survival","Stand behind minions and idle — find angles"],
      win:"Chip the curve into irrelevance and blink past its one argument."
    },
    utility:{
      tldr:"A poke mirror your blink referees — trade Qs evenly and let the E delete the trick exchanges.",
      breakdown:"Utility mirrors come down to cadence and escapes: out-land the Qs, dodge {K}, and keep the blink banked for the one setup that matters.",
      dos:["Win the Q-accuracy war","Bank E strictly for the setup","Double-proc the W on his trades"],
      donts:["Eat {K} with E down","Trade behind even minion cover","Blink-poke out of boredom"],
      win:"Out-aim the mirror and referee it with the blink."
    },
    apc:{
      tldr:"A skillshot duel against rotations — your Q cycles faster and your E dodges the one that matters.",
      breakdown:"Trade Q-for-spell on cadence and blink the centerpiece: mage rotations have one big moment; your chip has forty small ones.",
      dos:["Out-cadence the rotation with Q","E the centerpiece spell exactly","Barrage the resets his zone protects"],
      donts:["Eat rotations counting refunds","Blink into the painted floor","Siege the nest without the duo"],
      win:"Forty small invoices beat one big rotation — cycle and blink."
    }
  },
  mirror:{
    tldr:"Blink mirror — Q accuracy and E discipline; whoever burns the blink first farms the next nineteen seconds afraid.",
    breakdown:"Dodge his Qs behind minions, land yours in the gaps, and hold your E one beat longer — the mirror is patience with a passport.",
    dos:["Win the Q-landing ledger","Hold E one beat past his","Punish his blink cooldown loudly"],
    donts:["Trade Q-for-Q at his rhythm","Blink first in the standoff","W-duel at even HP"],
    win:"Later blink, better aim — the mirror pays the patient.",
    winS:"His E is down — nineteen seconds of honest carry; collect."
  },
  winS:"His answer is spent — Q the window and cycle the chip.",
  tradeGood:"W the orb, Q the proc, strafe out — the double-detonation he priced as poke.",
  tradeBad:"Blinking for chip position with their engage loaded — the E is the whole safety thesis; spending it on style is the obituary.",
  waveBest:"a thin wave with open Q lanes — your DPS is a skillshot; manage the cover like mana.",
  waveWorst:"a stacked wave wall-to-wall — the marksman whose autos need a floor plan.",
  early:"Aim the rent — Q-chip the contacts and bank refunds; the lane is an accuracy exam with a safety net.",
  mid:"Trinity onward, mug the map: chip the setups, barrage the resets, and E the one mistake they force per fight.",
  late:"You kite from the next postcode: W-Q the divers, blink the answer, and barrage whatever leaves low.",
  safetyTool:"E Arcane Shift",
  spikesLine:"First item turns chip into mugging; level 6 adds the global; two items make every gap an invoice.",
  carryLine:"Carry through cadence — the Q never stops billing and the E never stops apologizing; your job is the aim.",
  behindShort:"farm with Q cycles and stay relevant through poke and the blink.",
  loadingRule:"Accuracy is tempo — every landed Q funds the next.",
  dontDetail:"The blink is the entire safety budget — spent on poke angles, the next hook reads your mail.",
  aheadTpl:"Ahead, raise the rent: chip {E} off every contact, barrage the resets, and blink past the comeback attempts.",
  behindTpl:"Behind, the meter still runs: Q-farm from range, E their dives, and let the chip war rebuild the ledger.",
  spikeName:"Trinity / Muramana",
  runeReport:"Fleet... no — First Strike or PTA-lines... standard: Fleet Footwork, Presence of Mind, Legend: Bloodline, Coup de Grace; secondary Inspiration — Magical Footwear + Biscuits.",
  summReport:"Flash + Heal standard; some run Cleanse — the E already half-plays Flash.",
  itemReport:"Start Doran's Blade + Tear plan. Trinity or Muramana-Manamune first, Lucidity, then Serylda's paths — haste cycles the Q meter.",
  jungleLine:"Your chip sets dives without committing — Q the target to half, then ping; Ezreal ganks are pre-billed.",
  redditLine:"land the Qs, bank the blink, and never get touched — Ezreal wins games from behind a velvet rope.",
  load:{
    sub:"r/ezrealmains",
    start:"Doran's Blade + Health Potion (Tear plan)",
    normalBack:"Tear + Sheen (≈1300g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Trinity / Muramana",
    secondItem:"Serylda's path",
    boots:"Ionian Lucidity",
    bootsVsAP:"Mercury's Treads / Lucidity",
    bootsVsAD:"Plated Steelcaps / Lucidity",
    spike:"Muramana + Trinity — every landed Q is a mugging with a receipt.",
    runes:{ keystone:"Fleet Footwork", primaryTree:"Precision", primary:["Presence of Mind","Legend: Bloodline","Coup de Grace"], tree:"Inspiration", secondary:["Magical Footwear","Biscuit Delivery"], shards:["Attack Speed","Adaptive Force","Health"] }
  },
  specials:{
    samira:{ tldr:"Her whirl eats the Q-W mail mid-flight — chip only while the whirl is down and E the surf she rides in on." },
    heimerdinger:{ tldr:"The nest body-blocks your entire kit — Q the turrets at max range, never blink into the complex, and barrage the rebuild." }
  }
},

{
  key:'kalista', name:'Kalista',
  curve:[0.5,0.5,0.5,0.4,0.3,0.4,0.0],
  lvl:[
    "Hop-weave the level 1 autos — your passive dodges while it DPSes; the lane learns the dance or bleeds.",
    "Rend threats begin: three spears is a real chunk — stack, slash, repeat.",
    "Full kit: the hop-weave plus Rend executes makes every short trade yours by arithmetic.",
    "Stack spears in duo trades and cash Rend on the disengage — the bill always arrives late.",
    "Fate's Call online — your support is now a projectile; every brush is an engage threat.",
    "First item spike: the hop-DPS out-duels the lane. Cash the act before the fall-off files.",
    "Late Kalista is the objective thief and the engage: Rend the drake, toss the support, hop the answer."
  ],
  diffBase:{ hyper:'FAVOURED', utility:'EVEN', apc:'EVEN' },
  diffEx:{ caitlyn:'EVEN', draven:'EVEN', lucian:'EVEN', samira:'EVEN', tristana:'EVEN', missfortune:'EVEN', ashe:'EVEN', jhin:'EVEN',
    jinx:'FAVOURED', kogmaw:'FAVOURED', twitch:'FAVOURED', vayne:'FAVOURED', zeri:'FAVOURED', smolder:'FAVOURED', aphelios:'FAVOURED', senna:'EVEN', nilah:'EVEN', kaisa:'FAVOURED',
    heimerdinger:'TRICKY', seraphine:'EVEN', ziggs:'TRICKY', karthus:'EVEN', veigar:'EVEN', swain:'TRICKY', corki:'EVEN', ezreal:'EVEN', sivir:'EVEN', varus:'EVEN', xayah:'EVEN' },
  vs:{
    hyper:{
      tldr:"Your hop out-duels his stream all laning phase — stack the spears, cash the Rends, and end before the curve testifies.",
      breakdown:"No hypercarry matches the hop-weave pre-items: trade on every contact, Rend the disengages, and toss your support at the overstep. The fall-off is real — the lead must become drakes and towers.",
      dos:["Hop-trade every wave contact","Rend the disengage, not the face","Convert leads to drakes — you steal them too"],
      donts:["Coast at even farm — the act expires","Hop backward out of habit, forward wins trades","Trade at his two-item court date"],
      win:"Out-dance the stream early and bank the act in objectives."
    },
    utility:{
      tldr:"A utility mirror your hops referee — trade tool-for-tool and let the Rend bill settle the margins.",
      breakdown:"Match his poke with spear-stacks, dodge {K}, and remember your R is the lane's only support-shaped projectile — the 2v2 is rigged when your duo cooperates.",
      dos:["Stack spears through his tool windows","Toss the support at his overstep","Cash Rend on every disengage"],
      donts:["Eat {K} mid-hop-rhythm","Trade without your Oathsworn near","Greed stacks past the all-in math"],
      win:"Out-rig the 2v2 with the toss and bill the margins in spears."
    },
    apc:{
      tldr:"He zones a dancer — hop the angles his aim can't track and Rend the chip war's ledger.",
      breakdown:"Mage zones tax hop-paths, not hops: weave off-axis, stack off the W bonus with your support, and toss the engage through his rotation gap.",
      dos:["Weave off his aim axis","Toss the engage through the gap","Rend the half-bar he walks home with"],
      donts:["Hop predictable triangles vs skillshots","Trade inside the painted zone","Dive the nest without the toss"],
      win:"Out-dance the aim and deliver the support to the cooldown gap."
    }
  },
  mirror:{
    tldr:"Spear mirror — hop rhythm against hop rhythm; whoever cashes Rend at fuller stacks wins each exchange.",
    breakdown:"Out-weave her axis, deny her stack windows, and toss second — her engage feeds your counter-toss information.",
    dos:["Cash Rend fuller than hers","Weave off her auto axis","Toss second with information"],
    donts:["Trade at spear parity blind","Hop her predicted triangle","R-duel at even tempo"],
    win:"Fuller Rends, later toss — the better dancer collects.",
    winS:"Her hops are committed — the axis is yours; collect."
  },
  winS:"His escape is spent — stack the spears and slash the bill.",
  tradeGood:"Hop-weave three autos in a duo trade and Rend the walk-away — the bill arrives after he thought the trade ended.",
  tradeBad:"Hop-weaving without an attack target mid-gank — Kalista's mobility is attack-commanded; no target, no dance, no Kalista.",
  waveBest:"a controlled push you dance through — every minion is a hop-target and the crash is a Rend invoice.",
  waveWorst:"an empty lane against a hook — no targets to weave off is no passive at all.",
  early:"Dance the contacts — your 1-5 out-duels the role; spend it on spears and plates.",
  mid:"Rend economy runs the objectives: stack the drake, slash the steal, and toss the support at every river fight.",
  late:"You are the engage and the thief: Fate's Call the flank, Rend the objective, and hop the peel that answers.",
  safetyTool:"R Fate's Call (defensive pull)",
  spikesLine:"Level 1 hops bully; level 6 weaponizes the support; first item peaks the act — spend it.",
  carryLine:"Carry through the dance — the hop-DPS out-duels everything early; your job is converting before the music stops.",
  behindShort:"farm with hop-weaves and stay relevant through Rend steals and the toss.",
  loadingRule:"Hop forward in trades — backward hops win nothing.",
  dontDetail:"Your R pulls the support IN before it throws them — a panicked toss with no target is two people apologizing mid-air.",
  aheadTpl:"Ahead, conduct: zone {E} with hop threat, Rend every objective, and toss the support at the comeback attempts.",
  behindTpl:"Behind, the dance still steals: stack quietly, Rend the drakes, and let one toss-engage reset the script.",
  spikeName:"first item",
  runeReport:"Hail of Blades or Lethal Tempo, Triumph, Legend: Bloodline, Coup de Grace; secondary Domination — Taste of Blood + Treasure Hunter.",
  summReport:"Flash + Heal standard — and remember the R is a second Heal-shaped save for your support.",
  itemReport:"Start Doran's Blade + pot. BotRK or Kraken first, Berserker's, then Runaan's paths — attack speed feeds the spear count.",
  jungleLine:"Your R toss converts any jungler arrival into a knockup engage — ping the brush windows; the 3v2 is pre-rigged.",
  redditLine:"hop forward, Rend late, and toss with consent — Kalista wins lanes on rhythm and games on steals.",
  load:{
    sub:"r/KalistaMains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Recurve / Cutlass (≈1000g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"BotRK / Kraken",
    secondItem:"Runaan's path",
    boots:"Berserker's Greaves",
    bootsVsAP:"Mercury's Treads / Berserker's",
    bootsVsAD:"Plated Steelcaps / Berserker's",
    spike:"First item — the hop-DPS out-duels the role; cash the act.",
    runes:{ keystone:"Hail of Blades", primaryTree:"Domination", primary:["Taste of Blood","Eyeball Collection","Treasure Hunter"], tree:"Precision", secondary:["Triumph","Coup de Grace"], shards:["Attack Speed","Adaptive Force","Health"] }
  },
  specials:{
    heimerdinger:{ tldr:"The nest gives your hops nothing safe to weave toward — Rend-clear turrets at range and toss the engage only with the grenade down." },
    draven:{ tldr:"The one duel your dance respects — hop off-axis from the axes, Rend his catch windows, and toss the support at the juggle." }
  }
},

{
  key:'lucian', name:'Lucian',
  curve:[0.6,0.5,0.5,0.4,0.3,0.4,-0.1],
  lvl:[
    "Passive double-shots on every spell — the Q-auto-auto string bullies from minute one.",
    "W-mark trades begin: the bolt's mark feeds your duo's procs; the lane is already a 2v2 you rigged.",
    "E joins: dash-weave the full string — your burst window out-damages everything in the role at 3.",
    "String the contacts on cooldown: Q-aa-E-aa-W-aa — six shots in two seconds; the lane should flinch.",
    "The Culling online — the corridor execute punishes every disengage that runs straight.",
    "First item spike: the string deletes half bars. The act peaks here — cash it.",
    "Late Lucian dashes the seams: string the carry, dash the answer, and cull the corridor they retreat through."
  ],
  diffBase:{ hyper:'FAVOURED', utility:'EVEN', apc:'EVEN' },
  diffEx:{ caitlyn:'EVEN', draven:'EVEN', samira:'EVEN', tristana:'EVEN', kalista:'EVEN', missfortune:'EVEN', ashe:'EVEN', jhin:'EVEN',
    jinx:'FAVOURED', kogmaw:'FAVOURED', twitch:'FAVOURED', vayne:'FAVOURED', zeri:'FAVOURED', smolder:'FAVOURED', aphelios:'FAVOURED', senna:'EVEN', nilah:'EVEN', kaisa:'FAVOURED',
    heimerdinger:'TRICKY', seraphine:'EVEN', ziggs:'TRICKY', karthus:'EVEN', veigar:'EVEN', swain:'EVEN', corki:'EVEN', ezreal:'EVEN', sivir:'EVEN', varus:'EVEN', xayah:'EVEN' },
  vs:{
    hyper:{
      tldr:"Your burst string is his laning phase nightmare — dash the windows, double-shot the math, and end before his curve graduates.",
      breakdown:"No hypercarry survives the full string pre-items: open off any support CC, weave the passive doubles, and cull the Flash. Your fall-off is the deadline; the lane is the heist.",
      dos:["String off every support CC","Weave doubles after each spell","Cash the lead in plates and drakes"],
      donts:["Coast at even farm — the act has a runtime","Dash in with the string on cooldown","Trade at his two-item spike"],
      win:"Rob the curve at gunpoint and leave before it matures."
    },
    utility:{
      tldr:"A bully mirror your double-shots tilt — string the tool gaps and dash the answer he saved for it.",
      breakdown:"Utility kits hold one answer to your dash: bait it with string threat, then run the real burst into the cooldown. The W mark keeps your duo's math rigged.",
      dos:["Bait {K} before the real string","Mark the duo trades with W","Dash sideways, never straight in"],
      donts:["Dash first into the held answer","Trade at parity without doubles ready","Cull crowds instead of corridors"],
      win:"Spend their answer with feints and string the silence."
    },
    apc:{
      tldr:"He zones a dasher with cooldowns — weave the gaps, dash the rotation, and string the mage mid-reload.",
      breakdown:"Mage zones tax the approach your E ignores once per rotation: poke with Q-doubles at range, dash the gap, and finish with the string his cooldowns can't answer.",
      dos:["Q-double the casting windows","Dash strictly in rotation gaps","Cull the retreat corridor"],
      donts:["Eat rotations between strings","Dash the painted floor","Dive the nest stringless"],
      win:"Out-tempo the rotation class and bill it in doubles."
    }
  },
  mirror:{
    tldr:"Lightslinger mirror — string economy and dash discipline; whoever dashes second strings the truth.",
    breakdown:"Trade doubles evenly, hold E for his commit, and cull second — his corridor feeds yours information.",
    dos:["Dash second with information","Win the double-shot ledger","String his post-dash cooldown"],
    donts:["Dash-duel at parity","Trade strings at his rhythm","Cull first in the standoff"],
    win:"Second dash wins the mirror — patience slings cleaner light.",
    winS:"His dash is down — string him; there's no answer left."
  },
  winS:"His escape is spent — dash the gap and run the full string.",
  tradeGood:"Q-double the contact, E-weave another pair, W the mark, walk — six shots his trade pattern budgeted as two.",
  tradeBad:"Dashing in first against a held answer — Lucian's E is the string's spine; spent on style, the act is a mime.",
  waveBest:"a controlled push you string from — the wave is the stage and the doubles are the tickets.",
  waveWorst:"a frozen wave at two items — the act's runtime expired and the rent is due in fall-off.",
  early:"Bully in strings — your 1-5 burst leads the role; the only question is conversion speed.",
  mid:"Cash the act: dash the skirmish seams, string the carries, and cull the corridors before your curve flattens.",
  late:"You are the seam-dasher: string the priority target, dash the peel, and cull the lane they leave through.",
  safetyTool:"E Relentless Pursuit",
  spikesLine:"Level 3 strings bully; level 6 punishes corridors; first item peaks the act — spend it loudly.",
  carryLine:"Carry through the string — six shots in two seconds answers most arguments; your job is the dash discipline.",
  behindShort:"farm with Q doubles and stay relevant through burst strings.",
  loadingRule:"Doubles after every spell — the passive is half the champion.",
  dontDetail:"The dash resets on... nothing — it's one dash; the Lucian who forgets that meets the hook mid-flourish.",
  aheadTpl:"Ahead, perform at gunpoint: string {E} off every CC, take the plates, and cull the comeback corridors.",
  behindTpl:"Behind, string the margins: double-shot the farm, dash their dives, and rebuild through skirmish seams.",
  spikeName:"first item",
  runeReport:"PTA or Fleet, Triumph, Legend: Bloodline, Coup de Grace; secondary Sorcery — Absolute Focus + Gathering Storm.",
  summReport:"Flash + Heal standard; Ignite-Lucian lanes declare level-2 intent — pick by support.",
  itemReport:"Start Doran's Blade + pot. ER or Collector first, Berserker's, then RFC-IE — haste cycles the doubles.",
  jungleLine:"Any CC your duo lands eats the full string — ping the all-in windows; Lucian ganks pay in plates.",
  redditLine:"spell-weave the doubles, dash second, and cull corridors not crowds — Lucian wins lanes that end on time.",
  load:{
    sub:"r/LucianMains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Sheen / Pickaxe (≈1000g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Essence Reaver / Collector",
    secondItem:"RFC / IE",
    boots:"Berserker's Greaves",
    bootsVsAP:"Mercury's Treads / Berserker's",
    bootsVsAD:"Plated Steelcaps / Berserker's",
    spike:"First item — the string deletes half bars; the act peaks now.",
    runes:{ keystone:"Press the Attack", primaryTree:"Precision", primary:["Triumph","Legend: Bloodline","Coup de Grace"], tree:"Sorcery", secondary:["Absolute Focus","Gathering Storm"], shards:["Attack Speed","Adaptive Force","Health"] }
  },
  specials:{
    heimerdinger:{ tldr:"The nest eats dashers — string the turrets at range, never E into the complex, and convert the lead in other lanes." },
    samira:{ tldr:"The bully civil war — her whirl eats your Culling; string her W's cooldown and dash AWAY from the blender, not through it." }
  }
},

{
  key:'missfortune', name:'Miss Fortune',
  curve:[0.5,0.5,0.4,0.4,0.4,0.4,0.1],
  lvl:[
    "Love-tap the duo — swap targets every auto and the passive bullies from minute one.",
    "Q-bounce threats begin: never let his support stand behind a low minion; the bounce crits.",
    "E-zone the trades: the rain slows the answer and the strut closes the ledger.",
    "Chip with taps and bounces — your lane DPS leads the role while your strut mocks the trade-backs.",
    "Bullet Time online — any support CC is now a teamfight's worth of crits in two seconds.",
    "First item spike: the bounce executes and the R channels start winning 2v2s alone.",
    "Late MF is the channel: position off the engage, R the clump, and strut away from the survivors."
  ],
  diffBase:{ hyper:'FAVOURED', utility:'EVEN', apc:'EVEN' },
  diffEx:{ caitlyn:'EVEN', draven:'EVEN', lucian:'TRICKY', samira:'EVEN', tristana:'EVEN', kalista:'EVEN', ashe:'EVEN', jhin:'EVEN',
    jinx:'FAVOURED', kogmaw:'FAVOURED', twitch:'FAVOURED', vayne:'FAVOURED', zeri:'FAVOURED', smolder:'FAVOURED', aphelios:'FAVOURED', senna:'EVEN', nilah:'EVEN', kaisa:'FAVOURED',
    heimerdinger:'TRICKY', seraphine:'EVEN', ziggs:'TRICKY', karthus:'EVEN', veigar:'EVEN', swain:'EVEN', corki:'EVEN', ezreal:'TRICKY', sivir:'EVEN', varus:'EVEN', xayah:'EVEN' },
  vs:{
    hyper:{
      tldr:"Your lane DPS is his scaling tax — tap the duo, bounce the cover, and channel the 2v2 he can't unsubscribe from.",
      breakdown:"No hypercarry out-trades love-taps pre-items: bully the contacts, E the disengage, and R off any support CC. The lead converts or the curve collects — pick the former.",
      dos:["Tap-swap targets every trade","Q-bounce his low-minion cover","R off any support CC window"],
      donts:["Channel R into open peel","Coast at even farm — the tax expires","Trade at his item court dates"],
      win:"Tax the curve with taps and channel the verdict early."
    },
    utility:{
      tldr:"A bully mirror your passive tilts — tap the margins, zone the answers, and channel the stalemates.",
      breakdown:"Match his tools with E-zones and strut resets; dodge {K} and the tap ledger decides the rest. The R breaks every even 2v2.",
      dos:["Win the tap ledger in duo trades","E-zone his trade windows","Channel the even 2v2s open"],
      donts:["Eat {K} mid-channel — track it first","Strut into the poke for style","Bounce-poke without the angle"],
      win:"Out-margin the toolbox and channel the tiebreaks."
    },
    apc:{
      tldr:"He zones the channel you want — chip with bounces, dodge the rotation, and R the cooldown silence.",
      breakdown:"Mage zones interrupt Bullet Time; sequence around them: poke with Q-angles, E his casting spots, and channel only after the rotation shows.",
      dos:["Bounce the casting positions","Channel strictly post-rotation","E-zone the wave contests"],
      donts:["R into a banked interrupt","Eat rotations holding the channel","Walk the painted floor for taps"],
      win:"Bill the rotation gaps and channel the silence after."
    }
  },
  mirror:{
    tldr:"Bounty mirror — tap economy and channel chicken; whoever Rs into the other's open cone donates the 2v2.",
    breakdown:"Win the tap-swap ledger, E her channel spots, and R second — her cone is your interrupt window.",
    dos:["Out-tap the swap war","Interrupt her channel with anything","R second, always"],
    donts:["Channel-duel face to face","Stand behind low minions — her bounce crits","Strut-trade at parity"],
    win:"Second channel wins — the patient pirate collects.",
    winS:"Her R is down — the 2v2 is a tap ledger you lead."
  },
  winS:"His escape is spent — rain the zone and channel the verdict.",
  tradeGood:"Tap him, tap the support, bounce the Q off the dying minion — three damage sources in one trade window.",
  tradeBad:"Channeling R into open peel — Bullet Time is a verdict, not an opening statement; interrupted channels fund highlight reels.",
  waveBest:"a controlled push with the duo zoned by E — the rain decides where trades happen; you decide when.",
  waveWorst:"a frozen wave against poke with strut broken — the bully without margins is just a bounty.",
  early:"Tap everything — your lane DPS leads the role; the ledger compounds while their kit waits for items.",
  mid:"Channel economy: R the river clumps off any CC, bounce the sieges, and strut between the margins.",
  late:"You are the cone: position one step behind the engage, channel the grouped, and let two seconds of crits read the verdict.",
  safetyTool:"W Strut (reset)",
  spikesLine:"Level 1 taps bully; level 6 weaponizes CC windows; first item makes the bounce execute.",
  carryLine:"Carry through the cone — one clean channel is a teamfight; your job is the position that protects two seconds.",
  behindShort:"farm with taps and stay relevant through R windows.",
  loadingRule:"Swap targets every auto — the passive is the lane.",
  dontDetail:"The channel roots YOU — casting it without the engage spent is volunteering as the fight's intermission.",
  aheadTpl:"Ahead, run the ledger: tap {E} off every contact, bounce the cover, and channel the objections closed.",
  behindTpl:"Behind, the taps still bill: chip the margins, zone their dives, and channel one clump that resets the books.",
  spikeName:"first item",
  runeReport:"PTA or First Strike, Triumph, Legend: Bloodline, Coup de Grace; secondary Sorcery — Manaflow + Gathering Storm.",
  summReport:"Flash + Heal standard; the strut is the third summoner if you stop taking chip.",
  itemReport:"Start Doran's Blade + pot. Collector or ER first, Berserker's/Swifties, then IE — lethality-crit hybrids feed the bounce.",
  jungleLine:"Any CC your duo or jungler lands is a full Bullet Time — ping the channel windows; MF ganks pay in pentakill threats.",
  redditLine:"tap-swap the duo, bounce the cover, and channel verdicts not greetings — MF wins lanes on margins and fights on cones.",
  load:{
    sub:"r/MissFortuneMains",
    start:"Doran's Blade + Health Potion",
    normalBack:"Serrated Dirk / Pickaxe (≈1100g)",
    antihealBack:"Executioner's Calling (≈800g) — cuts his sustain",
    antihealNote:"Executioner's early into his sustain.",
    firstItem:"Collector / ER",
    secondItem:"Infinity Edge",
    boots:"Swiftness / Berserker's",
    bootsVsAP:"Mercury's Treads",
    bootsVsAD:"Plated Steelcaps",
    spike:"Collector + IE — the bounce executes and the cone ends arguments.",
    runes:{ keystone:"Press the Attack", primaryTree:"Precision", primary:["Triumph","Legend: Bloodline","Coup de Grace"], tree:"Sorcery", secondary:["Manaflow Band","Gathering Storm"], shards:["Adaptive Force","Adaptive Force","Health"] }
  },
  specials:{
    samira:{ tldr:"Her whirl eats the cone's bullets — channel only with her W confirmed spent, and tap the style meter before it grades." },
    ezreal:{ tldr:"His blink dodges the channel and his poke out-ranges the taps — bounce the gaps, zone the blink landing, and R only post-E." }
  }
}
];

// MatchupCoach — SUPPORT generator configs batch 4: Rell, Tahm Kench, Taric, Bard, Blitzcrank, Nautilus.
function _supBase4(o){ return Object.assign({
  curve:[0.2,0.3,0.3,0.3,0.3,0.3,0.2],
  winS:"His answer is spent — start the chain with your carry ready.",
  waveBest:"a lane your carry holds at the midline while your engage threat zones — the wave is bait and you are the trap.",
  waveWorst:"a shoved wave with your engage on cooldown — the playmaker with no buttons is furniture with a ward.",
  behindShort:"peel only and rebuild through vision and engage discipline.",
  loadingRule:"Engage when their answer is down — the chain only needs one clean start.",
  summReport:"Flash + Ignite into kill lanes, Flash + Exhaust into burst duos — your engage IS the second summoner.",
  jungleLine:"Your engage plus jungler arrival is a guaranteed kill — ping the windows when their disengage shows.",
  tradeGood:"Bait the answer, start the chain, and let your carry collect — engage trades are all-or-nothing; pick the all.",
  tradeBad:"Engaging into a banked disengage — the chain that starts answered is a donation with intentions.",
  early:"Zone with the threat — the engage you don't use governs more than the one you do.",
  mid:"Chain economy: convert the ganks, start the rivers, peel the picks.",
  late:"You start the fights your team finishes — chain the carry, peel the counter, hold the line.",
  spikesLine:"Level 2-3 chains govern; level 6 hardens the all-in; first item funds the playbook.",
  carryLine:"Carry by starting it — one clean chain per fight; your carry does the arithmetic.",
  runeReport:"Aftershock or Hail-of-Blades by kit, Font of Life, Bone Plating, Unflinching; secondary Inspiration.",
  itemReport:"World Atlas start. Locket or Zeke's line, Mercs-Steelcaps by lane, then Knight's Vow paths.",
}, o); }
window.GEN_SUP_CFGS_4 = [

_supBase4({
  key:'rell', name:'Rell',
  lvl:[
    "Mounted speed governs the lane's first minutes — the charge threat zones before it lands.",
    "W crash online — the dismount knockup starts chains the lane can't refuse.",
    "Full kit: crash the carry, Q the shields off, and steal the resistances your trades need.",
    "Zone with crash range — their enchanter's shields die to your stab on principle.",
    "Magnet Storm online — formations near you are a suggestion; the clump is mandatory.",
    "First item: the crash chains and the stolen stats compound.",
    "Late Rell makes clumps: R the formation, crash the center, and let the team bill the gravity."
  ],
  diffBase:{ enchanter:'FAVOURED', warden:'EVEN', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ janna:'TRICKY', lulu:'TRICKY', milio:'TRICKY', morgana:'TRICKY',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'TRICKY', neeko:'TRICKY',
    soraka:'FAVOURED', sona:'FAVOURED', yuumi:'FAVOURED', seraphine:'FAVOURED', nami:'EVEN', senna:'FAVOURED', zilean:'EVEN', renata:'FAVOURED', karma:'TRICKY',
    blitzcrank:'EVEN', thresh:'EVEN', pyke:'EVEN', nautilus:'EVEN', rakan:'EVEN', bard:'EVEN',
    alistar:'EVEN', braum:'EVEN', galio:'EVEN', leona:'EVEN', maokai:'EVEN', poppy:'TRICKY', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"Your Q breaks the shields their whole class is made of — crash the carry and stab the insurance.",
      breakdown:"The shield-break makes enchanter math a lie: crash the window, Q the refund attempt, and steal the stats.",
      dos:["Q the shield the moment it casts","Crash the carry's trade window","Steal resistances in every exchange"],
      donts:["Chip politely at their range","Crash the support","Wait mounted for perfect forever"],
      win:"Stab the insurance class through its own paperwork."
    },
    warden:{
      tldr:"An engage mirror your magnet tilts — whoever chains second chains into your gravity.",
      breakdown:"Bait his chain, crash the recovery, and R the brawl — clumps near Rell pay her team's rates.",
      dos:["Crash second onto his commit","R the brawl he started","Q his tank stats off"],
      donts:["Engage-race at even chains","Trade mounted speed for pride","R the feint"],
      win:"Second crash, mandatory clump."
    },
    catcher:{
      tldr:"His hook and your crash want the same window — yours brings gravity; race him to it.",
      breakdown:"Dodge the hook behind minions and crash the cooldown; the magnet makes his peel a suggestion.",
      dos:["Stand behind minions mounted","Crash his hook's cooldown","R the chain his catch started"],
      donts:["Eat the hook at charge range","Crash into banked peel","Trade at his catch tempo"],
      win:"Out-gravity the catch class."
    },
    mage:{
      tldr:"He pokes the horse — eat the rent at the edges and crash the rotation gap with everything.",
      breakdown:"Poke supports tax your approach: charge only in the gaps, Q the zone-caster's shield items, and R the all-in once.",
      dos:["Crash strictly in rotation gaps","Eat poke at mounted speed only","R the dive his zone funded"],
      donts:["Walk the zone dismounted","Crash into a banked root","Trade chip with a lance"],
      win:"Pay the rent once and crash the foreclosure."
    }
  },
  mirror:{
    tldr:"Magnet mirror — crash chicken; the second dismount lands on a committed Rell.",
    breakdown:"Bait her crash with mounted feints and counter-crash the landing; the R war clumps itself.",
    dos:["Crash second onto her landing","Bait with mounted feints","R the clump she made"],
    donts:["W-duel at even mounts","Q-trade shields at parity","R first"],
    win:"Second crash wins the gravity war.",
    winS:"Her crash is down — your duo trades free."
  },
  safetyTool:"E Full Tilt (remount speed)",
  dontDetail:"Dismounted Rell walks like furniture — crash with the remount path planned or don't crash.",
  aheadTpl:"Ahead, magnetize: crash {E}'s carry off every window and R the recovery formations.",
  behindTpl:"Behind, peel: Q their diver's shields, crash the focus, and rebuild the engage discipline.",
  spikeName:"first item",
  redditLine:"Q the shield, crash the carry, and clump them on schedule — Rell wins by making formations illegal.",
  load:{ sub:"r/RellMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Bramble piece vs sustain", antihealNote:"Anti-heal into their sustain.", firstItem:"Locket / Zeke's", secondItem:"Knight's Vow path", boots:"Mercury's / Steelcaps", bootsVsAP:"Mercury's", bootsVsAD:"Steelcaps", spike:"First item — crashes chain and stolen stats compound.", runes:{ keystone:"Aftershock", primaryTree:"Resolve", primary:["Font of Life","Bone Plating","Unflinching"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    morgana:{ tldr:"The black shield eats the crash thesis — Q it off FIRST (the stab breaks shields) and crash the naked window after." },
    poppy:{ tldr:"Her W reads your crash its rights — bait the zone with mounted feints and crash only after the hammer's veto expires." }
  }
}),

_supBase4({
  key:'tahmkench', name:'Tahm Kench',
  lvl:[
    "Tongue-chip the contacts — the gray health ledger makes your trades dishonest.",
    "Devour threats begin: their carry's worst moment now includes a frog's stomach.",
    "Full kit: Q-slow the trades, W the dives both directions, and thicken the margins.",
    "Zone with devour threat — the carry your Q stuns twice is the carry you eat.",
    "Abyssal Voyage online — your duo's roams arrive through the floor.",
    "First item: the gray health compounds and the stuns chain.",
    "Late Kench is the un-kill: eat the focused carry, wall the dive, and voyage the flanks."
  ],
  diffBase:{ enchanter:'EVEN', warden:'EVEN', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'EVEN', morgana:'EVEN', neeko:'EVEN',
    soraka:'FAVOURED', janna:'EVEN', lulu:'EVEN', milio:'EVEN', nami:'EVEN', sona:'FAVOURED', seraphine:'EVEN', senna:'EVEN', yuumi:'FAVOURED', zilean:'EVEN', renata:'EVEN', karma:'EVEN',
    blitzcrank:'EVEN', thresh:'EVEN', pyke:'FAVOURED', nautilus:'EVEN', rakan:'EVEN', bard:'EVEN',
    alistar:'EVEN', braum:'EVEN', galio:'EVEN', leona:'EVEN', maokai:'EVEN', poppy:'EVEN', rell:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"Their sustain heals chip — your devour deletes presence; eat the carry's best moment.",
      breakdown:"Tongue the margins and hold W for their carry's all-in window — a devoured DPS is a refunded fight.",
      dos:["Tongue-chip the trade margins","Devour the carry's steroid window","Q-stun the double-lick targets"],
      donts:["Chip-race their heals","Eat the support","Devour on prediction"],
      win:"Eat the insurance class's best moment."
    },
    warden:{
      tldr:"His chain meets a stomach — devour the diver mid-chain and spit the apology at his team.",
      breakdown:"Let the engage start, then eat its payload: the W answers commitment with digestion.",
      dos:["Devour his chain's diver","Q-slow the regroup","Spit the diver into your tower"],
      donts:["Engage-race the warden","Eat the tank — the carry dove too","Trade his flash window"],
      win:"Digest the engage war's payload."
    },
    catcher:{
      tldr:"His hook catches your carry — your W un-catches them; the stomach is the lane's safest district.",
      breakdown:"Dodge what you can and devour what they catch: the catcher's whole conversion dies in the gray.",
      dos:["Devour the caught instantly","Q the hook's cooldown window","Tongue-chip while he fishes"],
      donts:["Eat the hook walking up","Devour pre-hook on nerves","Trade at his catch tempo"],
      win:"Un-catch the catch class."
    },
    mage:{
      tldr:"He pokes the river — thicken through the chip, eat the all-in's target, and voyage past the zone.",
      breakdown:"Poke taxes frogs slowly: gray-health the margins, W the conversion, and flank his artillery through the floor.",
      dos:["Thicken through the chip war","Devour the all-in's focus","Voyage the flank his zone ignores"],
      donts:["Trade at his max range","Eat poke for pride","Q the chip instead of the dive"],
      win:"Out-thicken the poke and eat its conclusion."
    }
  },
  mirror:{
    tldr:"River mirror — devour chicken; whoever eats the more important moment wins.",
    breakdown:"Bait his W with feint focus and eat the real window; the voyage war goes to the better map.",
    dos:["Devour second, smarter","Win the gray-health ledger","Voyage the better flank"],
    donts:["Eat-duel at even stomachs","Tongue-trade at parity","Voyage the same river"],
    win:"Better appetite discipline wins.",
    winS:"His W is down — focus freely; nothing un-happens now."
  },
  safetyTool:"W Devour (ally save)",
  dontDetail:"Eating an ally silences their kit too — devour the focused, not the fighting.",
  aheadTpl:"Ahead, raise the river: chip {E}'s duo into gray-health debt and eat the recovery windows.",
  behindTpl:"Behind, the stomach holds: devour their snowball's targets and voyage the comeback flanks.",
  spikeName:"first item",
  redditLine:"eat moments not minions, thicken the margins, and voyage where wards aren't — Kench wins by digestion.",
  load:{ sub:"r/TahmKenchMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Bramble piece vs sustain", antihealNote:"Anti-heal into their sustain.", firstItem:"Locket / Heartsteel piece", secondItem:"Knight's Vow path", boots:"Mercury's / Steelcaps", bootsVsAP:"Mercury's", bootsVsAD:"Steelcaps", spike:"First item — the gray health compounds and the stuns chain.", runes:{ keystone:"Grasp of the Undying", primaryTree:"Resolve", primary:["Font of Life","Second Wind","Overgrowth"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    pyke:{ tldr:"His executes meet your stomach — devour the X's target mid-cast and the gold-share dies hungry." },
    zyra:{ tldr:"The garden out-chips the river — dodge the root, thicken patiently, and eat the bramble all-in's focus." }
  }
}),

_supBase4({
  key:'taric', name:'Taric',
  lvl:[
    "Bravado-weave the trades — the empowered autos refund cooldowns; the loop is the lane.",
    "Q-charges bank heals: the gemstone economy opens.",
    "Full kit: W-link the carry and the E stuns from two bodies — the double angle is the trap.",
    "Stun the margins off the link's geometry — their spacing answers two Tarics.",
    "Cosmic Radiance online — dives on your duo meet a scheduled invulnerability.",
    "First item: the stuns chain and the heals compound.",
    "Late Taric un-kills teamfights: R the dive, link the carry, and stun the formation twice per rotation."
  ],
  diffBase:{ enchanter:'EVEN', warden:'EVEN', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'EVEN', morgana:'EVEN', neeko:'EVEN',
    soraka:'EVEN', janna:'EVEN', lulu:'EVEN', milio:'EVEN', nami:'EVEN', sona:'EVEN', seraphine:'EVEN', senna:'EVEN', yuumi:'FAVOURED', zilean:'EVEN', renata:'EVEN', karma:'EVEN',
    blitzcrank:'EVEN', thresh:'EVEN', pyke:'EVEN', nautilus:'EVEN', rakan:'EVEN', bard:'EVEN',
    alistar:'EVEN', braum:'EVEN', galio:'EVEN', leona:'EVEN', maokai:'EVEN', poppy:'EVEN', rell:'EVEN', tahmkench:'EVEN' },
  vs:{
    enchanter:{
      tldr:"A sustain mirror your invuln cheats — their best window meets a scheduled 'no'.",
      breakdown:"Weave the bravado trades evenly and bank R for their kill windows; the radiance refunds entire fights.",
      dos:["Weave empowered autos per spell","Bank R for their kill windows","Stun off the link's double angle"],
      donts:["Heal-race without the weave","R the chip","Link the wrong body"],
      win:"Out-schedule the sustain mirror with invulnerability."
    },
    warden:{
      tldr:"His chain meets a dazzle from two angles and an R that unwrites it — stun the commit.",
      breakdown:"Bait his engage and E from the link's geometry; the chain that lands meets radiance anyway.",
      dos:["E the chain from the link angle","R the committed dive","Weave the recovery trades"],
      donts:["Engage-race the warden","R the feint","Trade his flash window"],
      win:"Stun the engage war from angles it can't read."
    },
    catcher:{
      tldr:"His catch starts a fight your R finishes backward — link the target and dazzle the chain.",
      breakdown:"The caught carry under radiance is bait, not a kill: stun the divers and bill the commitment.",
      dos:["Link the likely catch target","Dazzle the post-hook chain","R the dive his catch sold"],
      donts:["Stand hook-side warding","R one hook's damage","Trade at catch tempo"],
      win:"Turn every catch into a radiant ambush."
    },
    mage:{
      tldr:"He pokes the gems — weave the heals through the chip and R the conversion his zone funds.",
      breakdown:"Poke supports out-rate your bank early: Q the priorities, stun the rotation gaps, and schedule the radiance for the all-in.",
      dos:["Q-triage through the chip","Stun strictly in rotation gaps","R the zone-funded all-in"],
      donts:["Trade at artillery range","Heal-race the burn","E from the front angle only"],
      win:"Outlast the poke and unwrite its conclusion."
    }
  },
  mirror:{
    tldr:"Gem mirror — radiance chicken; whoever Rs second unwrites the decided fight.",
    breakdown:"Weave cleaner, stun off better link angles, and R second — truly, truly outrageous patience wins.",
    dos:["R second, always","Win the weave economy","Stun from the link he forgot"],
    donts:["R-race at even fights","Dazzle-duel at parity","Link-trade the same carry"],
    win:"Second radiance wins the gem war.",
    winS:"His R is spent — kills stay killed; commit."
  },
  safetyTool:"R Cosmic Radiance",
  dontDetail:"The radiance is DELAYED — count the 2.5 seconds aloud or the invuln insures a corpse.",
  aheadTpl:"Ahead, outshine: stun {E}'s duo off the double angles and R the desperation dives.",
  behindTpl:"Behind, the gems hold: heal the deficit, stun their snowball, and unwrite one fight to reset the books.",
  spikeName:"first item",
  redditLine:"weave the bravado, stun from the link, and count the radiance delay aloud — Taric wins fights that already happened.",
  load:{ sub:"r/taricmains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Bramble piece vs sustain", antihealNote:"Anti-heal into their sustain.", firstItem:"Locket / Zeke's", secondItem:"Knight's Vow / Redemption", boots:"Mercury's / Steelcaps", bootsVsAP:"Mercury's", bootsVsAD:"Steelcaps", spike:"First item — the stuns chain and the radiance schedules.", runes:{ keystone:"Aftershock", primaryTree:"Resolve", primary:["Font of Life","Bone Plating","Unflinching"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    pyke:{ tldr:"His execute respects nothing except invulnerability — R the X window and the gold-share starves." },
    zyra:{ tldr:"The garden out-chips the gems — dodge the root, weave the margins, and R the bramble all-in." }
  }
}),

_supBase4({
  key:'bard', name:'Bard',
  curve:[0.1,0.2,0.2,0.2,0.3,0.3,0.3],
  lvl:[
    "Meep-chip the contacts and collect the first chimes — the wanderer's ledger opens.",
    "Q threats begin: every wall adjacency is a stun audition.",
    "Full kit: shrine the sustain, tunnel the angles, and Q the geometry.",
    "Chime economy: collect on the move and return with meep upgrades — absence is investment.",
    "Tempered Fate online — the map's biggest moments now have a stasis clause.",
    "First item: the meeps chunk and the portals make your jungler ambidextrous.",
    "Late Bard edits fights: R the engage or the objective, Q the chokes, and tunnel the team to the answer."
  ],
  diffBase:{ enchanter:'EVEN', warden:'EVEN', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'EVEN', morgana:'EVEN', neeko:'EVEN',
    soraka:'EVEN', janna:'EVEN', lulu:'EVEN', milio:'EVEN', nami:'EVEN', sona:'EVEN', seraphine:'EVEN', senna:'EVEN', yuumi:'FAVOURED', zilean:'EVEN', renata:'EVEN', karma:'EVEN',
    blitzcrank:'EVEN', thresh:'EVEN', pyke:'EVEN', nautilus:'EVEN', rakan:'EVEN',
    alistar:'EVEN', braum:'EVEN', galio:'EVEN', leona:'EVEN', maokai:'EVEN', poppy:'EVEN', rell:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"Their sustain answers your chip — your chimes answer their tempo; out-wander the margins.",
      breakdown:"Meep-trade evenly, shrine the difference, and convert the chime lead into roams their lane can't follow.",
      dos:["Meep-chip then collect on the move","Shrine your carry's chip debt","Q the wall windows they forget"],
      donts:["Chime-greed in hook range","Out-sustain race a healer","Roam with the wave crashing in"],
      win:"Out-tempo the sustain mirror with wanderlust."
    },
    warden:{
      tldr:"His engage is a line and your Q draws walls — stun the chain against the lane's furniture.",
      breakdown:"Bait the commit, Q the diver against any wall, and R the pile if it works too well.",
      dos:["Q the diver onto terrain","R the over-committed pile","Tunnel the escape he can't follow"],
      donts:["Engage-race the warden","Q open-field for chip","R your own carry casually"],
      win:"Furnish the engage war with walls."
    },
    catcher:{
      tldr:"A pick mirror — his hooks versus your stuns; yours work through walls and his don't.",
      breakdown:"Dodge the hook behind minions and answer with wall-Qs; the tunnel network out-rotates his fog game.",
      dos:["Stand behind minions always","Wall-stun his hook windows","Out-rotate him through tunnels"],
      donts:["Chime-walk his hook lanes","Q-duel open field","Trade at his catch tempo"],
      win:"Out-pick the pick class through architecture."
    },
    mage:{
      tldr:"He pokes the wanderer — shrine through the chip, Q the rotation gaps, and R the artillery position.",
      breakdown:"Poke taxes your collection routes: chip back with meeps, stasis his zone at the big moments, and tunnel the flanks.",
      dos:["Meep-trade his casting windows","R his artillery at objective time","Tunnel the flank his zone ignores"],
      donts:["Collect through his zone","Q the chip instead of the pick","Shrine-camp at half value"],
      win:"Out-rotate the poke and stasis its best moment."
    }
  },
  mirror:{
    tldr:"Chime mirror — collection tempo and R chicken; whoever stases the better moment wins.",
    breakdown:"Out-collect the map, wall-stun his returns, and R second — his fate shows your window.",
    dos:["Win the chime race","Q his tunnel exits","R the better moment"],
    donts:["Mirror his collection route","R-duel the same fight","Meep-trade at parity"],
    win:"Better tempo, better fate.",
    winS:"His R is down — the map's moments are yours."
  },
  safetyTool:"E Magical Journey",
  dontDetail:"The R stases EVERYTHING — allies, towers, and your own carry's ult; aim it like a verdict.",
  aheadTpl:"Ahead, wander louder: stun {E}'s duo off every wall and R the map's recovery moments.",
  behindTpl:"Behind, collect: chime the tempo back, shrine the deficit, and R one fight into a reset.",
  spikeName:"first item",
  redditLine:"chimes are tempo, walls are ammunition, and the R is a verdict — Bard wins games between the lanes.",
  load:{ sub:"r/BardMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Oblivion Orb piece vs sustain", antihealNote:"Anti-heal into their sustain.", firstItem:"Locket / Zeke's", secondItem:"Knight's Vow / Redemption", boots:"Mobility/Swiftness", bootsVsAP:"Mercury's", bootsVsAD:"Steelcaps", spike:"First item — meeps chunk and the tunnels run the tempo.", runes:{ keystone:"Guardian", primaryTree:"Resolve", primary:["Font of Life","Bone Plating","Unflinching"], tree:"Inspiration", secondary:["Magical Footwear","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    yuumi:{ tldr:"The saddle can't follow your tempo — out-wander the attached lane and stun the dismount schedules." },
    zyra:{ tldr:"The garden taxes your collection routes — meep from off-angles, Q the root window, and wander where the plants aren't." }
  }
}),

_supBase4({
  key:'blitzcrank', name:'Blitzcrank',
  lvl:[
    "The hook threat IS level 1 — their duo plays behind minions or pays immediately.",
    "E joins: hook-fist is live and the lane's geometry answers to your arm.",
    "Full kit: W the flank angles — the hook from fog is the lane's scariest sentence.",
    "Zone with the arm — every minion they hide behind is tempo you taxed for free.",
    "Static Field online — the silence finishes what the fist started.",
    "First item: the grab chains delete and the overdrive flanks multiply.",
    "Late Blitz is one hook from winning: fish the chokes, fist the catch, and silence the channel."
  ],
  diffBase:{ enchanter:'FAVOURED', warden:'EVEN', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ janna:'TRICKY', lulu:'TRICKY', milio:'EVEN', morgana:'TRICKY',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'TRICKY', neeko:'TRICKY',
    soraka:'FAVOURED', sona:'FAVOURED', yuumi:'FAVOURED', seraphine:'FAVOURED', nami:'EVEN', senna:'FAVOURED', zilean:'TRICKY', renata:'EVEN', karma:'EVEN',
    thresh:'EVEN', pyke:'EVEN', nautilus:'EVEN', rakan:'EVEN', bard:'EVEN',
    alistar:'EVEN', braum:'TRICKY', galio:'EVEN', leona:'EVEN', maokai:'EVEN', poppy:'EVEN', rell:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"Their squishy support is the hook's favorite food — fish the healer and the lane starves.",
      breakdown:"Enchanters die to one grab: fish their warding walks, fist the catch, and let the carry-versus-duo math finish.",
      dos:["Fish the support's warding walks","Hook the gaps their cover leaves","W-flank from fog angles"],
      donts:["Hook the tank by accident","Fish on cooldown predictably","Stand chip-range between hooks"],
      win:"One grab per healer — the lane's whole thesis."
    },
    warden:{
      tldr:"An engage mirror your arm out-ranges — hook the engage tank before his chain exists.",
      breakdown:"His chain needs proximity; your grab makes proximity. Fish the spacing war and fist whatever wins it.",
      dos:["Hook his approach spacing","Fist the chain he starts","Silence the recovery"],
      donts:["Grab-race his engage blind","Hook the front body in fights","Trade his flash window evenly"],
      win:"Out-range the engage war by a rocket arm."
    },
    catcher:{
      tldr:"The catch civil war — his hook versus yours; whoever fishes second fishes a committed lane.",
      breakdown:"Dodge his line and punish the cooldown: nineteen seconds of a catcher with no catch is a farming sim you run.",
      dos:["Dodge his line, then fish freely","Punish the hook cooldown loudly","W the angles his fog forgot"],
      donts:["Trade hooks at even timers","Stand on his hook line warding","Fish the same angle twice"],
      win:"Second fisherman eats — dodge then dominate."
    },
    mage:{
      tldr:"He pokes the robot — eat the rent behind minions and hook the one rotation gap that matters.",
      breakdown:"Poke supports tax your fishing: hold the grab until his keystone shows, then hook everything into the silence.",
      dos:["Hook strictly in rotation gaps","Stand behind minions between casts","Silence the zone he channels"],
      donts:["Fish through his minion line","Walk the zone at half HP","Grab the tank his zone protects"],
      win:"Pay the rent and hook the foreclosure."
    }
  },
  mirror:{
    tldr:"Hook mirror — grab chicken; the second arm fishes a committed robot.",
    breakdown:"Dodge his line first, then fish the cooldown; the fist war answers itself.",
    dos:["Dodge first, fish second","Punish his cooldown window","W the off-angle he forgot"],
    donts:["Trade grabs at even timers","Hook-duel through minions","R-race the silence"],
    win:"Second grab wins the robot war.",
    winS:"His hook is down — fish the open water."
  },
  safetyTool:"W Overdrive",
  dontDetail:"The hook pulls them TO you — grabbing the engage tank delivers the problem; aim at the squishy.",
  aheadTpl:"Ahead, fish openly: hook {E}'s support off every walk and chain the recovery attempts.",
  behindTpl:"Behind, the arm resets games: one fog hook on their carry rewrites any deficit — fish patiently.",
  spikeName:"first item",
  redditLine:"hook the squishy not the tank, fish from fog, and silence the channels — Blitz wins games one grab at a time.",
  load:{ sub:"r/blitzcrankmains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Bramble piece vs sustain", antihealNote:"Anti-heal into their sustain.", firstItem:"Locket / Zeke's", secondItem:"Knight's Vow path", boots:"Mobility / Mercury's", bootsVsAP:"Mercury's", bootsVsAD:"Steelcaps", spike:"First item — grab chains delete and the flanks multiply.", runes:{ keystone:"Aftershock", primaryTree:"Resolve", primary:["Font of Life","Bone Plating","Unflinching"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    braum:{ tldr:"His door eats your entire champion — hook only behind the wall's cooldown and fish the angles the poro can't face." },
    morgana:{ tldr:"The black shield laughs at the arm — fish the support's shield-less windows or pop it with E threat first." }
  }
}),

_supBase4({
  key:'nautilus', name:'Nautilus',
  lvl:[
    "Auto-root the contacts — the passive snare makes every walk-up a trade you start.",
    "Hook online: the lane's geometry answers to the anchor already.",
    "Full kit: hook-auto-W-E chains a carry through your duo's full rotation.",
    "Zone with anchor threat — their carry farms at the range your Q defines.",
    "Depth Charge online — the point-click knockup chain cannot be bodied or dodged.",
    "First item: the chains harden and the shield trades bully.",
    "Late Naut starts everything: R the carry through the formation and anchor whatever peels."
  ],
  diffBase:{ enchanter:'FAVOURED', warden:'EVEN', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ janna:'TRICKY', lulu:'TRICKY', milio:'TRICKY', morgana:'TRICKY',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'TRICKY', neeko:'TRICKY',
    soraka:'FAVOURED', sona:'FAVOURED', yuumi:'FAVOURED', seraphine:'FAVOURED', nami:'EVEN', senna:'FAVOURED', zilean:'EVEN', renata:'EVEN', karma:'TRICKY',
    blitzcrank:'EVEN', thresh:'EVEN', pyke:'EVEN', rakan:'EVEN', bard:'EVEN',
    alistar:'EVEN', braum:'EVEN', galio:'EVEN', leona:'EVEN', maokai:'EVEN', poppy:'EVEN', rell:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"Their shields delay the anchor by one cast — hook through the paperwork and chain the carry.",
      breakdown:"Bait the shield with auto-root threat, then hook the refund window; the full chain out-lasts their insurance.",
      dos:["Bait the shield pre-hook","Chain the carry through the refund","Auto-root the spacing wars"],
      donts:["Chip-trade their sustain","Hook the support","Anchor minions out of boredom"],
      win:"Drown the insurance class in chain math."
    },
    warden:{
      tldr:"An engage mirror your R cheats — his chain can be dodged; your Depth Charge cannot.",
      breakdown:"Trade engage threats evenly and remember your 6 ends the argument point-and-click.",
      dos:["R the carry his chain protects","Counter-hook his recovery","Auto-root the brawl margins"],
      donts:["Engage-race pre-6 evenly","Hook the tank in teamfights","Trade his flash window"],
      win:"Point-and-click the engage war shut."
    },
    catcher:{
      tldr:"A hook mirror your passive tilts — even trades end with your root and his apology.",
      breakdown:"Dodge his line, land yours, and the auto-root makes every post-hook exchange yours.",
      dos:["Dodge first, hook second","Auto-root the exchange he starts","W-shield the counter-poke"],
      donts:["Trade hooks at even timers","Fish predictable angles","Stand on his line warding"],
      win:"Win the hook war's second act with the snare."
    },
    mage:{
      tldr:"He pokes the anchor — eat the rent behind minions and chain the one gap his rotation leaves.",
      breakdown:"Poke supports tax your approach: hook strictly in the gaps, shield the chip, and R the all-in his zone funds.",
      dos:["Hook strictly in rotation gaps","W-shield the chip war","R the carry once per fight"],
      donts:["Walk the zone at half HP","Hook through healthy minion lines","Trade chip with an anchor"],
      win:"Pay the rent and anchor the foreclosure."
    }
  },
  mirror:{
    tldr:"Anchor mirror — hook chicken with depth charges; the second R always lands.",
    breakdown:"Dodge his line, land yours, and R second — his charge shows the fight's real target.",
    dos:["Dodge first, hook second","R second with information","Auto-root the brawls"],
    donts:["Trade hooks at even timers","R-race at even fights","Shield-duel at parity"],
    win:"Second anchor sinks first.",
    winS:"His hook is down — walk your duo forward."
  },
  safetyTool:"W Titan's Wrath",
  dontDetail:"The hook drags YOU to terrain it clips — fishing through walls relocates the anchor, not the fish.",
  aheadTpl:"Ahead, drown the lane: chain {E}'s carry off every window and R the recovery attempts.",
  behindTpl:"Behind, anchor the peel: root the divers, R their worst threat, and rebuild the chain discipline.",
  spikeName:"first item",
  redditLine:"bait the shield, hook the squishy, and R point-and-click — Nautilus wins fights the moment they start.",
  load:{ sub:"r/NautilusMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Bramble piece vs sustain", antihealNote:"Anti-heal into their sustain.", firstItem:"Locket / Zeke's", secondItem:"Knight's Vow path", boots:"Mercury's / Steelcaps", bootsVsAP:"Mercury's", bootsVsAD:"Steelcaps", spike:"First item — the chains harden and every hook is a kill.", runes:{ keystone:"Aftershock", primaryTree:"Resolve", primary:["Font of Life","Bone Plating","Unflinching"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    morgana:{ tldr:"The black shield eats the hook AND the R — pop it with auto-root threat before any real chain." },
    janna:{ tldr:"The tornado un-anchors the anchor mid-chain — bait the gale with a feint walk and chain the silence." }
  }
})
];

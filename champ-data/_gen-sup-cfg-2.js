// MatchupCoach — SUPPORT generator configs batch 2: Senna, Seraphine, Sona, Soraka, Yuumi, Zilean.
function _supBase2(o){ return Object.assign({
  curve:[0.1,0.1,0.2,0.2,0.3,0.3,0.3],
  winS:"His engage is spent — trade freely with your carry.",
  waveBest:"a lane your carry controls while you hold river vision — the wave is theirs; the map seams are yours.",
  waveWorst:"a shoved wave with no vision and your key cooldown down — the support alone in fog is the lane's bounty.",
  behindShort:"peel only and rebuild through vision control.",
  loadingRule:"Track his engage cooldown — your duo trades only when it's down.",
  summReport:"Flash + standard support second (Ignite into kill lanes, Exhaust into dive, Heal if your carry runs Cleanse).",
  jungleLine:"Your CC plus jungler arrival decides bot — ping gank windows on his engage cooldown and hold the river bush vision.",
}, o); }
window.GEN_SUP_CFGS_2 = [

_supBase2({
  key:'senna', name:'Senna',
  curve:[0.0,0.1,0.1,0.2,0.3,0.3,0.6],
  lvl:[
    "Q off minions to chip the duo — the angles are the lane and every wave drops souls.",
    "Soul discipline begins: collect what's safe; the range grows forever.",
    "W threats open: any clumped trade risks the spreading root.",
    "Chip the ledger and bank the souls — the collection out-scales every support item.",
    "Dawning Shadow online — the global beam saves dives and finishes recalls.",
    "First item: the Q chunks and the soul thresholds start mocking trade math.",
    "Late Senna out-ranges the game from the support slot — souls, beams, and mist."
  ],
  diffBase:{ enchanter:'EVEN', warden:'EVEN', catcher:'TRICKY', mage:'EVEN' },
  diffEx:{ blitzcrank:'TRICKY', thresh:'TRICKY', pyke:'TRICKY', nautilus:'TRICKY', leona:'TRICKY', rell:'TRICKY', alistar:'TRICKY', rakan:'EVEN', bard:'EVEN',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'EVEN', xerath:'EVEN', lux:'EVEN', hwei:'EVEN', swain:'EVEN', morgana:'EVEN', neeko:'EVEN',
    soraka:'EVEN', janna:'EVEN', lulu:'EVEN', milio:'EVEN', nami:'EVEN', sona:'EVEN', seraphine:'EVEN', yuumi:'FAVOURED', zilean:'EVEN', renata:'EVEN', karma:'EVEN',
    braum:'EVEN', galio:'EVEN', maokai:'EVEN', poppy:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"A sustain mirror your souls out-scale — chip the angles and let the collection decide the second half.",
      breakdown:"Q-trade off minions (it heals your carry while billing theirs) and collect on a schedule their kit can't match.",
      dos:["Q off units through the pair","Collect souls behind your carry","Root the clumped sustain trades"],
      donts:["Greed pickups in their poke","Race heals without the Q ledger","Trade at their spike politely"],
      win:"Out-collect the mirror — infinity wins sustain wars."
    },
    warden:{
      tldr:"His engage hunts your pickups — collect behind cover and root the chain that commits.",
      breakdown:"The souls bait dives; treat every pickup as a trap you're walking into. Root the engage, beam the catch, and bank the curve.",
      dos:["Collect behind minion cover only","Root his engage mid-chain","Beam the dive's target globally"],
      donts:["Greed souls in his flash range","Stand pickup-side of your carry","Trade his all-in window evenly"],
      win:"Survive the pickup tax and out-range the rest of his game."
    },
    catcher:{
      tldr:"Every soul is hook bait — the lane is a discipline test your curve pays you to pass.",
      breakdown:"Hooks own your collection routes: pickup only behind cover, root the post-catch chain, and beam what they catch anyway.",
      dos:["Treat every pickup as a hook test","Root the chain at link two","Beam the caught instantly"],
      donts:["Collect through open lanes","Ward face-first into brush","Trade while his hook is up"],
      win:"Pass the discipline test and foreclose with range."
    },
    mage:{
      tldr:"A poke mirror your sustain tilts — Q heals through his chip and the souls out-scale his rotation.",
      breakdown:"Trade Q-for-spell with the heal rider, dodge the keystone, and let the collection win the long argument.",
      dos:["Q through allies for the heal-chip","Dodge his keystone religiously","Out-collect his mana economy"],
      donts:["Eat rotations collecting","Trade at his zone's center","Root the poke instead of the engage"],
      win:"Heal through the poke war and out-infinite the mage."
    }
  },
  mirror:{
    tldr:"Soul mirror in the support slot — collection discipline decides who out-ranges whom forever.",
    breakdown:"Win the pickup race behind cover, dodge her W lines, and beam second in the save war.",
    dos:["Win the collection race","Spread off her root lines","Beam second with information"],
    donts:["Greed contested souls","Stand on minions vs her W","Mist-duel at parity"],
    win:"Faster collection, later beam — the better curator wins.",
    winS:"Her root is down — collect forward freely."
  },
  tradeGood:"Q off a minion through their pair — the cast healed your carry, billed theirs, and grew your range.",
  tradeBad:"Walking through an open lane for one soul with a hook champion watching — the curve doesn't pay death benefits.",
  early:"Collect and chip — the lane is a savings account with a gun attached, in the support slot.",
  mid:"Angle economy: Q the sieges, root the picks, beam the map's emergencies.",
  late:"You out-range the game: chip from two screens, mist the engages, beam the verdicts.",
  safetyTool:"E Curse of the Black Mist",
  spikesLine:"First item arms the chip; level 6 goes global; the soul curve never stops.",
  carryLine:"Carry through infinity — the collection has no cap; your job is the discipline the pickups demand.",
  dontDetail:"The mist hides teams, not greed — collecting into hooks retires curators early.",
  aheadTpl:"Ahead, compound: chip {E}'s duo off every angle, root the answers, and beam the map into submission.",
  behindTpl:"Behind, souls still drop: collect safely, mist the dives, and let infinity rebuild the ledger.",
  spikeName:"first item",
  runeReport:"Fleet or Grasp lines... standard: Fleet Footwork, Presence of Mind, Legend: Bloodline, Cut Down; secondary Inspiration.",
  itemReport:"World Atlas start. BotRK-lite paths or Helia-utility by team need; standard support Senna: Helia into RFC-range items.",
  redditLine:"angles, souls, and patience — support Senna wins by collecting what the slot was never supposed to afford.",
  load:{ sub:"r/sennamains", start:"World Atlas + potions", normalBack:"Boots + Zeal piece (≈800g)", antihealBack:"Executioner's piece vs sustain duos", antihealNote:"Anti-heal early into their sustain.", firstItem:"Echoes of Helia / Statikk", secondItem:"RFC path", boots:"Swiftness", bootsVsAP:"Mercury's / Swiftness", bootsVsAD:"Steelcaps / Swiftness", spike:"First item + soul thresholds — the range war is pre-won.", runes:{ keystone:"Fleet Footwork", primaryTree:"Precision", primary:["Presence of Mind","Legend: Bloodline","Cut Down"], tree:"Inspiration", secondary:["Magical Footwear","Approach Velocity"], shards:["Attack Speed","Adaptive Force","Health"] } },
  specials:{
    blitzcrank:{ tldr:"Every soul pickup is a hook audition — collect behind bodies only and root the Power Fist window when he commits." },
    yuumi:{ tldr:"Her host out-trades nothing while you out-collect everything — chip the attached pair and root the dismount windows." }
  }
}),

_supBase2({
  key:'seraphine', name:'Seraphine',
  lvl:[
    "Q-poke the pair and count notes — every third spell sings twice.",
    "W-sustain begins: the duo shield-heal makes even trades dishonest.",
    "E-chains open: slow into root is the lane's longest pick.",
    "Echo economy: bank the third cast for the moment that matters.",
    "Encore online — the charm extends through your team; fights start two screens early.",
    "First item: echoed Qs chunk and the ledger compounds.",
    "Late Seraphine conducts teamfights from the support slot — charm, echo, root, repeat."
  ],
  diffBase:{ enchanter:'EVEN', warden:'EVEN', catcher:'EVEN', mage:'EVEN' },
  diffEx:{ blitzcrank:'TRICKY', thresh:'EVEN', pyke:'TRICKY', nautilus:'EVEN', leona:'EVEN', rell:'EVEN', alistar:'EVEN', rakan:'EVEN', bard:'EVEN',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'EVEN', hwei:'TRICKY', swain:'EVEN', morgana:'EVEN', neeko:'EVEN',
    soraka:'EVEN', janna:'EVEN', lulu:'EVEN', milio:'EVEN', nami:'EVEN', sona:'FAVOURED', senna:'EVEN', yuumi:'FAVOURED', zilean:'EVEN', renata:'EVEN', karma:'EVEN',
    braum:'EVEN', galio:'EVEN', maokai:'EVEN', poppy:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"A song mirror your echo tilts — every third spell doubles what their kit singles.",
      breakdown:"Bank echoes for the moments that matter and out-sustain the trade war with W harmonies.",
      dos:["Bank the third note for keystones","Echo-W the sustain stalemates","Chain E off any duo slow"],
      donts:["Echo farm spells off-rhythm","Race heals without the note lead","Trade outside W range"],
      win:"Double the moments their kit singles."
    },
    warden:{
      tldr:"His chain meets a root and a chorus — slow the dash, drop the beat, and charm the regroup.",
      breakdown:"Bait {K}, E-chain the commit, and encore the grouped re-engage. Engage comps feed the song.",
      dos:["E-root the engage mid-dash","Echo-shield the landed dive","Encore the grouped second wave"],
      donts:["Beat-drop the poke","Stand engage-side singing","Trade his flash window evenly"],
      win:"Root the chain and charm the encore attempt."
    },
    catcher:{
      tldr:"The catch starts a fight your root referees — drop the beat on the chain and sing the refund.",
      breakdown:"Minions beat the hook; the E-chain beats the follow-up. Hold the charm for the dive his catch was selling.",
      dos:["Stand behind minions always","Root the post-hook chain","Charm the committed dive"],
      donts:["Ward face-first into brush","Echo a panic W","Chase resets singing"],
      win:"Referee the catch and charm the consequences."
    },
    mage:{
      tldr:"A poke duel your sustain referees — trade rotations, heal the difference, and charm the conversion.",
      breakdown:"Match his zone with echoed Qs, W through the chip stalemates, and root the step-ups his rotation funds.",
      dos:["Echo-Q his casting windows","Heal the chip stalemates","Root the zone-step greed"],
      donts:["Eat the keystone mid-note","Clump the duo for his AoE","R the wave instead of the fight"],
      win:"Out-sustain the rotation and charm the conclusion."
    }
  },
  mirror:{
    tldr:"Echo mirror — note banking and charm chicken; the second encore charms a grouped team.",
    breakdown:"Track both counters, dodge her E lateral, and R second — her charm walks your team into yours.",
    dos:["Bank notes better","Dodge the E-chain start","Encore second always"],
    donts:["Echo on her rhythm","Trade W-for-W at parity","Line up with your duo"],
    win:"Better banking, later encore.",
    winS:"Her root is down — sing forward freely."
  },
  tradeGood:"Echoed Q the pair, W the trade-back, E the disengage — taxed, healed, and rooted in one verse.",
  tradeBad:"Spending the echo on a plain W off-rhythm — the third note is the champion.",
  early:"Sing the ledger — echoed pokes and duo sustain tilt even lanes quietly.",
  mid:"Encore economy: charm the rivers from fog, chain the picks, heal the sieges.",
  late:"You conduct: R through your front line, echo the heals, root the charmed remainder.",
  safetyTool:"E Beat Drop",
  spikesLine:"Level 3 chains threaten; level 6 starts fights early; first item makes echoes chunk.",
  carryLine:"Carry through the encore — one charmed formation per fight; your job is the angle through your own team.",
  dontDetail:"Your R extends through ALLIES — cast it around your team, not at the enemy.",
  aheadTpl:"Ahead, raise the volume: echo {E}'s duo off every contact and encore the objections.",
  behindTpl:"Behind, the song sustains: heal the chip, root the dives, and wait for the encore that rewrites the set list.",
  spikeName:"first item",
  runeReport:"Aery or Comet, Manaflow, Transcendence, Scorch; secondary Inspiration.",
  itemReport:"World Atlas start. Helia or Moonstone, Swiftness, Redemption paths.",
  redditLine:"count the notes, charm through bodies, and heal the margins — support Seraphine wins fights in chorus.",
  load:{ sub:"r/SeraphineMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Oblivion Orb piece vs sustain", antihealNote:"Anti-heal early into their sustain.", firstItem:"Moonstone / Helia", secondItem:"Redemption / Mikael's", boots:"Swiftness", bootsVsAP:"Mercury's / Swiftness", bootsVsAD:"Steelcaps / Swiftness", spike:"First item — echoed rotations chunk and the encore conducts.", runes:{ keystone:"Summon Aery", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    sona:{ tldr:"The scaling chord mirror you out-range — bully the early notes; her crescendo arrives later than your encore." },
    blitzcrank:{ tldr:"The hook hunts singers — stand behind bodies, root the Power Fist window, and never note-farm in the open." }
  }
}),

_supBase2({
  key:'sona', name:'Sona',
  curve:[-0.1,0.0,0.1,0.2,0.3,0.4,0.6],
  lvl:[
    "Q-chord the contacts — the aura poke is quiet and constant; the lane pays per note.",
    "W answers the trades: the sustain mirror opens and yours compounds.",
    "Full kit: the chord colors decide trades — power chord the carry, speed the disengage.",
    "Aura economy: chip, heal, speed — the margins are invisible and decisive.",
    "Crescendo online — grouped lanes pay the dance tax; your duo's all-in has a stage.",
    "First item: the auras compound and the chords chunk.",
    "Late Sona scales into a one-button teamfight: crescendo the clump and aura the cleanup."
  ],
  diffBase:{ enchanter:'EVEN', warden:'TRICKY', catcher:'TRICKY', mage:'TRICKY' },
  diffEx:{ blitzcrank:'HARD', thresh:'TRICKY', pyke:'TRICKY', nautilus:'TRICKY', leona:'TRICKY', rell:'TRICKY', alistar:'TRICKY', rakan:'TRICKY', bard:'EVEN',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'EVEN', morgana:'EVEN', neeko:'EVEN',
    soraka:'EVEN', janna:'EVEN', lulu:'EVEN', milio:'EVEN', nami:'TRICKY', seraphine:'TRICKY', senna:'EVEN', yuumi:'EVEN', zilean:'EVEN', renata:'EVEN', karma:'TRICKY',
    braum:'TRICKY', galio:'TRICKY', maokai:'TRICKY', poppy:'TRICKY', tahmkench:'TRICKY', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"A sustain mirror you out-scale — chord the margins and survive to the crescendo era.",
      breakdown:"Trade Q-chords quietly and bank the curve; your two-item auras out-value every enchanter kit in the game.",
      dos:["Chord-chip between their cycles","Bank the aura scaling","Power-chord their carry's windows"],
      donts:["Mana-race their poke early","Trade auras at even items","Stand chord-range of their engage"],
      win:"Out-scale the mirror — the auras compound."
    },
    warden:{
      tldr:"His engage hunts exactly you — chord from maximum range and pay the squishiest tax in the role carefully.",
      breakdown:"You are the lane's softest target: chip at aura edge, speed the disengages, and hold crescendo for his chain.",
      dos:["Chip strictly at aura edge","E-speed every disengage","Crescendo his committed chain"],
      donts:["Step inside his flash range","Chord-greed at half HP","Trade his all-in at any HP"],
      win:"Survive the hunt and out-scale the hunter."
    },
    catcher:{
      tldr:"The hook ends Sona conversations — stand behind everything and pay the lane tax until items.",
      breakdown:"Your mobility budget is a W heal: minion cover always, chords from the back line, crescendo the catch that lands.",
      dos:["Stand behind minions religiously","Chord from maximum range","Crescendo the landed catch's chain"],
      donts:["Cross open lanes for poke","Ward without your carry watching","Greed chords in hook range"],
      win:"Pay the tax quietly and foreclose at two items."
    },
    mage:{
      tldr:"He out-pokes the aura — heal through what you can, dodge the keystone, and scale past the rotation.",
      breakdown:"Poke supports out-rate your sustain early: W the biggest hits, give ground, and let the crescendo era re-price the lane.",
      dos:["W the rotation's biggest hit","Dodge the keystone behind cover","Bank the scaling politely"],
      donts:["Chord-duel inside his zone","Race poke with heal mana","Eat the root warding"],
      win:"Survive the chip era and crescendo the one that follows."
    }
  },
  mirror:{
    tldr:"Chord mirror — aura economy and crescendo chicken; whoever scales cleaner conducts the late game.",
    breakdown:"Match the chip, bank the curve, and R second — her dance groups your encore.",
    dos:["Win the chord-chip ledger","Bank the cleaner curve","Crescendo second"],
    donts:["Power-chord duel early","Trade auras at parity","Dance first"],
    win:"Cleaner scaling, later dance.",
    winS:"Her R is down — group freely; the stage is yours."
  },
  tradeGood:"Q-chord the pair at aura edge, W the trade-back, walk — invisible margins, compounding ledger.",
  tradeBad:"Chord-greeding inside a hook champion's range — the squishiest support in the game has no second chances.",
  early:"Chip quietly and survive loudly — your whole lane is a deposit toward the crescendo era.",
  mid:"Aura economy: speed the rotations, heal the sieges, and crescendo the river clumps.",
  late:"You are the one-button fight: crescendo the formation and let the auras conduct the cleanup.",
  safetyTool:"E Song of Celerity",
  spikesLine:"First item compounds auras; level 6 stages fights; two items make the chords chunk.",
  carryLine:"Carry through the dance — one crescendo on three is a won fight; your job is surviving to press it.",
  dontDetail:"You are the softest target in the role — positioning IS the champion; the chords are commentary.",
  aheadTpl:"Ahead, accelerate: chord {E}'s duo off every contact and crescendo the recovery attempts.",
  behindTpl:"Behind, the auras still compound: heal the deficit, speed the escapes, and arrive at the dance on time.",
  spikeName:"two items",
  runeReport:"Aery, Manaflow, Transcendence, Gathering Storm; secondary Inspiration.",
  itemReport:"World Atlas start. Helia or Moonstone, Swiftness, Redemption paths — aura items compound the kit.",
  redditLine:"chord the edge, survive the hunt, and dance on schedule — Sona wins games she was softest in.",
  load:{ sub:"r/SonaMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Oblivion Orb piece vs sustain", antihealNote:"Anti-heal early into their sustain.", firstItem:"Echoes of Helia / Moonstone", secondItem:"Redemption / Mikael's", boots:"Swiftness", bootsVsAP:"Mercury's / Swiftness", bootsVsAD:"Steelcaps / Swiftness", spike:"Two items — the auras compound and the crescendo conducts.", runes:{ keystone:"Summon Aery", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Gathering Storm"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    blitzcrank:{ tldr:"The hook was invented for Sonas — never leave minion cover, chord at maximum range only, and accept the lane tax as tuition." },
    seraphine:{ tldr:"The echo mirror out-ranges you early — concede the note war and out-scale it; your crescendo era arrives heavier." }
  }
}),

_supBase2({
  key:'soraka', name:'Soraka',
  lvl:[
    "Starcall the contacts — the self-heal funds the bank and the slow annoys their spacing.",
    "W opens the battery: your carry's HP bar is now a shared account.",
    "Equinox threats begin: the silence zone cancels engages mid-cast.",
    "Heal the margins and Q the refills — the battery economy runs the lane.",
    "Wish online — every all-in on the map gets a second health bar.",
    "First item: the heals compound and the silence zones decide dives.",
    "Late Soraka is the global bank: wish the map, silence the dives, and outlast every ledger."
  ],
  diffBase:{ enchanter:'EVEN', warden:'TRICKY', catcher:'TRICKY', mage:'TRICKY' },
  diffEx:{ blitzcrank:'HARD', thresh:'TRICKY', pyke:'TRICKY', nautilus:'TRICKY', leona:'TRICKY', rell:'TRICKY', alistar:'TRICKY', rakan:'TRICKY', bard:'EVEN',
    zyra:'TRICKY', brand:'HARD', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'TRICKY', morgana:'EVEN', neeko:'EVEN',
    janna:'EVEN', lulu:'EVEN', milio:'EVEN', nami:'TRICKY', sona:'EVEN', seraphine:'EVEN', senna:'EVEN', yuumi:'EVEN', zilean:'EVEN', renata:'EVEN', karma:'TRICKY',
    braum:'TRICKY', galio:'TRICKY', maokai:'TRICKY', poppy:'TRICKY', tahmkench:'TRICKY', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"The sustain crown is yours — out-heal the mirror and silence the trade windows that argue.",
      breakdown:"Your W out-banks every enchanter heal; fund it with Q hits and the mirror is a savings race you lead.",
      dos:["Q-fund the battery constantly","Out-heal their trade windows","Equinox their engage attempts"],
      donts:["W without Q refills banked","Race poke instead of healing","Stand Q-range of their engage"],
      win:"Out-bank the sustain crown — the battery never empties."
    },
    warden:{
      tldr:"His engage hunts the banana — heal from max range and silence the chain mid-cast.",
      breakdown:"You are the dive target; the E zone is your answer: drop it on his engage path and the chain cancels mid-cast.",
      dos:["E his engage path pre-commit","Heal from maximum range","Q only the safe refill angles"],
      donts:["Step inside flash range","W-tank his all-in personally","Greed refills at half HP"],
      win:"Silence the dive and out-bank the patience."
    },
    catcher:{
      tldr:"Every heal you channel is hook bait — bank behind cover and silence the catch's follow-up.",
      breakdown:"Hooks end banks: minion cover always, E the post-catch chain, and wish what they catch anyway.",
      dos:["Bank behind minion cover","E the post-hook chain","Wish the caught from anywhere"],
      donts:["Cross open lanes to heal","Ward face-first into brush","Q-greed in hook range"],
      win:"Survive the hooks and out-sustain the lane they wanted."
    },
    mage:{
      tldr:"He pokes the bank faster than it fills — dodge the keystone, heal the priorities, and scale to Wish.",
      breakdown:"Poke supports out-rate the battery: triage ruthlessly, fund with safe Qs, and let the global era re-price the war.",
      dos:["Triage the heals — carry first","Dodge his keystone religiously","Bank toward the Wish era"],
      donts:["Heal-race his full rotation","Q inside his zone for refills","Stand on the root lines warding"],
      win:"Triage through the chip era and out-global the rest."
    }
  },
  mirror:{
    tldr:"Banana mirror — battery economy and silence chicken; whoever's bank runs deeper outlasts.",
    breakdown:"Fund cleaner with Q, silence her healing channels, and wish second — her global tells you where.",
    dos:["Win the Q-funding race","E her heal channels","Wish second with information"],
    donts:["W-race at even banks","Trade Qs at her range","Equinox the poke"],
    win:"Deeper bank, later wish.",
    winS:"Her E is down — channel freely; the bank is open."
  },
  tradeGood:"Q the refill, W the carry, repeat — the battery economy runs while their math wonders why nothing dies.",
  tradeBad:"Healing into a full rotation with the bank empty — Soraka without Q refills is a donation with a horn.",
  early:"Fund and triage — the battery decides the lane if the hooks don't decide you.",
  mid:"Wish economy: silence the dives, bank the margins, and answer the map's emergencies globally.",
  late:"You are the outlast: wish the fights, silence the engages, and let the bank out-vote their burst math.",
  safetyTool:"E Equinox",
  spikesLine:"First item compounds the bank; level 6 goes global; the silence zones decide every dive.",
  carryLine:"Carry through the bank — nothing dies on schedule near a funded Soraka; your job is the triage.",
  dontDetail:"The W spends YOUR health — banking without Q refills is generosity with a respawn timer.",
  aheadTpl:"Ahead, out-bank everything: heal {E}'s chip into irrelevance and silence the desperation engages.",
  behindTpl:"Behind, triage harder: fund the carry, silence their snowball dives, and wish the deficit away one fight at a time.",
  spikeName:"first item",
  runeReport:"Aery or Guardian, Manaflow, Transcendence, Revitalize lines; secondary Inspiration.",
  itemReport:"World Atlas start. Moonstone, Swiftness, Redemption-Mikael's — heal amps compound the battery.",
  redditLine:"Q funds W, E cancels engages, and the Wish answers maps — Soraka wins by making death a scheduling error.",
  load:{ sub:"r/sorakamains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"They WILL buy anti-heal — itemize heal-amp past it", antihealNote:"Expect Executioner's — out-amp it.", firstItem:"Moonstone", secondItem:"Redemption / Mikael's", boots:"Swiftness", bootsVsAP:"Mercury's / Swiftness", bootsVsAD:"Steelcaps / Swiftness", spike:"Moonstone — the battery compounds past their anti-heal math.", runes:{ keystone:"Summon Aery", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Resolve", secondary:["Bone Plating","Revitalize"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    brand:{ tldr:"The burn out-paces the bank and the stun finds the healer — dodge the W zones, triage from max range, and accept the worst lane in your matchup table." },
    blitzcrank:{ tldr:"The hook was invented for healers — never leave cover, fund the bank at maximum range, and silence the Power Fist if it lands anyway." }
  }
}),

_supBase2({
  key:'yuumi', name:'Yuumi',
  curve:[-0.2,-0.1,0.0,0.1,0.3,0.3,0.5],
  lvl:[
    "Poke from the saddle — the attached Q steers and the lane can't bill you for it.",
    "Dismount windows begin: the passive autos shield and heal; schedule them carefully.",
    "Full rhythm: attach for the trades, dismount for the passive, never linger between.",
    "Zoomies the margins — the host's tempo is your tempo; bank the chip.",
    "Final Chapter online — the root waves referee every dive on your host.",
    "First item: the heals compound and the steered Qs chunk.",
    "Late Yuumi is the unkillable second health bar: attach, amplify, and out-vote the focus fire."
  ],
  diffBase:{ enchanter:'EVEN', warden:'EVEN', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ blitzcrank:'EVEN', thresh:'EVEN', pyke:'EVEN', nautilus:'EVEN', leona:'EVEN', rell:'EVEN', alistar:'EVEN', rakan:'EVEN', bard:'EVEN',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'TRICKY', morgana:'EVEN', neeko:'EVEN',
    soraka:'EVEN', janna:'EVEN', lulu:'EVEN', milio:'EVEN', nami:'TRICKY', sona:'EVEN', seraphine:'TRICKY', senna:'TRICKY', zilean:'EVEN', renata:'EVEN', karma:'EVEN',
    braum:'EVEN', galio:'EVEN', maokai:'EVEN', poppy:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"A sustain mirror from the saddle — your heals ride for free while theirs walk through trades.",
      breakdown:"Steer Qs through the pair and bank Zoomies for the trade windows; the attached economy out-margins walkers.",
      dos:["Steer Q through the duo's line","Zoomies the carry's trade windows","Dismount only on schedule"],
      donts:["Linger dismounted past the passive","Race heals during anti-heal windows","Q-poke when the host needs the heal"],
      win:"Out-margin the mirror from the saddle."
    },
    warden:{
      tldr:"His engage targets the host — your kit makes the host two health bars deep; heal through the chain.",
      breakdown:"You can't be peeled off; you CAN be out-bursted: heal the chain's damage, root the second wave with R, and dismount-bait never.",
      dos:["Heal through the chain's burst","R the second engage wave","Steer Qs at the waiting tank"],
      donts:["Dismount during his window","Attach to the dive target last-second","Greed passive procs in flash range"],
      win:"Make the host's health bar a committee decision."
    },
    catcher:{
      tldr:"The hook can't catch the attached — it catches the host; pick a host who respects that.",
      breakdown:"Your safety is borrowed: steer Qs, keep Zoomies banked for the caught, and dismount only behind walls.",
      dos:["Bank Zoomies for the catch","Steer the Q at the hook's owner","Dismount behind terrain only"],
      donts:["Ride a host who face-checks","Passive-proc in open lanes","R the poke instead of the chain"],
      win:"Borrow safety wisely and out-sustain the catches."
    },
    mage:{
      tldr:"He pokes the host you're taped to — heal the chip, steer the answers, and out-scale the rotation.",
      breakdown:"Poke taxes the shared health bar: triage with E, dodge nothing (you can't), and bank the curve the saddle protects.",
      dos:["E-heal the rotation's biggest hit","Steer Qs at the caster's gaps","Bank the saddle's scaling"],
      donts:["Dismount inside his zone","Heal-race the full rotation","Attach-hop predictably"],
      win:"Outlast the poke from the saddle and re-price at items."
    }
  },
  mirror:{
    tldr:"Saddle mirror — host quality and dismount discipline; the better-taped cat wins.",
    breakdown:"Steer better Qs, schedule cleaner passives, and R second — her root wave tells your host where to stand.",
    dos:["Win the steered-Q ledger","Schedule passives cleaner","R second with information"],
    donts:["Dismount-duel — comedy, not strategy","Trade hosts' health evenly","Q-duel at saddle parity"],
    win:"Better host, cleaner schedule.",
    winS:"She dismounted — there is briefly a cat to kill; do."
  },
  tradeGood:"Steer the Q through the pair, E the trade-back, auto from the passive window — billed, healed, and re-saddled.",
  tradeBad:"Lingering dismounted for one more auto — the cat on foot is the game's most honest kill.",
  early:"Ride and steer — the lane can't touch you; make the host's trades dishonest.",
  mid:"Zoomies economy: amplify the skirmishes, root the dives, and keep the host's bar a committee.",
  late:"You are the second health bar: attach to the win condition and out-vote the focus.",
  safetyTool:"W attach (untargetability)",
  spikesLine:"First item compounds the saddle; level 6 referees dives; late game the host is unkillable on schedule.",
  carryLine:"Carry by amplification — the host plays with two kits and two health bars; your job is the schedule.",
  dontDetail:"Dismount windows are scheduled, not improvised — the cat on foot is everyone's favorite headline.",
  aheadTpl:"Ahead, amplify louder: steer {E}'s duo into chip debt and root the recovery dives.",
  behindTpl:"Behind, the saddle holds: heal the deficit, root their snowball, and re-enter through the host's spike.",
  spikeName:"first item",
  runeReport:"Aery, Manaflow, Transcendence, Scorch; secondary Inspiration.",
  itemReport:"World Atlas start. Moonstone, then Redemption-Ardent paths — heal amps ride free.",
  redditLine:"steer the Qs, schedule the dismounts, and marry the right host — Yuumi wins as a committee vote.",
  load:{ sub:"r/YuumiMains", start:"World Atlas + potions", normalBack:"Wards + Moonstone piece (≈700g)", antihealBack:"Expect Executioner's — out-amp it", antihealNote:"They will anti-heal; amp past it.", firstItem:"Moonstone", secondItem:"Redemption / Ardent", boots:"None until forced — the saddle walks for you", bootsVsAP:"(host's problem)", bootsVsAD:"(host's problem)", spike:"Moonstone — the committee health bar compounds.", runes:{ keystone:"Summon Aery", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    nami:{ tldr:"The bubble hits the host and the bounce bills the saddle — steer Qs at her first and heal through the tide tax." },
    senna:{ tldr:"Her souls out-scale your saddle — steer the chip at her collection walks and root the W windows." }
  }
}),

_supBase2({
  key:'zilean', name:'Zilean',
  lvl:[
    "Q-bomb the contacts — the sticky chip annoys and the double-bomb threat governs.",
    "W loops begin: the rewind means your cooldowns lie; theirs don't.",
    "Double-bomb stun live: Q-W-Q is the lane's longest-range stun setup.",
    "Bank XP and chip the margins — your duo levels early and spikes rude.",
    "Chronoshift online — their kill math now includes an undo button.",
    "First item: the bombs chunk and the speed warps decide every chase.",
    "Late Zilean rewrites fights: revive the carry, slow the divers, and double-bomb the chokes."
  ],
  diffBase:{ enchanter:'EVEN', warden:'EVEN', catcher:'EVEN', mage:'EVEN' },
  diffEx:{ blitzcrank:'TRICKY', thresh:'EVEN', pyke:'TRICKY', nautilus:'EVEN', leona:'EVEN', rell:'EVEN', alistar:'EVEN', rakan:'EVEN', bard:'EVEN',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'EVEN', hwei:'TRICKY', swain:'EVEN', morgana:'EVEN', neeko:'EVEN',
    soraka:'EVEN', janna:'EVEN', lulu:'EVEN', milio:'EVEN', nami:'EVEN', sona:'EVEN', seraphine:'EVEN', senna:'EVEN', yuumi:'EVEN', renata:'EVEN', karma:'EVEN',
    braum:'EVEN', galio:'EVEN', maokai:'EVEN', poppy:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"A utility mirror your XP bank tilts — the level lead arrives before their item lead does.",
      breakdown:"Chip with bombs, bank the passive levels onto your carry, and double-bomb the trade windows their sustain funds.",
      dos:["Bomb-chip every contact","Gift the level lead to your carry","Double-bomb their committed trades"],
      donts:["Race sustain with bombs alone","Spend the stun setup on poke","Trade past their spike politely"],
      win:"Out-level the sustain mirror and out-stun its margins."
    },
    warden:{
      tldr:"His engage meets a slow the size of a lane and a stun the size of a mistake — warp the chain backward.",
      breakdown:"E-slow the committed dash, double-bomb the landing, and revive whatever the chain still caught.",
      dos:["E-slow the engage mid-dash","Double-bomb the landing zone","Chronoshift the chain's catch"],
      donts:["Bomb-poke through his block windows","Stand engage-side of the carry","R the chip instead of the kill"],
      win:"Warp the dive backward and revive the bookkeeping."
    },
    catcher:{
      tldr:"His catch meets your undo button — slow the chain, stun the follow-up, revive the verdict.",
      breakdown:"Minions beat the hook, the E breaks the chase, and the R refunds the catch that worked anyway.",
      dos:["Stand behind minions always","E the post-catch chase","R the caught at the right HP"],
      donts:["Ward face-first into brush","R early on a survivable catch","Bomb-duel inside hook range"],
      win:"Refund the catches and bill the patience."
    },
    mage:{
      tldr:"A poke war your warps referee — dodge the keystone, chip the bombs, and revive the conversion attempt.",
      breakdown:"Trade bomb-for-spell, speed the carry off the zone lines, and remember their kill math includes your undo.",
      dos:["Bomb-trade his casting windows","E-speed the carry off zones","R the all-in his poke funded"],
      donts:["Eat the keystone placing bombs","Double-bomb the wave","Heal-race — you can't; warp instead"],
      win:"Out-warp the poke war and undo its conclusion."
    }
  },
  mirror:{
    tldr:"Time mirror — XP banks and undo chicken; whoever revives second revives the winner.",
    breakdown:"Out-level his bank, dodge the double-bombs, and R second — his revive shows you the fight's real ledger.",
    dos:["Win the XP banking race","Dodge the second bomb always","R second with the ledger"],
    donts:["Bomb-duel at even loops","R first on even fights","Trade warps at parity"],
    win:"Better bank, later undo.",
    winS:"His R is down — kills stay killed; commit."
  },
  tradeGood:"Q the carry, W, Q the stun, walk — the double-bomb chunk that started as chip.",
  tradeBad:"Spending the R on a survivable catch — the undo insures deaths, not discomfort.",
  early:"Chip and bank — the bombs annoy, the XP compounds, and the stun governs.",
  mid:"Warp economy: speed the picks, slow the dives, revive the mistakes.",
  late:"You rewrite fights: R the carry's death, E the chase math, and double-bomb the choke they must cross.",
  safetyTool:"E Time Warp",
  spikesLine:"Level 3 double-bombs govern; level 6 adds the undo; first item makes the chip chunk.",
  carryLine:"Carry through revision — their best fight has an asterisk; your job is the timing of the footnote.",
  dontDetail:"The R is for deaths, not discomfort — early revives refund nothing.",
  aheadTpl:"Ahead, bank louder: level your carry past {E}'s curve and double-bomb the comeback windows.",
  behindTpl:"Behind, time forgives: slow their snowball, revive the focus, and let the XP bank rebuild the books.",
  spikeName:"first item",
  runeReport:"Aery or Glacial, Manaflow, Transcendence, Scorch; secondary Inspiration.",
  itemReport:"World Atlas start. Helia or Mandate, Swiftness, Redemption paths.",
  redditLine:"double-bomb the stun, bank the levels, and revive winners not feelings — Zilean wins with footnotes.",
  load:{ sub:"r/ZileanMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Oblivion Orb piece vs sustain", antihealNote:"Anti-heal early into their sustain.", firstItem:"Imperial Mandate / Helia", secondItem:"Redemption path", boots:"Swiftness", bootsVsAP:"Mercury's / Swiftness", bootsVsAD:"Steelcaps / Swiftness", spike:"First item — the double-bomb chunks and the warps govern chases.", runes:{ keystone:"Summon Aery", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    pyke:{ tldr:"His execute ignores your revive's math — R BEFORE the X lands or the undo undoes nothing; slow his W approaches on principle." },
    zyra:{ tldr:"The garden out-chips the clock — dodge the root, bomb the plants' owner, and bank toward the fights your R rewrites." }
  }
})
];

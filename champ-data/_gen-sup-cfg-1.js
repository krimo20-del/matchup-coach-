// MatchupCoach — SUPPORT generator configs batch 1: Janna, Karma, Lulu, Milio, Nami, Renata.
function _supBase(o){ return Object.assign({
  curve:[0.1,0.1,0.2,0.2,0.3,0.3,0.3],
  winS:"His engage is spent — trade freely with your carry.",
  waveBest:"a lane your carry controls while you hold river vision — the wave is theirs; the map seams are yours.",
  waveWorst:"a shoved wave with no vision and your key cooldown down — the support alone in fog is the lane's bounty.",
  behindShort:"peel only and rebuild through vision control.",
  loadingRule:"Track his engage cooldown — your duo trades only when it's down.",
  summReport:"Flash + standard support second (Ignite into kill lanes, Exhaust into dive, Heal if your carry runs Cleanse).",
  jungleLine:"Your CC plus jungler arrival decides bot — ping gank windows on his engage cooldown and hold the river bush vision.",
}, o); }
window.GEN_SUP_CFGS_1 = [

_supBase({
  key:'janna', name:'Janna',
  lvl:[
    "Auto-harass with Tailwind and hold Q — your chip is real and your disengage is law.",
    "W-poke the contacts; the tornado threat already taxes their engage plans.",
    "Full kit: shield the trades, slow the answers, and break the first real engage with Q.",
    "Chip and shield the margins — every broken engage is a won trade your carry banks.",
    "Monsoon online — dives on your duo now end in a healing field they paid for.",
    "First item: shields grow and the disengage toolkit compounds.",
    "Late Janna erases engages: tornado the dive, monsoon the collapse, shield the carry through the rest."
  ],
  diffBase:{ enchanter:'EVEN', warden:'EVEN', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ blitzcrank:'FAVOURED', leona:'FAVOURED', nautilus:'FAVOURED', rell:'FAVOURED', alistar:'FAVOURED', thresh:'EVEN', pyke:'EVEN', rakan:'FAVOURED',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'EVEN', morgana:'EVEN', neeko:'EVEN',
    soraka:'EVEN', lulu:'EVEN', milio:'EVEN', nami:'EVEN', sona:'EVEN', seraphine:'EVEN', senna:'TRICKY', yuumi:'EVEN', zilean:'EVEN', renata:'EVEN', karma:'TRICKY', braum:'EVEN', galio:'EVEN', maokai:'EVEN', poppy:'EVEN', tahmkench:'EVEN', taric:'EVEN', bard:'EVEN' },
  vs:{
    enchanter:{
      tldr:"A sustain mirror you win on tempo — chip with autos and make every engage they buy a refund.",
      breakdown:"Trade Tailwind autos into their shields and hold Q for the all-in neither enchanter can start alone. The disengage queen wins enchanter wars by making fights optional.",
      dos:["Auto-chip between their heal cycles","Hold Q for the jungler, not the lane","Shield the carry's trade window exactly"],
      donts:["Tornado their poke out of reflex","Trade shields at even HP","Push past river without the gale banked"],
      win:"Out-chip the sustain war and veto the fights it produces."
    },
    warden:{
      tldr:"His whole kit is one engage chain — the tornado breaks its first link and the lane never starts.",
      breakdown:"Bait {K} with spacing, Q the commit mid-dash, and monsoon whatever lands anyway. Engage supports versus Janna is a refund counter.",
      dos:["Q his engage mid-dash, every time","Shield the target he marked","Monsoon the dive that got through"],
      donts:["Burn Q on poke spacing","Stand hook-side of your carry","Trade in his flash-range window"],
      win:"Break the chain's first link and bill the refund."
    },
    catcher:{
      tldr:"He needs one catch — your wind says no. Stand off the hook lines and veto the follow-up.",
      breakdown:"Minion cover beats the hook; your Q beats the chain that follows one anyway. The lane is a vision war where your disengage is the safety net.",
      dos:["Stand behind minions always","Q the post-hook chain instantly","Ward the flank he rotates through"],
      donts:["Eat the hook warding face-first","Shield before the hook lands — react","Chase the catcher into fog"],
      win:"Make the catch worthless — the chain dies at link two."
    },
    mage:{
      tldr:"He out-pokes the wind — shield the chip, dodge the root, and wait for the engage his mana eventually buys.",
      breakdown:"Poke supports beat your sustain math: E the biggest hits, keep your carry off the zone lines, and veto the all-in their chip sets up. You lose the lane politely and win every fight after.",
      dos:["Shield the carry's biggest chip moments","Dodge the root behind minions","Veto the all-in their poke earns"],
      donts:["Auto-duel inside his zone","Q the poke instead of the engage","Trade shields into his rotation"],
      win:"Survive the chip war and erase the fight it was funding."
    }
  },
  mirror:{
    tldr:"Wind mirror — whoever holds Q longer vetoes the only fight that happens.",
    breakdown:"Chip evenly and out-patience the gale war; the second tornado always answers the first.",
    dos:["Hold Q longer than hers","Out-chip the auto war","Monsoon second in the dive"],
    donts:["Tornado first at even HP","Shield-duel at parity","Engage — ever, really"],
    win:"The patient breeze vetoes last and wins.",
    winS:"Her gale is down — your duo trades freely."
  },
  tradeGood:"Auto the carry, W the support, shield the answer — chip trades the wind referees.",
  tradeBad:"Burning Q on poke and meeting the real engage with a shrug — the tornado is the matchup.",
  early:"Chip and hold — your Q veto makes every aggressive support play a coin they lose.",
  mid:"Monsoon economy: break the dives, shield the picks, and speed the carry's kite.",
  late:"You erase engages: tornado the entry, monsoon the commit, shield whoever they wanted.",
  safetyTool:"Q Howling Gale",
  spikesLine:"Level 1 chip bullies; level 6 refunds dives; first item compounds the shields.",
  carryLine:"Carry by veto — every engage they buy, you refund; your carry plays the game your wind permits.",
  dontDetail:"The charged Q crosses the lane — the uncharged panic Q crosses a sidewalk; charge it when you can.",
  aheadTpl:"Ahead, chip louder: zone {E} with auto threat, veto every answer, and let your carry farm a lane with no weather.",
  behindTpl:"Behind, the veto still works: shield the deficit, break their dives, and out-scale through utility.",
  spikeName:"first item",
  runeReport:"Guardian or Aery, Font of Life... standard: Aery, Manaflow, Transcendence, Scorch; secondary Inspiration.",
  itemReport:"World Atlas start. Echoes of Helia or Moonstone line, Boots of Swiftness, then Redemption-Mikael's by threat.",
  redditLine:"charge the gale, shield reactively, and treat engages as appointments you decline — Janna wins by veto.",
  load:{ sub:"r/Jannamains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Oblivion Orb piece if their sustain runs the lane", antihealNote:"Anti-heal early into their sustain.", firstItem:"Echoes of Helia / Moonstone", secondItem:"Redemption / Mikael's", boots:"Swiftness", bootsVsAP:"Mercury's / Swiftness", bootsVsAD:"Steelcaps / Swiftness", spike:"First enchanter item — the shields start refunding fights.", runes:{ keystone:"Summon Aery", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    blitzcrank:{ tldr:"The hook decides nothing when the chain's second link meets a tornado — stand off the lines and Q the Power Fist window." },
    zyra:{ tldr:"Her garden out-chips your wind and the root ignores your veto — dodge the E line and shield the plant focus; the lane is rent you pay till 6." }
  }
}),

_supBase({
  key:'karma', name:'Karma',
  lvl:[
    "RQ from level 1 — the empowered poke is the strongest level-1 button in the role.",
    "Q-chip the contacts; the mantra cycle taxes every trade they consider.",
    "Full kit: tether the overstep, shield-speed the trades — the lane bully era peaks here.",
    "Chip below all-in range and call the jungler — your RQ-W chains convert every gank.",
    "No new ult — press the early lead; scaling supports are waking up behind you.",
    "First item: RQ chunks and RE engages — convert to plates and picks now.",
    "Late Karma enables: RE the engage, tether the diver, RQ the sieges."
  ],
  diffBase:{ enchanter:'FAVOURED', warden:'EVEN', catcher:'EVEN', mage:'EVEN' },
  diffEx:{ soraka:'FAVOURED', yuumi:'FAVOURED', sona:'FAVOURED', milio:'EVEN', lulu:'EVEN', nami:'EVEN', janna:'FAVOURED', zilean:'EVEN', renata:'EVEN', seraphine:'EVEN', senna:'EVEN',
    blitzcrank:'EVEN', thresh:'EVEN', pyke:'TRICKY', nautilus:'EVEN', leona:'TRICKY', rell:'TRICKY', alistar:'TRICKY', rakan:'EVEN', bard:'EVEN',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'EVEN', hwei:'TRICKY', swain:'EVEN', morgana:'EVEN', neeko:'EVEN',
    braum:'EVEN', galio:'EVEN', maokai:'EVEN', poppy:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"You out-poke the heal class before it heals — RQ the lane into deficit and keep it there.",
      breakdown:"Your mantra poke out-paces enchanter sustain math pre-items: chip the carry, tether the support's cover attempts, and spend the lane lead on plates.",
      dos:["RQ the carry on every contact","Tether the cover attempts","Cash the bully window in plates"],
      donts:["Coast at even sustain","Spend mantra on waves","Trade past their item spikes politely"],
      win:"Out-poke the sustain class while the poke still leads."
    },
    warden:{
      tldr:"His engage meets a tether and a shield-sprint — root the chain and chip the armor that funded it.",
      breakdown:"Bait {K}, tether the commit, and RE your duo out of whatever lands. The engage tank pays poke-tax every second he waits.",
      dos:["Tax the wait with RQ chip","Tether his engage mid-dash","RE-speed the disengage"],
      donts:["Stand on the engage line poking","Burn the tether on spacing","Trade his all-in at even HP"],
      win:"Tax the patience and root the impatience."
    },
    catcher:{
      tldr:"His catch needs stillness your speed denies — chip the wait and RE the consequences.",
      breakdown:"Hooks lose to mobility math: chip from angles, hold RE for the landed catch, and tether the chain's second link.",
      dos:["Chip from off-angles constantly","RE the caught carry instantly","Tether the follow-up dash"],
      donts:["Stand behind thin minion cover","Mantra poke when the hook is up","Ward face-first into his brush"],
      win:"Deny the stillness the catch requires."
    },
    mage:{
      tldr:"A poke mirror at mantra rates — your RQ hits harder; their rotation lasts longer. Win early or don't.",
      breakdown:"Trade RQ-for-rotation while your numbers lead, dodge the root that flips it, and spend the lane lead before their scaling files.",
      dos:["Win the early poke exchange rate","Dodge the keystone root","Convert before their item spike"],
      donts:["Spam shields into their poke","Trade past first item parity","Eat the zone for one Q"],
      win:"Out-rate the poke war early and bank it."
    }
  },
  mirror:{
    tldr:"Mantra mirror — whoever RQs people instead of minions wins; tether discipline decides the all-ins.",
    breakdown:"Dodge her RQ (it's the trade), land yours, and hold the tether through her shield-speed.",
    dos:["Dodge her RQ first","Hold the tether's ground","Win the Manaflow race"],
    donts:["Trade Q-for-Q on her timer","Mantra waves while she banks","Chase through her RE speed"],
    win:"Land the mantra, dodge hers — the ledger decides.",
    winS:"Her mantra is spent — thirty free seconds."
  },
  tradeGood:"RQ the carry at wave contact, tether the answer, walk — the chip leads the lane's ledger.",
  tradeBad:"Spending mantra on a wave while the enemy banks theirs for your face.",
  early:"Bully loudly — your level 1-5 poke leads the role; spend it before it expires.",
  mid:"Convert: plates, picks with the tether, RE engages for your jungler.",
  late:"Enable: RE the engage, shield the carries, tether whatever dives.",
  safetyTool:"RE shield-speed",
  spikesLine:"Level 1 RQ bullies; first item is the kill window; past two items you enable.",
  carryLine:"Carry early or enable late — RQ chips win lanes; RE and tethers win the fights the lead bought.",
  dontDetail:"The tether breaks if YOU leave — hold the ground or don't throw it.",
  aheadTpl:"Ahead, sprint: RQ {E}'s duo off every wave and convert to plates — Karma leads expire; spend fast.",
  behindTpl:"Behind, transition early: shield, speed, tether — the utility never falls off even when the poke does.",
  spikeName:"first item",
  runeReport:"Aery or Comet, Manaflow, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight.",
  itemReport:"World Atlas start. Helia or Imperial Mandate line, Swiftness, then Redemption paths.",
  redditLine:"RQ people not minions, hold tether ground, and respect the fall-off — Karma wins early or enables late.",
  load:{ sub:"r/KarmaMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Oblivion Orb piece vs sustain duos", antihealNote:"Anti-heal early into their sustain.", firstItem:"Imperial Mandate / Helia", secondItem:"Redemption path", boots:"Swiftness", bootsVsAP:"Mercury's / Swiftness", bootsVsAD:"Steelcaps / Swiftness", spike:"First item — the RQ window where Karma genuinely kills duos.", runes:{ keystone:"Summon Aery", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    pyke:{ tldr:"His regeneration eats your chip ledger in fog — RQ in front of wards only, and tether the W approach before the hook exists." },
    zyra:{ tldr:"The garden out-trades the mantra rate — dodge the E, chip the plants down, and spend the lead before her 6 re-prices the lane." }
  }
}),

_supBase({
  key:'lulu', name:'Lulu',
  lvl:[
    "Glitterlance the contacts — the Pix angles double your poke and the chip is constant.",
    "E-mark trades begin: Pix on the carry makes every auto a volley.",
    "Polymorph online — their engage now has a 1.5-second hole where a champion used to be.",
    "Chip and mark the margins; hold W for the dive their kit is saving up for.",
    "Wild Growth online — burst math on your carry dies; the knockup punishes the divers who try.",
    "First item: shields compound and the polymorph windows decide every 2v2.",
    "Late Lulu deletes dives: poly the assassin, grow the carry, and watch their plan become a squirrel."
  ],
  diffBase:{ enchanter:'EVEN', warden:'EVEN', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ blitzcrank:'FAVOURED', leona:'FAVOURED', nautilus:'FAVOURED', rell:'FAVOURED', alistar:'FAVOURED', rakan:'FAVOURED', thresh:'EVEN', pyke:'EVEN', bard:'EVEN',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'EVEN', morgana:'EVEN', neeko:'EVEN',
    soraka:'EVEN', janna:'EVEN', milio:'EVEN', nami:'EVEN', sona:'EVEN', seraphine:'EVEN', senna:'TRICKY', yuumi:'EVEN', zilean:'EVEN', renata:'EVEN', karma:'TRICKY',
    braum:'EVEN', galio:'EVEN', maokai:'EVEN', poppy:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"A shield mirror your polymorph headlines — their best trade window becomes a squirrel cameo.",
      breakdown:"Chip with Q angles and save W for the enemy carry's steroid moment — a polymorphed DPS window is a refunded fight.",
      dos:["Q through Pix's doubled angles","Poly the carry's steroid window","Shield the trade-back exactly"],
      donts:["Poly the support — ever","Trade shields at even HP","Chip with W's range as if it's poke"],
      win:"Out-utility the mirror — squirrels don't DPS."
    },
    warden:{
      tldr:"His engage chain has a polymorph-shaped hole — turn the diver into wildlife and shield the leftovers.",
      breakdown:"Bait {K}, poly the commit mid-chain, and grow your carry if it lands anyway. Engage tanks hate this one trick.",
      dos:["Poly the engage mid-dash","Grow the carry under the dive","Chip the wait with Q taxes"],
      donts:["Burn poly on poke spacing","Stand engage-side of your carry","Trade his flash window at even HP"],
      win:"Make the dive a nature documentary."
    },
    catcher:{
      tldr:"The catch needs a follow-up your W deletes — stand off the lines and squirrel the chain.",
      breakdown:"Minions beat the hook; poly beats the chain. Hold the R for the caught carry — the knockup peels what the squirrel can't.",
      dos:["Stand behind minions always","Poly the post-hook follow-up","R the caught carry instantly"],
      donts:["Shield pre-hook on prediction","Ward face-first into brush","Chase the catcher's reset"],
      win:"Veto the chain at link two — squirrels can't combo."
    },
    mage:{
      tldr:"He out-pokes the faerie — shield the chip, dodge the root, and bank the W for the engage the poke funds.",
      breakdown:"Poke supports tax your lane; your anti-dive taxes their conversion. Lose the chip war slowly and refund the all-in completely.",
      dos:["Shield the biggest chip windows","Dodge the root line religiously","Refund the all-in with poly + R"],
      donts:["Q-duel inside his zone","Poly the poke out of tilt","Trade Pix marks for half your HP"],
      win:"Concede the chip and confiscate the conversion."
    }
  },
  mirror:{
    tldr:"Squirrel mirror — whoever polys the right target second wins; the R war answers itself.",
    breakdown:"Hold your W for her carry's window, dodge her Q angles, and grow second — her knockup feeds yours timing.",
    dos:["Poly her carry's steroid","Hold R for the real dive","Win the Pix chip ledger"],
    donts:["Poly-duel the support war","R first on a feint","Trade at shield parity"],
    win:"Better poly targets, later growth — the wiser yordle wins.",
    winS:"Her W is down — your carry's window is clean."
  },
  tradeGood:"Q the doubled angle, E-mark the carry, auto — Pix volleys the chip while your buttons wait for the real question.",
  tradeBad:"Polymorphing poke out of irritation and meeting the engage with a shrug — the W is the matchup.",
  early:"Chip with the faerie and bank the buttons — your kit answers their plan, not their poke.",
  mid:"Poly economy: squirrel the divers, grow the carries, and convert the refunds to objectives.",
  late:"You delete the enemy's best moment: poly the assassin mid-dash, R the dive's landing, shield the rest.",
  safetyTool:"W Whimsy",
  spikesLine:"Level 3 poly re-prices 2v2s; level 6 deletes burst math; first item compounds the kit.",
  carryLine:"Carry by subtraction — the poly removes their best champion for the fight's deciding seconds.",
  dontDetail:"Polymorph the carry, not the tank — squirreling a Leona is a cosmetic.",
  aheadTpl:"Ahead, squirrel the comeback: poly {E}'s every play, grow the carry, and zone with Pix chip.",
  behindTpl:"Behind, the buttons still work: poly their snowball, R their dives, and shield through to relevance.",
  spikeName:"first item",
  runeReport:"Aery, Manaflow, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight.",
  itemReport:"World Atlas start. Helia/Moonstone line, Swiftness, then Mikael's-Redemption.",
  redditLine:"poly carries not tanks, grow second not first, and let Pix do the poking — Lulu wins the enemy's best moment.",
  load:{ sub:"r/LuluMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Oblivion Orb piece vs sustain", antihealNote:"Anti-heal early into their sustain.", firstItem:"Moonstone / Helia", secondItem:"Mikael's / Redemption", boots:"Swiftness", bootsVsAP:"Mercury's / Swiftness", bootsVsAD:"Steelcaps / Swiftness", spike:"First item — poly windows decide every 2v2.", runes:{ keystone:"Summon Aery", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    pyke:{ tldr:"Poly the E-dash or the R-cast — both squirrel beautifully; his executes meet a knupped carry instead." },
    zyra:{ tldr:"The garden ignores the squirrel — dodge the root, shield the plant focus, and pay rent quietly till items." }
  }
}),

_supBase({
  key:'milio', name:'Milio',
  lvl:[
    "Q-poke the contacts — the rebound catches the second body; bot stands in pairs.",
    "E-shields begin: two charges of trade insurance; count them like summoners.",
    "Full kit: the campfire's range gift means your duo out-ranges theirs standing still.",
    "Chip and warm the margins — the burn passive taxes every shielded trade.",
    "Breath of Life online — their CC chain comp now answers to one cleansing button.",
    "First item: the fire compounds and the range zone decides every poke war.",
    "Late Milio un-CCs teamfights: cleanse the chain, range the siege, and warm the carry through everything."
  ],
  diffBase:{ enchanter:'EVEN', warden:'EVEN', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ leona:'FAVOURED', nautilus:'FAVOURED', rell:'FAVOURED', alistar:'FAVOURED', blitzcrank:'EVEN', thresh:'EVEN', pyke:'EVEN', rakan:'FAVOURED', bard:'EVEN',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'EVEN', morgana:'EVEN', neeko:'EVEN',
    soraka:'EVEN', janna:'EVEN', lulu:'EVEN', nami:'EVEN', sona:'EVEN', seraphine:'EVEN', senna:'TRICKY', yuumi:'EVEN', zilean:'EVEN', renata:'EVEN', karma:'EVEN',
    braum:'EVEN', galio:'EVEN', maokai:'EVEN', poppy:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"A warmth mirror your range gift tilts — the campfire makes your duo's pokes reach first.",
      breakdown:"Trade inside the W zone where your carry out-ranges everything, and bank E charges for their windows. The fire chip decides sustain mirrors.",
      dos:["Fight inside the campfire's gift","Bank both E charges for their windows","Q the rebound through the pair"],
      donts:["Trade outside your range zone","Spend both shields on chip","Race heals without the burn ledger"],
      win:"Out-range the sustain mirror from inside the fire."
    },
    warden:{
      tldr:"His chain meets two shields and a cleanse — the engage comp pays full price for half a fight.",
      breakdown:"Bait {K}, shield the link that lands, and hold R for the full chain. Engage tanks versus Milio is a subscription they can't cancel.",
      dos:["Shield the chain's first link","R the full chain, not the poke","Tax the wait with Q rebounds"],
      donts:["Burn R on one stun","Stand engage-side of the fire","Trade his flash window evenly"],
      win:"Refund the chain and bill the patience."
    },
    catcher:{
      tldr:"The catch needs follow-up your cleanse deletes — stand off the lines and un-CC the consequences.",
      breakdown:"Minions beat the hook, shields beat the burst, and R beats the chain. The catcher's whole plan is your ult's job description.",
      dos:["Stand behind minions always","Shield the caught instantly","R the chain at its second link"],
      donts:["Cleanse one hook out of panic","Ward face-first into his brush","Chase the reset through fog"],
      win:"Delete the chain the catch was selling."
    },
    mage:{
      tldr:"He out-pokes the fire — shield the chip, hold the zone, and cleanse the all-in his mana funds.",
      breakdown:"Poke supports out-rate your sustain; your W range gift argues back. Trade only inside the zone and refund the conversion with R.",
      dos:["Trade only inside the campfire","Shield the rotation's biggest hit","Cleanse the engage, not the chip"],
      donts:["Poke-duel outside your zone","Spend E charges on half-pokes","Eat the root warding"],
      win:"Hold the zone war and confiscate the conversion."
    }
  },
  mirror:{
    tldr:"Campfire mirror — zone placement and cleanse chicken; whoever Rs second un-CCs the fight that mattered.",
    breakdown:"Offset your zone from his, bank E charges, and hold R for their real chain — the second cleanse always answers more.",
    dos:["Offset the campfire zones","R second, always","Win the burn-chip ledger"],
    donts:["Zone-duel at even range","Cleanse a single stun","Trade shields at parity"],
    win:"Better zones, later cleanse — the warmer fire wins.",
    winS:"His R is spent — chain them; nothing answers now."
  },
  tradeGood:"Q the rebound through the pair, warm the carry, auto — the burn ledger compounds while the buttons wait.",
  tradeBad:"Spending the R on a single stun — the cleanse answers chains; chains wait for it to be gone.",
  early:"Warm and chip — the fire taxes trades and the zone re-prices ranges.",
  mid:"Cleanse economy: un-CC the picks, range the sieges, shield the margins.",
  late:"You delete CC comps: R the chain, W the range war, and warm the carry through the burst.",
  safetyTool:"R Breath of Life",
  spikesLine:"Level 3 charges insure trades; level 6 deletes CC comps; first item compounds the fire.",
  carryLine:"Carry by un-happening — their CC chain is your R's job; your carry plays the fight uninterrupted.",
  dontDetail:"The cleanse answers CHAINS — spent on one stun, the real chain arrives uninsured.",
  aheadTpl:"Ahead, warm the map: zone {E} with fire chip, range the sieges, and cleanse the comeback attempts.",
  behindTpl:"Behind, the fire holds: shield the deficit, cleanse their snowball chains, and out-scale through warmth.",
  spikeName:"first item",
  runeReport:"Aery, Manaflow, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight.",
  itemReport:"World Atlas start. Helia/Moonstone, Swiftness, Redemption paths.",
  redditLine:"fight inside the fire, bank the charges, and cleanse chains not stuns — Milio wins by un-happening their plan.",
  load:{ sub:"r/MilioMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Oblivion Orb piece vs sustain", antihealNote:"Anti-heal early into their sustain.", firstItem:"Moonstone / Helia", secondItem:"Redemption / Mikael's", boots:"Swiftness", bootsVsAP:"Mercury's / Swiftness", bootsVsAD:"Steelcaps / Swiftness", spike:"First item — the zone war and the burn ledger compound.", runes:{ keystone:"Summon Aery", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    leona:{ tldr:"Her full chain is your R's resume — shield the E-link, cleanse the lock, and bill her flash-range patience with rebounds." },
    zyra:{ tldr:"The garden out-chips the campfire — dodge the root, trade inside your zone only, and cleanse the bramble all-in." }
  }
}),

_supBase({
  key:'nami', name:'Nami',
  lvl:[
    "W-bounce the trades — the heal-damage bounce wins every honest level 1 exchange.",
    "Bubble threats begin: the lane's longest stun re-prices their every step-up.",
    "Full kit: E the carry's autos and the buffed trade window out-damages their plan.",
    "Tide the margins: bounce the trades, bubble the answers, and bank the tempo passive.",
    "Tidal Wave online — engages arrive on a wave and disengages leave on one.",
    "First item: the bounce chunks and the bubble converts every gank.",
    "Late Nami conducts: wave the engage, bubble the peel, and E whoever's swinging."
  ],
  diffBase:{ enchanter:'EVEN', warden:'EVEN', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ leona:'EVEN', nautilus:'EVEN', rell:'EVEN', alistar:'EVEN', blitzcrank:'EVEN', thresh:'EVEN', pyke:'TRICKY', rakan:'EVEN', bard:'EVEN',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'EVEN', morgana:'EVEN', neeko:'EVEN',
    soraka:'FAVOURED', janna:'EVEN', lulu:'EVEN', milio:'EVEN', sona:'FAVOURED', seraphine:'EVEN', senna:'EVEN', yuumi:'FAVOURED', zilean:'EVEN', renata:'EVEN', karma:'EVEN',
    braum:'EVEN', galio:'EVEN', maokai:'EVEN', poppy:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"A sustain mirror your bounce wins — the W pays both sides of every ledger it touches.",
      breakdown:"Bounce-trade on cooldown (it heals you and bills them), E the carry's windows, and bubble the all-in nobody else can start.",
      dos:["W-bounce every trade window","E the carry's committed autos","Bubble their desperation engage"],
      donts:["Bubble poke out of boredom","Race heals without the bounce","Trade at their item spike politely"],
      win:"Out-ledger the mirror — the bounce votes twice."
    },
    warden:{
      tldr:"His engage swims into a bubble — stun the chain's first link and bounce the cleanup.",
      breakdown:"Bait {K}, bubble the dash mid-flight, and E your carry for the counter-window. Engage tanks fear the fish.",
      dos:["Bubble the engage mid-dash","E the counter-trade window","Bounce the chip while he waits"],
      donts:["Burn Q on spacing","Stand engage-side of your carry","Trade the flash window evenly"],
      win:"Stun the dive and bill the swim home."
    },
    catcher:{
      tldr:"His catch and your bubble are the same bet — yours is point-and-wave easier to follow.",
      breakdown:"Dodge the hook behind minions and answer with the bubble — a caught catcher meets the buffed duo he was selling.",
      dos:["Stand behind minions always","Bubble the post-hook chain","E the carry the moment it lands"],
      donts:["Bubble-duel at even cooldowns","Ward face-first into brush","Chase the reset into fog"],
      win:"Counter-catch the catcher — your follow-up is rigged."
    },
    mage:{
      tldr:"He out-pokes the tide — bounce the sustain, dodge the root, and bubble the conversion attempt.",
      breakdown:"Poke wins the chip war; your W refunds part and the bubble confiscates the all-in. Survive to items and the lane re-prices.",
      dos:["Bounce the chip back constantly","Dodge his root behind minions","Bubble the all-in his poke earned"],
      donts:["Trade W-for-rotation evenly","Stand in the zone for bounces","Eat the root warding"],
      win:"Refund the chip and confiscate the fight."
    }
  },
  mirror:{
    tldr:"Tide mirror — bubble chicken at 14 seconds a round; whoever lands first runs the lane.",
    breakdown:"Dodge her Q, land yours, and offset your wave from hers — the mirror is a stun lottery you can rig with spacing.",
    dos:["Dodge her bubble before throwing yours","Win the bounce ledger","Wave second in the engage war"],
    donts:["Bubble-trade at even cooldowns","Stand on the bounce's return line","Tide first without follow-up"],
    win:"First bubble wins each round — rig the lottery with spacing.",
    winS:"Her bubble is down — fourteen free seconds."
  },
  tradeGood:"W the bounce through carry-and-support, E your carry, auto — the trade healed you, billed them, and buffed the follow-up.",
  tradeBad:"Throwing the bubble at poke range out of boredom — the stun is the matchup; the rest is salad.",
  early:"Bounce and bank — your trades pay twice while the bubble re-prices their steps.",
  mid:"Bubble economy: convert the ganks, wave the rivers, E the skirmish swings.",
  late:"You conduct from the tide: wave the engage, bubble the diver, E whoever the fight chose.",
  safetyTool:"Q Aqua Prison",
  spikesLine:"Level 1 bounce bullies; level 6 waves the engages; first item makes bubbles lethal.",
  carryLine:"Carry through conversion — every landed bubble is a won exchange; your job is the spacing that lands them.",
  dontDetail:"The bubble is slow and the lane knows it — throw it where they must stand, not where they are.",
  aheadTpl:"Ahead, flood the lane: bounce {E}'s duo off every contact and bubble the recovery attempts.",
  behindTpl:"Behind, the tide turns: bounce the deficit, bubble their snowball, and wave the comeback fight.",
  spikeName:"first item",
  runeReport:"Aery, Manaflow, Transcendence, Scorch; secondary Inspiration — Biscuits + Cosmic Insight.",
  itemReport:"World Atlas start. Helia line, Swiftness, Redemption-Mikael's.",
  redditLine:"bounce on cooldown, bubble where they'll be, and E the carry mid-swing — Nami wins exchanges that pay twice.",
  load:{ sub:"r/NamiMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Oblivion Orb piece vs sustain", antihealNote:"Anti-heal early into their sustain.", firstItem:"Echoes of Helia", secondItem:"Redemption / Mikael's", boots:"Swiftness", bootsVsAP:"Mercury's / Swiftness", bootsVsAD:"Steelcaps / Swiftness", spike:"Helia — the bounce chunks and every bubble converts.", runes:{ keystone:"Summon Aery", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    pyke:{ tldr:"His fog regeneration mocks your bounce ledger — bubble the W approach, not the hook, and keep the river lit." },
    zyra:{ tldr:"The garden out-chips the tide — dodge the E, bounce off the plants' targets, and bubble the bramble engage." }
  }
}),

_supBase({
  key:'renata', name:'Renata Glasc',
  lvl:[
    "E-poke the pair — the missiles shield yours and bill theirs in one cast.",
    "Q threats begin: the root-throw relocates whoever steps wrong.",
    "Full kit: W on the carry turns even trades into insured ones — the bailout math is rude.",
    "Chip the margins and bank the leverage — marked trades hit harder than their items say.",
    "Hostile Takeover online — their teamfight formation is now a liability you can weaponize.",
    "First item: the missiles chunk and the Q-throw converts every gank.",
    "Late Renata flips fights: berserk the clump, bail the carry, and watch their formation eat itself."
  ],
  diffBase:{ enchanter:'EVEN', warden:'EVEN', catcher:'EVEN', mage:'TRICKY' },
  diffEx:{ leona:'EVEN', nautilus:'EVEN', rell:'EVEN', alistar:'EVEN', blitzcrank:'EVEN', thresh:'EVEN', pyke:'EVEN', rakan:'EVEN', bard:'EVEN',
    zyra:'TRICKY', brand:'TRICKY', velkoz:'TRICKY', xerath:'TRICKY', lux:'TRICKY', hwei:'TRICKY', swain:'EVEN', morgana:'EVEN', neeko:'EVEN',
    soraka:'EVEN', janna:'EVEN', lulu:'EVEN', milio:'EVEN', nami:'EVEN', sona:'EVEN', seraphine:'EVEN', senna:'EVEN', yuumi:'EVEN', zilean:'EVEN', karma:'EVEN',
    braum:'EVEN', galio:'EVEN', maokai:'EVEN', poppy:'EVEN', tahmkench:'EVEN', taric:'EVEN' },
  vs:{
    enchanter:{
      tldr:"A sustain mirror your bailout cheats — their best all-in meets a carry who refuses to die on schedule.",
      breakdown:"Trade E-missiles evenly and bank W for their kill window — the bailout turns their perfect fight into a refund with interest.",
      dos:["E-trade the pair constantly","Bank W for their kill windows","Leverage-mark the focused target"],
      donts:["Bail a full-HP trade","Race heals without the missiles","Q the poke instead of the picks"],
      win:"Out-insure the mirror — death-on-schedule is their problem now."
    },
    warden:{
      tldr:"His chain meets a bailout and a berserk — the engage comp's perfect fight has two asterisks.",
      breakdown:"Q-throw the diver who lands, bail the carry they locked, and R the grouped commit. Engage formations feed the takeover.",
      dos:["Q-throw the landed diver","Bail the locked carry","R the grouped engage"],
      donts:["Burn W before the real window","Stand engage-side poking","Trade the flash window evenly"],
      win:"Insure the dive and berserk the formation that funded it."
    },
    catcher:{
      tldr:"His catch starts a fight your kit finishes backward — bail the caught, throw the catcher, berserk the rest.",
      breakdown:"Minions beat the hook; the bailout beats the follow-up. The relocation Q makes him regret every catch that half-works.",
      dos:["Stand behind minions always","Bail the caught instantly","Q-throw the diving catcher"],
      donts:["Ward face-first into brush","Bail on prediction","Chase resets into fog"],
      win:"Make every catch a refunded mistake."
    },
    mage:{
      tldr:"He out-pokes the chemtech — shield the chip, dodge the root, and R the grouped conversion.",
      breakdown:"Poke taxes your lane; your R taxes their teamfight. Lose the chip war slowly and weaponize the fight it was building toward.",
      dos:["E-shield the rotation's center","Dodge his root behind minions","R the grouped all-in attempt"],
      donts:["Missile-duel inside his zone","Bail chip damage","Eat the root placing wards"],
      win:"Survive the chip and berserk the conversion."
    }
  },
  mirror:{
    tldr:"Chemtech mirror — bailout chicken and takeover geometry; whoever Rs the better line flips the fight.",
    breakdown:"Bank W longer, dodge her Q-throw, and R second — her berserk groups your targets for yours.",
    dos:["Bail second in the insurance war","Dodge the Q-throw at all costs","R the better formation line"],
    donts:["Trade bails at even HP","Group in a line — ever","Q-duel at parity"],
    win:"Later bailout, better line — the sharper executive wins.",
    winS:"Her R is spent — group freely and collect."
  },
  tradeGood:"E the pair, leverage-auto the mark, walk — the trade shielded yours and billed theirs.",
  tradeBad:"Spending the bailout on a healthy trade — the revive insures kill windows; chip is uninsurable.",
  early:"Chip with missiles and bank the buttons — your kit answers their best moment, not their poke.",
  mid:"Takeover economy: berserk the grouped rivers, bail the picks, throw the divers.",
  late:"You flip fights: R the formation, bail the focus, and let their team finish itself.",
  safetyTool:"W Bailout",
  spikesLine:"Level 3 insures trades; level 6 weaponizes formations; first item compounds the missiles.",
  carryLine:"Carry by liability — their formation is your R's raw material; your carry fights uninsurable.",
  dontDetail:"The bailout burns the revived if the fight loses — bail fights you intend to win.",
  aheadTpl:"Ahead, leverage everything: chip {E}'s duo, insure the dives, and berserk the regroup attempts.",
  behindTpl:"Behind, the chemtech holds: bail their snowball's targets, throw their divers, and R the fight that resets it all.",
  spikeName:"first item",
  runeReport:"Aery or Guardian, Manaflow, Transcendence, Scorch; secondary Inspiration.",
  itemReport:"World Atlas start. Helia or Mandate line, Swiftness, Redemption paths.",
  redditLine:"bail kill windows, throw landed divers, and never let them group in a line — Renata wins fights backward.",
  load:{ sub:"r/RenataMains", start:"World Atlas + potions", normalBack:"Boots + wards (≈700g)", antihealBack:"Oblivion Orb piece vs sustain", antihealNote:"Anti-heal early into their sustain.", firstItem:"Imperial Mandate / Helia", secondItem:"Redemption / Mikael's", boots:"Swiftness", bootsVsAP:"Mercury's / Swiftness", bootsVsAD:"Steelcaps / Swiftness", spike:"First item — missiles chunk and every Q-throw converts.", runes:{ keystone:"Summon Aery", primaryTree:"Sorcery", primary:["Manaflow Band","Transcendence","Scorch"], tree:"Inspiration", secondary:["Biscuit Delivery","Cosmic Insight"], shards:["Adaptive Force","Adaptive Force","Health"] } },
  specials:{
    rell:{ tldr:"Her Q breaks the shields your kit is made of — missile AFTER her stab, and bail the crash-down's target instantly." },
    zyra:{ tldr:"The garden out-chips the boardroom — dodge the root, shield the plant focus, and R the bramble teamfight she's saving for." }
  }
})
];

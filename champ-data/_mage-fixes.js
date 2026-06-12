// MatchupCoach — Mages/Marksmen/Specialists top-lane corrections. Validated vs mobalytics/metabot
// (Patch 26.x). The generated data gave these ranged/scaling champs the same boilerplate FAV list
// (beats juggernauts/tanks — mostly directionally right for ranged poke) but missing the dive/poke
// matchups that beat THEM, plus near-identical pairs and a badly-wrong Kayle (only 2 FAV / 22 HARD
// for an S-tier scaling carry). Loaded LAST, after _juggernaut-fixes.js. Cross-champ cells that
// would race another file's retry loop are fixed in that file directly, not here.
(function () {
  var T = { FAVOURED: '#3ddc97', HARD: '#ff5d6c', EVEN: '#e8b84b', TRICKY: '#ff8b3d' };
  var FIX = {
    kayle: {
      quinn:    ['FAVOURED', "Survive the vault poke early, and once your R-range comes online you out-range and out-scale her hard."],
      sylas:    ['FAVOURED', "Play safe through his early all-in, then your ranged form and true-damage scaling bury his short-range kit."],
      akali:    ['FAVOURED', "Weather the shroud burst pre-6, then your ranged autos + R-invuln out-scale and kite her down."],
      riven:    ['FAVOURED', "Survive her early snowball window with safe farming, and your late ranged DPS out-scales her completely."],
      garen:    ['FAVOURED', "Eat the early spin trades, scale to your ranged form, and shred his tankiness with on-hit once you spike."],
      heimerdinger:['FAVOURED', "Farm through the turret poke under tower, then out-scale his zone once your ranged form and items online."],
      gnar:     ['FAVOURED', "Survive his mini-form poke, and your scaling on-hit DPS out-ranges and out-trades him into the late game."],
      gangplank:['FAVOURED', "Both scale, but your R-invuln and on-hit shred beat his barrels in the 1v1 once you hit your item spikes."],
      teemo:    ['HARD',     "His blind shuts your auto-reliant kit and the poke zones your weak early. Farm under tower and rush MR."],
      yasuo:    ['HARD',     "Windwall blocks your Q and autos, and his all-in deletes your squishy early. Play safe and pray to scale."],
      gragas:   ['HARD',     "His body-slam burst and poke punish your weak early. Farm safe under tower and scale to your ranged form."],
      olaf:     ['HARD',     "His ghost ignores your kite and he runs you down pre-6. Give ground, build armor, and survive to scale."],
      malphite: ['HARD',     "His armor stat-checks your on-hit scaling and the R bursts your squishy frame. Farm safe and itemize carefully."],
      jax:      ['HARD',     "His E-counterstrike blocks your autos and the all-in deletes your early. Survive to your R and out-scale late."],
      nasus:    ['TRICKY',     "He out-scales even your late game and out-sustains the lane. Deny stacks early or you simply lose the 1v1."]
    },
    teemo: {
      vayne:    ['FAVOURED', "Blind her tumble autos, shroom the all-in, and poke her squishy frame down before she can kite you."],
      aurora:   ['FAVOURED', "Blind her dash burst, poke between her cooldowns, and shroom the escape \u2014 she can't all-in through the blind."],
      tryndamere:['FAVOURED', "Blind the crit window, kite the spin with shrooms, and poke him out before his R matters."],
      trundle:  ['FAVOURED', "Blind the bite, kite the pillar with shrooms, and poke his sustain down from range all game."],
      mordekaiser:['TRICKY', "Blind taxes his passive autos and you poke the slow kit for free — but one landed E into R is a 1v1 in a phone booth you lose. Shroom his approach angles and never burn W after his E whiffs."],
      malphite: ['FAVOURED', "Blind his Q-armor auto, kite the poke, and your MR + shrooms make his all-in whiff every time."],
      kayle:    ['FAVOURED', "Bully her weak early \u2014 blind the Q, poke her off the wave, and deny her scaling before R comes online."],
      olaf:     ['HARD',     "His ghost ignores your blind and slow, and he runs you down through shrooms. Build MR, farm safe, and scale."],
      sion:     ['HARD',     "He tanks your poke and farms freely under tower, out-scaling your chip. Shove and roam instead of dueling."],
      yasuo:    ['HARD',     "Windwall eats your blind and poke, and his all-in deletes you. Stay max-range and never face-check his dash."],
      ornn:     ['HARD',     "He tanks your poke and brittle-stuns your kite. Shove the wave, deny CS, and play for map pressure elsewhere."],
      ryze:     ['TRICKY',     "His range matches yours and the root chain catches your kite. Respect the all-in and play for shroom picks."],
      renekton: ['EVEN',     "Coinflip \u2014 blind his fury all-in and kite, but a landed empowered combo bursts you. Whoever plays it cleaner wins."]
    },
    gangplank: {
      vayne:    ['FAVOURED', "Barrel-poke her off the wave, parrrley the tumble, and your scaling out-ranges her once you hit Essence Reaver."],
      fiora:    ['FAVOURED', "Barrel-zone her vitals, parrrley the poke, and out-scale her duel \u2014 anti-heal and never melee-trade into the parry."],
      poppy:    ['FAVOURED', "Barrel-poke past her W-block, parrrley her off the wave, and out-scale her low-damage kit into the mid-game."],
      singed:   ['FAVOURED', "Barrel-poke the proxy, parrrley him off your wave, and out-scale his sustain with your crit spike."],
      warwick:  ['FAVOURED', "Barrel-poke him below his sustain threshold, parrrley the engage, and out-scale his early-game kit."],
      yasuo:    ['FAVOURED', "Barrels go through windwall \u2014 zone him off the wave, parrrley the dash, and out-scale his all-in."],
      jayce:    ['FAVOURED', "Out-sustain the ranged poke with crit lifesteal, barrel-zone him, and out-scale his squishy mid-game."],
      heimerdinger:['FAVOURED', "Barrels clear his turrets and out-range his grenade. Zone the lane and out-scale his poke once you crit."],
      tahmkench:['FAVOURED', "Barrel-poke through the grey-health, parrrley him off the wave, and out-scale his slow tank kit."],
      quinn:    ['HARD',     "Her vault poke kites your barrels and denies your scaling. Farm under tower and look for jungler ganks."],
      gragas:   ['TRICKY',     "His body-slam poke and disengage deny your barrel setup. Farm safe and out-scale to the late game."],
      vladimir: ['HARD',     "His pool dodges your barrels and sustain out-trades your poke. Anti-heal and farm to your crit spike."],
      chogath:  ['HARD',     "He out-sustains your poke and the true-damage R beats your squishy frame. Farm safe and scale carefully."],
      tryndamere:['HARD',    "His crit-spin runs you down before your barrels online and the R denies your kill. Farm safe and scale."],
      ornn:     ['HARD',     "He tanks your barrels and brittle-stuns your engage. Farm even and out-scale to teamfights instead."],
      kayle:    ['HARD',     "She out-scales your crit late and survives your early poke. Punish the weak early or you lose the 1v1 late."],
      sion:     ['HARD',     "He tanks your barrels and farms freely, out-scaling your chip. Shove and roam rather than dueling him."]
    },
    kennen: {
      darius:   ['FAVOURED', "Shuriken-poke him off the wave, stun the E-pull, and your ranged kit kites his immobile bleed all-in."],
      urgot:    ['FAVOURED', "Out-range the shotgun knees with shuriken poke, stun the E-flip, and kite his slow kit all lane."],
      drmundo:  ['HARD',     "He out-sustains your poke and the regen shrugs off your chip. Farm safe and play for teamfight stun value."],
      nasus:    ['HARD',     "He out-scales your poke and sustains through it. Deny stacks early or he simply out-1v1s you late."]
    },
    quinn: {
      kayle:    ['HARD',     "She out-scales your vault poke once her ranged form is online. Snowball the early hard or lose the late 1v1."],
      gangplank:['FAVOURED', "Vault-poke him off his barrels, kite the engage, and deny his scaling with constant early pressure."],
      wukong:   ['FAVOURED', "Vault-poke him off the wave, kite the clone bait, and your range denies his all-in setup all lane."],
      yasuo:    ['FAVOURED', "Out-range the windwall with vault burst, kite the dash, and deny his stacks with constant early pressure."],
      renekton: ['FAVOURED', "Kite the fury all-in with vault burst, out-range his slow combo, and deny his early snowball window."],
      jayce:    ['FAVOURED', "Out-burst the poke with your vault all-in, close the gap he can't kite, and bully his squishy frame."],
      heimerdinger:['FAVOURED', "Vault past the turrets onto him, burst him before he repositions, and his zone can't stop your all-in."],
      jax:      ['FAVOURED', "Vault-burst him before the leap and out-range his stun window — his all-in whiffs into your early pressure."],
      malphite: ['HARD',     "His armor stat-checks your AD burst and the R catches your dash. Poke is wasted — farm and roam for value instead."],
      ornn:     ['TRICKY',     "He tanks your vault burst and brittle-stuns your engage. Poke is low-value — shove and roam instead of diving."],
      olaf:     ['HARD',     "His ghost ignores your kite and he runs you down through the vault. Give ground and look for roam picks."],
      irelia:   ['HARD',     "Her stacked autos out-DPS your burst and the E-stun catches your dash. Poke safe and don't get caught."],
      swain:    ['HARD',     "His pull + range out-trade your vault and the sustain shrugs your poke. Respect the all-in and roam for value."]
    },
    akali: {
      kayle:    ['HARD',     "She out-scales your burst once her ranged form and R-invuln come online. Snowball the early or lose late."],
      volibear: ['FAVOURED', "Shroud the bite engage, dash the Q-flip, and out-burst his tanky early before he stacks — he can't catch you."],
      jax:      ['FAVOURED', "Shroud his E-counterstrike window, dash the leap, and burst him before the ult — your mobility out-plays his all-in."],
      tahmkench:['FAVOURED', "Shroud the Q-stun, poke the grey-health between cooldowns, and out-mobility his slow tank kit."],
      garen:    ['FAVOURED', "Shroud the spin engage, kite the silence, and out-burst him with your dash combo before he sustains."],
      darius:   ['FAVOURED', "Shroud the E-pull, dash out of the bleed all-in, and burst his immobile frame before he stacks."],
      yasuo:    ['FAVOURED', "Dash through the windwall, shroud the all-in, and out-burst his squishy frame before he stacks crit."],
      irelia:   ['FAVOURED', "Shroud her E-stun, dash the stacked autos, and out-burst her in the all-in — your mobility wins the duel."],
      yone:     ['FAVOURED', "Shroud his dash return, kite the windwall, and out-burst his squishy frame with your combo."],
      urgot:    ['HARD',     "His shotgun knees shred you before you dash in and the R executes your squishy frame. Poke safe and roam."],
      shen:     ['TRICKY',     "Spirit Refuge eats your burst and the taunt cancels your combo. Short-trade and look for roam picks instead."],
      pantheon: ['TRICKY',     "His point-click W-stun and spear poke shut your engage. Eat poke, respect the all-in, and roam for value."],
      ornn:     ['TRICKY',     "He tanks your burst and brittle-stuns your dash. Low-value lane — poke safe and roam for picks."],
      sion:     ['TRICKY',     "He tanks your burst and the Q-knockup catches your dash. Poke safe, deny CS, and roam for value."],
      riven:    ['TRICKY',     "Her burst out-trades your early and the mobility matches yours. Shroud the combo and play for roam picks."],
      malphite: ['HARD',     "His armor stat-checks your burst and the R catches your dash. Poke is wasted — roam for picks instead."],
      nasus:    ['HARD',     "He out-sustains your burst and out-scales you. Deny stacks early, but the longer it goes the more he 1v1s you."],
      aatrox:   ['HARD',     "His Q-sweetspots out-poke you and the drain out-sustains your burst. Shroud the all-in and roam for picks."]
    },
    tryndamere: {
      gangplank:['FAVOURED', "Spin onto him before the barrels online, R-tank the slow, and your crit out-sustains his early poke."]
    },
    jayce: {
      trundle:  ['FAVOURED', "Out-range the bite with Q-poke, E-knock the pillar engage, and chip him down before he sustains back."],
      vayne:    ['FAVOURED', "Out-range her tumble autos with Q-poke, E-knock the condemn, and zone her off the wave before she scales."],
      darius:   ['FAVOURED', "Q-poke him off the wave, E-knock the E-pull, and out-range his immobile bleed all-in all lane."],
      drmundo:  ['HARD',     "He out-sustains your poke and the regen shrugs your chip. Forget the kill — farm and play for teamfight poke."],
      irelia:   ['HARD',     "She dashes onto you through minions and the E-stun shuts your combo. Poke safe and never get caught out."],
      wukong:   ['HARD',     "His clone bait and gap-close punish your immobility. Poke from max range and save E for his engage."],
      sion:     ['HARD',     "He tanks your poke and farms freely under tower, out-scaling your chip. Shove and roam instead of dueling."],
      quinn:    ['HARD',     "Her vault out-ranges your poke and the burst punishes your immobility. Save E for the engage and play safe."],
      mordekaiser:['HARD',   "He realm-isolates you out of poke range and the W eats your burst. Poke pre-3, then respect the all-in."],
      chogath:  ['TRICKY',     "He out-sustains your poke and the true-damage R deletes your squishy frame. Poke safe and don't get caught."],
      ornn:     ['TRICKY',     "He tanks your poke and brittle-stuns your hop. Low-value lane — shove, poke safe, and play for teamfights."],
      malphite: ['TRICKY',     "His armor stat-checks your AD poke and the R catches your hop. Poke is wasted — farm and play for picks."],
      gangplank:['HARD',     "He out-sustains your poke with crit lifesteal and out-scales your mid-game. Poke safe and shove for plates."]
    },
    vladimir: {
      vayne:    ['FAVOURED', "Pool the condemn, Q-sustain through her poke, and out-scale her squishy kit once your AP comes online."],
      illaoi:   ['FAVOURED', "Pool out of the E-grab and tentacle zone, Q-poke her down, and out-sustain her slams with your healing."],
      sylas:    ['FAVOURED', "Pool the chain combo, out-sustain the W-heal with Q, and out-scale his short-range kit late."],
      wukong:   ['FAVOURED', "Pool the clone-bait all-in, Q-sustain the trades, and out-scale his armor kit into the late game."],
      yasuo:    ['FAVOURED', "Pool through the windwall all-in, Q-sustain the poke, and out-scale his crit kit once you stack AP."],
      gangplank:['FAVOURED', "Pool the barrels, Q-sustain through the poke, and out-scale his crit kit in the late-game teamfight."],
      ryze:     ['TRICKY',     "His range matches yours and the root chain catches your pool timing. Respect the burst and farm safe to scale."],
      chogath:  ['HARD',     "He out-sustains your Q and the true-damage R bursts you through the pool. Poke safe and itemize carefully."],
      nasus:    ['HARD',     "He out-scales even your late game and out-sustains the lane. Deny stacks early or you simply lose the 1v1."],
      aatrox:   ['HARD',     "His Q-sweetspots out-poke your early and the drain out-sustains you. Pool the all-in and farm safe to scale."],
      volibear: ['EVEN',     "Coinflip — pool his bite all-in, but his early out-trades your weak laning. Whoever snowballs the early takes it."]
    },
    heimerdinger: {
      aatrox:   ['FAVOURED', "Wall him off with turrets, grenade-stun the Q engage, and out-poke his melee approach all lane."],
      darius:   ['FAVOURED', "Turret-zone the E-pull range, grenade-stun the engage, and out-poke his immobile bleed kit."],
      garen:    ['FAVOURED', "Turret-wall the spin engage, grenade-stun the all-in, and poke him down before he reaches you."],
      sett:     ['FAVOURED', "Turret-zone his pull range, grenade-stun the W engage, and out-poke his slow melee kit."],
      volibear: ['FAVOURED', "Wall the Q-flip with turrets, grenade-stun the bite, and out-poke his all-in before it lands."],
      mordekaiser:['FAVOURED', "Turret-zone the E-pull, grenade-stun the engage, and poke him below realm threshold before he isolates you."],
      sion:     ['FAVOURED', "Turret-wall the Q-charge, grenade-stun the knockup, and out-poke his slow kit off the wave."],
      malphite: ['FAVOURED', "Turret-zone the R engage, grenade-stun the dash, and out-poke his armor stacking before he dives."],
      fiora:    ['FAVOURED', "Turrets punish her dash-in and grenade-stun cancels the vitals — zone her off the wave and out-poke her."],
      irelia:   ['FAVOURED', "Turret-wall her Q-dashes, grenade-stun the stacked autos, and out-poke her before she resets."],
      quinn:    ['HARD',     "Her vault out-ranges your turrets and the burst kills you before they ramp. Wall defensively and call for ganks."],
      kayle:    ['HARD',     "She out-scales your zone once her ranged form online. Punish the weak early or you lose the late side-lane."],
      nasus:    ['HARD',     "He farms your turret poke under tower and out-scales your zone. Deny stacks early or he 1v1s you late."],
      gangplank:['HARD',     "His barrels clear your turrets and out-range your grenade. Poke safe, shove for plates, and respect his scaling."]
    },
    singed: {
      kled:     ['FAVOURED', "Fling him off Skaarl, poison-kite the mounted dive, and proxy his lane to starve his all-in."],
      rumble:  ['FAVOURED', "Poison-kite the flamespitter, fling him out of the Equalizer, and out-sustain his zone with your regen."],
      kennen:   ['FAVOURED', "Poison-kite the shuriken poke, fling him out of the stun setup, and proxy to deny his lane farm."],
      malphite: ['FAVOURED', "Poison-kite the poke, fling him when he R-engages, and proxy-starve his armor-stacking farm."],
      gwen:     ['FAVOURED', "Poison-kite the mist, fling her out of the W-cloud, and out-sustain her %-HP shred with your regen."],
      pantheon: ['FAVOURED', "Poison-kite the spear poke, fling the W-stun engage, and out-sustain his all-in window."],
      ksante:   ['FAVOURED', "Fling him out of the W-tank engage, poison-kite the poke, and proxy to deny his durability farm."],
      sion:     ['FAVOURED', "Poison-kite the Q-charge, fling the knockup, and proxy-starve his free farm to keep him weak."],
      garen:    ['FAVOURED', "Poison-kite the spin, fling him out of the all-in, and proxy his wave to deny his sustain."],
      teemo:    ['FAVOURED', "Tank the blind with your sustain, fling him when he steps up, and proxy to deny his squishy farm."],
      sett:     ['FAVOURED', "Poison-kite the pull range, fling the W engage, and out-sustain his slow ramp with your regen."],
      yasuo:    ['FAVOURED', "Poison-kite the dash, fling him out of the windwall combo, and proxy to deny his stacks."],
      sylas:    ['TRICKY',     "His chain CC catches your run and the burst out-trades your sustain. Proxy safe and don't get caught flinging."],
      camille:  ['TRICKY',     "Her hookshot catches your run and true-damage shreds your tankiness. Proxy safe and match her split."],
      wukong:   ['TRICKY',     "His clone bait and gap-close catch your run and out-trade your sustain. Proxy safe and avoid the all-in."],
      urgot:    ['HARD',     "His shotgun knees shred your run and the R execute punishes your low-health proxying. Play safe and farm."],
      mordekaiser:['TRICKY',   "His realm catches your run and the W eats your damage — the isolate punishes proxying. Play around vision."],
      jayce:    ['TRICKY',     "His ranged poke shreds you before you reach him and out-ranges your fling. Proxy safe and farm cautiously."],
      gangplank:['HARD',     "His barrel poke shreds your run and out-sustains the proxy game. Play safe and look for roam picks."]
    },
    gnar: {
      heimerdinger:['FAVOURED', "Mini-form poke out-ranges his turrets and the boomerang clears them. Zone him and transform-all-in once he's low."],
      kled:     ['FAVOURED', "Mini-poke him off Skaarl, hop-kite the dismount, and mega-transform to all-in the unmounted yordle."],
      gwen:     ['FAVOURED', "Mini-form poke out-ranges her mist, boomerang-kite the W-cloud, and mega-all-in once she's chunked."],
      quinn:    ['FAVOURED', "Match her range with mini poke, transform to out-trade the vault, and mega-W out-damages her burst."],
      tryndamere:['FAVOURED', "Mini-poke the crit window, kite the spin with hops, and mega-transform to all-in before his R matters."],
      trundle:  ['FAVOURED', "Mini-poke the bite, boomerang-kite the pillar, and mega-all-in to out-trade his sustain."],
      tahmkench:['FAVOURED', "Mini-form poke out-ranges his Q-stun, kite the engage, and mega-W out-damages his grey-health."],
      yone:     ['FAVOURED', "Mini-poke the dash return, kite the windwall, and mega-transform to out-trade his squishy duel."],
      garen:    ['FAVOURED', "Mini-form poke out-ranges his spin, kite the all-in, and mega-W out-damages his courage window."],
      teemo:    ['FAVOURED', "Mini-form auto-range matches his, boomerang the shrooms, and mega-transform to all-in the yordle."],
      ornn:     ['TRICKY',     "He tanks your poke and brittle-stuns your hop. Low-value lane — poke safe and play for teamfight ult."],
      warwick:  ['HARD',     "His Q follows your hop and the sustain out-races your mini poke. Anti-heal and respect the all-in."],
      sett:     ['HARD',     "His true-damage W out-trades your mega form and the pull catches your hop. Poke mini and don't extend."],
      fiora:    ['TRICKY',     "She parries your mega-W and vitals you down. Poke in mini form and never mega-all-in into the riposte."],
      darius:   ['TRICKY',     "His E-pull catches your hop and the bleed out-trades your mega. Poke mini-form and don't get pulled."],
      nasus:    ['TRICKY',     "He out-sustains your poke and out-scales you. Poke the early, but he 1v1s you once stacked."],
      yorick:   ['HARD',     "His Maiden and ghouls out-trade your mega and the cage walls your hop. Poke mini and play for picks."],
      kayle:    ['HARD',     "She out-scales your poke once her ranged form online. Punish the weak early or lose the late side-lane."],
      malphite: ['HARD',     "His armor stat-checks your poke and the R catches your hop. Poke mini-form and never all-in into the ult."]
    },
    aurora: {
      gnar:     ['FAVOURED', "Dash-poke his mini form, blink the transform engage, and burst him from range before mega-W lands."],
      urgot:    ['FAVOURED', "Dash-kite the shotgun knees, blink the E-flip, and out-range his slow kit with your spectral poke."],
      darius:   ['HARD',     "His E-pull catches your blink and the bleed bursts you. Poke from max range and never get pulled."],
      nasus:    ['HARD',     "He out-sustains your poke and out-scales you. Poke the weak early, but he 1v1s you once stacked."],
      teemo:    ['HARD',     "His blind shuts your auto-poke and the shrooms zone your blink. Build MR and play for roam picks."],
      irelia:   ['HARD',     "Her E-stun catches your blink and she dashes onto you through minions. Poke safe and don't get caught."],
      akali:    ['TRICKY',     "Her shroud breaks your targeting and the dash matches your blink. Poke safe and respect the all-in."]
    },
    rumble: {
      aatrox:   ['HARD',     "His Q-sweetspots out-poke your flamespitter and the E-dash closes your zone. Kite the all-in and farm safe."],
      nasus:    ['HARD',     "He out-sustains your zone and out-scales you. Poke the weak early, but he 1v1s you once stacked."],
      kled:     ['HARD',     "His mounted dive closes your flamespitter range and out-trades your zone. Kite the dismount and don't extend."],
      tryndamere:['HARD',    "His crit-spin runs through your zone and the R denies your kill. Anti-heal, kite, and play for picks."],
      riven:    ['HARD',     "Her mobility dodges your zone and the burst out-trades you. Kite the combo and play for roam picks."],
      gragas:   ['HARD',     "His body-slam closes your range and the burst out-trades your zone. Kite the engage and poke safe."],
      singed:   ['HARD',     "His poison out-sustains your zone and the fling catches your kite. Poke safe and match his proxy farm."]
    },
    swain: {
      warwick:  ['FAVOURED', "Root the Q-leash engage, drain-tank the all-in, and out-sustain his early with your healing."],
      quinn:    ['FAVOURED', "Root the vault burst, drain through her poke, and out-sustain her early aggression with your W-heal."],
      aatrox:   ['FAVOURED', "Root the Q-sweetspot all-in, drain-tank the combo, and out-sustain him into your scaling."],
      garen:    ['FAVOURED', "Root the spin engage, drain-tank the all-in, and out-sustain his courage trades with your healing."],
      sett:     ['FAVOURED', "Root the W engage, drain through his trades, and out-sustain his slow ramp with your W-heal."],
      volibear: ['FAVOURED', "Root the bite all-in, drain-tank the engage, and out-sustain his early before he scales."],
      illaoi:   ['HARD',     "Her tentacles out-trade your drain in her zone and the E-grab punishes your root. Never fight in tentacles."]
    }
  };
  function apply(db) {
    if (!db) return;
    Object.keys(FIX).forEach(function (champ) {
      var entry = db[champ];
      if (!entry) return;
      Object.keys(FIX[champ]).forEach(function (foe) {
        var f = FIX[champ][foe], m = entry[foe];
        if (!m) return;
        m.diff = f[0]; m.tone = T[f[0]]; m.tldr = f[1];
      });
    });
  }
  function applyAll() { apply(window.CHAMP_DATA); apply(window.CHAMP_FULL); }
  applyAll();
  if (typeof setTimeout === 'function') {
    var tries = 0;
    var iv = setInterval(function () { applyAll(); if (++tries >= 24) clearInterval(iv); }, 250);
    setTimeout(applyAll, 0);
  }
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('DOMContentLoaded', applyAll);
  }
})();

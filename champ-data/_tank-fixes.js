// Tank top-lane matchup corrections — validated against community + stat-aggregator
// consensus (mobalytics / lolalytics / metabot, Patch 26.x). The generated data applied a
// blanket "tank is HARD into ranged/duelists" heuristic, which mis-rated several lanes that
// are actually tank-FAVOURED. This layer patches diff/tone/tldr for the verified ones.
(function () {
  var T = { FAVOURED: '#3ddc97', HARD: '#ff5d6c', EVEN: '#e8b84b', TRICKY: '#ff8b3d' };
  var FIX = {
    malphite: {
      vayne:  ['FAVOURED', "Hard counter — your passive shield eats her tumble autos and W-armor turns her %-true damage to chip. Rush armor and she simply cannot kill you."],
      teemo:  ['HARD',     "He blinds your Q-armor auto and kites your poke with MR — your all-in whiffs. Shove, roam, and don't chase the yordle."],
      gnar:   ['FAVOURED', "Shield his mini-form poke and engage the instant he transforms — Q-slow and R lock down the rage window before he kites away."],
      quinn:  ['FAVOURED', "Shield-tank her poke and punish the cooldown — once you have armor her AD shots bounce off and your R catches the vault."],
      kayle:  ['FAVOURED', "Bully the weakest early-game champ in the game — shove, dive on her cooldowns, and snowball long before she ever scales."],
      yasuo:  ['FAVOURED', "Classic counter — your shield negates his poke and your R knocks him up through everything. Armor makes his crits meaningless."],
      jayce:  ['FAVOURED',     "Respect the early poke, but you out-scale fast — shield the shots, save R for his melee hop, and armor flips it by item two."]
    },
    ornn: {
      garen:     ['FAVOURED', "You stat-check Garen — pillar-stun his spin-in, W-brittle the trade, and out-scale him into an unkillable late game."],
      teemo:     ['FAVOURED', "You beat the yordle — eat the poke with your passive shield, perma-shove with W, and your brittle all-in at 6 deletes him."],
      jax:       ['FAVOURED', "One of your best lanes — E-pillar stops his Q engage, W-brittle out-trades his stun window, and you simply out-scale him."],
      riven:     ['FAVOURED', "Pillar her dashes, W-brittle the all-in, and tank the combo — once you have a plate of armor she can't kill you."],
      yasuo:     ['FAVOURED', "Pillar the dash, W through the wind-wall poke, and brittle-stun the all-in — you out-scale and out-CC him every fight."],
      yone:      ['FAVOURED', "Pillar his dashes, W-brittle the all-in, and out-scale — he can't burst through your shield and armor."],
      gangplank: ['FAVOURED', "Out-sustain the barrel poke with your shop passive, pillar the engage, and brittle-combo every step-up."],
      pantheon:  ['FAVOURED', "Tank the early spear poke with your shield, pillar his W stun, and out-scale his all-in window hard."],
      urgot:     ['HARD',     "Rough lane — his shotgun knees shred your shield and out-range your pillar. Farm safe, build early armor, and scale to teamfights."]
    },
    tahmkench: {
      fiora:      ['FAVOURED', "You eat Fiora alive — W-dodge her Q engage, grey-health tanks the vitals burst, and a 3-stack Q-stun turns the trade."],
      olaf:       ['FAVOURED', "Grey-health out-sustains his all-in and your Q-stun kites the ghost — he commits, you W-dodge, and walk him down."],
      cassiopeia: ['FAVOURED', "Grey-health soaks her poison DPS and your Q-stun shuts the cast — close the gap once with W and she's gone."],
      renekton:   ['FAVOURED', "W-dodge his stun combo, grey-health the Conqueror burst, and Q-stun the re-engage — he cannot kill through your sustain."],
      tryndamere: ['FAVOURED', "Grey-health out-lasts the crit window and Q-stun cancels his spin — anti-heal him and he falls off into your scaling."],
      kled:       ['HARD',     "Mounted Kled out-trades your early — dodge the Q-pull, give ground until grey-health and items come online, then turn it."]
    },
    chogath: {
      malphite:    ['FAVOURED', "Free lane — out-sustain his poke, dodge the R with E, and Feast-scale into a fatter monster than he can ever be."],
      gangplank:   ['FAVOURED', "Eat the barrels with your passive sustain, Q-rupture him off his stacks, and Feast-execute the second he commits."],
      urgot:       ['FAVOURED', "Your best lane — sidestep the shotgun knees, rupture-slow him, and true-damage Feast beats his execute flip every time."],
      yorick:      ['FAVOURED', "E-spikes shred the Maiden, rupture cancels the cage, and Feast keeps you fatter than anything his split can do."],
      gwen:        ['FAVOURED', "Tank her mist DPS with sustain and MR, rupture her out of the W cloud, and Feast-execute when she dashes in."],
      heimerdinger:['FAVOURED', "Walk the turrets down — E-spikes clear them, Q zones the grenade, and you out-scale his poke into oblivion."],
      kennen:      ['FAVOURED', "Out-sustain the shuriken poke, rupture him out of the stun setup, and Feast once his energy bottoms out."],
      vladimir:    ['FAVOURED', "Race his sustain before he scales — rupture-poke, slap on anti-heal, and Feast-execute his pool timing."],
      sett:        ['HARD',     "Rough — his true-damage W punishes your slow trades. Dodge the pull, farm safe with E, and scale to teamfight Feast."],
      quinn:       ['TRICKY',     "Her vault poke kites your immobile frame. Rush boots and MR, farm under tower, and scale into Feast range."],
      kled:        ['HARD',     "His mounted all-in shreds you before you stack health. Respect level 1, dodge the Q-pull, and wait for items."]
    },
    ksante: {
      nasus:       ['FAVOURED', "Shove him off stacks — your Q-knockup interrupts the wither all-in and your ult drags him away from his wave."],
      jax:         ['FAVOURED', "All-in before his E-stun window, wall his leap, and your R one-vs-one shoves him clean out of the fight."],
      mordekaiser: ['FAVOURED', "Deny the realm — W-tank the death realm, knock him with Q, and your stacked tankiness out-trades the rotation."],
      gragas:      ['FAVOURED', "Out-trade the body-slam poke — W-tank the combo, Q-stun the engage, and ult him away from his team."],
      kayle:       ['TRICKY',     "She out-scales you hard past 11 — punish the weak early, shove and dive, but respect the ranged form late."],
      singed:      ['HARD',     "His poison kites your engage and the fling baits your dash. Don't chase — farm and match his split instead."],
      garen:       ['HARD',     "His silence and spin out-trade your early — dodge the Q-engage, farm safe, and scale into your item spikes."]
    },
    maokai: {
      akali:       ['FAVOURED', "Sapling-zone the shroud, Q-root through her dash, and out-sustain the burst — she can't kill through your Grasp heals."],
      gnar:        ['FAVOURED', "Root him out of mini-form kiting and punish the transform window — your sustain simply out-lasts his poke."],
      ryze:        ['FAVOURED', "Close the gap with W-root, sapling-zone his poke, and out-sustain the early — he can't peel your engage."],
      sylas:       ['FAVOURED', "Root him out of the dash combo, out-sustain the W heal, and punish his short range with sapling zoning."],
      gwen:        ['HARD',     "Her mist DPS out-trades your sustain. Bait the W cloud, root her out of it, and rush MR early."],
      fiora:       ['HARD',     "She parries your root and vitals you down. Bait the riposte, sapling-zone, and never extend a trade."],
      ornn:        ['TRICKY',     "He out-tanks and out-scales you — brittle beats your engage. Farm even and defer to teamfight value."]
    },
    shen: {
      nasus:       ['FAVOURED', "Bully him off stacks — taunt him out of his Q farm, Spirit Refuge blocks the wither autos, and your level-3 all-in beats his weak early."],
      camille:     ['FAVOURED', "Taunt cancels her hookshot engage, W-shield the trade, and out-sustain her into teamfights — her early ramp can't kill through you."],
      volibear:    ['FAVOURED', "Spirit Refuge eats his bite and autos, taunt interrupts the chain, and you out-trade him once his all-in is on cooldown."],
      jayce:       ['FAVOURED', "Eat the ranged poke with Q-energy sustain, taunt-close the second he's melee form, and punish every hammer-stance step-up."],
      irelia:      ['FAVOURED', "Spirit Refuge blocks her stacked autos, taunt cancels the E-stun combo, and she can't kill through your shield and sustain."],
      sylas:       ['FAVOURED', "Taunt him out of the dash combo, W-block the heal, and out-sustain the burst — his short range loses every extended trade."],
      ryze:        ['FAVOURED', "Walk him down — taunt cancels the root chain, Spirit Refuge soaks the barrage, and your all-in beats his immobile frame."],
      tahmkench:   ['FAVOURED', "Out-tempo the tank mirror — taunt interrupts his Q-stun, shield the trade, and apply Stand United pressure he can't match."],
      singed:      ['TRICKY',     "His poison kites your engage and the fling baits your taunt. Don't chase — match his split and farm the lane out."],
      kayle:       ['TRICKY',     "She out-scales you hard past 11 — pressure the weak early with taunt all-ins, but respect the ranged form late."],
      sett:        ['TRICKY',     "His true-damage W punishes your tanky trades. Bait the pull, taunt the grit window, and play for ult flanks instead."],
      riven:       ['TRICKY',     "Her animation-cancel burst out-trades your early — taunt the third-Q stun, shield the all-in, and scale to teamfights."],
      mordekaiser: ['TRICKY',     "His realm isolates you from your team value. Taunt-cancel the engage, but respect the 1v1 death realm and rush MR."],
      heimerdinger:['TRICKY',     "His turret zone walls your engage. Taunt through the grenade stun, but the poke out-trades you — call for ganks."],
      aurora:      ['TRICKY',     "Her ranged burst and dash kite your melee frame. Eat poke with Q-sustain, taunt the dash, and scale into your ult."]
    },
    sion: {
      kennen:      ['FAVOURED', "Walk through the shuriken poke with Q-shield, knock him up the moment he steps in, and his squishy frame folds to your all-in."],
      jayce:       ['FAVOURED', "Eat the ranged poke behind minions, Q-charge once he's melee, and your knockup beats every hammer step-up."],
      teemo:       ['FAVOURED', "Q-shield soaks the blind poke, knock him up out of the shrooms, and your tankiness out-scales his lane-bully phase."],
      ryze:        ['FAVOURED', "Charge a full Q through his root chain, knock him up, and your tank scaling beats his immobile poke every fight."],
      nasus:       ['FAVOURED', "Knock him off stacks — Q-cancel the wither all-in, shove the wave, and your early pressure starves his scaling."],
      pantheon:    ['FAVOURED', "Q-shield blocks the spear poke, knock him up out of the W-stun, and out-scale his early all-in window hard."],
      renekton:    ['FAVOURED', "Q-charge punishes his post-fury lull, shield the stun combo, and your tankiness out-lasts his early dominance."],
      drmundo:     ['TRICKY',     "He ignores your poke and out-sustains the lane. Forget the kill — farm with Q and build to teamfight knockup value."],
      garen:       ['HARD',     "His silence cuts your Q-charge and the spin out-trades you. Charge from max range, farm safe, and scale up."],
      yone:        ['TRICKY',     "His mobility dodges your Q and he out-DPSs your tank trades. Shield the poke, farm, and play for teamfight ult."],
      gangplank:   ['FAVOURED', "Tank the barrels under tower, Q-charge him off the wave, and your knockup + tankiness out-trade his squishy early before he scales."],
      darius:      ['TRICKY',     "His early all-in shreds you before you spike — dodge the Q-pull, charge from range, and survive to teamfights."],
      camille:     ['HARD',     "Her hookshot kites your Q and true-damage shreds your tankiness. Charge from max range and never extend a trade."],
      chogath:     ['TRICKY',     "He out-sustains and matches your scaling — rupture cancels your Q. Trade short, farm even, and play teamfights."]
    },
    nautilus: {
      kennen:      ['FAVOURED', "Hook him out of the air — Q-pull through minions, passive-root the dash, and his squishy frame can't survive your chain CC."]
    }
  };
  function apply(db) {
    if (!db) return;
    Object.keys(FIX).forEach(function (champ) {
      var entry = db[champ];
      if (!entry) return;
      Object.keys(FIX[champ]).forEach(function (foe) {
        var f = FIX[champ][foe];
        var m = entry[foe];
        if (!m) return;
        m.diff = f[0];
        m.tone = T[f[0]];
        m.tldr = f[1];
      });
    });
  }
  function applyAll() {
    apply(window.CHAMP_DATA);
    apply(window.CHAMP_FULL);
  }
  applyAll();
  // Idempotent re-apply: a short retry window guarantees the corrections land on whichever table
  // lags (some champ tables get rebuilt slightly after load, non-deterministically; display reads
  // CHAMP_FULL). Cheap and self-clearing.
  if (typeof setTimeout === 'function') {
    var tries = 0;
    var iv = setInterval(function () { applyAll(); if (++tries >= 24) clearInterval(iv); }, 250);
    setTimeout(applyAll, 0);
  }
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('DOMContentLoaded', applyAll);
  }
})();

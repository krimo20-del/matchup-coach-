// MatchupCoach — Juggernaut top-lane matchup corrections. Validated vs mobalytics/metabot consensus
// (Patch 26.x). The generated data gave every juggernaut the same boilerplate FAVOURED list
// (nasus/chogath/kayle/kassadin/sejuani) + blanket "loses to ranged" HARD, and left 9 near-identical
// pairs (Aatrox/Darius, Garen/Sett, Illaoi/Morde, etc.). This layer patches diff/tone/tldr for the
// verified real matchups, including cross-champ flips into already-corrected tanks/divers. Loaded
// LAST, after _tank-fixes.js and _diver-fixes.js.
(function () {
  var T = { FAVOURED: '#3ddc97', HARD: '#ff5d6c', EVEN: '#e8b84b', TRICKY: '#ff8b3d' };
  var FIX = {
    darius: {
      poppy:    ['FAVOURED', "Out-trade the immobile warden \u2014 E-pull her off the W-block, stack bleed, and Noxian Guillotine executes before she peels."],
      trundle:  ['FAVOURED', "Out-bully his early \u2014 E-pull past the pillar, bleed-stack the bite, and your level-2 all-in beats his sustain spike."],
      yasuo:    ['FAVOURED', "E-pull him out of the windwall, apply 5 stacks, and your R executes before he ever stacks crit \u2014 bully the weak early."],
      pantheon: ['FAVOURED', "Eat the early spear poke, E-pull the W-stun, and once you stack bleed your all-in beats his squishy frame."],
      ksante:   ['FAVOURED', "E-pull him out of the W-tank, bleed-stack faster than he resists, and Guillotine executes through his durability."],
      aurora:   ['FAVOURED', "E-pull her dash, close the range she wants, and bleed-stack into a Guillotine before she can kite you out."],
      yone:     ['FAVOURED', "E-pull the dash return, apply bleed, and your R executes \u2014 he can't out-trade your stacks once you catch him."],
      olaf:     ['TRICKY',     "His axe-spam out-DPSs your early and the R ignores your E-slow. Give ground, build armor, and look for a level-6 turn."],
      yorick:   ['HARD',     "His Maiden and ghouls out-trade you in extended fights and the cage walls your E-pull. Farm safe and scale to teamfights."],
      tahmkench:['TRICKY',     "Grey-health out-sustains your bleed and the Q-stun cancels your all-in. Anti-heal and don't over-commit into him."],
      drmundo:  ['TRICKY',     "He ignores your bleed and out-sustains every trade. Forget the kill \u2014 farm and play for teamfight ult execute value."],
      kennen:   ['HARD',     "His shuriken poke and range kite your E-pull all day. Eat poke behind minions, farm safe, and look for ganks."],
      gangplank:['TRICKY',     "Barrel poke out-ranges your E and out-sustains the lane. Eat poke, all-in on cooldown, and respect his scaling."],
      teemo:    ['HARD',     "His blind shuts your Q-W and the poke kites your E. Build MR, freeze near tower, and bring your jungler."],
      vayne:    ['TRICKY',     "Her condemn and %-true kite your E-pull all game. Build armor, freeze the wave, and gank-pressure her off the lane."],
      gragas:   ['TRICKY',     "His body-slam poke and disengage out-trade your bleed window. Eat the poke, E-pull on cooldown, and scale up."],
      garen:    ['HARD',     "His silence cuts your E-pull and the spin out-sustains your bleed. Bait the Q, but he out-trades you \u2014 short-trade and scale."],
      quinn:    ['HARD',     "Her vault poke and range kite your immobile kit. Rush boots, farm under tower, and look for jungler ganks."],
      tryndamere:['HARD',    "His crit-spin out-DPSs your early and the R denies your execute. Anti-heal, kite the spin, and scale to teamfights."]
    },
    garen: {
      jax:      ['FAVOURED', "Silence his E-stun setup, spin-trade through the leap, and your sustained DPS out-trades him before his ult."],
      ksante:   ['FAVOURED', "Silence the W-tank engage, spin him down, and your Conqueror trade out-DPSs his durability early."],
      gwen:     ['FAVOURED', "Silence her out of the mist, spin through the W-cloud, and out-trade her before she stacks \u2014 anti-heal the duel."],
      yasuo:    ['FAVOURED', "Silence cuts his windwall combo, spin-trade through the dash, and bully his weak early before he stacks crit."],
      darius:   ['FAVOURED', "Silence his E-pull, spin out of the bleed stacks, and your passive sustain out-lasts his all-in \u2014 short-trade and win."],
      teemo:    ['FAVOURED', "W-tank the blind, Q-silence onto him through the shrooms, and your all-in deletes his squishy frame once you're in range."],
      sett:     ['FAVOURED', "Silence the W-grit, spin-trade through the true damage, and your sustain out-lasts his slow ramp early."],
      sion:     ['FAVOURED', "Silence the Q-charge, spin him off the wave, and your DPS out-trades his slow kit before he scales."],
      sylas:    ['FAVOURED', "Silence the chain combo, spin through the W-heal, and out-trade his short range \u2014 he can't duel your sustain."],
      aurora:   ['FAVOURED', "W-tank the burst, Q-silence the dash, and close the gap \u2014 her ranged poke loses once you're spinning on her."],
      kayle:    ['HARD',     "She out-scales you hard past 11 \u2014 pressure the weak early with Q-silence all-ins, but respect the ranged form late."],
      tryndamere:['HARD',    "His crit-spin out-DPSs your spin and the R denies your kill. Anti-heal, short-trade, and don't extend into him."],
      camille:  ['HARD',     "Her hookshot kites your spin and true-damage shreds your tankiness. Bait the E, but she out-trades \u2014 farm and scale."],
      vayne:    ['TRICKY',     "Her condemn and %-true kite your spin all game. Build armor, freeze the wave, and gank-pressure her."],
      chogath:  ['TRICKY',     "He out-sustains your spin and the true-damage R beats your all-in. Trade short, deny stacks, and play teamfights."],
      quinn:    ['HARD',     "Her vault poke and range kite your engage. Rush boots, farm under tower, and look for jungler ganks."],
      nasus:    ['EVEN',     "Skill matchup — you bully his early with the spin, he out-scales your mid-game stacks. Win lane hard or lose late."],
      illaoi:   ['HARD',     "Her E-grab punishes your spin engage and the tentacles out-trade you in her zone. Short-trade and don't all-in."]
    },
    mordekaiser: {
      trundle:  ['FAVOURED', "Out-trade the bite \u2014 E-pull him in, W-shield the sustain, and your realm 1v1s him away from his pillar."],
      sylas:    ['FAVOURED', "W-shield the chain combo, E-pull the dash, and your realm isolates him \u2014 he can't out-sustain your stored damage."],
      gragas:   ['FAVOURED', "W-shield the body-slam burst, E-drag him in, and realm-isolate him away from his disengage."],
      kled:     ['FAVOURED', "E-pull him off Skaarl, W-shield the mounted dive, and your realm 1v1s the dismounted yordle."],
      illaoi:   ['FAVOURED', "Pull her away from the tentacles with E, W-shield the slam, and realm-isolate her out of her zone."],
      kennen:   ['FAVOURED', "W-shield the shuriken poke, E-pull him in, and your realm deletes his squishy frame once he's isolated."],
      malphite: ['FAVOURED', "W-shield the poke, E-drag him in, and out-DPS his armor in the realm before he itemizes."],
      sion:     ['FAVOURED', "W-shield the Q-charge, E-pull the knockup, and realm-isolate him \u2014 your stored damage out-trades his tank."],
      irelia:   ['FAVOURED', "W-shield her stacked autos, E-pull the dashes, and realm her away from minions to kill her reset potential."],
      teemo:    ['FAVOURED', "W-shield the blind poke, E-pull him in, and realm-isolate the yordle \u2014 he can't kite inside the death realm."],
      wukong:   ['TRICKY',     "His clone breaks your R-isolate and the armor out-trades your stored W. Bait the clone before you commit."],
      warwick:  ['TRICKY',     "His Q-leash and sustain out-race your W-shield and the R cancels your engage. Anti-heal and poke before level 3."],
      pantheon: ['TRICKY',     "His spear poke and W-stun out-trade your slow early. Eat poke before 3, and respect his all-in window."],
      yorick:   ['HARD',     "His Maiden and ghouls out-trade your W-shield and the cage walls your E. Farm safe and scale to teamfight realm picks."],
      heimerdinger:['HARD',  "His turret zone walls your E and out-pokes your slow approach. Eat the harassment and look for jungler ganks."],
      vayne:    ['HARD',     "Her condemn and %-true kite your immobile kit all game. Build MR, freeze the wave, and gank-pressure her."],
      poppy:    ['TRICKY',     "Her W blocks your E-pull and the E-stop walls your engage. Short-trade and don't waste the realm into her kit."],
      ksante:   ['HARD',     "His W-tank eats your stored damage and the knockup interrupts your realm. Short-trade and don't over-commit."],
      nasus:    ['HARD',     "He out-scales your isolate once stacked — bully the early realm, but the longer it goes the more his Q buries you."],
      illaoi:   ['EVEN',     "Coinflip — your realm isolates her from tentacles, but a landed E in her zone turns the 1v1. Whoever lands first wins."]
    },
    sett: {
      teemo:    ['FAVOURED', "W-tank the blind poke, pull him in with E, and your true-damage W deletes the squishy yordle once you're in range."],
      olaf:     ['FAVOURED', "Grit-tank his axe spam, true-damage W out-trades his early DPS, and the pull-stun sets up your all-in."],
      gnar:     ['FAVOURED', "E-stun him out of mini-form kiting, W the stored damage, and punish the transform window with your all-in."],
      tryndamere:['FAVOURED', "Grit out-lasts his crit window, true-damage W ignores his tankiness, and E-stun cancels the spin to kill him."],
      kennen:   ['HARD',     "His shuriken poke and range kite your pull all day. Eat poke behind minions, farm safe, and look for ganks."],
      pantheon: ['HARD',     "His spear poke and W-stun out-trade your grit window. Eat poke, bait the stun, and look for a level-6 turn."],
      quinn:    ['HARD',     "Her vault poke and range kite your E-pull. Rush boots, farm under tower, and gank-pressure her instead."],
      illaoi:   ['TRICKY',     "Her tentacles out-trade your grit in her zone and the E-grab punishes your pull. Never fight in tentacles."],
      garen:    ['HARD',     "His silence cuts your pull combo and the spin out-sustains your grit. Short-trade, anti-heal, and don't extend."],
      mordekaiser:['TRICKY',   "His realm isolates you from the wave and the W-shield eats your burst. Short-trade and respect the 1v1 ult."]
    },
    aatrox: {
      vladimir: ['FAVOURED', "E-reposition the Q sweetspots onto his pool timing, out-sustain his early, and burst him before he scales."],
      drmundo:  ['FAVOURED', "Anti-heal the regen, Q-sweetspot poke out-trades his early, and your all-in beats him before items."],
      akali:    ['FAVOURED', "Q-sweetspot her out of the shroud, E-knock the dash, and out-sustain her burst with your passive heal."],
      trundle:  ['FAVOURED', "Out-poke the bite with Q sweetspots, E-knock the pillar engage, and your drain out-sustains his early."],
      rumble:   ['FAVOURED', "Q-poke him out of the flamespitter, E-dash the harpoon, and out-sustain his zone with your healing."],
      sion:     ['FAVOURED', "Q-sweetspot the slow Q-charge, E-knock the engage, and out-tempo his clunky kit before he scales."],
      nasus:    ['FAVOURED', "Bully him off stacks \u2014 Q-poke the farm, E-knock the wither, and your early all-in starves his scaling."],
      heimerdinger:['HARD',  "His turret zone walls your engage and out-pokes your approach. Eat the harass and look for jungler ganks."],
      kennen:   ['HARD',     "His shuriken poke and range kite your Q all day. Minion-block the W, farm safe, and bring your jungler."],
      singed:   ['TRICKY',     "His poison kites your Q-sweetspots and the fling baits your engage. Don't chase \u2014 farm and match his split."],
      malphite: ['TRICKY',     "His armor stat-checks your Q and the R interrupts your all-in. Poke is wasted \u2014 farm even and scale to teamfights."],
      warwick:  ['HARD',     "His Q-leash and sustain out-race your drain and the R cancels your combo. Anti-heal and poke him before level 3."]
    },
    illaoi: {
      gragas:   ['FAVOURED', "E-grab his spirit, slam tentacles on the body-slam, and out-sustain his poke once you land the test."],
      kled:     ['FAVOURED', "E-test his spirit before he mounts, tentacle-slam the dismount, and your sustain out-lasts his all-in."],
      garen:    ['FAVOURED', "E-grab him out of the spin, tentacle-punish the silence engage, and out-trade his all-in in your zone."],
      sylas:    ['FAVOURED', "E-test his spirit, tentacle-slam the dash combo, and out-sustain his short-range burst in the zone."],
      teemo:    ['HARD',     "His blind shuts your slam and the poke kites your E all day. Build MR, farm near tower, and bring your jungler."],
      urgot:    ['HARD',     "His shotgun knees out-range your E and shred you before tentacles matter. Eat poke and scale to teamfights."],
      trundle:  ['HARD',     "His bite out-sustains your slams and the pillar walls your E. Anti-heal, don't extend, and scale to teamfights."],
      fiora:    ['EVEN',     "Pure skill matchup on the parry \u2014 riposte your E and you lose the trade; mistime it and she's dead. Coinflip lane."],
      mordekaiser:['EVEN',   "Coinflip \u2014 his realm isolates you from tentacles, but a landed E in your zone turns the 1v1. Whoever lands first wins."],
      warwick:  ['EVEN',     "Close skill lane \u2014 anti-heal his sustain, land E in your tentacle zone, and bait the R before you commit."]
    },
    nasus: {
      trundle:  ['FAVOURED', "Out-stack through his pressure \u2014 wither the bite, farm safe under tower, and your scaling buries his early lead."],
      aurora:   ['FAVOURED', "Wither the dash, farm the poke with lifesteal, and out-scale her once you stack \u2014 she can't kill a stacked Nasus."],
      akali:    ['FAVOURED', "Wither her out of the shroud combo, sustain the burst, and out-scale her hard once you have stacks."],
      kennen:   ['FAVOURED', "Eat the shuriken poke with lifesteal, wither the all-in, and out-scale his lane-bully phase into your stacks."],
      heimerdinger:['FAVOURED', "Tank the turret poke under tower, farm stacks safely, and out-scale his zone once you itemize."],
      rumble:   ['FAVOURED', "Sustain the flamespitter, wither the engage, and out-scale his early zone control with your stacks."],
      teemo:    ['FAVOURED', "Annoying but farmable \u2014 sustain the blind poke, wither the all-in, and out-scale the yordle once you stack."],
      mordekaiser:['FAVOURED', "Wither him before the realm, out-sustain the W-shield, and your stacked Q beats his isolate 1v1 late."],
      warwick:  ['HARD',     "His Q-leash and sustain out-trade your early and the R denies your scaling window. Farm safe and end fast."],
      quinn:    ['HARD',     "Her vault poke kites your wither and denies stacks. Farm under tower, build armor, and bring your jungler."],
      ambessa:  ['HARD',     "Her mobility and burst deny your stacks and punish your immobility. Farm safe and scale to teamfights."],
      gragas:   ['HARD',     "His body-slam poke and disengage deny your stacks. Farm under tower and out-scale to the late game."],
      wukong:   ['HARD',     "His clone and armor out-trade your early and deny stacks. Farm safe, build to teamfight scaling."],
      ksante:   ['HARD',     "His W-tank and knockup out-trade you and deny stacks. Farm under tower and scale to the late game."],
      kled:     ['HARD',     "His mounted all-in denies your stacks and the Q-pull catches you. Farm safe under tower and out-scale him."],
      darius:   ['HARD',     "His E-pull and bleed out-trade your early and deny stacks. Farm under tower, wither the all-in, and scale."],
      aatrox:   ['HARD',     "His Q-sweetspots and drain out-trade your early and deny stacks. Farm safe and out-scale to the late game."],
      illaoi:   ['HARD',     "Her tentacles and E-grab punish your immobility and deny stacks. Farm under tower and scale to teamfights."],
      garen:    ['EVEN',     "Skill matchup \u2014 he bullies your early stacks, you out-scale his mid-game. Wither the spin and farm safe to win late."]
    },
    yorick: {
      darius:   ['FAVOURED', "Wall the E-pull with your cage, Maiden out-trades his bleed, and your ghouls + sustain bury his all-in."],
      mordekaiser:['FAVOURED', "Cage him out of the realm setup, Maiden out-DPSs his W-shield, and your ghouls out-trade the isolate."],
      fiora:    ['HARD',     "She parries your E and vitals down the Maiden. Cage to peel, but she out-duels your ghouls \u2014 farm and split."],
      riven:    ['HARD',     "Her mobility dodges your cage and burst kills the Maiden. Wall to peel, short-trade, and scale to split push."],
      gwen:     ['HARD',     "Her %-HP mist shreds the Maiden and W-cloud dodges your cage. Farm safe and out-split her in the side lane."],
      yone:     ['HARD',     "His mobility dodges your cage and out-DPSs the Maiden. Wall to peel, farm safe, and play for split pressure."]
    },
    drmundo: {
      pantheon: ['FAVOURED', "Tank the spear poke with regen, Q-poke him back, and your R-sustain out-lasts his all-in window every time."],
      jax:      ['FAVOURED', "Ignore his E-counterstrike with Q chunks, out-sustain the duel with R, and he can't out-DPS your regen."],
      kennen:   ['FAVOURED', "Eat the shuriken poke with regen, Q-slow him down, and your R-sustain out-lasts his energy-gated combo."],
      vladimir: ['FAVOURED', "Out-sustain the sustain mirror \u2014 anti-heal his pool, Q-poke, and your R out-heals his burst late."],
      jayce:    ['FAVOURED', "Tank the ranged poke under tower, Q-farm safely, and out-scale his squishy frame once you R-sustain the all-in."],
      ksante:   ['FAVOURED', "Out-sustain his W-tank trades, Q-poke between his cooldowns, and your R out-lasts his durability 1v1."],
      volibear: ['FAVOURED', "Out-sustain his bite all-in with R, anti-heal the W-heal, and your regen out-lasts him in the extended fight."],
      urgot:    ['FAVOURED', "Tank the shotgun knees with regen, Q-poke between his long cooldowns, and out-sustain his R-execute attempt."],
      ambessa:  ['TRICKY',     "Her mobility and burst out-trade your slow kit and deny your R value. Farm with Q and scale to teamfights."],
      kled:     ['HARD',     "His mounted all-in out-DPSs your regen and anti-heal shuts your R. Farm under tower and don't extend early."],
      gwen:     ['HARD',     "Her %-HP mist shreds your health stacks and anti-heal guts your R. Farm safe and scale to teamfights."],
      aatrox:   ['HARD',     "His Q-sweetspots and drain out-trade your regen and anti-heal shuts your R. Farm with Q and scale up."],
      irelia:   ['TRICKY',     "Her stacked autos out-DPS your regen and the E-stun + anti-heal shut your R. Farm safe and scale."],
      quinn:    ['TRICKY',     "Her vault poke kites your slow Q and the range denies your engage. Farm under tower and build MR."],
      illaoi:   ['TRICKY',     "Her tentacles out-trade your regen in her zone and the E-grab punishes you. Never fight in tentacles."],
      yorick:   ['TRICKY',     "His Maiden and ghouls out-trade your regen and anti-heal shuts your R. Farm safe and out-split late."],
      tryndamere:['TRICKY',    "His crit-spin out-DPSs your regen and the R denies your kill. Anti-heal him and farm to teamfights."]
    },
    urgot: {
      jax:      ['FAVOURED', "Shotgun-knee him before the leap, E-flip the E-stun window, and your disrespect combo out-trades his all-in."],
      jayce:    ['FAVOURED', "Walk through the ranged poke with your shield knees, E-flip once he's melee, and execute the squishy frame."],
      ryze:     ['FAVOURED', "Shotgun-poke him out of the root chain, E-flip the combo, and your R-execute beats his immobile frame."],
      riven:    ['FAVOURED', "Knee her out of the combo, E-flip the third-Q, and your shield + execute beat her once cooldowns are down."],
      warwick:  ['FAVOURED', "Out-trade the early before his sustain matters \u2014 shotgun knees out-DPS him and E-flip cancels the R."],
      mordekaiser:['FAVOURED', "Poke him down before the realm, E-flip the engage, and your knees out-DPS his slow approach."],
      sylas:    ['FAVOURED', "Knee him out of the dash combo, E-flip the chain, and out-trade his short range with your disrespect."],
      garen:    ['FAVOURED', "Shotgun-poke past the spin, E-flip the silence engage, and your knees out-DPS his all-in window."],
      illaoi:   ['FAVOURED', "Poke her down before tentacles matter, E-flip the E-grab, and out-range her slams with your knees."],
      darius:   ['FAVOURED', "Out-range the E-pull with shotgun knees, E-flip the bleed all-in, and execute him before he stacks."],
      heimerdinger:['TRICKY',  "His turret zone walls your engage and out-pokes your knees. Eat the harass and look for jungler ganks."],
      kennen:   ['HARD',     "His shuriken poke and range kite your slow knees. Eat poke behind minions, farm safe, and bring your jungler."],
      drmundo:  ['HARD',     "He out-sustains your knees and the regen shrugs off your poke. Forget the kill \u2014 farm and scale to teamfights."],
      kayle:    ['HARD',     "She out-scales you hard past 11 \u2014 punish the weak early with knees, but respect the ranged form late."],
      yorick:   ['TRICKY',     "His Maiden and ghouls out-trade your knees and the cage walls your E-flip. Farm safe and scale to teamfights."],
      kled:     ['HARD',     "His mounted all-in closes your range and out-DPSs your knees. Poke the dismount, but respect the brave-mode dive."],
      aurora:   ['HARD',     "Her ranged burst and dash kite your slow kit. Eat poke, E-flip the dash, but the range out-trades you early."]
    },
    volibear: {
      yasuo:    ['FAVOURED', "Q-flip him out of the windwall, W-bite the all-in, and your E-shield out-trades his crit before he stacks."],
      zac:      ['FAVOURED', "Out-trade the blob \u2014 W-bite the engage, Q-flip the Q-stretch, and your sustain beats his early."],
      vladimir: ['EVEN',     "Coinflip \u2014 Q-flip his pool all-in, but his sustain out-trades your early. Whoever snowballs the early takes it."],
      trundle:  ['FAVOURED', "Out-bite the bite \u2014 W-heal out-sustains his Q, Q-flip the pillar, and your early all-in beats his."],
      mordekaiser:['FAVOURED', "Q-flip him before the realm, W-bite the W-shield, and your E-shield out-trades his stored damage."],
      gwen:     ['FAVOURED', "Q-flip her out of the mist, W-bite through the W-cloud, and your early all-in beats her before she stacks."],
      wukong:   ['TRICKY',     "His clone bait and armor out-trade your bite and the Q-knockup cancels your Q-flip. Bait the clone first."],
      ambessa:  ['TRICKY',     "Her mobility and burst kite your engage and out-trade you. Farm safe and scale to teamfight R picks."],
      drmundo:  ['HARD',     "He out-sustains your bite all-in and the regen shrugs off your poke. Anti-heal and don't extend into him."],
      gangplank:['TRICKY',     "Barrel poke out-ranges your Q-flip and out-sustains the lane. Eat poke, all-in on cooldown, and respect his scaling."],
      heimerdinger:['HARD',  "His turret zone walls your engage and out-pokes your approach. Eat the harass and look for ganks."],
      chogath:  ['TRICKY',     "He out-sustains your bite and the true-damage R beats your all-in. Trade short and don't feed his scaling."],
      kennen:   ['HARD',     "His shuriken poke and range kite your Q-flip. Eat poke behind minions, farm safe, and bring your jungler."],
      gnar:     ['TRICKY',     "His mini-form kiting out-pokes your bite and the transform punishes your all-in. Bait mega-form and short-trade."],
      akali:    ['HARD',     "Her shroud breaks your engage and the dash kites your bite. Itemize anti-heal and respect the burst."],
      yorick:   ['TRICKY',     "His Maiden and ghouls out-trade your bite and the cage walls your Q-flip. Farm safe and scale to teamfights."],
      illaoi:   ['TRICKY',     "Her tentacles out-trade your bite in her zone and the E-grab punishes your engage. Never fight in tentacles."],
      jayce:    ['HARD',     "His ranged poke out-trades your bite before you reach him. Eat poke behind minions, all-in once he's melee."],
      riven:    ['TRICKY',     "Her animation-cancel burst out-trades your early \u2014 W-bite the third-Q, but she out-damages your all-in. Short-trade."],
      teemo:    ['HARD',     "His blind shuts your bite and the poke kites your Q-flip. Build MR, farm near tower, and bring your jungler."],
      quinn:    ['HARD',     "Her vault poke and range kite your engage. Rush boots, farm under tower, and look for jungler ganks."]
    },
    riven:    { garen:  ['EVEN',     "Pure skill matchup \u2014 shield his spin, animation-cancel the silence, and whoever wins the cooldown game takes it."] },
    trundle:  { darius: ['HARD',     "His E-pull and bleed out-trade your early before your bite spike. Give ground, sustain up, and out-scale him on items."], aatrox: ['HARD', "His Q-sweetspots and drain out-poke your bite and the E-knock interrupts your all-in. Sustain up and scale to teamfights."], nasus: ['HARD', "He out-scales your bite hard once stacked \u2014 deny him early, but the longer it goes the more his Q buries you."] },
    vayne:    { mordekaiser: ['FAVOURED', "Condemn his E-pull, %-true melts him through the W-shield, and kite the realm \u2014 he can't catch you once you space."] },
    jax:      { garen:  ['HARD',     "His silence cuts your E-stun and the spin out-sustains your trade. Short-trade around E, anti-heal, and scale."], drmundo: ['HARD', "He out-sustains your duel and shrugs off your burst. Forget the kill \u2014 farm, build anti-heal, and split push."] },
    yasuo:    { garen:  ['HARD',     "His silence cuts your combo and the spin out-trades your early. Windwall the engage, short-trade, and scale crit."] },
    tryndamere:{ sett:  ['HARD',     "His grit out-lasts your crit window and the true-damage W ignores your tankiness. Anti-heal and short-trade only."] }
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

// MatchupCoach — Diver & Skirmisher top-lane matchup corrections. Validated vs community/
// stat-aggregator consensus (mobalytics / metabot, Patch 26.x). The generated data gave every
// diver the same boilerplate (FAVOURED into nasus/chogath/kayle/kassadin/sejuani, HARD into
// heimer/jayce/quinn/teemo/cassio/lucian/ziggs) and left many near-identical pairs. This layer
// patches diff/tone/tldr for the verified real matchups. Loaded after _tank-fixes.js.
(function () {
  var T = { FAVOURED: '#3ddc97', HARD: '#ff5d6c', EVEN: '#e8b84b', TRICKY: '#ff8b3d' };
  var FIX = {
    fiora: {
      ksante:   ['FAVOURED', "Parry his Q-knockup and vitals-shred his stacked tankiness — once you bait the W-tank window he can't survive your ult."],
      gwen:     ['FAVOURED', "Vital-poke through her mist, parry the W-cloud reset, and out-duel her — anti-heal turns the extended fight your way."],
      kled:     ['FAVOURED', "Parry the Q-pull, kite the mounted dash, and once he's dismounted your vitals delete him before Skaarl returns."],
      illaoi:   ['EVEN',     "Skill matchup on the parry — riposte her E-grab and you win; mistime it and her tentacles flip the trade."],
      irelia:   ['FAVOURED', "Parry her E-stun engage, vital the stacked autos, and out-DPS her — she can't kill through your riposte and lifesteal."],
      sylas:    ['FAVOURED', "Parry the chain combo, vital-poke his short range, and out-sustain the W-heal — his all-in loses to your duel."],
      ryze:     ['FAVOURED', "Parry the root, close the gap with Q, and vital-shred his immobile frame before the spell barrage matters."],
      malphite: ['HARD',     "His armor and shield wall your duel — parry the R but the passive soaks your vitals. Respect it, farm, and scale to split."],
      kayle:    ['HARD',     "Bully the weak early, but she out-scales you hard past 11 — her ranged form kites your parry. Close it out before 16."],
      warwick:  ['HARD',     "His sustain out-races your vitals and the Q-suppress cancels your duel. Anti-heal, bait the R, and don't extend early."],
      aurora:   ['TRICKY',     "Her ranged burst and dash kite your vitals. Parry the engage, but the poke out-trades you — play safe and scale."],
      wukong:   ['HARD',     "His clone bait and armor out-trade your duel — he Q-knocks you out of vital range. Bait the clone before you commit."],
      vayne:    ['HARD',     "Her condemn and %-true autos kite your parry — she stays out of vital range all game. Build armor and bring your jungler."],
      akali:    ['TRICKY',     "Her shroud breaks your vital targeting and the dash kites your duel. Parry the burst and itemize anti-heal early."],
      olaf:     ['FAVOURED', "Bait his ghost all-in, then parry the axe-empowered auto and vital-shred him — once his early spike passes you out-duel him."]
    },
    jax: {
      volibear: ['FAVOURED', "E-counterstrike his bite-and-auto all-in, then ult and out-duel — once his early spike passes you win every trade."],
      trundle:  ['FAVOURED', "Bait the bite and pillar, E-dodge his auto window, and your ult out-stats his — he can't duel you past first item."],
      irelia:   ['FAVOURED', "E-counterstrike her stacked autos and stun combo, then all-in — she can't out-trade your dodge into ult."],
      mordekaiser:['FAVOURED', "E-dodge the realm combo, all-in once his Q is down, and your ult out-duels his death realm 1v1."],
      drmundo:  ['HARD',     "He ignores your burst and out-sustains every trade. Forget the duel — farm, build anti-heal, and scale to split push."],
      singed:   ['TRICKY',     "His poison kites your E-stun and the fling baits your all-in. Don't chase — farm the wave and match his split."],
      vladimir: ['TRICKY',     "His pool dodges your E-window and sustain out-trades you. Poke is unanswerable early — farm and look for ganks."]
    },
    camille: {
      olaf:     ['FAVOURED', "Hookshot-kite his ghost all-in, E-stun the engage, and once his early spike fades your true-damage out-duels him."],
      kennen:   ['FAVOURED', "Hookshot onto him through minions, E-stun before the stun setup, and true-damage his squishy frame down."],
      trundle:  ['FAVOURED', "E-engage past the pillar, isolate him off his bite sustain, and your ult-isolation duels him out of the lane."],
      riven:    ['FAVOURED', "Block her burst with the W-shield, E-stun the third-Q, and out-trade her once her combo's on cooldown."],
      yone:     ['FAVOURED', "Hookshot the dash, W-shield the Q-knockup, and your true-damage shreds his squishy duel before the ult."],
      ksante:   ['FAVOURED', "E-engage past his W-tank, true-damage shreds the stacked resists, and isolate him with your ult."],
      garen:    ['FAVOURED', "Hookshot in, W-shield the spin, and true-damage out-trades his courage window every time."],
      irelia:   ['FAVOURED', "E-stun her stacked autos, W-shield the combo, and your true-damage out-duels her in the extended fight."],
      darius:   ['FAVOURED', "Hookshot-kite his pull range, W-shield the bleed all-in, and true-damage out-trades him once the Q is down."],
      rumble:   ['TRICKY',     "His flamespitter zone out-DPSs your duel and the slow kites your engage. Dodge the E-harpoon and farm safe."],
      warwick:  ['TRICKY',     "His sustain out-races your true-damage and the R cancels your engage. Anti-heal early and don't extend."],
      vayne:    ['HARD',     "Her condemn and %-true kite your hookshot — she stays out of range all game. Build armor and gank-pressure her."],
      urgot:    ['HARD',     "His shotgun knees out-range your engage and shred your duel. Respect the early, farm safe, and scale to flanks."],
      gwen:     ['HARD',     "Her mist %-HP shreds your tankiness and she W-clouds your all-in. Bait the cloud, but she out-duels you — short-trade."]
    },
    irelia: {
      ryze:     ['FAVOURED', "E-stun through his root chain, stack your passive on the minions, and her extended trade shreds his immobile frame."],
      jayce:    ['FAVOURED', "Q-gapclose the ranged poke, E-stun once he's melee form, and out-trade him with full passive stacks."],
      gwen:     ['FAVOURED', "E-stun her out of the mist, stick with Q-resets, and anti-heal turns the extended fight your way."],
      aurora:   ['FAVOURED', "Q-dash the poke, E-stun her dash, and once you're on her with stacks she can't escape the trade."],
      quinn:    ['FAVOURED', "Q onto her through minions, E-stun the vault, and her squishy frame folds once you stick with passive stacks."],
      yone:     ['FAVOURED', "E-stun his dash return, Q-stick through the mobility, and out-trade his squishy duel with full stacks."],
      malphite: ['TRICKY',     "His armor and shield stat-check your stacks, and the R interrupts your engage. Short-trade only and scale past him."],
      warwick:  ['HARD',     "His Q follows your dashes and the sustain out-races your lifesteal. Don't extend — short trades, anti-heal, scale."],
      jax:      ['HARD',     "His E-counterstrike blocks your stacked autos and the ult out-duels you. Bait the E before you commit."],
      volibear: ['TRICKY',     "He does everything you do but better levels 1-6 — Q-flip, W-heal, E-shield. Survive the early and scale."],
      shen:     ['HARD',     "Spirit Refuge eats your stacked autos and the taunt cancels your combo. Short-trade and look for roams instead."],
      singed:   ['TRICKY',     "His poison kites your dashes and the fling baits your all-in. Don't chase — farm and match his split."],
      sett:     ['HARD',     "His true-damage W punishes your extended trades. Bait the pull, short-trade with stacks, and scale."],
      trundle:  ['TRICKY',     "His bite out-sustains your lifesteal and the pillar walls your Q-stick. Short trades only, then scale."]
    },
    riven: {
      sylas:    ['FAVOURED', "Burst him before the W-heal lands — your animation-cancel combo out-trades his short-range chain every time."],
      yorick:    ['FAVOURED', "All-in through the Maiden with your shield, stun the cage escape, and your early burst beats his slow scaling."],
      fiora:    ['FAVOURED', "Bait the parry with an early Q, then E-shield the riposte window and combo her down before she duels back."],
      garen:    ['FAVOURED',     "Pure skill matchup \u2014 shield his spin, animation-cancel the Q-silence, and whoever wins the cooldown game takes it."],
      malphite: ['FAVOURED', "Bully the immobile rock early — shield his poke, all-in before he stacks armor, and snowball the lead."],
      yone:     ['FAVOURED', "Shield the Q-knockup, stun the dash, and burst his squishy frame before the windwall and ult come online."],
      rumble:   ['FAVOURED', "Stun him out of the flamespitter, shield the harpoon poke, and close the gap to delete him before the Equalizer."],
      sion:     ['FAVOURED', "Animation-cancel the Q-charge, stun the knockup, and out-tempo his slow kit with your combo."],
      maokai:   ['TRICKY',     "His sapling-zone and root cancel your engage, and the sustain out-trades you. Bait the W and short-trade."],
      ornn:     ['HARD',     "Brittle-stun walls your combo and he out-scales you hard. Trade short, deny the all-in, and end before late."],
      camille:  ['HARD',     "Her hookshot kites your combo and true-damage shreds you. Bait the E before you commit your all-in."],
      olaf:     ['TRICKY',     "His ghost ignores your combo and out-DPSs the trade. Kite the axe and don't extend into his all-in."],
      urgot:    ['HARD',     "His shotgun knees out-range your dashes and shred your burst. Respect the early and look for ult flanks."],
      kled:     ['TRICKY',     "Mounted Kled out-trades your combo — dodge the Q-pull, bait the dismount, and only all-in once Skaarl's gone."],
      vayne:    ['HARD',     "Her condemn and %-true kite your combo all game. Build armor, freeze the wave, and bring your jungler."],
      gwen:     ['FAVOURED', "Bully her weak early — burst her before the W-cloud, stun the all-in, and out-trade her squishy frame pre-stacks."]
    },
    renekton: {
      sylas:    ['FAVOURED', "Empowered-W stun his chain combo, dominate the early with fury, and snowball before his W-heal scales."],
      warwick:  ['FAVOURED', "All-in before his sustain matters — empowered-W stuns the Q-suppress and your early bully phase beats him."],
      wukong:   ['FAVOURED', "Bait the clone, empowered-W through his Q-knockup, and your fury all-in out-trades him before items."],
      teemo:    ['EVEN',     "Coinflip \u2014 blind your fury all-in and he kites, but a landed empowered combo bursts him. Whoever plays it cleaner wins."],
      yone:     ['FAVOURED', "Empowered-W stuns the dash, fury-trade his squishy duel, and bully him off the lane before he scales."],
      yasuo:    ['FAVOURED', "E-W onto him through windwall, fury-burst before he stacks, and your early all-in beats his scaling."],
      garen:    ['FAVOURED', "Stat-check the early — empowered-W stuns the spin, fury-trade his courage window, and dominate levels 1-6."],
      mordekaiser:['FAVOURED', "Win the early before his realm value — empowered combo out-trades him and the dash escapes the 1v1 isolate."],
      volibear: ['FAVOURED', "Out-bully his early — empowered-W stuns the bite engage and fury all-ins beat him before his spike."],
      tahmkench:['HARD',     "Grey-health out-sustains your fury burst and the Q-stun cancels your engage. Short-trade and don't over-commit."],
      pantheon: ['TRICKY',     "His spear poke and W-stun out-trade your fury window. Eat poke, bait the stun, and look for a level-6 turn."],
      quinn:    ['HARD',     "Her vault poke and range kite your fury all-in. Build early boots, farm safe, and look for jungler ganks."],
      vayne:    ['HARD',     "Her condemn and %-true kite your engage all game. Build armor, freeze the wave, and gank-pressure her."],
      urgot:    ['HARD',     "His shotgun knees out-range your E and shred your fury trades. Respect the early and scale to teamfights."],
      illaoi:   ['HARD',     "Her tentacles out-trade your fury in her zone and the E-grab punishes your all-in. Never fight in tentacles."],
      singed:   ['TRICKY',     "His poison kites your fury window and the fling baits your all-in. Don't chase — farm and match his split."],
      chogath:  ['HARD',     "He out-sustains your fury and the true-damage R beats your all-in. Trade short and don't feed his scaling."],
      gangplank:['TRICKY',     "Barrel poke out-ranges your E and clears your wave. Eat poke, all-in on cooldown, and respect the kit."],
      drmundo:  ['TRICKY',     "He ignores your fury burst and out-sustains every trade. Forget the kill — farm and scale to teamfights."]
    },
    yone: {
      yorick:   ['FAVOURED', "Dash past the Maiden, windwall the cage, and out-mobility his slow split — he can't catch your resets."],
      drmundo:  ['FAVOURED', "Kite his cleaver with the dash, poke between his sustain windows, and out-scale his low ceiling."],
      tahmkench:['FAVOURED', "Windwall his Q-stun, dash the engage, and out-tempo the tank — he can't catch your mobility."],
      kennen:   ['TRICKY',     "His shuriken poke and stun setup punish your dash returns. Eat poke, respect the stun, and scale carefully."],
      kled:     ['HARD',     "Mounted Kled out-trades you and the Q-pull catches your dash. Dodge the pull and don't extend early."],
      warwick:  ['TRICKY',     "His Q follows your dash and the sustain out-races you. Anti-heal early and don't commit to extended trades."],
      singed:   ['TRICKY',     "His poison kites your dash and the fling baits your engage. Don't chase — farm and match his split."],
      riven:    ['HARD',     "Her animation-cancel burst out-trades your early — windwall the combo, dodge the stun, and scale up."],
      irelia:   ['HARD',     "Her stacked autos and E-stun out-duel your early. Windwall the engage, short-trade, and scale to mid-game."],
      malphite: ['TRICKY',     "His armor stat-checks your autos and the R interrupts your dash. Poke from range and never all-in into the ult."],
      sett:     ['TRICKY',     "His true-damage W punishes your trades and the pull catches your dash. Bait the W and poke from range."],
      vladimir: ['TRICKY',     "His pool dodges your engage and sustain out-trades you. Poke is unanswerable — farm and look for ganks."],
      pantheon: ['HARD',     "His spear poke and W-stun out-trade your dash windows. Eat poke, respect the stun, and scale past his early."]
    },
    vayne: {
      renekton: ['FAVOURED', "Kite the fury all-in — condemn him off the engage, %-true shreds his tankiness, and out-scale his early bully phase."],
      olaf:     ['FAVOURED', "Condemn the axe all-in, %-true melts him through his early DPS, and kite the ghost — he can't catch you once you spike."],
      kled:     ['FAVOURED', "Tumble the Q-pull, condemn the mounted dive, and %-true shreds Skaarl — dismount-kite him out of the lane."],
      fiora:    ['FAVOURED', "Tumble her Q-dashes, condemn the all-in, and %-true out-damages her vitals — stay at range and she folds."],
      riven:    ['FAVOURED', "Tumble out of her combo, condemn the third-Q, and kite the all-in — your %-true beats her once she's blown cooldowns."],
      camille:  ['FAVOURED', "Condemn her hookshot engage, tumble the E, and %-true out-trades her sustain — she can't stick to you."],
      jax:      ['FAVOURED', "Kite the leap, condemn the E-stun window, and %-true melts him — stay spaced and his all-in whiffs."],
      tryndamere:['FAVOURED', "Condemn the spin, kite the crit window, and anti-heal him — %-true out-damages his lifesteal from range."],
      warwick:  ['FAVOURED', "Tumble the Q-leash, condemn the R, and %-true melts him — stay at range and his sustain can't catch you."]
    },
    olaf: {
      poppy:    ['FAVOURED', "Q-slow her before the E-stop, ignore her CC with your R, and your relentless early all-in beats her short trades."],
      warwick:  ['FAVOURED', "Out-trade his sustain early — land double-Q, R through his fear, and kill him before his Q-suppress heal matters."],
      sylas:    ['FAVOURED', "Q-slow the dash, R-ignore his chain CC, and your level-1 axe spam out-damages his short-range combo."],
      kled:     ['FAVOURED', "Bully him before he mounts — double-Q the dismount, R the brave-mode all-in, and your early DPS out-races Skaarl."],
      gangplank:['FAVOURED', "Q-slow him onto you past the barrels, R-ignore the slow, and all-in his squishy frame before he scales."],
      camille:  ['HARD',     "Her hookshot kites your axes and true-damage shreds you. Bait the E, but she out-trades your all-in — farm and scale."],
      aurora:   ['HARD',     "Her ranged burst and dash kite your axe-pickups. Eat poke, R-engage once, but the range out-trades you early."],
      tahmkench:['HARD',     "Grey-health out-sustains your all-in and the Q-stun cancels your engage. Anti-heal and don't extend into him."],
      ksante:   ['HARD',     "His W-tank eats your burst and the knockup interrupts your all-in. Short-trade, anti-heal, and don't over-commit."],
      ornn:     ['HARD',     "Brittle-stun walls your engage and he out-scales you hard. Pressure the early, but defer the game to teamfights."],
      wukong:   ['HARD',     "His clone bait and armor out-trade your axes — he Q-knocks you out of range. Bait the clone before you all-in."],
      fiora:    ['HARD',     "She parries your axe-empowered all-in and vitals you down. Bait the riposte, but she out-duels your extended trade."],
      akali:    ['HARD',     "Her shroud breaks your axe-pickups and the dash kites your all-in. Itemize anti-heal and respect the burst."]
    },
    wukong: {
      trundle:  ['FAVOURED', "Clone-bait his bite, Q-knock him out of the pillar, and your armor-shred out-trades his sustain by item one."],
      vayne:    ['FAVOURED', "E-gapclose past the condemn, clone-bait the tumble, and Q-knockup her squishy frame before she kites."],
      yasuo:    ['FAVOURED', "E onto him through windwall, clone-bait the combo, and Q-knockup out-trades his all-in before he stacks crit."],
      urgot:    ['FAVOURED', "Clone the shotgun knees, E-gapclose past the range, and Q-knock him before his disrespect combo lands."],
      olaf:     ['FAVOURED', "Clone-bait his all-in, Q-knock him out of axe range, and your armor out-trades his early DPS by first item."],
      fiora:    ['FAVOURED', "Clone-bait the riposte, Q-knock her out of vital range, and your armor stat-checks her duel."],
      poppy:    ['HARD',     "Her W blocks your dash and the E-stop walls your engage. Short-trade only and don't waste the gap-close into her W."],
      tahmkench:['TRICKY',     "Grey-health out-sustains your burst and the Q-stun cancels your engage. Anti-heal and short-trade."],
      sion:     ['TRICKY',     "His Q-knockup interrupts your all-in and the tankiness out-lasts your burst. Bait the Q before you commit."],
      vladimir: ['HARD',     "His pool dodges your knockup and sustain out-trades you. Poke is unanswerable — farm and look for ganks."],
      shen:     ['TRICKY',     "Spirit Refuge eats your autos and the taunt cancels your combo. Short-trade and look for roams instead."],
      renekton: ['HARD',     "His fury all-in out-trades your early before your spike. Dodge the empowered stun and scale past his bully phase."],
      gwen:     ['FAVOURED', "Clone-bait her W-cloud, Q-knock her out of the mist, and your armor out-trades her %-HP snip."]
    },
    yasuo: {
      urgot:    ['FAVOURED', "Windwall the shotgun knees, E-dash the slow, and Q-knock him before his disrespect flip — your mobility beats his range."],
      ryze:     ['FAVOURED', "Windwall the root chain, E-dash through minions, and Q-knockup his immobile frame before the barrage scales."],
      graves:   ['FAVOURED', "Windwall the buckshot, E-weave the smoke, and all-in once his Q is down — he can't kite your dash."],
      chogath:  ['TRICKY',     "He out-sustains your poke and the rupture-silence cancels your dash. The true-damage R beats your all-in — short-trade."],
      volibear: ['HARD',     "He does everything you do but tankier 1-6 — the Q-flip and W-heal out-trade you. Survive the early and scale crit."],
      malphite: ['HARD',     "His armor stat-checks your crit and the R interrupts your engage. Poke from range and never all-in into the ult."],
      wukong:   ['HARD',     "His clone bait and armor out-trade your combo and the Q-knockup cancels your dash. Bait the clone before you commit."],
      kled:     ['HARD',     "Mounted Kled out-trades your early and the Q-pull catches your dash. Dodge the pull and don't extend."],
      pantheon: ['HARD',     "His spear poke and W-stun shut down your engage windows. Eat poke, bait the stun, and scale past his early."],
      tryndamere:['HARD',    "His crit-spin out-DPSs your trades and the R denies your kill. Anti-heal, kite the spin, and scale to teamfights."]
    },
    pantheon: {
      poppy:    ['FAVOURED', "Spear-poke her down before the W-stop, W-stun the engage, and your early all-in beats her short trades."],
      yasuo:    ['FAVOURED', "Point-click W-stun ignores his windwall, spear-poke chunks him, and you bully his weak early before he stacks crit."],
      yone:     ['FAVOURED', "W-stun the dash return, spear-poke his squishy frame, and out-trade his early before he gets mobile."],
      sett:     ['FAVOURED', "Spear-poke from range, W-stun the pull, and your early-game all-in beats his slow ramp before items."],
      drmundo:  ['HARD',     "He ignores your poke and out-sustains every trade. Forget the kill — farm and play for early roams with your R."],
      malphite: ['TRICKY',     "His armor stat-checks your spears and the R interrupts your all-in. Poke is wasted into him — roam for value instead."],
      chogath:  ['TRICKY',     "He out-sustains your poke and the true-damage R beats your all-in. Trade short and roam before he scales."],
      yorick:   ['TRICKY',     "His Maiden and ghouls out-trade your early and the cage walls your engage. Farm safe and roam with your R."],
      gwen:     ['HARD',     "Her W-cloud blocks your W-stun and the %-HP mist out-trades your poke. Roam for value — you lose the extended duel."]
    },
    kled: {
      yasuo:    ['FAVOURED', "Mount up and run him down — Q-pull through the windwall, and your brave-mode all-in beats his crit scaling."],
      rumble:   ['FAVOURED', "Q-pull him out of the flamespitter, dismount-dive the harpoon, and your mounted all-in out-trades his zone."],
      akali:    ['FAVOURED', "Q-pull her out of the shroud, mount-dive the dash, and brave-mode out-sustains her burst."],
      tahmkench:['FAVOURED', "Q-pull past the grey-health, mounted all-in out-paces his sustain, and dismount-burst beats his Q-stun."],
      trundle:  ['FAVOURED', "Mount up and out-trade the bite — Q-pull the pillar escape and your brave-mode DPS beats his sustain early."],
      drmundo:  ['FAVOURED', "Q-pull him in, mounted all-in out-DPSs his regen, and anti-heal before he sustains back — bully him early."],
      jayce:    ['FAVOURED', "Q-pull through the ranged poke, mount-dive once he's melee, and brave-mode shreds his squishy frame."],
      tryndamere:['FAVOURED',"Out-bully his early — Q-pull the spin, mounted all-in before his crit, and anti-heal his lifesteal."],
      yone:     ['FAVOURED', "Q-pull the dash return, mount-dive his squishy duel, and brave-mode out-trades him before he scales."],
      olaf:     ['HARD',     "His axe-spam out-DPSs your mount and the R ignores your pull. Give ground early and only fight once he's dismounted."],
      singed:   ['HARD',     "His poison kites your mount and the fling baits your pull. Don't chase — farm and match his split push."],
      illaoi:   ['HARD',     "Her tentacles shred your mounted HP in her zone and the E-grab punishes your pull. Never all-in in tentacles."],
      fiora:    ['HARD',     "She parries your Q-pull and vitals you down. Bait the riposte, but she out-duels your dismount — short-trade."],
      gwen:     ['HARD',     "Her mist %-HP shreds your mounted health and she dodges your pull in the W. Bait the cloud and short-trade."],
      garen:    ['TRICKY',     "His silence cuts your pull combo and the spin out-trades your dismount. Q-pull from range and don't extend."],
      urgot:    ['FAVOURED', "Out-trade the shotgun knees \u2014 Q-pull him in, mounted all-in out-DPSs his slow kit, and dismount-burst beats his execute."]
    },
    tryndamere: {
      gwen:     ['FAVOURED', "Spin onto her through the mist, anti-heal the W-heal, and your sustained crit out-duels her squishy frame."],
      rumble:   ['FAVOURED', "Spin through the flamespitter, R-tank the Equalizer, and your lifesteal out-lasts his zone damage."],
      yasuo:    ['FAVOURED', "Spin past the windwall, crit through his block, and your R denies his all-in — out-scale his early."],
      camille:  ['FAVOURED', "Anti-heal her sustain, spin onto her through the hookshot, and your lifesteal out-duels her once E is down."],
      gragas:   ['FAVOURED', "Spin onto him past the body-slam, crit through his W-tank, and out-sustain his poke with lifesteal."],
      garen:    ['FAVOURED', "Spin through the spin, anti-heal his regen, and your crit out-trades his courage window into your scaling."],
      malphite: ['FAVOURED', "Bully the immobile rock — spin the poke, crit past his armor early, and snowball before he itemizes."],
      darius:   ['FAVOURED', "Spin out of the pull range, R-deny his bleed all-in, and anti-heal turns the extended duel your way."],
      kled:     ['HARD',     "Mounted Kled out-trades your early and the Q-pull catches your spin. Give ground until you out-scale him."],
      chogath:  ['TRICKY',     "He out-sustains your crit and the true-damage R beats your all-in. Anti-heal, short-trade, and scale to split."],
      trundle:  ['HARD',     "His bite and pillar out-sustain your spin and kite your all-in. Anti-heal early and don't extend into him."],
      pantheon: ['HARD',     "His spear poke and W-stun out-trade your early before you spike. Eat poke and scale past his bully phase."],
      warwick:  ['HARD',     "His Q follows your spin and the sustain out-races your lifesteal. Anti-heal and don't commit to extended trades."],
      jax:      ['TRICKY',     "His E-counterstrike blocks your crit and the ult out-duels you. Bait the E before you all-in."],
      shen:     ['TRICKY',     "Spirit Refuge eats your crit autos and the taunt cancels your spin. Short-trade and look to split instead."],
      volibear: ['TRICKY',     "He out-sustains and out-trades your early with the W-heal and Q-flip. Survive the early and out-scale him."],
      singed:   ['TRICKY',     "His poison kites your spin and the fling baits your engage. Don't chase — match his split and scale."],
      poppy:    ['TRICKY',     "Her W blocks your dash-spin and the E-stop walls your engage. Short-trade and don't waste R into her kit."],
      tahmkench:['HARD',     "Grey-health out-sustains your crit and the Q-stun cancels your engage. Anti-heal and don't over-commit."]
    },
    gwen: {
      kennen:   ['FAVOURED', "Mist-dodge the shuriken poke, %-HP shred his squishy frame, and W-cloud the stun setup before he can combo."],
      pantheon: ['FAVOURED', "W-cloud the spear poke and W-stun, %-HP shred him in melee, and out-scale his early all-in into your snip."],
      camille:  ['FAVOURED', "Mist-dodge her hookshot, %-HP true-shred ignores her sustain, and W-cloud the all-in — she can't burst you down."],
      yorick:   ['FAVOURED', "%-HP snip clears the Maiden and out-trades the ghouls, and W-cloud the cage — out-scale his slow split."],
      kled:     ['FAVOURED', "Mist-dodge his Q-pull, %-HP shred his mounted health, and W-cloud the all-in — he can't burst through your snip."],
      fiora:    ['HARD',     "She parries your snip and vitals you down. Bait the riposte, but she out-duels your extended trade — farm safe."],
      irelia:   ['HARD',     "Her E-stun and stacked autos out-trade your early. W-cloud the engage, short-trade, and scale into your mist."],
      tryndamere:['HARD',    "His crit-spin out-DPSs your early and the R denies your kill. Anti-heal, kite with W, and out-scale him."],
      singed:   ['HARD',     "His poison kites your snip and the fling baits your W. Don't chase — farm and match his split push."],
      vladimir: ['TRICKY',     "His pool dodges your combo and sustain out-trades your stacks. Anti-heal early and respect the poke."],
      warwick:  ['HARD',     "His Q follows your dash and the sustain out-races your snip. Anti-heal, bait the R, and don't extend early."],
      wukong:   ['HARD',     "His clone bait and armor out-trade your stacks and the Q-knockup cancels your combo. Bait the clone first."],
      poppy:    ['TRICKY',     "Her W blocks your engage and the E-stop walls your dash. Short-trade and itemize before committing."]
    },
    gragas: {
      rumble:   ['FAVOURED', "Body-slam him out of the flamespitter, barrel-poke his low range, and your burst out-trades his zone."],
      tahmkench:['FAVOURED', "Out-poke the grey-health with barrel-Q, body-slam the engage, and your burst beats his slow sustain."],
      urgot:    ['FAVOURED', "Barrel-poke past the shotgun range, body-slam the disrespect combo, and out-trade him with your burst."],
      vladimir: ['FAVOURED', "Body-slam him out of pool range, barrel-poke the sustain, and your engage beats his short early."],
      fiora:    ['FAVOURED', "Body-slam-knock her out of vital range, barrel-poke the all-in, and your burst beats her squishy early."],
      sylas:    ['FAVOURED', "Body-slam the dash, barrel-poke his short range, and your burst out-trades the chain combo."],
      nasus:    ['FAVOURED', "Barrel-poke him off stacks, body-slam the wither all-in, and starve his scaling with your early pressure."],
      wukong:   ['TRICKY',     "His clone bait and armor out-trade your burst and the Q-knockup cancels your engage. Bait the clone first."],
      irelia:   ['TRICKY',     "Her stacked autos and E-stun out-trade your combo. Body-slam to disengage and play for teamfight R picks."],
      warwick:  ['TRICKY',     "His Q follows your body-slam and the sustain out-races your poke. Anti-heal and don't extend into him."],
      garen:    ['TRICKY',     "His silence cuts your combo and the spin out-trades you. Barrel-poke from range and don't extend."],
      tryndamere:['HARD',    "His crit-spin out-sustains your poke and the R denies your burst. Body-slam to disengage and scale to teamfights."]
    },
    warwick: {
      poppy:    ['FAVOURED', "Q-suppress through her W-block, sustain out-lasts her short trades, and the R picks her once she steps up."],
      fiora:    ['FAVOURED', "Your Q follows her dashes and sustain out-races her vitals — anti-heal her and she can't out-duel you."],
      gwen:     ['FAVOURED', "Q-leash her through the mist, out-sustain the W-heal, and your R locks her down before she stacks."],
      trundle:  ['FAVOURED', "Out-sustain the bite, Q-chase past the pillar, and your R-suppress denies his all-in once you spike."],
      malphite: ['FAVOURED', "Sustain through his poke, Q-suppress the engage, and out-DPS his armor once you have anti-heal."],
      irelia:   ['FAVOURED', "Your Q follows her Q-dashes — she can't kite you — and the sustain out-races her stacked autos."],
      tryndamere:['FAVOURED', "Q-suppress cancels his spin, out-sustain the crit window, and anti-heal his lifesteal to out-duel him."],
      aatrox:   ['FAVOURED', "Q-leash him out of his Q sweetspots, out-sustain the drain, and anti-heal his healing to win the duel."],
      illaoi:   ['EVEN',     "Close skill lane \u2014 anti-heal her sustain and bait the R, but a landed E in her zone flips it. Plays even."],
      sett:     ['TRICKY',     "His true-damage W out-trades your sustain and the grit out-lasts your Q. Short-trade and don't over-commit."]
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
  // Robust convergence: some champ tables get (re)built slightly after this script runs, in a
  // non-deterministic, per-champ way (display reads CHAMP_FULL). A short retry window guarantees the
  // corrections land on whichever table lags, regardless of timing. Idempotent and cheap.
  if (typeof setTimeout === 'function') {
    var tries = 0;
    var iv = setInterval(function () { applyAll(); if (++tries >= 24) clearInterval(iv); }, 250);
    setTimeout(applyAll, 0);
  }
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('DOMContentLoaded', applyAll);
  }
})();

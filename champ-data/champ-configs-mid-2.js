// MatchupCoach — CHAMPS engine configs for MID: Control & Battlemages (2/2).
window.CHAMP_CONFIGS_MID = Object.assign(window.CHAMP_CONFIGS_MID || {}, {
  Ryze: {
    dataKey: 'ryze_mid', sub: 'Battlemage \u00b7 Combo Scale \u00b7 Realm Warp', label: '#7fa8e8', tint: 'rgba(100,150,220,0.5)',
    classLabel: 'Battlemage', winStyle: 'Combo / Map Play', ultVerdict: 'REALM WARP',
    lateSwing: 'Your EQ deletes carries and your warp wins objectives \u2014 two items is the deadline you set.', spikeLine: 'RoA online \u2014 the combo chunks half bars; force the trades you avoided.',
    spikeItem: 'RoA spike \u2014 EQ every wave contact and root every step-up.', lvl6Spike: 'Realm Warp online \u2014 every shove is now a cross-map play waiting to happen.',
    fbVerb: 'run the full E-Q-W chain on his window', fbAction: 'root the engage and cycle the combo', fbDo: 'Bank Tear stacks off every safe Q', dosTail: 'The root is your only \u2018stop\u2019 button \u2014 hold W for his gap-close and the lane\u2019s kill threats expire unfired.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Tear + Catalyst first back'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Rod of Ages', 'Seraph\u2019s Embrace'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Overload', note: 'Max 1st \u00b7 the engine + shield' },
      { k: 'W', color: '#9b8cff', label: 'Rune Prison', note: 'Max last \u00b7 point-blank root' },
      { k: 'E', color: '#e8b84b', label: 'Spell Flux', note: 'Max 2nd \u00b7 spread + amp' },
      { k: 'R', color: '#ff5d6c', label: 'Realm Warp', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Flux Chunk', keys: ['E', 'Q'], tone: '#46c6f5', tier: 'Trade', when: 'Wave contact: flux the wave, Q the bounce-amp through his chest, walk.' },
      { name: 'Root Chain', keys: ['W', 'E', 'Q', 'Q'], tone: '#ff5d6c', tier: 'Kill', when: 'He oversteps: root, flux the amp, cycle Qs through the prison window.' },
      { name: 'Kite Cycle', keys: ['E', 'Q', 'W', 'Q'], tone: '#e8b84b', tier: 'Defensive', when: 'He runs you down: flux-Q backward, root the committed dash, keep walking.' },
      { name: 'Warp Play', keys: ['R'], tone: '#9b8cff', tier: 'Map', when: 'Wave crashed: warp the jungler to bot, the team to Baron, or yourself out of the trap.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights before they group \u2014 warp flanks onto their backline, root the peel, and EQ the carry out of the game.',
    teamLookFor: [{ label: 'A flank to warp', tone: '#9b8cff' }, { label: 'Their carry in EQ range', tone: '#46c6f5' }, { label: 'W root for the diver', tone: '#ff5d6c' }, { label: 'Shield cycled before contact', tone: '#e8b84b' }],
    teamPositioning: ['Warp is the win condition \u2014 spend it on coordinates, not panic.', 'Root the first diver, EQ the second.', 'Cycle Q to keep the passive shield loaded.', 'Fight at flux range \u2014 the bounces do the aiming.']
  },
  Swain: {
    dataKey: 'swain_mid', sub: 'Battlemage \u00b7 Drain Tank \u00b7 Vision', label: '#e89fb0', tint: 'rgba(220,110,140,0.5)',
    classLabel: 'Battlemage', winStyle: 'Drain / Root Pick', ultVerdict: 'DEMONIC ASCENSION',
    lateSwing: 'Your ascended drain decides every late fight that lasts six seconds \u2014 they all last six seconds.', spikeLine: 'Liandry\u2019s online \u2014 the drain outpaces their damage; force rivers.',
    spikeItem: 'Liandry\u2019s spike \u2014 root the entry, ascend, profit.', lvl6Spike: 'Demonic Ascension online \u2014 you now WANT the all-in everyone else fears; invite the dive.',
    fbVerb: 'root the entry and drain the commitment', fbAction: 'land the root and pull it with the passive', fbDo: 'Land one root per wave cycle, then trade off it', dosTail: 'Ascend EARLY in the exchange, not late \u2014 the drain that starts at 80% HP wins fights the panic-R at 20% only photographs.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Liandry\u2019s Torment', 'Rylai\u2019s Crystal Scepter'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Death\u2019s Hand', note: 'Max 1st \u00b7 the hand that farms' },
      { k: 'W', color: '#9b8cff', label: 'Vision of Empire', note: 'Max last \u00b7 cross-map eye' },
      { k: 'E', color: '#e8b84b', label: 'Nevermove', note: 'Max 2nd \u00b7 the root that decides' },
      { k: 'R', color: '#ff5d6c', label: 'Demonic Ascension', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Root Pull', keys: ['E', 'AA', 'Q'], tone: '#e8b84b', tier: 'Trade', when: 'He steps up: root, passive-pull for the chunk + heal, Q the retreat.' },
      { name: 'Empire Setup', keys: ['E', 'W', 'Q'], tone: '#9b8cff', tier: 'Pick', when: 'Root connects at range: W never misses rooted targets \u2014 the full chain chunks half bars.' },
      { name: 'Drain Stand', keys: ['R', 'E', 'Q'], tone: '#ff5d6c', tier: 'Teamfight', when: 'Skirmish starts: ascend early, root the second wave, demonflare the clump.' },
      { name: 'Flare Finish', keys: ['R', 'AA', 'R'], tone: '#46c6f5', tier: 'Kill', when: 'They commit to killing the demon: drain to full stacks and detonate Demonflare.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights by lasting \u2014 root their entry, ascend in the middle of their commit, and let the drain math out-vote their carries.',
    teamLookFor: [{ label: 'Their engage to root', tone: '#e8b84b' }, { label: 'A clump to ascend into', tone: '#ff5d6c' }, { label: 'W vision on the flank', tone: '#9b8cff' }, { label: 'Demonflare stacks banked', tone: '#46c6f5' }],
    teamPositioning: ['Ascend at the front of YOUR line, not theirs.', 'Root the diver who touches your carry.', 'W the fog before the fight \u2014 the eye wins the setup war.', 'Demonflare when they group to kill you \u2014 they always do.']
  },
  Syndra: {
    dataKey: 'syndra_mid', sub: 'Burst Control \u00b7 Orb Economy \u00b7 Sovereign', label: '#c89fe8', tint: 'rgba(170,120,220,0.5)',
    classLabel: 'Control Mage', winStyle: 'Poke / Execute', ultVerdict: 'UNLEASHED POWER',
    lateSwing: 'Your QE-R deletes one carry per fight before it starts \u2014 sphere discipline is the win condition.', spikeLine: 'Luden\u2019s online \u2014 QE-stun into rotation deletes squishies.',
    spikeItem: 'Luden\u2019s spike \u2014 force the wave-contact trades he cannot refuse.', lvl6Spike: 'Unleashed Power online \u2014 three-plus spheres means most mids die to R alone.',
    fbVerb: 'chip him below the R-execute line', fbAction: 'bank spheres and stun the answer', fbDo: 'Q every last-hit he attempts \u2014 the poke is free', dosTail: 'Count your spheres before every fight \u2014 the R that kills is the one you did the arithmetic for at full health.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Luden\u2019s Companion', 'Shadowflame'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Dark Sphere', note: 'Max 1st \u00b7 poke + ammo' },
      { k: 'W', color: '#9b8cff', label: 'Force of Will', note: 'Max 2nd \u00b7 slow setup' },
      { k: 'E', color: '#e8b84b', label: 'Scatter the Weak', note: 'Max last \u00b7 the stun that decides' },
      { k: 'R', color: '#ff5d6c', label: 'Unleashed Power', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Sphere Poke', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'His last-hit: Q the spot he must stand, auto if he eats it, leave the orb as ammo.' },
      { name: 'Scatter Stun', keys: ['Q', 'E', 'Q'], tone: '#e8b84b', tier: 'Kill', when: 'He steps on the orb line: QE the stun, Q the stunned face, walk forward menacingly.' },
      { name: 'Slow Setup', keys: ['W', 'Q', 'E'], tone: '#9b8cff', tier: 'Pick', when: 'River contest: W-slow the dodge, QE the slowed line \u2014 the stun is near-guaranteed.' },
      { name: 'Verdict', keys: ['Q', 'E', 'R'], tone: '#ff5d6c', tier: 'Execute', when: 'Three spheres banked: stun, count aloud, and R the sentence.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights by subtraction \u2014 QE the priority target at the fight\u2019s first breath and R them out of the game before their team notices.',
    teamLookFor: [{ label: 'Spheres pre-banked', tone: '#46c6f5' }, { label: 'Their carry on the QE line', tone: '#e8b84b' }, { label: 'R damage counted', tone: '#ff5d6c' }, { label: 'W slow for the setup', tone: '#9b8cff' }],
    teamPositioning: ['Bank spheres at the choke two minutes early.', 'QE the carry, not the front line.', 'Count R damage before the fight, not during.', 'Hold E for their dive if you\u2019re the win condition.']
  },
  Taliyah: {
    dataKey: 'taliyah_mid', sub: 'Battlemage \u00b7 Geometry & Roam \u00b7 Stoneweaver', label: '#e8b88f', tint: 'rgba(220,160,110,0.5)',
    classLabel: 'Battlemage', winStyle: 'Burst / Roam', ultVerdict: 'WEAVER\u2019S WALL',
    lateSwing: 'Your wall edits the endgame \u2014 cut their reinforcements and Q the half you isolated.', spikeLine: 'Luden\u2019s online \u2014 the W-E-Q rotation deletes squishies.',
    spikeItem: 'Luden\u2019s spike \u2014 force river fights your stones pre-seeded.', lvl6Spike: 'Weaver\u2019s Wall online \u2014 you are the best roaming mid in the game; every shove is a gank announcement.',
    fbVerb: 'shove him across the stone field', fbAction: 'pre-seed the dash lane and break the combo with W', fbDo: 'Fight on fresh ground only \u2014 Worked Ground is enemy terrain', dosTail: 'Three roams by 14 minutes is the benchmark \u2014 the lane is the metronome between them, not the song.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Luden\u2019s Companion', 'Shadowflame'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Threaded Volley', note: 'Max 1st \u00b7 fresh-ground burst' },
      { k: 'W', color: '#9b8cff', label: 'Seismic Shove', note: 'Max 2nd \u00b7 the displacement' },
      { k: 'E', color: '#e8b84b', label: 'Unraveled Earth', note: 'Max last \u00b7 dash-punishing field' },
      { k: 'R', color: '#ff5d6c', label: 'Weaver\u2019s Wall', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Geometry Trade', keys: ['W', 'E', 'Q'], tone: '#9b8cff', tier: 'Kill', when: 'He oversteps: shove him across the stones, Q the detonation \u2014 half a bar in one second.' },
      { name: 'Fresh Volley', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'Wave contact on fresh ground: five stones into his chest, kite to the next fresh patch.' },
      { name: 'Mine the Dive', keys: ['E', 'W'], tone: '#e8b84b', tier: 'Defensive', when: 'His engage tells: seed the dash lane \u2014 his own mobility detonates it; shove what survives.' },
      { name: 'Wall Roam', keys: ['R'], tone: '#ff5d6c', tier: 'Map', when: 'Wave crashed: surf the wall to bot, gank off the W-E geometry, recall before mid notices.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights with terrain \u2014 wall their reinforcements out, shove their frontline into your team, and Q whatever stands on your stones.',
    teamLookFor: [{ label: 'A fight to cut in half', tone: '#ff5d6c' }, { label: 'Stones pre-seeded at the pit', tone: '#e8b84b' }, { label: 'W angle on their carry', tone: '#9b8cff' }, { label: 'Fresh ground to fight on', tone: '#46c6f5' }],
    teamPositioning: ['Wall before the fight forms, not after.', 'Seed the choke their divers must cross.', 'Shove their engage backward into the stones.', 'Fight on fresh ground \u2014 always know your floor.']
  },
  Viktor: {
    dataKey: 'viktor_mid', sub: 'Battlemage \u00b7 Evolution \u00b7 Machine Herald', label: '#9fe0d8', tint: 'rgba(120,200,190,0.5)',
    classLabel: 'Battlemage', winStyle: 'Zone / Augment Scale', ultVerdict: 'CHAOS STORM',
    lateSwing: 'Evolved Viktor is a zone they can\u2019t enter \u2014 W the choke, E the clump, steer R through the retreat.', spikeLine: 'Luden\u2019s online \u2014 the laser chunks a third bar; force extended rotations.',
    spikeItem: 'Luden\u2019s spike \u2014 the storm executes what the laser starts.', lvl6Spike: 'Chaos Storm online \u2014 your all-in answer and teamfight entry in one button.',
    fbVerb: 'laser the rotation through his chest', fbAction: 'shield the opener and zone the follow-up', fbDo: 'Aim E through minions into his chest \u2014 farm AND poke per cast', dosTail: 'Drop W before the dive, not after \u2014 the field that pre-exists the engage is the one that stuns it.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Luden\u2019s Companion', 'Shadowflame'],
    skillSeq: ['E', 'Q', 'W', 'E', 'E', 'R', 'E', 'Q', 'E', 'Q', 'R', 'Q', 'Q', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Siphon Power', note: 'Max 2nd \u00b7 shield + empowered auto' },
      { k: 'W', color: '#9b8cff', label: 'Gravity Field', note: 'Max last \u00b7 the stun zone' },
      { k: 'E', color: '#e8b84b', label: 'Hex Ray', note: 'Max 1st \u00b7 the laser' },
      { k: 'R', color: '#ff5d6c', label: 'Chaos Storm', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Laser Trade', keys: ['E', 'Q', 'AA'], tone: '#e8b84b', tier: 'Trade', when: 'Wave contact: laser through the minions into him, Q-shield the answer, empowered auto out.' },
      { name: 'Field Stun', keys: ['W', 'E', 'R'], tone: '#ff5d6c', tier: 'Kill', when: 'He commits: gravity the ground he needs, laser the stun, storm the remainder.' },
      { name: 'Shield Walk', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Defensive', when: 'Forced to eat a trade: pre-shield his spell, auto, and walk before round two.' },
      { name: 'Storm Steer', keys: ['R', 'E', 'W'], tone: '#9b8cff', tier: 'Teamfight', when: 'Fight commits: storm the carry, steer it along their retreat, W the choke they flee through.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights with the evolved zone \u2014 W their entry choke, E the clump behind their tanks, and steer the storm through whoever retreats.',
    teamLookFor: [{ label: 'A choke for Gravity Field', tone: '#9b8cff' }, { label: 'Their clump on the E line', tone: '#e8b84b' }, { label: 'Storm target picked', tone: '#ff5d6c' }, { label: 'Q shield cycled', tone: '#46c6f5' }],
    teamPositioning: ['W the choke before their engage, not during.', 'Laser through your front line \u2014 it aims, you position.', 'Steer the storm \u2014 an unsteered R is half an R.', 'Q-shield the diver who reaches you.']
  },
  Vladimir: {
    dataKey: 'vladimir_mid', sub: 'Battlemage \u00b7 Drain Scale \u00b7 Crimson', label: '#e88f9f', tint: 'rgba(220,110,130,0.5)',
    classLabel: 'Battlemage', winStyle: 'Sustain / Scale', ultVerdict: 'HEMOPLAGUE',
    lateSwing: 'Late Vlad is a raid boss \u2014 pool their engage, R their clump, drain whatever argues.', spikeLine: 'Riftmaker online \u2014 every trade heals more than it costs.',
    spikeItem: 'Riftmaker spike \u2014 extended fights are donations to your health bar.', lvl6Spike: 'Hemoplague online \u2014 Q-E-R-E with Ignite kills most mids who thought they were winning.',
    fbVerb: 'drain the extended fight he started', fbAction: 'pool his keystone spell and drain the gap', fbDo: 'Pool the spell that matters \u2014 never the poke', dosTail: 'Health is mana \u2014 spend E charges and trades like an accountant; the ledger always closes in your favor at three items.',
    buildStart: ['Doran\u2019s Shield + Health Potion', 'Amplifying Tome + Boots'],
    buildCore: ['Sorcerer\u2019s Shoes / Swiftness', 'Riftmaker', 'Cosmic Drive'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Transfusion', note: 'Max 1st \u00b7 the drain engine' },
      { k: 'W', color: '#9b8cff', label: 'Sanguine Pool', note: 'Max last \u00b7 the untargetable no' },
      { k: 'E', color: '#e8b84b', label: 'Tides of Blood', note: 'Max 2nd \u00b7 charged AoE' },
      { k: 'R', color: '#ff5d6c', label: 'Hemoplague', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Drain Trade', keys: ['Q', 'E', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'His cooldown gap: Q the heal, charged E release, auto, walk \u2014 the trade pays you.' },
      { name: 'Pool the Plan', keys: ['W'], tone: '#9b8cff', tier: 'Defensive', when: 'His engage spell flies: pool it, surface behind the wreckage, Q the confusion.' },
      { name: 'Plague All-In', keys: ['R', 'E', 'Q', 'W'], tone: '#ff5d6c', tier: 'Kill', when: 'Level 6 invert: R, charged E, empowered Q, pool the counter \u2014 Ignite signs it.' },
      { name: 'Crimson Exit', keys: ['E', 'W', 'Q'], tone: '#e8b84b', tier: 'Escape', when: 'Gank collapses: release E into the chasers, pool the CC, Q-heal the walk home.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights by surviving them \u2014 R the clump as their engage commits, pool the answer, and drain the shared health crisis you created.',
    teamLookFor: [{ label: 'Their clump for Hemoplague', tone: '#ff5d6c' }, { label: 'Pool held for their CC', tone: '#9b8cff' }, { label: 'Empowered Q banked', tone: '#46c6f5' }, { label: 'A flank worth draining', tone: '#e8b84b' }],
    teamPositioning: ['R the fight\u2019s center of mass, then wade in.', 'Pool their fight-flipping CC, nothing less.', 'Drain the front line while the plague ticks.', 'You are the second engage \u2014 arrive right behind the first.'],
    teamFlank: ['Loop wide while they commit to your team.', 'R the clump from the side they didn\u2019t ward.', 'Charged E + empowered Q the plagued.', 'Pool out through the hole they left.']
  },
  Xerath: {
    dataKey: 'xerath_mid', sub: 'Artillery \u00b7 Max Range \u00b7 Ascended', label: '#9fc6f0', tint: 'rgba(120,170,230,0.5)',
    classLabel: 'Artillery', winStyle: 'Poke / Snipe', ultVerdict: 'RITE OF THE ARCANE',
    lateSwing: 'You decide late fights from off-screen \u2014 stun the engage, barrage the pit, relocate.', spikeLine: 'Luden\u2019s online \u2014 Q-W chunks third-bars; he farms at half HP forever.',
    spikeItem: 'Luden\u2019s spike \u2014 the chip war is officially a foreclosure.', lvl6Spike: 'Rite of the Arcane online \u2014 chipped targets anywhere in the lane\u2019s zip code are finishable.',
    fbVerb: 'chip him below the snipe line', fbAction: 'tax the approach and stun the commit', fbDo: 'Q from beyond his answer range on every last-hit', dosTail: 'Hold E like rent \u2014 the stun is your entire defense, and every assassin in the lobby is listening for the silence after you waste it.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Luden\u2019s Companion', 'Shadowflame'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Arcanopulse', note: 'Max 1st \u00b7 the long gun' },
      { k: 'W', color: '#9b8cff', label: 'Eye of Destruction', note: 'Max 2nd \u00b7 artillery + slow' },
      { k: 'E', color: '#e8b84b', label: 'Shocking Orb', note: 'Max last \u00b7 the only no' },
      { k: 'R', color: '#ff5d6c', label: 'Rite of the Arcane', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Chip Cycle', keys: ['Q', 'W'], tone: '#46c6f5', tier: 'Trade', when: 'His last-hit: max-range Q, W the lateral dodge \u2014 one-way trades, repeat to foreclosure.' },
      { name: 'Stun Punish', keys: ['E', 'Q', 'W'], tone: '#e8b84b', tier: 'Kill', when: 'He commits: orb the engage mid-flight, full rotation on the stunned regret.' },
      { name: 'Barrage', keys: ['R'], tone: '#ff5d6c', tier: 'Snipe', when: 'Anyone chipped, anywhere: root yourself safe and mail the remainder.' },
      { name: 'Distance Reset', keys: ['W', 'E'], tone: '#9b8cff', tier: 'Defensive', when: 'Gap closed: W-slow the floor, E the chase, and rebuild the moat.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights the enemy can\u2019t attend \u2014 stun their entry, barrage the objective pit, and reposition before the minimap finds you.',
    teamLookFor: [{ label: 'Max range maintained', tone: '#46c6f5' }, { label: 'E held for their dive', tone: '#e8b84b' }, { label: 'Chipped targets for R', tone: '#ff5d6c' }, { label: 'Fog to fire from', tone: '#9b8cff' }],
    teamPositioning: ['Max range, always \u2014 you have no second act up close.', 'Stun the diver, not the tank.', 'R from fog \u2014 a seen barrage is a dodged barrage.', 'Chip the objective fight before it starts.']
  },
  Ziggs: {
    dataKey: 'ziggs_mid', sub: 'Artillery \u00b7 Poke \u00b7 Demolition', label: '#f0c468', tint: 'rgba(232,184,75,0.5)',
    classLabel: 'Artillery', winStyle: 'Poke / Siege', ultVerdict: 'MEGA INFERNO BOMB',
    lateSwing: 'Your R + minefields decide sieges \u2014 poke the objective fight before it starts.', spikeLine: 'Blackfire Torch online \u2014 every Q now burns; force the poke war.',
    spikeItem: 'Blackfire Torch spike \u2014 shove and chip relentlessly.', lvl6Spike: 'Mega Inferno Bomb online \u2014 every chipped target and crashing wave is now your gold.',
    fbVerb: 'poke him off the wave from max range', fbAction: 'bomb the step-up and satchel away from the engage', fbDo: 'Q his last-hits from max range on cooldown', dosTail: 'Hold W Satchel strictly as your escape \u2014 it is your Flash, your tower-killer, and your anti-dive in one button.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Blackfire Torch rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Blackfire Torch', 'Shadowflame'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Bouncing Bomb', note: 'Max 1st \u00b7 core poke' },
      { k: 'W', color: '#9b8cff', label: 'Satchel Charge', note: 'Max last \u00b7 escape + demolish' },
      { k: 'E', color: '#e8b84b', label: 'Hexplosive Minefield', note: 'Max 2nd \u00b7 zone + slow' },
      { k: 'R', color: '#ff5d6c', label: 'Mega Inferno Bomb', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Poke Cycle', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Safe', when: 'Bounce Q off the wave onto his last-hit spot, weave an auto if he eats it, reset to max range.' },
      { name: 'Zone Trade', keys: ['E', 'Q', 'AA'], tone: '#e8b84b', tier: 'Trade', when: 'He steps forward: minefield between you, Q the slowed path, walk the zone\u2019s edge.' },
      { name: 'Satchel Escape', keys: ['W'], tone: '#9b8cff', tier: 'Defensive', when: 'His engage commits: satchel-jump over the wall or knock him back mid-dash.' },
      { name: 'Execute', keys: ['E', 'Q', 'R'], tone: '#ff5d6c', tier: 'Kill', when: 'He\u2019s chipped under half: minefield the exit, Q, and land R on the slowed path.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights before they start \u2014 poke the objective setup with max-range Q, mine the chokepoints, and drop Mega Inferno on the clump the moment they commit.',
    teamLookFor: [{ label: 'A siege or choke to mine', tone: '#e8b84b' }, { label: 'Enemies clumped for R', tone: '#ff5d6c' }, { label: 'Their engage spent', tone: '#46c6f5' }, { label: 'W up to peel divers', tone: '#9b8cff' }],
    teamPositioning: ['Max range, always \u2014 you have no second chance up close.', 'Mine the choke before the fight, not during.', 'R the clump or the objective wave, never one tank.', 'Satchel-peel the first diver that reaches you.']
  }
});

// MatchupCoach — CHAMPS engine configs for MID: Assassins (1/2).
window.CHAMP_CONFIGS_MID = Object.assign(window.CHAMP_CONFIGS_MID || {}, {
  Akali: {
    dataKey: 'akali_mid', sub: 'Assassin \u00b7 Shroud & Resets \u00b7 Rogue', label: '#8fe0b8', tint: 'rgba(110,200,160,0.5)',
    classLabel: 'Assassin', winStyle: 'Shroud / Execute', ultVerdict: 'PERFECT EXECUTION',
    lateSwing: 'Late Akali erases carries \u2014 R through the front line, shroud the response, reset out.', spikeLine: 'First item online \u2014 shroud trades become kill threats.',
    spikeItem: 'First item spike \u2014 punish every whiffed spell.', lvl6Spike: 'Perfect Execution online \u2014 half-health mages are clean-up duty.',
    fbVerb: 'erase him in the shrouded window', fbAction: 'shroud his combo and counter through the smoke', fbDo: 'Trade only with shroud available \u2014 the smoke is the matchup', dosTail: 'Weave the passive ring auto after every spell \u2014 it is half your damage and all of your energy refund.',
    buildStart: ['Doran\u2019s Shield + Health Potion', 'Hextech Alternator'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Riftmaker / Stormsurge', 'Zhonya\u2019s Hourglass'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Five Point Strike', note: 'Max 1st \u00b7 kama poke' },
      { k: 'W', color: '#9b8cff', label: 'Twilight Shroud', note: 'Max last \u00b7 the smoke' },
      { k: 'E', color: '#e8b84b', label: 'Shuriken Flip', note: 'Max 2nd \u00b7 dash + return' },
      { k: 'R', color: '#ff5d6c', label: 'Perfect Execution', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Ring Trade', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Safe', when: 'His last-hit: Q the toes, walk through the passive ring, auto the refund.' },
      { name: 'Shroud Trade', keys: ['Q', 'W', 'AA', 'Q'], tone: '#9b8cff', tier: 'Trade', when: 'Real window: Q-auto, shroud his answer, Q again from the smoke.' },
      { name: 'Full Execution', keys: ['E', 'Q', 'R', 'R'], tone: '#ff5d6c', tier: 'Kill', when: 'He\u2019s chipped: E in, Q, R1 through, R2 execute \u2014 the smoke covers the paperwork.' },
      { name: 'E Return', keys: ['E'], tone: '#e8b84b', tier: 'Escape', when: 'Collapse arrives: flip backward \u2014 the second cast returns you to the shuriken.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights one deletion at a time \u2014 R through the front line, shroud their answer, execute, and E-reset out famous.',
    teamLookFor: [{ label: 'Their carry at execute range', tone: '#ff5d6c' }, { label: 'Shroud banked for the dive', tone: '#9b8cff' }, { label: 'Energy above 100', tone: '#46c6f5' }, { label: 'E return path planned', tone: '#e8b84b' }],
    teamPositioning: ['One carry per fight \u2014 that\u2019s the contract.', 'Shroud ON the fight, not behind it.', 'R1 is travel, R2 is the verdict \u2014 space them.', 'Leave through the E return, not the front door.'],
    teamFlank: ['Hover fog until their CC shows elsewhere.', 'R through the front line onto the carry.', 'Shroud the peel, finish, E out.', 'Reset and audit the next health bar.']
  },
  Akshan: {
    dataKey: 'akshan_mid', sub: 'Marksman-Assassin \u00b7 Swing & Strings \u00b7 Rogue Sentinel', label: '#f0c88f', tint: 'rgba(230,180,110,0.5)',
    classLabel: 'Marksman-Assassin', winStyle: 'Strings / Execute', ultVerdict: 'COMEUPPANCE',
    lateSwing: 'Late Akshan flanks on a rope \u2014 swing behind the fight, string the carry, execute the runners.', spikeLine: 'First crit item online \u2014 swing-autos shred.',
    spikeItem: 'First item spike \u2014 force extended trades the shield wins.', lvl6Spike: 'Comeuppance online \u2014 chip, then channel; the execute travels two screens.',
    fbVerb: 'string the three-hit trade and vanish', fbAction: 'kite the approach and swing out of the arrival', fbDo: 'Three-hit strings or nothing \u2014 half trades waste the passive', dosTail: 'The swing is your entrance AND your exit \u2014 never spend both directions in one play.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Noonquiver piece'],
    buildCore: ['Berserker\u2019s Greaves', 'Kraken Slayer / Stormrazor', 'Infinity Edge path'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Avengerang', note: 'Max 1st \u00b7 double-pass poke' },
      { k: 'W', color: '#9b8cff', label: 'Going Rogue', note: 'Max last \u00b7 camouflage + scoundrels' },
      { k: 'E', color: '#e8b84b', label: 'Heroic Swing', note: 'Max 2nd \u00b7 the rope' },
      { k: 'R', color: '#ff5d6c', label: 'Comeuppance', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'String Trade', keys: ['AA', 'Q', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'Wave contact: auto-Q-auto so the boomerang double-passes \u2014 three-hit math.' },
      { name: 'Swing Strike', keys: ['E', 'AA', 'Q'], tone: '#e8b84b', tier: 'Kill', when: 'He\u2019s chipped: swing the wall, autos rain mid-arc, Q the landing.' },
      { name: 'Vanish Reset', keys: ['W'], tone: '#9b8cff', tier: 'Utility', when: 'Between trades: camouflage resets the exchange and the map\u2019s information.' },
      { name: 'The Sentence', keys: ['R'], tone: '#ff5d6c', tier: 'Execute', when: 'Anyone under a third in two screens: channel the comeuppance and collect.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights from the rope \u2014 swing behind their line, string the carry, and execute whatever flees the scene.',
    teamLookFor: [{ label: 'A wall to swing the flank', tone: '#e8b84b' }, { label: 'Chipped targets for R', tone: '#ff5d6c' }, { label: 'Three-hit strings landing', tone: '#46c6f5' }, { label: 'Camouflage reset planned', tone: '#9b8cff' }],
    teamPositioning: ['Fight at max auto range \u2014 the rope handles the rest.', 'Swing behind, never through.', 'Execute the runners \u2014 R travels farther than they do.', 'Keep one wall between you and their answer.'],
    teamFlank: ['Camouflage the approach via jungle walls.', 'Swing the arc \u2014 autos rain mid-flight.', 'String the carry on landing.', 'Swing back out before the peel votes.']
  },
  Diana: {
    dataKey: 'diana_mid', sub: 'Assassin \u00b7 Moonfall Dive \u00b7 Scorn of the Moon', label: '#c0c8f0', tint: 'rgba(160,170,230,0.5)',
    classLabel: 'Assassin', winStyle: 'Dive / Pull', ultVerdict: 'MOONFALL',
    lateSwing: 'Late Diana dives \u2014 E the carry through the front line, R the collapse, reset through the wreckage.', spikeLine: 'First item online \u2014 mark-dash phases become deletions.',
    spikeItem: 'First item spike \u2014 chain the reset phases.', lvl6Spike: 'Moonfall online \u2014 any clumped trade is your fight; with jungle help it\u2019s a flip.',
    fbVerb: 'mark-dash the phase and string the kill', fbAction: 'shield the rotation and dash the silence', fbDo: 'Dash only onto marked targets \u2014 the reset is the kit', dosTail: 'Your W is the trade \u2014 entering without orbs is volunteering for his combo at melee range.',
    buildStart: ['Doran\u2019s Shield + Health Potion', 'Hextech Alternator'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Stormsurge / Riftmaker', 'Zhonya\u2019s Hourglass'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Crescent Strike', note: 'Max 1st \u00b7 the mark' },
      { k: 'W', color: '#9b8cff', label: 'Pale Cascade', note: 'Max 2nd \u00b7 orb shield' },
      { k: 'E', color: '#e8b84b', label: 'Lunar Rush', note: 'Max last \u00b7 reset dash' },
      { k: 'R', color: '#ff5d6c', label: 'Moonfall', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Phase Trade', keys: ['Q', 'E', 'AA', 'W'], tone: '#46c6f5', tier: 'Trade', when: 'Crescent lands: dash the mark, three-hit string, shield as you walk out.' },
      { name: 'Moonfall Flip', keys: ['Q', 'E', 'R'], tone: '#ff5d6c', tier: 'Kill', when: 'He clumps or commits: mark, dash, pull the formation into your passive arc.' },
      { name: 'Shield Trade', keys: ['W', 'AA'], tone: '#9b8cff', tier: 'Defensive', when: 'His poke window: orbs absorb, passive pays it back on the third hit.' },
      { name: 'Reset Chain', keys: ['E', 'Q', 'E'], tone: '#e8b84b', tier: 'Chase', when: 'Mark refreshes mid-fight: the dash resets \u2014 chain through the wave to the kill.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights with the pull \u2014 dash through the front line, Moonfall the clump, and let your team convert the formation you broke.',
    teamLookFor: [{ label: 'A clump for Moonfall', tone: '#ff5d6c' }, { label: 'Marks to dash-chain', tone: '#46c6f5' }, { label: 'W orbs for the dive', tone: '#9b8cff' }, { label: 'Reset path through the wave', tone: '#e8b84b' }],
    teamPositioning: ['Dive on marks, not on faith.', 'Pull the clump, not the tank.', 'Shield as you enter \u2014 the orbs are the trade.', 'Zhonya\u2019s after the pull turns the dive into a siege.'],
    teamFlank: ['Hover the flank until their CC shows.', 'Q-E through the side door.', 'Moonfall the collapse your entry caused.', 'Reset out through the marked survivors.']
  },
  Ekko: {
    dataKey: 'ekko_mid', sub: 'Assassin \u00b7 Rewind Burst \u00b7 Boy Who Shattered Time', label: '#8fe0e0', tint: 'rgba(110,200,200,0.5)',
    classLabel: 'Assassin', winStyle: 'Strings / Rewind', ultVerdict: 'CHRONOBREAK',
    lateSwing: 'Late Ekko picks and survives \u2014 dive the carry, W the peel, rewind out of the answer.', spikeLine: 'First item online \u2014 strings delete half bars.',
    spikeItem: 'First item spike \u2014 trade like the rewind exists.', lvl6Spike: 'Chronobreak online \u2014 your aggression gets a save file.',
    fbVerb: 'string the window and rewind the rebuttal', fbAction: 'pre-place W and string the cooldown gap', fbDo: 'String with E available, dive with R available \u2014 never neither', dosTail: 'The rewind heals off the hologram\u2019s path \u2014 diving away from your own past is how Ekkos die with R up.',
    buildStart: ['Doran\u2019s Shield + Health Potion', 'Hextech Alternator'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Rocketbelt / Stormsurge', 'Zhonya\u2019s / Lich Bane'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Timewinder', note: 'Max 1st \u00b7 double-pass disc' },
      { k: 'W', color: '#9b8cff', label: 'Parallel Convergence', note: 'Max last \u00b7 prophecy stun' },
      { k: 'E', color: '#e8b84b', label: 'Phase Dive', note: 'Max 2nd \u00b7 blink strike' },
      { k: 'R', color: '#ff5d6c', label: 'Chronobreak', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Three-Hit String', keys: ['Q', 'E', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'Wave contact: Q through, blink the gap, passive third hit, walk through the slow.' },
      { name: 'Prophecy Stun', keys: ['W', 'E', 'Q'], tone: '#9b8cff', tier: 'Kill', when: 'Pre-place W on his line: blink in as it arms \u2014 shield up, stun lands, string follows.' },
      { name: 'Insured Dive', keys: ['E', 'Q', 'R'], tone: '#ff5d6c', tier: 'All-in', when: 'Deep trade: string the carry and rewind through the answer with the kill banked.' },
      { name: 'The Undo', keys: ['R'], tone: '#e8b84b', tier: 'Defensive', when: 'It went wrong: rewind to four seconds ago, heal, and reconsider from the hologram.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights twice \u2014 the dive that lands, or the rewind that erases the one that didn\u2019t; either way the carry pays.',
    teamLookFor: [{ label: 'Their carry in string range', tone: '#ff5d6c' }, { label: 'Hologram path safe', tone: '#e8b84b' }, { label: 'W zone on their choke', tone: '#9b8cff' }, { label: 'R banked before the dive', tone: '#46c6f5' }],
    teamPositioning: ['Dive toward your hologram, never away.', 'W the choke before the fight crosses it.', 'String the carry, rewind the receipt.', 'The R is a weapon \u2014 not an apology.'],
    teamFlank: ['Loop so the hologram trails through safety.', 'W the flank choke pre-fight.', 'String the backline as the stun arms.', 'Chronobreak home through the panic.']
  },
  Fizz: {
    dataKey: 'fizz_mid', sub: 'Assassin \u00b7 Untargetable Burst \u00b7 Tidal Trickster', label: '#8fc8f0', tint: 'rgba(110,180,230,0.5)',
    classLabel: 'Assassin', winStyle: 'Dive / Pole Dodge', ultVerdict: 'CHUM THE WATERS',
    lateSwing: 'Late Fizz erases one carry per fight \u2014 shark the entry, string the target, pole the response.', spikeLine: 'First item online \u2014 the string one-shots squishies who eat the shark.',
    spikeItem: 'First item spike \u2014 fish aggressively.', lvl6Spike: 'Chum the Waters online \u2014 the shark plus string deletes most mids from 70%.',
    fbVerb: 'string him in the cooldown silence', fbAction: 'bait the rotation and pole it entirely', fbDo: 'Pole his answer, not your entrance \u2014 the E is your dodge first', dosTail: 'The trickster who hops first gets audited \u2014 commit second in every standoff and swim home famous.',
    buildStart: ['Doran\u2019s Shield + Health Potion', 'Hextech Alternator'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Stormsurge / Rocketbelt', 'Zhonya\u2019s / Rabadon\u2019s path'],
    skillSeq: ['W', 'E', 'Q', 'W', 'W', 'R', 'W', 'E', 'W', 'E', 'R', 'E', 'E', 'Q', 'Q', 'R', 'Q', 'Q'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Urchin Strike', note: 'Max last \u00b7 the commit dash' },
      { k: 'W', color: '#9b8cff', label: 'Seastone Trident', note: 'Max 1st \u00b7 bleed rider' },
      { k: 'E', color: '#e8b84b', label: 'Playful / Trickster', note: 'Max 2nd \u00b7 the pole' },
      { k: 'R', color: '#ff5d6c', label: 'Chum the Waters', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Fish Trade', keys: ['Q', 'W', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'His cooldown gap: dash through, bleed, walk out through the wave only you can walk through.' },
      { name: 'Pole Dodge', keys: ['E'], tone: '#e8b84b', tier: 'Defensive', when: 'His combo flies: hop it entirely \u2014 untargetable beats well-aimed.' },
      { name: 'Shark String', keys: ['R', 'Q', 'E', 'W'], tone: '#ff5d6c', tier: 'Kill', when: 'Shark lands: dash the knockup, pole-slam the landing, bleed the remainder.' },
      { name: 'Bait & Switch', keys: ['Q', 'E', 'W'], tone: '#9b8cff', tier: 'Outplay', when: 'He holds the answer: Q-feint draws it, pole the cast, string the silence.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights one shark at a time \u2014 R the entry, string the catch, pole their answer, and swim out of the obituary.',
    teamLookFor: [{ label: 'A carry for the shark', tone: '#ff5d6c' }, { label: 'Pole banked for their CC', tone: '#e8b84b' }, { label: 'Their interrupt spent', tone: '#46c6f5' }, { label: 'Exit current planned', tone: '#9b8cff' }],
    teamPositioning: ['Shark from fog \u2014 a seen fish is a dodged fish.', 'Pole their answer, not your entrance.', 'One carry per fight \u2014 then swim.', 'Enter second; the first fish feeds the CC.'],
    teamFlank: ['Hover fog with the shark loaded.', 'R the backline\u2019s anchor target.', 'Dash-string the knockup landing.', 'Pole the response and swim home.']
  },
  Kassadin: {
    dataKey: 'kassadin_mid', sub: 'Assassin \u00b7 Void Scale \u00b7 Walker', label: '#b08fe8', tint: 'rgba(150,110,220,0.5)',
    classLabel: 'Assassin', winStyle: 'Scale / Blink Burst', ultVerdict: 'RIFTWALK',
    lateSwing: 'Level 16 Kassadin IS the late game \u2014 blink every two seconds and silence every carry.', spikeLine: 'RoA online \u2014 blink-strings start collecting the lane\u2019s debts.',
    spikeItem: 'RoA spike \u2014 take the trades you spent five levels refusing.', lvl6Spike: 'Riftwalk online \u2014 the map shrinks and the lane tax ends.',
    fbVerb: 'blink-string his cooldown gaps', fbAction: 'shield his centerpiece and farm the clock', fbDo: 'Shield the centerpiece spell \u2014 the passive is the matchup pre-6', dosTail: 'Riftwalk stacks double the cost \u2014 the panic-blink chain that saves you now is the mana bar that loses the next fight.',
    buildStart: ['Doran\u2019s Shield + Health Potion', 'Catalyst of Aeons'],
    buildCore: ['Sorcerer\u2019s Shoes / Mercs', 'Rod of Ages', 'Seraph\u2019s Embrace'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Null Sphere', note: 'Max 1st \u00b7 shield + nuke' },
      { k: 'W', color: '#9b8cff', label: 'Nether Blade', note: 'Max last \u00b7 mana refund' },
      { k: 'E', color: '#e8b84b', label: 'Force Pulse', note: 'Max 2nd \u00b7 the slow wave' },
      { k: 'R', color: '#ff5d6c', label: 'Riftwalk', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Shield Farm', keys: ['Q', 'W'], tone: '#46c6f5', tier: 'Safe', when: 'Pre-6: Q-shield his poke, W-refund the last hit \u2014 the survival economy.' },
      { name: 'Blink String', keys: ['R', 'Q', 'E', 'W'], tone: '#ff5d6c', tier: 'Kill', when: 'Post-items: blink the gap, silence-nuke, slow the retreat, refund the exit.' },
      { name: 'The Exit', keys: ['R'], tone: '#9b8cff', tier: 'Defensive', when: 'Gank or all-in: one blink crosses the wall their plan didn\u2019t include.' },
      { name: 'Endgame Loop', keys: ['R', 'E', 'Q'], tone: '#e8b84b', tier: 'Teamfight', when: 'Level 16: blink-slow-silence every two seconds until their backline retires.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights by arithmetic nobody can cancel \u2014 blink through their team every two seconds, silence the carries, and collect the game your laning pre-paid.',
    teamLookFor: [{ label: 'R stacks cheap', tone: '#ff5d6c' }, { label: 'Their carries silenceable', tone: '#46c6f5' }, { label: 'Mana bar above half', tone: '#9b8cff' }, { label: 'Level 16 reached', tone: '#e8b84b' }],
    teamPositioning: ['Blink in on cooldown gaps, out on stack debt.', 'Silence the caster carry first.', 'Mana is stacks is power \u2014 guard the bar.', 'Until 16 you are a promise; after, a verdict.'],
    teamFlank: ['Hover the side fog \u2014 one blink is a flank.', 'Riftwalk onto the backline\u2019s caster.', 'Q-silence, E-slow, W-refund.', 'Blink out before the stack debt compounds.']
  },
  Katarina: {
    dataKey: 'katarina_mid', sub: 'Assassin \u00b7 Reset Blender \u00b7 Sinister Blade', label: '#f08f8f', tint: 'rgba(230,110,110,0.5)',
    classLabel: 'Assassin', winStyle: 'Resets / Daggers', ultVerdict: 'DEATH LOTUS',
    lateSwing: 'Late Kata is a chain reaction \u2014 enter on daggers, lotus the clump, reset through the wreckage.', spikeLine: 'First item online \u2014 dagger strings delete and one kill opens the chain.',
    spikeItem: 'First item spike \u2014 hunt the 2v2 skirmishes.', lvl6Spike: 'Death Lotus online \u2014 any 2v2 near your daggers is a blender invoice.',
    fbVerb: 'blend the window his CC just left', fbAction: 'bait his answer and route through daggers', fbDo: 'Blink to daggers, not faces \u2014 the steel is the champion', dosTail: 'Count their interrupts before every lotus \u2014 the spin dies to one button and everyone holding one knows it.',
    buildStart: ['Doran\u2019s Shield + Health Potion', 'Hextech Alternator'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Stormsurge / Nashor\u2019s line', 'Zhonya\u2019s Hourglass'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Bouncing Blade', note: 'Max 1st \u00b7 dagger seed' },
      { k: 'W', color: '#9b8cff', label: 'Preparation', note: 'Max 2nd \u00b7 self-dagger + speed' },
      { k: 'E', color: '#e8b84b', label: 'Shunpo', note: 'Max last \u00b7 the blink economy' },
      { k: 'R', color: '#ff5d6c', label: 'Death Lotus', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Dagger Trade', keys: ['Q', 'E', 'W', 'E'], tone: '#46c6f5', tier: 'Trade', when: 'Q bounces, blink the landed dagger, W-spin, blink out on the second pickup.' },
      { name: 'The Blender', keys: ['E', 'W', 'R'], tone: '#ff5d6c', tier: 'Kill', when: 'His CC is down: blink in, dagger drop, lotus the locked window.' },
      { name: 'Reset Chain', keys: ['R', 'E', 'Q'], tone: '#e8b84b', tier: 'Teamfight', when: 'First kill lands: cooldowns refresh \u2014 blink the next dagger and re-blend.' },
      { name: 'Steel Exit', keys: ['W', 'E'], tone: '#9b8cff', tier: 'Escape', when: 'Collapse arrives: self-dagger behind, blink to it, walk out with the speed.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights as a chain reaction \u2014 enter on steel, lotus the clump, and reset through each kill until the fight runs out of participants.',
    teamLookFor: [{ label: 'Their interrupts spent', tone: '#ff5d6c' }, { label: 'Daggers banked at the choke', tone: '#46c6f5' }, { label: 'A 2v2 to convert', tone: '#e8b84b' }, { label: 'Reset targets low', tone: '#9b8cff' }],
    teamPositioning: ['Count interrupts, then spin \u2014 in that order.', 'Enter on daggers, never on faith.', 'The first kill is the fight \u2014 chase the domino.', 'Zhonya\u2019s mid-lotus is a war crime; commit it.'],
    teamFlank: ['Bank daggers on the flank choke pre-fight.', 'Blink the steel behind their backline.', 'Lotus when their CC shows elsewhere.', 'Reset through the kill and re-enter.']
  }
});

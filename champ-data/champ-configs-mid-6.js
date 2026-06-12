// MatchupCoach — CHAMPS engine configs for MID: Assassins (2/2).
window.CHAMP_CONFIGS_MID = Object.assign(window.CHAMP_CONFIGS_MID || {}, {
  LeBlanc: {
    dataKey: 'leblanc_mid', sub: 'Assassin \u00b7 Burst & Vanish \u00b7 Deceiver', label: '#d8a8e8', tint: 'rgba(200,150,220,0.5)',
    classLabel: 'Assassin', winStyle: 'Round-Trip Burst', ultVerdict: 'MIMIC',
    lateSwing: 'Late LeBlanc picks \u2014 W the flank, chain the carry, mimic the exit before the obituary prints.', spikeLine: 'First item online \u2014 Q-W-RW deletes squishies.',
    spikeItem: 'First item spike \u2014 spend the lead before it expires.', lvl6Spike: 'Mimic online \u2014 the double-dash crosses the lane and the burst doubles.',
    fbVerb: 'double-proc the sigil and return', fbAction: 'bait his centerpiece and chain the silence', fbDo: 'Never throw Q without the detonation plan \u2014 the sigil is half the champion', dosTail: 'The W return is your life \u2014 greed that outlives the timer is the only way this champion dies in lane.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Hextech Alternator'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Stormsurge / Luden\u2019s', 'Shadowflame'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Sigil of Malice', note: 'Max 1st \u00b7 mark + detonate' },
      { k: 'W', color: '#9b8cff', label: 'Distortion', note: 'Max 2nd \u00b7 the round trip' },
      { k: 'E', color: '#e8b84b', label: 'Ethereal Chains', note: 'Max last \u00b7 tether root' },
      { k: 'R', color: '#ff5d6c', label: 'Mimic', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Round Trip', keys: ['Q', 'W', 'W'], tone: '#46c6f5', tier: 'Trade', when: 'Wave contact: sigil, W-detonate, return before his answer loads.' },
      { name: 'Chain Hold', keys: ['Q', 'E', 'W'], tone: '#e8b84b', tier: 'Pick', when: 'One tether window per wave: mark, chain, dash the detonation as the root locks.' },
      { name: 'Full Deletion', keys: ['Q', 'W', 'R', 'W'], tone: '#ff5d6c', tier: 'Kill', when: 'Post-6 half-bars: sigil, W, mimic-W double detonation \u2014 return with the receipt.' },
      { name: 'The Vanish', keys: ['W', 'R'], tone: '#9b8cff', tier: 'Escape', when: 'Collapse arrives: W out, mimic-W farther \u2014 two dashes write a forwarding address.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights as a rumor \u2014 W the flank, chain the carry, double-detonate, and return before their team agrees you were there.',
    teamLookFor: [{ label: 'Their carry chainable', tone: '#e8b84b' }, { label: 'Return timer scheduled', tone: '#9b8cff' }, { label: 'Centerpiece spells down', tone: '#46c6f5' }, { label: 'Mimic banked for the exit', tone: '#ff5d6c' }],
    teamPositioning: ['One pick per fight \u2014 then leave on the timer.', 'Chain the carry, never the front line.', 'The return is the plan \u2014 greed is the obituary.', 'Sell the clone story once per fight, maximum.'],
    teamFlank: ['W the side angle their wards skipped.', 'Q-chain the backline\u2019s anchor.', 'Double-detonate and turn on the timer.', 'Return through the after-image\u2019s alibi.']
  },
  Naafiri: {
    dataKey: 'naafiri_mid', sub: 'Assassin \u00b7 Packhunter \u00b7 Hound of a Hundred Bites', label: '#e8a88f', tint: 'rgba(220,150,110,0.5)',
    classLabel: 'Assassin', winStyle: 'Pack Dive', ultVerdict: 'THE CALL OF THE PACK',
    lateSwing: 'Late Naafiri flanks with a head count \u2014 R the sweep, W the carry, and the pack votes on the peel.', spikeLine: 'First item online \u2014 W dives plus the pack delete squishies.',
    spikeItem: 'First item spike \u2014 hunt the half-bars.', lvl6Spike: 'The Call online \u2014 every roam is a scheduled accident for a side lane.',
    fbVerb: 'dive the silence with the pack piling', fbAction: 'screen his lines with hounds and bleed the contact', fbDo: 'Trade where the dogs can pile \u2014 alone you\u2019re half a champion', dosTail: 'The W locks its path on cast \u2014 diving into held CC donates the whole pack to one button.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Serrated Dirk'],
    buildCore: ['Ionian Lucidity', 'Eclipse / Profane Hydra', 'Serylda\u2019s path'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Darkin Daggers', note: 'Max 1st \u00b7 bleed-consume' },
      { k: 'W', color: '#9b8cff', label: 'Hounds\u2019 Pursuit', note: 'Max 2nd \u00b7 the pack dive' },
      { k: 'E', color: '#e8b84b', label: 'Eviscerate', note: 'Max last \u00b7 dash + pack heal' },
      { k: 'R', color: '#ff5d6c', label: 'The Call of the Pack', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Bleed Consume', keys: ['Q', 'Q', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'Wave contact: first Q bleeds, second consumes \u2014 the double dagger chunks early.' },
      { name: 'Pack Dive', keys: ['W', 'Q', 'E'], tone: '#ff5d6c', tier: 'Kill', when: 'His answer is down: lock-on dive, daggers on arrival, E through with the pile.' },
      { name: 'Sustain Pass', keys: ['Q', 'E'], tone: '#e8b84b', tier: 'Sustain', when: 'Even trades: the E heal per hound hit pays the toll your bleed collected.' },
      { name: 'The Hunt', keys: ['R', 'W', 'Q'], tone: '#9b8cff', tier: 'Roam', when: 'Wave crashed: R sweeps the fog, W reaches the target, the pack ends the meeting.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights by head count \u2014 R the approach, W through the front line, and let six bodies argue with their peel.',
    teamLookFor: [{ label: 'R sweep before the flank', tone: '#9b8cff' }, { label: 'Pack alive for the dive', tone: '#ff5d6c' }, { label: 'Their CC spent elsewhere', tone: '#46c6f5' }, { label: 'E heal banked for the exit', tone: '#e8b84b' }],
    teamPositioning: ['Dive with the pack, never ahead of it.', 'Sweep first \u2014 the R is your vision lead.', 'The carry, not the tank \u2014 dogs don\u2019t chew armor.', 'E out through the pile when the peel votes.'],
    teamFlank: ['R flares \u2014 read the sweep before committing.', 'W the carry from the side fog.', 'Daggers and dogs on arrival.', 'E through the wreckage and regroup the pack.']
  },
  Qiyana: {
    dataKey: 'qiyana_mid', sub: 'Assassin \u00b7 Element Burst \u00b7 Empress of the Elements', label: '#e8d08f', tint: 'rgba(220,190,110,0.5)',
    classLabel: 'Assassin', winStyle: 'Terrain / Burst', ultVerdict: 'SUPREME DISPLAY OF TALENT',
    lateSwing: 'Late Qiyana owns the pits \u2014 R the wall, string the stunned line, grass-vanish the response.', spikeLine: 'First item online \u2014 element strings delete squishies near any wall.',
    spikeItem: 'First item spike \u2014 force the brush-line fights.', lvl6Spike: 'Supreme Display online \u2014 any fight near terrain is a stun lottery you rigged.',
    fbVerb: 'string him through the loaded element', fbAction: 'root the answer with ice and execute with rock', fbDo: 'Element before engagement \u2014 the loaded W is the plan', dosTail: 'Your E sticks to its chosen target \u2014 dashing onto a held stun is a subpoena you served yourself.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Serrated Dirk'],
    buildCore: ['Ionian Lucidity', 'Eclipse / Profane Hydra', 'Serylda\u2019s path'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Edge of Ixtal', note: 'Max 1st \u00b7 element blade' },
      { k: 'W', color: '#9b8cff', label: 'Terrashape', note: 'Max 2nd \u00b7 element economy' },
      { k: 'E', color: '#e8b84b', label: 'Audacity', note: 'Max last \u00b7 stick dash' },
      { k: 'R', color: '#ff5d6c', label: 'Supreme Display', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Grass Ambush', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Poke', when: 'From the brush line: stealth-empowered Q chunks before his aim exists.' },
      { name: 'Ice String', keys: ['E', 'Q', 'AA'], tone: '#e8b84b', tier: 'Kill', when: 'Real window: stick-dash, ice-Q roots, auto \u2014 the held target eats the full string.' },
      { name: 'Rock Receipt', keys: ['W', 'Q'], tone: '#9b8cff', tier: 'Execute', when: 'Sub-half target: rock-empowered Q executes through the panic.' },
      { name: 'Wall Verdict', keys: ['R', 'E', 'Q'], tone: '#ff5d6c', tier: 'Teamfight', when: 'Fight near terrain: shockwave the wall, string the stunned line.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights at the wall \u2014 R the pit\u2019s terrain, string the stunned line, and grass-vanish before the response compiles.',
    teamLookFor: [{ label: 'A wall for the R', tone: '#ff5d6c' }, { label: 'Right element loaded', tone: '#9b8cff' }, { label: 'Brush angles to the carry', tone: '#46c6f5' }, { label: 'Ice banked for the peel', tone: '#e8b84b' }],
    teamPositioning: ['Fight where the floor helps \u2014 pits are venues.', 'R the wall, not the champion.', 'Grass for the approach, ice for the catch, rock for the kill.', 'Vanish after the string \u2014 encores get audited.'],
    teamFlank: ['Grass-route the flank through the hedge line.', 'R the terrain their backline hugs.', 'String the stunned from the smoke.', 'Re-stealth through the next brush home.']
  },
  Sylas: {
    dataKey: 'sylas_mid', sub: 'Assassin-Bruiser \u00b7 Hijack \u00b7 Unshackled', label: '#79c8d4', tint: 'rgba(90,180,200,0.5)',
    classLabel: 'Skirmisher', winStyle: 'Brawl / Hijack', ultVerdict: 'HIJACK',
    lateSwing: 'Late Sylas shops the enemy team \u2014 steal the fight-flipper, flank with it, heal through the refund.', spikeLine: 'Riftmaker online \u2014 full chains with a stolen ult out-brawl anything mid.',
    spikeItem: 'Riftmaker spike \u2014 force extended trades.', lvl6Spike: 'Hijack online \u2014 his best button is now on your hotbar.',
    fbVerb: 'out-brawl him with chains and whirls', fbAction: 'shield the opener and chain the silence', fbDo: 'Shop before you fight \u2014 the steal IS the game plan', dosTail: 'Your W heals double when wounded \u2014 burning it at full HP is paying retail for a clearance kit.',
    buildStart: ['Doran\u2019s Shield + Health Potion', 'Hextech Alternator'],
    buildCore: ['Mercury\u2019s Treads / Sorcerer\u2019s', 'Riftmaker', 'Zhonya\u2019s / Cosmic Drive'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Chain Lash', note: 'Max 1st \u00b7 detonation poke' },
      { k: 'W', color: '#9b8cff', label: 'Kingslayer', note: 'Max 2nd \u00b7 burst + wounded heal' },
      { k: 'E', color: '#e8b84b', label: 'Abscond / Abduct', note: 'Max last \u00b7 shield-dash + chain' },
      { k: 'R', color: '#ff5d6c', label: 'Hijack', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Full Chain', keys: ['E', 'E', 'Q', 'W'], tone: '#e8b84b', tier: 'Kill', when: 'Dash, chain-stun, Q the landing, W the chunk \u2014 whirl passive autos between each cast.' },
      { name: 'Shield Trade', keys: ['E', 'Q', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'E1 shield through his poke, Q the step-up, auto, and walk before his answer.' },
      { name: 'Kingslayer Heal', keys: ['W'], tone: '#9b8cff', tier: 'Defensive', when: 'Below half: W the lowest target \u2014 the heal doubles when you\u2019re wounded.' },
      { name: 'Hijack Play', keys: ['R', 'E', 'W'], tone: '#ff5d6c', tier: 'Steal', when: 'Steal the fight-flipper pre-fight, open with it, chain your own kit behind it.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights with their best button \u2014 steal the teamfight R, flank with chain-stun delivery, and heal through the answer.',
    teamLookFor: [{ label: 'The best R to steal', tone: '#ff5d6c' }, { label: 'Their carry chainable', tone: '#e8b84b' }, { label: 'E chain up to engage', tone: '#46c6f5' }, { label: 'W banked for the wounded heal', tone: '#9b8cff' }],
    teamPositioning: ['Shop the steal before the fight starts.', 'Open with the borrowed R \u2014 it\u2019s your best card.', 'Whirl between every cast \u2014 the passive is half the brawl.', 'Heal wounded, not whole.'],
    teamFlank: ['Loop wide and E2 onto their carry.', 'Open with the stolen teamfight button.', 'Chain Q-W with whirls to finish.', 'Shield-dash out through the hole it made.']
  },
  Talon: {
    dataKey: 'talon_mid', sub: 'Assassin \u00b7 Parkour & Bleed \u00b7 Blade\u2019s Shadow', label: '#c8a8f0', tint: 'rgba(170,150,220,0.5)',
    classLabel: 'Assassin', winStyle: 'Roam / Bleed Burst', ultVerdict: 'SHADOW ASSAULT',
    lateSwing: 'Late Talon flanks from unwarded coordinates \u2014 R in, string the carry, blade-exit through the wall.', spikeLine: 'First item online \u2014 the full string one-rotations squishies.',
    spikeItem: 'First item spike \u2014 shove and parkour; side lanes owe taxes.', lvl6Spike: 'Shadow Assault online \u2014 the roam game doubles and the all-in wraps targets in blades.',
    fbVerb: 'string the bleed and exit through geometry', fbAction: 'rake the contact and leap the silence', fbDo: 'Stand where the rake\u2019s return doubles \u2014 geometry is the poke', dosTail: 'Each wall\u2019s parkour has its own cooldown \u2014 the exit you used entering is the exit you don\u2019t have leaving.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Serrated Dirk'],
    buildCore: ['Ionian Lucidity', 'Profane Hydra / Eclipse', 'Serylda\u2019s path'],
    skillSeq: ['W', 'Q', 'E', 'W', 'W', 'R', 'W', 'Q', 'W', 'Q', 'R', 'Q', 'Q', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Noxian Diplomacy', note: 'Max 2nd \u00b7 leap / crit stab' },
      { k: 'W', color: '#9b8cff', label: 'Rake', note: 'Max 1st \u00b7 the return pass' },
      { k: 'E', color: '#e8b84b', label: 'Assassin\u2019s Path', note: 'Max last \u00b7 the parkour' },
      { k: 'R', color: '#ff5d6c', label: 'Shadow Assault', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Rake Trade', keys: ['W', 'AA'], tone: '#9b8cff', tier: 'Poke', when: 'Wave contact: rake both passes through his chest \u2014 the return is the damage.' },
      { name: 'Bleed String', keys: ['W', 'Q', 'AA'], tone: '#46c6f5', tier: 'Kill', when: 'Three-stack window: rake, leap, auto \u2014 the bleed procs and the math follows.' },
      { name: 'Full Assault', keys: ['R', 'Q', 'W', 'AA'], tone: '#ff5d6c', tier: 'All-in', when: 'His answer is down: vanish in, string the blades through, converge the exit.' },
      { name: 'Wall Tax', keys: ['E'], tone: '#e8b84b', tier: 'Roam', when: 'Wave crashed: parkour the border wall \u2014 your gank arrives before the ping does.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights from coordinates wards don\u2019t cover \u2014 parkour the flank, R onto the carry, and exit through the wall that brought you.',
    teamLookFor: [{ label: 'An unwarded wall to flank', tone: '#e8b84b' }, { label: 'Their carry at string range', tone: '#ff5d6c' }, { label: 'Bleed stacks pre-loaded', tone: '#46c6f5' }, { label: 'R blades for the exit', tone: '#9b8cff' }],
    teamPositioning: ['Arrive through walls, leave through walls.', 'String the carry \u2014 the bleed does the chasing.', 'R in is also R out \u2014 the blades return.', 'The map is your ward coverage; spend it.'],
    teamFlank: ['Parkour the back wall their trinkets skipped.', 'R-vanish the final approach.', 'String the backline\u2019s anchor target.', 'Converge the blades and parkour home.']
  },
  Zed: {
    dataKey: 'zed_mid', sub: 'Assassin \u00b7 Shadow Execute \u00b7 Master of Shadows', label: '#a8a8b8', tint: 'rgba(140,140,160,0.5)',
    classLabel: 'Assassin', winStyle: 'Poke / Death Mark', ultVerdict: 'DEATH MARK',
    lateSwing: 'Late Zed serves subpoenas \u2014 mark the carry, swap through the peel, let the death note collect.', spikeLine: 'First item online \u2014 R-strings delete squishies through pots.',
    spikeItem: 'First item spike \u2014 hunt the chip thresholds.', lvl6Spike: 'Death Mark online \u2014 anyone below 60% is a three-second math problem.',
    fbVerb: 'scissor the chip war and mark the threshold', fbAction: 'swap out of his setup and string the silence', fbDo: 'Chip to 60% before any mark \u2014 the R is a calculator, not a coin', dosTail: 'The shadow swap is your only defense \u2014 both shadows spent entering is a cinematic with no second act.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Serrated Dirk'],
    buildCore: ['Ionian Lucidity', 'Profane Hydra / Eclipse', 'Serylda\u2019s / Axiom Arc'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Razor Shuriken', note: 'Max 1st \u00b7 the scissors' },
      { k: 'W', color: '#9b8cff', label: 'Living Shadow', note: 'Max last \u00b7 swap + angles' },
      { k: 'E', color: '#e8b84b', label: 'Shadow Slash', note: 'Max 2nd \u00b7 slow + shred' },
      { k: 'R', color: '#ff5d6c', label: 'Death Mark', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Scissor Poke', keys: ['W', 'E', 'Q'], tone: '#46c6f5', tier: 'Poke', when: 'Energy banked: shadow wide, slow, double-shuriken the scissor \u2014 half a bar of geometry.' },
      { name: 'Threshold Check', keys: ['Q', 'AA'], tone: '#9b8cff', tier: 'Chip', when: 'Between windows: thread Qs through wave gaps \u2014 accuracy is your mana bar.' },
      { name: 'Death Sentence', keys: ['R', 'E', 'Q', 'AA'], tone: '#ff5d6c', tier: 'Kill', when: 'He\u2019s under 60%: mark, slow, scissor, autos \u2014 the pop does the remainder.' },
      { name: 'The Swap', keys: ['W'], tone: '#e8b84b', tier: 'Defensive', when: 'His combo or the gank arrives: swap to the shadow their plan didn\u2019t include.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights by subpoena \u2014 mark the priority carry, swap through the peel, and let the death note argue with their items.',
    teamLookFor: [{ label: 'Their carry under 60%', tone: '#ff5d6c' }, { label: 'Their stopwatch spent', tone: '#46c6f5' }, { label: 'Swap banked for the answer', tone: '#9b8cff' }, { label: 'Scissor angles open', tone: '#e8b84b' }],
    teamPositioning: ['Mark the math, not the montage.', 'Save the swap for their answer \u2014 always.', 'Scissor the chip war before the R war.', 'Track Zhonya\u2019s like a summoner spell.'],
    teamFlank: ['Shadow the flank angle pre-fight.', 'Mark the carry as their CC shows elsewhere.', 'E-Q the slow, autos through the pop.', 'Swap home through the shadow you parked.']
  }
});

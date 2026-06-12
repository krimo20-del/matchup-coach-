// MatchupCoach — CHAMPS engine configs for MID: Control & Battlemages (1/2).
// Merged into the app via window.CHAMP_CONFIGS_MID (role-aware lookup).
window.CHAMP_CONFIGS_MID = Object.assign(window.CHAMP_CONFIGS_MID || {}, {
  Anivia: {
    dataKey: 'anivia_mid', sub: 'Battlemage \u00b7 Zone Control \u00b7 Egg', label: '#9fd8f0', tint: 'rgba(110,190,230,0.5)',
    classLabel: 'Battlemage', winStyle: 'Zone / Stun Chain', ultVerdict: 'GLACIAL STORM',
    lateSwing: 'Your storm + wall own every choke \u2014 fight where your zone already is.', spikeLine: 'Seraph\u2019s/RoA online \u2014 the storm never turns off; zone him off the wave.',
    spikeItem: 'Seraph\u2019s spike \u2014 perma-storm the wave and the trade.', lvl6Spike: 'Glacial Storm online \u2014 instant wave-clear and the Q-R-E execute is live.',
    fbVerb: 'chain the stun into double-damage E', fbAction: 'hold Q for his engage and wall his path', fbDo: 'Hold Q strictly for his step-ups and engages', dosTail: 'Treat the egg as insurance, not a strategy \u2014 position like it doesn\u2019t exist and let it win the fights it wasn\u2019t supposed to.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Rod of Ages / Seraph\u2019s', 'Archangel\u2019s Staff'],
    skillSeq: ['Q', 'E', 'W', 'E', 'E', 'R', 'E', 'Q', 'E', 'Q', 'R', 'Q', 'Q', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Flash Frost', note: 'Max 2nd \u00b7 stun engine' },
      { k: 'W', color: '#9b8cff', label: 'Crystallize', note: 'Max last \u00b7 wall utility' },
      { k: 'E', color: '#e8b84b', label: 'Frostbite', note: 'Max 1st \u00b7 double-damage nuke' },
      { k: 'R', color: '#ff5d6c', label: 'Glacial Storm', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Chill Chunk', keys: ['Q', 'E', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'He steps up: stun, double-damage E, auto, walk \u2014 the bread-and-butter trade.' },
      { name: 'Storm Execute', keys: ['R', 'E', 'Q'], tone: '#ff5d6c', tier: 'Kill', when: 'Post-6 all-in: storm chills, E doubles, Q stuns the escape attempt.' },
      { name: 'Wall Cutoff', keys: ['W', 'Q', 'E'], tone: '#9b8cff', tier: 'Pick', when: 'Jungler arrives: wall his retreat, stun the trapped path, E the chill.' },
      { name: 'Egg Discipline', keys: ['W'], tone: '#e8b84b', tier: 'Defensive', when: 'Dove under tower: wall the dive path and make them kill you twice in turret range.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights with geometry \u2014 storm the choke before they commit, wall their front line out of the fight, and double-damage E everything the chill touches.',
    teamLookFor: [{ label: 'A choke to storm', tone: '#46c6f5' }, { label: 'Their engage walled off', tone: '#9b8cff' }, { label: 'Chilled targets for E', tone: '#e8b84b' }, { label: 'Egg position safe', tone: '#ff5d6c' }],
    teamPositioning: ['Storm the choke, not the champion.', 'Wall their engage or their retreat \u2014 pick one per fight.', 'Stay behind the storm \u2014 your zone is your front line.', 'Hold Q for the diver who ignores the zone.']
  },
  "Aurelion Sol": {
    dataKey: 'aurelionsol_mid', sub: 'Battlemage \u00b7 Ramping Scale \u00b7 Star Forger', label: '#8fb6e8', tint: 'rgba(120,160,220,0.5)',
    classLabel: 'Battlemage', winStyle: 'Scale / AoE Execute', ultVerdict: 'THE SKIES DESCEND',
    lateSwing: 'Your stardust curve is vertical \u2014 every fight from 25 minutes is yours by arithmetic.', spikeLine: 'RoA online \u2014 the beam burns real numbers now; farm the curve harder.',
    spikeItem: 'RoA spike \u2014 E executes the wave\u2019s back line for free.', lvl6Spike: 'Falling Star online \u2014 the self-peel stun your kit was missing; dives have a second variable now.',
    fbVerb: 'burn the beam across his cooldown gaps', fbAction: 'farm the stardust curve and give nothing back', fbDo: 'Stack stardust off every safe champion Q tick', dosTail: 'Every stack is permanent \u2014 the 30-minute version of you wins fights your laning self cannot imagine; protect the curve.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Catalyst rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Rod of Ages', 'Archangel\u2019s Staff'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Breath of Light', note: 'Max 1st \u00b7 stacking beam' },
      { k: 'W', color: '#9b8cff', label: 'Astral Flight', note: 'Max last \u00b7 reposition + escape' },
      { k: 'E', color: '#e8b84b', label: 'Singularity', note: 'Max 2nd \u00b7 pull zone + execute' },
      { k: 'R', color: '#ff5d6c', label: 'Falling Star / Skies Descend', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Flyby Burn', keys: ['W', 'Q'], tone: '#46c6f5', tier: 'Trade', when: 'His cooldowns gap: fly a lateral arc, drag the beam across him, land outside his answer.' },
      { name: 'Black Hole Clear', keys: ['E', 'Q'], tone: '#e8b84b', tier: 'Farm', when: 'Every wave: E the back line, Q the pull \u2014 stacks and CS in one motion.' },
      { name: 'Star Stun', keys: ['E', 'R', 'Q'], tone: '#ff5d6c', tier: 'Kill', when: 'He commits: singularity slows, Falling Star stuns, beam melts the landing.' },
      { name: 'Skies Opener', keys: ['R', 'E', 'Q', 'W'], tone: '#9b8cff', tier: 'Teamfight', when: 'Grouped objective: upgraded R shockwave, E the scatter, beam the survivors.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights by arithmetic \u2014 The Skies Descend onto their clump, singularity the scatter, and beam-melt everything the knockup grouped.',
    teamLookFor: [{ label: 'Their team clumped for R', tone: '#ff5d6c' }, { label: 'E zone on the objective', tone: '#e8b84b' }, { label: 'W escape arc planned', tone: '#9b8cff' }, { label: 'Stardust curve protected', tone: '#46c6f5' }],
    teamPositioning: ['Open with R only when three-plus are clumped.', 'Beam from behind your front line \u2014 the channel is interruptible.', 'E the pit, not the champion \u2014 zones win objectives.', 'Keep W banked \u2014 a dragon without flight is a target.']
  },
  Azir: {
    dataKey: 'azir_mid', sub: 'Specialist \u00b7 Soldier Control \u00b7 Siege', label: '#f0d08a', tint: 'rgba(230,190,110,0.5)',
    classLabel: 'Specialist', winStyle: 'Poke / Siege DPS', ultVerdict: 'EMPEROR\u2019S DIVIDE',
    lateSwing: 'Your soldier DPS + R wall decide late fights \u2014 shred from behind the divide.', spikeLine: 'Nashor\u2019s online \u2014 soldier poke becomes shred; force the siege war.',
    spikeItem: 'Nashor\u2019s spike \u2014 crash waves and siege plates with soldier autos.', lvl6Spike: 'Emperor\u2019s Divide online \u2014 dive insurance and the insec flip; you win every 2v2 your jungler joins.',
    fbVerb: 'drag soldier volleys through his position', fbAction: 'poke through soldiers and hold E as the exit', fbDo: 'Drag W-Q through his last-hit position on cooldown', dosTail: 'The wall points BACKWARD \u2014 every R is either dive insurance or an insec; decide which before you press it.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Nashor\u2019s Tooth rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Nashor\u2019s Tooth', 'Liandry\u2019s Torment'],
    skillSeq: ['W', 'Q', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Conquering Sands', note: 'Max 1st \u00b7 soldier poke' },
      { k: 'W', color: '#9b8cff', label: 'Arise!', note: 'Max 2nd \u00b7 soldier DPS' },
      { k: 'E', color: '#e8b84b', label: 'Shifting Sands', note: 'Max last \u00b7 shield-dash escape' },
      { k: 'R', color: '#ff5d6c', label: 'Emperor\u2019s Divide', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Drag Poke', keys: ['W', 'Q', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'His last-hit window: soldier behind the wave, drag it through him, auto once, step back.' },
      { name: 'Insec Flip', keys: ['E', 'Q', 'R'], tone: '#ff5d6c', tier: 'Kill', when: 'Jungler arrives: dash to soldier, Q past him, R him backward into your team.' },
      { name: 'Shield Exit', keys: ['E'], tone: '#e8b84b', tier: 'Defensive', when: 'Engaged on: dash to any soldier with the shield \u2014 always keep one planted behind you.' },
      { name: 'Divide Peel', keys: ['R', 'W', 'Q'], tone: '#9b8cff', tier: 'Teamfight', when: 'Their dive commits: wall them out, soldiers up, drag the volley through the divide.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights from behind the divide \u2014 wall their engage, plant soldiers on the line, and shred everything that stays on your side.',
    teamLookFor: [{ label: 'Their engage spent on the wall', tone: '#ff5d6c' }, { label: 'Soldiers planted on the choke', tone: '#9b8cff' }, { label: 'E escape soldier banked', tone: '#e8b84b' }, { label: 'A flank to insec', tone: '#46c6f5' }],
    teamPositioning: ['Fight behind your soldiers \u2014 their range is your range.', 'R points backward: wall divers out or insec carries in.', 'Keep one soldier planted behind you as the E exit.', 'Siege with soldier autos \u2014 you out-range every tower answer.']
  },
  Cassiopeia: {
    dataKey: 'cassiopeia_mid', sub: 'Battlemage \u00b7 Sustained DPS \u00b7 Ground', label: '#9fe0a8', tint: 'rgba(120,200,140,0.5)',
    classLabel: 'Battlemage', winStyle: 'DPS / Anti-Mobility', ultVerdict: 'PETRIFYING GAZE',
    lateSwing: 'Your fang DPS + grounded peel decide late fights \u2014 nobody dives a snake twice.', spikeLine: 'Seraph\u2019s online \u2014 the fang stream out-damages everything mid-range.',
    spikeItem: 'Seraph\u2019s spike \u2014 force extended trades; the DPS war is over.', lvl6Spike: 'Petrifying Gaze online \u2014 face-stun his engage or slow his retreat; the fangs finish either.',
    fbVerb: 'machine-gun E on the poisoned target', fbAction: 'ground his dash and kite the run-down', fbDo: 'Land Q before spending E \u2014 poison first, fangs second', dosTail: 'Hold W for dashes and R for commits \u2014 your DPS only needs the fight to last three more seconds than his plan.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Tear of the Goddess first back'],
    buildCore: ['Seraph\u2019s Embrace', 'Liandry\u2019s Torment', 'Rabadon\u2019s (no boots \u2014 passive)'],
    skillSeq: ['Q', 'W', 'E', 'E', 'E', 'R', 'E', 'Q', 'E', 'Q', 'R', 'Q', 'Q', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Noxious Blast', note: 'Max 2nd \u00b7 poison + speed' },
      { k: 'W', color: '#9b8cff', label: 'Miasma', note: 'Max last \u00b7 ground + zone' },
      { k: 'E', color: '#e8b84b', label: 'Twin Fang', note: 'Max 1st \u00b7 the DPS engine' },
      { k: 'R', color: '#ff5d6c', label: 'Petrifying Gaze', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Poison Stream', keys: ['Q', 'E', 'E', 'E'], tone: '#46c6f5', tier: 'Trade', when: 'He steps into Q range: poison, three fangs, walk out as it fades.' },
      { name: 'Ground the Dive', keys: ['W', 'E', 'E'], tone: '#9b8cff', tier: 'Defensive', when: 'His dash commits: miasma the path \u2014 grounded assassins are minions with health bars.' },
      { name: 'Gaze Flip', keys: ['R', 'Q', 'E', 'E'], tone: '#ff5d6c', tier: 'Kill', when: 'He all-ins: face-stun, poison, and machine-gun the statue.' },
      { name: 'Kite Stream', keys: ['Q', 'E', 'W', 'E'], tone: '#e8b84b', tier: 'Chase', when: 'He runs: Q speeds you, fangs tick, miasma cuts the corner he needed.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights by out-DPSing everything \u2014 ground their engage bridge, petrify the dive that gets through, and machine-gun whoever is closest.',
    teamLookFor: [{ label: 'Their dive grounded by W', tone: '#9b8cff' }, { label: 'R facing their engage', tone: '#ff5d6c' }, { label: 'Poisoned targets for E', tone: '#e8b84b' }, { label: 'ADC-style position held', tone: '#46c6f5' }],
    teamPositioning: ['Position like an ADC with a stun \u2014 max fang range, always.', 'Ground the choke their divers must cross.', 'Face the engage when you R \u2014 stun beats slow.', 'Never stop casting \u2014 your DPS is the team\u2019s win condition.']
  },
  Hwei: {
    dataKey: 'hwei_mid', sub: 'Artillery \u00b7 Spell Palette \u00b7 Visionary', label: '#b89fe8', tint: 'rgba(150,120,210,0.5)',
    classLabel: 'Artillery', winStyle: 'Poke / Palette Control', ultVerdict: 'SPIRALING DESPAIR',
    lateSwing: 'Your R + fear wall decide late fights \u2014 paint the choke before they commit.', spikeLine: 'Blackfire online \u2014 every QQ chunks a quarter bar; force the poke war.',
    spikeItem: 'Blackfire spike \u2014 shove with QA and rotate; your siege poke wins rivers.', lvl6Spike: 'Spiraling Despair online \u2014 R-QQ-QE deletes half bars through the slow.',
    fbVerb: 'detonate the two-spell mark on his face', fbAction: 'dodge the setup spell and out-rotate the gap', fbDo: 'Land any two paints for the mark, then detonate with QQ', dosTail: 'Vary the opening spell every trade \u2014 a predictable palette is a dead painter; the fear paint is your Flash.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Blackfire Torch / Luden\u2019s', 'Shadowflame'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Subject: Disaster', note: 'Max 1st \u00b7 damage palette' },
      { k: 'W', color: '#9b8cff', label: 'Subject: Serenity', note: 'Max 2nd \u00b7 utility palette' },
      { k: 'E', color: '#e8b84b', label: 'Subject: Fear', note: 'Max last \u00b7 CC palette' },
      { k: 'R', color: '#ff5d6c', label: 'Spiraling Despair', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Mark Detonate', keys: ['Q', 'Q', 'E', 'Q'], tone: '#46c6f5', tier: 'Trade', when: 'Wave contact: QQ lava line, any E paint for the mark, QQ the detonation.' },
      { name: 'Fear Wall', keys: ['E', 'E'], tone: '#e8b84b', tier: 'Defensive', when: 'His engage commits: fear paint between you \u2014 the dive turns around mid-flight.' },
      { name: 'Despair Burst', keys: ['R', 'Q', 'Q', 'E'], tone: '#ff5d6c', tier: 'Kill', when: 'All-in window: attach R, QQ the slow, EQ-root the panic.' },
      { name: 'Serenity Reset', keys: ['W', 'W'], tone: '#9b8cff', tier: 'Escape', when: 'Caught rotating: WW speed path out and re-paint from the next brush-length.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights from brush-length \u2014 R their carry at max range, fear-wall the choke behind their front line, and QQ everything the slow catches.',
    teamLookFor: [{ label: 'Their carry in R range', tone: '#ff5d6c' }, { label: 'A choke to fear-wall', tone: '#e8b84b' }, { label: 'Marked targets to detonate', tone: '#46c6f5' }, { label: 'WW escape path planned', tone: '#9b8cff' }],
    teamPositioning: ['Two brush-lengths behind your front line, always.', 'Fear the choke before the fight, not during.', 'R the carry, not the tank \u2014 despair scales with panic.', 'Keep one palette uncast \u2014 the empty-handed painter dies.']
  },
  Lissandra: {
    dataKey: 'lissandra_mid', sub: 'Battlemage \u00b7 Pick & Anti-Dive \u00b7 Ice', label: '#8fd0e8', tint: 'rgba(110,190,220,0.5)',
    classLabel: 'Battlemage', winStyle: 'Pick / Anti-Assassin', ultVerdict: 'FROZEN TOMB',
    lateSwing: 'Your claw-root-tomb chain opens every late fight \u2014 the map shrinks while your E is up.', spikeLine: 'Malignance online \u2014 tomb on a skirmish timer; force picks.',
    spikeItem: 'Malignance spike \u2014 every tomb chains into the burn field.', lvl6Spike: 'Frozen Tomb online \u2014 self-R turns every dive into a counter-kill; you are the anti-assassin now.',
    fbVerb: 'chain root-shatter-tomb on his commit', fbAction: 'root the gap-close and counter the dive', fbDo: 'Hold W for his gap-close \u2014 the root IS the matchup', dosTail: 'Self-R one second later than feels right \u2014 the tomb that eats his whole combo refunds the fight; the early one refunds nothing.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Malignance', 'Zhonya\u2019s Hourglass'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Ice Shard', note: 'Max 1st \u00b7 shatter poke' },
      { k: 'W', color: '#9b8cff', label: 'Ring of Frost', note: 'Max last \u00b7 point-blank root' },
      { k: 'E', color: '#e8b84b', label: 'Glacial Path', note: 'Max 2nd \u00b7 claw engage/escape' },
      { k: 'R', color: '#ff5d6c', label: 'Frozen Tomb', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Root Shatter', keys: ['W', 'Q', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'He steps to punish your Q-farm: root on contact, shatter through, walk.' },
      { name: 'Claw Pick', keys: ['E', 'W', 'R', 'Q'], tone: '#ff5d6c', tier: 'Kill', when: 'River skirmish: claw in, root the carry, tomb the Flash, shatter the statue.' },
      { name: 'Counter Tomb', keys: ['R', 'W', 'Q'], tone: '#9b8cff', tier: 'Defensive', when: 'He all-ins: self-tomb his burst, root the body still standing there, counter-kill.' },
      { name: 'Claw Escape', keys: ['E'], tone: '#e8b84b', tier: 'Escape', when: 'Gank arrives: claw over the nearest wall \u2014 always know which wall before you shove.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights twice \u2014 the flank claw-tomb that starts them 4v5, or the self-tomb that deletes their engage; pick per fight, never both.',
    teamLookFor: [{ label: 'Their carry clawable', tone: '#ff5d6c' }, { label: 'Their engage to self-tomb', tone: '#9b8cff' }, { label: 'W root for the peel', tone: '#46c6f5' }, { label: 'A wall to claw out over', tone: '#e8b84b' }],
    teamPositioning: ['Decide pre-fight: opener or insurance \u2014 the R can\u2019t be both.', 'Claw from fog \u2014 a seen Lissandra is a dodged Lissandra.', 'Root the diver who touches your carry.', 'Zhonya\u2019s after the tomb, not instead of it.'],
    teamFlank: ['Loop wide and claw onto their backline.', 'Tomb the carry \u2014 the burn field does the rest.', 'Root the peel that turns to answer.', 'Claw back out through the wall you came over.']
  },
  Malzahar: {
    dataKey: 'malzahar_mid', sub: 'Battlemage \u00b7 Suppress & Shove \u00b7 Void', label: '#b8a8f0', tint: 'rgba(150,130,220,0.5)',
    classLabel: 'Battlemage', winStyle: 'Shove / Suppression', ultVerdict: 'NETHER GRASP',
    lateSwing: 'Your R subtracts their carry from every late fight \u2014 4v5s are the win condition.', spikeLine: 'Liandry\u2019s online \u2014 visions melt waves and health bars; the shove is permanent.',
    spikeItem: 'Liandry\u2019s spike \u2014 suppress-into-burn kills through defensive answers.', lvl6Spike: 'Nether Grasp online \u2014 with any jungle presence you have a guaranteed kill button.',
    fbVerb: 'shove him under tower and bill the tempo', fbAction: 'keep the shield intact and silence the engage', fbDo: 'Guard the spell shield \u2014 trade only when it is intact', dosTail: 'The Q silence is an interrupt, not poke \u2014 spend it on his engage spell and the dive dies in the wind-up.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Liandry\u2019s Torment', 'Rylai\u2019s Crystal Scepter'],
    skillSeq: ['E', 'W', 'Q', 'E', 'E', 'R', 'E', 'Q', 'E', 'Q', 'R', 'Q', 'Q', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Call of the Void', note: 'Max 2nd \u00b7 silence interrupt' },
      { k: 'W', color: '#9b8cff', label: 'Void Swarm', note: 'Max last \u00b7 shove engine' },
      { k: 'E', color: '#e8b84b', label: 'Malefic Visions', note: 'Max 1st \u00b7 the metronome' },
      { k: 'R', color: '#ff5d6c', label: 'Nether Grasp', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Vision Shove', keys: ['E', 'W', 'Q'], tone: '#e8b84b', tier: 'Farm', when: 'Every wave: E the caster, W the voidlings, Q only if his silence-window matters.' },
      { name: 'Grasp Guarantee', keys: ['E', 'Q', 'R'], tone: '#ff5d6c', tier: 'Kill', when: 'Jungler shadows: visions tick, silence the answer, suppress \u2014 the kill is arithmetic.' },
      { name: 'Silence Stop', keys: ['Q'], tone: '#46c6f5', tier: 'Defensive', when: 'His engage winds up: silence it mid-cast and walk away from the funeral.' },
      { name: 'Shield Reset', keys: ['W'], tone: '#9b8cff', tier: 'Utility', when: 'Shield popped: kite behind voidlings while the passive rebuilds \u2014 trade only after.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights by subtraction \u2014 Grasp their carry as the fight breathes, and let visions plus burn make the 4v5 unanswerable.',
    teamLookFor: [{ label: 'Their carry in Grasp range', tone: '#ff5d6c' }, { label: 'Your shield intact', tone: '#9b8cff' }, { label: 'Their engage to silence', tone: '#46c6f5' }, { label: 'Waves pre-shoved', tone: '#e8b84b' }],
    teamPositioning: ['Hold a flank \u2014 Grasp range is shorter than it looks.', 'Shield up before you step up \u2014 always.', 'Silence their engage spell, suppress their carry.', 'The visions clear waves while you win fights \u2014 let them.']
  },
  Orianna: {
    dataKey: 'orianna_mid', sub: 'Control Mage \u00b7 Ball Control \u00b7 Clockwork', label: '#8fc6e8', tint: 'rgba(120,170,220,0.5)',
    classLabel: 'Control Mage', winStyle: 'Control / Shockwave', ultVerdict: 'COMMAND: SHOCKWAVE',
    lateSwing: 'Your Shockwave decides late fights \u2014 ball the diver, flip the clump, dissonance the retreat.', spikeLine: 'Luden\u2019s online \u2014 Q-W chunks a third bar; own every wave contact.',
    spikeItem: 'Luden\u2019s spike \u2014 shove and rotate; the ball-delivery threat runs rivers.', lvl6Spike: 'Shockwave online \u2014 your lane presence doubles without casting anything.',
    fbVerb: 'Q-W him off every wave contact', fbAction: 'keep the ball between you and shield his engage', fbDo: 'Park the ball on his farm path and Q-W the contact', dosTail: 'Ball-on-self is your Flash \u2014 within E-range at all times once an assassin hits 6; the boring Orianna is the winning one.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Luden\u2019s Companion', 'Shadowflame'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Command: Attack', note: 'Max 1st \u00b7 ball delivery' },
      { k: 'W', color: '#9b8cff', label: 'Command: Dissonance', note: 'Max 2nd \u00b7 burst + field' },
      { k: 'E', color: '#e8b84b', label: 'Command: Protect', note: 'Max last \u00b7 shield + travel' },
      { k: 'R', color: '#ff5d6c', label: 'Command: Shockwave', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Clockwork Chunk', keys: ['Q', 'W', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'Wave contact: ball through him, dissonance the pulse, auto-weave, recall the ball.' },
      { name: 'Shield Answer', keys: ['E', 'W'], tone: '#e8b84b', tier: 'Defensive', when: 'His engage tells: ball-on-self, shield the burst, slow-field the exit.' },
      { name: 'Flip the Dive', keys: ['E', 'R', 'W'], tone: '#ff5d6c', tier: 'Kill', when: 'He commits onto you: shield, Shockwave the point-blank flip, dissonance the landing.' },
      { name: 'Delivery R', keys: ['E', 'Q', 'R'], tone: '#9b8cff', tier: 'Teamfight', when: 'Your diver engages: ball rides them in, Q adjusts, Shockwave the clump they found.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights with one button pressed at the right coordinates \u2014 ball the diver in, Shockwave the clump, and dissonance the choke they retreat through.',
    teamLookFor: [{ label: 'Their clump for Shockwave', tone: '#ff5d6c' }, { label: 'Your diver to ball-ride', tone: '#9b8cff' }, { label: 'E shield for the dove carry', tone: '#e8b84b' }, { label: 'Ball position tracked', tone: '#46c6f5' }],
    teamPositioning: ['The ball is the champion \u2014 position it, not yourself.', 'Protect-ball your engage \u2014 it travels with them.', 'Shockwave clumps, never individuals.', 'Dissonance the retreat after the flip, not before.']
  }
});

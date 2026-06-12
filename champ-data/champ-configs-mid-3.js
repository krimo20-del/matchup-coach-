// MatchupCoach — CHAMPS engine configs for MID: Burst & Utility Mages (1/2).
window.CHAMP_CONFIGS_MID = Object.assign(window.CHAMP_CONFIGS_MID || {}, {
  Ahri: {
    dataKey: 'ahri_mid', sub: 'Burst Mage \u00b7 Charm Pick \u00b7 Nine Tails', label: '#f0a8c8', tint: 'rgba(230,140,180,0.5)',
    classLabel: 'Burst Mage', winStyle: 'Pick / Mobility', ultVerdict: 'SPIRIT RUSH',
    lateSwing: 'Your dash-charm picks decide late fights \u2014 flank, charm the carry, exit through the chaos.', spikeLine: 'Malignance online \u2014 R cycles fast enough to fight every skirmish.',
    spikeItem: 'Malignance spike \u2014 every dash window chains a full charm combo.', lvl6Spike: 'Spirit Rush online \u2014 charm angles multiply and ganks stop working on you.',
    fbVerb: 'land the charm and run the full combo', fbAction: 'dodge his setup behind minions and punish with charm', fbDo: 'Q through his last-hit position so both hits land', dosTail: 'Save the last R dash as your exit \u2014 an Ahri who spends all three going in is an assassin\u2019s favorite story.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Malignance', 'Shadowflame'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Orb of Deception', note: 'Max 1st \u00b7 true-damage return' },
      { k: 'W', color: '#9b8cff', label: 'Fox-Fire', note: 'Max 2nd \u00b7 charm follow-up' },
      { k: 'E', color: '#e8b84b', label: 'Charm', note: 'Max last \u00b7 the matchup button' },
      { k: 'R', color: '#ff5d6c', label: 'Spirit Rush', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Orb Trade', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Safe', when: 'His last-hit: Q through him so both hits land, auto if free, walk before the answer.' },
      { name: 'Charm Combo', keys: ['E', 'Q', 'W', 'AA'], tone: '#ff5d6c', tier: 'Kill', when: 'He steps up or whiffs: charm, full rotation, both orb hits on the walk-away.' },
      { name: 'Dash Angle', keys: ['R', 'E', 'Q'], tone: '#9b8cff', tier: 'Pick', when: 'Post-6 flank: dash to an unwardable angle, charm the carry, orb the convergence.' },
      { name: 'Exit Plan', keys: ['R'], tone: '#e8b84b', tier: 'Defensive', when: 'Collapse arrives: the banked last dash crosses the wall they don\u2019t expect.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights with one charm \u2014 flank-dash to the angle nobody warded, charm the carry, and orb the body your team converges on.',
    teamLookFor: [{ label: 'Their carry charmable', tone: '#ff5d6c' }, { label: 'A flank dash angle', tone: '#9b8cff' }, { label: 'Last dash banked to exit', tone: '#e8b84b' }, { label: 'Setup spells dodged', tone: '#46c6f5' }],
    teamPositioning: ['Charm the carry, never the front line.', 'Dash in on angles, never in straight lines.', 'Keep the last dash for the exit \u2014 always.', 'Orb through the fight\u2019s axis for both hits.'],
    teamFlank: ['Loop wide while their eyes are on your team.', 'R-dash to the unwarded angle.', 'Charm the carry, full rotation, exit dash.', 'Leave before the peel arrives \u2014 the pick is the play.']
  },
  Annie: {
    dataKey: 'annie_mid', sub: 'Burst Mage \u00b7 Stun Cycling \u00b7 Dark Child', label: '#f0a88f', tint: 'rgba(230,140,110,0.5)',
    classLabel: 'Burst Mage', winStyle: 'Point-Click Burst', ultVerdict: 'SUMMON: TIBBERS',
    lateSwing: 'Flash-Tibbers on two flips any late fight \u2014 stock the stun and pick the clump.', spikeLine: 'Stormsurge online \u2014 the stun-burst kills through Doran\u2019s defenses.',
    spikeItem: 'Stormsurge spike \u2014 stock, walk forward, win.', lvl6Spike: 'Tibbers online \u2014 Flash-R-W-Q deletes most mids from full health.',
    fbVerb: 'stun-burst him with the stocked passive', fbAction: 'hold four stacks and zone with the glow', fbDo: 'Trade only at four stacks \u2014 the glow is the matchup', dosTail: 'Re-stock instantly off the wave after every trade \u2014 an unstacked Annie is the snack version of the champion.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Stormsurge / Luden\u2019s', 'Shadowflame'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Disintegrate', note: 'Max 1st \u00b7 refund farming' },
      { k: 'W', color: '#9b8cff', label: 'Incinerate', note: 'Max 2nd \u00b7 stack + burst' },
      { k: 'E', color: '#e8b84b', label: 'Molten Shield', note: 'Max last \u00b7 safe stacking' },
      { k: 'R', color: '#ff5d6c', label: 'Summon: Tibbers', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Stun Trade', keys: ['Q', 'W', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'Four stacks: walk up, Q-stun, W, auto, walk away re-stacking.' },
      { name: 'Flash Tibbers', keys: ['R', 'W', 'Q'], tone: '#ff5d6c', tier: 'Kill', when: 'Stocked stun + Flash range: R the face, W-Q the stunned, Ignite signs it.' },
      { name: 'Safe Stack', keys: ['E'], tone: '#e8b84b', tier: 'Utility', when: 'Between waves: shield-stack the passive without pushing \u2014 arrive at fights loaded.' },
      { name: 'Bear Peel', keys: ['R', 'E'], tone: '#9b8cff', tier: 'Defensive', when: 'Dove: Tibbers ON yourself, shield, and let the bear argue with the diver.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights with one button \u2014 Flash-Tibbers the carry pair with a stocked stun, peel with the bear, and re-stock off the chaos.',
    teamLookFor: [{ label: 'Four stacks glowing', tone: '#e8b84b' }, { label: 'Two-plus in Flash-R radius', tone: '#ff5d6c' }, { label: 'Tibbers angle unwarded', tone: '#9b8cff' }, { label: 'Re-stock plan after', tone: '#46c6f5' }],
    teamPositioning: ['The glow is your range stat \u2014 walk it forward.', 'Tibbers the clump, never the tank.', 'Stun the diver if you\u2019re the win condition.', 'Re-stock between fights \u2014 always arrive loaded.']
  },
  Aurora: {
    dataKey: 'aurora_mid', sub: 'Burst Mage \u00b7 Pattern & Hop \u00b7 Spirit Walker', label: '#c8b8f0', tint: 'rgba(170,150,220,0.5)',
    classLabel: 'Burst Mage', winStyle: 'Pattern / Zone', ultVerdict: 'BETWEEN WORLDS',
    lateSwing: 'Your R zone turns late fights into speed checks they fail \u2014 hop through the panic.', spikeLine: 'Luden\u2019s online \u2014 the Q-E-Q pattern chunks half bars.',
    spikeItem: 'Luden\u2019s spike \u2014 force trades on his cooldown gaps.', lvl6Spike: 'Between Worlds online \u2014 enemies inside feed you speed and exits.',
    fbVerb: 'run the full pattern and hop the answer', fbAction: 'hold the hop for his engage and counter-pattern', fbDo: 'Trade full Q-E-Q patterns, then hop out clean', dosTail: 'The hop spent as an entrance is a hop unavailable as an exit \u2014 the whole kit\u2019s promise breaks on that one greed.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Luden\u2019s Companion', 'Shadowflame'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Twofold Hex', note: 'Max 1st \u00b7 cast + recast' },
      { k: 'W', color: '#9b8cff', label: 'Across the Veil', note: 'Max last \u00b7 hop + stealth' },
      { k: 'E', color: '#e8b84b', label: 'The Weirding', note: 'Max 2nd \u00b7 knockback slow' },
      { k: 'R', color: '#ff5d6c', label: 'Between Worlds', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Full Pattern', keys: ['Q', 'E', 'Q'], tone: '#46c6f5', tier: 'Trade', when: 'Wave contact: Q the mark, E the step-up, Q-recast the slowed \u2014 then walk.' },
      { name: 'Hop Exit', keys: ['W'], tone: '#9b8cff', tier: 'Defensive', when: 'His engage commits: hop + stealth out and re-pattern from the new angle.' },
      { name: 'Zone Fight', keys: ['R', 'Q', 'E'], tone: '#ff5d6c', tier: 'Teamfight', when: 'Skirmish forms: drop the zone, pattern inside it, exit through the portal edge.' },
      { name: 'Anti-Engage', keys: ['E', 'Q', 'W'], tone: '#e8b84b', tier: 'Counter', when: 'He dashes in: knockback-slow, Q-recast, hop if round two threatens.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights inside your zone \u2014 drop R on the objective clump, pattern through the slowed, and exit through the edge they can\u2019t follow.',
    teamLookFor: [{ label: 'A clump for the zone', tone: '#ff5d6c' }, { label: 'E held for their dive', tone: '#e8b84b' }, { label: 'Hop banked for the exit', tone: '#9b8cff' }, { label: 'Patterns traded on gaps', tone: '#46c6f5' }],
    teamPositioning: ['Fight inside your zone \u2014 the speed math is rigged.', 'E the diver mid-dash, pattern the slow.', 'Hop is the exit \u2014 plan entrances on foot.', 'Zone the choke, not the open field.']
  },
  Brand: {
    dataKey: 'brand_mid', sub: 'Burst Mage \u00b7 Blaze Stacking \u00b7 Fireborn', label: '#f0a868', tint: 'rgba(230,150,80,0.5)',
    classLabel: 'Burst Mage', winStyle: 'Burn / AoE Detonation', ultVerdict: 'PYROCLASM',
    lateSwing: 'Your R bounces decide late fights \u2014 spread Blaze and detonate the clump.', spikeLine: 'Liandry\u2019s online \u2014 every rotation is percent-health math.',
    spikeItem: 'Liandry\u2019s spike \u2014 force extended exchanges.', lvl6Spike: 'Pyroclasm online \u2014 any clumped trade is a detonation chain.',
    fbVerb: 'run the ablaze-stun package on his window', fbAction: 'E-ablaze first and threaten the Q stun', fbDo: 'Open every real trade with E for the instant ablaze', dosTail: 'Q only stuns ablaze targets \u2014 a Q thrown at a clean health bar is the most expensive miss in your kit.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Liandry\u2019s Torment', 'Shadowflame'],
    skillSeq: ['W', 'E', 'Q', 'W', 'W', 'R', 'W', 'E', 'W', 'E', 'R', 'E', 'E', 'Q', 'Q', 'R', 'Q', 'Q'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Sear', note: 'Max last \u00b7 the ablaze stun' },
      { k: 'W', color: '#9b8cff', label: 'Pillar of Flame', note: 'Max 1st \u00b7 core poke' },
      { k: 'E', color: '#e8b84b', label: 'Conflagration', note: 'Max 2nd \u00b7 instant ablaze' },
      { k: 'R', color: '#ff5d6c', label: 'Pyroclasm', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Pillar Poke', keys: ['W', 'AA'], tone: '#9b8cff', tier: 'Safe', when: 'His last-hit: pillar the spot he must stand, auto if he eats it, reset.' },
      { name: 'Stun Package', keys: ['E', 'Q', 'W'], tone: '#ff5d6c', tier: 'Kill', when: 'Real window: instant ablaze, stun, pillar the stunned \u2014 half a bar plus the burn.' },
      { name: 'Passive Pop', keys: ['E', 'W', 'Q'], tone: '#e8b84b', tier: 'Burst', when: 'All-in: three spells in any order stack Blaze to detonation \u2014 sequence for the stun.' },
      { name: 'Bounce Fight', keys: ['R', 'E', 'W'], tone: '#46c6f5', tier: 'Teamfight', when: 'They clump: R the pair, E-spread the Blaze, pillar the scatter.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights with three health bars at once \u2014 spread Blaze with E-W, R the clump, and let the bounces vote.',
    teamLookFor: [{ label: 'A clump for Pyroclasm', tone: '#ff5d6c' }, { label: 'E-Q package banked', tone: '#e8b84b' }, { label: 'Ablaze targets to stun', tone: '#9b8cff' }, { label: 'Max range maintained', tone: '#46c6f5' }],
    teamPositioning: ['Max range, always \u2014 your kit has no second act up close.', 'E before Q \u2014 the stun needs the flame.', 'R the clump, never the lone tank.', 'Pillar the choke before they cross it.']
  },
  Karma: {
    dataKey: 'karma_mid', sub: 'Utility Mage \u00b7 RQ Poke \u00b7 Enlightened', label: '#8fe0c8', tint: 'rgba(110,200,170,0.5)',
    classLabel: 'Utility Mage', winStyle: 'Early Poke / Utility', ultVerdict: 'MANTRA',
    lateSwing: 'Late Karma enables \u2014 RE the engage, W-root the diver, and speed the team\u2019s rotations.', spikeLine: 'Blackfire online \u2014 the RQ window where Karma genuinely kills people.',
    spikeItem: 'Blackfire spike \u2014 RQ-W chains threaten kills outright.', lvl6Spike: 'Mantra rank \u2014 faster cycles, bigger RQs; press the early lead before scalers wake.',
    fbVerb: 'RQ him off the wave every Mantra cycle', fbAction: 'chip with Q and shield his answer', fbDo: 'Spend Mantra on champions, not waves \u2014 RQ is the lane', dosTail: 'Your tether breaks if YOU walk away \u2014 holding the root means holding ground for two seconds you must plan for.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Blackfire Torch', 'Shadowflame'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Inner Flame', note: 'Max 1st \u00b7 core poke' },
      { k: 'W', color: '#9b8cff', label: 'Focused Resolve', note: 'Max last \u00b7 tether root' },
      { k: 'E', color: '#e8b84b', label: 'Inspire', note: 'Max 2nd \u00b7 shield + speed' },
      { k: 'R', color: '#ff5d6c', label: 'Mantra', note: 'Empowers Q / W / E' }
    ],
    combos: [
      { name: 'RQ Chunk', keys: ['R', 'Q'], tone: '#ff5d6c', tier: 'Trade', when: 'Real window: Mantra Q the step-up \u2014 a third of a health bar plus the burn zone.' },
      { name: 'Root Setup', keys: ['Q', 'W'], tone: '#9b8cff', tier: 'Pick', when: 'He overstays: Q the slow, tether, hold ground through the root.' },
      { name: 'Shield Sprint', keys: ['R', 'E'], tone: '#e8b84b', tier: 'Defensive', when: 'Engage or escape: RE shields the team and speeds everyone touched.' },
      { name: 'Kill Window', keys: ['R', 'Q', 'W', 'Q'], tone: '#46c6f5', tier: 'Kill', when: 'Pre-two-items: RQ, tether-root, Q again \u2014 the lane\u2019s whole kill script.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights by making four teammates faster and safer \u2014 RE the engage, root the diver, and RQ the siege standoffs.',
    teamLookFor: [{ label: 'Mantra banked for the moment', tone: '#ff5d6c' }, { label: 'Team to RE-speed', tone: '#e8b84b' }, { label: 'Diver to tether', tone: '#9b8cff' }, { label: 'Siege poke angles', tone: '#46c6f5' }],
    teamPositioning: ['RE the engage \u2014 speed wins fights before damage does.', 'Tether the diver and hold your ground.', 'RQ the siege, RW the chase, RE everything else.', 'You fall off \u2014 your team doesn\u2019t; invest accordingly.']
  },
  Lux: {
    dataKey: 'lux_mid', sub: 'Burst Mage \u00b7 Root Snipe \u00b7 Lady of Luminosity', label: '#f0d88f', tint: 'rgba(230,200,110,0.5)',
    classLabel: 'Burst Mage', winStyle: 'Root / Laser', ultVerdict: 'FINAL SPARK',
    lateSwing: 'You decide late fights from a screen away \u2014 root the entry, slow the pit, laser the freeze.', spikeLine: 'Luden\u2019s online \u2014 Q-E-R deletes squishies from root range.',
    spikeItem: 'Luden\u2019s spike \u2014 dodge or die on every contact.', lvl6Spike: 'Final Spark online \u2014 anything the root catches dies to laser math.',
    fbVerb: 'root the window and run the laser math', fbAction: 'E-poke the approach and bank the root', fbDo: 'Bank Q exclusively for his engage \u2014 the root is rent', dosTail: 'Shield the spell that kills, not the one that stings \u2014 W answers exactly one combo per fight.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Luden\u2019s Companion', 'Shadowflame'],
    skillSeq: ['E', 'Q', 'W', 'E', 'E', 'R', 'E', 'Q', 'E', 'Q', 'R', 'Q', 'Q', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Light Binding', note: 'Max 2nd \u00b7 the root that decides' },
      { k: 'W', color: '#9b8cff', label: 'Prismatic Barrier', note: 'Max last \u00b7 combo answer' },
      { k: 'E', color: '#e8b84b', label: 'Lucent Singularity', note: 'Max 1st \u00b7 chip + slow zone' },
      { k: 'R', color: '#ff5d6c', label: 'Final Spark', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Chip Cycle', keys: ['E', 'AA'], tone: '#e8b84b', tier: 'Safe', when: 'His last-hit: E the spot, detonate, weave the passive auto, reset to max range.' },
      { name: 'Full Combo', keys: ['Q', 'E', 'R', 'AA'], tone: '#ff5d6c', tier: 'Kill', when: 'Root lands: E-detonate, laser, passive auto \u2014 squishies don\u2019t survive the math.' },
      { name: 'Shield Answer', keys: ['W'], tone: '#9b8cff', tier: 'Defensive', when: 'His combo flies: barrier out-and-back covers you and the ally behind you.' },
      { name: 'Bait Bind', keys: ['E', 'Q'], tone: '#46c6f5', tier: 'Pick', when: 'He dodges into the slow zone: the root arrives where the E pushed him.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights from a screen away \u2014 root the entry, slow the pit with E, and laser whatever your front line holds still.',
    teamLookFor: [{ label: 'Root banked for their dive', tone: '#46c6f5' }, { label: 'E zone on the choke', tone: '#e8b84b' }, { label: 'Laser angles open', tone: '#ff5d6c' }, { label: 'W saved for their combo', tone: '#9b8cff' }],
    teamPositioning: ['Max range, always \u2014 the root is your only no.', 'E the choke before they cross it.', 'Laser roots and freezes, not dodging targets.', 'Shield the spell that kills, not the chip.']
  }
});

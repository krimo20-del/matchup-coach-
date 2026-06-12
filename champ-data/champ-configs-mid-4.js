// MatchupCoach — CHAMPS engine configs for MID: Burst & Utility Mages (2/2).
window.CHAMP_CONFIGS_MID = Object.assign(window.CHAMP_CONFIGS_MID || {}, {
  Mel: {
    dataKey: 'mel_mid', sub: 'Burst Mage \u00b7 Reflect & Execute \u00b7 Radiant', label: '#f0d8a8', tint: 'rgba(230,200,140,0.5)',
    classLabel: 'Burst Mage', winStyle: 'Reflect / Execute', ultVerdict: 'GOLDEN ECLIPSE',
    lateSwing: 'Late Mel audits fights \u2014 reflect their poke, snare their dive, execute the chipped.', spikeLine: 'Luden\u2019s online \u2014 snare-volley chunks half bars.',
    spikeItem: 'Luden\u2019s spike \u2014 force contacts; the execute cleans the remainder.', lvl6Spike: 'Golden Eclipse online \u2014 the execute threshold turns your chip war into a countdown.',
    fbVerb: 'snare the window and volley it down', fbAction: 'hold Rebuttal for his rotation and return it', fbDo: 'Hold W for his full rotation \u2014 the reflect is a verdict', dosTail: 'Know which of his spells AREN\u2019T projectiles \u2014 the glow is just a light show against the wrong kit.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Luden\u2019s Companion', 'Shadowflame'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Radiant Volley', note: 'Max 1st \u00b7 core barrage' },
      { k: 'W', color: '#9b8cff', label: 'Rebuttal', note: 'Max last \u00b7 the reflect' },
      { k: 'E', color: '#e8b84b', label: 'Solar Snare', note: 'Max 2nd \u00b7 root setup' },
      { k: 'R', color: '#ff5d6c', label: 'Golden Eclipse', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Volley Chip', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Safe', when: 'His last-hit: volley the spot, bank the overwhelm stacks, reset to range.' },
      { name: 'Snare Package', keys: ['E', 'Q', 'AA'], tone: '#e8b84b', tier: 'Kill', when: 'Real window: snare, full volley on the root, stack the execute math.' },
      { name: 'The Verdict', keys: ['W'], tone: '#9b8cff', tier: 'Counter', when: 'His big rotation flies: reflect it back through his own minion line.' },
      { name: 'Eclipse Audit', keys: ['R'], tone: '#ff5d6c', tier: 'Execute', when: 'Stacks banked, targets chipped: the eclipse collects every overdue health bar at once.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights by accounting \u2014 reflect their opener, snare their dive, and let Golden Eclipse audit every chipped health bar on the map.',
    teamLookFor: [{ label: 'Their poke to reflect', tone: '#9b8cff' }, { label: 'Dive to snare', tone: '#e8b84b' }, { label: 'Stacks banked for R', tone: '#ff5d6c' }, { label: 'Max range maintained', tone: '#46c6f5' }],
    teamPositioning: ['Reflect rotations, not pokes \u2014 the W is a verdict.', 'Snare the diver who reaches your line.', 'Volley the front line \u2014 every hit stacks the audit.', 'Eclipse when three bars owe you money.']
  },
  Neeko: {
    dataKey: 'neeko_mid', sub: 'Burst Mage \u00b7 Clone & Root \u00b7 Curious Chameleon', label: '#a8e08f', tint: 'rgba(140,200,110,0.5)',
    classLabel: 'Burst Mage', winStyle: 'Deception / Root Burst', ultVerdict: 'POP BLOSSOM',
    lateSwing: 'Late Neeko is the ambush \u2014 disguise into their formation, R the clump, root the scatter.', spikeLine: 'Luden\u2019s online \u2014 root-bloom deletes squishies and the clone sells the angle.',
    spikeItem: 'Luden\u2019s spike \u2014 force the contact war.', lvl6Spike: 'Pop Blossom online \u2014 the disguise plus R turns any clump into a knockup ambush.',
    fbVerb: 'root-bloom the body that guessed wrong', fbAction: 'walk the clone as a decoy and root the commit', fbDo: 'Root first, bloom second \u2014 E-Q is the sentence', dosTail: 'The clone is your scout, your fake, and your escape \u2014 spending it on idle tricks near assassin timers is how Neekos get audited.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Luden\u2019s Companion', 'Shadowflame'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Blooming Burst', note: 'Max 1st \u00b7 triple bloom' },
      { k: 'W', color: '#9b8cff', label: 'Shapesplitter', note: 'Max last \u00b7 the lying clone' },
      { k: 'E', color: '#e8b84b', label: 'Tangle-Barbs', note: 'Max 2nd \u00b7 the root that starts it' },
      { k: 'R', color: '#ff5d6c', label: 'Pop Blossom', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Root Bloom', keys: ['E', 'Q', 'AA'], tone: '#e8b84b', tier: 'Kill', when: 'He steps up: root, all three blooms on the held target, passive auto out.' },
      { name: 'Clone Game', keys: ['W'], tone: '#9b8cff', tier: 'Utility', when: 'Every reset: fake the roam, fake the recall, fake the engage \u2014 tax his guesses.' },
      { name: 'Crouch Ambush', keys: ['W', 'R', 'E'], tone: '#ff5d6c', tier: 'Teamfight', when: 'Disguised in the wave or fog: crouch, pop the clump, root the scatter.' },
      { name: 'Counter Pop', keys: ['R', 'E', 'Q'], tone: '#46c6f5', tier: 'Defensive', when: 'He dives you: self-R the commit, root the crater\u2019s survivor, bloom the verdict.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights that start as lies \u2014 disguise into their formation, Pop Blossom on three, and root whatever the knockup spares.',
    teamLookFor: [{ label: 'A disguise angle to the clump', tone: '#ff5d6c' }, { label: 'Root banked for the scatter', tone: '#e8b84b' }, { label: 'Clone sold the wrong story', tone: '#9b8cff' }, { label: 'Zhonya\u2019s for the landing', tone: '#46c6f5' }],
    teamPositioning: ['Crouch where they group, not where they look.', 'Root the scatter after the pop, not before.', 'The clone scouts the flank for free \u2014 spend it.', 'Zhonya\u2019s mid-pop turns the ambush into a siege.'],
    teamFlank: ['Disguise as a minion in the side wave.', 'Walk INTO their formation \u2014 patience is the skill.', 'Pop on three-plus, root the survivors.', 'Zhonya\u2019s the answer and walk out famous.']
  },
  "Twisted Fate": {
    dataKey: 'twistedfate_mid', sub: 'Burst Mage \u00b7 Global Pick \u00b7 Card Master', label: '#e8c87f', tint: 'rgba(220,180,100,0.5)',
    classLabel: 'Burst Mage', winStyle: 'Map Play / Gold Card', ultVerdict: 'DESTINY',
    lateSwing: 'Late TF taxes the map \u2014 split R-safe or hold Destiny as the pick-and-collapse button.', spikeLine: 'Lich Bane online \u2014 the gold card chunks half bars.',
    spikeItem: 'Lich Bane spike \u2014 the lane still isn\u2019t the point; the map pays.', lvl6Spike: 'Destiny online \u2014 every shove is a bot-lane death sentence on a 130-second timer.',
    fbVerb: 'gold-card the window and collect', fbAction: 'lock yellow before his engage range exists', fbDo: 'Lock gold card before his engage range, always', dosTail: 'Destiny spent escaping is Destiny not spent collecting \u2014 the ult is a paycheck; cards are your insurance.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Sheen first back'],
    buildCore: ['Sorcerer\u2019s Shoes / Lucidity', 'Lich Bane', 'Rapid Firecannon / Shadowflame'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Wild Cards', note: 'Max 1st \u00b7 wave-clear + poke' },
      { k: 'W', color: '#9b8cff', label: 'Pick a Card', note: 'Max 2nd \u00b7 the gold law' },
      { k: 'E', color: '#e8b84b', label: 'Stacked Deck', note: 'Max last \u00b7 trade filler' },
      { k: 'R', color: '#ff5d6c', label: 'Destiny', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Card Chunk', keys: ['W', 'AA', 'Q'], tone: '#9b8cff', tier: 'Trade', when: 'Gold locked off-screen: walk up once, card-auto-Q, leave before the answer.' },
      { name: 'Destiny Play', keys: ['R', 'W', 'Q'], tone: '#ff5d6c', tier: 'Map', when: 'Wave crashed: reveal, port behind the overextension, gold card the panic.' },
      { name: 'Defensive Lock', keys: ['W'], tone: '#e8b84b', tier: 'Defensive', when: 'His engage telegraphs: the yellow glow alone re-prices his next step.' },
      { name: 'Blue Cycle', keys: ['W', 'Q'], tone: '#46c6f5', tier: 'Farm', when: 'Safe waves: blue card the cannon, Q the rest \u2014 the deck pays its own mana bill.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights by arriving where they aren\u2019t ready \u2014 Destiny behind the pick, gold card the carry, and let the collapse you scheduled finish it.',
    teamLookFor: [{ label: 'A Destiny window on the map', tone: '#ff5d6c' }, { label: 'Gold locked pre-fight', tone: '#9b8cff' }, { label: 'Side waves shoved first', tone: '#46c6f5' }, { label: 'Escape route R-safe', tone: '#e8b84b' }],
    teamPositioning: ['Gold card the carry, not the front line.', 'Destiny flanks, never face-checks.', 'Shove before you port \u2014 the wave is the alibi.', 'You are the collapse \u2014 let your team be the bait.'],
    teamFlank: ['Reveal with R and read the panic.', 'Port behind their carry line.', 'Gold card the priority target on arrival.', 'Walk out while the collapse converges.']
  },
  Veigar: {
    dataKey: 'veigar_mid', sub: 'Burst Mage \u00b7 Infinite Scale \u00b7 Tiny Master of Evil', label: '#b89ff0', tint: 'rgba(150,120,220,0.5)',
    classLabel: 'Burst Mage', winStyle: 'Stack / Cage Execute', ultVerdict: 'PRIMORDIAL BURST',
    lateSwing: 'Late Veigar IS the argument \u2014 cage the choke, burst the carry, let infinity close.', spikeLine: 'Luden\u2019s online \u2014 cage-W-Q-R deletes squishies who touch the wall.',
    spikeItem: 'Luden\u2019s spike \u2014 your zone is a courtroom now.', lvl6Spike: 'Primordial Burst online \u2014 anyone under half is a math problem with one answer.',
    fbVerb: 'cage the window and run the full audit', fbAction: 'self-cage his engage and stack through the lane', fbDo: 'Q through two units on every cast \u2014 the stack count is the matchup', dosTail: 'The cage\u2019s CENTER is safe and the EDGE stuns \u2014 self-cage means standing where they can\u2019t; panicking means forgetting which is which.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Luden\u2019s Companion', 'Seraph\u2019s / Zhonya\u2019s'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Baleful Strike', note: 'Max 1st \u00b7 the stacker' },
      { k: 'W', color: '#9b8cff', label: 'Dark Matter', note: 'Max 2nd \u00b7 caged-target nuke' },
      { k: 'E', color: '#e8b84b', label: 'Event Horizon', note: 'Max last \u00b7 the wall that stuns' },
      { k: 'R', color: '#ff5d6c', label: 'Primordial Burst', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Double Stack', keys: ['Q'], tone: '#46c6f5', tier: 'Farm', when: 'Every cast: line the Q through two units \u2014 minion plus champion is the dream.' },
      { name: 'Cage Audit', keys: ['E', 'W', 'Q', 'R'], tone: '#ff5d6c', tier: 'Kill', when: 'He touches the wall: edge-stun, Dark Matter, Q, and the R does the remainder.' },
      { name: 'Self-Cage', keys: ['E'], tone: '#e8b84b', tier: 'Defensive', when: 'His engage commits: cage ON your own hitbox \u2014 the dash hits the wall mid-animation.' },
      { name: 'Execute Math', keys: ['R'], tone: '#9b8cff', tier: 'Execute', when: 'Under half: count aloud, press once \u2014 the missing-health scaling does the arguing.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights with geometry plus arithmetic \u2014 cage the objective choke, W the edge-stuns, and R-audit every half-health visitor.',
    teamLookFor: [{ label: 'A choke to cage', tone: '#e8b84b' }, { label: 'Sub-half targets for R', tone: '#ff5d6c' }, { label: 'Stack count compounding', tone: '#46c6f5' }, { label: 'Self-cage banked vs dive', tone: '#9b8cff' }],
    teamPositioning: ['Cage the choke before the fight crosses it.', 'Self-cage the diver \u2014 center safe, edge stuns.', 'R the carry under half, never the tank over it.', 'Stack between fights \u2014 the curve never sleeps.']
  },
  Vex: {
    dataKey: 'vex_mid', sub: 'Burst Mage \u00b7 Anti-Dash \u00b7 Gloomist', label: '#9fa8e8', tint: 'rgba(130,140,220,0.5)',
    classLabel: 'Burst Mage', winStyle: 'Anti-Dive / Fear', ultVerdict: 'SHADOW SURGE',
    lateSwing: 'Late Vex taxes engage comps \u2014 their dive feeds your fears, your R feeds on their deaths.', spikeLine: 'Luden\u2019s online \u2014 the marked rotation chunks half bars and fears the answer.',
    spikeItem: 'Luden\u2019s spike \u2014 force the gloom war.', lvl6Spike: 'Shadow Surge online \u2014 any skirmish in missile range is your business; the reset execute travels.',
    fbVerb: 'run the marked rotation through his window', fbAction: 'mark the space and pulse the commit', fbDo: 'E-mark before every real trade \u2014 unmarked rotations are half rotations', dosTail: 'The pulse answers exactly one engage per cooldown \u2014 spent on spacing, the next dash arrives to a quiet, fearless, dead Vex.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Luden\u2019s Companion', 'Shadowflame'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Mistral Bolt', note: 'Max 1st \u00b7 accelerating poke' },
      { k: 'W', color: '#9b8cff', label: 'Personal Space', note: 'Max last \u00b7 shield + fear pulse' },
      { k: 'E', color: '#e8b84b', label: 'Looming Darkness', note: 'Max 2nd \u00b7 gloom mark setup' },
      { k: 'R', color: '#ff5d6c', label: 'Shadow Surge', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Marked Trade', keys: ['E', 'Q', 'AA'], tone: '#e8b84b', tier: 'Trade', when: 'Wave contact: E-mark, Q through the marked line for the fear, auto, walk.' },
      { name: 'Pulse Counter', keys: ['W', 'Q'], tone: '#9b8cff', tier: 'Defensive', when: 'He dashes on: the pulse fears the arrival; Q the feared regret.' },
      { name: 'Surge Reset', keys: ['R', 'E', 'Q', 'R'], tone: '#ff5d6c', tier: 'Execute', when: 'Skirmish in range: R in, rotation, and the takedown resets the next R.' },
      { name: 'Glow Window', keys: ['Q', 'E'], tone: '#46c6f5', tier: 'Zone', when: 'Doom glowing: play forward \u2014 every spell carries a fear and they know it.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights against motion \u2014 their dive comp feeds your fears, your R executes the failures, and the carry they sent dies mid-dash, repeatedly.',
    teamLookFor: [{ label: 'Their dashes on cooldown', tone: '#46c6f5' }, { label: 'Doom glow banked', tone: '#9b8cff' }, { label: 'Skirmish in R range', tone: '#ff5d6c' }, { label: 'Marked targets to rotate', tone: '#e8b84b' }],
    teamPositioning: ['Stand where their mobility wants to go.', 'Pulse the engage, not the feint.', 'R the skirmish, reset off the kill.', 'Glow up, play up \u2014 the fear does the peeling.']
  },
  Zoe: {
    dataKey: 'zoe_mid', sub: 'Burst Mage \u00b7 Sleep Snipe \u00b7 Aspect of Twilight', label: '#e89fd8', tint: 'rgba(220,130,200,0.5)',
    classLabel: 'Burst Mage', winStyle: 'Sleep / Snipe', ultVerdict: 'PORTAL JUMP',
    lateSwing: 'Late Zoe is a pick lottery they keep funding \u2014 bubble the fog, Q the dream, loot the wreck.', spikeLine: 'Luden\u2019s online \u2014 sleep into max-range Q one-shots squishies.',
    spikeItem: 'Luden\u2019s spike \u2014 the lane is a dodgeball final now.', lvl6Spike: 'Portal Jump online \u2014 Q angles multiply and gank dodges get disrespectful.',
    fbVerb: 'sleep the window and shoot the dream', fbAction: 'bubble the approach and keep the fight long-distance', fbDo: 'Max the Q\u2019s travel distance before the redirect \u2014 distance is damage', dosTail: 'The bubble is your life AND your kill \u2014 never spend both meanings at once; budget it like two summoner spells.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Luden\u2019s Companion', 'Shadowflame'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Paddle Star', note: 'Max 1st \u00b7 distance-scaling snipe' },
      { k: 'W', color: '#9b8cff', label: 'Spell Thief', note: 'Max last \u00b7 summoner loot' },
      { k: 'E', color: '#e8b84b', label: 'Sleepy Trouble Bubble', note: 'Max 2nd \u00b7 the dream that decides' },
      { k: 'R', color: '#ff5d6c', label: 'Portal Jump', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Flick Poke', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Safe', when: 'His last-hit: short paddle flick, passive auto, reset \u2014 the chip engine.' },
      { name: 'Dream Shot', keys: ['E', 'Q', 'AA'], tone: '#ff5d6c', tier: 'Kill', when: 'Bubble lands: spin the Q for maximum travel, redirect onto the sleeper, collect.' },
      { name: 'Portal Angle', keys: ['R', 'Q'], tone: '#9b8cff', tier: 'Snipe', when: 'Mid-fight: blink forward, release the max-range Q, snap back to safety.' },
      { name: 'Wall Bubble', keys: ['E'], tone: '#e8b84b', tier: 'Pick', when: 'Fog control: bubble over terrain onto rotation paths \u2014 the lane\u2019s longest trap.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights one dream at a time \u2014 bubble the choke from fog, one-shot the sleeper, and portal out of the consequences.',
    teamLookFor: [{ label: 'Fog angles for the bubble', tone: '#e8b84b' }, { label: 'Max-range Q lines open', tone: '#46c6f5' }, { label: 'Summoner loot on the ground', tone: '#9b8cff' }, { label: 'R return spot safe', tone: '#ff5d6c' }],
    teamPositioning: ['Shoot from fog \u2014 a seen Zoe is a dodged Zoe.', 'Bubble the choke, not the champion.', 'Spin the Q for distance before the redirect.', 'Mind the R return spot \u2014 it\u2019s an appointment.']
  }
});

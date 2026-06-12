// MatchupCoach — CHAMPS engine configs for MID: Fighters & Skirmishers.
window.CHAMP_CONFIGS_MID = Object.assign(window.CHAMP_CONFIGS_MID || {}, {
  Galio: {
    dataKey: 'galio_mid', sub: 'Warden \u00b7 Anti-Mage \u00b7 Colossus', label: '#8fb6d9', tint: 'rgba(120,160,210,0.5)',
    classLabel: 'Warden', winStyle: 'Anti-Magic / Arrival', ultVerdict: 'HERO\u2019S ENTRANCE',
    lateSwing: 'Late Galio is the anti-engage \u2014 taunt their dive, shield the magic, R the lonely teammate.', spikeLine: 'First MR item online \u2014 AP trades become donations.',
    spikeItem: 'First item spike \u2014 the taunt rotation chunks.', lvl6Spike: 'Hero\u2019s Entrance online \u2014 every shoved side lane is your teleport gym.',
    fbVerb: 'taunt the commit and rotate him down', fbAction: 'shield the poke and taunt the step-up', fbDo: 'Trade behind the shield \u2014 the passive is the matchup vs AP', dosTail: 'Park the wave middle before every R \u2014 the channel costs two waves if you cast it from a crashing lane.',
    buildStart: ['Doran\u2019s Shield + Health Potion', 'Bami\u2019s / Cowl piece'],
    buildCore: ['Mercury\u2019s Treads', 'Hollow Radiance / Riftmaker', 'Abyssal Mask'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Winds of War', note: 'Max 1st \u00b7 tornado poke' },
      { k: 'W', color: '#9b8cff', label: 'Shield of Durand', note: 'Max 2nd \u00b7 the taunt' },
      { k: 'E', color: '#e8b84b', label: 'Justice Punch', note: 'Max last \u00b7 dash knockup' },
      { k: 'R', color: '#ff5d6c', label: 'Hero\u2019s Entrance', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Tornado Trade', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Safe', when: 'Wave contact: windblast the spot he farms from, let the tornado tick.' },
      { name: 'Taunt Rotation', keys: ['E', 'W', 'Q'], tone: '#9b8cff', tier: 'Kill', when: 'He oversteps: punch in, taunt the answer, Q the held target.' },
      { name: 'Counter Engage', keys: ['W', 'Q'], tone: '#e8b84b', tier: 'Defensive', when: 'He dives: charge the taunt mid-engage \u2014 his commit becomes your setup.' },
      { name: 'The Arrival', keys: ['R', 'W', 'Q'], tone: '#ff5d6c', tier: 'Map', when: 'Side lane fights: R the teammate, knockup the landing, taunt the survivors.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights by arriving \u2014 R the teammate they dove, knockup the landing, and taunt the regret while your team converges.',
    teamLookFor: [{ label: 'A teammate to R', tone: '#ff5d6c' }, { label: 'Their dive to taunt', tone: '#9b8cff' }, { label: 'Magic damage to sponge', tone: '#46c6f5' }, { label: 'Wave parked pre-channel', tone: '#e8b84b' }],
    teamPositioning: ['Taunt the dive off your carry \u2014 that\u2019s the job.', 'R the fight, not the farm.', 'Shield-bait their burst, then charge.', 'You are the engage AND the peel \u2014 pick per fight.']
  },
  Irelia: {
    dataKey: 'irelia_mid', sub: 'Skirmisher \u00b7 Blade Dance \u00b7 Will of the Blades', label: '#e06b78', tint: 'rgba(210,70,90,0.5)',
    classLabel: 'Skirmisher', winStyle: 'Resets / Stat Check', ultVerdict: 'VANGUARD\u2019S EDGE',
    lateSwing: 'Late Irelia surfs the fight \u2014 Q through their line, stun the carries, shred the peel.', spikeLine: 'BotRK online \u2014 stacked trades delete mages.',
    spikeItem: 'BotRK spike \u2014 the sustain mocks their poke math.', lvl6Spike: 'Vanguard\u2019s Edge online \u2014 the all-in caps with disengage-proof marks.',
    fbVerb: 'dance the wave into his face and stun the apology', fbAction: 'stack four and reset through the wave', fbDo: 'Four stacks before commits \u2014 the passive is the all-in', dosTail: 'The wave is your mana bar \u2014 shoving mindlessly is deleting your own mobility.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Recurve Bow'],
    buildCore: ['Berserker\u2019s Greaves', 'Blade of the Ruined King', 'Wit\u2019s End / Steelcaps path'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Bladesurge', note: 'Max 1st \u00b7 the reset dash' },
      { k: 'W', color: '#9b8cff', label: 'Defiant Dance', note: 'Max last \u00b7 damage shred' },
      { k: 'E', color: '#e8b84b', label: 'Flawless Duet', note: 'Max 2nd \u00b7 the stun' },
      { k: 'R', color: '#ff5d6c', label: 'Vanguard\u2019s Edge', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Wave Dance', keys: ['Q', 'Q', 'Q'], tone: '#46c6f5', tier: 'Mobility', when: 'Low minions chain to his face: every kill resets the dash \u2014 budget the path.' },
      { name: 'Stacked All-In', keys: ['E', 'Q', 'AA', 'W'], tone: '#ff5d6c', tier: 'Kill', when: 'Four stacks: stun, surge, autos, W his answer \u2014 the stat check votes.' },
      { name: 'Burst Shred', keys: ['W'], tone: '#9b8cff', tier: 'Defensive', when: 'His damage spell flies: channel through it \u2014 the shred refunds the window.' },
      { name: 'Wall the Exit', keys: ['R', 'Q', 'E'], tone: '#e8b84b', tier: 'Teamfight', when: 'They disengage: R the line, surge the marked, stun the stragglers.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights by surfing them \u2014 Q-reset through their line, stun the carry pair, and let the marks ground whoever tries to leave.',
    teamLookFor: [{ label: 'Reset bodies to surf', tone: '#46c6f5' }, { label: 'Four stacks banked', tone: '#ff5d6c' }, { label: 'Their disengage to wall', tone: '#e8b84b' }, { label: 'W held for their burst', tone: '#9b8cff' }],
    teamPositioning: ['Surf the minion line into their backline.', 'Stun the pair, not the tank.', 'R their exit \u2014 the marks do the grounding.', 'W the biggest spell, not the first one.']
  },
  Pantheon: {
    dataKey: 'pantheon_mid', sub: 'Diver \u00b7 Early Bully \u00b7 Unbreakable Spear', label: '#d86a6a', tint: 'rgba(210,80,80,0.5)',
    classLabel: 'Diver', winStyle: 'Early Burst / Map Play', ultVerdict: 'GRAND STARFALL',
    lateSwing: 'Late Pantheon starts fights \u2014 R the flank, stun the carry, block the counter.', spikeLine: 'Eclipse online \u2014 the stun-spear rotation deletes squishies.',
    spikeItem: 'Eclipse spike \u2014 last call before scaling wakes.', lvl6Spike: 'Grand Starfall online \u2014 your shoves become bot-lane invoices.',
    fbVerb: 'stun-spear the window and collect', fbAction: 'W his setup spell and block the rotation', fbDo: 'Spend the early windows loudly \u2014 the lead has a sell-by date', dosTail: 'Your E only blocks the direction you face \u2014 a flanked Aegis is a cape, not a shield.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Serrated Dirk'],
    buildCore: ['Ionian Lucidity', 'Eclipse', 'Serylda\u2019s / Sterak\u2019s path'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Comet Spear', note: 'Max 1st \u00b7 poke + execute' },
      { k: 'W', color: '#9b8cff', label: 'Shield Vault', note: 'Max 2nd \u00b7 point-click stun' },
      { k: 'E', color: '#e8b84b', label: 'Aegis Assault', note: 'Max last \u00b7 directional block' },
      { k: 'R', color: '#ff5d6c', label: 'Grand Starfall', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Spear Poke', keys: ['Q'], tone: '#46c6f5', tier: 'Safe', when: 'His last-hit: tap-Q the chunk \u2014 empowered version executes under a third.' },
      { name: 'The Ultimatum', keys: ['W', 'AA', 'Q'], tone: '#ff5d6c', tier: 'Kill', when: 'Level 2 on: vault-stun, empowered auto, spear \u2014 the toll most mids pay.' },
      { name: 'Aegis Answer', keys: ['E'], tone: '#e8b84b', tier: 'Defensive', when: 'His burst window: face the damage and block the entire sentence.' },
      { name: 'Starfall Invoice', keys: ['R', 'W', 'Q'], tone: '#9b8cff', tier: 'Map', when: 'Wave crashed: R the bot fight, vault on landing, spear the panic.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights by starting them \u2014 R the flank, stun the carry on arrival, and block the counter-burst while your team converges.',
    teamLookFor: [{ label: 'A fight to R into', tone: '#ff5d6c' }, { label: 'Their carry stunnable', tone: '#9b8cff' }, { label: 'E faced at their damage', tone: '#e8b84b' }, { label: 'Lead spent before fall-off', tone: '#46c6f5' }],
    teamPositioning: ['Start the fight \u2014 that\u2019s the whole job.', 'Stun the carry, block the counter.', 'The lead is a loan \u2014 spend it on objectives.', 'Face the block where the damage lives.'],
    teamFlank: ['R behind their formation\u2019s blind side.', 'Vault the carry as you land.', 'Empowered-spear the stunned window.', 'Block the peel and walk out paid.']
  },
  Yasuo: {
    dataKey: 'yasuo_mid', sub: 'Skirmisher \u00b7 Wind Wall \u00b7 Unforgiven', label: '#9fb0d8', tint: 'rgba(150,165,210,0.5)',
    classLabel: 'Skirmisher', winStyle: 'Dash Web / Wall', ultVerdict: 'LAST BREATH',
    lateSwing: 'Late Yasuo closes the wombo \u2014 wall their poke, ride the knockup chain, R the lifted clump.', spikeLine: 'First crit item online \u2014 EQ strings chunk.',
    spikeItem: 'Two-item spike \u2014 one tornado is a kill sentence.', lvl6Spike: 'Last Breath online \u2014 every knockup in two screens is yours.',
    fbVerb: 'EQ the window and let the steel sing', fbAction: 'wall his rotation and dash the gaps', fbDo: 'Wall the rotation, never the chip \u2014 the wall is a teamfight item', dosTail: 'Keep one dash home \u2014 a dry web at the wrong moment is the only way mages ever catch you.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Noonquiver piece'],
    buildCore: ['Berserker\u2019s Greaves', 'BotRK / Shieldbow', 'Infinity Edge'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Steel Tempest', note: 'Max 1st \u00b7 the tornado engine' },
      { k: 'W', color: '#9b8cff', label: 'Wind Wall', note: 'Max last \u00b7 the projectile veto' },
      { k: 'E', color: '#e8b84b', label: 'Sweeping Blade', note: 'Max 2nd \u00b7 the dash web' },
      { k: 'R', color: '#ff5d6c', label: 'Last Breath', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'EQ Cycle', keys: ['E', 'Q', 'E'], tone: '#46c6f5', tier: 'Trade', when: 'Wave contact: dash-Q through him, keep dashing \u2014 the web is the range stat.' },
      { name: 'The Veto', keys: ['W'], tone: '#9b8cff', tier: 'Defensive', when: 'His rotation flies: wall the centerpiece \u2014 chip is never worth the cooldown.' },
      { name: 'Tornado All-In', keys: ['Q', 'E', 'Q', 'R'], tone: '#ff5d6c', tier: 'Kill', when: 'Third Q loaded: tornado off a web angle, R the lift, EQ the landing.' },
      { name: 'Chain Rider', keys: ['R'], tone: '#e8b84b', tier: 'Teamfight', when: 'ANY knockup lands \u2014 yours, your jungler\u2019s, anyone\u2019s: Last Breath the airborne.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights on borrowed air \u2014 wall their poke, ride your front line\u2019s knockups, and Last Breath the clump they lifted for you.',
    teamLookFor: [{ label: 'Knockups to R', tone: '#ff5d6c' }, { label: 'Their poke to wall', tone: '#9b8cff' }, { label: 'Web bodies to the backline', tone: '#e8b84b' }, { label: 'Tornado banked pre-fight', tone: '#46c6f5' }],
    teamPositioning: ['The wall wins teamfights \u2014 spend it on their best spell.', 'Ride knockups \u2014 yours is only one source.', 'Web through the wave to the backline.', 'Shieldbow the focus, then re-enter.'],
    teamFlank: ['Loop where the minion web reaches their line.', 'Tornado from the angle they can\u2019t wall.', 'R the lift and EQ the landing.', 'Wall the answer and dash out the web.']
  },
  Yone: {
    dataKey: 'yone_mid', sub: 'Skirmisher \u00b7 Soul Windows \u00b7 Unforgotten', label: '#9fb0d8', tint: 'rgba(150,165,210,0.5)',
    classLabel: 'Skirmisher', winStyle: 'Window Trades / Mixed', ultVerdict: 'FATE SEALED',
    lateSwing: 'Late Yone flanks in spirit \u2014 E behind the fight, R the frozen line, snap back out.', spikeLine: 'First crit item online \u2014 soul-window trades chunk half bars.',
    spikeItem: 'Two-item spike \u2014 the R line ends formations.', lvl6Spike: 'Fate Sealed online \u2014 knockup into full string into snap-back safety.',
    fbVerb: 'window-trade the gap and snap back paid', fbAction: 'shield his burst and E the silence', fbDo: 'Enter on his gaps, exit at the edge \u2014 the window is the matchup', dosTail: 'The snap-back announces your return address \u2014 ward-conscious Yones outlive brilliant ones.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Noonquiver piece'],
    buildCore: ['Berserker\u2019s Greaves', 'BotRK / Shieldbow', 'Infinity Edge'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Mortal Steel', note: 'Max 1st \u00b7 third-strike lift' },
      { k: 'W', color: '#9b8cff', label: 'Spirit Cleave', note: 'Max 2nd \u00b7 cone + shield' },
      { k: 'E', color: '#e8b84b', label: 'Soul Unbound', note: 'Max last \u00b7 the window' },
      { k: 'R', color: '#ff5d6c', label: 'Fate Sealed', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Window Trade', keys: ['E', 'Q', 'W'], tone: '#e8b84b', tier: 'Trade', when: 'His cooldown gap: enter spirit, Q3-W the lift, snap back with the receipt.' },
      { name: 'Shield Cleave', keys: ['W', 'AA'], tone: '#9b8cff', tier: 'Defensive', when: 'His trade window: cone through him \u2014 the shield refunds the exchange.' },
      { name: 'Sealed Line', keys: ['E', 'R', 'Q', 'W'], tone: '#ff5d6c', tier: 'Kill', when: 'The line forms: window in, R the lift, full string, return home.' },
      { name: 'Storm Q3', keys: ['Q', 'Q', 'Q'], tone: '#46c6f5', tier: 'Poke', when: 'Stack two on the wave, hold the third \u2014 the lift threat taxes his spacing.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights you only half-attend \u2014 E behind their line, R the formation your team froze, and snap back before the peel votes.',
    teamLookFor: [{ label: 'A line for Fate Sealed', tone: '#ff5d6c' }, { label: 'E window banked', tone: '#e8b84b' }, { label: 'Q3 loaded pre-fight', tone: '#46c6f5' }, { label: 'Return marker safe', tone: '#9b8cff' }],
    teamPositioning: ['Window in when their CC shows elsewhere.', 'R the line, not the lone tank.', 'Exit at the edge \u2014 encores get audited.', 'Mind the marker \u2014 it\u2019s an appointment.'],
    teamFlank: ['E from fog so the marker hides too.', 'R through the formation\u2019s long axis.', 'Q3-W the lifted line.', 'Snap back through the chaos you authored.']
  }
});

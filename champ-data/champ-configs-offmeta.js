// MatchupCoach — CHAMPS engine configs for the 13 off-meta top picks (Ziggs → Akshan).
// Merged into the in-app CHAMPS registry via Object.assign at build time.
window.CHAMP_CONFIGS_EXTRA = {
  Ziggs: {
    dataKey: 'ziggs', sub: 'Artillery \u00b7 Poke \u00b7 Siege', label: '#f0c468', tint: 'rgba(232,184,75,0.5)',
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
  },
  Sylas: {
    dataKey: 'sylas', sub: 'Skirmisher \u00b7 AP Brawl \u00b7 Hijack', label: '#79c8d4', tint: 'rgba(90,180,200,0.46)',
    classLabel: 'Skirmisher', winStyle: 'Brawl / Hijack', ultVerdict: 'HIJACK',
    lateSwing: 'Steal the best ultimate on the map and flank \u2014 your W heal wins the extended fight.', spikeLine: 'Riftmaker online \u2014 your full chain wins almost any even 1v1.',
    spikeItem: 'Riftmaker spike \u2014 force extended trades.', lvl6Spike: 'Hijack online \u2014 his own ultimate is now on your roster.',
    fbVerb: 'out-rotate him with full spell chains', fbAction: 'shield through the poke and chain in on his cooldown', fbDo: 'Trade in full rotations with passive autos woven', dosTail: 'Weave the empowered passive autos between every spell \u2014 they are half your damage.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Riftmaker rush'],
    buildCore: ['Mercury\u2019s Treads / Steelcaps', 'Riftmaker', 'Zhonya\u2019s Hourglass'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Chain Lash', note: 'Max 1st \u00b7 poke + slow' },
      { k: 'W', color: '#9b8cff', label: 'Kingslayer', note: 'Max 2nd \u00b7 burst + heal' },
      { k: 'E', color: '#e8b84b', label: 'Abscond / Abduct', note: 'Max last \u00b7 shield + chain stun' },
      { k: 'R', color: '#ff5d6c', label: 'Hijack', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Full Chain', keys: ['E', 'E', 'Q', 'W'], tone: '#e8b84b', tier: 'Kill', when: 'Dash, chain-stun, Q the landing, W the chunk \u2014 weave passive autos between each cast.' },
      { name: 'Shield Trade', keys: ['E', 'Q', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'E1 shield through his poke, Q the step-up, auto, and walk before his answer.' },
      { name: 'Kingslayer Heal', keys: ['W'], tone: '#9b8cff', tier: 'Defensive', when: 'Below half HP: W the lowest target \u2014 the heal doubles when you\u2019re wounded.' },
      { name: 'Hijack Play', keys: ['R', 'E', 'W'], tone: '#ff5d6c', tier: 'Steal', when: 'Steal his R before the fight, open with it, then chain your own kit behind it.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights by stealing the right ultimate \u2014 flank with their best R in your pocket, chain-stun the carry, and let the W heal carry you through the counter-burst.',
    teamLookFor: [{ label: 'The best R to steal', tone: '#ff5d6c' }, { label: 'Their carry reachable', tone: '#e8b84b' }, { label: 'E chain up to engage', tone: '#46c6f5' }, { label: 'W up for the 1v1 heal', tone: '#9b8cff' }],
    teamPositioning: ['Steal the teamfight R before the fight starts.', 'Flank \u2014 your E2 reaches their backline.', 'Burst the carry, W-heal through the answer.', 'Zhonya\u2019s the focus, then re-chain.'],
    teamFlank: ['Loop wide and E2 onto their carry.', 'Open with the stolen R \u2014 it\u2019s your best card.', 'Chain Q-W with passive autos to finish.', 'Go around their front line to reach the backline.']
  },
  Sejuani: {
    dataKey: 'sejuani', sub: 'Vanguard \u00b7 CC Chain \u00b7 Teamfight', label: '#8fc6e8', tint: 'rgba(120,170,220,0.46)',
    classLabel: 'Vanguard', winStyle: 'CC Chain / Teamfight', ultVerdict: 'GLACIAL PRISON',
    lateSwing: 'Your multi-man R + Permafrost chains decide fights \u2014 group and engage on their cooldowns.', spikeLine: 'Sunfire online \u2014 you stop losing the trades your stun starts.',
    spikeItem: 'Sunfire Aegis spike \u2014 frontline with confidence.', lvl6Spike: 'Glacial Prison online \u2014 every gank and river fight is now a guaranteed CC chain.',
    fbVerb: 'chain CC through Permafrost windows', fbAction: 'land the full Q-W-E chain on his step-up', fbDo: 'Trade only through full Permafrost chains', dosTail: 'Stack Frost with both W arcs before E \u2014 Permafrost only triggers on fully chilled targets.',
    buildStart: ['Doran\u2019s Shield + Health Potion', 'Sunfire Aegis rush'],
    buildCore: ['Plated Steelcaps / Mercs', 'Sunfire Aegis', 'Thornmail / Kaenic Rookern'],
    skillSeq: ['Q', 'W', 'E', 'W', 'W', 'R', 'W', 'Q', 'W', 'Q', 'R', 'Q', 'Q', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Arctic Assault', note: 'Max 2nd \u00b7 dash + knockup' },
      { k: 'W', color: '#9b8cff', label: 'Winter\u2019s Wrath', note: 'Max 1st \u00b7 Frost stacks + clear' },
      { k: 'E', color: '#e8b84b', label: 'Permafrost', note: 'Max last \u00b7 stun on chilled' },
      { k: 'R', color: '#ff5d6c', label: 'Glacial Prison', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Permafrost Trade', keys: ['W', 'W', 'E'], tone: '#9b8cff', tier: 'Trade', when: 'Both W arcs to stack Frost, E to stun the moment he\u2019s fully chilled, walk away.' },
      { name: 'Full Engage', keys: ['Q', 'W', 'E', 'AA'], tone: '#e8b84b', tier: 'Engage', when: 'Q the knockup, double W, Permafrost stun \u2014 your jungler\u2019s gank or your kill window.' },
      { name: 'Prison Pick', keys: ['R', 'Q', 'E'], tone: '#ff5d6c', tier: 'Kill', when: 'R the carry from fog, Q in while they\u2019re frozen, chain Permafrost on the thaw.' },
      { name: 'Exit Dash', keys: ['Q'], tone: '#46c6f5', tier: 'Defensive', when: 'Pre-6 with no kill window: Q is your only exit \u2014 dash through terrain and reset.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights by landing the multi-man Glacial Prison \u2014 R the clump, Q into the frozen targets, and chain Permafrost stuns while your team unloads.',
    teamLookFor: [{ label: '2+ enemies for R', tone: '#ff5d6c' }, { label: 'Their peel spent', tone: '#46c6f5' }, { label: 'Frost stacked for E', tone: '#9b8cff' }, { label: 'Your carries in follow range', tone: '#3ddc97' }],
    teamPositioning: ['Front-line \u2014 you are the engage button.', 'R the clump or the carry, never a lone tank.', 'Q-W-E chain whatever the prison catches.', 'Peel with Permafrost if they dive your carry first.']
  },
  Ryze: {
    dataKey: 'ryze', sub: 'Battle Mage \u00b7 Scaling \u00b7 Realm Warp', label: '#8ea2f0', tint: 'rgba(110,130,230,0.46)',
    classLabel: 'Battle Mage', winStyle: 'Scaling / Warp', ultVerdict: 'REALM WARP',
    lateSwing: 'Seraph\u2019s Ryze out-DPSes everyone \u2014 shove the side and Warp to every fight.', spikeLine: 'Rod of Ages online \u2014 your rotations now win on raw math.',
    spikeItem: 'Rod of Ages spike \u2014 the lane flips here.', lvl6Spike: 'Realm Warp online \u2014 flanks, escapes, and cross-map ganks are on the table.',
    fbVerb: 'kite him with Phase Rush rotations', fbAction: 'root the engage and Q-kite away with Phase Rush', fbDo: 'Trade full E-W-Q rotations through Fluxed minions', dosTail: 'Lead with E \u2014 Flux makes W root spread and Q bounce; never cast into an unfluxed target.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Tear \u2192 Rod of Ages rush'],
    buildCore: ['Sorcerer\u2019s Shoes / Mercs', 'Rod of Ages', 'Seraph\u2019s Embrace'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Overload', note: 'Max 1st \u00b7 core DPS + Phase Rush' },
      { k: 'W', color: '#9b8cff', label: 'Rune Prison', note: 'Max last \u00b7 root on Fluxed' },
      { k: 'E', color: '#e8b84b', label: 'Spell Flux', note: 'Max 2nd \u00b7 spread + amp' },
      { k: 'R', color: '#ff5d6c', label: 'Realm Warp', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Kite Rotation', keys: ['E', 'Q', 'AA'], tone: '#46c6f5', tier: 'Safe', when: 'Flux the near minion, Q through it for Phase Rush, and walk the speed boost out of range.' },
      { name: 'Root Chain', keys: ['E', 'W', 'Q', 'Q'], tone: '#e8b84b', tier: 'Trade', when: 'He steps up: Flux, root through the wave, double Q while he\u2019s locked.' },
      { name: 'All-In', keys: ['R', 'E', 'W', 'Q'], tone: '#ff5d6c', tier: 'Kill', when: 'Warp behind his escape path, Flux-root, and cycle Q until the math finishes.' },
      { name: 'Anti-Dive', keys: ['W', 'Q', 'E'], tone: '#9b8cff', tier: 'Defensive', when: 'He dives: root the landing, Q for Phase Rush, and kite to tower.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights with inevitability \u2014 shove the side lane, Realm Warp your team into flanks nobody wards, and melt frontlines with rooted EQ rotations.',
    teamLookFor: [{ label: 'A flank to Warp into', tone: '#ff5d6c' }, { label: 'Their engage spent', tone: '#46c6f5' }, { label: 'A target to root-lock', tone: '#9b8cff' }, { label: 'Seraph\u2019s shield up', tone: '#3ddc97' }],
    teamPositioning: ['Side-lane until the fight forms, then Warp in.', 'Root the first diver \u2014 your W is the team\u2019s peel.', 'EQ the frontline; your DPS out-grinds theirs.', 'Warp the escape when the fight goes wrong.']
  },
  Neeko: {
    dataKey: 'neeko', sub: 'Trickster \u00b7 Root \u00b7 Pop Blossom', label: '#8be38f', tint: 'rgba(110,220,130,0.42)',
    classLabel: 'Trickster', winStyle: 'Deceive / Burst', ultVerdict: 'POP BLOSSOM',
    lateSwing: 'A disguised flank into multi-man R flips any fight \u2014 lie your way to their backline.', spikeLine: 'Stormsurge online \u2014 a rooted target loses half its HP to one rotation.',
    spikeItem: 'Stormsurge spike \u2014 punish every root.', lvl6Spike: 'Pop Blossom online \u2014 root into disguised walk-up is now an execute.',
    fbVerb: 'out-trade him with root-bloom combos', fbAction: 'root through the wave and double-bloom the lock', fbDo: 'Root through minions onto his CS position', dosTail: 'Send the W clone to sell fake engages \u2014 every fake he respects is a free trade you take.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Stormsurge rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Stormsurge', 'Shadowflame'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Blooming Burst', note: 'Max 1st \u00b7 triple-pop burst' },
      { k: 'W', color: '#9b8cff', label: 'Shapesplitter', note: 'Max last \u00b7 clone + stealth' },
      { k: 'E', color: '#e8b84b', label: 'Tangle-Barbs', note: 'Max 2nd \u00b7 root (longer through units)' },
      { k: 'R', color: '#ff5d6c', label: 'Pop Blossom', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Root Bloom', keys: ['E', 'Q', 'AA'], tone: '#e8b84b', tier: 'Trade', when: 'Root through the minion he\u2019s last-hitting, land all three Q blooms on the lock.' },
      { name: 'Clone Fake', keys: ['W', 'E'], tone: '#9b8cff', tier: 'Setup', when: 'Send the clone at him \u2014 root the real angle when he answers the wrong Neeko.' },
      { name: 'Blossom All-In', keys: ['E', 'W', 'R', 'Q'], tone: '#ff5d6c', tier: 'Kill', when: 'Root, walk in stealthed behind the clone, R the panic, Q the survivors.' },
      { name: 'Disguise Reset', keys: ['W'], tone: '#46c6f5', tier: 'Defensive', when: 'Caught out: clone one way, stealth the other, and reset as a minion in the wave.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights with the disguised flank \u2014 walk into their clump as a teammate or minion, R the panic, and root whatever tries to leave.',
    teamLookFor: [{ label: 'A flank angle disguised', tone: '#8be38f' }, { label: 'Enemies clumped for R', tone: '#ff5d6c' }, { label: 'Their peel spent', tone: '#46c6f5' }, { label: 'E up to root the exit', tone: '#e8b84b' }],
    teamPositioning: ['Flank disguised \u2014 you choose when the fight learns you exist.', 'R the clump, not the tank.', 'Root the carry\u2019s exit lane mid-fight.', 'Clone-fake their cooldowns before committing.'],
    teamFlank: ['Disguise as a minion or teammate and loop wide.', 'Walk into the clump before revealing.', 'R the panic, root the scatter.', 'Go around their front line to reach the backline.']
  },
  Mel: {
    dataKey: 'mel', sub: 'Mage \u00b7 Reflect \u00b7 Execute', label: '#f0d088', tint: 'rgba(230,190,110,0.46)',
    classLabel: 'Mage', winStyle: 'Poke / Execute', ultVerdict: 'GOLDEN ECLIPSE',
    lateSwing: 'Your stacked R sweeps the dipped HP bars \u2014 keep volleying and the execute does the rest.', spikeLine: 'Blackfire Torch online \u2014 volleys burn and the execute bar fills faster.',
    spikeItem: 'Blackfire Torch spike \u2014 chip relentlessly.', lvl6Spike: 'Golden Eclipse online \u2014 every stacked target carries a countdown.',
    fbVerb: 'out-range him and stack Overwhelm', fbAction: 'fan volleys on his CS and reflect his answer', fbDo: 'Fan Q volleys across his last-hit positions', dosTail: 'Hold W Rebuttal for his one real spell \u2014 the reflect flips whole trades.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Blackfire Torch rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Blackfire Torch', 'Shadowflame'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Radiant Volley', note: 'Max 1st \u00b7 fan poke' },
      { k: 'W', color: '#9b8cff', label: 'Rebuttal', note: 'Max last \u00b7 reflect + MS' },
      { k: 'E', color: '#e8b84b', label: 'Solar Snare', note: 'Max 2nd \u00b7 root zone' },
      { k: 'R', color: '#ff5d6c', label: 'Golden Eclipse', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Volley Poke', keys: ['Q'], tone: '#46c6f5', tier: 'Safe', when: 'Fan the volley across his last-hit spot \u2014 every pellet stacks Overwhelm.' },
      { name: 'Snare Burst', keys: ['E', 'Q', 'Q'], tone: '#e8b84b', tier: 'Trade', when: 'Snare through the wave, double volley the lock, step back before his answer.' },
      { name: 'Reflect Counter', keys: ['W', 'Q'], tone: '#9b8cff', tier: 'Defensive', when: 'His key spell flies: Rebuttal it back and counter-volley while he stares.' },
      { name: 'Eclipse Execute', keys: ['E', 'Q', 'R'], tone: '#ff5d6c', tier: 'Kill', when: 'He\u2019s stacked and under 40%: snare, volley, and let Golden Eclipse finish the math.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights from the back line \u2014 volley the frontline to stack Overwhelm, reflect the scariest projectile, and sweep the dipped bars with Golden Eclipse.',
    teamLookFor: [{ label: 'Stacked targets dipping low', tone: '#ff5d6c' }, { label: 'A projectile to reflect', tone: '#9b8cff' }, { label: 'Their dive spent', tone: '#46c6f5' }, { label: 'A choke to snare', tone: '#e8b84b' }],
    teamPositioning: ['Max range \u2014 your volleys stack from safety.', 'Rebuttal their engage spell, not their chip.', 'Snare the choke they must walk through.', 'R when two or more bars dip \u2014 it sweeps.']
  },
  Lucian: {
    dataKey: 'lucian', sub: 'Marksman \u00b7 Dash Weave \u00b7 Tempo', label: '#b9c8e8', tint: 'rgba(150,170,220,0.42)',
    classLabel: 'Marksman', winStyle: 'Tempo / Burst', ultVerdict: 'THE CULLING',
    lateSwing: 'You\u2019re the second ADC now \u2014 weave through fights and burst the divers off your carry.', spikeLine: 'First item online \u2014 the dash-weave string deletes half bars; force it.',
    spikeItem: 'Kraken / ER spike \u2014 force the issue now.', lvl6Spike: 'The Culling online \u2014 execute recalls and escapes through walls.',
    fbVerb: 'bully him off CS with double-shots', fbAction: 'weave the Q-AA-E-AA string and exit clean', fbDo: 'Doubletap every step-up he takes', dosTail: 'Every spell buys a Lightslinger doubletap \u2014 a string without woven autos is half a string.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Kraken Slayer / Essence Reaver rush'],
    buildCore: ['Berserker\u2019s Greaves', 'Kraken Slayer / Essence Reaver', 'Navori / The Collector'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Piercing Light', note: 'Max 1st \u00b7 through-wave poke' },
      { k: 'W', color: '#9b8cff', label: 'Ardent Blaze', note: 'Max last \u00b7 mark + MS' },
      { k: 'E', color: '#e8b84b', label: 'Relentless Pursuit', note: 'Max 2nd \u00b7 dash reset' },
      { k: 'R', color: '#ff5d6c', label: 'The Culling', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Poke String', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Safe', when: 'Q through the wave onto his last-hit, step in for the doubletap, step out.' },
      { name: 'Full Weave', keys: ['Q', 'AA', 'E', 'AA', 'W', 'AA'], tone: '#e8b84b', tier: 'Trade', when: 'His key spell is down: the full string \u2014 every cast buys a doubletap.' },
      { name: 'Culling Finish', keys: ['E', 'R'], tone: '#ff5d6c', tier: 'Kill', when: 'He runs low: dash the angle and channel R through the wave or wall.' },
      { name: 'Exit Dash', keys: ['E'], tone: '#9b8cff', tier: 'Defensive', when: 'His engage starts: E sideways \u2014 the dash is your exit, never your entrance.' }
    ],
    isFlank: false,
    teamWinCon: 'You win the first fifteen minutes \u2014 bully the lane, break the tower, roam mid, and arrive at teamfights as a second ADC who bursts whatever dives your carry.',
    teamLookFor: [{ label: 'Their engage spent', tone: '#46c6f5' }, { label: 'A diver to burst off your carry', tone: '#e8b84b' }, { label: 'E held as the exit', tone: '#9b8cff' }, { label: 'A wall to Culling through', tone: '#ff5d6c' }],
    teamPositioning: ['Play with the team \u2014 your splitpush days end at 25 minutes.', 'Weave strings into whoever dives your carry.', 'Keep E chambered as the exit, always.', 'R through walls at fleeing HP bars.']
  },
  Lillia: {
    dataKey: 'lillia', sub: 'Skirmisher \u00b7 Kite \u00b7 Burn', label: '#d4a8e8', tint: 'rgba(190,140,220,0.46)',
    classLabel: 'Kiter', winStyle: 'Kite / Burn', ultVerdict: 'LILTING LULLABY',
    lateSwing: 'Sleep two from fog and kite the rest \u2014 your burn eats whole HP bars while untouched.', spikeLine: 'Liandry\u2019s online \u2014 Dream Dust + burn melts juggernauts and tanks alike.',
    spikeItem: 'Liandry\u2019s spike \u2014 every trade burns deeper.', lvl6Spike: 'Lilting Lullaby online \u2014 every gank is a guaranteed kill and every overstep a sleep-execute.',
    fbVerb: 'kite him on the Q outer ring', fbAction: 'ring the step-up and jog away from the engage', fbDo: 'Hit the Q outer ring on every step-up', dosTail: 'The outer ring is the whole champion \u2014 inner-ring hits are half damage and no true damage.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Liandry\u2019s Torment rush'],
    buildCore: ['Boots of Swiftness', 'Liandry\u2019s Torment', 'Riftmaker / Rylai\u2019s'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Blooming Blows', note: 'Max 1st \u00b7 outer-ring true dmg + MS' },
      { k: 'W', color: '#9b8cff', label: 'Watch Out! Eep!', note: 'Max 2nd \u00b7 sweetspot nuke' },
      { k: 'E', color: '#e8b84b', label: 'Swirlseed', note: 'Max last \u00b7 rolling slow' },
      { k: 'R', color: '#ff5d6c', label: 'Lilting Lullaby', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Ring Kite', keys: ['Q', 'Q'], tone: '#46c6f5', tier: 'Safe', when: 'Outer-ring his step-up, jog the passive speed, ring again as he gives chase.' },
      { name: 'Sweetspot Punish', keys: ['Q', 'W'], tone: '#9b8cff', tier: 'Trade', when: 'He commits to the chase: Q for speed, spin W so the sweetspot lands where he\u2019s running.' },
      { name: 'Sleep Execute', keys: ['E', 'R', 'W', 'Q'], tone: '#ff5d6c', tier: 'Kill', when: 'Seed from fog, sleep the slow, walk the W sweetspot onto the dreaming body.' },
      { name: 'Disengage', keys: ['E', 'Q'], tone: '#e8b84b', tier: 'Defensive', when: 'His engage starts: seed the path, ring the closest threat, and jog out on the speed.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights by exhaustion \u2014 sleep two from fog, kite the frontline in circles on the outer ring, and let Dream Dust burn whole HP bars.',
    teamLookFor: [{ label: '2+ enemies to sleep', tone: '#ff5d6c' }, { label: 'A chase to punish with W', tone: '#9b8cff' }, { label: 'Q speed stacked', tone: '#46c6f5' }, { label: 'Fog angles for E-R', tone: '#e8b84b' }],
    teamPositioning: ['Never stop moving \u2014 stillness is death.', 'E-R the clump from fog before the fight starts.', 'Kite the frontline on the outer ring.', 'W-sweetspot whatever sleeps or chases.']
  },
  Kassadin: {
    dataKey: 'kassadin', sub: 'Hyperscaler \u00b7 Anti-Mage \u00b7 Riftwalk', label: '#a78ce8', tint: 'rgba(140,110,220,0.5)',
    classLabel: 'Hyperscaler', winStyle: 'Scale / Blink Burst', ultVerdict: 'RIFTWALK',
    lateSwing: 'Stacked Riftwalk Kassadin is the endgame boss \u2014 blink onto carries and leave before the fight sees you.', spikeLine: 'Rod of Ages online \u2014 the blink-trade pattern now genuinely chunks.',
    spikeItem: 'ROA spike \u2014 start hunting oversteps.', lvl6Spike: 'Riftwalk online \u2014 you\u2019re mobile at last; short blink-trades start working.',
    fbVerb: 'survive to 6 and out-scale him', fbAction: 'Q-shield the trade and farm at max range', fbDo: 'Last-hit at maximum range, always', dosTail: 'Q\u2019s shield only blocks magic \u2014 time it for the spell, not the auto.',
    buildStart: ['Doran\u2019s Shield + Health Potion', 'Tear \u2192 Rod of Ages rush'],
    buildCore: ['Mercury\u2019s Treads', 'Rod of Ages', 'Seraph\u2019s Embrace'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Null Sphere', note: 'Max 1st \u00b7 poke + magic shield' },
      { k: 'W', color: '#9b8cff', label: 'Nether Blade', note: 'Max last \u00b7 mana refund + burst' },
      { k: 'E', color: '#e8b84b', label: 'Force Pulse', note: 'Max 2nd \u00b7 cone + slow' },
      { k: 'R', color: '#ff5d6c', label: 'Riftwalk', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Survival Farm', keys: ['Q'], tone: '#46c6f5', tier: 'Safe', when: 'Pre-6: Q for the shield right before his poke lands, last-hit, give nothing.' },
      { name: 'Blink Trade', keys: ['R', 'Q', 'E', 'W'], tone: '#e8b84b', tier: 'Trade', when: 'His key spell is down: Riftwalk in, full rotation, walk out behind the shield.' },
      { name: 'Execute Chain', keys: ['R', 'E', 'Q', 'R'], tone: '#ff5d6c', tier: 'Kill', when: 'Post-11: blink in, slow, burst, and blink again \u2014 nothing escapes double Riftwalk.' },
      { name: 'Blink Kite', keys: ['R'], tone: '#9b8cff', tier: 'Defensive', when: 'The dive commits: Riftwalk over the wall \u2014 the cooldown is shorter than their patience.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights by deleting the backline \u2014 blink onto the carry, Q-silence the answer, dump the rotation, and Riftwalk out before peel arrives.',
    teamLookFor: [{ label: 'Their carry isolated', tone: '#e8b84b' }, { label: 'Peel and CC spent', tone: '#46c6f5' }, { label: 'Riftwalk stacks banked', tone: '#ff5d6c' }, { label: 'Seraph\u2019s shield up', tone: '#3ddc97' }],
    teamPositioning: ['Hover the flank \u2014 you enter when their CC exits.', 'Blink onto the carry, never the tank.', 'Q the interrupt before it interrupts you.', 'Leave on the second Riftwalk \u2014 greed kills Kassadins.'],
    teamFlank: ['Hold the side angle until their CC is spent.', 'Riftwalk onto the carry in one blink.', 'Q-E-W rotation, then blink out.', 'Go around their front line to reach the backline.']
  },
  Karma: {
    dataKey: 'karma', sub: 'Enchanter-Mage \u00b7 Poke \u00b7 Tempo', label: '#7fe3c8', tint: 'rgba(80,200,170,0.46)',
    classLabel: 'Enchanter-Mage', winStyle: 'Poke / Tempo', ultVerdict: 'MANTRA',
    lateSwing: 'RE speed-ups and big shields win fights you never enter \u2014 peel and poke the objective.', spikeLine: 'First item online \u2014 the RQ chunk keeps him permanently under 60%.',
    spikeItem: 'Malignance / Torch spike \u2014 tax every CS.', lvl6Spike: 'No new ult \u2014 Mantra has been online since level 1; respect HIS 6 instead.',
    fbVerb: 'poke him off the wave with RQ', fbAction: 'RQ the step-up and shield his answer', fbDo: 'RQ his last-hit positions on cooldown', dosTail: 'Mantra is a level-1 resource \u2014 budget one RQ per trade window and never cast it into a blocked lane.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Malignance / Blackfire Torch rush'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Malignance / Blackfire Torch', 'Cosmic Drive'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Inner Flame', note: 'Max 1st \u00b7 poke (RQ = slow field)' },
      { k: 'W', color: '#9b8cff', label: 'Focused Resolve', note: 'Max last \u00b7 tether root' },
      { k: 'E', color: '#e8b84b', label: 'Inspire', note: 'Max 2nd \u00b7 shield + speed' },
      { k: 'R', color: '#ff5d6c', label: 'Mantra', note: 'Online level 1 \u00b7 ranks 6 / 11 / 16' }
    ],
    combos: [
      { name: 'RQ Poke', keys: ['R', 'Q'], tone: '#46c6f5', tier: 'Safe', when: 'Mantra-Q his farming spot \u2014 the detonation field punishes him for standing his ground.' },
      { name: 'Tether Punish', keys: ['Q', 'W', 'AA'], tone: '#9b8cff', tier: 'Trade', when: 'He oversteps: Q, tether, and hold the leash until the root snaps him in place.' },
      { name: 'Shield Kite', keys: ['E', 'Q'], tone: '#e8b84b', tier: 'Defensive', when: 'His engage commits: shield-sprint out and Q the chase as the gap reopens.' },
      { name: 'Team Sprint', keys: ['R', 'E'], tone: '#ff5d6c', tier: 'Utility', when: 'Fight forming: Mantra-E shields and speeds everyone near you \u2014 the fight arrives faster.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights with tempo \u2014 RQ poke softens the objective standoff, RE sprints your team into position first, and the W root catches whoever lingers.',
    teamLookFor: [{ label: 'A standoff to RQ-poke', tone: '#46c6f5' }, { label: 'Your team needing the RE sprint', tone: '#3ddc97' }, { label: 'A carry to shield', tone: '#e8b84b' }, { label: 'An overstep to tether', tone: '#9b8cff' }],
    teamPositioning: ['Second line \u2014 poke ahead of your frontline.', 'RE the engage or the retreat; it wins both.', 'Shield the dive target before the dive lands.', 'Tether-root the diver that commits.']
  },
  Graves: {
    dataKey: 'graves', sub: 'Marksman-Bruiser \u00b7 Buckshot \u00b7 Pick', label: '#d9a05a', tint: 'rgba(200,140,70,0.46)',
    classLabel: 'Shotgunner', winStyle: 'Brawl / Pick', ultVerdict: 'COLLATERAL DAMAGE',
    lateSwing: 'Smoke their engage and R-snipe the picks \u2014 straight 5v5s favor crit carries, not you.', spikeLine: 'Eclipse online \u2014 the point-blank pattern removes half bars; force fights near walls.',
    spikeItem: 'Eclipse / Hubris spike \u2014 brawl point-blank.', lvl6Spike: 'Collateral Damage online \u2014 an execute and a knockback disengage in one button.',
    fbVerb: 'out-brawl him point-blank with buckshot', fbAction: 'land all pellets and E away with grit armor', fbDo: 'Take point-blank trades where every pellet lands', dosTail: 'Count your shells \u2014 stepping up on an empty chamber is stepping up unarmed.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Serrated Dirk \u2192 Eclipse rush'],
    buildCore: ['Plated Steelcaps / Mercs', 'Eclipse / Hubris', 'The Collector'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'End of the Line', note: 'Max 1st \u00b7 wall-bounce burst' },
      { k: 'W', color: '#9b8cff', label: 'Smoke Screen', note: 'Max last \u00b7 nearsight zone' },
      { k: 'E', color: '#e8b84b', label: 'Quickdraw', note: 'Max 2nd \u00b7 dash + grit armor' },
      { k: 'R', color: '#ff5d6c', label: 'Collateral Damage', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Wall Bounce', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'Q against terrain so both the line and the return detonation land \u2014 double damage near walls.' },
      { name: 'Shell Weave', keys: ['AA', 'E', 'AA'], tone: '#e8b84b', tier: 'Trade', when: 'Point-blank: auto, Quickdraw for the reset + grit, auto again \u2014 then reload behind the wave.' },
      { name: 'Smoke Pick', keys: ['W', 'E', 'Q', 'AA'], tone: '#9b8cff', tier: 'Kill', when: 'Smoke breaks his vision: dash in blind-side, wall-bounce Q, unload the chamber.' },
      { name: 'Collateral Exit', keys: ['R'], tone: '#ff5d6c', tier: 'Utility', when: 'Execute the runner \u2014 or fire it point-blank as a knockback disengage when the dive turns.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights with picks \u2014 smoke their engage angle, point-blank whoever wanders, and R-snipe the low-HP exits across walls.',
    teamLookFor: [{ label: 'A loner to point-blank', tone: '#e8b84b' }, { label: 'An engage to smoke off', tone: '#9b8cff' }, { label: 'Shells chambered', tone: '#46c6f5' }, { label: 'A wall for the Q bounce', tone: '#3ddc97' }],
    teamPositioning: ['Brawl the edge of the fight, not the middle.', 'Smoke their engage \u2014 nearsight blanks divers.', 'E through the fight for grit armor stacks.', 'Hold R as execute or the panic knockback.'],
    teamFlank: ['Loop through jungle walls toward their backline.', 'Smoke the peel before you commit.', 'Wall-bounce Q + full chamber on the carry.', 'Go around their front line to reach the backline.']
  },
  Cassiopeia: {
    dataKey: 'cassiopeia', sub: 'Battle Mage \u00b7 DPS \u00b7 Anti-Dash', label: '#9fdc6a', tint: 'rgba(140,210,90,0.46)',
    classLabel: 'Battle Mage', winStyle: 'Sustained DPS', ultVerdict: 'PETRIFYING GAZE',
    lateSwing: 'You out-DPS carries while walking \u2014 R the dive and E-spam whatever\u2019s stunned.', spikeLine: 'Seraph\u2019s / Liandry\u2019s online \u2014 your sustained DPS out-damages every melee top.',
    spikeItem: 'Mana item spike \u2014 the treadmill never stops now.', lvl6Spike: 'Petrifying Gaze online \u2014 every face-check and all-in flips into your E-spam.',
    fbVerb: 'out-DPS him on the poison treadmill', fbAction: 'poison the step-up and ground his engage', fbDo: 'Q-poison every last-hit attempt', dosTail: 'E only poisoned targets \u2014 unpoisoned fangs cost triple the mana for half the damage.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Tear \u2192 Seraph\u2019s / Liandry\u2019s rush'],
    buildCore: ['No boots \u2014 Serpentine Grace', 'Seraph\u2019s / Liandry\u2019s', 'Rylai\u2019s Crystal Scepter'],
    skillSeq: ['Q', 'W', 'E', 'E', 'E', 'R', 'E', 'Q', 'E', 'Q', 'R', 'Q', 'Q', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Noxious Blast', note: 'Max 2nd \u00b7 poison + haste' },
      { k: 'W', color: '#9b8cff', label: 'Miasma', note: 'Max last \u00b7 ground + poison' },
      { k: 'E', color: '#e8b84b', label: 'Twin Fang', note: 'Max 1st \u00b7 spam DPS on poisoned' },
      { k: 'R', color: '#ff5d6c', label: 'Petrifying Gaze', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Poison Cycle', keys: ['Q', 'E', 'E'], tone: '#46c6f5', tier: 'Safe', when: 'Q his last-hit spot, twin fang twice on the poison timer, reset to range.' },
      { name: 'Ground Punish', keys: ['W', 'E', 'E', 'E'], tone: '#9b8cff', tier: 'Trade', when: 'His dash threatens: Miasma the path \u2014 grounded targets can\u2019t dash and the fangs feast.' },
      { name: 'Gaze Flip', keys: ['R', 'W', 'E', 'E'], tone: '#ff5d6c', tier: 'Kill', when: 'He all-ins: R the face-check stun, ground the exit, E-spam the statue.' },
      { name: 'Kite Spam', keys: ['E', 'E'], tone: '#e8b84b', tier: 'Chase', when: 'He runs poisoned: walk-and-fang \u2014 your E has no cast lockout while moving.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights with the treadmill \u2014 R the divers face-first, ground their exits with Miasma, and out-DPS their whole frontline with walking Twin Fangs.',
    teamLookFor: [{ label: 'A dive to R face-on', tone: '#ff5d6c' }, { label: 'Dash paths to ground', tone: '#9b8cff' }, { label: 'Poisoned targets to spam', tone: '#9fdc6a' }, { label: 'Mana banked for the long fight', tone: '#46c6f5' }],
    teamPositioning: ['Second line \u2014 you out-DPS anything that reaches you.', 'R the engage face-first; never waste it on backs.', 'Miasma the choke their divers must cross.', 'Walk-and-fang \u2014 your DPS works while kiting.']
  },
  Akshan: {
    dataKey: 'akshan', sub: 'Marksman-Assassin \u00b7 Swing \u00b7 Revive', label: '#e8cf8f', tint: 'rgba(220,185,110,0.46)',
    classLabel: 'Rogue Marksman', winStyle: 'Pick / Revive', ultVerdict: 'COMEUPPANCE',
    lateSwing: 'Swing angles into their backline and execute the chipped \u2014 every revive un-loses a fight.', spikeLine: 'First item online \u2014 the swing-fire pattern removes half bars.',
    spikeItem: 'Kraken / Hubris spike \u2014 take over the lane.', lvl6Spike: 'Comeuppance online \u2014 the lock-on execute closes everything you chip.',
    fbVerb: 'out-trade him with three-hit procs', fbAction: 'boomerang the wave and swing the angles he can\u2019t answer', fbDo: 'Proc the three-hit passive and disengage', dosTail: 'E is the exit, not the entrance \u2014 a swing into a loaded kit is a stationary marksman in melee range.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Kraken Slayer / Hubris rush'],
    buildCore: ['Berserker\u2019s Greaves', 'Kraken Slayer / Hubris', 'The Collector'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Avengerang', note: 'Max 1st \u00b7 double-pass poke' },
      { k: 'W', color: '#9b8cff', label: 'Going Rogue', note: 'Max last \u00b7 camo + scoundrels' },
      { k: 'E', color: '#e8b84b', label: 'Heroic Swing', note: 'Max 2nd \u00b7 terrain swing + fire' },
      { k: 'R', color: '#ff5d6c', label: 'Comeuppance', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Three-Hit Trade', keys: ['Q', 'AA', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'Q both boomerang passes, double-auto the passive proc, sprint-shield away on the MS.' },
      { name: 'Swing Angle', keys: ['E', 'AA', 'Q'], tone: '#e8b84b', tier: 'Engage', when: 'Open from terrain: swing the arc firing the whole way, Q on landing, three-hit and out.' },
      { name: 'Execute Channel', keys: ['Q', 'AA', 'R'], tone: '#ff5d6c', tier: 'Kill', when: 'He\u2019s chipped with his interrupt down: lock Comeuppance and let the bullets do the math.' },
      { name: 'Rogue Reset', keys: ['W'], tone: '#9b8cff', tier: 'Utility', when: 'Caught or roaming: camo in the brush line, mark the scoundrel, and pick your re-entry.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights with picks and the revive economy \u2014 swing into their backline, execute the chipped carry, and turn every dead teammate into a comeback clause.',
    teamLookFor: [{ label: 'A chipped carry to execute', tone: '#ff5d6c' }, { label: 'Teammates to revive on the kill', tone: '#3ddc97' }, { label: 'Terrain for the swing angle', tone: '#e8b84b' }, { label: 'Their interrupt spent before R', tone: '#46c6f5' }],
    teamPositioning: ['Play the edge \u2014 swing angles beat front-line autos.', 'Execute the chipped, not the full bars.', 'Kill the scoundrel \u2014 the revive flips fights.', 'Channel R only after their interrupt is spent.'],
    teamFlank: ['Swing through jungle terrain toward their backline.', 'Camo the approach with W.', 'Three-hit the carry, R the retreat.', 'Go around their front line to reach the backline.']
  }
};

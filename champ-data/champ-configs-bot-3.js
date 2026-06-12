// MatchupCoach — CHAMPS engine configs for BOT (3/3): Senna→Xayah + APCs.
window.CHAMP_CONFIGS_BOT = Object.assign(window.CHAMP_CONFIGS_BOT || {}, {
  Senna: {
    dataKey: 'senna_bot', sub: 'Marksman \u00b7 Soul Scaling \u00b7 Redeemer', label: '#9fd8c8', tint: 'rgba(130,200,180,0.5)',
    classLabel: 'Marksman', winStyle: 'Souls / Global Range', ultVerdict: 'DAWNING SHADOW',
    lateSwing: 'Late Senna out-ranges the game \u2014 infinite souls, global beams, and a mist that hides teamfights.', spikeLine: 'First item online \u2014 the Q chip chunks.',
    spikeItem: 'Soul thresholds \u2014 the range war is pre-won.', lvl6Spike: 'Dawning Shadow online \u2014 the map is your lane.',
    fbVerb: 'out-collect his finite curve', fbAction: 'Q off anything targetable and root the commits', fbDo: 'Cast Q off anything targetable \u2014 the angles are the champion', dosTail: 'The mist hides teams, not mistakes \u2014 collecting into hooks is how curators retire.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Pickaxe / Zeal piece'],
    buildCore: ['Swiftness / Berserker\u2019s', 'Statikk / BotRK', 'RFC path'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Piercing Darkness', note: 'Max 1st \u00b7 heals + chips' },
      { k: 'W', color: '#9b8cff', label: 'Last Embrace', note: 'Max 2nd \u00b7 spreading root' },
      { k: 'E', color: '#e8b84b', label: 'Black Mist', note: 'Max last \u00b7 team camouflage' },
      { k: 'R', color: '#ff5d6c', label: 'Dawning Shadow', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Angle Chip', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Poke', when: 'Any target in line: the Q heals allies and bills enemies in one cast.' },
      { name: 'Embrace Pick', keys: ['W', 'Q', 'AA'], tone: '#9b8cff', tier: 'Kill', when: 'He stands near units: the root spreads \u2014 chip the held pair.' },
      { name: 'Mist Engage', keys: ['E'], tone: '#e8b84b', tier: 'Utility', when: 'Fight forming: shroud the team \u2014 the approach happens in fog.' },
      { name: 'Global Save', keys: ['R'], tone: '#ff5d6c', tier: 'Map', when: 'Anyone anywhere: shield the dive, bill the diver \u2014 from base.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights by out-ranging the concept \u2014 chip from two screens, mist the engage, and beam the verdicts globally.',
    teamLookFor: [{ label: 'Souls collected on schedule', tone: '#46c6f5' }, { label: 'Roots through bodies', tone: '#9b8cff' }, { label: 'Mist for the approach', tone: '#e8b84b' }, { label: 'Beam angles cross-map', tone: '#ff5d6c' }],
    teamPositioning: ['Collect behind the fight, never inside it.', 'Root through units \u2014 the wrap-around catches.', 'Mist the engage, not the retreat.', 'The beam saves first and bills second.']
  },
  Sivir: {
    dataKey: 'sivir_bot', sub: 'Marksman \u00b7 Wave Control \u00b7 Battle Mistress', label: '#e8d08f', tint: 'rgba(220,190,110,0.5)',
    classLabel: 'Marksman', winStyle: 'Tempo / Utility', ultVerdict: 'ON THE HUNT',
    lateSwing: 'Late Sivir conducts \u2014 speed the engage, shield the answer, ricochet the formation.', spikeLine: 'ER online \u2014 the ricochet shreds duos.',
    spikeItem: 'Two-item spike \u2014 the metronome owns the map.', lvl6Spike: 'On the Hunt online \u2014 the team-speed flips engages both directions.',
    fbVerb: 'out-tempo him to the tower', fbAction: 'shield the keystone and shove the clock', fbDo: 'Shield the keystone \u2014 the E is a verdict, not a flinch', dosTail: 'The shield eats ONE spell \u2014 spent on bait, the real cast arrives to a refunded apology.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Noonquiver'],
    buildCore: ['Berserker\u2019s Greaves', 'ER / Statikk', 'IE / Runaan\u2019s'],
    skillSeq: ['W', 'Q', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Boomerang Blade', note: 'Max 2nd \u00b7 both passes bill' },
      { k: 'W', color: '#9b8cff', label: 'Ricochet', note: 'Max 1st \u00b7 the metronome' },
      { k: 'E', color: '#e8b84b', label: 'Spell Shield', note: 'The keystone eater' },
      { k: 'R', color: '#ff5d6c', label: 'On the Hunt', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Boomerang Bill', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Poke', when: 'Contact: both passes through the duo \u2014 sidestep the return yourself.' },
      { name: 'Metronome', keys: ['W', 'AA'], tone: '#9b8cff', tier: 'Shove', when: 'Every wave: ricochet the clear \u2014 his missed CS is your poke ledger.' },
      { name: 'The Verdict', keys: ['E'], tone: '#e8b84b', tier: 'Counter', when: 'Their keystone flies: eat it, refund the mana, smile professionally.' },
      { name: 'Hunt Call', keys: ['R'], tone: '#ff5d6c', tier: 'Teamfight', when: 'Engage or disengage: the wings speed the whole team\u2019s decision.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights as the conductor \u2014 hunt-speed the engage, shield their opener, and ricochet the formation through its own tanks.',
    teamLookFor: [{ label: 'Keystone shielded', tone: '#e8b84b' }, { label: 'Hunt timed to the engage', tone: '#ff5d6c' }, { label: 'Waves pre-shoved', tone: '#9b8cff' }, { label: 'Ricochet angles into the clump', tone: '#46c6f5' }],
    teamPositioning: ['Conduct \u2014 the R moves five people.', 'Shield their best button, nothing else.', 'Shove before every play \u2014 tempo is the kit.', 'Ricochet through the front line into the carries.']
  },
  Varus: {
    dataKey: 'varus_bot', sub: 'Marksman \u00b7 Poke & Root \u00b7 Arrow of Retribution', label: '#c0a8e8', tint: 'rgba(160,140,220,0.5)',
    classLabel: 'Marksman', winStyle: 'Poke / Pick', ultVerdict: 'CHAIN OF CORRUPTION',
    lateSwing: 'Late Varus picks and sieges \u2014 root the flank, charge the setup, detonate the blight.', spikeLine: 'First item online \u2014 the blight math chunks.',
    spikeItem: 'First item spike \u2014 the poke war is priced.', lvl6Spike: 'Chain online \u2014 duo clumps become dive invitations.',
    fbVerb: 'tax him per arrow', fbAction: 'charge the contacts and detonate the stacks', fbDo: 'Three stacks then Q \u2014 the blight detonation is the real trade', dosTail: 'The chain spreads off the FIRST target \u2014 aim at the spreader, not the tank.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Recurve / Tear by build'],
    buildCore: ['Berserker\u2019s / Lucidity', 'BotRK / Manamune', 'Terminus / Serylda\u2019s'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Piercing Arrow', note: 'Max 1st \u00b7 the toll' },
      { k: 'W', color: '#9b8cff', label: 'Blighted Quiver', note: 'The stack math' },
      { k: 'E', color: '#e8b84b', label: 'Hail of Arrows', note: 'Max 2nd \u00b7 grievous rain' },
      { k: 'R', color: '#ff5d6c', label: 'Chain of Corruption', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Toll Charge', keys: ['Q'], tone: '#46c6f5', tier: 'Poke', when: 'His CS attempt: the charged arrow taxes from beyond answer range.' },
      { name: 'Blight Pop', keys: ['AA', 'AA', 'AA', 'Q'], tone: '#9b8cff', tier: 'Trade', when: 'Three autos land: the Q detonates the stacks \u2014 the chunk hides in the math.' },
      { name: 'Grievous Rain', keys: ['E'], tone: '#e8b84b', tier: 'Zone', when: 'Sustain lanes: the rain cuts the healing and slows the argument.' },
      { name: 'Chain Dive', keys: ['R', 'Q', 'E'], tone: '#ff5d6c', tier: 'Kill', when: 'Duo clumped: chain the spreader \u2014 the root invites the whole team.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights at the root \u2014 chain the flank\u2019s spreader, charge the setup poke, and detonate whatever the team holds still.',
    teamLookFor: [{ label: 'Chain angles on clumps', tone: '#ff5d6c' }, { label: 'Blight stacks pre-loaded', tone: '#9b8cff' }, { label: 'Charge lanes from fog', tone: '#46c6f5' }, { label: 'Rain on their sustain', tone: '#e8b84b' }],
    teamPositioning: ['Chain the spreader \u2014 geometry multiplies it.', 'Charge from fog, release from safety.', 'Detonate stacks before they expire.', 'Rain the pit \u2014 grievous wins objective brawls.']
  },
  Xayah: {
    dataKey: 'xayah_bot', sub: 'Marksman \u00b7 Feather Control \u00b7 Rebel', label: '#d88fb8', tint: 'rgba(200,120,170,0.5)',
    classLabel: 'Marksman', winStyle: 'Roots / Anti-Dive', ultVerdict: 'FEATHERSTORM',
    lateSwing: 'Late Xayah un-dives \u2014 R their engage, call the storm\u2019s feathers, root the commitment.', spikeLine: 'First item online \u2014 the feather math chunks.',
    spikeItem: 'Two-item spike \u2014 the calls execute.', lvl6Spike: 'Featherstorm online \u2014 dives on Xayah are donations.',
    fbVerb: 'root him on the floor he ignored', fbAction: 'stack the lines and call the disengage', fbDo: 'Three feathers or no call \u2014 the root math is absolute', dosTail: 'The R is untargetability AND a reload \u2014 spend it on dives, not dodge drills.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Pickaxe / Zeal piece'],
    buildCore: ['Berserker\u2019s Greaves', 'Statikk / Collector', 'Infinity Edge'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Double Daggers', note: 'Max 1st \u00b7 lines + feathers' },
      { k: 'W', color: '#9b8cff', label: 'Deadly Plumage', note: 'Max 2nd \u00b7 the trade window' },
      { k: 'E', color: '#e8b84b', label: 'Bladecaller', note: 'The root that referees' },
      { k: 'R', color: '#ff5d6c', label: 'Featherstorm', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Line Builder', keys: ['Q', 'AA', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'Wave contact: daggers drop lines, autos drop more \u2014 the floor loads.' },
      { name: 'The Call', keys: ['E'], tone: '#e8b84b', tier: 'Kill', when: 'Three feathers cross him: the recall roots through everything.' },
      { name: 'Storm Reload', keys: ['R', 'E'], tone: '#ff5d6c', tier: 'Counter', when: 'Their dive commits: vanish, fan the feathers, root the landing party.' },
      { name: 'Plumage Window', keys: ['W', 'AA'], tone: '#9b8cff', tier: 'DPS', when: 'Real trade: the steroid window out-DPSes his pattern \u2014 trade inside it.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights backward \u2014 their engage feeds your storm, the storm reloads the floor, and the call roots the formation that committed.',
    teamLookFor: [{ label: 'Feather lines pre-laid', tone: '#46c6f5' }, { label: 'R held for their dive', tone: '#ff5d6c' }, { label: 'Three-feather calls only', tone: '#e8b84b' }, { label: 'W window for the DPS', tone: '#9b8cff' }],
    teamPositioning: ['Lay lines through the fight\u2019s axis.', 'Storm the dive \u2014 it reloads everything.', 'Call full lines \u2014 two feathers is confetti.', 'Un-dive first, DPS second.']
  },
  Heimerdinger: {
    dataKey: 'heimerdinger_bot', sub: 'APC \u00b7 Turret Nest \u00b7 Revered Inventor', label: '#f0d08f', tint: 'rgba(230,200,110,0.5)',
    classLabel: 'APC', winStyle: 'Zone / Architecture', ultVerdict: 'UPGRADE!!!',
    lateSwing: 'Late Heimer holds chokes \u2014 nest the pit and let the turrets vote on every entry.', spikeLine: 'First item online \u2014 the nest chunks and the rent compounds.',
    spikeItem: 'Blackfire spike \u2014 plates fund the empire.', lvl6Spike: 'Upgrade online \u2014 the R-turret deletes dives and the R-E stuns duos.',
    fbVerb: 'evict him from his own farm', fbAction: 'plant the nest and grenade the commits', fbDo: 'Plant before the wave meets \u2014 the nest is the matchup', dosTail: 'Three turrets in one AoE is one cooldown of rubble \u2014 stagger the architecture.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Blackfire / Liandry\u2019s', 'Rylai\u2019s'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'H-28G Turret', note: 'Max 1st \u00b7 the architecture' },
      { k: 'W', color: '#9b8cff', label: 'Hextech Micro-Rockets', note: 'Max 2nd \u00b7 the volley' },
      { k: 'E', color: '#e8b84b', label: 'CH-2 Grenade', note: 'The stun permit' },
      { k: 'R', color: '#ff5d6c', label: 'UPGRADE!!!', note: 'Empowers Q / W / E' }
    ],
    combos: [
      { name: 'Nest Trade', keys: ['E', 'W', 'AA'], tone: '#ff5d6c', tier: 'Kill', when: 'They step into the complex: stun, rockets, and three turret votes.' },
      { name: 'Architecture', keys: ['Q'], tone: '#46c6f5', tier: 'Zone', when: 'Every reset: plant staggered \u2014 the lane rents from you now.' },
      { name: 'R-Turret Anchor', keys: ['R', 'Q'], tone: '#9b8cff', tier: 'Teamfight', when: 'Dive incoming: the upgraded turret beams the formation.' },
      { name: 'R-Grenade Duo', keys: ['R', 'E'], tone: '#e8b84b', tier: 'Pick', when: 'Clumped duo: the upgraded stun bounces \u2014 both pay the permit.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights at home \u2014 nest the choke the fight must cross, stun the entry, and let the architecture out-vote the visitors.',
    teamLookFor: [{ label: 'Nest planted pre-fight', tone: '#46c6f5' }, { label: 'Grenade for the entry', tone: '#e8b84b' }, { label: 'R matched to the moment', tone: '#ff5d6c' }, { label: 'Rent collected in plates', tone: '#9b8cff' }],
    teamPositioning: ['Fight at home \u2014 always at home.', 'Stagger the towers; sweep-proof the block.', 'R-turret holds pits; R-grenade holds duos.', 'The nest fights while you reposition.']
  },
  Karthus: {
    dataKey: 'karthus_bot', sub: 'APC \u00b7 Iso DPS \u00b7 Deathsinger', label: '#b8e8e0', tint: 'rgba(150,200,195,0.5)',
    classLabel: 'APC', winStyle: 'Iso DPS / Global', ultVerdict: 'REQUIEM',
    lateSwing: 'Late Karthus attends fights twice \u2014 alive at the front, dead in the middle, global at the end.', spikeLine: 'First item online \u2014 iso-Qs delete.',
    spikeItem: 'Liandry\u2019s spike \u2014 the aura is a subscription.', lvl6Spike: 'Requiem online \u2014 every chip war on the map ends at your keyboard.',
    fbVerb: 'tax him in isolation math', fbAction: 'iso-Q the spread and aura the commits', fbDo: 'Isolate the Q targets \u2014 doubled hits are the lane', dosTail: 'The passive is seven seconds of revenge \u2014 die usefully or don\u2019t die.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Liandry\u2019s / Blackfire', 'Rabadon\u2019s path'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Lay Waste', note: 'Max 1st \u00b7 iso doubles' },
      { k: 'W', color: '#9b8cff', label: 'Wall of Pain', note: 'The slow-shred wall' },
      { k: 'E', color: '#e8b84b', label: 'Defile', note: 'Max 2nd \u00b7 the aura tax' },
      { k: 'R', color: '#ff5d6c', label: 'Requiem', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Iso Tax', keys: ['Q'], tone: '#46c6f5', tier: 'Poke', when: 'Spread-wrong duo: the isolated Q doubles \u2014 bill the loner.' },
      { name: 'Aura Stand', keys: ['E', 'Q', 'W'], tone: '#e8b84b', tier: 'Brawl', when: 'They commit: aura on, wall the path, Q the slowed regret.' },
      { name: 'The Verdict', keys: ['R'], tone: '#ff5d6c', tier: 'Global', when: 'The map\u2019s chip war leads: fire the Requiem and collect everywhere.' },
      { name: 'Dead Man Casting', keys: ['E', 'Q'], tone: '#9b8cff', tier: 'Passive', when: 'You die mid-fight: seven more seconds \u2014 walk in and keep billing.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights twice \u2014 the aura taxes the living version and the passive bills through the dead one; the Requiem audits whoever left early.',
    teamLookFor: [{ label: 'Iso targets for doubled Qs', tone: '#46c6f5' }, { label: 'Wall on their engage lane', tone: '#9b8cff' }, { label: 'Chip ledger for the R', tone: '#ff5d6c' }, { label: 'A useful place to die', tone: '#e8b84b' }],
    teamPositioning: ['Die in the middle \u2014 on purpose, on schedule.', 'Iso-Q the drifters.', 'Wall the choke, aura the crossing.', 'The R attends every fight \u2014 schedule it.']
  },
  Seraphine: {
    dataKey: 'seraphine_bot', sub: 'APC \u00b7 Echo Poke \u00b7 Starry-Eyed Songstress', label: '#e8b8e0', tint: 'rgba(220,160,210,0.5)',
    classLabel: 'APC', winStyle: 'Echo / Charm', ultVerdict: 'ENCORE',
    lateSwing: 'Late Seraphine conducts \u2014 charm the formation, echo the heals, root the remainder.', spikeLine: 'First item online \u2014 echoed Qs chunk.',
    spikeItem: 'Luden\u2019s spike \u2014 the note ledger compounds.', lvl6Spike: 'Encore online \u2014 fights start two screens early.',
    fbVerb: 'out-sustain and out-echo his lane', fbAction: 'bank the third note and chain the root', fbDo: 'Bank the third note \u2014 the echo is the matchup', dosTail: 'Your R extends through ALLIES \u2014 cast it around your team, not at the enemy.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Luden\u2019s / Moonstone', 'Rylai\u2019s'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'High Note', note: 'Max 1st \u00b7 the echo carrier' },
      { k: 'W', color: '#9b8cff', label: 'Surround Sound', note: 'Duo shield + heal' },
      { k: 'E', color: '#e8b84b', label: 'Beat Drop', note: 'Max 2nd \u00b7 slow\u2192root chain' },
      { k: 'R', color: '#ff5d6c', label: 'Encore', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Echo Chunk', keys: ['Q', 'Q'], tone: '#46c6f5', tier: 'Poke', when: 'Third note banked: the doubled Q bills the pair.' },
      { name: 'Beat Chain', keys: ['E', 'Q'], tone: '#e8b84b', tier: 'Pick', when: 'They\u2019re slowed: the drop roots \u2014 the song holds for the verse.' },
      { name: 'Sound Wall', keys: ['W'], tone: '#9b8cff', tier: 'Sustain', when: 'Chip war: the duo heals through what their duo can\u2019t.' },
      { name: 'The Encore', keys: ['R', 'E', 'Q'], tone: '#ff5d6c', tier: 'Teamfight', when: 'Team in line: the charm extends through every ally it touches.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights in chorus \u2014 encore through your own front line, root the charmed formation, and echo the heals through the answer.',
    teamLookFor: [{ label: 'Allies in the R line', tone: '#ff5d6c' }, { label: 'Third note banked', tone: '#46c6f5' }, { label: 'Slows to chain the root', tone: '#e8b84b' }, { label: 'Duo in W range', tone: '#9b8cff' }],
    teamPositioning: ['Encore through bodies \u2014 the charm extends.', 'Bank the echo for the moment, not the wave.', 'Root the slowed \u2014 the chain is the pick.', 'Heal the margins; the song compounds.']
  },
  Swain: {
    dataKey: 'swain_bot', sub: 'APC \u00b7 Drain General \u00b7 Noxian Grand General', label: '#e89fb0', tint: 'rgba(220,110,140,0.5)',
    classLabel: 'APC', winStyle: 'Root / Drain', ultVerdict: 'DEMONIC ASCENSION',
    lateSwing: 'Late Swain anchors \u2014 root the entry, ascend the middle, demonflare the formation.', spikeLine: 'Liandry\u2019s online \u2014 the drain out-paces duo DPS.',
    spikeItem: 'Liandry\u2019s spike \u2014 extended fights are donations.', lvl6Spike: 'Ascension online \u2014 invite the dives you used to fear.',
    fbVerb: 'root the formation and drain the answer', fbAction: 'land one E per cycle and pull the fragment', fbDo: 'Root the support first \u2014 the enabler is the matchup', dosTail: 'The E is the whole kill pattern \u2014 thrown at minions, the general is a mage with a cane.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Liandry\u2019s', 'Rylai\u2019s'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Death\u2019s Hand', note: 'Max 1st \u00b7 formation tax' },
      { k: 'W', color: '#9b8cff', label: 'Vision of Empire', note: 'The cross-map eye' },
      { k: 'E', color: '#e8b84b', label: 'Nevermove', note: 'Max 2nd \u00b7 the root' },
      { k: 'R', color: '#ff5d6c', label: 'Demonic Ascension', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Root Pull', keys: ['E', 'AA', 'Q'], tone: '#e8b84b', tier: 'Kill', when: 'The support steps wrong: root, pull the fragment, Q the formation.' },
      { name: 'Empire Eye', keys: ['E', 'W'], tone: '#9b8cff', tier: 'Pick', when: 'Root connects: the W never misses held targets \u2014 the chain chunks.' },
      { name: 'Drain Stand', keys: ['R', 'E', 'Q'], tone: '#ff5d6c', tier: 'Teamfight', when: '2v2 commits: ascend early, root the second wave, drain the bill.' },
      { name: 'Demonflare', keys: ['R', 'R'], tone: '#46c6f5', tier: 'Burst', when: 'They group to kill the bird: detonate the stacks they fed.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights by lasting \u2014 root their entry, ascend the center, and let the drain out-vote both carries.',
    teamLookFor: [{ label: 'Support rooted first', tone: '#e8b84b' }, { label: 'Ascension timed early', tone: '#ff5d6c' }, { label: 'W vision on the flanks', tone: '#9b8cff' }, { label: 'Demonflare stacks banked', tone: '#46c6f5' }],
    teamPositioning: ['Root the enabler, drain the abandoned.', 'Ascend at 80%, not 20%.', 'Eye the fog before the fight.', 'The bird eats commitment \u2014 invite it.']
  },
  Veigar: {
    dataKey: 'veigar_bot', sub: 'APC \u00b7 Doubled Homework \u00b7 Tiny Master of Evil', label: '#b89ff0', tint: 'rgba(150,120,220,0.5)',
    classLabel: 'APC', winStyle: 'Stack / Cage', ultVerdict: 'PRIMORDIAL BURST',
    lateSwing: 'Late Veigar cages chokes \u2014 the doubled curve decides every objective hallway.', spikeLine: 'Luden\u2019s online \u2014 cage-W chains chunk.',
    spikeItem: 'Luden\u2019s spike \u2014 the R audits squishies.', lvl6Spike: 'Primordial online \u2014 the enemy carry\u2019s half bar has your name on it.',
    fbVerb: 'bank the doubled lane and audit him', fbAction: 'self-cage the engage and stack the pairs', fbDo: 'Two units per Q \u2014 bot lane is a doubled ledger; bill it', dosTail: 'The cage\u2019s edge stuns and the center is a suggestion \u2014 self-cage means the CENTER.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Luden\u2019s', 'Seraph\u2019s / Rabadon\u2019s'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Baleful Strike', note: 'Max 1st \u00b7 paired stacks' },
      { k: 'W', color: '#9b8cff', label: 'Dark Matter', note: 'Max 2nd \u00b7 caged nuke' },
      { k: 'E', color: '#e8b84b', label: 'Event Horizon', note: 'The edge that stuns' },
      { k: 'R', color: '#ff5d6c', label: 'Primordial Burst', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Pair Stack', keys: ['Q'], tone: '#46c6f5', tier: 'Farm', when: 'Every cast through two: bot\u2019s doubled wave is the fastest bank in the game.' },
      { name: 'Cage Audit', keys: ['E', 'W', 'Q', 'R'], tone: '#ff5d6c', tier: 'Kill', when: 'Duo at the edge: stun both, Dark Matter the pair, R the survivor math.' },
      { name: 'Self-Cage', keys: ['E'], tone: '#e8b84b', tier: 'Defensive', when: 'Their engage commits: cage your own hitbox \u2014 the dash meets the wall.' },
      { name: 'The Audit', keys: ['R'], tone: '#9b8cff', tier: 'Execute', when: 'Their carry under half: count aloud, press once.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights with geometry plus arithmetic \u2014 cage the hallway, stun the formation\u2019s edge, and R-audit the half-bars.',
    teamLookFor: [{ label: 'Hallways to cage', tone: '#e8b84b' }, { label: 'Doubled stacks on schedule', tone: '#46c6f5' }, { label: 'Half-bars for the R', tone: '#ff5d6c' }, { label: 'Self-cage banked vs dive', tone: '#9b8cff' }],
    teamPositioning: ['Cage the choke before the fight crosses.', 'Center safe, edge stuns \u2014 teach them the difference.', 'R carries under half, never tanks over it.', 'The doubled lane is a gift \u2014 bank it.']
  },
  Ziggs: {
    dataKey: 'ziggs_bot', sub: 'APC \u00b7 Demolition \u00b7 Hexplosives Expert', label: '#f0c468', tint: 'rgba(232,184,75,0.5)',
    classLabel: 'APC', winStyle: 'Splash / Demolition', ultVerdict: 'MEGA INFERNO BOMB',
    lateSwing: 'Late Ziggs deletes furniture \u2014 satchel the towers, mine the chokes, R the stalemates.', spikeLine: 'Blackfire online \u2014 the bounce chunks pairs.',
    spikeItem: 'Blackfire spike \u2014 the satchel eats towers.', lvl6Spike: 'Mega Inferno online \u2014 clumped duos pay in twos.',
    fbVerb: 'splash the pair he stands in', fbAction: 'bounce the formation and satchel the dive', fbDo: 'Bounce at the pair, not the player \u2014 bot stands in formation; bill it', dosTail: 'The satchel executes LOW TOWERS \u2014 the demolition clause is the quiet superpower.',
    buildStart: ['Doran\u2019s Ring + 2 Health Potions', 'Lost Chapter'],
    buildCore: ['Sorcerer\u2019s Shoes', 'Blackfire Torch', 'Shadowflame'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Bouncing Bomb', note: 'Max 1st \u00b7 pair splash' },
      { k: 'W', color: '#9b8cff', label: 'Satchel Charge', note: 'Escape + demolition' },
      { k: 'E', color: '#e8b84b', label: 'Hexplosive Minefield', note: 'Max 2nd \u00b7 the zone' },
      { k: 'R', color: '#ff5d6c', label: 'Mega Inferno Bomb', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Pair Splash', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Poke', when: 'Duo contact: the bounce bills both \u2014 formation is a tax bracket.' },
      { name: 'Minefield Zone', keys: ['E', 'Q'], tone: '#e8b84b', tier: 'Trade', when: 'They step forward: mine the floor, bounce the slowed pair.' },
      { name: 'Demolition', keys: ['W'], tone: '#9b8cff', tier: 'Siege', when: 'Tower at 30%: the satchel executes it \u2014 architecture has a health bar.' },
      { name: 'Crater Call', keys: ['R'], tone: '#ff5d6c', tier: 'Teamfight', when: 'Duo clumped or wave stalled: the crater bills everything in formation.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights and floors \u2014 splash the formation, mine the choke, and satchel the towers your splash exposed.',
    teamLookFor: [{ label: 'Pairs in the bounce line', tone: '#46c6f5' }, { label: 'Towers at execute range', tone: '#9b8cff' }, { label: 'Chokes pre-mined', tone: '#e8b84b' }, { label: 'Clumps for the crater', tone: '#ff5d6c' }],
    teamPositioning: ['Bill in pairs \u2014 the splash is the lane.', 'Satchel towers, not tempo.', 'Mine the choke before the fight.', 'Crater the stall \u2014 stalemates pay double.']
  }
});

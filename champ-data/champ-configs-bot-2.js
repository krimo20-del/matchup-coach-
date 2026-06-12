// MatchupCoach — CHAMPS engine configs for BOT (2/3): Smolder→Zeri + utility marksmen.
window.CHAMP_CONFIGS_BOT = Object.assign(window.CHAMP_CONFIGS_BOT || {}, {
  Smolder: {
    dataKey: 'smolder_bot', sub: 'Marksman \u00b7 Stack Scaling \u00b7 Fledgling Dragon', label: '#f0c08f', tint: 'rgba(230,180,110,0.5)',
    classLabel: 'Marksman', winStyle: 'Stack / Execute', ultVerdict: 'MMOOOMMMM!',
    lateSwing: 'Late Smolder executes from the sky \u2014 glide the angle and let 225 stacks read the verdict.', spikeLine: 'Thresholds arriving \u2014 the homework is becoming a weapon.',
    spikeItem: '125-stack spike \u2014 the cleave arrives.', lvl6Spike: 'Mom online \u2014 fights near the breath line tilt blue.',
    fbVerb: 'out-stack him and execute the curve', fbAction: 'splash the trades and bank the counter', fbDo: 'Stack every safe execution \u2014 the counter is the matchup', dosTail: 'The glide is your only escape \u2014 spent chasing stacks, the next hook arrives mid-flap.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Sheen / Tear piece'],
    buildCore: ['Berserker\u2019s / Lucidity', 'ER / Trinity line', 'Spear of Shojin'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Super Scorcher Breath', note: 'Max 1st \u00b7 the homework' },
      { k: 'W', color: '#9b8cff', label: 'Achooo!', note: 'Max 2nd \u00b7 splash poke' },
      { k: 'E', color: '#e8b84b', label: 'Flap, Flap, Flap', note: 'Max last \u00b7 the glide' },
      { k: 'R', color: '#ff5d6c', label: 'MMOOOMMMM!', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Stack Routine', keys: ['Q'], tone: '#46c6f5', tier: 'Farm', when: 'Every execution range minion: the counter ticks toward the thresholds.' },
      { name: 'Sneeze Splash', keys: ['W', 'Q'], tone: '#9b8cff', tier: 'Trade', when: 'Duo contact: the sneeze slows and splashes; Q the marked pair.' },
      { name: 'Mom Call', keys: ['R', 'W', 'Q'], tone: '#ff5d6c', tier: 'Teamfight', when: 'All-in commits: mom strafes the line, heal in the center, Q the panic.' },
      { name: 'Glide Audit', keys: ['E', 'Q'], tone: '#e8b84b', tier: 'Execute', when: 'Post-225: glide the wall, Q-execute the lowest \u2014 the homework collects.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights with certainty \u2014 225 stacks executes through items, peel, and opinions; glide the angle and read the verdict.',
    teamLookFor: [{ label: 'Thresholds hit on schedule', tone: '#46c6f5' }, { label: 'Glide banked for the dive', tone: '#e8b84b' }, { label: 'Mom line on the fight', tone: '#ff5d6c' }, { label: 'Execute targets queued', tone: '#9b8cff' }],
    teamPositioning: ['Stack between fights \u2014 the counter never sleeps.', 'Glide over terrain, never into it.', 'Mom the choke they must cross.', '225 is the argument \u2014 arrive at it.']
  },
  Tristana: {
    dataKey: 'tristana_bot', sub: 'Marksman \u00b7 All-In Burst \u00b7 Yordle Gunner', label: '#f0a8c8', tint: 'rgba(230,140,180,0.5)',
    classLabel: 'Marksman', winStyle: 'All-In / Resets', ultVerdict: 'BUSTER SHOT',
    lateSwing: 'Late Trist jumps the resets \u2014 E the carry, R the peel, and jump out on the takedown.', spikeLine: 'First item online \u2014 the jump-bomb-R string deletes.',
    spikeItem: 'Kraken spike \u2014 the resets chain through fights.', lvl6Spike: 'Buster Shot online \u2014 the knockback flips dives both directions.',
    fbVerb: 'all-in him with the full bomb string', fbAction: 'bait the answer and jump the cooldown', fbDo: 'Four stacks or three steps back \u2014 the bomb math is the trade', dosTail: 'The jump resets ONLY on takedowns and full stacks \u2014 enter with a plan for both directions.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Noonquiver'],
    buildCore: ['Berserker\u2019s Greaves', 'Kraken / Stormrazor', 'Infinity Edge'],
    skillSeq: ['E', 'Q', 'W', 'E', 'E', 'R', 'E', 'Q', 'E', 'Q', 'R', 'Q', 'Q', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Rapid Fire', note: 'Max 2nd \u00b7 the steroid' },
      { k: 'W', color: '#9b8cff', label: 'Rocket Jump', note: 'Max last \u00b7 engage + escape' },
      { k: 'E', color: '#e8b84b', label: 'Explosive Charge', note: 'Max 1st \u00b7 the bomb' },
      { k: 'R', color: '#ff5d6c', label: 'Buster Shot', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Bomb Zone', keys: ['E', 'AA', 'AA'], tone: '#e8b84b', tier: 'Trade', when: 'Contact window: bomb, two stacks, back off at three \u2014 the threat zones.' },
      { name: 'Full String', keys: ['W', 'E', 'Q', 'R'], tone: '#ff5d6c', tier: 'Kill', when: 'Support CC lands: jump, bomb, rapid-fire the stacks, buster the Flash.' },
      { name: 'Reset Dive', keys: ['W'], tone: '#9b8cff', tier: 'Chase', when: 'Takedown lands: the jump re-arms \u2014 dive the tower or the next target.' },
      { name: 'Buster Peel', keys: ['R'], tone: '#46c6f5', tier: 'Defensive', when: 'Dove: knock the diver into your tower\u2019s jurisdiction.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights on commitment math \u2014 jump the window, detonate the fourth stack, and buster whatever answers.',
    teamLookFor: [{ label: 'CC to all-in off', tone: '#ff5d6c' }, { label: 'Bomb stacks at four', tone: '#e8b84b' }, { label: 'Jump reset available', tone: '#9b8cff' }, { label: 'R held for the peel', tone: '#46c6f5' }],
    teamPositioning: ['Jump with both directions planned.', 'Count the bomb aloud \u2014 four or back off.', 'Buster the diver, not the tank.', 'Takedowns re-arm everything \u2014 chain them.']
  },
  Twitch: {
    dataKey: 'twitch_bot', sub: 'Marksman \u00b7 Stealth Flank \u00b7 Plague Rat', label: '#a8d08f', tint: 'rgba(140,190,110,0.5)',
    classLabel: 'Marksman', winStyle: 'Venom / Flank', ultVerdict: 'SPRAY AND PRAY',
    lateSwing: 'Late Twitch flanks \u2014 stealth behind, R through the line, shred five bars per bolt path.', spikeLine: 'First item online \u2014 the stealth all-in deletes.',
    spikeItem: 'Runaan\u2019s spike \u2014 the flank shreds teams.', lvl6Spike: 'Spray and Pray online \u2014 every unswept brush is a won teamfight.',
    fbVerb: 'cash the full venom bill on him', fbAction: 'stack quietly and ambush the reset', fbDo: 'Cash E at full stacks \u2014 the ledger pays whole or not at all', dosTail: 'Stealth breaks on action \u2014 the ambush that fires early is just a rat introducing itself.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Recurve / Cutlass piece'],
    buildCore: ['Berserker\u2019s Greaves', 'BotRK / Kraken', 'Runaan\u2019s Hurricane'],
    skillSeq: ['E', 'Q', 'W', 'E', 'E', 'R', 'E', 'Q', 'E', 'Q', 'R', 'Q', 'Q', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Ambush', note: 'Max 2nd \u00b7 the stealth' },
      { k: 'W', color: '#9b8cff', label: 'Venom Cask', note: 'Max last \u00b7 the puddle' },
      { k: 'E', color: '#e8b84b', label: 'Contaminate', note: 'Max 1st \u00b7 the bill' },
      { k: 'R', color: '#ff5d6c', label: 'Spray and Pray', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Venom Trade', keys: ['AA', 'AA', 'AA', 'E'], tone: '#46c6f5', tier: 'Trade', when: 'Duo trade: three stacks then Contaminate \u2014 the bill arrives late.' },
      { name: 'Ambush Cash', keys: ['Q', 'W', 'AA', 'E'], tone: '#ff5d6c', tier: 'Kill', when: 'His reset walk: appear, puddle, stack to six, bill the whole ledger.' },
      { name: 'Flank Spray', keys: ['Q', 'R'], tone: '#9b8cff', tier: 'Teamfight', when: 'Unswept angle: stealth behind, R through the line \u2014 bolts hit everyone.' },
      { name: 'Puddle Brawl', keys: ['W', 'AA'], tone: '#e8b84b', tier: 'Zone', when: 'They contest the wave: cask the formation and stack the splash.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights you attended in secret \u2014 stealth the flank, R through their formation, and shred five health bars per bolt line.',
    teamLookFor: [{ label: 'Unswept flank brush', tone: '#9b8cff' }, { label: 'Six stacks to cash', tone: '#e8b84b' }, { label: 'Their sweepers counted', tone: '#46c6f5' }, { label: 'R line through the clump', tone: '#ff5d6c' }],
    teamPositioning: ['Count their sweepers like summoners.', 'Cash full ledgers only.', 'R through the line, not at the face.', 'The flank IS the champion \u2014 angle everything.'],
    teamFlank: ['Stealth the unswept path early.', 'Appear behind their carry line.', 'R through the formation\u2019s long axis.', 'Bill six stacks and vanish into the report screen.']
  },
  Vayne: {
    dataKey: 'vayne_bot', sub: 'Marksman \u00b7 True Damage \u00b7 Night Hunter', label: '#b0a8d8', tint: 'rgba(150,140,200,0.5)',
    classLabel: 'Marksman', winStyle: 'Percent Shred / Duel', ultVerdict: 'FINAL HOUR',
    lateSwing: 'Late Vayne is the 1v9 \u2014 kite the front line, condemn the diver, shred percent health.', spikeLine: 'BotRK online \u2014 the bolts melt.',
    spikeItem: 'Two-item spike \u2014 the duel court opens.', lvl6Spike: 'Final Hour online \u2014 tumbles stealth and the duels turn dishonest.',
    fbVerb: 'out-duel him with bolt procs', fbAction: 'trade thirds and condemn the wall fight', fbDo: 'Walls are jurisdiction \u2014 fight near yours, never backed against one', dosTail: 'The tumble is your dodge AND your DPS \u2014 sideways wins; forward testifies.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Cutlass / Recurve'],
    buildCore: ['Berserker\u2019s Greaves', 'BotRK', 'Guinsoo\u2019s / Terminus'],
    skillSeq: ['Q', 'W', 'E', 'W', 'W', 'R', 'W', 'Q', 'W', 'Q', 'R', 'Q', 'Q', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Tumble', note: 'Max 2nd \u00b7 the dance step' },
      { k: 'W', color: '#9b8cff', label: 'Silver Bolts', note: 'Max 1st \u00b7 percent TRUE damage' },
      { k: 'E', color: '#e8b84b', label: 'Condemn', note: 'Max last \u00b7 wall jurisdiction' },
      { k: 'R', color: '#ff5d6c', label: 'Final Hour', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Third Proc', keys: ['AA', 'Q', 'AA', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'Short window: auto, tumble sideways, two more \u2014 the bolts read true.' },
      { name: 'Wall Verdict', keys: ['E', 'AA', 'Q'], tone: '#ff5d6c', tier: 'Kill', when: 'He fights near YOUR wall: condemn-stun, proc the bolts, dance the answer.' },
      { name: 'Hour Dance', keys: ['R', 'Q', 'AA'], tone: '#9b8cff', tier: 'Duel', when: 'All-in: every tumble stealths \u2014 the duel happens on your screen only.' },
      { name: 'Anti-Dive', keys: ['E'], tone: '#e8b84b', tier: 'Defensive', when: 'Their diver commits along a wall line: the condemn writes the obituary.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights as the 1v9 \u2014 kite the front line on bolt math, condemn the diver into terrain, and shred percent health until the argument ends.',
    teamLookFor: [{ label: 'Walls on your side of the fight', tone: '#e8b84b' }, { label: 'Bolt procs on the tank', tone: '#46c6f5' }, { label: 'R hour timed to the dive', tone: '#9b8cff' }, { label: 'Peel for the dance', tone: '#ff5d6c' }],
    teamPositioning: ['Dance sideways \u2014 forward is testimony.', 'Condemn the diver, not the dream.', 'Tank bolts beat tank items \u2014 shoot the front line.', 'The hour stealths every tumble \u2014 spend it dueling.']
  },
  Zeri: {
    dataKey: 'zeri_bot', sub: 'Marksman \u00b7 Kite Machine \u00b7 Spark of Zaun', label: '#c8e88f', tint: 'rgba(180,220,110,0.5)',
    classLabel: 'Marksman', winStyle: 'Kite / Orbit', ultVerdict: 'LIGHTNING CRASH',
    lateSwing: 'Late Zeri orbits the fight \u2014 R the entry, chain the lightning, out-run every answer.', spikeLine: 'First item online \u2014 the Q stream melts.',
    spikeItem: 'Two-item spike \u2014 the kite war is rigged.', lvl6Spike: 'Lightning Crash online \u2014 extended fights stack speed past their aim.',
    fbVerb: 'out-kite him on wheels', fbAction: 'find the angles and surf the engage', fbDo: 'Manage the minion cover \u2014 the wave is his armor and your problem', dosTail: 'The surf is your only exit \u2014 spent entering, the orbit becomes a sitting battery.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Sheen / Noonquiver'],
    buildCore: ['Berserker\u2019s Greaves', 'Statikk / Trinity line', 'Runaan\u2019s / IE'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Burst Fire', note: 'Max 1st \u00b7 the skillshot autos' },
      { k: 'W', color: '#9b8cff', label: 'Ultrashock Laser', note: 'Max 2nd \u00b7 wall-amplified' },
      { k: 'E', color: '#e8b84b', label: 'Spark Surge', note: 'Max last \u00b7 the wall-dash' },
      { k: 'R', color: '#ff5d6c', label: 'Lightning Crash', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Gap Stream', keys: ['Q'], tone: '#46c6f5', tier: 'DPS', when: 'Open lane: the burst fire bills per gap \u2014 manage the floor.' },
      { name: 'Wall Laser', keys: ['W'], tone: '#9b8cff', tier: 'Poke', when: 'Terrain between you: the laser doubles through it \u2014 snipe the angle.' },
      { name: 'Orbit Opener', keys: ['R', 'Q', 'E'], tone: '#ff5d6c', tier: 'Teamfight', when: 'Fight commits: crash the edge, chain the stream, surf the lap lines.' },
      { name: 'Surge Exit', keys: ['E'], tone: '#e8b84b', tier: 'Defensive', when: 'Their engage lands: grind the wall out and resume from the new angle.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights measured in laps \u2014 R the edge, stack the speed, and out-run every aimed answer while the stream bills.',
    teamLookFor: [{ label: 'Open Q lanes managed', tone: '#46c6f5' }, { label: 'Walls for the laser', tone: '#9b8cff' }, { label: 'Long fight to orbit', tone: '#ff5d6c' }, { label: 'Surge banked for the exit', tone: '#e8b84b' }],
    teamPositioning: ['Never stop moving \u2014 stationary batteries die.', 'Laser through walls, not around them.', 'Orbit the fight\u2019s edge, not its center.', 'The longer the fight, the faster you are \u2014 extend them.']
  },
  Corki: {
    dataKey: 'corki_bot', sub: 'Marksman \u00b7 Mixed Poke \u00b7 Daring Bombardier', label: '#d8b88f', tint: 'rgba(200,170,110,0.5)',
    classLabel: 'Marksman', winStyle: 'Poke / Package', ultVerdict: 'MISSILE BARRAGE',
    lateSwing: 'Late Corki sieges with mail service \u2014 missile the setup, package the engage.', spikeLine: 'Trinity online \u2014 the missile war is yours.',
    spikeItem: 'Sheen spike \u2014 siege with the count.', lvl6Spike: 'Package timer live \u2014 the delivery flips river fights.',
    fbVerb: 'out-poke him in two currencies', fbAction: 'missile the contacts and strafe the windows', fbDo: 'Count to the big missile \u2014 it\u2019s your fourth ability', dosTail: 'The package is an objective \u2014 wasting the delivery on a dead lane is a dragon given away.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Sheen'],
    buildCore: ['Berserker\u2019s / Sorcerer\u2019s', 'Trinity Force / ER', 'Mixed-damage path'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Phosphorus Bomb', note: 'Max 1st \u00b7 AoE + reveal' },
      { k: 'W', color: '#9b8cff', label: 'Valkyrie / Package', note: 'The strafe + the delivery' },
      { k: 'E', color: '#e8b84b', label: 'Gatling Gun', note: 'Max 2nd \u00b7 resist shred' },
      { k: 'R', color: '#ff5d6c', label: 'Missile Barrage', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Missile Cadence', keys: ['R', 'R'], tone: '#ff5d6c', tier: 'Poke', when: 'On cooldown: every third missile is the BIG one \u2014 count aloud.' },
      { name: 'Splash Trade', keys: ['Q', 'E', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'Duo contact: bomb the pair, gatling the angle, walk before the answer.' },
      { name: 'Special Delivery', keys: ['W'], tone: '#9b8cff', tier: 'Engage', when: 'Package ready + river fight: the burn trail flips formations.' },
      { name: 'Strafe Out', keys: ['W'], tone: '#e8b84b', tier: 'Defensive', when: 'Their engage lands: Valkyrie the wall \u2014 the W is the third summoner.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights in two currencies \u2014 missile the setup war, package the engage, and gatling whatever the burn trail herds.',
    teamLookFor: [{ label: 'Big missile counted', tone: '#ff5d6c' }, { label: 'Package on an objective timer', tone: '#9b8cff' }, { label: 'Gatling angles open', tone: '#e8b84b' }, { label: 'Mixed damage confusing them', tone: '#46c6f5' }],
    teamPositioning: ['Missile the siege \u2014 the count never sleeps.', 'Package fights, not lanes.', 'Gatling at angles, not faces.', 'Their armor page lies \u2014 keep it that way.']
  },
  Ezreal: {
    dataKey: 'ezreal_bot', sub: 'Marksman \u00b7 Poke & Blink \u00b7 Prodigal Explorer', label: '#f0d8a8', tint: 'rgba(230,200,140,0.5)',
    classLabel: 'Marksman', winStyle: 'Poke / Safety', ultVerdict: 'TRUESHOT BARRAGE',
    lateSwing: 'Late Ezreal kites from postcode range \u2014 W-Q the divers, E the answer, barrage the cleanup.', spikeLine: 'Muramana-Trinity online \u2014 the chip is a mugging.',
    spikeItem: 'Two-item spike \u2014 every gap is an invoice.', lvl6Spike: 'Trueshot online \u2014 clear their resets from base.',
    fbVerb: 'out-chip him forty invoices to one', fbAction: 'Q the gaps and blink the rotation', fbDo: 'Accuracy is tempo \u2014 every landed Q funds the next', dosTail: 'The blink is the entire safety budget \u2014 spent on poke angles, the next hook reads your mail.',
    buildStart: ['Doran\u2019s Blade + Tear plan', 'Tear + Sheen'],
    buildCore: ['Ionian Lucidity', 'Trinity / Muramana', 'Serylda\u2019s path'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Mystic Shot', note: 'Max 1st \u00b7 refund poke' },
      { k: 'W', color: '#9b8cff', label: 'Essence Flux', note: 'Max 2nd \u00b7 the detonation orb' },
      { k: 'E', color: '#e8b84b', label: 'Arcane Shift', note: 'Max last \u00b7 the safety budget' },
      { k: 'R', color: '#ff5d6c', label: 'Trueshot Barrage', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Q Cadence', keys: ['Q'], tone: '#46c6f5', tier: 'Poke', when: 'Every gap: the landed Q refunds everything \u2014 aim is the mana bar.' },
      { name: 'Double Proc', keys: ['W', 'Q'], tone: '#9b8cff', tier: 'Trade', when: 'Real window: orb then Q-detonate \u2014 the chunk hides in the poke.' },
      { name: 'Shift Answer', keys: ['E', 'Q'], tone: '#e8b84b', tier: 'Defensive', when: 'Their engage commits: blink the angle and bill the retreat.' },
      { name: 'Global Mail', keys: ['R'], tone: '#ff5d6c', tier: 'Snipe', when: 'Objective spawns or resets walk: the barrage arrives first.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights from behind a velvet rope \u2014 W-Q the divers, blink the one answer that matters, and barrage the ledger globally.',
    teamLookFor: [{ label: 'Q lanes through the fight', tone: '#46c6f5' }, { label: 'E banked for their dive', tone: '#e8b84b' }, { label: 'W marks on the front line', tone: '#9b8cff' }, { label: 'Barrage angles on resets', tone: '#ff5d6c' }],
    teamPositioning: ['Kite at maximum Q range, always.', 'Blink answers, never entrances.', 'W the diver before the Q.', 'Barrage the objective setup blind.']
  },
  Kalista: {
    dataKey: 'kalista_bot', sub: 'Marksman \u00b7 Hop Weaver \u00b7 Spear of Vengeance', label: '#9fc0d8', tint: 'rgba(130,170,200,0.5)',
    classLabel: 'Marksman', winStyle: 'Hop DPS / Objectives', ultVerdict: 'FATE\u2019S CALL',
    lateSwing: 'Late Kalista steals and engages \u2014 Rend the drake, toss the support, hop the answer.', spikeLine: 'First item online \u2014 the hop-DPS out-duels the role.',
    spikeItem: 'BotRK spike \u2014 cash the act in objectives.', lvl6Spike: 'Fate\u2019s Call online \u2014 your support is now a projectile.',
    fbVerb: 'out-dance him spear by spear', fbAction: 'hop-weave the trades and Rend the walk-away', fbDo: 'Hop forward in trades \u2014 backward hops win nothing', dosTail: 'The R pulls the support IN before the throw \u2014 a targetless toss is two people apologizing mid-air.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Recurve / Cutlass'],
    buildCore: ['Berserker\u2019s Greaves', 'BotRK / Kraken', 'Runaan\u2019s path'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Pierce', note: 'Max 1st \u00b7 the spear' },
      { k: 'W', color: '#9b8cff', label: 'Sentinel', note: 'Oathsworn bonus damage' },
      { k: 'E', color: '#e8b84b', label: 'Rend', note: 'Max 2nd \u00b7 the bill' },
      { k: 'R', color: '#ff5d6c', label: 'Fate\u2019s Call', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Hop Weave', keys: ['AA', 'AA', 'AA'], tone: '#46c6f5', tier: 'DPS', when: 'Every trade: the passive dances between shots \u2014 attack commands steer it.' },
      { name: 'Rend Bill', keys: ['Q', 'AA', 'E'], tone: '#e8b84b', tier: 'Kill', when: 'Spears stacked: pierce, auto, slash the ledger on the disengage.' },
      { name: 'Oath Toss', keys: ['R'], tone: '#ff5d6c', tier: 'Engage', when: 'Support in position: pull them in, launch the knockup, follow the spears.' },
      { name: 'Objective Theft', keys: ['E'], tone: '#9b8cff', tier: 'Steal', when: 'Drake low with spears in it: the Rend executes \u2014 smite with a spreadsheet.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights on rhythm \u2014 hop-weave the DPS, toss the support as the engage, and Rend every objective the spears touched.',
    teamLookFor: [{ label: 'Spears stacked for Rend', tone: '#e8b84b' }, { label: 'Oathsworn toss angle', tone: '#ff5d6c' }, { label: 'Hop paths open', tone: '#46c6f5' }, { label: 'Objectives to audit', tone: '#9b8cff' }],
    teamPositioning: ['Hop forward \u2014 the dance advances or it dies.', 'Toss the support at the carry.', 'Rend the drake \u2014 your E out-smites smite.', 'The passive obeys attack commands \u2014 steer it.']
  },
  Lucian: {
    dataKey: 'lucian_bot', sub: 'Marksman \u00b7 Burst Strings \u00b7 Purifier', label: '#e8e0c8', tint: 'rgba(220,210,180,0.5)',
    classLabel: 'Marksman', winStyle: 'Burst / Tempo', ultVerdict: 'THE CULLING',
    lateSwing: 'Late Lucian dashes the seams \u2014 string the carry, dash the peel, cull the corridor.', spikeLine: 'ER online \u2014 the string deletes half bars.',
    spikeItem: 'First item spike \u2014 the act peaks; cash it.', lvl6Spike: 'The Culling online \u2014 straight-line disengages pay in full.',
    fbVerb: 'string him six shots to two', fbAction: 'bait the answer and dash the silence', fbDo: 'Doubles after every spell \u2014 the passive is half the champion', dosTail: 'The dash is ONE dash \u2014 the Lucian who forgets meets the hook mid-flourish.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Sheen / Pickaxe'],
    buildCore: ['Berserker\u2019s Greaves', 'Essence Reaver / Collector', 'RFC / IE'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Piercing Light', note: 'Max 1st \u00b7 the line' },
      { k: 'W', color: '#9b8cff', label: 'Ardent Blaze', note: 'Max 2nd \u00b7 the mark' },
      { k: 'E', color: '#e8b84b', label: 'Relentless Pursuit', note: 'Max last \u00b7 the one dash' },
      { k: 'R', color: '#ff5d6c', label: 'The Culling', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Double String', keys: ['Q', 'AA', 'E', 'AA', 'W', 'AA'], tone: '#46c6f5', tier: 'Kill', when: 'Support CC lands: six shots in two seconds \u2014 the full sentence.' },
      { name: 'Poke Doubles', keys: ['Q', 'AA'], tone: '#9b8cff', tier: 'Trade', when: 'Wave contact: line the Q through, double-shot the rider.' },
      { name: 'Dash Sideways', keys: ['E', 'AA'], tone: '#e8b84b', tier: 'Reposition', when: 'Mid-string: lateral dash keeps the doubles flowing off-angle.' },
      { name: 'Corridor Cull', keys: ['R'], tone: '#ff5d6c', tier: 'Execute', when: 'They flee straight: the culling bills per bullet down the hallway.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights in strings \u2014 dash the seams, double-shot the carry, and cull the corridor their retreat agreed to.',
    teamLookFor: [{ label: 'CC to string off', tone: '#ff5d6c' }, { label: 'Dash held for the answer', tone: '#e8b84b' }, { label: 'Corridors for the cull', tone: '#9b8cff' }, { label: 'Lead converted on time', tone: '#46c6f5' }],
    teamPositioning: ['String the carry, not the front line.', 'Dash sideways, never straight in.', 'Cull corridors, not crowds.', 'The act has a runtime \u2014 convert before the credits.']
  },
  "Miss Fortune": {
    dataKey: 'missfortune_bot', sub: 'Marksman \u00b7 Lane Bully \u00b7 Bounty Hunter', label: '#e89fb8', tint: 'rgba(220,130,170,0.5)',
    classLabel: 'Marksman', winStyle: 'Bully / Channel', ultVerdict: 'BULLET TIME',
    lateSwing: 'Late MF is the cone \u2014 position off the engage, channel the clump, strut away.', spikeLine: 'Collector online \u2014 the bounce executes.',
    spikeItem: 'First item spike \u2014 the R wins 2v2s alone.', lvl6Spike: 'Bullet Time online \u2014 any support CC is a teamfight of crits.',
    fbVerb: 'out-margin him with love taps', fbAction: 'tap-swap the duo and zone with the rain', fbDo: 'Swap targets every auto \u2014 the passive is the lane', dosTail: 'The channel roots YOU \u2014 casting it before the engage is spent volunteers you as intermission.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Serrated Dirk / Pickaxe'],
    buildCore: ['Swiftness / Berserker\u2019s', 'Collector / ER', 'Infinity Edge'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Double Up', note: 'Max 1st \u00b7 the bounce' },
      { k: 'W', color: '#9b8cff', label: 'Strut', note: 'Max 2nd \u00b7 the tempo' },
      { k: 'E', color: '#e8b84b', label: 'Make It Rain', note: 'Max last \u00b7 the slow zone' },
      { k: 'R', color: '#ff5d6c', label: 'Bullet Time', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Love Taps', keys: ['AA', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'Duo trade: swap targets per auto \u2014 every new face pays the tap.' },
      { name: 'Bounce Execute', keys: ['Q'], tone: '#9b8cff', tier: 'Poke', when: 'Low minion in line: the bounce CRITS off the kill \u2014 aim the geometry.' },
      { name: 'Rain Setup', keys: ['E', 'Q'], tone: '#e8b84b', tier: 'Zone', when: 'They contest: rain the slow, bounce the held \u2014 the zone does the aiming.' },
      { name: 'Bullet Time', keys: ['R'], tone: '#ff5d6c', tier: 'Teamfight', when: 'Support lands CC: channel the cone \u2014 two seconds of crits per body.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights with two committed seconds \u2014 position one step behind the engage, channel the clump, and strut out of the survivors\u2019 reach.',
    teamLookFor: [{ label: 'CC to channel off', tone: '#ff5d6c' }, { label: 'Clumps in the cone arc', tone: '#9b8cff' }, { label: 'Their interrupts spent', tone: '#46c6f5' }, { label: 'Strut topped for the exit', tone: '#e8b84b' }],
    teamPositioning: ['Channel verdicts, not greetings.', 'One step behind the engage, always.', 'Bounce the geometry, not the face.', 'Tap-swap \u2014 new targets pay double.']
  }
});

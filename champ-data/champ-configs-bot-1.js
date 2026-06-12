// MatchupCoach — CHAMPS engine configs for BOT (1/3): hypercarries.
window.CHAMP_CONFIGS_BOT = Object.assign(window.CHAMP_CONFIGS_BOT || {}, {
  Aphelios: {
    dataKey: 'aphelios_bot', sub: 'Marksman \u00b7 Gun Rotation \u00b7 Weapon of the Faithful', label: '#b8c8e8', tint: 'rgba(150,170,220,0.5)',
    classLabel: 'Marksman', winStyle: 'Rotation / Scale', ultVerdict: 'MOONLIGHT VIGIL',
    lateSwing: 'Late Aphelios is five carries in one body \u2014 the right gun deletes the right fight.', spikeLine: 'First item online \u2014 the rotation starts out-trading single kits.',
    spikeItem: 'Two-item spike \u2014 every pair is lethal.', lvl6Spike: 'Moonlight Vigil online \u2014 every gun\u2019s R is a different teamfight.',
    fbVerb: 'answer his pattern with the counter-gun', fbAction: 'read the queue and trade your strong pair into his weak window', fbDo: 'Read the queue \u2014 plan trades two guns ahead', dosTail: 'The gravity root is your only hard CC \u2014 spend it on commits, never on poke.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Noonquiver piece'],
    buildCore: ['Berserker\u2019s Greaves', 'Kraken / Collector', 'Infinity Edge'],
    skillSeq: ['Q', 'Q', 'W', 'Q', 'Q', 'R', 'Q', 'Q', 'Q', 'Q', 'R', 'Q', 'Q', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Weapon Abilities', note: 'Per-gun Q \u00b7 the rotation' },
      { k: 'W', color: '#9b8cff', label: 'Weapon Swap', note: 'The tempo mechanic' },
      { k: 'E', color: '#e8b84b', label: 'Gun Queue', note: 'Read it like a hand of cards' },
      { k: 'R', color: '#ff5d6c', label: 'Moonlight Vigil', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Sniper Poke', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Poke', when: 'Calibrum loaded: tag from artillery range and shoot the mark.' },
      { name: 'Gravity Catch', keys: ['Q', 'W', 'AA'], tone: '#ff5d6c', tier: 'Kill', when: 'Gravitum holds: root the overstep, swap, unload the off-hand.' },
      { name: 'Vigil Opener', keys: ['R', 'W', 'Q'], tone: '#9b8cff', tier: 'Teamfight', when: 'Three-plus clumped: the loaded gun decides what the moonlight does.' },
      { name: 'Turret Anchor', keys: ['Q'], tone: '#e8b84b', tier: 'Zone', when: 'Crescendum loaded: anchor the pit and let the chakram count climb.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights by literacy \u2014 the right gun at the right moment is five champions of answers; read the queue and position like the pair demands.',
    teamLookFor: [{ label: 'Queue read two guns ahead', tone: '#46c6f5' }, { label: 'Gravity root for the dive', tone: '#ff5d6c' }, { label: 'R gun matched to the fight', tone: '#9b8cff' }, { label: 'Support peel nearby', tone: '#e8b84b' }],
    teamPositioning: ['Position like the loaded gun demands.', 'Root the diver, swap, unload.', 'Vigil the clump with the right barrel.', 'The queue is your macro \u2014 read it aloud.']
  },
  Ashe: {
    dataKey: 'ashe_bot', sub: 'Marksman \u00b7 Utility Frost \u00b7 Frost Archer', label: '#9fd0f0', tint: 'rgba(120,190,230,0.5)',
    classLabel: 'Marksman', winStyle: 'Slow / Initiate', ultVerdict: 'ENCHANTED CRYSTAL ARROW',
    lateSwing: 'Late Ashe starts every fight \u2014 arrow the pick, slow the dive, kite the survivors.', spikeLine: 'First item online \u2014 the slow-kite war is unfair.',
    spikeItem: 'Two-item spike \u2014 frost becomes a sentence.', lvl6Spike: 'Crystal Arrow online \u2014 every fog lane is a stun lottery.',
    fbVerb: 'chip him into the frost ledger', fbAction: 'volley the contacts and kite the commits', fbDo: 'Volley every wave contact \u2014 the chip ledger is the lane', dosTail: 'You have NO escape \u2014 the arrow you hold defensively is the only Flash you\u2019ll ever own.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Noonquiver piece'],
    buildCore: ['Berserker\u2019s Greaves', 'Kraken / Statikk', 'IE / Runaan\u2019s'],
    skillSeq: ['W', 'Q', 'E', 'W', 'W', 'R', 'W', 'Q', 'W', 'Q', 'R', 'Q', 'Q', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Ranger\u2019s Focus', note: 'Max 2nd \u00b7 the flurry' },
      { k: 'W', color: '#9b8cff', label: 'Volley', note: 'Max 1st \u00b7 core poke' },
      { k: 'E', color: '#e8b84b', label: 'Hawkshot', note: 'Global vision sweep' },
      { k: 'R', color: '#ff5d6c', label: 'Crystal Arrow', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Volley Chip', keys: ['W', 'AA'], tone: '#9b8cff', tier: 'Poke', when: 'Wave contact: volley, auto with frost, walk \u2014 the ledger compounds.' },
      { name: 'Arrow Pick', keys: ['R', 'W', 'Q'], tone: '#ff5d6c', tier: 'Kill', when: 'Fog lane reads: arrow the path, volley the stun, flurry the verdict.' },
      { name: 'Kite Court', keys: ['Q', 'AA', 'AA'], tone: '#46c6f5', tier: 'DPS', when: 'He commits: flurry on, kite backward \u2014 he leaves at your speed.' },
      { name: 'Hawk Call', keys: ['E'], tone: '#e8b84b', tier: 'Vision', when: 'Objective spawns: scout it blind and arrow what the hawk found.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights before they start \u2014 arrow the pick from fog, slow the front line into your team, and kite whatever survives the spreadsheet.',
    teamLookFor: [{ label: 'A fog lane to arrow', tone: '#ff5d6c' }, { label: 'Frost on their divers', tone: '#46c6f5' }, { label: 'Hawkshot on the objective', tone: '#e8b84b' }, { label: 'Peel for the kite', tone: '#9b8cff' }],
    teamPositioning: ['Arrow first, fight second.', 'Frost the diver \u2014 your team handles the rest.', 'Hawkshot every objective before walking in.', 'Never walk anywhere alone \u2014 ever.']
  },
  Caitlyn: {
    dataKey: 'caitlyn_bot', sub: 'Marksman \u00b7 Range Bully \u00b7 Sheriff', label: '#c8a8e8', tint: 'rgba(170,140,220,0.5)',
    classLabel: 'Marksman', winStyle: 'Range / Siege', ultVerdict: 'ACE IN THE HOLE',
    lateSwing: 'Late Caitlyn sieges \u2014 trap the chokes, headshot from brush range, snipe the cleanup.', spikeLine: 'First item online \u2014 headshots crit; cash the lead NOW.',
    spikeItem: 'Collector spike \u2014 the bully window peaks.', lvl6Spike: 'Ace in the Hole online \u2014 low-HP resets die from two screens.',
    fbVerb: 'tax him off the wave from max range', fbAction: 'headshot the contacts and trap the geometry', fbDo: 'Tax every CS \u2014 the lane is a toll road and your range is the booth', dosTail: 'The net jumps you BACKWARD from your aim \u2014 panicking with it pointed wrong is the classic Caitlyn obituary.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Serrated Dirk / Cloak'],
    buildCore: ['Berserker\u2019s Greaves', 'Collector / Statikk', 'Infinity Edge'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Piltover Peacemaker', note: 'Max 1st \u00b7 line poke' },
      { k: 'W', color: '#9b8cff', label: 'Yordle Snap Traps', note: 'Max 2nd \u00b7 the geometry' },
      { k: 'E', color: '#e8b84b', label: '90 Caliber Net', note: 'Max last \u00b7 hop + setup' },
      { k: 'R', color: '#ff5d6c', label: 'Ace in the Hole', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Headshot Tax', keys: ['AA', 'Q'], tone: '#46c6f5', tier: 'Poke', when: 'His last-hit: headshot the attempt, Q the retreat \u2014 the booth collects.' },
      { name: 'Net-Trap', keys: ['E', 'W', 'AA'], tone: '#ff5d6c', tier: 'Kill', when: 'He steps wrong: net back, trap the landing, headshot the root.' },
      { name: 'Brush Bully', keys: ['AA'], tone: '#e8b84b', tier: 'Zone', when: 'Hedge control: brush headshots charge double \u2014 own the grass.' },
      { name: 'The Ace', keys: ['R'], tone: '#9b8cff', tier: 'Snipe', when: 'Anyone low in two screens: line it up; a teammate can body-block \u2014 theirs.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights from siege range \u2014 trap the chokes pre-fight, headshot off the roots, and ace whatever leaves low.',
    teamLookFor: [{ label: 'Chokes pre-trapped', tone: '#9b8cff' }, { label: 'Brush for headshot tempo', tone: '#e8b84b' }, { label: 'Lead spent on towers', tone: '#46c6f5' }, { label: 'Low targets for the ace', tone: '#ff5d6c' }],
    teamPositioning: ['Siege from beyond their answer range.', 'Trap the future, not the present.', 'Own the grass \u2014 headshots charge double there.', 'Spend the lead before the fall-off bills it.']
  },
  Draven: {
    dataKey: 'draven_bot', sub: 'Marksman \u00b7 Axe Juggler \u00b7 Glorious Executioner', label: '#f0a878', tint: 'rgba(230,150,100,0.5)',
    classLabel: 'Marksman', winStyle: 'Bully / Snowball', ultVerdict: 'WHIRLING DEATH',
    lateSwing: 'Late Draven is a DPS check with stage fright about CC \u2014 juggle behind the front line.', spikeLine: 'First item online \u2014 the juggle one-shots.',
    spikeItem: 'Bloodthirster spike \u2014 cash the act.', lvl6Spike: 'Whirling Death online \u2014 low-HP escapes die to the return pass.',
    fbVerb: 'out-stat him with both axes spinning', fbAction: 'zone the CS and all-in off any CC', fbDo: 'Two axes or no trade \u2014 the juggle IS the matchup', dosTail: 'Catch forward, never backward \u2014 the axe that retreats wins nothing.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'B.F. Sword if the lane paid'],
    buildCore: ['Berserker\u2019s Greaves', 'Bloodthirster / Collector', 'Infinity Edge'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Spinning Axe', note: 'Max 1st \u00b7 the act' },
      { k: 'W', color: '#9b8cff', label: 'Blood Rush', note: 'Max 2nd \u00b7 the chase' },
      { k: 'E', color: '#e8b84b', label: 'Stand Aside', note: 'Max last \u00b7 the anti-engage' },
      { k: 'R', color: '#ff5d6c', label: 'Whirling Death', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Juggle Trade', keys: ['Q', 'AA', 'Q'], tone: '#46c6f5', tier: 'Trade', when: 'Any contest: catch-throw-catch \u2014 two axes of damage for one of theirs.' },
      { name: 'All-In', keys: ['W', 'AA', 'E'], tone: '#ff5d6c', tier: 'Kill', when: 'Support lands CC: blood rush in, axes spinning, E the counter-engage.' },
      { name: 'Axe Denial', keys: ['E'], tone: '#e8b84b', tier: 'Counter', when: 'Their engage dashes: Stand Aside interrupts it mid-flight.' },
      { name: 'Return Pass', keys: ['R'], tone: '#9b8cff', tier: 'Execute', when: 'They flee low: the axes go global and come BACK \u2014 both passes bill.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights as a DPS check \u2014 juggle behind your front line, E the diver, and let the return-R audit the exits.',
    teamLookFor: [{ label: 'Two axes spinning', tone: '#46c6f5' }, { label: 'CC to all-in off', tone: '#ff5d6c' }, { label: 'E held for their engage', tone: '#e8b84b' }, { label: 'Catch spots forward', tone: '#9b8cff' }],
    teamPositioning: ['Juggle behind bodies \u2014 the act fears CC only.', 'Catch spots advance the fight or skip the axe.', 'E the first diver, out-DPS the second.', 'Cash bounties early \u2014 the passive pays double.']
  },
  Jhin: {
    dataKey: 'jhin_bot', sub: 'Marksman \u00b7 Fourth Shot \u00b7 Virtuoso', label: '#e8a8b8', tint: 'rgba(220,140,160,0.5)',
    classLabel: 'Marksman', winStyle: 'Pick / Burst', ultVerdict: 'CURTAIN CALL',
    lateSwing: 'Late Jhin is the pick and the siege \u2014 root from fog, snipe the setup, fourth-shot the finale.', spikeLine: 'First item online \u2014 fourth shots delete squishies.',
    spikeItem: 'Collector spike \u2014 the performance has a body count.', lvl6Spike: 'Curtain Call online \u2014 low-HP lanes pay from two screens.',
    fbVerb: 'punctuate him with the fourth shot', fbAction: 'count to four and root the walk-away', fbDo: 'Count to four \u2014 trades start loaded or not at all', dosTail: 'The reload is your weakness window \u2014 every great Jhin death happens on shot zero.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Serrated Dirk / Pickaxe'],
    buildCore: ['Swiftness / Berserker\u2019s', 'The Collector', 'IE / RFC'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Dancing Grenade', note: 'Max 1st \u00b7 bouncing chip' },
      { k: 'W', color: '#9b8cff', label: 'Deadly Flourish', note: 'Max 2nd \u00b7 the cross-map root' },
      { k: 'E', color: '#e8b84b', label: 'Captive Audience', note: 'Max last \u00b7 lotus traps' },
      { k: 'R', color: '#ff5d6c', label: 'Curtain Call', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Fourth Act', keys: ['AA', 'AA', 'AA', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'Loaded fourth: open the trade on it \u2014 the execute crit IS the exchange.' },
      { name: 'Flourish Chain', keys: ['Q', 'W', 'AA'], tone: '#ff5d6c', tier: 'Kill', when: 'Any chip lands: grenade, cross-map root, fourth-shot the held.' },
      { name: 'Lotus Stage', keys: ['E'], tone: '#e8b84b', tier: 'Zone', when: 'Objectives: carpet the pit \u2014 the traps slow and reveal the contest.' },
      { name: 'Curtain Call', keys: ['R'], tone: '#9b8cff', tier: 'Snipe', when: 'Low targets in the act\u2019s range: four global shots; the fourth crits hardest.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights as punctuation \u2014 root the pick from fog, trap the objective stage, and fourth-shot whatever the team\u2019s sentence leaves.',
    teamLookFor: [{ label: 'Fourth shot loaded pre-fight', tone: '#46c6f5' }, { label: 'Chip for the W root', tone: '#ff5d6c' }, { label: 'Pits pre-trapped', tone: '#e8b84b' }, { label: 'Curtain angle from safety', tone: '#9b8cff' }],
    teamPositioning: ['Open fights loaded \u2014 never on shot two.', 'Root the scratched; your team finishes sentences.', 'Trap the stage before the show.', 'Curtain Call from places they can\u2019t answer.']
  },
  Jinx: {
    dataKey: 'jinx_bot', sub: 'Marksman \u00b7 Reset Hypercarry \u00b7 Loose Cannon', label: '#8fc8f0', tint: 'rgba(110,180,230,0.5)',
    classLabel: 'Marksman', winStyle: 'Ramp / Snowball', ultVerdict: 'SUPER MEGA DEATH ROCKET!',
    lateSwing: 'Late Jinx is the snowball \u2014 one kill flips Get Excited and the chainsaw runs the fight.', spikeLine: 'First item online \u2014 the ramp starts.',
    spikeItem: 'Two-item spike \u2014 four-second fights become won ones.', lvl6Spike: 'Death Rocket online \u2014 half-HP resets pay from base.',
    fbVerb: 'out-ramp him in the long fight', fbAction: 'rocket the spacing and chomper the commits', fbDo: 'Chompers behind you, rockets in front \u2014 the geometry is the survival plan', dosTail: 'The chompers are your only \u2018no\u2019 \u2014 placed on paths, not hopes.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Noonquiver'],
    buildCore: ['Berserker\u2019s Greaves', 'Kraken Slayer', 'IE / Runaan\u2019s'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Switcheroo!', note: 'Max 1st \u00b7 minigun / rockets' },
      { k: 'W', color: '#9b8cff', label: 'Zap!', note: 'Max 2nd \u00b7 the snipe-slow' },
      { k: 'E', color: '#e8b84b', label: 'Flame Chompers!', note: 'Max last \u00b7 the only no' },
      { k: 'R', color: '#ff5d6c', label: 'Death Rocket!', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Rocket Space', keys: ['Q', 'AA'], tone: '#46c6f5', tier: 'Poke', when: 'Beyond his range: rockets splash the duo; swap back for commits.' },
      { name: 'Chomper Wall', keys: ['E', 'W'], tone: '#e8b84b', tier: 'Defensive', when: 'Their engage commits: chompers on the path, Zap the slowed regret.' },
      { name: 'Excited Chain', keys: ['AA', 'Q'], tone: '#ff5d6c', tier: 'Teamfight', when: 'First takedown lands: minigun on, passive sprinting \u2014 chase the chain.' },
      { name: 'Death Rocket', keys: ['R'], tone: '#9b8cff', tier: 'Execute', when: 'Half-HP anywhere: the rocket bills global \u2014 track the map\u2019s bars.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights by surviving their first four seconds \u2014 chomper the dive, minigun the front line, and let Get Excited play the rest.',
    teamLookFor: [{ label: 'Chompers on the dive path', tone: '#e8b84b' }, { label: 'First takedown available', tone: '#ff5d6c' }, { label: 'Rocket range respected', tone: '#46c6f5' }, { label: 'Peel for four seconds', tone: '#9b8cff' }],
    teamPositioning: ['Survive four seconds \u2014 the ramp does the rest.', 'Rockets for spacing, minigun for conviction.', 'Chomper the path, not the prayer.', 'One takedown flips the whole fight \u2014 chase it.']
  },
  "Kai'Sa": {
    dataKey: 'kaisa_bot', sub: 'Marksman \u00b7 Evolving Dive \u00b7 Daughter of the Void', label: '#c89fd8', tint: 'rgba(170,120,200,0.5)',
    classLabel: 'Marksman', winStyle: 'Plasma / Dive', ultVerdict: 'KILLER INSTINCT',
    lateSwing: 'Late Kai\u2019Sa flanks the marks \u2014 R behind, stealth the approach, delete the carry plasma promised.', spikeLine: 'First evolve online \u2014 the Q swarm doubles.',
    spikeItem: 'Evolve spike \u2014 hunt the isolation windows.', lvl6Spike: 'Killer Instinct online \u2014 your range problem became his position problem.',
    fbVerb: 'dive the mark with the swarm', fbAction: 'stack plasma off the duo and burst the fourth', fbDo: 'Stack plasma off the duo \u2014 the fourth stack is the trade', dosTail: 'Your R goes TO the mark, not from danger \u2014 dive with the E exit banked.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Pickaxe / Recurve'],
    buildCore: ['Berserker\u2019s Greaves', 'Kraken / Statikk', 'Guinsoo\u2019s / Zhonya path'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Icathian Rain', note: 'Max 1st \u00b7 the swarm' },
      { k: 'W', color: '#9b8cff', label: 'Void Seeker', note: 'Max last \u00b7 the mark' },
      { k: 'E', color: '#e8b84b', label: 'Supercharger', note: 'Max 2nd \u00b7 speed + stealth' },
      { k: 'R', color: '#ff5d6c', label: 'Killer Instinct', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Plasma Pop', keys: ['AA', 'AA', 'Q'], tone: '#46c6f5', tier: 'Trade', when: 'Duo trade: two autos plus support CC stacks plasma \u2014 Q the detonation.' },
      { name: 'Mark Dive', keys: ['W', 'R', 'Q', 'E'], tone: '#ff5d6c', tier: 'Kill', when: 'W lands from fog: R the mark, swarm the landing, E-stealth the exit.' },
      { name: 'Charge Reposition', keys: ['E', 'AA'], tone: '#e8b84b', tier: 'DPS', when: 'Fight breathes: supercharge to the new angle and resume the stream.' },
      { name: 'Isolation Hunt', keys: ['Q'], tone: '#9b8cff', tier: 'Burst', when: 'Target isolated: every missile converges \u2014 the swarm doubles on loners.' }
    ],
    isFlank: true,
    teamWinCon: 'You win fights by auditing position errors \u2014 plasma the front line, R the mark that drifts, and stealth out through the chaos.',
    teamLookFor: [{ label: 'Plasma stacks on their carry', tone: '#ff5d6c' }, { label: 'R angle behind the fight', tone: '#9b8cff' }, { label: 'E banked for the exit', tone: '#e8b84b' }, { label: 'Isolated targets for Q', tone: '#46c6f5' }],
    teamPositioning: ['Dive marks, not hopes.', 'Stack plasma before spending R.', 'Stealth the approach, not the retreat.', 'Isolation doubles the swarm \u2014 hunt loners.'],
    teamFlank: ['W-mark from fog first.', 'R behind their formation.', 'Swarm the carry at four stacks.', 'E-stealth home through the panic.']
  },
  "Kog'Maw": {
    dataKey: 'kogmaw_bot', sub: 'Marksman \u00b7 Range Window \u00b7 Mouth of the Abyss', label: '#a8e0a8', tint: 'rgba(140,200,140,0.5)',
    classLabel: 'Marksman', winStyle: 'Window DPS / Scale', ultVerdict: 'LIVING ARTILLERY',
    lateSwing: 'Late Kog is a DPS condition \u2014 stand behind four bodies and delete whatever the window touches.', spikeLine: 'First item online \u2014 the W window melts.',
    spikeItem: 'Two-item spike \u2014 guard the barrage timer.', lvl6Spike: 'Living Artillery online \u2014 chipped lanes pay mortars on the walk home.',
    fbVerb: 'melt him inside the window', fbAction: 'trade strictly inside W and vanish between', fbDo: 'Trade inside windows, vanish between them \u2014 the W is the champion', dosTail: 'The ooze is your only peel \u2014 spent on poke, the next dive meets a stationary buffet.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Recurve Bow'],
    buildCore: ['Berserker\u2019s Greaves', 'Guinsoo\u2019s / Kraken', 'Terminus / Runaan\u2019s'],
    skillSeq: ['W', 'Q', 'E', 'W', 'W', 'R', 'W', 'Q', 'W', 'Q', 'R', 'Q', 'Q', 'E', 'E', 'R', 'E', 'E'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Caustic Spittle', note: 'Max 2nd \u00b7 the shred' },
      { k: 'W', color: '#9b8cff', label: 'Bio-Arcane Barrage', note: 'Max 1st \u00b7 THE window' },
      { k: 'E', color: '#e8b84b', label: 'Void Ooze', note: 'Max last \u00b7 the only peel' },
      { k: 'R', color: '#ff5d6c', label: 'Living Artillery', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'The Window', keys: ['W', 'Q', 'AA'], tone: '#9b8cff', tier: 'DPS', when: 'Real trade: barrage on, shred first, melt for eight seconds, vanish.' },
      { name: 'Ooze Peel', keys: ['E', 'AA'], tone: '#e8b84b', tier: 'Defensive', when: 'Their dive commits: trail the slow and kite the window backward.' },
      { name: 'Mortar Tax', keys: ['R'], tone: '#ff5d6c', tier: 'Poke', when: 'They reset low: artillery the walk home \u2014 the chip compounds.' },
      { name: 'Death Clause', keys: ['AA'], tone: '#46c6f5', tier: 'Passive', when: 'You die anyway: walk AT them \u2014 the corpse bomb reads true damage.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights as a protected condition \u2014 four bodies in front, the window open, and everything it touches stops having a health bar.',
    teamLookFor: [{ label: 'W window timed to the fight', tone: '#9b8cff' }, { label: 'Four bodies in front', tone: '#46c6f5' }, { label: 'Ooze held for the diver', tone: '#e8b84b' }, { label: 'Mortars on the chipped', tone: '#ff5d6c' }],
    teamPositioning: ['One body behind the front line, always.', 'Open the window for fights, not waves.', 'Ooze the diver, not the poke.', 'Your death has a clause \u2014 walk at them.']
  },
  Nilah: {
    dataKey: 'nilah_bot', sub: 'Melee Marksman \u00b7 Joy Scaling \u00b7 Unbound Joy', label: '#8fd8e8', tint: 'rgba(110,200,220,0.5)',
    classLabel: 'Melee Marksman', winStyle: 'Veil / Duo Scale', ultVerdict: 'APOTHEOSIS',
    lateSwing: 'Late Nilah blends teamfights \u2014 veil their autos, pull the clump, heal the duo through the answer.', spikeLine: 'First item online \u2014 the surf-string deletes.',
    spikeItem: 'BT spike \u2014 the veil windows turn lethal.', lvl6Spike: 'Apotheosis online \u2014 the pull-heal flips any clumped 2v2.',
    fbVerb: 'surf in behind the veil and string him', fbAction: 'veil his pattern and cleave the whiff', fbDo: 'Bank the veil for his pattern \u2014 the shimmer is the matchup', dosTail: 'The veil dodges autos, not spells \u2014 shimmering into a rotation is the classic misread.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Vampiric Scepter'],
    buildCore: ['Berserker\u2019s Greaves', 'Bloodthirster / Collector', 'Infinity Edge'],
    skillSeq: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Formless Blade', note: 'Max 1st \u00b7 whip + range' },
      { k: 'W', color: '#9b8cff', label: 'Jubilant Veil', note: 'Max last \u00b7 dodges ALL autos' },
      { k: 'E', color: '#e8b84b', label: 'Slipstream', note: 'Max 2nd \u00b7 minion surfing' },
      { k: 'R', color: '#ff5d6c', label: 'Apotheosis', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Surf String', keys: ['E', 'E', 'Q'], tone: '#46c6f5', tier: 'Kill', when: 'Window opens: dash-dash through the wave, whip-cleave the duo.' },
      { name: 'Veil Trade', keys: ['W', 'AA', 'Q'], tone: '#9b8cff', tier: 'Counter', when: 'His autos commit: shimmer, watch the whiffs, cleave the regret.' },
      { name: 'Joy Pull', keys: ['R'], tone: '#ff5d6c', tier: 'Teamfight', when: 'They clump: the whirl pulls on the last tick and heals the duo.' },
      { name: 'Shared Shield', keys: ['AA'], tone: '#e8b84b', tier: 'Passive', when: 'Enchanter shields you: the passive amplifies \u2014 the duo is one organism.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights inside the whirl \u2014 veil their auto damage, pull the clump on the final tick, and heal the duo through whatever answers.',
    teamLookFor: [{ label: 'Veil timed to their carry', tone: '#9b8cff' }, { label: 'A clump to pull', tone: '#ff5d6c' }, { label: 'Surf bodies to the backline', tone: '#e8b84b' }, { label: 'Enchanter joy nearby', tone: '#46c6f5' }],
    teamPositioning: ['Veil their ADC\u2019s window \u2014 it deletes a carry per fight.', 'Pull the clump, heal the duo.', 'Surf the wave, never the open field.', 'Marry the enchanter \u2014 the math is rigged on purpose.']
  },
  Samira: {
    dataKey: 'samira_bot', sub: 'Marksman \u00b7 Style Chain \u00b7 Desert Rose', label: '#e89f9f', tint: 'rgba(220,120,120,0.5)',
    classLabel: 'Marksman', winStyle: 'All-In / Resets', ultVerdict: 'INFERNO TRIGGER',
    lateSwing: 'Late Samira chains fights \u2014 dash, grade, R the clump, reset off the kill.', spikeLine: 'First item online \u2014 the style string deletes duos.',
    spikeItem: 'BT spike \u2014 make the lane officially over.', lvl6Spike: 'Inferno Trigger online \u2014 any grouped 2v2 is a blender audit.',
    fbVerb: 'blend him in one graded string', fbAction: 'bait the answer and whirl the projectile', fbDo: 'Whirl their answer, not their poke \u2014 the spin is the matchup', dosTail: 'The R needs S-rank \u2014 fights taken at C-grade are speeches without endings.',
    buildStart: ['Doran\u2019s Blade + Health Potion', 'Vampiric Scepter / Dirk'],
    buildCore: ['Berserker\u2019s Greaves', 'Bloodthirster / Collector', 'Infinity Edge'],
    skillSeq: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
    skillLegend: [
      { k: 'Q', color: '#46c6f5', label: 'Flair', note: 'Max 1st \u00b7 shot / blade' },
      { k: 'W', color: '#9b8cff', label: 'Blade Whirl', note: 'Max last \u00b7 deletes projectiles' },
      { k: 'E', color: '#e8b84b', label: 'Wild Rush', note: 'Max 2nd \u00b7 the surf reset' },
      { k: 'R', color: '#ff5d6c', label: 'Inferno Trigger', note: 'Levels 6 / 11 / 16' }
    ],
    combos: [
      { name: 'Grade Builder', keys: ['Q', 'AA', 'E', 'AA'], tone: '#46c6f5', tier: 'Trade', when: 'Every skirmish: vary the hits \u2014 the meter climbs on variety.' },
      { name: 'The Whirl', keys: ['W'], tone: '#9b8cff', tier: 'Counter', when: 'Their key shot flies: spin \u2014 the projectile graveyard opens for one second.' },
      { name: 'S-Rank Audit', keys: ['E', 'Q', 'R'], tone: '#ff5d6c', tier: 'Teamfight', when: 'S-grade + clump: surf in, flair, and let the bullet storm bill everyone.' },
      { name: 'Reset Chain', keys: ['E'], tone: '#e8b84b', tier: 'Chase', when: 'Takedown lands: the dash resets \u2014 surf to the next name on the list.' }
    ],
    isFlank: false,
    teamWinCon: 'You win fights as one continuous string \u2014 whirl their answer, surf the entry, R the clump at S-rank, and reset through the wreckage.',
    teamLookFor: [{ label: 'S-rank banked pre-fight', tone: '#ff5d6c' }, { label: 'Whirl held for their answer', tone: '#9b8cff' }, { label: 'A clump for the blender', tone: '#46c6f5' }, { label: 'Reset targets queued', tone: '#e8b84b' }],
    teamPositioning: ['Build the grade before the fight, not during.', 'Whirl exactly one thing \u2014 their best thing.', 'R the clump, reset the verdict.', 'Enter second \u2014 the first dash feeds the CC.']
  }
});

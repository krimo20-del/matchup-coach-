// MatchupCoach — generator engine for MID champions. Loaded only by run_script generation passes.
// Same contract as _gen-engine.js but with the 46-champ MID enemy pool and mid groups:
//   control (Control & Battlemages) · burst (Burst & Utility) · assassin · fighter
// Usage: GEN_ENGINE_MID.gen(cfg) -> { data, full, loadouts }
window.GEN_ENGINE_MID = (function () {
  const TONE = { FAVOURED: '#3ddc97', EVEN: '#e8b84b', TRICKY: '#ff8b3d', HARD: '#ff5d6c', MIRROR: '#e8b84b' };
  const RATING = { HARD: ['8/10', '8.5/10'], TRICKY: ['7/10', '7.5/10'], EVEN: ['5.5/10', '6/10'], FAVOURED: ['4/10', '5/10'], MIRROR: ['5/10', '7/10'] };
  const WR = { HARD: '≈46–47% — survive, scale, group', TRICKY: '≈48–49% — playable with discipline', EVEN: '≈50% — skill matchup', FAVOURED: '≈52–53% — your lane to lose', MIRROR: '50% — mirror, mechanics decide' };

  const NAME = {
    anivia:'Anivia', aurelionsol:'Aurelion Sol', azir:'Azir', cassiopeia:'Cassiopeia', hwei:'Hwei', lissandra:'Lissandra',
    malzahar:'Malzahar', orianna:'Orianna', ryze:'Ryze', swain:'Swain', syndra:'Syndra', taliyah:'Taliyah', viktor:'Viktor',
    vladimir:'Vladimir', xerath:'Xerath', ziggs:'Ziggs',
    ahri:'Ahri', annie:'Annie', aurora:'Aurora', brand:'Brand', karma:'Karma', lux:'Lux', mel:'Mel', neeko:'Neeko',
    twistedfate:'Twisted Fate', veigar:'Veigar', vex:'Vex', zoe:'Zoe',
    akali:'Akali', akshan:'Akshan', diana:'Diana', ekko:'Ekko', fizz:'Fizz', kassadin:'Kassadin', katarina:'Katarina',
    leblanc:'LeBlanc', naafiri:'Naafiri', qiyana:'Qiyana', sylas:'Sylas', talon:'Talon', zed:'Zed',
    galio:'Galio', irelia:'Irelia', pantheon:'Pantheon', yasuo:'Yasuo', yone:'Yone'
  };

  // grp: control|burst|assassin|fighter. melee/gap/dmg/allIn/sustain/scale/proj as in the top engine.
  const ETAG = {
    anivia:      { grp:'control', melee:0, gap:0, dmg:'AP', allIn:'spike6', sustain:0, scale:2 },
    aurelionsol: { grp:'control', melee:0, gap:0, dmg:'AP', allIn:'late',   sustain:0, scale:2 },
    azir:        { grp:'control', melee:0, gap:1, dmg:'AP', allIn:'flat',   sustain:0, scale:2 },
    cassiopeia:  { grp:'control', melee:0, gap:0, dmg:'AP', allIn:'flat',   sustain:1, scale:2, ground:1 },
    hwei:        { grp:'control', melee:0, gap:0, dmg:'AP', allIn:'flat',   sustain:0, scale:1, proj:1 },
    lissandra:   { grp:'control', melee:0, gap:1, dmg:'AP', allIn:'spike6', sustain:0, scale:1 },
    malzahar:    { grp:'control', melee:0, gap:0, dmg:'AP', allIn:'spike6', sustain:0, scale:1 },
    orianna:     { grp:'control', melee:0, gap:0, dmg:'AP', allIn:'flat',   sustain:0, scale:2 },
    ryze:        { grp:'control', melee:0, gap:0, dmg:'AP', allIn:'late',   sustain:0, scale:2 },
    swain:       { grp:'control', melee:0, gap:0, dmg:'AP', allIn:'spike6', sustain:1, scale:1 },
    syndra:      { grp:'control', melee:0, gap:0, dmg:'AP', allIn:'spike6', sustain:0, scale:2, proj:1 },
    taliyah:     { grp:'control', melee:0, gap:1, dmg:'AP', allIn:'early',  sustain:0, scale:1 },
    viktor:      { grp:'control', melee:0, gap:0, dmg:'AP', allIn:'flat',   sustain:0, scale:2 },
    vladimir:    { grp:'control', melee:0, gap:0, dmg:'AP', allIn:'late',   sustain:1, scale:2 },
    xerath:      { grp:'control', melee:0, gap:0, dmg:'AP', allIn:'flat',   sustain:0, scale:1, proj:1 },
    ziggs:       { grp:'control', melee:0, gap:0, dmg:'AP', allIn:'flat',   sustain:0, scale:1, proj:1 },
    ahri:        { grp:'burst', melee:0, gap:2, dmg:'AP', allIn:'spike6', sustain:0, scale:1, proj:1 },
    annie:       { grp:'burst', melee:0, gap:0, dmg:'AP', allIn:'spike6', sustain:0, scale:1 },
    aurora:      { grp:'burst', melee:0, gap:1, dmg:'AP', allIn:'flat',   sustain:0, scale:1 },
    brand:       { grp:'burst', melee:0, gap:0, dmg:'AP', allIn:'flat',   sustain:0, scale:1, proj:1 },
    karma:       { grp:'burst', melee:0, gap:0, dmg:'AP', allIn:'flat',   sustain:0, scale:0, proj:1 },
    lux:         { grp:'burst', melee:0, gap:0, dmg:'AP', allIn:'flat',   sustain:0, scale:1, proj:1 },
    mel:         { grp:'burst', melee:0, gap:0, dmg:'AP', allIn:'flat',   sustain:0, scale:1, proj:1 },
    neeko:       { grp:'burst', melee:0, gap:0, dmg:'AP', allIn:'spike6', sustain:0, scale:1, proj:1 },
    twistedfate: { grp:'burst', melee:0, gap:0, dmg:'AP', allIn:'flat',   sustain:0, scale:1 },
    veigar:      { grp:'burst', melee:0, gap:0, dmg:'AP', allIn:'late',   sustain:0, scale:2 },
    vex:         { grp:'burst', melee:0, gap:0, dmg:'AP', allIn:'spike6', sustain:0, scale:1, proj:1 },
    zoe:         { grp:'burst', melee:0, gap:0, dmg:'AP', allIn:'flat',   sustain:0, scale:1, proj:1 },
    akali:       { grp:'assassin', melee:1, gap:2, dmg:'AP', allIn:'spike6', sustain:1, scale:1 },
    akshan:      { grp:'assassin', melee:0, gap:2, dmg:'AD', allIn:'early',  sustain:1, scale:1 },
    diana:       { grp:'assassin', melee:1, gap:2, dmg:'AP', allIn:'spike6', sustain:0, scale:1 },
    ekko:        { grp:'assassin', melee:1, gap:2, dmg:'AP', allIn:'spike6', sustain:0, scale:1 },
    fizz:        { grp:'assassin', melee:1, gap:2, dmg:'AP', allIn:'spike6', sustain:0, scale:1 },
    kassadin:    { grp:'assassin', melee:1, gap:0, dmg:'AP', allIn:'late',   sustain:0, scale:2 },
    katarina:    { grp:'assassin', melee:1, gap:2, dmg:'AP', allIn:'flat',   sustain:0, scale:1 },
    leblanc:     { grp:'assassin', melee:0, gap:2, dmg:'AP', allIn:'early',  sustain:0, scale:0 },
    naafiri:     { grp:'assassin', melee:1, gap:2, dmg:'AD', allIn:'early',  sustain:1, scale:0 },
    qiyana:      { grp:'assassin', melee:1, gap:2, dmg:'AD', allIn:'flat',   sustain:0, scale:1 },
    sylas:       { grp:'assassin', melee:1, gap:2, dmg:'AP', allIn:'spike6', sustain:1, scale:1 },
    talon:       { grp:'assassin', melee:1, gap:2, dmg:'AD', allIn:'early',  sustain:0, scale:0 },
    zed:         { grp:'assassin', melee:1, gap:2, dmg:'AD', allIn:'spike6', sustain:0, scale:1 },
    galio:       { grp:'fighter', melee:1, gap:1, dmg:'AP', allIn:'flat',  sustain:0, scale:1 },
    irelia:      { grp:'fighter', melee:1, gap:2, dmg:'mixed', allIn:'early', sustain:1, scale:1 },
    pantheon:    { grp:'fighter', melee:1, gap:1, dmg:'AD', allIn:'early', sustain:0, scale:0 },
    yasuo:       { grp:'fighter', melee:1, gap:2, dmg:'AD', allIn:'flat',  sustain:0, scale:2, proj:1 },
    yone:        { grp:'fighter', melee:1, gap:2, dmg:'mixed', allIn:'spike6', sustain:0, scale:2 }
  };

  // Per-enemy matchup-defining ability (champion-agnostic, mid context).
  const KEYS = {
    anivia:      { slot:'Q', name:'Flash Frost (Stun)', cd:'10s', note:'The slow-moving stun starts every Anivia kill — sidestep it and her E never doubles.', winT:'FLASH FROST DOWN' },
    aurelionsol: { slot:'W', name:'Astral Flight', cd:'22s', note:'His reposition and escape — he is a stationary battery while it is down.', winT:'FLIGHT DOWN' },
    azir:        { slot:'E', name:'Shifting Sands', cd:'19s', note:'His shield-dash to a soldier — engage the window after he burns it.', winT:'SHIFT DOWN' },
    cassiopeia:  { slot:'W', name:'Miasma', cd:'12s', note:'Grounds you — dashes and leaps are disabled inside it.', winT:'MIASMA DOWN' },
    hwei:        { slot:'E', name:'Subject: Fear (CC Paints)', cd:'10s', note:'All his crowd control lives on the E palette — dodge the fear/root and the burst never chains.', winT:'E PAINT DOWN' },
    lissandra:   { slot:'E', name:'Glacial Path (Claw)', cd:'24s', note:'Her engage and escape in one button — she is immobile while it is down.', winT:'CLAW DOWN' },
    malzahar:    { slot:'R', name:'Nether Grasp', cd:'140s', note:'Point-and-click suppression — never step up solo while his passive shield is intact and R is up.', winT:'GRASP DOWN' },
    orianna:     { slot:'R', name:'Command: Shockwave', cd:'110s', note:'The fight-flipping wombo — track the ball position like a second enemy.', winT:'SHOCKWAVE DOWN' },
    ryze:        { slot:'W', name:'Rune Prison (Root)', cd:'13s', note:'Point-blank root — respect the EQ chain that follows it.', winT:'ROOT DOWN' },
    swain:       { slot:'R', name:'Demonic Ascension', cd:'—', note:'His drain mode — disengage and reset the fight when it starts.', winT:'ASCENSION DOWN' },
    syndra:      { slot:'E', name:'Scatter the Weak (Stun)', cd:'15s', note:'The QE stun cone starts every kill combo — stay off the line between her and her orbs.', winT:'STUN DOWN' },
    taliyah:     { slot:'W', name:'Seismic Shove', cd:'14s', note:'The shove into Unraveled Earth is her whole setup — sidestep it and the burst whiffs.', winT:'SHOVE DOWN' },
    viktor:      { slot:'W', name:'Gravity Field', cd:'17s', note:'The stun zone owns every all-in — walk out the moment it drops or fight outside it.', winT:'FIELD DOWN' },
    vladimir:    { slot:'W', name:'Sanguine Pool', cd:'22s', note:'Untargetable dodge — bait it before you spend your kill window.', winT:'POOL DOWN' },
    xerath:      { slot:'E', name:'Shocking Orb (Stun)', cd:'12s', note:'His only CC — dodge the orb and his artillery never converts into a kill.', winT:'ORB DOWN' },
    ziggs:       { slot:'W', name:'Satchel Charge', cd:'20s', note:'His knockback escape — he is catchable only while it is down.', winT:'SATCHEL DOWN' },
    ahri:        { slot:'E', name:'Charm', cd:'12s', note:'The charm starts every kill pattern — stay behind minions while it is up.', winT:'CHARM DOWN' },
    annie:       { slot:'R', name:'Summon: Tibbers', cd:'120s', note:'Flash-Tibbers off a stocked passive stun is her whole threat — watch the glow under her feet.', winT:'TIBBERS DOWN' },
    aurora:      { slot:'W', name:'Across the Veil (Hop)', cd:'14s', note:'Her hop + stealth escape — she is killable only while it is down.', winT:'HOP DOWN' },
    brand:       { slot:'Q', name:'Sear (Stun)', cd:'8s', note:'Q only stuns when you are ablaze — after eating W or E, the stun line is the dodge that matters.', winT:'SEAR DOWN' },
    karma:       { slot:'W', name:'Focused Resolve (Tether)', cd:'12s', note:'The root tether — break it with range or line of sight.', winT:'TETHER DOWN' },
    lux:         { slot:'Q', name:'Light Binding', cd:'10s', note:'Everything keys off the root — minion-block it and her combo never starts.', winT:'BINDING DOWN' },
    mel:         { slot:'W', name:'Rebuttal', cd:'20s', note:'Reflects your projectiles back — never poke while it glows.', winT:'REBUTTAL DOWN' },
    neeko:       { slot:'E', name:'Tangle-Barbs (Root)', cd:'10s', note:'The root sets up her whole burst — sidestep it behind minions.', winT:'ROOT DOWN' },
    twistedfate: { slot:'W', name:'Pick a Card (Gold)', cd:'6s', note:'The locked gold card starts every trade and gank — back off the moment it glows yellow.', winT:'GOLD CARD SPENT' },
    veigar:      { slot:'E', name:'Event Horizon (Cage)', cd:'17s', note:'Only the cage EDGE stuns — hold position near the center or leave before it forms; never dash into the wall.', winT:'CAGE DOWN' },
    vex:         { slot:'W', name:'Personal Space (Fear)', cd:'15s', note:'Shield + AoE fear that punishes dashes — never dash onto her while her passive glows.', winT:'FEAR SPENT' },
    zoe:         { slot:'E', name:'Sleepy Trouble Bubble', cd:'16s', note:'Sleep into empowered Q is the entire kill pattern — body-block it with minions or terrain.', winT:'BUBBLE DOWN' },
    akali:       { slot:'W', name:'Twilight Shroud', cd:'18s', note:'Untargetable inside — hold your CC and burst for when she exits.', winT:'SHROUD DOWN' },
    akshan:      { slot:'E', name:'Heroic Swing', cd:'14s', note:'His swing engage/escape — fight only while it is down.', winT:'SWING DOWN' },
    diana:       { slot:'Q', name:'Crescent Strike', cd:'7s', note:'Moonlight marks reset her dash — sidestep the arc and her dive has no follow-up.', winT:'CRESCENT DOWN' },
    ekko:        { slot:'R', name:'Chronobreak', cd:'110s', note:'Erases your kill and bursts back — track the hologram and save final damage for after it.', winT:'CHRONOBREAK DOWN' },
    fizz:        { slot:'E', name:'Playful / Trickster', cd:'16s', note:'The untargetable hop dodges your whole combo — bait it before spending your burst.', winT:'HOP DOWN' },
    kassadin:    { slot:'R', name:'Riftwalk', cd:'6s', note:'His mobility spike — the lane is decided before it scales.', winT:'PRE-6 WINDOW' },
    katarina:    { slot:'E', name:'Shunpo', cd:'12s', note:'Her blink to daggers and targets — hard CC during her resets and she folds.', winT:'SHUNPO DOWN' },
    leblanc:     { slot:'W', name:'Distortion', cd:'14s', note:'Dash with a four-second return window — punish the return spot, and remember she is broke after it.', winT:'DISTORTION DOWN' },
    naafiri:     { slot:'W', name:'Hounds\u2019 Pursuit', cd:'20s', note:'The lock-on pack dash starts her dive — stand near minions to body-block the hounds.', winT:'PURSUIT DOWN' },
    qiyana:      { slot:'E', name:'Audacity', cd:'11s', note:'Her stick dash — once spent she cannot reach you; kite the cooldown.', winT:'AUDACITY DOWN' },
    sylas:       { slot:'E', name:'Abscond / Abduct', cd:'14s', note:'Dash into chain-stun — punish him hard while it is down.', winT:'CHAIN DOWN' },
    talon:       { slot:'W', name:'Rake', cd:'9s', note:'The boomerang return is most of his lane damage — stand off the return line.', winT:'RAKE DOWN' },
    zed:         { slot:'R', name:'Death Mark', cd:'120s', note:'The all-in — spend your defensive answer AFTER the mark lands, not before.', winT:'DEATH MARK DOWN' },
    galio:       { slot:'E', name:'Justice Punch', cd:'13s', note:'His dash knockup — he has no engage while it is down.', winT:'PUNCH DOWN' },
    irelia:      { slot:'E', name:'Flawless Duet (Stun)', cd:'18s', note:'Her stun setup — dodge it and the dive falls apart.', winT:'STUN DOWN' },
    pantheon:    { slot:'W', name:'Shield Vault (Stun)', cd:'14s', note:'Point-and-click stun — respect the all-in any time it is up.', winT:'VAULT DOWN' },
    yasuo:       { slot:'W', name:'Wind Wall', cd:'26s', note:'Blocks every projectile for its duration — hold your poke until it is spent.', winT:'WIND WALL DOWN' },
    yone:        { slot:'E', name:'Soul Unbound', cd:'22s', note:'His burst window — survive it and punish the body he snaps back to.', winT:'SOUL UNBOUND DOWN' }
  };

  function fill(tpl, ctx) {
    return (tpl || '')
      .replace(/\{E\}/g, ctx.E).replace(/\{K\}/g, ctx.K).replace(/\{KS\}/g, ctx.KS)
      .replace(/\{ME\}/g, ctx.ME)
      .replace(/\b(his|her|their|the) The /g, 'The ');
  }

  const STAGE_LABELS = ['Level 1', 'Level 2', 'Level 3', 'Levels 4-5', 'Level 6', 'First item', '2+ items'];
  const DIFF_SCORE = { FAVOURED: 1.3, EVEN: 0, TRICKY: -0.7, HARD: -1.5, MIRROR: 0 };

  function enemyStageMod(etag, i) {
    let m = 0;
    if (etag.allIn === 'early' && i <= 3) m -= 0.6;
    if (etag.allIn === 'spike6' && i === 4) m -= 0.7;
    if (etag.allIn === 'late' && i >= 5) m -= 0.5 * (etag.scale || 1);
    if (etag.allIn === 'late' && i <= 2) m += 0.5;
    if (etag.scale === 2 && i === 6) m -= 0.4;
    return m;
  }

  function phasesFor(cfg, k, etag, diff, ctx) {
    const out = [];
    for (let i = 0; i < 7; i++) {
      const score = DIFF_SCORE[diff] + (cfg.curve[i] || 0) + enemyStageMod(etag, i);
      let side = 'Skill';
      if (diff === 'MIRROR') side = 'Skill';
      else if (score > 0.55) side = cfg.name;
      else if (score < -0.55) side = ctx.E;
      const rating = side === 'Skill' ? (i >= 4 ? '6/10' : '5/10')
        : (5 + Math.min(3, Math.round(Math.abs(score) * 1.6))) + '/10';
      let why = fill(cfg.lvl[i], ctx);
      out.push({ label: STAGE_LABELS[i], side, rating, why });
    }
    return out;
  }

  function gen(cfg) {
    const data = {}, full = {}, loadouts = {};
    const enemies = Object.keys(ETAG);
    for (const k of enemies) {
      const etag = ETAG[k];
      const key = KEYS[k];
      const E = NAME[k] || (k.charAt(0).toUpperCase() + k.slice(1));
      const isMirror = k === cfg.key;
      const diff = isMirror ? 'MIRROR' : (cfg.diffEx[k] || cfg.diffBase[etag.grp] || 'EVEN');
      const tone = TONE[diff];
      const ctx = { E, K: key.name, KS: key.slot, ME: cfg.name };
      const grpT = isMirror ? cfg.mirror : (cfg.specials && cfg.specials[k]) ? Object.assign({}, cfg.vs[etag.grp], cfg.specials[k]) : cfg.vs[etag.grp];

      const dos = grpT.dos.map(t => fill(t, ctx));
      const donts = grpT.donts.map(t => fill(t, ctx));
      const entry = {
        diff, tone,
        tldr: fill(grpT.tldr, ctx),
        breakdown: fill(grpT.breakdown, ctx),
        dos, donts,
        key: { slot: key.slot, name: key.name, cd: key.cd, note: key.note, winT: key.winT, winS: fill(grpT.winS || cfg.winS, ctx) },
        win: fill(grpT.win, ctx)
      };
      data[k] = entry;

      const dr = RATING[diff];
      const phases = phasesFor(cfg, k, etag, diff, ctx);
      const tradeGood = fill(grpT.tradeGood || cfg.tradeGood, ctx);
      const tradeBad = fill(grpT.tradeBad || cfg.tradeBad, ctx);
      const wave = 'Best wave: ' + fill(grpT.waveBest || cfg.waveBest, ctx) +
        ' Worst wave: ' + fill(grpT.waveWorst || cfg.waveWorst, ctx) +
        ' Crash timing: crash to reset, take plates, or set up a roam — mid is a roam-timer lane, never shove on autopilot.';
      const winCon = entry.win.replace(/\.$/, '') + '. Track ' + key.name + ' before every commit and keep the wave where your pattern works.';
      const enemyWinTail = (etag.grp === 'assassin' || etag.grp === 'fighter' || etag.melee)
        ? 'forcing the all-in before your pattern comes online.'
        : 'winning the range war and denying your tempo.';
      const mistakes = donts.map(s => s.replace(/\.$/, '')).join('. ') + '. Don\u2019t spend your ultimate on chip damage \u2014 it is the kill window.';
      const ahead = fill(cfg.aheadTpl, ctx);
      const behind = fill(cfg.behindTpl, ctx);
      const fullE = {
        tldr: entry.tldr,
        winCon,
        enemyWin: isMirror ? 'The enemy ' + cfg.name + ' wins the same way you do — cleaner cooldown tracking and fewer wasted commitments.' : E + ' wins by landing ' + key.name + ', denying your pattern, and ' + enemyWinTail,
        diff, tone, diffRating: dr[0], carryRating: dr[1],
        phases,
        breakdown: {
          early: fill(grpT.early || cfg.early, ctx),
          mid: fill(grpT.mid || cfg.mid, ctx),
          wave,
          cooldowns: '- ' + E + ' ' + key.name + ': matchup-defining \u2014 ' + key.note + ' Track it before every step-up. - Your ' + cfg.safetyTool + ': never waste it on chip damage \u2014 it is your survival button. - Your ultimate: spend it on kill windows, not on waves.',
          trading: 'Good trade: ' + tradeGood + ' Bad trade: ' + tradeBad,
          spikes: fill(cfg.spikesLine, ctx),
          feeding: 'If ' + E + ' gets one kill, respect ' + key.name + ' and reset to farming. Two kills: play for the team, not for solo redemption \u2014 ' + fill(cfg.behindShort, ctx),
          carry: fill(cfg.carryLine, ctx),
          difficulty: (diff === 'HARD' ? 'Hard matchup' : diff === 'TRICKY' ? 'Tricky matchup' : diff === 'FAVOURED' ? 'Favoured matchup' : diff === 'MIRROR' ? 'Mirror matchup' : 'Even matchup') + ' \u2014 difficulty ' + dr[0] + ', ' + E + ' carry threat ' + dr[1] + '.',
          late: fill(grpT.late || cfg.late, ctx)
        },
        loading: '- ' + cfg.name + ' vs ' + E + ' - Track: ' + E + ' ' + key.name + '. - ' + fill(cfg.loadingRule, ctx) + ' - Engage only on ' + key.name + '\u2019s cooldown. - Spend your ultimate on kill windows only.',
        focus: { text: E + ' ' + key.name, letters: [key.slot] },
        dosFull: [
          { t: dos[0], d: key.note + ' Only commit once it is down or baited.' },
          { t: dos[1], d: tradeGood },
          { t: dos[2], d: E + ' wastes ' + key.name + ' \u2014 that is your full-commit window.' }
        ],
        dontsFull: [
          { t: donts[0], d: 'That is ' + E + '\u2019s favourite window \u2014 refusing it removes half his win condition.' },
          { t: donts[1], d: fill(cfg.dontDetail, ctx) },
          { t: donts[2], d: tradeBad }
        ],
        tradeGood, tradeBad,
        ahead,
        report: [
          { h: 'TL;DR', t: entry.tldr },
          { h: 'Core Lane Win Condition', t: winCon },
          { h: 'Level Advantage Chart', t: 'Skill-based; spikes decide it. See the level-by-level chart for the swing points.' },
          { h: 'Trading Rules', t: 'Good trade: ' + tradeGood + ' Great trade: ' + E + ' wastes ' + key.name + ' \u2014 commit immediately. Bad trade: ' + tradeBad },
          { h: 'Wave Management', t: wave },
          { h: 'Key Ability Interactions', t: 'Track ' + E + '\u2019s ' + key.name + ': ' + key.note + ' Commit only while it is down.' },
          { h: 'Rune Setup', t: cfg.runeReport },
          { h: 'Summoner Spells', t: cfg.summReport },
          { h: 'Itemization', t: fill(cfg.itemReport, ctx) + (etag.sustain ? ' Add anti-heal early into his sustain.' : '') },
          { h: 'All-In Windows', t: 'Commit on ' + key.name + '\u2019s cooldown, on your ' + cfg.spikeName + ' spike, and with your jungler\u2019s setup. Bait his answer first.' },
          { h: 'Roam & Jungle Interaction', t: fill(cfg.jungleLine, ctx) },
          { h: 'Common Mistakes', t: mistakes },
          { h: 'How to Play From Behind', t: behind },
          { h: 'How to Snowball', t: ahead },
          { h: 'Final Matchup Rating', t: (diff === 'HARD' ? 'Hard matchup' : diff === 'TRICKY' ? 'Tricky matchup' : diff === 'FAVOURED' ? 'Favoured matchup' : diff === 'MIRROR' ? 'Mirror matchup' : 'Even matchup') + ' \u2014 difficulty ' + dr[0] + ', ' + E + ' carry threat ' + dr[1] + '.' }
        ]
      };
      full[k] = fullE;

      const L = cfg.load;
      loadouts[k] = {
        diff,
        start: L.start,
        firstBack: etag.sustain ? L.antihealBack : L.normalBack,
        firstItem: L.firstItem,
        secondItem: L.secondItem,
        boots: etag.dmg === 'AP' ? L.bootsVsAP : (etag.dmg === 'AD' ? L.bootsVsAD : L.boots),
        spike: L.spike,
        runes: L.runes,
        wr: WR[diff],
        reddit: (function(s){ return 'Consensus on ' + L.sub + ': ' + s.charAt(0).toUpperCase() + s.slice(1); })(fill(grpT.redditLine || cfg.redditLine, ctx)) + (etag.sustain ? ' ' + L.antihealNote : '')
      };
    }
    return { data, full, loadouts };
  }

  return { TONE, RATING, ETAG, KEYS, NAME, fill, gen };
})();

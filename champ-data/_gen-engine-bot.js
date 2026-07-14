// MatchupCoach — generator engine for BOT champions. Loaded only by run_script generation passes.
// Groups: hyper (Hypercarries & Crit) · utility (Utility & Lane Marksmen) · apc (APC & Flex)
// Usage: GEN_ENGINE_BOT.gen(cfg) -> { data, full, loadouts }
window.GEN_ENGINE_BOT = (function () {
  const TONE = { FAVOURED: '#3ddc97', EVEN: '#e8b84b', TRICKY: '#ff8b3d', HARD: '#ff5d6c', MIRROR: '#e8b84b' };
  const RATING = { HARD: ['8/10', '8.5/10'], TRICKY: ['7/10', '7.5/10'], EVEN: ['5.5/10', '6/10'], FAVOURED: ['4/10', '5/10'], MIRROR: ['5/10', '7/10'] };
  const WR = { HARD: '≈46–47% — survive, scale, group', TRICKY: '≈48–49% — playable with discipline', EVEN: '≈50% — skill matchup', FAVOURED: '≈52–53% — your lane to lose', MIRROR: '50% — mirror, mechanics decide' };

  const NAME = {
    aphelios:'Aphelios', ashe:'Ashe', caitlyn:'Caitlyn', draven:'Draven', jhin:'Jhin', jinx:'Jinx', kaisa:"Kai'Sa",
    kogmaw:"Kog'Maw", nilah:'Nilah', samira:'Samira', smolder:'Smolder', tristana:'Tristana', twitch:'Twitch',
    vayne:'Vayne', zeri:'Zeri', corki:'Corki', ezreal:'Ezreal', kalista:'Kalista', lucian:'Lucian',
    missfortune:'Miss Fortune', senna:'Senna', sivir:'Sivir', varus:'Varus', xayah:'Xayah',
    heimerdinger:'Heimerdinger', karthus:'Karthus', seraphine:'Seraphine', swain:'Swain', veigar:'Veigar', ziggs:'Ziggs'
  };

  const ETAG = {
    aphelios:    { grp:'hyper', melee:0, gap:0, dmg:'AD', allIn:'late',  sustain:1, scale:2 },
    ashe:        { grp:'hyper', melee:0, gap:0, dmg:'AD', allIn:'flat',  sustain:0, scale:1 },
    caitlyn:     { grp:'hyper', melee:0, gap:1, dmg:'AD', allIn:'early', sustain:0, scale:1 },
    draven:      { grp:'hyper', melee:0, gap:1, dmg:'AD', allIn:'early', sustain:0, scale:1 },
    jhin:        { grp:'hyper', melee:0, gap:0, dmg:'AD', allIn:'flat',  sustain:0, scale:1 },
    jinx:        { grp:'hyper', melee:0, gap:0, dmg:'AD', allIn:'late',  sustain:0, scale:2 },
    kaisa:       { grp:'hyper', melee:0, gap:2, dmg:'mixed', allIn:'late', sustain:0, scale:2 },
    kogmaw:      { grp:'hyper', melee:0, gap:0, dmg:'mixed', allIn:'late', sustain:0, scale:2 },
    nilah:       { grp:'hyper', melee:1, gap:2, dmg:'AD', allIn:'flat',  sustain:1, scale:2 },
    samira:      { grp:'hyper', melee:0, gap:2, dmg:'AD', allIn:'early', sustain:0, scale:1 },
    smolder:     { grp:'hyper', melee:0, gap:1, dmg:'mixed', allIn:'late', sustain:0, scale:2 },
    tristana:    { grp:'hyper', melee:0, gap:2, dmg:'AD', allIn:'early', sustain:0, scale:2 },
    twitch:      { grp:'hyper', melee:0, gap:0, dmg:'AD', allIn:'late',  sustain:0, scale:2 },
    vayne:       { grp:'hyper', melee:0, gap:1, dmg:'AD', allIn:'late',  sustain:0, scale:2 },
    zeri:        { grp:'hyper', melee:0, gap:2, dmg:'AD', allIn:'late',  sustain:0, scale:2 },
    corki:       { grp:'utility', melee:0, gap:1, dmg:'mixed', allIn:'flat', sustain:0, scale:1, proj:1 },
    ezreal:      { grp:'utility', melee:0, gap:2, dmg:'mixed', allIn:'flat', sustain:0, scale:1, proj:1 },
    kalista:     { grp:'utility', melee:0, gap:2, dmg:'AD', allIn:'early', sustain:0, scale:1 },
    lucian:      { grp:'utility', melee:0, gap:2, dmg:'AD', allIn:'early', sustain:0, scale:1 },
    missfortune: { grp:'utility', melee:0, gap:0, dmg:'AD', allIn:'early', sustain:0, scale:1 },
    senna:       { grp:'utility', melee:0, gap:0, dmg:'AD', allIn:'flat', sustain:1, scale:2, proj:1 },
    sivir:       { grp:'utility', melee:0, gap:0, dmg:'AD', allIn:'flat', sustain:0, scale:1, proj:1 },
    varus:       { grp:'utility', melee:0, gap:0, dmg:'AD', allIn:'flat', sustain:0, scale:1, proj:1 },
    xayah:       { grp:'utility', melee:0, gap:0, dmg:'AD', allIn:'flat', sustain:0, scale:1, proj:1 },
    heimerdinger:{ grp:'apc', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:0, scale:1, proj:1 },
    karthus:     { grp:'apc', melee:0, gap:0, dmg:'AP', allIn:'late', sustain:0, scale:2 },
    seraphine:   { grp:'apc', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:1, scale:1, proj:1 },
    swain:       { grp:'apc', melee:0, gap:0, dmg:'AP', allIn:'spike6', sustain:1, scale:1 },
    veigar:      { grp:'apc', melee:0, gap:0, dmg:'AP', allIn:'late', sustain:0, scale:2 },
    ziggs:       { grp:'apc', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:0, scale:1, proj:1 }
  };

  const KEYS = {
    aphelios:    { slot:'R', name:'Moonlight Vigil', cd:'120s', note:'The teamfight opener whose damage depends on his loaded gun — never clump once he hits 6.', winT:'VIGIL DOWN' },
    ashe:        { slot:'R', name:'Enchanted Crystal Arrow', cd:'100s', note:'The global stun starts every Ashe kill play — juke laterally at range; the stun grows with distance.', winT:'ARROW DOWN' },
    caitlyn:     { slot:'W', name:'Yordle Snap Traps', cd:'—', note:'The trap under your feet starts the headshot chain — never fight standing on one.', winT:'TRAPS CLEARED' },
    draven:      { slot:'Q', name:'Spinning Axe', cd:'—', note:'Two spinning axes is lane-bully damage — stand on his pickup spots and his power halves.', winT:'AXES DROPPED' },
    jhin:        { slot:'W', name:'Deadly Flourish (Root)', cd:'14s', note:'The cross-map root chains off any damage you took — never linger after a trade.', winT:'FLOURISH DOWN' },
    jinx:        { slot:'E', name:'Flame Chompers!', cd:'24s', note:'The chompers flip any engage onto her into a counter-kill — walk around, never through.', winT:'CHOMPERS DOWN' },
    kaisa:       { slot:'E', name:'Supercharger', cd:'16s', note:'Her reposition + stealth window — engage in the sixteen seconds after she burns it.', winT:'CHARGE DOWN' },
    kogmaw:      { slot:'W', name:'Bio-Arcane Barrage', cd:'17s', note:'The range + shred window IS the champion — disengage for its eight seconds, fight the gaps.', winT:'BARRAGE DOWN' },
    nilah:       { slot:'W', name:'Jubilant Veil', cd:'26s', note:'Dodges ALL attacks while it shimmers — never auto into the veil; spells still land.', winT:'VEIL DOWN' },
    samira:      { slot:'W', name:'Blade Whirl', cd:'30s', note:'Deletes every projectile for a second — hold your key shots until the whirl is spent.', winT:'WHIRL DOWN' },
    smolder:     { slot:'E', name:'Flap, Flap, Flap', cd:'20s', note:'The glide over terrain is his whole escape — engage in the window after it shows.', winT:'GLIDE DOWN' },
    tristana:    { slot:'W', name:'Rocket Jump', cd:'18s', note:'Her engage AND escape in one button — once spent she is the lane\u2019s most catchable carry.', winT:'JUMP DOWN' },
    twitch:      { slot:'Q', name:'Ambush (Stealth)', cd:'13s', note:'The stealth approach starts every Twitch fight — sweep the flanks and track the disappearance.', winT:'STEALTH SPOTTED' },
    vayne:       { slot:'E', name:'Condemn', cd:'18s', note:'Wall-stuns you — never fight her with terrain at your back.', winT:'CONDEMN DOWN' },
    zeri:        { slot:'E', name:'Spark Surge', cd:'20s', note:'The wall-dash escape — she is catchable only while it is down.', winT:'SURGE DOWN' },
    corki:       { slot:'W', name:'Valkyrie', cd:'20s', note:'His only escape — once the dash is spent he is a slow turret with no exits.', winT:'VALKYRIE DOWN' },
    ezreal:      { slot:'E', name:'Arcane Shift', cd:'19s', note:'The blink makes him untouchable — punish the nineteen seconds after he burns it.', winT:'SHIFT DOWN' },
    kalista:     { slot:'R', name:'Fate\u2019s Call', cd:'120s', note:'The support-toss engage — respect every brush her Oathsworn could be sitting in.', winT:'CALL DOWN' },
    lucian:      { slot:'E', name:'Relentless Pursuit', cd:'14s', note:'His dash — lock him down while it is on cooldown.', winT:'DASH DOWN' },
    missfortune: { slot:'R', name:'Bullet Time', cd:'110s', note:'The channel deletes grouped fights — spread, interrupt, and never clump in her cone.', winT:'BULLET TIME DOWN' },
    senna:       { slot:'W', name:'Last Embrace (Root)', cd:'11s', note:'The root starts every Senna pick and it spreads — stand off your own minions.', winT:'ROOT DOWN' },
    sivir:       { slot:'E', name:'Spell Shield', cd:'22s', note:'Eats your key spell and refunds her mana — bait it with a cheap cast first.', winT:'SHIELD DOWN' },
    varus:       { slot:'R', name:'Chain of Corruption', cd:'100s', note:'The spreading root starts dives — stand apart from allies when it flies.', winT:'CHAIN DOWN' },
    xayah:       { slot:'E', name:'Bladecaller (Feathers)', cd:'12s', note:'The feather pull-back roots through everything — never stand on her feather line.', winT:'FEATHERS CLEARED' },
    heimerdinger:{ slot:'E', name:'CH-2 Grenade (Stun)', cd:'11s', note:'The stun makes his turret nest lethal — dodge it before committing anything.', winT:'GRENADE DOWN' },
    karthus:     { slot:'R', name:'Requiem', cd:'200s', note:'The global execute — recall above the red line and track it from his level 6 on.', winT:'REQUIEM DOWN' },
    seraphine:   { slot:'E', name:'Beat Drop (Root)', cd:'10s', note:'Roots anyone already slowed — dodge it and the song never builds to the charm.', winT:'BEAT DOWN' },
    swain:       { slot:'R', name:'Demonic Ascension', cd:'—', note:'His drain mode — disengage and reset the fight when it starts.', winT:'ASCENSION DOWN' },
    veigar:      { slot:'E', name:'Event Horizon (Cage)', cd:'17s', note:'Only the cage EDGE stuns — hold near the center or leave before it forms.', winT:'CAGE DOWN' },
    ziggs:       { slot:'W', name:'Satchel Charge', cd:'20s', note:'His knockback escape — and your tower\u2019s execution clause; he is catchable while it is down.', winT:'SATCHEL DOWN' }
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
      out.push({ label: STAGE_LABELS[i], side, rating, why: fill(cfg.lvl[i], ctx) });
    }
    return out;
  }

  function gen(cfg) {
    const data = {}, full = {}, loadouts = {};
    for (const k of Object.keys(ETAG)) {
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
        ' Crash timing: bot is a 2v2 on a drake timer — crash to reset, take plates, or rotate; never shove into a loaded all-in.';
      const winCon = entry.win.replace(/\.$/, '') + '. Track ' + key.name + ' before every commit and keep the wave where your pattern works.';
      const enemyWinTail = etag.grp === 'apc'
        ? 'winning the poke war and denying your tempo.'
        : 'winning the DPS race and denying your scaling curve.';
      const mistakes = donts.map(s => s.replace(/\.$/, '')).join('. ') + '. Don\u2019t spend your ultimate on chip damage \u2014 it is the kill window.';
      const ahead = fill(cfg.aheadTpl, ctx);
      const behind = fill(cfg.behindTpl, ctx);
      full[k] = {
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
          { h: 'All-In Windows', t: 'Commit on ' + key.name + '\u2019s cooldown, on your ' + cfg.spikeName + ' spike, and with your support\u2019s setup. Bait his answer first.' },
          { h: 'Support & Jungle Interaction', t: fill(cfg.jungleLine, ctx) },
          { h: 'Common Mistakes', t: mistakes },
          { h: 'How to Play From Behind', t: behind },
          { h: 'How to Snowball', t: ahead },
          { h: 'Final Matchup Rating', t: (diff === 'HARD' ? 'Hard matchup' : diff === 'TRICKY' ? 'Tricky matchup' : diff === 'FAVOURED' ? 'Favoured matchup' : diff === 'MIRROR' ? 'Mirror matchup' : 'Even matchup') + ' \u2014 difficulty ' + dr[0] + ', ' + E + ' carry threat ' + dr[1] + '.' }
        ]
      };

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

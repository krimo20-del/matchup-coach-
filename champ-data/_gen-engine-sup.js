// MatchupCoach — generator engine for SUPPORT champions. Loaded only by run_script generation passes.
// Groups: enchanter · warden · catcher · mage
window.GEN_ENGINE_SUP = (function () {
  const TONE = { FAVOURED: '#3ddc97', EVEN: '#e8b84b', TRICKY: '#ff8b3d', HARD: '#ff5d6c', MIRROR: '#e8b84b' };
  const RATING = { HARD: ['8/10', '8.5/10'], TRICKY: ['7/10', '7.5/10'], EVEN: ['5.5/10', '6/10'], FAVOURED: ['4/10', '5/10'], MIRROR: ['5/10', '7/10'] };
  const WR = { HARD: '≈46–47% — survive, scale, group', TRICKY: '≈48–49% — playable with discipline', EVEN: '≈50% — skill matchup', FAVOURED: '≈52–53% — your lane to lose', MIRROR: '50% — mirror, mechanics decide' };

  const NAME = {
    janna:'Janna', karma:'Karma', lulu:'Lulu', milio:'Milio', nami:'Nami', renata:'Renata Glasc', senna:'Senna',
    seraphine:'Seraphine', sona:'Sona', soraka:'Soraka', yuumi:'Yuumi', zilean:'Zilean',
    alistar:'Alistar', braum:'Braum', galio:'Galio', leona:'Leona', maokai:'Maokai', poppy:'Poppy', rell:'Rell',
    tahmkench:'Tahm Kench', taric:'Taric',
    bard:'Bard', blitzcrank:'Blitzcrank', nautilus:'Nautilus', pyke:'Pyke', rakan:'Rakan', thresh:'Thresh',
    brand:'Brand', hwei:'Hwei', lux:'Lux', morgana:'Morgana', neeko:'Neeko', swain:'Swain', velkoz:"Vel'Koz", xerath:'Xerath', zyra:'Zyra'
  };

  const ETAG = {
    janna:     { grp:'enchanter', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:1, scale:1 },
    karma:     { grp:'enchanter', melee:0, gap:0, dmg:'AP', allIn:'early', sustain:1, scale:0, proj:1 },
    lulu:      { grp:'enchanter', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:1, scale:1 },
    milio:     { grp:'enchanter', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:1, scale:1 },
    nami:      { grp:'enchanter', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:1, scale:1, proj:1 },
    renata:    { grp:'enchanter', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:1, scale:1, proj:1 },
    senna:     { grp:'enchanter', melee:0, gap:0, dmg:'AD', allIn:'flat', sustain:1, scale:2, proj:1 },
    seraphine: { grp:'enchanter', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:1, scale:1, proj:1 },
    sona:      { grp:'enchanter', melee:0, gap:0, dmg:'AP', allIn:'late', sustain:1, scale:2 },
    soraka:    { grp:'enchanter', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:1, scale:1 },
    yuumi:     { grp:'enchanter', melee:0, gap:0, dmg:'AP', allIn:'late', sustain:1, scale:1 },
    zilean:    { grp:'enchanter', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:0, scale:1 },
    alistar:   { grp:'warden', melee:1, gap:2, dmg:'AP', allIn:'early', sustain:1, scale:1 },
    braum:     { grp:'warden', melee:1, gap:1, dmg:'AP', allIn:'flat', sustain:0, scale:1 },
    galio:     { grp:'warden', melee:1, gap:1, dmg:'AP', allIn:'flat', sustain:0, scale:1 },
    leona:     { grp:'warden', melee:1, gap:2, dmg:'AP', allIn:'early', sustain:0, scale:1 },
    maokai:    { grp:'warden', melee:1, gap:1, dmg:'AP', allIn:'flat', sustain:1, scale:1 },
    poppy:     { grp:'warden', melee:1, gap:1, dmg:'AD', allIn:'flat', sustain:0, scale:1, antidash:1 },
    rell:      { grp:'warden', melee:1, gap:2, dmg:'AP', allIn:'early', sustain:0, scale:1 },
    tahmkench: { grp:'warden', melee:1, gap:0, dmg:'AP', allIn:'flat', sustain:1, scale:1 },
    taric:     { grp:'warden', melee:1, gap:0, dmg:'AP', allIn:'late', sustain:1, scale:2 },
    bard:      { grp:'catcher', melee:0, gap:1, dmg:'AP', allIn:'flat', sustain:1, scale:1 },
    blitzcrank:{ grp:'catcher', melee:1, gap:2, dmg:'AP', allIn:'early', sustain:0, scale:0 },
    nautilus:  { grp:'catcher', melee:1, gap:2, dmg:'AP', allIn:'early', sustain:0, scale:1 },
    pyke:      { grp:'catcher', melee:1, gap:2, dmg:'AD', allIn:'early', sustain:1, scale:1 },
    rakan:     { grp:'catcher', melee:1, gap:2, dmg:'AP', allIn:'flat', sustain:1, scale:1 },
    thresh:    { grp:'catcher', melee:1, gap:1, dmg:'AP', allIn:'flat', sustain:0, scale:1 },
    brand:     { grp:'mage', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:0, scale:1, proj:1 },
    hwei:      { grp:'mage', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:0, scale:1, proj:1 },
    lux:       { grp:'mage', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:0, scale:1, proj:1 },
    morgana:   { grp:'mage', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:0, scale:1, proj:1 },
    neeko:     { grp:'mage', melee:0, gap:0, dmg:'AP', allIn:'spike6', sustain:0, scale:1, proj:1 },
    swain:     { grp:'mage', melee:0, gap:0, dmg:'AP', allIn:'spike6', sustain:1, scale:1 },
    velkoz:    { grp:'mage', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:0, scale:1, proj:1 },
    xerath:    { grp:'mage', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:0, scale:1, proj:1 },
    zyra:      { grp:'mage', melee:0, gap:0, dmg:'AP', allIn:'flat', sustain:0, scale:1, proj:1 }
  };

  const KEYS = {
    janna:     { slot:'Q', name:'Howling Gale', cd:'12s', note:'The charged tornado breaks every engage — bait it before committing the dive.', winT:'GALE DOWN' },
    karma:     { slot:'W', name:'Focused Resolve (Tether)', cd:'12s', note:'The root tether — break it with range or line of sight.', winT:'TETHER DOWN' },
    lulu:      { slot:'W', name:'Whimsy (Polymorph)', cd:'17s', note:'The polymorph deletes a carry\u2019s kit mid-fight — bait it before the real engage.', winT:'POLYMORPH DOWN' },
    milio:     { slot:'R', name:'Breath of Life', cd:'160s', note:'The team-wide cleanse-heal undoes your CC chain — force it early, engage after.', winT:'CLEANSE DOWN' },
    nami:      { slot:'Q', name:'Aqua Prison', cd:'14s', note:'The bubble starts every Nami play — sidestep it and her kit is small numbers.', winT:'BUBBLE DOWN' },
    renata:    { slot:'R', name:'Hostile Takeover', cd:'130s', note:'The berserk wave turns your team on itself — never group in a line against it.', winT:'TAKEOVER DOWN' },
    senna:     { slot:'W', name:'Last Embrace (Root)', cd:'11s', note:'The root spreads to nearby targets — stand off your own minions and carry.', winT:'ROOT DOWN' },
    seraphine: { slot:'E', name:'Beat Drop (Root)', cd:'10s', note:'Roots the already-slowed — dodge it and the song never builds.', winT:'BEAT DOWN' },
    sona:      { slot:'R', name:'Crescendo', cd:'140s', note:'The stun chord flips grouped fights — spread while it is up.', winT:'CRESCENDO DOWN' },
    soraka:    { slot:'E', name:'Equinox', cd:'16s', note:'The silence zone cancels your engage mid-cast — step out before the root snaps.', winT:'EQUINOX DOWN' },
    yuumi:     { slot:'W', name:'You and Me! (Attach)', cd:'—', note:'Untargetable while attached — kill the host or catch the dismount windows.', winT:'DETACHED' },
    zilean:    { slot:'R', name:'Chronoshift', cd:'120s', note:'The revive undoes your kill — force it early or swap focus when it glows.', winT:'CHRONOSHIFT DOWN' },
    alistar:   { slot:'W', name:'Headbutt', cd:'14s', note:'The headbutt-pulverize combo starts every play — respect flash range while it is up.', winT:'HEADBUTT DOWN' },
    braum:     { slot:'E', name:'Unbreakable', cd:'18s', note:'The shield wall eats your poke and engage projectiles — wait it out.', winT:'WALL DOWN' },
    galio:     { slot:'E', name:'Justice Punch', cd:'13s', note:'His dash knockup — he has no engage while it is down.', winT:'PUNCH DOWN' },
    leona:     { slot:'E', name:'Zenith Blade', cd:'13s', note:'The blade root starts every Leona chain — stand behind minions while it is up.', winT:'BLADE DOWN' },
    maokai:    { slot:'W', name:'Twisted Advance (Root)', cd:'11s', note:'Point-and-click root — count its cooldown before stepping up.', winT:'ROOT DOWN' },
    poppy:     { slot:'W', name:'Steadfast Presence', cd:'12s', note:'Stops every dash near her — mobility dies inside the zone.', winT:'W IS DOWN' },
    rell:      { slot:'W', name:'Crash Down', cd:'13s', note:'The mount-crash knockup starts her chain — respect the dismount range.', winT:'CRASH DOWN' },
    tahmkench: { slot:'W', name:'Abyssal Dive', cd:'12s', note:'His re-engage and his escape — all-in only while it is down.', winT:'DIVE DOWN' },
    taric:     { slot:'R', name:'Cosmic Radiance', cd:'160s', note:'The delayed invulnerability erases your teamfight damage — burst before it lands or wait it out.', winT:'RADIANCE DOWN' },
    bard:      { slot:'Q', name:'Cosmic Binding', cd:'11s', note:'The wall-stun starts every Bard pick — never hug terrain near him.', winT:'BINDING DOWN' },
    blitzcrank:{ slot:'Q', name:'Rocket Grab', cd:'17s', note:'The hook IS the champion — minion cover turns the lane into a farming sim.', winT:'HOOK DOWN' },
    nautilus:  { slot:'Q', name:'Dredge Line (Hook)', cd:'15s', note:'His only real engage — dodge it and the lane is free.', winT:'HOOK DOWN' },
    pyke:      { slot:'Q', name:'Bone Skewer', cd:'11s', note:'The hook starts the chain — his R cleans what it catches.', winT:'HOOK DOWN' },
    rakan:     { slot:'W', name:'Grand Entrance', cd:'14s', note:'The leap knockup starts every play — track him in fog; the E extends it.', winT:'ENTRANCE DOWN' },
    thresh:    { slot:'Q', name:'Death Sentence', cd:'19s', note:'The hook starts the lantern chain — dodge it and the playbook waits 19 seconds.', winT:'HOOK DOWN' },
    brand:     { slot:'Q', name:'Sear (Stun)', cd:'8s', note:'Q only stuns the ablaze — after eating W or E, the stun line is the dodge.', winT:'SEAR DOWN' },
    hwei:      { slot:'E', name:'Subject: Fear (CC Paints)', cd:'10s', note:'All his CC lives on E — dodge the paint and the burst never chains.', winT:'E PAINT DOWN' },
    lux:       { slot:'Q', name:'Light Binding', cd:'10s', note:'Everything keys off the root — minion-block it and the combo never starts.', winT:'BINDING DOWN' },
    morgana:   { slot:'Q', name:'Dark Binding', cd:'10s', note:'The three-second root — minion-block it; the pool follows wherever it lands.', winT:'BINDING DOWN' },
    neeko:     { slot:'E', name:'Tangle-Barbs (Root)', cd:'10s', note:'The root sets up her whole burst — sidestep it behind minions.', winT:'ROOT DOWN' },
    swain:     { slot:'E', name:'Nevermove', cd:'14s', note:'The root that decides — dodge it and the general farms regret.', winT:'ROOT DOWN' },
    velkoz:    { slot:'E', name:'Tectonic Disruption', cd:'13s', note:'The knockup starts the true-damage rotation — dodge it and the research stalls.', winT:'DISRUPTION DOWN' },
    xerath:    { slot:'E', name:'Shocking Orb (Stun)', cd:'12s', note:'His only CC — dodge the orb and the artillery never converts.', winT:'ORB DOWN' },
    zyra:      { slot:'E', name:'Grasping Roots', cd:'12s', note:'The root blooms the garden on the held — dodge it behind minions.', winT:'ROOT DOWN' }
  };

  function fill(tpl, ctx) {
    return (tpl || '').replace(/\{E\}/g, ctx.E).replace(/\{K\}/g, ctx.K).replace(/\{KS\}/g, ctx.KS).replace(/\{ME\}/g, ctx.ME).replace(/\b(his|her|their|the) The /g, 'The ');
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
      if (diff !== 'MIRROR') { if (score > 0.55) side = cfg.name; else if (score < -0.55) side = ctx.E; }
      const rating = side === 'Skill' ? (i >= 4 ? '6/10' : '5/10') : (5 + Math.min(3, Math.round(Math.abs(score) * 1.6))) + '/10';
      out.push({ label: STAGE_LABELS[i], side, rating, why: fill(cfg.lvl[i], ctx) });
    }
    return out;
  }

  function gen(cfg) {
    const data = {}, full = {}, loadouts = {};
    for (const k of Object.keys(ETAG)) {
      const etag = ETAG[k], key = KEYS[k];
      const E = NAME[k] || (k.charAt(0).toUpperCase() + k.slice(1));
      const isMirror = k === cfg.key;
      const diff = isMirror ? 'MIRROR' : (cfg.diffEx[k] || cfg.diffBase[etag.grp] || 'EVEN');
      const tone = TONE[diff];
      const ctx = { E, K: key.name, KS: key.slot, ME: cfg.name };
      const grpT = isMirror ? cfg.mirror : (cfg.specials && cfg.specials[k]) ? Object.assign({}, cfg.vs[etag.grp], cfg.specials[k]) : cfg.vs[etag.grp];
      const dos = grpT.dos.map(t => fill(t, ctx));
      const donts = grpT.donts.map(t => fill(t, ctx));
      const entry = {
        diff, tone, tldr: fill(grpT.tldr, ctx), breakdown: fill(grpT.breakdown, ctx), dos, donts,
        key: { slot: key.slot, name: key.name, cd: key.cd, note: key.note, winT: key.winT, winS: fill(grpT.winS || cfg.winS, ctx) },
        win: fill(grpT.win, ctx)
      };
      data[k] = entry;
      const dr = RATING[diff];
      const phases = phasesFor(cfg, k, etag, diff, ctx);
      const tradeGood = fill(grpT.tradeGood || cfg.tradeGood, ctx);
      const tradeBad = fill(grpT.tradeBad || cfg.tradeBad, ctx);
      const wave = 'Best wave: ' + fill(grpT.waveBest || cfg.waveBest, ctx) + ' Worst wave: ' + fill(grpT.waveWorst || cfg.waveWorst, ctx) + ' Crash timing: the wave belongs to your carry — your job is the river vision and roam timers around its crashes.';
      const winCon = entry.win.replace(/\.$/, '') + '. Track ' + key.name + ' before every commit and keep the lane where your duo\u2019s pattern works.';
      const enemyWinTail = etag.grp === 'mage' ? 'winning the poke war and denying your duo\u2019s tempo.' : etag.grp === 'enchanter' ? 'out-sustaining your trades and denying your engage windows.' : 'landing the engage chain and snowballing your carry\u2019s lane.';
      const mistakes = donts.map(s => s.replace(/\.$/, '')).join('. ') + '. Don\u2019t spend your ultimate on chip damage \u2014 it is the fight-decider.';
      const ahead = fill(cfg.aheadTpl, ctx);
      const behind = fill(cfg.behindTpl, ctx);
      full[k] = {
        tldr: entry.tldr, winCon,
        enemyWin: isMirror ? 'The enemy ' + cfg.name + ' wins the same way you do — cleaner cooldown tracking and fewer wasted commitments.' : E + ' wins by landing ' + key.name + ', denying your pattern, and ' + enemyWinTail,
        diff, tone, diffRating: dr[0], carryRating: dr[1], phases,
        breakdown: {
          early: fill(grpT.early || cfg.early, ctx), mid: fill(grpT.mid || cfg.mid, ctx), wave,
          cooldowns: '- ' + E + ' ' + key.name + ': matchup-defining \u2014 ' + key.note + ' Track it before every step-up. - Your ' + cfg.safetyTool + ': never waste it on chip damage \u2014 it is your fight-saver. - Your ultimate: spend it on fight windows, not on waves.',
          trading: 'Good trade: ' + tradeGood + ' Bad trade: ' + tradeBad,
          spikes: fill(cfg.spikesLine, ctx),
          feeding: 'If ' + E + '\u2019s duo gets a kill, respect ' + key.name + ' and reset to vision work. Two kills: peel only \u2014 ' + fill(cfg.behindShort, ctx),
          carry: fill(cfg.carryLine, ctx),
          difficulty: (diff === 'HARD' ? 'Hard matchup' : diff === 'TRICKY' ? 'Tricky matchup' : diff === 'FAVOURED' ? 'Favoured matchup' : diff === 'MIRROR' ? 'Mirror matchup' : 'Even matchup') + ' \u2014 difficulty ' + dr[0] + ', ' + E + ' threat ' + dr[1] + '.',
          late: fill(grpT.late || cfg.late, ctx)
        },
        loading: '- ' + cfg.name + ' vs ' + E + ' - Track: ' + E + ' ' + key.name + '. - ' + fill(cfg.loadingRule, ctx) + ' - Engage only on ' + key.name + '\u2019s cooldown. - Spend your ultimate on fight windows only.',
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
        tradeGood, tradeBad, ahead,
        report: [
          { h: 'TL;DR', t: entry.tldr },
          { h: 'Core Lane Win Condition', t: winCon },
          { h: 'Level Advantage Chart', t: 'Skill-based; spikes decide it. See the level-by-level chart for the swing points.' },
          { h: 'Trading Rules', t: 'Good trade: ' + tradeGood + ' Great trade: ' + E + ' wastes ' + key.name + ' \u2014 commit immediately. Bad trade: ' + tradeBad },
          { h: 'Wave & Vision Management', t: wave },
          { h: 'Key Ability Interactions', t: 'Track ' + E + '\u2019s ' + key.name + ': ' + key.note + ' Commit only while it is down.' },
          { h: 'Rune Setup', t: cfg.runeReport },
          { h: 'Summoner Spells', t: cfg.summReport },
          { h: 'Itemization', t: fill(cfg.itemReport, ctx) + (etag.sustain ? ' Add anti-heal early into his duo\u2019s sustain.' : '') },
          { h: 'All-In Windows', t: 'Commit on ' + key.name + '\u2019s cooldown, on your ' + cfg.spikeName + ' spike, and with your carry\u2019s damage online. Bait his answer first.' },
          { h: 'Duo & Jungle Interaction', t: fill(cfg.jungleLine, ctx) },
          { h: 'Common Mistakes', t: mistakes },
          { h: 'How to Play From Behind', t: behind },
          { h: 'How to Snowball', t: ahead },
          { h: 'Final Matchup Rating', t: (diff === 'HARD' ? 'Hard matchup' : diff === 'TRICKY' ? 'Tricky matchup' : diff === 'FAVOURED' ? 'Favoured matchup' : diff === 'MIRROR' ? 'Mirror matchup' : 'Even matchup') + ' \u2014 difficulty ' + dr[0] + ', ' + E + ' threat ' + dr[1] + '.' }
        ]
      };
      const L = cfg.load;
      loadouts[k] = {
        diff, start: L.start,
        firstBack: etag.sustain ? L.antihealBack : L.normalBack,
        firstItem: L.firstItem, secondItem: L.secondItem,
        boots: etag.dmg === 'AP' ? L.bootsVsAP : (etag.dmg === 'AD' ? L.bootsVsAD : L.boots),
        spike: L.spike, runes: L.runes, wr: WR[diff],
        reddit: (function(s){ return 'Consensus on ' + L.sub + ': ' + s.charAt(0).toUpperCase() + s.slice(1); })(fill(grpT.redditLine || cfg.redditLine, ctx)) + (etag.sustain ? ' ' + L.antihealNote : '')
      };
    }
    return { data, full, loadouts };
  }
  return { TONE, RATING, ETAG, KEYS, NAME, fill, gen };
})();

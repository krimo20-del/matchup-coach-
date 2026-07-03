// MatchupCoach — generator engine for new playable champions (off-meta top picks).
// Loaded only by run_script generation passes, never by the app.
// Usage: GEN_ENGINE.gen(cfg, DATA) -> { data, full, loadouts }
window.GEN_ENGINE = (function () {
  const TONE = { FAVOURED: '#3ddc97', EVEN: '#e8b84b', TRICKY: '#ff8b3d', HARD: '#ff5d6c', MIRROR: '#e8b84b' };
  const RATING = { HARD: ['8/10', '8.5/10'], TRICKY: ['7/10', '7.5/10'], EVEN: ['5.5/10', '6/10'], FAVOURED: ['4/10', '5/10'], MIRROR: ['5/10', '7/10'] };
  const WR = { HARD: '≈46–47% — survive, scale, group', TRICKY: '≈48–49% — playable with discipline', EVEN: '≈50% — skill matchup', FAVOURED: '≈52–53% — your lane to lose', MIRROR: '50% — mirror, mechanics decide' };

  // Per-enemy tactical tags. grp: jugg|diver|tank|ranged. dmg: AD|AP|mixed.
  // gap: 0 none / 1 some / 2 high mobility. allIn: early|spike6|late|flat. sustain/proj/scale flags.
  const ETAG = {
    aatrox:      { grp:'jugg', melee:1, gap:1, dmg:'AD', allIn:'spike6', sustain:1, scale:1 },
    darius:      { grp:'jugg', melee:1, gap:1, dmg:'AD', allIn:'early',  sustain:1, scale:1 },
    drmundo:     { grp:'jugg', melee:1, gap:0, dmg:'AP', allIn:'late',   sustain:1, scale:2 },
    garen:       { grp:'jugg', melee:1, gap:1, dmg:'AD', allIn:'early',  sustain:1, scale:1 },
    illaoi:      { grp:'jugg', melee:1, gap:0, dmg:'AD', allIn:'spike6', sustain:1, scale:1 },
    mordekaiser: { grp:'jugg', melee:1, gap:0, dmg:'AP', allIn:'spike6', sustain:1, scale:1 },
    nasus:       { grp:'jugg', melee:1, gap:0, dmg:'AD', allIn:'late',   sustain:1, scale:2 },
    sett:        { grp:'jugg', melee:1, gap:0, dmg:'AD', allIn:'early',  sustain:0, scale:1 },
    trundle:     { grp:'jugg', melee:1, gap:0, dmg:'AD', allIn:'early',  sustain:1, scale:1 },
    urgot:       { grp:'jugg', melee:1, gap:1, dmg:'AD', allIn:'early',  sustain:0, scale:1 },
    volibear:    { grp:'jugg', melee:1, gap:1, dmg:'mixed', allIn:'early', sustain:1, scale:1 },
    yorick:      { grp:'jugg', melee:1, gap:0, dmg:'AD', allIn:'spike6', sustain:1, scale:1 },
    camille:     { grp:'diver', melee:1, gap:2, dmg:'AD', allIn:'spike6', sustain:0, scale:1 },
    fiora:       { grp:'diver', melee:1, gap:1, dmg:'AD', allIn:'flat',   sustain:1, scale:2 },
    gragas:      { grp:'diver', melee:1, gap:1, dmg:'AP', allIn:'flat',   sustain:1, scale:1 },
    gwen:        { grp:'diver', melee:1, gap:1, dmg:'AP', allIn:'spike6', sustain:1, scale:2 },
    irelia:      { grp:'diver', melee:1, gap:2, dmg:'mixed', allIn:'early', sustain:1, scale:1 },
    jax:         { grp:'diver', melee:1, gap:2, dmg:'mixed', allIn:'late',  sustain:0, scale:2 },
    kled:        { grp:'diver', melee:1, gap:2, dmg:'AD', allIn:'early',  sustain:0, scale:1 },
    olaf:        { grp:'diver', melee:1, gap:1, dmg:'AD', allIn:'early',  sustain:1, scale:0 },
    pantheon:    { grp:'diver', melee:1, gap:1, dmg:'AD', allIn:'early',  sustain:0, scale:0 },
    renekton:    { grp:'diver', melee:1, gap:2, dmg:'AD', allIn:'early',  sustain:1, scale:0 },
    riven:       { grp:'diver', melee:1, gap:2, dmg:'AD', allIn:'early',  sustain:0, scale:1 },
    tryndamere:  { grp:'diver', melee:1, gap:1, dmg:'AD', allIn:'late',   sustain:1, scale:2 },
    vayne:       { grp:'diver', melee:0, gap:1, dmg:'AD', allIn:'late',   sustain:0, scale:2 },
    warwick:     { grp:'diver', melee:1, gap:1, dmg:'mixed', allIn:'flat', sustain:1, scale:1 },
    wukong:      { grp:'diver', melee:1, gap:1, dmg:'AD', allIn:'early',  sustain:0, scale:1 },
    yasuo:       { grp:'diver', melee:1, gap:2, dmg:'AD', allIn:'flat',   sustain:0, scale:2, proj:1 },
    yone:        { grp:'diver', melee:1, gap:2, dmg:'mixed', allIn:'spike6', sustain:0, scale:2 },
    ambessa:     { grp:'diver', melee:1, gap:2, dmg:'AD', allIn:'early',  sustain:0, scale:1 },
    zaahen:      { grp:'diver', melee:1, gap:1, dmg:'AD', allIn:'spike6', sustain:0, scale:1 },
    chogath:     { grp:'tank', melee:1, gap:0, dmg:'AP', allIn:'late',  sustain:1, scale:2 },
    ksante:      { grp:'tank', melee:1, gap:1, dmg:'AD', allIn:'spike6', sustain:0, scale:1 },
    malphite:    { grp:'tank', melee:1, gap:0, dmg:'AP', allIn:'late',  sustain:0, scale:1 },
    maokai:      { grp:'tank', melee:1, gap:1, dmg:'AP', allIn:'flat',  sustain:1, scale:1 },
    nautilus:    { grp:'tank', melee:1, gap:1, dmg:'AP', allIn:'flat',  sustain:0, scale:1 },
    ornn:        { grp:'tank', melee:1, gap:1, dmg:'AP', allIn:'late',  sustain:0, scale:2 },
    poppy:       { grp:'tank', melee:1, gap:1, dmg:'AD', allIn:'flat',  sustain:0, scale:1, antidash:1 },
    shen:        { grp:'tank', melee:1, gap:1, dmg:'mixed', allIn:'flat', sustain:0, scale:1 },
    sion:        { grp:'tank', melee:1, gap:0, dmg:'AD', allIn:'late',  sustain:0, scale:2 },
    tahmkench:   { grp:'tank', melee:1, gap:0, dmg:'AP', allIn:'flat',  sustain:1, scale:1 },
    zac:         { grp:'tank', melee:1, gap:2, dmg:'AP', allIn:'late',  sustain:1, scale:1 },
    galio:       { grp:'tank', melee:1, gap:1, dmg:'AP', allIn:'flat',  sustain:0, scale:1 },
    sejuani:     { grp:'tank', melee:1, gap:1, dmg:'AP', allIn:'flat',  sustain:0, scale:1 },
    akali:       { grp:'ranged', melee:1, gap:2, dmg:'AP', allIn:'spike6', sustain:1, scale:1 },
    aurora:      { grp:'ranged', melee:0, gap:1, dmg:'AP', allIn:'flat',  sustain:0, scale:1 },
    gangplank:   { grp:'ranged', melee:1, gap:0, dmg:'AD', allIn:'late',  sustain:1, scale:2 },
    gnar:        { grp:'ranged', melee:0, gap:1, dmg:'AD', allIn:'flat',  sustain:0, scale:1 },
    heimerdinger:{ grp:'ranged', melee:0, gap:0, dmg:'AP', allIn:'flat',  sustain:0, scale:1 },
    jayce:       { grp:'ranged', melee:0, gap:1, dmg:'AD', allIn:'early', sustain:0, scale:0 },
    kayle:       { grp:'ranged', melee:0, gap:0, dmg:'mixed', allIn:'late', sustain:0, scale:2 },
    kennen:      { grp:'ranged', melee:0, gap:1, dmg:'AP', allIn:'flat',  sustain:0, scale:1 },
    quinn:       { grp:'ranged', melee:0, gap:1, dmg:'AD', allIn:'early', sustain:0, scale:0 },
    rumble:      { grp:'ranged', melee:1, gap:0, dmg:'AP', allIn:'spike6', sustain:0, scale:1 },
    singed:      { grp:'ranged', melee:1, gap:0, dmg:'AP', allIn:'flat',  sustain:1, scale:1 },
    swain:       { grp:'ranged', melee:0, gap:0, dmg:'AP', allIn:'spike6', sustain:1, scale:1 },
    teemo:       { grp:'ranged', melee:0, gap:0, dmg:'AP', allIn:'flat',  sustain:0, scale:1 },
    vladimir:    { grp:'ranged', melee:0, gap:0, dmg:'AP', allIn:'late',  sustain:1, scale:2 },
    ziggs:       { grp:'ranged', melee:0, gap:0, dmg:'AP', allIn:'flat',  sustain:0, scale:1 },
    karma:       { grp:'ranged', melee:0, gap:0, dmg:'AP', allIn:'flat',  sustain:0, scale:0 },
    kassadin:    { grp:'ranged', melee:1, gap:0, dmg:'AP', allIn:'late',  sustain:0, scale:2 },
    lucian:      { grp:'ranged', melee:0, gap:1, dmg:'AD', allIn:'early', sustain:0, scale:1 },
    lillia:      { grp:'ranged', melee:0, gap:1, dmg:'AP', allIn:'flat',  sustain:0, scale:1 },
    mel:         { grp:'ranged', melee:0, gap:0, dmg:'AP', allIn:'flat',  sustain:0, scale:1, proj:1 },
    neeko:       { grp:'ranged', melee:0, gap:0, dmg:'AP', allIn:'spike6', sustain:0, scale:1 },
    ryze:        { grp:'ranged', melee:0, gap:0, dmg:'AP', allIn:'late',  sustain:0, scale:2 },
    cassiopeia:  { grp:'ranged', melee:0, gap:0, dmg:'AP', allIn:'flat',  sustain:1, scale:2, ground:1 },
    akshan:      { grp:'ranged', melee:0, gap:2, dmg:'AD', allIn:'early', sustain:0, scale:1 },
    graves:      { grp:'ranged', melee:0, gap:1, dmg:'AD', allIn:'early', sustain:0, scale:1 },
    sylas:       { grp:'ranged', melee:1, gap:2, dmg:'AP', allIn:'spike6', sustain:1, scale:1 },
    masteryi:    { grp:'diver', melee:1, gap:1, dmg:'AD', allIn:'late', sustain:1, scale:2 },
    locke:       { grp:'diver', melee:1, gap:2, dmg:'AP', allIn:'spike6', sustain:1, scale:1 }
  };

  // Per-enemy key ability to track (champion-agnostic).
  const KEYS = {
    aatrox:      { slot:'R', name:'World Ender', cd:'100s', note:'His drain-tank mode — never take a long fight into it.', winT:'WORLD ENDER DOWN' },
    darius:      { slot:'E', name:'Apprehend (Pull)', cd:'24s', note:'The pull starts every Darius kill pattern — bait it before stepping up.', winT:'PULL IS DOWN' },
    drmundo:     { slot:'W', name:'Heart Zapper', cd:'11s', note:'His burst + sustain window — trade just after he wastes it.', winT:'HEART ZAPPER DOWN' },
    garen:       { slot:'W', name:'Courage', cd:'21s', note:'Damage reduction on cast — your burst only lands full once it is down.', winT:'COURAGE DOWN' },
    illaoi:      { slot:'E', name:'Test of Spirit', cd:'16s', note:'Dodging the spirit pull is the entire matchup.', winT:'SPIRIT DOWN' },
    mordekaiser: { slot:'R', name:'Realm of Death', cd:'110s', note:'The isolated 1v1 is his whole kill threat — track it always.', winT:'REALM DOWN' },
    nasus:       { slot:'W', name:'Wither', cd:'15s', note:'His only answer to kiting — bait it before you commit.', winT:'WITHER DOWN' },
    sett:        { slot:'E', name:'Facebreaker', cd:'16s', note:'The pull-stun starts his combo — stay off the line between him and units.', winT:'FACEBREAKER DOWN' },
    trundle:     { slot:'R', name:'Subjugate', cd:'80s', note:'Steals your resists and HP — never take a long duel into it.', winT:'SUBJUGATE DOWN' },
    urgot:       { slot:'E', name:'Disdain (Flip)', cd:'14s', note:'His flip engage — sidestep it and he has no way to start.', winT:'DISDAIN DOWN' },
    volibear:    { slot:'Q', name:'Thundering Smash (Stun)', cd:'7s', note:'The run-down stun — make distance the moment he starts glowing.', winT:'STUN DOWN' },
    yorick:      { slot:'W', name:'Dark Procession (Cage)', cd:'30s', note:'The cage traps you with the ghoul swarm — sidestep or break it instantly.', winT:'CAGE DOWN' },
    camille:     { slot:'E', name:'Hookshot', cd:'11s', note:'Her wall-dash stun — fight away from terrain while it is up.', winT:'HOOKSHOT DOWN' },
    fiora:       { slot:'W', name:'Riposte', cd:'24s', note:'Parries your damage and CC, then stuns — never lead with CC into it.', winT:'RIPOSTE DOWN' },
    gragas:      { slot:'E', name:'Body Slam', cd:'13s', note:'His engage and his escape in one button — punish the cooldown hard.', winT:'BODY SLAM DOWN' },
    gwen:        { slot:'W', name:'Hallowed Mist', cd:'16s', note:'Untargetable from outside the mist — never burn damage into it.', winT:'MIST DOWN' },
    irelia:      { slot:'E', name:'Flawless Duet (Stun)', cd:'18s', note:'Her stun setup — dodge it and the dive falls apart.', winT:'STUN DOWN' },
    jax:         { slot:'E', name:'Counter Strike', cd:'8s', note:'Dodges every auto and stuns — hold your damage until it ends.', winT:'COUNTER STRIKE DOWN' },
    kled:        { slot:'Q', name:'Beartrap on a Rope', cd:'9s', note:'The hook starts his all-in — dodge it and disengage his remount.', winT:'BEARTRAP DOWN' },
    olaf:        { slot:'Q', name:'Undertow (Axe)', cd:'5s', note:'Axe slows let him reach you — stand on the pickup spot to deny resets.', winT:'AXE DENIED' },
    pantheon:    { slot:'W', name:'Shield Vault (Stun)', cd:'14s', note:'Point-and-click stun — respect the all-in any time it is up.', winT:'VAULT DOWN' },
    renekton:    { slot:'W', name:'Ruthless Predator (Stun)', cd:'13s', note:'Fury-empowered stun — never trade into a full rage bar.', winT:'STUN DOWN' },
    riven:       { slot:'W', name:'Ki Burst (Stun)', cd:'11s', note:'The stun glues her combo together — bait it before fighting.', winT:'KI BURST DOWN' },
    tryndamere:  { slot:'R', name:'Undying Rage', cd:'110s', note:'Five seconds unkillable — save your kill damage for after it ends.', winT:'RAGE DOWN' },
    vayne:       { slot:'E', name:'Condemn', cd:'18s', note:'Wall-stun — never fight her with terrain at your back.', winT:'CONDEMN DOWN' },
    warwick:     { slot:'R', name:'Infinite Duress', cd:'90s', note:'Lock-on suppress — track it before every step-up.', winT:'DURESS DOWN' },
    wukong:      { slot:'E', name:'Nimbus Strike', cd:'8s', note:'His only gap-close — he cannot reach you while it is down.', winT:'NIMBUS DOWN' },
    yasuo:       { slot:'W', name:'Wind Wall', cd:'26s', note:'Blocks every projectile for its duration — hold your poke until it is spent.', winT:'WIND WALL DOWN' },
    yone:        { slot:'E', name:'Soul Unbound', cd:'22s', note:'His burst window — survive it and punish the body he snaps back to.', winT:'SOUL UNBOUND DOWN' },
    ambessa:     { slot:'E', name:'Dash Chain', cd:'12s', note:'Her passive dash weaving — fight when the chain is spent.', winT:'DASHES DOWN' },
    zaahen:      { slot:'R', name:'Ultimate', cd:'100s', note:'His big cooldown — punish the gap while it is down.', winT:'ULT DOWN' },
    chogath:     { slot:'Q', name:'Rupture (Knockup)', cd:'6s', note:'Telegraphed knockup — sidestep it and he has no engage at all.', winT:'RUPTURE DOWN' },
    ksante:      { slot:'R', name:'All Out', cd:'90s', note:'His duelist mode — fight the tank, never the duelist.', winT:'ALL OUT DOWN' },
    malphite:    { slot:'R', name:'Unstoppable Force', cd:'130s', note:'Unstoppable engage — usually banked for teamfights, punish lane passivity.', winT:'ULT DOWN' },
    maokai:      { slot:'W', name:'Twisted Advance (Root)', cd:'11s', note:'Point-and-click root — count its cooldown before stepping up.', winT:'ROOT DOWN' },
    nautilus:    { slot:'Q', name:'Dredge Line (Hook)', cd:'15s', note:'His only real engage — dodge it and the lane is free.', winT:'HOOK DOWN' },
    ornn:        { slot:'Q', name:'Volcanic Rupture', cd:'9s', note:'Pillar + knockup setup — stay off walls and sidestep the line.', winT:'RUPTURE DOWN' },
    poppy:       { slot:'W', name:'Steadfast Presence', cd:'12s', note:'Stops every dash near her — mobility dies inside the zone.', winT:'W IS DOWN' },
    shen:        { slot:'E', name:'Shadow Dash (Taunt)', cd:'18s', note:'His taunt engage — punish hard while it is on cooldown.', winT:'TAUNT DOWN' },
    sion:        { slot:'Q', name:'Decimating Smash (Stun)', cd:'8s', note:'Charged knockup — break the channel or sidestep the slam.', winT:'Q IS DOWN' },
    tahmkench:   { slot:'W', name:'Abyssal Dive', cd:'12s', note:'His escape and re-engage — all-in only while it is down.', winT:'DIVE DOWN' },
    zac:         { slot:'E', name:'Elastic Slingshot', cd:'16s', note:'Long-range engage — interrupt the charge or punish the cooldown.', winT:'SLINGSHOT DOWN' },
    galio:       { slot:'E', name:'Justice Punch', cd:'13s', note:'His dash knockup — he has no engage while it is down.', winT:'PUNCH DOWN' },
    sejuani:     { slot:'Q', name:'Arctic Assault', cd:'13s', note:'Her dash knockup — she has no kill threat while it is down.', winT:'DASH DOWN' },
    akali:       { slot:'W', name:'Twilight Shroud', cd:'18s', note:'Untargetable inside — hold your CC and burst for when she exits.', winT:'SHROUD DOWN' },
    aurora:      { slot:'W', name:'Across the Veil (Hop)', cd:'14s', note:'Her hop + stealth escape — she is killable only while it is down.', winT:'HOP DOWN' },
    gangplank:   { slot:'E', name:'Powder Kegs (Barrels)', cd:'—', note:'Barrel chains chunk half your HP — kill kegs on sight.', winT:'KEGS CLEARED' },
    gnar:        { slot:'R', name:'GNAR! (Mega)', cd:'—', note:'Mega all-in near walls — track his rage bar like a cooldown.', winT:'MINI / LOW RAGE' },
    heimerdinger:{ slot:'E', name:'CH-2 Grenade (Stun)', cd:'11s', note:'The stun makes his turret nest lethal — dodge it before diving.', winT:'GRENADE DOWN' },
    jayce:       { slot:'Q', name:'Shock Blast', cd:'6s', note:'Gate-accelerated poke — stand behind minions and close after it whiffs.', winT:'SHOCK BLAST DOWN' },
    kayle:       { slot:'R', name:'Divine Judgment (Invuln)', cd:'100s', note:'Invulnerability denies your execute — bait it, then kill.', winT:'JUDGMENT DOWN' },
    kennen:      { slot:'E', name:'Lightning Rush', cd:'10s', note:'His engage and escape — the stun chain starts here.', winT:'RUSH DOWN' },
    quinn:       { slot:'E', name:'Vault (Dash/Blind)', cd:'11s', note:'Blind + disengage in one button — fight while it is down.', winT:'VAULT DOWN' },
    rumble:      { slot:'W', name:'Scrap Shield', cd:'6s', note:'Shield + speed on demand — trade just after he burns it.', winT:'SHIELD DOWN' },
    singed:      { slot:'E', name:'Fling', cd:'14s', note:'The flip into his goo — never chase into range while it is up.', winT:'FLING DOWN' },
    swain:       { slot:'R', name:'Demonic Ascension', cd:'—', note:'His drain mode — disengage and reset the fight when it starts.', winT:'ASCENSION DOWN' },
    teemo:       { slot:'Q', name:'Blinding Dart', cd:'7s', note:'Blinds your autos — trade with spells while it is up.', winT:'BLIND DOWN' },
    vladimir:    { slot:'W', name:'Sanguine Pool', cd:'22s', note:'Untargetable dodge — bait it before you spend your kill window.', winT:'POOL DOWN' },
    ziggs:       { slot:'W', name:'Satchel Charge', cd:'20s', note:'His knockback escape — he is catchable only while it is down.', winT:'SATCHEL DOWN' },
    karma:       { slot:'W', name:'Focused Resolve (Tether)', cd:'12s', note:'The root tether — break it with range or line of sight.', winT:'TETHER DOWN' },
    kassadin:    { slot:'R', name:'Riftwalk', cd:'6s', note:'His mobility spike — the lane is decided before it scales.', winT:'PRE-6 WINDOW' },
    lucian:      { slot:'E', name:'Relentless Pursuit', cd:'14s', note:'His dash — lock him down while it is on cooldown.', winT:'DASH DOWN' },
    lillia:      { slot:'Q', name:'Blooming Blows', cd:'6s', note:'Her kiting speed stacks — catch her early in the chase or not at all.', winT:'SPEED DOWN' },
    mel:         { slot:'W', name:'Rebuttal', cd:'20s', note:'Reflects your projectiles back — never poke while it glows.', winT:'REBUTTAL DOWN' },
    neeko:       { slot:'E', name:'Tangle-Barbs (Root)', cd:'10s', note:'The root sets up her whole burst — sidestep it behind minions.', winT:'ROOT DOWN' },
    ryze:        { slot:'W', name:'Rune Prison (Root)', cd:'13s', note:'Point-blank root — respect the EQ chain that follows it.', winT:'ROOT DOWN' },
    cassiopeia:  { slot:'W', name:'Miasma', cd:'12s', note:'Grounds you — dashes and leaps are disabled inside it.', winT:'MIASMA DOWN' },
    akshan:      { slot:'E', name:'Heroic Swing', cd:'14s', note:'His swing engage/escape — fight only while it is down.', winT:'SWING DOWN' },
    graves:      { slot:'E', name:'Quickdraw', cd:'13s', note:'Dash + armor stacks — burst him after the charges are spent.', winT:'QUICKDRAW DOWN' },
    sylas:       { slot:'E', name:'Abscond / Abduct', cd:'14s', note:'Dash into chain-stun — punish him hard while it is down.', winT:'CHAIN DOWN' },
    masteryi:    { slot:'Q', name:'Alpha Strike', cd:'14s', note:'Untargetable blink that dodges your key spell — bait it before committing your burst.', winT:'ALPHA DOWN' },
    locke:       { slot:'Q', name:'Ritual Nails (Marks)', cd:'10s', note:'The nail marks are his whole engine — without 2-3 stacks on you his blink-in barely dents; sidestep the recasts and punish the ten seconds of nothing.', winT:'NAILS DOWN' }
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
    // negative = bad stage for ME
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

  function gen(cfg, DATA) {
    const data = {}, full = {}, loadouts = {};
    const enemies = Object.keys(ETAG);
    for (const k of enemies) {
      const etag = ETAG[k];
      const key = KEYS[k];
      const E = DATA.NAME[k] || (k.charAt(0).toUpperCase() + k.slice(1));
      const isMirror = k === cfg.key;
      const diff = isMirror ? 'MIRROR' : (cfg.diffEx[k] || cfg.diffBase[etag.grp] || 'EVEN');
      const tone = TONE[diff];
      const ctx = { E, K: key.name, KS: key.slot, ME: cfg.name };
      const grpT = isMirror ? cfg.mirror : (cfg.specials && cfg.specials[k]) ? Object.assign({}, cfg.vs[etag.grp], cfg.specials[k]) : cfg.vs[etag.grp];

      // ===== CHAMP_DATA short card =====
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

      // ===== CHAMP_FULL =====
      const dr = RATING[diff];
      const phases = phasesFor(cfg, k, etag, diff, ctx);
      const tradeGood = fill(grpT.tradeGood || cfg.tradeGood, ctx);
      const tradeBad = fill(grpT.tradeBad || cfg.tradeBad, ctx);
      const wave = 'Best wave: ' + fill(grpT.waveBest || cfg.waveBest, ctx) +
        ' Worst wave: ' + fill(grpT.waveWorst || cfg.waveWorst, ctx) +
        ' Crash timing: only crash to reset, take plates, or set up a roam — never shove on autopilot.';
      const winCon = entry.win.replace(/\.$/, '') + '. Track ' + key.name + ' before every commit and keep the wave where your pattern works.';
      const enemyWinTail = etag.grp === 'jugg' || etag.grp === 'diver' || etag.melee
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
          { h: 'Jungle Interaction', t: fill(cfg.jungleLine, ctx) },
          { h: 'Common Mistakes', t: mistakes },
          { h: 'How to Play From Behind', t: behind },
          { h: 'How to Snowball', t: ahead },
          { h: 'Final Matchup Rating', t: (diff === 'HARD' ? 'Hard matchup' : diff === 'TRICKY' ? 'Tricky matchup' : diff === 'FAVOURED' ? 'Favoured matchup' : diff === 'MIRROR' ? 'Mirror matchup' : 'Even matchup') + ' \u2014 difficulty ' + dr[0] + ', ' + E + ' carry threat ' + dr[1] + '.' }
        ]
      };
      full[k] = fullE;

      // ===== CHAMP_LOADOUTS =====
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

  return { TONE, RATING, ETAG, KEYS, fill, gen };
})();

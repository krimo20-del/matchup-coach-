// Mid/Bot/Sup lane consistency fixes (June 2026 full-lane review).
// 1) DIFF: resolves the 69 soft reverse-pair asymmetries (midpoint rule, same as the top-lane
//    _xlane-soft-fixes.js) + hand-set caitlyn/nilah (the one hard contradiction: she owns the
//    lane, Nilah owns the items -> TRICKY/TRICKY with researched tldrs).
// 2) PHASES: resolves the 100 per-level lead contradictions (56 mid / 28 bot / 16 sup),
//    hand-adjudicated per matchup (artillery mages own Diana/Ekko/Akali levels 1-2; assassins
//    own level 6 vs control mages unless point-click R says otherwise; hypercarries own 2+
//    items; Karma's poke denies Alistar/Leona/Rell engage all lane; etc). The page whose
//    original claim matches the verdict keeps its hand-written why; the other side is rewritten
//    from champ signature phrases. Same idempotent retry-loop pattern. No other file touches
//    the _mid/_bot/_sup keys, so no races.
(function () {
  var T = { FAVOURED: '#3ddc97', HARD: '#ff5d6c', EVEN: '#e8b84b', TRICKY: '#ff8b3d' };
  var DIFF = {
    'akali_mid': { aurelionsol: 'FAVOURED' },
    'akshan_mid': { swain: 'TRICKY', brand: 'FAVOURED', lux: 'FAVOURED', twistedfate: 'FAVOURED', zoe: 'FAVOURED' },
    'alistar_sup': { janna: 'TRICKY', lulu: 'TRICKY', milio: 'TRICKY', poppy: 'TRICKY' },
    'ashe_bot': { draven: 'TRICKY' },
    'aurelionsol_mid': { akali: 'TRICKY', diana: 'TRICKY', ekko: 'TRICKY', naafiri: 'TRICKY', qiyana: 'TRICKY', sylas: 'TRICKY' },
    'brand_mid': { akshan: 'TRICKY', diana: 'TRICKY', ekko: 'TRICKY' },
    'diana_mid': { aurelionsol: 'FAVOURED', brand: 'FAVOURED', hwei: 'EVEN', swain: 'TRICKY', syndra: 'TRICKY', xerath: 'EVEN', ziggs: 'EVEN', lux: 'EVEN', twistedfate: 'FAVOURED', zoe: 'EVEN' },
    'draven_bot': { ashe: 'FAVOURED', senna: 'FAVOURED' },
    'ekko_mid': { aurelionsol: 'FAVOURED', brand: 'FAVOURED', hwei: 'FAVOURED', xerath: 'EVEN', ziggs: 'FAVOURED', lux: 'FAVOURED', zoe: 'FAVOURED' },
    'fizz_mid': { neeko: 'FAVOURED' },
    'hwei_mid': { diana: 'TRICKY', ekko: 'TRICKY' },
    'irelia_mid': { vex: 'TRICKY' },
    'lux_mid': { akshan: 'TRICKY', diana: 'TRICKY', ekko: 'TRICKY', mel: 'TRICKY' },
    'mel_mid': { yasuo: 'TRICKY' },
    'morgana_sup': { galio: 'TRICKY' },
    'naafiri_mid': { aurelionsol: 'FAVOURED' },
    'neeko_mid': { fizz: 'TRICKY' },
    'neeko_sup': { galio: 'TRICKY' },
    'qiyana_mid': { aurelionsol: 'FAVOURED' },
    'renata_sup': { rell: 'TRICKY' },
    'senna_bot': { draven: 'TRICKY' },
    'senna_sup': { rakan: 'TRICKY' },
    'seraphine_sup': { galio: 'TRICKY', leona: 'TRICKY', nautilus: 'TRICKY', rakan: 'TRICKY', rell: 'TRICKY', thresh: 'TRICKY' },
    'sona_sup': { neeko: 'TRICKY', swain: 'TRICKY' },
    'soraka_sup': { neeko: 'TRICKY' },
    'swain_mid': { brand: 'TRICKY' },
    'sylas_mid': { aurelionsol: 'FAVOURED' },
    'syndra_mid': { diana: 'EVEN', vex: 'FAVOURED' },
    'twistedfate_mid': { akshan: 'TRICKY', diana: 'TRICKY' },
    'vex_mid': { irelia: 'FAVOURED', syndra: 'TRICKY', xerath: 'TRICKY', yone: 'FAVOURED' },
    'xerath_mid': { diana: 'TRICKY', ekko: 'TRICKY', vex: 'FAVOURED' },
    'yasuo_mid': { mel: 'FAVOURED' },
    'yone_mid': { vex: 'TRICKY' },
    'yuumi_sup': { alistar: 'TRICKY', bard: 'TRICKY', blitzcrank: 'TRICKY', galio: 'TRICKY', karma: 'TRICKY', leona: 'TRICKY', maokai: 'TRICKY', nautilus: 'TRICKY', neeko: 'TRICKY', pyke: 'TRICKY', rakan: 'TRICKY', rell: 'TRICKY', tahmkench: 'TRICKY', taric: 'TRICKY', thresh: 'TRICKY' },
    'ziggs_mid': { diana: 'TRICKY', ekko: 'TRICKY' },
    'zoe_mid': { akshan: 'TRICKY', diana: 'TRICKY', ekko: 'TRICKY' },
    'caitlyn_bot': { nilah: 'TRICKY' },
    'nilah_bot': { caitlyn: 'TRICKY' }
  };
  var TLDR = {
    'caitlyn_bot': { nilah: "You own the first ten minutes at 650 range — but every completed item tilts the duel toward her sustain dives. Cash the lane lead into plates and tempo, or the early win was just rent." },
    'nilah_bot': { caitlyn: "Survive the 650-range siege with W and passive sustain — every item shifts the math your way, and by two items you stat-check the sheriff on sight. Don't donate the early lead that pays for it." }
  };
  var SIG = {
    ahri: "charm-orb pick threat", malzahar: "voidling-silence suppression", fizz: "trickster-dodge burst",
    akali: "shroud-energy burst windows", anivia: "wall-frost poke control", syndra: "sphere-stun burst lines",
    viktor: "laser zone control", neeko: "clone-root deception", diana: "orb-dash crash combos",
    annie: "point-click stun burst", aurelionsol: "stardust ramp control", ryze: "root-rotation sieging",
    twistedfate: "gold-card tempo picks", kassadin: "void-shield scaling", naafiri: "packmate dive bursts",
    brand: "ablaze combo chains", swain: "root-drain sustain", hwei: "paintbrush poke barrages",
    orianna: "ball-control auto harass", xerath: "long-range mana poke", ziggs: "minefield satchel poke",
    lux: "snare-shield poke combos", zoe: "bubble-sleep pick bursts", ekko: "rewind dive resets",
    lissandra: "short-range root bursts", veigar: "cage-stack inevitability", sylas: "chain-heal ult theft",
    zed: "shadow-shuriken executes", caitlyn: "650-range trap sieging", nilah: "whirling-blade sustain dives",
    corki: "package poke rotations", draven: "spinning-axe snowballing", senna: "soul-scaling root poke",
    ezreal: "arcane-shift poke safety", kaisa: "plasma-stack burst evolutions", zeri: "wall-zap kite spirals",
    karthus: "isolated-Q wave mowing", kalista: "hop-spear rend executions", kogmaw: "%-HP shred barrages",
    lucian: "double-tap burst trades", missfortune: "strut-poke bullet rains", samira: "chain-combo style cashes",
    smolder: "dragon-stack ramping", alistar: "headbutt-pulverize lockdown", karma: "mantra poke-and-speed denial",
    leona: "zenith-blade chain stuns", rell: "crash-down magnet engages", rakan: "feather-dash playmaking",
    sona: "aura-stack crescendo poke", taric: "bastion stun-heal brawls"
  };
  var NAME = { aurelionsol: "Aurelion Sol", twistedfate: "Twisted Fate", kaisa: "Kai'Sa", kogmaw: "Kog'Maw", missfortune: "Miss Fortune", leblanc: "LeBlanc", velkoz: "Vel'Koz", tahmkench: "Tahm Kench" };
  function disp(s) { return NAME[s] || s.charAt(0).toUpperCase() + s.slice(1); }
  var TAG = ["at level 1","at level 2","at level 3","through levels 4-5","at the level-6 breakpoint","on first item","at two-plus items"];
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function claim(side, o, f) {
    var s = (side || '').toLowerCase();
    if (s.indexOf(disp(f).toLowerCase()) >= 0) return f;
    if (s.indexOf('skill') >= 0 || s.indexOf('even') >= 0 || s.indexOf('depend') >= 0) return null;
    if (s.indexOf(disp(o).toLowerCase()) >= 0) return o;
    return f;
  }
  function whyText(kind, o, f, i, v) {
    var so = SIG[o] || 'core pattern', sf = SIG[f] || 'core pattern', t = TAG[i];
    if (kind === 'win') return v === 0
      ? "Your " + so + " out-muscle " + (disp(f)) + "'s " + sf + " " + t + " — this window is yours, so force the trades and tax every step toward the wave."
      : cap(t) + " your " + so + " beat the " + sf + " in a straight exchange. Play the front foot — make " + disp(f) + " answer you, not the other way around.";
    if (kind === 'lose') return v === 0
      ? disp(f) + "'s " + sf + " own this window — your " + so + " don't answer them " + t + " yet. Farm what's safe and let the next spike re-price the lane."
      : "Respect window: " + t + " the " + sf + " beat your " + so + " cleanly. Trade only off " + disp(f) + "'s cooldowns and keep the wave where the lead can't cash out.";
    return v === 0
      ? "Dead even " + t + " — " + so + " against " + sf + " is a cooldown ledger, not a stat check. Whoever spends smarter wins the window."
      : "Neither side owns this window: the " + sf + " and your " + so + " cancel out " + t + ". The HP bars walking into it decide who presses first.";
  }
  var PH = [
    ['ahri_mid','malzahar',0,'a'],['ahri_mid','malzahar',4,'b'],
    ['ahri_mid','fizz',0,'a'],['ahri_mid','fizz',4,'b'],
    ['akali_mid','anivia',0,'b'],['akali_mid','anivia',1,'b'],['akali_mid','anivia',4,'a'],
    ['akali_mid','malzahar',0,'b'],['akali_mid','malzahar',1,'b'],['akali_mid','malzahar',4,'a'],
    ['akali_mid','syndra',4,'a'],
    ['akali_mid','viktor',0,'b'],['akali_mid','viktor',1,'b'],
    ['akali_mid','neeko',4,'a'],
    ['akali_mid','diana',0,'b'],['akali_mid','diana',1,'b'],['akali_mid','diana',4,'x'],
    ['anivia_mid','diana',0,'a'],['anivia_mid','diana',1,'a'],['anivia_mid','diana',4,'b'],
    ['annie_mid','malzahar',4,'a'],
    ['aurelionsol_mid','ryze',5,'b'],['aurelionsol_mid','ryze',6,'b'],
    ['aurelionsol_mid','twistedfate',3,'b'],
    ['aurelionsol_mid','kassadin',0,'b'],['aurelionsol_mid','kassadin',1,'b'],['aurelionsol_mid','kassadin',3,'b'],['aurelionsol_mid','kassadin',5,'b'],['aurelionsol_mid','kassadin',6,'b'],
    ['aurelionsol_mid','naafiri',5,'b'],
    ['brand_mid','swain',4,'b'],
    ['diana_mid','hwei',0,'b'],['diana_mid','hwei',1,'b'],
    ['diana_mid','orianna',0,'b'],
    ['diana_mid','syndra',4,'b'],
    ['diana_mid','viktor',0,'b'],['diana_mid','viktor',1,'b'],
    ['diana_mid','xerath',0,'b'],['diana_mid','xerath',1,'b'],
    ['diana_mid','ziggs',0,'b'],['diana_mid','ziggs',1,'b'],
    ['diana_mid','lux',0,'b'],['diana_mid','lux',1,'b'],
    ['diana_mid','neeko',4,'a'],
    ['diana_mid','zoe',0,'b'],['diana_mid','zoe',1,'b'],
    ['ekko_mid','syndra',4,'b'],
    ['ekko_mid','viktor',0,'b'],['ekko_mid','viktor',1,'b'],
    ['ekko_mid','xerath',0,'b'],['ekko_mid','xerath',1,'b'],
    ['ekko_mid','neeko',4,'a'],
    ['lissandra_mid','swain',0,'a'],['lissandra_mid','swain',4,'a'],
    ['ryze_mid','veigar',2,'a'],
    ['sylas_mid','zed',4,'a'],
    ['caitlyn_bot','nilah',0,'a'],['caitlyn_bot','nilah',1,'a'],['caitlyn_bot','nilah',2,'a'],['caitlyn_bot','nilah',3,'a'],['caitlyn_bot','nilah',4,'x'],['caitlyn_bot','nilah',5,'b'],['caitlyn_bot','nilah',6,'b'],
    ['caitlyn_bot','ziggs',6,'a'],
    ['corki_bot','nilah',0,'a'],['corki_bot','nilah',1,'a'],
    ['draven_bot','senna',6,'b'],
    ['ezreal_bot','swain',0,'b'],
    ['kaisa_bot','zeri',2,'a'],['kaisa_bot','zeri',6,'x'],
    ['kaisa_bot','karthus',2,'a'],['kaisa_bot','karthus',6,'b'],
    ['kaisa_bot','veigar',2,'a'],
    ['kalista_bot','ziggs',6,'b'],
    ['karthus_bot','zeri',2,'a'],['karthus_bot','zeri',6,'b'],
    ['karthus_bot','veigar',2,'a'],
    ['kogmaw_bot','zeri',5,'b'],['kogmaw_bot','zeri',6,'a'],
    ['lucian_bot','ziggs',6,'b'],
    ['missfortune_bot','ziggs',6,'b'],
    ['samira_bot','ziggs',6,'a'],
    ['smolder_bot','veigar',5,'b'],
    ['veigar_bot','zeri',6,'a'],
    ['alistar_sup','karma',0,'b'],['alistar_sup','karma',1,'b'],['alistar_sup','karma',2,'b'],['alistar_sup','karma',3,'b'],
    ['karma_sup','leona',0,'a'],['karma_sup','leona',1,'a'],['karma_sup','leona',2,'a'],['karma_sup','leona',3,'a'],
    ['karma_sup','rell',0,'a'],['karma_sup','rell',1,'a'],['karma_sup','rell',2,'a'],['karma_sup','rell',3,'a'],
    ['rakan_sup','senna',6,'b'],
    ['sona_sup','taric',2,'b'],['sona_sup','taric',5,'a'],['sona_sup','taric',6,'a']
  ];
  function fixPhases(F) {
    PH.forEach(function (row) {
      var ka = row[0], b = row[1], i = row[2], w = row[3];
      var lane = ka.slice(ka.lastIndexOf('_'));
      var a = ka.slice(0, ka.lastIndexOf('_'));
      var kb = b + lane;
      var A = F[ka] && F[ka][b], B = F[kb] && F[kb][a];
      if (!A || !B || !A.phases || !B.phases || !A.phases[i] || !B.phases[i]) return;
      var winner = w === 'a' ? a : w === 'b' ? b : null;
      var ca = claim(A.phases[i].side, a, b), cb = claim(B.phases[i].side, b, a);
      function set(page, owner, foe) {
        var st = page.phases[i];
        var kind = winner === null ? 'skill' : (winner === owner ? 'win' : 'lose');
        st.side = winner === null ? 'Skill' : disp(winner);
        st.rating = winner === null ? '5/10' : '7/10';
        st.why = whyText(kind, owner, foe, i, hash(owner + '|' + foe + '|' + i) % 2);
      }
      if (winner === null) { set(A, a, b); set(B, b, a); }
      else {
        if (ca !== winner) set(A, a, b);
        if (cb !== winner) set(B, b, a);
      }
    });
  }
  function fixDiffs(db) {
    if (!db) return;
    Object.keys(DIFF).forEach(function (k) {
      var entry = db[k];
      if (!entry) return;
      Object.keys(DIFF[k]).forEach(function (foe) {
        var m = entry[foe];
        if (!m) return;
        m.diff = DIFF[k][foe];
        m.tone = T[DIFF[k][foe]];
        if (TLDR[k] && TLDR[k][foe]) m.tldr = TLDR[k][foe];
      });
    });
  }
  function applyAll() {
    fixDiffs(window.CHAMP_DATA);
    fixDiffs(window.CHAMP_FULL);
    if (window.CHAMP_FULL) fixPhases(window.CHAMP_FULL);
  }
  applyAll();
  if (typeof setTimeout === 'function') {
    var tries = 0;
    var iv = setInterval(function () { applyAll(); if (++tries >= 24) clearInterval(iv); }, 250);
    setTimeout(applyAll, 0);
  }
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('DOMContentLoaded', applyAll);
  }
})();

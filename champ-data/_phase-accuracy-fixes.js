// Phase & fairness ACCURACY layer (June 2026) — runs after all consistency layers.
// The consistency passes made mirrors agree but left thousands of generated "Skill 5/10"
// cells flat where one side owns the window (e.g. Draven vs Tristana, Karma vs Brand).
// This file evaluates EVERY pair-stage in all four lanes against per-champ 7-stage power
// curves (+ a stage-weighted bias from the pair's live diff — full weight in lane stages,
// none at 2+ items so hyperscalers keep their late windows):
//   - both pages neutral & |delta| >= 0.35 -> assign the lead (6/10 edge <1.1, 7/10 clear <2.2, 8/10 stomp)
//   - one page named & matches winner       -> upgrade the neutral page to match
//   - named but model strongly opposite (>=2.25) -> flip both pages
//   - everything else (hand-written, modest deltas) is left alone
// DIFF upgrade: EVEN/EVEN pairs whose lane-stage average delta >= 1.4 AND whose winner is not
// hard-outscaled at 2+ items become FAVOURED/TRICKY (e.g. draven/tristana). tldrs untouched.
// Writes BOTH pages of every touched cell -> stays mirror-consistent with all other layers.
(function () {
  var CV = {
    top: {
      aatrox: [6,6.5,7,7,7,7,6], akali: [4.5,5,5.5,5.5,7,7,7], akshan: [6,6,6,6,6,6.5,6],
      ambessa: [6,6.5,7,7,7,7,6.5], aurora: [6,6,6.5,6.5,7,7,7], camille: [5,5.5,5.5,6,6.5,7,7.5],
      cassiopeia: [5.5,6,6.5,7,7,7,7], chogath: [4,4,4.5,5,6,6,7], darius: [7.5,7.5,7.5,7,7,7,6],
      drmundo: [3.5,3.5,4,4.5,5.5,6,7], fiora: [5.5,5.5,6,6,6.5,7.5,8], galio: [5,5,5.5,5.5,6,6,6],
      gangplank: [4.5,4.5,5,5,5.5,6.5,8], garen: [6,6.5,6.5,6.5,6.5,6.5,6], gnar: [6.5,6.5,6.5,6,6,6,6],
      gragas: [5,5,5.5,5.5,6,6,6], graves: [6.5,6.5,6.5,6,6,6.5,6], gwen: [4.5,5,5.5,5.5,6.5,7,7.5],
      heimerdinger: [7,7,7,6.5,6,5.5,5], illaoi: [6,6.5,7,7,7.5,7,6], irelia: [5.5,6.5,7,7,7,7,6.5],
      jax: [4.5,5,5.5,6,6.5,7.5,8], jayce: [7,7,7,7,6.5,6.5,5.5], kassadin: [3,3,3.5,4,5.5,6,8],
      kayle: [2.5,3,3.5,4,5.5,6.5,8.5], kennen: [6.5,6.5,6.5,6,6.5,6.5,6], kled: [6.5,7,7,7,7,7,6],
      ksante: [5,5,5.5,5.5,6,6.5,7], lillia: [4.5,5,5.5,6,6.5,7,7], lucian: [7,7,7,6.5,6,6,5],
      malphite: [4,4,4.5,5,5.5,6.5,7], maokai: [5,5,5.5,5.5,6,6,6.5], mordekaiser: [5.5,6,6.5,6.5,7.5,7,6.5],
      nasus: [3,3,3.5,4.5,5.5,6.5,8], nautilus: [4.5,5,5.5,5.5,6,6,6], neeko: [6,6,6.5,6,6.5,6.5,6],
      olaf: [8,8,7.5,7,7,7,5.5], ornn: [4.5,4.5,5,5.5,6,6.5,7.5], pantheon: [7.5,7.5,7.5,7,6.5,6.5,5],
      poppy: [5.5,5.5,5.5,5.5,5.5,6,6], quinn: [7,7,7,6.5,6,6,5.5], renekton: [7.5,7.5,7.5,7,6.5,6.5,5.5],
      riven: [6.5,7,7.5,7.5,7.5,7.5,6.5], rumble: [5.5,6,6.5,6.5,7,6.5,6], ryze: [4.5,5,5,5.5,6,6.5,7.5],
      sett: [7,7,7,7,7,6.5,6], shen: [5,5.5,5.5,5.5,6,6,6], singed: [4,4,4.5,5,6,6.5,7],
      sion: [4.5,4.5,5,5,5.5,6,7], swain: [5.5,6,6,6,6.5,6.5,6.5], sylas: [5,5.5,6,6,6.5,6.5,7],
      tahmkench: [5.5,5.5,6,6,6,6,6], teemo: [7,7,7,6.5,6.5,6,5.5], trundle: [7,7,7,7,7,6.5,5.5],
      tryndamere: [6,6.5,6.5,6.5,7,7.5,7.5], urgot: [6.5,6.5,7,7,7,7,6], vayne: [6,6,6,6,6,6.5,7.5],
      vladimir: [4,4.5,5,5.5,6.5,6.5,8], volibear: [6.5,6.5,7,6.5,7,6.5,6], warwick: [6.5,6.5,6.5,6.5,6.5,6,5.5],
      wukong: [6,6.5,6.5,6.5,6.5,6.5,6], yasuo: [5.5,6,6,6,6.5,7.5,7], yone: [5.5,6,6,6,6.5,7.5,7.5],
      yorick: [5.5,6,6.5,6.5,7,7,6.5], zac: [4,4,4.5,5,5.5,6,6.5], ziggs: [6.5,6.5,6.5,6.5,6,6,6]
    },
    mid: {
      ahri: [6,6,6.5,6.5,7,7,6.5], akali: [4.5,5,5.5,5.5,7,7,7], akshan: [6.5,6.5,6.5,6.5,6.5,6.5,6],
      anivia: [5.5,5.5,5.5,5.5,6.5,6.5,7.5], annie: [6,6,6.5,6.5,7,6.5,6], aurelionsol: [4,4,4.5,5,5.5,6,7.5],
      aurora: [6,6,6.5,6.5,7,7,7], azir: [5,5,5.5,5.5,6,6.5,7.5], brand: [6.5,6.5,6.5,6.5,6.5,6.5,6],
      cassiopeia: [5.5,6,6.5,7,7,7,7], diana: [5,5.5,5.5,6,7,7,7], ekko: [5,5,5.5,6,6.5,7,7],
      fizz: [4.5,5,5.5,6,7.5,7.5,6.5], galio: [5.5,5.5,6,6,6.5,6,6], hwei: [6.5,6.5,6.5,6.5,6.5,6.5,6.5],
      irelia: [5.5,6.5,7,7,7,7,6.5], karma: [7,7,7,6.5,6,6,5.5], kassadin: [3,3,3.5,4,5.5,6,8],
      katarina: [5,5.5,6,6,7,7,6.5], leblanc: [6.5,7,7.5,7.5,7.5,7,5.5], lissandra: [6,6,6.5,6.5,7,6.5,6],
      lux: [6.5,6.5,6.5,6.5,6.5,6.5,6], malzahar: [5.5,5.5,6,6,6.5,6.5,6.5], mel: [6,6,6,6,6,6.5,6.5],
      naafiri: [6,6.5,7,7,7,7,5.5], neeko: [6,6,6.5,6,6.5,6.5,6], orianna: [6.5,6.5,6.5,6,6.5,6.5,7],
      pantheon: [7.5,7.5,7.5,7,6.5,6.5,5], qiyana: [5.5,6,6.5,6.5,7,7,6], ryze: [5,5.5,5.5,5.5,6,6.5,7.5],
      swain: [6,6,6,6,6.5,6.5,6.5], sylas: [5.5,5.5,6,6,6.5,6.5,7], syndra: [6.5,6.5,7,7,7,7,7],
      taliyah: [6,6,6.5,6.5,6.5,6.5,6], talon: [5.5,6,6.5,6.5,7,7,5.5], twistedfate: [5.5,5.5,6,6,6.5,6.5,6],
      veigar: [5,5,5.5,5.5,6,6.5,7.5], vex: [6,6,6.5,6.5,7,6.5,6.5], viktor: [6,6,6.5,6.5,6.5,6.5,7.5],
      vladimir: [4.5,4.5,5,5.5,6.5,6.5,8], xerath: [7,7,7,7,6.5,6.5,6], yasuo: [5.5,6,6,6,6.5,7.5,7],
      yone: [5.5,6,6,6,6.5,7.5,7.5], zed: [5.5,6,6.5,6.5,7.5,7.5,6], ziggs: [6.5,6.5,6.5,6.5,6,6,6],
      zoe: [6.5,6.5,6.5,6.5,6.5,6.5,6]
    },
    bot: {
      aphelios: [5,5,5.5,5.5,6,6.5,7.5], ashe: [6,6,6,6,6,6,6.5], caitlyn: [7.5,7.5,7.5,7,6.5,6.5,6.5],
      corki: [5,5,5.5,5.5,6,6.5,7], draven: [8,8,8,7.5,7,7.5,6.5], ezreal: [5.5,5.5,5.5,5.5,6,6.5,7],
      heimerdinger: [7,7,7,6.5,6,5.5,5], jhin: [6.5,6.5,6.5,6,6,6.5,6.5], jinx: [5.5,5.5,5.5,5.5,5.5,6.5,8],
      kaisa: [5,5,5.5,5.5,6,6.5,7.5], kalista: [7,7,7,7,6.5,6.5,5.5], karthus: [5.5,5.5,6,6,6.5,7,7],
      kogmaw: [4.5,4.5,5,5,5.5,6,8], lucian: [7.5,7.5,7.5,7,6.5,7,5.5], missfortune: [6.5,6.5,6.5,6,6.5,6.5,6],
      nilah: [5,5,5.5,5.5,6.5,7,8], samira: [5.5,6,6.5,6.5,7,7,7], senna: [6,6,6,6,6,6,7],
      seraphine: [6,6,6,6,6,6,6.5], sivir: [5.5,5.5,5.5,5.5,6,6.5,7], smolder: [4.5,4.5,5,5,5.5,6,8],
      swain: [6.5,6.5,6.5,6.5,7,6.5,6], tristana: [6,6.5,6.5,6,6.5,6.5,7], twitch: [5,5,5.5,5.5,6,6.5,8],
      varus: [6.5,6.5,6.5,6.5,6.5,7,6.5], vayne: [4.5,4.5,5,5,5.5,6.5,8], veigar: [5,5,5.5,5.5,6,6.5,7.5],
      xayah: [6,6,6,6,6.5,6.5,7], zeri: [5,5,5.5,5.5,6,6.5,8], ziggs: [6.5,6.5,6.5,6.5,6,6,6]
    },
    sup: {
      alistar: [5.5,6,6.5,6.5,6.5,6.5,6.5], bard: [6,6,6,6,6,6,6], blitzcrank: [6.5,6.5,6.5,6.5,6.5,6.5,6],
      brand: [7,7,7,6.5,6.5,6.5,6], braum: [5.5,5.5,6,6,6,6,6], galio: [5.5,5.5,6,6,6.5,6,6],
      hwei: [6.5,6.5,6.5,6.5,6.5,6.5,6], janna: [5.5,5.5,5.5,5.5,6,6,6.5], karma: [7,7,6.5,6.5,6,6,6],
      leona: [6,6.5,7,7,7,6.5,6], lulu: [6.5,6.5,6.5,6,6,6,6.5], lux: [6.5,6.5,6.5,6.5,6.5,6.5,6],
      maokai: [6,6,6.5,6.5,6.5,6,6], milio: [6,6,6,6,6,6,6.5], morgana: [6,6,6,6,6,6,6],
      nami: [6.5,6.5,6.5,6,6,6,6.5], nautilus: [6,6.5,6.5,6.5,6.5,6.5,6], neeko: [6.5,6.5,6.5,6,6.5,6,6],
      poppy: [5.5,5.5,5.5,5.5,5.5,6,6], pyke: [6,6.5,6.5,6.5,7,7,6], rakan: [6,6,6.5,6.5,7,6.5,6.5],
      rell: [5.5,6,6.5,6.5,6.5,6.5,6], renata: [6,6,6,6,6,6,6.5], senna: [6.5,6.5,6.5,6,6,6,7],
      seraphine: [6,6,6,6,6,6,6.5], sona: [5.5,5.5,5.5,5.5,6,6.5,7.5], soraka: [6,6,6,6,6,6,6.5],
      swain: [6.5,6.5,6.5,6.5,7,6.5,6], tahmkench: [6,6,6,6,6,6,6], taric: [5,5.5,6,6,6.5,6,6.5],
      thresh: [6,6.5,6.5,6.5,6.5,6.5,6], velkoz: [7,7,7,6.5,6.5,6.5,6], xerath: [7,7,7,6.5,6.5,6.5,6],
      yuumi: [4,4,4,4,4.5,5,6.5], zilean: [6,6,6,6,6,6,6.5], zyra: [7,7,7,6.5,6.5,6.5,6]
    }
  };
  var SIG = {
    aatrox: "Q-sweetspot spacing", akali: "shroud-energy burst windows", akshan: "E-swing poke angles",
    ambessa: "dash-weave combos", aurora: "hop-and-slow kiting", camille: "hookshot wall engages",
    cassiopeia: "grounded-zone DPS", chogath: "rupture-Feast sustain", darius: "pull-bleed all-ins",
    drmundo: "cleaver-sustain scaling", fiora: "vital ripostes", galio: "anti-magic shield trades",
    gangplank: "barrel-chain cash-outs", garen: "silence-spin regen trades", gnar: "boomerang kite-poke",
    gragas: "barrel sustain-poke", graves: "True Grit close-range shred", gwen: "snip-mist %-HP shred",
    heimerdinger: "turret-nest zone control", illaoi: "tentacle-zone tests", irelia: "wave-dash blade stacks",
    jax: "Counter Strike stun-leaps", jayce: "form-swap poke rotations", kassadin: "void-shield scaling",
    kayle: "ranged-form ascension", kennen: "stun-flurry energy poke", kled: "remount dive courage",
    ksante: "tank-dodge Q3 control", lillia: "dream-dust kiting", lucian: "double-tap burst trades",
    malphite: "armor-shield poke soak", maokai: "sapling-root sustain", mordekaiser: "death-realm isolation",
    nasus: "wither-stack inevitability", nautilus: "hook-chain lockdown", neeko: "clone-root deception",
    olaf: "axe run-downs", ornn: "brittle forge control", pantheon: "point-click spear bullying",
    poppy: "wall-stun steadfastness", quinn: "vault-blind kiting", renekton: "fury dash trades",
    riven: "animation-cancel combos", rumble: "overheat flame zones", ryze: "root-rotation sieging",
    sett: "grit-bar true-damage cones", shen: "taunt-shield trades", singed: "poison-trail tempo",
    sion: "charge-knockup tank scaling", swain: "root-drain sustain", sylas: "chain-heal all-ins",
    tahmkench: "grey-health devours", teemo: "blind-shroom attrition", trundle: "pillar-Chomp duels",
    tryndamere: "crit-spin snowballing", urgot: "shotgun-knee shredding", vayne: "tumble-condemn dueling",
    vladimir: "pool-drain sustain", volibear: "stun-bite brawling", warwick: "blood-hunt sustain",
    wukong: "clone-bait shred", yasuo: "windwall dash-weaving", yone: "double-blade spirit dives",
    yorick: "Maiden-ghoul splits", zac: "blob-sustain engages", ziggs: "minefield satchel poke",
    ahri: "charm-orb pick threat", malzahar: "voidling-silence suppression", fizz: "trickster-dodge burst",
    anivia: "wall-frost poke control", syndra: "sphere-stun burst lines", viktor: "laser zone control",
    diana: "orb-dash crash combos", annie: "point-click stun burst", aurelionsol: "stardust ramp control",
    twistedfate: "gold-card tempo picks", naafiri: "packmate dive bursts", brand: "ablaze combo chains",
    hwei: "paintbrush poke barrages", orianna: "ball-control auto harass", xerath: "long-range mana poke",
    lux: "snare-shield poke combos", zoe: "bubble-sleep pick bursts", ekko: "rewind dive resets",
    lissandra: "short-range root bursts", veigar: "cage-stack inevitability", zed: "shadow-shuriken executes",
    azir: "soldier-poke shuffle control", katarina: "dagger-reset roulettes", leblanc: "chain-clone burst escapes",
    mel: "reflect-barrier poke", qiyana: "element-brush ambush bursts", taliyah: "worked-ground boulder bursts",
    talon: "wall-hop bleed bursts", vex: "gloom-fear anti-dash zones", karma: "mantra poke-and-speed denial",
    caitlyn: "650-range trap sieging", nilah: "whirling-blade sustain dives", corki: "package poke rotations",
    draven: "spinning-axe snowballing", senna: "soul-scaling root poke", ezreal: "arcane-shift poke safety",
    kaisa: "plasma-stack burst evolutions", zeri: "wall-zap kite spirals", karthus: "isolated-Q wave mowing",
    kalista: "hop-spear rend executions", kogmaw: "%-HP shred barrages", missfortune: "strut-poke bullet rains",
    samira: "chain-combo style cashes", smolder: "dragon-stack ramping", aphelios: "weapon-cycle range control",
    ashe: "perma-slow volley poke", jhin: "fourth-shot root picks", jinx: "rocket-range ramp-ups",
    sivir: "spell-shield wave mowing", twitch: "stealth-flank venom cashes", varus: "blight-stack poke volleys",
    xayah: "feather-root cleanups", seraphine: "double-cast aura poke", tristana: "jump-reset all-ins",
    alistar: "headbutt-pulverize lockdown", bard: "chime-roam stun picks", blitzcrank: "rocket-grab lane flips",
    braum: "concussive shield walls", janna: "tornado disengage denial", leona: "zenith-blade chain stuns",
    lulu: "polymorph peel tempo", milio: "range-buff warmth peeling", morgana: "binding-shield counterplay",
    nami: "bubble-tide trade chains", pyke: "hook-stealth execute roams", rakan: "feather-dash playmaking",
    rell: "crash-down magnet engages", renata: "bailout berserk flips", sona: "aura-stack crescendo poke",
    soraka: "global-sustain attrition", taric: "bastion stun-heal brawls", thresh: "hook-flay lantern control",
    velkoz: "true-damage poke geometry", yuumi: "attached scaling freeload", zilean: "speed-bomb revive tempo",
    zyra: "plant-root zone gardens"
  };
  var NAME = {
    chogath: "Cho'Gath", drmundo: "Dr. Mundo", ksante: "K'Sante", tahmkench: "Tahm Kench",
    aurelionsol: "Aurelion Sol", twistedfate: "Twisted Fate", missfortune: "Miss Fortune",
    kogmaw: "Kog'Maw", kaisa: "Kai'Sa", leblanc: "LeBlanc", velkoz: "Vel'Koz"
  };
  var T = { FAVOURED: '#3ddc97', HARD: '#ff5d6c', EVEN: '#e8b84b', TRICKY: '#ff8b3d' };
  var W = [1, 1, 1, 1, 0.6, 0.6, 0]; // diff-bias weight by stage (none at 2+ items)
  function disp(s) { return NAME[s] || s.charAt(0).toUpperCase() + s.slice(1); }
  var TAG = ["at level 1","at level 2","at level 3","through levels 4-5","at the level-6 breakpoint","on first item","at two-plus items"];
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function bias(d) { return d === 'FAVOURED' ? 1 : d === 'TRICKY' ? -0.5 : d === 'HARD' ? -1 : 0; }
  function claim(side, o, f) {
    var s = (side || '').toLowerCase();
    if (s.indexOf(disp(f).toLowerCase()) >= 0) return f;
    if (s.indexOf('skill') >= 0 || s.indexOf('even') >= 0 || s.indexOf('depend') >= 0) return null;
    if (s.indexOf(disp(o).toLowerCase()) >= 0) return o;
    return f;
  }
  function whyText(kind, o, f, i, v, edge) {
    var so = SIG[o] || 'core pattern', sf = SIG[f] || 'core pattern', t = TAG[i];
    if (kind === 'win') {
      if (edge) return v === 0
        ? "Slight edge " + t + ": your " + so + " beat " + disp(f) + "'s " + sf + " on the margins. Take the short trades you start — just don't force a coin-flip all-in off a small lead."
        : cap(t) + " the numbers lean your way — " + so + " edge out the " + sf + " when both sides play it straight. Press the small advantages: wave position, first poke, cooldown ticks.";
      return v === 0
        ? "Your " + so + " out-muscle " + disp(f) + "'s " + sf + " " + t + " — this window is yours, so force the trades and tax every step toward the wave."
        : cap(t) + " your " + so + " beat the " + sf + " in a straight exchange. Play the front foot — make " + disp(f) + " answer you, not the other way around.";
    }
    if (edge) return v === 0
      ? "Slight deficit " + t + ": " + disp(f) + "'s " + sf + " edge out your " + so + " on the margins. You can still trade — just let him start the exchanges and answer on your terms."
      : cap(t) + " the numbers lean his way — the " + sf + " out-tick your " + so + " in even exchanges. Don't bleed for pride; take the trades his cooldowns hand you.";
    return v === 0
      ? disp(f) + "'s " + sf + " own this window — your " + so + " don't answer them " + t + " yet. Farm what's safe and let the next spike re-price the lane."
      : "Respect window: " + t + " the " + sf + " beat your " + so + " cleanly. Trade only off " + disp(f) + "'s cooldowns and keep the wave where the lead can't cash out.";
  }
  function ratingFor(d) { return d >= 2.2 ? '8/10' : d >= 1.1 ? '7/10' : '6/10'; }
  function setCell(page, i, kind, o, f, delta) {
    var st = page.phases[i];
    st.side = disp(kind === 'win' ? o : f);
    st.rating = ratingFor(Math.abs(delta));
    st.why = whyText(kind, o, f, i, hash(o + '|' + f + '|' + i) % 2, Math.abs(delta) < 1.1);
  }
  function lanes() {
    var F = window.CHAMP_FULL;
    if (!F) return [];
    var out = { top: [], mid: [], bot: [], sup: [] };
    Object.keys(F).forEach(function (k) {
      var m = k.match(/_(mid|bot|sup)$/);
      if (m) out[m[1]].push(k); else out.top.push(k);
    });
    return out;
  }
  function apply() {
    var F = window.CHAMP_FULL, D = window.CHAMP_DATA;
    if (!F) return;
    var L = lanes();
    Object.keys(L).forEach(function (lane) {
      var suf = lane === 'top' ? '' : '_' + lane;
      var cv = CV[lane];
      var inSet = {};
      L[lane].forEach(function (k) { inSet[suf ? k.slice(0, -suf.length) : k] = 1; });
      L[lane].forEach(function (ka) {
        var a = suf ? ka.slice(0, -suf.length) : ka;
        Object.keys(F[ka]).forEach(function (b) {
          if (a >= b || !inSet[b]) return;
          var kb = b + suf;
          var A = F[ka][b], B = F[kb] && F[kb][a];
          if (!A || !B || !A.phases || !B.phases || !cv[a] || !cv[b]) return;
          // ---- diff upgrade: EVEN/EVEN but lane stages clearly one-sided ----
          var s0 = (bias(A.diff) - bias(B.diff)) / 2;
          var laneAvg = 0;
          for (var j = 0; j <= 4; j++) laneAvg += (cv[a][j] - cv[b][j]);
          laneAvg /= 5;
          if (A.diff === 'EVEN' && B.diff === 'EVEN' && Math.abs(laneAvg) >= 1.15) {
            var lateDelta = cv[a][6] - cv[b][6];
            if (laneAvg >= 1.15 && lateDelta > -1) {
              A.diff = 'FAVOURED'; A.tone = T.FAVOURED; B.diff = 'TRICKY'; B.tone = T.TRICKY;
            } else if (laneAvg <= -1.15 && lateDelta < 1) {
              A.diff = 'TRICKY'; A.tone = T.TRICKY; B.diff = 'FAVOURED'; B.tone = T.FAVOURED;
            }
            if (D) { // mirror onto card tables
              if (D[ka] && D[ka][b]) { D[ka][b].diff = A.diff; D[ka][b].tone = A.tone; }
              if (D[kb] && D[kb][a]) { D[kb][a].diff = B.diff; D[kb][a].tone = B.tone; }
            }
          }
          // ---- phase accuracy ----
          var s = (bias(A.diff) - bias(B.diff)) / 2;
          var n = Math.min(A.phases.length, B.phases.length, 7);
          for (var i = 0; i < n; i++) {
            var delta = (cv[a][i] - cv[b][i]) + s * W[i];
            var ca = claim(A.phases[i].side, a, b), cb = claim(B.phases[i].side, b, a);
            var winner = delta >= 0.35 ? a : delta <= -0.35 ? b : null;
            var strong = Math.abs(delta) >= 2.25;
            if (ca === null && cb === null) {
              if (winner) {
                setCell(A, i, winner === a ? 'win' : 'lose', a, b, delta);
                setCell(B, i, winner === b ? 'win' : 'lose', b, a, delta);
              }
            } else if (ca !== null && cb !== null && ca === cb) {
              // both name the same champ — flip only on strong model disagreement
              if (winner && strong && ca !== winner) {
                setCell(A, i, winner === a ? 'win' : 'lose', a, b, delta);
                setCell(B, i, winner === b ? 'win' : 'lose', b, a, delta);
              }
            } else if ((ca === null) !== (cb === null)) {
              var named = ca !== null ? ca : cb;
              if (winner && strong && named !== winner) {
                // model strongly disagrees with the hand-named side — flip both
                setCell(A, i, winner === a ? 'win' : 'lose', a, b, delta);
                setCell(B, i, winner === b ? 'win' : 'lose', b, a, delta);
              } else {
                // adopt the hand-named claim on the neutral page (hand data > weak model)
                var d2 = Math.max(Math.abs(delta), 0.6) * (named === a ? 1 : -1);
                if (ca === null) setCell(A, i, named === a ? 'win' : 'lose', a, b, d2);
                else setCell(B, i, named === b ? 'win' : 'lose', b, a, d2);
              }
            }
          }
        });
      });
    });
  }
  apply();
  if (typeof setTimeout === 'function') {
    var tries = 0;
    var iv = setInterval(function () { apply(); if (++tries >= 24) clearInterval(iv); }, 250);
    setTimeout(apply, 0);
  }
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('DOMContentLoaded', apply);
  }
})();

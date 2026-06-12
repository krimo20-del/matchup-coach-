// Top-lane phase-lead mirror fixes (June 2026 full-lane review). The hand/gen data's
// phases[].side claims contradicted across 1,612 reverse pairs (4,902 pair-stages: e.g.
// aatrox page "Aatrox" at 2+ items while darius page says "Darius" for the same window).
// This file resolves ONLY contradicting pair-stages (both sides claim different champs)
// from one shared model: per-champ 7-stage lane power curves (L1,L2,L3,L4-5,L6,item1,2+items)
// plus a bias from the pair's validated diff (read LIVE at apply time, so it picks up all
// diff-fix layers). The page whose original claim matches the resolved winner keeps its
// hand-written why; the disagreeing page gets side+rating+why rewritten from per-champ
// signature phrases. Neutral-vs-named stages are left alone (legitimate nuance).
// Loaded LAST after _xlane-soft-fixes.js. Same idempotent retry-loop pattern.
(function () {
  var CV = {
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
    nasus: "wither-stack inevitability", nautilus: "hook-chain lockdown", neeko: "clone-root burst",
    olaf: "axe run-downs", ornn: "brittle forge control", pantheon: "point-click spear bullying",
    poppy: "wall-stun steadfastness", quinn: "vault-blind kiting", renekton: "fury dash trades",
    riven: "animation-cancel combos", rumble: "overheat flame zones", ryze: "root-rotation sieging",
    sett: "grit-bar true-damage cones", shen: "taunt-shield trades", singed: "poison-trail tempo",
    sion: "charge-knockup tank scaling", swain: "root-drain sustain", sylas: "chain-heal all-ins",
    tahmkench: "grey-health devours", teemo: "blind-shroom attrition", trundle: "pillar-Chomp duels",
    tryndamere: "crit-spin snowballing", urgot: "shotgun-knee shredding", vayne: "tumble-condemn kiting",
    vladimir: "pool-drain sustain", volibear: "stun-bite brawling", warwick: "blood-hunt sustain",
    wukong: "clone-bait shred", yasuo: "windwall dash-weaving", yone: "double-blade spirit dives",
    yorick: "Maiden-ghoul splits", zac: "blob-sustain engages", ziggs: "minefield satchel poke"
  };
  var NAME = {
    chogath: "Cho'Gath", drmundo: "Dr. Mundo", ksante: "K'Sante", tahmkench: "Tahm Kench",
    aurelionsol: "Aurelion Sol", twistedfate: "Twisted Fate", missfortune: "Miss Fortune",
    masteryi: "Master Yi", xinzhao: "Xin Zhao", jarvaniv: "Jarvan IV", leesin: "Lee Sin",
    kogmaw: "Kog'Maw", kaisa: "Kai'Sa", khazix: "Kha'Zix", belveth: "Bel'Veth", reksai: "Rek'Sai",
    nunu: "Nunu & Willump", renataglasc: "Renata Glasc", velkoz: "Vel'Koz"
  };
  function disp(slug) { return NAME[slug] || slug.charAt(0).toUpperCase() + slug.slice(1); }
  var TAG = ["at level 1","at level 2","at level 3","through levels 4-5","at the level-6 breakpoint","on first item","at two-plus items"];
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function bias(d) { return d === 'FAVOURED' ? 1 : d === 'TRICKY' ? -0.5 : d === 'HARD' ? -1 : 0; }
  // classify a side string on page (owner o, foe f) -> absolute slug, or null for neutral
  function claim(side, o, f) {
    var s = (side || '').toLowerCase();
    if (s.indexOf(disp(f).toLowerCase()) >= 0 || s.indexOf(f) >= 0) return f;
    if (s.indexOf('skill') >= 0 || s.indexOf('even') >= 0 || s.indexOf('depend') >= 0) return null;
    if (s.indexOf(disp(o).toLowerCase()) >= 0 || s.indexOf(o) >= 0) return o;
    return f; // app default: unknown strings render enemy-red
  }
  function whyText(kind, o, f, i, v) {
    var so = SIG[o] || 'core pattern', sf = SIG[f] || 'core pattern', t = TAG[i];
    if (kind === 'win') return v === 0
      ? "Your " + so + " out-muscle his " + sf + " " + t + " — this window is yours, so force the trades and tax every step he takes toward the wave."
      : cap(t) + " your " + so + " beat his " + sf + " in a straight exchange. Play the front foot — make him answer you, not the other way around.";
    if (kind === 'lose') return v === 0
      ? "His " + sf + " own this window — your " + so + " don't answer them " + t + " yet. Concede the bush, farm what's safe, and let the next spike re-price the lane."
      : "Respect window: " + t + " his " + sf + " beat your " + so + " cleanly. Trade only off his cooldowns and keep the wave where his lead can't cash out.";
    return v === 0
      ? "Dead even " + t + " — " + so + " against " + sf + " is a cooldown ledger, not a stat check. Whoever spends smarter wins the window."
      : "Neither side owns this window: his " + sf + " and your " + so + " cancel out " + t + ". The HP bars walking into it decide who presses first.";
  }
  function ratingFor(absDelta) { return absDelta >= 2.5 ? '8/10' : absDelta >= 1.5 ? '7/10' : '6/10'; }
  function setStage(page, i, kind, o, f, delta) {
    var st = page.phases[i];
    var v = hash(o + '|' + f + '|' + i) % 2;
    st.side = kind === 'skill' ? 'Skill' : (kind === 'win' ? disp(o) : disp(f));
    st.rating = kind === 'skill' ? '5/10' : ratingFor(Math.abs(delta));
    st.why = whyText(kind, o, f, i, v);
  }
  function apply() {
    var F = window.CHAMP_FULL;
    if (!F) return;
    var keys = Object.keys(F).filter(function (k) { return !/_(mid|bot|sup)$/.test(k); });
    var inSet = {};
    keys.forEach(function (k) { inSet[k] = 1; });
    keys.forEach(function (a) {
      Object.keys(F[a]).forEach(function (b) {
        if (a >= b || !inSet[b] || !F[b][a]) return;
        var A = F[a][b], B = F[b][a];
        var pa = A.phases || [], pb = B.phases || [];
        var n = Math.min(pa.length, pb.length, 7);
        if (!n) return;
        var s = (bias(A.diff) - bias(B.diff)) / 2;
        for (var i = 0; i < n; i++) {
          var ca = claim(pa[i].side, a, b), cb = claim(pb[i].side, b, a);
          if (ca === null || cb === null || ca === cb) continue; // consistent or soft
          var delta = ((CV[a] || [5,5,5,5,5,5,5])[i] - (CV[b] || [5,5,5,5,5,5,5])[i]) + s;
          var winner = delta >= 0.9 ? a : delta <= -0.9 ? b : null;
          if (winner === null) {
            setStage(A, i, 'skill', a, b, delta);
            setStage(B, i, 'skill', b, a, delta);
          } else {
            // page whose claim already matches keeps its hand-written text
            if (ca !== winner) setStage(A, i, winner === a ? 'win' : 'lose', a, b, delta);
            if (cb !== winner) setStage(B, i, winner === b ? 'win' : 'lose', b, a, delta);
          }
        }
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

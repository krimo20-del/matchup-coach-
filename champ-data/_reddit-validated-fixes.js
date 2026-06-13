// _reddit-validated-fixes.js — hand-validated matchup corrections.
//
// Loaded LAST (after _phase-accuracy-fixes.js). Cross-references matchups against
// current win-rate / counter data (lolalytics primarily — Emerald+ samples) and
// corrects the VERDICT (diff) + the 7-stage FAVOUR WINDOWS where the generated
// data was wrong. Where a real win rate is known it is also written to
// window.MC_REAL_WR so the app shows the REAL number (not the verdict estimate)
// AND the verdict is derived from that number, so they can never disagree.
//
// `win` (optional) = who owns each lane stage, in order:
//   [Level 1, Level 2, Level 3, Levels 4-5, Level 6, First item, 2+ items]
//   — a champion display name, or 'Skill' for an even window. null = don't touch.
// Same idempotent retry pattern as the other fix files; longest loop so this layer
// settles AFTER the generated phase layers (it is the source of truth).
(function () {
  'use strict';
  var TONE = { FAVOURED: '#3ddc97', HARD: '#ff5d6c', EVEN: '#e8b84b', TRICKY: '#ff8b3d', MIRROR: '#e8b84b' };
  var STAGES = ['level 1', 'level 2', 'level 3', 'levels 4-5', 'level 6', 'first item', '2+ items'];
  var DISP = { chogath: "Cho'Gath", drmundo: 'Dr. Mundo', ksante: "K'Sante", tahmkench: 'Tahm Kench' };
  function disp(s) { return DISP[s] || (s.charAt(0).toUpperCase() + s.slice(1)); }

  // ===== hand-set top-lane pairs (verdict + windows) =====
  var FIX = [
    { a: 'darius',   b: 'garen',       da: 'FAVOURED', db: 'TRICKY',   win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Garen'] },
    { a: 'camille',  b: 'fiora',       da: 'FAVOURED', db: 'TRICKY',   win: ['Fiora', 'Skill', 'Skill', 'Skill', 'Skill', 'Camille', 'Camille'] },
    { a: 'renekton', b: 'darius',      da: 'FAVOURED', db: 'TRICKY',   win: ['Darius', 'Renekton', 'Renekton', 'Renekton', 'Skill', 'Skill', 'Darius'] },
    { a: 'darius',   b: 'nasus',       da: 'FAVOURED', db: 'TRICKY',   win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Nasus'] },
    { a: 'darius',   b: 'mordekaiser', da: 'FAVOURED', db: 'TRICKY',   win: ['Darius', 'Darius', 'Darius', 'Darius', 'Mordekaiser', 'Skill', 'Skill'] },
    { a: 'fiora',    b: 'jax',         da: 'EVEN',     db: 'EVEN',     win: ['Skill', 'Skill', 'Skill', 'Skill', 'Skill', 'Fiora', 'Fiora'] },
    { a: 'malphite', b: 'tryndamere',  da: 'FAVOURED', db: 'HARD',     win: ['Tryndamere', 'Tryndamere', 'Skill', 'Skill', 'Malphite', 'Malphite', 'Malphite'] }
  ];

  // ===== AATROX (top) — real lolalytics win rates (Emerald+, patch 26.12) =====
  // The verdict AND the displayed win rate both come from these numbers. Aatrox is
  // one of the WEAKEST level 1-3 champions in the game, so his favoured lanes use a
  // "no level-1" window (even L1-2, Aatrox owns L3 -> first item; hard-scalers take
  // 2+ items). Sources: lolalytics aatrox/vs/<x> + aatrox/counters.
  window.MC_REAL_WR = window.MC_REAL_WR || {};
  var WR = {
    aatrox: {
      // losses (lolalytics Emerald+) — scalers, ranged poke, mobile skirmishers
      kayle: 44.9, singed: 45.1, kennen: 45.6, cassiopeia: 46.2, ornn: 47.6, zed: 47.7,
      irelia: 47.9, malphite: 48.3,
      // even (~49-52%)
      urgot: 49.0, kled: 49.1, wukong: 49.5, aurora: 49.8, fiora: 49.8, illaoi: 49.8,
      gangplank: 49.9, sylas: 50.5, yone: 50.8, pantheon: 50.7, garen: 51.2, volibear: 51.2,
      gnar: 51.3, warwick: 51.3, renekton: 51.1, olaf: 51.7, darius: 51.8, riven: 50.3,
      ryze: 50.3, gragas: 50.4, tryndamere: 50.6, quinn: 50.6, jayce: 50.7, jax: 52.1,
      nasus: 52.4, ambessa: 52.4, heimerdinger: 52.4, yasuo: 52.5,
      // favoured (>=52.5%)
      ksante: 52.8, gwen: 52.9, trundle: 53.0, mordekaiser: 53.1, sett: 53.2, sion: 53.4,
      chogath: 53.7, yorick: 53.8, rumble: 53.9, teemo: 53.9, akali: 53.9, vayne: 54.1,
      camille: 54.5, shen: 54.5, vladimir: 55.3, poppy: 55.7, varus: 55.9, naafiri: 56.0,
      drmundo: 56.3, swain: 57.1, tahmkench: 58.2
    }
  };
  // hard-scalers who reclaim the 2+ item window even in an Aatrox-favoured lane
  var SCALER = { vladimir: 1, kassadin: 1, nasus: 1, chogath: 1, camille: 1, vayne: 1, kayle: 1, ryze: 1, gangplank: 1, kled: 1, cassiopeia: 1 };
  function diffFromWr(wr) { return wr >= 52.5 ? 'FAVOURED' : wr >= 48.5 ? 'EVEN' : wr >= 45.5 ? 'TRICKY' : 'HARD'; }
  function mirrorDiff(d) { return d === 'FAVOURED' ? 'TRICKY' : d === 'EVEN' ? 'EVEN' : 'FAVOURED'; }
  Object.keys(WR).forEach(function (champ) {
    var m = WR[champ];
    Object.keys(m).forEach(function (en) {
      var wr = m[en], da = diffFromWr(wr);
      window.MC_REAL_WR[champ] = window.MC_REAL_WR[champ] || {}; window.MC_REAL_WR[champ][en] = wr;
      window.MC_REAL_WR[en] = window.MC_REAL_WR[en] || {}; window.MC_REAL_WR[en][champ] = Math.round((100 - wr) * 10) / 10;
      // window override only for the favoured lanes (where the "Aatrox owns L1" bug lives)
      var win = (da === 'FAVOURED')
        ? ['Skill', 'Skill', disp(champ), disp(champ), disp(champ), disp(champ), SCALER[en] ? disp(en) : 'Skill']
        : null;
      FIX.push({ a: champ, b: en, da: da, db: mirrorDiff(da), win: win });
    });
  });

  function stageIdx(label) {
    var l = String(label || '').toLowerCase();
    var i = STAGES.indexOf(l);
    if (i >= 0) return i;
    for (var k = 0; k < STAGES.length; k++) { if (l.slice(0, 7) === STAGES[k].slice(0, 7)) return k; }
    return -1;
  }
  function setWindows(entry, win) {
    if (!entry || !entry.phases || !win) return;
    entry.phases.forEach(function (p) { var i = stageIdx(p.label); if (i >= 0 && win[i]) p.side = win[i]; });
  }
  function patch(store, slug, enemy, diff, win) {
    if (!store || !store[slug] || !store[slug][enemy]) return;
    var e = store[slug][enemy];
    e.diff = diff;
    e.tone = TONE[diff] || e.tone;
    setWindows(e, win);
  }
  function apply() {
    var F = window.CHAMP_FULL, D = window.CHAMP_DATA;
    if (!F && !D) return;
    FIX.forEach(function (f) {
      [F, D].forEach(function (store) {
        patch(store, f.a, f.b, f.da, f.win);
        patch(store, f.b, f.a, f.db, f.win);
      });
    });
  }
  apply();
  if (typeof setTimeout === 'function') {
    var t = 0, iv = setInterval(function () { apply(); if (++t >= 50) clearInterval(iv); }, 320);
  }
})();

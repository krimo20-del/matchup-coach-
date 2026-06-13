// _reddit-validated-fixes.js — hand-validated matchup corrections.
//
// Loaded LAST (after _phase-accuracy-fixes.js). Each entry below was
// cross-referenced one-by-one against current win-rate / counter data
// (lolalytics, mobalytics, counterstats, metabot — the same numbers the
// community/Reddit consensus is built on) and corrects the matchup VERDICT
// (diff) + the 7-stage FAVOUR WINDOWS where the generated data was wrong.
//
// `win` is who owns each lane stage, in order:
//   [Level 1, Level 2, Level 3, Levels 4-5, Level 6, First item, 2+ items]
//   — a champion display name, or 'Skill' for an even window.
// It is written to BOTH champions' pages so the timeline + level table agree.
// Same idempotent retry pattern as the other fix files; a longer loop so this
// layer settles AFTER the generated phase layers (it is the source of truth).
//
// ===== TOP LANE (validated June 2026) =====
//  • Darius vs Garen — Darius wins (51-52% WR): wins L1-3 trades + 6 all-in;
//    Garen only sustains back. Was mis-rated HARD-for-Darius.
//  • Camille vs Fiora — Camille slight edge (~52%) and out-scales; Fiora's only
//    edge is the early parry/vital window. Was over-rated Fiora-FAVOURED.
//  • Renekton vs Darius — Renekton favoured, dominates the first 15 min; the
//    early windows belong to Renekton (were handed to Darius).
//  • Darius vs Nasus — textbook early-bully vs scaler: Darius owns the whole
//    lane, Nasus takes over at 2+ items / late. Was all-Darius incl. late.
//  • Darius vs Mordekaiser — Darius slight edge, wins pre-6; Morde spikes at 6
//    with R-isolation. Level-6 window belongs to Morde.
(function () {
  'use strict';
  var TONE = { FAVOURED: '#3ddc97', HARD: '#ff5d6c', EVEN: '#e8b84b', TRICKY: '#ff8b3d', MIRROR: '#e8b84b' };
  var STAGES = ['level 1', 'level 2', 'level 3', 'levels 4-5', 'level 6', 'first item', '2+ items'];
  var FIX = [
    { a: 'darius',   b: 'garen',       da: 'FAVOURED', db: 'TRICKY',   win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Garen'] },
    { a: 'camille',  b: 'fiora',       da: 'FAVOURED', db: 'TRICKY',   win: ['Fiora', 'Skill', 'Skill', 'Skill', 'Skill', 'Camille', 'Camille'] },
    // Renekton vs Darius — Renekton favoured overall (dominates the early GAME),
    // but that edge is L2-5: combo online + Fury for short hit-and-run trades.
    // LEVEL 1 belongs to DARIUS — Renekton has one ability and no Fury (empowered
    // stun offline), so a prolonged auto-heavy all-in is won by Darius's Hemorrhage
    // bleed + Crippling Strike. Darius also scales relatively better very late.
    { a: 'renekton', b: 'darius',      da: 'FAVOURED', db: 'TRICKY',   win: ['Darius', 'Renekton', 'Renekton', 'Renekton', 'Skill', 'Skill', 'Darius'] },
    { a: 'darius',   b: 'nasus',       da: 'FAVOURED', db: 'TRICKY',   win: ['Darius', 'Darius', 'Darius', 'Darius', 'Darius', 'Skill', 'Nasus'] },
    { a: 'darius',   b: 'mordekaiser', da: 'FAVOURED', db: 'TRICKY',   win: ['Darius', 'Darius', 'Darius', 'Darius', 'Mordekaiser', 'Skill', 'Skill'] },
    // Jax vs Fiora — near-even (~50/50), slight Fiora in the late 1v1 (parry + %-HP
    // true damage). Was over-rated all-Jax. Whoever burns the defensive (Counter
    // Strike / Riposte) first loses the trade.
    { a: 'fiora',    b: 'jax',         da: 'EVEN',     db: 'EVEN',     win: ['Skill', 'Skill', 'Skill', 'Skill', 'Skill', 'Fiora', 'Fiora'] },
    // Malphite vs Tryndamere — Malphite hard-counters (54-55%): Trynd's early
    // all-in pressure gives way to Malphite's armor stacking + R lockdown.
    { a: 'malphite', b: 'tryndamere',  da: 'FAVOURED', db: 'HARD',     win: ['Tryndamere', 'Tryndamere', 'Skill', 'Skill', 'Malphite', 'Malphite', 'Malphite'] }
  ];

  function stageIdx(label) {
    var l = String(label || '').toLowerCase();
    var i = STAGES.indexOf(l);
    if (i >= 0) return i;
    for (var k = 0; k < STAGES.length; k++) { if (l.slice(0, 7) === STAGES[k].slice(0, 7)) return k; }
    return -1;
  }
  function setWindows(entry, win) {
    if (!entry || !entry.phases) return;
    entry.phases.forEach(function (p) {
      var i = stageIdx(p.label);
      if (i >= 0 && win[i]) p.side = win[i];
    });
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

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
    { a: 'malphite', b: 'tryndamere',  da: 'FAVOURED', db: 'HARD',     win: ['Tryndamere', 'Tryndamere', 'Skill', 'Skill', 'Malphite', 'Malphite', 'Malphite'] },

    // ===== AATROX (top) — validated June 2026 =====
    // Aatrox profile (researched): one of the WEAKEST level 1-3 in the game; first
    // real spike at level 3, strongest ~level 7 (2x Q + Serrated Dirk) and 15-25min
    // mid-game. So Aatrox should NOT own level 1 in any lane — even/behind L1-2,
    // takes over L3-6 + first item, scaler opponents reclaim 2+ items.
    //  • vs Camille — Aatrox 54.5% (dominates early-mid; Camille out-scales). Was EVEN.
    { a: 'aatrox', b: 'camille',     da: 'FAVOURED', db: 'TRICKY', win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Camille'] },
    //  • vs Wukong — Wukong 52-59% (decoy/nimbus hit-and-run out-trades). Was EVEN.
    { a: 'aatrox', b: 'wukong',      da: 'TRICKY',   db: 'FAVOURED', win: ['Wukong', 'Wukong', 'Skill', 'Skill', 'Skill', 'Skill', 'Aatrox'] },
    //  • vs Vayne — Aatrox counters her (no escape vs pull-knockup); she scales very late. Was EVEN.
    { a: 'aatrox', b: 'vayne',       da: 'FAVOURED', db: 'TRICKY', win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Vayne'] },
    //  • vs Tahm Kench — Aatrox's single best matchup (bullies a weak laner). Was EVEN.
    { a: 'aatrox', b: 'tahmkench',   da: 'FAVOURED', db: 'TRICKY', win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'] },
    //  • vs Kayle — Aatrox stomps LANE but Kayle wins the GAME (44% Aatrox): EVEN, with
    //    Aatrox owning early-mid and Kayle owning 2+ items / late. Was FAVOURED (overstated).
    { a: 'aatrox', b: 'kayle',       da: 'EVEN',     db: 'EVEN',   win: ['Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Kayle'] },
    //  • window-only fixes (verdict already right) — strip Aatrox's bogus level-1 ownership;
    //    scaler opponents reclaim 2+ items.
    { a: 'aatrox', b: 'chogath',     da: 'FAVOURED', db: 'TRICKY', win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', "Cho'Gath"] },
    { a: 'aatrox', b: 'nasus',       da: 'FAVOURED', db: 'TRICKY', win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Nasus'] },
    { a: 'aatrox', b: 'sion',        da: 'FAVOURED', db: 'TRICKY', win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'] },
    { a: 'aatrox', b: 'vladimir',    da: 'FAVOURED', db: 'TRICKY', win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Vladimir'] },
    { a: 'aatrox', b: 'kassadin',    da: 'FAVOURED', db: 'TRICKY', win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Kassadin'] },
    { a: 'aatrox', b: 'drmundo',     da: 'FAVOURED', db: 'TRICKY', win: ['Skill', 'Skill', 'Aatrox', 'Aatrox', 'Aatrox', 'Aatrox', 'Skill'] }
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

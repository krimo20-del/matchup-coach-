/* _jg-label-text-fixes.js — loaded LAST in the jg helmet (after _jg-headsup-fixes.js,
   _jg-loadouts.js and _jg-window-labels.js). Favour-COLOUR correction for the Jungle Coach:
   makes a stage's advTone() colour match what its why-text says. A full intent-vs-tone audit
   of all 16,807 jungle stage-cells (verified against the LIVE browser load order) found the
   data already colour-consistent EVERYWHERE except one matchup — so this layer is deliberately
   tiny and surgical (no blanket regeneration, which would damage correct cells).

   Vi vs Viego — the only name-collision in the roster: advTone() greens any label that contains
   the page champ's name as a substring, and "vi" ⊂ "viego", so the intended-RED labels ("Respect
   Viego" at L2/L3/4-5, "Danger — Viego Outscales" at 2+ items) rendered GREEN — a losing lane
   shown as favourable. Stage 0 ("Even Skirmish") and 4/5 are unaffected. Fixed with name-free red
   wording, each verified RED via the real advTone() (DC ~6711) for you="Vi". The why-texts
   already say Viego wins, so colour now matches text.

   Own 250ms×40 retry loop (outlasts the headsup + window-labels 6s loops) so it has the last word
   on these cells. Stage indices: 0 L1,1 L2,2 L3,3 L4-5,4 L6,5 First-Item(protected),6 2+items. */
(function () {
  var FIX = {
    "Vi": { "Viego": { "1": "Respect the Skirmish", "2": "Respect — Path Opposite", "3": "Respect — Path Opposite", "6": "Danger — Outscaled Late" } }
  };
  function apply() {
    var DB = window.JG_DB; if (!DB) return;
    for (var you in FIX) {
      var en = DB[you]; if (!en) continue; var mm = FIX[you];
      for (var ek in mm) {
        var rep = en[ek]; if (!rep || !rep.stages) continue; var idxs = mm[ek];
        for (var k in idxs) { var i = +k; if (rep.stages[i] && rep.stages[i].adv !== idxs[k]) rep.stages[i].adv = idxs[k]; }
      }
    }
  }
  apply();
  if (typeof setInterval === 'function') { var n = 0, t = setInterval(function () { apply(); if (++n >= 40) clearInterval(t); }, 250); }
  if (typeof document !== 'undefined' && document.addEventListener) document.addEventListener('DOMContentLoaded', apply);
})();

/* _slug-aliases.js — reconcile display-name slugs with data keys.

   The app looks up opponents with slug(displayName) = lowercase, non-alphanumerics
   stripped. A few champions are stored under a SHORTER key than their roster
   display name produces, so those lookups silently missed and the matchup fell
   back to generic filler:

     roster "Renata Glasc" -> slug "renataglasc"   but data keys use "renata"
     roster "Nunu & Willump" -> slug "nunuwillump" but some data uses "nunu"

   This layer mirrors each aliased opponent entry under BOTH spellings across
   every data map, so whichever slug a lookup uses, it resolves. Idempotent and
   re-run on an interval because _reddit-validated-fixes.js rebuilds MC_REAL_WR
   periodically (late-loaded champion files land after the first pass). */
(function () {
  'use strict';
  // canonical data key -> alternate slugs that must resolve to the same entry
  var ALIAS = {
    renata: ['renataglasc'],
    nunu: ['nunuwillump'],
    velkoz: ['velkoz'],
    chogath: ['chogath']
  };

  function mirror(bag) {
    if (!bag) return;
    for (var owner in bag) {
      var row = bag[owner];
      if (!row || typeof row !== 'object') continue;
      for (var canon in ALIAS) {
        var alts = ALIAS[canon];
        for (var i = 0; i < alts.length; i++) {
          var alt = alts[i];
          if (alt === canon) continue;
          // mirror in whichever direction has the data
          if (row[canon] !== undefined && row[alt] === undefined) row[alt] = row[canon];
          else if (row[alt] !== undefined && row[canon] === undefined) row[canon] = row[alt];
        }
      }
    }
  }
  // Also mirror the TOP-LEVEL champion keys (e.g. CHAMP_DATA['renata_sup'] so a
  // 'renataglasc_sup' lookup resolves too).
  function mirrorTop(bag) {
    if (!bag) return;
    for (var canon in ALIAS) {
      var alts = ALIAS[canon];
      for (var i = 0; i < alts.length; i++) {
        var alt = alts[i];
        if (alt === canon) continue;
        ['', '_mid', '_bot', '_sup'].forEach(function (sfx) {
          var c = canon + sfx, a = alt + sfx;
          if (bag[c] !== undefined && bag[a] === undefined) bag[a] = bag[c];
          else if (bag[a] !== undefined && bag[c] === undefined) bag[c] = bag[a];
        });
      }
    }
  }

  function apply() {
    try {
      [window.CHAMP_DATA, window.CHAMP_FULL, window.MC_WR_TABLES,
       window.MC_REAL_GAMES, window.MC_REAL_WR, window.MC_LIVE_WR].forEach(function (bag) {
        mirrorTop(bag); mirror(bag);
      });
    } catch (e) {}
  }

  apply();
  var n = 0;
  var iv = setInterval(function () { apply(); if (++n > 60) clearInterval(iv); }, 500);
  if (document.readyState !== 'complete') window.addEventListener('load', apply);
})();

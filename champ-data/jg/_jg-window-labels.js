// MatchupCoach — jungle window-label clarity pass. Loaded LAST (after _jg-headsup-fixes.js).
// The parsed PDFs gave every champ vague self-describing labels at stage 3 ("Levels 4-5":
// "Tempo Generation Focus", "Stacking Optimization", "Objective Poke") and stage 6 ("2+ Items":
// "Unstoppable Vanguard", "High-Impact Artillery Asset", "Infinite Scaling Juggernaut", ...) —
// identical for all 49 enemies of a champ and meaningless as matchup advice.
// This rewrites BOTH stages of EVERY JG_DB report with clear who-wins labels + whys:
//   stage 3 (Levels 4-5): verdict = midpoint of the report's own (already-fixed, mirror-
//     consistent) Level-3 and Level-6 verdicts -> mirror-consistent by construction.
//   stage 6 (2+ Items):   verdict from a shared late-game 1v1 scaling table (LS, 0-10),
//     community-consensus -> A-vs-B and B-vs-A agree by construction.
// Labels are tuned to the app's advTone() regexes: green needs the OWNER's name or
// dominant/favou?red; amber must avoid all keywords; red uses respect/danger/avoid.
// Stage 5 (First Item) is untouched — the app parses the item name out of that label.
(function () {
  // late-game (2+ items) 1v1 scaling, 0-10 — keys must match JG_DB display names exactly
  var LS = {
    'Master Yi': 10, "Bel'Veth": 10, 'Jax': 9.5, 'Kindred': 9.5, 'Viego': 9,
    'Kayn': 9, 'Shyvana': 9, 'Karthus': 9, 'Ekko': 8.5, 'Evelynn': 8.5,
    'Diana': 8.5, 'Fiddlesticks': 8.5, 'Lillia': 8.5, "Kha'Zix": 8, 'Graves': 8,
    'Brand': 8, 'Zac': 8, 'Nocturne': 7.5, 'Udyr': 7.5, 'Qiyana': 7.5,
    'Rengar': 7.5, 'Briar': 7.5, 'Hecarim': 7.5, 'Amumu': 7.5, 'Skarner': 7.5,
    'Zyra': 7.5, 'Volibear': 7, 'Trundle': 7, 'Wukong': 7, 'Sejuani': 7,
    'Maokai': 7, 'Rammus': 7, 'Taliyah': 7, 'Gragas': 7, 'Olaf': 6.5,
    'Talon': 6.5, 'Naafiri': 6.5, 'Shaco': 6.5, 'Vi': 6.5, 'Jarvan IV': 6.5,
    'Warwick': 6.5, 'Ivern': 6.5, 'Morgana': 6.5, 'Xin Zhao': 6, 'Nidalee': 6,
    "Rek'Sai": 6, 'Nunu & Willump': 6, 'Lee Sin': 5.5, 'Elise': 5
  };

  // verdict score from an already-fixed stage label (stages 0-2 & 4 formats)
  function vOf(adv) {
    var a = (adv || '').toLowerCase();
    if (/dominant|domination/.test(a)) return 2;
    if (/favored|favoured/.test(a)) return 1;
    if (/danger/.test(a)) return -2;
    if (/respect/.test(a)) return -1;
    return 0; // Even Skirmish / Even Ult Window / mirrors
  }

  function stage3(you, foe, d) {
    if (d >= 1.5) return { adv: you + ' Dominant — Keep Fighting',
      why: 'Levels 4-5 change nothing: you still win every straight duel vs ' + foe + '. Sit in their river, take both scuttles, and tax every camp they concede.' };
    if (d >= 0.5) return { adv: you + ' Favored — Take Duels',
      why: 'Through levels 4-5 you remain the stronger duelist — keep taking short, decisive trades vs ' + foe + ', but only with the HP and cooldown lead.' };
    if (d > -0.5) return { adv: 'Even — Farm & Track',
      why: 'Levels 4-5 are a stalemate vs ' + foe + ' — match their clear speed, keep river vision, and bank gold for the level-6 window instead of coin-flipping.' };
    if (d > -1.5) return { adv: 'Respect ' + foe + ' — Path Opposite',
      why: 'Levels 4-5 still belong to ' + foe + ' in a straight fight — farm the opposite side, answer their ganks cross-map, and wait for your spike.' };
    return { adv: 'Danger — Avoid ' + foe,
      why: 'Do not be seen by ' + foe + ' at levels 4-5 — you lose every exchange. Full-clear away from them, ward your entrances, and trade map pressure, not HP.' };
  }

  function stage6(you, foe, d) {
    if (d >= 1.25) return { adv: you + ' Favored — Wins Late',
      why: foe + ' falls off relative to you — from two items on you win the raw stat check. Drag the game long, duel for every objective, and force 1v1s.' };
    if (d >= 0.5) return { adv: you + ' Favored at Full Build',
      why: 'Full-build math leans your way: extended fights and side-lane duels favor you over ' + foe + ' — make late fights about 1v1s, not coin-flips.' };
    if (d > -0.5) return { adv: 'Even Scaling — Prep Decides',
      why: 'Both kits pay off at 2+ items — late fights vs ' + foe + ' come down to who enters with cooldowns, vision, and numbers. Win with setup, not stats.' };
    if (d > -1.25) return { adv: 'Respect ' + foe + ' Late — End Early',
      why: foe + ' out-stats you from two items on — stop taking straight 1v1s, close through objectives and picks, and keep the game on a clock.' };
    return { adv: 'Danger — ' + foe + ' Outscales',
      why: 'Every minute past 25 tilts toward ' + foe + ' — you do not win the late game. Force your win condition early or watch it slip away slowly.' };
  }

  function apply() {
    var DB = window.JG_DB;
    if (!DB) return false;
    var champs = Object.keys(DB);
    if (!champs.length) return false;
    var did = false;
    champs.forEach(function (you) {
      var reports = DB[you];
      Object.keys(reports).forEach(function (foe) {
        var st = reports[foe] && reports[foe].stages;
        if (!st || st.length < 7 || !st[3] || !st[6]) return;
        // wait until the headsup pass has rewritten stages 0-2 & 4 (its label grammar)
        var probe = ((st[2] && st[2].adv) || '').toLowerCase();
        if (!/dominant|favored|favoured|even skirmish|respect|danger|mirror/.test(probe)) return;
        var d35 = (vOf(st[2].adv) + vOf(st[4].adv)) / 2;
        var s3 = stage3(you, foe, d35);
        if (st[3].adv !== s3.adv) { st[3].adv = s3.adv; st[3].why = s3.why; did = true; }
        if (LS[you] != null && LS[foe] != null) {
          var s6 = stage6(you, foe, LS[you] - LS[foe]);
          if (st[6].adv !== s6.adv) { st[6].adv = s6.adv; st[6].why = s6.why; did = true; }
        }
      });
    });
    return did;
  }

  apply();
  var ticks = 0;
  var t = setInterval(function () {
    apply();
    if (++ticks >= 24) clearInterval(t);
  }, 250);
})();

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
   on these cells. Stage indices: 0 L1,1 L2,2 L3,3 L4-5,4 L6,5 First-Item(protected),6 2+items.

   ABILITY-NAME CAPITALS — now a second line of defence (2026-09-08). _jg-headsup-fixes.js has its
   own LOWERABLE list and only lower-cases a spliced phrase whose first word is an ordinary one, so
   it no longer emits ": sonic Wave" at any join. This pass is kept because it is idempotent, costs
   nothing, and covers joins that layer does not use. The de-duplication rewrite added several new
   joins (", and ", ". On top of that, ", ", which ") that the RE below deliberately does not list —
   those are safe precisely because the headsup layer never lower-cases a name into them.

   ORIGINAL NOTE. _jg-headsup-fixes.js builds the L1/L2/L3 and L6 why-texts by
   splicing its threat/plan/tool phrases into sentence frames, and lower-cases the first letter of
   any phrase that lands mid-sentence (after ": ", " — ", ", while ", ", but "). That is right for
   "Stand behind your camp" and wrong for "Sonic Wave" — 1,490 cells read ": sonic Wave re-cast",
   ", but certain Death picks", ": q stun, W reset bite". The phrase table lives in that file's
   closure, so the repair is here: NAMES lists every ability or champion-owned proper noun that
   opens one of those phrases (each checked against champ-data/_kits/*.json, Data Dragon 16.15.1),
   and the pass restores the capital only where the exact lower-cased form follows one of the four
   joins. Single words in NAMES are ones with no everyday sense ("Terrify", "Cocoon"); anything
   that could be an ordinary word ("Counter", "Blood", "Void") is listed with its second word so
   ", but certain fights" in hand-written text is never touched. Three entries carry the word that
   follows the name because the name alone is an everyday word ("Despair tank", "Rampage spam",
   "Consume chunks"). Idempotent by construction.

   STALE NAMES in the same phrase table: "Burnout" and "Twin Bite" (Shyvana pre-rework W and Q; the
   kit carries Inferno Aegis and Emberstrike). tools/jg-deslop.js already renames them in the base
   files; STALE does the same for the text that layer builds, so the app never shows a name Data
   Dragon does not know. "True Grit" is NOT stale — champ-data/_kits/graves.json E reads "gain two
   stacks of True Grit", so it is the kit's own name for the Quickdraw resist buff. It sits in NAMES
   (": true Grit" gets its capital back) and is never swapped out. */
(function () {
  var FIX = {
    "Vi": { "Viego": { "1": "Respect the Skirmish", "2": "Respect — Path Opposite", "3": "Respect — Path Opposite", "6": "Danger — Outscaled Late" } }
  };
  var NAMES = [
    "Above and Below", "Alpha Strike", "Arctic Assault", "Bandage Toss", "Battle Roar", "Black Shield",
    "Blazing Stampede", "Blood Frenzy", "Blood Hunt", "Bramble Smash", "Brushmaker", "Cataclysm",
    "Cease and Desist", "Certain Death", "Chomp", "Chronobreak", "Cocoon", "Collateral Damage",
    "Consume chunks", "Counter Strike", "Crescent Guard", "Crescent Strike", "Crushing Blow",
    "Curse of the Sad Mummy", "Daisy", "Dance of Arrows", "Dark Binding", "Deceive", "Defensive Ball Curl",
    "Demon Shade", "Denting Blows", "Despair tank", "Dragon Strike", "Dragon's Descent", "Drunken Rage",
    "Duskbringer", "E", "Elastic Slingshot", "Eternal Hunger", "Explosive Cask", "Frozen Domain",
    "Glacial Prison", "Grandmaster-at-Arms", "Highlander", "Impale", "Infinite Duress", "Lamb's Respite",
    "Lay Waste", "Let's Bounce", "Lilting Lullaby", "Meditate", "Moonfall", "Nature's Grasp",
    "Onslaught of Shadows", "Pale Cascade", "Parallel Convergence", "Paranoia", "Permafrost", "Phase Dive",
    "Pillar", "Powerball", "Primal Howl", "Purgatory", "Pyroclasm", "Q", "Quickdraw", "Ragnarok", "Rake",
    "Rampage spam", "Reaping Slash", "Requiem", "Seismic Bastion", "Shadow Assault", "Shattered Earth",
    "Sky Splitter", "Smoke Screen", "Soaring Slam", "Sonic Wave", "Soul Shackles", "Spectral Maw",
    "Spirit of Dread", "Stranglethorns", "Subjugate", "Supreme Display of Talent", "Terrashape", "Terrify",
    "Thrill of the Hunt", "Timewinder", "Triggerseed", "True Grit", "Twisted Advance", "Umbra Blades", "Umbral Trespass",
    "Undertow", "Unspeakable Horror", "Vicious Strikes", "Void Rush", "Void Spike", "Void Surge", "W",
    "Wall of Pain", "Watch Out", "Weaver's Wall", "Wind Becomes Lightning", "Wolf's Frenzy", "Wuju Style"
  ];
  // [what the headsup layer writes, what the kit calls it] — the Shyvana pre-rework names only
  // (either capital). Graves' "True Grit" is a real kit name and is handled by NAMES above.
  var STALE = [
    [/[Bb]urnout/g, "Inferno Aegis"],
    [/[Tt]win Bite/g, "Emberstrike"]
  ];
  // one regex: (join)(lower-cased name)(not followed by another letter, so "e" never matches "each")
  var esc = function (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); };
  var LOW = {}, alts = [];
  for (var n = 0; n < NAMES.length; n++) {
    var low = NAMES[n].charAt(0).toLowerCase() + NAMES[n].slice(1);
    LOW[low] = NAMES[n]; alts.push(esc(low));
  }
  var RE = new RegExp("(: |, while |, but | — )(" + alts.join("|") + ")(?![A-Za-z])", "g");
  function recap(s) {
    if (typeof s !== "string") return s;
    s = s.replace(RE, function (m, join, low) { return join + LOW[low]; });
    for (var i = 0; i < STALE.length; i++) s = s.replace(STALE[i][0], STALE[i][1]);
    return s;
  }
  function apply() {
    var DB = window.JG_DB; if (!DB) return;
    for (var you in FIX) {
      var en = DB[you]; if (!en) continue; var mm = FIX[you];
      for (var ek in mm) {
        var rep = en[ek]; if (!rep || !rep.stages) continue; var idxs = mm[ek];
        for (var k in idxs) { var i = +k; if (rep.stages[i] && rep.stages[i].adv !== idxs[k]) rep.stages[i].adv = idxs[k]; }
      }
    }
    for (var a in DB) {
      var row = DB[a]; if (!row) continue;
      for (var b in row) {
        var st = row[b] && row[b].stages; if (!st) continue;
        for (var j = 0; j < st.length; j++) {
          if (!st[j] || typeof st[j].why !== "string") continue;
          var fixed = recap(st[j].why);
          if (fixed !== st[j].why) st[j].why = fixed;
        }
      }
    }
  }
  apply();
  if (typeof setInterval === 'function') { var n = 0, t = setInterval(function () { apply(); if (++n >= 40) clearInterval(t); }, 250); }
  if (typeof document !== 'undefined' && document.addEventListener) document.addEventListener('DOMContentLoaded', apply);
})();

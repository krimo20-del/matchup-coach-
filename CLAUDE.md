# Project: MatchupCoach (LoL loading-screen coach)

## Default starting point for every new chat
Unless the user says otherwise, **Aatrox is the template champion.** When building, testing, or
demoing anything in `MatchupCoach.dc.html`, default to the Aatrox matchup/build as the example —
Aatrox has the richest data (full juggernaut loadout, full combo set in `CHAMPS.Aatrox`, and the
`AATROX_JUGG_LOADOUTS` build paths). Treat Aatrox's data shape as the canonical pattern other
champions should follow.

## Key files
- `MatchupCoach.dc.html` — the app (Design Component). Logic class at the bottom; `renderVals()`
  builds everything. Data scripts are loaded in `<helmet>` at the top.
- `champ-data/aatrox.js` / `aatrox.full.js` / `aatrox-jugg-loadouts.js` — Aatrox source data.
- `champ-data/_tank-fixes.js` — loaded LAST in `<helmet>` (after all `*.js`/`*.full.js`). Patches
  `diff`/`tone`/`tldr` on specific matchups to fix the generated data's blanket "tank is HARD into
  ranged/duelists" heuristic, which mis-rated lanes that are actually tank-FAVOURED. Validated vs
  community/stat-aggregator consensus. DONE: Malphite, Ornn, Tahm Kench, Cho'Gath, K'Sante, Maokai,
  Shen, Sion, Nautilus (Cho'Gath & K'Sante differentiated — were 68/70 identical, now 50/70).
  Poppy already correct (left as-is). Zac NOT done — it's a jungler with negligible top-lane data,
  no reliable consensus to validate against; revisit only if it gets real top representation.
  NOTE: some champ tables get rebuilt slightly after load in a non-deterministic, per-champ way, so
  a single apply can miss CHAMP_FULL or CHAMP_DATA for a given champ (seen on maokai-DATA and
  kled-FULL). Fixed by a short idempotent retry loop (setInterval, 250ms × 24) in both fix files —
  guarantees convergence on whichever table lags. Display reads CHAMP_FULL.
- `champ-data/_diver-fixes.js` — loaded LAST (after `_tank-fixes.js`). Same apply pattern, for the
  "Divers & Skirmishers" top group. The generated data gave every diver identical boilerplate
  (FAVOURED into nasus/chogath/kayle/kassadin/sejuani, HARD into heimer/jayce/quinn/teemo/cassio/
  lucian/ziggs) plus many near-identical pairs (Kled/Olaf 63/70, Pantheon/Renekton 63/70, etc.).
  Validated vs mobalytics/metabot consensus. DONE: Fiora, Jax, Camille, Irelia, Riven, Renekton,
  Yone, Olaf, Wukong, Yasuo, Pantheon, Kled, Tryndamere, Warwick, Gwen, Gragas, Vayne — ALL 17 done.
  All 13 near-identical generated pairs are eliminated and NO champ is on boilerplate FAV anymore;
  every champ has a distinct FAV/HARD distribution. Cross-champ pairs are kept consistent (Riven
  HARD↔Camille FAV, Wukong FAV↔Olaf HARD, Warwick FAV↔Fiora/Gwen/Irelia/Trynd HARD, Vayne FAV↔
  Olaf/Kled/Riven/Camille/Jax/Renekton HARD, etc.) — a consistency suite passes.
- `champ-data/_juggernaut-fixes.js` — loaded LAST (after `_diver-fixes.js`). Same apply + retry-loop
  pattern, for the "Juggernauts" top group (same boilerplate FAV + 9 near-identical pairs artifact).
  Validated vs mobalytics/metabot. DONE: ALL 12 juggernauts (Aatrox, Darius, Dr. Mundo, Garen,
  Illaoi, Mordekaiser, Nasus, Sett, Trundle, Urgot, Volibear, Yorick). 9 near-identical pairs
  eliminated; NO champ on boilerplate FAV. Genuinely-contested lanes set EVEN where two mobalytics
  pages disagree (Fiora/Illaoi, Morde/Illaoi, Warwick/Illaoi, Garen/Nasus, Riven/Garen). Cross-champ
  pairs kept consistent (Urgot HARD↔Kled FAV, Mundo FAV↔Volibear/Urgot/Jax, etc.). NOTE: cross-file
  overrides on the SAME cell race (both files' retry loops fight) — make the two files AGREE on
  shared cells rather than override (see riven→garen, kled→urgot done in the diver file directly).
- `champ-data/_mage-fixes.js` — loaded LAST (after `_juggernaut-fixes.js`). Same apply + retry-loop
  pattern, for the "Mages, Marksmen & Specialists" top group. Boilerplate FAV (ranged beats melee)
  was mostly directionally right but missing the dive/poke matchups that beat THEM; Kayle was badly
  wrong (2 FAV / 22 HARD for an S-tier scaling carry). DONE: Kayle, Teemo, Gangplank, Kennen. Source
  edits to avoid retry races: malphite→teemo HARD, malphite→kayle FAV, sion→gangplank FAV (tank
  file); renekton→teemo EVEN (diver). Contested set EVEN (Teemo/Renekton). TODO: Akali, Aurora, Gnar,
  Heimerdinger, Jayce, Quinn, Rumble, Singed, Swain, Vladimir (Akali/Quinn already have their kayle
  lane flipped HARD; Quinn its gangplank FAV). ALL 14 mages now done — entire top-lane roster (54
  champs across all 4 groups: Tanks, Divers, Juggernauts, Mages) re-validated vs community consensus,
  zero near-identical pairs remain anywhere, cross-group consistency suites pass.
- `champ-data/_xlane-diff-fixes.js` — loaded LAST (after `_mage-fixes.js`). Resolves the 61
  both-HARD / both-FAVOURED reverse-matchup contradictions the full-lane audit found ACROSS the
  four top groups (e.g. akali↔mordekaiser both HARD, garen↔teemo both FAVOURED). Method: where one
  side of a pair was already validated in a group fix file, this file aligns the OTHER side (zero
  cell overlap with the four group files — verified — so no retry-loop races); pairs untouched by
  any group file got both sides set. Verdicts validated vs lolalytics/mobalytics/counterstats;
  genuinely split lanes (Aurora/Morde 48.8–52.4% by site, Heimer/Olaf, Heimer/Vayne, Ambessa/Ziggs,
  Akali/Morde) set TRICKY/TRICKY. Researched calls: Aurora FAVOURED over Olaf (mobalytics lists her
  among his counters), TK 51.4% over Cassio top (cassio TRICKY), Morde > Teemo (R wins the realm
  1v1 — `_mage-fixes.js` teemo→mordekaiser cell edited in place from FAVOURED to TRICKY to agree
  with `_juggernaut-fixes.js`, the one cross-file conflict found). Same retry-loop pattern.
  NOTE: the June 2026 soft-asymmetry pass also string-edited 115 diff values IN PLACE across
  the four group fix files (tldrs kept; midpoint rule, e.g. EVEN/HARD→FAVOURED/TRICKY).
- `champ-data/_xlane-soft-fixes.js` — loaded after `_xlane-diff-fixes.js`. The remaining 923
  cells of the ~588-pair top-lane soft-asymmetry resolution (cells not owned by any group fix
  file). Sets diff+tone ONLY (tldrs untouched). Generated programmatically by midpoint rule.
- `champ-data/_lane-phase-fixes.js` — loaded after `_xlane-soft-fixes.js`. Resolves ALL 4,902
  top-lane phases[].side mirror contradictions at runtime from per-champ 7-stage lane power
  curves (CV) + a bias read LIVE from the pair's validated diff (so it composes with every diff
  layer). Only touches contradicting pair-stages; the page whose claim matches the verdict keeps
  its hand-written why, the other gets side+rating+why rewritten from per-champ SIG signature
  phrases. Neutral-vs-named stages left alone (legitimate nuance). Sides are written as display
  names (NAME map for Cho'Gath/K'Sante/etc) so the app's name-match coloring works.
- `champ-data/_mbs-fixes.js` — loaded LAST. Mid/Bot/Sup: 100 soft diff-asymmetry cells
  (midpoint rule) + hand-set caitlyn/nilah TRICKY/TRICKY with researched tldrs (she owns the
  lane, Nilah owns 2+ items) + all 100 phase contradictions (56 mid / 28 bot / 16 sup)
  hand-adjudicated in a static PH table (artillery mages own Diana/Ekko/Akali levels 1-2;
  Kassadin's Q shield blanks Asol early; Karma denies Alistar/Leona/Rell all lane; hypercarries
  own 2+ items; Swain>Brand and Liss>Swain at 6; Sylas steals Zed's 6; etc).
- `champ-data/_phase-accuracy-fixes.js` — loaded LAST of all. ACCURACY layer (the consistency
  passes left thousands of generated "Skill 5/10" cells flat where one side clearly owns the
  window — e.g. draven/tristana read even all lane). Holds per-champ 7-stage power curves for
  ALL FOUR lanes (CV.top/.mid/.bot/.sup) + a complete SIG table (~115 champs). Per pair-stage:
  delta = curve diff + stage-weighted live-diff bias (W=[1,1,1,1,.6,.6,0] — zero at 2+ items so
  hyperscalers keep late windows). Rules: both-neutral & |delta|>=0.45 → assign lead (ratings:
  6/10 edge <1.5, 7/10 clear <2.5, 8/10 stomp; "slight edge" why-phrasing for 6/10 cells);
  mixed named/neutral → neutral page ADOPTS the hand-named claim (hand data > weak model)
  unless model strongly opposite (>=2.25 → flip both). DIFF upgrade: EVEN/EVEN pairs with
  lane-stage avg delta >=1.15 AND winner not hard-outscaled at 2+ items (late delta > -1) →
  FAVOURED/TRICKY (draven/trist, etc; tldrs untouched; mirrored onto CHAMP_DATA cards). Always writes BOTH pages → stays
  mirror-consistent with every other layer (re-verified 0/0 after this layer). After the
  June 2026 "show the spikes" pass, ~80% of all 31,600 pair-stages show a named lead (was
  ~45%); remaining Skill cells are genuine ties; 673 mixed cells involve flex champs with no
  curve entry — add a CV entry to fix one. Curves are the
  tuning surface: if a user reports a mis-rated window, adjust CV values, don't hand-edit cells.
  AUDIT STATE (June 2026, post-fix): ALL FOUR LANES — 0 diff inconsistencies (allowed mirror
  pairs: FAV/HARD, FAV/TRICKY, EVEN/EVEN, EVEN/TRICKY, TRICKY/TRICKY, MIRROR/MIRROR), 0 hard
  phase-side contradictions. Lane phases use {label, side, rating, why}; side is an absolute
  display name or "Skill"; app default for unrecognized side strings is ENEMY-red (see DC
  ~4577-4600). First-item label parsing (jungle stage-5) does NOT apply to lanes.
- `champ-data/jungle-intel.js` — enemy-jungle tracking cheat-sheet data (`window.JUNGLE_INTEL`,
  `window.JUNGLE_GROUPS`), powering the "Enemy Jungle — Tracking Cheat Sheet" section.
- `champ-data/jg/_jg-headsup-fixes.js` — loaded LAST (after all jg/*.js). The parsed PDFs gave
  every champ self-favored boilerplate at Levels 1-3 AND at the Level 6 Breakpoint (1,599 + 406
  contradictions — e.g. Yi AND Naafiri both "Favored"/"Domination" vs each other). This file
  recomputes stages 0-2 AND stage 4 (adv + why) of EVERY JG_DB matchup from ONE shared duel model:
  [L1,L2,L3] per champ in `S`, level-6 ult-duel scores in `S6`, + pairwise modifiers (Rammus +2.5
  vs AD-auto kits all stages, Jax +0.75 all stages, Lillia +1.5 vs dash-less melee PRE-6 only —
  Ragnarok/Stormbringer answer the kite). A-vs-B and B-vs-A are mirror-consistent by construction.
  Labels are tuned to the app's advTone() regexes: stages 0-2 "{X} Dominant/Favored" (green),
  "Even Skirmish" (amber), "Respect {Y}" / "Danger — Avoid {Y}" (red); stage 4 keeps ult-name
  flavor — "{Ult} Domination/Favored" (green), "Even Ult Window" (amber), "Respect {Y}'s R" /
  "Danger — {Y}'s R" (red, short names via SHORT map; never put favored/peak/spike/absolute words
  in enemy-favored labels or they render green — e.g. Nunu's "Absolute Zero" must not appear in a
  red label). Why-texts built from per-champ phrase tables (P: plan/threat/tool for early; U:
  ult/plan/threat/tool for level 6) + owner name → every cell unique. Stage 3 (Levels 4-5,
  amber boilerplate, no contradictions), stage 5 (First Item — the app PARSES the item name out
  of that adv label via jStages[5].adv.replace(/Spike$/), do NOT relabel it), and tldr are left
  untouched; the single Evelynn/Kha'Zix stage-6 both-green pair is relabeled "Hyper-Assassin
  Mirror" (amber, both sides). Verified: 0 both-green, 0 tone-mirror mismatches, 0 non-mirror
  duplicate why-texts, 0 both-FAVOURED overall verdicts. Same idempotent retry-loop pattern
  (setInterval 250ms × 24).
- `champ-data/jg/*.js` — jungle-vs-jungle matchup databases (`window.JG_DB[champ][enemy]`), parsed
  from the uploaded "Jungle Macro Matchup Database" PDFs (Lee Sin, Kindred, Kha'Zix, Kayn, Graves,
  Evelynn, Elise, Ekko, Diana, Bel'Veth — 49 reports each). These power the Jungle Coach page
  (`isJgDemo` branch in the template; `JV`/`jv` vals in `renderVals()`). Junglers without a DB are
  greyed out ("SOON") in the jungle picker.

## Conventions
- Headers use Chakra Petch; body uses Manrope. Dark UI (#0d0f16 / #11131c cards).
- Ability colour code: Q #46c6f5 · W #9b8cff · E #e8b84b · R #ff5d6c · AA/summoner #c7ccdb.
- No paywall / "Elite Macro" upsell content — that was removed.

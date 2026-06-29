# RESUME — favour-timeline label/colour fixes (continue in a new chat)

Goal: make every matchup's red/green/amber favour label match what its `why` text says, by
setting `phase.side` in a final override layer **`champ-data/_label-text-fixes.js`** (loads LAST,
persistent re-apply at 400ms so it beats the curve-based fix layers + the late table rebuild).

## DONE & LIVE (matchupcoach.gg, beta 1.1+)
- **Top lane** — all 71 champs, LLM-verified.
- **Mid lane** — all 46 champs, LLM-verified.
- **Bot (ADC)** — all 30 champs, LLM-verified, patched + runtime-verified (store now in `_label-corrections.json`).
- **Support** — all 36 champs, LLM-verified, patched + runtime-verified.
- Scroll-to-top fix (separate, already live).
- NOTE: bot+sup compiled but NOT YET DEPLOYED as of this writing — pending the jungle pass so all
  three ship in one `beta 1.3` release (bump MC_VERSION line 49 + footer line ~1374).

Current corrections are stored in **`_label-corrections.json`** (repo root) and compiled into
`champ-data/_label-text-fixes.js`. The helmet already loads it (after `_phase-accuracy-fixes.js`).

## REMAINING
- **Jungle** — 49 junglers (DIFFERENT structure — see below). IN PROGRESS: LLM why-read pass
  done per jungler (owner S/E/K per stage, results in `<scratch>/result/jg/`); corrector
  `_jg_gen_fixes.js` targets ONLY stage 3 (Levels 4-5) + stage 6 (2+ Items) — the only stages no
  other jg fix layer owns (headsup owns 0-2,4 via i<3 loop + stage4; stage5 item-parse protected;
  Evelynn/Kha'Zix stage-6 pair is headsup's, skipped). Output → `champ-data/jg/_jg-label-text-fixes.js`
  (own 250ms×40 retry loop), wire into the jg helmet AFTER `_jg-headsup-fixes.js`. Each adv string
  is advTone-verified with the page champ name to dodge green-word / name-substring traps.

## HOW TO CONTINUE (new session)

### 1. Re-extract post-fix data (scratchpad is per-session; just regenerate)
```
node _extract_phases.js  <SCRATCH>/audit-lanes      # writes top/mid/bot/sup/<champ>.json
node _extract_jg.js      <SCRATCH>/audit-lanes/jg   # writes <jungler>.json
```
(`<SCRATCH>` = the new session's scratchpad dir, any writable temp path.)

### 2. Run the correction workflow per lane (one at a time — avoids rate limits)
Use the lane-correction workflow (re-create it; logic below). For each lane it reads
`<dir>/<champ>.json` and an agent returns, per matchup, the 7 corrected `sides`
(champ display name = GREEN / enemy display name = RED / "Skill" = AMBER), matching the `why`.
Model: sonnet. Args: `{dir, lane, champs:[...]}`.

- **bot champs:** aphelios, ashe, caitlyn, corki, draven, ezreal, heimerdinger, jhin, jinx, kaisa, kalista, karthus, kogmaw, lucian, missfortune, nilah, samira, senna, seraphine, sivir, smolder, swain, tristana, twitch, varus, vayne, veigar, xayah, zeri, ziggs
- **sup champs:** alistar, bard, blitzcrank, brand, braum, galio, hwei, janna, karma, leona, lulu, lux, maokai, milio, morgana, nami, nautilus, neeko, poppy, pyke, rakan, rell, renata, senna, seraphine, sona, soraka, swain, tahmkench, taric, thresh, velkoz, xerath, yuumi, zilean, zyra

### 3. Patch each lane's result into the fix file
```
node _gen_label_fixes.js <taskOutputPath> <lane>   # lane = bot | sup
```
This merges into `_label-corrections.json` and regenerates `champ-data/_label-text-fixes.js`.
(lane key: bot -> `<champ>_bot`, sup -> `<champ>_sup`. Top is plain `<champ>`, mid is `<champ>_mid`.)

### 4. Jungle is different (do last)
JG_DB stages use an **`adv`** label coloured by an `advTone` regex (green if it contains the
champ's name or dominant/favored/peak/spike/etc; red if danger/avoid/respect/survive/etc; amber
else), NOT a `side` field. A jungle correction must fix the `adv` wording to match the `why`, and
patch into the jg headsup fix layer (`champ-data/jg/_jg-headsup-fixes.js`) — needs its own pass.
- jungle list: amumu, belveth, brand, briar, diana, ekko, elise, evelynn, fiddlesticks, gragas,
  graves, hecarim, ivern, jarvaniv, jax, karthus, kayn, khazix, kindred, leesin, lillia, maokai,
  masteryi, morgana, naafiri, nidalee, nocturne, nunuwillump, olaf, qiyana, rammus, reksai, rengar,
  sejuani, shaco, shyvana, skarner, taliyah, talon, trundle, udyr, vi, viego, volibear, warwick,
  wukong, xinzhao, zac, zyra

### 5. Verify + deploy (each lane)
- Reload preview, confirm `CHAMP_FULL["<champ>_<lane>"][enemy].phases[i].side` holds the corrected
  value at ~13s (persistent re-apply).
- Commit `champ-data/_label-text-fixes.js` (+ bump `MC_VERSION` in MatchupCoach.dc.html), push `main`
  → auto-deploys to matchupcoach.gg.

## Notes / gotchas
- `ambessa.full.js` and `shen.full.js` were corrupted earlier; restored from git. Don't re-break.
- Full audit report (2,063 flags) saved at `Desktop/matchup-audit-report.json`.
- Temp scripts in repo root (untracked): `_extract_phases.js`, `_extract_jg.js`, `_gen_label_fixes.js`,
  `_extend_corrections.js`, `_label-corrections.json`. Keep them — they ARE the pipeline.
- Spend cap: the CA$ usage-credit limit (not session/weekly) is what blocks agent workflows.

# RESUME — bespoke Reddit-validated top-lane content

## ✅ ALL 18 IN-POOL DONE & PUSHED (champions #57–#74, live on matchupcoach.gg)
Aatrox, Darius, Dr. Mundo, Garen, Illaoi, Sett, Urgot, Volibear, Yorick (9 juggernauts),
Tryndamere, Vayne, Warwick, Wukong, Yasuo, Yone (6 divers), Zac, Vladimir, Ziggs.
→ **18 of 18** in-pool missing champs done. Every top champ now has bespoke content EXCEPT
the 3 pool-extension champs below. Verified: content win[] == store, 0 mismatch (8092+ cells).

## ONLY REMAINING: 3 pool-extension champs (Locke, Zaahen, Master Yi)
NOT in the 68-opponent pool and have NO reverse content, so no cross-locks exist. Need the
opponent pool extended + fresh win[] for every matchup (or skip — they're new/niche).

## (historical note) DONE & PUSHED (champions #57–#69)
Aatrox, Darius, Dr. Mundo, Garen, Illaoi, Sett, Urgot, Volibear, Yorick (all 9 juggernauts),
Tryndamere, Vayne, Warwick, Wukong.  → 13 of 18 (rest completed after the usage-limit reset).
Each: `champ-data/content/<champ>.js` + a `<script>` line in the DC `<helmet>` (before
`_reddit-validated-fixes.js`, alphabetical) + one commit "`<Champ>: 68 bespoke top-lane matchups (champion #NN)`".

## REMAINING (5 in-pool + 3 pool-extension)
- **In-pool (normal pipeline):** Yasuo (#70, IN PROGRESS — see below), Yone (#71), Zac (#72),
  Vladimir (#73), Ziggs (#74). All have lowercase store keys (normal).
- **Pool-extension (harder, do last):** Locke, Zaahen, Master Yi — NOT in the 68-opponent pool
  and have NO reverse content, so no cross-locks exist. Need the opponent pool extended + fresh
  win[] for every matchup (or skip).

## PIPELINE (per champ) — all scripts in repo root
1. **WR:** 6 background agents, ~12 opponents each (opponent list = all 72 top minus the champ +
   locke/zaahen/masteryi). Extraction rule: largest-games matchup row EXCLUDING the constant
   site-wide overall row. Assemble into `_wr_<champ>.json` = `{opp:{wr,games}}`.
2. `node _bespoke_prep.js <champ> "<Display>" <SCRATCH>` → job.json (store-locked lockWin) + groups.json.
   (prep/assemble fall back to a display-cased store key; only Wukong needed that.)
3. `node _bespoke_genwf.js <champ> <SCRATCH> <SCRIPTS>` → writes the authoring workflow script.
4. Run that Workflow → 10 agents write `<SCRATCH>/bespoke/<champ>/out/<opp>.json`.
5. `node _bespoke_assemble.js <champ> <SCRATCH>/bespoke/<champ>` → forces win[]=store, validates,
   writes `champ-data/content/<champ>.js`. Reads the "RISK: ..." line — for each `opp#i` listed,
   the agent drifted that cell; fix that out file's whys[i] (and any contradicting prose) to the
   store colour, then re-assemble. Group-tail files sometimes truncate (bad JSON) — delete & one
   agent re-authors them with a read-back verify.
6. Add the `<script src="./champ-data/content/<champ>.js">` line + commit + push.

SCRATCH = the session scratchpad dir. SCRIPTS = `<session>/workflows/scripts`.

## YASUO (#70) — resume point
- WR: **56 of 68 collected** in `_wr_yasuo_partial.json`. MISSING batch 3 (12): kassadin, kayle,
  kennen, kled, ksante, lillia, lucian, malphite, maokai, mel, mordekaiser, nasus.
  → re-run just those 12 (one WR agent), merge into `_wr_yasuo.json`, then prep→genwf→author→assemble.

## Chart↔content invariant (the whole point)
Every content `win[]` cell is forced to the verified favour timeline in `_label-corrections.json`
(the array that colours the level chart via `_label-text-fixes.js`), and whys/prose are authored/
reconciled to match each cell's colour. Verified per champ: content win[] == store, 0 mismatch.
EXCEPTION: **Wukong** — store key is mis-cased "Wukong" so `_label-text-fixes.js` is a no-op on its
page; its win[] is sourced from CROSS-LOCKS (opponent reverse content via `_bespoke_crosslock.js`)
instead, keeping mirror-consistency with opponent pages.

## ✅ 100% COMPLETE (2026-07)
All 71 top champs have bespoke content (72 files, #1-#77). The 3 pool-extension champs are done:
Zaahen #75 + Master Yi #76 (were in the store) and Locke #77 (chart-locked to its generated timeline
via _bespoke_prep_locke.js + _locke_chart.json). Verified: 21 new champs = 0 chart<->content
mismatch. Nothing left in top lane.

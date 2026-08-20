# Matchup audit — pick up here

Paste this whole file into a new Claude Code session. Everything needed is in the repo.

**Repo:** `C:\Users\Kris\OneDrive\CLAUDE\New folder (2)` (quote it — spaces and parens)
**Last updated:** 2026-08-20

---

## State

**TOP LANE IS COMPLETE.** Never trust a number in this file — run the count. The progress
table in earlier versions was wrong every single time it was checked.

| Lane | Audited | Champions | Runner |
|---|---|---|---|
| **Top** | **5,112 / 5,112** | **72 / 72** | works |
| Mid | 0 / 2,070 | 0 / 46 | works (change lane args) |
| Support | 0 / 1,260 | 0 / 36 | works (change lane args) |
| Bot | 0 / 870 | 0 / 30 | works (change lane args) |
| Jungle | 0 / 2,499 | 0 / 50 | **does not exist** — `JG_DB` in `champ-data/jg/` is a different shape |

**57 ship commits** pushed to `origin/main`.
Mirror conflicts **0** (were 13,784 across 1,808 pairs).
Cross-layer chart contradictions **0** (were 302).

To count it yourself, run `node tools/coverage-report.js`.

---

## COMMITTED — 2026-08-20

All 5,394 working-tree changes are now in commit `1f2c9e9` ("Top lane audit: publish
5,112 verified matchups"). Nothing is staged and nothing tracked is dirty.

**Not pushed.** `origin/main` is still at `62221f9`. The push is the go-live.

---

## How publishing actually works — the old step 3 was wrong

Earlier versions of this file said "run `_gen_seo_pages.js`, until then none of this is
visible." That is not how the deploy works, and acting on it wastes a step.

`matchup/` is **gitignored** (~9,600 files / 115MB). `netlify.toml` runs
`node _gen_seo_pages.js` as its **build command**, so Netlify regenerates all 12,095 pages
from the committed `champ-data` on every deploy. Running the script locally publishes
nothing — the output is ignored. It is a **pre-flight check** (if it throws, the deploy
fails and the old site stays up), plus it refreshes `sitemap.xml`, which *is* committed.

So the only thing that actually goes live is **`git push`**.

Verified 2026-08-20: generator runs clean in ~18s, 12,095 pages, 12,096 sitemap urls.

**Remaining step: `git push origin main`.** Then watch the Netlify deploy — if the build
command fails the previous site stays live, so a failure is safe but silent.

---

## `DATA_MODIFIED` — bump it whenever champ-data ships

`_gen_seo_pages.js:41` sets `DATA_MODIFIED`, which feeds **both** the `<lastmod>` on all
12,096 sitemap urls **and** `dateModified` in every page's Article schema. It is
deliberately not wired to the build date (a lastmod that moves on every rebuild is a false
freshness signal).

It was still `2026-07-27` after the entire top-lane audit. Left that way, all 12,095 pages
would have told crawlers they had not changed since July, and the audited text would have
sat unread. Now `2026-08-20`.

**Bump it in the same commit as any champ-data ship.** `LIVE_PATCH` is separate — bump that
only when content has actually been reviewed against a new patch, which this audit did not do.

---

## Tools (all deterministic, no model)

| Tool | Does |
|---|---|
| `apply-proposals.js` | **The only writer** for matchup data. `<lane> [--write] [--champ X]` |
| `regression-check.js` | **The ship gate.** Baseline-relative: fails only on damage THIS audit caused |
| `build-briefs.js` | One prepared file per matchup — the 3× throughput win. `<lane> --champ X` |
| `mirror-check.js` / `mirror-fix.js` | Cross-page agreement. Lane-level, never per champion |
| `normalize-chart-sides.js` | Chart tokens → canonical champion name or "Skill" |
| `resolve-placeholder-sides.js` | "Depends"/"Pending" → the content layer's real value |
| `fix-ability-names.js` | Verified global renames; aborts if Riot's data disagrees |
| `find-fake-abilities.js` | Suspect list of fabricated ability names (noisy — a list, not a verdict) |
| `phase-check.js` | Phase-count damage vs baseline |
| `validate-content.js` | Structure. **INFORMATION, NOT A GATE** — see below |
| `coverage-report.js` / `watchdog.js` / `champion-log.js` | Reporting |

---

## Resume the run (mid lane is next)

```
Workflow({
  scriptPath: "C:\\Users\\Kris\\OneDrive\\CLAUDE\\New folder (2)\\tools\\audit-run\\runner.js",
  args: { lane: "mid", fullDir: "champ-data/mid", contentDir: "champ-data/content/mid",
          label: "Mid Lane", agents: 6, maxRetry: 0,
          champions: [ ...list from coverage-report... ] }
})
```

Then `node tools/watchdog.js --stall 15` in the background.

**6 agents is the right number.** Measured: 3 agents = 46–170/hr; 6 agents + briefs =
**215–326/hr**, 15–20 min per champion. More than 6 does not help — per-matchup cost
dominates, and smaller slices widen the straggler tail.

Lane args: bot → `champ-data/bot` + `champ-data/content/bot`; sup → `.../sup`.

---

## Hard rules

- **Never `git add -A`.** Stage exact file paths. `StudentLearningHub.html` is the user's
  tutoring work and **must never reach matchupcoach.gg**. Leave `brand/`, `imgx/`,
  `_bundle_assets/` untracked.
- **`publish = "."` ships every tracked root file.** Anything readable at the repo root is
  readable at `matchupcoach.gg/<name>` unless `netlify.toml` 404s it. `_*`, `RESUME-*`,
  `PICKUP-*`, `CLAUDE.md`, `server.js` and friends are covered. **Add a rule before adding
  a new root-level internal doc** — this file itself was publicly served until 2026-08-20.
- **Never touch payment code** — `server.js`, Stripe, pricing, plans.
- **Never `git checkout` a champ-data file to "repair" it.** It discards every applied edit
  in that file. An agent came one command from wiping ~70 matchups this way and correctly
  escalated instead.
- **Reddit is blocked by policy.** League Wiki is primary for mechanics.
- **±10% length band** on prose. Enum fields (`win[N]`, `phases[N].side/rating`, `diff`,
  `tone`) are **exempt** — `apply-proposals.js:78`. Agents that believe otherwise silently
  skip every level-chart fix.
- **No elo tiers.** The applier drops the WHOLE edit, not just the phrase — 83 of 1,381 jax
  edits died this way. Write the behaviour, not the rank.
- **Never stop on a question.** Log it, move on. Never guess.
- **Win rates are out of scope.** Do not scrape lolalytics, do not add a rank toggle, do not
  "fix" the packet vs `MC_WR_TABLES` discrepancy — they are different rank slices, not a bug.

---

## The gate rule — learned five times the hard way

**Every ship gate must diff against the committed baseline. Never assert an absolute
invariant.** This repo carries inherited damage no audit will ever clean, and five separate
gates failed *clean* champions over it:

- `phases != 7` (aatrox: singed/teemo/lucian — identical at baseline)
- `spikes != 4` (135 matchups across 39 files)
- missing fields (singed/malphite — the QA agent wrote "proven PRE-EXISTING" and failed it anyway)
- missing `masteryi` entries (71 of 72 owner files — an absolute check fails everyone forever)
- `validate-content.js` exit code (blocked mel over 3 inherited spikes)

`validate-content.js` is **information**. `regression-check.js` is **the gate**.

---

## Runner bugs fixed — do not reintroduce

All are commented in `runner.js`; this is the index.

1. **Unlabelled `continue`** targeted the inner `while`, which never increments `attempt`.
   One session-limit failure became **999 dead agents** and killed the run. The loop is
   labelled `CHAMPION:` — keep it that way.
2. **A dead planner read as "champion finished"** — `(plan && plan.enemies) || []`. ~34
   champions were skipped in silence. Null is now retried, then reported loudly.
3. **Agents computing their own slices** — each ran coverage-report itself, got a different
   N, and overwrote each other's files. One planner computes once and the script hands out
   explicit disjoint lists.
4. **`git add champ-data`** swept unrelated champions into commits — the commit labelled
   "akali" contains aatrox and akshan. Stage exact paths.
5. **Front-loading** — agents bulk-read ~30 kits before writing anything, so a kill lost all
   of it and the run looked hung for 13 minutes. Briefs plus an explicit prohibition fixed it.
6. **Chart rows edited in one layer only** — 101 contradictions shipped before anything
   checked. Rows must be proposed in PAIRS (`phases[N].side` + `win[N]`); regression-check
   now fails a champion that breaks the pairing.
7. **`watchdog.js` hardcoded a dead session id**, so "last write" measured a folder nothing
   writes to and it reported "agents are hung" while agents wrote every 20 seconds. Treat its
   alarms as "go look", never as findings.
8. **Agent budget guard** — `PER_CHAMP_BUDGET` / `GLOBAL_BUDGET` stop a runaway before the
   platform's 1000-agent cap kills the run. A prompt cannot stop a loop; a counter can.

---

## Known state

- **7 champions still fail `validate-content`** on `spikes[] == 3` — gwen, jayce, kassadin,
  malphite, mel, nasus, pantheon, all against locke/masteryi/zaahen. `regression-check`
  confirms every one predates the audit. Do not block shipping on them.
- **`apply-proposals.js` supports `"before": null`** = create-only (added 2026-08-10). It
  refuses to overwrite anything that exists, so it can add a missing `spikes[3]` but cannot
  clobber. Fill only with verified content — a fabricated 4th spike is worse than a gap,
  because the gap is visible and the invention is not.
- **"Repeating Dashes" — 1,211 occurrences across 165 files, still wrong.** Ambessa has no
  ability by that name; her dash is Drakehound's Step (P). Deliberately NOT auto-renamed:
  the surrounding sentences claim a cooldown the passive does not have, so they need
  rewriting, not renaming. `tools/fix-ability-names.js` reports them and refuses to touch them.
- Some kit flags are tooltip-parsing false positives (Rumble's Scrap Shield tagged
  knockup/terrain; grounding on Illaoi, Poppy, Maokai). Agents correctly refuse to build
  advice on a flag that contradicts Riot's own description.

---

## Quality — the honest assessment

**Every champion graded `slightly-below` the approved benchmark.** Not one reached
`matches-benchmark` after the fast configuration landed. The mechanical corrections are real
— fabricated ability names killed, real cooldowns used, decisive interactions stated — but
prose in fields the audit did not directly touch is still heavily templated.

Concrete, from Ziggs' full 71-matchup QA (not a sample):

- `tradeGood`, `tradeBad` and `ahead` are **identical in 70 of 71** matchups
- only **45 distinct `tldr`s across 71** matchups
- **83 phase entries** carry owner-positive template text on rows the ENEMY wins — e.g.
  warwick row 0 is `side=Warwick 3/10` with a why claiming "out-range every melee tool"
- **29 matchups** name Luden's/Liandry's in content while the full layer builds Blackfire Torch
- Volibear's ultimate **Stormbringer is never named anywhere** in that entry
- K'Sante's Ntofo Strikes stack count contradicts itself between the two layers

**Open decision: is a second content pass warranted before or after go-live?** The audit
fixed facts; it did not de-templatise prose.

---

## Open questions for the user

1. **`phases[].rating` scale direction.** Agents hit this constantly and refuse to guess.
   Gnar vs Trundle is `FAV` at 55% but rated `7.5/10 Tricky`. Is the rating "how hard for the
   owner" or "how well the owner does"? The same ambiguity sits on dozens of pages.
2. **Chart authority.** When the packet's `levelChart`, the already-audited mirror, and the
   page's own prose disagree — which wins? Agents left dozens untouched pending a rule.
3. **`tone` colour mapping.** Several pages now carry a colour that disagrees with their
   corrected difficulty. Confirm the hex-to-band mapping (e.g. FAV=#3ddc97, EVEN=#e8b84b,
   TRICKY=#ff8b3d, HARD=#ff5d6c) and it can be fixed mechanically.
4. **Gendered pronouns.** Karma, Kayle, Lillia and others read "he/his" throughout their full
   layers. Needs a champion-level sweep — one-at-a-time edits cannot absorb it inside the
   length band.
5. **`Locke` data.** Six fields call him "a 125-range mana champ", but his auto range is not
   in the kit and his Q is 950 — the whole range-war framing may rest on a wrong number. His
   Q is also called "Ritual Nails" where Riot's text says "Soul Nails".
6. **Matchups with no full-layer entry at all** (vs masteryi, systemically — 71 of 72 files).
   Should entries be authored field-by-field with `before: null`, or generated by a tool?

---

## Pace (measured, not estimated)

6 agents + briefs: **15–20 minutes per champion**, 215–326 matchups/hour.
Remaining ~4,200 matchups across mid/bot/support ≈ **20–25 hours of run time**, plus jungle
once a runner exists for it. Bounded by the spend limit, not the clock.

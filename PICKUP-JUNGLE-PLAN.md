# Jungle audit — the plan

Written 2026-09-01, after top/mid/bot finished and support started. Covered by the
`PICKUP-*` 404 rule in `netlify.toml`, so this file is not served publicly.

**Read this before writing a single jungle proposal.** Jungle is not "the next lane". The
data has a different shape, the tooling does not exist, and the content is already live.

---

## 1. What jungle actually is

**Not missing. Already published.** All 50 junglers have data, 2,499 matchup entries, and
`_gen_seo_pages.js` builds **2,450 jungle guide pages + 50 champion hubs** that are live,
indexed, and carrying FAQ schema right now. `matchup/jungle/lee-sin-vs-graves/` returns 200.

So this is not a content gap to fill. It is 2,450 live pages of unaudited content to correct.
That makes it higher priority than "0 / 2,499" in the coverage report makes it look.

### The shape (nothing like a lane)

```
JG_DB["Lee Sin"]["Graves"] = {
  tldr,
  stages: [ { stage, adv, why } × 7 ],
  start, scuttle, topObj, invade, watch, weak, split, picks, win
}
```

Seven **windows**, not seven levels:

| # | stage |
|---|---|
| 0 | Level 1 Clear |
| 1 | Level 2 Skirmish |
| 2 | Level 3 Route |
| 3 | Levels 4-5 Macro |
| 4 | Level 6 Breakpoint |
| 5 | First Item Spike |
| 6 | 2+ Items Scaling |

The nine flat fields are jungle concepts with no lane equivalent: `start` (opening route),
`scuttle` (crab contest), `topObj` (Grubs/Herald), `invade`, `watch` (what kills you),
`weak` (playing from behind), `split`, `picks` (pick/teamfight role), `win` (win condition).

Owners are **display names with spaces and punctuation** — `"Lee Sin"`, `"Kha'Zix"`,
`"Nunu & Willump"` — not the slug ownerKeys every lane tool expects.

### Two structural differences that change everything

**`adv` is free text, not an enum.** In a lane, `phases[N].side` is a champion name or
`"Skill"` — countable, mirror-checkable, machine-comparable. Here `adv` holds **hundreds of
distinct strings** mixing four different kinds of thing:

- verdicts — `"Lee Sin Favored"`, `"Bel'Veth Dominant"`, `"Even Skirmish"`
- item spikes — `"Kraken Slayer Spike"`, `"Sunfire Aegis / Liandry's"`
- ability names — `"Curse of the Sad Mummy"`, `"Crowstorm"`, `"Requiem"`
- instructions — `"Danger — Avoid Locke"`, `"Respect Briar Late — End Early"`

Every mirror and coherence rule the lane tools rely on reads `side`. None of them work here
until this field has a decided meaning. **This is decision #1 below.**

**There is no win-rate data at all.** No `MC_REAL_GAMES`, no packets, no `levelChart`. The
single largest source of unresolved lane questions — "the chart says X but the win rate says
Y" — simply does not exist in jungle. That is a genuine simplification: the kit and the
clear are the only authorities, so agents have less to refuse to guess about.

---

## 2. The content is templated and partly invented

Measured across all 2,499 entries (42,483 text fields):

**Uniqueness per field** — distinct values / total:

| field | unique | reading |
|---|---|---|
| `tldr`, `invade`, `stages[].why` | 100% | genuinely per-matchup |
| `start` | 98% | per-matchup |
| `topObj` | 87% | mostly per-matchup |
| `weak` | 81% | mostly |
| `scuttle` | 77% | drifting toward template |
| `win` | 15% | **champion-level** |
| `watch` | 14% | **champion-level** |
| `split` | 4% | **99 distinct across 2,499** |
| `picks` | 4% | **99 distinct across 2,499** |

`split` and `picks` carry ~2 variants per champion reused across all 50 enemies. Same
question as `tradeBad` in the lanes (open question #2 in `PICKUP-DECISIONS.md`): correct by
design, or should be matchup-aware? Decide once — it is 5,000 entries either way.

**Invented vocabulary — 94% of entries (2,354 / 2,499) contain at least one phrase no
League player uses:**

| count | phrase |
|---|---|
| 7,724 | "quadrant" (for a side of the jungle) |
| 3,087 | "the exact split-second" |
| 2,768 | "block" (as in "camp block") |
| 2,450 | **"camp node"** |
| 2,450 | **"your model"** |
| 1,698 | "clear track" |
| 1,470 | "tracking path" |
| 1,323 | "high-velocity" |
| 490 | "horizontal clear" |
| 196 each | "resource parameters", "landing profiles" |

"camp node" and "your model" each appear **exactly 2,450 times — once per non-mirror entry**.
That is not prose with a tic; that is a template with a slot. Real players say *topside /
botside jungle*, *camp*, *you*, *clear*, *pathing*.

The underlying facts sampled so far are largely **right** (Lee Sin's W lifesteal, Tempest
revealing, Void Grubs timing) — this is a rewriting problem, not a fabrication problem, with
one exception: the fake-technical phrasing sometimes implies mechanics that do not exist
("zero resource parameters to execute an escape"). Treat facts as suspect where the jargon is
thickest.

---

## 3. THE BLOCKER: none of the tooling supports jungle

This is why jungle has never run, and it is a build task, not a config change. Mentions of
jungle/`JG_DB` per tool:

| tool | jungle support | consequence |
|---|---|---|
| `coverage-report.js` | **YES** (already works) | the 2,499 count is real |
| `apply-proposals.js` | **NO** | **there is no writer. Nothing can edit JG_DB.** |
| `regression-check.js` | **NO** | no ship gate |
| `build-briefs.js` | **NO** | no briefs — loses the measured 3× throughput |
| `validate-content.js` | **NO** | no structure check |
| `mirror-check` / `mirror-fix` | **NO** | no cross-page agreement check |
| `matchup-lint.js` | 1 mention | effectively no |

`apply-proposals.js` is the hard stop. Its `LANES` table has `top / mid / bot / support` and
nothing else, and its writable-path regexes (`WRITABLE_FULL`, `WRITABLE_CONTENT`) describe
lane fields — `phases[N].why`, `spikes[N].text` — none of which exist in JG_DB. **The rule
that only `apply-proposals.js` writes matchup data means jungle currently cannot be audited
at all.**

### Build list, in order

1. **`apply-proposals.js` — jungle lane.** New `LANES.jungle` entry pointing at
   `champ-data/jg`, a display-name↔file resolver (`"Nunu & Willump"` → `nunu.js`), and a
   writable-path regex for the real schema:
   `tldr | stages[N].(adv|why) | start | scuttle | topObj | invade | watch | weak | split | picks | win`.
   Keep every existing protection: exact-`before` matching, the ±10% band on prose, ELO /
   NEGATIVE / FILLER filters, create-mode.
   **Carry the chart-group fix across:** `stages[N].adv` and `stages[N].why` must be ONE
   atomic unit, and a `why` paired with an `adv` change must be exempt from the length band.
   That bug (fixed in `41e6667a`) produced every coherence regression in mid and bot; the
   same split would recur here verbatim.
2. **`regression-check.js` — jungle.** Baseline-relative, per the gate rule that has been
   learned five times. Its coherence check is `adv` moved / `why` unchanged — the jungle
   analogue of the lane rule, and it only becomes meaningful once decision #1 fixes what
   `adv` means.
3. **`build-briefs.js` — jungle.** One prepared file per matchup: both kits, both clear
   profiles, current `JG_DB` entry. Measured at 3× throughput in the lanes; 2,499 matchups
   is exactly where that pays.
4. **`validate-content.js` — jungle.** Structure only: 7 stages present, all 9 flat fields
   non-empty, `adv` drawn from the decided vocabulary. Information, never a gate.
5. **Runner args.** Once 1–3 exist, the existing runner should work unchanged — its
   `champ.replace(/_(mid|bot|sup)$/,'')` is a no-op on display names, and the planner query
   needs a jungle variant that reads `JG_DB` instead of `MC_REAL_GAMES`.

Do **not** start jungle proposals before item 1 exists. Agents would write proposal files
that nothing can apply — which is precisely how mid stranded work three separate times.

---

## 4. The audit points, in jungle terms

The lane audit asks about lane difficulty, power spikes, trading patterns, wave management.
None of that is the jungle. The jungle equivalents, and what each needs researched:

1. **Clear order and route.** Which camps, in what order, and why — driven by the kit
   (AoE clear vs single-target, smite usage, leash needs). Full clear vs 3-camp into gank.
2. **Clear speed and health cost.** Who reaches level 3 first, who arrives healthier. This
   decides most early windows and is the single most important jungle fact.
3. **Duel outcome per window.** Who wins a straight 1v1 at each of the 7 stages — this is
   what `adv` should encode.
4. **Gank threat.** CC type, range, dash/mobility, and *when* the gank becomes real
   (usually level 2, 3, or 6). Names the actual ability.
5. **Scuttle contest.** Who wins the crab fight, at which spawn, and what decides it.
6. **Objective control.** Void Grubs, Rift Herald, Dragon — smite duel strength, pit
   control, who can contest and when.
7. **Invade and counter-jungle.** Who can enter whose jungle, at what timing, with what
   escape. The inverse — when to give the camp up — matters as much.
8. **Ability accuracy.** Real names, cooldowns, ranges, CC durations, from
   `champ-data/_kits/*.json` (235 present, all junglers covered). Same standard as lanes:
   no invented abilities, no invented numbers.
9. **Item spikes.** Jungle item paths and the timing that actually changes the matchup.
10. **Win condition and playing from behind.** `win` and `weak`, matchup-specific.

**Sources.** `champ-data/_kits/*.json` is authoritative for abilities. League Wiki is
primary for camp values, clear timings and objective mechanics. **Reddit is blocked by
policy.** There is no win-rate source for jungle — do not invent one, and do not scrape
lolalytics (out of scope, decided).

---

## 5. Decisions needed before the run

1. **What is `adv`?** The blocking one. Options: (a) normalise to an enum like the lanes —
   `<Owner> | <Enemy> | Even` plus a rating — which makes mirror/coherence checking possible
   and is machine-verifiable; (b) keep free text and drop those checks; (c) split into two
   fields, a verdict enum plus a free-text label (`"Kraken Slayer Spike"`) for display.
   **Recommendation: (c).** It preserves what the page shows today while giving the tooling
   something countable. Changing this touches all 17,493 stage rows, so decide before, not
   after.
2. **`split` and `picks` at 4% unique** — champion-level by design, or rewrite ~5,000
   entries to be matchup-aware? Same shape as the `tradeBad` question.
3. **The jargon sweep.** "camp node" / "your model" / "quadrant" are mechanical
   find-and-replace across 25,420 occurrences, and could be done deterministically with a
   tool — *if* the replacements are agreed. Cheaper than agent rewriting by orders of
   magnitude. Worth doing first and separately.
4. **Mirror pairs.** Jungle matchups are symmetric (Lee vs Graves / Graves vs Lee). Should
   they be forced to agree, given `mirror-fix` on mid produced 2,410 self-contradicting rows
   and is currently stashed unshipped? Suggest: build the check, defer the fix.

---

## 6. Sequencing and cost

**Phase 0 (free, no agents).** The jargon sweep — a deterministic rename tool over the
agreed vocabulary. Touches 94% of entries and visibly improves 2,450 live pages for zero
token cost. Do this first regardless of everything else.

**Phase 1 (build, small).** `apply-proposals` jungle lane + `regression-check` +
`build-briefs`. This is code, not agents. Nothing can proceed without it.

**Phase 2 (the audit).** 2,499 matchups. At bot/support economics — ~235 matchups/hour,
6 agents on pinned tiers (haiku planner/briefs/triage, sonnet propose/apply/QA/ship) — that
is roughly **11 hours of run time**, the largest single lane by a wide margin. Run it in
scoped batches of 8–10 champions, never with `resumeFromRunId`, committing gate-passing
champions as they land.

**Do not skip Phase 0 or 1 to "get started".** Jungle is the lane where the shape differs
most, and every hour of proposals written before the writer exists is an hour of stranded
work.

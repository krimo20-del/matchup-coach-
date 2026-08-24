# Prose templating — measured across all 72 top-lane champions

Generated 2026-08-24, after the top-lane go-live (`e8c8e19`). Supersedes the
single-champion (Ziggs) estimate in `PICKUP-MATCHUP-AUDIT.md`, which is not
representative — Ziggs is one of the worse cases, not a typical one.

Scope: the **app-facing layer** (`champ-data/*.full.js`, `CHAMP_FULL`). The
content layer that generates the 12,095 SEO pages has different fields and is
measured separately. 72 champions, 5,091 matchups, 35,634 phase rows.

---

## Duplicate rate by field

| Field | Entries | Repeated | Read |
|---|---|---|---|
| `tradeBad` | 5,089 | **75.3%** | by design — see below |
| `breakdown.carry` | 5,089 | 20.1% | moderate |
| `breakdown.spikes` | 5,090 | 20.0% | moderate |
| `breakdown.mid` | 5,091 | 19.8% | moderate |
| `breakdown.late` | 5,090 | 19.6% | moderate |
| `tradeGood` | 5,089 | 14.9% | moderate |
| `breakdown.early` | 5,091 | 14.7% | moderate |
| `breakdown.wave` | 5,090 | 14.6% | moderate |
| `tldr` | 5,091 | 12.7% | **concentrated — see below** |
| `breakdown.trading` | 5,090 | 9.1% | fine |
| `ahead` | 4,967 | 1.4% | fine |
| `breakdown.feeding` | 5,090 | 1.3% | fine |
| `winCon` | 5,091 | 0.3% | fine |
| `breakdown.difficulty` | 5,089 | 0.2% | fine |
| `enemyWin` / `loading` / `breakdown.cooldowns` | 5,089–5,091 | 0.0% | clean |

**Most fields are healthy.** `enemyWin`, `winCon`, `loading` and
`breakdown.cooldowns` are essentially fully distinct across 5,000+ matchups.

---

## `tradeBad` at 75% is probably NOT damage

Each champion carries one `tradeBad` string repeated across all ~71 of their
matchups (typically 2/71 distinct). But the field means *"the mistake you make"*,
which is genuinely champion-scoped — Ambessa's is "dumping every dash going in"
regardless of who she faces. The strings are specific and well written.

**This needs a product decision, not a repair.** Either it is correct as
champion-level advice (then the 75% figure is noise and should stop being
reported as a defect), or the field is meant to be matchup-aware, in which case
it is the single largest rewrite in the dataset at ~5,000 entries.

---

## The real defect: `tldr` assigned by enemy ARCHETYPE, not per matchup

11 of 72 champions have `tldr` under 60% distinct. The cause is diagnosable:
their tldrs are keyed to enemy *class groups*, and the same groups recur across
affected champions.

| Champion | Distinct | Share |
|---|---|---|
| locke | 7/72 | 10% |
| lucian | 9/71 | 13% |
| sejuani | 9/71 | 13% |
| akshan | 18/71 | 25% |
| graves | 19/71 | 27% |
| neeko | 20/71 | 28% |
| karma | 27/71 | 38% |
| ryze | 30/71 | 42% |
| lillia | 35/71 | 49% |
| cassiopeia | 36/71 | 51% |
| mel | 41/71 | 58% |

Locke's 23-matchup group is `akali, aurora, gangplank, gnar, …` (ranged/poke);
his 20-matchup group is `camille, fiora, gragas, gwen, …` (duelists); his
13-matchup group is `chogath, ksante, malphite, maokai, …` (tanks). Lucian and
sejuani use the *same* partition. So one archetype-to-tldr map was applied
instead of per-matchup authoring.

**Scope: 782 matchups across 11 champions.** The other 61 champions are fine.
This is a targeted fix, not a dataset-wide rewrite.

---

## What was NOT established

- **"83 phase entries carry owner-positive text on rows the enemy wins."** Not
  reproduced. 12,843 of 35,634 phase rows (36%) are won by the enemy, but that
  is the normal distribution of who wins a stage, not a defect. Detecting
  *sentiment* mismatch between `phases[].side` and `phases[].why` needs a real
  check; counting enemy-won rows says nothing about it. **Still open.**
- Item-recommendation contradictions and the K'Sante stack-count conflict were
  not measured.

---

## Recommendation

Fix `tldr` on the 11 champions (782 matchups) — small, well-scoped, and the
worst reader-visible repetition. Decide the `tradeBad` question before touching
it. Neither blocks the mid-lane run, which does not share these files.

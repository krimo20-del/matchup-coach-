# Prose templating — measured across all 72 top-lane champions

Regenerated 2026-08-24. **The first version of this file (commit `636710d`) was
wrong and its recommendation should not be acted on.** Re-run the numbers with
`node tools/prose-duplication.js`.

Scope: the app-facing layer (`champ-data/*.full.js`, `CHAMP_FULL`). 72
champions, 5,091 matchups, 86,407 prose fields.

---

## What the first version got wrong

It measured **exact string duplication**. The dominant pattern in this dataset
is a fixed sentence with the champion or ability name slotted in, which is a
*different string every time*. Exact matching scored those as fully distinct.

`enemyWin` is the clearest case — reported as **0.0% duplicated**, actually
**74.4%**. Every entry is the same sentence:

```
Aatrox  wins by landing World Ender,     denying your pattern, and forcing the all-in …
Darius  wins by landing Apprehend (Pull), denying your pattern, and forcing the all-in …
Garen   wins by landing Courage,          denying your pattern, and forcing the all-in …
```

Normalising champion names, ability names and numbers to placeholders collapses
these onto one skeleton. My first normaliser lowercased the leading character to
preserve sentence case, which left the champion name intact in exactly the
fields that *begin* with it — so the most templated field in the dataset scored
as the cleanest.

The original `PICKUP-MATCHUP-AUDIT.md` assessment ("prose is still heavily
templated") was right. The first version of this file wrongly softened it.

---

## Structural duplication by field

| Field | n | exact | **structural** |
|---|---|---|---|
| `breakdown.carry` | 5,089 | 20.1% | **94.4%** |
| `breakdown.wave` | 5,090 | 14.6% | **93.4%** |
| `ahead` | 4,967 | 1.4% | **90.4%** |
| `breakdown.late` | 5,090 | 19.6% | **89.0%** |
| `breakdown.spikes` | 5,090 | 20.0% | **88.0%** |
| `tradeBad` | 5,089 | 75.3% | **87.4%** |
| `breakdown.difficulty` | 5,089 | 0.2% | **87.1%** |
| `breakdown.feeding` | 5,090 | 1.3% | **86.7%** |
| `breakdown.early` | 5,091 | 14.7% | **85.1%** |
| `breakdown.mid` | 5,091 | 19.8% | **83.7%** |
| `tradeGood` | 5,089 | 14.9% | **82.6%** |
| `breakdown.trading` | 5,090 | 9.1% | **81.2%** |
| `loading` | 5,089 | 0.0% | **78.8%** |
| `enemyWin` | 5,091 | 0.0% | **74.4%** |
| `winCon` | 5,091 | 0.3% | 28.2% |
| `tldr` | 5,091 | 12.7% | 20.8% |
| `breakdown.cooldowns` | 5,090 | 0.0% | **0.9%** |

**73.6% of all prose is structurally duplicated — 63,627 of 86,407 fields.**

Worst champions: locke 87%, sejuani 83%, lucian 83%, graves 82%, lillia 81%.
Best: drmundo 48%, galio 54%, garen 55%. (masteryi 0% is the known empty-entry
case, not a quality result.)

---

## What this changes

- **`tldr` is one of the *best* fields (20.8%), not the worst.** The first
  version recommended fixing `tldr` on 11 champions / 782 matchups. That is
  roughly 1% of the real problem and would not move the reader experience.
- **`breakdown.cooldowns` at 0.9% is the proof the dataset can be good.** It is
  the field the audit rewrote directly with real cooldown numbers. Where the
  audit touched prose, the prose is genuinely per-matchup; everywhere else the
  original template survived.
- **The real target is the `breakdown.*` block plus `ahead` / `tradeGood` /
  `tradeBad` / `loading` / `enemyWin`** — roughly 55,000 fields above 74%.

## What is still not established

The handoff doc's claim that "83 phase entries carry owner-positive text on
rows the enemy wins" is **still unverified**. 36% of the 35,634 phase rows are
enemy-won, but that is the normal distribution of who wins a stage and does not
test the sentiment claim. Detecting it needs a real check.

---

## Recommendation

Do **not** start with `tldr`. Either:

1. **Targeted** — rewrite `enemyWin` (74.4%, one skeleton, 5,091 entries). It is
   the most mechanical: every entry says the same thing about a different
   ability, so it is the cheapest large win and the easiest to verify.
2. **Full pass** — treat ~55,000 fields as the real backlog. That is a far
   larger job than the original audit and needs its own plan and budget.

Either way this is a bigger decision than "fix the tldrs", and the mid-lane run
would reproduce the same templates unless the generator prompts change first.

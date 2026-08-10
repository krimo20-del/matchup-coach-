# Matchup audit — pick up here

Paste this whole file into a new Claude Code session. Everything needed is in the repo;
nothing depends on the old session's temp folder.

**Repo:** `C:\Users\Kris\OneDrive\CLAUDE\New folder (2)` (quote it — spaces and parens)

---

## What this is

Auditing every matchup on MatchupCoach.gg for factual correctness, missing decisive
interactions, and concrete cooldown-sequencing advice. **11,903 matchups** across five
lanes. The site is live and paid, so nothing ships unverified.

## Progress

| Lane | Audited | Total |
|---|---|---|
| Top | ~1,180 | 5,112 |
| Mid | 0 | 2,162 |
| Support | 0 | 1,260 |
| Bot | 0 | 870 |
| Jungle | 0 | 2,499 |

**Champions complete (16):** ambessa, camille, cassiopeia, galio, gwen, jayce, kassadin,
malphite, nasus, pantheon, rumble, sejuani, tahmkench, teemo, trundle, zac
**Partial:** mel 55/71

Live commit: `29e1e4d` + camille `9f727133`. Check with `node tools/coverage-report.js`.

---

## The architecture — do not change this

**Agents never edit `champ-data`.** They write one proposal file per matchup to
`audits/<lane>/<ownerKey>__<enemy>.json`. `tools/apply-proposals.js` is the only writer.

This exists because earlier designs failed hard:
- Multiple agents editing one file raced and hung a run for 47 minutes with 4 matchups done.
- Agents holding work in memory lost everything when the spend limit killed them.
- Rules asked of a model got ignored; rules enforced at the write cannot be.

Proposals land per matchup, so a kill costs one matchup and re-runs skip what exists.

## Tools (all deterministic, no model)

| Tool | Does |
|---|---|
| `build-kit-library.js` | 233 champion kits from Riot Data Dragon → `champ-data/_kits/` |
| `derive-interactions.js` | Finds applicable-but-unmentioned interactions (16,995 found) |
| `apply-proposals.js` | The only writer. `<lane> [--write] [--champ X]` |
| `validate-content.js` | Structure guard |
| `mirror-check.js` / `mirror-fix.js` | Paired matchups must agree |
| `coverage-report.js` | What's outstanding → `audits/_gaps.json` |
| `champion-log.js` | Timestamped per-champion record with active time + tokens |
| `watchdog.js` | Stall detection. `--stall 3` |

## Resume the run

```
Workflow({
  scriptPath: "C:\\Users\\Kris\\OneDrive\\CLAUDE\\New folder (2)\\tools\\audit-run\\runner.js",
  args: { lane: "top", fullDir: "champ-data", contentDir: "champ-data/content",
          label: "Top Lane", agents: 3, maxRetry: 0,
          champions: ["aatrox","akali","akshan","aurora","chogath","darius","drmundo",
            "fiora","gangplank","garen","gnar","gragas","graves","heimerdinger","illaoi",
            "irelia","jax","karma","kayle","kennen","kled","ksante","lillia","lucian",
            "maokai","mordekaiser","nautilus","neeko","olaf","ornn","poppy","quinn",
            "renekton","riven","ryze","sett","shen","singed","sion","swain","sylas",
            "tryndamere","urgot","vayne","vladimir","volibear","warwick","wukong","yasuo",
            "yone","yorick","ziggs","masteryi","locke","zaahen"] }
})
```

Then `node tools/watchdog.js --stall 3` in the background.

Lane args: mid → `champ-data/mid` + `champ-data/content/mid`; bot → `.../bot`;
support → `champ-data/sup` + `champ-data/content/sup`. **Jungle has a different shape**
(`JG_DB` in `champ-data/jg/`) and needs its own runner — not written yet.

---

## Hard rules

- **Never `git add -A`.** Stage `champ-data tools audits matchup sitemap.xml` only.
  `StudentLearningHub.html` is the user's tutoring work and **must never reach
  matchupcoach.gg**. Leave `brand/`, `imgx/`, `_bundle_assets/` untracked too.
- **Never touch payment code** — `server.js`, Stripe, pricing, plans.
- **Reddit is blocked by policy.** Do not attempt it, do not route around it. League Wiki
  is primary for mechanics.
- **±10% length band** on prose. Enum fields (`win[N]`, `phases[N].side/rating`, `diff`,
  `tone`) are exempt — champion names differ in length and the band made every level-chart
  fix impossible.
- **Relevance rule:** the 14 points are what you CHECK, not a template for what you WRITE.
  Never state a non-interaction ("QSS doesn't work here"). Most points come back empty.
- **No elo tiers** anywhere.
- **Never stop on a question.** Pause that matchup, log it, move on. Never guess.
- Regenerate pages (`node _gen_seo_pages.js`) before shipping — the 12,095 static pages
  bake the text in.

## Known state

- **135 pre-existing structural defects** (3 spikes where 4 expected, across 39 files,
  mostly vs locke/zaahen/masteryi). Predate this work. Do **not** block shipping on them.
- Mirror contradictions ~470 residual, down from 52,497.
- Side/rating coherence at 1%, down from 30%.
- Several kit flags are tooltip-parsing false positives (Rumble's Scrap Shield tagged
  `knockup`/`terrain`; grounding on Illaoi, Poppy, Maokai). Agents correctly refuse to
  build advice on flags that contradict Riot's description.
- Master Yi has no `CHAMP_FULL` entry for several champions — content layer only.

## Open questions for the user

1. **Win-rate source conflict.** The packets and `MC_WR_TABLES` disagree, sometimes by 14
   points (Galio vs Heimerdinger: 61.29%/31 games vs 53.12%/256). Which is authoritative?
2. **Whole-champion fabrications** needing a sweep: Trundle's Chomp described as stealing
   attack speed (it's AD only) in 11 of 14 matchups; Ambessa's Public Execution credited
   with healing and armour pen Riot's text doesn't mention; Gwen's Hallowed Mist called
   untargetability; Graves' Smoke Screen called a blind.
3. **`phases[].rating` scale** is inconsistent between entries — what does it mean?
4. **Full layer is heavily templated** for some champions (Gwen: same sentences across all
   71 matchups with the name swapped). Regenerate wholesale or leave as scaffolding?

## Pace

~33 min active per champion, ~35k tokens per matchup, ~1M tokens per champion.
Remaining ~10,700 matchups ≈ 375M tokens. Bounded by the spend limit, not clock time.
Report after each champion: `node tools/champion-log.js top`

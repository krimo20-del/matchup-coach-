# Decisions waiting on Kris — go through after mid finishes

Written 2026-08-25. Every item here is something the audit agents hit, refused to guess on,
and logged. None of it blocks the mid run. Ordered by how much work the answer unlocks.

Covered by the existing `PICKUP-*` 404 rule in `netlify.toml`, so this file is not served
publicly.

---

## 1. Chart authority — the big one

**~15 mid matchups are sitting self-contradictory because nobody has ruled on this.**

The packet's `levelChart`, the full layer's `phases[N].side`, the content layer's `win[N]`
and the page's own prose can all disagree. Agents will not invent a verdict, so they leave
the row and log it.

The shape that keeps recurring: the full layer carries a blanket `"Skill"` on all seven
rows while `win[N]` and the packet agree on a real answer. Example — **Galio vs Mel**:

```
full   phases[0..6].side  =  Skill / Skill / Skill / Skill / Skill / Skill / Skill
content win[0..6]         =  Mel / Mel / Galio / Galio / Galio / Mel / Mel   (= packet)
```

and the two layers' `why` text argue opposite sides on rows 4-6.

Same question on Galio vs **Naafiri, Neeko, Orianna, Qiyana, Ryze, Swain, Pantheon**.

**What I need:** when the layers disagree and the kit cannot settle it, which wins —
the packet/`win[N]`, or the full layer's prose? A one-line rule unblocks all of them.

I already fixed the *mechanical* half of this: the rule that every `side` edit needs a
paired `win[N]` edit was too strict and was itself blocking these fixes. It now says the
two must AGREE afterwards, so a side-only edit is fine when `win[N]` is already right.

### 1b. Win rate vs chart
Two flavours, opposite directions, both flagged by the packet itself:

- **Galio vs Hwei** — chart gives Galio 7/7 stages, but the matchup wins **44.87%** over
  2,231 games, rated FAVOURED 4/10. All three sources agree with each other, so there is no
  cross-layer error to fix. Keep the chart, or re-rate?
- **Galio vs Cassiopeia** — chart gives Cassiopeia 6/7, but Galio wins **54.03%** over 694
  games.

Agents will not flip seven rows on a win rate alone, and I think they are right not to.

---

## 2. `tradeBad` — champion-scoped or matchup-scoped?

87% structurally duplicated, but that may be correct by design. Each champion carries one
line across all ~45 matchups, and the field means *"the mistake you make"* — Ambessa's
"dumping every dash going in" is true against anyone. The strings are specific and well
written.

- **Correct as-is** → stop reporting the 87% as a defect.
- **Should be matchup-aware** → it is the single largest rewrite in the dataset, ~5,000
  entries.

---

## 3. The `report[]` two-per-matchup cap vs pronoun fixes

I capped `report[N]` rewrites at two per matchup after agents generalised the template
sweep onto it (1.17 → 5.38 edits/matchup, 13.3% of all output). The cap works, but it now
blocks *one-word pronoun corrections*: agents fixed the two biggest and left e.g.
`orianna report[9].t` and `report[11].t` saying "his" about a female champion.

**Should a pure pronoun fix count against the cap?** My view: no — exempt them. Cheap to
change if you agree.

Related, same cap: `galio vs hwei` `report[3].t` and `report[9].t` still contain the
fabricated ability **"Subject: Fear (CC Paints)"**. His E is *Subject: Torment*. Out of
reach under the cap; needs a follow-up pass.

---

## 4. Retired ability names — possible lane-wide problem

**Galio vs Aurelion Sol**'s content layer was written against the **pre-rework** Aurelion
Sol — Starsurge, Voice of Light, Comet of Legend, "star orbit" — across eleven fields. The
agent rewrote all eleven to the current kit.

**Worth checking whether top/bot/support pages carry the same retired names.** If Aurelion
Sol was reworked after this data was authored, every lane has the same rot. I have not
swept for it.

---

## 5. `Locke` — mostly resolved, one open thread

The doc's old worry that **"Ritual Nails" is fabricated was wrong** — his kit shows the
ability *is* Ritual Nails, and it throws *Soul Nails*. Nothing to fix.

Still open: six fields call him "a 125-range mana champ". His kit lists Q 950, W 250,
E 425, R 1000 and **no auto-attack range at all**, so 125 is unverifiable from the kit —
though it is the standard melee value and consistent with a melee on-hit assassin. Your
call whether that framing stands.

---

## 6. Still-unfixed defect classes (need prose, not a transform)

Deterministic tooling has taken these as far as it can. They need agents.

| class | count | note |
|---|---|---|
| `COPY_PASTE_BLEED` | ~330 mid | a Do's bullet whose body is the tradeGood line under an unrelated title |
| `COOLDOWN_NO_DIGIT` | ~65 mid | the field meant to hold real cooldowns, with no number in it |
| `TEMPLATE_SURVIVAL` | ~5-9 fields/champion | reported for visibility, never required to be zero |

The back-fill group — champions still carrying these at scale — is the 5 original-rules
champions (ahri, akali, akshan, anivia, annie) plus the hybrids interrupted mid-flight
(aurora, brand, cassiopeia, ekko, orianna, galio, hwei, irelia, kassadin, katarina,
leblanc, lissandra, lux).

---

## 7. Master Yi — 70 live pages with no app data

`masteryi` entries exist in **72 of 72** content files but only **2 of 72** app-layer files.
So 70 top-lane matchups have a published, indexed SEO page (I confirmed
`aatrox-vs-masteryi` returns 200, and 242 masteryi URLs are in the sitemap) with nothing
behind them in the app.

Needs either field-by-field authoring with `"before": null`, or a generator. This is the
doc's old open question 6 and it is still open.

---

## 8. The gank / bush field — your idea, and the data backs it

There is no field for gank timing or bush control. The language is everywhere in the prose
(21k "ward", 16k "gank", 19k "roam") but it is **champion-level, not matchup-level**: 628
distinct gank/vision sentences, with the top ones repeated **70x each** — once per matchup,
identical.

A real `gankRisk` / bush-control field would be genuinely new content rather than a
rewrite. It is a product change though: new field means app work plus a generator change,
not just data.

---

## 9. Smaller items, recorded so they are not lost

- **`diamond+` is never filtered.** The elo regex in `apply-proposals.js` ends with `\b`
  after `\+`, so "diamond+" cannot match. Pre-existing, unrelated to this session's work,
  low risk. (I *did* fix the adjacent bug where Jax's "Grandmaster's Might" was rejected as
  an elo tier — the `(?!-)` guard covered his hyphenated ability but not the apostrophe.)
- **`wants.foe[]` inverts the voice** — "you" is the foe, third person is the OWNER. It is
  excluded from `tools/fix-pronouns.js` for that reason. Do not re-add it.
- **Lane-wide scans cost a matchup.** An agent ran `ls audits/mid | grep orianna`, saw the
  MIRROR file `neeko_mid__orianna.json`, concluded the matchup was done and skipped it.
  Orianna shipped 44/45 and needed a second pass. The prompt already forbids lane scans.
- **The spend limit has stopped this run three times mid-flight.** Each stop stranded
  complete-but-unapplied proposals that took a manual salvage pass to recover.

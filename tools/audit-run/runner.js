export const meta = {
  name: 'matchup-completion-runner',
  description: 'Fills outstanding matchups champion by champion, then QA-verifies every section before marking the champion done',
  phases: [
    { title: 'Plan', detail: 'one planner computes the outstanding list so slices cannot race' },
    { title: 'Propose' },
    { title: 'Apply' },
    { title: 'SectionQA' },
    { title: 'Ship' },
    { title: 'Efficiency', detail: 'reviews how the agents worked; advice feeds the next champion' },
  ],
}

const REPO = 'C:\\Users\\Kris\\OneDrive\\CLAUDE\\New folder (2)'
const SCRATCH = REPO + '\\tools\\audit-run'
const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const LANE = A.lane, FULL_DIR = A.fullDir, CONTENT_DIR = A.contentDir, LABEL = A.label
const CHAMPS = A.champions || []        // ownerKeys, in order
const AGENTS = A.agents || 8
const MAX_RETRY = A.maxRetry == null ? 1 : A.maxRetry
// The efficiency reviewer audits the AUDIT — it reads old agent transcripts and reports on
// how the agents worked. Useful once while tuning the runner; pure spend on every later run.
// On 2026-08-30 it ran once per champion for 22 champions and spent its budget grepping
// session directories to describe waste that had already happened. OFF unless asked for.
const EFFICIENCY = A.efficiency === true

// ===================  MODEL TIER PER ROLE  ===================
// NOTHING here used to set a model, so every agent inherited whatever the session was on.
// The moment the session moved to Opus, all ~11 agents per champion ran on Opus — including
// the ones whose entire job is "run this CLI command and report the line it printed".
// Measured 2026-08-31: bot lane managed 2 matchups in 10 minutes across six proposers,
// against the 215-326/hr the top lane sustained. Same script, same prompts, same 6 agents.
// The tier is the difference, and it is a per-call override, not a session setting — so
// this stays correct no matter what model the user picks for their own conversation.
//
// Override any of these from args, e.g. {"models":{"propose":"opus"}} to buy quality back.
const M = A.models || {}
const MODEL = {
  // Pure mechanics: run a command, read stdout, return it as JSON. No judgement at all.
  plan:    M.plan    || 'haiku',
  briefs:  M.briefs  || 'haiku',
  triage:  M.triage  || 'haiku',
  // Runs apply-proposals.js and explains what it rejected — light judgement on failures.
  apply:   M.apply   || 'sonnet',
  // Writes the matchup prose. This is the product AND the bulk of the spend (6 of ~11
  // agents), so it is the one tier worth revisiting first if quality slips.
  propose: M.propose || 'sonnet',
  // Verifies coverage and sections against the files. Reasoning-heavy but one agent.
  qa:      M.qa      || 'sonnet',
  // Stages exact paths, commits, pushes. Care matters more than raw capability.
  ship:    M.ship    || 'sonnet',
}
log(`models: propose=${MODEL.propose} qa=${MODEL.qa} apply=${MODEL.apply} ship=${MODEL.ship} plan/briefs/triage=${MODEL.plan}`)
if (!LANE || !CHAMPS.length) throw new Error('runner: need lane + champions[]')

const BASE = `
PROJECT: MatchupCoach.gg — a League of Legends loading-screen coach.
REPO ROOT (quote it — spaces and parentheses): "${REPO}"
Work from the repo root. LIVE PATCH IS 26.15. Patch 26.16 lands Aug 12 2026 — NOT live.
LANE: ${LABEL}.

*** YOU NEVER EDIT champ-data. *** Only tools/apply-proposals.js writes matchup data.
Your Write calls go to audits/ and nowhere else. Direct edits cause concurrent-write
corruption — that is what broke an earlier run.

=====================  READ, DO NOT RESEARCH  =====================
  champ-data/_kits/<slug>.json — all 233 champions from Riot Data Dragon: real ability
    names per slot, Riot's description, per-rank cooldowns ("25/23/21/19/17"), costs,
    ranges, and derived flags (projectile, blocksProjectiles, spellShield, dash,
    grounding, knockup, hardCC, silence, slow, shield, heal, untargetable, stealth,
    revealsStealth, autoReset, onHit, trueDamage, percentHealth, execute, terrain,
    channel, global, zone, antiHeal). AUTHORITY on names and cooldowns.
    "needsResearch" is empty ON PURPOSE — spell-shield eligibility, cleanse/QSS,
    tenacity, Flash-buffering, minion-block, animation cancels and bugs are NOT in Riot's
    text. Empty means UNKNOWN, never "no". Never assert those from the file.
    Derived flags occasionally misfire (tooltip parsing). If a flag contradicts Riot's own
    description, trust the description and say so in notes.
  champ-data/_kits/_missing/<ownerKey>.json — interactions that APPLY to your champion's
    matchups but are absent from the text. Already filtered to your champion (~34KB).
    Highest-value work. Do NOT open _missing-interactions.json: it is the unsplit 4.3MB
    original, and reading it per agent stalled a run for 16 minutes before a single
    matchup was written.
  "${SCRATCH}\\packets\\<ownerKey>.json" — winRate, games, levelChart, defects,
    suspectNames (near-miss ability names; HAS FALSE POSITIVES — check the kit file).

Calibration — real errors found in this data:
  "Ares of Blaze" for Brand's R -> really Pyroclasm
  "Noxious Blight" for Cassiopeia's Q -> really Noxious Blast; grounding is Miasma (W)
  "Jag'talon Slash" for Nilah's E -> really Slipstream
  Azir vs Yasuo never mentioned Wind Wall blocking Azir's soldier attacks.

Web use is a LAST RESORT for what the kits cannot answer. League Wiki is primary; Riot
patch notes for changes; stat sites for trends only. REDDIT IS BLOCKED BY POLICY on every
path — do not attempt it, do not route around it. DO NOT SPECULATE: if you cannot verify
a claim, leave that text alone and record it in unverified.

=====================  NEVER STOP TO ASK  =====================
The user is away and has asked explicitly: DO NOT HALT ON A QUESTION.
 - Question about one MATCHUP? Leave that matchup's text alone, write the question into
   questionsForUser with the matchup named, and move to the NEXT MATCHUP immediately.
 - Question about the whole CHAMPION? Record it the same way and move to the NEXT
   CHAMPION. Never idle waiting for an answer.
 - Never guess to keep moving. Skipping a matchup and flagging it is correct; inventing a
   fact to avoid skipping is not. An unanswered question costs one matchup; a wrong fact
   shipped to a live site costs trust.
Phrase each question so it can be answered without re-reading this whole conversation:
name the champion, the matchup, the exact field, and what you need decided.

=====================  REUSE THE MIRROR  =====================
Every matchup exists twice. Before auditing A vs B, CHECK whether B vs A has already been
audited — look for audits/<lane>/<enemyKey>__<ownerSlug>.json and read the opponent's
existing entry. Reuse the mechanical findings you already paid for (ability names,
cooldowns, the decisive interaction, who wins each stage) instead of researching them
again. State the SAME facts from your side's perspective.
The two directions must never contradict: if their page says they win Level 1, your page
must say they win Level 1 too. Ratings are inverse — 3/10 on one side is 7/10 on the
other. Do not fight the mirror; tools/mirror-fix.js will overwrite any disagreement you
introduce, so getting it right here saves the correction.
`

const QUALITY_BAR = `
=====================  THE APPROVED QUALITY BAR  =====================
The user reviewed and approved this rewrite. Match it or beat it.

  BEFORE (311 chars): "...her only gap-closer is Jag'talon Slash off a target. Never shove
   the wave flat into her dive range and never facecheck a bush where she can flank with
   her dash reset."
  AFTER  (320 chars, +2.9%): "...her gap-closer is Slipstream (E) onto a target. Hail of
   Arrows grounds it — drop the E under her feet and she cannot dash in or out, so save it
   for her step-up, not the wave."

  BEFORE (277): "Her Apotheosis all-in is deadly, but Chain of Corruption pre-empts it..."
  AFTER  (273, -1.4%): "Her Apotheosis pulls you in and Joy Unending shares the heal to her
   whole side, so pre-empt it: root her before she dashes and your support's CC lands
   first. Jubilant Veil dodges autos, never your Q or E — poke through the mist, and spend
   a 100-second R only on her commit."

What that bar requires: a fabricated ability name killed and the real one used; the
decisive interaction actually STATED; real cooldown numbers where they make advice
concrete; concrete sequencing keyed to the enemy's cooldown; the user's second-person
voice; and it fits in the same space — sometimes shorter.
`

const SPEC = `
=====================  THE 14-POINT AUDIT  =====================
 1  WIN RATE — one number, the Emerald+ figure already in the data. IGNORE elo tiers.
 2  LANE DIFFICULTY — early / mid / side lane / teamfights / snowball. (KEY POINT)
 3  POWER SPIKES — levels, ult, first recall, 1st/2nd/3rd item, late scaling. (KEY POINT)
 4  ABILITY INTERACTIONS — (MOST IMPORTANT) both kits, ability by ability, P/Q/W/E/R.
    Interrupt / cancel / ignore? Spell shield, Cleanse, QSS? Tenacity? Unstoppable?
    Grounded? Flash-buffer or extend? Through minions? Reveals stealth? Auto reset?
    Procs on-hit or spell effects? Stops dashes? Loses to displacement? Animation priority?
 5  TRADING — short, long, all-ins, wave-crash, dives, levels 1/2/3/6.
 6  COOLDOWN WINDOWS — the most punishable cooldown, how long, when not to fight.
 7  WAVE MANAGEMENT — slow push, freeze, bounce, cheater recall, crash, who pushes.
 8  JUNGLE INFLUENCE — does it flip with pressure? who ganks, who escapes, priority.
 9  RUNES — primary, secondary, situational.
10  ITEMIZATION — first item, situational, anti-heal timing, armour/MR, boots, scaling.
11  WIN CONDITIONS — how you win, how they win, what changes after lane.
12  COMMON MISTAKES — what players get wrong. Do NOT split by elo.

*** ELO TIERS ARE STRIPPED AT THE WRITE — DO NOT WRITE THEM. ***
The applier drops any edit mentioning a rank, and it drops the WHOLE edit, not the phrase.
On jax that binned 83 of 1,381 edits — real corrections lost because a sentence happened to
say a tier. The offenders are almost always breakdown.late and the late-game phases[].why,
where it is tempting to write "in low elo he...", "past Diamond this flips", "Emerald+
players punish this". Say the BEHAVIOUR instead: "players who hold the wave", "if he tracks
your cooldown", "against someone who respects the level 6 spike". Same information, and it
survives the write.
13  MISSING KNOWLEDGE — hidden mechanics, animation cancels, Flash interactions,
    buffering, targeting quirks, projectile behaviour, minion/bush/fog/terrain, bugs.
14  PATCH SENSITIVITY — did buffs/nerfs, items or runes move this recently?

Points 2, 3 and 4 are the user's KEY POINTS: every matchup's audit MUST record all three.

=====================  THE RELEVANCE RULE  =====================
The 14 points are what you CHECK, NOT a template for what you WRITE.
NEVER write a negative or a non-interaction. If it does not apply, say NOTHING about it.
"QSS does not work here" is filler and the applier will REJECT it. Most points come back
empty per matchup — expected. But if something DOES apply, it must reach the page.

=====================  FIXED LENGTH — MACHINE ENFORCED  =====================
Every PROSE "after" is within ±10% of its "before" length. The applier measures and REJECTS
anything outside the band, so an over-long rewrite is discarded and the matchup stays
unimproved. Same length, more information per word. Cut "generally", "make sure to",
"it's important to", "try to", "be aware that". Never change entry COUNTS: win 7,
whys 7, spikes 4, phases 7.

*** ENUM FIELDS ARE EXEMPT FROM THE LENGTH BAND. DO NOT SELF-CENSOR. ***
These hold a fixed token, not prose, so their length is whatever the token happens to be:
    win[N]   phases[N].side   phases[N].rating   phases[N].label
    diff     diffRating       carryRating        tone     focus.letters[N]
apply-proposals.js exempts every one of them (see ENUM_FIELD, apply-proposals.js:78) and
also skips any string under 25 characters. "Cassiopeia" -> "Skill" is a 50% cut and it
APPLIES CLEANLY. "Sett" -> "Akali" applies. A rating of "3/10" -> "7/10" applies.
A previous run left level charts wrong because agents believed these edits would be
rejected and silently skipped them. That belief was false and it cost a whole champion.
If a level chart contradicts the win rate, the packet chart, or the mirror — FIX IT.
Level-chart edits are validated as an atomic group: propose the whole chart's flips
together, never one row in isolation, or the group is held back.

=====================  THE LEVEL CHART LIVES IN TWO PLACES  =====================
*** phases[N].side (full) and win[N] (content) ARE THE SAME ROW. ***
Change one and you MUST propose the matching change to the other, in the same proposal.

If you do not, the page renders two different answers to "who wins Level 1" to a paying
user. This is not hypothetical: 101 rows across 10 champions shipped that way before a
check existed, because every gate verified structure (counts, fields, parsing) and none
compared the two layers. aatrox alone had 69.

tools/regression-check.js NOW FAILS ANY CHAMPION that introduces a new disagreement, so a
half-updated chart no longer ships — it blocks the whole champion instead. Propose the rows
in pairs and it never comes up:
    {"layer":"full",   "path":"phases[3].side", "before":"Skill",  "after":"Darius"}
    {"layer":"content","path":"win[3]",         "before":"Skill",  "after":"Darius"}
The applier treats chart edits as one atomic group, so a matched pair lands together or not
at all. An unmatched one lands and breaks the page.

=====================  MERGING DEAD STAGES  =====================
Where a stage does not differ from the one before, do NOT invent a difference: same side,
short explicitly-continuous "why". NEVER invent a power shift — a player will trust it.

=====================  DEFERRED  =====================
Use the brief's top-level "games" field, which comes from MC_REAL_GAMES — the same source
the site renders from. If IT is 0 or missing, SKIP the matchup and list it in deferredNoData.

*** DO NOT DEFER ON packet.games. *** The packet is a separate, older extract and it is
sometimes wrong: ziggs vs poppy and ziggs vs quinn both read packet.games=0 while
MC_REAL_GAMES has 323 and 241 real games. Two live matchups were skipped as "no data" on
that basis and were the last thing standing between the lane and 100%. If the two disagree,
MC_REAL_GAMES wins and you audit the matchup.
`

const LAYERS = `
=====================  THE TWO LAYERS  =====================
LAYER "full" — CHAMP_FULL in ${FULL_DIR}/<champ>.full.js, CHAMP_FULL[<ownerKey>][<enemy>]
  Writable paths: tldr, winCon (CORE WIN CONDITION), enemyWin, diff, tone, diffRating,
  carryRating, tradeGood, tradeBad, ahead (IF YOU GET AHEAD), loading, focus,
  phases[0..6].why|.side|.rating (LEVEL CHART: Level 1, Level 2, Level 3, Levels 4-5,
  Level 6, First item, Two+ items),
  breakdown.early, breakdown.mid, breakdown.wave, breakdown.cooldowns, breakdown.trading,
  breakdown.spikes, breakdown.feeding, breakdown.carry, breakdown.difficulty, breakdown.late
  (ALL TEN EXIST ON EVERY MATCHUP — see the template sweep below),
  dosFull[N].t and dosFull[N].d (Key Triggers & Do's — array of {t,d}),
  dontsFull[N].t and dontsFull[N].d (Critical Don'ts — array of {t,d}),
  report[N].h and report[N].t (array of {h,t}).
LAYER "content" — MC_CONTENT_EXTRA in ${CONTENT_DIR}/<champ>.js
  Writable paths: win[0..6], whys[0..6], early, mid, late, spikes[0..3].text,
  spikes[0..3].when, wants.you[N], wants.foe[N].
NEVER propose edits to MC_WR_TABLES or MC_REAL_GAMES.
what-kills-me.js (WKM_LINES) is champion-level — report errors in notes, do not edit.

=====================  THE TEMPLATE SWEEP (MANDATORY)  =====================
The top lane finished at 100% coverage and is still 73.6% structurally templated. The
cause is measured and is not a mystery: THE AUDIT DE-TEMPLATISES EXACTLY WHAT IT EDITS,
AND NOTHING ELSE. Edit counts from the finished top lane against how templated the field
remained afterwards:

    breakdown.cooldowns   2955 edits  ->   0.9% templated
    breakdown.carry         45 edits  ->  94.4% templated
    breakdown.wave          76 edits  ->  93.4% templated
    ahead                   89 edits  ->  90.4% templated
    breakdown.feeding      161 edits  ->  86.7% templated

"Structurally templated" means the same sentence with the champion or ability name
swapped in. It reads as a different string, so an exact-match check calls it unique. It
is not unique to a reader. Example — every one of these is a separate matchup:

    Aatrox wins by landing World Ender,      denying your pattern, and forcing the all-in...
    Darius wins by landing Apprehend (Pull), denying your pattern, and forcing the all-in...
    Garen  wins by landing Courage,          denying your pattern, and forcing the all-in...

THEREFORE, for every matchup, you must OPEN AND JUDGE all ten breakdown.* keys plus
ahead, tradeGood, tradeBad, loading and enemyWin. For each one ask: could this sentence
be pasted onto a different enemy with only the name changed? If yes it is a template and
it is IN SCOPE — propose a replacement grounded in THIS enemy's kit, cooldowns and
pattern. Do not skip a field because it is not factually wrong. A template is a defect
even when every word in it is true.

*** report[N].h and report[N].t ARE NOT IN THE SWEEP. *** That list above is exhaustive.
The sweep was measured generalising itself onto report[] — the longest prose array on the
page — which took it from 1.17 to 5.38 edits per matchup and 13.3% of all output, for
scope nobody asked for. Rewrite AT MOST TWO report entries per matchup, and only ones the
lint flags or that name a fabricated ability. Leave the rest alone.

Two hard limits stay in force and they are not in tension with the above:
 - The +/-10% length band applies to all of these (they are prose, not enum). Rewrite at
   the same length; do not expand.
 - Never invent. If this enemy gives you nothing specific to say, leave the field and
   record it in notes. A surviving template is better than a fabricated interaction.

Report in sectionsMissing every field you judged templated but could not ground.

=====================  THE DEFECT CATALOGUE  =====================
Every item below was found by QA on the five mid-lane champions that shipped before you.
They are not hypothetical. node tools/matchup-lint.js <ownerKey> <fullFile> <contentFile>
detects the mechanical ones; you must fix what it reports for YOUR champion.

1. PRONOUNS. The authority is champ-data/champ-gender.js (window.MC_IS_FEMALE). 1,251
   misgendered fields shipped across five champions — female enemies called "he/his/him"
   because the template was written for a male enemy and only the name was swapped. The
   owner is addressed as "you", so a third-person pronoun refers to the ENEMY. Check the
   enemy's gender before you write any sentence containing he/she/his/her.
   Female in this lane: ahri, akali, anivia, annie, aurora, cassiopeia, diana, irelia,
   karma, katarina, leblanc, lissandra, lux, mel, naafiri, neeko, orianna, qiyana, syndra,
   taliyah, vex, zoe. Everyone else defaults to he/him.

2. COPY-PASTE BLEED. dosFull[N].d / dontsFull[N].d must NOT be the tradeGood or tradeBad
   string pasted under an unrelated title. 287 such bullets shipped. The title promises one
   thing and the body explains another; a reader notices immediately.

3. breakdown.cooldowns MUST CONTAIN A NUMBER. It is the field that holds real cooldowns.
   42 entries shipped with no digit in it at all. If you cannot source a real cooldown from
   the kit, say what the ability does on what rank — never leave generic filler.

4. UNFILLED PLACEHOLDERS. Anything shaped like <Ability> is a template leak. Note that
   "Flash Frost (Stun)" and "Apprehend (Pull)" are the AbilityName (Effect) CONVENTION and
   are correct — do not "fix" those.

5. HEDGING. "generally", "typically", "usually", "tends to" say nothing. State the
   behaviour or omit the sentence.

6. MAGNITUDE WITHOUT A SOURCE. Do not write "halves your combo" / "negates your poke"
   unless the kit gives the number. Directionally right is not right.

7. PLACEHOLDER PHRASING. "Sorcerer's-Shoes-equivalent items", "Zhonya's-type peel" — name
   the actual item or drop the clause.

=====================  THE CHART RULE (DECIDED)  =====================
This was an open question and it is now settled. Follow it exactly.

  phases[N].side, phases[N].rating and the matching content win[N] and phases[N].why are
  ONE UNIT. Change all of them together or change none of them.

*** AFTER YOUR EDIT, full phases[N].side AND content win[N] MUST NAME THE SAME SIDE. ***
That agreement is the actual requirement. Say it as a test, not as a ritual: read what
win[N] holds right now, and make the row agree.

  - win[N] currently DISAGREES with where you are moving side  -> edit BOTH, same proposal.
  - win[N] is ALREADY what you are moving side to              -> edit side ALONE. Correct
    and expected. Do not add a win[N] edit whose before equals its after; the applier
    rejects a no-op and would take your whole chart group down with it.

The earlier wording said "every side edit requires a paired win[N] edit, no exceptions",
which was wrong in the second case and stalled at least five charts where the content layer
was already right and the full layer carried a blanket "Skill" on all seven rows. Agents
correctly refused to guess and left them self-contradictory.

Still get this right, because the failure it guards against is real: side edits outnumbered
win[N] edits 14 to 1 in one run (922 vs 66), worse than the 7.6-to-1 before any rule
existed. phases[N].side, .rating and .why are all full-layer and get rewritten together;
win[N] lives in the OTHER file and keeps being forgotten. regression-check.js fails the
champion when the two layers end up disagreeing — it does not care how many edits you
wrote, only that they agree afterwards.

The five champions before you produced 189 rows where the side was moved to the enemy and
the why was left describing the OWNER winning that stage. The row said one thing and the
sentence under it said the opposite. Those 189 rows had to be reverted.

  - You may only move a row's side if you can grounded-in-the-kit explain WHY, and you
    rewrite the why in the same proposal to match the new verdict.
  - If the packet's levelChart disagrees with the page's prose and you cannot tell which is
    right from the kit, LEAVE THE ROW ALONE and record it in notes. A stale row is a much
    smaller problem than a row that argues with itself.
  - Never change side without why. tools/regression-check.js now FAILS the champion for it.

=====================  WHAT YOU WRITE  =====================
One file per matchup: "${REPO}\\audits\\${LANE}\\<ownerKey>__<enemy>.json"
{
  "ownerKey":"...", "enemy":"...", "lane":"${LANE}",
  "audit":[{ "point":4, "status":"correct"|"needs-correction"|"missing",
             "whatIsWrong":"...", "why":"...", "corrected":"...",
             "confidence":"High"|"Medium"|"Low", "sources":["..."] }],
  "edits":[{ "layer":"content"|"full", "path":"spikes[1].text",
             "before":"<EXACT current text>", "after":"<new text>" }],
  "notes":"anything the user must know"
}
 - "before" must be the EXACT current string. The applier compares it to disk and rejects
   mismatches. Copy it; never retype it.
 - *** TO ADD SOMETHING THAT DOES NOT EXIST YET, SET "before": null. ***
   This repo carries ~370 inherited structural gaps: 135 matchups whose spikes[] has 3
   entries instead of 4, 92 matchups with no full-layer entry, 138 absent fields. They have
   never been repairable, because a normal edit needs a before-string to match and there is
   nothing on disk to match. With "before": null the applier CREATES the value.
   It is create-only: if anything is already there the edit is refused, so you cannot
   silently clobber with it. Use it when you find a genuine gap — e.g.
     { "layer":"content", "path":"spikes[3].text", "before":null, "after":"<real content>" }
   ONLY fill it with a fact you have verified from the kits. A fabricated 4th spike is far
   worse than a missing one: the gap is visible, an invention is not.
 - The audit array MUST include points 2, 3 and 4 for every matchup.
 - Write each file the moment that matchup is done — never batch to the end.
 - IDEMPOTENT: if the file already exists, SKIP that matchup entirely.
`

const PROPOSE_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['ownerKey', 'proposalsWritten', 'deferredNoData', 'unverified', 'notes'],
  properties: {
    ownerKey: { type: 'string' }, proposalsWritten: { type: 'integer' },
    deferredNoData: { type: 'array', maxItems: 60, items: { type: 'string' } },
    unverified: { type: 'array', maxItems: 30, items: { type: 'string' } },
    questionsForUser: {
      type: 'array', maxItems: 30, items: { type: 'string' },
      description: 'Questions you paused on instead of stopping. Name champion, matchup, field, and the decision needed.',
    },
    notes: { type: 'string' },
  },
}
// Slicing used to be done by each propose agent independently: every one of them ran
// coverage-report.js itself and then took indices floor(N*s/AGENTS). Because they run
// concurrently and proposals land while they work, each agent computed a DIFFERENT N and
// carved different boundaries — so slices overlapped (agents rewrote each other's files,
// observed and reported by the akali run) and also left gaps (aatrox finished with 71/71
// files on disk yet QA still counted 3 outstanding). One planner computes the list ONCE
// and the script hands each agent an explicit, disjoint enemy list. No arithmetic, no race.
const PLAN_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['ownerKey', 'enemies'],
  properties: {
    ownerKey: { type: 'string' },
    enemies: {
      type: 'array', maxItems: 200, items: { type: 'string' },
      description: 'Outstanding enemy keys for this champion, sorted alphabetically. Empty if none.',
    },
  },
}
const APPLY_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['ownerKey', 'applied', 'rejected', 'validatorPassed', 'summary'],
  properties: {
    ownerKey: { type: 'string' }, applied: { type: 'integer' }, rejected: { type: 'integer' },
    validatorPassed: { type: 'boolean' }, summary: { type: 'string' },
  },
}
const SHIP_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['ownerKey', 'shipped', 'pagesRegenerated', 'commit', 'summary'],
  properties: {
    ownerKey: { type: 'string' }, shipped: { type: 'boolean' },
    pagesRegenerated: { type: 'boolean' }, commit: { type: 'string' }, summary: { type: 'string' },
  },
}
// Watches how the agents WORKED, not what they produced. Every inefficiency found today
// was found by hand after the fact: agents bulk-reading thirty kits before writing a file,
// three agents recomputing the same slice and overwriting each other, a QA step spending
// most of a 41-minute tail manually diffing files a deterministic tool already checks.
// Its findings are injected into the NEXT champion's propose prompt, so the run adapts
// instead of repeating the same waste 50 times.
const EFFICIENCY_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['ownerKey', 'verdict', 'wasteFound', 'adviceForNextChampion'],
  properties: {
    ownerKey: { type: 'string' },
    verdict: { type: 'string', enum: ['efficient', 'some-waste', 'significant-waste'] },
    wasteFound: {
      type: 'array', maxItems: 12, items: { type: 'string' },
      description: 'Concrete observed waste with evidence, e.g. "read 30 kit files in one batch before writing any proposal".',
    },
    adviceForNextChampion: {
      type: 'array', maxItems: 6, items: { type: 'string' },
      description: 'Short imperative instructions to hand the next champion\'s agents. Empty if the run was clean.',
    },
    slowestStep: { type: 'string' },
  },
}
const QA_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['ownerKey', 'complete', 'outstanding', 'sectionsMissing', 'qualityVerdict', 'summary'],
  properties: {
    ownerKey: { type: 'string' },
    complete: { type: 'boolean', description: 'true only if coverage-report shows 0 outstanding for this champion AND every section is covered' },
    outstanding: { type: 'integer' },
    sectionsMissing: { type: 'array', maxItems: 40, items: { type: 'string' } },
    qualityVerdict: { type: 'string', enum: ['matches-benchmark', 'slightly-below', 'clearly-below'] },
    summary: { type: 'string' },
  },
}

// The tail (apply -> QA -> ship) is strictly sequential and takes ~10 min, about a third
// of each champion's wall-clock. Adding agents to it cannot help — each step needs the
// previous one's result. Instead we OVERLAP it: champion N's tail runs while champion N+1
// is already proposing. Only one tail runs at a time so the git commits stay serialised.
const out = []
let pendingTail = null
// Carries the previous champion's efficiency findings into the next champion's agents.
let efficiencyAdvice = ''

// ===================  HARD AGENT BUDGET  ===================
// A prompt cannot stop a runaway; only a counter can. On 2026-08-10 a session limit made
// one planner fail and an unlabelled `continue` re-ran it forever: 999 dead agents, the
// 1000-agent platform cap tripped, the run killed. The loop bug is fixed, but the class of
// failure is not — anything that retries can spin. So the script now counts every agent it
// spawns and stops itself long before the platform has to.
//
// Budget per champion: 1 plan (+1 retry) + AGENTS propose + apply + QA + ship + efficiency.
const PER_CHAMP_BUDGET = AGENTS + 8   // +1 for the brief builder
const GLOBAL_BUDGET = Math.min(900, PER_CHAMP_BUDGET * CHAMPS.length + 20)
let agentsUsed = 0, champAgents = 0
// QUOTA DEATH IS NOT A PER-CHAMPION PROBLEM — IT IS A RUN-ENDING ONE.
// When the account hits its spend limit every agent dies instantly on its first message.
// The runner used to treat each death as "this champion's planner failed", wait 120s, retry,
// skip, and then do the whole thing again for the NEXT champion. Measured on 2026-08-30:
// 182 of 467 agents across three runs were spend-limit corpses, each having shipped a ~40KB
// prompt for zero output, and the run crawled on for 45-60 minutes after the quota was gone.
// Two consecutive champions that cannot even be planned means the account is out, not that
// two champions are broken. Stop the run: proposals on disk are safe and resume skips them.
let deadStreak = 0
const DEAD_STREAK_ABORT = 2

// Every agent() call in this script goes through here. Nothing else may call agent directly.
const spawn = (prompt, opts) => {
  if (agentsUsed >= GLOBAL_BUDGET) {
    throw new Error(`GLOBAL AGENT BUDGET EXHAUSTED (${GLOBAL_BUDGET}) — stopping before the platform cap. Proposals on disk are safe; relaunch to resume.`)
  }
  if (champAgents >= PER_CHAMP_BUDGET) {
    throw new Error(`PER-CHAMPION BUDGET EXHAUSTED (${PER_CHAMP_BUDGET}) — this champion is looping. Skipping it.`)
  }
  agentsUsed++; champAgents++
  return agent(prompt, opts)
}
// LABELLED so a champion-level `continue` skips to the NEXT CHAMPION. Without the label,
// `continue` targets the inner `while (attempt <= MAX_RETRY)` loop, which never increments
// `attempt` — so a champion whose planner failed re-ran plan -> plan:retry forever. That is
// exactly what happened when the session limit hit during trundle: 999 failed agents, the
// 1000-agent cap tripped, and the whole run died. Never `continue` unlabelled in here.
CHAMPION: for (const champ of CHAMPS) {
  champAgents = 0            // per-champion budget resets here; global keeps counting
  log(`${champ}: starting (agents used ${agentsUsed}/${GLOBAL_BUDGET})`)
  let attempt = 0, qa = null, props = []
  while (attempt <= MAX_RETRY) {
    phase('Plan')
    const plan = await spawn(`${BASE}

YOU ARE THE PLANNER for "${champ}". Read-only. Write nothing. Be fast — this blocks the run.

List the OUTSTANDING matchups for this champion — the ones with real games that do NOT yet
have a proposal file. Scope everything to this champion; do not scan the lane.

  node -e "const fs=require('fs');const w={MC_CONTENT_EXTRA:[],MC_WR_TABLES:{},MC_REAL_GAMES:{},__mcLoaded:{}};new Function('window',fs.readFileSync('${CONTENT_DIR}/${champ.replace(/_(mid|bot|sup)$/, '')}.js','utf8'))(w);const g=w.MC_REAL_GAMES['${champ}']||{};const e=w.MC_CONTENT_EXTRA.filter(c=>c.a==='${champ}');const need=e.filter(c=>g[c.b]).map(c=>c.b);const have=new Set(fs.readdirSync('audits/${LANE}').filter(f=>f.startsWith('${champ}__')).map(f=>f.slice('${champ}__'.length,-5)));console.log(JSON.stringify(need.filter(b=>!have.has(b)).sort()))"

Return exactly that array as "enemies", sorted alphabetically. A matchup with 0 or missing
games is deferred and must NOT appear. If everything is done, return an empty array.`,
      { label: `${LANE}:${champ}:plan`, phase: 'Plan', schema: PLAN_SCHEMA, effort: 'low', model: MODEL.plan })

    // A DEAD PLANNER AND A FINISHED CHAMPION ARE NOT THE SAME THING.
    // The first version of this collapsed both into `(plan && plan.enemies) || []`, so a
    // planner that died returned "nothing outstanding" and the champion was skipped in
    // silence. The loop then raced through ~34 champions writing zero proposals, and their
    // tails dutifully reported complete=false against work that never happened.
    // agent() returns null on a terminal error, so null must be retried, never trusted.
    // A TRANSIENT PLATFORM ERROR IS NOT A FAILED PLANNER EITHER.
    // On 2026-08-24 the account hit its monthly spend limit for SIXTY-EIGHT SECONDS. In
    // that window 34 planner agents across 17 champions (brand -> naafiri) each returned
    // "You've hit your monthly spend limit", both attempts burned instantly back-to-back,
    // and all 17 were logged "PLANNER FAILED TWICE — skipping champion entirely". A blip
    // shorter than a single matchup destroyed nearly half the lane. Retrying immediately
    // is no retry at all when the cause is time-based: wait it out first.
    let plan2 = plan
    if (!plan2 || !Array.isArray(plan2.enemies)) {
      log(`${champ}: planner returned nothing — waiting 120s in case it is transient`)
      await new Promise(r => setTimeout(r, 120000))
    }
    if (!plan2 || !Array.isArray(plan2.enemies)) {
      log(`${champ}: PLANNER FAILED — retrying once before believing there is no work`)
      plan2 = await spawn(`Re-run the planner for "${champ}". Return the outstanding enemy
keys as "enemies". Repo root: "${REPO}". Content file: ${CONTENT_DIR}/${champ.replace(/_(mid|bot|sup)$/, '')}.js
Outstanding = has real games in MC_REAL_GAMES['${champ}'] AND has no file
audits/${LANE}/${champ}__<enemy>.json. Sorted alphabetically. Read only; write nothing.`,
        { label: `${LANE}:${champ}:plan:retry`, phase: 'Plan', schema: PLAN_SCHEMA, effort: 'low', model: MODEL.plan })
    }
    if (!plan2 || !Array.isArray(plan2.enemies)) {
      // Still unknown. Skipping the tail too: apply/QA/ship on a champion we could not even
      // enumerate would write a confident verdict over an unknown state.
      deadStreak++
      log(`${champ}: PLANNER FAILED TWICE — skipping champion entirely, NOT marking complete (dead streak ${deadStreak}/${DEAD_STREAK_ABORT})`)
      out.push({
        champion: champ, complete: false, shipped: false, commit: null, outstanding: null,
        questions: [], sectionsMissing: ['PLANNER FAILED — champion never audited, re-run required'],
        quality: null, summary: 'planner failed twice; no proposals attempted', attempts: attempt + 1,
      })
      if (deadStreak >= DEAD_STREAK_ABORT) {
        log(`ABORTING THE RUN: ${deadStreak} consecutive champions could not be planned. That is`
          + ` an account-level failure (spend limit / platform outage), not ${deadStreak} broken champions.`
          + ` Every agent spawned from here would die the same way. Proposals already on disk are`
          + ` safe and a relaunch skips them. Remaining: ${CHAMPS.slice(CHAMPS.indexOf(champ) + 1).join(', ') || 'none'}`)
        break CHAMPION
      }
      continue CHAMPION
    }
    deadStreak = 0            // a planner answered, so the account is alive
    const todo = plan2.enemies

    // NOTHING OUTSTANDING IS TWO DIFFERENT SITUATIONS AND THEY COST VERY DIFFERENT AMOUNTS.
    // Either the champion is finished and shipped (skip it — free), or its proposals are on
    // disk but were never applied/committed because a run died mid-tail (ship it).
    // This used to run apply + QA + ship + efficiency unconditionally, so every relaunch
    // re-verified every already-finished champion: malzahar was shipped THREE times under
    // three different commits, swain and sylas twice. One cheap triage agent tells them apart.
    if (!todo.length) {
      const slug = champ.replace(/_(mid|bot|sup)$/, '')
      const triage = await spawn(`Read-only triage for "${champ}". Repo root: "${REPO}".
Run exactly these three commands from the repo root and report what they say. Change nothing.
  1. git status --porcelain ${FULL_DIR}/${slug}.full.js ${CONTENT_DIR}/${slug}.js
  2. node tools/apply-proposals.js ${LANE} --champ ${champ}          (DRY RUN — no --write)
  3. node tools/regression-check.js ${champ} ${FULL_DIR}/${slug}.full.js ${CONTENT_DIR}/${slug}.js
"needsShip" is true if command 1 prints ANY line (uncommitted edits exist in this champion's
data files) or command 2 reports edits it would apply. It is false when the working tree is
clean for both files — that means this champion is already committed and there is nothing
to do. "gatePassed" is whether command 3 exited 0. Do not fix anything you find; report it.`,
        { label: `${LANE}:${champ}:triage`, phase: 'Plan', effort: 'low', model: MODEL.triage, schema: {
            type: 'object', additionalProperties: false,
            required: ['needsShip', 'gatePassed', 'summary'],
            properties: { needsShip: { type: 'boolean' }, gatePassed: { type: 'boolean' },
                          summary: { type: 'string' } } } })

      if (triage && triage.needsShip === false) {
        log(`${champ}: nothing outstanding and working tree clean — already shipped, skipping (saved ~4 agents)`)
        out.push({
          champion: champ, complete: true, shipped: true, commit: null, outstanding: 0,
          questions: [], sectionsMissing: [], quality: null,
          summary: 'already complete and committed before this run; not re-verified', attempts: attempt + 1,
        })
        continue CHAMPION
      }
      log(`${champ}: nothing outstanding but work is uncommitted (${triage ? triage.summary : 'triage failed'}) — running the tail to ship it`)
    }

    // Build the briefs BEFORE fanning out. Deterministic, no model, a second or two — and it
    // removes ~6 model round trips per matchup from every agent that follows.
    if (todo.length) {
      await spawn(`Run exactly this from "${REPO}" and report the one-line output. Nothing else:
  node tools/build-briefs.js ${LANE} --champ ${champ}
It writes tools/audit-run/briefs/${LANE}/${champ}__<enemy>.json — one prepared file per
outstanding matchup, so the audit agents read one file instead of gathering from six.
Do not audit anything. Do not read the briefs. Just run it and report what it printed.`,
        { label: `${LANE}:${champ}:briefs`, phase: 'Plan', effort: 'low', model: MODEL.briefs })
    }
    // Disjoint contiguous slices, computed once, from one snapshot of the list.
    const slices = Array.from({ length: AGENTS }, (_, s) =>
      todo.slice(Math.floor(todo.length * s / AGENTS), Math.floor(todo.length * (s + 1) / AGENTS)))
    log(`${champ}: ${todo.length} outstanding -> slices [${slices.map(x => x.length).join(', ')}]`)

    phase('Propose')
    props = await parallel(slices.map((mine, s) => () => !mine.length ? null :
      spawn(`${BASE}${QUALITY_BAR}${SPEC}${LAYERS}${efficiencyAdvice}

YOUR CHAMPION: "${champ}". YOU OWN SLICE ${s + 1} OF ${AGENTS}.

*** YOUR MATCHUPS — THIS EXACT LIST, NOTHING ELSE (${mine.length} of them): ***
${mine.join(', ')}

This list was computed once for the whole run and the slices are disjoint. Do NOT run
coverage-report.js, do NOT read audits/_gaps.json, do NOT recompute your own slice — a
previous run did that and three agents overwrote each other's files. Work only the names
above. If a proposal file already exists for one, skip it.

=====================  ONE READ PER MATCHUP — USE THE BRIEF  =====================
Everything you need is already gathered for you:

    tools/audit-run/briefs/${LANE}/${champ}__<enemy>.json

Read that ONE file with the Read tool and you have:
  ownerKit / enemyKit  — real ability names, per-rank cooldowns, ranges, flags, Riot's text
  packet               — winRate, games, levelChart, defects, suspectNames
  missingInteractions  — the applicable-but-unmentioned interactions for THIS matchup
  mirrorFindings       — the opponent's audit if it exists, so you restate rather than redo
  currentText          — THE EXACT CURRENT STRING of every writable path, full and content
  lintFindings         — MECHANICAL DEFECTS ALREADY FOUND IN THIS MATCHUP, by exact field

*** FIX EVERY lintFindings ENTRY IN THIS MATCHUP'S PROPOSAL. *** Each names a field and what
is wrong with it: a female enemy called "he", a Do's bullet whose body is the tradeGood line
pasted under an unrelated title, a cooldowns field with no number in it, an unfilled
<Placeholder>, a hedge, a magnitude with no source. They were computed deterministically, so
they are facts, not suggestions — and they are FREE to you: no tool call found them and none
is needed to confirm them. Fold the fix into the edit you were already writing for that
field. Do NOT run a linter yourself; that is the QA agent's single verification pass.

*** COPY "before" STRAIGHT OUT OF currentText. *** It is character-exact from disk. Retyping
it is what produced "STALE — disk differs from before" and cost mel 5 matchups and 12 edits.

DO NOT re-fetch what the brief already contains. Do not cat/ls/node -e the kits, the packet,
the content file or the full file. Measured on the darius run: 7.2 tool calls per proposal
and only ONE of them was the Write. The commands are cheap (67ms) — but every tool call is a
model round trip of roughly ten seconds, so six needless ones cost a minute per matchup.
Target: Read the brief, then Write the proposal. Two calls. Reach for anything else only
when the brief genuinely lacks what you need.

Use the real cooldown numbers — "his E is down 19s at rank 1" beats any vague advice.

Then work them ONE AT A TIME: run the 14-point audit and write the proposal file for that
matchup before starting the next. Every audit MUST cover points 2, 3 and 4.

*** DO NOT FRONT-LOAD. *** Read the enemy kit for the matchup you are working on RIGHT NOW,
audit it, write its file, then move to the next. Do NOT bulk-read kits for ten or thirty
enemies before writing anything. An agent did exactly that on aurora and produced nothing
for 13 minutes — the run looked hung, and had the spend limit killed it mid-batch every bit
of that research would have been lost. Proposals on disk are the only durable output you
have. A steady file every couple of minutes is the target; long silent stretches mean you
are doing it wrong.`,
        // effort MUST be set explicitly. Plan is 'low' and QA is 'high'; Propose was left
        // unset, so it silently defaulted to 'medium'. Measured across two runs: reasoning
        // tokens per proposal grew 5,472 -> 12,481 (2.28x) while edits per proposal grew
        // only 1.66x. Wall-clock tracks output tokens at ~85 tok/s almost exactly, and tool
        // I/O is 1.6% of Propose time — so generation volume IS the throughput. The quality
        // gains came from the DEFECT CATALOGUE, the CHART RULE and the lint gate, none of
        // which existed when this ran at 'low' and 146/hr. Do not raise this to buy quality;
        // raise the instructions instead.
        { label: `${LANE}:${champ}:${s + 1}${attempt ? ':r' + attempt : ''}`, phase: 'Propose', schema: PROPOSE_SCHEMA, effort: 'low', model: MODEL.propose })
    )).then(r => r.filter(Boolean))

    break
  }

  // Champion N's tail runs while champion N+1 proposes. Only one tail at a time,
  // so the git commits stay serialised and two appliers never race.
  const runTail = async () => {
      phase('Apply')
      const applied = await spawn(`${BASE}

  YOU ARE THE APPLIER for "${champ}". Run the tool; do not hand-edit anything.
   1. Dry run and read the rejection histogram:
        node tools/apply-proposals.js ${LANE} --champ ${champ}
   2. Apply:  node tools/apply-proposals.js ${LANE} --write --champ ${champ}
   3. Validate:  node tools/validate-content.js ${CONTENT_DIR}/${champ.replace(/_(mid|bot|sup)$/, '')}.js
      then check for NEW phase damage against the committed baseline:
        node tools/phase-check.js ${FULL_DIR}/${champ.replace(/_(mid|bot|sup)$/, '')}.full.js ${champ}
      Exit 0 means safe. The repo contains PRE-EXISTING broken entries (aatrox alone has
      singed=6, teemo=6, lucian=6 in the committed baseline) and those are NOT your fault
      and NOT a failure — the tool reports them and still exits 0. Only damage this audit
      introduced exits 1.
   4. *** NEVER RUN git checkout ON THESE FILES. *** A previous run came within one command
      of wiping ~70 matchups of applied edits to "fix" three entries that were already
      broken before the audit started. If something is wrong, REPORT IT and stop. Repair
      goes through tools/apply-proposals.js, never through discarding the file.
   5. Report applied/rejected and WHY things were rejected.
  Do NOT commit, push or deploy.`,
        { label: `${LANE}:${champ}:apply${attempt ? ':r' + attempt : ''}`, phase: 'Apply', schema: APPLY_SCHEMA, model: MODEL.apply })

      phase('SectionQA')
      qa = await spawn(`${BASE}${QUALITY_BAR}

  YOU ARE THE COMPLETION AND SECTION QA for "${champ}". Your single job is to establish,
  from evidence on disk, whether this champion is ACTUALLY finished — every matchup, every
  section, done correctly the first time. Do not take any agent's word for it.

  *** BE FAST. Everything here must be scoped to THIS champion. Lane-wide scans repeated
  per champion collapsed throughput to ~1 champion/hour — do not run them. ***

   1. COVERAGE, champion-scoped and cheap. Count this champion's matchups:
        node -e "const fs=require('fs');const w={MC_CONTENT_EXTRA:[],MC_WR_TABLES:{},MC_REAL_GAMES:{},__mcLoaded:{}};new Function('window',fs.readFileSync('${CONTENT_DIR}/${champ.replace(/_(mid|bot|sup)$/, '')}.js','utf8'))(w);const g=w.MC_REAL_GAMES['${champ}']||{};const e=w.MC_CONTENT_EXTRA.filter(c=>c.a==='${champ}');const need=e.filter(c=>g[c.b]).map(c=>c.b);const have=new Set(fs.readdirSync('audits/${LANE}').filter(f=>f.startsWith('${champ}__')).map(f=>f.slice('${champ}__'.length,-5)));const miss=need.filter(b=>!have.has(b));console.log('need '+need.length+', have '+have.size+', MISSING '+miss.length);if(miss.length)console.log(miss.slice(0,20).join(', '))"
      Any missing matchup means NOT complete. Report the number. Do NOT run coverage-report.js
      or audit-completeness.js — those scan the whole lane and are handled once per lane.

   1b. MECHANICAL LINT (MANDATORY):
         node tools/matchup-lint.js <ownerKey> <fullFile> <contentFile>
       The proposing agents were handed these findings in their briefs (the lintFindings
       array) and should have fixed them inline, so this normally confirms rather than
       discovers. Where it still reports MISGENDER, COPY_PASTE_BLEED, COOLDOWN_NO_DIGIT,
       DISPLAY_ARTIFACT, PLACEHOLDER_PHRASING, HEDGING or UNSUPPORTED_MAGNITUDE, write
       proposals and re-run until those classes are 0. They are not "pre-existing, not my
       fault" — this pass owns them.
       ITERATE FREELY. This step was measured at 12 invocations across a 159-minute run —
       0.4% of wall-clock — while cutting one champion's findings from 57 to 3. It is not
       a throughput cost and must not be traded away for speed. The QA phase also runs
       fully hidden behind the next champion's Propose window.
       TEMPLATE_SURVIVAL and CHART_ROW_GAP are visibility-only; record their counts.
       Report BEFORE and AFTER lint counts in your summary so the reduction is auditable.

   2. KEY POINTS. For a random 10 of this champion's proposal files, confirm the "audit"
      array records points 2 (lane difficulty), 3 (power spikes) and 4 (ability
      interactions). A proposal missing any of those three is incomplete work — list it.

   3. EVERY SECTION, champion-scoped. Load this champion's full file and confirm no section
      is empty or hollowed out across its matchups — tldr, winCon, enemyWin, diff, ratings,
      the level chart (phases: all 7, each with side + why), breakdown, dosFull, dontsFull,
      tradeGood, tradeBad, ahead — and on the content side win[7], whys[7], spikes[4],
      wants, early, mid, late. One node -e over the two files does this in seconds.
      Name any section that is missing or emptied.

   4. STRUCTURE. validate-content.js on THIS champion's content file only.
      *** KNOWN PRE-EXISTING EXCEPTION — DO NOT BLOCK ON IT. *** 135 matchups across 39
      files already had spikes[] with 3 entries instead of 4 BEFORE this audit began, mostly
      against locke, zaahen and masteryi. They are tracked separately and are NOT this
      champion's fault. List them in sectionsMissing so they stay visible, but they must NOT
      set complete=false — treating them as blockers means no champion ever ships and the
      entire pass produces nothing. Only NEW structural damage (a count that this audit
      changed, a parse failure, a deleted matchup, an emptied field) blocks shipping.

   5. QUALITY vs THE BAR. Read 5 rewritten matchups and grade them against the approved
      Varus vs Nilah examples above. Be harsh: hunt for fabricated ability names (check
      champ-data/_kits/), vagueness where a number belongs, an interaction gestured at
      rather than stated, text blander than what it replaced, filler, negatives, elo tiers,
      or generic AI prose that lost the user's voice.

   6. MIRROR — DO NOT LOOK. Do not open other champions' .full.js files, do not diff this
      champion's level charts against opponents', do not hunt for contradictions.
      tools/mirror-check.js and mirror-fix.js do this deterministically, lane-wide, in one
      pass — and they do it better than reading files by hand. An agent doing it manually
      spent most of a 41-minute tail on it and then failed a champion whose audit was clean.
      Mirror drift is EXPECTED after an audit and it is NOT this champion's failure.
      Say nothing about mirrors and set complete on the evidence in points 1-5 only.

  =====================  HOW TO SET complete  =====================
  *** DO NOT DECIDE THIS BY READING FILES. RUN THE TOOL. ***
        node tools/regression-check.js ${champ} ${FULL_DIR}/${champ.replace(/_(mid|bot|sup)$/, '')}.full.js ${CONTENT_DIR}/${champ.replace(/_(mid|bot|sup)$/, '')}.js

  It diffs this champion against the committed baseline and reports ONLY what this audit
  changed. Exit 0 = no regressions. Exit 1 = this audit broke something.

    complete = (outstanding is 0) AND (regression-check exits 0)

  That is the whole rule. Nothing else sets complete=false.

  This is mechanical because three separate ship gates have now failed CLEAN champions by
  judging pre-existing damage as if the audit caused it:
    - aatrox blocked on three 6-phase entries that were identical at baseline.
    - singed blocked on seven missing malphite fields — the QA agent itself wrote "proven
      PRE-EXISTING, not audit damage" in its report and STILL returned complete=false.
    - masteryi entries are missing from 71 of 72 owner files; treated absolutely, that
      single systemic gap fails every champion in the game, forever.
  Each time the instruction said "pre-existing does not count" and each time it was not
  followed. So do not reason about it: run the tool and use its exit code.

  Report everything you found in sectionsMissing regardless — pre-existing gaps, template
  survivals, the masteryi gap, rating/label mismatches. Visibility is useful; blocking is
  not. Template text in fields the audit never touched is a QUALITY signal only: put it in
  qualityVerdict, never in the complete decision.
  Be accurate rather than encouraging — a false "complete" means a matchup is silently
  skipped forever. READ ONLY: fix nothing, report everything.`,
        { label: `${LANE}:${champ}:qa${attempt ? ':r' + attempt : ''}`, phase: 'SectionQA', schema: QA_SCHEMA, effort: 'medium', model: MODEL.qa })

      if (!(qa && qa.complete)) log(`${champ}: QA says incomplete (${qa && qa.outstanding} outstanding) — not shipping`)

    // ---- Ship: only a champion that passed QA goes live ----
    let ship = null
    if (qa && qa.complete) {
      phase('Ship')
      ship = await spawn(`${BASE}

  YOU ARE THE RELEASE STEP for "${champ}", which has passed completion QA. Ship it.

  *** THIS STEP MUST BE FAST. It runs once per champion, so anything lane-wide here gets
  repeated dozens of times and starves the actual auditing. Measured: doing lane-wide work
  here dropped throughput to ~1 champion/hour. Mirror-fix and SEO page regeneration are
  LANE-level and are handled once after the lane finishes — DO NOT run them here. ***

   1. SAFETY — ONE GATE, AND IT IS BASELINE-RELATIVE:
        node tools/regression-check.js ${champ} ${FULL_DIR}/${champ.replace(/_(mid|bot|sup)$/, '')}.full.js ${CONTENT_DIR}/${champ.replace(/_(mid|bot|sup)$/, '')}.js
      Exit 0 -> ship. Exit 1 -> report shipped=false and stop.

      You MAY run validate-content.js for information, but *** ITS EXIT CODE IS NOT A SHIP
      GATE. *** It is an absolute check and the repo has 135 pre-existing 3-spike matchups
      across 39 files (mostly vs locke, zaahen, masteryi) that make it exit 1 on champions
      whose audit is perfectly clean. mel was blocked exactly this way: QA passed, zero
      regressions, and the release was refused over three spikes[] entries that have been
      wrong since before this project began. Report such findings in your summary; do not
      let them stop the ship.

      *** NEVER RUN git checkout ON THESE FILES — it discards every applied edit in them.
      If regression-check fails, report shipped=false and stop. Never repair by reverting.
   2. Do NOT run _gen_seo_pages.js. Do NOT run mirror-fix.js. Both are lane-level.
   3. Commit ONLY matchup data — with a SCOPED git add. NEVER run "git add -A" or "git add .".
    The working tree contains untracked files the user has explicitly forbidden from going
    live on matchupcoach.gg, including StudentLearningHub.html (his tutoring work, which
    must never be published here) plus brand/, imgx/, _bundle_assets/ and scratch files.
    "git add -A" would stage and publish them. Stage exact paths only:
      git add ${FULL_DIR}/${champ.replace(/_(mid|bot|sup)$/, '')}.full.js ${CONTENT_DIR}/${champ.replace(/_(mid|bot|sup)$/, '')}.js audits/${LANE}
    *** STAGE THOSE EXACT PATHS — NOT WHOLE DIRECTORIES. *** "git add champ-data" swept two
    other champions' files into the akali commit, so the history now says "akali" on a commit
    containing aatrox and akshan too. An efficiency review also caught it staging gitignored
    paths. Name the files you mean.
    Then verify nothing else slipped in:
      git status --porcelain   (anything staged outside those paths = STOP, report it)
    The user has explicitly asked that
      pricing, payment and Stripe code be left untouched — if git status shows changes to
      server.js, any Stripe/pricing/plan file, or anything payment-related, DO NOT commit
      those: report them and leave them unstaged.
        (see the exact-path git add above)
        git status --porcelain   (verify nothing unexpected is staged)
        git commit -m "Matchup audit: ${champ} — all matchups verified and shipped"
   4. Push:  git push
   5. Report the commit hash.
  Keep this whole step under a couple of minutes. No lane-wide scans, no page builds.

  If anything looks wrong, stop and report rather than shipping. A bad deploy reaches real
  users. Do not force-push, do not amend, do not touch tags.`,
        { label: `${LANE}:${champ}:ship`, phase: 'Ship', schema: SHIP_SCHEMA, model: MODEL.ship })
      log(`${champ}: ${ship && ship.shipped ? 'SHIPPED ' + (ship.commit || '') : 'NOT shipped — ' + (ship && ship.summary)}`)
    }

    // ---- Efficiency: how did the agents WORK? Feeds the next champion. ----
    // Opt-in: pass efficiency:true. See the note by the EFFICIENCY constant.
    let eff = null
    if (EFFICIENCY) {
    phase('Efficiency')
    eff = await spawn(`You are the EFFICIENCY REVIEWER for "${champ}" on MatchupCoach.gg.
REPO ROOT: "${REPO}"

You do NOT judge audit quality — another agent already did. You judge HOW THE AGENTS WORKED:
wasted tool calls, wasted tokens, wasted wall-clock. Read only; change nothing.

WHERE THE EVIDENCE IS. The agent transcripts live under:
  %USERPROFILE%\\.claude\\projects\\C--Users-Kris-Desktop\\<session>\\subagents\\workflows\\<run>\\
Find the MOST RECENTLY MODIFIED run directory (do not assume a session id — it changes every
session, and a hardcoded one silently pointed a monitoring tool at a dead folder for hours).
Each agent-*.jsonl is one agent's transcript. Identify the ones for "${champ}" by grepping
for the champion name. Analyse the tool_use blocks: what was called, how often, in what order.

WHAT COUNTS AS WASTE — look for these specifically, all observed in this run already:
  - FRONT-LOADING: bulk-reading many enemy kits before writing any proposal. Proposals on
    disk are the only durable output; a batch killed mid-flight loses everything.
  - REDUNDANT READS: the same file read repeatedly across tool calls.
  - DUPLICATED WORK: two agents touching the same matchup.
  - HAND-ROLLING WHAT A TOOL DOES: manually diffing files that mirror-check.js,
    coverage-report.js or validate-content.js already check deterministically.
  - LANE-WIDE SCANS inside a per-champion step — these collapsed throughput to
    ~1 champion/hour once before.
  - LONG SILENCES: minutes of tool calls with no proposal file written.
  - RETRY LOOPS: the same failing command repeated instead of being diagnosed.

Report only what you can point to in a transcript. If the run was clean, say so and return
an empty adviceForNextChampion — do not invent findings to look useful. Keep advice to short
imperatives that will be pasted verbatim into the next champion's agent prompt.`,
      { label: `${LANE}:${champ}:efficiency`, phase: 'Efficiency', schema: EFFICIENCY_SCHEMA })

    if (eff && eff.adviceForNextChampion && eff.adviceForNextChampion.length) {
      efficiencyAdvice = `

=====================  EFFICIENCY NOTES FROM THE PREVIOUS CHAMPION  =====================
An efficiency reviewer watched the agents on "${champ}" and found real waste. Do not repeat it:
${eff.adviceForNextChampion.map(a => '  - ' + a).join('\n')}
`
      log(`${champ}: efficiency ${eff.verdict} — ${eff.wasteFound.length} issue(s), advice passed forward`)
    } else {
      efficiencyAdvice = ''
      log(`${champ}: efficiency ${eff ? eff.verdict : 'unknown'} — nothing to carry forward`)
    }
    }

    out.push({
      champion: champ,
      efficiency: eff ? { verdict: eff.verdict, waste: eff.wasteFound, slowestStep: eff.slowestStep } : null,
      complete: !!(qa && qa.complete),
      shipped: !!(ship && ship.shipped),
      commit: ship ? ship.commit : null,
      outstanding: qa ? qa.outstanding : null,
      questions: props.flatMap(p => p.questionsForUser || []),
      sectionsMissing: qa ? qa.sectionsMissing : [],
      quality: qa ? qa.qualityVerdict : null,
      summary: qa ? qa.summary : 'no QA result',
      attempts: attempt + 1,
    })
    log(`${champ}: ${qa && qa.complete ? 'COMPLETE' : 'INCOMPLETE'} — ${qa ? qa.outstanding : '?'} outstanding, quality ${qa ? qa.qualityVerdict : '?'}`)
  }

  // A tail that throws (budget exhausted, agent death) must not take the whole run with it.
  // Champion N's tail runs while N+1 proposes, so an unhandled rejection here would kill a
  // run whose proposals are all safely on disk. Swallow, record, keep going.
  if (pendingTail) await pendingTail
  pendingTail = runTail().catch(e => {
    log(`${champ}: TAIL FAILED — ${e && e.message}. Proposals are on disk; re-run to retry the tail.`)
    out.push({
      champion: champ, complete: false, shipped: false, commit: null, outstanding: null,
      questions: [], sectionsMissing: [`TAIL FAILED: ${e && e.message}`],
      quality: null, summary: 'tail threw; champion audited but not verified or shipped', attempts: 1,
    })
  })
}

if (pendingTail) await pendingTail


return {
  lane: LANE,
  championsRun: out.length,
  shipped: out.filter(c => c.shipped).map(c => ({ champion: c.champion, commit: c.commit })),
  complete: out.filter(c => c.complete).map(c => c.champion),
  incomplete: out.filter(c => !c.complete),
  qualityBelowBar: out.filter(c => c.quality && c.quality !== 'matches-benchmark'),
  // Everything the agents paused on instead of halting — the user's question queue.
  questionsForUser: out.flatMap(c => (c.questions || []).map(q => `[${c.champion}] ${q}`)),
  detail: out,
}

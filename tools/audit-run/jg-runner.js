export const meta = {
  name: 'jungle-completion-runner',
  description: 'Audits jungle matchups champion by champion against the kits, then verifies and ships',
  phases: [
    { title: 'Plan', detail: 'one planner computes the outstanding list so slices cannot race' },
    { title: 'Propose' },
    { title: 'Apply' },
    { title: 'SectionQA' },
    { title: 'Ship' },
  ],
}

// jg-runner.js — the jungle equivalent of tools/audit-run/runner.js.
//
// SEPARATE SCRIPT ON PURPOSE. The lane runner is built around two data layers, win-rate
// packets and lane vocabulary, none of which exist in the jungle. It is also the script
// that is currently keeping bot and support shipping cleanly, so it is not the place to
// experiment. Every hard-won fix from the lane runs is carried across here deliberately:
//   - pinned model tier per role (a session on Opus turned an 11-agent champion into a
//     budget event; nothing here inherits the session model)
//   - abort the whole run after 2 consecutive unplannable champions (quota death is
//     account-level, not champion-level; 182 of 467 agents were once spend-limit corpses)
//   - a cheap triage instead of re-verifying champions that are already committed
//   - NO efficiency reviewer (it audited the audit and cost a full agent per champion)
//   - labelled CHAMPION loop, so `continue` can never target the inner while
//   - a hard agent budget, because a prompt cannot stop a runaway but a counter can
const REPO = 'C:\\Users\\Kris\\OneDrive\\CLAUDE\\New folder (2)'
const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const CHAMPS = A.champions || []
const AGENTS = A.agents || 6
const MAX_RETRY = A.maxRetry == null ? 0 : A.maxRetry
if (!CHAMPS.length) throw new Error('jg-runner: need champions[]')

const M = A.models || {}
const MODEL = {
  plan:    M.plan    || 'haiku',
  briefs:  M.briefs  || 'haiku',
  triage:  M.triage  || 'haiku',
  apply:   M.apply   || 'sonnet',
  propose: M.propose || 'sonnet',
  qa:      M.qa      || 'sonnet',
  ship:    M.ship    || 'sonnet',
}
log(`models: propose=${MODEL.propose} qa=${MODEL.qa} apply=${MODEL.apply} ship=${MODEL.ship} plan/briefs/triage=${MODEL.plan}`)

const BASE = `
PROJECT: MatchupCoach.gg — a League of Legends loading-screen coach.
REPO ROOT (quote it — spaces and parentheses): "${REPO}"
Work from the repo root. LANE: JUNGLE.

*** YOU NEVER EDIT champ-data. *** Only tools/apply-jg-proposals.js writes jungle data.
Your Write calls go to audits/jungle/ and nowhere else.

THE JUNGLE IS NOT A LANE. There is no wave, no trading stance, no CS denial. The unit of
play is the CLEAR and the MAP. Judge every matchup on: route, clear speed, duel windows,
gank threat, scuttle, objectives, invade risk.

THE DATA SHAPE — one layer, JG_DB[Owner][Enemy]:
  tldr
  stages[0..6] = { stage, adv, why }   the 7 windows:
      0 Level 1 Clear   1 Level 2 Skirmish   2 Level 3 Route   3 Levels 4-5 Macro
      4 Level 6 Breakpoint   5 First Item Spike   6 2+ Items Scaling
  start    opening clear route          scuttle  the crab contest
  topObj   Void Grubs / Rift Herald     invade   entering their jungle
  watch    what kills you               weak     playing from behind
  split    split-push role              picks    pick / teamfight role
  win      win condition

*** NO WIN RATES EXIST FOR JUNGLE. *** There is no MC_REAL_GAMES, no packet, no levelChart.
Do not quote a rate, do not infer one, do not scrape one. The kit and the clear decide it.
This also means the lane's "chart contradicts the win rate" question CANNOT arise here —
if you find yourself reaching for a rate, you have wandered out of scope.

CAMP GOLD, CAMP HP AND CLEAR TIMINGS ARE NOT IN THE BRIEF and are not in Riot's Data
Dragon. Check League Wiki, or say plainly that you could not confirm it. NEVER invent a
number. Reddit is blocked by policy.
`

const SPEC = `
=====================  THE STAGE RULE  =====================
*** stages[N].adv AND stages[N].why ARE ONE UNIT. ***
If you move the verdict you MUST rewrite the sentence under it in the SAME proposal.

This is not a style preference. In the lanes the identical defect shipped 2,410 rows in mid
and 498 in bot where the verdict named one champion and the sentence underneath argued the
other — visible on one screen, on a live page. tools/apply-jg-proposals.js REFUSES the whole
stage group when an adv edit arrives without its why, and tools/jg-regression-check.js fails
the champion for it. A stale row is a much smaller problem than a row that argues with
itself, so when you cannot ground the change in the kit, LEAVE THE ROW ALONE and say so.

The paired why is EXEMPT from the ±10% length band precisely because it has to argue the
opposite case. Do not cramp the sentence to hit a length.

=====================  WHAT COUNTS AS A CORRECTION  =====================
1. ABILITY NAMES AND NUMBERS. The brief carries both kits with real names, cooldowns and
   ranges. An invented ability name or a made-up cooldown is the worst defect class here.
2. CLEAR AND ROUTE claims that contradict the kit (an AoE clear attributed to a champion
   with no AoE; a "healthy clear" for a champion with no sustain).
3. GANK TIMING that names the wrong ability or the wrong level.
4. VERDICTS (adv) that the kit plainly contradicts.
5. GENERATED FILLER. tools/jg-deslop.js already removed the invented vocabulary
   ("camp node", "your model", "quadrant") across all 2,499 entries — do not reintroduce it,
   and do not write in that register.

=====================  WHAT NOT TO TOUCH  =====================
- \`split\` and \`picks\` are CHAMPION-LEVEL by design (4% unique across the whole lane).
  "You cannot split push with a single-target, energy-hungry kit" is true against anyone.
  Do NOT rewrite them to fake matchup-specificity.
- No elo tiers ("diamond+", "high elo"). The applier drops the WHOLE edit, not the phrase.
- No hedging filler ("generally speaking", "make sure to").
`

const PROPOSE_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['ownerKey', 'proposalsWritten', 'unverified', 'notes'],
  properties: {
    ownerKey: { type: 'string' }, proposalsWritten: { type: 'integer' },
    unverified: { type: 'array', items: { type: 'string' } },
    questionsForUser: { type: 'array', items: { type: 'string' } },
    notes: { type: 'string' },
  },
}
const PLAN_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['ownerKey', 'enemies'],
  properties: { ownerKey: { type: 'string' }, enemies: { type: 'array', items: { type: 'string' } } },
}
const APPLY_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['ownerKey', 'applied', 'rejected', 'gatePassed', 'summary'],
  properties: {
    ownerKey: { type: 'string' }, applied: { type: 'integer' }, rejected: { type: 'integer' },
    gatePassed: { type: 'boolean' }, summary: { type: 'string' },
  },
}
const QA_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['ownerKey', 'complete', 'outstanding', 'problems', 'qualityVerdict', 'summary'],
  properties: {
    ownerKey: { type: 'string' }, complete: { type: 'boolean' }, outstanding: { type: 'integer' },
    problems: { type: 'array', items: { type: 'string' } },
    qualityVerdict: { type: 'string' }, summary: { type: 'string' },
  },
}
const SHIP_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['ownerKey', 'shipped', 'commit', 'summary'],
  properties: {
    ownerKey: { type: 'string' }, shipped: { type: 'boolean' },
    commit: { type: ['string', 'null'] }, summary: { type: 'string' },
  },
}

const PER_CHAMP_BUDGET = AGENTS + 7
const GLOBAL_BUDGET = Math.min(900, PER_CHAMP_BUDGET * CHAMPS.length + 20)
let agentsUsed = 0, champAgents = 0
let deadStreak = 0
const DEAD_STREAK_ABORT = 2

const spawn = (prompt, opts) => {
  if (agentsUsed >= GLOBAL_BUDGET) throw new Error(`GLOBAL AGENT BUDGET EXHAUSTED (${GLOBAL_BUDGET})`)
  if (champAgents >= PER_CHAMP_BUDGET) throw new Error(`PER-CHAMPION BUDGET EXHAUSTED (${PER_CHAMP_BUDGET})`)
  agentsUsed++; champAgents++
  return agent(prompt, opts)
}

const out = []
let pendingTail = null

CHAMPION: for (const champ of CHAMPS) {
  champAgents = 0
  log(`${champ}: starting (agents used ${agentsUsed}/${GLOBAL_BUDGET})`)
  let qa = null, props = []

  phase('Plan')
  const plan = await spawn(`${BASE}

YOU ARE THE PLANNER for "${champ}". Read-only. Write nothing. Be fast — this blocks the run.

List the OUTSTANDING matchups: enemies in JG_DB that have no proposal file yet. Run exactly:

  node -e "const fs=require('fs');const w={};for(const f of fs.readdirSync('champ-data/jg').filter(x=>x.endsWith('.js')&&!x.startsWith('_')))try{new Function('window',fs.readFileSync('champ-data/jg/'+f,'utf8'))(w)}catch(e){};const db=w.JG_DB['${champ}']||{};const have=new Set(fs.existsSync('audits/jungle')?fs.readdirSync('audits/jungle').filter(f=>f.startsWith('${champ}__')).map(f=>f.slice('${champ}__'.length,-5)):[]);console.log(JSON.stringify(Object.keys(db).filter(e=>!have.has(e)).sort()))"

Return exactly that array as "enemies". If everything is done, return an empty array.`,
    { label: `jungle:${champ}:plan`, phase: 'Plan', schema: PLAN_SCHEMA, effort: 'low', model: MODEL.plan })

  if (!plan || !Array.isArray(plan.enemies)) {
    deadStreak++
    log(`${champ}: PLANNER FAILED — skipping (dead streak ${deadStreak}/${DEAD_STREAK_ABORT})`)
    out.push({ champion: champ, complete: false, shipped: false, commit: null,
      problems: ['PLANNER FAILED — champion never audited, re-run required'], summary: 'planner failed' })
    if (deadStreak >= DEAD_STREAK_ABORT) {
      log(`ABORTING THE RUN: ${deadStreak} consecutive champions could not be planned. That is an`
        + ` account-level failure (spend limit / outage), not ${deadStreak} broken champions. Proposals`
        + ` on disk are safe and a relaunch skips them.`)
      break CHAMPION
    }
    continue CHAMPION
  }
  deadStreak = 0
  const todo = plan.enemies

  // Nothing outstanding is two different situations at very different prices: already
  // shipped (skip, free) or proposals stranded by a dead run (ship them). One cheap agent
  // tells them apart, instead of re-running apply+QA+ship on finished champions.
  if (!todo.length) {
    const triage = await spawn(`Read-only triage for "${champ}". Repo root: "${REPO}". Change nothing.
Run these and report:
  1. git status --porcelain champ-data/jg/
  2. node tools/apply-jg-proposals.js --champ "${champ}"        (DRY RUN)
  3. node tools/jg-regression-check.js "${champ}"
"needsShip" is true if this champion's jungle file shows as modified in 1, or 2 reports edits
it would apply. False means it is already committed and there is nothing to do.
"gatePassed" is whether 3 exited 0.`,
      { label: `jungle:${champ}:triage`, phase: 'Plan', effort: 'low', model: MODEL.triage, schema: {
          type: 'object', additionalProperties: false,
          required: ['needsShip', 'gatePassed', 'summary'],
          properties: { needsShip: { type: 'boolean' }, gatePassed: { type: 'boolean' }, summary: { type: 'string' } } } })

    if (triage && triage.needsShip === false) {
      log(`${champ}: nothing outstanding and tree clean — already shipped, skipping`)
      out.push({ champion: champ, complete: true, shipped: true, commit: null, problems: [],
        summary: 'already complete and committed before this run' })
      continue CHAMPION
    }
    log(`${champ}: nothing outstanding but work is uncommitted — running the tail to ship it`)
  }

  if (todo.length) {
    await spawn(`Run exactly this from "${REPO}" and report the one-line output. Nothing else:
  node tools/jg-build-briefs.js --champ "${champ}"
It writes tools/audit-run/briefs/jungle/${champ}__<enemy>.json — one prepared file per
matchup, carrying both kits, the current text of every field, and the research checklist.
Do not audit anything. Do not read the briefs. Just run it and report what it printed.`,
      { label: `jungle:${champ}:briefs`, phase: 'Plan', effort: 'low', model: MODEL.briefs })
  }

  const slices = Array.from({ length: AGENTS }, (_, s) =>
    todo.slice(Math.floor(todo.length * s / AGENTS), Math.floor(todo.length * (s + 1) / AGENTS)))
  log(`${champ}: ${todo.length} outstanding -> slices [${slices.map(x => x.length).join(', ')}]`)

  phase('Propose')
  props = await parallel(slices.map((mine, s) => () => !mine.length ? null :
    spawn(`${BASE}${SPEC}

YOU AUDIT "${champ}" IN THE JUNGLE, these enemies ONLY: ${mine.join(', ')}

For EACH one, in order, one at a time:
 1. READ ITS BRIEF FIRST: "${REPO}\\tools\\audit-run\\briefs\\jungle\\${champ}__<enemy>.json"
    It has both kits (real ability names, cooldowns, ranges), the exact current text of
    every writable field, whether the mirror is audited, and the research checklist.
 2. WRITE THE PROPOSAL IMMEDIATELY, then move to the next enemy.
    *** DO NOT bulk-read all your briefs first. *** A lane run lost 13 minutes of work that
    way when a batch was killed mid-flight: only files on disk survive.
 3. Check the checklist items against the kits. Correct what is wrong, LEAVE ALONE what you
    cannot ground, and record what you could not verify in "unverified".

Write to: "${REPO}\\audits\\jungle\\${champ}__<enemy>.json"
{
  "ownerKey":"${champ}", "enemy":"<enemy>", "lane":"jungle",
  "edits":[{ "path":"stages[2].why", "before":"<EXACT current text>", "after":"<new text>" }],
  "notes":"anything the user must know"
}
 - "before" must be the EXACT current string, copied from the brief. Never retype it.
 - writable paths: tldr, start, scuttle, topObj, invade, watch, weak, split, picks, win,
   stages[N].adv, stages[N].why
 - to ADD something that does not exist, set "before": null.
 - MOVING stages[N].adv REQUIRES stages[N].why in the same proposal. No exceptions.

Report proposalsWritten, anything unverified, and questionsForUser for things you refused
to guess at. NEVER stop on a question — log it and keep going.`,
      { label: `jungle:${champ}:${s + 1}`, phase: 'Propose', schema: PROPOSE_SCHEMA, effort: 'low', model: MODEL.propose })))
  props = (props || []).filter(Boolean)
  log(`${champ}: proposals written ${props.reduce((a, p) => a + (p.proposalsWritten || 0), 0)}`)

  const runTail = async () => {
    phase('Apply')
    const ap = await spawn(`${BASE}

YOU APPLY AND GATE "${champ}". You do not judge content; you run the tools and report.

 1. DRY RUN:  node tools/apply-jg-proposals.js --champ "${champ}"
 2. APPLY:    node tools/apply-jg-proposals.js --champ "${champ}" --write
 3. GATE:     node tools/jg-regression-check.js "${champ}"
    Exit 0 = safe. Exit 1 = THIS audit broke something — report exactly what it named.
 4. *** NEVER RUN git checkout ON champ-data. *** It discards every applied edit in the
    file, not just the bad one. If something is wrong, REPORT IT and stop. Repair goes
    through tools/apply-jg-proposals.js, never through discarding the file.
 5. Report applied / rejected / gatePassed and WHY anything was rejected.
Do NOT commit, push or deploy.`,
      { label: `jungle:${champ}:apply`, phase: 'Apply', schema: APPLY_SCHEMA, model: MODEL.apply })

    phase('SectionQA')
    qa = await spawn(`${BASE}

YOU ARE THE QA for "${champ}". Establish from evidence on disk whether this champion is
actually finished. Do not take any agent's word for it. Scope everything to THIS champion —
lane-wide scans once collapsed throughput to ~1 champion/hour.

 1. COVERAGE — count outstanding for this champion (same command the planner used).
    Any missing matchup means NOT complete.
 2. GATE — node tools/jg-regression-check.js "${champ}". Exit 1 means complete=false and
    you must name what it flagged. Pre-existing items it lists as non-blocking are NOT
    your fault and do NOT block.
 3. SPOT-CHECK 5 matchups: are ability names real (check the kit), are stage verdicts and
    their whys arguing the SAME side, is any invented vocabulary creeping back in?
 4. Report complete, outstanding, problems[], and a qualityVerdict of
    "matches-benchmark" | "slightly-below" | "below".`,
      { label: `jungle:${champ}:qa`, phase: 'SectionQA', schema: QA_SCHEMA, effort: 'medium', model: MODEL.qa })

    let ship = null
    if (qa && qa.complete) {
      phase('Ship')
      ship = await spawn(`${BASE}

YOU SHIP "${champ}". The gate has already passed.

 1. Confirm:  node tools/jg-regression-check.js "${champ}"   (must exit 0)
 2. Stage EXACT PATHS ONLY — the champion's own jungle file:
      git add champ-data/jg/<file>.js
    *** NEVER git add -A. *** StudentLearningHub.html is the user's tutoring work and must
    never reach matchupcoach.gg. Leave brand/, imgx/, _bundle_assets/ untracked.
 3. Commit: "Jungle audit: ${champ} — all matchups verified and shipped"
    End the message with:
    Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
 4. Push:  git push
 5. Report the commit hash.
Keep this under a couple of minutes. No page builds — Netlify regenerates them on deploy.
If anything looks wrong, stop and report rather than shipping.`,
        { label: `jungle:${champ}:ship`, phase: 'Ship', schema: SHIP_SCHEMA, model: MODEL.ship })
      log(`${champ}: ${ship && ship.shipped ? 'SHIPPED ' + (ship.commit || '') : 'NOT shipped'}`)
    }

    out.push({
      champion: champ,
      complete: !!(qa && qa.complete),
      shipped: !!(ship && ship.shipped),
      commit: ship ? ship.commit : null,
      outstanding: qa ? qa.outstanding : null,
      problems: qa ? qa.problems : [],
      quality: qa ? qa.qualityVerdict : null,
      questions: props.flatMap(p => p.questionsForUser || []),
      summary: qa ? qa.summary : 'no QA result',
    })
    log(`${champ}: ${qa && qa.complete ? 'COMPLETE' : 'INCOMPLETE'} — quality ${qa ? qa.qualityVerdict : '?'}`)
  }

  // Champion N's tail overlaps champion N+1's proposals. A tail that throws must not take
  // the run with it — proposals are already safely on disk.
  if (pendingTail) await pendingTail
  pendingTail = runTail().catch(e => {
    log(`${champ}: TAIL FAILED — ${e && e.message}. Proposals are on disk; re-run to retry.`)
    out.push({ champion: champ, complete: false, shipped: false, commit: null,
      problems: [`TAIL FAILED: ${e && e.message}`], summary: 'tail threw' })
  })
}
if (pendingTail) await pendingTail

return {
  lane: 'jungle',
  championsRun: out.length,
  shipped: out.filter(c => c.shipped).map(c => ({ champion: c.champion, commit: c.commit })),
  complete: out.filter(c => c.complete).map(c => c.champion),
  incomplete: out.filter(c => !c.complete),
  questionsForUser: out.flatMap(c => (c.questions || []).map(q => `[${c.champion}] ${q}`)),
  detail: out,
}

// apply-jg-proposals.js — THE ONLY WRITER for jungle matchup data (JG_DB).
//
//   node tools/apply-jg-proposals.js                      # dry run, all junglers
//   node tools/apply-jg-proposals.js --write
//   node tools/apply-jg-proposals.js --champ "Lee Sin" --write
//
// WHY A SEPARATE TOOL FROM apply-proposals.js
// The lane applier is built around TWO layers (content win[]/spikes[] and full
// phases[]/breakdown[]) and its path regexes name lane fields that do not exist in the
// jungle schema. Jungle is ONE layer with a different shape entirely. Bolting it into the
// lane applier would mean editing the code path that is currently the only thing keeping
// bot and support shipping cleanly — so it lives here instead, with the same guarantees
// reimplemented rather than the working tool destabilised.
//
// PROPOSAL FORMAT (audits/jungle/<Owner>__<Enemy>.json), same shape as the lanes:
//   { "ownerKey":"Lee Sin", "enemy":"Graves", "lane":"jungle",
//     "audit":[...], "edits":[{ "path":"stages[2].why", "before":"<EXACT>", "after":"..." }],
//     "notes":"..." }
// Note there is no "layer" field — jungle has only one.
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const WRITE = argv.includes('--write');
const ci = argv.indexOf('--champ');
const ONLY = ci > -1 ? argv[ci + 1] : null;

const JG_DIR = 'champ-data/jg';
const AUDIT_DIR = path.join('audits', 'jungle');
const MAX_DRIFT = 0.10;
const MIN_LEN_CHECKED = 40;

// ---- the same content filters the lane applier enforces -------------------------------
// Kept byte-identical in intent: an audit that may not say "diamond+" in a lane may not
// say it in the jungle either. The apostrophe/hyphen guards matter for the same reason —
// Jax's "Grandmaster's Might" is an ability, not an elo tier.
const ELO = /\b(diamond\s*\+|master\s*\+|challenger(?![-'’])|grandmaster(?![-'’])|low\s*elo|high\s*elo)\b/i;
const NEGATIVE = /\b(does not (block|proc|apply|work|reset)|doesn['’]t (block|proc|apply|work|reset)|cannot be (cleansed|blocked|shielded)|no spell ?shield|qss does not|tenacity does not)\b/i;
const FILLER = /\b(generally speaking|make sure to|it['’]s important to|be aware that|try to remember|as a general rule)\b/i;

// ---- the jungle schema ----------------------------------------------------------------
const FLAT = ['tldr', 'start', 'scuttle', 'topObj', 'invade', 'watch', 'weak', 'split', 'picks', 'win'];
const WRITABLE = new RegExp('^(' + FLAT.join('|') + '|stages\\[\\d+\\]\\.(adv|why))$');

// "stages[4].adv" -> "4" for a given suffix, else null. Plain string work, no regex
// escaping — the lane applier lost an afternoon to a mangled regex doing exactly this.
function rowOf(p, suffix) {
  if (!p.startsWith('stages[') || !p.endsWith(']' + suffix)) return null;
  const inner = p.slice('stages['.length, p.length - (']' + suffix).length);
  return /^[0-9]+$/.test(inner) ? inner : null;
}

// A stage row is ONE UNIT: its verdict and the sentence justifying it land together or not
// at all. This is the lane bug (fixed in 41e6667a) carried across before it can happen
// again: there, phases[N].side was exempt from the length band and always landed while its
// paired why was dropped for drift, leaving 2,410 rows whose verdict contradicted their own
// text. Do not "simplify" this by dropping either half.
const isStageEdit = p => rowOf(p, '.adv') !== null || rowOf(p, '.why') !== null;

function advMovingRows(edits) {
  const rows = new Set();
  for (const e of (edits || [])) {
    if (!e || typeof e.path !== 'string') continue;
    const r = rowOf(e.path, '.adv');
    if (r !== null && e.before !== e.after) rows.add(r);
  }
  return rows;
}

function checkEdit(e, advRows) {
  const errs = [];
  if (!e || typeof e.path !== 'string') return ['malformed edit'];
  if (typeof e.after !== 'string') return ['`after` must be a string'];
  if (!WRITABLE.test(e.path)) errs.push(`path not writable (${e.path})`);

  const b = String(e.before ?? '');
  // `adv` is a short label ("Even Skirmish" -> "Lee Sin Favored"): its length is whatever
  // the verdict happens to be, so the prose band is meaningless on it — same reasoning as
  // ENUM_FIELD in the lane applier. And a `why` being rewritten BECAUSE its row's verdict
  // moved has to argue the opposite case, which legitimately changes its length.
  const isAdv = rowOf(e.path, '.adv') !== null;
  const whyRow = rowOf(e.path, '.why');
  const pairedWithAdvMove = whyRow !== null && advRows.has(whyRow);
  if (!isAdv && !pairedWithAdvMove && b.length >= MIN_LEN_CHECKED) {
    const drift = Math.abs(e.after.length - b.length) / b.length;
    if (drift > MAX_DRIFT) errs.push(`length drift ${(drift * 100).toFixed(1)}%`);
  }

  if (ELO.test(e.after)) errs.push('mentions an elo tier');
  if (NEGATIVE.test(e.after)) errs.push('states a non-interaction');
  if (FILLER.test(e.after)) errs.push('contains filler');
  return errs;
}

// ---- owner -> file resolution ----------------------------------------------------------
// A slug cannot do this: "Nunu & Willump" lives in nunu.js, not nunuwillump.js. Load each
// file and ask it which owner it defines.
function buildOwnerMap() {
  const map = new Map();
  for (const f of fs.readdirSync(JG_DIR).filter(x => x.endsWith('.js') && !x.startsWith('_'))) {
    const w = {};
    try { new Function('window', fs.readFileSync(path.join(JG_DIR, f), 'utf8'))(w); } catch (e) { continue; }
    for (const owner of Object.keys(w.JG_DB || {})) map.set(owner, f);
  }
  return map;
}

// The payload is a single JSON object literal after `window.JG_DB[<quoted owner>] =`.
// Keys appear both single- and double-quoted across files, so find the assignment by the
// owner string rather than by a fixed quote character.
function readOwner(file, owner) {
  const src = fs.readFileSync(path.join(JG_DIR, file), 'utf8');
  let at = -1;
  for (const q of ["'", '"']) {
    const needle = `window.JG_DB[${q}${owner}${q}]`;
    const i = src.indexOf(needle);
    if (i !== -1) { at = i + needle.length; break; }
  }
  if (at === -1) return null;
  const eq = src.indexOf('=', at);
  if (eq === -1) return null;
  const body = src.slice(eq + 1).trim().replace(/;\s*$/, '');
  let obj;
  try { obj = JSON.parse(body); } catch (e) { return null; }
  return { src, prefix: src.slice(0, eq + 1), obj };
}

function writeOwner(file, parsed) {
  fs.writeFileSync(path.join(JG_DIR, file), parsed.prefix + ' ' + JSON.stringify(parsed.obj) + ';\n');
}

function accessor(entry, p, create = false) {
  const m = p.match(/^stages\[(\d+)\]\.(adv|why)$/);
  if (m) {
    const i = +m[1];
    if (!Array.isArray(entry.stages)) return null;
    if (!entry.stages[i]) { if (!create) return null; entry.stages[i] = {}; }
    return { get: () => entry.stages[i][m[2]], set: v => { entry.stages[i][m[2]] = v; } };
  }
  if (!FLAT.includes(p)) return null;
  return { get: () => entry[p], set: v => { entry[p] = v; } };
}

// ---- run --------------------------------------------------------------------------------
if (!fs.existsSync(AUDIT_DIR)) {
  console.error(`no ${AUDIT_DIR}/ — nothing to apply. (Proposals go there, one file per matchup.)`);
  process.exit(0);
}
const ownerMap = buildOwnerMap();
const files = fs.readdirSync(AUDIT_DIR).filter(f => f.endsWith('.json') && !f.startsWith('_'));

let applied = 0, rejected = 0, alreadyDone = 0, matchups = 0;
const dirty = new Map();   // file -> parsed
const problems = [];

for (const pf of files) {
  let p;
  try { p = JSON.parse(fs.readFileSync(path.join(AUDIT_DIR, pf), 'utf8')); } catch (e) {
    problems.push(`${pf}: unreadable proposal (${e.message})`); continue;
  }
  const owner = p.ownerKey, enemy = p.enemy;
  if (!owner || !enemy) { problems.push(`${pf}: missing ownerKey/enemy`); continue; }
  if (ONLY && owner !== ONLY) continue;

  const file = ownerMap.get(owner);
  if (!file) { problems.push(`${pf}: no jungle file defines owner "${owner}"`); continue; }

  if (!dirty.has(file)) {
    const parsed = readOwner(file, owner);
    if (!parsed) { problems.push(`${pf}: could not parse ${file} for "${owner}"`); continue; }
    dirty.set(file, parsed);
  }
  const parsed = dirty.get(file);
  const entry = parsed.obj[enemy];
  if (!entry) { problems.push(`${pf}: ${owner} has no entry for "${enemy}"`); continue; }

  matchups++;
  const advRows = advMovingRows(p.edits);

  // A verdict move with no rewritten why is refused outright. The lane run proved a prompt
  // cannot hold this line: 498 of 1,184 side moves arrived with no why at all, every one a
  // row that would argue with itself on a live page. A stale row beats a self-contradicting
  // one, so the whole stage group is dropped and the reason is reported.
  const whyRowsGiven = new Set();
  for (const e of (p.edits || [])) {
    const r = typeof e.path === 'string' ? rowOf(e.path, '.why') : null;
    if (r !== null) whyRowsGiven.add(r);
  }
  const stageErrs = [];
  for (const r of advRows) {
    if (!whyRowsGiven.has(r)) {
      stageErrs.push(`[stages[${r}].adv] moves the verdict but proposes no stages[${r}].why — `
        + `the row would contradict its own text. Rewrite the why in the same proposal, or leave the row.`);
    }
  }

  const pending = [], stagePending = [], errs = [];
  for (const e of (p.edits || [])) {
    const stage = typeof e.path === 'string' && isStageEdit(e.path);
    const fail = msg => (stage ? stageErrs : errs).push(`[${e.path}] ${msg}`);
    const bad = checkEdit(e, advRows);
    if (bad.length) { fail(bad.join('; ')); continue; }
    const acc = accessor(entry, e.path, e.before === null);
    if (!acc) { fail('path does not resolve'); continue; }
    const cur = acc.get();
    if (cur === e.after) { alreadyDone++; continue; }
    if (e.before === null) {
      if (cur != null && String(cur).length) { fail('create-mode edit but a value already exists'); continue; }
    } else if (cur !== e.before) {
      fail(`STALE — disk differs from "before"`); continue;
    }
    (stage ? stagePending : pending).push({ acc, after: e.after, path: e.path });
  }

  // stage edits are atomic as a group; everything else lands independently
  if (stageErrs.length) {
    rejected += stagePending.length + stageErrs.length;
    problems.push(`${owner} vs ${enemy}: ${stageErrs.length} stage edit(s) dropped as a group`);
    for (const m of stageErrs.slice(0, 3)) problems.push(`    ${m}`);
  } else {
    for (const x of stagePending) { x.acc.set(x.after); applied++; }
  }
  for (const x of pending) { x.acc.set(x.after); applied++; }
  if (errs.length) {
    rejected += errs.length;
    problems.push(`${owner} vs ${enemy}: ${errs.length} edit(s) dropped`);
    for (const m of errs.slice(0, 3)) problems.push(`    ${m}`);
  }
}

if (WRITE) for (const [file, parsed] of dirty) writeOwner(file, parsed);

console.log(`=== apply-jg-proposals${WRITE ? '' : ' — DRY RUN'} ===`);
console.log(`matchups seen        : ${matchups}`);
console.log(`edits applied        : ${applied}`);
console.log(`edits already in place: ${alreadyDone}`);
console.log(`edits rejected       : ${rejected}`);
if (problems.length) {
  console.log('\n--- problems ---');
  for (const m of problems.slice(0, 40)) console.log('  ' + m);
  if (problems.length > 40) console.log(`  ...and ${problems.length - 40} more`);
}
if (!WRITE) console.log('\nre-run with --write to apply.');

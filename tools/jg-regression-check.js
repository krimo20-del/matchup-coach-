// jg-regression-check.js — THE SHIP GATE for jungle. Baseline-relative, never absolute.
//
//   node tools/jg-regression-check.js "Lee Sin"            # vs committed HEAD
//   node tools/jg-regression-check.js "Lee Sin" <ref>      # vs another baseline
//
// exit 0 = safe to ship. exit 1 = THIS audit broke something.
//
// THE GATE RULE, learned five times the hard way in the lanes: every check here diffs
// against the committed baseline and fails ONLY on damage this audit caused. Never assert
// an absolute invariant. This repo carries inherited defects that no audit will ever clean,
// and five separate lane gates failed clean champions over them — a phases!=7 check, a
// spikes!=4 check, a missing-field check, a missing-masteryi check, and validate-content's
// exit code. Jungle has its own inherited mess (2,499 generated entries) and would trip an
// absolute gate on every single champion.
//
// WHAT IT CHECKS
//  1. COHERENCE — a stage whose `adv` moved while its `why` is byte-identical to baseline.
//     This is the jungle form of the defect that produced 2,410 broken rows in mid and 498
//     in bot: the verdict says one champion, the sentence under it argues the other. The
//     rule needs no enum — only "did this field change" — which is why `adv` was left as
//     free text rather than normalised across all 17,493 rows.
//  2. STRUCTURE LOSS — a field that had content at baseline and is now empty or missing.
//  3. STAGE COUNT — stages dropped or added relative to baseline (never an absolute 7).
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OWNER = process.argv[2];
const BASE_REF = process.argv[3] || 'HEAD';
if (!OWNER) {
  console.error('usage: node tools/jg-regression-check.js "<Owner>" [baselineRef]');
  process.exit(2);
}
const JG_DIR = 'champ-data/jg';
const FLAT = ['tldr', 'start', 'scuttle', 'topObj', 'invade', 'watch', 'weak', 'split', 'picks', 'win'];

function loadFrom(getSrc) {
  const w = {};
  for (const f of fs.readdirSync(JG_DIR).filter(x => x.endsWith('.js') && !x.startsWith('_'))) {
    let src;
    try { src = getSrc(f); } catch (e) { continue; }   // file may not exist at baseline
    if (src == null) continue;
    try { new Function('window', src)(w); } catch (e) {}
  }
  return w.JG_DB || {};
}

const now = loadFrom(f => fs.readFileSync(path.join(JG_DIR, f), 'utf8'));
let base;
try {
  base = loadFrom(f => {
    try {
      return execSync(`git show ${BASE_REF}:${JG_DIR}/${f}`, { encoding: 'utf8', maxBuffer: 1e9, stdio: ['pipe', 'pipe', 'ignore'] });
    } catch (e) { return null; }
  });
} catch (e) {
  console.error('could not read baseline ' + BASE_REF + ': ' + e.message);
  process.exit(2);
}

const cur = now[OWNER], old = base[OWNER];
if (!cur) { console.error(`no current data for "${OWNER}"`); process.exit(2); }
if (!old) {
  console.log(`"${OWNER}" does not exist at ${BASE_REF} — new owner, nothing to regress against.`);
  process.exit(0);
}

const regressions = [], preexisting = [];

for (const enemy of Object.keys(cur)) {
  const c = cur[enemy], b = old[enemy];
  if (!b) continue;                       // new matchup, nothing to compare

  // 1. coherence
  const cs = c.stages || [], bs = b.stages || [];
  for (let i = 0; i < Math.min(cs.length, bs.length); i++) {
    const advMoved = cs[i].adv !== bs[i].adv;
    const whySame = cs[i].why === bs[i].why;
    if (advMoved && whySame) {
      regressions.push(`coherence: ${enemy} stage ${i} — adv moved "${bs[i].adv}" -> "${cs[i].adv}" `
        + `but why is unchanged and still reads as written for the old verdict. Change the pair or leave the row.`);
    }
  }

  // 2. structure loss
  for (const k of FLAT) {
    const had = b[k] != null && String(b[k]).trim().length > 0;
    const has = c[k] != null && String(c[k]).trim().length > 0;
    if (had && !has) regressions.push(`lost content: ${enemy}.${k} had text at baseline and is now empty`);
    if (!had && !has) preexisting.push(`${enemy}.${k} was already empty at baseline`);
  }
  for (let i = 0; i < Math.min(cs.length, bs.length); i++) {
    for (const k of ['adv', 'why']) {
      const had = bs[i][k] != null && String(bs[i][k]).trim().length > 0;
      const has = cs[i][k] != null && String(cs[i][k]).trim().length > 0;
      if (had && !has) regressions.push(`lost content: ${enemy} stage ${i}.${k} emptied`);
    }
  }

  // 3. stage count, relative
  if (cs.length !== bs.length) {
    regressions.push(`stage count: ${enemy} had ${bs.length} stages at baseline, now ${cs.length}`);
  }
}

// matchups that vanished entirely
for (const enemy of Object.keys(old)) {
  if (!cur[enemy]) regressions.push(`lost matchup: ${enemy} existed at baseline and is gone`);
}

console.log(`=== jg-regression-check: ${OWNER}  (baseline ${BASE_REF}) ===`);
console.log(`matchups compared : ${Object.keys(cur).length}`);
if (preexisting.length) {
  console.log(`\npre-existing, NOT blocking (${preexisting.length}):`);
  for (const m of preexisting.slice(0, 5)) console.log('    · ' + m);
  if (preexisting.length > 5) console.log(`    · ...and ${preexisting.length - 5} more`);
}
if (regressions.length) {
  console.log(`\n  REGRESSIONS INTRODUCED BY THIS AUDIT (${regressions.length}):`);
  for (const m of regressions.slice(0, 25)) console.log('    ! ' + m);
  if (regressions.length > 25) console.log(`    ! ...and ${regressions.length - 25} more`);
  console.log('\nFAIL — do not ship. Repair via tools/apply-jg-proposals.js.');
  console.log('Do NOT git checkout the file: that discards every good edit in it too.');
  process.exit(1);
}
console.log('\nOK — this audit introduced no regressions. Pre-existing gaps are tracked, not blocking.');
process.exit(0);

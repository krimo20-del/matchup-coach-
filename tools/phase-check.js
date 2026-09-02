#!/usr/bin/env node
/**
 * phase-check.js — does this champion's full file have NEW phase damage?
 *
 * WHY THIS EXISTS
 *   The Apply and Ship steps used to assert "every matchup has exactly 7 phases" in an
 *   inline node -e. That is an absolute check, and the repo has pre-existing entries that
 *   fail it: aatrox has singed=6, teemo=6, lucian=6 in the committed baseline, untouched
 *   by any audit. The absolute check failed a champion whose audit was clean, and the Ship
 *   agent was one step away from running `git checkout` to "fix" it — which would have
 *   thrown away the whole champion's applied edits to repair damage it did not cause.
 *
 *   So: compare the working tree against the committed baseline and fail ONLY on damage
 *   this audit introduced. Pre-existing breakage is reported and passed through, exactly
 *   how the known 135 three-spike defects are handled.
 *
 * Usage:  node tools/phase-check.js <fullFile> <ownerKey> [baselineRef]
 * Exit 0 = safe (no new damage).  Exit 1 = NEW damage, do not ship.
 */

const fs = require('fs');
const { execFileSync } = require('child_process');
const path = require('path');

const [fullFile, ownerKey, baseRef = 'HEAD'] = process.argv.slice(2);
if (!fullFile || !ownerKey) {
  console.error('usage: node tools/phase-check.js <fullFile> <ownerKey> [baselineRef]');
  process.exit(2);
}

const EXPECTED = 7;

function phaseCounts(source, label) {
  const w = {};
  try {
    new Function('window', source)(w);
  } catch (e) {
    console.error(`FAIL: ${label} does not parse — ${e.message}`);
    process.exit(1);
  }
  const m = w.CHAMP_FULL && w.CHAMP_FULL[ownerKey];
  if (!m) {
    console.error(`FAIL: ${label} has no CHAMP_FULL['${ownerKey}']`);
    process.exit(1);
  }
  const counts = {};
  for (const [enemy, entry] of Object.entries(m)) {
    counts[enemy] = Array.isArray(entry.phases) ? entry.phases.length : 0;
  }
  return counts;
}

const working = phaseCounts(fs.readFileSync(fullFile, 'utf8'), 'working tree');

let baseline = null;
try {
  const repoRel = path.relative(path.resolve(__dirname, '..'), path.resolve(fullFile))
    .replace(/\\/g, '/');
  const src = execFileSync('git', ['show', `${baseRef}:${repoRel}`], {
    cwd: path.resolve(__dirname, '..'), encoding: 'utf8', maxBuffer: 64 * 1024 * 1024,
  });
  baseline = phaseCounts(src, `baseline ${baseRef}`);
} catch {
  // No baseline (new file, or not in git yet) — fall back to the absolute rule, since
  // without a comparison point every deviation has to be treated as suspect.
  console.log(`no baseline at ${baseRef} — falling back to absolute check`);
}

const preExisting = [], introduced = [], repaired = [];
for (const [enemy, n] of Object.entries(working)) {
  if (n === EXPECTED) {
    if (baseline && baseline[enemy] !== undefined && baseline[enemy] !== EXPECTED) {
      repaired.push(`${enemy} ${baseline[enemy]}->7`);
    }
    continue;
  }
  const was = baseline ? baseline[enemy] : undefined;
  if (was !== undefined && was === n) preExisting.push(`${enemy}=${n}`);
  else introduced.push(`${enemy}=${n}${was !== undefined ? ` (was ${was})` : ' (new matchup)'}`);
}

// A matchup vanishing is real damage even though it has no phase count to inspect.
const deleted = baseline ? Object.keys(baseline).filter(e => working[e] === undefined) : [];

console.log(`${ownerKey}: ${Object.keys(working).length} matchups`);
if (repaired.length) console.log(`  repaired by this audit: ${repaired.join(', ')}`);
if (preExisting.length) console.log(`  PRE-EXISTING (not blocking): ${preExisting.join(', ')}`);
if (introduced.length) console.log(`  NEW DAMAGE: ${introduced.join(', ')}`);
if (deleted.length) console.log(`  DELETED MATCHUPS: ${deleted.join(', ')}`);

if (introduced.length || deleted.length) {
  console.error('\nFAIL — this audit introduced phase damage. Do NOT ship.');
  console.error('Repair via tools/apply-proposals.js. Do NOT git checkout: the applied');
  console.error('edits for every other matchup in this file would go with it.');
  process.exit(1);
}
console.log('\nOK — no new phase damage. Pre-existing breakage is tracked, not blocking.');
process.exit(0);

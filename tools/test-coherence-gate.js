// Prove the coherence block in tools/regression-check.js actually FIRES on the defect
// it was written for. Passing on clean data proves nothing — a check that can never
// trigger looks identical to a check that always passes.
//
// The block is extracted from the real file (not retyped) and run against synthetic
// entries, so this tests the shipped code path.
const fs = require('fs');
const SRC = fs.readFileSync('C:/Users/Kris/OneDrive/CLAUDE/New folder (2)/tools/regression-check.js', 'utf8');

const start = SRC.indexOf('// --- SIDE/WHY COHERENCE');
const end = SRC.indexOf('// --- report ---');
if (start < 0 || end < 0) { console.error('could not locate the block'); process.exit(1); }
const block = SRC.slice(start, end);
console.log('extracted block: ' + block.split('\n').length + ' lines\n');

function run(ownerKey, wFull, bFull) {
  const regressions = [];
  new Function('ownerKey', 'wFull', 'bFull', 'regressions', block)(ownerKey, wFull, bFull, regressions);
  return regressions;
}

const WHY_OWNER = 'Charm online — the lane\u2019s first kill threat.';
const WHY_NEW = 'Syndra out-ranges the orb and shoves first.';
const mk = (side, why) => ({ phases: [{ side, why }] });

const cases = [
  { name: 'DEFECT: side Skill -> enemy, why unchanged',
    w: { syndra: mk('Syndra', WHY_OWNER) }, b: { syndra: mk('Skill', WHY_OWNER) }, expect: true },
  { name: 'DEFECT: side owner -> enemy, why unchanged',
    w: { syndra: mk('Syndra', WHY_OWNER) }, b: { syndra: mk('Ahri', WHY_OWNER) }, expect: true },
  { name: 'OK: side -> enemy AND why rewritten (proper pair)',
    w: { syndra: mk('Syndra', WHY_NEW) }, b: { syndra: mk('Skill', WHY_OWNER) }, expect: false },
  { name: 'OK: side moved toward owner, why unchanged (a correction)',
    w: { syndra: mk('Ahri', WHY_OWNER) }, b: { syndra: mk('Skill', WHY_OWNER) }, expect: false },
  { name: 'OK: side moved to Skill, why unchanged',
    w: { syndra: mk('Skill', WHY_OWNER) }, b: { syndra: mk('Syndra', WHY_OWNER) }, expect: false },
  { name: 'OK: nothing changed',
    w: { syndra: mk('Syndra', WHY_OWNER) }, b: { syndra: mk('Syndra', WHY_OWNER) }, expect: false },
  { name: 'OK: already wrong at baseline (pre-existing, not ours)',
    w: { syndra: mk('Syndra', WHY_OWNER) }, b: { syndra: mk('Syndra', WHY_OWNER) }, expect: false },
];

let pass = 0, fail = 0;
for (const c of cases) {
  const got = run('ahri_mid', c.w, c.b);
  const fired = got.length > 0;
  const ok = fired === c.expect;
  ok ? pass++ : fail++;
  console.log((ok ? '  PASS  ' : '  FAIL  ') + c.name);
  console.log('        expected fire=' + c.expect + ', got fire=' + fired + (fired ? '\n        -> ' + got[0].slice(0, 110) : ''));
}
console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);

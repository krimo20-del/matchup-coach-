// jg-revert-unpaired.js — restore stage verdicts that were changed without their why.
//
//   node tools/jg-revert-unpaired.js "Xin Zhao"            # dry run
//   node tools/jg-revert-unpaired.js "Xin Zhao" --write
//   node tools/jg-revert-unpaired.js "Xin Zhao" --write --baseline <ref>
//
// WHY THIS EXISTS
// apply-jg-proposals.js refuses a stages[N].adv edit that arrives without a matching
// stages[N].why — that rule is what keeps a row from claiming one winner over a sentence
// arguing the other. But it also refuses the REVERT, because a revert is itself an unpaired
// adv change. That leaves exactly one way out of an unpaired edit: forward, by writing a new
// why. For a genuine correction that is right. For a cosmetic trim it is not — inventing a
// prose change purely to satisfy a gate is gaming the gate, not fixing the data.
//
// So this does the one thing the applier cannot: it puts the verdict back to its committed
// value. That is provably safe in a way a forward edit is not — the baseline is a state
// where adv and why already agreed, because it passed the gate when it was committed.
//
// It will ONLY touch a row where:
//   - adv differs from baseline, AND
//   - why is byte-identical to baseline
// i.e. precisely the rows jg-regression-check flags as unpaired. A row whose why was also
// rewritten is a real edit and is left alone.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const argv = process.argv.slice(2);
const OWNER = argv.find(a => !a.startsWith('--'));
const WRITE = argv.includes('--write');
const bi = argv.indexOf('--baseline');
const BASE_REF = bi > -1 ? argv[bi + 1] : 'HEAD';
if (!OWNER) {
  console.error('usage: node tools/jg-revert-unpaired.js "<Owner>" [--write] [--baseline <ref>]');
  process.exit(2);
}
const JG_DIR = 'champ-data/jg';

function ownerFile(owner) {
  for (const f of fs.readdirSync(JG_DIR).filter(x => x.endsWith('.js') && !x.startsWith('_'))) {
    const w = {};
    try { new Function('window', fs.readFileSync(path.join(JG_DIR, f), 'utf8'))(w); } catch (e) { continue; }
    if (w.JG_DB && w.JG_DB[owner]) return f;
  }
  return null;
}
const file = ownerFile(OWNER);
if (!file) { console.error(`no jungle file defines "${OWNER}"`); process.exit(2); }

const src = fs.readFileSync(path.join(JG_DIR, file), 'utf8');
const m = src.match(/window\.JG_DB\[(['"])([\s\S]*?)\1\]\s*=/);
if (!m) { console.error('could not find the JG_DB assignment'); process.exit(2); }
const eq = src.indexOf('=', src.indexOf(m[0]));
let cur;
try { cur = JSON.parse(src.slice(eq + 1).trim().replace(/;\s*$/, '')); }
catch (e) { console.error('current payload does not parse: ' + e.message); process.exit(2); }

let baseSrc;
try { baseSrc = execSync(`git show ${BASE_REF}:${JG_DIR}/${file}`, { encoding: 'utf8', maxBuffer: 1e9 }); }
catch (e) { console.error(`could not read ${BASE_REF}:${JG_DIR}/${file}`); process.exit(2); }
const bw = {};
try { new Function('window', baseSrc)(bw); } catch (e) { console.error('baseline does not parse'); process.exit(2); }
const base = (bw.JG_DB || {})[OWNER];
if (!base) { console.error(`"${OWNER}" not present at ${BASE_REF}`); process.exit(2); }

const reverted = [];
for (const enemy of Object.keys(cur)) {
  const c = cur[enemy], b = base[enemy];
  if (!b || !Array.isArray(c.stages) || !Array.isArray(b.stages)) continue;
  for (let i = 0; i < Math.min(c.stages.length, b.stages.length); i++) {
    const advMoved = c.stages[i].adv !== b.stages[i].adv;
    const whySame = c.stages[i].why === b.stages[i].why;
    if (advMoved && whySame) {
      reverted.push(`${enemy} stage ${i}: "${c.stages[i].adv}" -> "${b.stages[i].adv}"`);
      c.stages[i].adv = b.stages[i].adv;
    }
  }
}

console.log(`=== jg-revert-unpaired: ${OWNER}${WRITE ? '' : ' — DRY RUN'} (baseline ${BASE_REF}) ===`);
if (!reverted.length) { console.log('nothing to revert — no unpaired verdict changes found.'); process.exit(0); }
for (const r of reverted) console.log('  ' + r);
console.log(`\n${reverted.length} verdict(s) restored to baseline.`);
if (WRITE) {
  fs.writeFileSync(path.join(JG_DIR, file), src.slice(0, eq + 1) + ' ' + JSON.stringify(cur) + ';\n');
  console.log('written. Re-run jg-regression-check to confirm.');
} else {
  console.log('re-run with --write to apply.');
}

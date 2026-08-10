// scratch proposal writer: reads exact "before" from disk so it can never mismatch.
// usage: node _singed_mk.js <specfile.json>
global.window = global;
require('../champ-data/singed.full.js');
require('../champ-data/content/singed.js');
const fs = require('fs');
const F = global.CHAMP_FULL.singed;
const CA = global.MC_CONTENT_EXTRA.filter(x => x && x.a === 'singed');
const ENUM = /^(win\[\d\]|phases\[\d\]\.side|phases\[\d\]\.rating|phases\[\d\]\.label|diff|diffRating|carryRating|tone|focus\.letters\[\d\])$/;

function get(obj, path) {
  return path.split('.').reduce((o, seg) => {
    const m = seg.match(/^([A-Za-z0-9_]+)((\[\d+\])*)$/);
    let cur = o == null ? undefined : o[m[1]];
    for (const i of (m[2].match(/\d+/g) || [])) cur = cur == null ? undefined : cur[+i];
    return cur;
  }, obj);
}

const spec = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const root = { full: F[spec.enemy], content: CA.find(x => x.b === spec.enemy) };
const out = { ownerKey: 'singed', enemy: spec.enemy, lane: 'top', audit: spec.audit, edits: [], notes: spec.notes || '' };
let fail = 0;
for (const e of spec.edits) {
  const before = get(root[e.layer], e.path);
  if (before === undefined) { console.log('!! NO SUCH PATH', e.layer, e.path); fail++; continue; }
  if (e.sub) { let a = before; for (const [f, t] of e.sub) a = a.split(f).join(t); e.after = a; }
  if (before === e.after) { console.log('!! NOOP', e.path); fail++; continue; }
  if (!ENUM.test(e.path) && before.length >= 25) {
    const d = (e.after.length - before.length) / before.length;
    if (Math.abs(d) > 0.10) { console.log('!! LENGTH', e.path, before.length, '->', e.after.length, (d * 100).toFixed(1) + '%'); fail++; continue; }
  }
  out.edits.push({ layer: e.layer, path: e.path, before, after: e.after });
}
if (fail) { console.log('ABORT: ' + fail + ' bad edits'); process.exit(1); }
fs.writeFileSync('./top/singed__' + spec.enemy + '.json', JSON.stringify(out, null, 1));
console.log('wrote singed__' + spec.enemy + '.json with ' + out.edits.length + ' edits');

// scratch validator for singed proposals (audits/ only, read-only against champ-data)
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
    if (!m) return undefined;
    let cur = o == null ? undefined : o[m[1]];
    const idx = m[2].match(/\d+/g) || [];
    for (const i of idx) cur = cur == null ? undefined : cur[+i];
    return cur;
  }, obj);
}

let bad = 0, ok = 0;
for (const f of fs.readdirSync('./top').filter(n => n.startsWith('singed__'))) {
  const j = JSON.parse(fs.readFileSync('./top/' + f, 'utf8'));
  const root = { full: F[j.enemy], content: CA.find(x => x.b === j.enemy) };
  for (const e of j.edits) {
    const cur = get(root[e.layer], e.path);
    if (cur !== e.before) { bad++; console.log('MISMATCH', f, e.path, '\n  disk:', JSON.stringify(cur), '\n  said:', JSON.stringify(e.before)); continue; }
    if (!ENUM.test(e.path) && e.before.length >= 25) {
      const d = (e.after.length - e.before.length) / e.before.length;
      if (Math.abs(d) > 0.10) { bad++; console.log('LENGTH', f, e.path, e.before.length, '->', e.after.length, (d * 100).toFixed(1) + '%'); continue; }
    }
    ok++;
  }
}
console.log('ok=' + ok + ' bad=' + bad);

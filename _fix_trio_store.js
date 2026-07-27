// Align the favour-timeline store with the newly merged trio matchups.
//
// The store held BOTH directions of each pair, but for the 2026 additions only
// the trio's own direction was ever authored (e.g. store['zaahen']['aatrox'] is
// the researched array) while the reverse (store['aatrox']['zaahen']) was left
// as an all-"Skill" placeholder. Since the store wins at render time, those
// stubs would flatten a real matchup to "even at every stage" — and the two
// directions of one matchup would disagree with each other.
//
// Fix: for every merged matchup, write the CONTENT's win array into the store.
// The content array is the researched one (it came from the trio champ's own
// entry), so this makes both directions identical and non-placeholder.
const fs = require('fs');
const P = 'champ-data/_label-text-fixes.js';
let src = fs.readFileSync(P, 'utf8');
const mark = 'var FIX = ';
const at = src.indexOf(mark);
if (at < 0) throw new Error('FIX marker not found');
const end = src.indexOf(';', at);
const FIX = JSON.parse(src.slice(at + mark.length, end));

global.window = {};
new Function('window', fs.readFileSync('champ-data/rosters.js', 'utf8'))(global.window);
const slug = n => n.toLowerCase().replace(/[^a-z0-9]/g, '');
const tops = []; global.window.ROSTERS.top.forEach(g => g.c.forEach(n => tops.push(slug(n))));
const TRIO = ['locke', 'zaahen', 'masteryi'];

const isStub = a => Array.isArray(a) && a.length === 7 && a.every(x => x === 'Skill');

let written = 0, agreed = 0, stubsReplaced = 0, mirrorsKept = 0;
for (const s of tops) {
  const w = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
  new Function('window', fs.readFileSync('champ-data/content/' + s + '.js', 'utf8'))(w);
  for (const c of w.MC_CONTENT_EXTRA) {
    if (c.a !== s || !Array.isArray(c.win) || c.win.length !== 7) continue;
    // only touch pairs involving the 2026 additions
    if (!TRIO.includes(c.b) && !TRIO.includes(s)) continue;
    if (c.b === s) { mirrorsKept++; continue; }
    FIX[s] = FIX[s] || {};
    const prev = FIX[s][c.b];
    if (prev && JSON.stringify(prev) === JSON.stringify(c.win)) { agreed++; continue; }
    if (isStub(prev)) stubsReplaced++;
    FIX[s][c.b] = c.win.slice();
    written++;
  }
}
console.log('store rows written:', written, '| already agreed:', agreed, '| placeholder stubs replaced:', stubsReplaced, '| mirrors untouched:', mirrorsKept);

src = src.slice(0, at + mark.length) + JSON.stringify(FIX) + src.slice(end);
fs.writeFileSync(P, src);
fs.writeFileSync('_label-text-fix-store.json', JSON.stringify(FIX));
console.log('written:', P, '+ _label-text-fix-store.json');

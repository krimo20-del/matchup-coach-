// For a new champ X, pull the canonical win[] favour-timeline array from every
// already-shipped opponent's content file (their {a:Y, b:X} reverse entry). Sides
// are absolute display names, so the same array is mirror-consistent for X-vs-Y.
// Usage: node _bespoke_crosslock.js <champSlug>  -> writes _bespoke_<champ>_locks.json
const fs = require('fs'), path = require('path');
const champ = process.argv[2];
if (!champ) throw new Error('need champ slug');
const CONTENT = path.join(__dirname, 'champ-data', 'content');
const done = fs.readdirSync(CONTENT).filter(f => f.endsWith('.js')).map(f => f.replace('.js', ''));
const locks = {};        // opp -> win[7]  (available cross-locks)
for (const opp of done) {
  if (opp === champ) continue;
  global.window = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
  try { require(path.join(CONTENT, opp + '.js')); } catch (e) { continue; }
  const entry = (window.MC_CONTENT_EXTRA || []).find(e => e.a === opp && e.b === champ);
  if (entry && Array.isArray(entry.win) && entry.win.length === 7) locks[opp] = entry.win;
  delete require.cache[require.resolve(path.join(CONTENT, opp + '.js'))];
}
fs.writeFileSync(path.join(__dirname, '_bespoke_' + champ + '_locks.json'), JSON.stringify(locks));
console.log(JSON.stringify({ champ, crossLocksFound: Object.keys(locks).length, sample: Object.keys(locks).slice(0, 5) }));

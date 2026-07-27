// Merge agent-authored trio matchups into the top-lane content files.
// Validates against job locks, skips already-merged entries (idempotent).
const fs = require('fs');
const DIR = 'champ-data/content/';
const S = process.argv[2]; // scratch newtrio dir

function loadContent(slug) {
  const w = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
  new Function('window', fs.readFileSync(DIR + slug + '.js', 'utf8'))(w);
  return w;
}
function validEntry(e, lockWin) {
  if (!e || !Array.isArray(e.win) || e.win.length !== 7) return 'win not len 7';
  if (lockWin && JSON.stringify(e.win) !== JSON.stringify(lockWin)) return 'win != lock';
  if (!Array.isArray(e.whys) || e.whys.length !== 7 || e.whys.some(x => !x || x.length < 30)) return 'whys bad';
  if (!Array.isArray(e.spikes) || e.spikes.length < 3) return 'spikes bad';
  if (!e.wants || !Array.isArray(e.wants.you) || !Array.isArray(e.wants.foe)) return 'wants bad';
  for (const ph of ['early', 'mid', 'late']) if (typeof e[ph] !== 'string' || e[ph].length < 150) return ph + ' short';
  return null;
}
function appendBlock(slug, lines) {
  fs.appendFileSync(DIR + slug + '.js', '\n// appended: matchups vs 2026 additions (Locke / Zaahen / Master Yi)\n' + lines.join('\n') + '\n');
}

const TRIO = ['locke', 'zaahen', 'masteryi'];
let merged = 0, skipped = 0, failed = [];

// --- 69 old champs ---
const outs = fs.readdirSync(S).filter(f => /^out_(?!TRIO)/.test(f));
for (const f of outs) {
  const out = JSON.parse(fs.readFileSync(S + '/' + f, 'utf8'));
  const slug = out.champ;
  const job = JSON.parse(fs.readFileSync(S + '/job_' + slug + '.json', 'utf8'));
  const existing = loadContent(slug);
  const have = new Set(existing.MC_CONTENT_EXTRA.filter(c => c.a === slug).map(c => c.b));
  const lines = [];
  for (const t of TRIO) {
    if (have.has(t)) { skipped++; continue; }
    const e = out.entries[t];
    const err = validEntry(e, job.opps[t].win);
    if (err) { failed.push(slug + ' vs ' + t + ': ' + err); continue; }
    const entry = { a: slug, b: t, win: e.win, spikes: e.spikes, wants: e.wants, early: e.early, mid: e.mid, late: e.late, whys: e.whys };
    lines.push('window.MC_WR_TABLES.' + slug + '.' + t + ' = ' + job.opps[t].wr + ';');
    if (job.opps[t].games) lines.push('window.MC_REAL_GAMES.' + slug + '.' + t + ' = ' + job.opps[t].games + ';');
    lines.push('window.MC_CONTENT_EXTRA.push(' + JSON.stringify(entry) + ');');
    merged++;
  }
  if (lines.length) appendBlock(slug, lines);
}

// --- trio cross-pairs ---
const trioPath = S + '/out_TRIO.json';
if (fs.existsSync(trioPath)) {
  const T = JSON.parse(fs.readFileSync(trioPath, 'utf8'));
  for (const p of T.pairs) {
    const dirs = [
      { me: p.a, opp: p.b, entry: p.entryAB, wr: p.wr },
      { me: p.b, opp: p.a, entry: p.entryBA, wr: Math.round((100 - p.wr) * 100) / 100 }
    ];
    // both directions must share the same win array
    if (JSON.stringify(p.entryAB.win) !== JSON.stringify(p.entryBA.win)) { failed.push('TRIO ' + p.a + '/' + p.b + ': win arrays differ'); continue; }
    for (const d of dirs) {
      const existing = loadContent(d.me);
      const have = new Set(existing.MC_CONTENT_EXTRA.filter(c => c.a === d.me).map(c => c.b));
      if (have.has(d.opp)) { skipped++; continue; }
      const err = validEntry(d.entry, null);
      if (err) { failed.push('TRIO ' + d.me + ' vs ' + d.opp + ': ' + err); continue; }
      const entry = { a: d.me, b: d.opp, win: d.entry.win, spikes: d.entry.spikes, wants: d.entry.wants, early: d.entry.early, mid: d.entry.mid, late: d.entry.late, whys: d.entry.whys };
      appendBlock(d.me, [
        'window.MC_WR_TABLES.' + d.me + '.' + d.opp + ' = ' + d.wr + ';',
        'window.MC_REAL_GAMES.' + d.me + '.' + d.opp + ' = ' + (p.games || 300) + ';',
        'window.MC_CONTENT_EXTRA.push(' + JSON.stringify(entry) + ');'
      ]);
      merged++;
    }
  }
} else console.log('NOTE: out_TRIO.json not present yet');

console.log('merged:', merged, '| skipped(existing):', skipped, '| failed:', failed.length);
failed.forEach(x => console.log('  FAIL ' + x));

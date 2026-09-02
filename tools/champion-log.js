// champion-log.js — a timestamped completion record for every champion audited.
//
//   node tools/champion-log.js            # all lanes
//   node tools/champion-log.js top        # one lane
//
// Times come from proposal-file mtimes on disk, not from anything self-reported, so the
// record is auditable: first proposal written = start, last = finish, and the count is
// whatever is actually there. Applied/live status is read back from the data files.
const fs = require('fs');
const path = require('path');

const LANE = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : null;
const LANES = [
  { key: 'top', dir: 'champ-data/content', suffix: '' },
  { key: 'mid', dir: 'champ-data/content/mid', suffix: '_mid' },
  { key: 'bot', dir: 'champ-data/content/bot', suffix: '_bot' },
  { key: 'support', dir: 'champ-data/content/sup', suffix: '_sup' },
].filter(L => !LANE || L.key === LANE);

const pad = (n, w) => String(n).padStart(w);
const hhmm = ms => new Date(ms).toISOString().slice(11, 16);
const dayOf = ms => new Date(ms).toISOString().slice(5, 10);
const dur = ms => {
  const m = Math.round(ms / 60000);
  return m < 60 ? `${m}m` : `${Math.floor(m / 60)}h${pad(m % 60, 2)}m`;
};

// ---- token spend, attributed by TIME WINDOW ----
// The journal's "started" records carry agentId but no label, so agents cannot be mapped
// to champions directly. Instead each agent transcript's write window is matched against
// the champion that was being audited at that moment. Approximate at the boundaries,
// honest in aggregate — and clearly better than the zero it reported before.
const WF = path.join(process.env.USERPROFILE || process.env.HOME || '', '.claude', 'projects',
  'C--Users-Kris-Desktop', '53b3d9eb-98f2-47d7-b4ca-3d38dcde9835', 'subagents', 'workflows');
const agentSpans = [];   // { start, end, tokens }
if (fs.existsSync(WF)) {
  for (const run of fs.readdirSync(WF)) {
    const d = path.join(WF, run);
    let st; try { st = fs.statSync(d); } catch (e) { continue; }
    if (!st.isDirectory()) continue;
    for (const f of fs.readdirSync(d)) {
      if (!f.startsWith('agent-') || !f.endsWith('.jsonl')) continue;
      const fp = path.join(d, f);
      let tok = 0, s2;
      try {
        s2 = fs.statSync(fp);
        for (const m of fs.readFileSync(fp, 'utf8').matchAll(/"output_tokens":(\d+)/g)) tok += +m[1];
      } catch (e) { continue; }
      if (tok) agentSpans.push({ start: s2.birthtimeMs || s2.mtimeMs, end: s2.mtimeMs, tokens: tok });
    }
  }
}
const tokensIn = (from, to) => agentSpans.reduce((a, sp) =>
  (sp.end >= from && sp.start <= to) ? a + sp.tokens : a, 0);

const kt = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1000 ? Math.round(n / 1000) + 'k' : String(n || 0);

const rows = [];
for (const L of LANES) {
  const auditDir = path.join('audits', L.key);
  if (!fs.existsSync(auditDir) || !fs.existsSync(L.dir)) continue;

  for (const file of fs.readdirSync(L.dir).filter(f => f.endsWith('.js'))) {
    const slug = file.replace('.js', ''), key = slug + L.suffix;
    // how many matchups this champion actually has
    const w = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
    try { new Function('window', fs.readFileSync(path.join(L.dir, file), 'utf8'))(w); } catch (e) { continue; }
    const total = w.MC_CONTENT_EXTRA.filter(c => c.a === key).length;
    if (!total) continue;

    const props = fs.readdirSync(auditDir).filter(f => f.startsWith(key + '__') && f.endsWith('.json'));
    if (!props.length) continue;

    let first = Infinity, last = 0, edits = 0;
    const stamps = [];
    for (const f of props) {
      const p = path.join(auditDir, f);
      try {
        const st = fs.statSync(p);
        if (st.mtimeMs < first) first = st.mtimeMs;
        if (st.mtimeMs > last) last = st.mtimeMs;
        stamps.push(st.mtimeMs);
        const j = JSON.parse(fs.readFileSync(p, 'utf8'));
        edits += (j.edits || []).length;
      } catch (e) {}
    }
    rows.push({
      lane: L.key, champ: key, done: props.length, total, edits,
      first, last, span: last - first,
      // Active time ignores gaps over 10 minutes — those are spend-limit stalls or dead
      // runs, not work. Raw span made one champion read "60h40m" for ~25 minutes of work.
      active: (() => { stamps.sort((x, y) => x - y); let t = 0;
        for (let i = 1; i < stamps.length; i++) { const g = stamps[i] - stamps[i - 1]; if (g < 600000) t += g; }
        return t; })(),
      tokens: tokensIn(first, last),
      complete: props.length >= total,
    });
  }
}

rows.sort((a, b) => a.last - b.last);

console.log('=== champion completion log (times from proposal files on disk) ===\n');
console.log('  date   start  finish  active  span    champion              matchups   edits  tokens  status');
console.log('  ' + '-'.repeat(84));
let prevDay = null;
for (const r of rows) {
  const day = dayOf(r.last);
  if (prevDay && day !== prevDay) console.log('');
  prevDay = day;
  console.log(`  ${day}  ${hhmm(r.first)}  ${hhmm(r.last)}  ${pad(dur(r.active), 6)}  ${pad(dur(r.span), 6)}  ${r.champ.padEnd(20)} ${pad(r.done, 3)}/${pad(r.total, 3)}   ${pad(r.edits, 5)}  ${pad(kt(r.tokens), 6)}  ${r.complete ? 'COMPLETE' : 'partial'}`);
}

const done = rows.filter(r => r.complete);
const totalMatchups = rows.reduce((a, r) => a + r.done, 0);
const totalEdits = rows.reduce((a, r) => a + r.edits, 0);
console.log('\n  ' + '-'.repeat(74));
console.log(`  ${done.length} champions complete, ${rows.length - done.length} partial`);
const totalTokens = rows.reduce((a, r) => a + r.tokens, 0);
console.log(`  ${totalMatchups} matchups audited, ${totalEdits} edits proposed, ${kt(totalTokens)} output tokens`);
if (totalMatchups) console.log(`  ${kt(Math.round(totalTokens / totalMatchups))} tokens per matchup`);
if (done.length) {
  const avg = done.reduce((a, r) => a + r.active, 0) / done.length;
  console.log(`  average ACTIVE time per complete champion: ${dur(avg)}`);
  const recent = done.slice(-5);
  if (recent.length) {
    const ravg = recent.reduce((a, r) => a + r.active, 0) / recent.length;
    console.log(`  last ${recent.length}: ${dur(ravg)} average`);
  }
}
console.log(`\n  reported at ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC`);

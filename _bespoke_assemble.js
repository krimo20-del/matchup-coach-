// Assemble a bespoke content file from authored per-opponent JSON + the job's WR data.
// Usage: node _bespoke_assemble.js <champSlug> <scratchBespokeDir>
// Writes champ-data/content/<champ>.js in the canonical format and reports validation.
const fs = require('fs'), path = require('path');
const champ = process.argv[2];
const base = process.argv[3]; // .../scratchpad/bespoke/<champ>
const job = JSON.parse(fs.readFileSync(path.join(base, 'job.json'), 'utf8'));
const outDir = path.join(base, 'out');
const champDisp = job.champDisp;

const problems = [], entries = [];
const wrTable = {}, gamesTable = {};
for (const m of job.matchups) {
  wrTable[m.opp] = m.wr;
  gamesTable[m.opp] = m.games;
  const f = path.join(outDir, m.opp + '.json');
  if (!fs.existsSync(f)) { problems.push(m.opp + ': MISSING'); continue; }
  let e; try { e = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (err) { problems.push(m.opp + ': bad JSON'); continue; }
  // normalize + validate
  e.a = champ; e.b = m.opp;
  if (m.lockWin) e.win = m.lockWin;                       // enforce cross-lock
  if (!Array.isArray(e.win) || e.win.length !== 7) problems.push(m.opp + ': win len ' + (e.win || []).length);
  if (!Array.isArray(e.whys) || e.whys.length !== 7) problems.push(m.opp + ': whys len ' + (e.whys || []).length);
  if (!Array.isArray(e.spikes) || e.spikes.length < 3) problems.push(m.opp + ': spikes ' + (e.spikes || []).length);
  if (!e.wants || !Array.isArray(e.wants.you) || !Array.isArray(e.wants.foe)) problems.push(m.opp + ': wants');
  if (!e.early || !e.mid || !e.late) problems.push(m.opp + ': prose');
  // win sides must be Aatrox / oppDisp / Skill
  const valid = new Set([champDisp, m.oppDisp, 'Skill']);
  if (Array.isArray(e.win) && !e.win.every(s => valid.has(s))) problems.push(m.opp + ': win side not in {' + champDisp + ',' + m.oppDisp + ',Skill}: ' + JSON.stringify(e.win));
  entries.push({ a: champ, b: m.opp, win: e.win, spikes: e.spikes, wants: e.wants, early: e.early, mid: e.mid, late: e.late, whys: e.whys });
}

console.log(JSON.stringify({ champ, matchups: job.matchups.length, authored: entries.length, problems: problems.slice(0, 30), problemCount: problems.length }));
if (problems.length) { console.log('NOT WRITING — fix problems first.'); process.exit(1); }

const banner = `// champ-data/content/${champ}.js — bespoke ${champDisp} top-lane matchup data.
// WR = lolalytics Emerald+ headline matchup win rate (largest-sample row). Pushed to
// MC_WR_TABLES / MC_CONTENT_EXTRA; consumed by _reddit-validated-fixes.js.
`;
let out = banner +
  'window.MC_WR_TABLES = window.MC_WR_TABLES || {};\n' +
  'window.MC_CONTENT_EXTRA = window.MC_CONTENT_EXTRA || [];\n' +
  'window.MC_REAL_GAMES = window.MC_REAL_GAMES || {};\n' +
  'window.__mcLoaded = window.__mcLoaded || {};\n' +
  'window.MC_WR_TABLES.' + champ + ' = ' + JSON.stringify(wrTable) + ';\n' +
  'window.MC_REAL_GAMES.' + champ + ' = ' + JSON.stringify(gamesTable) + ';\n' +
  'if (!window.__mcLoaded.' + champ + ') { window.__mcLoaded.' + champ + ' = 1;\n' +
  'window.MC_CONTENT_EXTRA.push(\n' +
  entries.map(e => '  ' + JSON.stringify(e)).join(',\n') +
  '\n); }\n';
fs.writeFileSync(path.join(__dirname, 'champ-data', 'content', champ + '.js'), out);
// sanity: file parses
global.window = {}; require(path.join(__dirname, 'champ-data', 'content', champ + '.js'));
console.log('WROTE champ-data/content/' + champ + '.js (' + out.length + ' bytes, ' + entries.length + ' entries, parses OK)');

// Assemble a support-lane bespoke content file from authored per-opponent JSON.
// Usage: node _bespoke_assemble_sup.js <champSlug> <scratchBespokeBotDir>
// Writes champ-data/content/sup/<champ>.js (a = '<champ>_sup', matches CHAMP_FULL key).
const fs = require('fs'), path = require('path');
const champ = process.argv[2];
const base = process.argv[3]; // .../scratchpad/bespoke-sup/<champ>
const job = JSON.parse(fs.readFileSync(path.join(base, 'job.json'), 'utf8'));
const outDir = path.join(base, 'out');
const champDisp = job.champDisp;
const dataKey = job.champDataKey; // '<champ>_sup'

const problems = [], entries = [];
const wrTable = {}, gamesTable = {};
for (const m of job.matchups) {
  wrTable[m.opp] = m.wr;
  gamesTable[m.opp] = m.games;
  const f = path.join(outDir, m.opp + '.json');
  if (!fs.existsSync(f)) { problems.push(m.opp + ': MISSING'); continue; }
  let e; try { e = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (err) { problems.push(m.opp + ': bad JSON'); continue; }
  e.a = dataKey; e.b = m.opp;
  if (m.lockWin) e.win = m.lockWin; // enforce store-lock
  if (!Array.isArray(e.win) || e.win.length !== 7) problems.push(m.opp + ': win len ' + (e.win || []).length);
  if (!Array.isArray(e.whys) || e.whys.length !== 7) problems.push(m.opp + ': whys len ' + (e.whys || []).length);
  if (!Array.isArray(e.spikes) || e.spikes.length < 3) problems.push(m.opp + ': spikes ' + (e.spikes || []).length);
  if (!e.wants || !Array.isArray(e.wants.you) || !Array.isArray(e.wants.foe)) problems.push(m.opp + ': wants');
  if (!e.early || !e.mid || !e.late) problems.push(m.opp + ': prose');
  const valid = new Set([champDisp, m.oppDisp, 'Skill']);
  if (Array.isArray(e.win) && !e.win.every(s => valid.has(s))) problems.push(m.opp + ': win side not in {' + champDisp + ',' + m.oppDisp + ',Skill}: ' + JSON.stringify(e.win));
  entries.push({ a: dataKey, b: m.opp, win: e.win, spikes: e.spikes, wants: e.wants, early: e.early, mid: e.mid, late: e.late, whys: e.whys });
}

// Store<->content risk report.
const risk = [];
for (const m of job.matchups) {
  const f = path.join(outDir, m.opp + '.json'); if (!fs.existsSync(f)) continue;
  let ae; try { ae = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { continue; }
  if (!m.lockWin || !Array.isArray(ae.win)) continue;
  for (let i = 0; i < 7; i++) if (ae.win[i] !== m.lockWin[i]) risk.push(m.opp + '#' + i + ' chart=' + m.lockWin[i] + ' agent=' + ae.win[i]);
}
if (risk.length) console.log('RISK (agent win != store, whys need a look): ' + JSON.stringify(risk));
else console.log('RISK: none — every authored win[] matched the store timeline.');

console.log(JSON.stringify({ champ, matchups: job.matchups.length, authored: entries.length, problems: problems.slice(0, 30), problemCount: problems.length }));
if (problems.length) { console.log('NOT WRITING — fix problems first.'); process.exit(1); }

const banner = `// champ-data/content/sup/${champ}.js — bespoke ${champDisp} SUPPORT-lane matchup data.
// WR = lolalytics Emerald+ headline matchup win rate (largest-sample row, lane=support).
// a = '${dataKey}' (matches the support-lane CHAMP_FULL key so it never collides with any
// other-lane content for a champ of the same name). Pushed to MC_WR_TABLES / MC_CONTENT_EXTRA;
// consumed by _reddit-validated-fixes.js (applyContent uses c.a as the CHAMP_FULL key directly).
`;
let out = banner +
  'window.MC_WR_TABLES = window.MC_WR_TABLES || {};\n' +
  'window.MC_CONTENT_EXTRA = window.MC_CONTENT_EXTRA || [];\n' +
  'window.MC_REAL_GAMES = window.MC_REAL_GAMES || {};\n' +
  'window.__mcLoaded = window.__mcLoaded || {};\n' +
  'window.MC_WR_TABLES.' + dataKey + ' = ' + JSON.stringify(wrTable) + ';\n' +
  'window.MC_REAL_GAMES.' + dataKey + ' = ' + JSON.stringify(gamesTable) + ';\n' +
  'if (!window.__mcLoaded.' + dataKey + ') { window.__mcLoaded.' + dataKey + ' = 1;\n' +
  'window.MC_CONTENT_EXTRA.push(\n' +
  entries.map(e => '  ' + JSON.stringify(e)).join(',\n') +
  '\n); }\n';
const outFileDir = path.join(__dirname, 'champ-data', 'content', 'sup');
fs.mkdirSync(outFileDir, { recursive: true });
fs.writeFileSync(path.join(outFileDir, champ + '.js'), out);
global.window = {};
require(path.join(outFileDir, champ + '.js'));
console.log('WROTE champ-data/content/sup/' + champ + '.js (' + out.length + ' bytes, ' + entries.length + ' entries, parses OK)');

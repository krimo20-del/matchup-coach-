// Build per-champ job files for authoring the missing top matchups vs locke/zaahen/masteryi.
const fs = require('fs');
const DIR = 'champ-data/content/';
const slug = n => n.toLowerCase().replace(/[^a-z]/g, '');

global.window = {};
new Function('window', fs.readFileSync('champ-data/rosters.js', 'utf8'))(global.window);
const names = []; global.window.ROSTERS.top.forEach(g => g.c.forEach(n => names.push(n)));
const dispBy = {}; names.forEach(n => dispBy[slug(n)] = n);

const TRIO = ['locke', 'zaahen', 'masteryi'];
const trioData = {};
for (const t of TRIO) {
  const w = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
  new Function('window', fs.readFileSync(DIR + t + '.js', 'utf8'))(w);
  trioData[t] = { extra: w.MC_CONTENT_EXTRA.filter(c => c.a === t), wr: w.MC_WR_TABLES[t] || {}, games: w.MC_REAL_GAMES[t] || {} };
}

const S = process.argv[2];
fs.mkdirSync(S, { recursive: true });
const old = names.map(slug).filter(s => !TRIO.includes(s));
let jobs = 0, misses = [];
for (const s of old) {
  const job = { champ: s, disp: dispBy[s], opps: {} };
  for (const t of TRIO) {
    const e = trioData[t].extra.find(c => c.b === s);
    if (!e || !e.win || e.win.length !== 7) { misses.push(s + ' missing in ' + t); continue; }
    const wrT = trioData[t].wr[s];
    const wrNum = typeof wrT === 'number' ? wrT : (wrT && wrT.wr);
    job.opps[t] = {
      disp: dispBy[t],
      win: e.win,                                   // LOCKED — same labels both directions
      wr: Math.round((100 - wrNum) * 100) / 100,     // this champ's WR vs the trio champ
      games: trioData[t].games[s] || null,
      // the trio file's whys give the verified stage logic — reversed-perspective source
      refWhys: e.whys
    };
  }
  fs.writeFileSync(S + '/job_' + s + '.json', JSON.stringify(job, null, 1));
  jobs++;
}
console.log('jobs written:', jobs, '| data gaps:', misses.length ? misses.join('; ') : 'none');

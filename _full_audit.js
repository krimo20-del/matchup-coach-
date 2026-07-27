// FULL BESPOKE AUDIT — rosters vs content files vs matchup entries vs store locks vs HTML wiring.
const fs = require('fs');
const slug = n => n.toLowerCase().replace(/[^a-z]/g, '');

global.window = {};
new Function('window', fs.readFileSync('champ-data/rosters.js', 'utf8'))(global.window);
const ROSTERS = global.window.ROSTERS;
const STORE = JSON.parse(fs.readFileSync('_label-text-fix-store.json', 'utf8'));
const html = fs.readFileSync('MatchupCoach.dc.html', 'utf8');

const LANES = [
  { lane: 'top', roster: 'top', dir: 'champ-data/content', suffix: '' },
  { lane: 'mid', roster: 'mid', dir: 'champ-data/content/mid', suffix: '_mid' },
  { lane: 'bot', roster: 'bot', dir: 'champ-data/content/bot', suffix: '_bot' },
  { lane: 'sup', roster: 'support', dir: 'champ-data/content/sup', suffix: '_sup' },
];

// script tags in HTML + position of the consumer
const tagRe = /<script src="\.\/(champ-data\/content\/[^"]+)"><\/script>/g;
const tags = new Set(); let m;
while ((m = tagRe.exec(html))) tags.add(m[1].replace(/\\/g, '/'));
// Match the real <script> tag, not the explanatory comment that also names the
// file (the comment sits ABOVE the content tags and made every one look "late").
const consumerPos = html.indexOf('<script src="./champ-data/_reddit-validated-fixes.js">');

let totalProblems = 0;
const problem = (msg) => { totalProblems++; console.log('  PROBLEM: ' + msg); };

for (const L of LANES) {
  const names = []; ROSTERS[L.roster].forEach(g => g.c.forEach(n => names.push(n)));
  const slugs = names.map(slug);
  const dispBySlug = {}; names.forEach(n => dispBySlug[slug(n)] = n);
  // top dir is shared with subdirs — only take .js files
  const files = fs.readdirSync(L.dir).filter(f => f.endsWith('.js')).map(f => f.replace('.js', ''));
  const fileSet = new Set(files);

  console.log('\n===== ' + L.lane.toUpperCase() + ' — roster ' + names.length + ', content files ' + files.length + ' =====');

  // 1. roster champs with no content file / orphan files
  const noFile = slugs.filter(s => !fileSet.has(s));
  const orphan = files.filter(f => !slugs.includes(f));
  if (noFile.length) problem('roster champs with NO content file: ' + noFile.join(', '));
  if (orphan.length) problem('content files NOT in roster: ' + orphan.join(', '));

  let laneMatchups = 0, laneStoreLocked = 0, laneMismatch = 0;
  for (const s of slugs) {
    if (!fileSet.has(s)) continue;
    const key = s + L.suffix;
    // run the content file in a sandbox
    const w = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
    try { new Function('window', fs.readFileSync(L.dir + '/' + s + '.js', 'utf8'))(w); }
    catch (e) { problem(key + ': content file THROWS: ' + e.message); continue; }

    // 2. script tag present + before consumer
    const rel = (L.dir + '/' + s + '.js');
    if (!tags.has(rel)) problem(key + ': no <script> tag in HTML for ' + rel);
    else {
      const pos = html.indexOf('"./' + rel + '"');
      if (pos < 0 || pos > consumerPos) problem(key + ': script tag missing/after _reddit-validated-fixes.js');
    }

    // 3. WR table + real games under the right key
    if (!w.MC_WR_TABLES[key]) problem(key + ': MC_WR_TABLES["' + key + '"] missing');
    if (!w.MC_REAL_GAMES[key]) problem(key + ': MC_REAL_GAMES["' + key + '"] missing');

    // 4. matchup entries: one per roster opponent (mirror excluded)
    const expOpp = slugs.filter(o => o !== s);
    const entries = w.MC_CONTENT_EXTRA.filter(c => c.a === key);
    const wrongA = w.MC_CONTENT_EXTRA.filter(c => c.a !== key);
    if (wrongA.length) problem(key + ': ' + wrongA.length + ' entries with wrong a= (' + wrongA[0].a + ')');
    const byOpp = {}; entries.forEach(c => { byOpp[c.b] = byOpp[c.b] ? byOpp[c.b] + 1 : 1; });
    const missOpp = expOpp.filter(o => !byOpp[o]);
    const dupOpp = Object.keys(byOpp).filter(o => byOpp[o] > 1);
    const extraOpp = Object.keys(byOpp).filter(o => !expOpp.includes(o));
    if (missOpp.length) problem(key + ': MISSING matchups vs: ' + missOpp.join(', '));
    if (dupOpp.length) problem(key + ': DUPLICATE matchups vs: ' + dupOpp.join(', '));
    if (extraOpp.length) problem(key + ': matchups vs non-roster: ' + extraOpp.join(', '));

    // 5. per-entry shape + store-lock check + WR row for each opponent
    const store = STORE[key] || {};
    const wrTab = w.MC_WR_TABLES[key] || {};
    for (const c of entries) {
      const id = key + ' vs ' + c.b;
      if (!Array.isArray(c.win) || c.win.length !== 7) { problem(id + ': win[] not len 7'); continue; }
      if (!Array.isArray(c.whys) || c.whys.length !== 7) problem(id + ': whys[] not len 7');
      if (!Array.isArray(c.spikes) || !c.spikes.length) problem(id + ': spikes empty');
      if (!c.wants || !Array.isArray(c.wants.you) || !Array.isArray(c.wants.foe)) problem(id + ': wants.you/foe malformed');
      for (const ph of ['early', 'mid', 'late']) if (typeof c[ph] !== 'string' || c[ph].length < 40) problem(id + ': ' + ph + ' text short/missing');
      if (!wrTab[c.b]) problem(id + ': no WR row for opponent');
      laneMatchups++;
      const lock = store[c.b];
      if (lock && lock.length === 7) {
        laneStoreLocked++;
        for (let i = 0; i < 7; i++) if (c.win[i] !== lock[i]) { laneMismatch++; problem(id + ': win[' + i + ']="' + c.win[i] + '" != store "' + lock[i] + '"'); }
      }
    }
  }
  console.log('  matchups: ' + laneMatchups + ' | store-locked: ' + laneStoreLocked + ' (' + Math.round(laneStoreLocked / Math.max(1, laneMatchups) * 100) + '%) | lock mismatches: ' + laneMismatch);
  // store dataKey coverage for this lane
  const noStoreKey = slugs.filter(s => !STORE[s + L.suffix]);
  if (noStoreKey.length) console.log('  NOTE: no store dataKey (timeline falls back to bespoke win[]): ' + noStoreKey.join(', '));
}

// ===== JUNGLE TRACKER =====
console.log('\n===== JUNGLE TRACKER =====');
const w2 = {};
for (const f of ['jungle-intel.js', 'jungle-intel-2.js', 'jungle-intel-lanes.js']) new Function('window', fs.readFileSync('champ-data/' + f, 'utf8'))(w2);
const JI = w2.JUNGLE_INTEL, JL = w2.JUNGLE_INTEL_LANE;
const jNames = []; ROSTERS.jungle.forEach(g => g.c.forEach(n => jNames.push(n)));
const BASE_REQ = ['name', 'tone', 'group', 'role', 'tags', 'clearStyle', 'start', 'startLabel', 'startTop', 'startLeft', 'startNote', 'clearSpeed', 'critFrom', 'critTo', 'critNote', 'dive', 'diveNote', 'waveState', 'laneTell', 'spike', 'spikeNote', 'wardTime', 'wardLoc', 'wardNote', 'plan', 'gank', 'invadeTend', 'invadeVuln', 'invadeNote'];
const LANE_REQ = ['start', 'startLabel', 'startTop', 'startLeft', 'startNote', 'clearSpeed', 'critFrom', 'critTo', 'critNote', 'waveState', 'laneTell', 'wardLoc', 'wardNote', 'plan'];
let jOk = 0;
for (const n of jNames) {
  const k = slug(n);
  const b = JI[k];
  if (!b) { problem('jungle ' + n + ': no base JUNGLE_INTEL'); continue; }
  const missB = BASE_REQ.filter(f => b[f] == null);
  if (missB.length) problem('jungle ' + n + ': base missing ' + missB.join(','));
  if (!Array.isArray(b.plan) || b.plan.length !== 3) problem('jungle ' + n + ': base plan not len 3');
  for (const lk of ['mid', 'bot']) {
    const o = JL[lk][k];
    if (!o) { problem('jungle ' + n + ': no ' + lk + ' lane override'); continue; }
    const missL = LANE_REQ.filter(f => o[f] == null);
    if (missL.length) problem('jungle ' + n + ': ' + lk + ' missing ' + missL.join(','));
    if (!Array.isArray(o.plan) || o.plan.length !== 3) problem('jungle ' + n + ': ' + lk + ' plan not len 3');
  }
  jOk++;
}
console.log('  junglers checked: ' + jOk + '/' + jNames.length);
// orphan lane overrides
for (const lk of ['mid', 'bot']) {
  const orph = Object.keys(JL[lk]).filter(k => !jNames.some(n => slug(n) === k));
  if (orph.length) problem('jungle ' + lk + ' overrides not in roster: ' + orph.join(', '));
}

console.log('\n========== TOTAL PROBLEMS: ' + totalProblems + ' ==========');

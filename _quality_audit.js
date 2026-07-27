// Content-quality audit for the bespoke matchup text.
// In every entry the PLAYER is addressed as "you", so third-person pronouns
// (he/him/his vs she/her) refer to the OPPONENT. That makes misgendering
// mechanically detectable: a female opponent described with masculine pronouns.
// Also flags copy-paste duplication and wrong-champion name drops.
const fs = require('fs');
const slug = n => n.toLowerCase().replace(/[^a-z0-9]/g, '');

global.window = {};
new Function('window', fs.readFileSync('champ-data/rosters.js', 'utf8'))(global.window);
new Function('window', fs.readFileSync('champ-data/champ-gender.js', 'utf8'))(global.window);
const ROSTERS = global.window.ROSTERS;
const isFemale = global.window.MC_IS_FEMALE;

const LANES = [
  { lane: 'top', roster: 'top', dir: 'champ-data/content', suffix: '' },
  { lane: 'mid', roster: 'mid', dir: 'champ-data/content/mid', suffix: '_mid' },
  { lane: 'bot', roster: 'bot', dir: 'champ-data/content/bot', suffix: '_bot' },
  { lane: 'sup', roster: 'support', dir: 'champ-data/content/sup', suffix: '_sup' },
];

const MASC = /\b(he|him|his)\b/i;
const FEM = /\b(she|her|hers)\b/i;
const TEXT_FIELDS = ['early', 'mid', 'late'];

let totals = { misgender: 0, dupes: 0, wrongName: 0, checked: 0 };
const misgenderByLane = {};

for (const L of LANES) {
  const names = []; ROSTERS[L.roster].forEach(g => g.c.forEach(n => names.push(n)));
  const dispBy = {}; names.forEach(n => dispBy[slug(n)] = n);
  const files = fs.readdirSync(L.dir).filter(f => f.endsWith('.js'));
  const allNameSlugs = names.map(slug);

  let laneMis = [], laneDup = [], laneWrong = [];

  for (const f of files) {
    const champ = f.replace('.js', '');
    const w = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
    try { new Function('window', fs.readFileSync(L.dir + '/' + f, 'utf8'))(w); } catch (e) { continue; }
    const key = champ + L.suffix;
    const entries = w.MC_CONTENT_EXTRA.filter(c => c.a === key);
    const seenText = {};

    for (const e of entries) {
      totals.checked++;
      const oppDisp = dispBy[e.b] || e.b;
      const oppFemale = isFemale(oppDisp);
      const blob = TEXT_FIELDS.map(k => e[k] || '').join(' ') + ' ' + (e.whys || []).join(' ');

      // 1) misgendering: female opponent + masculine pronouns, no feminine ones
      if (oppFemale && MASC.test(blob) && !FEM.test(blob)) {
        laneMis.push(key + ' vs ' + e.b);
        totals.misgender++;
      }

      // 2) copy-paste: identical phase text reused across different opponents
      for (const k of TEXT_FIELDS) {
        const t = (e[k] || '').trim();
        if (t.length < 60) continue;
        const sig = k + '|' + t;
        if (seenText[sig]) { laneDup.push(key + ' ' + k + ': ' + e.b + ' == ' + seenText[sig]); totals.dupes++; }
        else seenText[sig] = e.b;
      }

      // 3) wrong champion named: text mentions a third champion's display name
      //    that is neither the player nor the opponent (weak signal, report few)
      const selfDisp = dispBy[champ] || champ;
      for (const other of names) {
        if (other === selfDisp || other === oppDisp) continue;
        if (other.length < 5) continue; // skip short names (Vi, Zed) — too noisy
        if (new RegExp('\\b' + other.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b').test(blob)) {
          laneWrong.push(key + ' vs ' + e.b + ' mentions ' + other);
          totals.wrongName++;
          break;
        }
      }
    }
  }
  misgenderByLane[L.lane] = laneMis;
  console.log('\n===== ' + L.lane.toUpperCase() + ' =====');
  console.log('  misgendered entries: ' + laneMis.length + (laneMis.length ? ' e.g. ' + laneMis.slice(0, 6).join(', ') : ''));
  console.log('  duplicate phase texts: ' + laneDup.length + (laneDup.length ? ' e.g. ' + laneDup.slice(0, 3).join(' ;; ') : ''));
  console.log('  third-champion mentions: ' + laneWrong.length + (laneWrong.length ? ' e.g. ' + laneWrong.slice(0, 3).join(' ;; ') : ''));
}
console.log('\n========== entries checked: ' + totals.checked + ' | misgendered: ' + totals.misgender + ' | dupes: ' + totals.dupes + ' | 3rd-champ: ' + totals.wrongName + ' ==========');
fs.writeFileSync('_quality_misgender.json', JSON.stringify(misgenderByLane, null, 1));

// jg-fix-kit-claims.js — correct ability claims that contradict Riot's own kit text.
//
//   node tools/jg-fix-kit-claims.js            # dry run
//   node tools/jg-fix-kit-claims.js --write
//
// WHY: the jungle data is one generated template per champion, so a wrong claim about an
// ability appears in every matchup at once — and when an audit corrected it, it corrected
// only the handful of rows that audit touched. The result is a file that contradicts
// itself: Trundle's Pillar of Ice was called a "terrain displacement" in 46 of 50 rows and
// described correctly in the other 4.
//
// EVERY CLAIM BELOW WAS CHECKED AGAINST champ-data/_kits/*.json (Data Dragon 16.15.1)
// BEFORE BEING LISTED, quoting Riot's own description:
//
//   Trundle E, Pillar of Ice — "becoming impassable terrain and slowing all nearby enemy
//     units", flags {slow, terrain}. It creates terrain and slows. It does NOT displace.
//   Master Yi W, Meditate — "restoring Health and taking reduced damage for a short time.
//     In addition, Master Yi will gain stacks of Double Strike", flags {heal, channel}.
//     It is a channel. It is NOT an auto-attack reset.
//   Wukong R, Cyclone — "extends his staff and spins it around repeatedly, gaining Move
//     Speed. Enemies struck take damage and are knocked up." One sustained spin. It is
//     NOT a double cast.
//
// This is deliberately narrow: it rewrites the specific false clause and nothing else, so
// each row keeps its own matchup-specific remainder. It does not touch verdicts, so it
// cannot create the adv/why incoherence the gate exists to catch.
const fs = require('fs');
const path = require('path');

const WRITE = process.argv.includes('--write');
const DIR = 'champ-data/jg';

const FIXES = [
  { owner: 'Trundle', stage: 2,
    from: 'introducing a versatile terrain displacement and massive slow',
    to:   'introducing impassable terrain and a massive slow' },
  { owner: 'Master Yi', stage: 2,
    from: 'introducing a versatile damage reduction and auto-attack reset mechanic',
    to:   'introducing a channel that restores Health and cuts incoming damage' },
  { owner: 'Wukong', stage: 4,
    from: 'provides a double-cast area-of-effect knockup and movement speed steroid',
    to:   'provides one sustained spin that knocks up everyone it catches, plus move speed' },
  // two rows phrase the same false claim differently — the template was edited by hand
  // in those places, so a single from/to could not catch them.
  { owner: 'Wukong', stage: 4,
    from: 'It provides a double-cast area-of-effect knockup and a movement speed steroid.',
    to:   'It is one sustained spin that knocks up everyone it catches, and it grants move speed.' },
  { owner: 'Wukong', stage: 4,
    from: 'double-cast Cyclone knock-ups chain',
    to:   'Cyclone knock-ups chain' },
];

function ownerFile(owner) {
  for (const f of fs.readdirSync(DIR).filter(x => x.endsWith('.js') && !x.startsWith('_'))) {
    const w = {};
    try { new Function('window', fs.readFileSync(path.join(DIR, f), 'utf8'))(w); } catch (e) { continue; }
    if (w.JG_DB && w.JG_DB[owner]) return f;
  }
  return null;
}

let total = 0;
for (const fix of FIXES) {
  const file = ownerFile(fix.owner);
  if (!file) { console.error(`  SKIP ${fix.owner}: no file defines this owner`); continue; }
  const p = path.join(DIR, file);
  const src = fs.readFileSync(p, 'utf8');
  const m = src.match(/window\.JG_DB\[(['"])([\s\S]*?)\1\]\s*=/);
  if (!m) { console.error(`  SKIP ${fix.owner}: no assignment found`); continue; }
  const eq = src.indexOf('=', src.indexOf(m[0]));
  let obj;
  try { obj = JSON.parse(src.slice(eq + 1).trim().replace(/;\s*$/, '')); }
  catch (e) { console.error(`  SKIP ${fix.owner}: payload does not parse`); continue; }

  let n = 0;
  for (const enemy of Object.keys(obj)) {
    const s = (obj[enemy].stages || [])[fix.stage];
    if (!s || typeof s.why !== 'string') continue;
    if (!s.why.includes(fix.from)) continue;
    s.why = s.why.split(fix.from).join(fix.to);
    n++;
  }
  console.log(`  ${String(n).padStart(4)}  ${fix.owner} stage ${fix.stage}`);
  if (n && WRITE) fs.writeFileSync(p, src.slice(0, eq + 1) + ' ' + JSON.stringify(obj) + ';\n');
  total += n;
}
console.log(`\n${total} row(s) corrected`);
if (!WRITE) console.log('DRY RUN — re-run with --write to apply.');

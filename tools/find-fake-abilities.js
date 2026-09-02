#!/usr/bin/env node
/**
 * find-fake-abilities.js — every ability name in champ-data that Riot does not have.
 *
 * WHY
 *   Four fabricated names were found by accident and turned out to be dataset-wide:
 *   "Beartrap on a Rope" (1,698), "Twofold Hunt" (1,250), "Repeating Dashes" (1,211),
 *   "Chaaaaaarge!!!" (12). Those were the ones somebody happened to notice. Finding the
 *   rest by reading matchups is hopeless — 9,404 of them — and it is exactly the kind of
 *   check a script does perfectly and a model does expensively.
 *
 * HOW
 *   champ-data/_kits/ is Riot Data Dragon, so it is the authority on what exists. Build the
 *   set of every real ability name, then pull Title-Case phrases out of the prose and report
 *   the ones that are not in it, ranked by how often they appear.
 *
 *   This is a SUSPECT LIST, not a verdict. English Title Case catches plenty of innocent
 *   phrases ("Grievous Wounds", "Sheen", "First Blood"). The known-safe list below removes
 *   the obvious ones; everything else needs a human or an audit agent to judge. Never
 *   auto-replace from this output — that is how "Repeating Dashes" would become a different
 *   wrong claim instead of a corrected one.
 *
 * Usage: node tools/find-fake-abilities.js [--min N] [--full]
 */

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const MIN = (() => { const i = args.indexOf('--min'); return i === -1 ? 8 : +args[i + 1]; })();
const FULL = args.includes('--full');

// ---- every real ability name, plus champion names ----------------------------
const real = new Set();
const champNames = new Set();
const kitDir = path.join(REPO, 'champ-data/_kits');
for (const f of fs.readdirSync(kitDir).filter(x => x.endsWith('.json'))) {
  let k; try { k = JSON.parse(fs.readFileSync(path.join(kitDir, f), 'utf8')); } catch { continue; }
  if (k.name) champNames.add(k.name);
  for (const a of k.abilities || []) for (const n of a.names || []) {
    real.add(n);
    // Riot writes "Chaaaaaaaarge!!!" and prose often drops the punctuation.
    real.add(n.replace(/[!?.]+$/, ''));
  }
}

// Game vocabulary that is Title Case but is not an ability. Not exhaustive — it only has to
// cut the noise enough that a human can scan what is left.
const SAFE = new Set(['Grievous Wounds', 'First Blood', 'Baron Nashor', 'Rift Herald', 'Dragon Soul',
  'Elder Dragon', 'Summoner Spell', 'Summoner Spells', 'Flash', 'Teleport', 'Ignite', 'Exhaust',
  'Barrier', 'Cleanse', 'Ghost', 'Smite', 'Doran', 'Health Potion', 'Control Ward', 'Sight Stone',
  'Level One', 'Level Two', 'Level Six', 'Key Triggers', 'Critical Don', 'Win Rate', 'Power Spikes',
  'Lane Difficulty', 'Wave Management', 'Jungle Influence', 'Win Conditions', 'Common Mistakes',
  'Trading Rules', 'Key Ability Interactions', 'Missing Knowledge', 'Patch Sensitivity',
  'Attack Speed', 'Ability Power', 'Attack Damage', 'Magic Resist', 'Armor Pen', 'Magic Pen',
  'Life Steal', 'Ability Haste', 'Move Speed', 'Bonus Health', 'Max Health', 'True Damage',
  'Blue Side', 'Red Side', 'Side Lane', 'Mid Game', 'Late Game', 'Early Game', 'All In',
  'Second Wind', 'Doran Shield', 'Plated Steelcaps', 'Mercury Treads', 'Bramble Vest',
  'Executioner Calling', 'Morellonomicon', 'Thornmail', 'Sterak Gage', 'Death Dance',
  'Black Cleaver', 'Divine Sunderer', 'Trinity Force', 'Sunfire Aegis', 'Heartsteel',
  'Conqueror', 'Grasp', 'Fleet Footwork', 'Press The Attack', 'Lethal Tempo', 'Dark Harvest',
  'Phase Rush', 'Aery', 'Comet', 'Electrocute', 'Hail Of Blades', 'Bone Plating', 'Overgrowth',
  'Demolish', 'Shield Bash', 'Legend Tenacity', 'Last Stand', 'Coup De Grace', 'Cut Down']);

// ---- scan the prose ----------------------------------------------------------
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (e.name !== '_kits' && e.name !== 'node_modules') walk(p); }
    else if (e.name.endsWith('.js')) files.push(p);
  }
})(path.join(REPO, 'champ-data'));

// PRECISION OVER RECALL.
// The first version matched any Title-Case phrase and returned 2,304 suspects — almost all
// of them items, runes and section headings ("Adaptive Force", "Doran's Shield", "Rune
// Setup"). A list nobody can read finds nothing.
//
// So match only phrases the text EXPLICITLY claims are an ability, by the slot marker that
// follows them: "Bear Trap on a Rope (Q)". If the data says something is a Q and Riot's kit
// has no such name, that is a fabrication with almost no ambiguity — which is exactly how
// "Beartrap on a Rope (Q)" and "Twofold Hunt (Q)" read in the files.
const PHRASE = /\b([A-Z][A-Za-z'’!.-]{2,}(?:[\s-]+(?:of|the|on|a|in|to|and)?[\s-]*[A-Z][A-Za-z'’!.-]{2,}){0,3})\s*\(\s*(?:P|Q|W|E|R)\s*\)/g;

const hits = new Map();
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = PHRASE.exec(src))) {
    const p = m[1].replace(/\s+/g, ' ').trim();
    if (real.has(p) || real.has(p.replace(/[!?.]+$/, ''))) continue;
    if (SAFE.has(p) || champNames.has(p)) continue;
    if (p.split(/\s+/).every(w => champNames.has(w))) continue;   // "Darius Garen"
    const rec = hits.get(p) || { n: 0, files: new Set() };
    rec.n++; rec.files.add(path.basename(file));
    hits.set(p, rec);
  }
}

const rows = [...hits.entries()].map(([p, r]) => ({ p, n: r.n, f: r.files.size }))
  .filter(r => r.n >= MIN).sort((a, b) => b.n - a.n);

console.log(`Scanned ${files.length} files against ${real.size} real ability names.`);
console.log(`${rows.length} suspect phrases appearing ${MIN}+ times.\n`);
console.log('  count  files  phrase');
for (const r of (FULL ? rows : rows.slice(0, 40))) {
  console.log('  ' + String(r.n).padStart(5) + '  ' + String(r.f).padStart(5) + '  ' + r.p);
}
if (!FULL && rows.length > 40) console.log(`  ...and ${rows.length - 40} more (--full to see all)`);

console.log('\nThis is a SUSPECT list, not a verdict. Title Case catches innocent phrases too.');
console.log('Check each against champ-data/_kits/<champ>.json before acting, and NEVER');
console.log('auto-replace: a fabricated name usually sits in a sentence that is also wrong.');

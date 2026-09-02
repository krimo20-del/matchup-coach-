#!/usr/bin/env node
/**
 * fix-ability-names.js — global, verified corrections of wrong ability names.
 *
 * WHY A SEPARATE TOOL
 *   apply-proposals.js works one matchup at a time against an exact `before` string. These
 *   errors are not per-matchup: "Beartrap on a Rope" appears 1,698 times across 215 files,
 *   in every lane. Fixing that through proposals would need thousands of individual edits
 *   and would still miss the non-writable fields. It is a find-replace, so it should be a
 *   find-replace — deterministic, auditable, no model involved.
 *
 * WHY IT IS SAFE TO DO THIS WAY
 *   Every replacement below is checked against champ-data/_kits/<champ>.json, which comes
 *   from Riot Data Dragon. The tool re-verifies at runtime and refuses to run if a target
 *   name is not the one Riot lists. It is not editing judgement or prose — only a proper
 *   noun that is currently wrong on a live, paid site.
 *
 *   Run with no flag for a dry run. --write actually edits. Always dry-run first.
 *
 * Usage:  node tools/fix-ability-names.js [--write]
 */

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const WRITE = process.argv.includes('--write');

// wrong -> { right, champ, slot } — `champ` is the kit that must confirm `right`.
const FIXES = [
  { wrong: 'Beartrap on a Rope', right: 'Bear Trap on a Rope', champ: 'kled', slot: 'Q' },
  { wrong: 'Twofold Hunt', right: 'Twofold Hex', champ: 'aurora', slot: 'Q' },
  { wrong: 'Chaaaaaarge!!!', right: 'Chaaaaaaaarge!!!', champ: 'kled', slot: 'R' },
  // Found by tools/find-fake-abilities.js: "Burning Hookshot (E)" 280x in camille.full.js.
  // Safe to rename rather than rewrite — unlike "Repeating Dashes", the ability really
  // exists and the surrounding claims stay true (Hookshot's wall dive does stun).
  { wrong: 'Burning Hookshot', right: 'Hookshot', champ: 'camille', slot: 'E' },
];

// "Repeating Dashes" is NOT a misspelling — Ambessa has no such ability. Her dash is the
// passive, Drakehound's Step. A blind swap would turn one wrong claim into a different
// wrong claim, because the surrounding sentence usually describes a cooldown the passive
// does not have. These are reported for the audit to rewrite properly, never auto-replaced.
const REPORT_ONLY = [
  { text: 'Repeating Dashes', why: "Ambessa has no ability by this name; her dash is Drakehound's Step (P). The sentence around it usually claims a cooldown the passive does not have, so it needs a rewrite, not a rename." },
];

function kitNames(champ) {
  try {
    const k = JSON.parse(fs.readFileSync(path.join(REPO, 'champ-data/_kits', champ + '.json'), 'utf8'));
    const out = {};
    for (const a of k.abilities || []) out[a.slot] = a.names || [];
    return out;
  } catch { return null; }
}

// Refuse to run on an unverified target. If Riot's data does not list the replacement, the
// fix table is wrong and every edit it makes would be wrong 1,700 times over.
console.log('Verifying every replacement against Riot Data Dragon...');
let ok = true;
for (const f of FIXES) {
  const names = kitNames(f.champ);
  const listed = names && names[f.slot];
  const good = listed && listed.some(n => n === f.right);
  console.log(`  ${good ? 'OK  ' : 'FAIL'} ${f.champ} ${f.slot}: "${f.right}" ${good ? 'confirmed' : 'NOT in kit -> ' + JSON.stringify(listed)}`);
  if (!good) ok = false;
}
if (!ok) { console.error('\nABORT — a replacement is not what Riot lists. Fix the table, not the data.'); process.exit(1); }

const targets = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== '_kits' && e.name !== 'node_modules') walk(p); }
    else if (e.name.endsWith('.js')) targets.push(p);
  }
})(path.join(REPO, 'champ-data'));

let filesTouched = 0, totalReplacements = 0;
const perFix = {};
for (const f of FIXES) perFix[f.wrong] = 0;

for (const file of targets) {
  let src = fs.readFileSync(file, 'utf8');
  const before = src;
  for (const f of FIXES) {
    const n = src.split(f.wrong).length - 1;
    if (!n) continue;
    src = src.split(f.wrong).join(f.right);
    perFix[f.wrong] += n;
    totalReplacements += n;
  }
  if (src !== before) {
    filesTouched++;
    if (WRITE) fs.writeFileSync(file, src);
  }
}

console.log(`\n${WRITE ? 'APPLIED' : 'DRY RUN'} — ${totalReplacements} replacements across ${filesTouched} files`);
for (const f of FIXES) console.log(`  ${String(perFix[f.wrong]).padStart(5)}  "${f.wrong}" -> "${f.right}"`);

console.log('\nREPORT ONLY (never auto-replaced — these need a rewrite, not a rename):');
for (const r of REPORT_ONLY) {
  let n = 0, files = 0;
  for (const file of targets) {
    const c = fs.readFileSync(file, 'utf8').split(r.text).length - 1;
    if (c) { n += c; files++; }
  }
  console.log(`  ${n} occurrences in ${files} files — "${r.text}"`);
  console.log(`     ${r.why}`);
}

if (!WRITE) console.log('\nNothing was written. Re-run with --write to apply.');
else console.log('\nNEXT: node tools/validate-content.js on the touched lanes, then regenerate pages.');

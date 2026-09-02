#!/usr/bin/env node
/**
 * regression-check.js — did THIS audit break anything? Baseline-relative, not absolute.
 *
 * WHY THIS EXISTS
 *   Three times now a ship gate has been written as an absolute assertion ("every matchup
 *   has 7 phases", "every entry has dosFull", "every champion has a masteryi entry") and
 *   three times it failed a clean audit over damage that predates the whole project:
 *     - aatrox blocked on singed/teemo/lucian having 6 phases — identical at baseline.
 *     - singed blocked on 7 malphite fields — the QA agent PROVED they were absent at the
 *       pre-audit commit and still returned complete=false.
 *     - masteryi entries are missing from 71 of 72 owner files, so an absolute check fails
 *       essentially every champion forever.
 *   Asking a model to "remember pre-existing damage doesn't count" does not hold. The
 *   comparison has to be mechanical.
 *
 * WHAT IT DOES
 *   Loads this champion's full+content files from the working tree and from a git baseline,
 *   and reports ONLY differences this audit introduced: matchups deleted, entries emptied,
 *   fields removed, phase/spike counts changed. Anything already broken at baseline is
 *   printed as context and does not affect the exit code.
 *
 * Usage: node tools/regression-check.js <ownerKey> <fullFile> <contentFile> [baselineRef]
 * Exit 0 = no regressions (ship).   Exit 1 = this audit broke something (do not ship).
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const [ownerKey, fullFile, contentFile, baseRef = 'HEAD'] = process.argv.slice(2);
if (!ownerKey || !fullFile || !contentFile) {
  console.error('usage: node tools/regression-check.js <ownerKey> <fullFile> <contentFile> [baselineRef]');
  process.exit(2);
}
const REPO = path.resolve(__dirname, '..');

// Fields whose DISAPPEARANCE is a regression. Absence at baseline is fine — plenty of
// entries never had them.
const FULL_FIELDS = ['tldr', 'winCon', 'enemyWin', 'diff', 'diffRating', 'carryRating',
  'tradeGood', 'tradeBad', 'ahead', 'loading', 'focus', 'breakdown', 'dosFull', 'dontsFull', 'report'];

function loadFull(src) {
  const w = {};
  new Function('window', src)(w);
  return (w.CHAMP_FULL && w.CHAMP_FULL[ownerKey]) || null;
}
function loadContent(src) {
  const w = { MC_CONTENT_EXTRA: [], MC_WR_TABLES: {}, MC_REAL_GAMES: {}, __mcLoaded: {} };
  new Function('window', src)(w);
  const out = {};
  for (const c of w.MC_CONTENT_EXTRA) if (c.a === ownerKey) out[c.b] = c;
  return out;
}
function fromGit(rel) {
  const p = path.relative(REPO, path.resolve(rel)).replace(/\\/g, '/');
  return execFileSync('git', ['show', `${baseRef}:${p}`],
    { cwd: REPO, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

let wFull, wCont, bFull, bCont;
try {
  wFull = loadFull(fs.readFileSync(fullFile, 'utf8'));
  wCont = loadContent(fs.readFileSync(contentFile, 'utf8'));
} catch (e) {
  console.error(`FAIL: working tree does not parse — ${e.message}`);
  process.exit(1);
}
if (!wFull) { console.error(`FAIL: no CHAMP_FULL['${ownerKey}'] in working tree`); process.exit(1); }

try {
  bFull = loadFull(fromGit(fullFile));
  bCont = loadContent(fromGit(contentFile));
} catch (e) {
  console.log(`no usable baseline at ${baseRef} (${e.message.split('\n')[0]}) — reporting state only, exiting 0`);
  console.log(`${ownerKey}: ${Object.keys(wFull).length} full entries, ${Object.keys(wCont).length} content entries`);
  process.exit(0);
}

const regressions = [], preExisting = [], improvements = [];

// --- full layer ---------------------------------------------------------------
for (const enemy of Object.keys(bFull || {})) {
  if (!wFull[enemy]) { regressions.push(`full: matchup "${enemy}" DELETED`); continue; }
  const b = bFull[enemy], w = wFull[enemy];

  for (const f of FULL_FIELDS) {
    const had = b[f] !== undefined && b[f] !== null && b[f] !== '';
    const has = w[f] !== undefined && w[f] !== null && w[f] !== '';
    if (had && !has) regressions.push(`full: ${enemy}.${f} REMOVED`);
    if (!had && !has) preExisting.push(`${enemy}.${f} absent`);
  }
  const bp = Array.isArray(b.phases) ? b.phases.length : 0;
  const wp = Array.isArray(w.phases) ? w.phases.length : 0;
  if (wp < bp) regressions.push(`full: ${enemy}.phases ${bp} -> ${wp}`);
  else if (wp > bp) improvements.push(`${enemy}.phases ${bp} -> ${wp}`);
  else if (wp !== 7) preExisting.push(`${enemy}.phases=${wp}`);

  for (const arr of ['dosFull', 'dontsFull', 'report']) {
    const bn = Array.isArray(b[arr]) ? b[arr].length : 0;
    const wn = Array.isArray(w[arr]) ? w[arr].length : 0;
    if (wn < bn) regressions.push(`full: ${enemy}.${arr} ${bn} -> ${wn} entries`);
  }
}
// Entries the audit ADDED are fine; note them so a surprise addition is visible.
for (const enemy of Object.keys(wFull)) if (bFull && !bFull[enemy]) improvements.push(`full: ${enemy} ADDED`);

// --- content layer ------------------------------------------------------------
for (const enemy of Object.keys(bCont || {})) {
  if (!wCont[enemy]) { regressions.push(`content: matchup "${enemy}" DELETED`); continue; }
  const b = bCont[enemy], w = wCont[enemy];
  for (const arr of ['win', 'whys', 'spikes']) {
    const bn = Array.isArray(b[arr]) ? b[arr].length : 0;
    const wn = Array.isArray(w[arr]) ? w[arr].length : 0;
    if (wn < bn) regressions.push(`content: ${enemy}.${arr} ${bn} -> ${wn}`);
    else if (wn > bn) improvements.push(`content: ${enemy}.${arr} ${bn} -> ${wn}`);
    else if (arr === 'spikes' && wn !== 4) preExisting.push(`${enemy}.spikes=${wn}`);
  }
  for (const f of ['early', 'mid', 'late']) {
    if (b[f] && !w[f]) regressions.push(`content: ${enemy}.${f} REMOVED`);
  }
}

// --- cross-layer level-chart agreement ----------------------------------------
// The full layer's phases[N].side and the content layer's win[N] describe the SAME row of
// the same level chart. When they disagree the page renders two different answers to
// "who wins Level 1" — visible to a paying user, and not caught by any structural check.
//
// Found on gragas vs kassadin: a proposal flipped the content chart as a group while
// updating only full phases[6], and every mechanical gate passed. QA spotted it by reading,
// and the rule at the time said ship anyway because no count changed and nothing parsed
// wrong. That was my gap, not QA's.
//
// Baseline-relative, like everything else here: a row that ALREADY disagreed before this
// audit is inherited and does not block. Only a row this audit knocked out of agreement does.
function chartRows(fullEntry, contentEntry) {
  const rows = [];
  const phases = (fullEntry && fullEntry.phases) || [];
  const win = (contentEntry && contentEntry.win) || [];
  const n = Math.max(phases.length, win.length);
  for (let i = 0; i < n; i++) {
    const a = phases[i] && phases[i].side;
    const b = win[i];
    if (a === undefined || b === undefined) continue;
    rows.push({ i, full: String(a).trim(), content: String(b).trim() });
  }
  return rows;
}
for (const enemy of Object.keys(wFull)) {
  const wRows = chartRows(wFull[enemy], wCont[enemy]);
  const bRows = bFull && bCont ? chartRows(bFull[enemy], bCont[enemy]) : [];
  const wasBad = new Set(bRows.filter(r => r.full !== r.content).map(r => r.i));
  for (const r of wRows) {
    if (r.full === r.content) continue;
    if (wasBad.has(r.i)) { preExisting.push(`${enemy} chart row ${r.i} disagreed at baseline too`); continue; }
    regressions.push(`chart: ${enemy} row ${r.i} — full "${r.full}" vs content "${r.content}" (agreed at baseline)`);
  }
}

// --- SIDE/WHY COHERENCE -------------------------------------------------------
// The existing chart check pairs the two LAYERS: full phases[i].side against content
// win[i]. It never compares a phase's side to its OWN why. The mid-lane run exposed the
// gap: 189 rows had side moved to the enemy while the why was left describing the owner
// winning that stage, so the label and the prose contradicted each other on the page and
// the gate still exited 0.
//
// Baseline-relative, like every other check here. A row only fails if THIS audit moved
// the label to the enemy and left the prose alone. Rows that already disagreed, and rows
// where the why was rewritten alongside the side, are not this audit's doing.
const ownerName = ownerKey.replace(/_(mid|bot|sup|support)$/, '').toLowerCase();
const isOwnerSide = v => {
  const n = String(v).toLowerCase().replace(/[^a-z]/g, '');
  return n === 'skill' || n.includes(ownerName) || ownerName.includes(n);
};
for (const enemy of Object.keys(wFull)) {
  const wPh = (wFull[enemy] && wFull[enemy].phases) || [];
  const bPh = (bFull && bFull[enemy] && bFull[enemy].phases) || [];
  for (let i = 0; i < wPh.length; i++) {
    if (!wPh[i] || !bPh[i]) continue;
    const wSide = String(wPh[i].side || ''), bSide = String(bPh[i].side || '');
    if (wSide === bSide) continue;              // label untouched by this audit
    if (isOwnerSide(wSide)) continue;           // moved toward owner/Skill — not this defect
    const wWhy = String(wPh[i].why || ''), bWhy = String(bPh[i].why || '');
    if (wWhy !== bWhy) continue;                // prose was rewritten with it — a proper pair
    regressions.push(
      `coherence: ${enemy} row ${i} — side moved "${bSide}" -> "${wSide}" but why is unchanged ` +
      `and still reads as written for ${ownerKey}. Change the pair or leave the row.`);
  }
}

// --- report -------------------------------------------------------------------
console.log(`${ownerKey}: ${Object.keys(wFull).length} full / ${Object.keys(wCont).length} content entries (baseline ${baseRef})`);
if (improvements.length) {
  console.log(`\n  IMPROVED by this audit (${improvements.length}):`);
  improvements.slice(0, 10).forEach(s => console.log('    + ' + s));
}
if (preExisting.length) {
  console.log(`\n  PRE-EXISTING, NOT BLOCKING (${preExisting.length} — unchanged since baseline):`);
  preExisting.slice(0, 12).forEach(s => console.log('    · ' + s));
  if (preExisting.length > 12) console.log(`    · ...and ${preExisting.length - 12} more`);
}
if (regressions.length) {
  console.log(`\n  REGRESSIONS INTRODUCED BY THIS AUDIT (${regressions.length}):`);
  regressions.forEach(s => console.log('    ! ' + s));
  console.error('\nFAIL — do not ship. Repair via tools/apply-proposals.js.');
  console.error('Do NOT git checkout: that discards every good edit in these files too.');
  process.exit(1);
}
console.log('\nOK — this audit introduced no regressions. Pre-existing gaps are tracked, not blocking.');
process.exit(0);

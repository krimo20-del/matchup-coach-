// apply-proposals.js — the ONLY thing that writes matchup data.
//
// Agents never edit champ-data. They write one proposal file per matchup to
// audits/<lane>/<ownerKey>__<enemy>.json. This script validates every proposed edit and
// applies them ATOMICALLY PER MATCHUP. No model is in the write path.
//
//   node tools/apply-proposals.js bot                     # dry run: report only
//   node tools/apply-proposals.js bot --write             # apply
//   node tools/apply-proposals.js bot --write --champ jinx_bot
//
// WHY ATOMIC: a QA pass found that applying SOME of a matchup's edits is worse than
// applying none. One matchup had its content win[5] updated while the matching
// full phases[4].side was rejected, so the two layers ended up disagreeing on more
// stages than before, and a phase card displayed a verdict contradicting its own text.
// All of a matchup's edits now land together or not at all.
//
// An edit is rejected if:
//   - `before` does not match what is on disk (stale — stops clobbering)
//   - the new text drifts >10% in length (the length rule, enforced)
//   - it contains elo tiers, negative non-interactions, or filler
//   - the path is not a known, writable field
// One rejected edit rejects its whole matchup. Rejections are always reported.
const fs = require('fs');
const path = require('path');

const LANE = process.argv[2];
const WRITE = process.argv.includes('--write');
const ci = process.argv.indexOf('--champ');
const ONLY_CHAMP = ci > -1 ? process.argv[ci + 1] : null;
if (!LANE) { console.error('usage: node tools/apply-proposals.js <lane> [--write] [--champ <ownerKey>]'); process.exit(1); }

const LANES = {
  top: { dir: 'champ-data/content', full: 'champ-data', suffix: '' },
  mid: { dir: 'champ-data/content/mid', full: 'champ-data/mid', suffix: '_mid' },
  bot: { dir: 'champ-data/content/bot', full: 'champ-data/bot', suffix: '_bot' },
  support: { dir: 'champ-data/content/sup', full: 'champ-data/sup', suffix: '_sup' },
};
const L = LANES[LANE];
if (!L) { console.error('unknown lane: ' + LANE); process.exit(1); }

const MAX_DRIFT = 0.10;
const MIN_LEN_CHECKED = 25;  // below this, length is meaningless ("Sett", "6/10")
// "grandmaster" also appears inside Jax's real ultimate, Grandmaster-at-Arms. Matching it
// as an elo tier rejected every attempt to write his correct ability name — which is why
// the wrong name survived every previous pass, on every Jax matchup in every lane.
// Only treat these as elo tiers when they are NOT part of a hyphenated ability name.
// 2026-08-24: the hyphen guard was not enough. Jax ALSO has "Grandmaster's Might", and an
// apostrophe is not a hyphen — so that ability tripped the filter and every edit naming it
// was still silently rejected. Same trap as above, one character apart. Exclude both
// apostrophe forms (ASCII ' and typographic ’) as well as the hyphen.
const ELO = /\b(diamond\s*\+|master\s*\+|challenger(?![-'’])|grandmaster(?![-'’])|low\s*elo|high\s*elo)\b/i;
const NEGATIVE = /\b(does not (block|proc|apply|work|reset)|doesn['’]t (block|proc|apply|work|reset)|cannot be (cleansed|blocked|shielded)|no spell ?shield|qss does not|tenacity does not)\b/i;
const FILLER = /\b(generally speaking|make sure to|it['’]s important to|be aware that|try to remember|as a general rule)\b/i;

const WRITABLE_CONTENT = /^(win\[\d+\]|whys\[\d+\]|early|mid|late|spikes\[\d+\]\.(text|when)|wants\.(you|foe)\[\d+\])$/;
const WRITABLE_FULL = /^(tldr|winCon|enemyWin|diff|tone|diffRating|carryRating|tradeGood|tradeBad|ahead|loading|focus(\.text|\.letters\[\d+\])?|phases\[\d+\]\.(why|side|rating|label)|breakdown\.[A-Za-z]+|(dosFull|dontsFull)\[\d+\]\.(t|d)|report\[\d+\]\.(h|t))$/;

// Edits that must land together or not at all. A QA pass found that applying content
// win[5] while rejecting full phases[4].side left the two layers disagreeing and a phase
// card contradicting its own text. Everything else is independent — one bad prose edit
// should not discard a matchup's other good work.
const CHART_EDIT = /^(win\[\d+\]|phases\[\d+\]\.(side|rating|why))$/;

// `create` is only ever true for a create-mode edit (before: null). Without it, a path
// like spikes[3].text on a 3-entry array bails here — spikes[3] is undefined, so resolving
// ".text" hits a null and returns null. That is correct for a normal edit (never invent a
// place to write) but it also made the ~370 inherited structural gaps permanently
// unrepairable: there is no way to add the missing 4th spike. In create mode we materialise
// the missing containers; the caller has already checked the destination is genuinely empty.
function accessor(obj, p, create = false) {
  const parts = p.match(/[A-Za-z]+|\[\d+\]/g);
  if (!parts) return null;
  let cur = obj, parent = null, key = null;
  for (const part of parts) {
    if (cur == null) {
      if (!create || parent == null) return null;
      cur = parent[key] = (part[0] === '[' ? [] : {});
    }
    if (part[0] === '[') { const i = +part.slice(1, -1); parent = cur; key = i; cur = cur[i]; }
    else { parent = cur; key = part; cur = cur[part]; }
  }
  return parent == null ? null : { get: () => parent[key], set: v => { parent[key] = v; } };
}

// ENUM FIELDS hold a fixed token — a champion name, a verdict, a rating, a colour. Their
// length is whatever the token happens to be, so the ±10% prose rule is meaningless here:
// "Gwen" -> "Trundle" is +75% and would always be rejected. Every runner independently
// reported that this made level-chart corrections impossible, stranding dozens of charts
// that contradicted their own prose. Enum fields are exempt from the length band; they are
// still protected by the stale-`before` check and by chart-group atomicity.
const ENUM_FIELD = /^(win\[\d+\]|phases\[\d+\]\.(side|rating|label)|diff|diffRating|carryRating|tone|focus\.letters\[\d+\])$/;

// "phases[4].side" -> "4" for the given suffix; null for anything else. Plain string work:
// this file has been through enough escaping accidents already.
function rowOf(path, suffix) {
  if (!path.startsWith('phases[') || !path.endsWith(']' + suffix)) return null;
  const inner = path.slice('phases['.length, path.length - (']' + suffix).length);
  return /^[0-9]+$/.test(inner) ? inner : null;
}

function sideMovingRows(edits) {
  const rows = new Set();
  for (const e of (edits || [])) {
    if (!e || typeof e.path !== 'string') continue;
    const row = rowOf(e.path, '.side');
    if (row !== null && e.before !== e.after) rows.add(row);
  }
  return rows;
}

function checkEdit(e, sideRows) {
  const errs = [];
  if (!e || typeof e.path !== 'string') return ['malformed edit'];
  if (typeof e.after !== 'string') return ['`after` must be a string'];
  const ok = e.layer === 'content' ? WRITABLE_CONTENT.test(e.path)
    : e.layer === 'full' ? WRITABLE_FULL.test(e.path) : false;
  if (!ok) errs.push(`path not writable (${e.layer}:${e.path})`);
  const b = String(e.before ?? '');
  const whyRow = rowOf(e.path, '.why');
  const pairedWithSideMove = whyRow != null && sideRows && sideRows.has(whyRow);
  if (!ENUM_FIELD.test(e.path) && !pairedWithSideMove && b.length >= MIN_LEN_CHECKED) {
    const drift = Math.abs(e.after.length - b.length) / b.length;
    if (drift > MAX_DRIFT) errs.push(`length drift ${(drift * 100).toFixed(1)}%`);
  }
  if (ELO.test(e.after)) errs.push('mentions an elo tier');
  if (NEGATIVE.test(e.after)) errs.push('states a non-interaction');
  if (FILLER.test(e.after)) errs.push('contains filler');
  return errs;
}

// Brace-match a JSON object starting at `open`, respecting strings and escapes.
// Line-based parsing failed on files that spread CHAMP_FULL over several assignments
// and/or several lines; this does not care about formatting at all.
function matchBrace(src, open) {
  let depth = 0, inStr = false, esc = false;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (!depth) return i; }
  }
  return -1;
}

// Index every CHAMP_FULL assignment in a file: enemy -> the assignment holding it.
function indexFull(src, ownerKey) {
  const assigns = [];   // { start, end, obj, inner }
  const byEnemy = new Map();
  // Assignments appear as CHAMP_FULL = {...}, CHAMP_FULL["key"] = {...} AND
  // CHAMP_FULL.key = {...}. Missing the dot form made every full-layer edit fail.
  const re = /window\.CHAMP_FULL\s*(?:\[[^\]]*\]|\.[A-Za-z_$][\w$]*)?\s*=\s*/g;
  let m;
  while ((m = re.exec(src))) {
    const open = src.indexOf('{', m.index + m[0].length - 1);
    if (open < 0) continue;
    const close = matchBrace(src, open);
    if (close < 0) continue;
    let obj; try { obj = JSON.parse(src.slice(open, close + 1)); } catch (e) { continue; }
    // Decide from the ASSIGNMENT FORM, never from the contents. `CHAMP_FULL.mel = {...}`
    // and `CHAMP_FULL["mel"] = {...}` mean obj IS the enemy map; bare `CHAMP_FULL = {...}`
    // means it is keyed by ownerKey. Sniffing obj[ownerKey] broke on champions that have a
    // MIRROR matchup (mel vs mel), where the mirror entry was mistaken for the enemy map.
    const targeted = /\[|\./.test(m[0].replace('window.CHAMP_FULL', ''));
    const inner = targeted ? obj
      : (obj[ownerKey] && typeof obj[ownerKey] === 'object' && !Array.isArray(obj[ownerKey]) ? obj[ownerKey] : obj);
    const a = { start: open, end: close + 1, obj, inner };
    assigns.push(a);
    for (const k of Object.keys(inner)) if (!byEnemy.has(k)) byEnemy.set(k, a);
    re.lastIndex = close;
  }
  return { assigns, byEnemy };
}

const dir = path.join('audits', LANE);
if (!fs.existsSync(dir)) { console.error(`no proposals at ${dir}`); process.exit(1); }

const byOwner = new Map();
for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.json') && !x.startsWith('_'))) {
  let p; try { p = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); } catch (e) { console.error(`  SKIP ${f}: unparseable`); continue; }
  if (!p.ownerKey || !p.enemy) continue;
  if (ONLY_CHAMP && p.ownerKey !== ONLY_CHAMP) continue;
  if (!byOwner.has(p.ownerKey)) byOwner.set(p.ownerKey, []);
  byOwner.get(p.ownerKey).push(p);
}

let applied = 0, alreadyDone = 0, matchupsApplied = 0, matchupsRejected = 0, matchupsClean = 0;
const rejectLog = [];

for (const [ownerKey, proposals] of byOwner) {
  const base = ownerKey.replace(new RegExp(L.suffix + '$'), '');
  const cFile = path.join(L.dir, base + '.js');
  const fFile = path.join(L.full, base + '.full.js');
  if (!fs.existsSync(cFile)) { console.error(`  SKIP ${ownerKey}: no ${cFile}`); continue; }

  const cLines = fs.readFileSync(cFile, 'utf8').split(/\r?\n/);
  let fSrc = fs.existsSync(fFile) ? fs.readFileSync(fFile, 'utf8') : null;
  let fIdx = fSrc ? indexFull(fSrc, ownerKey) : null;
  let cDirty = false, fDirty = false;

  for (const p of proposals) {
    const needle = `"a":"${ownerKey}","b":"${p.enemy}"`;
    const li = cLines.findIndex(l => l.includes(needle));
    let cObj = null, cPre = '', cPost = '';
    if (li >= 0) {
      const line = cLines[li], s = line.indexOf('{'), e = line.lastIndexOf('}');
      if (s >= 0 && e > s) { try { cObj = JSON.parse(line.slice(s, e + 1)); cPre = line.slice(0, s); cPost = line.slice(e + 1); } catch (err) {} }
    }
    const fEntry = fIdx && fIdx.byEnemy.get(p.enemy) ? fIdx.byEnemy.get(p.enemy).inner[p.enemy] : null;

    // ---- validate, separating chart edits (atomic as a group) from the rest ----
    const errs = [], chartErrs = [], pending = [], chartPending = [];
    const sideRows = sideMovingRows(p.edits);

    // A side move with no why rewrite is the single largest defect class this pipeline
    // produces: 498 of 1184 on the bot lane, every one of them a row whose verdict says
    // one champion and whose sentence underneath argues the other. The prompt has told
    // agents not to do this for three revisions and they still do it at 42%. So it stops
    // being a request. The whole chart group is refused, the row keeps its old (stale but
    // self-consistent) verdict, and the rejection message says exactly what was missing.
    const whyRowsGiven = new Set();
    for (const e of (p.edits || [])) {
      const r = rowOf(typeof e.path === 'string' ? e.path : '', '.why');
      if (r !== null) whyRowsGiven.add(r);
    }
    for (const r of sideRows) {
      if (!whyRowsGiven.has(r)) {
        chartErrs.push(`[phases[${r}].side] moves the row's side but proposes no phases[${r}].why — `
          + `the row would contradict its own text. Rewrite the why in the same proposal, or leave the row.`);
      }
    }
    for (const e of (p.edits || [])) {
      const isChart = CHART_EDIT.test(e.path);
      const fail = msg => (isChart ? chartErrs : errs).push(`[${e.path}] ${msg}`);
      const bad = checkEdit(e, sideRows);
      if (bad.length) { fail(bad.join('; ')); continue; }
      const target = e.layer === 'content' ? cObj : fEntry;
      if (!target) { fail(`${e.layer} entry not found`); continue; }
      const acc = accessor(target, e.path, e.before === null);
      if (!acc) { fail('path does not resolve'); continue; }
      const cur = acc.get();
      if (cur === e.after) { alreadyDone++; continue; }

      // CREATE MODE: `before: null` means "this does not exist yet, add it".
      // The repo carries ~370 inherited structural gaps — 135 matchups with 3 spikes
      // instead of 4, 92 absent full-layer entries, 138 absent fields. None can be
      // repaired by a normal edit, because a normal edit needs a `before` string to match
      // and there is nothing on disk to match against. They also cannot be auto-generated:
      // a 4th spike is real League content, and inventing it is exactly what the project
      // forbids. So the audit has to be able to ADD, and this is the only safe way to let
      // it: create-only, never overwrite.
      if (e.before === null) {
        const absent = cur === undefined || cur === null || cur === '';
        if (!absent) { fail('CREATE refused — value already exists, use a normal edit with an exact before'); continue; }
        (isChart ? chartPending : pending).push({ e, acc });
        continue;
      }

      if (typeof e.before === 'string' && cur !== e.before) { fail('STALE — disk differs from "before"'); continue; }
      (isChart ? chartPending : pending).push({ e, acc });
    }

    // The level chart lands whole or not at all — a half-applied chart is worse than none.
    if (chartErrs.length) {
      matchupsRejected++;
      rejectLog.push(`${ownerKey} vs ${p.enemy}: level-chart edits held back (${chartErrs.length})\n      ` + chartErrs.slice(0, 3).join('\n      '));
    } else pending.push(...chartPending);

    if (errs.length) rejectLog.push(`${ownerKey} vs ${p.enemy}: ${errs.length} edit(s) dropped\n      ` + errs.slice(0, 3).join('\n      '));
    if (!pending.length) { if (!errs.length && !chartErrs.length) matchupsClean++; continue; }

    for (const { e, acc } of pending) {
      acc.set(e.after);
      applied++;
      if (e.layer === 'content') cDirty = true; else fDirty = true;
    }
    matchupsApplied++;
    if (cObj && li >= 0) cLines[li] = cPre + JSON.stringify(cObj) + cPost;
  }

  if (WRITE && cDirty) fs.writeFileSync(cFile, cLines.join('\n'));
  if (WRITE && fDirty && fSrc && fIdx) {
    // splice assignments back in reverse so earlier offsets stay valid
    let out = fSrc;
    for (const a of [...fIdx.assigns].sort((x, y) => y.start - x.start)) {
      out = out.slice(0, a.start) + JSON.stringify(a.obj) + out.slice(a.end);
    }
    fs.writeFileSync(fFile, out);
  }
}

console.log(`=== apply-proposals (${LANE})${WRITE ? '' : ' — DRY RUN, nothing written'} ===`);
console.log(`matchups applied      : ${matchupsApplied}`);
console.log(`matchups already done : ${matchupsClean}`);
console.log(`matchups REJECTED     : ${matchupsRejected}   <- atomic, nothing from these landed`);
console.log(`individual edits set  : ${applied}`);
console.log(`edits already in place: ${alreadyDone}`);
if (rejectLog.length) {
  const hist = new Map();
  for (const r of rejectLog) for (const m of r.matchAll(/\] ([a-zA-Z][^;\n]*)/g)) {
    const k = m[1].replace(/length drift [\d.]+%/, 'length drift >10%').trim();
    hist.set(k, (hist.get(k) || 0) + 1);
  }
  console.log(`\n--- why matchups were rejected ---`);
  [...hist.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).forEach(([r, n]) => console.log(String(n).padStart(6) + '  ' + r));
  console.log(`\n--- first 6 rejected matchups ---`);
  rejectLog.slice(0, 6).forEach(r => console.log('  ' + r));
}
if (!WRITE) console.log('\nre-run with --write to apply.');

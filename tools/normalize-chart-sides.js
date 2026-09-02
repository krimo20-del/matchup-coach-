#!/usr/bin/env node
/**
 * normalize-chart-sides.js — make level-chart side/win values canonical tokens.
 *
 * WHY
 *   phases[N].side and win[N] are enums: they should hold a champion's display name or
 *   "Skill". 107 of 70,774 values hold something else — "Heimer", "Morde", "Panth",
 *   "Aatrox if ahead", "Naut utility", "Mega Gnar". Consequences, both real:
 *     - The page renders two spellings of the same answer ("Morde" on one layer,
 *       "Mordekaiser" on the other) and every equality check calls it a contradiction.
 *     - mirror-fix.js cannot converge: it compares sides by string, so "Akali if even" and
 *       "Akali" look like a genuine disagreement and it rewrites them forever. That is why
 *       a residual pair kept reporting the same 5 conflicts after 13,784 were fixed.
 *
 * SAFETY
 *   A value is only rewritten when it unambiguously names ONE of the two champions in that
 *   matchup — either its first word is a prefix of that champion's name ("Heimer" ->
 *   Heimerdinger) or the name appears inside it ("Mega Gnar" -> Gnar). If both champions
 *   match, or neither does, it is REPORTED and left alone. "Depends", "Pending" and
 *   "Skill/Aatrox" are genuinely ambiguous and are never guessed at.
 *
 * Usage: node tools/normalize-chart-sides.js <lane> [--write]
 */
const fs = require('fs'), path = require('path');
const REPO = path.resolve(__dirname, '..');
const LANE_DIR = { top: ['champ-data', 'champ-data/content'], mid: ['champ-data/mid', 'champ-data/content/mid'],
  bot: ['champ-data/bot', 'champ-data/content/bot'], sup: ['champ-data/sup', 'champ-data/content/sup'] };
const args = process.argv.slice(2);
const lane = args.find(a => LANE_DIR[a]) || 'top';
const WRITE = args.includes('--write');
const [FULL_DIR, CONTENT_DIR] = LANE_DIR[lane];

const disp = {};
for (const f of fs.readdirSync(path.join(REPO, 'champ-data/_kits')).filter(x => x.endsWith('.json'))) {
  try { const k = JSON.parse(fs.readFileSync(path.join(REPO, 'champ-data/_kits', f), 'utf8'));
    if (k.name) disp[f.replace(/\.json$/, '')] = k.name; } catch {}
}
const CANON = new Set([...Object.values(disp), 'Skill']);
// Riot's internal ids do not always match the matchup key: Wukong's kit file is
// monkeyking.json, so disp['wukong'] was undefined and "Wukong teamfight" looked
// unresolvable rather than obvious.
const ALIAS = { wukong: 'monkeyking', chogath: 'chogath', drmundo: 'drmundo' };
for (const [k, v] of Object.entries(ALIAS)) if (!disp[k] && disp[v]) disp[k] = disp[v];
const norm = s => String(s).trim().toLowerCase().replace(/[^a-z ]/g, '');

function resolve(val, ownerSlug, enemySlug) {
  const v = String(val).trim();
  if (CANON.has(v)) return null;
  const cands = [];
  for (const slug of [ownerSlug, enemySlug]) {
    const name = disp[slug]; if (!name) continue;
    const n = norm(name), t = norm(v), first = t.split(' ')[0];
    if (t.includes(n)) { cands.push(name); continue; }                    // "Mega Gnar" -> Gnar
    if (first && n.startsWith(first) && first.length >= 3) cands.push(name); // "Heimer" -> Heimerdinger
  }
  const uniq = [...new Set(cands)];
  return uniq.length === 1 ? uniq[0] : null;
}

let changed = 0, reported = [];
const files = fs.readdirSync(path.join(REPO, CONTENT_DIR)).filter(x => x.endsWith('.js'));
for (const f of files) {
  const key = f.replace(/\.js$/, '');
  const cPath = path.join(REPO, CONTENT_DIR, f), fPath = path.join(REPO, FULL_DIR, key + '.full.js');
  if (!fs.existsSync(fPath)) continue;
  let cSrc = fs.readFileSync(cPath, 'utf8'), fSrc = fs.readFileSync(fPath, 'utf8');
  const w = { MC_CONTENT_EXTRA: [], MC_WR_TABLES: {}, MC_REAL_GAMES: {}, __mcLoaded: {} };
  const wf = {};
  try { new Function('window', cSrc)(w); new Function('window', fSrc)(wf); } catch { continue; }
  const entries = (wf.CHAMP_FULL && wf.CHAMP_FULL[key]) || {};
  const seen = new Set();
  for (const c of w.MC_CONTENT_EXTRA) {
    if (c.a !== key) continue;
    const vals = [...(c.win || []), ...(((entries[c.b] || {}).phases) || []).map(p => p && p.side)];
    for (const v of vals) {
      if (v === undefined || v === null) continue;
      const s = String(v).trim();
      if (CANON.has(s) || seen.has(key + '|' + c.b + '|' + s)) continue;
      seen.add(key + '|' + c.b + '|' + s);
      const to = resolve(s, key, c.b);
      if (!to) { reported.push(`${key} vs ${c.b}: "${s}" — ambiguous, left alone`); continue; }
      // Replace only the exact quoted token, so prose containing the same words is untouched.
      // Replace the exact QUOTED token only, so prose containing the same words is safe.
      let nc = cSrc, nf = fSrc;
      for (const qc of ['"', "'"]) {
        nc = nc.split(qc + s + qc).join(qc + to + qc);
        nf = nf.split(qc + s + qc).join(qc + to + qc);
      }
      if (nc !== cSrc || nf !== fSrc) { changed++; cSrc = nc; fSrc = nf; console.log(`  ${key} vs ${c.b}: "${s}" -> "${to}"`); }
    }
  }
  if (WRITE) { fs.writeFileSync(cPath, cSrc); fs.writeFileSync(fPath, fSrc); }
}
console.log(`\n${WRITE ? 'APPLIED' : 'DRY RUN'} — ${changed} token(s) normalised`);
if (reported.length) { console.log(`\nAMBIGUOUS, NOT TOUCHED (${reported.length}):`); reported.forEach(r => console.log('  ' + r)); }
if (!WRITE) console.log('\nre-run with --write to apply.');

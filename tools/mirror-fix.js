// mirror-fix.js — force every mirrored pair into perfect agreement. Deterministic.
//
//   node tools/mirror-fix.js top            # dry run
//   node tools/mirror-fix.js top --write    # apply
//   node tools/mirror-fix.js --write        # all lanes
//
// Each matchup exists twice (A vs B, B vs A) and each page has two layers (content win[]
// and full phases[]). That is FOUR places describing one fight, and mirror-check.js found
// 52,497 places where they disagreed. This computes ONE canonical answer per stage and
// writes it into all four.
//
// CANONICAL SOURCE: the direction backed by more recorded games wins. Real data beats the
// other page's guess. Within that direction, phases[].side is preferred over win[] because
// the app is the primary surface. Ties break toward the alphabetically-first champion so
// the result is stable across runs.
//
// RULES ENFORCED
//   winner   both pages, both layers name the SAME champion at each stage
//   rating   A's rating + B's rating = 10  (3/10 opposite 7/10)
//   winrate  A% + B% = 100, taken from the larger sample
//   diff     illegal pairs (HARD/HARD, FAV/FAV) resolved from the win rate
// Prose is never touched — only verdict fields.
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const WRITE = argv.includes('--write');
const LANE = argv[0] && !argv[0].startsWith('--') ? argv[0] : null;

const LANES = [
  { key: 'top', dir: 'champ-data/content', full: 'champ-data', suffix: '' },
  { key: 'mid', dir: 'champ-data/content/mid', full: 'champ-data/mid', suffix: '_mid' },
  { key: 'bot', dir: 'champ-data/content/bot', full: 'champ-data/bot', suffix: '_bot' },
  { key: 'support', dir: 'champ-data/content/sup', full: 'champ-data/sup', suffix: '_sup' },
].filter(L => !LANE || L.key === LANE);

const norm = s => String(s == null ? '' : s).toLowerCase().replace(/[^a-z0-9]/g, '');
const NEUTRAL = new Set(['skill', 'even', 'mirror']);
const ratingNum = r => { const m = /^\s*([\d.]+)\s*\/\s*10\s*$/.exec(String(r || '')); return m ? parseFloat(m[1]) : null; };
const fmtRating = n => `${Number.isInteger(n) ? n : n.toFixed(1)}/10`;

function matchBrace(s, o) {
  let d = 0, q = false, e = false;
  for (let i = o; i < s.length; i++) {
    const c = s[i];
    if (e) { e = false; continue; }
    if (c === '\\') { e = true; continue; }
    if (c === '"') { q = !q; continue; }
    if (q) continue;
    if (c === '{') d++; else if (c === '}') { d--; if (!d) return i; }
  }
  return -1;
}

let fixed = 0, pairsFixed = 0;
const byKind = {};
const bump = k => { byKind[k] = (byKind[k] || 0) + 1; fixed++; };

for (const L of LANES) {
  if (!fs.existsSync(L.dir)) continue;

  // ---- load lane ----
  const champs = {};
  for (const file of fs.readdirSync(L.dir).filter(f => f.endsWith('.js'))) {
    const slug = file.replace('.js', ''), key = slug + L.suffix;
    const cPath = path.join(L.dir, file);
    const cLines = fs.readFileSync(cPath, 'utf8').split(/\r?\n/);
    const w = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
    try { new Function('window', cLines.join('\n'))(w); } catch (e) { continue; }
    const entries = {};
    for (const c of w.MC_CONTENT_EXTRA) if (c.a === key) entries[c.b] = c;
    if (!Object.keys(entries).length) continue;

    const fPath = path.join(L.full, slug + '.full.js');
    let fSrc = null, fAssigns = [], fMap = {};
    if (fs.existsSync(fPath)) {
      fSrc = fs.readFileSync(fPath, 'utf8');
      const re = /window\.CHAMP_FULL\s*(?:\[[^\]]*\]|\.[A-Za-z_$][\w$]*)?\s*=\s*/g;
      let m;
      while ((m = re.exec(fSrc))) {
        const open = fSrc.indexOf('{', m.index + m[0].length - 1);
        if (open < 0) continue;
        const close = matchBrace(fSrc, open);
        if (close < 0) continue;
        let obj; try { obj = JSON.parse(fSrc.slice(open, close + 1)); } catch (e) { re.lastIndex = close; continue; }
        const targeted = /\[|\./.test(m[0].replace('window.CHAMP_FULL', ''));
        const inner = targeted ? obj : (obj[key] && typeof obj[key] === 'object' ? obj[key] : obj);
        fAssigns.push({ start: open, end: close + 1, obj });
        for (const k of Object.keys(inner)) if (!fMap[k]) fMap[k] = inner[k];
        re.lastIndex = close;
      }
    }
    champs[slug] = { slug, key, cPath, cLines, entries, fPath, fSrc, fAssigns, fMap,
      wr: w.MC_WR_TABLES[key] || {}, games: w.MC_REAL_GAMES[key] || {}, cDirty: false, fDirty: false };
  }

  // display name for a slug, as the other page would write it
  const disp = {};
  for (const s of Object.keys(champs)) {
    const anyEntry = Object.values(champs).map(c => c.entries[s]).find(Boolean);
    let name = s;
    for (const c of Object.values(champs)) {
      const e = c.entries[s];
      if (e && Array.isArray(e.win)) { const hit = e.win.find(v => norm(v) && !NEUTRAL.has(norm(v)) && norm(v) !== norm(c.slug)); if (hit) { name = hit; break; } }
    }
    disp[s] = name;
  }

  const slugs = Object.keys(champs);
  for (const a of slugs) for (const b of slugs) {
    if (a >= b) continue;
    const A = champs[a], B = champs[b];
    const ab = A.entries[b], ba = B.entries[a];
    if (!ab || !ba) continue;
    const fa = A.fMap[b], fb = B.fMap[a];
    let touched = false;

    const ga = Number(A.games[b]) || 0, gb = Number(B.games[a]) || 0;
    // authoritative direction: more games; tie -> alphabetically first, for stability
    const aAuth = ga > gb ? true : gb > ga ? false : a < b;

    // ---- win rate: sum to 100 from the larger sample ----
    const wa = A.wr[b], wb = B.wr[a];
    if (typeof wa === 'number' && typeof wb === 'number' && Math.abs(wa + wb - 100) > 0.01) {
      const keep = aAuth ? wa : 100 - wb;
      const other = Math.round((100 - keep) * 100) / 100;
      A.wr[b] = Math.round(keep * 100) / 100; B.wr[a] = other;
      A.cDirty = B.cDirty = true; touched = true; bump('winrate-sum');
    }
    // pooled sample size — both pages should cite the same games
    if (ga !== gb) { const pooled = Math.max(ga, gb); A.games[b] = pooled; B.games[a] = pooled; A.cDirty = B.cDirty = true; bump('games-pooled'); touched = true; }

    // ---- per-stage winner + rating across all four places ----
    for (let i = 0; i < 7; i++) {
      const src = aAuth ? { ent: ab, ph: fa && fa.phases && fa.phases[i], self: a } : { ent: ba, ph: fb && fb.phases && fb.phases[i], self: b };
      // canonical winner: prefer the authoritative page's phases[].side, else its win[]
      let canon = src.ph && src.ph.side ? src.ph.side : (Array.isArray(src.ent.win) ? src.ent.win[i] : null);
      if (canon == null) continue;
      const cn = norm(canon);
      const neutral = NEUTRAL.has(cn);
      // resolve to a slug so each page can write its own display spelling
      const canonSlug = neutral ? null : (cn === norm(a) || cn === norm(disp[a]) ? a : cn === norm(b) || cn === norm(disp[b]) ? b : null);
      if (!neutral && !canonSlug) continue;          // unrecognised name — leave alone
      const wantA = neutral ? (NEUTRAL.has(norm(canon)) ? canon : 'Skill') : disp[canonSlug];
      const wantB = wantA;

      for (const [C, ent, ph, want] of [[A, ab, fa && fa.phases && fa.phases[i], wantA], [B, ba, fb && fb.phases && fb.phases[i], wantB]]) {
        if (Array.isArray(ent.win) && ent.win.length === 7 && norm(ent.win[i]) !== norm(want)) { ent.win[i] = want; C.cDirty = true; touched = true; bump('win-side'); }
        if (ph && norm(ph.side) !== norm(want)) { ph.side = want; C.fDirty = true; touched = true; bump('phase-side'); }
      }

      // rating: authoritative value, mirror = 10 - it
      const pa = fa && fa.phases && fa.phases[i], pb = fb && fb.phases && fb.phases[i];
      if (pa && pb) {
        const ra = ratingNum(pa.rating), rb = ratingNum(pb.rating);
        if (ra != null && rb != null && Math.abs(ra + rb - 10) > 0.01) {
          const keep = aAuth ? ra : 10 - rb;
          const k = Math.max(0, Math.min(10, Math.round(keep * 10) / 10));
          pa.rating = fmtRating(k); pb.rating = fmtRating(Math.round((10 - k) * 10) / 10);
          A.fDirty = B.fDirty = true; touched = true; bump('rating-sum');
        }
      }
    }

    // ---- side/rating coherence ----
    // The rating reads "how favourable this stage is for the OWNER of this page": >5 means
    // the owner is ahead, <5 means the enemy is, ~5 is even. Earlier passes of this tool
    // rewrote `side` without touching `rating`, leaving 30% of phases showing a verdict
    // that contradicts its own number (e.g. "Aurora" beside "6/10" on Aurora's page).
    // Mirroring the rating around 5 fixes the DIRECTION while preserving the MAGNITUDE
    // someone already judged — a 3/10 becomes 7/10, not a guessed value.
    for (const [C, self, fu] of [[A, a, fa], [B, b, fb]]) {
      if (!fu || !Array.isArray(fu.phases)) continue;
      for (const p of fu.phases) {
        const n = ratingNum(p && p.rating);
        if (n == null) continue;
        const side = norm(p.side);
        if (!side) continue;
        const neutral = NEUTRAL.has(side);
        const ownerAhead = side === norm(self) || side === norm(disp[self]);
        let want = null;
        if (neutral) { if (Math.abs(n - 5) > 1.5) want = 5; }
        else if (ownerAhead && n < 5) want = 10 - n;      // owner ahead but rated as losing
        else if (!ownerAhead && n > 5) want = 10 - n;      // enemy ahead but rated as winning
        if (want != null) {
          p.rating = fmtRating(Math.round(want * 10) / 10);
          C.fDirty = true; touched = true; bump('side-rating-coherence');
        }
      }
    }

    // ---- difficulty labels: resolve illegal pairs from the win rate ----
    if (fa && fb) {
      const LEGAL = new Set(['fav|hard', 'hard|fav', 'fav|tricky', 'tricky|fav', 'even|even', 'even|tricky', 'tricky|even', 'tricky|tricky', 'mirror|mirror']);
      const da = norm(fa.diff), db = norm(fb.diff);
      if (da && db && !LEGAL.has(`${da}|${db}`)) {
        const w = Number(A.wr[b]);
        if (!isNaN(w)) {
          if (w >= 52) { fa.diff = 'FAV'; fb.diff = 'HARD'; }
          else if (w <= 48) { fa.diff = 'HARD'; fb.diff = 'FAV'; }
          else { fa.diff = 'EVEN'; fb.diff = 'EVEN'; }
          A.fDirty = B.fDirty = true; touched = true; bump('diff-pair');
        }
      }
    }
    if (touched) pairsFixed++;
  }

  // ---- write ----
  if (WRITE) for (const C of Object.values(champs)) {
    if (C.cDirty) {
      for (let i = 0; i < C.cLines.length; i++) {
        const line = C.cLines[i];
        if (!line.includes(`"a":"${C.key}"`)) continue;
        const s = line.indexOf('{'), e = line.lastIndexOf('}');
        if (s < 0 || e <= s) continue;
        let o; try { o = JSON.parse(line.slice(s, e + 1)); } catch (err) { continue; }
        const live = C.entries[o.b];
        if (live) C.cLines[i] = line.slice(0, s) + JSON.stringify(live) + line.slice(e + 1);
      }
      let src = C.cLines.join('\n');
      src = src.replace(new RegExp(`(window\\.MC_WR_TABLES\\.${C.key}\\s*=\\s*)\\{[^\\n]*?\\};`), `$1${JSON.stringify(C.wr)};`);
      src = src.replace(new RegExp(`(window\\.MC_REAL_GAMES\\.${C.key}\\s*=\\s*)\\{[^\\n]*?\\};`), `$1${JSON.stringify(C.games)};`);
      fs.writeFileSync(C.cPath, src);
    }
    if (C.fDirty && C.fSrc) {
      let out = C.fSrc;
      for (const asg of [...C.fAssigns].sort((x, y) => y.start - x.start)) out = out.slice(0, asg.start) + JSON.stringify(asg.obj) + out.slice(asg.end);
      fs.writeFileSync(C.fPath, out);
    }
  }
}

console.log(`=== mirror-fix ${LANE ? '(' + LANE + ')' : '(all lanes)'}${WRITE ? '' : ' — DRY RUN, nothing written'} ===`);
console.log(`pairs corrected     : ${pairsFixed}`);
console.log(`contradictions fixed: ${fixed}\n`);
Object.entries(byKind).sort((x, y) => y[1] - x[1]).forEach(([k, n]) => console.log(String(n).padStart(7) + '  ' + k));
if (!WRITE) console.log('\nre-run with --write to apply.');

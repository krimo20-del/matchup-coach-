// _gen_seo_pages.js — generate static, crawlable SEO pages for every bespoke matchup.
// One page per DIRECTED matchup per lane: /matchup/<lane>/<you>-vs-<enemy>/index.html
// plus lane hubs, champ hubs, /matchup/ index, and a full sitemap.xml.
// Content is pulled straight from the bespoke champ-data/content files, so every
// page carries genuinely unique researched text (not doorway boilerplate).
const fs = require('fs');
const path = require('path');

const ORIGIN = 'https://matchupcoach.gg';
const slug = n => n.toLowerCase().replace(/[^a-z]/g, '');
const urlslug = n => n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// content-file slug -> roster display name (handles 'renata' -> "Renata Glasc")
function dispOf(D, bFile) {
  if (D.dispBy[bFile]) return D.dispBy[bFile];
  const k = Object.keys(D.dispBy).find(k => k.startsWith(bFile) || bFile.startsWith(k));
  return k ? D.dispBy[k] : bFile;
}

global.window = {};
new Function('window', fs.readFileSync('champ-data/rosters.js', 'utf8'))(global.window);
const ROSTERS = global.window.ROSTERS;

const LANES = [
  { key: 'top', roster: 'top', dir: 'champ-data/content', suffix: '', label: 'Top Lane', short: 'Top', prose: 'top lane' },
  { key: 'mid', roster: 'mid', dir: 'champ-data/content/mid', suffix: '_mid', label: 'Mid Lane', short: 'Mid', prose: 'mid lane' },
  { key: 'bot', roster: 'bot', dir: 'champ-data/content/bot', suffix: '_bot', label: 'Bot Lane (ADC)', short: 'Bot', prose: 'bot lane' },
  { key: 'support', roster: 'support', dir: 'champ-data/content/sup', suffix: '_sup', label: 'Support', short: 'Support', prose: 'support' },
];
// Stable first-publication date for Article schema — the guide pages first
// shipped in the 2026-07-27 sitemap. dateModified tracks the data refresh.
const PUBLISHED = '2026-07-27';
// The patch this matchup data is published as current for. Bump only when the
// content has actually been reviewed against the new patch.
const LIVE_PATCH = '26.15';
// When the underlying champ-data last actually changed, and when the lolalytics
// win rates were sampled. These are CONTENT facts, not build facts — never wire
// them to TODAY. A dateModified/lastmod that moves on every rebuild is a false
// freshness signal to search engines and a false "Updated <date>" to readers.
// 2026-09-23: bumped again, and again because the CONTENT changed, not the build.
// This round rewrote the early-game and jungle first-clear paragraphs, added the
// runes/build cards that 2,171 pages were missing, rebuilt the hub pages, and
// changed what every guide says about price and access (the free tier, the trial
// and the iconic rotation). That is a material change on all 12,092 pages, so the
// date moves once, here, and the whole sitemap moves with it.
// 2026-09-07: bumped because the content GENUINELY changed, not because of a rebuild.
// Since 2026-08-24 the mid (2,070), bot (870), support (1,260) and jungle (2,499)
// matchups were all audited and shipped — 6,699 matchups of real content change — plus
// lane-wide corrections: 25,420 invented-vocabulary phrases removed from jungle, 2,047
// broken compound words, 547 misgendered fields, and 82 ability claims that contradicted
// Riot's kit data. Leaving this at 2026-08-24 told Google that 12,096 pages were
// unchanged, so none of that work was a reason to recrawl. The rule above still holds:
// bump this when the DATA changes, never on a rebuild.
const DATA_MODIFIED = '2026-09-23';
const WR_SAMPLED = 'July 2026';
// One string, printed under every guide's subtitle and used nowhere else, so the
// "when was this last touched" question has the same answer on all 12,092 pages.
// Jungle carries no win-rate sample (see the jungle note below), so it says so
// rather than borrowing the lane sample date.
const trustLine = jungle => jungle
  ? `Updated ${DATA_MODIFIED} · no win-rate sample for jungle pairs · reviewed on patch ${LIVE_PATCH}`
  : `Updated ${DATA_MODIFIED} · win rates sampled ${WR_SAMPLED} · reviewed on patch ${LIVE_PATCH}`;
// Printed once in the verdict box of every jungle guide. The lane guides lead
// with a pooled Emerald+ win rate; the jungle data has no such sample, and a
// reader who has just come from a lane guide needs telling why the number is
// missing rather than being left to assume it was forgotten.
const JG_NO_WR = 'Jungle guides are a stage-by-stage race read: there is no Emerald+ win-rate sample for jungler-vs-jungler pairs, unlike the lane guides.';
const STAGES = ['Level 1', 'Level 2', 'Level 3', 'Levels 4-5', 'Level 6', 'First item', 'Two+ items'];

// ---------- load all lane data ----------
const DATA = {}; // lane -> { names, dispBy, fileBy(slug->fileSlug), champ -> {wr, games, entries{opp:entry}} }
for (const L of LANES) {
  const names = []; ROSTERS[L.roster].forEach(g => g.c.forEach(n => names.push(n)));
  const dispBy = {}; names.forEach(n => dispBy[slug(n)] = n);
  // file slugs on disk (renata quirk: roster "Renata Glasc" -> file renata.js)
  const files = fs.readdirSync(L.dir).filter(f => f.endsWith('.js')).map(f => f.replace('.js', ''));
  const fileBy = {};
  for (const n of names) {
    const s = slug(n);
    fileBy[s] = files.includes(s) ? s : files.find(f => s.startsWith(f) || f.startsWith(s));
  }
  const champs = {};
  for (const n of names) {
    const s = slug(n), f = fileBy[s];
    if (!f) continue;
    const w = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
    new Function('window', fs.readFileSync(L.dir + '/' + f + '.js', 'utf8'))(w);
    const key = f + L.suffix;
    const entries = {};
    for (const c of w.MC_CONTENT_EXTRA) if (c.a === key) entries[c.b] = c;
    champs[s] = { key, fileSlug: f, entries, wr: w.MC_WR_TABLES[key] || {}, games: w.MC_REAL_GAMES[key] || {} };
  }
  DATA[L.key] = { names, dispBy, fileBy, champs };
}

// ---------- lane label fix layer ----------
// The app loads champ-data/_label-text-fixes.js LAST: its FIX map (owner key ->
// opponent file slug -> 7 sides) re-labels who owns each stage window so the
// colour matches what the why-text says. The static build never loaded it, so
// a page could show "First item | Fiora" beside a why that calls the window a
// coin-flip. The file is one `var FIX = {...};` literal plus a browser retry
// loop, so lift the literal out and parse it instead of executing the loop.
const LABEL_FIX = (() => {
  const src = fs.readFileSync('champ-data/_label-text-fixes.js', 'utf8');
  const m = src.match(/var FIX = (\{[\s\S]*?\});\r?\n/);
  if (!m) throw new Error('champ-data/_label-text-fixes.js: FIX literal not found');
  return JSON.parse(m[1]);
})();
// A side value is a display name or "Skill". A few are shortened ("Renata" for
// Renata Glasc — the content files do the same, which silently zeroed her window
// counts) and one Trundle/Teemo cell names a third champion. Map every value back
// to the page's own two names; anything that fits neither returns null.
function sideName(v, aName, bName) {
  if (!v) return null;
  if (v === 'Skill' || v === aName || v === bName) return v;
  const sv = slug(v);
  if (sv.length < 4) return null; // too short to trust a prefix match
  const fits = n => { const sn = slug(n); return sn.startsWith(sv) || sv.startsWith(sn); };
  return fits(bName) ? bName : fits(aName) ? aName : null;
}
// Override e.win in place BEFORE any page is built, so the forward page, its
// mirror check (which reads the reverse entry's win) and the hubs all see the
// same corrected arrays.
for (const L of LANES) {
  const D = DATA[L.key];
  const st = { overridden: 0, changed: 0, unmapped: 0, examples: [] };
  for (const a of Object.keys(D.champs)) {
    const C = D.champs[a], aName = D.dispBy[a];
    for (const bFile of Object.keys(C.entries)) {
      const e = C.entries[bFile], bName = dispOf(D, bFile);
      const base = Array.isArray(e.win) && e.win.length === 7 ? e.win : null;
      const fx = LABEL_FIX[C.key] && LABEL_FIX[C.key][bFile];
      const src = Array.isArray(fx) && fx.length === 7 ? fx : base;
      if (!src) continue;
      const out = src.map((v, i) => {
        const s = sideName(v, aName, bName);
        if (s) return s;
        st.unmapped++;
        if (st.examples.length < 5) st.examples.push(`${C.key}/${bFile}[${i}]="${v}"`);
        return (base && sideName(base[i], aName, bName)) || 'Skill';
      });
      if (src === fx) { st.overridden++; if (!base || out.join('|') !== base.join('|')) st.changed++; }
      e.win = out;
    }
  }
  console.log(`${L.key}: label-fix overrides ${st.overridden} (${st.changed} arrays changed) · unmapped cells ${st.unmapped}${st.examples.length ? ' — ' + st.examples.join(', ') : ''}`);
}

// ---------- why-text cap ----------
// A window whose why-text calls the stage even, a coin flip or a skill check
// cannot also be labelled as one champion's window: the reader sees "First item
// | Fiora" beside a sentence that says the trade stays even. The label fix layer
// above re-labels from the FIX map; this is the text's own veto — where the
// sentence itself calls the window even, the cell drops to Skill. It runs BEFORE
// any page is built, so the table, the verdict's window counts and the mirror
// check all move together and the page cannot end up citing a count its own
// table no longer shows.
// Deliberately narrow. It wants the sentence to CALL the window even ("Level 6
// is even", "stays a coinflip", "it is a skill check"), not to use "even" as an
// adverb — "Even at 2+ items your Axe burst out-duels her" is Draven's window,
// not a coin flip — and it stands down when the same sentence still hands the
// window to somebody ("...but you edge it", "favours Tryndamere", "even-to-yours").
const EVEN_WHY = /\b(?:is|are|stays?|remains?|reads?|plays?(?: out)?|ends? up)\s+(?:a\s+)?(?:genuine |genuinely |basically |broadly |roughly |mostly |largely |pretty |still )?(?:even|coin[- ]?flip|skill matchup|skill check)\b|\bskill check\b|^even(?:,| trade| matchup| skill| and)/i;
const EVEN_LEANS = /leans? (?:your|his|her|toward|towards)|in (?:your|his|her) favou?r|favou?rs? (?:you|him|her|[A-Z])|even-to-|is even (?:online|up|relevant|available|out|live)|nominally yours|but (?:you|he|she) edges?/i;
{
  const per = [];
  let cells = 0, pagesCapped = 0;
  for (const L of LANES) {
    const D = DATA[L.key];
    let c = 0, p = 0;
    for (const a of Object.keys(D.champs)) {
      const C = D.champs[a], aName = D.dispBy[a];
      for (const bFile of Object.keys(C.entries)) {
        const e = C.entries[bFile], bName = dispOf(D, bFile);
        if (!Array.isArray(e.win) || e.win.length !== 7 || !Array.isArray(e.whys)) continue;
        let hit = 0;
        for (let i = 0; i < 7; i++) {
          const why = String(e.whys[i] || '').trim();
          if (e.win[i] !== aName && e.win[i] !== bName) continue;
          if (!EVEN_WHY.test(why) || EVEN_LEANS.test(why)) continue;
          e.win[i] = 'Skill'; hit++;
        }
        if (hit) { c += hit; p++; }
      }
    }
    per.push(`${L.key} ${c}`); cells += c; pagesCapped += p;
  }
  console.log(`why-text cap: ${cells} cells dropped to Even / skill on ${pagesCapped} pages (${per.join(' · ')}) — the label named a champion, the why-text called the window even`);
}

// ---------- placeholder entries ----------
// A handful of entries were written before the opponent had any data and say so
// in the favour table ("no reliable data to call this phase"). Those get no page
// and no sitemap URL — a guide that admits it has nothing is a doorway page.
// Deleting them here also drops them from the hubs, the related-guides links and
// the cross-lane map, which all read C.entries.
const PLACEHOLDER = /no reliable data|No data exists yet/i;
const skippedPlaceholders = [];
for (const L of LANES) {
  const D = DATA[L.key];
  for (const a of Object.keys(D.champs)) {
    const C = D.champs[a];
    for (const bFile of Object.keys(C.entries)) {
      const e = C.entries[bFile];
      const txt = (e.whys || []).concat(e.win || []).join(' ');
      if (!PLACEHOLDER.test(txt)) continue;
      delete C.entries[bFile];
      const rel = `${L.key}/${urlslug(D.dispBy[a])}-vs-${urlslug(dispOf(D, bFile))}`;
      // An earlier build may have written this page; a file the sitemap no
      // longer lists is still a live URL, so remove it.
      fs.rmSync(path.join('matchup', rel), { recursive: true, force: true });
      skippedPlaceholders.push(`/matchup/${rel}/`);
    }
  }
}
console.log(`placeholder entries skipped (no page, no sitemap URL): ${skippedPlaceholders.length}${skippedPlaceholders.length ? ' — ' + skippedPlaceholders.join(', ') : ''}`);

// pair -> lanes map for cross-lane "also played in" links
const pairLanes = {};
for (const L of LANES) {
  const D = DATA[L.key];
  for (const a of Object.keys(D.champs)) for (const b of Object.keys(D.champs[a].entries)) {
    const dispB = D.dispBy[b] || D.dispBy[Object.keys(D.dispBy).find(k => k.startsWith(b))] || b;
    (pairLanes[a + '|' + b] = pairLanes[a + '|' + b] || []).push(L.key);
  }
}

// ---------- app data: CHAMP_DATA / CHAMP_LOADOUTS ----------
// The app's per-matchup one-liner (tldr), the cooldown to track, the do/don't
// lists and the build + rune page live in champ-data/<champ>.js and
// <champ>-loadouts.js, not in the content files above, and the app loads ten
// _*-fixes.js overlays after them that patch tldr/diff/tone in place — each one
// a setTimeout/setInterval retry loop, like the jungle layers. So run the app's
// own <script> list, in the app's own order, inside one sandbox whose timers
// queue instead of firing, then drain the queue: every base file is loaded by
// then, so the first drain is the whole job and the extra passes only prove
// the overlays idempotent. content/ and jg/ files are loaded elsewhere in this
// build and are skipped here. Top-lane keys are the bare slug ('aatrox'), the
// other lanes carry the suffix ('ahri_mid') — the same C.key the label fix
// layer uses.
const APP = (() => {
  const src = fs.readFileSync('MatchupCoach.dc.html', 'utf8');
  const list = [...src.matchAll(/<script src="\.\/(champ-data\/[^"]+)"/g)].map(m => m[1])
    .filter(f => !f.startsWith('champ-data/content/') && !f.startsWith('champ-data/jg/'));
  if (list.length < 100) throw new Error(`app data sandbox: only ${list.length} champ-data scripts found in MatchupCoach.dc.html`);
  const w = { addEventListener() {} };
  const queue = []; let id = 0;
  const later = (fn, ms, repeat) => { queue.push({ id: ++id, fn, repeat: !!repeat }); return id; };
  const cancel = n => { const t = queue.find(t => t.id === n); if (t) t.dead = true; };
  // The overlays also register on DOMContentLoaded; readyState 'complete' skips
  // the extra load listener in _slug-aliases.js.
  const doc = { readyState: 'complete', addEventListener(ev, fn) { later(fn); } };
  for (const f of list) {
    // Deliberately no swallow-everything try/catch — same reason as the jungle files.
    new Function('window', 'document', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
      fs.readFileSync(f, 'utf8'))(w, doc, (fn, ms) => later(fn, ms, false), (fn, ms) => later(fn, ms, true), cancel, cancel);
  }
  for (let pass = 0; pass < 3; pass++) for (const t of queue.slice()) { if (t.dead) continue; t.fn(); if (!t.repeat) t.dead = true; }
  const n = k => Object.keys(w[k] || {}).length;
  console.log(`app data sandbox: ${list.length} scripts · CHAMP_DATA ${n('CHAMP_DATA')} champions · CHAMP_LOADOUTS ${n('CHAMP_LOADOUTS')} (+ aatrox ${n('AATROX_JUGG_LOADOUTS')}, camille ${n('CAMILLE_LOADOUTS')} opponents)`);
  if (n('CHAMP_DATA') < 100 || n('CHAMP_LOADOUTS') < 100) throw new Error('app data sandbox: CHAMP_DATA / CHAMP_LOADOUTS did not load');
  return w;
})();
// The app looks opponents up by slug(displayName) with digits kept; the data
// keys mostly equal the content-file slug, and _slug-aliases.js mirrors the
// rest ("renata" / "renataglasc"), so try the file slug first, then the app's.
const slugNum = n => String(n || '').toLowerCase().replace(/[^a-z0-9]/g, '');
function appEntry(bag, bFile, bName) {
  const e = bag && (bag[bFile] || bag[slugNum(bName)]);
  return e && typeof e === 'object' ? e : null;
}

// ---------- iconic matchups (the free daily showcase) ----------
// champ-data/iconic-matchups.js is loaded in the sandbox above with the rest of
// the app data, so window.MC_ICONIC is already here. Ten pairs per role; one pair
// per role per UTC day is free for everyone with no account, both directions, so
// the pool is exactly 100 pages. Those pages say so, and the hubs link them.
// The names are the app's display names, which is also what urlslug() turns into
// the page path — but nothing enforces that, and a single typo in the pool would
// silently produce a badge on no page and a hub link to a 404. So every URL built
// here is checked against the set of pages the build actually wrote (the gate at
// the bottom), and the build fails if one is missing.
const ICONIC = (() => {
  const src = APP.MC_ICONIC;
  if (!src || typeof src !== 'object') throw new Error('champ-data/iconic-matchups.js: window.MC_ICONIC did not load');
  const byLane = {}, urls = new Map(), byChamp = {};
  let pairs = 0;
  for (const lane of Object.keys(src)) {
    const list = Array.isArray(src[lane]) ? src[lane] : [];
    if (!list.length) throw new Error(`iconic pool: lane "${lane}" is empty`);
    byLane[lane] = []; byChamp[lane] = {};
    for (const p of list) {
      if (!Array.isArray(p) || p.length !== 2 || !p[0] || !p[1] || p[0] === p[1]) throw new Error(`iconic pool: ${lane} has a malformed pair ${JSON.stringify(p)}`);
      const [a, b] = p;
      const uA = `/matchup/${lane}/${urlslug(a)}-vs-${urlslug(b)}/`, uB = `/matchup/${lane}/${urlslug(b)}-vs-${urlslug(a)}/`;
      const row = { lane, a, b, uA, uB };
      byLane[lane].push(row); pairs++;
      urls.set(uA, row); urls.set(uB, row);
      for (const n of [a, b]) (byChamp[lane][n] = byChamp[lane][n] || []).push(row);
    }
  }
  console.log(`iconic pool: ${pairs} pairs across ${Object.keys(byLane).length} roles · ${urls.size} pages free on their rotation day`);
  return { byLane, urls, byChamp, pairs };
})();
// The sentence every one of those 100 pages carries, under the badge. It states
// the two facts a reader needs: how big the pool is, and what "free" means here.
function iconicHtml(lane, url, laneWord) {
  if (!ICONIC.urls.has(url)) return '';
  iconicStats.badged++;
  const n = ICONIC.byLane[lane].length;
  return `<p class="iconic">Iconic matchup</p>
<p class="iconic-why">One of the ${n} flagship ${laneWord} matchups. On its day in the rotation this guide is free to everyone in full, with no account and no payment — one matchup per role comes up free every day, both directions.</p>`;
}
// The "Iconic matchups" block for a hub. `rows` are ICONIC pair rows; both
// directions are linked because both are free on the same day.
function iconicBlock(rows, heading) {
  if (!rows || !rows.length) return '';
  const li = r => `<li><a href="${r.uA}">${esc(r.a)} vs ${esc(r.b)}</a> · <a href="${r.uB}">${esc(r.b)} vs ${esc(r.a)}</a></li>`;
  return `<h2>Iconic matchups</h2>
<p class="sub">${heading}</p>
<ul>${rows.map(li).join('')}</ul>`;
}

// ---------- ability kits (Data Dragon 16.15.1) + the app's ENEMY_KITS ----------
// CHAMP_DATA's key.name is hand-written ("Apprehend (Pull)", "Yordle Snap
// Traps", once just "Ultimate"); the app swaps in ENEMY_KITS[enemy][slot].n at
// render time (champ-data/enemy-kits*.js, loaded in the sandbox above), so the
// static page prints that same name and the reader sees one spelling in both
// places. The kit file is the Data Dragon authority: it supplies the cooldown,
// and wherever ENEMY_KITS still carries a pre-rework name (Jax's R is
// Grandmaster-at-Arms, not Grandmaster's Might) the kit name wins and the clash is counted.
// champ-data/_kits/ also holds 60 jade*.json files — pre-rework "Jade_" kits
// (Kayle with Intervention, Sion with Cryptic Gaze) that sort before the real
// file for every champion after "jade", so a first-file-wins index served 42
// champions stale cooldowns and abilities that no longer exist. Skip them, and
// make the gate prove none leaked in.
const KITS = (() => {
  const by = {};
  for (const f of fs.readdirSync('champ-data/_kits').filter(f => f.endsWith('.json') && !f.startsWith('_') && !f.startsWith('jade'))) {
    const k = JSON.parse(fs.readFileSync('champ-data/_kits/' + f, 'utf8'));
    if (!k || !Array.isArray(k.abilities) || /^Jade_/i.test(String(k.id))) continue;
    if (k.slug) by[k.slug] = by[k.slug] || k;
    if (k.name) by[slugNum(k.name)] = by[slugNum(k.name)] || k; // Wukong lives in monkeyking.json
  }
  if (!by.darius || !by.wukong || Object.values(by).some(k => /^Jade_/i.test(String(k.id)))) throw new Error('champ-data/_kits: kit index incomplete or a Jade_ kit leaked in');
  return by;
})();
// Straight apostrophes throughout: the kit files write "Hounds' Pursuit", the
// enemy kits "Hounds\u2019 Pursuit", and the page already says "Naafiri's W".
const abName = s => String(s || '').replace(/\u2019/g, "'").replace(/\s+/g, ' ').trim();
const kitStats = { fromEK: 0, fromKit: 0, clash: 0, clashSlots: {} };
// Returns { names, cooldown, src } or null. src says where the printed name came
// from: 'ek' = ENEMY_KITS (it equals the kit name or only appends a cue, as in
// "Flash Frost (Stun)"), 'kit' = no ENEMY_KITS entry for the slot, 'clash' =
// ENEMY_KITS disagrees with Data Dragon, so the kit name is printed instead.
function kitAbility(name, slot, fileSlug) {
  const k = KITS[slugNum(name)] || KITS[slug(name)];
  const kitAb = k ? k.abilities.find(a => a.slot === slot && Array.isArray(a.names) && a.names.length) || null : null;
  const EK = APP.ENEMY_KITS || {};
  const ek = EK[fileSlug || ''] || EK[slugNum(name)] || null;
  const ekName = ek && ek[slot] && ek[slot].n ? abName(ek[slot].n) : '';
  if (!kitAb && !ekName) return null;
  const kitNames = kitAb ? kitAb.names.map(abName) : [];
  const agree = !kitAb || ekName.toLowerCase().startsWith(kitNames[0].toLowerCase());
  if (ekName && agree) return { names: [ekName], cooldown: kitAb ? kitAb.cooldown : null, src: 'ek' };
  if (ekName) { const key = `${slugNum(name)}.${slot}`; kitStats.clashSlots[key] = kitStats.clashSlots[key] || `${key} ENEMY_KITS "${ekName}" vs kit "${kitNames.join(' / ')}"`; }
  return { names: kitNames, cooldown: kitAb.cooldown, src: ekName ? 'clash' : 'kit' };
}
// Kit fact gate: the build cannot pass with stale or swapped kit data. A Jade_
// file gives Kayle "Intervention" and Sion "Cryptic Gaze"; naafiri.json once had
// W and R swapped. Both the printed name and the raw kit entry must be right.
for (const [c, s, want] of [['Kayle', 'R', 'Divine Judgment'], ['Sion', 'Q', 'Decimating Smash'], ['Pantheon', 'W', 'Shield Vault'], ['Naafiri', 'W', "Hounds' Pursuit"], ['Naafiri', 'R', 'The Call of the Pack']]) {
  const ab = kitAbility(c, s), raw = KITS[slugNum(c)].abilities.find(a => a.slot === s);
  if (!ab || ab.names[0] !== want || !raw || abName(raw.names[0]) !== want) throw new Error(`kit fact gate FAILED: ${c} ${s} prints "${ab ? ab.names[0] : '(missing)'}", kit file says "${raw ? raw.names[0] : '(missing)'}", expected "${want}"`);
}
// "26/23.5/21/18.5/16" -> "26–16s". Charge abilities list a sub-second recast
// (Caitlyn's trap: 0.5), which is not a cooldown anyone tracks, so omit those.
function cdText(cd) {
  if (!cd || !/^\d+(\.\d+)?(\/\d+(\.\d+)?)*$/.test(cd)) return '';
  const v = cd.split('/').map(Number), hi = Math.max(...v), lo = Math.min(...v);
  if (hi < 5) return '';
  return hi === lo ? `${hi}s` : `${hi}–${lo}s`;
}

// ---------- at-a-glance box + build card ----------
// CHAMP_DATA and the loadouts are written he/him for the opponent whoever they
// are ("His answer is spent" on a Lulu page). The app regenders only its own
// templated lines; here the data lines are corrected for female opponents
// using the app's own list (champ-gender.js, loaded in the sandbox above).
const SHE = [[/\bhimself\b/g, 'herself'], [/\bHimself\b/g, 'Herself'], [/\bhis\b/g, 'her'], [/\bHis\b/g, 'Her'],
  [/\bhim\b/g, 'her'], [/\bHim\b/g, 'Her'], [/\bhe\b/g, 'she'], [/\bHe\b/g, 'She']];
const isFemale = name => !!(APP.MC_IS_FEMALE && APP.MC_IS_FEMALE(name));
const glanceStats = { boxes: 0, noData: 0, track: 0, noKit: 0, regendered: 0, dropped: 0, builds: 0, noLoadout: 0 };
const tidy = s => String(s || '').replace(/\s+/g, ' ').trim();
function regender(s, she) {
  s = tidy(s);
  if (!she) return s;
  const out = SHE.reduce((t, [re, to]) => t.replace(re, to), s);
  if (out !== s) glanceStats.regendered++;
  return out;
}
// One CHAMP_DATA line is an abandoned draft ("...wait, wrong artist —"). Drop
// any line that reads like one rather than print it.
const DRAFT = /wait, wrong|wrong artist|edit this|\bTODO\b|placeholder|lorem ipsum|\[[A-Za-z ]+\]/i;
// The Track line's facts, shared by the at-a-glance box and the FAQ answers so
// both print the same ability, slot and cooldown. No counters here — the box
// counts what it prints. Null when the page has no Track line.
function trackOf(C, bFile, bName) {
  const d = appEntry(APP.CHAMP_DATA[C.key], bFile, bName);
  const ab = d && d.key && d.key.slot ? kitAbility(bName, d.key.slot, bFile) : null;
  if (!ab) return null;
  const cd = cdText(ab.cooldown), nm = ab.names.join(' / ');
  // "Sear (Stun, 8–6s cooldown)", not "Sear (Stun) (8–6s cooldown)": an
  // ENEMY_KITS cue already opens a parenthetical, so the cooldown joins it.
  const named = !cd ? nm : /\)$/.test(nm) ? nm.replace(/\)$/, `, ${cd} cooldown)`) : `${nm} (${cd} cooldown)`;
  return { ab, slot: d.key.slot, cd, nm, bare: nm.replace(/\s*\([^)]*\)$/, ''), named };
}
function glanceHtml(C, bFile, aName, bName) {
  const d = appEntry(APP.CHAMP_DATA[C.key], bFile, bName);
  if (!d) { glanceStats.noData++; return ''; }
  const she = isFemale(bName);
  const lines = xs => (Array.isArray(xs) ? xs : []).map(x => regender(x, she))
    .filter(x => { if (!x) return false; if (DRAFT.test(x)) { glanceStats.dropped++; return false; } return true; });
  const tldr = regender(d.tldr, she), dos = lines(d.dos), donts = lines(d.donts);
  if (!tldr && !dos.length && !donts.length) { glanceStats.noData++; return ''; }
  let track = '';
  const tk = trackOf(C, bFile, bName);
  const ab = tk && tk.ab;
  if (ab) {
    track = `<p><b>Track:</b> ${esc(bName)}'s ${esc(d.key.slot)} — ${esc(tk.named)}.${d.key.note ? ' ' + esc(regender(d.key.note, she)) : ''}</p>`;
    glanceStats.track++;
    kitStats[ab.src === 'ek' ? 'fromEK' : 'fromKit']++;
    if (ab.src === 'clash') kitStats.clash++;
  } else if (d.key && d.key.slot) glanceStats.noKit++;
  glanceStats.boxes++;
  const list = (h, xs) => xs.length ? `<div><h3>${h}</h3><ul>${xs.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : '';
  return `<h2>At a glance</h2>
<div class="card glance">${tldr ? `<p class="tldr">${esc(tldr)}</p>` : ''}${track}<div class="cols">${list('Do', dos)}${list("Don't", donts)}</div></div>`;
}
// Loadouts: Aatrox and Camille keep their own registries (the app special-cases
// both); everyone else is CHAMP_LOADOUTS[dataKey]. Jungle passes its own entry.
function loadoutOf(C, bFile, bName) {
  const bag = C.key === 'aatrox' ? APP.AATROX_JUGG_LOADOUTS : C.key === 'camille' ? APP.CAMILLE_LOADOUTS : APP.CHAMP_LOADOUTS[C.key];
  const l = appEntry(bag, bFile, bName);
  if (!l || !l.start || !l.firstItem) { glanceStats.noLoadout++; return null; }
  return l;
}
// Keystone -> primary tree, for the few curated Aatrox pages that carry no primaryTree.
const TREE_OF = { Conqueror: 'Precision', 'Press the Attack': 'Precision', 'Lethal Tempo': 'Precision', 'Fleet Footwork': 'Precision',
  Electrocute: 'Domination', 'Dark Harvest': 'Domination', 'Hail of Blades': 'Domination',
  'Summon Aery': 'Sorcery', 'Arcane Comet': 'Sorcery', 'Phase Rush': 'Sorcery',
  'Grasp of the Undying': 'Resolve', Aftershock: 'Resolve', Guardian: 'Resolve',
  'Glacial Augment': 'Inspiration', 'Unsealed Spellbook': 'Inspiration', 'First Strike': 'Inspiration' };
const treeName = s => s ? String(s).charAt(0).toUpperCase() + String(s).slice(1).toLowerCase() : ''; // jungle files write 'PRECISION'
const listEn = xs => xs.length < 2 ? xs.join('') : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1];
// Rune page parts from either shape: the object, or Locke's "A · B · C" string.
function runeParts(r) {
  if (typeof r === 'string') return tidy(r) ? { line: tidy(r) } : null;
  if (!r || !r.keystone) return null;
  const pt = treeName(r.primaryTree || TREE_OF[r.keystone] || ''), st = treeName(r.tree || '');
  const prim = (r.primary || []).map(tidy).filter(Boolean), sec = (r.secondary || []).map(tidy).filter(Boolean), sh = (r.shards || []).map(tidy).filter(Boolean);
  return { keystone: r.keystone, pt, st, prim, sec, sh,
    line: `${r.keystone}${pt ? ` (${pt})` : ''}${prim.length ? `: ${prim.join(', ')}` : ''}${st || sec.length ? ` · ${st}${st && sec.length ? ': ' : ''}${sec.join(', ')}` : ''}${sh.length ? ` · Shards: ${sh.join(', ')}` : ''}` };
}
function buildCard(l, bName, she) {
  const g = s => regender(s, she);
  const runes = runeParts(l.runes);
  const rows = [['Start', g(l.start)], ['First back', g(l.firstBack)], ['First item', g(l.firstItem)], ['Then', g(l.secondItem)], ['Boots', g(l.boots)], ['Runes', runes ? g(runes.line) : '']]
    .filter(([, v]) => v).map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('');
  glanceStats.builds++;
  return `<h2>Runes &amp; build vs ${esc(bName)}</h2>
<div class="card"><dl class="build">${rows}</dl></div>`;
}
// The two loadout FAQ answers: one or two sentences straight from the entry.
// `item` is the build card's first item (short form); when given it closes the
// answer, since the rune page and the first buy are the two halves of one card.
function runeAnswer(l, aName, bName, item) {
  const r = runeParts(l.runes);
  if (!r) return '';
  const tail = item ? ` vs ${bName}, with ${item} as the first item.` : ` vs ${bName}.`;
  if (item) faqClauseStats.runes++;
  if (!r.keystone) return `${aName} runs ${r.line}${tail}`;
  return `${aName} takes ${r.keystone}${r.pt ? ` on the ${r.pt} tree` : ''}${r.prim.length ? ` with ${listEn(r.prim)}` : ''}${r.st ? `, and ${r.st} secondary${r.sec.length ? ` (${listEn(r.sec)})` : ''}` : ''}${tail}`;
}
function buildAnswer(l, aName, bName, she) {
  const g = s => regender(s, she);
  return `Start ${g(l.start)}${l.firstBack ? ` and back for ${g(l.firstBack)}` : ''}. Build ${g(l.firstItem)} first${l.secondItem ? `, then ${g(l.secondItem)}` : ''}${l.boots ? `, with ${g(l.boots)}` : ''}.`;
}
// ---------- page-specific FAQ clauses ----------
// The who-wins / skill / counter / runes answers are sentence templates keyed on
// the favour class, so with the names and numbers masked one of them used to
// cover 6,266 pages. Each now carries one clause lifted from data the same page
// prints: the Track line (ability + cooldown), the favour table's windows, or the
// build card's first item. Nothing here is written for the answer — every noun
// in these clauses is a cell the reader can find above the Q&A block.
// Table stage indices as reading ranges: [0,1,2] -> "levels 1–3", [4,5,6] ->
// "level 6 onward", [5] -> "first item".
const STAGE_LV = [[1, 1], [2, 2], [3, 3], [4, 5], [6, 6]];
function stageRuns(idx) {
  const runs = [];
  for (const i of idx.slice().sort((x, y) => x - y)) {
    const r = runs[runs.length - 1];
    if (r && r[1] === i - 1) r[1] = i; else runs.push([i, i]);
  }
  return listEn(runs.map(([i, j]) => {
    if (i === 6) return 'two+ items';
    if (i === 5) return j === 6 ? 'first item onward' : 'first item';
    const lo = STAGE_LV[i][0];
    if (j === 6) return `level ${lo} onward`;
    if (j === 5) return lo === 6 ? 'level 6 and first item' : `level ${lo} through first item`;
    const hi = STAGE_LV[j][1];
    return lo === hi ? `level ${lo}` : `levels ${lo}–${hi}`;
  }));
}
// Build-card first item without its aside: "Profane Hydra (Spear of Shojin for
// the safer sustain line)" -> "Profane Hydra".
const itemShort = s => tidy(String(s || '').replace(/\s*\(.*$/, '').replace(/\s+[—–-]\s.*$/, ''));
const faqClauseStats = { who: 0, skill: 0, counter: 0, runes: 0, jgWho: 0, jgSkill: 0, jgRunes: 0, bare: 0 };
// Append a clause to an answer that ends in a full stop.
const withClause = (ans, clause) => !ans || !clause ? ans : `${ans.replace(/\s+$/, '')} ${clause}`;

// ---------- page skeleton ----------
// The Google Fonts stylesheet is the page's only external resource and was the
// only thing blocking the first paint. It is now preloaded and applied
// asynchronously (see FONT_LINKS), which means the first paint happens in the
// fallback face — so the fallback has to occupy the same space as the web font,
// or every page reflows the moment the swap lands.
// Two local-only @font-face rules do that. They point at faces every machine
// already has (Segoe UI on Windows, Helvetica/Arial elsewhere) and are scaled so
// their x-height matches the web font's: Manrope's x-height is 53.8% of its em
// against Arial's 51.9%, hence size-adjust 103.7%, with the ascent and descent
// overrides divided by the same factor so the line box does not move either.
// Chakra Petch is the narrower display face at 50.0%, hence 96.4%.
// Nothing here downloads: `local()` sources only, so a missing family simply
// falls through to the next name in the stack.
const FONT_FALLBACK = `@font-face{font-family:'Manrope Local';src:local('Segoe UI'),local('Helvetica Neue'),local('Arial');size-adjust:103.7%;ascent-override:97.0%;descent-override:28.1%;line-gap-override:0%}
@font-face{font-family:'Chakra Local';src:local('Segoe UI Semibold'),local('Segoe UI'),local('Helvetica Neue'),local('Arial');size-adjust:96.4%;ascent-override:103.7%;descent-override:25.9%;line-gap-override:0%}`;
const CSS = FONT_FALLBACK + `
*{box-sizing:border-box}body{margin:0;background:#0d0f16;color:#e7eaf2;font-family:'Manrope','Manrope Local',system-ui,'Segoe UI',sans-serif;line-height:1.6}
a{color:#3ddc97;text-decoration:none}a:hover{text-decoration:underline}
.wrap{max-width:880px;margin:0 auto;padding:28px 18px 60px}
header.site{display:flex;align-items:center;gap:10px;margin-bottom:26px;flex-wrap:wrap}
.logo{font-family:'Chakra Petch','Chakra Local',sans-serif;font-weight:700;font-size:19px;color:#f4efe8}.logo b{color:#e8b84b}
.crumbs{font-size:12.5px;color:#8a90a2;margin-bottom:14px}.crumbs a{color:#8a90a2}
h1{font-family:'Chakra Petch','Chakra Local',sans-serif;font-size:30px;margin:0 0 6px;color:#fff}
h2{font-family:'Chakra Petch','Chakra Local',sans-serif;font-size:20px;margin:34px 0 10px;color:#f0cd72}
.sub{color:#8a90a2;font-size:14.5px;margin-bottom:18px}
.verdict{border-radius:14px;padding:16px 18px;background:#11131c;border:1px solid rgba(255,255,255,0.08);border-left:4px solid #3ddc97;font-size:15.5px;margin:18px 0}
table{width:100%;border-collapse:collapse;font-size:14px;margin:12px 0}
th,td{padding:9px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.07)}
th{font-family:'Chakra Petch','Chakra Local',sans-serif;font-size:11px;letter-spacing:0.6px;color:#8a90a2}
.own-a{color:#3ddc97;font-weight:700}.own-b{color:#ff5d6c;font-weight:700}.own-s{color:#e8b84b;font-weight:700}
ul{padding-left:22px}li{margin:7px 0}
.cta{display:inline-block;margin:20px 0;padding:13px 22px;border-radius:12px;background:linear-gradient(180deg,#f0cd72,#e8b84b);color:#1c1206;font-weight:700;font-family:'Chakra Petch','Chakra Local',sans-serif}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:14px}@media(max-width:640px){.cols{grid-template-columns:1fr}}
.card{border-radius:14px;background:#11131c;border:1px solid rgba(255,255,255,0.08);padding:15px 17px}
.card h3{margin:0 0 8px;font-family:'Chakra Petch','Chakra Local',sans-serif;font-size:14px;color:#dfe2ec}
h3.qa-q{font-family:'Chakra Petch','Chakra Local',sans-serif;font-size:15px;margin:18px 0 6px;color:#dfe2ec}
footer{margin-top:44px;font-size:12.5px;color:#8a90a2;border-top:1px solid rgba(255,255,255,0.07);padding-top:16px}
.linkgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px;font-size:14px}
.gate{margin:26px 0;padding:22px 24px;border-radius:16px;border:1px solid rgba(240,205,114,0.4);background:linear-gradient(180deg,rgba(240,205,114,0.07),#11131c);text-align:center}
.gate-h{font-family:'Chakra Petch','Chakra Local',sans-serif;font-weight:700;font-size:20px;color:#f6f1ea}
.gate-p{color:#c7c2b4;font-size:14px;line-height:1.6;margin:8px auto 4px;max-width:620px}
.gate-note{color:#8a90a2;font-size:12px;line-height:1.6;margin-top:6px}
.glance .tldr{font-size:15.5px;font-weight:600;margin:0 0 8px}.glance p{margin:0 0 8px}.glance .cols{gap:4px 14px}.glance ul{margin:0}.glance li{margin:4px 0;font-size:14px}
.build{display:grid;grid-template-columns:96px 1fr;gap:6px 14px;margin:0;font-size:14.5px}.build dt{font-family:'Chakra Petch','Chakra Local',sans-serif;font-size:11px;letter-spacing:0.6px;text-transform:uppercase;color:#8a90a2;padding-top:3px}.build dd{margin:0}
.tscroll{overflow-x:auto;max-width:100%}.linkgrid a{display:block;padding:8px 10px;border-radius:8px;background:#11131c;border:1px solid rgba(255,255,255,0.06)}
.iconic{display:inline-block;margin:0 0 6px;padding:4px 11px;border-radius:999px;border:1px solid rgba(240,205,114,0.5);background:rgba(240,205,114,0.1);color:#f0cd72;font-family:'Chakra Petch','Chakra Local',sans-serif;font-size:11.5px;letter-spacing:0.7px;text-transform:uppercase}
.iconic-why{color:#c7c2b4;font-size:13.5px;margin:0 0 12px}
.gate-free{color:#c7c2b4;font-size:13.5px;line-height:1.6;margin:6px auto 0;max-width:620px}
.trust{color:#8a90a2;font-size:12.5px;margin:-10px 0 16px}
/* 42px tap targets. The footer and the breadcrumb are the two link runs a phone
   user actually aims at, and both were 20px tall text links sitting a few pixels
   apart. 22px line box + 10px top and bottom is 42px, without moving the text. */
footer a,.crumbs a{display:inline-block;line-height:22px;padding:10px 6px;min-height:42px}
.crumbs a:first-child{padding-left:0}
@media(max-width:640px){.linkgrid{grid-template-columns:1fr 1fr}.build{grid-template-columns:84px 1fr}th,td{padding:8px 6px}}`;
// Non-blocking web fonts. The preload starts the download at the same moment the
// old <link rel=stylesheet> would have, but the stylesheet is applied with
// media="print" so it never holds up the first paint, and the onload flips it to
// all once it has arrived. The <noscript> copy keeps the fonts for a reader with
// scripting off — these pages carry no other script, so that reader is otherwise
// served a page that is complete apart from its typefaces.
const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap';
const FONT_LINKS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="${FONT_HREF}">
<link rel="stylesheet" href="${FONT_HREF}" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="${FONT_HREF}"></noscript>`;

// ---------- the gate's call to action ----------
// The button used to read "Read the full guide — plans from $1.99/month", which
// asked a first-time visitor off a Reddit link to decide about money before they
// had read anything. There are now three ways in that cost nothing, and the
// cheapest of them needs no account at all, so the button leads with that and the
// prices sit underneath where they belong. The link target and rel are unchanged:
// still the app's /open URL, still nofollow, because robots.txt disallows it.
// Prices are the live ones and are written in exactly one place, here.
// 2026-10-19: the site is free, so there is no price line and no checkout reassurance
// to print. The CTA no longer sells anything — it just opens the interactive version.
function ctaHtml(openUrl) {
  return `<a class="cta" rel="nofollow" href="${openUrl}">Open the interactive guide →</a>
  <p class="gate-free">Free — every matchup, every lane, the full build and rune pages and the enemy jungle tracker. No account, no card, nothing locked.</p>
  <p class="gate-note">Win rates sampled ${WR_SAMPLED} · <a href="/methodology">how these guides are built</a></p>`;
}

// ---------- publisher identity ----------
// One Organization node, one @id, on all 12,092 pages. Before this, every page
// declared its own anonymous Organization twice (author and publisher), so
// nothing tied the 12,092 declarations together and Google had no node to attach
// a knowledge panel or a logo to. The @id is a fragment on the origin, which is
// the stable form: it survives the page being re-rendered, re-titled or moved.
// The logo is the real file in the repo at its real pixel size — Google rejects a
// publisher logo whose dimensions are wrong or missing.
const ORG_ID = `${ORIGIN}/#organization`;
const ORG = { '@type': 'Organization', '@id': ORG_ID, name: 'MatchupCoach.gg', url: ORIGIN,
  logo: { '@type': 'ImageObject', '@id': `${ORIGIN}/#logo`, url: `${ORIGIN}/logo-matchupcoach.png`, contentUrl: `${ORIGIN}/logo-matchupcoach.png`, width: 900, height: 240, caption: 'MatchupCoach.gg' } };
// Articles point at the node above rather than repeating it.
const ORG_REF = { '@id': ORG_ID };

// Build gate on the SERP snippet: Google cuts descriptions near 155 chars and
// titles near 60 — the same limits the two ladders below aim for. Every page
// passes through shell(), so measure here and fail the build at the end if a
// description or a title runs long.
const snippetStats = { descMax: 0, descMaxUrl: '', descOver: 0, descMin: 1e9, descMinUrl: '', descShort: 0, titleMax: 0, titleMaxUrl: '', titleOver: 0 };
// Pick the richest description that still fits the snippet. Candidates are
// written longest first; the first one at or under 155 characters wins, so a
// page with a big sample and a decisive stage spends the whole budget and a page
// with neither still gets a sentence rather than a truncation. Replaces the old
// "start long, shorten five times" ladders, which only ever removed text and so
// left 1,480 descriptions sitting under 120 characters.
// `extras` are optional clauses used only to top a short result back up towards
// the floor: the candidate list is a preference order, so its rungs step down in
// chunks and a page whose richest rung just missed 155 can land well under 120.
// Each extra is appended only if it is not already in the sentence and still fits.
function pickDesc(candidates, extras = []) {
  const fit = candidates.filter(d => d && d.length <= 155);
  let d = fit.length ? fit[0] : String(candidates[candidates.length - 1] || '').slice(0, 155);
  for (const x of extras) {
    if (d.length >= DESC_MIN) break;
    if (!x || d.includes(x.trim())) continue;
    if (d.length + x.length <= 155) d += x;
  }
  return d;
}
// Title ladder + description ladder coverage, and the two invariants that keep
// them honest: no two pages may share a title, and every FAQ question in the
// ld+json must be a heading a reader can actually see on the page.
const ladderStats = { howToPlay: 0, patch: 0, patchEx: [], dec: 0, decSup: 0, descs: new Map(), descDupes: 0, descDupeEx: [], titles: new Map(), dupes: 0, dupeEx: [], faqPages: 0, faqQs: 0, faqMissing: 0, faqEx: [], ansMissing: 0, ansEx: [], tpl: new Map() };
// Largest FAQ answer template allowed, in pages (names and numbers masked).
const FAQ_TEMPLATE_MAX = 500;
// `jungle` pages carry no lolalytics sample, so their footer must not claim one.
function shell(title, desc, canonical, jsonld, body, opts = {}) {
  if (desc.length > snippetStats.descMax) { snippetStats.descMax = desc.length; snippetStats.descMaxUrl = canonical; }
  if (desc.length > 155) snippetStats.descOver++;
  if (desc.length < snippetStats.descMin) { snippetStats.descMin = desc.length; snippetStats.descMinUrl = canonical; }
  if (desc.length < DESC_MIN) snippetStats.descShort++;
  if (title.length > snippetStats.titleMax) { snippetStats.titleMax = title.length; snippetStats.titleMaxUrl = canonical; }
  if (title.length > 60) snippetStats.titleOver++;
  if (/How to Play/.test(title)) ladderStats.howToPlay++;
  // Snippet honesty gate: no patch number may appear in a title or a description.
  // The win rates behind these pages were sampled once, in July 2026; a snippet
  // naming a patch either claims a freshness the sample does not have or
  // advertises a stale one next to a competitor's current number. The page's own
  // trust line still states the sample month and the reviewed patch.
  if (/patch\s*\d/i.test(desc) || /patch\s*\d/i.test(title)) {
    ladderStats.patch++;
    if (ladderStats.patchEx.length < 3) ladderStats.patchEx.push(`${canonical} — "${/patch\s*\d/i.test(title) ? title : desc}"`);
  }
  // The decisive-stage clause, and the pages where it is correctly suppressed.
  if (/ turns .+'s way at /.test(desc)) ladderStats.dec++;
  // Mirror pages must not share a snippet: /a-vs-b/ and /b-vs-a/ are two URLs
  // competing for the same query, and two identical descriptions make them one
  // duplicate in Google's eyes.
  const descAt = ladderStats.descs.get(desc);
  if (descAt) { ladderStats.descDupes++; if (ladderStats.descDupeEx.length < 3) ladderStats.descDupeEx.push(`"${desc.slice(0, 60)}…" — ${descAt} and ${canonical}`); }
  else ladderStats.descs.set(desc, canonical);
  const firstAt = ladderStats.titles.get(title);
  if (firstAt) { ladderStats.dupes++; if (ladderStats.dupeEx.length < 3) ladderStats.dupeEx.push(`"${title}" — ${firstAt} and ${canonical}`); }
  else ladderStats.titles.set(title, canonical);
  // Schema-vs-page invariant: a FAQ answer Google may lift has to be visible
  // under the same question, so every question name must equal a heading in the
  // body. The early-game and first-clear questions are H2 sections; the rest are
  // the Q&A block's H3s.
  const faqQs = ((jsonld['@graph'] || []).find(x => x['@type'] === 'FAQPage') || {}).mainEntity || [];
  if (faqQs.length) {
    ladderStats.faqPages++;
    const masked = new Set();
    for (const q of faqQs) {
      ladderStats.faqQs++;
      const ans = String(q.acceptedAnswer && q.acceptedAnswer.text || '');
      // The answer Google may lift must be on the page word for word.
      if (!body.includes(`${esc(ans)}</p>`)) { ladderStats.ansMissing++; if (ladderStats.ansEx.length < 3) ladderStats.ansEx.push(`${canonical} — "${ans.slice(0, 80)}"`); }
      // Answer template: both champion names and every number masked.
      let t = ans;
      for (const n of (opts.names || []).slice().sort((x, y) => y.length - x.length)) t = t.split(n).join('<C>');
      t = t.replace(/\d[\d,.]*/g, '<n>');
      if (!masked.has(t)) { masked.add(t); ladderStats.tpl.set(t, (ladderStats.tpl.get(t) || 0) + 1); }
      if (body.includes(`>${esc(q.name)}</h2>`) || body.includes(`>${esc(q.name)}</h3>`)) continue;
      ladderStats.faqMissing++;
      if (ladderStats.faqEx.length < 3) ladderStats.faqEx.push(`${canonical} — "${q.name}"`);
    }
  }
  const freshness = opts.jungle
    ? `Matchup data reviewed on patch ${LIVE_PATCH} · the jungle race is a stage-by-stage read with no win-rate sample.`
    : `Matchup data reviewed on patch ${LIVE_PATCH} · win rates sampled ${WR_SAMPLED} from lolalytics (Emerald+).`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
${FONT_LINKS}
<meta name="theme-color" content="#0d0f16">
<meta property="og:type" content="article">
<meta property="og:site_name" content="MatchupCoach.gg">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ORIGIN}/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="MatchupCoach.gg — Challenger-level League of Legends matchup coaching">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://matchupcoach.gg/og-image.png">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
<header class="site"><a class="logo" href="/">Matchup<b>Coach</b>.gg</a></header>
${body}
<footer>MatchupCoach.gg — Challenger-level matchup coaching for every champion, every lane. <a href="/matchup/">All matchup guides</a> · <a href="/">Open the interactive coach</a><br>${freshness} <a href="/methodology">How we work these out</a>. MatchupCoach.gg isn't endorsed by Riot Games.<br><a href="/methodology">Methodology</a> · <a href="/terms">Terms</a> · <a href="/privacy">Privacy</a> · <a href="/cookies">Cookies</a> · <a href="/refund">Refunds</a> · <a href="/cancel">How to cancel</a> · <a href="/contact">Contact</a></footer>
</div>
</body>
</html>`;
}

function ownCls(owner, dispA, dispB) { return owner === dispA ? 'own-a' : owner === dispB ? 'own-b' : 'own-s'; }

// ---------- matchup pages ----------
let pages = 0, laneMatchupPages = 0;
// Warn-level only: the early-game paragraph is the one full section a visitor
// reads for free, and a 30-word answer to "how to beat B as A" is thin against a
// SERP of 800-word guides. Counted so the content work has a number to move.
const earlyWords = { total: 0, short: 0, jgTotal: 0, jgShort: 0 };
// Opponent-hub links (one per guide) and iconic badges, counted so the gates at
// the bottom can prove both landed rather than silently reaching nobody.
const oppHubStats = { lane: 0, laneMissing: 0, jg: 0, jgMissing: 0 };
const iconicStats = { badged: 0, hubBlocks: 0 };
// Snippet floor. Google will show ~155 characters; a 90-character description
// hands back two thirds of that space for nothing. 120 is the floor the ladders
// below aim at, and descShort counts what still lands under it.
const DESC_MIN = 120;
const sitemap = [];
const laneStats = {};
const laneStat = k => laneStats[k] || (laneStats[k] = { derived: 0, suppressed: 0, noGames: 0, caveat: 0, sweep: 0 });
// The audit valued these as small, zero-script pages; the new sections must
// not quietly grow one past the budget.
const sizeStats = { max: 0, maxUrl: '' };
// ---------- retired-vocabulary gate ----------
// Runes and items Riot removed. The content files are being purged of them
// separately; this gate is what stops one coming back in a later edit, so it
// reads the BUILT html — the only place every source (content files, loadouts,
// the app's CHAMP_DATA overlays, the jungle reports) ends up together. Each page
// hands outWrite the file it was built from, so the failure names the source to
// open, not just the URL.
// Word-boundary anchored where the name is also ordinary English: "Predator"
// must not fire on Renekton's Ruthless Predator (W) or a jungle "Apex Predator"
// label, and "Stopwatch" is the item, not Zhonya's active.
const RETIRED = [
  ['Eyeball Collection', /Eyeball Collection/i], ['Legend: Tenacity', /Legend:\s*Tenacity/i],
  ['Predator', /(?<!Ruthless |Unseen |Apex |Cursed )\bPredator\b/], ['Zombie Ward', /Zombie Ward/i],
  ['Ravenous Hunter', /Ravenous Hunter/i], ['Goredrinker', /Goredrinker/i],
  ['Divine Sunderer', /Divine Sunderer/i], ['Galeforce', /Galeforce/i], ['Everfrost', /Everfrost/i],
  ['Duskblade', /Duskblade/i], ['Demonic Embrace', /Demonic Embrace/i],
  ['Frostfire Gauntlet', /Frostfire Gauntlet/i], ['Navori Quickblades', /Navori Quickblades/i],
  ['Stopwatch', /\bStopwatch\b/i], ["Liandry's Anguish", /Liandry'?s Anguish/i], ['mythic', /\bmythics?\b/i],
];
// Pages still carrying a retired name when this gate was written (2026-09-08),
// per term — the tail of the content purge, all of them in champ-data text this
// build only reads. The gate fails the moment a count goes UP, or a term with no
// allowance appears at all, which is what stops one being typed back in. Each
// number is a debt: when the line above prints a term as unused, delete its
// entry here so the term goes back to zero-tolerance.
// Every retired rune/item has been purged from the data, so the gate is zero-tolerance:
// any reappearance fails the build and names the source file it came from.
const RETIRED_ALLOWANCE = {};
const retiredStats = { pages: {}, src: {} };
const linkGraph = { inbound: {}, written: new Set() };
// Counted on every page this build writes, for the gates at the bottom.
const built = { trust: 0, method: 0, iconic: 0, jgNoWr: 0, asyncFont: 0, blockingFont: 0 };
const hubStats = { hubs: 0, title: 0, h1: 0, body: 0, missing: [] };
function outWrite(rel, html, src) {
  const full = path.join('matchup', rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
  if (html.length > sizeStats.max) { sizeStats.max = html.length; sizeStats.maxUrl = rel; }
  const url = '/matchup/' + rel.replace(/index\.html$/, '');
  linkGraph.written.add(url);
  // Counted on the built HTML rather than at the call site, so a template change
  // that dropped one of these would show up as a number, not as silence.
  if (html.includes('<p class="trust">')) built.trust++;
  if (html.includes('href="/methodology"')) built.method++;
  if (html.includes('<p class="iconic">')) built.iconic++;
  if (html.includes(JG_NO_WR)) built.jgNoWr++;
  if (html.includes('rel="preload" as="style"') && html.includes(`media="print" onload="this.media='all'"`)) built.asyncFont++;
  // The <noscript> copy is deliberately a plain stylesheet link — it is not
  // parsed at all unless scripting is off — so it is stripped before the test.
  const headOnly = html.slice(0, html.indexOf('</head>')).replace(/<noscript>[\s\S]*?<\/noscript>/g, '');
  if (/<link(?![^>]*\bmedia=)[^>]*rel="stylesheet"/.test(headOnly)) built.blockingFont++;
  for (const m of html.matchAll(/href="(\/matchup\/[^"]*\/)"/g)) if (m[1] !== url) linkGraph.inbound[m[1]] = (linkGraph.inbound[m[1]] || 0) + 1;
  for (const [name, re] of RETIRED) {
    if (!re.test(html)) continue;
    retiredStats.pages[name] = (retiredStats.pages[name] || 0) + 1;
    if (!retiredStats.src[name]) retiredStats.src[name] = `${url} (${src || 'generator template'})`;
  }
  // Hub pages (no "-vs-" in the path) are the "<champion> counters" query family:
  // the word has to be in the title, the H1 and the body, not just implied.
  if (!rel.includes('-vs-')) {
    hubStats.hubs++;
    const t = (html.match(/<title>([\s\S]*?)<\/title>/) || ['', ''])[1];
    const h1 = (html.match(/<h1>([\s\S]*?)<\/h1>/) || ['', ''])[1];
    const bodyTxt = html.slice(html.indexOf('</h1>')); // after the H1, so the body has to say it on its own
    const has = s => /counter/i.test(s);
    if (has(t)) hubStats.title++;
    if (has(h1)) hubStats.h1++;
    if (has(bodyTxt)) hubStats.body++;
    if (!(has(t) && has(h1) && has(bodyTxt)) && hubStats.missing.length < 5) hubStats.missing.push(url);
  }
  pages++;
}

// ---------- pooled win rates ----------
// Both directions of a matchup are separate data pulls (A's sample and B's
// sample of the same lane). Publishing each side's raw number made mirrored
// pages contradict (both >50%). Pooling the two samples gives ONE shared
// number — A's page and B's page are complementary by construction and cite
// the same combined game count. Computed once per pair here because the
// matchup page, its hardest/easiest lists and the champion hub all print it.
const POOL = {}; // lane -> owner slug -> opponent file slug -> { wr, games }
for (const L of LANES) {
  const D = DATA[L.key]; POOL[L.key] = {};
  for (const a of Object.keys(D.champs)) {
    const C = D.champs[a]; POOL[L.key][a] = {};
    for (const bFile of Object.keys(C.entries)) {
      const wrRaw = C.wr[bFile]; const wrA = typeof wrRaw === 'number' ? wrRaw : (wrRaw && wrRaw.wr);
      const gA = Number(C.games[bFile]) || 0;
      const C2 = D.champs[slug(dispOf(D, bFile))];
      const wrRevRaw = C2 && C2.wr[C.fileSlug]; const wrRev = typeof wrRevRaw === 'number' ? wrRevRaw : (wrRevRaw && wrRevRaw.wr);
      const gB = (C2 && Number(C2.games[C.fileSlug])) || 0;
      let wr = null, games = 0;
      if (typeof wrA === 'number' && typeof wrRev === 'number') {
        const wA = gA > 0 && gB > 0 ? gA : 1, wB = gA > 0 && gB > 0 ? gB : 1;
        wr = Math.round(((wrA * wA + (100 - wrRev) * wB) / (wA + wB)) * 100) / 100;
        // Top-lane data stores the reverse direction as the exact complement of
        // the SAME sample (identical game count, win rates summing to 100), so
        // there is nothing to pool — summing the two counts doubled every
        // top-lane sample size on the page. Only add when the two sides are
        // genuinely separate pulls.
        const derived = gA > 0 && gA === gB && Math.abs(wrA + wrRev - 100) < 0.02;
        games = derived ? gA : gA + gB;
        if (derived) laneStat(L.key).derived++;
      } else if (typeof wrA === 'number') { wr = wrA; games = gA; }
      else if (typeof wrRev === 'number') { wr = Math.round((100 - wrRev) * 100) / 100; games = gB; }
      // A win rate with no game count behind it is a placeholder (Locke's lane
      // entries sit at a flat 50%), not a measurement. Treat it as unknown here,
      // so the page, its who-wins / counter / skill answers, the hardest-easiest
      // lists and the hub all fall back to the window-based wording instead of
      // printing a number nobody sampled — and no page ever prints an empty
      // "( Emerald+ games, ...)" clause.
      if (typeof wr === 'number' && !games) { wr = null; laneStat(L.key).noGames++; }
      POOL[L.key][a][bFile] = { wr, games };
    }
  }
}
// ONE classification drives the verdict, the skill-matchup and counter answers
// and the hub's favour column, so no page can contradict itself or its hub.
// "counter" needs a 5-point edge (55% / 45%). A 52% lane is an edge, not a
// counter — calling it one is exactly the over-claim a main will call out.
function favourCls(wr) {
  if (typeof wr !== 'number') return 'unknown';
  const edge = wr - 50;
  return edge >= 5 ? 'counterA' : edge >= 0.75 ? 'edgeA' : edge <= -5 ? 'counterB' : edge <= -0.75 ? 'edgeB' : 'even';
}
function favourLabel(cls, aName, bName) {
  return cls === 'counterA' ? { cls: 'own-a', text: `${aName} favoured` } : cls === 'edgeA' ? { cls: 'own-a', text: `Leans ${aName}` }
    : cls === 'even' ? { cls: 'own-s', text: 'Even' } : cls === 'edgeB' ? { cls: 'own-b', text: `Leans ${bName}` }
    : cls === 'counterB' ? { cls: 'own-b', text: `${bName} favoured` } : { cls: '', text: '—' };
}
// Verdict self-check. Reads the FINISHED sentence rather than the variables that
// built it, so a later rewording is checked too: if it says "<X> is favoured" and
// also cites the stage windows, the windows clause must name X and must be a
// majority of the seven. Anything else is the page arguing with itself in one
// breath, and the gate at the bottom of the build fails on it.
const verdictStats = { checked: 0, contra: 0, examples: [] };
function checkVerdict(v, aName, bName, canonical) {
  verdictStats.checked++;
  const fav = v.match(/^(.+?) is (?:slightly )?favoured/);
  const w = v.match(/(?:claims|pressures) (\d) of the 7 stage windows/);
  if (!fav || !w) return;
  const head = v.slice(0, w.index);
  const owner = head.lastIndexOf(aName) > head.lastIndexOf(bName) ? aName : bName;
  if (owner === fav[1] && Number(w[1]) >= 4) return;
  verdictStats.contra++;
  if (verdictStats.examples.length < 5) verdictStats.examples.push(`${canonical} — ${v}`);
}
// Table-vs-verdict caveat wording: what the pooled sample says the lane is, in
// the two or three words the verdict itself would use.
function verdictWord(cls, aName, bName) {
  return cls === 'counterA' ? `${aName}-favoured` : cls === 'edgeA' ? `leaning ${aName}`
    : cls === 'edgeB' ? `leaning ${bName}` : cls === 'counterB' ? `${bName}-favoured` : 'even';
}
// Opponents with a page and a known pooled win rate, hardest first.
function rankedOpps(L, D, a, C) {
  return Object.keys(C.entries).map(bF => Object.assign({ bF, name: dispOf(D, bF) }, POOL[L.key][a][bF]))
    .filter(r => typeof r.wr === 'number').sort((x, y) => (x.wr - y.wr) || x.name.localeCompare(y.name));
}
// Three of each, linking to the sibling pages. Needs six ranked opponents so
// the two lists never share a name; the matchup being read stays in its list
// as bold text rather than a link to itself.
function extremesHtml(L, D, a, C, aName, bFile) {
  const r = rankedOpps(L, D, a, C);
  if (r.length < 6) return '';
  const uA = urlslug(aName);
  const li = x => `<li>${x.bF === bFile ? `<b>${esc(aName)} vs ${esc(x.name)}</b> (this guide)` : `<a href="/matchup/${L.key}/${uA}-vs-${urlslug(x.name)}/">${esc(aName)} vs ${esc(x.name)}</a>`} — ${x.wr}% win rate</li>`;
  glanceStats.extremes = (glanceStats.extremes || 0) + 1;
  return `<h2>Hardest and easiest matchups for ${esc(aName)} in ${L.prose}</h2>
<p class="sub">Pooled Emerald+ win rates from ${esc(aName)}'s side, sampled ${WR_SAMPLED}.</p>
<div class="cols"><div class="card"><h3>Hardest</h3><ul>${r.slice(0, 3).map(li).join('')}</ul></div><div class="card"><h3>Easiest</h3><ul>${r.slice(-3).reverse().map(li).join('')}</ul></div></div>`;
}

for (const L of LANES) {
  const D = DATA[L.key];
  for (const aName of D.names) {
    const a = slug(aName);
    const C = D.champs[a];
    if (!C) continue;
    for (const bFile of Object.keys(C.entries)) {
      const e = C.entries[bFile];
      const bName = dispOf(D, bFile);
      const b = slug(bName);
      const uA = urlslug(aName), uB = urlslug(bName);
      const rel = `${L.key}/${uA}-vs-${uB}/index.html`;
      const canonical = `${ORIGIN}/matchup/${L.key}/${uA}-vs-${uB}/`;

      const { wr, games } = POOL[L.key][a][bFile];
      const C2 = D.champs[b];
      const gamesTxt = games ? Number(games).toLocaleString('en-US') : '';
      const winRaw = Array.isArray(e.win) && e.win.length === 7 ? e.win : null;
      // Mirror check: B's own report of this matchup carries its own 7-window
      // call. Mid/bot/support content was written per side, so A's page could
      // say "A claims 4 of the 7 windows" while B's page said B did. The table
      // below still shows A's plan (it is A's coaching), but the verdict, the
      // skill-matchup answer and the FAQ only cite window counts when the two
      // sides agree on who leads — otherwise they stay silent on windows and
      // lean on the pooled win rate, which is shared by construction.
      const eRev = C2 && C2.entries && C2.entries[C.fileSlug];
      const winRev = eRev && Array.isArray(eRev.win) && eRev.win.length === 7 ? eRev.win : null;
      const lead = w => Math.sign(w.filter(x => x === aName).length - w.filter(x => x === bName).length);
      const mirrorsAgree = !winRaw || !winRev || lead(winRaw) === lead(winRev);
      if (winRaw && !mirrorsAgree) laneStat(L.key).suppressed++;
      const win = mirrorsAgree ? winRaw : null;
      const nA = win ? win.filter(x => x === aName).length : 0;
      const nB = win ? win.filter(x => x === bName).length : 0;
      const evens = win ? 7 - nA - nB : 0;
      // Pages with no pooled number (cls null below) read the 7 windows instead.
      // One shape drives the verdict, the who-wins answer and the skill-matchup
      // answer so the three cannot disagree about the same page: 'tempo' = one
      // side holds two or more windows than the other, 'coinflip' = four or
      // more windows are even and one side edges the rest by one, 'none' =
      // every window is a skill check, 'skill' = anything else, '' = no
      // usable window data (no array, or the mirrors disagree).
      const winLead = nA > nB ? aName : nB > nA ? bName : '';
      const winShape = !win ? '' : nA === 0 && nB === 0 ? 'none' : Math.abs(nA - nB) >= 2 ? 'tempo' : evens >= 4 && winLead ? 'coinflip' : 'skill';
      const windowsClaim = (below = '') => `${nA > nB ? `${aName}'s plan${below} claims ${nA}` : `${bName} pressures ${nB}`} of the 7 stage windows`;
      const coinflipNote = `${evens} of the 7 windows are a coin flip and ${winLead} edges the rest ${Math.max(nA, nB)}–${Math.min(nA, nB)}`;

      // ---- ONE classification (favourCls above) drives verdict, skill-matchup
      // answer and counter answer, so no page can contradict itself.
      const wrKnown = typeof wr === 'number';
      const cls = favourCls(wr);
      // Sample provenance. The full clause (source and date) is printed once, in
      // the subtitle; the verdict and the who-wins answer cite the game count
      // only, so one screen doesn't stack the same parenthetical three times.
      // wrKnown implies a game count (see POOL), so neither form is ever empty.
      const sample = `${gamesTxt} Emerald+ games, lolalytics, sampled ${WR_SAMPLED}`;
      const over = `over ${gamesTxt} games`;

      // Verdict box — leads with the pooled number; the 7 windows are texture
      // from A's game plan, never a competing claim about who's favoured.
      let verdict;
      const noWindows = win && nA === 0 && nB === 0; // all 7 cells "Skill"
      const planNote = !win ? ''
        : noWindows ? 'every window is a skill check'
        : (nA >= nB
          ? `${aName}'s game plan below claims ${nA} of the 7 stage windows`
          : `${bName} pressures ${nB} of the 7 stage windows in the plan below`);
      // The windows clause may only ride along inside a "<champion> is favoured"
      // sentence when it points the SAME way: it has to name the favoured
      // champion, and that champion has to hold a majority of the seven windows.
      // "Aatrox is slightly favoured — 53.07% win rate over 4,927 games, and
      // Aatrox's game plan below claims 2 of the 7 stage windows" contradicted
      // itself inside one breath on 156 pages. A minority claim is texture for
      // the table, not evidence for the verdict, so the clause is dropped and the
      // sentence rests on the pooled number. The two verdicts below that hold the
      // tension on purpose ("the numbers favour A even though B pressures 5")
      // still print it — they say the two disagree, which is the honest form.
      const planSide = !win || noWindows ? '' : nA >= nB ? aName : bName;
      const planFits = side => !!planNote && (noWindows || (planSide === side && Math.max(nA, nB) >= 4));
      if (cls === 'counterA' || cls === 'edgeA') {
        verdict = `${aName} is ${cls === 'edgeA' ? 'slightly ' : ''}favoured — ${wr}% win rate ${over}${planFits(aName) ? `, and ${planNote}` : ''}.`;
        if (win && nA < nB) verdict = `The numbers ${cls === 'edgeA' ? 'lean slightly' : 'favour'} ${aName} (${wr}% win rate), even though ${bName} pressures ${nB} of the 7 stage windows — convert your windows below and the stats swing your way.`;
      } else if (cls === 'counterB' || cls === 'edgeB') {
        verdict = `${bName} is ${cls === 'edgeB' ? 'slightly ' : ''}favoured — ${aName} wins ${cls === 'counterB' ? 'only ' : ''}${wr}% of ${gamesTxt} games${planFits(bName) ? `, and ${planNote}` : ''}.${noWindows ? '' : ' Play it patient and win your windows.'}`;
        if (win && nA > nB) verdict = cls === 'counterB'
          ? `An uphill lane you can win — the numbers lean ${bName} (${aName} wins ${wr}%), but ${aName}'s plan below claims ${nA} of the 7 windows: convert them and the stats catch up to you.`
          : `A close lane that leans ${bName} on paper (${aName} wins ${wr}%), but ${aName}'s plan below claims ${nA} of the 7 windows: convert them and the stats catch up to you.`;
      } else if (cls === 'even') {
        verdict = (win && Math.abs(nA - nB) >= 2)
          ? `Statistically even (${wr}% win rate) — but the tempo isn't: ${planNote}. Whoever converts their windows wins.`
          : `A genuine skill matchup — ${wr}% win rate ${over}, decided window to window rather than at champion select.`;
      } else {
        // No pooled number: the windows carry the verdict, on the same shape
        // the who-wins and skill-matchup answers below read.
        verdict = winShape === 'none' ? 'A genuine skill matchup — every window is a skill check.'
          : winShape === 'tempo' ? `${winLead} has the tempo edge — ${windowsClaim()}.`
          : winShape === 'coinflip' ? `Mostly even — ${coinflipNote}; execution decides it.`
          : winShape === 'skill' ? 'A genuine skill matchup — the favour swings window to window.'
          : `No Emerald+ win-rate sample for ${aName} vs ${bName} on this patch — play it as a skill matchup and win the windows in the plan below.`;
      }

      checkVerdict(verdict, aName, bName, canonical);

      // ---- table-vs-verdict caveat.
      // The favour table is A's own plan and is printed whole, including the
      // stretches where B's page reads the same lane the other way round. Under a
      // verdict that says B wins, a table of seven green cells is the screenshot
      // a champion main posts in the thread. The generator cannot rewrite seven
      // researched why-texts — that is a data fix — but it can stop the page
      // presenting one side's plan as the pooled result: whenever the two mirrors
      // disagree, or the table leans against the sample, one line under the H2
      // names the sample and what it actually says.
      const tableA = winRaw ? winRaw.filter(x => x === aName).length : 0;
      const tableB = winRaw ? winRaw.filter(x => x === bName).length : 0;
      const tableLead = Math.sign(tableA - tableB);
      const clsDir = cls === 'counterA' || cls === 'edgeA' ? 1 : cls === 'counterB' || cls === 'edgeB' ? -1 : 0;
      const needCaveat = !!winRaw && wrKnown && (!mirrorsAgree || (clsDir !== 0 && tableLead !== 0 && clsDir !== tableLead));
      const caveat = needCaveat
        ? `<p class="sub">This is ${esc(aName)}'s own plan; across ${esc(gamesTxt)} pooled games the lane is ${esc(verdictWord(cls, aName, bName))}.</p>`
        : '';
      if (needCaveat) laneStat(L.key).caveat++;
      // Build gate: a seven-nil table under a verdict favouring the other
      // champion never ships bare. It carries the caveat, and the verdict may not
      // be the "<X> is favoured … claims N windows" form (checkVerdict above
      // already forbids that shape) — the only verdicts allowed over one of these
      // are the ones that name the disagreement out loud.
      const sweepAgainst = !!winRaw && (tableA === 7 || tableB === 7) && clsDir !== 0 && clsDir !== tableLead;
      if (sweepAgainst) {
        laneStat(L.key).sweep++;
        if (!caveat) throw new Error(`table gate FAILED: ${canonical} shows a ${tableA}-${tableB} table under "${verdict}" with no pooled-sample caveat`);
      }

      // TITLE LADDER — target 60 chars, not 70.
      // Google truncates SERP titles near 55-60 characters. At the old 70-char threshold
      // the ladder almost never fired: measured across the built site, 8,074 of 12,095
      // titles (67%) ran past 60 and were being cut mid-phrase — and the cut lands on the
      // brand and on "Who Wins?", which is the half that earns the click. The "<champ> vs
      // <champ>" phrase must always survive, because that IS the search query.
      // The brand is the first thing to drop: Google frequently appends the site name
      // itself, so paying 18 characters for it and losing the hook is a bad trade.
      // The brand went from rung 1 to rung 3 for the same reason it was the first
      // thing to drop: the old rung 1 was 65 characters at its very shortest, so
      // it fired on 0 of 11,851 pages and "How to Play" — a named target query —
      // appeared in no title at all. Without the brand the same phrase fits 97.8%
      // of pages, and Google appends the site name itself.
      let title = `${aName} vs ${bName} ${L.short} Matchup: Who Wins & How to Play`;
      if (title.length > 60) title = `${aName} vs ${bName} ${L.short}: Who Wins & How to Play`;
      if (title.length > 60) title = `${aName} vs ${bName} ${L.short} Matchup: Who Wins? | MatchupCoach.gg`;
      if (title.length > 60) title = `${aName} vs ${bName} ${L.short}: Who Wins? | MatchupCoach.gg`;
      if (title.length > 60) title = `${aName} vs ${bName} ${L.short} Matchup: Who Wins?`;
      if (title.length > 60) title = `${aName} vs ${bName} ${L.short}: Who Wins?`;
      // DESCRIPTION — 155 chars max, 120 aimed at as a floor.
      // The old ladder only ever removed text, so pages with a short name pair
      // and no win rate settled at 90-odd characters and gave a third of the
      // snippet back. Every candidate below is built from data this page already
      // prints — the pooled sample, and the stage where its own favour table
      // turns — and pickDesc takes the longest one that still fits.
      // The opening clause names the champions in reading order, so a mirror
      // pair reads "Playing Aatrox into Darius" on one page and "Playing Darius
      // into Aatrox" on the other instead of two snippets that scan the same.
      // The patch stays in the "how to beat" clause: a snippet showing an old
      // patch against a competitor's current one loses the click before the page
      // is ever fetched.
      const dLead = `Playing ${aName} into ${bName} in ${L.prose}?`;
      // Three lengths of the same fact, so a long name pair gives up precision
      // one word at a time instead of dropping the sample size altogether. The
      // sample size is the number no competitor's snippet carries, so it is the
      // last thing to go.
      const wrC = wrKnown ? ` ${aName} wins ${wr}% of ${gamesTxt} Emerald+ games.` : '';
      const wrC15 = wrKnown ? ` ${aName} wins ${wr}% of ${gamesTxt} games.` : '';
      const wrC2 = wrKnown ? ` ${aName} wins ${wr}%.` : '';
      // The decisive stage, read off the table this page prints: the first window
      // the table hands to whichever side it favours overall.
      // Two things the first version of this clause got wrong, on 4,262 pages
      // between them:
      //  * A table whose favoured side already owns row 1 never "turns" — it
      //    starts there. Saying it turns at level 1 is false on the page's own
      //    table, so the clause is suppressed whenever the favoured side owns
      //    the first window (decIdx === 0) and the budget goes to another clause.
      //  * Unattributed, "the favour table turns at level 3" reads as turning
      //    towards the champion the sentence opened with. On every page whose
      //    table leans to the opponent that pointed the reader at the wrong
      //    side, so the side is now named outright. The table and the pooled
      //    sample still disagree on some pages — this names what the TABLE says,
      //    which is what the sentence claims to be reading.
      const decIdx = !winRaw ? -1 : tableA > tableB ? winRaw.indexOf(aName) : tableB > tableA ? winRaw.indexOf(bName) : -1;
      const decName = tableA > tableB ? aName : bName;
      if (decIdx === 0) ladderStats.decSup++;
      const dec = decIdx >= 1 ? ` The favour table turns ${decName}'s way at ${STAGES[decIdx].toLowerCase()}.`
        : winRaw && tableA === 0 && tableB === 0 ? ' Every window in the favour table is even.' : '';
      // No patch number in the snippet. The win rates were sampled in July 2026
      // and have not been re-sampled since, so a snippet naming the live patch
      // would be claiming a freshness the data does not have — and naming the
      // stale one advertises it. The honest provenance stays on the page, where
      // the trust line prints the sample month and the patch the content was
      // reviewed against.
      const beat = ` How to beat ${bName} as ${aName}.`;
      const tail = ' Stage-by-stage favour, runes, build and the lane plan.';
      const tail2 = ' Stage-by-stage favour and the lane plan.';
      // Preference order, richest first; the first candidate that fits wins.
      // Dropping the patch number gave every rung 15 characters back, so the
      // rungs that existed only as patchless fallbacks are gone — they were
      // duplicates of the rungs above them.
      const desc = pickDesc([
        dLead + wrC + dec + beat + tail, dLead + wrC + dec + beat + tail2, dLead + wrC + dec + beat,
        dLead + wrC15 + dec + beat, dLead + wrC + beat + tail, dLead + wrC + beat + tail2,
        dLead + wrC + beat, dLead + wrC15 + beat + tail2, dLead + wrC2 + dec + beat,
        dLead + wrC15 + beat, dLead + dec + beat + tail, dLead + wrC2 + beat,
        dLead + dec + beat + tail2, dLead + dec + beat, dLead + beat + tail,
        dLead + beat + tail2, dLead + beat,
      ], [dec, tail, tail2, ' Runes, build and the full lane plan.', ' Runes, build and the lane plan.', wrC2]);

      // Who-wins / skill-matchup / counter answers all derive from `cls`, so
      // they can never disagree with each other or with the verdict box.
      const whoShort = cls === 'counterA' ? `${aName} — a ${wr}% win rate vs ${bName} in ${L.prose} ${over} is a real advantage.`
        : cls === 'edgeA' ? `${aName}, slightly — a ${wr}% win rate edge ${over}; execution can flip it.`
        : cls === 'even' ? `Nobody on paper — a ${wr}% win rate ${over} makes this a coin flip decided by play, not champion select.`
        : cls === 'edgeB' ? `${bName}, slightly — ${aName} wins ${wr}% of ${gamesTxt} games; winnable with the right plan.`
        : cls === 'counterB' ? `${bName} — ${aName} wins only ${wr}% of ${gamesTxt} games, so ${aName} plays this as the disadvantaged side.`
        // No pooled number: say so, then answer from the windows when the two
        // sides' plans agree on a leader (the verdict cites the same count).
        : `No sample yet — ${aName} vs ${bName} has no Emerald+ win-rate data for this patch; ${winShape === 'tempo'
          ? `${windowsClaim(' below')}, so ${winLead} sets the tempo`
          : winShape === 'coinflip' ? `${coinflipNote}, so treat it as a skill matchup and play the plan below`
          : 'treat it as a skill matchup and play the plan below'}.`;
      const skillAns = cls === 'even'
        ? `Yes — ${aName} vs ${bName} is a genuine skill matchup: ${wr}% win rate, and the favour swings window to window rather than being set at champion select.`
        : (cls === 'edgeA' || cls === 'edgeB')
        ? `Mostly — ${cls === 'edgeA' ? aName : bName} has a small statistical edge (${cls === 'edgeA' ? wr : (Math.round((100 - wr) * 100) / 100)}% win rate), but execution decides this lane far more than the pick does.`
        : (cls === 'counterA' || cls === 'counterB')
        ? `Not really — ${cls === 'counterA' ? aName : bName} holds a real statistical advantage (${cls === 'counterA' ? wr : (Math.round((100 - wr) * 100) / 100)}% win rate), so ${cls === 'counterA' ? bName : aName} is the one working uphill.`
        : winShape === 'tempo' ? `Not exactly — ${windowsClaim()}, so ${winLead} sets the lane's tempo.`
        : winShape === 'coinflip' ? `Mostly — ${coinflipNote}, so execution decides far more than the pick does.`
        : winShape === 'none' ? `Yes — every one of the 7 stage windows in ${aName} vs ${bName} is a skill check.`
        : winShape === 'skill' ? `Yes — ${aName} vs ${bName} plays as a skill matchup: the favour swings window to window.`
        : '';
      const counterAns = cls === 'counterA' ? `Statistically yes — ${aName} counters ${bName} in ${L.prose}, winning ${wr}% of ${gamesTxt} Emerald+ games.`
        : cls === 'edgeA' ? `Not a hard counter — ${aName} has a slight edge (${wr}% win rate), and play quality decides the rest.`
        : cls === 'even' ? `No hard counter either way — the ${aName} vs ${bName} win rate is ${wr}%, an even lane decided by execution.`
        : cls === 'edgeB' ? `No — if anything ${bName} has the slight edge (${aName} wins ${wr}%), though it stays close.`
        : cls === 'counterB' ? `No — ${bName} counters ${aName} (${aName} wins only ${wr}% of games). Play it as the disadvantaged side and lean on the windows in the plan.`
        : '';

      // Page-specific clauses (see "page-specific FAQ clauses" above). Every
      // fact comes from a block this page prints: the Track line, the favour
      // table (A's own plan, read as printed) and the build card.
      const she = isFemale(bName);
      const lo = loadoutOf(C, bFile, bName);
      const tk = trackOf(C, bFile, bName);
      const item = lo ? itemShort(regender(lo.firstItem, she)) : '';
      const tA = winRaw ? [0, 1, 2, 3, 4, 5, 6].filter(i => winRaw[i] === aName) : [];
      const tB = winRaw ? [0, 1, 2, 3, 4, 5, 6].filter(i => winRaw[i] === bName) : [];
      // Who wins: the first-item row of the table, named with the item the build card buys.
      const whoClause = winRaw && item
        ? `At first item — ${item} on the build card — the table below ${winRaw[5] === aName ? `puts ${aName} ahead` : winRaw[5] === bName ? `puts ${bName} ahead` : 'calls the window even'}.`
        : tk ? `${bName}'s ${tk.slot}, ${tk.bare}, is the ability the at-a-glance box has you track.` : '';
      // Skill matchup: execution means playing the tracked cooldown.
      const skillClause = tk ? `Play around ${bName}'s ${tk.slot}, ${tk.named}.`
        : item ? `${aName}'s build card opens with ${item}.` : '';
      // Counter: where the opponent's windows are in the table, and the ability to track through them.
      const trackTail = tk ? ` ${tk.bare} (${tk.slot})` : '';
      const counterClause = !winRaw ? (tk ? `Track ${bName}'s ${tk.slot}, ${tk.bare}, before you commit.` : '')
        : tB.length ? `${bName} owns ${stageRuns(tB)} in the table below${tk ? ` — track${trackTail} through ${tB.some((x, k) => k && x !== tB[k - 1] + 1) ? 'those windows' : 'that stretch'}` : item ? `, and ${aName}'s build card opens with ${item}` : ''}.`
        : tA.length ? `${bName} owns no window outright in the table below, while ${aName} owns ${stageRuns(tA)}${tk ? ` — still track${trackTail}` : item ? `, starting from ${item} on the build card` : ''}.`
        : `Every window in the table below is even${tk ? `, so the trades come down to ${bName}'s${trackTail}` : item ? `, and ${aName}'s build card opens with ${item}` : ''}.`;
      const whoAns = withClause(whoShort, whoClause), skillA = withClause(skillAns, skillClause), counterA = withClause(counterAns, counterClause);
      if (whoClause) faqClauseStats.who++; else faqClauseStats.bare++;
      if (skillAns && skillClause) faqClauseStats.skill++;
      if (counterAns && counterClause) faqClauseStats.counter++;
      // FAQ JSON-LD from the bespoke data
      const faq = [];
      faq.push({ '@type': 'Question', name: `Who wins ${aName} vs ${bName} in ${L.prose}?`, acceptedAnswer: { '@type': 'Answer', text: whoAns } });
      if (skillA) faq.push({ '@type': 'Question', name: `Is ${aName} vs ${bName} a skill matchup?`, acceptedAnswer: { '@type': 'Answer', text: skillA } });
      if (counterA) faq.push({ '@type': 'Question', name: `Does ${aName} counter ${bName}?`, acceptedAnswer: { '@type': 'Answer', text: counterA } });
      // "How to beat <B> as <A>" is a named target query and was living only in
      // the meta description — the body said "How to win lane as <A> against
      // <B>", which is the same intent in words nobody searches. ONE string feeds
      // the FAQ question and the visible H2, so the schema can never drift from
      // the heading (the invariant the shell gate checks on every page).
      const earlyQ = `How to beat ${bName} as ${aName}: the early game`;
      if (e.early) faq.push({ '@type': 'Question', name: earlyQ, acceptedAnswer: { '@type': 'Answer', text: e.early } });
      // Runes and build come from the loadout entry; the card above the gate is
      // the visible answer, so both questions are only asked when it exists.
      const runesQ = `What runes does ${aName} take vs ${bName}?`, buildQ = `What should ${aName} build vs ${bName}?`;
      const runesA = lo ? runeAnswer(lo, aName, bName, item) : '', buildA = lo ? buildAnswer(lo, aName, bName, she) : '';
      if (runesA) faq.push({ '@type': 'Question', name: runesQ, acceptedAnswer: { '@type': 'Answer', text: runesA } });
      if (buildA) faq.push({ '@type': 'Question', name: buildQ, acceptedAnswer: { '@type': 'Answer', text: buildA } });
      // NOTE: mid/late are members-only on this page, so they are deliberately
      // NOT in the FAQ schema — structured data must match visible content.
      const jsonld = {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'Article', headline: `${aName} vs ${bName} — ${L.label} Matchup Guide`, description: desc, image: ORIGIN + '/og-image.png', datePublished: PUBLISHED, dateModified: DATA_MODIFIED, author: ORG_REF, publisher: ORG_REF, mainEntityOfPage: canonical },
          ORG,
          { '@type': 'FAQPage', mainEntity: faq },
          { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Matchups', item: ORIGIN + '/matchup/' },
            { '@type': 'ListItem', position: 2, name: L.label, item: `${ORIGIN}/matchup/${L.key}/` },
            { '@type': 'ListItem', position: 3, name: `${aName} vs ${bName}`, item: canonical }
          ] }
        ]
      };

      // body
      let tl = '';
      if (winRaw) {
        tl = `<h2>Favour timeline — the windows in ${esc(aName)}'s game plan</h2>
<p class="sub">Read from ${esc(aName)}'s seat: which stage windows this plan plays for against ${esc(bName)}.</p>
${caveat}<table><tr><th>Stage</th><th>Favoured</th><th>Why</th></tr>` +
          winRaw.map((o, i) => `<tr><td>${STAGES[i]}</td><td class="${ownCls(o, aName, bName)}">${esc(o === 'Skill' ? 'Even / skill' : o)}</td><td>${esc((e.whys && e.whys[i]) || '')}</td></tr>`).join('') +
          `</table>`;
      }
      const spikes = (e.spikes || []).map(s => `<li><b>${esc(s.when)}:</b> ${esc(s.text)}</li>`).join('');
      const wantsYou = (e.wants && e.wants.you || []).map(x => `<li>${esc(x)}</li>`).join('');
      const wantsFoe = (e.wants && e.wants.foe || []).map(x => `<li>${esc(x)}</li>`).join('');
      const others = (pairLanes[C.fileSlug + '|' + bFile] || []).filter(k => k !== L.key);
      const crossLane = others.length ? `<p class="sub">Also played in: ` + others.map(k => `<a href="/matchup/${k}/${uA}-vs-${uB}/">${LANES.find(x => x.key === k).label}</a>`).join(' · ') + `</p>` : '';

      // Visible Q&A mirroring the FAQ schema (minus the early-game answer,
      // which is the section above) — targets "who wins / skill matchup /
      // counter" searches and the People-Also-Ask box.
      const qa = [[`Who wins ${aName} vs ${bName} in ${L.prose}?`, whoAns]];
      if (skillA) qa.push([`Is ${aName} vs ${bName} a skill matchup?`, skillA]);
      if (counterA) qa.push([`Does ${aName} counter ${bName}?`, counterA]);
      if (runesA) qa.push([runesQ, runesA]);
      if (buildA) qa.push([buildQ, buildA]);
      const qaHtml = `<h2>Common questions</h2>` + qa.map(([q, ans]) => `<h3 class="qa-q">${esc(q)}</h3><p>${esc(ans)}</p>`).join('');

      // Internal-link cluster: this champion's most-played other matchups in
      // the same lane (by analysed-games volume when known).
      // A fixed top-six-by-volume slice meant every one of this champion's ~70
      // pages linked the SAME six siblings: 8,291 guides ended up with two
      // inbound links while a dozen absorbed seventy, and the long-tail pairs —
      // the ones actually winnable — got the fewest crawl paths. Rotate instead:
      // the three opponents before and the three after B in this champion's
      // sorted opponent list, wrapping at both ends, so every sibling guide is
      // linked from exactly six others and the links walk the whole roster.
      const ring = Object.keys(C.entries).sort((x, y) => dispOf(D, x).localeCompare(dispOf(D, y)));
      const at = ring.indexOf(bFile);
      const near = [];
      for (const step of [-3, -2, -1, 1, 2, 3]) {
        const f = ring[((at + step) % ring.length + ring.length) % ring.length];
        if (f !== bFile && !near.includes(f)) near.push(f);
      }
      const moreOpps = near.map(f => { const n = dispOf(D, f); return `<a href="/matchup/${L.key}/${uA}-vs-${urlslug(n)}/">vs ${esc(n)}</a>`; }).join(' · ');

      // PREVIEW + CONVERT. MatchupCoach is a paid product, so the public page
      // shows what earns the ranking and proves the depth — the verdict, the
      // at-a-glance box (tldr, the cooldown to track, do/don't), the runes and
      // build, the stage-by-stage favour table, the full early-game plan and
      // this champion's hardest/easiest lanes — then hands the rest (mid/late
      // execution, spikes, win conditions) to the membership.
      // Every guide linked its own champion's hub and never the opponent's, so a
      // reader who has just decided the lane is unwinnable had no route to the
      // other side's guides, and each hub could only be reached from the ~70
      // pages of its own champion. The opponent's hub exists whenever the
      // opponent is in this lane's roster, which is what the guard checks.
      const oppHub = D.champs[b]
        ? `<br><a href="/matchup/${L.key}/${uB}/">All ${esc(bName)} ${L.prose} matchups →</a>`
        : '';
      if (oppHub) oppHubStats.lane++; else oppHubStats.laneMissing++;
      const body = `
<nav class="crumbs"><a href="/matchup/">Matchups</a> › <a href="/matchup/${L.key}/">${L.label}</a> › ${esc(aName)} vs ${esc(bName)}</nav>
${iconicHtml(L.key, `/matchup/${L.key}/${uA}-vs-${uB}/`, L.prose)}<h1>${esc(aName)} vs ${esc(bName)} — ${L.label} Matchup Guide</h1>
<p class="sub">How to win lane as ${esc(aName)} against ${esc(bName)}${wrKnown ? ` · ${wr}% win rate (${esc(sample)})` : ''}</p>
<p class="trust">${esc(trustLine(false))} · <a href="/methodology">How we work this out</a></p>
<div class="verdict"><b>Verdict:</b> ${esc(verdict)} <a href="/methodology">How we work this out</a>.</div>
${glanceHtml(C, bFile, aName, bName)}
${lo ? buildCard(lo, bName, she) : ''}
${tl}
<h2>${esc(earlyQ)}</h2><p>${esc(e.early || '')}</p>
${extremesHtml(L, D, a, C, aName, bFile)}
<div class="gate">
  <div class="gate-h">Read the rest of this matchup</div>
  <p class="gate-p">The full ${esc(aName)} vs ${esc(bName)} report continues with the <b>mid-game plan</b>, the <b>late-game and teamfight plan</b>, every <b>power spike</b> to play around, and the <b>win conditions</b> for both sides — plus cooldown tracking and the live enemy-jungle tracker inside the app.</p>
  ${ctaHtml(`/matchup/${L.key}/${uA}-vs-${uB}/open`)}
</div>
${qaHtml}
<h2>Related guides</h2>
<p>${eRev ? `<a href="/matchup/${L.key}/${uB}-vs-${uA}/">Playing the other side? ${esc(bName)} vs ${esc(aName)} guide →</a><br>` : ''}
<a href="/matchup/${L.key}/${uA}/">All ${esc(aName)} ${L.prose} matchups →</a>${oppHub}</p>
${moreOpps ? `<p class="sub">More ${esc(aName)} ${L.prose} matchups: ${moreOpps}</p>` : ''}
${crossLane}`;

      outWrite(rel, shell(title, desc, canonical, jsonld, body, { names: [aName, bName] }), `${L.dir}/${C.fileSlug}.js entry a="${C.key}" b="${bFile}"`);
      sitemap.push(canonical);
      laneMatchupPages++;
      earlyWords.total++;
      if (String(e.early || '').trim().split(/\s+/).filter(Boolean).length < 60) earlyWords.short++;
    }
  }
}

for (const [k, s] of Object.entries(laneStats)) console.log(`${k}: derived-mirror samples kept single ${s.derived} · window-count claims suppressed (mirrors disagree) ${s.suppressed} · win rates with no game count treated as unknown ${s.noGames} · pooled-sample caveat printed under the table ${s.caveat} (of which 7-0 tables against the verdict ${s.sweep})`);

// ---------- JUNGLE guides ----------
// Jungle isn't a lane matchup — it's jungler vs jungler, stored in JG_DB
// (keyed by display name) rather than the per-lane content files. Same
// preview-and-convert shape: verdict + the stage-by-stage race + the first
// clear are public; scuttle/dragon rules, invade boundaries, macro and the
// win condition are members-only.
const JGW = {};
for (const f of fs.readdirSync('champ-data/jg').filter(f => f.endsWith('.js') && !f.startsWith('_'))) {
  // Deliberately NOT wrapped in a swallow-everything try/catch: a data error
  // here silently dropped 2,550 URLs from the sitemap while still exiting 0.
  new Function('window', fs.readFileSync('champ-data/jg/' + f, 'utf8'))(JGW);
}
// The app loads four fix layers AFTER the base files (see the <script> order in
// MatchupCoach.dc.html): _jg-headsup-fixes recomputes stages 0-2 & 4 from the
// shared duel model so mirrors agree; the others relabel windows and patch label
// text. The old `!f.startsWith('_')` filter skipped them here, so the static
// guides were built from the RAW reports — 535 of 1,225 mirror pairs declared
// BOTH junglers favoured while the app showed the corrected race.
// Same order as the app. In the browser the layers retry on a 250ms interval to
// survive non-deterministic script order; here every base file is already
// loaded, so the synchronous first apply() is the whole job and timers are no-ops.
const JG_FIX_LAYERS = ['_jg-headsup-fixes.js', '_jg-loadouts.js', '_jg-window-labels.js', '_jg-label-text-fixes.js'];
const noTimer = () => 0;
for (const f of JG_FIX_LAYERS) {
  if (!fs.existsSync('champ-data/jg/' + f)) throw new Error(`jungle fix layer missing: champ-data/jg/${f}`);
  new Function('window', 'setInterval', 'clearInterval', 'setTimeout', 'document',
    fs.readFileSync('champ-data/jg/' + f, 'utf8'))(JGW, noTimer, noTimer, noTimer, undefined);
}
const JG_DB = JGW.JG_DB || {};
const jgNames = Object.keys(JG_DB);
// Mirrors the app's own advantage classifier so the guide agrees with the app.
// Names match on word boundaries. Every JG_DB label spells the jungler out in
// full — "Nunu & Willump Favored", "Respect Xin Zhao", "Danger — Avoid Rek'Sai",
// "Respect Evelynn's R" — measured across all 652 distinct labels, no jungler is
// ever shortened or aliased, so the display name is the whole vocabulary. A raw
// substring test read every "Viego Favored" cell on a Vi page as Vi's window.
const reEsc = s => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const nameRe = {};
const hasName = (label, n) => (nameRe[n] = nameRe[n] || new RegExp('\\b' + reEsc(n) + '\\b', 'i')).test(label);
function jgTone(adv, youName, foeName) {
  const a = (adv || '').toLowerCase();
  // Check the OPPONENT first: a label like "Bel'Veth Favored" names them, not
  // you, and must read as pressure — otherwise the generic /favou?red/ test
  // below claims their window as yours.
  if (foeName && hasName(a, String(foeName))) return 'b';
  if (hasName(a, String(youName))) return 'a';
  if (/dominant|domination|favou?red|peak|spike|apex|predator|stabilized|playmaker|absolute/.test(a)) return 'a';
  if (/defensive|posture|caution|risk|danger|avoid|surviv|weak|vulnerab|passive|concede|respect/.test(a)) return 'b';
  return 's';
}
// Build gate: with the fix layers applied, no mirror pair may call BOTH junglers
// favoured (or both hard). Measured 535 -> 1 the day the layers were wired in (the
// 1 was Vi vs Viego, a substring match) -> 0 with word-boundary names. Nothing is
// tolerated: one clashing pair is a page that contradicts its own table.
{
  const jgDiff = (rep, you, foe) => {
    const t = rep.stages.map(s => jgTone(s.adv, you, foe));
    const spread = t.filter(x => x === 'a').length - t.filter(x => x === 'b').length;
    return spread >= 3 ? 'FAVOURED' : spread <= -3 ? 'HARD' : 'SKILL';
  };
  let pairs = 0, clash = 0; const examples = [];
  for (const a of jgNames) for (const b of Object.keys(JG_DB[a] || {})) {
    if (a >= b) continue;
    const ra = JG_DB[a][b], rb = JG_DB[b] && JG_DB[b][a];
    if (!ra || !ra.stages || !ra.stages.length || !rb || !rb.stages || !rb.stages.length) continue;
    pairs++;
    const da = jgDiff(ra, a, b), db = jgDiff(rb, b, a);
    if ((da === 'FAVOURED' && db === 'FAVOURED') || (da === 'HARD' && db === 'HARD')) {
      clash++; if (examples.length < 5) examples.push(`${a} vs ${b} (${da}/${db})`);
    }
  }
  console.log(`jungle mirror gate: ${clash} of ${pairs} pairs disagree${examples.length ? ' — ' + examples.join(', ') : ''}`);
  if (clash > 0) throw new Error(`jungle mirror gate FAILED: ${clash} pairs both favoured / both hard — are the _jg-* fix layers loading?`);
}
// Jungle has no win-rate sample, so the hardest/easiest lists rank this
// jungler's opponents by the window spread of the race plans instead.
function jgExtremesHtml(you, spreads, foe) {
  const r = Object.keys(spreads).sort((x, y) => (spreads[x].spread - spreads[y].spread) || (spreads[y].reds - spreads[x].reds) || x.localeCompare(y));
  if (r.length < 6) return '';
  const uA = urlslug(you);
  const say = f => { const s = spreads[f]; return s.spread > 0 ? `${you}'s plan claims ${s.greens} of 7 windows` : s.spread < 0 ? `${f} pressures ${s.reds} of 7 windows` : 'an even race, window to window'; };
  const li = f => `<li>${f === foe ? `<b>${esc(you)} vs ${esc(f)}</b> (this guide)` : `<a href="/matchup/jungle/${uA}-vs-${urlslug(f)}/">${esc(you)} vs ${esc(f)}</a>`} — ${esc(say(f))}</li>`;
  glanceStats.extremes = (glanceStats.extremes || 0) + 1;
  return `<h2>Hardest and easiest matchups for ${esc(you)} in the jungle</h2>
<p class="sub">Ranked by the race windows in ${esc(you)}'s plans — the jungle race carries no win-rate sample.</p>
<div class="cols"><div class="card"><h3>Hardest</h3><ul>${r.slice(0, 3).map(li).join('')}</ul></div><div class="card"><h3>Easiest</h3><ul>${r.slice(-3).reverse().map(li).join('')}</ul></div></div>`;
}
// Stage 5 ("First Item Spike") labels name the item the report's OWN jungler
// completes first, and the build card lifts that label into "First item" the way
// the app does. Not every label is an item, though: Elise's reports say "Elise
// Power Spike", Evelynn-vs-Elise carries Elise's spike, all 49 reports against
// Locke describe HIS "Lich Bane / Shadowflame Spike", and a few read "Tank Item
// Spike", "Even" or "Mirror". So learn each jungler's own labels first (the item
// their own reports name at least three times), then only lift a label that is
// this jungler's window, is not a jungler's name or a placeholder, and is not
// the opponent's own item; anything else falls back to the JG_LOADOUTS item.
const jgOwnItems = {};
for (const you of jgNames) {
  const n = {};
  for (const foe of Object.keys(JG_DB[you] || {})) {
    const s5 = foe !== you && JG_DB[you][foe] && JG_DB[you][foe].stages ? JG_DB[you][foe].stages[5] : null;
    if (s5) n[s5.adv] = (n[s5.adv] || 0) + 1;
  }
  jgOwnItems[you] = new Set(Object.keys(n).filter(k => n[k] >= 3));
}
const jgNameRe = new RegExp('\\b(' + jgNames.map(reEsc).join('|') + ')\\b', 'i');
const NOT_ITEM = /\b(power|even|mirror|whoever|tank item|utility item|ap item)\b/i;
const jgItemStats = { lifted: 0, fallback: 0, examples: [] };
function jgFirstItem(you, foe, s5, tone) {
  const raw = s5 && /item/i.test(String(s5.stage)) ? tidy(String(s5.adv).replace(/\s*Spike$/i, '')) : '';
  if (!raw) return '';
  const label = String(s5.adv);
  const foeOwn = !!jgOwnItems[foe] && jgOwnItems[foe].has(label) && !jgOwnItems[you].has(label);
  if (tone !== 'a' || jgNameRe.test(raw) || NOT_ITEM.test(raw) || foeOwn) {
    jgItemStats.fallback++;
    if (jgItemStats.examples.length < 6) jgItemStats.examples.push(`${you} vs ${foe} "${label}"`);
    return '';
  }
  jgItemStats.lifted++;
  return raw;
}
let jgPages = 0;
const JG_SPREADS = {}; // jungler -> opponent -> { greens, reds, spread }, for the jungle hub and /matchup/
for (const you of jgNames) {
  const opps = Object.keys(JG_DB[you] || {});
  // Window spread per opponent, for the hardest/easiest lists on every page of this jungler.
  const spreads = JG_SPREADS[you] = {};
  for (const foe of opps) {
    const rep = JG_DB[you][foe];
    if (foe === you || !rep || !rep.stages || !rep.stages.length) continue;
    const t = rep.stages.map(s => jgTone(s.adv, you, foe));
    const greens = t.filter(x => x === 'a').length, reds = t.filter(x => x === 'b').length;
    spreads[foe] = { greens, reds, spread: greens - reds };
  }
  // JG_LOADOUTS is one build per jungler (10 of the 50 have one); the app
  // swaps in the matchup's own first item from the "First Item Spike" stage.
  const JL = (JGW.JG_LOADOUTS || {})[you];
  for (const foe of opps) {
    if (foe === you) continue; // mirror: 'Lee Sin is favoured vs Lee Sin' is nonsense
    const rep = JG_DB[you][foe];
    if (!rep || !rep.stages || !rep.stages.length) continue;
    const uA = urlslug(you), uB = urlslug(foe);
    const canonical = `${ORIGIN}/matchup/jungle/${uA}-vs-${uB}/`;
    const tones = rep.stages.map(s => jgTone(s.adv, you, foe));
    const greens = tones.filter(t => t === 'a').length, reds = tones.filter(t => t === 'b').length;
    // Classify on the SPREAD, not raw counts — 4 windows vs 0 is a favoured
    // race even though 4 < 5 (the old threshold called it a skill matchup).
    const spread = greens - reds;
    const diff = spread >= 3 ? 'FAVOURED' : spread <= -3 ? 'HARD' : 'SKILL';
    const dbItem = JL ? jgFirstItem(you, foe, rep.stages[5], tones[5]) : '';
    const jl = JL && JL.start && (dbItem || JL.firstItem) ? Object.assign({}, JL, { firstItem: dbItem || JL.firstItem }) : null;
    // Build gate: a "First item" that names a jungler or a placeholder is the
    // race label leaking through, whichever source it came from.
    if (jl && (jgNameRe.test(jl.firstItem) || NOT_ITEM.test(jl.firstItem))) throw new Error(`jungle build gate FAILED: ${you} vs ${foe} first item "${jl.firstItem}" is not an item`);
    const jShe = isFemale(foe);
    const jRunesQ = `What runes does ${you} take vs ${foe}?`, jBuildQ = `What should ${you} build vs ${foe}?`;
    const jItem = jl ? itemShort(regender(jl.firstItem, jShe)) : '';
    const jRunesA = jl ? runeAnswer(jl, you, foe, jItem) : '', jBuildA = jl ? buildAnswer(jl, you, foe, jShe) : '';
    if (jItem && jRunesA) { faqClauseStats.runes--; faqClauseStats.jgRunes++; }
    // Phrased from this page's race plan — the mirror page has its own plan.
    const verdict = diff === 'FAVOURED'
      ? `${you}'s race plan controls ${greens} of the 7 windows — ${you} holds the tempo advantage in this jungle matchup.`
      : diff === 'HARD'
      ? `${foe} pressures ${reds} of the 7 windows in this race — survive the early game and scale into your windows.`
      : `A window-to-window jungle race — ${greens ? `${greens} window${greens > 1 ? 's' : ''} for ${you}` : `no window clearly ${you}'s`}, ${reds ? `${reds} for ${foe}` : `none clearly ${foe}'s`}, the rest even.`;
    // Same 60-char ladder as the lane pages — see the note there. Jungle names run long
    // ("Nunu & Willump", "Fiddlesticks"), so these drop the brand more often.
    let title = `${you} vs ${foe} Jungle Matchup: Who Wins & How to Play`;
    if (title.length > 60) title = `${you} vs ${foe} Jungle: Who Wins & How to Play`;
    if (title.length > 60) title = `${you} vs ${foe} Jungle Matchup: Who Wins? | MatchupCoach.gg`;
    if (title.length > 60) title = `${you} vs ${foe} Jungle: Who Wins? | MatchupCoach.gg`;
    if (title.length > 60) title = `${you} vs ${foe} Jungle Matchup: Who Wins?`;
    if (title.length > 60) title = `${you} vs ${foe} Jungle: Who Wins?`;
    // Same 155-char budget and the same 120-char floor as the lane pages, and the
    // same reason for leading with the reading order: the mirror page of this one
    // opens "Playing <foe> into <you>". Jungle has no win rate to spend the budget
    // on, so the sample clause is replaced by the window split and the stage where
    // the race turns — both read straight off the table below.
    const jgLead = `Playing ${you} into ${foe} in the jungle?`;
    const jgSplit = ` ${diff === 'FAVOURED' ? `${you}'s race plan controls ${greens} of 7 windows.` : diff === 'HARD' ? `${foe} pressures ${reds} of 7 windows.` : `A window-to-window race, ${greens} to ${reds}.`}`;
    // The stage the race turns on: the first row the table gives to whichever
    // jungler owns more of them. Same two corrections as the lane clause — a
    // race whose leader already owns the first window does not turn, it starts
    // that way, so the clause is suppressed; and "it turns at" named no side, so
    // on every page whose race leans to the opponent the reader read it the
    // wrong way round. The jungler is now named.
    const jgDecIdx = greens > reds ? tones.indexOf('a') : reds > greens ? tones.indexOf('b') : -1;
    if (jgDecIdx === 0) ladderStats.decSup++;
    const jgDec = jgDecIdx >= 1 && rep.stages[jgDecIdx] ? ` The race turns ${greens > reds ? you : foe}'s way at ${String(rep.stages[jgDecIdx].stage).toLowerCase()}.` : '';
    // No patch number in the snippet — see the lane builder.
    const jgBeat = ` How to beat ${foe} as ${you}.`;
    const jgTail = ' First clear, pathing, the level-by-level race and objective control.';
    const jgTail2 = ' First clear, pathing and the race.';
    // Same preference order as the lane pages: richest first, and the same two
    // now-duplicate patchless fallbacks dropped.
    const desc = pickDesc([
      jgLead + jgSplit + jgDec + jgBeat + jgTail, jgLead + jgSplit + jgDec + jgBeat + jgTail2,
      jgLead + jgSplit + jgBeat + jgTail, jgLead + jgSplit + jgDec + jgBeat,
      jgLead + jgSplit + jgBeat + jgTail2, jgLead + jgDec + jgBeat + jgTail,
      jgLead + jgSplit + jgBeat, jgLead + jgBeat + jgTail, jgLead + jgBeat + jgTail2,
      jgLead + jgBeat,
    ], [jgDec, jgTail, jgTail2, jgSplit, ' Runes, build and the race plan.']);
    const rows = rep.stages.map((s, i) => `<tr><td>${esc(s.stage)}</td><td class="own-${tones[i]}">${esc(String(s.adv).replace(/Favored/g, 'Favoured'))}</td><td>${esc(s.why || '')}</td></tr>`).join('');
    const jgSkill = diff === 'SKILL'
      ? `Yes — ${you} vs ${foe} plays as a skill matchup: the jungle race swings window to window, and the better first clear usually sets the tone.`
      : `Not exactly — ${diff === 'FAVOURED' ? `${you}'s race plan controls ${greens} of the 7 windows` : `${foe} pressures ${reds} of the 7 windows`}, so ${diff === 'FAVOURED' ? foe : you} is playing catch-up and has to lean on the map.`;
    // A SKILL verdict still has to answer "who wins" with the actual window
    // split, not just "it depends".
    const jgWho = diff !== 'SKILL' ? verdict
      : (greens === 0 && reds === 0)
      ? `No clear favourite — neither ${you} nor ${foe} holds a window outright; all 7 are even.`
      : `No clear favourite — ${you} holds ${greens === 0 ? 'no window outright' : `${greens} window${greens === 1 ? '' : 's'}`}, ${foe} ${reds}, the rest are even.`;
    // ONE list feeds both the visible Q&A and the FAQ JSON-LD, so the schema
    // question text always equals the heading on the page. The clear-and-path
    // answer is the H2 section above the gate; its heading is the same string.
    // Page-specific clauses, read off this page's race table as printed.
    // Who wins: the first-item row, whose label names the item or the spike.
    // Skill matchup: which named stages each jungler owns in the table.
    const jgLabel = s => String(s.adv).replace(/Favored/g, 'Favoured');
    const s5 = rep.stages[5] || rep.stages[rep.stages.length - 1];
    const t5 = tones[rep.stages.indexOf(s5)];
    const jgWhoClause = s5 ? `The ${s5.stage} row reads "${jgLabel(s5)}"${t5 === 'a' ? `, a window for ${you}` : t5 === 'b' ? `, a window for ${foe}` : ', a window for neither side'}.` : '';
    const jgStages = tone => rep.stages.filter((s, i) => tones[i] === tone).map(s => s.stage);
    const gA = jgStages('a'), gB = jgStages('b');
    const rowsOf = xs => `the ${listEn(xs)} row${xs.length > 1 ? 's' : ''}`;
    const jgSkillClause = gA.length && gB.length ? `In the table, ${you} owns ${rowsOf(gA)} and ${foe} owns ${rowsOf(gB)}.`
      : gA.length ? `In the table, ${you} owns ${rowsOf(gA)} and ${foe} owns no row outright.`
      : gB.length ? `In the table, ${foe} owns ${rowsOf(gB)} and ${you} owns no row outright.`
      : `Every row in the table, ${rep.stages[0].stage} to ${rep.stages[rep.stages.length - 1].stage}, is even.`;
    if (jgWhoClause) faqClauseStats.jgWho++;
    faqClauseStats.jgSkill++;
    const jgQaRows = [[`Who wins ${you} vs ${foe} in the jungle?`, withClause(jgWho, jgWhoClause)], [`Is ${you} vs ${foe} a skill matchup?`, withClause(jgSkill, jgSkillClause)]];
    if (jRunesA) jgQaRows.push([jRunesQ, jRunesA]);
    if (jBuildA) jgQaRows.push([jBuildQ, jBuildA]);
    // Same rename as the lane pages: the phrase people search, on the heading
    // and on the FAQ question, from one string.
    const jgStartQ = `How to beat ${foe} as ${you}: the first clear and pathing`;
    const faq = jgQaRows.map(([q, ans]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: ans } }));
    if (rep.start) faq.push({ '@type': 'Question', name: jgStartQ, acceptedAnswer: { '@type': 'Answer', text: rep.start } });
    const jgQa = `<h2>Common questions</h2>` + jgQaRows.map(([q, ans]) => `<h3 class="qa-q">${esc(q)}</h3><p>${esc(ans)}</p>`).join('');
    // Rotating six, same as the lane pages: an alphabetical top-six slice sent
    // all 49 of this jungler's guides to the same six opponents.
    const jgRing = opps.filter(f => f !== you).sort();
    const jgAt = jgRing.indexOf(foe);
    const jgNear = [];
    for (const step of [-3, -2, -1, 1, 2, 3]) {
      const f = jgRing[((jgAt + step) % jgRing.length + jgRing.length) % jgRing.length];
      if (f !== foe && !jgNear.includes(f)) jgNear.push(f);
    }
    const jgMore = jgNear.map(f => `<a href="/matchup/jungle/${uA}-vs-${urlslug(f)}/">vs ${esc(f)}</a>`).join(' · ');
    // The opponent's own hub, same as the lane guides. Every JG_DB opponent is a
    // jungler with a hub of its own, but the guard is kept so a data change that
    // introduced a one-sided entry would show up in the count rather than as a
    // link to a page that was never written.
    const jgOppHub = JG_DB[foe]
      ? `<br><a href="/matchup/jungle/${uB}/">All ${esc(foe)} jungle matchups →</a>`
      : '';
    if (jgOppHub) oppHubStats.jg++; else oppHubStats.jgMissing++;
    const jsonld = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'Article', headline: `${you} vs ${foe} — Jungle Matchup Guide`, description: desc, image: ORIGIN + '/og-image.png', datePublished: PUBLISHED, dateModified: DATA_MODIFIED, author: ORG_REF, publisher: ORG_REF, mainEntityOfPage: canonical },
          ORG,
      { '@type': 'FAQPage', mainEntity: faq },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Matchups', item: ORIGIN + '/matchup/' },
        { '@type': 'ListItem', position: 2, name: 'Jungle', item: `${ORIGIN}/matchup/jungle/` },
        { '@type': 'ListItem', position: 3, name: `${you} vs ${foe}`, item: canonical } ] }
    ] };
    const body = `
<nav class="crumbs"><a href="/matchup/">Matchups</a> › <a href="/matchup/jungle/">Jungle</a> › ${esc(you)} vs ${esc(foe)}</nav>
${iconicHtml('jungle', `/matchup/jungle/${uA}-vs-${uB}/`, 'jungle')}<h1>${esc(you)} vs ${esc(foe)} — Jungle Matchup Guide</h1>
<p class="sub">How to win the jungle race as ${esc(you)} against ${esc(foe)}</p>
<p class="trust">${esc(trustLine(true))} · <a href="/methodology">How we work this out</a></p>
<div class="verdict"><b>Verdict:</b> ${esc(verdict)}<br>${esc(JG_NO_WR)} <a href="/methodology">How we work this out</a>.</div>
<h2>The jungle race — the windows in ${esc(you)}'s plan</h2>
<p class="sub">Read from ${esc(you)}'s seat: the race windows this plan plays for against ${esc(foe)}.</p>
<table><tr><th>Stage</th><th>Read</th><th>Why</th></tr>${rows}</table>
${jl ? buildCard(jl, foe, jShe) : ''}
${rep.start ? `<h2>${esc(jgStartQ)}</h2><p>${esc(rep.start)}</p>` : ''}
${jgExtremesHtml(you, spreads, foe)}
<div class="gate">
  <div class="gate-h">Read the rest of this matchup</div>
  <p class="gate-p">The full ${esc(you)} vs ${esc(foe)} report continues with <b>scuttle &amp; dragon rules</b>, <b>invade windows and safety boundaries</b>, the <b>top-side objective fight</b>, <b>macro rotations</b> and the <b>win condition</b> — plus the live enemy-jungle tracker that shows their start, clear and gank timers in game.</p>
  ${ctaHtml(`/matchup/jungle/${uA}-vs-${uB}/open`)}
</div>
${jgQa}
<h2>Related guides</h2>
<p><a href="/matchup/jungle/${uB}-vs-${uA}/">Playing the other side? ${esc(foe)} vs ${esc(you)} guide →</a><br>
<a href="/matchup/jungle/${uA}/">All ${esc(you)} jungle matchups →</a>${jgOppHub}</p>
${jgMore ? `<p class="sub">More ${esc(you)} jungle matchups: ${jgMore}</p>` : ''}`;
    outWrite(`jungle/${uA}-vs-${uB}/index.html`, shell(title, desc, canonical, jsonld, body, { jungle: true, names: [you, foe] }), `champ-data/jg/*.js JG_DB["${you}"]["${foe}"]`);
    sitemap.push(canonical);
    jgPages++;
    earlyWords.jgTotal++;
    if (String(rep.start || '').trim().split(/\s+/).filter(Boolean).length < 60) earlyWords.jgShort++;
  }
  // jungle champion hub — the count is the guides actually listed (self excluded).
  const uA = urlslug(you);
  const canonical = `${ORIGIN}/matchup/jungle/${uA}/`;
  // Only opponents this build actually wrote a guide for: an entry with no race
  // stages produces no page, and the hub used to link it anyway.
  const jgOpps = opps.filter(f => f !== you && spreads[f]).sort();
  // "<jungler> counters" is the query this page answers and never used to say.
  // The ranking is the same window spread the guides print, hardest first.
  const jgRank = Object.keys(spreads).sort((x, y) => (spreads[x].spread - spreads[y].spread) || (spreads[y].reds - spreads[x].reds) || x.localeCompare(y));
  const jgHard = jgRank.slice(0, 3), jgEasy = jgRank.slice(-3).reverse();
  // Same 60-char budget as the matchup pages; long names drop the guide count.
  let title = `${you} Jungle Counters & Matchups — All ${jgOpps.length} Guides`;
  if (title.length > 60) title = `${you} Jungle Counters & Matchups`;
  let desc = jgRank.length >= 6
    ? `Who counters ${you} in the jungle? Hardest: ${jgHard.join(', ')}. Easiest: ${jgEasy.join(', ')}. All ${jgOpps.length} guides: first clear, pathing and the race.`
    : `Who counters ${you} in the jungle? Every ${you} matchup guide: the level-by-level race, first clear, pathing, invade windows and objective control.`;
  if (desc.length > 155) desc = `Who counters ${you} in the jungle? Hardest: ${jgHard.join(', ')}. Easiest: ${jgEasy.join(', ')}. All ${jgOpps.length} jungle guides.`;
  if (desc.length > 155) desc = `Who counters ${you} in the jungle? Hardest: ${jgHard.join(', ')}. All ${jgOpps.length} jungle matchup guides: first clear, pathing and the race.`;
  if (desc.length > 155) desc = `Who counters ${you} in the jungle? All ${jgOpps.length} matchup guides: the level-by-level race, first clear, pathing and objective control.`;
  // The 50 jungle champion hubs used to be one sentence over a grid of 49 links,
  // while the 235 lane champion hubs carried a ranked table with a number on every
  // row. Nothing was missing from the data — the window spread behind each race is
  // already computed above for the hardest/easiest lists on the guides — it was
  // just never printed here. So the intro names the extremes with their splits,
  // and the table below lists every opponent with the same split and the same
  // favour call the guide itself makes (spread of 3+ windows, exactly as the
  // guide's FAVOURED / HARD / SKILL classification).
  const jgWin = f => `${spreads[f].greens} window${spreads[f].greens === 1 ? '' : 's'} to ${spreads[f].reds}`;
  const jgSay = f => `${f} (${jgWin(f)})`;
  const jgIntro = jgRank.length >= 6
    ? `<p>The junglers that counter ${esc(you)} hardest are ${esc(listEn(jgHard.map(jgSay)))} — they pressure the most windows in the race, counted as the windows ${esc(you)}'s own plan claims against theirs. The easiest matchups are ${esc(listEn(jgEasy.map(jgSay)))}.</p>`
    : `<p>Every researched ${esc(you)} jungle matchup — who counters ${esc(you)}, who ${esc(you)} beats, and how each race plays out window by window.</p>`;
  const jgHubRows = jgRank.map(f => {
    const s = spreads[f];
    const lab = s.spread >= 3 ? { cls: 'own-a', text: `${you} favoured` } : s.spread <= -3 ? { cls: 'own-b', text: `${f} favoured` } : { cls: 'own-s', text: 'Even race' };
    return `<tr><td><a href="/matchup/jungle/${uA}-vs-${urlslug(f)}/">${esc(you)} vs ${esc(f)}</a></td><td>${esc(jgWin(f))}</td><td>${s.spread > 0 ? '+' : ''}${s.spread}</td><td class="${lab.cls}">${esc(lab.text)}</td></tr>`;
  }).join('');
  const jgIconic = iconicBlock((ICONIC.byChamp.jungle || {})[you], `${esc(you)} is in the free iconic rotation. On its day each of these races is free to everyone, both directions, with no account.`);
  if (jgIconic) iconicStats.hubBlocks++;
  outWrite(`jungle/${uA}/index.html`, shell(title, desc, canonical, { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description: desc, url: canonical, publisher: ORG }, `
<nav class="crumbs"><a href="/matchup/">Matchups</a> › <a href="/matchup/jungle/">Jungle</a> › ${esc(you)}</nav>
<h1>${esc(you)} Jungle counters and matchups</h1>
${jgIntro}
<p class="trust">${esc(trustLine(true))} · <a href="/methodology">How we work this out</a></p>
${jgIconic}
<h2>Every ${esc(you)} jungle matchup, hardest race first</h2>
<p class="sub">${jgRank.length} researched jungle-vs-jungle guides for ${esc(you)}. "Windows" is how many of the 7 race stages each side's plan claims; a gap of 3 or more is what a guide calls favoured.</p>
<div class="tscroll"><table class="hub"><tr><th>Matchup</th><th>Windows</th><th>Spread</th><th>Favour</th></tr>${jgHubRows}</table></div>`, { jungle: true }));
  sitemap.push(canonical);
}
// ---------- category data for the lane hubs, the jungle hub and /matchup/ ----------
// Everything these pages say is computed here from the same POOL and window
// spreads the guides print, so a hub can never quote a number its guides don't.
const fmtN = n => Number(n).toLocaleString('en-US');
const pctOf = (k, n) => n ? Math.round((100 * k) / n) : 0;
// Jungle: one row per pairing, told from the side whose plan claims more windows.
const JG_SUM = (() => {
  const races = [], byPair = new Map(), per = {};
  for (const you of jgNames) {
    const sp = JG_SPREADS[you] || {};
    const foes = Object.keys(sp);
    per[you] = { n: foes.length, fav: foes.filter(f => sp[f].spread >= 3).length, hard: foes.filter(f => sp[f].spread <= -3).length };
    per[you].skill = per[you].n - per[you].fav - per[you].hard;
    per[you].rank = foes.sort((x, y) => (sp[x].spread - sp[y].spread) || (sp[y].reds - sp[x].reds) || x.localeCompare(y));
    for (const foe of foes) {
      const r = Object.assign({ you, foe, url: `/matchup/jungle/${urlslug(you)}-vs-${urlslug(foe)}/` }, sp[foe]);
      races.push(r);
      const key = [you, foe].sort().join('|'), cur = byPair.get(key);
      if (!cur || r.spread > cur.spread || (r.spread === cur.spread && r.greens > cur.greens)) byPair.set(key, r);
    }
  }
  const pairs = [...byPair.values()].sort((x, y) => (y.spread - x.spread) || (y.greens - x.greens) || x.you.localeCompare(y.you));
  const has = new Set(races.map(r => r.url));
  // The widest gaps are dozens of 7-0 ties, most of them one jungler's; cap each
  // jungler at two rows so a top-N list walks more of the roster.
  const seenYou = {}, spread2 = pairs.filter(r => (seenYou[r.you] = (seenYou[r.you] || 0) + 1) <= 2);
  const sweeps = pairs.filter(r => r.spread === 7), sweepBy = {};
  for (const r of sweeps) sweepBy[r.you] = (sweepBy[r.you] || 0) + 1;
  const sweepTop = Object.keys(sweepBy).sort((x, y) => (sweepBy[y] - sweepBy[x]) || x.localeCompare(y))[0] || '';
  return { races, pairs, spread2, sweeps: sweeps.length, sweepTop, sweepTopN: sweepBy[sweepTop] || 0, per, has,
    fav: races.filter(r => r.spread >= 3).length, hard: races.filter(r => r.spread <= -3).length };
})();
const jgRaceTxt = r => `${r.greens} windows to ${r.reds}`;
// Lane: one row per pairing with a pooled sample, told from the side the sample favours.
function laneSummary(L) {
  const D = DATA[L.key];
  const has = new Set(), byPair = new Map(), allPairs = new Set(), per = {};
  let guides = 0;
  for (const a of Object.keys(D.champs)) {
    const C = D.champs[a], aName = D.dispBy[a], bFs = Object.keys(C.entries);
    if (!bFs.length) continue;
    per[aName] = { n: 0, games: 0, fav: 0, hard: 0, slug: a, C };
    for (const bF of bFs) {
      const bName = dispOf(D, bF), key = [aName, bName].sort().join('|');
      const url = `/matchup/${L.key}/${urlslug(aName)}-vs-${urlslug(bName)}/`;
      has.add(url); allPairs.add(key); guides++;
      const p = POOL[L.key][a][bF];
      if (typeof p.wr !== 'number' || !p.games) continue;
      const pc = per[aName]; pc.n++; pc.games += p.games;
      const cls = favourCls(p.wr);
      if (cls === 'counterA') pc.fav++; else if (cls === 'counterB') pc.hard++;
      const row = { aName, bName, wr: p.wr, games: p.games, url, back: `/matchup/${L.key}/${urlslug(bName)}-vs-${urlslug(aName)}/` };
      const cur = byPair.get(key);
      if (!cur || p.wr > cur.wr) byPair.set(key, row);
    }
  }
  const pairs = [...byPair.values()];
  const byGames = pairs.slice().sort((x, y) => (y.games - x.games) || x.aName.localeCompare(y.aName));
  const gamesSorted = pairs.map(p => p.games).sort((x, y) => x - y);
  const median = gamesSorted.length ? gamesSorted[Math.floor(gamesSorted.length / 2)] : 0;
  const total = pairs.reduce((s, p) => s + p.games, 0);
  const cnt = c => pairs.filter(p => favourCls(p.wr) === c).length;
  // "Most one-sided" only among pairings with a real sample: the lane median, in round hundreds.
  const minGames = Math.max(100, Math.floor(median / 100) * 100);
  const lopsided = pairs.filter(p => p.games >= minGames).sort((x, y) => (y.wr - x.wr) || (y.games - x.games));
  const champs = Object.keys(per).length;
  const mostPlayedChamps = Object.keys(per).sort((x, y) => (per[y].games - per[x].games) || x.localeCompare(y));
  return { D, has, pairs, byGames, median, total, champs, guides, allPairs: allPairs.size, per, mostPlayedChamps,
    counter: cnt('counterA'), edge: cnt('edgeA'), even: cnt('even'), minGames, lopsided };
}
const LANE_SUM = {};
for (const L of LANES) LANE_SUM[L.key] = laneSummary(L);
// "Ahri vs Zed" linked, then the other side's guide when it exists.
const pairLink = (S, p) => `<a href="${p.url}">${esc(p.aName)} vs ${esc(p.bName)}</a>`;
const backLink = (S, p) => S.has.has(p.back) ? `<a href="${p.back}">${esc(p.bName)}'s side</a>` : '—';
const itemListLd = rows => ({ '@type': 'ItemList', numberOfItems: rows.length, itemListElement: rows.map((r, i) => ({ '@type': 'ListItem', position: i + 1, name: r.name, url: ORIGIN + r.url })) });

// jungle lane hub
{
  const canonical = `${ORIGIN}/matchup/jungle/`;
  const title = 'Jungle Counters & Matchup Guides | MatchupCoach.gg';
  const J = JG_SUM, racesN = J.races.length;
  const skillN = racesN - J.fav - J.hard;
  const top = J.spread2.slice(0, 10);
  const byFav = jgNames.slice().sort((x, y) => (J.per[y].fav - J.per[x].fav) || (J.per[x].hard - J.per[y].hard) || x.localeCompare(y));
  const byHard = jgNames.slice().sort((x, y) => (J.per[y].hard - J.per[x].hard) || (J.per[x].fav - J.per[y].fav) || x.localeCompare(y));
  const bySkill = jgNames.slice().sort((x, y) => (J.per[y].skill - J.per[x].skill) || x.localeCompare(y));
  const fv = byFav[0], hd = byHard[0], sk = bySkill[0];
  let desc = `Who counters who in the jungle? ${fmtN(racesN)} guides for ${jgNames.length} junglers: who owns each of the 7 race windows, the first clear and pathing.`;
  if (desc.length > 155) desc = `Who counters who in the jungle? ${fmtN(racesN)} guides for ${jgNames.length} junglers — the level-by-level race, first clears and pathing.`;
  const overview = `<p>This hub covers ${jgNames.length} junglers with ${fmtN(racesN)} jungle guides, one for each side of ${fmtN(J.pairs.length)} pairings. `
    + `No Emerald+ win-rate sample exists in this site's data for jungler-vs-jungler pairs, so every guide ranks its race by who owns the 7 stage windows instead of by a win rate. `
    + `${fmtN(J.fav)} guides (${pctOf(J.fav, racesN)}%) have your jungler ahead by 3 or more windows, ${fmtN(J.hard)} have you behind by 3 or more, and ${fmtN(skillN)} sit within 2 windows either way. `
    + (J.sweeps ? `${J.sweeps} pairings are a clean sweep, one jungler owning all 7 windows, and ${esc(J.sweepTop)} holds ${J.sweepTopN} of those. ` : `The most one-sided races are ${esc(listEn(J.pairs.slice(0, 3).map(r => `${r.you} vs ${r.foe} (${jgRaceTxt(r)})`)))}. `)
    + `${esc(fv)} is ahead by 3+ windows in ${J.per[fv].fav} of its ${J.per[fv].n} races, the most of any jungler, while ${esc(hd)} is behind by 3+ in ${J.per[hd].hard} of ${J.per[hd].n}. `
    + `${esc(sk)} plays the closest races: ${J.per[sk].skill} of its ${J.per[sk].n} are within 2 windows.</p>`;
  const topRows = top.map(r => `<tr><td><a href="${r.url}">${esc(r.you)} vs ${esc(r.foe)}</a></td><td>${esc(jgRaceTxt(r))}</td><td>${J.has.has(`/matchup/jungle/${urlslug(r.foe)}-vs-${urlslug(r.you)}/`) ? `<a href="/matchup/jungle/${urlslug(r.foe)}-vs-${urlslug(r.you)}/">${esc(r.foe)}'s side</a>` : '—'}</td></tr>`).join('');
  const hardRows = byFav.slice(0, 10).map(n => {
    const P = J.per[n], foe = P.rank[0], s = JG_SPREADS[n][foe];
    const ties = P.rank.filter(f => f !== foe && JG_SPREADS[n][f].spread === s.spread && JG_SPREADS[n][f].reds === s.reds).length;
    const read = s.spread < 0 ? `${foe} leads, ${s.reds} windows to ${s.greens}` : s.spread > 0 ? `${n} still leads, ${s.greens} windows to ${s.reds}` : `level, ${s.greens} windows each`;
    return `<tr><td><a href="/matchup/jungle/${urlslug(n)}/">${esc(n)}</a></td><td>${P.fav} of ${P.n}</td><td><a href="/matchup/jungle/${urlslug(n)}-vs-${urlslug(foe)}/">${esc(n)} vs ${esc(foe)}</a></td><td>${esc(`${read}${ties ? ` (${ties} more race${ties > 1 ? 's' : ''} at that spread)` : ''}`)}</td></tr>`;
  }).join('');
  const links = jgNames.slice().sort().map(n => `<a href="/matchup/jungle/${urlslug(n)}/">${esc(n)}</a>`).join('');
  const jgLaneIconic = iconicBlock(ICONIC.byLane.jungle, `One of these races is free to everyone every day, both directions, with no account — the rotation moves on at midnight UTC and comes back round every ${ICONIC.byLane.jungle.length} days.`);
  if (jgLaneIconic) iconicStats.hubBlocks++;
  const jsonld = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description: desc, url: canonical, publisher: ORG,
    mainEntity: itemListLd(top.map(r => ({ name: `${r.you} vs ${r.foe}`, url: r.url }))) };
  outWrite('jungle/index.html', shell(title, desc, canonical, jsonld, `
<nav class="crumbs"><a href="/matchup/">Matchups</a> › Jungle</nav>
<h1>Jungle Counters &amp; Matchup Guides</h1>
${overview}
<p class="trust">${esc(trustLine(true))} · <a href="/methodology">How we work this out</a></p>
${jgLaneIconic}
<h2>Most one-sided jungle races</h2>
<p class="sub">The 10 pairings with the widest window gap, at most two per jungler, told from the side that owns more windows.</p>
<div class="tscroll"><table><tr><th>Race</th><th>Windows</th><th>Other side</th></tr>${topRows}</table></div>
<h2>Hardest counters for the 10 junglers with the most favoured races</h2>
<p class="sub">Each jungler's worst race by window spread — the same ranking its own counters page uses.</p>
<div class="tscroll"><table><tr><th>Jungler</th><th>Favoured races</th><th>Hardest race</th><th>Race read</th></tr>${hardRows}</table></div>
<h2>All ${jgNames.length} junglers</h2>
<div class="linkgrid">${links}</div>`, { jungle: true }));
  sitemap.push(canonical);
}
console.log('jungle guide pages:', jgPages, '(+ ' + jgNames.length + ' champion hubs)');
console.log(`jungle first item: lifted from the race label ${jgItemStats.lifted} · JG_LOADOUTS fallback ${jgItemStats.fallback}${jgItemStats.examples.length ? ' — e.g. ' + jgItemStats.examples.join(', ') : ''}`);

// ---------- champ hubs ----------
for (const L of LANES) {
  const D = DATA[L.key];
  for (const aName of D.names) {
    const a = slug(aName), C = D.champs[a];
    if (!C) continue;
    const uA = urlslug(aName);
    const canonical = `${ORIGIN}/matchup/${L.key}/${uA}/`;
    // One row per guide, most-played first, carrying the same pooled win rate,
    // game count and favour call the guide itself prints.
    const opps = Object.keys(C.entries).map(bF => Object.assign({ bF, name: dispOf(D, bF) }, POOL[L.key][a][bF]))
      .sort((x, y) => ((y.games || 0) - (x.games || 0)) || x.name.localeCompare(y.name));
    const rows = opps.map(x => {
      const lab = favourLabel(favourCls(x.wr), aName, x.name);
      return `<tr><td><a href="/matchup/${L.key}/${uA}-vs-${urlslug(x.name)}/">${esc(aName)} vs ${esc(x.name)}</a></td><td>${typeof x.wr === 'number' ? `${x.wr}%` : '—'}</td><td>${x.games ? Number(x.games).toLocaleString('en-US') : '—'}</td><td${lab.cls ? ` class="${lab.cls}"` : ''}>${esc(lab.text)}</td></tr>`;
    }).join('');
    const ranked = rankedOpps(L, D, a, C);
    const say = x => `${x.name} (${x.wr}%)`;
    const hubIconic = iconicBlock((ICONIC.byChamp[L.key] || {})[aName], `${esc(aName)} is in the free iconic rotation. On its day each of these matchups is free to everyone, both directions, with no account.`);
    if (hubIconic) iconicStats.hubBlocks++;
    // "<champion> counters" is the highest-volume query this site can answer, and
    // the hub already holds the answer — the three lowest pooled win rates, with
    // sample sizes. It just used to call it something else, so the page went to
    // the SERP without the word every competing result carries. Title, H1, the
    // description and the opening sentence all lead with it now, and the opening
    // sentence IS the hardest-matchup list.
    const hard = ranked.slice(0, 3), easy = ranked.slice(-3).reverse();
    const laneH = L.label.replace(' (ADC)', '');
    const intro = ranked.length >= 6
      ? `<p>The champions that counter ${esc(aName)} hardest in ${L.prose} are ${esc(listEn(hard.map(say)))} — those are ${esc(aName)}'s own pooled win rates. The easiest matchups are ${esc(listEn(easy.map(say)))}.</p>`
      : `<p>Every researched ${esc(aName)} ${L.prose} matchup — who counters ${esc(aName)}, who ${esc(aName)} counters, and how each lane plays out.</p>`;
    let title = `${aName} ${L.short} Counters & Matchups — All ${opps.length} Guides`;
    if (title.length > 60) title = `${aName} ${L.short} Counters & Matchups`;
    const names3 = xs => xs.map(x => x.name).join(', ');
    let desc = ranked.length >= 6
      ? `Who counters ${aName} ${L.prose}? Hardest: ${names3(hard)}. Easiest: ${names3(easy)}. All ${opps.length} guides with win rates and game plans.`
      : `Who counters ${aName} ${L.prose}? Every ${aName} matchup guide: who wins, favour timeline, power spikes and game plans vs all ${opps.length} opponents.`;
    if (desc.length > 155) desc = `Who counters ${aName} ${L.prose}? Hardest: ${names3(hard)}. Easiest: ${names3(easy)}. All ${opps.length} guides.`;
    if (desc.length > 155) desc = `Who counters ${aName} ${L.prose}? Hardest: ${names3(hard)}. All ${opps.length} matchup guides with win rates and game plans.`;
    if (desc.length > 155) desc = `Who counters ${aName} ${L.prose}? All ${opps.length} matchup guides: who wins, the favour timeline and the game plan.`;
    const jsonld = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description: desc, url: canonical, publisher: ORG };
    const body = `
<nav class="crumbs"><a href="/matchup/">Matchups</a> › <a href="/matchup/${L.key}/">${L.label}</a> › ${esc(aName)}</nav>
<h1>${esc(aName)} ${laneH} counters and matchups</h1>
${intro}
<p class="trust">${esc(trustLine(false))} · <a href="/methodology">How we work this out</a></p>
${hubIconic}
<h2>Every ${esc(aName)} ${L.prose} matchup, most-played first</h2>
<p class="sub">${opps.length} researched matchup guides for ${esc(aName)} in ${L.prose}. Win rates are ${esc(aName)}'s side, pooled Emerald+ games sampled ${WR_SAMPLED}.</p>
<div class="tscroll"><table class="hub"><tr><th>Matchup</th><th>Win rate</th><th>Games</th><th>Favour</th></tr>${rows}</table></div>`;
    outWrite(`${L.key}/${uA}/index.html`, shell(title, desc, canonical, jsonld, body));
    sitemap.push(canonical);
  }
}

// ---------- lane hubs + root ----------
for (const L of LANES) {
  const D = DATA[L.key];
  const canonical = `${ORIGIN}/matchup/${L.key}/`;
  const links = D.names.slice().sort().map(n => `<a href="/matchup/${L.key}/${urlslug(n)}/">${esc(n)}</a>`).join('');
  // 60-char budget: "Bot Lane (ADC)" pushes the full form to 64, so it drops the tagline.
  let title = `${L.label} Counters & Matchup Guides | MatchupCoach.gg`;
  if (title.length > 60) title = `${L.label} Counters & Matchups | MatchupCoach.gg`;
  const S = LANE_SUM[L.key];
  const champWord = L.key === 'support' ? 'supports' : `${L.prose} champions`;
  let desc = `Who counters who in ${L.prose}? ${fmtN(S.guides)} guides for ${S.champs} champions from ${fmtN(S.total)} pooled Emerald+ games: win rates, counters and game plans.`;
  if (desc.length > 155) desc = `Who counters who in ${L.prose}? ${fmtN(S.guides)} guides for ${S.champs} champions from ${fmtN(S.total)} pooled Emerald+ games.`;
  if (desc.length > 155) desc = `Who counters who in League of Legends ${L.prose}? Matchup guides for all ${D.names.length} champions — win rates, power spikes and game plans.`;
  // Overview: every clause is a count or a pairing from LANE_SUM.
  const mp = S.byGames[0], topC = S.mostPlayedChamps[0];
  const favC = Object.keys(S.per).filter(n => S.per[n].n).sort((x, y) => (S.per[y].fav - S.per[x].fav) || (S.per[x].hard - S.per[y].hard) || x.localeCompare(y))[0];
  const hardC = Object.keys(S.per).filter(n => S.per[n].n).sort((x, y) => (S.per[y].hard - S.per[x].hard) || (S.per[x].fav - S.per[y].fav) || x.localeCompare(y))[0];
  const unsampled = S.allPairs - S.pairs.length;
  const lop = S.lopsided.slice(0, 3).map(p => `${p.aName} over ${p.bName} (${p.wr}% across ${fmtN(p.games)} games)`);
  const overview = `<p>This hub covers ${S.champs} ${champWord} with ${fmtN(S.guides)} matchup guides, one for each side of ${fmtN(S.allPairs)} pairings. `
    + `${fmtN(S.pairs.length)} of those pairings carry a pooled Emerald+ win-rate sample from lolalytics, taken ${WR_SAMPLED}: ${fmtN(S.total)} games in all, a median of ${fmtN(S.median)} per pairing${unsampled ? `, with ${unsampled} still unsampled` : ''}. `
    + `${fmtN(S.counter)} pairings (${pctOf(S.counter, S.pairs.length)}%) clear the 5-point edge a guide calls a counter, ${fmtN(S.edge)} lean one way by less than that, and ${fmtN(S.even)} sit within 0.75 points of 50%. `
    + (lop.length ? `Among pairings with at least ${fmtN(S.minGames)} games, the most one-sided are ${esc(listEn(lop))}. ` : '')
    + `The most-played pairing is ${esc(mp.aName)} vs ${esc(mp.bName)} at ${fmtN(mp.games)} games, and ${esc(topC)} shows up in the most sampled games: ${fmtN(S.per[topC].games)} across ${S.per[topC].n} matchups. `
    + `${esc(favC)} holds a 5-point edge in ${S.per[favC].fav} of its ${S.per[favC].n} sampled matchups, the most in the lane, while ${esc(hardC)} is on the wrong side of that line in ${S.per[hardC].hard} of ${S.per[hardC].n}.</p>`;
  const laneIconic = iconicBlock(ICONIC.byLane[L.key], `One of these matchups is free to everyone every day, both directions, with no account — the rotation moves on at midnight UTC and comes back round every ${(ICONIC.byLane[L.key] || []).length} days.`);
  if (laneIconic) iconicStats.hubBlocks++;
  const top10 = S.byGames.slice(0, 10);
  const mpRows = top10.map(p => `<tr><td>${pairLink(S, p)}</td><td>${p.wr}%</td><td>${fmtN(p.games)}</td><td>${backLink(S, p)}</td></tr>`).join('');
  const hardRows = S.mostPlayedChamps.slice(0, 10).map(n => {
    const P = S.per[n], r = rankedOpps(L, D, P.slug, P.C)[0];
    if (!r) return '';
    return `<tr><td><a href="/matchup/${L.key}/${urlslug(n)}/">${esc(n)}</a></td><td>${fmtN(P.games)}</td><td><a href="/matchup/${L.key}/${urlslug(n)}-vs-${urlslug(r.name)}/">${esc(n)} vs ${esc(r.name)}</a>${r.wr >= 50 ? ' (no sampled matchup below 50%)' : ''}</td><td>${r.wr}%</td><td>${fmtN(r.games)}</td></tr>`;
  }).join('');
  const jsonld = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description: desc, url: canonical, publisher: ORG,
    mainEntity: itemListLd(top10.map(p => ({ name: `${p.aName} vs ${p.bName}`, url: p.url }))) };
  const body = `
<nav class="crumbs"><a href="/matchup/">Matchups</a> › ${L.label}</nav>
<h1>${L.label} Counters &amp; Matchup Guides</h1>
${overview}
<p class="trust">${esc(trustLine(false))} · <a href="/methodology">How we work this out</a></p>
${laneIconic}
<h2>Most-played ${L.prose} matchups</h2>
<p class="sub">The 10 pairings with the most pooled Emerald+ games, sampled ${WR_SAMPLED}. The win rate is the first-named champion's.</p>
<div class="tscroll"><table><tr><th>Matchup</th><th>Win rate</th><th>Games</th><th>Other side</th></tr>${mpRows}</table></div>
<h2>Hardest counters for the 10 most-played ${champWord}</h2>
<p class="sub">Each champion's lowest pooled win rate — the same ranking its own counters page leads with. Check the games column before trusting a small sample.</p>
<div class="tscroll"><table><tr><th>Champion</th><th>Sampled games</th><th>Hardest matchup</th><th>Win rate</th><th>Games</th></tr>${hardRows}</table></div>
<h2>All ${D.names.length} ${champWord}</h2>
<div class="linkgrid">${links}</div>`;
  outWrite(`${L.key}/index.html`, shell(title, desc, canonical, jsonld, body));
  sitemap.push(canonical);
}
{
  const canonical = `${ORIGIN}/matchup/`;
  const title = 'LoL Counters & Matchup Guides — Every Lane | MatchupCoach.gg'; // 59 chars
  const laneGuides = LANES.reduce((s, L) => s + LANE_SUM[L.key].guides, 0);
  let desc = `Who counters who in League of Legends? ${fmtN(laneGuides + jgPages)} matchup guides across top, mid, bot, support and jungle — win rates, counters and game plans.`;
  if (desc.length > 155) desc = 'Who counters who in League of Legends? Researched matchup guides for every champion in top, mid, bot, support and jungle — win rates and game plans.';
  // Sitewide most-played: every lane's pairings on one scale, lane named per row.
  const all = LANES.flatMap(L => LANE_SUM[L.key].pairs.map(p => Object.assign({ L }, p))).sort((x, y) => (y.games - x.games) || x.aName.localeCompare(y.aName));
  const top25 = all.slice(0, 25);
  const laneBlocks = LANES.map(L => {
    const S = LANE_SUM[L.key];
    const lis = S.byGames.slice(0, 5).map(p => `<li>${pairLink(S, p)} — ${esc(p.aName)} wins ${p.wr}% of ${fmtN(p.games)} games</li>`).join('');
    return `<h2>${L.label}: the 5 most-played matchups</h2>
<p class="sub">${S.champs} champions, ${fmtN(S.guides)} guides, ${fmtN(S.total)} pooled games · <a href="/matchup/${L.key}/">All ${L.prose} counters and matchups →</a></p>
<ul>${lis}</ul>`;
  }).join('\n');
  const jgBlock = jgNames.length ? `<h2>Jungle: the 5 most one-sided races</h2>
<p class="sub">${jgNames.length} junglers, ${fmtN(jgPages)} guides, ranked by stage windows — no win-rate sample exists for jungle pairs · <a href="/matchup/jungle/">All jungle counters and matchups →</a></p>
<ul>${JG_SUM.spread2.slice(0, 5).map(r => `<li><a href="${r.url}">${esc(r.you)} vs ${esc(r.foe)}</a> — ${esc(r.you)}'s plan owns ${esc(jgRaceTxt(r))}</li>`).join('')}</ul>` : '';
  const t25 = top25.map(p => `<li>${pairLink(LANE_SUM[p.L.key], p)} (${p.L.short}) — ${esc(p.aName)} wins ${p.wr}% of ${fmtN(p.games)} games</li>`).join('');
  const body = `
<h1>League of Legends Counters &amp; Matchup Guides</h1>
<p class="sub">Every champion, every lane — who counters who, researched stage-by-stage.</p>
<p class="trust">${esc(trustLine(false))} · <a href="/methodology">How we work this out</a></p>
<p>${fmtN(laneGuides)} lane guides each open with a verdict from the pooled Emerald+ win rate, the enemy ability to track, runes and build, a 7-stage favour table and the early-game plan; the ${fmtN(jgPages)} jungle guides trade the win rate for the 7-window race and the first clear.</p>
${laneBlocks}
${jgBlock}
<h2>The 25 most-played matchups on the site</h2>
<p class="sub">Every lane on one scale, by pooled Emerald+ games sampled ${WR_SAMPLED}; the win rate is the first-named champion's. Top-lane samples count each game once, while mid, bot and support add both sides' pulls together, so those lanes run higher (${LANES.map(L => `${L.short} median ${fmtN(LANE_SUM[L.key].median)}`).join(', ')}).</p>
<ol>${t25}</ol>
<a class="cta" href="/">▶ Open the interactive coach</a>`;
  const jsonld = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description: desc, url: canonical, publisher: ORG,
    mainEntity: itemListLd(top25.map(p => ({ name: `${p.aName} vs ${p.bName} (${p.L.short})`, url: p.url }))) };
  outWrite('index.html', shell(title, desc, canonical, jsonld, body));
  sitemap.push(canonical);
}

// ---------- hand-written static pages ----------
// /methodology is not generated here — it ships as methodology.html at the repo
// root — but every one of the built guides links to it twice (trust line and
// footer) and it is the page that explains where the win rates come from. A page
// that many internal links point at, and that carries its own canonical, has to
// be crawlable from the sitemap; it was missing for the whole of the first
// indexable release. No trailing slash, to match the canonical the file declares.
// It takes DATA_MODIFIED like every other URL: it describes the data pipeline, so
// it is stale exactly when the data is.
sitemap.push(`${ORIGIN}/methodology`);

// ---------- sitemap ----------
// Every URL, including the root, carries DATA_MODIFIED. The root used to carry
// the build date because the homepage rotates its free matchups daily — but the
// build machine's "today" in UTC is regularly AHEAD of the crawler's, so the
// homepage shipped a lastmod in the future, which is a bad-data signal rather
// than a freshness one. The rotation is a view of content that already exists;
// the content itself changes when champ-data changes, which is what DATA_MODIFIED
// tracks. changefreq still tells crawlers the homepage is worth a daily look.
const sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${ORIGIN}/</loc><lastmod>${DATA_MODIFIED}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>
` + sitemap.map(u => `<url><loc>${u}</loc><lastmod>${DATA_MODIFIED}</lastmod><changefreq>monthly</changefreq><priority>${u.endsWith('/matchup/') ? '0.9' : /\/matchup\/[a-z]+\/$/.test(u) ? '0.8' : u.includes('-vs-') ? '0.7' : '0.6'}</priority></url>`).join('\n') + '\n</urlset>\n';
fs.writeFileSync('sitemap.xml', sm);

// ---------- sitemap gate ----------
// The trust gate above proves every page LINKS to /methodology; this proves the
// page it links to is itself crawlable. Counted from the written XML rather than
// from the array, so a template change that drops URLs is caught too: one <loc>
// per built page, plus the root and plus /methodology.
{
  const smUrls = (sm.match(/<loc>/g) || []).length;
  const STATIC = 2; // the root and /methodology
  if (!sm.includes(`<loc>${ORIGIN}/methodology</loc>`)) throw new Error('sitemap gate FAILED: /methodology is linked from every page but is not in sitemap.xml');
  if (smUrls !== pages + STATIC) throw new Error(`sitemap gate FAILED: sitemap.xml has ${smUrls} URLs for ${pages} built pages — expected ${pages + STATIC} (every page, plus the root and /methodology)`);
  console.log(`sitemap: ${smUrls} URLs — ${pages} built pages + the root + /methodology, every lastmod ${DATA_MODIFIED}`);
}

// ---------- snippet gate ----------
console.log(`meta description max ${snippetStats.descMax} chars (${snippetStats.descMaxUrl}) · over 155: ${snippetStats.descOver} · min ${snippetStats.descMin} chars (${snippetStats.descMinUrl}) · under ${DESC_MIN}: ${snippetStats.descShort}`);
console.log(`title max ${snippetStats.titleMax} chars (${snippetStats.titleMaxUrl}) · over 60: ${snippetStats.titleOver}`);
if (snippetStats.descOver > 0) throw new Error(`snippet gate FAILED: ${snippetStats.descOver} meta descriptions exceed 155 chars (max ${snippetStats.descMax} at ${snippetStats.descMaxUrl})`);
if (snippetStats.titleOver > 0) throw new Error(`snippet gate FAILED: ${snippetStats.titleOver} titles exceed 60 chars (max ${snippetStats.titleMax} at ${snippetStats.titleMaxUrl})`);
console.log(`title ladder: "How to Play" in ${ladderStats.howToPlay} of ${pages} titles · duplicate titles ${ladderStats.dupes}${ladderStats.dupeEx.length ? ' — ' + ladderStats.dupeEx.join('; ') : ''}`);
if (ladderStats.dupes > 0) throw new Error(`title gate FAILED: ${ladderStats.dupes} duplicate titles — ${ladderStats.dupeEx.join('; ')}`);
console.log(`description ladder: decisive-stage clause on ${ladderStats.dec} of ${pages} descriptions (suppressed on ${ladderStats.decSup} where the favoured side already owns the first window) · duplicate descriptions ${ladderStats.descDupes}${ladderStats.descDupeEx.length ? ' — ' + ladderStats.descDupeEx.join('; ') : ''}`);
console.log(`snippet patch gate: titles or descriptions naming a patch number ${ladderStats.patch} of ${pages} (page trust line still reads "reviewed on patch ${LIVE_PATCH}")`);
if (ladderStats.patch) throw new Error(`snippet patch gate FAILED: ${ladderStats.patch} titles/descriptions name a patch number — the win rates were sampled ${WR_SAMPLED} and have not been re-sampled: ${ladderStats.patchEx.join('; ')}`);
console.log(`FAQ/heading invariant: ${ladderStats.faqQs} questions on ${ladderStats.faqPages} pages · questions with no matching visible heading ${ladderStats.faqMissing}${ladderStats.faqEx.length ? ' — ' + ladderStats.faqEx.join('; ') : ''}`);
if (ladderStats.faqMissing > 0) throw new Error(`FAQ gate FAILED: ${ladderStats.faqMissing} schema questions are not visible headings — ${ladderStats.faqEx.join('; ')}`);
console.log(`FAQ answer invariant: answers not printed verbatim on their page ${ladderStats.ansMissing}${ladderStats.ansEx.length ? ' — ' + ladderStats.ansEx.join('; ') : ''}`);
if (ladderStats.ansMissing > 0) throw new Error(`FAQ gate FAILED: ${ladderStats.ansMissing} schema answers are not visible on the page — ${ladderStats.ansEx.join('; ')}`);
{
  const tpls = [...ladderStats.tpl.entries()].sort((x, y) => y[1] - x[1]);
  const [topT, topN] = tpls[0] || ['', 0];
  console.log(`FAQ answer templates (names + numbers masked): ${tpls.length} distinct on ${ladderStats.faqPages} pages · largest covers ${topN} pages (limit ${FAQ_TEMPLATE_MAX}): "${topT.slice(0, 140)}${topT.length > 140 ? '…' : ''}" · over the limit ${tpls.filter(x => x[1] > FAQ_TEMPLATE_MAX).length} · page-specific clauses: who ${faqClauseStats.who} (bare ${faqClauseStats.bare}) · skill ${faqClauseStats.skill} · counter ${faqClauseStats.counter} · runes ${faqClauseStats.runes} · jungle who ${faqClauseStats.jgWho} · jungle skill ${faqClauseStats.jgSkill} · jungle runes ${faqClauseStats.jgRunes}`);
  if (topN > FAQ_TEMPLATE_MAX) throw new Error(`FAQ template gate FAILED: one answer template covers ${topN} pages (limit ${FAQ_TEMPLATE_MAX}) — "${topT}"`);
}
console.log(`hub "counter" coverage: title ${hubStats.title}/${hubStats.hubs} · H1 ${hubStats.h1}/${hubStats.hubs} · body ${hubStats.body}/${hubStats.hubs}${hubStats.missing.length ? ' — missing on ' + hubStats.missing.join(', ') : ''}`);
if (hubStats.title < hubStats.hubs || hubStats.h1 < hubStats.hubs || hubStats.body < hubStats.hubs) throw new Error(`hub gate FAILED: "counter" missing from ${hubStats.hubs - Math.min(hubStats.title, hubStats.h1, hubStats.body)} hubs — ${hubStats.missing.join(', ')}`);

// ---------- iconic matchup gate ----------
// A pool name that does not resolve to a page is the failure this gate exists
// for: the badge would appear on nothing and every hub would link a 404. Both
// directions of all pairs must be pages this build wrote, and the badge count
// must equal the pool size exactly — one too few means a page missed it.
{
  const missing = [...ICONIC.urls.keys()].filter(u => !linkGraph.written.has(u));
  console.log(`iconic matchups: ${ICONIC.pairs} pairs · ${ICONIC.urls.size} pages in the pool · badge printed on ${built.iconic} · "Iconic matchups" blocks on ${iconicStats.hubBlocks} hubs · pool names with no page ${missing.length}${missing.length ? ' — ' + missing.slice(0, 5).join(', ') : ''}`);
  if (missing.length) throw new Error(`iconic gate FAILED: ${missing.length} iconic pool entries do not resolve to a built page — ${missing.slice(0, 8).join(', ')}`);
  if (built.iconic !== ICONIC.urls.size) throw new Error(`iconic gate FAILED: badge on ${built.iconic} pages, pool is ${ICONIC.urls.size}`);
}

// ---------- trust, methodology and jungle win-rate gates ----------
// Every page carries the "Updated … · reviewed on patch …" line and a link to
// /methodology; every jungle guide says once, in the verdict box, why it has no
// win rate. These are one-line claims that are easy to lose in a template edit,
// so they are counted rather than trusted.
console.log(`trust line: on ${built.trust} of ${pages} pages · /methodology linked on ${built.method} · jungle "no win-rate sample" line on ${built.jgNoWr} of ${jgPages} jungle guides · opponent champion-hub link on ${oppHubStats.lane} lane guides (${oppHubStats.laneMissing} opponents with no hub) and ${oppHubStats.jg} jungle guides (${oppHubStats.jgMissing} missing)`);
if (built.method < pages) throw new Error(`trust gate FAILED: /methodology not linked on ${pages - built.method} pages`);
if (built.trust < pages) throw new Error(`trust gate FAILED: the "Updated …" line is missing from ${pages - built.trust} pages`);
if (built.jgNoWr !== jgPages) throw new Error(`jungle win-rate gate FAILED: the no-sample line is on ${built.jgNoWr} of ${jgPages} jungle guides`);
if (oppHubStats.laneMissing + oppHubStats.jgMissing > 0) throw new Error(`related-guides gate FAILED: ${oppHubStats.laneMissing + oppHubStats.jgMissing} guides have an opponent with no champion hub to link`);

// ---------- render-blocking resource gate ----------
// The Google Fonts stylesheet was the only thing standing between the request and
// the first paint. It is now preloaded and applied with the media="print" swap,
// and no page may reintroduce a plain stylesheet link.
console.log(`fonts: non-blocking preload + media swap on ${built.asyncFont} of ${pages} pages · render-blocking stylesheet links ${built.blockingFont}`);
if (built.asyncFont !== pages || built.blockingFont > 0) throw new Error(`font gate FAILED: async font links on ${built.asyncFont} of ${pages} pages, ${built.blockingFont} still render-blocking`);

// ---------- structured-data publisher gate ----------
// One Organization node with one stable @id, and a publisher logo on the Article.
{
  const html = fs.readFileSync(path.join('matchup', 'top/aatrox-vs-darius/index.html'), 'utf8');
  const ld = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const org = (ld['@graph'] || []).find(x => x['@type'] === 'Organization');
  const art = (ld['@graph'] || []).find(x => x['@type'] === 'Article');
  const faq = (ld['@graph'] || []).find(x => x['@type'] === 'FAQPage');
  const ok = org && org['@id'] === ORG_ID && org.logo && org.logo.url && org.logo.width && org.logo.height
    && art && art.publisher && art.publisher['@id'] === ORG_ID && art.author && art.author['@id'] === ORG_ID
    && faq && Array.isArray(faq.mainEntity) && faq.mainEntity.length >= 3
    && faq.mainEntity.every(q => q['@type'] === 'Question' && q.name && q.acceptedAnswer && q.acceptedAnswer['@type'] === 'Answer' && q.acceptedAnswer.text);
  console.log(`structured data: Organization @id ${org ? org['@id'] : '(missing)'} · publisher logo ${org && org.logo ? `${org.logo.url} ${org.logo.width}x${org.logo.height}` : '(missing)'} · Article publisher/author reference it ${!!(art && art.publisher && art.publisher['@id'] === ORG_ID)} · FAQPage entries ${faq ? faq.mainEntity.length : 0}`);
  if (!ok) throw new Error('structured-data gate FAILED: Organization @id, publisher logo, Article references or FAQPage shape is wrong on /matchup/top/aatrox-vs-darius/');
}

// ---------- verdict coherence gate ----------
console.log(`verdict gate: ${verdictStats.contra} of ${verdictStats.checked} lane verdicts pair a "favoured" clause with a stage-window clause pointing the other way${verdictStats.examples.length ? ' — ' + verdictStats.examples.join(' | ') : ''}`);
if (verdictStats.contra > 0) throw new Error(`verdict gate FAILED: ${verdictStats.contra} verdicts contradict themselves — ${verdictStats.examples.join(' | ')}`);

// ---------- internal link graph ----------
// Measured on the pages this build just wrote, not on a crawl: every anchor to a
// /matchup/ URL that is not the page's own. The rotating "more matchups" block
// is what moves the floor here — the fixed slice left 8,291 guides on two.
{
  const guides = [...linkGraph.written].filter(u => u.includes('-vs-'));
  const counts = guides.map(u => linkGraph.inbound[u] || 0).sort((x, y) => x - y);
  const at = q => counts[Math.min(counts.length - 1, Math.floor(counts.length * q))];
  const under = n => counts.filter(c => c < n).length;
  const orphan = guides.filter(u => (linkGraph.inbound[u] || 0) < 4).slice(0, 3);
  console.log(`internal links: guide pages ${counts.length} · inbound min ${counts[0]} · p10 ${at(0.1)} · median ${at(0.5)} · p90 ${at(0.9)} · max ${counts[counts.length - 1]} · under 4 inbound ${under(4)} · under 3 ${under(3)}${orphan.length ? ' — e.g. ' + orphan.join(', ') : ''}`);
  if (under(4) > 0) throw new Error(`link gate FAILED: ${under(4)} guides have fewer than 4 inbound internal links — ${orphan.join(', ')}`);
}

// ---------- retired rune / item gate ----------
{
  const found = Object.keys(retiredStats.pages).sort();
  const over = found.filter(n => retiredStats.pages[n] > (RETIRED_ALLOWANCE[n] || 0));
  const stale = Object.keys(RETIRED_ALLOWANCE).filter(n => !retiredStats.pages[n]);
  console.log(`retired vocabulary: ${found.length ? found.map(n => `${n} ${retiredStats.pages[n]} pages (first: ${retiredStats.src[n]})`).join(' · ') : 'clean — none of the 16 retired runes/items appear in the built HTML'}${stale.length ? ` · allowances now unused, delete them: ${stale.join(', ')}` : ''}`);
  if (over.length) throw new Error(`retired vocabulary gate FAILED: ${over.map(n => `${n} on ${retiredStats.pages[n]} pages (allowance ${RETIRED_ALLOWANCE[n] || 0}) — first at ${retiredStats.src[n]}`).join(' · ')}`);
}

// ---------- thin early-game paragraphs (warn only) ----------
console.log(`WARN thin sections: early-game paragraph under 60 words on ${earlyWords.short} of ${earlyWords.total} lane guides · first-clear paragraph under 60 words on ${earlyWords.jgShort} of ${earlyWords.jgTotal} jungle guides`);

// ---------- section coverage + size gate ----------
// The at-a-glance box and the build card are guarded per pair, so a data
// mismatch (a renamed key, an overlay that stopped loading) would silently
// drop them from thousands of pages while the build still exits 0 — so count
// them, and fail below nine in ten lane pages. Pages stay well under 60 KB.
const lanePages = laneMatchupPages;
console.log(`sections: at-a-glance ${glanceStats.boxes} of ${lanePages} lane pages (no data ${glanceStats.noData}, track line ${glanceStats.track}, kit missing ${glanceStats.noKit}, draft lines dropped ${glanceStats.dropped}, lines regendered for female opponents ${glanceStats.regendered}) · build cards ${glanceStats.builds} (no loadout ${glanceStats.noLoadout}) · hardest/easiest lists ${glanceStats.extremes || 0}`);
if (glanceStats.boxes < lanePages * 0.9) throw new Error(`section gate FAILED: at-a-glance box on only ${glanceStats.boxes} of ${lanePages} lane pages — is CHAMP_DATA loading?`);
// Which file the tracked ability's name came from, and where the app's ENEMY_KITS
// still disagrees with Data Dragon (the kit name is what those pages print).
const clashSlots = Object.values(kitStats.clashSlots);
console.log(`track ability name: from ENEMY_KITS ${kitStats.fromEK} pages · from the kit file ${kitStats.fromKit} (ENEMY_KITS disagrees with the kit on ${kitStats.clash} pages, ${clashSlots.length} slots${clashSlots.length ? ': ' + clashSlots.join('; ') : ''})`);
console.log(`largest page ${(sizeStats.max / 1024).toFixed(1)} KB (${sizeStats.maxUrl})`);
if (sizeStats.max > 60 * 1024) throw new Error(`size gate FAILED: ${sizeStats.maxUrl} is ${(sizeStats.max / 1024).toFixed(1)} KB`);

// ---------- structured-data gate ----------
// Six representative pages (one per lane, a jungle guide, a champion hub): the
// ld+json block must parse, every guide must carry its FAQ, and no page may
// repeat an H2 — the new sections each add one.
// Category pages: the lane hubs, the jungle hub and /matchup/ are link hubs for
// thousands of guides, so they have to carry real content, one ItemList each, and
// no repeated H2.
{
  const words = h => h.replace(/<head>[\s\S]*?<\/head>/, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
  const out = [];
  for (const p of ['', ...LANES.map(L => L.key), 'jungle']) {
    const html = fs.readFileSync(path.join('matchup', p, 'index.html'), 'utf8');
    const ld = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const items = ld.mainEntity && ld.mainEntity['@type'] === 'ItemList' ? ld.mainEntity.itemListElement.length : 0;
    const h2s = [...html.matchAll(/<h2>(.*?)<\/h2>/g)].map(x => x[1]);
    const intro = (html.match(/<\/h1>\s*<p>([\s\S]*?)<\/p>/) || ['', ''])[1];
    const introWords = intro.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    out.push(`/matchup/${p ? p + '/' : ''} ${words(html)} words (overview ${introWords}) · ${items} ItemList entries · ${h2s.length} H2s`);
    if (ld['@type'] !== 'CollectionPage' || items < 5) throw new Error(`category gate FAILED: /matchup/${p}/ ld+json is ${ld['@type']} with ${items} ItemList entries`);
    if (new Set(h2s).size !== h2s.length) throw new Error(`heading gate FAILED: duplicate H2 on /matchup/${p}/ — ${h2s.join(' | ')}`);
    if (p && (introWords < 120 || introWords > 180)) throw new Error(`category gate FAILED: /matchup/${p}/ overview is ${introWords} words (want 120-180)`);
  }
  console.log(`category pages: ${out.join(' · ')}`);
}
for (const p of ['top/aatrox-vs-darius', 'mid/ahri-vs-zed', 'bot/jinx-vs-caitlyn', 'support/thresh-vs-lulu', 'jungle/lee-sin-vs-graves', 'top/aatrox']) {
  const html = fs.readFileSync(path.join('matchup', p, 'index.html'), 'utf8');
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!m) throw new Error(`ld+json gate FAILED: no block in /matchup/${p}/`);
  const ld = JSON.parse(m[1]); // throws on invalid JSON
  const faq = (ld['@graph'] || []).find(x => x['@type'] === 'FAQPage');
  if (p.includes('-vs-') && !(faq && faq.mainEntity.length >= 3)) throw new Error(`ld+json gate FAILED: /matchup/${p}/ has no FAQ`);
  const h2s = [...html.matchAll(/<h2>(.*?)<\/h2>/g)].map(x => x[1]);
  if (new Set(h2s).size !== h2s.length) throw new Error(`heading gate FAILED: duplicate H2 on /matchup/${p}/ — ${h2s.join(' | ')}`);
  console.log(`ld+json ok: /matchup/${p}/ · ${faq ? faq.mainEntity.length + ' FAQ entries' : ld['@type']} · ${h2s.length} H2s · ${(html.length / 1024).toFixed(1)} KB`);
}

console.log('pages written:', pages, '| sitemap urls:', sitemap.length + 1);

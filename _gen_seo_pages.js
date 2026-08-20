// _gen_seo_pages.js — generate static, crawlable SEO pages for every bespoke matchup.
// One page per DIRECTED matchup per lane: /matchup/<lane>/<you>-vs-<enemy>/index.html
// plus lane hubs, champ hubs, /matchup/ index, and a full sitemap.xml.
// Content is pulled straight from the bespoke champ-data/content files, so every
// page carries genuinely unique researched text (not doorway boilerplate).
const fs = require('fs');
const path = require('path');

const ORIGIN = 'https://matchupcoach.gg';
const TODAY = new Date().toISOString().slice(0, 10); // build date — never freeze this
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
const DATA_MODIFIED = '2026-08-20';
const WR_SAMPLED = 'July 2026';
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

// pair -> lanes map for cross-lane "also played in" links
const pairLanes = {};
for (const L of LANES) {
  const D = DATA[L.key];
  for (const a of Object.keys(D.champs)) for (const b of Object.keys(D.champs[a].entries)) {
    const dispB = D.dispBy[b] || D.dispBy[Object.keys(D.dispBy).find(k => k.startsWith(b))] || b;
    (pairLanes[a + '|' + b] = pairLanes[a + '|' + b] || []).push(L.key);
  }
}

// ---------- page skeleton ----------
const CSS = `*{box-sizing:border-box}body{margin:0;background:#0d0f16;color:#e7eaf2;font-family:'Manrope',system-ui,'Segoe UI',sans-serif;line-height:1.6}
a{color:#3ddc97;text-decoration:none}a:hover{text-decoration:underline}
.wrap{max-width:880px;margin:0 auto;padding:28px 18px 60px}
header.site{display:flex;align-items:center;gap:10px;margin-bottom:26px;flex-wrap:wrap}
.logo{font-family:'Chakra Petch',sans-serif;font-weight:800;font-size:19px;color:#f4efe8}.logo b{color:#e8b84b}
.crumbs{font-size:12.5px;color:#8a90a2;margin-bottom:14px}.crumbs a{color:#8a90a2}
h1{font-family:'Chakra Petch',sans-serif;font-size:30px;margin:0 0 6px;color:#fff}
h2{font-family:'Chakra Petch',sans-serif;font-size:20px;margin:34px 0 10px;color:#f0cd72}
.sub{color:#8a90a2;font-size:14.5px;margin-bottom:18px}
.verdict{border-radius:14px;padding:16px 18px;background:#11131c;border:1px solid rgba(255,255,255,0.08);border-left:4px solid #3ddc97;font-size:15.5px;margin:18px 0}
table{width:100%;border-collapse:collapse;font-size:14px;margin:12px 0}
th,td{padding:9px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.07)}
th{font-family:'Chakra Petch',sans-serif;font-size:11px;letter-spacing:0.6px;color:#8a90a2}
.own-a{color:#3ddc97;font-weight:700}.own-b{color:#ff5d6c;font-weight:700}.own-s{color:#e8b84b;font-weight:700}
ul{padding-left:22px}li{margin:7px 0}
.cta{display:inline-block;margin:20px 0;padding:13px 22px;border-radius:12px;background:linear-gradient(180deg,#f0cd72,#e8b84b);color:#1c1206;font-weight:800;font-family:'Chakra Petch',sans-serif}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:14px}@media(max-width:640px){.cols{grid-template-columns:1fr}}
.card{border-radius:14px;background:#11131c;border:1px solid rgba(255,255,255,0.08);padding:15px 17px}
.card h3{margin:0 0 8px;font-family:'Chakra Petch',sans-serif;font-size:14px;color:#dfe2ec}
h3.qa-q{font-family:'Chakra Petch',sans-serif;font-size:15px;margin:18px 0 6px;color:#dfe2ec}
footer{margin-top:44px;font-size:12.5px;color:#8a90a2;border-top:1px solid rgba(255,255,255,0.07);padding-top:16px}
.linkgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px;font-size:14px}
.gate{margin:26px 0;padding:22px 24px;border-radius:16px;border:1px solid rgba(240,205,114,0.4);background:linear-gradient(180deg,rgba(240,205,114,0.07),#11131c);text-align:center}
.gate-h{font-family:'Chakra Petch',sans-serif;font-weight:800;font-size:20px;color:#f6f1ea}
.gate-p{color:#c7c2b4;font-size:14px;line-height:1.6;margin:8px auto 4px;max-width:620px}
.gate-note{color:#8a90a2;font-size:12px;line-height:1.6;margin-top:6px}`;

function shell(title, desc, canonical, jsonld, body) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
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
<footer>MatchupCoach.gg — Challenger-level matchup coaching for every champion, every lane. <a href="/matchup/">All matchup guides</a> · <a href="/">Open the interactive coach</a><br>Matchup data current for patch ${LIVE_PATCH} · win rates sampled ${WR_SAMPLED} from lolalytics (Emerald+). MatchupCoach.gg isn't endorsed by Riot Games.<br><a href="/terms">Terms</a> · <a href="/privacy">Privacy</a> · <a href="/refund">Refunds</a> · <a href="/cancel">How to cancel</a> · <a href="/contact">Contact</a></footer>
</div>
</body>
</html>`;
}

function ownCls(owner, dispA, dispB) { return owner === dispA ? 'own-a' : owner === dispB ? 'own-b' : 'own-s'; }

// ---------- matchup pages ----------
let pages = 0;
const sitemap = [];
function outWrite(rel, html) {
  const full = path.join('matchup', rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
  pages++;
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

      // ---- POOLED win rate: both directions of a matchup are separate data
      // pulls (A's sample and B's sample of the same lane). Publishing each
      // side's raw number made mirrored pages contradict (both >50%). Pooling
      // the two samples gives ONE shared number — A's page and B's page are
      // complementary by construction and cite the same combined game count.
      const wrRaw = C.wr[bFile]; const wrA = typeof wrRaw === 'number' ? wrRaw : (wrRaw && wrRaw.wr);
      const gA = Number(C.games[bFile]) || 0;
      const C2 = D.champs[b];
      const wrRevRaw = C2 && C2.wr[C.fileSlug]; const wrRev = typeof wrRevRaw === 'number' ? wrRevRaw : (wrRevRaw && wrRevRaw.wr);
      const gB = (C2 && Number(C2.games[C.fileSlug])) || 0;
      let wr = null, games = 0;
      if (typeof wrA === 'number' && typeof wrRev === 'number') {
        const wA = gA > 0 && gB > 0 ? gA : 1, wB = gA > 0 && gB > 0 ? gB : 1;
        wr = Math.round(((wrA * wA + (100 - wrRev) * wB) / (wA + wB)) * 100) / 100;
        games = gA + gB;
      } else if (typeof wrA === 'number') { wr = wrA; games = gA; }
      else if (typeof wrRev === 'number') { wr = Math.round((100 - wrRev) * 100) / 100; games = gB; }
      const gamesTxt = games ? Number(games).toLocaleString('en-US') : '';
      const win = Array.isArray(e.win) && e.win.length === 7 ? e.win : null;
      const nA = win ? win.filter(x => x === aName).length : 0;
      const nB = win ? win.filter(x => x === bName).length : 0;
      const evens = win ? 7 - nA - nB : 0;

      // ---- ONE classification drives verdict, skill-matchup answer and
      // counter answer, so no page can contradict itself.
      const wrKnown = typeof wr === 'number';
      const edge = wrKnown ? wr - 50 : 0;
      const cls = !wrKnown ? 'unknown'
        : edge >= 2 ? 'counterA' : edge >= 0.75 ? 'edgeA'
        : edge <= -2 ? 'counterB' : edge <= -0.75 ? 'edgeB' : 'even';
      const wrLine = wrKnown ? `${aName} wins ${wr}% of games vs ${bName} in ${L.prose}${gamesTxt ? ` (${gamesTxt} Emerald+ games analysed across both sides)` : ''}.` : '';

      // Verdict box — leads with the pooled number; the 7 windows are texture
      // from A's game plan, never a competing claim about who's favoured.
      let verdict;
      const planNote = win
        ? (nA >= nB
          ? `${aName}'s game plan below claims ${nA} of the 7 stage windows`
          : `${bName} pressures ${nB} of the 7 stage windows in the plan below`)
        : '';
      if (cls === 'counterA' || cls === 'edgeA') {
        verdict = `${aName} is favoured — ${wr}% win rate${gamesTxt ? ` over ${gamesTxt} games` : ''}${planNote ? `, and ${planNote}` : ''}.`;
        if (win && nA < nB) verdict = `The numbers favour ${aName} (${wr}% win rate), even though ${bName} pressures ${nB} of the 7 stage windows — convert your windows below and the stats swing your way.`;
      } else if (cls === 'counterB' || cls === 'edgeB') {
        verdict = `${bName} is favoured — ${aName} wins only ${wr}% of games${planNote && nB >= nA ? `, and ${planNote}` : ''}. Play it patient and win your windows.`;
        if (win && nA > nB) verdict = `An uphill lane you can win — the numbers lean ${bName} (${aName} wins ${wr}%), but ${aName}'s plan below claims ${nA} of the 7 windows: convert them and the stats catch up to you.`;
      } else if (cls === 'even') {
        verdict = (win && Math.abs(nA - nB) >= 2)
          ? `Statistically even (${wr}% win rate) — but the tempo isn't: ${planNote}. Whoever converts their windows wins.`
          : `A genuine skill matchup — ${wr}% win rate, decided window to window rather than at champion select.`;
      } else {
        verdict = win
          ? (Math.abs(nA - nB) >= 2
            ? `${nA > nB ? aName : bName} has the tempo edge — ${nA > nB ? `${aName}'s plan claims ${nA}` : `${bName} pressures ${nB}`} of the 7 stage windows.`
            : (evens >= 4
              ? `Mostly even — ${evens} of the 7 windows are a coin flip; the decisive ${Math.max(nA, nB) === 1 ? 'window' : 'windows'} belong to ${nA >= nB ? aName : bName}.`
              : `A genuine skill matchup — the favour swings window to window.`))
          : 'Stage-by-stage skill matchup.';
      }

      let title = `${aName} vs ${bName} ${L.short} Matchup: Who Wins & How to Play | MatchupCoach.gg`;
      if (title.length > 70) title = `${aName} vs ${bName} ${L.short} Matchup: Who Wins? | MatchupCoach.gg`;
      if (title.length > 70) title = `${aName} vs ${bName} ${L.short} Matchup | MatchupCoach.gg`;
      const desc = `Who wins ${aName} vs ${bName} in ${L.prose}? ${wrKnown ? `${aName} wins ${wr}% of games${gamesTxt ? ` across ${gamesTxt} Emerald+ games` : ''}. ` : ''}How to beat ${bName} as ${aName}: stage-by-stage favour, power spikes and the full lane plan.`;

      // Who-wins / skill-matchup / counter answers all derive from `cls`, so
      // they can never disagree with each other or with the verdict box.
      const whoShort = cls === 'counterA' ? `${aName} — a ${wr}% win rate vs ${bName} in ${L.prose}${gamesTxt ? ` across ${gamesTxt} Emerald+ games` : ''} is a real advantage.`
        : cls === 'edgeA' ? `${aName}, slightly — a ${wr}% win rate edge${gamesTxt ? ` across ${gamesTxt} Emerald+ games` : ''}; execution can flip it.`
        : cls === 'even' ? `Nobody on paper — ${wr}% win rate makes this a coin flip decided by play, not champion select.`
        : cls === 'edgeB' ? `${bName}, slightly — ${aName} wins ${wr}% of games${gamesTxt ? ` across ${gamesTxt} Emerald+ games` : ''}; winnable with the right plan.`
        : cls === 'counterB' ? `${bName} — ${aName} wins only ${wr}% of games${gamesTxt ? ` across ${gamesTxt} Emerald+ games` : ''}, so ${aName} plays this as the disadvantaged side.`
        : verdict;
      const skillAns = cls === 'even'
        ? `Yes — ${aName} vs ${bName} is a genuine skill matchup: ${wr}% win rate, and the favour swings window to window rather than being set at champion select.`
        : (cls === 'edgeA' || cls === 'edgeB')
        ? `Mostly — ${cls === 'edgeA' ? aName : bName} has a small statistical edge (${cls === 'edgeA' ? wr : (Math.round((100 - wr) * 100) / 100)}% win rate), but execution decides this lane far more than the pick does.`
        : (cls === 'counterA' || cls === 'counterB')
        ? `Not really — ${cls === 'counterA' ? aName : bName} holds a real statistical advantage (${cls === 'counterA' ? wr : (Math.round((100 - wr) * 100) / 100)}% win rate), so ${cls === 'counterA' ? bName : aName} is the one working uphill.`
        : (win
          ? (nA === nB
            ? `Yes — ${aName} vs ${bName} plays as a skill matchup: the favour swings window to window.`
            : `Not exactly — ${nA > nB ? `${aName}'s game plan claims ${nA}` : `${bName} pressures ${nB}`} of the 7 stage windows, so one side sets the lane's tempo.`)
          : '');
      const counterAns = cls === 'counterA' ? `Statistically yes — ${aName} counters ${bName} in ${L.prose}, winning ${wr}% of games${gamesTxt ? ` over ${gamesTxt} Emerald+ games` : ''}.`
        : cls === 'edgeA' ? `Not a hard counter — ${aName} has a slight edge (${wr}% win rate), and play quality decides the rest.`
        : cls === 'even' ? `No hard counter either way — the ${aName} vs ${bName} win rate is ${wr}%, an even lane decided by execution.`
        : cls === 'edgeB' ? `No — if anything ${bName} has the slight edge (${aName} wins ${wr}%), though it stays close.`
        : cls === 'counterB' ? `No — ${bName} counters ${aName} (${aName} wins only ${wr}% of games). Play it as the disadvantaged side and lean on the windows in the plan.`
        : '';

      // FAQ JSON-LD from the bespoke data
      const faq = [];
      faq.push({ '@type': 'Question', name: `Who wins ${aName} vs ${bName} in ${L.prose}?`, acceptedAnswer: { '@type': 'Answer', text: whoShort } });
      if (skillAns) faq.push({ '@type': 'Question', name: `Is ${aName} vs ${bName} a skill matchup?`, acceptedAnswer: { '@type': 'Answer', text: skillAns } });
      if (counterAns) faq.push({ '@type': 'Question', name: `Does ${aName} counter ${bName}?`, acceptedAnswer: { '@type': 'Answer', text: counterAns } });
      if (e.early) faq.push({ '@type': 'Question', name: `How should ${aName} play the early game vs ${bName}?`, acceptedAnswer: { '@type': 'Answer', text: e.early } });
      // NOTE: mid/late are members-only on this page, so they are deliberately
      // NOT in the FAQ schema — structured data must match visible content.
      const jsonld = {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'Article', headline: `${aName} vs ${bName} — ${L.label} Matchup Guide`, description: desc, image: ORIGIN + '/og-image.png', datePublished: PUBLISHED, dateModified: DATA_MODIFIED, author: { '@type': 'Organization', name: 'MatchupCoach.gg' }, publisher: { '@type': 'Organization', name: 'MatchupCoach.gg', url: ORIGIN }, mainEntityOfPage: canonical },
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
      if (win) {
        tl = `<h2>Favour timeline — the windows in ${esc(aName)}'s game plan</h2>
<p class="sub">Read from ${esc(aName)}'s seat: which stage windows this plan plays for against ${esc(bName)}.</p>
<table><tr><th>Stage</th><th>Favoured</th><th>Why</th></tr>` +
          win.map((o, i) => `<tr><td>${STAGES[i]}</td><td class="${ownCls(o, aName, bName)}">${esc(o === 'Skill' ? 'Even / skill' : o)}</td><td>${esc((e.whys && e.whys[i]) || '')}</td></tr>`).join('') +
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
      const qa = [[`Who wins ${aName} vs ${bName} in ${L.prose}?`, whoShort]];
      if (skillAns) qa.push([`Is ${aName} vs ${bName} a skill matchup?`, skillAns]);
      if (counterAns) qa.push([`Does ${aName} counter ${bName}?`, counterAns]);
      const qaHtml = `<h2>Common questions</h2>` + qa.map(([q, ans]) => `<h3 class="qa-q">${esc(q)}</h3><p>${esc(ans)}</p>`).join('');

      // Internal-link cluster: this champion's most-played other matchups in
      // the same lane (by analysed-games volume when known).
      const moreOpps = Object.keys(C.entries).filter(f => f !== bFile)
        .sort((x, y) => (Number(C.games[y]) || 0) - (Number(C.games[x]) || 0)).slice(0, 6)
        .map(f => { const n = dispOf(D, f); return `<a href="/matchup/${L.key}/${uA}-vs-${urlslug(n)}/">vs ${esc(n)}</a>`; }).join(' · ');

      // PREVIEW + CONVERT. MatchupCoach is a paid product, so the public page
      // shows what earns the ranking and proves the depth — the verdict, the
      // stage-by-stage favour table, and the full early-game plan — then hands
      // the rest (mid/late execution, spikes, win conditions) to the membership.
      const body = `
<nav class="crumbs"><a href="/matchup/">Matchups</a> › <a href="/matchup/${L.key}/">${L.label}</a> › ${esc(aName)} vs ${esc(bName)}</nav>
<h1>${esc(aName)} vs ${esc(bName)} — ${L.label} Matchup Guide</h1>
<p class="sub">How to win lane as ${esc(aName)} against ${esc(bName)}${wrKnown ? ` · ${wr}% win rate${gamesTxt ? ` over ${gamesTxt} Emerald+ games` : ''}` : ''} · Patch ${LIVE_PATCH} · win rates sampled ${WR_SAMPLED}</p>
<div class="verdict"><b>Verdict:</b> ${esc(verdict)}</div>
${tl}
<h2>How should ${esc(aName)} play the early game vs ${esc(bName)}?</h2><p>${esc(e.early || '')}</p>
<div class="gate">
  <div class="gate-h">Read the rest of this matchup</div>
  <p class="gate-p">The full ${esc(aName)} vs ${esc(bName)} report continues with the <b>mid-game plan</b>, the <b>late-game and teamfight plan</b>, every <b>power spike</b> to play around, and the <b>win conditions</b> for both sides — plus cooldown tracking and the live enemy-jungle tracker inside the app.</p>
  <a class="cta" href="/matchup/${L.key}/${uA}-vs-${uB}/open">Read the full guide — plans from $1.99/month →</a>
  <p class="gate-note">🔒 Secure checkout · 💰 7-day money-back guarantee on your first payment · ✋ Cancel anytime<br>Lane Pass $1.99/mo · All Lanes $3.99/mo · Annual $24.99/yr.</p>
</div>
${qaHtml}
<h2>Related guides</h2>
<p><a href="/matchup/${L.key}/${uB}-vs-${uA}/">Playing the other side? ${esc(bName)} vs ${esc(aName)} guide →</a><br>
<a href="/matchup/${L.key}/${uA}/">All ${esc(aName)} ${L.prose} matchups →</a></p>
${moreOpps ? `<p class="sub">More ${esc(aName)} ${L.prose} matchups: ${moreOpps}</p>` : ''}
${crossLane}`;

      outWrite(rel, shell(title, desc, canonical, jsonld, body));
      sitemap.push(canonical);
    }
  }
}

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
const JG_DB = JGW.JG_DB || {};
const jgNames = Object.keys(JG_DB);
// Mirrors the app's own advantage classifier so the guide agrees with the app.
function jgTone(adv, youName, foeName) {
  const a = (adv || '').toLowerCase();
  const you = String(youName).toLowerCase(), foe = String(foeName || '').toLowerCase();
  // Check the OPPONENT first: a label like "Bel'Veth Favored" names them, not
  // you, and must read as pressure — otherwise the generic /favou?red/ test
  // below claims their window as yours.
  if (foe && a.indexOf(foe) >= 0) return 'b';
  if (a.indexOf(you) >= 0) return 'a';
  if (/dominant|domination|favou?red|peak|spike|apex|predator|stabilized|playmaker|absolute/.test(a)) return 'a';
  if (/defensive|posture|caution|risk|danger|avoid|surviv|weak|vulnerab|passive|concede|respect/.test(a)) return 'b';
  return 's';
}
let jgPages = 0;
for (const you of jgNames) {
  const opps = Object.keys(JG_DB[you] || {});
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
    // Phrased from this page's race plan — the mirror page has its own plan.
    const verdict = diff === 'FAVOURED'
      ? `${you}'s race plan controls ${greens} of the 7 windows — ${you} holds the tempo advantage in this jungle matchup.`
      : diff === 'HARD'
      ? `${foe} pressures ${reds} of the 7 windows in this race — survive the early game and scale into your windows.`
      : `A window-to-window jungle race — ${greens ? `${greens} window${greens > 1 ? 's' : ''} for ${you}` : `no window clearly ${you}'s`}, ${reds ? `${reds} for ${foe}` : `none clearly ${foe}'s`}, the rest even.`;
    let title = `${you} vs ${foe} Jungle Matchup: Who Wins & How to Play | MatchupCoach.gg`;
    if (title.length > 70) title = `${you} vs ${foe} Jungle Matchup: Who Wins? | MatchupCoach.gg`;
    if (title.length > 70) title = `${you} vs ${foe} Jungle Matchup | MatchupCoach.gg`;
    const desc = `Who wins ${you} vs ${foe} in the jungle? ${diff === 'FAVOURED' ? `${you}'s race plan controls ${greens} of 7 windows. ` : diff === 'HARD' ? `${foe} pressures ${reds} of 7 windows. ` : 'A window-to-window skill matchup. '}How to beat ${foe} as ${you}: first clear, pathing, the level-by-level race, invade windows and objective control.`;
    const rows = rep.stages.map((s, i) => `<tr><td>${esc(s.stage)}</td><td class="own-${tones[i]}">${esc(String(s.adv).replace(/Favored/g, 'Favoured'))}</td><td>${esc(s.why || '')}</td></tr>`).join('');
    const jgSkill = diff === 'SKILL'
      ? `Yes — ${you} vs ${foe} plays as a skill matchup: the jungle race swings window to window, and the better first clear usually sets the tone.`
      : `Not exactly — ${diff === 'FAVOURED' ? `${you}'s race plan controls ${greens} of the 7 windows` : `${foe} pressures ${reds} of the 7 windows`}, so ${diff === 'FAVOURED' ? foe : you} is playing catch-up and has to lean on the map.`;
    const faq = [{ '@type': 'Question', name: `Who wins ${you} vs ${foe} in the jungle?`, acceptedAnswer: { '@type': 'Answer', text: verdict } }];
    faq.push({ '@type': 'Question', name: `Is ${you} vs ${foe} a skill matchup?`, acceptedAnswer: { '@type': 'Answer', text: jgSkill } });
    if (rep.start) faq.push({ '@type': 'Question', name: `How should ${you} clear and path against ${foe}?`, acceptedAnswer: { '@type': 'Answer', text: rep.start } });
    const jgQa = `<h2>Common questions</h2><h3 class="qa-q">Who wins ${esc(you)} vs ${esc(foe)}?</h3><p>${esc(verdict)}</p><h3 class="qa-q">Is ${esc(you)} vs ${esc(foe)} a skill matchup?</h3><p>${esc(jgSkill)}</p>`;
    const jgMore = opps.filter(f => f !== foe && f !== you).sort().slice(0, 6)
      .map(f => `<a href="/matchup/jungle/${uA}-vs-${urlslug(f)}/">vs ${esc(f)}</a>`).join(' · ');
    const jsonld = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'Article', headline: `${you} vs ${foe} — Jungle Matchup Guide`, description: desc, image: ORIGIN + '/og-image.png', datePublished: PUBLISHED, dateModified: DATA_MODIFIED, author: { '@type': 'Organization', name: 'MatchupCoach.gg' }, publisher: { '@type': 'Organization', name: 'MatchupCoach.gg', url: ORIGIN }, mainEntityOfPage: canonical },
      { '@type': 'FAQPage', mainEntity: faq },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Matchups', item: ORIGIN + '/matchup/' },
        { '@type': 'ListItem', position: 2, name: 'Jungle', item: `${ORIGIN}/matchup/jungle/` },
        { '@type': 'ListItem', position: 3, name: `${you} vs ${foe}`, item: canonical } ] }
    ] };
    const body = `
<nav class="crumbs"><a href="/matchup/">Matchups</a> › <a href="/matchup/jungle/">Jungle</a> › ${esc(you)} vs ${esc(foe)}</nav>
<h1>${esc(you)} vs ${esc(foe)} — Jungle Matchup Guide</h1>
<p class="sub">How to win the jungle race as ${esc(you)} against ${esc(foe)} · Patch ${LIVE_PATCH}</p>
<div class="verdict"><b>Verdict:</b> ${esc(verdict)}</div>
<h2>The jungle race — the windows in ${esc(you)}'s plan</h2>
<p class="sub">Read from ${esc(you)}'s seat: the race windows this plan plays for against ${esc(foe)}.</p>
<table><tr><th>Stage</th><th>Read</th><th>Why</th></tr>${rows}</table>
${rep.start ? `<h2>How should ${esc(you)} clear and path against ${esc(foe)}?</h2><p>${esc(rep.start)}</p>` : ''}
<div class="gate">
  <div class="gate-h">Read the rest of this matchup</div>
  <p class="gate-p">The full ${esc(you)} vs ${esc(foe)} report continues with <b>scuttle &amp; dragon rules</b>, <b>invade windows and safety boundaries</b>, the <b>top-side objective fight</b>, <b>macro rotations</b> and the <b>win condition</b> — plus the live enemy-jungle tracker that shows their start, clear and gank timers in game.</p>
  <a class="cta" href="/matchup/jungle/${uA}-vs-${uB}/open">Read the full guide — plans from $1.99/month →</a>
  <p class="gate-note">🔒 Secure checkout · 💰 7-day money-back guarantee on your first payment · ✋ Cancel anytime<br>Lane Pass $1.99/mo · All Lanes $3.99/mo · Annual $24.99/yr.</p>
</div>
${jgQa}
<h2>Related guides</h2>
<p><a href="/matchup/jungle/${uB}-vs-${uA}/">Playing the other side? ${esc(foe)} vs ${esc(you)} guide →</a><br>
<a href="/matchup/jungle/${uA}/">All ${esc(you)} jungle matchups →</a></p>
${jgMore ? `<p class="sub">More ${esc(you)} jungle matchups: ${jgMore}</p>` : ''}`;
    outWrite(`jungle/${uA}-vs-${uB}/index.html`, shell(title, desc, canonical, jsonld, body));
    sitemap.push(canonical);
    jgPages++;
  }
  // jungle champion hub
  const uA = urlslug(you);
  const canonical = `${ORIGIN}/matchup/jungle/${uA}/`;
  const links = opps.filter(f => f !== you).sort().map(f => `<a href="/matchup/jungle/${uA}-vs-${urlslug(f)}/">${esc(you)} vs ${esc(f)}</a>`).join('');
  const title = `${you} Jungle Matchups — All ${opps.length} Guides | MatchupCoach.gg`;
  const desc = `Every ${you} jungle matchup guide: the level-by-level race, first clear, pathing, invade windows and objective control vs all ${opps.length} junglers.`;
  outWrite(`jungle/${uA}/index.html`, shell(title, desc, canonical, { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description: desc, url: canonical }, `
<nav class="crumbs"><a href="/matchup/">Matchups</a> › <a href="/matchup/jungle/">Jungle</a> › ${esc(you)}</nav>
<h1>${esc(you)} — Jungle Matchup Guides</h1>
<p class="sub">${opps.length} researched jungle-vs-jungle guides for ${esc(you)}.</p>
<div class="linkgrid">${links}</div>`));
  sitemap.push(canonical);
}
// jungle lane hub
{
  const canonical = `${ORIGIN}/matchup/jungle/`;
  const title = 'Jungle Matchup Guides — Every Jungler | MatchupCoach.gg';
  const desc = `Jungler-vs-jungler matchup guides for all ${jgNames.length} junglers — the level-by-level race, first clears, pathing, invade windows and objective control.`;
  const links = jgNames.slice().sort().map(n => `<a href="/matchup/jungle/${urlslug(n)}/">${esc(n)}</a>`).join('');
  outWrite('jungle/index.html', shell(title, desc, canonical, { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description: desc, url: canonical }, `
<nav class="crumbs"><a href="/matchup/">Matchups</a> › Jungle</nav>
<h1>Jungle Matchup Guides</h1>
<p class="sub">Your lane is the whole map — and your opponent is their jungler. Pick your jungler.</p>
<div class="linkgrid">${links}</div>`));
  sitemap.push(canonical);
}
console.log('jungle guide pages:', jgPages, '(+ ' + jgNames.length + ' champion hubs)');

// ---------- champ hubs ----------
for (const L of LANES) {
  const D = DATA[L.key];
  for (const aName of D.names) {
    const a = slug(aName), C = D.champs[a];
    if (!C) continue;
    const uA = urlslug(aName);
    const canonical = `${ORIGIN}/matchup/${L.key}/${uA}/`;
    const opps = Object.keys(C.entries).map(bF => dispOf(D, bF)).sort();
    const links = opps.map(bN => `<a href="/matchup/${L.key}/${uA}-vs-${urlslug(bN)}/">${esc(aName)} vs ${esc(bN)}</a>`).join('');
    const title = `${aName} ${L.short} Matchups — All ${opps.length} Lane Guides | MatchupCoach.gg`;
    const desc = `Every ${aName} ${L.label.toLowerCase()} matchup guide: who wins, favour timeline, power spikes and game plans vs all ${opps.length} opponents.`;
    const jsonld = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description: desc, url: canonical };
    const body = `
<nav class="crumbs"><a href="/matchup/">Matchups</a> › <a href="/matchup/${L.key}/">${L.label}</a> › ${esc(aName)}</nav>
<h1>${esc(aName)} — ${L.label} Matchup Guides</h1>
<p class="sub">${opps.length} researched matchup guides for ${esc(aName)} in ${L.label.toLowerCase()}.</p>
<div class="linkgrid">${links}</div>`;
    outWrite(`${L.key}/${uA}/index.html`, shell(title, desc, canonical, jsonld, body));
    sitemap.push(canonical);
  }
}

// ---------- lane hubs + root ----------
for (const L of LANES) {
  const D = DATA[L.key];
  const canonical = `${ORIGIN}/matchup/${L.key}/`;
  const links = D.names.slice().sort().map(n => `<a href="/matchup/${L.key}/${urlslug(n)}/">${esc(n)}</a>`).join('');
  const title = `${L.label} Matchup Guides — Every Champion | MatchupCoach.gg`;
  const desc = `League of Legends ${L.label.toLowerCase()} matchup guides for all ${D.names.length} champions — who wins each lane, power spikes and stage-by-stage game plans.`;
  const body = `
<nav class="crumbs"><a href="/matchup/">Matchups</a> › ${L.label}</nav>
<h1>${L.label} Matchup Guides</h1>
<p class="sub">Pick your champion — every matchup covered.</p>
<div class="linkgrid">${links}</div>`;
  outWrite(`${L.key}/index.html`, shell(title, desc, canonical, { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description: desc, url: canonical }, body));
  sitemap.push(canonical);
}
{
  const canonical = `${ORIGIN}/matchup/`;
  const title = 'LoL Matchup Guides — Every Champion, Every Lane | MatchupCoach.gg';
  const desc = 'Researched League of Legends matchup guides for every champion in top, mid, bot and support — who wins, favour timelines, power spikes, and how to play each phase.';
  const counts = LANES.map(L => `<a href="/matchup/${L.key}/">${L.label} — ${DATA[L.key].names.length} champions</a>`)
    .concat(jgNames.length ? [`<a href="/matchup/jungle/">Jungle — ${jgNames.length} junglers</a>`] : [])
    .join('<br>');
  const body = `
<h1>League of Legends Matchup Guides</h1>
<p class="sub">Every champion, every lane — researched stage-by-stage.</p>
<p style="font-size:17px;line-height:2.2">${counts}</p>
<a class="cta" href="/">▶ Open the interactive coach</a>`;
  outWrite('index.html', shell(title, desc, canonical, { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description: desc, url: canonical }, body));
  sitemap.push(canonical);
}

// ---------- sitemap ----------
// The root keeps TODAY/daily because the homepage genuinely changes every day —
// it rotates the free champion per role on a 24h cycle. Every /matchup/ guide
// uses DATA_MODIFIED instead: those pages only change when champ-data changes,
// and stamping them with the build date is a freshness claim we can't back up.
const sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${ORIGIN}/</loc><lastmod>${TODAY}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>
` + sitemap.map(u => `<url><loc>${u}</loc><lastmod>${DATA_MODIFIED}</lastmod><changefreq>monthly</changefreq><priority>${u.endsWith('/matchup/') ? '0.9' : /\/matchup\/[a-z]+\/$/.test(u) ? '0.8' : u.includes('-vs-') ? '0.7' : '0.6'}</priority></url>`).join('\n') + '\n</urlset>\n';
fs.writeFileSync('sitemap.xml', sm);

console.log('pages written:', pages, '| sitemap urls:', sitemap.length + 1);

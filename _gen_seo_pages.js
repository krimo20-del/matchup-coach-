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
  { key: 'top', roster: 'top', dir: 'champ-data/content', suffix: '', label: 'Top Lane', short: 'Top' },
  { key: 'mid', roster: 'mid', dir: 'champ-data/content/mid', suffix: '_mid', label: 'Mid Lane', short: 'Mid' },
  { key: 'bot', roster: 'bot', dir: 'champ-data/content/bot', suffix: '_bot', label: 'Bot Lane (ADC)', short: 'Bot' },
  { key: 'support', roster: 'support', dir: 'champ-data/content/sup', suffix: '_sup', label: 'Support', short: 'Support' },
];
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
<footer>MatchupCoach.gg — Challenger-level matchup coaching for every champion, every lane. <a href="/matchup/">All matchup guides</a> · <a href="/">Open the interactive coach</a><br>Updated ${TODAY} — refreshed every major League patch. MatchupCoach.gg isn't endorsed by Riot Games.<br><a href="/terms">Terms</a> · <a href="/privacy">Privacy</a> · <a href="/refund">Refunds</a> · <a href="/cancel">How to cancel</a> · <a href="/contact">Contact</a></footer>
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

      const wrRaw = C.wr[bFile]; const wr = typeof wrRaw === 'number' ? wrRaw : (wrRaw && wrRaw.wr);
      const games = C.games[bFile];
      const win = Array.isArray(e.win) && e.win.length === 7 ? e.win : null;
      const nA = win ? win.filter(x => x === aName).length : 0;
      const nB = win ? win.filter(x => x === bName).length : 0;

      let verdict;
      const wrKnown = typeof wr === 'number';
      const wrLeansA = wrKnown && wr >= 50.5, wrLeansB = wrKnown && wr <= 49.5;
      if (win) {
        if (nA > nB) {
          verdict = wrLeansB
            ? `Closer than it looks — ${aName} owns ${nA} of the 7 game windows${nB ? ` to ${bName}'s ${nB}` : ''}, but the win rate still favours ${bName}: you have to convert those windows or the game slips away.`
            : `${aName} is favoured — ${aName} owns ${nA} of the 7 game windows${nB ? ` to ${bName}'s ${nB}` : ''}.`;
        } else if (nB > nA) {
          verdict = wrLeansA
            ? `Winnable despite the lane — ${bName} owns ${nB} of the 7 game windows${nA ? ` to ${aName}'s ${nA}` : ''}, yet the win rate favours ${aName}: survive their windows and the game is yours.`
            : `${bName} is favoured — ${bName} owns ${nB} of the 7 game windows${nA ? ` to ${aName}'s ${nA}` : ''}. Play it patient and win your windows.`;
        } else {
          verdict = `A genuine skill matchup — the favour swings window to window (${nA} apiece of the 7 stages).`;
        }
      } else verdict = 'Stage-by-stage skill matchup.';
      const wrLine = (typeof wr === 'number') ? `${aName} wins ${wr}% of games vs ${bName} in ${L.label.toLowerCase()}${games ? ` (${Number(games).toLocaleString('en-US')} Emerald+ games analysed)` : ''}.` : '';

      const title = `${aName} vs ${bName} ${L.short} Matchup Guide | MatchupCoach.gg`;
      const desc = `How to play ${aName} vs ${bName} in ${L.label.toLowerCase()}. ${typeof wr === 'number' ? `${aName} wins ${wr}% of games. ` : ''}Stage-by-stage favour, power spikes, and early, mid and late game plans.`;

      // FAQ JSON-LD from the bespoke data
      const faq = [];
      faq.push({ '@type': 'Question', name: `Who wins ${aName} vs ${bName} in ${L.label.toLowerCase()}?`, acceptedAnswer: { '@type': 'Answer', text: `${verdict} ${wrLine}`.trim() } });
      if (e.early) faq.push({ '@type': 'Question', name: `How should ${aName} play the early game vs ${bName}?`, acceptedAnswer: { '@type': 'Answer', text: e.early } });
      // NOTE: mid/late are members-only on this page, so they are deliberately
      // NOT in the FAQ schema — structured data must match visible content.
      const jsonld = {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'Article', headline: `${aName} vs ${bName} — ${L.label} Matchup Guide`, description: desc, datePublished: TODAY, dateModified: TODAY, author: { '@type': 'Organization', name: 'MatchupCoach.gg' }, publisher: { '@type': 'Organization', name: 'MatchupCoach.gg', url: ORIGIN }, mainEntityOfPage: canonical },
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
        tl = `<h2>Favour timeline — who owns each window</h2>
<table><tr><th>Stage</th><th>Favoured</th><th>Why</th></tr>` +
          win.map((o, i) => `<tr><td>${STAGES[i]}</td><td class="${ownCls(o, aName, bName)}">${esc(o === 'Skill' ? 'Even / skill' : o)}</td><td>${esc((e.whys && e.whys[i]) || '')}</td></tr>`).join('') +
          `</table>`;
      }
      const spikes = (e.spikes || []).map(s => `<li><b>${esc(s.when)}:</b> ${esc(s.text)}</li>`).join('');
      const wantsYou = (e.wants && e.wants.you || []).map(x => `<li>${esc(x)}</li>`).join('');
      const wantsFoe = (e.wants && e.wants.foe || []).map(x => `<li>${esc(x)}</li>`).join('');
      const others = (pairLanes[C.fileSlug + '|' + bFile] || []).filter(k => k !== L.key);
      const crossLane = others.length ? `<p class="sub">Also played in: ` + others.map(k => `<a href="/matchup/${k}/${uA}-vs-${uB}/">${LANES.find(x => x.key === k).label}</a>`).join(' · ') + `</p>` : '';

      // PREVIEW + CONVERT. MatchupCoach is a paid product, so the public page
      // shows what earns the ranking and proves the depth — the verdict, the
      // stage-by-stage favour table, and the full early-game plan — then hands
      // the rest (mid/late execution, spikes, win conditions) to the membership.
      const body = `
<nav class="crumbs"><a href="/matchup/">Matchups</a> › <a href="/matchup/${L.key}/">${L.label}</a> › ${esc(aName)} vs ${esc(bName)}</nav>
<h1>${esc(aName)} vs ${esc(bName)} — ${L.label} Matchup Guide</h1>
<p class="sub">How to win lane as ${esc(aName)} against ${esc(bName)}${typeof wr === 'number' ? ` · ${wr}% win rate${games ? ` over ${Number(games).toLocaleString('en-US')} Emerald+ games` : ''}` : ''} · Updated ${TODAY}</p>
<div class="verdict"><b>Verdict:</b> ${esc(verdict)}${wrLine ? ' ' + esc(wrLine) : ''}</div>
${tl}
<h2>Early game (levels 1–5)</h2><p>${esc(e.early || '')}</p>
<div class="gate">
  <div class="gate-h">Read the rest of this matchup</div>
  <p class="gate-p">The full ${esc(aName)} vs ${esc(bName)} report continues with the <b>mid-game plan</b>, the <b>late-game and teamfight plan</b>, every <b>power spike</b> to play around, and the <b>win conditions</b> for both sides — plus cooldown tracking and the live enemy-jungle tracker inside the app.</p>
  <a class="cta" href="/matchup/${L.key}/${uA}-vs-${uB}/open">Read the full guide — plans from $1.99/month →</a>
  <p class="gate-note">🔒 Secure checkout · 💰 7-day money-back guarantee on your first payment · ✋ Cancel anytime<br>Lane Pass $1.99/mo · All Lanes $3.99/mo · Annual $24.99/yr.</p>
</div>
<h2>Related guides</h2>
<p><a href="/matchup/${L.key}/${uB}-vs-${uA}/">Playing the other side? ${esc(bName)} vs ${esc(aName)} guide →</a><br>
<a href="/matchup/${L.key}/${uA}/">All ${esc(aName)} ${L.label.toLowerCase()} matchups →</a></p>
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
    const diff = reds >= 3 ? 'HARD' : greens >= 5 ? 'FAVOURED' : 'SKILL';
    const verdict = diff === 'FAVOURED'
      ? `${you} is favoured — ${you} controls ${greens} of the 7 windows in the jungle race.`
      : diff === 'HARD'
      ? `${foe} is favoured — ${foe} pressures ${reds} of the 7 windows. Survive the early race and scale.`
      : `A genuine skill matchup — the jungle race swings window to window between ${you} and ${foe}.`;
    const title = `${you} vs ${foe} Jungle Matchup Guide | MatchupCoach.gg`;
    const desc = `How to play ${you} vs ${foe} in the jungle: first clear, pathing, the level-by-level race, invade windows and objective control.`;
    const rows = rep.stages.map((s, i) => `<tr><td>${esc(s.stage)}</td><td class="own-${tones[i]}">${esc(s.adv)}</td><td>${esc(s.why || '')}</td></tr>`).join('');
    const faq = [{ '@type': 'Question', name: `Who wins ${you} vs ${foe} in the jungle?`, acceptedAnswer: { '@type': 'Answer', text: verdict } }];
    if (rep.start) faq.push({ '@type': 'Question', name: `How should ${you} clear and path against ${foe}?`, acceptedAnswer: { '@type': 'Answer', text: rep.start } });
    const jsonld = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'Article', headline: `${you} vs ${foe} — Jungle Matchup Guide`, description: desc, datePublished: TODAY, dateModified: TODAY, author: { '@type': 'Organization', name: 'MatchupCoach.gg' }, publisher: { '@type': 'Organization', name: 'MatchupCoach.gg', url: ORIGIN }, mainEntityOfPage: canonical },
      { '@type': 'FAQPage', mainEntity: faq },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Matchups', item: ORIGIN + '/matchup/' },
        { '@type': 'ListItem', position: 2, name: 'Jungle', item: `${ORIGIN}/matchup/jungle/` },
        { '@type': 'ListItem', position: 3, name: `${you} vs ${foe}`, item: canonical } ] }
    ] };
    const body = `
<nav class="crumbs"><a href="/matchup/">Matchups</a> › <a href="/matchup/jungle/">Jungle</a> › ${esc(you)} vs ${esc(foe)}</nav>
<h1>${esc(you)} vs ${esc(foe)} — Jungle Matchup Guide</h1>
<p class="sub">How to win the jungle race as ${esc(you)} against ${esc(foe)} · Updated ${TODAY}</p>
<div class="verdict"><b>Verdict:</b> ${esc(verdict)}</div>
<h2>The jungle race — who owns each window</h2>
<table><tr><th>Stage</th><th>Read</th><th>Why</th></tr>${rows}</table>
${rep.start ? `<h2>First clear &amp; their start</h2><p>${esc(rep.start)}</p>` : ''}
<div class="gate">
  <div class="gate-h">Read the rest of this matchup</div>
  <p class="gate-p">The full ${esc(you)} vs ${esc(foe)} report continues with <b>scuttle &amp; dragon rules</b>, <b>invade windows and safety boundaries</b>, the <b>top-side objective fight</b>, <b>macro rotations</b> and the <b>win condition</b> — plus the live enemy-jungle tracker that shows their start, clear and gank timers in game.</p>
  <a class="cta" href="/matchup/jungle/${uA}-vs-${uB}/open">Read the full guide — plans from $1.99/month →</a>
  <p class="gate-note">🔒 Secure checkout · 💰 7-day money-back guarantee on your first payment · ✋ Cancel anytime<br>Lane Pass $1.99/mo · All Lanes $3.99/mo · Annual $24.99/yr.</p>
</div>
<h2>Related guides</h2>
<p><a href="/matchup/jungle/${uB}-vs-${uA}/">Playing the other side? ${esc(foe)} vs ${esc(you)} guide →</a><br>
<a href="/matchup/jungle/${uA}/">All ${esc(you)} jungle matchups →</a></p>`;
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
const sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${ORIGIN}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
` + sitemap.map(u => `<url><loc>${u}</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>${u.endsWith('/matchup/') ? '0.9' : /\/matchup\/[a-z]+\/$/.test(u) ? '0.8' : u.includes('-vs-') ? '0.7' : '0.6'}</priority></url>`).join('\n') + '\n</urlset>\n';
fs.writeFileSync('sitemap.xml', sm);

console.log('pages written:', pages, '| sitemap urls:', sitemap.length + 1);

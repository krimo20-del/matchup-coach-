// MatchupCoach backend — static site + JSON API, zero npm dependencies.
// Node port of .claude/server.ps1 (same endpoints/contract; the frontend
// api-client.js works against either). Run: `node server.js`
//
// Env:
//   PORT          listen port            (default 8123; Render sets this)
//   DATA_DIR      where JSON state lives (default ./server-data; on Render
//                 point at the persistent disk mount, e.g. /data)
//   PAYMENTS_MODE 'demo' (default) records simulated purchases;
//                 'off' rejects paid checkout with a friendly message —
//                 use until real payments (Stripe) are wired.
'use strict';
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = parseInt(process.env.PORT, 10) || 8123;
const ROOT = __dirname;
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, 'server-data');
const PAYMENTS_MODE = process.env.PAYMENTS_MODE || 'demo';
// Real Google Sign-In: set GOOGLE_CLIENT_ID to a Google Cloud OAuth web client
// id whose authorized origins include https://matchupcoach.gg. Unset = the
// frontend hides the Google button entirely (no shared demo account).
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

// Stripe (hosted Checkout). Set STRIPE_SECRET_KEY (sk_live_… or sk_test_…) to
// turn on real payments; the customer enters their card on Stripe's page, not
// ours. Subscriptions need Price IDs from your Stripe dashboard; the founder
// one-time charge is a flat $24.99 Lifetime Member.
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_PRICE_ROLE = process.env.STRIPE_PRICE_ROLE || ''; // Lane Pass $1.99/mo price id
const STRIPE_PRICE_ALL = process.env.STRIPE_PRICE_ALL || '';   // Everything $3.99/mo price id
const STRIPE_PRICE_ALLYR = process.env.STRIPE_PRICE_ALLYR || ''; // Everything Annual $19.99/yr price id
const PUBLIC_URL = (process.env.PUBLIC_URL || 'https://matchupcoach.gg').replace(/\/+$/, '');
const STRIPE_ON = !!STRIPE_SECRET_KEY;
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ---------- persistence ----------
function loadJson(name, fallback) {
  try { return JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), 'utf8')); } catch (e) { return fallback; }
}
function saveJson(name, obj) {
  const f = path.join(DATA_DIR, name);
  const tmp = f + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(obj, null, 2));
  fs.renameSync(tmp, f); // atomic-ish: never leaves a half-written file
}
const users = loadJson('users.json', {});
const sessions = loadJson('sessions.json', {});
const founders = loadJson('founders.json', { claimed: 0 });
const fulfilled = loadJson('fulfilled.json', {}); // stripe session id -> true (idempotent fulfillment)
const commentsDb = loadJson('comments.json', {}); // matchup thread key -> [{id, uk, name, text, ts}]
const liveWr = loadJson('live-wr.json', {}); // '<lane>:<a>:<b>' -> { wr, games, ts }  (wr null = negative cache)

// ---------- live win rate (lolalytics, weekly per matchup) ----------
// Refresh cadence: a matchup's WR is re-fetched at most once every 7 days; a
// failed fetch is negatively cached for 12h so we don't hammer a missing pair.
const WR_TTL_OK = 7 * 864e5;
const WR_TTL_FAIL = 12 * 3600e3;
// our champ slug (stripped display name) -> lolalytics URL slug, only where they differ
const LOLA_SLUG = { nunuwillump: 'nunu', renataglasc: 'renata' };
const LOLA_LANE = { top: 'top', mid: 'middle', bot: 'bottom', support: 'support', jungle: 'jungle' };
// Custom / non-Riot champions that lolalytics doesn't have real matchup data for —
// keep their bundled authored win rates rather than scrape a wrong page.
const NOT_ON_LOLA = { locke: 1, zaahen: 1 };
const wrInflight = new Map(); // key -> Promise (dedupe concurrent fetches)
let wrLastFetch = 0;          // simple outbound spacing

// ---------- crypto ----------
const newToken = () => crypto.randomBytes(32).toString('hex');
const newSalt = () => crypto.randomBytes(16).toString('base64');
const hashPw = (pw, salt) =>
  crypto.pbkdf2Sync(pw, Buffer.from(salt, 'base64'), 100000, 32, 'sha256').toString('base64');
// Constant-time compare so password verification can't be timing-probed.
function safeEq(a, b) {
  const ba = Buffer.from(String(a)), bb = Buffer.from(String(b));
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
}

// ---------- helpers ----------
// Flat Lifetime Member pricing — a one-time $24.99 that never sells out (matches
// the frontend's "Lifetime Member $24.99" tier). `claimed` is still tracked for
// analytics / the member number, but no longer gates price or availability.
function founderState() {
  const c = founders.claimed | 0;
  return { claimed: c, soldOut: false, price: 24.99, priceLabel: '$24.99', bracket: 'lifetime', remaining: null, nextPrice: null };
}
const publicUser = (u) => ({ name: u.name, plan: u.plan || null, google: !!u.google });
function newSession(key) {
  const tok = newToken();
  sessions[tok] = { user: key, exp: Date.now() + 30 * 864e5 };
  saveJson('sessions.json', sessions);
  return tok;
}
function authUser(req) {
  const h = req.headers.authorization || '';
  if (!h.startsWith('Bearer ')) return null;
  const tok = h.slice(7);
  const s = sessions[tok];
  if (!s) return null;
  if (s.exp < Date.now()) { delete sessions[tok]; saveJson('sessions.json', sessions); return null; }
  const u = users[s.user];
  if (u) u.key = s.user;
  return u || null;
}
function sendJson(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(body) });
  res.end(body);
}
function readBody(req) {
  return new Promise((resolve) => {
    let raw = '';
    let over = false;
    req.on('data', (c) => { raw += c; if (raw.length > 10240) { over = true; req.destroy(); } });
    req.on('end', () => { if (over) return resolve({}); try { resolve(JSON.parse(raw || '{}')); } catch (e) { resolve({}); } });
    req.on('error', () => resolve({}));
  });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (r) => {
      let raw = '';
      r.on('data', (c) => { raw += c; if (raw.length > 65536) r.destroy(); });
      r.on('end', () => { try { resolve({ status: r.statusCode, json: JSON.parse(raw) }); } catch (e) { reject(e); } });
    }).on('error', reject);
  });
}

// Fetch text (HTML) with a browser-like UA, timeout, redirect follow, and a hard
// byte cap so we never buffer a whole ad-heavy page — the matchup sentence sits
// near the top of the document. Used by the live win-rate refresh.
function fetchText(url, cap, depth) {
  cap = cap || 500000; depth = depth || 0;
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9'
      }, timeout: 9000
    }, (r) => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location && depth < 3) {
        r.resume();
        const next = r.headers.location.startsWith('http') ? r.headers.location : new URL(r.headers.location, url).toString();
        return fetchText(next, cap, depth + 1).then(resolve, reject);
      }
      if (r.statusCode !== 200) { r.resume(); return reject(new Error('status ' + r.statusCode)); }
      let raw = '';
      r.on('data', (c) => { raw += c; if (raw.length > cap) { raw = raw.slice(0, cap); r.destroy(); } });
      r.on('end', () => resolve(raw));
      r.on('close', () => resolve(raw));
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}

// Parse "<A> wins against <B> NN.NN% of the time" out of a lolalytics vs-page.
// The names sit inside <a> tags, so span up to ~90 chars to the percentage.
function wrParse(html) {
  const m = html.match(/wins against[\s\S]{0,90}?(\d{2}(?:\.\d{1,2})?)%\s+of the time/i);
  if (!m) return null;
  const wr = parseFloat(m[1]);
  return (wr >= 25 && wr <= 75) ? wr : null; // sanity-bound; anything wilder is a parse error
}
// Fetch champion A's win rate vs B in a lane from lolalytics (current patch, Emerald+).
function wrFetch(a, b, lane) {
  const la = LOLA_SLUG[a] || a, lb = LOLA_SLUG[b] || b, ll = LOLA_LANE[lane] || 'top';
  const url = 'https://lolalytics.com/lol/' + la + '/vs/' + lb + '/build/?lane=' + ll + '&tier=emerald_plus';
  return fetchText(url, 400000).then(wrParse);
}

// Flatten a nested object into Stripe's form-encoded a[b][c]=v shape.
function stripeEncode(obj, prefix, out) {
  out = out || [];
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    const key = prefix ? prefix + '[' + k + ']' : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) stripeEncode(v, key, out);
    else out.push(encodeURIComponent(key) + '=' + encodeURIComponent(v));
  }
  return out;
}
// Minimal Stripe REST client (no npm dependency). method: 'POST'|'GET'.
function stripeApi(method, apiPath, params) {
  return new Promise((resolve, reject) => {
    const body = method === 'POST' && params ? stripeEncode(params).join('&') : '';
    const fullPath = method === 'GET' && params ? apiPath + '?' + stripeEncode(params).join('&') : apiPath;
    const req = https.request({
      hostname: 'api.stripe.com', path: fullPath, method: method,
      headers: Object.assign(
        { 'Authorization': 'Bearer ' + STRIPE_SECRET_KEY },
        method === 'POST' ? { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) } : {}
      )
    }, (r) => {
      let raw = '';
      r.on('data', (c) => { raw += c; if (raw.length > 262144) r.destroy(); });
      r.on('end', () => { try { resolve({ status: r.statusCode, json: JSON.parse(raw) }); } catch (e) { reject(e); } });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

// Real client IP behind Render's proxy. X-Forwarded-For is "client, …, edge":
// a malicious client can prepend a fake IP, but it lands on the LEFT, while the
// trusted edge appends the true peer on the RIGHT. So take the Nth-from-right,
// where N = the number of proxy hops we trust (Render is 1 by default). Using
// the leftmost value would let anyone evade the throttle by rotating a fake IP.
const TRUSTED_PROXY_HOPS = parseInt(process.env.TRUSTED_PROXY_HOPS, 10) || 1;
function clientIp(req) {
  const xff = String(req.headers['x-forwarded-for'] || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (xff.length) return xff[Math.max(0, xff.length - TRUSTED_PROXY_HOPS)];
  return String(req.socket.remoteAddress || '').trim();
}

// Tiny per-IP throttle on auth endpoints (public internet hygiene).
const hits = new Map();
function throttled(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 60000);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear(); // memory backstop
  return arr.length > 30;
}

// ---------- static ----------
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.txt': 'text/plain',
  '.xml': 'application/xml; charset=utf-8', '.webmanifest': 'application/manifest+json'
};
// Turn a URL slug ("kha-zix") back into a display champion name ("Kha'Zix").
// Title-cases by default; a small map handles punctuation/multi-word names.
const CHAMP_SLUG_FIX = {
  'kha-zix': "Kha'Zix", 'vel-koz': "Vel'Koz", 'kai-sa': "Kai'Sa", 'cho-gath': "Cho'Gath",
  'rek-sai': "Rek'Sai", 'k-sante': "K'Sante", 'bel-veth': "Bel'Veth", 'kog-maw': "Kog'Maw",
  'dr-mundo': 'Dr. Mundo', 'nunu-willump': 'Nunu & Willump', 'jarvan-iv': 'Jarvan IV',
  'aurelion-sol': 'Aurelion Sol', 'renata-glasc': 'Renata Glasc', 'leblanc': 'LeBlanc'
};
function prettyChamp(slug) {
  // Names with roman numerals or punctuation (e.g. Jarvan IV, Kha'Zix) live in
  // the fix map; everything else just title-cases. NB: do NOT uppercase roman
  // numerals in the fallback — "vi" is the champion Vi, not the number six.
  if (CHAMP_SLUG_FIX[slug]) return CHAMP_SLUG_FIX[slug];
  return slug.split('-').map(function (w) {
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}
function htmlEsc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// True only when `full` is ROOT itself or genuinely inside it — startsWith(ROOT)
// alone would also match a sibling dir sharing ROOT's name prefix (e.g.
// "<root>-backup"), so require the path separator.
function withinRoot(full) { return full === ROOT || full.startsWith(ROOT + path.sep); }

// Backend source, deploy config, VCS, dependencies, and on-disk state are never
// web-served even though they sit in the repo root (no secrets live in them, but
// there's no reason to hand out the server's own source/config).
const DENY = /^(server\.js|package(-lock)?\.json|render\.yaml|deploy\.md|\.git|\.claude|server-data|node_modules)(\/|$)/i;
function sendStatic(res, rel) {
  if (rel === '') rel = 'index.html';
  if (DENY.test(rel) || /(^|\/)\.env/i.test(rel)) {
    const nf = path.join(ROOT, '404.html');
    if (fs.existsSync(nf)) { res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); return res.end(fs.readFileSync(nf)); }
    res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('404');
  }
  let full = path.normalize(path.join(ROOT, rel));
  // Extensionless pretty URLs: /privacy -> privacy.html
  if (withinRoot(full) && !path.extname(full) && fs.existsSync(full + '.html')) full += '.html';
  // SPA fallback: deep links like /matchup/aatrox-vs-darius serve the app
  // (the page uses <base href="/"> so relative assets still resolve).
  let mu = null;
  if (withinRoot(full) && !path.extname(full) && !fs.existsSync(full) && /^matchup\//.test(rel)) {
    full = path.join(ROOT, 'MatchupCoach.dc.html');
    // accept both the SEO path /matchup/leagueoflegends/lol/a-vs-b and the legacy /matchup/a-vs-b
    const mm = /^matchup\/(?:leagueoflegends\/lol\/)?(.+?)-vs-(.+?)\/?$/.exec(rel);
    if (mm) mu = { you: prettyChamp(mm[1]), foe: prettyChamp(mm[2]), aSlug: mm[1], bSlug: mm[2] };
  }
  if (!withinRoot(full) || !fs.existsSync(full) || !fs.statSync(full).isFile()) {
    const notFound = path.join(ROOT, '404.html');
    if (fs.existsSync(notFound)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(fs.readFileSync(notFound));
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('404');
  }
  // For matchup deep-links, inject a per-page <title>/canonical/OG so social
  // scrapers and search engines see a tailored card without running the app's JS.
  if (mu) {
    let html = fs.readFileSync(full, 'utf8');
    // canonical is always the SEO path, so a legacy /matchup/a-vs-b hit declares the new URL
    const url = PUBLIC_URL + '/matchup/leagueoflegends/lol/' + mu.aSlug + '-vs-' + mu.bSlug;
    const pair = mu.you + ' vs ' + mu.foe;
    const ogTitle = htmlEsc(pair + ' — MatchupCoach.gg');
    const desc = htmlEsc('How to play ' + pair + ': power spikes, cooldown timers, wave plan, and build path for the matchup.');
    html = html
      .replace(/<title>[\s\S]*?<\/title>/, '<title>Matchup — ' + htmlEsc(pair) + ' | MatchupCoach.gg</title>')
      .replace(/(<meta name="description" content=")[^"]*(">)/, '$1' + desc + '$2')
      .replace(/(<link rel="canonical" href=")[^"]*(">)/, '$1' + htmlEsc(url) + '$2')
      .replace(/(<meta property="og:title" content=")[^"]*(">)/, '$1' + ogTitle + '$2')
      .replace(/(<meta property="og:description" content=")[^"]*(">)/, '$1' + desc + '$2')
      .replace(/(<meta property="og:url" content=")[^"]*(">)/, '$1' + htmlEsc(url) + '$2')
      .replace(/(<meta name="twitter:title" content=")[^"]*(">)/, '$1' + ogTitle + '$2')
      .replace(/(<meta name="twitter:description" content=")[^"]*(">)/, '$1' + desc + '$2');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }
  const ext = path.extname(full).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(full).pipe(res);
}

// ---------- API ----------
async function handleApi(req, res, pathname, ip) {
  const route = req.method + ' ' + pathname;

  if (route === 'GET /api/health') return sendJson(res, 200, { ok: true, ts: Date.now() });
  if (route === 'GET /api/config') return sendJson(res, 200, { googleClientId: GOOGLE_CLIENT_ID || null, stripeEnabled: STRIPE_ON });
  if (route === 'GET /api/founders') return sendJson(res, 200, founderState());
  if (route === 'GET /api/weekchamp') {
    // Tuesday-anchored UTC week index; the client maps index -> champion pool.
    const anchor = Date.UTC(2026, 5, 9); // Tue Jun 9 2026 — keep in sync with weekChamp() in the app
    const week = Math.floor((Date.now() - anchor) / (7 * 864e5));
    return sendJson(res, 200, { week, anchor: '2026-06-09', rotates: 'Tuesday' });
  }

  if (route === 'POST /api/signup') {
    if (throttled(ip)) return sendJson(res, 429, { error: 'Too many attempts - wait a minute and try again.' });
    const b = await readBody(req);
    const name = String(b.name || '').trim();
    const pass = String(b.pass || '');
    if (name.length < 3) return sendJson(res, 400, { error: 'Username needs at least 3 characters.' });
    if (!/^[A-Za-z0-9 ._-]+$/.test(name)) return sendJson(res, 400, { error: 'Letters, numbers, spaces, dots and dashes only.' });
    if (pass.length < 6) return sendJson(res, 400, { error: 'Password needs at least 6 characters.' });
    const key = name.toLowerCase();
    if (users[key]) return sendJson(res, 409, { error: 'That username is taken - sign in instead.' });
    const salt = newSalt();
    users[key] = { name, salt, hash: hashPw(pass, salt), plan: null, google: false, created: Date.now() };
    saveJson('users.json', users);
    return sendJson(res, 200, { token: newSession(key), user: publicUser(users[key]) });
  }

  if (route === 'POST /api/login') {
    if (throttled(ip)) return sendJson(res, 429, { error: 'Too many attempts - wait a minute and try again.' });
    const b = await readBody(req);
    const key = String(b.name || '').trim().toLowerCase();
    const u = users[key];
    if (!u) return sendJson(res, 404, { error: 'No account found with that username - create one below.' });
    if (u.google && !u.hash) return sendJson(res, 400, { error: 'That account uses Google sign-in - use the Google button above.' });
    if (!safeEq(hashPw(String(b.pass || ''), u.salt), u.hash)) return sendJson(res, 401, { error: 'Wrong password - try again, or reset it below.' });
    return sendJson(res, 200, { token: newSession(key), user: publicUser(u) });
  }

  if (route === 'POST /api/google') {
    // Real Google Sign-In: the frontend sends the Google ID token (JWT); we
    // verify it with Google and key the account on the stable Google user id,
    // so every person gets their OWN account.
    if (!GOOGLE_CLIENT_ID) return sendJson(res, 503, { error: 'Google sign-in is not configured yet - use a username and password.' });
    const b = await readBody(req);
    const cred = String(b.credential || '');
    if (!cred || cred.length > 4096) return sendJson(res, 400, { error: 'Missing Google credential.' });
    let info;
    try {
      const r = await fetchJson('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(cred));
      info = r.status === 200 ? r.json : null;
    } catch (e) { info = null; }
    if (!info || info.aud !== GOOGLE_CLIENT_ID || info.email_verified !== 'true' || !info.sub) {
      return sendJson(res, 401, { error: 'Google sign-in could not be verified - try again.' });
    }
    const key = 'google:' + info.sub;
    if (!users[key]) {
      const display = String(info.given_name || info.name || String(info.email || 'Player').split('@')[0]).slice(0, 24);
      users[key] = { name: display, salt: '', hash: '', plan: null, google: true, email: info.email || '', created: Date.now() };
      saveJson('users.json', users);
    }
    return sendJson(res, 200, { token: newSession(key), user: publicUser(users[key]) });
  }

  if (route === 'GET /api/me') {
    const u = authUser(req);
    if (!u) return sendJson(res, 401, { error: 'Not signed in.' });
    return sendJson(res, 200, { user: publicUser(u) });
  }

  if (route === 'POST /api/logout') {
    const h = req.headers.authorization || '';
    if (h.startsWith('Bearer ')) { delete sessions[h.slice(7)]; saveJson('sessions.json', sessions); }
    return sendJson(res, 200, { ok: true });
  }

  // ---------- matchup comments (per-matchup discussion thread) ----------
  // Thread key is the UNORDERED champ pair + lane, so "A vs B" and "B vs A"
  // share one discussion. Reading is public; posting/deleting needs a session.
  if (pathname === '/api/comments' && (req.method === 'GET' || req.method === 'POST')) {
    const q = (function () { try { return new URL(req.url, 'http://x').searchParams; } catch (e) { return new URLSearchParams(); } })();
    const body = req.method === 'POST' ? await readBody(req) : {};
    const pick = (k) => String((req.method === 'POST' ? body[k] : q.get(k)) || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const a = pick('a'), b = pick('b');
    let lane = pick('lane') || 'top';
    if (!['top', 'mid', 'bot', 'support', 'jungle'].includes(lane)) lane = 'top';
    if (!a || !b || a.length > 24 || b.length > 24) return sendJson(res, 400, { error: 'Bad matchup.' });
    const key = lane + ':' + [a, b].sort().join('|');
    const thread = commentsDb[key] || [];

    if (req.method === 'GET') {
      const me = authUser(req);
      const mineKey = me ? me.key : null;
      const list = thread.slice(-200).map((c) => ({ id: c.id, name: c.name, text: c.text, ts: c.ts, mine: !!(mineKey && c.uk === mineKey) }));
      return sendJson(res, 200, { comments: list, count: thread.length });
    }

    // POST — add a comment
    const me = authUser(req);
    if (!me) return sendJson(res, 401, { error: 'Sign in to post a note.' });
    if (throttled(ip)) return sendJson(res, 429, { error: 'Slow down a moment and try again.' });
    let text = String(body.text || '').replace(/\s+$/g, '').replace(/^\s+/g, '');
    if (!text) return sendJson(res, 400, { error: 'Write something first.' });
    if (text.length > 1000) text = text.slice(0, 1000);
    if (thread.length >= 1000) thread.shift(); // hard cap per thread
    const c = { id: crypto.randomBytes(9).toString('hex'), uk: me.key, name: me.name, text, ts: Date.now() };
    thread.push(c);
    commentsDb[key] = thread;
    saveJson('comments.json', commentsDb);
    return sendJson(res, 200, { comment: { id: c.id, name: c.name, text: c.text, ts: c.ts, mine: true } });
  }

  if (route === 'POST /api/comments/delete') {
    const me = authUser(req);
    if (!me) return sendJson(res, 401, { error: 'Sign in first.' });
    const body = await readBody(req);
    const id = String(body.id || '');
    let removed = false;
    for (const k of Object.keys(commentsDb)) {
      const arr = commentsDb[k];
      const i = arr.findIndex((c) => c.id === id && c.uk === me.key);
      if (i >= 0) { arr.splice(i, 1); removed = true; break; }
    }
    if (removed) saveJson('comments.json', commentsDb);
    return sendJson(res, 200, { ok: removed });
  }

  // ---------- live win rate: GET /api/wr?a&b&lane ----------
  // Returns A-vs-B win rate, refreshed from lolalytics at most once per 7 days per
  // matchup (lazy: only pairs people actually view get fetched). wr:null => the
  // frontend keeps its bundled number. Data © LoLalytics; shown with attribution.
  if (pathname === '/api/wr' && req.method === 'GET') {
    const q = (function () { try { return new URL(req.url, 'http://x').searchParams; } catch (e) { return new URLSearchParams(); } })();
    const sl = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const a = sl(q.get('a')), b = sl(q.get('b'));
    let lane = String(q.get('lane') || 'top').toLowerCase();
    if (!LOLA_LANE[lane]) lane = 'top';
    if (!a || !b || a.length > 24 || b.length > 24 || a === b) return sendJson(res, 400, { error: 'Bad matchup.' });
    // custom champs aren't on lolalytics — keep their bundled numbers
    if (NOT_ON_LOLA[a] || NOT_ON_LOLA[b]) return sendJson(res, 200, { wr: null, source: null });
    const key = lane + ':' + a + ':' + b, rkey = lane + ':' + b + ':' + a;
    const now = Date.now();
    const hit = liveWr[key];
    const fresh = hit && (now - hit.ts) < (hit.wr == null ? WR_TTL_FAIL : WR_TTL_OK);
    if (fresh) return sendJson(res, 200, { wr: hit.wr, ts: hit.ts, age: now - hit.ts, source: hit.wr == null ? null : 'lolalytics' });

    let p = wrInflight.get(key);
    if (!p) {
      p = (async () => {
        const wait = Math.max(0, 1200 - (Date.now() - wrLastFetch)); // ~1 outbound fetch / 1.2s
        if (wait) await new Promise((r) => setTimeout(r, wait));
        wrLastFetch = Date.now();
        try {
          const wr = await wrFetch(a, b, lane);
          const ts = Date.now();
          if (wr == null) { liveWr[key] = { wr: null, ts }; saveJson('live-wr.json', liveWr); return { wr: null, source: null, ts }; }
          liveWr[key] = { wr, ts };
          liveWr[rkey] = { wr: Math.round((100 - wr) * 100) / 100, ts };
          saveJson('live-wr.json', liveWr);
          return { wr, ts, age: 0, source: 'lolalytics' };
        } catch (e) {
          if (!liveWr[key]) { liveWr[key] = { wr: null, ts: Date.now() }; saveJson('live-wr.json', liveWr); }
          // serve a stale positive value if we have one, else null (frontend falls back)
          return (hit && hit.wr != null) ? { wr: hit.wr, ts: hit.ts, source: 'lolalytics', stale: true } : { wr: null, source: null };
        }
      })();
      wrInflight.set(key, p);
      p.finally(() => wrInflight.delete(key));
    }
    const v = await p.catch(() => ({ wr: null }));
    return sendJson(res, 200, v);
  }

  if (route === 'POST /api/checkout') {
    const u = authUser(req);
    if (!u) return sendJson(res, 401, { error: 'Sign in to check out.' });
    if (PAYMENTS_MODE === 'off') return sendJson(res, 503, { error: 'Paid plans are not open yet - follow the launch for the go-live date.' });
    const b = await readBody(req);
    const plan = String(b.plan || '');
    if (!['role', 'all', 'allyr', 'founder'].includes(plan)) return sendJson(res, 400, { error: 'Unknown plan.' });
    let charged = '';
    const planObj = { type: plan };
    if (plan === 'role') {
      planObj.role = ['top', 'jungle', 'mid', 'bot', 'support'].includes(b.role) ? b.role : 'top';
      charged = '$1.99/mo';
    } else if (plan === 'all' || plan === 'allyr') {
      charged = plan === 'allyr' ? '$19.99/yr' : '$3.99/mo';
    } else {
      if (u.plan && u.plan.type === 'founder') {
        return sendJson(res, 200, { user: publicUser(u), charged: 'already a Lifetime Member - not charged', founders: founderState() });
      }
      const fs2 = founderState();
      if (fs2.soldOut) return sendJson(res, 410, { error: 'Lifetime Member is unavailable right now.' });
      founders.claimed = (founders.claimed | 0) + 1;
      saveJson('founders.json', founders);
      planObj.founderNum = founders.claimed;
      charged = fs2.priceLabel + ' one-time';
    }
    users[u.key].plan = planObj;
    saveJson('users.json', users);
    return sendJson(res, 200, { user: publicUser(users[u.key]), charged, founders: founderState() });
  }

  // ----- Real Stripe Checkout (hosted): create a session, redirect, confirm -----
  if (route === 'POST /api/stripe/checkout') {
    const u = authUser(req);
    if (!u) return sendJson(res, 401, { error: 'Sign in to check out.' });
    if (!STRIPE_ON) return sendJson(res, 503, { error: 'Payments are not switched on yet.' });
    const b = await readBody(req);
    const plan = String(b.plan || '');
    if (!['role', 'all', 'allyr', 'founder'].includes(plan)) return sendJson(res, 400, { error: 'Unknown plan.' });
    const role = ['top', 'jungle', 'mid', 'bot', 'support'].includes(b.role) ? b.role : 'top';

    const params = {
      success_url: PUBLIC_URL + '/?mc_checkout=success&session_id={CHECKOUT_SESSION_ID}',
      cancel_url: PUBLIC_URL + '/?mc_checkout=cancel',
      client_reference_id: u.key,
      'metadata[plan]': plan,
      'metadata[role]': role,
      'line_items[0][quantity]': 1
    };
    if (plan === 'founder') {
      if (u.plan && u.plan.type === 'founder') return sendJson(res, 400, { error: 'You already own Lifetime Member.' });
      const fs2 = founderState();
      if (fs2.soldOut) return sendJson(res, 410, { error: 'Lifetime Member is unavailable.' });
      params.mode = 'payment';
      // Flat $24.99 Lifetime Member one-time charge.
      params['line_items[0][price_data][currency]'] = 'usd';
      params['line_items[0][price_data][unit_amount]'] = Math.round(fs2.price * 100);
      params['line_items[0][price_data][product_data][name]'] = 'MatchupCoach — Lifetime Member';
    } else {
      const priceId = plan === 'allyr' ? STRIPE_PRICE_ALLYR : plan === 'all' ? STRIPE_PRICE_ALL : STRIPE_PRICE_ROLE;
      if (!priceId) return sendJson(res, 503, { error: 'This plan is not configured yet.' });
      params.mode = 'subscription';
      params['line_items[0][price]'] = priceId;
    }
    try {
      const r = await stripeApi('POST', '/v1/checkout/sessions', params);
      if (r.status >= 400 || !r.json.url) return sendJson(res, 502, { error: (r.json.error && r.json.error.message) || 'Stripe could not start checkout.' });
      return sendJson(res, 200, { url: r.json.url });
    } catch (e) { return sendJson(res, 502, { error: 'Could not reach Stripe.' }); }
  }

  if (route === 'POST /api/stripe/confirm') {
    const u = authUser(req);
    if (!u) return sendJson(res, 401, { error: 'Sign in first.' });
    if (!STRIPE_ON) return sendJson(res, 503, { error: 'Payments are not switched on.' });
    const b = await readBody(req);
    const sid = String(b.sessionId || '');
    if (!/^cs_[A-Za-z0-9_]+$/.test(sid)) return sendJson(res, 400, { error: 'Bad session.' });
    if (fulfilled[sid]) return sendJson(res, 200, { user: publicUser(users[u.key]), founders: founderState(), alreadyDone: true });
    let sess;
    try {
      const r = await stripeApi('GET', '/v1/checkout/sessions/' + sid);
      sess = r.json;
    } catch (e) { return sendJson(res, 502, { error: 'Could not verify with Stripe.' }); }
    if (!sess || sess.client_reference_id !== u.key) return sendJson(res, 403, { error: 'This checkout is not yours.' });
    if (sess.payment_status !== 'paid' && sess.status !== 'complete') return sendJson(res, 402, { error: 'Payment not completed.' });
    const plan = (sess.metadata && sess.metadata.plan) || '';
    const role = (sess.metadata && sess.metadata.role) || 'top';
    const planObj = { type: plan };
    if (plan === 'role') planObj.role = role;
    if (plan === 'founder') {
      if (!(u.plan && u.plan.type === 'founder')) {
        const fs2 = founderState();
        if (!fs2.soldOut) { founders.claimed = (founders.claimed | 0) + 1; saveJson('founders.json', founders); planObj.founderNum = founders.claimed; }
      } else { planObj.founderNum = u.plan.founderNum; }
    }
    fulfilled[sid] = true; saveJson('fulfilled.json', fulfilled);
    users[u.key].plan = planObj; saveJson('users.json', users);
    return sendJson(res, 200, { user: publicUser(users[u.key]), founders: founderState() });
  }

  return sendJson(res, 404, { error: 'No such endpoint.' });
}

// ---------- server ----------
http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch (e) { pathname = '/'; }
  // Don't let browsers MIME-sniff responses; deny framing (clickjacking).
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  const ip = clientIp(req);
  if (pathname === '/api' || pathname.startsWith('/api/')) {
    handleApi(req, res, pathname, ip).catch(() => sendJson(res, 500, { error: 'Server error.' }));
  } else {
    sendStatic(res, pathname.replace(/^\/+/, ''));
  }
}).listen(PORT, '0.0.0.0', () => {
  console.log('MatchupCoach (site + API) on port ' + PORT + ' - data in ' + DATA_DIR + ' - payments: ' + PAYMENTS_MODE);
});

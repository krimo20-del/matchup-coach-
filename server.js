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
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = parseInt(process.env.PORT, 10) || 8123;
const ROOT = __dirname;
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, 'server-data');
const PAYMENTS_MODE = process.env.PAYMENTS_MODE || 'demo';
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

// ---------- crypto ----------
const newToken = () => crypto.randomBytes(32).toString('hex');
const newSalt = () => crypto.randomBytes(16).toString('base64');
const hashPw = (pw, salt) =>
  crypto.pbkdf2Sync(pw, Buffer.from(salt, 'base64'), 100000, 32, 'sha256').toString('base64');

// ---------- helpers ----------
function founderState() {
  const c = founders.claimed | 0;
  if (c < 100) return { claimed: c, soldOut: false, price: 24.99, priceLabel: '$24.99', bracket: 'first100', remaining: 100 - c, nextPrice: '$39.99' };
  if (c < 300) return { claimed: c, soldOut: false, price: 39.99, priceLabel: '$39.99', bracket: 'next200', remaining: 300 - c, nextPrice: null };
  return { claimed: c, soldOut: true, price: null, priceLabel: null, bracket: 'gone', remaining: 0, nextPrice: null };
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
  '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.txt': 'text/plain'
};
function sendStatic(res, rel) {
  if (rel === '') rel = 'index.html';
  const full = path.normalize(path.join(ROOT, rel));
  if (!full.startsWith(ROOT) || !fs.existsSync(full) || !fs.statSync(full).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('404');
  }
  const ext = path.extname(full).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(full).pipe(res);
}

// ---------- API ----------
async function handleApi(req, res, pathname, ip) {
  const route = req.method + ' ' + pathname;

  if (route === 'GET /api/health') return sendJson(res, 200, { ok: true, ts: Date.now() });
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
    if (hashPw(String(b.pass || ''), u.salt) !== u.hash) return sendJson(res, 401, { error: 'Wrong password - try again, or reset it below.' });
    return sendJson(res, 200, { token: newSession(key), user: publicUser(u) });
  }

  if (route === 'POST /api/google') {
    // Demo SSO until a real Google OAuth client is configured.
    const key = 'riftgamer';
    if (!users[key]) {
      users[key] = { name: 'RiftGamer', salt: '', hash: '', plan: null, google: true, created: Date.now() };
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

  if (route === 'POST /api/checkout') {
    const u = authUser(req);
    if (!u) return sendJson(res, 401, { error: 'Sign in to check out.' });
    if (PAYMENTS_MODE === 'off') return sendJson(res, 503, { error: 'Paid plans are not open yet - follow the launch for the go-live date.' });
    const b = await readBody(req);
    const plan = String(b.plan || '');
    if (!['role', 'all', 'founder'].includes(plan)) return sendJson(res, 400, { error: 'Unknown plan.' });
    let charged = '';
    const planObj = { type: plan };
    if (plan === 'role') {
      planObj.role = ['top', 'jungle', 'mid', 'bot', 'support'].includes(b.role) ? b.role : 'top';
      charged = '$4.99/mo';
    } else if (plan === 'all') {
      charged = '$9.99/mo';
    } else {
      if (u.plan && u.plan.type === 'founder') {
        return sendJson(res, 200, { user: publicUser(u), charged: 'already a founder - not charged', founders: founderState() });
      }
      const fs2 = founderState();
      if (fs2.soldOut) return sendJson(res, 410, { error: 'Founder Lifetime is sold out - all 300 seats are claimed.' });
      founders.claimed = (founders.claimed | 0) + 1;
      saveJson('founders.json', founders);
      planObj.founderNum = founders.claimed;
      charged = fs2.priceLabel + ' one-time';
    }
    users[u.key].plan = planObj;
    saveJson('users.json', users);
    return sendJson(res, 200, { user: publicUser(users[u.key]), charged, founders: founderState() });
  }

  return sendJson(res, 404, { error: 'No such endpoint.' });
}

// ---------- server ----------
http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch (e) { pathname = '/'; }
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  if (pathname === '/api' || pathname.startsWith('/api/')) {
    handleApi(req, res, pathname, ip).catch(() => sendJson(res, 500, { error: 'Server error.' }));
  } else {
    sendStatic(res, pathname.replace(/^\/+/, ''));
  }
}).listen(PORT, '0.0.0.0', () => {
  console.log('MatchupCoach (site + API) on port ' + PORT + ' - data in ' + DATA_DIR + ' - payments: ' + PAYMENTS_MODE);
});

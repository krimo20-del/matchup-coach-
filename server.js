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
//   STRIPE_TRIAL_DAYS / STRIPE_TRIAL_NO_CARD — first-time free trial (see below).
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
// Moderation: comma-separated user keys (lowercase) allowed to delete ANY
// matchup note, e.g. ADMIN_USERS=kristopher. Authors can always delete their own.
const ADMIN_USERS = (process.env.ADMIN_USERS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

// Stripe (hosted Checkout). Set STRIPE_SECRET_KEY (sk_live_… or sk_test_…) to
// turn on real payments; the customer enters their card on Stripe's page, not
// ours. Subscriptions need Price IDs from your Stripe dashboard; the founder
// one-time charge is a flat $24.99 Lifetime Member.
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
// ---- Pricing: three plans, no Early Access (2026-08-06 rework) ----
// lane  $1.99/mo  — ONE lane (top|mid|bot|support|jungle), stored on plan.role
// all   $3.99/mo  — every lane
// year  $24.99/yr — every lane, billed annually ($2.08/mo effective)
// The env names STRIPE_PRICE_FOUNDING/STANDARD are kept as fallbacks so the
// Render env set during Early Access keeps working: FOUNDING was the $1.99
// price (now the lane price) and STANDARD the $3.99 (now all-lanes monthly).
const PLANS = {
  lane: { price: 1.99, label: '$1.99', per: '/mo', type: 'role' },
  all: { price: 3.99, label: '$3.99', per: '/mo', type: 'all' },
  year: { price: 24.99, label: '$24.99', per: '/yr', type: 'allyr' }
};
const ROLES = { top: 1, mid: 1, bot: 1, support: 1, jungle: 1 };
const STRIPE_PRICE_LANE = process.env.STRIPE_PRICE_LANE || process.env.STRIPE_PRICE_FOUNDING || '';
const STRIPE_PRICE_ALL = process.env.STRIPE_PRICE_ALL || process.env.STRIPE_PRICE_STANDARD || '';
const STRIPE_PRICE_ALLYR = process.env.STRIPE_PRICE_ALLYR || '';
const STRIPE_PLAN_PRICE = () => ({ lane: STRIPE_PRICE_LANE, all: STRIPE_PRICE_ALL, year: STRIPE_PRICE_ALLYR });
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ''; // whsec_… (Developers → Webhooks)
// Stripe "Managed Payments" (Stripe acting as merchant of record) is ON by
// default on new accounts. It remits worldwide sales tax for you, but stacks to
// ~6.4% + $0.30 — on a $1.99 subscription that is ~21.5% vs ~17.2% on standard
// pricing — and it REFUSES to create a session unless every product carries a
// tax_code, which is how we found it (checkout 400'd on the first live test).
// Default OFF. Set STRIPE_MANAGED_PAYMENTS=1 to opt in, and give the product a
// tax code first (Product catalogue → the product → Tax code) or checkout breaks.
const STRIPE_MANAGED = process.env.STRIPE_MANAGED_PAYMENTS === '1';
const PUBLIC_URL = (process.env.PUBLIC_URL || 'https://matchupcoach.gg').replace(/\/+$/, '');
const STRIPE_ON = !!STRIPE_SECRET_KEY;
// ---- Free trial (2026-09 owner request: "7 day free trial ... but must register") ----
// STRIPE_TRIAL_DAYS     trial length for FIRST-TIME subscribers (default 7). 0 turns
//                       trials off everywhere: Stripe checkout, the demo checkout, and
//                       the frontend's "Start free trial" copy (it reads trialDays).
// STRIPE_TRIAL_NO_CARD  '1' = don't ask for a card during a trial. Default is Stripe's
//                       normal subscription Checkout, which DOES take the card, so
//                       billing starts by itself when the trial ends unless cancelled.
//                       With no card on file the sub is set to CANCEL at trial end
//                       (never "create an unpayable invoice"), and the existing
//                       customer.subscription.deleted revoke removes access.
// Capped at 730 days: Stripe's documented maximum free-trial length.
// LOCKED TO THE PUBLISHED TERMS: terms.html §4 "Free trial" says "7-day free trial"
// and "Card required", and refund.html §1 / cancel.html repeat it. Changing either
// env value makes those pages wrong — update the copy in the same deploy.
// Keep STRIPE_TRIAL_NO_CARD OFF in production: with no card, the only thing
// stopping unlimited free weeks is making a new username.
// Before trials go live the owner must turn on, in Stripe Settings > Subscriptions
// and emails: the trial-ending reminder email (sent at trial start for trials of
// 7 days or less), payment-confirmation emails, and the cancellation-policy link
// https://matchupcoach.gg/cancel — card-network trial rules. No server code sends
// these, and a statement descriptor over 10 characters gets "* TRIAL OVER" added.
const TRIAL_DAYS_ENV = parseInt(process.env.STRIPE_TRIAL_DAYS, 10);
const STRIPE_TRIAL_DAYS = Number.isFinite(TRIAL_DAYS_ENV) && TRIAL_DAYS_ENV >= 0 ? Math.min(TRIAL_DAYS_ENV, 730) : 7;
const STRIPE_TRIAL_NO_CARD = process.env.STRIPE_TRIAL_NO_CARD === '1';
// Lane Pass holders may swap which lane they have for free, but only once a
// week — otherwise one $1.99 pass becomes an all-lanes pass by swapping daily.
// The cooldown covers ANY change that lands on a different lane, including
// lane -> all -> other lane: that round trip nets to $0 after proration credit.
const LANE_SWAP_COOLDOWN_MS = 7 * 864e5;
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

// Startup sweep: expired sessions otherwise accumulate in sessions.json forever
// (they were only pruned lazily, when their own token was next presented).
{
  let swept = false;
  const nowStart = Date.now();
  for (const t of Object.keys(sessions)) {
    if (!sessions[t] || sessions[t].exp < nowStart) { delete sessions[t]; swept = true; }
  }
  if (swept) saveJson('sessions.json', sessions);
}

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
// Membership state shown to the frontend. earlyAccess is pinned false and the
// legacy price fields describe the all-lanes monthly plan so cached pre-rework
// frontends render something sensible; new frontends read `plans`.
function memberState() {
  return {
    earlyAccess: false,
    plans: { lane: PLANS.lane.price, all: PLANS.all.price, year: PLANS.year.price },
    price: PLANS.all.price,
    priceLabel: PLANS.all.label,
    regularPrice: PLANS.all.price,
    regularLabel: PLANS.all.label,
    members: founders.claimed | 0
  };
}
// A Stripe reference field is either the id string or the expanded object.
const stripeId = (v) => (typeof v === 'string' && v) || (v && typeof v === 'object' && typeof v.id === 'string' && v.id) || '';
// Stamp a paid Stripe Checkout session onto the buyer's account. Idempotent
// (fulfilled.json), safe to call from BOTH /api/stripe/confirm and the webhook.
// The plan + price come from the SESSION metadata (what was actually sold),
// never today's config — a later price change can't rewrite history. A new
// purchase REPLACES the old plan (that's how a lane subscriber upgrades to
// all-lanes: buy the bigger plan, then cancel the old sub in the portal).
function fulfillStripeSession(sid, sess) {
  if (fulfilled[sid]) return false;
  const key = sess.client_reference_id;
  const u = users[key];
  if (!u) return false;
  // Ordering guard: Stripe retries webhook deliveries for days. If a STALE
  // paid session (created before the currently-stored plan was purchased)
  // arrives late, fulfilling it would overwrite the newer plan and cancel the
  // newer subscription. Mark it handled and cancel ITS sub instead — the buyer
  // already replaced it with a newer purchase.
  // Compare like-for-like: the stored plan carries the CREATION time of the
  // session that fulfilled it (sessCreated). Comparing against plan.since (a
  // local fulfillment wall-clock) discarded any second purchase whose session
  // was created before the first purchase was fulfilled — a buyer with two
  // checkout tabs paid for an upgrade that was silently voided and cancelled.
  const createdMs = (sess.created | 0) * 1000;
  if (u.plan && createdMs && createdMs < (u.plan.sessCreated || u.plan.since)) {
    fulfilled[sid] = true; saveJson('fulfilled.json', fulfilled);
    const staleSub = stripeId(sess.subscription);
    if (staleSub && staleSub !== u.plan.subId && STRIPE_ON) cancelStripeSub(u, staleSub);
    return false;
  }
  const md = sess.metadata || {};
  const planKey = PLANS[md.plan] ? md.plan : 'all';
  const spec = PLANS[planKey];
  const prev = u.plan || null;
  const planObj = {
    type: spec.type,
    price: parseFloat(md.price || '') || spec.price,
    since: Date.now(),
    // The fulfilled session's own Stripe creation time — what the ordering
    // guard above compares against (same clock as sess.created).
    sessCreated: createdMs,
    // Stripe sends these as bare ids, but returns objects when expanded. Accept
    // both: subId is what customer.subscription.deleted matches on to revoke
    // access, and custId is what opens the billing portal — losing either
    // silently breaks cancellation.
    subId: stripeId(sess.subscription) || '',
    custId: stripeId(sess.customer) || (prev && prev.custId) || ''
  };
  if (spec.type === 'role') planObj.role = ROLES[md.role] ? md.role : 'top';
  // One person, one member number — a lapsed subscriber who comes back keeps
  // their number (pastPlan) and is not double-counted in the public counter.
  const keptNum = (prev && prev.memberNum) || (u.pastPlan && u.pastPlan.memberNum);
  if (!keptNum) { founders.claimed = (founders.claimed | 0) + 1; saveJson('founders.json', founders); }
  planObj.memberNum = keptNum || founders.claimed;
  // Free trial: metadata[trial]=1 is only ever put on sessions minted for an
  // eligible account. The one-trial-per-account flag is burned HERE, when the
  // trial is actually granted — not when checkout starts — so someone who
  // opens the Stripe page and walks away still has their trial. (The trial end
  // itself isn't on the session; refreshPlanFromStripe() fills it in.)
  const isTrial = md.trial === '1';
  // One trial per account, ever: a second trial session can only exist when two
  // checkout tabs were opened while the account was still eligible. The buyer
  // finished checkout, so they still get the plan they picked — but the new
  // subscription's trial is cut to end when the FIRST trial ends (like a plan
  // change during a trial), so the free period never grows. If the first trial's
  // end is unknown it is estimated from that session's creation time, which can
  // only be earlier than the real end, never later.
  let trimTo = null;
  if (isTrial && u.trialUsed && planObj.subId && STRIPE_ON) {
    const ref = prev || u.pastPlan || null;
    const endMs = (ref && ref.trialEnd) || (ref && ref.sessCreated ? ref.sessCreated + STRIPE_TRIAL_DAYS * 864e5 : 0);
    trimTo = endMs && endMs > Date.now() + 60000 ? Math.floor(endMs / 1000) : 'now';
    if (trimTo !== 'now') planObj.trialEnd = trimTo * 1000;
  }
  // Upgrade path: buying a new plan replaces the old one. The OLD Stripe
  // subscription would keep billing forever, so cancel it immediately. The
  // webhook's subscription.deleted for the old sub can't revoke the new plan —
  // the revoke loop matches on subId, which now points at the new sub.
  const oldSub = prev && prev.subId;
  fulfilled[sid] = true; saveJson('fulfilled.json', fulfilled);
  if (isTrial) u.trialUsed = true;
  u.plan = planObj; saveJson('users.json', users);
  if (trimTo) trimRepeatTrial(u, planObj.subId, trimTo);
  if (oldSub && planObj.subId && oldSub !== planObj.subId && STRIPE_ON) cancelStripeSub(u, oldSub);
  return true;
}
// Cut a repeat trial (see fulfillStripeSession) with trial_end on the
// subscription update — a timestamp or 'now' (docs: api/subscriptions/update).
// proration_behavior none: trial time is free, nothing to prorate. While it is
// in flight refreshPlanFromStripe waits for it, so the stored trial end can't
// be overwritten by a read of the un-cut subscription.
const trialTrims = new Map(); // subId -> Promise
function trimRepeatTrial(u, subId, trialEnd) {
  const p = stripeApi('POST', '/v1/subscriptions/' + encodeURIComponent(subId), { trial_end: trialEnd, proration_behavior: 'none' })
    .then((r) => {
      if (r.status >= 400 || !r.json || !r.json.id) { console.error('[billing] repeat-trial trim failed for ' + subId + ': ' + r.status + ' ' + ((r.json && r.json.error && r.json.error.message) || '')); return; }
      if (u.plan && u.plan.subId === subId && syncPlanDates(u.plan, r.json)) saveJson('users.json', users);
    })
    .catch((e) => { console.error('[billing] repeat-trial trim failed for ' + subId + ': ' + (e && e.message)); })
    .finally(() => { trialTrims.delete(subId); });
  trialTrims.set(subId, p);
  return p;
}
// Cancel a replaced subscription and VERIFY it worked. stripeApi resolves on
// HTTP errors too, so a .catch alone silently missed failures — which breaks
// the customer-facing promise that an upgrade never double-bills. On failure
// the sub id is parked on the user (orphanSubs) and retried before every
// billing-portal open, so there is always a self-serve path to recovery.
function cancelStripeSub(u, subId) {
  return stripeApi('DELETE', '/v1/subscriptions/' + encodeURIComponent(subId))
    .then((r) => {
      const gone = r.status < 400 || (r.json && r.json.error && r.json.error.code === 'resource_missing');
      if (!gone) throw new Error('cancel failed: ' + r.status);
      if (u.orphanSubs) { u.orphanSubs = u.orphanSubs.filter((s) => s !== subId); if (!u.orphanSubs.length) delete u.orphanSubs; saveJson('users.json', users); }
      return true;
    })
    .catch(() => {
      u.orphanSubs = (u.orphanSubs || []).concat(u.orphanSubs && u.orphanSubs.indexOf(subId) !== -1 ? [] : [subId]);
      saveJson('users.json', users);
      return false;
    });
}

// Legacy alias — old frontends called /api/founders for member-counter state.
// (The dead $24.99 lifetime literals it used to carry were always overwritten
// by memberState() and advertised a plan that no longer exists — removed.)
function founderState() {
  return Object.assign({ claimed: founders.claimed | 0, soldOut: false, remaining: null, nextPrice: null }, memberState());
}
// Trial eligibility — FIRST-TIME subscribers only: no current plan, never had
// one (pastPlan is set whenever a subscription is revoked), and never used a
// trial. So upgrades, lapsed/returning subscribers and legacy holders never get
// one. Registration is implied: every caller is a signed-in account.
function trialEligible(u) {
  return STRIPE_TRIAL_DAYS > 0 && !!u && !u.plan && !u.pastPlan && !u.trialUsed;
}
// trialEligible/trialDays are additive: the frontend shows "Start 7-day free
// trial" only when the server says this account would actually get one.
const publicUser = (u) => ({ name: u.name, plan: u.plan || null, google: !!u.google, trialEligible: trialEligible(u), trialDays: STRIPE_TRIAL_DAYS });
// Does this Checkout Session unlock the plan? 'paid' as always. A trial
// checkout has nothing to charge today, so Stripe may complete it with
// payment_status 'no_payment_required' — accept that ONLY for a subscription-
// mode session that actually produced a subscription (that subscription is
// what bills at trial end and what the deleted-webhook revokes on). Anything
// else unpaid stays refused.
function checkoutSessionUnlocks(sess) {
  if (!sess) return false;
  if (sess.payment_status === 'paid') return true;
  return sess.payment_status === 'no_payment_required' && sess.mode === 'subscription' && !!stripeId(sess.subscription);
}

// ---------- account billing helpers (status / cancel / resume / change) ----------
const PLAN_KEY_OF_TYPE = { role: 'lane', all: 'all', allyr: 'year' };
const LEGACY_BILLING_MSG = 'Your plan is a legacy plan we look after by hand - email support@matchupcoach.gg to change or cancel it.';
const NO_PROFILE_MSG = 'We could not find your billing profile - email support@matchupcoach.gg and we will sort it out.';
const tsMs = (s) => (typeof s === 'number' && s > 0 ? s * 1000 : null);
const subItem = (sub) => (sub && sub.items && Array.isArray(sub.items.data) && sub.items.data[0]) || null;
// From API 2025-03-31.basil on (the account runs 2026-06-24.dahlia) the billing
// period lives on the subscription ITEM; the top-level field is only a fallback
// for an account pinned to an older version.
const periodEndOf = (sub) => { const it = subItem(sub); return (it && it.current_period_end) || (sub && sub.current_period_end) || null; };
const money = (n) => '$' + (Math.round(n * 100) / 100).toFixed(2);
const fmtDay = (ms) => { try { return new Date(ms).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }); } catch (e) { return new Date(ms).toISOString().slice(0, 10); } };
function addInterval(ms, interval) {
  const d = new Date(ms);
  if (interval === 'year') d.setUTCFullYear(d.getUTCFullYear() + 1); else d.setUTCMonth(d.getUTCMonth() + 1);
  return d.getTime();
}
// A plan we can manage through Stripe: a current plan type with a real
// subscription AND customer on record. Anything else (legacy, or a plan minted
// in demo mode) is answered from local data and routed to support.
function stripeManaged(pl) {
  return !!(pl && PLAN_KEY_OF_TYPE[pl.type] && typeof pl.subId === 'string' && /^sub_/.test(pl.subId) && typeof pl.custId === 'string' && /^cus_/.test(pl.custId));
}
function planKeyForPrice(priceId) {
  if (!priceId) return '';
  const m = STRIPE_PLAN_PRICE();
  for (const k of Object.keys(m)) if (m[k] && m[k] === priceId) return k;
  return '';
}
// When the next change onto a DIFFERENT lane opens. Not limited to lane plans:
// an All Lanes member who just left a lane is under the same cooldown.
function laneChangeAvailableAt(pl) {
  if (!pl || !PLAN_KEY_OF_TYPE[pl.type] || !pl.laneChangedAt) return null;
  const at = pl.laneChangedAt + LANE_SWAP_COOLDOWN_MS;
  return at > Date.now() ? at : null;
}
// Set a plan's type/price/role for planKey. Leaving a Lane Pass records which
// lane was held (lastLane), so a later move back onto a lane can tell "same
// lane again" (free) from "a different lane" (cooldown). Identity fields
// (subId, custId, memberNum, sessCreated, since) are never touched.
function applyPlanType(pl, planKey, role, now) {
  const spec = PLANS[planKey];
  if (pl.type === 'role' && spec.type !== 'role') pl.lastLane = { role: pl.role || 'top', at: now };
  pl.type = spec.type; pl.price = spec.price;
  if (spec.type === 'role') { pl.role = ROLES[role] ? role : (pl.role || (pl.lastLane && ROLES[pl.lastLane.role] ? pl.lastLane.role : 'top')); delete pl.lastLane; } else delete pl.role;
}
// Reconcile-on-read for a plan change Stripe applied without this server
// seeing it: a parked pending_update paid later (hosted invoice page, 3DS, a
// retry after a card update) while customer.subscription.updated is not
// registered. Adopt the Stripe price's plan ONLY when the subscription is live,
// nothing is still pending, and it is a BIGGER plan than the local one — that is
// what they now pay for. Never shrinks access on a read (a hand-granted comp
// upgrade stays), and never touches legacy plans (not in PLAN_RANK).
const PLAN_RANK = { role: 1, all: 2, allyr: 3 };
function adoptPaidUpgrade(pl, sub) {
  if (!pl || !PLAN_RANK[pl.type] || !sub || sub.pending_update) return false;
  if (!(sub.status === 'active' || sub.status === 'trialing')) return false;
  const it = subItem(sub);
  const key = planKeyForPrice(it && it.price && (it.price.id || it.price));
  if (!key || PLAN_RANK[PLANS[key].type] <= PLAN_RANK[pl.type]) return false;
  const now = Date.now();
  applyPlanType(pl, key, sub.metadata && sub.metadata.role, now);
  pl.changedAt = now;
  return true;
}
// A cancellation scheduled for the end of the current period — the member's
// own, undoable in-app. In flexible billing mode (the default for new
// subscriptions on this account's API version) the customer portal records it
// as cancel_at = the item period end with cancel_at_period_end false
// (docs: billing/subscriptions/billing-mode/compare). A cancel_at before the
// period end is a custom date someone set by hand: left to support.
function periodEndCancel(sub) {
  if (!sub) return false;
  if (sub.cancel_at_period_end) return true;
  const end = periodEndOf(sub);
  return typeof sub.cancel_at === 'number' && typeof end === 'number' && Math.abs(sub.cancel_at - end) <= 5;
}
// The renewal date Stripe itself puts on a previewed interval change: the
// period end of the first NON-proration line (the new full period). Dahlia-era
// line items carry the flag at parent.subscription_item_details.proration
// (docs: api/invoice-line-item/object); older versions at line.proration.
function previewNewPeriodEnd(inv) {
  const lines = inv && inv.lines && Array.isArray(inv.lines.data) ? inv.lines.data : [];
  for (const l of lines) {
    if (!l || !l.period || typeof l.period.end !== 'number') continue;
    const d = l.parent && (l.parent.subscription_item_details || l.parent.invoice_item_details);
    const proration = d ? !!d.proration : !!l.proration;
    if (!proration) return l.period.end * 1000;
  }
  return null;
}
// Stripe error text is never shown to members (it can name a masked API key, a
// price id or internal parameter names). Log it here, answer with fixed copy.
function logStripeErr(where, r) {
  const e = r && r.json && r.json.error;
  console.error('[billing] ' + where + ': Stripe ' + (r && r.status) + ' ' + ((e && (e.code || e.type)) || '') + ' ' + ((e && e.message) || ''));
}
// Copy the live dates/flags of a subscription onto the local plan. Never
// touches plan TYPE (adoptPaidUpgrade above is the one deliberate exception).
// trialEnd only while trialing: Stripe keeps trial_end on the subscription after
// the trial converts, and a paying member must not look like a trial user.
function syncPlanDates(pl, sub) {
  const next = {
    subStatus: typeof sub.status === 'string' ? sub.status : null,
    trialEnd: sub.status === 'trialing' ? tsMs(sub.trial_end) : null,
    periodEnd: tsMs(periodEndOf(sub)),
    cancelAtPeriodEnd: !!sub.cancel_at_period_end,
    cancelAt: tsMs(sub.cancel_at)
  };
  let changed = false;
  for (const k of Object.keys(next)) {
    const v = next[k];
    if (v === null || v === false) { if (k in pl) { delete pl[k]; changed = true; } } else if (pl[k] !== v) { pl[k] = v; changed = true; }
  }
  return changed;
}
// Best-effort: fill trial/period dates onto a just-fulfilled plan. Failure is
// harmless (the plan is already granted; status reads re-sync later).
async function refreshPlanFromStripe(u) {
  const pl = u && u.plan;
  if (!STRIPE_ON || !stripeManaged(pl)) return null;
  try {
    const trim = trialTrims.get(pl.subId);
    if (trim) await trim;
    const r = await stripeApi('GET', '/v1/subscriptions/' + encodeURIComponent(pl.subId));
    if (r.status >= 400 || !r.json || stripeId(r.json.customer) !== pl.custId) return null;
    if (u.plan === pl && syncPlanDates(pl, r.json)) saveJson('users.json', users);
    return r.json;
  } catch (e) { return null; }
}
// Load the member's subscription and PROVE it is theirs: the Stripe customer
// on the subscription must be the customer stored on this account. plan.subId
// is server-written, but a mismatch means the local record is wrong (restored
// backup, hand edit) and acting on it could cancel or re-price someone else.
// Expands the card so status can show "Visa •••• 4242" without a second call.
async function fetchOwnedSub(pl) {
  let r;
  try {
    r = await stripeApi('GET', '/v1/subscriptions/' + encodeURIComponent(pl.subId) +
      '?expand%5B%5D=default_payment_method&expand%5B%5D=customer.invoice_settings.default_payment_method');
  } catch (e) { return { code: 502, error: 'Could not reach Stripe.' }; }
  const err = r.json && r.json.error;
  if (r.status === 404 || (err && err.code === 'resource_missing')) return { code: 409, error: NO_PROFILE_MSG };
  if (r.status >= 400 || !r.json || !r.json.id) { logStripeErr('load subscription ' + pl.subId, r); return { code: 502, error: 'Could not load your subscription - try again, or email support@matchupcoach.gg.' }; }
  if (stripeId(r.json.customer) !== pl.custId) return { code: 403, error: 'That subscription is not on your billing profile - email support@matchupcoach.gg.' };
  return { sub: r.json };
}
function cardOf(sub) {
  const pick = (pm) => (pm && typeof pm === 'object' && pm.card && pm.card.last4) ? { brand: String(pm.card.brand || 'card'), last4: String(pm.card.last4) } : null;
  const cust = sub.customer && typeof sub.customer === 'object' ? sub.customer : null;
  return pick(sub.default_payment_method) || pick(cust && cust.invoice_settings && cust.invoice_settings.default_payment_method);
}
function billingStatusFromSub(u, sub) {
  const pl = u.plan;
  const it = subItem(sub);
  const st = sub.status;
  const live = st === 'active' || st === 'trialing';
  const scheduled = !!sub.cancel_at_period_end || !!sub.cancel_at;
  // Resume only a period-end cancellation, whichever way it was recorded (see periodEndCancel).
  const pr = it && it.price && typeof it.price === 'object' ? it.price : null;
  let message = null;
  if (st === 'past_due' || st === 'unpaid') message = 'Your last payment did not go through - update your card in billing and Stripe will retry.';
  else if (scheduled && live) message = 'Your subscription is set to end on ' + fmtDay(tsMs(sub.cancel_at) || tsMs(periodEndOf(sub))) + '. You keep full access until then.';
  else if (!live) message = 'This subscription has ended.';
  return {
    managed: 'stripe',
    plan: PLAN_KEY_OF_TYPE[pl.type] || pl.type,
    role: pl.type === 'role' ? (pl.role || 'top') : null,
    price: pr && typeof pr.unit_amount === 'number' ? pr.unit_amount / 100 : pl.price,
    currency: (pr && pr.currency) || 'usd',
    interval: (pr && pr.recurring && pr.recurring.interval) || (pl.type === 'allyr' ? 'year' : 'month'),
    status: st,
    // Only while trialing — Stripe keeps trial_end on the sub forever, and a
    // "trial ends" line on a paying member's account page would mislead.
    trialEnd: st === 'trialing' ? tsMs(sub.trial_end) : null,
    currentPeriodEnd: tsMs(periodEndOf(sub)),
    cancelAtPeriodEnd: !!sub.cancel_at_period_end,
    cancelAt: tsMs(sub.cancel_at),
    card: cardOf(sub),
    pendingChange: !!sub.pending_update,
    canChange: live && !scheduled,
    canCancel: (live || st === 'past_due') && !scheduled,
    canResume: live && periodEndCancel(sub),
    laneChangeAvailableAt: laneChangeAvailableAt(pl),
    message
  };
}
// What we know locally: no plan, a legacy plan, or a plan with no Stripe
// subscription on record. Never offers self-serve change/cancel — those plans
// can only be handled by a human without risking the wrong subscription.
function localBillingStatus(u) {
  const pl = u.plan;
  const base = { managed: null, plan: null, role: null, price: null, currency: 'usd', interval: null, status: 'none', trialEnd: null, currentPeriodEnd: null, cancelAtPeriodEnd: false, cancelAt: null, card: null, pendingChange: false, canChange: false, canCancel: false, canResume: false, laneChangeAvailableAt: null, trialEligible: trialEligible(u), trialDays: STRIPE_TRIAL_DAYS, message: null };
  if (!pl) return base;
  const legacy = !PLAN_KEY_OF_TYPE[pl.type];
  return Object.assign(base, {
    managed: legacy ? 'legacy' : 'support',
    plan: PLAN_KEY_OF_TYPE[pl.type] || pl.type,
    role: pl.role || null,
    price: typeof pl.price === 'number' ? pl.price : null,
    interval: pl.type === 'founder' ? 'lifetime' : pl.type === 'allyr' ? 'year' : (pl.type === 'champ' ? null : 'month'),
    status: 'active',
    message: legacy ? LEGACY_BILLING_MSG : NO_PROFILE_MSG
  });
}
// Validate a requested plan change against the local plan. Shared by preview
// and change so the price quoted is always for a change we would accept.
function planChangeTarget(u, b) {
  const pl = u.plan;
  if (!pl) return { code: 400, error: 'You do not have a subscription to change - pick a plan to subscribe.' };
  if (!PLAN_KEY_OF_TYPE[pl.type]) return { code: 400, error: LEGACY_BILLING_MSG };
  const planKey = PLANS[b.plan] ? b.plan : '';
  if (!planKey) return { code: 400, error: 'Pick a plan: lane, all or year.' };
  const role = planKey === 'lane' ? (ROLES[b.role] ? b.role : '') : '';
  if (planKey === 'lane' && !role) return { code: 400, error: 'Pick a lane for the Lane Pass.' };
  const curKey = PLAN_KEY_OF_TYPE[pl.type];
  if (curKey === planKey && (planKey !== 'lane' || (pl.role || 'top') === role)) return { code: 400, error: 'You are already on that plan.' };
  const laneSwap = curKey === 'lane' && planKey === 'lane';
  // A "lane move" is any change that ENDS on a Lane Pass for a different lane
  // than the one last held — the direct swap, and also lane -> all/year -> other
  // lane (that round trip is free after proration credit, and during a trial
  // costs nothing at all). All of them share the once-every-7-days cooldown.
  // Returning to the lane last held is not a move.
  const lastRole = curKey === 'lane' ? (pl.role || 'top') : (pl.lastLane && ROLES[pl.lastLane.role] ? pl.lastLane.role : '');
  const laneMove = planKey === 'lane' && !!lastRole && lastRole !== role;
  if (laneMove) {
    const at = laneChangeAvailableAt(pl);
    if (at) return { code: 429, error: 'You can switch lanes once every 7 days - your next switch opens ' + fmtDay(at) + '.', laneChangeAvailableAt: at };
  }
  const interval = planKey === 'year' ? 'year' : 'month';
  const curInterval = curKey === 'year' ? 'year' : 'month';
  return { planKey, role, spec: PLANS[planKey], curKey, laneSwap, laneMove, interval, intervalChange: interval !== curInterval };
}
// Subscription states that must not be re-priced. past_due: the customer owes
// money — a change would stack new prorations on an unpaid invoice. Scheduled
// cancel: a change would charge for a plan that is about to end.
function subChangeBlock(sub) {
  const st = sub.status;
  if (st === 'past_due' || st === 'unpaid' || st === 'incomplete') return { code: 409, error: 'Your last payment did not go through - update your card in billing first, then change plans.' };
  if (st !== 'active' && st !== 'trialing') return { code: 409, error: 'This subscription has ended - pick a plan to subscribe again.' };
  if (sub.cancel_at_period_end || sub.cancel_at) return { code: 409, error: 'Your subscription is set to cancel - undo the cancellation first, then change plans.' };
  const it = subItem(sub);
  if (!it || !it.id || sub.items.data.length !== 1) return { code: 409, error: 'Your subscription needs a hand from us - email support@matchupcoach.gg to change plans.' };
  return null;
}
function changeSummary(t, o) {
  const next = money(t.spec.price) + (t.interval === 'year' ? '/yr' : '/mo');
  const lane = t.planKey === 'lane' ? ' (' + t.role + ' lane)' : '';
  if (t.laneSwap) return 'Switching lanes is free - you keep the same price and billing date. You can switch lanes once every 7 days.';
  const moveNote = t.laneMove ? ' Moving to a different lane starts the 7-day wait before your next lane change.' : '';
  if (o.trialing) return 'You are in your free trial, so switching costs nothing today. Your trial still ends on ' + fmtDay(o.trialEnd) + ', then you pay ' + next + lane + ' unless you cancel before then.' + moveNote;
  if (o.dueNow == null) {
    return (t.intervalChange
      ? 'You will be charged for the new plan today, minus a credit for the unused part of your current plan. Then ' + next + lane + ' from ' + fmtDay(o.nextDate) + '.'
      : 'You will be charged the difference for the rest of this billing period today (a downgrade becomes account credit instead). Then ' + next + lane + ' from ' + fmtDay(o.nextDate) + '.') + moveNote;
  }
  let s = o.dueNow > 0 ? 'You pay ' + money(o.dueNow) + ' today.' : 'Nothing to pay today.';
  if (o.credit > 0) s += ' ' + money(o.credit) + ' of unused time becomes account credit toward future bills.';
  return s + ' Then ' + next + lane + (o.nextDate ? ' from ' + fmtDay(o.nextDate) : '') + '.' + moveNote;
}
// One billing mutation per account at a time: two tabs clicking "change" must
// not send two price updates (two proration invoices) to Stripe.
const billingBusy = new Set();
// A failed pending_if_incomplete change leaves a pending_update plus an open
// invoice for up to 23h, and "A successful payment immediately applies the
// changes" — so paying it later (email link, 3DS, retry) would switch the plan.
// Stripe's documented way to cancel a pending update is to void the invoice the
// update created (subscription.latest_invoice; POST /v1/invoices/{id}/void —
// docs: billing/subscriptions/pending-updates, api/invoices/void). Voiding keeps
// "your plan has not changed" true. Returns true only when Stripe confirms void.
async function discardPendingUpdate(sub) {
  const inv = sub && sub.pending_update && stripeId(sub.latest_invoice);
  if (!inv) return false;
  try {
    const r = await stripeApi('POST', '/v1/invoices/' + encodeURIComponent(inv) + '/void');
    if (r.status < 400 && r.json && r.json.status === 'void') return true;
    logStripeErr('void pending-update invoice ' + inv, r);
  } catch (e) { console.error('[billing] void pending-update invoice ' + inv + ': ' + (e && e.message)); }
  return false;
}

// ----- demo-mode billing (no Stripe key): same contract, local plan only -----
function demoPeriodEnd(pl, now) {
  if (pl.trialEnd && pl.trialEnd > now) return pl.trialEnd;
  if (pl.periodEnd && pl.periodEnd > now) return pl.periodEnd;
  const iv = pl.type === 'allyr' ? 'year' : 'month';
  let t = pl.trialEnd || pl.since || now;
  for (let i = 0; t <= now && i < 1200; i++) t = addInterval(t, iv);
  return t;
}
// A demo plan set to cancel really ends at its period end (lazy, on next read).
function demoExpire(u) {
  const pl = u.plan;
  if (pl && PLAN_KEY_OF_TYPE[pl.type] && pl.cancelAtPeriodEnd && pl.periodEnd && pl.periodEnd <= Date.now()) {
    u.pastPlan = pl; u.plan = null; saveJson('users.json', users);
  }
}
function demoBillingStatus(u) {
  const pl = u.plan;
  if (!pl || !PLAN_KEY_OF_TYPE[pl.type]) return localBillingStatus(u);
  const now = Date.now();
  const trialing = !!(pl.trialEnd && pl.trialEnd > now);
  const spec = PLANS[PLAN_KEY_OF_TYPE[pl.type]];
  const end = demoPeriodEnd(pl, now);
  return {
    managed: 'demo', plan: PLAN_KEY_OF_TYPE[pl.type], role: pl.type === 'role' ? (pl.role || 'top') : null,
    price: spec.price, currency: 'usd', interval: pl.type === 'allyr' ? 'year' : 'month',
    status: trialing ? 'trialing' : 'active', trialEnd: trialing ? pl.trialEnd : null, currentPeriodEnd: end,
    cancelAtPeriodEnd: !!pl.cancelAtPeriodEnd, cancelAt: null, card: null, pendingChange: false,
    canChange: !pl.cancelAtPeriodEnd, canCancel: !pl.cancelAtPeriodEnd, canResume: !!pl.cancelAtPeriodEnd,
    laneChangeAvailableAt: laneChangeAvailableAt(pl),
    message: pl.cancelAtPeriodEnd ? 'Your subscription is set to end on ' + fmtDay(end) + '. You keep full access until then.' : null,
    demo: true
  };
}
// Repurchase guard, shared by the Stripe and demo checkouts: block any
// same-or-smaller purchase, allow only genuine upgrades (role→all/year,
// all→year, lane→lane on a DIFFERENT lane). Legacy plans are all strictly
// better than anything on sale today — founder is a paid-for LIFETIME,
// member is $1.99/mo for everything, champ has its own scope — so every
// purchase is blocked for them: replacing those plans (which fulfillment
// does unconditionally) would be a paid downgrade sold as an upgrade.
function repurchaseBlock(plan, planKey, role) {
  if (!plan) return '';
  const t = plan.type;
  if (t === 'founder' || t === 'member' || t === 'champ') {
    return 'Your account already has a legacy plan that includes more than this - buying it would replace the better plan you own. Email support@matchupcoach.gg if you want to change plans.';
  }
  const hasAll = t === 'all' || t === 'allyr';
  if (planKey === 'lane' && hasAll) return 'You already have every lane.';
  if (planKey === 'lane' && t === 'role' && plan.role === role) return 'You already have the ' + role + ' Lane Pass.';
  if (planKey === 'all' && hasAll) return 'You already have every lane.';
  if (planKey === 'year' && t === 'allyr') return 'You are already on the annual plan.';
  return '';
}
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
    // Collect Buffers and decode ONCE — `raw += chunk` decoded each chunk
    // independently, corrupting multi-byte UTF-8 split across TCP chunks.
    const chunks = [];
    let n = 0, over = false;
    req.on('data', (c) => { chunks.push(c); n += c.length; if (n > 10240) { over = true; chunks.length = 0; req.destroy(); } });
    req.on('end', () => { if (over) return resolve({}); try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); } catch (e) { resolve({}); } });
    req.on('error', () => resolve({}));
  });
}
// Raw body (unparsed) — Stripe webhook signatures are computed over the exact
// bytes, so chunks are concatenated as Buffers and decoded once. Per-chunk
// string coercion turned a multi-byte character straddling a chunk boundary
// into two U+FFFD halves, failing signature verification on any payload with
// non-ASCII (e.g. a cardholder name like "José"). Cap is byte length.
function readRawBody(req, cap) {
  cap = cap || 262144;
  return new Promise((resolve) => {
    const chunks = [];
    let n = 0;
    req.on('data', (c) => { chunks.push(c); n += c.length; if (n > cap) { chunks.length = 0; req.destroy(); } });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', () => resolve(''));
  });
}
// Verify a Stripe-Signature header (t=…,v1=…) against the raw payload.
function stripeSigOk(header, payload) {
  try {
    const parts = String(header || '').split(',').reduce((o, p) => { const i = p.indexOf('='); if (i > 0) o[p.slice(0, i).trim()] = p.slice(i + 1).trim(); return o; }, {});
    if (!parts.t || !parts.v1) return false;
    if (Math.abs(Date.now() / 1000 - parseInt(parts.t, 10)) > 600) return false; // 10-min replay window
    const expected = crypto.createHmac('sha256', STRIPE_WEBHOOK_SECRET).update(parts.t + '.' + payload).digest('hex');
    return safeEq(expected, parts.v1);
  } catch (e) { return false; }
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
// Optional map/max let other endpoints reuse the same sliding window with their
// own budget; auth callers pass only the ip and behave exactly as before.
const hits = new Map();
function throttled(ip, map, max) {
  map = map || hits;
  const now = Date.now();
  const arr = (map.get(ip) || []).filter((t) => now - t < 60000);
  arr.push(now);
  map.set(ip, arr);
  if (map.size > 5000) map.clear(); // memory backstop
  return arr.length > (max || 30);
}
// Account billing routes get their OWN budget, so an account page that polls
// status or previews every plan pick can never use up the login/signup budget
// of everyone behind the same IP (or proxy edge): 20/min per account, plus a
// looser 60/min per IP against one client cycling through many accounts.
const billingAcctHits = new Map();
const billingIpHits = new Map();
function billingThrottled(userKey, ip) {
  return throttled('u:' + userKey, billingAcctHits, 20) || throttled(ip, billingIpHits, 60);
}

// Separate, looser limiter for GET /api/wr — it's hit once per matchup view by
// anonymous visitors, so the auth throttle above is too tight for it. Fixed
// window: 60 requests per IP per minute.
const wrHits = new Map();
function wrThrottled(ip) {
  const now = Date.now();
  const h = wrHits.get(ip);
  if (!h || now - h.ts > 60000) {
    if (wrHits.size > 5000) wrHits.clear(); // memory backstop
    wrHits.set(ip, { count: 1, ts: now });
    return false;
  }
  h.count++;
  return h.count > 60;
}

// Cap the live-WR cache so live-wr.json can't grow without bound: past 50k
// entries, evict the ~1000 oldest by fetch timestamp. Call before saving.
function liveWrTrim() {
  const keys = Object.keys(liveWr);
  if (keys.length <= 50000) return;
  keys.sort((x, y) => ((liveWr[x] && liveWr[x].ts) || 0) - ((liveWr[y] && liveWr[y].ts) || 0));
  for (let i = 0; i < 1000 && i < keys.length; i++) delete liveWr[keys[i]];
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
  // Directory index: /matchup/top/darius-vs-garen/ -> .../index.html. Netlify does
  // this for free; without it the SPA fallback below would shadow the static
  // guide pages when running this server locally.
  if (withinRoot(full) && !path.extname(full)) {
    try { if (fs.statSync(full).isDirectory() && fs.existsSync(path.join(full, 'index.html'))) full = path.join(full, 'index.html'); } catch (e) {}
  }
  // SPA fallback: deep links like /matchup/aatrox-vs-darius serve the app
  // (the page uses <base href="/"> so relative assets still resolve).
  let mu = null;
  if (withinRoot(full) && !path.extname(full) && !fs.existsSync(full) && /^(matchup\/|account\/?$)/.test(rel)) {
    full = path.join(ROOT, 'MatchupCoach.dc.html');
    // accept the SEO path /matchup/leagueoflegends/lol/a-vs-b, the legacy
    // /matchup/a-vs-b, AND the lane-aware app deep link
    // /matchup/<lane>/a-vs-b/open — without the lane/open handling the greedy
    // groups swallowed the path segments and produced titles like
    // "Top/darius vs Garen/open".
    const mm = /^matchup\/(?:leagueoflegends\/lol\/|(top|mid|bot|support|jungle)\/)?(.+?)-vs-(.+?)(?:\/open)?\/?$/.exec(rel);
    if (mm) mu = { you: prettyChamp(mm[2]), foe: prettyChamp(mm[3]), aSlug: mm[2], bSlug: mm[3], lane: mm[1] || '' };
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
    // Lane-aware hits canonicalise to the lane-aware static guide (the URL the
    // sitemap actually lists); only the legacy lane-less shapes fall back to
    // the old SEO path. Dropping the lane collapsed two lanes' guides onto one
    // dead canonical (/matchup/leagueoflegends/lol/... is in no sitemap).
    const url = mu.lane
      ? PUBLIC_URL + '/matchup/' + mu.lane + '/' + mu.aSlug + '-vs-' + mu.bSlug + '/'
      : PUBLIC_URL + '/matchup/leagueoflegends/lol/' + mu.aSlug + '-vs-' + mu.bSlug;
    const pair = mu.you + ' vs ' + mu.foe;
    const ogTitle = htmlEsc(pair + ' — MatchupCoach.gg');
    const desc = htmlEsc('How to play ' + pair + ': power spikes, cooldown timers, wave plan, and win conditions for the matchup.');
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
  if (route === 'GET /api/config') return sendJson(res, 200, Object.assign({ googleClientId: GOOGLE_CLIENT_ID || null, stripeEnabled: STRIPE_ON, trialDays: STRIPE_TRIAL_DAYS }, memberState()));
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
    // Honeypot: "website" is a hidden field no human ever fills. A bot that
    // does gets a silent fake success — no account, no error to learn from.
    const trap = String(b.website || '');
    if (trap) return sendJson(res, 200, { token: '', user: null });
    if (name.length < 3) return sendJson(res, 400, { error: 'Username needs at least 3 characters.' });
    if (name.length > 24) return sendJson(res, 400, { error: 'Username must be 24 characters or fewer.' });
    if (!/^[A-Za-z0-9 ._-]+$/.test(name)) return sendJson(res, 400, { error: 'Letters, numbers, spaces, dots and dashes only.' });
    if (pass.length < 6) return sendJson(res, 400, { error: 'Password needs at least 6 characters.' });
    if (pass.length > 128) return sendJson(res, 400, { error: 'Password must be 128 characters or fewer.' });
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
    if (throttled(ip)) return sendJson(res, 429, { error: 'Too many attempts - wait a minute and try again.' });
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
    // Anti-spam: links are the classic comment-spam vector — none allowed.
    if (/(https?:\/\/|www\.|\.(com|gg|net|org|io|xyz)\b)/i.test(text)) return sendJson(res, 400, { error: "Links aren't allowed in matchup notes." });
    // Per-account pacing on top of the per-IP throttle above: at least 20s
    // between notes, at most 30 notes per UTC day.
    const nowMs = Date.now();
    if (me.cmtLast && nowMs - me.cmtLast < 20000) return sendJson(res, 429, { error: 'Give it a few seconds between notes.' });
    const utcDay = new Date(nowMs).toISOString().slice(0, 10);
    if (me.cmtDay === utcDay && (me.cmtCount | 0) >= 30) return sendJson(res, 429, { error: "That's the daily note limit — back tomorrow." });
    // Duplicate rejection: identical to one of this account's last 5 notes.
    const textHash = crypto.createHash('sha1').update(text).digest('hex');
    if (Array.isArray(me.cmtHashes) && me.cmtHashes.includes(textHash)) return sendJson(res, 400, { error: 'You already posted that.' });
    if (thread.length >= 1000) thread.shift(); // hard cap per thread
    const c = { id: crypto.randomBytes(9).toString('hex'), uk: me.key, name: me.name, text, ts: Date.now() };
    thread.push(c);
    commentsDb[key] = thread;
    // Persist the poster's anti-spam counters ONLY when a note actually posts —
    // rejections above never touch users.json.
    me.cmtLast = nowMs;
    if (me.cmtDay === utcDay) me.cmtCount = (me.cmtCount | 0) + 1;
    else { me.cmtDay = utcDay; me.cmtCount = 1; }
    me.cmtHashes = (Array.isArray(me.cmtHashes) ? me.cmtHashes : []).concat(textHash).slice(-5);
    saveJson('users.json', users);
    saveJson('comments.json', commentsDb);
    return sendJson(res, 200, { comment: { id: c.id, name: c.name, text: c.text, ts: c.ts, mine: true } });
  }

  if (route === 'POST /api/comments/delete') {
    const me = authUser(req);
    if (!me) return sendJson(res, 401, { error: 'Sign in first.' });
    const body = await readBody(req);
    const id = String(body.id || '');
    // Moderators (ADMIN_USERS env) may delete ANY note; authors only their own.
    const isAdmin = ADMIN_USERS.includes(me.key);
    let removed = false;
    for (const k of Object.keys(commentsDb)) {
      const arr = commentsDb[k];
      const i = arr.findIndex((c) => c.id === id && (isAdmin || c.uk === me.key));
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
    if (wrThrottled(ip)) return sendJson(res, 429, { error: 'Slow down.' });
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
          if (wr == null) { liveWr[key] = { wr: null, ts }; liveWrTrim(); saveJson('live-wr.json', liveWr); return { wr: null, source: null, ts }; }
          liveWr[key] = { wr, ts };
          liveWr[rkey] = { wr: Math.round((100 - wr) * 100) / 100, ts };
          liveWrTrim();
          saveJson('live-wr.json', liveWr);
          return { wr, ts, age: 0, source: 'lolalytics' };
        } catch (e) {
          if (!liveWr[key]) { liveWr[key] = { wr: null, ts: Date.now() }; liveWrTrim(); saveJson('live-wr.json', liveWr); }
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
    // Demo-mode checkout (PAYMENTS_MODE=demo): mirrors the three real plans so
    // the UI can be exercised without Stripe keys.
    const u = authUser(req);
    if (!u) return sendJson(res, 401, { error: 'Sign in to check out.' });
    // Once real Stripe payments are on, the simulated checkout is CLOSED — it
    // must never mint memberships alongside real billing.
    if (STRIPE_ON) return sendJson(res, 403, { error: 'Checkout is handled by Stripe - use the payment page.' });
    if (PAYMENTS_MODE === 'off') return sendJson(res, 503, { error: 'Payments are temporarily unavailable - try again shortly.' });
    const db = await readBody(req);
    const planKey = PLANS[db.plan] ? db.plan : 'all';
    const spec = PLANS[planKey];
    const demoRole = ROLES[db.role] ? db.role : 'top';
    // Same guard as the real Stripe checkout — the demo must mirror it.
    const demoGuardErr = repurchaseBlock(u.plan, planKey, planKey === 'lane' ? demoRole : '');
    if (demoGuardErr) return sendJson(res, 400, { error: demoGuardErr });
    const planObj = { type: spec.type, price: spec.price, since: Date.now() };
    if (spec.type === 'role') planObj.role = demoRole;
    // Same first-time-only trial rule as the real Stripe checkout. The demo
    // "fulfils" instantly, so granting and burning the trial here is the
    // equivalent of fulfillStripeSession doing it — evaluate BEFORE the plan
    // is written, since having a plan is what makes an account ineligible.
    const demoTrial = trialEligible(u);
    if (demoTrial) planObj.trialEnd = planObj.since + STRIPE_TRIAL_DAYS * 864e5;
    const demoKeptNum = (u.plan && u.plan.memberNum) || (u.pastPlan && u.pastPlan.memberNum);
    if (!demoKeptNum) { founders.claimed = (founders.claimed | 0) + 1; saveJson('founders.json', founders); }
    planObj.memberNum = demoKeptNum || founders.claimed;
    if (demoTrial) users[u.key].trialUsed = true;
    users[u.key].plan = planObj;
    saveJson('users.json', users);
    const charged = (demoTrial ? 'Free for ' + STRIPE_TRIAL_DAYS + ' days, then ' : '') + spec.label + spec.per + (spec.type === 'role' ? ' - ' + planObj.role + ' lane' : ' - all lanes');
    return sendJson(res, 200, { user: publicUser(users[u.key]), charged, trial: demoTrial, founders: founderState() });
  }

  // ----- Real Stripe Checkout (hosted): create a session, redirect, confirm -----
  // Three plans. The price ID picked HERE is what Stripe bills this subscriber
  // until they cancel — later catalogue changes only affect NEW sessions.
  // Buying while already subscribed is allowed ON PURPOSE: it's the upgrade
  // path (lane → all/annual). fulfillStripeSession replaces the plan and
  // cancels the old Stripe subscription so nobody is double-billed.
  if (route === 'POST /api/stripe/checkout') {
    const u = authUser(req);
    if (!u) return sendJson(res, 401, { error: 'Sign in to check out.' });
    if (!STRIPE_ON) return sendJson(res, 503, { error: 'Payments are not switched on yet.' });
    const cb = await readBody(req);
    const planKey = PLANS[cb.plan] ? cb.plan : 'all';
    const spec = PLANS[planKey];
    const role = planKey === 'lane' ? (ROLES[cb.role] ? cb.role : '') : '';
    if (planKey === 'lane' && !role) return sendJson(res, 400, { error: 'Pick a lane for the Lane Pass.' });
    const guardErr = repurchaseBlock(u.plan, planKey, role);
    if (guardErr) return sendJson(res, 400, { error: guardErr });
    const priceId = STRIPE_PLAN_PRICE()[planKey];
    if (!priceId) return sendJson(res, 503, { error: 'This plan is not configured yet.' });
    const params = {
      success_url: PUBLIC_URL + '/?mc_checkout=success&session_id={CHECKOUT_SESSION_ID}',
      cancel_url: PUBLIC_URL + '/?mc_checkout=cancel',
      client_reference_id: u.key,
      'metadata[plan]': planKey,
      'metadata[role]': role,
      'metadata[price]': String(spec.price),
      mode: 'subscription',
      'line_items[0][quantity]': 1,
      'line_items[0][price]': priceId
    };
    if (!STRIPE_MANAGED) params['managed_payments[enabled]'] = 'false';
    // First-time subscribers get the free trial (see trialEligible). Stripe's
    // default subscription Checkout still collects the card, so the first
    // charge happens automatically at trial end unless they cancel.
    // metadata[trial] is what fulfillment reads to burn the one-per-account
    // trial. Two checkout tabs opened while eligible can both complete as
    // trials; the second replaces the first (upgrade path), so the most extra
    // free time possible is the <=24h a Checkout Session stays open.
    if (trialEligible(u)) {
      params['subscription_data[trial_period_days]'] = STRIPE_TRIAL_DAYS;
      params['metadata[trial]'] = '1';
      if (STRIPE_TRIAL_NO_CARD) {
        params.payment_method_collection = 'if_required';
        params['subscription_data[trial_settings][end_behavior][missing_payment_method]'] = 'cancel';
      }
    }
    // Reuse the buyer's existing Stripe customer so an upgrade's new
    // subscription lands on the SAME customer as the old one — that keeps the
    // billing portal able to show (and cancel) everything they're paying for.
    // Without this, every session minted a fresh customer and a failed
    // auto-cancel left an orphaned sub the portal could never reach.
    const existingCust = u.plan && typeof u.plan.custId === 'string' && /^cus_/.test(u.plan.custId) ? u.plan.custId : '';
    if (existingCust) params.customer = existingCust;
    try {
      let r = await stripeApi('POST', '/v1/checkout/sessions', params);
      // Stale/deleted customer id must not block a purchase — retry fresh.
      // ONLY for that cause (resource_missing): retrying every 4xx/5xx without
      // `customer` minted a duplicate Stripe customer on a transient 429/500,
      // permanently splitting the buyer's billing identity.
      const custGone = r.status >= 400 && r.json && r.json.error &&
        (r.json.error.code === 'resource_missing' || /No such customer/i.test(r.json.error.message || ''));
      if (custGone && existingCust) {
        delete params.customer;
        r = await stripeApi('POST', '/v1/checkout/sessions', params);
      }
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
    if (!checkoutSessionUnlocks(sess)) return sendJson(res, 402, { error: 'Payment not completed.' });
    const didFulfil = fulfillStripeSession(sid, sess);
    // Trial buyers: pull the trial end onto the plan now so the page they land
    // on can say "free until …". Paid sessions skip this (no extra Stripe call).
    if (didFulfil && (sess.metadata || {}).trial === '1') await refreshPlanFromStripe(users[u.key]);
    return sendJson(res, 200, { user: publicUser(users[u.key]), founders: founderState() });
  }

  // ----- Stripe webhook: the safety net + lifecycle feed -----
  // Fulfills paid checkouts even if the buyer never returns to the site
  // (closed tab, different browser), and revokes access when a subscription is
  // cancelled/expires. Configure in Stripe: Developers → Webhooks → endpoint
  // https://matchupcoach.gg/api/stripe/webhook with events
  // checkout.session.completed + customer.subscription.deleted, then set
  // STRIPE_WEBHOOK_SECRET (whsec_…) in the environment. Adding
  // customer.subscription.updated as well switches on the plan-sync branch
  // (portal changes, trial conversion, late-paid plan changes).
  // ----- Account management: status / cancel / resume / preview / change -----
  // Owner request: "a whole account management where they can cancel very
  // easily and change subscriptions". The hosted portal (below) stays for card
  // updates and invoices; its plan switching is OFF, so plan changes live here
  // where the lane/all/year rules and the lane-swap cooldown can be enforced.
  // All of these are throttled per account and per IP (billingThrottled — a
  // budget separate from login/signup): each one costs a Stripe API call.
  const BILLING_ROUTES = { 'GET /api/billing/status': 1, 'POST /api/billing/cancel': 1, 'POST /api/billing/resume': 1, 'POST /api/billing/preview': 1, 'POST /api/billing/change': 1 };
  if (BILLING_ROUTES[route]) {
    const u = authUser(req);
    if (!u) return sendJson(res, 401, { error: 'Sign in first.' });
    if (billingThrottled(u.key, ip)) return sendJson(res, 429, { error: 'Too many attempts - wait a minute and try again.' });
    const body = req.method === 'POST' ? await readBody(req) : {};
    const withUser = (st) => Object.assign(st, { user: publicUser(u) });

    // ---------- demo mode (no Stripe key) ----------
    // Mirrors the Stripe contract against the local plan so the account page
    // can be built and clicked through locally. Mutations are only allowed in
    // PAYMENTS_MODE=demo, same as the demo checkout: a keyless production box
    // (PAYMENTS_MODE=off) must never hand out a free upgrade.
    if (!STRIPE_ON) {
      demoExpire(u);
      if (route === 'GET /api/billing/status') return sendJson(res, 200, demoBillingStatus(u));
      const pl = u.plan;
      if (route !== 'POST /api/billing/preview' && PAYMENTS_MODE !== 'demo') return sendJson(res, 503, { error: 'Billing changes are temporarily unavailable - try again shortly.' });
      const now = Date.now();
      if (route === 'POST /api/billing/cancel' || route === 'POST /api/billing/resume') {
        if (!pl) return sendJson(res, 400, { error: 'No active membership to manage.' });
        if (!PLAN_KEY_OF_TYPE[pl.type]) return sendJson(res, 400, { error: LEGACY_BILLING_MSG });
        if (route === 'POST /api/billing/cancel') { pl.periodEnd = demoPeriodEnd(pl, now); pl.cancelAtPeriodEnd = true; }
        else if (!pl.cancelAtPeriodEnd) return sendJson(res, 409, { error: 'Your subscription is not set to cancel.' });
        else delete pl.cancelAtPeriodEnd;
        saveJson('users.json', users);
        return sendJson(res, 200, withUser(demoBillingStatus(u)));
      }
      const t = planChangeTarget(u, body);
      if (t.error) return sendJson(res, t.code, { error: t.error, laneChangeAvailableAt: t.laneChangeAvailableAt || null });
      if (pl.cancelAtPeriodEnd) return sendJson(res, 409, { error: 'Your subscription is set to cancel - undo the cancellation first, then change plans.' });
      const trialing = !!(pl.trialEnd && pl.trialEnd > now);
      const end = demoPeriodEnd(pl, now);
      if (route === 'POST /api/billing/preview') {
        // Rough local estimate of Stripe's proration so the UI has real numbers.
        const cur = PLANS[t.curKey];
        const curLen = t.curKey === 'year' ? 365 * 864e5 : 30 * 864e5;
        const left = Math.max(0, Math.min(1, (end - now) / curLen));
        let dueNow = 0, credit = 0;
        if (!trialing && !t.laneSwap) {
          const net = t.intervalChange ? t.spec.price - cur.price * left : (t.spec.price - cur.price) * left;
          dueNow = Math.max(0, Math.round(net * 100) / 100); credit = Math.max(0, Math.round(-net * 100) / 100);
        }
        const nextDate = trialing ? pl.trialEnd : (t.intervalChange && !t.laneSwap ? addInterval(now, t.interval) : end);
        return sendJson(res, 200, { ok: true, demo: true, plan: t.planKey, role: t.role || null, price: t.spec.price, interval: t.interval, laneSwap: t.laneSwap, trialing, dueNow, credit, currency: 'usd', nextAmount: t.spec.price, nextDate, previewAvailable: true, summary: changeSummary(t, { trialing, trialEnd: pl.trialEnd, dueNow, credit, nextDate }) });
      }
      // POST /api/billing/change (demo)
      if (t.laneSwap) pl.role = t.role;
      else {
        applyPlanType(pl, t.planKey, t.role, now);
        if (!trialing && t.intervalChange) pl.periodEnd = addInterval(now, t.interval);
        pl.changedAt = now;
      }
      if (t.laneMove) pl.laneChangedAt = now;
      saveJson('users.json', users);
      return sendJson(res, 200, withUser(demoBillingStatus(u)));
    }

    // ---------- Stripe ----------
    const pl = u.plan;
    if (route === 'GET /api/billing/status') {
      if (!stripeManaged(pl)) return sendJson(res, 200, localBillingStatus(u));
      const got = await fetchOwnedSub(pl);
      if (got.error) return sendJson(res, got.code, { error: got.error });
      if (u.plan === pl) {
        const adopted = adoptPaidUpgrade(pl, got.sub);
        if (syncPlanDates(pl, got.sub) || adopted) saveJson('users.json', users);
      }
      return sendJson(res, 200, billingStatusFromSub(u, got.sub));
    }
    let t = null;
    if (route === 'POST /api/billing/preview' || route === 'POST /api/billing/change') {
      t = planChangeTarget(u, body);
      if (t.error) return sendJson(res, t.code, { error: t.error, laneChangeAvailableAt: t.laneChangeAvailableAt || null });
    }
    if (!pl) return sendJson(res, 400, { error: 'No active membership to manage.' });
    if (!PLAN_KEY_OF_TYPE[pl.type]) return sendJson(res, 400, { error: LEGACY_BILLING_MSG });
    if (!stripeManaged(pl)) return sendJson(res, 409, { error: NO_PROFILE_MSG });
    const mutating = route !== 'POST /api/billing/preview';
    if (mutating && billingBusy.has(u.key)) return sendJson(res, 409, { error: 'Another billing change is still going through - give it a few seconds.' });
    if (mutating) billingBusy.add(u.key);
    try {
      const got = await fetchOwnedSub(pl);
      if (got.error) return sendJson(res, got.code, { error: got.error });
      const sub = got.sub;
      // A parked plan change Stripe has since applied (see adoptPaidUpgrade):
      // adopt it first, then re-validate the request against the real plan so
      // e.g. "change to year" from someone already paying yearly is a no-op.
      if (u.plan === pl && adoptPaidUpgrade(pl, sub)) {
        saveJson('users.json', users);
        if (t) {
          t = planChangeTarget(u, body);
          if (t.error) return sendJson(res, t.code, { error: t.error, laneChangeAvailableAt: t.laneChangeAvailableAt || null });
        }
      }
      const subPath = '/v1/subscriptions/' + encodeURIComponent(pl.subId);
      // Stripe's update response isn't expanded — carry the card over from the read.
      const statusAfter = (updated) => withUser(billingStatusFromSub(u, Object.assign({}, updated, { default_payment_method: sub.default_payment_method, customer: sub.customer })));
      // Stripe's own error text is logged, never shown (logStripeErr).
      const apiErr = (r, fallback) => { logStripeErr(route + ' ' + pl.subId, r); return sendJson(res, 502, { error: fallback }); };

      if (route === 'POST /api/billing/cancel') {
        // Cancel at PERIOD END, never immediately: they keep what they paid for,
        // and during a trial the period end IS the trial end — so a trial user
        // who cancels is never charged. Access ends when Stripe fires
        // customer.subscription.deleted (existing revoke below).
        if (!(sub.status === 'active' || sub.status === 'trialing' || sub.status === 'past_due')) return sendJson(res, 409, { error: 'This subscription has already ended.' });
        if (sub.cancel_at_period_end) return sendJson(res, 200, statusAfter(sub)); // already scheduled: idempotent
        const r = await stripeApi('POST', subPath, { cancel_at_period_end: true });
        if (r.status >= 400 || !r.json || !r.json.cancel_at_period_end) return apiErr(r, 'Could not cancel - try again, or email support@matchupcoach.gg.');
        if (u.plan === pl) { syncPlanDates(pl, r.json); saveJson('users.json', users); }
        return sendJson(res, 200, statusAfter(r.json));
      }

      if (route === 'POST /api/billing/resume') {
        // Undo is only possible before the period ends (Stripe can't revive a
        // canceled subscription). Two ways a period-end cancel is recorded:
        // cancel_at_period_end=true (this site's cancel) -> set it false, the
        // documented undo; or, in flexible billing mode, the customer portal's
        // cancel_at = period end -> unset cancel_at with an empty string (Stripe's
        // convention for clearing a parameter). proration_behavior none: the
        // cancel date equals the period end, so removing it changes no period.
        // A cancel_at BEFORE the period end is a custom date: left to support.
        if (!(sub.status === 'active' || sub.status === 'trialing')) return sendJson(res, 409, { error: 'This subscription has already ended - pick a plan to subscribe again.' });
        if (!periodEndCancel(sub)) return sendJson(res, 409, { error: sub.cancel_at ? 'Your cancellation date was set by support - email support@matchupcoach.gg to keep your plan.' : 'Your subscription is not set to cancel.' });
        const viaFlag = !!sub.cancel_at_period_end;
        const r = await stripeApi('POST', subPath, viaFlag ? { cancel_at_period_end: false } : { cancel_at: '', proration_behavior: 'none' });
        if (r.status >= 400 || !r.json || r.json.cancel_at_period_end || (!viaFlag && r.json.cancel_at)) return apiErr(r, 'Could not undo the cancellation - try again, or email support@matchupcoach.gg.');
        if (u.plan === pl) { syncPlanDates(pl, r.json); saveJson('users.json', users); }
        return sendJson(res, 200, statusAfter(r.json));
      }

      // preview + change
      const block = subChangeBlock(sub);
      if (block) return sendJson(res, block.code, { error: block.error });
      const it = subItem(sub);
      const trialing = sub.status === 'trialing';
      const trialEndMs = tsMs(sub.trial_end);
      const curEnd = tsMs(periodEndOf(sub));
      const priceId = t.laneSwap ? '' : STRIPE_PLAN_PRICE()[t.planKey];
      if (!t.laneSwap && !priceId) return sendJson(res, 503, { error: 'This plan is not configured yet.' });
      // A paying member's interval change (month<->year) resets the billing
      // cycle anchor to now EXPLICITLY. This account's subscriptions default to
      // flexible billing mode, where "The billing_cycle_anchor is never
      // automatically reset" (docs: billing/subscriptions/billing-mode/compare) —
      // without it a monthly member moving to yearly would be billed against the
      // OLD anchor while being told "renews one year from today".
      // billing_cycle_anchor accepts now|unchanged on update and on
      // create_preview for an existing subscription, and is on the
      // pending_if_incomplete supported-attribute list. During a trial trial_end
      // already sets the anchor, so it is not sent.
      const anchorNow = !trialing && !t.laneSwap && t.intervalChange;
      let nextDate = trialing ? trialEndMs : (anchorNow ? addInterval(Date.now(), t.interval) : curEnd);

      if (route === 'POST /api/billing/preview') {
        const out = { ok: true, plan: t.planKey, role: t.role || null, price: t.spec.price, interval: t.interval, laneSwap: t.laneSwap, trialing, dueNow: null, credit: 0, currency: 'usd', nextAmount: t.spec.price, nextDate, prorationDate: null, previewAvailable: false };
        if (t.laneSwap || trialing) {
          // Nothing is charged for a lane swap or during a trial — no need to ask Stripe.
          out.dueNow = 0; out.previewAvailable = true;
        } else {
          // Quote with exactly the proration settings /change will use.
          // proration_date pins the proration second; /change reuses it if the
          // client sends it back promptly, so the charge matches the quote.
          const prorationDate = Math.floor(Date.now() / 1000);
          const previewParams = {
            customer: pl.custId,
            subscription: pl.subId,
            'subscription_details[items][0][id]': it.id,
            'subscription_details[items][0][price]': priceId,
            'subscription_details[proration_behavior]': 'always_invoice',
            'subscription_details[proration_date]': prorationDate
          };
          if (anchorNow) previewParams['subscription_details[billing_cycle_anchor]'] = 'now';
          try {
            const r = await stripeApi('POST', '/v1/invoices/create_preview', previewParams);
            if (r.status < 400 && r.json && typeof r.json.amount_due === 'number') {
              out.dueNow = Math.max(0, r.json.amount_due) / 100;
              out.credit = typeof r.json.total === 'number' && r.json.total < 0 ? -r.json.total / 100 : 0;
              out.currency = r.json.currency || 'usd';
              out.prorationDate = prorationDate;
              out.previewAvailable = true;
              // Renewal date as Stripe computes it, not our own arithmetic.
              const stripeNext = anchorNow ? previewNewPeriodEnd(r.json) : null;
              if (stripeNext) { nextDate = stripeNext; out.nextDate = stripeNext; }
            } else logStripeErr('create_preview ' + pl.subId, r);
          } catch (e) { /* fall through to the plain-text summary */ }
        }
        out.summary = changeSummary(t, { trialing, trialEnd: trialEndMs, dueNow: out.dueNow, credit: out.credit, nextDate });
        return sendJson(res, 200, out);
      }

      // ---- POST /api/billing/change ----
      if (u.plan !== pl) return sendJson(res, 409, { error: 'Your plan just changed - reload and try again.' });
      if (t.laneSwap) {
        // Same price, same billing: nothing for Stripe to charge. Record the
        // lane on the subscription too so Stripe's view matches ours.
        const r = await stripeApi('POST', subPath, { 'metadata[plan]': 'lane', 'metadata[role]': t.role });
        if (r.status >= 400 || !r.json || !r.json.id) return apiErr(r, 'Could not switch lanes - try again.');
        pl.role = t.role; pl.laneChangedAt = Date.now(); // a direct swap is always a lane move
        syncPlanDates(pl, r.json); saveJson('users.json', users);
        return sendJson(res, 200, statusAfter(r.json));
      }
      const params = {
        'items[0][id]': it.id,
        'items[0][price]': priceId,
        'metadata[plan]': t.planKey,
        'metadata[role]': t.role
      };
      if (trialing) {
        // During a trial: keep the SAME trial end (a switch must not restart or
        // extend the free period), and prorate nothing — trial time is free.
        // Passing trial_end also pins the billing anchor to it, so even a
        // month->year switch doesn't bill today. With nothing due now there is
        // no payment to fail, so no payment_behavior is needed.
        params.trial_end = sub.trial_end;
        params.proration_behavior = 'none';
      } else {
        // Paying member: bill the difference NOW (always_invoice) and apply the
        // change only if that payment succeeds (pending_if_incomplete). With the
        // default allow_incomplete a declined card would still switch the plan
        // and leave the sub past_due — i.e. hand out annual/all-lanes access
        // unpaid. pending_if_incomplete only supports a limited attribute set
        // (items price/quantity, metadata, proration_behavior/date, trial_end,
        // billing_cycle_anchor...) — every param sent here is on that list;
        // cancel_at_period_end is not, which is one more reason a
        // scheduled-to-cancel sub is refused above. An interval change also
        // sends billing_cycle_anchor=now (see anchorNow): new full period from
        // today minus credit for unused time, renewing one interval from today.
        params.payment_behavior = 'pending_if_incomplete';
        params.proration_behavior = 'always_invoice';
        if (anchorNow) params.billing_cycle_anchor = 'now';
        const pd = parseInt(body.prorationDate, 10);
        const nowS = Math.floor(Date.now() / 1000);
        if (pd && pd <= nowS && nowS - pd <= 600) params.proration_date = pd;
      }
      // Payment for the change failed: make sure nothing stays parked that a
      // later payment could apply (discardPendingUpdate voids its invoice). If
      // the void itself fails, say what is really true: the change is waiting
      // on that invoice (and adoptPaidUpgrade will follow it if it is paid).
      const failedChange = async (parked, declined) => {
        const voided = parked ? await discardPendingUpdate(parked) : false;
        if (parked && parked.pending_update && !voided) {
          return sendJson(res, 402, { error: 'The payment for this change did not go through, so your plan has not changed yet. Stripe has an open invoice for it: if that invoice gets paid, the change goes through and your account updates. Update your card in billing, or email support@matchupcoach.gg to drop the change.', pendingChange: true });
        }
        return sendJson(res, 402, { error: declined ? 'Your card was declined - your plan has not changed. Update your card in billing and try again.' : 'The payment for this change did not go through - your plan has not changed. Update your card in billing and try again.', pendingChange: false });
      };
      let r;
      try { r = await stripeApi('POST', subPath, params); } catch (e) { return sendJson(res, 502, { error: 'Could not reach Stripe - your plan has not changed.' }); }
      const err = r.json && r.json.error;
      if (r.status === 402 || (err && err.type === 'card_error')) {
        // Documented failure shape is a 200 with pending_update, but if Stripe
        // answers with an error, re-read the sub in case an update got parked anyway.
        let parked = null;
        if (!trialing) { try { const g = await stripeApi('GET', subPath); if (g.status < 400 && g.json && g.json.pending_update) parked = g.json; } catch (e) { /* nothing parked we can see */ } }
        return failedChange(parked, true);
      }
      if (r.status >= 400 || !r.json || !r.json.id) return apiErr(r, 'Could not change your plan - it has not changed. Try again, or email support@matchupcoach.gg.');
      // A populated pending_update means the payment failed and Stripe parked
      // the change: "A successful payment immediately applies the changes in
      // the pending_update hash" (up to 23h later). It is discarded right away,
      // so the member keeps — and pays for — exactly what they had.
      const newItem = subItem(r.json);
      const newPrice = newItem && newItem.price && (newItem.price.id || newItem.price);
      if (r.json.pending_update || newPrice !== priceId) return failedChange(r.json.pending_update ? r.json : null, false);
      // Paid (or free during a trial): update access immediately so what they
      // can open matches what they now pay. Identity fields — subId, custId,
      // memberNum, sessCreated, since — are kept: it's the same subscription.
      applyPlanType(pl, t.planKey, t.role, Date.now());
      if (t.laneMove) pl.laneChangedAt = Date.now();
      pl.changedAt = Date.now();
      syncPlanDates(pl, r.json);
      saveJson('users.json', users);
      return sendJson(res, 200, statusAfter(r.json));
    } catch (e) {
      return sendJson(res, 502, { error: 'Could not reach Stripe.' });
    } finally {
      if (mutating) billingBusy.delete(u.key);
    }
  }

  // ----- Cancel anytime: open Stripe's billing portal for this member -----
  // The site promises 'cancel anytime from your account' at every subscribe
  // point; without this there was no way to act on it except emailing support.
  if (route === 'POST /api/billing/portal') {
    const u = authUser(req);
    if (!u) return sendJson(res, 401, { error: 'Sign in first.' });
    const plan = u.plan;
    // Sweep any replaced-but-not-yet-cancelled subscriptions (a failed
    // auto-cancel during an upgrade) BEFORE any early return — an orphan must
    // stay retryable even after the plan itself is revoked (cancelled/lapsed),
    // otherwise the customer keeps being billed with no self-serve recovery.
    if (STRIPE_ON && u.orphanSubs && u.orphanSubs.length) await Promise.all(u.orphanSubs.slice().map((s) => cancelStripeSub(u, s)));
    // Any paid subscription plan can be managed (role/all/allyr + legacy member).
    if (!plan || !(plan.type === 'member' || plan.type === 'role' || plan.type === 'all' || plan.type === 'allyr')) return sendJson(res, 400, { error: 'No active membership to manage.' });
    if (!STRIPE_ON) return sendJson(res, 503, { error: 'Billing management opens once payments are live. Email support@matchupcoach.gg to cancel.' });
    if (!plan.custId) return sendJson(res, 409, { error: 'We could not find your billing profile - email support@matchupcoach.gg and we will cancel it for you.' });
    try {
      const r = await stripeApi('POST', '/v1/billing_portal/sessions', {
        customer: plan.custId,
        return_url: PUBLIC_URL + '/'
      });
      if (r.status >= 400 || !r.json.url) return sendJson(res, 502, { error: (r.json.error && r.json.error.message) || 'Could not open the billing portal.' });
      return sendJson(res, 200, { url: r.json.url });
    } catch (e) { return sendJson(res, 502, { error: 'Could not reach Stripe.' }); }
  }

  if (route === 'POST /api/stripe/webhook') {
    if (!STRIPE_WEBHOOK_SECRET) return sendJson(res, 503, { error: 'Webhook not configured.' });
    const raw = await readRawBody(req);
    if (!raw || !stripeSigOk(req.headers['stripe-signature'], raw)) return sendJson(res, 400, { error: 'Bad signature.' });
    let event; try { event = JSON.parse(raw); } catch (e) { return sendJson(res, 400, { error: 'Bad payload.' }); }
    const obj = event.data && event.data.object;
    if (event.type === 'checkout.session.completed' && obj && checkoutSessionUnlocks(obj)) {
      // 'paid' exactly as before; plus a trial checkout (no_payment_required on
      // a subscription session) — see checkoutSessionUnlocks.
      const didFulfil = fulfillStripeSession(obj.id, obj);
      // Fill the trial end in the background: answering Stripe promptly
      // matters more, and the plan is already granted either way.
      if (didFulfil && (obj.metadata || {}).trial === '1') {
        const buyer = users[obj.client_reference_id];
        if (buyer) refreshPlanFromStripe(buyer).catch(() => {});
      }
    } else if (event.type === 'customer.subscription.updated' && obj && obj.id) {
      // Dormant until the owner adds this event to the webhook endpoint. Keeps
      // the local plan in step with changes made outside this site (portal
      // cancel/undo, a trial converting, a parked pending_update finally paid).
      const prevAttrs = (event.data && event.data.previous_attributes) || {};
      const evMs = (event.created | 0) * 1000;
      for (const k of Object.keys(users)) {
        const pl = users[k].plan;
        if (!pl || pl.subId !== obj.id) continue;
        // Legacy lifetime/champ plans are never touched by subscription events.
        if (pl.type === 'founder' || pl.type === 'champ') break;
        if (!(pl.type === 'member' || pl.type === 'role' || pl.type === 'all' || pl.type === 'allyr')) break;
        // Stripe doesn't guarantee delivery order: ignore an event older than
        // the newest one already applied to this plan.
        if (evMs && pl.subEventAt && evMs < pl.subEventAt) break;
        // Terminal states end access exactly like customer.subscription.deleted
        // (with retries-then-cancel configured, deleted normally arrives too;
        // this also covers an "unpaid" setting). past_due keeps access while
        // Stripe retries.
        if (obj.status === 'canceled' || obj.status === 'unpaid' || obj.status === 'incomplete_expired') {
          users[k].pastPlan = pl; users[k].plan = null; saveJson('users.json', users);
          break;
        }
        // member: revoke-only, same rules as today — never re-typed or re-dated.
        if (pl.type === 'member') break;
        syncPlanDates(pl, obj);
        // Re-type ONLY when this event says the price itself changed — the
        // previous item price id is present AND differs from the current one —
        // and the new price maps to a known plan. On this API version the
        // billing period lives on the items, so every renewal and trial
        // conversion puts `items` in previous_attributes with the price
        // unchanged; that must never rewrite access. A change this server
        // already applied locally (changedAt is set after Stripe confirmed it)
        // isn't re-applied by its own echo.
        const it = subItem(obj);
        const curPriceId = it && it.price && (it.price.id || it.price);
        const prevItem = prevAttrs.items && Array.isArray(prevAttrs.items.data) ? prevAttrs.items.data[0] : null;
        const prevPriceId = prevItem && prevItem.price ? stripeId(prevItem.price) : '';
        if (prevPriceId && curPriceId && prevPriceId !== curPriceId && !(evMs && pl.changedAt && evMs < pl.changedAt)) {
          const key = planKeyForPrice(curPriceId);
          if (key) applyPlanType(pl, key, obj.metadata && obj.metadata.role, evMs || Date.now());
        }
        if (evMs) pl.subEventAt = evMs;
        saveJson('users.json', users);
        break;
      }
    } else if (event.type === 'customer.subscription.deleted' && obj && obj.id) {
      // Subscription ended (cancelled or payment failed out) — remove access.
      // Matching on subId means an upgrade's auto-cancel of the OLD sub can
      // never revoke the NEW plan (its subId already points at the new sub).
      for (const k of Object.keys(users)) {
        const pl = users[k].plan;
        if (pl && pl.subId === obj.id && (pl.type === 'member' || pl.type === 'role' || pl.type === 'all' || pl.type === 'allyr')) {
          users[k].pastPlan = pl; users[k].plan = null; saveJson('users.json', users);
          break;
        }
      }
    }
    return sendJson(res, 200, { received: true });
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

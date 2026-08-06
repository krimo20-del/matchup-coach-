# Deploying MatchupCoach to matchupcoach.gg

**Current topology (what is actually live):**

- **Netlify serves the site** at `matchupcoach.gg` — the app
  (`MatchupCoach.dc.html`), all champion data, and the ~12,000 static matchup
  guide pages, which Netlify BUILDS on every deploy by running
  `node _gen_seo_pages.js` (see `netlify.toml`). The guides are gitignored, so
  they are always regenerated from the current champion data.
- **Render runs the API** (`server.js` — accounts, membership, Stripe, comments).
  `netlify.toml` proxies `/api/*` to the Render service, so the browser only
  ever talks to `matchupcoach.gg` and there is no CORS to configure.

So: front end + SEO pages = Netlify (deploys on `git push`); accounts, payments
and the persistent disk = Render. Sections 2–3 below cover the Render service
and DNS; Stripe (section 4) is configured in the **Render** environment because
that is where the API runs.

## 1. Push the code to GitHub (one time)

1. Create a GitHub account if you don't have one: https://github.com/signup
2. Create a new **private** repository named `matchupcoach` (no README, empty).
3. In a terminal in this project folder, run (use the URL GitHub shows you):

       git remote add origin https://github.com/YOURNAME/matchupcoach.git
       git push -u origin main

   Git will pop up a GitHub login window the first time.

## 2. Create the Render service

1. Sign up at https://render.com (choose "Sign in with GitHub" — easiest).
2. Click **New +** → **Blueprint** → select the `matchupcoach` repo.
   Render reads `render.yaml` and creates everything: the web service, the
   persistent 1 GB disk for accounts/founder counter, and the env vars.
3. Approve the plan. **Starter ($7/mo) + the disk (~$0.25/mo) is required** —
   a free instance wipes its disk on every restart, which would delete all
   user accounts and reset the founder counter.
4. Wait for the first deploy to go green, then open the
   `https://matchupcoach.onrender.com`-style URL it gives you and check the
   site loads and `/api/health` returns `{"ok":true}`.

## 3. Point matchupcoach.gg at it (GoDaddy)

1. In Render: your service → **Settings** → **Custom Domains** →
   add `matchupcoach.gg` and `www.matchupcoach.gg`.
   Render then shows you the exact DNS records it wants (an **A record** for
   the bare domain and a **CNAME** for www).
2. In GoDaddy: **My Products** → matchupcoach.gg → **DNS** →
   - Edit/add the **A** record: Name `@`, Value = the IP Render showed.
   - Edit/add the **CNAME** record: Name `www`, Value = the
     `xxxx.onrender.com` target Render showed.
   - Delete any old "Parked" A records GoDaddy put there.
3. Back in Render, click **Verify** on both domains. HTTPS certificates are
   issued automatically. DNS can take from minutes up to ~an hour.

## 4. Stripe — LIVE configuration

Payments run on the **live account** `acct_1TwwUSKkkqlXWkI3`. Three prices are
sold: **Lane $1.99/mo**, **All $3.99/mo**, **Annual $24.99/yr**.

Set these in Render → **Environment**:

       STRIPE_SECRET_KEY      = sk_live_…   (live secret key, Developers → API keys)
       STRIPE_WEBHOOK_SECRET  = whsec_…    (signing secret of webhook we_1U1VRhKkkqlXWkI37m92oOmA)
       STRIPE_PRICE_FOUNDING  = price_1U1VNZKkkqlXWkI3JQ4kAiRS   (Lane $1.99 — legacy env name, reads as LANE)
       STRIPE_PRICE_STANDARD  = price_1U1VNaKkkqlXWkI3Js7b4sRE   (All $3.99)
       STRIPE_PRICE_ALLYR     = price_1U1VNZKkkqlXWkI3UVtiw6uZ   (Annual $24.99)
       PUBLIC_URL             = https://matchupcoach.gg
       DATA_DIR               = /data

- The webhook is `we_1U1VRhKkkqlXWkI37m92oOmA` →
  `https://matchupcoach.gg/api/stripe/webhook`, listening to two events:
  `checkout.session.completed` + `customer.subscription.deleted`.
- **`DATA_DIR=/data` is REQUIRED** — it points the server at the persistent
  disk. Without it, accounts and memberships are written to the ephemeral
  filesystem and are wiped on every deploy/restart.
- `numInstances` must stay 1 — file-backed in-memory state.

Without `STRIPE_WEBHOOK_SECRET` set, someone who pays and closes the tab before
returning is charged with no access, and cancellations never revoke access.

### 4a. Sandbox (historical reference only — superseded by the live config above)

The **Matchupcoach.gg sandbox** (`acct_1TwwUeKhe9XAP2K5`) was used for the
test-mode dry run. It is a SEPARATE account — none of its ids exist in live
mode:

| Thing | Value |
|---|---|
| Product | `MatchupCoach Membership` — `prod_V1VtQdJ2I9aCSL` |
| FOUNDING price | `price_1U1SrXKhe9XAP2K5vEzYo8SA` — US$1.99/month |
| STANDARD price | `price_1U1SrXKhe9XAP2K5GkltlMSO` — US$3.99/month |
| Webhook | `we_1U1Sy0Khe9XAP2K569FXzCDN` → `https://matchupcoach.gg/api/stripe/webhook` (2 events) |
| Portal config | `bpc_1U1SzzKhe9XAP2K5I4V74Ujv` — cancel at period end, plan switching OFF |

Plan switching is deliberately OFF so a member can never move themselves onto
another price and lose their lock. To dry-run again, swap the env vars to the
sandbox `sk_test_…` key, sandbox price ids, and sandbox `whsec_…`, then
subscribe with test card `4242 4242 4242 4242`, any future expiry, any CVC.
Success returns to `/?mc_checkout=success&session_id=…`, which the app confirms
server-side before unlocking; check the webhook's **Event deliveries** tab
shows a 200, and that "Manage membership" opens the portal.

## 5. After it's live

- `https://matchupcoach.gg` — the site, accounts, member counter: all live.
- Without Stripe keys, payments run as `PAYMENTS_MODE=demo` (simulated
  checkout — fine for testing, NOT for launch; set the keys before promoting).
- Champion data updates: edit files, `git commit` + `git push` — Render
  auto-deploys every push. User data is on the disk and survives deploys.

## Local development on this PC

No Node is installed locally, so the local server is the PowerShell twin:
`.claude/server.ps1` (same API). The Launch preview uses it via
`.claude/launch.json`. If you install Node (`winget install OpenJS.NodeJS.LTS`)
you can run the production server locally instead: `node server.js`.

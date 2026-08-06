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

## 4. Stripe — real Early Access payments

The server sells ONE subscription: **Founding Member $1.99/mo** while
`EARLY_ACCESS` is on (default), **$3.99/mo standard** after you set
`EARLY_ACCESS=0`. Founding Members keep their $1.99 Stripe price forever —
new prices only apply to new checkout sessions.

### 4a. Test-mode dry run (the sandbox is already built)

The **Matchupcoach.gg sandbox** (`acct_1TwwUeKhe9XAP2K5`) is fully configured:

| Thing | Value |
|---|---|
| Product | `MatchupCoach Membership` — `prod_V1VtQdJ2I9aCSL` |
| FOUNDING price | `price_1U1SrXKhe9XAP2K5vEzYo8SA` — US$1.99/month |
| STANDARD price | `price_1U1SrXKhe9XAP2K5GkltlMSO` — US$3.99/month |
| Webhook | `we_1U1Sy0Khe9XAP2K569FXzCDN` → `https://matchupcoach.gg/api/stripe/webhook` (2 events) |
| Portal config | `bpc_1U1SzzKhe9XAP2K5I4V74Ujv` — cancel at period end, plan switching OFF |

Plan switching is deliberately OFF so a Founding Member can never move
themselves onto the $3.99 price and lose the lock.

To dry-run, set these in Render → **Environment** (the two secrets are yours to
copy — the key from **Developers → API keys**, the `whsec_…` from the webhook's
**Signing secret → reveal**):

       STRIPE_SECRET_KEY      = sk_test_…   (sandbox secret key)
       STRIPE_PRICE_FOUNDING  = price_1U1SrXKhe9XAP2K5vEzYo8SA
       STRIPE_PRICE_STANDARD  = price_1U1SrXKhe9XAP2K5GkltlMSO
       STRIPE_WEBHOOK_SECRET  = whsec_…
       PUBLIC_URL             = https://matchupcoach.gg
       EARLY_ACCESS           = 1

Save → Render redeploys → `/api/config` returns `stripeEnabled:true`. Subscribe
with test card `4242 4242 4242 4242`, any future expiry, any CVC. Success
returns to `/?mc_checkout=success&session_id=…`, which the app confirms
server-side before unlocking. Then check the webhook's **Event deliveries** tab
shows a 200, and that "Manage membership" opens the portal.

### 4b. Going live

The sandbox is a SEPARATE account — none of the ids above exist in live mode.

1. **Switch to live account** → activate payments (business details + bank
   account for payouts). This part is yours; it needs your real identity docs.
2. Recreate the same product + two USD monthly prices ($1.99, $3.99) in live
   mode, and the same webhook endpoint + events.
3. Swap the Render vars to the live `sk_live_…`, the live `price_…` ids and the
   live `whsec_…`. Everything else stays the same.
4. Charge yourself $1.99 once as a smoke test, then refund it from the
   dashboard.

Without `STRIPE_WEBHOOK_SECRET` set, someone who pays and closes the tab before
returning is charged with no access, and cancellations never revoke access.

**Ending Early Access later:** set `EARLY_ACCESS=0` and redeploy. New
subscribers pay $3.99; every existing Founding Member's subscription stays on
the $1.99 price object in Stripe automatically.

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

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

1. Create the account at https://dashboard.stripe.com and **activate live
   payments** (business details + bank account for payouts).
2. **Product Catalog → Add product**: name `MatchupCoach Membership`.
   Add TWO recurring monthly prices to it:
   - `$1.99 / month`  → copy its price id (`price_…`) — the FOUNDING price
   - `$3.99 / month`  → copy its price id — the STANDARD price
3. **Developers → API keys** → copy the **Secret key** (`sk_live_…`).
   (Use `sk_test_…` + test-mode price ids first if you want a dry run.)
4. In Render → your service → **Environment**, set:

       STRIPE_SECRET_KEY      = sk_live_…
       STRIPE_PRICE_FOUNDING  = price_…   (the $1.99 one)
       STRIPE_PRICE_STANDARD  = price_…   (the $3.99 one)
       PUBLIC_URL             = https://matchupcoach.gg
       EARLY_ACCESS           = 1         (later: 0 to end Early Access)

   Save → Render redeploys. `/api/config` now returns `stripeEnabled:true`
   and the site's checkout hands off to Stripe's hosted page.
5. Test with Stripe test mode or a real $1.99 charge (you can refund it from
   the dashboard). Success returns to `/?mc_checkout=success&session_id=…`,
   which the app confirms server-side before unlocking the account.
6. In Stripe **Settings → Billing → Customer portal**, click **Activate**. This
   is REQUIRED, not optional: the site promises "cancel anytime" at every
   subscribe point, and the app's "Manage membership" button calls
   /api/billing/portal which opens exactly this portal. Until it is activated
   that button returns a friendly "email support to cancel" message.
7. Also add a webhook (**Developers → Webhooks → Add endpoint**):
   URL `https://matchupcoach.gg/api/stripe/webhook`, events
   `checkout.session.completed` and `customer.subscription.deleted`. Copy the
   signing secret into `STRIPE_WEBHOOK_SECRET`. Without it, someone who pays and
   closes the tab before returning is charged with no access, and cancellations
   never revoke access.

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

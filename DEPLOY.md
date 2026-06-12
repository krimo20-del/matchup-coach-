# Deploying MatchupCoach to matchupcoach.gg

The whole site is one Node service (`server.js` — static app + API, zero npm
dependencies). Host it on Render, point the GoDaddy domain at it, done.

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

## 4. After it's live

- `https://matchupcoach.gg` — the site, accounts, founder counter: all live.
- **Payments are still simulated** (`PAYMENTS_MODE=demo` in render.yaml /
  the service's environment). Before promoting the site publicly, either:
  - set `PAYMENTS_MODE=off` (paid checkout politely says "not open yet" —
    free Champion-of-the-Week still works fully), or
  - wire Stripe for real charges (needs your Stripe account + keys).
- Champion data updates: edit files, `git commit` + `git push` — Render
  auto-deploys every push. User data is on the disk and survives deploys.

## Local development on this PC

No Node is installed locally, so the local server is the PowerShell twin:
`.claude/server.ps1` (same API). The Launch preview uses it via
`.claude/launch.json`. If you install Node (`winget install OpenJS.NodeJS.LTS`)
you can run the production server locally instead: `node server.js`.

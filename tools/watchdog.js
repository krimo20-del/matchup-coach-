// watchdog.js — watches the audit runners and exits loudly the moment they stall.
//
//   node tools/watchdog.js                 # watch until something is wrong, then exit 1
//   node tools/watchdog.js --once          # single check, for a quick status read
//   node tools/watchdog.js --stall 12      # minutes of no progress before alarming
//
// WHY: a previous run sat "running" for 47 minutes having silently died. Process status
// lied; only WRITE TIMESTAMPS told the truth. This watches the artifacts, not the process.
//
// Progress = new proposal files appearing in audits/. A run is healthy when proposals keep
// landing. Agent transcripts growing without proposals means work is happening but not
// finishing — that is the expensive-tail symptom, and it is reported separately.
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const ONCE = argv.includes('--once');
const si = argv.indexOf('--stall');
const STALL_MIN = si > -1 ? parseFloat(argv[si + 1]) : 12;
const POLL_MS = 30_000;
const EXPECT_PER_HR = 60;      // ~1 champion/hour is the floor we accept

const AUDITS = 'audits';
// The session id used to be hardcoded to 53b3d9eb-98f2-47d7-b4ca-3d38dcde9835, then the
// PROJECT dir was hardcoded to C--Users-Kris-Desktop — and a session launched from a
// different cwd (e.g. C:\ → C--) reproduced the exact same false "agents are hung" alarm
// one directory level up. Neither the session id nor the project slug is stable across
// sessions. Scan every project directory; the cost is nothing next to a false stall.
const PROJECTS_ROOT = path.join(process.env.USERPROFILE || process.env.HOME || '', '.claude',
  'projects');

function findWorkflowDirs() {
  const dirs = [];
  let projects = [];
  try { projects = fs.readdirSync(PROJECTS_ROOT); } catch (e) { return dirs; }
  for (const p of projects) {
    let sessions = [];
    try { sessions = fs.readdirSync(path.join(PROJECTS_ROOT, p)); } catch (e) { continue; }
    for (const s of sessions) {
      const d = path.join(PROJECTS_ROOT, p, s, 'subagents', 'workflows');
      try { if (fs.statSync(d).isDirectory()) dirs.push(d); } catch (e) {}
    }
  }
  return dirs;
}

// All of them. A run can span sessions, and scanning every candidate costs nothing
// compared to reporting a false stall on a live run.
const WF_DIRS = findWorkflowDirs();
const WF = WF_DIRS[0] || '';

const now = () => Date.now();
const mins = ms => (ms / 60000).toFixed(1);

function proposals() {
  const out = [];
  if (!fs.existsSync(AUDITS)) return out;
  for (const lane of fs.readdirSync(AUDITS)) {
    const d = path.join(AUDITS, lane);
    let st; try { st = fs.statSync(d); } catch (e) { continue; }
    if (!st.isDirectory()) continue;
    for (const f of fs.readdirSync(d)) {
      if (!f.endsWith('.json') || f.startsWith('_')) continue;
      try { out.push({ f: path.join(d, f), t: fs.statSync(path.join(d, f)).mtimeMs }); } catch (e) {}
    }
  }
  return out;
}

// Newest write across every live agent transcript, plus any spend-limit evidence.
function agentActivity() {
  let newest = 0, files = 0, spendLimited = 0;
  const runDirs = [];
  for (const wf of WF_DIRS) {
    let entries = [];
    try { entries = fs.readdirSync(wf); } catch (e) { continue; }
    for (const run of entries) runDirs.push(path.join(wf, run));
  }
  for (const d of runDirs) {
    let st; try { st = fs.statSync(d); } catch (e) { continue; }
    if (!st.isDirectory()) continue;
    for (const f of fs.readdirSync(d)) {
      if (!f.startsWith('agent-') || !f.endsWith('.jsonl')) continue;
      files++;
      try {
        const s = fs.statSync(path.join(d, f));
        if (s.mtimeMs > newest) newest = s.mtimeMs;
      } catch (e) {}
    }
    // Now that every project dir is scanned, journals from long-dead runs are in scope too.
    // A stale "spend limit" from a past session is history, not a live block — only count
    // journals still being written to within the last hour. And within a live journal,
    // skip type:"result" lines: QA agents QUOTE past spend-limit deaths in their waste
    // reports, and a whole-file grep alarmed on a healthy run over quoted history.
    const j = path.join(d, 'journal.jsonl');
    if (fs.existsSync(j)) {
      try {
        const js = fs.statSync(j);
        if (Date.now() - js.mtimeMs < 3600_000) {
          for (const line of fs.readFileSync(j, 'utf8').split('\n')) {
            if (!/spend limit/i.test(line)) continue;
            let type = null;
            try { type = JSON.parse(line).type; } catch (e) {}
            if (type !== 'result') { spendLimited++; break; }
          }
        }
      } catch (e) {}
    }
  }
  return { newest, files, spendLimited };
}

function snapshot() {
  const p = proposals();
  const t = now();
  const newestProposal = p.reduce((a, x) => Math.max(a, x.t), 0);
  const lastHour = p.filter(x => t - x.t < 3600_000).length;
  const last15 = p.filter(x => t - x.t < 900_000).length;
  const a = agentActivity();
  return { total: p.length, newestProposal, lastHour, last15, agents: a, t };
}

function diagnose(s) {
  const quietProposals = s.newestProposal ? s.t - s.newestProposal : Infinity;
  const quietAgents = s.agents.newest ? s.t - s.agents.newest : Infinity;
  const problems = [];

  if (s.agents.spendLimited) {
    problems.push({
      severity: 'blocked',
      what: `${s.agents.spendLimited} workflow run(s) hit the spend limit`,
      fix: 'Work already on disk is safe and will be skipped on resume. Relaunch the runners when the limit window resets.',
    });
  }
  if (quietAgents > STALL_MIN * 60000) {
    problems.push({
      severity: 'stalled',
      what: `no agent has written anything for ${mins(quietAgents)} min`,
      fix: 'Agents are hung, not working. Stop the workflows and relaunch; finished matchups are durable and get skipped.',
    });
  // A quiet proposal stream is NORMAL, not a fault. After a champion's last proposal the
  // tail runs apply -> QA -> ship, measured at 12-41 min on real champions, and it writes
  // no proposals at all. A champion that is already complete writes none either. Alarming
  // at the stall threshold made this fire constantly on healthy runs — three times in one
  // afternoon — and an alarm that cries wolf gets ignored, which is worse than no alarm.
  // Agents-not-writing (above) is the real liveness signal. This one only matters if it
  // outlasts the longest legitimate tail by a wide margin.
  } else if (quietProposals > Math.max(STALL_MIN * 60000, 60 * 60000)) {
    problems.push({
      severity: 'no-output',
      what: `agents are active (last write ${mins(quietAgents)} min ago) but no proposal has landed for ${mins(quietProposals)} min`,
      fix: 'Work is happening but not finishing — usually the expensive tail (lane-wide scans or SEO page rebuilds inside a per-champion step). Check the Apply/QA/Ship phases for lane-wide commands.',
    });
  }
  if (s.lastHour < EXPECT_PER_HR && s.total > 0 && quietProposals < STALL_MIN * 60000) {
    problems.push({
      severity: 'slow',
      what: `${s.lastHour} proposals in the last hour, below the ${EXPECT_PER_HR}/hr floor`,
      fix: 'Throughput is under target. Consider more parallel runners on disjoint champions, or check whether per-champion steps are doing lane-wide work.',
    });
  }
  return problems;
}

// Which champion is being worked right now, and how far in — read from the most recently
// written proposal files. This is the line worth watching live.
function current() {
  const p = proposals();
  if (!p.length) return null;
  const newest = p.reduce((a, x) => x.t > a.t ? x : a, p[0]);
  const champ = path.basename(newest.f).split('__')[0];
  const lane = path.basename(path.dirname(newest.f));
  const mine = p.filter(x => path.basename(x.f).startsWith(champ + '__'));
  const recent = p.filter(x => Date.now() - x.t < 600_000).length;
  return { champ, lane, done: mine.length, recent };
}

function report(s, problems) {
  const stamp = new Date(s.t).toISOString().slice(11, 19);
  const c = current();
  console.log(`[${stamp}] ${c ? `WORKING ON ${c.champ} (${c.lane}) — ${c.done}/71 done, ${c.recent} matchups in last 10min` : 'no proposals yet'}`);
  console.log(`          totals: ${s.total} matchups | ${s.lastHour}/hr | last write ${s.agents.newest ? mins(s.t - s.agents.newest) + 'm ago' : 'never'} | ${s.newestProposal ? 'last matchup ' + mins(s.t - s.newestProposal) + 'm ago' : ''}`);
  for (const p of problems) {
    console.log(`  !! [${p.severity}] ${p.what}`);
    console.log(`     -> ${p.fix}`);
  }
}

(function main() {
  const started = now();
  const first = snapshot();
  report(first, ONCE ? diagnose(first) : []);
  if (ONCE) process.exit(diagnose(first).length ? 1 : 0);
  // Grace period: at boot the newest proposal is usually stale from BEFORE this watchdog
  // (and before the run it is watching) started. Alarming on that is a false positive —
  // it fired the instant a fresh workflow launched. Only judge progress made since boot.
  const grace = STALL_MIN * 60000;
  console.log(`watching — no alarm before ${new Date(started + grace).toISOString().slice(11, 19)} (${STALL_MIN}m grace)`);

  const timer = setInterval(() => {
    const s = snapshot();
    const warmedUp = s.t - started > grace;
    const problems = warmedUp ? diagnose(s) : [];
    report(s, problems);
    if (problems.some(x => x.severity !== 'slow')) {
      console.log('\nPROBLEM DETECTED — exiting so it gets handled.');
      clearInterval(timer);
      process.exit(1);
    }
  }, POLL_MS);
})();

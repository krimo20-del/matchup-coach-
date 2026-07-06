// Generate the authoring workflow script for a MID-lane champ from its job.json + groups.json.
// win[] is chart-locked (the champ's own generated mid-lane favour timeline), so agents are
// told to copy it EXACTLY and make every why/prose/spike agree with each cell's colour.
// Usage: node _bespoke_genwf_mid.js <champ> <scratch> <scriptsDir>
const fs = require('fs'), path = require('path');
const champ = process.argv[2], scratch = process.argv[3], scriptsDir = process.argv[4];
const dir = path.join(scratch, 'bespoke-mid', champ);
const job = JSON.parse(fs.readFileSync(path.join(dir, 'job.json'), 'utf8'));
const groups = JSON.parse(fs.readFileSync(path.join(dir, 'groups.json'), 'utf8'));
const champDisp = job.champDisp;
const kit = job.kit;
const kitLine = kit.cls ? `${champDisp} kit: P ${kit.P}, Q ${kit.Q}, W ${kit.W}, E ${kit.E}, R ${kit.R} (class: ${kit.cls}).` : `Use your accurate knowledge of ${champDisp}'s kit.`;
const JOB = path.join(dir, 'job.json').replace(/\\/g, '/');
const OUT = path.join(dir, 'out').replace(/\\/g, '/');

const script = `export const meta = {
  name: 'bespoke-mid-${champ}',
  description: 'Author bespoke Reddit-informed MID-lane matchup content for ${champDisp} (${job.matchups.length} matchups, chart-locked)',
  phases: [{ title: 'Author', detail: '${groups.length} agents, win[] locked to the generated mid-lane favour timeline' }],
}
const JOB = ${JSON.stringify(JOB)}
const OUT = ${JSON.stringify(OUT)}
const GROUPS = ${JSON.stringify(groups)}
phase('Author')
const results = await parallel(GROUPS.map((grp, gi) => () =>
  agent(
\`You are a Challenger-level LoL coach writing bespoke MID-LANE matchup content for ${champDisp} ("you" = ${champDisp}, mid lane). ${kitLine}

STEP 1 — Read the job file with Read: \${JOB}
It has { matchups:[ {opp, oppDisp, wr, games, lockWin} ] }. wr = ${champDisp}'s emerald+ MID-LANE win rate vs that opponent (opponents are also mid-lane champs). lockWin is the AUTHORITATIVE 7-phase favour timeline (absolute champion display names) that colours the level chart — you MUST copy it verbatim into win[]; never change it.

STEP 2 — For EACH of these opponents: \${grp.join(', ')}
find its matchup and author a content object with EXACTLY this shape (house voice: concrete, mechanical, second-person, names real abilities, ~4-6 sentences per prose field, mid-lane specific — waves, roams, all-in windows, not top-lane splitpush language):
{
 "a":"${champ}","b":"<opp slug>",
 "win":[copy lockWin EXACTLY],  // phases: Level 1, Level 2, Level 3, Levels 4-5, Level 6, First item, 2+ items. Each is "${champDisp}", the opponent DISPLAY name, or "Skill".
 "spikes":[{"when":"Lvl 3-5","text":"..."},{"when":"Lvl 6","text":"..."},{"when":"1st item","text":"..."},{"when":"Late","text":"..."}],
 "wants":{"you":["..","..",".."],"foe":["..","..",".."]},
 "early":"<L1-2>","mid":"<L3-6>","late":"<items/2+>",
 "whys":[7 one-sentence rationales]  // one per phase, each EXPLAINING that phase's win[] colour: if win[i]=="${champDisp}" the why reads YOU-favoured; if it's the opponent, the why reads THEM-favoured; if "Skill", even/skill. NEVER write a you-ahead why under an opponent cell or vice-versa.
}
CRITICAL: every why, every spike, and the early/mid/late prose must be consistent with win[]'s colours and with the wr. Ground all claims in the real kits + the opponent's key cooldown + mid-lane dynamics (wave management, roam timers, all-in windows around 2/6/11/16).

STEP 3 — Write each opponent's object to \${OUT}/<opp slug>.json (compact JSON). Do all \${grp.length}.
Reply only: ${champ} g\${gi + 1}: <n> written.\`,
    { label: \`mid-${champ}:g\${gi + 1}\`, phase: 'Author' }
  )
))
return { groups: GROUPS.length, done: results.filter(Boolean).length }
`;
const outPath = path.join(scriptsDir, 'bespoke-mid-' + champ + '.js');
fs.writeFileSync(outPath, script);
console.log('WROTE ' + outPath);

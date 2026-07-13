// Generate the authoring workflow script for a SUPPORT-lane champ from its job.json + groups.json.
// win[] is store-locked (the champ's verified support-lane favour timeline), so agents copy it EXACTLY
// and make every why/prose/spike agree with each cell's colour.
// Usage: node _bespoke_genwf_sup.js <champ> <scratch> <scriptsDir>
const fs = require('fs'), path = require('path');
const champ = process.argv[2], scratch = process.argv[3], scriptsDir = process.argv[4];
const dir = path.join(scratch, 'bespoke-sup', champ);
const job = JSON.parse(fs.readFileSync(path.join(dir, 'job.json'), 'utf8'));
const groups = JSON.parse(fs.readFileSync(path.join(dir, 'groups.json'), 'utf8'));
const champDisp = job.champDisp;
const champDispEsc = champDisp.replace(/'/g, "\\'"); // safe inside single-quoted meta strings (Vel'Koz, Renata Glasc)
const kit = job.kit;
const kitLine = kit.cls ? `${champDisp} kit: P ${kit.P}, Q ${kit.Q}, W ${kit.W}, E ${kit.E}, R ${kit.R} (class: ${kit.cls}).` : `Use your accurate knowledge of ${champDisp}'s kit.`;
const JOB = path.join(dir, 'job.json').replace(/\\/g, '/');
const OUT = path.join(dir, 'out').replace(/\\/g, '/');

const script = `export const meta = {
  name: 'bespoke-sup-${champ}',
  description: 'Author bespoke Reddit-informed SUPPORT-lane matchup content for ${champDispEsc} (${job.matchups.length} matchups, chart-locked)',
  phases: [{ title: 'Author', detail: '${groups.length} agents, win[] locked to the verified support-lane favour timeline' }],
}
const JOB = ${JSON.stringify(JOB)}
const OUT = ${JSON.stringify(OUT)}
const GROUPS = ${JSON.stringify(groups)}
phase('Author')
const results = await parallel(GROUPS.map((grp, gi) => () =>
  agent(
\`You are a Challenger-level LoL bot-lane support coach writing bespoke SUPPORT-LANE matchup content for ${champDisp} ("you" = ${champDisp}, playing support in the bot-lane 2v2). ${kitLine}

STEP 1 — Read the job file with Read: \${JOB}
It has { matchups:[ {opp, oppDisp, wr, games, lockWin} ] }. wr = ${champDisp}'s emerald+ SUPPORT win rate vs that enemy support. lockWin is the AUTHORITATIVE 7-phase favour timeline (absolute champion display names) that colours the level chart — you MUST copy it verbatim into win[]; never change it. Note: this is the SUPPORT vs SUPPORT matchup in a 2v2 bot lane — frame it as the support duel (who wins the poke war, who lands their engage/hook first, who peels/disengages, who enables their ADC), NOT the ADC matchup and NOT a solo lane.

STEP 2 — For EACH of these opponents: \${grp.join(', ')}
find its matchup and author a content object with EXACTLY this shape (house voice: concrete, mechanical, second-person, names real abilities, ~4-6 sentences per prose field, SUPPORT-lane specific — poke/sustain trades, hook/engage windows and dodging them, peel vs the enemy engage, vision/roam timers, all-in coordination with your ADC, level-2 and level-6 spikes, warding — NOT ADC last-hitting/kiting, NOT mid roams, NOT top splitpush):
{
 "a":"${champ}","b":"<opp slug>",
 "win":[copy lockWin EXACTLY],  // phases: Level 1, Level 2, Level 3, Levels 4-5, Level 6, First item, 2+ items. Each is "${champDisp}", the opponent DISPLAY name, or "Skill".
 "spikes":[{"when":"Lvl 2","text":"..."},{"when":"Lvl 6","text":"..."},{"when":"1st item","text":"..."},{"when":"Late","text":"..."}],
 "wants":{"you":["..","..",".."],"foe":["..","..",".."]},
 "early":"<L1-2>","mid":"<L3-6>","late":"<items/2+>",
 "whys":[7 one-sentence rationales]  // one per phase, each EXPLAINING that phase's win[] colour: if win[i]=="${champDisp}" the why reads YOU-favoured; if it's the opponent, the why reads THEM-favoured; if "Skill", even/skill. NEVER write a you-ahead why under an opponent cell or vice-versa.
}
CRITICAL: every why, every spike, and the early/mid/late prose must be consistent with win[]'s colours and with the wr. Ground all claims in the real support kits + the opponent's key cooldown (hook/engage/poke timers) + bot-lane 2v2 dynamics (level-2 spike, level-6 ults, ward/roam windows, all-in coordination with the ADC).

STEP 3 — Write each opponent's object to \${OUT}/<opp slug>.json (compact JSON). Do all \${grp.length}.
Reply only: ${champ} g\${gi + 1}: <n> written.\`,
    { label: \`sup-${champ}:g\${gi + 1}\`, phase: 'Author' }
  )
))
return { groups: GROUPS.length, done: results.filter(Boolean).length }
`;
const outPath = path.join(scriptsDir, 'bespoke-sup-' + champ + '.js');
fs.writeFileSync(outPath, script);
console.log('WROTE ' + outPath);

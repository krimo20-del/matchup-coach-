// jg-build-briefs.js — one prepared file per jungle matchup, so an agent reads ONE file.
//
//   node tools/jg-build-briefs.js --champ "Lee Sin"
//   node tools/jg-build-briefs.js                    # all 50 junglers
//
// Same reasoning as the lane build-briefs.js: measured at ~7 tool calls per proposal, of
// which one was the Write. Each call is a model round trip (~10s), so six of them is a
// minute per matchup of pure fetching. Doing the gathering here — deterministically, once —
// is what took the lanes from 60-150/hr to 215-326/hr.
//
// Writes tools/audit-run/briefs/jungle/<Owner>__<Enemy>.json
//
// WHAT IS DELIBERATELY NOT IN HERE
//   - win rates. Jungle has no MC_REAL_GAMES and no packets. There is no rate to quote and
//     none may be invented; the kit and the clear are the only authorities.
//   - camp gold/HP values and clear timings. They are patch-specific and are NOT in Riot's
//     Data Dragon, so this tool cannot supply them without inventing them. The brief asks
//     the agent to check League Wiki instead, and to say so when it cannot confirm.
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const ci = argv.indexOf('--champ');
const ONLY = ci > -1 ? argv[ci + 1] : null;

const JG_DIR = 'champ-data/jg';
const KIT_DIR = 'champ-data/_kits';
const OUT_DIR = path.join('tools', 'audit-run', 'briefs', 'jungle');
const AUDIT_DIR = path.join('audits', 'jungle');
const FLAT = ['tldr', 'start', 'scuttle', 'topObj', 'invade', 'watch', 'weak', 'split', 'picks', 'win'];

const kitSlug = n => String(n).toLowerCase().replace(/[^a-z0-9]/g, '');

function trimKit(k) {
  if (!k) return null;
  return {
    name: k.name,
    resource: k.resource,          // energy vs mana decides half of every jungle duel
    tags: k.tags,
    abilities: (k.abilities || []).map(a => ({
      slot: a.slot,
      // the kit stores `names` (an array — some abilities have a recast name); the audit's
      // whole ability-naming standard depends on getting these exactly right, so keep all.
      names: a.names || (a.name ? [a.name] : []),
      cd: a.cooldown || null,
      range: a.range || null,
      cost: a.cost || null,
      costType: a.costType || null,
      flags: a.flags || [],
      text: (a.description || '').slice(0, 300),
    })),
    kitFlags: k.kitFlags || null,
  };
}

// A slug cannot find these: Wukong's kit is monkeyking.json (Riot's internal id) and
// "Nunu & Willump" is nunu.json. Index by the kit's OWN `name` field instead, which is
// correct for every champion without a hand-maintained alias table.
// The directory also holds a parallel `jade*` set (id "Jade_Wukong") that duplicates 61
// names — those are skipped so a lookup never resolves to a variant.
const KIT_BY_NAME = (() => {
  const m = new Map();
  for (const f of fs.readdirSync(KIT_DIR).filter(x => x.endsWith('.json'))) {
    let k;
    try { k = JSON.parse(fs.readFileSync(path.join(KIT_DIR, f), 'utf8')); } catch (e) { continue; }
    if (!k || !k.name) continue;
    if (/^jade/i.test(f) || /^Jade_/i.test(k.id || '')) continue;
    if (!m.has(k.name)) m.set(k.name, k);
  }
  return m;
})();

function loadKit(displayName) {
  let k = KIT_BY_NAME.get(displayName);
  if (!k) {
    // last resort: match on a punctuation-stripped comparison ("Kha'Zix" vs "KhaZix")
    const want = kitSlug(displayName);
    for (const [name, kit] of KIT_BY_NAME) if (kitSlug(name) === want) { k = kit; break; }
  }
  return k ? trimKit(k) : null;
}

// load JG_DB
const w = {};
for (const f of fs.readdirSync(JG_DIR).filter(x => x.endsWith('.js') && !x.startsWith('_'))) {
  try { new Function('window', fs.readFileSync(path.join(JG_DIR, f), 'utf8'))(w); } catch (e) {}
}
const db = w.JG_DB || {};

fs.mkdirSync(OUT_DIR, { recursive: true });
let written = 0, skippedKit = 0;
const missingKits = new Set();

for (const owner of Object.keys(db)) {
  if (ONLY && owner !== ONLY) continue;
  const ownerKit = loadKit(owner);
  if (!ownerKit) missingKits.add(owner);

  for (const enemy of Object.keys(db[owner])) {
    const e = db[owner][enemy];
    const enemyKit = loadKit(enemy);
    if (!enemyKit) missingKits.add(enemy);

    // is the mirror already audited? the lanes proved agents waste a matchup re-deriving
    // what the opposite page already settled — but ALSO that scanning the lane to find out
    // costs more than it saves. One precomputed boolean per brief is the cheap middle.
    const mirrorFile = path.join(AUDIT_DIR, `${enemy}__${owner}.json`);
    let mirror = null;
    if (fs.existsSync(mirrorFile)) {
      try {
        const m = JSON.parse(fs.readFileSync(mirrorFile, 'utf8'));
        mirror = { audited: true, notes: m.notes || null, stageVerdicts: (m.edits || [])
          .filter(x => /^stages\[\d+\]\.adv$/.test(x.path || ''))
          .map(x => ({ path: x.path, after: x.after })) };
      } catch (err) { mirror = { audited: true, notes: 'mirror file unreadable' }; }
    }

    const current = {};
    for (const k of FLAT) current[k] = e[k] ?? null;
    current.stages = (e.stages || []).map((s, i) => ({ i, stage: s.stage, adv: s.adv, why: s.why }));

    const brief = {
      ownerKey: owner, enemy, lane: 'jungle',
      writablePaths: FLAT.concat(['stages[N].adv', 'stages[N].why']),
      ownerKit, enemyKit,
      mirror,
      current,
      researchChecklist: [
        'Clear route + order: which camps, in what order, and WHY (AoE vs single-target, leash need).',
        'Clear speed and health cost: who hits level 3 first, who arrives healthier. Decides most early windows.',
        'Duel per window: who wins a straight 1v1 at each of the 7 stages. This is what `adv` encodes.',
        'Gank threat: the CC, its range, and WHICH LEVEL the gank becomes real. Name the ability.',
        'Scuttle: who wins the crab fight and what decides it.',
        'Objectives: Void Grubs / Rift Herald / Dragon — smite duel, pit control, who contests when.',
        'Invade and counter-jungle: who enters whose jungle, at what timing, with what escape.',
        'Ability accuracy: real names, cooldowns, ranges, CC durations — from the kits in this brief.',
        'Item spikes: the jungle item timing that actually changes the matchup.',
        'Win condition (`win`) and playing from behind (`weak`), specific to this matchup.',
      ],
      rules: [
        'NO WIN RATES EXIST FOR JUNGLE. Do not quote one, do not infer one, do not scrape one.',
        'Camp gold/HP and clear timings are NOT in this brief and NOT in Data Dragon. Check League Wiki, or say you could not confirm. Never invent a number.',
        'Reddit is blocked by policy. League Wiki is primary for mechanics.',
        'If you move stages[N].adv you MUST rewrite stages[N].why in the same proposal. The applier refuses the pair otherwise, and a row that argues with itself is worse than a stale one.',
        '`split` and `picks` are champion-level by design (4% unique across the lane). Do not rewrite them to fake matchup-specificity.',
        'Write to audits/jungle/<Owner>__<Enemy>.json only. Never edit champ-data directly.',
      ],
    };

    fs.writeFileSync(path.join(OUT_DIR, `${owner}__${enemy}.json`), JSON.stringify(brief, null, 1));
    written++;
  }
}

console.log(`jg-build-briefs: wrote ${written} brief(s) to ${OUT_DIR}`);
if (missingKits.size) {
  console.log(`\nWARNING — no kit file for ${missingKits.size} champion(s); their briefs carry null kits:`);
  console.log('  ' + [...missingKits].join(', '));
  console.log('  An audit cannot verify ability names without a kit. Fix champ-data/_kits before auditing these.');
}

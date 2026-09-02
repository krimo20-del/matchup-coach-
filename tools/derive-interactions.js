// derive-interactions.js — for every matchup in the site, work out which decisive
// interactions EXIST between the two kits, and which of those the text never mentions.
// Zero model tokens. Run tools/build-kit-library.js first.
//
//   node tools/derive-interactions.js
//
// This is the Wind-Wall detector generalised. Yasuo's W is flagged blocksProjectiles,
// Azir's soldiers are flagged projectile, so "Wind Wall deletes your soldier attacks"
// falls out of a join rather than a research task — across all ~11,900 matchups at once.
//
// Output: champ-data/_kits/_missing-interactions.json
//   [{ lane, ownerKey, owner, enemy, missing:[{rule, headline, ownerSide, slots}] }]
// A writing pass reads this instead of researching each pair.
const fs = require('fs');
const path = require('path');

const KITS = path.join('champ-data', '_kits');
if (!fs.existsSync(path.join(KITS, '_index.json'))) {
  console.error('Kit library missing. Run: node tools/build-kit-library.js <championFull.json>');
  process.exit(1);
}
const K = {};
for (const f of fs.readdirSync(KITS)) {
  if (!f.endsWith('.json') || f.startsWith('_')) continue;
  const r = JSON.parse(fs.readFileSync(path.join(KITS, f), 'utf8'));
  K[r.slug] = r;
}
const ALIAS = { wukong: 'monkeyking', nunuwillump: 'nunu', renataglasc: 'renata', renata: 'renata' };
const bare = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
const kitOf = s => K[bare(s)] || K[ALIAS[bare(s)]] || null;
const has = (k, f) => !!(k && k.kitFlags && k.kitFlags[f]);
const slotsOf = (k, f) => (k && k.kitFlags && k.kitFlags[f]) || [];
const nameFor = (k, slot) => {
  const a = (k.abilities || []).find(x => x.slot === slot);
  return a ? a.names.join('/') : slot;
};
const namesFor = (k, f) => slotsOf(k, f).map(s => `${nameFor(k, s)} (${s})`).join(', ');

// Each rule fires when the pairing genuinely creates a decisive fact.
// `side` says whose page this matters on: 'owner' = a threat/answer the owner must know.
const RULES = [
  {
    id: 'projectiles-blocked',
    when: (o, e) => has(o, 'projectile') && has(e, 'blocksProjectiles'),
    headline: (o, e) => `${e.name}'s ${namesFor(e, 'blocksProjectiles')} deletes ${o.name}'s projectile damage (${namesFor(o, 'projectile')}) outright — do not spend them into it.`,
  },
  {
    id: 'spellshield-eats-lockdown',
    when: (o, e) => has(o, 'hardCC') && has(e, 'spellShield'),
    headline: (o, e) => `${e.name}'s ${namesFor(e, 'spellShield')} eats your lockdown (${namesFor(o, 'hardCC')}) — bait it before committing.`,
  },
  {
    id: 'dash-denied',
    when: (o, e) => has(o, 'dash') && (has(e, 'grounding') || has(e, 'terrain')),
    headline: (o, e) => `${e.name} can deny your mobility (${namesFor(o, 'dash')}) with ${namesFor(e, has(e, 'grounding') ? 'grounding' : 'terrain')}.`,
  },
  {
    id: 'enemy-dash-deniable',
    when: (o, e) => (has(o, 'grounding') || has(o, 'terrain')) && has(e, 'dash'),
    headline: (o, e) => `Your ${namesFor(o, has(o, 'grounding') ? 'grounding' : 'terrain')} shuts off ${e.name}'s ${namesFor(e, 'dash')} — hold it for the engage, not the poke.`,
  },
  {
    id: 'untargetable-dodges-burst',
    when: (o, e) => (has(o, 'hardCC') || has(o, 'execute')) && has(e, 'untargetable'),
    headline: (o, e) => `${e.name} can go untargetable through your commit (${namesFor(e, 'untargetable')}) — wait it out rather than spending everything into it.`,
  },
  {
    id: 'needs-antiheal',
    when: (o, e) => has(e, 'heal') && !has(o, 'antiHeal'),
    headline: (o, e) => `${e.name} sustains through chip damage (${namesFor(e, 'heal')}) — Grievous Wounds timing decides extended trades.`,
  },
  {
    id: 'resistances-invalidated',
    when: (o, e) => has(e, 'trueDamage') || has(e, 'percentHealth'),
    headline: (o, e) => `${e.name} bypasses stacking resistances (${namesFor(e, has(e, 'trueDamage') ? 'trueDamage' : 'percentHealth')}) — raw armour or MR is the wrong answer here.`,
  },
  {
    id: 'execute-threshold',
    when: (o, e) => has(e, 'execute'),
    headline: (o, e) => `${e.name} threatens a threshold kill with ${namesFor(e, 'execute')} — track the HP number, not the health bar.`,
  },
  {
    id: 'stealth-needs-vision',
    when: (o, e) => has(e, 'stealth') && !has(o, 'revealsStealth'),
    headline: (o, e) => `${e.name} goes unseen (${namesFor(e, 'stealth')}) and you have no reveal — Control Wards and a sweeper are mandatory, not optional.`,
  },
  {
    id: 'channel-interruptible',
    when: (o, e) => has(e, 'channel') && has(o, 'hardCC'),
    headline: (o, e) => `${e.name}'s ${namesFor(e, 'channel')} is a channel — your ${namesFor(o, 'hardCC')} cancels it outright.`,
  },
  {
    id: 'your-channel-punished',
    when: (o, e) => has(o, 'channel') && has(e, 'hardCC'),
    headline: (o, e) => `${e.name} can cancel your ${namesFor(o, 'channel')} with ${namesFor(e, 'hardCC')} — only channel once their CC is spent.`,
  },
  {
    id: 'knockup-enabler',
    when: (o, e) => has(e, 'knockup') && has(o, 'knockup'),
    headline: (o, e) => `Both sides carry displacement (${namesFor(o, 'knockup')} vs ${namesFor(e, 'knockup')}) — whoever lands it first owns the trade.`,
  },
  {
    id: 'shield-absorbs-burst',
    when: (o, e) => has(e, 'shield') && (has(o, 'execute') || has(o, 'hardCC')),
    headline: (o, e) => `${e.name}'s ${namesFor(e, 'shield')} absorbs your burst window — force it out before you commit.`,
  },
  // --- point 4 checklist items the kit flags can settle mechanically ---
  {
    id: 'autoreset-burst-tell',
    when: (o, e) => has(e, 'autoReset'),
    headline: (o, e) => `${e.name}'s combo opens with an auto-attack reset (${namesFor(e, 'autoReset')}) — the wind-up is your cue to step back, not the ability cast.`,
  },
  {
    id: 'onhit-itemization',
    when: (o, e) => has(e, 'onHit'),
    headline: (o, e) => `${e.name} applies on-hit through ${namesFor(e, 'onHit')} — their damage scales with attack speed, so armour alone reads the trade wrong.`,
  },
  {
    id: 'silence-denies-answer',
    when: (o, e) => has(e, 'silence'),
    headline: (o, e) => `${e.name}'s ${namesFor(e, 'silence')} silences you — your escape is gone for its duration, so hold it rather than pre-casting.`,
  },
  {
    id: 'you-can-reveal',
    when: (o, e) => has(e, 'stealth') && has(o, 'revealsStealth'),
    headline: (o, e) => `Your ${namesFor(o, 'revealsStealth')} reveals ${e.name} out of ${namesFor(e, 'stealth')} — that is the answer to their whole pattern.`,
  },
  {
    id: 'global-no-safe-overextend',
    when: (o, e) => has(e, 'global'),
    headline: (o, e) => `${e.name} threatens the map with ${namesFor(e, 'global')} — being alive at low HP anywhere is a decision, not a default.`,
  },
  {
    id: 'their-antiheal-blunts-you',
    when: (o, e) => has(o, 'heal') && has(e, 'antiHeal'),
    headline: (o, e) => `${e.name} applies Grievous Wounds via ${namesFor(e, 'antiHeal')} — your sustain (${namesFor(o, 'heal')}) is halved once it lands, so trade before it applies.`,
  },
  {
    id: 'terrain-cuts-retreat',
    when: (o, e) => has(e, 'terrain') && !has(o, 'dash'),
    headline: (o, e) => `${e.name} can cut your retreat with ${namesFor(e, 'terrain')} and you have no dash — hold Flash for the wall, not the damage.`,
  },
];

// ---------- load every matchup pair ----------
global.window = {};
new Function('window', fs.readFileSync('champ-data/rosters.js', 'utf8'))(global.window);

const LANES = [
  { key: 'top', dir: 'champ-data/content', suffix: '' },
  { key: 'mid', dir: 'champ-data/content/mid', suffix: '_mid' },
  { key: 'bot', dir: 'champ-data/content/bot', suffix: '_bot' },
  { key: 'support', dir: 'champ-data/content/sup', suffix: '_sup' },
];

const pairs = [];
for (const L of LANES) {
  if (!fs.existsSync(L.dir)) continue;
  for (const f of fs.readdirSync(L.dir).filter(x => x.endsWith('.js'))) {
    const w = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
    try { new Function('window', fs.readFileSync(path.join(L.dir, f), 'utf8'))(w); } catch (e) { continue; }
    const key = f.replace('.js', '') + L.suffix;
    for (const c of w.MC_CONTENT_EXTRA) {
      if (c.a !== key) continue;
      const text = [
        ...(c.spikes || []).map(s => s && s.text), ...((c.wants || {}).you || []), ...((c.wants || {}).foe || []),
        c.early, c.mid, c.late, ...(c.whys || []),
      ].filter(x => typeof x === 'string').join(' ');
      pairs.push({ lane: L.key, ownerKey: key, owner: f.replace('.js', ''), enemy: c.b, text, file: path.join(L.dir, f) });
    }
  }
}
// jungle
if (fs.existsSync('champ-data/jg')) {
  const w = {};
  for (const f of fs.readdirSync('champ-data/jg').filter(x => x.endsWith('.js') && !x.startsWith('_'))) {
    try { new Function('window', fs.readFileSync(path.join('champ-data/jg', f), 'utf8'))(w); } catch (e) {}
  }
  for (const [champ, opps] of Object.entries(w.JG_DB || {})) {
    for (const [enemy, e] of Object.entries(opps)) {
      const text = [e.tldr, e.start, e.scuttle, e.topObj, e.invade, e.watch, e.weak, e.split, e.picks, e.win,
        ...((e.stages || []).map(s => s && s.why))].filter(x => typeof x === 'string').join(' ');
      pairs.push({ lane: 'jungle', ownerKey: champ, owner: champ, enemy, text, file: 'champ-data/jg/' + bare(champ) + '.js' });
    }
  }
}

// ---------- fire the rules, then check whether the text already says it ----------
// Mention test: the ability name, or a strong synonym for the concept, appearing anywhere.
const CONCEPT_WORDS = {
  'projectiles-blocked': ['wind wall', 'windwall', 'block', 'projectile'],
  'spellshield-eats-lockdown': ['spell shield', 'spellshield', 'black shield', 'banshee', 'shield your'],
  'dash-denied': ['ground', 'wall', 'deny', 'dash'],
  'enemy-dash-deniable': ['ground', 'wall', 'deny', 'dash'],
  'untargetable-dodges-burst': ['untargetable', 'invulnerab', 'stasis', 'zhonya', 'immune'],
  'needs-antiheal': ['grievous', 'anti-heal', 'antiheal', 'executioner', 'morello', 'oblivion', 'thornmail', 'chempunk', 'bramble'],
  'resistances-invalidated': ['true damage', 'max health', 'maximum health', '% health', 'percent health', 'shreds armor', 'shreds armour'],
  'execute-threshold': ['execute', 'threshold', 'below', 'hp above', 'health above'],
  'stealth-needs-vision': ['control ward', 'pink ward', 'sweeper', 'oracle', 'stealth', 'invisib', 'camouflage'],
  'channel-interruptible': ['channel', 'interrupt', 'cancel'],
  'your-channel-punished': ['channel', 'interrupt', 'cancel'],
  'knockup-enabler': ['knock', 'airborne', 'displac'],
  'shield-absorbs-burst': ['shield'],
  'autoreset-burst-tell': ['auto reset', 'attack reset', 'resets his auto', 'resets her auto', 'empowered auto', 'wind-up', 'windup'],
  'onhit-itemization': ['on-hit', 'on hit', 'attack speed'],
  'silence-denies-answer': ['silence', 'silenc'],
  'you-can-reveal': ['reveal', 'true sight', 'control ward', 'sweeper', 'oracle'],
  'global-no-safe-overextend': ['global', 'across the map', 'from anywhere', 'map-wide'],
  'their-antiheal-blunts-you': ['grievous', 'anti-heal', 'antiheal', 'healing reduc'],
  'terrain-cuts-retreat': ['wall', 'terrain', 'pillar', 'cut off', 'escape route'],
};
const mentions = (text, rule, o, e) => {
  const t = text.toLowerCase();
  const words = CONCEPT_WORDS[rule.id] || [];
  if (words.some(w => t.includes(w))) return true;
  // or the specific ability name that drives the rule
  for (const k of [o, e]) for (const ab of (k.abilities || [])) for (const n of ab.names) {
    if (n && n.length > 4 && t.includes(n.toLowerCase())) { /* named, but not necessarily for THIS rule */ }
  }
  return false;
};

const out = [];
let fired = 0, missing = 0;
const byRule = {};
for (const p of pairs) {
  const o = kitOf(p.owner), e = kitOf(p.enemy);
  if (!o || !e) continue; // custom champs (Locke, Zaahen) have no Riot data
  const miss = [];
  for (const r of RULES) {
    if (!r.when(o, e)) continue;
    fired++;
    if (mentions(p.text, r, o, e)) continue;
    missing++;
    byRule[r.id] = (byRule[r.id] || 0) + 1;
    miss.push({ rule: r.id, headline: r.headline(o, e) });
  }
  if (miss.length) out.push({ lane: p.lane, ownerKey: p.ownerKey, owner: p.owner, enemy: p.enemy, file: p.file, missing: miss });
}

fs.writeFileSync(path.join(KITS, '_missing-interactions.json'), JSON.stringify(out, null, 1));

console.log(`matchups scanned      : ${pairs.length}`);
console.log(`interactions that apply: ${fired}`);
console.log(`NOT mentioned in text  : ${missing}  (across ${out.length} matchups)`);
console.log('\nmissing, by rule:');
Object.entries(byRule).sort((a, b) => b[1] - a[1]).forEach(([r, n]) => console.log(String(n).padStart(6), r));
console.log(`\nwritten to ${path.join(KITS, '_missing-interactions.json')}`);

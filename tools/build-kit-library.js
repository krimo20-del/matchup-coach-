// build-kit-library.js — one canonical kit record per champion, derived from Riot
// Data Dragon. Zero model tokens.
//
// WHY THIS EXISTS
// Matchup content needs each champion's kit ~47 times (once as the owner, ~46 times
// as somebody's enemy). Researching it per matchup costs ~47x what it should. This
// builds the facts ONCE into champ-data/_kits/<slug>.json so writing passes can read
// instead of research, and so a patch only invalidates the champions Riot touched.
//
//   node tools/build-kit-library.js [path/to/championFull.json]
//
// Flags below are DERIVED FROM RIOT'S OWN ABILITY TEXT and are high-precision but not
// exhaustive — Riot's descriptions omit plenty. Anything marked confidence "derived"
// is safe to rely on; gaps are for a model pass to fill, not to guess at.
const fs = require('fs');
const path = require('path');

const SRC = process.argv[2] || 'championFull.json';
if (!fs.existsSync(SRC)) {
  console.error(`Data Dragon file not found: ${SRC}
Fetch the current one first, e.g.
  curl -s -o championFull.json "https://ddragon.leagueoflegends.com/cdn/$(curl -s https://ddragon.leagueoflegends.com/api/versions.json | head -1 | tr -d '[]" ')/data/en_US/championFull.json"`);
  process.exit(1);
}
const DD = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const DATA = DD.data;
const VERSION = DD.version || 'unknown';

const OUT = path.join('champ-data', '_kits');
fs.mkdirSync(OUT, { recursive: true });

const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
const clean = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

// Each rule: [flag, regex, why-it-matters]. Matched against Riot's own ability text.
const RULES = [
  ['projectile', /\b(projectile|missile|fires?|throws?|hurls?|launches?|shoots?|lobs?)\b/i, 'can be blocked by Wind Wall-class effects'],
  ['blocksProjectiles', /blocks? (all )?(enemy )?projectiles?|destroys? (enemy )?projectiles?/i, 'deletes enemy projectile damage entirely'],
  ['spellShield', /blocks? the next enemy (ability|spell)|spell ?shield/i, 'eats one targeted ability — bait it first'],
  ['dash', /\b(dash(es|ing)?|leaps?|lunges?|charges? (at|toward)|blinks?|teleports?)\b/i, 'mobility that grounding and walls can deny'],
  ['grounding', /(cannot|can't|unable to) (use|cast) (movement|mobility|dash)|grounds?\b/i, 'shuts off enemy dashes'],
  ['knockup', /\b(knocks? (up|back|aside)|airborne|tosses|flings?|pulls? (them|the target)|displac)/i, 'displacement — enables knockup-dependent ults, ignored by unstoppable'],
  ['hardCC', /\b(stuns?|roots?|snares?|charms?|fears?|taunts?|suppress|immobiliz|sleep)/i, 'lockdown — check tenacity, cleanse and QSS'],
  ['silence', /\bsilenc/i, 'denies ability casts'],
  ['slow', /\bslow(s|ed|ing)?\b/i, 'kiting and disengage tool'],
  ['shield', /\bshield(s|ed|ing)?\b/i, 'absorbs burst — changes all-in maths'],
  ['heal', /\b(heal(s|ed|ing)?|restores? health|lifesteal|drain|omnivamp)\b/i, 'anti-heal target — Grievous Wounds timing matters'],
  ['untargetable', /\buntargetable|invulnerab|immune to (all )?damage|stasis/i, 'dodges timed burst and executes'],
  ['stealth', /\b(stealth|invisib|camouflage|unseen)\b/i, 'needs Control Wards or a sweeper'],
  ['revealsStealth', /\b(reveal(s|ing)?|true sight|detects?)\b/i, 'answers stealth champions'],
  ['autoReset', /(next (basic )?attack|resets? (his|her|their|the) (basic )?attack|attack reset)/i, 'auto-attack reset — burst timing tell'],
  ['onHit', /\bon-?hit\b/i, 'scales with on-hit items, applies item effects'],
  ['trueDamage', /\btrue damage\b/i, 'ignores armour and MR — resistances do not help'],
  ['percentHealth', /(% of (the )?(target|their|its)[^.]{0,30}(maximum |max )?health|percent of[^.]{0,20}health|maximum health)/i, 'punishes HP stacking — armour alone is not the answer'],
  ['execute', /\bexecut(e|es|ing)\b|if (the target|they) (is|are) below/i, 'threshold kill — stay above it'],
  ['terrain', /\b(wall|terrain|impassab|barrier|pillar)\b/i, 'creates terrain, blocks paths and dashes'],
  ['channel', /\bchannel(s|ed|ing)?\b/i, 'interruptible — any CC cancels it'],
  ['global', /\bglobal\b|anywhere on the map|entire map/i, 'map-wide pressure, no safe overextend'],
  ['zone', /\b(zone|area|field|aura|ground|storm|cloud)\b/i, 'area denial'],
  ['antiHeal', /\bgrievous wounds\b/i, 'applies healing reduction'],
];

const SLOTS = ['P', 'Q', 'W', 'E', 'R'];

function abilityRecord(slotKey, a, isPassive) {
  const text = clean(a.description) + ' ' + clean(a.tooltip || '');
  const flags = {};
  for (const [flag, re, why] of RULES) if (re.test(text)) flags[flag] = why;
  return {
    slot: slotKey,
    // "/" separates the two names of a form-swap champion (Jayce, Elise, Nidalee...)
    names: String(a.name).split('/').map(s => s.trim()).filter(Boolean),
    description: clean(a.description),
    cooldown: isPassive ? null : (a.cooldownBurn || null),
    cost: isPassive ? null : (a.costBurn || null),
    costType: isPassive ? null : clean(a.costType || ''),
    range: isPassive ? null : (a.rangeBurn || null),
    flags,
  };
}

const index = [];
let flagTotals = {};

for (const [id, c] of Object.entries(DATA)) {
  const abilities = [abilityRecord('P', c.passive, true)];
  SLOTS.slice(1).forEach((k, i) => { if (c.spells[i]) abilities.push(abilityRecord(k, c.spells[i], false)); });

  // champion-level roll-up: which flags exist anywhere in the kit, and on which slots
  const kitFlags = {};
  for (const ab of abilities) for (const f of Object.keys(ab.flags)) (kitFlags[f] = kitFlags[f] || []).push(ab.slot);
  for (const f of Object.keys(kitFlags)) flagTotals[f] = (flagTotals[f] || 0) + 1;

  const rec = {
    id, key: c.key, name: c.name, title: c.title, slug: slug(id),
    tags: c.tags, resource: c.partype,
    ddragonVersion: VERSION,
    generated: 'tools/build-kit-library.js — derived from Riot Data Dragon, no model involved',
    abilities,
    kitFlags,
    // Deliberately empty: Riot's text does not cover these. A model pass fills them,
    // and anything still empty must be treated as UNKNOWN, never as "no".
    needsResearch: {
      spellShieldable: null,   // which of this champ's abilities a spell shield eats
      cleansable: null,        // what Cleanse / QSS removes
      tenacityAffected: null,  // which CC tenacity shortens
      flashBuffer: null,       // abilities that can be Flash-buffered mid-cast
      animationCancels: null,
      minionBlock: null,       // does it stop on minions
      knownBugs: null,
    },
  };
  fs.writeFileSync(path.join(OUT, rec.slug + '.json'), JSON.stringify(rec, null, 1));
  index.push({ slug: rec.slug, id, name: c.name, tags: c.tags, kitFlags: Object.keys(kitFlags) });
}

index.sort((a, b) => a.slug.localeCompare(b.slug));
fs.writeFileSync(path.join(OUT, '_index.json'), JSON.stringify({ ddragonVersion: VERSION, count: index.length, champions: index }, null, 1));

console.log(`kit library built: ${index.length} champions -> ${OUT}/`);
console.log(`Data Dragon version ${VERSION}`);
console.log('\nchampions carrying each derived flag:');
Object.entries(flagTotals).sort((a, b) => b[1] - a[1])
  .forEach(([f, n]) => console.log(String(n).padStart(4), f));

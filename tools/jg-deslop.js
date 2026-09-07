// jg-deslop.js — strip generated filler from JG_DB prose. Deterministic, no model.
//
//   node tools/jg-deslop.js            # dry run: counts + samples, writes nothing
//   node tools/jg-deslop.js --write    # apply
//   node tools/jg-deslop.js --write --champ "Lee Sin"
//
// WHY: the jungle data was generated with a vocabulary no League player uses. Measured
// 2026-09-01 across 2,499 entries / 42,483 text fields: "camp node" and "your model" each
// appeared exactly 2,450 times — once per non-mirror entry — and "quadrant" 7,724 times.
// 94% of entries carried at least one. These are template slots, not writing tics, so they
// come out deterministically and for free rather than costing an agent pass.
//
// RULES
//  - Longest phrase first. "across both quadrants of the map line" must be caught before
//    the bare word "quadrant", or the sentence is left half-fixed.
//  - Replacements only ever REMOVE invented vocabulary. Nothing here asserts a game fact,
//    changes a verdict, or renames an ability — an audit does that, not a rename tool.
//  - Case-insensitive matching, but the replacement preserves leading capitalisation so
//    sentence starts survive.
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const WRITE = argv.includes('--write');
const ci = argv.indexOf('--champ');
const ONLY = ci > -1 ? argv[ci + 1] : null;
const DIR = 'champ-data/jg';

// Ordered. Longest / most specific first.
const SWAPS = [
  // whole generated clauses
  ['across the opposite quadrant map layout', 'on the other side of the map'],
  ['across both quadrants of the map line', 'on both sides of the map'],
  ['an elite, unmatched operational flexibility', 'unmatched flexibility'],
  ['elite, unmatched operational flexibility', 'unmatched flexibility'],
  ['leaving your model with zero resource parameters to execute an escape',
   'leaving you with nothing left to escape with'],
  ['Track the vertical tracking indicators of', 'Track the pathing of'],
  ['the vertical tracking indicators of', 'the pathing of'],
  ['vertical tracking indicators', 'pathing'],
  ['zero resource parameters', 'no resources'],
  ['resource parameters', 'resources'],
  ['landing profiles', 'landing'],
  ['landing profile', 'landing'],

  // the two exact-2450 template slots
  ['isolated camp nodes', 'isolated camps'],
  ['camp nodes', 'camps'],
  ['camp node', 'camp'],
  ['your model', 'you'],

  // quadrant -> side, most specific first
  ['jungle quadrant', 'jungle'],
  ['into your quadrant', 'into your jungle'],
  ['clear out quadrants', 'clear out both sides'],
  ['both quadrants', 'both sides'],
  ['opposite quadrant', 'opposite side'],
  ['blue quadrant', 'blue side'],
  ['red quadrant', 'red side'],
  ['top-lane quadrant', 'topside jungle'],
  ['quadrant entries', 'jungle entries'],
  ['quadrants', 'sides'],
  ['quadrant', 'side'],

  // pacing / speed filler
  ['the exact split-second', 'the moment'],
  ['the exact split second', 'the moment'],
  ['high-velocity ', 'fast '],
  ['high velocity ', 'fast '],
  ['clear track', 'clear'],
  ['tracking path', 'path'],
  ['clear sequence', 'clear'],
  ['horizontal clears', 'full clears'],
  ['horizontal clear', 'full clear'],
  ['camp block', 'camps'],
  ['starting camp block', 'starting camps'],

  // ---- second pass (2026-09-01), after the first sweep took 25,420 -> 2,315 ----
  // "metrics" and "profiles" are filler in every observed context, but they cannot be
  // deleted blind: "crowd control metrics ARE" needs a plural noun to keep the verb.
  ['crowd control metrics', 'crowd control tools'],
  ['early dueling metrics', 'early dueling'],
  ['area burst metrics', 'area burst damage'],
  ['camp gold metrics', 'camp gold'],
  ['high mobility metrics', 'high mobility'],
  ['passive execute metric', 'passive execute'],
  ['the tight geometric layout', 'the tight terrain'],
  ['geometric layout', 'terrain'],
  ['transition gank profiles', 'gank patterns'],
  ['incoming threat profiles', 'incoming threats'],
  ['routing profile', 'pathing'],
  ['cooldown profile', 'cooldowns'],
  ['high-risk operational profile', 'high-risk playstyle'],
  ['operational profile', 'playstyle'],
  ['damage profile', 'damage'],
  ['health pool profile', 'health pool'],
  ['threat profile', 'threat'],

  // "block" is mostly LEGITIMATE League vocabulary — body-block, terrain block,
  // pit-blocker, AoE block — so only the invented camp senses are swapped.
  ['rotation per block', 'rotation per camp'],
  ['the opening block', 'the opening camps'],
  ['multi-monster blocks', 'multi-monster camps'],

  ['fast single-target nuke', 'single-target burst'],
  ['high-velocity', 'fast'],

  // ---- third pass: the long tail, 49 occurrences each (once per owner) ----
  ['spiderling attack metrics', 'spiderling attacks'],
  ['health damage metrics', 'health damage'],
  ['health loss metrics', 'health loss'],
  ['high armor metrics', 'high armour'],
  ['combat spacing metrics', 'combat spacing'],
  ['10% health metrics', '10% health'],
  ['movement slow metric', 'movement slow'],
  ['secondary repositioning metrics', 'secondary repositioning'],
  ['secondary repositioning metric', 'secondary repositioning'],
  ['unexpected gank metrics', 'unexpected ganks'],
  ['dictate the geometric lines', 'dictate the angles'],
  ['geometric lines', 'angles'],
  ['full camp profile', 'full camp clear'],
  ['operational spacing profile', 'spacing'],
  ['directional slow profile', 'directional slow'],

  // ---- fourth pass: the last of it ----
  ['early gank metrics', 'early ganks'],
  ['single-target burst profiles', 'single-target burst'],
  ['high-intensity micro-spacing profile', 'tight spacing'],
  ['micro-spacing profile', 'spacing'],
  ['single-target energy profile', 'single-target, energy-hungry kit'],
  // the remaining "block" hits are real League vocabulary — body-block, terrain block,
  // pit-blocker, "a shield that blocks" — and are deliberately left alone. Only the
  // invented camp sense is swapped.
  // ---- STALE / WRONG ABILITY NAMES ------------------------------------------------
  // Every one of these was verified against champ-data/_kits/*.json (Data Dragon 16.15.1)
  // with tools/jg-name-check.js. They are safe to apply globally because each name is
  // unique to one champion, so an enemy page describing Trundle gets corrected too.
  //
  // A CAUTION WORTH KEEPING: a QA agent reported Shyvana's Emberstrike/Inferno Aegis/
  // Molten Burst as FABRICATED and named Twin Bite/Burnout/Flame Breath as the real ones.
  // It was exactly backwards — Shyvana was reworked and the kit carries the new names.
  // Acting on that report would have corrupted 50 correct matchups. The kit file is the
  // authority, never an agent's recollection.
  ['Ice Pillar', 'Pillar of Ice'],                 // Trundle E
  ['True Grit', 'Quickdraw'],                      // Graves E — the armour stacks are Quickdraw's
  ['Twin Bite', 'Emberstrike'],                    // Shyvana Q, pre-rework name
  ['Burnout', 'Inferno Aegis'],                    // Shyvana W, pre-rework name
  ['Flame Breath', 'Molten Burst'],                // Shyvana E, pre-rework name
  ['Unburrow', 'Un-burrow'],                       // Rek'Sai W
  ['Void Spikes', 'Void Spike'],                   // Kha'Zix W is singular
  ["Hound's Pursuit", "Hounds' Pursuit"],          // Naafiri R
  ['Void Coral (R)', 'Void Coral'],                // Bel'Veth: real resource, but NOT her R
  // "The" prefixes are handled by a guarded regex below, not here — a swap pair
  // would flip back and forth between runs and never settle.

  ['farm AoE blocks', 'farm AoE camps'],
  ['the AoE blocks', 'the AoE camps'],
  ['pool the blocks', 'pool the camps'],

  // ---- fifth pass: leftovers, plus one duplication the cascade itself created ----
  // "opposite quadrant map layout" reached "opposite side side map layout" because two
  // rules in this table both matched the same span. Ordering fixed it for new runs; this
  // line repairs the text already written. Re-running the tool is idempotent either way.
  ['opposite side side map layout', 'other side of the map'],
  ['side side', 'side'],
  ['zero terrain-crossing escape parameters', 'no way back over a wall'],
  ['zero defensive parameters', 'nothing defensive left'],
  ['dash parameters', 'dash'],
  ['escape parameters', 'escape tools'],
  ['parameters', 'tools'],

  // ---- sixth pass (2026-09-07, pre-launch audit): the item-spike and level-6 templates ----
  // Measured before this pass: "fight geometries" 1,150, "termination loop" 993, "entirely
  // automated" 811 (+49 "highly automated", same slot), "horizontal resets" 725,
  // "hyper-velocity" 145, "target models" 110. Each is one template slot repeated once per
  // matchup, so the replacement is chosen from the sentence it sits in, not the phrase alone.
  //
  // "dictates fight geometries through guaranteed initiation" — the sentence means you decide
  // how the fight is shaped. "warps standard teamfight geometries" is the Kayn form line.
  ['completely warps standard teamfight geometries', 'completely changes the shape of a teamfight'],
  ['who dictates fight geometries through', 'who dictates the shape of every fight through'],
  ['that dictates fight geometries through', 'that dictates the shape of every fight through'],
  ['dictates fight geometries', 'dictates the shape of every fight'],
  ['dictate fight geometries', 'dictate the shape of every fight'],
  ['dictates fight geometry', 'dictates the shape of a fight'],
  ['dictate fight geometry', 'dictate the shape of a fight'],
  ['teamfight geometries', 'teamfight positioning'],
  ['fight geometries', 'fight positioning'],
  ['fight geometry', 'fight positioning'],

  // "burst them out of their lane boundary for an instant termination loop" — it is a kill.
  // Four hand-written rows quote the phrase ('termination loop') to argue with the template;
  // they get the same plain word.
  ["as an 'instant termination loop'", 'as an instant kill'],
  ["a unilateral 'termination loop'", 'a guaranteed kill'],
  ['for an instant termination loop', 'for a clean kill'],
  ['the automatic termination loop', 'the automatic kill'],
  ['termination loops', 'kills'],
  ['termination loop', 'kill'],

  // "Your camp clearing loops become entirely automated, allowing you to instantly clear out
  // both sides" — the first-item spike line on 762 pages. The same slot also reads "highly
  // automated" (49) and "incredibly fast" (557); all three are the same sentence.
  ['Your camp clearing loops become entirely automated, allowing you to', 'Your clear is on autopilot, letting you'],
  ['Your clear velocity becomes entirely automated, allowing you to', 'Your clear is on autopilot, letting you'],
  ['Your camp clearing loops become highly automated, allowing you to', 'Your clear is on autopilot, letting you'],
  ['Your camp clearing loops become incredibly fast, allowing you to', 'Your clear gets very fast, letting you'],
  ['camp clearing loops', 'clear'],
  ['entirely automated', 'on autopilot'],
  ['highly automated', 'on autopilot'],

  // "Prioritize rapid champion kills over executing slow, farm-heavy horizontal resets" — the
  // contrast is kills versus farming, and the jungle word for that farming is a full clear
  // (the same word "horizontal clears" already maps to above). Never a lane reset: every
  // occurrence sits in the levels 4-5 macro row about your own camps.
  ['farmheavy horizontal resets', 'farm-heavy full clears'],
  ['horizontal resets', 'full clears'],
  ['horizontal reset', 'full clear'],

  // "melt camps at hyper-velocity, allowing you to" — fast. The one sentence that already
  // says "rapidly" two words later gets "in seconds" so it does not say fast twice.
  ['at hyper-velocity, letting you clear sides rapidly', 'in seconds, letting you clear sides rapidly'],
  ['at hyper-velocity, allowing you to', 'fast, letting you'],
  ['at hyper-velocity', 'fast'],
  ['hyper-velocity', 'fast'],

  // "blind target models before executing a dash-burst cycle" — Graves' Smoke Screen line,
  // and Morgana's "shred values against target models". They are targets.
  ['completely blind target models before executing a dash-burst cycle', 'blind your target before you dash in and burst them'],
  ['shred values against target models', 'shred against your targets'],
  ['target models', 'targets'],
  ['target model', 'target'],

  // Nunu's level-3 row: "Tempo Access to Snowball Barrage (E)" — "Tempo" is a stray slot.
  ['Tempo Access to', 'Access to'],

  // compounds the generator glued together with the hyphen missing
  ['lowpercentage', 'low-percentage'],
  ['highimpact', 'high-impact'],
  ['shortrange', 'short-range'],
  ['midclear', 'mid-clear'],
  ['highvalue', 'high-value'],
  ['farmheavy', 'farm-heavy'],
  ['mapwide', 'map-wide'],
];

function applySwaps(s) {
  if (typeof s !== 'string') return { out: s, hits: 0 };
  let out = s, hits = 0;
  for (const [from, to] of SWAPS) {
    let i = 0;
    for (;;) {
      const lower = out.toLowerCase();
      const at = lower.indexOf(from.toLowerCase(), i);
      if (at === -1) break;
      // preserve a capital at the start of the matched span
      const matched = out.slice(at, at + from.length);
      let rep = to;
      if (matched[0] === matched[0].toUpperCase() && matched[0] !== matched[0].toLowerCase()) {
        rep = to[0].toUpperCase() + to.slice(1);
      }
      out = out.slice(0, at) + rep + out.slice(at + from.length);
      i = at + rep.length;
      hits++;
    }
  }
  // ---- BROKEN COMPOUND WORDS -----------------------------------------------------
  // The source data splits hyphenated compounds with a stray space: "map- wide",
  // "late- game", "gap- closing", "hyper- carry", "Split- Pusher". 1,831 occurrences
  // across 26 files and 38 distinct patterns, every one of them a broken word — verified
  // against the pre-deslop commit, so this is in the generated source, not something the
  // swaps above introduced. The rule needs a LETTER on both sides: a real em-dash (—) and
  // a spaced hyphen used as punctuation ("Level 1 - Clear") both have a space before the
  // hyphen and are left alone. A digit on the left is the same break ("6- camp", 55 times).
  const beforeHy = out;
  out = out.replace(/([A-Za-z0-9])- ([A-Za-z])/g, '$1-$2');
  if (out !== beforeHy) hits++;

  // A broken mail-merge substitution: the template inserted a possessive where the token
  // resolved to "you", giving "cancel you's winding animation frames". 32 occurrences,
  // all in the Level 1 Clear why. "your" is the correct possessive.
  const beforeMerge = out;
  out = out.replace(/you's/g, 'your');
  if (out !== beforeMerge) hits++;

  // A plain typo, 127 times, inside the shared tldr template ("clearing whole campss").
  // Several audits reviewed rows containing it and reported nothing to fix.
  // Naafiri W and Kayn P carry a leading "The" in the kit. Add it only when it is absent,
  // so running twice cannot produce "The The".
  out = out.replace(/(?<!The )Call of the Pack/g, 'The Call of the Pack');
  out = out.replace(/(?<!The )Darkin Scythe/g, 'The Darkin Scythe');

  const beforeTypo = out;
  out = out.replace(/campss/g, 'camps');
  if (out !== beforeTypo) hits++;

  // tidy any double spaces the swaps introduced
  out = out.replace(/ {2,}/g, ' ').replace(/ ,/g, ',').replace(/ \./g, '.');
  return { out, hits };
}

// JG files are `window.JG_DB["Owner"] = {...}` style; operate on raw text so formatting,
// comments and assignment style are all preserved exactly.
let files = fs.readdirSync(DIR).filter(f => f.endsWith('.js') && !f.startsWith('_'));
let totalHits = 0, filesChanged = 0;
const samples = [];

for (const f of files) {
  const p = path.join(DIR, f);
  const src = fs.readFileSync(p, 'utf8');
  if (ONLY && !src.includes(`"${ONLY}"`)) continue;

  // Only touch string literals, never keys or code. Walk double-quoted JSON strings.
  let out = '', i = 0, hits = 0;
  for (;;) {
    const q = src.indexOf('"', i);
    if (q === -1) { out += src.slice(i); break; }
    // find the closing quote, respecting escapes
    let j = q + 1;
    while (j < src.length) {
      if (src[j] === '\\') { j += 2; continue; }
      if (src[j] === '"') break;
      j++;
    }
    const body = src.slice(q + 1, j);
    const r = applySwaps(body);
    if (r.hits && samples.length < 6 && body.length > 60) samples.push([body, r.out]);
    hits += r.hits;
    out += src.slice(i, q + 1) + r.out;
    i = j;
  }

  if (hits) {
    totalHits += hits; filesChanged++;
    if (WRITE) fs.writeFileSync(p, out);
    console.log(`  ${hits.toString().padStart(5)}  ${f}`);
  }
}

console.log(`\n${totalHits} replacements across ${filesChanged} file(s)`);
if (samples.length) {
  console.log('\n--- samples ---');
  for (const [b, a] of samples) {
    console.log('\n  BEFORE: ' + b.slice(0, 190));
    console.log('  AFTER : ' + a.slice(0, 190));
  }
}
if (!WRITE) console.log('\nDRY RUN — nothing written. Re-run with --write to apply.');

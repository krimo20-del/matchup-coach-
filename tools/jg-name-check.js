// jg-name-check.js — find ability names in JG_DB that Riot's kit data does not recognise.
//
//   node tools/jg-name-check.js              # all junglers
//   node tools/jg-name-check.js "Shyvana"
//
// WHY: a QA agent reported Shyvana's data as using "fabricated" ability names
// (Emberstrike/Inferno Aegis/Molten Burst) and named Twin Bite/Burnout/Flame Breath as the
// real ones. It was exactly backwards — Shyvana was reworked, champ-data/_kits/shyvana.json
// (Data Dragon 16.15.1) carries the new names, and the OLD names were the stale ones in the
// data. Acting on that report would have corrupted 50 correct matchups.
//
// So: never take an agent's word about an ability name. This checks the text against the
// kit files, which are generated from Riot's own data with no model involved.
//
// It reports a name as SUSPECT only when the text tags it as an ability — "Foo (Q)" — and
// no kit for that champion lists it. Untagged prose is not flagged, because a sentence may
// legitimately mention an item, a monster or a phrase that looks like a name.
const fs = require('fs');
const path = require('path');

const ONLY = process.argv[2] || null;
const JG_DIR = 'champ-data/jg';
const KIT_DIR = 'champ-data/_kits';

// every real ability name Riot knows about, across every champion
const REAL = new Set();
const BY_CHAMP = new Map();
for (const f of fs.readdirSync(KIT_DIR).filter(x => x.endsWith('.json'))) {
  let k; try { k = JSON.parse(fs.readFileSync(path.join(KIT_DIR, f), 'utf8')); } catch (e) { continue; }
  if (!k || !k.name) continue;
  const names = [];
  for (const a of (k.abilities || [])) for (const n of (a.names || [])) {
    REAL.add(n.toLowerCase()); names.push(`${a.slot}:${n}`);
  }
  if (!BY_CHAMP.has(k.name) || /^jade/i.test(f) === false) BY_CHAMP.set(k.name, names);
}

const w = {};
for (const f of fs.readdirSync(JG_DIR).filter(x => x.endsWith('.js') && !x.startsWith('_'))) {
  try { new Function('window', fs.readFileSync(path.join(JG_DIR, f), 'utf8'))(w); } catch (e) {}
}
const db = w.JG_DB || {};

// "Some Name (Q)" / "Some Name (P)" — the tagged form the corpus uses for abilities
const TAGGED = /([A-Z][A-Za-z'’\- ]{2,34}?)\s*\((?:P|Q|W|E|R)\)/g;

const suspect = new Map();
for (const owner of Object.keys(db)) {
  if (ONLY && owner !== ONLY) continue;
  for (const enemy of Object.keys(db[owner])) {
    const e = db[owner][enemy];
    const text = [e.tldr, e.start, e.scuttle, e.topObj, e.invade, e.watch, e.weak, e.split, e.picks, e.win]
      .concat((e.stages || []).map(s => s.why)).filter(Boolean).join(' ');
    let m;
    TAGGED.lastIndex = 0;
    while ((m = TAGGED.exec(text)) !== null) {
      // Strip the leading verbs and connectors the corpus wraps names in. "Start with
      // Tantrum (E)" is a sentence containing Tantrum, not an ability called "Start with
      // Tantrum" — without this every real name reads as suspect and the signal is lost.
      let name = m[1].trim();
      const LEAD = /^(start|open|access|unlocking|evolving|use|using|lead|cast|casting|with|to|and|your|the|a|an|form|human|spider|camp|utilizing|activate|pop|popping|press|hit)\s+/i;
      let prev;
      do { prev = name; name = name.replace(LEAD, ''); } while (name !== prev);
      name = name.trim();
      if (!name || !/^[A-Z]/.test(name)) continue;
      const lc = name.toLowerCase();
      if (REAL.has(lc)) continue;
      // Stripping leading words can also strip a real prefix — "The Darkin Scythe" becomes
      // "Darkin Scythe". Accept the candidate if any real name ends with it, or if it ends
      // with a real name (the corpus wraps names in sentence fragments this list cannot
      // fully enumerate, e.g. "Q sustain plus Primal Howl").
      let ok = false;
      for (const r of REAL) { if (r.endsWith(lc) || lc.endsWith(r)) { ok = true; break; } }
      if (ok) continue;
      const key = `${owner} :: ${name}`;
      suspect.set(key, (suspect.get(key) || 0) + 1);
    }
  }
}

if (!suspect.size) { console.log('No unrecognised tagged ability names found.'); process.exit(0); }
console.log('TAGGED ABILITY NAMES NOT FOUND IN ANY KIT:\n');
const rows = [...suspect.entries()].sort((a, b) => b[1] - a[1]);
for (const [k, n] of rows) {
  const [owner, name] = k.split(' :: ');
  console.log(`  ${String(n).padStart(4)}  ${owner.padEnd(16)} "${name}"`);
}
console.log(`\n${rows.length} distinct name(s). Cross-check each against the champion's kit before`);
console.log('changing anything — a name missing here can mean a rework the kit already knows about.');
for (const [k] of rows.slice(0, 6)) {
  const owner = k.split(' :: ')[0];
  if (BY_CHAMP.has(owner)) console.log(`\n  ${owner} real kit: ${BY_CHAMP.get(owner).join(' | ')}`);
}

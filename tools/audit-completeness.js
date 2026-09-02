// audit-completeness.js — verify, mechanically, that an audited lane actually meets
// every requirement. Checks the RESULT on disk, never an agent's self-report.
//
//   node tools/audit-completeness.js            # every lane
//   node tools/audit-completeness.js bot        # one lane
//   node tools/audit-completeness.js bot --fail # exit 1 if anything is unmet (CI/pre-deploy)
//
// Compares the working tree against git HEAD, so it also catches what was silently
// left alone or silently deleted.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LANE_ARG = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : null;
const FAIL_MODE = process.argv.includes('--fail');

const LANES = [
  { key: 'top', dir: 'champ-data/content', full: 'champ-data', suffix: '' },
  { key: 'mid', dir: 'champ-data/content/mid', full: 'champ-data/mid', suffix: '_mid' },
  { key: 'bot', dir: 'champ-data/content/bot', full: 'champ-data/bot', suffix: '_bot' },
  { key: 'support', dir: 'champ-data/content/sup', full: 'champ-data/sup', suffix: '_sup' },
].filter(L => !LANE_ARG || L.key === LANE_ARG);

// ---------- kit library (ground truth for ability names) ----------
const KITS = 'champ-data/_kits';
const K = {};
if (fs.existsSync(KITS)) {
  for (const f of fs.readdirSync(KITS)) {
    if (!f.endsWith('.json') || f.startsWith('_')) continue;
    const r = JSON.parse(fs.readFileSync(path.join(KITS, f), 'utf8'));
    K[r.slug] = r;
  }
}
const ALIAS = { wukong: 'monkeyking', nunuwillump: 'nunu', renataglasc: 'renata' };
const bare = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
const kitOf = s => K[bare(s)] || K[ALIAS[bare(s)]] || null;
const abilNames = k => k ? k.abilities.flatMap(a => a.names) : [];

const MISSING = fs.existsSync(path.join(KITS, '_missing-interactions.json'))
  ? JSON.parse(fs.readFileSync(path.join(KITS, '_missing-interactions.json'), 'utf8')) : [];
const missingBy = new Map();
for (const m of MISSING) missingBy.set(m.ownerKey + '|' + m.enemy, m.missing);

// ---------- detectors ----------
const SEQ = [/\bbait(?:ing|s)?\b[^.]{0,60}\b(?:before|then|so)\b/i, /\bwait(?:ing)?\s+(?:for|until)\b/i,
  /\bonce\s+(?:he|she|they|it)\s+(?:uses?|has used|burns?|blows?|commits?)/i,
  /\bafter\s+(?:he|she|they)\s+(?:uses?|casts?|blows?|dashes|commits?)/i,
  /\b(?:when|while)\b[^.]{0,50}\bis (?:down|on cooldown)\b/i, /\bon cooldown\b/i,
  /\bdon['’]?t\s+(?:trade|engage|commit|step up|all-?in)\b[^.]{0,60}\b(?:until|before)\b/i,
  /\bpunish(?:es|ing)?\b[^.]{0,50}\b(?:cooldown|whiff|miss(?:ed|es)?)\b/i, /\bdodge\b/i,
  /\bhold\s+(?:your\s+)?[QWER]\b/i, /\bsave\s+(?:your\s+)?[QWER]\b/i, /\b\d+\s*(?:s|sec|seconds)\b/i];
const ELO = /\b(diamond\s*\+|master\s*\+|challenger|grandmaster|low\s*elo|high\s*elo|emerald\s*\+)\b/i;
const NEGATIVE = /\b(does not (block|proc|apply|work|reset)|doesn['’]t (block|proc|apply|work|reset)|cannot be (cleansed|blocked|shielded|stopped)|no spell ?shield|qss does not|tenacity does not|is not affected by)\b/i;
const FILLER = /\b(generally speaking|make sure to|it['’]s important to|be aware that|try to remember|as a general rule)\b/i;

const fieldsOfContent = c => {
  const out = [];
  (c.spikes || []).forEach((s, i) => s && s.text && out.push(['spikes[' + i + '].text', s.text]));
  ((c.wants || {}).you || []).forEach((t, i) => out.push(['wants.you[' + i + ']', t]));
  ((c.wants || {}).foe || []).forEach((t, i) => out.push(['wants.foe[' + i + ']', t]));
  ['early', 'mid', 'late'].forEach(k => c[k] && out.push([k, c[k]]));
  (c.whys || []).forEach((t, i) => out.push(['whys[' + i + ']', t]));
  return out;
};
const fieldsOfFull = e => {
  const out = [];
  ['tldr', 'winCon', 'enemyWin', 'tradeGood', 'tradeBad', 'ahead', 'loading', 'focus'].forEach(k => {
    if (typeof e[k] === 'string' && e[k]) out.push([k, e[k]]);
  });
  (e.phases || []).forEach((p, i) => p && p.why && out.push(['phases[' + i + '].why', p.why]));
  if (e.breakdown && typeof e.breakdown === 'object') {
    for (const [k, v] of Object.entries(e.breakdown)) if (typeof v === 'string' && v) out.push(['breakdown.' + k, v]);
  }
  for (const k of ['dosFull', 'dontsFull']) {
    const v = e[k];
    if (typeof v === 'string' && v) out.push([k, v]);
    else if (Array.isArray(v)) v.forEach((t, i) => typeof t === 'string' && out.push([k + '[' + i + ']', t]));
  }
  return out;
};

const loadContent = (src, key) => {
  const w = { MC_WR_TABLES: {}, MC_CONTENT_EXTRA: [], MC_REAL_GAMES: {}, __mcLoaded: {} };
  new Function('window', src)(w);
  return { entries: w.MC_CONTENT_EXTRA.filter(c => c.a === key), wr: w.MC_WR_TABLES[key] || {}, games: w.MC_REAL_GAMES[key] || {} };
};
const loadFull = (src, key) => { const w = {}; new Function('window', src)(w); return (w.CHAMP_FULL || {})[key] || {}; };
const gitShow = p => { try { return execSync('git show HEAD:"' + p + '"', { encoding: 'utf8', maxBuffer: 1e9, stdio: ['pipe', 'pipe', 'ignore'] }); } catch (e) { return null; } };

// ---------- run ----------
const REQS = ['structure', 'abilityNames', 'sequencing', 'namesEnemyAbility', 'interactionsResolved',
  'lengthDiscipline', 'noEloTiers', 'noNegatives', 'noFiller', 'chartVsWinRate', 'auditTrail', 'deferredUntouched',
  'keyPointsCovered', 'allSectionsPresent'];

// The user's three key points: 2 lane difficulty, 3 power spikes, 4 ability interactions.
// A matchup is only done when its proposal records all three as actually examined.
const KEY_POINTS = [2, 3, 4];
// Every page section that must exist and carry real content.
const FULL_SECTIONS = ['tldr', 'winCon', 'enemyWin', 'diff', 'diffRating', 'tradeGood', 'tradeBad', 'ahead'];
const tally = {}; REQS.forEach(r => tally[r] = { pass: 0, fail: 0 });
const failures = [];
let totalMatchups = 0, deferred = 0, unchanged = 0;

for (const L of LANES) {
  if (!fs.existsSync(L.dir)) continue;
  for (const f of fs.readdirSync(L.dir).filter(x => x.endsWith('.js'))) {
    const key = f.replace('.js', '') + L.suffix;
    const cPath = path.join(L.dir, f).replace(/\\/g, '/');
    const fPath = path.join(L.full, f.replace('.js', '.full.js')).replace(/\\/g, '/');

    let now, head, fNow, fHead;
    try { now = loadContent(fs.readFileSync(cPath, 'utf8'), key); } catch (e) { failures.push(`${cPath}: PARSE FAIL — ${e.message}`); continue; }
    const hSrc = gitShow(cPath); head = hSrc ? (() => { try { return loadContent(hSrc, key); } catch (e) { return null; } })() : null;
    if (fs.existsSync(fPath)) {
      try { fNow = loadFull(fs.readFileSync(fPath, 'utf8'), key); } catch (e) { failures.push(`${fPath}: PARSE FAIL — ${e.message}`); }
      const fh = gitShow(fPath); if (fh) { try { fHead = loadFull(fh, key); } catch (e) {} }
    }

    const ownKit = kitOf(f.replace('.js', ''));
    for (const c of now.entries) {
      totalMatchups++;
      const at = `${key} vs ${c.b}`;
      const foeKit = kitOf(c.b);
      const hEntry = head && head.entries.find(x => x.b === c.b);
      const fEntry = fNow && fNow[c.b];
      const fhEntry = fHead && fHead[c.b];
      const cFields = fieldsOfContent(c);
      const fFields = fEntry ? fieldsOfFull(fEntry) : [];
      const blob = [...cFields, ...fFields].map(x => x[1]).join(' ');
      const bad = r => { tally[r].fail++; failures.push(`[${r}] ${at}`); };
      const good = r => tally[r].pass++;

      // 0. deferred (0-game) matchups must be byte-identical to HEAD
      const noData = now.games[c.b] === 0 || now.games[c.b] == null;
      if (noData) {
        deferred++;
        if (hEntry && JSON.stringify(hEntry) === JSON.stringify(c)) good('deferredUntouched'); else bad('deferredUntouched');
        continue; // every other requirement is waived for deferred matchups
      }
      good('deferredUntouched');

      // 1. structure
      const structOk = Array.isArray(c.win) && c.win.length === 7 && Array.isArray(c.whys) && c.whys.length === 7
        && Array.isArray(c.spikes) && c.spikes.length === 4
        && (!fEntry || (Array.isArray(fEntry.phases) && fEntry.phases.length === 7));
      structOk ? good('structure') : bad('structure');

      // 2. no fabricated ability names — every Title-Case phrase near a real name must BE one.
      // Normalise first: curly vs straight apostrophes, trailing punctuation, and simple
      // plurals ("Spinning Axes" for "Spinning Axe") are the author's prose, not errors.
      const norm = s => String(s).toLowerCase().replace(/[’']/g, "'").replace(/[!?.,:;]+$/, '').replace(/\s+/g, ' ').trim();
      const depl = s => s.replace(/\b(\w+?)(?:es|s)\b$/, '$1');
      const real = new Set();
      for (const n of [...abilNames(ownKit), ...abilNames(foeKit)]) { real.add(norm(n)); real.add(depl(norm(n))); }
      let nameOk = true;
      const suspects = (blob.match(/\b[A-Z][a-z’'-]+(?:\s+(?:of|the)\s+[A-Z][a-z’'-]+|\s+[A-Z][a-z’'-]+)+\b/g) || []);
      for (const s of new Set(suspects)) {
        const low = norm(s);
        if (real.has(low) || real.has(depl(low))) continue;
        for (const r of real) {
          if (Math.abs(r.length - low.length) > 4) continue;
          let d = 0; const n = Math.min(r.length, low.length);
          for (let i = 0; i < n; i++) if (r[i] !== low[i]) d++;
          d += Math.abs(r.length - low.length);
          if (d > 0 && d <= 3) { nameOk = false; failures.push(`[abilityNames] ${at}: "${s}" ~ real "${r}"`); break; }
        }
        if (!nameOk) break;
      }
      nameOk ? good('abilityNames') : tally.abilityNames.fail++;

      // 3/4. sequencing + names an enemy ability
      SEQ.some(r => r.test(blob)) ? good('sequencing') : bad('sequencing');
      const foeNames = abilNames(foeKit);
      (!foeNames.length || foeNames.some(n => blob.toLowerCase().includes(n.toLowerCase())))
        ? good('namesEnemyAbility') : bad('namesEnemyAbility');

      // 5. derived missing interactions now addressed
      const miss = missingBy.get(key + '|' + c.b) || [];
      if (!miss.length) good('interactionsResolved');
      else {
        const CONCEPT = {
          'projectiles-blocked': ['block', 'projectile', 'wind wall'], 'spellshield-eats-lockdown': ['spell shield', 'spellshield', 'black shield', 'banshee'],
          'dash-denied': ['ground', 'dash', 'wall'], 'enemy-dash-deniable': ['ground', 'dash', 'wall'],
          'untargetable-dodges-burst': ['untargetable', 'invulnerab', 'stasis', 'zhonya'], 'needs-antiheal': ['grievous', 'anti-heal', 'antiheal', 'executioner', 'morello', 'oblivion', 'thornmail', 'chempunk', 'bramble'],
          'resistances-invalidated': ['true damage', 'max health', 'maximum health', '% health', 'percent health'],
          'execute-threshold': ['execut', 'threshold', 'below'], 'stealth-needs-vision': ['control ward', 'sweeper', 'oracle', 'stealth', 'invisib'],
          'channel-interruptible': ['channel', 'interrupt', 'cancel'], 'your-channel-punished': ['channel', 'interrupt', 'cancel'],
          'knockup-enabler': ['knock', 'airborne', 'displac'], 'shield-absorbs-burst': ['shield'],
        };
        const t = blob.toLowerCase();
        const still = miss.filter(m => !(CONCEPT[m.rule] || []).some(w => t.includes(w)));
        still.length ? (tally.interactionsResolved.fail++, failures.push(`[interactionsResolved] ${at}: ${still.map(s => s.rule).join(', ')}`)) : good('interactionsResolved');
      }

      // 6. length discipline vs HEAD (±10%), both layers
      let lenOk = true, changedAny = false;
      const pairs = [[cFields, hEntry ? fieldsOfContent(hEntry) : null], [fFields, fhEntry ? fieldsOfFull(fhEntry) : null]];
      for (const [nowF, headF] of pairs) {
        if (!headF) continue;
        const hMap = new Map(headF);
        for (const [k, v] of nowF) {
          const h = hMap.get(k); if (h == null) continue;
          if (h !== v) changedAny = true;
          if (h.length && Math.abs(v.length - h.length) / h.length > 0.10) {
            lenOk = false; failures.push(`[lengthDiscipline] ${at} ${k}: ${h.length}->${v.length}`);
          }
        }
      }
      lenOk ? good('lengthDiscipline') : tally.lengthDiscipline.fail++;
      if (!changedAny && hEntry) unchanged++;

      // 7/8/9. banned language
      ELO.test(blob) ? bad('noEloTiers') : good('noEloTiers');
      NEGATIVE.test(blob) ? bad('noNegatives') : good('noNegatives');
      FILLER.test(blob) ? bad('noFiller') : good('noFiller');

      // 10. level chart vs win rate
      const W = now.wr[c.b];
      if (typeof W !== 'number' || !Array.isArray(c.win) || c.win.length !== 7) good('chartVsWinRate');
      else {
        const ownN = (ownKit && ownKit.name) || '', foeN = (foeKit && foeKit.name) || '';
        const cnt = n => c.win.filter(v => String(v).toLowerCase() === String(n).toLowerCase() || String(v).toLowerCase() === String(n).split(' ')[0].toLowerCase()).length;
        const o = cnt(ownN), e2 = cnt(foeN);
        ((W >= 52 && e2 >= o + 3) || (W <= 48 && o >= e2 + 3)) ? bad('chartVsWinRate') : good('chartVsWinRate');
      }

      // 11. audit trail written, and it covers the three key points
      const trailPath = path.join('audits', L.key, `${key}__${c.b}.json`);
      if (!fs.existsSync(trailPath)) { bad('auditTrail'); bad('keyPointsCovered'); }
      else {
        good('auditTrail');
        let trail = null;
        try { trail = JSON.parse(fs.readFileSync(trailPath, 'utf8')); } catch (e) {}
        const seen = new Set(((trail && trail.audit) || []).map(a => Number(a.point)));
        const gaps = KEY_POINTS.filter(p => !seen.has(p));
        gaps.length
          ? (tally.keyPointsCovered.fail++, failures.push(`[keyPointsCovered] ${at}: never examined point(s) ${gaps.join(', ')}`))
          : good('keyPointsCovered');
      }

      // 12. every page section still present and non-trivial (nothing hollowed out)
      const holes = [];
      if (fEntry) for (const s of FULL_SECTIONS) {
        const v = fEntry[s];
        if (typeof v !== 'string' || v.trim().length < 3) holes.push(s);
      }
      if (fEntry && (!Array.isArray(fEntry.phases) || fEntry.phases.some(p => !p || !p.why || !p.side))) holes.push('phases');
      for (const s of ['dosFull', 'dontsFull']) {
        if (!fEntry) break;
        const v = fEntry[s];
        const empty = v == null || (typeof v === 'string' && !v.trim()) || (Array.isArray(v) && !v.length);
        if (empty) holes.push(s);
      }
      holes.length
        ? (tally.allSectionsPresent.fail++, failures.push(`[allSectionsPresent] ${at}: empty/missing ${holes.join(', ')}`))
        : good('allSectionsPresent');
    }
  }
}

// ---------- report ----------
console.log(`=== audit completeness ${LANE_ARG ? '(' + LANE_ARG + ')' : '(all lanes)'} ===`);
console.log(`matchups checked: ${totalMatchups}   deferred (0 games): ${deferred}   still untouched: ${unchanged}\n`);
const W = 22;
let unmet = 0;
for (const r of REQS) {
  const { pass, fail } = tally[r];
  const tot = pass + fail;
  const pct = tot ? Math.round(pass / tot * 100) : 100;
  if (fail) unmet++;
  console.log(`${r.padEnd(W)} ${String(pass).padStart(6)} pass  ${String(fail).padStart(6)} fail   ${String(pct).padStart(3)}%${fail ? '' : '  OK'}`);
}
if (failures.length) {
  console.log(`\n--- first 40 of ${failures.length} problems ---`);
  failures.slice(0, 40).forEach(f => console.log('  ' + f));
}
console.log(`\n${unmet === 0 ? 'ALL REQUIREMENTS MET.' : unmet + ' requirement(s) not fully met.'}`);
if (FAIL_MODE && unmet) process.exit(1);

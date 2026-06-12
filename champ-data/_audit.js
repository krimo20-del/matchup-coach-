// MatchupCoach — data completeness auditor (dev tool, not loaded by the app).
// Usage in run_script: eval file, then `await audit(['darius','garen',...])`.
window.makeAuditor = function (helpers) {
  const { readFile, ls } = helpers;
  const norm = n => n.toLowerCase().replace(/[^a-z]/g, '');
  const DIFFS = ['HARD', 'TRICKY', 'EVEN', 'FAVOURED', 'FAVORED', 'MIRROR', 'SKILL'];
  const PLACEHOLDER = /\{E\}|\{K\}|\{KS\}|\{ME\}|undefined|\bTBD\b|\[object|lorem/i;
  const FULL_BREAKDOWN_KEYS = ['early', 'mid', 'wave', 'cooldowns', 'trading', 'spikes', 'feeding', 'carry', 'difficulty', 'late'];

  async function loadAll() {
    const W = { CHAMP_DATA: {}, CHAMP_FULL: {}, CHAMP_LOADOUTS: {} };
    const files = await ls('champ-data');
    for (const f of files) {
      if (!f.endsWith('.js') || f.startsWith('_') || f === 'rosters.js' || f === 'jungle-intel.js' || f === 'enemy-kits.js' || f === 'champ-configs-offmeta.js') continue;
      try { new Function('window', await readFile('champ-data/' + f))(W); } catch (e) { W.__err = (W.__err || []).concat(f + ': ' + e.message); }
    }
    try { new Function('window', await readFile('champ-data/rosters.js'))(W); } catch (e) {}
    try { new Function('window', await readFile('champ-data/champ-configs-offmeta.js'))(W); } catch (e) {}
    return W;
  }

  function chkStr(issues, tag, val, min) {
    if (typeof val !== 'string' || val.trim().length === 0) { issues.push(tag + ' EMPTY'); return; }
    if (val.trim().length < (min || 15)) issues.push(tag + ' too short ("' + val.slice(0, 40) + '")');
    else if (/^[:\s]/.test(val) && val[0] === ':') issues.push(tag + ' starts with ":"');
  }

  function auditChamp(W, key, allKeys, NAME) {
    const out = { key, data: [], full: [], load: [], warn: [] };
    const data = (W.CHAMP_DATA || {})[key];
    const full = (W.CHAMP_FULL || {})[key];
    // loadout registry: CHAMP_LOADOUTS[key] or special globals
    let load = (W.CHAMP_LOADOUTS || {})[key] || null;
    let loadSrc = load ? 'CHAMP_LOADOUTS' : null;
    if (!load && key === 'aatrox' && W.AATROX_JUGG_LOADOUTS) { load = W.AATROX_JUGG_LOADOUTS; loadSrc = 'AATROX_JUGG_LOADOUTS'; }
    if (!load && key === 'camille' && W.CAMILLE_LOADOUTS) { load = W.CAMILLE_LOADOUTS; loadSrc = 'CAMILLE_LOADOUTS'; }
    if (!load) {
      const g = Object.keys(W).find(k => k.toUpperCase().startsWith(key.toUpperCase()) && k.endsWith('_LOADOUTS'));
      if (g) { load = W[g]; loadSrc = g; }
    }
    out.loadSrc = loadSrc;

    if (!data) { out.data.push('NO CHAMP_DATA AT ALL'); return out; }

    const enemies = allKeys.filter(k => k !== key);
    // ---- CHAMP_DATA ----
    const dMissing = enemies.filter(k => !data[k]);
    if (dMissing.length) out.data.push('missing matchups [' + dMissing.length + ']: ' + dMissing.join(','));
    if (!data[key]) out.warn.push('no mirror entry');
    for (const [k, e] of Object.entries(data)) {
      const iss = [];
      if (!DIFFS.includes((e.diff || '').toUpperCase())) iss.push('bad diff "' + e.diff + '"');
      if (!e.tone) iss.push('no tone');
      chkStr(iss, 'tldr', e.tldr, 30);
      chkStr(iss, 'breakdown', e.breakdown, 40);
      for (const f of ['dos', 'donts']) {
        if (!Array.isArray(e[f]) || e[f].length < 3) iss.push(f + ' not 3 items (' + (Array.isArray(e[f]) ? e[f].length : typeof e[f]) + ')');
        else e[f].forEach((s, i) => { if (!s || s.trim().length < 8) iss.push(f + '[' + i + '] blank/short'); });
      }
      if (!e.key || typeof e.key !== 'object') iss.push('no key-spell object');
      else {
        for (const f of ['slot', 'name', 'note']) if (!e.key[f]) iss.push('key.' + f + ' missing');
        if (!e.key.winT) iss.push('key.winT missing');
        if (!e.key.winS) iss.push('key.winS missing');
      }
      chkStr(iss, 'win', e.win, 15);
      const blob = JSON.stringify(e);
      const m = blob.match(PLACEHOLDER);
      if (m) iss.push('placeholder text: "' + m[0] + '"');
      if (iss.length) out.data.push('vs ' + (NAME[k] || k) + ': ' + iss.join('; '));
    }

    // ---- CHAMP_FULL ----
    if (!full) out.full.push('NO CHAMP_FULL AT ALL');
    else {
      const fMissing = enemies.filter(k => !full[k]);
      if (fMissing.length) out.full.push('missing [' + fMissing.length + ']: ' + fMissing.join(','));
      for (const [k, e] of Object.entries(full)) {
        const iss = [];
        if (!Array.isArray(e.phases) || e.phases.length < 5) iss.push('phases broken (' + (Array.isArray(e.phases) ? e.phases.length : typeof e.phases) + ')');
        else e.phases.forEach((p, i) => {
          if (!p.why || p.why.trim().length < 20) iss.push('phase[' + i + '] why blank/short');
          if (!p.rating || !/\d/.test(String(p.rating))) iss.push('phase[' + i + '] bad rating');
          if (!p.side) iss.push('phase[' + i + '] no side');
        });
        if (!e.breakdown || typeof e.breakdown !== 'object') iss.push('breakdown not object');
        else for (const f of FULL_BREAKDOWN_KEYS) {
          const v = e.breakdown[f];
          if (!v || v.trim().length < 30) iss.push('breakdown.' + f + ' blank/short');
        }
        for (const f of ['dosFull', 'dontsFull']) {
          if (!Array.isArray(e[f]) || e[f].length < 3) iss.push(f + ' not 3');
          else e[f].forEach((d, i) => { if (!d.t || !d.d || d.d.trim().length < 15) iss.push(f + '[' + i + '] t/d blank'); });
        }
        chkStr(iss, 'winCon', e.winCon, 25);
        chkStr(iss, 'enemyWin', e.enemyWin, 25);
        chkStr(iss, 'tradeGood', e.tradeGood, 25);
        chkStr(iss, 'tradeBad', e.tradeBad, 25);
        if (!e.loading) iss.push('loading missing');
        if (!e.focus || !e.focus.text) iss.push('focus missing');
        if (!Array.isArray(e.report) || e.report.length < 10) iss.push('report missing/short (' + (Array.isArray(e.report) ? e.report.length : typeof e.report) + ')');
        else e.report.forEach((r, i) => { if (!r.h || !r.t || r.t.trim().length < 20) iss.push('report[' + i + '] "' + (r.h || '?') + '" blank'); });
        const dEntry = data[k];
        if (dEntry && dEntry.diff && e.diff && dEntry.diff !== e.diff) iss.push('diff mismatch data=' + dEntry.diff + ' full=' + e.diff);
        const m = JSON.stringify(e).match(PLACEHOLDER);
        if (m) iss.push('placeholder: "' + m[0] + '"');
        if (iss.length) out.full.push('vs ' + (NAME[k] || k) + ': ' + iss.join('; '));
      }
    }

    // ---- LOADOUTS ----
    if (!load) out.load.push('NO LOADOUTS REGISTRY');
    else {
      const lMissing = enemies.filter(k => !load[k]);
      if (lMissing.length) out.load.push('missing [' + lMissing.length + ']: ' + lMissing.join(','));
      for (const [k, e] of Object.entries(load)) {
        const iss = [];
        for (const f of ['start', 'firstBack', 'firstItem', 'secondItem', 'boots', 'spike']) if (!e[f] || String(e[f]).trim().length < 3) iss.push(f + ' blank');
        if (!e.runes || typeof e.runes !== 'object') iss.push('runes missing');
        else { if (!e.runes.keystone) iss.push('runes.keystone missing'); if (!Array.isArray(e.runes.primary) || e.runes.primary.length < 3) iss.push('runes.primary <3'); if (!Array.isArray(e.runes.secondary) || e.runes.secondary.length < 2) iss.push('runes.secondary <2'); if (!Array.isArray(e.runes.shards) || e.runes.shards.length < 3) iss.push('runes.shards <3'); }
        if (!e.wr) iss.push('wr blank');
        if (!e.reddit || e.reddit.trim().length < 30) iss.push('reddit blurb blank/short');
        const m = JSON.stringify(e).match(PLACEHOLDER);
        if (m) iss.push('placeholder: "' + m[0] + '"');
        if (iss.length) out.load.push('vs ' + (NAME[k] || k) + ': ' + iss.join('; '));
      }
    }
    return out;
  }

  return { loadAll, auditChamp, norm };
};

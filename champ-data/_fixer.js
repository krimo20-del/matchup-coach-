// MatchupCoach — FULL-data normalizer (dev tool, not loaded by the app).
// Aligns CHAMP_FULL diff/tone/ratings to the hand-written CHAMP_DATA cards and
// synthesizes any missing/blank FULL sections from matchup-specific card content.
window.makeFixer = function () {
  const TONE = { HARD: '#ff5d6c', TRICKY: '#ff8b3d', EVEN: '#e8b84b', FAVOURED: '#3ddc97', MIRROR: '#e8b84b' };
  const RATING = { HARD: ['8/10', '8.5/10'], TRICKY: ['7/10', '7.5/10'], EVEN: ['5.5/10', '6/10'], FAVOURED: ['4/10', '5/10'], MIRROR: ['5/10', '7/10'] };
  const DIFF_WORD = { HARD: 'Hard matchup', TRICKY: 'Tricky matchup', EVEN: 'Even matchup', FAVOURED: 'Favoured matchup', MIRROR: 'Mirror matchup' };
  const short = s => (s || '').trim().length < 30;

  function fixChamp(W, key, champName, NAME, loadReg) {
    const data = (W.CHAMP_DATA || {})[key] || {};
    const full = (W.CHAMP_FULL || {})[key];
    if (!full) return { changed: 0, full: null, notes: ['no FULL registry'] };
    let changed = 0; const notes = [];

    for (const [k, e] of Object.entries(full)) {
      const cd = data[k];
      if (!cd) continue;
      const enemy = NAME[k] || (k.charAt(0).toUpperCase() + k.slice(1));
      const keysp = cd.key || { slot: 'W', name: 'his key spell', cd: '16s', note: 'His engage \u2014 punish the cooldown.' };
      const L = loadReg ? loadReg[k] : null;
      let touched = false;
      const T = x => { if (!touched) { touched = true; changed++; } return x; };

      // ---- 1. diff alignment (data card is canonical) ----
      if (cd.diff && e.diff !== cd.diff) {
        e.diff = T(cd.diff);
        e.tone = TONE[cd.diff] || e.tone;
        const r = RATING[cd.diff] || ['6/10', '6/10'];
        e.diffRating = r[0]; e.carryRating = r[1];
        const dline = DIFF_WORD[cd.diff] + ' \u2014 difficulty ' + r[0] + ', ' + enemy + ' carry threat ' + r[1] + '.';
        if (e.breakdown && typeof e.breakdown === 'object') e.breakdown.difficulty = dline;
        if (Array.isArray(e.report)) { const row = e.report.find(x => x.h === 'Final Matchup Rating'); if (row) row.t = dline; }
      }
      if (!e.tone) { e.tone = T(TONE[e.diff] || '#e8b84b'); }

      // ---- 2. trade strings ----
      let scrapedTrade = '';
      if (e.breakdown && typeof e.breakdown.trading === 'string') {
        scrapedTrade = e.breakdown.trading.replace(new RegExp('^' + champName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ' Wins Trades\\s*', 'i'), '').trim();
      }
      if (short(e.tradeGood)) {
        e.tradeGood = T(scrapedTrade.length > 60 ? scrapedTrade
          : (cd.dos && cd.dos[1] ? cd.dos[1].replace(/\.$/, '') : 'Trade on his cooldown gap') + ' \u2014 take the short exchange and step out before his answer comes back up.');
      }
      if (short(e.tradeBad)) {
        e.tradeBad = T((cd.donts && cd.donts[2] ? cd.donts[2].replace(/\.$/, '') : 'Extending with your cooldowns down') + ' \u2014 that is the exchange ' + enemy + ' wins flat.');
      }

      // ---- 3. breakdown sections ----
      if (!e.breakdown || typeof e.breakdown !== 'object') { e.breakdown = T({}); }
      const bk = e.breakdown;
      const phases = Array.isArray(e.phases) ? e.phases : [];
      const myPh = phases.filter(p => (p.side || '').toLowerCase().indexOf(champName.toLowerCase()) >= 0).map(p => p.label);
      const hisPh = phases.filter(p => (p.side || '').toLowerCase().indexOf(enemy.toLowerCase()) >= 0).map(p => p.label);
      const waveByDiff = {
        HARD: ['a freeze just outside your tower \u2014 he has to overextend into gank range to touch you', 'a shoved wave with your escape down \u2014 you are farming inside his kill pattern', 'only crash to reset or answer his recall \u2014 never shove on habit in a losing lane'],
        TRICKY: ['a wave held near the middle \u2014 you can trade on his cooldown gaps without overexposing', 'a long wave crashed into his tower while ' + keysp.name + ' is up', 'crash to reset, take plates, or set up your jungler \u2014 then let it bounce back'],
        EVEN: ['a slow push you control \u2014 trade behind your own minion advantage and bank a crash', 'a frozen lane on his side while his key tools are up', 'crash to reset, take plates, or roam \u2014 never shove on autopilot'],
        FAVOURED: ['a slow push toward him \u2014 he farms under threat of your all-in on every step-up', 'a hard shove that lets him farm safely under tower and wait for ganks', 'crash when you can follow with a plate, a roam, or a dive \u2014 make every crash cost him something'],
        MIRROR: ['whatever wave state your cooldowns are up for \u2014 the mirror is decided by who trades at the right time', 'trading into his loaded kit with yours half-spent', 'crash to reset and match his recalls \u2014 tempo decides mirrors']
      };
      const wv = waveByDiff[e.diff] || waveByDiff.EVEN;
      if (short(bk.early)) bk.early = T((cd.breakdown || 'Play the lane around ' + keysp.name + '.') + ' Track ' + keysp.name + ' before every step-up.');
      if (short(bk.mid)) bk.mid = T('From 6 on, play around ' + enemy + '\u2019s ' + keysp.name + ' and your own ultimate windows \u2014 shove and roam when his key tools are down, and match his recalls so the wave never punishes you. ' + (cd.win ? cd.win.replace(/\.$/, '') + '.' : ''));
      if (short(bk.wave)) bk.wave = T('Best wave: ' + wv[0] + '. Worst wave: ' + wv[1] + '. Crash timing: ' + wv[2] + '.');
      if (short(bk.cooldowns)) bk.cooldowns = T('- ' + enemy + ' ' + keysp.name + ' (' + (keysp.cd || '\u2014') + '): matchup-defining \u2014 ' + keysp.note + ' Track it before every commit. - Your ultimate: spend it on kill windows, never on waves. - Summoners: track his Flash after any close call \u2014 it changes every dive call.');
      if (short(bk.trading)) bk.trading = T('Good trade: ' + e.tradeGood + ' Bad trade: ' + e.tradeBad);
      if (short(bk.spikes)) bk.spikes = T((myPh.length ? 'Your windows: ' + myPh.join(', ') + '. ' : '') + (hisPh.length ? 'His windows: ' + hisPh.join(', ') + '. ' : '') + 'Fight at your spikes, concede his \u2014 the level chart above is the trade calendar.');
      if (short(bk.feeding)) bk.feeding = T('If ' + enemy + ' gets one kill, respect ' + keysp.name + ' and reset to farming \u2014 one kill does not decide the lane. Two kills: stop solo-fighting, hug your side of the wave, and play for jungle help and scaling.');
      if (short(bk.carry)) bk.carry = T((e.winCon || cd.win || 'Win your lane pattern and convert it to the map.') + ' Convert leads into plates, roams, and objective setups \u2014 not into coin-flip all-ins.');
      if (short(bk.difficulty)) bk.difficulty = T(DIFF_WORD[e.diff] + ' \u2014 difficulty ' + (e.diffRating || '6/10') + ', ' + enemy + ' carry threat ' + (e.carryRating || '6/10') + '.');
      if (short(bk.late)) bk.late = T((phases[6] && phases[6].why && phases[6].why.length > 40 ? phases[6].why + ' ' : '') + 'Late game, play your win condition with the team \u2014 the lane is over; the habits it taught you are not.');

      // ---- 4. loading / focus ----
      if (!e.loading || e.loading.trim().length < 20) {
        e.loading = T('- ' + champName + ' vs ' + enemy + ' - Track: ' + enemy + ' ' + keysp.name + '. - ' + (cd.dos && cd.dos[0] ? cd.dos[0] + '.' : 'Trade on his cooldowns.') + ' - Don\u2019t: ' + (cd.donts && cd.donts[0] ? cd.donts[0].toLowerCase() + '.' : 'trade into his loaded kit.') + ' - Spend your ultimate on kill windows only.');
      }
      if (!e.focus || !e.focus.text || e.focus.text.trim().length < 3) {
        e.focus = T({ text: enemy + ' ' + keysp.name, letters: [keysp.slot || 'W'] });
      } else {
        // de-dupe "Illaoi Illaoi Test of Spirit" style prefixes
        const ded = e.focus.text.replace(/^(\S+(?: \S+)?) \1\b/, '$1');
        if (ded !== e.focus.text) { e.focus.text = T(ded); }
      }

      // ---- 5. report ----
      if (!Array.isArray(e.report) || e.report.length < 10) {
        const runes = L && L.runes ? (L.runes.keystone + ' (' + (L.runes.primaryTree || 'primary') + '), ' + (L.runes.primary || []).join(', ') + '; secondary ' + (L.runes.tree || '') + ' \u2014 ' + (L.runes.secondary || []).join(' + ') + '.') : 'Take your standard page; swap in Second Wind + Doran\u2019s Shield into poke, Bone Plating into burst.';
        const items = L ? ('Start ' + (L.start || 'standard') + '. First back: ' + (L.firstBack || 'components') + '. Core: ' + (L.firstItem || '') + ' \u2192 ' + (L.secondItem || '') + '; boots: ' + (L.boots || 'by damage type') + '. Spike: ' + (L.spike || '')) : 'Standard core build; adapt boots and first back to his damage profile, and buy anti-heal early if he sustains.';
        e.report = T([
          { h: 'TL;DR', t: e.tldr || cd.tldr },
          { h: 'Core Lane Win Condition', t: e.winCon || cd.win },
          { h: 'Level Advantage Chart', t: 'See the level-by-level chart \u2014 fight in your windows (' + (myPh.join(', ') || 'your item spikes') + '), respect his (' + (hisPh.join(', ') || 'his item spikes') + ').' },
          { h: 'Trading Rules', t: 'Good trade: ' + e.tradeGood + ' Great trade: ' + enemy + ' wastes ' + keysp.name + ' \u2014 commit immediately. Bad trade: ' + e.tradeBad },
          { h: 'Wave Management', t: bk.wave },
          { h: 'Key Ability Interactions', t: 'Track ' + enemy + '\u2019s ' + keysp.name + ' (' + (keysp.cd || '\u2014') + '): ' + keysp.note + ' Commit only while it is down.' },
          { h: 'Rune Setup', t: runes },
          { h: 'Summoner Spells', t: 'Flash + Teleport is the default \u2014 TP covers the attrition war and converts leads across the map. Take Ignite only when you want hard kill pressure in a snowball lane.' },
          { h: 'Itemization', t: items },
          { h: 'All-In Windows', t: 'Commit on ' + keysp.name + '\u2019s cooldown, at your level/item spikes, and with jungle setup \u2014 bait his answer before you spend yours.' },
          { h: 'Jungle Interaction', t: 'Ward the river bush on his push timings and ping your jungler when ' + keysp.name + ' is down \u2014 that is the gank window. Never fight 1v2 to protect a dead wave.' },
          { h: 'Common Mistakes', t: (cd.donts || []).map(s => s.replace(/\.$/, '')).join('. ') + '. Don\u2019t spend your ultimate on chip damage \u2014 it is the kill window.' },
          { h: 'How to Play From Behind', t: 'Concede the contested CS, freeze near your tower, and absorb pressure \u2014 ' + enemy + ' converts leads through ' + keysp.name + ' picks, so refuse the fight and scale with the map.' },
          { h: 'How to Snowball', t: (e.ahead && e.ahead.length > 40) ? e.ahead : 'Ahead, zone him off the wave with your all-in threat, take plates, and export the lead \u2014 roams and objective setups beat tower-hugging kills.' },
          { h: 'Final Matchup Rating', t: bk.difficulty }
        ]);
      }
    }
    return { changed, full, notes };
  }
  return { fixChamp, TONE, RATING };
};

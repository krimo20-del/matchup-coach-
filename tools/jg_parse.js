// Shared parser: PDF text -> JG_DB entry object. eval'd inside run_script.
// Exposes: parseJgDb(rawText) -> {db, issues, count, self}
const PROPER = ["Bel'Veth","Diana","Ekko","Elise","Evelynn","Graves","Kayn","Kha'Zix","Kindred","Lee Sin","Naafiri","Nidalee","Nocturne","Rengar","Shaco","Talon","Viego","Wukong","Briar","Jax","Master Yi","Olaf","Qiyana","Shyvana","Trundle","Udyr","Vi","Xin Zhao","Amumu","Hecarim","Jarvan IV","Maokai","Nunu & Willump","Rammus","Rek'Sai","Sejuani","Skarner","Volibear","Warwick","Zac","Brand","Fiddlesticks","Gragas","Ivern","Karthus","Lillia","Morgana","Taliyah","Zyra"];
const NAMEMAP = {};
for (const n of PROPER) NAMEMAP[n.toUpperCase()] = n;

function parseJgDb(rawIn) {
  let t = rawIn.replace(/[\u2019\u2018]/g, "'").replace(/--\s*\d+\s*of\s*\d+\s*--/g, '\n');
  const headRe = /\n\s*(\d{1,2})\.\s+([A-Z'&.\s]+?)\s+VS\s+([A-Z'&.\s]+?)\s*[-\u2013\u2014]\s*JUNGLE\s+OPERATIONAL\s+REPORT/g;
  const heads = [];
  let m;
  while ((m = headRe.exec(t)) !== null) {
    heads.push({idx: m.index, end: headRe.lastIndex, num: +m[1], self: m[2].replace(/\s+/g,' ').trim(), enemy: m[3].replace(/\s+/g,' ').trim()});
  }
  const db = {};
  const issues = [];
  const clean = s => s ? s.replace(/\s+/g, ' ').trim() : '';
  const ADV_SPLIT = /^(.{2,44}?(?:Favored|Favoured|Dominant|Domination|Even|Edge|Advantage|Peak|Focus|Spike|Threat|Vanguard|Window|Control|Parity|Execution|Lead|Lockdown|Tempo|Form))\s+([A-Z(].{40,})$/;

  heads.forEach((h, i) => {
    const b = t.slice(h.end, i + 1 < heads.length ? heads[i+1].idx : t.length);
    const enemy = NAMEMAP[h.enemy] || h.enemy;
    if (!NAMEMAP[h.enemy]) issues.push('Unknown enemy name: ' + h.enemy);

    function between(startRes, endRes) {
      for (const sre of startRes) {
        const sm = b.match(sre);
        if (!sm) continue;
        const from = sm.index + sm[0].length;
        let to = b.length;
        for (const ere of endRes) {
          const em = b.slice(from).match(ere);
          if (em) to = Math.min(to, from + em.index);
        }
        return b.slice(from, to);
      }
      return null;
    }

    const tldr = between([/TL;?DR[^:]*:\s*/], [/Level\s*&\s*Pathing Advantage Chart/, /\nStage\s/]);

    const chartStart = b.search(/Level\s*&\s*Pathing Advantage Chart/);
    const opsStart = b.search(/Jungle Operations Matrix/);
    const stages = [];
    if (chartStart >= 0 && opsStart > chartStart) {
      let chart = b.slice(chartStart, opsStart)
        .replace(/Level\s*&\s*Pathing Advantage Chart/, '')
        .replace(/Stage\s*\t?\s*Advantage\s*\t?\s*Why[^\n]*\n/, '\n');
      const stageDefs = [
        {label: 'Level 1 Clear', re: /Level 1\s+Clear/},
        {label: 'Level 2 Skirmish', re: /Level 2\s+Skirmish/},
        {label: 'Level 3 Route', re: /Level 3\s+Route/},
        {label: 'Levels 4-5 Macro', re: /Levels?\s+4\s*[-\u2013]\s*5\s+Macro/},
        {label: 'Level 6 Breakpoint', re: /Level 6\s+Breakpoint/},
        {label: 'First Item Spike', re: /First Item\s+Spike/},
        {label: '2+ Items Scaling', re: /2\+\s*Items?\s+Scaling/},
      ];
      const found = [];
      for (const sd of stageDefs) {
        const sm = chart.match(sd.re);
        if (sm) found.push({label: sd.label, idx: sm.index, end: sm.index + sm[0].length});
        else issues.push(enemy + ': missing stage ' + sd.label);
      }
      found.sort((a, b2) => a.idx - b2.idx);
      for (let s = 0; s < found.length; s++) {
        const seg = chart.slice(found[s].end, s + 1 < found.length ? found[s+1].idx : chart.length);
        let adv, why;
        // 1) tab-delimited columns
        const parts = seg.split('\t').map(clean).filter(p => p);
        if (parts.length >= 2 && parts[0].length <= 50) {
          adv = parts[0];
          why = clean(parts.slice(1).join(' '));
        } else {
          // 2) line heuristic: short leading lines = adv, first long line starts why
          const lines = seg.split('\n').map(l => l.replace(/\t/g, ' ').trim()).filter(l => l);
          const advParts = [];
          let whyStart = -1;
          for (let li = 0; li < lines.length; li++) {
            if (lines[li].length > 55) { whyStart = li; break; }
            advParts.push(lines[li]);
          }
          if (whyStart === -1) { adv = clean(advParts.join(' ')); why = ''; }
          else if (advParts.length > 0) {
            adv = clean(advParts.join(' '));
            why = clean(lines.slice(whyStart).join(' '));
          } else {
            // 3) adv shares the first long line with why
            const rest = clean(lines.join(' '));
            const sm = rest.match(ADV_SPLIT);
            const selfProper = NAMEMAP[h.self] || h.self;
            const selfIdx = rest.indexOf(selfProper + ' ');
            if (sm) { adv = sm[1].trim(); why = clean(rest.slice(sm[1].length)); }
            else if (selfIdx >= 2 && selfIdx <= 46) { adv = clean(rest.slice(0, selfIdx)); why = clean(rest.slice(selfIdx)); }
            else { issues.push(enemy + ' / ' + found[s].label + ': cannot split adv: ' + rest.slice(0, 80)); adv = ''; why = rest; }
          }
        }
        if (adv && adv.length > 50) issues.push(enemy + ' / ' + found[s].label + ': adv suspiciously long: ' + adv);
        stages.push({stage: found[s].label, adv, why});
      }
    } else issues.push(enemy + ': chart not found');

    const start = between([/What camp to start[^:]*:\s*/], [/When to scuttle/]);
    const scuttle = between([/When to scuttle[^:]*:\s*/], [/When to fight for top/]);
    const topObj = between([/When to fight for top[^:]*:\s*/], [/Tactical Matrix/, /When to invade/]);
    const invade = between([/When to invade:?\s*/], [/When to watch for invades/]);
    const watch = between([/When to watch for invades:?\s*/], [/Weak Side Jungle Play/]);
    const weak = between([/Weak Side Jungle Play:?\s*/], [/Macro Map Rotations/, /Can you split/]);
    const split = between([/Can you split[^:]*:\s*/], [/Should you look for picks/]);
    const picks = between([/Should you look for picks[^:]*:\s*/], [/Absolute Win Condition/]);
    const win = between([/Absolute Win Condition:?\s*/], [/\nNEVERMATCH$/]);

    const entry = {tldr: clean(tldr), stages, start: clean(start), scuttle: clean(scuttle), topObj: clean(topObj), invade: clean(invade), watch: clean(watch), weak: clean(weak), split: clean(split), picks: clean(picks), win: clean(win)};
    for (const k of ['tldr','start','scuttle','topObj','invade','watch','weak','split','picks','win']) {
      if (!entry[k] || entry[k].length < 30) issues.push(enemy + ': field ' + k + ' too short/missing (' + (entry[k] || '').length + ')');
    }
    if (stages.length !== 7) issues.push(enemy + ': only ' + stages.length + ' stages');
    db[enemy] = entry;
  });
  return {db, issues, count: heads.length, self: heads[0] ? (NAMEMAP[heads[0].self] || heads[0].self) : null};
}

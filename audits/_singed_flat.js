global.window = global;
require('../champ-data/singed.full.js');
require('../champ-data/content/singed.js');
const F = global.CHAMP_FULL.singed;
const CA = global.MC_CONTENT_EXTRA.filter(x => x && x.a === 'singed');
const SKIP = /^(a|b|tone)$/;
for (const enemy of process.argv.slice(2)) {
  console.log('#### ' + enemy);
  const dump = (o, p, tag) => {
    for (const k in o) {
      if (!p && SKIP.test(k)) continue;
      const v = o[k], np = p ? (Array.isArray(o) ? p + '[' + k + ']' : p + '.' + k) : k;
      if (typeof v === 'string') console.log(tag + ':' + np + ' [' + v.length + '] ' + v);
      else if (v && typeof v === 'object') dump(v, np, tag);
    }
  };
  dump(CA.find(x => x.b === enemy) || {}, '', 'C');
  dump(F[enemy] || {}, '', 'F');
}

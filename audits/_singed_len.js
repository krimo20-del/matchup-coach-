global.window = global;
require('../champ-data/singed.full.js');
require('../champ-data/content/singed.js');
const F = global.CHAMP_FULL.singed;
const CA = global.MC_CONTENT_EXTRA.filter(x => x && x.a === 'singed');
function get(obj, path) {
  return path.split('.').reduce((o, seg) => {
    const m = seg.match(/^([A-Za-z0-9_]+)((\[\d+\])*)$/);
    let cur = o == null ? undefined : o[m[1]];
    for (const i of (m[2].match(/\d+/g) || [])) cur = cur == null ? undefined : cur[+i];
    return cur;
  }, obj);
}
const enemy = process.argv[2];
const root = { full: F[enemy], content: CA.find(x => x.b === enemy) };
for (const arg of process.argv.slice(3)) {
  const [layer, path] = arg.split(':');
  const v = get(root[layer], path);
  console.log(layer + ':' + path + '  len=' + (v == null ? 'MISSING' : v.length) + '  band=' + (v == null ? '' : Math.ceil(v.length * 0.9) + '-' + Math.floor(v.length * 1.1)));
}

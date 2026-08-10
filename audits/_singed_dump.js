// scratch dump helper (audits/ only)
global.window = global;
require('../champ-data/singed.full.js');
require('../champ-data/content/singed.js');
const F = global.CHAMP_FULL.singed;
const C = global.MC_CONTENT_EXTRA.filter(x => x && x.a === 'singed');
const enemies = process.argv.slice(2);
for (const e of enemies) {
  console.log('==================== ' + e + ' ====================');
  console.log('--- FULL ---');
  console.log(JSON.stringify(F[e], null, 1));
  console.log('--- CONTENT ---');
  console.log(JSON.stringify(C.find(x => x.b === e), null, 1));
}

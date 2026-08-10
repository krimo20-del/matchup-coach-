// prints singed-side chart vs enemy-side chart (with mirror audit edits applied)
global.window = global;
const fs = require('fs');
require('../champ-data/singed.full.js');
require('../champ-data/content/singed.js');
const F = global.CHAMP_FULL.singed;
const CA = global.MC_CONTENT_EXTRA.filter(x => x && x.a === 'singed');
for (const enemy of process.argv.slice(2)) {
  console.log('==== ' + enemy);
  const c = CA.find(x => x.b === enemy);
  console.log(' singed content win :', (c && c.win || []).join(','));
  console.log(' singed full  sides :', (F[enemy].phases || []).map(p => p.side).join(','));
  console.log(' singed full  rating:', (F[enemy].phases || []).map(p => p.rating).join(','));
  try {
    delete require.cache[require.resolve('../champ-data/' + enemy + '.full.js')];
    require('../champ-data/' + enemy + '.full.js');
    require('../champ-data/content/' + enemy + '.js');
    const EF = global.CHAMP_FULL[enemy];
    const EC = global.MC_CONTENT_EXTRA.find(x => x && x.a === enemy && x.b === 'singed');
    console.log(' enemy  content win :', (EC && EC.win || []).join(','));
    console.log(' enemy  full  sides :', ((EF && EF.singed && EF.singed.phases) || []).map(p => p.side).join(','));
    console.log(' enemy  full  rating:', ((EF && EF.singed && EF.singed.phases) || []).map(p => p.rating).join(','));
  } catch (e) { console.log(' enemy files: ' + e.message); }
  const mf = './top/' + enemy + '__singed.json';
  if (fs.existsSync(mf)) {
    const j = JSON.parse(fs.readFileSync(mf, 'utf8'));
    const ch = j.edits.filter(e => /^(win\[\d\]|phases\[\d\]\.(side|rating))$/.test(e.path));
    console.log(' mirror chart edits :', ch.map(e => e.path + '=' + e.after).join(' | ') || '(none)');
  }
}

// Build the mid-lane bespoke-content pool: roster slugs, display names, dataKeys.
const fs = require('fs'), path = require('path');
global.window = {};
['1','2','3','4','5','6','7','8'].forEach(n => require(path.join(__dirname, 'champ-data', 'champ-configs-mid-' + n + '.js')));
const C = window.CHAMP_CONFIGS_MID || {};
const disp = {}, slugs = [];
Object.keys(C).forEach(name => {
  const dk = C[name].dataKey; // e.g. 'ahri_mid'
  const slug = dk.replace(/_mid$/, '');
  disp[slug] = name;
  slugs.push(slug);
});
// Locke isn't in CHAMP_CONFIGS_MID (own file) but has a chart — add explicitly.
if (!disp.locke) { disp.locke = 'Locke'; slugs.push('locke'); }
slugs.sort();
fs.writeFileSync(path.join(__dirname, '_bespoke_pool_mid.json'), JSON.stringify({ slugs, disp }));
console.log(JSON.stringify({ champs: slugs.length }));

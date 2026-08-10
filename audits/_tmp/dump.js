global.window=global;
const R='C:/Users/Kris/OneDrive/CLAUDE/New folder (2)/';
require(R+'champ-data/content/gwen.js');
for(const e of process.argv.slice(2)){
  const c=window.MC_CONTENT_EXTRA.find(x=>x.a==='gwen'&&x.b===e);
  console.log('=== CONTENT '+e+' ===');
  console.log(JSON.stringify(c,null,1));
}

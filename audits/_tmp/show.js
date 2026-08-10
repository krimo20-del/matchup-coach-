global.window=global;
const R='C:/Users/Kris/OneDrive/CLAUDE/New folder (2)/';
require(R+'champ-data/content/gwen.js');
require(R+'champ-data/gwen.full.js');
function get(o,p){return p.replace(/\[(\d+)\]/g,'.$1').split('.').reduce((a,k)=>a==null?a:a[k],o);}
const enemy=process.argv[2];
const content=window.MC_CONTENT_EXTRA.find(x=>x.a==='gwen'&&x.b===enemy);
const full=window.CHAMP_FULL.gwen[enemy];
for(const p of process.argv.slice(3)){
  const layer=p.startsWith('F:')?full:content; const pp=p.replace(/^[FC]:/,'');
  const v=get(layer,pp);
  console.log(p+'  ['+(typeof v==='string'?v.length:'?')+']  band '+(typeof v==='string'?Math.ceil(v.length*0.9)+'-'+Math.floor(v.length*1.1):'')); 
  console.log(JSON.stringify(v));
}

global.window=global;
const fs=require('fs'),path=require('path');
const R='C:/Users/Kris/OneDrive/CLAUDE/New folder (2)/';
require(R+'champ-data/content/gwen.js');
require(R+'champ-data/gwen.full.js');
function get(o,p){return p.replace(/\[(\d+)\]/g,'.$1').split('.').reduce((a,k)=>a==null?a:a[k],o);}
const spec=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const enemy=spec.enemy;
const content=window.MC_CONTENT_EXTRA.find(x=>x.a==='gwen'&&x.b===enemy);
const full=window.CHAMP_FULL.gwen[enemy];
const out={ownerKey:'gwen',enemy,lane:'top',audit:spec.audit,edits:[],notes:spec.notes||''};
let bad=[];
for(const e of spec.edits){
  const root=e.layer==='content'?content:full;
  const before=get(root,e.path);
  if(typeof before!=='string'){bad.push(e.path+' :: NOT A STRING -> '+JSON.stringify(before));continue;}
  const lo=before.length*0.9, hi=before.length*1.1;
  if(e.after.length<lo||e.after.length>hi){bad.push(e.path+' :: LEN before='+before.length+' after='+e.after.length+' band='+Math.ceil(lo)+'-'+Math.floor(hi));continue;}
  out.edits.push({layer:e.layer,path:e.path,before,after:e.after});
}
if(bad.length){console.error('REJECTED:\n'+bad.join('\n'));process.exit(1);}
const f=R+'audits/top/gwen__'+enemy+'.json';
if(fs.existsSync(f)){console.log('EXISTS, skipped');process.exit(0);}
fs.writeFileSync(f,JSON.stringify(out,null,2));
console.log('WROTE '+f+' edits='+out.edits.length);

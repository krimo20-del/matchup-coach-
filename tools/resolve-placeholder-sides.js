#!/usr/bin/env node
/**
 * resolve-placeholder-sides.js — replace non-canonical phases[N].side placeholders
 * ("Depends", "Pending", "Teamfight dependent") with the canonical value the CONTENT layer
 * already holds for that same row.
 *
 * SCOPED PER ENTRY — THIS IS THE WHOLE POINT.
 *   A first attempt did `src.split('"Depends"').join('"Aurora"')` on the whole file. Every
 *   aatrox matchup shares the token "Depends", so all nine became "Aurora" — a champion not
 *   even in most of those lanes. The replacement MUST be confined to the matchup's own
 *   entry, because the same placeholder means a different thing in each one.
 *
 * No judgement is invented: the value comes from win[N] on the same page, which mirror-fix
 * and the renderer already treat as authoritative. Rows where the content layer is also
 * non-canonical are left alone and reported.
 *
 * Usage: node tools/resolve-placeholder-sides.js <lane> [--write]
 */
const fs=require('fs'), path=require('path');
const REPO=path.resolve(__dirname,'..');
const LANE_DIR={top:['champ-data','champ-data/content'],mid:['champ-data/mid','champ-data/content/mid'],
  bot:['champ-data/bot','champ-data/content/bot'],sup:['champ-data/sup','champ-data/content/sup']};
const args=process.argv.slice(2);
const lane=args.find(a=>LANE_DIR[a])||'top';
const WRITE=args.includes('--write');
const [FULL_DIR,CONTENT_DIR]=LANE_DIR[lane];

const disp={};
for(const f of fs.readdirSync(path.join(REPO,'champ-data/_kits')).filter(x=>x.endsWith('.json'))){
  try{const k=JSON.parse(fs.readFileSync(path.join(REPO,'champ-data/_kits',f),'utf8'));if(k.name)disp[f.replace(/\.json$/,'')]=k.name}catch(e){}
}
const CANON=new Set([...Object.values(disp),'Skill']);

// Return [start,end) of the object literal for "<enemy>": { ... } inside src.
function entrySpan(src,enemy){
  const key='"'+enemy+'"';
  let i=src.indexOf(key);
  while(i!==-1){
    const brace=src.indexOf('{',i);
    if(brace===-1)return null;
    const between=src.slice(i+key.length,brace);
    if(/^\s*:\s*$/.test(between)){
      let depth=0;
      for(let j=brace;j<src.length;j++){
        const ch=src[j];
        if(ch==='{')depth++;
        else if(ch==='}'){depth--;if(depth===0)return [brace,j+1]}
      }
      return null;
    }
    i=src.indexOf(key,i+1);
  }
  return null;
}

let fixed=0; const skipped=[];
for(const f of fs.readdirSync(path.join(REPO,CONTENT_DIR)).filter(x=>x.endsWith('.js'))){
  const key=f.replace(/\.js$/,'');
  const fp=path.join(REPO,FULL_DIR,key+'.full.js'); if(!fs.existsSync(fp))continue;
  let fSrc=fs.readFileSync(fp,'utf8');
  const w={MC_CONTENT_EXTRA:[],MC_WR_TABLES:{},MC_REAL_GAMES:{},__mcLoaded:{}},wf={};
  try{new Function('window',fs.readFileSync(path.join(REPO,CONTENT_DIR,f),'utf8'))(w);new Function('window',fSrc)(wf)}catch(e){continue}
  const ents=(wf.CHAMP_FULL&&wf.CHAMP_FULL[key])||{};
  let dirty=false;
  for(const c of w.MC_CONTENT_EXTRA){
    if(c.a!==key)continue;
    const ph=(ents[c.b]||{}).phases||[];
    for(let i=0;i<ph.length;i++){
      const side=ph[i]&&ph[i].side; if(side==null)continue;
      const s=String(side).trim(); if(CANON.has(s))continue;
      const wv=Array.isArray(c.win)?String(c.win[i]==null?'':c.win[i]).trim():'';
      if(!CANON.has(wv)){skipped.push(`${key} vs ${c.b} row ${i}: side="${s}", content win="${wv||'(none)'}" — both non-canonical`);continue}
      const span=entrySpan(fSrc,c.b);
      if(!span){skipped.push(`${key} vs ${c.b}: could not locate entry block`);continue}
      const block=fSrc.slice(span[0],span[1]);
      let nb=block;
      for(const q of ['"',"'"]) nb=nb.split(q+s+q).join(q+wv+q);
      if(nb!==block){fSrc=fSrc.slice(0,span[0])+nb+fSrc.slice(span[1]);dirty=true;fixed++;
        console.log(`  ${key} vs ${c.b} row ${i}: "${s}" -> "${wv}"`);}
    }
  }
  if(dirty&&WRITE)fs.writeFileSync(fp,fSrc);
}
console.log(`\n${WRITE?'APPLIED':'DRY RUN'} — ${fixed} placeholder(s) resolved`);
if(skipped.length){console.log(`\nLEFT ALONE (${skipped.length}):`);skipped.forEach(s=>console.log('  '+s));}

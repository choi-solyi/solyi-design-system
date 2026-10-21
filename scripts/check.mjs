import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../',import.meta.url));
const tokens = JSON.parse(await readFile(path.join(root,'tokens.json'),'utf8'));
const luminance = hex => hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
let checked = 0;
let minimum = {ratio:Infinity};
for(const [name,theme] of Object.entries(tokens.themes)) {
  for(const mode of ['light','dark']) {
    assert.equal(Object.keys(theme[mode]).length,20,`${name}/${mode}: 20 roles`);
    for(const [a,b,min] of [
      ['text','canvas',4.5],['text','surface',4.5],['text','surface-alt',4.5],
      ['muted','canvas',4.5],['muted','surface',4.5],['muted','surface-alt',4.5],
      ['accent','surface',4.5],['accent','accent-soft',4.5],
      ['on-accent','accent',4.5],['on-accent','accent-hover',4.5],
      ['success','success-soft',4.5],['warning','warning-soft',4.5],['danger','danger-soft',4.5],['info','info-soft',4.5],
      ['control-border','surface',3],['focus','surface',3],['focus','canvas',3],['focus','accent-soft',3],['focus','danger-soft',3]
    ]) {
      const ratio=contrast(theme[mode][a],theme[mode][b]);
      assert.ok(ratio>=min,`${name}/${mode}: ${a}/${b} ${ratio.toFixed(3)} < ${min}`);
      checked++;
      if(ratio/min<minimum.ratio/(minimum.threshold||1)) minimum={theme:name,mode,pair:`${a}/${b}`,ratio,threshold:min};
    }
  }
}
const expected=['.nojekyll','app.js','components.css','docs.css','favicon.svg','index.html','preferences.js','token-data.js','tokens.css','tokens.json'];
assert.deepEqual((await readdir(path.join(root,'docs'))).sort(),expected.sort(),'Only intended public site files');
for(const name of ['index.html','app.js','components.css','docs.css','preferences.js','favicon.svg']) assert.equal(await readFile(path.join(root,'site',name),'utf8'),await readFile(path.join(root,'docs',name),'utf8'),`${name} build is current`);
assert.deepEqual(JSON.parse(await readFile(path.join(root,'docs/tokens.json'),'utf8')),tokens);
const source=(await Promise.all(['index.html','app.js','docs.css','components.css'].map(name=>readFile(path.join(root,'docs',name),'utf8')))).join('\n');
for(const match of source.matchAll(/(?:href|src)=["']\.\/([^"'#?]+)["']/g)) assert.ok(expected.includes(match[1]),`Local link ${match[1]} exists`);
assert.ok(!/\b(?:AIza[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9]{20,})\b/.test(source),'No known credential pattern');
assert.ok(!/analytics|googletagmanager|google-analytics|supabase\.co|fetch\(/i.test(source),'No analytics or external data request');
const css=await readFile(path.join(root,'docs/tokens.css'),'utf8');
for(const [name,value] of Object.entries(tokens.base)) assert.ok(css.includes(`--sol-${name}: ${value};`),`Base token ${name}`);
console.log(`PASS: ${checked} contrast pairs across 3 themes × 2 modes.`);
console.log(`Tightest relative margin: ${minimum.theme}/${minimum.mode} ${minimum.pair} ${minimum.ratio.toFixed(3)}:1 (threshold ${minimum.threshold}:1).`);
console.log('PASS: public allowlist, current generated files, shared token exports, local links, no external data calls or known credential pattern.');

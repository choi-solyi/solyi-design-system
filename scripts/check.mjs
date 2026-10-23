import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {JSDOM} from 'jsdom';
import {renderDistribution} from '../docs/distribution.js';
import {siteFiles,generatedFiles,starterFiles} from './site-manifest.mjs';
import {checkDocumentVersions} from './document-version-check.mjs';
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
      ['accent','surface-alt',3],['success','surface-alt',3],['danger','surface-alt',3],
      ['text','canvas',4.5],['text','surface',4.5],['text','surface-alt',4.5],['text','accent-soft',4.5],['muted','accent-soft',4.5],
      ['muted','canvas',4.5],['muted','surface',4.5],['muted','surface-alt',4.5],
      ['accent','surface',4.5],['accent','accent-soft',4.5],
      ['on-accent','accent',4.5],['on-accent','accent-hover',4.5],
      ['success','success-soft',4.5],['success','surface',4.5],['warning','surface',4.5],['danger','surface',4.5],['info','surface',4.5],['warning','warning-soft',4.5],['danger','danger-soft',4.5],['info','info-soft',4.5],
      ['control-border','surface',3],['focus','surface',3],['focus','canvas',3],['focus','accent-soft',3],['focus','danger-soft',3],['focus','info-soft',3],['focus','success-soft',3],['focus','warning-soft',3]
    ]) {
      const ratio=contrast(theme[mode][a],theme[mode][b]);
      assert.ok(ratio>=min,`${name}/${mode}: ${a}/${b} ${ratio.toFixed(3)} < ${min}`);
      checked++;
      if(ratio/min<minimum.ratio/(minimum.threshold||1)) minimum={theme:name,mode,pair:`${a}/${b}`,ratio,threshold:min};
    }
  }
}
const expected=[...siteFiles,...generatedFiles,'starter',...starterFiles.map(name=>'starter/'+name)];
async function walk(dir,prefix=''){const result=[];for(const item of await readdir(dir,{withFileTypes:true})){const n=prefix+item.name;if(item.isDirectory())result.push(...await walk(path.join(dir,item.name),n+'/'));else result.push(n);}return result;}
assert.deepEqual((await walk(path.join(root,'docs'))).sort(),[...siteFiles,...generatedFiles,...starterFiles.map(n=>'starter/'+n)].sort(),'Only intended public site files, including licensed font assets');
assert.deepEqual((await readdir(path.join(root,'docs/starter'))).sort(),[...starterFiles].sort(),'Only intended standalone starter files');
for(const name of starterFiles)assert.deepEqual(await readFile(path.join(root,'examples/vue-vuetify/dist',name)),await readFile(path.join(root,'docs/starter',name)),`Published starter ${name} is current`);
for(const name of siteFiles) {const source=await readFile(path.join(root,'site',name));assert.deepEqual(name==='index.html'?Buffer.from(source.toString('utf8').replaceAll('__SOLYI_DOCUMENT_VERSION__',tokens.version)):source,await readFile(path.join(root,'docs',name)),`${name} build is current`);}
assert.deepEqual(JSON.parse(await readFile(path.join(root,'docs/tokens.json'),'utf8')),tokens);
await checkDocumentVersions();
const source=(await Promise.all(siteFiles.filter(name=>/\.(html|js|css)$/.test(name)).map(name=>readFile(path.join(root,'docs',name),'utf8')))).join('\n');
assert.ok(!/\binfinite\b/.test(source),'No unbounded CSS animation');
for(const match of source.matchAll(/(?:href|src)=["']\.\/([^"'#?]+)["']/g)) if(!match[1].includes('${'))assert.ok(expected.includes(match[1].replace(/\/$/,'')),`Local link ${match[1]} exists`);
// JavaScript template placeholders are not filenames. Validate actual rendered release links too.
const releaseMarkup=renderDistribution({section:(_id,_title,_description,body)=>body,codeSample:(_label,code)=>'<pre>'+code.replaceAll('&','&amp;').replaceAll('<','&lt;')+'</pre>'});
const releaseDom=new JSDOM(releaseMarkup);
for(const link of releaseDom.window.document.querySelectorAll('a[href^="./"]'))assert.ok(expected.includes(link.getAttribute('href').slice(2)),`Rendered release link ${link.href} exists`);
assert.ok(releaseDom.window.document.querySelectorAll('a[download]').length===2,'Only the current recommended package pair is displayed');releaseDom.window.close();
assert.ok(!/\b(?:AIza[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9]{20,})\b/.test(source),'No known credential pattern');
assert.ok(!/analytics|googletagmanager|google-analytics|supabase\.co|fetch\(/i.test(source),'No analytics or external data request');
const css=await readFile(path.join(root,'docs/tokens.css'),'utf8');
assert.match(await readFile(path.join(root,'docs/components.css'),'utf8'),/:where\(\[hidden\]\)\s*\{display:none!important;\}/,'Reusable components preserve hidden semantics without docs.css');
for(const [name,value] of Object.entries(tokens.base)) assert.ok(css.includes(`--sol-${name}: ${value};`),`Base token ${name}`);
console.log(`PASS: ${checked} contrast pairs across 3 themes × 2 modes.`);
console.log(`Tightest relative margin: ${minimum.theme}/${minimum.mode} ${minimum.pair} ${minimum.ratio.toFixed(3)}:1 (threshold ${minimum.threshold}:1).`);
console.log('PASS: public allowlist, current generated files, shared token exports, local links, no external data calls or known credential pattern.');

await import('./check-brand.mjs');
await import('./check-starter.mjs');

await import('./font-check.mjs');

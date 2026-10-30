import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM,VirtualConsole} from 'jsdom';
import {moduleOrder} from './site-manifest.mjs';
const base=new URL('../',import.meta.url),html=await readFile(new URL('docs/index.html',base),'utf8'),tokens=await readFile(new URL('tokens.json',base),'utf8');
const strip=s=>s.replace(/^import .* from '\.\/[\w-]+\.js';\r?\n/gm,'').replace(/^export const /gm,'var ').replace(/^export /gm,'');
const modules=await Promise.all(moduleOrder.map(n=>readFile(new URL(`docs/${n}.js`,base),'utf8'))),app=strip((await readFile(new URL('docs/app.js',base),'utf8')).replace("import tokens from './token-data.js';",`const tokens=${tokens};`));
function load(hash){const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));const dom=new JSDOM(html,{url:'https://example.test/solyi-design-system/'+hash,runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;let y=0;Object.defineProperty(w,'scrollY',{get:()=>y});w.scrollTo=o=>{y=o.top;};w.HTMLElement.prototype.scrollIntoView=()=>{};const mq=new w.EventTarget();mq.matches=false;w.matchMedia=()=>mq;w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.HTMLDialogElement.prototype.showModal=function(){this.open=true;this.querySelector('[autofocus]')?.focus();};w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};for(const source of modules)w.eval(strip(source));// Unit scope: native Core reference controllers/navigation; Vue canvases are checked separately.
w.eval(app+'\nwindow.__getPreviewController=()=>cleanupVuePreviews;');return{dom,w,d,errors,mq};}
const pause=()=>new Promise(r=>setTimeout(r,40));
const {dom,w,d,errors}=load('#overview');
const seen=new Set();
for(const route of ['start','style','component','pattern','releases','licensing']){
  w.location.hash='#'+route;await pause();
  assert.equal(d.querySelectorAll('main h1').length,1);
  for(const frame of d.querySelectorAll('.vue-recipe-frame')){
    const url=new URL(frame.src);assert.equal(url.origin,w.location.origin);assert.ok(['recipes','advanced'].includes(url.searchParams.get('view')));assert.equal(url.searchParams.get('embed'),'1');assert.ok(frame.title);seen.add(frame.dataset.recipe);
  }
  for(const canvas of d.querySelectorAll('.inline-preview-canvas')){assert.ok(canvas.dataset.recipe);assert.equal(canvas.getAttribute('aria-busy'),'true');seen.add(canvas.dataset.recipe);}
  for(const link of d.querySelectorAll('[data-section-link]'))assert.ok(d.getElementById(link.dataset.sectionLink),'Preserved anchor '+link.dataset.sectionLink);
  for(const element of d.querySelectorAll('[aria-labelledby],[aria-describedby],[aria-controls]'))for(const key of ['aria-labelledby','aria-describedby','aria-controls'])for(const id of(element.getAttribute(key)||'').split(/\s+/).filter(Boolean))assert.ok(d.getElementById(id),'Reference '+id);
  assert.equal(d.querySelectorAll('.demo-stage>button,.demo-stage>form').length,0,'The canonical Vue canvas replaces active native examples');
}
assert.ok(seen.has('advanced-vue'),'Advanced API references use the actual shared consumer');seen.delete('advanced-vue');
const inventory=JSON.parse(await readFile(new URL('usage-example-inventory.json',base),'utf8'));
const standaloneRecipes=inventory.examples.filter(item=>item.delivery==='standalone-composition').map(item=>item.section);
assert.deepEqual(standaloneRecipes.sort(),['choices','navigation','selection'],'Only the explicitly preserved mixed compositions move out of component canvases');
const expectedRecipes=[...new Set(inventory.examples.filter(item=>item.recipe&&item.delivery!=='standalone-composition').map(item=>item.section))];
assert.deepEqual([...seen].sort(),expectedRecipes.sort(),'Every canonical recipe has a real document canvas');
w.location.hash='#pattern';await pause();const frame=d.querySelector('iframe[data-recipe=workflow]'),sent=[];assert.ok(frame);frame.contentWindow.postMessage=(data,origin)=>sent.push({data,origin});
const message=(data,origin=w.location.origin,source=frame.contentWindow)=>w.dispatchEvent(new w.MessageEvent('message',{origin,source,data}));
const controller=w.__getPreviewController();
message({type:'solyi:recipe-height',height:400},'https://wrong.test');assert.equal(frame.height,'320');message({type:'solyi:recipe-height',height:400},w.location.origin,w);assert.equal(frame.height,'320');
message({type:'solyi:recipe-ready'});assert.equal(frame.hasAttribute('aria-busy'),false);assert.equal(sent.at(-1).origin,w.location.origin);
message({type:'solyi:recipe-height',height:400});assert.equal(frame.height,'400');message({type:'solyi:recipe-height',height:Infinity});assert.equal(frame.height,'400');message({type:'solyi:recipe-height',height:1e8});assert.equal(frame.height,'6000');
d.documentElement.dataset.mode='dark';d.documentElement.dataset.density='compact';await pause();assert.equal(sent.at(-1).data.appearance.mode,'dark');assert.equal(sent.at(-1).data.appearance.density,'compact');
let leave=controller.requestLeave();await pause();let request=sent.findLast(item=>item.data.type==='solyi:recipe-leave');assert.ok(request);message({type:'solyi:recipe-leave-ready',id:request.data.id});message({type:'solyi:recipe-leave-result',id:request.data.id,allowed:false});assert.equal(await leave,false);
leave=controller.requestLeave();await pause();request=sent.findLast(item=>item.data.type==='solyi:recipe-leave');message({type:'solyi:recipe-leave-ready',id:request.data.id});message({type:'solyi:recipe-leave-result',id:request.data.id,allowed:true});assert.equal(await leave,true);
let clipboard='';Object.defineProperty(w.navigator,'clipboard',{value:{writeText:async text=>clipboard=text},configurable:true});const host=d.querySelector('#form .vue-code-examples'),tabs=host.querySelectorAll('[role=tab]'),copy=host.querySelector('.code-copy-button');host.open=true;tabs[0].click();copy.click();await pause();assert.equal(clipboard,w.eval('vueRecipes.form.source'));assert.equal(copy.dataset.copied,'true');assert.equal(copy.getAttribute('aria-label'),'코드 복사 완료');assert.ok(d.querySelector('#announcement').textContent.includes('복사'));
tabs[1].click();assert.equal(copy.dataset.copied,undefined);copy.click();await pause();assert.equal(clipboard,[...host.querySelectorAll('[role=tabpanel][id$="-html"] pre code')].map(el=>el.textContent).join('\n\n'));
leave=controller.requestLeave();controller();assert.equal(await leave,false,'Cleanup cancels pending guard conservatively');const count=sent.length;d.documentElement.dataset.mode='light';await pause();assert.equal(sent.length,count,'Disposed bridge does not send appearance');
assert.deepEqual(errors,[]);dom.window.close();console.log('PASS: real document bootstrap, all '+expectedRecipes.length+' package recipe canvases, preserved aliases/ARIA, source-origin and height guards, theme/density sync, unsaved-leave explicit response/cleanup, one upper header copy action, selected code and accessible copied feedback. This is not pixel or cross-frame native keyboard QA.');

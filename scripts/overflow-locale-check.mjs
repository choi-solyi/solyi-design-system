import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {writeFile} from 'node:fs/promises';
const installed=process.argv.includes('--installed'),root=new URL('../',import.meta.url);
const dom=new JSDOM('<main><span class="sol-ellipsis">Fictional long title</span><a href="#kept"><span class="sol-ellipsis">Existing action</span></a></main>',{url:'https://example.test/',pretendToBeVisual:true});
const w=dom.window,d=w.document;
for(const name of ['document','window','AbortController','MutationObserver'])Object.defineProperty(globalThis,name,{value:name==='document'?d:name==='window'?w:w[name],configurable:true});
globalThis.requestAnimationFrame=w.requestAnimationFrame.bind(w);globalThis.cancelAnimationFrame=w.cancelAnimationFrame.bind(w);globalThis.innerWidth=720;globalThis.innerHeight=800;
w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
for(const node of d.querySelectorAll('.sol-ellipsis')){Object.defineProperty(node,'scrollWidth',{value:200});Object.defineProperty(node,'clientWidth',{value:40});node.getClientRects=()=>[{width:40,height:20}];}
let entry=new URL('site/overflow.js',root);if(installed){entry=new URL('examples/package-consumer/.runtime-overflow.mjs',root);await writeFile(entry,"export {mountOverflowText} from 'solyi-ui/overflow';\n");}
const {mountOverflowText}=await import(entry);
let locale={fullText:'Full content',close:'Close',viewFullText:text=>'View full content: '+text};
const cleanup=mountOverflowText(d.querySelector('main'),()=>locale),trigger=d.querySelector('.sol-title-preview');
assert.equal(trigger.getAttribute('aria-label'),'View full content: Fictional long title','Clipped-title action follows the supplied locale on creation');
assert.equal(d.querySelectorAll('.sol-title-preview').length,1,'Existing linked title is not wrapped or hijacked');
trigger.click();assert.equal(d.querySelector('dialog h2').textContent,'Full content');assert.equal(d.querySelector('dialog button').textContent,'Close ×');d.querySelector('dialog').close();
locale={fullText:'전체 내용',close:'닫기',viewFullText:text=>'전체 확인: '+text};cleanup.refresh();assert.equal(trigger.getAttribute('aria-label'),'전체 확인: Fictional long title','Runtime locale/custom formatter changes update existing triggers');
const text=d.querySelector('.sol-title-preview .sol-ellipsis');text.textContent='Changed fictional title';cleanup.refresh();assert.equal(trigger.getAttribute('aria-label'),'전체 확인: Changed fictional title');
cleanup();assert.equal(d.querySelector('.sol-title-preview'),null);assert.equal(d.querySelector('a').getAttribute('href'),'#kept');assert.equal(d.querySelector('dialog'),null);dom.window.close();
console.log('PASS: '+(installed?'installed Core export':'source Core helper')+' clipped-title locale on creation/refresh/text updates, dialog labels, preserved linked actions and cleanup. Synthetic geometry; actual Chrome evidence is separate.');

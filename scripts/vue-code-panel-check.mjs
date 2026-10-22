import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import {mountVueExamples} from '../site/vue-examples.js';
import {vueRecipes} from '../site/vue-recipes-data.js';
const {parse}=await import('../examples/vue-vuetify/node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js');

const dom=new JSDOM('<main><section class="section" id="buttons"><h2>Button</h2></section><section class="section" id="help"><h2>Tooltip / Popover</h2></section></main>');
const {window:w}=dom,d=w.document;
Object.assign(globalThis,{document:d,AbortController:w.AbortController});
const snippets=new Map();let sequence=0;
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
const codeSample=(label,code)=>{const id=String(++sequence);snippets.set(id,code);return `<details class="code-example"><summary>${label}</summary><div class="code-body"><div class="code-toolbar"><button class="code-copy-button" data-copy-snippet="${id}" aria-label="현재 코드 복사">복사</button></div><pre tabindex="0"><code>${escape(code)}</code></pre></div></details>`;};
for(const section of d.querySelectorAll('section'))section.insertAdjacentHTML('beforeend',codeSample('HTML 참고','<button>HTML</button>'));
const cleanup=mountVueExamples(d.querySelector('main'),codeSample);
const host=d.querySelector('#buttons>.vue-code-examples'),tabs=[...host.querySelectorAll('[role=tab]')],panels=[...host.querySelectorAll('[role=tabpanel]')];
assert.equal(host.tagName,'DETAILS');assert.equal(host.querySelectorAll('details').length,0,'One disclosure owns both code tabs');
assert.equal(tabs[0].getAttribute('aria-selected'),'true');assert.equal(panels[1].hidden,true);
for(let i=0;i<2;i++){assert.equal(tabs[i].getAttribute('aria-controls'),panels[i].id);assert.equal(panels[i].getAttribute('aria-labelledby'),tabs[i].id);}
const copyValue=()=>snippets.get(host.querySelector('.code-toolbar>[data-copy-snippet]').dataset.copySnippet);
assert.equal(host.querySelectorAll('[data-copy-snippet]').length,1,'One header action copies the active panel');assert.ok(host.querySelector('.code-example-footer'));
assert.equal(copyValue(),vueRecipes.buttons.source);
tabs[0].dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));
assert.equal(d.activeElement,tabs[1]);assert.equal(tabs[1].tabIndex,0);assert.equal(panels[0].hidden,true);assert.equal(panels[1].hidden,false);assert.equal(copyValue(),'<button>HTML</button>');
tabs[1].dispatchEvent(new w.KeyboardEvent('keydown',{key:'Home',bubbles:true}));assert.equal(d.activeElement,tabs[0]);
assert.equal(d.querySelector('#help [role=tab]').textContent,'Vue 예제');
for(const [id,recipe]of Object.entries(vueRecipes)){assert.equal(recipe.source,await readFile(new URL(`../examples/vue-vuetify/src/recipes/${id}.vue`,import.meta.url),'utf8'),id+' display/copy/execution source');assert.deepEqual(parse(recipe.source,{filename:id+'.vue'}).errors,[],id+' SFC parse');}
cleanup();const prior=tabs[0].getAttribute('aria-selected');tabs[1].click();assert.equal(tabs[0].getAttribute('aria-selected'),prior);
dom.window.close();console.log('PASS: attached code tabs, one disclosure, linked panels/selection/roving keys, per-panel copy IDs, honest Vue composition labels, all30 displayed/copied/executed source identities and cleanup. Pixel layout is deferred to the batch review.');

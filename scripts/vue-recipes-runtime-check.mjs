/* The actual starter SFC + installed tarballs, in synthetic DOM. Not visual/native-keyboard QA. */
import assert from 'node:assert/strict';
import {writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {JSDOM,VirtualConsole} from 'jsdom';
const source=process.argv.includes('--source');
const root=new URL('../',import.meta.url),consumer=new URL('examples/vue-vuetify/',root);
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM('<html><body><div id="app"></div></body></html>',{url:'https://example.test/',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;
for(const key of ['window','document','Element','Node','HTMLElement','HTMLInputElement','SVGElement','ShadowRoot','Document','MutationObserver','Event','MouseEvent','KeyboardEvent','AbortController','getComputedStyle'])Object.defineProperty(globalThis,key,{value:key==='window'?w:key==='document'?d:w[key],configurable:true});
globalThis.visualViewport=undefined;globalThis.requestAnimationFrame=w.requestAnimationFrame.bind(w);globalThis.cancelAnimationFrame=w.cancelAnimationFrame.bind(w);globalThis.innerWidth=1000;globalThis.innerHeight=800;
w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});globalThis.matchMedia=w.matchMedia;
globalThis.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=globalThis.ResizeObserver;
globalThis.CSS={supports:()=>false,escape:value=>String(value).replace(/[^\w-]/g,'')};w.CSS=globalThis.CSS;
const {build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer));
const {default:vue}=await import(new URL('node_modules/@vitejs/plugin-vue/dist/index.mjs',consumer));
const {createVueAutoImport}=await import(new URL('auto-import.config.js',consumer));
const entry=new URL('.runtime-test/recipes-entry.js',consumer);await mkdir(new URL('./',entry),{recursive:true});
await writeFile(entry,`export {createApp,h,ref,nextTick} from 'vue';export * from 'solyi-ui';export {recipeComponents} from '../src/recipe-registry.ts';`);
const built=await build({root:fileURLToPath(consumer),configFile:false,plugins:[vue(),createVueAutoImport({generate:false})],resolve:{dedupe:['vue','vuetify','@solyi/core','solyi-ui'],alias:source?[{find:/^solyi-ui$/,replacement:fileURLToPath(new URL('packages/vue-ui/src/index.ts',root))}]:[]},logLevel:'error',build:{lib:{entry:fileURLToPath(entry),formats:['es']},write:false,minify:false,rolldownOptions:{external:['vue']}}});
const chunks=(Array.isArray(built)?built:[built]).flatMap(r=>r.output).filter(x=>x.type==='chunk'),out=new URL('.runtime-test/recipes-bundle/',consumer);await mkdir(out,{recursive:true});for(const chunk of chunks){assert.ok(!chunk.fileName.includes('..'));await mkdir(new URL('./',new URL(chunk.fileName,out)),{recursive:true});await writeFile(new URL(chunk.fileName,out),chunk.code);}
const api=await import(new URL(chunks.find(c=>c.isEntry).fileName+'?progress='+Date.now(),out));
const {createApp,h,ref,nextTick,recipeComponents,createSolyiVuetify,STree,SRadioGroup}=api;
const tick=async()=>{await nextTick();await nextTick();},wait=ms=>new Promise(r=>setTimeout(r,ms));
const $=s=>{const el=d.querySelector(s);assert.ok(el,s);return el;};
const key=(el,name)=>el.dispatchEvent(new w.KeyboardEvent('keydown',{key:name,bubbles:true,cancelable:true}));
const warnings=[];let app,vuetify;
async function mount(id,props={}){app=createApp(recipeComponents[id],props);app.config.warnHandler=msg=>warnings.push(id+': '+msg);vuetify=createSolyiVuetify();app.use(vuetify).use({install:api.install});app.mount('#app');await tick();}
async function unmount(){app.unmount();vuetify.unmount();await tick();}
function checkRefs(){for(const el of d.querySelectorAll('[aria-labelledby],[aria-describedby]'))for(const attr of ['aria-labelledby','aria-describedby'])for(const id of (el.getAttribute(attr)||'').split(/\s+/).filter(Boolean))assert.ok(d.getElementById(id),'Missing '+id);}
for(const id of Object.keys(recipeComponents)){await mount(id);checkRefs();assert.ok($('#app').textContent.trim(),id);const ids=[...d.querySelectorAll('[id]')].map(x=>x.id);assert.equal(ids.length,new Set(ids).size,id+' duplicate IDs');await unmount();}
assert.equal(Object.keys(recipeComponents).length,31);
await mount('form');
const formName=$('#recipe-form-name');$('form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await wait(15);await tick();
assert.equal(formName.getAttribute('aria-invalid'),'true','SForm validates the real STextField rules');assert.equal(d.activeElement,formName,'SForm failure focuses the exposed field ref');
const clearValidation=[...d.querySelectorAll('button')].find(x=>x.textContent.includes('검증 표시 지우기'));clearValidation.click();await tick();assert.equal(formName.getAttribute('aria-invalid'),'false');
formName.value='가상 프로젝트';formName.dispatchEvent(new w.Event('input',{bubbles:true}));$('#recipe-form-fail').click();await tick();$('form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await wait(440);await tick();assert.match($('#app').textContent,/가상 요청 실패/);assert.equal(formName.value,'가상 프로젝트','A server failure preserves the entered value');
$('#recipe-form-fail').click();await tick();$('form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await wait(440);await tick();assert.match($('#app').textContent,/가상 입력을 확인/);await unmount();
await mount('error-summary');$('form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await wait(15);await tick();assert.equal(d.activeElement.id,'recipe-summary');const summaryLink=$('#recipe-summary a');summaryLink.click();await tick();assert.equal(d.activeElement.id,'recipe-summary-name');await unmount();
await mount('chart-tree');const tree=$('[role=tree]'),first=tree.querySelector('[role=treeitem]');first.focus();key(first,'ArrowRight');await tick();assert.equal(first.getAttribute('aria-expanded'),'true');key(first,'ArrowDown');await tick();assert.equal(d.activeElement.getAttribute('data-tree-id'),'garden');key(d.activeElement,'Enter');await tick();assert.equal(d.activeElement.getAttribute('aria-selected'),'true');key(d.activeElement,'ArrowLeft');await tick();assert.equal(d.activeElement,first);key(first,'ArrowLeft');await tick();assert.equal(first.getAttribute('aria-expanded'),'false');assert.ok(first.querySelector('[role=group]').hidden);await unmount();
await mount('compare');const radios=[...d.querySelectorAll('input[type=radio]')];assert.equal(radios.length,2);radios[1].closest('label').click();await tick();assert.ok(radios[1].checked);await unmount();
await mount('inputs');const input=$('input[type=file]');const file=new w.File(['fictional'],'sample.txt',{type:'text/plain',lastModified:1});Object.defineProperty(input,'files',{value:[file],configurable:true});input.dispatchEvent(new w.Event('change',{bubbles:true}));await tick();assert.ok($('#app').textContent.includes('sample.txt'));const remove=[...d.querySelectorAll('button')].find(x=>x.getAttribute('aria-label')==='sample.txt 제거');assert.ok(remove);remove.click();await tick();assert.equal(d.activeElement.id,'recipe-files-choose');input.dispatchEvent(new w.Event('change',{bubbles:true}));await tick();assert.ok($('#app').textContent.includes('sample.txt'));const zone=$('.sol-dropzone'),drop=new w.Event('drop',{bubbles:true,cancelable:true});Object.defineProperty(drop,'dataTransfer',{value:{types:['Files'],files:[new w.File(['x'],'wrong.exe',{type:'application/octet-stream'})]}});zone.dispatchEvent(drop);await tick();assert.ok(drop.defaultPrevented);assert.match($('#app').textContent,/허용하지 않는 파일 형식/);
const mode=$('#recipe-autocomplete-mode');mode.value='error';mode.dispatchEvent(new w.Event('change',{bubbles:true}));await tick();const combo=$('#recipe-autocomplete');combo.click();await wait(180);await tick();combo.focus();combo.setSelectionRange(0,0);const home=new w.KeyboardEvent('keydown',{key:'Home',bubbles:true,cancelable:true});combo.dispatchEvent(home);assert.equal(home.defaultPrevented,false);key(combo,'Tab');await tick();const retry=[...d.querySelectorAll('button')].find(x=>x.textContent.includes('검색 다시 시도'));assert.ok(retry);retry.focus();retry.click();await wait(180);await tick();key(combo,'Enter');await tick();assert.equal(combo.value,'기록');assert.equal(d.activeElement,combo);await unmount();
await mount('workflow');$('#recipe-edit').click();await tick();assert.equal(d.activeElement.id,'recipe-edit-title');const cancel=[...d.querySelectorAll('button')].find(x=>x.textContent.includes('수정 취소'));cancel.click();await tick();assert.equal(d.activeElement.id,'recipe-edit');await unmount();
await mount('bulk-recovery');[...d.querySelectorAll('button')].find(x=>x.textContent.includes('선택한 가상')).click();await wait(380);await tick();assert.match($('#recipe-bulk-result').textContent,/실패 1개/);const retryBulk=$('#recipe-bulk-retry');retryBulk.focus();retryBulk.click();await wait(380);await tick();assert.match($('#recipe-bulk-result').textContent,/실패 0개/);assert.equal(d.activeElement.id,'recipe-bulk-result');await unmount();
for (const recipe of ['responses', 'composition']) {
  for (let repeat = 0; repeat < 2; repeat++) {
    await mount(recipe)
    if (recipe === 'responses') {
      const response = $('#recipe-response')
      response.value = 'error'
      response.dispatchEvent(new w.Event('change', { bubbles: true }))
      await tick()
    }
    const retry = [...d.querySelectorAll('button')].find(button => button.textContent.trim() === '다시 시도')
    assert.ok(retry)
    retry.focus()
    retry.click()
    await tick()
    const result = $(recipe === 'responses' ? '#recipe-response-result' : '#recipe-composition-result')
    assert.equal(d.activeElement, result)
    assert.equal(result.getAttribute('role'), 'status')
    await unmount()
  }
}
await mount('inputs')
const inputsRegion = $('section.sol-stack')
assert.equal(inputsRegion.getAttribute('aria-labelledby'), 'recipe-inputs-title')
assert.equal(d.querySelectorAll('#recipe-inputs-title').length, 1)
assert.equal(inputsRegion.querySelectorAll(':scope > article.sol-ui-card').length, 3)
assert.equal(
  inputsRegion.querySelectorAll('article.sol-ui-card article.sol-ui-card').length,
  0,
  'Input sections have one card padding boundary rather than nested card padding',
)
const dateInput = $('#recipe-date')
dateInput.value = '2026-10-23 ~ 2026-10-24'
dateInput.dispatchEvent(new w.Event('input', { bubbles: true }))
key(dateInput, 'Enter')
await tick()
assert.match(inputsRegion.textContent, /"start":"2026-10-23","end":"2026-10-24"/)
const dateMode = $('#recipe-date-mode')
dateMode.value = 'single'
dateMode.dispatchEvent(new w.Event('change', { bubbles: true }))
await tick()
assert.equal(dateInput.value, '')
assert.equal(dateInput.placeholder, 'YYYY-MM-DD')
await unmount()
for(const part of ['date','files','autocomplete']){await mount('inputs',{part});assert.equal(d.querySelectorAll('h2').length,1,'Standalone part keeps heading level2: '+part);assert.equal(d.querySelectorAll('h3').length,0);await unmount();}
assert.deepEqual(warnings,[]);assert.deepEqual(errors,[]);dom.window.close();console.log('PASS: all 31 actual package-consuming Vue SFCs mount, ARIA references and IDs; tree keyboard/collapse/selection, whole-card radio, synthetic local file select/drop/reselect/remove, autocomplete edit/retry/selection, workflow and bulk focus. Synthetic DOM is not visual or native keyboard QA.');

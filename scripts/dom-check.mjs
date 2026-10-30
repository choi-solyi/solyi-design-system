import {recoveryChecks} from './recovery-tests.mjs';
/* Synthetic DOM checks. These do not replace a browser, layout, native keyboard, or screen reader review. */
import {JSDOM, VirtualConsole} from 'jsdom';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {moduleOrder} from './site-manifest.mjs';
import {expansionChecks} from './expansion-tests.mjs';
import {layoutComponentNames,componentExampleOwners} from '../site/component-api.js';
import {componentReferences,componentExampleSources} from '../site/component-api-data.js';
const html=await readFile(new URL('../docs/index.html',import.meta.url),'utf8');
const tokenSource=JSON.parse(await readFile(new URL('../tokens.json',import.meta.url),'utf8'));
const withoutImports=source=>source.replace(/^import .* from '\.\/[\w-]+\.js';\r?\n/gm,'');
const app=withoutImports((await readFile(new URL('../docs/app.js',import.meta.url),'utf8')).replace("import tokens from './token-data.js';",`const tokens = ${JSON.stringify(tokenSource)};`));
const virtualConsole=new VirtualConsole();
const errors=[];
virtualConsole.on('jsdomError',error=>errors.push(error.message));
const dom=new JSDOM(html,{url:'https://example.test/solyi-design-system/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole});
const {window:w}=dom;const d=w.document;
w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
for(const [key,value] of Object.entries(tokenSource.base))d.documentElement.style.setProperty(`--sol-${key}`,value);
const reduced=new w.EventTarget();reduced.matches=false;w.matchMedia=()=>reduced;
const animations=[];
w.HTMLElement.prototype.animate=function(keyframes,options){const animation={element:this,keyframes,options,cancelled:false,cancel(){this.cancelled=true;this.oncancel?.();}};animations.push(animation);return animation;};
d.getAnimations=()=>animations.filter(animation=>!animation.cancelled);
w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');this.querySelector('[autofocus]')?.focus();};
w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');this.dispatchEvent(new w.Event('close'));};
let clipboard='';
Object.defineProperty(w.navigator,'clipboard',{value:{writeText:async value=>{clipboard=value;}}});
for(const name of moduleOrder)w.eval(withoutImports(await readFile(new URL(`../docs/${name}.js`,import.meta.url),'utf8')).replace(/^export const /gm,'var ').replace(/^export /gm,''));
// Unit scope: document navigation and remaining native Core patterns. Actual Vue canvases
// are exercised by the installed-package and preview integration runtime suites.
let previewMounts=0;
w.mountVuePreviews=()=>{previewMounts++;return()=>{};};w.eval(app);
const $=selector=>{const result=d.querySelector(selector);assert.ok(result,selector);return result;};
const fire=(element,type)=>element.dispatchEvent(new w.Event(type,{bubbles:true,cancelable:true}));
const click=selector=>$(selector).click();
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const route=async name=>{w.location.hash=name;await pause(20);};
function integrity() {
  const ids=[...d.querySelectorAll('[id]')].map(element=>element.id);
  assert.equal(ids.length,new Set(ids).size,'No duplicate IDs');
  for(const element of d.querySelectorAll('[aria-describedby],[aria-labelledby],[aria-controls],[aria-activedescendant]')) {
    for(const attr of ['aria-describedby','aria-labelledby','aria-controls','aria-activedescendant']) for(const id of (element.getAttribute(attr)||'').split(' ').filter(Boolean)) assert.ok(d.getElementById(id),`ARIA ${id} exists`);
  }
  for(const a of d.querySelectorAll('a[href^="#"]')) {
    const hash=a.getAttribute('href').slice(1);
    if(hash==='main-content')continue;
    const [page,anchor]=hash.split('/');
    assert.ok(['start','style','component','pattern','releases','licensing','overview','theme'].includes(page),`Known page ${page}`);
    const resolved=w.resolveDocumentLocation('#'+hash),current=w.resolveDocumentLocation(w.location.hash);
    if(resolved.anchor && resolved.route===current.route) assert.ok(d.getElementById(resolved.anchor),`Section ${page}/${anchor} resolves to ${resolved.anchor}`);
  }
}
for(const name of ['start','style','component','pattern','releases','licensing']) {
  await route(name);integrity();assert.equal(d.querySelectorAll('main h1').length,1);
  assert.equal($('[aria-current="page"]').dataset.route,name);
  assert.equal(d.activeElement.tagName,'H1','Route focus');
}
await route('overview');
click('[data-task]:not(:checked)');assert.equal($('#task-progress').value,2);
// Finite effects never own goal state. Fast reversal, stale completion, routing, visibility and reduction.
const firstEffect=animations.at(-1);assert.equal(firstEffect.options.duration,160);assert.equal(firstEffect.options.iterations,1);assert.equal(firstEffect.options.fill,'none');
click('[data-task]:not(:checked)');assert.equal($('#task-progress').value,3);assert.match($('#goal-feedback').textContent,/모두/);assert.match($('#goal-status').textContent,/완료/);
click('[data-task]');click('[data-task]');click('[data-task]');assert.equal($('#task-progress').value,2);assert.match($('#goal-feedback').textContent,/해제/);
firstEffect.onfinish?.();assert.equal($('#task-progress').value,2,'Stale completion cannot change state');
click('[data-task]');assert.equal($('#task-progress').value,3);
Object.defineProperty(d,'hidden',{configurable:true,value:true});fire(d,'visibilitychange');assert.ok(animations.every(a=>a.cancelled));
Object.defineProperty(d,'hidden',{configurable:true,value:false});const beforeReturn=animations.length;fire(d,'visibilitychange');assert.equal(animations.length,beforeReturn,'Visibility return does not replay');
await route('component');await route('overview');assert.equal($('#task-progress').value,3,'Goals survive in-document navigation');
reduced.matches=true;reduced.dispatchEvent(new w.Event('change'));const beforeReduced=animations.length;click('[data-task]');assert.equal(animations.length,beforeReduced);assert.equal($('#task-progress').value,2);assert.equal(d.documentElement.dataset.motionPolicy,'reduced');
reduced.matches=false;reduced.dispatchEvent(new w.Event('change'));
await route('style');
assert.equal($('#motion-demo-card').hidden,true,'No entrance on mount');
click('#motion-card-play');assert.equal($('#motion-demo-card').hidden,false);assert.equal(animations.at(-1).options.duration,220);assert.equal(animations.at(-1).options.easing,tokenSource.base['motion-easing-standard']);
const replay=animations.at(-1);click('#motion-card-play');assert.ok(replay.cancelled,'Replay cancels old effect');click('#motion-card-reset');assert.equal($('#motion-demo-card').hidden,true);assert.ok(animations.at(-1).cancelled);
click('#motion-preview-reduce');const beforeManualReduced=animations.length;click('#motion-card-play');assert.equal(animations.length,beforeManualReduced);assert.equal($('#motion-demo-card').hidden,false);
click('#motion-preview-reduce');reduced.matches=true;reduced.dispatchEvent(new w.Event('change'));click('#motion-card-play');assert.equal(animations.length,beforeManualReduced,'Demo never overrides system reduce');
reduced.matches=false;reduced.dispatchEvent(new w.Event('change'));
assert.equal(d.querySelectorAll('.color-specimen').length,5);assert.equal(d.querySelectorAll('.color-specimen .tone-fill').length,5);
const colorTrigger=$('[data-color-toast="success"]');colorTrigger.focus();colorTrigger.click();assert.equal($('#color-toast').hidden,false);assert.equal($('#color-toast').dataset.tone,'success');assert.equal(d.activeElement,colorTrigger);
click('[data-color-toast="danger"]');assert.equal(d.querySelectorAll('#color-toast').length,1);assert.match($('#color-toast-message').textContent,/Error/);assert.equal($('#color-toast').dataset.tone,'danger');
$('#color-toast-close').focus();click('#color-toast-close');assert.equal($('#color-toast').hidden,true);assert.equal(d.activeElement,$('[data-color-toast="danger"]'));
click('.color-specimen[data-tone="info"] .tone-soft');assert.match($('#color-example-result').textContent,/Information/);
$('#token-search').value='danger';fire($('#token-search'),'input');assert.equal(d.querySelectorAll('.sol-token-card').length,2);
for(const card of d.querySelectorAll('.sol-token-card')){
  const name=card.textContent;
  assert.ok(name.includes(card.querySelector('code').textContent),'Visible token variable is in the name');
  assert.ok(name.includes(card.querySelector('.token-value').textContent),'Visible HEX is in the name');
  assert.equal(card.getAttribute('aria-labelledby'),null,'Native button content supplies the complete visible name');
  assert.ok(d.getElementById(card.getAttribute('aria-describedby')).hidden,'Copy action is described separately');
}
click('.sol-token-card');await pause(10);assert.match(clipboard,/--sol-color-danger/);
click('#mode-toggle');assert.equal(d.documentElement.dataset.mode,'dark');
assert.ok($('#contrast-results').textContent.includes('dark'));
$('#token-search').value='no-such-token';fire($('#token-search'),'input');assert.match($('#token-grid').textContent,/일치하는 토큰/);
await route('component');
integrity();for(const name of ['SConfirmAction','SEmptyState','SLoadingOverlay','SPagination','STimeGrid'])assert.ok(componentReferences.some(item=>item.name===name),name+' has a public document');const baselinePublic=JSON.parse(await readFile(new URL('../documentation/development/LIBRARY-SIZE-BUDGETS.json',import.meta.url),'utf8')).versions['1.1.0'].components;assert.deepEqual(componentReferences.map(item=>item.name).sort(),[...baselinePublic,'SBtnGroup'].sort(),'All 50 published APIs remain; Button Group is the single new public API');
assert.equal(d.querySelectorAll('main .component-reference').length,componentReferences.length-layoutComponentNames.length);for(const name of layoutComponentNames){const item=componentReferences.find(c=>c.name===name);assert.equal(d.getElementById(item.id),null,'Layout moved out of Components: '+name);}
assert.deepEqual(componentExampleOwners,{SProgressCircular:'sprogress-linear',SLoadingOverlay:'sprogress-linear'},'Only the requested progress comparison shares one canvas');assert.equal(d.querySelectorAll('main [data-component-example]').length,componentReferences.length-layoutComponentNames.length-Object.keys(componentExampleOwners).length,'Every nonshared API owns its canvas');for(const [name,owner]of Object.entries(componentExampleOwners)){const component=componentReferences.find(item=>item.name===name),link=d.querySelector('#'+component.id+' [data-shared-component-example]');assert.equal(link?.getAttribute('href'),'#component/'+owner);assert.ok(d.querySelector('#'+owner+' [data-component-example]'));}
assert.equal(d.querySelector('#component-examples'),null,'No second legacy component gallery');
assert.equal(d.querySelector('#button-feedback'),null,'Retired native component demo is not rendered');
for(const component of componentReferences.filter(item=>!layoutComponentNames.includes(item.name))){
  const card=$('#'+component.id),tabs=[...card.querySelectorAll('[data-component-tab]')];
  assert.deepEqual(tabs.map(tab=>tab.dataset.componentTab),['examples','code','api']);
  assert.equal(tabs[0].getAttribute('aria-selected'),'true');
  assert.equal($('#'+component.id+'-examples').hidden,false);
  assert.equal($('#'+component.id+'-code').hidden,true);
  assert.equal($('#'+component.id+'-api').hidden,true);
}
for(const name of layoutComponentNames){
 const component=componentReferences.find(item=>item.name===name);
 await route('component/'+component.id);
 assert.equal(d.querySelector('main').dataset.page,'style','Old layout URL resolves to Style');
 const card=$('#'+component.id);assert.ok(card.querySelector('[data-component-example]'));
 click('#'+component.id+'-code-tab');assert.equal(w.location.hash,'#style/'+component.id+'-code');assert.equal($('#'+component.id+'-code').hidden,false);assert.ok(card.querySelector('pre code').textContent.includes('<SContainer'));
 await route('component/'+component.id+'-api');assert.equal(d.querySelector('main').dataset.page,'style');assert.equal($('#'+component.id+'-api').hidden,false,'Old API anchor is preserved');integrity();
}
await route('component');
const mountedReferences=previewMounts,buttonCard=$('#sbtn');
click('#sbtn-code-tab');assert.equal(w.location.hash,'#component/sbtn-code');assert.equal($('#sbtn-code').hidden,false);
assert.ok($('#sbtn-code pre code .token'),'The app runs Prism on the canonical SFC');
assert.equal($('#sbtn-code pre code').textContent,componentExampleSources.buttons,'Highlighted sample text remains the canonical SFC');
click('#sbtn-code [data-copy-snippet]');await pause(10);
assert.equal(clipboard,componentExampleSources.buttons,'Prism display and copy preserve the running SFC source');
assert.match(clipboard,/<SBtn/);assert.match(clipboard,/\bref\(/,'The copied sample uses the configured Vue preset');
assert.doesNotMatch(clipboard,/^import (?!type\b).*from ['"]vue['"]/m);
assert.doesNotMatch(clipboard,/import\s*\{[^}]*\bSBtn\b[^}]*\}\s*from 'solyi-ui'/);
assert.equal($('#sbtn-code .code-copy-button').getAttribute('aria-label'),'코드 복사 완료');
click('#sbtn-api-tab');assert.equal($('#sbtn-api').hidden,false);assert.equal($('#sbtn-code').hidden,true);
w.history.back();await pause(30);assert.equal(w.location.hash,'#component/sbtn-code');assert.equal($('#sbtn-code').hidden,false);
w.history.forward();await pause(30);assert.equal(w.location.hash,'#component/sbtn-api');assert.equal($('#sbtn-api').hidden,false);
assert.equal($('#sbtn'),buttonCard,'Same-page tab history preserves the running preview card');
assert.equal(previewMounts,mountedReferences,'Tab history does not remount package previews');
await route('component/buttons');assert.equal(d.activeElement.id,'sbtn-title');assert.equal($('#sbtn-examples').hidden,false);integrity();
await route('component/time');assert.equal(d.activeElement.id,'stime-picker-title');assert.equal($('#stime-picker-examples').hidden,false);integrity();
await route('style');await route('component/sdate-picker-api');assert.equal($('#sdate-picker-api').hidden,false);assert.equal($('#sdate-picker-examples').hidden,true);integrity();
// Button loading/retry and component overlays now use the installed Vue runtime suites:
// library-runtime-check, vue-extended-runtime-check and vue-dedicated-runtime-check.
await route('pattern');
// This shared native dialog remains part of the Core search pattern, so its app wiring stays covered.
const dialog=$('#detail-dialog');dialog.showModal=function(){this.setAttribute('open','');};dialog.close=function(){this.removeAttribute('open');fire(this,'close');};
click('[data-open-detail]');assert.equal(dialog.open,true);click('#dialog-close');assert.equal(dialog.open,false);assert.equal(d.activeElement.dataset.openDetail,'0');
fire($('#project-form'),'submit');assert.equal($('#project-name').getAttribute('aria-invalid'),'true');assert.equal(d.activeElement.id,'project-name');
$('#project-name').value='가상 검증 기록';fire($('#project-name'),'input');assert.equal($('#project-name').hasAttribute('aria-invalid'),false);
$('#simulate-failure').checked=true;fire($('#project-form'),'submit');fire($('#project-form'),'submit');
assert.equal($('#form-submit').getAttribute('aria-busy'),'true');
$('#project-form').reset();assert.equal($('#project-name').value,'가상 검증 기록','Reset blocked while response pending');
await pause(760);assert.match($('#form-result').textContent,/저장하지 못/);assert.equal($('#project-name').value,'가상 검증 기록');
$('#simulate-failure').checked=false;fire($('#project-form'),'submit');await pause(760);assert.match($('#form-result').textContent,/만들었어요/);
$('#project-form').reset();assert.equal($('#project-name').value,'');assert.equal($('#project-name').hasAttribute('aria-invalid'),false);
$('#project-search').value='없는검색';fire($('#project-search'),'input');assert.match($('#project-results').textContent,/조건에 맞는 항목/);
click('[data-action="search-clear"]');assert.equal(d.querySelectorAll('.project-row').length,3);
assert.equal(d.querySelectorAll('#project-results h3').length,3,'Search results follow their h2 section with h3 headings');assert.equal(d.querySelectorAll('#project-results h4').length,0);
$('#project-filter').value='초안';fire($('#project-filter'),'change');assert.equal(d.querySelectorAll('#project-results .project-row').length,1);
click('[data-action="search-failure"]');assert.equal($('#project-results').getAttribute('aria-busy'),'true');await pause(760);assert.match($('#project-results').textContent,/불러오지 못/);
click('[data-action="search-retry"]');assert.equal(d.querySelectorAll('#project-results .project-row').length,1,'Filter retained on retry');
$('#project-filter').value='all';fire($('#project-filter'),'change');
click('[data-action="search-failure"]');$('#project-search').value='정원';fire($('#project-search'),'input');await pause(760);assert.match($('#project-results').textContent,/작은 정원/);assert.ok(!$('#project-results').textContent.includes('불러오지 못'),'New query cancels stale failure');
const radio=$('input[name="compare"][value="차근차근 정리"]');radio.checked=true;fire(radio,'change');assert.match($('#compare-result').textContent,/차근차근/);
const firstCompare=$('input[name="compare"][value="가볍게 기록"]');firstCompare.closest('.compare-card').querySelector('h3').click();assert.equal(firstCompare.checked,true);assert.equal(d.activeElement,firstCompare);assert.match($('#compare-result').textContent,/가볍게 기록/);assert.equal(radio.checked,false);
click('[data-action="empty-add"]');assert.match($('#empty-demo').textContent,/오늘의 첫 관찰/);assert.equal(d.activeElement.dataset.action,'empty-reset');
click('[data-action="empty-reset"]');assert.match($('#empty-demo').textContent,/아직 기록/);assert.equal(d.activeElement.dataset.action,'empty-add');
await route('theme');
click('[data-set-theme="sage"]');assert.equal(d.documentElement.dataset.theme,'sage');assert.equal($('[data-set-theme="sage"]').getAttribute('aria-pressed'),'true');
const density=$('input[name="density"][value="compact"]');density.checked=true;fire(density,'change');assert.equal(d.documentElement.dataset.density,'compact');
assert.equal(JSON.parse(w.localStorage.getItem('solyi-ds-prefs')).density,'compact');
await route('theme/adoption');assert.equal(d.activeElement.id,'adoption-title');integrity();
await route('style');assert.match($('#token-count').textContent,/Quiet sage/);
// Native component-only choice/help/disclosure/toast demos were retired. Their real S APIs
// remain covered by vue-extended-runtime-check, vue-dedicated-runtime-check,
// vue-expansion-runtime-check and all actual SFCs in vue-recipes-runtime-check.
// Stable row selection, sorting, filter/page reset, empty result and both responsive views.
await route('pattern');integrity();
assert.equal(d.querySelectorAll('#extra-table-body tr').length,3);assert.match($('#extra-data-count').textContent,/1\/4/);
click('#extra-select-page');assert.match($('#extra-selection-count').textContent,/선택 3개/);assert.equal(d.querySelectorAll('#extra-record-cards input:checked').length,3);
click('#extra-table-body [data-extra-select="r1"]');assert.equal($('#extra-select-page').indeterminate,true);assert.equal($('#extra-select-page-mobile').indeterminate,true);assert.equal($('#extra-record-cards [data-extra-select="r1"]').checked,false);
click('#extra-select-page');assert.equal($('#extra-select-page').checked,true);assert.match($('#extra-selection-count').textContent,/선택 3개/);
click('#extra-data-next');assert.match($('#extra-data-count').textContent,/2\/4/);assert.match($('#extra-selection-count').textContent,/선택 3개/);
$('#extra-data-filter').value='초안';fire($('#extra-data-filter'),'change');assert.match($('#extra-data-count').textContent,/1\/1/);assert.match($('#extra-selection-count').textContent,/현재 결과 밖 3개/);
$('#extra-data-query').value='없는자료';fire($('#extra-data-query'),'input');assert.equal($('#extra-data-empty').hidden,false);assert.equal($('#extra-select-page').disabled,true);assert.equal($('#extra-data-next').disabled,true);assert.equal(d.querySelector('#extra-data-page'),null);assert.equal($('#extra-data-page-buttons [aria-current="page"]').textContent,'1');
click('[data-extra="data-reset"]');assert.equal($('#extra-data-empty').hidden,true);assert.equal($('#extra-data-filter').value,'all');assert.match($('#extra-selection-count').textContent,/선택 3개/);
$('#extra-data-sort').value='name-asc';fire($('#extra-data-sort'),'change');assert.equal($('#extra-sort-name').getAttribute('aria-sort'),'ascending');
click('[data-extra-sort="name"]');assert.equal($('#extra-data-sort').value,'name-desc');assert.equal($('#extra-sort-name').getAttribute('aria-sort'),'descending');
$('#extra-data-query').value='기록';fire($('#extra-data-query'),'input');click('#extra-data-next');assert.match($('#extra-data-count').textContent,/2\/2/);
$('#extra-data-filter').value='초안';fire($('#extra-data-filter'),'change');assert.match($('#extra-data-count').textContent,/1\/1/);assert.equal($('#extra-data-empty').hidden,false);
click('#extra-selection-clear');assert.match($('#extra-selection-count').textContent,/선택 0개/);
// Number pagination, bounds, many/long data, state recovery and focus without a page select.
click('[data-extra="data-reset"]');$('#extra-data-set').value='many';fire($('#extra-data-set'),'change');assert.match($('#extra-data-count').textContent,/1\/28/);assert.equal($('#extra-data-prev').disabled,true);assert.ok(d.querySelector('.sol-page-gap'));
assert.deepEqual(w.paginationItems(14,28).filter(x=>!x.gap).map(x=>x.page).join(','),'1,13,14,15,28');
click('[data-extra-page="28"]');assert.match($('#extra-data-count').textContent,/28\/28/);assert.equal($('#extra-data-next').disabled,true);assert.equal(d.activeElement.getAttribute('aria-current'),'page');
click('#extra-data-prev');assert.match($('#extra-data-count').textContent,/27\/28/);assert.equal(d.activeElement.id,'extra-data-prev');
$('#extra-data-filter').value='초안';fire($('#extra-data-filter'),'change');assert.match($('#extra-data-count').textContent,/1\//);assert.equal($('#extra-data-page-buttons [aria-current="page"]').textContent,'1');
$('#extra-data-size').value='10';fire($('#extra-data-size'),'change');assert.ok(d.querySelectorAll('#extra-table-body tr').length<=10);
click('[data-extra="data-reset"]');$('#extra-data-set').value='long';fire($('#extra-data-set'),'change');assert.match($('#extra-table-body').textContent,/FictionalLong/);assert.equal(d.querySelectorAll('.sol-selectable-table col').length,5);
click('#extra-select-page');const selectedBefore=$('#extra-selection-count').textContent;$('#extra-data-state').value='loading';fire($('#extra-data-state'),'change');assert.equal($('#extra-data-loading').hidden,false);assert.equal($('#extra-data-table-view').hidden,true);assert.equal($('#extra-data-next').disabled,true);
$('#extra-data-state').value='error';fire($('#extra-data-state'),'change');assert.equal($('#extra-data-error').hidden,false);assert.equal($('#extra-selection-count').textContent,selectedBefore);click('#extra-data-retry');assert.equal($('#extra-data-state').value,'ready');assert.equal($('#extra-selection-count').textContent,selectedBefore);assert.equal(d.activeElement.id,'extra-data-count');
$('#extra-data-set').value='many';fire($('#extra-data-set'),'change');$('#extra-data-sort').value='date-desc';fire($('#extra-data-sort'),'change');const extraRecord=d.querySelector('#extra-table-body [data-record-id="r84"]');extraRecord.click();assert.equal($('#extra-panel').open,true);assert.equal($('#extra-panel-title').textContent,'가상 자료 084');click('[data-extra="panel-close"]');
console.log('PASS: numbered pages/ellipsis/current/bounds/focus, page-size/filter correction, long/many fixtures, stable column definitions and loading/error selection recovery.');

// Unified single/range picker: complete values only, calendar drafts, direct input and reusable API.
assert.equal(w.parseDateOnly('2024-02-29').d,29);assert.equal(w.parseDateOnly('2025-02-29'),null);assert.equal(w.parseDateOnly('1900-02-29'),null);assert.equal(w.parseDateOnly('2000-02-29').d,29);assert.equal(w.parseDateOnly('0000-01-01'),null);
assert.equal(w.parseDateOnly('2026-13-01'),null);assert.equal(w.parseDateOnly('2026-04-31'),null);assert.equal(w.parseDateOnly('2026-1-01'),null);
assert.equal(d.querySelectorAll('#extra-date-mount input').length,1,'One date text input for either mode');assert.equal(d.querySelector('#extra-date-start'),null);
const dateInput=$('#extra-input'),calendarTrigger=$('[data-calendar-open="extra"]');
const dateOutput=()=>JSON.parse($('#extra-date-output').textContent);
const dateKey=(key,shiftKey=false)=>d.activeElement.dispatchEvent(new w.KeyboardEvent('keydown',{key,shiftKey,bubbles:true,cancelable:true}));
const enterDate=text=>{dateInput.value=text;fire(dateInput,'input');dateInput.focus();dateKey('Enter');};
const dateClick=iso=>click('#extra-calendar [data-calendar-day="'+iso+'"]');
calendarTrigger.click();assert.equal($('#extra-calendar').open,true);assert.equal(d.activeElement.dataset.calendarDay,'2026-10-21');integrity();
dateClick('2026-10-25');assert.equal($('#extra-calendar').open,true,'First range click does not close');assert.equal(dateInput.value,'2026-10-21 ~ 2026-10-24');assert.equal(dateOutput().reason,'initial','No partial change');assert.match($('#extra-calendar [data-date-role="status"]').textContent,/선택 중/);
dateClick('2026-10-20');assert.equal(dateInput.value,'2026-10-20 ~ 2026-10-25');assert.deepEqual(dateOutput().value,{start:'2026-10-20',end:'2026-10-25'});assert.equal($('#extra-calendar').open,false);assert.equal(d.activeElement,calendarTrigger);
calendarTrigger.click();assert.equal(d.querySelectorAll('#extra-calendar [data-range="true"]').length,6);assert.equal(d.querySelectorAll('#extra-calendar [data-endpoint="true"]').length,2);dateClick('2026-10-28');click('#extra-calendar [data-date-role="close"]');assert.equal(dateInput.value,'2026-10-20 ~ 2026-10-25','Cancel preserves committed input');
calendarTrigger.click();dateClick('2026-10-21');dateClick('2026-10-21');assert.deepEqual(dateOutput().value,{start:'2026-10-21',end:'2026-10-21'},'Same-day range');
click('#extra-date-mount [data-date-role="clear"]');assert.equal(dateInput.value,'');assert.equal(dateOutput().value,null);assert.equal(dateOutput().reason,'clear');
enterDate('2026-10-24 ~ 2026-10-21');assert.equal(dateInput.getAttribute('aria-invalid'),'true');assert.equal(dateInput.value,'2026-10-24 ~ 2026-10-21');assert.equal(dateOutput().value,null,'Invalid direct range is not emitted');assert.match($('#extra-error').textContent,/종료일/);
enterDate('2026-10-24');assert.match($('#extra-error').textContent,/두 실제 날짜/);assert.equal(dateOutput().value,null);
enterDate('2026-10-24 ~ 2026-10-25');assert.deepEqual(dateOutput().value,{start:'2026-10-24',end:'2026-10-25'});assert.equal(dateOutput().reason,'input');assert.equal(dateInput.hasAttribute('aria-invalid'),false);
$('#extra-date-mode').value='single';fire($('#extra-date-mode'),'change');assert.equal(dateOutput().mode,'single');assert.equal(dateOutput().value,null);assert.equal(dateOutput().reason,'mode');assert.equal(dateInput.value,'');assert.equal(dateInput.maxLength,10);assert.equal(d.querySelectorAll('#extra-date-mount input').length,1);
enterDate('2024-02-29');assert.equal(dateOutput().value,'2024-02-29');dateInput.value='2025-02-29';fire(dateInput,'input');fire(dateInput,'blur');assert.equal($('#extra-error').hidden,true,'A first invalid blur does not shift the next click target');assert.equal(dateOutput().value,'2024-02-29');enterDate('2025-02-29');assert.equal(dateOutput().value,'2024-02-29');assert.equal(dateInput.value,'2025-02-29');assert.equal(dateInput.checkValidity(),false);fire($('#extra-range-form'),'submit');assert.equal(d.activeElement,dateInput);
enterDate('2024-01-31');calendarTrigger.click();assert.equal(d.querySelectorAll('#extra-calendar [data-calendar-day][tabindex="0"]').length,1);
$('#extra-calendar [data-date-role="calendar-clear"]').focus();dateKey('Tab');assert.equal(d.activeElement.dataset.dateRole,'close');dateKey('Tab',true);assert.equal(d.activeElement.dataset.dateRole,'calendar-clear');$('#extra-calendar [data-calendar-day="2024-01-31"]').focus();
dateKey('PageDown');assert.equal(d.activeElement.dataset.calendarDay,'2024-02-29');dateKey('PageDown',true);assert.equal(d.activeElement.dataset.calendarDay,'2025-02-28');dateKey('ArrowRight');assert.equal(d.activeElement.dataset.calendarDay,'2025-03-01');dateKey('Home');assert.equal(d.activeElement.dataset.calendarDay,'2025-02-23');dateKey('End');assert.equal(d.activeElement.dataset.calendarDay,'2025-03-01');dateKey('ArrowUp');assert.equal(d.activeElement.dataset.calendarDay,'2025-02-22');
d.activeElement.click();assert.equal(dateInput.value,'2025-02-22');assert.equal(dateOutput().value,'2025-02-22');assert.equal($('#extra-calendar').open,false);assert.equal(d.activeElement,calendarTrigger);assert.match(calendarTrigger.getAttribute('aria-label'),/2025-02-22/);
enterDate('0001-01-01');calendarTrigger.click();assert.equal($('#extra-calendar [data-date-role="prev"]').disabled,true);assert.equal(d.querySelectorAll('#extra-calendar [data-calendar-day="0001-01-01"]').length,1);dateKey('ArrowLeft');assert.equal(d.activeElement.dataset.calendarDay,'0001-01-01');click('#extra-calendar [data-date-role="close"]');
enterDate('9999-12-31');calendarTrigger.click();assert.equal($('#extra-calendar [data-date-role="next"]').disabled,true);dateKey('ArrowRight');assert.equal(d.activeElement.dataset.calendarDay,'9999-12-31');click('#extra-calendar [data-date-role="calendar-clear"]');assert.equal(dateOutput().value,null);assert.equal(d.activeElement,calendarTrigger);
fire($('#extra-range-form'),'submit');assert.equal(d.activeElement,dateInput);assert.match($('#extra-error').textContent,/날짜를 선택/);
$('#extra-date-mode').value='range';fire($('#extra-date-mode'),'change');assert.equal(dateInput.hasAttribute('aria-invalid'),false);assert.equal(dateOutput().value,null);
// Two independent instances, cloned values, output shape, deduplication, programmatic validation and teardown.
const fixture=d.createElement('div'),fixture2=d.createElement('div');d.body.append(fixture,fixture2);const changes=[],dateEvents=[];
fixture.addEventListener('sol-date-change',event=>dateEvents.push(JSON.parse(JSON.stringify(event.detail))));
const instance=w.createDatePicker(fixture,{id:'test-date',mode:'range',onChange:detail=>changes.push(JSON.parse(JSON.stringify(detail)))});
const second=w.createDatePicker(fixture2,{id:'test-date-2',mode:'single',value:'2000-02-29'});integrity();
instance.setValue({start:'2026-10-21',end:'2026-10-24'});assert.equal(changes.length,0);const external=instance.getValue();external.start='1999-01-01';assert.equal(instance.getValue().start,'2026-10-21');
assert.throws(()=>instance.setValue('2026-10-21'),/Invalid/);assert.throws(()=>instance.setValue({start:'2026-10-24',end:'2026-10-21'}),/Invalid/);assert.throws(()=>instance.setMode('week'),/mode/);
fixture.querySelector('[data-calendar-open]').click();fixture.querySelector('[data-calendar-day="2026-10-22"]').click();assert.equal(changes.length,0);instance.setMode('single');assert.equal(fixture.querySelector('dialog').open,false);assert.equal(instance.getValue(),null);assert.deepEqual(changes.at(-1),{mode:'single',value:null,reason:'mode'});assert.equal(second.getValue(),'2000-02-29','Other instance is unchanged');
instance.setMode('single');assert.equal(changes.length,1);instance.setValue('2026-10-23',{emit:true});assert.deepEqual(changes.at(-1),{mode:'single',value:'2026-10-23',reason:'programmatic'});instance.setValue('2026-10-23',{emit:true});assert.equal(changes.length,2,'Identical complete value is not emitted twice');instance.clear();assert.equal(changes.at(-1).value,null);assert.equal(instance.validate(),true,'Optional empty value is valid');
assert.deepEqual(dateEvents,changes);instance.destroy();instance.destroy();second.destroy();assert.equal(fixture.children.length,0);assert.equal(fixture2.children.length,0);assert.throws(()=>instance.setValue('2026-10-21'),/destroyed/);fixture.remove();fixture2.remove();
const abortHost=d.createElement('div');d.body.append(abortHost);const dateAbort=new w.AbortController();w.createDatePicker(abortHost,{signal:dateAbort.signal});dateAbort.abort();assert.equal(abortHost.children.length,0);abortHost.remove();
// File metadata only: explicit rejection, removal, same-file reselection and count cap.
const fileInput=$('#extra-files');const attach=files=>{Object.defineProperty(fileInput,'files',{configurable:true,value:files});fire(fileInput,'change');};
const fileA=new w.File(['sample'],'sample.txt',{type:'text/plain',lastModified:1});attach([fileA]);assert.equal(d.querySelectorAll('#extra-file-list li').length,1);assert.match($('#extra-file-list').textContent,/6 B/,'Small nonempty files display exact bytes rather than 0.0 KiB');assert.equal(fileInput.value,'');
assert.match($('#extra-file-list').textContent,/확장자 TXT · 텍스트 문서/);
attach([fileA]);assert.match($('#extra-file-errors').textContent,/이미 선택/);
attach([new w.File(['x'],'bad.exe'),new w.File([new Uint8Array(2*1024*1024+1)],'large.pdf')]);assert.match($('#extra-file-errors').textContent,/지원하지 않는/);assert.match($('#extra-file-errors').textContent,/2MiB/);
attach([new w.File(['b'],'b.png'),new w.File(['c'],'c.pdf'),new w.File(['d'],'d.txt')]);assert.equal(d.querySelectorAll('#extra-file-list li').length,3);assert.match($('#extra-file-errors').textContent,/최대 3개/);
click('[data-extra-remove="1"]');attach([fileA]);assert.equal(d.querySelectorAll('#extra-file-list li').length,3,'Removed file can be chosen again');click('#extra-file-clear');assert.equal(d.querySelectorAll('#extra-file-list li').length,0);assert.equal(d.activeElement,fileInput);
// Real handlers receive the same File data from picker and drop. Synthetic events do not prove OS dragging.
const fileDrag=(target,type,files=[],types=['Files'],items=files.map(file=>({kind:'file',getAsFile:()=>file})))=>{const event=new w.Event(type,{bubbles:true,cancelable:true});Object.defineProperty(event,'dataTransfer',{value:{types,files,items,dropEffect:'none'}});target.dispatchEvent(event);return event;};
const dropZone=$('#extra-file-drop');fileDrag(dropZone,'dragenter');fileDrag($('#extra-drop-title'),'dragenter');assert.equal(dropZone.dataset.dragState,'over');fileDrag($('#extra-drop-title'),'dragleave');assert.equal(dropZone.dataset.dragState,'over','Moving over a child keeps the active drop state');fileDrag(dropZone,'dragleave');assert.equal(dropZone.dataset.dragState,'idle');
assert.equal(fileDrag(dropZone,'dragover').defaultPrevented,true);assert.equal(dropZone.dataset.dragState,'over');
const jpg=new w.File(['fake-image'],'demo.JPG',{type:'image/jpeg',lastModified:2}),png=new w.File(['fake-png'],'demo.png',{type:'image/png',lastModified:3});
const dropped=fileDrag(dropZone,'drop',[jpg,png]);assert.equal(dropped.defaultPrevented,true);assert.equal(dropZone.dataset.dragState,'idle');assert.equal(d.querySelectorAll('#extra-file-list li').length,2);assert.match($('#extra-file-list').textContent,/JPEG 이미지/);assert.match($('#extra-file-list').textContent,/PNG 이미지/);assert.match($('#extra-drop-status').textContent,/드롭: 2개 추가/);
fileDrag(dropZone,'drop',[jpg]);assert.match($('#extra-file-errors').textContent,/이미 선택/);assert.equal(d.querySelectorAll('#extra-file-list li').length,2);
fileDrag(dropZone,'drop',[new w.File(['metadata-only'],'unknown.pdf',{type:'application/x-unknown',lastModified:4})]);assert.match($('#extra-file-list').textContent,/알 수 없는 MIME \(application\/x-unknown\)/);assert.equal(d.querySelectorAll('#extra-file-list li').length,3);
fileDrag(dropZone,'drop',[new w.File(['a'],'extra.txt'),new w.File(['b'],'bad.exe'),new w.File([new Uint8Array(2*1024*1024+1)],'huge.pdf')]);assert.match($('#extra-file-errors').textContent,/최대 3개/);assert.match($('#extra-file-errors').textContent,/지원하지 않는 확장자/);assert.match($('#extra-file-errors').textContent,/2MiB/);
assert.equal(fileDrag(d.body,'drop',[jpg]).defaultPrevented,true);assert.match($('#extra-file-errors').textContent,/점선 영역/);assert.equal(d.querySelectorAll('#extra-file-list li').length,3,'Outside drop never adds or removes files');
assert.equal(fileDrag(dropZone,'drop',[],['text/plain'],[{kind:'string'}]).defaultPrevented,false,'Text dragging is not intercepted');
click('#extra-file-list [data-extra-remove]');fileDrag(dropZone,'drop',[jpg]);assert.equal(d.querySelectorAll('#extra-file-list li').length,3,'Dropped file can be removed and added again');click('#extra-file-clear');fileDrag(dropZone,'drop',[],['Files'],[{kind:'file',getAsFile:()=>null}]);assert.match($('#extra-file-errors').textContent,/폴더는 지원하지/);
fileDrag(dropZone,'dragenter');fire(w,'blur');assert.equal(dropZone.dataset.dragState,'idle');
// Local combobox, including Korean IME composition and Escape/Tab.
const auto=$('#extra-autocomplete');auto.focus();auto.value='메';fire(auto,'input');assert.equal(auto.getAttribute('aria-expanded'),'true');assert.equal(d.querySelectorAll('#extra-autocomplete-list [role="option"]').length,1);
auto.dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true,cancelable:true}));assert.equal(auto.getAttribute('aria-activedescendant'),'extra-option-0');
auto.dispatchEvent(new w.CompositionEvent('compositionstart',{bubbles:true}));auto.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',isComposing:true,bubbles:true,cancelable:true}));assert.equal(auto.value,'메');assert.match($('#extra-autocomplete-result').textContent,/아직 선택/);
auto.dispatchEvent(new w.CompositionEvent('compositionend',{bubbles:true}));auto.dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true,cancelable:true}));auto.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));assert.equal(auto.value,'독서 메모');assert.equal(auto.getAttribute('aria-expanded'),'false');assert.equal(d.activeElement,auto);
auto.value='일치없음';fire(auto,'input');assert.equal($('#extra-autocomplete-empty').hidden,false);auto.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(auto.getAttribute('aria-expanded'),'false');assert.equal(auto.value,'일치없음');
click('#extra-autocomplete-clear');auto.dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowUp',bubbles:true,cancelable:true}));assert.equal(auto.getAttribute('aria-activedescendant'),'extra-option-5');auto.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Tab',bubbles:true}));assert.equal(auto.getAttribute('aria-expanded'),'false');
// Response simulator: all cases, recovery and stale timer cleanup on route changes.
const response=$('#extra-response-mode');response.value='denied';fire(response,'change');assert.match($('#extra-response-body').textContent,/실제 계정/);click('[data-extra-response="ready"]');assert.match($('#extra-response-status').textContent,/결과 2개/);
response.value='empty';fire(response,'change');assert.match($('#extra-response-body').textContent,/조건에 맞는/);click('[data-extra-response="ready"]');
response.value='error';fire(response,'change');click('[data-extra-response="loading"]');assert.equal($('#extra-response-body').getAttribute('aria-busy'),'true');click('[data-extra-response="loading"]');await pause(960);assert.match($('#extra-response-status').textContent,/결과 2개/);assert.equal(d.activeElement.id,'extra-response-ready');
response.value='loading';fire(response,'change');assert.ok($('#extra-response-body .sol-skeleton'));response.value='denied';fire(response,'change');await pause(960);assert.match($('#extra-response-status').textContent,/접근 불가/);
response.value='loading';fire(response,'change');await route('component');await pause(960);assert.equal(d.activeElement.tagName,'H1','Unmount cancels stale response focus');
assert.equal(fileDrag(d.body,'drop',[jpg]).defaultPrevented,false,'The file navigation guard is removed when the file demo unmounts');

// Overflow previews are measurable fixtures; layout itself is checked in Chrome.
const overflowFixture=d.createElement('section');overflowFixture.innerHTML='<div class="sol-record-list"><span class="sol-record-title">가상의 아주 긴 제목 전체 내용</span></div><span id="overflow-existing-help">기존 설명</span><a href="#kept-action" aria-describedby="overflow-existing-help"><span class="sol-ellipsis">기존 이동 제목 전체 내용</span></a><textarea>본문은 자르지 않음</textarea>';d.body.append(overflowFixture);
for(const node of overflowFixture.querySelectorAll('.sol-record-title,.sol-ellipsis')){Object.defineProperty(node,'scrollWidth',{value:400,configurable:true});Object.defineProperty(node,'clientWidth',{value:100,configurable:true});node.getClientRects=()=>[{width:100}];}
const overflowCleanup=w.mountOverflowText(overflowFixture),preview=overflowFixture.querySelector('.sol-title-preview');assert.ok(preview);assert.equal(overflowFixture.querySelectorAll('button').length,1);assert.equal(preview.hasAttribute('title'),false);preview.focus();const overflowTip=d.querySelector('.sol-overflow-tooltip:not([hidden])');assert.ok(overflowTip);assert.match(overflowTip.textContent,/전체 내용/);assert.ok(preview.getAttribute('aria-describedby').includes(overflowTip.id));
overflowFixture.querySelector('.sol-record-title').textContent='갱신된 긴 제목 전체 내용';overflowCleanup.refresh();assert.match(preview.getAttribute('aria-label'),/갱신된 긴 제목/);assert.match(overflowTip.textContent,/갱신된 긴 제목/);preview.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(overflowTip.hidden,true);
preview.click();const fullPanel=d.querySelector('.sol-full-text-dialog[open]');assert.ok(fullPanel);assert.match(fullPanel.querySelector('p').textContent,/전체 내용/);fullPanel.querySelector('button').click();assert.equal(d.activeElement,preview);
const preserved=overflowFixture.querySelector('a');let originalAction=0;preserved.addEventListener('click',e=>{e.preventDefault();originalAction++;});preserved.focus();assert.ok(preserved.getAttribute('aria-describedby').includes('overflow-existing-help'));preserved.click();assert.equal(originalAction,1);assert.equal(d.querySelector('.sol-full-text-dialog[open]'),null);
assert.equal(overflowFixture.querySelector('textarea').value,'본문은 자르지 않음');overflowCleanup();assert.equal(overflowFixture.querySelector('.sol-title-preview'),null);assert.equal(preserved.getAttribute('aria-describedby'),'overflow-existing-help');overflowFixture.remove();
console.log('PASS: overflow tooltip focus/Escape, native full-text dialog/focus return, touch click, original link action/description and cleanup; textareas excluded.');

await expansionChecks({w,d,$,fire,click,route,integrity});
await recoveryChecks({w,d,$,fire,click,route,integrity});
{
 const fixture=d.createElement('section');fixture.innerHTML='<input id="extra-autocomplete"><div id="extra-autocomplete-menu" hidden><ul id="extra-autocomplete-list"></ul><p id="extra-autocomplete-status"></p><p id="extra-autocomplete-empty"></p><button id="extra-autocomplete-retry" hidden>retry</button></div><select id="extra-autocomplete-mode"><option value="local">local</option></select><button id="extra-autocomplete-toggle">toggle</button><button id="extra-autocomplete-clear">clear</button><p id="extra-autocomplete-result"></p>';d.body.append(fixture);const ctl=new w.AbortController();w.mountAsyncAutocomplete(fixture,{values:['<b>가상 분류</b>'],signal:ctl.signal});fire(fixture.querySelector('input'),'input');assert.equal(fixture.querySelector('li').textContent,'<b>가상 분류</b>');assert.equal(fixture.querySelector('li b'),null,'Injected category data is text, never markup');ctl.abort();fixture.remove();
}
assert.deepEqual(errors,[],'No runtime errors in the synthetic DOM');
dom.window.close();
console.log('PASS: 6 routes, internal anchors/ARIA IDs, route focus, token search/copy, theme/mode/density; 50 canonical S references, default Examples/Sample Code/API panels, Prism/plain-SFC copy, compatible component anchors and same-page back/forward without preview remount.');
console.log('PASS: form validation/failure/recovery/duplicate guard/reset, search/filter/empty/failure/retry/stale response, comparison, first-use state, dialog open/close wiring.');
console.log('PASS: Core pattern table/list selection/filter/sort/page combinations and shared detail panel, dates, file rejection/removal/reselection, IME combobox, response states and cleanup. Component behavior is exercised by installed Vue runtime suites.');
console.log('PASS: finite token-based motion, rapid goal reversal/stale completion, route persistence, visibility/reduced-motion cancellation; 5 semantic UI palettes and singleton nonintrusive snackbar; unified single/range picker complete-value contract, draft/cancel/reverse/same-day, direct errors/clear/mode switch, reusable instances/API/events, calendar leap/bounds/navigation/selection/focus return.');
console.log('PASS: shared file picker/drop pipeline, nested drag state, extension/MIME metadata, unknown MIME, rejection/removal/reselection, outside-drop navigation guard, text dragging and unmount cleanup.');
console.log('LIMIT: no browser rendering, CSS layout, physical keyboard, native modal trap, or screen reader verification.');

/* Synthetic DOM checks. These do not replace a browser, layout, native keyboard, or screen reader review. */
import {JSDOM, VirtualConsole} from 'jsdom';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const html=await readFile(new URL('../docs/index.html',import.meta.url),'utf8');
const app=(await readFile(new URL('../docs/app.js',import.meta.url),'utf8')).replace("import tokens from './token-data.js';",`const tokens = ${await readFile(new URL('../tokens.json',import.meta.url),'utf8')};`);
const virtualConsole=new VirtualConsole();
const errors=[];
virtualConsole.on('jsdomError',error=>errors.push(error.message));
const dom=new JSDOM(html,{url:'https://example.test/solyi-design-system/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole});
const {window:w}=dom;const d=w.document;
w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
let clipboard='';
Object.defineProperty(w.navigator,'clipboard',{value:{writeText:async value=>{clipboard=value;}}});
w.eval(app);
const $=selector=>{const result=d.querySelector(selector);assert.ok(result,selector);return result;};
const fire=(element,type)=>element.dispatchEvent(new w.Event(type,{bubbles:true,cancelable:true}));
const click=selector=>$(selector).click();
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const route=async name=>{w.location.hash=name;await pause(20);};
function integrity() {
  const ids=[...d.querySelectorAll('[id]')].map(element=>element.id);
  assert.equal(ids.length,new Set(ids).size,'No duplicate IDs');
  for(const element of d.querySelectorAll('[aria-describedby],[aria-labelledby]')) {
    for(const attr of ['aria-describedby','aria-labelledby']) for(const id of (element.getAttribute(attr)||'').split(' ').filter(Boolean)) assert.ok(d.getElementById(id),`ARIA ${id} exists`);
  }
  for(const a of d.querySelectorAll('a[href^="#"]')) {
    const hash=a.getAttribute('href').slice(1);
    if(hash==='main-content')continue;
    const [page,anchor]=hash.split('/');
    assert.ok(['overview','style','component','pattern','theme'].includes(page),`Known page ${page}`);
    if(anchor && page===w.location.hash.slice(1).split('/')[0]) assert.ok(d.getElementById(anchor),`Section ${anchor} exists`);
  }
}
for(const name of ['overview','style','component','pattern','theme']) {
  await route(name);integrity();assert.equal(d.querySelectorAll('main h1').length,1);
  assert.equal($('[aria-current="page"]').dataset.route,name);
  assert.equal(d.activeElement.tagName,'H1','Route focus');
}
await route('overview');
click('[data-task]:not(:checked)');assert.equal($('#task-progress').value,2);
await route('style');
$('#token-search').value='danger';fire($('#token-search'),'input');assert.equal(d.querySelectorAll('.token').length,2);
click('.token');await pause(10);assert.match(clipboard,/--sol-color-danger/);
click('#mode-toggle');assert.equal(d.documentElement.dataset.mode,'dark');
assert.ok($('#contrast-results').textContent.includes('dark'));
$('#token-search').value='no-such-token';fire($('#token-search'),'input');assert.match($('#token-grid').textContent,/일치하는 토큰/);
await route('component');
click('[data-action="loading-demo"]');click('[data-action="loading-demo"]');
assert.equal($('[data-action="loading-demo"]').getAttribute('aria-busy'),'true');
await pause(760);assert.equal($('[data-action="loading-demo"]').hasAttribute('aria-busy'),false);
assert.match($('#button-feedback').textContent,/마쳤/);
const noticeRetry=$('[data-action="retry-feedback"]');noticeRetry.focus();noticeRetry.click();noticeRetry.click();
assert.equal(noticeRetry.getAttribute('aria-busy'),'true','Notice retry prevents duplicate execution while loading');
await pause(760);assert.equal(noticeRetry.hasAttribute('aria-busy'),false);assert.match($('#retry-result').textContent,/성공/);
assert.equal(d.activeElement,noticeRetry,'Notice retry retains keyboard focus after completion');
click('[data-copy-snippet]');await pause(10);assert.match(clipboard,/sol-button/);
// Only the app's dialog opening and return-focus wiring is checked; no native modal trap is simulated.
const dialog=$('#detail-dialog');dialog.showModal=function(){this.setAttribute('open','');};dialog.close=function(){this.removeAttribute('open');fire(this,'close');};
click('[data-open-detail]');assert.equal(dialog.open,true);click('#dialog-close');assert.equal(dialog.open,false);assert.equal(d.activeElement.dataset.openDetail,'0');
await route('pattern');
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
$('#project-filter').value='초안';fire($('#project-filter'),'change');assert.equal(d.querySelectorAll('#project-results .project-row').length,1);
click('[data-action="search-failure"]');assert.equal($('#project-results').getAttribute('aria-busy'),'true');await pause(760);assert.match($('#project-results').textContent,/불러오지 못/);
click('[data-action="search-retry"]');assert.equal(d.querySelectorAll('#project-results .project-row').length,1,'Filter retained on retry');
$('#project-filter').value='all';fire($('#project-filter'),'change');
click('[data-action="search-failure"]');$('#project-search').value='정원';fire($('#project-search'),'input');await pause(760);assert.match($('#project-results').textContent,/작은 정원/);assert.ok(!$('#project-results').textContent.includes('불러오지 못'),'New query cancels stale failure');
const radio=$('input[name="compare"][value="차근차근 정리"]');radio.checked=true;fire(radio,'change');assert.match($('#compare-result').textContent,/차근차근/);
click('[data-action="empty-add"]');assert.match($('#empty-demo').textContent,/오늘의 첫 관찰/);assert.equal(d.activeElement.dataset.action,'empty-reset');
click('[data-action="empty-reset"]');assert.match($('#empty-demo').textContent,/아직 기록/);assert.equal(d.activeElement.dataset.action,'empty-add');
await route('theme');
click('[data-set-theme="sage"]');assert.equal(d.documentElement.dataset.theme,'sage');assert.equal($('[data-set-theme="sage"]').getAttribute('aria-pressed'),'true');
const density=$('input[name="density"][value="compact"]');density.checked=true;fire(density,'change');assert.equal(d.documentElement.dataset.density,'compact');
assert.equal(JSON.parse(w.localStorage.getItem('solyi-ds-prefs')).density,'compact');
await route('theme/adoption');assert.equal(d.activeElement.id,'adoption-title');integrity();
await route('style');assert.match($('#token-count').textContent,/Quiet sage/);
assert.deepEqual(errors,[],'No runtime errors in the synthetic DOM');
dom.window.close();
console.log('PASS: 5 routes, internal anchors/ARIA IDs, route focus, token search/copy, example copy, theme/mode/density.');
console.log('PASS: form validation/failure/recovery/duplicate guard/reset, search/filter/empty/failure/retry/stale response, comparison, first-use state, dialog open/close wiring.');
console.log('LIMIT: no browser rendering, CSS layout, physical keyboard, native modal trap, or screen reader verification.');

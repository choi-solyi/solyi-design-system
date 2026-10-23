import assert from 'node:assert/strict';
import {solIconNames} from '../site/icons.js';
export async function expansionChecks({w,d,$,fire,click,route,integrity}) {
  const key=(el,key)=>el.dispatchEvent(new w.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true}));
  await route('style');integrity();
  assert.equal(d.querySelectorAll('.sol-icon-grid svg').length,solIconNames.length);
  for(const icon of d.querySelectorAll('.sol-icon-grid svg')){assert.equal(icon.getAttribute('aria-hidden'),'true');assert.equal(icon.getAttribute('focusable'),'false');}
  click('#foundation-icon-action');assert.match($('#foundation-icon-result').textContent,/확인/);
  $('#foundation-copy').value='empty';fire($('#foundation-copy'),'change');assert.match($('#foundation-copy-output').textContent,/조건에 맞는/);
  $('#foundation-copy').value='success';fire($('#foundation-copy'),'change');assert.match($('#foundation-copy-output').textContent,/시뮬레이션/);
  for(const theme of ['violet','sage','sand'])for(const mode of ['light','dark']){d.documentElement.dataset.theme=theme;d.documentElement.dataset.mode=mode;assert.ok($('#icons'));}
  console.log('PASS: foundation icon labels/sizes/actions, role layers and copy-state simulator.');
  await route('pattern');integrity();
  click('[data-layout-row="books"]');assert.match($('#layout-preview').textContent,/저녁 책장/);
  $('#layout-query').value='없음';fire($('#layout-query'),'input');assert.match($('#layout-count').textContent,/0개/);assert.match($('#layout-records').textContent,/없어요/);
  click('[data-layout-view="settings"]');assert.equal($('#layout-list').hidden,true);assert.equal($('#layout-settings').hidden,false);
  $('#layout-name').value=' ';fire($('#layout-settings'),'submit');assert.equal($('#layout-name').getAttribute('aria-invalid'),'true');assert.equal(d.activeElement.id,'layout-name');
  $('#layout-name').value='가상 새 공간';$('#layout-summary').checked=false;fire($('#layout-settings'),'submit');assert.match($('.sol-app-header').textContent,/가상 새 공간/);
  $('#layout-query').value='';fire($('#layout-query'),'input');assert.equal(d.querySelectorAll('#layout-records .sol-hint').length,0);
  click('[data-layout-view="detail"]');assert.equal($('#layout-settings').hidden,true);assert.match($('#layout-detail').textContent,/저녁 책장/);assert.equal(d.activeElement.id,'layout-view-title');
  const mobile=$('.sol-app-mobile-nav');mobile.open=true;key(mobile,'Escape');assert.equal(mobile.open,false);assert.equal(d.activeElement.tagName,'SUMMARY');
  console.log('PASS: settings/list/detail navigation, local save/error, selection/search/empty, mobile disclosure dismissal.');
  // Retired Component-only native input/tab/menu demos are covered by installed
  // vue-extended-runtime-check, vue-expansion-runtime-check and vue-recipes-runtime-check.
  await route('pattern');integrity();click('#workflow-edit');assert.equal(d.activeElement.id,'workflow-edit-title');
  $('#workflow-title-input').value=' ';fire($('#workflow-form'),'submit');assert.equal($('#workflow-title-input').getAttribute('aria-invalid'),'true');
  $('#workflow-title-input').value='가상 수정 제목';fire($('#workflow-title-input'),'input');
  const unload=new w.Event('beforeunload',{cancelable:true});w.dispatchEvent(unload);assert.equal(unload.defaultPrevented,true);
  await route('style');assert.equal($('#workflow-dialog').open,true);assert.match($('#workflow-dialog-title').textContent,/저장하지/);assert.match(w.location.hash,/pattern/);
  click('#workflow-dialog-cancel');await Promise.resolve();assert.equal($('#workflow-form').hidden,false);assert.equal($('#workflow-title-input').value,'가상 수정 제목');
  click('#workflow-leave');assert.equal($('#workflow-dialog').open,true);click('#workflow-dialog-confirm');await new Promise(r=>setTimeout(r,0));assert.equal($('#workflow-form').hidden,true);assert.equal($('#workflow-record-title').textContent,'작은 정원 관찰');
  click('#workflow-edit');$('#workflow-title-input').value='저장한 가상 기록';fire($('#workflow-title-input'),'input');fire($('#workflow-form'),'submit');assert.equal($('#workflow-record-title').textContent,'저장한 가상 기록');
  click('#workflow-delete');assert.match($('#workflow-dialog-description').textContent,/메모 2개/);click('#workflow-dialog-cancel');await Promise.resolve();assert.equal($('#workflow-read').hidden,false);
  click('#workflow-delete');click('#workflow-dialog-confirm');await new Promise(r=>setTimeout(r,0));assert.equal($('#workflow-read').hidden,true);assert.equal($('#workflow-deleted').hidden,false);assert.equal(d.activeElement.id,'workflow-undo');click('#workflow-undo');assert.equal($('#workflow-record-title').textContent,'저장한 가상 기록');assert.equal(d.activeElement.id,'workflow-edit');
  click('#workflow-edit');$('#workflow-title-input').value='버릴 변경';fire($('#workflow-title-input'),'input');await route('style');click('#workflow-dialog-confirm');await new Promise(r=>setTimeout(r,10));assert.match(w.location.hash,/style/);assert.ok($('#icons'));integrity();
  console.log('PASS: inline draft/save/error/cancel, unsaved route/unload contract, discard/cancel, deletion impact/cancel and persistent undo restoration/focus.');
  // Retired native avatar/steps/time/chart/tree galleries now use their real S APIs.
  // Replacement behavior coverage: vue-dedicated-runtime-check (avatar/step/chart),
  // vue-extended-runtime-check (time), progress-runtime-check and
  // vue-recipes-runtime-check (all actual SFCs, including tree keys/selection).
  for(const theme of ['violet','sage','sand'])for(const mode of ['light','dark']){d.documentElement.dataset.theme=theme;d.documentElement.dataset.mode=mode;for(const routeName of ['style','component','pattern','start','releases','licensing']){await route(routeName);integrity();assert.equal(d.querySelectorAll('main h1').length,1);}}
  await route('start');assert.match($('#starter').textContent,/4.3.0/);assert.ok($('#starter a[href="./starter/"]').textContent.trim().length>0);await route('theme/versioning');assert.ok($('#changelog'));assert.equal(d.querySelector('#versioning'),null);
  console.log('PASS: all new route IDs/ARIA/navigation under 3 themes × 2 modes; starter/version adoption documents.');
}

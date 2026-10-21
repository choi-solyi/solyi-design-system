import assert from 'node:assert/strict';
export async function expansionChecks({w,d,$,fire,click,route,integrity}) {
  const key=(el,key)=>el.dispatchEvent(new w.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true}));
  await route('style');integrity();
  assert.equal(d.querySelectorAll('.sol-icon-grid svg').length,17);
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
}

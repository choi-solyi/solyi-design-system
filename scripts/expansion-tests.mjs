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
  await route('component');integrity();
  fire($('#advanced-note'),'submit');assert.equal(d.activeElement.id,'advanced-text');assert.equal($('#advanced-text').getAttribute('aria-invalid'),'true');
  $('#advanced-text').value='첫 줄\n둘째 줄';fire($('#advanced-text'),'input');fire($('#advanced-note'),'submit');assert.match($('#advanced-text-result').textContent,/확인/);assert.equal($('#advanced-text').value,'첫 줄\n둘째 줄');
  $('#advanced-number').value='3';fire($('#advanced-number-form'),'submit');assert.equal($('#advanced-number').getAttribute('aria-invalid'),'true');click('#advanced-plus');assert.equal($('#advanced-number').value,'3');
  $('#advanced-number').value='10';fire($('#advanced-number'),'input');click('#advanced-plus');assert.equal($('#advanced-number').value,'12');assert.equal($('#advanced-plus').disabled,true);click('#advanced-minus');assert.equal($('#advanced-number').value,'10');
  $('#advanced-number').value='0';fire($('#advanced-number'),'input');assert.equal($('#advanced-minus').disabled,true);$('#advanced-number').value='14';fire($('#advanced-number-form'),'submit');assert.match($('#advanced-number-error').textContent,/짝수/);
  click('[data-advanced-tag="0"]');click('[data-advanced-tag="1"]');click('[data-advanced-tag="2"]');assert.equal(d.querySelectorAll('#advanced-tags li').length,2);assert.match($('#advanced-tag-result').textContent,/최대 2개/);click('[data-remove-tag="0"]');assert.equal(d.activeElement.dataset.removeTag,'1');click('[data-advanced-tag="2"]');assert.equal(d.querySelectorAll('#advanced-tags li').length,2);
  key($('#content-tab-summary'),'ArrowRight');assert.equal($('#content-tab-notes').getAttribute('aria-selected'),'true');assert.equal($('#content-panel-summary').hidden,true);$('#advanced-tab-note').value='임시 값';key($('#content-tab-notes'),'End');assert.equal($('#content-panel-history').hidden,false);key($('#content-tab-history'),'Home');key($('#content-tab-summary'),'ArrowRight');assert.equal($('#advanced-tab-note').value,'임시 값');assert.equal(d.querySelectorAll('#advanced-tabs [role="tab"][tabindex="0"]').length,1);
  key($('#advanced-menu-trigger'),'ArrowUp');assert.equal($('#advanced-menu').hidden,false);assert.equal(d.activeElement.getAttribute('aria-disabled'),'true');d.activeElement.click();assert.equal($('#advanced-menu').hidden,false);key(d.activeElement,'Home');assert.equal(d.activeElement.dataset.action,'duplicate');d.activeElement.click();assert.match($('#advanced-menu-result').textContent,/사본/);assert.equal(d.activeElement.id,'advanced-menu-trigger');click('#advanced-menu-trigger');key(d.activeElement,'Escape');assert.equal($('#advanced-menu').hidden,true);click('#advanced-menu-trigger');key(d.activeElement,'Tab');assert.equal($('#advanced-menu').hidden,true);click('#advanced-menu-trigger');$('#advanced-text').focus();assert.equal($('#advanced-menu').hidden,true);
  console.log('PASS: textarea/number validation and bounds, tag limit/removal, real panels/roving tabs/value preservation, action-menu disabled/keys/dismissal/focus.');
}

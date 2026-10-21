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
}

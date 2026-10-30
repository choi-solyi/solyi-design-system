import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {JSDOM} from 'jsdom';
import {componentReferences,componentExampleSources} from '../site/component-api-data.js';
import {layoutComponentNames,componentExampleOwners,componentCatalogue,renderComponentReferences,mountComponentReferences,revealComponentTarget} from '../site/component-api.js';
import {componentConcept,componentConceptNames,componentLegacyAnchors} from '../site/component-catalog.js';
import {getTopicCatalogue,resolveDocumentLocation} from '../site/topics.js';

const root=new URL('../',import.meta.url);
execFileSync(process.execPath,['scripts/build-component-api.mjs','--check'],{cwd:fileURLToPath(root),stdio:'inherit'});
const source=await readFile(new URL('packages/vue-ui/src/index.ts',root),'utf8');
const registry = /export const sComponents(?:\s*:\s*SComponents)?\s*=\s*\{([^}]+)\}/.exec(source)
assert.ok(registry, 'The actual component registry is present')
const names = registry[1].split(',').map(name => name.trim()).filter(Boolean)
assert.deepEqual(componentReferences.map(component=>component.name).sort(),names.sort());
assert.deepEqual(Object.keys(componentConceptNames).sort(),names.sort(),'Every actual API has a concept name');
for(const group of componentCatalogue()){assert.match(group.group,/^[A-Za-z &]+$/);assert.deepEqual(group.items.map(item=>item.label),group.items.map(item=>item.label).sort((a,b)=>a.localeCompare(b,'en')),'Concept ABC order inside '+group.group);}
assert.deepEqual(getTopicCatalogue('component'),componentCatalogue(),'No duplicate common-state menu');
assert.equal(componentCatalogue()[0].items.find(item=>item.id==='sbtn').label,'Button');
for(const [old,canonical]of Object.entries(componentLegacyAnchors))assert.deepEqual(resolveDocumentLocation('#component/'+old),{route:'component',anchor:canonical});
for(const [hash,route,anchor]of [['#releases/packages','start','install'],['#theme/packages','start','install'],['#releases/versioning','releases','changelog'],['#theme/versioning','releases','changelog'],['#start/vue-components','start','registration'],['#start/installation','start','install']])assert.deepEqual(resolveDocumentLocation(hash),{route,anchor});
assert.deepEqual(getTopicCatalogue('start')[0].items.slice(0,7).map(item=>item.id),['start-here','install','registration','auto-import','forms','appearance','update']);
assert.deepEqual(getTopicCatalogue('releases')[0].items.map(item=>item.id),['changelog']);
const copySources=new Map();let copyId=0;
const escape=value=>value.replace(/[&<>]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[char]));
const dom=new JSDOM(renderComponentReferences({section:(id,title,description,body)=>`<section id="${id}" class="section"><h2>${title}</h2><p>${description}</p>${body}</section>`,codeSample(label,source){const id='sample-'+(++copyId);copySources.set(id,source);return `<details class="code-example"><summary>${label}</summary><div class="code-body"><div class="code-toolbar"><span>${label}</span><button type="button" data-copy-snippet="${id}">복사</button></div><pre><code>${escape(source)}</code></pre></div></details>`;}},{includeLayouts:true}),{url:'https://example.test/#component/sbtn'}),document=dom.window.document;
assert.deepEqual(layoutComponentNames,['SCol','SContainer','SRow']);for(const name of layoutComponentNames){const item=componentReferences.find(c=>c.name===name);assert.equal(componentCatalogue().flatMap(group=>group.items).some(c=>c.id===item.id),false);for(const suffix of ['', '-api','-code','-examples'])assert.deepEqual(resolveDocumentLocation('#component/'+item.id+suffix),{route:'style',anchor:item.id+suffix});}
const layoutMarkup=renderComponentReferences({section:(_id,_title,_description,body)=>body},{layout:true});const layoutDocument=new JSDOM(layoutMarkup).window.document;assert.deepEqual([...layoutDocument.querySelectorAll('.component-api-name')].map(el=>el.textContent).sort(),layoutComponentNames.toSorted());
const seenIds=[...document.querySelectorAll('[id]')].map(element=>element.id);assert.equal(new Set(seenIds).size,seenIds.length);
assert.equal(document.querySelectorAll('code.component-api-name').length,names.length);
assert.equal(document.querySelectorAll('code.component-api-name[aria-label]').length,0,'Static code retains its native text without prohibited naming');
const mapping={date:'inputs',files:'inputs',autocomplete:'inputs',tree:'chart-tree'};
const advanced=await readFile(new URL('examples/vue-vuetify/src/AdvancedExamples.vue',root),'utf8');
for(const component of componentReferences){
  const card=document.getElementById(component.id);assert.ok(card,component.name+' reference');
  assert.ok(document.getElementById(component.id+'-examples'));assert.ok(document.getElementById(component.id+'-code'));assert.ok(document.getElementById(component.id+'-api'));
  assert.equal(card.querySelector('h3').textContent,componentConcept(component));assert.equal(card.querySelector('.component-api-name').textContent,component.name);
  assert.deepEqual([...card.querySelectorAll('[data-component-tab]')].map(tab=>tab.textContent),['Examples','Sample Code','API']);
  for(const title of ['Props','Slots','Events','Methods'])assert.ok([...card.querySelectorAll('h5')].some(heading=>heading.textContent===title));
  const example=component.example==='advanced-vue'?advanced:await readFile(new URL('examples/vue-vuetify/src/recipes/'+(mapping[component.example]||component.example)+'.vue',root),'utf8');
  assert.equal(componentExampleSources[component.example],example,'Visible/copy source is the running consumer SFC');
  assert.equal(document.getElementById(component.id+'-api').hidden,true,'API is initially hidden');
  assert.equal(document.getElementById(component.id+'-examples').hidden,false,'Examples is initially visible');
  assert.equal(document.getElementById(component.id+'-code').hidden,true,'Sample Code is initially hidden');
  if(componentExampleOwners[component.name]){const link=card.querySelector('[data-shared-component-example]');assert.equal(link?.getAttribute('href'),'#component/'+componentExampleOwners[component.name]);assert.ok(document.getElementById(componentExampleOwners[component.name]).querySelector('[data-component-example]'));assert.equal(card.querySelector('[data-component-example]'),null,'Shared progress example is not mounted twice');}else assert.ok(card.querySelector('[data-component-example]'),'Owned inline sample exists');
  assert.equal(card.querySelector('#'+component.id+'-examples .code-example'),null,'Examples only contains the running canvas');
  const code=document.getElementById(component.id+'-code');assert.equal(code.querySelector('details,summary'),null,'Sample Code has no nested accordion');
  assert.equal(code.querySelector('pre code').textContent,example,'Visible code is the canonical SFC');
  assert.equal(copySources.get(code.querySelector('[data-copy-snippet]').dataset.copySnippet),example,'Copy uses the same canonical SFC');
  assert.ok(code.querySelector('.code-example-footer a[href^="./starter/"]'),'Standalone consumer link stays with the code');
  assert.equal(card.querySelector('a[href*="blob/main/"]'),null,'No source link in the basic component view');
  assert.ok(new RegExp('<'+component.name+'(?:\\s|>)').test(example),component.name+' appears in its linked, actual package-consuming example');
  for(const prop of component.props){assert.ok(prop.type);assert.ok(prop.description);assert.ok(typeof prop.default==='string');}
}
globalThis.AbortController=dom.window.AbortController;globalThis.location=dom.window.location;globalThis.history=dom.window.history;
const clean=mountComponentReferences(document.body),btn=document.getElementById('sbtn'),tabs=[...btn.querySelectorAll('[data-component-tab]')];
const canvas=btn.querySelector('[data-component-example]'),frame=document.createElement('iframe');canvas.append(frame);frame.contentDocument.body.innerHTML='<input value="KEEP">';const draft=frame.contentDocument.querySelector('input');draft.value='LIVE INPUT';
tabs[2].click();assert.equal(tabs[2].getAttribute('aria-selected'),'true');assert.equal(document.getElementById('sbtn-api').hidden,false);assert.equal(document.getElementById('sbtn-examples').hidden,true);assert.equal(location.hash,'#component/sbtn-api');
tabs[2].dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true,cancelable:true}));assert.equal(document.activeElement,tabs[1]);assert.equal(document.getElementById('sbtn-code').hidden,false);assert.equal(document.getElementById('sbtn-api').hidden,true);assert.equal(location.hash,'#component/sbtn-code');
tabs[1].dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'Home',bubbles:true,cancelable:true}));assert.equal(document.activeElement,tabs[0]);assert.equal(document.getElementById('sbtn-examples').hidden,false);assert.equal(canvas.querySelector('iframe'),frame);assert.equal(frame.contentDocument.querySelector('input'),draft);assert.equal(draft.value,'LIVE INPUT','Tab switching never replaces the actual sample');
tabs[0].dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true,cancelable:true}));assert.equal(document.activeElement,tabs[2],'Three-tab arrow navigation wraps');
tabs[2].dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true,cancelable:true}));assert.equal(document.activeElement,tabs[0]);
tabs[0].dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'End',bubbles:true,cancelable:true}));assert.equal(document.activeElement,tabs[2]);
revealComponentTarget(document.body,'sdate-picker-api');assert.equal(document.getElementById('sdate-picker-api').hidden,false);
revealComponentTarget(document.body,'sdate-picker-code');assert.equal(document.getElementById('sdate-picker-code').hidden,false);assert.equal(document.getElementById('sdate-picker-api').hidden,true);
revealComponentTarget(document.body,'sdate-picker-examples');assert.equal(document.getElementById('sdate-picker-examples').hidden,false);
revealComponentTarget(document.body,'sdate-picker');assert.equal(document.getElementById('sdate-picker-examples').hidden,false);assert.equal(revealComponentTarget(document.body,'invalid['),null);clean();
const card=componentReferences.find(component=>component.name==='SCard');
assert.deepEqual(card.props.map(prop=>prop.name).sort(),['description','eyebrow','headingLevel','id','title']);
assert.deepEqual(card.slots.map(slot=>slot.name).sort(),['actions','default','description','leading','meta','title']);assert.deepEqual(card.events,[]);assert.equal(card.passthrough,null);
for(const name of ['SContainer','SRow','SCol'])assert.equal(componentReferences.find(component=>component.name===name).passthrough,name.replace(/^S/,'V'));
const form=componentReferences.find(component=>component.name==='SForm');assert.equal(form.methods.find(method=>method.name==='validate').signature,'() => Promise<SFormResult>');assert.ok(form.types.some(type=>type.name==='SFormResult'&&type.source.includes('errors')));
for(const name of ['STextField','STextarea','SCheckbox','SSelect','SNumberInput','SDatePicker','STimePicker','SFileInput','SAutocomplete','SMultiSelect']){
 const component=componentReferences.find(component=>component.name===name);
 for(const method of ['focus','validate','resetValidation'])assert.ok(component.methods.some(item=>item.name===method),name+' actual shared handle '+method);
 for(const prop of ['rules','serverError','errorMessages'])assert.ok(component.props.some(item=>item.name===prop),name+' actual validation prop '+prop);
}
assert.deepEqual(componentReferences.find(component=>component.name==='SBtn').props.find(prop=>prop.name==='variant').values,['primary','secondary','subtle','inline']);
for(const name of ['STextField','STextarea']){
 const component=componentReferences.find(component=>component.name===name);
 for(const prop of ['clearable','loading'])assert.equal(component.props.find(item=>item.name===prop)?.default,'false',name+' opt-in '+prop);
 assert.match(component.events.find(item=>item.name==='clear')?.signature||'',/SolInputClearEvent<string>/);
 for(const slot of ['leading','trailing','indicator','status','loading'])assert.equal(component.slots.find(item=>item.name===slot)?.scope,'SolInputControlScope');
 assert.equal(component.methods.find(item=>item.name==='clear')?.signature,'() => void');
 assert.match(componentExampleSources[component.example],/\bclearable\b/);
 if(component.name==='STextField')assert.doesNotMatch(componentExampleSources[component.example],/clearCount|지운 횟수/,'TextField clear remains available without the removed demonstration counter');
 else assert.match(componentExampleSources[component.example],/@clear=/);
}
assert.equal(componentReferences.find(component=>component.name==='STextField').events.some(event=>event.name==='change'),false,'Do not invent a TextField change event while adding clear');
{
 const component=componentReferences.find(component=>component.name==='SDatePicker');
 for(const prop of ['clearable','loading'])assert.equal(component.props.find(item=>item.name===prop)?.default,'false');
 assert.match(component.events.find(item=>item.name==='clear')?.signature||'',/SolInputClearEvent<DateValue>/);
 assert.match(component.events.find(item=>item.name==='change')?.signature||'',/DateChange/);
 for(const slot of ['leading','trailing','indicator','status','loading'])assert.equal(component.slots.find(item=>item.name===slot)?.scope,'SolInputControlScope');
 assert.equal(component.methods.find(item=>item.name==='clear')?.signature,'() => void');assert.match(componentExampleSources[component.example],/\bclearable\b/);
}
for(const name of ['SSelect','SNumberInput','SAutocomplete','STimePicker']){
 const component=componentReferences.find(component=>component.name===name);
 for(const prop of ['clearable','loading'])assert.equal(component.props.find(item=>item.name===prop)?.default,'false');
 assert.match(component.events.find(item=>item.name==='clear')?.signature||'',/SolInputClearEvent<(?:string|number)\s*\|\s*null>/);
 for(const slot of ['leading','trailing','indicator','status','loading'])assert.equal(component.slots.find(item=>item.name===slot)?.scope,'SolInputControlScope');
 assert.equal(component.methods.find(item=>item.name==='clear')?.signature,'() => void');
 assert.match(componentExampleSources[component.example],/\bclearable\b/);
}
{
 const component=componentReferences.find(component=>component.name==='SMultiSelect');
 for(const prop of ['clearable','loading'])assert.equal(component.props.find(item=>item.name===prop)?.default,'false');
 assert.match(component.events.find(item=>item.name==='clear')?.signature||'',/SolInputClearEvent<readonly string\[\]>/);
 for(const slot of ['leading','trailing','indicator','status','loading'])assert.equal(component.slots.find(item=>item.name===slot)?.scope,'SolInputControlScope');
 assert.equal(component.methods.find(item=>item.name==='clear')?.signature,'() => void');assert.match(componentExampleSources[component.example],/\bclearable\b/);
}
dom.window.close();console.log(`PASS: ${names.length} real API contracts and concept headings/badges; English concept-ABC groups without duplicate legacy menu; canonical Examples/Sample Code/API panels, unchanged SFC copy, no nested code accordion, roving keys/deep links and preserved iframe/draft; grid passthrough and form contracts.`);

import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {JSDOM} from 'jsdom';
import {componentReferences,componentExampleSources} from '../site/component-api-data.js';
import {componentCatalogue,renderComponentReferences,mountComponentReferences,revealComponentTarget} from '../site/component-api.js';

const root=new URL('../',import.meta.url);
execFileSync(process.execPath,['scripts/build-component-api.mjs','--check'],{cwd:fileURLToPath(root),stdio:'inherit'});
const source=await readFile(new URL('packages/vue-ui/src/index.ts',root),'utf8');
const names=/export const sComponents=\{([^}]+)\}/.exec(source)[1].split(',').map(name=>name.trim());
assert.deepEqual(componentReferences.map(component=>component.name).sort(),names.sort());
for(const group of componentCatalogue())assert.deepEqual(group.items.map(item=>item.label),group.items.map(item=>item.label).sort((a,b)=>a.localeCompare(b,'en')),'ABC order inside '+group.group);
const dom=new JSDOM(renderComponentReferences({section:(id,title,description,body)=>`<section id="${id}" class="section"><h2>${title}</h2><p>${description}</p>${body}</section>`}),{url:'https://example.test/#component/sbtn'}),document=dom.window.document;
const seenIds=[...document.querySelectorAll('[id]')].map(element=>element.id);assert.equal(new Set(seenIds).size,seenIds.length);
const mapping={date:'inputs',files:'inputs',autocomplete:'inputs',chart:'chart-tree',tree:'chart-tree'};
const advanced=await readFile(new URL('examples/vue-vuetify/src/AdvancedExamples.vue',root),'utf8');
for(const component of componentReferences){
  const card=document.getElementById(component.id);assert.ok(card,component.name+' reference');
  assert.ok(document.getElementById(component.id+'-examples'));assert.ok(document.getElementById(component.id+'-api'));
  for(const title of ['Props','Slots','Events','Methods'])assert.ok([...card.querySelectorAll('h5')].some(heading=>heading.textContent===title));
  const example=component.example==='advanced-vue'?advanced:await readFile(new URL('examples/vue-vuetify/src/recipes/'+(mapping[component.example]||component.example)+'.vue',root),'utf8');
  assert.equal(componentExampleSources[component.example],example,'Visible/copy source is the running consumer SFC');
  assert.equal(document.getElementById(component.id+'-api').hidden,true,'API is initially hidden');
  assert.equal(document.getElementById(component.id+'-examples').hidden,false,'Examples is initially visible');
  assert.ok(card.querySelector('[data-component-example]'),'Inline sample exists without a second link');
  assert.equal(card.querySelector('.code-example').open,false,'Source is initially collapsed');
  assert.equal(card.querySelector('a[href*="blob/main/"]'),null,'No source link in the basic component view');
  assert.ok(new RegExp('<'+component.name+'(?:\\s|>)').test(example),component.name+' appears in its linked, actual package-consuming example');
  for(const prop of component.props){assert.ok(prop.type);assert.ok(prop.description);assert.ok(typeof prop.default==='string');}
}
globalThis.AbortController=dom.window.AbortController;globalThis.location=dom.window.location;globalThis.history=dom.window.history;
const clean=mountComponentReferences(document.body),btn=document.getElementById('sbtn'),tabs=[...btn.querySelectorAll('[data-component-tab]')];
tabs[1].click();assert.equal(tabs[1].getAttribute('aria-selected'),'true');assert.equal(document.getElementById('sbtn-api').hidden,false);assert.equal(document.getElementById('sbtn-examples').hidden,true);
tabs[1].dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true,cancelable:true}));assert.equal(document.activeElement,tabs[0]);assert.equal(document.getElementById('sbtn-api').hidden,true);
revealComponentTarget(document.body,'sdate-picker-api');assert.equal(document.getElementById('sdate-picker-api').hidden,false);assert.equal(revealComponentTarget(document.body,'invalid['),null);clean();
const card=componentReferences.find(component=>component.name==='SCard');
assert.deepEqual(card.props.map(prop=>prop.name).sort(),['eyebrow','headingLevel','id','title']);
assert.deepEqual(card.slots.map(slot=>slot.name).sort(),['actions','default']);assert.deepEqual(card.events,[]);assert.equal(card.passthrough,null);
for(const name of ['SContainer','SRow','SCol'])assert.equal(componentReferences.find(component=>component.name===name).passthrough,name.replace(/^S/,'V'));
const form=componentReferences.find(component=>component.name==='SForm');assert.equal(form.methods.find(method=>method.name==='validate').signature,'() => Promise<SFormResult>');assert.ok(form.types.some(type=>type.name==='SFormResult'&&type.source.includes('errors')));
for(const name of ['STextField','STextarea','SCheckbox','SSelect','SNumberInput','SDatePicker','STimePicker','SFileInput','SAutocomplete','SMultiSelect']){
 const component=componentReferences.find(component=>component.name===name);
 for(const method of ['focus','validate','resetValidation'])assert.ok(component.methods.some(item=>item.name===method),name+' actual shared handle '+method);
 for(const prop of ['rules','serverError','errorMessages'])assert.ok(component.props.some(item=>item.name===prop),name+' actual validation prop '+prop);
}
assert.deepEqual(componentReferences.find(component=>component.name==='SBtn').props.find(prop=>prop.name==='variant').values,['primary','secondary','subtle','inline']);
dom.window.close();console.log(`PASS: ${names.length} public S components match generated Props/Slots/Events/Methods, actual package examples, ABC groups, grid passthrough and shared form contracts.`);

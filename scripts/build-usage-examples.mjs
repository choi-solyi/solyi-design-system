import {readFile,writeFile,readdir} from 'node:fs/promises';
import assert from 'node:assert/strict'
import { formatPublicSample } from './public-sample-format.mjs'
const root=new URL('../',import.meta.url),read=async path=>readFile(new URL(path,root),'utf8');
const inventory=JSON.parse(await read('usage-example-inventory.json'));
const ids=[...new Set(inventory.examples.filter(x=>x.recipe).map(x=>x.section))];
const recipes={};for(const id of ids){const record=inventory.examples.find(x=>x.section===id);const source=await read('examples/vue-vuetify/src/recipes/'+id+'.vue');assert.equal(source,await formatPublicSample(source,'vue'),id+': format the canonical public recipe before generating documentation');recipes[id]={route:record.route,label:record.title||record.label,source};}
const apiSource=await read('packages/vue-ui/src/index.ts');
const registry = /export const sComponents(?:\s*:\s*SComponents)?\s*=\s*\{([^}]+)\}/.exec(apiSource)
assert.ok(registry, 'The actual component registry is present')
const publicNames = registry[1].split(',').map(name => name.trim()).filter(Boolean)
const report={documentVersion:JSON.parse(await read('tokens.json')).version,componentCount:publicNames.length,components:publicNames,examples:ids.map(id=>{const recipe=recipes[id],components=[...new Set([...recipe.source.slice(recipe.source.indexOf('<template>')).matchAll(/<(S[A-Z]\w*)\b/g)].map(match=>match[1]))];for(const name of components)if(!publicNames.includes(name))throw Error('Unknown public component '+name+' in '+id);return {id,route:recipe.route,label:recipe.label,source:'examples/vue-vuetify/src/recipes/'+id+'.vue',registration:'global',components};}),scope:'Component exports are separate from app-state compositions. Core CSS/icon helpers and the document shell are not all independent Vue components.',testTargets:['scripts/vue-dedicated-runtime-check.mjs','scripts/vue-recipes-runtime-check.mjs','scripts/vue-preview-integration-check.mjs']};
await writeFile(new URL('vue-api-inventory.json',root),JSON.stringify(report,null,2)+'\n');
const header='// Generated from the standalone, typechecked document-recipes sources.\n';
await writeFile(new URL('site/vue-recipes-data.js',root),header+'export const vueRecipes='+JSON.stringify(recipes,null,2)+';\n');
await writeFile(new URL('examples/vue-vuetify/src/recipe-registry.ts',root),await formatPublicSample(ids.map((id,i)=>`import Recipe${i} from './recipes/${id}.vue'`).join('\n')+'\n\nexport const recipeComponents={'+ids.map((id,i)=>JSON.stringify(id)+':Recipe'+i).join(',')+'}\nexport const recipeLabels='+JSON.stringify(Object.fromEntries(ids.map(id=>[id,recipes[id].label])))+'\n','ts'));
const actual=(await readdir(new URL('examples/vue-vuetify/src/recipes/',root))).filter(f=>f.endsWith('.vue'));if(actual.length!==ids.length||ids.some(id=>!actual.includes(id+'.vue')))throw Error('Recipe inventory differs from actual files');
console.log(`Generated ${ids.length} canonical Vue recipes for documentation and the real consumer.`);

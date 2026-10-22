import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const base=new URL('../examples/vue-vuetify/',import.meta.url);
const starterHtml=await readFile(new URL('dist/index.html',base),'utf8');assert.match(starterHtml,/<meta\s+name="description"\s+content="[^"]+"/,'Published starter includes an informative meta description');
const pkg=JSON.parse(await readFile(new URL('package.json',base),'utf8')),lock=JSON.parse(await readFile(new URL('package-lock.json',base),'utf8'));
const packageVersions=Object.fromEntries(await Promise.all(['core','vue-ui'].map(async name=>[name,JSON.parse(await readFile(new URL('../../packages/'+name+'/package.json',base),'utf8')).version])));
assert.deepEqual(pkg.dependencies,{'@solyi/core':`file:../../artifacts/solyi-core-${packageVersions.core}.tgz`,'@solyi/vue-ui':`file:../../artifacts/solyi-vue-ui-${packageVersions['vue-ui']}.tgz`,vue:'3.5.44',vuetify:'4.3.0'});
assert.deepEqual(pkg.devDependencies,{vite:'8.3.4','@vitejs/plugin-vue':'6.0.10'});
for(const [name,entry] of Object.entries(lock.packages)){if(!name)continue;assert.ok(name.startsWith('node_modules/'),`No local project linkage ${name}`);assert.ok(!entry.link);if(entry.resolved){assert.ok(name.startsWith('node_modules/@solyi/')?entry.resolved.startsWith('file:')&&entry.resolved.endsWith('.tgz'):entry.resolved.startsWith('https://registry.npmjs.org/'),`Official registry or own tarball ${name}`);assert.match(entry.integrity,/^sha512-/,`Integrity ${name}`);}assert.ok(entry.license,`License recorded ${name}`);}
for(const name of ['tokens.css','tokens.json'])assert.deepEqual(await readFile(new URL(`node_modules/@solyi/core/dist/${name}`,base)),await readFile(new URL(`../docs/${name}`,import.meta.url)),`Installed Core shares generated ${name}`);
const notices=await readFile(new URL('THIRD-PARTY-NOTICES.txt',base),'utf8');for(const n of ['vue@3.5.44','vuetify@4.3.0','vite@8.3.4','@vitejs/plugin-vue@6.0.10'])assert.ok(notices.includes(n),`Original notice ${n}`);assert.ok(notices.includes('MIT License')||notices.includes('MIT LICENSE'));
assert.equal(notices,await readFile(new URL('dist/THIRD-PARTY-NOTICES.txt',base),'utf8'));
const source=(await Promise.all(['src/main.js','src/vuetify.js','src/App.vue','src/adapter.css'].map(name=>readFile(new URL(name,base),'utf8')))).join('\n');assert.ok(!/\bfetch\(|XMLHttpRequest|localStorage|FileReader|https?:\/\/(?!choi-solyi\.github\.io\/solyi-design-system\/)/.test(source),'No remote data or persistence in starter');
assert.ok(source.includes("from '@solyi/vue-ui'"));assert.ok(source.includes("from '@solyi/core'"));assert.ok(!source.includes("from './core/"));
console.log('PASS: actual fixed tarball starter dependencies/registry/integrities/license notices, installed shared Core and no remote data/persistence. Build and actual browser behavior are separate checks.');

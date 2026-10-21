import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const base=new URL('../examples/vue-vuetify/',import.meta.url);
const pkg=JSON.parse(await readFile(new URL('package.json',base),'utf8')),lock=JSON.parse(await readFile(new URL('package-lock.json',base),'utf8'));
assert.deepEqual(pkg.dependencies,{vue:'3.5.44',vuetify:'4.3.0'});
assert.deepEqual(pkg.devDependencies,{vite:'8.3.4','@vitejs/plugin-vue':'6.0.10'});
for(const [name,entry] of Object.entries(lock.packages)){if(!name)continue;assert.ok(name.startsWith('node_modules/'),`No local project linkage ${name}`);assert.ok(!entry.link);if(entry.resolved){assert.ok(entry.resolved.startsWith('https://registry.npmjs.org/'),`Official registry ${name}`);assert.match(entry.integrity,/^sha512-/,`Registry integrity ${name}`);}assert.ok(entry.license,`License recorded ${name}`);}
for(const name of ['tokens.css','tokens.json'])assert.deepEqual(await readFile(new URL(`src/core/${name}`,base)),await readFile(new URL(`../docs/${name}`,import.meta.url)),`Starter shares generated ${name}`);
const notices=await readFile(new URL('THIRD-PARTY-NOTICES.txt',base),'utf8');for(const n of ['vue@3.5.44','vuetify@4.3.0','vite@8.3.4','@vitejs/plugin-vue@6.0.10'])assert.ok(notices.includes(n),`Original notice ${n}`);assert.ok(notices.includes('MIT License')||notices.includes('MIT LICENSE'));
assert.equal(notices,await readFile(new URL('dist/THIRD-PARTY-NOTICES.txt',base),'utf8'));
const source=(await Promise.all(['src/main.js','src/App.vue','src/adapter.css'].map(name=>readFile(new URL(name,base),'utf8')))).join('\n');assert.ok(!/\bfetch\(|XMLHttpRequest|localStorage|FileReader|https?:\/\/(?!choi-solyi\.github\.io\/solyi-design-system\/)/.test(source),'No remote data or persistence in starter');
console.log('PASS: independent fixed starter dependencies/registry/integrities/license notices, shared Core snapshot and no remote data/persistence. Build and actual browser behavior are separate checks.');

import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {packageMetadata,packageTarball,releasePackage,historicalUiName} from './package-identity.mjs';
import {releaseCatalogue} from './releases.mjs';
const root=new URL('../',import.meta.url),read=file=>readFile(new URL(file,root),'utf8');
const ui=packageMetadata('vue-ui'),core=packageMetadata('core');
assert.equal(ui.name,'solyi-ui');assert.equal(core.name,'@solyi/core');assert.equal(ui.peerDependencies[core.name],core.version);assert.equal(ui.private,true);assert.equal(core.private,true);assert.equal(ui.license,'MIT');
assert.match(ui.description,/Vue 3/);assert.equal(packageTarball(ui),'solyi-ui-'+ui.version+'.tgz');
const reports=JSON.parse(await read('artifacts/pack-report.json'));assert.ok(reports.some(p=>p.name===ui.name&&p.filename===packageTarball(ui)));assert.ok(!reports.some(p=>p.name===historicalUiName));
for(const project of ['examples/package-consumer','examples/vue-vuetify']){
 const manifest=JSON.parse(await read(project+'/package.json')),lock=JSON.parse(await read(project+'/package-lock.json'));
 assert.equal(manifest.dependencies[historicalUiName],undefined);assert.ok(manifest.dependencies[ui.name].endsWith('/'+packageTarball(ui)));
 assert.equal(lock.packages['node_modules/'+ui.name].version,ui.version);assert.equal(lock.packages['node_modules/'+core.name].version,core.version);assert.equal(lock.packages['node_modules/'+historicalUiName],undefined);
 await assert.rejects(()=>stat(new URL(project+'/node_modules/'+historicalUiName,root)),{code:'ENOENT'});
 assert.equal(JSON.parse(await read(project+'/node_modules/'+ui.name+'/package.json')).name,ui.name);
}
for(const file of ['DESIGN.md','packages/vue-ui/README.md','documentation/guide/DISTRIBUTION.md','documentation/guide/GETTING-STARTED.md','examples/package-consumer/main.ts','examples/vue-vuetify/src/main.js','site/adoption.js']){const content=await read(file);assert.ok(content.includes(ui.name),file+' current name');const current=file.endsWith('DISTRIBUTION.md')?content.split('### 이전 이름에서 전환')[0]:content;assert.ok(!current.includes(historicalUiName),file+' no stale current import');}
assert.ok((await read('documentation/guide/DISTRIBUTION.md')).includes('npm uninstall '+historicalUiName),'Renaming includes an explicit old-name removal step');
const catalogue=await releaseCatalogue();for(const release of catalogue.releases){assert.ok(releasePackage(release,'core'));assert.ok(releasePackage(release,'vue-ui'));}
console.log('PASS: solyi-ui metadata/tarball and two installed consumers use the selected name with unchanged @solyi/core peer; no old installed alias, current guidance consistent and historical package identities still validate. Registry availability/ownership is not asserted.');

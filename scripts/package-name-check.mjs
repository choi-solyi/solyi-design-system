import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {packageMetadata,packageTarball,releasePackage,historicalUiName} from './package-identity.mjs';
import {releaseCatalogue} from './releases.mjs';
const root=new URL('../',import.meta.url),read=file=>readFile(new URL(file,root),'utf8');
const ui=packageMetadata('vue-ui'),core=packageMetadata('core');
assert.equal(ui.name,'solyi-ui');assert.equal(core.name,'@solyi/core');assert.deepEqual(Object.keys(ui.peerDependencies).sort(),['vue','vuetify']);for(const field of ['dependencies','optionalDependencies','peerDependencies'])assert.equal(ui[field]?.[core.name],undefined,'No separate Core '+field);assert.equal(ui.private,false);assert.equal(JSON.parse(await read('package.json')).private,true,'Workspace remains private');assert.equal(core.private,true);assert.equal(ui.license,'MIT');
assert.match(ui.description,/Vue 3/);assert.equal(packageTarball(ui),'solyi-ui-'+ui.version+'.tgz');
const reports=JSON.parse(await read('artifacts/pack-report.json'));assert.ok(reports.some(p=>p.name===ui.name&&p.filename===packageTarball(ui)));assert.ok(!reports.some(p=>p.name===historicalUiName));
for(const project of ['examples/package-consumer','examples/vue-vuetify']){
 const manifest=JSON.parse(await read(project+'/package.json')),lock=JSON.parse(await read(project+'/package-lock.json'));
 assert.equal(manifest.dependencies[historicalUiName],undefined);assert.equal(manifest.dependencies[core.name],undefined);assert.ok(manifest.dependencies[ui.name].endsWith('/'+packageTarball(ui)));
 assert.equal(lock.packages['node_modules/'+ui.name].version,ui.version);assert.ok(!Object.keys(lock.packages).some(path=>/(?:^|\/)node_modules\/@solyi\/core$/.test(path)),'No Core in the consumer dependency tree');assert.equal(lock.packages['node_modules/'+historicalUiName],undefined);
 await assert.rejects(()=>stat(new URL(project+'/node_modules/'+historicalUiName,root)),{code:'ENOENT'});
 await assert.rejects(()=>stat(new URL(project+'/node_modules/'+core.name,root)),{code:'ENOENT'});
 assert.equal(JSON.parse(await read(project+'/node_modules/'+ui.name+'/package.json')).name,ui.name);
}
for(const file of ['DESIGN.md','packages/vue-ui/README.md','documentation/guide/DISTRIBUTION.md','documentation/guide/GETTING-STARTED.md','examples/package-consumer/main.ts','examples/vue-vuetify/src/main.js','site/adoption.js']){
 const content=await read(file);assert.ok(content.includes(ui.name),file+' current name');
 assert.ok(!/(?:from\s*|import\s*)["']@solyi\/(?:core|vue-ui)(?:\/[^"']*)?["']/.test(content),file+' imports the single current package');
 assert.ok(!/npm\s+(?:install|i)\b[^\n]*(?:@solyi\/core|@solyi\/vue-ui)/.test(content),file+' installs the single current package');
}
const catalogue=await releaseCatalogue();for(const release of catalogue.releases){assert.ok(releasePackage(release,'core'));assert.ok(releasePackage(release,'vue-ui'));}
console.log('PASS: solyi-ui metadata/tarball and two installed consumers use one package with Vue/Vuetify peers; no separate Core or old installed alias, current guidance consistent and historical package identities still validate. Registry availability/ownership is not asserted.');

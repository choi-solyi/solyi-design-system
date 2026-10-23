import assert from 'node:assert/strict';
import http from 'node:http';
import {mkdir,readFile,writeFile,copyFile,stat} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';
import {verifyRelease,releaseCatalogue,digest,assertImmutableRelease,assertPackageVersions} from './releases.mjs';
import {releasePackage,historicalUiName} from './package-identity.mjs';
const root=new URL('../',import.meta.url),docs=new URL('docs/',root),fixture=new URL('.tooling/http-consumer-'+Date.now()+'/',root),exec=promisify(execFile);
const catalogue=await releaseCatalogue();assert.ok(catalogue.releases.length>=2,'A real previous pair is required');
const current=catalogue.releases.find(r=>r.release===catalogue.current),old=catalogue.releases.find(r=>r.release!==catalogue.current);
assert.equal(catalogue.current,JSON.parse(await readFile(new URL('package.json',root),'utf8')).version,'Prepare the new release first with npm run library:prepare');
for(const pkg of current.packages)assert.equal(pkg.version,JSON.parse(await readFile(new URL('packages/'+(pkg.name==='@solyi/core'?'core':'vue-ui')+'/package.json',root),'utf8')).version,'The current release must match source package versions');
for(const release of catalogue.releases)await verifyRelease(new URL('releases/'+release.release+'/',docs));
for(const pkg of current.packages)assert.deepEqual(digest(await readFile(new URL('artifacts/'+pkg.file,root))),{sha256:pkg.sha256,integrity:pkg.integrity},'Fresh build matches frozen package '+pkg.name);
await mkdir(fixture,{recursive:true});
// Negative fixtures are fresh local copies, never the release source or Pages output.
const damaged=new URL('damaged/',fixture);await mkdir(damaged);
for(const file of ['manifest.json','SHA256SUMS',...current.packages.map(p=>p.file)])await copyFile(new URL('releases/'+current.release+'/'+file,docs),new URL(file,damaged));
await writeFile(new URL(current.packages[0].file,damaged),'not a package');
await assert.rejects(()=>verifyRelease(damaged),/checksum mismatch/);
await writeFile(new URL('manifest.json',fixture),JSON.stringify(current));await assert.rejects(()=>verifyRelease(fixture),/ENOENT/);
const command=async(args)=>{try{const result=await exec(process.platform==='win32'?'npm.cmd':'npm',args,{shell:process.platform==='win32',cwd:fileURLToPath(fixture),env:process.env,maxBuffer:4*1024*1024});if(result.stdout)console.log(result.stdout.trim());return result.stdout+'\n'+result.stderr;}catch(error){console.error(error.stdout,error.stderr);throw error;}};
const assertNoCoreRegistryRequest=output=>{
 const decoded=output.replace(/%40/gi,'@').replace(/%2f/gi,'/');
 assert.ok(!/https?:\/\/registry\.npmjs\.org\/@solyi\/core(?:[/?\s]|$)/i.test(decoded),'A UI-only install must not request Core from the registry');
};
const server=http.createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(!/^\/releases\/[\w./-]+$/.test(pathname)||pathname.includes('..'))throw Error('path');const data=await readFile(new URL('.'+pathname,docs));res.writeHead(200,{'Content-Type':'application/octet-stream'}).end(data);}catch{res.writeHead(404).end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+server.address().port+'/releases/';
try{
 const template=JSON.parse(await readFile(new URL('examples/package-consumer/package.json',root),'utf8'));
 await writeFile(new URL('index.html',fixture),'<html lang="en"><head><title>HTTP package verification</title></head><body><div id="app"></div><script type="module" src="/main.ts"></script></body></html>');
 await copyFile(new URL('examples/package-consumer/tsconfig.json',root),new URL('tsconfig.json',fixture));
 await copyFile(new URL('examples/package-consumer/env.d.ts',root),new URL('env.d.ts',fixture));
 const names=['SBtn','STextField','SDialog','SDataTable','SCheckbox','SRadioGroup','SSwitch','SSelect','STextarea','SNumberInput','STabs','SSnackbar','SDatePicker','STimePicker','SSegmentedControl','SMultiSelect','SRangeSlider','SSplitBtn','SContextMenu','SResizableSplitPane'];
 let installedUiName;
 for(const [label,release]of [['previous',old],['update',current],['rollback',old]]){
  const uiPackage=releasePackage(release,'vue-ui'),uiName=uiPackage.name,singlePackage=label==='update';
  const consumerPackages=singlePackage?[uiPackage]:release.packages;
  // Preserve the original dependency pair for historical installs and rollback.
  // A renamed UI is removed while its original Core peer is still present.
  if(installedUiName&&installedUiName!==uiName)await command(['uninstall',installedUiName,'--ignore-scripts','--no-audit','--no-fund','--registry=https://registry.npmjs.org']);
  const dependencies={...template.dependencies};for(const name of [historicalUiName,'solyi-ui','@solyi/core'])delete dependencies[name];for(const p of consumerPackages)dependencies[p.name]=base+release.release+'/'+p.file;
  await writeFile(new URL('package.json',fixture),JSON.stringify({...template,name:'solyi-http-release-check',dependencies},null,2));
  const sharedImports=singlePackage?`import {tokens,coreVersion} from '${uiName}/tokens';import {parseDateOnly} from '${uiName}/date';import {solIcon} from '${uiName}/icons';import {mountOverflowText} from '${uiName}/overflow';import type {DateParts} from '${uiName}/date';import type {SolIconName} from '${uiName}/icons';import type {OverflowCleanup} from '${uiName}/overflow';import '${uiName}/fonts.css';import '${uiName}/code-fonts.css';void [tokens,coreVersion,parseDateOnly('2026-10-21'),solIcon('close'),mountOverflowText];const typedShared:[DateParts|null,SolIconName,OverflowCleanup|null]=[parseDateOnly('2026-10-21'),'close',null];void typedShared;`:'';
  const sharedName=singlePackage?uiName:'@solyi/core';
  await writeFile(new URL('main.ts',fixture),`import {createApp,h} from 'vue';import {createVuetify} from 'vuetify';import SolyiUI,{${names.join(',')}${singlePackage?',formatSolDate,formatSolNumber,provideSolLocale':''}} from '${uiName}';import '${sharedName}/tokens.css';import '${sharedName}/components.css';import '${uiName}/styles.css';${sharedImports}void [${names.join(',')}];const app=createApp({render:()=>h(STextField,{id:'check',label:'Check',required:true})});${singlePackage?"provideSolLocale(app,'en');void formatSolDate('2026-10-21','en');void formatSolNumber(1234.5,'en');":''}app.use(createVuetify()).use(SolyiUI).mount('#app');`);
  console.log('HTTP '+label+': '+release.release);
  const installOutput=await command(['install','--ignore-scripts','--no-audit','--no-fund','--registry=https://registry.npmjs.org','--loglevel=http']);
  const lock=JSON.parse(await readFile(new URL('package-lock.json',fixture),'utf8'));
  for(const p of consumerPackages){const installed=JSON.parse(await readFile(new URL('node_modules/'+p.name+'/package.json',fixture),'utf8'));assert.equal(installed.version,p.version);const record=lock.packages['node_modules/'+p.name];assert.equal(record.resolved,dependencies[p.name]);assert.equal(record.integrity,p.integrity);const response=await fetch(dependencies[p.name]);assert.equal(response.status,200);assert.deepEqual(digest(Buffer.from(await response.arrayBuffer())),{sha256:p.sha256,integrity:p.integrity});}
  if(singlePackage){
   assertNoCoreRegistryRequest(installOutput);
   assert.equal(dependencies['@solyi/core'],undefined);
   assert.ok(!Object.keys(lock.packages).some(path=>/(?:^|\/)node_modules\/@solyi\/core$/.test(path)),'Current HTTP consumer has no separate Core in its dependency tree');
   await assert.rejects(()=>stat(new URL('node_modules/@solyi/core',fixture)),{code:'ENOENT'});
   const installed=JSON.parse(await readFile(new URL('node_modules/'+uiName+'/package.json',fixture),'utf8'));
   for(const field of ['dependencies','optionalDependencies','peerDependencies'])assert.equal(installed[field]?.['@solyi/core'],undefined,'HTTP-installed UI has no Core '+field);
   for(const subpath of ['./tokens','./date','./icons','./overflow','./tokens.css','./components.css','./fonts.css','./code-fonts.css'])assert.ok(installed.exports[subpath],'HTTP-installed UI exports '+subpath);
  }
  for(const name of ['vue','vuetify'])assert.equal(Object.keys(lock.packages).filter(key=>key.endsWith('node_modules/'+name)).length,1,'One '+name+' runtime');
  await command(['run','build']);
  installedUiName=uiName;
 }
 assert.equal((await fetch(base+'missing/package.tgz')).status,404);
 // Exercise the CLI's exact guard with a changed fixture, without mutating packages.
 assert.throws(()=>assertImmutableRelease(current,current.packages.map((p,i)=>i? p:{...p,sha256:'0'.repeat(64)})),/Refusing to replace/);
 assert.doesNotThrow(()=>assertImmutableRelease(current,current.packages));
 assert.throws(()=>assertPackageVersions([current,{packages:current.packages.map((p,i)=>i?p:{...p,sha256:'0'.repeat(64)})}]),/different bytes/);
 console.log('PASS: immutable release artifacts/hash manifests; HTTP consumer previous pair -> single-package update -> previous pair rollback, types/CSS/fonts/Vite build/locked integrity/one Vue+Vuetify each; no separate Core or Core registry request for the update; corrupt/missing/overwrite guards. Local fixture only, public URLs not published.');
}finally{await new Promise(resolve=>server.close(resolve));}

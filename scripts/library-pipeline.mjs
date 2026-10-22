import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {readFileSync,writeFileSync} from 'node:fs';
const root=new URL('../',import.meta.url),npm=process.platform==='win32'?'npm.cmd':'npm';
const run=(label,dir,command,args)=>{console.log('\n'+label);execFileSync(command,args,{cwd:fileURLToPath(new URL(dir,root)),stdio:'inherit',shell:process.platform==='win32'&&command===npm});};
const node=(label,file,...args)=>run(label,'',process.execPath,[file,...args]);
const packageTarballs=['core','vue-ui'].map(name=>'../../artifacts/solyi-'+name+'-'+JSON.parse(readFileSync(new URL('packages/'+name+'/package.json',root),'utf8')).version+'.tgz');
const installArgs=['--ignore-scripts','--no-audit','--no-fund','--registry=https://registry.npmjs.org'];
node('1/10 Shared Core','scripts/build-packages.mjs','--core');
run('2/10 Library locked development dependencies','packages/vue-ui/',npm,['ci',...installArgs]);
run('3/10 Vite library + strict own-source declarations','packages/vue-ui/',npm,['run','build']);
node('4/10 Pack local artifacts','scripts/pack-packages.mjs');
for(const project of ['examples/package-consumer/','examples/vue-vuetify/']){
 if(process.argv.includes('--refresh')){
  // A local preview tarball may be rebuilt before its version is committed.
  // Resolve only our package records afresh; preserve all third-party pins.
  const lockPath=new URL(project+'package-lock.json',root),lock=JSON.parse(readFileSync(lockPath,'utf8'));
  for(const name of ['core','vue-ui'])delete lock.packages['node_modules/@solyi/'+name];
  writeFileSync(lockPath,JSON.stringify(lock,null,2)+'\n');
  run('5/10 Refresh tarball lock: '+project,project,npm,['install','--package-lock-only',...installArgs,...packageTarballs]);
 }
 run('5/10 Clean install real tarballs: '+project,project,npm,['ci',...installArgs]);
}
run('6/10 Independent consumer typecheck + app build','examples/package-consumer/',npm,['run','build']);
node('7/10 Pack contracts and installed runtime tests','scripts/library-contract-check.mjs');
node('7/10 Component runtime','scripts/library-runtime-check.mjs');
node('7/10 Extended controlled Vue runtime','scripts/vue-extended-runtime-check.mjs');
node('7/10 Six new reusable Vue APIs','scripts/vue-expansion-runtime-check.mjs');
node('7/10 Shared locale runtime','scripts/locale-runtime-check.mjs');
node('7/10 Starter async runtime','scripts/starter-runtime-check.mjs');
run('8/10 Package-consuming public demo','examples/vue-vuetify/',npm,['run','build']);
if(process.argv.includes('--prepare-release'))node('9/10 Freeze the verified local package pair','scripts/releases.mjs',JSON.parse(readFileSync(new URL('package.json',root),'utf8')).version);
node('9/10 Documentation build','scripts/build.mjs');
node('9/10 Versioned delivery and real HTTP consumption','scripts/distribution-check.mjs');
run('10/10 Existing checks','',npm,['run','check']);
run('10/10 Existing + new UX regression','',npm,['test']);
console.log('\nPASS: packages → independent consumption → demo → all checks. No registry publish, external app update or deployment occurs in this script.');

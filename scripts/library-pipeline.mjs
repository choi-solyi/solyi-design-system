import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {readFileSync,writeFileSync} from 'node:fs';
import {packageMetadata,packageTarball} from './package-identity.mjs';
import assert from 'node:assert/strict'
const root=new URL('../',import.meta.url),npm=process.platform==='win32'?'npm.cmd':'npm';
assert.equal(
  JSON.parse(readFileSync(new URL('package.json', root), 'utf8')).version,
  JSON.parse(readFileSync(new URL('tokens.json', root), 'utf8')).version,
  'Synchronize document and token versions before creating immutable package artifacts',
)
const run=(label,dir,command,args)=>{console.log('\n'+label);execFileSync(command,args,{cwd:fileURLToPath(new URL(dir,root)),stdio:'inherit',shell:process.platform==='win32'&&command===npm});};
const node=(label,file,...args)=>run(label,'',process.execPath,[file,...args]);
// Core is an internal build unit; a new consumer installs only the UI tarball.
const packageTarballs=['../../artifacts/'+packageTarball(packageMetadata('vue-ui'))];
const installArgs=['--ignore-scripts','--no-audit','--no-fund','--registry=https://registry.npmjs.org'];
node('1/10 Framework-independent clean bootstrap', 'scripts/core-bootstrap-check.mjs')
node('1/10 Internal shared Core','scripts/build-packages.mjs','--core');
run('2/10 Library locked development dependencies','packages/vue-ui/',npm,['ci',...installArgs]);
run('3/10 Vite library + strict own-source declarations','packages/vue-ui/',npm,['run','build']);
node('3/10 Combined and individual stylesheet contracts', 'scripts/package-style-entry-check.mjs')
node('4/10 Pack local artifacts','scripts/pack-packages.mjs');
node('4/10 Plain npm pack lifecycle','scripts/prepack-check.mjs');
for(const project of ['examples/package-consumer/','examples/vue-vuetify/']){
 if(process.argv.includes('--refresh')){
  // A local preview tarball may be rebuilt before its version is committed.
  // Resolve only our package records afresh; preserve all third-party pins.
  const lockPath=new URL(project+'package-lock.json',root),lock=JSON.parse(readFileSync(lockPath,'utf8'));
  for(const name of ['@solyi/core','@solyi/vue-ui','solyi-ui'])delete lock.packages['node_modules/'+name];
  writeFileSync(lockPath,JSON.stringify(lock,null,2)+'\n');
  run('5/10 Refresh tarball lock: '+project,project,npm,['install','--package-lock-only',...installArgs,...packageTarballs]);
 }
 run('5/10 Clean install the single UI tarball: '+project,project,npm,['ci',...installArgs]);
}
run('6/10 Independent consumer typecheck + app build','examples/package-consumer/',npm,['run','build']);
run('6/10 Typecheck actual Vue documentation examples','examples/vue-vuetify/',npm,['run','check:recipes']);
node('7/10 Pack contracts and installed runtime tests','scripts/library-contract-check.mjs');
node('7/10 Versioned size budget rejection cases','scripts/library-size-budget-check.mjs');
node('7/10 Real installed named-import size budgets','scripts/library-size-check.mjs');
node('7/10 Component runtime','scripts/library-runtime-check.mjs');
node('7/10 Extended controlled Vue runtime','scripts/vue-extended-runtime-check.mjs');
node('7/10 Six new reusable Vue APIs','scripts/vue-expansion-runtime-check.mjs');
node('7/10 Responsive split pane touch and capture recovery', 'scripts/split-pane-touch-check.mjs')
node('7/10 Shared locale runtime','scripts/locale-runtime-check.mjs');
node('7/10 Installed overflow locale','scripts/overflow-locale-check.mjs','--installed');
node('7/10 S public APIs and direct Vuetify bridge','scripts/s-api-runtime-check.mjs');
node('7/10 Shared form validation and Vuetify grid','scripts/form-api-runtime-check.mjs');
node('7/10 Shared input clear model, validation and focus','scripts/input-control-runtime-check.mjs');
node('7/10 Installed shared input clear SFC contracts','scripts/input-control-types-check.mjs','--installed');
node('7/10 Installed public declaration contracts','scripts/declaration-contract-check.mjs','--installed');
node('7/10 Reusable progress','scripts/progress-runtime-check.mjs');
node('7/10 Actual Vue documentation recipes','scripts/vue-recipes-runtime-check.mjs');
node('7/10 Dedicated reusable Vue APIs','scripts/vue-dedicated-runtime-check.mjs');
node('7/10 Chip, badge, icon and icon button contracts','scripts/primitives-runtime-check.mjs');
node('7/10 Date and number display/form contracts','scripts/input-display-runtime-check.mjs');
node('7/10 Native and custom time list contracts','scripts/time-list-runtime-check.mjs');
node('7/10 Time scrub proposal/commit/cancel contracts','scripts/time-scrub-runtime-check.mjs');
node('7/10 Sortable identity and immutable proposal foundation','scripts/sortable-values-check.mjs');
node('7/10 Month calendar ISO/date navigation foundation','scripts/month-calendar-values-check.mjs');
node('7/10 Installed controlled month calendar','scripts/month-calendar-runtime-check.mjs');
node('7/10 Installed month calendar SFC contracts','scripts/month-calendar-types-check.mjs','--installed');
node('7/10 Installed Sortable controlled runtime','scripts/sortable-keyboard-runtime-check.mjs');
node('7/10 Installed Sortable generic SFC contracts','scripts/sortable-types-check.mjs','--installed');
node('7/10 New and extended Components coverage','scripts/component-extension-coverage-check.mjs');
node('7/10 Recipe navigation and URL history','scripts/recipe-navigation-check.mjs');
node('7/10 Unsaved navigation and retry focus recovery','scripts/recipe-recovery-check.mjs');
node('7/10 Floating preview size','scripts/embed-height-check.mjs');
node('7/10 Decimal number steps','scripts/number-input-step-check.mjs');
node('7/10 Loading, drag and calendar feedback', 'scripts/component-feedback-runtime-check.mjs')
node('7/10 Visible numeric accessibility labels', 'scripts/numeric-label-check.mjs')
node('7/10 Starter async runtime','scripts/starter-runtime-check.mjs');
run('8/10 Package-consuming public demo','examples/vue-vuetify/',npm,['run','build']);
if(process.argv.includes('--packages-only')){
 console.log('\nPASS: UI tarball, both consumers, runtime contracts and public demo. Documentation and release delivery checks are deferred.');
 process.exit(0);
}
if(process.argv.includes('--prepare-release'))node('9/10 Freeze verified local artifacts and release history','scripts/releases.mjs',JSON.parse(readFileSync(new URL('package.json',root),'utf8')).version);
node('9/10 Documentation build','scripts/build.mjs');
node('9/10 Current release preparation and preserved downloads', 'scripts/release-preparation-check.mjs')
node('9/10 Installed getting-started examples','scripts/getting-started-check.mjs');
node('9/10 Real document package previews','scripts/vue-preview-integration-check.mjs');
node('9/10 Short documents, embedded headings and fallback', 'scripts/document-followup-check.mjs')
node('9/10 Public sample formatting and actual syntax', 'scripts/public-sample-check.mjs')
node('9/10 Versioned delivery and real HTTP consumption','scripts/distribution-check.mjs');
run('10/10 Existing checks','',npm,['run','check']);
run('10/10 Existing + new UX regression','',npm,['test']);
console.log('\nPASS: packages → independent consumption → demo → all checks. No registry publish, external app update or deployment occurs in this script.');

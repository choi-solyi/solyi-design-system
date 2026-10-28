import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {currentPackageNames} from './package-identity.mjs';
import {assertSourceBudget,measureSource} from './library-size-budget.mjs';
const root=new URL('../',import.meta.url),json=async file=>JSON.parse(await readFile(new URL(file,root),'utf8'));
const packs=await json('artifacts/pack-report.json');
const ui=await json('packages/vue-ui/package.json'),core=await json('packages/core/package.json');
const projects=['examples/package-consumer','examples/vue-vuetify'];
const filesUnder=async directory=>{
 const files=[];
 for(const entry of await readdir(directory,{withFileTypes:true})){
  if(entry.isDirectory())files.push(...(await filesUnder(new URL(entry.name+'/',directory))).map(file=>entry.name+'/'+file));
  else files.push(entry.name);
 }
 return files;
};
const designGuideBytes=await readFile(new URL('DESIGN.md',root));
for(const name of ['core','vue-ui']){
 const report=packs.find(pack=>pack.name===currentPackageNames[name]);
 assert.ok(report.files.some(file=>file.path==='DESIGN.md'),'Canonical consumer guide is packed: '+name);
 assert.deepEqual(await readFile(new URL('packages/'+name+'/DESIGN.md',root)),designGuideBytes);
 if(name==='vue-ui')for(const project of projects)assert.deepEqual(await readFile(new URL(project+'/node_modules/'+currentPackageNames[name]+'/DESIGN.md',root)),designGuideBytes,'Real installed consumer guide matches: '+project+'/'+name);
}
for(const [name,minimum]of [['core',['dist/tokens.css','dist/components.css','dist/tokens.json','dist/index.js','dist/index.d.ts','dist/icons.js','dist/icons.d.ts','dist/date-only.js','dist/date-only.d.ts']],['vue-ui',['dist/index.js','dist/index.d.ts','dist/styles.css','dist/controls.d.ts','dist/navigation.d.ts','dist/date-time.d.ts','dist/locale.d.ts','dist/selection.d.ts','dist/actions.d.ts','dist/split-pane.d.ts','dist/progress.d.ts','dist/vuetify.d.ts','dist/surfaces.d.ts','dist/tree.d.ts']]]){
 const pkg=await json('packages/'+name+'/package.json');assert.equal(pkg.private,true,'Publication remains guarded');assert.equal(pkg.license,'MIT');assert.ok(!pkg.scripts?.publish);const report=packs.find(p=>p.name===pkg.name);assert.ok(report);assert.ok(report.files.some(f=>f.path==='LICENSE'),'Scoped MIT notice included');for(const file of minimum)assert.ok(report.files.some(f=>f.path===file),file+' included in pack');for(const value of Object.values(pkg.exports)){for(const target of typeof value==='string'?[value]:Object.values(value))assert.ok((await stat(new URL('packages/'+name+'/'+target,root))).isFile());}
 if(name==='vue-ui'){const readme=await readFile(new URL('packages/vue-ui/README.md',root),'utf8');assert.ok(readme.startsWith('# solyi-ui\n'),'Packed README uses the stable package name; runtime version follows package metadata');assert.ok(!/npm\s+(?:install|i)\b[^\n]*@solyi\/core/.test(readme),'Consumer installation does not require Core');}
 assert.ok(!report.files.some(f=>/node_modules|brand|favicon|\.env|\.git\//.test(f.path)));
 assert.ok(!Object.values(pkg.dependencies||{}).some(value=>String(value).startsWith('file:')),'No repository-source dependency in packed runtime '+name);
}
assert.deepEqual(Object.keys(ui.peerDependencies).sort(),['vue','vuetify'],'Only the framework runtimes remain peers');
for(const field of ['dependencies','optionalDependencies','peerDependencies'])assert.equal(ui[field]?.[core.name],undefined,'No external Core '+field);
const uiPack=packs.find(p=>p.name===ui.name),uiFiles=await filesUnder(new URL('packages/vue-ui/dist/',root));
for(const file of uiFiles.filter(file=>/\.(?:js|d\.ts)$/.test(file)))assert.ok(!(await readFile(new URL('packages/vue-ui/dist/'+file,root),'utf8')).includes('@solyi/core'),'No external Core reference in packaged '+file);
for(const file of await filesUnder(new URL('packages/core/dist/',root))){
 assert.ok(uiPack.files.some(record=>record.path==='dist/core/'+file),'Embedded Core asset is packed: '+file);
 assert.deepEqual(await readFile(new URL('packages/vue-ui/dist/core/'+file,root)),await readFile(new URL('packages/core/dist/'+file,root)),'Embedded Core source bytes match: '+file);
}
const sharedExports={
 './tokens':{types:'./dist/core/index.d.ts',import:'./dist/core/index.js'},
 './tokens.css':'./dist/core/tokens.css','./tokens.json':'./dist/core/tokens.json','./components.css':'./dist/core/components.css',
 './fonts.css':'./dist/core/fonts/wanted-sans/WantedSansVariable.css','./code-fonts.css':'./dist/core/fonts/code-fonts.css',
 './date':{types:'./dist/core/date-only.d.ts',import:'./dist/core/date-only.js'},
 './icons':{types:'./dist/core/icons.d.ts',import:'./dist/core/icons.js'},
 './overflow':{types:'./dist/core/overflow.d.ts',import:'./dist/core/overflow.js'}
};
for(const [subpath,expected]of Object.entries(sharedExports)){
 assert.deepEqual(ui.exports[subpath],expected,'Single-package public export '+subpath);
 for(const target of typeof expected==='string'?[expected]:Object.values(expected))assert.ok(uiPack.files.some(file=>file.path===target.slice(2)),'Export target is packed: '+target);
}
for(const subpath of ['./fonts.css','./code-fonts.css']){
 const cssUrl=new URL('packages/vue-ui/'+ui.exports[subpath],root),css=await readFile(cssUrl,'utf8');
 assert.match(css,/@font-face/,'Font entry declares its bundled faces');
 for(const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g))assert.ok((await stat(new URL(match[1],cssUrl))).isFile(),'Bundled font URL resolves: '+match[1]);
}
const library=await readFile(new URL('packages/vue-ui/dist/index.js',root),'utf8');assert.ok(/from ["']vue["']/.test(library));assert.ok(/from ["']vuetify\//.test(library));assert.match(library,/\.\/core\/overflow\.js/,'Overflow runtime resolves inside the package');
// A source-size budget is a growth alarm, not proof that peer runtimes are external.
// Vite's external predicate and the real consumers' single installed runtimes are checked separately.
// Keep this gate at the original location; versioned criteria include exact API coverage.
const sourceSize=await measureSource(new URL('packages/vue-ui/',root));
assertSourceBudget(ui.version,sourceSize.metrics,sourceSize.components);
const types=await readFile(new URL('packages/vue-ui/dist/index.d.ts',root),'utf8');for(const name of ['SBtn','STextField','SDialog','SDataTable','TableColumn','TableSort','SCheckbox','SRadioGroup','SSwitch','SSelect','STextarea','SNumberInput','STabs','SSnackbar','SDatePicker','STimePicker','SSegmentedControl','SMultiSelect','SRangeSlider','SSplitBtn','SContextMenu','SResizableSplitPane','SolRangeValue','SolOptionLoader','SolMenuItem','SolLocale','DateValue','SolPickerHandle','SBtn','STextField','SDialog','SDataTable','SSnackbar','SProgressLinear','SProgressCircular','createSolyiVuetify','applySolyiAppearance'])assert.ok(types.includes(name));
for(const name of ["SolButton","SolField","SolDialog","SolTable","SolCheckbox","SolRadioGroup","SolSwitch","SolSelect","SolTextarea","SolNumberInput","SolTabs","SolToast","SolDatePicker","SolTimePicker","SolSegmentedControl","SolMultiSelect","SolRangeSlider","SolSplitButton","SolContextMenu","SolResizableSplitPane"])assert.ok(!types.includes(' '+name+':')&&!types.includes(' '+name+';'),'No legacy component declaration '+name);for(const name of ['SCard','SAlert','STree','STreeItem'])assert.ok(types.includes(name));
for(const name of ['STooltip','SPopover','SAccordion','SBreadcrumbs','SFileInput','SAutocomplete','SAvatar','SStepper','SBarChart','SForm','SContainer','SRow','SCol','SFormHandle','SFieldHandle','sRules'])assert.ok(types.includes(name),name+' public declaration');
for(const name of ['coreVersion','tokens'])assert.ok(types.includes(name),'Embedded tokens main declaration: '+name);
for(const file of ['dist/global.js','dist/global.d.ts','dist/floating.d.ts','dist/files.d.ts','dist/autocomplete.d.ts','dist/disclosures.d.ts','dist/presentation.d.ts','dist/form.d.ts','dist/layout.d.ts'])assert.ok(uiPack.files.some(f=>f.path===file),file+' included');
const globalTypes=await readFile(new URL('packages/vue-ui/dist/global.d.ts',root),'utf8');for(const name of ['SBtn','SFileInput','SAutocomplete','SPopover'])assert.ok(globalTypes.includes(name),'Global template type '+name);
const styles=await readFile(new URL('packages/vue-ui/dist/styles.css',root),'utf8');assert.match(styles,/\.sol-ui-table \.sol-data-table\{[^}]*table-layout:fixed[^}]*width:100%/,'Package table keeps fixed layout at intermediate widths');
assert.match(library,/\.\/core\/icons\.js/,'Package icons use the embedded shared icon source');
assert.match(styles,/\.sol-ui-table \.sol-data-table caption\{[^}]*padding:var\(--sol-space-4\) var\(--sol-space-3\)/,'Caption has explicit block and inline spacing');
assert.match(styles,/\.sol-ui-table \.sol-sort-button\.v-btn\{[^}]*padding-inline:0/,'Table sort spacing survives Vuetify button specificity');
assert.match(styles,/\.sol-ui-icon\{[^}]*width:20px[^}]*height:20px/,'Icon box has fixed dimensions');
for(const project of projects){
 const manifest=await json(project+'/package.json');assert.equal(manifest.dependencies?.[core.name],undefined,'Consumer installs no separate Core');
 const lock=await json(project+'/package-lock.json');for(const [path,pkg]of Object.entries(lock.packages)){assert.ok(path===''||path.startsWith('node_modules/'),'No source directory linkage '+path);assert.ok(!pkg.link,'No symlink '+path);if(path.includes('/@solyi/')||path==='node_modules/solyi-ui'){assert.match(pkg.resolved,/^file:.*\.tgz$/);assert.match(pkg.integrity,/^sha512-/);}else if(pkg.resolved){assert.ok(pkg.resolved.startsWith('https://registry.npmjs.org/'));assert.match(pkg.integrity,/^sha512-/);assert.ok(pkg.license);}}
 const paths=Object.keys(lock.packages);assert.equal(paths.filter(p=>/(?:^|\/)node_modules\/vue$/.test(p)).length,1);assert.equal(paths.filter(p=>/(?:^|\/)node_modules\/vuetify$/.test(p)).length,1);
 assert.ok(!paths.some(path=>/(?:^|\/)node_modules\/@solyi\/core$/.test(path)),'No separate Core in consumer lock');
 await assert.rejects(()=>stat(new URL(project+'/node_modules/'+core.name,root)),{code:'ENOENT'});
 for(const name of ['vue','vuetify'])assert.equal((await json(project+'/node_modules/'+name+'/package.json')).version,ui.devDependencies[name],'Consumer uses the pinned '+name+' runtime');
 const installed=await json(project+'/node_modules/'+ui.name+'/package.json');for(const field of ['dependencies','optionalDependencies','peerDependencies'])assert.equal(installed[field]?.[core.name],undefined,'Installed package has no Core '+field);
 for(const file of uiFiles)assert.deepEqual(await readFile(new URL(project+'/node_modules/'+ui.name+'/dist/'+file,root)),await readFile(new URL('packages/vue-ui/dist/'+file,root)),'Installed UI file matches current build: '+project+'/'+file);
}
assert.deepEqual(await readFile(new URL('packages/core/dist/components.css',root)),await readFile(new URL('site/components.css',root)));
assert.deepEqual(await readFile(new URL('packages/core/dist/icons.js',root)),await readFile(new URL('site/icons.js',root)));
assert.deepEqual(await readFile(new URL('packages/core/dist/tokens.json',root)),await readFile(new URL('tokens.json',root)));
assert.match(styles,/\.sol-ui-dialog\{[^}]*border-radius:var\(--sol-radius-panel\)/,'Vue Dialog consumes the shared panel radius');
assert.match(styles,/\.sol-ui-table-desktop\{[^}]*border-radius:var\(--sol-radius-card\)/,'Vue Table consumes the shared card radius');
console.log('PASS: private single-package contents/typed exports/CSS/fonts, embedded Core source bytes, external Vue/Vuetify, two UI-only tarball consumers without separate Core, locked registry integrity/licenses and one framework copy each.');

assert.deepEqual(await readFile(new URL('packages/core/dist/date-only.js',root)),await readFile(new URL('site/date-only.js',root)));
assert.match(library,/\.\/core\/date-only\.js/,'Shared date math resolves inside the package');

assert.match(styles,/\.sol-ui-time-panel>\.sol-button:last-child\{margin-top:var\(--sol-space-2\)/,'Time picker Done has an8px token gap');

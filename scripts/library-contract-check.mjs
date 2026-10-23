import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {currentPackageNames} from './package-identity.mjs';
const root=new URL('../',import.meta.url),json=async file=>JSON.parse(await readFile(new URL(file,root),'utf8'));
const packs=await json('artifacts/pack-report.json');
const designGuideBytes=await readFile(new URL('DESIGN.md',root));
for(const name of ['core','vue-ui']){
 const report=packs.find(pack=>pack.name===currentPackageNames[name]);
 assert.ok(report.files.some(file=>file.path==='DESIGN.md'),'Canonical consumer guide is packed: '+name);
 assert.deepEqual(await readFile(new URL('packages/'+name+'/DESIGN.md',root)),designGuideBytes);
 for(const project of ['examples/package-consumer','examples/vue-vuetify'])assert.deepEqual(await readFile(new URL(project+'/node_modules/'+currentPackageNames[name]+'/DESIGN.md',root)),designGuideBytes,'Real installed consumer guide matches: '+project+'/'+name);
}
for(const [name,minimum]of [['core',['dist/tokens.css','dist/components.css','dist/tokens.json','dist/index.js','dist/index.d.ts','dist/icons.js','dist/icons.d.ts','dist/date-only.js','dist/date-only.d.ts']],['vue-ui',['dist/index.js','dist/index.d.ts','dist/styles.css','dist/controls.d.ts','dist/navigation.d.ts','dist/date-time.d.ts','dist/locale.d.ts','dist/selection.d.ts','dist/actions.d.ts','dist/split-pane.d.ts','dist/progress.d.ts','dist/vuetify.d.ts','dist/surfaces.d.ts','dist/tree.d.ts']]]){
 const pkg=await json('packages/'+name+'/package.json');assert.equal(pkg.private,true,'Publication remains guarded');assert.equal(pkg.license,'MIT');assert.ok(!pkg.scripts?.publish);const report=packs.find(p=>p.name===pkg.name);assert.ok(report);assert.ok(report.files.some(f=>f.path==='LICENSE'),'Scoped MIT notice included');for(const file of minimum)assert.ok(report.files.some(f=>f.path===file),file+' included in pack');for(const value of Object.values(pkg.exports)){for(const target of typeof value==='string'?[value]:Object.values(value))assert.ok((await stat(new URL('packages/'+name+'/'+target,root))).isFile());}
 if(name==='vue-ui'){const readme=await readFile(new URL('packages/vue-ui/README.md',root),'utf8');assert.ok(readme.startsWith('# solyi-ui '+pkg.version+'\n'),'Packed README version matches actual API package');assert.ok(readme.includes('@solyi/core '+pkg.peerDependencies['@solyi/core']),'Packed README declares the actual Core peer');}
 assert.ok(!report.files.some(f=>/node_modules|brand|favicon|\.env|\.git\//.test(f.path)));
 assert.ok(!Object.values(pkg.dependencies||{}).some(value=>String(value).startsWith('file:')),'No repository-source dependency in packed runtime '+name);
}
const library=await readFile(new URL('packages/vue-ui/dist/index.js',root),'utf8');assert.ok(/from ["']vue["']/.test(library));assert.ok(/from ["']vuetify\//.test(library));assert.ok(/@solyi\/core\/overflow/.test(library));
// A source-size budget is a growth alarm, not proof that peer runtimes are external.
// Vite's external predicate and the real consumers' single installed runtimes are checked separately.
// 0.8.0 adds nine dedicated APIs; retain an explicit source growth budget.
assert.ok(library.length<176000,'ESM component-source budget (176k characters, 34 APIs)');
const types=await readFile(new URL('packages/vue-ui/dist/index.d.ts',root),'utf8');for(const name of ['SBtn','STextField','SDialog','SDataTable','TableColumn','TableSort','SCheckbox','SRadioGroup','SSwitch','SSelect','STextarea','SNumberInput','STabs','SSnackbar','SDatePicker','STimePicker','SSegmentedControl','SMultiSelect','SRangeSlider','SSplitBtn','SContextMenu','SResizableSplitPane','SolRangeValue','SolOptionLoader','SolMenuItem','SolLocale','DateValue','SolPickerHandle','SBtn','STextField','SDialog','SDataTable','SSnackbar','SProgressLinear','SProgressCircular','createSolyiVuetify','applySolyiAppearance'])assert.ok(types.includes(name));
for(const name of ["SolButton","SolField","SolDialog","SolTable","SolCheckbox","SolRadioGroup","SolSwitch","SolSelect","SolTextarea","SolNumberInput","SolTabs","SolToast","SolDatePicker","SolTimePicker","SolSegmentedControl","SolMultiSelect","SolRangeSlider","SolSplitButton","SolContextMenu","SolResizableSplitPane"])assert.ok(!types.includes(' '+name+':')&&!types.includes(' '+name+';'),'No legacy component declaration '+name);for(const name of ['SCard','SAlert','STree','STreeItem'])assert.ok(types.includes(name));
for(const name of ['STooltip','SPopover','SAccordion','SBreadcrumbs','SFileInput','SAutocomplete','SAvatar','SStepper','SBarChart','SForm','SContainer','SRow','SCol','SFormHandle','SFieldHandle','sRules'])assert.ok(types.includes(name),name+' public declaration');
const uiPack=packs.find(p=>p.name==='solyi-ui');for(const file of ['dist/global.js','dist/global.d.ts','dist/floating.d.ts','dist/files.d.ts','dist/autocomplete.d.ts','dist/disclosures.d.ts','dist/presentation.d.ts','dist/form.d.ts','dist/layout.d.ts'])assert.ok(uiPack.files.some(f=>f.path===file),file+' included');
const globalTypes=await readFile(new URL('packages/vue-ui/dist/global.d.ts',root),'utf8');for(const name of ['SBtn','SFileInput','SAutocomplete','SPopover'])assert.ok(globalTypes.includes(name),'Global template type '+name);
const styles=await readFile(new URL('packages/vue-ui/dist/styles.css',root),'utf8');assert.match(styles,/\.sol-ui-table \.sol-data-table\{[^}]*table-layout:fixed[^}]*width:100%/,'Package table keeps fixed layout at intermediate widths');
assert.match(library,/@solyi\/core\/icons/,'Package icons use the shared icon source');
assert.match(styles,/\.sol-ui-table \.sol-data-table caption\{[^}]*padding:var\(--sol-space-4\) var\(--sol-space-3\)/,'Caption has explicit block and inline spacing');
assert.match(styles,/\.sol-ui-table \.sol-sort-button\.v-btn\{[^}]*padding-inline:0/,'Table sort spacing survives Vuetify button specificity');
assert.match(styles,/\.sol-ui-icon\{[^}]*width:20px[^}]*height:20px/,'Icon box has fixed dimensions');
for(const project of ['examples/package-consumer','examples/vue-vuetify']){
 const lock=await json(project+'/package-lock.json');for(const [path,pkg]of Object.entries(lock.packages)){assert.ok(path===''||path.startsWith('node_modules/'),'No source directory linkage '+path);assert.ok(!pkg.link,'No symlink '+path);if(path.includes('/@solyi/')||path==='node_modules/solyi-ui'){assert.match(pkg.resolved,/^file:.*\.tgz$/);assert.match(pkg.integrity,/^sha512-/);}else if(pkg.resolved){assert.ok(pkg.resolved.startsWith('https://registry.npmjs.org/'));assert.match(pkg.integrity,/^sha512-/);assert.ok(pkg.license);}}
 const paths=Object.keys(lock.packages);assert.equal(paths.filter(p=>/(?:^|\/)node_modules\/vue$/.test(p)).length,1);assert.equal(paths.filter(p=>/(?:^|\/)node_modules\/vuetify$/.test(p)).length,1);
 for(const name of ['core','vue-ui'])assert.deepEqual(await readFile(new URL(project+'/node_modules/'+currentPackageNames[name]+'/dist/index.js',root)),await readFile(new URL('packages/'+name+'/dist/index.js',root)),'Installed package matches current build');
}
assert.deepEqual(await readFile(new URL('packages/core/dist/components.css',root)),await readFile(new URL('site/components.css',root)));
assert.deepEqual(await readFile(new URL('packages/core/dist/icons.js',root)),await readFile(new URL('site/icons.js',root)));
assert.deepEqual(await readFile(new URL('packages/core/dist/tokens.json',root)),await readFile(new URL('tokens.json',root)));
assert.match(styles,/\.sol-ui-dialog\{[^}]*border-radius:var\(--sol-radius-panel\)/,'Vue Dialog consumes the shared panel radius');
assert.match(styles,/\.sol-ui-table-desktop\{[^}]*border-radius:var\(--sol-radius-card\)/,'Vue Table consumes the shared card radius');
assert.deepEqual(await readFile(new URL('examples/vue-vuetify/src/core/tokens.json',root)),await readFile(new URL('tokens.json',root)),'Archived starter token snapshot stays consistent');
assert.deepEqual(await readFile(new URL('examples/vue-vuetify/src/core/tokens.css',root)),await readFile(new URL('packages/core/dist/tokens.css',root)),'Archived starter CSS matches Core');
console.log('PASS: private pack contents/typed exports/CSS, shared source bytes, external Vue/Vuetify/Core, two actual tarball consumers, locked registry integrity/licenses and one framework copy each.');

assert.deepEqual(await readFile(new URL('packages/core/dist/date-only.js',root)),await readFile(new URL('site/date-only.js',root)));
assert.match(library,/@solyi\/core\/date/,'Date math remains in shared external Core');

assert.match(styles,/\.sol-ui-time-panel>\.sol-button:last-child\{margin-top:var\(--sol-space-2\)/,'Time picker Done has an8px token gap');

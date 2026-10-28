import assert from 'node:assert/strict'
import {mkdir,writeFile,readFile} from 'node:fs/promises'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
const root=new URL('../',import.meta.url),target=process.argv.find(arg=>arg.startsWith('--consumer='))?.slice(11)
assert.ok(target,'Pass an isolated installed --consumer=qa-output/.../')
const consumer=new URL(target.replace(/\/?$/,'/'),root),fixture=new URL('.date-contract/',consumer)
assert.ok(consumer.href.startsWith(new URL('qa-output/',root).href));await mkdir(fixture,{recursive:true})
const vueTsc=new URL('examples/vue-vuetify/node_modules/vue-tsc/bin/vue-tsc.js',root)
const component=(bindings='')=>`<script setup lang="ts">import {ref} from 'vue';import {SDatePicker} from 'solyi-ui';import type {SolPickerPresentation,SolPickerPlacement,SolPickerHandle,DateValue,DateChange,PickerCloseReason} from 'solyi-ui';const value=ref<DateValue>(null),handle=ref<SolPickerHandle|null>(null);const presentation:SolPickerPresentation='auto',placement:SolPickerPlacement='top-end';const changed=(event:DateChange)=>{const model:DateValue=event.value;void model};const closed=(reason:PickerCloseReason)=>void reason;handle.value?.focus();handle.value?.validate();handle.value?.clear();handle.value?.resetValidation();</script><template><SDatePicker id="date" label="Date" v-model="value" ref="handle" :picker-presentation="presentation" :placement="placement" @change="changed" @close="closed" ${bindings}/><SDatePicker id="legacy" label="Legacy" :picker-presentation="undefined"/></template>`
const cases=[['local-positive',component(),true],['global-positive',component().replace("import {SDatePicker} from 'solyi-ui';",''),true],['presentation-negative',component().replace(':picker-presentation="presentation"','picker-presentation="list"'),false],['placement-negative',component().replace(':placement="placement"','placement="left"'),false],['model-negative',component().replace('v-model="value"',':model-value="42"'),false],['close-negative',component().replace('</script>',`const instance=ref<InstanceType<typeof SDatePicker>|null>(null);instance.value?.$emit('close','blur');</script>`),false],['handle-negative',component().replace('handle.value?.focus()','handle.value?.open()'),false]]
for(const [name,source,positive]of cases){
 await writeFile(new URL('case.vue',fixture),source)
 await writeFile(new URL('tsconfig.json',fixture),JSON.stringify({compilerOptions:{target:'ES2022',module:'ESNext',moduleResolution:'Bundler',strict:true,noEmit:true,skipLibCheck:true,lib:['ES2023','DOM'],types:['solyi-ui/global']},vueCompilerOptions:{strictTemplates:true,checkUnknownProps:false},include:['case.vue']},null,2))
 let output='',code=0
 try{output=execFileSync(process.execPath,[fileURLToPath(vueTsc),'-p',fileURLToPath(new URL('tsconfig.json',fixture))],{cwd:fileURLToPath(consumer),encoding:'utf8',stdio:'pipe'})}catch(error){code=error.status;output=String(error.stdout||'')+String(error.stderr||'')}
 if(positive)assert.equal(code,0,name+'\n'+output);else{assert.notEqual(code,0,name+' must fail');assert.match(output,/case\.vue.*error TS/);assert.ok(!/Cannot find module|Cannot find type definition/.test(output),'A negative must fail its API, not module resolution')}
 console.log('PASS: '+name)
}
assert.equal(typeof window,'undefined');assert.equal(typeof document,'undefined')
const {build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer)),entry=new URL('ssr-entry.js',fixture)
await writeFile(entry,"export {SDatePicker,createSolyiVuetify,uiVersion,coreVersion} from 'solyi-ui';export {createSSRApp,h} from 'vue';export {renderToString} from 'vue/server-renderer';")
const built=await build({root:fileURLToPath(consumer),configFile:false,logLevel:'error',resolve:{dedupe:['vue','vuetify']},ssr:{noExternal:true},build:{ssr:fileURLToPath(entry),write:false,minify:false,rolldownOptions:{external:['vue','vue/server-renderer']}}})
await writeFile(new URL('ssr.mjs',fixture),built.output.find(item=>item.type==='chunk').code)
const api=await import(new URL('ssr.mjs',fixture)),metadata=JSON.parse(await readFile(new URL('node_modules/solyi-ui/package.json',consumer),'utf8'));assert.equal(api.uiVersion,metadata.version);assert.equal(api.coreVersion,metadata.version)
for(const mode of ['single','range'])for(const presentation of [undefined,'auto','popover','dialog']){
 const warnings=[],app=api.createSSRApp({render:()=>api.h(api.SDatePicker,{id:'date',label:'Date',name:'canonical',mode,pickerPresentation:presentation,displayFormatter:iso=>iso+' display',modelValue:mode==='single'?'2026-10-15':{start:'2026-10-15',end:'2026-10-18'}})})
 app.use(api.createSolyiVuetify());app.config.warnHandler=message=>warnings.push(message);const html=await api.renderToString(app);assert.match(html,/canonical/);assert.deepEqual(warnings,[]);assert.equal(typeof window,'undefined');assert.equal(typeof document,'undefined')
}
await writeFile(new URL('result.json',fixture),JSON.stringify({version:metadata.version,types:{positive:2,negative:5},ssr:8,ownRuntimeVersions:'matched package metadata',scope:'Actual installed tarball, no source alias; supported skipLibCheck:true consumer SFC settings'},null,2)+'\n')
console.log('PASS: installed Date public types / 8 SSR cases without DOM globals / matching package and Core runtime versions')

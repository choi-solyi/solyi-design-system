import assert from 'node:assert/strict'
import {mkdir,writeFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
const root=new URL('../',import.meta.url),consumer=new URL('examples/package-consumer/',root),fixture=new URL('.runtime-test/picker-host/',consumer)
assert.equal(typeof window,'undefined');assert.equal(typeof document,'undefined')
await mkdir(fixture,{recursive:true})
await writeFile(new URL('ssr-entry.ts',fixture),"export {PickerHost} from '../../../../packages/vue-ui/src/picker-host';export {createSolyiVuetify} from '../../../../packages/vue-ui/src/vuetify';export {createSSRApp,h} from 'vue';export {renderToString} from 'vue/server-renderer';")
const {build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer))
const result=await build({root:fileURLToPath(consumer),configFile:false,logLevel:'error',resolve:{dedupe:['vue','vuetify']},ssr:{noExternal:true},build:{ssr:fileURLToPath(new URL('ssr-entry.ts',fixture)),write:false,minify:false,rolldownOptions:{external:['vue','vue/server-renderer']}}})
await writeFile(new URL('ssr-check.mjs',fixture),result.output.find(item=>item.type==='chunk').code)
const {PickerHost,createSolyiVuetify,createSSRApp,h,renderToString}=await import(new URL('ssr-check.mjs?'+Date.now(),fixture))
for(const presentation of ['auto','popover','dialog'])for(const open of [false,true]){
 const app=createSSRApp({render:()=>h(PickerHost,{id:'ssr-host',labelledby:'ssr-title',presentation,open},()=>h('h2',{id:'ssr-title'},'Picker'))})
 app.use(createSolyiVuetify());await renderToString(app)
 assert.equal(typeof window,'undefined');assert.equal(typeof document,'undefined')
}
console.log('PASS: six private Picker host SSR open/mode cases without window/document globals; no public Date/Time adapter is claimed.')

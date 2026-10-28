/* Render the installed candidate without DOM shims. Runtime peers stay external. */
import assert from 'node:assert/strict'
import {writeFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
const consumer=new URL('../examples/package-consumer/',import.meta.url)
assert.equal(typeof document,'undefined')
const entry=new URL('.ssr-check-entry.ts',consumer)
await writeFile(entry,`import {createSSRApp,h} from 'vue';import {renderToString} from 'vue/server-renderer';
import * as api from 'solyi-ui';
export async function render(){const item={id:'a',title:'Entry',column:'one',start:480,end:540};const app=createSSRApp({render:()=>h('main',[
h(api.SCombobox,{id:'combo',label:'Combo',modelValue:'Draft',options:[]}),
h(api.SConfirmAction,{label:'Confirm'}),h(api.SEmptyState,{title:'Empty'}),
h(api.SLoadingOverlay,{modelValue:true,title:'Working',delay:0},()=>h('p','Content')),
h(api.SPagination,{modelValue:1,pageCount:3}),
h(api.SMonthCalendar,{id:'month',label:'Month',month:'2026-10',modelValue:'2026-10-28'}),
h(api.STimeGrid,{id:'grid',label:'Grid',items:[item],columns:[{key:'one',label:'One',date:'2026-10-28'}],itemKey:i=>i.id,itemLabel:i=>i.title,itemColumn:i=>i.column,itemStart:i=>i.start,itemEnd:i=>i.end,readonly:false,allowResize:true,allowDuplicate:true}),
h(api.SDialog,{id:'dialog',title:'Dialog',modelValue:false}),
h(api.SDatePicker,{id:'date',label:'Date',modelValue:'2026-10-28',pickerPresentation:'popover'}),
h(api.STimePicker,{id:'time',label:'Time',modelValue:'09:00',pickerPresentation:'popover'}),
])});app.use(api.createSolyiVuetify());app.use(api.default);return renderToString(app)}
`)
const {build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer))
const result=await build({root:fileURLToPath(consumer),configFile:false,logLevel:'error',ssr:{noExternal:true},build:{ssr:fileURLToPath(entry),write:false,minify:false,rolldownOptions:{external:['vue','vue/server-renderer']}}})
const output=new URL('.ssr-check.mjs',consumer)
await writeFile(output,result.output.find(chunk=>chunk.type==='chunk').code)
const {render}=await import(output),html=await render()
for(const text of ['Combo','Draft','Confirm','Empty','Content','Grid','Entry','One','Date','Time'])assert.ok(html.includes(text),text+' renders from the installed package')
assert.match(html,/sol-ui-time-grid/)
assert.match(html,/sol-ui-pagination/)
assert.ok(!html.includes('[object Object]'))
assert.equal(typeof document,'undefined','SSR never installs a browser shim')
console.log('PASS: installed plugin and new generic/controlled components render in SSR without document/window shims; closed opt-in picker/dialog hosts are safe.')

import { createApp, h, ref } from 'vue'
import { VApp } from 'vuetify/components/VApp'
import { SNumberInput, SRangeSlider, createSolyiVuetify, applySolyiAppearance } from 'solyi-ui'
import type { SolRangeValue } from 'solyi-ui'
import 'solyi-ui/all.css'
const query=new URLSearchParams(location.search),amount=ref<number|null>(8),range=ref<SolRangeValue>([20,80]),readonly=ref(false),disabled=ref(false),submitted=ref('')
const vuetify=createSolyiVuetify({components:{VApp}})
const toggle=(id:string,label:string,state:{value:boolean})=>h('label',{style:'display:inline-flex;gap:8px;margin:8px'},[h('input',{id,type:'checkbox',checked:state.value,onChange:(event:Event)=>state.value=(event.target as HTMLInputElement).checked}),label])
const app=createApp({render:()=>h(VApp,null,()=>h('main',{style:'max-width:720px;margin:auto;padding:24px;direction:'+(query.get('rtl')?'rtl':'ltr')},[
 h('h1',{style:'font-size:20px'},'1.1.1 준비 개발본 · 미게시 NumberInput'),
 h('div',[toggle('readonly','Readonly',readonly),toggle('disabled','Disabled',disabled)]),
 h('form',{id:'number-form',onSubmit:(event:Event)=>{event.preventDefault();submitted.value=String(new FormData(event.target as HTMLFormElement).get('amount'))}},[
  h(SNumberInput,{id:'amount',name:'amount',label:'Amount',modelValue:amount.value,'onUpdate:modelValue':(value:number|null)=>amount.value=value,min:5,max:20,step:3,unit:'kg',clearable:true,readonly:readonly.value,disabled:disabled.value}),
  h('button',{id:'submit',type:'submit'},'Submit amount'),
 ]),
 h('p',{id:'amount-result',role:'status'},JSON.stringify(amount.value)),h('p',{id:'form-result'},submitted.value),
 h(SRangeSlider,{id:'range',label:'Range',modelValue:range.value,'onUpdate:modelValue':(value:SolRangeValue)=>range.value=value,min:0,max:100,step:10,readonly:readonly.value,disabled:disabled.value}),
 h('div',{style:'display:grid;gap:var(--sol-space-4);grid-template-columns:repeat(auto-fit,minmax(min(100%,calc(var(--sol-control-height) * 6)),1fr))'},[
  h(SNumberInput,{id:'lower',label:'Lower',modelValue:range.value[0],'onUpdate:modelValue':(value:number|null)=>{if(value!==null)range.value=[value,range.value[1]]},min:0,max:range.value[1],step:10,readonly:readonly.value,disabled:disabled.value}),
  h(SNumberInput,{id:'upper',label:'Upper',modelValue:range.value[1],'onUpdate:modelValue':(value:number|null)=>{if(value!==null)range.value=[range.value[0],value]},min:range.value[0],max:100,step:10,readonly:readonly.value,disabled:disabled.value}),
 ]),h('p',{id:'range-result',role:'status'},JSON.stringify(range.value)),h('button',{id:'outside'},'Outside'),
 ]))})
app.use(vuetify).mount('#app')
applySolyiAppearance(vuetify.theme,{theme:(query.get('theme')||'violet') as 'violet'|'sage'|'sand',mode:query.get('mode')==='dark'?'dark':'light',density:query.get('density')==='compact'?'compact':'comfortable'})

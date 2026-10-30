import {createApp,h,ref,computed} from 'vue'
import {VApp} from 'vuetify/components/VApp'
import {SMultiSelect,SDialog,createSolyiVuetify,applySolyiAppearance,provideSolLocale} from 'solyi-ui'
import type {SolOption,SolOptionLoader,SolInputClearEvent} from 'solyi-ui'
import 'solyi-ui/all.css'
const q=new URLSearchParams(location.search),values=ref<string[]>([]),disabled=ref(false),readonly=ref(false),remote=ref(false),failure=ref(false),language=ref<'ko-KR'|'en-US'>('ko-KR'),last=ref(''),events=ref(0),insideDialog=ref(false)
const options:readonly SolOption[]=[{value:'a',label:'Alpha'},{value:'blocked',label:'Disabled candidate',disabled:true},{value:'long',label:'긴 선택 항목의 전체 이름을 유지합니다 '.repeat(10)},...Array.from({length:25},(_,i)=>({value:'item-'+i,label:'Item '+i}))]
const loader:SolOptionLoader=(query,signal)=>new Promise((resolve,reject)=>{const timer=setTimeout(()=>{if(failure.value){failure.value=false;reject(Error('Simulated failure'))}else resolve(options.filter(o=>o.label.toLowerCase().includes(query.toLowerCase())))},70);signal.addEventListener('abort',()=>{clearTimeout(timer);reject(Error('Aborted'))},{once:true})})
const vuetify=createSolyiVuetify({components:{VApp}})
const toggle=(id:string,label:string,value:{value:boolean})=>h('label',{style:'display:inline-flex;gap:8px;margin:8px'},[h('input',{id,type:'checkbox',checked:value.value,onChange:(e:Event)=>value.value=(e.target as HTMLInputElement).checked}),label])
const widget=()=>h(SMultiSelect,{id:'fixture-multi',label:'분류 선택',modelValue:values.value,'onUpdate:modelValue':(v:string[])=>{values.value=v;events.value++},onClear:(event:SolInputClearEvent<readonly string[]>)=>last.value=event.reason,options,loadOptions:remote.value?loader:undefined,debounce:30,maxSelected:4,clearable:true,disabled:disabled.value,readonly:readonly.value,placeholder:'검색 또는 선택'})
const app=createApp({render:()=>h(VApp,null,()=>h('main',{style:'padding:24px;max-width:720px;margin:auto;min-width:0;direction:'+(q.get('rtl')?'rtl':'ltr')},[
 h('h1',{style:'font-size:20px'},'미게시 개발본 · npm 1.1.0 설치본과 구분'),
 h('p','이 fixture만 새 로컬 tarball을 사용합니다. npm 게시·공개 문서·소비 앱은 변경하지 않습니다.'),
 h('div',[toggle('disabled','Disabled',disabled),toggle('readonly','Readonly',readonly),toggle('remote','Async',remote),toggle('failure','Fail next request',failure),h('button',{id:'locale',onClick:()=>language.value=language.value==='ko-KR'?'en-US':'ko-KR'},language.value)]),
 h('div',{id:'clip-shell',style:'overflow:hidden;border:1px solid var(--sol-color-border);border-radius:12px;padding:12px'},[
 h('section',{id:'fixture-card'},insideDialog.value?null:widget()),
 ]),h('p',{id:'result',role:'status'},JSON.stringify(values.value)+' · '+last.value+' · '+events.value),
 h('button',{id:'outside'},'Outside'),h('button',{id:'open-dialog',onClick:()=>insideDialog.value=true},'Open containing dialog'),h(SDialog,{id:'fixture-dialog',title:'Containing dialog',modelValue:insideDialog.value,'onUpdate:modelValue':(v:boolean)=>insideDialog.value=v},()=>h('div',{style:'overflow:hidden;padding:12px'},widget())),h('div',{style:'height:700px'},'Scroll boundary')
 ]))})
provideSolLocale(app,computed(()=>({code:language.value})))
app.use(vuetify).mount('#app')
applySolyiAppearance(vuetify.theme,{theme:(q.get('theme')||'violet') as 'violet'|'sage'|'sand',mode:q.get('mode')==='dark'?'dark':'light',density:q.get('density')==='compact'?'compact':'comfortable'})
if(q.get('rtl'))document.documentElement.dir='rtl'

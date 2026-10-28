import {defineComponent,h,ref,watch,nextTick,onBeforeUnmount,onMounted,useId,Teleport} from 'vue'
import type {PropType,SlotsType,VNodeChild} from 'vue'
import {PickerHost} from './picker-host'
import {SProgressLinear,SProgressCircular} from './progress'
import {useVisualViewport} from './viewport'
export interface SolLoadingOverlaySlots {default?:()=>VNodeChild}
/** Display timing never changes the parent's work model. */
export const SLoadingOverlay=/* @__PURE__ */ defineComponent({
 name:'SLoadingOverlay',inheritAttrs:false,
 props:{modelValue:Boolean,title:{type:String,required:true},description:String,scope:{type:String as PropType<'container'|'viewport'>,default:'container'},blocking:{type:Boolean,default:true},kind:{type:String as PropType<'linear'|'circular'>,default:'circular'},delay:{type:Number,default:150},minVisibleMs:{type:Number,default:200},hideContent:Boolean},
 slots:Object as SlotsType<SolLoadingOverlaySlots>,
 emits:{visibleChange:(_visible:boolean)=>true},
 setup(p,{attrs,slots,emit}){
  const visible=ref(false),host=ref<HTMLElement|null>(null),panel=ref<HTMLElement|null>(null),opener=ref<HTMLElement|null>(null),viewport=useVisualViewport(),id='sol-loading-'+useId()
  let timer:ReturnType<typeof setTimeout>|undefined,shownAt=0,disposed=false,revision=0,focused:HTMLElement|null=null,closingOwned=false
  const duration=(value:number,fallback:number)=>Number.isFinite(value)&&value>=0?Math.min(value,2147483647):fallback
  function clear(){if(timer!==undefined)clearTimeout(timer);timer=undefined}
  function restore(){const target=opener.value;if(target?.isConnected&&focused&&typeof document!=='undefined'&&(document.activeElement===focused||focused.contains(document.activeElement)||closingOwned&&!focused.isConnected&&document.activeElement===document.body))target.focus({preventScroll:true});focused=null;closingOwned=false}
  function setVisible(value:boolean){
   if(disposed||visible.value===value)return
   if(value){shownAt=Date.now();opener.value=typeof document!=='undefined'&&document.activeElement instanceof HTMLElement?document.activeElement:null}
   else closingOwned=!!focused&&typeof document!=='undefined'&&(document.activeElement===focused||focused.contains(document.activeElement))
   visible.value=value;emit('visibleChange',value)
  }
  function schedule(){
   clear();const token=++revision
   if(typeof document==='undefined')return
   if(p.modelValue){if(!visible.value){const ms=duration(p.delay,150);if(ms===0)setVisible(true);else timer=setTimeout(()=>{if(token===revision&&p.modelValue)setVisible(true)},ms)}}
   else if(visible.value){const remaining=Math.max(0,duration(p.minVisibleMs,200)-(Date.now()-shownAt));if(remaining===0)setVisible(false);else timer=setTimeout(()=>{if(token===revision&&!p.modelValue)setVisible(false)},remaining)}
  }
  watch(()=>[p.modelValue,p.delay,p.minVisibleMs],schedule,{immediate:true})
  watch(()=>[visible.value,p.blocking,p.scope,p.hideContent],async()=>{
   const local=p.scope==='container'||!p.blocking
   if(!visible.value||!(p.blocking||p.hideContent)||!local){await nextTick();if(local)restore();return}
   const target=opener.value;await nextTick()
   if(visible.value&&(p.blocking||p.hideContent)&&(p.scope==='container'||!p.blocking)&&target&&host.value?.contains(target)){focused=panel.value;focused?.focus({preventScroll:true})}
  },{immediate:true})
  onMounted(schedule)
  onBeforeUnmount(()=>{clear();revision++;if(p.scope==='container')restore();disposed=true})
  const key=(event:KeyboardEvent)=>{if(visible.value&&p.blocking&&event.key==='Escape'&&!event.isComposing){event.preventDefault();event.stopPropagation()}}
  const content=()=>h('div',{ref:panel,class:'sol-ui-loading-panel',tabindex:-1,role:p.scope==='container'||!p.blocking?'status':undefined,'aria-live':'polite','aria-atomic':'true',onKeydown:key},[
   h(p.kind==='linear'?SProgressLinear:SProgressCircular,{id:id+'-progress',label:p.title,state:'indeterminate',size:48,showLabel:false,showMessage:false,showValue:false}),
   h('strong',{id:id+'-title'},p.title),p.description?h('p',{id:id+'-description'},p.description):null,
  ])
  return()=>h('div',{...attrs,ref:host,class:['sol-ui-loading',attrs.class],'aria-busy':String(p.modelValue)},[
   h('div',{class:'sol-ui-loading-content',inert:visible.value&&(p.blocking||p.hideContent)||undefined,'aria-hidden':visible.value&&p.hideContent?'true':undefined,style:visible.value&&p.hideContent?{visibility:'hidden'}:undefined},[slots.default?.()]),
   visible.value?(p.scope==='container'?h('div',{class:['sol-ui-loading-container-layer',!p.blocking?'sol-ui-loading-nonblocking':undefined],onKeydown:key},[content()]):p.blocking?h(PickerHost,{open:true,id:id+'-dialog',anchor:host.value,returnFocus:opener.value,presentation:'dialog',labelledby:id+'-title',describedby:p.description?id+'-description':undefined,dismissible:false,panelClass:'sol-ui-loading-host',initialFocus:()=>panel.value},()=>content()):h(Teleport,{to:host.value?.closest('.v-overlay__content,dialog')||'body'},[h('div',{class:'sol-ui-loading-nonblocking sol-ui-loading-viewport',style:viewport.value?{top:viewport.value.top+'px',left:viewport.value.left+'px',width:viewport.value.width+'px',height:viewport.value.height+'px',right:'auto',bottom:'auto'}:undefined},[content()])])):null,
  ])
 },
})

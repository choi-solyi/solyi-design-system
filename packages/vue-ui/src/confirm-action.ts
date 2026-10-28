import {defineComponent,h,ref,watch,onBeforeUnmount,useId,nextTick} from 'vue'
import type {PropType,SlotsType,VNodeChild} from 'vue'
import {SBtn} from './button'
import type {ButtonVariant,SButtonTone} from './button'

export type SolConfirmCancelReason='timeout'|'blur'|'escape'|'disabled'|'loading'|'error'|'configuration'|'reset'|'unmount'
export interface SolConfirmActionHandle {focus():void;reset():void}
export interface SolConfirmActionScope {readonly armed:boolean;readonly disabled:boolean;readonly loading:boolean}
export interface SolConfirmActionSlots {leading?:(scope:SolConfirmActionScope)=>VNodeChild}

/** Local intent only. The caller owns async work, loading, errors and all side effects. */
export const SConfirmAction=/* @__PURE__ */ defineComponent({
 name:'SConfirmAction',inheritAttrs:false,
 props:{
  label:{type:String,required:true},confirmLabel:{type:String,required:true},
  timeout:{type:Number,default:5000},cancelOnBlur:{type:Boolean,default:true},
  disabled:Boolean,loading:Boolean,error:{type:String,default:''},
  variant:{type:String as PropType<ButtonVariant>,default:'secondary'},tone:String as PropType<SButtonTone>,
 },
 slots:Object as SlotsType<SolConfirmActionSlots>,
 emits:{confirm:(_event:MouseEvent)=>true,cancel:(_reason:SolConfirmCancelReason)=>true,armedChange:(_armed:boolean)=>true},
 setup(p,{attrs,slots,emit,expose}){
  const armed=ref(false),announcement=ref(''),minimum=ref<number>(),button=ref<{$el?:HTMLElement}|null>(null),id=useId()
  let timer:ReturnType<typeof setTimeout>|undefined,disposed=false,activating=false
  const unavailable=()=>p.disabled||p.loading||attrs['aria-disabled']===true||attrs['aria-disabled']==='true'
  function stop(){if(timer!==undefined)clearTimeout(timer);timer=undefined}
  function cancel(reason:SolConfirmCancelReason){
   stop();minimum.value=undefined
   if(!armed.value)return
   armed.value=false;announcement.value=p.label;emit('armedChange',false);emit('cancel',reason)
  }
  function activate(event:MouseEvent){
   event.preventDefault()
   if(disposed||unavailable()||activating)return
   activating=true;void nextTick(()=>{activating=false})
   if(armed.value){stop();armed.value=false;minimum.value=undefined;announcement.value='';emit('armedChange',false);emit('confirm',event);return}
   minimum.value=button.value?.$el?.getBoundingClientRect().width
   armed.value=true;announcement.value=p.confirmLabel;emit('armedChange',true)
   const timeout=Number.isFinite(p.timeout)&&p.timeout>=0?Math.min(p.timeout,2147483647):5000
   if(timeout>0)timer=setTimeout(()=>cancel('timeout'),timeout)
  }
  function key(event:KeyboardEvent){
   if((event.isComposing||event.repeat)&&(event.key==='Enter'||event.key===' ')){event.preventDefault();return}
   if(event.key==='Escape'&&!event.isComposing&&armed.value){event.preventDefault();event.stopPropagation();cancel('escape')}
  }
  watch(()=>[p.disabled,p.loading],()=>{if(p.disabled||p.loading)cancel(p.disabled?'disabled':'loading')})
  watch(()=>[p.label,p.confirmLabel,p.timeout,p.cancelOnBlur],()=>cancel('configuration'))
  watch(()=>p.error,error=>{if(error)cancel('error')})
  onBeforeUnmount(()=>{cancel('unmount');disposed=true;stop()})
  expose({focus:()=>{if(!disposed)button.value?.$el?.focus()},reset:()=>{if(!disposed){cancel('reset');announcement.value=''}}} satisfies SolConfirmActionHandle)
  return()=>{
   const {href:_href,to:_to,type:_type,...buttonAttrs}=attrs
   const scope:SolConfirmActionScope={armed:armed.value,disabled:unavailable(),loading:p.loading}
   return h('span',{class:'sol-ui-confirm-action','data-armed':String(armed.value)},[
    h(SBtn,{...buttonAttrs,ref:button,type:'button',variant:p.variant,tone:p.tone,disabled:p.disabled,loading:p.loading,
     style:[attrs.style,minimum.value?{minInlineSize:`min(${minimum.value}px,100%)`}:undefined],
     'aria-describedby':[attrs['aria-describedby'],p.error?id+'-error':''].filter(Boolean).join(' ')||undefined,
     onClick:activate,onKeydown:key,onBlur:()=>{if(p.cancelOnBlur)cancel('blur')},
    },()=>[slots.leading?.(scope),h('span',armed.value?p.confirmLabel:p.label)]),
    h('span',{class:'sol-ui-sr-only',role:'status','aria-live':'polite','aria-atomic':'true'},announcement.value),
    p.error?h('span',{id:id+'-error',class:'sol-error',role:'alert'},p.error):null,
   ])
  }
 },
})

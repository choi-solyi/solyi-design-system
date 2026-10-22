import {computed,defineComponent,h,nextTick,onBeforeUnmount,onMounted,ref,watch} from 'vue';
import type {PropType} from 'vue';
import {SBtn} from './index';
import {useFloatingPanel} from './floating';
import {useSolLocale} from './locale';
import type {SolLocale} from './locale';

export type SDisclosureCloseReason='escape'|'outside'|'focus'|'trigger'|'close'|'disabled'|'programmatic';
const disclosureProps={id:{type:String,required:true as const},label:{type:String,required:true as const},modelValue:{type:Boolean,default:undefined},disabled:Boolean,readonly:Boolean,locale:Object as PropType<Partial<SolLocale>>};
const disclosureEmits={'update:modelValue':(_value:boolean)=>true,open:()=>true,close:(_reason:SDisclosureCloseReason)=>true};

export const STooltip=defineComponent({name:'STooltip',inheritAttrs:false,props:{...disclosureProps,text:{type:String,required:true}},emits:disclosureEmits,setup(p,{attrs,slots,emit}){
  const local=ref(false),root=ref<HTMLElement|null>(null),anchor=ref<HTMLElement|null>(null),panel=ref<HTMLElement|null>(null);
  const open=computed(()=>!p.disabled&&!p.readonly&&(p.modelValue??local.value));
  const {position}=useFloatingPanel(open,anchor,panel);
  let hovered=false,focused=false,timer:ReturnType<typeof setTimeout>|undefined,reason:SDisclosureCloseReason='programmatic';
  function request(value:boolean,why:SDisclosureCloseReason='programmatic'){if(value&&(p.disabled||p.readonly))return;reason=why;if(p.modelValue===undefined)local.value=value;emit('update:modelValue',value);}
  function enter(){clearTimeout(timer);hovered=true;request(true);}
  function leave(){hovered=false;clearTimeout(timer);timer=setTimeout(()=>{if(!hovered&&!focused)request(false,'outside');},120);}
  function focus(){focused=true;clearTimeout(timer);request(true);}
  function blur(){focused=false;if(!hovered)request(false,'focus');}
  function escape(e:KeyboardEvent){if(e.key==='Escape'&&open.value){e.preventDefault();e.stopPropagation();request(false,'escape');}}
  const outside=(e:Event)=>{if(open.value&&!root.value?.contains(e.target as Node))request(false,'outside');};
  watch(open,(value,old)=>{if(value)emit('open');else if(old)emit('close',reason);});
  watch(()=>[p.disabled,p.readonly],()=>{if(p.disabled||p.readonly)request(false,'disabled');});
  onMounted(()=>document.addEventListener('pointerdown',outside));onBeforeUnmount(()=>{clearTimeout(timer);document.removeEventListener('pointerdown',outside);});
  return()=>{
    const trigger={id:p.id+'-trigger',disabled:p.disabled,'aria-disabled':p.readonly?'true':undefined,'aria-describedby':[attrs['aria-describedby'],open.value?p.id:undefined].filter(Boolean).join(' ')||undefined,onPointerenter:enter,onPointerleave:leave,onFocus:focus,onBlur:blur,onClick:()=>request(true),onKeydown:escape};
    return h('span',{...attrs,ref:root,class:['sol-ui-disclosure',attrs.class],onKeydown:escape},[
      h('span',{ref:anchor,class:'sol-ui-activator'},slots.activator?.({props:trigger})||h(SBtn,trigger,()=>p.label)),
      h('span',{id:p.id,ref:panel,popover:'manual',role:'tooltip',hidden:!open.value,class:'sol-tooltip sol-ui-floating',style:position.value,onPointerenter:enter,onPointerleave:leave},p.text)
    ]);
  };
}});

export const SPopover=defineComponent({name:'SPopover',inheritAttrs:false,props:{...disclosureProps,title:{type:String,required:true}},emits:disclosureEmits,setup(p,{attrs,slots,emit}){
  const l=useSolLocale(()=>p.locale),local=ref(false),root=ref<HTMLElement|null>(null),anchor=ref<HTMLElement|null>(null),panel=ref<HTMLElement|null>(null),closeButton=ref<{$el?:HTMLElement}|null>(null);
  const open=computed(()=>!p.disabled&&!p.readonly&&(p.modelValue??local.value));
  const {position}=useFloatingPanel(open,anchor,panel);
  let opener:HTMLElement|null=null,reason:SDisclosureCloseReason='programmatic',restore=true,disposed=false;
  function request(value:boolean,why:SDisclosureCloseReason='programmatic',returnFocus=true){if(value&&(p.disabled||p.readonly))return;if(value)opener=document.activeElement instanceof HTMLElement?document.activeElement:null;reason=why;restore=returnFocus;if(p.modelValue===undefined)local.value=value;emit('update:modelValue',value);}
  function escape(e:KeyboardEvent){if(e.key==='Escape'&&open.value){e.preventDefault();e.stopPropagation();request(false,'escape');}}
  const outside=(e:Event)=>{if(open.value&&!root.value?.contains(e.target as Node))request(false,'outside',false);};
  function focusout(e:FocusEvent){const next=e.relatedTarget as Node|null;if(next&&!root.value?.contains(next))request(false,'focus',false);}
  watch(open,async(value,old)=>{
    if(value){if(!opener)opener=document.activeElement instanceof HTMLElement?document.activeElement:null;await nextTick();if(disposed||!open.value)return;closeButton.value?.$el?.focus({preventScroll:true});emit('open');}
    else if(old){const prior=document.activeElement,inside=!!panel.value?.contains(prior);await nextTick();if(!disposed&&restore&&inside&&(document.activeElement===prior||document.activeElement===document.body)&&opener?.isConnected)opener.focus({preventScroll:true});opener=null;emit('close',reason);}
  },{immediate:true});
  watch(()=>[p.disabled,p.readonly],()=>{if(p.disabled||p.readonly)request(false,'disabled');});
  onMounted(()=>document.addEventListener('pointerdown',outside));onBeforeUnmount(()=>{disposed=true;document.removeEventListener('pointerdown',outside);if(open.value&&panel.value?.contains(document.activeElement)&&opener?.isConnected)opener.focus({preventScroll:true});});
  return()=>{
    const trigger={id:p.id+'-trigger',disabled:p.disabled,'aria-disabled':p.readonly?'true':undefined,'aria-expanded':String(open.value),'aria-controls':p.id,'aria-haspopup':'dialog',onClick:()=>request(!open.value,'trigger'),onKeydown:escape};
    return h('div',{...attrs,ref:root,class:['sol-ui-disclosure',attrs.class],onKeydown:escape,onFocusout:focusout},[
      h('span',{ref:anchor,class:'sol-ui-activator'},slots.activator?.({props:trigger})||h(SBtn,trigger,()=>p.label)),
      h('section',{id:p.id,ref:panel,popover:'manual',hidden:!open.value,role:'dialog','aria-modal':'false','aria-labelledby':p.id+'-title',class:'sol-ui-floating sol-ui-popover',style:position.value},[
        h('header',{class:'sol-ui-popover-heading'},[h('h3',{id:p.id+'-title'},p.title),h(SBtn,{ref:closeButton,variant:'inline',onClick:()=>request(false,'close')},()=>l.value.close)]),
        h('div',{class:'sol-ui-popover-body'},slots.default?.()),slots.actions?h('div',{class:'sol-actions'},slots.actions()):null
      ])
    ]);
  };
}});

export const SAccordion=defineComponent({name:'SAccordion',inheritAttrs:false,props:disclosureProps,emits:{'update:modelValue':(_value:boolean)=>true,change:(_value:boolean)=>true},setup(p,{attrs,slots,emit}){
  const local=ref(false),open=computed(()=>p.modelValue??local.value);
  function toggle(e:MouseEvent){e.preventDefault();if(p.disabled||p.readonly)return;const value=!open.value;if(p.modelValue===undefined)local.value=value;emit('update:modelValue',value);emit('change',value);}
  return()=>h('details',{...attrs,id:p.id,open:open.value,class:['sol-accordion',attrs.class]},[
    h('summary',{id:p.id+'-summary','aria-controls':p.id+'-content','aria-disabled':p.disabled||p.readonly?'true':undefined,tabindex:p.disabled?-1:0,onClick:toggle},p.label),
    h('div',{id:p.id+'-content',class:'sol-accordion-content'},slots.default?.())
  ]);
}});

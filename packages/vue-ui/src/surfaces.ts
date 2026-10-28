import {defineComponent,h,useId} from 'vue';
import type {PropType,SlotsType,VNodeChild} from 'vue';
import {SIcon} from './primitives';
import type {SolIconName} from '@solyi/core/icons';
export interface SolCardSlots {default?:()=>VNodeChild;leading?:()=>VNodeChild;title?:()=>VNodeChild;description?:()=>VNodeChild;meta?:()=>VNodeChild;actions?:()=>VNodeChild}
export const SCard=/* @__PURE__ */ defineComponent({
 name:'SCard',inheritAttrs:false,
 props:{id:String,title:String,description:String,eyebrow:String,headingLevel:{type:Number as PropType<2|3|4>,default:3}},
 slots:Object as SlotsType<SolCardSlots>,
 setup(p,{attrs,slots}){const fallback=useId();return()=>{
  const titleId=(p.id||'sol-card-'+fallback)+'-title',hasTitle=!!(p.title||slots.title);
  return h('article',{...attrs,id:p.id,class:['sol-card sol-ui-card',attrs.class],'aria-labelledby':attrs['aria-labelledby']||(hasTitle?titleId:undefined)},[
   hasTitle||p.eyebrow||p.description||slots.leading||slots.description||slots.meta?h('header',{class:'sol-ui-card-header'},[
    slots.leading?h('div',{class:'sol-ui-card-leading'},[slots.leading()]):null,
    h('div',{class:'sol-surface-heading'},[p.eyebrow?h('span',{class:'eyebrow'},p.eyebrow):null,hasTitle?h('h'+p.headingLevel,{id:titleId},[slots.title?.()||p.title]):null,slots.description||p.description?h('div',{class:'sol-ui-card-description'},[slots.description?.()||p.description]):null]),
    slots.meta?h('div',{class:'sol-ui-card-meta'},[slots.meta()]):null,
   ]):null,
   slots.default?.(),slots.actions?h('div',{class:'sol-ui-card-actions'},[slots.actions()]):null,
  ]);
 }},
});
export interface SolEmptyStateSlots {icon?:()=>VNodeChild;description?:()=>VNodeChild;actions?:()=>VNodeChild}
export const SEmptyState=/* @__PURE__ */ defineComponent({
 name:'SEmptyState',inheritAttrs:false,
 props:{id:String,title:{type:String,required:true},description:String,icon:String as PropType<SolIconName>,variant:{type:String as PropType<'card'|'page'>,default:'card'},headingLevel:{type:Number as PropType<2|3|4>,default:3},minBlockSize:[String,Number]},
 slots:Object as SlotsType<SolEmptyStateSlots>,
 setup(p,{attrs,slots}){const fallback=useId();return()=>{
  const titleId=(p.id||'sol-empty-'+fallback)+'-title',minimum=typeof p.minBlockSize==='number'?(Number.isFinite(p.minBlockSize)?Math.max(0,p.minBlockSize)+'px':undefined):p.minBlockSize;
  return h('section',{...attrs,id:p.id,class:['sol-ui-empty-state',p.variant==='card'?'sol-card':'sol-ui-empty-state--page',attrs.class],style:[{minBlockSize:minimum},attrs.style],'aria-labelledby':attrs['aria-labelledby']||titleId},[
   slots.icon||p.icon?h('div',{class:'sol-ui-empty-state-icon'},[slots.icon?.()||(p.icon?h(SIcon,{name:p.icon,size:24,decorative:true}):null)]):null,
   h('h'+p.headingLevel,{id:titleId},p.title),
   slots.description||p.description?h('div',{class:'sol-ui-empty-state-description'},[slots.description?.()||p.description]):null,
   slots.actions?h('div',{class:'sol-ui-empty-state-actions'},[slots.actions()]):null,
  ]);
 }},
});
export const SAlert=/* @__PURE__ */ defineComponent({name:'SAlert',inheritAttrs:false,props:{title:String,tone:{type:String as PropType<'accent'|'info'|'success'|'warning'|'danger'>,default:'info'},live:{type:String as PropType<'off'|'polite'|'assertive'>,default:'off'}},setup(p,{attrs,slots}){return()=>h('div',{...attrs,class:['sol-notice sol-tone sol-tone-notice sol-ui-alert',attrs.class],'data-tone':p.tone,role:p.live==='assertive'?'alert':p.live==='polite'?'status':attrs.role,'aria-live':p.live==='off'?undefined:p.live,'aria-atomic':p.live==='off'?undefined:'true'},[p.title?h('strong',p.title):null,slots.default?.(),slots.actions?h('div',{class:'sol-notice-actions'},slots.actions()):null]);}});

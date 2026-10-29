import {defineComponent,h,nextTick,ref} from 'vue'
import type {PropType} from 'vue'
import {SBtn} from './button'
import {SIcon} from './primitives'
import {useRtl} from 'vuetify'
import {useSolLocale,formatSolNumber} from './locale'
import type {SolLocale} from './locale'
import {paginationCount,paginationPage,paginationRange} from './pagination-values'
export interface SolPaginationHandle {focus():void}
export const SPagination=/* @__PURE__ */ defineComponent({
 name:'SPagination',inheritAttrs:false,
 props:{modelValue:{type:Number,default:1},pageCount:{type:Number,default:1},siblingCount:{type:Number,default:1},compactPagination:Boolean,label:String,disabled:Boolean,loading:Boolean,locale:Object as PropType<Partial<SolLocale>>},
 emits:{'update:modelValue':(_page:number)=>true},
 setup(p,{attrs,emit,expose}){
  const l=useSolLocale(()=>p.locale),host=ref<HTMLElement|null>(null),{isRtl}=useRtl()
  const focus=()=>host.value?.querySelector<HTMLElement>('button[aria-current="page"]:not(:disabled),button:not(:disabled)')?.focus()
  expose({focus} satisfies SolPaginationHandle)
  async function move(page:number,event:MouseEvent){
   const count=paginationCount(p.pageCount),current=paginationPage(p.modelValue,count),next=paginationPage(page,count)
   if(p.disabled||p.loading||!count||next===current)return
   const owner=event.currentTarget as HTMLElement;emit('update:modelValue',next);await nextTick()
   if(!owner.isConnected&&document.activeElement===document.body)focus()
  }
  return()=>{
   const count=paginationCount(p.pageCount),current=paginationPage(p.modelValue,count),pages=paginationRange(current,count,p.siblingCount),unavailable=p.disabled||p.loading||!count
   const edge=(direction:'first'|'previous'|'next'|'last')=>{
    const previous=direction==='first'||direction==='previous',target=direction==='first'?1:direction==='last'?count:current+(previous?-1:1)
    const label=direction==='first'?(l.value.firstPage||l.value.pageLabel(1,count)):direction==='last'?(l.value.lastPage||l.value.pageLabel(count,count)):previous?l.value.previousPage:l.value.nextPage
    return h(SBtn,{key:direction,class:'sol-ui-pagination-edge','data-edge':direction,'aria-label':label,disabled:unavailable||(previous?current<=1:current>=count),onClick:(event:MouseEvent)=>void move(target,event)},()=>Array.from({length:direction==='first'||direction==='last'?2:1},()=>h(SIcon,{name:'chevron',size:16,rotate:(previous!==isRtl.value)?90:270,decorative:true})))
   }
   return h('div',{...attrs,ref:host,class:['sol-ui-pagination',attrs.class],'aria-busy':p.loading?'true':undefined},[
    h('nav',{class:'sol-pagination','data-compact':p.compactPagination?'true':undefined,'aria-label':p.label||attrs['aria-label']||l.value.pages(l.value.record)},[
     edge('first'),edge('previous'),...pages.flatMap((page,index)=>[index&&page-pages[index-1]>1?h('span',{key:'gap-'+page,class:'sol-ui-pagination-gap','aria-hidden':'true'},'…'):null,h(SBtn,{key:page,class:'sol-ui-pagination-number','aria-label':l.value.pageLabel(page,count),'aria-current':page===current?'page':undefined,disabled:unavailable,onClick:(event:MouseEvent)=>void move(page,event)},()=>formatSolNumber(page,l.value))]),edge('next'),edge('last'),
    ]),
    h('p',{class:'sol-ui-hint',role:'status'},count?l.value.pageLabel(current,count):l.value.paginationEmpty||l.value.noResults),
   ])
  }
 },
})

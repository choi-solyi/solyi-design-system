import {defineComponent, h, ref, watch, nextTick, onBeforeUnmount, onMounted, useId} from 'vue';
import type {PropType, Component, App, VNode} from 'vue';
import {VBtn} from 'vuetify/components/VBtn';
import {VTextField} from 'vuetify/components/VTextField';
import {VDialog} from 'vuetify/components/VDialog';
import {mountOverflowText} from '@solyi/core/overflow';
import {solIconPaths} from '@solyi/core/icons';
import './styles.css';

export const uiVersion='0.1.3';
function uiIcon(name:'chevron'|'close',direction?:'previous'|'next'):VNode {
  const size=name==='close'?16:20;
  return h('svg',{class:['sol-icon','sol-ui-icon',size===16?'sol-ui-icon--small':undefined,direction?'sol-ui-icon--'+direction:undefined],viewBox:'0 0 24 24',width:size,height:size,fill:'none',stroke:'currentColor','stroke-width':1.6,'stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true',focusable:'false'},h('path',{d:solIconPaths[name]}));
}
export type ButtonVariant='primary'|'secondary'|'subtle'|'inline';
export const SolButton=defineComponent({
  name:'SolButton', inheritAttrs:false,
  props:{variant:{type:String as PropType<ButtonVariant>,default:'secondary'},disabled:Boolean,loading:Boolean,type:{type:String as PropType<'button'|'submit'|'reset'>,default:'button'}},
  emits:{click:(_event:MouseEvent)=>true},
  setup(props,{attrs,slots,emit}){return()=>h(VBtn as Component,{...attrs,class:['sol-ui-button','sol-ui-button--'+props.variant,attrs.class],type:props.type,disabled:props.disabled,'aria-disabled':props.loading?'true':undefined,'aria-busy':props.loading?'true':undefined,ripple:false,variant:'flat',onClick:(e:MouseEvent)=>{if(props.loading){e.preventDefault();return;}emit('click',e);}},()=>[props.loading?h('span',{class:'sol-ui-busy','aria-hidden':'true'},'◷'):null,slots.default?.()]);}
});

export const SolField=defineComponent({
  name:'SolField',inheritAttrs:false,
  props:{id:{type:String,required:true},label:{type:String,required:true},modelValue:{type:String,default:''},help:{type:String,default:''},error:{type:String,default:''},disabled:Boolean,required:Boolean,type:{type:String as PropType<'text'|'search'|'email'|'password'|'tel'|'url'>,default:'text'}},
  emits:{'update:modelValue':(_value:string)=>true},
  setup(props,{attrs,emit}){const field=ref<{focus?:()=>void}|null>(null);return()=>h('div',{class:'sol-ui-field'},[
    h('label',{for:props.id,class:'sol-ui-label'},[props.label,props.required?' (필수)':'']),
    h(VTextField as Component,{...attrs,ref:field,id:props.id,modelValue:props.modelValue,'onUpdate:modelValue':(value:unknown)=>emit('update:modelValue',String(value??'')),type:props.type,disabled:props.disabled,required:props.required,error:!!props.error,'aria-invalid':String(!!props.error),'aria-describedby':[props.help&&props.id+'-help',props.error&&props.id+'-error',attrs['aria-describedby']].filter(Boolean).join(' ')||undefined,hideDetails:true,variant:'outlined',density:'compact',class:['sol-ui-input',attrs.class]}),
    props.help?h('p',{id:props.id+'-help',class:'sol-ui-hint'},props.help):null,
    props.error?h('p',{id:props.id+'-error',class:'sol-ui-error',role:'alert'},props.error):null
  ]);}
});

export const SolDialog=defineComponent({
  name:'SolDialog',inheritAttrs:false,
  props:{id:{type:String,required:true},title:{type:String,required:true},modelValue:Boolean,maxWidth:{type:[Number,String],default:480},closeLabel:{type:String,default:'닫기'},returnFocus:{type:Object as PropType<HTMLElement|null>,default:null}},
  emits:{'update:modelValue':(_value:boolean)=>true,close:()=>true},
  setup(props,{attrs,slots,emit}){
    const close=ref<{ $el?:HTMLElement }|null>(null);let opener:HTMLElement|null=null;
    const restore=()=>{const target=props.returnFocus||opener;if(target?.isConnected)target.focus({preventScroll:true});};
    watch(()=>props.modelValue,async(value,old)=>{if(value){opener=document.activeElement instanceof HTMLElement?document.activeElement:null;await nextTick();close.value?.$el?.focus();}else if(old){await nextTick();restore();emit('close');}},{immediate:true});
    onBeforeUnmount(()=>{if(props.modelValue)restore();});
    return()=>h(VDialog as Component,{...attrs,modelValue:props.modelValue,'onUpdate:modelValue':(value:boolean)=>emit('update:modelValue',value),maxWidth:props.maxWidth,transition:false,'aria-labelledby':props.id+'-title',class:['sol-ui-overlay',attrs.class]},()=>h('section',{class:'sol-ui-dialog',id:props.id},[
      h('div',{class:'sol-ui-dialog-heading'},[h('h2',{id:props.id+'-title'},props.title),h(SolButton,{id:props.id+'-close',ref:close,variant:'inline',autofocus:true,'aria-label':props.closeLabel,onClick:()=>emit('update:modelValue',false)},()=>[props.closeLabel,uiIcon('close')])]),
      h('div',{class:'sol-ui-dialog-body'},slots.default?.()),slots.actions?h('div',{class:'sol-ui-dialog-actions'},slots.actions()):null
    ]));
  }
});

export interface TableColumn {key:string;label:string;width?:string;align?:'start'|'end';sortable?:boolean;ellipsis?:boolean}
export interface TableRow {id:string;[key:string]:unknown}
export interface TableSort {key:string;direction:'ascending'|'descending'}
export const SolTable=defineComponent({
  name:'SolTable',inheritAttrs:false,
  props:{columns:{type:Array as PropType<TableColumn[]>,required:true},rows:{type:Array as PropType<TableRow[]>,required:true},caption:{type:String,required:true},selected:{type:Array as PropType<string[]>,default:()=>[]},selectable:Boolean,sort:{type:Object as PropType<TableSort|null>,default:null},page:{type:Number,default:1},pageCount:{type:Number,default:1},loading:Boolean,error:{type:String,default:''},emptyText:{type:String,default:'조건에 맞는 자료가 없어요.'}},
  emits:{'update:selected':(_ids:string[])=>true,'update:sort':(_sort:TableSort)=>true,'update:page':(_page:number)=>true,retry:()=>true,rowAction:(_row:TableRow)=>true},
  setup(props,{attrs,slots,emit}){
    const host=ref<HTMLElement|null>(null),all=ref<HTMLInputElement|null>(null),allMobile=ref<HTMLInputElement|null>(null),preview=ref<TableRow|null>(null),previewOpener=ref<HTMLElement|null>(null),previewId='sol-table-'+useId();let cleanup=()=>{};
    onMounted(()=>{if(host.value)cleanup=mountOverflowText(host.value);});
    function choose(id:string,checked:boolean){const ids=new Set(props.selected);checked?ids.add(id):ids.delete(id);emit('update:selected',[...ids]);}
    function selectPage(checked:boolean){const ids=new Set(props.selected);for(const row of props.rows)checked?ids.add(row.id):ids.delete(row.id);emit('update:selected',[...ids]);}
    async function move(page:number){emit('update:page',page);await nextTick();host.value?.querySelector<HTMLElement>('.sol-pagination [aria-current="page"]')?.focus();}
    watch(()=>[props.rows,props.selected],async()=>{await nextTick();for(const input of [all.value,allMobile.value])if(input)input.indeterminate=props.rows.some(r=>props.selected.includes(r.id))&&!props.rows.every(r=>props.selected.includes(r.id));},{immediate:true});
    onBeforeUnmount(()=>cleanup());
    const cell=(row:TableRow,c:TableColumn):VNode=>h('span',{class:c.ellipsis===false?'':'sol-ellipsis sol-ui-cell-clip'},slots['cell-'+c.key]?.({row,value:row[c.key]})||String(row[c.key]??'—'));
    const action=(row:TableRow)=>h(SolButton,{variant:'inline','aria-label':String(row[props.columns[0]?.key]??'자료')+' 전체 내용 보기',onClick:(e:MouseEvent)=>{previewOpener.value=e.currentTarget as HTMLElement;preview.value=row;emit('rowAction',row);}},()=> '상세');
    const busy=()=>props.loading||!!props.error;
    return()=>{const safePage=Math.max(1,Math.min(props.page,Math.max(1,props.pageCount))),count=Math.max(1,props.pageCount);const pageNumbers=[...new Set([1,safePage-1,safePage,safePage+1,count])].filter(n=>n>0&&n<=count).sort((a,b)=>a-b);return h('div',{...attrs,ref:host,class:['sol-ui-table',attrs.class],'aria-busy':String(props.loading)},[
      h('div',{class:'sol-ui-table-desktop'},h('table',{class:'sol-data-table'},[
        h('caption',props.caption),h('colgroup',[props.selectable?h('col',{style:{width:'48px'}}):null,...props.columns.map(c=>h('col',{style:{width:c.width}})),h('col',{style:{width:'72px'}})]),
        h('thead',h('tr',[props.selectable?h('th',{scope:'col'},h('input',{ref:all,type:'checkbox','aria-label':'현재 페이지 모두 선택',checked:!!props.rows.length&&props.rows.every(r=>props.selected.includes(r.id)),disabled:busy()||!props.rows.length,onChange:(e:Event)=>selectPage((e.target as HTMLInputElement).checked)})):null,...props.columns.map(c=>h('th',{scope:'col',style:{textAlign:c.align},'aria-sort':c.sortable?(props.sort?.key===c.key?props.sort.direction:'none'):undefined},c.sortable?h(SolButton,{variant:'subtle',class:'sol-sort-button',disabled:busy(),onClick:()=>emit('update:sort',{key:c.key,direction:props.sort?.key===c.key&&props.sort.direction==='ascending'?'descending':'ascending'})},()=>[c.label,h('span',{'aria-hidden':'true',class:'sol-sort-symbol'},props.sort?.key===c.key?(props.sort.direction==='ascending'?'↑':'↓'):'↕')]):c.label)),h('th',{scope:'col'},'상세')])),
        h('tbody',!busy()?props.rows.map(row=>h('tr',{key:row.id,'data-row-id':row.id,'data-selected':props.selected.includes(row.id)},[props.selectable?h('td',h('input',{type:'checkbox','aria-label':String(row[props.columns[0]?.key]??'자료')+' 선택',checked:props.selected.includes(row.id),onChange:(e:Event)=>choose(row.id,(e.target as HTMLInputElement).checked)})):null,...props.columns.map(c=>h('td',{style:{textAlign:c.align}},cell(row,c))),h('td',action(row))])):[])
      ])),
      h('p',{class:'sol-ui-table-mobile-caption'},props.caption),
      props.selectable?h('label',{class:'sol-choice sol-ui-table-mobile-select'},[h('input',{ref:allMobile,type:'checkbox',checked:!!props.rows.length&&props.rows.every(r=>props.selected.includes(r.id)),disabled:busy()||!props.rows.length,onChange:(e:Event)=>selectPage((e.target as HTMLInputElement).checked)}),'현재 페이지 모두 선택']):null,
      h('ul',{class:'sol-ui-table-mobile','aria-label':props.caption},!busy()?props.rows.map(row=>h('li',{key:row.id,'data-row-id':row.id,'data-selected':props.selected.includes(row.id)},[props.selectable?h('label',{class:'sol-choice'},[h('input',{type:'checkbox','aria-label':String(row[props.columns[0]?.key]??'자료')+' 선택',checked:props.selected.includes(row.id),onChange:(e:Event)=>choose(row.id,(e.target as HTMLInputElement).checked)}),'자료 선택']):null,h('dl',props.columns.flatMap(c=>[h('dt',c.label),h('dd',cell(row,c))])),h('div',{class:'sol-ui-table-mobile-actions'},action(row))])):[]),
      props.loading?h('p',{role:'status',class:'sol-ui-hint'},'자료를 불러오는 중이에요.'):props.error?h('div',{role:'alert',class:'sol-notice danger'},[h('p',props.error),h(SolButton,{variant:'inline',onClick:()=>emit('retry')},()=> '다시 시도')]):!props.rows.length?h('p',{role:'status',class:'sol-ui-hint'},props.emptyText):null,
      h('div',{class:'sol-ui-table-footer'},[
        h('nav',{'aria-label':props.caption+' 페이지',class:'sol-pagination'},[h(SolButton,{class:'sol-ui-page-icon',disabled:busy()||safePage===1,'aria-label':'이전 페이지',onClick:()=>move(safePage-1)},()=>uiIcon('chevron','previous')),...pageNumbers.flatMap((n,i)=>[i&&n-pageNumbers[i-1]>1?h('span',{'aria-hidden':'true',class:'sol-ui-page-gap'},'…'):null,h(SolButton,{'aria-label':n+'페이지, 전체 '+count+'페이지','aria-current':n===safePage?'page':undefined,disabled:busy(),class:['sol-page-button',Math.abs(n-safePage)>1?'sol-ui-page-edge':''],onClick:()=>move(n)},()=>String(n))]),h(SolButton,{class:'sol-ui-page-icon',disabled:busy()||safePage===count,'aria-label':'다음 페이지',onClick:()=>move(safePage+1)},()=>uiIcon('chevron','next'))]),
      h('p',{role:'status',class:'sol-ui-hint'},safePage+' / '+count+'페이지 · 전체 선택 '+props.selected.length+'개')
      ]),
      h(SolDialog,{id:previewId,title:'자료 전체 내용',modelValue:!!preview.value,returnFocus:previewOpener.value,'onUpdate:modelValue':(value:boolean)=>{if(!value)preview.value=null;}},()=>preview.value?h('dl',{class:'sol-ui-detail'},props.columns.flatMap(c=>[h('dt',c.label),h('dd',String(preview.value?.[c.key]??'—'))])):null)
    ]);};
  }
});

export function install(app:App){for(const component of [SolButton,SolField,SolDialog,SolTable])app.component(component.name!,component);}
export default {install};

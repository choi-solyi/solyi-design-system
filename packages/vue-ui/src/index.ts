import {defineComponent, h, ref, watch, nextTick, onBeforeUnmount, onMounted, useId} from 'vue';
import type {PropType, Component, App, VNode} from 'vue';
import {VBtn} from 'vuetify/components/VBtn';
import {VTextField} from 'vuetify/components/VTextField';
import {VDialog} from 'vuetify/components/VDialog';
import {mountOverflowText} from '@solyi/core/overflow';
import {solIconPaths} from '@solyi/core/icons';
import './styles.css';
import {SolCheckbox,SolRadioGroup,SolSwitch,SolSelect,SolTextarea,SolNumberInput} from './controls';
import {SolTabs,SolToast} from './navigation';
import {SolDatePicker,SolTimePicker} from './date-time';
import {SolSegmentedControl,SolMultiSelect,SolRangeSlider} from './selection';
import {SolSplitButton,SolContextMenu} from './actions';
import {SolResizableSplitPane} from './split-pane';
export {SolSegmentedControl,SolMultiSelect,SolRangeSlider,SolSplitButton,SolContextMenu,SolResizableSplitPane};
export type {SolOptionLoader,SolMultiSelectHandle,SolRangeValue} from './selection';
export type {SolMenuItem,SolMenuCloseReason} from './actions';
import {provideSolLocale,useSolLocale,formatSolNumber,formatSolDate} from './locale';
import type {SolLocale,SolLocaleSource} from './locale';
export {SolCheckbox,SolRadioGroup,SolSwitch,SolSelect,SolTextarea,SolNumberInput};
export {SolTabs,SolToast};
export {SolDatePicker,SolTimePicker};
export type {DateMode,DateRange,DateValue,DateChange,PickerCloseReason,SolPickerHandle} from './date-time';
export type {SolTab,ToastTone,ToastCloseReason} from './navigation';
export type {SolOption,SolNumberInputHandle} from './controls';
export {koLocale,enLocale,SolLocaleKey,provideSolLocale,useSolLocale,resolveSolLocale,formatSolNumber,parseSolNumber,formatSolDate} from './locale';
export type {SolLocale,SolLocaleSource,SolLocaleCode} from './locale';

export const uiVersion='0.5.0';
function uiIcon(name:'chevron'|'close',direction?:'previous'|'next'):VNode {
  const size=name==='close'?16:20;
  return h('svg',{class:['sol-icon','sol-ui-icon',size===16?'sol-ui-icon--small':undefined,direction?'sol-ui-icon--'+direction:undefined],viewBox:'0 0 24 24',width:size,height:size,fill:'none',stroke:'currentColor','stroke-width':1.6,'stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true',focusable:'false'},h('path',{d:solIconPaths[name]}));
}
export type ButtonVariant='primary'|'secondary'|'subtle'|'inline';
export const SolButton=defineComponent({
  name:'SBtn', inheritAttrs:false,
  props:{variant:{type:String as PropType<ButtonVariant>,default:'secondary'},disabled:Boolean,loading:Boolean,type:{type:String as PropType<'button'|'submit'|'reset'>,default:'button'}},
  emits:{click:(_event:MouseEvent)=>true},
  setup(props,{attrs,slots,emit}){return()=>{const unavailable=props.disabled||props.loading||attrs['aria-disabled']===true||attrs['aria-disabled']==='true';return h(VBtn as Component,{...attrs,class:['sol-ui-button','sol-ui-button--'+props.variant,attrs.class],type:props.type,disabled:props.disabled,'aria-disabled':unavailable?'true':attrs['aria-disabled'],'aria-busy':props.loading?'true':attrs['aria-busy'],ripple:false,variant:'flat',onClick:(e:MouseEvent)=>{if(unavailable){e.preventDefault();return;}emit('click',e);}},()=>[props.loading?h('span',{class:'sol-ui-busy','aria-hidden':'true'},'◷'):null,slots.default?.()]);};}
});

export const SolField=defineComponent({
  name:'STextField',inheritAttrs:false,
  props:{locale:Object as PropType<Partial<SolLocale>>,id:{type:String,required:true},label:{type:String,required:true},modelValue:{type:String,default:''},help:{type:String,default:''},error:{type:String,default:''},disabled:Boolean,required:Boolean,type:{type:String as PropType<'text'|'search'|'email'|'password'|'tel'|'url'>,default:'text'}},
  emits:{'update:modelValue':(_value:string)=>true},
  setup(props,{attrs,emit}){const l=useSolLocale(()=>props.locale);const field=ref<{focus?:()=>void}|null>(null);return()=>h('div',{class:'sol-ui-field'},[
    h('label',{id:props.id+'-label',for:props.id,class:'sol-ui-label'},[props.label,props.required?' ('+l.value.required+')':'']),
    h(VTextField as Component,{...attrs,ref:field,id:props.id,modelValue:props.modelValue,'onUpdate:modelValue':(value:unknown)=>emit('update:modelValue',String(value??'')),type:props.type,disabled:props.disabled,required:props.required,error:!!props.error,'aria-invalid':String(!!props.error),'aria-describedby':[props.help&&props.id+'-help',props.error&&props.id+'-error',attrs['aria-describedby']].filter(Boolean).join(' ')||undefined,hideDetails:true,variant:'outlined',density:'compact',class:['sol-ui-input',attrs.class]}),
    props.help?h('p',{id:props.id+'-help',class:'sol-ui-hint'},props.help):null,
    props.error?h('p',{id:props.id+'-error',class:'sol-ui-error',role:'alert'},props.error):null
  ]);}
});

export const SolDialog=defineComponent({
  name:'SDialog',inheritAttrs:false,
  props:{locale:Object as PropType<Partial<SolLocale>>,id:{type:String,required:true},title:{type:String,required:true},modelValue:Boolean,maxWidth:{type:[Number,String],default:480},closeLabel:String,returnFocus:{type:Object as PropType<HTMLElement|null>,default:null}},
  emits:{'update:modelValue':(_value:boolean)=>true,close:()=>true},
  setup(props,{attrs,slots,emit}){
    const l=useSolLocale(()=>props.locale);const close=ref<{ $el?:HTMLElement }|null>(null);let opener:HTMLElement|null=null;
    const restore=()=>{const target=props.returnFocus||opener;if(target?.isConnected)target.focus({preventScroll:true});};
    watch(()=>props.modelValue,async(value,old)=>{if(value){opener=document.activeElement instanceof HTMLElement?document.activeElement:null;await nextTick();close.value?.$el?.focus();}else if(old){await nextTick();restore();emit('close');}},{immediate:true});
    onBeforeUnmount(()=>{if(props.modelValue)restore();});
    return()=>h(VDialog as Component,{...attrs,modelValue:props.modelValue,'onUpdate:modelValue':(value:boolean)=>emit('update:modelValue',value),maxWidth:props.maxWidth,transition:false,'aria-labelledby':props.id+'-title',class:['sol-ui-overlay',attrs.class]},()=>h('section',{class:'sol-ui-dialog',id:props.id},[
      h('div',{class:'sol-ui-dialog-heading'},[h('h2',{id:props.id+'-title'},props.title),h(SolButton,{id:props.id+'-close',ref:close,variant:'inline',autofocus:true,'aria-label':(props.closeLabel??l.value.close),onClick:()=>emit('update:modelValue',false)},()=>[(props.closeLabel??l.value.close),uiIcon('close')])]),
      h('div',{class:'sol-ui-dialog-body'},slots.default?.()),slots.actions?h('div',{class:'sol-ui-dialog-actions'},slots.actions()):null
    ]));
  }
});

export interface TableColumn {key:string;label:string;width?:string;align?:'start'|'end';sortable?:boolean;ellipsis?:boolean;format?:'text'|'number'|'date'}
export interface TableRow {id:string;[key:string]:unknown}
export interface TableSort {key:string;direction:'ascending'|'descending'}
export const SolTable=defineComponent({
  name:'SDataTable',inheritAttrs:false,
  props:{locale:Object as PropType<Partial<SolLocale>>,columns:{type:Array as PropType<TableColumn[]>,required:true},rows:{type:Array as PropType<TableRow[]>,required:true},caption:{type:String,required:true},selected:{type:Array as PropType<string[]>,default:()=>[]},selectable:Boolean,sort:{type:Object as PropType<TableSort|null>,default:null},page:{type:Number,default:1},pageCount:{type:Number,default:1},loading:Boolean,error:{type:String,default:''},emptyText:String},
  emits:{'update:selected':(_ids:string[])=>true,'update:sort':(_sort:TableSort)=>true,'update:page':(_page:number)=>true,retry:()=>true,rowAction:(_row:TableRow)=>true},
  setup(props,{attrs,slots,emit}){
    const l=useSolLocale(()=>props.locale);const host=ref<HTMLElement|null>(null),summary=ref<HTMLElement|null>(null),all=ref<HTMLInputElement|null>(null),allMobile=ref<HTMLInputElement|null>(null),preview=ref<TableRow|null>(null),previewOpener=ref<HTMLElement|null>(null),previewId='sol-table-'+useId();let cleanup:(()=>void)&{refresh?:()=>void}=()=>{};
    onMounted(()=>{if(host.value)cleanup=mountOverflowText(host.value,()=>l.value);});
    watch(l,()=>nextTick(()=>cleanup.refresh?.()));
    const display=(row:TableRow,c:TableColumn)=>{const value=row[c.key];return c.format==='date'&&typeof value==='string'?formatSolDate(value,l.value):c.format==='number'||!c.format&&typeof value==='number'?typeof value==='number'?formatSolNumber(value,l.value):String(value??'—'):String(value??'—');};
    // Capture focus before the retry node is removed. A later user focus wins.
    watch(()=>[props.loading,props.error],async()=>{
      const previous=document.activeElement,retry=host.value?.querySelector('.sol-ui-table-retry');
      if(!previous||!retry?.contains(previous))return;
      await nextTick();
      if(!previous.isConnected&&document.activeElement===document.body)summary.value?.focus();
    });
    function choose(id:string,checked:boolean){const ids=new Set(props.selected);checked?ids.add(id):ids.delete(id);emit('update:selected',[...ids]);}
    function selectPage(checked:boolean){const ids=new Set(props.selected);for(const row of props.rows)checked?ids.add(row.id):ids.delete(row.id);emit('update:selected',[...ids]);}
    async function move(page:number){emit('update:page',page);await nextTick();host.value?.querySelector<HTMLElement>('.sol-pagination [aria-current="page"]')?.focus();}
    watch(()=>[props.selectable,props.rows.map(row=>[row.id,props.selected.includes(row.id)])],async()=>{await nextTick();for(const input of [all.value,allMobile.value])if(input)input.indeterminate=props.rows.some(r=>props.selected.includes(r.id))&&!props.rows.every(r=>props.selected.includes(r.id));},{immediate:true});
    onBeforeUnmount(()=>cleanup());
    const cell=(row:TableRow,c:TableColumn):VNode=>h('span',{class:c.ellipsis===false?'':'sol-ellipsis sol-ui-cell-clip'},slots['cell-'+c.key]?.({row,value:row[c.key]})||display(row,c));
    const action=(row:TableRow)=>h(SolButton,{variant:'inline','aria-label':l.value.viewFullText(String(row[props.columns[0]?.key]??l.value.record)),onClick:(e:MouseEvent)=>{previewOpener.value=e.currentTarget as HTMLElement;preview.value=row;emit('rowAction',row);}},()=> l.value.details);
    const busy=()=>props.loading||!!props.error;
    return()=>{const safePage=Math.max(1,Math.min(props.page,Math.max(1,props.pageCount))),count=Math.max(1,props.pageCount);const pageNumbers=[...new Set([1,safePage-1,safePage,safePage+1,count])].filter(n=>n>0&&n<=count).sort((a,b)=>a-b);return h('div',{...attrs,ref:host,class:['sol-ui-table',attrs.class],'aria-busy':String(props.loading)},[
      h('div',{class:'sol-ui-table-desktop'},h('table',{class:'sol-data-table'},[
        h('caption',props.caption),h('colgroup',[props.selectable?h('col',{style:{width:'48px'}}):null,...props.columns.map(c=>h('col',{style:{width:c.width}})),h('col',{style:{width:'72px'}})]),
        h('thead',h('tr',[props.selectable?h('th',{scope:'col'},h('input',{ref:all,type:'checkbox','aria-label':l.value.selectPage,checked:!!props.rows.length&&props.rows.every(r=>props.selected.includes(r.id)),disabled:busy()||!props.rows.length,onChange:(e:Event)=>selectPage((e.target as HTMLInputElement).checked)})):null,...props.columns.map(c=>h('th',{scope:'col',style:{textAlign:c.align},'aria-sort':c.sortable?(props.sort?.key===c.key?props.sort.direction:'none'):undefined},c.sortable?h(SolButton,{variant:'subtle',class:'sol-sort-button',disabled:busy(),onClick:()=>emit('update:sort',{key:c.key,direction:props.sort?.key===c.key&&props.sort.direction==='ascending'?'descending':'ascending'})},()=>[c.label,h('span',{'aria-hidden':'true',class:'sol-sort-symbol'},props.sort?.key===c.key?(props.sort.direction==='ascending'?'↑':'↓'):'↕')]):c.label)),h('th',{scope:'col'},l.value.details)])),
        h('tbody',!busy()?props.rows.map(row=>h('tr',{key:row.id,'data-row-id':row.id,'data-selected':props.selected.includes(row.id)},[props.selectable?h('td',h('input',{type:'checkbox','aria-label':l.value.selectRecord(String(row[props.columns[0]?.key]??l.value.record)),checked:props.selected.includes(row.id),onChange:(e:Event)=>choose(row.id,(e.target as HTMLInputElement).checked)})):null,...props.columns.map(c=>h('td',{style:{textAlign:c.align}},cell(row,c))),h('td',action(row))])):[])
      ])),
      h('p',{class:'sol-ui-table-mobile-caption'},props.caption),
      props.columns.some(c=>c.sortable)?h('div',{class:'sol-ui-table-mobile-sort'},[
        h('label',{class:'sol-field'},[h('span',{class:'sol-label'},l.value.sortField),h('select',{class:'sol-select',value:props.columns.some(c=>c.sortable&&c.key===props.sort?.key)?props.sort?.key:'',disabled:busy(),onChange:(e:Event)=>emit('update:sort',{key:(e.target as HTMLSelectElement).value,direction:'ascending'})},[h('option',{value:'',disabled:true},l.value.chooseSort),...props.columns.filter(c=>c.sortable).map(c=>h('option',{value:c.key},c.label))])]),
        h(SolButton,{disabled:busy()||!props.columns.some(c=>c.sortable&&c.key===props.sort?.key),'aria-label':l.value.sortDirection(props.sort?.direction==='descending'?l.value.descending:l.value.ascending),onClick:()=>{if(props.sort)emit('update:sort',{key:props.sort.key,direction:props.sort.direction==='ascending'?'descending':'ascending'});}},()=>props.sort?.direction==='descending'?l.value.descending:l.value.ascending)
      ]):null,
      props.selectable?h('label',{class:'sol-choice sol-ui-table-mobile-select'},[h('input',{ref:allMobile,type:'checkbox',checked:!!props.rows.length&&props.rows.every(r=>props.selected.includes(r.id)),disabled:busy()||!props.rows.length,onChange:(e:Event)=>selectPage((e.target as HTMLInputElement).checked)}),l.value.selectPage]):null,
      h('ul',{class:'sol-ui-table-mobile','aria-label':props.caption},!busy()?props.rows.map(row=>h('li',{key:row.id,'data-row-id':row.id,'data-selected':props.selected.includes(row.id)},[props.selectable?h('label',{class:'sol-choice'},[h('input',{type:'checkbox','aria-label':l.value.selectRecord(String(row[props.columns[0]?.key]??l.value.record)),checked:props.selected.includes(row.id),onChange:(e:Event)=>choose(row.id,(e.target as HTMLInputElement).checked)}),l.value.selectRecords]):null,h('dl',props.columns.flatMap(c=>[h('dt',c.label),h('dd',cell(row,c))])),h('div',{class:'sol-ui-table-mobile-actions'},action(row))])):[]),
      props.loading?h('p',{role:'status',class:'sol-ui-hint'},l.value.tableLoading):props.error?h('div',{role:'alert',class:'sol-notice danger'},[h('p',props.error),h(SolButton,{class:'sol-ui-table-retry',variant:'inline',onClick:()=>emit('retry')},()=> l.value.tableRetry)]):!props.rows.length?h('p',{role:'status',class:'sol-ui-hint'},props.emptyText??l.value.tableEmpty):null,
      h('div',{class:'sol-ui-table-footer'},[
        h('nav',{'aria-label':l.value.pages(props.caption),class:'sol-pagination'},[h(SolButton,{class:'sol-ui-page-icon',disabled:busy()||safePage===1,'aria-label':l.value.previousPage,onClick:()=>move(safePage-1)},()=>uiIcon('chevron','previous')),...pageNumbers.flatMap((n,i)=>[i&&n-pageNumbers[i-1]>1?h('span',{'aria-hidden':'true',class:'sol-ui-page-gap'},'…'):null,h(SolButton,{'aria-label':l.value.pageLabel(n,count),'aria-current':n===safePage?'page':undefined,disabled:busy(),class:['sol-page-button',Math.abs(n-safePage)>1?'sol-ui-page-edge':''],onClick:()=>move(n)},()=>formatSolNumber(n,l.value))]),h(SolButton,{class:'sol-ui-page-icon',disabled:busy()||safePage===count,'aria-label':l.value.nextPage,onClick:()=>move(safePage+1)},()=>uiIcon('chevron','next'))]),
      h('p',{ref:summary,role:'status',tabindex:-1,class:'sol-ui-hint sol-ui-table-summary'},l.value.pageSummary(safePage,count,props.selected.length))
      ]),
      h(SolDialog,{locale:l.value,id:previewId,title:l.value.fullText,modelValue:!!preview.value,returnFocus:previewOpener.value,'onUpdate:modelValue':(value:boolean)=>{if(!value)preview.value=null;}},()=>preview.value?h('dl',{class:'sol-ui-detail'},props.columns.flatMap(c=>[h('dt',c.label),h('dd',display(preview.value!,c))])):null)
    ]);};
  }
});

export const SBtn:typeof SolButton=SolButton;
export const STextField:typeof SolField=SolField;
export const SDialog:typeof SolDialog=SolDialog;
export const SDataTable:typeof SolTable=SolTable;
export const SCheckbox:typeof SolCheckbox=SolCheckbox;
export const SRadioGroup:typeof SolRadioGroup=SolRadioGroup;
export const SSwitch:typeof SolSwitch=SolSwitch;
export const SSelect:typeof SolSelect=SolSelect;
export const STextarea:typeof SolTextarea=SolTextarea;
export const SNumberInput:typeof SolNumberInput=SolNumberInput;
export const STabs:typeof SolTabs=SolTabs;
export const SSnackbar:typeof SolToast=SolToast;
export const SDatePicker:typeof SolDatePicker=SolDatePicker;
export const STimePicker:typeof SolTimePicker=SolTimePicker;
export const SSegmentedControl:typeof SolSegmentedControl=SolSegmentedControl;
export const SMultiSelect:typeof SolMultiSelect=SolMultiSelect;
export const SRangeSlider:typeof SolRangeSlider=SolRangeSlider;
export const SSplitBtn:typeof SolSplitButton=SolSplitButton;
export const SContextMenu:typeof SolContextMenu=SolContextMenu;
export const SResizableSplitPane:typeof SolResizableSplitPane=SolResizableSplitPane;
export {createSolyiVuetify,applySolyiAppearance} from './vuetify';
export type {SAppearance,SThemeName,SThemeHost} from './vuetify';
export const sComponents={SBtn,STextField,SDialog,SDataTable,SCheckbox,SRadioGroup,SSwitch,SSelect,STextarea,SNumberInput,STabs,SSnackbar,SDatePicker,STimePicker,SSegmentedControl,SMultiSelect,SRangeSlider,SSplitBtn,SContextMenu,SResizableSplitPane};
const compatibilityComponents={SolButton,SolField,SolDialog,SolTable,SolCheckbox,SolRadioGroup,SolSwitch,SolSelect,SolTextarea,SolNumberInput,SolTabs,SolToast,SolDatePicker,SolTimePicker,SolSegmentedControl,SolMultiSelect,SolRangeSlider,SolSplitButton,SolContextMenu,SolResizableSplitPane};

export interface SolyiOptions {locale?:SolLocaleSource}
export function install(app:App,options:SolyiOptions={}){if(options.locale)provideSolLocale(app,options.locale);for(const [name,component]of Object.entries({...compatibilityComponents,...sComponents}))app.component(name,component);}
export default {install};

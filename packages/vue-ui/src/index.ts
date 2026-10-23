import {SCard,SAlert} from './surfaces';
import {STree} from './tree';
import {STooltip,SPopover,SAccordion} from './disclosures';
import {SFileInput} from './files';
import {SAutocomplete} from './autocomplete';
import {SBreadcrumbs,SAvatar,SStepper,SBarChart} from './presentation';
export {STooltip,SPopover,SAccordion,SFileInput,SAutocomplete,SBreadcrumbs,SAvatar,SStepper,SBarChart};
export {validateSFiles,describeSFile} from './files';
export type {SDisclosureCloseReason} from './disclosures';
export type {SFileInputHandle,SFileLimits,SFileRejection,SFileRejectionCode} from './files';
export type {SAutocompleteHandle} from './autocomplete';
export type {SBreadcrumbItem,SStep,SBarChartItem} from './presentation';
export {SCard,SAlert,STree};
export type {STreeItem} from './tree';
import {defineComponent, h, ref, watch, nextTick, onBeforeUnmount, onMounted, useId} from 'vue';
import type {PropType, Component, App, VNode} from 'vue';
import {VBtn} from 'vuetify/components/VBtn';
import {VTextField} from 'vuetify/components/VTextField';
import {VDialog} from 'vuetify/components/VDialog';
import {mountOverflowText} from '@solyi/core/overflow';
import {solIconPaths} from '@solyi/core/icons';
export {tokens,coreVersion} from '@solyi/core';
import './styles.css';
import {SForm,useSFieldValidation,fieldError,fieldDisabled,fieldReadonly} from './form';
import {commonFieldProps,fieldDescription,fieldMessages,fieldLabel} from './controls';
import {SContainer,SRow,SCol} from './layout';
export {SForm,SContainer,SRow,SCol};
export {sRules,isSFieldFilled} from './form';
export type {SRule,SFieldHandle,SFormHandle,SFormError,SFormResult,SFormSubmitEvent} from './form';
import {SCheckbox,SRadioGroup,SSwitch,SSelect,STextarea,SNumberInput} from './controls';
import {STabs,SSnackbar} from './navigation';
import {SDatePicker,STimePicker} from './date-time';
import {SSegmentedControl,SMultiSelect,SRangeSlider} from './selection';
import {SSplitBtn,SContextMenu} from './actions';
import {SProgressLinear,SProgressCircular} from './progress';
export {SProgressLinear,SProgressCircular,resolveSProgress} from './progress';
export type {SProgressState,SProgressOptions} from './progress';
import {SResizableSplitPane} from './split-pane';
export {SSegmentedControl,SMultiSelect,SRangeSlider,SSplitBtn,SContextMenu,SResizableSplitPane};
export type {SolOptionLoader,SolMultiSelectHandle,SolRangeValue} from './selection';
export type {SolMenuItem,SolMenuCloseReason} from './actions';
import {provideSolLocale,useSolLocale,formatSolNumber,formatSolDate} from './locale';
import type {SolLocale,SolLocaleSource} from './locale';
export {SCheckbox,SRadioGroup,SSwitch,SSelect,STextarea,SNumberInput};
export {STabs,SSnackbar};
export {SDatePicker,STimePicker};
export type {DateMode,DateRange,DateValue,DateChange,PickerCloseReason,SolPickerHandle} from './date-time';
export type {SolTab,ToastTone,ToastCloseReason} from './navigation';
export type {SolOption,SolNumberInputHandle} from './controls';
export {koLocale,enLocale,SolLocaleKey,provideSolLocale,useSolLocale,resolveSolLocale,formatSolNumber,parseSolNumber,formatSolDate} from './locale';
export type {SolLocale,SolLocaleSource,SolLocaleCode} from './locale';

export {uiVersion} from './version';
function uiIcon(name:'chevron'|'close',direction?:'previous'|'next'):VNode {
  const size=name==='close'?16:20;
  return h('svg',{class:['sol-icon','sol-ui-icon',size===16?'sol-ui-icon--small':undefined,direction?'sol-ui-icon--'+direction:undefined],viewBox:'0 0 24 24',width:size,height:size,fill:'none',stroke:'currentColor','stroke-width':1.6,'stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true',focusable:'false'},h('path',{d:solIconPaths[name]}));
}
export type ButtonVariant='primary'|'secondary'|'subtle'|'inline';
export type SButtonTone='accent'|'info'|'success'|'warning'|'danger';
export const SBtn=defineComponent({
  name:'SBtn', inheritAttrs:false,
  props:{variant:{type:String as PropType<ButtonVariant>,default:'secondary'},tone:String as PropType<SButtonTone>,disabled:Boolean,loading:Boolean,type:{type:String as PropType<'button'|'submit'|'reset'>,default:'button'}},
  emits:{click:(_event:MouseEvent)=>true},
  setup(props,{attrs,slots,emit}){return()=>{const unavailable=props.disabled||props.loading||attrs['aria-disabled']===true||attrs['aria-disabled']==='true';return h(VBtn as Component,{...attrs,'data-tone':props.tone||attrs['data-tone'],class:['sol-ui-button','sol-ui-button--'+props.variant,props.tone?'sol-tone':undefined,attrs.class],type:props.type,disabled:props.disabled,'aria-disabled':unavailable?'true':attrs['aria-disabled'],'aria-busy':props.loading?'true':attrs['aria-busy'],ripple:false,variant:'flat',onClick:(e:MouseEvent)=>{if(unavailable){e.preventDefault();return;}emit('click',e);}},()=>[props.loading?h('span',{class:'sol-ui-busy','aria-hidden':'true'},'◷'):null,slots.default?.()]);};}
});

export const STextField=defineComponent({
  name:'STextField',inheritAttrs:false,
  props:{...commonFieldProps,modelValue:{type:String,default:''},type:{type:String as PropType<'text'|'search'|'email'|'password'|'tel'|'url'>,default:'text'}},
  emits:{'update:modelValue':(_value:string)=>true,blur:(_event:FocusEvent)=>true,focus:(_event:FocusEvent)=>true},
  setup(props,{attrs,slots,emit,expose}){
    const l=useSolLocale(()=>props.locale),field=ref<{focus?:()=>void}|null>(null);
    const validation=useSFieldValidation(props,()=>props.modelValue,{focus:()=>field.value?.focus?.()});
    expose(validation);
    return()=>{const error=fieldError(props);return h('div',{class:'sol-ui-field'},[
      fieldLabel(props,slots,l.value.required),
      h(VTextField as Component,{...attrs,ref:field,id:props.id,modelValue:props.modelValue,'onUpdate:modelValue':(value:unknown)=>emit('update:modelValue',String(value??'')),type:props.type,disabled:fieldDisabled(props),readonly:fieldReadonly(props),required:props.required,error:!!error,'aria-invalid':String(!!error),'aria-describedby':fieldDescription(props,slots,error,attrs['aria-describedby']),hideDetails:true,variant:'outlined',density:'compact',class:['sol-ui-input',attrs.class],onBlur:(event:FocusEvent)=>{validation.validate();emit('blur',event);},onFocus:(event:FocusEvent)=>emit('focus',event)}),
      ...fieldMessages(props,slots,error)
    ]);};
  }
});

export const SDialog=defineComponent({
  name:'SDialog',inheritAttrs:false,
  props:{locale:Object as PropType<Partial<SolLocale>>,id:{type:String,required:true},title:{type:String,required:true},eyebrow:String,presentation:{type:String as PropType<'dialog'|'drawer'>,default:'dialog'},modelValue:Boolean,maxWidth:{type:[Number,String],default:480},closeLabel:String,returnFocus:{type:Object as PropType<HTMLElement|null>,default:null}},
  emits:{'update:modelValue':(_value:boolean)=>true,close:()=>true},
  setup(props,{attrs,slots,emit}){
    const l=useSolLocale(()=>props.locale);const close=ref<{ $el?:HTMLElement }|null>(null);let opener:HTMLElement|null=null;
    const restore=()=>{const target=props.returnFocus||opener;if(target?.isConnected)target.focus({preventScroll:true});};
    watch(()=>props.modelValue,async(value,old)=>{if(value){opener=document.activeElement instanceof HTMLElement?document.activeElement:null;await nextTick();close.value?.$el?.focus();}else if(old){await nextTick();restore();emit('close');}},{immediate:true});
    onBeforeUnmount(()=>{if(props.modelValue)restore();});
    return():VNode=>h(VDialog as Component,{...attrs,modelValue:props.modelValue,'onUpdate:modelValue':(value:boolean)=>emit('update:modelValue',value),maxWidth:props.presentation==='drawer'?440:props.maxWidth,transition:false,'aria-labelledby':props.id+'-title',class:['sol-ui-overlay',props.presentation==='drawer'?'sol-ui-drawer-overlay':undefined,attrs.class]},()=>h('section',{class:'sol-ui-dialog',id:props.id},[
      h('div',{class:'sol-ui-dialog-heading'},[h('div',{class:'sol-surface-heading'},[props.eyebrow?h('span',{class:'eyebrow'},props.eyebrow):null,h('h2',{id:props.id+'-title'},props.title)]),h(SBtn,{id:props.id+'-close',ref:close,variant:'inline',autofocus:true,'aria-label':(props.closeLabel??l.value.close),onClick:()=>emit('update:modelValue',false)},()=>[(props.closeLabel??l.value.close),uiIcon('close')])]),
      h('div',{class:'sol-ui-dialog-body'},slots.default?.()),slots.actions?h('div',{class:'sol-ui-dialog-actions'},slots.actions()):null
    ]));
  }
});

export interface TableColumn {key:string;label:string;width?:string;align?:'start'|'end';sortable?:boolean;ellipsis?:boolean;format?:'text'|'number'|'date'}
export interface TableRow {id:string;[key:string]:unknown}
export interface TableSort {key:string;direction:'ascending'|'descending'}
export const SDataTable=defineComponent({
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
    const action=(row:TableRow)=>h(SBtn,{variant:'inline','aria-label':l.value.viewFullText(String(row[props.columns[0]?.key]??l.value.record)),onClick:(e:MouseEvent)=>{previewOpener.value=e.currentTarget as HTMLElement;preview.value=row;emit('rowAction',row);}},()=> l.value.details);
    const busy=()=>props.loading||!!props.error;
    return()=>{const safePage=Math.max(1,Math.min(props.page,Math.max(1,props.pageCount))),count=Math.max(1,props.pageCount);const pageNumbers=[...new Set([1,safePage-1,safePage,safePage+1,count])].filter(n=>n>0&&n<=count).sort((a,b)=>a-b);return h('div',{...attrs,ref:host,class:['sol-ui-table',attrs.class],'aria-busy':String(props.loading)},[
      h('div',{class:'sol-ui-table-desktop'},h('table',{class:'sol-data-table'},[
        h('caption',props.caption),h('colgroup',[props.selectable?h('col',{style:{width:'48px'}}):null,...props.columns.map(c=>h('col',{style:{width:c.width}})),h('col',{style:{width:'72px'}})]),
        h('thead',h('tr',[props.selectable?h('th',{scope:'col'},h('input',{ref:all,type:'checkbox','aria-label':l.value.selectPage,checked:!!props.rows.length&&props.rows.every(r=>props.selected.includes(r.id)),disabled:busy()||!props.rows.length,onChange:(e:Event)=>selectPage((e.target as HTMLInputElement).checked)})):null,...props.columns.map(c=>h('th',{scope:'col',style:{textAlign:c.align},'aria-sort':c.sortable?(props.sort?.key===c.key?props.sort.direction:'none'):undefined},c.sortable?h(SBtn,{variant:'subtle',class:'sol-sort-button',disabled:busy(),onClick:()=>emit('update:sort',{key:c.key,direction:props.sort?.key===c.key&&props.sort.direction==='ascending'?'descending':'ascending'})},()=>[c.label,h('span',{'aria-hidden':'true',class:'sol-sort-symbol'},props.sort?.key===c.key?(props.sort.direction==='ascending'?'↑':'↓'):'↕')]):c.label)),h('th',{scope:'col'},l.value.details)])),
        h('tbody',!busy()?props.rows.map(row=>h('tr',{key:row.id,'data-row-id':row.id,'data-selected':props.selected.includes(row.id)},[props.selectable?h('td',h('input',{type:'checkbox','aria-label':l.value.selectRecord(String(row[props.columns[0]?.key]??l.value.record)),checked:props.selected.includes(row.id),onChange:(e:Event)=>choose(row.id,(e.target as HTMLInputElement).checked)})):null,...props.columns.map(c=>h('td',{style:{textAlign:c.align}},cell(row,c))),h('td',action(row))])):[])
      ])),
      h('p',{class:'sol-ui-table-mobile-caption'},props.caption),
      props.columns.some(c=>c.sortable)?h('div',{class:'sol-ui-table-mobile-sort'},[
        h('label',{class:'sol-field'},[h('span',{class:'sol-label'},l.value.sortField),h('select',{class:'sol-select',value:props.columns.some(c=>c.sortable&&c.key===props.sort?.key)?props.sort?.key:'',disabled:busy(),onChange:(e:Event)=>emit('update:sort',{key:(e.target as HTMLSelectElement).value,direction:'ascending'})},[h('option',{value:'',disabled:true},l.value.chooseSort),...props.columns.filter(c=>c.sortable).map(c=>h('option',{value:c.key},c.label))])]),
        h(SBtn,{disabled:busy()||!props.columns.some(c=>c.sortable&&c.key===props.sort?.key),'aria-label':l.value.sortDirection(props.sort?.direction==='descending'?l.value.descending:l.value.ascending),onClick:()=>{if(props.sort)emit('update:sort',{key:props.sort.key,direction:props.sort.direction==='ascending'?'descending':'ascending'});}},()=>props.sort?.direction==='descending'?l.value.descending:l.value.ascending)
      ]):null,
      props.selectable?h('label',{class:'sol-choice sol-ui-table-mobile-select'},[h('input',{ref:allMobile,type:'checkbox',checked:!!props.rows.length&&props.rows.every(r=>props.selected.includes(r.id)),disabled:busy()||!props.rows.length,onChange:(e:Event)=>selectPage((e.target as HTMLInputElement).checked)}),l.value.selectPage]):null,
      h('ul',{class:'sol-ui-table-mobile','aria-label':props.caption},!busy()?props.rows.map(row=>h('li',{key:row.id,'data-row-id':row.id,'data-selected':props.selected.includes(row.id)},[props.selectable?h('label',{class:'sol-choice'},[h('input',{type:'checkbox','aria-label':l.value.selectRecord(String(row[props.columns[0]?.key]??l.value.record)),checked:props.selected.includes(row.id),onChange:(e:Event)=>choose(row.id,(e.target as HTMLInputElement).checked)}),l.value.selectRecords]):null,h('dl',props.columns.flatMap(c=>[h('dt',c.label),h('dd',cell(row,c))])),h('div',{class:'sol-ui-table-mobile-actions'},action(row))])):[]),
      props.loading?h('p',{role:'status',class:'sol-ui-hint'},l.value.tableLoading):props.error?h('div',{role:'alert',class:'sol-notice danger'},[h('p',props.error),h(SBtn,{class:'sol-ui-table-retry',variant:'inline',onClick:()=>emit('retry')},()=> l.value.tableRetry)]):!props.rows.length?h('p',{role:'status',class:'sol-ui-hint'},props.emptyText??l.value.tableEmpty):null,
      h('div',{class:'sol-ui-table-footer'},[
        h('nav',{'aria-label':l.value.pages(props.caption),class:'sol-pagination'},[h(SBtn,{class:'sol-ui-page-icon',disabled:busy()||safePage===1,'aria-label':l.value.previousPage,onClick:()=>move(safePage-1)},()=>uiIcon('chevron','previous')),...pageNumbers.flatMap((n,i)=>[i&&n-pageNumbers[i-1]>1?h('span',{'aria-hidden':'true',class:'sol-ui-page-gap'},'…'):null,h(SBtn,{'aria-label':l.value.pageLabel(n,count),'aria-current':n===safePage?'page':undefined,disabled:busy(),class:['sol-page-button',Math.abs(n-safePage)>1?'sol-ui-page-edge':''],onClick:()=>move(n)},()=>formatSolNumber(n,l.value))]),h(SBtn,{class:'sol-ui-page-icon',disabled:busy()||safePage===count,'aria-label':l.value.nextPage,onClick:()=>move(safePage+1)},()=>uiIcon('chevron','next'))]),
      h('p',{ref:summary,role:'status',tabindex:-1,class:'sol-ui-hint sol-ui-table-summary'},l.value.pageSummary(safePage,count,props.selected.length))
      ]),
      h(SDialog,{locale:l.value,id:previewId,title:l.value.fullText,modelValue:!!preview.value,returnFocus:previewOpener.value,'onUpdate:modelValue':(value:boolean)=>{if(!value)preview.value=null;}},()=>preview.value?h('dl',{class:'sol-ui-detail'},props.columns.flatMap(c=>[h('dt',c.label),h('dd',display(preview.value!,c))])):null)
    ]);};
  }
});

export {createSolyiVuetify,applySolyiAppearance} from './vuetify';
export type {SAppearance,SThemeName,SThemeHost} from './vuetify';
export const sComponents={SForm,SContainer,SRow,SCol,SCard,SAlert,STree,SProgressLinear,SProgressCircular,SBtn,STextField,SDialog,SDataTable,SCheckbox,SRadioGroup,SSwitch,SSelect,STextarea,SNumberInput,STabs,SSnackbar,SDatePicker,STimePicker,SSegmentedControl,SMultiSelect,SRangeSlider,SSplitBtn,SContextMenu,SResizableSplitPane,STooltip,SPopover,SAccordion,SFileInput,SAutocomplete,SBreadcrumbs,SAvatar,SStepper,SBarChart};

export interface SolyiOptions {locale?:SolLocaleSource}
export function install(app:App,options:SolyiOptions={}){if(options.locale)provideSolLocale(app,options.locale);for(const [name,component]of Object.entries(sComponents))app.component(name,component);}
export default {install};

import {createApp,h,ref} from 'vue';
import {createVuetify} from 'vuetify';
import {VApp} from 'vuetify/components/VApp';
import SolyiUI,{provideSolLocale,formatSolNumber,formatSolDate,parseSolNumber,resolveSolLocale,SBtn,STextField,SDialog,SDataTable,SCheckbox,SRadioGroup,SSwitch,SSelect,STextarea,SNumberInput,STabs,SSnackbar,SDatePicker,STimePicker,SSegmentedControl,SMultiSelect,SRangeSlider,SSplitBtn,SContextMenu,SResizableSplitPane,SProgressLinear,SProgressCircular,koLocale,uiVersion} from '@solyi/vue-ui';
import type {DateValue,DateRange,SolOption,SolPickerHandle,SolNumberInputHandle,SolLocale,SolLocaleSource,SolRangeValue,SolOptionLoader,SolMenuItem} from '@solyi/vue-ui';
import type {TableColumn,TableRow,TableSort,ButtonVariant} from '@solyi/vue-ui';
import {tokens,coreVersion} from '@solyi/core';
import {solIcon,solIconPaths} from '@solyi/core/icons';
import '@solyi/core/fonts.css';
import '@solyi/core/code-fonts.css';
import '@solyi/core/tokens.css';
import '@solyi/core/components.css';
import 'vuetify/styles';
import '@solyi/vue-ui/styles.css';
const columns:TableColumn[]=[{key:'name',label:'이름',sortable:true},{key:'date',label:'변경일',width:'128px'}];
const rows:TableRow[]=[{id:'a',name:'가상 기록',date:'2026-10-21'}];
const variant:ButtonVariant='primary';
type ButtonProps=InstanceType<typeof SBtn>['$props'];
const validProps:ButtonProps={variant:'inline',loading:true};
// @ts-expect-error Unsupported variant must fail, not silently accept arbitrary strings.
const invalidVariant:ButtonProps={variant:'rainbow'};
// @ts-expect-error Sort direction is a defined accessibility state.
const invalidSort:TableSort={key:'name',direction:'up'};
void validProps;void invalidVariant;void invalidSort;
const choices:SolOption[]=[{value:'note',label:'기록'},{value:'plan',label:'계획',disabled:true}];
const validRange:DateRange={start:'2026-10-21',end:'2026-10-24'};
const picker=ref<SolPickerHandle|null>(null),numberHandle=ref<SolNumberInputHandle|null>(null);void picker;void numberHandle;
const localeOverride:Partial<SolLocale>={code:'en-US',firstDay:1,clear:'Reset'};void localeOverride;
// @ts-expect-error Checkbox is boolean, not a string model.
const badCheckbox:InstanceType<typeof SCheckbox>['$props']={id:'bad',label:'bad',modelValue:'true'};
// @ts-expect-error RadioGroup takes one string, not an array.
const badRadio:InstanceType<typeof SRadioGroup>['$props']={id:'bad',label:'bad',options:choices,modelValue:['note']};
// @ts-expect-error Switch is boolean.
const badSwitch:InstanceType<typeof SSwitch>['$props']={id:'bad',label:'bad',modelValue:1};
// @ts-expect-error Native Select values are strings.
const badSelect:InstanceType<typeof SSelect>['$props']={id:'bad',label:'bad',options:[{value:1,label:'bad'}]};
// @ts-expect-error Multiline text remains a string.
const badText:InstanceType<typeof STextarea>['$props']={id:'bad',label:'bad',modelValue:1};
// @ts-expect-error Number model must not silently accept numeric strings.
const badNumber:InstanceType<typeof SNumberInput>['$props']={id:'bad',label:'bad',modelValue:'1'};
// @ts-expect-error Tab activation is a defined contract.
const badTabs:InstanceType<typeof STabs>['$props']={id:'bad',label:'bad',modelValue:'a',items:[],activation:'hover'};
// @ts-expect-error Live urgency is limited to the ARIA values.
const badToast:InstanceType<typeof SSnackbar>['$props']={id:'bad',message:'bad',live:'loud'};
// @ts-expect-error A range requires both date-only endpoints.
const badDate:DateValue={start:'2026-10-21'};
// @ts-expect-error Date mode is single or range.
const badMode:InstanceType<typeof SDatePicker>['$props']={id:'bad',label:'bad',mode:'multiple'};
// @ts-expect-error Time model is HH:mm string or null.
const badTime:InstanceType<typeof STimePicker>['$props']={id:'bad',label:'bad',modelValue:930};
void [badCheckbox,badRadio,badSwitch,badSelect,badText,badNumber,badTabs,badToast,badDate,badMode,badTime];
const rangeValue:SolRangeValue=[20,80],menuItems:SolMenuItem[]=[{id:'copy',label:'Copy'}];
const localLoader:SolOptionLoader=async(_query,_signal)=>choices;void localLoader;
// @ts-expect-error SegmentedControl is a single string value.
const badSegment:InstanceType<typeof SSegmentedControl>['$props']={id:'bad',label:'bad',options:choices,modelValue:['a']};
// @ts-expect-error MultiSelect is a string array.
const badMulti:InstanceType<typeof SMultiSelect>['$props']={id:'bad',label:'bad',modelValue:'a'};
// @ts-expect-error Range requires two endpoints.
const badRange:SolRangeValue=[1];
// @ts-expect-error Menu action IDs are strings.
const badMenu:SolMenuItem={id:1,label:'bad'};
// @ts-expect-error Open is controlled boolean, not text.
const badSplit:InstanceType<typeof SSplitBtn>['$props']={id:'bad',label:'bad',items:menuItems,open:'yes'};
// @ts-expect-error Context items require visible text labels.
const badContext:InstanceType<typeof SContextMenu>['$props']={id:'bad',label:'bad',items:[{id:'x'}]};
// @ts-expect-error Pane orientation is explicit.
const badPane:InstanceType<typeof SResizableSplitPane>['$props']={id:'bad',label:'bad',primaryLabel:'A',secondaryLabel:'B',orientation:'diagonal'};
void [badSegment,badMulti,badRange,badMenu,badSplit,badContext,badPane];
const chevron=solIcon('chevron',{size:20});void chevron;void solIconPaths.close;
const invalidIconTypeOnly=()=>{
  // @ts-expect-error Only the shared icon names are accepted.
  solIcon('unregistered-symbol');
};void invalidIconTypeOnly;
// @ts-expect-error Progress state is an explicit display contract.
const badProgress:InstanceType<typeof SProgressLinear>['$props']={id:'bad-progress',label:'Bad',state:'uploading'};void badProgress;
const progressProps:InstanceType<typeof SProgressCircular>['$props']={id:'circle',label:'Progress',modelValue:35,state:'determinate',showLabel:false,showValue:true,showMessage:false};void progressProps;
const app=createApp({setup(){const text=ref(''),open=ref(false),sort=ref<TableSort|null>(null),selected=ref<string[]>([]),checked=ref(false),choice=ref<string|null>('note'),amount=ref<number|null>(2),tab=ref('a'),toast=ref(false),dates=ref<DateValue>(validRange),time=ref<string|null>('09:00'),multi=ref<string[]>([]),range=ref<SolRangeValue>(rangeValue),ratio=ref(50);return()=>h(VApp,{},()=>h('main',{style:'padding:24px;font-family:var(--sol-font-sans)'},[
  h('h1',`Independent tarball consumer: ${coreVersion}/${uiVersion} (${tokens.version})`),
  h(STextField,{id:'consumer-title',label:'가상 제목',modelValue:text.value,'onUpdate:modelValue':value=>text.value=value}),
  h(SBtn,{variant,onClick:()=>open.value=true},()=> '열기'),
  h(SDialog,{id:'consumer-dialog',title:'가상 상세',modelValue:open.value,'onUpdate:modelValue':value=>open.value=value},()=>text.value),
  h(SDataTable,{caption:'가상 자료',columns,rows,sort:sort.value,selected:selected.value,selectable:true,'onUpdate:sort':value=>sort.value=value,'onUpdate:selected':value=>selected.value=value}),
  h(SCheckbox,{id:'consumer-check',label:'가상 확인',modelValue:checked.value,'onUpdate:modelValue':v=>checked.value=v}),
  h(SRadioGroup,{id:'consumer-radio',label:'가상 종류',options:choices,modelValue:choice.value,'onUpdate:modelValue':v=>choice.value=v}),
  h(SSwitch,{id:'consumer-switch',label:'가상 설정',modelValue:checked.value,'onUpdate:modelValue':v=>checked.value=v}),
  h(SSelect,{id:'consumer-select',label:'가상 분류',options:choices,modelValue:choice.value,'onUpdate:modelValue':v=>choice.value=v}),
  h(STextarea,{id:'consumer-note',label:'가상 메모',modelValue:text.value,'onUpdate:modelValue':v=>text.value=v}),
  h(SNumberInput,{id:'consumer-count',label:'가상 개수',modelValue:amount.value,min:0,max:10,step:2,'onUpdate:modelValue':v=>amount.value=v}),
  h(STabs,{id:'consumer-tabs',label:'가상 탭',modelValue:tab.value,items:[{value:'a',label:'A'},{value:'b',label:'B'}],'onUpdate:modelValue':v=>tab.value=v},{'panel-a':()=>h('p','가상 요약'),'panel-b':()=>h('p','가상 상세')}),
  h(SSnackbar,{id:'consumer-toast',message:'가상 알림',modelValue:toast.value,'onUpdate:modelValue':v=>toast.value=v}),
  h(SDatePicker,{id:'consumer-date',label:'가상 일정',mode:'range',modelValue:dates.value,'onUpdate:modelValue':v=>dates.value=v}),
  h(SSegmentedControl,{id:'consumer-segment',label:'View',options:choices,modelValue:choice.value,'onUpdate:modelValue':v=>choice.value=v}),
  h(SMultiSelect,{id:'consumer-multi',label:'Tags',options:choices,modelValue:multi.value,'onUpdate:modelValue':v=>multi.value=v}),
  h(SRangeSlider,{id:'consumer-range',label:'Range',modelValue:range.value,'onUpdate:modelValue':v=>range.value=v}),
  h(SSplitBtn,{id:'consumer-split',label:'Export',items:menuItems}),
  h(SContextMenu,{id:'consumer-context',label:'Record',items:menuItems},()=>h('p','Fictional record')),
  h(SResizableSplitPane,{id:'consumer-pane',label:'Layout',primaryLabel:'A',secondaryLabel:'B',modelValue:ratio.value,'onUpdate:modelValue':v=>ratio.value=v},{primary:()=>h('p','A'),secondary:()=>h('p','B')}),
  h(STimePicker,{id:'consumer-time',label:'가상 시각',modelValue:time.value,min:'09:00',max:'18:00',step:15,'onUpdate:modelValue':v=>time.value=v})
]));}});
const language=ref('en-US');
const localeSource:SolLocaleSource=()=>({code:language.value});
provideSolLocale(app,localeSource);
void formatSolNumber(1234.5,language.value);void parseSolNumber('1,234.5','en');void formatSolDate('2026-10-21','en');void resolveSolLocale('en');
// @ts-expect-error Locale source values must be a code or a partial pack.
const invalidLocale:SolLocaleSource=42;void invalidLocale;
app.use(createVuetify()).use(SolyiUI).mount('#app');

// @ts-expect-error Removed legacy component compatibility export.
import type {SolButton as RemovedLegacyButton} from '@solyi/vue-ui';

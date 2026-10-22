import {createApp,h,ref} from 'vue';
import {createVuetify} from 'vuetify';
import {VApp} from 'vuetify/components/VApp';
import SolyiUI,{SolButton,SolField,SolDialog,SolTable,SolCheckbox,SolRadioGroup,SolSwitch,SolSelect,SolTextarea,SolNumberInput,SolTabs,SolToast,SolDatePicker,SolTimePicker,koLocale,uiVersion} from '@solyi/vue-ui';
import type {DateValue,DateRange,SolOption,SolPickerHandle,SolNumberInputHandle,SolLocale} from '@solyi/vue-ui';
import type {TableColumn,TableRow,TableSort,ButtonVariant} from '@solyi/vue-ui';
import {tokens,coreVersion} from '@solyi/core';
import {solIcon,solIconPaths} from '@solyi/core/icons';
import '@solyi/core/tokens.css';
import '@solyi/core/components.css';
import 'vuetify/styles';
import '@solyi/vue-ui/styles.css';
const columns:TableColumn[]=[{key:'name',label:'이름',sortable:true},{key:'date',label:'변경일',width:'128px'}];
const rows:TableRow[]=[{id:'a',name:'가상 기록',date:'2026-10-21'}];
const variant:ButtonVariant='primary';
type ButtonProps=InstanceType<typeof SolButton>['$props'];
const validProps:ButtonProps={variant:'inline',loading:true};
// @ts-expect-error Unsupported variant must fail, not silently accept arbitrary strings.
const invalidVariant:ButtonProps={variant:'rainbow'};
// @ts-expect-error Sort direction is a defined accessibility state.
const invalidSort:TableSort={key:'name',direction:'up'};
void validProps;void invalidVariant;void invalidSort;
const choices:SolOption[]=[{value:'note',label:'기록'},{value:'plan',label:'계획',disabled:true}];
const validRange:DateRange={start:'2026-10-21',end:'2026-10-24'};
const picker=ref<SolPickerHandle|null>(null),numberHandle=ref<SolNumberInputHandle|null>(null);void picker;void numberHandle;
const localeOverride:Partial<SolLocale>={code:'en-GB',firstDay:1,clear:'Reset'};void localeOverride;
// @ts-expect-error Checkbox is boolean, not a string model.
const badCheckbox:InstanceType<typeof SolCheckbox>['$props']={id:'bad',label:'bad',modelValue:'true'};
// @ts-expect-error RadioGroup takes one string, not an array.
const badRadio:InstanceType<typeof SolRadioGroup>['$props']={id:'bad',label:'bad',options:choices,modelValue:['note']};
// @ts-expect-error Switch is boolean.
const badSwitch:InstanceType<typeof SolSwitch>['$props']={id:'bad',label:'bad',modelValue:1};
// @ts-expect-error Native Select values are strings.
const badSelect:InstanceType<typeof SolSelect>['$props']={id:'bad',label:'bad',options:[{value:1,label:'bad'}]};
// @ts-expect-error Multiline text remains a string.
const badText:InstanceType<typeof SolTextarea>['$props']={id:'bad',label:'bad',modelValue:1};
// @ts-expect-error Number model must not silently accept numeric strings.
const badNumber:InstanceType<typeof SolNumberInput>['$props']={id:'bad',label:'bad',modelValue:'1'};
// @ts-expect-error Tab activation is a defined contract.
const badTabs:InstanceType<typeof SolTabs>['$props']={id:'bad',label:'bad',modelValue:'a',items:[],activation:'hover'};
// @ts-expect-error Live urgency is limited to the ARIA values.
const badToast:InstanceType<typeof SolToast>['$props']={id:'bad',message:'bad',live:'loud'};
// @ts-expect-error A range requires both date-only endpoints.
const badDate:DateValue={start:'2026-10-21'};
// @ts-expect-error Date mode is single or range.
const badMode:InstanceType<typeof SolDatePicker>['$props']={id:'bad',label:'bad',mode:'multiple'};
// @ts-expect-error Time model is HH:mm string or null.
const badTime:InstanceType<typeof SolTimePicker>['$props']={id:'bad',label:'bad',modelValue:930};
void [badCheckbox,badRadio,badSwitch,badSelect,badText,badNumber,badTabs,badToast,badDate,badMode,badTime];
const chevron=solIcon('chevron',{size:20});void chevron;void solIconPaths.close;
const invalidIconTypeOnly=()=>{
  // @ts-expect-error Only the shared icon names are accepted.
  solIcon('unregistered-symbol');
};void invalidIconTypeOnly;
const app=createApp({setup(){const text=ref(''),open=ref(false),sort=ref<TableSort|null>(null),selected=ref<string[]>([]),checked=ref(false),choice=ref<string|null>('note'),amount=ref<number|null>(2),tab=ref('a'),toast=ref(false),dates=ref<DateValue>(validRange),time=ref<string|null>('09:00');return()=>h(VApp,{},()=>h('main',{style:'padding:24px'},[
  h('h1',`Independent tarball consumer: ${coreVersion}/${uiVersion} (${tokens.version})`),
  h(SolField,{id:'consumer-title',label:'가상 제목',modelValue:text.value,'onUpdate:modelValue':value=>text.value=value}),
  h(SolButton,{variant,onClick:()=>open.value=true},()=> '열기'),
  h(SolDialog,{id:'consumer-dialog',title:'가상 상세',modelValue:open.value,'onUpdate:modelValue':value=>open.value=value},()=>text.value),
  h(SolTable,{caption:'가상 자료',columns,rows,sort:sort.value,selected:selected.value,selectable:true,'onUpdate:sort':value=>sort.value=value,'onUpdate:selected':value=>selected.value=value}),
  h(SolCheckbox,{id:'consumer-check',label:'가상 확인',modelValue:checked.value,'onUpdate:modelValue':v=>checked.value=v}),
  h(SolRadioGroup,{id:'consumer-radio',label:'가상 종류',options:choices,modelValue:choice.value,'onUpdate:modelValue':v=>choice.value=v}),
  h(SolSwitch,{id:'consumer-switch',label:'가상 설정',modelValue:checked.value,'onUpdate:modelValue':v=>checked.value=v}),
  h(SolSelect,{id:'consumer-select',label:'가상 분류',options:choices,modelValue:choice.value,'onUpdate:modelValue':v=>choice.value=v}),
  h(SolTextarea,{id:'consumer-note',label:'가상 메모',modelValue:text.value,'onUpdate:modelValue':v=>text.value=v}),
  h(SolNumberInput,{id:'consumer-count',label:'가상 개수',modelValue:amount.value,min:0,max:10,step:2,'onUpdate:modelValue':v=>amount.value=v}),
  h(SolTabs,{id:'consumer-tabs',label:'가상 탭',modelValue:tab.value,items:[{value:'a',label:'A'},{value:'b',label:'B'}],'onUpdate:modelValue':v=>tab.value=v},{'panel-a':()=>h('p','가상 요약'),'panel-b':()=>h('p','가상 상세')}),
  h(SolToast,{id:'consumer-toast',message:'가상 알림',modelValue:toast.value,'onUpdate:modelValue':v=>toast.value=v}),
  h(SolDatePicker,{id:'consumer-date',label:'가상 일정',mode:'range',modelValue:dates.value,'onUpdate:modelValue':v=>dates.value=v}),
  h(SolTimePicker,{id:'consumer-time',label:'가상 시각',modelValue:time.value,min:'09:00',max:'18:00',step:15,'onUpdate:modelValue':v=>time.value=v})
]));}});
app.use(createVuetify()).use(SolyiUI,{locale:koLocale}).mount('#app');

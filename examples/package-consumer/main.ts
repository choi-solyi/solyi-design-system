import {createApp,h,ref} from 'vue';
import {createVuetify} from 'vuetify';
import {VApp} from 'vuetify/components/VApp';
import {SolButton,SolField,SolDialog,SolTable,uiVersion} from '@solyi/vue-ui';
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
const chevron=solIcon('chevron',{size:20});void chevron;void solIconPaths.close;
const invalidIconTypeOnly=()=>{
  // @ts-expect-error Only the shared icon names are accepted.
  solIcon('unregistered-symbol');
};void invalidIconTypeOnly;
const app=createApp({setup(){const text=ref(''),open=ref(false),sort=ref<TableSort|null>(null),selected=ref<string[]>([]);return()=>h(VApp,{},()=>h('main',{style:'padding:24px'},[
  h('h1',`Independent tarball consumer: ${coreVersion}/${uiVersion} (${tokens.version})`),
  h(SolField,{id:'consumer-title',label:'가상 제목',modelValue:text.value,'onUpdate:modelValue':value=>text.value=value}),
  h(SolButton,{variant,onClick:()=>open.value=true},()=> '열기'),
  h(SolDialog,{id:'consumer-dialog',title:'가상 상세',modelValue:open.value,'onUpdate:modelValue':value=>open.value=value},()=>text.value),
  h(SolTable,{caption:'가상 자료',columns,rows,sort:sort.value,selected:selected.value,selectable:true,'onUpdate:sort':value=>sort.value=value,'onUpdate:selected':value=>selected.value=value})
]));}});
app.use(createVuetify()).mount('#app');

import {computed,defineComponent,h,ref,watch} from 'vue';
import type {PropType} from 'vue';
import {SBtn} from './index';
import {formatSolNumber,useSolLocale} from './locale';
import type {SolLocale} from './locale';

export interface SBreadcrumbItem {id:string;label:string;href?:string;disabled?:boolean}
export const SBreadcrumbs=defineComponent({name:'SBreadcrumbs',inheritAttrs:false,props:{items:{type:Array as PropType<readonly SBreadcrumbItem[]>,required:true},current:String,label:String,locale:Object as PropType<Partial<SolLocale>>},emits:{navigate:(_item:SBreadcrumbItem,_event:MouseEvent)=>true},setup(p,{attrs,emit}){
  const l=useSolLocale(()=>p.locale);
  return()=>h('nav',{...attrs,class:['sol-breadcrumbs sol-ui-breadcrumbs',attrs.class],'aria-label':p.label||l.value.breadcrumb},h('ol',p.items.map((item,index)=>{
    const current=p.current===undefined?index===p.items.length-1:item.id===p.current;
    return h('li',{key:item.id,'aria-current':current?'page':undefined},current?h('span',item.label):item.disabled?h('span',{'aria-disabled':'true'},item.label):item.href?h('a',{href:item.href,onClick:(event:MouseEvent)=>emit('navigate',item,event)},item.label):h(SBtn,{variant:'inline',onClick:(event:MouseEvent)=>emit('navigate',item,event)},()=>item.label));
  })));
}});

export const SAvatar=defineComponent({name:'SAvatar',inheritAttrs:false,props:{label:{type:String,required:true},src:String,initials:String,size:{type:Number as PropType<24|32|40|48>,default:40}},emits:{error:(_event:Event)=>true},setup(p,{attrs,slots,emit}){
  const failed=ref(false);watch(()=>p.src,()=>failed.value=false);
  return()=>h('span',{...attrs,class:['sol-avatar sol-ui-avatar',attrs.class],role:'img','aria-label':p.label,style:{width:p.size+'px',height:p.size+'px'}},p.src&&!failed.value?h('img',{src:p.src,alt:'','aria-hidden':'true',onError:(e:Event)=>{failed.value=true;emit('error',e);}}):h('span',{'aria-hidden':'true'},slots.default?.()||p.initials||Array.from(p.label.trim()).slice(0,2).join('')));
}});

export interface SStep {id:string;label:string;description?:string;disabled?:boolean}
export const SStepper=defineComponent({name:'SStepper',inheritAttrs:false,props:{id:{type:String,required:true},label:String,items:{type:Array as PropType<readonly SStep[]>,required:true},modelValue:{type:String as PropType<string|null>,default:null},completed:{type:Array as PropType<readonly string[]>,default:()=>[]},interactive:Boolean,disabled:Boolean,readonly:Boolean,locale:Object as PropType<Partial<SolLocale>>},emits:{'update:modelValue':(_id:string)=>true,change:(_id:string)=>true},setup(p,{attrs,emit}){
  const l=useSolLocale(()=>p.locale);
  const choose=(item:SStep)=>{if(p.interactive&&!p.disabled&&!p.readonly&&!item.disabled&&p.modelValue!==item.id){emit('update:modelValue',item.id);emit('change',item.id);}};
  return()=>h('nav',{...attrs,id:p.id,class:['sol-ui-stepper',attrs.class],'aria-label':p.label||l.value.steps},h('ol',p.items.map((item,index)=>{
    const current=p.modelValue===item.id,done=p.completed.includes(item.id),content=()=>[
      h('span',{class:'sol-ui-step-number','aria-hidden':'true'},done?'✓':formatSolNumber(index+1,l.value)),
      h('span',{class:'sol-ui-step-copy'},[h('span',item.label),item.description?h('span',{class:'sol-hint'},item.description):null]),
      current||done?h('span',{class:'sol-ui-sr-only'},current?l.value.currentStep:l.value.completeStep):null
    ];
    return h('li',{key:item.id,'aria-current':current?'step':undefined,'data-state':current?'current':done?'complete':'upcoming'},p.interactive?h(SBtn,{variant:'subtle',disabled:p.disabled||!!item.disabled,'aria-disabled':p.readonly?'true':undefined,onClick:()=>choose(item)},content):h('div',{class:'sol-ui-step-content','aria-disabled':item.disabled?'true':undefined},content()));
  })));
}});

export interface SBarChartItem {id:string;label:string;value:number}
export const SBarChart=defineComponent({name:'SBarChart',inheritAttrs:false,props:{id:{type:String,required:true},label:{type:String,required:true},items:{type:Array as PropType<readonly SBarChartItem[]>,required:true},max:Number,loading:Boolean,showTable:{type:Boolean,default:true},categoryLabel:String,valueLabel:String,locale:Object as PropType<Partial<SolLocale>>},setup(p,{attrs}){
  const l=useSolLocale(()=>p.locale),limit=computed(()=>p.max??Math.max(1,...p.items.map(item=>item.value))),valid=computed(()=>Number.isFinite(limit.value)&&limit.value>0&&p.items.every(item=>Number.isFinite(item.value)&&item.value>=0&&item.value<=limit.value));
  return()=>h('figure',{...attrs,id:p.id,class:['sol-ui-bar-chart',attrs.class],'aria-labelledby':p.id+'-caption','aria-busy':String(p.loading)},[
    h('figcaption',{id:p.id+'-caption'},p.label),
    p.loading?h('p',{role:'status'},l.value.tableLoading):!valid.value?h('p',{role:'alert'},l.value.chartInvalid):!p.items.length?h('p',{role:'status'},l.value.tableEmpty):[
      h('svg',{viewBox:'0 0 480 200',role:'img','aria-labelledby':p.id+'-svg-title',preserveAspectRatio:'xMidYMid meet'},[
        h('title',{id:p.id+'-svg-title'},p.label),
        h('line',{x1:16,y1:164,x2:464,y2:164,stroke:'var(--sol-color-control-border)'}),
        ...p.items.map((item,index)=>{const step=448/p.items.length,width=Math.min(48,step*.6),x=16+step*(index+.5),height=140*item.value/limit.value;return h('g',{key:item.id},[
          h('rect',{x:x-width/2,y:164-height,width,height,fill:'var(--sol-color-accent)'}),
          h('text',{x,y:Math.max(14,156-height),'text-anchor':'middle',class:'sol-ui-chart-value'},formatSolNumber(item.value,l.value)),
          h('text',{x,y:188,'text-anchor':'middle',class:'sol-ui-chart-label'},Array.from(item.label).length>8?Array.from(item.label).slice(0,7).join('')+'…':item.label)
        ]);})
      ]),
      h('table',{class:['sol-ui-chart-table',p.showTable?'':'sol-ui-sr-only']},[
        h('caption',p.label),h('thead',h('tr',[h('th',{scope:'col'},p.categoryLabel||l.value.chartCategory),h('th',{scope:'col'},p.valueLabel||l.value.chartValue)])),
        h('tbody',p.items.map(item=>h('tr',{key:item.id},[h('th',{scope:'row'},item.label),h('td',formatSolNumber(item.value,l.value))])))
      ])
    ]
  ]);
}});

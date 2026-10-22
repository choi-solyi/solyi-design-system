import {defineComponent,h} from 'vue';
import type {PropType} from 'vue';
import {useSolLocale,formatSolNumber} from './locale';
import type {SolLocale} from './locale';

export type SProgressState='determinate'|'indeterminate'|'complete'|'error';
export interface SProgressOptions {modelValue?:number;min?:number;max?:number;state?:SProgressState}
/** Display-only normalization. Never emits or changes the consuming app's model. */
export function resolveSProgress({modelValue=0,min=0,max=100,state='determinate'}:SProgressOptions={}){
 const valid=Number.isFinite(min)&&Number.isFinite(max)&&max>min&&['determinate','indeterminate','complete','error'].includes(state)&&(state==='indeterminate'||state==='complete'||Number.isFinite(modelValue));
 const known=valid&&state!=='indeterminate',value=known?(state==='complete'?max:Math.max(min,Math.min(max,modelValue))):undefined;
 return {valid,known,value,min:valid?min:0,max:valid?max:100,ratio:known?(value!-min)/(max-min):undefined,state};
}
const props={id:{type:String,required:true as const},label:{type:String,required:true as const},modelValue:{type:Number,default:0},min:{type:Number,default:0},max:{type:Number,default:100},state:{type:String as PropType<SProgressState>,default:'determinate'},message:{type:String,default:''},showLabel:{type:Boolean,default:true},showValue:{type:Boolean,default:true},showMessage:{type:Boolean,default:true},announce:{type:Boolean,default:false},locale:Object as PropType<Partial<SolLocale>>,size:{type:Number,default:96}};
function progress(name:string,circular:boolean){return defineComponent({name,inheritAttrs:false,props,setup(p,{attrs,slots}){const l=useSolLocale(()=>p.locale);return()=>{
 const info=resolveSProgress(p),percent=info.known?formatSolNumber(info.ratio!,l.value,{style:'percent',maximumSignificantDigits:3}):'',text=p.message||(!info.valid?l.value.progressInvalid:p.state==='indeterminate'?l.value.progressUnknown:p.state==='complete'?l.value.progressComplete+' · '+percent:p.state==='error'?l.value.progressError(percent):l.value.progressRunning(percent));
 const visibleText=p.message||(!info.valid?l.value.progressInvalid:p.state==='indeterminate'?l.value.progressUnknown:p.showValue?text:p.state==='complete'?l.value.progressComplete:p.state==='error'?l.value.progressFailed:l.value.progressPending);
 const size=Number.isFinite(p.size)?Math.max(48,Math.min(256,p.size)):96;
 const meter={...attrs,id:p.id,role:'progressbar','aria-labelledby':p.id+'-label','aria-describedby':[p.id+'-status',attrs['aria-describedby']].filter(Boolean).join(' '),'aria-valuemin':info.min,'aria-valuemax':info.max,'aria-valuenow':info.value,'aria-valuetext':text};
 return h('div',{class:'sol-ui-progress sol-progress-demo','data-state':p.state},[
 h('span',{id:p.id+'-label',class:p.showLabel?'sol-label':'sol-ui-sr-only'},slots.label?.()||p.label),
 circular?h('div',{...meter,class:['sol-progress-circle sol-ui-progress-circle',attrs.class],style:[{width:size+'px'},attrs.style]},[
 h('svg',{viewBox:'0 0 100 100','aria-hidden':'true',focusable:'false'},[h('circle',{class:'sol-progress-track',cx:50,cy:50,r:40}),h('circle',{class:'sol-progress-arc',cx:50,cy:50,r:40,pathLength:100,style:{strokeDasharray:info.known?'100':'24 76',strokeDashoffset:info.known?String(100-info.ratio!*100):'0',visibility:info.known&&info.ratio===0?'hidden':undefined}})]),p.showValue?h('span',{class:'sol-progress-circle-text','aria-hidden':'true'},!info.valid?'!':p.state==='error'?'! '+percent:p.state==='complete'?'✓ '+percent:info.known?percent:l.value.progressPending):null
 ]):h('div',{...meter,class:['sol-progress sol-ui-progress-linear',attrs.class],style:attrs.style},h('span',{'aria-hidden':'true',class:'sol-ui-progress-fill',style:{width:info.known?String(info.ratio!*100)+'%':'35%'}})),
 !circular&&p.showValue&&!p.showMessage?h('span',{class:'sol-ui-progress-value','aria-hidden':'true'},percent):null,
 h('p',{id:p.id+'-status',class:p.showMessage?'sol-ui-progress-status':'sol-ui-sr-only',role:p.announce?'status':undefined,'aria-live':p.announce?'polite':undefined,'aria-atomic':p.announce?'true':undefined},p.showMessage?visibleText:text)
 ]);
};}});}
export const SProgressLinear=progress('SProgressLinear',false);
export const SProgressCircular=progress('SProgressCircular',true);

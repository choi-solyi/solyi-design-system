import {defineComponent,h,ref,watch,nextTick,onMounted} from 'vue';
import type {PropType,Slots} from 'vue';
import {useSolLocale,formatSolNumber,parseSolNumber} from './locale';
import type {SolLocale} from './locale';
import {validationProps,useSFieldValidation,fieldError,fieldDisabled,fieldReadonly} from './form';
import { addNumberStep, isNumberStepAligned } from './number-step'

export interface SolOption {value:string;label:string;description?:string;disabled?:boolean}
export interface SolNumberInputHandle {focus():void;validate():boolean;resetValidation():void}
export const displayFieldProps = {
  id: {type: String, required: true as const},
  label: {type: String, required: true as const},
  help: {type: String, default: ''},
  error: {type: String, default: ''},
  disabled: Boolean,
  readonly: Boolean,
  locale: Object as PropType<Partial<SolLocale>>,
}
export const commonFieldProps = {...validationProps, ...displayFieldProps, required: Boolean}
type Field = {
  id: string
  label: string
  help: string
  error: string
  disabled: boolean
  readonly: boolean
  required?: boolean
}
export function fieldDescription(p:Field,slots:Slots,error=fieldError(p),external?:unknown){return [p.help||slots.help?p.id+'-help':'',error?p.id+'-error':'',external].filter(Boolean).join(' ')||undefined;}
export function fieldMessages(p:Field,slots:Slots,error=fieldError(p)){return [p.help||slots.help?h('div',{id:p.id+'-help',class:'sol-hint'},slots.help?.()||p.help):null,error?h('p',{id:p.id+'-error',class:'sol-error',role:'alert'},error):null];}
export function fieldLabel(p:Field,slots:Slots,required:string){return h('label',{id:p.id+'-label',for:p.id,class:'sol-label'},[slots.label?.()||p.label,p.required?` (${required})`:'']);}
const stopReadonly=(p:Field,e:Event)=>{if(fieldReadonly(p))e.preventDefault();};
const readonlyKeys=(p:Field,e:KeyboardEvent)=>{if(fieldReadonly(p)&&!['Tab','Escape','Shift','Control','Alt','Meta'].includes(e.key))e.preventDefault();};

export const SCheckbox=defineComponent({name:'SCheckbox',inheritAttrs:false,props:{...commonFieldProps,modelValue:Boolean},emits:{'update:modelValue':(_v:boolean)=>true,change:(_v:boolean)=>true,blur:(_e:FocusEvent)=>true},setup(p,{attrs,slots,emit,expose}){
 const l=useSolLocale(()=>p.locale),input=ref<HTMLElement|null>(null);const validation=useSFieldValidation(p,()=>p.modelValue,{focus:()=>input.value?.focus()});expose(validation);return()=>h('div',{class:['sol-ui-native-field',attrs.class]},[h('label',{class:'sol-choice',for:p.id},[h('input',{...attrs,ref:input,class:'sol-ui-choice-input',id:p.id,type:'checkbox',checked:p.modelValue,disabled:fieldDisabled(p),required:p.required,'aria-readonly':fieldReadonly(p)?'true':undefined,'aria-invalid':fieldError(p)?'true':undefined,'aria-describedby':fieldDescription(p,slots,fieldError(p),attrs['aria-describedby']),onClick:(e:MouseEvent)=>stopReadonly(p,e),onChange:(e:Event)=>{const input=e.target as HTMLInputElement;if(fieldReadonly(p)||fieldDisabled(p)){input.checked=p.modelValue;return;}emit('update:modelValue',input.checked);emit('change',input.checked);},onBlur:(e:FocusEvent)=>{validation.validate();emit('blur',e);}}),h('span',slots.label?.()||p.label),p.required?h('span',{class:'sol-hint'},` (${l.value.required})`):null]),...fieldMessages(p,slots)]);
}});
export const SRadioGroup=defineComponent({name:'SRadioGroup',inheritAttrs:false,props:{...commonFieldProps,modelValue:{type:String as PropType<string|null>,default:null},options:{type:Array as PropType<readonly SolOption[]>,required:true},layout:{type:String as PropType<'list'|'cards'>,default:'list'},name:String},emits:{'update:modelValue':(_v:string)=>true,change:(_v:string)=>true},setup(p,{attrs,slots,emit,expose}){
 const l=useSolLocale(()=>p.locale),inputs=new Map<string,HTMLElement>();const validation=useSFieldValidation(p,()=>p.modelValue,{focus:()=>{const option=p.options.find(o=>!o.disabled&&o.value===p.modelValue)||p.options.find(o=>!o.disabled);if(option)inputs.get(option.value)?.focus();}});expose(validation);return()=>h('fieldset',{...attrs,id:p.id,disabled:fieldDisabled(p),class:['sol-ui-native-field sol-choice-fieldset',attrs.class],'aria-describedby':fieldDescription(p,slots,fieldError(p),attrs['aria-describedby']),'aria-invalid':fieldError(p)?'true':undefined},[h('legend',{id:p.id+'-label',class:'sol-label'},[slots.label?.()||p.label,p.required?` (${l.value.required})`:'']),...p.options.map((o,i)=>h('label',{class:['sol-choice',p.layout==='cards'?'sol-ui-radio-card':undefined],for:p.id+'-'+i},[h('input',{id:p.id+'-'+i,type:'radio',ref:(el:unknown)=>{if(el)inputs.set(o.value,el as HTMLElement);else inputs.delete(o.value);},name:p.name||p.id,value:o.value,checked:p.modelValue===o.value,disabled:fieldDisabled(p)||o.disabled,required:p.required,'aria-disabled':fieldReadonly(p)?'true':undefined,onClick:(e:MouseEvent)=>stopReadonly(p,e),onKeydown:(e:KeyboardEvent)=>readonlyKeys(p,e),onChange:(e:Event)=>{if(fieldDisabled(p)||fieldReadonly(p)){(e.target as HTMLInputElement).checked=p.modelValue===o.value;return;}emit('update:modelValue',o.value);emit('change',o.value);}}),h('span',[h('span',o.label),o.description?h('span',{class:'sol-hint sol-ui-option-description'},o.description):null])])),...fieldMessages(p,slots)]);
}});
export const SSwitch=defineComponent({name:'SSwitch',inheritAttrs:false,props:{...commonFieldProps,modelValue:Boolean},emits:{'update:modelValue':(_v:boolean)=>true,change:(_v:boolean)=>true},setup(p,{attrs,slots,emit,expose}){const l=useSolLocale(()=>p.locale),input=ref<HTMLElement|null>(null);const validation=useSFieldValidation(p,()=>p.modelValue,{focus:()=>input.value?.focus()});expose(validation);return()=>h('div',{class:'sol-ui-native-field'},[h('label',{class:'sol-choice',for:p.id},[h('input',{...attrs,ref:input,id:p.id,type:'checkbox',role:'switch',class:['sol-ui-switch-input',attrs.class],checked:p.modelValue,disabled:fieldDisabled(p),required:p.required,'aria-checked':String(p.modelValue),'aria-readonly':fieldReadonly(p)?'true':undefined,'aria-describedby':fieldDescription(p,slots,fieldError(p),attrs['aria-describedby']),'aria-invalid':fieldError(p)?'true':undefined,onClick:(e:MouseEvent)=>stopReadonly(p,e),onChange:(e:Event)=>{const input=e.target as HTMLInputElement;if(fieldDisabled(p)||fieldReadonly(p)){input.checked=p.modelValue;return;}emit('update:modelValue',input.checked);emit('change',input.checked);}}),h('span',slots.label?.()||p.label),p.required?' ('+l.value.required+')':'']),...fieldMessages(p,slots)]);}});
export const SSelect=defineComponent({name:'SSelect',inheritAttrs:false,props:{...commonFieldProps,modelValue:{type:String as PropType<string|null>,default:null},options:{type:Array as PropType<readonly SolOption[]>,required:true},placeholder:String},emits:{'update:modelValue':(_v:string|null)=>true,change:(_v:string|null)=>true,blur:(_e:FocusEvent)=>true},setup(p,{attrs,slots,emit,expose}){
 const l=useSolLocale(()=>p.locale),input=ref<HTMLElement|null>(null);const validation=useSFieldValidation(p,()=>p.modelValue,{focus:()=>input.value?.focus()});expose(validation);return()=>h('div',{class:'sol-field sol-ui-native-field'},[fieldLabel(p,slots,l.value.required),h('select',{...attrs,ref:input,id:p.id,value:p.modelValue??'',class:['sol-select',attrs.class],disabled:fieldDisabled(p),required:p.required,'aria-readonly':fieldReadonly(p)?'true':undefined,'aria-invalid':fieldError(p)?'true':undefined,'aria-describedby':fieldDescription(p,slots,fieldError(p),attrs['aria-describedby']),onPointerdown:(e:PointerEvent)=>stopReadonly(p,e),onKeydown:(e:KeyboardEvent)=>readonlyKeys(p,e),onChange:(e:Event)=>{let input=e.target as HTMLSelectElement;if(fieldDisabled(p)||fieldReadonly(p)){input.value=p.modelValue??'';return;}const value=input.value||null;emit('update:modelValue',value);emit('change',value);},onBlur:(e:FocusEvent)=>{validation.validate();emit('blur',e);}},[h('option',{value:'',disabled:p.required},p.placeholder??l.value.choose),...p.options.map(o=>h('option',{value:o.value,disabled:o.disabled},o.label))]),...fieldMessages(p,slots)]);
}});
export const STextarea=defineComponent({name:'STextarea',inheritAttrs:false,props:{...commonFieldProps,modelValue:{type:String,default:''},rows:{type:Number,default:3},maxlength:Number,showCount:{type:Boolean,default:true}},emits:{'update:modelValue':(_v:string)=>true,change:(_v:string)=>true,blur:(_e:FocusEvent)=>true},setup(p,{attrs,slots,emit,expose}){
 const l=useSolLocale(()=>p.locale),input=ref<HTMLElement|null>(null);const validation=useSFieldValidation(p,()=>p.modelValue,{focus:()=>input.value?.focus()});expose(validation);return()=>h('div',{class:'sol-field sol-ui-native-field'},[fieldLabel(p,slots,l.value.required),h('textarea',{...attrs,ref:input,id:p.id,class:['sol-input sol-textarea',attrs.class],value:p.modelValue,rows:Math.max(3,p.rows),maxlength:p.maxlength,disabled:fieldDisabled(p),readonly:fieldReadonly(p),required:p.required,'aria-invalid':fieldError(p)?'true':undefined,'aria-describedby':fieldDescription(p,slots,fieldError(p),attrs['aria-describedby']),onInput:(e:Event)=>{if(!fieldDisabled(p)&&!fieldReadonly(p))emit('update:modelValue',(e.target as HTMLTextAreaElement).value);},onChange:(e:Event)=>{if(!fieldDisabled(p)&&!fieldReadonly(p))emit('change',(e.target as HTMLTextAreaElement).value);},onBlur:(e:FocusEvent)=>{validation.validate();emit('blur',e);}}),h('div',{class:'sol-ui-field-footer'},[h('div',fieldMessages(p,slots)),p.showCount?h('span',{class:'sol-hint sol-ui-counter'},l.value.count(p.modelValue.length,p.maxlength)):null])]);
}});

export const SNumberInput=defineComponent({name:'SNumberInput',inheritAttrs:false,props:{...commonFieldProps,modelValue:{type:Number as PropType<number|null>,default:null},min:Number,max:Number,step:{type:Number,default:1}},emits:{'update:modelValue':(_v:number|null)=>true,change:(_v:number|null)=>true,invalid:(_v:string)=>true,blur:(_e:FocusEvent)=>true},setup(p,{attrs,slots,emit,expose}){
 const l=useSolLocale(()=>p.locale),draft=ref(p.modelValue===null?'':formatSolNumber(p.modelValue,l.value)),localError=ref(''),input=ref<HTMLInputElement|null>(null);
 const numeric=()=>draft.value.trim()===''?null:parseSolNumber(draft.value,l.value)??NaN;
  function message() {
    const value = numeric()
    if (value === null) return p.required ? l.value.invalidNumber : ''
    if (
      !Number.isFinite(value) ||
      !Number.isFinite(p.step) ||
      p.step <= 0 ||
      (p.min !== undefined && p.max !== undefined && p.min > p.max)
    ) {
      return l.value.invalidNumber
    }
    if ((p.min !== undefined && value < p.min) || (p.max !== undefined && value > p.max)) {
      return l.value.numberRange
    }
    return isNumberStepAligned(value, p.min ?? 0, p.step) ? '' : l.value.numberStep
  }
 function syncValidity(){input.value?.setCustomValidity(fieldError(p)||message());}
 function commit(){if(fieldReadonly(p)||fieldDisabled(p))return !fieldError(p)&&!message();const error=message();localError.value=error;if(error){emit('invalid',error);syncValidity();return false;}const value=numeric();draft.value=value===null?'':formatSolNumber(value,l.value);if(value!==p.modelValue){emit('update:modelValue',value);emit('change',value);}return !p.error&&!p.serverError&&!p.errorMessages.length;}
  function nudgeValue(direction: number): number | null {
    if (!Number.isFinite(p.step) || p.step <= 0) return null
    const base = p.modelValue ?? p.min ?? 0
    const next = p.modelValue === null ? base : addNumberStep(base, direction * p.step)
    if (
      next === null ||
      !Number.isFinite(next) ||
      (p.min !== undefined && next < p.min) ||
      (p.max !== undefined && next > p.max)
    ) {
      return null
    }
    return next
  }
 function nudge(direction: number) {
  if (fieldDisabled(p) || fieldReadonly(p)) return
  const next = nudgeValue(direction)
  if (next === null) return
  draft.value = formatSolNumber(next, l.value)
  commit()
  input.value?.focus()
 }
 const validation=useSFieldValidation(p,numeric,{focus:()=>input.value?.focus(),validateIntrinsic:commit,intrinsicError:()=>localError.value,resetIntrinsic:()=>{localError.value='';}});
 watch(()=>p.modelValue,v=>{draft.value=v===null?'':formatSolNumber(v,l.value);localError.value='';});watch(()=>[draft.value,fieldError(p),p.required,p.min,p.max,p.step],()=>nextTick(syncValidity));watch(l,()=>{if(localError.value)localError.value=message();if(document.activeElement!==input.value&&!message())draft.value=p.modelValue===null?'':formatSolNumber(p.modelValue,l.value);void nextTick(syncValidity);});onMounted(syncValidity);expose(validation);
 return()=>{const error=fieldError(p)||localError.value,value=numeric();return h('div',{class:'sol-field sol-ui-native-field'},[fieldLabel(p,slots,l.value.required),h('div',{class:'sol-ui-number'},[h('button',{type:'button',class:'sol-button',disabled:fieldDisabled(p)||fieldReadonly(p)||nudgeValue(-1)===null,'aria-label':p.label+' '+l.value.decrease,onClick:()=>nudge(-1)},'−'),h('input',{...attrs,ref:input,id:p.id,type:'text',inputmode:'decimal',class:['sol-input',attrs.class],value:draft.value,disabled:fieldDisabled(p),readonly:fieldReadonly(p),required:p.required,role:'spinbutton','aria-valuemin':p.min,'aria-valuemax':p.max,'aria-valuenow':value!==null&&Number.isFinite(value)&&!message()?value:undefined,'aria-invalid':error?'true':undefined,'aria-describedby':fieldDescription(p,slots,error,[p.id+'-constraints',attrs['aria-describedby']].filter(Boolean).join(' ')),onInput:(e:Event)=>{if(fieldReadonly(p)||fieldDisabled(p))return;draft.value=(e.target as HTMLInputElement).value;if(localError.value)localError.value=message();},onBlur:(e:FocusEvent)=>{if(!fieldReadonly(p)&&!fieldDisabled(p))validation.validate();emit('blur',e);},onInvalid:(e:Event)=>{e.preventDefault();commit();input.value?.focus();},onKeydown:(e:KeyboardEvent)=>{if(e.isComposing||fieldReadonly(p)||fieldDisabled(p))return;if(e.key==='Enter'){e.preventDefault();commit();}else if(e.key==='ArrowUp'||e.key==='ArrowDown'){e.preventDefault();nudge(e.key==='ArrowUp'?1:-1);}}}),h('button',{type:'button',class:'sol-button',disabled:fieldDisabled(p)||fieldReadonly(p)||nudgeValue(1)===null,'aria-label':p.label+' '+l.value.increase,onClick:()=>nudge(1)},'+')]),h('span',{id:p.id+'-constraints',class:'sol-hint'},l.value.numberHelp(p.min,p.max,p.step)),...fieldMessages(p,slots,error)]);};
}});

import {useSFieldValidation,fieldError,externalFieldError,fieldDisabled,fieldReadonly} from './form';
import {defineComponent,h,nextTick,onBeforeUnmount,onMounted,ref} from 'vue';
import type {PropType} from 'vue';
import {SBtn} from './index';
import {commonFieldProps,fieldDescription,fieldMessages} from './controls';
import {formatSolNumber,resolveSolLocale,useSolLocale} from './locale';
import type {SolLocale} from './locale';

export type SFileRejectionCode='type'|'size'|'count'|'duplicate';
export interface SFileRejection {file:File;code:SFileRejectionCode;message:string}
export interface SFileInputHandle {focus():void;clear():void;validate():boolean;resetValidation():void}
export interface SFileLimits {accept?:string;maxFiles?:number;maxFileSize?:number}
const same=(a:File,b:File)=>a.name===b.name&&a.size===b.size&&a.type===b.type&&a.lastModified===b.lastModified;
function limits(p:SFileLimits){return {maxFiles:Number.isFinite(p.maxFiles)&&Number(p.maxFiles)>=1?Math.floor(p.maxFiles!):3,maxFileSize:Number.isFinite(p.maxFileSize)&&Number(p.maxFileSize)>=0?p.maxFileSize!:2*1024*1024};}
function bytes(size:number,l:SolLocale){return size<1024?formatSolNumber(size,l)+' B':formatSolNumber(size/1024,l,{maximumFractionDigits:2,maximumSignificantDigits:undefined})+' KiB';}
export function describeSFile(file:File,locale:Partial<SolLocale>|string='ko-KR') {
  const l=resolveSolLocale(locale),extension=file.name.includes('.')?file.name.split('.').at(-1)!.toUpperCase():l.noFileExtension;
  return {name:file.name,extension,mediaType:file.type?l.fileType(file.type):l.unknownFileType,size:bytes(file.size,l)};
}
export function validateSFiles(incoming:readonly File[],existing:readonly File[],options:SFileLimits={},locale:Partial<SolLocale>|string='ko-KR') {
  const l=resolveSolLocale(locale),cap=limits(options),rules=(options.accept||'').split(',').map(x=>x.trim().toLowerCase()).filter(Boolean),files=[...existing],rejected:SFileRejection[]=[];
  for(const file of incoming){
    let code:SFileRejectionCode|undefined,message='';
    const allowed=!rules.length||rules.some(rule=>rule.startsWith('.')?file.name.toLowerCase().endsWith(rule):rule.endsWith('/*')?!!file.type&&file.type.toLowerCase().startsWith(rule.slice(0,-1)):file.type.toLowerCase()===rule);
    if(!allowed){code='type';message=l.unsupportedFile;}
    else if(file.size>cap.maxFileSize){code='size';message=l.oversizedFile(bytes(cap.maxFileSize,l));}
    else if(files.some(item=>same(item,file))){code='duplicate';message=l.duplicateFile;}
    else if(files.length>=cap.maxFiles){code='count';message=l.tooManyFiles(cap.maxFiles);}
    if(code)rejected.push({file,code,message});else files.push(file);
  }
  return {files,rejected};
}

export const SFileInput=defineComponent({name:'SFileInput',inheritAttrs:false,props:{...commonFieldProps,modelValue:{type:Array as PropType<readonly File[]>,default:()=>[]},accept:{type:String,default:'.txt,.png,.jpg,.jpeg,.pdf'},maxFiles:{type:Number,default:3},maxFileSize:{type:Number,default:2*1024*1024},drop:{type:Boolean,default:true}},emits:{'update:modelValue':(_files:File[])=>true,change:(_files:File[])=>true,reject:(_items:SFileRejection[])=>true,remove:(_file:File)=>true,invalid:(_message:string)=>true},setup(p,{attrs,slots,emit,expose}){
  const l=useSolLocale(()=>p.locale),root=ref<HTMLElement|null>(null),input=ref<HTMLInputElement|null>(null),button=ref<{$el?:HTMLElement}|null>(null),dragging=ref(false),rejected=ref<SFileRejection[]>([]),localError=ref('');let depth=0;
  const available=()=>!fieldDisabled(p)&&!fieldReadonly(p);
  const focus=()=>button.value?.$el?.focus();
  function commit(files:File[]){emit('update:modelValue',files);emit('change',files);localError.value='';}
  function add(files:readonly File[]){if(!available())return;const result=validateSFiles(files,p.modelValue,p,l.value);rejected.value=result.rejected;if(result.files.length!==p.modelValue.length)commit(result.files);if(result.rejected.length)emit('reject',result.rejected);}
  function choose(e:Event){add(Array.from((e.target as HTMLInputElement).files||[]));if(input.value)input.value.value='';}
  function remove(file:File){if(!available())return;commit(p.modelValue.filter(item=>item!==file));rejected.value=[];emit('remove',file);void nextTick(focus);}
  function clear(){if(!available())return;commit([]);rejected.value=[];if(input.value)input.value.value='';void nextTick(focus);}
  function validateIntrinsic(){const message=(p.required&&!p.modelValue.length?l.value.fileRequired:'');localError.value=message;if(message)emit('invalid',message);return !externalFieldError(p)&&!message;}
  const isFiles=(e:DragEvent)=>Array.from(e.dataTransfer?.types||[]).includes('Files');
  function enter(e:DragEvent){if(!isFiles(e))return;e.preventDefault();if(p.drop&&available()){depth++;dragging.value=true;}}
  function leave(){depth=Math.max(0,depth-1);if(!depth)dragging.value=false;}
  function over(e:DragEvent){if(!isFiles(e))return;e.preventDefault();if(e.dataTransfer)e.dataTransfer.dropEffect=p.drop&&available()?'copy':'none';}
  function drop(e:DragEvent){if(!isFiles(e))return;e.preventDefault();e.stopPropagation();depth=0;dragging.value=false;if(p.drop)add(Array.from(e.dataTransfer?.files||[]));}
  function guard(e:DragEvent){if(isFiles(e)&&!root.value?.contains(e.target as Node))e.preventDefault();}
  onMounted(()=>{document.addEventListener('dragover',guard);document.addEventListener('drop',guard);});onBeforeUnmount(()=>{document.removeEventListener('dragover',guard);document.removeEventListener('drop',guard);});
  const validation=useSFieldValidation(p,()=>p.modelValue,{focus,validateIntrinsic,intrinsicError:()=>localError.value,resetIntrinsic:()=>{localError.value='';}});
  expose({...validation,clear} satisfies SFileInputHandle);
  return()=>{
    const cap=limits(p),error=fieldError(p)||localError.value;
    return h('div',{...attrs,ref:root,class:['sol-field sol-ui-file',attrs.class],role:'group','aria-labelledby':p.id+'-label','aria-describedby':fieldDescription(p,slots,error,attrs['aria-describedby']),'aria-invalid':error?'true':undefined},[
      h('span',{id:p.id+'-label',class:'sol-label'},[slots.label?.()||p.label,p.required?' ('+l.value.required+')':'']),
      h('div',{class:p.drop?'sol-dropzone':'sol-ui-file-chooser','data-dragging':String(dragging.value),'aria-disabled':!available()?'true':undefined,onDragenter:enter,onDragover:over,onDragleave:leave,onDrop:drop},[
        p.drop?h('p',l.value.dropFiles):null,h('p',{id:p.id+'-limits',class:'sol-hint'},l.value.filesHelp(p.accept,cap.maxFiles,bytes(cap.maxFileSize,l.value))),
        h(SBtn,{ref:button,id:p.id+'-choose',disabled:!available(),'aria-label':p.label+': '+l.value.filesChoose,'aria-describedby':[p.id+'-limits',fieldDescription(p,slots,error)].filter(Boolean).join(' '),onClick:()=>{if(available())input.value?.click();}},()=>l.value.filesChoose),
        h('input',{id:p.id,ref:input,type:'file',hidden:true,disabled:!available(),accept:p.accept,multiple:cap.maxFiles>1,onChange:choose})
      ]),
      ...fieldMessages(p,slots,error),
      rejected.value.length?h('div',{class:'sol-notice danger',role:'alert'},[h('strong',l.value.filesRejected),h('ul',rejected.value.map((item,i)=>h('li',{key:i},item.file.name+': '+item.message)))]):null,
      h('ul',{class:'sol-ui-file-list'},p.modelValue.map((file,i)=>{const info=describeSFile(file,l.value);return h('li',{key:i},[h('div',{class:'sol-ui-file-meta'},[h('strong',file.name),h('span',{class:'sol-hint'},[info.extension,info.mediaType,info.size].join(' · '))]),h(SBtn,{variant:'inline',disabled:!available(),'aria-label':l.value.remove(file.name),onClick:()=>remove(file)},()=>l.value.fileRemove)]);})),
      h(SBtn,{variant:'inline',disabled:!available()||!p.modelValue.length,onClick:clear},()=>l.value.filesClear)
    ]);
  };
}});

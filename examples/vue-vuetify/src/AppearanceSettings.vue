<script setup>
import {useId} from 'vue';
import {mountAppearanceControls} from '../../../site/appearance-controls.js';
import {containShellDialogTab} from '../../../site/shell-dialog.js';
import '../../../site/header-preferences.css';

const props=defineProps({state:{type:Object,required:true},themes:{type:Object,required:true}});
const emit=defineEmits(['change']);
const scope=ref(null),panel=ref(null),trigger=ref(null),prefix=`starter-appearance-${useId()}`;
let controls,media;
function close(){panel.value?.close();}
function open(){controls?.sync();panel.value?.showModal();panel.value?.querySelector('[data-pref-theme]:checked')?.focus();}
function returnFocus(){
 const target=media?.matches?trigger.value:scope.value?.querySelector('.starter-appearance-inline [data-pref-theme]:checked');
 target?.focus({preventScroll:true});
}
function onBreakpoint(){if(!media.matches&&panel.value?.open)close();}
onMounted(()=>{
 controls=mountAppearanceControls(scope.value,{themes:props.themes,getState:()=>props.state,apply:next=>emit('change',next)});
 media=matchMedia('(max-width: 720px)');media.addEventListener('change',onBreakpoint);
});
watch(()=>props.state,()=>controls?.sync(),{deep:true,flush:'sync'});
onBeforeUnmount(()=>{media?.removeEventListener('change',onBreakpoint);controls?.cleanup();});
</script>

<template>
  <section ref="scope" class="starter-appearance" aria-label="화면 설정">
    <div class="starter-appearance-inline">
      <fieldset class="appearance-choice" data-pref-theme-group :data-pref-name="`${prefix}-inline-theme`">
        <legend class="appearance-sr-only">화면 테마</legend>
        <div class="appearance-options"></div>
      </fieldset>
      <button :id="`${prefix}-inline-density`" type="button" class="sol-button appearance-density-toggle" data-pref-density-toggle>기본</button>
      <button type="button" class="sol-button appearance-mode" data-pref-mode-toggle>Dark</button>
    </div>
    <button ref="trigger" type="button" class="sol-button starter-appearance-open" aria-haspopup="dialog" :aria-controls="`${prefix}-panel`" @click="open">화면 설정</button>
    <dialog ref="panel" :id="`${prefix}-panel`" class="starter-appearance-dialog" :aria-labelledby="`${prefix}-title`" @close="returnFocus" @keydown="containShellDialogTab($event,panel)">
      <div class="starter-appearance-heading"><h2 :id="`${prefix}-title`">화면 설정</h2><button type="button" class="sol-button inline-action" @click="close">닫기</button></div>
      <div class="appearance-grid">
        <fieldset class="appearance-choice" data-pref-theme-group :data-pref-name="`${prefix}-panel-theme`"><legend>화면 테마</legend><div class="appearance-options"></div></fieldset>
        <div class="appearance-density-setting"><span class="appearance-density-label">화면 밀도</span><button :id="`${prefix}-panel-density`" type="button" class="sol-button appearance-density-toggle" data-pref-density-toggle>기본</button></div>
        <button type="button" class="sol-button appearance-mode" data-pref-mode-toggle>Dark</button>
      </div>
    </dialog>
  </section>
</template>

<style>
.starter-appearance {margin-block-end:var(--sol-space-4);min-width:0;}
.starter-appearance-inline {display:flex;align-items:center;justify-content:flex-end;gap:var(--sol-space-2);}
.starter-appearance-open {display:none;}
.starter-appearance-dialog {width:min(26rem,calc(100% - 24px));max-width:calc(100% - 24px);max-height:calc(100dvh - 24px);margin:auto;padding:var(--sol-space-4);overflow:auto;border:1px solid var(--sol-color-border);border-radius:var(--sol-radius-panel);background:var(--sol-color-surface);color:var(--sol-color-text);}
.starter-appearance-dialog::backdrop {background:var(--sol-color-backdrop,rgba(20,20,30,.5));}
.starter-appearance-heading {display:flex;align-items:center;justify-content:space-between;gap:var(--sol-space-3);}
.starter-appearance-heading h2 {margin:0;font-size:var(--sol-text-lg);}
.starter-appearance-heading button {flex:none;}
.starter-appearance-dialog .appearance-options {display:flex;width:100%;}
.starter-appearance-dialog .appearance-choice-label {flex:1 1 0;}
.starter-appearance-dialog .appearance-density-toggle {width:100%;}
@media(max-width:720px){.starter-appearance-inline {display:none;}.starter-appearance-open {display:inline-flex;}.starter-appearance-dialog {padding:var(--sol-space-3);}}
</style>

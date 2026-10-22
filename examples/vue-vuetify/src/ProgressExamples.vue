<script setup>
import {ref,computed,nextTick,watch} from 'vue';
import { resolveSProgress } from '@solyi/vue-ui';
const state=ref('determinate'),value=ref(35),restartButton=ref(null);
const showLabel=ref(true),showValue=ref(true),showMessage=ref(true),animated=ref(true);
const options=[{value:'determinate',label:'진행률을 아는 작업'},{value:'indeterminate',label:'처리 중 · 진행률 알 수 없음'},{value:'complete',label:'완료'},{value:'error',label:'오류 · 마지막 값 유지'}];
const info=computed(()=>resolveSProgress({modelValue:value.value,state:state.value}));
const summary=computed(()=>state.value==='indeterminate'?'처리 중 · 진행률을 아직 알 수 없습니다.':state.value==='complete'?'✓ 가상 작업 완료 · 100%':state.value==='error'?'! 가상 오류 · 마지막 확인 '+value.value+'%. 재시도할 수 있습니다.':value.value+'% · 수동으로 조절하는 가상 작업입니다.');
watch(state,v=>{if(v==='complete')value.value=100;});
function update(n){value.value=Math.max(0,Math.min(100,n));state.value=value.value===100?'complete':'determinate';}
async function step(){const active=document.activeElement;update(value.value+10);await nextTick();if(state.value==='complete'&&active?.id==='s-progress-step')restartButton.value?.$el?.focus();}
async function restart(){update(0);await nextTick();restartButton.value?.$el?.focus();}
</script>
<template>
<section class="starter-card" id="s-progress-demo" aria-labelledby="s-progress-title">
 <h2 id="s-progress-title">SProgressLinear / SProgressCircular</h2>
 <p class="starter-hint">실제 패키지의 읽기 전용 진행 표시입니다. 가상 값을 직접 조절하며 서버 전송·작업값 자동 증가는 없습니다. 처리 중 상태는 반복 로딩 표시를 지원하며, 움직임 줄이기에서는 정적인 호·띠로 안내합니다.</p>
 <fieldset class="starter-progress-options"><legend>표시 옵션 · 두 예시에 함께 적용</legend><SCheckbox id="s-progress-animated" v-model="animated" label="처리 중 반복 모션"/><SCheckbox id="s-progress-show-label" v-model="showLabel" label="제목 표시"/><SCheckbox id="s-progress-show-value" v-model="showValue" label="수치 표시"/><SCheckbox id="s-progress-show-message" v-model="showMessage" label="상태 문구 표시"/></fieldset>
 <div class="sol-progress-examples">
  <SProgressLinear id="s-progress-linear" label="선형 진행" :animated="animated" :model-value="value" :state="state" :show-label="showLabel" :show-value="showValue" :show-message="showMessage" />
  <SProgressCircular id="s-progress-circular" label="원형 진행" :animated="animated" :model-value="value" :state="state" :show-label="showLabel" :show-value="showValue" :show-message="showMessage" />
 </div>
 <div class="starter-native-form">
  <SSelect id="s-progress-state" v-model="state" label="가상 진행 상태" :options="options" required />
  <label v-if="info.known" class="sol-field"><span class="sol-label">진행률 조절 · {{value}}%</span><input id="s-progress-value" class="sol-range" type="range" min="0" max="100" step="5" :value="value" :disabled="state==='error'" @input="update(Number($event.target.value))"></label>
  <p id="s-progress-summary" role="status" aria-live="polite">{{summary}}</p>
  <div class="starter-actions"><SBtn id="s-progress-step" :disabled="state!=='determinate'" @click="step">10% 진행</SBtn><SBtn id="s-progress-restart" ref="restartButton" @click="restart">0%에서 재시작</SBtn><SBtn v-if="state==='error'" id="s-progress-retry" variant="inline" @click="restart">오류 후 다시 시도</SBtn></div>
 </div>
 <p class="starter-hint">표시를 꺼도 접근성 이름·상태·수치는 유지합니다. 직접 전달한 message는 앱 문구를 그대로 표시합니다. unknown에는 퍼센트/aria-valuenow가 없고, 오류는 마지막 확인 값을 보존합니다. 상태는 글자·기호로도 표시합니다. 두 부품을 같은 작업에 쓸 때 live 안내는 한곳에서만 제공합니다.</p>
</section>
</template>

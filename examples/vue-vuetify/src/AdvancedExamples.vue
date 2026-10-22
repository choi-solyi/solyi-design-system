<script setup>
import {computed,ref,watch} from 'vue';
import {SSegmentedControl,SMultiSelect,SRangeSlider,SSplitBtn,SContextMenu,SResizableSplitPane,SSwitch,SSelect,SNumberInput,STextarea} from '@solyi/vue-ui';
const disabled=ref(false),readonly=ref(false),display=ref('brief'),selected=ref(['garden']),scenario=ref('local'),requests=ref(0);
const choices=[{value:'garden',label:'정원'},{value:'book',label:'책장'},{value:'walk',label:'산책'},{value:'season',label:'계절 관찰'},{value:'locked',label:'보관 · 선택 불가',disabled:true}];
const loader=computed(()=>{const mode=scenario.value;if(mode==='local')return undefined;return async(query,signal)=>{const attempt=++requests.value;await new Promise((resolve,reject)=>{const timer=setTimeout(()=>{signal.removeEventListener('abort',abort);resolve();},query.includes('느림')?600:180);const abort=()=>{clearTimeout(timer);reject(new DOMException('Cancelled','AbortError'));};signal.addEventListener('abort',abort,{once:true});if(signal.aborted)abort();});if(mode==='retry'&&attempt===1)throw new Error('가상 실패');return choices.filter(o=>o.label.includes(query.trim()));};});
watch(scenario,()=>requests.value=0);
const range=ref([20,80]),action=ref('아직 실행하지 않았어요.'),primaryCount=ref(0),menuOpen=ref(false);
const actions=[{id:'json',label:'JSON으로 내보내기 · 가상'},{id:'csv',label:'CSV로 내보내기 · 가상'},{id:'blocked',label:'예약 · 비활성',disabled:true}];
const contextItems=[{id:'pin',label:'자료 고정 · 가상'},{id:'copy',label:'복제 · 가상'},{id:'archive',label:'보관 · 비활성',disabled:true}];
function chosenAction(id){action.value='✓ '+[...actions,...contextItems].find(i=>i.id===id)?.label+' 동작을 확인했습니다. 외부 작업은 없습니다.';}
const ratio=ref(40),direction=ref('horizontal'),memo=ref('화면 폭을 바꾸어도 이 가상 메모는 유지됩니다.'),stacked=ref(false),resized=ref('');
watch([disabled,readonly],()=>{if(disabled.value||readonly.value)menuOpen.value=false;});
</script>

<template>
  <section class="starter-card" aria-labelledby="advanced-title">
    <h2 id="advanced-title">설정 하나 선택 · SSegmentedControl</h2>
    <p class="starter-hint">선택·범위·메뉴·분할 부품을 설치한 @solyi/vue-ui에서 가져옵니다. 아래 설정은 이 예제들에만 적용됩니다. 모든 데이터와 작업은 가상입니다.</p>
    <div class="starter-settings starter-demo-settings"><SSwitch id="advanced-disabled" v-model="disabled" label="확장 예시 비활성"/><SSwitch id="advanced-readonly" v-model="readonly" label="확장 예시 읽기 전용"/></div>
    <SSegmentedControl id="advanced-segment" v-model="display" label="가상 표시 설정" :options="[{value:'brief',label:'간단히'},{value:'full',label:'자세히'},{value:'locked',label:'보관 · 비활성',disabled:true}]" :disabled="disabled" :readonly="readonly" help="설정 하나를 고릅니다. Tabs처럼 별도 패널을 전환하는 부품은 아닙니다."/>
    <p class="starter-result" role="status">{{display==='brief'?'가상 기록 4개':'가상 기록 4개 · 메모와 변경 정보를 함께 표시하는 설정'}}</p>
  </section>
  <section class="starter-card" aria-labelledby="advanced-multi-title">
    <h2 id="advanced-multi-title">검색 가능한 MultiSelect</h2>
    <SSelect id="advanced-multi-scenario" v-model="scenario" required label="가상 목록 동작" :options="[{value:'local',label:'로컬 검색'},{value:'async',label:'지연 응답 흉내'},{value:'retry',label:'첫 오류 후 재시도'}]" help="외부 요청 없이 브라우저 안에서 지연·실패를 흉내 냅니다. '없는값'으로 결과 없음을 확인할 수 있어요."/>
    <SMultiSelect id="advanced-multi" v-model="selected" label="가상 기록 분류" :options="choices" :load-options="loader" :max-selected="3" required :disabled="disabled" :readonly="readonly" placeholder="분류 이름 검색" help="방향키·Enter로 선택/해제, 빈 검색칸에서 Backspace로 마지막 선택 제거. Escape는 목록만 닫습니다. Tab은 제거/재시도 버튼에도 접근합니다."/>
    <p class="starter-hint">완료 값: {{JSON.stringify(selected)}} · 가상 요청 {{requests}}회. 검색을 바꾸어도 기존 선택은 유지됩니다.</p>
  </section>
  <section class="starter-card" aria-labelledby="advanced-range-title">
    <h2 id="advanced-range-title">양끝 RangeSlider</h2>
    <SRangeSlider id="advanced-range" v-model="range" label="가상 점수 구간" lower-label="하한" upper-label="상한" :min="0" :max="100" :step="5" :format-value="value=>value+'점'" :disabled="disabled" :readonly="readonly" help="두 핸들은 서로 넘어가지 않습니다. 핸들 드래그·방향키 또는 트랙 누르기로 조절하세요."/>
    <div class="starter-control-grid"><SNumberInput id="advanced-lower" required v-model="range[0]" label="하한 직접 입력" :min="0" :max="range[1]" :step="5" :disabled="disabled" :readonly="readonly"/><SNumberInput id="advanced-upper" required v-model="range[1]" label="상한 직접 입력" :min="range[0]" :max="100" :step="5" :disabled="disabled" :readonly="readonly"/></div>
    <p class="starter-hint">숫자 입력도 같은 값을 사용합니다. 터치 보조기술의 사용자별 동작은 실제 기기에서 별도 확인해야 합니다.</p>
  </section>
  <section class="starter-card" aria-labelledby="advanced-actions-title">
    <h2 id="advanced-actions-title">SplitButton · ContextMenu</h2>
    <p class="starter-hint">주 동작과 다른 동작을 분리합니다. 실제 파일을 만들거나 자료를 변경하지 않습니다.</p>
    <SSplitBtn id="advanced-split-button" label="가상 내보내기" :items="actions" :disabled="disabled" :readonly="readonly" @primary="primaryCount++;action='✓ 주 동작 '+primaryCount+'회 · 실제 전송이나 다운로드는 없습니다.'" @select="chosenAction"/>
    <SContextMenu id="advanced-context" v-model:open="menuOpen" label="가상 정원 기록" trigger-label="기록 동작 열기" :items="contextItems" :disabled="disabled" :readonly="readonly" @select="chosenAction"><p><strong>작은 정원 기록</strong></p><p>이 영역에서 우클릭하거나 초점을 두고 Shift+F10을 누르세요. 터치에서도 아래 버튼을 사용할 수 있어요.</p></SContextMenu>
    <p class="starter-result" role="status">{{action}}</p>
  </section>
  <section class="starter-card" aria-labelledby="advanced-pane-title">
    <h2 id="advanced-pane-title">ResizableSplitPane</h2>
    <SSelect id="advanced-pane-direction" v-model="direction" required label="개발 설정 · 분할 방향" :options="[{value:'horizontal',label:'좌우 두 영역'},{value:'vertical',label:'위아래 두 영역'}]"/>
    <SResizableSplitPane id="advanced-pane" v-model="ratio" label="가상 목록과 메모" primary-label="가상 목록" secondary-label="가상 메모" :orientation="direction" :min="25" :max="75" :step="5" :disabled="disabled" :readonly="readonly" @reflow="stacked=$event" @change="resized='조절 완료: '+$event+'%'">
      <template #primary><p>계절 관찰<br>작은 정원<br>저녁 책장</p><p class="starter-hint">중앙 구분선을 드래그하거나 초점을 두고 방향키로 조절합니다.</p></template>
      <template #secondary><STextarea id="advanced-pane-memo" v-model="memo" label="유지되는 가상 메모" :disabled="disabled" :readonly="readonly"/></template>
    </SResizableSplitPane>
    <p class="starter-hint" role="status">저장 비율 {{ratio}}% · {{stacked?'좁은 폭: 세로 순서 표시':'크기 조절 가능'}} · {{resized}}</p>
  </section>
</template>

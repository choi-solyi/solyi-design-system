<script setup>
import { koLocale, enLocale } from 'solyi-ui';
const disabled=ref(false),readonly=ref(false),language=ref('inherit'),locale=computed(()=>language.value==='inherit'?undefined:language.value==='en'?enLocale:koLocale);
const agreement=ref(false),kind=ref('note'),notifications=ref(true),category=ref(null),description=ref(''),count=ref(2),form=ref(null),formStatus=ref(''),errors=ref({});
const options=[{value:'note',label:'기록'},{value:'plan',label:'계획'},{value:'archived',label:'보관 · 비활성 예시',disabled:true}];
watch([agreement,category],()=>{if(errors.value.agreement&&agreement.value)errors.value.agreement='';if(errors.value.category&&category.value)errors.value.category='';});
async function checkFields(){errors.value={agreement:agreement.value?'':'가상 예시 확인을 선택해 주세요.',category:category.value?'':'가상 분류를 골라 주세요.'};await nextTick();const invalid=form.value?.querySelector('[aria-invalid="true"]');if(invalid){formStatus.value='표시된 오류를 확인해 주세요. 값은 유지됩니다.';invalid.focus();}else formStatus.value='✓ 가상 입력을 확인했습니다. 서버 전송·저장은 없습니다.';}
const tab=ref('summary'),activation=ref('automatic'),tabNote=ref(''),tabs=[{value:'summary',label:'요약'},{value:'memo',label:'메모'},{value:'later',label:'비활성 예시',disabled:true}];
const toastOpen=ref(false),toastTone=ref('info'),toastTiming=ref('4000'),toastCount=ref(0),toastMessage=ref(''),toastClosed=ref('');
const toastDuration=computed(()=>toastTone.value==='danger'?0:Number(toastTiming.value||0));
function showToast(){toastMessage.value=`가상 알림 ${++toastCount.value} · 실제 작업이나 전송은 없습니다.`;toastOpen.value=true;}
const mode=ref('range'),dates=ref({start:'2026-10-21',end:'2026-10-24'}),time=ref('09:00'),datePicker=ref(null),timePicker=ref(null),scheduleStatus=ref(''),lastDate=ref('아직 change가 없습니다.');
function checkSchedule(){const dateValid=datePicker.value?.validate(),timeValid=timePicker.value?.validate();if(!dateValid){datePicker.value?.focus();scheduleStatus.value='날짜를 확인해 주세요.';}else if(!timeValid){timePicker.value?.focus();scheduleStatus.value='시각을 확인해 주세요.';}else scheduleStatus.value='✓ 날짜·시각을 확인했습니다. 알림은 예약하지 않습니다.';}
</script>

<template>
  <section class="starter-card" aria-labelledby="extended-title">
    <h2 id="extended-title">실제 패키지 입력 6종</h2>
    <p class="starter-hint">아래 부품은 문서 DOM을 복사하지 않고 solyi-ui에서 import합니다. 모든 값은 가상이며 현재 페이지 메모리에만 남습니다.</p>
    <div class="starter-settings starter-demo-settings">
      <SSwitch id="demo-disabled" v-model="disabled" label="입력 예시 비활성"/>
      <SSwitch id="demo-readonly" v-model="readonly" label="입력 예시 읽기 전용"/>
      <SSelect id="demo-locale" required v-model="language" label="내장 문구 locale 시연" :options="[{value:'inherit',label:'앱 공통 설정'},{value:'ko',label:'한국어'},{value:'en',label:'English'}]" help="컴포넌트 내장 문구와 날짜 형식을 바꿉니다. 문서 전체 번역은 아닙니다."/>
    </div>
    <form ref="form" class="starter-native-form" novalidate @submit.prevent="checkFields">
      <div class="starter-control-grid">
        <SCheckbox id="native-agreement" v-model="agreement" label="가상 예시임을 확인했어요" required :disabled="disabled" :readonly="readonly" :locale="locale" :error="errors.agreement" help="여러 항목의 독립된 예/아니오 선택입니다."/>
        <SRadioGroup id="native-kind" v-model="kind" label="가상 기록 종류" :options="options" :disabled="disabled" :readonly="readonly" :locale="locale" help="한 그룹에서 하나만 고릅니다."/>
        <SSwitch id="native-notifications" v-model="notifications" label="가상 알림 켜기" :disabled="disabled" :readonly="readonly" :locale="locale" help="바로 적용되는 켜기/끄기 예시입니다. 실제 알림은 보내지 않습니다."/>
        <SSelect id="native-category" v-model="category" label="가상 분류" :options="options" required :disabled="disabled" :readonly="readonly" :locale="locale" :error="errors.category" help="문자열 값 하나 또는 null을 받습니다."/>
        <STextarea id="native-description" v-model="description" label="가상 기록 설명" :maxlength="120" :disabled="disabled" :readonly="readonly" :locale="locale" help="최소 3줄, 필요한 경우 세로로 늘릴 수 있습니다."/>
        <SNumberInput id="native-count" v-model="count" label="가상 목표 개수" :min="0" :max="10" :step="2" :disabled="disabled" :readonly="readonly" :locale="locale" help="직접 입력·방향키·작은 증감 버튼을 같은 규칙으로 처리합니다."/>
      </div>
      <div class="starter-actions sol-actions--commit"><SBtn type="submit" variant="primary" :disabled="disabled">가상 입력 확인</SBtn></div>
      <p role="status" class="starter-result">{{formStatus}}</p>
    </form>
  </section>
  <section class="starter-card" aria-labelledby="extended-tabs-title">
    <h2 id="extended-tabs-title">실제 패키지 Tabs</h2>
    <SSelect id="native-tab-activation" required v-model="activation" label="개발 설정 · activation" :options="[{value:'automatic',label:'방향키와 함께 전환'},{value:'manual',label:'방향키 탐색 후 Enter'}]" help="실제 앱에서는 콘텐츠 비용에 맞게 한 설정을 선택합니다."/>
    <STabs id="native-tabs" v-model="tab" label="가상 기록 정보" :items="tabs" :activation="activation" :disabled="disabled" :readonly="readonly">
      <template #panel-summary><p>Tab으로 진입하고 방향키·Home/End로 이동합니다. 비활성 항목은 건너뜁니다.</p><p>닫힌 패널은 hidden이며 값은 유지됩니다.</p></template>
      <template #panel-memo><STextarea id="native-tab-note" v-model="tabNote" label="탭 안의 가상 메모" :disabled="disabled" :readonly="readonly" :locale="locale"/></template>
    </STabs>
  </section>
  <section class="starter-card" aria-labelledby="extended-toast-title">
    <h2 id="extended-toast-title">스낵바 알림</h2>
    <div class="starter-control-grid">
      <SSelect id="native-toast-tone" required v-model="toastTone" label="가상 알림 의미" :options="[{value:'info',label:'정보'},{value:'success',label:'완료'},{value:'warning',label:'확인'},{value:'danger',label:'오류 · 자동 닫기 없음'}]"/>
      <SSelect id="native-toast-duration" required v-model="toastTiming" label="자동 닫기 설정" :options="[{value:'4000',label:'4초 · 포인터/초점에서 일시정지'},{value:'0',label:'닫을 때까지 유지'}]" help="오류 예시는 이 설정과 관계없이 유지합니다. 중요한 오류를 토스트에만 두지 마세요."/>
    </div>
    <div class="starter-actions sol-actions--commit"><SBtn id="native-toast-open" @click="showToast">가상 알림 보기</SBtn></div>
    <p class="starter-hint" role="status">{{toastClosed ? `마지막 닫기: ${toastClosed}` : '알림은 초점을 빼앗지 않습니다. 같은 부품 한 개를 갱신합니다.'}}</p>
    <SSnackbar id="native-toast" v-model="toastOpen" :message="toastMessage" :tone="toastTone" :duration="toastDuration" :locale="locale" @close="toastClosed=$event"/>
  </section>
  <section class="starter-card" aria-labelledby="extended-pickers-title">
    <h2 id="extended-pickers-title">날짜와 시각 선택</h2>
    <SSelect id="native-date-mode" required v-model="mode" label="개발 설정 · mode" :options="[{value:'range',label:'기간 · 한 입력과 한 달력'},{value:'single',label:'단일 날짜'}]" help="모드를 바꾸면 null로 비웁니다. 실제 앱에 모드 선택창을 둘 필요는 없습니다."/>
    <form class="starter-native-form" novalidate @submit.prevent="checkSchedule">
      <div class="starter-control-grid">
        <SDatePicker id="native-date" ref="datePicker" v-model="dates" label="가상 일정" :mode="mode" required :disabled="disabled" :readonly="readonly" :locale="locale" help="직접 입력 또는 Alt+↓. 기간은 두 번째 선택에서만 확정합니다." @change="lastDate=JSON.stringify($event,null,2)"/>
        <STimePicker id="native-time" ref="timePicker" v-model="time" label="가상 알림 시각" min="09:00" max="18:00" :step="15" required :disabled="disabled" :readonly="readonly" :locale="locale" help="직접 HH:mm/HHmm 입력 또는 작은 시·분 패널을 사용합니다."/>
      </div>
      <div class="starter-actions sol-actions--commit"><SBtn type="submit" :disabled="disabled">날짜·시각 확인</SBtn></div>
      <p class="starter-result" role="status">{{scheduleStatus}}</p>
    </form>
    <details class="starter-api-output"><summary>완료 값과 change 출력 · 가상 데이터</summary><pre>{{JSON.stringify({mode,value:dates,time},null,2)}}</pre><pre>{{lastDate}}</pre></details>
    <p class="starter-hint">저장 값은 날짜 YYYY-MM-DD와 시각 HH:mm 문자열입니다. 시간대 변환·실제 예약·외부 전송은 하지 않습니다.</p>
  </section>
</template>

<script setup>
import { formatSolDate, formatSolNumber } from 'solyi-ui';
import {starterLanguage} from './locale-state.js';
const number=ref(1234.5),date=ref('2026-10-21'),time=ref('09:30'),open=ref(false),text=ref(''),selection=ref([]),page=ref(1);
const formatted=computed(()=>formatSolDate(date.value||'2026-10-21',starterLanguage.value)+' · '+formatSolNumber(number.value??0,starterLanguage.value));
const columns=[{key:'name',label:'항목'},{key:'count',label:'수량',width:'100px',format:'number'},{key:'date',label:'날짜',width:'160px',format:'date'}];
const rows=[{id:'locale',name:'가상 자료 · 업무 라벨은 앱 소유',count:1234.5,date:'2026-10-21'}];
</script>
<template>
<section class="starter-card starter-native-form" id="locale-demo">
 <h2>공통 locale · 실제 패키지</h2>
 <p>앱 provider의 설정을 바꾸면 기본 문구·날짜·숫자 표시가 함께 바뀝니다. 문서 설명과 업무 라벨·데이터는 자동 번역하지 않습니다. 아래 다른 예제도 기본적으로 이 설정을 따릅니다.</p>
 <label class="sol-field"><span class="sol-label">앱 언어 / App locale</span><select id="starter-locale" v-model="starterLanguage" class="sol-select"><option value="ko-KR">한국어 · ko-KR</option><option value="en-US">English · en-US</option></select></label>
 <p id="locale-formatted" role="status">{{formatted}}</p>
 <div class="starter-control-grid">
  <STextField id="locale-field" label="제목 / Title" v-model="text" required />
  <STextField id="locale-override" label="개별 설정 / Override" required :locale="{code:'en',required:'needed here'}" />
  <SNumberInput id="locale-number" label="수량 / Quantity" v-model="number" :step="0.5" :min="0" :max="10000" />
  <SDatePicker id="locale-date" label="날짜 / Date" v-model="date" />
  <STimePicker id="locale-time" label="시각 / Time" v-model="time" min="09:00" max="18:00" :step="15" />
 </div>
 <SBtn id="locale-open" @click="open=true">Dialog</SBtn>
 <SDialog id="locale-dialog" title="가상 상세 / Preview" v-model="open"><p>선택 값과 초점을 유지하며 공통 닫기 문구를 바꿉니다.</p></SDialog>
 <SDataTable caption="Locale table · 가상 자료" :columns="columns" :rows="rows" selectable v-model:selected="selection" v-model:page="page" :page-count="2" />
</section>
</template>

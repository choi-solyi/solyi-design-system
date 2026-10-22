<script setup lang="ts">
import { ref } from 'vue';

const choice = ref<string | null>('simple');
const options = [
  {
    value: 'simple',
    label: '가볍게 기록',
    description: '이름 + 메모 · 개인 기록',
  },
  {
    value: 'ordered',
    label: '차근차근 정리',
    description: '이름 + 메모 + 분류 · 작은 자료실',
  },
];
</script>
<template>
  <SCard
    :heading-level="2"
    title="같은 속성의 선택"
  >
    <SRadioGroup
      id="recipe-compare"
      v-model="choice"
      name="recipe-compare"
      label="작업 방식"
      layout="cards"
      :options="options"
    />
    <p role="status">
      선택: {{ choice === 'simple' ? '가볍게 기록' : '차근차근 정리' }}
    </p>
  </SCard>
</template>

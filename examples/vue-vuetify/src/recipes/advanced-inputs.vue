<script setup lang="ts">
defineProps<{ part?: string }>();
const note = ref(''),
  amount = ref<number | null>(2),
  tags = ref<string[]>([]);
const options = [
  { value: 'garden', label: '정원' },
  { value: 'book', label: '책장' },
  { value: 'walk', label: '산책' },
];
</script>
<template>
  <SCard :heading-level="2" :title="part ? undefined : '여러 줄·숫자·태그'">
    <STextarea
      v-if="!part || part === 'textarea'"
      id="recipe-note"
      v-model="note"
      label="가상 기록 설명"
      :maxlength="120"
    />
    <SNumberInput
      v-if="!part || part === 'number'"
      id="recipe-amount"
      v-model="amount"
      label="가상 목표 개수"
      :min="0"
      :max="10"
      :step="2"
    />
    <SMultiSelect
      v-if="!part || part === 'multiselect'"
      id="recipe-tags"
      v-model="tags"
      label="가상 분류"
      :options="options"
      :max-selected="2"
    />
    <p v-if="!part" role="status">{{ amount }}개 · {{ tags.join(', ') || '선택 없음' }}</p>
  </SCard>
</template>

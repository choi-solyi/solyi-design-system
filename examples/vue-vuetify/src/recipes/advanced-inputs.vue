<script setup lang="ts">
import type { SolNumberDisplayFormatter } from 'solyi-ui'

defineProps<{ part?: string }>()
const showNumberFormat = ref(false)
const noteClearCount = ref(0)
const formatAmount: SolNumberDisplayFormatter = (value, locale) =>
  new Intl.NumberFormat(locale.code, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(
    value,
  )
const note = ref(''),
  amount = ref<number | null>(2),
  tags = ref<string[]>([])
const options = [
  { value: 'garden', label: '정원' },
  { value: 'book', label: '책장' },
  { value: 'walk', label: '산책' },
]
</script>
<template>
  <SCard :heading-level="2" :title="part ? undefined : '여러 줄·숫자·태그'">
    <STextarea
      v-if="!part || part === 'textarea'"
      id="recipe-note"
      v-model="note"
      clearable
      @clear="noteClearCount++"
      label="가상 기록 설명"
      :maxlength="120"
    />
    <p v-if="!part || part === 'textarea'" role="status">내용 지움: {{ noteClearCount }}회</p>
    <SCheckbox
      v-if="!part || part === 'number'"
      id="recipe-number-format"
      v-model="showNumberFormat"
      label="숫자 표시 포맷 · 모델은 숫자 유지"
    />
    <SNumberInput
      v-if="!part || part === 'number'"
      id="recipe-amount"
      v-model="amount"
      clearable
      label="가상 목표 개수"
      :min="0"
      :max="10"
      :step="2"
      unit="개"
      :presets="[{ value: 2 }, { value: 6 }, { value: 10 }, { value: 5, label: '5 · 간격 불일치' }]"
      :format-value="showNumberFormat ? formatAmount : undefined"
    />
    <SMultiSelect
      v-if="!part || part === 'multiselect'"
      id="recipe-tags"
      v-model="tags"
      clearable
      label="가상 분류"
      :options="options"
      :max-selected="2"
    />
    <p v-if="!part" role="status">{{ amount }}개 · {{ tags.join(', ') || '선택 없음' }}</p>
    <p v-if="part === 'number'" role="status">숫자 모델: {{ amount === null ? 'null' : amount }}</p>
  </SCard>
</template>

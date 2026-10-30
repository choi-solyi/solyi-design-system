<script setup lang="ts">
import type { SBarChartItem } from 'solyi-ui'

const type = ref<string | null>('bar'),
  showTable = ref(true),
  state = ref<string | null>('normal')
const resolvedType = computed<'bar' | 'line' | 'pie'>(() =>
  type.value === 'line' || type.value === 'pie' ? type.value : 'bar',
)
const items = computed<SBarChartItem[]>(() =>
  state.value === 'empty'
    ? []
    : ['월요일', '화요일', '수요일', '목요일'].map((label, index) => ({
        id: String(index),
        label,
        value: state.value === 'zero' ? 0 : [2, 4, 0, 5][index],
      })),
)
</script>
<template>
  <SCard :heading-level="2" title="같은 자료를 세 방식으로 보는 Chart">
    <p>
      막대는 항목별 크기, 선은 순서에 따른 변화, 원형은 전체에서 차지하는 비율을 보여줍니다. 실제
      API 이름 SBarChart와 기존 막대 기본값을 유지합니다.
    </p>
    <SRadioGroup
      id="recipe-chart-type"
      v-model="type"
      label="차트 유형"
      :options="[
        { value: 'bar', label: '막대 · Bar' },
        { value: 'line', label: '선 · Line' },
        { value: 'pie', label: '원형 · Pie' },
      ]"
    />
    <SSelect
      id="recipe-chart-data"
      v-model="state"
      label="예제 자료"
      :options="[
        { value: 'normal', label: '자료 있음' },
        { value: 'zero', label: '모두 0' },
        { value: 'empty', label: '자료 없음' },
        { value: 'loading', label: '불러오는 중' },
      ]"
    />
    <SCheckbox id="recipe-chart-table" v-model="showTable" label="같은 자료의 표 표시" />
    <SBarChart
      id="recipe-owned-chart"
      label="가상 활동 횟수"
      :type="resolvedType"
      :items="items"
      :show-table="showTable"
      :loading="state === 'loading'"
      category-label="요일"
      value-label="기록 수"
    />
    <p class="sol-hint">
      외부 데이터를 호출하지 않는 가상 자료입니다. 색에만 의존하지 않도록 원형 조각 번호·범례와 같은
      값의 텍스트 표를 제공합니다.
    </p>
  </SCard>
</template>

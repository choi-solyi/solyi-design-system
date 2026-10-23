<script setup lang="ts">
import type { STreeItem, SBarChartItem } from '@solyi/vue-ui';
defineProps<{ part?: string }>();
const selected = ref<string | null>(null),
  expanded = ref<string[]>([]),
  week = ref<string | null>('current');
const items: STreeItem[] = [
  {
    id: 'notes',
    label: '기록',
    children: [
      { id: 'garden', label: '작은 정원' },
      { id: 'book', label: '저녁 책장' },
    ],
  },
  { id: 'archive', label: '보관', children: [{ id: 'walk', label: '주말 산책' }] },
];
const chart = computed<SBarChartItem[]>(() =>
  ['월요일', '화요일', '수요일', '목요일'].map((label, index) => ({
    id: String(index),
    label,
    value: (week.value === 'current' ? [2, 4, 0, 5] : [1, 3, 2, 4])[index],
  })),
);
const total = computed(() => chart.value.reduce((sum, item) => sum + item.value, 0));
</script>
<template>
  <SCard :heading-level="2" :title="part ? undefined : '가상 자료의 차트와 계층'">
    <template v-if="!part || part === 'chart'">
      <SSelect
        id="recipe-chart-week"
        v-model="week"
        label="가상 활동 주간"
        :options="[
          { value: 'current', label: '이번 주' },
          { value: 'previous', label: '지난주' },
        ]"
      />
      <p role="status">총 {{ total }}개 기록 · 가상 자료</p>
      <SBarChart
        id="recipe-chart"
        label="가상 활동 횟수 · 차트와 같은 자료"
        :items="chart"
        category-label="요일"
        value-label="기록 수"
      />
    </template>
    <template v-if="!part || part === 'tree'">
      <STree
        id="recipe-tree"
        v-model="selected"
        v-model:expanded="expanded"
        label="가상 기록 폴더"
        :items="items"
      />
      <p role="status">선택: {{ selected || '없음' }}</p>
    </template>
  </SCard>
</template>

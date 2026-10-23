<script setup lang="ts">
const include = ref(true),
  archived = ref(false),
  view = ref<string | null>('list'),
  sort = ref<string | null>('recent');
const options = [
  { value: 'list', label: '목록' },
  { value: 'cards', label: '카드' },
  { value: 'map', label: '지도 · 비활성', disabled: true },
];
</script>
<template>
  <SCard :heading-level="2" title="익숙한 기본 선택">
    <SCheckbox id="recipe-include" v-model="include" label="완료한 항목 포함" />
    <SCheckbox id="recipe-archived" v-model="archived" label="보관한 항목 포함" />
    <SCheckbox id="recipe-unavailable" label="공유 항목 · 비활성" disabled />
    <SRadioGroup id="recipe-view" v-model="view" label="보기 방식" :options="options" />
    <SSelect
      id="recipe-sort"
      v-model="sort"
      label="정렬 기준"
      :options="[
        { value: 'recent', label: '최근 변경순' },
        { value: 'name', label: '이름순' },
      ]"
    />
    <p role="status">
      완료 {{ include ? '포함' : '제외' }} · 보관 {{ archived ? '포함' : '제외' }} · {{ view }} ·
      {{ sort }}
    </p>
  </SCard>
</template>

<script setup lang="ts">
import type { TableColumn, TableRow, TableSort } from '@solyi/vue-ui';
const query = ref(''),
  page = ref(1),
  selected = ref<string[]>([]),
  sort = ref<TableSort | null>({ key: 'date', direction: 'descending' }),
  state = ref<string | null>('ready');
const columns: TableColumn[] = [
  { key: 'name', label: '이름', sortable: true },
  { key: 'status', label: '상태', width: '96px' },
  { key: 'date', label: '변경일', width: '128px', sortable: true },
];
const all: TableRow[] = [
  {
    id: '1',
    name: '작은 정원의 아주 긴 가상 기록 제목을 한 줄로 표시합니다',
    status: '진행 중',
    date: '2026-10-22',
  },
  { id: '2', name: '저녁 책장', status: '초안', date: '2026-10-21' },
  { id: '3', name: '주말 산책', status: '완료', date: '2026-10-20' },
  { id: '4', name: '계절 관찰', status: '진행 중', date: '2026-10-19' },
];
const filtered = computed(() =>
  all
    .filter((r) => String(r.name).includes(query.value.trim()))
    .sort((a, b) => {
      const s = sort.value;
      return s
        ? String(a[s.key]).localeCompare(String(b[s.key]), 'ko') *
            (s.direction === 'ascending' ? 1 : -1)
        : 0;
    }),
);
const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / 2))),
  rows = computed(() => filtered.value.slice((page.value - 1) * 2, page.value * 2));
watch([query, sort], () => (page.value = 1));
watch(pages, (p) => (page.value = Math.min(page.value, p)));
</script>
<template>
  <SCard :heading-level="2" title="선택·정렬·페이지">
    <STextField id="recipe-table-search" v-model="query" label="자료 검색" type="search" />
    <SSelect
      id="recipe-table-state"
      v-model="state"
      label="가상 상태"
      :options="[
        { value: 'ready', label: '정상' },
        { value: 'loading', label: '로딩' },
        { value: 'error', label: '오류' },
      ]"
      required
    />
    <SDataTable
      caption="가상 자료 목록"
      :columns="columns"
      :rows="rows"
      selectable
      v-model:selected="selected"
      v-model:sort="sort"
      v-model:page="page"
      :page-count="pages"
      :loading="state === 'loading'"
      :error="state === 'error' ? '가상 오류입니다. 검색과 선택은 남습니다.' : ''"
      @retry="state = 'ready'"
    />
    <SBtn variant="inline" :disabled="!selected.length" @click="selected = []"> 선택 해제 </SBtn>
  </SCard>
</template>

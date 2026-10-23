<script setup lang="ts">
const query = ref(''),
  filter = ref<string | null>('all'),
  detail = ref(false),
  chosen = ref('')
const rows = [
  { name: '작은 정원', status: '진행 중' },
  { name: '저녁 책장', status: '초안' },
  { name: '주말 산책', status: '진행 중' },
]
const visible = computed(() =>
  rows.filter(
    r =>
      r.name.includes(query.value.trim()) && (filter.value === 'all' || r.status === filter.value),
  ),
)
</script>
<template>
  <SCard :heading-level="2" title="검색과 상세">
    <div class="sol-filterbar">
      <STextField id="recipe-search" v-model="query" label="가상 자료 검색" type="search" />
      <SSelect
        id="recipe-search-filter"
        v-model="filter"
        label="상태"
        :options="[
          { value: 'all', label: '전체' },
          { value: '진행 중', label: '진행 중' },
          { value: '초안', label: '초안' },
        ]"
        required
      />
    </div>
    <p role="status">결과 {{ visible.length }}개</p>
    <SCard v-for="row in visible" :key="row.name" :title="row.name">
      <p>{{ row.status }}</p>
      <SBtn
        @click="
          chosen = row.name;
          detail = true;
        "
      >
        {{ row.name }} 상세 보기
      </SBtn>
    </SCard>
    <SCard v-if="!visible.length" title="조건에 맞는 자료가 없어요.">
      <SBtn
        @click="
          query = '';
          filter = 'all';
        "
      >
        조건 초기화
      </SBtn>
    </SCard>
    <SDialog id="recipe-search-detail" v-model="detail" :title="chosen">
      <p>서버에 연결하지 않는 가상 상세입니다.</p>
    </SDialog>
  </SCard>
</template>

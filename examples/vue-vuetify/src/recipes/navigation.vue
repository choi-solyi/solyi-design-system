<script setup lang="ts">
const drawer = ref(false),
  toast = ref(false),
  detail = ref(false)
const page = ref(1),
  pageCount = ref<number | null>(20),
  acceptPage = ref(true),
  proposal = ref(1)
const siblings = ref<number | null>(3),
  compactPagination = ref(false)
const pageRows = computed(() => [{ id: String(page.value), name: `가상 페이지 ${page.value}` }])
function showManyPages() {
  pageCount.value = 1003
  page.value = 500
}
function proposePage(next: number) {
  proposal.value = next
  if (acceptPage.value) page.value = next
}
const path = computed(() => [
  { id: 'home', label: '기록함' },
  { id: 'current', label: detail.value ? '기록 상세' : '기록 목록' },
])
</script>
<template>
  <SCard :heading-level="2" title="현재 위치와 짧은 상세">
    <SNumberInput
      id="recipe-pagination-count"
      v-model="pageCount"
      label="페이지 수"
      :min="0"
      :step="1"
    />
    <SCheckbox id="recipe-pagination-accept" v-model="acceptPage" label="페이지 이동 제안 반영" />
    <SNumberInput
      id="recipe-pagination-siblings"
      v-model="siblings"
      label="현재 페이지 양옆에 표시할 번호 수"
      :min="0"
      :max="5"
      :step="1"
    />
    <SCheckbox
      id="recipe-pagination-compact"
      v-model="compactPagination"
      label="현재 번호만 간단히 표시"
    />
    <SBtn id="recipe-pagination-many" @click="showManyPages">1003페이지 중 500페이지 보기</SBtn>
    <SPagination
      :model-value="page"
      :page-count="pageCount ?? 0"
      :sibling-count="siblings ?? 1"
      :compact-pagination="compactPagination"
      label="예제 항목 페이지"
      @update:model-value="proposePage"
    />
    <p role="status">부모 페이지 {{ page }} · 마지막 제안 {{ proposal }}</p>
    <SDataTable
      caption="같은 페이지 설정을 사용하는 Table"
      :columns="[{ key: 'name', label: '현재 자료' }]"
      :rows="pageRows"
      :page="page"
      :page-count="Math.max(1, pageCount ?? 0)"
      :sibling-count="siblings ?? 1"
      :compact-pagination="compactPagination"
      @update:page="proposePage"
    />
    <SBreadcrumbs label="가상 경로" :items="path" @navigate="detail = false" />
    <div class="sol-actions">
      <SBtn @click="detail = true">가상 상세로 이동</SBtn>
      <SBtn @click="drawer = true">사이드 패널 열기</SBtn>
      <SBtn @click="toast = true">완료 안내</SBtn>
    </div>
    <SDialog
      id="recipe-drawer"
      v-model="drawer"
      presentation="drawer"
      eyebrow="FICTIONAL DETAIL"
      title="작은 정원 기록"
    >
      <p>Dialog와 같은 제목·초점·Escape·복귀 계약을 쓰는 모달 사이드 패널입니다.</p>
    </SDialog>
    <SSnackbar
      id="recipe-nav-toast"
      v-model="toast"
      tone="success"
      message="가상 설정을 적용했어요."
      :duration="4000"
    />
  </SCard>
</template>

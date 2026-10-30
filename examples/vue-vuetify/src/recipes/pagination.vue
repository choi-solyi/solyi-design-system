<script setup lang="ts">
const page = ref(1),
  pageCount = ref<number | null>(20),
  siblings = ref<number | null>(3)
const accept = ref(true),
  compact = ref(false),
  proposal = ref<number | null>(null)
function propose(next: number) {
  proposal.value = next
  if (accept.value) page.value = next
}
function manyPages() {
  pageCount.value = 1003
  page.value = 500
  proposal.value = null
}
watch(pageCount, count => {
  page.value = Math.max(1, Math.min(page.value, Math.max(1, count ?? 0)))
})
</script>
<template>
  <SCard :heading-level="2" title="부모가 수락하는 페이지 이동 · Pagination">
    <fieldset class="sol-stack">
      <legend>예제 설정</legend>
      <SNumberInput
        id="recipe-pagination-count"
        v-model="pageCount"
        label="페이지 수"
        :min="0"
        :step="1"
      />
      <SNumberInput
        id="recipe-pagination-siblings"
        v-model="siblings"
        label="현재 페이지 양옆의 번호 수"
        :min="0"
        :max="5"
        :step="1"
      />
      <SCheckbox id="recipe-pagination-accept" v-model="accept" label="이동 제안을 부모가 반영" />
      <SCheckbox id="recipe-pagination-compact" v-model="compact" label="주변 번호를 접어서 표시" />
      <SBtn id="recipe-pagination-many" @click="manyPages">1003페이지 중 500페이지 보기</SBtn>
    </fieldset>
    <SPagination
      :model-value="page"
      :page-count="pageCount ?? 0"
      :sibling-count="siblings ?? 1"
      :compact-pagination="compact"
      label="예제 페이지"
      @update:model-value="propose"
    />
    <p role="status">부모 페이지 {{ page }} · 최근 제안 {{ proposal ?? '아직 없음' }}</p>
  </SCard>
</template>

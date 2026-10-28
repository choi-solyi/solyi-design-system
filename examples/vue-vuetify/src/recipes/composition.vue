<script setup lang="ts">
const query = ref('')
const state = ref<string | null>('all')
const failed = ref(true)
const bookmarked = ref(false)
const resultPanel = useTemplateRef<HTMLElement>('resultPanel')

function retry(event: MouseEvent) {
  const owner = event.currentTarget
  failed.value = false
  nextTick(() => {
    if (document.activeElement === owner || document.activeElement === document.body) {
      resultPanel.value?.focus({ preventScroll: true })
    }
  })
}
</script>
<template>
  <div class="sol-stack">
    <SCard :heading-level="2" title="컨트롤과 보조 행동의 관계">
      <div class="sol-filterbar">
        <STextField
          id="recipe-composition-query"
          v-model="query"
          label="검색"
          help="도움말이 있어도 컨트롤 시작점은 같습니다."
        />
        <SSelect
          id="recipe-composition-state"
          v-model="state"
          label="상태"
          :options="[
            { value: 'all', label: '전체' },
            { value: 'done', label: '완료' },
          ]"
          required
        />
      </div>
      <SAlert v-if="failed" tone="danger" title="가상 자료를 불러오지 못했어요.">
        <p>현재 검색 조건은 유지됩니다.</p>
        <template #actions>
          <SBtn variant="inline" @click="retry"> 다시 시도 </SBtn>
        </template>
      </SAlert>
      <p v-else id="recipe-composition-result" ref="resultPanel" tabindex="-1" role="status">
        ✓ 가상 재시도를 확인했어요.
      </p>
    </SCard>
    <SCard description="제목 링크와 보조 버튼을 독립적으로 조작할 수 있습니다.">
      <template #leading><SIcon name="folder" decorative /></template>
      <template #title><a href="?view=recipes&amp;example=empty">항목 미리보기</a></template>
      <template #meta><SBadge :content="bookmarked ? '보관됨' : '예제'" /></template>
      <template #actions>
        <SBtn @click="bookmarked = !bookmarked">{{ bookmarked ? '보관 해제' : '보관' }}</SBtn>
      </template>
    </SCard>
  </div>
</template>

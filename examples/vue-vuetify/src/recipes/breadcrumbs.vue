<script setup lang="ts">
import type { SBreadcrumbItem } from 'solyi-ui'

type View = 'home' | 'list' | 'detail'
const view = ref<View>('detail'),
  title = ref<HTMLElement | null>(null)
const all: SBreadcrumbItem[] = [
  { id: 'home', label: '기록함' },
  { id: 'list', label: '기록 목록' },
  { id: 'detail', label: '항목 상세' },
]
const path = computed(() => all.slice(0, view.value === 'home' ? 1 : view.value === 'list' ? 2 : 3))
function show(next: View) {
  view.value = next
  nextTick(() => title.value?.focus())
}
function navigate(item: SBreadcrumbItem) {
  if (item.id === 'home' || item.id === 'list' || item.id === 'detail') show(item.id)
}
</script>
<template>
  <SCard :heading-level="2" title="현재 위치와 상위 경로 · Breadcrumbs">
    <p>상위 위치를 누르면 예제의 현재 위치가 바뀝니다.</p>
    <SBreadcrumbs label="예제 경로" :items="path" @navigate="navigate" />
    <h3 id="recipe-breadcrumb-view" ref="title" tabindex="-1">{{ path[path.length - 1].label }}</h3>
    <div class="sol-actions">
      <SBtn @click="show('list')">목록 보기</SBtn><SBtn @click="show('detail')">상세 보기</SBtn>
    </div>
  </SCard>
</template>

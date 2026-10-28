<script setup lang="ts">
import { SSortableList } from 'solyi-ui'
import type {
  SolSortableEnd,
  SolSortableProposal,
} from 'solyi-ui'

interface ExampleItem {
  id: string
  title: string
  details: { count: number }
}
const items = ref<ExampleItem[]>([
  { id: 'first', title: '첫 번째 항목', details: { count: 4 } },
  { id: 'second', title: '긴 텍스트도 줄바꿈하는 두 번째 항목', details: { count: 7 } },
  { id: 'third', title: '세 번째 항목', details: { count: 2 } },
])
const disabled = ref(false),
  disabledItem = ref(false),
  readonly = ref(false),
  accept = ref(true),
  result = ref('')
function propose(next: ExampleItem[]) {
  if (accept.value) items.value = next
}
function change(value: SolSortableProposal<ExampleItem>) {
  result.value = `${value.key}: ${value.from + 1} → ${value.to + 1}`
}
function ended(value: SolSortableEnd<ExampleItem>) {
  if (value.status === 'cancel') result.value = `취소: ${value.reason}`
}
</script>
<template>
  <section>
    <h2>Sortable 키보드·이동 버튼 개발 예제</h2>
    <p>내부 source proof입니다. 공개 등록·포인터 드래그는 후속 단위입니다.</p>
    <label><input v-model="disabled" type="checkbox" /> 비활성</label>
    <label><input v-model="readonly" type="checkbox" /> 보기 전용</label>
    <label><input v-model="accept" type="checkbox" /> 새 순서 반영</label>
    <SSortableList
      id="sortable-proof"
      label="예제 목록"
      :model-value="items"
      :item-key="item => item.id"
      :item-label="item => item.title"
      :is-item-disabled="item => disabledItem && item.details.count === 7"
      :disabled="disabled"
      :readonly="readonly"
      @update:model-value="propose"
      @change="change"
      @end="ended"
    >
      <template #item="{ item, index, active }">
        <strong>{{ index + 1 }}. {{ item.title }}</strong>
        <p>{{ item.details.count.toFixed(0) }}개 · {{ active ? '조절 중' : '대기' }}</p>
        <a :href="'#' + item.id">본문 링크</a>
      </template>
    </SSortableList>
    <p role="status">{{ result }}</p>
  </section>
</template>

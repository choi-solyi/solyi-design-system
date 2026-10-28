<script setup lang="ts">
import { STimeGrid } from 'solyi-ui'
import type {
  SolTimeGridColumn,
  SolTimeGridHandle,
  SolTimeGridProposal,
  SolTimeGridCancellation,
} from 'solyi-ui'

type Item = { id: string; column: string; start: number; end: number; title: string }
const items: readonly Item[] = [{ id: 'a', column: 'one', start: 480, end: 540, title: 'Item' }]
const columns: readonly SolTimeGridColumn[] = [{ key: 'one', label: 'One', date: '2026-10-28' }]
const handle = ref<SolTimeGridHandle | null>(null)
function focus() {
  handle.value?.focus('a')
  handle.value?.cancel()
}
function commit(proposal: SolTimeGridProposal) {
  proposal.to.startMinute.toFixed()
  proposal.key.toString()
}
function cancelled(result: SolTimeGridCancellation) {
  result.reason.toUpperCase()
}
</script>
<template>
  <STimeGrid
    ref="handle"
    id="grid-proof"
    label="Grid"
    :items="items"
    :columns="columns"
    :item-key="item => item.id"
    :item-label="item => item.title"
    :item-column="item => item.column"
    :item-start="item => item.start"
    :item-end="item => item.end"
    :readonly="false"
    allow-resize
    allow-duplicate
    :pending-keys="['a']"
    :is-item-disabled="item => item.id === 'locked'"
    @commit="commit"
    @cancel="cancelled"
  >
    <template #item="{ item, startMinute }"
      ><strong>{{ item.title.toUpperCase() }} {{ startMinute.toFixed(0) }}</strong></template
    >
    <template #band="{ band }"
      ><span>{{ band.label }}</span></template
    >
  </STimeGrid>
  <button type="button" @click="focus">Focus</button>
</template>

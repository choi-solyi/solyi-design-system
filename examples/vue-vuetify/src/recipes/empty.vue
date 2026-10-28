<script setup lang="ts">
import { useSolLocale } from 'solyi-ui'

const locale = useSolLocale(),
  added = ref(false),
  target = ref<HTMLElement | null>(null)
const empty = ref<{ $el: HTMLElement } | null>(null)
async function toggle() {
  added.value = !added.value
  await nextTick()
  ;(added.value ? target.value : empty.value?.$el)?.focus()
}
</script>
<template>
  <SEmptyState
    v-if="!added"
    id="recipe-empty"
    ref="empty"
    tabindex="-1"
    :heading-level="2"
    icon="folder"
    :title="locale.code === 'en-US' ? 'No items yet' : '아직 항목이 없어요.'"
    :description="
      locale.code === 'en-US'
        ? 'Create your first item to get started.'
        : '첫 항목을 추가해 보세요.'
    "
    :min-block-size="240"
  >
    <template #actions
      ><SBtn id="recipe-empty-add" variant="primary" @click="toggle">{{
        locale.code === 'en-US' ? 'Add item' : '항목 추가'
      }}</SBtn></template
    >
  </SEmptyState>
  <SCard v-else :heading-level="2" :title="locale.code === 'en-US' ? 'Your first item' : '첫 항목'">
    <p ref="target" tabindex="-1">
      {{ locale.code === 'en-US' ? 'One example item is ready.' : '예제 항목을 추가했어요.' }}
    </p>
    <template #actions
      ><SBtn @click="toggle">{{
        locale.code === 'en-US' ? 'Reset example' : '예제 초기화'
      }}</SBtn></template
    >
  </SCard>
  <p role="status">{{ locale.code === 'en-US' ? 'Items: ' : '항목 수: ' }}{{ added ? 1 : 0 }}</p>
</template>

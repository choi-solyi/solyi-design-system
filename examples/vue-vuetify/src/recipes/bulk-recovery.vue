<script setup lang="ts">
const resultPanel = useTemplateRef<{ $el: HTMLElement }>('resultPanel')
const runButton = useTemplateRef<{ $el: HTMLElement }>('runButton')
const retryButton = useTemplateRef<{ $el: HTMLElement }>('retryButton')
type Row = {
  id: number
  state: 'idle' | 'pending' | 'success' | 'error'
  attempts: number
}
const rows = ref<Row[]>([1, 2, 3].map(id => ({ id, state: 'idle', attempts: 0 }))),
  selected = ref<Record<number, boolean>>({ 1: true, 2: true, 3: true }),
  busy = ref(false),
  result = ref('')
let timer: ReturnType<typeof setTimeout>
let stopFocusWatch: (() => void) | undefined
let disposed = false
const failed = computed(() => rows.value.some(r => r.state === 'error'))
function run(retry = false) {
  if (busy.value) return
  const targets = rows.value.filter(r =>
    retry ? r.state === 'error' : selected.value[r.id] && r.state === 'idle',
  )
  if (!targets.length) return
  const owner = document.activeElement
  let mayRestore = owner === runButton.value?.$el || owner === retryButton.value?.$el
  const movedFocus = (event: FocusEvent) => {
    if (event.target !== owner && event.target !== document.body) mayRestore = false
  }
  const movedPointer = (event: PointerEvent) => {
    if (!owner?.contains(event.target as Node)) mayRestore = false
  }
  const releaseFocusWatch = () => {
    document.removeEventListener('focusin', movedFocus, true)
    document.removeEventListener('pointerdown', movedPointer, true)
  }
  document.addEventListener('focusin', movedFocus, true)
  document.addEventListener('pointerdown', movedPointer, true)
  stopFocusWatch = releaseFocusWatch
  busy.value = true
  result.value = '가상 항목 처리 중…'
  targets.forEach(r => {
    r.state = 'pending'
    r.attempts++
  })
  timer = setTimeout(() => {
    targets.forEach(r => (r.state = r.id === 2 && r.attempts === 1 ? 'error' : 'success'))
    busy.value = false
    result.value =
      '완료 ' +
      rows.value.filter(r => r.state === 'success').length +
      '개 · 실패 ' +
      rows.value.filter(r => r.state === 'error').length +
      '개'
    nextTick(() => {
      const active = document.activeElement
      if (!disposed && mayRestore && (active === owner || active === document.body || !active))
        resultPanel.value?.$el.focus({ preventScroll: true })
      releaseFocusWatch()
      if (stopFocusWatch === releaseFocusWatch) stopFocusWatch = undefined
    })
  }, 350)
}
onBeforeUnmount(() => {
  disposed = true
  clearTimeout(timer)
  stopFocusWatch?.()
})
</script>
<template>
  <SCard :heading-level="2" title="일괄 작업의 일부 실패">
    <p>처음에는 2번만 실패하는 가상 처리입니다. 외부 데이터를 바꾸지 않습니다.</p>
    <div v-for="row in rows" :key="row.id">
      <SCheckbox
        :id="'recipe-bulk-' + row.id"
        :model-value="selected[row.id]"
        @update:model-value="selected[row.id] = $event"
        :label="'가상 기록 ' + row.id"
        :disabled="busy || row.state === 'success'"
      />
      <p>{{ row.state }} · 처리 {{ row.attempts }}회</p>
    </div>
    <div class="sol-actions">
      <SBtn ref="runButton" :loading="busy" @click="run()"> 선택한 가상 항목 처리 </SBtn>
      <SBtn
        ref="retryButton"
        id="recipe-bulk-retry"
        variant="inline"
        :disabled="busy || !failed"
        @click="run(true)"
      >
        실패 항목만 다시 시도
      </SBtn>
    </div>
    <SAlert
      id="recipe-bulk-result"
      ref="resultPanel"
      tabindex="-1"
      v-if="result"
      :tone="busy ? 'info' : failed ? 'danger' : 'success'"
      :title="result"
      live="polite"
    />
  </SCard>
</template>

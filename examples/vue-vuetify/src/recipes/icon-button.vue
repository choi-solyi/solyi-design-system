<script setup lang="ts">
import { useSolLocale } from 'solyi-ui'

const locale = useSolLocale()
const english = computed(() => locale.value.code === 'en-US')
const busy = ref(false),
  saved = ref(false)
let timer: ReturnType<typeof setTimeout>
function save() {
  if (busy.value) return
  busy.value = true
  saved.value = false
  timer = setTimeout(() => {
    busy.value = false
    saved.value = true
  }, 700)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>
<template>
  <SCard :heading-level="2" :title="english ? 'Icon-only actions' : '아이콘 버튼 동작'">
    <p>
      {{
        english
          ? 'Save performs a fictional local task. Delete demonstrates a disabled action.'
          : '저장 아이콘은 가상 로컬 작업을 실행하고, 삭제 아이콘은 비활성 상태를 보여줍니다.'
      }}
    </p>
    <div class="sol-actions">
      <SIconBtn
        icon="save"
        :label="english ? 'Save example' : '예제 저장'"
        :title="english ? 'Save example' : '예제 저장'"
        :loading="busy"
        @click="save"
      />
      <SIconBtn
        icon="trash"
        :label="english ? 'Delete (unavailable)' : '삭제 (사용 불가)'"
        :title="english ? 'Delete (unavailable)' : '삭제 (사용 불가)'"
        tone="danger"
        disabled
      />
    </div>
    <p role="status">
      {{
        busy
          ? english
            ? 'Saving…'
            : '저장 중…'
          : saved
            ? english
              ? 'The fictional task finished.'
              : '가상 저장을 완료했습니다.'
            : english
              ? 'Ready to save.'
              : '저장할 수 있습니다.'
      }}
    </p>
  </SCard>
</template>

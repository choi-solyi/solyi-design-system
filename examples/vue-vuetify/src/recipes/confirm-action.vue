<script setup lang="ts">
import { useSolLocale } from 'solyi-ui'

const locale = useSolLocale()
const removed = ref(false)
const english = computed(() => locale.value.code === 'en-US')
const removalResult = ref<HTMLElement | null>(null)
async function removeDraft() {
  removed.value = true
  await nextTick()
  removalResult.value?.focus()
}
</script>
<template>
  <SCard :heading-level="2" :title="english ? 'Confirm before removing' : '두 번 눌러 제거 확인'">
    <p>
      {{
        english
          ? 'The first press asks for confirmation. The second removes this fictional draft.'
          : '한 번 누르면 확인 문구로 바뀌고, 한 번 더 누르면 이 화면의 가상 초안이 제거됩니다.'
      }}
    </p>
    <div class="sol-actions sol-actions--commit">
      <SConfirmAction
        :label="english ? 'Disabled action' : '비활성 동작'"
        :confirm-label="english ? 'Confirm' : '확인'"
        disabled
      />
      <SConfirmAction
        :label="english ? 'Remove draft' : '초안 제거'"
        :confirm-label="english ? 'Press again to remove' : '한 번 더 눌러 제거'"
        tone="danger"
        :disabled="removed"
        @confirm="removeDraft"
      />
    </div>
    <p id="recipe-confirm-action-result" ref="removalResult" role="status" tabindex="-1">
      {{
        removed
          ? english
            ? 'The fictional draft was removed.'
            : '가상 초안을 제거했습니다.'
          : english
            ? 'The draft is still here.'
            : '초안이 남아 있습니다.'
      }}
    </p>
    <p class="sol-hint">
      {{
        english
          ? 'Escape, moving focus away or waiting cancels the confirmation.'
          : 'Escape, 다른 곳으로 초점 이동 또는 시간이 지나면 확인 상태가 취소됩니다.'
      }}
    </p>
  </SCard>
</template>

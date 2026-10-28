<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue'
import { useSolLocale } from 'solyi-ui'

const locale = useSolLocale()
const selected = ref(false),
  removed = ref(false)
const removalResult = ref<HTMLElement | null>(null)
async function removeChip() {
  removed.value = true
  await nextTick()
  removalResult.value?.focus()
}
const busy = ref(false),
  result = ref('')
let timer: ReturnType<typeof setTimeout>
function run() {
  if (busy.value) return
  busy.value = true
  timer = setTimeout(() => {
    result.value = '가상 확인을 마쳤어요.'
    busy.value = false
  }, 500)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>
<template>
  <SCard :heading-level="2" title="버튼 사용">
    <div class="sol-actions">
      <SBtn variant="primary" :loading="busy" @click="run"> 확인 </SBtn>
      <SBtn @click="result = '보조 동작을 눌렀어요.'">보조 동작</SBtn>
      <SBtn variant="inline" @click="result = ''"> 초기화 </SBtn>
      <SBtn disabled>비활성</SBtn>
    </div>
    <p role="status">{{ result }}</p>
    <div class="sol-actions">
      <SChip label="Design" />
      <SChip v-model:selected="selected" selectable label="Review" tone="info" />
      <SChip
        v-if="!removed"
        removable
        label="A long reusable label · 아주 긴 항목 이름도 전체 내용을 확인할 수 있어요"
        @remove="removeChip"
      >
        <template #leading><SIcon name="folder" :size="16" /></template>
      </SChip>
      <SChip disabled selectable removable label="Unavailable · 비활성" />
    </div>
    <p ref="removalResult" role="status" tabindex="-1">
      {{ removed ? (locale.code === 'en-US' ? 'Item removed.' : '항목을 제거했어요.') : '' }}
    </p>
    <div class="sol-actions">
      <SBadge tone="success" label="Complete · 완료" content="✓ Complete · 완료" />
      <SBadge tone="warning" variant="outlined" content="! Check · 확인" />
      <SBadge tone="danger" variant="filled" content="! Error · 오류" />
      <SBadge :content="3" label="3 notifications · 알림 3개">
        <template #anchor="{ descriptionId }">
          <SIconBtn icon="info" label="Notifications · 알림" :aria-describedby="descriptionId" />
        </template>
      </SBadge>
      <SIcon name="info" label="Information · 정보" />
      <SIcon name="chevron" :rotate="270" decorative />
    </div>
    <div class="sol-actions">
      <STooltip id="recipe-copy-tip" label="Copy · 복사" text="Copy example · 예제 복사">
        <template #activator="{ props }">
          <SIconBtn v-bind="props" icon="copy" label="Copy · 복사" @click="run" />
        </template>
      </STooltip>
      <SIconBtn icon="save" label="Save · 저장" :loading="busy" @click="run" />
      <SIconBtn icon="trash" label="Delete · 삭제" tone="danger" disabled />
      <SBadge v-if="removed" size="sm" content="Empty · 비어 있음" />
    </div>
  </SCard>
</template>

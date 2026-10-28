<script setup lang="ts">
import type { SolTimeInteraction, SolTimeInteractionCancel } from 'solyi-ui'

const time = ref<string | null>('09:00')
const listTime = ref<string | null>(null),
  manual = ref(false)
const scrub = ref(false),
  interaction = ref('')
function preview(value: SolTimeInteraction) {
  interaction.value = `미리보기 ${value.value}`
}
function committed(value: SolTimeInteraction) {
  interaction.value = `확정 ${value.value}`
}
function cancelled(value: SolTimeInteractionCancel) {
  interaction.value = `취소 ${value.reason}`
}
</script>
<template>
  <SCard :heading-level="2" title="직접 입력과 시·분 선택">
    <STimePicker
      id="recipe-time"
      v-model="time"
      label="가상 알림 시각"
      min="09:00"
      max="18:00"
      :step="15"
      required
      help="HH:mm 또는 HHmm으로 입력하거나 Alt+↓로 패널을 엽니다."
    />
    <p role="status">완료값: {{ time || '없음' }} · 실제 알림을 예약하지 않습니다.</p>
    <SCheckbox id="recipe-time-manual" v-model="manual" label="목록 예제의 직접 입력 허용" />
    <SCheckbox id="recipe-time-scrub" v-model="scrub" label="입력·목록 드래그 조절 사용" />
    <STimePicker
      id="recipe-time-list"
      v-model="listTime"
      label="목록에서 시각 선택"
      presentation="list"
      :allow-manual-input="manual"
      :scrubbable="scrub"
      :list-scrubbable="scrub"
      @preview="preview"
      @interaction-commit="committed"
      @interaction-cancel="cancelled"
      initial-scroll-value="09:07"
      min="00:07"
      max="23:59"
      :step="15"
      help="처음 위치는 선택이 아닙니다. 방향키·Home/End·Page로 이동하고 Enter/Space로 선택, Escape로 닫습니다."
    />
    <p role="status">{{ interaction }}</p>
    <p role="status">목록 완료값: {{ listTime || '선택 없음' }}</p>
  </SCard>
</template>

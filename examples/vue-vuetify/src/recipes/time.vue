<script setup lang="ts">
const time = ref<string | null>('09:00')
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
  </SCard>
</template>

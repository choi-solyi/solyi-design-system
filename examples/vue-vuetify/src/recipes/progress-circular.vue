<script setup lang="ts">
import type { SProgressState } from 'solyi-ui'

const state = ref<string | null>('indeterminate'),
  animated = ref(true),
  showValue = ref(true),
  showMessage = ref(true)
const resolved = computed(() => state.value as SProgressState)
const options = [
  { value: 'determinate', label: '35% 진행' },
  { value: 'indeterminate', label: '전체량을 모르는 처리 중' },
  { value: 'complete', label: '완료' },
  { value: 'error', label: '오류' },
]
</script>
<template>
  <SCard :heading-level="2" title="원형 진행률과 로딩">
    <SSelect
      id="recipe-circle-state"
      v-model="state"
      label="원형 진행 상태"
      :options="options"
      required
    />
    <SCheckbox id="recipe-circle-motion" v-model="animated" label="처리 중 회전 모션" />
    <SCheckbox id="recipe-circle-value" v-model="showValue" label="수치 표시" />
    <SCheckbox id="recipe-circle-message" v-model="showMessage" label="상태 설명 표시" />
    <SProgressCircular
      id="recipe-circle"
      label="원형 진행"
      :model-value="35"
      :state="resolved"
      :animated="animated"
      :show-value="showValue"
      :show-message="showMessage"
    />
    <p class="sol-hint">
      전체량을 모르는 처리 중에 회전합니다. 기기의 모션 감소 설정에서는 회전을 줄이고 상태 설명을
      유지합니다.
    </p>
  </SCard>
</template>

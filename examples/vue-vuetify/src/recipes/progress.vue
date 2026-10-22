<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  SCard,
  SProgressLinear,
  SProgressCircular,
  SSelect,
  SCheckbox,
} from '@solyi/vue-ui';
import type { SProgressState } from '@solyi/vue-ui';
const state = ref<string | null>('indeterminate'),
  animated = ref(true),
  showValue = ref(true),
  showMessage = ref(true);
const resolved = computed(() => state.value as SProgressState);
const options = [
  { value: 'determinate', label: '35% 진행' },
  { value: 'indeterminate', label: '진행률을 모르는 처리 중' },
  { value: 'complete', label: '완료' },
  { value: 'error', label: '오류' },
];
</script>
<template>
  <SCard
    :heading-level="2"
    title="값을 아는 진행과 처리 중 표시"
  >
    <SSelect
      id="recipe-progress-mode"
      v-model="state"
      label="가상 작업 상태"
      :options="options"
      required
    />
    <SCheckbox
      id="recipe-progress-motion"
      v-model="animated"
      label="처리 중 반복 모션"
    />
    <SCheckbox
      id="recipe-progress-value"
      v-model="showValue"
      label="수치 표시"
    />
    <SCheckbox
      id="recipe-progress-message"
      v-model="showMessage"
      label="상태 문구 표시"
    />
    <SProgressLinear
      id="recipe-linear"
      label="선형 진행"
      :model-value="35"
      :state="resolved"
      :animated="animated"
      :show-value="showValue"
      :show-message="showMessage"
    />
    <SProgressCircular
      id="recipe-circular"
      label="원형 진행"
      :model-value="35"
      :state="resolved"
      :animated="animated"
      :show-value="showValue"
      :show-message="showMessage"
    />
    <p>
      알 수 없는 진행률에는 퍼센트를 만들지 않습니다. 움직임 줄이기 설정에서는
      정적으로 표시합니다.
    </p>
  </SCard>
</template>

<script setup lang="ts">
import type { SProgressState } from 'solyi-ui'

const state = ref<string | null>('indeterminate'),
  animated = ref(true),
  showValue = ref(true),
  showMessage = ref(true)
const resolved = computed(() => state.value as SProgressState)
const pending = ref(false),
  scope = ref<string | null>('container'),
  blocking = ref(true),
  hideContent = ref(false)
let timer: ReturnType<typeof setTimeout>
function start(ms: number) {
  if (pending.value) return
  pending.value = true
  timer = setTimeout(() => {
    pending.value = false
  }, ms)
}
onBeforeUnmount(() => clearTimeout(timer))
const options = [
  { value: 'determinate', label: '35% 진행' },
  { value: 'indeterminate', label: '진행률을 모르는 처리 중' },
  { value: 'complete', label: '완료' },
  { value: 'error', label: '오류' },
]
</script>
<template>
  <SCard :heading-level="2" title="값을 아는 진행과 처리 중 표시">
    <SSelect
      id="recipe-progress-mode"
      v-model="state"
      label="가상 작업 상태"
      :options="options"
      required
    />
    <SCheckbox id="recipe-progress-motion" v-model="animated" label="처리 중 반복 모션" />
    <SCheckbox id="recipe-progress-value" v-model="showValue" label="수치 표시" />
    <SCheckbox id="recipe-progress-message" v-model="showMessage" label="상태 문구 표시" />
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
      알 수 없는 진행률에는 퍼센트를 만들지 않습니다. 움직임 줄이기 설정에서는 정적으로 표시합니다.
    </p>
    <SSelect
      id="recipe-loading-scope"
      v-model="scope"
      label="로딩 표시 범위"
      :options="[
        { value: 'container', label: '이 영역만' },
        { value: 'viewport', label: '화면 전체' },
      ]"
    />
    <SCheckbox id="recipe-loading-blocking" v-model="blocking" label="표시 중 영역 조작 잠금" />
    <SCheckbox
      id="recipe-loading-hide-content"
      v-model="hideContent"
      label="표시 중 원본 내용 숨김"
    />
    <SLoadingOverlay
      :model-value="pending"
      title="예제를 처리하고 있어요."
      description="잠시 후 자동으로 완료됩니다."
      :scope="scope === 'viewport' ? 'viewport' : 'container'"
      :blocking="blocking"
      :hide-content="hideContent"
    >
      <SCard title="독립 작업 영역">
        <p>짧은 작업은 표시를 지연해 깜빡임을 줄입니다.</p>
        <div class="sol-actions">
          <SBtn id="recipe-loading-start" @click="start(1200)">로딩 예제</SBtn>
          <SBtn id="recipe-loading-short" @click="start(50)">짧은 작업</SBtn>
        </div>
      </SCard>
    </SLoadingOverlay>
  </SCard>
</template>

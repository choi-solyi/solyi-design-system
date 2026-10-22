<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SSplitBtn, SBtn, SProgressLinear } from '@solyi/vue-ui';
const step = ref(1),
  result = ref('');
const items = [
  { id: 'profile', label: '가상 사용자 정보' },
  { id: 'settings', label: '가상 설정' },
];
</script>
<template>
  <SCard
    :heading-level="2"
    title="가상 사용자와 단계"
  >
    <div class="sol-actions">
      <span
        class="sol-avatar"
        role="img"
        aria-label="가상 사용자 솔"
      >
        솔
      </span>
      <SSplitBtn
        id="recipe-user"
        label="가상 사용자"
        :items="items"
        @primary="result = '가상 사용자 정보'"
        @select="result = $event"
      />
    </div>
    <ol>
      <li :aria-current="step === 1 ? 'step' : undefined">조건 확인</li>
      <li :aria-current="step === 2 ? 'step' : undefined">내용 작성</li>
      <li :aria-current="step === 3 ? 'step' : undefined">완료</li>
    </ol>
    <SProgressLinear
      id="recipe-step-progress"
      label="작성 단계"
      :model-value="step"
      :min="0"
      :max="3"
      :show-message="false"
    />
    <div class="sol-actions">
      <SBtn
        :disabled="step === 1"
        @click="step--"
      >
        이전 단계
      </SBtn>
      <SBtn
        :disabled="step === 3"
        @click="step++"
      >
        다음 단계
      </SBtn>
      <SBtn @click="step = 1">처음부터</SBtn>
    </div>
    <p role="status">{{ result }}</p>
  </SCard>
</template>

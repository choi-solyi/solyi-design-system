<script setup lang="ts">
import { ref, computed } from 'vue';
import { SCard, SBtn, SAlert, SSnackbar, SSelect } from '@solyi/vue-ui';
import type { ToastTone } from '@solyi/vue-ui';
const tone = ref<string | null>('info'),
  open = ref(false);
const resolved = computed(() => tone.value as ToastTone);
const options = [
  { value: 'info', label: '정보' },
  { value: 'success', label: '완료' },
  { value: 'warning', label: '확인' },
  { value: 'danger', label: '오류' },
];
</script>
<template>
  <SCard
    :heading-level="2"
    title="의미 색 적용"
  >
    <SSelect
      id="recipe-tone"
      v-model="tone"
      label="알림 역할"
      :options="options"
      required
    />
    <SAlert
      :tone="resolved"
      title="색과 문구가 함께 전하는 가상 안내"
    >
      <p>버튼의 중요도와 의미색은 별도입니다.</p>
      <template #actions>
        <SBtn
          variant="inline"
          @click="open = true"
        >
          같은 역할의 스낵바 보기
        </SBtn>
      </template>
    </SAlert>
    <SBtn
      variant="primary"
      @click="open = true"
    >
      주요 행동
    </SBtn>
    <SSnackbar
      id="recipe-tone-toast"
      v-model="open"
      :tone="resolved"
      message="의미 색을 비교하는 가상 안내"
      :duration="resolved === 'danger' ? 0 : 4000"
    />
  </SCard>
</template>

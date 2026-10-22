<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import type { DateValue, SolOption, SolOptionLoader } from '@solyi/vue-ui';
defineProps<{ part?: string }>();
const mode = ref<string | null>('range'),
  date = ref<DateValue>(null);
const dateMode = computed(() => (mode.value === 'single' ? 'single' : 'range'));
watch(dateMode, () => (date.value = null));
const files = ref<File[]>([]),
  selected = ref<string | null>(null),
  scenario = ref<string | null>('local');
const options: SolOption[] = ['기록', '독서', '식물', '산책', '작은 정원'].map(
  (label) => ({ value: label, label }),
);
let failNext = true;
watch(scenario, () => {
  failNext = true;
  selected.value = null;
});
const loader = computed<SolOptionLoader | undefined>(() => {
  const responseMode = scenario.value;
  if (responseMode === 'local') return undefined;
  return (query, signal) =>
    new Promise<readonly SolOption[]>((resolve, reject) => {
      const cancel = () => {
        clearTimeout(timer);
        reject(new DOMException('Cancelled', 'AbortError'));
      };
      const timer = setTimeout(
        () => {
          signal.removeEventListener('abort', cancel);
          if (responseMode === 'error' && failNext) {
            failNext = false;
            reject(new Error('Simulated response'));
            return;
          }
          resolve(options.filter((item) => item.label.includes(query.trim())));
        },
        query.includes('느림') ? 450 : 150,
      );
      signal.addEventListener('abort', cancel, { once: true });
      if (signal.aborted) cancel();
    });
});
</script>
<template>
  <SCard
    :heading-level="2"
    :title="part ? undefined : '로컬 입력 조합'"
  >
    <SCard
      v-if="!part || part === 'date'"
      title="단일 날짜와 기간"
    >
      <SSelect
        id="recipe-date-mode"
        v-model="mode"
        label="개발 설정 시연"
        :options="[
          { value: 'single', label: '단일 날짜' },
          { value: 'range', label: '기간' },
        ]"
        required
      />
      <SDatePicker
        id="recipe-date"
        v-model="date"
        label="가상 일정"
        :mode="dateMode"
      />
      <p role="status">완료값: {{ JSON.stringify(date) }}</p>
    </SCard>
    <SCard
      v-if="!part || part === 'files'"
      title="로컬 파일 선택과 드롭"
    >
      <SFileInput
        id="recipe-files"
        v-model="files"
        label="가상 첨부 파일"
        accept=".txt,.png,.jpg,.jpeg,.pdf"
        :max-files="3"
        :max-file-size="2 * 1024 * 1024"
        help="파일을 외부로 보내거나 내용을 읽지 않습니다. 이름·형식·크기만 이 화면 메모리에 표시합니다."
      />
    </SCard>
    <SCard
      v-if="!part || part === 'autocomplete'"
      title="단일 자동완성"
    >
      <SSelect
        id="recipe-autocomplete-mode"
        v-model="scenario"
        label="가상 응답"
        :options="[
          { value: 'local', label: '즉시 로컬' },
          { value: 'async', label: '지연 응답' },
          { value: 'error', label: '오류 후 재시도' },
        ]"
        required
      />
      <SAutocomplete
        id="recipe-autocomplete"
        v-model="selected"
        label="가상 분류 검색"
        :options="options"
        :load-options="loader"
        :debounce="0"
        :locale="{ retry: '검색 다시 시도' }"
        help="방향키·Enter 선택, Escape 닫기. 직접 입력은 검색어이며 선택한 값만 반영합니다. 비동기 응답도 브라우저 안의 가상 처리입니다."
      />
      <p role="status">선택값: {{ selected || '없음' }}</p>
    </SCard>
  </SCard>
</template>

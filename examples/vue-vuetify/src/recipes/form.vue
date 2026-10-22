<script setup lang="ts">
import { ref, computed, nextTick, onBeforeUnmount } from 'vue';

const name = ref(''),
  kind = ref<string | null>('note'),
  fail = ref(false),
  submitted = ref(false),
  busy = ref(false),
  done = ref(false),
  serverError = ref('');
let timer: ReturnType<typeof setTimeout>;
const error = computed(() =>
  submitted.value && name.value.trim().length < 3
    ? '이름을 3자 이상 입력해 주세요.'
    : '',
);
function save() {
  submitted.value = true;
  done.value = false;
  serverError.value = '';
  if (error.value) {
    nextTick(() => document.getElementById('recipe-form-name')?.focus());
    return;
  }
  if (busy.value) return;
  busy.value = true;
  timer = setTimeout(() => {
    busy.value = false;
    if (fail.value)
      serverError.value =
        '가상 요청 실패입니다. 값을 유지했으니 실패 옵션을 끄고 다시 확인하세요.';
    else done.value = true;
  }, 400);
}
onBeforeUnmount(() => clearTimeout(timer));
</script>
<template>
  <SCard
    :heading-level="2"
    title="입력과 검증·회복"
  >
    <form
      class="sol-stack"
      @submit.prevent="save"
      novalidate
    >
      <STextField
        id="recipe-form-name"
        v-model="name"
        label="가상 프로젝트 이름"
        :error="error"
        required
      />
      <SSelect
        id="recipe-form-kind"
        v-model="kind"
        label="프로젝트 유형"
        :options="[
          { value: 'note', label: '기록' },
          { value: 'search', label: '탐색' },
        ]"
        required
      />
      <SCheckbox
        id="recipe-form-fail"
        v-model="fail"
        label="실패를 흉내 내기"
      />
      <SAlert
        v-if="serverError"
        tone="danger"
        :title="serverError"
        live="polite"
      />
      <SAlert
        v-if="done"
        tone="success"
        title="✓ 가상 입력을 확인했어요."
        live="polite"
      />
      <SBtn
        type="submit"
        variant="primary"
        :loading="busy"
      >
        프로젝트 확인
      </SBtn>
    </form>
  </SCard>
</template>

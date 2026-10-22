<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
const value = ref(''),
  submitted = ref(false);
const error = computed(() =>
  submitted.value && value.value.trim().length < 3 ? '3자 이상 입력해 주세요.' : '',
);
function check() {
  submitted.value = true;
  if (error.value) nextTick(() => document.getElementById('recipe-field')?.focus());
}
</script>
<template>
  <SCard
    :heading-level="2"
    title="텍스트 입력"
  >
    <form
      class="sol-stack"
      @submit.prevent="check"
      novalidate
    >
      <STextField
        id="recipe-field"
        v-model="value"
        label="가상 기록 제목"
        required
        help="3자 이상. 이 페이지 메모리에만 남습니다."
        :error="error"
      />
      <STextField
        id="recipe-readonly"
        model-value="읽기 전용 예시"
        label="수정할 수 없는 값"
        readonly
      />
      <STextField
        id="recipe-disabled-field"
        model-value="아직 만들 수 없어요"
        label="공유 주소 · 비활성"
        disabled
      />
      <SBtn
        type="submit"
        variant="primary"
        >입력 확인</SBtn
      >
      <SAlert
        v-if="submitted && !error"
        tone="success"
        title="✓ 사용할 수 있는 이름입니다."
        ><p>예시 입력값입니다.</p></SAlert
      >
    </form>
  </SCard>
</template>

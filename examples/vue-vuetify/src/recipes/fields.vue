<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { SCard, STextField, SBtn } from '@solyi/vue-ui';
const value = ref(''),
  submitted = ref(false);
const error = computed(() =>
  submitted.value && value.value.trim().length < 3
    ? '3자 이상 입력해 주세요.'
    : '',
);
function check() {
  submitted.value = true;
  if (error.value)
    nextTick(() => document.getElementById('recipe-field')?.focus());
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
      <SBtn
        type="submit"
        variant="primary"
      >
        입력 확인
      </SBtn>
      <p
        v-if="submitted && !error"
        role="status"
      >
        ✓ 입력을 확인했어요.
      </p>
    </form>
  </SCard>
</template>

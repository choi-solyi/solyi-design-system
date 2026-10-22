<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';

const name = ref(''),
  count = ref<number | null>(null),
  submitted = ref(false);
const nameError = computed(() =>
    submitted.value && name.value.trim().length < 3
      ? '이름을 3자 이상 입력해 주세요.'
      : '',
  ),
  countError = computed(() =>
    submitted.value && (count.value === null || count.value < 1 || count.value > 5)
      ? '1~5 사이 개수를 입력해 주세요.'
      : '',
  );
const errors = computed(() =>
  [
    { id: 'recipe-summary-name', label: '이름', message: nameError.value },
    { id: 'recipe-summary-count', label: '개수', message: countError.value },
  ].filter((x) => x.message),
);
async function submit() {
  submitted.value = true;
  await nextTick();
  if (errors.value.length) document.getElementById('recipe-summary')?.focus();
}
function focusField(id: string) {
  document.getElementById(id)?.focus();
}
</script>
<template>
  <SCard
    :heading-level="2"
    title="오류 위치와 수정 방법"
  >
    <form
      class="sol-stack"
      @submit.prevent="submit"
      novalidate
    >
      <SAlert
        v-if="errors.length"
        id="recipe-summary"
        title="입력을 확인해 주세요."
        tone="danger"
        tabindex="-1"
      >
        <ul>
          <li
            v-for="error in errors"
            :key="error.id"
          >
            <a
              :href="'#' + error.id"
              @click.prevent="focusField(error.id)"
            >
              {{ error.label }} 확인하기
            </a>
          </li>
        </ul>
      </SAlert>
      <STextField
        id="recipe-summary-name"
        v-model="name"
        label="기록 이름"
        :error="nameError"
        required
      />
      <SNumberInput
        id="recipe-summary-count"
        v-model="count"
        label="목표 개수"
        :min="1"
        :max="5"
        :error="countError"
        required
      />
      <SBtn
        type="submit"
        variant="primary"
      >
        가상 입력 확인
      </SBtn>
      <p
        v-if="submitted && !errors.length"
        role="status"
      >
        ✓ 두 입력을 확인했어요.
      </p>
    </form>
  </SCard>
</template>

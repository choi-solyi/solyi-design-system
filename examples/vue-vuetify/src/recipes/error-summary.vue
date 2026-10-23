<script setup lang="ts">
import { sRules } from '@solyi/vue-ui';
import type { SFormSubmitEvent } from '@solyi/vue-ui';

const summary = useTemplateRef<{ $el: HTMLElement }>('summary');
const nameField = useTemplateRef<{ focus(): void }>('nameField');
const countField = useTemplateRef<{ focus(): void }>('countField');
const name = ref('');
const count = ref<number | null>(null);
const submitted = ref(false);
const nameRules = [
  sRules.required('이름을 입력해 주세요.'),
  sRules.minLength(3, '이름을 3자 이상 입력해 주세요.'),
];
const errors = computed(() =>
  submitted.value
    ? [
        {
          id: 'recipe-summary-name',
          label: '이름',
          message:
            !name.value.trim() || name.value.length < 3 ? '이름을 3자 이상 입력해 주세요.' : '',
          focus: () => nameField.value?.focus(),
        },
        {
          id: 'recipe-summary-count',
          label: '개수',
          message:
            count.value === null || count.value < 1 || count.value > 5
              ? '1~5 사이 개수를 입력해 주세요.'
              : '',
          focus: () => countField.value?.focus(),
        },
      ].filter((item) => item.message)
    : [],
);

async function submit(event: SFormSubmitEvent) {
  submitted.value = true;
  const result = await event;
  await nextTick();
  if (!result?.valid) summary.value?.$el.focus();
}
</script>

<template>
  <SCard :heading-level="2" title="오류 위치와 수정 방법">
    <SForm class="sol-stack" @submit.prevent="submit">
      <SAlert
        v-if="errors.length"
        id="recipe-summary"
        ref="summary"
        title="입력을 확인해 주세요."
        tone="danger"
        tabindex="-1"
      >
        <ul>
          <li v-for="error in errors" :key="error.id">
            <a :href="'#' + error.id" @click.prevent="error.focus()">{{ error.label }} 확인하기</a>
          </li>
        </ul>
      </SAlert>
      <STextField
        id="recipe-summary-name"
        ref="nameField"
        v-model="name"
        label="기록 이름"
        :rules="nameRules"
        required
      />
      <SNumberInput
        id="recipe-summary-count"
        ref="countField"
        v-model="count"
        label="목표 개수"
        :min="1"
        :max="5"
        required
      />
      <SBtn type="submit" variant="primary">가상 입력 확인</SBtn>
      <p v-if="submitted && !errors.length" role="status">✓ 두 입력을 확인했어요.</p>
    </SForm>
  </SCard>
</template>

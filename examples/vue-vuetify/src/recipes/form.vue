<script setup lang="ts">
import { sRules } from '@solyi/vue-ui';
import type { SFormHandle, SFormSubmitEvent } from '@solyi/vue-ui';

const form = useTemplateRef<SFormHandle>('form');
const name = ref('');
const kind = ref<string | null>('note');
const fail = ref(false);
const busy = ref(false);
const done = ref(false);
const serverError = ref('');
const nameRules = [
  sRules.required('이름을 입력해 주세요.'),
  sRules.minLength(3, '이름을 3자 이상 입력해 주세요.'),
];
let timer: ReturnType<typeof setTimeout>;

async function save(event: SFormSubmitEvent) {
  if (busy.value) return;
  done.value = false;
  serverError.value = '';
  const result = await event;
  if (!result?.valid) {
    form.value?.focus();
    return;
  }
  busy.value = true;
  timer = setTimeout(() => {
    busy.value = false;
    if (fail.value)
      serverError.value =
        '가상 요청 실패입니다. 입력값은 유지됩니다. 실패 옵션을 끄고 다시 확인하세요.';
    else done.value = true;
  }, 400);
}
onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <SCard :heading-level="2" title="입력과 검증·복구">
    <SForm ref="form" class="sol-stack" @submit.prevent="save">
      <SRow>
        <SCol cols="12" md="8">
          <STextField
            id="recipe-form-name"
            v-model="name"
            label="가상 프로젝트 이름"
            :rules="nameRules"
            required
          />
        </SCol>
        <SCol cols="12" md="4">
          <SSelect
            id="recipe-form-kind"
            v-model="kind"
            label="프로젝트 종류"
            :options="[
              { value: 'note', label: '기록' },
              { value: 'search', label: '탐색' },
            ]"
            required
          />
        </SCol>
      </SRow>
      <SCheckbox id="recipe-form-fail" v-model="fail" label="실패를 흉내 내기" />
      <SAlert v-if="serverError" tone="danger" :title="serverError" live="polite" />
      <SAlert v-if="done" tone="success" title="✓ 가상 입력을 확인했어요." live="polite" />
      <div class="sol-actions">
        <SBtn type="submit" variant="primary" :loading="busy">프로젝트 확인</SBtn>
        <SBtn @click="form?.resetValidation()">검증 표시 지우기</SBtn>
      </div>
    </SForm>
  </SCard>
</template>

<script setup lang="ts">
defineProps<{ part?: string }>()
const nameField = useTemplateRef<{ focus(): void }>('nameField')
const categoryField = useTemplateRef<{ focus(): void }>('categoryField')
const review = useTemplateRef<HTMLElement>('review')
const finalResult = useTemplateRef<HTMLElement>('finalResult')
const stage = ref(0),
  done = ref(false),
  name = ref(''),
  category = ref<string | null>(null),
  error = ref(''),
  result = ref('')
const items = [
  { id: 'profile', label: '가상 사용자 정보' },
  { id: 'settings', label: '가상 설정' },
]
const steps = [
  { id: 'name', label: '이름' },
  { id: 'category', label: '분류' },
  { id: 'review', label: '검토' },
]
const current = computed(() => steps[stage.value].id)
const labelPosition = ref<string | null>('inline')
const completed = computed(() => steps.slice(0, done.value ? 3 : stage.value).map(item => item.id))
async function move(delta: number) {
  error.value = ''
  if (delta > 0 && stage.value === 0 && !name.value.trim())
    error.value = '가상 이름을 입력해 주세요.'
  if (delta > 0 && stage.value === 1 && !category.value) error.value = '가상 분류를 선택해 주세요.'
  if (!error.value) {
    if (stage.value === 2 && delta > 0) done.value = true
    else {
      stage.value = Math.max(0, Math.min(2, stage.value + delta))
      done.value = false
    }
  }
  await nextTick()
  if (done.value) finalResult.value?.focus()
  else if (stage.value === 0) nameField.value?.focus()
  else if (stage.value === 1) categoryField.value?.focus()
  else review.value?.focus()
}
async function reset() {
  stage.value = 0
  done.value = false
  name.value = ''
  category.value = null
  error.value = ''
  await nextTick()
  nameField.value?.focus()
}
</script>
<template>
  <SCard :heading-level="2" :title="part ? undefined : '가상 사용자와 단계'">
    <div v-if="!part || part === 'avatar'" class="sol-actions">
      <SAvatar label="가상 사용자 민하" initials="민" />
      <SSplitBtn
        id="recipe-user"
        label="민하 · 가상 사용자"
        :items="items"
        @primary="result = '가상 사용자 정보'"
        @select="result = $event"
      />
      <p role="status">{{ result }}</p>
    </div>
    <template v-if="!part || part === 'steps'">
      <SRadioGroup
        id="recipe-step-layout"
        v-model="labelPosition"
        label="단계 이름 위치"
        :options="[
          { value: 'inline', label: '숫자 오른쪽' },
          { value: 'below', label: '숫자 아래' },
        ]"
      />
      <SStepper
        id="recipe-steps"
        :model-value="current"
        :items="steps"
        :completed="completed"
        :label-position="labelPosition === 'below' ? 'below' : 'inline'"
        label="가상 작성 단계"
      />
      <template v-if="!done">
        <STextField
          v-if="stage === 0"
          id="recipe-step-name"
          ref="nameField"
          v-model="name"
          label="가상 프로젝트 이름"
          :error="error"
          required
        />
        <SSelect
          v-else-if="stage === 1"
          id="recipe-step-category"
          ref="categoryField"
          v-model="category"
          label="가상 분류"
          :error="error"
          :options="[
            { value: 'notes', label: '기록' },
            { value: 'books', label: '독서' },
          ]"
          required
        />
        <p v-else id="recipe-step-review" ref="review" tabindex="-1">
          {{ name }} · {{ category }} · 서버에 저장하지 않는 가상 검토입니다.
        </p>
      </template>
      <p v-else id="recipe-step-result" ref="finalResult" role="status" tabindex="-1">
        ✓ 가상 단계를 완료했어요. 실제 프로젝트는 만들지 않습니다.
      </p>
      <div class="recipe-step-actions">
        <SBtn @click="reset">처음부터</SBtn>
        <div class="sol-actions">
          <SBtn :disabled="stage === 0 || done" @click="move(-1)">이전 단계</SBtn>
          <SBtn variant="primary" :disabled="done" @click="move(1)">{{
            stage === 2 ? '가상 완료' : '다음 단계'
          }}</SBtn>
        </div>
      </div>
    </template>
  </SCard>
</template>
<style scoped>
.recipe-step-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sol-space-2);
  flex-wrap: wrap;
}
.recipe-step-actions > .sol-actions {
  margin-inline-start: auto;
}
</style>

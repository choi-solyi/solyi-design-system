<script setup lang="ts">
const editTitle = useTemplateRef<HTMLElement>('editTitle');
const nameField = useTemplateRef<{ focus(): void }>('nameField');
const editButton = useTemplateRef<{ $el: HTMLElement }>('editButton');
const undoButton = useTemplateRef<{ $el: HTMLElement }>('undoButton');
const saved = ref({ title: '작은 정원', note: '가상 기록입니다.' }),
  draft = ref({ ...saved.value }),
  editing = ref(false),
  deleted = ref(false),
  confirm = ref(false),
  kind = ref<'leave' | 'delete'>('leave'),
  error = ref('');
const dirty = computed(
  () => draft.value.title !== saved.value.title || draft.value.note !== saved.value.note,
);
let answerLeave: ((allowed: boolean) => void) | undefined;
let leavePromise: Promise<boolean> | undefined;
function confirmLeave(): Promise<boolean> {
  if (!editing.value || !dirty.value) return Promise.resolve(true);
  if (leavePromise) return leavePromise;
  kind.value = 'leave';
  leavePromise = new Promise((resolve) => (answerLeave = resolve));
  confirm.value = true;
  return leavePromise;
}
watch(confirm, (value) => {
  if (!value && answerLeave) {
    const answer = answerLeave;
    answerLeave = undefined;
    leavePromise = undefined;
    answer(false);
  }
});
defineExpose({ confirmLeave });
function edit() {
  draft.value = { ...saved.value };
  editing.value = true;
  nextTick(() => editTitle.value?.focus());
}
function save() {
  if (!draft.value.title.trim()) {
    error.value = '기록 제목을 입력해 주세요.';
    nextTick(() => nameField.value?.focus());
    return;
  }
  saved.value = { ...draft.value };
  editing.value = false;
  error.value = '';
  nextTick(() => editButton.value?.$el.focus());
}
function leave() {
  if (dirty.value) {
    kind.value = 'leave';
    confirm.value = true;
  } else cancel();
}
function cancel() {
  editing.value = false;
  error.value = '';
  nextTick(() => editButton.value?.$el.focus());
}
function undo() {
  deleted.value = false;
  nextTick(() => editButton.value?.$el.focus());
}
function requestDelete() {
  kind.value = 'delete';
  confirm.value = true;
}
function decide() {
  const answer = answerLeave;
  answerLeave = undefined;
  leavePromise = undefined;
  confirm.value = false;
  if (kind.value === 'delete') {
    deleted.value = true;
    nextTick(() => undoButton.value?.$el.focus());
  } else if (answer) {
    // The explorer owns the destination focus after an approved navigation.
    editing.value = false;
    error.value = '';
  } else cancel();
  answer?.(true);
}
function before(e: BeforeUnloadEvent) {
  if (editing.value && dirty.value) {
    e.preventDefault();
    e.returnValue = '';
  }
}
onMounted(() => window.addEventListener('beforeunload', before));
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', before);
  answerLeave?.(false);
});
</script>
<template>
  <SCard :heading-level="2" title="수정과 복구">
    <SAlert v-if="deleted" title="가상 기록을 삭제했어요.">
      <template #actions>
        <SBtn variant="inline" id="recipe-undo" ref="undoButton" @click="undo">
          삭제 되돌리기
        </SBtn>
      </template>
    </SAlert>
    <form v-else-if="editing" class="sol-stack" @submit.prevent="save" novalidate>
      <h3 id="recipe-edit-title" ref="editTitle" tabindex="-1">가상 기록 수정</h3>
      <STextField
        id="recipe-edit-name"
        ref="nameField"
        v-model="draft.title"
        label="기록 제목"
        :error="error"
        required
      />
      <STextarea id="recipe-edit-note" v-model="draft.note" label="기록 설명" />
      <div class="sol-actions">
        <SBtn type="submit" variant="primary"> 저장 </SBtn>
        <SBtn @click="cancel">수정 취소</SBtn>
        <SBtn @click="leave">다른 가상 화면으로</SBtn>
      </div>
    </form>
    <template v-else>
      <p>{{ saved.title }} · {{ saved.note }}</p>
      <div class="sol-actions">
        <SBtn id="recipe-edit" ref="editButton" @click="edit"> 수정 </SBtn>
        <SBtn variant="secondary" @click="requestDelete"> 가상 삭제 </SBtn>
      </div>
    </template>
    <SDialog
      id="recipe-edit-confirm"
      v-model="confirm"
      :title="kind === 'delete' ? '가상 기록 1개를 삭제할까요?' : '저장하지 않은 변경이 있어요.'"
    >
      <p>실제 파일과 서버에 연결되지 않습니다.</p>
      <template #actions>
        <SBtn @click="confirm = false">계속 작업</SBtn>
        <SBtn variant="secondary" @click="decide">
          {{ kind === 'delete' ? '가상 삭제' : '변경 버리기' }}
        </SBtn>
      </template>
    </SDialog>
  </SCard>
</template>

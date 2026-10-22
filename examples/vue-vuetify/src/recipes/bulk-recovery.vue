<script setup lang="ts">
import { ref, computed, nextTick, onBeforeUnmount } from 'vue';

type Row = {
  id: number;
  state: 'idle' | 'pending' | 'success' | 'error';
  attempts: number;
};
const rows = ref<Row[]>([1, 2, 3].map((id) => ({ id, state: 'idle', attempts: 0 }))),
  selected = ref<Record<number, boolean>>({ 1: true, 2: true, 3: true }),
  busy = ref(false),
  result = ref('');
let timer: ReturnType<typeof setTimeout>;
const failed = computed(() => rows.value.some((r) => r.state === 'error'));
function run(retry = false) {
  if (busy.value) return;
  const targets = rows.value.filter((r) =>
    retry ? r.state === 'error' : selected.value[r.id] && r.state === 'idle',
  );
  if (!targets.length) return;
  busy.value = true;
  result.value = '가상 항목 처리 중…';
  targets.forEach((r) => {
    r.state = 'pending';
    r.attempts++;
  });
  timer = setTimeout(() => {
    const restore = document.activeElement?.id === 'recipe-bulk-retry';
    targets.forEach(
      (r) => (r.state = r.id === 2 && r.attempts === 1 ? 'error' : 'success'),
    );
    busy.value = false;
    result.value =
      '완료 ' +
      rows.value.filter((r) => r.state === 'success').length +
      '개 · 실패 ' +
      rows.value.filter((r) => r.state === 'error').length +
      '개';
    if (restore) nextTick(() => document.getElementById('recipe-bulk-result')?.focus());
  }, 350);
}
onBeforeUnmount(() => clearTimeout(timer));
</script>
<template>
  <SCard
    :heading-level="2"
    title="일괄 작업의 일부 실패"
  >
    <p>처음에는 2번만 실패하는 가상 처리입니다. 외부 데이터를 바꾸지 않습니다.</p>
    <div
      v-for="row in rows"
      :key="row.id"
    >
      <SCheckbox
        :id="'recipe-bulk-' + row.id"
        :model-value="selected[row.id]"
        @update:model-value="selected[row.id] = $event"
        :label="'가상 기록 ' + row.id"
        :disabled="busy || row.state === 'success'"
      />
      <p>{{ row.state }} · 처리 {{ row.attempts }}회</p>
    </div>
    <div class="sol-actions">
      <SBtn
        :loading="busy"
        @click="run()"
      >
        선택한 가상 항목 처리
      </SBtn>
      <SBtn
        id="recipe-bulk-retry"
        variant="inline"
        :disabled="busy || !failed"
        @click="run(true)"
      >
        실패 항목만 다시 시도
      </SBtn>
    </div>
    <SAlert
      id="recipe-bulk-result"
      tabindex="-1"
      v-if="result"
      :tone="busy ? 'info' : failed ? 'danger' : 'success'"
      :title="result"
      live="polite"
    />
  </SCard>
</template>

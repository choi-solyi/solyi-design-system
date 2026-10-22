<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { SCard, SDatePicker, SSelect, SBtn, SAlert } from '@solyi/vue-ui';
import type { DateValue } from '@solyi/vue-ui';
const mode = ref<string | null>('range'),
  date = ref<DateValue>(null);
const dateMode = computed(() => (mode.value === 'single' ? 'single' : 'range'));
watch(dateMode, () => (date.value = null));
// File and single-autocomplete APIs are not exported yet. These are complete Vue
// compositions using S surfaces/actions and the necessary native browser primitives.
const fileInput = ref<HTMLInputElement | null>(null),
  dropzone = ref<HTMLElement | null>(null),
  files = ref<File[]>([]),
  fileErrors = ref<string[]>([]),
  dragging = ref(false);
const allowed = new Set(['txt', 'png', 'jpg', 'jpeg', 'pdf']);
const knownMime: Record<string, string> = {
  'text/plain': '텍스트',
  'image/png': 'PNG 이미지',
  'image/jpeg': 'JPEG 이미지',
  'application/pdf': 'PDF 문서',
};
function addFiles(incoming: File[]) {
  const errors: string[] = [];
  for (const file of incoming) {
    const ext = file.name.includes('.')
      ? file.name.split('.').at(-1)!.toLowerCase()
      : '';
    if (!allowed.has(ext)) {
      errors.push(file.name + ': 허용하지 않는 확장자');
      continue;
    }
    if (file.size > 2 * 1024 * 1024) {
      errors.push(file.name + ': 2MiB 초과');
      continue;
    }
    if (
      files.value.some(
        (f) =>
          f.name === file.name &&
          f.size === file.size &&
          f.lastModified === file.lastModified,
      )
    ) {
      errors.push(file.name + ': 이미 선택한 파일');
      continue;
    }
    if (files.value.length >= 3) {
      errors.push(file.name + ': 최대 3개');
      continue;
    }
    files.value.push(file);
  }
  fileErrors.value = errors;
  if (fileInput.value) fileInput.value.value = '';
  dragging.value = false;
}
function choose(e: Event) {
  addFiles(Array.from((e.target as HTMLInputElement).files || []));
}
let dragDepth = 0;
function dragEnter(e: DragEvent) {
  if (!e.dataTransfer?.types.includes('Files')) return;
  e.preventDefault();
  dragDepth++;
  dragging.value = true;
}
function dragLeave() {
  dragDepth = Math.max(0, dragDepth - 1);
  if (!dragDepth) dragging.value = false;
}
function dragOver(e: DragEvent) {
  if (e.dataTransfer?.types.includes('Files')) e.preventDefault();
}
function drop(e: DragEvent) {
  if (!e.dataTransfer?.types.includes('Files')) return;
  e.preventDefault();
  dragDepth = 0;
  dragging.value = false;
  addFiles(Array.from(e.dataTransfer.files));
}
function removeFile(index: number) {
  files.value.splice(index, 1);
  nextTick(() => document.getElementById('recipe-file-add')?.focus());
}
function guard(e: DragEvent) {
  if (e.dataTransfer?.types.includes('Files')) {
    e.preventDefault();
    if (e.type === 'drop' && !dropzone.value?.contains(e.target as Node))
      fileErrors.value = ['점선 영역이나 파일 선택 버튼을 사용해 주세요.'];
  }
}
// Local asynchronous suggestions: generation guards reject stale simulated replies.
const combo = ref<HTMLElement | null>(null),
  input = ref<HTMLInputElement | null>(null),
  query = ref(''),
  scenario = ref<string | null>('local'),
  open = ref(false),
  active = ref(-1),
  state = ref<'ready' | 'loading' | 'error'>('ready'),
  rows = ref<string[]>([]),
  result = ref('');
const choices = ['기록', '독서', '식물', '산책', '작은 정원'];
let composing = false,
  generation = 0;
const timers = new Set<ReturnType<typeof setTimeout>>();
function request(retry = false) {
  const seq = ++generation,
    text = query.value.normalize('NFKC').trim().toLocaleLowerCase();
  open.value = true;
  active.value = -1;
  state.value = 'loading';
  const respond = () => {
    if (seq !== generation) return;
    if (scenario.value === 'error' && !retry) {
      state.value = 'error';
      rows.value = [];
      return;
    }
    rows.value = choices.filter((x) => x.toLocaleLowerCase().includes(text));
    state.value = 'ready';
  };
  if (scenario.value === 'local') respond();
  else {
    const timer = setTimeout(
      () => {
        timers.delete(timer);
        respond();
      },
      text.includes('느림') ? 450 : 150,
    );
    timers.add(timer);
  }
}
watch(scenario, () => request());
function change(e: Event) {
  query.value = (e.target as HTMLInputElement).value;
  if (!composing) request();
}
function endComposition(e: CompositionEvent) {
  composing = false;
  change(e);
}
function chooseOption(value: string) {
  query.value = value;
  result.value = '선택: ' + value;
  open.value = false;
  active.value = -1;
  generation++;
  input.value?.focus();
}
function key(e: KeyboardEvent) {
  if (composing || e.isComposing) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    open.value = false;
    active.value = -1;
    generation++;
    input.value?.focus();
    return;
  }
  if (e.key === 'Tab') {
    if (state.value !== 'error') open.value = false;
    return;
  }
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    if (!open.value) request();
    if (rows.value.length && state.value === 'ready')
      active.value =
        (active.value + (e.key === 'ArrowDown' ? 1 : -1) + rows.value.length) %
        rows.value.length;
    return;
  }
  if (open.value && active.value >= 0 && rows.value[active.value]) {
    if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      active.value = e.key === 'Home' ? 0 : rows.value.length - 1;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      chooseOption(rows.value[active.value]);
    }
  }
}
function outside(e: Event) {
  if (combo.value && !combo.value.contains(e.target as Node))
    open.value = false;
}
function focusout() {
  nextTick(() => {
    if (combo.value && !combo.value.contains(document.activeElement))
      open.value = false;
  });
}
onMounted(() => {
  document.addEventListener('dragover', guard);
  document.addEventListener('drop', guard);
  document.addEventListener('pointerdown', outside);
});
onBeforeUnmount(() => {
  generation++;
  timers.forEach(clearTimeout);
  document.removeEventListener('dragover', guard);
  document.removeEventListener('drop', guard);
  document.removeEventListener('pointerdown', outside);
});
</script>
<template>
  <SCard
    :heading-level="2"
    title="로컬 입력 조합"
  >
    <SCard title="단일 날짜와 기간">
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
    <SCard title="로컬 파일 선택과 드롭">
      <div
        ref="dropzone"
        role="group"
        aria-label="로컬 파일 놓기"
        class="sol-dropzone"
        :data-dragging="dragging"
        @dragenter="dragEnter"
        @dragover="dragOver"
        @dragleave="dragLeave"
        @drop="drop"
      >
        <p>TXT·PNG·JPG·JPEG·PDF · 파일당 2MiB 이하 · 최대 3개</p>
        <SBtn
          id="recipe-file-add"
          @click="fileInput?.click()"
        >
          파일 선택
        </SBtn>
        <input
          ref="fileInput"
          type="file"
          accept=".txt,.png,.jpg,.jpeg,.pdf"
          multiple
          hidden
          @change="choose"
        />
        <p>
          파일을 외부로 보내거나 내용을 읽지 않습니다. 이름·형식·크기만 이 화면
          메모리에 표시합니다.
        </p>
      </div>
      <SAlert
        v-if="fileErrors.length"
        tone="danger"
        title="파일 선택을 확인해 주세요."
        live="polite"
      >
        <ul>
          <li
            v-for="error in fileErrors"
            :key="error"
          >
            {{ error }}
          </li>
        </ul>
      </SAlert>
      <ul>
        <li
          v-for="(file, i) in files"
          :key="file.name + file.size + file.lastModified"
        >
          {{ file.name }} ·
          {{
            file.name.includes('.')
              ? file.name.split('.').at(-1)
              : '확장자 없음'
          }}
          · {{ knownMime[file.type] || file.type || 'MIME 정보 없음' }} ·
          {{ file.size }} B
          <SBtn
            variant="inline"
            :aria-label="file.name + ' 제거'"
            @click="removeFile(i)"
          >
            제거
          </SBtn>
        </li>
      </ul>
      <SBtn
        variant="inline"
        :disabled="!files.length"
        @click="
          files = [];
          fileErrors = [];
        "
      >
        모두 제거
      </SBtn>
    </SCard>
    <SCard title="자동완성 Vue 조합">
      <p>
        단일 자동완성 전용 S API는 아직 없습니다. 아래 코드는 SCard·SBtn과
        native combobox 입력을 연결한 조합입니다.
      </p>
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
      <div
        ref="combo"
        class="sol-field"
        @focusout="focusout"
        @keydown="key"
      >
        <label
          for="recipe-autocomplete"
          class="sol-label"
        >
          가상 분류 검색
        </label>
        <input
          id="recipe-autocomplete"
          ref="input"
          class="sol-input"
          :value="query"
          role="combobox"
          aria-autocomplete="list"
          aria-controls="recipe-options"
          :aria-expanded="open"
          :aria-activedescendant="
            open && active >= 0 && rows[active]
              ? 'recipe-option-' + active
              : undefined
          "
          aria-describedby="recipe-combo-help recipe-combo-status"
          autocomplete="off"
          @input="change"
          @compositionstart="composing = true"
          @compositionend="endComposition"
        />
        <p
          id="recipe-combo-help"
          class="sol-hint"
        >
          방향키·Enter 선택, Escape 닫기. 일반 Home/End와 한국어 조합은 텍스트
          편집을 유지합니다.
        </p>
        <div v-show="open">
          <ul
            id="recipe-options"
            v-show="state === 'ready' && rows.length"
            role="listbox"
            aria-label="가상 분류 제안"
          >
            <li
              v-for="(row, i) in rows"
              :id="'recipe-option-' + i"
              :key="row"
              role="option"
              :aria-selected="active === i"
              @mousedown.prevent
              @click="chooseOption(row)"
            >
              {{ row }}
            </li>
          </ul>
          <SAlert
            v-if="state === 'error'"
            tone="danger"
            title="가상 검색 오류"
          >
            <template #actions>
              <SBtn
                variant="inline"
                @click="request(true)"
              >
                검색 다시 시도
              </SBtn>
            </template>
          </SAlert>
        </div>
        <p
          id="recipe-combo-status"
          role="status"
        >
          {{
            open && state === 'loading'
              ? '가상 검색 중…'
              : open && state === 'error'
                ? '오류가 발생했어요. Tab으로 재시도할 수 있어요.'
                : open && !rows.length
                  ? '결과가 없어요.'
                  : result || '아직 선택하지 않았어요.'
          }}
        </p>
        <div class="sol-actions">
          <SBtn @click="request()">목록 열기</SBtn>
          <SBtn
            variant="inline"
            @click="
              query = '';
              result = '';
              request();
            "
          >
            입력 지우기
          </SBtn>
        </div>
      </div>
    </SCard>
  </SCard>
</template>

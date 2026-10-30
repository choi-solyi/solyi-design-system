<script setup lang="ts">
import { formatSolDate } from 'solyi-ui'
import type {
  DateValue,
  SolOption,
  SolOptionLoader,
  SolDateDisplayFormatter,
  SolPickerPresentation,
  SolPickerPlacement,
} from 'solyi-ui'

defineProps<{ part?: string }>()
const imagePreview = ref(true)
const mode = ref<string | null>('range'),
  date = ref<DateValue>(null)
const dateMode = computed(() => (mode.value === 'single' ? 'single' : 'range'))
const showWeekday = ref(false)
const pickerChoice = ref<string | null>('legacy'),
  placementChoice = ref<string | null>('bottom-start')
const datePickerPresentation = computed<SolPickerPresentation | undefined>(() =>
  pickerChoice.value === 'auto' ||
  pickerChoice.value === 'popover' ||
  pickerChoice.value === 'dialog'
    ? pickerChoice.value
    : undefined,
)
const datePlacement = computed<SolPickerPlacement>(() =>
  placementChoice.value === 'top-start' ||
  placementChoice.value === 'top-end' ||
  placementChoice.value === 'bottom-end'
    ? placementChoice.value
    : 'bottom-start',
)
const formatDateWithWeekday: SolDateDisplayFormatter = (iso, locale) =>
  iso +
  ' (' +
  formatSolDate(iso, locale, {
    year: undefined,
    month: undefined,
    day: undefined,
    weekday: 'short',
  }) +
  ')'
watch(dateMode, () => (date.value = null))
const files = ref<File[]>([]),
  selected = ref<string | null>(null),
  scenario = ref<string | null>('local')
const options: SolOption[] = ['기록', '독서', '식물', '산책', '작은 정원'].map(label => ({
  value: label,
  label,
}))
let failNext = true
watch(scenario, () => {
  failNext = true
  selected.value = null
})
const loader = computed<SolOptionLoader | undefined>(() => {
  const responseMode = scenario.value
  if (responseMode === 'local') return undefined
  return (query, signal) =>
    new Promise<readonly SolOption[]>((resolve, reject) => {
      const cancel = () => {
        clearTimeout(timer)
        reject(new DOMException('Cancelled', 'AbortError'))
      }
      const timer = setTimeout(
        () => {
          signal.removeEventListener('abort', cancel)
          if (responseMode === 'error' && failNext) {
            failNext = false
            reject(new Error('Simulated response'))
            return
          }
          resolve(options.filter(item => item.label.includes(query.trim())))
        },
        query.includes('느림') ? 450 : 150,
      )
      signal.addEventListener('abort', cancel, { once: true })
      if (signal.aborted) cancel()
    })
})
</script>
<template>
  <section class="sol-stack" :aria-labelledby="part ? undefined : 'recipe-inputs-title'">
    <h2 v-if="!part" id="recipe-inputs-title">로컬 입력 조합</h2>
    <SCard :heading-level="part ? 2 : 3" v-if="!part || part === 'date'" title="단일 날짜와 기간">
      <SRadioGroup
        id="recipe-date-mode"
        v-model="mode"
        label="개발 설정 시연"
        :options="[
          { value: 'single', label: '단일 날짜' },
          { value: 'range', label: '기간' },
        ]"
        required
      />
      <SCheckbox
        id="recipe-date-weekday"
        v-model="showWeekday"
        label="요일 표시 · 저장값은 ISO 유지"
      />
      <SSelect
        id="recipe-date-presentation"
        v-model="pickerChoice"
        label="팝업 표시 방식"
        :options="[
          { value: 'legacy', label: '기존 기본 모달' },
          { value: 'auto', label: '화면에 맞춰 자동 전환' },
          { value: 'popover', label: '입력창에 연결된 팝업' },
          { value: 'dialog', label: '모달 다이얼로그' },
        ]"
      />
      <SSelect
        id="recipe-date-placement"
        v-model="placementChoice"
        label="연결 팝업의 기준 위치"
        :disabled="!datePickerPresentation"
        :options="[
          { value: 'bottom-start', label: '아래 · 시작' },
          { value: 'bottom-end', label: '아래 · 끝' },
          { value: 'top-start', label: '위 · 시작' },
          { value: 'top-end', label: '위 · 끝' },
        ]"
      />
      <SDatePicker
        id="recipe-date"
        v-model="date"
        clearable
        label="가상 일정"
        :mode="dateMode"
        :picker-presentation="datePickerPresentation"
        :placement="datePlacement"
        :display-formatter="showWeekday ? formatDateWithWeekday : undefined"
      />
      <p role="status">완료값: {{ JSON.stringify(date) }}</p>
    </SCard>
    <SCard
      :heading-level="part ? 2 : 3"
      v-if="!part || part === 'files'"
      title="로컬 파일 선택과 드롭"
    >
      <SCheckbox
        id="recipe-files-preview"
        v-model="imagePreview"
        label="선택한 이미지의 로컬 미리보기"
      />
      <SFileInput
        :preview="imagePreview"
        id="recipe-files"
        v-model="files"
        label="가상 첨부 파일"
        accept=".txt,.png,.jpg,.jpeg,.pdf"
        :max-files="3"
        :max-file-size="2 * 1024 * 1024"
        help="선택한 이미지는 이 화면에서만 로컬 썸네일로 표시합니다. 파일을 외부로 보내지 않으며 제거하거나 화면을 닫으면 미리보기 URL을 해제합니다."
      />
    </SCard>
    <SCard
      :heading-level="part ? 2 : 3"
      v-if="!part || part === 'autocomplete'"
      title="단일 자동완성"
    >
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
      <SAutocomplete
        id="recipe-autocomplete"
        v-model="selected"
        clearable
        label="가상 분류 검색"
        :options="options"
        :load-options="loader"
        :debounce="0"
        :locale="{ retry: '검색 다시 시도' }"
        help="방향키·Enter 선택, Escape 닫기. 직접 입력은 검색어이며 선택한 값만 반영합니다. 비동기 응답도 브라우저 안의 가상 처리입니다."
      />
      <p role="status">선택값: {{ selected || '없음' }}</p>
    </SCard>
  </section>
</template>

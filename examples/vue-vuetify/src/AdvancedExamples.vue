<script setup>
import { resolveCategoricalColor } from 'solyi-ui'

const props = defineProps({
  part: { type: String, default: '' },
  headingLevel: { type: Number, default: 2 },
  idPrefix: { type: String, default: '' },
})
const previewId = id => (props.idPrefix ? props.idPrefix + '-' + id : id)
const headingTag = computed(() =>
  [2, 3, 4, 5, 6].includes(props.headingLevel) ? 'h' + props.headingLevel : 'h2',
)
const supportedParts = [
  'segmented',
  'multiselect',
  'range',
  'split-button',
  'context-menu',
  'split-pane',
  'sortable',
  'month-calendar',
  'time-grid',
]
const part = computed(() => (supportedParts.includes(props.part) ? props.part : ''))
const show = (...parts) => !part.value || parts.includes(part.value)
const disabled = ref(false),
  readonly = ref(false),
  display = ref('brief'),
  selected = ref(['garden']),
  scenario = ref('local'),
  requests = ref(0)
const choices = [
  { value: 'garden', label: '정원' },
  { value: 'book', label: '책장' },
  { value: 'walk', label: '산책' },
  { value: 'season', label: '계절 관찰' },
  { value: 'locked', label: '보관 · 선택 불가', disabled: true },
]
const loader = computed(() => {
  const mode = scenario.value
  if (mode === 'local') return undefined
  return async (query, signal) => {
    const attempt = ++requests.value
    await new Promise((resolve, reject) => {
      const timer = setTimeout(
        () => {
          signal.removeEventListener('abort', abort)
          resolve()
        },
        query.includes('느림') ? 600 : 180,
      )
      const abort = () => {
        clearTimeout(timer)
        reject(new DOMException('Cancelled', 'AbortError'))
      }
      signal.addEventListener('abort', abort, { once: true })
      if (signal.aborted) abort()
    })
    if (mode === 'retry' && attempt === 1) throw new Error('가상 실패')
    return choices.filter(o => o.label.includes(query.trim()))
  }
})
watch(scenario, () => (requests.value = 0))
const range = ref([20, 80]),
  action = ref('아직 실행하지 않았어요.'),
  primaryCount = ref(0),
  menuOpen = ref(false)
const actions = [
  { id: 'json', label: 'JSON으로 내보내기 · 가상' },
  { id: 'csv', label: 'CSV로 내보내기 · 가상' },
  { id: 'blocked', label: '예약 · 비활성', disabled: true },
]
const contextItems = [
  { id: 'pin', label: '자료 고정 · 가상' },
  { id: 'copy', label: '복제 · 가상' },
  { id: 'archive', label: '보관 · 비활성', disabled: true },
]
function chosenAction(id) {
  action.value =
    '✓ ' +
    [...actions, ...contextItems].find(i => i.id === id)?.label +
    ' 동작을 확인했습니다. 외부 작업은 없습니다.'
}
const ratio = ref(40),
  direction = ref('horizontal'),
  memo = ref('화면 폭을 바꾸어도 이 가상 메모는 유지됩니다.'),
  stacked = ref(false),
  resized = ref('')
const sortableItems = ref([
    { id: 'a', label: '첫 번째 항목', details: { count: 4 } },
    { id: 'b', label: '긴 텍스트를 가진 두 번째 항목도 줄바꿈합니다', details: { count: 7 } },
    { id: 'c', label: '세 번째 항목', details: { count: 2 } },
  ]),
  acceptOrder = ref(true),
  lockSecond = ref(false),
  sortStatus = ref('')
const calendarMonth = ref('2026-10'),
  calendarDate = ref('2026-10-07'),
  calendarAcceptMonth = ref(true),
  calendarAcceptDate = ref(true),
  calendarLoading = ref(false),
  calendarEmpty = ref(false),
  calendarMonday = ref(false),
  calendarBlocked = ref(false)
const calendarMarkers = Object.freeze({
  '2026-10-28': Object.freeze([
    Object.freeze({
      id: 'a',
      label: '첫 번째 범주',
      category: resolveCategoricalColor('example-a').category,
    }),
    Object.freeze({
      id: 'b',
      label: '길게 입력한 두 번째 상태도 넘치지 않게 표시합니다',
      tone: 'warning',
    }),
    Object.freeze({ id: 'c', label: '세 번째 상태는 추가 개수로 안내합니다' }),
  ]),
})
const gridToday = new Date(),
  gridTomorrow = new Date(gridToday)
gridTomorrow.setDate(gridTomorrow.getDate() + 1)
const gridDay = date =>
  date.getFullYear() +
  '-' +
  String(date.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(date.getDate()).padStart(2, '0')
const gridColumns = Object.freeze([
  { key: 'one', label: '열 A', date: gridDay(gridToday) },
  { key: 'two', label: '열 B', date: gridDay(gridTomorrow) },
])
const gridSeed = Object.freeze([
  Object.freeze({ id: 'a', column: 'one', start: 480, end: 570, title: '첫 번째 항목' }),
  Object.freeze({
    id: 'b',
    column: 'one',
    start: 510,
    end: 600,
    title: '겹치는 항목도 원본 시간을 바꾸지 않습니다.',
  }),
  Object.freeze({
    id: 'c',
    column: 'one',
    start: 600,
    end: 615,
    title: '짧은 항목 · 긴 이름은 아래 목록에서 전체 내용을 확인할 수 있습니다.',
  }),
  Object.freeze({ id: 'd', column: 'two', start: 780, end: 840, title: '두 번째 열 항목' }),
])
const gridItems = ref(gridSeed),
  gridEditable = ref(true),
  gridDisabled = ref(false),
  gridLockedFirst = ref(false),
  gridPendingFirst = ref(false),
  gridAccept = ref(true),
  gridPreview = ref(null),
  gridResult = ref('')
let gridCopy = 0
function acceptGridProposal(proposal) {
  gridPreview.value = null
  gridResult.value =
    proposal.action +
    ' · ' +
    proposal.to.columnKey +
    ' · ' +
    proposal.to.startMinute +
    '–' +
    proposal.to.endMinute
  if (!gridAccept.value) {
    gridResult.value += ' · 부모가 반영하지 않아 원본 유지'
    return
  }
  const original = gridItems.value.find(item => item.id === proposal.key)
  if (!original) return
  const next = Object.freeze({
    ...original,
    column: proposal.to.columnKey,
    start: proposal.to.startMinute,
    end: proposal.to.endMinute,
    ...(proposal.action === 'duplicate'
      ? { id: 'copy-' + ++gridCopy, title: original.title + ' · 복제' }
      : {}),
  })
  gridItems.value = Object.freeze(
    proposal.action === 'duplicate'
      ? [...gridItems.value, next]
      : gridItems.value.map(item => (item.id === proposal.key ? next : item)),
  )
}
function createGrid(request) {
  gridPreview.value = null
  gridResult.value =
    '추가 요청 · ' + request.columnKey + ' · ' + request.startMinute + '–' + request.endMinute
  if (!gridAccept.value) {
    gridResult.value += ' · 원본 유지'
    return
  }
  const item = Object.freeze({
    id: 'new-' + ++gridCopy,
    column: request.columnKey,
    start: request.startMinute,
    end: request.endMinute,
    title: '새 가상 항목 ' + gridCopy,
  })
  gridItems.value = Object.freeze([...(gridEmpty.value ? [] : gridItems.value), item])
  gridEmpty.value = false
}
function removeGrid(request) {
  gridPreview.value = null
  gridResult.value = '삭제 요청 · ' + request.key
  if (!gridAccept.value) {
    gridResult.value += ' · 원본 유지'
    return
  }
  gridItems.value = Object.freeze(gridItems.value.filter(item => item.id !== request.key))
}
function resetGrid() {
  gridItems.value = Object.freeze([...gridSeed])
  gridPreview.value = null
  gridResult.value = ''
}
function cancelGrid(result) {
  gridPreview.value = null
  gridResult.value = '취소 · ' + result.reason
}
const gridEmpty = ref(false),
  gridLoading = ref(false)
const gridBands = Object.freeze([
  { id: 'band-a', label: '범용 구간', startMinute: 720, endMinute: 780, category: 'c2' },
])
function acceptProposal(items) {
  if (acceptOrder.value) sortableItems.value = items
}
function reorderEnd(result) {
  sortStatus.value =
    result.status === 'cancel'
      ? '취소: ' + result.reason
      : result.status === 'unchanged'
        ? '순서 유지'
        : (acceptOrder.value ? '새 순서 반영: ' : '순서 제안만 확인: ') + result.key
}
watch([disabled, readonly], () => {
  if (disabled.value || readonly.value) menuOpen.value = false
})
</script>

<template>
  <section
    v-if="show('segmented')"
    class="starter-card"
    :aria-labelledby="previewId('advanced-title')"
  >
    <component :is="headingTag" :id="previewId('advanced-title')"
      >설정 하나 선택 · SSegmentedControl</component
    >
    <p class="starter-hint">
      선택·범위·메뉴·분할 부품을 설치한 solyi-ui에서 가져옵니다. 아래 설정은 이 예제들에만
      적용됩니다. 모든 데이터와 작업은 가상입니다.
    </p>
    <div class="starter-settings starter-demo-settings">
      <SSwitch
        :id="previewId('advanced-disabled')"
        v-model="disabled"
        label="확장 예시 비활성"
      /><SSwitch
        :id="previewId('advanced-readonly')"
        v-model="readonly"
        label="확장 예시 읽기 전용"
      />
    </div>
    <SSegmentedControl
      :id="previewId('advanced-segment')"
      v-model="display"
      label="가상 표시 설정"
      :options="[
        { value: 'brief', label: '간단히' },
        { value: 'full', label: '자세히' },
        { value: 'locked', label: '보관 · 비활성', disabled: true },
      ]"
      :disabled="disabled"
      :readonly="readonly"
      help="설정 하나를 고릅니다. Tabs처럼 별도 패널을 전환하는 부품은 아닙니다."
    />
    <p class="starter-result" role="status">
      {{
        display === 'brief'
          ? '가상 기록 4개'
          : '가상 기록 4개 · 메모와 변경 정보를 함께 표시하는 설정'
      }}
    </p>
  </section>
  <section
    v-if="show('multiselect')"
    class="starter-card"
    :aria-labelledby="previewId('advanced-multi-title')"
  >
    <component :is="headingTag" :id="previewId('advanced-multi-title')"
      >검색 가능한 MultiSelect</component
    >
    <div v-if="part" class="starter-settings starter-demo-settings">
      <SSwitch
        :id="previewId('advanced-disabled')"
        v-model="disabled"
        label="예제 비활성"
      /><SSwitch :id="previewId('advanced-readonly')" v-model="readonly" label="예제 읽기 전용" />
    </div>
    <SSelect
      :id="previewId('advanced-multi-scenario')"
      v-model="scenario"
      required
      label="가상 목록 동작"
      :options="[
        { value: 'local', label: '로컬 검색' },
        { value: 'async', label: '지연 응답 흉내' },
        { value: 'retry', label: '첫 오류 후 재시도' },
      ]"
      help="외부 요청 없이 브라우저 안에서 지연·실패를 흉내 냅니다. '없는값'으로 결과 없음을 확인할 수 있어요."
    />
    <SMultiSelect
      :id="previewId('advanced-multi')"
      v-model="selected"
      clearable
      label="가상 기록 분류"
      :options="choices"
      :load-options="loader"
      :max-selected="3"
      required
      :disabled="disabled"
      :readonly="readonly"
      placeholder="분류 이름 검색"
      help="방향키·Enter로 선택/해제, 빈 검색칸에서 Backspace로 마지막 선택 제거. Escape는 목록만 닫습니다. Tab은 제거/재시도 버튼에도 접근합니다."
    />
    <p class="starter-hint">
      완료 값: {{ JSON.stringify(selected) }} · 가상 요청 {{ requests }}회. 검색을 바꾸어도 기존
      선택은 유지됩니다.
    </p>
  </section>
  <section
    v-if="show('range')"
    class="starter-card"
    :aria-labelledby="previewId('advanced-range-title')"
  >
    <component :is="headingTag" :id="previewId('advanced-range-title')">양끝 RangeSlider</component>
    <div v-if="part" class="starter-settings starter-demo-settings">
      <SSwitch
        :id="previewId('advanced-disabled')"
        v-model="disabled"
        label="예제 비활성"
      /><SSwitch :id="previewId('advanced-readonly')" v-model="readonly" label="예제 읽기 전용" />
    </div>
    <SRangeSlider
      :id="previewId('advanced-range')"
      v-model="range"
      label="가상 점수 구간"
      lower-label="하한"
      upper-label="상한"
      :min="0"
      :max="100"
      :step="5"
      :format-value="(value) => value + '점'"
      :disabled="disabled"
      :readonly="readonly"
      help="두 핸들은 서로 넘어가지 않습니다. 핸들 드래그·방향키 또는 트랙 누르기로 조절하세요."
    />
    <div class="starter-control-grid">
      <SNumberInput
        :id="previewId('advanced-lower')"
        required
        v-model="range[0]"
        label="하한 직접 입력"
        :min="0"
        :max="range[1]"
        :step="5"
        :disabled="disabled"
        :readonly="readonly"
      /><SNumberInput
        :id="previewId('advanced-upper')"
        required
        v-model="range[1]"
        label="상한 직접 입력"
        :min="range[0]"
        :max="100"
        :step="5"
        :disabled="disabled"
        :readonly="readonly"
      />
    </div>
    <p class="starter-hint">
      숫자 입력도 같은 값을 사용합니다. 터치 보조기술의 사용자별 동작은 실제 기기에서 별도 확인해야
      합니다.
    </p>
  </section>
  <section
    v-if="show('split-button', 'context-menu')"
    class="starter-card"
    :aria-labelledby="previewId('advanced-actions-title')"
  >
    <component :is="headingTag" :id="previewId('advanced-actions-title')">
      {{
        part === 'split-button'
          ? 'SplitButton'
          : part === 'context-menu'
            ? 'ContextMenu'
            : 'SplitButton · ContextMenu'
      }}
    </component>
    <div v-if="part" class="starter-settings starter-demo-settings">
      <SSwitch
        :id="previewId('advanced-disabled')"
        v-model="disabled"
        label="예제 비활성"
      /><SSwitch :id="previewId('advanced-readonly')" v-model="readonly" label="예제 읽기 전용" />
    </div>
    <p class="starter-hint">
      주 동작과 다른 동작을 분리합니다. 실제 파일을 만들거나 자료를 변경하지 않습니다.
    </p>
    <SSplitBtn
      v-if="show('split-button')"
      :id="previewId('advanced-split-button')"
      label="가상 내보내기"
      :items="actions"
      :disabled="disabled"
      :readonly="readonly"
      @primary="
        primaryCount++;
        action = '✓ 주 동작 ' + primaryCount + '회 · 실제 전송이나 다운로드는 없습니다.';
      "
      @select="chosenAction"
    />
    <SContextMenu
      v-if="show('context-menu')"
      :id="previewId('advanced-context')"
      v-model:open="menuOpen"
      label="가상 정원 기록"
      trigger-label="기록 동작 열기"
      :items="contextItems"
      :disabled="disabled"
      :readonly="readonly"
      @select="chosenAction"
      ><p><strong>작은 정원 기록</strong></p>
      <p>
        이 영역에서 우클릭하거나 초점을 두고 Shift+F10을 누르세요. 터치에서도 아래 버튼을 사용할 수
        있어요.
      </p></SContextMenu
    >
    <p class="starter-result" role="status">{{ action }}</p>
  </section>
  <section
    v-if="show('split-pane')"
    class="starter-card"
    :aria-labelledby="previewId('advanced-pane-title')"
  >
    <component :is="headingTag" :id="previewId('advanced-pane-title')"
      >ResizableSplitPane</component
    >
    <div v-if="part" class="starter-settings starter-demo-settings">
      <SSwitch
        :id="previewId('advanced-disabled')"
        v-model="disabled"
        label="예제 비활성"
      /><SSwitch :id="previewId('advanced-readonly')" v-model="readonly" label="예제 읽기 전용" />
    </div>
    <SSelect
      :id="previewId('advanced-pane-direction')"
      v-model="direction"
      required
      label="개발 설정 · 분할 방향"
      :options="[
        { value: 'horizontal', label: '좌우 두 영역' },
        { value: 'vertical', label: '위아래 두 영역' },
      ]"
    />
    <SResizableSplitPane
      :id="previewId('advanced-pane')"
      v-model="ratio"
      label="가상 목록과 메모"
      primary-label="가상 목록"
      secondary-label="가상 메모"
      :orientation="direction"
      :min="25"
      :max="75"
      :step="5"
      :disabled="disabled"
      :readonly="readonly"
      @reflow="stacked = $event"
      @change="resized = '조절 완료: ' + $event + '%'"
    >
      <template #primary
        ><p>계절 관찰<br />작은 정원<br />저녁 책장</p>
        <p class="starter-hint">
          중앙 구분선을 드래그하거나 초점을 두고 방향키로 조절합니다.
        </p></template
      >
      <template #secondary
        ><STextarea
          :id="previewId('advanced-pane-memo')"
          v-model="memo"
          label="유지되는 가상 메모"
          :disabled="disabled"
          :readonly="readonly"
      /></template>
    </SResizableSplitPane>
    <p class="starter-hint" role="status">
      저장 비율 {{ ratio }}% · {{ stacked ? '좁은 폭: 위아래 높이 조절' : '크기 조절 가능' }} ·
      {{ resized }}
    </p>
  </section>
  <section
    v-if="show('sortable')"
    class="starter-card"
    :aria-labelledby="previewId('advanced-sortable-title')"
  >
    <component :is="headingTag" :id="previewId('advanced-sortable-title')"
      >정렬 목록 · SSortableList</component
    >
    <p class="starter-hint">
      손잡이를 드래그하거나 키보드와 위·아래 이동 버튼으로 순서를 제안합니다. 원본 객체는
      유지합니다.
    </p>
    <div class="starter-settings">
      <SCheckbox
        :id="previewId('advanced-sort-accept')"
        v-model="acceptOrder"
        label="새 순서 반영"
      />
      <SCheckbox
        :id="previewId('advanced-sort-lock')"
        v-model="lockSecond"
        label="두 번째 항목 자체의 이동 막기"
      />
      <SSwitch
        v-if="part"
        :id="previewId('advanced-sort-disabled')"
        v-model="disabled"
        label="정렬 비활성"
      />
      <SSwitch
        v-if="part"
        :id="previewId('advanced-sort-readonly')"
        v-model="readonly"
        label="정렬 보기 전용"
      />
      <SBtn @click="sortableItems = [...sortableItems].reverse()">외부 목록 변경 시연</SBtn>
    </div>
    <SSortableList
      :id="previewId('advanced-sortable')"
      label="가상 항목 순서"
      :model-value="sortableItems"
      :item-key="item => item.id"
      :item-label="item => item.label"
      :is-item-disabled="item => lockSecond && item.id === 'b'"
      :disabled="disabled"
      :readonly="readonly"
      @update:model-value="acceptProposal"
      @end="reorderEnd"
    >
      <template #item="{ item, index, active }">
        <strong>{{ index + 1 }}. {{ item.label }}</strong>
        <p>{{ item.details.count.toFixed(0) }}개 · {{ active ? '이동 위치 선택 중' : '대기' }}</p>
        <SBtn
          variant="inline"
          :disabled="disabled"
          @click="sortStatus = item.label + ' 본문 버튼 확인'"
          >본문 동작</SBtn
        >
      </template>
    </SSortableList>
    <p role="status">{{ sortStatus }}</p>
    <p class="starter-hint">확정 순서: {{ sortableItems.map(item => item.id).join(' → ') }}</p>
  </section>
  <section
    v-if="show('month-calendar')"
    class="starter-card"
    :aria-labelledby="previewId('advanced-month-title')"
  >
    <component :is="headingTag" :id="previewId('advanced-month-title')"
      >월간 달력 · SMonthCalendar</component
    >
    <p class="starter-hint">
      월과 날짜는 부모가 반영할 때 바뀝니다. 오늘 이동과 키보드 탐색은 선택을 자동 저장하지
      않습니다. 날짜별 자료가 늦게 와도 선택은 남습니다.
    </p>
    <div class="starter-settings">
      <SCheckbox
        :id="previewId('advanced-month-accept')"
        v-model="calendarAcceptMonth"
        label="표시 월 제안 반영"
      />
      <SCheckbox
        :id="previewId('advanced-month-accept-date')"
        v-model="calendarAcceptDate"
        label="선택 날짜 제안 반영"
      />
      <SCheckbox
        :id="previewId('advanced-month-monday')"
        v-model="calendarMonday"
        label="월요일 시작"
      />
      <SCheckbox
        :id="previewId('advanced-month-loading')"
        v-model="calendarLoading"
        label="자료 loading"
      />
      <SCheckbox
        :id="previewId('advanced-month-empty')"
        v-model="calendarEmpty"
        label="날짜별 자료 없음"
      />
      <SCheckbox
        :id="previewId('advanced-month-blocked')"
        v-model="calendarBlocked"
        label="10일 선택 막기"
      />
      <SSwitch
        v-if="part"
        :id="previewId('advanced-month-disabled')"
        v-model="disabled"
        label="달력 비활성"
      />
      <SSwitch
        v-if="part"
        :id="previewId('advanced-month-readonly')"
        v-model="readonly"
        label="달력 보기 전용"
      />
    </div>
    <SMonthCalendar
      :id="previewId('advanced-month')"
      label="범용 날짜 상태"
      :month="calendarMonth"
      :model-value="calendarDate"
      today="2026-10-28"
      :first-day="calendarMonday ? 1 : 0"
      :markers="calendarEmpty ? {} : calendarMarkers"
      :is-date-disabled="date => calendarBlocked && date.endsWith('-10')"
      :loading="calendarLoading"
      :disabled="disabled"
      :readonly="readonly"
      @update:month="next => { if (calendarAcceptMonth) calendarMonth = next }"
      @update:model-value="next => { if (calendarAcceptDate) calendarDate = next }"
    >
    </SMonthCalendar>
    <p class="starter-hint">
      항목이나 +N이 있는 날짜를 누르면 아래 상세 목록에서 전체 내용을 읽습니다. 키보드는 날짜를
      선택한 뒤 Tab으로 목록을 읽고 Escape로 달력에 돌아옵니다.
    </p>
    <p :id="previewId('advanced-month-result')" class="starter-hint">
      표시 월: {{ calendarMonth }} · 선택 ISO: {{ calendarDate }}
    </p>
  </section>
  <section
    v-if="show('time-grid')"
    class="starter-card"
    :aria-labelledby="previewId('advanced-time-grid-title')"
  >
    <component :is="headingTag" :id="previewId('advanced-time-grid-title')"
      >시간 그리드 · 변경 제안</component
    >
    <p class="starter-hint">
      카드 본문을 드래그해 이동하고 위·아래 가장자리로 시간을 조절합니다. 빈 칸을 누르거나 오른쪽 위
      추가 버튼으로 항목을 만들 수 있습니다. 반영 체크를 끄면 생성·삭제·이동 요청을 보여주되 원본은
      유지합니다. 새 key·충돌·저장은 소비 앱에서 소유합니다.
    </p>
    <div class="starter-settings">
      <SCheckbox
        :id="previewId('advanced-time-grid-empty')"
        v-model="gridEmpty"
        label="빈 항목"
      /><SCheckbox
        :id="previewId('advanced-time-grid-loading')"
        v-model="gridLoading"
        label="불러오는 중"
      />
    </div>
    <div class="starter-settings">
      <SCheckbox
        :id="previewId('advanced-time-grid-edit')"
        v-model="gridEditable"
        label="편집 켜기 · 끄면 보기 전용"
      />
      <SCheckbox
        :id="previewId('advanced-time-grid-disabled')"
        v-model="gridDisabled"
        label="편집 잠금 · 추가·드래그·삭제 방지"
      />
      <SCheckbox
        :id="previewId('advanced-time-grid-lock')"
        v-model="gridLockedFirst"
        label="첫 항목만 잠금 · 항목별 권한 예제"
      />
      <SCheckbox
        :id="previewId('advanced-time-grid-pending')"
        v-model="gridPendingFirst"
        label="첫 항목 반영 대기"
      />
      <SCheckbox
        :id="previewId('advanced-time-grid-accept')"
        v-model="gridAccept"
        label="요청을 실제 항목에 반영 · 끄면 원본 유지"
      />
      <SBtn :id="previewId('advanced-time-grid-reset')" @click="resetGrid">원본으로 외부 갱신</SBtn>
    </div>
    <STimeGrid
      :id="previewId('advanced-time-grid')"
      label="범용 시간 항목"
      :items="gridEmpty ? [] : gridItems"
      :columns="gridColumns"
      :bands="gridBands"
      :item-key="item=>item.id"
      :item-label="item=>item.title"
      :item-column="item=>item.column"
      :item-start="item=>item.start"
      :item-end="item=>item.end"
      :start-minute="480"
      :end-minute="1080"
      :loading="gridLoading"
      :readonly="!gridEditable"
      :disabled="gridDisabled"
      allow-resize
      allow-duplicate
      allow-create
      allow-remove
      show-current-time
      @create="createGrid"
      @remove="removeGrid"
      :snap-minutes="15"
      :pending-keys="gridPendingFirst ? ['a'] : []"
      :is-item-disabled="item=>gridLockedFirst && item.id==='a'"
      @preview="gridPreview=$event"
      @commit="acceptGridProposal"
      @cancel="cancelGrid"
      help="카드 드래그: 이동 · 위/아래 가장자리: 시간 조절 · 항목 Space: 키보드 편집 시작 · Enter: 변경 확정 · Escape: 취소 · Delete: 삭제 요청. 아래 목록에서도 이동·조절·복제·삭제할 수 있습니다. 빨간 현재 시각선은 표시 중인 날짜와 08~18시 범위에서 분마다 갱신됩니다."
    />
    <p :id="previewId('advanced-time-grid-result')" class="starter-hint" role="status">
      {{gridPreview ? '미리보기 · '+gridPreview.to.columnKey+' · '+gridPreview.to.startMinute+'–'+gridPreview.to.endMinute : gridResult}}
    </p>
  </section>
</template>

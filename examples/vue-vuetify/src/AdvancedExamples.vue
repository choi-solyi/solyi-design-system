<script setup>
const props = defineProps({ part: { type: String, default: '' } })
const supportedParts = [
  'segmented',
  'multiselect',
  'range',
  'split-button',
  'context-menu',
  'split-pane',
  'sortable',
  'month-calendar',
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
    Object.freeze({ id: 'a', label: '첫 번째 범용 상태', tone: 'info', icon: 'copy' }),
    Object.freeze({
      id: 'b',
      label: '길게 입력한 두 번째 상태도 넘치지 않게 표시합니다',
      tone: 'warning',
    }),
    Object.freeze({ id: 'c', label: '세 번째 상태는 추가 개수로 안내합니다' }),
  ]),
})
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
  <section v-if="show('segmented')" class="starter-card" aria-labelledby="advanced-title">
    <h2 id="advanced-title">설정 하나 선택 · SSegmentedControl</h2>
    <p class="starter-hint">
      선택·범위·메뉴·분할 부품을 설치한 solyi-ui에서 가져옵니다. 아래 설정은 이 예제들에만
      적용됩니다. 모든 데이터와 작업은 가상입니다.
    </p>
    <div class="starter-settings starter-demo-settings">
      <SSwitch id="advanced-disabled" v-model="disabled" label="확장 예시 비활성" /><SSwitch
        id="advanced-readonly"
        v-model="readonly"
        label="확장 예시 읽기 전용"
      />
    </div>
    <SSegmentedControl
      id="advanced-segment"
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
  <section v-if="show('multiselect')" class="starter-card" aria-labelledby="advanced-multi-title">
    <h2 id="advanced-multi-title">검색 가능한 MultiSelect</h2>
    <div v-if="part" class="starter-settings starter-demo-settings">
      <SSwitch id="advanced-disabled" v-model="disabled" label="예제 비활성" /><SSwitch
        id="advanced-readonly"
        v-model="readonly"
        label="예제 읽기 전용"
      />
    </div>
    <SSelect
      id="advanced-multi-scenario"
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
      id="advanced-multi"
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
  <section v-if="show('range')" class="starter-card" aria-labelledby="advanced-range-title">
    <h2 id="advanced-range-title">양끝 RangeSlider</h2>
    <div v-if="part" class="starter-settings starter-demo-settings">
      <SSwitch id="advanced-disabled" v-model="disabled" label="예제 비활성" /><SSwitch
        id="advanced-readonly"
        v-model="readonly"
        label="예제 읽기 전용"
      />
    </div>
    <SRangeSlider
      id="advanced-range"
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
        id="advanced-lower"
        required
        v-model="range[0]"
        label="하한 직접 입력"
        :min="0"
        :max="range[1]"
        :step="5"
        :disabled="disabled"
        :readonly="readonly"
      /><SNumberInput
        id="advanced-upper"
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
    aria-labelledby="advanced-actions-title"
  >
    <h2 id="advanced-actions-title">
      {{
        part === 'split-button'
          ? 'SplitButton'
          : part === 'context-menu'
            ? 'ContextMenu'
            : 'SplitButton · ContextMenu'
      }}
    </h2>
    <div v-if="part" class="starter-settings starter-demo-settings">
      <SSwitch id="advanced-disabled" v-model="disabled" label="예제 비활성" /><SSwitch
        id="advanced-readonly"
        v-model="readonly"
        label="예제 읽기 전용"
      />
    </div>
    <p class="starter-hint">
      주 동작과 다른 동작을 분리합니다. 실제 파일을 만들거나 자료를 변경하지 않습니다.
    </p>
    <SSplitBtn
      v-if="show('split-button')"
      id="advanced-split-button"
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
      id="advanced-context"
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
  <section v-if="show('split-pane')" class="starter-card" aria-labelledby="advanced-pane-title">
    <h2 id="advanced-pane-title">ResizableSplitPane</h2>
    <div v-if="part" class="starter-settings starter-demo-settings">
      <SSwitch id="advanced-disabled" v-model="disabled" label="예제 비활성" /><SSwitch
        id="advanced-readonly"
        v-model="readonly"
        label="예제 읽기 전용"
      />
    </div>
    <SSelect
      id="advanced-pane-direction"
      v-model="direction"
      required
      label="개발 설정 · 분할 방향"
      :options="[
        { value: 'horizontal', label: '좌우 두 영역' },
        { value: 'vertical', label: '위아래 두 영역' },
      ]"
    />
    <SResizableSplitPane
      id="advanced-pane"
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
          id="advanced-pane-memo"
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
  <section v-if="show('sortable')" class="starter-card" aria-labelledby="advanced-sortable-title">
    <h2 id="advanced-sortable-title">정렬 목록 · SSortableList</h2>
    <p class="starter-hint">
      손잡이를 드래그하거나 키보드와 위·아래 이동 버튼으로 순서를 제안합니다. 원본 객체는
      유지합니다.
    </p>
    <div class="starter-settings">
      <SCheckbox id="advanced-sort-accept" v-model="acceptOrder" label="새 순서 반영" />
      <SCheckbox
        id="advanced-sort-lock"
        v-model="lockSecond"
        label="두 번째 항목 자체의 이동 막기"
      />
      <SSwitch v-if="part" id="advanced-sort-disabled" v-model="disabled" label="정렬 비활성" />
      <SSwitch v-if="part" id="advanced-sort-readonly" v-model="readonly" label="정렬 보기 전용" />
      <SBtn @click="sortableItems = [...sortableItems].reverse()">외부 목록 변경 시연</SBtn>
    </div>
    <SSortableList
      id="advanced-sortable"
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
    aria-labelledby="advanced-month-title"
  >
    <h2 id="advanced-month-title">월간 달력 · SMonthCalendar</h2>
    <p class="starter-hint">
      월과 날짜는 부모가 반영할 때 바뀝니다. 오늘 이동과 키보드 탐색은 선택을 자동 저장하지
      않습니다. 날짜별 자료가 늦게 와도 선택은 남습니다.
    </p>
    <div class="starter-settings">
      <SCheckbox
        id="advanced-month-accept"
        v-model="calendarAcceptMonth"
        label="표시 월 제안 반영"
      />
      <SCheckbox
        id="advanced-month-accept-date"
        v-model="calendarAcceptDate"
        label="선택 날짜 제안 반영"
      />
      <SCheckbox id="advanced-month-monday" v-model="calendarMonday" label="월요일 시작" />
      <SCheckbox id="advanced-month-loading" v-model="calendarLoading" label="자료 loading" />
      <SCheckbox id="advanced-month-empty" v-model="calendarEmpty" label="날짜별 자료 없음" />
      <SCheckbox id="advanced-month-blocked" v-model="calendarBlocked" label="10일 선택 막기" />
      <SSwitch v-if="part" id="advanced-month-disabled" v-model="disabled" label="달력 비활성" />
      <SSwitch v-if="part" id="advanced-month-readonly" v-model="readonly" label="달력 보기 전용" />
    </div>
    <SMonthCalendar
      id="advanced-month"
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
      <template #cell="{ date, disabled: unavailable }">
        <small
          v-if="date.endsWith('-28')"
          :aria-label="unavailable ? '선택 불가 추가 정보' : '추가 정보'"
          >ⓘ</small
        >
      </template>
    </SMonthCalendar>
    <p id="advanced-month-result" class="starter-hint">
      표시 월: {{ calendarMonth }} · 선택 ISO: {{ calendarDate }}
    </p>
  </section>
</template>

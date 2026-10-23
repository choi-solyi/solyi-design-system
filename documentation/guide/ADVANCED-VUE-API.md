# 선택·행동·분할 레이아웃 API

선택·범위·메뉴·분할의 재사용 API입니다. [전역 등록과 타입 설정](DEDICATED-VUE-API.md)을 앱에서 한 번 적용합니다. 같은 solyi-ui 토큰·스타일과 테마 설정을 사용합니다.

## 공통 계약

- 입력은 고유한 `id`, 보이는 `label`, `help/error`, `disabled/readonly/locale`를 받습니다. 값은 `modelValue`와 `update:modelValue`로 제어하고 props를 직접 수정하지 않습니다. 비활성은 탐색/변경을 막고, 읽기 전용은 읽기·초점은 유지하며 변경을 막습니다.
- 값의 저장·폼 제출·비즈니스 검증은 소비 앱의 역할입니다. `name` 직렬화가 필요한 앱은 v-model 값으로 제출 자료를 만드세요. 오류는 본문에도 표시하며 색만으로 설명하지 않습니다.
- `SolOption`의 value와 메뉴 item id는 각각 그룹 안에서 고유한 비어 있지 않은 문자열이어야 합니다. 옵션 라벨은 텍스트이며, 옵션 안에 다른 버튼/링크를 넣지 않습니다.
- 새로 쓰는 내장 문구도 기존 ko/en locale와 앱/부품별 override를 사용합니다. 전체 문서 번역·완전한 RTL 지원을 주장하지 않습니다. 모든 부품은 같은 색·간격·반경 토큰을 사용합니다.

| Export | 값 / 이벤트 | 주요 설정과 용도 |
|---|---|---|
| SSegmentedControl | string 또는 null, change(string) | options, name. 서로 배타적인 짧은 설정; 별도 콘텐츠 패널을 여는 Tabs와 구분 |
| SMultiSelect | readonly string[], change(string[]), search(query), open/close, invalid(message) | options 또는 loadOptions, maxSelected, placeholder, debounce(기본150ms), required. 검색+여러 항목 선택 |
| SRangeSlider | readonly [number,number], change([lower,upper]) | min0/max100/step1, lowerLabel/upperLabel, formatValue. 두 끝 사이 구간 |
| SSplitBtn | primary(MouseEvent), select(itemId), update:open/open/close(reason) | items, menuLabel. 주 동작 하나와 대안 동작 목록 |
| SContextMenu | select(itemId), update:open/open/close(reason) | items, triggerLabel, default slot. 대상에 대한 동작과 항상 보이는 터치 대안 |
| SResizableSplitPane | number(%), change(number), reflow(boolean) | primaryLabel/secondaryLabel, min20/max80/step1, orientation, collapseBelow560. primary/secondary slots |

SplitButton/ContextMenu의 `open`은 선택적 제어 prop입니다. 생략하면 내부 열림 상태를 쓰고, 앱이 제어하려면 `v-model:open`을 연결합니다. 데이터 값이 없는 동작에 가짜 modelValue를 요구하지 않습니다. 메뉴는 평면 목록이며 서브메뉴·체크 메뉴는 이번 API에 없습니다.

```ts
import type { SolOption } from 'solyi-ui'

// Public type shapes; import these names from solyi-ui in an app.
type SolRangeValue = readonly [number, number]
type SolOptionLoader = (query: string, signal: AbortSignal) => Promise<readonly SolOption[]>
interface SolMenuItem {
  id: string
  label: string
  disabled?: boolean
  danger?: boolean
}
type SolMenuCloseReason = 'escape' | 'outside' | 'tab' | 'select' | 'disabled' | 'programmatic'
// MultiSelect handle: focus(), validate():boolean, clear().
```

## 사용 예시

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  SSegmentedControl,
  SMultiSelect,
  SRangeSlider,
  SSplitBtn,
  SContextMenu,
  SResizableSplitPane,
} from 'solyi-ui'
import type { SolRangeValue, SolMenuItem } from 'solyi-ui'

const view = ref<string | null>('brief'),
  tags = ref<string[]>([])
const range = ref<SolRangeValue>([20, 80]),
  ratio = ref(40),
  result = ref('')
const options = [
  { value: 'brief', label: '간단히' },
  { value: 'full', label: '자세히' },
]
const actions: SolMenuItem[] = [{ id: 'copy', label: '복제 · 가상' }]
</script>
<template>
  <SSegmentedControl id="view" v-model="view" label="표시 설정" :options="options" />
  <SMultiSelect id="tags" v-model="tags" label="분류" :options="options" :max-selected="3" />
  <SRangeSlider id="range" v-model="range" label="가상 점수" :min="0" :max="100" :step="5" />
  <SSplitBtn
    id="export"
    label="가상 내보내기"
    :items="actions"
    @primary="result = '주 동작'"
    @select="result = $event"
  />
  <SContextMenu id="record" label="가상 기록" :items="actions" @select="result = $event">
    <p>가상 기록 내용</p>
  </SContextMenu>
  <SResizableSplitPane
    id="layout"
    v-model="ratio"
    label="자료와 메모"
    primary-label="자료"
    secondary-label="메모"
    :min="25"
    :max="75"
  >
    <template #primary><p>가상 자료</p></template>
    <template #secondary><p>가상 메모</p></template>
  </SResizableSplitPane>
  <p role="status">{{ result }}</p>
</template>
```

## 상태·키보드·작은 화면

**SegmentedControl**은 native radio를 사용합니다. Tab 한 곳으로 진입하고 방향키/Home/End는 비활성을 건너뛰며 선택합니다. null은 미선택이며 첫 활성 옵션이 진입점입니다. 읽기 전용 탐색은 선택값을 바꾸지 않습니다. 짧은 라벨을 사용하고 좁은 폭에서는 줄을 나눕니다.

**MultiSelect**는 입력에 초점을 유지하는 다중 listbox combobox입니다. 방향키로 활성 옵션, Enter로 선택/해제, Escape로 목록 닫기, 빈 입력의 Backspace로 마지막 태그 제거를 지원합니다. Home/End는 텍스트 커서 동작을 보존합니다. 태그 제거와 오류 재시도 버튼은 Tab으로 접근합니다. 최대 선택에 도달해도 기존 항목 해제는 가능하며, 제한 오류는 본문에 표시합니다. 선택값과 태그는 검색을 바꾸어도 유지하고, 현재 목록에 없는 값은 마지막으로 본 라벨 또는 원래 ID로 표시합니다.

`loadOptions`를 제공하면 컴포넌트가 query와 AbortSignal을 전달합니다. 새 검색·닫기·unmount에서 이전 요청을 중단하고, 중단을 무시하는 공급자의 늦은 응답도 revision으로 무시합니다. IME 조합 중 검색 요청이나 Enter 선택을 하지 않습니다. loading/결과 없음/오류/재시도는 구분됩니다. 이 라이브러리는 주소를 만들거나 직접 fetch하지 않습니다. 인증·요청·결과 검증은 공급자 함수의 책임입니다. 실제 starter는 브라우저 타이머만 쓰는 가상 지연/실패입니다. `validate()`는 required와 외부 error를 확인하며, 검색 문자열이 선택값인 것처럼 제출하지 않습니다.

**RangeSlider**는 한 트랙과 두 고정 순서 핸들입니다. lower는 upper까지만, upper는 lower까지만 이동합니다. 같은 값도 허용하고 값을 교환하지 않습니다. 각 핸들에 label/now/dependent min/max가 있습니다. 방향키 한 step, Shift·PageUp/Down 열 step, Home/End 현재 허용 경계입니다. step은 min에서 시작하며 마지막 유효 격자값까지만 선택합니다. update는 조절 중, change는 키/트랙 선택 또는 포인터 조절 종료에 나옵니다. 포인터 취소는 마지막 유효 값을 유지합니다. 비정상 외부 값은 화면에서만 정렬·격자/범위 보정하며 사용자 조작 전에는 자동 emit하지 않습니다. 정상 앱은 처음부터 유효한 튜플을 전달해야 합니다. 트랙 클릭과 예제의 숫자 입력은 드래그 대안이며, 겹친 핸들도 Tab 순서는 lower→upper입니다. 터치 화면낭독기의 슬라이더 제스처는 실기기에서 별도로 확인하세요.

**두 메뉴**는 Down/Up·Home/End·문자 탐색과 native Enter/Space를 사용합니다. 비활성 동작은 실행하지 않습니다. Escape·선택은 실행 위치로 돌아오되 소비 앱이 새 Dialog 등으로 옮긴 초점은 빼앗지 않습니다. Tab은 닫으며 문서 탐색을 계속하고, 외부 클릭/초점은 목적지를 보존합니다. 메뉴는 DOM 순서를 유지하고 지원 브라우저에서는 native popover top layer로 올립니다. 지원하지 않는 브라우저의 fixed fallback은 변형/클리핑 조상 컨테이너에서 별도 검증이 필요합니다. ContextMenu는 우클릭·Shift+F10·ContextMenu 키·보이는 버튼을 지원하며, 입력칸/textarea/contenteditable의 기본 편집 메뉴를 가로채지 않습니다.

**SplitPane**의 값은 핸들 너비를 제외한 두 영역 중 primary의 백분율입니다. 포인터 캡처로 조절하고 키보드 방향키/Shift/Home/End/Enter(최소↔직전 크기)도 같은 경계를 씁니다. update는 조절 중, change는 완료 때 발생합니다. orientation은 horizontal=좌우/세로 separator, vertical=위아래/가로 separator입니다. 기본 높이320px은 `--sol-split-height`로 조정할 수 있습니다. collapseBelow보다 컨테이너가 좁으면 두 슬롯과 저장 비율을 유지한 채 위아래로 배치하며, separator로 높이 비율을 계속 조절할 수 있습니다. 이때 separator는 수평이며 위/아래 화살표를 사용합니다. 터치 핸들 바깥의 영역은 스크롤할 수 있고, 드래그 취소나 축 전환 시 포인터 캡처를 해제합니다. 취소 전 update는 유지하지만 완료 change는 발생하지 않습니다. 0/100%를 허용하는 설정은 접힌 영역을 inert 처리합니다. 자식 입력의 disabled/readonly는 소비 앱이 별도로 전달합니다.

## 검증 근거와 한계

WAI APG의 [multi-thumb slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/), [메뉴](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/), [splitter](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/), [combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)를 참고했습니다. 다중 선택은 단일 값 combobox 예제를 그대로 준수한다고 주장하는 대신 위 계약을 명시합니다. 자동 DOM 검사는 실제 렌더/포인터 캡처/화면낭독기 검증과 다릅니다. 실제 실행 범위와 남은 한계는 QA.md 및 릴리스 보고를 따릅니다.

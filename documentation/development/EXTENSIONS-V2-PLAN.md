범주 팔레트 1차: Core 역할 토큰 8색 × 3테마 × light/dark와 순수 resolveCategoricalColor(key,{theme,mode})를 추가했습니다. 고정된 8개 bucket/ID는 확장 시 재배열하지 않는 계약이며 문자열/유한 숫자 key만 받습니다. 48개 조합의 텍스트 대비 최저 6.377:1, 내부 border/background 대비 최저 3.323:1을 확인했습니다. 테마·모드 간 category ID 일치, 잘못된 key 거부, Core/UI 빌드와 실제 빌드된 Core resolver 호출을 통과했습니다. Calendar marker.category를 opt-in으로 연결했고 기존 tone이 있으면 tone을 우선합니다. 모바일은 기존 날짜 셀 개수 표시를 유지하고 선택 날짜 상세에서 범주 이름·색을 표시합니다. README·Components 정본 API·starter color-examples/월 달력 예제를 동기화했으며 light/dark 모바일 실렌더와 key 입력/날짜 선택, 변경 예제 타입·Core/UI 빌드를 확인했습니다. 최종 설치본/통합 검증은 남습니다.

# 확장 요청 2 · 실제 저장소 대조 및 구현 계획

Loading 후속: SLoadingOverlay를 공개 타입/등록, Components/API와 starter progress에 연결했습니다. 기본 container/blocking, delay=150ms/minVisibleMs=200ms이며 visibleChange만 알리고 작업 모델을 쓰지 않습니다. container는 자기 내용만 inert로 잠그고 페이지 trap/scroll lock은 없습니다. viewport blocking은 PickerHost의 stack/native bridge/focus/scroll lock을 재사용하고 dismissible=false로 Escape를 뒤 dialog로 흘리지 않습니다. nonblocking은 포커스/스크롤 잠금 없이 표시합니다. hideContent는 크기를 유지하며 접근성 트리·키보드에서도 숨기고 숨겨진 초점만 안전하게 옮깁니다. 타이머 전이와 48종 공개 회귀·변경 5개 예제 타입/빌드, 실제 Chrome container/viewport 포커스 복귀·Escape·nonblocking 조작·native dialog bridge를 확인했습니다. 실화면에서 backdrop 누락과 사각 차폐를 발견해 기존 토큰/모서리로 보완했습니다. 최종 설치본과 테마 통합은 후보 동결 전 단계로 남습니다.

표시 후속: SEmptyState(title/description/icon, card/page, headingLevel/minBlockSize와 description/icon/actions 슬롯)를 추가했습니다. SCard에 leading/title/description/meta 슬롯과 description을 확장하며 기존 default/actions를 유지합니다. 카드 전체를 버튼으로 감싸는 primaryAction은 추가하지 않고 제목 슬롯의 native 링크와 보조 버튼을 독립 배치합니다. 비대화형 EmptyState에는 loading/readonly/validate를 추가하지 않습니다. 360px 실렌더에서 빈 상태 추가·초기화 포커스와 카드 링크/버튼을 확인했고 인접 카드 간격은 기존 sol-stack으로 보완했습니다. 패키지 빌드와 저장소 기존 옵션(strictTemplates, checkUnknownProps:false, skipLibCheck:true)의 변경된 4개 정본 예제 타입 검사가 통과했습니다. 설치본/테마 통합 검사는 최종 후보에서 수행합니다.

Dialog 후속: feedback/actions-start와 busyScope body/all을 연결했습니다. 외부 busy 기본 false, 본문 inert는 폼 값을 제거하지 않습니다. body는 닫기 허용, all은 내부 feedback·actions·닫기·Escape·바깥 클릭 잠금이며 부모 modelValue 제어는 유지합니다. 작업 시작 시 잠긴 포커스를 안전한 영역으로 옮기고 종료 시 사용자가 옮기지 않은 경우만 복원합니다. 기존 고정 헤더/액션과 본문 스크롤이 기본이므로 중복 scrollable/sticky 옵션은 추가하지 않았습니다. 모바일 실렌더와 전체 잠금 Escape·포커스 복원/본문 잠금 닫기 조작을 확인했습니다.

후속 상태: Date/Time 공개 opt-in과 Dialog 고정 헤더·본문 스크롤·설명 간격·Switch hideLabel을 완료했습니다. SConfirmAction은 SBtn 재사용, 공개 타입/등록, Components와 starter buttons 예제까지 연결했습니다. 빌드·46종 API 회귀·확인 상태 전이·실제 Chrome 360px Enter/Escape/확정 조작을 통과했습니다. timeout=0은 자동 취소 없음, 기본 blur 취소, 외부 loading/error/reset 계약입니다. 설치본 최종 검증과 확대된 공개 API의 크기 기준 재측정은 전체 후보에서 수행합니다. 1.1.0은 미게시이며 정식 artifact 동결/전체 delivery 검증은 아직입니다.

구현 진행: 공통 입력 1단계 8종은 [단계별 기록](INPUT-CLEAR-VALIDATION.md), 2단계 SCombobox c4f3011의 최종 tarball 설치 소비 결과는 [Combobox 검증](COMBOBOX-VALIDATION.md)에 정리했습니다. 아래 표와 확인 기준은 승인 당시의 baseline이며 현재 source는 SCombobox를 포함한 45종입니다. 다음은 기존 표시 4종 재사용 점검과 [Picker host 착수 준비](PICKER-PRESENTATION-NEXT.md)입니다. 출시 게이트와 공개 미배포 상태는 유지합니다.

추가 실기기 요청은 [Dialog 고정 header·설명 간격·Switch 라벨 범위](DIALOG-FEEDBACK-NEXT.md)에 기록했습니다. 게이트를 변경하지 않은 [출시 진단과 승인 대상 제안](RELEASE-GATE-DIAGNOSIS.md)을 별도로 따릅니다.

최신 요청서 `붙여넣은 텍스트(2).txt`(Library libfile_6725ea0d3174819196e22055c4e03d86)를 공식 read로 1–230, 231–460, 461–665줄까지 모두 읽었습니다. 이미지 helper·다운로드 우회는 사용하지 않았습니다. 이 문서는 **계획 검토용**이며 아래 새 API는 구현됐다는 뜻이 아닙니다.

## 승인 당시 확인 기준과 상태

- 원본은 choi-solyi/solyi-design-system, 작업 branch는 feat/month-calendar입니다. 최신 기존 구현 보존 commit은 **d1451fd**, Sortable 항목별 disabled 보완은 **7714883**입니다. 새 요청 때문에 기존 변경을 버리거나 같은 컴포넌트를 다시 만들지 않습니다.
- packages/vue-ui는 private 1.0.0, 잠금 Vue 3.5.44/Vuetify 4.3.0, TypeScript 6.0.3/Vite 8.3.4입니다. Vue/Vuetify peer 범위는 현재 그대로입니다. 현재 source의 sComponents·전역 타입·Components 색인은 **44종**입니다. 이것은 공개 npm 배포 수를 뜻하지 않습니다.
- 표시 4종, Date/Number/Time 확장, Sortable 기본 기능은 구현됐고 이전 개발 tarball의 설치 검증도 있습니다. Sortable 항목별 disabled와 MonthCalendar는 source·타입·Chrome 검증까지 보완했으며 **이 보완을 포함한 새 tarball 설치 검증은 남아 있습니다**.
- Calendar 모바일 보완은 72조합·source runtime·패키지/문서 빌드를 통과했습니다. 실제 Components iframe의 Calendar 단독 연결 회수, 물리 터치·스크린리더·Safari·RTL은 별도 미검증입니다. [범위와 증거](MONTH-CALENDAR-VALIDATION.md)를 따릅니다.
- SCombobox/SConfirmAction/SLoadingOverlay/SEmptyState/SPagination/STimeGrid/SScheduler는 현재 공개 export에 없습니다. categorical 8색 API/토큰도 없습니다.
- 새 요구의 구현은 시작하지 않았습니다. 기존 Calendar의 작은 단위만 보존했고, 이 계획의 검토 후 범위를 나눕니다.

## 변경 계획 표

`제안 API` 열의 새 이름·기본값은 검토안입니다. 현재 있는 이름은 실제 소스와 생성 API에서 확인했습니다.

| 요청 항목 | 기존 대응 컴포넌트 | 신규·확장 판단 | 제안 API | 하위 호환성 | 구현 난이도 | 권장 단계 |
|---|---|---|---|---|---|---|
| 1. 입력 내부 clear와 공통 구조 | STextField는 VTextField 래퍼, 나머지는 native/개별 구조. 공통은 label/help/검증 props뿐 | 내부 Field Shell·clear adapter를 공통화하고 기존 8종 확장. public 입력 컴포넌트 중복 생성 없음 | opt-in clearable, leading/trailing 및 indicator 영역, clear 알림. 기존 clear()와 같은 값 처리 경로 | 모델별 빈 값·기존 change payload/폼 제출 유지. standalone clear UI는 단계적 deprecated, 기본 변경은 별도 결정 | 높음 | 1 |
| 2. 자유 입력 Combobox | SAutocomplete는 string/null 옵션 값, loader·debounce·IME·retry·clear 존재. custom commit/openOnFocus prop 없음 | **SCombobox 분리 권장**. 내부 검색/비동기 controller 공유 | modelValue:문자열/null, options/loadOptions/debounce, openOnFocus, commitOn, change({value,reason,option?}), clear()·retry() | SAutocomplete의 선택 전용 의미와 scalar change를 유지. custom/select/clear 객체는 새 컴포넌트 계약 | 높음 | 2 |
| 3a. SIcon | 이미 18개 SolIconName, size 16/20/24, decorative/label/rotate | 재구현 없음. inline 정렬·새 입력 rail 회귀, warning path 별도 검토 | 기존 API 유지. warning은 현재 없음; 필요하면 공통 path·타입에 추가 | 기존 이름·크기·currentColor 보존. 존재하지 않는 warning을 예제로 확정하지 않음 | 낮음 | 3 |
| 3b. 아이콘 버튼 | SIconBtn이 SBtn 재사용. label/icon, loading/disabled/tone, tooltip 조합 | 재구현 없음. clear/confirm 등 새 사용처에 재사용 | 기존 SIconBtn API와 정사각형 target 유지 | label 필수, 기존 SBtn 동작·tone 범위 유지. readonly는 의미 없음 | 낮음 | 3 |
| 4. Chip | SChip: display/selectable/removable, update:selected/click/remove, default/leading/trailing | 기존 컴포넌트 사용. 새 select alias는 기본적으로 불필요 | 기존 selected/selectable·update:selected와 tone/variant/size | update:selected가 실제 선택 이벤트임을 문서화. click 의미/이벤트 순서 변경 없음 | 낮음 | 3 |
| 5. Badge | SBadge: content/label/live/placement, icon/default/anchor, semantic tone | 기존 컴포넌트 사용, categorical 색은 별도 정책 검토 | 기존 API; Chip과 비대화형 상태 표시의 차이 유지 | 비대화형 Badge에 loading/readonly를 기계적으로 추가하지 않음 | 낮음 | 3 |
| 6a. Date 표시 | SDatePicker displayFormatter, single/range, DateChange.reason, ISO 모델·제출 분리 구현 | 기존 확장 보존 | 기존 displayFormatter와 clear() | 화면 요일 문자열을 제출값으로 쓰지 않음. range·잘못된 draft 회귀 유지 | 낮음 | 4 검증 |
| 6b. Date 팝업 | 현재 native dialog/showModal. anchored presentation prop 없음 | overlay adapter 기반 확장 | pickerPresentation:auto/popover/dialog, placement:bottom-start 등, clearable | 기본 legacy 동작 유지하는 opt-in minor 권장. modal→nonmodal 기본 변경은 별도 검토 | 높음 | 4 |
| 7a. Time 입력·목록·scrub | min/max/step, allowManualInput, initialScrollValue, scrollToCurrentTime, scrub opt-in 및 preview/commit/cancel 구현 | 기존 기능 보존·공통 clear에 연결 | 기존 API와 reason 없는 scalar change 유지; 새 clear 알림 검토 | min 기준 step, readonly, native form, preview에서 모델을 쓰지 않는 계약 보존 | 중간 | 4 |
| 7b. Time 팝업 | 이미 presentation=native/list. body Teleport·fixed 위치 계산 존재 | 내용 선택 방식과 팝업 방식을 **분리** | 기존 presentation 유지 + pickerPresentation/placement 추가 | presentation에 auto/dialog를 덮어써 기존 native/list를 깨지 않음 | 높음 | 4 |
| 8. 두 번 확인 액션 | SBtn/SIconBtn의 loading/disabled만 존재, 확인 상태 없음 | SBtn을 감싼 **SConfirmAction** 권장 | label/confirmLabel/timeout/cancelOnBlur/loading/disabled/tone, confirm·cancel(reason)·armed-change, reset() 검토 | SBtn click을 2회로 바꾸지 않음. async 결과는 emit 반환값으로 await할 수 없으므로 loading/error/reset 프로토콜 명시 | 중간 | 5 |
| 9a. Dialog 레이아웃 | SDialog: VDialog 기반, dialog/drawer, default/actions. 현재 section 전체 overflow:auto | SDialog 확장 | scrollable/stickyHeader/stickyActions opt-in, feedback/actions-start 슬롯, busy/busyScope 검토 | 기존 actions/default·close 이벤트·update:modelValue 유지. 공개 close() 메서드는 현재 없음. body/action 잠금과 취소 가능 범위 분리 | 높음 | 6 |
| 9b. Overlay 계층 | native dialog/popover, VDialog stack, body Teleport, inline MultiSelect 혼재 | 공통 host/stack/focus/scroll 정책을 내부 기반으로 정리 | parent overlay context, logical layer 역할, top Escape 소유권, portal/위치 adapter | 단순 전역 z-index/overflow 강제 덮어쓰기 금지. legacy native와 직접 V 계열 공존 검증 | 매우 높음 | 4 기반 → 6 통합 |
| 10. Loading Overlay | SProgressLinear/Circular 존재, overlay 없음 | 기존 Progress를 조합한 **SLoadingOverlay** | modelValue, scope:viewport/container, blocking, title/description, kind, delay/minVisibleMs, hideContent | 타이머가 원본 모델을 변경하지 않음. nonblocking은 focus trap/스크롤 잠금 없음. blocking은 종료 복귀 소유권 명확화 | 높음 | 7 |
| 11. Empty State | SAlert/SCard, Table emptyText 등 개별 empty 표현 | **SEmptyState** 표시 컴포넌트 권장 | title/description/icon, actions 슬롯, variant:card/page, minBlockSize 검토 | loading/error와 구별. readonly·validate·clear 없음; 액션 disabled/loading은 슬롯 버튼 책임 | 낮음~중간 | 7 |
| 12. Sortable | controlled generic 목록, pointer/keyboard/button, 취소·자동 스크롤·알림, isItemDisabled 완료 | 재구현 없음. 최신 요청의 **손잡이 시각 affordance만 추가 개선** | modelValue/itemKey/itemLabel/isItemDisabled, item/handle-icon, focus/cancel 유지 | 손잡이는 native button 의미·target·포커스 유지, 시각만 grip 형태로. 절대 index 잠금과 혼동 금지 | 낮음~중간 | 8 |
| 13. Duration/Step | SNumberInput에 min/max/step·±·presets/formatValue/unit/#presets 구현 | 기존 NumberInput 확장 유지. SDurationInput/SStepInput 중복 생성 없음 | 숫자/null 모델 + app의 분 단위 preset/formatter; 공통 clear 추가 | min 기준 decimal step·경계·readonly·직렬화 유지. 자릿수 변화 레이아웃 회귀 | 낮음~중간 | 9 |
| 14. 범주 팔레트 | semantic roles와 테마는 있으나 categorical 8색·resolver 없음 | **Core 토큰+순수 helper 신규**, Vue 컴포넌트는 불필요 | resolveCategoricalColor(key,{theme,mode}) → index/foreground/background/border 검토. category 8색 이상 | semantic tone과 별도 namespace. key→category ID 고정, 모드별 대비색 조정. 확장 시 기존 key 매핑 유지 | 중간~높음 | 10 |
| 15. MonthCalendar | d1451fd에 controlled UI·marker·모바일·44종 등록 완료 | 기존 구현 보존, 새 요구와 대조 후 남은 설치/통합 검증 | 현재 month/modelValue/markers/isDateDisabled/firstDay/today/loading, cell/marker/empty/help, focus() | DatePicker/ISO·선택 보존. 새 categorical 사용은 palette 계약 이후 opt-in 검토 | 중간(검증 잔여) | 11 |
| 16. TimeGrid/Scheduler | TimePicker·MonthCalendar는 있으나 시간표 없음 | **STimeGrid 기반부터**, 상호작용 별도 단계/PR. 거대 업무 Scheduler는 만들지 않음 | generic readonly items·시간 accessor·columns/snapMinutes·band/slots; move/resize/duplicate proposal·preview/commit/cancel | 부모가 충돌·pending·저장 승인. 날짜/분 좌표와 timezone/DST 책임을 먼저 확정, 원본 객체 불변 | 매우 높음 | 12 별도 API 검토 |
| 17. List/Action Card | SCard는 title/eyebrow/headingLevel, default/actions만 존재 | **SCard 슬롯 확장 우선**, 필요 시 의미가 다른 Action wrapper만 별도 | leading/title/description/meta/actions, primary native link/action opt-in, activate 검토 | article/기존 attrs·슬롯 유지. 전체 role=button 안에 내부 button을 중첩하지 않음 | 중간 | 13 |
| 18. 독립 Pagination | SDataTable page/pageCount/update:page, 이전·다음만 존재. SPagination 없음 | 반복 사용 요구에 **SPagination 권장**. Table 순수 계산 재사용, Vuetify 가이드는 비교 대안 | modelValue/pageCount/siblingCount, 처음·끝·이전·다음, disabled/loading, locale | Table API 유지. 비동기 pageCount 변경 시 부모 page를 자동 덮어쓰지 않음. readonly는 추가하지 않음 | 중간 | 14 |

## 공통 clear의 실제 차이

| 대상 | 현재 모델의 빈 값 | 현재 change | 현재 clear() | 적용 시 주의 |
|---|---|---|---|---|
| STextField | 빈 문자열 | 선언 없음(update:modelValue/focus/blur만) | 없음 | VTextField adapter 필요. 새 change 선언이 attrs forwarding을 가로채지 않도록 함 |
| STextarea | 빈 문자열 | string | 없음 | multiline/count/resize·입력 공간 보존 |
| SSelect | null | string/null | 없음 | native select 의미·required·indicator 유지 |
| SNumberInput | null | number/null | 없음 | invalid draft·formatValue·unit·hidden 제출값과 ±/preset 경계 보존 |
| SAutocomplete | null + query 초기화 | string/null | 있음 | 현재 clear는 focus/close 수행. loader 중단·IME와 query만 있는 상태도 처리 |
| SMultiSelect | 빈 배열 | string[] | 있음 | 전체 선택·query·popup·focus 처리 차이의 baseline을 먼저 고정 |
| SDatePicker | null(single/range 모두) | DateChange, reason:clear 존재 | 있음 | range 첫 선택/잘못된 draft도 포함해 값·닫힘·validation 시점 일치 |
| STimePicker | null | string/null | 있음 | scrub 취소·draft/선택·폼 값과 change 계약을 유지 |

값 유무는 committed model만 보지 않습니다. Autocomplete query, 숫자 `-` 같은 미완성 draft, 날짜/시간의 잘못된 입력도 지울 수 있어야 합니다. required라도 clear 후 해당 필드의 검증을 표시하고 초점을 돌려줍니다. 부모의 controlled 갱신 거부, 빈 값에서의 메서드 호출과 이벤트 횟수는 컴포넌트별 기존 계약을 먼저 테스트합니다.

X의 UI 경로와 기존 clear()를 같은 component-specific transaction에 연결합니다. 기존 change payload는 바꾸지 않고 필요한 상세 reason은 새 clear 알림으로 추가합니다. DateChange의 기존 clear reason은 그대로 씁니다. STextField에 존재하지 않는 change를 기존 API처럼 취급하지 않습니다. 기존 standalone text clear는 inline opt-in 사용 시 대체하고 deprecated 문서·전환 기간을 둡니다. minor에서 일괄 제거하거나 소비 프로젝트를 자동 변경하지 않습니다.

내부 Field Shell은 leading / input(minmax 0,1fr) / trailing rail을 논리 방향으로 배치합니다. Vuetify VTextField와 native control의 렌더 adapter는 분리해 기본 입력·검증을 보존합니다. 설치된 VField 타입에는 prepend-inner/append-inner/clear 슬롯이 있어 재사용 후보입니다. clear·열기 버튼은 각각 충분한 target을 확보하고 passive dropdown/loading/status 아이콘의 우선순위를 정합니다. RTL은 padding-inline·start/end placement를 사용하며 native search X 중복·좁은 화면·긴 unit도 검사합니다.

Checkbox/Switch는 boolean 상태, Radio/Segmented는 그룹 선택, Slider/Range는 수치 범위이므로 입력 내부 X를 기계적으로 붙이지 않습니다. optional 선택 해제의 실제 필요가 있으면 독립 계약으로 검토합니다.

## 자유 입력·popup·overlay의 결정점

**Combobox:** 선택 전용 SAutocomplete의 옵션 ID 모델을 자유 문자열로 바꾸지 않습니다. 새 SCombobox는 편집할 표시 문자열을 모델로 삼는 방향을 권장하며, 선택한 ID는 change.option.value로 제공합니다. 이 값 정책은 구현 전 예제로 확정합니다. Enter에서 명시적으로 탐색한 후보만 select, 그 외는 custom으로 확정하고, blur 확정은 opt-in으로 두어 후보 클릭과 이중 commit을 막습니다. 기존 loader(query,signal), debounce·abort/stale 처리·IME 로직을 재사용하되 네트워크·캐시는 구현하지 않습니다.

**Picker:** 현재 Date는 native modal dialog, Time은 body Teleport fixed panel이며 native/list는 내용 방식입니다. pickerPresentation은 이 이름 충돌을 피하기 위한 새 제안입니다. auto는 desktop 연결 팝업·작은 화면 dialog 정책으로 검토하고 placement는 logical start/end를 지원합니다. 기본값이 기존 modal/focus 의미를 바꾸면 minor의 조용한 기본 변경으로 처리하지 않습니다.

**Overlay:** 현재 Core layer는 base 0/sticky 20/floating 60/toast 80/announcement 100입니다. SDialog는 VDialog이고 Vuetify의 VOverlay 기본 zIndex는 2000이며 자체 stack을 씁니다. SSnackbar는 VSnackbar가 아니라 body Teleport + Core toast 레이어입니다. Date의 native top layer는 CSS z-index만 높여 해결할 수 없습니다. 이 차이는 소스 근거로 확인했으며 실제 복합 화면에서의 현재 성공을 주장하지 않습니다.

기존 Vuetify VOverlay의 connected/scroll/attach/stack 기능과 내부 native host adapter를 먼저 spike로 비교합니다. 새 외부 배치 라이브러리를 기본 의존성으로 추가하지 않습니다. 일반 화면 → sticky → 해당 context의 popover → dialog/drawer → 내부 popover → snackbar → blocking loader → announcement 역할을 정의하되, native/Vuetify 혼재의 실제 portal·focus 결과를 보고 숫자를 확정합니다.

가장 위 overlay가 Escape를 소유하고, 닫을 수 없는 blocking overlay는 뒤 dialog로 Escape를 흘리지 않습니다. ConfirmAction의 로컬 확인 취소와 부모 dialog Escape도 구분합니다. focus trap은 최상위 modal 한 곳만 소유하고 자식 popup/toast action의 허용 경로를 정의합니다. scroll lock은 중첩 종료 순서에 관계없이 복원해야 합니다. dialog overflow를 전역 hidden으로 바꾸거나 z-index 하나만 강제해 완료 처리하지 않습니다.

**ConfirmAction:** 첫 클릭은 arm, 둘째는 confirm이며 Escape/timeout/선택적 blur/unmount에서 정리합니다. loading/disabled 변화와 같은 이벤트 루프의 중복 입력을 차단합니다. Vue emit의 비동기 listener 반환값은 await 계약이 아니므로 실패 복구는 외부 loading/error/reset 프로토콜을 명시합니다. 서버 삭제나 업무 권한 판단은 넣지 않습니다.

**LoadingOverlay:** 원본 modelValue와 delay/minimum duration의 내부 visible 상태를 분리합니다. 타이머가 실제 작업 모델을 false로 쓰지 않습니다. container 모드는 소유 wrapper/slot을 우선 검토하고, viewport 모드는 공통 overlay host를 사용합니다. blocking/nonblocking의 aria-busy·focus·스크롤 잠금은 다르게 정의합니다. 닫히며 종료된 다른 dialog나 새 초점 대상의 포커스를 빼앗지 않습니다.

## 상태 적용·검증·예제

| 묶음 | 필요한 상태와 의미 | 독립 완료 증거 |
|---|---|---|
| 입력 8종/Combobox | empty/draft/required/error, disabled/readonly, 내부 async busy. loading으로 임의 모델 초기화 금지 | 모델별 clear 값·기존 이벤트·clear()·FormData·focus·IME·RTL, native/Vuetify adapter 타입·실제 조작 |
| Picker/Overlay/Dialog | 열림/닫힘, 위아래 flip/shift, busy scope, overflow·비동기 응답 | 부모 dialog 내부 각 popup, nested Escape, Snackbar 위 표시/액션, focus trap/복귀, scroll·resize·visual viewport |
| Confirm/Loading | armed/timeout/실패/중복, delay·최소 표시, blocking/nonblocking·reduced motion | 실제 키보드·탭·blur·타이머·unmount·중첩 종료·포커스 소유권 |
| 표시/Empty/Card | 의미 있는 label, 빈 자료와 loading/error 구분. 비대화형에는 readonly/validate 없음 | 긴 텍스트·접근 가능한 이름·내부 액션/카드 액션 분리, 모바일 배치 |
| Sortable/Calendar/TimeGrid | 부모 수락/거부, disabled item, 외부 갱신·취소·pending, 읽기/조작 모드 | snapshot 불변성·stable key, pointercancel·터치 pan·키보드·자동 스크롤·초점, Calendar 선택 ISO 보존 |
| 범주 팔레트 | 순수 key/index·appearance 입력. UI disabled/readonly/loading 해당 없음 | 8색 이상 × 3테마 × light/dark, 텍스트 대비·필요 경계 대비, 동일 key의 category ID, 라벨/패턴 보조 |
| Pagination | empty page set/경계, disabled/loading, 현재 page 안내 | 첫/끝/주변 범위, 부모 거부·pageCount 변경, RTL·모바일 compact, Table 회귀 |

모든 적용 대상에 strict props/events/slots/methods와 잘못된 사용의 negative 타입, 개별 import/global 등록, ko/en override, 3테마 × light/dark × 2density, 320/768/1440px·긴 텍스트·키보드/포커스 증거를 남깁니다. 상태가 의미 없는 컴포넌트에 prop을 붙여 통과 개수를 늘리지 않습니다. 실제 터치·화면 낭독기·Safari/RTL을 실행하지 않았다면 미검증으로 구분합니다.

각 단계는 자체 source/패키지 타입·적절한 runtime/browser·문서 빌드와 로컬 commit으로 닫습니다. Components 메뉴/검색/라우트의 Examples·Sample Code·API·실행 링크와 starter 기본 화면/독립 링크를 같은 정본 SFC에 연결합니다. 관련 기존 44종을 보존하고 새 버전 후보 tarball은 별도 격리 경로에 설치해 타입·실행을 확인합니다. 전체 검사는 변경 영향이 있거나 단계 통합 시 수행하고 이미 통과한 검사를 이유 없이 반복하지 않습니다.

## 순서·호환성·출시

요청서의 1–14 순서를 기본으로 따릅니다. 이미 구현된 3·8·9·11은 새로 만드는 단계가 아니라 보완·검증 잔여로 축소합니다. overlay 공통 계약만 4단계 picker의 선행 기반으로 먼저 확정하고, 6단계에서 Dialog/Snackbar 조합까지 통합합니다. TimeGrid는 별도 API/PR 단위로 유지합니다. timezone/DST는 표시 좌표·wall time·저장 instant의 책임을 구분한 뒤 범용 proposal만 설계합니다.

하위 호환 추가와 opt-in 기본값만이면 **다음 minor(예: 1.1.0)** 후보입니다. scalar change를 객체로 교체, native/list presentation 재해석, modal 기본 전환·legacy clear 제거는 자동 minor로 확정하지 않습니다. 기존 메서드·슬롯·모델·FormData·peer를 보존하고 deprecated의 대체·제거 버전은 별도 검토합니다. 새 categorical 토큰만 실제로 필요한 공유 토큰 후보이며, 다른 기능은 기존 space/height/radius/focus/layer를 우선 사용합니다.

새 package/유료 의존성/credential은 필요하다고 가정하지 않습니다. Warning/grip path가 필요하면 기존 아이콘 경로의 타입·소유권/라이선스를 검토합니다. 외부 의존성이 꼭 필요해지면 공식 API·license·peer/SSR·접근성·번들 영향부터 별도 제시합니다.

출시 차단은 계속 유지합니다. 현재 ESM **200,955 > 176,000자**, 동결 1.0.0 hash gate 미통과입니다. 검사 위치 변경은 이전 자동 승인 검토에서 거부되어 미적용했고 재시도하거나 대체 gate로 우회하지 않습니다. 중복 제거·실제 runtime 최적화는 [원인/영향 분석](BUNDLE-GROWTH-REVIEW.md) 이후 별도 측정으로 평가합니다. 파일을 나눠 index만 작게 보이게 하거나 임계치를 낮추지 않습니다.

외부 선언 769건도 해결됐다고 하지 않습니다. 1815de3 설치본은 같은 조건의 npm baseline과 진단 증가 0건이었고, Calendar source 자체 선언 오류는 0건입니다. 새로운 설치 후보는 두 TS 버전·skipLibCheck 옵션·자체/외부 진단을 같은 조건에서 다시 구분해야 합니다. npm 게시·원격 push·운영 배포·외부 소비 프로젝트 변경은 이번 계획의 실행 권한이 아닙니다.

## 실제 파일 근거

- [공개 export·STextField·SDialog·SDataTable](../../packages/vue-ui/src/index.ts), [global 타입](../../packages/vue-ui/src/global.ts), [패키지/peer](../../packages/vue-ui/package.json).
- [공통 필드·Select·Textarea·Number](../../packages/vue-ui/src/controls.ts), [선택/비동기 MultiSelect](../../packages/vue-ui/src/selection.ts), [Autocomplete](../../packages/vue-ui/src/autocomplete.ts), [폼 검증](../../packages/vue-ui/src/form.ts).
- [Date/Time](../../packages/vue-ui/src/date-time.ts), [native floating helper](../../packages/vue-ui/src/floating.ts), [Popover/Tooltip](../../packages/vue-ui/src/disclosures.ts), [Snackbar](../../packages/vue-ui/src/navigation.ts), [실제 overlay/CSS](../../packages/vue-ui/src/styles.css).
- [표시 4종](../../packages/vue-ui/src/primitives.ts), [기존 18개 icon path](../../site/icons.js), [SCard/SAlert](../../packages/vue-ui/src/surfaces.ts), [Progress](../../packages/vue-ui/src/progress.ts), [tokens/layers/density](../../tokens.json).
- [Sortable](../../packages/vue-ui/src/sortable-list.ts), [항목별 disabled 검증](SORTABLE-ITEM-DISABLED-VALIDATION.md), [MonthCalendar](../../packages/vue-ui/src/month-calendar.ts), [Calendar 검증](MONTH-CALENDAR-VALIDATION.md).
- [생성 API/타입 계약](../../site/component-api-data.js), [API 생성기](../../scripts/build-component-api.mjs), [Components 검색](../../site/topics.js), [정본 advanced 실행 예제](../../examples/vue-vuetify/src/AdvancedExamples.vue), [starter 기본 연결](../../examples/vue-vuetify/src/App.vue).

잠금 Vuetify 원본의 VField.d.ts에서 prepend-inner/append-inner/clear를, VOverlay의 connected/scroll/attach와 composables/stack을 읽었습니다. 이 내부 경로를 solyi-ui의 새 공개 API로 그대로 노출하지 않습니다.

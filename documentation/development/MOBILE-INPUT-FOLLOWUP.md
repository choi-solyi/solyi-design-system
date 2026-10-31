# 모바일 입력·예제 후속 보완

기준 main: 1313622. npm 1.1.1 게시와 외부 소비 앱 변경은 보류한다. 아래 표의 구현과 실행 검증은 구분한다.

| 요청 | 확인한 원인·조치 | 현재 검증 |
|---|---|---|
| TimePicker 입력/선택 분리 | 직접 입력 클릭도 선택창을 열었다. 입력은 편집, 펼침 버튼은 선택으로 분리하고 포인터 열기는 입력 focus를 만들지 않는다. | Chrome 320/360/390/768px × native/list × auto/dialog 16경로 통과. 데스크톱 클릭→방향키 선택도 통과. 실제 Android IME 미검증 |
| TimePicker 모달 내부 여백 | 공통 host의 8px 패딩을 그대로 사용했다. TimePicker dialog에 기존 space-6 내부 패딩을 적용한다. 바깥 host 여백은 유지한다. | 위 16경로에서 내부 padding 24px, 바깥 안전 여백, 가로 스크롤 없음 통과 |
| 모든 ±·프리셋 | 구현은 controls.ts SNumberInput에 모인다. nudge와 preset의 강제 input.focus를 제거하고 편집 중 선택 범위는 보존한다. | 실제 Chrome 포인터·키보드·직접 입력 및 caret 통과 |
| 입력 중 세 자리 구분 | useGrouping 기본 true, false로 생략한다. 숫자로 강제 변환하지 않고 정수 초안만 그룹화해 부호·미완성 소수·후행 0을 보존한다. | 실제 중간 삽입/Backspace/Delete/선택 교체/합성 붙여넣기 입력·음수·소수·빈값·경계 증감 통과 |
| 초안/모델/오류 보존 | 입력 중 표시만 바꾼다. 모델은 기존 commit/검증 계약을 유지한다. 0–10/2 범위에 100000을 쓰면 100,000 초안과 오류를 보존하고 모델을 바꾸지 않는다. | source runtime·폼 제출·min 기준 step 및 실제 브라우저 통과 |
| Linear 원형 중복 | progress.vue에서 원형 구간 전체와 두 진행 표시 설명을 제거한다. Circular API·독립 예제와 Loading Overlay는 유지한다. | Violet 넓은 화면/Sage 다크 390px/Sand 320px에서 Linear만 1개, 원형 0개, 독립 Circular 1개, Overlay 시작 버튼 유지 확인 |
| 주 액션 오른쪽 | 확인/저장/완료 footer와 단독 주 액션은 end 정렬한다. 취소·보조→주 액션 DOM 순서를 맞춘다. 검색·탐색·증감·툴바는 별개다. | 아래 액션 인벤토리 참조. 실제 3테마에서 대표 폼·Popover·Dialog 오른쪽 끝/DOM 마지막 순서 통과. Core/일부 예제의 실제 렌더는 미실행 |
| Calendar 상세 3개 | 자료 3개는 map으로 모두 렌더됐지만 배지/텍스트가 섞이고 고정 상세 높이가 잘랐다. 독립 행·일관된 배지·별도 header/list scroll로 정리한다. 빈 loading 예약 높이를 한 줄로 줄인다. | 3자료↔3행, 닫기/다른 날짜/재열기/반복 loading 위치 불변 3테마 통과. 픽셀 검토에서 긴 배지 안쪽 라벨 잘림을 추가 발견하여 후속 수정 및 최종 설치본 3테마 재확인 통과 |
| TimeGrid 시각/복제 | 편집용 분 좌표는 내부에 유지하고 HH:mm picker로 표시한다. opt-in 복제 사용 설정과 실제 메뉴 경로를 안내한다. | 설치본 3테마 HH:mm 편집/경계/역전/취소/부모 거절/복제 preview→확정·취소 통과. 원본/새 ID/개수 대응 확인; 좁은 화면 menu·복제는 tap 사용 |
| 전체 탐색 메뉴와 sticky 충돌 | 공개판 390px에서 TimeGrid가 메뉴 위를 덮는 hit-test 61곳을 재현했다. root isolation 후 0곳, 내부 scrollTop 475 유지. 전역 z-index를 올리지 않는다. | 수정 전후 실제 픽셀 확인, 최종 빌드·DataTable 인접 회귀 대기 |
| Container/Row/Col 반복 | layouts 예제를 재사용하되 각 API의 part를 구분한다. 너비/fluid, 간격·세로 정렬, 반응형 비율·줄바꿈을 각각 조작한다. 기존 조합 경로는 유지한다. | 실제 3테마에서 Container 너비 차이, Row 간격·정렬 조작, Col 비율 변경·모바일 줄바꿈 통과 |

## 공통 입력 focus 조사

- 공통 clear의 포인터 조작은 닫혀 있던 편집기에 focus를 강제하지 않는다. 이미 편집 중이면 유지한다. 명시적 키보드·메서드 clear/focus 계약은 보존한다.
- Date/Time legacy clear도 같은 원칙을 적용한다. 오류 제출에 따른 invalid field 복귀, 검색형 Autocomplete/Combobox/MultiSelect의 검색·선택 후 focus, roving keyboard focus는 목적이 달라 무조건 제거하지 않는다.
- SNumberInput 사용처: advanced-inputs(수량), data(페이지 크기), error-summary(개수), navigation(설정), pagination(주변 번호), time(scrub 설정), AdvancedExamples 편집. TimeGrid 편집 시각은 HH:mm으로 바꾼다. 순수 ± 표시는 controls.ts 두 버튼이며 Calendar의 +N은 증감이 아닌 자료 보기다.

## 증거와 한계

- Library의 정상 준비 경로는 성공했지만 Windows Python launcher 실행이 접근 실패하여 로컬 PNG 설치·직접 열람은 완료하지 못했다. helper 변경/임의 다운로드/다른 executor 경로 사용은 하지 않았다. 부모가 정상 Library 경로로 확인한 원본 픽셀 결과를 사용한다.
- qa-output/mobile-input-followup/ 아래에 임시 빌드·브라우저 로그와 캡처를 보존한다. 재현용 scripts/mobile-input-followup-browser-check.mjs는 최종 후보 설치본에서도 실행한다.
- 브라우저 focus 관찰과 viewport 축소는 실제 Android IME 검증이 아니다. 물리 휴대폰과 실제 스크린리더는 미검증이다.
- 사용자 신고 수정과 별도로 발견한 사항은 근거·조치·실행 결과를 아래에 추가한다. 같은 종류라는 이유만으로 미실행 경로까지 통과 처리하지 않는다.

## 2026-10-31 체크포인트와 출시 차단

- 브랜치 fix/mobile-input-behavior. 44951d4 이후 수정은 작업 트리에 보존한다. 이번 묶음은 아직 원격/main/공개 사이트에 반영하지 않았다. npm 1.1.1 게시 보류.
- 임시 tarball(정식 동결 아님) 설치 소비자: qa-output/improvements-30/development-consumer. 현재 설치본 브라우저 전체 21기록(숫자 1, Time 16, 데스크톱 혼합 조작 1, 3테마 예제 3), SSR 통과. 이후 Calendar CSS 라벨 줄바꿈 변경은 별도로 재검증 후 재포장해야 한다.
- 자체 선언 51종/negative fixture skipLibCheck:false 진단 0. 외부 선언 769건은 기존 한계이며 전체 외부 타입 통과를 뜻하지 않는다. API 문서 51개 생성·계약 검사 통과.
- 실제 설치본 크기 gate 실패: all_plugin gzip 68,188B > 67,584B, 초과 604B. 이는 npm 한도가 아닌 내부 출시 예산이다. 기존 gate와 1.0.0/1.1.0 파일은 수정하지 않았다.
- 8개 개별 import는 모두 통과(분석 측정): SIcon 6,954/8,192; SCombobox 12,633/14,336; STimeGrid 17,293/17,408; SMonthCalendar 12,157/13,312; SPagination 8,638/9,216; SConfirmAction 7,699/8,192; SLoadingOverlay 12,154/13,312; SBtnGroup 6,535/8,192B.
- 최적화: 내부 정적 SVG 렌더 공통 경로를 재사용했다. 공개 아이콘 API/경로/크기/aria는 유지한다. 이벤트 validator 광범위 공통화 실험은 이득이 작고 영향 범위가 커서 원상 복구했다. 기능·접근성·검사 삭제 및 예산 임의 변경은 하지 않았다.
- 선택안(미승인): 기존 버전과 개별 import 한도는 그대로 두고, 이번 실제 UX 기능이 추가된 1.1.1 전체 플러그인 예산만 67KiB(68,608B)로 검토할 수 있다. 현재보다 420B 여유인 작은 상한이다. 또는 추가 구조 최적화를 계속하되 무관한 대규모 리팩터링은 피한다. 결정 전 정식 후보 동결/전체 출시 pipeline/공개 배포 완료로 표시하지 않는다.

## 51개 공개 컴포넌트 focus 적용 조사

아래는 소스의 입력 focus·증감 경로 분류이며, 51개 모든 실기기 UI를 실행했다는 뜻이 아니다. 실행 결과는 위 표와 개별 로그로 한정한다.

| 컴포넌트 | 적용·실행 범위 |
|---|---|
| SNumberInput | 유일한 공통 -/+ 및 숫자 preset 구현. 포인터는 입력 focus 호출 없음/이미 편집 중 caret 보존/키보드 버튼/직접 입력/clear를 실제 Chrome에서 확인 |
| STimePicker | 펼침은 비편집 listbox/select에 focus, 입력 클릭은 편집. clear 포인터 focus 제거. 16 표시 경로 및 데스크톱 클릭→키보드 실제 실행 |
| SDatePicker | clear의 동일 포인터 guard 적용. 열기 버튼·달력 roving focus와 Alt+Down 직접 입력 복귀 보존. 모든 presentation의 이번 최종 설치본 실제 검사는 미실행 |
| STextField, STextarea, SSelect | 공통 clear guard 적용. explicit clear()/focus()와 키보드 clear 계약 보존. 이번 브라우저 spy는 Number 경유 공통 경로를 확인; 세 컴포넌트별 전 경로 미실행 |
| SAutocomplete, SCombobox, SMultiSelect | 입력·검색·선택 후 query focus는 의도된 검색 작업이며 제거하지 않음. clear는 공통 guard. 선택·검색의 이번 전체 재실행은 미실행 |
| SCheckbox, SSwitch, SRadioGroup, SSegmentedControl, SRangeSlider | focus는 비텍스트 선택/범위 입력 또는 roving·검증 복귀. 텍스트 편집기 강제 focus/공통 -/+ 해당 없음; 이번 전 상태 실제 재실행 미실행 |
| SFileInput | 파일 선택/미리보기의 버튼·파일 입력, 숫자/텍스트 키보드 강제 focus 해당 없음 |
| SForm | 오류 제출에 대한 첫 invalid field focus는 의도된 오류 복귀이므로 보존 |
| SMonthCalendar, SDataTable, SPagination | +N은 상세 열기, 페이지 번호/이전·다음은 탐색이며 수치 입력 증감과 구별. Calendar 상세는 실행, Table·Pagination 설정 NumberInput은 공통 구현 사용; 메뉴 인접 회귀 진행 |
| STimeGrid | 시간 좌표는 내부 분, 부모 편집 예제 HH:mm. 이동·resize·menu의 비텍스트 focus와 편집 오류 복귀 보존 |
| SBtn, SBtnGroup, SConfirmAction, SIconBtn, SSplitBtn, SAccordion, SBreadcrumbs, SContextMenu, SStepper, STabs, STree, SAlert, SDialog, SLoadingOverlay, SPopover, SProgressCircular, SProgressLinear, SSnackbar, STooltip, SAvatar, SBadge, SBarChart, SCard, SChip, SCol, SContainer, SEmptyState, SIcon, SResizableSplitPane, SRow, SSortableList | 자체 텍스트 숫자 증감 focus 경로 없음. 버튼·overlay focus 복귀·roving·사용자 슬롯은 별개. 소비자가 슬롯에 넣은 임의 focus 호출까지 라이브러리가 제거하지 않음 |

## 주 액션 인벤토리

- 공통 Dialog/Card/Popover/Alert/EmptyState footer end 정렬. Dialog actions-start는 별도 왼쪽 영역 유지. 탐색 nav가 있는 Card footer는 시작 정렬 유지.
- Vue 대표 실조작: buttons, form, writing, fields, error-summary의 단독/그룹 primary 마지막·오른쪽; Popover 안내 확인; Dialog 초기화/닫기/예제 처리; TimeGrid 취소/저장. 3테마/320·390·1100px.
- 소스 조정, 이번 실제 화면 미실행: App 기본 starter 폼, ExtendedExamples 완료 액션, workflow 편집, bulk-recovery, identity-progress, color-examples, confirm-action, layouts 설정, Core app/calendar/extras/recovery/workflow/layouts/motion의 확인/저장 footer.
- 제외 이유: VuetifyExamples는 S/V 스타일 비교 툴바; 검색/탐색/증감/이전·다음/색상 선택/독립 아이콘은 완료 액션이 아니다.

## 자율 발견 수정

1. clear 포인터 경로가 이미 편집 중인 입력에도 focus()를 다시 호출했다. prototype spy에서 재현 → 모든 실제 포인터 clear는 focus 호출 생략, pointerdown으로 기존 caret만 보존. 명시적 메서드/키보드는 focus 유지. spy 재검증 통과.
2. 숫자 초안 ','가 구분자 제거 후 빈값처럼 처리될 가능성 → 숫자가 없는 malformed 구분자 초안은 그대로 유지하여 invalid, 모델 보존. 실제 브라우저 통과.
3. TimeGrid 끝 시각 draft가 아직 commit되기 전 저장 버튼이 disabled라 blur/commit할 수 없는 경로 → 저장 시 양 필드 validate, 범위/역전 오류 표시, 원본 보존. 실제 경계·역전·취소 통과.
4. Calendar의 큰 공백 중 일부는 실제 날짜가 없는 여섯 번째 주였다. 논리 42셀은 유지하고 해당 월 날짜가 없는 행만 숨김; 모든 실제 날짜 가시성 runtime 검사 통과.
5. 3행 존재 검사 후 실제 픽셀에서 긴 Calendar 라벨 안쪽 말줄임 잔재 발견 → 상세 영역만 안쪽 label 줄바꿈 처리, 셀의 짧은 marker 말줄임은 유지. 최종 재포장·설치본 3테마에서 안쪽 라벨 너비 및 줄바꿈 재검증 통과.

- 현재 공개판에 source CSS isolation만 주입한 진단으로 3테마 × TimeGrid/Calendar/iframe Table 9경로 메뉴 겹침 0, Escape(메뉴 내부 focus)/재열기/동일 링크 선택/TimeGrid scrollTop 보존 통과. 이는 아직 최종 배포본 검증이 아니다. 재현 스크립트 scripts/document-menu-layer-browser-check.mjs는 배포 후 주입 옵션 없이 실행해야 한다. 초기 검사 오류(스크롤 메뉴 밖 좌표 포함, 현재 메뉴 분기 selector, networkidle)는 실제 렌더 범위/현재 분기 기준으로 수정했다.
- 설치본 소비 타입 fixture(skipLibCheck:true)는 Number useGrouping 및 Time pickerPresentation/presentation 조합·negative boolean 타입을 통과했다. 자체 선언 skipLibCheck:false 통과와 구분한다.
- 기존 설치본 TimePicker 48경로 및 TimeGrid 3테마 CRUD/포인터·터치 이동/resize/취소/현재 시각선/controlled/키보드 회귀 통과.
- 임시 tarball SHA-256 409056528bdee766913a70e4f0234043afecbeaebadb66496e0564c66decd8cd, 5989794B. 정식 release manifest/내부 예제 file dependency는 아직 이전 후보를 유지한다. 크기 예산 결정 후 정식 동결과 최종 일치 검사가 필요하다.

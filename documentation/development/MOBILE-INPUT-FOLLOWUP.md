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
| 주 액션 오른쪽 | 확인/저장/완료 footer와 단독 주 액션은 end 정렬한다. 취소·보조→주 액션 DOM 순서를 맞춘다. 검색·탐색·증감·툴바는 별개다. | 아래 액션 인벤토리 참조. 실제 3테마에서 대표 폼·Popover·Dialog 오른쪽 끝/DOM 마지막 순서 통과. 후속 절의 남은 주 액션 실행 확인까지 완료; 모든 상태 전수·공개 배포와는 구분 |
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
| SDatePicker | clear의 동일 포인터 guard 적용. 열기 버튼·달력 roving focus와 Alt+Down 직접 입력 복귀 보존. 최신 설치본 390px에서 legacy/auto/popover/dialog 열기·취소·재열기, 포인터/키보드 clear·명시적 focus 통과; Date 넓은 화면별 전수는 미실행 |
| STextField, STextarea, SSelect | 공통 clear guard 적용. explicit clear()/focus()와 키보드 clear 계약 보존. 최신 설치본에서 세 컴포넌트 각각 포인터 clear/키보드 Enter clear/명시적 focus 통과; disabled/readonly 전 조합은 미실행 |
| SAutocomplete, SCombobox, SMultiSelect | 입력·검색·선택 후 query focus는 의도된 검색 작업이며 제거하지 않음. clear는 공통 guard. 각 포인터/키보드 clear·명시적 focus는 최신 설치본 통과. 검색/선택 전체 상태 재실행은 미실행 |
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

## 독립 검토 후 후속 수정 · 최종 수치

이 절이 앞선 임시 수치/검증 범위를 대체한다. 예산은 여전히 미변경이며 공개 배포/정식 동결은 미실행이다.

- 복제 확인 그룹: 설치본 computed display가 block인 것을 재현했다. sol-actions 기반 클래스를 추가해 flex/wrap/gap을 기존 토큰으로 재사용한다. 3테마 실제 설치본에서 primary 우측 끝, 취소→복제 DOM/시각 순서, 모바일 tap, 넘침 없음과 preview/수락/거절/취소를 검증했다. 스크린샷도 직접 확인했다.
- 숫자 잘못된 초안: ',' 입력 caret 1→0을 실제 설치본에서 재현했다. 그룹화 결과가 원문과 같으면 value/selection을 다시 쓰지 않는다. ',,', '1,,2' 끝 caret과 backward 선택 범위도 보존한다. 기존 중간 입력·Backspace/Delete·붙여넣기·숫자 모델/오류 검사가 포함된 설치본 검사 통과.
- 추가 발견: STextField clear의 mousedown이 Vuetify VTextField.onControlMousedown으로 전파되어 input.focus()를 불렀다. clear 버튼의 mousedown 전파만 중단한다. 검색·직접 입력·프로그램 focus 경로는 제거하지 않는다. 실제 설치본 spy로 수정 전 실패/수정 후 통과.
- input-focus-paths-browser-check.mjs: 14경로 통과. STextField/Textarea/Select/Autocomplete/Combobox/MultiSelect 각 1 + Date/Time legacy/auto/popover/dialog 각 4. 포인터 clear 입력 focus 없음, 키보드 Enter clear 입력 복귀, 명시적 focus() 유지. Date 4표시 방식 열기→Escape→재열기→Escape 포함. open 이벤트 뒤 조작하여 렌더 준비 전 Escape 경합을 피한다. 실제 Android IME는 미검증이다.
- core-action-layout-browser-check.mjs: Core 렌더러를 Vue 예제로 대체하는 문서 호스트만 비활성화한 로컬 문서에서 원본 HTML/CSS/이벤트를 실행했다. Form/오류 요약/Workflow/설정 1100·320px 8경로 + Workflow 이탈 확인 2경로의 주 액션 DOM 마지막/오른쪽 배치 통과. 이탈 확인 버튼 그룹의 정렬 누락도 추가 수정했다. 실제 공개 문서 검증과 구분한다. Core Date/Stepper/Motion 및 나머지 Vue 액션 예제는 여전히 소스 조사만 완료한 범위다.
- 마지막 설치 tarball 통합 21기록 통과. 두 후속 수정으로 영향을 받지 않는 기존 Time 48경로/TimeGrid 포인터·터치 전체검사는 이전 동일 기능 검사 결과를 재사용했고, 복제 footer/숫자/공통 clear를 최신 설치본에서 재검증했다.

### 동일 도구·조건의 이전 후보 비교

기준은 기존 동결 후보 439d336f…8696f5를 별도 ignored 경로에 읽기용으로 풀어 같은 Vite 8.3.4/peer external/minify/gzip9로 측정했다. 원본 후보는 변경하지 않았다.

| import | 이전 gzip B | 최신 gzip B | 증가 B |
|---|---:|---:|---:|
| all_plugin | 67,568 | 68,215 | 647 |
| SNumberInput (진단용) | 11,563 | 12,110 | 547 |
| STimePicker (진단용) | 17,750 | 17,831 | 81 |
| STextField (진단용) | 9,403 | 9,468 | 65 |
| SCombobox | 12,583 | 12,639 | 56 |
| STimeGrid | 17,214 | 17,297 | 83 |
| SMonthCalendar | 12,121 | 12,157 | 36 |

개별 import의 공통 코드는 겹치고 gzip 사전도 달라 증가량을 합산하면 안 된다. 이 비교는 변경별 한 줄의 독립 비용을 뜻하지 않는다. 숫자 초안 그룹화·선택 범위 보존이 가장 큰 증분이고, Time 입력/선택 분리·복제 확인·공통 clear 이벤트 처리도 기여한다. 새 의존성은 없다. SVG 공통화는 기능/크기/aria를 유지하는 안전한 최적화로 남겼다. 추가적인 광범위 이벤트 refactor는 효과가 작아 되돌렸다. 검사·기능·읽기 쉬운 문구를 희생하는 미세 최적화는 진행하지 않는다.

- 실제 설치본 gate: 68,215 > 67,584B로 실패(631B 초과). 측정한 기존 8개 개별 import는 모두 기존 한도 내, STimeGrid 17,297/17,408B. 기존 버전/예산/검사 파일 diff 없음.
- 권고안(승인 대기): 1.1.1 all_plugin 한도만 67KiB=68,608B로 검토하면 최신 실측 대비 393B 여유다. 기존1.0/1.1 및 개별 import 한도는 유지한다. 새 한도 승인과 UX 통과는 별개이며 승인만으로 최종 출시 완료가 되지 않는다.
- 최신 임시 tarball: SHA-256 c61d235394d6dbe5d2c1f6a124b0f839b4090b66cf310324c32fcd3758ef05d1, 5,989,802B. 이는 정식 동결 artifact가 아니다. 예산 결정 후 canonical 소비자/manifest/docs 동기화와 전체 필수 pipeline, main/공개 배포 검증이 남는다. npm 1.1.1 게시·소비 앱 변경은 계속 보류한다.

## 예산 승인 대기 중 · 남은 주 액션 실행 확인

제품 소스/패키지 바이트는 8f60b48에서 바꾸지 않았다. 예산·동결 artifact·main·문서 공개 배포·npm·소비 앱도 변경하지 않았다.

- remaining-action-paths-browser-check.mjs는 복사한 모형 버튼 대신 실제 App.vue/ExtendedExamples.vue 및 각 recipe SFC를 직접 import하고, c61d2353…ef05d1 tarball 설치본으로 렌더한다. Violet light 1100px/Sage dark 390px/Sand light 320px에서 아래 사용처의 primary 우측 끝·DOM 마지막·가로 넘침 없음과 실제 조작을 확인했다.

| 사용처 | 실제 실행 |
|---|---|
| 기본 starter 폼 | 가상 기록 확인, 상세 열기/Escape |
| Extended 폼·알림·날짜/시각 확인 | 각 주 액션 정렬, 알림 열기/닫기 |
| Workflow | 수정→저장 footer, 미저장 변경→이탈 확인→계속 작업 후 초안 보존 |
| Bulk recovery | 전체 가상 처리→완료 2/실패 1→실패만 재시도→완료 3 |
| Stepper | 이름→분류→검토→가상 완료 |
| ConfirmAction | 비활성 예제 앞/실제 제거 오른쪽, 두 번 확인→결과 |
| EmptyState/Card | 첫 항목 추가→Card 단독 초기화→빈 화면 복귀 |
| 의미색 5종/Card/Alert | 각 대표 다음 단계와 단독 스낵바 액션 정렬, 실제 알림 열기 |
| Layout 화면틀 | 설정으로 이동→이름 입력→설정 확인→성공 안내 |

- 위 결과는 66개 사용처·화면 관찰 + 설정 3개이며, 69개 서로 다른 컴포넌트를 뜻하지 않는다. 캡처 중 Sand 모바일의 Workflow 확인/EmptyState/의미색 버튼·Alert를 직접 픽셀로 추가 확인했다. 이 범위의 신규 제품 결함은 발견하지 않았다.
- Core 추가: 같은 원본 HTML/CSS/이벤트를 실행한 로컬 문서에서 날짜 입력 확인과 overview 변경 저장을 1100/320px에 직접 실행하고 오른쪽 끝·DOM 순서를 확인했다. 앞선 Core 폼/오류/Workflow/설정/이탈 확인 10관찰에 추가 4관찰이다.
- Core extras Stepper는 현 문서 메뉴에 독립 노출되지 않는 렌더러이므로 renderExtras+mountExtras의 최소 Core 화면으로 분리해 이름→분류→완료까지 1100/320px에서 확인했다. 완료 버튼 우측 끝·DOM 마지막 및 결과 3/3 통과. 이 fixture는 관련 없는 progress preview 자산을 제공하지 않아 해당 iframe 404가 기록되며, Progress의 검증 결과로 사용하지 않는다.
- Core 로컬 문서는 원본 Core UI를 문서의 Vue 예제로 교체하는 호스트만 비활성화한 것이며 공개판 자체 검증과 다르다. 최종 후보/docs 동기화와 실제 배포 URL 검증은 승인 뒤 필요하다.
- 초기 Bulk 검사는 실제 polite status를 alert로 잘못 지정해 대기 실패했고 실제 id/결과로 수정했다. 브라우저 실행 한 번은 자동 승인 검토 deadline 때문에 시작되지 않았으며, 허용된 1회 재시도는 정상 실행됐다. 불확실한 실행을 중복 시작하지 않았다.

### 아직 실행하지 않은 범위

- 물리 Android 소프트 키보드, 실제 스크린리더, 모든 브라우저/OS 조합.
- Date 넓은 화면별 전체 상호작용 재실행, 검색형 입력의 async/오류 전체 상태, 모든 입력의 disabled/readonly 전 조합. 이번 clear/focus와 기존 관련 회귀 통과를 전 범위 통과로 확대하지 않는다.
- Vuetify 자체 비교 툴바와 탐색/증감/색상 선택은 완료 액션이 아니므로 우측 이동 대상에서 제외했다. 소비자 슬롯의 임의 버튼 배치·focus 호출도 이번 라이브러리 검사 범위가 아니다.
- 실제 최종 artifact 동결/전체 필수 pipeline/main·공개 문서 배포. 크기 gate는 68,215 > 67,584B 실패로 유지하며 승인되지 않은 기준 변경을 하지 않았다.

## 2026-10-31 예산 조정 승인 · 최종 후보 준비

사용자가 부모의 제안에 “응 조정해봐”라고 답하여 1.1.1 imports.all_plugin.maxGzipBytes만 66KiB(67,584B)에서 67KiB(68,608B)로 조정했다. 같은 도구 실측 68,215B 대비 393B 여유이며, 숫자 초안 그룹화/caret·공통 clear·복제 확인 등 위 증분 근거에 한정한다. 기존1.0.0/1.1.0 기준, 1.1.1 개별 import 8종, ESM/총JS 한도 및 다른 검사 기준은 유지한다. 예산 승인은 UX 전체 통과나 npm 게시 승인이 아니다.

새 artifact 경로 artifacts/candidates/1.1.1-mobile-ui를 사용해 이전 후보를 보존한다. 기존 미게시1.1.1 manifest/패키지 사본은 checksum 확인 후 ignored QA 이력으로 옮기고 정식 pipeline으로 다시 동결한다. 기존 공개1.0.0/1.1.0은 원본 그대로 유지한다. 전체 pipeline/최종 설치본/docs 동기화/CI/공개 배포 결과는 실제 실행 후 추가한다. npm1.1.1 및 소비 앱 업데이트는 계속 보류한다.

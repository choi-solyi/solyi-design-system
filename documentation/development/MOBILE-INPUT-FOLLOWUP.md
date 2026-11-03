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

### 최종 pipeline에서 발견한 숫자 그룹 입력 회귀

첫 전체 pipeline의 크기 gate는 통과했지만 locale-runtime-check의 기존 잘못된 그룹 초안 '1,2' 보존 검사가 실패했다. 새 표시 로직이 이를 '12'로 고쳐 모델을 바꾸는 실제 호환성 결함이었다. 소수점 로케일 이슈가 아니라 ko/en의 엄격한 그룹 파싱 계약이다. 검사를 완화하지 않았다.

기본 그룹화는 유효한 원문만 처리하며, 이전 초안이 유효하고 실제 자릿수 삽입/삭제인 경우에만 기존 표시의 쉼표를 재배치한다. 명시적으로 입력·붙여넣은 잘못된 쉼표는 보존한다. paste 이벤트의 텍스트를 입력 이벤트와 연결해 중간 숫자 붙여넣기와 malformed 쉼표 붙여넣기를 구별한다. 원문 불변 시 caret/선택 범위는 건드리지 않는다. Chrome에서 1,000→10,000→1,000, 그룹 전체/첫 숫자 삭제, 중간 숫자 붙여넣기, 잘못된 쉼표/선택 범위/모델 보존을 통과했다. OS 클립보드는 별도 미검증이며 이벤트 기반 붙여넣기 재현이다.

실패한 첫 새 artifact는 그대로 두고 새 경로 artifacts/candidates/1.1.1-mobile-ui-rc2에서 재포장한다. 제품 소스가 바뀌었으므로 새로운 sourceRef와 최종 후보로 전체 필수 pipeline을 재실행한다.

## 최종 후보 검증 완료 · main 통합 전

- sourceRef b9f13103ee8f652c71d3030ffd6d4b580a6570ad, artifact artifacts/candidates/1.1.1-mobile-ui-rc2. UI 5990057B, SHA-256 91f4287d1027b1a557801ad82af0b5b3dada859697cbae1cc5cdd2236cfb7751. release-assets/docs 다운로드/artifact 원본과 두 canonical 소비자 lock integrity가 모두 일치했다. 1.0.0·1.1.0 패키지 원본 checksum도 보존됐다.
- npm run library:prepare 전체 10/10 종료 코드0. 깨끗한 설치/일반 npm pack/51 API/자체 선언 negative/소비 앱 타입·빌드/SSR/locale/폼·clear·Time·Sortable·Calendar·TimeGrid/라이선스·글꼴·문서·check·npm test를 통과했다. 769개 외부 선언 한계와 자체 선언 진단0은 구분한다. 로컬 Node22.22.1; 원격 CI는 고정22.23.3에서 별도 확인한다.
- 최종 크기: all_plugin 68378/68,608B, 개별 import8종 모두 기존 예산 통과. ESM 299068문자, gzip 76223B, 총JS gzip합 83505B로 다른 기준도 통과. 추가 예산 변경 없음.
- 최종 canonical 설치본 Chrome 통합21기록, Time48경로, 최종 QA 설치본 clear14경로와 TimeGrid 3테마 CRUD·포인터/터치·resize·취소·controlled·현재 시각 회귀 통과.
- 생성된 docs 자체에서 CSS 주입 없이 메뉴/sticky 3테마9경로 통과. 실제 로컬 문서에서 Calendar/Sortable/TimeGrid 생성→이동→resize→편집→삭제 및 릴리즈 이력 3테마 통과. 추가 Number/Time 공개 예제 경로도 3테마에서 그룹 초안·모델/오류·증감과 직접 입력 분리·dialog 패딩/취소/재열기를 통과했다. 시간 입력·숫자 입력의 실제 Android IME는 미검증이다.
- 로컬 static helper의 Windows 끝 구분자 처리 때문에 첫 HTTP root가404였고, 해당 QA helper 경로 정규화만 수정한 뒤 정상 문서로 재검증했다. 제품 문제가 아니다. Number 공개 예제 모델 검사는 문구 대신 실제 보존된 수치로 대응해 로케일 문자열에 종속되지 않도록 했다.
- 공식 registry 읽기: latest1.1.0,1.1.1 없음. 공개 릴리즈 이력은1.1.0/1.0.0만 유지한다. 1.1.1은 계속 미게시 후보이며 npm publish/새 GitHubRelease/소비 앱 업데이트를 하지 않는다.
- main/CI/Pages 및 공개 URL 검증은 이 동결 산출물을 커밋한 뒤 별도 실행하고 최종 작업 응답에 정확한 ref/run/배포 결과로 남긴다. 물리 Android·스크린리더·모든 플랫폼 조합 미검증은 유지한다.

### CI 대기 중 자율 발견 · 잘못된 초안의 삭제 보정

main00eb7a1의 원격 CI41210744676 검증 중, 미실행이던 malformed 초안 Backspace를 직접 확인했다. ',' 한 글자를 Backspace로 지워도 남는 현상을 실제 설치본에서 재현했다. 쉼표 인접 자릿수 삭제 보정이 유효한 숫자 전용인데 malformed 초안에도 적용되어 기본 삭제를 막았다. parseSolNumber로 현재 초안이 유효한 숫자인 경우에만 보정하도록 좁혔다. ',', ',,', '1,2'의 Backspace/Delete와 기존 그룹화·선택·붙여넣기·모델/오류 회귀를 유지한다.

해당 후보가 공개되지 않게 CI41210744676을 취소했고 Pages 업로드/배포가 실행되지 않은 것을 확인했다. 새 후보 artifacts/candidates/1.1.1-mobile-ui-rc3에 재포장하며 rc2 원본은 보존한다. 승인된67KiB 외 다른 예산 변경, npm 게시, 소비 앱 변경 없음. 최종 코드가 바뀌었으므로 전체 필수 pipeline과 최종 숫자 조작을 다시 확인한다.

## rc3 최종 후보 · 삭제 회귀 포함

- sourceRef c50014b9352b271522f9010e6ff6ba694f8260a9; artifacts/candidates/1.1.1-mobile-ui-rc3. UI 5990059B, SHA-256 cc7732deff0d653d1951c3c8681df87221737ae3f90c8c3919c207eef6d0a5ab. artifact/release-assets/docs 및 두 canonical 소비자 lock integrity 일치. 기존1.0.0/1.1.0 원본 검증 통과.
- final-pipeline-rc3.log: 전체 library:prepare 10/10 종료 코드0. max gzip는 all_plugin 68387/68,608B; 나머지 예산도 기존 기준 통과.
- rc3 최종 설치본 숫자 전체 회귀 및 실제 생성 docs의 Number/Time 3테마 경로 통과. malformed 쉼표 Backspace/Delete, 모델·caret·중간 붙여넣기·증감/직접 입력 포커스 포함. 수정 영향이 없는 Time/Calendar/Sortable 등의 실제 조작 근거는 앞선 동일 소스 검증을 재사용하고 최종 공개판에서 다시 끝간 조작한다.
- CI41210744676은 새로운 삭제 결함 발견으로 취소됐고 업로드/Pages 미실행. 새 main 커밋의 CI와 실제 공개 URL 확인은 후속 결과로 남긴다. npm1.1.1/소비 앱 변경 보류, 물리 Android IME·스크린리더 미검증 유지.

## Progress 메뉴·제목 문구 후속 보완

독립 공개 검토에서 starter/?view=recipes&example=progress의 메뉴/h2에 옛 “진행 바와 원형 로딩”이 남은 것을 확인했다. 원인은 제목의 단일 원본 usage-example-inventory.json 미수정이었다. “가로 진행과 작업 영역 로딩”으로 바꾸고 build-usage-examples로 registry/예제 데이터/인벤토리를 재생성했다. Linear 설명의 불필요한 회전 표현도 “움직임”으로 정리했다. progress 키·기존 URL·독립 Circular 이름/API·하단 Loading Overlay는 유지한다.

실제 소비 starter와 문서 산출물을 다시 빌드했고 recipe navigation·preview integration·public sample·51 API 계약 검사를 통과했다. 기존 artifact 경로에 새 npm pack 결과를 대조하는 immutable 검사를 통과하여 UI/Core 패키지 바이트 불변을 확인했다. UI 후보 SHA-256 cc7732deff0d653d1951c3c8681df87221737ae3f90c8c3919c207eef6d0a5ab 및 manifest/소비자 lock은 유지하며 불필요한 재동결/버전 변경을 하지 않는다. 실제 starter 메뉴/h2/내용 및 Circular 보존은 로컬·공개 Chrome에서 이 문서 수정 커밋을 기준으로 확인한다. npm 보류 유지.


## 2026-11-02 문서 메뉴 바깥 터치 포커스

- 기준: main 58c0fb9, 작업 트리 clean에서 시작. 패키지/후보 파일 변경 없음.
- 로컬 Chrome 475px·320px에서 빈 영역 터치 후 main-content 포커스를 재현. 기준 코드에는 외부 닫기 처리가 없어서 hidden=false였음. 실기기 보고의 닫힘까지 동일 재현했다고 판단하지 않음.
- site/topics.js: 외부 click의 기본 포커스 이후 닫기. 빈 영역은 열기 버튼에 preventScroll로 복귀하고 입력/링크/버튼/명시적 사용자 포커스는 보존. 메뉴 항목 선택의 제목 포커스와 Escape 계약 유지.
- 실행: node scripts/mobile-navigation-check.mjs, node scripts/mobile-menu-focus-browser-check.mjs --baseline, node scripts/mobile-menu-focus-browser-check.mjs. 475px·320px의 Escape/빈 영역 touch·mouse/입력·링크·버튼·사용자 지정 focus/트리거 재클릭/현재 메뉴 항목 선택 통과.
- 증거: qa-output/mobile-menu-focus/{baseline,results}.json 및 475.png/320.png. 브라우저 검사는 docs 셸 + 현재 topics.js만 사용하며 패키지/생성 문서는 수정하지 않음.
- 실제 Android 기기·IME·스크린리더 재검증은 미실행. 기존 물리 기기 QA와 로컬 에뮬레이션을 구분.
- 이번 범위는 로컬 수정·검증만. commit/push/공개 배포/npm 게시/소비 앱 변경 미실행.

### 공개 반영 승인 후 최종 확인

- 원격 main도 58c0fb9로 동일함을 확인한 뒤 이번 메뉴 수정만 반영.
- npm run build/check 통과. 생성 docs/topics.js와 site/topics.js SHA256은 모두 faf4f9fdb19ed9007aec17dab66f4cd2de038334f6b5339450acdb7bc8977470.
- node scripts/mobile-menu-focus-browser-check.mjs --built: 475px·320px의 모든 포커스 흐름 통과. --url/--commit 인자로 동일 검사를 실제 공개 문서에서도 실행 가능.
- 동결 1.1.1 후보 SHA256 cc7732deff0d653d1951c3c8681df87221737ae3f90c8c3919c207eef6d0a5ab 유지. 문서 전용 수정이며 npm 게시/소비 앱 변경 없음.
- 최종 npm test 전체 통과(기존 DOM/내비게이션/접근성 상태/문서·릴리즈 이력 검사 포함). 실제 렌더 포커스는 별도 Chrome 결과로 확인.


## 2026-11-03 Fold 공통 액션 메뉴 외부 터치 후속

### 재현 범위와 원인

- 실제 신고 경로는 #component/scontext-menu 및 starter/?view=recipes&example=action-menu의 SContextMenu/SSplitBtn. d862f03은 문서 탐색 햄버거 수정이므로 이번 해결의 검증 근거가 아님. 이전 범위 식별 오류를 인정하고 같은 메뉴라는 이름만으로 결과를 전용하지 않음.
- 운영 topics.js/starter.js/inline-preview.js SHA256이 d862f03과 모두 일치. 오래된 배포가 아니라 packages/vue-ui/src/actions.ts 공통 메뉴 경로의 문제.
- 기준본 native Chrome fixture 475/320px × MAIN/BODY × Split/Context 총8조합에서 재현. 이벤트 trace는 pointerdown 닫기 → 메뉴 제거/포커스 BODY → 호환 mousedown에서 MAIN 포커스 → click에도 복귀 없음. 외부 pointerdown/focusin이 모두 close('outside',false)여서 복귀를 끄고 있었음.

### 최소 수정과 재발 방지

- 외부 닫기를 pointerdown 대신 완료된 click으로 이동. focusin이 실제 입력/링크/버튼에 도착하면 정상 닫기/포커스를 보존하고, 구조적 BODY/HTML/MAIN(-1)은 click 이후 Vue DOM 갱신을 기다려 invoker로 preventScroll 복귀. 터치 기본 동작을 막지 않음.
- 취소된 제스처에는 click이 없으므로 닫기/복귀를 강제하지 않음. 기존 Tab, Escape, 선택, disabled/readonly, controlled 거절 및 소비자 작업 흐름 포커스 유지. 추가 예약 상태/타이머 없이 처리.
- 동일 props/events 및 현재 메뉴 항목·열기 버튼 포커스 호출만 공통화. 항목 Map, 키보드 typeahead/순서, 공개 API는 그대로 유지. 읽기 어려운 압축이나 기능 삭제는 하지 않음.
- action-menu-focus-browser-check.mjs가 Components ID→컴포넌트명→actions.ts 소유와 실제 Starter/AdvancedExamples의 S 태그를 확인. 문서 햄버거 검사를 공통 액션 메뉴 통과로 오인하지 않도록 명시. --baseline은 d862f031의 actions.ts, --consumer는 설치된 패키지를 사용하며 소스 alias 금지.

### 실제 실행 결과

- 소스 타입(noEmit), 기존 확장 런타임/TimeGrid 소스 회귀 통과.
- 최종 tarball 깨끗한 설치본: native popover의8조합에서 blank touch/mouse, 외부 입력·링크·버튼·사용자 지정 포커스·음수 tabindex, Escape/선택/재클릭, controlled 닫기 거절 통과. pointerdown 시 아직 열려 있음을 실제 trace로 검사. 합성 검사는 pointercancel 후 원래 메뉴 포커스 유지도 확인.
- 격리 패키지 파이프라인의 Core/bootstrap, 라이브러리 빌드, 정상 npm pack, 두 소비 앱 새 설치·타입·빌드·계약 통과. 공식 파이프라인은 크기 게이트에서 실패한 상태를 보존. 그와 독립적인 기존 하위 명령 전체를 따로 실행해 런타임/SSR/예제·inline 빌드 통과. 원본 파이프라인과 크기 검사는 수정하지 않음.
- 설치본 선언55개: skipLibCheck:false, 자체 진단0. 기존 외부 선언769건은 별도 한계이며 전체 외부 선언 통과로 말하지 않음. 공통화 후 두 컴포넌트의 props/events/slots/methods/types API 자료가 원본과 완전히 일치.

### 크기와 남은 차단

- 최종 설치본 ESM299066자 <300000, gzip76276B <=76800, 전체 JS327067B/전체 gzip83558B 모두 기준 이내. 최초 예비300251자 초과 해결.
- 전체 플러그인 gzip68441B <=68608. 개별7종 통과, STimeGrid만17464B >17408B로56B 초과. 추가 기능과 검사를 희생하는 미세 압축은 중단. 한도 변경 없음. 전체 패키지 파이프라인 미통과 및 공개 반영 차단으로 유지.
- 검증용 로컬 tarball SHA256: 3d0e12e0101634cf9700112bd71e009e72b6048e6f056c39d31a350e4abbb5ed. 원본 동결 후보 cc7732deff0d653d1951c3c8681df87221737ae3f90c8c3919c207eef6d0a5ab 보존.
- 증거: qa-output/action-menu-focus/{baseline,installed-results,installed-size-complete,api-compatibility,verified-hashes,public-assets}.json 및 package-pipeline-3.log(실패)/package-independent.log(독립 검사 통과).
- 현재 WIP만 저장. canonical 후보/manifest/내부 소비자/docs 산출물, commit/push/공개 배포/npm publish/소비4앱 변경 없음. 실제 Fold·Android IME·스크린리더 재검증 미실행.
- 다음 순서: 남은 개별 크기 차단 해결 검토 → 로컬 결과 검토 후 공개 반영 판단/최종 후보 동기화·전체 파이프라인 → 신고된 두 경로의 Fold 재검증 → 사용자 직접 테스트 후 npm 게시 여부 결정. 이번 결과로 배포/게시 승인을 추정하지 않음.


### 56B 후속 검토 및 최종 재확인

- TimeGrid가 불필요한 SSplitBtn/SContextMenu 구현이나 새 의존성을 포함하는 현상은 없음. tree-shaking 결과에서 두 컴포넌트/props는 제거됨. 메뉴에 필요한 locale moreActions는 정상 유지.
- 열기 버튼 focus 소유자를 useActionMenu에서 재사용해 menuOrigin 중복을 없앤 실험: ESM은25자 줄었으나 TimeGrid gzip17466B로2B 증가. 미채택/원복.
- TimeGrid focus fallback 중복 및 native contains(null) 중복 가드를 정리한 실험: gzip17458B로6B 감소했으나 기준보다50B 초과. 완전한 해소 없이 관련 파일 변경만 늘어나므로 미채택/원복.
- 메뉴 복귀는 완료된 외부 클릭 이후 구조적 빈 포커스를 복원해야 하고, editor prepareRestore는 기존 소유 포커스/노드 연결/다른 대상 이동을 따로 보호함. 이 조건을 줄여 무조건 공통화하지 않음. 문자 줄 수와 gzip 감소는 비례하지 않으며 숫자만 맞추는 재배열·압축·한도 상향은 하지 않음.
- 최종 actions.ts SHA256은71cf6141f4625c35f7864d726d01c2f8eccb942c6db46301cceb00f9321e6fab로 검증 tarball 입력과 동일. TimeGrid/editor 실험 변경은 남아 있지 않음.
- 동일 최종 tarball 설치본에서 action-menu-focus-browser-check.mjs --consumer=... 8조합과 time-grid-runtime-check.mjs --consumer=... 재통과. 공식 library-size-check.mjs --consumer=...는17464>17408로 재실패(exit1). 실패를 기존 통과나 독립 검사 결과로 대체하지 않음.
- 선택지: 현재 검증한 최소 수정본을 WIP로 보존하고 공개 반영을 보류(권장), 또는 TimeGrid 내부 focus 복원 구조의 더 큰 정리를 별도 범위로 확정해 검토. 후자는 이번 검증 결과만으로 안전한 감축량을 보장할 수 없음. npm 게시/기기 조작/공개 배포는 계속 미실행.


### 승인된 56B 예외와 도입 이력 확인

- 사용자 승인에 따라 1.1.1/STimeGrid의 기본17408B는 유지하고, 현재 dist/index.js SHA256 3fe4cf284a24e876046370600e687feaa9c8eb0ac899aab211823c0e32b609a9일 때만17464B까지 인정하는 명시 예외를 추가. 다른 코드/버전/컴포넌트/17465B는 기존처럼 실패. 원본크기·타입·SSR·라이선스 등 다른 기준은 유지.
- 경계/거부 검사와 최종 설치본9개 import 검사 통과. 결과는 approvedException ID 및 기본/허용 한도를 출력. npm 게시와 공개 배포는 이 검사로 자동 승인되지 않음.
- 17KiB 최초 도입:9d7145a(2026-10-29 05:02:23 KST), 최종50종 설치본 측정의 TimeGrid15847B에17408B 예산. cfb54c0(2026-10-30 17:23:47 KST)에서1.1.1에 계승. FINAL-SIZE-VALIDATION.md와 git blame117/203줄이 근거.
- Git author Choi Solyi만으로 사용자가 수치를 직접 정했다고 판단할 수 없음. 대화는 PURE/새 버전 기준 정리에 대한 포괄 승인과 작업 중 정한 실측 기준을 구분하며, 사용자 직접17KiB 지정은 확인하지 못함.
- 프로젝트 자체 번들 회귀 기준이며 npm 플랫폼 업로드 한도가 아님. library-pipeline → library-size-check → assertImportBudget가 검사. pages.yml validate 실패는 needs:validate인 문서 배포를 막지만, UI의 prepack은 GUIDE 동기화뿐이며 npm 자체가 이 기준을 검사하지 않음. 공식 lifecycle: https://docs.npmjs.com/cli/v11/using-npm/scripts/ .
- 원격 HEAD는 d862f03으로 기존 외부변경 미실행 확인. 자동 승인 검토가 내부 예제2개의 package.json 경로 변경을 소비 앱 업데이트로 해석하고 미생성rc4 경로 문제로 전체 복합 명령을 실행 전 거부. root package.json/두 예제 dependency/rc4 생성/commit/push/배포는 해당 명령에서 실행되지 않았음.
- 내부 검증 예제 examples/package-consumer(private)와 examples/vue-vuetify(private starter)의 최종 tarball 경로 갱신 범위는 별도 확인 필요. 외부 소비4앱과 npm 게시를 보류한 채, 거부된 경로 변경은 재시도하지 않음.


### 공개 반영 준비의 승인 검토 상태

- 소스/정확한해시56B예외/검사는 로컬841ae86으로 보존. 원격main은 d862f03이며 push 미실행.
- rc4 tarball 실제 생성과 pack-report/checksum 확인 후, 두 대상이 private 내부 검증fixture/문서starter임을 저장소guide/metadata로 확인했다. 새 근거에 대한1회 재검토에서 root artifact 포인터와 두 내부 package.json 연결 변경은 승인되어 실행됨. 외부 소비4앱 변경 없음. 아직 lock/공식후보manifest 동기화 전이며 작업트리로 보존.
- 다음 명령은 자동 검토에서 실행 전에 거부됨: release-assets/1.1.1 및 docs/releases/1.1.1의 기존 미게시후보를 QA로 보존 이동, 인덱스의 임시 변경, 공식 prepare-release 파이프라인. 사유는 정확한 미게시후보 보존·출시준비 승인 부족. 따라서 해당명령의 registry 읽기/이동/인덱스 변경/prepare/배포는 전부 미실행. 재시도하지 않음.
- 승인된 한정예외를 복사한 기존 격리 작업본에서 library-pipeline.mjs --refresh --packages-only 전체 종료0. 실제 tarball/두소비자 새설치·타입·빌드/9import 예산·경계검사/SSR/선언/전체runtime/공개예제·inline 빌드 통과. 증거 package-approved-exception.log. 공식문서·릴리스 delivery 단계는 보류.
- 필요한 정확한 후속승인: 미게시1.1.1의 기존후보원본을 보존한 뒤 release-assets/1.1.1·docs/releases/1.1.1 및 관련manifest/index를 검증된rc4로 재동결·동기화. 공개1.0.0/1.1.0 원본/기존rc3는 보존. npm게시·외부소비앱 업데이트·기기조작은 제외. 이 범위 확인 전 공식경로 이동·재동결·push·배포를 진행하지 않음.


### 명시 승인 후 공식 후보·문서 준비 완료

- 기존 후보 보존 및 새 후보/릴리즈 문서·파일 목록 동기화에 대한 새 명시 승인 후, 이전 작업 미실행 상태를 확인하고 거부된 작업을1회 재시도해 승인·실행됨. registry1.1.1은404로 미게시 확인. 이전 미게시 source/docs 두 사본의 manifest와 tarball을 verifyRelease로 대조한 뒤, workspace 안 QA 보존 경로로 native Move-Item 처리. rc3 아티팩트도 유지.
- canonical library-pipeline --refresh --prepare-release 전체10단계 종료0. 새 rc4 sourceRef는841ae86. UI tarball5990124B/SHA256 3d0e12e0101634cf9700112bd71e009e72b6048e6f056c39d31a350e4abbb5ed가 artifacts/release-assets/docs 및 두 내부fixture lock과 일치. 공개1.0.0/1.1.0 파일은 HEAD 대비 변경없음.
- 생성 문서 실제경로 #component/scontext-menu와 starter/?view=recipes&example=action-menu를475/320px Chrome에서 검증. Components Context1 + Starter Split/Context2, 총6조합의 빈영역/임시 외부입력probe 포커스/ESC/선택/키보드호출/예제인스턴스 유지 통과. 외부입력probe는 테스트 중 DOM에만 추가·제거하며 앱 자료/저장소를 바꾸지 않음.
- 기존 배치 제약을 구분: Starter ContextMenu는850px 높이에서 메뉴가 하단트리거를 덮어 재클릭이 불가능함. 충분한1200px 높이에서 재클릭 통과. 실제trigger hit-test와 두 rect를 기록하고 강제click이나 통과삭제로 숨기지 않음. 기존 Fold 보고의 충분한공간 조건과 구분하며 이번포커스수정 외의 배치코드는 변경하지 않음.
- 실제 UI 증거 built-pages-results.json 및 built-*.png. full canonical 준비 로그 canonical-prepare.log. npm publish/외부소비4앱/실기기 조작은 미실행. CI 및 공개배포 결과는 원격반영 후 별도로 확인.


### Fold 하단 메뉴가 트리거를 덮는 회귀 — 로컬 수정 (공개 반영 전)

- 실기기 보고(704×797, 트리거 중심 약101,659)를 받았고, 이전 공개 커밋810f10b의 actions.ts/CSS를 고정한 Chrome 터치 fixture에서 같은 좌표 재터치가 가상 복제 항목을 선택하는 것을 재현했다. 이전 검증에서 화면을1200px로 늘려 재클릭만 통과시킨 방식은 실제 뷰포트 결함을 해결하지 못했다. 앞으로 검사 중 화면 높이를 늘리지 않고 열기 전 좌표의 hit-test와 select 증가량0을 확인한다.
- 원인: 기존 locate가 뷰포트 하단을 넘는 메뉴를 위로 clamp하면서 트리거와 겹쳤다. SContextMenu/SSplitBtn 및 이를 사용하는 TimeGrid의 공유 useActionMenu 문제이며 문서 햄버거 포커스 문제와 다르다.
- 변경: 앵커 위/아래 공간을 비교해 flip, 가용 높이에서 메뉴 내부 스크롤, 항목 변경·메뉴 크기 변경 시 위치 재계산. 메뉴에만 border-box를 지정해 Vuetify 전역 reset이 없는 소비자에서도 padding/border가 제한 높이 밖으로 나오지 않게 했다. 공개 props/events/API는 그대로다.
- 실제 검증: 소스/새 tarball 설치본 각각704×797·475×750·320×640에서21배치(위·중간·아래·실기기 좌표·긴 목록·내용 높이 변경). 기존 baseline에서는 재터치 select+1, 수정본은0, 메뉴 닫힘과 트리거 포커스 복귀. 긴 목록은 내부 스크롤과End 키 도달 확인. 실제 Components Context1/Starter Split·Context2 ×3화면 총9조합에서 blank focus·외부입력 유지·Escape·선택·동일 좌표 재클릭·context key·인스턴스 유지 통과. 704 Starter/320 최소 소비자 열린 메뉴 캡처를 직접 확인했다. 높이 확대·force click을 사용하지 않았다.
- 격리 QA 사본의 새 로컬 tarball SHA256 85fd756bfcff5fb9426dad7d5e76efc2b6b8932f9e4a93b7814175e244b0a2a9. 두 내부 소비자 새 설치·타입·빌드, 공유 메뉴/TimeGrid runtime·SSR 통과. 자체 선언55개 오류0; 외부 선언769개 기존 제약은 별도다.
- 크기: ESM299602자/gzip76423B, 전체JS327603B/총gzip83705B, 전체plugin68565B로 기존 한도 이내. 8개 다른 import 통과. STimeGrid17610B는 정상17408B보다202B, 이전 산출물 한정 예외17464B보다146B 초과. 공식 게이트 exit1을 보존했고 한도·예외·hash를 변경하지 않았다. 기능검증 통과가 출시 파이프라인 통과를 뜻하지 않는다.
- canonical rc4 원본 SHA256 3d0e12e0101634cf9700112bd71e009e72b6048e6f056c39d31a350e4abbb5ed 및 릴리즈 문서/manifest/index/내부 canonical소비자 포인터는 변경하지 않았다. 이번 QA tarball은 미동결 실험 산출물이며 공개 후보를 대체하지 않는다.
- 현재 로컬 WIP만. 새 commit/push/Pages배포/npm게시/외부소비앱 변경 없음. 실제 Fold·Android IME·스크린리더 미실행. 크기 처리와 새 후보 보존·재동결/문서 정합성, 공개반영 범위 보고 후 후속 진행이 필요하다. 증거: qa-output/action-menu-focus/placement-verification.json 및 거기서 연결한 JSON/PNG. 재현 명령은 추적 중인 action-menu-focus-browser-check.mjs --placement와 action-menu-live-browser-check.mjs --local --commit=810f10bf57baded07c529142fcca12b3f38b26f0 --starter-dist=qa-output/action-menu-focus/package-validation/examples/vue-vuetify/dist 이다.


### 하단 메뉴 배치 후속 최적화 — 기준 변경 없음

- TimeGrid는 time-grid.ts:23에서 useActionMenu를 가져와270행에서 항목 수정·삭제·복제 메뉴에 사용한다. 최종 설치본 named import의 실제 번들 모듈은 solyi-ui/dist/index.js 및 core/date-only.js·icons.js다. 메뉴 popover/role/maxHeight는 남고 SContextMenu·SSplitBtn 컴포넌트 wrapper는 제거됐다. 불필요한 다른 메뉴 컴포넌트가 들어온 tree-shaking 실패가 아니다. placement-optimized-installed-size.json에 실제 모듈 경로/잔존 여부를 기록했다.
- 동작을 유지하며 동일한 opener/anchor 상태를 하나로 합치고, observer를 panel 등장 시 한 번 생성하며, 항목 변경은 Vue post-render watcher에서 처리하도록 중복 nextTick 위치 계산을 정리했다. 가용 공간의 중복 clamp도 공통 계산으로 묶었다. ResizeObserver/flip/내부 스크롤/포커스/접근성·기존 예산 검사는 유지했다.
- 단계별 TimeGrid gzip17610→17600→17598B. 마지막 값은 메모리 진단뿐 아니라 새 tarball 설치본의 공식 검사로 재확인. 최종 원본299485자/gzip76397B, 전체JS327486B/총gzip83679B, plugin68544B, 나머지8import 통과. TimeGrid만 정상17408B보다190B 초과, 이전 해시 한정17464B보다134B 초과다. 공식 검사 exit1 유지. 이전 예외를 새 hash에 적용하거나 한도를 바꾸지 않았다.
- 최적화한 소스21배치/8focus조합, 최종 tarball21배치/실제 Components·Starter9조합을 재실행해 통과. 같은 좌표 재터치 select증가0, 외부 빈 곳 복귀와 외부 입력 포커스 유지, 긴 메뉴 스크롤/End도달·메뉴 크기 변경 유지. 두 소비 fixture 새 설치·타입·빌드, 최종 메뉴/TimeGrid runtime·SSR·자체 선언55개도 통과. 로그 및 정확한 소스/후보 해시는 placement-verification.json에 있다.
- 최종 QA tarball SHA256 1fb7cfc44bc4bfe5fac992b604b896b1446ee21e6631d9ff57db98382cb1a030. 이전 rc4 및 첫 배치 검증용 tarball도 보존했다. 이 파일은 정식 동결 후보로 교체하지 않았다.
- 현재 확인한 좁은 범위의 안전한 구조 정리로는 한도에 도달하지 못했다. 배치 관찰/스크롤·포커스 기능을 삭제하거나 읽기 어려운 압축으로 바이트를 맞추지 않는다. 추가 방안은 (1) 더 큰 공통 모듈 재설계의 별도 검토·회귀 비용을 감수하거나 (2) 이 수정 산출물에만 한정해17598B 예외를 검토하는 것이다. 후자는 기존 예외보다134B 추가이지만 아직 승인/설정하지 않았다.
- 새 commit/push/공개 배포/npm/소비앱 변경 없음. 진행 중 명령 없음. 실제 Fold/Android IME/스크린리더 미실행. 공개 반영 전 크기 처리 결정·후보 보존/재동결·문서 동기화와 최종 전달 검증이 남아 있다.


### 용량 차단 폐기 — 2026-11-03 현재 정책

- 사용자 요청에 따라 [크기 측정 정책](LIBRARY-SIZE-POLICY.md)으로 전환했다. 기존 문자/raw/gzip/총JS/개별import/plugin 한도 및 해시별56B예외는 활성 설정·실패 검사에서 제거했다. 당시 한도 객체는 LIBRARY-SIZE-BUDGETS-HISTORY.json에 HEAD 원본과 동일하게 보존했다. 과거 PURE 비교의 임의50%감소 조건도 증감 보고로 바꿨으며 AST/SSR/identity/파일 검사는 유지했다.
- 17KiB는9d7145a(2026-10-29 05:02KST)에서 당시 TimeGrid실측15847B에 여유를 둔 내부값이다. 최초176000자는2a402d4(10-23), 버전별 raw/gzip 한도는4ebfa99(10-28)에 도입됐다. Git author는 사용자 명의지만 사용자가 숫자를 직접 정했다는 뜻은 아니다. 이후 일부 상향/예외 승인은 있었으나 npm플랫폼 제약이나 성능SLO에 근거한 수치는 확인되지 않았다. 상세 이력·공식npm문서와 코드 경로는 정책 문서에 있다.
- 측정 명령은 최신 QA설치본17598B(TimeGrid)/68544B(plugin)를 정상 보고하고 보존rc4대비+134/+103B를 남긴다. 다른7개import증감0. 원본 문자/byte/gzip·모든JS합계·index hash도 기록한다. 수치만으로 실패하지 않지만 공개API51개·peer외부화·정상측정·타입·빌드·기능·라이선스·무결성은 계속 필수다. CI validate→deploy 의존성을 유지했다.
- 검증: 초기 공식pipeline1~4빌드/포장 통과 후7단계 무결성에서 QA설치명령의 루트 경로 의존성이 발견돼 실패했다. 검사를 완화하지 않고 격리fixture manifest/lock의 불필요한 루트연결을 제거하고 각 fixture cwd에서 공식5~8단계를 그대로 재개해 모두 통과했다. 이전 --prefix방식의 격리 설치를 완전한 독립 설치라고 부른 것은 부정확했으며 현재 새 설치본에는 root의존성/link가 없다. 증거 로그 둘 모두 보존했다.
- 현재 npmcheck·Markdown68개/로컬링크239개 통과. 올바르게 새 설치한 예제로 Components/Starter704×797·475×750·320×640의9조합 재클릭/외부포커스/Escape/선택을 최종 재검증했다.1.0.0·1.1.0·미게시rc4 manifest/bytes/hash/integrity검증 통과. 기존 후보 및릴리즈/문서산출물 교체 없음.
- 상세: qa-output/action-menu-focus/size-policy-validation.json. 과거 PURE45종 비교 실행은 재실행하지 않았고 문법만 확인했다. 후보재동결/manifest·내부fixture·docs동기화/전체전달9~10단계/commit·push·원격CI·공개배포/실제Fold·스크린리더는 아직이다. npm1.1.1과 외부소비앱업데이트는 계속 보류. 현재 실행 중 명령은 없다.


### rc5 재동결과 최종 로컬 전달 검사

- 소스 커밋 d2acfe3 기준으로1.1.1-mobile-ui-rc5를 동결했다. 이전rc4 artifacts는 그대로 두었고 이전release-assets/docs 후보도 검증 후 QA previous-canonical-rc4/source·docs에 보존했다. 기존1.0.0/1.1.0 파일은 유지했다.
- UI SHA256 1fb7cfc44bc4bfe5fac992b604b896b1446ee21e6631d9ff57db98382cb1a030, 5990290B. 검증한 QA tarball과 바이트 동일. Core도 이전과 동일하다. 새release-assets/docs manifest·SHA256SUMS·두 내부fixture의dependency/lock·문서starter가 rc5에 일치한다.
- canonical library-pipeline --refresh --prepare-release 전체1~10단계 exit0. 실제 다운로드·API51개·타입/SSR/runtime·설치무결성/라이선스·문서생성/전체기존회귀 통과. 용량은 측정·증감 보고뿐이며 수치 예외 없음. 해당 빌드 Components/Starter9조합도 실제 높이에서 재터치/포커스 검증 통과. 로그 rc5-canonical-pipeline.log 및 rc5-canonical-browser.log.
- 아직 원격 push/CI/공개반영 전의 로컬 결과다. npm1.1.1은 사용자 직접 테스트 후 결정할 때까지 보류, 외부소비앱/실기기/스크린리더 변경·조작은 하지 않았다.

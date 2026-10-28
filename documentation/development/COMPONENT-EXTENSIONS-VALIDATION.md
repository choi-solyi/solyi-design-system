# Components · 신규/확장 API 대조

이 기록은 미게시 로컬 개발본입니다. 공개 ui.solyi.kr 1.0.0과 npm 패키지를 갱신하지 않았습니다. 이후 SMonthCalendar의 source UI와 Components/starter 연결을 구현했으며 [별도 검증 기록](MONTH-CALENDAR-VALIDATION.md)을 따릅니다. 아래 8종/16건은 당시 검증입니다. STimeGrid·SScheduler는 미착수이며 제공 중인 API로 색인하거나 예제를 만들지 않았습니다.

## 항목별 연결

모든 항목은 Components 메뉴, 정확한 API명과 한국어 검색, deep link, Examples/Sample Code/API 패널, 독립 실행 링크를 갖습니다. 아래 starter 경로는 `/starter/` 뒤의 query입니다. 기본 starter에서도 신규·개선 예제와 정렬 목록 섹션으로 접근합니다.

| 항목 | Components 경로 | starter / 동일 예제 소스 | 추가 API 대조 및 실제 조작 |
|---|---|---|---|
| SChip | #component/schip | ?view=recipes&example=buttons · recipes/buttons.vue | selected/removable/disabled, update:selected/click/remove, default/leading/trailing 슬롯; 선택·제거 |
| SBadge | #component/sbadge | 같은 buttons 예제 | content/label/live, default/anchor 슬롯; 설명 연결과 숫자·의미색 |
| SIcon | #component/sicon | 같은 buttons 예제 | name/label/decorative/size/rotate, 슬롯·이벤트·메서드 없음; SVG 이름·장식 |
| SIconBtn | #component/sicon-btn | 같은 buttons 예제 | SBtn 재사용, icon/label/loading/disabled, click/default; 저장·loading·완료 |
| SDatePicker | #component/sdate-picker | ?view=recipes&example=inputs&part=date · recipes/inputs.vue | displayFormatter와 기존 change/focus/validate/clear; ISO 입력·요일 표시·모델 보존 |
| SNumberInput | #component/snumber-input | ?view=recipes&example=advanced-inputs&part=number · recipes/advanced-inputs.vue | presets/formatValue/unit, presets 슬롯, change/focus/validate; 6 preset·6.0 표시/숫자 6 |
| STimePicker | #component/stime-picker | ?view=recipes&example=time · recipes/time.vue | manual/list/initial/current/scrub 옵션, preview/interactionCommit/interactionCancel, 기존 change/focus/validate/clear; 선택·위치·입력·취소 |
| SSortableList | #component/ssortable-list | ?view=advanced&example=advanced-vue&part=sortable · AdvancedExamples.vue | readonly T[]/itemKey/itemLabel, typed 제안 이벤트, item/handle-icon/empty/help, focus(key?)/cancel; 부모 수락/거부·키보드·이동 버튼·pointer |

## 코드와 문서 일치

[build-component-api.mjs](../../scripts/build-component-api.mjs)는 runtime props/events/expose와 공개 타입에서 메타데이터를 생성합니다. Sortable의 generic props/event/slot scope와 선택 인수 `focus(key?)`도 공개 인터페이스와 대조합니다. 존재하지 않는 label 슬롯은 추가하지 않습니다. [component-api-check.mjs](../../scripts/component-api-check.mjs)는 전체 43개 계약을 검사합니다. 기존 38종과 먼저 추가한 4종의 이름·export/plugin 등록 회귀도 유지합니다.

[component-extension-coverage-check.mjs](../../scripts/component-extension-coverage-check.mjs)는 8개 항목의 메뉴·라우트·검색·추가 API·세 패널을 검사합니다. Sample Code는 실제 소비 앱 정본과 바이트가 같고 Examples의 view/example/part와 코드 하단 실행 링크가 같습니다. 새 문서용 복사 예제를 만들지 않습니다.

전체 문서 검색에서는 SIcon의 한국어 이름 ‘아이콘’과 Style의 ‘아이콘’이 모두 정확히 일치합니다. 기존 동률 순서를 유지하고 둘 다 표시합니다. 전체 색인을 사용하는 doc-search-check는 8개 API명은 첫 결과, 한국어 이름은 정확 일치 결과 포함을 검사합니다. Components만 추출한 검사로 전체 검색 순위를 보장한다고 주장하지 않습니다.

## 브라우저 검증

[component-extensions-browser-check.mjs](../../scripts/component-extensions-browser-check.mjs)는 격리 Chrome과 localhost에서 320/1440px × 8개 항목, 총 16개 연결을 확인했습니다. 실제 검색 결과 이동, iframe 실행·대표 조작, API 탭, 정본 Sample Code, standalone 링크의 화면 제목과 browser title까지 통과했습니다. Sortable은 부모가 제안을 반영할 때와 거부할 때의 확정 순서를 구분해 확인했습니다.

추가로 [starter 점검](STARTER-UPDATES-VALIDATION.md)의 36개 헤더/nav 조합과 부품·입력 옵션 검사, Sortable의 72개 appearance/locale/폭 조합을 별도로 검사합니다. 화면 크기나 터치 에뮬레이션을 물리 기기·스크린리더·Safari 검증으로 표현하지 않습니다.

증거는 qa-output/component-extensions-browser/report.json, qa-output/sortable-browser/report.json와 각 실행 로그입니다. 최종 설치 소비 검증은 별도 checkout과 개발 tarball로 수행합니다. 동결 1.0.0 hash 게이트·외부 선언 769건은 제거하거나 완화하지 않으며 [입력 확장 검증 기록](INPUT-EXTENSIONS-VALIDATION.md)과 구분해 결과를 남깁니다.

1815de3 설치본에서도 위 16개 연결을 재통과했습니다. [설치 소비 검증](SORTABLE-INSTALLED-VALIDATION.md)에 완료 결과, 동일한 외부 진단 집합과 두 gate 실패를 기록했습니다.

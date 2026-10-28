# UI 데모 · starter 반영 점검

이 문서는 로컬 변경과 검증 기록입니다. npm 게시·운영 사이트 배포·외부 소비 프로젝트 갱신은 하지 않았습니다. 공개 1.0.0에 이번 확장이 반영됐다는 뜻이 아닙니다.

## 바로가기와 화면 이름

사용자가 승인한 명칭은 헤더 **UI 데모**, 화면 주제목 **컴포넌트 미리보기**입니다. site/index.html의 header-actions 안에 native link를 추가해 ./starter/로 연결했습니다. 링크 의미·Tab/Enter를 유지하며 기존 검색·설정·테마·밀도·모드 컨트롤을 제거하지 않았습니다. starter index.html의 browser title은 Solyi · 컴포넌트 미리보기입니다.

starter의 기존 9개 섹션 href는 유지하고 신규·개선 예제와 정렬 목록 항목을 추가해 총 11개입니다. anchor에 기존 Core sol-button 스타일을 사용하고 starter-example-nav 내부의 간격·줄바꿈만 조정했습니다. 다른 본문·라이선스 링크의 밑줄을 일괄 제거하지 않습니다. recipes와 advanced 독립 화면도 같은 주제목을 사용합니다.

## 항목별 대조

조사 시 확장 예제는 ?view=recipes 경로에는 있었지만 /starter/ 기본 화면에는 이전 기본 예제가 중심이었습니다. App.vue의 starter-updates에서 같은 정본 recipe를 재사용해 기본 진입점에서도 확인할 수 있게 했습니다.

| 항목 | 패키지 구현 | starter 예제 | 실제 동작 검증 | 공개 배포 |
|---|---|---|---|---|
| SChip | primitives.ts, root export/global | recipes/buttons.vue, 기본 화면의 신규·개선 예제 | controlled 선택·제거·포커스 결과 | 미반영 |
| SBadge | primitives.ts, 표시·anchor scope | 같은 buttons 예제, 의미색·숫자 anchor | 표시와 연결, 버튼에 대한 설명 | 미반영 |
| SIcon | 기존 solIconPaths 기반 | 같은 buttons 예제, label/decorative/회전 | 의미 있는 SVG 이름, 장식 아이콘 | 미반영 |
| SIconBtn | SBtn 재사용 | 같은 buttons 예제, tooltip/save/disabled | 클릭·loading·완료, 비활성 | 미반영 |
| SDatePicker | displayFormatter, ISO 보존 | recipes/inputs.vue의 part=date | mode 전환·요일 표시, 표시가 바뀌어도 ISO 완료값 유지 | 미반영 |
| SNumberInput | presets/formatValue/unit | recipes/advanced-inputs.vue의 part=number | preset 6·off-grid 5 비활성·표시 6.0/모델 6 | 미반영 |
| STimePicker | manual/list/initial/current/scrub 옵션 | recipes/time.vue | 초기 09:07·현재 시각 위치·선택/비우기·manual·scrub preview/commit | 미반영 |
| SSortableList | generic 공개 타입·root/plugin/global 등록, controlled 목록 | AdvancedExamples.vue의 sortable, 기본 화면 #advanced-sortable-title, ?view=advanced&part=sortable | source runtime·정상/오류 SFC·Chrome 72조합, 실제 키보드·이동 버튼·pointer·취소·자동 스크롤 | 미반영 |
| SMonthCalendar / STimeGrid | 미착수 | 없음 | 미실행 | 미반영 |

파일 기준은 packages/vue-ui/src/primitives.ts·date-time.ts·controls.ts, examples/vue-vuetify/src/App.vue 및 위 recipes입니다. root를 보완하면서 canonical examples와 다른 복사본을 만들지 않았습니다.

숫자 formatter 예제는 minimumFractionDigits만 주면 기존 formatSolNumber의 최대 유효숫자 기본값과 우선순위가 겹쳐 6으로 보였습니다. 예제 callback에서 Intl.NumberFormat의 소수 1자리 옵션을 명시해 실제 표시 차이를 만들었습니다. 패키지의 기존 formatSolNumber 계약은 변경하지 않았습니다. scoped number 예제에도 숫자 모델 출력이 보이도록 보완했습니다.

TimePicker 예제에는 scrollToCurrentTime과 scrubPixelsPerStep 조작이 빠져 있어 체크박스·초기 위치 입력·간격 제어를 추가했습니다. 유효한 선택 모델이 초기 위치보다 우선하므로 값을 비우고 다시 열어 확인하도록 안내합니다. 기존 native 예제도 그대로 남깁니다.

## 검증

검증 checkout solyi-ui-phase2-verify에 실제 설치된 개발 tarball을 사용했습니다. 현재 canonical 30개 SFC의 타입·strict template 검사와 starter/docs 빌드를 통과했습니다. 기존 header-preferences 및 installed starter-runtime 검사도 통과했습니다. 500kB 초과 chunk 경고는 남으며 제한을 완화하지 않았습니다.

[실제 브라우저 검사](../../scripts/starter-updates-browser-check.mjs)는 새 격리 Chrome에서 localhost만 사용합니다. 320/768/1440 × 3테마 × 2모드 × 2density, 총 36개 header/nav 조합에서 링크·키보드·포커스·touch target·줄바꿈·overflow를 확인했고, 각 폭에서 위 신규 부품과 입력 옵션의 실제 조작을 통과했습니다. 물리 터치·스크린리더는 미검증입니다.

로컬 증거는 qa-output/starter-updates-browser/의 report.json·스크린샷과 별도 검증 checkout의 qa-output/starter-updates-*.log에 있습니다. 배포 게이트 및 외부 선언 769건의 동일 baseline 비교는 [입력 확장 검증](INPUT-EXTENSIONS-VALIDATION.md)에 기록되어 있으며 그대로 유지합니다.

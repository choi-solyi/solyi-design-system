# TimePicker 확장 · 미게시

현재 작은 단위는 native 호환을 유지한 직접 입력 제어·목록·초기 위치·키보드입니다. scrubbing과 preview/gesture commit/cancel 이벤트는 다음 단위이며 아직 공개하지 않았습니다. npm 1.0.0에는 새 옵션이 없습니다.

## 추가 API

| prop | 기본값 | 계약 |
|---|---|---|
| allowManualInput | true | false면 직접 타이핑을 막되 팝업 선택·clear는 허용 |
| presentation | native | `SolTimePresentation = 'native' \| 'list'`. 기본 두 native select를 유지 |
| initialScrollValue | 없음 | list를 열 때 별도 위치 기준. 값을 선택하거나 모델을 갱신하지 않음 |
| scrollToCurrentTime | false | 선택값·별도 기준이 없으면 브라우저 현재 시각에 가까운 항목으로 이동 |

기존 modelValue/min/max/step, common field props, update:modelValue/change/invalid/open/close와 focus/validate/resetValidation/clear handle은 유지합니다. change payload는 계속 string/null입니다. 새 필수 locale 키·공통 토큰·의존성은 없습니다.

## 입력·폼·readonly

readonly는 종전처럼 입력과 팝업 선택·clear를 모두 막습니다. allowManualInput=false와 혼동하지 마세요. disabled는 포커스·변경과 native 폼 제출 참여를 막습니다.

직접 입력을 끄면 보이는 text input은 readonly가 됩니다. 이때도 선택 가능한 required 필드의 native 폼 검증이 사라지지 않도록 이름 없는 검증용 입력을 연결합니다. 해당 입력은 Tab 순서·보조 기술·제출 데이터에서 제외하고, 오류가 나면 보이는 입력과 오류 문구로 연결합니다. name/form은 기존 보이는 HH:mm 입력에서 제출되며 중복 필드는 생기지 않습니다. 일반 native 기본 모드의 DOM·검증 동작은 바꾸지 않습니다.

## 목록과 초기 위치

선택 가능한 시각은 종전과 같이 min을 시작점으로 step씩 증가하며 max 이하인 마지막 값까지입니다. 예를 들어 min=09:07, max=10:00, step=15는 09:07/09:22/09:37/09:52입니다. 자정 기준으로 재정렬하거나 허용 범위를 넘는 값을 생성하지 않습니다.

처음 위치는 유효한 현재 선택 → initialScrollValue → 선택적 현재 시각 → 첫 허용값 순서입니다. 별도 기준은 가장 가까운 허용값으로 이동하며 동률은 뒤쪽 값을 택합니다. 잘못된 별도 문자열은 다음 기준으로 넘어갑니다. native presentation에는 임의 스크롤 위치를 강제로 적용하지 않습니다. 현재 시각은 UI 위치 계산에만 쓰며 timezone 변환·알림 예약·서버 저장은 수행하지 않습니다.

열기·초기 위치 계산·탐색 자체는 update/change를 보내지 않습니다. 모델이 비어 있어도 위치를 잡기 위해 첫 값을 자동 선택하지 않습니다. 수동 입력 draft의 blur 검증은 종전처럼 별도 확정 경로입니다. 목록의 선택·완료를 실행할 때는 기존 commit 경로를 사용합니다. 잘못된 설정으로 목록이 비면 기존 locale의 noResults를 안내하고 완료 행동을 막습니다.

## 키보드·초점

- Alt+ArrowDown으로 열고 목록으로 초점을 이동합니다.
- ArrowUp/Down 한 항목, Home/End 경계, PageUp/Down 열 항목을 이동합니다. 탐색 위치는 선택값과 별개입니다.
- Enter/Space 또는 항목 클릭으로 값을 확정하고 close(select)를 보냅니다. 완료 버튼도 현재 탐색 항목을 선택합니다.
- Escape는 모델을 바꾸지 않고 닫으며 실행 요소로 초점을 돌립니다. 바깥 클릭은 새로 이동한 포커스를 빼앗지 않습니다.
- locale 변경은 열린 목록·탐색 위치·초점·모델을 초기화하지 않습니다. min/max/step이 바뀌면 탐색 위치만 유효한 위치로 복구하며 모델을 자동 보정하지 않습니다.

listbox/option의 active descendant와 aria-selected를 분리하고 선택값에는 체크도 표시합니다. 목록 안에서는 native 세로 스크롤을 사용하며 페이지 바깥 영역의 스크롤은 잠그지 않습니다. 긴 목록도 하루 범위의 최대 1,440개 항목으로 제한됩니다.

실제 native/목록 예제는 [time.vue](../../examples/vue-vuetify/src/recipes/time.vue)입니다.

## 검증·다음 단위

[런타임 검사](../../scripts/time-list-runtime-check.mjs)의 source 실행, 기존 입력·TimePicker source 회귀, UI 빌드 및 자체 선언 25개/negative fixture가 통과했습니다. [격리 Chrome](../../scripts/time-list-browser-check.mjs)에서는 최신 dist를 사용해 320/768/1440 × 3테마 × light/dark × 2밀도 × ko/en의 72개 조합에서 초기 위치의 실제 가시성·스크롤, keyboard/선택/초점, native required·제출, readonly/disabled, 현재 시각 기준과 바깥 페이지 스크롤을 확인했습니다. 320px tap은 에뮬레이션이며 실제 모바일·화면 낭독기는 미검증입니다.

새 tarball의 설치 소비와 전체 배포 파이프라인은 아직 실행하지 않았습니다. 기존 동결 1.0.0 검사와 버전·릴리스 파일은 유지합니다. 다음 단위는 입력/목록의 별도 opt-in scrub handle, pointer capture·cancel·Escape·경계·페이지 스크롤, 모델을 바꾸지 않는 preview와 최종 commit 구분입니다.

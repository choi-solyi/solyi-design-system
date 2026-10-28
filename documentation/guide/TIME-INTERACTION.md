# TimePicker 확장 · 미게시

native 호환을 유지한 직접 입력 제어·목록·초기 위치·키보드 및 별도 opt-in 스크러빙을 추가합니다. npm 1.0.0에는 새 옵션이 없습니다.

## 추가 API

| prop | 기본값 | 계약 |
|---|---|---|
| allowManualInput | true | false면 직접 타이핑을 막되 팝업 선택·clear는 허용 |
| presentation | native | `SolTimePresentation = 'native' \| 'list'`. 기본 두 native select를 유지 |
| initialScrollValue | 없음 | list를 열 때 별도 위치 기준. 값을 선택하거나 모델을 갱신하지 않음 |
| scrollToCurrentTime | false | 선택값·별도 기준이 없으면 브라우저 현재 시각에 가까운 항목으로 이동 |
| scrubbable | false | 입력 옆 전용 손잡이. 위로 드래그하면 증가 |
| listScrubbable | false | list의 행별 전용 손잡이. 목록 본문은 일반 스크롤 유지 |
| scrubPixelsPerStep | 없음 | 입력 손잡이의 양수 px/step. 생략 시 control 높이의 1/4, 유효하지 않은 값은 10px |

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

## 스크러빙 · preview/commit/cancel

조작 중 입력 draft와 named FormData 값은 그대로 두고 별도 output에 미리보기를 표시합니다. 목록에서는 active 행만 움직이고 aria-selected는 확정 모델을 유지합니다. 포인터 release 또는 입력 손잡이의 키 release에서 기존 commit 경로로 확정합니다. 값이 바뀐 경우 기존 update/change는 한 번 발생합니다. 입력 손잡이 단순 탭은 자동 선택하지 않으며, 목록 손잡이 탭은 해당 행을 선택합니다.

새 이벤트는 스크러빙 전용입니다. 일반 타이핑·native select·행 클릭·기본 목록 키보드 선택은 기존 이벤트를 유지합니다.

```ts
interface SolTimeInteraction {
  source: 'input' | 'list'
  input: 'pointer' | 'keyboard'
  previousValue: string | null // 시작 시 controlled 모델
  value: string               // 허용 그리드의 HH:mm 제안
}
interface SolTimeInteractionCancel extends SolTimeInteraction {
  reason: SolTimeCancelReason
}
```

| event | payload | 시점 |
|---|---|---|
| preview | SolTimeInteraction | 허용 제안이 바뀔 때. 목록 시작 행도 제안 |
| interactionCommit | SolTimeInteraction | 조작 완료. 모델과 같아도 완료 자체는 알림 |
| interactionCancel | SolTimeInteractionCancel | escape/pointercancel/capture/blur/disabled/configuration/external/close/unmount |

세 타입은 root에서 개별 import할 수 있습니다. preview를 controlled 모델에 되돌려 넣지 마세요. 부모가 모델을 바꾸면 외부 변경으로 현재 조작을 취소합니다. 경계·step·조작 옵션 변경도 취소합니다. 취소는 모델/change를 쓰지 않습니다. 드래그 시작으로 입력에서 손잡이로 포커스를 옮길 때는 blur로 draft를 확정하지 않으며, 취소하면 이전 draft와 선택 범위를 복원합니다. 일반 수동 draft의 blur 검증은 기존 동작입니다.

포인터 identity·capture를 사용하고 capture 상실, 창 blur/숨김, 컴포넌트 해제 시 listener와 자동 스크롤 RAF를 정리합니다. 경계의 초과 이동량을 버려 반대 이동이 바로 반영됩니다. 목록 가장자리에서 실제 행 높이 기준으로 자동 스크롤합니다. 전용 손잡이만 touch-action:none이며 body 스크롤은 잠그지 않습니다.

입력 손잡이는 이름 있는 spinbutton입니다. 화살표 한 단계, Shift/페이지 키 열 단계, Home/End 경계로 preview하며 키를 놓으면 확정합니다. Escape는 취소하고 이전 포커스·선택을 복원합니다. 목록 손잡이의 키보드 대안은 기존 listbox 탐색입니다. 조작 중 첫 Escape는 취소하고 목록을 유지하며, 다음 Escape는 닫습니다. 창 blur·disabled·unmount에서는 포커스를 빼앗지 않습니다.

readonly/disabled/빈 그리드는 입력 손잡이를 Tab에서 제외합니다. loading처럼 의미 없는 prop은 추가하지 않습니다. 기존 error·required·form 컨텍스트와 테마·light/dark·density·control 높이·focus 토큰을 사용하며 새 토큰·의존성은 없습니다. 긴 label은 줄바꿈하고 320px 가로 overflow를 막습니다.

새 locale 키 timeScrub/timeScrubKeys/timePreview/timeScrubCancelled는 기존 전체 SolLocale 객체의 소스 호환성을 위해 optional입니다. ko/en 기본값·부분 override를 지원하며 locale 변경은 모델·초점을 초기화하지 않습니다.

## 검증·다음 단위

[런타임 검사](../../scripts/time-list-runtime-check.mjs)의 source 실행, 기존 입력·TimePicker source 회귀, UI 빌드 및 자체 선언 25개/negative fixture가 통과했습니다. [격리 Chrome](../../scripts/time-list-browser-check.mjs)에서는 최신 dist를 사용해 320/768/1440 × 3테마 × light/dark × 2밀도 × ko/en의 72개 조합에서 초기 위치의 실제 가시성·스크롤, keyboard/선택/초점, native required·제출, readonly/disabled, 현재 시각 기준과 바깥 페이지 스크롤을 확인했습니다. 320px tap은 에뮬레이션이며 실제 모바일·화면 낭독기는 미검증입니다.

[스크러빙 런타임](../../scripts/time-scrub-runtime-check.mjs)은 모델·폼 값을 쓰지 않는 preview, 최종 1회 commit, 8가지 취소 경로, 포인터 identity·경계 반전·draft blur·포커스와 선택 복원·locale/readonly·목록 취소·listener 정리를 통과했습니다. 자체 선언은 26개와 negative fixture가 통과했습니다. [스크러빙 Chrome](../../scripts/time-scrub-browser-check.mjs)은 현재 dist의 72개 테마/밀도/locale/폭 조합에서 실제 capture/release·폼 값 유지·키 반복 commit·Escape 선택 복원·목록 가장자리 자동 스크롤 취소·페이지 스크롤을 확인했습니다. 320px touch는 Chrome 에뮬레이션이며 input commit/pointercancel과 목록 본문 pan을 확인했습니다.

새 tarball의 설치 소비와 전체 배포 파이프라인은 다음 검증 단위입니다. 물리 터치 기기·스크린리더는 미검증입니다. 동결 1.0.0 검사와 버전·릴리스 파일을 유지하며 npm 게시·push·운영 배포·외부 소비 프로젝트 수정은 하지 않습니다.

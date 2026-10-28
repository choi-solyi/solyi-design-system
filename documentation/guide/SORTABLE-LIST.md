# SSortableList · 미게시

임의 객체의 순서를 한 목록 안에서 바꾸는 controlled 컴포넌트입니다. 부모의 배열과 객체를 직접 수정하지 않습니다. 포인터·키보드 조작 중에는 삽입 위치와 preview만 바꾸고, 확정 시 새 배열을 제안합니다. 부모가 반영하지 않으면 원래 순서가 남습니다. 교차 목록·트리·가상 목록·업무별 정렬 규칙은 제공하지 않습니다.

## API

| prop | 계약 |
|---|---|
| id / label | 고유 ID와 목록 이름, 필수 |
| modelValue | readonly T[], 필수. update:modelValue는 새 T[] |
| itemKey | (item:T) => string \| number, 필수. 안정적이고 중복 없는 key |
| itemLabel | (item:T) => string, 필수. 비어 있지 않은 조작 안내 이름 |
| isItemDisabled | (item:T) => boolean, 선택. 해당 항목 자체의 이동을 막음 |
| disabled / readonly | 조작 비활성 / 보기 전용. 목록의 이동 컨트롤을 막음 |
| help / error / locale | 표시용 안내·외부 오류·부분 locale override |

itemKey/itemLabel/isItemDisabled는 순수 함수여야 합니다. key getter 오류·중복 key·비유한 number·잘못된 모델·빈 이름·disabled callback 예외/boolean 이외 반환은 조작을 막고 오류를 표시합니다. number 1과 string '1'은 다른 key입니다. index를 stable key 대신 사용하지 마세요.

isItemDisabled는 그 항목을 이동 원본으로 삼는 손잡이·이동 버튼을 막습니다. 다른 항목이 앞뒤로 지나가면서 해당 항목의 index가 바뀔 수 있으며 절대 위치를 고정하는 API는 아닙니다. 조작 중인 항목이 disabled로 바뀌면 모델 쓰기 없이 취소하고 가능한 다른 손잡이로 초점을 옮깁니다. slot scope의 disabled로 본문 동작을 직접 제어할 수 있습니다. slot 내부 입력·링크를 자동 비활성화하지 않습니다.

loading/required/rules/name은 이 목록 자체에 의미가 없어 추가하지 않았습니다. SForm 검증 필드로 등록하지 않습니다. slot 안 입력·링크의 disabled/readonly 상태는 소비자가 소유합니다.

| event | 의미 |
|---|---|
| start | 키보드·포인터 조작 시작. 이동 버튼은 바로 확정 |
| preview | SolSortableProposal<T>. 원본 순서와 모델을 쓰지 않는 위치 제안 |
| update:modelValue | 순서가 달라진 최종 T[] |
| change | 최종 순서가 달라질 때 한 번, items/key/from/to/input |
| end | status가 commit/unchanged/cancel. cancel은 reason 포함 |

input은 keyboard/pointer/button이며 from/to는 0 기반입니다. 제안 배열은 새 배열이지만 각 항목은 원본 객체 identity를 유지합니다. 이벤트마다 별도 배열을 보내므로 preview 배열을 소비자가 수정해도 다음 계산과 원본은 보호됩니다. preview를 모델에 되돌려 넣으면 외부 변경으로 현재 조작이 취소됩니다.

#item, #handle-icon은 item/index/key/active/disabled를 받습니다. #handle-icon은 장식만 교체하며 실제 button과 이벤트·이름은 컴포넌트가 소유합니다. #empty와 #help도 제공합니다. #label은 제공하지 않습니다. handle은 focus(key?)와 cancel()입니다.

개별 import와 SolyiUI 전역 등록을 모두 지원하며 generic props/slots/events 타입을 보존합니다. template ref는 SolSortableHandle을 명시할 수 있습니다. render 함수에서 항목 타입을 명시하려면 SSortableList<Item>을 사용합니다. SolSortableProps/Slots/ItemScope/Proposal/End/CancelReason/Handle 등 타입은 root에서 import할 수 있습니다.

## 키보드·터치·포인터

손잡이에서 Space/Enter로 시작하고 ArrowUp/Down·Home/End로 위치를 제안합니다. Space/Enter로 확정, Escape로 취소합니다. Tab은 취소한 뒤 정상 탐색을 계속합니다. native 위/아래 이동 버튼으로 드래그 없이 탭해 이동할 수 있습니다. 입력·링크 등 본문 조작은 손잡이의 키보드나 드래그를 시작하지 않습니다.

포인터는 손잡이에서만 시작하고 control 높이를 기준으로 한 이동 임계값 이후 start를 보냅니다. 단순 탭은 모델을 선택하지 않습니다. source 행을 임시로 재배치하지 않으며 이동 전·후 위치에 삽입 표시를 그립니다. 손잡이만 touch-action:none이고 목록 본문과 페이지는 일반 pan/scroll을 유지합니다. 스크롤 가능한 가장 가까운 조상 또는 window 경계에서 자동 스크롤합니다.

Escape/Tab/pointercancel/capture 상실/창 blur·숨김/disabled·readonly/정렬에 영향을 주는 설정 변경/외부 배열·객체 identity·key 변경/API cancel/unmount로 취소합니다. locale나 본문 label만 바뀌면 조작을 유지합니다. 목록의 가로 경계 바깥에서 놓아도 취소합니다. 원본 모델을 복구하느라 쓰지 않으며 listener·capture·RAF를 정리합니다. 취소·확정 후 stable key에 포커스를 복원하고, 삭제된 key는 남은 손잡이로 이동합니다. 사용자가 밖으로 옮긴 포커스는 빼앗지 않습니다.

native list/li/button, aria-pressed, polite 상태 안내를 사용합니다. listbox 안에 interactive 자식을 넣거나 deprecated drag ARIA 속성을 사용하지 않습니다. 기존 토큰의 control 높이·space·surface·border·selected·focus를 재사용하고 ko/en, 3테마, light/dark, 2density, 긴 텍스트와 320px을 지원합니다. 새 외부 의존성과 라이선스는 없습니다.

## 예제와 검증

실제 예제는 [AdvancedExamples.vue](../../examples/vue-vuetify/src/AdvancedExamples.vue)의 sortable 부분입니다. starter의 #advanced-sortable-title 및 ?view=advanced&part=sortable에서 같은 소스를 실행합니다. Components의 Sortable List 카드도 동일한 Examples/Sample Code/API와 실행 링크를 사용합니다.

기초 helper 140개 조합, frozen 객체/identity·잘못된 key, runtime 취소·포커스·controlled 거부, strict generic 정상/오류 SFC, 실제 Chrome 72개 테마/모드/density/locale/폭 조합을 확인합니다. Chrome은 실제 Space/Enter/Tab과 pointer capture, nested/window 자동 스크롤·취소를 검사하며 320px touch emulation으로 탭·드래그·pointercancel·본문 pan을 구분합니다. 물리 터치 기기·스크린리더·Safari는 미검증입니다.

패키지와 운영 문서의 버전은 아직 1.0.0으로 동결되어 있습니다. 개발 tarball을 공개 1.0.0 대신 덮어쓰지 않습니다. npm 게시·원격 push·운영 배포·외부 소비 프로젝트 갱신은 별도 승인 전까지 하지 않습니다. 외부 선언 769건과 동결 hash 게이트는 [입력 확장 검증](../development/INPUT-EXTENSIONS-VALIDATION.md)의 제약을 유지합니다.

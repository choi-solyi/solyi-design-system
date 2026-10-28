# SSortableList 구현 단위 · 승인 범위 진행

입력 확장 이후의 승인된 단계입니다. 착수 시 개발본의 42개 컴포넌트에는 임의 객체의 순서를 controlled로 바꾸는 목록이 없었습니다. 아래 첫 단위/WIP는 그 시점의 기록입니다. 현재 로컬 개발본에는 SSortableList를 추가해 43개가 등록되며 공개 1.0.0은 변경하지 않았습니다. SDataTable의 열 정렬은 이 기능을 대신하지 않습니다.

## 현재 완료 범위

공개 export·타입·plugin/global 등록, generic 슬롯과 이벤트, 키보드·이동 버튼·포인터 및 touch emulation, 외부 변경 취소·포커스·nested/window 자동 스크롤을 구현했습니다. source와 설치본 runtime, strict 정상/오류 SFC, 72개 실제 Chrome 조합과 8개 Components 카드의 메뉴·검색·실행 예제·Sample Code·API 연결을 통과했습니다. 설치 검증은 종료했으며 [기록](SORTABLE-INSTALLED-VALIDATION.md)에 크기 한도 실패·동결 1.0.0 gate 실패·외부 선언 비교를 구분했습니다. 이후 [항목별 disabled 보완](SORTABLE-ITEM-DISABLED-VALIDATION.md)을 source·타입·실제 Chrome에서 검증했습니다. 최종 계약은 [사용 안내](../guide/SORTABLE-LIST.md)를 기준으로 합니다.

## 제안 계약

SSortableList는 임의 객체 T의 readonly 배열을 받습니다. itemKey(item)는 안정적인 string/유한 number 식별자를, itemLabel(item)은 손잡이·이동 버튼·상태 안내용 이름을 제공합니다. label/id/locale 및 표시용 help/error, disabled/readonly는 기존 표시 컴포넌트와 같은 의미입니다. 배열과 객체를 직접 수정하지 않고 새 배열에서도 원본 객체 identity를 유지합니다.

modelValue의 원본 순서가 확정 상태입니다. 조작 중에는 별도 이동 위치·삽입 표시·preview 제안만 바꿉니다. drop/키보드 확정/이동 버튼에서 순서가 달라진 경우에만 update:modelValue(새 배열)와 change(제안)를 보냅니다. 부모가 제안을 무시하면 기존 순서가 유지됩니다. 외부 배열·객체 identity·key가 바뀌면 현재 조작을 취소하여 오래된 snapshot을 덮어쓰지 않습니다.

| 항목 | 제안 | 검증 포인트 |
|---|---|---|
| modelValue | readonly T[] | 원본 배열·객체 불변, 부모 거부·외부 갱신 |
| itemKey | (item:T) => string \| number | 중복·getter 예외·비유한 number, number/string 구분 |
| itemLabel | (item:T) => string | 실제 항목을 포함한 접근 가능한 이름, 빈 이름 안전 처리 |
| #item | item/index/key/active scope | 임의 콘텐츠·긴 텍스트·행 안 입력/링크 유지 |
| #handle-icon | 장식만 교체 | 실제 button과 이벤트·이름은 컴포넌트가 소유 |
| #empty | 빈 목록 설명 | 기본 ko/en fallback |
| start / preview / end | typed 조작 lifecycle | end는 commit/unchanged/cancel 및 취소 사유 구분 |
| change | items/key/from/to/input 제안 | 최종 순서가 바뀔 때만 한 번 |
| expose | focus(key?) / cancel() | validate/clear 같은 폼 의미를 추가하지 않음 |

generic T 추론을 개별 import·전역 등록·typed slot·이벤트에서 검증했습니다. Vite 라이브러리는 TS entry를 유지하고 generic call/slot context 계약으로 추론을 보존합니다. 새 SFC compiler 의존성과 any 우회는 추가하지 않았습니다.

## 조작·상태

기본 DOM은 이름 있는 목록과 li, 별도 손잡이 button·위/아래 이동 button·본문 slot입니다. interactive 자식을 넣을 수 있도록 option/listbox 역할이나 중첩 button을 강제하지 않습니다. 손잡이에서만 drag를 시작하고 본문 링크·선택·입력·터치 pan은 유지합니다. 이동 버튼은 드래그 없이 탭으로 순서를 바꾸는 대안입니다.

손잡이 Space/Enter로 시작, ArrowUp/Down·Home/End로 이동 제안, Space/Enter 확정, Escape 취소를 제공합니다. Tab은 취소 후 정상 탐색을 계속합니다. key 기반 포커스 복원과 polite 상태 안내를 사용하고 deprecated drag ARIA 속성에 의존하지 않습니다. readonly는 보기 전용, disabled는 조작 비활성입니다. loading/required/rules/name은 이 목록 자체에 의미가 없어 추가하지 않습니다. 로딩·서버 오류는 소비 앱의 SProgress/SAlert 등으로 합성할 수 있습니다.

포인터는 primary identity·capture·이동 임계값을 사용합니다. pointercancel/capture 상실/Escape/창 blur·숨김/외부 모델 변경/설정 변경/disabled·readonly/unmount에서 취소하고 listener·RAF를 정리합니다. 손잡이만 touch-action:none이며 본문·페이지를 전역 잠그지 않습니다. 스크롤 가능한 조상 또는 window의 보이는 경계에서 실제 geometry를 기준으로 자동 스크롤합니다. 첫 구현은 세로 목록 한 개 안의 이동이며 교차 목록·트리·가상 목록·업무별 정렬 규칙은 별도 범위입니다.

기존 control 높이·space·border·surface·selected·focus·motion 토큰을 재사용합니다. ko/en 안내는 optional locale 키로 추가하여 기존 SolLocale 객체를 보존합니다. light/dark·3테마·2density·320px·긴 텍스트·빈/단일/다수 목록·reduced-motion을 확인합니다. 새 유료 의존성·credential·권한 확대는 없습니다. 자체 코드와 기존 Vue/아이콘/토큰만 사용하므로 새 외부 라이선스 유입도 없습니다.

## 독립 완료 단위

1. identity snapshot·불변 이동 제안 helper와 frozen 배열/임의 객체/유효하지 않은 key 검증. 아직 공개 컴포넌트로 등록하지 않습니다.
2. generic 공개 타입 proof, 목록·slot·이동 버튼·키보드·cancel/focus. source 런타임·negative 타입·실제 SFC 예제를 함께 완료합니다.
3. 포인터·터치 에뮬레이션·nested/window 자동 스크롤·capture 상실·외부 변경 취소. 합성 DOM과 격리 Chrome을 구분합니다.
4. 공개 export/global/plugin 등록, 기존 38+4 목록을 보존한 신규 1개 검증, 문서·예제·설치 소비. minor 버전 제안까지만 하며 npm 게시·push·운영 배포·외부 소비 프로젝트 갱신은 하지 않습니다.

각 단계는 자체 빌드·테스트·문서 기록과 로컬 commit을 남깁니다. 물리 터치·화면 낭독기·Safari를 실행하지 않았다면 완료로 표기하지 않습니다. MonthCalendar와 TimeGrid는 이후 별도 설계 단위입니다.

## 첫 단위 진척

내부 sortable-values.ts에 stable key snapshot·외부 변경 감지·불변 이동 제안을 구현했습니다. [단위 검사](../../scripts/sortable-values-check.mjs)는 frozen 객체의 identity, number/string key 구분·중복·getter 예외·비유한 값·희소 배열, 제안 배열을 소비자가 변경해도 원본 보존, 외부 교체/재정렬/재key, 140개 이동 조합과 strict generic/negative 타입을 통과했습니다. key callback이 원본 배열을 늘려도 반복은 초기 snapshot 길이로 제한하며 잘못된 snapshot을 거부합니다. UI 패키지 빌드도 통과했습니다.

이 helper는 root export/plugin/global에 아직 공개하지 않습니다. 컴포넌트 generic slot·keyboard·focus·pointer·scroll 검증은 다음 단위입니다. 새 runtime 동작이나 Sortable 전체 완료로 간주하지 않습니다. 해당 테스트는 library-pipeline에도 연결했습니다.

## 키보드 UI WIP

sortable-list.ts와 sortable.css에 내부 목록·키보드·이동 버튼·취소/초점 복원을 작성했습니다. src/proofs/sortable-keyboard.vue는 generic 객체의 props/slot/event 추론을 vue-tsc strict template/checkUnknownProps:true로 통과했습니다. constructor 형태에서 unknown으로 사라졌던 추론은 generic call/slot context 형태로 수정했으며 any로 우회하지 않았습니다.

sort­able-keyboard-runtime-check.mjs는 controlled 제안 거부·원본 객체 identity·외부 변경/삭제·7개 취소 경로·focus·locale·readonly·empty/invalid·preview 배열 격리를 통과했습니다. 이 단계는 source 내부 WIP이며 공개 등록, 실제 키보드·터치 버튼 브라우저 검증, negative generic fixture 및 포인터 드래그는 아직 남아 있습니다. 문서/스타터 UI 수정 중에도 해당 파일을 유지하며 별도 WIP 커밋으로 보존합니다.

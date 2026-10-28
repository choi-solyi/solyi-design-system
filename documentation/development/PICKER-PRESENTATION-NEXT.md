# 승인 계획의 다음 작은 단위: 기존 표시 컴포넌트 점검 → Picker host

진행: private host의 native 경계·전환·focus·SSR 독립 단위는 [구현·검증 기록](PICKER-HOST-VALIDATION.md)에 보존했습니다. 아래 내용은 착수 시의 기준이며 공개 Date/Time opt-in 연결은 아직 남아 있습니다. 이후 승인된 PURE/크기 기준 정리를 안전한 host 단위 다음에 진행합니다.

[확장 계획](EXTENSIONS-V2-PLAN.md)의 3단계는 기존 SIcon/SIconBtn/SChip/SBadge 재사용 점검이며, 다음 신규 API 작업은 4단계 Date/Time picker presentation입니다. 이 메모는 착수 범위만 정리하며 새 public API를 구현했다고 뜻하지 않습니다. SConfirmAction·Dialog 통합·LoadingOverlay 등 뒤 단계를 끼워 넣지 않습니다.

## 다시 확인한 실제 계약

| 대상 | 소스 근거와 유지할 계약 |
|---|---|
| 표시 4종 | primitives.ts의 SIcon은 Core solIconPaths/currentColor와 16/20/24 크기, label/decorative를 사용합니다. index.ts의 SIconBtn은 createSIconBtn(SBtn)입니다. Chip은 update:selected/click/remove, Badge는 비대화형 표시·live/anchor를 유지합니다. 중복 컴포넌트나 warning 아이콘 이름을 만들지 않습니다. 새 input rail의 아이콘 배치는 설치본 브라우저 검사에 포함됐습니다. |
| SDatePicker | date-time.ts: DateValue는 ISO string 또는 {start,end} 또는 null, DateChange.reason은 input/calendar/clear/mode입니다. 현재 showModal()로 여는 native dialog이고 pickerPresentation/placement prop은 없습니다. displayFormatter는 화면 표시만 바꿉니다. clear/focus/validate/resetValidation만 공개하며 내부 open/close를 exposed 메서드라고 문서화하지 않습니다. |
| STimePicker | date-time.ts: string/null HH:mm, min/max/step(분, min 기준), presentation=native/list, allowManualInput=true입니다. 팝업은 body Teleport/fixed이며 opened·outside/focusin·resize/scroll·scrub cancel을 소유합니다. change는 기존 scalar이고 preview/interactionCommit/interactionCancel을 분리합니다. 공개 handle은 Date와 같은 4개 메서드입니다. |
| 기존 내부 floating | floating.ts는 native popover와 fixed fallback, anchor 측정·resize/scroll·관찰자 정리를 합니다. SCombobox에서 anchor 회피·logical 수평 정렬을 검증했지만 modal trap/scroll lock/부모 overlay stack을 제공하지는 않습니다. Picker에 그대로 연결했다고 처리할 수 없습니다. |
| 설치된 Vuetify | peers는 4.3.0이며 실제 VOverlay.d.ts에 locationStrategy/location/target/activator/scrollStrategy/attach 계열이 있습니다. native top layer와 VDialog stack의 동작을 연결할 내부 adapter 후보입니다. 새 위치 라이브러리를 추가하지 않습니다. |

## 구현 가능한 첫 단위

1. **내부 host spike부터 독립 검증:** 기존 native dialog 경로, native popover/fixed 경로, Vuetify connected overlay 후보를 같은 작은 fixture로 비교합니다. 아직 Date/Time의 기본 presentation이나 모델을 바꾸지 않습니다.
2. **Date opt-in 연결:** host가 통과하면 제안된 pickerPresentation(auto/popover/dialog)와 logical placement를 Date에 연결합니다. prop 부재는 기존 modal 경로입니다. auto의 좁은 화면 판정·열린 상태의 resize 전환 정책은 기존 화면 기준과 실제 focus/draft 결과로 정하고 임의 숫자를 public 계약으로 확정하지 않습니다.
3. **Time opt-in 연결:** 기존 presentation=native/list는 내용 선택 방식으로 유지하고 pickerPresentation과 분리합니다. min 기준 step, 초기 스크롤, 수동 입력, clear, scrub preview/commit/cancel을 host 전환과 함께 검증합니다.

각 단위는 별도 build·타입·작은 commit으로 닫습니다. public picker props/타입·전역 등록·API·정본 recipe/starter는 연결 단위에서 함께 갱신합니다. locale ko/en과 3 themes × light/dark × 2 density, 320/768/1440px 및 RTL을 사용하며 기존 토큰을 재사용합니다.

## 첫 host 검증의 완료 조건

- 일반 페이지와 SDialog/drawer 안에서 모두 열기, Escape 한 번의 소유권, trigger·input·선택일/시각 초점 복귀를 확인합니다. 자식 popup Escape로 부모 dialog가 닫히면 실패입니다.
- popover는 nonmodal 탐색, dialog는 modal 초점·스크롤 정책을 적용하고 부모 trap/scroll lock을 두 번 적용하지 않습니다. native/Vuetify/Teleport의 실제 DOM 위치와 stack을 기록합니다.
- viewport 및 scroll container 경계, 위/아래 flip, start/end RTL, 긴 내용, 모바일 visual viewport/resize에서 trigger가 가려지거나 페이지 가로 overflow가 생기지 않아야 합니다.
- Date range의 부분 draft·취소·부모 거부, ISO/요일 표시/FormData 분리와 기존 DateChange reason·close reason을 보존합니다. Time은 드래그 중 host 변경·pointercancel·외부 모델 갱신이 잘못된 commit을 만들지 않아야 합니다.
- 전역 overflow:hidden, 일괄 z-index 덮어쓰기, 사업별 저장/공휴일/API 규칙을 추가하지 않습니다. 전체 overlay 통합은 승인 계획 6단계와 연결하되 이 작은 단위에서 완료처럼 보고하지 않습니다.

1.0.0의 기존 ESM 기준과 frozen 검사는 보존합니다. 사용자 승인된 [1.1.0 후보 크기 기준](PURE-SIZE-VALIDATION.md)은 별도 설치본에서 통과했으며 정식 artifact 동결과 전체 delivery 검증은 남아 있습니다. npm·push·운영 배포는 이 착수 범위에 포함되지 않습니다.

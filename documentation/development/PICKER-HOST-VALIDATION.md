# Picker host 독립 기반 구현·검증

[다음 단계 메모](PICKER-PRESENTATION-NEXT.md)의 첫 단위인 **private host**를 구현했습니다. Date/Time의 공개 pickerPresentation/placement prop은 아직 연결하지 않았으며 기존 Time presentation=native/list와 모든 Date/Time 모델·이벤트·handle은 그대로입니다. 전역 등록은 기존 45종입니다. 이 결과는 새 Picker API의 설치 소비 검증이나 전체 확장 계획 완료를 뜻하지 않습니다.

## 원래 실패 조건과 수정

- 320px/LTR/native parent/dialog 안의 popover에서 Vuetify connected location이 native dialog의 스크롤 경계를 기준으로 축소했습니다. 관측한 popup box는 x=92/y=367/width=280/height=18, 오른쪽 372px로 viewport를 벗어났고 inline max-height는 1px였습니다. 원래 실패 이미지는 qa-output/picker-host/failure-before-native-bridge.png에 보존했습니다.
- 일반 페이지와 SDialog/drawer에는 기존 Vuetify VOverlay의 connected location·stack·focus trap·scroll strategy를 재사용합니다. nonmodal popup은 부모 overlay content 안으로 portal하여 부모 Tab 범위와 clipping을 함께 검증합니다.
- native parent에는 native dialog/popover top-layer wrapper를 사용하고, 기존 floating helper의 viewport geometry를 확장해 재사용합니다. z-index 숫자를 올리지 않았습니다. Vuetify stack과 scroll 소유권은 유지합니다. Popover API가 없는 native parent에서는 modal로 fallback합니다.
- native 닫힘이 먼저 옮긴 focus와 소비자가 새로 옮긴 focus를 구분합니다. auto 전환에서도 같은 입력 DOM·draft와 이전 편집 focus를 복원합니다. 외부 focus/click 종료는 새 focus를 가로채지 않습니다.
- native wrapper와 pane의 이중 dialog 노출을 Chrome AX에서 확인해 wrapper 한 곳으로 의미·이름을 통합했습니다. nonmodal은 부모+picker 두 dialog, modal은 inert 배경을 제외한 한 named picker dialog를 확인했습니다.
- visualViewport 높이·offset 변화를 반영하고 현재 focus를 panel 내부에서 드러냅니다. 전체 페이지를 강제로 스크롤하거나 전역 overflow/색/z-index를 덮어쓰지 않습니다. 새 색·크기 토큰과 외부 의존성은 없습니다.

## 통과한 검증

| 검사 | 결과 |
|---|---|
| Chrome 기본 matrix | Chrome 156.0.8078.49, 320/768/1440px × LTR/RTL × page/SDialog/drawer/native parent × popover/dialog/auto = **72조합** |
| 중첩·focus | 자식 Escape 한 번으로 자식만 닫힘, trigger 복원, 내부 Shift+Tab, 선택 종료, native parent cancel 차단, sibling picker·외부 focus 종료·unmount cleanup |
| 전환 | Vuetify/native parent 양쪽에서 넓음→좁음→넓음의 같은 DOM·draft·focus 보존. 실제 페이지 scroll을 만든 fixture에서 부모 scroll lock 유지·최종 해제 확인 |
| 위치 | native 4 logical placements × 두 방향, 긴 내용/ResizeObserver, 이동한 anchor의 scroll 추적, viewport 경계·가로 overflow |
| platform/접근성 | native Popover API 미지원 modal fallback, Chrome AX role 중복 없음, synthetic visualViewport 축소·pan과 마지막 focus 가시성 |
| 공통 helper 회귀 | 기존 Combobox geometry를 3개 폭 × LTR/RTL 6건 확인. source Combobox 상태·IME·canonical query 및 기존 dedicated API 9종 runtime 통과 |
| SSR | open/closed × auto/popover/dialog 6건을 window/document 없이 render 통과 |
| 타입·build·등록 | UI Vite/TS 6.0.3 build, TS 5.9.3의 36개 자체 선언과 negative fixture 0건, 기존 45종 export/global/Vuetify 공존 회귀 통과. 외부 선언 769건은 별도 제한으로 유지 |

Vuetify globalTop은 다음 task에서 갱신하므로 중첩된 다음 Escape는 닫힘 정리 프레임 후 검사합니다. 첫 Escape가 부모를 함께 닫지 않는 assertion과 다음 Escape의 정상 동작을 모두 유지했습니다. scroll-lock fixture는 실제 배경 scroll을 만들어 검사했고, source/iframe를 강제로 닫아 검사를 통과시키지 않았습니다.

실행한 스크립트는 scripts/picker-host-browser-check.mjs, picker-host-ssr-check.mjs, declaration-contract-check.mjs 및 관련 source runtime 검사입니다. 원시 matrix는 qa-output/picker-host/report.json, 로그는 qa-output/picker-host-run.log이며 [보존 스냅샷](PICKER-HOST-RESULT.json)에 핵심 수치를 기록했습니다.

## 남은 범위와 제한

- **다음 UI 연결:** Date opt-in의 ISO/range draft·outside focus·public open/close 횟수, 이어서 Time opt-in의 min 기반 step·native/list·initial scroll·scrub preview/commit/cancel을 연결·문서화·starter/설치본에서 검증해야 합니다. 이 host fixture의 문자열 draft를 실제 Date/Time 모델 검증으로 대신하지 않습니다.
- mode auto는 기존 Core narrow layout 680px 기준을 재사용합니다. 새로운 breakpoint prop은 만들지 않았습니다. Date/Time 연결 시 prop 부재는 각각 기존 native dialog/Teleport 동작을 보존합니다.
- 물리 Fold·OS 키보드·터치·IME·스크린리더·Safari와 전체 overlay 계층 통합은 미검증입니다. Chrome AX·viewport simulation·client fixture·SSR 결과와 구분합니다. 새 host를 포함한 public Picker tarball 소비 검증도 아직 아닙니다.
- 공통 SDialog의 고정 header/본문 scroll·설명 간격과 SSwitch label 요청은 [별도 반영 범위](DIALOG-FEEDBACK-NEXT.md)에 보존했습니다. 현재 공통 SDialog/SSwitch 구현은 바꾸지 않았습니다. 설명 전용 API가 없고 Switch label은 한 번 출력되므로 앱 wrapper 원인도 분리해야 합니다.
- 1.0.0 동결 파일·검사와 npm/push/운영 배포 제한은 그대로입니다. 사용자는 이후 PURE 실적용·새 버전 크기 기준 정리를 승인했으므로 이 안전한 단위 보존 다음에 진행합니다. 아직 해당 원본 변경이나 게이트 갱신은 하지 않았습니다.

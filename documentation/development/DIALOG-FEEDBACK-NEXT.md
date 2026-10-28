# 공통 Dialog·Switch 실기기 피드백 반영 범위

구현 상태: header/title/닫기와 actions를 본문 스크롤 밖에 두고 설명 앞 간격을 16→12px로 정리했습니다. body grid는 위에서 시작해 drawer의 설명 행이 늘어나지 않습니다. 기본 outer padding 24px/모바일 16px은 유지합니다. Switch는 기본 라벨을 유지하고 외부 설정명이 있을 때만 hideLabel로 시각 라벨을 숨깁니다. label 슬롯과 명시적 ARIA 이름을 그대로 사용합니다.

실제 starter 화면에서 모바일 Dialog, 본문 끝으로 이동한 가로 drawer, Switch 표시를 직접 확인했습니다. 헤더 닫기는 기존 SIconBtn으로 정리했고 입력의 중복 사각 포커스는 제거하되 테마의 둥근 포커스 표시와 오류 상태 표시는 유지합니다. 화면은 qa-output/dialog-feedback/screens/에 있습니다. 앞선 구조 검사(12개 레이아웃/4개 RTL·viewport·Switch)와 SSR·타입 결과는 보존하고, 마지막 외형 수정마다 전체 행렬은 반복하지 않았습니다.

최종 포함 범위의 artifact/전체 검증은 아직입니다. 현재 source 크기 결과는 qa-output/dialog-feedback/current-size.json에 기록하며 기존 예산을 상향하지 않았습니다. 9a의 feedback/actions-start·busy 확장까지 완료한 것은 아닙니다. npm E401 인증 차단도 별도입니다.

사용자의 고정 header/title/close, 본문만 스크롤, Switch 오른쪽 중복 라벨 제거, 설명 위아래 과도한 여백 점검 요청을 기존 [확장 계획](EXTENSIONS-V2-PLAN.md)의 Dialog 단계에 추가합니다. Picker WIP는 보존합니다. AION 코드·운영 사이트·DB·Edge는 읽거나 수정하지 않았습니다.

## 공통 소스에서 확인한 원인과 앱 책임 (수정 전 기준)

- 현재 SDialog는 VDialog 안의 자체 section입니다. `.sol-ui-dialog` 전체에 overflow:auto가 있으므로 긴 내용에서 header/title/close까지 함께 스크롤되는 **공통 원인이 있습니다**. drawer도 별도 규칙으로 전체 overflow:auto를 지정합니다.
- 별도 description/subtitle prop·slot은 현재 없습니다. title/eyebrow와 default/actions 슬롯이 실제 API입니다. 설명은 소비자가 default slot에 넣습니다. Vuetify VCardTitle/VCardText를 공통 내부에서 사용하지 않으므로 그들의 padding이 자동 원인이라고 볼 수 없습니다.
- 공통 outer padding은 desktop space-6(24px), 좁은 화면/거친 포인터 space-4(16px), header 아래 space-4(16px), body grid gap space-3(12px)입니다. body 바로 아래 p는 margin:0입니다. 설명의 추가 wrapper·p margin·VCardText padding이 있으면 앱 쪽에서 합쳐질 수 있습니다. AION DOM을 확인하지 않았으므로 앱 여백의 중복 여부는 아직 확정하지 않습니다.
- SSwitch는 wrapping native label 안에서 `#label` 또는 필수 label 문자열을 **한 번** 출력합니다. 자체적으로 같은 오른쪽 라벨을 두 번 만드는 구조는 아닙니다. 앱이 왼쪽 설정명과 오른쪽 label을 함께 표현했는지는 앱에서 확인해야 합니다. label 문자열/접근 가능한 이름을 지우지 않습니다.

## 공통 변경의 작은 완료 단위

1. 기존 API를 유지한 채 SDialog의 header/body/actions를 flex 제약으로 나눕니다. header/title/close는 수축·스크롤하지 않고 body만 min-height:0/overflow:auto로 스크롤하도록 합니다. drawer도 같은 계약을 사용합니다. 전역 overflow:hidden으로 팝업·focus ring을 잘라 해결하지 않습니다.
2. 설명 없음/한 줄/여러 줄의 실제 간격을 측정합니다. 공통 간격이 과도한 경우 기존 density/content-gap/space 토큰을 이용해 조정하며 새 subtitle API를 있다고 문서화하지 않습니다. 앱 wrapper 간격과 이중으로 축소하지 않도록 현재 수치를 먼저 공유합니다.
3. 오른쪽 Switch 텍스트를 보이지 않게 해야 하는 구성은 기존 `#label` 안의 `sol-ui-sr-only` 텍스트 또는 외부 visible label과 `aria-labelledby` 연결을 우선 검토합니다. 이는 1.0.0 어댑터가 새 패키지 API를 강제하지 않고 적용할 수 있는 방향입니다. label slot을 비우거나 필수 label을 빈 문자열로 만들어 이름을 없애지 않습니다. 필요할 때만 별도 opt-in 표시 API와 정식 slot 타입 보강을 검토하며 기존 visible 기본값은 유지합니다.

## 검증과 호환 시점

- 설명 0/1/여러 줄 × 짧은/긴 본문 × actions 유무, dialog/drawer, light/dark·density, 320/768/1440px 및 낮은 viewport를 검사합니다. header 좌표 불변, body scrollTop 이동, 닫기 버튼 접근, 마지막 필드 keyboard scroll, focus ring·popover 경계, Escape·초점 복귀를 확인합니다.
- Fold 세로/가로·키보드 축소 viewport를 에뮬레이션하되 물리 Fold/OS 키보드 검증과 구분합니다. visualViewport 변화와 dvh의 실제 동작도 확인합니다.
- Switch는 visible 라벨이 한 번만 보이면서 접근 가능한 이름은 유지되는지, click/Space·readonly·disabled·required·폼 값을 검증합니다.
- SDialog의 공개 모델/이벤트/슬롯은 유지하지만 긴 Dialog의 실제 scroll element가 outer section에서 body로 바뀌므로 내부 CSS/DOM selector를 사용하는 어댑터는 새 버전 적용 때 자체 scroll/sticky 보정과 이중 스크롤을 점검해야 합니다.
- AION의 동결 1.0.0 어댑터 보정은 계속 유효하며, 공통 수정이 새 minor로 게시되고 소비자가 명시적으로 업데이트한 뒤 중복 보정을 제거합니다. 이번 기록은 공통 수정 구현 완료·패키지 게시·AION 업데이트를 뜻하지 않습니다.

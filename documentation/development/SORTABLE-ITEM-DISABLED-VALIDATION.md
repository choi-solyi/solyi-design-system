# Sortable 항목별 disabled 보완

원 요청에서 누락됐던 항목별 이동 비활성을 isItemDisabled(item:T)=>boolean으로 구현했습니다. 전체 목록 disabled/readonly와 별개이며, 해당 항목을 손잡이·키보드·위/아래 버튼의 이동 원본으로 삼지 못하게 합니다. 다른 항목이 앞뒤로 지나가는 것은 허용합니다. 절대 index 잠금이나 업무 규칙을 추가하지 않습니다.

item/handle-icon 슬롯은 disabled도 받습니다. slot 안 입력·본문 동작의 상태는 소비자가 관리합니다. callback 예외 또는 boolean 이외 반환은 오류와 조작 비활성으로 안전하게 처리합니다. 조작 중 활성 항목이 비활성화되면 모델 쓰기 없이 disabled 사유로 취소하고, 가능한 다른 손잡이로 포커스를 복원합니다. 관련 없는 항목의 상태 변경은 현재 조작을 취소하지 않습니다.

처음 실제 Chrome 검증에서 DOM disabled가 반영되기 전 포커스 복원이 같은 원본을 다시 고르는 경합을 발견했습니다. 복원 후보를 논리적 itemUnavailable 상태로 먼저 거르도록 수정했습니다. 합성 DOM만으로 확인했다고 완료 처리하지 않았습니다.

통과: source controlled/runtime 및 pending/활성 pointer·키보드 비활성화 취소·capture 정리·포커스, 정상 local/global generic SFC와 오류 4종(slot/key/disabled callback/불필요 prop), 패키지 타입·Vite 빌드, 실제 AdvancedExamples.vue 포함 recipe 타입, Components 8종 API 대조. 수정 후 Chrome 72개 appearance/locale/폭 조합과 새 항목 비활성·포커스 경로도 통과했습니다.

AdvancedExamples.vue의 advanced-sort-lock과 공개 Sortable 예제가 같은 callback을 사용합니다. 현재 이 보완은 source/빌드 검증이며 새 tarball 설치 소비 검증은 아직 실행하지 않았습니다. 1815de3의 [설치 기록](SORTABLE-INSTALLED-VALIDATION.md)은 그 이전 계약의 기록으로 유지합니다. 물리 터치·스크린리더·Safari는 미검증입니다.

런타임 로그는 qa-output/sortable-item-disabled-runtime-final.log, 타입/예제/API/browser 로그는 같은 접두사 아래에 있습니다. 실행기 세션 회수 중 transport 실패가 있었으나 저장된 검사 로그를 먼저 확인해 중복 실행을 피했습니다. 이후 실제 브라우저 결함 수정 영향 범위만 재검증했습니다.

ESM 크기 한도와 동결 hash gate는 계속 출시 차단이며 [증가 원인 분석](BUNDLE-GROWTH-REVIEW.md)에 별도 기록했습니다. npm 게시·원격 push·운영 배포·외부 소비 프로젝트 변경은 없습니다.

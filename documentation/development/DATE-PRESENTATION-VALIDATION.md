# Date opt-in 구현 단위

기준 4ebfa99에서 DatePicker에 pickerPresentation(auto/popover/dialog, 기본 undefined)과 placement(bottom-start 기본)을 추가했습니다. undefined는 기존 native modal 경로입니다. 공개 SolPickerPresentation/SolPickerPlacement 타입을 root에서 export하며 기존 네 handle 메서드와 ISO 모델·이벤트 payload를 유지합니다. 공통 host의 설명 연결만 보강했고 새 의존성·테마 토큰은 없습니다.

범위에는 auto resize의 기간 draft 보존, opt-in 사이 전환, legacy 경계 변경 시 취소, 부모 overlay의 Escape 소유권, 바깥 focus 보존이 포함됩니다. 부모가 선택 제안을 거부했을 때 native 입력에 제안값이 남던 문제를 수정하여 표시·제출을 부모 모델로 복원합니다.

확인된 검증:

- TS6 라이브러리 빌드, TS5.9 자체 선언 36개 오류 0. 외부 선언 769건은 별도 기존 제한입니다.
- 기존 날짜 표시·NumberInput·입력 8종 clear/form 회귀 통과.
- Chrome 96개 width/RTL/parent/presentation 조합 통과. 마지막 검사에서 패널 표시만 기다린 Alt+↓/Escape 타이밍 실패가 있었고, 실제 초기 calendar focus까지 기다린 집중 검사로 나머지 경계 조건도 통과했습니다. 제품 코드를 바꾸거나 Escape assertion을 제거하지 않았습니다.
- 집중 검사는 range resize/cancel/commit, 부모 거부, readonly/SForm/mode, required clear 이유·제출·focus, AX의 단일 이름 있는 dialog, presentation 경계 취소·unmount를 포함합니다. 전체 조합을 다시 반복하지 않고 실패 영향 범위만 재검증했습니다.
- 별도 임시 tarball 실제 설치본: local/global positive 2건, 잘못된 presentation/placement/model/close payload/handle negative 5건, SSR 8건 통과. source alias를 사용하지 않았습니다.
- 공개 45종 Components/API·정본 Sample Code 동기화 검사 통과. starter 날짜 예제에 표시 방식·logical 위치 선택을 추가했고 설치본 strict recipe 타입 검사가 통과했습니다.
- 실제 설치본의 source/전체 JS 및 세 named-import 크기 기준 통과. 1.0.0 불변 파일/기준은 변경하지 않았습니다.

raw 결과는 qa-output/date-presentation의 browser.log, focused-result.json, consumer-types-ssr.log, declarations.log, size.log, api-check.log와 candidate/starter의 타입·빌드 로그입니다. fixture 복사본의 사이트 helper 누락은 원본 파일을 그대로 포함하여 해결했습니다. 좁은 이벤트 handler를 Vue가 허용하는 특성 때문에 음성 사례는 실제 $emit payload 거부로 검증합니다.

starter 화면의 새 선택 컨트롤을 직접 조작하는 통합 브라우저 검증, 실제 Fold/OS 키보드/Safari/화면 낭독기와 전체 최종 release pipeline은 아직 완료로 표시하지 않습니다. 다음 단위는 Time의 native/list 내용을 유지한 pickerPresentation 연결과 이후 공통 Dialog 요구입니다. [출시 상태](RELEASE-READINESS-NEXT.md)의 npm E401 인증 차단은 별도이며 새 인증정보를 만들지 않았습니다.

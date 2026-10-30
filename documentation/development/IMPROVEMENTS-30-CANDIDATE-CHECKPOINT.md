# 1.1.1 후보 체크포인트

개발 브랜치 feat/improvements-30-package 전용이다. main push, 공개 문서 배포, npm 게시, 소비 앱 변경은 하지 않았다. 1~30 전체 최종 완료 판정은 아직 하지 않는다.

## 이번 변경과 실제 실행

- f5b9f21 개발 브랜치 push 세션 72248은 exit 0으로 성공했다. 이후 별도 ls-remote 읽기는 네트워크 실패했지만 기존 push 성공 결과를 회수했다.
- TimeGrid agenda 삭제 수락 시 다음/이전 행 또는 마지막 삭제 후 grid로 초점을 복원한다. 거절하면 원래 버튼을 유지한다. 기존 snapshot watcher를 확장했으며 별도 중복 복원기를 만들지 않았다. source runtime에서 수락/거절/마지막 삭제 activeElement를 확인했다.
- 키보드 안내는 실제 계약인 Space 시작, Enter 확정, Escape 취소로 맞췄다. idle Enter가 시작하지 않는다는 단언도 보존한다.
- legacy TimePicker를 부모 Dialog 안에서 실제 클릭하자 안내 텍스트가 완료 버튼을 가렸다. 단순히 Teleport 대상만 부모로 옮기면 transform containing block 때문에 좁은 화면 위치가 틀어지는 것도 재현했다. 부모 modal 내부 Teleport와 manual native popover top layer로 해결했다. 기존 opt-in PickerHost와 모델/이벤트는 유지한다.
- scripts/time-presentation-browser-check.mjs: 최신 소스 빌드에서 legacy/auto/popover/dialog × native/list × 일반/공통Dialog/nativeDialog × 320/1440px 총48경로의 크기·Escape 초점·선택 확정 및 기존 경계 검증 통과. 최신 수정 후 설치본48경로 재실행은 최종 후보 단계에 남았다.
- scripts/time-scrub-browser-check.mjs --installed: ArrowUp→Escape의 모델/commit 불변 및 cancel reason 추가 후 320/768/1440px 통과. 해당 설치본은 첫 후보이며 그 뒤 legacy host/focus watcher 보완이 들어갔다. 최종본 결과와 혼동하지 않는다.
- scripts/time-grid-interaction-browser-check.mjs, scripts/calendar-sortable-files-group-browser-check.mjs를 저장소에 보존했다. 기존 ignored QA 코드에서 옮겨 소비 경로 옵션을 추가했고 최신 dist와 설치 JS 바이트 일치를 먼저 검사한다. 기본 또는 --consumer=qa-output/improvements-30/development-consumer 로 재현한다. 설치된 최신 QA tarball로 violet1100/sage-dark390/sand-RTL390 각 통과. TimeGrid 삭제 focus와 기존 controlled 생성/삭제/drag/resize/clock/keyboard/CDP touch 취소를 확인했다.
- 최신 QA 설치본 SSR: SBtnGroup 일반/nullable slot과 SFileInput 빈 preview를 포함해 document/window shim 없이 통과.
- 첫 후보 설치 선언53파일 검사: TypeScript5.9.3, skipLibCheck:false, 자체 오류0/외부769. solyi-ui/icons의 chevrons 타입 사용을 추가했다. 최신 QA 설치본의 최종 선언 검사 및 SFC 전체 타입 검사는 후보 동기화 후 다시 확인한다.

## 크기와 산출물 구분

- 최신 QA tarball: qa-output/improvements-30/final-source-candidate/solyi-ui-1.1.1.tgz
- SHA256: 3e9ecd08d5d4e330ef5b0eafaae5391093aa226f688f84906e0d5e9c571ce0b0
- 실제 설치본 library-size-check: 51개 API, 원래50개 보존 + SBtnGroup. 297445 characters, 300270 bytes, gzip9 75493; 전체 JS325541/gzip합82775. 9개 import 예산 통과. all_plugin gzip67573/67584로 여유11바이트, SBtnGroup6779/8192. Vue/Vuetify peer external 유지. 기존1.0.0/1.1.0 budget 객체는 변경하지 않고1.1.1에 동일 한도를 추가했다.
- artifacts/solyi-ui-1.1.1.tgz는 먼저 만든 후보(SHA256464831cd78c9810b8054765cb8178cfd34458b6b16f3736ba77a097a54e0f2b6)이며 최신 소스와 다르다. 이 파일을 최종 후보/동결/게시 대상으로 사용하면 안 된다. 기존 immutable pack 검사를 우회하거나 덮어쓰지 않았다. 최종 후보 보존 경로와 내부 예제의 참조를 정리해야 한다.
- 첫 packages-only pipeline은 Core/UI build, pack, 두 내부 소비자 설치, 소비자 앱 build, recipes 타입 검사까지 진행한 뒤 library-contract의 구형 Done 버튼 CSS 단언에서 종료했다. 해당 단언을 새 action wrapper의 오른쪽 정렬과 토큰 간격 계약으로 갱신했다. 전체 pipeline 통과로 보고하지 않는다.
- 이후 contract 재실행은 canonical 소비자가 이전 후보인 점을 정확히 검출해 실패했다. 이 검사를 완화하지 않았다. 정식 후보/두 내부 소비자 동기화와 전체 pipeline 재개가 남아 있다.
- 1.0.0 SHA72d1d8d622287e8a86444c404ad20f7c5ed5d065dc2b4e48765374697854e23a, 1.1.0 SHAf39964b931082a23d2c06e7d87d18c9c536132600bc93397e1687bad1b0c1426 그대로다. release-assets/1.1.1은 아직 동결하지 않았다.

## 다음 완료 조건

1. 최신 코드의 후보 산출물과 두 내부 예제 의존 경로/lock 동기화. 기존 게시 동결 파일 및 immutable 검사는 유지.
2. 최종 설치본 TimePicker48경로/scrub, icons 타입·runtime, 자체 선언/SSR/전체 pipeline과 기존30번호별 미실행 세부 조건 정리.
3. Components/starter/Sample Code/과거 직접 링크와 배포 전 버전 표시안 검토. README/CHANGELOG는 미게시 준비와 npm stable1.1.0을 명시했지만 사이트 배너 등 최종 UI는 남았다.
4. Calendar Enter/form, Sortable 상태 전환 초점/실제 reduced motion, Button Group 즉시 orientation 모서리 등 마지막 세부 smoke를 완료 목록과 대조. 물리 휴대폰/스크린리더/소프트 키보드는 미검증.

현재 추가 사용자 승인이나 인증을 기다리는 상태가 아니다. npm1.1.1은 준비만 승인됐으며 실제 게시하지 않는다.

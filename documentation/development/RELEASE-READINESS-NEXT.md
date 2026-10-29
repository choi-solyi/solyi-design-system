## 게시 인증 세션 40614 종료 · 미게시 확인

새 동결 후보 f39964b9…의 기존 게시 세션 40614는 공식 npm 브라우저 인증 완료 조회(GET /-/v1/done)에서 E404, exit1로 종료됐습니다. 만료/거절 중 어느 원인인지는 응답만으로 확정하지 않습니다. 종료 후 공식 registry에서 versions=0.0.0-stage/1.0.0, latest=1.0.0이고 1.1.0이 없음을 확인했습니다(qa-output/common-ui-audit/registry-after-session40614.json). 새 인증·OTP 요청·재게시는 실행하지 않았습니다. 현재 실행 중인 게시 프로세스는 없고 실제 registry 설치 검증은 미게시로 미실행입니다. 구현·검증·새 후보는 보존했으며 사용자가 준비된 뒤 인증 재개가 필요합니다. 아래는 이전 단계 이력입니다.

## 2026-10-29 승인된 네 보완 완료 · 게시 인증 직전

네 보완은 00004b9, 설치본 계약 검증은 1f30977입니다. 필수 check/test와 변경 영향 runtime·타입·SSR·실제 설치본 Chrome 확인이 모두 통과했습니다. 새 1.1.0 UI 후보는 5,982,999 bytes, SHA-256 f39964b931082a23d2c06e7d87d18c9c536132600bc93397e1687bad1b0c1426입니다. 이전 미게시 후보 90c8ae69…는 release-candidate-history/1.1.0/에 원문 해시·manifest·pack report와 함께 보존했습니다. 공식 registry에 1.1.0이 없음을 확인한 뒤 사용자 승인에 따라 미게시 후보만 갱신했고 1.0.0·검사 코드는 유지했습니다. 새 후보의 실제 게시 인증은 이제 진행하며 아직 게시 성공을 주장하지 않습니다. [보완 결과](COMMON-UI-CORRECTIONS.md)를 따릅니다. 아래는 이전 단계의 이력입니다.

## 2026-10-29 게시 체크포인트

사용자의 로그인 완료 통보 후 npm whoami에서 maintainer choi-solyi를 확인했습니다. 동일 동결 1.1.0 tarball을 한 번 publish했으나 EOTP(일회용 인증번호 필요), exit 1로 거부됐습니다. 직후 공식 registry를 다시 읽어 버전이 0.0.0-stage/1.0.0, latest=1.0.0으로 유지되고 1.1.0이 없음을 확인했습니다. 게시 성공·부분 게시 증거는 없습니다. OTP/인증정보 생성·변경과 재시도는 하지 않았습니다. 이후 사용자 공통 UI 누락 점검 요청으로 게시를 보류했습니다. registry 설치 검증은 미게시라 실행하지 않았습니다. 원본 SHA와 커밋 3132ab1을 확인했으며 패키지 bytes는 변경하지 않았습니다. 로그는 qa-output/release-final/npm-publish-1.1.0.log와 registry-after-eotp.json에 있습니다. 추가 [공통 UI 대조](COMMON-UI-PREPUBLICATION-AUDIT.md)에서 미정의 상태 색 토큰·입력 trailing 줄바꿈·Segmented hover 이중 표시·Pagination/Table 제어 차이를 확인했습니다. 제품 코드는 수정하지 않았으며 후속 범위 검토와 게시 보류가 유지됩니다. 아래는 이전 로컬 검증 완료 기록입니다.

# 다음 npm 게시 준비와 남은 조건

승인된 18항목과 추가 Dialog 요청의 패키지 구현을 마쳤습니다. 1.1.0은 로컬 동결 후보이며 npm 게시·운영 문서 배포·외부 소비 앱 업데이트는 아직 하지 않았습니다. remote push·새 인증정보·권한 확대는 승인 범위가 아닙니다.

## 최종 포함 범위

| 요청 | 구현 결과 | Components·starter 연결 |
|---|---|---|
| 1 입력 공통 구조·clear | 8종의 빈 값·이벤트·폼·focus 보존, 내부 clear/공통 슬롯 | 각 입력 정본 예제 |
| 2 자유 입력 | SCombobox·Enter/opt-in blur·async/IME | combobox |
| 3 아이콘·버튼 | SIcon/SIconBtn·SBtn 재사용 | buttons |
| 4 Chip | 선택·삭제 controlled API | buttons |
| 5 Badge | 상태 표시·접근성 이름 | buttons |
| 6 Date | ISO·formatter·opt-in 팝업 | inputs/date |
| 7 Time | native/list·수동 입력·초기 위치·scrub·opt-in 팝업 | time |
| 8 확인 액션 | SConfirmAction·두 번 확인·외부 작업 상태 | buttons |
| 9 Dialog·overlay | 고정 제목/닫기/actions·본문 스크롤·설명 간격·feedback/actions-start·busyScope·공유 host | dialog; Switch hideLabel은 selection |
| 10 로딩 | SLoadingOverlay·영역/화면·blocking·delay/dwell | progress |
| 11 빈 상태 | SEmptyState·설명/아이콘/actions | empty |
| 12 정렬 목록 | controlled generic·항목 잠금·grip·키보드/터치/취소 | advanced/sortable |
| 13 Duration/Step | SNumberInput preset/formatValue/unit 재사용 | advanced-inputs/number |
| 14 범주 8색 | Core 토큰·고정 ID resolver·48개 대비 조합 | color-examples·Style 토큰 문서 |
| 15 월 달력 | SMonthCalendar ISO·marker.category·모바일 상세 | advanced/month-calendar |
| 16 시간 그리드 | 별도 단계 STimeGrid readonly 기반과 move/resize/duplicate proposal | advanced/time-grid |
| 17 리스트 카드 | SCard leading/title/description/meta/actions·독립 제목 링크 | empty |
| 18 페이지 이동 | SPagination controlled·모바일 compact·Table 계약 보존 | navigation |

기존 38종과 추가 12종, 총 50종의 개별 import·plugin·전역 타입을 대조했습니다. SScheduler와 서비스 충돌/저장/업무 규칙은 명시적 제외 범위입니다. 새 Step/Duration/Card 중복 컴포넌트도 만들지 않습니다. 정확한 props/events/slots/handle은 소스와 생성 Components API가 기준입니다.

## 동결 후보와 확인된 결과

- 파일: release-assets/1.1.0/solyi-ui-1.1.0.tgz, 5,982,608 bytes.
- SHA-256: 90c8ae6949c05b1e4cb87d9409fc9f25274448f4abd406b5d5d6ae0b93886c0e.
- 1.0.0 파일·SHA와 176,000자 검사를 보존했습니다. [최종 크기 근거](FINAL-SIZE-VALIDATION.md)의 50종 raw/gzip·총 JS·설치 import 및 초과 거부 검사를 통과했습니다. Icon/Combobox의 기존 작은 import 한도는 유지했습니다.
- 공식 registry는 0.0.0-stage/1.0.0, latest=1.0.0이며 1.1.0은 비어 있었습니다. 게시 직전에도 같다면 1.1.0 / latest로 UI tarball만 게시합니다. Core와 root는 private이고 UI만 승인된 publish metadata로 준비했습니다.
- 두 소비 앱의 실제 tarball 설치·타입·빌드, 기존 38+추가12 등록, 새 기능 runtime·clear 8종·기존 입력/정렬/달력 및 자체 52개 선언과 negative fixture를 통과했습니다. TypeScript 5.9.3·skipLibCheck:false 자체 오류0, 외부769는 같은 조건의 1.0.0 기준과 동일(증가0)입니다. 일반 소비 앱은 기존 skipLibCheck:true이며 TypeScript 6.0.3 빌드도 통과했습니다.
- DOM shim 없는 설치본 SSR, Components 실제 iframe TimeGrid 키보드 제안, 설치본 모바일/가로 Dialog의 본문 스크롤·고정 제목/닫기·닫기 동작·UI 데모 링크와 title을 확인했습니다.
- 로컬 HTTP tarball 설치·타입/CSS/폰트/빌드·해시·중복 framework/불변/손상 거부, 문서 빌드·소스 연결·60개 공개 코드 샘플·기본 check까지 통과했습니다. npm test의 전체 통합 UX 단계도 통과했습니다. 마지막 기존 팔레트 hash 검사는 원래 hash를 그대로 유지하고 명시적으로 추가한 범주 역할만 분리해 통과했으며 폰트 로딩까지 완료했습니다.

첫 pipeline은 Dialog 아이콘 닫기 버튼의 오래된 textContent 검사에서 멈췄습니다. aria-label로 바로잡고 같은 tarball의 원래 다음 순서부터 재개했습니다. Components 검색/범주 토큰 설명과 Picker 안내의 불완전한 코드 조각도 보완했습니다. 앞의 통과 검사나 크기 gate를 생략·이동하지 않았습니다. 단계별 증거는 qa-output/release-final/pipeline.log 및 pipeline-rest.log/pipeline-rest2.log/pipeline-rest3.log/pipeline-rest4.log 및 pipeline-last.log에 분할 보존합니다. 별도 installed-ssr.log, time-grid-installed-types.log, browser-final.log와 screens/도 있습니다. sandbox HTTP 소비 설치는 lockfile·설치본 없이 종료한 뒤 허용된 네트워크에서 통과했습니다.

물리 Fold/OS 키보드·Safari·스크린리더는 미검증이며 Chrome 터치 에뮬레이션과 구별합니다. 이는 npm 인증 문제와 다른 검증 한계입니다. npm 자체 용량 제한에 걸린 증거는 없습니다.

## 남은 게시 차단과 사용자 행동

공식 registry의 기존 npm whoami 결과는 E401 Unauthorized였습니다. 이후 로그인 완료라는 새 증거가 없어 인증 요청을 반복하거나 인증정보를 생성/교체하지 않았습니다. npm publish는 미실행이므로 불확실한 게시 결과도 없습니다. 실제 registry 설치 검증은 게시 후 단계입니다.

D25019에서 패키지 소유 권한이 있는 사용자 계정으로 직접 `npm login --registry=https://registry.npmjs.org/`을 완료하고 알려 주어야 합니다. 토큰·암호·OTP를 대화에 보내지 않습니다. 복구 후 읽기 전용 whoami·버전/dist-tag 충돌 확인 → 같은 동결 tarball 게시 → 공식 registry에서 새 설치·타입/실행 확인 순서입니다. 사용자 로그인과 독립적인 구현·로컬 검증은 완료했습니다. 현재 실행 중인 검사는 없으며 로그인 복구 확인이 다음 단계입니다.

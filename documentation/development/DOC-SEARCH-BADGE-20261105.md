# 문서 검색 위치와 outlined Badge 수정

- 문서 검색은 패키지 SDialog가 아닌 native `<dialog>`다. 475px/650px Chrome에서 빈 검색어→Chip→Chi의 상단이 193.8125→78.640625→16px로 변했다. 결과 높이에 의존한 기본 중앙 정렬이 원인이다.
- 검색창 상단은 결과가 아닌 visualViewport에 고정하고 결과 영역만 스크롤한다. viewport resize/scroll은 키보드·화면 변화에 대응하며 일반 input 이벤트에서는 위치를 다시 계산하지 않는다. 검색·조합 입력·링크·Escape·포커스 계약은 보존한다.
- Badge 예제는 이미 warning/outlined다. 공통 Badge의 border:0이 outlined 테두리까지 제거했다. outlined만 기존 tone 토큰의 1px 테두리를 복원하며 subtle/filled의 비대화형 표시는 유지한다. API 변경은 없다.
- 재현/회귀: `node scripts/doc-search-position-browser-check.mjs --baseline`은 기존 결과 위치를 기록한다. 일반 호출은 최종 built 문서의 320/475/1100px 및 축소 visualViewport, 키보드 탐색·닫기·결과 이동을 검사한다. 원본 수치와 실행 결과는 qa-output/doc-search-20261105에 보존한다.
- 로컬 회귀에서 3폭 모두 검색 결과 변경 후 상단 이동 0px. Android IME 및 사용자 기기는 조작하지 않았다. 축소 visualViewport는 브라우저 시뮬레이션이다.
- 첨부 4개는 Library 전송 준비까지 성공했으나 WindowsApps Python 실행 불가로 지원 materialization helper를 실행하지 못했다. 파일 bytes 다운로드·픽셀 직접 열람은 미완료다. 임의 전송으로 우회하지 않았다.
- 새 게시 목표는 기존 미게시 patch 1.1.1이다. registry latest 1.1.0을 확인했다. 기존 후보와 1.0.0/1.1.0 원본은 보존한다. npm whoami/access는 E401이며 사용자 로그인 복구 전 publish는 실행할 수 없다. 검증/공개 배포는 인증과 독립적으로 진행한다.

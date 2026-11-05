# 문서 검색 위치와 outlined Badge 수정

- 문서 검색은 패키지 SDialog가 아닌 native `<dialog>`다. 475px/650px Chrome에서 빈 검색어→Chip→Chi의 상단이 193.8125→78.640625→16px로 변했다. 결과 높이에 의존한 기본 중앙 정렬이 원인이다.
- 검색창 상단은 결과가 아닌 visualViewport에 고정하고 결과 영역만 스크롤한다. viewport resize/scroll은 키보드·화면 변화에 대응하며 일반 input 이벤트에서는 위치를 다시 계산하지 않는다. 검색·조합 입력·링크·Escape·포커스 계약은 보존한다.
- Badge 예제는 이미 warning/outlined다. 공통 Badge의 border:0이 outlined 테두리까지 제거했다. outlined만 기존 tone 토큰의 1px 테두리를 복원하며 subtle/filled의 비대화형 표시는 유지한다. API 변경은 없다.
- 재현/회귀: `node scripts/doc-search-position-browser-check.mjs --baseline`은 기존 결과 위치를 기록한다. 일반 호출은 최종 built 문서의 320/475/1100px 및 축소 visualViewport, 키보드 탐색·닫기·결과 이동을 검사한다. 원본 수치와 실행 결과는 qa-output/doc-search-20261105에 보존한다.
- 로컬 회귀에서 3폭 모두 검색 결과 변경 후 상단 이동 0px. Android IME 및 사용자 기기는 조작하지 않았다. 축소 visualViewport는 브라우저 시뮬레이션이다.
- 첨부 4개는 Library 전송 준비까지 성공했으나 WindowsApps Python 실행 불가로 지원 materialization helper를 실행하지 못했다. 파일 bytes 다운로드·픽셀 직접 열람은 미완료다. 임의 전송으로 우회하지 않았다.
- 새 게시 목표는 기존 미게시 patch 1.1.1이다. registry latest 1.1.0을 확인했다. 기존 후보와 1.0.0/1.1.0 원본은 보존한다. npm whoami/access는 E401이며 사용자 로그인 복구 전 publish는 실행할 수 없다. 검증/공개 배포는 인증과 독립적으로 진행한다.
- 최종 설치본 Chrome: 검색 320/475/1100px, 결과 변경, 280px/236px visualViewport와 offset80, 결과 영역 최소44px, ArrowDown/Escape/링크 이동 통과. Badge Components의 실제 iframe에서 Violet/Sage/Sand × light/dark 6경로의 outlined 1px tone 테두리·subtle 0px·SPAN/비button 역할 통과. 직접 생성한 화면 픽셀도 확인했다.
- 검증 스크립트의 첫 결과 공간 검사는 빈 목록에 행 높이를 기대해 정정했으며, Badge 실행 표면을 inline canvas로 가정한 경로도 실제 iframe으로 바로잡았다. 결과가 있는 목록의 높이/실제 스타일 assertion은 유지한다. 실패 로그와 통과 로그를 모두 보존한다.
- 첫 후보 준비는 이전 후보 디렉터리 보존 후 index가 이를 참조해 ENOENT로 중단됐다. 기존 index도 보존하고 재동결 전 인덱스를 실재하는 published 1.1.0/1.0.0으로 맞춰 다시 실행했다. 불변성 검사·타입·빌드·기능 기준은 변경하지 않았다.
- rc7 UI: 5,990,405 bytes, SHA-256 `3277a2b960844d1fb12dce0dff6527c24d975d0b29cd10f8d82611666ed54e7e`. 자체55개 선언 진단0, 기존 외부 선언769건은 별도 알려진 한계다. 기존 공개51개 API/전역등록·SSR·두 내부 소비 앱 타입/빌드를 보존한다.
- `node scripts/library-pipeline.mjs --refresh --prepare-release` 최종 exit0. npm test/check, 새 tarball의 두 내부 앱 clean install/타입/빌드/런타임/SSR/라이선스/측정 보고/문서·HTTP 소비·이력 보존 검사까지 통과했다. `browser-final3.log` exit0은 검색3폭 및 Badge6테마 경로다. 기존 1.0.0/1.1.0 git diff는 0이다. 공개 반영과 registry 게시는 별도 결과로 기록한다.
- 후속 문서 전용 보완: 상단 gap을 모바일12px/넓은 화면48px로 고정해 키보드 높이280→236 변화에서도 같은 visual offset의 상단 위치를 유지한다. `browser-fixed-gap.log` exit0으로 이를 직접 assert하고 Badge6경로도 다시 확인했다. 문서 재빌드 후 UI tarball 해시3277a2b9…는 동일하다.
- 최종 npm 인증 복구와 게시·registry 설치 검증을 완료했다. E401/승인 요청 만료 설명은 이전 시점의 이력이며 현재 차단은 아니다. [1.1.1 실제 게시 결과](NPM-1.1.1-PUBLICATION.md)를 따른다.

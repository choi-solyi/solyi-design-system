# 승인된 공통 UI 네 보완 결과

구현 00004b9, 설치본 타입 계약 1f30977. 외부 소비 앱·운영 사이트·계정 설정은 변경하지 않았습니다.

- SBtn loading은 원래 크기·역할 색·aria-busy를 유지합니다. disabled 버튼과 입력은 정의된 surface-alt/muted 역할을 사용합니다. 관찰한 라이트/다크 loading 대비는 5.126/7.607:1, disabled 대비는 5.134/7.114:1입니다.
- STextField enhanced rail의 끝 grid 열을 내용 폭 기준으로 배치했습니다. 0자/10자 및 clear 표시에서 기본40px·모바일44px를 유지하고, 긴 사용자 trailing은 normal 줄바꿈이 가능합니다. 모든 슬롯에 nowrap을 강제하지 않았습니다.
- SSegmentedControl의 선택 표시선·굵기·키보드 focus는 유지하고 선택된 항목에 hover 텍스트 밑줄이 겹치지 않도록 했습니다.
- SDataTable과 SPagination은 siblingCount(기본1, 0–5)와 compactPagination(기본false)을 받습니다. 좁은 화면도 주변 번호를 유지하며 줄바꿈합니다. 독립 Pagination은 좁은 화면의 중복 처음/마지막 아이콘만 줄이고 해당 번호를 유지합니다. true를 명시하면 현재 번호·이동 버튼 중심입니다. 모델과 기존 이벤트는 유지했습니다. data/navigation 정본 예제와 Components API를 동기화했습니다.

최종 tarball을 두 내부 소비 앱에 설치해 타입·앱 빌드, 50종 export/plugin/패키지 계약, 새 옵션 negative 타입, 부모 반영/거절·번호 일치, 입력 clear 8종, SSR을 통과했습니다. 자체 선언0/기존 외부769는 동일합니다. 크기 한도는 변경하지 않았고 index284,688자, plugin gzip64,919B로 기존 한도 내입니다.

필수 npm run check 및 npm test는 최종 코드에서 exit0으로 완료했습니다. 실제 설치본 Chrome 1100/light·390/dark에서 짧은/긴 trailing·clear 클릭·disabled 배경·loading 크기와 상태·선택 키보드·두 페이지 컴포넌트의 주변 번호/간단 표시·좁은 화면을 확인했습니다. Dialog/Switch/문서 모서리는 기존 완료 검증을 보존했습니다. 물리 기기/스크린리더 미검증 범위는 그대로입니다.

증거: qa-output/common-ui-audit/fix-installed-checks.log, fix-consumer-build.log, fix-recipes-types.log, fix-required-checks.log, fix-installed-browser.log, installed-fixed-observations.json 및 installed-fixed-screens/.

새 UI 후보: release-assets/1.1.0/solyi-ui-1.1.0.tgz (5,982,999 bytes), SHA-256 f39964b931082a23d2c06e7d87d18c9c536132600bc93397e1687bad1b0c1426. 공개1.0.0은 보존했고 이전 미게시1.1.0 후보는 별도 이력에 보존했습니다. 새 후보의 npm 게시·registry 설치 결과는 별도 기록하며 게시 성공 전 완료로 표시하지 않습니다.


## 최종 게시 결과

위 최종 후보는 공식 npm에 solyi-ui@1.1.0 / latest로 게시됐습니다. registry 배포 SHA가 일치하고 깨끗한 registry 설치·타입·빌드·대표 runtime 검증도 완료했습니다. 추가 Chrome smoke 실행 제한을 포함한 근거는 [게시 결과](NPM-1.1.0-PUBLICATION.md)를 참조하세요. 이전 미게시 표현은 후보 준비 당시의 이력입니다.

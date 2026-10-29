# solyi-ui 1.1.0 npm 게시 완료 (2026-10-29)

공식 npm 브라우저 인증 후 기존 게시 세션 85546이 exit 0, `+ solyi-ui@1.1.0`으로 완료됐습니다. 새 게시를 중복 실행하지 않았습니다. 공식 registry에서 version=1.1.0, latest=1.1.0을 확인했고 기존 1.0.0은 보존했습니다.

- npm: https://www.npmjs.com/package/solyi-ui/v/1.1.0
- tarball: https://registry.npmjs.org/solyi-ui/-/solyi-ui-1.1.0.tgz
- 크기: 5,982,999 bytes
- SHA-256: `f39964b931082a23d2c06e7d87d18c9c536132600bc93397e1687bad1b0c1426`
- integrity: `sha512-PAjQQOyrxOKpcZs5i1cVjAmSmw4AqsQjaFyBGBQaHbGP5mFso2dQfk0oKR7pn2U7dvES7oRUNYSqkw1ubDBTZg==`

공식 배포 파일을 직접 받아 동결 후보와 bytes/SHA/integrity 일치를 확인했습니다. 게시 직후 조회에는 이전 메타데이터가 보였지만 이후 공식 registry와 새 설치에서 1.1.0을 확인했습니다. 원인은 추정하지 않으며 재게시하지 않았습니다.

## 실제 registry 소비 검증

빈 node_modules와 새 npm 캐시를 사용하는 별도 소비 앱에 `solyi-ui@1.1.0`을 공식 registry로 설치했습니다. 로컬 tarball/소스 alias를 사용하지 않았으며 lock의 resolved URL과 integrity도 공식 배포 파일과 일치합니다.

- 설치 성공: Vue 3.5.44 / Vuetify 4.3.0 / TypeScript 6.0.3.
- TypeScript 및 Vite production build 완료: 50개 등록 export와 신규 옵션의 양성/음성 타입 계약 포함. skipLibCheck=true이며 외부 선언 전체 재검사는 반복하지 않았습니다. 이전 동일 조건의 자체 선언 0 / 외부 769 기준은 별도 보존합니다.
- 설치본 Pagination/Table, TimeGrid, Combobox runtime 모두 PASS. controlled 모델/제안, 새 페이지 옵션, 키보드 및 입력 상태 계약을 검사했습니다.
- 소비 앱 Vite의 500kB 청크 경고는 비차단 경고입니다. 라이브러리 자체 크기 예산 통과 결과와 구분합니다.
- 추가 registry 빌드 Chrome smoke는 Chrome crashpad crash server 시작 실패로 브라우저가 종료돼 미실행입니다. 샌드박스나 권한을 변경해 재시도하지 않았습니다. 같은 SHA 후보의 기존 격리 설치본 Chrome 화면 검증은 통과했으며, 이를 새 registry 브라우저 실행 통과로 대신 표기하지 않습니다.

근거: `qa-output/registry-published-1.1.0/verified-registry.json`, `registry-install.log`, `registry-build.log`, `registry-runtime.log`, `registry-browser.log`, `consumer/package-lock.json`. 이전 필수 `npm run check`/`npm test` 및 최종 후보 화면 검증은 `COMMON-UI-CORRECTIONS.md`의 기록을 재사용합니다.

npm 게시 목표는 완료됐습니다. 별도 소비 프로젝트 의존성 업데이트, 운영 문서 사이트 배포, 원격 Git push는 실행하지 않았습니다. 물리 기기·스크린리더 검증은 기존 미검증 범위로 남습니다.

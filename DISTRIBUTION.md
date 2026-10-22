# 고정 버전 설치·업데이트·롤백

기존 Pages의 `releases/<문서 버전>/` 아래에 Core/UI tarball 한 쌍, `manifest.json`, `SHA256SUMS`를 보존합니다. `releases/index.json`은 권장 쌍의 명시적 카탈로그일 뿐 설치된 앱을 변경하지 않습니다. 실제 공개 반영은 해당 커밋의 Actions 결과와 공개 카탈로그에서 확인합니다.

다음 공개 경로를 준비합니다:

- `https://choi-solyi.github.io/solyi-design-system/releases/0.9.1/solyi-core-0.4.1.tgz`
- `https://choi-solyi.github.io/solyi-design-system/releases/0.9.1/solyi-vue-ui-0.7.1.tgz`
- 롤백 쌍: `releases/0.9.0/solyi-core-0.4.0.tgz`, `solyi-vue-ui-0.7.0.tgz`

```sh
npm install --save-exact https://choi-solyi.github.io/solyi-design-system/releases/0.9.1/solyi-core-0.4.1.tgz https://choi-solyi.github.io/solyi-design-system/releases/0.9.1/solyi-vue-ui-0.7.1.tgz vue@3.5.44 vuetify@4.3.0
```

Node ^22.18.0 또는 >=24.12.0. 검증 조합은 Vue 3.5.44 / Vuetify 4.3.0입니다. 초기 CSS/폰트/theme 연결은 기존 [LIBRARY.md](LIBRARY.md), locale은 [LOCALE.md](LOCALE.md)를 따릅니다. 두 패키지 모두 private/UNLICENSED로 npm 미게시이며, 공개 다운로드가 포괄적인 재배포 라이선스 부여를 뜻하지 않습니다. 포함된 폰트의 OFL·출처와 의존성 고지는 유지합니다.

다운로드한 파일의 SHA-256을 같은 릴리스의 SHA256SUMS 및 manifest와 대조합니다. npm은 URL 설치 시 SHA-512 integrity를 lock에 저장합니다. `package.json`·`package-lock.json`을 함께 커밋하고 이후 `npm ci --ignore-scripts`를 사용하세요. manifest 해시는 손상 검사용이며 별도 서명·공급망 인증은 아닙니다.

업데이트는 새로운 URL 쌍 설치 후 소비 앱 자체 타입·회귀·시각 검사를 통과시킨 뒤 그 앱의 승인된 배포 절차로 진행합니다. 문제가 생기면 두 URL을 모두 이전 버전으로 되돌려 설치하고 잠금 파일을 함께 보존합니다. 더 확실한 복원은 이전 package.json/lock을 복원한 뒤 npm ci입니다. 새 S 이름·Progress·locale 등 이전 버전에 없는 API를 사용한 소비 코드는 이전 API에 맞추어 함께 롤백해야 합니다. core와 UI peer 조합을 임의로 섞지 않습니다.

```sh
npm install --save-exact https://choi-solyi.github.io/solyi-design-system/releases/0.9.0/solyi-core-0.4.0.tgz https://choi-solyi.github.io/solyi-design-system/releases/0.9.0/solyi-vue-ui-0.7.0.tgz vue@3.5.44 vuetify@4.3.0
```

유지보수 절차:

1. 패키지/API/peer·소비 앱 경로 및 문서 릴리스 버전을 함께 올립니다. 패키지 바이트가 변하면 패키지 버전도 올립니다.
2. `npm run library:prepare`는 tarball lock 갱신→두 소비 앱 타입/동작→starter 빌드→현재 쌍 동결→HTTP 업데이트/롤백→문서 검사를 순서대로 실행합니다. 별도 게시 동작은 없습니다. 내부 동결 명령은 `node scripts/releases.mjs <문서버전>`이며 pack report의 SHA-512가 일치하는 파일만 보존합니다. 이미 있는 문서 버전 또는 패키지 버전에 다른 바이트를 쓰는 것은 거절합니다. 실패한 후보도 수정된 바이트에는 새 버전을 사용합니다.
3. `npm run build`, `node scripts/releases.mjs --check`, `node scripts/distribution-check.mjs`, `npm run check`, `npm test`. 카탈로그는 파일명·크기·SHA-256·SHA-512 검증을 통과해야 빌드됩니다. HTTP 소비 검사는 깨끗한 앱에 이전→새 쌍→이전 쌍을 설치·타입검사·빌드하고 손상/누락 감지와 버전 덮어쓰기 거절을 검사합니다.
4. 승인된 push가 있을 때만 기존 validate → Pages workflow가 게시합니다. 배포 전 필요한 모든 검사는 validate job에 포함합니다. 별도 credential·registry·GitHub App은 없습니다.

이미 준비한 동일 버전의 재검증은 `npm run library:verify`입니다. 아직 동결하지 않은 새 버전에서 이 명령을 실행하면 현재 카탈로그와의 버전 불일치로 멈춥니다. 이때 수동으로 이전 파일을 덮어쓰지 말고 `library:prepare`를 사용합니다.

현재 자동 변경 대상은 이 저장소의 문서/starter 빌드뿐입니다. aion2page·solyi-kr 및 다른 소비 프로젝트는 연결하지 않았습니다. 여러 앱의 자동 버전 업데이트 PR/검사/배포는 대상별 별도 연결이 필요합니다. 이 릴리스가 해당 운영 앱에 적용되었다고 볼 수 없습니다.

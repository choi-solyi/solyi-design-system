# solyi-ui 1.1.1 게시 결과

- 공식 registry 게시 시각: 2026-11-05 12:37:12 UTC / 21:37:12 KST. `choi-solyi` 기존 계정의 read-write 권한과 사용자 브라우저 승인을 확인했다.
- npm 게시 세션58211은 exit0, `+ solyi-ui@1.1.1`로 끝났다. HTTP202 처리 중 응답 후 official registry가 1.1.1/latest를 제공하는 것을 확인했으며 중복 게시하지 않았다.
- 패키지: https://www.npmjs.com/package/solyi-ui/v/1.1.1
- 공식 파일: https://registry.npmjs.org/solyi-ui/-/solyi-ui-1.1.1.tgz
- 크기5,990,405bytes, SHA-256 `3277a2b960844d1fb12dce0dff6527c24d975d0b29cd10f8d82611666ed54e7e`. registry 파일·manifest·사전 검증 후보가 일치하고 SHA-512 integrity도 일치한다.
- 소스/화면 커밋85c762e, 해당 CI/Pages 실행42019349969 success. 공개 파일365개 해시와 검색3폭·Badge6테마 경로를 확인했다. 라이브러리 전체 사전 검증과 두 내부 tarball 소비 앱 타입·빌드·런타임·SSR도 통과했다.
- registry 검증은 qa-output/npm-1.1.1-registry-consumer라는 새 폴더에서 기존 lockfile/node_modules 없이 수행했다. lock의 UI resolved는 공식 registry HTTPS URL이며 로컬 tarball 참조가 없다. clean install→TypeScript6.0.3→Vite8.3.4 build→DOM shim 없는 SSR→실제 Chrome API51/Badge 테두리/숫자 증감 모델/Dialog 입력·닫기·포커스 복귀·재열기를 통과했다. 입력과 같은 라벨의 증감 그룹 때문에 첫 검사 locator를 입력 ID로 명확히 했으며 기능 assertion은 유지했다.
- 자체55개 선언 오류0, 기존 외부 선언769건은 별도 알려진 한계다. 실제 사용자 폰·Android IME·TalkBack·Safari/iOS를 이번 게시 검증으로 새로 확인한 것은 아니다.
- 1.0.0/1.1.0 원본과 이전 미게시 후보를 보존했다. 외부 소비 앱4개는 갱신·배포하지 않았다. 비밀번호·OTP·토큰을 대화로 수집하거나 별도 키/권한 설정을 변경하지 않았다.
- 원시 결과: qa-output/doc-search-20261105/publication-registry.json, registry-install.log, registry-type-build.log, registry-ssr.log, registry-browser-result.json.

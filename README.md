# Solyi Design System

솔의 여러 앱에서 함께 사용하는 개인 디자인 시스템의 **0.x 검토 초안**입니다. 공통 색 역할·타이포·간격·밀도·상태 규칙을 제공하고, 앱의 성격에 따라 테마를 조정합니다. 특정 앱의 색을 모든 앱의 영구 규칙으로 정하지 않습니다.

- [문서 사이트](https://choi-solyi.github.io/solyi-design-system/)
- [실제 패키지를 사용하는 예제](https://choi-solyi.github.io/solyi-design-system/starter/?view=recipes)
- [처음 시작하기](documentation/guide/GETTING-STARTED.md)
- [설치·업데이트·롤백](documentation/guide/DISTRIBUTION.md)
- [검증·호환 범위](documentation/guide/COMPATIBILITY.md)

## 문서와 코드

문서의 학습 순서는 **Getting started → Style → Components → Patterns**입니다. Releases는 현재 권장 패키지 조합과 설치 방법을, Licensing은 자체 코드와 외부 자산의 권리 범위를 설명합니다. 컴포넌트의 사용 예제와 Props·Slots·Events·Methods는 각 컴포넌트 본문에서 함께 찾습니다.

문서 캔버스·샘플 코드·별도 실행 화면은 같은 Vue SFC와 실제 설치된 패키지를 사용합니다. 화면틀·오류 복구·검색 같은 업무 흐름은 컴포넌트를 연결한 조합입니다. 의미 구조에 필요한 HTML을 없애거나 모든 Vuetify API를 복제하지 않습니다.

| 위치 | 역할 |
|---|---|
| `tokens.json`, `site/components.css` | 프레임워크 독립 토큰·공통 CSS 원본 |
| `packages/core` | Core CSS·JSON·아이콘·날짜·말줄임 helper 패키지 |
| `packages/vue-ui` | S 컴포넌트·타입·Vuetify 연결 |
| `examples/package-consumer` | 실제 tarball을 설치하는 별도 타입·빌드 소비 프로젝트 |
| `examples/vue-vuetify` | 실제 패키지 기반 문서 예제 앱 |
| `site` | 문서 셸과 원본 리소스 |
| `docs` | GitHub Pages 생성 산출물. 직접 편집하지 않음 |
| `documentation/guide` | 설치·사용·호환·폰트·브랜드 가이드 |
| `documentation/development` | 개발 구조·전환 목록·과거 기술 기록 |
| `documentation/quality` | 검사 결과·실제 화면 검수와 미검증 범위 |
| `documentation/plans` | 단계별 계획과 완료표 |

`docs/`가 배포 산출물이라 저장소의 상세 Markdown은 `documentation/`에 분리합니다. 기존 파일의 새 위치는 [문서 이동표](documentation/MOVED-DOCUMENTS.md)에서 찾습니다. [기여 안내](CONTRIBUTING.md)에서 수정 원본·검사·커밋 규칙을 확인하세요.

## 로컬 실행과 검증

공식 Node **22.23.3**을 기준으로 사용합니다. starter 도구는 Node `^22.18.0 || >=24.12.0`을 요구합니다. registry 로그인이나 인증 토큰은 필요하지 않습니다.

```sh
npm ci --ignore-scripts
npm run library:verify
npm run serve
```

문서는 `http://127.0.0.1:4173`에서 확인합니다. 패키지 내용이 바뀌어 tarball과 잠금 파일을 의도적으로 갱신할 때는 [패키지 개발 절차](documentation/guide/LIBRARY.md)를 따릅니다. 단순 문서 수정에 모든 비싼 검사를 반복하지 말고 영향 범위 확인 후 최종 배치에서 통합 검사합니다.

새 CLI나 `npm install sol-ui` 설치 경로는 출시되지 않았습니다. 현재 설치는 [Releases](https://choi-solyi.github.io/solyi-design-system/#releases)의 고정 URL tarball을 사용합니다. npm 이름 `sol-ui`의 사용권·소유권은 확인되지 않았고 패키지는 `private:true`로 게시를 막고 있습니다.

## 배포

기존 GitHub Actions의 validate가 패키지·별도 소비 앱·문서 검사를 통과하면 같은 저장소의 Pages deploy가 실행됩니다. 실패한 검증은 배포하지 않습니다. 배포 후 정확한 커밋과 공개 파일의 HTTP 상태·SHA-256을 확인합니다.

```sh
npm run verify-live -- <공개된 커밋 SHA>
```

자동 변경 대상은 이 문서 사이트와 starter뿐입니다. 아페·개인 홈페이지·다른 소비 프로젝트의 코드나 배포는 연결하지 않았습니다. 실제 Safari·Fold 기기·화면 낭독기 등 미검증 환경은 [검수 기록](documentation/quality/QA.md)에 구분합니다. 자동 검사나 Lighthouse 점수로 전체 접근성 준수를 주장하지 않습니다.

## 라이선스와 참고

자체 재사용 UI 코드·토큰·스타일·패키지 문서는 [MIT](LICENSE)입니다. 로고·캐릭터·favicon·개인 콘텐츠는 이 허용 범위와 배포 패키지에서 제외합니다. 폰트와 다른 제삼자 소프트웨어는 원래 라이선스·저작권·출처를 유지합니다. [정확한 범위](LICENSE-SCOPE.md), [공식 브랜드 자산 출처](documentation/guide/BRAND-ASSETS.md), [폰트 고지](documentation/guide/FONT.md)를 확인하세요.

[참고 가이드](https://design.yeolyi.com/)에서는 정보 구조와 공유 UI·문서 셸 분리 개념만 참고했습니다. 원문·시각 디자인은 복제하지 않았습니다. 이 저장소는 가상 데이터와 독창적인 문서·데모만 포함하며 기존 비공개 앱 소스나 개인 파일을 게시하지 않습니다.

사용자의 최종 승인 전에는 **1.0.0을 만들지 않으며**, 기존 릴리스 파일과 Git 기록을 삭제하거나 변조하지 않습니다. 이전 상세 README는 [이력 부록](documentation/development/README-HISTORY.md)에 보존합니다.

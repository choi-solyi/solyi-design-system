# 패키지 소비와 개발 검증

현재 후보의 버전 조합은 [설치·업데이트](DISTRIBUTION.md)와 패키지 메타데이터를 기준으로 합니다. 두 패키지는 `private:true`이며 npm/GitHub Packages에 게시하지 않았습니다. 자체 재사용 코드는 MIT, 폰트와 외부 의존성은 원래 라이선스를 유지합니다.

## 원본과 산출물

| 위치 | 역할 |
|---|---|
| `tokens.json`, `site/components.css`, `site/overflow.js`, `site/icons.js` | 프레임워크 독립 원본 |
| `packages/core` | CSS·JSON·아이콘·말줄임·날짜 helper의 생성 패키지 |
| `packages/vue-ui/src` | S API 소스, strict 타입 선언과 별도 styles.css |
| `examples/package-consumer` | 소스 alias·심볼릭 링크 없이 실제 tarball을 설치하는 별도 프로젝트 |
| `examples/vue-vuetify` | 같은 설치 패키지로 문서 SFC를 실행하는 starter |
| `site` → `docs` | 문서 원본 → Pages 생성 산출물 |

Vue/Vuetify/Core helper는 UI 라이브러리의 external import입니다. 소비 앱에 Vue/Vuetify 한 벌만 설치하고 Vuetify 플러그인을 한 번 연결합니다. node_modules와 프레임워크 런타임은 npm pack에 넣지 않습니다. Core는 Vue를 요구하지 않습니다.

## 빠른 변경 확인과 최종 배치

```sh
npm ci --ignore-scripts
npm run library:verify
npm run serve
```

`library:verify`는 Core 생성 → UI 설치·빌드·선언 → npm pack → 두 실제 소비 앱의 설치·타입·동작 → starter → 문서 생성·회귀 순서입니다. 실패하면 다음 단계로 가지 않습니다. 수정 중에는 영향 범위의 빠른 검사만 하고 비용이 큰 전체 검수·실제 화면·배포는 최종 배치로 모읍니다.

의도적으로 패키지 내용을 바꾸어 아직 공개하지 않은 후보의 tarball 잠금 파일을 갱신할 때는 `library:refresh`를 사용합니다. 새 버전 쌍을 검증·동결하려면 `library:prepare`를 사용합니다. 무결성 오류를 무시하거나 같은 과거 버전 파일을 덮어쓰지 않습니다.

## 소비 앱과 라이브러리의 책임

앱 등록·CSS·테마·자동 import의 정확한 설정은 [처음 시작하기](GETTING-STARTED.md)와 [실제 starter](../../examples/vue-vuetify/src/main.js)를 따릅니다. S 컴포넌트를 전역 등록해도 Vue 함수를 자동 import하는 Vite 설정까지 설치되는 것은 아닙니다.

값·검색·정렬·필터·페이지·서버 요청·저장은 소비 앱이 소유합니다. SDataTable은 현재 페이지 rows와 선택 ID·sort·page를 받아 이벤트를 내보내며 자료를 자체 정렬하거나 변조하지 않습니다. 현재 페이지 모두 선택과 페이지 밖 선택의 정책을 소비 앱에서 명확히 유지합니다.

컴포넌트의 내부 여백·제목·액션 간격은 패키지 CSS가 소유하고, 검색 필드와 테이블 사이처럼 별도 컴포넌트 간 간격은 앱이 소유합니다. 공유 토큰을 사용하고 문서 셸의 docs.css를 소비 앱에 가져오지 않습니다.

`solIcon`과 `solIconPaths`는 같은 16/20/24px 선 아이콘을 제공합니다. 브랜드 로고와 별개인 UI 아이콘이며 장식 아이콘은 보조 기술에서 숨기고 행동 버튼에 이름을 붙입니다.

## 검증과 자동 배포 경계

자체 소스 strict 타입, 실제 exports·CSS·선언·라이선스 포함, 두 tarball 소비 앱, JSDOM 동작, 실제 Chrome 화면·키보드를 구분해 검사합니다. Vuetify 외부 선언 전체는 `skipLibCheck` 한계가 있으므로 전체 적합성을 주장하지 않습니다.

기존 Actions validate가 위 파이프라인을 통과한 경우에만 같은 저장소 Pages deploy가 실행됩니다. PR과 실패 작업은 배포하지 않습니다. 기본 토큰은 읽기 범위이며 임시 Pages/id-token 권한은 기존 배포 작업에만 있습니다. 새 credential·권한·다른 앱 자동 업데이트는 만들지 않습니다.

롤백은 [고정 버전 안내](DISTRIBUTION.md), 실제 검수와 한계는 [품질 기록](../quality/QA.md), 과거 패키지 개발 경위는 [이력 부록](../development/LIBRARY-HISTORY.md)을 참고합니다.

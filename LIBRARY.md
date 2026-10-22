# 패키지 소비와 자동 검증

현재 패키지 초안은 `@solyi/core@0.3.2` / `@solyi/vue-ui@0.5.0` (문서0.7.0 로컬 후보)입니다. 둘 다 `private:true`, `UNLICENSED`이며 **npm/GitHub Packages에 게시하지 않았습니다**. 기존 브랜드 자산의 권리 조건도 그대로입니다.

0.1.5의 접근성 보완: Field 외부 label의 ID와 입력의 aria-labelledby를 연결합니다. Table의 오류 재시도 버튼에 초점이 있는 채로 정상/로딩 상태로 바뀌면, 제거된 버튼 대신 지속되는 결과 요약에 초점을 둡니다. 사용자가 다른 조작부로 이동한 뒤 완료되면 그 초점을 유지합니다. API/색/타이포/반경은 유지합니다.

## 구조와 적용 범위

| 위치 | 역할 |
|---|---|
| `tokens.json`, `site/components.css`, `site/overflow.js` | 프레임워크 독립 원본. Core dist로 생성/복사하며 수동 이중 편집하지 않음 |
| `packages/core` | tokens.css, tokens.json, components.css, tokens/coreVersion JS+타입, overflow helper exports |
| `packages/vue-ui` | 기존14종과 확장6종의20개 typed API. Vite ES library, TypeScript 선언, 별도 styles.css |
| `examples/package-consumer` | 소스 alias·workspace·심볼릭 링크 없이 두 `.tgz`를 설치하는 독립 타입/빌드/동작 검증 |
| `examples/vue-vuetify` → `docs/starter` | 실제 tarball을 쓰는 공개 데모. 필드 검증, Dialog, 검색·정렬·선택·페이지 Table |
| 나머지 `site/*` | 계속 사용할 수 있는 HTML/CSS/JS 참고 예제. **Vue 패키지로 전부 전환한 상태가 아님** |

Vue/Vuetify/Core helper는 라이브러리 ES 파일에서 external import입니다. 소비 앱에 Vue/Vuetify 한 벌만 설치하고 createVuetify()를 한 번 연결합니다. 개발 도구에는 라이브러리 자신의 Vue/Vuetify가 있지만 npm pack에 node_modules나 프레임워크 코드를 넣지 않습니다. Core는 Vue를 요구하지 않습니다.

검증 조합: Node 22.23.3, Vue 3.5.44, Vuetify 4.3.0, Vite 8.3.4, plugin-vue 6.0.10, TypeScript 6.0.3. peer 범위는 Vue 3.5/Vuetify 4.3으로 제한했고 범위 안의 모든 버전을 검증했다는 의미는 아닙니다.

## 로컬 설치·재현

```sh
npm ci --ignore-scripts
npm run library:verify
# 처음 구현/의도적으로 패키지 내용을 바꾼 뒤 lock의 tgz integrity를 갱신할 때:
npm run library:refresh
```

`library:verify`는 Core 생성 → library npm ci/build/declaration → 두 npm pack → 별도 소비자와 starter npm ci → 타입/소비 빌드/동작 → demo build → 문서 build/check/test 순서입니다. 실패하면 다음 단계로 가지 않습니다. tarball은 `artifacts/`에만 생성하며 Git·Pages 출력에서 제외합니다. 코드/README/dist가 바뀌면 tarball 무결성도 바뀌므로 잠금 파일의 기존 integrity 실패를 무시하지 말고 의도한 버전·변경을 확인한 뒤 refresh와 diff를 검토하세요.

```js
import 'vuetify/styles';
import '@solyi/core/tokens.css';
import '@solyi/core/components.css';
import '@solyi/vue-ui/styles.css';
import {SBtn, STextField, SDialog, SDataTable} from '@solyi/vue-ui';
```

앱은 Vuetify plugin과 data-theme/data-mode를 설정합니다. Button은 variant/type/disabled/loading, Field는 id/label/v-model/help/error, Dialog는 id/title/v-model, Table은 columns/current-page rows/선택 IDs/sort/page를 받습니다. 상세 계약과 slots/events는 각 packages/*/README.md 및 생성된 index.d.ts를 확인하세요. Table은 앱의 자료를 변경하거나 내부에서 검색/정렬하지 않습니다. 소비 앱이 조건 변경 시 페이지를 보정하고 전체 선택의 범위를 결정합니다.

기존 6px 버튼·10px 필드·12px 카드·16px 패널과 36/40px·모바일44px를 유지합니다. 라이브러리 CSS는 명시적으로 한 번 import합니다. docs.css는 포함하지 않으며 reset·사이트 셸·앱 라우터도 설치하지 않습니다.

## 검증의 의미

- 자체 TypeScript source는 strict로 검사하고 선언을 생성합니다. 별도 소비 앱은 실제 exports를 import해 유효한 API와 의도한 잘못된 타입을 검사합니다.
- Vuetify 4.3 선언에는 이 예제에서 쓰지 않는 선택 서비스 의존성 및 TypeScript 6 호환 오류가 있어 `skipLibCheck:true`입니다. 외부 라이브러리 d.ts 전체 적합성 검사는 완료했다고 주장하지 않습니다. 자체 소스와 소비자의 API 사용 검사는 유지합니다.
- npm pack 목록·CSS/선언/exports·외부 import·독립 lock/integrity·프레임워크 단일 설치를 검사합니다. JSDOM 동작과 실제 Chrome 치수/키보드 검증은 구분합니다.
- 기존 THIRD-PARTY-NOTICES.txt 원문은 보존하며 새 공통 의존성 고지만 추가합니다. 플랫폼별 빌드 도구 설치 차이가 기존 고지를 지우지 않습니다. 자체 private 패키지를 제3자 MIT 코드로 잘못 표시하지 않습니다.

## 이번 자동화와 후속 연결

이 저장소의 변경/PR은 validate 작업에서 위 파이프라인을 실행합니다. **main 검증 성공에 의존하는 deploy 작업만 기존 GitHub Pages로 게시**합니다. PR과 실패 작업은 게시하지 않습니다. 수동 `verify_failure=true` 실행은 검증 후 의도적으로 실패시켜 deploy가 skipped인지 확인하는 시험용입니다.

Pages 게시 소스는 자동 검증을 거치도록 legacy main/docs에서 같은 사이트의 Actions artifact로 바꿉니다. 워크플로는 읽기만 하는 기본 토큰, 같은 Pages 게시 작업에만 쓰는 임시 pages/id-token 권한을 사용합니다. 새 개인 토큰·레지스트리 자격증명·GitHub App/OAuth 권한·다른 저장소 쓰기 권한·contents 쓰기·외부 프로젝트 자동 업데이트는 없습니다. 새 grant나 비용이 필요한 경우 중단합니다.

**자동 변경 대상은 이 디자인 시스템 데모뿐**입니다. 아페·개인 홈페이지·다른 소비 앱은 바뀌지 않습니다. 이후 각 프로젝트를 연결할 때는 대상·테스트·롤백·배포 범위의 별도 승인이 필요합니다. 설계 후보는 고정 버전 업데이트 PR → 해당 앱 검사 → 성공한 앱만 배포이며, 무조건 최신 CDN을 참조하는 방식은 사용하지 않습니다. 레지스트리 종류/소유권/공개 범위·인증 방식은 아직 결정·연결하지 않았습니다.

## 릴리스와 롤백

1. API/CSS 변경을 기록하고 package.json의 패키지 버전을 올립니다. Core 계약이 바뀌면 Vue UI의 Core peer도 맞춥니다. 문서 사이트 버전은 별도입니다.
2. 소비 예제의 정확한 tarball 경로와 lock을 갱신하고 library:refresh → library:verify → 실제 검수합니다. 서로 다른 내용을 같은 버전으로 외부 배포하지 않습니다.
3. 검증한 커밋을 main에 푸시합니다. CI 실패 시 기존 Pages가 유지됩니다. 이번에는 레지스트리 release/tag/publish를 만들지 않습니다.
4. 데모 롤백은 해당 릴리스 커밋을 되돌리는 후속 커밋을 만들고 같은 파이프라인으로 배포합니다. 일반 토큰/버튼 등 특정 변경만 복원할 때 전체 릴리스를 무심코 revert하지 않습니다.
5. 미래 소비 앱 롤백은 이전 정확한 버전과 lock 복원 → 해당 앱 테스트 → 재배포입니다. 한 앱의 실패가 다른 앱의 버전을 강제로 바꾸지 않습니다.

공식 근거: [Vite library mode](https://vite.dev/guide/build.html#library-mode), [Vue plugin packaging](https://vuejs.org/guide/reusability/plugins.html#bundle-for-npm), [npm pack](https://docs.npmjs.com/cli/v11/commands/npm-pack/), [GitHub Pages dependent build/deploy jobs](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Package spacing and icons (0.1.4)

Table owns its caption inset, mobile caption/actions and footer spacing. The consuming screen owns the gap between search controls and Table; the starter uses space-4 (16px). Sorting headers explicitly override Vuetify button padding to align with body content. No adapter CSS is needed for the Table's internal spacing.

Import solIcon / solIconPaths from @solyi/core/icons to use the same 16/20/24 line icon source as the documentation. Vue pagination uses the existing chevron at 20px, rotated inside the same centered 36px button box (44px narrow/coarse pointer). Decorative SVG is hidden from assistive technology; the button retains its explicit action label. Shared icons are UI symbols, not brand logos.

## Typed control expansion (0.2.0)

기존4종은 유지하고 Checkbox/RadioGroup/Switch/Select/Textarea/NumberInput/Tabs/Toast/DatePicker/TimePicker10종을 실제 export합니다. [API·사용법](VUE-API.md)과 [전환표](VUE-MIGRATION.md)를 확인하세요. Core의 `./date`는 문서와 Vue가 함께 쓰는 DOM 없는 날짜/시각 계산입니다. 새 컴포넌트의 locale 객체/앱 주입은 확장 지점이며 문서 전체 번역·외부 배포 경로·나머지 예제의 전환을 뜻하지 않습니다.

## 0.3.0 추가6종과 UI 폰트

[ADVANCED-VUE-API.md](ADVANCED-VUE-API.md)는 새6종의 값/이벤트/키보드/async 계약을 설명합니다. 이전14종 API를 삭제하지 않습니다. Core의 `fonts.css` export와 동일 폴더의 원본 WOFF2/OFL/SOURCE.json이 실제 tarball에 포함됩니다. 소비 앱은 `import '@solyi/core/fonts.css'`를 한 번 추가하고, UI 토큰은 Wanted Sans와 시스템 fallback을 사용합니다. 글꼴은 OFL1.1이며 자체 소스의 UNLICENSED와 구분합니다. 코드 글꼴은 별도 `code-fonts.css` opt-in export로 JetBrains Mono → Nanum Gothic Coding → monospace를 사용합니다. 원본 WOFF2/TTF/OFL 및 고정 출처·해시를 함께 제공하며 자세한 용량·적용 범위는 FONT.md에 기록합니다. 설치·업데이트는 같은 lockfile/tarball 방식이며 공개 레지스트리와 다른 앱 자동배포를 연결하지 않습니다.

공통 언어 설정은 [LOCALE.md](LOCALE.md)를 따릅니다. 버전별 Pages 설치 경로와 해시·업데이트/롤백은 [DISTRIBUTION.md](DISTRIBUTION.md)를 따릅니다. 이전0.3.0 쌍과 새0.3.1/0.4.0 쌍을 로컬 출력에 준비하고 실제 HTTP 소비까지 검증했습니다. 공개 푸시는 보류합니다.

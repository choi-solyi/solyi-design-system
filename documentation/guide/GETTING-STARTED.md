# 처음 시작하기

이 순서로 실제 설치·실행 후 필요한 컴포넌트를 고릅니다. 현재 패키지는 npm에 게시하지 않은 0.x 초안입니다. 새 프로젝트 생성 CLI와 `npm install sol-ui`는 아직 제공하지 않습니다.

## 1. 현재 권장 조합 설치

[설치·업데이트](DISTRIBUTION.md) 또는 문서 사이트의 [Releases](https://ui.solyi.kr/#releases)에서 현재 권장 Core/UI 쌍의 정확한 URL을 사용합니다. package.json과 package-lock.json을 함께 보존하고 이후 설치는 `npm ci --ignore-scripts`로 재현합니다.

## 2. 앱에서 한 번 등록

실행 가능한 [starter의 진입점](../../examples/vue-vuetify/src/main.js)이 기준입니다. Vuetify 플러그인은 한 번만 설치하고 S 컴포넌트는 `app.use(SolyiUI)`로 전역 등록합니다. `solyi-ui/global`은 Volar/vue-tsc의 전역 템플릿 타입을 제공합니다. 타입 설정만으로 런타임 컴포넌트가 등록되지는 않습니다.

Core 토큰·컴포넌트 CSS와 Vue UI CSS를 명시적으로 한 번 불러옵니다. Wanted Sans와 코드 폰트는 별도의 self-host CSS export이므로 사용할 앱에서 선택합니다. `docs.css`는 문서 셸 전용이며 소비 앱에 가져오지 않습니다.

## 3. Vue 자동 import의 전제

이 저장소의 실행 예제와 별도 소비 프로젝트는 Vite의 `unplugin-auto-import` Vue preset을 사용합니다. 따라서 해당 설정 안의 SFC에서는 `ref`, `computed`, `onBeforeUnmount` 같은 Vue 함수를 반복 import하지 않습니다. S 컴포넌트 전역 등록과 이 빌드 변환은 서로 다른 설정입니다.

다른 앱에서도 [starter의 Vite 설정](../../examples/vue-vuetify/vite.config.js)과 생성된 TypeScript 선언·lint globals 연결을 함께 적용해야 합니다. 자동 import를 설정하지 않은 앱에서는 Vue 함수 import를 직접 유지합니다. TypeScript 타입 import와 Vue preset 밖의 함수는 생략하지 않습니다.

현재 설정은 `unplugin-auto-import` 21.1.0의 `imports: ['vue']`입니다. starter의 `auto-import.config.js`는 `src/auto-imports.d.ts`와 `.eslintrc-auto-import.json`을 생성하며, 별도 소비 프로젝트에도 같은 설정이 있습니다. `examples/eslint.config.mjs`가 생성한 readonly globals를 읽어 실제 `no-undef`·`no-global-assign` 검사에 연결합니다. 템플릿 타입 검사는 vue-tsc가 담당합니다. 실제 파일·검사 범위는 [샘플 코드 구현](../development/CODE-EXAMPLES.md)을 참고하세요.

## 4. 테마와 레이아웃

`createSolyiVuetify`와 `applySolyiAppearance`로 공통 CSS와 Vuetify 테마의 색·폰트·밀도를 연결합니다. 테마 이름은 `violet`, `sage`, `sand`, 모드는 `light`·`dark`, 밀도는 `comfortable`·`compact`입니다. 저장 여부와 앱 간 동기화는 소비 앱의 선택입니다.

`SContainer`, `SRow`, `SCol`은 Vuetify 레이아웃을 재사용하는 출발점입니다. `SCard`는 자체 카드 API이므로 지원하지 않는 VCard props를 그대로 지원한다고 가정하지 않습니다. [각 컴포넌트 문서](https://ui.solyi.kr/#component)의 Props·Slots·Events·Methods를 확인합니다.

## 5. 입력과 오류 처리

폼은 SForm과 S 입력의 실제 계약을 사용하고, 공통 규칙 오류와 서버 오류를 구분합니다. 값은 v-model로 소비 앱이 소유합니다. 제어 메서드는 template ref를 통해 호출하고 DOM ID 조회에 의존하지 않습니다.

[폼과 오류 처리](FORMS.md)에서 동기 rules, 서버 오류 유지 정책, 폼과 필드의 메서드 반환값을 확인합니다.

샘플은 가상 검증·지연·오류를 시연하며 실제 서버나 계정에 연결하지 않습니다. 업로드 데모도 파일 내용 전송·자동 저장을 하지 않습니다.

## 6. 필요한 범위부터 확인

[문서 샘플](https://ui.solyi.kr/starter/?view=recipes)에서 기본·열림·오류 상태와 키보드 흐름을 확인합니다. 수정 전후의 모바일 폭·테마·다크 모드와 자신의 실제 데이터 길이를 검사합니다. 지원한다고 명시하지 않은 브라우저·화면 낭독기·다른 Vuetify 버전은 별도 검증이 필요합니다.

[검증·호환 범위](COMPATIBILITY.md), [언어 설정](LOCALE.md), [라이선스 범위](../../LICENSE-SCOPE.md)를 함께 읽습니다.

## 선택 행의 공통 여백

배경·테두리가 있는 선택 행에는 Core의 `.sol-choice-row`를 선택적으로 사용합니다. 네이티브 `<label class="sol-choice sol-choice-row">` 또는 `<SCheckbox class="sol-choice-row" … />`, 목록형 `<SRadioGroup class="sol-choice-row" … />`에 적용할 수 있습니다. 행 label이 세로 `space-2`(8px)·가로 `space-3`(12px)·최소 `touch-target-min`(44px)을 담당하여 빈 여백까지 눌러 선택합니다. 체크박스 자체에 padding을 주지 않습니다. 카드형 라디오의 기존 16px inset은 유지하며, 일반 필드에는 이 클래스를 강제하지 않습니다.

## 7. AI 작업 지침 연결

[소비 프로젝트 DESIGN.md](../../DESIGN.md)를 앱 루트에 복사하고 사용하는 AI 도구의 프로젝트 지침에서 참조하세요. 사이트의 Getting started → AI guide에서 같은 원본과 짧은 시작 프롬프트를 보기·복사·다운로드할 수 있습니다. 두 패키지에도 동일한 DESIGN.md가 포함됩니다. 이 파일명 자체가 모든 도구의 자동 로딩을 보장하지 않습니다.

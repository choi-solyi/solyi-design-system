# 샘플 코드와 자동 import

문서 캔버스·샘플 코드·복사·별도 실행 화면은 `examples/vue-vuetify/src/recipes/*.vue`의 같은 원본을 사용합니다. S 컴포넌트를 각 SFC에서 반복 import하지 않으며 런타임 앱에서 한 번 전역 등록합니다. 일반 HTML은 의미 구조와 접근성에 필요한 범위에서 유지합니다.

공개 JS·TS·Vue 샘플은 `scripts/public-sample-format.mjs`의 단일 설정을 사용합니다. Prettier 3.9.10, 세미콜론 생략, 두 칸 들여쓰기, 작은따옴표, 가능한 모든 후행 쉼표, 100자 줄 너비, 단일 화살표 인자 괄호 생략을 적용하며 import 묶음 뒤에는 빈 줄을 둡니다. Vue 인라인 이벤트의 여러 문장 구분과 ASI 안전에 필요한 세미콜론, CSS 선언의 세미콜론은 유지합니다.

`node scripts/public-sample-check.mjs`는 README·가이드·사이트의 실행 샘플과 공개 SFC 원본을 검사합니다. 실제 Vue SFC 파싱·템플릿 컴파일, import·스크립트 이름의 선언 검사와 잘못된 import·미선언 이름의 실패 사례도 확인합니다. 빌드 생성기는 원본의 형식을 확인한 뒤 문서로 복사합니다.

## 자동 import 설정

실행 앱과 별도 소비 프로젝트는 `unplugin-auto-import` 21.1.0의 Vue preset을 사용합니다. 공식 npm 패키지의 MIT 라이선스와 기존 잠금 파일의 무결성을 보존합니다.

| 위치 | 실제 역할 |
|---|---|
| `examples/vue-vuetify/auto-import.config.js` | Vue preset, starter용 생성 선언·lint globals |
| `examples/vue-vuetify/src/auto-imports.d.ts` | starter의 전역 Vue 값·타입 선언 |
| `examples/vue-vuetify/.eslintrc-auto-import.json` | 생성된 readonly globals |
| `examples/package-consumer/auto-import.config.js` | 별도 소비 앱의 동일 preset |
| `examples/package-consumer/auto-imports.d.ts` | 별도 소비 앱의 생성 선언 |
| `examples/eslint.config.mjs` | 두 앱의 생성 globals를 실제 ESLint 검사에 연결 |

ESLint 10.13의 `no-undef`·`no-global-assign`은 실제 script globals를 검사합니다. Vue 템플릿 타입은 vue-tsc가 검사합니다. S 컴포넌트 전역 타입·런타임 등록과 Vue 함수 자동 import는 서로 다른 설정입니다. 다른 소비 앱에서 자동 import를 쓰지 않으면 Vue 함수 import를 직접 유지합니다. Vue preset 밖의 함수와 TypeScript 타입 import를 무조건 제거하지 않습니다.

## 문법 강조와 복사

Prism 1.30의 실제 Vue SFC에서 template/HTML·script setup TypeScript·style CSS를 강조합니다. 라이트·다크는 공유 토큰에 맞는 색 조합을 사용하고 좁은 화면의 코드 가로 스크롤을 유지합니다.

이는 TypeScript 의미 분석이나 모든 SCSS·외부 언어의 완전한 파서가 아닙니다. 지원한 문법 범위를 검사하고 부족한 언어는 지원한다고 과장하지 않습니다. 강조용 span은 원본 코드의 값에 영향을 주지 않으며 활성 탭을 복사하면 원본 SFC/HTML·CSS를 그대로 제공합니다.

코드 패널은 왼쪽 예제 탭·오른쪽 위 복사 아이콘·일관된 본문 여백·별도 실행 링크 footer로 구성합니다. 새 언어나 코드 조합을 추가할 때는 같은 원본의 화면 표시·복사·실행이 맞는지와 라이트·다크 대비를 함께 확인합니다.

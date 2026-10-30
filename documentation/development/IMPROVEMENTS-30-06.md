# 6번 MultiSelect — 미게시 개발본 검증

브랜치: `feat/improvements-30-package`. 공개 npm 1.1.0과 공개 문서의 설치 파일은 교체하지 않았다. 아래 결과는 독립 QA 소비 앱에 설치한 로컬 개발 tarball에 한정한다.

## 원인과 변경

- npm 1.1.0의 목록은 일반 문서 흐름에 있어 열면 부모 높이가 증가했다. 선택 목록도 입력 프레임 앞의 별도 목록이었다.
- `packages/vue-ui/src/selection.ts`: 기존 `useFloatingPanel`의 native top layer, 폭 맞춤, flip/shift, viewport/scroll 재계산을 재사용한다. DOM의 테마·locale 문맥을 유지하면서 부모 overflow 경계를 벗어난다.
- 선택 칩은 기존 SChip을 재사용해 입력 프레임 안에 배치한다. label·제거 이름·배열 순서·삭제 후 입력 포커스를 보존한다. readonly에서는 제거 동작을 노출하지 않는다.
- `input-control.ts`의 intrinsic frame과 opt-in decoration 판정을 분리했다. 기본 `clear()`가 검색어와 목록을 유지하는 기존 MultiSelect 계약, clearable일 때의 전체 지우기 계약을 모두 보존했다.
- 목록·칩에서 Escape를 누르면 내부 목록만 닫고 입력으로 돌아간다. 목록이 닫힌 뒤 Escape는 바깥 Dialog로 전달된다.
- 공개 props/events/slots/exposed handle과 50개 전역 등록·개별 export는 유지한다. 새 의존성·토큰·게이트 변경은 없다.

## 실행한 검증

| 범위 | 결과 |
|---|---|
| 소스 빌드·타입 | 통과 |
| `input-control-runtime-check.mjs --source` | 입력 8종의 빈값/change/clear/form/배열 불변성/readonly/IME 계약 통과 |
| `vue-expansion-runtime-check.mjs --source` | 선택·제한·비동기 최신 결과·Escape/포커스 및 기존 확장 회귀 통과 |
| 별도 tarball 설치·소비 앱 타입/빌드 | 통과. 설치 JS와 빌드 JS 바이트 일치 확인. 소비 타입 검사는 기존과 같이 skipLibCheck 사용 |
| `multiselect-browser-check.mjs --consumer=qa-output/improvements-30/development-consumer` | violet/light PC, sage/dark/compact 390px/en, sand/light 390px/실제 RTL 모두 통과 |
| 부모/문서 높이 | 목록 열림 전후 세 경우 모두 0px 변화 |
| 기본 입력 높이 | PC 40px, 모바일 44px — 각각 실제 CSS 토큰 높이와 일치 |
| 키보드·상태 | 선택 불가 후보 건너뛰기, Enter 선택, 칩 Enter 제거 후 포커스, Backspace, Escape, clear, readonly/disabled, async 실패 후 retry 통과 |
| 터치·스크롤 | Chrome 터치 이벤트로 목록만 스크롤하고 페이지 scrollY는 유지. 터치 선택·viewport 폭·overflow 부모 탈출 확인 |
| 중첩 Dialog | 칩/입력의 Escape는 목록만 닫고, 다음 Escape는 바깥 창을 닫아 opener로 복귀 |
| SSR | 설치 tarball을 Vite SSR로 묶은 기존 검사 통과. window/document shim 없음 |
| 크기 | 기존 버전별 소스/전체 JS 및 8개 import gzip 예산 통과. 기준 변경 없음 |

raw Node import는 Vuetify CSS를 읽지 못하는 기존 실행 방식의 한계가 있었다. 공개 registry 1.1.0에서도 같은 `ERR_UNKNOWN_FILE_EXTENSION`을 확인했으며, 실제 SSR 판정은 기존 Vite SSR 검사 결과로 구분했다.

최종 개발 tarball SHA-256: `efcf726e03c120db76bf46298599057e13212450c0f79b52163e123f346454ab`.
공개 1.1.0 동결 artifact SHA-256은 `f39964b931082a23d2c06e7d87d18c9c536132600bc93397e1687bad1b0c1426`으로 유지됐다.
최종 ESM은 288,247 bytes / gzip 72,413 bytes로 registry 기준 대비 +762 / +207 bytes다. 패키지 전체 JS는 313,480 bytes / gzip 합계 79,682 bytes다.

실행 로그: `qa-output/improvements-30/multiselect-final-{build,consumer-types,browser,ssr,size}.log`.
실제 rect/상태와 캡처: `qa-output/multiselect-browser/multiselect-development-observations.json`, `multiselect-development-*.png`, `multiselect-nested-*.png`.
브라우저 검사와 fixture 소스는 `scripts/multiselect-browser-check.mjs`, `scripts/fixtures/multiselect-browser.ts`에 보존했다. 검사는 명시한 ignored QA consumer의 별도 하위 폴더만 생성한다.

## 상태 구분

6번의 두 요구인 부모 높이를 늘리지 않는 목록과 입력 내부 선택 칩은 개발본 구현·독립 소비 검증을 완료했다. npm 게시·공개 문서 설치본 반영·외부 소비 앱 업데이트는 하지 않았다. 물리 휴대폰, 실제 소프트 키보드, 스크린리더 검증은 미실행이다. 나머지 30개 요구 전체 완료를 뜻하지 않는다.

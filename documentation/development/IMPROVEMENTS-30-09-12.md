# 개선 9–12 개발 검증

공개 npm 1.1.0은 변경하지 않았다. 이 묶음은 1.1.1 준비 개발 브랜치에만 보존하며 최종 통합 검증·공개 배포는 전체 요구 완료 후 수행한다.

- **9 / 문서:** `recipes/fields.vue`의 의미 없는 지운 횟수 카운터를 제거하고 로딩이 입력 여부와 별개인 작업 상태임을 설명했다. 기존 패키지 spinner는 Chrome no-preference에서 이미 실제 회전했다. reduce에서는 의도적으로 회전을 줄이므로 상태 텍스트도 제공한다. 무조건 모션을 강제하지 않는다.
- **10 / 패키지:** `date-time.ts`, `styles.css`에서 opt-in scrubbing을 이름 있는 grip과 별도 행으로 분리했다. X와 picker 열기 버튼의 의미·기존 노출 조건을 유지한다. native 시·분은 각 select의 오른쪽 단위와 접근성 이름으로 제공하며 확인은 우측 primary 버튼이다. 새 prop/event나 Vuetify 버튼 의존성을 추가하지 않았다. 기존 nullable 모델, min-origin step, 수동 입력 guard, change/interaction 이벤트, required/name 폼 계약을 보존한다.
- **11 / 문서:** `recipes/accordion.vue`는 단일 예제와 독립 4개 예제를 제공한다. native details/summary의 Enter 및 독립 상태를 실제 브라우저로 확인했다.
- **12 / 문서+패키지:** `breadcrumbs.vue`와 `pagination.vue`를 각각 Components/Sample Code/starter에 연결했다. Breadcrumbs는 경로 이동 후 제목에 포커스를 보내고 Pagination은 부모의 제안 수락·거절을 실제로 시연한다. 기존 navigation 직접 링크는 독립 조합 예제로 남긴다. #7의 한쪽 숫자 stepper를 재사용한다. 첫·끝은 직접 작성한 `chevrons` path 하나로 그리며 이전·다음과 동일 폭이다. 440px 이하에서도 첫·끝을 숨기지 않고 줄바꿈한다. 기존 compact opt-in은 유지한다. 외부 아이콘/의존성/라이선스 추가는 없다.

## 실행 증거

- `step-09-12-core-build.log`, `step-09-12-package-build.log`: Core와 Vue UI 빌드 성공.
- `check:recipes`: 42개 canonical recipe 타입 검사 성공.
- `step-09-12-recipes.log`: 실제 설치 패키지로 42 SFC mount 및 기존 상호작용 성공. DOM 검사는 시각 검증과 구분한다.
- `step-09-12-coverage.log`, `step-09-12-integration.log`: Components/Sample Code/정확한 39 문서 canvas, 보존된 조합 예외 3개, 역할별 negative assertion 성공.
- `time-list-runtime-check.mjs --source`: 기본 native/수동 입력 guard/min 기준 step/키보드 선택·Escape·focus/폼 제출 계약 성공.
- `scripts/recipe-09-12-browser-check.mjs --consumer=qa-output/improvements-30/development-consumer`: 실제 새 tarball 설치 JS가 빌드 JS와 동일함을 확인한 뒤 5 recipe × 3 appearance = 15회 실제 Chrome 조작 성공. violet/light 1100px, sage/dark/compact 390px, sand/light/RTL 390px. 로딩 animation 시간/transform 변화와 reduce, Time native 확정·grip 키보드, Accordion 단일+4개 독립 열림, Breadcrumb 키보드/목적지 포커스, Pagination 1003/주변3/수락·거절/경계/아이콘 폭/모바일 넘침을 확인했다.
- 로컬 증거: `qa-output/recipe-09-12/observations.json`, `*-violet.png`, `*-sage.png`, `*-sand.png`. Pagination 다크 모바일과 Accordion RTL 캡처를 직접 확인했다.

검사 fixture의 초기 theme bridge 인자·Vue import, Accordion을 button으로 찾던 선택자, Vuetify RTL 설정 누락은 수정했다. 제품 회귀로 허위 분류하지 않는다. 물리 휴대폰·스크린리더·실제 소프트 키보드는 미검증이다. 이 묶음의 포인터 scrub 전체 회귀·최종 1.1.1 tarball/크기/SSR/출시 검사는 최종 후보에서 기존 검사를 재사용한다. 이번 설치본은 명시적 미게시 실험 tarball이며 동결 1.1.0 파일을 덮어쓰지 않았다.

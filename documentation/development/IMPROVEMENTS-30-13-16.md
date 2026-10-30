# 개선 13–16 개발 검증

이 변경은 미게시 1.1.1 준비 소스다. npm 1.1.0·동결 파일·소비 앱은 변경하지 않았다. 개발 브랜치 보존만 수행하며 최종 통합 전 공개 배포하지 않는다.

- **13:** `actions.ts`의 Context Menu 트리거에 기존 Core chevron을 추가해 메뉴 열기임을 표시했다. 메뉴 의미·label·우클릭·Shift+F10·readonly/disabled 계약은 유지한다. 기존 문서 iframe의 부모 높이 문제는 공통 호스트 수정으로 분리한다. 새 패키지 설치 fixture에서 연속 12프레임을 수집했으며 세 appearance 모두 x/y 변화 0, 카드 높이·문서 scrollHeight·앵커 위치·scrollY 변화 0이었다. 오른쪽 클릭, 키보드 메뉴 열기, disabled 건너뛴 End, 선택 및 Escape 후 opener focus를 실제 Chrome으로 확인했다. 사용자 원본의 모든 깜빡임 원인을 패키지로 단정하지 않는다.
- **14:** `presentation.ts`의 SStepper에 기존 기본값을 유지하는 `labelPosition: 'inline' | 'below'`(기본 inline)를 추가했다. 두 표현 모두 단계 연결선을 제공하며 완료/현재/다음 의미 토큰을 재사용한다. `identity-progress.vue`는 별도 완료 진행막대를 제거하고 이름 위치 선택, 왼쪽 초기화·오른쪽 이전/primary 다음을 제공한다. 완료 결과는 하나만 표시하며 실제 입력→분류→검토→완료→초기화와 목적지 focus를 확인했다. 예제 전용 actions CSS는 SFC scoped 영역에 둔다.
- **15:** `navigation.ts`, `styles.css`에서 수평 탭과 패널을 같은 기준선에 붙였다. 선택 탭은 패널과 연결되고 첫/끝 둥근 모서리의 분리감을 없앴다. 이중 baseline을 만들지 않도록 패널 top border를 제거했다. 숨긴 패널·aria-controls·roving focus·자동/수동 activation·수직 탭 계약은 바꾸지 않았다. 실제 방향키 전환, disabled 건너뛰기, 탭을 바꿔도 입력 보존, tablist/panel 경계 y 오차 0을 확인했다.
- **16:** `tree.ts` 부모 행 클릭은 기존 선택 이벤트와 함께 펼침을 제안한다. 기존 disclosure는 펼침만 수행하고 ArrowRight/Left·Enter 선택 계약도 유지한다. 라벨 및 행 빈 영역 클릭, 재클릭 접기, 자식 focus, ArrowLeft, 선택 유지 확인을 수행했다.

## 실행 근거

- `step-13-14-package.log`, `step-15-16-package.log`: 패키지 build/선언 생성 성공.
- `step-13-14-runtime.log`: source 전용 9개 컴포넌트 공개 계약 검사 성공.
- `step-15-16-runtime.log`: source 42개 recipe mount 및 기존 tree/선택/폼/워크플로 회귀 성공. DOM 검사와 실제 화면은 구분한다.
- `step-13-14-types.log`: recipe 타입 성공. RadioGroup이 string 모델을 방출하므로 예제 ref를 string|null로 받고 허용된 labelPosition으로 좁힌다.
- `qa-output/improvements-30/menu-stepper-browser.mjs`: 격리 소비 앱에 새 tarball 설치 후 dist JS가 빌드 JS와 같음을 확인했다. violet/light 1100px, sage/dark/compact 390px, sand/light/RTL 390px에서 13–16 실제 조작을 실행했다. 최종 성공 로그는 `step-13-16-browser.log`, 좌표·프레임은 `menu-stepper-observations.json`, 실제 캡처는 `menu-*`, `stepper-*`, `tabs-*`, `tree-*`다. 메뉴 다크 모바일·Stepper PC/모바일 캡처를 직접 확인했다.

새 의존성·라이선스·토큰·공개 컴포넌트는 추가하지 않았다. 공개 API 추가는 Stepper의 opt-in 표현 prop 하나다. 물리 기기·스크린리더는 미검증이다. 전체 30개 및 최종 1.1.1 artifact/SSR/크기/설치 검사는 남아 있다. 생성 문서도 아직 공개 배포하지 않는다.

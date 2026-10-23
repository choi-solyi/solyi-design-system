# 변경 이력

## 2026-10-23 · 한국시간

- Vue 3용 `solyi-ui`에 컴포넌트와 Core 토큰·CSS·helper·타입을 함께 제공합니다.
- 버튼·입력·폼 검증·레이아웃·표·선택·탐색·알림·오버레이·날짜/시간·파일·차트·트리·진행 표시를 S 컴포넌트로 사용할 수 있습니다.
- Violet·Sage·Sand 테마, 라이트·다크, 기본·컴팩트 밀도와 Wanted Sans·코드 폰트를 연결합니다.
- 예제와 API를 컴포넌트 문서에서 함께 확인하고 같은 Vue SFC를 표시·복사·실행합니다.
- Vue 자동 import·TypeScript·lint 설정, Prism 문법 강조와 소비 프로젝트 디자인 지침을 제공합니다.
- 설치·업데이트·라이선스·기여 안내를 정리하고 패키지·Vue/Vuetify의 버전 조합과 잠금 파일 관리를 안내합니다.

- 공개 선언의 Vuetify 타입 인라인 복제를 제거하고 소비자 TypeScript 설정을 정리했습니다.
- Tabs·Resizable Split Pane은 탐색·레이아웃 API로 구분합니다. 동작하지 않던 rules·required·serverError·errorMessages props를 제거했으며 label·help·error·disabled·readonly는 유지합니다.
- 숫자 입력 경계, 미저장 이탈 확인, 재시도 포커스, 보이는 이름과 접근성 이름을 일치시켰습니다.
- 좁은 화면 차트의 글자 크기와 입력 조합 여백, 알림 줄바꿈, 코드·HTML 의미 구조를 정리했습니다.
- 문서 필수 CSS를 묶고 코드 글꼴을 필요한 시점에 로드합니다. 실행 예제는 필수 CSS와 앱 준비 후 표시하며 선택 글꼴 때문에 로딩을 지연하지 않습니다.

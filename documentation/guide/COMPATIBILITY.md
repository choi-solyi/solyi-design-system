# 버전과 호환

## 패키지 조합과 도구

현재 권장 solyi-ui 버전은 [Getting started의 설치](https://ui.solyi.kr/#start/install)에 표시됩니다. 정확한 버전과 파일은 [릴리스 카탈로그](https://ui.solyi.kr/releases/index.json)를 기준으로 합니다. 공통 스타일·토큰·폰트는 solyi-ui에 포함되며 Vue·Vuetify는 peer dependency로 함께 사용합니다.

기본 설치는 `npm install solyi-ui` 또는 `pnpm add solyi-ui`입니다. npm(7 이상)과 pnpm의 기본 설정은 필요한 peer를 자동 다운로드하지만 pnpm의 격리 구조에서 앱이 Vue·Vuetify를 직접 import하는 데 충분하다는 뜻은 아닙니다. 새 pnpm 앱에서 직접 import하려면 `pnpm add solyi-ui vue vuetify`처럼 앱 의존성에 명시합니다. 기존 호환 버전은 유지할 수 있으며 자동 peer 다운로드를 끈 환경도 직접 설치해야 합니다.

- 포함된 토큰은 프레임워크 독립 CSS custom properties와 단순 JSON export입니다. DTCG 적합성이나 모든 앱 호환을 표방하지 않습니다.
- 확인한 소비 환경은 Vue 3.5.44, Vuetify 4.3.0, Vite 8.3.4입니다. Node 요구 범위는 `^22.18.0 || >=24.12.0`이며 검증에 사용한 Node는 22.23.3입니다. peer 범위 내 모든 버전과 Vuetify 3·React를 검증했다는 뜻은 아닙니다.
- Vue 함수 자동 import에는 소비 앱의 unplugin-auto-import Vue preset·TypeScript·lint 설정이 필요합니다. S 컴포넌트 전역 등록만으로 Vue 함수가 자동 import되지는 않습니다.
- SContainer·SRow·SCol은 Vuetify 레이아웃의 재사용 이름입니다. SCard는 자체 article 기반 API이며 모든 VCard 옵션을 전달하지 않습니다.
- 공통 locale은 ko-KR/en-US와 LTR을 제공합니다. 모든 언어·RTL·모든 입력기 지원을 주장하지 않습니다. 날짜 모델은 ISO date-only, 시간 모델은 HH:mm입니다.

## 디자인과 동작 계약

버튼·행동 컨트롤은 6px, 입력·선택 필드는 10px, 카드·작은 팝업은 12px, 다이얼로그·큰 패널은 16px 반경을 사용합니다. 원형 아이콘·아바타·상태 점·일부 배지는 의도된 원형을 유지합니다. 기본 데스크톱 버튼은 36px·필드는 40px이며 좁은 화면과 터치 목표는 44px입니다.

긴 데이터는 말줄임과 전체 내용 접근 경로를 함께 제공하며 문서 본문·textarea를 일괄 자르지 않습니다. 알 수 없는 진행률에 가짜 퍼센트나 aria-valuenow를 표시하지 않습니다. reduced-motion에서는 불필요한 이동과 반복 모션을 줄입니다.

모델 값은 소비 앱이 소유합니다. 입력 검증·서버 오류·포커스는 [폼 계약](FORMS.md), 언어 교체와 부분 override는 [locale 계약](LOCALE.md), 설치와 버전 관리는 [설치·업데이트](DISTRIBUTION.md)를 확인합니다.

## 검사 범위와 한계

패키지 exports·타입·실제 tarball 설치, 독립 소비 앱 빌드, 컴포넌트 동작, DOM 회귀를 검사합니다. 외부 Vuetify 선언 전체 검사는 skipLibCheck의 제한이 있습니다. 자동 접근성 검사나 Lighthouse 점수는 WCAG 준수 인증이 아닙니다.

문서와 예제는 ES modules, native dialog, AbortController, container queries 등 현대 브라우저 기능을 사용합니다. 실제 Safari·Fold/터치·화면 낭독기·하드웨어 IME·400% 확대·forced colors 등은 각 실행에서 실제 확인한 범위만 결과로 판단해야 합니다. 검증 기록이 없는 환경은 통과로 간주하지 않습니다.

다른 앱과 계정·권한·실데이터는 자동 연결하지 않습니다. 재사용 코드·브랜드 자산·폰트의 권리는 [라이선스 범위](../../LICENSE-SCOPE.md)를 확인합니다.

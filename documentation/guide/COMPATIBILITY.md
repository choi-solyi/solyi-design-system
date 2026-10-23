# 검증과 호환 범위

이번 통합 후보는 문서 **0.11.0 / Core 0.4.3 / Vue UI 0.9.0**입니다. 후보의 구현·로컬 검사와 공개 CI·배포 성공은 구분합니다. 정확한 검증 결과는 [QA.md](../quality/QA.md), 현재 작업 완료표는 [통합 계획](../plans/0.11.0-integration.md)을 따릅니다.

## 지원 계약

- Core는 프레임워크 독립 CSS custom properties와 단순 JSON export입니다. DTCG 포맷 준수나 모든 앱 호환을 표방하지 않습니다.
- 실제 설치 기준은 Vue **3.5.44**, Vuetify **4.3.0**, Vite **8.3.4**입니다. Node는 `^22.18.0 || >=24.12.0`을 요구하고 작업 기준은 **22.23.3**입니다. peer 범위 안의 모든 버전이나 Vuetify 3·React를 검증한 것은 아닙니다.
- S 컴포넌트는 각 문서에 명시한 API를 제공합니다. SContainer/SRow/SCol은 Vuetify 레이아웃을 재사용하지만 SCard는 자체 article 기반 컴포넌트입니다. 이름이 비슷하다고 모든 VCard 옵션을 지원하는 것은 아닙니다.
- Vue 자동 import는 소비 프로젝트의 Vite·TypeScript·lint 설정이 있어야 동작합니다. S 컴포넌트 전역 등록과 Vue 함수 자동 import를 구분합니다.
- 언어팩은 ko-KR/en-US의 LTR을 제공합니다. 앱 콘텐츠 번역·RTL·모든 언어 지원을 뜻하지 않습니다. 저장값은 ISO date-only와 HH:mm을 유지합니다.

## 디자인과 동작

버튼·작은 컨트롤 6px, 입력·내부 면 10px, 카드·작은 팝업 12px, 다이얼로그·큰 패널 16px 역할 반경을 사용합니다. 원형 아이콘·아바타·상태 점과 화면 가장자리의 0px 연결은 의도된 예외입니다. 기본 컨트롤은 데스크톱 버튼 36px·필드 40px, 좁은 화면/터치 목표 44px입니다.

말줄임은 데이터 제목과 셀 범위에 적용하고 문서 본문이나 textarea를 강제로 자르지 않습니다. 알 수 없는 진행률은 가짜 퍼센트와 aria-valuenow를 표시하지 않습니다. reduced-motion과 기본 모션의 검증 범위를 구분합니다.

## 검사 한계

자체 TypeScript 소스·소비 앱 API 사용·실제 tarball 설치·생성 파일·공통 토큰 대비·DOM 회귀를 검사합니다. 외부 Vuetify 선언 전체 적합성 검사는 `skipLibCheck`의 한계가 있으며, 자동 검사나 Lighthouse 점수가 접근성 준수 인증은 아닙니다.

문서와 샘플은 ES modules·native dialog·AbortController·container queries 등 현대 브라우저 기능을 사용합니다. 실제 브라우저 최저 버전을 인증하지 않았습니다. 실제 Safari·물리 Fold/터치·화면 낭독기·하드웨어 IME·400% 확대·forced colors·OS 다운로드 저장·CLS는 실제 실행한 근거가 없으면 미검증으로 남깁니다.

다른 앱과 계정·권한·실데이터에는 자동 적용하지 않습니다. 과거 단계별 조합과 당시 한계는 [호환 이력 부록](../development/COMPATIBILITY-HISTORY.md)에 보존하며 현행 지원 선언으로 읽지 않습니다.

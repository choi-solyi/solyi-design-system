# 다음 확장 · 현재 구현과 잔여 범위

공개 기준: b8648fa / 문서0.5.0, Core/UI0.3.0. 검색 순위624bc43과 다음 로컬 작업은 아직 공개하지 않습니다.

- [x] 공통 locale: 기존 provider 재사용, 한국어·영어20종 기본 문구, Field/Dialog/Table, 반응형 앱 설정/부분 override/fallback, Intl 날짜·숫자와 ISO/HH:mm 값 정책. [LOCALE.md](LOCALE.md), 로컬 Core0.3.1/UI0.4.0.
- [x] 두 실제 tarball 소비 앱, 타입/20종 회귀 및 locale 전용 테스트. Chrome1643/333px와 언어×3테마×light/dark 대표 검수. 문서 전체 번역·RTL/추가 언어 지원은 포함하지 않음.
- [x] 기존 Pages의 버전별 tarball/manifest/해시·고정 설치/업데이트/롤백 및 HTTP 독립 소비 검증. [단계별 계획](LOCALE-DISTRIBUTION-PLAN.md). 로컬 출력 준비와 HTTP 설치/업데이트/롤백까지 완료. 공개 URL 설치는 아직 불가하며 push가 보류된 상태임.
- [ ] 위 로컬 단계와 검색 수정의 공개 push/Pages 배포. 이번 지시에서는 보류.

별도 후속 범위:

- Figma 키트 및 코드 토큰·상태·버전 대응표: 미작성, 새 계정/플러그인 연결 없음.
- 실제 iPhone Safari·물리 폴드/터치·화면낭독기·하드웨어 IME·400%/forced colors/CLS: 미검증. DOM 검사와 Chrome 좁은 폭을 실기기 통과로 대체하지 않음.
- 기존 참고 예제의 추가 Vue 전환: 단일 Autocomplete, 파일 선택/드롭, Tooltip/Popover/Accordion, Avatar/Breadcrumb/Side panel, Progress/Step/Chart/Tree 및 폼·상태·편집·화면 템플릿 조합. [VUE-MIGRATION.md](VUE-MIGRATION.md)의20종 실제 API와 참고 예제 구분 유지.
- 다른 소비 앱의 자동 버전 업데이트 PR→각 앱 검사→배포/롤백 연결: 대상별 별도 승인 후 진행. 현재 자동 변경은 이 저장소 문서/starter뿐이며 아페·개인 홈페이지는 미연결.
- npm/GitHub Packages 게시, 새 credential/권한/계정/비용: 이번 범위 밖이며 수행하지 않음.

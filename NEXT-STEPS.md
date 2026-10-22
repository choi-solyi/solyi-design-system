# 다음 확장 · 현재 구현과 잔여 범위

공개 기준: 8d0b297 / 문서0.6.0, Core0.3.1/UI0.4.0. 검색·공통 locale·버전별 다운로드·색상 헤더는 공개 완료. 현재 로컬 후보0.7.0(Core0.3.2/UI0.5.0)은 S API·직접 Vuetify 연결·Progress 2종이며 공개 push는 보류합니다.

- [x] 공통 locale: 기존 provider 재사용, 한국어·영어20종 기본 문구, Field/Dialog/Table, 반응형 앱 설정/부분 override/fallback, Intl 날짜·숫자와 ISO/HH:mm 값 정책. [LOCALE.md](LOCALE.md), 공개 Core0.3.1/UI0.4.0.
- [x] 두 실제 tarball 소비 앱, 타입/20종 회귀 및 locale 전용 테스트. Chrome1643/333px와 언어×3테마×light/dark 대표 검수. 문서 전체 번역·RTL/추가 언어 지원은 포함하지 않음.
- [x] 기존 Pages의 버전별 tarball/manifest/해시·고정 설치/업데이트/롤백 및 HTTP 독립 소비 검증. [단계별 계획](LOCALE-DISTRIBUTION-PLAN.md). 로컬 출력 준비와 HTTP 설치/업데이트/롤백까지 완료. 0.5.0/0.6.0의 공개 URL 설치 경로는 이전 배포에서 확인됨. 새0.7.0은 로컬 준비 단계임.
- [x] 위 검색·locale·배포 경로·헤더 변경의 공개 push/Pages 배포(8d0b297).
- [ ] S API·Vuetify 공통 연결·Progress 2종의 공개 push/Pages 배포. 이번 지시에서는 보류.

별도 후속 범위:

- Figma 키트 및 코드 토큰·상태·버전 대응표: 미작성, 새 계정/플러그인 연결 없음.
- 실제 iPhone Safari·물리 폴드/터치·화면낭독기·하드웨어 IME·400%/forced colors/CLS: 미검증. DOM 검사와 Chrome 좁은 폭을 실기기 통과로 대체하지 않음.
- 기존 참고 예제의 추가 Vue 전환: 단일 Autocomplete, 파일 선택/드롭, Tooltip/Popover/Accordion, Avatar/Breadcrumb/Side panel, Step/Chart/Tree 및 폼·상태·편집·화면 템플릿 조합. 현재22종 실제 API와 나머지 참고 예제는 [전수 목록](REUSE-INVENTORY.md)과 [S API](S-API.md)에서 구분.
- 다른 소비 앱의 자동 버전 업데이트 PR→각 앱 검사→배포/롤백 연결: 대상별 별도 승인 후 진행. 현재 자동 변경은 이 저장소 문서/starter뿐이며 아페·개인 홈페이지는 미연결.
- npm/GitHub Packages 게시, 패키지명/라이선스 변경, 새 credential/권한/계정/비용: 수행하지 않음. sol-ui는 이름 후보일 뿐 사용권·공개 범위·라이선스 미확정.

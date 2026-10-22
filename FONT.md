# 기본 UI 글꼴 · Wanted Sans

사용자가 선택한 기본 UI는 Wanted Sans Variable **1.0.3**입니다. [공식 저장소](https://github.com/wanteddev/wanted-sans) 커밋 `02c9b822349c188ada95f9e2d90c2ed18f853235`의 complete WOFF2(1,289,292 bytes), CSS, SIL OFL1.1을 변형 없이 복사했습니다. 원본 경로·Git blob·SHA-256은 [SOURCE.json](site/fonts/wanted-sans/SOURCE.json), 라이선스/저작권 원문은 [OFL.txt](site/fonts/wanted-sans/OFL.txt)에 보존합니다. 공식 CSS의 Reserved Font Name도 그대로입니다. 별도 서버/CDN·외부 글꼴 요청은 사용하지 않습니다.

- `--sol-font-sans`만 Wanted Sans/시스템 fallback 스택으로 바꿉니다. `font-mono`와 code/pre/kbd는 기존 monospace를 유지합니다. 공식 CSS의 가변 굵기는400–1000입니다.
- Core에서 `@solyi/core/fonts.css`를 import하면 같은 패키지 안의 WOFF2를 사용합니다. 문서와 실제 starter가 이를 소비합니다. 자체 소스의 UNLICENSED와 달리 이 글꼴은 OFL1.1 조건을 유지하며, 원본 라이선스가 Core pack과 사이트·starter 고지에 포함됩니다.
- 공식 `font-display:swap`을 유지합니다. 로드 중/실패 때에는 -apple-system, BlinkMacSystemFont, system-ui, Segoe UI, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic 및 emoji/sans-serif로 넘어갑니다. 각 기기에 모든 fallback이 설치되어 있다는 뜻은 아닙니다.
- 단일 complete 파일은 한글·영문·숫자의 범위를 예측하기 쉽지만 약1.29MB의 다운로드가 필요합니다. 문서는 같은 origin에서 preload하고, starter는 Vite가 실제 패키지 CSS의 상대 URL을 번들 산출물로 옮깁니다. 이전 CSS만 쓰는 소비 앱에 글꼴 설치를 자동 강제하지 않습니다.
- 고정 열·말줄임·입력/버튼 높이를 글자 너비에 의존시키지 않습니다. 실제 폰트 로딩, 좁은 화면의 한글 줄바꿈과 긴 표 제목, fallback 및 레이아웃 변동은 QA 기록에서 확인된 범위만 보고합니다. iPhone Safari·화면낭독기·모든 OS 글꼴 렌더링을 검증했다고 주장하지 않습니다. 코드용 새 폰트는 아직 선택하지 않았습니다.

업데이트 시 임의 CDN latest를 쓰지 말고 공식 버전·커밋·해시와 OFL을 함께 갱신하고 소비 앱의 lock/build/화면을 다시 검증합니다.

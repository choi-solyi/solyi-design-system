# 기본 UI 글꼴 · Wanted Sans

기본 UI 글꼴은 Wanted Sans Variable **1.0.3**입니다. [공식 저장소](https://github.com/wanteddev/wanted-sans) 커밋 `02c9b822349c188ada95f9e2d90c2ed18f853235`의 complete WOFF2(1,289,292 bytes), CSS, SIL OFL1.1을 변형 없이 복사했습니다. 원본 경로·Git blob·SHA-256은 [SOURCE.json](../../site/fonts/wanted-sans/SOURCE.json), 라이선스/저작권 원문은 [OFL.txt](../../site/fonts/wanted-sans/OFL.txt)에 보존합니다. 공식 CSS의 Reserved Font Name도 그대로입니다. 별도 서버/CDN·외부 글꼴 요청은 사용하지 않습니다.

- `--sol-font-sans`만 Wanted Sans/시스템 fallback 스택으로 바꿉니다. 코드 글꼴은 아래의 별도 opt-in CSS와 `font-mono` 토큰으로 구분합니다. 공식 CSS의 가변 굵기는400–1000입니다.
- `solyi-ui/fonts.css`를 import하면 같은 패키지 안의 WOFF2를 사용합니다. 문서와 실제 starter가 이를 소비합니다. 자체 코드의 MIT와 별도로 이 글꼴은 OFL1.1 조건을 유지하며, 원본 라이선스가 solyi-ui 패키지와 사이트·starter 고지에 포함됩니다.
- 공식 `font-display:swap`을 유지합니다. 로드 중/실패 때에는 -apple-system, BlinkMacSystemFont, system-ui, Segoe UI, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic 및 emoji/sans-serif로 넘어갑니다. 각 기기에 모든 fallback이 설치되어 있다는 뜻은 아닙니다.
- 단일 complete 파일은 한글·영문·숫자의 범위를 예측하기 쉽지만 약1.29MB의 다운로드가 필요합니다. 문서는 같은 origin에서 preload하고, starter는 Vite가 실제 패키지 CSS의 상대 URL을 번들 산출물로 옮깁니다. 이전 CSS만 쓰는 소비 앱에 글꼴 설치를 자동 강제하지 않습니다.
- 고정 열·말줄임·입력/버튼 높이를 글자 너비에 의존시키지 않습니다. 실제 폰트 로딩, 좁은 화면의 한글 줄바꿈과 긴 표 제목, fallback 및 레이아웃 변동은 해당 실행 환경에서 확인합니다. iPhone Safari·화면낭독기·모든 OS 글꼴 렌더링을 검증했다고 주장하지 않습니다. 코드용 글꼴의 별도 선택과 검증 범위는 아래에 기록합니다.

업데이트 시 임의 CDN latest를 쓰지 말고 공식 버전·커밋·해시와 OFL을 함께 갱신하고 소비 앱의 lock/build/화면을 다시 검증합니다.

## 코드 글꼴 · 로컬 후보 (공개 배포 대기)

사용자 선택은 **JetBrains Mono → Nanum Gothic Coding → monospace**입니다. D2Coding/Fira Code/Lilex는 포함하지 않습니다. UI Wanted Sans, 색·반경·크기는 유지합니다. 기존 `9ee1faf` 뒤의 별도 커밋으로 관리하며 공개 푸시·Pages 배포는 하지 않습니다. 아직 게시하지 않은0.5.0/Core0.3.0 후보에 로컬 변경을 더했으므로 소비 검증 때 tarball과 integrity/lock을 다시 만듭니다. 원본 커밋은 amend하지 않습니다.

- [JetBrains Mono 공식2.304](https://github.com/JetBrains/JetBrainsMono/tree/cd5227bd1f61dff3bbd6c814ceaf7ffd95e947d9): Regular/Bold WOFF2 원본, 총186,752 bytes. [고정 원본·SHA-256·Git blob](../../site/fonts/jetbrains-mono/SOURCE.json), [OFL1.1 원문](../../site/fonts/jetbrains-mono/OFL.txt).
- [나눔고딕코딩 공식 Google Fonts 원본](https://github.com/google/fonts/tree/9cb22ac3b8e238d037c48f98ef521f818958e102/ofl/nanumgothiccoding): name table 버전2.000, Regular/Bold TTF 원본, 총4,562,164 bytes. [METADATA](../../site/fonts/nanum-gothic-coding/METADATA.pb)와 [고정 원본·해시](../../site/fonts/nanum-gothic-coding/SOURCE.json), [OFL1.1/Reserved Font Name 원문](../../site/fonts/nanum-gothic-coding/OFL.txt)을 보존합니다. 공식 웹 CSS의 family는 Nanum Gothic Coding이며 내부 폰트명은 NanumGothicCoding입니다. CSS family 별칭만 공식 이름으로 매핑하고 글꼴 바이너리·이름을 변형하지 않았습니다.
- 원본 전체 TTF는 한글 범위를 유지하는 대신 큽니다. 직접 변환/서브셋 생성 없이 원본을 택했습니다. 둘을 합쳐 약4.75MB이며 UI Wanted Sans와 별도입니다. preload하지 않고 해당 굵기·글리프가 실제로 필요할 때 로드합니다. 전송 크기/캐시와 실제 네트워크 조건에 따라 지연될 수 있습니다.
- `import 'solyi-ui/code-fonts.css'`는 self-host @font-face와 code/pre/kbd/samp의 font-family만 적용하는 opt-in export입니다. 상대 URL·원본 OFL/SOURCE도 pack에 포함됩니다. 문서/실제 starter/독립 소비 앱이 같은 CSS를 사용합니다. 기존 mono 토큰을 쓰던 버전 번호·토큰 값 등도 같은 고정폭 글꼴을 사용합니다. 일반 UI에는 적용하지 않습니다.
- CSS의 글리프별 fallback으로 영문·숫자·지원 기호는 JetBrains Mono, 미지원 한글은 나눔고딕코딩으로 넘어갑니다. 둘 다 실패하면 monospace입니다. 지원하지 않는 모든 문자의 표현이나 모든 OS의 같은 모양은 보장하지 않습니다. Regular400/Bold700만 포함하며 중간 굵기는 브라우저의 글꼴 매칭, italic은 기존 합성 동작을 따릅니다.
- `font-display:swap`, 기본 리가처 동작을 유지하며 별도 OpenType 설정·토글을 추가하지 않습니다. JetBrains Mono 자체의 기본 리가처가 보일 수 있습니다. 긴 코드 샘플은 키보드로 초점 후 가로 스크롤할 수 있고, 기존 API JSON 출력의 줄바꿈은 유지합니다.

로컬 검증 결과와 실제 Chrome 범위/미검증은 QA.md에 기록합니다. 글꼴 시스템 설치, 편집기 설정, 다른 앱, 외부 레지스트리 게시를 변경하지 않습니다.

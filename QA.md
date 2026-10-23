# 검증 기록

## 헤더의 이어진 선택 그룹 · 2026-10-23 UTC

- 문서 헤더의 테마와 밀도만 각각 연결된 그룹으로 정리했습니다. 기존 native radio/fieldset, 테마색 토큰, 체크 표시, 공유 상태·저장 로직을 유지합니다. 중간 경계는 1px를 공유하고 바깥쪽 모서리만 기존 버튼 반경 6px를 사용하며, 키보드 포커스는 인접 버튼에 가리지 않도록 안쪽에 표시합니다. 패키지 소스·버전·과거 tarball은 변경하지 않습니다.
- 관련 검사 통과: `scripts/build.mjs`, `scripts/header-preferences-check.mjs`(72개 텍스트·체크·포커스·경계 대비), `scripts/doc-search-check.mjs`(61개 검색 목적지 및 테마×밀도×모드 12개 저장·복원/공유 상태). 기존 패키지 전체 빌드를 로컬에서 반복하지 않았습니다.
- 실제 렌더링: 사용자 PC에 설치된 Google Chrome 155.0.8059.85를 Playwright Core 1.64.1로 격리된 headless 컨텍스트에서 실행했습니다. 사용자 프로필을 사용하지 않고 Chromium sandbox를 유지하며, 무작위 localhost 포트 외의 요청은 차단했습니다. 1180·720·333 CSSpx × 라이트·다크 6장의 스크린샷을 직접 검토했습니다. 720·333px는 터치 에뮬레이션이며 실제 Fold나 터치 조작 검증이 아닙니다.
- 검토 결과: PC의 두 선택 그룹·검색·모드 전환이 겹치지 않고, 작은 화면의 화면 설정 패널에서도 테마 3개와 밀도 2개가 각각 한 줄에 들어갑니다. 경계 공유, 모서리, 체크와 포커스 표시, 텍스트 잘림 및 가로 넘침을 확인했습니다. DOM 검사에서도 1px 경계 공유/6px 바깥 반경, 데스크톱 36px·터치 에뮬레이션 44px 높이, 방향키로 모든 테마와 밀도 선택, 라이트·다크 전환, 새로고침 후 복원, Escape 닫기·초점 복귀가 통과했습니다. 실행 중 pageerror는 없었습니다.
- 로컬 증거: `qa-output/header-segments/`의 6개 PNG와 `report.json`, `header-segments-browser.log`, `header-segments-preferences.log`. 선택적 재현 스크립트는 `scripts/header-segments-browser-check.mjs`입니다. `.tooling/browser-qa`에 공식 registry의 `playwright-core@1.64.1`을 `--ignore-scripts`로 설치한 뒤 실행하며, 설치 Chrome 경로는 `SOLYI_QA_CHROME`, 모듈 URL은 `SOLYI_PLAYWRIGHT_MODULE`로 지정할 수 있습니다. 앱 런타임 의존성과 기본 CI 검사에 추가하지 않습니다.
- 실제 Safari·Fold 기기·화면 낭독기는 미검증입니다. 이 검수는 헤더 변경의 영향 범위이며 전체 접근성 준수나 모든 상태의 화면 검수를 뜻하지 않습니다. 이 기록은 푸시 전에 작성하며, 정확한 SHA의 CI 최종 결과와 공개 자산 일치는 배포 보고에서 별도로 확인합니다. npm 게시·1.0.0 변경·이전 버전 삭제는 하지 않습니다.

## 0.10.0 local candidate · dedicated Vue APIs / code panels (2026-10-22 UTC)

### Final local visual review completed · 2026-10-23 UTC

- The earlier capture blockers below are historical. Reclaimed the current Chrome tab through the supported browser API and used localhost against the same local server/candidate. Actual component screenshots then worked without changing OS preferences or granting access. The specific cause of127.0.0.1 capture failures was not established; PC locking was never confirmed.
- Actual user-PC Chrome pixel review:333CSS dark STooltip (Space/focus/Escape), open SPopover with its corrected heading spacing;333CSS light expanded SAccordion and inner-link keyboard focus;333CSS dark SBreadcrumbs/action spacing;333CSS light SAvatar/SStepper validation and visible field focus/error;720CSS dark avatar/three-step layout;720CSS light and333CSS dark SBarChart with matching full table, zero values and week switching.720CSS light breadcrumb/actions were also inspected. These are actual iframe viewport widths using the installed-package canonical recipes, not physical Fold testing.
- Canonical SAutocomplete at333CSS light: persistent error panel, Tab-reachable retry, Enter retry and selected value were captured. Empty results at333 light/720 dark were inspected. Its150/450ms transient loading was observed in the live DOM but not falsely counted as a captured loading image. Separately captured the actual installed SAutocomplete with a controlled local pending loader at333/720CSS dark, using the same shipped stylesheet. That QA-only consumer has no network request and is not the canonical demo or a shipped feature. Loading panel padding, wrapping and focus fit the viewport; Escape cancels it.
- Real OS file chooser used only generated safe sample-ui.txt and sample-ui.unsupported.333CSS light screenshot confirmed the actual rejection alert, accepted TXT/type/44B metadata and removal controls. Clear reset the demo. No user files, file contents or external upload were involved. Picker tooling response was slow; it was not repeatedly rerun.
- Earlier actual1180CSS light /333CSS dark code-panel screenshots confirm16px content padding, tabs attached to the panel, top-right copy/check action and separate execution-link footer. Actual clipboard selection and feedback were checked. Thirty canonical SFCs share display/copy/execution source and global registration.
- Review findings fixed in ead5443: page-header margin24px leaked into package popover headers; now scoped to the two page chrome headers. Isolated date/files/autocomplete parts skipped h1→h3; now use headingLevel2. Related starter build, Vue types, recipe/navigation/heading/source-identity/document integration checks passed. The corrected popover and isolated headings were confirmed in the resumed real-browser review. No further release-blocking overlap or horizontal clipping was found in the representative views above.
- Existing clean tarball/type/build/runtime/HTTP-update/rollback and full npm test evidence remains valid; no production code/package bytes changed during the capture recovery, so those costly suites were not rerun merely for screenshots. This is representative visual QA, not every theme/state/locale combination or accessibility certification. Real Safari, physical Fold/touch, screen readers,400%/forced-colors and font-failure/CLS measurements remain unverified.
- This record is prepared before push. The exact commit's CI final status and public hash verification are tracked by GitHub Actions and the final deployment report; they are not predeclared successful here. npm remains unpublished and1.0.0/historical deletion are excluded.

#### Historical capture/recovery evidence (superseded by the completed review above)

### Capture follow-up and two local fixes (2026-10-22 UTC)

- Supported AX+screen combined capture intermittently returned real images: a720CSS dark tooltip/popover default view (the surrounding overridden screenshot had repeated edge artifacts, so that image is limited evidence), and the open popover at the default desktop viewport (888×741CSS measured around that session). The latter exposed a real adapter leak: generic page-header margin24px overrode the package popover heading. Narrowed the adapter selector to the two page chrome headers. Computed panel-heading margin is now0 0 12px; post-fix popup pixel review remains incomplete.
- The actual isolated inputs/files frame exposed h1→h3 when only a part was rendered. Date/files/autocomplete parts now use headingLevel2; the full combined recipe retains h2→h3. Added runtime regression for all three isolated parts.
- PASS after these changes: real starter rebuild, vue-tsc, all30 installed-package recipe runtime tests plus isolated-part headings, navigation/adapter-scope assertions, code-panel source identity and real document-preview integration. Package bytes/versions are unchanged, so previously verified tarball/HTTP installation checks were not unnecessarily repeated.
- Remaining capture diagnosis: Page.captureScreenshot times out after5000ms for full viewport, small333×360CSS crop, basic screenshot and AX+screen calls. Fonts were loaded and document.getAnimations() was empty. A local-only fixed333/720CSS iframe harness using the actual candidate was also tried without browser metrics override; no remote upload or product mock was used. DOM/actions and HTTP remain responsive. These facts narrow the issue to an intermittent browser-capture path; its underlying cause is unconfirmed and it is not an observed permission rejection.
- Only the connected Chrome extension browser is available; no separate supported native capture entry point is exposed in this session. Asked the user to check that the PC is unlocked and the Chrome review tab is visible; that response is pending. No browser/GPU/OS security setting was changed and no unsupported capture helper was used. Do not mark remaining mobile/Fold-like new-component/error pixel checks passed or deploy before that review.

- Core0.4.2 / UI0.8.0, nine additions: STooltip, SPopover, SAccordion, SBreadcrumbs, SFileInput, SAutocomplete, SAvatar, SStepper, SBarChart. Same canonical30 SFCs drive document canvases, visible/copyable code and the standalone explorer; global runtime registration and opt-in template declarations are installed in the real consumer.
- PASS: library build/declarations/exports/licenses and two clean tarball installs, independent TypeScript/Vite build (including invalid-prop checks), vue-tsc for all30 SFCs, installed old/new runtime suites, real document-bootstrap/alias/ARIA/height/origin/appearance/leave guards, and versioned HTTP previous/update/rollback with integrity and corrupt/missing/overwrite guards. The full pipeline reached its last regression stage; stale reference-fixture assumptions (per-SFC import and17-icon count) were corrected and affected gates rerun. Final npm test rerun exited successfully after the fixture updates. Native Core controller/search unit tests explicitly isolate Vue preview mounting; the separate real-bootstrap integration keeps previews active.
- PASS: 186 token contrast pairs;630 semantic button state/variant/theme combinations, minimum4.562:1. Official brand bytes and font/OFL/license consistency remain checked. SBtn tone variants use the same token foreground/background pairs. These automated checks do not certify WCAG conformance.
- Actual user-PC Chrome, local candidate:1180×820CSS light code panel/header tabs/right copy icon/16px padding and separated footer inspected from successful screenshots;333×800CSS dark code panel inspected from a successful screenshot. Actual clipboard content matched the selected Vue/HTML tab, copied feedback was exposed, and the original clipboard was restored.
- Actual Chrome interaction/DOM checks:333CSS dark popover close focus/Escape return, async autocomplete error → Tab-reachable retry → Enter response, safe fictional .txt selection plus unsupported-format rejection and clearing.720CSS light/dark: step error/name focus and next-category focus, accordion Enter/Space, chart previous-week values1/3/2/4 and total, sage theme and compact chart rows (~40.16CSSpx). These are functional/DOM observations, not screenshot verification of those states. User files were not used or transmitted.
- BLOCKED before publication: subsequent screenshot calls returned Page.captureScreenshot timeouts for the standalone new-API screens and an open popover in the document iframe. The same failing captures were not retried indefinitely. New-component default/open/error pixel review and the complete PC/mobile/Fold-like × light/dark visual matrix remain incomplete; do not mark them passed. No candidate push/Pages deployment has occurred.
- Not verified: actual Safari, physical Fold/touch, screen readers, all locale/long-copy pixel combinations, font-failure/CLS lab metrics. User device review remains separate. No OS preference was changed.
- npm remains unpublished/private:true; sol-ui registry response is an unpublished-name tombstone, not proof of availability or ownership. Own reusable code is MIT; brand assets excluded and third-party font notices preserved. No1.0.0 or historical artifact deletion.


## 예제 탐색 개선 · 2026-10-22 · 문서 0.9.1 후속 수정

- `starter/?view=recipes`의 필수 선택 필드를 제거하고 30개 예제를 5개 분류의 실제 링크로 제공합니다. 1100 CSS px 이상은 왼쪽 목록·오른쪽 예제이며, 좁은 폭에서는 `예제 목록`으로 같은 목록을 열고 닫습니다. 패키지 API·버전·고정 다운로드는 변경하지 않습니다.
- 실제 설치 패키지를 쓰는 SFC의 strict 타입/미사용 검사, Vite 빌드, 탐색 런타임을 통과했습니다. 30개 링크의 중복·누락, query/hash 보존, 직접·잘못된 URL, 같은 항목의 history 중복 방지, 뒤로/앞으로, 현재 제목/선택, 좁은 화면 닫기/초점, breakpoint 전환과 이벤트 정리를 검사합니다. CI에도 같은 탐색 회귀를 연결합니다.
- 사용자 PC Chrome에서 1180 CSS px의 240px 목록과 오른쪽 콘텐츠, 960/720/333/332px의 접이식 목록 및 가로 넘침 없음을 DOM 치수로 확인했습니다. 목록 항목과 열기 버튼은 약44px이며 목록 내부의 중첩 스크롤 컨테이너는 없습니다. Cool violet 라이트와 Quiet sage 다크에서 기존 역할 토큰 연결을 확인했습니다.
- 실제 키보드 검사에서 모든 키가 닫기를 실행하던 문제와 Tab의 중간 blur 시점에 목록을 숨기던 문제를 발견했습니다. Escape만 닫도록 제한하고 focusout의 relatedTarget으로 목록 내부 이동을 구분했습니다. Enter 선택/제목 초점, Tab 연속 이동/표시, Escape 버튼 복귀 및 뒤로/앞으로 복원을 확인했습니다.
- 이 기록은 실제 브라우저 동작·DOM 치수와 합성 회귀를 구분합니다. 반복 실패했던 화면 캡처는 재시도하지 않았으며 이번 수정의 픽셀 검수·Safari·물리 Fold/터치·화면낭독기는 미검증입니다. 기존 문서 코드 탭/복사와 예제 SFC 내용은 변경하지 않았습니다.

## 최신: 확장 Vue6종과 Wanted Sans (0.5.0) · 2026-10-22 UTC

- Core/UI0.3.0의 실제 private tarball(Core17/UI12파일)을 두 독립 소비 앱에 설치했습니다. 기존14+신규6종20개 export의 strict source/선언·정상/오류 타입·Vite build·실제 설치 런타임을 검사합니다. Vue/Vuetify/Core는 external이며 UI 자체 JS약87.6kB입니다. 신규 메뉴·선택·분할은 문서용 DOM ID가 아닌 소유 refs/Vue 상태를 사용합니다.
- 전체 파이프라인 통과: 패키지 내용/exports/CSS/원본 일치, 두 소비 lock/단일 프레임워크, 기존14종과 새6종의 동작, 실제 starter SFC,38 public asset allowlist,186개 토큰 대비,630 의미색 버튼·42 pagination·42 선택 메뉴 상태,50개 연속 앵커와 기존 폼/날짜/파일/비동기/모션 회귀. 초기 검사가 잡은 보관용 토큰 사본의 버전 불일치는 원본에서 다시 동기화했습니다. 선언·동작 실패 시 뒤 빌드로 진행하지 않는 기존 흐름을 유지합니다.
- 신규 동작 회귀: Segmented native radio/비활성 건너뛰기/readonly, MultiSelect controlled 태그/제한/required/제거/IME/abort·늦은 응답·오류/재시도·unmount, Range 고정 핸들 순서/경계/격자/교차 방지/키/포인터/트랙, 공유 메뉴 roving·Esc/Tab/outside/반환·외부 제어/편집입력 기본 메뉴, SplitPane min/max/포인터/키/최소·복원/좁은 컨테이너 전환·값/내용 유지. 합성 DOM의 포인터와 native popover stub은 실제 브라우저 검증과 구분합니다.
- 자체 리뷰 수정: MultiSelect의 선택 항목 이름을 날짜 문구와 분리하고, 사라지는 재시도 버튼 대신 유지되는 검색칸으로 초점을 이동합니다. 메뉴 동작이 새 워크플로 초점으로 옮겼으면 이를 빼앗지 않고, programmatic open/close는 현재 실행 위치를 사용합니다. 편집 입력의 native context menu는 보존합니다. 같은 위치의 두 핸들 오른쪽을 누르면 상한을 움직이도록 트랙 선택 경계도 보완했습니다. 신규 disabled 스타일의 색은 실제 정의된 surface-alt 역할을 사용합니다. TimePicker 완료 버튼에 space-2 8px를 추가했습니다. 기존 LF 설정을 유지하고 원문 라이선스의 공백만 Git 검사 예외로 보존했습니다.
- Wanted Sans1.0.3의 원본 WOFF2/CSS/OFL을 공식 고정 커밋/Git blob/SHA256으로 검증했습니다. 사이트·Core pack·starter 글꼴 바이트가 같고, 원본 OFL과 고정 출처를 포함합니다. 일반 UI/root 및 포털의 글꼴 토큰을 연결하고 기존 code/pre monospace는 유지합니다. 새 코드 폰트 적용은 보류됐습니다.
- 사용자 PC Chrome155.0.8059.85 실제 로컬 데모: 단일·다중 선택, async 오류에서 Tab으로 retry 접근, 메뉴 native top layer/키·Esc/Tab/ShiftF10/우클릭/보이는 실행 버튼·반환을 확인했습니다. 실제 포인터 드래그로 Range25→35, SplitPane45→35와 완료 이벤트를 확인했고, 키보드 Home/End/Enter 경계도 확인했습니다.333 CSS px에서는 divider가 사라지고30% 비율·입력 메모가 보존됐습니다. TimePicker 선택행→완료 버튼 간격은 약7.99px입니다.
- 데스크톱1920px3테마×light/dark에서 가로 넘침/끊어진 ARIA ID0, 표 열 폭47.99/707.62/95.99/127.99/72px 유지.333px에서 scrollWidth316, 버튼/필드약44px, textarea약96px, 메뉴184px/시간 패널317px이 화면 안에 표시됐습니다. 픽셀 기반 전체 시각 검수 통과를 뜻하지 않습니다.
- 별도 임시 서버가 WOFF2만 실제404로 반환하는 상태에서도 글꼴 check=false, 입력/오류 초점·가로 넘침 없음 및 위 고정 열/컨트롤 치수 유지. code/pre는 monospace입니다.333px 제목은 Wanted 높이35px와 시스템 폴백70px로 줄바꿈 차이가 있었습니다. swap 중 줄바꿈 차이를 감추지 않으며 정량 CLS는 이 로컬 비교로 측정하지 않았습니다. complete 폰트는 약1.29MB이고 실패 시 시스템 스택을 씁니다.
- 이 세션의 화면 캡처5초 제한은 반복하지 않았습니다. 실제 이미지 전체 검토·화면낭독기·iPhone Safari/실기기/터치 보조기술·모든 OS·forced colors·400% 확대와 실제 한국어 IME 하드웨어 입력은 미검증입니다. IME/race/reduced-motion의 코드·합성 검증과 구분합니다.
- 마지막 확정 빌드의 표 정렬/페이지/필터 및 MultiSelect 재시도 초점 재확인 도중 Chrome 도구 연결이 종료됐고, 읽기 전용 탭 조회도 실패했습니다. 그 마지막 호출의 완료 범위는 불확실하므로 통과로 기록하지 않습니다. 앞선 실제 로컬 검증과 확정 tarball의 합성 회귀는 위와 같이 구분합니다. 새 공개 브라우저/PSI 측정은 이 연결에서 불가할 수 있습니다.
- 커밋 시점 로컬 기록입니다. 기존 Pages CI/공개 자산 비교 및 공개 런타임·가능한 성능 측정은 게시 후 최종 보고에 정확한 커밋/실행 URL과 함께 기록합니다. 레지스트리/다른 앱/권한 변경은 없습니다.

## 최신: 기존 예제의 Vue API 전환 (0.4.0) · 2026-10-22 UTC

- Core/Vue UI0.2.0, 총14종(기존4+새10)의 실제 private tarball을 두 별도 소비 앱에 설치했습니다. strict 소스·생성 선언·정상/잘못된 API 타입, CSS/exports/순수 날짜 모듈 포함, Vue/Vuetify external import 및 단일 설치를 검사합니다. UI 자체 ES 약55.5kB이며 프레임워크를 묶지 않습니다. 레지스트리 미게시입니다.
- 전체 library-pipeline --refresh 1차 및 수정 후 통합 실행 통과. 설치된 새10종의 controlled 값, label/error/required/disabled/readonly, 숫자 min/max/step·오류 보존, Textarea counter, locale, Tabs 자동/수동·비활성 건너뛰기·숨김 패널/값 유지, Toast 무초점탈취·타이머/hover/focus/문서숨김 정지·닫기/정리, 날짜·시간 완료값/부분값/역순/같은날/모드변경/윤년/연도 경계/직접입력/취소/바깥닫기를 검사했습니다. JSDOM의 dialog stub과 합성 키는 실제 브라우저 모달 트랩 증명과 다릅니다.
- 기존 문서 검사:33개 public asset allowlist,186개 토큰 대비,630개 의미색 버튼·42개 pagination·42개 선택 메뉴 상태,49개 연속 앵커 및 기존 표/업로드/자동완성/폼/오류복구/모션 회귀. 기존4종 설치 런타임과 실제 starter SFC도 유지합니다.
- 자체 리뷰 수정: 숫자·날짜·시간 validate()가 소비 앱의 외부 오류도 반영하도록 보완했습니다. 설정 시연 Select의 빈 옵션을 required 처리했습니다. 닫혀서 DOM에 없는 시간 패널의 aria-controls 참조를 제거하고 열릴 때만 연결합니다. 인접 월 날짜에 포인터 초점이 갔을 때 클릭 대상이 바뀌는 문제와 취소된 비동기 열기, 연도 경계 중복 날짜도 방지했습니다. 관련 회귀를 추가했습니다.
- 사용자 PC Google Chrome155.0.8059.85, 실제 로컬 starter: 필수 오류의 첫 필드 초점, 값 수정/재제출, textarea13/120·약96px 높이, 숫자3 오류→4 성공, Tabs 자동 방향키/수동 Enter/메모 보존·비활성 건너뛰기, Toast 초점 보존/키보드 닫기/호출 버튼 반환 확인. 날짜 범위 첫 클릭은 기존 완료값 유지, 역순 두 번째 클릭으로 정렬 확정, ArrowRight/Escape 및 입력 복귀, single 모드 null 초기화·잘못된 날짜 오류, 한국어/영어 달력을 확인했습니다. 시간0930→09:30,18시 분00만 허용, 완료 및 Escape 복귀, readonly/disabled 변이 차단도 확인했습니다.
- 실제 innerWidth1643 및333 CSS px에서3테마×light/dark를 전환하며 DOM 치수/가로 넘침/카드12px를 검사했습니다.333px scrollWidth316,320px scrollWidth303,중간833px scrollWidth816으로 페이지 가로 넘침이 없었습니다.333px 달력 약333px/시간 패널317px,320px 달력320px 안에서 표시됐습니다. 이는 물리 폴드·400% 확대 검증과 다릅니다. 콘솔 error/warn0.
- 화면 캡처는 한 번 시도했으나 Page.captureScreenshot의5초 제한으로 실패했습니다. 반복하지 않았으며 픽셀 기반 전체 시각 검수 완료로 표기하지 않습니다. 날짜 모달의 모든 Tab 경계와 실제 화면낭독기,실기기,다른 브라우저,forced colors,400% 확대는 미검증입니다. 이번 릴리스에서 Lighthouse/독립 axe를 새로 실행했다고 주장하지 않으며 아래0.3.5 측정값과 구분합니다.
- 이 절은 커밋 시점의 로컬 검증입니다. 기존 Pages CI 및 공개 자산 SHA·공개 키보드 확인은 게시 후 최종 보고에서 정확한 커밋/실행 URL과 함께 기록합니다.


릴리스별 실제 실행 범위를 구분해 보존합니다. 기존 aion2page·solyi.kr는 변경하지 않았습니다.

## 최신: 표준 감사 수정 (0.3.5) · 2026-10-22 UTC

- 감사의 선택 메뉴 대비4.42, Time textbox의 지원되지 않는 aria-expanded, 검색 결과 h2→h4, Table 오류 재시도 후 BODY 초점, SolField의 끊어진 label 참조, starter 메타 설명 누락을 수정했습니다. 기존 색 토큰·공식 브랜드·타이포·반경6/10/12/16을 유지합니다.
- 기존 전체 library-pipeline --refresh 통과: Core/Vue UI0.1.5 빌드·엄격한 자체 선언, private tarball, 두 독립 소비 앱 npm ci/type/build, 설치된 패키지와 실제 starter 런타임, 문서 check/test. registry 미게시이며 다른 앱과 연결하지 않았습니다. 초기 계약 검사에서 보관용 starter 토큰 버전 불일치를 잡아 같은 원본으로 동기화했습니다.
- CSS 회귀:186개 토큰 대비,630개 의미색 버튼·42개 페이지 버튼·42개 선택 메뉴 상태의 실제 cascade 계약. 선택 메뉴는 전경text/배경accent-soft를 쌍으로 유지하며 최소9.315:1, 기존 의미색/페이지 최소4.562:1입니다. 합성 cascade 검사는 실제 hover 전수 시각 검수와 다릅니다.
- 자체 리뷰 보완: 선택 메뉴 hover가 일반 버튼 배경으로 덮이지 않게 했습니다. 검색/빈 결과의 h3 변경 뒤 기존14px/650·행간·여백을 유지합니다. 빈 결과의 일반 h3 규칙이 글자를 키우는 회귀도 방지했습니다. 제거된 재시도 대신 요약에 초점을 줄 때 화면 안으로 스크롤되며, 다른 곳으로 옮긴 초점은 보존하는 설치 패키지 회귀를 추가했습니다.
- 사용자 PC Google Chrome155.0.8059.85의 실제 로컬 화면: 데스크톱1920 CSS px에서3테마×light/dark의 선택 메뉴 전경·배경/가로 넘침 및 결과 제목14px 확인. 시간 Alt+↓로 시 선택 진입, textbox에 aria-expanded 없음/버튼 true→false, Escape 입력 복귀 확인.
- 실제333 CSS px starter light/dark: 오류 재시도 Enter 후 결과 요약(P)에 초점/포커스 외곽선, y약439px로900px 화면 안에 위치, BODY 초점 소실 해소. scrollWidth316≤333, 끊어진 label 참조0, 도움말/오류 연결 유지, primary 높이약44px·button6/field10/card12px. Dialog16px·초기 닫기·Escape 후 starter-open 복귀 확인. 기존 form/날짜/파일/정렬/선택/페이지/async/reduced-motion은 전체 DOM 회귀 통과 범위와 구분합니다.
- Nu 원본 HTML의 h1 경고는 JS 이전 셸과 숨겨진 dialog 마크업에 대한 경고입니다. 실제 렌더 h1이 있고 그 구조는 유지합니다. 경고만 없애려 숨긴 h1을 추가하지 않았습니다.
- 이 절은 커밋 전 로컬 검증 기록입니다. 기존 Pages CI와 공개 자산 비교·해당 경로 Lighthouse 재측정·공개 키보드 결과는 게시 이후 최종 릴리스 보고에서 별도로 제시합니다. Lighthouse 점수는 WCAG 인증이 아니며 독립 axe/실제 화면낭독기/실기기·400% 확대·모든 상태의 완전 준수는 주장하지 않습니다.


## 패키지 소비와 승인된 UX (0.3.0)

- Core/Vue UI 0.1.0은 private/UNLICENSED local pack입니다. Core9개·UI5개 파일의 실제 tarball에 CSS/JSON/ES모듈/선언이 포함됐습니다. 브랜드/개인 파일/node_modules는 포함하지 않습니다. Vite library ES의 Vue/Vuetify/Core helper external import와 약11.5kB UI 코드, 두 소비 lock의 tarball SHA512·소스 alias/link 부재·각 소비자의 Vue/Vuetify 한 벌을 확인했습니다.
- TypeScript6.0.3의 자체 strict 소스·생성 선언·독립 소비 앱 build와 유효/잘못된 variant/sort 타입 검사를 통과했습니다. Vuetify 선택 서비스 선언과 TS6 오류 때문에 skipLibCheck=true이며 외부 d.ts 전체 검증과 구분합니다. 타입/CSS exports·단일 원본·라이선스 원문 보존·레지스트리 미게시·기존 앱 미연결을 검사했습니다.
- 실제 설치 패키지의 Button 로딩/중복 차단/초점, Field 입력/연결 오류, Table controlled 선택·정렬·페이지/로딩·오류·재시도, Dialog 닫기/반환과 unmount 정리를 JSDOM+Vite SSR 변환으로 검사했습니다. CSS/ShadowRoot/visualViewport 등은 합성 환경 설정이며 네이티브 키보드 검증을 대신하지 않습니다.
- 전체 library:refresh는 Core → library build/types → pack → 독립 소비자/공개 starter 설치 → type/app build → contract/runtime → demo → 문서 check/test 순서로 통과했습니다. 선언/동작 검사 실패 시 뒤 demo/build 단계로 진행하지 않는 것도 작업 중 실패 결과에서 확인했습니다. 잠금 파일 갱신 없는 최종 library:verify도 npm ci부터 전체 순서로 통과했습니다. 원격 CI 결과는 게시 후 확인하고 보고합니다.
- 새 오류 요약은 제출 시 요약 초점/각 오류 링크 이동/입력별 aria-invalid·설명 연결/수정 갱신/값 보존을 검사했습니다. 가상404는 문서 해시를 유지하며 복구·제목 초점, 일괄 처리는2성공/1실패→실패1개만 재시도·각 처리횟수1/2/1·중복 차단을 확인했습니다. 실제 Chrome에서도 같은 동작을 확인했습니다.
- 자체 리뷰 수정: 일괄 처리 완료가 다른 입력으로 옮긴 초점을 빼앗던 문제를 발견했습니다. 작업 버튼/비어 있는 초점에만 결과 초점을 보내며 다른 검색 입력을 보존하는 회귀를 추가했습니다. 오류/결과 안내는 지속 문구입니다.
- 비동기 자동완성은 외부 요청 없는90~260ms 가상 응답입니다. 로딩/값 보존/빈 결과/오류/재시도·오래된 응답 무시·닫힘/화면 이탈 정리·한글 IME 비선택과 키보드 계약을 검사했습니다. 실제 Chrome 오류→재시도 입력 초점→ArrowDown/Enter 확정도 확인했습니다. 물리 OS IME 검증과 구분합니다.
- Time은 단일 HH:mm/HHmm 직접 입력+작은 비모달 시/분 패널입니다. 상시 선택창은 제거했습니다. 실제1730→17:30,18시→18:00/잘못된 분 비활성,Tab 시→분,Escape 닫힘·열기 버튼 복귀를 확인했습니다. 기존 형식/범위/15분/부분 선택 보존·지우기·잘못된 값은 DOM 회귀에서 유지합니다.
- 실제 사용자 PC Chrome333 CSS px의 세 테마×라이트/다크에서 Pattern/Time 가로 넘침 없음, 패널 left약8/right약325.31px·시 선택약44px·초기 시 선택 초점을 확인했습니다. 시스템 reduced-motion=true였으며 불필요한 패널 모션은 없습니다. 날짜 달력333px 열기/Escape 회귀도 확인했습니다.
- 패키지 starter는333/766/1643px의 세 테마×두 모드에서 버튼6/필드10px, 높이44/44 또는36/40px·모바일 카드/선택/번호 묶음·넘침 없음을 확인했습니다. Dialog28px·333px left약16/right301.34·초기 닫기/Escape/실행 버튼 복귀와 Button aria-busy 동안 초점 유지도 확인했습니다.
- 자체 리뷰 수정: 중간 폭에서 package Table에 table-layout:fixed가 빠져766px의 표가750.6px까지 늘어났습니다. 선언을 패키지에 연결하고 CSS 회귀·실제 여섯 조합을 재검수했습니다. 현재 desktop 열은약47.986/707.622/95.990/127.986/71.997px이며 정렬·페이지·검색 전후 최대 변화0px, 모든 행약49.08px로 일정했습니다.
- 자체 리뷰 수정: 실제 화면 캡처에서 검색 필드가 flex의 최소 폭으로 줄어든 점을 발견해 데모 화면틀에 flex-basis240px를 추가했습니다. 이는 패키지 입력의 전역 폭을 강제하는 규칙이 아닙니다. 모바일 개별 선택의 이름과 전체/부분 선택, 페이지 이동 초점, 버튼 포커스의 토큰 우선순위도 보완했습니다.
- 기본/실제 hover/keyboard focus의 여섯 테마와 disabled opacity1을 확인했습니다. 기존 토큰186개·문서 버튼672개 상태 대비와48개 연속 앵커·날짜/업로드/표/Progress/입력 회귀는 유지합니다. 새 메뉴는 같은 본문의 날짜/파일/자동완성/차트/트리 위치로 이동하며 예전 inputs/chart-tree 링크도 남습니다.
- 이번 실제 Chrome의 첫 화면 캡처는 성공해 표·카드·컨트롤 표본을 시각 확인했습니다. 검색 폭 보완 뒤 실측은 약966.7px, 검색/상태 높이40px로 일치했습니다. 다음 캡처는 다시5초 제한에 걸렸으므로 모든 캡처가 성공했다고 기록하지 않습니다. 전체 폭·전체 시각 상태 감사, 화면 낭독기·400%·forced colors·실제 폴드/OS 드롭·기본 모션 전체 시각은 여전히 미검증입니다.
- 기존 Pages에만 validate 의존 deploy를 구성했습니다. PR/실패 시 게시하지 않습니다. 새로운 registry publish/token/credential/OAuth/다른 저장소 쓰기는 없습니다. 원격 CI의 성공/실패 게이트와 공개32개 자산 HTTP/SHA·공개 화면 결과는 커밋 후 최종 보고에 기록합니다.


## 이전: 말줄임·Progress·버튼 복원 (0.2.5)

- v0.2.2의86b5f7b6e412955bd74baa75e50322b89c67945e 원본 CSS/JSON을 직접 대조했습니다. 기본 sol-button(링크형 포함), 메뉴 항목, 파일 선택, 달력 날짜, 문서 접기/모바일 메뉴, starter v-btn은6px였습니다. radius-button=var(--sol-radius-sm) 역할로 분리해 복원합니다. 새 페이지·Progress·전체 제목 버튼도 같은6px입니다. 입력10·카드20·패널28·일반 높이36/40·모바일44와 나머지 기능은 유지합니다. 순수 sidebar 링크의 반경은 버튼 복원 범위에 포함하지 않았고 원형 스위치/로딩 표식은 원래 규칙을 유지합니다.
- 제목만 nowrap/ellipsis를 적용합니다. 본문·Textarea는 제외합니다. 잘린 비대화형 제목만 native button으로 감싸 hover/focus 설명과 Enter/터치 전체 제목 Dialog를 제공합니다. 기존 링크·버튼 안의 제목은 클릭 행동과 원래 설명을 유지합니다. Tooltip은 title 속성이 아니며 Escape로 닫고 포인터가 tooltip에 머무르면 유지합니다. 전체 Dialog는 native Escape/초점 반환을 사용합니다.
- 실제 사용자 PC Chrome1643px/767px·세 테마×두 모드에서 정상/긴 제목 전후 열 너비·행 높이 변화0px, 행약56.63px를 확인했습니다. 333px·여섯 조합의 카드 높이는 정상/긴 제목 모두약141.02px로 변화0px·가로 넘침 없음입니다. 처음 모바일 Grid item의 auto 최소 너비가 긴 nowrap 내용만큼 늘어나던 문제를 발견해 minmax(0,1fr)/min-width:0로 수정하고 실패한 측정과 구분해 재검수했습니다.
- 실제 Tab→전체 Tooltip/aria-describedby, Escape 닫기, Enter→전체 제목 Dialog/닫기 초기 초점/Escape 반환을 확인했습니다. 333px 클릭 전체 보기와 화면 안의 Dialog, 모바일에서 열고 데스크톱으로 전환 후 닫으면 보이는 테이블 제목으로 초점 복귀도 확인했습니다. 원래 상세 버튼은 별도 Panel과 전체 제목을 계속 열었습니다. 물리 포인터 hover/화면 낭독기 전체 검증과 이벤트/초점 검수를 구분합니다.
- 기존 goal/steps의 sol-progress를 재사용해 Component Progress bar·circle 메뉴를 추가했습니다. native 선형과 SVG 원형의 min0/max100/now를 동기화합니다. 값 없음은 now와 퍼센트 글자를 제거하고 정적 띠/호와 처리 중 문구를 씁니다. 수동 범위/10% 증가·완료·오류 마지막 값·0% 재시작/재시도입니다. 실제 작업/타이머에 의한 가짜 진행은 없습니다.
- 실제18개 테마·폭 조합에서 바 value 속성과 원형 now35 동기화, unknown의 양쪽 now 없음/처리 중 글자, 가로 넘침 없음, 버튼6px/선택창10px를 확인했습니다. End로100% 완료해도 범위 초점이 유지되고,0%는 호를 숨겨 가짜 점이 남지 않습니다. 단계 증가가 완료로 비활성되거나 재시도 버튼이 사라지면 재시작 버튼으로 초점을 옮깁니다. 오류·재시작은 DOM 회귀에도 포함합니다.
- 연결 Chrome 시스템 reduced motion=true에서 circle transition0s를 확인했습니다. 기본 상태는 기존 motion 토큰의 짧은 값 전환만 사용하며 반복 회전/번쩍임은 없습니다. 기본 모션의 전체 시각 검수는 통과로 간주하지 않습니다. Progress fill/track의 추가 비텍스트 대비와 기존 버튼·텍스트 대비를 검사합니다.
- Time picker markup/parser/handler는 직전0.2.4와 byte 문자열 대조로 동일함을 확인했습니다. 팝오버 재구현은 하지 않았습니다. 버튼 반경만 새 공통 규칙을 따릅니다.
- 자동 검사는 tooltip/전체 Dialog/링크 보존·정리,Progress 값/unknown/완료·오류/재시작,버튼6·필드10·카드20·패널28의 분리,42개 섹션/호환 앵커와 기존 날짜·업로드·모달·표 회귀를 포함합니다. 스크린샷/물리 기기/화면 낭독기/400%/forced colors 등 이전 제한을 유지하며 게시 CI/공개29개 자산·화면은 최종 보고에 기록합니다.
- 최종 build:core/sync:starter/Node22 starter build/문서 build/check/test를 완료했고 현재 토큰 대비186개·버튼 상태672개(630+42)·연속 앵커42개와 전체 DOM 회귀를 통과했습니다. 실제 파일 선택 내부 버튼은6px/약36px였고 starter는 버튼6·필드10·카드20·Dialog28px였습니다. 좁은 starter 실측370px에서 버튼약44px·넘침 없음·Escape 후 실행 버튼 복귀를 확인했습니다(설정 요청333px와 실제 CSS 폭370px를 구분). 이번 화면 캡처도 Page.captureScreenshot의5초 제한으로 실패했으며 시각 캡처 성공으로 기록하지 않습니다.

### 범주별 누락 점검 — 새 항목은 구현하지 않음

| 범주 | 확인한 실제 예시/소스 | 남은 핵심 검토 |
|---|---|---|
| 폼 | Field·Textarea·Number·Date/Time, 제출/오류/값 보존 (app.js·inputs.js·calendar.js·extras.js) | P1 다중 필드 오류를 모아 개별 필드로 이동하는 오류 요약 없음. 현재 단일 필드 오류와 초점은 있음 |
| 선택 | 체크·라디오·스위치·다중 태그와 제한 (extended.js·inputs.js) | 기본 선택 부품 누락으로 판단하지 않음 |
| 내비게이션 | 실제 Tabs, 행동 메뉴, 경로, 반응형 문서/앱 셸 (topics.js·inputs.js·layouts.js) | P2 앱용404 템플릿 없음. 잘못된 문서 경로는 Overview로 돌아감 |
| 피드백/오버레이 | 지속 알림·Toast·Tooltip·Popover·Dialog·Panel·Undo (palette.js·workflow.js·extended.js) | 기본 부품은 있음. 전체 제목 Dialog도 이번 구현에 포함 |
| 데이터 표시 | 고정 표/리스트·번호 탐색·Chart/표 대안·Tree·Avatar | P2 선택 후 일괄 작업의 영향 확인/부분 실패/Undo를 묶은 예시 부족. 선택 모델과 단일 삭제/Undo는 각각 있음 |
| 업로드 | 로컬 파일/drop·형식/개수/크기 오류·개별 제거/재선택 | P2 실제 전송/취소/재시도 조합은 앱 연결 시 검토. 현재 메타데이터 전용이며 전송하지 않음 |
| 로딩/상태 | Skeleton·결과 없음·권한 없음·오류/재시도·선형/원형 진행률 | P2 비동기 자동완성의 pending/error/retry 결합 예시 부족. 로컬 검색·키보드·IME·결과 없음은 구현 |
| 접근성 | 키보드/초점/ARIA/대비/줄이기 예시와 회귀 | P1 화면 낭독기·forced colors·400% 실검증은 부족. 이는 부품 부재와 구분한 검증 공백 |
| 발견성 | 날짜·파일·자동완성은 Pattern inputs, 차트·Tree는 한 섹션에 묶임 | P3 개별 앵커는 있으나 사이드바에는 묶인 항목. Progress는 이번에 전용 메뉴로 해결 |

분류: **아예 없음** = 오류 요약/404; **결합 상태·동작 예시 부족** = 일괄 작업·비동기 자동완성·실제 업로드 처리; **있지만 개별 발견성이 약함** = 묶인 입력/Chart·Tree. 개인용 최소 시스템 관점의 우선순위이며 모든 후보의 추가를 권장하거나 자동 착수하지 않습니다. Time은 현재 직접 입력+상시 시/분 선택이며 단일 입력+작은 팝오버는 공간을 줄이지만 명명된 열기 버튼·Escape/초점 복귀·터치 폭·직접 입력의 검증 연결이 필요합니다. UI 변경은 보류합니다.

## 입력 수정과 컬렉션 재설계 (0.2.4)

- 원인 재현: 사용자 PC Chrome 공개0.2.3에서 빈 Textarea height/min-height40px(한 줄 sol-input 규칙이 앞의96px를 덮음), native time 입력, 차트 첫 열44px·행71.45px를 확인했습니다. 사용자 캡처의 픽셀 검증과 이 브라우저 측정을 구분합니다.
- Textarea는 단일 높이 규칙에서 제외하고 CSS cascade 회귀로 최소3줄+패딩/auto height/세로 resize·overflow auto를 확인합니다. 실제 빈96px에서 scrollHeight=clientHeight94px,100자·50줄에서 내용 scrollHeight1193px와 값/카운터 유지,333px 긴120자에서 가로 넘침 없음을 확인했습니다. 도구의 Ctrl+End는 selectionEnd100을 확인했으나 scrollTop은0으로 남아 끝까지 스크롤된 시각 결과를 통과로 기록하지 않습니다. 실제 resize 드래그·물리 키보드·화면 낭독기 검증도 별도입니다.
- 시간은 text input(numeric 키패드 안내)+native select 두 개입니다. 1030→10:30(blur),14시45분 선택/확인,18:15 오류와 값/입력 초점 유지→1730 재시도 성공을 실제 Chrome에서 확인했습니다. DOM 회귀는 잘못된 형식·시·분·범위·15분·경계09/18·지우기·부분 선택 제출 후 보존·18시00분 전환/비활성 분을 포함합니다. 날짜/시간대 객체 변환은 없습니다.
- 테이블은 선택48px/본문 유연/상태96px/날짜128px/액션88px colgroup과 fixed layout, 정렬 아이콘16px를 사용합니다. 실제1643px의 열 너비는47.986 /653.854 /95.990 /127.986 /87.986px였습니다. 정렬 오름/내림·2페이지·필터·긴 제목·84개 마지막 페이지 전후 같은 폭이며 최대 변화0px입니다. 기본 행52.22px, 긴 제목 행만71.81px, 차트 대체 값 표는36.67px·요일 nowrap입니다. 전체 셀에 nowrap을 강제하지 않습니다.
- 사용자 PC Chrome의 세 테마×두 모드×1643/767/333px18개 조합에서 Component 입력·차트와 Pattern 테이블/카드 모두 가로 넘침이 없었습니다. Textarea약96px, 시간 입력40px 또는333px44px, 기본 테이블 행52.22px를 확인했습니다.767px는 펼친 폴드에 가까운 폭이며 물리 힌지는 아닙니다.900px에서는 실제 콘텐츠529px라 카드로 전환됨을 추가 확인했습니다.
- 실제333px 번호 버튼5개(이전·주변3개·다음)는 각각약44×44px, 그룹235.94px/사용 가능250.49px로 넘침이 없습니다.84개/28페이지의 모바일 주변 번호1·2·3, 페이지 이동과 초점 유지, Tab의 focus-visible 외곽선, desktop마지막28/28·다음 disabled, 로딩시 이동 disabled·오류 후 재시도/요약 초점을 확인했습니다. aria-current와 활성 열의 aria-sort도 DOM 회귀에 포함합니다.
- 모바일 카드의 필드 분류·상태·변경일과 명명된 상세 액션을 유지했습니다. 실제333px 카드 약141px, 체크박스 레이블44px, 액션1개입니다. 검색 리스트는 작은 상세 액션과 구획선을 사용하며 약68–69px였습니다. 긴 내용은 필요한 만큼만 늘어납니다.
- 자체 리뷰 추가: 새 현재 페이지 번호는 일반 hover 배경이 덮이면 violet/light 대비가 실제4.422:1로 내려갔습니다. 현재 상태의 전경/배경을 한 쌍으로 유지하고 밑줄·포커스 링을 보존했습니다. 실제 hover는4.562:1로 회복됐고, 세 테마×두 모드×7상태42개 추가 대비 회귀도 최소4.562:1로 통과했습니다.
- 자체 리뷰 수정: 많은 자료의 상세가 원래10개에서만 조회되던 점을 현재 자료 소스로 연결하고 r84 이름까지 회귀 확인합니다. 잘못된 제출로 일부 시간 선택이 초기화되던 점을 보존했습니다. 카드 액션을 제목 옆으로 모아 반복 수직 여백을 줄이고 체크박스 영역을44px로 확보했습니다.
- 자동 회귀는 번호/ellipsis/현재/첫끝/필터·개수 보정, 선택 유지·상태 복구, 기존 날짜/업로드/탭/모달/앵커,168개 토큰 대비와630개 의미색 상태를 포함합니다. 수정한 Core와 독립 starter 스냅샷도 같은 원본으로 빌드합니다.
- 스크린샷은 Page.captureScreenshot 5초 제한으로 실패했습니다. DOM·치수·상태 검사를 전체 시각 감사 통과로 대신하지 않습니다. 물리 기기·화면 낭독기·400%·forced colors·OS 파일 드롭 등 이전 제한은 유지합니다. 게시 커밋/CI/공개 자산·화면 결과는 최종 보고로 확인합니다.

## 역할별 부드러운 모서리 (0.2.3)

- 역할: small 6px / control·inset 10px / card 20px / panel 28px. 기존 색·폰트·높이·밀도·모션·레이어 값은 직전 커밋과 구조 비교로 그대로임을 확인했습니다. 원형 Avatar·진행률·스위치와 좁은 가장자리 패널의 0px는 예외로 문서화합니다.
- 자체 리뷰 수정: 큰 문서 데모 안의 일반 카드까지 inset 10px로 덮는 규칙은 제거했습니다. 실제 카드 안의 보조 카드만 inset입니다. 둥근 예시/코드 상자의 overflow hidden을 해제하고 헤더에만 곡선을 적용했으며, 행동 메뉴 여백을 4→8px로 확보해 3px+3px 초점 외곽선이 잘리지 않게 보완했습니다.
- 사용자 PC Chrome에서 Style의 세 테마×두 모드×1643/767/333 CSS px 18개 조합을 검수했습니다. 역할 반경 6/10/20/28px, 데스크톱·767px 버튼 약36/필드40px, 333px 둘 다 약44px, 본문 연속 표시와 가로 넘침 없음을 확인했습니다. 767px는 펼친 폴드에 가까운 폭 검수이며 물리 힌지 검증이 아닙니다.
- 실제 333px Component/Pattern 세 테마×두 모드 12개 화면에서 가로 넘침 없음, 필드/버튼 10px, 드롭 영역20px, 파일 버튼10px/44px, 날짜 필드·연결 버튼44px를 확인했습니다. 키보드 Tab의 focus-visible 외곽선과 보조/중첩 면의 overflow visible을 확인했습니다.
- 기존 Information 채움 예시의 실제 hover와 disabled 전경/배경, Tab으로 옮긴 옅은 버튼 focus-visible을 확인했습니다. 모든 의미색×변형×세 테마×두 모드×normal/hover/focus/active/disabled 조합은 기존 630개 CSS cascade 대비 검사로 구분합니다. 토큰 대비168개·전체 DOM·41개 앵커 회귀도 통과했습니다.
- 실제 333px 달력 열기/방향키/Escape/실행 버튼 초점 복귀, 달력20px 및 가로 경계를 확인했습니다. 100vw와 정수 innerWidth의 약0.33px 차이는 브라우저 확대의 반올림 범위이며 화면 밖에 별도 내용이 생긴 것으로 처리하지 않습니다. 가상 TXT만 파일 선택기로 추가해 형식/크기 표시·제거·초점 복귀를 확인했습니다. 외부 전송은 없으며 OS 파일 드롭은 이번 검수 범위가 아닙니다. 모바일 앵커 선택→메뉴 닫힘/제목 초점도 확인했습니다.
- 독립 starter는 세 테마×두 모드의 1643px/333px 12개 조합에서 버튼/필드10px·카드20px, 높이36/40 또는44px, 넘침 없음을 확인했습니다. 실제 Dialog28px·초기 초점/Escape/실행 버튼 복귀와 333px 경계 안의 배치도 확인했습니다. 같은 Core 스냅샷과 고정 의존성으로 다시 빌드했습니다.
- 스크린샷은 Page.captureScreenshot 5초 제한으로 실패했습니다. DOM/치수/상태 확인을 전체 시각 감사 성공으로 대신하지 않습니다. 화면 낭독기·물리 폴드·400%·forced colors 등 이전 미검증은 유지합니다. Pages CI와 게시 후 HTTP/SHA·공개 버전 결과는 최종 보고로 확인합니다.

## 연속 본문과 사이드바 앵커 (0.2.2)

- 0.2.1의 독립 주제 화면/큰 개요/별도 그룹 트리는 사용자 정정에 따라 제거했습니다. 각 상위 분류의 원래 41개 섹션을 숨김 없이 이어 표시합니다. 현재 상위 메뉴 바로 아래에 본문 순서의 들여쓴 2차 목차를 두고 목차만 접습니다.
- 사이드바 하나만 스크롤하며 하위 목차 overflow는 visible입니다. 모바일도 하나의 문서 메뉴 안에 같은 상위/하위 계층을 표시하고, 선택 후 닫고 제목으로 초점을 옮깁니다.
- 같은 상위 페이지의 앵커는 본문과 데모를 다시 만들지 않습니다. 폼/편집값이 유지되며, 다른 상위 문서로 떠날 때만 기존 미저장 확인을 적용합니다. 기존 #pattern/inputs와 이전 개별 date/files/autocomplete/textarea/number/multiselect/avatar/progress/chart/tree 해시도 연속 본문의 위치로 연결합니다.
- 스크롤 위치는 활성 링크만 갱신하고 주소/기록을 추가하지 않습니다. 명시적 앵커 선택·새로고침·뒤로/앞으로는 유지합니다. 이동은 헤더 높이+16px을 고려한 auto 동작이며 기본/줄이기 상태 모두 별도 모션을 추가하지 않습니다.
- 자동 검사: 41개 연속 섹션/부모 아래 목차/본문 순서·ID·ARIA, 전체 본문 표시, 같은 페이지 입력값 보존, 기록 이동, 모의 geometry의 읽기 활성, 모바일 닫기/Escape, 8개 cold deep link, 상위 문서 이탈 확인을 검사합니다. 기존 데모 DOM 회귀와 630개 의미색 상태 대비도 유지합니다.
- 실제 Chrome 데스크톱 약 1643px: Style 10개 본문 섹션 모두 표시, 목차는 Style 바로 아래, 색 섹션 앵커 제목 top 약 92px와 헤더 bottom 약 76px를 확인했습니다. 목차를 접어도 본문은 유지되고, 사이드바 overflow auto/내부 목차 visible입니다. 페이지 말단 앵커는 브라우저 최대 스크롤에 따라 더 아래에 보일 수 있습니다.
- 실제 333 CSS px: 세 테마×두 모드×네 상위 분류 24개 조합에서 모든 본문 섹션 표시·메뉴 닫힘·가로 넘침 없음을 확인했습니다. 메뉴 열기→색 섹션 선택 후 닫힘/제목 초점/top 약 16px, 폼 입력→검색 앵커 이동 후 값 보존을 확인했습니다. 원래 Tree 개별 링크 새로고침은 chart-tree 목차에 연결되며 전체 Component 15개 섹션을 유지합니다.
- 실제 키보드 Ctrl+End로 읽는 위치를 바꿨을 때 해시는 #style/icons 그대로이고 활성 목차는 마지막 writing으로 바뀌었습니다. 시스템 reduced motion은 reduce, 실제 html scroll-behavior는 auto였습니다.
- 작은 화면 캡처는 Page.captureScreenshot 5초 제한으로 실패했습니다. 위 DOM·치수·키보드 검수를 전체 시각 검증 성공으로 대신하지 않습니다. 화면 낭독기/물리 폴드/400%/forced colors 등 이전 미검증도 유지합니다. 게시 후 CI/공개 27개 자산 HTTP·SHA/공개 화면의 실제 결과는 최종 보고에 기록합니다.

## 0.2.1 검수 기록 — 탐색 방식은 0.2.2에서 대체

- 실제 공개 Chrome에서 기존 Information 채움 버튼은 normal 글자 rgb(234,240,250)/배경 rgb(49,93,150), hover에서는 글자가 그대로이고 배경만 rgb(236,238,245)로 바뀌는 것을 확인했습니다. 일반 버튼 hover의 더 높은 specificity가 의미색 기본 배경을 덮었습니다.
- 공통 sol-tone 버튼이 변형별 전경·배경을 한 쌍의 변수로 보관하고 hover/focus-visible/active에서도 함께 적용하도록 고쳤습니다. 밑줄·공통 포커스 링과 크기는 유지하고 native/aria disabled는 중립색으로 표시합니다.
- 버튼 CSS cascade 검사: 실제 산출물 CSS를 파싱하고 selector 매칭·specificity·순서·변수를 계산해 5역할×3변형×6테마/모드×7상태 = 630개 글자 대비를 확인합니다. normal/hover/focus/focus+hover/active/native disabled/aria-disabled, 최소 4.562:1. 화면 렌더링이나 실제 누르고 있는 포인터의 active 검증과 구분합니다.
- 실제 Chrome 약 1261px: 5역할×3변형×6테마/모드의 hover 90개와 키보드 focus-visible 90개를 확인했습니다. 모든 조합이 4.5:1 이상이며 최소 4.562:1입니다. 긴 최초 일괄 호출은 시간 제한으로 중단돼 결과를 통과로 쓰지 않았고, 작은 묶음으로 완료했습니다.
- 주제별 탐색은 하나의 목록에서 메뉴·개요·제목·순서·이전/다음을 만듭니다. 상위 메뉴에는 개요, 하위에는 해당 주제 한 개만 표시합니다. 날짜/파일/자동완성, Textarea/숫자/다중선택, Avatar/진행, 차트/트리를 분리했습니다. 원래 통합 계약은 접어서 보존합니다.
- 새 navigation 합성 DOM 검사는 47개 주제 격리, 제목·breadcrumb·메뉴·ARIA, 이전 통합 링크 4종, 새로 시작하는 deep link 8종, 뒤로/앞으로, 미저장 이탈 확인과 보이는 Tree 키보드를 확인합니다. 기존 부품 상태 검사는 예시를 모은 fixture로 유지하며 실제 주제 격리는 별도로 검사합니다.
- 실제 Chrome 333px: 47개 개별 주제 모두 한 주제만 표시되고 가로 넘침이 없었습니다. 네 상위 메뉴×세 테마×두 모드 24개 개요도 긴 본문 없이 접힌 세부 메뉴로 표시됐습니다. 키보드로 메뉴 열기→입력 그룹→텍스트 필드 선택, 제목 초점·메뉴 접힘, 새로고침, 이전 inputs 링크의 세부 안내, 개별 달력 열기/Escape, 브라우저 뒤로/앞으로를 확인했습니다.
- 사용자 첨부의 로컬 materialize는 Python 실행기가 설치되지 않아 실패했습니다. Library 직접 읽기는 이미지 포인터/메타데이터만 반환해 원본 픽셀 확인도 미완료입니다. raw 전송을 우회하지 않았으며 실제 공개 브라우저에서 위 문제를 재현해 수정했습니다. 이 제한을 원본 이미지 검증 성공으로 기록하지 않습니다.
- 빌드·168개 토큰 대비·공식 브랜드 해시·공개 허용 목록·starter Core 일치·기존 회귀를 유지합니다. 게시 후 27개 공개 자산 HTTP/SHA와 실제 화면은 최종 보고에 기록합니다. 이전 보조기기·물리 기기·전체 시각 감사의 미검증은 계속 유효합니다.

## 6단계 확장과 독립 starter (0.2.0)

- 1~5단계의 상태·오류·값 보존·키보드·정리를 추가한 합성 DOM 전체 회귀와 168개 토큰 대비를 통과했습니다. 세 테마×두 모드의 모든 새 경로 ID·ARIA·내부 링크도 검사합니다. 원래 달력/드롭/inline 재시도/모션 계약을 유지합니다.
- 실제 Chrome 333 CSS px: Style·Component·Pattern의 세 테마×라이트/다크에서 가로 넘침 없음. 새 메뉴 ArrowDown/Escape, 탭 ArrowRight, 숫자 ArrowUp은 여섯 조합 모두 확인했습니다. CSS 치수 검사와 전체 시각 감사를 구분합니다.
- 실제 333px 공통 셸은 사이드바 숨김/접이식 nav/목록-상세 한 열이며 설정으로 이동했습니다. 실제 미저장 문서 이동 확인의 Escape 취소는 값과 기존 경로를 보존했고, 버리고 이동은 새 경로로 진행했습니다. 기본 입력 확장/단계/Tree의 전체 상태 조합은 합성 DOM 범위입니다.
- 독립 starter: 공식 Node 22.23.3 Windows x64 zip의 공식 SHA-256 확인 후 작업 폴더에서만 사용. Vue 3.5.44/Vuetify 4.3.0/Vite 8.3.4/plugin-vue 6.0.10 고정 lockfile, npm ci와 실제 프로덕션 빌드 통과, npm 감사 취약점 0건. 설치된 37개 패키지의 라이선스 메타데이터/원문 고지를 보존했습니다. 불필요한 로컬 프로젝트 링크를 제거하고 재현 설치를 다시 확인했습니다.
- starter의 Core CSS/JSON 스냅샷과 문서 원본 일치를 검사합니다. 외부 데이터·저장·아이콘/폰트 서비스가 없고 starter는 별도 링크를 열 때만 로드됩니다. 미압축 JS 약 293kB/CSS 약 265kB, gzip 약 105/39kB입니다.
- 실제 Chrome 약 1261px의 starter 여섯 테마 조합에서 주요 버튼·표면·오류 색이 Core와 같고 버튼 약 36px/필드 40px. 333px 여섯 조합은 둘 다 약 44px이며 가로 넘침이 없었습니다.
- starter의 필수 오류→제목 초점·aria-invalid·레이블/설명/오류 연결, 값 입력 후 성공을 확인했습니다. 실제 Dialog 열기→닫기 버튼 초기 초점, 한 내부 버튼의 Tab 경계, Escape 닫기→실행 버튼 복귀, 333px 화면 안의 dialog를 확인했습니다. 브라우저 검사에서 찾은 초기 초점/Escape를 명시적으로 연결하고 오류 ID를 보완했습니다.
- 원래 스크린샷 캡처 제한, 기본 모션 시각·실제 탭 숨김/복귀·OS 외부 파일 드래그·화면 낭독기·물리 폴드·400%·forced colors·OS 다운로드 미검증은 유지합니다. 기존 aion2page/solyi.kr 운영 반영은 없습니다.
- 게시 검증은 이 문서 커밋 뒤 수행합니다. 정확한 커밋·CI·공개 26개 자산 일치와 실제 공개 화면 결과는 최종 작업 보고에 기록합니다.

## 공식 브랜드 자산 정합성

- 헤더의 직접 만든 HTML/CSS 표시와 favicon.svg를 각각 확인하고 공식 Production Asset으로 교체했습니다. 출처·원본 커밋·전체 SHA-256·Git blob은 BRAND-ASSETS.md와 brand-assets.json에 기록했습니다. 두 원본의 바이트·해시와 site/docs 복사본 일치를 자동 검사합니다.
- 실제 Chrome에서 naturalWidth=512, 기본 약 32px/333 CSS px에서 약 28px 정사각형, filter:none, 홈 링크 약 44px 이상과 가로 넘침 없음을 확인했습니다. light/dark 전환 후 원본 이미지 경로와 favicon.ico 링크를 확인했습니다.
- 연결의 스크린샷 캡처는 사이트와 공식 심볼 가이드 PNG 모두 Page.captureScreenshot 시간 제한으로 실패했습니다. 전체 시각 비교·브라우저 탭의 favicon 픽셀 확인을 완료했다고 주장하지 않습니다. 공식 ICO의 6개 내장 크기와 바이트 일치를 별도로 검사했습니다.

## 통합 날짜와 파일 드롭

- 날짜는 createDatePicker(container, options) 한 컴포넌트입니다. mode: single/range 설정, 한 입력창, 완료값 형식·change 이벤트·clear/setMode/setValue/validate/destroy를 문서와 복사 예시에 제공합니다.
- 합성 DOM: 기간 첫 선택 미출력, 후보 범위, 완료/역순 클릭 정렬/같은 날/선택 중 취소, 잘못된 직접 입력과 값 보존, 필수/지우기, 모드 전환 값 초기화, 동일 값 중복 출력 방지, 여러 인스턴스 독립성·값 복사·해제, 윤년/경계·키보드를 검사했습니다.
- 잘못된 첫 blur에서 새 오류 행을 삽입해 다음 버튼의 클릭이 취소되는 문제를 실제 검사 중 발견했습니다. 유효한 blur만 반영하고 오류는 Enter/확인/네이티브 invalid에서 안내하도록 고쳤습니다. 실제 Chrome에서 빈 값 확인 1회→오류·입력 초점, 잘못된 입력 후 지우기 1회를 확인했습니다.
- 실제 Chrome 1257~1258px: 첫 날짜 선택 시 기존 input/change 유지, 두 번째 키보드 선택으로 역순 정렬, 같은 날, 부분 선택 후 Escape 보존, 단일 모드와 윤년 월/연도 이동, Tab 경계·Escape 복귀, 직접 입력 오류와 모드 전환을 확인했습니다.
- 실제 **333 CSS px의 세 테마 × 두 모드**에서 single/range와 4일 범위 표시·같은 한 입력, 가로 넘침 없음, 날짜 셀 약 46×44px를 확인했습니다. 320px 셀은 약 44.25×44px이고 넘침이 없었습니다. 이 검사에서는 키보드 활성화로 경로와 설정을 확인했습니다.
- 파일 ::file-selector-button은 border-box와 button-height를 사용해 데스크톱 일반 버튼과 같은 약 36px, 좁은 화면 약 44px입니다. 입력 전체는 40/44px입니다. 실제 Tab으로 파일 입력의 초점과 외곽선도 확인했습니다. OS 파일 선택기는 이번 스타일 변경 후 다시 열지 않았으며 과거 확인·공유 추가 함수 회귀 검사와 구분합니다.
- 선택 버튼과 드롭은 같은 추가 함수를 사용합니다. 파일명·확장자·알려진 MIME 이름·크기를 표시하고 알 수 없는 MIME은 그대로 미지 정보로 표시합니다. 파일 내용은 읽지 않습니다.
- 합성 DOM: 중첩 dragenter/dragleave, dragover/drop, 다중 파일과 알려진/미지 MIME, 중복/지원하지 않는 확장자/2MiB/3개 제한, 제거·재선택·초기화, 읽을 수 없는 폴더, 영역 밖 파일 드롭 이동 방지, 텍스트 드래그 유지, 문서 해제 시 가드 제거를 검사했습니다.
- **실제 드롭 성공은 미검증입니다.** 직접 만든 가상 TXT/PNG의 로컬 검수 표본에서 연결 브라우저 drag 호출 후 drop 성공이 관측되지 않았습니다. 앱의 파일 드롭 버그라고 단정하지 않았습니다. OS 탐색기에서의 외부 파일 드래그와 독립 브라우저의 실제 드롭 검수가 남아 있습니다. 개인 파일을 사용하지 않았습니다.
- 전체 문서와 짧은 표본의 스크린샷도 연결의 Page.captureScreenshot 5초 제한으로 완료하지 못했습니다. 실제 DOM/키보드/치수 검사와 전체 시각·보조기기 검사를 구분합니다. 임시 표본은 게시하지 않습니다.

## 자동 검증

- npm run build: 허용된 사이트 파일 **28개**(빈 .nojekyll 포함, 독립 starter 4개 포함)를 docs/에 구성합니다. tokens.json에서 CSS·JS·JSON을 함께 생성합니다.
- npm run check: 3개 테마 × 라이트/다크 × 28개 조합 = **168개 대비 조합**을 검사했습니다. 본문·보조·버튼·의미색 글자 4.5:1, 선택한 경계·포커스 조합 3:1을 기준으로 합니다. 반대 방향의 채움/soft 조합도 같은 비율입니다. 화면 전체 픽셀 감사가 아닙니다.
- 가장 여유가 작은 글자 조합: Violet light accent/accent-soft 약 **4.562:1**. 반올림 전 수치로 판정합니다.
- 공개 출력 목록, 원본/산출물·토큰 일치, 로컬 자산 링크, 알려진 자격증명 패턴과 외부 데이터 요청 부재를 검사했습니다. 유한 CSS 애니메이션만 허용합니다.
- npm test: jsdom 합성 DOM에서 5개 경로·내부 링크·중복 ID/ARIA 참조·경로 heading 포커스, 토큰 검색/복사, 예시 복사, 모드/테마/밀도 저장을 검사했습니다.
- 기존 폼 오류·첫 오류 초점·값 보존·실패 회복·중복 제출 차단·처리 중 초기화 차단, 검색/필터/빈 결과/오류/재시도/조건 유지/오래된 응답 차단, 비교와 첫 사용 상태를 회귀 검사했습니다.
- 표/모바일 카드의 같은 선택, 현재 페이지 전체/부분 선택, 페이지 후 선택 유지, 필터 밖 선택 수, 필터/정렬 시 페이지 초기화·유효성, 결과 없음·초기화를 검사했습니다.
- 체크박스·라디오·스위치, 툴팁/팝오버 닫기와 비모달 외부 초점, 아코디언, breadcrumb, 패널·기존 토스트와 포커스 비탈취를 검사했습니다.
- 파일 확장자/2MiB/3개/중복 거절, 개별 제거·동일 파일 재선택을 검사했습니다. 파일 내용 읽기·전송은 없습니다. 자동완성은 방향키/Enter/Escape/Tab, 결과 없음, 한국어 IME 조합 중 Enter 비선택을 검사했습니다.
- 가상 스켈레톤/결과 없음/권한 없음/오류/재시도, 화면 이동 시 오래된 응답과 초점 정리를 검사했습니다.

## 이번 변경의 합성 DOM 검사

- 목표 상태는 효과 전 동기 반영합니다. 빠른 체크/해제/재체크, 오래된 완료 콜백, 문서 이동 후 상태 유지, visibility 변경 시 취소와 자동 재생 부재, 시스템·문서 모션 줄이기를 검사했습니다.
- Element.animate는 모의 객체로 duration/easing 토큰, iterations=1, 이전 효과 취소, 카드 다시 보기/즉시 취소를 검사했습니다. **실제 기본 모션 렌더링 검증을 뜻하지 않습니다.**
- 컬러 역할 다섯 종류의 UI와 단일 스낵바, 새 예시로 교체, 실행 버튼의 초점 유지, 닫기 후 복귀를 검사했습니다.
- custom 달력은 실제 날짜/윤년(1900·2000 포함)/형식/필수/기간 역순과 오류 후 입력 보존을 검사했습니다. 0001~9999 경계, 하루·주·월·연도 이동, 월말 보정, 단일 roving Tab stop, Tab 순환, 선택/취소·실행 버튼 복귀와 초기화를 검사했습니다. date-only 값을 현지 시간대 문자열 변환으로 저장하지 않습니다.
- 합성 DOM은 CSS 레이아웃, native Escape·Tab·파일 선택기 및 보조기기를 대신하지 않습니다.

## 실제 로컬 Chrome 확인

- **333 CSS px**에서 Style·Component·Pattern을 세 테마 × 라이트/다크로 확인했습니다. 가로 넘침이 없고, 컬러 버튼 행의 실제 박스가 겹치지 않았습니다. 표는 같은 자료의 카드로 전환됐습니다.
- 데스크톱 **1257 CSS px**에서 일반 버튼 약 36px, 필드와 토큰 검색 옆 행동 40px이며 위쪽 좌표가 일치했습니다. 좁은 화면의 버튼/정보 닫기는 약 44px입니다. 정보 닫기는 테두리 없는 13px 밑줄 보조 동작이며 Escape·포커스 복귀를 유지했습니다.
- 성공 문구는 세 테마/두 모드에서 success 전경색, 예시 안내는 중립 보조색으로 분리됐습니다. 체크 아이콘·문구를 함께 표시합니다.
- 컬러 예시와 선택일은 테마 변경을 반영했고 스낵바 실행 후 포커스는 실행 버튼에 남았습니다. 단일 알림을 교체하며 경고 soft 배경이 모드별로 바뀌었습니다.
- 달력은 **320·333px**에서 넘침이 없었습니다. 320px 날짜 셀은 약 44.25×44px, 333px은 약 46×44px입니다. custom 달력의 실제 컴포넌트 화면도 별도 로컬 표본으로 시각 확인했습니다. 표본·첨부 이미지는 게시 파일에 포함하지 않습니다.
- 방향키·Enter 선택, 윤년 월말 이동과 Shift+PageDown 연도 보정, 잘못된 직접 입력의 보존/오류 초점, Escape 취소와 열기 버튼 복귀를 확인했습니다. 달력의 마지막 버튼 Tab→첫 닫기, Shift+Tab→마지막 버튼 순환도 실제 확인했습니다.
- 목표는 **1257px의 여섯 테마 조합**에서 반복 체크/해제/재체크 후 3/3 완료와 카드 높이 유지를 확인했습니다. Space 입력, 카드 Motion 데모 표시/즉시 되돌리기와 문서 이동 후 목표 유지도 확인했습니다.
- 실제 Chrome의 시스템 prefers-reduced-motion은 **reduce**였습니다. 해당 정책에서 transition 0s와 즉각적인 최종 상태를 확인했습니다. OS 설정을 변경하거나 줄이기 요청을 덮어쓰지 않았습니다.
- 기본 no-preference의 실제 시각·실제 브라우저 탭 숨김/복귀는 이 연결로 확인하지 못했습니다. 두 경우의 상태·취소 계약은 위 합성 DOM 검사 범위입니다. 일부 전체 문서 스크린샷 캡처도 연결 시간 제한에 걸려 전체 시각 비교를 완료했다고 주장하지 않습니다.

## 이전에 확인된 회귀 근거

- 독립 클라우드 Chrome: 333px 가로 넘침, 실제 토큰 클립보드 값, 폼 오류 후 값 보존·재시도, 테마 전환, 상세 모달 Escape·실행 버튼 복귀를 확인했습니다.
- 이전 로컬 Chrome: 닫힌 details의 Tab 제외와 열린 내부 링크 이동, 패널 Escape/복귀, 표 선택/페이지/필터/빈 결과 조합, 승인된 가상 TXT 선택·EXE 거절 사유·제거, 한국어 문자열 자동완성을 확인했습니다. 이번 자동 회귀 검사도 통과했습니다.
- 앞선 작은 재시도와 모달 닫기 nowrap 규칙은 유지했습니다. 이번 요청으로 일반 버튼의 데스크톱 높이를 36px로 바꿨으므로 이전의 모든 버튼 44px 규칙을 대체합니다.

## 게시 검증과 남은 범위

- Pages는 main의 docs/를 사용합니다. 배포 후 npm run verify-live로 **27개 공개 자산**의 HTTP 200과 로컬/원격 SHA-256 일치를 확인합니다. 실제 커밋과 배포 결과는 작업 완료 보고에 기록합니다.
- 미검증: 실제 기본 모션 시각, 실제 탭 숨김/복귀, 모든 폭·브라우저 조합, 실제 OS 한국어 IME, 화면 낭독기, 400% 확대, 강제 색상, 실제 기기/폴드 힌지·회전, OS 다운로드 파일 저장, 검증한 starter 조합 밖의 어댑터 버전·기존 앱 운영 적용.
- 다운로드 버튼 클릭 완료는 이전 연결의 기록 접근 제한으로 미확인이었으며 사이트 버그로 단정하지 않았습니다. 공개 다운로드 자산의 HTTP/내용 검증과 OS 저장 검증을 구분합니다.
- WCAG 2.2 AA의 대상 크기 24×24 또는 간격 등 예외와 자체 모바일/터치 목표 44px를 구분합니다. 전체 접근성 준수·모든 앱 호환성 인증을 표방하지 않습니다.

## 확장 1단계

- 공식 브랜드 수정 4d03251: Pages run 39553836964 성공, 게시 14개 자산 HTTP 200/SHA 일치.
- Solyi line 17개 UI 아이콘, 16/20/24 크기·장식 이름·버튼 동작, 문구 상황 전환을 합성 DOM에서 검사했습니다. 기존 168개 대비와 전체 회귀를 통과했습니다.
- 로컬 Chrome에서 Style의 17개 SVG와 floating 토큰 60 적용을 확인했습니다. 실제 스크린샷 제한과 보조기기 미검증은 계속 유효합니다.

## 확장 2단계

설정/목록/상세, 선택·검색·빈 결과, 오류 후 저장과 요약 반영, 모바일 disclosure Escape를 합성 DOM 검사했습니다. 전체 168개 대비·기존 회귀 통과. 실제 Chrome 764px에서 desktop sidebar의 설정 이동을 확인했습니다. container query의 모든 폭·물리 기기는 최종 회귀 범위와 구분합니다.

## 확장 3단계

Textarea 필수/줄바꿈/카운트, 숫자 min/max/step와 증감 경계, 다중 선택 제한·태그 제거 초점, 실제 탭 패널/한 Tab stop/값 유지, 메뉴 비활성/방향키/Home/End/Escape/Tab/외부초점을 검사했습니다. 기존 대비·전체 DOM 회귀 통과. 로컬 Chrome에서도 탭 ArrowRight와 메뉴 Escape 후 실행 버튼 복귀를 확인했습니다.

## 확장 4단계

원본/편집값 분리, 필수 오류와 저장·명시 취소, 문서 경로 이탈 취소/승인·beforeunload 요청, 삭제 영향·취소·복구와 포커스를 합성 DOM 검사했습니다. 전체 대비·기존 회귀 통과. 실제 Chrome에서 미저장 dialog Escape 취소·입력값 유지·실행 버튼 포커스 복귀를 확인했습니다. native beforeunload 표시 여부는 브라우저 정책에 따르며 실검수하지 않았습니다.

## 확장 5단계

가상 사용자 메뉴·공유 메뉴 계약, 단계 오류/뒤로/값 유지/완료/초기화, time-only 15분 간격·범위·지우기, 차트/표 동기화·0값, 트리 roving/부모/자식/접힘/선택을 검사했습니다. 전체 대비·기존 회귀 통과. 로컬 Chrome에서 주간 변경 총합 10과 트리 ArrowRight→자식 초점을 확인했습니다. 실제 계정·예약·파일 시스템 연결은 없습니다.
# v0.3.1 패키지 시각 회귀 수정 검증

- 상세 발견·원인·수정·실제 측정 및 미검증은 VISUAL-REVIEW.md를 참조합니다. 사용자 PC Chrome의 실제 렌더링/키 입력을 사용했고, 스크린샷 시각 검토와 구분했습니다.
- Core/Vue UI 0.1.1을 두 독립 소비 프로젝트에 tarball로 clean install한 뒤 build/types/exports/CSS/아이콘 원본/동작·cleanup 검증과 기존 전체 회귀를 통과했습니다. 레지스트리 게시·다른 앱 연결은 없습니다.
- 1644/766/333 CSS px × 3테마 × 라이트/다크에서 넘침 없음, 36/40/44px 높이·버튼6/필드10 반경 유지. Caption inline12px, 검색-표16px, Field gap8px, Dialog body gap12px. Table 행 약49px 유지; 정렬/페이지/빈 필터 전후 열 폭 변화0px. SVG/button 중심 오차0.02px 미만.
- 실제 키보드로 표 제목 tooltip/전체 제목 Dialog/ESC/초점 복귀 및 패키지 Dialog 초점 반환 확인. 모바일 오류/재시도/선택 유지, Core 시간 패널·오류 요약·404·자동완성·알 수 없는 진행 상태와 검색/필터 정렬 대조.
- **캡처 미검증:** 연결된 유일한 Chrome에서 일반/대체/영역 지정 capture가 모두 5초 제한에 걸렸습니다. 전달 가능한 새 스크린샷은 없으며, 픽셀 기반 전체 시각 검토를 완료했다고 주장하지 않습니다. 화면 낭독기/실기기/400%/forced colors/SSR 등 기존 제한도 유지됩니다.
- 이 항목은 커밋 직전 검증 기록입니다. CI/배포 및 공개 파일 해시 결과는 릴리스 최종 보고에 기록합니다.
# v0.3.2 카드 반경 검증

- 독립 카드·Table frame·모바일 카드·토큰/테마/비교 카드·업로드 카드의 radius-card만12px로 변경. 공유하던 메뉴/팝오버/달력/시간 패널은 새 radius-floating으로 기존20px를 유지했습니다. 버튼6/입력10/큰 패널28/중첩 보조 면10, 모든 색·여백·높이 토큰은 동일합니다.
- Core/Vue UI local pack0.1.2를 두 소비 앱에 clean install해 exports/types/CSS/원본 일치·동작 및 전체 회귀/대비 검사를 통과했습니다. 카드12, 중첩10과 floating20 보존을 CSS cascade 검사에 추가했습니다.
- 사용자 PC Chrome 실제 렌더링: 1644/766/333 CSS px × 3테마 × 라이트/다크에서 카드12·버튼6·입력10·기존24/16px 카드 padding·36/44px 버튼 높이, 가로 넘침 없음 확인. Style 중첩 예시는 패널28 → 카드12 → 보조 면10, padding24 유지.
- Table 마지막 행 동작으로 실제 Tab 이동 후 포커스 경계 확인: 하단 여유8.21px, outline 폭+offset4.44px로 컨테이너 안에 여유가 있었습니다. 전체 제목 tooltip은 body에 놓여 카드 overflow clipping 밖에 유지됩니다.
- **이미지 검수 범위:** 문서의 중첩 예시 일부와 반경 규칙/카드가 보이는 Chrome 캡처를 확인하고 원본 JPEG 한 개를 보존했습니다. 패키지 데모 및 일부 캡처 방식은 Page.captureScreenshot 5초 제한에 걸렸으므로 패키지 전체 이미지 검수 완료를 주장하지 않습니다. 실기기·화면 낭독기·400%·forced colors 등 기존 미검증은 유지됩니다.
- 커밋 직전 기록이며 CI/배포 URL/공개 파일 해시 결과는 릴리스 최종 보고를 따릅니다. npm 게시·다른 앱·새 권한 변경은 없습니다.

# v0.3.3 반경 체계 검증

- button/small6px · control/inset10px · card/floating12px · panel16px로 통일. 메뉴·팝오버·달력·시간 패널·자동완성 목록·툴팁·토스트와 native/Vue Dialog·큰 예시 패널이 같은 역할 토큰을 사용합니다. radius-lg12/radius-xl16으로 이전20/28px 기초 반경도 정리했습니다. 원형·알약형 표식, 화면 가장자리에 연결되는 패널의0px는 유지합니다. 역사 기록의20/28px, 아이콘20px 및 그림자28px는 현재 반경과 구분합니다.
- 색·여백·타이포·높이·기능 토큰은 직전 커밋과 구조 비교로 같음을 확인했습니다. Core/문서 CSS의 border-radius 이외 선언과 Vue UI/adapter CSS는 바이트 비교로 동일합니다. 관련 문서의 tooltip/time token 설명도 실제 floating 역할과 맞췄습니다.
- 새 계약 검사에서 보관용 starter 스냅샷의 옛 토큰을 발견해 원본과 동기화하고 JSON/CSS 바이트 일치 검사를 추가했습니다. 수정 후 CI와 같은 전체 library-pipeline을 통과했습니다. Core/Vue UI0.1.3 local pack, 독립 소비 앱2개 설치·타입·빌드·런타임, 기존 전체 DOM/앵커/날짜/업로드/Progress 회귀, 색 대비186쌍·버튼 상태672쌍을 검증했습니다.
- 사용자 PC Chrome 실제 치수:1644/766/333 CSS px × 3테마 × 2모드18조합에서 카드12/필드 프레임10/버튼6, 기존24/16px 카드 padding·36/44px 버튼 높이 및 가로 넘침 없음을 확인했습니다. 333px Vue Dialog 표면16px·padding16px·left16.01/right301.34, 초기 닫기 초점·Escape 실행 버튼 복귀 확인.
- 333px 문서에서16px 패널→12px 카드→10px 중첩 면, 기존24px 안쪽 여백·overflow visible을 확인했습니다. 실제 Tab으로 버튼에 이동해 focus-visible outline/offset 각각2.22px를 확인했습니다. 팝오버12px(left15.99/right317.31), 달력12px(left0/right333.33), 시간 패널12px(left7.99/right325.31) 및 Escape 후 실행 버튼 복귀를 확인했습니다. 좁은 달력의 기존4px padding은 유지됩니다.
- **검증 한계:** 이번 릴리스는 요청에 따라 사용자 PC 캡처를 반복하지 않았고 새 스크린샷 기반 전체 시각 검수는 미완료입니다. 위 기록은 실제 Chrome의 DOM/치수/키보드 검증이며 픽셀 검수와 구분합니다. 별도 클라우드 시각 검수, 실기기/물리 폴드·화면 낭독기·400%·forced colors 등은 후속 확인 범위입니다.
- CI·배포 및 공개 자산 해시는 최종 보고에 기록합니다. npm 게시·다른 앱·새 권한 변경은 없습니다. 개발자 종합 리뷰는 이 반경 릴리스 이후 별도 단계이며 여기서 완료한 것으로 간주하지 않습니다.

# v0.3.4 개발자·통합 리뷰 검증

- 기준a57ae36의 재현 결함9건과 심각도/범위는 DEVELOPER-REVIEW.md에 기록했습니다. Vue aria-disabled 클릭 차단, 배열 내부 변경/선택 기능 재활성화의 indeterminate, 제출 시점 값, 갱신 제목의 접근성 이름, 분류 문자열 literal 처리, 자동완성 Home/End·Tab 재시도, 모바일 정렬, 메뉴04 줄바꿈을 수정했습니다.
- 실제 pack0.1.4 독립 소비2개·strict own types/exports/CSS·컴포넌트 런타임과 실제 starter SFC/공유 Vuetify 설정의 비동기 회귀를 검사했습니다. 전체 DOM·48앵커·기존 날짜/파일/IME/오류/모션/상태/표 회귀, 대비186쌍·버튼 상태672쌍을 통과했습니다. 신규 검사 도구의 반환값/출력 청크/실행 순서를 수정한 뒤 최종 파이프라인을 재확인했습니다.
- 사용자 PC Chrome:333px 모바일 정렬 항목+Tab/Enter 방향 전환·선택/페이지 유지,1644px 정렬·필터 전후 열 너비 변화0px.333px 자동완성 Home의 기본 caret0/닫힘·Tab 재시도·Escape 입력 복귀·Enter 성공 후 제안 선택을 확인했습니다. starter는 제출 후 입력을 비워도 검증한 원래 제목으로 응답합니다.
- 1180px Theme 번호04는 text range2줄에서1줄, flex-shrink1에서0으로 복구.333px 메뉴 번호의 기존 숨김·앵커 이동 후 메뉴 닫힘/제목 초점 유지.1644/766/333px×3테마×2모드18조합에서 넘침 없음과 기존6/10/12/16 토큰을 유지하며 모바일 sort select/button 약44px가 일치했습니다.
- 이번 새 버전의 전체 픽셀 시각 검수, 실기기/물리 폴드·화면 낭독기·Safari/Firefox·400%·forced colors·SSR은 미검증입니다. PC 캡처를 반복하지 않았습니다. CI·공개32자산 HTTP/SHA는 릴리스 최종 보고에 기록합니다. 다른 앱·레지스트리·권한 변경은 없습니다.
## 코드 글꼴 로컬 후속 검증 · 2026-10-22

- 범위: `9ee1faf`를 보존한 별도 로컬 코드폰트 변경. UI Wanted Sans/나머지 토큰/반경6·10·12·16 유지. 공개 푸시·Pages·CI·레지스트리 게시 없음. 아래는 공개 v0.4.0의 결과가 아닙니다.
- `node scripts/library-pipeline.mjs --refresh` 통과: Core27파일/UI12파일 pack, 두 독립 tarball 소비자의 실제 설치·타입·빌드,20개 Vue API 및 기존 DOM/날짜/업로드/비동기/내비게이션 회귀. 폰트는 고정 커밋·Git blob·SHA-256·원문 OFL, Core/site/설치 소비 앱/starter 바이트 일치, 나눔2.000 name table/한영·기호 cmap를 검사했습니다. 로컬 로그 `qa-output/code-font-pipeline.log`.
- 사용자 PC **Chrome** 확장 브라우저에서 `127.0.0.1:4173/#style/type` 및 `/starter/` 검수. 실제 관측 자산에 Wanted Sans, JetBrains Mono Regular, Nanum Gothic Coding Regular가 포함됐고 문서에서는 JetBrains Bold 요청도 관측했습니다. FontFaceSet.check의 영문/한글 요청 true, 코드 computed family는 승인 스택, UI는 Wanted Sans, ligatures는 기존 `normal`입니다. 이 API는 글리프별 실제 face 추적 도구가 아니므로 모든 문자·굵기 렌더링을 확정하지 않습니다.
- starter 실제333 CSSpx에서3테마×light/dark: document.scrollWidth316px, 코드clientWidth285/scrollWidth359px로 페이지 대신 코드 안에서만 가로 스크롤. 문서 코드 샘플은 키보드 ArrowRight로 초점과 가로 스크롤 이동 확인. 버튼/필드43.99px. 폼 오류 제출 후 `starter-title`로 초점 유지.
- 실제1422 CSSpx에서 버튼35.99/필드40px. Table 열 `[47.99,707.62,95.99,127.99,72]`px가 정렬·페이지 이동 전후 동일. 코드clientWidth/scrollWidth704px.
- 별도 로컬 QA origin4174에서 WOFF2/TTF를 모두404 처리: FontFaceSet.check false로 실패 재현, 같은1422px의 표 열 너비 동일.333px에서 페이지넘침 없음(scrollWidth316), 코드285/324px·110px높이, 버튼/필드43.99px, 폼 오류 초점 정상. fallback 글꼴 모양·모든 OS·CLS 수치는 검증하지 않았습니다.
- **화면 스크린샷은 CDP capture 5초 시간 초과로 실패**했습니다. 치수·DOM·자산·키보드 검사와 픽셀 시각 검토는 구분합니다. 실제 iPhone Safari/물리 터치/화면낭독기/다른 브라우저·OS/전체 글리프·굵기/실제 네트워크 성능·CLS는 미검증입니다. 리가처 설정/토글은 추가하지 않았습니다.
## 문서 검색·헤더 화면 설정 로컬 후속 · 2026-10-22

- 기준 `38e67f7` 이후 로컬 구현/별도 커밋 범위. 공개 main/Pages/레지스트리/다른 앱/권한은 변경하지 않습니다. 실제20종 Vue API·폰트 원본·토큰은 유지합니다.
- 검색은 같은 원본 렌더러/메뉴/호환 앵커의59개 목적지입니다. 자동 검사에서 이름·설명/NFKC·붙인 이름, 빈 결과/초기화, IME/229, 입력 Home/End, 결과 화살표/Home/End, 한 번의 Escape·Tab 경계·초점, 기존 복사 맵·실제 입력 비색인, 전체 목적지/연속 내용/뒤로앞으로/미저장 확인을 검사합니다. 새 검사는 `npm test`에 포함합니다.
- 헤더의 Cool violet/Quiet sage/Warm sand, 기본/컴팩트, 라이트/다크는 기존 data 속성·`solyi-ds-prefs`를 공유합니다.12조합의 재진입 복원, Theme 화면 버튼/라디오 동기화, 좁은 패널·폭 전환 초점 및 저장 불가 상태를 자동 검사합니다. 검색 기본/hover/placeholder 역할30쌍은3테마×2모드에서4.5:1 이상입니다. 이는 전체 화면 준수 인증이 아닙니다.
- 실행 기록: `qa-output/doc-search-final-check.log`, `qa-output/doc-search-final-test.log`, `qa-output/doc-search-final-specific.log`. 원본/생성 파일 allowlist, 브랜드·폰트 원본 해시·설치 Core/starter 바이트 및 기존 문서 회귀도 확인합니다. 패키지 소스는 변경하지 않아 새 패키지 설치/타입 빌드는 반복하지 않았습니다.
- 사용자 PC **Chrome**, localhost4173 실제 검수:1920px에서 헤더76px/선택40px,12설정 조합·새로고침 복원 확인.333px에서 문서scrollWidth316px/헤더76px, 모바일 검색·화면 설정 대상44px 이상, 선택44px 및12설정 조합 확인.720px(scrollWidth703px)과1333px(scrollWidth1316px)에서도 헤더 넘침 없음. 넓어져 설정 패널이 닫히면 테마 select로 초점 반환.
- 최종 검색 패널은333px에서 약292.66×672px/좌우12px 여백, 검색 필드44px, 결과 영역clientWidth/scrollWidth266px. 키보드 결과 선택 후 `#pattern/files` 이동·제목 초점·메뉴 닫기·기존 입력 보존, 다른 문서로 이동 시 기존 미저장 dialog/확인 흐름 확인(취소와 값 보존은 자동 회귀에서도 검사). 검색 Tab/Shift+Tab 경계와 첫 Escape 닫기·검색 버튼 복귀·검색어 유지까지 최종 Chrome에서 확인했습니다. 경고/오류 로그 없음.
- 자체 리뷰 수정: source 색인으로 복사 예시/초안 변경 방지; 빈 상태 문단 대신 읽을 수 있는 검색 요약 추출; 검색 hover와 placeholder에 대비가 확인된 역할 사용; 결과 focus 여백/모바일 최소44px 폭 보완; 브라우저 기본 dialog 최대 폭 대신 문서 여백 적용; `type=search`의 첫 Escape 지우기 및 Tab 경계에서 BODY로 빠지는 동작을 두 셸 dialog에서 보완했습니다.
- **시각 검토 범위**: 중간 데스크톱 검색 창의 실제 캡처1장을 검토했습니다. 이후 최종 모바일·데스크톱 캡처는5초 시간 초과로 실패했으며 반복하지 않았습니다. 최종 전체 픽셀 검수를 통과했다고 표현하지 않습니다. 최종 치수/키보드/DOM 검사는 별도입니다. 실제 iPhone Safari/물리 폴드·터치/화면낭독기/하드웨어 한글 IME/OS별 폰트·가상 키보드/400%·forced colors/CLS는 미검증입니다.
## 정확한 검색 이름·별칭 순위 로컬 후속 · 2026-10-22

- 기준은 공개 `b8648fa`. 원인은 Date/Time의 영문 이름이 검색 이름에 없어서 설명/본문 언급과 같은 낮은 점수로 묶인 것이었습니다. 명시적 검색 이름·별칭을 추가하고 개별 이름/제목/ID/별칭 정확 일치 → 이름 일부 일치 → 설명 → 본문으로 정렬합니다. 경로별 임시 점수는 없고 동점의 문서 순서는 유지합니다.
- 회귀: Date Picker/DatePicker/소문자/전각/날짜/날짜 선택/날짜 선택기 → `#pattern/date`, Time Picker/TimePicker/소문자/시간/시간 선택/시각 선택 → `#component/time`. 실제 렌더된 검색 결과의 첫 링크도 영문·한글4사례로 검사합니다.
- 이름+설명/본문의 다중 단어(날짜 입력, 시간 입력, 파일 형식, 버튼 비활성)와 별칭+본문 단어, 빠진 단어의 제외를 검사합니다. AND 검색을 OR로 바꾸지 않습니다. 기존59개 목적지·입력/IME/초점·미저장 확인·헤더12조합 및 기존 회귀를 유지합니다.
- 로컬 `build.mjs`, `check.mjs`, `npm test` 통과. 추가 순위/렌더 링크 검사는 `qa-output/doc-search-ranking-specific.log`, 전체 기록은 `qa-output/doc-search-ranking-check.log`와 `qa-output/doc-search-ranking-test.log`. 패키지/폰트/토큰/레이아웃은 변경하지 않아 별도 패키지 설치와 실제 브라우저·픽셀 검수는 반복하지 않았습니다. 이전 Chrome 결과를 이번 순위 수정의 새 실검수로 표시하지 않습니다.
- 별도 로컬 커밋만 수행하며 공개 푸시·Pages·다른 앱·권한·레지스트리를 변경하지 않습니다. 기존 locale provider/ko·en와 이미 동작하는 local pack/Pages CI를 없는 기능으로 재구현하지 않도록 정확한 잔여 작업은 NEXT-STEPS.md에 기록합니다.

## Local locale milestone · 2026-10-22 (unpublished)

Core0.3.1/UI0.4.0/docs0.6.0. Full `library-pipeline --refresh` passed (qa-output/locale-pipeline-final.log): real packs/declarations/exports/CSS, two clean tarball consumers/types/build,20-component regression, dedicated locale fallback/partial/getter/update/error/draft/focus tests, source-derived60 search destinations,186 role contrasts and630 semantic button states. A first navigation-order failure exposed locale body/menu mismatch; fixed order then repeated the gate.

User PC Chrome: actual local1643 and333 CSSpx, ko/en builtin/number/date display, custom override, invalid grouped-number feedback changing language without losing draft, Dialog close→opener, date calendar English labels/Escape, time panel Escape→trigger. 3 themes×2 modes×2 languages at333px: no document horizontal overflow. Desktop and333px sand-dark screenshots were obtained and visually reviewed in the tool. New demo used an undefined grid class initially; replaced with existing spaced responsive starter-control-grid and verified. Locale does not reset selection/page/models in synthetic runtime.

No public push/deploy. Physical iPhone Safari/fold/touch/screen reader/hardware IME/400% zoom/forced colors/CLS and exhaustive browser pixel matrix remain unverified. Chrome emulated width and DOM tests do not replace them.

## Local package delivery milestone · 2026-10-22 (unpublished)

Complete integrated gate `node scripts/library-pipeline.mjs` passed: qa-output/locale-delivery-final-pipeline.log. Fresh pack bytes matched frozen0.6.0 files; Core0.3.1/UI0.4.0 and the verified historical Core/UI0.3.0 pair are in release-assets and generated docs/releases. Each pair includes SHA-256, npm SHA-512, size, source reference and package versions. Version/catalogue paths are validated and duplicate package-version/different bytes rejected across document releases. Missing/corrupt test copies failed validation; immutable-release guard refused replacement without touching release originals. The existing validate job calls this integrated pipeline before upload; deployment still depends on validate. No workflow permission change or remote CI run.

Clean localhost HTTP fixture installed previous0.5.0→updated0.6.0→rolled back0.5.0. Every step passed TypeScript/Vite build and exact URL+integrity locks with one Vue/Vuetify copy. Initial fixture missed the existing CSS ambient module declaration; copied env.d.ts, reran successfully. This was a test-fixture error, not a missing package CSS file. Logs: distribution-http-final.log and distribution-version-guards.log. Public URL downloads and cross-platform CI rebuild are unverified until an approved push.

Generated document check/links and regression passed:61 actual search destinations,52 continuous sidebar anchors,186 role pairs,630 semantic button states. Chrome local installation section:1643 and333 CSSpx no document overflow; at333px download target heights43.99px (browser fractional scaling). Anchor heading at91.53px below fixed header at desktop; local links reference the correct four prepared files; no console errors observed. Installation-section screenshot timed out after5s; no screenshot visual-pass claim for that section. Locale demo desktop/333px pixel review was completed separately above. Physical-device/assistive-tech limitations remain. No public push, registry publication, credentials or other-app changes.

Delivery review follow-up: literal-link scanning initially mistook JavaScript placeholders for filenames; literal scanning now excludes unresolved template expressions and a separate rendered distribution check validates every actual local download/manifest/checksum link. Added library:prepare to run consumer/runtime/starter gates before freezing a new local pair; the freeze CLI current-version idempotence and cross-release package-version guards passed separately. The default full pipeline was run end to end; a future new-version library:prepare run and remote Linux CI remain unverified.

## Header choice buttons · local, unpublished (2026-10-22)

Theme/density dropdowns replaced by compact native radio groups styled as buttons, identical in desktop/mobile settings. Candidate theme colors come directly from each current light/dark accent/accent-soft/text palette; accessible full names, visible short names, reserved check slots and selected borders complement color. Existing preference state/storage and Theme page controls retained. No package/token/font/archive changes.

Targeted checks only: doc-search-check.mjs passed once (61 destinations plus real-app12 preference restore/sync/storage-denial/modal-focus cases); header-preferences-check.mjs passed native groups/token mapping and72 text/check/focus/border contrasts; npm run check passed generated output/allowlist/links/brand/fonts. Dedicated header check is included in future npm test. No repeat package builds or independent-consumer tests for this shell-only change.

User PC Chrome local: actual1643/1180/720/333 CSSpx. Native ArrowRight theme selection, Tab into density, ArrowRight density, Space, Escape→settings trigger, modal Tab/Shift+Tab boundaries and reload restore verified. Light/dark faces use distinct palette backgrounds and readable ink; focus-visible outline solid. At1180px brand right217.53 < actions left550.05, actions right1131.34 < viewport1180; no overlap/overflow. At333px panel fits, all theme/density faces height43.99px (fractional scaling), last theme right272.85 < viewport333. No horizontal overflow at checked widths/modes. Header screenshot timed out after5s; no pixel-review pass. Physical devices/screen readers remain unverified. Public push held;624bc43/17defab/a87739d preserved.
# 0.9.0 초안 검수 추가 · 2026-10-22

기준0.8.1 대비 공통 제목/설치 간격, 메뉴 비축소, 트리, 진행 표시와 Vue 사용 예제 전환을 검사했습니다. 첨부3장·설치 간격 원본 픽셀은 부모의 클라우드 환경에서 확인했습니다. Windows 작업자가 이미지를 직접 열었다고 주장하지 않습니다.

- 실제 tarball 두 독립 소비 앱 설치·타입·빌드, 패키지 export/선언/CSS/라이선스 계약, 기존 패키지 runtime8종 통과. Sol 컴포넌트20개 이전 이름은 namespace·plugin·타입에서 제거됐고 새 SCard/SAlert/STree를 포함해 S 컴포넌트25개를 제공합니다.
- 정본 Vue SFC30개를 vue-tsc3.3.13/TypeScript5.9.3으로 검사하고 실제 설치 패키지와 실행합니다. Vue native fallthrough 속성은 허용하며 선언된 props/이벤트/필수 값은 검사합니다. 모든 예제 mount, 중복 ID·ARIA 참조, 트리/카드 라디오/가상 파일/자동완성 재시도/편집·일괄 작업 초점 회귀 통과. 파일은 합성 샘플만 사용했습니다.
- Progress 두 형태의 state×animated×showLabel/Value/Message128조합을 합성 DOM에서 확인했습니다. 알 수 없는 값은 퍼센트·aria-valuenow를 표시하지 않고, 완료/오류/알려진 진행에는 반복이 없습니다.
- 사용자 PC의 연결 Chrome, CSS viewport332·333·720·960·1180px 대표 검사: 가로 넘침 없음, 메뉴 링크 펼침 전후 약44px·단일 스크롤·하위 폭 유지, 모바일 닫힘·앵커 오프셋, 트리 키보드 선택, 문서/패키지 drawer Escape·초점 반환. 공통 제목 gap약4px, 설치 외부 gap약16px.333px 원형 상태 문구 중심 오차약0.01px. 세 테마×light/dark 트리 예제 넘침 없음.
- 현재 PC는 prefers-reduced-motion:reduce입니다. indeterminate 활성 상태에서도 computed animation:none을 확인했습니다. 정상 모션의 반복 규칙·시간 토큰·중단은 소스/상태 검사이며 실제 정상 회전의 픽셀 검수는 미완료입니다. 같은 Page.captureScreenshot 시간 초과를 반복하지 않았으므로 이번 전체 시각 검수 완료로 표시하지 않습니다.
- 실제 Safari·Fold·터치·화면 낭독기, 모든 화면/옵션의 픽셀 시각 검수는 미검증입니다. 전용 API가 없는 Vue 조합 범위는 VUE-EXAMPLES-PLAN.md에 명시했습니다. 접근성 전체 준수 인증이나 모든 앱 호환 주장은 하지 않습니다.
# 0.9.1 묶음 패치 · 2026-10-22

- 묶음 변경만 검증했습니다. Vue SFC30개 포맷/미사용 import121개 제거, 단일 코드 접기·연결된 탭·활성 패널 복사, 조합용 주변 스타일, native sidepanel 폭, 진행률 부연 제거입니다.
- Core0.4.1/UI0.7.1 새 tarball 두 소비 앱 설치·타입·빌드, Progress 옵션128조합, 예제30개 실행/ARIA/가상파일/초점, 기존 문서·메뉴·날짜·업로드·테마·대비·검색 및 코드 패널 검사를 통과했습니다. Vue 구문 검사에서 경로 예제의 중복 class 한 곳을 찾아 제거했고 재발 검사에 포함했습니다.
- 사용자 PC Chrome의 실제 치수/동작:1180px 버튼 간격약8px, 카드 header margin24→0px/title margin16→0px.333px 예제 카드·선택창 가로 넘침 없음. Breadcrumb는 flex/list-style:none.400×606에 가까운 CSS viewport에서 native sidepanel left0/right383.33/width383.33px(client383px), padding16px이며 Escape는 실행 버튼으로 복귀합니다.717px 코드 영역은 내부 가로 스크롤을 쓰고 페이지 넘침은 없습니다.
- 코드 패널은 접기 하나, Vue 기본, 화살표로 탭/초점 이동, Vue와 HTML의 실제 클립보드 원본을 각각 확인했습니다. 문자열 강제 줄바꿈을 제거했으며 표시·복사·실행이 정본 소스와 일치합니다. 진행 상태 문구는 두 형태 모두 ‘처리 중’이며 aria-valuenow는 없습니다.
- 정상 indeterminate 모션1.4s/infinite 및 미상 aria-valuenow 없음은 부모 클라우드의 연속 캡처 검증을 수신해 재사용했습니다. 이 PC는 시스템 축소 모션이며 OS 설정을 바꾸지 않았습니다. 이번 전체 픽셀 검수·Safari·실기기 터치·화면 낭독기는 미검증입니다. 접근성 전체 적합성 인증을 주장하지 않습니다.

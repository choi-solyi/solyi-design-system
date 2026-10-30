# 개선 17–25 개발 검증

현재 공개 npm 1.1.0과 동결 artifact는 변경하지 않았다. 개발 브랜치의 1.1.1 준비 소스이며 최종 문서 runtime 전환·통합 검증·배포는 전체 30개를 마친 뒤 수행한다. 새 Chart 유형·Tooltip hover Escape 수정·Table disabled 정렬 스타일을 기존 npm 1.1.0 기능으로 표시하지 않는다.

## 변경과 원인

- **17:** `recipes/dialog.vue`에 잠금은 창을 연 순간이 아니라 ‘예제 처리’를 실행한 동안만 적용됨을 설명했다. body는 본문 입력을 막고 닫기를 허용하며 all은 닫기·바깥 클릭·Escape를 완료까지 막는다. 이미 고친 공통 Dialog header/actions/body 구조와 viewport 호스트를 재사용했다.
- **18:** `progress.vue`의 비교 카드 안에서 Linear/Circular/Loading Overlay를 구분했다. `componentExampleOwners`는 Circular와 Overlay의 Examples를 이 카드로 연결하고 각각의 공개 API·Sample Code·기존 앵커를 유지한다. 3개 동일 실행본을 마운트하지 않는다. 진행률을 모를 때의 반복 모션과 기기의 모션 감소 정책을 설명한다.
- **19:** `tooltip.vue`와 `popover.vue`를 독립 소스로 만들었다. Tooltip은 info 아이콘의 짧은 비대화형 설명, Popover는 chevron 버튼과 실제 확인 액션이 있는 대화형 창이다. Tooltip도 공통 문서 viewport 호스트에 포함한다. 실제 hover 검사에서 포커스가 밖에 있으면 Escape가 root에 도달하지 않는 1.1.0 패키지 결함을 확인했다. `disclosures.ts`는 document capture에서 열린 Tooltip을 닫고 IME Escape는 무시하며 unmount 시 listener를 정리한다. 모달/팝오버 API를 합치거나 삭제하지 않는다.
- **20:** 기존 body Teleport와 공통 viewport 호스트를 재사용했다. Snackbar를 iframe 안의 하단으로 한정하지 않는다.
- **21:** `avatar.vue`에 대체 글자·접근성 이름·비대화형 이미지 역할만 남겼다. 메뉴가 필요하면 별도 소비 화면에서 조합한다. Avatar Examples와 Sample Code에 Stepper/작성 폼이 섞이지 않는다. legacy identity-progress 직접 예제는 유지한다.
- **22:** 표시명은 Chart로 바꾸고 `SBarChart` export·기본 bar·기존 props/텍스트 표를 유지했다. additive `type: 'bar' | 'line' | 'pie'` 및 `SChartType`을 제공한다. 순서 변화에는 선, 전체 비율에는 원형을 사용한다. 원형은 기존 8색 categorical 토큰·조각 번호·범례·동일 자료 표로 색에만 의존하지 않는다. 모두 0이면 빈 원, 자료 없음/로딩/잘못된 값은 기존 상태 메시지를 사용한다. 직접 작성한 SVG이고 새 엔진·패키지·라이선스는 없다. 숫자 비율을 먼저 계산해 큰 유한 값에서 중간 곱셈 overflow도 피했다.
- **23:** `composition.vue`의 Card 항목 링크에 새 탭 표시와 `_blank`/`noopener`를 넣었다. iframe 안에서 starter 전체를 열지 않는다.
- **24:** `component-api.js`, `topics.js`, `app.js`는 세 배치 도구를 Components에서 Style 레이아웃 안내/API로 옮긴다. 공개 registry의 50개 API는 그대로다. 세 기존 component/code/api/examples 주소는 Style의 같은 항목으로 해석하고 탭 조작 후 URL도 Style로 유지한다. 기존 전체 계약 검사는 50개 선언을 계속 검사하고 실제 Components/Style 노출을 별도로 대조한다.
- **25:** 공통 SBtn disabled 스타일이 Table sort 헤더에 회색 배경·테두리를 주던 원인이다. `styles.css`는 Table의 disabled sort 버튼만 투명 배경/테두리를 유지한다. native disabled·muted 텍스트·정렬 차단 계약을 유지한다.

## 실제 실행 근거

- `step-17-25-types.log`, `step-19-22-25-package.log`: canonical recipe 타입과 패키지 build/선언 생성 통과.
- `step-17-25-api.log`, `step-17-25-coverage.log`: 공개 50개 실제 API/문서/소유 소스/공유 예제 계약. `step-19-tooltip-runtime.log`는 source Tooltip hover Escape·IME·바깥 포커스 보존을 포함한 기존 전용 계약 검사를 통과했다.
- `step-17-21-browser.log`: 기존 설치 1.1.0을 사용하는 **로컬 문서**에서 violet/light PC, sage/dark/compact 390px, sand/light 390px의 Tooltip/Popover 역할·부모 높이·복귀, 세 Progress 실제 animation currentTime/transform 및 reduce, viewport Snackbar, Avatar/코드 일치를 확인했다. hover-only Escape의 기존 결함은 별도로 기록하고 이 검증에서는 trigger focus Escape 경로를 사용했다.
- `step-17-drawer-browser.log`: PC 1100×900, 390×700, 가로 760×390에서 긴 본문·여러 줄 설명 Drawer가 viewport에 맞고 본문만 scroll됨을 측정했다. header/actions 좌표 고정, all busy Escape 차단, 완료 후 닫기·opener focus를 실제로 확인했다. 본문 잠금의 기존 close 허용 계약은 유지한다.
- `step-19-22-23-25-browser.log`: **새 로컬 tarball 설치본**의 JS가 빌드 JS와 동일함을 확인한 뒤 Tooltip hover Escape reason/IME/바깥 focus, bar/line/pie 실제 geometry 및 동일 표 값·0/empty/loading, Table normal/loading/error의 배경/테두리/높이 및 disabled, Card 새 탭 URL·opener null·부모 URL 유지를 확인했다. 3테마·PC/390px/RTL. 미게시 실험 tarball이며 frozen 1.1.0이 아니다.
- `step-24-browser.log`: 실제 PC/390px에서 Components에 세 레이아웃이 없고 구 component 링크가 Style로 도달하며 API/코드 탭과 URL이 정상임을 확인했다. `step-24-integration.log`는 전체 문서 실행 연결 42개와 ARIA/이전 alias를 검사했다. 이동 전 `#scol`을 Components에서 찾던 DOM 검사도 Style/구 코드·API 직접 링크의 실제 동작으로 보완했다.
- 캡처/좌표는 로컬 `qa-output/improvements-30/`의 `tooltip-*`, `popover-*`, `progress-*`, `snackbar-*`, `drawer-*`, `chart-*`, `table-*`, `layout-style-*` 및 JSON에 보존했다. Chart 선/원형, Table 모바일 오류, 가로 Drawer 캡처를 직접 확인했다.

QA 코드에서 실제 animation 대상(svg)을 arc와 구분했고 lazy iframe 초기 높이 조정이 안정된 뒤 팝업 자신의 카드·문서 높이를 측정했다. fixture의 선택자/문구 오류는 제품 결함으로 기록하지 않는다. 물리 기기·화면 낭독기·전체 OS 키보드 환경은 미검증이다. 모든 변경의 최종 1.1.1 tarball/SSR/타입/import/크기 및 TimePicker 추가 회귀는 남아 있다.

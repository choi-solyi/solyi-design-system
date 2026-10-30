# 개선 26–30 개발 결과와 최종 후보 잔여

개발 브랜치의 소스와 격리 설치본 검증이다. 실험 tarball의 메타데이터는 아직 개발 기반 1.1.0이며, 공식 npm 1.1.0·동결 파일과 다른 **미게시 개발 파일**이다. 화면의 ‘1.1.1 준비’는 목표 후보를 뜻한다. 최종 1.1.1 버전·tarball·설치·통합 검증은 다음 단계이며 실제 게시나 운영 반영을 하지 않았다.

## 번호별 변경

- **26 Calendar:** 큰 월 제목·accent-soft toolbar·일요일 danger·상단 날짜·인접 이전/다음과 직접 연도 입력을 제공한다. 연도도 기존 controlled month 제안이며 날짜 ISO 모델을 자동 변경하지 않는다. 부모가 거절하면 입력도 원래 연도로 돌아간다. 범위는 0001–9999이며 Enter가 주변 form을 제출하지 않도록 한다. 마커/`+N`이 있는 날짜 클릭은 고정된 전체 상세 목록으로 포커스를 보내 숨은 항목과 긴 글을 읽게 한다. 키보드 날짜 선택 포커스는 유지하고 Tab으로 상세에 접근하며 Escape로 날짜에 돌아온다. nested button을 만들지 않았다. 설명 없는 예제 ⓘ와 복사처럼 보이는 장식 아이콘을 제거했다.
- **27 Sortable:** 기본 grip 테두리는 투명하게 하고 focus ring은 유지한다. readonly/disabled/항목 잠금의 정렬 조작은 숨기되 소비 슬롯의 버튼/입력 상태를 강제 변경하지 않는다. TransitionGroup은 이동만 CSS FLIP으로 보여주고 enter/leave는 즉시 처리한다. invalid/empty 교체에서 이전 활성 행이 남는 문제를 피한다. 실제 hit geometry는 그대로 두고 별도 aria-hidden native-popover label이 포인터를 따른다. 배열은 부모 수락 때만 바뀐다. 모션 감소 정책은 이동 전환을 끈다.
- **28 TimeGrid:** 기존 pointer/proposal 엔진을 재사용한다. 본문을 드래그하고 위·아래 가장자리로 짧은 항목까지 조절한다. 클릭해 나타나는 의미 불명확한 move 버튼 대신 직접 조작과 기존 키보드/목록 버튼을 함께 제공한다. 도움말·loading 안내를 grid 아래로 옮겨 체크 상태 변경이 grid top을 밀지 않는다. `allowCreate`/`allowRemove`는 기본 false이며 생성과 삭제는 별도 frozen `create`/`remove` 요청을 방출한다. library가 새 key를 만들거나 배열을 저장/삭제하지 않는다. 예제 부모가 실제 생성·삭제·이동·복제를 수락 또는 거절한다. `showCurrentTime`은 기본 false이며 열의 ISO 날짜/분 범위와 맞는 현재 시각선을 danger 토큰으로 표시한다. 기본은 브라우저 로컬 분 경계마다 갱신하고, `currentTime: {date, minute}`로 앱이 표시 기준을 제공할 수 있다. 자동 timezone/충돌/저장 규칙은 없다. Date/시간 문자열 모델을 재해석하지 않는다.
- **29 FileInput:** `preview` 기본 true로 선택한 image MIME을 로컬 Blob URL로 보여준다. 업로드하지 않는다. 옵션 해제·제거·실패·unmount에서 URL을 해제하고 깨진 이미지는 이름/형식/크기 정보로 대체한다. SSR에서는 URL을 만들지 않는다. 기본/제한/clear/change/파일 객체 모델은 유지한다. 예제의 ‘내용을 읽지 않는다’는 문구를 이미지 미리보기 동작에 맞게 바로잡았다.
- **30 Button Group:** 신규 공개 API `SBtnGroup`은 `label`, `orientation`과 default slot만 소유하는 명령 레이아웃이다. 각 SBtn의 disabled/loading/action과 자연스러운 Tab 순서를 유지한다. 의미 없는 group readonly/loading/model props를 추가하지 않는다. 선택 토글은 기존 SSegmentedControl의 단일 선택/라디오·방향키 계약을 재사용한다. 예제는 실제 대소문자 변환·복원·텍스트 정렬을 수행한다. 세로 방향 전환에서 border-radius가 늦게 따라오던 전환은 색/그림자 전환만 남겨 제거했다. 기존 50개 export는 보존하며 신규 1개를 글로벌·개별 import에 등록한다.

## 확인한 증거

- `step-26-28-package-fixed.log`, `step-26-30-last-build.log`: 패키지 strict source/선언 빌드 성공.
- `step-26-final-runtime.log`, `step-27-final-runtime.log`: Calendar controlled/ISO/locale/slot/키보드와 Sortable frozen 객체·거절·취소·focus·readonly/invalid/empty 계약 성공. TransitionGroup 때문에 깨졌던 invalid 검사에 맞춰 검사를 약화하지 않고 enter/leave 동작을 수정했다.
- `step-26-27-29-30-browser.log`, `remaining-26-30-observations.json`: 실제 로컬 tarball JS와 빌드 JS 동일 확인 후 3테마·PC/390px/RTL에서 Calendar year 수락·거절/ISO/상단 날짜/전체 마커·focus, 실제 Sortable CSSTransition·원본 배열/순서·ghost·숨김, PNG decode·깨진 이미지 fallback·모든 URL revoke, Group 명령/복원 focus/세로/토글 키보드를 확인했다.
- `step-28-browser.log`, `time-grid-28-observations.json`: 3테마·PC/390px/RTL TimeGrid 생성/삭제(버튼·빈 공간·Insert), 수락·거절, body drag·양쪽 edge resize·짧은 항목, duplicate, Escape·키보드 commit/Delete, disabled·항목 잠금, grid top 불변을 확인했다. Playwright 브라우저 clock을 60초 진행해 시각선 DOM 위치와 10:13→10:14 라벨 갱신을 확인했다. 이는 정적 모션 검사가 아니다. CDP touchStart/move/end와 touchCancel로 실제 브라우저 pointer 이동·취소도 확인했다.
- `calendar-new-*`, `sortable-drag-*`, `file-preview-*`, `button-group-*` 캡처를 직접 확인했다. 세로 Group 모서리는 computed CSS를 확인해 원인이 border-radius 전환임을 구분했다. 1px PNG fixture가 흰색이어도 naturalWidth decode와 Blob URL을 확인했다. 최종 캡처에는 색이 있는 테스트 썸네일을 사용할 수 있다.
- `size-candidate-diagnostic.json`: 최종 직전 **built-source 진단**은 51 API, JS 296772자/299597 bytes/gzip9 75323 bytes, 전체 JS 324868/gzip 합 82605 bytes다. 기존 1.1.0 숫자 상한 안이며 all_plugin gzip 67419 ≤67584, 새 SBtnGroup named import 6779 bytes다. 최종 설치 1.1.1 gate 통과를 대신하지 않는다. 새로운 엔진/의존성/라이선스는 없다.

## 아직 닫지 않은 최종 조건

1. 마지막 작은 보완(숨김 focus, Calendar Enter/form, Group radius/nullable slot, 이미지 설명)의 정확한 최종 코드 smoke.
2. 실제 1.1.1 버전 동기화·후보 pack/새 설치·새 API의 글로벌/개별 import/타입/SSR·기존 전체 pipeline. 1.0.0·1.1.0 동결 파일/검사는 보존한다. 새 버전 크기 기준은 51개 API 목록과 기존 수치 상한을 기준으로 실제 측정해야 한다.
3. TimePicker legacy/auto/popover/dialog와 native/list, 포인터 scrub/취소/blur/외부 변경/disabled 회귀 및 최종 `solyi-ui/icons` chevrons 타입 소비.
4. 전체 1~30 하위 요구와 추가 호스트 복구 회귀, Components/starter/Sample Code 및 최종 캡처를 한 번 대조한다. 현재 문서 예제 의존성은 공개 1.1.0 동결본이므로 새 API의 문서 runtime은 최종 후보 설치에서 전환해야 한다.
5. 공개 문서는 게시된 1.0.0·1.1.0 기록을 보존하고 1.1.1 준비 기능과 npm 안정 버전을 구분해야 한다. 이번 단계에는 main push·운영 배포·npm 게시·소비 앱 업데이트가 없다. 실제 휴대폰·스크린리더는 미검증이다.

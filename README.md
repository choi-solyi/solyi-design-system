# Solyi Design System

솔의 여러 앱에서 함께 사용할 독립적인 개인 디자인 시스템 **v0.1 검토 초안**입니다.

사이트: https://choi-solyi.github.io/solyi-design-system/

## 구성

- **Overview**: 방향과 작동하는 작은 화면
- **Style / Core**: 원칙, 역할 색, 타이포, 간격, 밀도, 접근성 작업 기준, 컬러 적용 예시와 Motion
- **Component**: Button, Field, Choice, Switch, Feedback, native Dialog, Tooltip, Popover, Accordion, Breadcrumb, Side panel, Toast의 상태·키보드 계약·토큰 매핑·복사 가능한 예시
- **Pattern**: 폼 검증과 회복, 검색·필터·상세, 비교 선택, 표·목록의 선택/정렬/필터/페이지 조합, 날짜 기간, 로컬 파일 선택, IME를 고려한 자동완성, 가상 응답 상태
- **Theme & adoption**: Cool violet / Quiet sage / Warm sand, 라이트·다크, 도입 방법과 범위

쿨 바이올렛 A안은 기본 출발점이며 모든 앱의 영구 규칙이 아닙니다. 브랜드 고유성은 정보 위계·타입·여백 리듬·밀도·절제된 강조에 둡니다. 게임 전투력·등급 색은 Core에 포함하지 않습니다.

## 로컬 실행

Node.js 20 이상을 사용합니다. 게시 사이트와 빌드에는 외부 패키지가 필요하지 않습니다. `jsdom`은 DOM 검사 전용 개발 의존성입니다.

```sh
npm ci
npm run build
npm run check
npm test
npm run serve
```

http://127.0.0.1:4173 에서 확인합니다. 해시 경로를 사용해 GitHub Pages 하위 경로에서도 직접 링크할 수 있습니다.

## 파일과 재사용

```text
tokens.json              단일 토큰 원본 (단순 JSON export, DTCG 호환 표방 없음)
site/components.css      재사용 가능한 프레임워크 독립 컴포넌트 예시
site/docs.css            이 문서 사이트만의 셸·레이아웃
site/app.js              문서와 가상 상호작용
site/extended.js         추가 컴포넌트·로컬 입력·자료 목록의 가상 동작
site/calendar.js         단일/기간 통합 DatePicker·한국어 달력·date-only 검증
site/motion.js           목표 상태·유한 모션·줄이기/정리 정책
site/palette.js          의미색 UI 비교·단일 스낵바
scripts/build.mjs        허용된 파일만 docs/에 복사 + CSS/JS 토큰 생성
scripts/check.mjs        대비·출력 목록·토큰·링크 구조 검사
scripts/dom-check.mjs    합성 DOM 상태·이벤트·초점 연결 검사
docs/                    GitHub Pages 게시 산출물
QA.md                    완료한 검증과 미검증 범위
```

`tokens.json`을 수정한 뒤 `npm run build`를 실행합니다. 생성된 `docs/tokens.css`, `docs/token-data.js`, `docs/tokens.json`을 직접 수정하지 않습니다. 문서·데모·다운로드가 같은 소스를 사용합니다.

앱에서는 `tokens.css`를 가져오고 `--sol-color-surface`, `--sol-color-text`, `--sol-color-accent`처럼 역할로 연결합니다. `components.css`는 선택 사항이며 `docs.css`와 분리되어 있습니다. Vue/Vuetify/React 어댑터는 아직 제공하지 않습니다.

```html
<html lang="ko" data-theme="violet" data-mode="light" data-density="comfortable">
<link rel="stylesheet" href="./tokens.css">
<link rel="stylesheet" href="./components.css">
```

## Pages

새 공개 저장소의 `main` 브랜치 `/docs` 폴더를 GitHub Pages 소스로 사용합니다. 사용자 지정 도메인, 유료 서비스, 서버, 데이터베이스, 분석 도구를 사용하지 않습니다.

변경 시 `npm run build`, `npm run check`, `npm test`를 실행한 후 원본과 `docs/`를 함께 커밋합니다. `main`으로 푸시하면 GitHub Pages의 기본 게시 작업이 실행됩니다.

배포 후 `npm run verify-live`로 실제 HTTPS 사이트의 13개 공개 자산이 모두 HTTP 200인지, 검증한 로컬 파일과 SHA-256이 같은지 확인할 수 있습니다.

## 추가 예시의 재사용 계약

- `components.css`의 `sol-field`는 위쪽부터 레이블 → 데스크톱 40px 입력(좁은 화면·터치 44px) → 설명 순서로 정렬합니다. `sol-filterbar`는 같은 시작점을 유지하다 작은 폭에서 한 열로 쌓습니다.
- 알림의 보조 동작은 `sol-button inline-action`을 사용합니다. 시각 크기는 13px 텍스트이고 데스크톱 36px·좁은 화면/터치 44px 조작 영역과 포커스를 유지합니다. 일반 버튼도 button-height 토큰을 사용하고, 필드 옆 행동은 control-height로 맞춥니다.
- `extended.js`는 참고용 가상 데이터와 DOM 연결입니다. `renderComponentExamples(helpers)` 또는 `renderPatternExamples(helpers)`로 문서 예시를 만들고 `mountExamples(root, announce)`로 연결합니다. 반환된 정리 함수를 화면 전환 전에 호출해 리스너·로딩 타이머를 해제합니다. 제품에서는 의미 구조·토큰·상태 계약을 앱의 상태 관리에 옮깁니다.
- 표 선택은 자료 ID로 유지하고, 모두 선택은 현재 페이지에만 적용합니다. 필터·정렬 변경은 첫 페이지로 이동하며 결과 밖 선택 수를 보여 줍니다. 모바일 카드도 같은 자료에서 렌더링합니다.
- 기간은 `YYYY-MM-DD`의 실제 날짜·윤년·순서를 검증해 시간대에 따라 하루 바뀌지 않게 합니다. 네이티브 날짜 팝업의 스타일 한계 때문에 이 예시는 한국어 custom 달력을 제공합니다. 직접 입력도 유지하며 native dialog 안의 하루/주/월/연도 탐색, 한 개의 roving Tab stop, Tab 경계 순환, Escape/선택 후 실행 버튼 복귀를 연결합니다. `createDatePicker(container, options)`로 연결하며 mode를 single 또는 range로 설정합니다. 한 입력창에서 단일 날짜 또는 기간을 표시합니다. 반환된 destroy() 또는 options.signal로 해제합니다. 자동완성은 조합 중 키 이벤트를 선택으로 해석하지 않습니다.
- 파일 선택 버튼과 드롭 영역은 같은 확장자·크기·개수·중복 검사와 목록을 사용합니다. 각 파일의 확장자·알려진 MIME 이름·크기를 표시하고 모르는 MIME은 추측하지 않습니다. 데모가 열린 동안 영역 밖 파일 드롭은 이동을 취소하며 텍스트·링크 드래그는 가로채지 않습니다. 파일 내용을 읽거나 실행하지 않으며 외부 전송·자동 저장하지 않습니다. 이 데모의 확장자 검사는 서버의 보안 검증을 대신하지 않습니다.
- 툴팁에는 필수 안내나 조작을 넣지 않습니다. 비모달 팝오버는 Tab을 가두지 않고, 모달 패널은 native dialog를 사용합니다. 토스트는 짧은 완료에만 쓰고 오류는 지속 알림으로 남깁니다.

## 통합 날짜 설정과 값 계약

`createDatePicker(container, { mode: 'single' | 'range', id, label, required, value, onChange })`를 사용합니다. mode 선택창은 문서의 개발 설정 시연이며 실제 앱에는 필요하지 않습니다.

`single`의 값은 YYYY-MM-DD 문자열 또는 null, `range`는 완성된 { start, end } 또는 null입니다. 기간은 한 입력에 `YYYY-MM-DD ~ YYYY-MM-DD`로 표시합니다. 첫 날짜만 선택한 상태는 입력·완료값·change를 바꾸지 않으며 두 번째 선택에서만 확정합니다. 역순 클릭은 두 날짜를 정렬하고 같은 날 두 번 선택도 허용합니다. Escape/닫기는 임시값을 취소합니다.

유효한 직접 입력은 Enter/blur에서 반영합니다. 잘못된 날짜·미완성/역순 입력은 보존하고 Enter 또는 입력 확인에서 오류를 안내합니다. 오류가 있는 입력에서 다음 버튼을 누를 때 blur의 새 오류 행 때문에 클릭이 취소되지 않도록 처리했습니다. 제출 전 `picker.validate()`가 true인지 확인한 후 `getValue()`를 사용하세요. 잘못된 입력은 마지막 완료값을 덮어쓰지 않습니다.

`onChange({ mode, value, reason })`과 컨테이너의 `sol-date-change` 이벤트는 같은 완료값을 알립니다. 같은 값은 중복 출력하지 않으며 초기 값은 change가 아닙니다. `clear()`는 null, `setMode()`는 이전 값/임시값/오류를 비우고 새 모드의 null을 알립니다. `setValue(value, { emit: true })`로 프로그램 변경 알림을 선택할 수 있습니다. 같은 화면에서는 id를 고유하게 지정하세요. 문서에 복사 가능한 전체 예시가 있습니다.

파일 선택의 내부 버튼은 button-height(데스크톱 36px, 좁은 화면/터치 44px)이며 입력 전체는 control-height(40/44px)를 유지합니다. 로컬 선택·드롭은 서버 전송이나 자동 저장을 하지 않습니다.

## 모션과 컬러 적용

- Motion의 duration/easing/distance는 tokens.json에서 CSS·JSON으로 함께 내보냅니다. 목표 체크 상태는 즉시 반영하고 표시만 유한하게 강조합니다. 카드 다시 보기, 펼친 내용, 패널·달력의 불투명도도 같은 정책을 사용합니다. 무한 재생·레이아웃 크기 보간·입력 차단은 없습니다.
- `prefers-reduced-motion`에서는 불필요한 전환·이동·확대를 제거합니다. 화면 정리, 숨김, 줄이기 요청 시 기존 효과를 취소하고 상태를 애니메이션 완료 콜백에서 바꾸지 않습니다. 목표 체크는 현재 탭 안의 문서 이동에서만 유지되며 새로고침 시 초기화됩니다.
- Style → 컬러 적용 예시에서 accent/info/success/warning/danger의 버튼 변형·배지·인라인 안내·실행 가능한 스낵바를 비교합니다. 역할을 먼저 정하고 검증된 전경/배경 조합을 씁니다. 스낵바는 하나만 교체하고 포커스를 빼앗지 않으며 중요한 오류는 지속 안내에 남깁니다.
- 현재 실제 Chrome은 시스템 모션 줄이기가 켜진 상태였습니다. 기본 모션은 합성 DOM의 유한 효과·중단·최신 상태 검사이며 실제 기본 모션 시각 검수와 보조기기 검수는 별도로 남아 있습니다. 상세 범위는 QA.md를 따릅니다.

## 자료와 독립성

- [참고 정보 구조](https://design.yeolyi.com/) — 2026-10-21 확인. Style / Component / Pattern 및 공유 UI·사이트 셸 분리 개념을 참고했습니다. 원문·색·디자인은 복제하지 않았습니다.
- [공개 Solyi Brand Assets](https://choi-solyi.github.io/solyi-brand-assets/) — 같은 날 실제 확인. 보라 #6666AA, 세이지 #91A99A, Light #EBECE7, Paper #F9FAF7, Ink #2F3040을 선택 테마의 참고로 사용했습니다. 헤더의 sparkle와 favicon은 Production Assets 원본을 변형 없이 사용합니다. 경로·해시·이용 조건은 [BRAND-ASSETS.md](./BRAND-ASSETS.md)에 기록합니다.
- [W3C Contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [Target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) — 문서의 작업 기준 출처입니다.

이 저장소에는 새로 작성한 문서·코드·가상 데이터만 포함합니다. 기존 비공개 앱 코드·계정·실데이터·개인 연락처를 포함하지 않습니다. 기존 앱이나 다른 사이트의 저장소·공개 범위·권한을 변경하지 않습니다.

## 검증 범위

접근성 전체 준수나 모든 앱 호환성을 주장하지 않습니다. 토큰 대비 및 합성 DOM 검사는 실제 브라우저 레이아웃·키보드·native dialog·화면 낭독기 검증을 대신하지 않습니다. 자세한 상태는 [QA.md](QA.md)를 확인하세요.

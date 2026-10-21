# Solyi Design System

솔의 여러 앱에서 함께 사용할 독립적인 개인 디자인 시스템 **v0.1 검토 초안**입니다.

사이트: https://choi-solyi.github.io/solyi-design-system/

## 구성

- **Overview**: 방향과 작동하는 작은 화면
- **Style / Core**: 원칙, 역할 색, 타이포, 간격, 밀도, 접근성 작업 기준
- **Component**: Button, Field, Choice, Feedback, native Dialog의 상태·키보드 계약·토큰 매핑·복사 가능한 예시
- **Pattern**: 폼 검증과 회복, 검색·필터·상세, 비교 선택, 빈 상태
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

## 자료와 독립성

- [참고 정보 구조](https://design.yeolyi.com/) — 2026-10-21 확인. Style / Component / Pattern 및 공유 UI·사이트 셸 분리 개념을 참고했습니다. 원문·색·디자인은 복제하지 않았습니다.
- [공개 Solyi Brand Assets](https://choi-solyi.github.io/solyi-brand-assets/) — 같은 날 실제 확인. 보라 #6666AA, 세이지 #91A99A, Light #EBECE7, Paper #F9FAF7, Ink #2F3040을 선택 테마의 참고로 사용했습니다. 에셋 원본은 복사하지 않았습니다.
- [W3C Contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [Target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) — 문서의 작업 기준 출처입니다.

이 저장소에는 새로 작성한 문서·코드·가상 데이터만 포함합니다. 기존 비공개 앱 코드·계정·실데이터·개인 연락처를 포함하지 않습니다. 기존 앱이나 다른 사이트의 저장소·공개 범위·권한을 변경하지 않습니다.

## 검증 범위

접근성 전체 준수나 모든 앱 호환성을 주장하지 않습니다. 토큰 대비 및 합성 DOM 검사는 실제 브라우저 레이아웃·키보드·native dialog·화면 낭독기 검증을 대신하지 않습니다. 자세한 상태는 [QA.md](QA.md)를 확인하세요.

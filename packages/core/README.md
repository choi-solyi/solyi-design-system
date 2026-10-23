# @solyi/core 0.4.10

`solyi-ui`에 포함하는 프레임워크 독립 토큰·CSS·helper의 내부 개발 패키지입니다. 소비 프로젝트는 `solyi-ui`만 설치하며 `@solyi/core`를 따로 추가하지 않습니다.

## 원본과 공개 경로

원본은 저장소의 `tokens.json`, `site/components.css`, `site/overflow.js`, `site/icons.js`, `site/date-only.js`입니다. 생성한 `dist/`를 직접 수정하지 않습니다.

| solyi-ui 경로 | 제공 내용 |
|---|---|
| `solyi-ui/tokens.css`, `solyi-ui/tokens.json` | 역할 토큰의 CSS·JSON |
| `solyi-ui/components.css` | 프레임워크 독립 기본 컴포넌트 스타일 |
| `solyi-ui/fonts.css` | self-host Wanted Sans |
| `solyi-ui/code-fonts.css` | JetBrains Mono·Nanum Gothic Coding |
| `solyi-ui/overflow` | 말줄임 제목·전체 보기 helper |
| `solyi-ui/icons` | 공유 16/20/24px 선 UI 아이콘 |
| `solyi-ui/date` | date-only·HH:mm 순수 계산 |

CSS는 소비 앱 진입점에서 한 번 불러옵니다. reset·라우터·문서 셸·저장 기능을 설치하지 않습니다. JSON export는 DTCG 호환 포맷을 표방하지 않습니다.

## 테마와 동작

html의 `data-theme="violet|sage|sand"`, `data-mode="light|dark"`, `data-density="comfortable|compact"`를 사용합니다. 버튼 반경 6px·입력 10px·카드/작은 팝업 12px·다이얼로그/큰 패널 16px 역할을 공유합니다.

선택 행은 `.sol-choice-row`를 label 또는 Vue 체크박스·목록형 라디오 wrapper에 선택적으로 사용합니다. 선택 배경·전경·테두리·표시선은 selected 역할 토큰이며 `accent-soft`와 구분합니다.

`mountOverflowText(root)`는 잘린 데이터 제목에 전체 보기 경로를 연결합니다. 기존 링크·버튼 행동을 유지하고 반환한 정리 함수를 unmount 전에 호출합니다. `solIcon/solIconPaths`는 브랜드 로고와 별개인 UI 아이콘입니다. 날짜 helper는 DOM·서버 예약·시간대 변환을 제공하지 않습니다.

## 라이선스

자체 재사용 코드는 MIT입니다. 로고·캐릭터·favicon·개인 콘텐츠는 UI 패키지에서 제외합니다. Wanted Sans·JetBrains Mono·Nanum Gothic Coding은 원문 OFL·저작권·출처·해시를 함께 포함하며 MIT로 재라이선스하지 않습니다. [라이선스 범위](https://github.com/choi-solyi/solyi-design-system/blob/main/LICENSE-SCOPE.md)와 [폰트 안내](https://github.com/choi-solyi/solyi-design-system/blob/main/documentation/guide/FONT.md)를 확인하세요.

소비 앱에서 사용하는 `DESIGN.md`는 루트의 같은 원본을 패키지와 문서 사이트에 포함합니다.

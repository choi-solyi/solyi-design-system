# 개발자 리뷰 · v0.3.3 기준

기준 커밋 `a57ae363aa6c0c80420da92dad1dee8083762466`. 범위는 문서의 프레임워크 독립 데모, Core/Vue UI 4개 export, 실제 tarball 소비 starter, 타입·회귀·Pages 흐름입니다. 다른 앱, registry 게시, 인증/권한 설정은 제외합니다. 웹디자이너/퍼블리셔에서 전달한 발견도 아래 재현 근거와 함께 통합합니다.

## 재현된 결함

P2는 특정 입력·화면에서 기능이나 상태 안내를 잃는 중간 심각도, P3는 낮은 가독성 결함입니다. 아래는 기능 제안이 아니라 기준 버전에서 재현한 항목입니다. 9건을 수정했고 로컬 검증을 완료했습니다. CI·공개 게시 확인은 릴리스 최종 보고를 따릅니다.

| ID | 심각도·범위 | 재현과 기존 결과 | 수정·회귀 기준 |
|---|---|---|---|
| DEV-01 | P2 · Vue Button | `aria-disabled="true"`를 전달하고 실행. 설치 패키지 런타임에서 속성이 사라지고 click이 1회 발생. | 포커스 가능한 aria-disabled를 유지하고 click 차단. native disabled/loading도 보존. |
| DEV-02 | P2 · Vue Table | 2행 중 한 ID를 같은 selected 배열에 push하거나 selectable을 false→true. 행은 선택되지만 전체 선택 indeterminate는 false. 배열 교체 때만 정상. | 배열 내부 선택/행 ID/선택 기능 변경에 두 체크박스의 mixed 상태 갱신. |
| DEV-03 | P2 · 실제 starter | 유효한 제목 제출 후 450ms 전에 입력을 비움. 실제 Chrome에서 `✓ “” 가상 기록` 성공 문구 재현. | 검증한 제출 시점 값으로 응답. 이후 편집 값은 보존. 실제 starter SFC 런타임 검사 추가. |
| DEV-04 | P2 · Core overflow/Vue Table 소비 | 잘린 제목 helper 연결 후 같은 노드의 제목 변경. 텍스트는 새 값이나 생성 버튼 aria-label은 옛 제목. | 데이터 변경 시 접근성 이름·열린 tooltip 갱신. 원래 링크 동작/초점/정리 보존. |
| DEV-05 | P2 · 재사용 자동완성 | values에 안전한 문자열 `<b>가상 기록</b>` 주입. 실제 b 요소가 생성되어 원문과 다른 분류명 표시. 현재 공개 고정 자료로 공격이 가능하다는 주장은 아님. | 데이터는 textContent로 표시. markup 요소가 생성되지 않는 검사. |
| PUB-01 | P2 · 문서 자동완성 | 닫힌 목록에서 Home/End. Chrome 332px에서 Home 후 expanded=true, 커서는 끝에 남음. | 일반 텍스트 편집 보존. 열린 목록의 활성 옵션 탐색 중에만 Home/End 처리. |
| PUB-02 | P2 · 문서 자동완성 | 오류 모드→기록 입력→오류→입력에서 Tab. 부모 측 클라우드 Chrome 333px에서 재시도가 숨고 목록 열기로 이동. | Tab으로 보이는 재시도에 도달, Enter 재시도·Escape 입력 복귀·Tab 이탈. |
| PUB-03 | P2 · Vue Table/starter | 폭332px 실제 Chrome: desktop table display:none, 보이는 sort 버튼0개, select는 테마/모드/가상 상태뿐. | 모바일에 이름 있는 항목·방향 제어. 같은 controlled sort 모델을 사용하고 폭 변경 후 상태 유지. |
| VIS-01 | P3 · 문서 메뉴 | 실제 Chrome1180px Theme 활성화. 번호04의 text range rect2개, span폭10.61px/flex-shrink1. | 번호에 고정 최소 폭·nowrap. 라벨만 줄바꿈, 다른 메뉴/모바일 확인. |

## 확인한 설계와 범위

- Button/Field/Dialog/Table props·emit·생성 타입·CSS exports와 소비 코드를 대조했습니다. Table의 정렬/필터/페이지와 off-page 선택은 소비 앱 소유이며 라이브러리가 원본 배열을 정렬하지 않습니다.
- 문서 라우터의 요청 세대, 미저장 확인, date-only 값/부분 기간/정리, async combobox 응답 세대·IME·취소, 파일의 메모리 전용 검증과 drop 범위, 일괄 재시도·삭제 Undo, 메뉴/탭/트리·progress·유한 모션을 검토하고 기존 회귀와 새 재현 검사를 수행했습니다.
- Vue/Vuetify/Core는 외부 import이며 두 소비 앱이 실제 local tarball을 설치합니다. lock의 registry/integrity/license와 한 framework 복사본을 검사했습니다. 기존 workflow의 needs:validate와 실패 시 게시 차단 구조를 유지합니다.
- Vue export는 4개입니다. 다른 문서 예시는 HTML/CSS 참고 구현으로 남으며 완전 Vue 전환, 모든 framework 버전·SSR 호환을 주장하지 않습니다. readonly/generic slot 등 타입 API 확대는 향후 제안이며 이번 결함 수정과 구분합니다.

## 최종 검증 및 남은 범위

- Core/Vue UI0.1.4 pack·타입·CSS/exports·독립 소비 앱2개 설치/build/runtime, 실제 starter SFC와 동일 Vuetify 설정을 쓰는 비동기 제출 검사, 전체 문서 DOM/앵커/오류·비동기/날짜·파일·모션·표 회귀를 통과했습니다. 생성형 검사 자체의 반환 형식·실행 순서 문제를 고친 뒤 최종 전체 파이프라인을 다시 실행했습니다. vendor d.ts는 기존 skipLibCheck 범위이며 외부 타입 전체를 검증했다는 뜻은 아닙니다.
- 사용자 PC Chrome333px에서 모바일 항목 선택→Tab→Enter 방향 전환, 페이지2 이동과 선택1개 유지, 넓은 폭 복귀 뒤 동일 정렬 모델/aria-sort와 페이지 보정을 확인했습니다. 1644px의 열 너비는47.986/707.622/95.990/127.986/71.997px이며 정렬·필터 전후 최대 변화0px였습니다.
- Chrome333px 자동완성: 닫힌 Home은 caret0/expanded=false, 오류의 Tab은 보이는 재시도 버튼, Escape는 입력 복귀, Enter 재시도는 정상 제안과 입력 초점, 이어 ArrowDown/Enter 선택까지 확인했습니다. starter의 대기 중 빈 입력 변경도 제출 시점 제목을 확인한 문구로 응답했습니다.
- Chrome1180px Theme 번호04는 text range2줄/폭10.61px에서1줄/폭12.08px로 바뀌었습니다. 모바일 번호는 기존 숨김을 유지하고 메뉴의 밀도 앵커 이동→메뉴 닫힘/제목 초점을 확인했습니다.
- 1644/766/333 CSS px × 3테마 × light/dark18조합에서 넘침 없음, 카드12·버튼6 유지, 모바일 새 select/button 높이 약44px 일치를 확인했습니다. 모든 디자인 토큰은 버전 메타데이터 외 동일하며 입력10·패널16도 보존합니다.
- 위 브라우저 검사는 DOM/실제 치수/입력 동작 확인입니다. 사용자 PC 캡처는 반복하지 않았고 새 버전 전체 픽셀 시각 검수는 별도 클라우드 검수 범위입니다. 실기기·물리 폴드·화면 낭독기·Safari/Firefox·400%·forced colors·SSR은 미검증입니다. 확인된 9건 외의 임의 기능 확대, npm 게시·다른 앱·권한 변경은 없습니다.

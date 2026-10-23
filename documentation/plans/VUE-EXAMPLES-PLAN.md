# Vue 사용 예제와 공통 패턴 정리

> 이 문서는 이전 단계의 계획·전환 이력입니다. 당시 체크포인트와 문구를 보존하므로 현재 구현·공개·검수 상태와 혼동하지 마세요. 현재 작업 범위는 [0.11.0 통합 계획](../plans/0.11.0-integration.md), 실제 사용법은 [처음 시작하기](../guide/GETTING-STARTED.md)를 따릅니다.

## 이력 부록 · 당시 기록 원문

현재 전환 후보: 문서0.10.0 / Core0.4.2 / Vue UI0.8.0. 실제 export34개와 전역 등록 예제30개의 목록은 [현재 기계 목록](../../vue-api-inventory.json), [전용 API·등록 방법](../guide/DEDICATED-VUE-API.md), [이번 진행표](DEDICATED-VUE-PLAN.md)를 따릅니다. 아래 버전별 표는 당시 기록이며 현행 완료 상태를 대신하지 않습니다.

## 이전 단계 기록


기준: 공개0.8.1 (`a6ad6bf`). 이번 후보는 문서0.9.0/Core0.4.0/Vue UI0.7.0 **0.x 초안**입니다. 사용자의 최종 승인 전 1.0.0을 만들지 않으며 이전 tarball·배포·Git 이력을 삭제하거나 변조하지 않습니다. npm 게시·다른 앱 변경·권한 확대는 제외합니다.

## 범위와 순서

1. 공통 제목 묶음, 원형 상태 문구, 로딩 반복/축소 모션, 트리 가이드선, 메뉴 축소, 설치 블록 gap을 수정합니다.
2. 실제 코드44개를 inventory합니다. 화면 사용32개는30개 독립 Vue SFC로 묶고, CSS/토큰/설치12개는 기술 설명으로 유지합니다. 기본 탭은 Vue/S, 원래 HTML/CSS는 명시적 보조 탭으로 보존합니다.
3. 기존 S API를 사용합니다. 단순 공통 표면 SCard/SAlert와 직접 요구된 STree를 보완합니다. SDialog는 동일 초점/닫기 계약의 drawer presentation을 제공하고 SRadioGroup은 카드형 옵션을 지원합니다.
4. 새 공개 버전에서는 이전 Sol 컴포넌트 별칭을 export·등록·선언에서 제거합니다. sol-* CSS와 패키지명, 공통 locale/타입 유틸리티 이름은 불필요하게 변경하지 않습니다.
5. 공식 MIT vue-tsc3.3.13/TypeScript5.9.3으로 (native fallthrough 속성은 허용, 선언된 props/events/required 계약은 검사) 실제 tarball 소비 상태에서 모든 예제의 props/events/template를 검사하고, 같은 SFC를 starter의 예제 실행 화면에서 사용합니다. DOM/패키지/키보드와 지원되는 브라우저 검수를 한 뒤 묶어 게시합니다.

## 실제 파일과 미제공 API

`usage-example-inventory.json`은 기존44개 코드 위치를, `examples/vue-vuetify/src/recipes/`는 복사·실행하는30개 정본 SFC를 담습니다. 문서 코드와 실행 화면은 이 파일에서 생성하며 별도 예시 문자열을 수작업으로 유지하지 않습니다.

Tooltip/Popover, Accordion, Breadcrumb, Avatar, 로컬 파일, 단일 자동완성, 차트는 **전용 S 컴포넌트 export가 아직 없습니다.** 이들은 실제 SCard/SBtn/입력 API와 필요한 semantic HTML·SVG·native primitive를 연결한 Vue 조합으로 표시합니다. 허구의 STooltip/SFileInput 같은 태그를 쓰거나 전용 API 전환 완료로 표시하지 않습니다. 해당 전용 패키지화는 별도 후속 목록이며 이번에 대규모 추가 개발로 확장하지 않습니다. 폼/검색/비교/화면틀/편집/오류/일괄 재시도 역시 앱 데이터·라우터를 연결하는 조합 예제입니다.

## 검증 체크리스트

- [x] 부모의 클라우드 환경에서 첨부3장과 설치 여백 추가 이미지 픽셀 분석 수신. Windows Library 메타데이터 처리는 우회하지 않음
- [x] 소스 inventory·예제30개 작성·UI 공통 수정·Sol 컴포넌트 별칭 제거
- [x] 엄격한 패키지 선언·독립 소비 앱·30개 Vue 템플릿 타입 및 실행 검사
- [x] 합성 DOM에서 두 형태의 상태×animated×표시 옵션128조합, 반복 활성/중단. Chrome 축소 모션의 animation:none 확인. 정상 모션 픽셀 검수는 미완료
- [x] Chrome1180px 메뉴 펼침 전후 약44px 최소 높이, 하위 너비가 부모 안에 유지.333px 스크롤·선택 후 닫힘/앵커 이동·트리 키보드 확인
- [x] Chrome 제목 gap4px·설치 gap16px, Vue 코드 복사·탭·실행·6테마/모드 및332/333/720/960/1180px 대표 넘침 검사. 전체 화면 픽셀 검수와 동등하지 않음
- [x] 최종0.9.0 파일 고정·허용 목록·해시·실제 HTTP 설치/업데이트/0.8.1 롤백 검사. 원격 CI·Pages 성공과 공개 해시는 배포 후 보고 및 해당 커밋의 Actions 결과로 확인

PC Chrome의 스크린샷은 이전 작업에서 시간 초과됐습니다. 치수/동작 검사와 픽셀 시각 검수를 구분하고, 정상 모션/축소 모션을 실제 확인하지 못한 경우 각각 미검증으로 남깁니다. 실제 Safari·Fold·화면 낭독기도 실행 가능한 환경이 있을 때만 완료로 표시합니다.

## 0.9.1 묶음 패치

- Vue SFC30개를 Prettier3.9.10(MIT)으로 정리하고 타입 검사에서 확인된 미사용 import121개를 제거했습니다. 표시·복사·실행은 같은 정본 파일을 유지합니다. 코드의 강제 줄바꿈 대신 가로 스크롤로 한글 문자열을 보존합니다.
- 코드 탭을 하나의 접기 패널 안에 붙이고 Vue 기본 선택, 선택선·키보드 탐색·연결 패널·각 패널의 복사 대상을 유지합니다. 전용 API가 없는 예제의 탭 이름은 Vue 조합입니다.
- 공개 Chrome 재현: 버튼 묶음은 block/gap0, 카드 header는 margin24px, 제목은 하단 margin16px였습니다. 경로 nav에는 공통 클래스가 없어 ordered list가 decimal/block이었습니다. SCard·SBtn의 배경과 버튼6px 반경은 정상이라 CSS 전체 미로드로 판정하지 않았습니다.
- 30개 예제 주변 클래스 조사 후 문서 전용 button-row를 공통 sol-actions로 전환하고, breadcrumb 클래스를 연결합니다. starter의 광범위한 header/h2 여백을 공통 제목에서 제외하고 grid 최소 폭을 정리합니다. native sidepanel은 100vw 대신 가용100% 폭으로 제한합니다.
- 요청한 ‘진행률을 아직 알 수 없어요’ 문구와 영어 대응 부연을 제거하고 기존 처리 중/Working 상태와 접근성 이름을 유지합니다. 부모의 클라우드 정상 모션1.4s infinite·aria-valuenow 없음 검증 결과를 수신했으며 같은 검사를 반복하지 않습니다.
- 묶음 검사: 새 Core0.4.1/UI0.7.1 tarball을 두 소비 앱에 설치하고 타입/실행/빌드, SFC 구문/미사용 import, 코드 탭·복사·원본30개 일치 및 기존 문서 회귀를 통과했습니다. Chrome1180/333px 버튼 간격8px·header/title margin0, 카드/선택창 넘침 없음, breadcrumb flex/list-style:none을 확인했습니다.400px sidepanel은 client383px에 맞춰 left0·폭383.33px·padding16px이며 Escape 복귀를 유지합니다.717px 코드 패널 가로 넘침 없음, 패널별 실제 클립보드 확인 및 ‘처리 중’ 문구를 확인했습니다.
- 실제 스크린샷/전체 픽셀 검수는 미완료이며 PC의 같은 캡처 시간 초과를 반복하지 않았습니다. 공개 CI·Pages·최종 해시 결과는 해당 커밋의 Actions와 배포 후 보고에서 확인합니다. 이전 고정 tarball은 변경하지 않습니다.

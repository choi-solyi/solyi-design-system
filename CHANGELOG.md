# 변경 이력

## 미게시 · 다음 minor 버전 후보

- SDatePicker의 opt-in displayFormatter와 SNumberInput의 preset·formatValue·unit을 추가합니다. 모델·수동 편집 draft·표시·native 제출을 분리하며 기존 readonly·min 기준 step을 유지합니다.

- SChip·SBadge·SIcon·SIconBtn을 추가하고 개별 import·전역 등록·타입·문서 예제를 연결합니다.
- 기존 버튼·locale·아이콘·테마·밀도·포커스·터치 목표 토큰을 재사용합니다. SIconBtn은 SBtn의 loading·disabled 동작을 유지합니다.
- controlled 선택·삭제, SVG 접근성, 배지 설명 연결, 타입 계약과 의미색 대비 검사를 추가합니다.
- 기존 API와 peer 범위를 유지합니다. npm 게시·운영 문서 배포·소비 앱 업데이트는 포함하지 않습니다.

## 2026-10-24 · 한국시간

- `solyi-ui` 1.0.0은 Vue 3용 S 컴포넌트와 공통 토큰·CSS·helper·타입을 하나의 패키지로 제공합니다.
- 버튼·입력·폼 검증·레이아웃·표·선택·탐색·알림·오버레이·날짜/시간·파일·차트·트리·진행 표시를 38개 S 컴포넌트로 제공합니다.
- Violet·Sage·Sand 테마, 라이트·다크, 기본·컴팩트 밀도와 6/10/12/16px 역할별 모서리를 사용합니다.
- `solyi-ui/all.css`로 기본 스타일과 Wanted Sans를 함께 불러오며 개별 CSS와 코드 글꼴은 선택적으로 사용합니다. 글꼴 원본·OFL·제삼자 고지를 포함합니다.
- SForm의 동기 rules, 서버 오류 연결, template ref와 공개 focus·검증 메서드로 폼 상태를 관리합니다.
- 알 수 없는 진행률과 reduced-motion, 파일 선택·거절, 날짜·시간 팝업, 터치·키보드 분할 조절의 상태를 제공합니다.
- 컴포넌트의 Examples·Sample Code·API에서 같은 Vue SFC를 실행·복사하며 Props·Slots·Events·Methods를 확인할 수 있습니다.
- 전역 등록·Vue 자동 import·TypeScript·lint·테마 설정과 소비 앱용 DESIGN.md를 제공합니다.
- Vue 3.5.44·Vuetify 4.3.0·Node 22.23.3을 검증 기준으로 하며, peer 범위 전체와 모든 실기기의 동작을 검증했다는 뜻은 아닙니다. 외부 선언 및 비동기 검증의 지원 경계는 설치·폼 안내를 따릅니다.
- 재사용 코드는 MIT이며 로고·캐릭터·개인 콘텐츠는 배포 패키지와 MIT 적용 범위에서 제외합니다.

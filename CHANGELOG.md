# 변경 이력

## 1.1.1 준비 — 미게시

- 사용자 요청 1~30번에 따라 예제를 역할별로 분리하고 문서 팝업 호스트·모션·상태 안내를 개선합니다. 번호별 원인과 검증은 documentation/development/IMPROVEMENTS-30.md에서 추적합니다.
- MultiSelect 입력 내부 칩, NumberInput 증감 배치, TimePicker 단위·확정 버튼, Stepper·Tabs·Tree 상호작용을 다듬습니다.
- Calendar 연도·전체 일정 상세, Sortable 이동 모션·비활성 조작 숨김, FileInput 로컬 이미지 미리보기와 SBtnGroup을 추가합니다.
- TimeGrid의 controlled 생성·삭제 요청, 본문 드래그·가장자리 조절과 현재 시각선을 제공합니다. 삭제 수락·거절 및 키보드 초점 복원은 소비 예제와 별도로 검증합니다.
- 기존 50개 공개 export와 모델 계약을 유지하며 SBtnGroup을 포함해 51개 API가 됩니다. 새 npm 게시·소비 앱 업데이트·공개 사이트 반영은 아직 하지 않았습니다.
- 최종 tarball 동결과 전체 통합 검증 전이므로 출시 완료를 뜻하지 않습니다. 기존 1.0.0·1.1.0 원본과 날짜는 아래에 보존합니다.

## 1.1.0 · 2026-10-29 · 한국시간

### 추가

- Chip·Badge·아이콘, 자유 입력 Combobox, 정렬 목록·월간 달력·TimeGrid를 추가했습니다.

### 개선·버그 수정

- 입력과 날짜·시간 선택, 페이지 이동을 개선하고 Dialog·Switch·버튼과 문서 표시를 다듬었습니다.

## 1.0.0 · 2026-10-24 · 한국시간

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

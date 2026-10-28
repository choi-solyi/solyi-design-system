# 변경 이력

## 1.1.0 후보 · 미게시

- SBtn을 재사용하는 SConfirmAction을 추가합니다. 두 번 누르기, Escape·blur·timeout 취소, 외부 loading/error/reset과 중복 입력 차단을 제공하며 실제 작업은 소비 앱의 confirm listener가 소유합니다.
- Date/Time에 opt-in pickerPresentation과 logical placement를 연결합니다. 기존 표시 방식과 모델·폼 계약을 유지합니다.
- Dialog의 제목·닫기·actions는 고정하고 본문만 스크롤합니다. 설명 간격과 짧은 viewport를 다듬고 Switch에 시각 라벨만 숨기는 hideLabel을 추가합니다.
- Dialog에 feedback/actions-start 슬롯과 busy/busyScope를 추가합니다. 기본 body 잠금은 닫기를 허용하고 all은 완료까지 내부 조작과 닫기를 막습니다. 외부 모델 제어와 기존 슬롯은 유지합니다.

- Vue defineComponent의 순수 초기화 42곳에 PURE 표시를 추가합니다. 개별 import의 불필요한 컴포넌트 보존을 줄이며 setup·watch·이벤트·스타일 동작은 유지합니다.
- 공개 45종에 맞춰 버전별 source/gzip/전체 JS 및 실제 설치본 개별 import 크기 검사를 추가합니다. 기존 1.0.0 파일과 176,000자 기준은 보존합니다. 1.1.0은 로컬 후보이며 npm 게시·운영 배포와 릴리스 동결은 아직 수행하지 않았습니다.
- 공통 입력 8종의 opt-in 내부 clear action과 별도 자유 입력 SCombobox를 추가합니다. 기존 빈 값·change·폼 제출 계약을 보존하며 문서·starter 예제를 제공합니다.

- SMonthCalendar를 추가합니다. ISO 선택과 표시 월을 controlled로 관리하며 범용 marker·키보드 탐색·로딩·모바일 marker 개수와 전체 자료 표시를 제공합니다. 기존 DatePicker 입력 API와 저장 형식은 유지합니다.
- SSortableList의 isItemDisabled와 슬롯 disabled를 보완합니다. 조작 중 항목 비활성화 시 취소하고 가능한 다른 손잡이로 초점을 복원합니다.

- SSortableList를 추가합니다. 임의 객체와 stable key를 받는 controlled 목록으로 키보드·이동 버튼·손잡이 드래그, preview/최종 제안/취소, 자동 스크롤과 포커스 복원을 제공합니다. 기존 42개 API를 보존하며 타입·전역 등록·Components 문서와 starter를 연결합니다.
- 문서 헤더의 UI 데모 바로가기, 컴포넌트 미리보기 제목과 섹션 이동 버튼을 추가하고 Examples/코드 카드의 모서리 배경을 바로잡습니다. 이 항목은 로컬 개발본이며 운영 배포를 포함하지 않습니다.

- STimePicker 입력·목록 손잡이를 opt-in으로 추가합니다. preview는 모델·폼 값을 유지하며 release에서 확정하고 Escape·pointercancel·capture 상실·외부 값/설정 변경 시 취소합니다. 키보드·목록 자동 스크롤과 optional ko/en locale 키를 함께 제공합니다.

- STimePicker의 native 기본·기존 change/readonly를 유지하고 opt-in 직접 입력 제어·custom list·초기 스크롤·목록 키보드 탐색을 추가합니다. readonly 입력에서도 선택 가능한 required 필드의 native 폼 검증을 유지합니다.

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

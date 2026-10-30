// Generated from CHANGELOG.md and preserved document history.
export const releaseHistory=[
  {
    "version": "1.1.0",
    "date": "2026-10-29",
    "entries": [
      "게시 전 공통 UI 보완: 버튼 loading은 크기와 역할 색을 유지하고 disabled 버튼·입력은 기존 surface-alt를 사용합니다. 짧은 trailing의 불필요한 줄바꿈과 Segmented 선택선·hover 밑줄 중복을 정리합니다.",
      "SDataTable과 SPagination에 같은 siblingCount·compactPagination 설정을 제공합니다. 좁은 화면에서도 주변 번호를 유지하며 명시적으로 간단 표시를 선택할 수 있습니다. 두 컴포넌트의 설정 비교 예제를 추가합니다.",
      "STimeGrid를 추가합니다. 기본 readonly이며 임의 객체 accessor·ISO 열·분 좌표·band·generic 슬롯·겹침 배치·전체 목록을 제공합니다. opt-in 이동·resize·복제는 frozen 좌표 proposal로 전달하며 원본 배열은 변경하지 않습니다. 키보드·터치 손잡이·자동스크롤·취소·pending을 지원하고 timezone/충돌/저장 모델은 앱에서 처리합니다.",
      "SPagination은 처음·이전·다음·마지막 이동과 controlled 페이지 제안을 제공합니다. 페이지 수가 바뀌어도 부모 모델을 자동 수정하지 않으며 Table의 기존 페이지 모델·이벤트는 유지합니다.",
      "semantic tone과 별도인 범주 8색과 resolveCategoricalColor를 추가합니다. Calendar marker의 opt-in category는 현재 테마의 CSS 역할로 표시하며 이름·기존 tone·ISO 모델을 유지합니다.",
      "SLoadingOverlay는 기존 Progress와 modal host를 재사용합니다. container/viewport·blocking/nonblocking·지연·최소 표시·내용 숨김을 제공하며 타이머가 부모 작업 모델을 변경하지 않습니다.",
      "SEmptyState의 제목·설명·아이콘·액션·card/page 표현을 추가합니다. SCard는 leading/title/description/meta 슬롯을 확장하며 제목 링크와 보조 버튼을 독립적으로 배치합니다.",
      "SBtn을 재사용하는 SConfirmAction을 추가합니다. 두 번 누르기, Escape·blur·timeout 취소, 외부 loading/error/reset과 중복 입력 차단을 제공하며 실제 작업은 소비 앱의 confirm listener가 소유합니다.",
      "Date/Time에 opt-in pickerPresentation과 logical placement를 연결합니다. 기존 표시 방식과 모델·폼 계약을 유지합니다.",
      "Dialog의 제목·닫기·actions는 고정하고 본문만 스크롤합니다. 설명 간격과 짧은 viewport를 다듬고 Switch에 시각 라벨만 숨기는 hideLabel을 추가합니다.",
      "Dialog에 feedback/actions-start 슬롯과 busy/busyScope를 추가합니다. 기본 body 잠금은 닫기를 허용하고 all은 완료까지 내부 조작과 닫기를 막습니다. 외부 모델 제어와 기존 슬롯은 유지합니다.",
      "Vue defineComponent의 순수 초기화 42곳에 PURE 표시를 추가합니다. 개별 import의 불필요한 컴포넌트 보존을 줄이며 setup·watch·이벤트·스타일 동작은 유지합니다.",
      "최종 공개 50종에 맞춰 버전별 source/gzip/전체 JS 및 실제 설치본 개별 import 크기 검사를 추가합니다. 기존 1.0.0 파일과 176,000자 기준은 보존합니다. 1.1.0 후보의 동결·npm 게시·공식 registry 설치 검증을 완료했습니다.",
      "공통 입력 8종의 opt-in 내부 clear action과 별도 자유 입력 SCombobox를 추가합니다. 기존 빈 값·change·폼 제출 계약을 보존하며 문서·starter 예제를 제공합니다.",
      "SMonthCalendar를 추가합니다. ISO 선택과 표시 월을 controlled로 관리하며 범용 marker·키보드 탐색·로딩·모바일 marker 개수와 전체 자료 표시를 제공합니다. 기존 DatePicker 입력 API와 저장 형식은 유지합니다.",
      "SSortableList의 isItemDisabled와 슬롯 disabled를 보완합니다. 조작 중 항목 비활성화 시 취소하고 가능한 다른 손잡이로 초점을 복원합니다.",
      "SSortableList를 추가합니다. 임의 객체와 stable key를 받는 controlled 목록으로 키보드·이동 버튼·손잡이 드래그, preview/최종 제안/취소, 자동 스크롤과 포커스 복원을 제공합니다. 기존 API를 보존하며 타입·전역 등록·Components 문서와 starter를 연결합니다.",
      "문서 헤더의 UI 데모 바로가기, 컴포넌트 미리보기 제목과 섹션 이동 버튼을 추가하고 Examples/코드 카드의 모서리 배경을 바로잡습니다. 1.1.0 문서 사이트와 실행 예제에 반영했습니다.",
      "STimePicker 입력·목록 손잡이를 opt-in으로 추가합니다. preview는 모델·폼 값을 유지하며 release에서 확정하고 Escape·pointercancel·capture 상실·외부 값/설정 변경 시 취소합니다. 키보드·목록 자동 스크롤과 optional ko/en locale 키를 함께 제공합니다.",
      "STimePicker의 native 기본·기존 change/readonly를 유지하고 opt-in 직접 입력 제어·custom list·초기 스크롤·목록 키보드 탐색을 추가합니다. readonly 입력에서도 선택 가능한 required 필드의 native 폼 검증을 유지합니다.",
      "SDatePicker의 opt-in displayFormatter와 SNumberInput의 preset·formatValue·unit을 추가합니다. 모델·수동 편집 draft·표시·native 제출을 분리하며 기존 readonly·min 기준 step을 유지합니다.",
      "SChip·SBadge·SIcon·SIconBtn을 추가하고 개별 import·전역 등록·타입·문서 예제를 연결합니다.",
      "기존 버튼·locale·아이콘·테마·밀도·포커스·터치 목표 토큰을 재사용합니다. SIconBtn은 SBtn의 loading·disabled 동작을 유지합니다.",
      "controlled 선택·삭제, SVG 접근성, 배지 설명 연결, 타입 계약과 의미색 대비 검사를 추가합니다.",
      "기존 API와 peer 범위를 유지합니다. npm 1.1.0과 문서 사이트에 반영했으며 소비 앱 업데이트는 각 앱에서 별도로 진행합니다."
    ]
  },
  {
    "version": "1.0.0",
    "date": "2026-10-24",
    "entries": [
      "`solyi-ui` 1.0.0은 Vue 3용 S 컴포넌트와 공통 토큰·CSS·helper·타입을 하나의 패키지로 제공합니다.",
      "버튼·입력·폼 검증·레이아웃·표·선택·탐색·알림·오버레이·날짜/시간·파일·차트·트리·진행 표시를 38개 S 컴포넌트로 제공합니다.",
      "Violet·Sage·Sand 테마, 라이트·다크, 기본·컴팩트 밀도와 6/10/12/16px 역할별 모서리를 사용합니다.",
      "`solyi-ui/all.css`로 기본 스타일과 Wanted Sans를 함께 불러오며 개별 CSS와 코드 글꼴은 선택적으로 사용합니다. 글꼴 원본·OFL·제삼자 고지를 포함합니다.",
      "SForm의 동기 rules, 서버 오류 연결, template ref와 공개 focus·검증 메서드로 폼 상태를 관리합니다.",
      "알 수 없는 진행률과 reduced-motion, 파일 선택·거절, 날짜·시간 팝업, 터치·키보드 분할 조절의 상태를 제공합니다.",
      "컴포넌트의 Examples·Sample Code·API에서 같은 Vue SFC를 실행·복사하며 Props·Slots·Events·Methods를 확인할 수 있습니다.",
      "전역 등록·Vue 자동 import·TypeScript·lint·테마 설정과 소비 앱용 DESIGN.md를 제공합니다.",
      "Vue 3.5.44·Vuetify 4.3.0·Node 22.23.3을 검증 기준으로 하며, peer 범위 전체와 모든 실기기의 동작을 검증했다는 뜻은 아닙니다. 외부 선언 및 비동기 검증의 지원 경계는 설치·폼 안내를 따릅니다.",
      "재사용 코드는 MIT이며 로고·캐릭터·개인 콘텐츠는 배포 패키지와 MIT 적용 범위에서 제외합니다."
    ]
  }
];
export const releaseNotes=releaseHistory[0];
export const archivedReleaseNotes=[
  {
    "version": "0.14.3",
    "sourceRef": "80679e28c1afe41a238d22f1b5dbc6679f4ca85e",
    "file": "0.14.3.txt",
    "sha256": "3b9337de3b94b143306aaaf14b3690f5467960963af9f0089b2481f159dc9570",
    "originalHeading": "2026-10-23 · 한국시간"
  },
  {
    "version": "0.14.2",
    "sourceRef": "0e8a5b1b23af7b27f335e3466f5ee7810accea5b",
    "file": "0.14.2.txt",
    "sha256": "3b9337de3b94b143306aaaf14b3690f5467960963af9f0089b2481f159dc9570",
    "originalHeading": "2026-10-23 · 한국시간"
  },
  {
    "version": "0.14.1",
    "sourceRef": "1b2d8ae3f24f6d509546694c7f3e489e9dc6d920",
    "file": "0.14.1.txt",
    "sha256": "0c89b55933121e9e22944de4be2df80b0b1f0008601f546dbdd84badc6d5bd60",
    "originalHeading": "2026-10-23 · 한국시간"
  },
  {
    "version": "0.14.0",
    "sourceRef": "0dc51d1bd4f32474dafcb8c9add90cc7bcec4c3f",
    "file": "0.14.0.txt",
    "sha256": "386bcd9dfe4a8ce0737a874281132e2d2974756f3bf15690d876020d695c28b8",
    "originalHeading": "2026-10-23 · 한국시간"
  },
  {
    "version": "0.13.0",
    "sourceRef": "af510cc0eed8d2cc74830d3c19e0c249485495db",
    "file": "0.13.0.txt",
    "sha256": "bb1773b631ead320dce86f533f1a9d109be201ab1112fee44edb2294af5099ff",
    "originalHeading": "0.12.3 로컬 후보"
  },
  {
    "version": "0.12.3",
    "sourceRef": "062fbf26c10b672420c7bed9934b96ac5e525cad",
    "file": "0.12.3.txt",
    "sha256": "bb1773b631ead320dce86f533f1a9d109be201ab1112fee44edb2294af5099ff",
    "originalHeading": "0.12.3 로컬 후보"
  },
  {
    "version": "0.12.2",
    "sourceRef": "7215e6ee9a0a0b311ed4c4ca044109c418defcc7",
    "file": "0.12.2.txt",
    "sha256": "d7c59210be42aeeb8f029d288d398d946778c19ab8ed71d1fc0e7e026cf7d214",
    "originalHeading": "0.12.2 로컬 후보"
  },
  {
    "version": "0.12.1",
    "sourceRef": "dbbfbefd05871fa5251e6d6473e6267df5ead56e",
    "file": "0.12.1.txt",
    "sha256": "f6eab6c18caf02cf6c85f894eec7b017c8ca24678178265ef251f27c5aa1238b",
    "originalHeading": "0.12.0 로컬 후보"
  },
  {
    "version": "0.12.0",
    "sourceRef": "09d5d4c70c7f84598e31baea5425bb5dd60a9fef",
    "file": "0.12.0.txt",
    "sha256": "f6eab6c18caf02cf6c85f894eec7b017c8ca24678178265ef251f27c5aa1238b",
    "originalHeading": "0.12.0 로컬 후보"
  },
  {
    "version": "0.11.2",
    "sourceRef": "f000029e75e35c7f2ea2d4711a46dbcfc20455d5",
    "file": "0.11.2.txt",
    "sha256": "2549047ae093962cc04a907d72de31f92ad8e6ae3b1e3f22edb9e3ab07d1d6bd",
    "originalHeading": "0.11.2"
  },
  {
    "version": "0.11.1",
    "sourceRef": "020198f4f2a08842345d6a83ec212c98d66ce66d",
    "file": "0.11.1.txt",
    "sha256": "b9330ebd64a3802f54efedef16acbf98bed48d86fbc6e08722e94c350cfabb7c",
    "originalHeading": "0.11.1"
  },
  {
    "version": "0.11.0",
    "sourceRef": "a8d66cd2bb76a44a0e0b08856aca706c4c3ae016",
    "file": "0.11.0.txt",
    "sha256": "83dd9890fcefbcd21ba97e4aa867dcbd7c7bc03359f2b875beb156ef9dd366ff",
    "originalHeading": "0.10.0 문서 후속 · 헤더 선택 그룹"
  },
  {
    "version": "0.10.0",
    "sourceRef": "a1a2be871b750eec5ce4c231a8ffd7baed9d3894",
    "file": "0.10.0.txt",
    "sha256": "6c85b7cf7428b002efaf9a92acac3caad37bc75168f57a3bb2e3a09ce769617d",
    "originalHeading": "0.9.1 문서 후속 · 사용 예제 탐색"
  },
  {
    "version": "0.9.1",
    "sourceRef": "42bbadeb1ff60a140b2f2219d3cad111b1be2c96",
    "file": "0.9.1.txt",
    "sha256": "ef354d02736b8ac5630acc1a80af933ed2bcc1c95ef4403ddac835e8fc0e39e2",
    "originalHeading": "0.9.1 · 예제 가독성과 조합 스타일 패치"
  },
  {
    "version": "0.9.0",
    "sourceRef": "92d66456ca1d0d206ae208f9061cb9702b828bb1",
    "file": "0.9.0.txt",
    "sha256": "27908f75b8faf911a4634382a238fedf8b87c2ef4b5a63e1ed0c144307274fa1",
    "originalHeading": "0.9.0 · Vue 사용 예제와 공통 패턴"
  },
  {
    "version": "0.8.1",
    "sourceRef": "72bf0500f00b94abac1287c197ffc3dc6ecdb7dc",
    "file": "0.8.1.txt",
    "sha256": "e4c0e30a6a18bd8bf04ea1ea6c7534024ad93bf09823e05112f6df6579bb2577",
    "originalHeading": "0.7.1 · local predeployment review (unpublished)"
  },
  {
    "version": "0.7.1",
    "sourceRef": "7ad4deda5cf3e4c1d836ac7eff3d75912ace4e1b",
    "file": "0.7.1.txt",
    "sha256": "e4c0e30a6a18bd8bf04ea1ea6c7534024ad93bf09823e05112f6df6579bb2577",
    "originalHeading": "0.7.1 · local predeployment review (unpublished)"
  },
  {
    "version": "0.7.0",
    "sourceRef": "6965d2ee49eddf2d31e0a91a4e268e93a8e859b4",
    "file": "0.7.0.txt",
    "sha256": "4dbd3842d7c7ab8cad20b4dae5166f91c8a954d65455be55e14e44069351d9f1",
    "originalHeading": "0.7.0 · local candidate, publication held"
  },
  {
    "version": "0.6.0",
    "sourceRef": "17defab4e57ac6f55f2817be786c9dbeff13e1cd",
    "file": "0.6.0.txt",
    "sha256": "44d4cb8fc0e34da8748fc7b85350745022ca7be1388e8e091db68639f2805f7d",
    "originalHeading": "0.6.0 · local candidate, not published"
  },
  {
    "version": "0.5.0",
    "sourceRef": "b8648faa619a2e36a38be6d95e123d1e245473ad",
    "file": "0.5.0.txt",
    "sha256": "a1f55c63dc7ec8ed67a674aa2cd7fd0ace69a31ac1b689a73e2d52ff4dbaeacf",
    "originalHeading": "로컬 미게시 후속 · 문서 검색/헤더 설정 — 2026-10-22"
  }
];

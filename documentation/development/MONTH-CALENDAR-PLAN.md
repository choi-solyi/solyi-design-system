# SMonthCalendar · 실제 구현 착수

현재 source UI와 44종 공개 등록·문서/starter 연결까지 구현하고 모바일 보완 72조합을 통과했습니다. [현재 검증 기록](MONTH-CALENDAR-VALIDATION.md)을 기준으로 하며 아래 첫 코드 단위는 당시의 기록입니다. 새 tarball 설치 검증·일부 통합 검증은 남아 있어 전체 출시 완료를 의미하지 않습니다. Sortable 항목별 disabled는 7714883에서 별도 보완했습니다.

승인된 독립형 월간 달력 단계입니다. 붙여넣은 텍스트(1).txt의 490줄을 Library 정식 read로 다시 확인했습니다. DatePicker의 입력/팝업을 확장하는 대신 한 달을 탐색하는 별도 컴포넌트로 구현합니다. TimeGrid는 다음 단계이며 업무별 휴가·공휴일·근무 규칙은 넣지 않습니다.

## 첫 코드 단위

month-calendar-values.ts에 ISO YYYY-MM 검증, 고정 6행/42셀과 빈 spacer, locale별 주 시작 요일, 초기 roving-focus 날짜, 방향키/Home/End/PageUp/PageDown(Shift: 연도) 이동 제안을 작성했습니다. 기존 Core date-only의 Gregorian 계산·0001–9999 경계를 재사용하고 저장 ISO 값을 local timezone으로 변환하지 않습니다. 소비자의 선택 모델을 정규화하거나 초기화하지 않습니다. 아직 root export·plugin·global 등록이나 Calendar UI는 없습니다.

month-calendar-values-check.mjs는 Gregorian 400년 × 12개월 × 7가지 주 시작 요일, 윤년·세기·월/연도 경계, 빈 셀·모든 날짜의 고유성, 불변 snapshot, selected→today→첫날 focus 기준, DST 인접 날짜와 3개 timezone에서 동일한 ISO 계산을 검증합니다. UI·실제 키보드·locale 표시·접근성 통과로 표현하지 않습니다.

첫 실행에서 33,600개 layout 조합과 경계·키보드 제안 검사가 통과했습니다. UI 패키지의 Vite + strict TypeScript + 선언 생성 빌드와 문서 링크 검사도 통과했습니다. 이 helper는 현재 runtime entry에서 import하지 않아 공개 runtime 크기는 이전 검증본과 같습니다. 별도 tarball 게시·설치나 Calendar 실행 검증을 한 것으로 표현하지 않습니다.

## 이어갈 공개 계약

- selected modelValue는 string|null ISO 날짜, month는 controlled YYYY-MM. 월 이동은 update:month와 reason이 있는 month-change 제안이며 부모가 수락할 때만 표시 월이 바뀝니다. 오늘 이동은 월/초점 이동이고 선택을 자동 저장하지 않습니다.
- id/label, 첫 요일 override와 locale, isDateDisabled(ISO), 날짜별 readonly marker map. marker는 id/label/tone/기존 icon으로 표현하고 여러 marker·긴 label·상태 안내를 지원합니다.
- date cell의 날짜 버튼·이름·포커스는 컴포넌트가 소유하고 cell/marker 등 범용 슬롯을 제공합니다. selected/today/disabled/marker는 형태·텍스트·ARIA로 구분합니다. disabled 날짜는 선택을 막되 키보드 탐색과 안내를 검토합니다.
- loading은 6행 레이아웃과 기존 선택을 유지합니다. disabled/readonly/error는 해당 조작에 맞게 정의하고 required/name/validate 같은 폼 계약은 기계적으로 추가하지 않습니다. 날짜 데이터가 늦게 도착해도 선택을 지우는 이벤트를 보내지 않습니다.
- 기존 tokens/ko-en/light-dark/밀도/320px·긴 텍스트/개별 import·global 타입을 구현하고 실제 브라우저에서 월 제안 수락·거부·외부 갱신·포커스를 확인합니다. 새 외부 의존성은 필요하지 않습니다.

첫 순수 계산 단위를 검증한 뒤 controlled UI/슬롯/marker, 공개 등록·Components·starter 예제, 설치 검증 순으로 작게 나눕니다. 기존 ESM 크기 한도와 동결 1.0.0 gate는 유지하며 [Sortable 설치 결과](SORTABLE-INSTALLED-VALIDATION.md)의 실패를 숨기지 않습니다. Sortable의 원 요청 중 항목별 disabled callback은 전체 목록 disabled와 별개인 남은 항목으로 유지합니다.

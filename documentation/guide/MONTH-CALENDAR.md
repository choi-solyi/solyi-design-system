# SMonthCalendar · 1.1.0

입력 팝업인 SDatePicker와 별개인 월간 조회·탐색 컴포넌트입니다. 선택 날짜와 표시 월을 부모가 관리하며 저장값을 timezone으로 변환하거나 업무별 휴가·공휴일·주말 규칙을 추가하지 않습니다. npm 1.1.0부터 제공하며 1.0.0에는 없습니다.

## 공개 계약

| prop | 의미 |
|---|---|
| id / label | 고유 ID와 달력 이름, 필수 |
| month | controlled YYYY-MM, 필수 |
| modelValue | ISO YYYY-MM-DD 또는 null. 기본 null |
| firstDay | 0–6, 기본 locale.firstDay. 일요일 0·월요일 1 |
| today | 날짜 ISO override. 생략하면 생성 시점 브라우저의 로컬 날짜 |
| markers | ISO 날짜 key의 readonly SolCalendarMarker[] map |
| markerLimit | 넓은 화면에서 직접 표시할 marker 수, 기본 2 |
| isDateDisabled | (date: string) => boolean. 소비자가 선택 가능 여부를 판단 |
| loading | 선택을 막고 busy 상태를 안내. 기본 6행/42셀 유지 |
| readonly | 선택을 막고 월·날짜 탐색은 허용 |
| disabled | 컴포넌트 소유 날짜·월 이동 컨트롤을 비활성화 |
| help / error / locale | 안내·외부 오류 표시·부분 locale override |

SolCalendarMarker는 id/label과 선택적 tone/기존 icon입니다. 같은 날짜 안에서 id가 유일해야 합니다. label은 색 없이도 의미를 알 수 있는 문구로 작성합니다. 객체와 배열을 수정하지 않고 내부 표시 snapshot을 만듭니다. callback은 순수 함수여야 합니다. 잘못된 월·모델·현재 표시 데이터·callback 오류는 오류를 표시하고 날짜 선택을 막습니다. 자동으로 모델을 비우지 않습니다. error prop 자체는 외부 오류 표시이며 조작 제한은 disabled/readonly로 제어합니다.

| event | 의미 |
|---|---|
| update:month | 새 YYYY-MM 제안 |
| month-change | SolMonthChange: month/previousMonth/reason(previous·next·today·keyboard) |
| update:modelValue | 선택한 새 ISO 날짜. 부모가 반영해야 선택 표시가 바뀜 |
| change | SolCalendarChange: value/previousValue/reason(pointer·keyboard) |

월·선택 제안을 부모가 거부하면 기존 표시 월과 선택이 유지됩니다. 월 이동·오늘 이동·초점 탐색은 날짜를 자동 선택하지 않습니다. 다른 월의 선택값, loading 중 데이터 교체, 비활성 규칙 변경도 기존 선택을 지우지 않습니다. name/required/rules/validate/clear 같은 폼 API를 추가하지 않았습니다. 제출값은 소비자가 선택 ISO 모델에서 가져옵니다.

## 슬롯·화면·키보드

- cell: date/day/selected/today/disabled/markers(읽기 전용 목록). 날짜 버튼 밖의 추가 콘텐츠입니다. 셀은 짧게 작성하고 긴 설명은 marker label과 아래 자료 영역을 사용합니다. 소비자 소유 링크·버튼의 상태와 레이아웃은 소비자가 관리합니다.
- marker: date/marker/index. 날짜 버튼 안의 장식 표시이므로 interactive 자식을 넣지 않습니다. 기본값은 기존 SBadge/SIcon입니다.
- empty/help: 날짜별 자료가 없을 때의 설명과 보조 안내입니다. 날짜 자체가 없는 달로 처리하지 않습니다.
- SolMonthCalendarHandle.focus(date?): 현재 표시 월의 날짜로 초점 이동. 다른 월을 자동 요청하지 않습니다.

좁은 화면에서는 날짜 셀을 짧게 유지하며 marker 개수를 표시합니다. 탐색 중인 날짜의 모든 marker 문구는 아래의 키보드 접근 가능한 자료 영역에서 줄바꿈해 읽을 수 있습니다. 넓은 화면은 기본 2개와 +N을 보여 줍니다. 날짜의 전체 aria-label에도 날짜·오늘·선택·비활성과 marker 문구를 포함합니다. 선택은 체크 표시, 오늘은 밑줄, 비활성은 점선·안내로 구분합니다.

native table/요일 열 제목과 roving 날짜 button을 사용합니다. 방향키는 하루/한 주, Home/End는 주 경계, PageUp/Down은 월, Shift+Page는 연도 이동입니다. Enter/Space는 선택 제안, Escape는 선택일 초점 복귀입니다. 비활성 날짜도 탐색해 안내를 읽을 수 있습니다. readonly는 탐색을 허용합니다. 초점이 영역 밖으로 이동한 뒤 늦게 월 응답이 와도 초점을 빼앗지 않습니다. Tab으로 아래 자료 영역에 도달해 native 스크롤로 긴 문구를 읽을 수 있습니다.

기본 날짜 셀은 loading 전후 공간을 예약합니다. markerLimit이나 소비자 슬롯의 큰 콘텐츠는 추가 높이를 만들 수 있습니다. 전역 overflow 숨김이나 focus/popup clipping을 추가하지 않습니다.

## 사용과 호환

SMonthCalendar는 root 개별 import, SolyiUI 플러그인과 solyi-ui/global 타입으로 사용할 수 있습니다. 모델과 marker 타입, 이벤트·슬롯·핸들 타입도 root에서 제공합니다. 실제 조작 예제는 [AdvancedExamples.vue](../../examples/vue-vuetify/src/AdvancedExamples.vue)의 month-calendar 부분, 엄격한 타입 proof는 [month-calendar.vue](../../examples/vue-vuetify/src/proofs/month-calendar.vue)입니다. Components의 Month Calendar 카드와 starter의 ?view=advanced&part=month-calendar가 같은 소스를 실행합니다.

기존 커스텀 달력의 선택 ISO를 modelValue에, 별도 표시 월을 month에 연결합니다. 날짜별 업무 데이터를 id/label/tone/icon map으로 변환하고 isDateDisabled는 앱에 둡니다. month-change에서 데이터를 요청하더라도 선택을 초기화하지 않고, 새 데이터와 loading만 갱신합니다. 서버 저장·timezone·업무 규칙은 소비 프로젝트 책임입니다. SSR이나 업무 timezone의 ‘오늘’은 명시적 today ISO로 전달합니다.

기존 DatePicker/API·ISO 저장 형식·Vue/Vuetify peer 범위는 유지합니다. npm 1.1.0에 게시했고 문서·starter에 연결했습니다. 최종 크기 기준·설치 검증은 [게시 기록](../development/NPM-1.1.0-PUBLICATION.md)을 참고하세요. 소비 앱 변경은 별도입니다.

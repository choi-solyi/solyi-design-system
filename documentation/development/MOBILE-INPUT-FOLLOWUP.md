# 모바일 입력·예제 후속 보완

기준 main: 1313622. npm 1.1.1 게시와 외부 소비 앱 변경은 보류한다. 아래 표의 구현과 실행 검증은 구분한다.

| 요청 | 확인한 원인·조치 | 현재 검증 |
|---|---|---|
| TimePicker 입력/선택 분리 | 직접 입력 클릭도 선택창을 열었다. 입력은 편집, 펼침 버튼은 선택으로 분리하고 포인터 열기는 입력 focus를 만들지 않는다. | 모바일 Chrome 포커스·open/취소/재열기 검사 진행 |
| TimePicker 모달 내부 여백 | 공통 host의 8px 패딩을 그대로 사용했다. TimePicker dialog에 기존 space-6 내부 패딩을 적용한다. 바깥 host 여백은 유지한다. | 320/360/390/768px 실제 렌더 검사 진행 |
| 모든 ±·프리셋 | 구현은 controls.ts SNumberInput에 모인다. nudge와 preset의 강제 input.focus를 제거하고 편집 중 선택 범위는 보존한다. | 실제 Chrome 포인터·키보드·직접 입력 및 caret 통과 |
| 입력 중 세 자리 구분 | useGrouping 기본 true, false로 생략한다. 숫자로 강제 변환하지 않고 정수 초안만 그룹화해 부호·미완성 소수·후행 0을 보존한다. | 실제 중간 삽입/Backspace/Delete/선택 교체/합성 붙여넣기 입력·음수·소수·빈값·경계 증감 통과 |
| 초안/모델/오류 보존 | 입력 중 표시만 바꾼다. 모델은 기존 commit/검증 계약을 유지한다. 0–10/2 범위에 100000을 쓰면 100,000 초안과 오류를 보존하고 모델을 바꾸지 않는다. | source runtime·폼 제출·min 기준 step 및 실제 브라우저 통과 |
| Linear 원형 중복 | progress.vue에서 원형 구간 전체와 두 진행 표시 설명을 제거한다. Circular API·독립 예제와 Loading Overlay는 유지한다. | 구현, 실제 3테마 확인 대기 |
| 주 액션 오른쪽 | 확인/저장/완료 footer와 단독 주 액션은 end 정렬한다. 취소·보조→주 액션 DOM 순서를 맞춘다. 검색·탐색·증감·툴바는 별개다. | 공통 footer·예제/기본 starter/Core 폼 조사와 수정 중 |
| Calendar 상세 3개 | 자료 3개는 map으로 모두 렌더됐지만 배지/텍스트가 섞이고 고정 상세 높이가 잘랐다. 독립 행·일관된 배지·별도 header/list scroll로 정리한다. 빈 loading 예약 높이를 한 줄로 줄인다. | 구현, 데이터 대응·다른 날짜/닫기/재열기·잘림 실조작 대기 |
| TimeGrid 시각/복제 | 편집용 분 좌표는 내부에 유지하고 HH:mm picker로 표시한다. opt-in 복제 사용 설정과 실제 메뉴 경로를 안내한다. | 구현, 경계/역전·원본/ID/개수·취소/반복 실조작 대기 |
| 전체 탐색 메뉴와 sticky 충돌 | 공개판 390px에서 TimeGrid가 메뉴 위를 덮는 hit-test 61곳을 재현했다. root isolation 후 0곳, 내부 scrollTop 475 유지. 전역 z-index를 올리지 않는다. | 수정 전후 실제 픽셀 확인, 최종 빌드·DataTable 인접 회귀 대기 |
| Container/Row/Col 반복 | layouts 예제를 재사용하되 각 API의 part를 구분한다. 너비/fluid, 간격·세로 정렬, 반응형 비율·줄바꿈을 각각 조작한다. 기존 조합 경로는 유지한다. | 구현·Vue 예제 타입 통과, 실제 화면 대기 |

## 공통 입력 focus 조사

- 공통 clear의 포인터 조작은 닫혀 있던 편집기에 focus를 강제하지 않는다. 이미 편집 중이면 유지한다. 명시적 키보드·메서드 clear/focus 계약은 보존한다.
- Date/Time legacy clear도 같은 원칙을 적용한다. 오류 제출에 따른 invalid field 복귀, 검색형 Autocomplete/Combobox/MultiSelect의 검색·선택 후 focus, roving keyboard focus는 목적이 달라 무조건 제거하지 않는다.
- SNumberInput 사용처: advanced-inputs(수량), data(페이지 크기), error-summary(개수), navigation(설정), pagination(주변 번호), time(scrub 설정), AdvancedExamples 편집. TimeGrid 편집 시각은 HH:mm으로 바꾼다. 순수 ± 표시는 controls.ts 두 버튼이며 Calendar의 +N은 증감이 아닌 자료 보기다.

## 증거와 한계

- Library의 정상 준비 경로는 성공했지만 Windows Python launcher 실행이 접근 실패하여 로컬 PNG 설치·직접 열람은 완료하지 못했다. helper 변경/임의 다운로드/다른 executor 경로 사용은 하지 않았다. 부모가 정상 Library 경로로 확인한 원본 픽셀 결과를 사용한다.
- qa-output/mobile-input-followup/ 아래에 임시 빌드·브라우저 로그와 캡처를 보존한다. 재현용 scripts/mobile-input-followup-browser-check.mjs는 최종 후보 설치본에서도 실행한다.
- 브라우저 focus 관찰과 viewport 축소는 실제 Android IME 검증이 아니다. 물리 휴대폰과 실제 스크린리더는 미검증이다.
- 사용자 신고 수정과 별도로 발견한 사항은 근거·조치·실행 결과를 아래에 추가한다. 같은 종류라는 이유만으로 미실행 경로까지 통과 처리하지 않는다.

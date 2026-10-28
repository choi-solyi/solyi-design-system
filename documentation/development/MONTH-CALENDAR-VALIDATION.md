# MonthCalendar 공개 코드·모바일 단위 보존

SMonthCalendar의 source 구현, root export/타입, SolyiUI/global 등록과 Components·starter 연결을 완료했습니다. 현재 공개 등록은 기존 38종 + 표시 4종 + Sortable + MonthCalendar = 44종입니다. 패키지 metadata는 private 1.0.0이며 npm/운영 사이트에 배포하지 않았습니다. STimeGrid/SScheduler는 미착수입니다.

## 구현과 실제 검증

- ISO 선택과 YYYY-MM 표시 월을 분리해 controlled 제안을 수락/거부합니다. 월 이동·오늘·키보드 탐색으로 선택값을 자동 변경하지 않습니다.
- fixed 6행/42셀, 주 시작 요일·locale, marker/overflow, disabled callback, loading/readonly/오류·빈 자료, cell/marker 슬롯과 focus(date?)를 제공합니다.
- 순수 계산 33,600조합, source runtime의 지연 월 수락·외부 초점 보호·자료 교체·모델 보존, 엄격한 local/global SFC 및 오류 4종, 자체 선언 31개(오류 0, 외부 769), 패키지 Vite/타입 빌드가 통과했습니다.
- 44개 export/등록과 기존 문서 npm test 전체가 통과했습니다. Components 9종의 메뉴·검색·라우트·API·정본 예제 연결 정적 대조도 통과했습니다.

첫 Chrome 검사에서 marker가 제거될 때 날짜 셀 높이가 줄어드는 결함을 발견했습니다. 실제 badge/문구 높이에 맞춰 공간을 예약했습니다. 날짜 탐색 초점이 화면 밖으로 숨지 않도록 nearest scroll도 적용했습니다. 합성 DOM의 성공만으로 완료 처리하지 않았습니다.

그 후 Chrome 72조합을 통과했지만 320px 캡처에서 지나치게 긴 날짜 셀과 잘린 marker 문구를 확인했습니다. 800px 이하에서는 짧은 날짜 셀에 marker 개수를 보여 주고, 아래의 날짜별 자료 영역에서 전체 문구를 줄바꿈해 읽도록 보완했습니다. 자료 영역은 native 키보드 접근/스크롤을 사용하고, cell 슬롯의 긴 예시 문구는 짧은 정보 표시로 정리했습니다. 소비자 슬롯에 전역 clipping을 적용하지 않았습니다.

보완 후 기존 320/768/1440 × 3테마 × light/dark × 2density × ko/en **72조합을 재통과**했습니다. 실제 키보드·포커스, controlled 수락/거부, 6행 로딩 geometry, 짧은 셀·개수와 전체 marker 문구, readonly/disabled와 가로 overflow 없음, 320px touch tap을 확인했습니다. source runtime도 재통과했습니다. 최종 320px 캡처를 직접 확인했습니다. 최종 starter·docs 빌드도 종료 결과를 회수했습니다.

## 범위와 남은 검증

이 단위는 source/로컬 빌드 검증입니다. 새 Calendar 및 Sortable 항목별 disabled가 포함된 tarball의 격리 설치 소비 검증은 아직 하지 않았습니다. 이전 [1815de3 설치 결과](SORTABLE-INSTALLED-VALIDATION.md)와 혼동하지 않습니다. 실제 Components iframe에서 Calendar 단독 연결의 브라우저 회수도 남아 있으며 정적 연결·실행 소스 자체 검증과 구분합니다. 물리 터치·스크린리더·Safari·RTL은 미검증입니다.

최종 runtime index는 **200,955자 / 203,209 bytes / gzip 52,379 bytes**입니다. 176,000자 한도보다 24,955자 큽니다. 동결 1.0.0 hash gate도 유지합니다. 두 문제는 공개 출시 차단이며 새 UI가 통과했다고 해소된 것이 아닙니다. 검사 위치 이동·한도 완화·대체 gate·재게시를 하지 않았습니다. [크기 분석](BUNDLE-GROWTH-REVIEW.md)을 따릅니다.

증거: qa-output/month-calendar-mobile-build.log, month-calendar-mobile-runtime.log, month-calendar-mobile-browser.log, month-calendar-browser/report.json 및 320/768/1440.png, month-calendar-types.log, month-calendar-declarations.log, month-calendar-s-api.log, month-calendar-npm-test.log, month-calendar-mobile-starter.log, month-calendar-mobile-docs.log. 장시간 실행 명령을 남기지 않고 종료 결과를 회수했습니다.

최신 665줄 확장 요청은 별도 대조·계획 단계로 전환했습니다. 이 커밋을 보존한 뒤 추가 Clear/Combobox/Overlay 등 대규모 API는 계획 검토 전에 구현하지 않습니다.

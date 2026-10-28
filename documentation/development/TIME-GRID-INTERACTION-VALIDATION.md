# TimeGrid 상호작용 · 로컬 검증

기본 readonly와 9dd4094의 읽기 API를 유지합니다. 편집은 readonly=false로 켜며 resize/duplicate는 별도 opt-in입니다. key/from/to 분 좌표를 복사·동결해 제안하고 원본 배열·객체, 폼·저장·시간대 모델은 변경하지 않습니다. 부모가 반영하거나 거절하며 복제 key와 pending/error도 부모 소유입니다.

## 확인한 결과

- `scripts/time-grid-proposal-check.mjs`: 자정 기준 snap, 열만 변경할 때 비정렬 시간 보존, 하루 경계·양의 길이, 두 resize·복제, 분리된 frozen payload 통과.
- `scripts/time-grid-runtime-check.mjs --source`: 부모 반영/거절, 원본 불변성, reactive preview 재렌더, 동등한 배열/accessor 재생성, 외부 변경·설정·readonly/disabled/loading/pending/항목별 잠금 취소, Escape·Tab·IME·repeat·unmount·locale 통과.
- UI 빌드 및 자체 선언 생성, generic 예제 타입, 50종 Components API/메서드·slot 대조 통과. 정본 starter의 `advanced/time-grid`에 편집·부모 반영·항목 잠금·pending 예제를 연결했습니다.
- 격리 Chrome 실제 포인터/키보드: 이동·두 종류 제안·복제, 부모 거절, Escape, resize, capture 상실, 자동스크롤, 상속 CSS RTL 통과.
- Chrome 모바일 터치 에뮬레이션: 빈 영역 native pan, 손잡이 touchCancel·확정, release click 재시작 방지 통과. 390px 다크 화면과 전체 목록 경로를 직접 확인했습니다.

## 실제 화면에서 수정한 문제

경계에 도달해 현재 도구 버튼이 disabled가 되면 Chrome이 포커스를 body로 보내 취소하던 문제를 수정했습니다. 이 경우에만 사용 가능한 도구 버튼으로 복원하며 실제 외부 포커스 이동은 취소합니다. 자동스크롤은 rem 토큰을 px로 오해하던 계산을 실제 손잡이 높이로 바꿔 밀도·터치 크기에 맞춥니다.

capture 해제 검증은 브라우저 규칙에 따라 다음 native pointermove 뒤 lostpointercapture를 확인했습니다. 자동스크롤 검증은 뷰포트 안의 실제 경계를 사용했습니다. 검증 실패를 기능 통과로 바꾸거나 임계값을 낮추지 않았습니다.

## 증거와 남은 범위

로컬 로그: `qa-output/time-grid-editor-build.log`, `time-grid-editor-types.log`, `time-grid-editor-runtime.log`, `time-grid-proposal.log`, `time-grid-component-api.log`; 브라우저는 `time-grid-toolbar-check.log`, `time-grid-editor-browser.log`의 앞 네 통과 구간과 `time-grid-pointer-browser.log`의 capture 통과, `time-grid-pointer-rest.log`의 남은 네 통과 구간으로 나누어 기록했습니다. 앞 실행의 이후 timeout은 후속 원인 분리/수정과 구분합니다. 이미지: `qa-output/dialog-feedback/screens/time-grid-edit-keyboard.png`, `time-grid-edit-touch.png`.

현재 증거는 소스/로컬 빌드 QA입니다. 최종 tarball 설치·SSR·전체 출시 pipeline은 별도 후보에서 확인해야 합니다. 물리 Fold/OS 키보드·Safari·화면 낭독기는 미검증입니다. npm E401, 버전별 최종 크기 예산과 동결 artifact 준비는 별도 출시 조건이며 1.0.0 파일/검사는 보존합니다. 공개 npm·운영 문서는 아직 갱신하지 않았습니다.

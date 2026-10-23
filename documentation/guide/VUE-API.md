# 입력·탐색·피드백의 공통 계약

현행 Props·Slots·Events·Methods의 타입·기본값·허용값은 [각 컴포넌트 문서](https://choi-solyi.github.io/solyi-design-system/#component)와 실제 생성 타입 선언이 기준입니다. 이 가이드는 여러 컴포넌트에 공통인 책임과 사용 규칙을 설명합니다. 과거 API별 표는 [이력 부록](../development/VUE-API-HISTORY.md)에 보존합니다.

## 값과 폼

- 입력마다 고유한 id와 보이는 label을 제공합니다. help·규칙 오류·서버 오류는 입력과 접근성 설명으로 연결합니다.
- 값은 v-model 또는 update:modelValue로 앱이 소유합니다. 컴포넌트는 props를 직접 바꾸거나 서버·저장소에 전송하지 않습니다.
- Checkbox/Switch는 boolean, Radio/Select는 문자열 또는 null, Textarea는 문자열, NumberInput은 숫자 또는 null입니다. 날짜는 YYYY-MM-DD의 단일값/완성된 범위, 시간은 HH:mm 또는 null입니다.
- 날짜·시각·숫자의 잘못되거나 미완성인 입력은 초안을 보존하고 완성값으로 내보내지 않습니다. clear는 null로 지웁니다. DatePicker의 mode 변경 정책과 범위 중간 상태는 해당 API 예제를 따릅니다.
- SForm의 제출·공통 rules와 개별 필드 메서드는 실제 타입 계약을 사용합니다. template ref로 focus·validate·resetValidation을 호출하고 DOM ID 조회에 기대지 않습니다. 비동기 서버 오류는 공통 규칙 오류와 구분합니다.

## 선택과 키보드

native Checkbox/Radio/Select 의미를 유지합니다. disabled는 조작을 막고 readonly는 읽기와 초점을 유지하면서 값 변경을 막습니다. Radio/Select 옵션 value는 고유하고 비어 있지 않은 문자열로 제공합니다.

STabs는 하나의 roving Tab 정지점과 방향키·Home/End를 사용하며 automatic/manual 활성화 정책을 구분합니다. 접힌 패널이나 숨긴 대화상자의 콘텐츠를 Tab 순서에 남기지 않습니다. 슬롯 안에 앱이 넣은 조작부의 disabled 정책은 소비 앱이 함께 관리합니다.

## 날짜·시각

date-only는 시간대 변환 없이 문자열로 처리합니다. 범위의 첫 선택은 임시 상태이고 두 번째 선택에서 완성값을 내보냅니다. Escape·바깥 닫기·취소의 초안 정책과 초점 복귀를 실제 예제로 확인합니다.

달력은 날짜/주/월 이동을, 시간 패널은 직접 HH:mm 입력과 시·분 선택을 제공합니다. 부분 시각을 완료값으로 내보내지 않습니다. 밤을 넘는 일정·DST·예약 실행은 이 시간 선택 API 범위 밖입니다.

## 알림과 언어

SSnackbar는 열릴 때 초점을 빼앗지 않습니다. 중요한 오류는 자동 소멸 토스트만으로 안내하지 않고 지속되는 인라인 복구를 함께 제공합니다. 종료·재시도·duration과 초점/호버 중 타이머 정책은 해당 컴포넌트 계약을 따릅니다.

기존 locale provider는 한국어·영어 기본 문구와 부분 override를 지원합니다. 전달한 label·slot·업무 오류는 앱의 문구로 유지합니다. [LOCALE.md](LOCALE.md)를 참고하세요. 문서 전체 번역이나 RTL 지원을 뜻하지 않습니다.

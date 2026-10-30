# Date/TimePicker 표시 방식

npm 1.1.0의 SDatePicker/STimePicker 옵션입니다. 공개 npm 1.0.0의 기능으로 설명하지 않습니다.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SDatePicker } from 'solyi-ui'
import type { DateValue } from 'solyi-ui'

const date = ref<DateValue>('2026-10-28')
</script>

<template>
  <SDatePicker
    id="date"
    v-model="date"
    label="날짜"
    picker-presentation="auto"
    placement="bottom-start"
    clearable
  />
</template>
```

`pickerPresentation` 생략 시 기존 native modal dialog입니다. `popover`는 입력창에 연결된 nonmodal 팝업, `dialog`는 modal, `auto`는 기존 좁은 화면 기준에 따라 두 방식을 전환합니다. `placement`는 bottom-start(기본), bottom-end, top-start, top-end이며 start/end는 RTL을 반영합니다. 화면 경계에서는 위치를 조정하며 modal 위치에는 사용하지 않습니다.

열린 auto 팝업의 화면 크기 전환과 opt-in 방식 사이의 변경은 부분 기간 선택을 보존합니다. legacy 방식과 opt-in 방식 사이를 명시적으로 바꾸면 열린 선택을 취소합니다. Escape·바깥 초점 이동·닫기는 미완성 기간을 확정하지 않습니다. 팝업 안에서 Escape를 눌러도 부모 Dialog를 함께 닫지 않습니다.

ISO string 또는 `{start,end}`/null 모델, DateChange의 input/calendar/clear/mode 이유, displayFormatter와 제출값 분리는 유지합니다. 부모가 날짜 제안을 거부하면 입력 표시와 제출값을 부모 모델로 복원합니다. focus/validate/clear/resetValidation만 공개 handle이며 open/close 메서드를 추가하지 않았습니다. disabled/readonly 및 SForm의 상속 상태는 열기와 변경을 막습니다.

Components Date의 Examples/Sample Code와 starter의 날짜 예제에서 단일/기간·요일 표시·팝업 방식·기준 위치를 조작할 수 있습니다. Time 예제도 팝업 방식을 선택할 수 있습니다. TimePicker의 기존 presentation=native/list는 내용 선택이며 pickerPresentation과 독립적입니다. Time의 새 옵션을 생략하면 기존 body 연결 패널을 유지합니다. min 기준 step·scalar change·수동 입력·초기 목록 위치를 보존하고, 열린 표시 방식 전환 중 scrub preview는 commit 없이 취소합니다. nonmodal에서 마우스로 입력창을 열면 입력 caret를 유지하고, 키보드 열기 또는 modal에서는 패널 내부로 초점을 옮깁니다.

실제 Fold·OS 키보드·Safari·화면 낭독기 검증과 Chrome 자동 검증은 구분합니다. 최종 게시에는 전체 release 검증과 registry 인증 복구가 필요합니다.

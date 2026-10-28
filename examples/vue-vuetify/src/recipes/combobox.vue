<script setup lang="ts">
import type { SolComboboxChange, SolComboboxHandle, SolOption, SolOptionLoader } from 'solyi-ui'

const value = ref<string | null>(null),
  blurValue = ref<string | null>(null),
  asyncValue = ref<string | null>(null)
const event = ref<SolComboboxChange | null>(null),
  combo = ref<SolComboboxHandle | null>(null)
const readOnly = ref(false),
  disabled = ref(false),
  fail = ref(false)
const options: readonly SolOption[] = [
  { value: 'option-alpha', label: 'Alpha', description: '표시 문자열과 옵션 ID를 구분합니다.' },
  { value: 'option-blocked', label: '선택할 수 없는 후보', disabled: true },
  { value: 'option-beta', label: 'Beta' },
  {
    value: 'option-long',
    label: '여러 줄 전체 내용에서 확인할 수 있는 아주 긴 후보 이름 '.repeat(6),
    description: '후보 아래의 전체 내용 펼치기는 키보드와 터치로 사용할 수 있습니다.',
  },
]
const loadOptions: SolOptionLoader = (query, signal) =>
  new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new Error('aborted'))
      return
    }
    const abort = () => {
      clearTimeout(timer)
      reject(new Error('aborted'))
    }
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', abort)
      if (fail.value) reject(new Error('가상 목록 실패'))
      else
        resolve(options.filter(option => option.label.toLowerCase().includes(query.toLowerCase())))
    }, 180)
    signal.addEventListener('abort', abort, { once: true })
  })
</script>
<template>
  <SCard title="자유 입력과 후보 선택" :heading-level="2">
    <div class="sol-stack">
      <SCombobox
        id="recipe-combobox"
        ref="combo"
        v-model="value"
        label="문자열 또는 후보"
        :options="options"
        clearable
        :readonly="readOnly"
        :disabled="disabled"
        help="Enter는 직접 입력을 확정합니다. 방향키로 후보를 탐색한 뒤 Enter를 누르면 선택합니다. Escape는 편집을 취소합니다."
        @change="event = $event"
      >
        <template #leading><SIcon name="edit" decorative :size="16" /></template>
      </SCombobox>
      <p id="recipe-combobox-result" role="status">
        확정값: {{ value ?? '없음' }} · reason: {{ event?.reason ?? '없음' }} · option ID:
        {{ event?.reason === 'select' ? event.option.value : '없음' }}
      </p>
      <div class="sol-actions">
        <SBtn @click="combo?.clear()">메서드로 지우기</SBtn>
        <SBtn @click="combo?.focus()">초점 이동</SBtn>
      </div>
      <SCheckbox id="recipe-combobox-readonly" v-model="readOnly" label="보기 전용" />
      <SCheckbox id="recipe-combobox-disabled" v-model="disabled" label="비활성" />
      <SCombobox
        id="recipe-combobox-blur"
        v-model="blurValue"
        label="blur 확정 사용"
        :options="options"
        :commit-on="['enter', 'blur']"
        :open-on-focus="false"
        clearable
        help="입력 영역 밖으로 초점이 나가면 직접 입력을 확정합니다. 내부 X·목록·전체 내용 탐색은 확정하지 않습니다."
      />
      <SCombobox
        id="recipe-combobox-async"
        v-model="asyncValue"
        label="비동기 후보"
        :load-options="loadOptions"
        :debounce="150"
        clearable
        help="로컬 타이머를 사용한 가상 목록입니다. 서버 요청이나 저장은 하지 않습니다."
      />
      <SCheckbox id="recipe-combobox-fail" v-model="fail" label="다음 목록 요청 실패" />
    </div>
  </SCard>
</template>

<script setup lang="ts">
const choice = ref<string | null>('brief')
const options = [
  { value: 'brief', label: '간단히' },
  { value: 'full', label: '자세히' },
  { value: 'reserved', label: '준비 중인 표시', disabled: true },
]
</script>
<template>
  <SCard :heading-level="2" title="서로 배타적인 한 가지 선택 · Radio Group">
    <p>같은 그룹에서는 하나만 선택합니다. 방향키로 선택을 옮길 수 있습니다.</p>
    <SRadioGroup
      id="recipe-radio-choice"
      v-model="choice"
      label="표시 방법"
      :options="options"
      required
    />
    <p role="status">선택한 표시: {{ choice === 'brief' ? '간단히' : '자세히' }}</p>
  </SCard>
</template>

<script setup lang="ts">
const multiple = ref(false),
  single = ref<string | null>('brief'),
  immediate = ref(false)
const options = [
  { value: 'brief', label: '간단히' },
  { value: 'full', label: '자세히' },
]
const hideSwitchLabel = ref(true)
</script>
<template>
  <SCard :heading-level="2" title="선택의 의미">
    <SCheckbox
      class="sol-choice-row"
      id="recipe-multiple"
      v-model="multiple"
      label="자료 포함 · 다중 선택의 한 항목"
    />
    <SRadioGroup
      class="sol-choice-row"
      id="recipe-single"
      v-model="single"
      label="한 가지 표시 방식"
      :options="options"
    />
    <SCheckbox
      id="recipe-switch-label"
      v-model="hideSwitchLabel"
      label="외부 설정명이 있을 때 오른쪽 라벨 숨기기"
    />
    <div class="sol-actions">
      <label id="recipe-immediate-label" for="recipe-immediate">바뀌면 바로 적용</label
      ><SSwitch
        id="recipe-immediate"
        v-model="immediate"
        label="바뀌면 바로 적용"
        :hide-label="hideSwitchLabel"
        aria-labelledby="recipe-immediate-label"
      />
    </div>
    <p role="status">
      자료 {{ multiple ? '포함' : '제외' }} · {{ single }} · 즉시 설정
      {{ immediate ? '켬' : '끔' }}
    </p>
  </SCard>
</template>

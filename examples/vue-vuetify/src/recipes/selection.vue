<script setup lang="ts">
const multiple = ref(false),
  single = ref<string | null>('brief'),
  immediate = ref(false);
const options = [
  { value: 'brief', label: '간단히' },
  { value: 'full', label: '자세히' },
];
</script>
<template>
  <SCard :heading-level="2" title="선택의 의미">
    <SCheckbox id="recipe-multiple" v-model="multiple" label="자료 포함 · 다중 선택의 한 항목" />
    <SRadioGroup id="recipe-single" v-model="single" label="한 가지 표시 방식" :options="options" />
    <SSwitch id="recipe-immediate" v-model="immediate" label="바꾸는 즉시 적용" />
    <p role="status">
      자료 {{ multiple ? '포함' : '제외' }} · {{ single }} · 즉시 설정
      {{ immediate ? '켬' : '끔' }}
    </p>
  </SCard>
</template>

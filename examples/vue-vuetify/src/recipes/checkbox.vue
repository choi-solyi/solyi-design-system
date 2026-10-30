<script setup lang="ts">
const include = ref(true),
  archived = ref(false)
</script>
<template>
  <SCard :heading-level="2" title="독립된 항목 선택 · Checkbox">
    <p>각 항목을 따로 선택합니다. 하나를 선택해도 다른 항목의 선택은 바뀌지 않습니다.</p>
    <SCheckbox id="recipe-checkbox-include" v-model="include" label="완료한 항목 포함" />
    <SCheckbox id="recipe-checkbox-archived" v-model="archived" label="보관한 항목 포함" />
    <SCheckbox id="recipe-checkbox-disabled" label="선택할 수 없는 항목" disabled />
    <p role="status">
      완료 {{ include ? '포함' : '제외' }} · 보관 {{ archived ? '포함' : '제외' }}
    </p>
  </SCard>
</template>

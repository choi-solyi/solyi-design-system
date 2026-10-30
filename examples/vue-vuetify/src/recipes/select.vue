<script setup lang="ts">
const selected = ref<string | null>('recent')
</script>
<template>
  <SCard :heading-level="2" title="목록에서 한 가지 선택 · Select">
    <SSelect
      id="recipe-owned-select"
      v-model="selected"
      label="정렬 기준"
      clearable
      :options="[
        { value: 'recent', label: '최근 수정순' },
        { value: 'name', label: '이름순' },
        { value: 'reserved', label: '준비 중인 기준', disabled: true },
      ]"
    />
    <p role="status">선택값: {{ selected ?? '없음' }}</p>
  </SCard>
</template>

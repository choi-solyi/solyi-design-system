<script setup lang="ts">
const result = ref('');
const items = [
  { id: 'copy', label: '가상 복제' },
  { id: 'archive', label: '가상 보관' },
  { id: 'disabled', label: '비활성', disabled: true },
];
</script>
<template>
  <SCard :heading-level="2" title="더 많은 동작">
    <SSplitBtn
      id="recipe-actions"
      label="가상 내보내기"
      :items="items"
      @primary="result = '주 동작 확인'"
      @select="result = $event"
    />
    <SContextMenu id="recipe-context" label="가상 기록" :items="items" @select="result = $event">
      <p>우클릭·Shift+F10 또는 표시된 동작 버튼으로 엽니다.</p>
    </SContextMenu>
    <p role="status">{{ result }}</p>
  </SCard>
</template>

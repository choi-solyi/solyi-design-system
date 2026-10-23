<script setup lang="ts">
const expanded = ref(false);
</script>
<template>
  <SCard :heading-level="2" title="상세 펼침">
    <SAccordion id="recipe-accordion" v-model="expanded" label="가상 기록의 상세">
      <p>접으면 이 안의 링크가 Tab 순서에서 제외됩니다.</p>
      <a href="https://choi-solyi.github.io/solyi-design-system/">문서 홈</a>
    </SAccordion>
    <p role="status">{{ expanded ? '상세를 펼쳤어요.' : '상세를 접었어요.' }}</p>
  </SCard>
</template>

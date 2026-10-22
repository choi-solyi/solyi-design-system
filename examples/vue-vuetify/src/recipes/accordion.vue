<script setup lang="ts">
import { SCard } from '@solyi/vue-ui';
</script>
<template>
  <SCard
    :heading-level="2"
    title="상세 펼침"
  >
    <p>
      전용 Accordion export가 없는 Vue 조합입니다. native details의 키보드·접힘
      동작을 유지합니다.
    </p>
    <details class="sol-accordion">
      <summary>가상 기록의 상세</summary>
      <div class="sol-accordion-content">
        <p>접으면 이 안의 링크가 Tab 순서에서 제외됩니다.</p>
        <a href="https://choi-solyi.github.io/solyi-design-system/">문서 홈</a>
      </div>
    </details>
  </SCard>
</template>

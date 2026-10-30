<script setup lang="ts">
const expanded = ref(false)
const opened = ref<Record<string, boolean>>({})
const items = [
  { id: 'purpose', label: '언제 사용하나요?', text: '필요할 때 확인하는 추가 설명을 제공합니다.' },
  { id: 'content', label: '어떤 내용을 넣나요?', text: '짧은 설명이나 보조 정보를 담습니다.' },
  {
    id: 'keyboard',
    label: '키보드로 여는 방법',
    text: '제목 버튼에 초점을 두고 Enter 또는 Space를 누릅니다.',
  },
  {
    id: 'independent',
    label: '여러 항목을 함께 열 수 있나요?',
    text: '이 예제의 항목은 서로 독립적으로 열고 닫힙니다.',
  },
]
</script>
<template>
  <section class="sol-stack" aria-label="단일 및 여러 추가 설명">
    <SCard :heading-level="2" title="추가 설명 한 개">
      <SAccordion id="recipe-accordion" v-model="expanded" label="가상 기록의 상세">
        <p>접으면 이 안의 링크가 Tab 순서에서 제외됩니다.</p>
        <a href="https://ui.solyi.kr/" target="_blank" rel="noopener">문서 홈 · 새 창</a>
      </SAccordion>
      <p role="status">{{ expanded ? '상세를 펼쳤어요.' : '상세를 접었어요.' }}</p>
    </SCard>
    <SCard :heading-level="2" title="추가 설명 여러 개 · 독립적으로 열기">
      <p>각 항목을 별도로 여닫습니다. 한 항목을 열어도 다른 항목은 닫히지 않습니다.</p>
      <SAccordion
        v-for="item in items"
        :key="item.id"
        :id="'recipe-accordion-multi-' + item.id"
        v-model="opened[item.id]"
        :label="item.label"
      >
        <p>{{ item.text }}</p>
      </SAccordion>
    </SCard>
  </section>
</template>

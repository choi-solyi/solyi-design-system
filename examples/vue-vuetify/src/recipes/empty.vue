<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SBtn } from '@solyi/vue-ui';
const added = ref(false);
</script>
<template>
  <SCard
    :heading-level="2"
    :title="added ? '오늘의 첫 관찰' : '아직 기록이 없어요.'"
  >
    <p>
      {{
        added
          ? '가상의 잎 관찰을 추가했어요.'
          : '작은 관찰부터 하나 남겨 보세요.'
      }}
    </p>
    <SBtn
      :variant="added ? 'secondary' : 'primary'"
      @click="added = !added"
    >
      {{ added ? '가상 기록 초기화' : '첫 가상 기록 추가' }}
    </SBtn>
    <p role="status">{{ added ? '가상 기록 1개' : '기록 0개' }}</p>
  </SCard>
</template>

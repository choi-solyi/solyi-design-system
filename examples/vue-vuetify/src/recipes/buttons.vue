<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';

const busy = ref(false),
  result = ref('');
let timer: ReturnType<typeof setTimeout>;
function run() {
  if (busy.value) return;
  busy.value = true;
  timer = setTimeout(() => {
    result.value = '가상 확인을 마쳤어요.';
    busy.value = false;
  }, 500);
}
onBeforeUnmount(() => clearTimeout(timer));
</script>
<template>
  <SCard
    :heading-level="2"
    title="버튼 사용"
  >
    <div class="sol-actions">
      <SBtn
        variant="primary"
        :loading="busy"
        @click="run"
      >
        확인
      </SBtn>
      <SBtn @click="result = '보조 동작을 눌렀어요.'">보조 동작</SBtn>
      <SBtn
        variant="inline"
        @click="result = ''"
      >
        초기화
      </SBtn>
      <SBtn disabled>비활성</SBtn>
    </div>
    <p role="status">{{ result }}</p>
  </SCard>
</template>

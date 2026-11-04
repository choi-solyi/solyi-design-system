<script setup lang="ts">
const busy = ref(false),
  result = ref('')
let timer: ReturnType<typeof setTimeout>
function run() {
  if (busy.value) return
  busy.value = true
  result.value = '처리 중입니다.'
  timer = setTimeout(() => {
    result.value = '가상 확인을 마쳤어요.'
    busy.value = false
  }, 700)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>
<template>
  <SCard :heading-level="2" title="버튼 상태와 동작">
    <div class="sol-actions">
      <SBtn variant="primary" :loading="busy" @click="run">확인</SBtn>
      <SBtn @click="result = '보조 동작을 눌렀어요.'">보조 동작</SBtn>
      <SBtn variant="inline" @click="result = ''">초기화</SBtn>
      <SBtn disabled>비활성</SBtn>
    </div>
    <p role="status">{{ result }}</p>
    <p class="sol-hint">
      확인은 0.7초의 가상 작업을 실행합니다. 처리 중에는 중복 실행을 막고, 비활성 버튼은 조작할 수
      없습니다.
    </p>
  </SCard>
</template>

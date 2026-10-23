<script setup lang="ts">
const open = ref(false),
  recovered = ref(false)
</script>
<template>
  <SCard :heading-level="2" title="상태와 다음 행동">
    <SAlert v-if="!recovered" tone="danger" title="가상 저장을 완료하지 못했어요.">
      <p>입력 내용은 유지됩니다.</p>
      <template #actions>
        <SBtn variant="inline" @click="recovered = true"> 다시 시도 </SBtn>
      </template>
    </SAlert>
    <SAlert v-else tone="success" title="✓ 가상 저장을 확인했어요." />
    <SBtn @click="open = true">짧은 완료 안내</SBtn>
    <SSnackbar
      id="recipe-feedback-toast"
      v-model="open"
      tone="success"
      message="가상 작업을 확인했어요."
      :duration="4000"
    />
  </SCard>
</template>

<script setup lang="ts">
const name = ref(''),
  checked = ref(false)
const error = computed(() =>
  checked.value && !name.value.trim() ? '기록 이름을 입력해 주세요.' : '',
)
</script>
<template>
  <SCard :heading-level="2" title="구체적인 문구와 가까운 도움말">
    <form class="sol-stack" @submit.prevent="checked = true" novalidate>
      <STextField
        id="recipe-writing"
        v-model="name"
        label="기록 이름"
        help="화면에서 찾기 쉬운 이름을 적어 주세요."
        :error="error"
        required
      />
      <SBtn type="submit" variant="primary"> 기록 확인 </SBtn>
      <SAlert v-if="checked && !error" tone="success" title="✓ 가상 기록 이름을 확인했어요." />
    </form>
  </SCard>
</template>

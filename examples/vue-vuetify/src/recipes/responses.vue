<script setup lang="ts">
const state = ref<string | null>('ready');
</script>
<template>
  <SCard :heading-level="2" title="비어 있음과 오류를 구분">
    <SSelect
      id="recipe-response"
      v-model="state"
      label="가상 응답"
      :options="[
        { value: 'ready', label: '정상' },
        { value: 'loading', label: '로딩' },
        { value: 'empty', label: '결과 없음' },
        { value: 'denied', label: '권한 없음' },
        { value: 'error', label: '오류' },
      ]"
      required
    />
    <SProgressLinear
      v-if="state === 'loading'"
      id="recipe-response-loading"
      label="가상 자료를 불러오는 중"
      state="indeterminate"
    />
    <SCard v-else-if="state === 'empty'" title="조건에 맞는 자료가 없어요.">
      <SBtn @click="state = 'ready'">조건 초기화</SBtn>
    </SCard>
    <SAlert v-else-if="state === 'denied'" tone="info" title="이 가상 자료에 접근할 수 없어요.">
      <p>실제 계정 권한은 바꾸지 않습니다.</p>
      <template #actions>
        <SBtn variant="inline" @click="state = 'ready'"> 공개 예시 보기 </SBtn>
      </template>
    </SAlert>
    <SAlert v-else-if="state === 'error'" tone="danger" title="가상 자료를 불러오지 못했어요.">
      <template #actions>
        <SBtn variant="inline" @click="state = 'ready'"> 다시 시도 </SBtn>
      </template>
    </SAlert>
    <p v-else>✓ 가상 기록 2개를 확인했어요.</p>
  </SCard>
</template>

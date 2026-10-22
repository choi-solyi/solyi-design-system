<script setup lang="ts">
import { ref } from 'vue';
import { SCard, STextField, SSelect, SAlert, SBtn } from '@solyi/vue-ui';
const query = ref(''),
  state = ref<string | null>('all'),
  failed = ref(true);
</script>
<template>
  <SCard
    :heading-level="2"
    title="컨트롤과 보조 행동의 관계"
  >
    <div class="sol-filterbar">
      <STextField
        id="recipe-composition-query"
        v-model="query"
        label="검색"
        help="도움말이 있어도 컨트롤 시작점은 같습니다."
      />
      <SSelect
        id="recipe-composition-state"
        v-model="state"
        label="상태"
        :options="[
          { value: 'all', label: '전체' },
          { value: 'done', label: '완료' },
        ]"
        required
      />
    </div>
    <SAlert
      v-if="failed"
      tone="danger"
      title="가상 자료를 불러오지 못했어요."
    >
      <p>현재 검색 조건은 유지됩니다.</p>
      <template #actions>
        <SBtn
          variant="inline"
          @click="failed = false"
        >
          다시 시도
        </SBtn>
      </template>
    </SAlert>
    <p
      v-else
      role="status"
    >
      ✓ 가상 재시도를 확인했어요.
    </p>
  </SCard>
</template>

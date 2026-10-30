<script setup lang="ts">
import { useSolLocale } from 'solyi-ui'

const locale = useSolLocale()
const english = computed(() => locale.value.code === 'en-US')
</script>
<template>
  <SCard :heading-level="2" :title="english ? 'Badge status indicators' : '배지로 상태 표시'">
    <p>
      {{
        english
          ? 'Badges describe a status; they are not action buttons.'
          : '배지는 상태를 설명하는 표시이며 누르는 버튼이 아닙니다.'
      }}
    </p>
    <div class="sol-actions">
      <SBadge tone="success" :content="english ? 'Complete' : '완료'" />
      <SBadge tone="warning" variant="outlined" :content="english ? 'Needs review' : '확인 필요'" />
      <SBadge tone="danger" variant="filled" :content="english ? 'Error' : '오류'" />
      <SBadge :content="english ? 'New' : '새 항목'" />
    </div>
  </SCard>
</template>

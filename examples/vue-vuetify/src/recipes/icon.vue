<script setup lang="ts">
import { useSolLocale } from 'solyi-ui'

const locale = useSolLocale()
const english = computed(() => locale.value.code === 'en-US')
</script>
<template>
  <SCard :heading-level="2" :title="english ? 'Icons with and without text' : '아이콘과 설명'">
    <div class="sol-actions">
      <SIcon name="info" :label="english ? 'Information' : '정보'" />
      <span><SIcon name="calendar" decorative /> {{ english ? 'Calendar' : '달력' }}</span>
      <span><SIcon name="folder" decorative /> {{ english ? 'Folder' : '폴더' }}</span>
      <SIcon name="chevron" :rotate="270" :label="english ? 'Next direction' : '다음 방향'" />
    </div>
    <p class="sol-hint">
      {{
        english
          ? 'Decorative icons beside visible text are hidden from assistive technology. An icon alone needs a label.'
          : '옆에 설명이 있는 장식 아이콘은 중복 낭독하지 않습니다. 아이콘만 표시할 때는 label로 의미를 전달합니다.'
      }}
    </p>
  </SCard>
</template>

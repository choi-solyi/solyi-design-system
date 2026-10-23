<script setup lang="ts">
const drawer = ref(false),
  toast = ref(false),
  detail = ref(false)
const path = computed(() => [
  { id: 'home', label: '기록함' },
  { id: 'current', label: detail.value ? '기록 상세' : '기록 목록' },
])
</script>
<template>
  <SCard :heading-level="2" title="현재 위치와 짧은 상세">
    <SBreadcrumbs label="가상 경로" :items="path" @navigate="detail = false" />
    <div class="sol-actions">
      <SBtn @click="detail = true">가상 상세로 이동</SBtn>
      <SBtn @click="drawer = true">사이드 패널 열기</SBtn>
      <SBtn @click="toast = true">완료 안내</SBtn>
    </div>
    <SDialog
      id="recipe-drawer"
      v-model="drawer"
      presentation="drawer"
      eyebrow="FICTIONAL DETAIL"
      title="작은 정원 기록"
    >
      <p>Dialog와 같은 제목·초점·Escape·복귀 계약을 쓰는 모달 사이드 패널입니다.</p>
    </SDialog>
    <SSnackbar
      id="recipe-nav-toast"
      v-model="toast"
      tone="success"
      message="가상 설정을 적용했어요."
      :duration="4000"
    />
  </SCard>
</template>

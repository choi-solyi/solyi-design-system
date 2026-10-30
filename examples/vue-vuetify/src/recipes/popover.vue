<script setup lang="ts">
const open = ref(false),
  acknowledged = ref(false)
</script>
<template>
  <SCard :heading-level="2" title="클릭해 여는 대화형 추가 정보 · Popover">
    <p>버튼을 누르면 내용과 닫기·확인 동작이 있는 작은 창을 엽니다.</p>
    <SPopover
      id="recipe-owned-popover"
      v-model="open"
      label="추가 정보 펼치기"
      title="표시 순서 안내"
    >
      <template #activator="{ props }"
        ><SBtn v-bind="props">추가 정보 <SIcon name="chevron" decorative :size="16" /></SBtn
      ></template>
      <p>
        현재 화면의 항목은 최근 변경 순서로 표시합니다. 설명을 확인해도 자료는 변경되지 않습니다.
      </p>
      <template #actions
        ><SBtn variant="primary" @click="acknowledged = true; open = false"
          >안내 확인</SBtn
        ></template
      >
    </SPopover>
    <p role="status">
      {{ acknowledged ? '안내를 확인했습니다.' : '아직 안내를 확인하지 않았습니다.' }}
    </p>
    <p class="sol-hint">
      Tooltip과 달리 클릭으로 열고 안의 버튼을 조작합니다. Escape·바깥 클릭으로 닫습니다.
    </p>
  </SCard>
</template>

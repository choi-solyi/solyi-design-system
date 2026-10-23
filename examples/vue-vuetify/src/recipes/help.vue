<script setup lang="ts">
const open = ref(false)
</script>
<template>
  <SCard :heading-level="2" title="짧은 설명과 추가 정보">
    <p>짧은 설명에는 툴팁, 읽을 내용과 행동이 있는 추가 정보에는 팝오버를 사용합니다.</p>
    <div class="sol-actions">
      <STooltip id="recipe-tooltip" label="짧은 설명" text="가상 기록을 찾는 도구예요." />
      <SPopover id="recipe-popover" v-model="open" label="추가 정보" title="추가 정보">
        <p>읽을 내용과 닫기 행동이 있는 가상 정보입니다.</p>
      </SPopover>
    </div>
    <p class="sol-hint">
      포커스·포인터·터치로 열고 Escape로 닫습니다. 팝오버는 닫기 버튼과 초점 복귀를 제공합니다.
    </p>
  </SCard>
</template>

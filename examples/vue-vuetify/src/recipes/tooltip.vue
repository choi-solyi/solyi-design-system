<template>
  <SCard :heading-level="2" title="짧은 비대화형 설명 · Tooltip">
    <p>아이콘에 포인터를 올리거나 키보드로 초점을 두면 짧은 설명을 보여줍니다.</p>
    <STooltip id="recipe-owned-tooltip" label="정렬 도움말" text="최근 변경한 항목부터 표시합니다.">
      <template #activator="{ props }"
        ><SIconBtn v-bind="props" icon="info" label="정렬 도움말" variant="subtle"
      /></template>
    </STooltip>
    <p class="sol-hint">설명 안에는 링크나 입력을 넣지 않습니다. Escape로 닫을 수 있습니다.</p>
  </SCard>
</template>

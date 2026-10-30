<script setup lang="ts">
import { useSolLocale } from 'solyi-ui'

const locale = useSolLocale()
const selected = ref(false),
  removed = ref(false)
const english = computed(() => locale.value.code === 'en-US')
</script>
<template>
  <SCard :heading-level="2" :title="english ? 'Chip labels and selection' : '칩 표시·선택·제거'">
    <div class="sol-actions">
      <SChip :label="english ? 'Display label' : '표시용 라벨'" />
      <SChip
        v-model:selected="selected"
        selectable
        :label="english ? 'Select review' : '검토 선택'"
        tone="info"
      />
      <SChip
        v-if="!removed"
        removable
        :label="english ? 'Remove this label' : '이 라벨 제거'"
        @remove="removed = true"
      />
      <SChip disabled selectable :label="english ? 'Disabled selection' : '비활성 선택'" />
    </div>
    <p role="status">
      {{ english ? 'Review selected: ' : '검토 선택: '
      }}{{ selected ? (english ? 'yes' : '선택됨') : english ? 'no' : '선택 안 됨' }} ·
      {{
        removed
          ? english
            ? 'Label removed'
            : '라벨 제거됨'
          : english
            ? 'Label retained'
            : '라벨 유지'
      }}
    </p>
  </SCard>
</template>

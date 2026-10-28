<script setup lang="ts">
import { resolveCategoricalColor } from 'solyi-ui'
import type { ToastTone } from 'solyi-ui'

const open = ref(false),
  selected = ref<ToastTone>('info'),
  message = ref('')
const categoryKey = ref('example-a'),
  category = computed(() => resolveCategoricalColor(categoryKey.value))
const categoryStyle = (index: number) => ({
  '--sol-tag-fg': `var(--sol-color-categorical-${index}-foreground)`,
  '--sol-tag-bg': `var(--sol-color-categorical-${index}-background)`,
  borderColor: `var(--sol-color-categorical-${index}-border)`,
})
const tones: { tone: ToastTone; label: string; icon: string; note: string }[] = [
  {
    tone: 'accent',
    label: 'Accent',
    icon: '✦',
    note: '핵심 행동과 현재 선택을 절제해서 강조합니다.',
  },
  {
    tone: 'info',
    label: 'Information',
    icon: 'ⓘ',
    note: '설명과 중립적인 진행 안내입니다.',
  },
  {
    tone: 'success',
    label: 'Success',
    icon: '✓',
    note: '확인된 성공과 완료 결과를 안내합니다.',
  },
  {
    tone: 'warning',
    label: 'Warning',
    icon: '!',
    note: '진행 전 검토가 필요한 내용을 안내합니다.',
  },
  {
    tone: 'danger',
    label: 'Error',
    icon: '!',
    note: '중요한 오류는 이 화면에도 남기고 다음 행동을 안내합니다.',
  },
]
function show(tone: ToastTone, label: string) {
  selected.value = tone
  message.value = label + ' · 가상 컬러 예시'
  open.value = true
}
</script>
<template>
  <div class="sol-stack">
    <SCard title="서로 다른 범주 8색" :heading-level="2">
      <p>성공·오류와 별도인 분류 색입니다. 색과 함께 항상 이름을 표시합니다.</p>
      <div class="sol-actions">
        <SBadge
          v-for="index in 8"
          :key="index"
          :content="`범주 ${index}`"
          :style="categoryStyle(index)"
        />
      </div>
      <STextField id="recipe-category-key" v-model="categoryKey" label="안정적인 분류 key" />
      <p role="status">{{ category.category }} · 테마와 명암을 바꿔도 분류 ID는 유지합니다.</p>
    </SCard>
    <SCard
      v-for="item in tones"
      :key="item.tone"
      :title="item.label"
      :heading-level="2"
      class="sol-tone"
      :data-tone="item.tone"
    >
      <span class="sol-status sol-tone-badge">{{ item.icon }} {{ item.label }}</span>
      <div class="sol-actions">
        <SBtn variant="primary" :tone="item.tone" @click="show(item.tone, item.label)"
          >다음 단계</SBtn
        >
        <SBtn variant="subtle" :tone="item.tone" @click="show(item.tone, item.label)"
          >옅은 배경</SBtn
        >
        <SBtn :tone="item.tone" @click="show(item.tone, item.label)">외곽선</SBtn>
        <SBtn :tone="item.tone" disabled>비활성</SBtn>
      </div>
      <SAlert :tone="item.tone" :title="item.icon + ' ' + item.label + ' 안내'">
        <p>{{ item.note }}</p>
        <template #actions
          ><SBtn variant="inline" :tone="item.tone" @click="show(item.tone, item.label)"
            >스낵바 띄우기</SBtn
          ></template
        >
      </SAlert>
    </SCard>
    <SSnackbar
      id="recipe-tone-toast"
      v-model="open"
      :tone="selected"
      :message="message"
      :duration="selected === 'danger' ? 0 : 6000"
    />
  </div>
</template>

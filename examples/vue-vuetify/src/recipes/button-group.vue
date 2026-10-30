<script setup lang="ts">
const seed = 'Hello solyi',
  text = ref(seed),
  align = ref<string | null>('start'),
  orientation = ref<string | null>('horizontal')
const textControl = useTemplateRef<{ focus(): void }>('textControl')
function restore() {
  text.value = seed
  nextTick(() => textControl.value?.focus())
}
</script>
<template>
  <SCard :heading-level="2" title="연결된 명령 버튼과 선택 토글">
    <STextarea
      id="recipe-group-text"
      ref="textControl"
      v-model="text"
      label="메모리 안의 예제 문구"
    />
    <SSelect
      id="recipe-group-orientation"
      v-model="orientation"
      label="버튼 묶음 방향"
      :options="[
        { value: 'horizontal', label: '가로 · 공간이 부족하면 묶음만 스크롤' },
        { value: 'vertical', label: '세로' },
      ]"
    />
    <h3>각각 실행하는 명령 · SBtnGroup</h3>
    <SBtnGroup
      label="문구 바꾸기"
      :orientation="orientation === 'vertical' ? 'vertical' : 'horizontal'"
    >
      <SBtn :disabled="!text" @click="text = text.toUpperCase()">대문자로</SBtn>
      <SBtn :disabled="!text" @click="text = text.toLowerCase()">소문자로</SBtn>
      <SBtn :disabled="text === seed" @click="restore">원문 복원</SBtn>
    </SBtnGroup>
    <h3>하나를 선택해 유지하는 토글 · SSegmentedControl</h3>
    <SSegmentedControl
      id="recipe-group-align"
      v-model="align"
      label="미리보기 정렬"
      :options="[
        { value: 'start', label: '시작' },
        { value: 'center', label: '가운데' },
        { value: 'end', label: '끝' },
      ]"
    />
    <p
      :style="{ textAlign: align === 'center' ? 'center' : align === 'end' ? 'end' : 'start' }"
      role="status"
    >
      {{ text }}
    </p>
    <p class="sol-hint">
      명령 묶음의 각 버튼은 자연스러운 Tab 순서와 자체 disabled/loading 상태를 유지합니다. 단일
      선택은 기존 SegmentedControl의 방향키·라디오 의미를 재사용합니다.
    </p>
  </SCard>
</template>

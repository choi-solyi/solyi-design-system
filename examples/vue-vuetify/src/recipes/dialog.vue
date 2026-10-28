<script setup lang="ts">
const open = ref(false),
  longContent = ref(false),
  draft = ref('')
const presentation = ref<string | null>('dialog'),
  description = ref<string | null>('one')
</script>
<template>
  <SCard :heading-level="2" title="본문 스크롤과 고정 헤더">
    <SSelect
      id="recipe-dialog-presentation"
      v-model="presentation"
      label="표시 방식"
      :options="[
        { value: 'dialog', label: '다이얼로그' },
        { value: 'drawer', label: '옆 패널' },
      ]"
    />
    <SSelect
      id="recipe-dialog-description"
      v-model="description"
      label="설명 길이"
      :options="[
        { value: 'none', label: '설명 없음' },
        { value: 'one', label: '한 줄' },
        { value: 'multi', label: '여러 줄' },
      ]"
    />
    <SCheckbox id="recipe-dialog-long" v-model="longContent" label="긴 본문으로 스크롤 확인" />
    <SBtn id="recipe-dialog-open" @click="open = true">창 열기</SBtn>
    <SDialog
      id="recipe-dialog"
      v-model="open"
      :presentation="presentation === 'drawer' ? 'drawer' : 'dialog'"
      eyebrow="UI EXAMPLE"
      title="제목과 닫기는 자리를 유지합니다"
    >
      <p v-if="description !== 'none'">
        {{
          description === 'multi'
            ? '본문만 스크롤되며 제목과 닫기는 자리를 유지합니다. '.repeat(8)
            : '본문만 스크롤되며 제목과 닫기는 자리를 유지합니다.'
        }}
      </p>
      <p>Escape로 닫으면 열기 버튼으로 돌아갑니다.</p>
      <p v-for="line in longContent ? 30 : 0" :key="line">스크롤 확인용 내용 {{ line }}</p>
      <STextField id="recipe-dialog-last" v-model="draft" label="마지막 입력" />
      <template #actions><SBtn @click="open = false">닫기</SBtn></template>
    </SDialog>
  </SCard>
</template>

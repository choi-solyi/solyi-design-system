<script setup lang="ts">
const open = ref(false),
  longContent = ref(false),
  draft = ref('')
const presentation = ref<string | null>('dialog'),
  description = ref<string | null>('one')
const busyScope = ref<string | null>('body'),
  busy = ref(false),
  feedback = ref('')
let timer: ReturnType<typeof setTimeout>
function save() {
  if (busy.value) return
  busy.value = true
  feedback.value = '잠시 기다려 주세요.'
  timer = setTimeout(() => {
    busy.value = false
    feedback.value = '예제 처리를 마쳤어요.'
  }, 1200)
}
onBeforeUnmount(() => clearTimeout(timer))
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
    <SSelect
      id="recipe-dialog-busy-scope"
      v-model="busyScope"
      label="작업 중 잠금 범위"
      :options="[
        { value: 'body', label: '처리 중 본문 입력만 잠금 · 닫기 가능' },
        { value: 'all', label: '처리 중 창 전체 잠금 · 완료 후 닫기' },
      ]"
    />
    <p class="sol-hint">
      창을 연 뒤 ‘가상 처리’를 눌렀을 때만 잠금이 적용됩니다. 본문 잠금은 입력을 막고 닫기는
      허용합니다. 전체 잠금은 제목의 닫기·바깥 클릭·Escape도 처리 완료까지 막습니다. 약 1.2초 후
      자동 완료되며 실제 저장 작업은 없습니다.
    </p>
    <SBtn id="recipe-dialog-open" @click="open = true">창 열기</SBtn>
    <SDialog
      id="recipe-dialog"
      v-model="open"
      :presentation="presentation === 'drawer' ? 'drawer' : 'dialog'"
      eyebrow="UI EXAMPLE"
      title="제목과 닫기는 자리를 유지합니다"
      :busy="busy"
      :busy-scope="busyScope === 'all' ? 'all' : 'body'"
    >
      <p v-if="description !== 'none'">
        {{
          description === 'multi'
            ? '본문만 스크롤되며 제목과 닫기는 자리를 유지합니다. '.repeat(8)
            : '본문만 스크롤되며 제목과 닫기는 자리를 유지합니다.'
        }}
      </p>
      <p>
        {{
          busyScope === 'all'
            ? '전체 잠금 중에는 처리가 끝난 뒤 닫을 수 있습니다.'
            : 'Escape로 닫으면 열기 버튼으로 돌아갑니다.'
        }}
      </p>
      <p v-for="line in longContent ? 30 : 0" :key="line">스크롤 확인용 내용 {{ line }}</p>
      <STextField id="recipe-dialog-last" v-model="draft" label="마지막 입력" />
      <template #feedback
        ><p role="status">{{ feedback }}</p></template
      >
      <template #actions-start="{ busy: pending }"
        ><SBtn variant="subtle" :disabled="pending" @click="draft = ''">입력 초기화</SBtn></template
      >
      <template #actions="{ busy: pending }">
        <SBtn :disabled="pending && busyScope === 'all'" @click="open = false">닫기</SBtn>
        <SBtn id="recipe-dialog-save" variant="primary" :loading="pending" @click="save"
          >예제 처리</SBtn
        >
      </template>
    </SDialog>
  </SCard>
</template>

<script setup lang="ts">
const heading = useTemplateRef<HTMLElement>('heading');
const view = ref('list');
const selected = ref('작은 정원');
const name = ref('가상 사용자');
const result = ref('');

function move(next: string) {
  view.value = next;
  nextTick(() => heading.value?.focus());
}
</script>

<template>
  <SCard :heading-level="2" title="설정·목록·상세 화면틀">
    <template #actions>
      <nav class="sol-actions" aria-label="가상 화면">
        <SBtn @click="move('list')">목록</SBtn>
        <SBtn @click="move('detail')">상세</SBtn>
        <SBtn @click="move('settings')">설정</SBtn>
      </nav>
    </template>
    <SContainer fluid class="pa-0">
      <SRow>
        <SCol cols="12" md="4">
          <p>목록·상세·설정은 같은 여백과 반응형 열을 공유합니다.</p>
        </SCol>
        <SCol cols="12" md="8">
          <section>
            <h3 id="recipe-layout-title" ref="heading" tabindex="-1">
              {{ view === 'list' ? '목록' : view === 'detail' ? '상세' : '설정' }}
            </h3>
            <div v-if="view === 'list'" class="sol-actions">
              <SBtn
                v-for="row in ['작은 정원', '조용한 책장']"
                :key="row"
                @click="
                  selected = row;
                  move('detail');
                "
                >{{ row }}</SBtn
              >
            </div>
            <SCard v-else-if="view === 'detail'" :title="selected">
              <p>가상 기록의 짧은 상세입니다.</p>
              <template #actions><SBtn @click="move('list')">목록으로</SBtn></template>
            </SCard>
            <SForm v-else class="sol-stack" @submit.prevent="result = '✓ 가상 설정을 확인했어요.'">
              <STextField id="recipe-layout-name" v-model="name" label="사용자 이름" />
              <SBtn type="submit">설정 확인</SBtn>
            </SForm>
            <p role="status">{{ result }}</p>
          </section>
        </SCol>
      </SRow>
    </SContainer>
  </SCard>
</template>

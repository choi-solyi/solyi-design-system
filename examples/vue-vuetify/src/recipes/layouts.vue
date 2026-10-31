<script setup lang="ts">
const props = defineProps<{ part?: string }>()
const layoutDemo = ref<string | null>(props.part || 'composition')
const rowDense = ref(false),
  rowAlign = ref<string | null>('center'),
  split = ref<string | null>('8')
const colSize = computed(() => Number(split.value) || 8)
const heading = useTemplateRef<HTMLElement>('heading')
const view = ref('list')
const selected = ref('작은 정원')
const name = ref('가상 사용자')
const result = ref('')

function move(next: string) {
  view.value = next
  nextTick(() => heading.value?.focus())
}
</script>

<template>
  <SSelect
    id="recipe-layout-demo"
    v-model="layoutDemo"
    label="레이아웃 예제"
    :options="[{value:'container',label:'Container · 너비'},{value:'row',label:'Row · 간격과 정렬'},{value:'col',label:'Col · 반응형 비율'},{value:'composition',label:'화면틀 조합'}]"
  />
  <SCard v-if="layoutDemo === 'container'" :heading-level="2" title="Container · 제한 너비와 fluid">
    <p>같은 부모 안에서 콘텐츠 너비를 제한하거나 전체 너비로 펼칩니다.</p>
    <SContainer class="layout-demo-box" style="max-inline-size:28rem"
      ><strong>최대 28rem · 가운데 정렬</strong>
      <p>긴 줄의 길이를 제한합니다.</p></SContainer
    >
    <SContainer fluid class="layout-demo-box"
      ><strong>fluid · 부모 너비</strong>
      <p>대시보드처럼 넓은 영역을 활용합니다.</p></SContainer
    >
  </SCard>
  <SCard v-else-if="layoutDemo === 'row'" :heading-level="2" title="Row · 간격과 세로 정렬">
    <SCheckbox id="recipe-row-dense" v-model="rowDense" label="촘촘한 열 간격" />
    <SSelect
      id="recipe-row-align"
      v-model="rowAlign"
      label="세로 정렬"
      :options="[{value:'start',label:'위'},{value:'center',label:'가운데'},{value:'end',label:'아래'}]"
    />
    <SRow
      :dense="rowDense"
      :align="rowAlign === 'start' ? 'start' : rowAlign === 'end' ? 'end' : 'center'"
      class="layout-demo-row"
    >
      <SCol cols="4"><div class="layout-demo-box">짧은 열</div></SCol>
      <SCol cols="4"
        ><div class="layout-demo-box">두 줄의<br />내용</div></SCol
      >
      <SCol cols="4"
        ><div class="layout-demo-box">세 줄의<br />내용을<br />정렬합니다.</div></SCol
      >
    </SRow>
  </SCard>
  <SCard v-else-if="layoutDemo === 'col'" :heading-level="2" title="Col · 반응형 비율과 줄바꿈">
    <SSelect
      id="recipe-col-ratio"
      v-model="split"
      label="600px 이상 첫 번째 열 비율"
      :options="[{value:'8',label:'8 / 4'},{value:'6',label:'6 / 6'},{value:'4',label:'4 / 8'}]"
    />
    <p>좁은 화면에서는 각 열이 12칸을 사용해 한 줄씩 쌓입니다.</p>
    <SRow class="layout-demo-columns">
      <SCol cols="12" :sm="colSize"
        ><div class="layout-demo-box">첫 번째 · {{colSize}}/12</div></SCol
      >
      <SCol cols="12" :sm="12-colSize"
        ><div class="layout-demo-box">두 번째 · {{12-colSize}}/12</div></SCol
      >
      <SCol cols="12"><div class="layout-demo-box">다음 행 · 12/12</div></SCol>
    </SRow>
  </SCard>
  <SCard v-else :heading-level="2" title="설정·목록·상세 화면틀">
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
              <div class="sol-actions sol-actions--commit">
                <SBtn type="submit">설정 확인</SBtn>
              </div>
            </SForm>
            <p role="status">{{ result }}</p>
          </section>
        </SCol>
      </SRow>
    </SContainer>
  </SCard>
</template>

<style scoped>
.layout-demo-box {box-sizing:border-box;min-inline-size:0;padding:var(--sol-space-3);border:1px solid var(--sol-color-border);border-radius:var(--sol-radius-control);background:var(--sol-color-accent-soft);overflow-wrap:anywhere;}
.layout-demo-box+.layout-demo-box {margin-block-start:var(--sol-space-3);}
.layout-demo-row {min-block-size:calc(var(--sol-control-height) * 4);}
</style>

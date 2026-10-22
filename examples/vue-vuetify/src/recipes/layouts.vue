<script setup lang="ts">
import {ref,computed,nextTick,onMounted,onBeforeUnmount,watch} from 'vue';
import {SCard,SBtn,STextField} from '@solyi/vue-ui';
const view=ref('list'),selected=ref('작은 정원'),name=ref('가상 기록함'),result=ref('');function move(next:string){view.value=next;nextTick(()=>document.getElementById('recipe-layout-title')?.focus());}
</script>
<template>
<SCard :heading-level="2" title="설정·목록·상세 화면틀"><nav class="button-row" aria-label="가상 화면"><SBtn @click="move('list')">목록</SBtn><SBtn @click="move('detail')">상세</SBtn><SBtn @click="move('settings')">설정</SBtn></nav><section><h3 id="recipe-layout-title" tabindex="-1">{{view==='list'?'목록':view==='detail'?'상세':'설정'}}</h3><template v-if="view==='list'"><SBtn v-for="row in ['작은 정원','저녁 책장']" :key="row" @click="selected=row;move('detail')">{{row}}</SBtn></template><SCard v-else-if="view==='detail'" :title="selected"><p>가상 기록의 짧은 설명입니다.</p><SBtn @click="move('list')">목록으로</SBtn></SCard><form v-else class="sol-stack" @submit.prevent="result='✓ 가상 설정을 확인했어요.'"><STextField id="recipe-layout-name" v-model="name" label="기록함 이름"/><SBtn type="submit">설정 확인</SBtn></form><p role="status">{{result}}</p></section></SCard>
</template>

<script setup lang="ts">
import {ref,computed,nextTick,onMounted,onBeforeUnmount,watch} from 'vue';
import {SCard,STree,SDataTable} from '@solyi/vue-ui';
import type {STreeItem,TableColumn,TableRow} from '@solyi/vue-ui';const selected=ref<string|null>(null),expanded=ref(['records']);const items:STreeItem[]=[{id:'records',label:'기록',children:[{id:'garden',label:'작은 정원'},{id:'books',label:'저녁 책장'}]},{id:'archive',label:'보관',children:[{id:'walk',label:'주말 산책'}]}];const columns:TableColumn[]=[{key:'day',label:'요일',width:'120px'},{key:'count',label:'기록 수',align:'end'}];const rows:TableRow[]=[{id:'mon',day:'월요일',count:1},{id:'tue',day:'화요일',count:3},{id:'wed',day:'수요일',count:2},{id:'thu',day:'목요일',count:4}];
</script>
<template>
<SCard :heading-level="2" title="가상 자료의 차트와 계층"><svg viewBox="0 0 280 140" role="img" aria-labelledby="recipe-chart-title"><title id="recipe-chart-title">월1·화3·수2·목4개의 가상 기록</title><rect v-for="(row,i) in rows" :key="row.id" :x="20+i*65" :y="120-Number(row.count)*25" width="32" :height="Number(row.count)*25" fill="var(--sol-color-accent)"/></svg><SDataTable caption="차트와 같은 가상 자료" :columns="columns" :rows="rows"/><STree id="recipe-tree" v-model="selected" v-model:expanded="expanded" label="가상 기록 폴더" :items="items"/><p role="status">선택: {{selected||'없음'}}</p></SCard>
</template>

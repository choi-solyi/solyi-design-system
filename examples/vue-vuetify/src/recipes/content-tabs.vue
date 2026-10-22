<script setup lang="ts">
import {ref,computed,nextTick,onMounted,onBeforeUnmount,watch} from 'vue';
import {SCard,STabs,STextField} from '@solyi/vue-ui';
const tab=ref('summary'),memo=ref('');const items=[{value:'summary',label:'요약'},{value:'detail',label:'상세'},{value:'blocked',label:'비활성',disabled:true}];
</script>
<template>
<SCard :heading-level="2" title="같은 맥락의 탭"><STabs id="recipe-tabs" v-model="tab" label="기록 보기" :items="items"><template #panel-summary><p>방향키로 탭을 바꾸세요.</p></template><template #panel-detail><STextField id="recipe-tab-memo" v-model="memo" label="탭을 바꾸어도 유지되는 메모"/></template></STabs></SCard>
</template>

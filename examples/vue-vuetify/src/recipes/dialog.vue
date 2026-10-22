<script setup lang="ts">
import {ref,computed,nextTick,onMounted,onBeforeUnmount,watch} from 'vue';
import {SCard,SBtn,SDialog} from '@solyi/vue-ui';
const open=ref(false);
</script>
<template>
<SCard :heading-level="2" title="상세 대화상자"><SBtn id="recipe-dialog-open" @click="open=true">상세 열기</SBtn><SDialog id="recipe-dialog" v-model="open" eyebrow="FICTIONAL PROJECT" title="작은 정원 기록"><p>데이터와 계정에 연결하지 않는 상세 예제입니다.</p><p>Escape로 닫으면 실행 버튼으로 돌아갑니다.</p></SDialog></SCard>
</template>

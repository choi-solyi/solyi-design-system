<script setup lang="ts">
import {computed,ref} from 'vue';
import {SSelect} from '@solyi/vue-ui';
import {recipeComponents,recipeLabels} from './recipe-registry';
const initial=new URLSearchParams(location.search).get('example')||'buttons';
const selected=ref<string|null>(Object.hasOwn(recipeComponents,initial)?initial:'buttons');
const options=Object.keys(recipeComponents).map(value=>({value,label:recipeLabels[value as keyof typeof recipeLabels]}));
const current=computed(()=>recipeComponents[(selected.value||'buttons') as keyof typeof recipeComponents]);
</script>
<template><section class="starter-native-form"><header><h1>Vue 사용 예제</h1><p>문서의 코드와 같은 파일을 실제 설치한 패키지로 실행합니다. 모든 자료는 가상이며 외부로 전송하지 않습니다.</p></header><SSelect id="recipe-select" v-model="selected" label="사용 예제" :options="options" required/><component :is="current" :key="selected||'buttons'"/></section></template>

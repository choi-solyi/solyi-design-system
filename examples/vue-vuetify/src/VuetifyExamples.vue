<script setup>
import {ref} from 'vue';
import {VBtn} from 'vuetify/components/VBtn';
import {VTextField} from 'vuetify/components/VTextField';
import {VCard} from 'vuetify/components/VCard';
import {VCardText} from 'vuetify/components/VCard';
import {VDialog} from 'vuetify/components/VDialog';
import {SBtn,STextField} from '@solyi/vue-ui';
const sText=ref('S 가상 입력'),vText=ref('V 가상 입력'),open=ref(false),count=ref(0);
</script>
<template>
<section class="starter-card starter-native-form" id="s-v-theme" aria-labelledby="s-v-title">
 <h2 id="s-v-title">S API와 직접 V API · 같은 디자인 연결</h2>
 <p>위 테마·모드를 바꾸면 두 구현이 같은 역할 색을 사용합니다. SBtn의 variant는 역할 이름이며 VBtn의 variant/color API와 다릅니다. V 컴포넌트도 직접 import할 수 있습니다.</p>
 <div class="starter-actions"><SBtn id="s-theme-button" variant="primary" @click="count++">SBtn 저장</SBtn><VBtn id="v-theme-button" color="primary" variant="flat" @click="count++">VBtn 저장</VBtn><VBtn id="v-theme-open">VDialog 열기</VBtn><VBtn disabled>VBtn 비활성</VBtn></div>
 <div class="starter-control-grid"><STextField id="s-theme-field" v-model="sText" label="STextField" /><VTextField id="v-theme-field" v-model="vText" label="VTextField" /></div>
 <VCard variant="outlined"><VCardText>VCard도 카드12px·공통 폰트/테마를 사용합니다. 가상 동작 {{count}}회.</VCardText></VCard>
 <VDialog v-model="open" activator="#v-theme-open" max-width="400" aria-labelledby="v-theme-dialog-title"><VCard><VCardText><h3 id="v-theme-dialog-title">직접 사용한 VDialog</h3><p>Vuetify 원본 API입니다. 큰 팝업은16px입니다.</p><VBtn @click="open=false">닫기</VBtn></VCardText></VCard></VDialog>
</section>
</template>

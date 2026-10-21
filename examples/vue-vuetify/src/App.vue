<script setup>
import {ref,watch,nextTick} from 'vue';
import {useTheme} from 'vuetify';
const theme=useTheme(),selected=ref('violet'),mode=ref(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
const title=ref(''),error=ref(''),result=ref(''),dialog=ref(false);
watch([selected,mode],([name,appearance])=>{document.documentElement.dataset.theme=name;document.documentElement.dataset.mode=appearance;theme.change(`${name}-${appearance}`);},{immediate:true});
watch(dialog,async open=>{if(open){await nextTick();document.querySelector('#starter-close')?.focus();}});
function save(){if(!title.value.trim()||title.value.trim().length>30){error.value='제목을 1~30자로 입력해 주세요.';result.value='';document.querySelector('#starter-title')?.focus();return;}error.value='';result.value=`✓ “${title.value.trim()}” 가상 기록을 확인했어요. 서버에 전송하지 않습니다.`;}
</script>
<template>
  <v-app><main class="starter-main">
    <a class="starter-link" href="https://choi-solyi.github.io/solyi-design-system/#theme/starter">← 디자인 시스템 문서</a>
    <header><p class="starter-eyebrow">INDEPENDENT ADAPTER · v0.2.0</p><h1>같은 토큰, Vue의 부품.</h1><p>Button · Field · Dialog만 연결한 독립 starter입니다. 기존 앱에는 적용하지 않았습니다.</p></header>
    <div class="starter-settings"><label>테마<select id="starter-theme" v-model="selected"><option value="violet">Cool violet</option><option value="sage">Quiet sage</option><option value="sand">Warm sand</option></select></label><label>화면 모드<select id="starter-mode" v-model="mode"><option value="light">Light</option><option value="dark">Dark</option></select></label></div>
    <section class="starter-card" aria-labelledby="starter-form-title"><h2 id="starter-form-title">가상 기록</h2><form @submit.prevent="save" novalidate><label for="starter-title" id="starter-title-label" class="starter-label">기록 제목</label><v-text-field id="starter-title" v-model="title" class="starter-field" maxlength="30" :error="Boolean(error)" hide-details :aria-invalid="Boolean(error)" aria-describedby="starter-title-help starter-error" autocomplete="off"/><p id="starter-title-help" class="starter-hint">필수, 1~30자. 입력값은 메모리에만 남습니다.</p><p id="starter-error" role="alert" class="starter-error" v-show="error">{{error}}</p><div class="starter-actions"><v-btn type="submit" color="primary" variant="flat" id="starter-save">가상 기록 확인</v-btn><v-dialog v-model="dialog" :transition="false" max-width="480" aria-labelledby="starter-dialog-title" aria-describedby="starter-dialog-description"><template #activator="{props}"><v-btn v-bind="props" variant="outlined" id="starter-open">상세 열기</v-btn></template><section class="starter-card starter-dialog" @keydown.esc.stop.prevent="dialog=false"><h2 id="starter-dialog-title">가상 기록 상세</h2><p id="starter-dialog-description">{{title.trim()||'아직 제목을 입력하지 않았어요.'}} · 외부 데이터 없는 예시입니다.</p><p class="starter-hint">Escape로 닫기 · 닫은 뒤 실행 버튼으로 포커스 복귀</p><v-btn @click="dialog=false" variant="outlined" id="starter-close" autofocus>상세 닫기</v-btn></section></v-dialog></div><p id="starter-result" role="status" class="starter-result">{{result}}</p></form></section>
    <section class="starter-card"><h2>매핑의 범위</h2><dl><div><dt>Button</dt><dd>accent/on-accent · desktop 36px, 좁은 화면·터치 44px</dd></div><div><dt>Field</dt><dd>surface/control-border/focus/danger · 40/44px</dd></div><div><dt>Dialog</dt><dd>surface/text/radius/space/backdrop · Vuetify overlay와 초점 처리</dd></div></dl><p class="starter-hint">Vue 3.5.44 · Vuetify 4.3.0 · Vite 8.3.4. 이 조합의 예시이며 모든 버전·모든 앱 호환을 의미하지 않습니다.</p><a class="starter-link" href="./THIRD-PARTY-NOTICES.txt">패키지 라이선스 고지</a></section>
  </main></v-app>
</template>

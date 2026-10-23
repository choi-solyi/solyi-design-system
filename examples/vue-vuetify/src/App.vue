<script setup>
import {useTheme} from 'vuetify';
import {tokens as coreTokens,coreVersion} from '@solyi/core';
import { uiVersion, applySolyiAppearance } from '@solyi/vue-ui';
import ProgressExamples from './ProgressExamples.vue';
import RecipeExamples from './RecipeExamples.vue';
import VuetifyExamples from './VuetifyExamples.vue';
import LocaleExamples from './LocaleExamples.vue';
import ExtendedExamples from './ExtendedExamples.vue';
import AdvancedExamples from './AdvancedExamples.vue';
import {recipeComponents,recipeLabels} from './recipe-registry';
const embed=new URLSearchParams(window.location.search).get('view')==='progress';
const recipeEmbed=new URLSearchParams(window.location.search).get('view')==='recipes';
const params=new URLSearchParams(window.location.search),embeddedRecipe=recipeEmbed&&params.get('embed')==='1',recipeId=Object.hasOwn(recipeComponents,params.get('example'))?params.get('example'):'buttons',recipePart=params.get('part')||undefined;
const recipeInstance=ref(null);
defineExpose({confirmRecipeLeave:()=>recipeInstance.value?.confirmLeave?.()??Promise.resolve(true)});
const theme=useTheme(),selected=ref(Object.hasOwn(coreTokens.themes,params.get('theme'))?params.get('theme'):'violet'),mode=ref(['light','dark'].includes(params.get('mode'))?params.get('mode'):matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
const title=ref(''),error=ref(''),result=ref(''),dialog=ref(false),saving=ref(false);let saveTimer;
onBeforeUnmount(()=>clearTimeout(saveTimer));
watch([selected,mode],([name,appearance])=>{applySolyiAppearance(theme,{theme:name,mode:appearance,density:params.get('density')==='compact'?'compact':'comfortable'});},{immediate:true});
function save(){if(saving.value)return;const submittedTitle=title.value.trim();if(!submittedTitle||submittedTitle.length>30){error.value='제목을 1~30자로 입력해 주세요.';result.value='';document.querySelector('#starter-title')?.focus();return;}error.value='';result.value='';saving.value=true;saveTimer=setTimeout(()=>{saving.value=false;result.value=`✓ “${submittedTitle}” 가상 기록을 확인했어요. 서버에 전송하지 않습니다.`;},450);}
const columns=[{key:'name',label:'이름',sortable:true},{key:'status',label:'상태',width:'96px'},{key:'date',label:'변경일',width:'128px',sortable:true}];
const records=[{id:'r1',name:'작은 정원에서 관찰한 계절과 다시 읽고 싶은 아주 긴 가상 기록 제목',status:'진행 중',date:'2026-10-21'},{id:'r2',name:'저녁 책장',status:'초안',date:'2026-10-20'},{id:'r3',name:'주말 산책',status:'완료',date:'2026-10-19'},{id:'r4',name:'계절 관찰',status:'진행 중',date:'2026-10-18'},{id:'r5',name:'가상 노트',status:'초안',date:'2026-10-17'},{id:'r6',name:'작은 목표',status:'완료',date:'2026-10-16'}];
const query=ref(''),sort=ref({key:'date',direction:'descending'}),page=ref(1),selection=ref([]),dataState=ref('ready');
const filtered=computed(()=>records.filter(r=>r.name.includes(query.value.trim())).sort((a,b)=>String(a[sort.value.key]).localeCompare(String(b[sort.value.key]),'ko')*(sort.value.direction==='ascending'?1:-1)));
const pages=computed(()=>Math.max(1,Math.ceil(filtered.value.length/3))),rows=computed(()=>filtered.value.slice((page.value-1)*3,page.value*3));
watch([query,sort],()=>page.value=1);watch(pages,value=>page.value=Math.min(page.value,value));
</script>
<template>
  <VApp><main class="starter-main"><ProgressExamples v-if="embed" /><template v-else-if="recipeEmbed"><template v-if="embeddedRecipe"><h1 class="sol-ui-sr-only">{{recipeLabels[recipeId]}}</h1><component ref="recipeInstance" :is="recipeComponents[recipeId]" v-bind="recipePart ? {part:recipePart} : {}" /></template><template v-else><div class="starter-settings"><label>테마<select v-model="selected"><option value="violet">Cool violet</option><option value="sage">Quiet sage</option><option value="sand">Warm sand</option></select></label><label>화면 모드<select v-model="mode"><option value="light">Light</option><option value="dark">Dark</option></select></label></div><RecipeExamples/></template></template><template v-else>
    <a class="starter-link" href="https://choi-solyi.github.io/solyi-design-system/#theme/starter">← 디자인 시스템 문서</a>
    <header><p class="starter-eyebrow">INSTALLED TARBALLS · Core {{coreVersion}} / Vue UI {{uiVersion}}</p><h1>같은 토큰, Vue의 부품.</h1><p>프로젝트에 바로 가져다 쓰는 컴포넌트와 사용 예제입니다. 문서의 실행 예제도 같은 패키지와 정본 Vue 파일을 사용합니다. 기존 앱에는 적용하지 않았습니다.</p><pre class="starter-code-sample" tabindex="0" aria-label="한영 주석 코드 글꼴 예시"><code>// English comment: fictional local data.
// 한글 주석: 외부 전송 없는 가상 자료입니다.
const label = "가상 기록";
const valid = count &gt;= 0 &amp;&amp; count !== null;</code></pre></header>
    <nav class="starter-example-nav" aria-label="패키지 예제"><a href="#starter-form-title">기본 입력·Dialog</a><a href="#starter-table-title">Table</a><a href="#extended-title">입력과 선택</a><a href="#extended-tabs-title">Tabs</a><a href="#extended-toast-title">Toast</a><a href="#extended-pickers-title">날짜·시각</a><a href="#advanced-title">선택·범위·동작·분할</a><a href="#s-v-theme">S / V 테마</a><a href="#s-progress-title">Progress</a></nav><div class="starter-settings"><label>테마<select id="starter-theme" v-model="selected"><option value="violet">Cool violet</option><option value="sage">Quiet sage</option><option value="sand">Warm sand</option></select></label><label>화면 모드<select id="starter-mode" v-model="mode"><option value="light">Light</option><option value="dark">Dark</option></select></label></div>
    <section class="starter-card" aria-labelledby="starter-form-title"><h2 id="starter-form-title">가상 기록</h2><form @submit.prevent="save" novalidate><STextField id="starter-title" v-model="title" label="기록 제목" required maxlength="30" :error="error" help="필수, 1~30자. 입력값은 메모리에만 남습니다." autocomplete="off"/><div class="starter-actions"><SBtn type="submit" variant="primary" id="starter-save" :loading="saving">{{saving?'확인 중':'가상 기록 확인'}}</SBtn><SBtn id="starter-open" @click="dialog=true">상세 열기</SBtn><SBtn id="starter-disabled" disabled>비활성 예시</SBtn><SDialog id="starter-dialog" v-model="dialog" title="가상 기록 상세" close-label="상세 닫기"><p>{{title.trim()||'아직 제목을 입력하지 않았어요.'}} · 외부 데이터 없는 예시입니다.</p><p class="starter-hint">Escape로 닫기 · 실행 버튼으로 초점 복귀</p></SDialog></div><p id="starter-result" role="status" class="starter-result">{{result}}</p></form></section>
    <section class="starter-card"><h2 id="starter-table-title">실제 패키지 Table</h2><p class="starter-hint">검색·정렬·페이지는 소비 앱이 관리합니다. 선택은 ID로 유지합니다.</p><div class="starter-settings"><STextField id="starter-query" v-model="query" label="자료 검색" type="search"/><label>가상 상태<select id="starter-data-state" v-model="dataState"><option value="ready">정상</option><option value="loading">로딩</option><option value="error">오류</option></select></label></div><SDataTable caption="패키지 가상 자료" :columns="columns" :rows="rows" v-model:selected="selection" selectable v-model:sort="sort" v-model:page="page" :page-count="pages" :loading="dataState==='loading'" :error="dataState==='error'?'가상 오류입니다. 선택과 검색은 남습니다.':''" @retry="dataState='ready'"/><SBtn variant="inline" :disabled="!selection.length" @click="selection=[]">선택 해제</SBtn></section><section class="starter-card"><h2>매핑의 범위</h2><dl><div><dt>Button</dt><dd>accent/on-accent · radius-button 6px · desktop 36px, 좁은 화면·터치 44px</dd></div><div><dt>Field</dt><dd>surface/control-border/focus/danger · radius-control 10px · 40/44px</dd></div><div><dt>Dialog</dt><dd>surface/text/space/backdrop · radius-panel 16px · Vuetify overlay와 초점 처리</dd></div></dl><p class="starter-hint">Vue 3.5.44 · Vuetify 4.3.0 · Vite 8.3.4. 이 조합의 예시이며 모든 버전·모든 앱 호환을 의미하지 않습니다. 패키지는 private이며 레지스트리에 게시하지 않았습니다.</p><a class="starter-link" href="./THIRD-PARTY-NOTICES.txt">패키지 라이선스 고지</a></section>
    <VuetifyExamples />
    <ProgressExamples />
    <LocaleExamples />
    <ExtendedExamples/>
    <AdvancedExamples/>
  </template></main></VApp>
</template>

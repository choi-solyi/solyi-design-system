# 공통 Vue 부품과 전역 등록

0.x 검토 초안입니다. 실제 패키지명은 아직 `@solyi/core` / `solyi-ui`이며 npm에는 게시하지 않았습니다. Vue 3.5.44 / Vuetify 4.3.0 조합을 사용합니다.

## 앱에서 한 번 설정

```ts
import {createApp} from 'vue';
import {VApp} from 'vuetify/components/VApp';
import SolyiUI, {createSolyiVuetify} from 'solyi-ui';
import 'vuetify/styles';
import '@solyi/core/tokens.css';
import '@solyi/core/components.css';
import '@solyi/core/fonts.css';
import '@solyi/core/code-fonts.css';
import 'solyi-ui/styles.css';
import 'solyi-ui/global';
import App from './App.vue';

createApp(App)
  .use(createSolyiVuetify({components: {VApp}}))
  .use(SolyiUI)
  .mount('#app');
```

`SBtn` 등을 각 SFC에서 import하지 않습니다. 이 저장소의 실행 예제는 `unplugin-auto-import` Vue preset을 함께 설정하므로 `ref`, `computed`, `nextTick` 같은 Vue 함수를 반복 import하지 않습니다. 다른 앱에서 이 빌드 설정을 사용하지 않으면 Vue 함수 import를 유지합니다. `DateValue` 같은 TypeScript 타입 import는 필요한 곳에 남깁니다. 정확한 전제는 [처음 시작하기](GETTING-STARTED.md)를 따릅니다. Vue/Vuetify는 앱에 한 벌만 설치하며 Vuetify 플러그인을 두 번 설치하지 않습니다. 전역 등록 대신 개별 컴포넌트 export를 가져오는 방식도 계속 지원합니다.

Volar/vue-tsc에는 `tsconfig`의 `compilerOptions.types`에 `solyi-ui/global`을 추가하거나 포함되는 `env.d.ts`에 다음을 적습니다. 실제 등록은 위 `app.use(SolyiUI)`이며 타입 설정만으로 런타임 컴포넌트가 등록되지는 않습니다.

```ts
/// <reference types="solyi-ui/global" />
```

```vue
<script setup lang="ts">
const name = ref('');
</script>

<template>
  <SCard title="가상 기록">
    <STextField id="record-name" v-model="name" label="이름" />
    <SBtn variant="primary">확인</SBtn>
  </SCard>
</template>
```

## 전용 API

| 컴포넌트 | 값·주요 설정 | 슬롯·이벤트 | 동작 계약 |
|---|---|---|---|
| `STooltip` | 필수 `id/label/text`, 선택 `v-model:boolean`, disabled/readonly | `activator({props})`, update:modelValue/open/close(reason) | 짧은 비대화형 설명. hover/focus/클릭으로 열고 Escape·바깥 클릭으로 닫습니다. hover 영역 간 짧은 이동을 허용하며 초점을 옮기지 않습니다. |
| `SPopover` | 필수 `id/label/title`, 선택 v-model, disabled/readonly | activator({props}), default/actions, update:modelValue/open/close(reason) | 닫기 버튼으로 진입합니다. Tab을 가두지 않고 외부 초점은 존중합니다. Escape/닫기로 실행 위치에 복귀합니다. |
| `SAccordion` | 필수 id/label, 선택 v-model, disabled/readonly | default, update:modelValue/change | native details/summary. 지정한 모델은 앱이 갱신하며, 생략하면 내부 상태를 사용합니다. 접힌 자식은 브라우저 Tab 순서에서 제외됩니다. |
| `SBreadcrumbs` | items:`SBreadcrumbItem[]`, current?:id, label? | navigate(item,event) | 마지막 항목 또는 current가 현재 위치입니다. href는 실제 링크이고 href가 없는 상위 항목은 행동 버튼입니다. 현재/disabled 항목은 실행하지 않습니다. 앱 라우터에 연결할 때 event.preventDefault()를 앱이 결정합니다. |
| `SFileInput` | 필수 id/label, v-model:`File[]`, accept, maxFiles(3), maxFileSize(2MiB), drop(true), disabled/readonly/required/help/error | update:modelValue/change, reject:`SFileRejection[]`, remove(file), invalid(message), label/help 슬롯 | 선택·드롭·중복/형식/크기/개수 검사·개별/전체 제거·같은 파일 재선택. 파일 내용 읽기·서버 전송·자동 저장은 없습니다. |
| `SAutocomplete` | 필수 id/label, v-model:`string|null`, options:`SolOption[]`, loadOptions?, debounce(150), disabled/readonly/required/help/error | update:modelValue/change/search/open/close/invalid, label/help 슬롯 | 입력은 검색어이고 선택된 option.value만 모델로 내보냅니다. 단일 선택·IME·늦은 응답 무시·AbortSignal·로딩/빈 결과/오류/재시도를 제공합니다. |
| `SAvatar` | 필수 label, src?, initials?, size:24/32/40/48 | default, error(event) | 표시 전용. 이미지 실패 시 이니셜로 전환하며 label을 접근성 이름으로 유지합니다. 실제 사용자 식별에는 옆 이름도 제공하세요. |
| `SStepper` | 필수 id/items, modelValue:`string|null`, completed:`string[]`, interactive(false), disabled/readonly | update:modelValue/change | 단계 표시와 시간 진행률은 다릅니다. 기본은 읽기용 목록. interactive에서만 버튼을 만들며 검증·이동 허용은 앱이 관리합니다. |
| `SBarChart` | 필수 id/label/items, max?, loading, showTable(true), categoryLabel/valueLabel | 표시 전용 | 작은 단일 계열 막대 비교입니다. 0 이상 유한 값만 표시하며 전체 텍스트 표는 항상 유지합니다. showTable=false는 시각적으로만 숨깁니다. 복잡한 분석·다중 계열·시간축을 지원한다고 주장하지 않습니다. |

모든 새 부품의 문구는 기존 ko/en provider와 컴포넌트별 `locale` override를 따릅니다. 입력 label·데이터 이름·설명은 앱이 제공합니다. RTL 및 다른 언어의 완전 지원은 검증하지 않았습니다.

### 상태와 초점

- Tooltip/Popover의 `activator`를 바꾸면 전달한 `props`를 실제 `SBtn`에 `v-bind`합니다. 설명 안에 링크가 필요하면 Tooltip 대신 Popover를 사용합니다.
- 떠 있는 면은 지원 브라우저에서 native popover top layer를 사용하고 지원하지 않으면 위치를 제한한 DOM 면으로 표시합니다. document 전체의 임의 ID에 의존하지 않습니다. 작은 화면에서 위치를 보정하고 내부 내용을 스크롤할 수 있습니다.
- Autocomplete: ↑/↓ 선택 탐색, 활성 옵션을 탐색할 때만 Home/End 처리, Enter 선택, Escape 취소. 닫힌 입력의 Home/End와 한국어 조합 중 Enter를 빼앗지 않습니다. 오류의 Tab 이동은 재시도 버튼을 유지하며 재시도 후 입력 초점을 보존합니다.
- FileInput handle: `focus() / clear() / validate()`. Autocomplete handle: `focus() / clear() / validate() / retry()`. 앱의 제출 처리에서 validate를 호출하고 서버 검증·저장은 별도로 연결합니다.
- `validateSFiles`와 `describeSFile`은 메타데이터 처리 유틸리티입니다. 알려진 MIME의 이름과 실제 확장자를 구분하며 모르는 형식을 다른 형식으로 추측하지 않습니다. accept/크기 검사는 보안 검사나 파일 내용 검증이 아닙니다.
- `SBtn`의 선택 `tone`은 accent/info/success/warning/danger입니다. primary는 채움, subtle은 옅은 면, secondary는 외곽선, inline은 보조 동작입니다. tone 생략 시 기존 버튼 모습은 그대로입니다. 의미는 문구·아이콘과 함께 전달하고 색에만 의존하지 않습니다.

## 조합과 문서 실행

`src/recipes/*.vue` 30개 정본 SFC가 문서 표시·복사·실행 화면을 함께 만듭니다. 전역 등록은 실제 starter에서도 사용합니다. 문서 실행 면은 같은 origin의 패키지 소비 프레임이며 테마·밀도·모션 정책을 동기화합니다. 긴 대화상자나 독립 화면은 코드 footer의 `이 Vue 예제 실행`으로 크게 볼 수 있습니다.

폼/검색/비교/편집/일괄 재시도/화면틀은 이 부품에 앱 상태를 연결한 **조합 예제**입니다. 모든 업무 흐름을 독립 컴포넌트 API로 제공한다는 뜻이 아닙니다. workflow 예제의 `confirmLeave()` 노출 메서드는 앱 라우터가 호출하는 연결 예시이며 라우터 전체가 자동 설치되는 기능이 아닙니다. 문서의 상위 경로 이탈은 해당 실행 면의 확인 응답을 기다립니다.

## 라이선스와 게시 경계

재사용 패키지의 자체 코드·CSS·토큰·패키지 문서는 MIT입니다. 각 패키지의 LICENSE를 함께 배포합니다. 브랜드 로고·캐릭터·favicon·개인 콘텐츠는 패키지에서 제외하며 MIT가 이 자산의 사용권을 부여하지 않습니다. 포함 폰트는 원래 OFL·저작권·출처를 보존합니다.

`private:true`는 실제 npm 게시를 막기 위해 유지합니다. 이름 `sol-ui`에는 삭제 이력이 있어 사용 가능이나 소유권 확보로 확정하지 않습니다. npm 게시·새 인증 설정·1.0.0·과거 버전 삭제는 이번 작업에 포함하지 않습니다.

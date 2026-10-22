# S PascalCase APIs · local first phase

`@solyi/vue-ui`의 기본 사용 이름은 `SBtn`, `STextField`, `SDialog`, `SDataTable` 등 S 접두사 PascalCase입니다. 기존 `Sol*` export와 plugin 등록 이름은 같은 컴포넌트 객체를 가리키는 호환 별칭으로 유지합니다. 제거 예정은 없으며 기존 상태·이벤트·refs를 다시 감싸지 않습니다.

```vue
<script setup>
import {SBtn, STextField} from '@solyi/vue-ui';
import {VBtn} from 'vuetify/components/VBtn';
</script>
<template>
  <SBtn variant="primary">저장</SBtn>
  <VBtn color="primary" variant="flat">Vuetify 원본</VBtn>
</template>
```

S 이름은 Vuetify와 완전히 동일한 API라는 뜻이 아닙니다. `SBtn`은 primary/secondary/subtle/inline 역할 변형, `SDataTable`은 columns/rows와 소비 앱 소유 정렬·필터·페이지, `SSelect`는 문자열 options를 사용합니다. `SSnackbar`는 기존 controlled Toast 계약입니다. Vuetify의 color/items/slots가 필요하면 해당 `V*`를 직접 사용합니다. 별도 등록을 막거나 V 컴포넌트 이름을 덮어쓰지 않습니다.

## 공통 테마와 기본 스타일

```ts
import {createApp} from 'vue';
import {VApp} from 'vuetify/components/VApp';
import SolyiUI, {createSolyiVuetify, applySolyiAppearance} from '@solyi/vue-ui';
import 'vuetify/styles';
import '@solyi/core/fonts.css';
import '@solyi/core/tokens.css';
import '@solyi/core/components.css';
import '@solyi/vue-ui/styles.css';
const vuetify = createSolyiVuetify({components:{VApp}});
applySolyiAppearance(vuetify.theme,{theme:'violet',mode:'light',density:'comfortable'});
createApp(App).use(vuetify).use(SolyiUI).mount('#app');
```

공식 설치된 Vue3.5.44/Vuetify4.3.0 API를 사용합니다. factory는 Core 토큰에서6개 테마와 기본 VApp/VBtn/VTextField/VSelect/VTextarea/VCard/VDialog 클래스를 만듭니다. `applySolyiAppearance`는 같은 앱 상태를 Core의 data-theme/mode/density와 Vuetify에 반영합니다. 저장은 소비 앱 소유이며 DOM 없는 SSR에서는 defaultTheme/서버 HTML 속성을 설정한 뒤 클라이언트에서 연결합니다. 지원하지 않는 값은 false로 거절합니다.

라이트·다크 색과 Wanted Sans, 버튼6/필드10/카드12/다이얼로그16 토큰을 공유합니다. 원형 icon 버튼과 명시적인 Vuetify props/style은 유지합니다. 임의의 모든 Vuetify 컴포넌트를 S API로 변환하거나 동일한 레이아웃·키보드 동작을 보증하지 않습니다. app defaults/theme 추가 설정으로 확장할 수 있으며 해당 클래스의 교체는 기본 스타일 적용을 해제할 수 있습니다.

실행: `starter/`의 S/V 비교 예제. 전체 문서 전환 상태는 `REUSE-INVENTORY.md`, 단계 검증은 `S-API-PLAN.md`를 따릅니다. 이번 변경은 로컬이며 공개 push/레지스트리/다른 앱 적용은 보류합니다.

## 호환 이름 대응

| 이전 이름 (계속 지원) | 기본 사용 이름 |
|---|---|
| SolButton | SBtn |
| SolField | STextField |
| SolDialog | SDialog |
| SolTable | SDataTable |
| SolCheckbox | SCheckbox |
| SolRadioGroup | SRadioGroup |
| SolSwitch | SSwitch |
| SolSelect | SSelect |
| SolTextarea | STextarea |
| SolNumberInput | SNumberInput |
| SolTabs | STabs |
| SolToast | SSnackbar |
| SolDatePicker | SDatePicker |
| SolTimePicker | STimePicker |
| SolSegmentedControl | SSegmentedControl |
| SolMultiSelect | SMultiSelect |
| SolRangeSlider | SRangeSlider |
| SolSplitButton | SSplitBtn |
| SolContextMenu | SContextMenu |
| SolResizableSplitPane | SResizableSplitPane |

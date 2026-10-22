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

라이트·다크 색과 Wanted Sans, 버튼6/필드10/카드12/다이얼로그16 토큰을 공유합니다. 원형 icon 버튼과 직접 V 사용을 유지합니다. native variant/color를 사용할 수 있지만 브리지 클래스는 기본 높이·폰트를 토큰으로 고정합니다. native size/density가 동일한 치수로 표현된다는 계약은 없으며, 크기를 바꿀 때는 app defaults 클래스나 명시적 style을 함께 검토합니다. 임의의 모든 Vuetify 컴포넌트를 S API로 변환하거나 동일한 레이아웃·키보드 동작을 보증하지 않습니다. app defaults/theme 추가 설정으로 확장할 수 있으며 해당 클래스의 교체는 기본 스타일 적용을 해제할 수 있습니다.

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

## 진행 표시

SProgressLinear와 SProgressCircular는 같은 읽기 전용 표시 계약입니다. id/label은 필수, modelValue=0/min=0/max=100, state는 determinate/indeterminate/complete/error입니다. 실제 작업·저장·타이머를 실행하지 않습니다. 범위 밖 값은 표시만 clamp하고 complete는 max를 표시합니다. 잘못된 수치/경계는 값을 만들지 않고 안내합니다. unknown은 aria-valuenow와 퍼센트를 제거하고 error는 마지막 확인 값과 지속 문구를 보입니다. message는 앱 문구, announce는 기본 false이며 같은 작업의 한곳만 polite로 켭니다. Circular size는48–256(기본96), Linear는 너비100%입니다. 공통 ko/en locale을 따릅니다.

resolveSProgress는 같은 clamp/known/ratio를 계산하는 순수 helper입니다. 둘에 같은 모델을 전달해도 값을 emit하지 않습니다. 값 변경의 유한 transition만 있고 reduced-motion은 이를 제거합니다. unknown은 정적인 띠/호와 글자를 사용하며 무한 회전이나 가짜 처리 시간이 없습니다.

문서 #component/progress는 같은 출처의 starter?view=progress를 삽입해 실제 tarball을 import한 같은 SFC를 실행합니다. 부모 테마·모드·밀도는 origin/source를 확인한 메시지로 동기화하고 ResizeObserver로 높이를 맞춥니다. 키보드 탐색과 starter 직접 링크를 유지합니다. 나머지 HTML 예제는 전환표에 표시한 후속 범위입니다.

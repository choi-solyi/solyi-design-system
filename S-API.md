# Vue 컴포넌트 API

기본 예제는 앱에서 한 번 전역 등록한 뒤 S 태그를 사용합니다. [등록·타입·공통 API](DEDICATED-VUE-API.md)를 먼저 확인하세요. Vue 함수와 타입만 각 예제에서 import합니다.

## 표면·트리와 Vue 조합

예제 주변의 버튼 묶음은 Core의 `sol-actions`(8px 간격·줄바꿈), 경로 목록은 `sol-breadcrumbs`로 배치합니다. Vue 컴포넌트 CSS와 함께 Core components.css도 설치 절차대로 가져와야 합니다.

- `SCard`: `title`, `eyebrow`, `headingLevel:2|3|4`(기본3), 기본/actions 슬롯. 카드의 제목과 본문을 공통 간격으로 묶습니다.
- `SAlert`: `tone:accent|info|success|warning|danger`, `title`, `live:off|polite|assertive`(기본off), 기본/actions 슬롯. 정적 안내는 live를 켜지 않고, 같은 변화의 자동 안내는 한곳만 사용합니다.
- `STree`: 필수 `id/label/items:STreeItem[]`, `v-model:string|null`, `v-model:expanded:string[]`, `disabled/readonly`, `select(id)` 이벤트. 항목은 고유 id/label, 선택적 disabled/children입니다. 방향키·Home/End는 초점, Enter/Space는 선택입니다. 접힌 자식은 Tab 순서에서 제외합니다. readonly는 탐색·펼침을 허용하고 값 선택을 막습니다.
- `SDialog presentation="drawer"`는 같은 열기/닫기·초점 계약을 오른쪽 패널로 표시합니다. `eyebrow`와 `title`은 같은 제목 묶음을 사용합니다.
- `SRadioGroup layout="cards"`와 `options[].description`은 라벨 전체가 선택되는 비교 카드를 제공합니다. 값과 native radio의 키보드 동작은 기존 계약을 유지합니다.

기본 사용 코드는 [정본 Vue 예제](examples/vue-vuetify/src/recipes/)에서 생성하고, 같은 파일을 `/starter/?view=recipes`에서 실행합니다. 문서의 HTML·CSS는 별도 참고 탭입니다. Tooltip/Popover·Accordion·Breadcrumb·Avatar·파일·단일 자동완성·차트도 전용 S API로 제공합니다. 폼·검색·편집 같은 업무 흐름은 부품을 연결한 Vue 조합입니다. [전체 전환표와 제한](VUE-EXAMPLES-PLAN.md)을 확인하세요.

`@solyi/vue-ui`의 기본 사용 이름은 `SBtn`, `STextField`, `SDialog`, `SDataTable` 등 S 접두사 PascalCase입니다. 현재 컴포넌트 export와 plugin 등록은 S 이름만 제공합니다. 사용되지 않은 이전 Sol 컴포넌트 별칭은 이번 0.x에서 제거했습니다. 기존 릴리스 파일은 변경하지 않습니다.

```vue
<script setup>
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

## 진행 표시

SProgressLinear와 SProgressCircular는 같은 읽기 전용 표시 계약입니다. id/label은 필수, modelValue=0/min=0/max=100, state는 determinate/indeterminate/complete/error입니다. 실제 작업·저장·타이머를 실행하지 않습니다. 범위 밖 값은 표시만 clamp하고 complete는 max를 표시합니다. 잘못된 수치/경계는 값을 만들지 않고 안내합니다. unknown은 aria-valuenow와 퍼센트를 제거하고 error는 마지막 확인 값과 지속 문구를 보입니다. message는 앱 문구, announce는 기본 false이며 같은 작업의 한곳만 polite로 켭니다. Circular size는48–256(기본96), Linear는 너비100%입니다. 공통 ko/en locale을 따릅니다.

resolveSProgress는 같은 clamp/known/ratio를 계산하는 순수 helper입니다. 둘에 같은 모델을 전달해도 값을 emit하지 않습니다. 값 변경의 유한 transition만 있고 reduced-motion은 이를 제거합니다. state="indeterminate"는 animated=true(기본)일 때 반복 띠/호로 처리 중임을 나타냅니다. animated=false 또는 prefers-reduced-motion에서는 정적 표시를 유지합니다. 알려진 진행률을 가짜로 만들지 않으며 완료·오류·determinate에서는 반복하지 않습니다.

문서 #component/progress는 같은 출처의 starter?view=progress를 삽입해 실제 tarball을 import한 같은 SFC를 실행합니다. 부모 테마·모드·밀도는 origin/source를 확인한 메시지로 동기화하고 ResizeObserver로 높이를 맞춥니다. 키보드 탐색과 starter 직접 링크를 유지합니다. 나머지 HTML 예제는 전환표에 표시한 후속 범위입니다.

### Progress 표시 옵션

두 Progress API는 `showLabel`, `showValue`, `showMessage`를 각각 Boolean(기본 true)으로 제공합니다. 원형 수치와 선형 상태 문구의 자동 퍼센트는 showValue=false로 숨깁니다. showMessage=false와 showValue=true 조합에서는 선형 바에 수치만 남습니다. 제목·문구를 숨겨도 접근성 이름, aria-valuenow(알려진 값만), aria-valuetext와 설명 연결은 유지합니다. 앱이 직접 전달한 message/label slot의 내용은 변경하지 않으므로 숫자 포함 여부는 앱이 정합니다. 주요 오류 설명을 숨길 때는 화면의 다른 지속 오류 안내를 함께 제공하세요. 실제 옵션 데모는 starter의 Progress 섹션입니다.

`<SProgressLinear id="upload-progress" label="가상 작업" :model-value="35" :show-message="false" />`

SSnackbar는 의미 배경과 공유 아이콘, 한국어/영어 상태 이름을 함께 표시합니다. 접근성 live 안내도 상태 이름과 message를 한 번 전달하며, 열릴 때 초점을 가져가지 않습니다.

### 라벨 비교 기준

STextField는 입력 위의 지속 라벨을 제공합니다. starter의 S/V 비교도 외부 `<label for>`를 사용해 두 컨트롤의 시작점을 맞춥니다. 직접 VTextField의 floating label API는 그대로 사용할 수 있습니다. 이는 Vuetify 방식이 잘못됐다는 판단이 아니라 이 예제의 비교 기준입니다. [W3C WAI 라벨 안내](https://www.w3.org/WAI/tutorials/forms/labels/)는 label과 control의 연결 및 가까운 시각적 관계를 설명하고, 위쪽 라벨의 모바일·축소 화면 이점을 안내합니다. 원본 [Vuetify Text field](https://vuetifyjs.com/en/components/text-fields/)의 API와 S API의 차이는 유지됩니다.

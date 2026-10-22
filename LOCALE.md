# 공통 locale · Core 0.3.2 / Vue UI 0.5.0

기존 `provideSolLocale`를 그대로 사용합니다. 내장 문구 팩은 `ko-KR`, `en-US` 두 LTR 언어이며 `ko`, `en`도 받습니다. 다른 언어·지역·RTL 번역/레이아웃은 지원하지 않습니다. 지원하지 않는 앱 코드는 한국어로, 지원하지 않는 개별 코드는 앱 언어로 돌아갑니다.

```ts
import {createApp, ref} from 'vue';
import {provideSolLocale} from '@solyi/vue-ui';
const language = ref('ko-KR');
const app = createApp(App);
provideSolLocale(app, () => ({code: language.value, tableRetry: '다시 불러오기'}));
// 또는 app.use(SolyiUI, {locale: language});
// language.value = 'en-US' — 재마운트 없이 갱신
```

기본 팩 → 같은 언어의 앱 부분 override → 컴포넌트 부분 override 순서입니다. 다른 언어를 명시한 컴포넌트는 해당 팩에서 시작하므로 앱의 다른 언어 문구를 섞지 않습니다. `undefined`, 잘못된 값 타입과 0–6 밖 firstDay는 기본값을 지우지 않습니다. `closeLabel`, `emptyText` 등 명시적 컴포넌트 옵션은 해당 문구보다 우선합니다. 앱 override는 앱이 선택한 언어에 맞게 제공해야 합니다.

```vue
<STextField id="title" label="Title" required :locale="{code:'en', required:'needed here'}" />
<SDialog id="preview" title="Preview" v-model="open" />
<SDataTable :columns="columns" :rows="rows" caption="Records" />
```

20종의 내장 선택·로딩·오류·메뉴·패널·필수·닫기·표 정렬·선택·페이지·전체 내용 문구가 이 설정을 따릅니다. 언어를 바꿔도 값·정렬·선택·페이지·열린 패널·초점을 초기화하거나 change를 보내지 않습니다. 표시 중인 내장 숫자/날짜/시간/다중선택 오류와 native customValidity도 갱신합니다. `label`, 업무 데이터, slot, 사용자 제공 error/help/알림 message는 앱 소유이므로 번역하지 않습니다. 소비 앱이 전체 화면의 `lang`과 업무 번역을 관리합니다. 문서 사이트 전체 번역이나 언어 영구 저장 기능은 포함하지 않습니다.

```ts
import {formatSolNumber, parseSolNumber, formatSolDate} from '@solyi/vue-ui';
formatSolNumber(1234.5, 'en'); // "1,234.5"
parseSolNumber('1,234.5', 'ko'); // 1234.5; 잘못된 "1,2"는 null
formatSolDate('2026-10-21', 'ko'); // "2026년 10월 21일"
const columns = [
  {key:'count',label:'Count',format:'number'},
  {key:'date',label:'Date',format:'date'}
];
```

숫자 입력은 두 언어가 공유하는 쉼표 그룹·소수점 점을 검증하고 숫자 모델을 유지합니다. 빈 값은 null, 지수 표기와 잘못된 그룹은 거절합니다. NumberInput의 유효한 확정값과 Table의 실제 number는 Intl 표시를 사용합니다. 식별 번호는 `format:'text'`, 맞춤 포맷은 cell slot/RangeSlider formatValue를 사용합니다. 날짜 표시 helper와 Table의 명시적 date 열은 Gregorian/UTC로 계산해 로컬 시간대에 따른 하루 이동을 막습니다. 입력·저장값은 여전히 ISO `YYYY-MM-DD`/범위 객체 및 `HH:mm`입니다. 시각은 업무의 date/timezone으로 추측하지 않습니다.

실행: `starter/#locale-demo`. 공통 언어, 개별 override, 숫자·날짜 표시, 표와 Dialog를 실제 설치 패키지에서 비교합니다. 기존 입력 데모의 언어 선택은 기본적으로 앱 설정을 상속하며 개별 ko/en도 시험할 수 있습니다.

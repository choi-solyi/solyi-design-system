# 게시 전 공통 UI 누락 대조 · 2026-10-29

대상은 동결 solyi-ui 1.1.0 로컬 후보입니다. SHA-256은 90c8ae6949c05b1e4cb87d9409fc9f25274448f4abd406b5d5d6ae0b93886c0e입니다. 냉각실의 기존 1.0.0 화면을 후보 결함의 증거로 사용하지 않았으며 AION/냉각실 코드·운영 사이트·공유 브라우저를 읽거나 변경하지 않았습니다. 이번 작업은 소스/기존 검증 재사용과 제한된 실제 렌더 관찰이며 라이브러리 구현 변경은 없습니다.

## 항목별 판단

| 요청 | 분류 | 확인 결과와 근거 |
|---|---|---|
| 1 Dialog 설명·고정 영역, Switch 중복 라벨 | **공통 수정 완료** | a6e6345와 2ed14bb. index.ts:114–118은 heading/body/feedback/actions를 형제로 구성하고 styles.css:60–68은 heading/actions flex:none, body만 overflow:auto입니다. body p margin=0, heading 간격12px, 모바일 padding16px입니다. 최종 설치본 360×740/720×400의 스크롤·고정 close·마지막 입력 포커스를 이미 확인했습니다. controls.ts:58의 hideLabel은 내부 이름을 sr-only로 유지합니다. selection.vue:32의 외부 label과 aria-labelledby 연결도 확인했습니다. 추가 wrapper 여백과 외부 label은 소비자 사용을 별도로 봐야 합니다. |
| 2 SCard와 Examples/Sample Code 모서리 | **공통 수정 완료** / 자식 콘텐츠는 소비자 책임 | SCard 본체는 surfaces.ts:12와 Core radius-card=12px이며 전역 clipping이 없습니다. 4aea295에서 문서 iframe/embed 배경만 transparent로 바꾸고 code toolbar의 안쪽 radius를 보완했습니다. site/docs.css:174 및 adapter.css의 embed 조건입니다. CARD-SURFACES-VALIDATION.md의 36조합/팝업·포커스 보존 증거를 재사용했습니다. 소비자가 넣는 full-bleed 이미지나 자식 사각 배경까지 SCard가 자동 mask하는 계약은 없습니다. |
| 3 Tabs/Segmented 활성 면·반투명·이중 밑줄 | **공통 누락 확인: Segmented hover 이중 표시** | 기본 STabs는 1100/light·390/dark에서 선택 면 opacity=1, 불투명 RGB, radius6px, 추가 shadow/밑줄 없음입니다. 반투명 모서리는 기본 사례에서 재현되지 않았습니다. 반면 Segmented 선택 span은 styles.css:323의 inset 하단3px 표시선과 :173의 hover text-decoration:underline이 동시에 적용돼 실제 starter에서도 두 줄이 보입니다. 사용자 CSS만의 문제로 분류할 수 없습니다. |
| 3 연결 선택 컨트롤 사용법 | **소비자 사용 문제(의미 선택)** / **미확인(연결형 요구)** | STabs는 tab/panel 전환, SSegmentedControl은 문자열 단일 radio 선택입니다. Components와 AdvancedExamples.vue:203–225에 실제 예제가 있고 패널 전환과 다르다는 설명도 있습니다. 현재 segmented는 gap과 각 버튼 radius가 있는 분리형입니다. joined/connected 외형 prop은 없습니다. 연결형 외형까지 필요하다는 요구를 확정하기 전 새 API나 컴포넌트를 추가할 근거는 없습니다. |
| 4 placeholder·높이·인접 정렬 | **공통 누락 확인: 짧은 trailing 줄바꿈** / **소비자 사용 문제: 일반 인접 배치** | fields 예제의 0자 trailing이 738px 폭에서도 두 줄로 나뉩니다. 실제 trailing 폭11.39px/높이42.875px, native input40px, frame42.875px로 입력과 아이콘 중심이 약1.44px 어긋납니다. input-control.css:10 rail의 축소와 fields.vue:34 trailing 조합에서 재현되며 공통 rail/정본 예제 보완 후보입니다. placeholder 자체만의 독립 결함은 확정하지 않았습니다. placeholder 관찰은 실제 native input에 일시적 placeholder를 넣은 최소 재현입니다. 기본 desktop 입력40px·버튼36px·스위치 track40×24/외부 target40px, 모바일 버튼/입력/target44px는 토큰상 의도된 구분입니다. 임의 인접 row의 align-items·동일높이 선택은 앱 레이아웃 책임입니다. |
| 5 버튼 loading·overlay 흔들림/진행상태 | **공통 누락 확인: 미정의 disabled 배경 토큰** / 크기·상태는 **공통 수정 완료** | SBtn은 loading 전후 50.297×36px(desktop), 50.297×44px(mobile)로 유지되고 aria-busy/aria-disabled=true, content opacity0, loader aria-hidden=true입니다. 그러나 styles.css:37과 :105가 존재하지 않는 --sol-color-disabled를 참조합니다. 실제 버튼의 해당 변수는 빈 문자열, loading 배경은 rgba(0,0,0,0)이 됩니다. 크기 안정과 별개로 공통 상태 색의 누락입니다. SLoadingOverlay의 owner 폭308px/높이209.656px는 전후 동일했습니다. 클릭 시 자동 스크롤돼 viewport y가 바뀌었으므로 이를 layout shift라고 판정하지 않았습니다. 기존 b24d769의 aria-busy·delay/dwell·inert·포커스 검증도 재사용합니다. |
| 6 compact 선택/검색 결과 | **미확인: 필요한 compact 수준** / 개별 API 부재 확인 | applySolyiAppearance의 global density는 존재하며 tokens.json compact는 content-gap/row-padding/table-cell-padding-y/list-item-padding-y를 줄입니다. Table과 Core record/list는 해당 역할을 사용합니다. SAutocomplete/SCombobox/SMultiSelect에는 별도 density/rowHeight/option 슬롯이 없고 popup 옵션은 styles.css:361에서 touch-target-min=44px을 유지합니다. 따라서 global compact가 모든 검색 결과를 작은 행으로 만드는 API라고 안내하면 안 됩니다. 데스크톱 전용 작은 옵션 행이 필수인지, 접근성 target 유지 안에서 무엇을 줄일지 추가 판단이 필요합니다. |
| 7 Android 뒤로가기·overlay stack | **소비자 사용 문제: Capacitor 어댑터** / **미확인: 실기기 통합** | SDialog는 VDialog의 stack/최상위 Escape/focus 처리를 재사용합니다. Vuetify4.3 VOverlay.js:298 및 composables/router.js:78은 Vue Router가 있을 때 popstate에만 연결합니다. Capacitor App.backButton listener나 Android 종료/이탈 정책을 설치하지 않습니다. PickerHost.ts:206은 closeOnBack:false라 모든 popup을 하드웨어 back으로 닫는 공통 manager가 이미 제공된다고 볼 수 없습니다. 앱 어댑터가 native back→최상위 overlay/route/종료 정책을 소유해야 하며, 전체 overlay 공통 등록·dismiss 계약이 필요하다면 별도 검토입니다. 물리 Android는 미검증입니다. |
| 8 테마·accent/success/neutral·CTA/nav | **공통 수정 완료: 역할 분리** / **소비자 사용 문제: 역할 배정** | canvas/surface/text/muted, accent, success와 selected-*는 분리돼 있습니다. DESIGN.md:36–39가 현재 보고 있는 선택과 작업 상태를 구별하고 역할 토큰을 쓰도록 안내합니다. primitives.ts:9의 neutral tone도 있고 SBtn의 중립 동작은 secondary/subtle variant입니다(SBtn tone=neutral은 공개 API가 아님). createSolyiVuetify의 V secondary는 accent와 같은 값이므로 V 색 이름을 중립 의미로 오해하면 안 됩니다. 한 색 강제 규칙은 없습니다. 기본 starter nav는 옅은 selected 면+표시선, CTA는 primary 면으로 구별됩니다. 앱에서 모두 진한 accent/성공색으로 칠했는지는 해당 앱 소스·화면 대조 전 미확인입니다. 직접 V secondary와 SBtn secondary의 차이를 가이드 예시로 더 명확히 할 여지는 있습니다. |
| 추가 Pagination 주변 번호 | **공통 누락 확인: Table 제어 불일치** | SPagination(pagination.ts:12)은 siblingCount 기본1, helper에서 0–5로 제한해 양옆 번호 수를 조절합니다. 예: page500/count1003/siblings3이면 1,…,497–503,…,1003입니다. SDataTable(index.ts:128,158)은 같은 helper를 세 번째 인자 없이 호출하고 관련 prop/공개 footer 교체 슬롯이 없어 주변 수를 선택할 수 없습니다. 또한 독립 Pagination도 440px 이하에서는 CSS가 현재 번호 외 숫자를 숨기며 이를 끄는 공개 prop은 없습니다. navigation.vue 예제에는 페이지 수/부모 반영은 있으나 siblingCount 선택 예제는 없습니다. 기능 존재만으로 Table·작은 화면의 요구를 완료 처리할 수 없습니다. |
| 추가 Components/starter 완전성 | **공통 수정 완료: 항목 연결** / 위 재현 예제 보완은 후보 | 기존 38+추가12=50종 등록·타입·Components가 있으며 신규/확장18개는 component-extension-coverage-check.mjs의 메뉴/검색/라우트/Examples/Sample Code/API/실제 SFC 링크를 통과했습니다. Date/Number/Time/clear/Confirm/Dialog/Loading/Empty/Calendar/Sortable/TimeGrid/Pagination 모두 정본 예제에 연결돼 있습니다. 이는 모든 미세 UI 문제가 없다는 뜻은 아닙니다. SScheduler는 명시적 제외이고 공개된 것처럼 표시하지 않습니다. 운영 ui.solyi.kr과 기존 소비 앱은 이번 후보로 배포하지 않았습니다. |

## 게시 전에 분리해 판단할 공통 후보

1. 미정의 --sol-color-disabled 참조의 명시적 기존 역할 매핑.
2. 짧은 입력 utility trailing이 불필요하게 줄바꿈하고 frame 높이를 늘리는 사례.
3. Segmented 선택 표시선과 hover 텍스트 밑줄의 중복.
4. SPagination의 주변 번호 설정과 Table/좁은 화면 제어의 차이 및 실제 조절 예제.

위 네 건은 동결 후보 소스/실렌더에서 근거를 찾았습니다. 이번에는 수정하지 않았습니다. 연결형 Segmented·검색 옵션 compact·Android back의 전면 공통화는 이들과 별개이며 요구/플랫폼 책임을 먼저 정해야 합니다. 앱별 캐릭터 카드·숙제·레기온 칩/문구·냉각실 문구는 라이브러리 범위에 넣지 않습니다.

## 관찰 범위·증거·게시 상태

- 신규 관찰은 격리 Chrome, 동결 설치본을 빌드한 로컬 docs/starter, 1100/light와390/dark 일부 화면에 한정했습니다. 기존 전체 행렬/타입 검사는 반복하지 않았습니다.
- qa-output/common-ui-audit/observations.json, details.json, browser.log와 screens/tabs-*.png, segment-*.png, input-*.png, loading-color.png를 보존했습니다. QA 선택자와 결과 저장 import 오류만 바로잡았으며 제품 구현은 변경하지 않았습니다.
- 이전 Dialog·모서리·설치본 검증은 RELEASE-READINESS-NEXT.md, CARD-SURFACES-VALIDATION.md 및 해당 로그/커밋을 재사용했습니다.
- npm 로그인 계정/maintainer는 choi-solyi로 확인됐습니다. 한 번의 동결 tarball publish는 EOTP로 거부됐고, 이후 공식 registry에서 1.1.0이 없고 latest=1.0.0임을 확인했습니다. OTP 재시도·인증정보 변경은 하지 않았습니다. 현재 사용자 추가 점검에 따라 게시 보류이며 registry 설치 검증도 미실행입니다.
- 동결 1.1.0 bytes와 1.0.0 파일/검사는 그대로입니다. 후보 소스 수정이 승인되면 기존 동결 파일을 덮어쓰지 않는 다음 후보/버전·검증 범위를 먼저 정리해야 합니다.

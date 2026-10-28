# Chip · Badge · Icon · Icon Button

이 문서는 아직 게시되지 않은 개발 브랜치의 추가 API입니다. npm `solyi-ui@1.0.0`에는 아래 네 컴포넌트가 없습니다. 기존 API를 유지하는 minor 버전(예: 1.1.0)의 후보이며 게시·운영 문서 배포·소비 앱 업데이트는 별도로 결정합니다.

## 연결과 공통 스타일

다른 S 컴포넌트와 같이 named import 또는 `app.use(SolyiUI)`로 사용합니다. 전역 템플릿 타입은 `import 'solyi-ui/global'`로 연결합니다. `solyi-ui/all.css` 또는 기존 개별 CSS 연결을 유지하세요. 별도 아이콘 폰트·새 런타임 의존성은 없습니다.

```ts
import { SChip, SBadge, SIcon, SIconBtn } from 'solyi-ui'
import type { SolTone, SolTagVariant, SolTagSize, SolIconName } from 'solyi-ui'
```

`SolTone`은 neutral/accent/info/success/warning/danger, `SolTagVariant`는 filled/outlined/subtle, `SolTagSize`는 sm/md입니다. Chip과 Badge 기본값은 neutral/subtle/md입니다. 기존 SButtonTone과 ButtonVariant는 변경하지 않습니다.

Violet/Sage/Sand × light/dark와 comfortable/compact를 기존 appearance 설정에서 상속합니다. 기존 색·선택·글꼴·간격·반경·아이콘·포커스·터치 목표 토큰을 재사용합니다. 신규 공통 토큰은 없습니다. 터치 목표는 밀도를 낮추어도 기존 최소 목표를 유지합니다. 긴 내용은 말줄임하며 전체 텍스트는 접근 가능한 이름과 title로 유지합니다. 터치에서 시각적으로 전체 내용을 열어야 하는 화면은 기존 Popover 또는 별도 상세 UI를 함께 제공하세요.

## SChip

Chip은 값 표시 또는 선택·삭제 행동을 담당합니다. 상태·개수를 알리는 Badge와 구분합니다.

| API | 계약 |
|---|---|
| label / default slot | 표시 내용. 복합 slot을 쓸 때 label로 전체 이름을 지정하는 것을 권장 |
| tone / variant / size | 위 공통 타입 |
| selectable / selected | 기본 false. selected는 controlled 값이며 v-model:selected로 연결 |
| disabled | 선택·삭제를 막음 |
| removable / removeLabel | 삭제 버튼 표시 및 선택적 전체 삭제 이름 |
| locale | 기존 Partial<SolLocale>. 내장 remove(label) 문구 사용 |
| leading / trailing slots | 장식 아이콘. label을 대신하지 않음 |
| update:selected(boolean) | 새 선택값 제안. 부모 반영 전 내부 값을 바꾸지 않음 |
| click(MouseEvent) | 선택 버튼의 실제 실행 |
| remove(MouseEvent) | 삭제 요청. 컴포넌트가 데이터나 자신을 직접 삭제하지 않음 |

표시형은 span이며 Tab 정지점이나 button 역할을 만들지 않습니다. 선택형은 native button/aria-pressed와 체크 표시를 사용합니다. 삭제 버튼은 선택 버튼의 형제이며 삭제가 선택을 동시에 실행하지 않습니다. Enter/Space는 브라우저의 native button 동작을 따릅니다. 삭제 후 데이터와 초점 복귀는 목록 소유자인 소비자가 처리하세요. 실행 예제는 제거 후 연결된 상태 문구로 초점을 옮깁니다.

readonly는 selectable을 끈 표시 모드로 해결합니다. 일반적인 loading/error/empty prop은 없으며 로딩 중 행동 차단은 disabled, 오류는 tone과 명시적인 텍스트, 빈 목록은 소비자의 empty UI로 표현합니다.

## SBadge

| API | 계약 |
|---|---|
| content / default slot | 숫자 또는 짧은 텍스트. 숫자 0도 표시 |
| tone / variant / size | 공통 타입 |
| label | 문맥 있는 보조 기술 이름. 숫자·아이콘만 표시할 때 제공 |
| icon slot | 장식 아이콘. 완료/경고/오류는 텍스트나 기호도 함께 사용 |
| live | off 기본값. polite를 선택할 때만 상태 변경을 안내 |
| id | 선택적 설명 대상 ID. 없으면 인스턴스별 생성 |
| anchor slot | 겹침 표시 대상. {descriptionId}를 실제 대상의 aria-describedby에 연결 |
| placement | anchor가 있을 때 top-start/top-end. 기본 top-end |

Badge에는 클릭·선택·폼 검증·공개 메서드가 없습니다. 비활성/readonly/loading을 붙이지 않습니다. label이 있으면 장식 콘텐츠의 중복 낭독을 피하고, live 상태에서는 숨겨진 전체 label을 안내합니다. 빈 값은 소비자가 렌더링 여부를 결정합니다.

## SIcon

| API | 계약 |
|---|---|
| name | 필수 SolIconName. solyi-ui/icons와 같은 경로·타입 |
| size | 16/20/24. 기본 20 |
| decorative | 생략하면 label이 있는 아이콘은 의미 이미지, 없는 아이콘은 장식. true는 항상 장식 |
| label | 의미 아이콘의 이름. decorative=false일 때 필요 |
| rotate | 0/90/180/270. 기본 0 |

currentColor를 사용하며 장식 아이콘은 aria-hidden, 의미 아이콘은 role=img/aria-label을 사용합니다. SVG는 초점을 받지 않습니다. 잘못된 런타임 이름은 개발 모드에서 경고하고 path를 만들지 않으며 크기 상자는 유지합니다. 잘못된 크기는 20으로 돌아갑니다. warning 이름은 기존 경로에 없으므로 타입 검사에서 거절합니다. 경고 UI는 info 아이콘과 명시적 경고 문구 등 현재 경로를 사용하세요. 아이콘 자체에는 disabled/loading/error/readonly가 없습니다.

현재 이름은 check/close/copy/arrow/external/chevron/search/menu/more/info/edit/trash/user/folder/plus/minus/calendar/save입니다.

## SIconBtn

| API | 계약 |
|---|---|
| label | 비어 있지 않은 필수 접근 가능한 이름 |
| icon / default slot | SolIconName 또는 장식 아이콘 slot. 둘 중 하나 필요 |
| size | 기본 아이콘 크기 16/20/24, 기본 20 |
| variant / tone | 기존 ButtonVariant/SButtonTone과 동일 |
| disabled / loading / type | 기존 SBtn 계약. 기본 type=button |
| click(MouseEvent) | 사용 가능한 버튼의 실행 |

SBtn을 재사용하며 loading 중 클릭 차단·초점 유지·aria-busy를 상속합니다. 빈 label이나 아이콘이 없는 런타임 사용은 경고하고 이름 없는 행동 버튼을 만들지 않습니다. slot 아이콘은 장식으로 제공하세요. STooltip의 activator props는 v-bind로 그대로 연결할 수 있습니다. tooltip은 label을 대체하지 않습니다. readonly/empty는 버튼의 상태로 추가하지 않습니다.

## 예제·검증·기준 산출물

소비 프로젝트의 SVG 래퍼는 SIcon으로, 아이콘 전용 버튼은 필수 label을 갖는 SIconBtn으로 교체할 수 있습니다. 정적인 상태·개수 표시는 SBadge, 값 표시·controlled 선택·삭제는 SChip으로 옮깁니다. 기존 데이터·선택·삭제 후 초점 정책은 소비자가 유지하며 원본 배열이나 서버 저장을 이 컴포넌트에 넘기지 않습니다. 실제 소비 프로젝트 교체는 이번 변경에 포함하지 않습니다.

공유 실행·복사 예제는 [buttons.vue](../../examples/vue-vuetify/src/recipes/buttons.vue)입니다. controlled 선택·삭제 후 초점·disabled·loading·warning/danger 문구·빈 상태·긴 텍스트·겹침 Badge·Tooltip을 포함합니다. 문서/실행 화면의 appearance와 locale 제어에서 테마·밀도·언어를 바꿉니다. locale 변경은 값·선택·초점을 초기화하지 않습니다. 표시 label과 데이터 번역은 앱 책임입니다.

`scripts/primitives-runtime-check.mjs`는 설치한 tarball의 등록·DOM·controlled 이벤트·locale·초점·오류 입력 방어 및 108개 토큰 대비 조합을 검사합니다. `scripts/declaration-contract-check.mjs`는 필수 label·아이콘 이름·크기·전역 타입과 기존 SBtn 타입을 검증합니다. 실제 모바일/브라우저 native 키보드·화면 낭독기 검증은 DOM 검사를 통과한 것으로 대체하지 않습니다.

변경 전 기준은 원격 main `03d7191785d53e325dd5a1b1049191143f41a61f`입니다. 이 소스로 빌드한 dist 149개 파일은 공식 npm 1.0.0 tarball과 바이트 단위로 같았습니다. 저장소 1.0.0 다운로드와 npm tarball의 파일 내용 차이는 package.json의 private=true/false뿐입니다. npm tarball SHA256은 `ef6514359a4eca688568294614dd1a5a6cac1d5fe7ea8173a1946687a9f15a05`입니다. 개발 원본의 private 보호와 불변 릴리스 파일은 유지합니다.

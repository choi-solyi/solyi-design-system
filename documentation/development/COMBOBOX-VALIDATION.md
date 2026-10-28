# SCombobox: 최종 설치 소비 검증

승인된 [확장 계획](EXTENSIONS-V2-PLAN.md)의 2단계 구현은 **c4f301110215d717cb197d0e961034ed788c8b1c**입니다. 이 커밋의 마지막 IME 보완을 포함한 소스로 새로 빌드·포장하고 별도 소비 앱에 설치해 검증했습니다. 이전 후보 통과로 대신하지 않았습니다. 검증 도구와 기록을 추가하는 후속 커밋은 UI 패키지 소스를 변경하지 않습니다.

## 소스와 설치본 식별

- 패키지 소스의 c4f3011 대비 diff가 없음을 확인한 후 `npm run build --prefix packages/vue-ui`와 패키지 디렉터리의 `npm pack --ignore-scripts`를 실행했습니다.
- tarball은 `qa-output/combobox-final-c4f3011/solyi-ui-1.0.0.tgz`이며 SHA-256은 **032ba80d0ad39cfe6f5d6dad6e84c715de4324770c236d060dfc9dcb069f5802**입니다. private 1.0.0 메타데이터를 유지한 로컬 개발 후보이며 공개 1.0.0 배포물이 아닙니다.
- 새 consumer와 별도의 동결 1.0.0 baseline에 기존 예제의 고정 lockfile을 복사하고 로컬 tarball 경로만 npm으로 갱신해 offline 설치했습니다. 기존 소비 예제의 manifest·lockfile·node_modules는 변경하지 않았습니다.
- 설치된 **dist 162개 파일 전체**가 새 빌드와 바이트 단위로 같습니다. lockfile의 tarball integrity도 npm pack 결과와 일치합니다. Vue 3.5.44/Vuetify 4.3.0, 링크 설치 없음, 별도 Core 설치 없음을 확인했습니다.
- 원시 증거는 같은 qa-output 디렉터리의 provenance.json, pack.json, runtime.log, types.log, declaration-comparison.json, consumer/browser-qa/report.json입니다. 보존용 핵심 수치는 [검증 스냅샷](COMBOBOX-FINAL-RESULT.json)에 있습니다.

## 통과한 검사

| 검사 | 실제 범위 |
|---|---|
| 패키지 build | 최종 c4f3011 source의 Vite bundle·TS 6.0.3 선언 생성·Core/CSS/폰트/고지 포함 |
| 설치본 runtime | draft와 확정 모델 분리, Enter/opt-in blur, 명시적 후보 탐색, select/custom/clear, 부모 거부·외부 교체, canonical FormData, required·readonly·disabled·SForm, 포커스, async/debounce/abort/stale/retry/unmount |
| 최종 IME 회귀 | clear 뒤 부모 모델 갱신이 취소 표시를 보존, stale compositionend 복원·재열림 방지, blur 전/후 조합 종료의 단일 확정, 외부 모델 교체 뒤 stale 조합 무시. 기존 SAutocomplete의 debounce 실행 시 query 읽기 계약도 통과 |
| strict Vue 타입 | TS 5.9.3/vue-tsc로 실제 설치본의 개별 import·실제 global.d.ts 사용 2건 통과. 숫자 모델·미지원 commit·잘못된 option 타입/분기·slot·prop·메서드 7건 거부 |
| 설치본 브라우저 build | consumer 아래 fixture에서 bare `solyi-ui`·`solyi-ui/all.css`와 peer를 해석. source/dist alias 없이 Vite build |
| 격리 Chrome | Chrome 156.0.8078.49, 320/768/1440px × 3 themes × light/dark × 2 density × ko/en × LTR/RTL = **144조합**. 긴 후보 말줄임/전체 내용, 네이티브 팝업 경계, 입력 rail, 키보드, 320px tap, custom/select/clear/blur, async retry·focus·FormData·전역 plugin 등록 및 최종 IME 가드 통과 |

명령은 각각 `scripts/combobox-runtime-check.mjs`, `scripts/combobox-types-check.mjs`, `scripts/combobox-browser-check.mjs`에 `--consumer=qa-output/combobox-final-c4f3011/consumer/`를 전달했습니다. 테스트 기본 실행 경로는 유지합니다. c4f3011에서 이미 통과한 문서 전체 회귀·starter 전 조합은 반복하지 않았습니다. Components 메뉴·검색·Examples·Sample Code·API와 실제 starter 정본은 `examples/vue-vuetify/src/recipes/combobox.vue`입니다.

## 외부 선언 baseline과 소비자 영향

`scripts/combobox-declaration-compare.mjs`는 동결 release-assets/1.0.0 tarball과 최종 후보를 별도 설치한 뒤 **동일한 import/global fixture와 고정 peers**로 비교합니다. 두 TypeScript 버전에 strict, ES2022/DOM, ESNext, Bundler, types=[]를 적용했습니다.

| TypeScript | skipLibCheck:false baseline/후보 자체 진단 | baseline/후보 외부 진단 | 외부 진단 ID·위치·문구 추가/제거 | skipLibCheck:true 전체 진단 |
|---|---|---|---|---|
| 6.0.3 | 0 / 0 | 769 / 769 | 0 / 0 | 0 / 0 |
| 5.9.3 | 0 / 0 | 769 / 769 | 0 / 0 | 0 / 0 |

skipLibCheck:false 소비자는 기존 외부 선언 오류 때문에 전체 컴파일이 계속 실패할 수 있습니다. 이번 변경의 자체 선언 오류와 외부 증가분은 없습니다. skipLibCheck:true 결과를 모든 외부 선언의 정상 판정으로 해석하지 않습니다. 비교를 위해 외부 라이브러리나 검증 기준을 수정하지 않았습니다.

## 출시 제약과 미검증

- ESM **222,586자 > 176,000자**로 기존 크기 게이트 실패는 유지합니다. 게이트 코드·위치·기준을 바꾸지 않았습니다.
- 동결 1.0.0의 SHA-256 **72d1d8d622287e8a86444c404ad20f7c5ed5d065dc2b4e48765374697854e23a**는 그대로입니다. source와 동결 버전 일치 게이트의 기존 실패를 해소하거나 우회하지 않았고 이번 단위에서 전체 release pipeline은 재실행하지 않았습니다.
- 물리 터치·물리 한국어 IME·스크린리더·Safari는 미검증입니다. Chrome의 tap 에뮬레이션과 합성 composition 이벤트를 구분합니다. Dialog 안 팝업의 전체 overlay 통합은 다음 picker 단계에서 다룹니다.
- npm 게시·원격 push·운영 사이트 배포·외부 소비 프로젝트 변경은 하지 않았습니다. 같은 API를 쓰는 소비자는 별도 SCombobox로 opt-in하며 SAutocomplete의 ID 모델과 scalar change는 유지됩니다.

다음 준비 범위는 [Picker presentation 착수 메모](PICKER-PRESENTATION-NEXT.md)를 따릅니다.

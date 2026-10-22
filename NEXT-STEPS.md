# 다음 확장 · 현재 구현과 잔여 범위

확인 기준: 공개 문서/검색/헤더 `b8648fa`, Core와 Vue UI0.3.0의20개 typed export. 이후 검색 이름·별칭 순위 수정은 별도 로컬 후속이며 아직 공개 푸시하지 않습니다. 아래 작업은 이번 순위 수정에서 구현하지 않습니다.

## 1. 공통 locale 완결

이미 있음: `packages/vue-ui/src/locale.ts`의 `koLocale`/`enLocale`, `SolLocaleKey`, `provideSolLocale(app, locale)`, plugin의 `install(app, {locale})`, 컴포넌트 `locale` override와 `useSolLocale` computed 병합. 현재 우선순위는 한국어 기본값 → 앱 주입 → 컴포넌트 override이며 undefined는 기본값을 지우지 않습니다. Date/Time의 Intl와 firstDay, starter의 일부 ko/en prop 데모도 있습니다. 따라서 provider를 새로 만드는 단계가 아닙니다.

- [ ] 기존 provider를 재사용해 앱 전체 언어의 런타임 변경/반응성·fallback 계약과 사용 API를 문서화·검증. 잘못된 locale 코드·누락 문구 처리 정책도 정하기.
- [ ] 아직 하드코딩된 기존 Field의 필수 표시, Dialog 닫기, Table 선택/정렬/재시도/페이지/전체 내용 문구 등을 공통 문구에 연결. 소비 앱이 제공하는 label/자료/오류 문장을 임의 번역하지 않기.
- [ ] 기존20종과 독립 소비 앱에서 앱 주입·개별 override·부분 override·언어 변경을 실제 시연. 날짜 YYYY-MM-DD/시각 HH:mm 저장값·입력 초안·포커스를 유지하기.
- [ ] 문서/스타터에서 내장 문구·표시 형식에 공통 locale을 적용할 범위를 정리. 한국어 설명·간결한 영어 내비게이션 원칙을 보존하며 문서 전체 영어 번역을 자동으로 포함하지 않기. 현재 문서 전역 언어 선택/언어 저장은 구현되지 않았음. 테마·밀도·모드 설정과 별개로 다루기.
- [ ] 타입·팩·기존 문구/오류/키보드 회귀, 작은 화면의 문장 길이와 줄바꿈, 실제 브라우저 검수 후 배포 판단.

## 2. 설치·업데이트 경로 완결

이미 있음: 두 private/UNLICENSED 패키지, `npm pack` 가능한 `.tgz`, 정확한 tarball 경로·integrity/lock, 두 독립 소비 앱 설치/타입/빌드, Vue/Vuetify external, 릴리스/롤백 문서. 이 저장소의 main 검증 성공 → 기존 Pages 데모 배포도 동작합니다. 상세는 LIBRARY.md입니다.

- [ ] 다른 프로젝트에서 내려받을 **고정 버전 패키지의 안정적인 경로** 결정. 현재 `.tgz`는 로컬 `artifacts/`에서만 생성되고 Git/Pages 출력에서는 제외되므로 공개 설치 URL이 없음.
- [ ] 선택한 채널에 버전별 tarball·checksum·변경 이력·호환 버전·설치/업데이트/롤백 절차를 연결. 같은 버전에 다른 파일을 덮어쓰지 않기. 실제 다운로드 경로로 새 소비 앱 설치·타입·빌드 검증.
- [ ] locale 등 패키지 계약이 바뀌면 패키지 버전/peer·예제 경로·lock을 함께 갱신하고 기존 `library:refresh`/`library:verify`와 독립 소비 검증 재사용.
- [ ] 여러 앱의 자동 업데이트는 대상별 고정 버전 업데이트 PR → 해당 앱 검사 → 승인된 배포/롤백 흐름으로 별도 연결. 현재 자동으로 바뀌는 곳은 이 문서 데모뿐이며 아페·개인 홈페이지는 미연결.
- [ ] npm/GitHub Packages 게시, 새 토큰/credential·workflow 권한·계정/비용 변경은 현재 승인 범위에 없음. 채널에 필요하면 조치·대상·권한을 먼저 제시하고 결정받기. 다른 앱 연결 역시 별도 대상 승인이 필요함.

## 3. 그 밖의 잔여 항목

- Figma 키트와 코드 토큰/상태/버전의 대응표. 아직 키트를 작성하거나 계정/플러그인 연결을 진행하지 않았음.
- 실제 iPhone Safari·물리 폴드/터치·화면낭독기·하드웨어 IME,400%/forced colors/CLS 등 미검증 환경. 자동 검사나 Chrome 폭 검사를 해당 실환경 통과로 대체하지 않기.
- 추가 Vue 전환은 VUE-MIGRATION.md의 참고 예제 목록을 유지: 단일 Autocomplete, 파일 선택/드롭, Tooltip/Popover/Accordion, Avatar/Breadcrumb/Side panel, Progress/Step/Chart/Tree 및 폼·상태·편집·화면 템플릿 조합 등. 현재20종 API와 이 문서 예제를 혼동하거나 준비 완료로 표시하지 않기.

# 다음 npm 게시 준비와 남은 조건

사용자는 2026-10-28에 남은 요청을 마무리한 뒤 다음 버전을 npm에 게시하도록 승인했습니다. remote push·운영 사이트/외부 소비 앱 배포·새 인증정보 생성·권한 확대는 승인 범위가 아닙니다. 이전 단계 기록의 게시 금지는 당시 상태이며, 이제 **구현·최종 검증을 마친 차기 버전 게시**는 승인 범위입니다.

## 읽기 전용 확인

- 공식 https://registry.npmjs.org 의 `solyi-ui` metadata에서 version/latest가 **1.0.0**임을 확인했습니다.
- 기본 sandbox 조회는 ENOTFOUND였고 허용된 네트워크 조회에서 공개 metadata는 성공했습니다.
- 같은 공식 registry의 `npm whoami`는 **E401 Unauthorized**입니다. 현재 기존 인증의 유효성을 확인하지 못했으며 게시 단계는 인증 차단 상태입니다. npm login/config 변경/새 token 생성/권한 확대는 하지 않았습니다. 새 인증 상태가 제공되기 전 이 인증 요청을 반복하지 않습니다.
- npm publish는 실행하지 않았습니다. 부분 성공 또는 불확실한 게시 결과는 없습니다. 원시 결과는 qa-output/date-presentation/npm-*-network 파일에 보존합니다.

현재 추가 확인: Dialog 피드백 구현 뒤 기존 45종 예산의 문자 한도를 소폭 넘었습니다(정확한 수치는 qa-output/dialog-feedback/current-size.json). 검사는 유지하며 기능을 빼거나 수치만 올려 통과시키지 않습니다. 전체 승인 범위를 닫은 후 실제 API 집합·증분·gzip·개별 import를 근거로 최종 버전 기준을 정리해야 합니다.

## 실제 게시 전 닫을 조건

1. [승인된 18항목 계획](EXTENSIONS-V2-PLAN.md)과 추가 Dialog 요청을 대조하고 최종 포함 범위를 기록합니다. 완료 기능과 새 WIP를 섞어 하나의 완성 버전처럼 게시하지 않습니다.
2. Date/Time opt-in과 Dialog 고정 header·본문 스크롤·설명 간격·Switch 접근성 라벨을 구현/검증합니다. 이어 ConfirmAction, Dialog 추가 슬롯/overlay, LoadingOverlay/EmptyState, Sortable grip, categorical palette, MonthCalendar 통합, Card/Pagination을 계획 순서대로 처리합니다. NumberInput/아이콘/Chip/Badge/Sortable/MonthCalendar의 완료 구현은 중복하지 않습니다.
3. TimeGrid는 승인 계획에 **별도 API 검토·독립 단계/PR**로 명시되어 있습니다. generic 기반과 proposal 계약의 설계/구현 상태를 따로 기록하고 거대 업무 Scheduler·서비스 저장/충돌 규칙은 포함하지 않습니다. 이 조건을 조용히 삭제하거나 이미 완료로 표시하지 않습니다.
4. 최종 소스에 대해 타입·개별 import·plugin·ko/en·theme/density·mobile/RTL·keyboard/focus·Components/starter와 설치 소비를 확인합니다. 공개 API 집합과 측정 근거를 갱신하고 예산 초과를 자동 상향하지 않습니다.
5. 기존 1.0.0 파일·SHA·불변 검사를 보존한 채 새 버전 artifact/manifest/current를 준비하고 **같은 최종 tarball**로 전체 release/delivery pipeline과 소비 앱 검증을 마칩니다. 아직 이 단계는 실행하지 않았습니다.
6. 게시 직전 registry 전체 버전·dist-tag를 다시 확인합니다. 로컬 **1.1.0은 후보**이며 사용 가능한 다음 minor인지 최종 확인합니다. 모든 출시 검증을 통과한 stable 버전은 `latest`로 게시하는 계획입니다. 임의 prerelease 이름으로 기존 semver 검사를 변경하지 않습니다.
7. 현재 UI package도 private:true라 게시 보호 상태입니다. 사용자가 승인한 최종 게시 단계에서 UI의 실제 배포 metadata와 그 검사를 명시적으로 정리하고 최종 tarball을 다시 검증해야 합니다. root/Core의 내부 private 보호와 1.0.0 bytes는 보존합니다. 현재 인증 차단이 해소된 뒤 실제 게시와 **registry에서 새로 설치한 버전**의 실행/타입을 확인하고 URL을 보고합니다.

## 차단과 일반 개선의 구분

- **현재 실제 차단:** registry 인증 E401, 아직 미완료인 포함 기능/WIP, 최종 artifact/전체 pipeline 미완료, 최종 게시 metadata 전환 전 상태.
- **조건부 차단:** 추가 기능으로 예산을 넘거나 자체 선언/동작/접근성 회귀가 발생하면 원인을 해결해야 합니다. PURE 단위의 45종 후보는 새 기준을 통과했지만 이후 소스에도 자동 적용되는 면제는 아닙니다.
- **기존 제한:** 외부 선언 769건은 두 TS 버전에서 1.0.0과 후보가 동일(추가 0), 자체 선언은 0입니다. 이 수치만을 새 기능의 출시 실패로 혼동하지 않습니다. 실제 Fold/OS 키보드/Safari/화면 낭독기는 별도 미검증 한계로 표시합니다.
- npm 자체 용량 제한에 걸렸다는 증거는 없습니다. 이미 완료한 내부 개선을 반드시 새 blocker로 만들거나, 필수 실패를 단순 개선 사항으로 낮추지 않습니다.

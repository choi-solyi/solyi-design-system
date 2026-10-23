# S API와 Progress 로컬 후보 검증

> 문서 v0.7.0 후보의 과거 검증 기록입니다. Sol 별칭, 정적 unknown Progress, 게시 보류 등의 설명은 당시 상태를 보존한 것이며 현재 API나 배포 상태가 아닙니다. 최신 지원 범위는 README와 현재 컴포넌트 문서를 확인합니다.

2026-10-22 UTC. 공개 기준 v0.6.0(8d0b297), 로컬 후보 v0.7.0 / Core0.3.2 / Vue UI0.5.0입니다. 이 단계에서는 푸시·Pages 배포·registry 게시·패키지 이름/라이선스 변경·다른 앱 변경을 하지 않았습니다.

## 자동 검사 근거

- 소스 빌드와 엄격한 선언 검사를 통과했습니다. 정식 S 이름 20개는 Sol 별칭과 같은 객체를 유지하고 plugin이 둘 다 등록합니다. 직접 사용한 VBtn·VTextField, 호출자 defaults 병합, 공유 테마 6개, 잘못된 설정 차단과 입력 초안 보존 검사를 통과했습니다.
- 두 독립 소비 앱에 실제 tarball을 깨끗하게 설치했습니다. 자체 API 선언·exports·CSS, 정식 S 타입 소비 빌드, 기존 제어 상태·키보드·비동기·locale 회귀 20종, 새 Progress 런타임과 실제 starter 빌드가 통과했습니다(qa-output/s-installed-preview.log). Vue·Vuetify는 peer·external을 유지합니다.
- Progress 정규화는 범위·clamp, 완료·unknown·오류·잘못된 값, 0 호, locale·live 상태와 실제 데모의 재시작·재시도·완료 초점을 다룹니다. iframe bridge는 origin·source, 유한 높이 한도, 화면 설정 동기화와 정리를 검사합니다.
- 기존 문서 DOM·탐색·상태 검사를 통과했습니다. 검색 목록은 목적지 61개와 정식 API명을 검증합니다. 다른 realm 배열 비교 검사 1개를 고친 뒤 재실행하여 통과했습니다. 헤더 회귀는 텍스트·체크·포커스·테두리 대비 72개를 통과했으며 최종 전달·check 결과는 아래에 기록합니다.
- 검토 중 native VDialog 예제에 Vuetify activator 연결이 없어 Escape로 닫으면 초점이 BODY에 남는 문제를 발견했습니다. 실제 실행 버튼을 연결한 뒤 합성 starter 열기·닫기 회귀와 실제 Chrome Escape·실행 버튼 복귀가 통과했습니다. starter의 오래된 20개 컴포넌트 설명도 22개로 바로잡았습니다.

## 실제 브라우저 범위

사용자 PC의 **Chrome extension browser**, localhost4175, 2026-10-22입니다. CSS 너비는 1180·720·333px이며 브라우저 확대 90%에서 innerWidth를 측정했습니다. 이는 로컬 브라우저 검증이며 공개 버전 검증이 아닙니다.

- 테마 3개×라이트·다크: SBtn 기본 상태와 native VBtn의 실제 포인터 hover는 같은 Core accent·on-accent·hover 역할을 사용합니다. 필드 초안을 보존하며 검사한 너비에서 문서 가로 넘침이 없었습니다. 1180px에서 두 버튼은 35.99px·반경 6px, S/V 필드는 모두 40px·반경 10px, VCard는 12px, VDialog 카드는 16px입니다. 333px에서 버튼은 43.99px입니다. native VBtn에 보이는 실선 키보드 포커스 테두리가 적용됩니다.
- Progress unknown은 가짜 퍼센트를 제거하고 오류는 35%를 유지합니다. 재시도에서 Enter를 누르면 0으로 초기화하고 재시작에 초점을 돌립니다. 문서 iframe은 테마·모드·밀도를 갱신하고 Enter(+10)에 반응하며 내용 높이에 맞춥니다(외부 333px: frame/content 모두 942px, 외부 720px: frame 약 798px). 검사한 좁은 너비에서 iframe 가로 넘침이 없었습니다.
- 도구 결과에서 333px 라이트 Progress와 다크 sage의 실제 스크린샷을 얻어 확인했습니다. 텍스트·제어·진행률이 들어오며 이미지를 저장소 파일로 내보내지는 않았습니다. 이는 변경한 면의 한정된 시각 검토이며 모든 참고 예제의 검수가 아닙니다.
- 브라우저는 prefers-reduced-motion=true를 보고했고 렌더링된 meter transition은 0s였습니다. 기본 모션의 CSS·런타임 계약은 소스·합성 검사로 확인했으며 OS 모션 환경 설정은 바꾸지 않았습니다. 당시 unknown Progress는 두 모드에서 의도적으로 정적입니다.

## 한계

iPhone Safari, 물리 Fold·터치, 화면 낭독기 안내, forced-colors, 전체 400% 확대 검사는 하지 않았습니다. 모든 Vuetify 버전·컴포넌트 호환이나 WCAG 인증을 주장하지 않습니다. 직접 쓰는 native Vuetify는 자체 props·label·검증 의미를 유지하며, 문서화한 opt-in defaults가 SBtn/VBtn API를 같게 만들지는 않습니다. 남은 참고 예제·패턴·템플릿은 REUSE-INVENTORY.md에 표시하며 완료된 export로 보지 않습니다.

무관한 프로세스 인자 열거는 자동 승인 검토에서 거절되어 중단했습니다. 프로세스 인자를 읽거나 프로세스를 종료하지 않았고, 검증에는 전용 로컬 서버를 사용했습니다. 필요한 구현 작업에 남은 차단은 없습니다.

## 최종 로컬 전달 검사

- 소스 커밋 6965d2e에서 변경 불가 0.7.0 쌍(Core0.3.2/UI0.5.0)을 준비했습니다. 보존한 0.5/0.6/0.7 세 쌍의 해시를 검증했으며 이전 파일은 그대로입니다. docs/releases/0.7.0은 release-assets/0.7.0과 일치합니다.
- 독립 localhost HTTP 소비 앱에서 0.6.0→0.7.0→0.6.0을 깨끗하게 설치하고, 선언·Vite 빌드·고정 integrity·Vue/Vuetify 각 1개를 확인했습니다. 손상·누락·덮어쓰기 음성 fixture는 거부했습니다. 로그: qa-output/s-release-delivery.log.
- 최종 재생성 문서 검사는 3테마×2모드의 대비 186쌍(일반 텍스트 최소 4.562:1), allowlist·링크·현행 산출물, 브랜드 해시, 정확한 설치 tarball과 고정한 폰트·라이선스 바이트를 통과했습니다. 로그: qa-output/s-final-check.log.
- 기존 문서 DOM·탐색·버튼, 관련 검색·헤더·bridge, 설치 패키지 검사와 변경한 starter 런타임은 각각 필요한 단계에서 수행했습니다. 문서 정리만 한 뒤 전체 검사를 다시 실행하지 않았습니다. 공개 CI·공개 0.7.0 URL·배포는 의도적으로 실행하지 않고 부모 검토를 위해 푸시를 보류했습니다. 당시 공개 사이트는 기준 0.6.0입니다.

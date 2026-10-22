# 배포 전 종합 검토 · 로컬 0.7 후보

기준775f39f / 2026-10-22 UTC. 공개 push·Pages·npm 게시 보류. 같은 코드를 네 관점으로 검토하며 별도 인력/에이전트가 독립 검토했다는 뜻은 아닙니다.

| 관점 | 범위 | 기존 증거 재사용 | 이번 확인 | 상태 |
|---|---|---|---|---|
| 개발자 | API/controlled state/취소/비동기·반복/타입/배포 일치 | S-API-QA의22종 및 날짜·고급 제어 회귀 | 소스 대조, 아래 R1/R4, 영향 회귀와 설치된 formatter 검사 | 완료·검증 범위 한정 |
| 웹디자이너 | 위계/밀도/긴 텍스트/정렬/작은 화면/6가지 테마 | 직전 S/V 치수·6가지 색·반경 검증 | 홈·starter 초기 화면 캡처, 표 치수와 좁은 화면 overflow | 부분 완료·스크롤 화면 캡처 제한 |
| 퍼블리셔·접근성 | 제목/label/keyboard/focus/상태/reflow/motion | 기존 대비·선택 제어·Toast/Popover·motion 증거 | 실제 오류 요약·표·달력 취소·시간·검색 키보드, R1 수정 | 완료·보조기기/전체 시각 제외 |
| 소비 프로젝트 사용자 | 설치·exports·CSS·폰트·고지·S/V 공존 | 기존 새 API20종 호환·동일 스타일 증거 | 두 clean 소비 앱 타입/빌드, metadata/peer/readme, 설치된 Core helper, locale/기본4종/S-V/starter 회귀 | 완료·HTTP 최종 gate는 아래 |

## 이번 브라우저 환경과 제한

사용 가능한 브라우저는 사용자 PC의 Chrome extension뿐입니다(in-app browser 없음). localhost4175에서만 검사. 기존 Chrome 통과 증거는 재사용 항목으로 구분하며 새로 확인하지 않은 상태를 이번 통과로 세지 않습니다. Safari·화면낭독기·실제 터치/폴드·400%는 여전히 미검증입니다.

문서 홈 desktop 및 스크롤된 표 구간 캡처는 Page.captureScreenshot 5초 제한으로 실패했습니다. 333px 문서 홈(dark sand/compact)과 starter 초기 화면(light violet)은 캡처·관찰했습니다. 후자는 최종 metadata 수정 전 버전 표시 불일치의 증거이며 최종 버전 표시는 DOM으로 다시 확인했습니다. 이미지가 도구 결과에 표시됐으며 별도 jpg 파일로 저장되지는 않았습니다. DOM/치수 검사를 전체 시각 검수 통과로 대체하지 않습니다. 최종 로컬 파일 선택 재시험은 chooser 이벤트10초 제한으로 중단했으며 권한 설정을 바꾸지 않았습니다(초반 파일 선택·형식 거절·제거는 실제 성공).

## 발견 목록

P2는 배포 전 수정할 중간 심각도, P3는 경미한 품질 문제입니다. 확인된 네 항목을 수정했으며 새 기능 전환은 하지 않았습니다.

| ID | 심각도·재현/영향 | 원인과 수정 | 검증 근거 |
|---|---|---|---|
| R1 | P2. starter720px에서 영어→잘린 제목 버튼의 aria-label이 한국어로 남음. 공통 overflow를 쓰는 문서/패키지에 영향 | helper가 받은 viewFullText formatter를 무시. 생성·refresh·내용 변경에 formatter 사용 | 실제 Chrome 재현→영어 View full content/Full content/Close, Escape, 한국어 재전환 확인. 새 source 검사 수정 전 실패/후 통과, 실제 설치 Core export 검사 통과 |
| R2 | P2. 패키지 README가 UI0.3.0/Core0.3.0·20종·theme 미제공을 설명하여 실제0.5.0/Core0.3.2·22종과 불일치. 버전 갱신 중 runtime uiVersion 수동값도 누락 발견 | README/peer/부품 수/현재 vs 과거 기록·snapshot·설치/롤백 문구 정리. 후보0.7.1/Core0.3.3/UI0.5.1 및 runtime 상수 일치. README peer/version와 실제 uiVersion 회귀 guard 추가 | pack 계약, 두 소비 앱 타입·빌드, S alias/native bridge runtime 통과. 최종 Chrome에서 Core0.3.3/UI0.5.1 및 영어 제목 라벨 확인 |
| R3 | P3. 가상 작은 TXT가 0.0KiB로 표시돼 빈 파일처럼 보임 | 항상 KiB 소수1자리로 반올림. 1KiB 미만은 정확한 B로 표시 | 실제 가상 TXT의 기존 표시 재현. source/DOM 회귀에서6바이트=6B 확인. 형식 거절/제거/동일 파일 재선택·drop synthetic 회귀 유지. 최종 B 표시의 실제 파일 선택 재검사는 도구 timeout으로 미확인 |
| R4 | P2. 버전 변경 후 package contract에서 archived starter token snapshot 불일치로 중단 | pipeline이 snapshot을 비교하지만 Core 생성 뒤 갱신하지 않음. stage1에 기존 sync-starter 명령 연결 | 실제 계약 검사에서0.7.0 vs0.7.1 실패 확인→같은 Core 산출물로 sync 후 계약/소비 앱/관련 runtime 통과. 전체 pipeline을 중복 재실행하지 않았으며 수정한 단계와 영향 검사를 실행 |

새 패키지 바이트를 기존0.7.0에 덮어쓰지 않고0.7.1 새 쌍으로 준비합니다. 자체 패키지명/private/UNLICENSED 및 승인된 폰트·로고·토큰 역할/반경/색/간격 CSS는 그대로입니다. npm 후보 sol-ui는 변경하지 않았습니다.

## 대표 흐름

1. 문서 진입·탐색: 333px 홈 캡처 정상. Date Picker 검색 첫 결과 날짜 선택, ArrowDown/Enter로 앵커 제목 초점. 모바일 목차 하위 선택 시 닫힘, 제목 top15.59px이며 mobile header는 relative로 이미 화면 밖이라 가림 없음. 설정12조합·history/61개 경로·빈검색/초기화는 기존 통과 증거 재사용.
2. 폼/표: 실제 빈 제출→오류, 실패 응답→입력 보존→성공. 다중 오류 요약 초점과 필드 링크·수정 성공. 표 페이지2→필터0개에서1/1 보정·결과 밖 선택1개 보존. 정렬/페이지/긴 자료 전후 열 너비47.986/426.806/95.990/127.986/87.986px 동일(오차0), 행52.639px 동일. 잘린 제목의 별도 실제 버튼→전체 내용→Escape 초점 반환 확인. 스크롤 표의 픽셀 캡처는 실패해 시각 판정 미완료.
3. 오버레이/입력: 상세 모달 진입·초기 닫기 초점 확인. 잘못된 날짜2026-02-30~31은 오류 후 보존, 달력 방향키/Escape 취소도 입력 보존·열기 버튼 반환. 시간18:00의 나머지 분 비활성, Done 복귀,09:07 오류 보존→0930을09:30으로 확인. 자동완성 오류→Tab 재시도→Enter→결과 선택. 가상 TXT/미지원 확장자 선택·형식/MIME/제거 후 파일 입력 초점 확인(개인 파일/전송 없음). 팝오버·토스트·업로드 드롭·IME·빠른 반복/경합/cleanup은 이번 DOM 회귀와 기존 패키지 증거를 구분해 사용.
4. 실제 소비: 새 두 tarball clean 설치·선언/exports/CSS·types/Vite build, 실제 installed Core formatter, 기본4종/locale/S-V/starter 관련 회귀 통과. 기존20종의 무관한 구현과 날짜/generic advanced/progress 소스는 바꾸지 않아 이전 통과 증거를 재사용. 폰트/OFL·브랜드·스타일 CSS 바이트는 기존과 동일하며 최종 check로 재확인. 원격 CI/공개 URL/npm/다른 앱은 실행하지 않음.

## 최종 판정

확인한 P2/P3 항목은 수정·영향 회귀를 마쳤습니다. 해결하지 않은 재현된 P1/P2 런타임 결함은 없습니다. 다만 **전체 시각 검수 완료 판정은 보류**합니다. 홈/초기 starter 외 스크롤 화면 캡처가 제한돼 별도 클라우드 브라우저 검수가 필요하며 실제 Safari·화면낭독기·기기/400%·forced-colors도 미검증입니다. 좁은 viewport를 물리 기기 검증으로 해석하지 않습니다.

이전 S-API-QA.md/QA.md의 결과는 재사용 증거이고 위 실제 Chrome 상호작용은 이번 실행의 증거입니다. 별도의 Lighthouse/axe/Nu 점수를 이번 실행에서 만들거나 추정하지 않았습니다. 기본 모션의 실제 시각·폰트 실패/CLS·컨테이너만 변경되는 특수 레이아웃은 이번에 검증하지 않았습니다.

최종 로컬 gate 완료: 구현 소스7ad4ded를 가리키는0.7.1(Core0.3.3/UI0.5.1) archive 쌍을 새로 보존했습니다. 기존0.5/0.6/0.7 바이트는 그대로이며4개 immutable 쌍의 해시를 검증했습니다. localhost HTTP0.7→0.7.1→0.7 clean 설치·type/Vite build·integrity·단일 Vue/Vuetify·손상/누락/덮어쓰기 거절이 통과했습니다(`qa-output/predeploy-delivery.log`).

최종 문서 check는 대비186쌍(가장 낮은 상대 여유: violet/light4.562:1, 기준4.5), allowlist/생성 파일/로컬 링크/공식 브랜드·설치 package·Wanted Sans/JetBrains Mono/Nanum Gothic Coding와 OFL 원문 해시 일치를 통과했습니다(`qa-output/predeploy-final-check.log`). 검색61개 목적지·키보드/빈값/초기화/IME/이탈 보호·12개 설정 조합 회귀도 통과했습니다(`qa-output/predeploy-final-search.log`). 관련 package/consumer 증거는 predeploy-package-resume.log와 predeploy-final-build.log입니다. 무관한 전체 대형 검사는 재실행하지 않았습니다.

공개 push·Pages·npm 게시 보류는 유지합니다. 실행 환경에 대기 중 승인이나 거부된 필수 작업은 없습니다. 원격 CI/공개0.7.1 파일은 검사하지 않았으며 공개본0.6.0을 바꾸지 않았습니다.

## 남은 화면·파일 후속 확인 (f3ce254 기준)

대규모 검사·패키지 재빌드는 반복하지 않았습니다. 같은 사용자 PC Chrome에서 기존 localhost4175의 실제 문서를 사용했습니다.

- **최종 파일 선택 완료:** 샘플 `review-fictional.txt`만 native chooser로 선택해 확장자TXT / 텍스트 문서(text/plain) / **28 B** 표시를 실제 DOM에서 확인했습니다. 개인 파일이나 서버 전송은 사용하지 않았습니다. 이전의 최종 chooser timeout 항목은 이번 성공으로 해소했습니다. 파일 영역의 픽셀 캡처는 별도의 아래 제한이 남습니다.
- **추가 화면 확인:** 임시 localhost4176에서 동일한 생성 HTML/JS/CSS를 제공하고 관련 없는 main 섹션만 CSS display:none으로 가렸습니다. 이 마스크는 .tooling의 검수 서버에만 있으며 원본·배포 파일에는 없습니다. 333CSSpx 표의 검색/상태/정렬/선택 및 첫 모바일 카드의 실제 캡처를 얻어 간격·줄바꿈·제목/액션 배치·카드 경계를 확인했습니다. 전체 페이지 맥락이나 모든 카드/페이지의 시각 통과를 뜻하지 않습니다. 이미지는 도구 결과에만 표시됐으며 별도 파일로 저장되지 않았습니다.
- **남은 캡처 차단:** 원본 표820×500, 파일293×372 부분 캡처와 섹션 분리 후 데스크톱1180px/페이지 이동 후 캡처에서도 `Page.captureScreenshot`이5000ms 제한에 걸렸습니다. 같은 실패의 반복은 중단했습니다. 데스크톱 표/페이지 footer, 스크롤된 폼·오버레이·날짜/시간·색 적용 및 패키지 중간 섹션의 남은 픽셀 검수는 **미완료**입니다. 기능·치수/DOM 통과를 이 시각 검수 대신 사용하지 않습니다. 다른 정상 캡처 환경이나 도구 복구가 필요하며 승인 부족 때문이 아닙니다.
- **R2 후속 수정:**1643px에서만 보이던 헤더 badge에 v0.7.0이 남아 있었습니다. source/generated index를 v0.7.1로 맞추고 기존 check에 tokens.version과의 일치 guard를 추가했습니다. 관련 작은 버전 검사와 문서 재생성만 수행했으며 Chrome1643px에서 v0.7.1 Draft 및 가로 overflow 없음도 확인했습니다. 패키지·보존 archive·starter 바이트는 f3ce254와 동일합니다.

전체 시각 검수 완료 판정은 계속 보류합니다. 실제 Safari·화면낭독기·물리 기기도 미검증입니다. 필수 작업의 거부나 대기 중 승인은 없고 공개 push·Pages·npm 게시는 수행하지 않았습니다.

## 공개0.7.1 독립 클라우드 검수와 footer 후속 수정

628bdab의 Pages 배포/74개 공개 파일 해시 일치 확인 후, 부모 스레드에서 수행한 독립 클라우드 브라우저 검수 결과를 전달받았습니다. 이 로컬 실행기의 캡처가 복구됐다는 뜻은 아닙니다.

-1180px 데스크톱 라이트와333px 모바일 라이트/다크의 표·페이지 하단·폼 오류·고급 입력·도움말·다이얼로그·색상 예제·S/V 영역에서 중대한 잘림/겹침/가로 넘침 없음. 날짜 방향키/Escape와 시간/VDialog Escape 초점 복귀 통과.
- 따라서 위에 남겼던 해당 대표 화면의 시각 검수 공백은 이 독립 검수 증거로 보완합니다. Safari·실제 터치·스크린리더와 모든 조합의 적합성은 여전히 미검증입니다.
- 확인된 추가 문제는 Overview footer의 v0.7.0 문구1건입니다. 원인은 별도의 하드코딩이며 전체 사이트가 구버전인 것은 아닙니다. footer는 tokens.version으로 렌더하고 header는 같은 값으로 HTML을 생성하도록 바꿨습니다. 실제 footer renderer의 현재/가상 미래 버전 및 생성 header/메타데이터 일치만 좁게 검사했습니다.
- 패키지/보존 archive/starter 내용과 버전은 변경하지 않았습니다(Core0.3.3/UI0.5.1). npm 게시나 다른 앱 변경은 없습니다. 이 수정은 기존 초안 배포 승인 범위로 후속 커밋/Pages 배포합니다.

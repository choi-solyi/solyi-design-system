# 전용 Vue API와 문서 실행 원본 통일

기준: 문서 0.9.1 / `a1a2be8`, Core0.4.1 / Vue UI0.7.1. 0.x 초안이며 1.0.0·npm 게시·이전 산출물 삭제·다른 앱·계정/권한 변경은 하지 않습니다.

## 순서

1. 실제 export25개와 정본 Vue SFC30개를 대조해 아래9개 전용 API 누락을 확인합니다. 폼/검색/편집/화면틀은 앱 상태와 데이터를 연결하는 조합이며 허구의 독립 API로 표시하지 않습니다.
2. 기존 Vue·Core 역할 토큰/클래스·locale를 재사용해9개 API를 구현합니다. 로컬 파일 메타데이터만 처리하고 자동완성 loader는 앱이 주입합니다. disabled/readonly, controlled state, cleanup, 초점과 오류 계약을 정의합니다.
3. 해당 정본 SFC를 전용 API 소비로 바꾸고 문서의 실행 예제도 같은 SFC/설치 패키지를 사용합니다. 프레임에 테마·밀도·모션 정책을 전달하고 같은 origin/source의 높이 메시지만 허용합니다. 설명·앵커·코드 탭은 문서에 유지합니다.
4. 관련 동작/타입/실제 tarball 소비 검사와 한 번의 통합 회귀를 거쳐 Pages로 묶어 게시합니다. 사용자의 Fold/Safari 검수는 기다리며 직접 확인하지 않은 환경을 통과로 적지 않습니다.
5. npm 이름·파일/라이선스·게시 차단 상태를 읽기 전용으로 점검합니다. 사용자가 확정한 공개 준비·MIT 범위를 적용하고, 최종 이름과 실제 게시는 별도로 남깁니다.

## 확인된 누락과 진행표

| 예제 | 전용 API | 현재 상태 |
|---|---|---|
| help | STooltip / SPopover | 조사 완료 · 조합 코드에서 전환 예정 |
| accordion | SAccordion | 조사 완료 · native details 감싼 controlled API 예정 |
| navigation | SBreadcrumbs | 조사 완료 · SDialog drawer/SSnackbar는 이미 제공 |
| inputs | SFileInput / SAutocomplete | 조사 완료 · 날짜 SDatePicker는 이미 제공 |
| identity-progress | SAvatar / SStepper | 조사 완료 · 메뉴/Progress는 이미 제공 |
| chart-tree | SBarChart | 조사 완료 · STree/SDataTable은 이미 제공 |

일반 텍스트·form·ul·SVG 내부 도형 같은 semantic HTML 자체는 API 누락으로 세지 않습니다. 아이콘 path와 색 배지·스켈레톤의 프레임워크 독립 Core CSS는 기존 자산으로 유지하며 이번9개 API를 제공했다는 이유로 모든 문서 요소가 독립 Vue 부품이라고 주장하지 않습니다.

## npm 게시 전 결정

- 2026-10-22 공식 `https://registry.npmjs.org/sol-ui` 조회: HTTP200, versions/dist-tags 없음, `time.unpublished`에 2023-10-25 삭제와 과거 버전 기록이 있습니다. tombstone이므로 이름 사용 가능이나 소유권 확보로 판정하지 않습니다.
- 현재 이름 `@solyi/core` / `@solyi/vue-ui`, `private:true` 게시 차단은 유지하고, 사용자 승인에 따라 자체 재사용 코드만 MIT로 준비합니다. 브랜드 자산은 패키지에서 제외하며 폰트의 원래 고지는 보존합니다. 공개 레지스트리 게시·인증 설정·이름 변경은 실행하지 않습니다.
- 사용자가 정해야 할 사항: 최종 패키지 이름/소유 범위와 실제 게시 인증. 공개 재사용 코드·MIT 범위는 확정되었습니다. 포함 폰트의 OFL과 브랜드 권리는 별도로 보존합니다.

## 검증 기록

- [x] 기존 export/30개 예제 조사, 공식 registry 삭제 이력 확인
- [x]9개 typed API 및 상태/키보드/locale 검사
- [ ] 정본 SFC/문서 실행 연결, 테마/밀도/초점·직접 링크 회귀
- [ ] 두 독립 tarball 소비 앱과 패키지 파일/선언/스타일 검증
- [ ] 묶음 CI/Pages 및 공개 파일 확인
- [ ] 사용자 Fold/Safari 피드백: 대기

## 전역 등록·공통 코드 패널·연결 후속

- 34개 S 컴포넌트와 opt-in global 타입, 실제 starter의 단일 등록을 사용합니다. 30개 정본 SFC의 개별 컴포넌트 import는 제거하고 실제 Vue 함수·타입은 유지합니다.
- 코드 패널은 공통 좌우16px, 탭 왼쪽/복사 아이콘 오른쪽, 실행 링크 footer를 사용합니다. HTML 참고와 Vue의 복사 대상을 분리합니다.
- source 단계9개 API와30개 SFC 런타임은 통과했습니다. 이후 전역/문서 연결·MIT 준비 변경을 포함하는 최종 tarball 소비 및 실제 수정본 픽셀 검수는 아직입니다. 빈 part 오류를 고치고 연결 검사를 재개합니다.
- 배포 전 실제 Chrome 스크린샷을 PC/좁은 폭·라이트/다크에서 확인합니다. 캡처 불가 시 배포 전 차단을 보고합니다. 공개본 캡처에서 code pre padding0을 확인했으나 수정본을 검수한 것으로 간주하지 않습니다.

## 최종 로컬 검증 체크포인트

- 빈 part 제목 조회 TypeError 수정 및 실제 문서 부트스트랩 회귀 통과.34개 API/30개 전역 등록 SFC, 두 독립 설치/타입/빌드/HTTP 업데이트·롤백 검증 통과.
- PC1180 라이트/333 다크 코드 패널·footer 캡처 확인. 새 API의 열림·오류 화면은 Chrome 캡처 시간 초과로 픽셀 검수가 남아 있습니다. 실제 키보드·파일 선택·오류 회복은 확인했으나 시각 검수를 대신하지 않습니다.
- 전체 시각 검수 완료를 배포 조건으로 유지하므로 이번 후보는 미푸시·미배포입니다. 공개본은0.9.1입니다. 상세 검증·제한은 QA.md를 참조하세요.

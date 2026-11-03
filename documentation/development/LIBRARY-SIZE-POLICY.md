# 라이브러리 크기 측정 정책

2026-11-03부터 숫자 용량 한도는 출시·문서 배포를 차단하지 않는다. 사용자 요청에 따라 기존 내부 한도와 파일 해시별 용량 예외를 폐기했다. 성능을 무시한다는 뜻이 아니라, 실제 측정과 변경량을 검토하되 임의 숫자로 기능 수정을 막지 않는 정책이다.

## 도입 근거와 작성 주체

| 커밋 / 날짜(KST) | 당시 변경 | 확인된 근거 |
|---|---|---|
| `a6ad6bf` / 2026-10-22 20:20 | 기존 100,000자 검사를 128,000자 성장 경보로 변경 | 소스 길이만으로 peer runtime 포함 여부를 증명할 수 없다고 명시 |
| `2a402d4` / 2026-10-23 01:22 | 공개 API 증가에 맞춰 176,000자로 변경 | 기능 수 증가에 따른 내부 기준 조정 |
| `4ebfa99` / 2026-10-28 23:28 | 버전별 원본·gzip·총 JS·개별 import 한도 도입 | PURE/tree-shaking 실측에 여유를 더한 내부 경보 |
| `9d7145a` / 2026-10-29 05:02 | 최종 50종 기준; TimeGrid 17,408B 등 추가 | TimeGrid 당시 실측 15,847B; 성능 목표나 플랫폼 한도에 따른 값은 아님 |
| `cfb54c0` / 2026-10-30 17:23 | 1.1.1 기준에 기존 한도 계승 | 별도 외부 제약 없음 |
| `5fee72a` / 2026-10-31 23:03 | 1.1.1 전체 plugin 66→67KiB | 에이전트가 제안한 내부 기준 조정을 사용자가 승인 |
| `841ae86` / 2026-11-03 10:51 | 특정 index 해시에 TimeGrid 56B 예외 | 포커스 수정에 대해 사용자가 허용한 내부 예외 |

Git author는 앞선 두 커밋에서 `choi-solyi`, 이후 `Choi Solyi`다. 이는 저장소에 기록된 작성 명의이며, 사용자가 직접 이 숫자를 설계·입력했다는 증거가 아니다. 작업 중 도입한 내부 기준이며, 사용자가 17KiB를 직접 요구한 기록은 확인되지 않았다. 이후 일부 조정·예외 승인은 있었지만, 최신 사용자는 특별한 근거 없는 용량 차단을 없애라고 지시했다.

검토한 코드·설계 문서에는 이 수치를 특정 기기 응답시간, 메모리, 전송시간 SLO 또는 실제 성능 실패와 연결한 근거가 없다. npm이 이 프로젝트의 UTF-16 문자 수나 peer-external TimeGrid gzip 17KiB를 강제하는 것도 아니다. npm의 업로드 제약 전반이 없다는 주장은 하지 않는다. 공식 [publish 안내](https://docs.npmjs.com/cli/v11/commands/npm-publish/)와 [lifecycle 안내](https://docs.npmjs.com/cli/v11/using-npm/scripts/)를 별도로 확인했다.

## 현재 검사와 보고

- `npm run library:size` 또는 `node scripts/library-size-check.mjs --consumer=qa-output/.../`로 실제 설치본을 측정한다. 과거 명령·결과 경로 호환 때문에 `library-size-budget*.mjs`와 `size-budget-result.json` 이름은 유지한다.
- 원본 문자/bytes/gzip, 모든 배포 JS bytes/gzip, 실제 named import와 전체 plugin의 minified peer-external bytes/gzip을 JSON과 CI 로그에 남긴다. 비교값은 보존한 미게시 `1.1.1-mobile-ui-rc4` 실측이며 npm 1.1.0으로 표시하지 않는다. 증가·감소를 모두 부호 있는 값으로 보고한다. 비교 실측이 없으면 차이를 만들어내지 않는다.
- 활성 설정 `LIBRARY-SIZE-BUDGETS.json`은 공개 API 목록·측정 import·실측 비교값만 담고 `mode: report-only`다. 이전 한도와 예외는 `LIBRARY-SIZE-BUDGETS-HISTORY.json`에 당시 상태로 보존하며 검사에서 읽지 않는다.
- 당시 PURE 비교용 일회성 스크립트의 gzip 50% 감소 조건도 비교 보고로 바꿨다. 실행 AST·SSR·등록 identity·파일 무결성 검사는 그대로다. 이 과거 45종 비교 스크립트는 현재 CI에 연결돼 있지 않다.
- 파일 읽기/번들 생성 실패, 잘못된 측정값, 공개 API 누락·오등록, peer runtime 유입은 계속 실패한다. 타입·빌드·런타임·접근성 회귀·라이선스·무결성·패키지 내용 검사는 그대로 필수다.
- `.github/workflows/pages.yml`의 validate→deploy 의존성은 유지한다. 용량 수치가 커졌다는 이유만으로 validate를 실패시키지 않으며, 그 외 검사 실패는 여전히 배포를 막는다. `continue-on-error`나 검사 생략은 추가하지 않는다.
- UI package의 `prepack`은 기존 가이드 동기화다. 이 저장소의 pipeline은 npm 플랫폼 자체의 한도가 아니며 `prepublishOnly`에 숫자 한도를 옮기지도 않는다.

## 미게시 후보와 공개 반영

기존 1.0.0·1.1.0 릴리즈와 미게시 rc4, 추가 QA tarball은 변경하지 않는다. 메뉴 배치 수정의 최종 QA 설치본은 TimeGrid 17,598B, 전체 plugin 68,544B다. 보존한 rc4 대비 각각 +134B/+103B이며 보고 대상이지 용량 차단이 아니다.

정책 변경과 로컬 검증이 완료돼도 새 후보 재동결·manifest/내부 fixture/문서 동기화, commit/push·CI·공개 배포, 실제 Fold 재검증은 별도 남은 단계다. npm 1.1.1은 사용자 직접 테스트 후 결정할 때까지 게시하지 않는다. 외부 소비 앱도 변경하지 않는다.

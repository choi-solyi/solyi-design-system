# 고정 버전 설치·업데이트·롤백

문서 사이트의 Releases에는 **현재 권장 Core/UI 조합 하나만** 노출합니다. 과거 tarball·manifest·체크섬과 Git 기록은 보존하며, 사용자 화면에서 긴 이전 버전 카드 목록을 표시하지 않습니다.

## 현재 권장 조합

이번 통합 후보는 문서 **0.12.3 / Core 0.4.9 / Vue UI 0.10.3**입니다. 정확한 공개 상태는 해당 커밋의 Actions 최종 결과와 [공개 카탈로그](https://ui.solyi.kr/releases/index.json)로 확인합니다. 이 안내 파일을 작성한 것만으로 URL이 배포됐다고 판단하지 않습니다.

```sh
npm install --save-exact https://ui.solyi.kr/releases/0.12.3/solyi-core-0.4.9.tgz https://ui.solyi.kr/releases/0.12.3/solyi-ui-0.10.3.tgz vue@3.5.44 vuetify@4.3.0
```

패키지 이름은 `@solyi/core`와 `solyi-ui`이며 **npm/GitHub Packages에는 게시하지 않았습니다**. `private:true`는 실수로 게시하는 것을 막는 설정입니다. 선택한 `solyi-ui`의 이름 사용권·소유권은 미확인이고 새 프로젝트 생성 명령도 출시하지 않았습니다.

검증 도구의 기준은 Node 22.23.3, Vue 3.5.44, Vuetify 4.3.0입니다. Node 요구 범위는 `^22.18.0 || >=24.12.0`입니다. 실제 조합과 한계는 [COMPATIBILITY.md](COMPATIBILITY.md), 최초 설정은 [GETTING-STARTED.md](GETTING-STARTED.md)를 참고합니다.

## 무결성과 고정

각 `releases/<문서 버전>/`은 Core/UI tarball 한 쌍, `manifest.json`, `SHA256SUMS`를 포함합니다. manifest의 파일명·크기·SHA-256과 npm 잠금 파일의 SHA-512 integrity를 검사합니다. 해시는 손상 감지 수단이며 별도 서명이나 공급망 인증을 뜻하지 않습니다.

`package.json`과 `package-lock.json`을 함께 커밋하고 반복 설치는 `npm ci --ignore-scripts`를 사용합니다. Core와 UI의 peer 조합을 임의로 섞지 않습니다. Vue/Vuetify를 라이브러리에 중복 번들하지 않습니다.

## 업데이트와 롤백

1. 현재 권장 쌍의 새 URL을 정확히 설치하고 잠금 파일을 갱신합니다.
2. 소비 앱의 타입·회귀·실제 화면 검사를 통과시킨 뒤 그 앱의 승인된 배포 절차를 진행합니다.
3. 문제가 생기면 이전에 보존한 `package.json`과 잠금 파일을 함께 복원한 뒤 `npm ci --ignore-scripts`를 실행합니다.
4. 이전 패키지에 없는 API를 소비 코드에서 사용했다면 해당 소비 코드도 같은 시점으로 복원합니다. 패키지만 바꾸어 호환된다고 가정하지 않습니다.

다른 앱의 자동 업데이트 PR·검사·배포는 아직 연결하지 않았습니다. 자동 변경 대상은 이 저장소의 문서와 starter뿐입니다.

## 유지보수자용 준비 절차

패키지 바이트가 바뀌면 버전을 올리고 소비 앱의 tarball 경로·잠금 파일을 함께 갱신합니다. `npm run library:prepare`는 패키지 생성·두 소비 앱의 타입/동작·starter 빌드·새 쌍 동결·HTTP 설치/업데이트/롤백·문서 검사를 묶어 실행합니다. 기존 동일 버전 쌍의 재검증은 `npm run library:verify`입니다.

이미 존재하는 문서 버전이나 패키지 버전에 다른 바이트를 쓰는 작업은 거절합니다. 실패를 피하려고 과거 파일을 삭제하거나 덮어쓰지 않습니다. 승인된 main 푸시 뒤 기존 validate → Pages deploy를 이용하며 새 registry·credential·권한은 만들지 않습니다.

이전 설치 경로와 변경 사항을 조사해야 할 때는 보존된 카탈로그·manifest·[변경 이력](../../CHANGELOG.md)을 이용합니다. 사용자 최종 승인 전에는 1.0.0을 만들지 않습니다.

## Core 의존성과 npm 게시 전 결정

Vue 3용 `solyi-ui`는 현재 `@solyi/core`를 peer로 사용합니다. 로컬에서는 두 tarball을 한 명령에 명시해 함께 설치합니다. UI 이름 변경이 Core 이름 변경이나 npm 스코프 사용 권한 확보를 뜻하지 않습니다. 레지스트리에서 `npm install solyi-ui`만으로 설치하려면 Core 게시·스코프 권한 또는 배포 구조를 별도로 결정해야 합니다. 이번에는 이름을 임의 변경하거나 npm에 게시하지 않습니다.

### 이전 이름에서 전환

기존 `@solyi/vue-ui`를 설치했다면 기존 Core/UI 조합을 유지한 상태에서 `npm uninstall @solyi/vue-ui`를 먼저 실행합니다. 그런 다음 새 Core/UI tarball 쌍을 함께 설치하고, 코드·타입·CSS의 import를 `solyi-ui`로 바꿉니다. 이름을 바꾸는 도중에 옛 UI와 새 Core가 함께 남으면 npm이 옛 peer 버전을 레지스트리에서 찾을 수 있습니다. 롤백은 반대로 `solyi-ui`를 제거한 뒤 보존된 이전 쌍과 import를 복구합니다. 다른 소비 프로젝트를 자동으로 변경하지 않습니다.

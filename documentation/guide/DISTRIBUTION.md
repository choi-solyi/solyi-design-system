# 설치와 버전 관리

> 현재 개발 문서는 미게시 1.1.1 후보를 검증합니다. npm 안정 버전은 1.1.0입니다. 후보의 새 API를 npm1.1.0에 포함된 기능으로 간주하지 않습니다.

후보 산출물은 루트 package.json의 solyiArtifacts 경로(artifacts/candidates/1.1.1)에 보존합니다. 포장·내부 예제 설치·계약·배포 파일 검사가 같은 경로를 사용합니다. 기존 artifacts의 첫 후보와 release-assets의 게시 원본은 덮어쓰지 않으며, 이미 존재하는 tarball의 바이트가 달라지면 포장 검사가 계속 거부합니다. 이 경로 선택은 검사 생략이나 npm 게시를 실행하지 않습니다.

## 현재 설치 경로

[Getting started의 설치](https://ui.solyi.kr/#start/install)는 solyi-ui 1.1.0의 npm·pnpm 명령과 직접 설치 파일을 제공합니다. 정확한 파일·URL·해시는 현재 패키지 정보를 기준으로 합니다.

공통 스타일·토큰·폰트가 포함된 `solyi-ui`를 설치합니다. Vue와 Vuetify는 peer dependency이며 UI 번들 안에 중복 포함하지 않습니다. Node·Vue·Vuetify 범위는 [호환 안내](COMPATIBILITY.md)를 확인합니다.

```sh
pnpm add solyi-ui
```

npm을 사용하는 앱은 `npm install solyi-ui`를 사용합니다. 기본 설정의 npm(7 이상)과 pnpm은 필요한 Vue·Vuetify peer dependency를 자동 다운로드합니다. pnpm의 격리 구조에서는 다운로드된 peer가 앱의 직접 import 경로에 노출되지 않을 수 있습니다. 새 앱은 다음처럼 직접 사용할 Vue·Vuetify를 함께 추가합니다.

```sh
pnpm add solyi-ui vue vuetify
```

앱의 기존 호환 버전은 유지할 수 있습니다. 자동 peer 다운로드를 끈 환경도 Vue·Vuetify를 직접 설치합니다. 검증한 조합은 Vue 3.5.44·Vuetify 4.3.0입니다. 버전을 생략하면 설치 시점의 최신 배포를 선택합니다. 선택적으로 `--save-exact`를 사용하면 package.json에 ^·~ 범위를 붙이지 않고 특정 버전을 고정합니다. 어느 방법이든 반복 설치는 lockfile로 재현합니다.

## 무결성과 반복 설치

`releases/1.1.0/`에는 solyi-ui tarball, `manifest.json`, `SHA256SUMS`가 있습니다. [현재 패키지 정보](https://ui.solyi.kr/releases/index.json)의 버전과 해당 버전 manifest에서 파일명·크기·SHA-256 및 npm lockfile의 SHA-512 integrity를 확인합니다.

PowerShell에서 파일을 내려받은 뒤 해시를 비교할 수 있습니다.

```powershell
Get-FileHash 파일명.tgz -Algorithm SHA256
```

해시는 파일 손상 확인 수단이며 라이선스나 공급망 안전성 전체를 보증하지 않습니다. package.json과 lockfile을 함께 저장하고 반복 설치는 다음 명령을 사용합니다.

```sh
npm ci --ignore-scripts
```

기존 `releases/1.0.0/` 다운로드와 원본 해시는 보존합니다. [버전별 변경 이력](../../CHANGELOG.md)과 [GitHub Releases](https://github.com/choi-solyi/solyi-design-system/releases)는 게시된 1.0.0·1.1.0의 누적 이력을 제공합니다.

## 업데이트

1. [변경 이력](https://ui.solyi.kr/#releases/changelog)과 사용하는 컴포넌트의 API를 확인합니다.
2. [현재 권장 설치 명령](https://ui.solyi.kr/#start/install)으로 solyi-ui 버전을 함께 갱신합니다.
3. 소비 앱의 타입·키보드 동작·테마·대표 화면 검사를 통과한 뒤 그 앱을 배포합니다.
4. 소비 코드와 package.json·lockfile을 같은 변경으로 저장합니다.

라이브러리 수정만으로 소비 앱이 자동 업데이트되거나 배포되지는 않습니다. 자동 업데이트를 도입하는 앱은 각자의 테스트와 배포 정책을 별도로 연결해야 합니다.

## 앱 설정과 지원 범위

사용자는 사이트의 [Getting started](https://ui.solyi.kr/#start/install)만으로 설치·등록·자동 import·폼·업데이트 순서를 읽고 코드를 복사할 수 있습니다. 권리와 제삼자 고지는 [Licensing](https://ui.solyi.kr/#licensing)에서 확인합니다.

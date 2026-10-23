# 설치·업데이트·롤백

## 현재 설치 경로

[Getting started의 설치](https://ui.solyi.kr/#start/install)는 **현재 권장 solyi-ui 버전**의 npm·pnpm 명령과 다운로드를 제공합니다. 버전과 tarball URL은 릴리스 카탈로그로부터 생성되므로 이 문서에 별도 버전 숫자를 반복하지 않습니다.

공통 스타일·토큰·폰트가 포함된 `solyi-ui`를 설치합니다. Vue와 Vuetify는 peer dependency이며 UI 번들 안에 중복 포함하지 않습니다. Node·Vue·Vuetify 범위는 [호환 안내](COMPATIBILITY.md)를 확인합니다.

```sh
npm install --save-exact solyi-ui vue@3.5.44 vuetify@4.3.0
```

pnpm을 사용하는 앱은 `pnpm add --save-exact`에 같은 패키지 조합을 전달합니다. Vue·Vuetify는 앱과 공유하는 peer dependency로 유지합니다.

## 무결성과 반복 설치

각 `releases/<문서 버전>/`에는 solyi-ui tarball, `manifest.json`, `SHA256SUMS`가 있습니다. [릴리스 카탈로그](https://ui.solyi.kr/releases/index.json)에서 현재 권장 조합을 찾고 manifest의 파일명·크기·SHA-256 및 npm lockfile의 SHA-512 integrity를 확인합니다.

PowerShell에서 파일을 내려받은 뒤 해시를 비교할 수 있습니다.

```powershell
Get-FileHash 파일명.tgz -Algorithm SHA256
```

해시는 파일 손상 확인 수단이며 라이선스나 공급망 안전성 전체를 보증하지 않습니다. package.json과 lockfile을 함께 저장하고 반복 설치는 다음 명령을 사용합니다.

```sh
npm ci --ignore-scripts
```

## 업데이트

1. [변경 이력](https://ui.solyi.kr/#releases/changelog)과 사용하는 컴포넌트의 API를 확인합니다.
2. [현재 권장 설치 명령](https://ui.solyi.kr/#start/install)으로 solyi-ui 버전을 함께 갱신합니다.
3. 소비 앱의 타입·키보드 동작·테마·대표 화면 검사를 통과한 뒤 그 앱을 배포합니다.
4. 소비 코드와 package.json·lockfile을 같은 변경으로 저장합니다.

라이브러리 수정만으로 소비 앱이 자동 업데이트되거나 배포되지는 않습니다. 자동 업데이트를 도입하는 앱은 각자의 테스트와 배포 정책을 별도로 연결해야 합니다.

## 롤백

직전 정상 버전의 **소비 코드·package.json·lockfile**을 함께 복원하고 재설치합니다. 패키지 파일만 되돌리면 새 API를 사용한 소비 코드와 맞지 않을 수 있습니다.

```sh
npm ci --ignore-scripts
npm exec vue-tsc -- --noEmit -p tsconfig.json
npm exec vite build
```

## 배포하는 개발자를 위한 검사

`npm run library:prepare`는 패키지 pack, 별도 소비 앱 타입·동작, starter 빌드, 사이트 연결, HTTP 설치·업데이트·롤백을 검사하는 저장소 명령입니다. 최종 파일을 재검증하는 명령은 `npm run library:verify`입니다. 이 명령은 npm 게시 명령이 아닙니다.

사용자는 사이트의 [Getting started](https://ui.solyi.kr/#start/install)만으로 설치·등록·자동 import·폼·업데이트 순서를 읽고 코드를 복사할 수 있습니다. 권리와 제삼자 고지는 [Licensing](https://ui.solyi.kr/#licensing)에서 확인합니다.

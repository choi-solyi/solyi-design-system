# 독립 Vue / Vuetify starter

이 예시는 Core 토큰을 Vue/Vuetify의 Button·Field·Dialog에 매핑하는 출발점입니다. 기존 aion2page·solyi.kr에 적용하지 않았고 실제 서버·계정·업로드가 없습니다.

Node `^22.18.0 || >=24.12.0`과 npm을 사용합니다. 공식 Vue/Vite 문서와 이 lockfile의 요구사항을 함께 확인하세요.

```sh
cd examples/vue-vuetify
npm ci
npm run dev
npm run build
```

`src/core/tokens.json` / `tokens.css`는 저장소 루트의 같은 토큰 스냅샷입니다. 저장소 전체에서 갱신할 때 루트의 `node scripts/sync-starter.mjs`를 실행하고 다시 빌드합니다. 폴더만 복사해도 포함된 토큰으로 실행 가능합니다. Core 파일을 직접 덮어쓰기보다 앱 전용 토큰 또는 adapter.css에 매핑을 작성하세요.

- `main.js`: 세 테마/두 모드의 Vuetify colors 매핑. `createVuetify` 등록은 사용한 네 컴포넌트만 명시합니다.
- `App.vue`: 필수·길이 오류와 값 보존, 결과 안내, Dialog 활성화 슬롯과 포커스 반환.
- `adapter.css`: Button 36/44px, Field 40/44px, 의미색·경계·포커스·backdrop 매핑. 외부 폰트/아이콘 서비스 없음.
- `THIRD-PARTY-NOTICES.txt`: 설치된 패키지 원본 라이선스와 버전. 각 의존성의 권리를 보존합니다.

검증한 정확한 패키지는 package.json/lockfile에 고정합니다. Vuetify 3 등 다른 버전은 검증하지 않았습니다. 앱의 라우터·비동기 요청·보안·데이터 수명은 별도로 연결하고 검증해야 합니다. 이 문서 사이트의 모든 데모가 자동으로 Vuetify 컴포넌트가 되는 것은 아닙니다.

공식 근거: [Vue Quick Start](https://vuejs.org/guide/quick-start.html), [Vuetify installation](https://vuetifyjs.com/en/getting-started/installation/), [Vite guide](https://vite.dev/guide/). 라이선스 고지는 원본 패키지의 조건을 따릅니다.

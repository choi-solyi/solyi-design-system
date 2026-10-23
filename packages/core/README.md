# @solyi/core 0.4.4

프레임워크 독립 토큰·CSS·helper의 **로컬 npm pack 초안**입니다. `private:true`로 실제 npm 게시를 막고 있으며 레지스트리에 게시하지 않았습니다. 자체 코드는 MIT, 포함한 폰트와 외부 자산은 원래 라이선스입니다.

원본은 저장소의 `tokens.json`, `site/components.css`, `site/overflow.js`, `site/icons.js`입니다. 생성한 `dist/`를 직접 수정하지 않습니다.

```js
import '@solyi/core/fonts.css'; // 선택: Wanted Sans, 원문 OFL 보존
import '@solyi/core/code-fonts.css'; // 선택: JetBrains Mono + Nanum Gothic Coding
import '@solyi/core/tokens.css';
import '@solyi/core/components.css';
import {tokens, coreVersion} from '@solyi/core';
import {mountOverflowText} from '@solyi/core/overflow';
import {solIcon, solIconPaths} from '@solyi/core/icons';
```

html의 `data-theme="violet|sage|sand"`, `data-mode="light|dark"`, `data-density="comfortable|compact"`를 설정합니다. 버튼 반경 6px·입력 10px·카드/작은 팝업 12px·다이얼로그/큰 패널 16px 역할을 공유합니다. CSS는 명시적으로 한 번 불러오며 reset·라우터·문서 셸·저장 기능을 설치하지 않습니다. JSON export는 DTCG 호환 포맷을 표방하지 않습니다.

- `mountOverflowText(root)`: 잘린 데이터 제목에 툴팁·전체 보기 동작을 연결합니다. 기존 링크·버튼의 클릭 행동을 보존하고 반환한 정리 함수를 unmount 전에 호출합니다.
- `solIcon`·`solIconPaths`: 문서와 같은 16/20/24px 선 UI 아이콘입니다. 브랜드 로고와 별개이며 장식 아이콘은 보조 기술에서 숨기고 행동 버튼에 이름을 제공합니다.
- `@solyi/core/date`: date-only와 HH:mm의 순수 계산 함수입니다. DOM·서버 예약·시간대 변환 기능을 뜻하지 않습니다.
- `fonts.css`: 공식 Wanted Sans 1.0.3 WOFF2/CSS와 고정 출처·해시·OFL을 함께 제공합니다. 적용하지 않거나 로드가 실패하면 시스템 fallback을 사용합니다.
- `code-fonts.css`: JetBrains Mono 2.304 → Nanum Gothic Coding 2.000 → monospace입니다. 원본 WOFF2/TTF·OFL·출처·해시를 보존하며 완전한 한글 TTF는 약 4.56MB입니다.

로고·캐릭터·favicon·개인 콘텐츠·프레임워크 런타임은 이 패키지에서 제외합니다. MIT는 폰트를 재라이선스하거나 브랜드 권리를 부여하지 않습니다. [라이선스 범위](https://github.com/choi-solyi/solyi-design-system/blob/main/LICENSE-SCOPE.md), [설치·업데이트](https://github.com/choi-solyi/solyi-design-system/blob/main/documentation/guide/DISTRIBUTION.md), [폰트](https://github.com/choi-solyi/solyi-design-system/blob/main/documentation/guide/FONT.md)를 확인하세요.

## 소비 프로젝트 AI 지침

패키지의 `DESIGN.md`는 소비 앱의 UI 지침입니다. 프로젝트 루트로 복사하고 AI 도구의 프로젝트 지침에서 참조하세요. 파일명만으로 자동 적용되지는 않습니다. 두 패키지와 문서 사이트는 루트의 같은 원본을 사용합니다.

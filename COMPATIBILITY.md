# 검증과 호환 범위

- Core는 프레임워크 독립 CSS custom properties와 Solyi 단순 JSON export입니다. DTCG 포맷 준수나 모든 앱 호환을 표방하지 않습니다.
- 문서 데모는 현대 브라우저의 ES modules·native dialog·AbortController·container queries를 사용합니다. 지원 브라우저의 최저 버전을 인증하지 않았습니다. 실제 검증 환경과 한계는 QA.md에 구분합니다.
- 독립 starter는 Vue **3.5.44**, Vuetify **4.3.0**, Vite **8.3.4**, @vitejs/plugin-vue **6.0.10**을 고정합니다. Vuetify 3·다른 버전·React를 검증한 것이 아닙니다. Node `^22.18.0 || >=24.12.0`을 요구하며 이번 빌드는 공식 Node 22.23.3 Windows x64를 작업 폴더 안에서만 사용합니다.
- 모든 npm 의존성은 공식 registry와 package-lock의 integrity로 고정합니다. 원본 라이선스·저작권은 THIRD-PARTY-NOTICES.txt에 보존합니다. 브랜드 자산에는 별도 출처·권리 기록을 적용합니다.
- Button/Field/Dialog만 starter의 매핑 범위입니다. 다른 문서 데모가 자동으로 Vuetify 컴포넌트가 되는 것은 아닙니다.
- 화면 낭독기, forced colors, 400% 확대, 실제 폴드 기기, OS 다운로드 저장, 외부 파일 드래그는 완료로 간주하지 않습니다. 기본 모션 시각·실제 탭 숨김/복귀의 이전 한계도 QA 기록을 따릅니다.
- 기존 aion2page·solyi.kr 또는 실데이터·계정·권한은 변경하지 않습니다. 운영 앱의 도입은 별도 검토가 필요합니다.

폐기/이행 규칙은 CHANGELOG.md를 따릅니다. 어댑터 업데이트 시 라이브러리 내부 선택자, 모달 포커스, 오류 메시지 연결, 각 테마의 실제 픽셀 대비를 다시 확인합니다.

- 0.2.3 모서리: 앱에는 radius-control/card/panel/small/inset 역할을 권장합니다. 기초 스케일 radius-md는 12→10px, radius-lg는 16→20px로 변경했고 radius-xl 28px를 추가했습니다. 예전 스케일에 직접 의존한 앱은 변경 전 확인이 필요합니다. 문서·공유 CSS·독립 starter를 같은 Core로 갱신했으며 기존 운영 앱에는 적용하지 않았습니다.

- 0.2.5: radius-button 역할은 v0.2.2 버튼의6px입니다. 기본/메뉴 항목/파일 선택/문서 메뉴 버튼/페이지·진행률·starter 버튼에 연결합니다. radius-control10px, card20px, panel28px는 유지합니다. 원형 스위치/로딩 표식과 순수 내비게이션 링크 규칙은 이번 버튼 복원 대상이 아닙니다.
- 말줄임은 sol-record-title/sol-ellipsis 범위에만 적용합니다. overflow.js는 잘린 비대화형 제목에 전체 보기 버튼을 추가하고, 기존 링크·버튼의 클릭 행동을 바꾸지 않습니다. body/textarea에는 적용하지 않습니다. 프로그레스 unknown은 aria-valuenow와 퍼센트를 표시하지 않습니다.

## 0.3.1 패키지 초안

Core/Vue UI0.1.1은 로컬 tarball만 검증한 private 패키지입니다. 실제 설치 조합/4개 API/외부 d.ts 검사 한계·업데이트/롤백·자동 변경 대상은 LIBRARY.md를 따릅니다. 기존 Core 복사 snapshot은 starter에서 import하지 않으며 실제 설치된 Core가 원본과 일치하는지 검사합니다. 문서의 나머지 부품은 HTML/CSS/JS 참고 예시입니다.

## 0.3.2 카드 반경

radius-card는12px입니다. radius-lg 기초값20px와 새 radius-floating20px는 유지해 카드 변경이 메뉴/팝오버/달력/시간 패널로 번지지 않게 했습니다. 버튼6/입력10/큰 패널28/보조 inset10은 그대로입니다. Core/Vue UI local pack0.1.2를 같은 tarball 소비 흐름으로 검증하며 다른 앱은 자동 변경되지 않습니다.

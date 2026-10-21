# 검증과 호환 범위

- Core는 프레임워크 독립 CSS custom properties와 Solyi 단순 JSON export입니다. DTCG 포맷 준수나 모든 앱 호환을 표방하지 않습니다.
- 문서 데모는 현대 브라우저의 ES modules·native dialog·AbortController·container queries를 사용합니다. 지원 브라우저의 최저 버전을 인증하지 않았습니다. 실제 검증 환경과 한계는 QA.md에 구분합니다.
- 독립 starter는 Vue **3.5.44**, Vuetify **4.3.0**, Vite **8.3.4**, @vitejs/plugin-vue **6.0.10**을 고정합니다. Vuetify 3·다른 버전·React를 검증한 것이 아닙니다. Node `^22.18.0 || >=24.12.0`을 요구하며 이번 빌드는 공식 Node 22.23.3 Windows x64를 작업 폴더 안에서만 사용합니다.
- 모든 npm 의존성은 공식 registry와 package-lock의 integrity로 고정합니다. 원본 라이선스·저작권은 THIRD-PARTY-NOTICES.txt에 보존합니다. 브랜드 자산에는 별도 출처·권리 기록을 적용합니다.
- Button/Field/Dialog만 starter의 매핑 범위입니다. 다른 문서 데모가 자동으로 Vuetify 컴포넌트가 되는 것은 아닙니다.
- 화면 낭독기, forced colors, 400% 확대, 실제 폴드 기기, OS 다운로드 저장, 외부 파일 드래그는 완료로 간주하지 않습니다. 기본 모션 시각·실제 탭 숨김/복귀의 이전 한계도 QA 기록을 따릅니다.
- 기존 aion2page·solyi.kr 또는 실데이터·계정·권한은 변경하지 않습니다. 운영 앱의 도입은 별도 검토가 필요합니다.

폐기/이행 규칙은 CHANGELOG.md를 따릅니다. 어댑터 업데이트 시 라이브러리 내부 선택자, 모달 포커스, 오류 메시지 연결, 각 테마의 실제 픽셀 대비를 다시 확인합니다.

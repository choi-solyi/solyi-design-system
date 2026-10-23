import {renderAiGuide} from './ai-guide.js';

export function renderAdoption(h) {
  return renderAiGuide(h) +
    h.section('locale', '공통 locale', '문구와 날짜·숫자 표시를 한 provider에서 바꿉니다.',
      '<div class="sol-card sol-stack"><p><code>provideSolLocale(app, source)</code>는 locale 코드·부분 override·ref·getter를 받습니다. 입력·대화상자·표·날짜가 같은 값을 사용하며 언어 변경은 선택값이나 검색어를 임의로 지우지 않습니다.</p><p>ko-KR/en-US와 왼쪽에서 오른쪽으로 읽는 방향을 지원합니다. 날짜 모델은 ISO date-only, 시간 모델은 HH:mm을 유지하며 표시 문구만 locale에 따라 바뀝니다. 모든 언어·RTL 지원을 의미하지 않습니다.</p><div class="button-row"><a class="sol-button" href="./starter/#locale-demo">locale 실행 예제</a><a href="#component/stext-field">입력 API</a><a href="#component/sdata-table">표 API</a></div></div>') +
    h.section('starter', '프로젝트에서 사용하기', '실제 설치한 패키지의 화면과 API를 함께 확인합니다.',
      '<div class="sol-card sol-stack"><h3>Vue 소비 예제</h3><p>공통 스타일이 포함된 solyi-ui를 설치하고 Vue·Vuetify는 peer로 연결합니다. 공통 CSS·폰트·테마와 실제 S 컴포넌트 등록을 사용하는 실행 화면입니다.</p><div class="button-row"><a class="sol-button primary" href="./starter/">패키지 데모</a><a class="sol-button" href="./starter/?view=recipes">용도별 사용 예제</a><a href="#start/install">설치부터 시작하기</a></div><p class="sol-hint">확인한 도구는 Vue 3.5.44·Vuetify 4.3.0·Vite 8.3.4입니다. 모든 peer 버전이나 다른 프레임워크의 동작을 보장하지 않습니다.</p></div>') +
    h.section('advanced-vue', '선택·행동·화면 분할', '상황에 맞는 상호작용을 실제 패키지로 확인합니다.',
      '<div class="sol-card sol-stack"><p>SegmentedControl은 짧은 단일 선택, MultiSelect는 검색과 태그 선택, RangeSlider는 양 끝 범위를 다룹니다. SplitButton·ContextMenu는 행동 메뉴를 제공하며 SplitPane은 좁은 화면에서 두 영역을 세로로 배치합니다.</p><div class="button-row"><a class="sol-button" href="./starter/#advanced-title">실행 예제</a><a href="#component/ssegmented-control">컴포넌트별 Examples / API</a></div></div>') +
    h.section('versioning', '업데이트와 호환', '실제 사용하는 컴포넌트 계약과 설치 조합을 함께 확인합니다.',
      '<div class="sol-card sol-stack"><p>문서 v'+h.version+'의 패키지 설치 정보는 <a href="#start/install">현재 권장 조합</a>에서 확인합니다. solyi-ui를 갱신하고 소비 앱의 코드·lockfile과 함께 검증합니다.</p><p>새 API와 동작 변경은 <a href="#releases/changelog">변경 이력</a>과 각 컴포넌트 API에 기록합니다. 업데이트와 롤백 절차는 <a href="#start/update">Getting started</a>에서 이어집니다.</p></div>');
}

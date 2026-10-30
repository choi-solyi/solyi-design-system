# 7·8번 개발 상태

전용 개발 브랜치에 보존한다. 중간 main push/공개 배포/npm 게시/소비 앱 업데이트는 하지 않는다. 최종 목표는 전체 요구를 반영한 1.1.1 후보 준비이며 현재 예제의 설치 기준은 공개 1.1.0이다.

## 7 — NumberInput과 Range 직접 입력

- `controls.ts`에서 기존 감소·증가 버튼을 입력의 같은 쪽 stepper 그룹으로 이동했다. 단위는 입력과 그룹 사이에 유지한다. model/props/events/expose, min 기준 step 계산과 직접 입력 처리는 바꾸지 않았다.
- `styles.css`는 기존 control-height/space 토큰으로 그룹을 배치한다. RTL에서는 논리적 끝 쪽으로 이동한다. clear action의 키보드 순서도 보존한다.
- 실제 개발 tarball을 별도 QA 소비 앱에 설치해 빌드 JS 바이트 일치를 확인했다. `number-browser-check.mjs`와 `fixtures/number-browser.ts`가 재현 가능한 소비 fixture다.
- PC/violet, 390px/sage dark compact, 390px/sand RTL의 세 경우에서 버튼 인접·한쪽 배치, 터치 크기, min/max/step, 잘못된 직접 입력 거부, ArrowUp/Down, FormData 제출, Range 양 끝값 직접 입력·thumb 연동, readonly/disabled를 실제 확인했다.
- `number-input-step-check.mjs`의 기존 소수/부호/offset/상태 39개 전이와 소비 fixture 타입 검사도 통과했다.
- 근거: `qa-output/number-browser/number-observations.json`, `number-*.png`, `qa-output/improvements-30/number-{browser,step-runtime,consumer-types,package-build}.log`.

## 8 — 선택 컨트롤 예제 소유와 의미

- Checkbox, RadioGroup, Switch, Select에 각각 전용 SFC와 Components/Sample Code/starter 연결을 부여했다. RadioGroup에는 radio만, Checkbox에는 독립 checkbox만, Select에는 select만 둔다.
- Switch는 사용자 요청대로 별도 Checkbox 선택과 즉시 Switch 설정을 이름·역할·상태로 명확히 비교한다. 외부 라벨+hideLabel 예제도 유지한다. 공개 컴포넌트/API를 합치거나 삭제하지 않는다.
- 기존 `choices`/`selection` 조합의 직접 URL과 starter 메뉴는 보존한다. 이 둘은 inventory에 명시한 standalone 조합으로 남기고 Components의 전용 예제를 다시 혼합하지 않는다. 문서 canvas 검사는 이 정확한 두 예외만 허용하고, 모든 40개 SFC 실행/메뉴 도달성 검사는 별도로 유지한다.
- 타입·문서 빌드·소유/negative assertion·40개 실제 SFC mount/ARIA/기능·메뉴 검사가 통과했다. 실제 Chrome에서 3테마/PC·390px 12개 페이지의 독립 선택, native radio 방향키/disabled 건너뛰기, switch Space, 중복 없는 접근성 이름과 Sample Code의 역할 일치를 확인했다.
- 근거: `qa-output/improvements-30/selection-{browser-observations.json,browser.log,runtime.log,navigation.log,document-inventory.log,ownership-check.log,recipes-types.log}` 및 `selection-*.png`.

물리 기기·스크린리더 검증은 미실행이다. 7번의 새 패키지 렌더링은 로컬 개발 tarball에서 검증했고, 8번의 기존 API 사용 예제는 frozen 1.1.0 소비 경로에서 검증했다. 최종 1.1.1 후보의 통합 검증과 한 번의 반영은 전체 작업 후 수행한다.

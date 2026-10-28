# 미게시 ESM 크기 증가 · 출시 차단 유지

1815de3의 새 tarball은 기존 176,000자 ESM 한도를 넘었습니다. [설치 검증](SORTABLE-INSTALLED-VALIDATION.md)의 측정은 Vite/Node/lock 조건이 같은 실제 빌드 두 개를 비교한 값입니다.

| 빌드 | index.js 문자 | bytes | gzip bytes |
|---|---:|---:|---:|
| d1b20d2 입력 확장 | 169,955 | 171,775 | 44,173 |
| 1815de3 Sortable 공개 | 186,673 | 188,716 | 48,705 |
| 증가 | 16,718 | 16,941 | 4,532 |
| Sortable 항목별 disabled + MonthCalendar 모바일 보완 | 200,955 | 203,209 | 52,379 |

마지막 행은 실제 로컬 source 빌드 측정입니다. 176,000자보다 24,955자 크며 여전히 출시 차단입니다. 새 tarball 설치를 완료했다는 의미는 아닙니다.

주된 새 runtime은 Sortable의 identity snapshot, controlled/포커스/lifecycle과 pointer capture·취소·자동 스크롤입니다. 새 runtime 의존성이나 framework bundling을 추가하지 않았고 vite.config.js의 Vue/Vuetify external predicate와 Core 경로는 유지했습니다. 문자 한도는 peer 외부화의 증거를 대신하지 않으며, 기존 source growth 경보입니다.

이 한도와 동결 1.0.0 hash gate는 모두 출시 차단입니다. 검사 위치 변경은 자동 승인 검토가 거부해 적용하지 않았고 재시도하지 않습니다. 한도 상향·삭제, 새 gate로 대체, 파일을 나누어 index만 작게 보이게 하는 변경은 하지 않습니다. 새 Calendar 구현·테스트가 통과해도 출시 가능으로 표현하지 않습니다.

최적화 후보는 날짜 formatter/키보드 계산 및 여러 포인터 컴포넌트의 중복 lifecycle을 실제로 공통화하는 방법입니다. DatePicker와 Calendar는 기존 Core date-only 및 locale formatter를 재사용합니다. capture/cancel cleanup, 이벤트별 제안 배열 복사, 외부 변경 검사는 계약을 지키는 코드이므로 크기만을 위해 제거하지 않습니다. 공통화는 TimePicker/SplitPane/Sortable에 영향을 주므로 기존 취소·포커스·폼·터치 회귀 검증이 필요합니다.

현재 이 기록은 원인과 영향 범위 분석이며 번들 최적화를 적용하거나 한도를 통과한 결과가 아닙니다. 이후 실제 총 runtime/gzip과 tree-shaking 결과를 같은 조건에서 비교하고, 동작 계약을 보존한 감소가 확인되는 변경만 별도로 채택합니다.

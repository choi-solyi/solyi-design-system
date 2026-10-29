# 1.1.0 최종 포함 범위의 크기 기준

사용자가 승인한 PURE 적용·새 버전 기준 정리의 후속입니다. 1.0.0의 38종·176,000자 한도와 동결 파일은 변경하지 않습니다. 초기 1.1.0 예산은 c440b03의 45종용이었으며 이후 승인된 Picker·Dialog와 ConfirmAction/EmptyState/LoadingOverlay/Pagination/TimeGrid를 모두 포함한 **정확히 50종**으로 범위를 확정합니다. 새 API 추가 시 이 집합 검사에서 다시 실패합니다.

실제 npm pack tarball을 격리 설치해 Vite 8.3.4, production minify, Node gzip level 9로 측정했습니다. CSS·Vue·Vuetify를 제외한 컴포넌트 코드 크기이며 앱 전체 전송 크기와 다릅니다. 측정된 peer module 포함 수는 모든 probe에서 0입니다. [원시 결과](FINAL-SIZE-RESULT.json)를 따릅니다.

| 측정 | 45종 PURE 기준 | 최종 50종 | 최종 한도 |
|---|---:|---:|---:|
| index 문자 | 224,107 | 284,688 | 300,000 미만 |
| index gzip bytes | 56,882 | 72,206 | 76,800 |
| 모든 JS bytes | 243,969 | 312,718 | 330,000 |
| 모든 JS 개별 gzip 합 | 63,078 | 79,475 | 83,968 |
| 전체 plugin gzip | 51,328 | 64,919 | 67,584 |
| 개별 SIcon gzip | 6,316 | 7,098 | 기존 8,192 유지 |
| 개별 SCombobox gzip | 11,933 | 12,713 | 기존 14,336 유지 |

전체 plugin의 증분은 13,591 gzip bytes이며 모든 기능을 전역 등록할 때의 비용입니다. 개별 SIcon에는 SIcon 하나, Combobox에는 필요한 SIcon/SForm/Combobox만 남고 Calendar/TimeGrid/Loader는 남지 않습니다. 별도 entry로 옮겨 index만 줄이지 않았으며 Vue/Vuetify peer와 Core 내부 포함 정책도 유지합니다.

새 개별 import 한도는 TimeGrid 17,408(실측15,847), Calendar 13,312(11,873), Pagination 9,216(8,781), ConfirmAction 8,192(7,859), LoadingOverlay 13,312(12,335) bytes입니다. 범위가 커진 전체 기준은 약 4–6%의 수정 여유만 두었고 기존 작은 import 한도는 유지했습니다. 새 기능을 빼거나 실패한 측정만 제외한 값이 아닙니다. 원본 버전별 검사 위치는 유지하며 raw/gzip/전체 JS/개별 import 초과·미등록 버전·다른 API 집합을 거부하는 경계 검사도 통과했습니다.

이 측정은 게시 성공 증거가 아닙니다. 최종 불변 artifact·전체 pipeline과 registry 인증/게시/registry 설치는 별도 완료 조건입니다. 원본 최적화 이후 setup·watch·타이머에 PURE를 추가하지 않았습니다.

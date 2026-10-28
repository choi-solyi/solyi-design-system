# 문서 Examples·Sample Code 모서리 검증

대상은 Button 문서의 #component/sbtn입니다. 사용자 첨부 Library 두 건은 메타데이터와 OCR 조회에 성공했고 공식 materialization 준비도 완료했습니다. 다만 D25019의 WindowsApps python3.exe 실행이 ResourceUnavailable로 실패하여 공식 전송 helper를 실행하지 못했습니다. 이미지 픽셀 다운로드·검증은 미실행이며 helper 수정·임의 다운로드·대체 전송 우회는 하지 않았습니다. 첨부 픽셀과 일치한다고 주장하지 않고 독립적으로 재현한 로컬 브라우저 증거를 기준으로 수정했습니다.

## 재현과 원인

| 영역 | 수정 전 실제 값 | 영향 | 좁은 수정 |
|---|---|---|---|
| Examples 안 SCard | surface, radius-card 12px, overflow visible | 카드 자체 모서리는 정상 | 패키지 SCard 스타일 유지 |
| iframe 바깥 요소 | surface 배경, radius 0 | 사각 iframe 바탕이 남음 | 문서 recipe frame 배경을 transparent로 변경 |
| iframe html/body/VApp | canvas 배경, radius 0 | 둥근 SCard 바깥에 사각 canvas 색이 보임 | 기존 body.starter-embed marker에서만 세 배경을 transparent로 변경 |
| Sample Code 부모 | surface-alt, inset radius 10px, border 1px | 둥근 테두리의 기준 | 부모 overflow visible 유지 |
| Sample Code toolbar | surface 배경, radius 0 | 자식 배경이 둥근 상단 테두리를 덮어 모서리가 비어 보임 | 첫 code-body의 첫 toolbar에 부모 radius에서 border를 뺀 안쪽 모서리 적용 |

코드 toolbar와 부모의 서로 다른 표면색 자체는 코드·도구 구분을 위한 기존 디자인입니다. 사각 자식 배경이 둥근 테두리를 덮는 부분이 결함이었습니다. iframe canvas의 사각 잔여도 패키지 카드의 의도된 모서리가 아닙니다. 검사한 관련 래퍼와 pseudo-element에서 별도 모서리 장식을 찾지 못했습니다.

CSS는 examples/vue-vuetify/src/adapter.css의 embed 조건과 site/docs.css의 문서 frame/코드 toolbar에 한정했습니다. 일반 starter의 canvas 배경은 바꾸지 않고, 전역 overflow:hidden·clip-path·카드 mask를 추가하지 않았습니다. 패키지 SCard·popover·focus 토큰도 변경하지 않았습니다.

## 검증 범위

[브라우저 검사](../../scripts/card-surfaces-browser-check.mjs)는 실제 로컬 문서와 설치 tarball starter를 새 격리 Chrome으로 엽니다. 320/768/1440 × 3테마 × 2모드 × 2density, 총 36개 조합에서 다음을 확인했습니다.

- iframe html/body/VApp 및 frame 배경 transparent, 내부 카드 surface/radius 유지.
- 카드·문서 래퍼 overflow visible, 키보드 focus-visible와 tooltip 표시 유지.
- Sample Code toolbar 안쪽 radius가 부모 radius-border와 일치. 동일 공통 코드 래퍼 42개에 같은 규칙 적용.
- 좁은 화면 문서 가로 overflow 없음. light/dark Examples·Sample Code 실제 캡처 확인.

기존 vue-code-panel-check, vue-preview-integration-check, embed-height-check도 통과했습니다. 30개 문서 실행 예제의 iframe/탭/원본 SFC/링크/height 계약을 보존했습니다. 물리 기기·화면 낭독기는 미검증입니다.

수정 전 자체 캡처와 geometry는 qa-output/card-local/, 수정 후 report·캡처는 qa-output/card-surfaces-browser/에 있습니다. 공개 사이트·npm에는 배포하지 않았습니다. [UI 데모·starter 반영 기록](STARTER-UPDATES-VALIDATION.md)과 별도 로컬 커밋으로 구분합니다.

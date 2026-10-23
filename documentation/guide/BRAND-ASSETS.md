# 사이트 브랜드 자산

사이트는 [공식 Solyi Brand Assets](https://choi-solyi.github.io/solyi-brand-assets/)의 Production Assets를 사용합니다. 출처 저장소는 [choi-solyi/solyi-brand-assets](https://github.com/choi-solyi/solyi-brand-assets), 기준 커밋은 `16594ecf68e40df33bbae0773083abca98176aa5`입니다.

## 헤더 심볼

공식 [sparkle--master.svg](https://choi-solyi.github.io/solyi-brand-assets/01-Production-Assets/00-Core/sparkle--master.svg)를 `site/brand-sparkle.svg`로 원본 바이트 그대로 사용합니다.

- 원본 비율 512×512와 색 `#91A99A`를 유지합니다.
- 라이트·다크에서 같은 원본을 사용하며 필터·재색칠·배경 합성을 하지 않습니다.
- 옆의 사이트명과 홈 링크가 이름을 제공하므로 심볼은 장식용 `alt=""`입니다.
- SHA-256: `9b3ff97d3170191c5ff3f4554df3e38f0b02273376a9eaa8ca83e80e40adade0` · 235바이트.
- Git blob: `2295fb417f611b0601af5ddc8aef0eab2f8b100a`.

## Favicon

공식 [favicon.ico](https://choi-solyi.github.io/solyi-brand-assets/01-Production-Assets/00-Core/favicon.ico)를 `site/favicon.ico`로 사용합니다. ICO의 내장 크기를 변형하지 않습니다.

- SHA-256: `8c96ed421bc0bafe7ebc00f4391bbb2edcd24624c85aa0ffc7500a4860b377d2` · 13,424바이트.
- Git blob: `fcdeb10f1c3163a42895bf62833e2500786edfc0`.

## 권리와 검사

브랜드 자산은 UI 배포 패키지에 포함하지 않으며 자체 코드의 MIT가 브랜드 사용권을 부여하지 않습니다. 기준 원본 저장소에는 별도 LICENSE나 일반 재배포 허가가 확인되지 않았습니다. [라이선스 범위](../../LICENSE-SCOPE.md)를 확인하세요.

`brand-assets.json`에 원본 URL·커밋·크기·해시를 기록합니다. `npm run check`의 브랜드 검사는 사이트 원본과 생성 산출물의 SHA-256 및 Git blob을 대조합니다. UI 아이콘은 이 브랜드 심볼과 구분합니다.

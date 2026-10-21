# 사이트 브랜드 자산 출처

확인일: 2026-10-21. 원본 저장소: [choi-solyi/solyi-brand-assets](https://github.com/choi-solyi/solyi-brand-assets), 확인한 커밋 `16594ecf68e40df33bbae0773083abca98176aa5`. [공개 갤러리](https://choi-solyi.github.io/solyi-brand-assets/)의 manifest와 Production Assets를 직접 확인했습니다.

## 헤더 / 사이트 로고

- 이전: `site/index.html`의 HTML `s·`와 `site/docs.css`의 Georgia italic `brand-symbol` 조합입니다. 이 사이트 제작 시 작성한 표시이며 공식 로고 파일이 아니었습니다.
- 현재: 공식 [sparkle--master.svg](https://choi-solyi.github.io/solyi-brand-assets/01-Production-Assets/00-Core/sparkle--master.svg)를 `site/brand-sparkle.svg`로 원본 바이트 그대로 복사하고, 별도 사이트명 **Solyi Design System** 옆에 사용합니다. 사이트명은 내비게이션의 글자이며 새 로고 도형이나 공식 wordmark를 재창작한 것이 아닙니다.
- manifest: canonical Production Asset / Vector master, `Small brand symbol or app/profile icon`, `Preferred scalable source`.
- 원본 512×512 비율과 `#91A99A` 색을 유지합니다. 화면에는 기본 32×32, 매우 좁은 화면에는 28×28로 비례 축소합니다. 라이트/다크에서 동일 원본을 사용하고 필터·재색칠·배경 합성을 하지 않습니다. 심볼 옆 사이트명과 홈 링크의 접근 가능한 이름을 유지하므로 심볼 이미지는 장식용 `alt=""`입니다.
- SHA-256: `9b3ff97d3170191c5ff3f4554df3e38f0b02273376a9eaa8ca83e80e40adade0` (235바이트).
- Git blob: `2295fb417f611b0601af5ddc8aef0eab2f8b100a`.

## Favicon

- 이전: `site/favicon.svg`의 보라색 둥근 사각형/S 경로/원 조합입니다. 이 사이트 제작 시 만든 294바이트 SVG였고 공식 파일이 아니었습니다. 원본 전체 트리에 같은 Git blob이 없음을 확인했습니다.
- 이전 SHA-256: `ffcc8cda9a513725be43b5b13d594941ed4c22e771d8722851125b268a494722`, Git blob `43f92fe830485bdfa089591253a8a192805fe7c6`.
- 현재: 공식 [favicon.ico](https://choi-solyi.github.io/solyi-brand-assets/01-Production-Assets/00-Core/favicon.ico)를 `site/favicon.ico`로 그대로 복사합니다. 예전 SVG 링크와 파일을 제거하고 `<link rel="icon" href="./favicon.ico" type="image/x-icon">`로 연결합니다.
- manifest: canonical Production Asset / Icon-Favicon, `Browser favicon`, `Production ready`. ICO의 6개 내장 크기를 변형 없이 사용합니다.
- SHA-256: `8c96ed421bc0bafe7ebc00f4391bbb2edcd24624c85aa0ffc7500a4860b377d2` (13,424바이트).
- Git blob: `fcdeb10f1c3163a42895bf62833e2500786edfc0`.

## 조건과 검증

원본 파일의 내용과 포함된 표기를 그대로 보존했습니다. 확인한 저장소 트리에 별도 LICENSE 파일이 없고 갤러리에도 명시적인 이용 허가 문구를 발견하지 못했습니다. 소유자의 이 디자인 시스템 사이트에서 사용하라는 사용자 요청에 따라 적용하며, 이 저장소가 브랜드 자산에 새로운 재배포 권한을 부여하는 것은 아닙니다. 브랜드 에셋 사이트 자체는 변경하지 않습니다.

`brand-assets.json`에 원본 경로·URL·커밋·바이트·해시를 기록합니다. `npm run build` 후 `npm run check`는 `scripts/check-brand.mjs`를 통해 site/와 docs/의 SHA-256 및 Git blob을 원본 기록과 비교합니다. 갤러리의 장식 CSS나 Reference 이미지를 로고 파일로 사용하지 않습니다.

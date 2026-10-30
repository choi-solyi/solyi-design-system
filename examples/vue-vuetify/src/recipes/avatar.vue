<template>
  <SCard :heading-level="2" title="사용자를 나타내는 이미지 자리 · Avatar">
    <p>
      동그라미 안의 ‘민’은 이미지가 없을 때 사용하는 대체 글자입니다. Avatar 자체는 메뉴 버튼이
      아닙니다.
    </p>
    <div class="sol-actions">
      <SAvatar label="가상 사용자 민하" initials="민" :size="48" /><span>민하 · 가상 사용자</span>
    </div>
    <p class="sol-hint">
      접근성 이름은 label로 제공합니다. 사용자 메뉴가 필요하면 소비 화면에서 별도 버튼을 조합합니다.
    </p>
  </SCard>
</template>

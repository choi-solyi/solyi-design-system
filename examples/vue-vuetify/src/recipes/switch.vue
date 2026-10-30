<script setup lang="ts">
const chosen = ref(false),
  enabled = ref(false),
  external = ref(false)
</script>
<template>
  <SCard :heading-level="2" title="선택과 즉시 설정의 차이 · Switch">
    <p>
      체크박스는 항목의 선택을 확인하고, 스위치는 설정을 즉시 켜거나 끕니다. 모양을 합쳐도 같은
      의미가 되지는 않습니다.
    </p>
    <SCheckbox
      id="recipe-switch-choice"
      v-model="chosen"
      label="확인 후 적용할 항목 선택 · Checkbox"
    />
    <SSwitch id="recipe-switch-enabled" v-model="enabled" label="즉시 알림 켜기 · Switch" />
    <div class="sol-actions">
      <label id="recipe-switch-external-label" for="recipe-switch-external"
        >외부 라벨을 쓰는 설정</label
      >
      <SSwitch
        id="recipe-switch-external"
        v-model="external"
        label="외부 라벨을 쓰는 설정"
        hide-label
        aria-labelledby="recipe-switch-external-label"
      />
    </div>
    <p role="status">
      항목 {{ chosen ? '선택' : '미선택' }} · 알림 {{ enabled ? '켜짐' : '꺼짐' }} · 외부 설정
      {{ external ? '켜짐' : '꺼짐' }}
    </p>
  </SCard>
</template>

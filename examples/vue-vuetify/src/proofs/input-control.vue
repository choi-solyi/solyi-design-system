<script setup lang="ts">
import { STextField, STextarea } from 'solyi-ui'
import type { SolInputClearEvent, SolInputHandle } from 'solyi-ui'
const value = ref('Text'), handle = ref<SolInputHandle | null>(null)
function cleared(event: SolInputClearEvent<string>) {
  console.log(event.value.toUpperCase(), event.reason)
}
</script>
<template>
  <button type="button" @click="handle?.clear()">Clear through the same public action</button>
  <STextField ref="handle" id="text-proof" label="Text" v-model="value" clearable loading @clear="cleared">
    <template #leading="{ hasValue, disabled, readonly: readOnly, loading, error, clear }">
      <span>{{ hasValue }} {{ disabled }} {{ readOnly }} {{ loading }} {{ error.toUpperCase() }}</span>
      <button type="button" @click="clear">Clear</button>
    </template>
    <template #indicator="{ hasValue }"><span>{{ hasValue }}</span></template>
    <template #status="{ error }"><span>{{ error.toUpperCase() }}</span></template>
  </STextField>
  <STextarea id="area-proof" label="Area" v-model="value" clearable @clear="cleared" @change="value = $event">
    <template #trailing="{ loading }"><span>{{ loading }}</span></template>
    <template #loading="{ readonly: readOnly }"><span>{{ readOnly }}</span></template>
  </STextarea>
</template>

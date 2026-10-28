<script setup lang="ts">
import { STextField, STextarea, SSelect, SNumberInput, SAutocomplete, SMultiSelect } from 'solyi-ui'
import type { SolInputClearEvent, SolInputHandle } from 'solyi-ui'
const value = ref('Text'), handle = ref<SolInputHandle | null>(null)
const selected = ref<string|null>('a'), number = ref<number|null>(5)
const multiple = ref<string[]>(['a'])
function cleared(event: SolInputClearEvent<string>) {
  console.log(event.value.toUpperCase(), event.reason)
}
function selectedCleared(event: SolInputClearEvent<string|null>) { console.log(event.value?.toUpperCase()) }
function numberCleared(event: SolInputClearEvent<number|null>) { console.log(event.value?.toFixed(0)) }
function multipleCleared(event: SolInputClearEvent<readonly string[]>) { console.log(event.value.join(',')) }
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
  <SSelect id="select-proof" label="Select" v-model="selected" :options="[{value:'a',label:'Alpha'}]" clearable @clear="selectedCleared">
    <template #indicator="{ disabled }"><span>{{ disabled }}</span></template>
  </SSelect>
  <SNumberInput id="number-proof" label="Number" v-model="number" :min="5" :step="15" clearable @clear="numberCleared">
    <template #leading="{ clear }"><button type="button" @click="clear">Clear</button></template>
    <template #presets="{ presets, value: current, setValue, isAllowed, readonly: readOnly, disabled }">
      <button type="button" :disabled="disabled || readOnly || !isAllowed(20)" @click="setValue(20)">{{ current?.toFixed(0) }} {{ presets[0]?.value.toFixed(0) }}</button>
    </template>
  </SNumberInput>
  <SAutocomplete id="auto-proof" label="Autocomplete" v-model="selected" :options="[{value:'a',label:'Alpha'}]" clearable @clear="selectedCleared">
    <template #indicator="{ hasValue }"><span>{{ hasValue }}</span></template>
  </SAutocomplete>
  <SMultiSelect id="multi-proof" label="Multiple" v-model="multiple" :options="[{value:'a',label:'Alpha'}]" clearable @clear="multipleCleared">
    <template #status="{ error }"><span>{{ error.toUpperCase() }}</span></template>
  </SMultiSelect>
</template>

<script setup lang="ts">
import { SCombobox } from 'solyi-ui'
import type { SolComboboxChange, SolComboboxHandle, SolComboboxCommit, SolInputClearEvent, SolOptionLoader } from 'solyi-ui'
const value = ref<string|null>(null), handle = ref<SolComboboxHandle|null>(null)
const commitOn: readonly SolComboboxCommit[] = ['enter', 'blur']
const loadOptions: SolOptionLoader = async (query, signal) => signal.aborted ? [] : [{value:'id',label:query}]
function changed(event: SolComboboxChange) {
  console.log(event.value?.toUpperCase())
  if (event.reason === 'select') console.log(event.option.value.toUpperCase())
}
function cleared(event: SolInputClearEvent<string|null>) { console.log(event.value?.toUpperCase(), event.reason) }
</script>
<template>
  <SCombobox ref="handle" id="combo-proof" v-model="value" label="Combo" :commit-on="commitOn" :load-options="loadOptions" :open-on-focus="false" :debounce="150" clearable loading @change="changed" @clear="cleared">
    <template #leading="{ hasValue, disabled, readonly: readOnly, loading, error, clear }">
      <span>{{ hasValue }} {{ disabled }} {{ readOnly }} {{ loading }} {{ error.toUpperCase() }}</span>
      <button type="button" @click="clear">Clear</button>
    </template>
    <template #trailing="{ error }"><span>{{ error.toUpperCase() }}</span></template>
    <template #indicator="{ hasValue }"><span>{{ hasValue }}</span></template>
  </SCombobox>
  <button type="button" @click="handle?.retry(); handle?.clear(); handle?.focus(); handle?.validate(); handle?.resetValidation()">Handle</button>
</template>

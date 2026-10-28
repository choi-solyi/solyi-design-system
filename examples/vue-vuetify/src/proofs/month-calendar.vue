<script setup lang="ts">
import { SMonthCalendar } from 'solyi-ui'
import type { SolCalendarMarkers, SolCalendarChange, SolMonthChange, SolMonthCalendarHandle } from 'solyi-ui'
const month = ref('2026-10'), selected = ref<string|null>(null)
const handle = ref<SolMonthCalendarHandle|null>(null)
const markers: SolCalendarMarkers = {'2026-10-28':[{id:'m',label:'Marker',tone:'info',icon:'copy'}]}
function changed(event: SolCalendarChange) { console.log(event.value.toUpperCase(), event.previousValue, event.reason) }
function navigated(event: SolMonthChange) { console.log(event.month, event.previousMonth, event.reason) }
</script>
<template>
  <button type="button" @click="handle?.focus(selected || undefined)">Focus selected date</button>
  <SMonthCalendar ref="handle" id="month-proof" label="Calendar" v-model="selected" v-model:month="month" :markers="markers" :first-day="1" :is-date-disabled="date => date.endsWith('-10')" @change="changed" @month-change="navigated">
    <template #cell="{ date, day, selected: isSelected, today, disabled, markers: daily }">
      <span>{{ date.toUpperCase() }} {{ day.toFixed(0) }} {{ isSelected }} {{ today }} {{ disabled }} {{ daily[0]?.label }}</span>
    </template>
    <template #marker="{ date, marker, index }"><span>{{ date }} {{ marker.label }} {{ index.toFixed(0) }}</span></template>
  </SMonthCalendar>
</template>

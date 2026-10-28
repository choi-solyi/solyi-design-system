<script setup lang="ts">
import {STimeGrid} from 'solyi-ui'
import type {SolTimeGridColumn,SolTimeGridHandle} from 'solyi-ui'
type Item={id:string;column:string;start:number;end:number;title:string}
const items:readonly Item[]=[{id:'a',column:'one',start:480,end:540,title:'Item'}]
const columns:readonly SolTimeGridColumn[]=[{key:'one',label:'One',date:'2026-10-28'}]
const handle=ref<SolTimeGridHandle|null>(null)
function focus(){handle.value?.focus('a')}
</script>
<template>
 <STimeGrid ref="handle" id="grid-proof" label="Grid" :items="items" :columns="columns" :item-key="item=>item.id" :item-label="item=>item.title" :item-column="item=>item.column" :item-start="item=>item.start" :item-end="item=>item.end">
  <template #item="{item,startMinute}"><strong>{{item.title.toUpperCase()}} {{startMinute.toFixed(0)}}</strong></template>
  <template #band="{band}"><span>{{band.label}}</span></template>
 </STimeGrid>
 <button type="button" @click="focus">Focus</button>
</template>

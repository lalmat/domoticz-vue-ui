<script lang="ts" setup>
import { onMounted } from "vue"

import { useDomoticz } from "../stores/useDomoticz"
import PanelToday from "../components/PanelToday.vue"
const domoticz = useDomoticz()

onMounted(() => {
  domoticz.syncVersion()
  domoticz.syncDatetimes()
})
</script>

<template>
  <div class="rounded-xl drop-shadow-lg bg-white/70 m-8 fixed bottom-0 top-0 left-0 right-0">
    <div class="grid grid-cols-7 grid-row-4 gap-4 fixed bottom-0 top-0 left-0 right-0 m-8">
      <div class="rounded bg-white/50 col-span-2 relative">
        <PanelToday
          v-if="domoticz.datetimes"
          :datetime="domoticz.datetime"
          :sunset="domoticz.datetimes.Sunset"
          :sunrise="domoticz.datetimes.Sunrise"
          :day-duration="domoticz.datetimes.dayLength"
        />
      </div>
      <div class="rounded bg-white/50">02</div>
      <div class="rounded bg-white/50">03</div>
      <div class="rounded bg-white/50 row-span-2 col-span-3">04</div>
      <div class="rounded bg-white/50 row-span-2 col-span-2">05</div>
      <div class="rounded bg-white/50">06</div>
      <div class="rounded bg-white/50">07</div>
      <div class="rounded bg-white/50">08</div>
      <div class="rounded bg-white/50">09</div>
      <div class="rounded bg-white/50">10</div>
      <div class="rounded bg-white/50">11</div>
      <div class="rounded bg-white/50">12</div>
      <div class="rounded bg-white/50">13</div>
      <div class="rounded bg-white/50">14</div>
      <div class="rounded bg-white/50">15</div>
      <div class="rounded bg-white/50">16</div>
      <div class="rounded bg-white/50">17</div>
      <div class="rounded bg-white/50">18</div>
      <div class="rounded bg-white/50">19</div>
    </div>

    <div v-if="domoticz.version" class="text-slate-500 absolute bottom-1 w-full text-center font-light italic text-sm">
      Domoticz v{{ domoticz.version.version }} - Running on
      <span class="uppercase">{{ domoticz.version.SystemName }}</span> -
      {{ domoticz.version.HaveUpdate ? "Update pending" : "Up to date" }}
    </div>
  </div>
</template>

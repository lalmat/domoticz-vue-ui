<script setup lang="ts">
import { computed } from "vue"
import { useDomoticz } from "../stores/useDomoticz"
const domoticz = useDomoticz()

const props = defineProps({
  icon: { type: String, default: "" },
  label: { type: String, default: "N/A" },
  idx: { type: String, default: null },
  colorOn: { type: String, default: "#FFFFFF" },
})
const color = computed(() => {
  return {
    backgroundColor: device.value.Data == "On" ? props.colorOn : "transparent",
  }
})
const device = computed(() => domoticz.findDevice(props.idx))
</script>
<template>
  <div v-if="device" class="absolute grid grid-rows-2 content-around gap-4 h-full w-full" :style="color">
    <div class="text-center text-3xl align-bottom mt-6">{{ props.label }}</div>
    <div class="text-center"><img :src="icon" class="h-16 inline" /></div>
  </div>
</template>

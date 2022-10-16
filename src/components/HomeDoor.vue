<script setup lang="ts">
//import { DomoticzDevice } from "../interfaces/DomoticzDevice";
import { computed } from "vue"
import { themeDevice } from "../interfaces/ThemeDevice";
import { useDomoticz } from "../stores/useDomoticz"
const domoticz = useDomoticz()

interface Props { device: themeDevice }
const props = defineProps<Props>()


const domoticzDevice = computed(() => {
  if (domoticz.devices.length <= 0) return null;
  return domoticz.devices.find( (item) => (item.idx == props.device.idx));
})


</script>
<template>
  <div
    v-if="device && domoticzDevice"
    class="absolute top-0 left-0 rounded grid grid-rows-2 content-around h-full w-full bg-gray-100/20">

    <div class="text-center">
      <img :src="`${device.icon}_${domoticzDevice.Status.toLowerCase()}.svg`" class="dz-home-door-icon inline" />
    </div>

    <div class="text-center dz-home-door-text">{{ device.name }}</div>
  </div>
</template>

<style>
.dz-home-door-active {
  box-shadow: inset 0px 0px 10px 0px rgba(0,0,0,0.50);
  @apply bg-yellow-300/20
}
.dz-home-door-inactive {
  @apply  shadow-xl
}
.dz-home-door-text {
  padding:1.5vh;
  font-size: 1.5vw;
  font-weight: bold;
}
.dz-home-door-icon {
  margin-top:3vh;
  height:8vh;
}
</style>

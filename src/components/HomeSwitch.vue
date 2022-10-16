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

const isActive = computed( () => {
  return (domoticzDevice.value?.Status)
   ? (domoticzDevice.value.Status.toLowerCase() === "on")
   : false
})

function switchState() {
  domoticz.toggleDevice(props.device.idx);
}

</script>
<template>
  <div
    v-if="device && domoticzDevice"
    class="absolute top-0 left-0 grid grid-rows-2 content-around h-full w-full cursor-pointer bg-yellow-700/20"
    :class="{'dz-home-switch-active': isActive, 'dz-home-switch-inactive': !isActive}"
    @click="switchState()">
    <div class="text-center align-bottom dz-home-switch-text">{{ device.name }}</div>
    <div class="text-center">
      <img :src="`${device.icon}_${domoticzDevice.Status.toLowerCase()}.svg`" class="inline dz-home-switch-icon" />
    </div>
  </div>
</template>
<style>
.dz-home-switch-active {
  box-shadow: inset 0px 0px 10px 0px rgba(0,0,0,0.50);
  @apply bg-yellow-300/20
}
.dz-home-switch-inactive {
  @apply  shadow-xl
}
.dz-home-switch-text {
  padding:1.5vh;
  font-size: 1.5vw;
  font-weight: bold;
}
.dz-home-switch-icon {
  height:8vh;
}
</style>

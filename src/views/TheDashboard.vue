<script lang="ts" setup>
import { onMounted } from "vue"

import { useDomoticz } from "../stores/useDomoticz"
import { useTheme } from "../stores/useTheme"
import PanelItem from "../components/PanelItem.vue";

const domoticz = useDomoticz()
const theme = useTheme()

onMounted(() => {
  theme.load('/theme/theme.json');
  domoticz.syncVersion()
  domoticz.syncDatetimes()
  domoticz.syncDevices()
})
</script>

<template>
  <div
    v-if="theme.loaded"
    :class="theme.classes.bgPanel"
  >
    <div :class="theme.classes.devicesGrid">
      <div
        v-for="(device, index) in theme.devices"
        :key="index"
        :class="device.slotClass"
      >
        <PanelItem :device="device" />
      </div>
    </div>

    <div
      v-if="domoticz.version"
      :class="theme.classes.version"
    >
      Domoticz v{{ domoticz.version.version }} - Running on
      <span class="uppercase">{{ domoticz.version.SystemName }}</span> -
      {{ domoticz.version.HaveUpdate ? "Update pending" : "Up to date" }}
    </div>
  </div>
</template>

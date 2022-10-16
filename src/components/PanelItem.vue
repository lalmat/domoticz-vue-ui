<script lang="ts" setup>
import { themeDevice } from "../interfaces/ThemeDevice";
import ServerDatetimes from "./ServerDatetimes.vue";
import HomeSwitch from "./HomeSwitch.vue";
import HomeDoor from "./HomeDoor.vue";

interface Props { device: themeDevice }

defineProps<Props>();
</script>
<template>
  <div class="relative w-full h-full">
    <ServerDatetimes v-if="device.type === 'server-datetimes'" :device="device" />
    <HomeSwitch v-if="device.type === 'home-switch'" :device="device" />
    <HomeDoor v-if="device.type === 'home-door'" :device="device" />
  </div>
</template>

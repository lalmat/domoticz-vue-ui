<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useDomoticz } from "./stores/useDomoticz"

const domoticz = useDomoticz()
const router = useRouter()

onMounted(async () => {
  if (!domoticz.connected) {
    const result = await domoticz.reconnect()
    router.push(result ? "/dashboard" : "/")
  }
})
</script>

<template>
  <router-view></router-view>
</template>

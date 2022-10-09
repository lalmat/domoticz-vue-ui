<script lang="ts" setup>
import { computed, onMounted } from "vue"
import { useDomoticz } from "../stores/useDomoticz"
import { useI18n } from "vue-i18n"

const domoticz = useDomoticz()
const { t } = useI18n({})

onMounted(async () => {
  domoticz.refreshDatetimes()
})

const date = computed(() => {
  const date = new Date(domoticz.datetimes.ServerTime)
  return new Intl.DateTimeFormat(t("intl"), {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
})
const time = computed(() => {
  const date = new Date(domoticz.datetimes.ServerTime)
  return new Intl.DateTimeFormat(t("intl"), { hour: "numeric", minute: "numeric" }).format(date)
})
</script>
<template>
  <div v-if="domoticz?.datetimes" class="absolute w-full h-full">
    <div class="text-2xl capitalize text-center mt-8">
      {{ date }}
    </div>

    <div class="text-6xl font-bold mt-4 text-center">
      {{ time }}
    </div>

    <div class="flex mt-4 border">
      <div class="w-1/3 text-center">
        {{ domoticz.datetimes.Sunrise }}
      </div>
      <div class="w-1/3 text-center">
        {{ domoticz.datetimes.DayLength }}
      </div>
      <div class="w-1/3 text-center">
        {{ domoticz.datetimes.Sunset }}
      </div>
    </div>
  </div>
</template>

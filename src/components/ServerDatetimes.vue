<script lang="ts" setup>
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import { themeDevice } from "../interfaces/ThemeDevice";
import { useDomoticz } from "../stores/useDomoticz";

const domoticz = useDomoticz();
const { t } = useI18n({})

interface Props { device: themeDevice }
defineProps<Props>()

const date = computed(() => {
  if (domoticz.datetime === "") return
  const date = new Date(domoticz.datetime)
  return new Intl.DateTimeFormat(t("intl"), {
    weekday : "long",
    year    : "numeric",
    month   : "long",
    day     : "numeric",
  }).format(date)
})

const time = computed(() => {
  if (domoticz.datetime === "") return
  const date = new Date(domoticz.datetime)
  return new Intl.DateTimeFormat(t("intl"), { hour: "numeric", minute: "numeric" }).format(date)
})
</script>
<template>
  <div v-if="domoticz.datetimes" class="absolute top-0 left-0 w-full h-full">
    <div class="capitalize text-center dz-server-dt-date">
      {{ date }}
    </div>

    <div class="font-bold text-center dz-server-dt-time">
      {{ time }}
    </div>

    <div class="flex dz-server-dt-details">
      <div class="w-1/3 text-center">
        <img :src="`${device.icon}/sunrise.svg`" class="inline align-bottom dz-server-dt-icon" />
        <span class="dz-server-dt-text-small">{{ domoticz.datetimes.Sunrise }}</span>
      </div>
      <div class="w-1/3 text-center">
        <img :src="`${device.icon}/day_duration.svg`" class="inline align-bottom dz-server-dt-icon" />
        <span class="dz-server-dt-text-small">{{ domoticz.datetimes.DayLength }}</span>
      </div>
      <div class="w-1/3 text-center">
        <img :src="`${device.icon}/sunset.svg`" class="inline align-bottom dz-server-dt-icon" />
        <span class="dz-server-dt-text-small">{{ domoticz.datetimes.Sunset }}</span>
      </div>
    </div>
  </div>
</template>
<style>
.dz-server-dt-date {
  margin-top: 1.5vh;
  font-size: 1.5vw;
}
.dz-server-dt-time {
  margin-top:1vh;
  font-size: 3vw;
  font-weight: bold;
}
.dz-server-dt-details {
  margin-top:1vh;
}
.dz-server-dt-icon {
  height:2.4vw;
}
.dz-server-dt-text-small {
  font-size:1.5vw;
  padding-left:0.5vw;
}
</style>

<script lang="ts" setup>
import { computed } from "vue"
import { useI18n } from "vue-i18n"
const { t } = useI18n({})

const props = defineProps({
  datetime: { type: String, default: "2022-01-01 00:00:00" },
  dayDuration: { type: String, default: "12:00" },
  sunset: { type: String, default: "06:00" },
  sunrise: { type: String, default: "18:00" },
})

const date = computed(() => {
  const date = new Date(props.datetime)
  return new Intl.DateTimeFormat(t("intl"), {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
})
const time = computed(() => {
  const date = new Date(props.datetime)
  return new Intl.DateTimeFormat(t("intl"), { hour: "numeric", minute: "numeric" }).format(date)
})
</script>
<template>
  <div class="absolute w-full h-full">
    <div class="text-2xl capitalize text-center mt-8">
      {{ date }}
    </div>

    <div class="text-6xl font-bold mt-4 text-center">
      {{ time }}
    </div>

    <div class="flex mt-4 border">
      <div class="w-1/3 text-center text-xl">
        <img src="/theme/icons/day_sunrise.svg" class="inline align-text-bottom h-7" />
        {{ props.sunrise }}
      </div>
      <div class="w-1/3 text-center text-xl">
        <img src="/theme/icons/day_duration.svg" class="inline align-text-bottom h-7" />
        {{ props.dayDuration }}
      </div>
      <div class="w-1/3 text-center text-xl">
        <img src="/theme/icons/day_sunset.svg" class="inline align-text-bottom h-7" />
        {{ props.sunset }}
      </div>
    </div>
  </div>
</template>

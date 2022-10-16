<script lang="ts" setup>
import { computed } from "vue"
import { themeDevice } from "../interfaces/ThemeDevice";
import { useDomoticz } from "../stores/useDomoticz"
import { useTheme } from "../stores/useTheme";
const domoticz = useDomoticz()
const theme = useTheme();

interface Props { device: themeDevice }
defineProps<Props>()

const tempHumiBaro = computed(() => {
  if (domoticz.devices.length <= 0) return null;
  return domoticz.devices.find( (item) => (item.idx == theme.openWeather.TempHumBaroIdx));
})

const tempFeeling = computed(() => {
  if (domoticz.devices.length <= 0) return null;
  return domoticz.devices.find( (item) => (item.idx == theme.openWeather.FeelingTempIdx));
})

const wind = computed(() => {
  if (domoticz.devices.length <= 0) return null;
  return domoticz.devices.find( (item) => (item.idx == theme.openWeather.WindIdx));
})

const uv = computed(() => {
  if (domoticz.devices.length <= 0) return null;
  return domoticz.devices.find( (item) => (item.idx == theme.openWeather.UvIdx));
})

const actual = computed(() => {
  if (domoticz.devices.length <= 0) return null;
  return domoticz.devices.find( (item) => (item.idx == theme.openWeather.ActualWeatherIdx));
})
const prevJ1 = computed(() => {
  if (domoticz.devices.length <= 0) return null;
  return domoticz.devices.find( (item) => (item.idx == theme.openWeather.PrevJ1Idx));
})
const prevJ2 = computed(() => {
  if (domoticz.devices.length <= 0) return null;
  return domoticz.devices.find( (item) => (item.idx == theme.openWeather.PrevJ2Idx));
})
const prevJ3 = computed(() => {
  if (domoticz.devices.length <= 0) return null;
  return domoticz.devices.find( (item) => (item.idx == theme.openWeather.PrevJ3Idx));
})

const temp = computed(() => tempHumiBaro.value?.Data.split(', ')[0])
const humi = computed(() => tempHumiBaro.value?.Data.split(', ')[1])
const baro = computed(() => tempHumiBaro.value?.Data.split(', ')[2])
const feel = computed(() => tempFeeling.value?.Data)
const windDir   = computed(() => wind.value?.Data.split(';')[1])
const windSpeed = computed(() => wind.value?.Data.split(';')[4])
const windGusts = computed(() => wind.value?.Data.split(';')[3])

const actualImgText = computed(() => tempHumiBaro.value?.ForecastStr.toLocaleLowerCase().replace(' ', '_'));
const prevJ1ImgText = computed(() => prevJ1.value?.ForecastStr.toLocaleLowerCase().replace(' ', '_'));
const prevJ2ImgText = computed(() => prevJ2.value?.ForecastStr.toLocaleLowerCase().replace(' ', '_'));
const prevJ3ImgText = computed(() => prevJ3.value?.ForecastStr.toLocaleLowerCase().replace(' ', '_'));
</script>

<template>

    <div class="absolute top-0 left-0 w-full h-full grid grid-cols-3 grid-rows-5 dt-openweather-station">
      <div class="row-span-2">
        <img :src="`${device.icon}/weather/${actualImgText}.svg`" :alt="actualImgText" class="dt-openweather-station-actual" />
      </div>
      <div class="col-span-2">
        <div class="dt-openweather-station-actual-temp">
          <span class="dt-openweather-station-temp">{{ temp }}</span> -
          <span class="dt-openweather-station-conditions capitalize">{{ actual?.Data }}</span>
        </div>
      </div>
      <div class="col-span-2">
        <span class="dt-openweather-station-forecast">
        <div class="grid grid-cols-3">
          <div><img :src="`${device.icon}/weather/${prevJ1ImgText}.svg`" :alt="prevJ1ImgText" class="dt-openweather-station-prevision" /></div>
          <div><img :src="`${device.icon}/weather/${prevJ2ImgText}.svg`" :alt="prevJ2ImgText" class="dt-openweather-station-prevision" /></div>
          <div><img :src="`${device.icon}/weather/${prevJ3ImgText}.svg`" :alt="prevJ3ImgText" class="dt-openweather-station-prevision" /></div>
        </div>
        </span>
      </div>
      <div class="col-span-3 row-span-3">
        <div class="grid grid-cols-2 grid-rows-3 h-full dt-openweather-details">
          <div>
            <img :src="`${device.icon}/feeling.svg`" class="inline dt-openweather-station-icon" />
            <span class="dt-openweather-station-text">{{ feel }}</span>
          </div>
          <div>
            <img :src="`${device.icon}/humidity.svg`" class="inline dt-openweather-station-icon" />
            <span class="dt-openweather-station-text">{{ humi }}</span>
          </div>
          <div>
            <img :src="`${device.icon}/wind${(windGusts && windGusts > '0') ? '_gusts' : '' }.svg`" class="inline dt-openweather-station-icon" />
            <span  class="dt-openweather-station-text-sm">
              {{ windSpeed }} km/h
            </span>
            <span v-show="windGusts && windGusts > '0'">
              <br />({{windGusts}} km/h)
            </span>
          </div>
          <div>
            <img :src="`${device.icon}/compass.svg`" class="inline dt-openweather-station-icon" />
            <span  class="dt-openweather-station-text">{{ windDir }}</span>
          </div>
          <div>
            <img :src="`${device.icon}/pression.svg`" class="inline dt-openweather-station-icon" />
            <span class="dt-openweather-station-text-sm">{{ baro }}</span>
          </div>
          <div>
            <img :src="`${device.icon}/uv.svg`" class="inline dt-openweather-station-icon" />
            <span class="dt-openweather-station-text">{{ uv?.Data }}</span>
          </div>
        </div>
      </div>
    </div>

</template>
<style>
.dt-openweather-station {
  padding-left:0.5vw;
}
.dt-openweather-details {
  padding-left:1vw;
}
.dt-openweather-station-icon {
  padding-left:0.5vm;
  height:5.5vh;
}
.dt-openweather-station-text {
  font-size: 2.75vh;
  margin-left: 0.75vw;
  @apply align-middle
}
.dt-openweather-station-actual {
  margin-top: 2vh;
  margin-left: 1.5vh;
  height: 7vw;
}
.dt-openweather-station-text-sm {
  font-size: 2.4vh;
  margin-left: 0.75vw;
  @apply align-middle
}
.dt-openweather-station-actual-temp {
  margin-top: 2.75vh;
}
.dt-openweather-station-temp {
  font-size: 3vh;
  @apply font-bold
}
.dt-openweather-station-conditions {
  font-size: 2vh;
}
.dt-openweather-station-prevision {
  @apply inline;
  height: 3vw;
}
</style>

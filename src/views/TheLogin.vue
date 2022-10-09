<script lang="ts" setup>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useDomoticz } from "../stores/useDomoticz"

const router = useRouter()
const domoticz = useDomoticz()

async function authenticate() {
  const result = await domoticz.connect()
  if (!result) {
    alert("theLogin.loginFailure")
    return
  }
  router.push("/dashboard")
}

onMounted(() => {
  domoticz.settingsLoad()
})
</script>

<template>
  <div class="mx-auto rounded-xl drop-shadow-lg bg-white/70 w-1/3 mt-16 p-16">
    <div class="text-center text-2xl font-bold uppercase">{{ $t("theLogin.title") }}</div>
    <div class="mt-6 mb-2 flex">
      <div class="w-1/3 font-bold uppercase">{{ $t("theLogin.server") }}</div>
      <div class="w-2/3"><hr class="mt-3" /></div>
    </div>
    <div class="flex">
      <div class="w-1/2 mr-2">
        {{ $t("theLogin.host") }}<br />
        <input v-model="domoticz.server.host" type="text" class="w-full text-center" />
      </div>
      <div class="w-1/4 mx-2">
        {{ $t("theLogin.port") }}<br />
        <input v-model="domoticz.server.port" type="number" class="w-full text-center" />
      </div>
      <div class="w-1/4 ml-2 text-center">
        &nbsp;<br />
        <input v-model="domoticz.server.useSSL" type="checkbox" />
        {{ $t("theLogin.useSSL") }}
      </div>
    </div>

    <div class="mt-6 mb-2 flex">
      <div class="w-1/3 font-bold uppercase">{{ $t("theLogin.login") }}</div>
      <div class="w-2/3"><hr class="mt-3" /></div>
    </div>
    <div class="flex">
      <div class="w-1/2 mr-2">
        {{ $t("theLogin.username") }}<br />
        <input v-model="domoticz.server.username" type="text" class="w-full text-center" />
      </div>
      <div class="w-1/2 ml-2">
        {{ $t("theLogin.password") }}<br />
        <input v-model="domoticz.server.password" type="password" class="w-full text-center" />
      </div>
    </div>

    <div class="mt-8 flex">
      <div class="w-1/2 mr-2">
        <input v-model="domoticz.server.rememberMe" type="checkbox" />
        {{ $t("theLogin.rememberMe") }}
      </div>
      <div class="w-1/2 ml-2">
        <button class="primary w-full h-16 rounded-xl" @click="authenticate()">{{ $t("theLogin.connect") }}</button>
      </div>
    </div>
  </div>
</template>

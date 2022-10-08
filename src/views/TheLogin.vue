<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const login = ref("")
const password = ref("")
const router = useRouter()

function authenticate(): void {
  router.push("/dashboard")
}
</script>

<template>
  <div>
    <div>
      {{ $t("theLogin.username") }} :
      <input v-model="login" type="text" />
    </div>
    <div>
      Password:
      <input v-model="password" type="text" />
    </div>
    <div>
      <button @click="authenticate()">Connect</button>
    </div>
  </div>
</template>

<template>
  <div class="border rounded" :class="sizeStyle">
    <Icon :size="props.size">
      <Add />
    </Icon>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue"
import { Icon } from "@vicons/utils"
import { Add } from "@vicons/carbon"

const props = defineProps({
  size: { type: String, default: "32" },
})

const sizeStyle = computed(() => ({
  "w-16": props.size == "16",
  "h-16": props.size == "16",
  "w-32": props.size == "32",
  "h-32": props.size == "32",
  "w-48": props.size == "48",
  "h-48": props.size == "48",
  "w-64": props.size == "64",
  "h-64": props.size == "64",
}))
</script>

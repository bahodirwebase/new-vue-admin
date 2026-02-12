<script setup lang="ts">
import { ref } from 'vue'

const asyncValue = ref('')
const asyncOptions = ref<string[]>([])
const asyncLoading = ref(false)

const performAsyncSearch = (query: string) => {
  asyncLoading.value = true
  setTimeout(() => {
    if (query) {
      asyncOptions.value = [
        `${query} Result 1`,
        `${query} Result 2`,
        `${query} Result 3`
      ]
    } else {
      asyncOptions.value = []
    }
    asyncLoading.value = false
  }, 500)
}
</script>

<template>
  <n-card title="Async Options">
    <n-space vertical :size="16">
      <n-auto-complete v-model:value="asyncValue" :options="asyncOptions" :loading="asyncLoading"
        placeholder="Search async..." clearable @update:value="performAsyncSearch" />
      <n-p>Selected value: {{ asyncValue || 'None' }}</n-p>
    </n-space>
  </n-card>
</template>
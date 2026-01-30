<template>
  <n-card title="Mention with Async Options">
    <n-space vertical :size="16">
      <n-mention v-model:value="asyncValue" :options="asyncOptions" :loading="asyncLoading"
        placeholder="Type @ to search users..." @search="handleSearch" />
      <n-p>Text: {{ asyncValue }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const asyncValue = ref('')
const asyncOptions = ref<any[]>([])
const asyncLoading = ref(false)

const handleSearch = (query: string) => {
  if (!query) {
    asyncOptions.value = []
    return
  }

  asyncLoading.value = true
  setTimeout(() => {
    asyncOptions.value = [
      { label: `${query}_user1`, value: `${query}_user1` },
      { label: `${query}_user2`, value: `${query}_user2` },
      { label: `${query}_user3`, value: `${query}_user3` }
    ]
    asyncLoading.value = false
  }, 500)
}
</script>

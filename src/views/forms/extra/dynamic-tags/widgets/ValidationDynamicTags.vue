<template>
  <n-card title="Dynamic Tags with Validation">
    <n-space vertical :size="16">
      <n-dynamic-tags v-model:value="validatedValue" placeholder="Add valid tag" :on-create="validateTag" />
      <n-p>Valid tags: {{ JSON.stringify(validatedValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const validatedValue = ref(['valid-tag'])

const validateTag = (value: string) => {
  if (!value || value.length < 2) return null
  if (!/^[a-zA-Z0-9-]+$/.test(value)) return null
  return value.toLowerCase()
}
</script>

<template>
  <n-card title="Date Picker Sizes">
    <n-space vertical :size="16">
      <n-space>
        <n-date-picker v-model:value="smallValue" size="small" type="date" placeholder="Small" />
        <n-date-picker v-model:value="mediumValue" size="medium" type="date" placeholder="Medium" />
        <n-date-picker v-model:value="largeValue" size="large" type="date" placeholder="Large" />
      </n-space>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const smallValue = ref(null)
const mediumValue = ref(null)
const largeValue = ref(null)
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { NDynamicInput, NCard, NSpace, NP } from 'naive-ui'

const keyValue = ref([
  { key: 'name', value: 'John Doe' },
  { key: 'email', value: 'john@example.com' }
])
</script>

<template>
  <n-card title="Dynamic Input with Key-Value">
    <n-space vertical :size="16">
      <n-dynamic-input 
        v-model:value="keyValue" 
        preset="pair" 
        key-placeholder="Kalitni kiriting"
        value-placeholder="Qiymatni kiriting"
      />
      <n-p>Natija: {{ keyValue }}</n-p>
    </n-space>
  </n-card>
</template>
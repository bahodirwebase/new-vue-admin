<template>
  <n-card title="Checkbox Group">
    <n-space vertical :size="16">
      <n-checkbox-group v-model:value="groupValue">
        <n-space vertical :size="8">
          <n-checkbox value="vue">Vue.js</n-checkbox>
          <n-checkbox value="react">React</n-checkbox>
          <n-checkbox value="angular">Angular</n-checkbox>
          <n-checkbox value="svelte">Svelte</n-checkbox>
        </n-space>
      </n-checkbox-group>
      <n-p>Selected: {{ JSON.stringify(groupValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const groupValue = ref(['vue', 'react'])
</script>

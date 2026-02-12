<script setup lang="ts">
import { ref } from 'vue'

const textValue = ref('')
const passwordValue = ref('')
const emailValue = ref('')
const numberValue = ref('')
const urlValue = ref('')
</script>

<template>
  <n-card title="Input Types">
    <n-space vertical :size="16">
      <n-input v-model:value="textValue" type="text" placeholder="Text input" />
      <n-input v-model:value="passwordValue" type="password" placeholder="Password input"
        show-password-on="click" />
      <n-input v-model:value="emailValue" type="email" placeholder="Email input" />
      <n-input v-model:value="numberValue" type="number" placeholder="Number input" />
      <n-input v-model:value="urlValue" type="url" placeholder="URL input" />
    </n-space>
  </n-card>
</template>
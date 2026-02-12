<script setup lang="ts">
import { ref } from 'vue'

const validatedValue = ref('')
const validationMessage = ref('')
const validationColor = ref('')
const basicOptions = [
  { label: 'John Doe', value: 'john' },
  { label: 'Jane Smith', value: 'jane' },
  { label: 'Bob Johnson', value: 'bob' },
  { label: 'Alice Brown', value: 'alice' }
]

const validateMention = (option: any) => {
  if (option.value === 'john' || option.value === 'jane') {
    validationMessage.value = '✓ Valid team member'
    validationColor.value = '#18a058'
  } else {
    validationMessage.value = '✗ Not a team member'
    validationColor.value = '#d03050'
  }
}
</script>

<template>
  <n-card title="Mention with Validation">
    <n-space vertical :size="16">
      <n-mention v-model:value="validatedValue" :options="basicOptions"
        placeholder="Mention team members only..." :on-select="validateMention" />
      <n-p>Text: {{ validatedValue }}</n-p>
      <n-p v-if="validationMessage" :style="{ color: validationColor }">
        {{ validationMessage }}
      </n-p>
    </n-space>
  </n-card>
</template>
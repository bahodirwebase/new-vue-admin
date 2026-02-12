<script setup lang="ts">
import { ref } from 'vue'

const normalValue = ref('')
const disabledValue = ref('Disabled content')
const readonlyValue = ref('Readonly content')
const errorValue = ref('')
const warningValue = ref('')
</script>

<template>
  <n-card title="Input States">
    <n-space vertical :size="16">
      <n-input v-model:value="normalValue" placeholder="Normal state" />
      <n-input v-model:value="disabledValue" placeholder="Disabled state" disabled />
      <n-input v-model:value="readonlyValue" placeholder="Readonly state" readonly />
      <n-input v-model:value="errorValue" placeholder="Error state" status="error" />
      <n-input v-model:value="warningValue" placeholder="Warning state" status="warning" />
    </n-space>
  </n-card>
</template>
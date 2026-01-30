<template>
  <n-card title="Basic Modals">
    <n-space :size="12">
      <n-button type="primary" @click="showBasic = true">Basic Modal</n-button>
      <n-button type="info" @click="showInfo = true">Info Modal</n-button>
      <n-button type="success" @click="showSuccess = true">Success Modal</n-button>
    </n-space>

    <n-modal v-model:show="showBasic" preset="dialog" title="Basic Dialog">
      <p>This is a basic modal dialog. You can add any content here.</p>
    </n-modal>

    <n-modal v-model:show="showInfo" preset="dialog" title="Information" type="info">
      <p>This is an informational modal with an info icon.</p>
    </n-modal>

    <n-modal v-model:show="showSuccess" preset="dialog" title="Success" type="success">
      <p>Operation completed successfully!</p>
    </n-modal>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showBasic = ref(false)
const showInfo = ref(false)
const showSuccess = ref(false)
</script>

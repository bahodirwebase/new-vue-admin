<template>
  <n-card title="Modal Sizes">
    <n-space :size="12">
      <n-button @click="showSmall = true">Small</n-button>
      <n-button @click="showMedium = true">Medium</n-button>
      <n-button @click="showLarge = true">Large</n-button>
    </n-space>

    <n-modal
      v-model:show="showSmall"
      preset="card"
      title="Small Modal"
      style="width: 400px"
    >
      <p>This is a small modal (400px width).</p>
    </n-modal>

    <n-modal
      v-model:show="showMedium"
      preset="card"
      title="Medium Modal"
      style="width: 600px"
    >
      <p>This is a medium modal (600px width).</p>
    </n-modal>

    <n-modal
      v-model:show="showLarge"
      preset="card"
      title="Large Modal"
      style="width: 900px"
    >
      <p>This is a large modal (900px width) for extensive content.</p>
    </n-modal>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showSmall = ref(false)
const showMedium = ref(false)
const showLarge = ref(false)
</script>

<script setup lang="ts">
import { ref } from 'vue'

const sizeValue = ref(50)
</script>

<template>
  <n-card title="Slider Sizes">
    <n-space vertical :size="16">
      <div>
        <span style="margin-right: 12px;">Small:</span>
        <n-slider v-model:value="sizeValue" size="small" style="width: 200px; display: inline-block;" />
      </div>
      <div>
        <span style="margin-right: 12px;">Medium:</span>
        <n-slider v-model:value="sizeValue" size="medium" style="width: 200px; display: inline-block;" />
      </div>
      <div>
        <span style="margin-right: 12px;">Large:</span>
        <n-slider v-model:value="sizeValue" size="large" style="width: 200px; display: inline-block;" />
      </div>
    </n-space>
  </n-card>
</template>
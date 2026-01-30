<template>
  <n-card title="Switch Group">
    <n-space vertical :size="16">
      <div>Feature Toggles:</div>
      <n-space vertical :size="8">
        <n-space align="center" :size="12">
          <n-switch v-model:value="features.beta" />
          <span>Beta Features</span>
        </n-space>
        <n-space align="center" :size="12">
          <n-switch v-model:value="features.advanced" />
          <span>Advanced Mode</span>
        </n-space>
        <n-space align="center" :size="12">
          <n-switch v-model:value="features.experimental" />
          <span>Experimental Features</span>
        </n-space>
      </n-space>
      <n-code :code="JSON.stringify(features, null, 2)" language="json" />
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const features = reactive({
  beta: false,
  advanced: false,
  experimental: false
})
</script>

<style scoped>
.n-code {
  margin-top: 8px;
}
</style>

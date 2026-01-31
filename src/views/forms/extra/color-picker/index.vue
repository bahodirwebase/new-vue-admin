<script setup lang="ts">
import BasicColorPicker from './widgets/BasicColorPicker.vue'
import AlphaColorPicker from './widgets/AlphaColorPicker.vue'
import ModesColorPicker from './widgets/ModesColorPicker.vue'
import SizesColorPicker from './widgets/SizesColorPicker.vue'
import ActionsColorPicker from './widgets/ActionsColorPicker.vue'
import SwatchesColorPicker from './widgets/SwatchesColorPicker.vue'
import ThemeColorPicker from './widgets/ThemeColorPicker.vue'
</script>

<template>
  <div class="color-picker-demo">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Color Picker</h1>
        <p class="page-subtitle">Advanced color selection components with various modes and customization options</p>
      </div>
      
      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <BasicColorPicker />
          <AlphaColorPicker />
          <ModesColorPicker />
        </n-gi>
        <n-gi>
          <SizesColorPicker />
          <ActionsColorPicker />
          <SwatchesColorPicker />
        </n-gi>
      </n-grid>
      
      <ThemeColorPicker />
    </n-space>
  </div>
</template>

<style scoped>
.color-picker-demo {
  padding: 0;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}
</style>

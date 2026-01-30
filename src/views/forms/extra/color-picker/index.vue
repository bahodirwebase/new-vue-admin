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
    <n-space vertical :size="24">
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
/* Component-specific styles are now in common.css */
</style>

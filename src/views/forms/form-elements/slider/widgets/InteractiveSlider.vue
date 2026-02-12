<script setup lang="ts">
import { ref } from 'vue'
import { VolumeMuteOutline, VolumeHighOutline, SunnyOutline } from '@vicons/ionicons5'

const volumeValue = ref(75)
const brightnessValue = ref(60)
const priceRange = ref([200, 800])
</script>

<template>
  <n-card title="Interactive Examples">
    <n-space vertical :size="16">
      <div>
        <h4 style="margin-bottom: 8px;">Volume Control</h4>
        <div style="display: flex; align-items: center; gap: 12px;">
          <n-icon :component="VolumeMuteOutline" />
          <n-slider v-model:value="volumeValue" :max="100" style="flex: 1;" />
          <n-icon :component="VolumeHighOutline" />
          <span style="min-width: 40px;">{{ volumeValue }}%</span>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 8px;">Brightness Control</h4>
        <div style="display: flex; align-items: center; gap: 12px;">
          <n-icon :component="SunnyOutline" />
          <n-slider v-model:value="brightnessValue" :max="100" style="flex: 1;" />
          <span style="min-width: 40px;">{{ brightnessValue }}%</span>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 8px;">Price Range Filter</h4>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="min-width: 60px;">${{ priceRange[0] }}</span>
          <n-slider v-model:value="priceRange" range :min="0" :max="1000" :step="50" style="flex: 1;" />
          <span style="min-width: 60px;">${{ priceRange[1] }}</span>
        </div>
      </div>
    </n-space>
  </n-card>
</template>
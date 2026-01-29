<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NButton, NSpace, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'

import { COUNTDOWN_PRESETS, PRECISION_OPTIONS } from '../constants'

const active = ref(true)
const selectedPreset = ref('30 seconds')
const selectedPrecision = ref(0)

const handlePresetSelect = (key: string) => {
  const preset = COUNTDOWN_PRESETS.find(p => p.label === key)
  if (preset) {
    selectedPreset.value = preset.label
  }
}

const handlePrecisionSelect = (key: string) => {
  const precision = PRECISION_OPTIONS.find(p => p.label === key)
  if (precision) {
    selectedPrecision.value = precision.value
  }
}

const getCurrentDuration = () => {
  const preset = COUNTDOWN_PRESETS.find(p => p.label === selectedPreset.value)
  return preset?.value || 30 * 1000
}

const getPrecisionLabel = () => {
  const precision = PRECISION_OPTIONS.find(p => p.value === selectedPrecision.value)
  return precision?.label || 'Seconds (0)'
}

const restartCountdown = () => {
  active.value = false
  setTimeout(() => {
    active.value = true
  }, 100)
}
</script>
<template>
  <n-card>
    <div class="chart-header">
      <h2 class="chart-title">Precision Control</h2>
      <n-space :size="8">
        <n-dropdown :options="COUNTDOWN_PRESETS.map(p => ({ label: p.label, key: p.label }))" @select="handlePresetSelect" trigger="click">
          <n-button class="period-button" type="primary" strong size="small">
            {{ selectedPreset }}
            <template #icon>
              <n-icon :component="ChevronDownOutline" />
            </template>
          </n-button>
        </n-dropdown>
        <n-dropdown :options="PRECISION_OPTIONS.map(p => ({ label: p.label, key: p.label }))" @select="handlePrecisionSelect" trigger="click">
          <n-button class="period-button" type="info" strong size="small">
            {{ getPrecisionLabel() }}
            <template #icon>
              <n-icon :component="ChevronDownOutline" />
            </template>
          </n-button>
        </n-dropdown>
      </n-space>
    </div>
    <n-space vertical :size="16">
      <div>
        <span style="color: var(--text-secondary); margin-right: 12px;">Precision countdown:</span>
        <n-countdown :duration="getCurrentDuration()" :precision="selectedPrecision" :active="active" />
      </div>
      <n-space>
        <n-button @click="active = !active" :type="active ? 'warning' : 'primary'">
          {{ active ? 'Pause' : 'Start' }}
        </n-button>
        <n-button @click="restartCountdown" type="info">Restart</n-button>
      </n-space>
    </n-space>
  </n-card>
</template>

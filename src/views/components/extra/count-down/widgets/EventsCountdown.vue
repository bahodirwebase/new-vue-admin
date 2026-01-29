<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NButton, NSpace, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'

import { COUNTDOWN_PRESETS } from '../constants'

const active = ref(true)
const finished = ref(false)
const selectedPreset = ref('5 seconds')

const handlePresetSelect = (key: string) => {
  const preset = COUNTDOWN_PRESETS.find(p => p.label === key)
  if (preset) {
    selectedPreset.value = preset.label
    resetCountdown()
  }
}

const getCurrentDuration = () => {
  const preset = COUNTDOWN_PRESETS.find(p => p.label === selectedPreset.value)
  return preset?.value || 5 * 1000
}

const handleFinish = () => {
  finished.value = true
}

const resetCountdown = () => {
  finished.value = false
  active.value = false
  setTimeout(() => {
    active.value = true
  }, 100)
}
</script>
<template>
  <n-card>
    <div class="chart-header">
      <h2 class="chart-title">Events and Callbacks</h2>
      <n-dropdown :options="COUNTDOWN_PRESETS.map(p => ({ label: p.label, key: p.label }))" @select="handlePresetSelect" trigger="click">
        <n-button class="period-button" type="primary" strong size="small">
          {{ selectedPreset }}
          <template #icon>
            <n-icon :component="ChevronDownOutline" />
          </template>
        </n-button>
      </n-dropdown>
    </div>
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">On Finish Callback</h3>
        <n-space vertical :size="12">
          <div>
            <span style="color: var(--text-secondary); margin-right: 12px;">Countdown:</span>
            <n-countdown :duration="getCurrentDuration()" :active="active" @finish="handleFinish" />
          </div>
          <div v-if="finished" style="color: #18a058; font-weight: 600;">
            ✅ Countdown completed!
          </div>
          <n-space>
            <n-button @click="active = !active" :type="active ? 'warning' : 'primary'">
              {{ active ? 'Pause' : 'Start' }}
            </n-button>
            <n-button @click="resetCountdown" type="info">Reset</n-button>
          </n-space>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>

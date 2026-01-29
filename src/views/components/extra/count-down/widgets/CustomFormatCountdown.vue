<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NButton, NSpace, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'
import { h } from 'vue'

import { COUNTDOWN_PRESETS } from '../constants'

const active = ref(true)
const selectedPreset = ref('2 hours')

const handlePresetSelect = (key: string) => {
  const preset = COUNTDOWN_PRESETS.find(p => p.label === key)
  if (preset) {
    selectedPreset.value = preset.label
  }
}

const getCurrentDuration = () => {
  const preset = COUNTDOWN_PRESETS.find(p => p.label === selectedPreset.value)
  return preset?.value || 2 * 60 * 60 * 1000
}

const renderTime = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const renderWithLabels = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => {
  return h('div', { style: 'display: flex; gap: 8px;' }, [
    h('div', { style: 'text-align: center;' }, [
      h('div', { style: 'font-size: 24px; font-weight: 600;' }, String(hours).padStart(2, '0')),
      h('div', { style: 'font-size: 12px; color: var(--text-secondary);' }, 'Hours')
    ]),
    h('div', { style: 'font-size: 24px; font-weight: 600; margin: 0 4px;' }, ':'),
    h('div', { style: 'text-align: center;' }, [
      h('div', { style: 'font-size: 24px; font-weight: 600;' }, String(minutes).padStart(2, '0')),
      h('div', { style: 'font-size: 12px; color: var(--text-secondary);' }, 'Minutes')
    ]),
    h('div', { style: 'font-size: 24px; font-weight: 600; margin: 0 4px;' }, ':'),
    h('div', { style: 'text-align: center;' }, [
      h('div', { style: 'font-size: 24px; font-weight: 600;' }, String(seconds).padStart(2, '0')),
      h('div', { style: 'font-size: 12px; color: var(--text-secondary);' }, 'Seconds')
    ])
  ])
}

const renderCompact = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => {
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  } else {
    return `${seconds}s`
  }
}

const renderCardStyle = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => {
  return h('div', { style: 'display: flex; gap: 8px;' }, [
    h('n-card', { size: 'small', style: 'min-width: 60px; text-align: center;' }, [
      h('div', { style: 'font-size: 20px; font-weight: 600;' }, String(hours).padStart(2, '0')),
      h('div', { style: 'font-size: 10px; color: var(--text-secondary);' }, 'HRS')
    ]),
    h('n-card', { size: 'small', style: 'min-width: 60px; text-align: center;' }, [
      h('div', { style: 'font-size: 20px; font-weight: 600;' }, String(minutes).padStart(2, '0')),
      h('div', { style: 'font-size: 10px; color: var(--text-secondary);' }, 'MIN')
    ]),
    h('n-card', { size: 'small', style: 'min-width: 60px; text-align: center;' }, [
      h('div', { style: 'font-size: 20px; font-weight: 600;' }, String(seconds).padStart(2, '0')),
      h('div', { style: 'font-size: 10px; color: var(--text-secondary);' }, 'SEC')
    ])
  ])
}
</script>
<template>
  <n-card>
    <div class="chart-header">
      <h2 class="chart-title">Custom Formatting</h2>
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
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">Custom Render Functions</h3>
        <n-space vertical :size="12">
          <div>
            <span style="color: var(--text-secondary); margin-right: 12px;">Hours:Minutes:Seconds:</span>
            <n-countdown :duration="getCurrentDuration()" :active="active" :render="renderTime" />
          </div>
          <div>
            <span style="color: var(--text-secondary); margin-right: 12px;">With Labels:</span>
            <n-countdown :duration="getCurrentDuration()" :active="active" :render="renderWithLabels" />
          </div>
          <div>
            <span style="color: var(--text-secondary); margin-right: 12px;">Compact Format:</span>
            <n-countdown :duration="getCurrentDuration()" :active="active" :render="renderCompact" />
          </div>
          <div>
            <span style="color: var(--text-secondary); margin-right: 12px;">Card Style:</span>
            <n-countdown :duration="getCurrentDuration()" :active="active" :render="renderCardStyle" />
          </div>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>

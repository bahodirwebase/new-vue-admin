<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NEllipsis, NSpace, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'

import { ELLIPSIS_PRESETS, LINE_CLAMP_OPTIONS, MAX_WIDTH_OPTIONS } from '../constants'

const selectedPreset = ref('Medium')
const selectedLineClamp = ref(2)
const selectedMaxWidth = ref('250px')

const handlePresetSelect = (key: string) => {
  selectedPreset.value = key
}

const handleLineClampSelect = (key: string) => {
  selectedLineClamp.value = parseInt(key)
}

const handleMaxWidthSelect = (key: string) => {
  selectedMaxWidth.value = key
}

const getCurrentText = () => {
  const preset = ELLIPSIS_PRESETS.find(p => p.label === selectedPreset.value)
  return preset?.value || ELLIPSIS_PRESETS[1].value
}

const getLineClampLabel = () => {
  const option = LINE_CLAMP_OPTIONS.find(o => o.value === selectedLineClamp.value)
  return option?.label || '2 Lines'
}

const getMaxWidthLabel = () => {
  const option = MAX_WIDTH_OPTIONS.find(o => o.value === selectedMaxWidth.value)
  return option?.label || '250px'
}
</script>
<template>
  <n-card>
    <div class="chart-header">
      <h2 class="chart-title">With Tooltips</h2>
      <n-space :size="8">
        <n-dropdown :options="ELLIPSIS_PRESETS.map(p => ({ label: p.label, key: p.label }))" @select="handlePresetSelect" trigger="click">
          <n-button class="period-button" type="primary" strong size="small">
            {{ selectedPreset }}
            <template #icon>
              <n-icon :component="ChevronDownOutline" />
            </template>
          </n-button>
        </n-dropdown>
        <n-dropdown :options="LINE_CLAMP_OPTIONS.map(p => ({ label: p.label, key: p.value.toString() }))" @select="handleLineClampSelect" trigger="click">
          <n-button class="period-button" type="info" strong size="small">
            {{ getLineClampLabel() }}
            <template #icon>
              <n-icon :component="ChevronDownOutline" />
            </template>
          </n-button>
        </n-dropdown>
        <n-dropdown :options="MAX_WIDTH_OPTIONS.map(p => ({ label: p.label, key: p.value }))" @select="handleMaxWidthSelect" trigger="click">
          <n-button class="period-button" type="warning" strong size="small">
            {{ getMaxWidthLabel() }}
            <template #icon>
              <n-icon :component="ChevronDownOutline" />
            </template>
          </n-button>
        </n-dropdown>
      </n-space>
    </div>
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">Tooltip on Hover</h3>
        <n-space vertical :size="12">
          <div>
            <span style="color: var(--text-secondary); margin-right: 12px;">Single line:</span>
            <n-ellipsis :style="`max-width: ${selectedMaxWidth}`" :tooltip="true">
              {{ getCurrentText() }}
            </n-ellipsis>
          </div>
          <div v-if="selectedLineClamp > 1">
            <span style="color: var(--text-secondary); margin-right: 12px;">Multi-line:</span>
            <n-ellipsis :line-clamp="selectedLineClamp" :style="`max-width: ${selectedMaxWidth}`" :tooltip="true">
              {{ getCurrentText() }} {{ getCurrentText() }}
            </n-ellipsis>
          </div>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">Different Examples</h3>
        <n-space vertical :size="12">
          <n-ellipsis style="max-width: 200px" :tooltip="true">
            This text shows a tooltip with the full content when you hover over it.
          </n-ellipsis>
          <n-ellipsis :line-clamp="2" style="max-width: 250px" :tooltip="true">
            Multi-line text with tooltip support. Hover over this truncated text to see the complete content in a tooltip.
          </n-ellipsis>
          <n-ellipsis :line-clamp="3" style="max-width: 300px" :tooltip="true">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </n-ellipsis>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary);">Custom Tooltip Content</h3>
        <n-space vertical :size="12">
          <n-ellipsis style="max-width: 250px" :tooltip="true">
            Text with custom tooltip content.
          </n-ellipsis>
          <n-ellipsis style="max-width: 250px" :tooltip="true">
            Important text with emoji tooltip.
          </n-ellipsis>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>

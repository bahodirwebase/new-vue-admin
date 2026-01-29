<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NEllipsis, NSpace, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'

import { ELLIPSIS_PRESETS, LINE_CLAMP_OPTIONS, EXPAND_TRIGGERS } from '../constants'

const selectedPreset = ref('Long')
const selectedLineClamp = ref(2)
const selectedTrigger = ref('click')

const handlePresetSelect = (key: string) => {
  selectedPreset.value = key
}

const handleLineClampSelect = (key: string) => {
  selectedLineClamp.value = parseInt(key)
}

const handleTriggerSelect = (key: string) => {
  selectedTrigger.value = key
}

const getCurrentText = () => {
  const preset = ELLIPSIS_PRESETS.find(p => p.label === selectedPreset.value)
  return preset?.value || ELLIPSIS_PRESETS[2].value
}

const getLineClampLabel = () => {
  const option = LINE_CLAMP_OPTIONS.find(o => o.value === selectedLineClamp.value)
  return option?.label || '2 Lines'
}

const getTriggerLabel = () => {
  const option = EXPAND_TRIGGERS.find(o => o.value === selectedTrigger.value)
  return option?.label || 'Click'
}
</script>
<template>
  <n-card>
    <div class="chart-header">
      <h2 class="chart-title">Expandable Content</h2>
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
        <n-dropdown :options="EXPAND_TRIGGERS.map(p => ({ label: p.label, key: p.value }))" @select="handleTriggerSelect" trigger="click">
          <n-button class="period-button" type="warning" strong size="small">
            {{ getTriggerLabel() }}
            <template #icon>
              <n-icon :component="ChevronDownOutline" />
            </template>
          </n-button>
        </n-dropdown>
      </n-space>
    </div>
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">Click to Expand</h3>
        <n-space vertical :size="12">
          <div>
            <span style="color: var(--text-secondary); margin-right: 12px;">Expandable text:</span>
            <n-ellipsis 
              :line-clamp="selectedLineClamp" 
              expand-trigger="click" 
              style="max-width: 400px"
            >
              {{ getCurrentText() }} This is a long text that can be expanded by clicking on it. It demonstrates the expandable functionality of the ellipsis component. When you click on this text, it should expand to show the full content.
            </n-ellipsis>
          </div>
          <div>
            <span style="color: var(--text-secondary); margin-right: 12px;">Short preview:</span>
            <n-ellipsis 
              :line-clamp="1" 
              expand-trigger="click" 
              style="max-width: 400px"
            >
              Short preview that expands to show much more content when clicked. This is perfect for card descriptions, article previews, or any content that needs to be compact by default but fully readable on demand.
            </n-ellipsis>
          </div>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">Different Content Types</h3>
        <n-space vertical :size="12">
          <n-ellipsis :line-clamp="3" expand-trigger="click" style="max-width: 400px">
            <strong>Article Preview:</strong> This is a comprehensive article about modern web development practices and best practices. It covers various aspects including component architecture, state management, performance optimization, and user experience design. The article provides detailed examples and code snippets to help developers understand and implement these concepts effectively.
          </n-ellipsis>
          <n-ellipsis :line-clamp="2" expand-trigger="click" style="max-width: 400px">
            <em>Product Description:</em> Introducing our revolutionary product that combines cutting-edge technology with elegant design. Features include advanced AI integration, seamless connectivity, long-lasting battery life, and an intuitive user interface that makes everyday tasks easier and more enjoyable.
          </n-ellipsis>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>

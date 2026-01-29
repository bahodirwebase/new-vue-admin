<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NDivider, NSpace, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'

import { DIVIDER_COLORS, DIVIDER_SIZES } from '../constants'

const selectedColor = ref('#18a058')
const selectedSize = ref('2px')

const handleColorSelect = (key: string) => {
  selectedColor.value = key
}

const handleSizeSelect = (key: string) => {
  selectedSize.value = key
}

const getDividerStyle = () => {
  return {
    style: `border-color: ${selectedColor.value}; border-width: ${selectedSize.value};`
  }
}

const getColorLabel = () => {
  const color = DIVIDER_COLORS.find(c => c.value === selectedColor.value)
  return color?.label || 'Custom'
}

const getSizeLabel = () => {
  const size = DIVIDER_SIZES.find(s => s.value === selectedSize.value)
  return size?.label || 'Custom'
}
</script>
<template>
  <n-card>
    <div class="chart-header">
      <h2 class="chart-title">Custom Styles</h2>
      <n-space :size="8">
        <n-dropdown :options="DIVIDER_COLORS.map(p => ({ label: p.label, key: p.value }))" @select="handleColorSelect" trigger="click">
          <n-button class="period-button" type="primary" strong size="small">
            {{ getColorLabel() }}
            <template #icon>
              <n-icon :component="ChevronDownOutline" />
            </template>
          </n-button>
        </n-dropdown>
        <n-dropdown :options="DIVIDER_SIZES.map(p => ({ label: p.label, key: p.value }))" @select="handleSizeSelect" trigger="click">
          <n-button class="period-button" type="info" strong size="small">
            {{ getSizeLabel() }}
            <template #icon>
              <n-icon :component="ChevronDownOutline" />
            </template>
          </n-button>
        </n-dropdown>
      </n-space>
    </div>
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">Custom Colors</h3>
        <n-space vertical :size="12">
          <n-divider :style="getDividerStyle().style">Success Divider</n-divider>
          <n-divider :style="getDividerStyle().style">Warning Divider</n-divider>
          <n-divider :style="getDividerStyle().style">Error Divider</n-divider>
          <n-divider :style="getDividerStyle().style">Info Divider</n-divider>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">Different Sizes</h3>
        <n-space vertical :size="12">
          <n-divider :style="getDividerStyle().style">Thin Divider</n-divider>
          <n-divider :style="getDividerStyle().style">Medium Divider</n-divider>
          <n-divider :style="getDividerStyle().style">Thick Divider</n-divider>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>

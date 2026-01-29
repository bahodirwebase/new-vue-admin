<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NDivider, NSpace, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'

import { DIVIDER_STYLES, TITLE_POSITIONS } from '../constants'

const selectedStyle = ref('solid')
const selectedPosition = ref('center')

const handleStyleSelect = (key: string) => {
  selectedStyle.value = key
}

const handlePositionSelect = (key: string) => {
  selectedPosition.value = key
}

const getDividerStyle = () => {
  return selectedStyle.value === 'dashed' ? { dashed: true } : {}
}

const getTitlePosition = () => {
  return selectedPosition.value as 'left' | 'center' | 'right'
}
</script>
<template>
  <n-card>
    <div class="chart-header">
      <h2 class="chart-title">Basic Dividers</h2>
      <n-space :size="8">
        <n-dropdown :options="DIVIDER_STYLES.map(p => ({ label: p.label, key: p.value }))" @select="handleStyleSelect" trigger="click">
          <n-button class="period-button" type="primary" strong size="small">
            {{ selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1) }}
            <template #icon>
              <n-icon :component="ChevronDownOutline" />
            </template>
          </n-button>
        </n-dropdown>
        <n-dropdown :options="TITLE_POSITIONS.map(p => ({ label: p.label, key: p.value }))" @select="handlePositionSelect" trigger="click">
          <n-button class="period-button" type="info" strong size="small">
            {{ selectedPosition.charAt(0).toUpperCase() + selectedPosition.slice(1) }}
            <template #icon>
              <n-icon :component="ChevronDownOutline" />
            </template>
          </n-button>
        </n-dropdown>
      </n-space>
    </div>
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">Horizontal Dividers</h3>
        <n-space vertical :size="12">
          <div>
            <span style="color: var(--text-secondary); margin-right: 12px;">Default divider:</span>
            <n-divider v-bind="getDividerStyle()" />
          </div>
          <div>
            <span style="color: var(--text-secondary); margin-right: 12px;">With title:</span>
            <n-divider v-bind="getDividerStyle()" :title-placement="getTitlePosition()">Title Text</n-divider>
          </div>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">Vertical Divider</h3>
        <n-space :size="12">
          <span>Left</span>
          <n-divider v-bind="getDividerStyle()" vertical />
          <span>Middle</span>
          <n-divider v-bind="getDividerStyle()" vertical />
          <span>Right</span>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>

<template>
  <div class="color-picker-demo">
    <n-space vertical :size="24">
      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <n-card title="Basic Color Picker">
        <n-space vertical :size="16">
          <n-color-picker v-model:value="basicValue" />
          <n-p>Selected color: {{ basicValue }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Color Picker with Alpha">
        <n-space vertical :size="16">
          <n-color-picker v-model:value="alphaValue" :alpha="true" />
          <n-p>Selected color: {{ alphaValue }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Color Picker Modes">
        <n-space vertical :size="16">
          <n-space vertical>
            <n-color-picker v-model:value="hexValue" mode="hex" />
            <n-color-picker v-model:value="rgbValue" mode="rgb" />
            <n-color-picker v-model:value="hslValue" mode="hsl" />
          </n-space>
          <n-p>HEX: {{ hexValue }}</n-p>
          <n-p>RGB: {{ rgbValue }}</n-p>
          <n-p>HSL: {{ hslValue }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Color Picker Sizes">
        <n-space vertical :size="16">
          <n-space vertical>
            <n-color-picker v-model:value="smallValue" size="small" />
            <n-color-picker v-model:value="mediumValue" size="medium" />
            <n-color-picker v-model:value="largeValue" size="large" />
          </n-space>
        </n-space>
      </n-card>
          </n-gi>
          <n-gi>
            <n-card title="Color Picker with Actions">
        <n-space vertical :size="16">
          <n-color-picker
            v-model:value="actionValue"
            :actions="['confirm']"
            @confirm="handleConfirm"
          />
          <n-p>Last confirmed: {{ lastConfirmed || 'None' }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Color Picker with Swatches">
        <n-space vertical :size="16">
          <n-color-picker
            v-model:value="swatchValue"
            :swatches="swatches"
          />
          <n-p>Selected: {{ swatchValue }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Real World Example - Theme Customizer">
        <n-space vertical :size="16">
          <div class="theme-customizer">
            <n-space vertical :size="12">
              <span>Primary Color:</span>
              <n-color-picker v-model:value="theme.primary" />
            </n-space>
            <n-space vertical :size="12">
              <span>Secondary Color:</span>
              <n-color-picker v-model:value="theme.secondary" />
            </n-space>
            <n-space vertical :size="12">
              <span>Background Color:</span>
              <n-color-picker v-model:value="theme.background" />
            </n-space>
            <n-space vertical :size="12">
              <span>Text Color:</span>
              <n-color-picker v-model:value="theme.text" />
            </n-space>
          </div>
          <div class="theme-preview" :style="themePreviewStyle">
            <h3>Theme Preview</h3>
            <p>This is how your theme will look</p>
            <n-button type="primary">Primary Button</n-button>
          </div>
        </n-space>
      </n-card>
          </n-gi>
      </n-grid>      
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Basic Color Picker
const basicValue = ref('#6366f1')

// Color Picker with Alpha
const alphaValue = ref('#6366f180')

// Color Picker Modes
const hexValue = ref('#18a058')
const rgbValue = ref('rgb(24, 160, 88)')
const hslValue = ref('hsl(142, 74%, 36%)')

// Color Picker Sizes
const smallValue = ref('#f0a020')
const mediumValue = ref('#d03050')
const largeValue = ref('#2080f0')

// Color Picker with Actions
const actionValue = ref('#6366f1')
const lastConfirmed = ref('')

const handleConfirm = (value: string) => {
  lastConfirmed.value = value
}

// Color Picker with Swatches
const swatchValue = ref('#6366f1')

const swatches = [
  '#6366f1', // Primary
  '#18a058', // Success
  '#f0a020', // Warning
  '#d03050', // Error
  '#2080f0', // Info
  '#7c3aed', // Purple
  '#ec4899', // Pink
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#6b7280'  // Gray
]

// Real World Example - Theme Customizer
const theme = ref({
  primary: '#6366f1',
  secondary: '#64748b',
  background: 'var(--bg-primary)',
  text: 'var(--text-primary)'
})

const themePreviewStyle = computed(() => ({
  backgroundColor: theme.value.background,
  color: theme.value.text,
  padding: '16px',
  borderRadius: '8px',
  border: `1px solid ${theme.value.secondary}20`
}))
</script>

<style scoped>
/* Component-specific styles are now in common.css */

.theme-preview {
  text-align: center;
}

.theme-preview h3 {
  margin: 0 0 8px 0;
}

.theme-preview p {
  margin: 0 0 12px 0;
  opacity: 0.8;
}
</style>

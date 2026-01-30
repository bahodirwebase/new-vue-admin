<template>
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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

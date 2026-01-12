<template>
  <div class="settings-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Settings</h1>
        <p class="page-subtitle">Configure your preferences</p>
      </div>

      <n-card title="Theme Settings">
        <n-space vertical :size="20">
          <n-form-item label="Dark Mode">
            <n-switch :value="themeStore.isDark" @update:value="themeStore.setDark" />
          </n-form-item>
          <n-form-item label="Boxed Layout">
            <n-switch :value="themeStore.isBoxed" @update:value="themeStore.setBoxed" />
          </n-form-item>
          <n-form-item label="Mini Sidebar">
            <n-switch :value="themeStore.isMiniSidebar" @update:value="themeStore.setMiniSidebar" />
          </n-form-item>
          <n-form-item label="Bordered Theme">
            <n-switch :value="themeStore.isBordered" @update:value="themeStore.setBordered" />
          </n-form-item>
        </n-space>
      </n-card>

      <n-card title="General Settings">
        <n-form :model="settings" label-placement="left" label-width="200">
          <n-form-item label="Site Name">
            <n-input v-model:value="settings.siteName" />
          </n-form-item>
          <n-form-item label="Email">
            <n-input v-model:value="settings.email" type="email" />
          </n-form-item>
          <n-form-item label="Language">
            <n-select v-model:value="settings.language" :options="languageOptions" />
          </n-form-item>
        </n-form>
        <n-button type="primary">Save Changes</n-button>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const settings = ref({
  siteName: 'Manga Admin',
  email: 'admin@example.com',
  language: 'en'
})

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' }
]
</script>

<style scoped>
.settings-page {
  max-width: 100%;
}

.page-header {
  margin-bottom: 8px;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}
</style>

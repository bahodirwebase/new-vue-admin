<script setup lang="ts">
import { ref } from 'vue'
import { SettingsOutline } from '@vicons/ionicons5'
import { usePreferences } from '../composables/usePreferences'
import type { Preferences } from '../types'

const {
  preferences,
  updatePreference,
  savePreferences,
  resetPreferences,
  getPreferenceItems
} = usePreferences()

// Add loading state for save operation
const isLoading = ref(false)

const preferenceItems = getPreferenceItems()

const handleSavePreferences = async () => {
  isLoading.value = true
  try {
    await savePreferences()
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <n-card class="settings-card" :bordered="false">
    <template #header>
      <div class="card-header">
        <div class="header-title">
          <n-icon :component="SettingsOutline" />
          <h3>Preferences</h3>
        </div>
      </div>
    </template>
    <div class="preferences-list">
      <div 
        v-for="item in preferenceItems" 
        :key="item.key" 
        class="preference-item"
      >
        <div class="preference-info">
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
        </div>
        <n-switch 
          :value="preferences[item.key as keyof Preferences]" 
          @update:value="(value: boolean) => updatePreference(item.key as keyof Preferences, value)"
        />
      </div>
    </div>
    
    <div class="preferences-actions">
      <n-space>
        <n-button @click="resetPreferences">Reset to Default</n-button>
        <n-button type="primary" @click="handleSavePreferences" :loading="isLoading">
          Save Preferences
        </n-button>
      </n-space>
    </div>
  </n-card>
</template>

<style scoped>
.settings-card {
  transition: all 0.3s ease;
}

.settings-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-title h3 {
  margin: 0;
  color: var(--text-primary);
}

.preferences-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.preference-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.preference-item:hover {
  border-color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.preference-info {
  flex: 1;
  margin-right: 1rem;
}

.preference-info h4 {
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
  font-weight: 500;
}

.preference-info p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
}

.preferences-actions {
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}
</style>

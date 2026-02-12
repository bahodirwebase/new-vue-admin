<script setup lang="ts">
import { ref } from 'vue'
import {
  HomeOutline,
  SettingsOutline
} from '@vicons/ionicons5'

const activeTab = ref('enabled1')
</script>

<template>
  <n-card title="Tab Features">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Disabled Tabs
        </h3>
        <n-tabs type="line" v-model:value="activeTab">
          <n-tab-pane name="enabled1" tab="Enabled">Enabled tab content</n-tab-pane>
          <n-tab-pane name="disabled" tab="Disabled" disabled>Disabled tab content</n-tab-pane>
          <n-tab-pane name="enabled2" tab="Another Enabled">Another enabled tab</n-tab-pane>
        </n-tabs>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Tabs with Icons
        </h3>
        <n-tabs type="line" v-model:value="activeTab">
          <n-tab-pane name="home" tab="Home">
            <template #tab>
              <n-icon :component="HomeOutline" style="margin-right: 8px" />
              Home
            </template>
            Home tab content
          </n-tab-pane>
          <n-tab-pane name="settings" tab="Settings">
            <template #tab>
              <n-icon :component="SettingsOutline" style="margin-right: 8px" />
              Settings
            </template>
            Settings tab content
          </n-tab-pane>
        </n-tabs>
      </div>
    </n-space>
  </n-card>
</template>

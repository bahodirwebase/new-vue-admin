<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Tabs</h1>
        <p class="page-subtitle">Organized content sections with tabbed navigation</p>
      </div>

      <n-grid x-gap="12" :cols="2" >
        <n-gi>
          <n-card title="Basic Tabs">
            <n-tabs type="line" v-model:value="activeTab1">
              <n-tab-pane name="overview" tab="Overview">
                <p>This is the overview tab content. You can display summary information here.</p>
              </n-tab-pane>
              <n-tab-pane name="details" tab="Details">
                <p>Detailed information goes in this tab. Include comprehensive data and descriptions.</p>
              </n-tab-pane>
              <n-tab-pane name="settings" tab="Settings">
                <p>Configuration and settings can be organized in this tab section.</p>
              </n-tab-pane>
            </n-tabs>
          </n-card>
          <n-card title="Tab Types">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Line Type
                </h3>
                <n-tabs type="line" v-model:value="activeTab2">
                  <n-tab-pane name="tab1" tab="Tab 1">Content for tab 1</n-tab-pane>
                  <n-tab-pane name="tab2" tab="Tab 2">Content for tab 2</n-tab-pane>
                  <n-tab-pane name="tab3" tab="Tab 3">Content for tab 3</n-tab-pane>
                </n-tabs>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Card Type
                </h3>
                <n-tabs type="card" v-model:value="activeTab3">
                  <n-tab-pane name="card1" tab="Card 1">Card tab content 1</n-tab-pane>
                  <n-tab-pane name="card2" tab="Card 2">Card tab content 2</n-tab-pane>
                  <n-tab-pane name="card3" tab="Card 3">Card tab content 3</n-tab-pane>
                </n-tabs>
              </div>
            </n-space>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card title="Advanced Tabs">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Segment Type
                </h3>
                <n-tabs type="segment" v-model:value="activeTab4">
                  <n-tab-pane name="seg1" tab="Segment 1">Segment content 1</n-tab-pane>
                  <n-tab-pane name="seg2" tab="Segment 2">Segment content 2</n-tab-pane>
                  <n-tab-pane name="seg3" tab="Segment 3">Segment content 3</n-tab-pane>
                </n-tabs>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Addable Tabs
                </h3>
                <n-tabs type="card" v-model:value="activeTab5" :closable="true" tab-style="min-width: 80px;">
                  <n-tab-pane v-for="pane in panes" :key="pane.name" :name="pane.name" :tab="pane.name" :closable="pane.closable">
                    {{ pane.content }}
                  </n-tab-pane>
                </n-tabs>
              </div>
            </n-space>
          </n-card>
          <n-card title="Tab Features">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Disabled Tabs
                </h3>
                <n-tabs type="line" v-model:value="activeTab6">
                  <n-tab-pane name="enabled1" tab="Enabled">Enabled tab content</n-tab-pane>
                  <n-tab-pane name="disabled" tab="Disabled" disabled>Disabled tab content</n-tab-pane>
                  <n-tab-pane name="enabled2" tab="Another Enabled">Another enabled tab</n-tab-pane>
                </n-tabs>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Tabs with Icons
                </h3>
                <n-tabs type="line" v-model:value="activeTab7">
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
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  HomeOutline,
  SettingsOutline
} from '@vicons/ionicons5'

const activeTab1 = ref('overview')
const activeTab2 = ref('tab1')
const activeTab3 = ref('card1')
const activeTab4 = ref('seg1')
const activeTab5 = ref('home')
const activeTab6 = ref('enabled1')
const activeTab7 = ref('home')

const panes = ref([
  { name: 'Tab 1', content: 'Content for Tab 1', closable: false },
  { name: 'Tab 2', content: 'Content for Tab 2', closable: true },
  { name: 'Tab 3', content: 'Content for Tab 3', closable: true }
])
</script>

<style scoped>

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

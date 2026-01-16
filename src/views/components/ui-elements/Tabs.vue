<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Tabs</h1>
        <p class="page-subtitle">Organized content sections with tabbed navigation</p>
      </div>

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
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Line Type</h3>
            <n-tabs type="line" v-model:value="activeTab2">
              <n-tab-pane name="tab1" tab="Tab 1">Content for tab 1</n-tab-pane>
              <n-tab-pane name="tab2" tab="Tab 2">Content for tab 2</n-tab-pane>
              <n-tab-pane name="tab3" tab="Tab 3">Content for tab 3</n-tab-pane>
            </n-tabs>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Card Type</h3>
            <n-tabs type="card" v-model:value="activeTab3">
              <n-tab-pane name="card1" tab="Card 1">Card tab content 1</n-tab-pane>
              <n-tab-pane name="card2" tab="Card 2">Card tab content 2</n-tab-pane>
              <n-tab-pane name="card3" tab="Card 3">Card tab content 3</n-tab-pane>
            </n-tabs>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Segment Type</h3>
            <n-tabs type="segment" v-model:value="activeTab4">
              <n-tab-pane name="seg1" tab="Segment 1">Segment content 1</n-tab-pane>
              <n-tab-pane name="seg2" tab="Segment 2">Segment content 2</n-tab-pane>
              <n-tab-pane name="seg3" tab="Segment 3">Segment content 3</n-tab-pane>
            </n-tabs>
          </div>
        </n-space>
      </n-card>

      <n-card title="Animated Tabs">
        <n-tabs type="line" animated v-model:value="activeTab5">
          <n-tab-pane name="home" tab="Home">
            <div style="padding: 20px">
              <h3>Home Content</h3>
              <p>Welcome to the home section. This content animates smoothly when switching tabs.</p>
            </div>
          </n-tab-pane>
          <n-tab-pane name="products" tab="Products">
            <div style="padding: 20px">
              <h3>Products Content</h3>
              <p>Browse through our product catalog. Smooth transitions enhance user experience.</p>
            </div>
          </n-tab-pane>
          <n-tab-pane name="about" tab="About">
            <div style="padding: 20px">
              <h3>About Content</h3>
              <p>Learn more about our company and mission. Animated tabs provide visual feedback.</p>
            </div>
          </n-tab-pane>
        </n-tabs>
      </n-card>

      <n-card title="Tabs with Icons">
        <n-tabs type="line" v-model:value="activeTab6">
          <n-tab-pane name="dashboard" tab="Dashboard">
            <template #tab>
              <n-icon :component="SpeedometerOutline" style="margin-right: 6px" />
              Dashboard
            </template>
            <p>Dashboard content with icon in tab label.</p>
          </n-tab-pane>
          <n-tab-pane name="analytics" tab="Analytics">
            <template #tab>
              <n-icon :component="AnalyticsOutline" style="margin-right: 6px" />
              Analytics
            </template>
            <p>Analytics content with icon in tab label.</p>
          </n-tab-pane>
          <n-tab-pane name="settings" tab="Settings">
            <template #tab>
              <n-icon :component="SettingsOutline" style="margin-right: 6px" />
              Settings
            </template>
            <p>Settings content with icon in tab label.</p>
          </n-tab-pane>
        </n-tabs>
      </n-card>

      <n-card title="Closable Tabs">
        <n-tabs type="card" closable v-model:value="activeTab7" @close="handleTabClose">
          <n-tab-pane name="tab1" tab="Tab 1" closable>
            <p>This tab can be closed by clicking the X button.</p>
          </n-tab-pane>
          <n-tab-pane name="tab2" tab="Tab 2" closable>
            <p>Another closable tab with content.</p>
          </n-tab-pane>
          <n-tab-pane name="tab3" tab="Tab 3" closable>
            <p>Third closable tab example.</p>
          </n-tab-pane>
        </n-tabs>
      </n-card>

      <n-card title="Tabs with Badges">
        <n-tabs type="line" v-model:value="activeTab8">
          <n-tab-pane name="inbox" tab="Inbox">
            <template #tab>
              Inbox
              <n-badge value="5" type="error" style="margin-left: 8px" />
            </template>
            <p>Inbox tab with notification badge.</p>
          </n-tab-pane>
          <n-tab-pane name="sent" tab="Sent">
            <template #tab>
              Sent
              <n-badge value="12" type="info" style="margin-left: 8px" />
            </template>
            <p>Sent tab with count badge.</p>
          </n-tab-pane>
          <n-tab-pane name="drafts" tab="Drafts">
            <template #tab>
              Drafts
              <n-badge value="New" type="success" style="margin-left: 8px" />
            </template>
            <p>Drafts tab with status badge.</p>
          </n-tab-pane>
        </n-tabs>
      </n-card>

      <n-card title="Vertical Tabs">
        <n-tabs type="line" placement="left" v-model:value="activeTab9" style="height: 300px">
          <n-tab-pane name="v1" tab="Vertical Tab 1">
            <p>Content for vertical tab 1. Tabs are displayed on the left side.</p>
          </n-tab-pane>
          <n-tab-pane name="v2" tab="Vertical Tab 2">
            <p>Content for vertical tab 2. Useful for sidebar navigation.</p>
          </n-tab-pane>
          <n-tab-pane name="v3" tab="Vertical Tab 3">
            <p>Content for vertical tab 3. Provides alternative layout options.</p>
          </n-tab-pane>
        </n-tabs>
      </n-card>

      <n-card title="Tabs with Add Button">
        <n-tabs type="card" addable v-model:value="activeTab10" @add="handleAddTab" @close="handleTabClose">
          <n-tab-pane
            v-for="tab in dynamicTabs"
            :key="tab.name"
            :name="tab.name"
            :tab="tab.label"
            closable
          >
            <p>Content for {{ tab.label }}</p>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  SpeedometerOutline,
  AnalyticsOutline,
  SettingsOutline
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { useMessage } from 'naive-ui'

const message = useMessage()

const activeTab1 = ref('overview')
const activeTab2 = ref('tab1')
const activeTab3 = ref('card1')
const activeTab4 = ref('seg1')
const activeTab5 = ref('home')
const activeTab6 = ref('dashboard')
const activeTab7 = ref('tab1')
const activeTab8 = ref('inbox')
const activeTab9 = ref('v1')
const activeTab10 = ref('tab1')

const dynamicTabs = ref([
  { name: 'tab1', label: 'Tab 1' },
  { name: 'tab2', label: 'Tab 2' },
  { name: 'tab3', label: 'Tab 3' }
])

let tabCounter = 4

const handleTabClose = (name: string) => {
  message.info(`Tab "${name}" closed`)
}

const handleAddTab = () => {
  const newTab = {
    name: `tab${tabCounter}`,
    label: `Tab ${tabCounter}`
  }
  dynamicTabs.value.push(newTab)
  activeTab10.value = newTab.name
  tabCounter++
  message.success(`Added ${newTab.label}`)
}
</script>

<style scoped>
.ui-page {
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

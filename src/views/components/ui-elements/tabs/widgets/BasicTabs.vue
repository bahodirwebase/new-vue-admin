<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('overview')
</script>

<template>
  <n-card title="Basic Tabs">
    <n-tabs type="line" v-model:value="activeTab">
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
</template>

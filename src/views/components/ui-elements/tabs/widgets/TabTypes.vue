<template>
  <n-card title="Tab Types">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Line Type
        </h3>
        <n-tabs type="line" v-model:value="activeTab1">
          <n-tab-pane name="tab1" tab="Tab 1">Content for tab 1</n-tab-pane>
          <n-tab-pane name="tab2" tab="Tab 2">Content for tab 2</n-tab-pane>
          <n-tab-pane name="tab3" tab="Tab 3">Content for tab 3</n-tab-pane>
        </n-tabs>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Card Type
        </h3>
        <n-tabs type="card" v-model:value="activeTab2">
          <n-tab-pane name="card1" tab="Card 1">Card tab content 1</n-tab-pane>
          <n-tab-pane name="card2" tab="Card 2">Card tab content 2</n-tab-pane>
          <n-tab-pane name="card3" tab="Card 3">Card tab content 3</n-tab-pane>
        </n-tabs>
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab1 = ref('tab1')
const activeTab2 = ref('card1')
</script>

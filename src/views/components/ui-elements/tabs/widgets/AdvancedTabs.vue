<template>
  <n-card title="Advanced Tabs">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Segment Type
        </h3>
        <n-tabs type="segment" v-model:value="activeTab1">
          <n-tab-pane name="seg1" tab="Segment 1">Segment content 1</n-tab-pane>
          <n-tab-pane name="seg2" tab="Segment 2">Segment content 2</n-tab-pane>
          <n-tab-pane name="seg3" tab="Segment 3">Segment content 3</n-tab-pane>
        </n-tabs>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Addable Tabs
        </h3>
        <n-tabs type="card" v-model:value="activeTab2" :closable="true" tab-style="min-width: 80px;">
          <n-tab-pane v-for="pane in panes" :key="pane.name" :name="pane.name" :tab="pane.name" :closable="pane.closable">
            {{ pane.content }}
          </n-tab-pane>
        </n-tabs>
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab1 = ref('seg1')
const activeTab2 = ref('home')

const panes = ref([
  { name: 'Tab 1', content: 'Content for Tab 1', closable: false },
  { name: 'Tab 2', content: 'Content for Tab 2', closable: true },
  { name: 'Tab 3', content: 'Content for Tab 3', closable: true }
])
</script>

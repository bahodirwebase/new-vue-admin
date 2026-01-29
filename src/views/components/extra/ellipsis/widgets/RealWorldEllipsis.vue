<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NEllipsis, NSpace, NList, NListItem } from 'naive-ui'

const listItems = ref([
  { 
    id: 1, 
    title: 'First Item', 
    description: 'This is a very long description that needs to be truncated properly in the list view to maintain clean layout' 
  },
  { 
    id: 2, 
    title: 'Second Item with a Very Long Title That Should Be Truncated', 
    description: 'Another lengthy description that demonstrates ellipsis functionality in real-world scenarios' 
  },
  { 
    id: 3, 
    title: 'Third Item', 
    description: 'Yet another long description text for testing purposes and showing how ellipsis works in practice' 
  },
  { 
    id: 4, 
    title: 'Fourth Item with Extremely Long Title That Definitely Needs Truncation', 
    description: 'This is the longest description in the list that will definitely be truncated to show the ellipsis feature working properly' 
  }
])
</script>
<template>
  <n-card>
    <div class="chart-header">
      <h2 class="chart-title">Real-world Examples</h2>
    </div>
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">Card Description</h3>
        <n-card size="small" style="max-width: 400px">
          <template #header>
            <n-ellipsis style="max-width: 200px">This is a very long card title that should be truncated</n-ellipsis>
          </template>
          <n-ellipsis :line-clamp="3" style="max-width: 100%">
            This is a detailed description of the card content. It can be quite long and needs to be truncated to maintain the layout. Users can expand it to read the full description if they're interested in learning more about this particular card item.
          </n-ellipsis>
        </n-card>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">List Items</h3>
        <n-list style="max-width: 400px">
          <n-list-item v-for="item in listItems" :key="item.id">
            <n-space vertical :size="4">
              <n-ellipsis style="max-width: 300px; font-weight: 600;">
                {{ item.title }}
              </n-ellipsis>
              <n-ellipsis style="max-width: 300px; color: var(--text-secondary); font-size: 14px;">
                {{ item.description }}
              </n-ellipsis>
            </n-space>
          </n-list-item>
        </n-list>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">Product Cards</h3>
        <n-space vertical :size="12">
          <n-card size="small" style="max-width: 350px">
            <template #header>
              <n-ellipsis style="max-width: 200px; font-weight: 600;">
                Premium Wireless Headphones with Active Noise Cancellation
              </n-ellipsis>
            </template>
            <n-ellipsis :line-clamp="2" style="max-width: 100%; color: var(--text-secondary);">
              Experience superior sound quality with our premium wireless headphones featuring advanced active noise cancellation technology, 30-hour battery life, and comfortable over-ear design perfect for long listening sessions.
            </n-ellipsis>
          </n-card>

          <n-card size="small" style="max-width: 350px">
            <template #header>
              <n-ellipsis style="max-width: 200px; font-weight: 600;">
                Smart Home Security Camera System with AI Detection
              </n-ellipsis>
            </template>
            <n-ellipsis :line-clamp="2" style="max-width: 100%; color: var(--text-secondary);">
              Advanced AI-powered security system with 4K resolution, night vision, two-way audio, and intelligent motion detection that distinguishes between people, pets, and vehicles for accurate alerts.
            </n-ellipsis>
          </n-card>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">User Comments</h3>
        <n-space vertical :size="12">
          <n-card size="small" style="max-width: 400px">
            <div style="margin-bottom: 8px;">
              <strong>John Doe</strong>
              <span style="color: var(--text-secondary); margin-left: 8px; font-size: 12px;">2 hours ago</span>
            </div>
            <n-ellipsis :line-clamp="3" style="max-width: 100%;">
              This product is absolutely amazing! I've been using it for the past month and it has completely exceeded my expectations. The build quality is outstanding, the performance is top-notch, and the customer service is exceptional. Highly recommend to anyone looking for a reliable solution.
            </n-ellipsis>
          </n-card>

          <n-card size="small" style="max-width: 400px">
            <div style="margin-bottom: 8px;">
              <strong>Jane Smith</strong>
              <span style="color: var(--text-secondary); margin-left: 8px; font-size: 12px;">5 hours ago</span>
            </div>
            <n-ellipsis :line-clamp="2" style="max-width: 100%;">
              Great value for money. Easy to set up and works perfectly with my existing setup.
            </n-ellipsis>
          </n-card>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>

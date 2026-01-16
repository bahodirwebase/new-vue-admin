<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Ellipsis</h1>
        <p class="page-subtitle">Text truncation with expandable content and tooltip support</p>
      </div>

      <n-card title="Basic Ellipsis">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Single Line</h3>
            <n-space vertical :size="12">
              <n-ellipsis style="max-width: 300px">
                This is a long text that will be truncated with ellipsis when it exceeds the container width.
              </n-ellipsis>
              <n-ellipsis style="max-width: 200px">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </n-ellipsis>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Multiple Lines</h3>
            <n-space vertical :size="12">
              <n-ellipsis :line-clamp="2" style="max-width: 300px">
                This is a very long text that spans multiple lines and will be truncated after the specified number of lines. 
                The content continues here and should be truncated properly to demonstrate the line-clamp functionality.
              </n-ellipsis>
              <n-ellipsis :line-clamp="3" style="max-width: 300px">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </n-ellipsis>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Expandable Content">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Click to Expand</h3>
            <n-space vertical :size="12">
              <n-ellipsis :line-clamp="2" expand-trigger="click" style="max-width: 400px">
                This is a long text that can be expanded by clicking on it. It demonstrates the expandable functionality 
                of the ellipsis component. When you click on this text, it should expand to show the full content.
                This is useful for showing preview content that users can expand to read more.
              </n-ellipsis>
              <n-ellipsis :line-clamp="1" expand-trigger="click" style="max-width: 400px">
                Short preview that expands to show much more content when clicked. This is perfect for card descriptions, 
                article previews, or any content that needs to be compact by default but fully readable on demand.
              </n-ellipsis>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="With Tooltips">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary">Tooltip on Hover</h3>
            <n-space vertical :size="12">
              <n-ellipsis style="max-width: 250px" :tooltip="true">
                This text shows a tooltip with the full content when you hover over it.
              </n-ellipsis>
              <n-ellipsis :line-clamp="2" style="max-width: 250px" :tooltip="true">
                Multi-line text with tooltip support. Hover over this truncated text to see the complete content in a tooltip.
              </n-ellipsis>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Custom Tooltip</h3>
            <n-space vertical :size="12">
              <n-ellipsis 
                style="max-width: 250px" 
                :tooltip="true"
              >
                Text with custom tooltip content.
              </n-ellipsis>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Styling Variations">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Different Font Sizes</h3>
            <n-space vertical :size="12">
              <n-ellipsis style="max-width: 300px; font-size: 12px">
                Small text with ellipsis truncation for compact displays.
              </n-ellipsis>
              <n-ellipsis style="max-width: 300px; font-size: 16px">
                Regular text with ellipsis truncation for normal content display.
              </n-ellipsis>
              <n-ellipsis style="max-width: 300px; font-size: 20px; font-weight: 600">
                Large heading text with ellipsis for titles and headers.
              </n-ellipsis>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Different Colors</h3>
            <n-space vertical :size="12">
              <n-ellipsis style="max-width: 300px; color: var(--text-primary)">
                Primary text color with ellipsis truncation.
              </n-ellipsis>
              <n-ellipsis style="max-width: 300px; color: var(--text-secondary)">
                Secondary text color with ellipsis truncation.
              </n-ellipsis>
              <n-ellipsis style="max-width: 300px; color: #18a058">
                Success text color with ellipsis truncation.
              </n-ellipsis>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Real-world Examples">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Card Description</h3>
            <n-card size="small" style="max-width: 400px">
              <template #header>
                <n-ellipsis style="max-width: 200px">This is a very long card title that should be truncated</n-ellipsis>
              </template>
              <n-ellipsis :line-clamp="3" style="max-width: 100%">
                This is a detailed description of the card content. It can be quite long and needs to be truncated 
                to maintain the layout. Users can expand it to read the full description if they're interested in 
                learning more about this particular card item.
              </n-ellipsis>
            </n-card>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">List Items</h3>
            <n-list style="max-width: 400px">
              <n-list-item v-for="item in listItems" :key="item.id">
                <n-ellipsis style="max-width: 300px">
                  {{ item.title }} - {{ item.description }}
                </n-ellipsis>
              </n-list-item>
            </n-list>
          </div>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { NEllipsis, NSpace, NCard, NList, NListItem } from 'naive-ui'
import { ref } from 'vue'

const listItems = ref([
  { id: 1, title: 'First Item', description: 'This is a very long description that needs to be truncated properly' },
  { id: 2, title: 'Second Item', description: 'Another lengthy description that demonstrates ellipsis functionality' },
  { id: 3, title: 'Third Item', description: 'Yet another long description text for testing purposes' }
])
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

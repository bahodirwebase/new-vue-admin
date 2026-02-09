<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NDivider, NSpace, NIcon, NButton } from 'naive-ui'
import { ChevronDownOutline, CheckmarkCircle } from '@vicons/ionicons5'
import CustomTag from '@/components/CustomTag.vue'

const selectedContentType = ref('icon')

const handleContentTypeSelect = (key: string) => {
  selectedContentType.value = key
}

const getContentTypeLabel = () => {
  return selectedContentType.value.charAt(0).toUpperCase() + selectedContentType.value.slice(1)
}
</script>
<template>
  <n-card>
    <div class="chart-header">
      <h2 class="chart-title">Rich Content</h2>
      <n-dropdown :options="[
        { label: 'Icon', key: 'icon' },
        { label: 'Tag', key: 'tag' },
        { label: 'Button', key: 'button' }
      ]" @select="handleContentTypeSelect" trigger="click">
        <n-button class="period-button" type="primary" strong size="small">
          {{ getContentTypeLabel() }}
          <template #icon>
            <n-icon :component="ChevronDownOutline" />
          </template>
        </n-button>
      </n-dropdown>
    </div>
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">Rich Content Dividers</h3>
        <n-space vertical :size="12">
          <n-divider>
            <n-space align="center" :size="8">
              <n-icon color="#18a058">
                <CheckmarkCircle />
              </n-icon>
              <span>Completed Section</span>
            </n-space>
          </n-divider>
          
          <n-divider>
            <CustomTag type="info" size="small">Important</CustomTag>
          </n-divider>
          
          <n-divider>
            <n-button size="tiny" type="primary">Action</n-button>
          </n-divider>

          <n-divider>
            <n-space align="center" :size="8">
              <n-icon color="#f0a020">
                <CheckmarkCircle />
              </n-icon>
              <CustomTag type="warning" size="small">In Progress</CustomTag>
              <n-button size="tiny" secondary>View</n-button>
            </n-space>
          </n-divider>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">Mixed Content</h3>
        <n-space vertical :size="12">
          <n-divider title-placement="left">
            <n-space align="center" :size="8">
              <n-icon color="#18a058">
                <CheckmarkCircle />
              </n-icon>
              <span>Left Aligned</span>
            </n-space>
          </n-divider>
          
          <n-divider title-placement="center">
            <n-space align="center" :size="8">
              <n-icon color="#2080f0">
                <CheckmarkCircle />
              </n-icon>
              <CustomTag type="info" size="small">Center Aligned</CustomTag>
            </n-space>
          </n-divider>
          
          <n-divider title-placement="right">
            <n-space align="center" :size="8">
              <span>Right Aligned</span>
              <n-icon color="#d03050">
                <CheckmarkCircle />
              </n-icon>
            </n-space>
          </n-divider>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { NPageHeader, NSpace, NButton } from 'naive-ui'
import { TAG_EXAMPLES } from '../constants'
import CustomTag from '@/components/CustomTag.vue'
</script>

<template>
  <n-space vertical :size="16">
    <div class="example-section">
      <h3>Status Tags</h3>
      <n-page-header 
        title="Project Alpha" 
        subtitle="New feature development project" 
        :tag="TAG_EXAMPLES.warning"
      >
        <template #extra>
          <n-space>
            <n-button>View Details</n-button>
            <n-button type="primary">Edit Project</n-button>
          </n-space>
        </template>
      </n-page-header>
    </div>

    <div class="example-section">
      <h3>Multiple Tags</h3>
      <n-page-header title="Documentation Site" subtitle="Comprehensive documentation platform">
        <template #extra>
          <n-space>
            <CustomTag type="success" size="small">Live</CustomTag>
            <CustomTag type="info" size="small">v2.0</CustomTag>
            <n-button type="primary">Manage</n-button>
          </n-space>
        </template>
      </n-page-header>
    </div>
  </n-space>
</template>

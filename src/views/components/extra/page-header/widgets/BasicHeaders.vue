<script setup lang="ts">
import { NPageHeader, NSpace, NButton } from 'naive-ui'

const handleBack = () => {
  console.log('Back button clicked')
}
</script>

<template>
  <n-space vertical :size="16">
    <div class="example-section">
      <h3>Simple Header</h3>
      <n-page-header title="Page Title" subtitle="Page description or subtitle">
        <template #extra>
          <n-button type="primary">Action</n-button>
        </template>
      </n-page-header>
    </div>

    <div class="example-section">
      <h3>With Back Button</h3>
      <n-page-header 
        title="Detail Page" 
        subtitle="Viewing detailed information" 
        :show-back="true"
        @back="handleBack"
      >
        <template #extra>
          <n-space>
            <n-button>Cancel</n-button>
            <n-button type="primary">Save</n-button>
          </n-space>
        </template>
      </n-page-header>
    </div>
  </n-space>
</template>

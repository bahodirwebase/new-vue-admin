<script setup lang="ts">
import { NPageHeader, NSpace, NButton } from 'naive-ui'
import { BREADCRUMB_EXAMPLES } from '../constants'
</script>

<template>
  <n-space vertical :size="16">
    <div class="example-section">
      <h3>Breadcrumb Navigation</h3>
      <n-page-header 
        title="Product Details" 
        subtitle="View and manage product information"
        :breadcrumb="BREADCRUMB_EXAMPLES.simple"
      >
        <template #extra>
          <n-button type="primary">Edit Product</n-button>
        </template>
      </n-page-header>
    </div>

    <div class="example-section">
      <h3>Deep Breadcrumb Path</h3>
      <n-page-header 
        title="Settings" 
        subtitle="Application configuration" 
        :breadcrumb="BREADCRUMB_EXAMPLES.deep"
      >
        <template #extra>
          <n-space>
            <n-button>Reset</n-button>
            <n-button type="primary">Save Changes</n-button>
          </n-space>
        </template>
      </n-page-header>
    </div>
  </n-space>
</template>

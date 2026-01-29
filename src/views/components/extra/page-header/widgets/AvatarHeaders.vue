<script setup lang="ts">
import { NPageHeader, NSpace, NButton } from 'naive-ui'
import { AVATAR_EXAMPLES } from '../constants'
</script>

<template>
  <n-space vertical :size="16">
    <div class="example-section">
      <h3>User Profile Header</h3>
      <n-page-header 
        title="John Doe" 
        subtitle="Senior Developer" 
        :avatar="AVATAR_EXAMPLES.user"
      >
        <template #extra>
          <n-space>
            <n-button>Message</n-button>
            <n-button type="primary">Follow</n-button>
          </n-space>
        </template>
      </n-page-header>
    </div>

    <div class="example-section">
      <h3>Company Header</h3>
      <n-page-header 
        title="Tech Company Inc." 
        subtitle="Software Development & Consulting" 
        :avatar="AVATAR_EXAMPLES.company"
      >
        <template #extra>
          <n-space>
            <n-button>View Website</n-button>
            <n-button type="primary">Contact</n-button>
          </n-space>
        </template>
      </n-page-header>
    </div>
  </n-space>
</template>

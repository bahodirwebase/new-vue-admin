<script setup lang="ts">
import { NPageHeader, NSpace, NButton, NIcon } from 'naive-ui'
import { Time, Person, Eye } from '@vicons/ionicons5'
import { BREADCRUMB_EXAMPLES } from '../constants'
</script>

<template>
  <n-space vertical :size="16">
    <div class="example-section">
      <h3>With Additional Information</h3>
      <n-page-header 
        title="Blog Post" 
        subtitle="Latest article and updates" 
        :breadcrumb="BREADCRUMB_EXAMPLES.blog"
      >
        <template #extra>
          <n-space>
            <n-button>Preview</n-button>
            <n-button type="primary">Publish</n-button>
          </n-space>
        </template>
        <template #footer>
          <div class="footer-meta">
            <div class="meta-item">
              <n-icon size="16">
                <Time />
              </n-icon>
              <span>Last updated 2 hours ago</span>
            </div>
            <div class="meta-item">
              <n-icon size="16">
                <Person />
              </n-icon>
              <span>By John Doe</span>
            </div>
            <div class="meta-item">
              <n-icon size="16">
                <Eye />
              </n-icon>
              <span>1,234 views</span>
            </div>
          </div>
        </template>
      </n-page-header>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { NPageHeader, NSpace, NButton } from 'naive-ui'
import { BREADCRUMB_EXAMPLES, AVATAR_EXAMPLES } from '../constants'
import CustomTag from '@/components/custom/CustomTag.vue'

const handleBack = () => {
  console.log('Back button clicked')
}
</script>

<template>
  <n-space vertical :size="16">
    <div class="example-section">
      <h3>E-commerce Product</h3>
      <n-page-header 
        title="Premium Headphones" 
        subtitle="Wireless noise-cancelling headphones"
        :breadcrumb="BREADCRUMB_EXAMPLES.ecommerce" 
        :avatar="AVATAR_EXAMPLES.product"
      >
        <template #extra>
          <n-space>
            <CustomTag type="success">In Stock</CustomTag>
            <n-button secondary>Add to Wishlist</n-button>
            <n-button type="primary">Add to Cart</n-button>
          </n-space>
        </template>
      </n-page-header>
    </div>

    <div class="example-section">
      <h3>Document Editor</h3>
      <n-page-header 
        title="Q4 Marketing Strategy.docx" 
        subtitle="Last edited by Sarah Wilson"
        :show-back="true"
        @back="handleBack"
      >
        <template #extra>
          <n-space>
            <n-button secondary>Share</n-button>
            <n-button secondary>Download</n-button>
            <n-button type="primary">Edit</n-button>
          </n-space>
        </template>
        <template #footer>
          <div class="footer-meta">
            <div class="meta-item">
              <span>Size: 2.4 MB</span>
            </div>
            <div class="meta-item">
              <span>Modified: Oct 15, 2024</span>
            </div>
            <div class="meta-item">
              <span>Words: 5,432</span>
            </div>
          </div>
        </template>
      </n-page-header>
    </div>
  </n-space>
</template>

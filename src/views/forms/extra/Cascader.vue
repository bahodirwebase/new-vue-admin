<template>
  <div class="cascader-demo">
    <n-space vertical :size="24">
      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <n-card title="Basic Cascader">
            <n-space vertical :size="16">
              <n-cascader v-model:value="basicValue" :options="basicOptions" placeholder="Select option" />
              <n-p>Selected: {{ JSON.stringify(basicValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Multiple Selection">
            <n-space vertical :size="16">
              <n-cascader v-model:value="multipleValue" :options="basicOptions" multiple
                placeholder="Select multiple options" />
              <n-p>Selected: {{ JSON.stringify(multipleValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Expand Trigger">
            <n-space vertical :size="16">
              <n-cascader v-model:value="hoverValue" :options="basicOptions" expand-trigger="hover"
                placeholder="Hover to expand" />
              <n-p>Selected: {{ JSON.stringify(hoverValue) }}</n-p>
            </n-space>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card title="Checkable">
            <n-space vertical :size="16">
              <n-cascader v-model:value="checkableValue" :options="basicOptions" checkable
                placeholder="Checkable options" />
              <n-p>Selected: {{ JSON.stringify(checkableValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Custom Render">
            <n-space vertical :size="16">
              <n-cascader v-model:value="customValue" :options="customOptions" :render-option="renderCustomOption"
                placeholder="Custom rendered options" />
              <n-p>Selected: {{ JSON.stringify(customValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Real World Example - Product Category">
            <n-space vertical :size="16">
              <n-cascader v-model:value="categoryValue" :options="categoryOptions" placeholder="Select product category"
                checkable />
              <n-input v-model:value="productName" placeholder="Product name" style="margin-top: 12px;" />
              <n-input-number v-model:value="productPrice" placeholder="Price" style="margin-top: 12px;" />
            </n-space>
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NTag } from 'naive-ui'

// Basic Cascader
const basicValue = ref(null)

const basicOptions = [
  {
    label: 'Electronics',
    value: 'electronics',
    children: [
      {
        label: 'Phones',
        value: 'phones',
        children: [
          { label: 'iPhone', value: 'iphone' },
          { label: 'Samsung', value: 'samsung' },
          { label: 'Xiaomi', value: 'xiaomi' }
        ]
      },
      {
        label: 'Laptops',
        value: 'laptops',
        children: [
          { label: 'MacBook', value: 'macbook' },
          { label: 'Dell', value: 'dell' },
          { label: 'HP', value: 'hp' }
        ]
      }
    ]
  },
  {
    label: 'Clothing',
    value: 'clothing',
    children: [
      {
        label: 'Men',
        value: 'men',
        children: [
          { label: 'Shirts', value: 'shirts' },
          { label: 'Pants', value: 'pants' },
          { label: 'Shoes', value: 'shoes' }
        ]
      },
      {
        label: 'Women',
        value: 'women',
        children: [
          { label: 'Dresses', value: 'dresses' },
          { label: 'Tops', value: 'tops' },
          { label: 'Skirts', value: 'skirts' }
        ]
      }
    ]
  }
]

// Multiple Selection
const multipleValue = ref([])

// Expand Trigger
const hoverValue = ref(null)

// Checkable
const checkableValue = ref([])

// Custom Render
const customValue = ref(null)

const customOptions = [
  {
    label: 'Frontend',
    value: 'frontend',
    children: [
      { label: 'Vue.js', value: 'vue', type: 'framework' },
      { label: 'React', value: 'react', type: 'framework' },
      { label: 'Angular', value: 'angular', type: 'framework' }
    ]
  },
  {
    label: 'Backend',
    value: 'backend',
    children: [
      { label: 'Node.js', value: 'node', type: 'runtime' },
      { label: 'Python', value: 'python', type: 'language' },
      { label: 'Java', value: 'java', type: 'language' }
    ]
  }
]

const renderCustomOption = ({ option }: any) => {
  return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
    option.type && h(NTag, {
      type: option.type === 'framework' ? 'info' : 'success',
      size: 'small'
    }, { default: () => option.type }),
    h('span', option.label)
  ])
}

// Real World Example - Product Category
const categoryValue = ref([])
const productName = ref('')
const productPrice = ref(null)

const categoryOptions = [
  {
    label: 'Electronics',
    value: 'electronics',
    children: [
      {
        label: 'Smartphones',
        value: 'smartphones',
        children: [
          { label: 'iPhone 14', value: 'iphone14' },
          { label: 'Samsung Galaxy', value: 'galaxy' },
          { label: 'Pixel 7', value: 'pixel7' }
        ]
      },
      {
        label: 'Tablets',
        value: 'tablets',
        children: [
          { label: 'iPad Pro', value: 'ipadpro' },
          { label: 'Surface Pro', value: 'surfacepro' },
          { label: 'Galaxy Tab', value: 'galaxytab' }
        ]
      }
    ]
  },
  {
    label: 'Home & Garden',
    value: 'home',
    children: [
      {
        label: 'Furniture',
        value: 'furniture',
        children: [
          { label: 'Sofas', value: 'sofas' },
          { label: 'Chairs', value: 'chairs' },
          { label: 'Tables', value: 'tables' }
        ]
      },
      {
        label: 'Decor',
        value: 'decor',
        children: [
          { label: 'Wall Art', value: 'wallart' },
          { label: 'Lighting', value: 'lighting' },
          { label: 'Rugs', value: 'rugs' }
        ]
      }
    ]
  }
]
</script>

<style scoped>
.cascader-demo {
  padding: 0;
}

.n-card {
  margin-bottom: 12px;
}

.n-p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}
</style>

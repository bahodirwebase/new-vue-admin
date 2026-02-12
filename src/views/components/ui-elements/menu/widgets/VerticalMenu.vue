<script setup lang="ts">
import type { MenuOption } from 'naive-ui'

const verticalMenuOptions: MenuOption[] = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    children: [
      { label: 'Analytics', key: 'analytics' },
      { label: 'Reports', key: 'reports' },
      { label: 'Overview', key: 'overview' }
    ]
  },
  {
    label: 'Products',
    key: 'products',
    children: [
      { label: 'All Products', key: 'all-products' },
      { label: 'Categories', key: 'categories' },
      { label: 'Inventory', key: 'inventory' }
    ]
  },
  {
    label: 'Settings',
    key: 'settings'
  }
]
</script>

<template>
  <n-card title="Vertical Menu">
    <n-menu :options="verticalMenuOptions" :default-expanded-keys="['dashboard']" />
  </n-card>
</template>
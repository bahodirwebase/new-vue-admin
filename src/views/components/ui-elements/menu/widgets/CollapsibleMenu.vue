<script setup lang="ts">
import type { MenuOption } from 'naive-ui'

const collapsibleMenuOptions: MenuOption[] = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    children: [
      { label: 'Overview', key: 'overview' },
      { label: 'Analytics', key: 'analytics' }
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
    label: 'Users',
    key: 'users'
  }
]
</script>

<template>
  <n-card title="Collapsible Menu">
    <n-menu :options="collapsibleMenuOptions" :default-expanded-keys="['dashboard', 'products']" accordion />
  </n-card>
</template>

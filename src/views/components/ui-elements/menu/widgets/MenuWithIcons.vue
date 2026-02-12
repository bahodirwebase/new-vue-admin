<script setup lang="ts">
import { h } from 'vue'
import type { MenuOption } from 'naive-ui'
import {
  SpeedometerOutline,
  AnalyticsOutline,
  CubeOutline,
  SettingsOutline,
  PeopleOutline,
  StorefrontOutline
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

const renderIcon = (icon: any) => {
  return () => h(NIcon, { component: icon })
}

const iconMenuOptions: MenuOption[] = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: renderIcon(SpeedometerOutline),
    children: [
      {
        label: 'Analytics',
        key: 'analytics',
        icon: renderIcon(AnalyticsOutline)
      },
      {
        label: 'Reports',
        key: 'reports',
        icon: renderIcon(AnalyticsOutline)
      }
    ]
  },
  {
    label: 'Products',
    key: 'products',
    icon: renderIcon(CubeOutline),
    children: [
      {
        label: 'All Products',
        key: 'all-products',
        icon: renderIcon(CubeOutline)
      },
      {
        label: 'Categories',
        key: 'categories',
        icon: renderIcon(StorefrontOutline)
      }
    ]
  },
  {
    label: 'Users',
    key: 'users',
    icon: renderIcon(PeopleOutline)
  },
  {
    label: 'Settings',
    key: 'settings',
    icon: renderIcon(SettingsOutline)
  }
]
</script>

<template>
  <n-card title="Menu with Icons">
    <n-menu :options="iconMenuOptions" :default-expanded-keys="['products']" />
  </n-card>
</template>
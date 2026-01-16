<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Menu</h1>
        <p class="page-subtitle">Navigation menus for organizing content and features</p>
      </div>

      <n-grid :cols="2" :x-gap="16">
        <n-grid-item>
          <n-card title="Vertical Menu">
            <n-menu :options="verticalMenuOptions" :default-expanded-keys="['dashboard']" />
          </n-card>
        </n-grid-item>

        <n-grid-item>
          <n-card title="Horizontal Menu">
            <n-menu mode="horizontal" :options="horizontalMenuOptions" />
          </n-card>
        </n-grid-item>
      </n-grid>

      <n-card title="Menu with Icons">
        <n-menu :options="iconMenuOptions" :default-expanded-keys="['products']" />
      </n-card>

      <n-card title="Menu Styles">
        <n-grid :cols="2" :x-gap="16">
          <n-grid-item>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Default Style</h3>
            <n-menu :options="styleMenuOptions" />
          </n-grid-item>

          <n-grid-item>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Inverted Style</h3>
            <n-menu :options="styleMenuOptions" inverted />
          </n-grid-item>
        </n-grid>
      </n-card>

      <n-card title="Collapsible Menu">
        <n-menu
          :options="collapsibleMenuOptions"
          :default-expanded-keys="['dashboard', 'products']"
          accordion
        />
      </n-card>

      <n-card title="Menu with Badges">
        <n-menu :options="badgeMenuOptions" />
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import type { MenuOption } from 'naive-ui'
import {
  SpeedometerOutline,
  AnalyticsOutline,
  CubeOutline,
  SettingsOutline,
  PeopleOutline,
  StorefrontOutline,
  NotificationsOutline,
  MailOutline
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

const renderIcon = (icon: any) => {
  return () => h(NIcon, { component: icon })
}

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

const horizontalMenuOptions: MenuOption[] = [
  { label: 'Home', key: 'home' },
  { label: 'Products', key: 'products' },
  { label: 'About', key: 'about' },
  { label: 'Contact', key: 'contact' }
]

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

const styleMenuOptions: MenuOption[] = [
  { label: 'Home', key: 'home' },
  { label: 'Products', key: 'products' },
  { label: 'Services', key: 'services' },
  { label: 'Contact', key: 'contact' }
]

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

const badgeMenuOptions: MenuOption[] = [
  {
    label: 'Inbox',
    key: 'inbox',
    icon: renderIcon(MailOutline),
    extra: '12'
  },
  {
    label: 'Notifications',
    key: 'notifications',
    icon: renderIcon(NotificationsOutline),
    extra: '5'
  },
  {
    label: 'Messages',
    key: 'messages',
    icon: renderIcon(MailOutline),
    extra: 'New'
  }
]
</script>

<style scoped>
.ui-page {
  max-width: 100%;
}

.page-header {
  margin-bottom: 8px;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}
</style>

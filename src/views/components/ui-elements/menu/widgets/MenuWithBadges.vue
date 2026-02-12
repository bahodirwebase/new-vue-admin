<script setup lang="ts">
import { h } from 'vue'
import type { MenuOption } from 'naive-ui'
import {
  NotificationsOutline,
  MailOutline
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

const renderIcon = (icon: any) => {
  return () => h(NIcon, { component: icon })
}

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

<template>
  <n-card title="Menu with Badges">
    <n-menu :options="badgeMenuOptions" />
  </n-card>
</template>
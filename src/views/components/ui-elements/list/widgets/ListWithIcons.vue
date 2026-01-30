<template>
  <n-card title="List with Icons">
    <n-list bordered>
      <n-list-item>
        <template #prefix>
          <n-icon :component="MailOutline" style="font-size: 20px; color: var(--text-secondary)" />
        </template>
        <n-text>Inbox messages</n-text>
      </n-list-item>
      <n-list-item>
        <template #prefix>
          <n-icon :component="CalendarOutline" style="font-size: 20px; color: var(--text-secondary)" />
        </template>
        <n-text>Scheduled events</n-text>
      </n-list-item>
      <n-list-item>
        <template #prefix>
          <n-icon :component="FolderOutline" style="font-size: 20px; color: var(--text-secondary)" />
        </template>
        <n-text>Project files</n-text>
      </n-list-item>
      <n-list-item>
        <template #prefix>
          <n-icon :component="SettingsOutline" style="font-size: 20px; color: var(--text-secondary)" />
        </template>
        <n-text>Settings & preferences</n-text>
      </n-list-item>
    </n-list>
  </n-card>
</template>

<script setup lang="ts">
import {
  MailOutline,
  CalendarOutline,
  FolderOutline,
  SettingsOutline
} from '@vicons/ionicons5'
</script>

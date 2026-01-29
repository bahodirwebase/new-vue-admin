<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">List</h1>
        <p class="page-subtitle">Organized lists for displaying data, menus, and content</p>
      </div>

      <n-grid x-gap="12" :cols="2" >
        <n-gi>
          <n-card title="Basic List">
            <n-list bordered>
              <n-list-item>First item in list</n-list-item>
              <n-list-item>Second item with more content</n-list-item>
              <n-list-item>Third item for demonstration</n-list-item>
              <n-list-item>Fourth item completes list</n-list-item>
            </n-list>
          </n-card>
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
          <n-card title="List with Badges">
            <n-list bordered>
              <n-list-item>
                <n-text>Notifications</n-text>
                <template #suffix>
                  <n-badge value="5" type="error" />
                </template>
              </n-list-item>
              <n-list-item>
                <n-text>Messages</n-text>
                <template #suffix>
                  <n-badge value="12" type="info" />
                </template>
              </n-list-item>
              <n-list-item>
                <n-text>Updates</n-text>
                <template #suffix>
                  <n-badge value="New" type="success" />
                </template>
              </n-list-item>
            </n-list>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card title="List with Actions">
            <n-list bordered>
              <n-list-item>
                <n-text strong>Project Alpha</n-text>
                <template #suffix>
                  <n-button size="small" quaternary>View</n-button>
                </template>
              </n-list-item>
              <n-list-item>
                <n-text strong>Project Beta</n-text>
                <template #suffix>
                  <n-button size="small" quaternary>View</n-button>
                </template>
              </n-list-item>
              <n-list-item>
                <n-text strong>Project Gamma</n-text>
                <template #suffix>
                  <n-button size="small" quaternary>View</n-button>
                </template>
              </n-list-item>
            </n-list>
          </n-card>
          <n-card title="List with Avatars">
            <n-list bordered>
              <n-list-item>
                <template #prefix>
                  <n-avatar round size="medium">JD</n-avatar>
                </template>
                <n-text strong>John Doe</n-text>
                <n-text depth="3" style="display: block; margin-top: 4px">
                  Product Manager
                </n-text>
              </n-list-item>
              <n-list-item>
                <template #prefix>
                  <n-avatar round size="medium" color="#6366f1">JS</n-avatar>
                </template>
                <n-text strong>Jane Smith</n-text>
                <n-text depth="3" style="display: block; margin-top: 4px">
                  UI/UX Designer
                </n-text>
              </n-list-item>
              <n-list-item>
                <template #prefix>
                  <n-avatar round size="medium" color="#10b981">MJ</n-avatar>
                </template>
                <n-text strong>Mike Johnson</n-text>
                <n-text depth="3" style="display: block; margin-top: 4px">
                  Frontend Developer
                </n-text>
              </n-list-item>
            </n-list>
          </n-card>
          <n-card title="Clickable List Items">
            <n-list bordered clickable>
              <n-list-item @click="handleClick('Item 1')">
                <n-text>Clickable item 1</n-text>
              </n-list-item>
              <n-list-item @click="handleClick('Item 2')">
                <n-text>Clickable item 2</n-text>
              </n-list-item>
              <n-list-item @click="handleClick('Item 3')">
                <n-text>Clickable item 3</n-text>
              </n-list-item>
            </n-list>
          </n-card>
        </n-gi>
      </n-grid>

      <n-card title="Complex List Item">
        <n-list bordered>
          <n-list-item>
            <template #prefix>
              <n-avatar
                round
                size="large"
                src="https://api.dicebear.com/7.x/pixel-art/svg?seed=user1"
              />
            </template>
            <div>
              <n-text strong style="font-size: 16px">Sarah Williams</n-text>
              <n-text depth="3" style="display: block; margin-top: 4px">
                Senior Developer • San Francisco, CA
              </n-text>
              <n-text depth="3" style="display: block; margin-top: 8px">
                Working on the new dashboard design. Expected completion: Friday.
              </n-text>
            </div>
            <template #suffix>
              <n-space vertical :size="8">
                <n-badge dot type="success" />
                <n-button size="small" quaternary>Contact</n-button>
              </n-space>
            </template>
          </n-list-item>
        </n-list>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import {
  MailOutline,
  CalendarOutline,
  FolderOutline,
  SettingsOutline
} from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'

const message = useMessage()

const handleClick = (item: string) => {
  message.info(`Clicked: ${item}`)
}
</script>

<style scoped>

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

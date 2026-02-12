<script setup lang="ts">
import { NotificationsOutline, MailOutline, ChatbubblesOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
</script>
<template>
  <n-card title="Badge Positions">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Top Right (Default)
        </h3>
        <n-space :size="16" align="center">
          <n-badge value="5">
            <n-button circle>
              <template #icon>
                <n-icon :component="NotificationsOutline" />
              </template>
            </n-button>
          </n-badge>
          <n-badge value="12" type="error">
            <n-button circle>
              <template #icon>
                <n-icon :component="MailOutline" />
              </template>
            </n-button>
          </n-badge>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Top Left
        </h3>
        <n-space :size="16" align="center">
          <n-badge value="3" :offset="[-4, 4]">
            <n-button circle>
              <template #icon>
                <n-icon :component="ChatbubblesOutline" />
              </template>
            </n-button>
          </n-badge>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>

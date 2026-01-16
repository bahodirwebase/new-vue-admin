<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Badge</h1>
        <p class="page-subtitle">Status indicators, notifications, and count badges</p>
      </div>

      <n-grid x-gap="12" :cols="2" >
        <n-gi>
          <n-card title="Badge Types">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Default Badges
                </h3>
                <n-space :size="16" align="center">
                  <n-badge value="9+">
                    <n-button>Notifications</n-button>
                  </n-badge>
                  <n-badge value="New">
                    <n-button type="primary">Messages</n-button>
                  </n-badge>
                  <n-badge value="99+">
                    <n-button type="info">Updates</n-button>
                  </n-badge>
                </n-space>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Colored Badges
                </h3>
                <n-space :size="16" align="center">
                  <n-badge type="success" value="5">
                    <n-button quaternary>Success</n-button>
                  </n-badge>
                  <n-badge type="warning" value="12">
                    <n-button quaternary>Warning</n-button>
                  </n-badge>
                  <n-badge type="error" value="3">
                    <n-button quaternary>Error</n-button>
                  </n-badge>
                  <n-badge type="info" value="8">
                    <n-button quaternary>Info</n-button>
                  </n-badge>
                </n-space>
              </div>
            </n-space>
          </n-card>
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
        </n-gi>
        <n-gi>
          <n-card title="Dot Badges">
            <n-space :size="16" align="center">
              <n-badge dot>
                <n-button>Default Dot</n-button>
              </n-badge>
              <n-badge dot type="success">
                <n-button quaternary>Online</n-button>
              </n-badge>
              <n-badge dot type="warning">
                <n-button quaternary>Pending</n-button>
              </n-badge>
              <n-badge dot type="error">
                <n-button quaternary>Offline</n-button>
              </n-badge>
              <n-badge dot type="info">
                <n-button quaternary>Active</n-button>
              </n-badge>
            </n-space>
          </n-card>
          <n-card title="Badge with Custom Content">
            <n-space :size="16" align="center">
              <n-badge value="Hot" type="error">
                <n-button type="primary">Featured</n-button>
              </n-badge>
              <n-badge value="Sale" type="success">
                <n-button>Products</n-button>
              </n-badge>
              <n-badge value="Pro">
                <n-button quaternary>Upgrade</n-button>
              </n-badge>
            </n-space>
          </n-card>
          <n-card title="Badge on Avatars">
            <n-space :size="24" align="center">
              <n-badge dot type="success">
                <n-avatar round size="large">JD</n-avatar>
              </n-badge>
              <n-badge value="5" type="error">
                <n-avatar round size="large" color="#6366f1">MK</n-avatar>
              </n-badge>
              <n-badge value="12+">
                <n-avatar
                  round
                  size="large"
                  src="https://api.dicebear.com/7.x/pixel-art/svg?seed=badge"
                />
              </n-badge>
            </n-space>
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { NotificationsOutline, MailOutline, ChatbubblesOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
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

.n-card {
  margin-bottom: 12px;
}
</style>

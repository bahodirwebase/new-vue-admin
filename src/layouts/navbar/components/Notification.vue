<script lang="ts" setup>
import { useRouter } from "vue-router";
import { NotificationsOutline } from "@vicons/ionicons5";
import {
  NIcon,
  NButton,
  NPopover,
  NBadge,
  NAvatar,
  NScrollbar,
  NEmpty,
  NText,
  NDivider,
} from "naive-ui";
import { useNotification } from "@/composables";

const router = useRouter();
const { notifications, unreadCount, markAsRead, markAllAsRead } =
  useNotification();

const handleViewAll = () => {
  router.push({ name: "Notifications" }); // Sahifa nomi loyihangizga qarab o'zgarishi mumkin
};
</script>

<template>
  <n-popover
    trigger="hover"
    placement="bottom-end"
    :raw="true"
    class="notification-popover"
  >
    <template #trigger>
      <n-badge :value="unreadCount" type="error" :max="100" :offset="[-5, 7]">
        <n-button quaternary circle class="notification-trigger">
          <template #icon>
            <n-icon :component="NotificationsOutline" :size="22" />
          </template>
        </n-button>
      </n-badge>
    </template>

    <div class="notification-card">
      <div class="card-header">
        <n-text strong depth="1" class="title">Notifications</n-text>
        <n-button
          v-if="notifications.length > 0"
          text
          type="primary"
          size="tiny"
          @click="markAllAsRead"
        >
          Mark all as read
        </n-button>
      </div>

      <n-divider style="margin: 0" />

      <div class="card-body">
        <n-scrollbar style="max-height: 350px">
          <template v-if="notifications.length > 0">
            <div
              v-for="item in notifications"
              :key="item.id"
              class="notification-item"
              :class="{ 'is-unread': !item.read }"
              @click="markAsRead(item.id)"
            >
              <n-avatar
                round
                :size="40"
                :style="{
                  backgroundColor: item.color || 'var(--primary-color)',
                }"
                class="item-avatar"
              >
                <n-icon :component="item.icon" :size="20" color="#fff" />
              </n-avatar>

              <div class="item-content">
                <n-text class="item-message" :depth="item.read ? 3 : 1">
                  {{ item.message }}
                </n-text>
                <n-text depth="3" class="item-time">
                  {{ item.time }}
                </n-text>
              </div>

              <div v-if="!item.read" class="unread-dot" />
            </div>
          </template>

          <template v-else>
            <div class="empty-container">
              <n-empty description="No new notifications" />
            </div>
          </template>
        </n-scrollbar>
      </div>

      <n-divider style="margin: 0" />

      <div class="card-footer">
        <n-button text block type="primary" @click="handleViewAll">
          View all notifications
        </n-button>
      </div>
    </div>
  </n-popover>
</template>

<style scoped>
.notification-trigger {
  position: relative;
}

.notification-card {
  width: 360px;
  background-color: var(--n-color); /* Naive UI popover background */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--n-box-shadow);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background-color: var(--bg-header); /* Loyihangizdagi o'zgaruvchi */
}

.title {
  font-size: 16px;
}

.card-body {
  min-height: 100px;
}

.notification-item {
  display: flex;
  padding: 14px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  border-bottom: 1px solid var(--n-border-color);
}

.notification-item:hover {
  background-color: var(--n-code-color);
}

.is-unread {
  background-color: var(--n-hover-color);
}

.item-avatar {
  margin-right: 12px;
  flex-shrink: 0;
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-right: 10px;
}

.item-message {
  font-size: 13.5px;
  line-height: 1.4;
  font-weight: 500;
}

.item-time {
  font-size: 11px;
}

.unread-dot {
  width: 8px;
  height: 8px;
  background-color: var(--primary-color);
  border-radius: 50%;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
}

.empty-container {
  padding: 40px 0;
}

.card-footer {
  padding: 8px;
  text-align: center;
}

/* Mobile adjustments */
@media (max-width: 480px) {
  .notification-card {
    width: 300px;
  }
}
</style>

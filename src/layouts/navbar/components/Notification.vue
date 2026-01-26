<script lang="ts" setup>
import { NotificationsOutline } from '@vicons/ionicons5'
import { NIcon, NButton, NPopover, NBadge, NAvatar } from 'naive-ui'
import { useNotification } from '@/composables'


const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotification()
</script>
<template>
    <n-popover trigger="hover" placement="bottom-end">
        <template #trigger>
            <n-button quaternary circle class="notification-button">
                <template #icon>
                    <n-icon :component="NotificationsOutline" :size="20" />
                </template>
                <n-badge :value="unreadCount" :max="99" class="notification-badge" />
            </n-button>
        </template>
        <div class="notification-dropdown">
            <div class="notification-header">
                <span class="notification-title">Notifications</span>
                <n-button text size="small" @click="markAllAsRead">Mark all as read</n-button>
            </div>
            <div class="notification-list">
                <div v-for="notification in notifications" :key="notification.id" class="notification-item"
                    :class="{ 'unread': !notification.read }" @click="markAsRead(notification.id)">
                    <div class="notification-avatar">
                        <n-avatar round :size="40" :style="{ backgroundColor: notification.color }">
                            <n-icon :component="notification.icon" :size="20" style="color: white;" />
                        </n-avatar>
                    </div>
                    <div class="notification-content">
                        <div class="notification-message">{{ notification.message }}</div>
                        <div class="notification-time">{{ notification.time }}</div>
                    </div>
                    <div v-if="!notification.read" class="notification-dot"></div>
                </div>
            </div>
            <div class="notification-footer">
                <n-button text block>View all notifications</n-button>
            </div>
        </div>
    </n-popover>
</template>

<style scoped>
.notification-button {
    position: relative;
}

.notification-badge {
    position: absolute;
    top: -2px;
    right: -2px;
    z-index: 1;
}

.notification-dropdown {
    padding: 0;
    min-width: 350px;
    max-width: 90vw;
    max-height: 400px;
    overflow: hidden;
}

.notification-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-color);
    background-color: var(--bg-secondary);
}

.notification-title {
    font-weight: 600;
    color: var(--text-primary);
}

.notification-list {
    max-height: 300px;
    overflow-y: auto;
}

.notification-item {
    display: flex;
    align-items: flex-start;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;
    transition: background-color 0.2s;
    position: relative;
}

.notification-item:hover {
    background-color: var(--bg-tertiary);
}

.notification-item.unread {
    background-color: var(--bg-primary);
}

.notification-avatar {
    margin-right: 12px;
    flex-shrink: 0;
}

.notification-content {
    flex: 1;
    min-width: 0;
}

.notification-message {
    font-size: 14px;
    color: var(--text-primary);
    margin-bottom: 4px;
    line-height: 1.4;
}

.notification-time {
    font-size: 12px;
    color: var(--text-secondary);
}

.notification-dot {
    width: 8px;
    height: 8px;
    background-color: #3b82f6;
    border-radius: 50%;
    position: absolute;
    top: 16px;
    right: 12px;
}

.notification-footer {
    padding: 8px 16px;
    border-top: 1px solid var(--border-color);
    background-color: var(--bg-secondary);
}

/* Responsive adjustments */
@media (max-width: 768px) {


    .notification-dropdown {
        min-width: 300px;
    }
}

@media (max-width: 480px) {


    .notification-dropdown {
        min-width: 280px;
    }
}
</style>

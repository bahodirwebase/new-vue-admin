<script setup lang="ts">
import { NButton, NDropdown, NIcon } from 'naive-ui'
import { EllipsisHorizontalOutline } from '@vicons/ionicons5'
import { ACTIVITIES, MENU_OPTIONS } from '../constants'

const activities = ACTIVITIES
const menuOptions = MENU_OPTIONS
const handleMenuSelect = (_key: string) => {}
</script>

<template>
  <n-card>
    <div class="recent-activity__header">
      <h2 class="recent-activity__title">Recent Activity</h2>
      <n-dropdown :options="menuOptions" @select="handleMenuSelect" trigger="click">
        <n-button text class="menu-button">
          <n-icon :size="20" :component="EllipsisHorizontalOutline" />
        </n-button>
      </n-dropdown>
    </div>

    <div class="activity-list">
      <div v-for="(activity, index) in activities" :key="index" class="activity-item">
        <div class="activity-item__icon" :style="{ backgroundColor: activity.iconBg }">
          <n-icon :size="18" :component="activity.icon" :color="activity.iconColor" />
        </div>

        <div class="activity-item__content">
          <p class="activity-item__text" v-html="activity.text"></p>
          <span class="activity-item__time">{{ activity.time }}</span>
        </div>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
.recent-activity__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.recent-activity__title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.menu-button {
  color: #999999;
  padding: 4px;
  transition: color 0.3s ease;
}

.menu-button:hover {
  color: #666666;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.activity-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.activity-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.activity-item__icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.activity-item:hover .activity-item__icon {
  transform: scale(1.1);
}

.activity-item__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.activity-item__text {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
}

.activity-item__text :deep(strong) {
  font-weight: 600;
}

.activity-item__time {
  font-size: 12px;
  color: #999999;
  font-weight: 400;
}

/* Responsive */
@media (max-width: 480px) {
  .recent-activity {
    padding: 20px;
  }

  .recent-activity__title {
    font-size: 18px;
  }

  .activity-list {
    gap: 16px;
  }

  .activity-item {
    padding: 14px;
  }

  .activity-item__icon {
    width: 36px;
    height: 36px;
  }

  .activity-item__text {
    font-size: 13px;
  }
}
</style>
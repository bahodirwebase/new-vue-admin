<script setup lang="ts">
import { NCard, NButton, NDropdown, NIcon } from 'naive-ui'
import { EllipsisHorizontalOutline } from '@vicons/ionicons5'
import { COUNTRIES, ACTIVE_USER_TOTAL, ACTIVE_USER_TREND, MENU_OPTIONS } from '../constants'

const totalUsers = ACTIVE_USER_TOTAL
const trendPercentage = ACTIVE_USER_TREND
const countries = COUNTRIES
const menuOptions = MENU_OPTIONS
const handleMenuSelect = (_key: string) => {}
</script>

<template>
  <n-card>
    <div class="active-user__header">
      <h2 class="active-user__title">Active User</h2>
      <n-dropdown :options="menuOptions" @select="handleMenuSelect" trigger="click">
        <n-button text class="menu-button">
          <n-icon :size="20" :component="EllipsisHorizontalOutline" />
        </n-button>
      </n-dropdown>
    </div>

    <div class="active-user__stats">
      <div class="stats-main">
        <h3 class="stats-main__value">{{ totalUsers.toLocaleString() }}</h3>
        <span class="stats-main__label">Users</span>
      </div>

      <div class="stats-trend">
        <span class="stats-trend__value">+{{ trendPercentage }}%</span>
        <span class="stats-trend__label">from last month</span>
      </div>
    </div>

    <div class="country-list">
      <div v-for="country in countries" :key="country.name" class="country-item">
        <div class="country-item__header">
          <span class="country-item__name">{{ country.name }}</span>
          <span class="country-item__percentage">{{ country.percentage }}%</span>
        </div>

        <div class="progress-bar">
          <div class="progress-bar__fill" :style="{ width: country.percentage + '%' }"></div>
        </div>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
.active-user__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.active-user__title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.menu-button {
  color: var(--text-tertiary);
  padding: 4px;
  transition: color 0.3s ease;
}

.menu-button:hover {
  color: var(--text-secondary);
}

.active-user__stats {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
}

.stats-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stats-main__value {
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.stats-main__label {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 400;
}

.stats-trend {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  text-align: right;
}

.stats-trend__value {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-success);
}

.stats-trend__label {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 400;
}

.country-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.country-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.country-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.country-item__name {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 400;
}

.country-item__percentage {
  font-size: 14px;
  font-weight: 600;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--primary-color-900);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color) 0%, var(--primary-color-600) 100%);
  border-radius: 4px;
  transition: width 0.6s ease-out;
  position: relative;
}

.progress-bar__fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.country-item:hover .progress-bar__fill {
  filter: brightness(1.1);
}
</style>
<template>
  <div class="statistics-cards">
    <div 
      v-for="card in cards" 
      :key="card.title"
      class="stat-card"
      :class="`stat-card--${card.color}`"
    >
      <div class="stat-card__header">
        <span class="stat-card__title">{{ card.title }}</span>
        <div class="stat-card__icon" :class="`stat-card__icon--${card.color}`">
          <n-icon :size="24" :component="card.icon" />
        </div>
      </div>
      
      <div class="stat-card__content">
        <div class="stat-card__value">{{ card.value }}</div>
        
        <div class="stat-card__footer">
          <span 
            class="stat-card__trend"
            :class="card.isPositive ? 'stat-card__trend--positive' : 'stat-card__trend--negative'"
          >
            {{ card.trend }}
          </span>
          <span class="stat-card__period">{{ card.period }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CashOutline, CartOutline, PeopleOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

interface StatCard {
  title: string
  value: string
  trend: string
  isPositive: boolean
  period: string
  icon: any
  color: 'orange' | 'gray' | 'blue'
}

const cards: StatCard[] = [
  {
    title: 'Total Sales',
    value: '$983,410',
    trend: '+3.34%',
    isPositive: true,
    period: 'vs last week',
    icon: CashOutline,
    color: 'orange'
  },
  {
    title: 'Total Orders',
    value: '58,375',
    trend: '-2.69%',
    isPositive: false,
    period: 'vs last week',
    icon: CartOutline,
    color: 'gray'
  },
  {
    title: 'Total Visitors',
    value: '237,782',
    trend: '+8.02%',
    isPositive: true,
    period: 'vs last week',
    icon: PeopleOutline,
    color: 'blue'
  }
]
</script>

<style scoped>
.statistics-cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-card {
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.stat-card--orange {
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-primary) 100%);
}

.stat-card--gray {
  background: var(--bg-primary);
}

.stat-card--blue {
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-primary) 100%);
}

.stat-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.stat-card__title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  letter-spacing: 0.3px;
}

.stat-card__icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.stat-card__icon--orange {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color) 100%);
  color: #ffffff;
}

.stat-card__icon--gray {
  background: #f5f5f5;
  color: #999999;
}

.stat-card__icon--blue {
  background: #f5f5f5;
  color: #999999;
}

.stat-card__content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-card__value {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.stat-card__footer {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.stat-card__trend {
  font-weight: 600;
  padding: 2px 0;
}

.stat-card__trend--positive {
  color: #22c55e;
}

.stat-card__trend--negative {
  color: #ef4444;
}

.stat-card__period {
  color: #999999;
  font-weight: 400;
}

/* Responsive */
@media (max-width: 1024px) {
  .statistics-cards {
    gap: 16px;
  }
  
  .stat-card {
    min-width: 240px;
  }
}

@media (max-width: 768px) {
  .statistics-cards {
    flex-direction: column;
  }
  
  .stat-card {
    min-width: 100%;
  }
}
</style>
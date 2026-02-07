<template>
  <div class="comparison-section">
    <n-card class="comparison-card" :bordered="false">
      <template #header>
        <div class="card-header">
          <div class="header-title">
            <n-icon :component="ListOutline" size="24" />
            <h3>Feature Comparison</h3>
          </div>
        </div>
      </template>
      
      <div class="comparison-table">
        <div class="table-header">
          <div class="feature-column">Feature</div>
          <div class="plan-column">
            <div class="plan-header-cell">
              <n-icon :component="RocketOutline" size="24" /> 
              <span>Basic</span>
            </div>
          </div>
          <div class="plan-column featured">
            <div class="plan-header-cell">
              <n-icon :component="TrophyOutline" size="24" />
              <span>Professional</span>
            </div>
          </div>
          <div class="plan-column">
            <div class="plan-header-cell">
              <n-icon :component="BusinessOutline" size="24" />
              <span>Enterprise</span>
            </div>
          </div>
        </div>
        
        <div class="table-body">
          <div 
            v-for="feature in comparisonFeatures" 
            :key="feature.name"
            class="table-row"
          >
            <div class="feature-column">
              <div class="feature-cell">
                <n-icon :component="feature.icon" size="24" />
                <span>{{ feature.name }}</span>
              </div>
            </div>
            <div class="plan-column">
              <div class="plan-cell">
                <n-icon 
                  :component="feature.basic ? CheckmarkOutline : CloseOutline" 
                  :class="feature.basic ? 'available' : 'not-available'"
                />
              </div>
            </div>
            <div class="plan-column featured">
              <div class="plan-cell">
                <n-icon 
                  :component="feature.pro ? CheckmarkOutline : CloseOutline" 
                  :class="feature.pro ? 'available' : 'not-available'"
                />
              </div>
            </div>
            <div class="plan-column">
              <div class="plan-cell">
                <n-icon 
                  :component="feature.enterprise ? CheckmarkOutline : CloseOutline" 
                  :class="feature.enterprise ? 'available' : 'not-available'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { 
  ListOutline, RocketOutline, TrophyOutline, BusinessOutline,
  CheckmarkOutline, CloseOutline
} from '@vicons/ionicons5'
import { COMPARISON_FEATURES } from '../constants'

const comparisonFeatures = COMPARISON_FEATURES
</script>

<style scoped>


.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-title h3 {
  margin: 0;
  color: var(--text-primary);
}

.comparison-table {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  min-width: 0;
}

.comparison-table .table-header,
.comparison-table .table-body {
  min-width: 600px;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 8px 8px 0 0;
  border-bottom: 2px solid var(--border-color);
}

.feature-column {
  display: flex;
  align-items: center;
}

.plan-column {
  display: flex;
  justify-content: center;
  align-items: center;
}

.plan-column.featured {
  background: rgba(99, 102, 241, 0.05);
  border-radius: 8px;
  padding: 0.5rem;
}

.plan-header-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.plan-header-cell .n-icon {
  width: 24px;
  height: 24px;
  color: var(--primary-color);
}

.plan-header-cell span {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.table-body {
  background: var(--bg-primary);
  border-radius: 0 0 8px 8px;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background: var(--bg-secondary);
}

.table-row:last-child {
  border-bottom: none;
}

.feature-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.feature-cell .n-icon {
  color: var(--primary-color);
  flex-shrink: 0;
}

.feature-cell span {
  font-weight: 500;
  color: var(--text-primary);
}

.plan-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.plan-cell .n-icon {
  width: 20px;
  height: 20px;
}

.available {
  color: #22c55e;
}

.not-available {
  color: #ef4444;
}

@media (max-width: 768px) {
  .comparison-table {
    margin: 0 -1rem;
    padding: 0 1rem;
  }

  .comparison-table .table-header,
  .comparison-table .table-body {
    min-width: 600px;
  }

  .table-header {
    padding: 1rem;
    gap: 0.75rem;
  }

  .table-row {
    padding: 0.75rem;
    gap: 0.75rem;
  }

  .plan-column {
    justify-content: flex-start;
  }

  .plan-header-cell {
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.5rem;
  }

  .plan-header-cell span {
    font-size: 0.8rem;
  }

  .feature-cell {
    font-weight: 600;
  }

  .feature-cell span {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .comparison-table .table-header,
  .comparison-table .table-body {
    min-width: 500px;
  }

  .table-header {
    padding: 0.75rem;
    gap: 0.5rem;
  }

  .table-row {
    padding: 0.5rem;
    gap: 0.5rem;
  }

  .plan-header-cell .n-icon {
    width: 20px;
    height: 20px;
  }

  .plan-cell .n-icon {
    width: 18px;
    height: 18px;
  }

  .feature-cell .n-icon {
    width: 20px;
    height: 20px;
  }

  .feature-cell span {
    font-size: 0.85rem;
  }
}
</style>

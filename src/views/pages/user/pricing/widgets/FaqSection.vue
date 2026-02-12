<script setup lang="ts">
import { HelpCircleOutline, ChevronDownOutline, ChevronUpOutline } from '@vicons/ionicons5'
import { usePricingFaq } from '../composables/usePricingFaq'

const {
  faqs,
  toggleFaq,
  isFaqExpanded
} = usePricingFaq()

</script>

<template>
  <div class="faq-section">
    <n-card class="faq-card" :bordered="false">
      <template #header>
        <div class="card-header">
          <div class="header-title">
            <n-icon :component="HelpCircleOutline" />
            <h3>Frequently Asked Questions</h3>
          </div>
        </div>
      </template>
      
      <div class="faq-list">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          class="faq-item"
          :class="{ active: isFaqExpanded(index) }"
        >
          <div class="faq-question" @click="toggleFaq(index)">
            <h4>{{ faq.question }}</h4>
            <n-icon 
              :component="isFaqExpanded(index) ? ChevronUpOutline : ChevronDownOutline" 
              class="toggle-icon"
            />
          </div>
          
          <div v-show="isFaqExpanded(index)" class="faq-answer">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

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

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item.active {
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  background: var(--bg-primary);
  transition: background-color 0.2s ease;
}

.faq-question:hover {
  background: var(--bg-secondary);
}

.faq-question h4 {
  margin: 0;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.05rem;
  line-height: 1.4;
  flex: 1;
}

.toggle-icon {
  color: var(--text-secondary);
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 1rem;
}

.faq-item.active .toggle-icon {
  color: var(--primary-color);
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
}

.faq-answer p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .faq-question {
    padding: 1rem;
  }

  .faq-question h4 {
    font-size: 0.95rem;
  }

  .faq-answer {
    padding: 0 1rem 1rem;
  }
}
</style>

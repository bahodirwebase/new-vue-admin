<script setup lang="ts">
import { 
  SearchOutline, 
  ChevronDownOutline, 
  ChevronUpOutline, 
  LinkOutline,
  ThumbsUpOutline,
  ThumbsDownOutline
} from '@vicons/ionicons5'
import { useFaqFilters } from '../composables/useFaqFilters'
import { useFaqInteractions } from '../composables/useFaqInteractions'
import CustomTag from '@/components/CustomTag.vue'

const {
  filteredFaqs,
  clearFilters
} = useFaqFilters()

const {
  expandedItems,
  toggleFaq,
  markHelpful,
  getCategoryColor
} = useFaqInteractions()
</script>

<template>
  <div class="faq-list">
    <div v-if="filteredFaqs.length === 0" class="no-results">
      <div class="no-results-icon">
        <n-icon :component="SearchOutline" />
      </div>
      <h3>No questions found</h3>
      <p>Try adjusting your search or browse all categories</p>
      <n-button @click="clearFilters">Clear Filters</n-button>
    </div>

    <div v-else>
      <div
        v-for="faq in filteredFaqs"
        :key="faq.id"
        class="faq-item"
        :class="{ active: expandedItems.includes(faq.id) }"
        :data-faq-id="faq.id"
      >
        <n-card class="faq-card" :bordered="false">
          <div class="faq-question" @click="toggleFaq(faq.id)">
            <div class="question-content">
              <div class="question-header">
                <CustomTag :type="getCategoryColor(faq.category)" size="small">
                  {{ faq.category }}
                </CustomTag>
                <h3>{{ faq.question }}</h3>
              </div>
            </div>
            <div class="question-toggle">
              <n-icon 
                :component="expandedItems.includes(faq.id) ? ChevronUpOutline : ChevronDownOutline" 
              />
            </div>
          </div>
          
          <n-collapse-transition>
            <div v-show="expandedItems.includes(faq.id)" class="faq-answer">
              <div class="answer-content">
                <p>{{ faq.answer }}</p>
                
                <div v-if="faq.links && faq.links.length > 0" class="related-links">
                  <h4>Related Links</h4>
                  <div class="links-list">
                    <a v-for="link in faq.links" :key="link.text" :href="link.url" class="link-item">
                      <n-icon :component="LinkOutline" />
                      <span>{{ link.text }}</span>
                    </a>
                  </div>
                </div>

                <div class="helpful-section">
                  <div class="helpful-prompt">
                    <span>Was this helpful?</span>
                    <div class="helpful-buttons">
                      <n-button 
                        size="small" 
                        :type="faq.userFeedback === true ? 'primary' : 'default'"
                        @click="markHelpful(faq.id, true)"
                      >
                        <template #icon>
                          <n-icon :component="ThumbsUpOutline" />
                        </template>
                        Yes ({{ faq.helpfulCount }})
                      </n-button>
                      <n-button 
                        size="small" 
                        :type="faq.userFeedback === false ? 'error' : 'default'"
                        @click="markHelpful(faq.id, false)"
                      >
                        <template #icon>
                          <n-icon :component="ThumbsDownOutline" />
                        </template>
                        No ({{ faq.notHelpfulCount }})
                      </n-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </n-collapse-transition>
        </n-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--bg-primary);
  border-radius: 16px;
  border: 1px solid var(--border-color);
}

.no-results-icon {
  width: 64px;
  height: 64px;
  background: var(--bg-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  margin: 0 auto 1rem;
}

.no-results h3 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.no-results p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.faq-item {
  transition: all 0.3s ease;
}

.faq-item.active .faq-card {
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
}

.faq-card {
  transition: all 0.3s ease;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1.5rem;
}

.question-content {
  flex: 1;
}

.question-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.question-header h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
}

.question-toggle {
  flex-shrink: 0;
  margin-left: 1rem;
  color: var(--text-secondary);
  transition: transform 0.3s ease;
}

.faq-item.active .question-toggle {
  color: var(--primary-color);
  transform: rotate(180deg);
}

.faq-answer {
  border-top: 1px solid var(--border-color);
}

.answer-content {
  padding: 1.5rem;
}

.answer-content p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.related-links {
  margin-bottom: 1.5rem;
}

.related-links h4 {
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.links-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.link-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.link-item:hover {
  color: var(--primary-color-hover);
  transform: translateX(4px);
}

.helpful-section {
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.helpful-prompt {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.helpful-prompt span {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.helpful-buttons {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .question-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .helpful-prompt {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

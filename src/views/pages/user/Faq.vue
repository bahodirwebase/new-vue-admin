<template>
  <div class="faq">
    <!-- Hero Section -->
    <div class="faq-hero">
      <div class="hero-content">
        <div class="hero-info">
          <h1 class="hero-title">Frequently Asked Questions</h1>
          <p class="hero-description">
            Find answers to common questions about our service and get the help you need quickly.
          </p>
        </div>
        <div class="hero-search">
          <div class="search-container">
            <n-input 
              v-model:value="searchQuery" 
              placeholder="Search for answers..."
              size="large"
              clearable
              @clear="clearSearch"
            >
              <template #prefix>
                <n-icon :component="SearchOutline" />
              </template>
            </n-input>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="faq-content">
      <div class="content-container">
        <!-- Category Filter -->
        <div class="category-section">
          <div class="category-header">
            <h3>Categories</h3>
            <p>Filter questions by category</p>
          </div>
          <div class="category-pills">
            <n-button
              v-for="category in categories"
              :key="category"
              :type="selectedCategory === category ? 'primary' : 'default'"
              :secondary="selectedCategory !== category"
              size="medium"
              round
              @click="selectCategory(category)"
            >
              {{ category }}
            </n-button>
          </div>
        </div>

        <!-- FAQ Stats -->
        <div class="stats-section">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-icon">
                <n-icon :component="HelpCircleOutline" />
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ filteredFaqs.length }}</span>
                <span class="stat-label">Questions Found</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <n-icon :component="ThumbsUpOutline" />
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ helpfulCount }}</span>
                <span class="stat-label">Helpful Votes</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <n-icon :component="TimeOutline" />
              </div>
              <div class="stat-info">
                <span class="stat-value">24/7</span>
                <span class="stat-label">Support Available</span>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ Items -->
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
            >
              <n-card class="faq-card" :bordered="false">
                <div class="faq-question" @click="toggleFaq(faq.id)">
                  <div class="question-content">
                    <div class="question-header">
                      <n-tag :type="getCategoryColor(faq.category)" size="small">
                        {{ faq.category }}
                      </n-tag>
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

        <!-- Popular Questions -->
        <div class="popular-section">
          <n-card class="popular-card" :bordered="false">
            <template #header>
              <div class="card-header">
                <div class="header-title">
                  <n-icon :component="TrendingUpOutline" />
                  <h3>Popular Questions</h3>
                </div>
              </div>
            </template>
            
            <div class="popular-grid">
              <div 
                v-for="popular in popularQuestions" 
                :key="popular.id"
                class="popular-item"
                @click="goToQuestion(popular.id)"
              >
                <div class="popular-icon">
                  <n-icon :component="BonfireOutline" />
                </div>
                <div class="popular-content">
                  <h4>{{ popular.question }}</h4>
                  <span class="popular-stats">{{ popular.views }} views</span>
                </div>
                <n-icon :component="ArrowForwardOutline" />
              </div>
            </div>
          </n-card>
        </div>

        <!-- Contact Section -->
        <div class="contact-section">
          <div class="contact-card">
            <div class="contact-content">
              <div class="contact-info">
                <div class="contact-icon">
                  <n-icon :component="HeadsetOutline" />
                </div>
                <h2>Still have questions?</h2>
                <p>Can't find the answer you're looking for? Our support team is here to help you 24/7.</p>
              </div>
              <div class="contact-buttons">
                <n-button type="primary" size="large" @click="contactSupport">
                  <template #icon>
                    <n-icon :component="MailOutline" />
                  </template>
                  Contact Support
                </n-button>
                <n-button size="large" @click="startLiveChat">
                  <template #icon>
                    <n-icon :component="ChatbubbleOutline" />
                  </template>
                  Live Chat
                </n-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { 
  NCard, NButton, NIcon, NInput, NTag, NCollapseTransition, useMessage
} from 'naive-ui'
import {
  SearchOutline, HelpCircleOutline, ThumbsUpOutline, ThumbsDownOutline,
  TimeOutline, ChevronDownOutline, ChevronUpOutline, LinkOutline,
  TrendingUpOutline, BonfireOutline, ArrowForwardOutline, HeadsetOutline,
  MailOutline, ChatbubbleOutline
} from '@vicons/ionicons5'

const message = useMessage()

// State
const searchQuery = ref('')
const selectedCategory = ref('All')
const expandedItems = ref<number[]>([])

// Categories
const categories = ['All', 'General', 'Billing', 'Account', 'Technical', 'Security']

// FAQ Data
const faqs = reactive([
  {
    id: 1,
    category: 'General',
    question: 'What is this service about?',
    answer: 'Our service provides a comprehensive platform for managing projects, collaborating with teams, and tracking progress. We offer various tools and features to help streamline your workflow and improve productivity. From task management to real-time collaboration, we\'ve got everything you need to succeed.',
    helpfulCount: 45,
    notHelpfulCount: 3,
    userFeedback: null as boolean | null,
    links: [
      { text: 'Getting Started Guide', url: '#' },
      { text: 'Feature Overview', url: '#' }
    ]
  },
  {
    id: 2,
    category: 'Billing',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers. All payments are processed securely through our payment partners with industry-standard encryption.',
    helpfulCount: 38,
    notHelpfulCount: 2,
    userFeedback: null,
    links: [
      { text: 'Billing Settings', url: '#' },
      { text: 'Invoice History', url: '#' }
    ]
  },
  {
    id: 3,
    category: 'Account',
    question: 'How do I reset my password?',
    answer: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password. The link expires after 24 hours for security reasons.',
    helpfulCount: 67,
    notHelpfulCount: 1,
    userFeedback: null,
    links: []
  },
  {
    id: 4,
    category: 'Technical',
    question: 'What browsers are supported?',
    answer: 'Our platform works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to ensure the best experience and security. Mobile browsers are also supported for on-the-go access.',
    helpfulCount: 29,
    notHelpfulCount: 4,
    userFeedback: null,
    links: [
      { text: 'Browser Requirements', url: '#' },
      { text: 'Mobile App', url: '#' }
    ]
  },
  {
    id: 5,
    category: 'Security',
    question: 'How is my data protected?',
    answer: 'We use industry-standard AES-256 encryption to protect your data both in transit and at rest. Our servers are hosted in secure data centers with 24/7 monitoring, and we regularly perform security audits to ensure your information remains safe.',
    helpfulCount: 52,
    notHelpfulCount: 0,
    userFeedback: null,
    links: [
      { text: 'Security Policy', url: '#' },
      { text: 'Privacy Policy', url: '#' }
    ]
  },
  {
    id: 6,
    category: 'Billing',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period. No refunds are provided for partial months, but you can continue using the service until your subscription expires.',
    helpfulCount: 41,
    notHelpfulCount: 5,
    userFeedback: null,
    links: []
  },
  {
    id: 7,
    category: 'General',
    question: 'Is there a free trial available?',
    answer: 'Yes! We offer a 14-day free trial for all new users. You\'ll have access to all features during the trial period. No credit card is required to start your trial, and you can upgrade anytime.',
    helpfulCount: 73,
    notHelpfulCount: 2,
    userFeedback: null,
    links: [
      { text: 'Start Free Trial', url: '#' },
      { text: 'Pricing Plans', url: '#' }
    ]
  },
  {
    id: 8,
    category: 'Technical',
    question: 'Can I integrate with other tools?',
    answer: 'Yes, we offer integrations with popular tools like Slack, Google Drive, GitHub, and many more. You can also use our REST API to build custom integrations for your specific needs. Webhooks are also available for real-time updates.',
    helpfulCount: 35,
    notHelpfulCount: 3,
    userFeedback: null,
    links: [
      { text: 'API Documentation', url: '#' },
      { text: 'Available Integrations', url: '#' }
    ]
  }
])

// Popular Questions
const popularQuestions = reactive([
  { id: 7, question: 'Is there a free trial available?', views: 1234 },
  { id: 3, question: 'How do I reset my password?', views: 987 },
  { id: 5, question: 'How is my data protected?', views: 856 },
  { id: 2, question: 'What payment methods do you accept?', views: 743 }
])

// Computed Properties
const filteredFaqs = computed(() => {
  let filtered = faqs

  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(faq => faq.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query)
    )
  }

  return filtered
})

const helpfulCount = computed(() => {
  return faqs.reduce((total, faq) => total + faq.helpfulCount, 0)
})

// Methods
const selectCategory = (category: string) => {
  selectedCategory.value = category
}

const clearSearch = () => {
  searchQuery.value = ''
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All'
}

const toggleFaq = (id: number) => {
  const index = expandedItems.value.indexOf(id)
  if (index > -1) {
    expandedItems.value.splice(index, 1)
  } else {
    expandedItems.value.push(id)
  }
}

const markHelpful = (id: number, helpful: boolean) => {
  const faq = faqs.find(f => f.id === id)
  if (faq) {
    faq.userFeedback = helpful
    if (helpful) {
      faq.helpfulCount++
      message.success('Thank you for your feedback!')
    } else {
      faq.notHelpfulCount++
      message.info('Thank you! We\'ll use this to improve our help content.')
    }
  }
}

const getCategoryColor = (category: string): "default" | "primary" | "info" | "success" | "warning" | "error" => {
  const colors: Record<string, "default" | "primary" | "info" | "success" | "warning" | "error"> = {
    'General': 'default',
    'Billing': 'warning',
    'Account': 'info',
    'Technical': 'success',
    'Security': 'error'
  }
  return colors[category] || 'default'
}

const goToQuestion = (id: number) => {
  const faq = faqs.find(f => f.id === id)
  if (faq) {
    selectedCategory.value = faq.category
    if (!expandedItems.value.includes(id)) {
      expandedItems.value.push(id)
    }
    // Scroll to the FAQ item
    setTimeout(() => {
      const element = document.querySelector(`.faq-item:nth-child(${faqs.indexOf(faq!) + 1})`)
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
}

const contactSupport = () => {
  message.info('Redirecting to support contact form...')
}

const startLiveChat = () => {
  message.info('Starting live chat session...')
}
</script>

<style scoped>
.faq {
  min-height: 100vh;
  background: var(--bg-secondary);
}

/* Hero Section */
.faq-hero {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-hover) 100%);
  padding: 4rem 0;
  margin-bottom: 3rem;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.hero-search {
  max-width: 500px;
  margin: 0 auto;
}

/* Main Content */
.faq-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* Category Section */
.category-section {
  text-align: center;
}

.category-header h3 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.category-header p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.category-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

/* Stats Section */
.stats-section {
  margin: 2rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* FAQ List */
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

/* FAQ Items */
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

/* Related Links */
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

/* Helpful Section */
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

/* Popular Section */
.popular-section {
  margin-top: 2rem;
}

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

.popular-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.popular-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.popular-item:hover {
  background: var(--bg-primary);
  transform: translateX(4px);
}

.popular-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.popular-content {
  flex: 1;
}

.popular-content h4 {
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.popular-stats {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.popular-item .n-icon:last-child {
  color: var(--text-secondary);
}

/* Contact Section */
.contact-section {
  margin-top: 3rem;
}

.contact-card {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-hover) 100%);
  border-radius: 16px;
  padding: 3rem;
  color: white;
}

.contact-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.contact-info {
  flex: 1;
}

.contact-icon {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.contact-info h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.contact-info p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 0;
}

.contact-buttons {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

.contact-buttons .n-button:first-child {
  background: white;
  color: var(--primary-color);
}

.contact-buttons .n-button:last-child {
  background: transparent;
  color: white;
  border: 2px solid white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .faq-content {
    padding: 0 1rem 2rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .question-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .helpful-prompt {
    flex-direction: column;
    align-items: flex-start;
  }

  .contact-content {
    flex-direction: column;
    text-align: center;
  }

  .contact-buttons {
    flex-direction: column;
    width: 100%;
  }

  .contact-buttons .n-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.5rem;
  }

  .category-pills {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .popular-item {
    padding: 0.75rem;
  }

  .contact-card {
    padding: 2rem 1.5rem;
  }
}
</style>
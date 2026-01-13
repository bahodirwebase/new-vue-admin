<template>
  <div class="faq">
    <div class="faq-header">
      <h1>Frequently Asked Questions</h1>
      <p>Find answers to common questions about our service</p>
    </div>

    <div class="faq-search">
      <div class="search-container">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search for answers..."
          class="search-input"
        />
      </div>
    </div>

    <div class="faq-categories">
      <button 
        v-for="category in categories" 
        :key="category"
        :class="['category-btn', { active: selectedCategory === category }]"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <div class="faq-content">
      <div 
        v-for="faq in filteredFaqs" 
        :key="faq.id"
        class="faq-item"
        :class="{ active: expandedItems.includes(faq.id) }"
      >
        <div class="faq-question" @click="toggleFaq(faq.id)">
          <h3>{{ faq.question }}</h3>
          <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="faq-answer" v-show="expandedItems.includes(faq.id)">
          <p>{{ faq.answer }}</p>
          <div v-if="faq.helpful" class="helpful-section">
            <span>Was this helpful?</span>
            <div class="helpful-buttons">
              <button @click="markHelpful(faq.id, true)" class="helpful-btn">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 9V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M10 9V5C10 3.89543 9.10457 3 8 3C6.89543 3 6 3.89543 6 5V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M6 9V12C6 13.1046 6.89543 14 8 14H16C17.1046 14 18 13.1046 18 12V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M18 9V5C18 3.89543 17.1046 3 16 3C14.8954 3 14 3.89543 14 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Yes
              </button>
              <button @click="markHelpful(faq.id, false)" class="helpful-btn">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 15V19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M14 15V19C14 20.1046 14.8954 21 16 21C17.1046 21 18 20.1046 18 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M18 15V12C18 10.8954 17.1046 10 16 10H8C6.89543 10 6 10.8954 6 12V15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M6 15V19C6 20.1046 5.10457 21 4 21C2.89543 21 2 20.1046 2 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="faq-contact">
      <div class="contact-card">
        <h2>Still have questions?</h2>
        <p>Can't find the answer you're looking for? Our support team is here to help.</p>
        <div class="contact-buttons">
          <button class="btn-primary">Contact Support</button>
          <button class="btn-outline">Live Chat</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('All')
const expandedItems = ref<number[]>([])

const categories = ['All', 'General', 'Billing', 'Account', 'Technical', 'Security']

const faqs = ref([
  {
    id: 1,
    category: 'General',
    question: 'What is this service about?',
    answer: 'Our service provides a comprehensive platform for managing projects, collaborating with teams, and tracking progress. We offer various tools and features to help streamline your workflow and improve productivity.',
    helpful: true
  },
  {
    id: 2,
    category: 'Billing',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers. All payments are processed securely through our payment partners.',
    helpful: true
  },
  {
    id: 3,
    category: 'Account',
    question: 'How do I reset my password?',
    answer: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.',
    helpful: true
  },
  {
    id: 4,
    category: 'Technical',
    question: 'What browsers are supported?',
    answer: 'Our platform works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to ensure the best experience and security.',
    helpful: true
  },
  {
    id: 5,
    category: 'Security',
    question: 'How is my data protected?',
    answer: 'We use industry-standard encryption to protect your data both in transit and at rest. Our servers are hosted in secure data centers with 24/7 monitoring, and we regularly perform security audits to ensure your information remains safe.',
    helpful: true
  },
  {
    id: 6,
    category: 'Billing',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period. No refunds are provided for partial months, but you can continue using the service until your subscription expires.',
    helpful: true
  },
  {
    id: 7,
    category: 'General',
    question: 'Is there a free trial available?',
    answer: 'Yes! We offer a 14-day free trial for all new users. You\'ll have access to all features during the trial period. No credit card is required to start your trial.',
    helpful: true
  },
  {
    id: 8,
    category: 'Technical',
    question: 'Can I integrate with other tools?',
    answer: 'Yes, we offer integrations with popular tools like Slack, Google Drive, GitHub, and many more. You can also use our API to build custom integrations for your specific needs.',
    helpful: true
  }
])

const filteredFaqs = computed(() => {
  let filtered = faqs.value

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

const toggleFaq = (id: number) => {
  const index = expandedItems.value.indexOf(id)
  if (index > -1) {
    expandedItems.value.splice(index, 1)
  } else {
    expandedItems.value.push(id)
  }
}

const markHelpful = (id: number, helpful: boolean) => {
  console.log(`FAQ ${id} marked as ${helpful ? 'helpful' : 'not helpful'}`)
}
</script>

<style scoped>
.faq {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.faq-header {
  text-align: center;
  margin-bottom: 3rem;
}

.faq-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.faq-header p {
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.faq-search {
  margin-bottom: 2rem;
}

.search-container {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.faq-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.category-btn {
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.category-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.faq-content {
  margin-bottom: 3rem;
}

.faq-item {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item.active {
  border-color: var(--primary-color);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  user-select: none;
}

.faq-question h3 {
  color: var(--text-primary);
  margin: 0;
  font-size: 1.1rem;
}

.chevron-icon {
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.faq-item.active .chevron-icon {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid var(--border-color);
}

.faq-answer p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.helpful-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.helpful-section span {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.helpful-buttons {
  display: flex;
  gap: 0.5rem;
}

.helpful-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.helpful-btn:hover {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.helpful-btn svg {
  width: 16px;
  height: 16px;
}

.faq-contact {
  margin-top: 4rem;
}

.contact-card {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
  color: white;
  padding: 3rem;
  border-radius: 16px;
  text-align: center;
}

.contact-card h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.contact-card p {
  margin-bottom: 2rem;
  opacity: 0.9;
}

.contact-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary, .btn-outline {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: white;
  color: var(--primary-color);
  border: none;
}

.btn-primary:hover {
  background: var(--bg-secondary);
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-outline:hover {
  background: white;
  color: var(--primary-color);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .faq {
    padding: 1rem;
  }

  .faq-header h1 {
    font-size: 2rem;
  }

  .faq-categories {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .contact-buttons {
    flex-direction: column;
  }

  .btn-primary, .btn-outline {
    width: 100%;
  }
}
</style>

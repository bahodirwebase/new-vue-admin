<template>
  <div class="pricing">
    <!-- Hero Section -->
    <div class="pricing-hero">
      <div class="hero-content">
        <div class="hero-info">
          <h1 class="hero-title">Choose Your Perfect Plan</h1>
          <p class="hero-description">
            Select the ideal plan for your needs. All plans include our core features with 24/7 support.
          </p>
        </div>
        <div class="hero-toggle">
          <div class="toggle-container">
            <span class="toggle-label" :class="{ active: !isYearly }">Monthly</span>
            <n-switch v-model:value="isYearly" size="large" />
            <span class="toggle-label" :class="{ active: isYearly }">
              Yearly
              <n-tag type="success" size="small">Save 20%</n-tag>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing Cards -->
    <div class="pricing-content">
      <div class="pricing-grid">
        <!-- Basic Plan -->
        <n-card class="pricing-card basic-card" :bordered="false">
          <div class="plan-header">
            <div class="plan-icon">
              <n-icon :component="RocketOutline" />
            </div>
            <h3 class="plan-name">Basic</h3>
            <p class="plan-description">Perfect for individuals and small projects</p>
          </div>
          
          <div class="plan-pricing">
            <div class="price-display">
              <span class="currency">$</span>
              <span class="amount">{{ isYearly ? '9' : '12' }}</span>
              <span class="period">/month</span>
            </div>
            <p v-if="isYearly" class="yearly-savings">Billed annually ($108/year)</p>
          </div>

          <div class="plan-features">
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>Up to 5 projects</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>Basic analytics dashboard</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>Email support (48h response)</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>1GB cloud storage</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>Mobile app access</span>
            </div>
          </div>

          <n-button class="plan-button" size="large" @click="selectPlan('basic')">
            Get Started
          </n-button>
        </n-card>

        <!-- Professional Plan -->
        <n-card class="pricing-card pro-card featured" :bordered="false">
          <div class="popular-badge">
            <n-icon :component="StarOutline" />
            <span>Most Popular</span>
          </div>
          
          <div class="plan-header">
            <div class="plan-icon">
              <n-icon :component="TrophyOutline" />
            </div>
            <h3 class="plan-name">Professional</h3>
            <p class="plan-description">Great for growing teams and businesses</p>
          </div>
          
          <div class="plan-pricing">
            <div class="price-display">
              <span class="currency">$</span>
              <span class="amount">{{ isYearly ? '24' : '29' }}</span>
              <span class="period">/month</span>
            </div>
            <p v-if="isYearly" class="yearly-savings">Billed annually ($288/year)</p>
          </div>

          <div class="plan-features">
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>Unlimited projects</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>Advanced analytics & reports</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>Priority support (24h response)</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>50GB cloud storage</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>Team collaboration tools</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>Custom integrations</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>API access</span>
            </div>
          </div>

          <n-button class="plan-button" type="primary" size="large" @click="selectPlan('pro')">
            Get Started
          </n-button>
        </n-card>

        <!-- Enterprise Plan -->
        <n-card class="pricing-card enterprise-card" :bordered="false">
          <div class="plan-header">
            <div class="plan-icon">
              <n-icon :component="BusinessOutline" />
            </div>
            <h3 class="plan-name">Enterprise</h3>
            <p class="plan-description">For large organizations with custom needs</p>
          </div>
          
          <div class="plan-pricing">
            <div class="price-display">
              <span class="currency">$</span>
              <span class="amount">{{ isYearly ? '79' : '99' }}</span>
              <span class="period">/month</span>
            </div>
            <p v-if="isYearly" class="yearly-savings">Billed annually ($948/year)</p>
          </div>

          <div class="plan-features">
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>Everything in Professional</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>Unlimited cloud storage</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>Dedicated account manager</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>99.9% SLA guarantee</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>Custom feature development</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>On-premise deployment</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>Advanced security features</span>
            </div>
            <div class="feature-item">
              <n-icon :component="CheckmarkOutline" />
              <span>Custom training & onboarding</span>
            </div>
          </div>

          <n-button class="plan-button" size="large" @click="selectPlan('enterprise')">
            Contact Sales
          </n-button>
        </n-card>
      </div>

      <!-- Comparison Table -->
      <n-card class="comparison-card" :bordered="false">
        <template #header>
          <div class="card-header">
            <h3>Feature Comparison</h3>
            <p>Detailed breakdown of what's included in each plan</p>
          </div>
        </template>
        
        <div class="comparison-table">
          <div class="table-header">
            <div class="feature-column">Feature</div>
            <div class="plan-column">Basic</div>
            <div class="plan-column">Professional</div>
            <div class="plan-column">Enterprise</div>
          </div>
          
          <div v-for="feature in comparisonFeatures" :key="feature.name" class="table-row">
            <div class="feature-column">
              <div class="feature-info">
                <n-icon :component="feature.icon" />
                <span>{{ feature.name }}</span>
              </div>
            </div>
            <div class="plan-column">
              <n-icon v-if="feature.basic" :component="CheckmarkOutline" class="included" />
              <span v-else class="not-included">—</span>
            </div>
            <div class="plan-column">
              <n-icon v-if="feature.pro" :component="CheckmarkOutline" class="included" />
              <span v-else class="not-included">—</span>
            </div>
            <div class="plan-column">
              <n-icon v-if="feature.enterprise" :component="CheckmarkOutline" class="included" />
              <span v-else class="not-included">—</span>
            </div>
          </div>
        </div>
      </n-card>

      <!-- FAQ Section -->
      <n-card class="faq-card" :bordered="false">
        <template #header>
          <div class="card-header">
            <h3>Frequently Asked Questions</h3>
            <p>Got questions? We've got answers</p>
          </div>
        </template>
        
        <div class="faq-list">
          <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
            <div class="faq-question" @click="toggleFaq(index)">
              <h4>{{ faq.question }}</h4>
              <n-icon :component="expandedFaq === index ? ChevronUpOutline : ChevronDownOutline" />
            </div>
            <div v-show="expandedFaq === index" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </n-card>

      <!-- CTA Section -->
      <div class="cta-section">
        <div class="cta-content">
          <h2>Ready to get started?</h2>
          <p>Join thousands of satisfied customers using our platform</p>
          <div class="cta-buttons">
            <n-button type="primary" size="large" @click="startFreeTrial">
              Start Free Trial
            </n-button>
            <n-button size="large" @click="scheduleDemo">
              Schedule Demo
            </n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { 
  NCard, NButton, NIcon, NSwitch, NTag, useMessage
} from 'naive-ui'
import {
  RocketOutline, TrophyOutline, BusinessOutline, StarOutline,
  CheckmarkOutline, ChevronDownOutline, ChevronUpOutline,
  PeopleOutline, ShieldCheckmarkOutline, CloudOutline,
  StatsChartOutline, CodeOutline, SchoolOutline
} from '@vicons/ionicons5'

const message = useMessage()

// State
const isYearly = ref(false)
const expandedFaq = ref<number | null>(null)

// Comparison Features
const comparisonFeatures = reactive([
  { name: 'Projects', icon: RocketOutline, basic: true, pro: true, enterprise: true },
  { name: 'Team Members', icon: PeopleOutline, basic: false, pro: true, enterprise: true },
  { name: 'Advanced Security', icon: ShieldCheckmarkOutline, basic: false, pro: true, enterprise: true },
  { name: 'Cloud Storage', icon: CloudOutline, basic: true, pro: true, enterprise: true },
  { name: 'Analytics', icon: StatsChartOutline, basic: true, pro: true, enterprise: true },
  { name: 'API Access', icon: CodeOutline, basic: false, pro: true, enterprise: true },
  { name: 'Priority Support', icon: SchoolOutline, basic: false, pro: true, enterprise: true }
])

// FAQ Data
const faqs = reactive([
  {
    question: 'Can I change my plan anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and we\'ll prorate any differences.'
  },
  {
    question: 'What happens if I exceed my limits?',
    answer: 'We\'ll notify you when you\'re approaching your limits. You can upgrade your plan or purchase add-ons for additional resources. We never cut off your service unexpectedly.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all new subscriptions. No questions asked. Just contact our support team within 30 days of your purchase.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely! We use industry-standard encryption, regular security audits, and comply with GDPR, CCPA, and other major data protection regulations.'
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.'
  }
])

// Methods
const selectPlan = (plan: string) => {
  if (plan === 'enterprise') {
    message.info('Our sales team will contact you soon!')
  } else {
    message.success(`Great choice! You've selected the ${plan} plan.`)
  }
}

const toggleFaq = (index: number) => {
  expandedFaq.value = expandedFaq.value === index ? null : index
}

const startFreeTrial = () => {
  message.success('Your free trial has been activated!')
}

const scheduleDemo = () => {
  message.info('Please select a time for your demo')
}
</script>

<style scoped>
.pricing {
  min-height: 100vh;
  background: var(--bg-secondary);
}

/* Hero Section */
.pricing-hero {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-hover) 100%);
  padding: 4rem 0;
  margin-bottom: 3rem;
}

.hero-content {
  max-width: 1200px;
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

.hero-toggle {
  display: flex;
  justify-content: center;
}

.toggle-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  border-radius: 50px;
  backdrop-filter: blur(10px);
}

.toggle-label {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  transition: all 0.3s ease;
}

.toggle-label.active {
  color: white;
  font-weight: 600;
}

/* Main Content */
.pricing-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}

/* Pricing Grid */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.pricing-card {
  position: relative;
  transition: all 0.3s ease;
  border-radius: 16px;
  overflow: hidden;
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.pro-card.featured {
  border: 2px solid var(--primary-color);
  transform: scale(1.05);
}

.pro-card.featured:hover {
  transform: scale(1.05) translateY(-8px);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;
}

/* Plan Header */
.plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.plan-icon {
  width: 60px;
  height: 60px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
}

.pro-card .plan-icon {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-hover) 100%);
}

.enterprise-card .plan-icon {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.plan-description {
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Pricing */
.plan-pricing {
  text-align: center;
  margin-bottom: 2rem;
}

.price-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.currency {
  font-size: 1.5rem;
  color: var(--primary-color);
  font-weight: 600;
}

.amount {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
}

.period {
  color: var(--text-secondary);
  font-weight: 500;
}

.yearly-savings {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Features */
.plan-features {
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-item .n-icon {
  color: #22c55e;
  flex-shrink: 0;
}

/* Plan Button */
.plan-button {
  width: 100%;
  height: 48px;
  font-weight: 600;
  border-radius: 8px;
}

.pro-card .plan-button {
  background: var(--primary-color);
}

/* Comparison Table */
.comparison-card {
  margin-bottom: 3rem;
}

.card-header {
  text-align: center;
}

.card-header h3 {
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.card-header p {
  color: var(--text-secondary);
}

.comparison-table {
  margin-top: 2rem;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-primary);
  border-radius: 8px;
  font-weight: 600;
  color: var(--text-primary);
  border-bottom: 2px solid var(--border-color);
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  align-items: center;
}

.table-row:last-child {
  border-bottom: none;
}

.feature-column {
  display: flex;
  align-items: center;
}

.feature-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.plan-column {
  text-align: center;
}

.included {
  color: #22c55e;
  font-size: 1.2rem;
}

.not-included {
  color: var(--text-secondary);
  opacity: 0.5;
}

/* FAQ Section */
.faq-card {
  margin-bottom: 3rem;
}

.faq-list {
  margin-top: 2rem;
}

.faq-item {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  background: var(--bg-primary);
  transition: all 0.3s ease;
}

.faq-question:hover {
  background: var(--bg-secondary);
}

.faq-question h4 {
  margin: 0;
  color: var(--text-primary);
  font-weight: 600;
}

.faq-question .n-icon {
  color: var(--primary-color);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  background: var(--bg-primary);
}

.faq-answer p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-hover) 100%);
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
  color: white;
}

.cta-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.cta-buttons .n-button {
  height: 48px;
  padding: 0 2rem;
  font-weight: 600;
}

.cta-buttons .n-button:first-child {
  background: white;
  color: var(--primary-color);
}

.cta-buttons .n-button:last-child {
  background: transparent;
  color: white;
  border: 2px solid white;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }
  
  .pro-card.featured {
    transform: scale(1);
  }
  
  .pro-card.featured:hover {
    transform: translateY(-8px);
  }
}

@media (max-width: 768px) {
  .pricing-content {
    padding: 0 1rem 2rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .toggle-container {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }
  
  .comparison-table,
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .table-header {
    display: none;
  }
  
  .table-row {
    border: 1px solid var(--border-color);
    border-radius: 8px;
    margin-bottom: 1rem;
    padding: 1rem;
  }
  
  .feature-column {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .plan-column {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-buttons .n-button {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.5rem;
  }
  
  .amount {
    font-size: 2.5rem;
  }
  
  .cta-section {
    padding: 2rem 1rem;
  }
}
</style>
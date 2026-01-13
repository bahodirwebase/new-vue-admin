<template>
  <div class="pricing">
    <div class="pricing-header">
      <h1>Choose Your Plan</h1>
      <p>Select the perfect plan for your needs. All plans include our core features.</p>
    </div>

    <div class="pricing-toggle">
      <label class="toggle-switch">
        <input type="checkbox" v-model="isYearly" />
        <span class="toggle-slider"></span>
      </label>
      <span class="toggle-label">Monthly</span>
      <span class="toggle-label active">Yearly (Save 20%)</span>
    </div>

    <div class="pricing-cards">
      <div class="pricing-card basic">
        <div class="pricing-header-card">
          <h3>Basic</h3>
          <div class="price">
            <span class="currency">$</span>
            <span class="amount">{{ isYearly ? '9' : '12' }}</span>
            <span class="period">/{{ isYearly ? 'month' : 'month' }}</span>
          </div>
          <p class="description">Perfect for individuals and small projects</p>
        </div>
        <ul class="features">
          <li class="feature-item">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Up to 5 projects
          </li>
          <li class="feature-item">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Basic analytics
          </li>
          <li class="feature-item">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Email support
          </li>
          <li class="feature-item">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            1GB storage
          </li>
        </ul>
        <button class="btn-outline">Get Started</button>
      </div>

      <div class="pricing-card pro featured">
        <div class="popular-badge">Most Popular</div>
        <div class="pricing-header-card">
          <h3>Professional</h3>
          <div class="price">
            <span class="currency">$</span>
            <span class="amount">{{ isYearly ? '24' : '29' }}</span>
            <span class="period">/{{ isYearly ? 'month' : 'month' }}</span>
          </div>
          <p class="description">Great for growing teams and businesses</p>
        </div>
        <ul class="features">
          <li class="feature-item">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Unlimited projects
          </li>
          <li class="feature-item">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Advanced analytics
          </li>
          <li class="feature-item">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Priority support
          </li>
          <li class="feature-item">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            50GB storage
          </li>
          <li class="feature-item">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Team collaboration
          </li>
          <li class="feature-item">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Custom integrations
          </li>
        </ul>
        <button class="btn-primary">Get Started</button>
      </div>

      <div class="pricing-card enterprise">
        <div class="pricing-header-card">
          <h3>Enterprise</h3>
          <div class="price">
            <span class="currency">$</span>
            <span class="amount">{{ isYearly ? '79' : '99' }}</span>
            <span class="period">/{{ isYearly ? 'month' : 'month' }}</span>
          </div>
          <p class="description">For large organizations with custom needs</p>
        </div>
        <ul class="features">
          <li class="feature-item">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Everything in Pro
          </li>
          <li class="feature-item">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Unlimited storage
          </li>
          <li class="feature-item">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Dedicated support
          </li>
          <li class="feature-item">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            SLA guarantee
          </li>
          <li class="feature-item">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Custom features
          </li>
          <li class="feature-item">
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            On-premise option
          </li>
        </ul>
        <button class="btn-outline">Contact Sales</button>
      </div>
    </div>

    <div class="pricing-faq">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-item">
        <h3>Can I change my plan anytime?</h3>
        <p>Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
      </div>
      <div class="faq-item">
        <h3>What happens if I exceed my limits?</h3>
        <p>We'll notify you when you're approaching your limits. You can upgrade your plan or purchase add-ons for additional resources.</p>
      </div>
      <div class="faq-item">
        <h3>Do you offer refunds?</h3>
        <p>We offer a 30-day money-back guarantee for all new subscriptions. No questions asked.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isYearly = ref(false)
</script>

<style scoped>
.pricing {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.pricing-header {
  text-align: center;
  margin-bottom: 3rem;
}

.pricing-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.pricing-header p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.pricing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 28px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 28px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: var(--primary-color);
}

input:checked + .toggle-slider:before {
  transform: translateX(32px);
}

.toggle-label {
  color: var(--text-secondary);
  font-weight: 500;
}

.toggle-label.active {
  color: var(--primary-color);
  font-weight: 600;
}

.pricing-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.pricing-card {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--border-color);
  position: relative;
  transition: all 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.pricing-card.featured {
  border-color: var(--primary-color);
  transform: scale(1.05);
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
  font-size: 0.8rem;
  font-weight: 600;
}

.pricing-header-card {
  text-align: center;
  margin-bottom: 2rem;
}

.pricing-header-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 1rem;
}

.currency {
  font-size: 1.2rem;
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

.description {
  color: var(--text-secondary);
}

.features {
  list-style: none;
  padding: 0;
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

.check-icon {
  width: 20px;
  height: 20px;
  color: #10b981;
  flex-shrink: 0;
}

.btn-primary, .btn-outline {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
  border: none;
}

.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.pricing-faq {
  text-align: center;
}

.pricing-faq h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--text-primary);
}

.faq-item {
  max-width: 600px;
  margin: 0 auto 2rem;
  text-align: left;
}

.faq-item h3 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.faq-item p {
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .pricing {
    padding: 1rem;
  }

  .pricing-header h1 {
    font-size: 2rem;
  }

  .pricing-cards {
    grid-template-columns: 1fr;
  }

  .pricing-card.featured {
    transform: scale(1);
  }

  .amount {
    font-size: 2.5rem;
  }
}
</style>

<template>
  <div class="checkout">
    <!-- Header -->
    <div class="checkout-header">
      <div class="header-content">
        <h2>Checkout</h2>
        <p>Complete your purchase securely</p>
      </div>
      <div class="header-actions">
        <n-button @click="goBack">
          <template #icon>
            <n-icon><ArrowBackOutline /></n-icon>
          </template>
          Back to Cart
        </n-button>
      </div>
    </div>

    <!-- Checkout Progress -->
    <div class="checkout-progress">
      <n-steps :current="currentStep" :status="stepStatus">
        <n-step
          v-for="step in steps"
          :key="step.key"
          :title="step.title"
          :description="step.description"
        />
      </n-steps>
    </div>

    <!-- Checkout Content -->
    <div class="checkout-content">
      <n-grid :cols="3" :x-gap="24">
        <!-- Main Form Area -->
        <n-gi :span="2">
          <!-- Step 1: Shipping Information -->
          <n-card v-if="currentStep === 1" title="Shipping Information" class="step-card">
            <n-form
              ref="shippingFormRef"
              :model="shippingForm"
              :rules="shippingRules"
              label-placement="left"
              label-width="120px"
            >
              <n-grid :cols="2" :x-gap="16">
                <n-gi>
                  <n-form-item label="First Name" path="firstName">
                    <n-input v-model:value="shippingForm.firstName" placeholder="John" />
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="Last Name" path="lastName">
                    <n-input v-model:value="shippingForm.lastName" placeholder="Doe" />
                  </n-form-item>
                </n-gi>
              </n-grid>
              
              <n-form-item label="Email" path="email">
                <n-input v-model:value="shippingForm.email" placeholder="john.doe@example.com" />
              </n-form-item>
              
              <n-form-item label="Phone" path="phone">
                <n-input v-model:value="shippingForm.phone" placeholder="+1 (555) 123-4567" />
              </n-form-item>
              
              <n-form-item label="Address" path="address">
                <n-input v-model:value="shippingForm.address" placeholder="123 Main Street" />
              </n-form-item>
              
              <n-grid :cols="2" :x-gap="16">
                <n-gi>
                  <n-form-item label="City" path="city">
                    <n-input v-model:value="shippingForm.city" placeholder="New York" />
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="State" path="state">
                    <n-select
                      v-model:value="shippingForm.state"
                      placeholder="Select State"
                      :options="stateOptions"
                    />
                  </n-form-item>
                </n-gi>
              </n-grid>
              
              <n-grid :cols="2" :x-gap="16">
                <n-gi>
                  <n-form-item label="ZIP Code" path="zipCode">
                    <n-input v-model:value="shippingForm.zipCode" placeholder="10001" />
                  </n-form-item>
                </n-gi>
                <n-gi>
                  <n-form-item label="Country" path="country">
                    <n-select
                      v-model:value="shippingForm.country"
                      placeholder="Select Country"
                      :options="countryOptions"
                    />
                  </n-form-item>
                </n-gi>
              </n-grid>
              
              <n-form-item>
                <n-checkbox v-model:checked="shippingForm.saveAddress">
                  Save this address for future purchases
                </n-checkbox>
              </n-form-item>
            </n-form>
          </n-card>

          <!-- Step 2: Payment Method -->
          <n-card v-if="currentStep === 2" title="Payment Method" class="step-card">
            <n-form
              ref="paymentFormRef"
              :model="paymentForm"
              :rules="paymentRules"
              label-placement="left"
              label-width="120px"
            >
              <n-form-item label="Payment Type">
                <n-radio-group v-model:value="paymentForm.type">
                  <n-radio-button value="card">Credit Card</n-radio-button>
                  <n-radio-button value="paypal">PayPal</n-radio-button>
                  <n-radio-button value="apple">Apple Pay</n-radio-button>
                </n-radio-group>
              </n-form-item>

              <!-- Credit Card Form -->
              <div v-if="paymentForm.type === 'card'">
                <n-form-item label="Card Number" path="cardNumber">
                  <n-input
                    v-model:value="paymentForm.cardNumber"
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                  />
                </n-form-item>
                
                <n-grid :cols="2" :x-gap="16">
                  <n-gi>
                    <n-form-item label="Expiry Date" path="expiryDate">
                      <n-input
                        v-model:value="paymentForm.expiryDate"
                        placeholder="MM/YY"
                        maxlength="5"
                      />
                    </n-form-item>
                  </n-gi>
                  <n-gi>
                    <n-form-item label="CVV" path="cvv">
                      <n-input
                        v-model:value="paymentForm.cvv"
                        placeholder="123"
                        maxlength="4"
                        show-password-on="click"
                      />
                    </n-form-item>
                  </n-gi>
                </n-grid>
                
                <n-form-item label="Cardholder Name" path="cardholderName">
                  <n-input
                    v-model:value="paymentForm.cardholderName"
                    placeholder="John Doe"
                  />
                </n-form-item>
              </div>

              <!-- PayPal Form -->
              <div v-if="paymentForm.type === 'paypal'">
                <n-alert type="info" title="PayPal Payment">
                  You will be redirected to PayPal to complete your payment securely.
                </n-alert>
              </div>

              <!-- Apple Pay Form -->
              <div v-if="paymentForm.type === 'apple'">
                <n-alert type="info" title="Apple Pay">
                  Use Touch ID or Face ID to complete your purchase with Apple Pay.
                </n-alert>
              </div>

              <n-form-item>
                <n-checkbox v-model:checked="paymentForm.savePayment">
                  Save payment method for future purchases
                </n-checkbox>
              </n-form-item>
            </n-form>
          </n-card>

          <!-- Step 3: Order Review -->
          <n-card v-if="currentStep === 3" title="Order Review" class="step-card">
            <div class="order-review">
              <!-- Shipping Address Review -->
              <div class="review-section">
                <h4>Shipping Address</h4>
                <div class="address-review">
                  <p>
                    <strong>{{ shippingForm.firstName }} {{ shippingForm.lastName }}</strong><br>
                    {{ shippingForm.address }}<br>
                    {{ shippingForm.city }}, {{ shippingForm.state }} {{ shippingForm.zipCode }}<br>
                    {{ shippingForm.country }}<br>
                    {{ shippingForm.email }}<br>
                    {{ shippingForm.phone }}
                  </p>
                  <n-button size="small" @click="currentStep = 1">Edit</n-button>
                </div>
              </div>

              <!-- Payment Method Review -->
              <div class="review-section">
                <h4>Payment Method</h4>
                <div class="payment-review">
                  <div v-if="paymentForm.type === 'card'">
                    <p>
                      <strong>Credit Card</strong><br>
                      **** **** **** {{ paymentForm.cardNumber?.slice(-4) }}<br>
                      {{ paymentForm.cardholderName }}
                    </p>
                  </div>
                  <div v-else>
                    <p><strong>{{ getPaymentLabel(paymentForm.type) }}</strong></p>
                  </div>
                  <n-button size="small" @click="currentStep = 2">Edit</n-button>
                </div>
              </div>

              <!-- Order Items Review -->
              <div class="review-section">
                <h4>Order Items</h4>
                <div class="items-review">
                  <div
                    v-for="item in orderItems"
                    :key="item.id"
                    class="review-item"
                  >
                    <img :src="item.image" :alt="item.name" />
                    <div class="item-info">
                      <span class="item-name">{{ item.name }}</span>
                      <span class="item-quantity">Qty: {{ item.quantity }}</span>
                    </div>
                    <span class="item-price">
                      ${{ calculateItemTotal(item).toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </n-card>

          <!-- Navigation Buttons -->
          <div class="step-navigation">
            <n-space>
              <n-button
                v-if="currentStep > 1"
                @click="previousStep"
                :disabled="processing"
              >
                Previous
              </n-button>
              <n-button
                v-if="currentStep < 3"
                type="primary"
                @click="nextStep"
                :loading="processing"
              >
                Continue
              </n-button>
              <n-button
                v-if="currentStep === 3"
                type="primary"
                size="large"
                @click="placeOrder"
                :loading="processing"
              >
                <template #icon>
                  <n-icon><CheckmarkOutline /></n-icon>
                </template>
                Place Order
              </n-button>
            </n-space>
          </div>
        </n-gi>

        <!-- Order Summary Sidebar -->
        <n-gi>
          <n-card title="Order Summary" class="order-summary-card">
            <div class="summary-content">
              <div class="summary-row">
                <span>Subtotal ({{ totalItems }} items)</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              
              <div class="summary-row">
                <span>Shipping</span>
                <span>${{ shipping.toFixed(2) }}</span>
              </div>
              
              <div class="summary-row">
                <span>Tax</span>
                <span>${{ tax.toFixed(2) }}</span>
              </div>
              
              <div v-if="discount > 0" class="summary-row discount">
                <span>Discount</span>
                <span>-${{ discount.toFixed(2) }}</span>
              </div>
              
              <n-divider />
              
              <div class="summary-row total">
                <span>Total</span>
                <span>${{ total.toFixed(2) }}</span>
              </div>
            </div>
          </n-card>

          <!-- Security Badge -->
          <n-card class="security-card">
            <div class="security-content">
              <n-icon size="32" color="#18a058">
                <ShieldCheckmarkOutline />
              </n-icon>
              <h4>Secure Checkout</h4>
              <p>Your payment information is encrypted and secure. We never store your credit card details.</p>
            </div>
          </n-card>
        </n-gi>
      </n-grid>
    </div>

    <!-- Order Success Modal -->
    <n-modal v-model:show="showSuccessModal" preset="dialog">
      <template #header>
        <div class="success-header">
          <n-icon size="48" color="#18a058">
            <CheckmarkCircleOutline />
          </n-icon>
          <h3>Order Placed Successfully!</h3>
        </div>
      </template>
      <div class="success-content">
        <p>Thank you for your order! Your order number is <strong>#{{ orderNumber }}</strong>.</p>
        <p>You will receive a confirmation email shortly with your order details.</p>
      </div>
      <template #action>
        <n-space>
          <n-button @click="continueShopping">Continue Shopping</n-button>
          <n-button type="primary" @click="viewOrder">View Order</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowBackOutline,
  CheckmarkOutline,
  ShieldCheckmarkOutline,
  CheckmarkCircleOutline
} from '@vicons/ionicons5'

interface OrderItem {
  id: number
  name: string
  price: number
  salePrice?: number
  quantity: number
  image: string
}

const router = useRouter()
const currentStep = ref(1)
const processing = ref(false)
const showSuccessModal = ref(false)
const orderNumber = ref('')

const shippingFormRef = ref()
const paymentFormRef = ref()

const shippingForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'United States',
  saveAddress: false
})

const paymentForm = ref({
  type: 'card',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardholderName: '',
  savePayment: false
})

const steps = [
  { key: 1, title: 'Shipping', description: 'Enter shipping information' },
  { key: 2, title: 'Payment', description: 'Select payment method' },
  { key: 3, title: 'Review', description: 'Review and place order' }
]

const stepStatus = ref<'process' | 'finish' | 'error' | 'wait'>('process')

const orderItems = ref<OrderItem[]>([
  {
    id: 1,
    name: 'Wireless Headphones Pro',
    price: 299.99,
    salePrice: 249.99,
    quantity: 1,
    image: 'https://picsum.photos/seed/headphones/60/60.jpg'
  },
  {
    id: 2,
    name: 'Smart Watch Ultra',
    price: 499.99,
    quantity: 2,
    image: 'https://picsum.photos/seed/smartwatch/60/60.jpg'
  }
])

const stateOptions = [
  { label: 'Alabama', value: 'AL' },
  { label: 'California', value: 'CA' },
  { label: 'Florida', value: 'FL' },
  { label: 'New York', value: 'NY' },
  { label: 'Texas', value: 'TX' }
]

const countryOptions = [
  { label: 'United States', value: 'United States' },
  { label: 'Canada', value: 'Canada' },
  { label: 'United Kingdom', value: 'United Kingdom' }
]

const shippingRules = {
  firstName: { required: true, message: 'First name is required' },
  lastName: { required: true, message: 'Last name is required' },
  email: { required: true, type: 'email', message: 'Valid email is required' },
  phone: { required: true, message: 'Phone number is required' },
  address: { required: true, message: 'Address is required' },
  city: { required: true, message: 'City is required' },
  state: { required: true, message: 'State is required' },
  zipCode: { required: true, message: 'ZIP code is required' },
  country: { required: true, message: 'Country is required' }
}

const paymentRules = {
  cardNumber: { required: true, message: 'Card number is required' },
  expiryDate: { required: true, message: 'Expiry date is required' },
  cvv: { required: true, message: 'CVV is required' },
  cardholderName: { required: true, message: 'Cardholder name is required' }
}

const totalItems = computed(() => {
  return orderItems.value.reduce((total, item) => total + item.quantity, 0)
})

const subtotal = computed(() => {
  return orderItems.value.reduce((total, item) => {
    return total + calculateItemTotal(item)
  }, 0)
})

const shipping = computed(() => {
  return subtotal.value > 100 ? 0 : 9.99
})

const tax = computed(() => {
  return subtotal.value * 0.08 // 8% tax
})

const discount = computed(() => {
  return 0 // No discount in checkout
})

const total = computed(() => {
  return subtotal.value + shipping.value + tax.value - discount.value
})

const calculateItemTotal = (item: OrderItem) => {
  return (item.salePrice || item.price) * item.quantity
}

const getPaymentLabel = (type: string) => {
  switch (type) {
    case 'paypal': return 'PayPal'
    case 'apple': return 'Apple Pay'
    default: return 'Credit Card'
  }
}

const nextStep = async () => {
  processing.value = true
  
  try {
    if (currentStep.value === 1) {
      await shippingFormRef.value?.validate()
    } else if (currentStep.value === 2) {
      if (paymentForm.value.type === 'card') {
        await paymentFormRef.value?.validate()
      }
    }
    
    currentStep.value++
    stepStatus.value = 'process'
  } catch (error) {
    console.error('Validation error:', error)
  } finally {
    processing.value = false
  }
}

const previousStep = () => {
  currentStep.value--
}

const placeOrder = async () => {
  processing.value = true
  
  try {
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate order number
    orderNumber.value = 'ORD-' + Date.now().toString().slice(-8)
    
    // Show success modal
    showSuccessModal.value = true
    stepStatus.value = 'finish'
  } catch (error) {
    console.error('Order error:', error)
    stepStatus.value = 'error'
  } finally {
    processing.value = false
  }
}

const goBack = () => {
  router.push('/apps/ecommerce/cart')
}

const continueShopping = () => {
  router.push('/apps/ecommerce')
}

const viewOrder = () => {
  // TODO: Navigate to order details
  console.log('View order:', orderNumber.value)
}
</script>

<style scoped>
.checkout {
  padding: 24px;
  background: var(--n-color);
}

.checkout-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding: 20px;
  background: var(--n-card-color);
  border-radius: 8px;
}

.header-content h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--n-text-color-1);
}

.header-content p {
  margin: 0;
  color: var(--n-text-color-3);
  font-size: 14px;
}

.checkout-progress {
  margin-bottom: 32px;
  padding: 24px;
  background: var(--n-card-color);
  border-radius: 8px;
}

.step-card {
  margin-bottom: 24px;
}

.step-navigation {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

.order-review {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.review-section h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--n-text-color-1);
}

.address-review,
.payment-review {
  padding: 16px;
  background: var(--n-color);
  border: 1px solid var(--n-border-color);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.address-review p,
.payment-review p {
  margin: 0;
  line-height: 1.6;
  color: var(--n-text-color-2);
}

.items-review {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.review-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--n-color);
  border: 1px solid var(--n-border-color);
  border-radius: 8px;
}

.review-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  font-weight: 500;
  color: var(--n-text-color-1);
}

.item-quantity {
  font-size: 14px;
  color: var(--n-text-color-3);
}

.item-price {
  font-weight: 600;
  color: var(--n-text-color-1);
}

.order-summary-card {
  position: sticky;
  top: 24px;
  margin-bottom: 16px;
}

.summary-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.summary-row.discount {
  color: var(--n-success-color);
}

.summary-row.total {
  font-size: 18px;
  font-weight: 600;
  color: var(--n-text-color-1);
}

.security-card {
  text-align: center;
}

.security-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.security-content h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--n-text-color-1);
}

.security-content p {
  margin: 0;
  font-size: 14px;
  color: var(--n-text-color-3);
  line-height: 1.5;
}

.success-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.success-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--n-text-color-1);
}

.success-content {
  text-align: center;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .checkout-content :deep(.n-grid) {
    grid-template-columns: 1fr;
  }
  
  .order-summary-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .checkout {
    padding: 16px;
  }
  
  .checkout-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .checkout-progress {
    padding: 16px;
  }
  
  .checkout-content :deep(.n-form-item-label) {
    width: 100px !important;
  }
  
  .address-review,
  .payment-review {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .review-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .review-item img {
    width: 100%;
    height: 120px;
  }
}
</style>

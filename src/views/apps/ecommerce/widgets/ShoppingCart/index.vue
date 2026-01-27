<template>
  <div class="shopping-cart">

    <!-- Empty Cart -->
    <div v-if="cartItems.length === 0" class="empty-cart">
      <n-empty description="Your cart is empty">
        <template #extra>
          <n-button type="primary" @click="store.continueShopping">
            Start Shopping
          </n-button>
        </template>
      </n-empty>
    </div>

    <!-- Cart Content -->
    <div v-else class="cart-content">
      <n-grid :cols="3" :x-gap="24">
        <!-- Cart Items -->
        <n-gi :span="2">
          <n-card title="Cart Items" class="cart-items-card">
            <div class="cart-items">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="cart-item"
              >
                <div class="item-image">
                  <img :src="item.image" :alt="item.name" />
                </div>
                
                <div class="item-details">
                  <div class="item-header">
                    <h4>{{ item.name }}</h4>
                    <n-button
                      size="small"
                      quaternary
                      type="error"
                      @click="removeItem(item.id)"
                    >
                      <template #icon>
                        <n-icon><TrashOutline /></n-icon>
                      </template>
                    </n-button>
                  </div>
                  
                  <div class="item-variants" v-if="item.variants">
                    <n-tag
                      v-for="(variant, key) in item.variants"
                      :key="key"
                      size="small"
                      type="info"
                    >
                      {{ variant }}
                    </n-tag>
                  </div>
                  
                  <div class="item-price">
                    <span class="current-price">
                      ${{ (item.salePrice || item.price).toFixed(2) }}
                    </span>
                    <span
                      v-if="item.isOnSale"
                      class="original-price"
                    >
                      ${{ item.price.toFixed(2) }}
                    </span>
                  </div>
                </div>
                
                <div class="item-quantity">
                  <n-input-number
                    v-model:value="item.quantity"
                    :min="1"
                    :max="item.stock"
                    size="small"
                    @update:value="updateQuantity(item.id, $event)"
                  />
                  <span class="item-total">
                    ${{ calculateItemTotal(item).toFixed(2) }}
                  </span>
                </div>
              </div>
            </div>
          </n-card>
        </n-gi>

        <!-- Order Summary -->
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
              
              <!-- Promo Code -->
              <div class="promo-section">
                <n-input
                  v-model:value="promoCode"
                  placeholder="Enter promo code"
                  @keyup.enter="applyPromoCode"
                >
                  <template #suffix>
                    <n-button
                      size="small"
                      type="primary"
                      @click="applyPromoCode"
                      :disabled="!promoCode"
                    >
                      Apply
                    </n-button>
                  </template>
                </n-input>
              </div>
              
              <!-- Action Buttons -->
              <div class="checkout-actions">
                <n-button
                  type="primary"
                  size="large"
                  block
                  @click="proceedToCheckout"
                >
                  <template #icon>
                    <n-icon><CartOutline /></n-icon>
                  </template>
                  Proceed to Checkout
                </n-button>
              </div>
            </div>
          </n-card>
        </n-gi>
      </n-grid>
    </div>

    <!-- Recommended Products -->
    <div v-if="cartItems.length > 0" class="recommended-products">
      <n-card title="You might also like">
        <div class="recommended-grid">
          <div
            v-for="product in recommendedProducts"
            :key="product.id"
            class="recommended-item"
            @click="viewProduct(product)"
          >
            <img :src="product.image" :alt="product.name" />
            <h5>{{ product.name }}</h5>
            <div class="price">
              <span v-if="product.isOnSale" class="original-price">
                ${{ product.price.toFixed(2) }}
              </span>
              <span class="current-price">
                ${{ (product.salePrice || product.price).toFixed(2) }}
              </span>
            </div>
            <n-button
              size="small"
              type="primary"
              @click.stop="addToCart(product)"
            >
              Add to Cart
            </n-button>
          </div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  TrashOutline,
  CartOutline
} from '@vicons/ionicons5'
import { useEcommerceStore } from '../../store'

const store = useEcommerceStore()

interface CartItem {
  id: number
  name: string
  price: number
  salePrice?: number
  stock: number
  image: string
  quantity: number
  variants?: Record<string, string>
  isOnSale: boolean
}

interface Product {
  id: number
  name: string
  price: number
  salePrice?: number
  image: string
  isOnSale: boolean
}

const router = useRouter()
const promoCode = ref('')

const cartItems = ref<CartItem[]>([
  {
    id: 1,
    name: 'Wireless Headphones Pro',
    price: 299.99,
    salePrice: 249.99,
    stock: 45,
    image: 'https://picsum.photos/seed/headphones/100/100.jpg',
    quantity: 1,
    variants: { Color: 'Black', Size: 'Standard' },
    isOnSale: true
  },
  {
    id: 2,
    name: 'Smart Watch Ultra',
    price: 499.99,
    stock: 12,
    image: 'https://picsum.photos/seed/smartwatch/100/100.jpg',
    quantity: 2,
    variants: { Color: 'Silver' },
    isOnSale: false
  }
])

const recommendedProducts = ref<Product[]>([
  {
    id: 3,
    name: 'Premium Phone Case',
    price: 29.99,
    salePrice: 19.99,
    image: 'https://picsum.photos/seed/phonecase/200/150.jpg',
    isOnSale: true
  },
  {
    id: 4,
    name: 'Wireless Charger',
    price: 49.99,
    image: 'https://picsum.photos/seed/charger/200/150.jpg',
    isOnSale: false
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    price: 79.99,
    salePrice: 59.99,
    image: 'https://picsum.photos/seed/speaker/200/150.jpg',
    isOnSale: true
  },
  {
    id: 6,
    name: 'USB-C Cable',
    price: 15.99,
    image: 'https://picsum.photos/seed/cable/200/150.jpg',
    isOnSale: false
  }
])

const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0)
})

const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
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
  return promoCode.value === 'SAVE10' ? subtotal.value * 0.1 : 0
})

const total = computed(() => {
  return subtotal.value + shipping.value + tax.value - discount.value
})

const calculateItemTotal = (item: CartItem) => {
  return (item.salePrice || item.price) * item.quantity
}

const updateQuantity = (itemId: number, quantity: number) => {
  const item = cartItems.value.find(item => item.id === itemId)
  if (item) {
    item.quantity = quantity
  }
}

const removeItem = (itemId: number) => {
  const index = cartItems.value.findIndex(item => item.id === itemId)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}

const applyPromoCode = () => {
  if (promoCode.value === 'SAVE10') {
    // Show success message
    console.log('Promo code applied!')
  } else {
    // Show error message
    console.log('Invalid promo code')
  }
}



const proceedToCheckout = () => {
  router.push('/apps/ecommerce/checkout')
}

const viewProduct = (product: Product) => {
  // TODO: Navigate to product detail
  console.log('View product:', product)
}

const addToCart = (product: Product) => {
  // TODO: Add to cart logic
  console.log('Add to cart:', product)
}
</script>

<style scoped>



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

.empty-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.cart-content {
  margin-bottom: 32px;
}

.cart-items-card {
  height: fit-content;
}

.cart-item {
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--n-border-color);
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.item-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--n-text-color-1);
  line-height: 1.4;
}

.item-variants {
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.item-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.current-price {
  font-size: 16px;
  font-weight: 600;
  color: var(--n-text-color-1);
}

.original-price {
  font-size: 14px;
  color: var(--n-text-color-3);
  text-decoration: line-through;
}

.item-quantity {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.item-total {
  font-size: 16px;
  font-weight: 600;
  color: var(--n-text-color-1);
}

.order-summary-card {
  position: sticky;
  top: 24px;
}

.summary-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

.promo-section {
  margin: 16px 0;
}

.checkout-actions {
  margin-top: 24px;
}

.recommended-products {
  margin-top: 32px;
}

.recommended-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.recommended-item {
  padding: 16px;
  border: 1px solid var(--n-border-color);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.recommended-item:hover {
  transform: translateY(-2px);
}

.recommended-item img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 12px;
}

.recommended-item h5 {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--n-text-color-1);
  line-height: 1.4;
}

.recommended-item .price {
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 4px;
}
:deep(.n-card) {
  height: 100% !important;
  border: 1px solid var(--border-color);
}
@media (max-width: 1024px) {
  .cart-content :deep(.n-grid) {
    grid-template-columns: 1fr;
  }
  
  .order-summary-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .shopping-cart {
    padding: 16px;
  }
  
  .cart-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .cart-item {
    flex-direction: column;
    gap: 12px;
  }
  
  .item-image {
    width: 100%;
    height: 200px;
  }
  
  .item-quantity {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .recommended-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>

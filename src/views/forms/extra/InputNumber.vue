<template>
  <div class="input-number-demo">
    <n-space vertical :size="24">
      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <n-card title="Basic Input Number">
            <n-space vertical :size="16">
              <n-input-number v-model:value="basicValue" placeholder="Enter number" />
              <n-p>Value: {{ basicValue }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Input Number with Min/Max">
            <n-space vertical :size="16">
              <n-input-number v-model:value="minMaxValue" :min="0" :max="100" placeholder="0-100" />
              <n-p>Value: {{ minMaxValue }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Input Number with Step">
            <n-space vertical :size="16">
              <n-input-number v-model:value="stepValue" :step="5" placeholder="Step 5" />
              <n-p>Value: {{ stepValue }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Input Number with Precision">
            <n-space vertical :size="16">
              <n-input-number v-model:value="precisionValue" :precision="2" placeholder="2 decimal places" />
              <n-p>Value: {{ precisionValue }}</n-p>
            </n-space>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card title="Input Number Sizes">
            <n-space vertical :size="16">
              <n-space>
                <n-input-number v-model:value="smallValue" size="small" placeholder="Small" />
                <n-input-number v-model:value="mediumValue" size="medium" placeholder="Medium" />
                <n-input-number v-model:value="largeValue" size="large" placeholder="Large" />
              </n-space>
            </n-space>
          </n-card>

          <n-card title="Input Number States">
            <n-space vertical :size="16">
              <n-space>
                <n-input-number v-model:value="normalValue" placeholder="Normal" />
                <n-input-number v-model:value="disabledValue" disabled placeholder="Disabled" />
                <n-input-number v-model:value="readonlyValue" readonly placeholder="Readonly" />
              </n-space>
            </n-space>
          </n-card>

          <n-card title="Input Number with Buttons">
            <n-space vertical :size="16">
              <n-input-number v-model:value="buttonValue" :button-placement="'both'" placeholder="With buttons" />
              <n-p>Value: {{ buttonValue }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Real World Example - Product Configuration">
            <n-space vertical :size="16">
              <div class="product-config">
                <n-space vertical :size="12">
                  <span>Quantity:</span>
                  <n-input-number v-model:value="quantity" :min="1" :max="99" :step="1" />
                </n-space>
                <n-space vertical :size="12">
                  <span>Price ($):</span>
                  <n-input-number v-model:value="price" :min="0" :precision="2" :step="0.01" />
                </n-space>
                <n-space vertical :size="12">
                  <span>Discount (%):</span>
                  <n-input-number v-model:value="discount" :min="0" :max="100" :step="1" />
                </n-space>
                <n-space vertical :size="12">
                  <span>Weight (kg):</span>
                  <n-input-number v-model:value="weight" :min="0" :precision="3" :step="0.1" />
                </n-space>
              </div>
              <div class="calculation-result">
                <n-p><strong>Total: ${{ total.toFixed(2) }}</strong></n-p>
                <n-p><strong>Final Price: ${{ finalPrice.toFixed(2) }}</strong></n-p>
                <n-p><strong>Total Weight: {{ weight }} kg</strong></n-p>
              </div>
            </n-space>
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Basic Input Number
const basicValue = ref(42)

// Input Number with Min/Max
const minMaxValue = ref(50)

// Input Number with Step
const stepValue = ref(25)

// Input Number with Precision
const precisionValue = ref(3.14159)

// Input Number Sizes
const smallValue = ref(null)
const mediumValue = ref(null)
const largeValue = ref(null)

// Input Number States
const normalValue = ref(10)
const disabledValue = ref(20)
const readonlyValue = ref(30)

// Input Number with Buttons
const buttonValue = ref(5)

// Real World Example - Product Configuration
const quantity = ref(1)
const price = ref(99.99)
const discount = ref(10)
const weight = ref(2.5)

const total = computed(() => {
  return (quantity.value || 0) * (price.value || 0)
})

const finalPrice = computed(() => {
  const discountAmount = total.value * ((discount.value || 0) / 100)
  return total.value - discountAmount
})
</script>

<style scoped>
.input-number-demo {
  padding: 0;
}

.n-card {
  margin-bottom: 12px;
}

.n-p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.product-config {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
  margin-bottom: 16px;
}

.calculation-result {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-primary);
}

.calculation-result .n-p {
  color: var(--text-primary);
  font-size: 16px;
  margin-bottom: 8px;
}
</style>

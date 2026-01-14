<template>
  <div class="rate-demo">
    <n-space vertical :size="24">
      <n-card title="Basic Rate">
        <n-space vertical :size="16">
          <n-rate v-model:value="basicValue" />
          <n-p>Rating: {{ basicValue }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Rate with Count">
        <n-space vertical :size="16">
          <n-rate v-model:value="countValue" :count="10" />
          <n-p>Rating: {{ countValue }} / 10</n-p>
        </n-space>
      </n-card>

      <n-card title="Rate with Allow Half">
        <n-space vertical :size="16">
          <n-rate v-model:value="halfValue" :allow-half="true" />
          <n-p>Rating: {{ halfValue }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Rate with Colors">
        <n-space vertical :size="16">
          <n-space vertical :size="8">
            <span>Primary:</span>
            <n-rate v-model:value="primaryValue" color="#6366f1" />
          </n-space>
          <n-space vertical :size="8">
            <span>Success:</span>
            <n-rate v-model:value="successValue" color="#18a058" />
          </n-space>
          <n-space vertical :size="8">
            <span>Warning:</span>
            <n-rate v-model:value="warningValue" color="#f0a020" />
          </n-space>
          <n-space vertical :size="8">
            <span>Error:</span>
            <n-rate v-model:value="errorValue" color="#d03050" />
          </n-space>
        </n-space>
      </n-card>

      <n-card title="Rate Sizes">
        <n-space vertical :size="16">
          <n-space vertical :size="8">
            <span>Small:</span>
            <n-rate v-model:value="smallValue" size="small" />
          </n-space>
          <n-space vertical :size="8">
            <span>Medium:</span>
            <n-rate v-model:value="mediumValue" size="medium" />
          </n-space>
          <n-space vertical :size="8">
            <span>Large:</span>
            <n-rate v-model:value="largeValue" size="large" />
          </n-space>
        </n-space>
      </n-card>

      <n-card title="Rate with Custom Icons">
        <n-space vertical :size="16">
          <n-rate v-model:value="customValue">
            <template #icon>
              <n-icon :component="HeartOutline" />
            </template>
          </n-rate>
          <n-p>Rating: {{ customValue }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Rate with Tooltips">
        <n-space vertical :size="16">
          <n-rate v-model:value="tooltipValue" :tooltips="tooltips" />
          <n-p>Rating: {{ tooltipValue }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Rate with Events">
        <n-space vertical :size="16">
          <n-rate
            v-model:value="eventValue"
            @update:value="handleRateChange"
          />
          <n-p>Rating: {{ eventValue }}</n-p>
          <n-p>Last change: {{ lastChange || 'No changes yet' }}</n-p>
          <n-p>Total changes: {{ changeCount }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Real World Example - Product Review">
        <n-space vertical :size="16">
          <div class="product-review">
            <n-space vertical :size="12">
              <span>Product Quality:</span>
              <n-rate v-model:value="review.quality" :allow-half="true" />
            </n-space>
            <n-space vertical :size="12">
              <span>Value for Money:</span>
              <n-rate v-model:value="review.value" :allow-half="true" />
            </n-space>
            <n-space vertical :size="12">
              <span>Customer Service:</span>
              <n-rate v-model:value="review.service" :allow-half="true" />
            </n-space>
            <n-space vertical :size="12">
              <span>Shipping Speed:</span>
              <n-rate v-model:value="review.shipping" :allow-half="true" />
            </n-space>
            <n-input
              v-model:value="review.comment"
              type="textarea"
              placeholder="Write your review..."
              :rows="3"
              style="margin-top: 12px;"
            />
            <n-button
              type="primary"
              @click="submitReview"
              style="margin-top: 12px;"
            >
              Submit Review
            </n-button>
          </div>
          <div class="review-summary">
            <n-p><strong>Average Rating: {{ averageRating.toFixed(1) }} / 5</strong></n-p>
            <n-rate :value="averageRating" readonly size="large" />
          </div>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { HeartOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'

const message = useMessage()

// Basic Rate
const basicValue = ref(3)

// Rate with Count
const countValue = ref(7)

// Rate with Allow Half
const halfValue = ref(3.5)

// Rate with Colors
const primaryValue = ref(4)
const successValue = ref(3)
const warningValue = ref(2)
const errorValue = ref(1)

// Rate Sizes
const smallValue = ref(3)
const mediumValue = ref(3)
const largeValue = ref(3)

// Rate with Custom Icons
const customValue = ref(4)

// Rate with Tooltips
const tooltipValue = ref(3)
const tooltips = ['Terrible', 'Bad', 'Normal', 'Good', 'Excellent']

// Rate with Events
const eventValue = ref(3)
const lastChange = ref('')
const changeCount = ref(0)

const handleRateChange = (value: number) => {
  lastChange.value = `Rating changed to: ${value} at ${new Date().toLocaleTimeString()}`
  changeCount.value++
}

// Real World Example - Product Review
const review = ref({
  quality: 4.5,
  value: 3.5,
  service: 4,
  shipping: 3,
  comment: ''
})

const averageRating = computed(() => {
  const ratings = [review.value.quality, review.value.value, review.value.service, review.value.shipping]
  return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
})

const submitReview = () => {
  message.success('Review submitted successfully!')
  console.log('Review submitted:', {
    ...review.value,
    average: averageRating.value
  })
}
</script>

<style scoped>
.rate-demo {
  padding: 0;
}

.n-card {
  margin-bottom: 16px;
}

.n-p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.product-review {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
  margin-bottom: 16px;
}

.review-summary {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-primary);
  text-align: center;
}

.review-summary .n-p {
  color: var(--text-primary);
  font-size: 16px;
  margin-bottom: 12px;
}
</style>

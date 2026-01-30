<template>
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
        <n-input v-model:value="review.comment" type="textarea" placeholder="Write your review..." :rows="3"
          style="margin-top: 12px;" />
        <n-button type="primary" @click="submitReview" style="margin-top: 12px;">
          Submit Review
        </n-button>
      </div>
      <div class="review-summary">
        <n-p><strong>Average Rating: {{ averageRating.toFixed(1) }} / 5</strong></n-p>
        <n-rate :value="averageRating" readonly size="large" />
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()
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

.review-summary :deep(.n-p) {
  color: var(--text-primary);
  font-size: 16px;
  margin-bottom: 12px;
}
</style>

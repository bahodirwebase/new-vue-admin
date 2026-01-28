<script lang="ts" setup>
import { Product } from '../types';
import { useProductDetail } from '../composables/useProductDetail';

const { formatDate, getRatingPercentage,getRatingCount, getLogType } = useProductDetail();

defineProps<{
  product: Product;
}>();
</script>
<template>
  <n-card class="product-tabs">
    <n-tabs type="line" animated>
      <!-- Details Tab -->
      <n-tab-pane name="details" tab="Product Details">
        <div class="tab-content">
          <n-grid :cols="2" :x-gap="24">
            <n-gi>
              <h4>Specifications</h4>
              <n-descriptions :column="1" bordered>
                <n-descriptions-item label="Weight">
                  {{ product.specifications.weight }}
                </n-descriptions-item>
                <n-descriptions-item label="Dimensions">
                  {{ product.specifications.dimensions }}
                </n-descriptions-item>
                <n-descriptions-item label="Material">
                  {{ product.specifications.material }}
                </n-descriptions-item>
                <n-descriptions-item label="Color">
                  {{ product.specifications.color }}
                </n-descriptions-item>
                <n-descriptions-item label="Warranty">
                  {{ product.specifications.warranty }}
                </n-descriptions-item>
              </n-descriptions>
            </n-gi>
            <n-gi>
              <h4>Additional Information</h4>
              <n-descriptions :column="1" bordered>
                <n-descriptions-item label="Brand">
                  {{ product.brand }}
                </n-descriptions-item>
                <n-descriptions-item label="Manufacturer">
                  {{ product.manufacturer }}
                </n-descriptions-item>
                <n-descriptions-item label="Country of Origin">
                  {{ product.countryOfOrigin }}
                </n-descriptions-item>
                <n-descriptions-item label="Release Date">
                  {{ formatDate(product.releaseDate) }}
                </n-descriptions-item>
                <n-descriptions-item label="Product Line">
                  {{ product.productLine }}
                </n-descriptions-item>
              </n-descriptions>
            </n-gi>
          </n-grid>
        </div>
      </n-tab-pane>

      <!-- Reviews Tab -->
      <n-tab-pane name="reviews" tab="Customer Reviews">
        <div class="tab-content">
          <div class="reviews-summary">
            <div class="rating-overview">
              <div class="rating-large">
                <span class="rating-number">{{ product.rating }}</span>
                <n-rate :value="product.rating" readonly />
              </div>
              <div class="rating-breakdown">
                <div v-for="star in 5" :key="star" class="rating-bar">
                  <span>{{ 6 - star }} stars</span>
                  <n-progress
                    :percentage="getRatingPercentage(6 - star)"
                    :height="8"
                    :show-indicator="false"
                  />
                  <span>{{ getRatingCount(6 - star) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="reviews-list">
            <div
              v-for="review in product.reviews"
              :key="review.id"
              class="review-item"
            >
              <div class="review-header">
                <div class="reviewer-info">
                  <strong>{{ review.reviewer }}</strong>
                  <n-rate :value="review.rating" readonly size="small" />
                </div>
                <span class="review-date">{{ formatDate(review.date) }}</span>
              </div>
              <p class="review-content">{{ review.content }}</p>
              <div v-if="review.images" class="review-images">
                <img
                  v-for="(image, index) in review.images"
                  :key="index"
                  :src="image"
                  :alt="`Review image ${index + 1}`"
                />
              </div>
            </div>
          </div>
        </div>
      </n-tab-pane>

      <!-- Sales Analytics Tab -->
      <n-tab-pane name="analytics" tab="Sales Analytics">
        <div class="tab-content">
          <n-grid :cols="3" :x-gap="16">
            <n-gi>
              <n-statistic
                label="Total Sales"
                :value="product.analytics.totalSales"
              />
            </n-gi>
            <n-gi>
              <n-statistic
                label="Revenue"
                :value="product.analytics.revenue"
                prefix="$"
              />
            </n-gi>
            <n-gi>
              <n-statistic
                label="Avg. Order Value"
                :value="product.analytics.avgOrderValue"
                prefix="$"
              />
            </n-gi>
          </n-grid>

          <div class="chart-container">
            <h4>Sales Trend (Last 30 Days)</h4>
            <!-- TODO: Add chart component -->
            <div class="chart-placeholder">
              <n-empty description="Chart component would be displayed here" />
            </div>
          </div>
        </div>
      </n-tab-pane>

      <!-- History Tab -->
      <n-tab-pane name="history" tab="History & Logs">
        <div class="tab-content">
          <n-timeline>
            <n-timeline-item
              v-for="log in product.history"
              :key="log.id"
              :type="getLogType(log.type)"
              :title="log.title"
              :content="log.description"
              :time="formatDate(log.timestamp)"
            />
          </n-timeline>
        </div>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

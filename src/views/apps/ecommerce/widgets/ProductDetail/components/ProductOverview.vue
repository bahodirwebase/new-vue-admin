<script lang="ts" setup>
import { CartOutline } from "@vicons/ionicons5";
import { useProductDetail } from "../composables/useProductDetail";
import { useProductDetailStore } from "../store";
import { Product } from "../types";
import { formatDate } from "@/utils"
import CustomTag from "@/components/CustomTag.vue"

const { currentImage, getStatusType, formatStatus, getStockClass, getStockStatus } = useProductDetail();

const productDetailStore = useProductDetailStore();

interface IProps {
  product: Product;
}
defineProps<IProps>();
</script>
<template>
  <n-card class="product-overview">
    <n-grid :cols="2" :x-gap="24" responsive="screen">
      <!-- Product Images -->
      <n-gi>
        <div class="product-images">
          <div class="main-image">
            <img :src="currentImage" :alt="product.name" />
            <div class="image-badges">
              <CustomTag v-if="product.isNew" type="success" size="large"
                >New</CustomTag
              >
              <CustomTag v-if="product.isOnSale" type="warning" size="large"
                >Sale</CustomTag
              >
              <CustomTag v-if="product.stock === 0" type="error" size="large"
                >Out of Stock</CustomTag
              >
            </div>
          </div>
          <div class="image-thumbnails">
            <div
              v-for="(image, index) in product.images"
              :key="index"
              class="thumbnail"
              :class="{ active: productDetailStore.currentImageIndex === index }"
              @click="productDetailStore.currentImageIndex = index"
            >
              <img :src="image" :alt="`${product.name} ${index + 1}`" />
            </div>
          </div>
        </div>
      </n-gi>

      <!-- Product Info -->
      <n-gi>
        <div class="product-info">
          <div class="product-header">
            <h1>{{ product.name }}</h1>
            <div class="product-meta">
              <CustomTag :type="getStatusType(product.status)" size="medium">
                {{ formatStatus(product.status) }}
              </CustomTag>
              <span class="sku">SKU: {{ product.sku }}</span>
            </div>
          </div>

          <div class="product-rating">
            <n-rate :value="product.rating" readonly size="large" />
            <span class="rating-text">
              {{ product.rating }} ({{ product.reviewCount }} reviews)
            </span>
          </div>

          <div class="product-price-section">
            <div class="price-row">
              <span v-if="product.isOnSale" class="original-price">
                ${{ product.price.toFixed(2) }}
              </span>
              <span class="current-price">
                ${{ (product.salePrice || product.price).toFixed(2) }}
              </span>
            </div>
            <div v-if="product.isOnSale">
              <div class="discount-info">
                <CustomTag type="success"
                  >Save ${{
                    (product.price - (product.salePrice || 0)).toFixed(2)
                  }}</CustomTag
                >
              </div>
            </div>
          </div>

          <div class="product-description">
            <h3>Description</h3>
            <p>{{ product.description }}</p>
          </div>

          <div class="product-variants">
            <h3>Variants</h3>
            <div class="variant-options">
              <div
                v-for="variant in product.variants"
                :key="variant.name"
                class="variant-group"
              >
                <label>{{ variant.name }}:</label>
                <n-button-group>
                  <n-button
                    v-for="option in variant.options"
                    :key="option.value"
                    :type="
                      productDetailStore.selectedVariants[variant.name] === option.value
                        ? 'primary'
                        : 'default'
                    "
                    @click="productDetailStore.selectVariant(variant.name, option.value)"
                  >
                    {{ option.label }}
                  </n-button>
                </n-button-group>
              </div>
            </div>
          </div>

          <div class="product-inventory">
            <h3>Inventory</h3>
            <div class="inventory-info">
              <div class="stock-info">
                <span :class="getStockClass(product.stock)">
                  {{ product.stock }} units available
                </span>
                <span class="stock-status">
                  {{ getStockStatus(product.stock) }}
                </span>
              </div>
              <div class="inventory-details">
                <n-space vertical size="small">
                  <div class="detail-item">
                    <span class="label">Warehouse:</span>
                    <span>{{ product.warehouse }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">Reorder Level:</span>
                    <span>{{ product.reorderLevel }} units</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">Last Restocked:</span>
                    <span>{{ formatDate(product.lastRestocked) }}</span>
                  </div>
                </n-space>
              </div>
            </div>
          </div>

          <div class="product-actions">
            <n-space size="large">
              <n-input-number
                v-model:value="productDetailStore.quantity"
                :min="1"
                :max="product.stock"
                style="width: 120px"
              />
              <n-button
                type="primary"
                size="large"
                :disabled="product.stock === 0"
                @click="productDetailStore.addToCart"
              >
                <template #icon>
                  <n-icon><CartOutline /></n-icon>
                </template>
                Add to Cart
              </n-button>
            </n-space>
          </div>
        </div>
      </n-gi>
    </n-grid>
  </n-card>
</template>

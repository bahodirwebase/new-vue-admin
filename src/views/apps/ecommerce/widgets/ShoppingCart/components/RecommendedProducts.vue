<script lang="ts" setup>
import { useShoppingCartStore } from "../store";
import { RECOMMENDED_PRODUCTS } from "../constants";

const shoppingCartStore = useShoppingCartStore();
const recommendedProducts = RECOMMENDED_PRODUCTS;


</script>
<template>
<div v-if="shoppingCartStore.cartItems.length > 0" class="recommended-products">
      <n-card title="You might also like">
        <div class="recommended-grid">
          <div
            v-for="product in recommendedProducts"
            :key="product.id"
            class="recommended-item"
            @click="shoppingCartStore.viewProduct(product)"
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
              @click.stop="shoppingCartStore.addToCart(product)"
            >
              Add to Cart
            </n-button>
          </div>
        </div>
      </n-card>
    </div>
</template>
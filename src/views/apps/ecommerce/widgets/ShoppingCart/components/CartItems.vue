<script lang="ts" setup>
import { TrashOutline } from "@vicons/ionicons5";
import { useShoppingCartStore } from "../store";
import { useShoppingCart } from "../composables/useShoppingCart";
import CustomTag from '@/components/custom/CustomTag.vue';

const shoppingCartStore = useShoppingCartStore();
const { calculateItemTotal } = useShoppingCart();
</script>
<template>
  <n-card title="Cart Items" class="cart-items-card">
    <div class="cart-items">
      <div v-for="item in shoppingCartStore.cartItems" :key="item.id" class="cart-item">
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
              @click="shoppingCartStore.removeItem(item.id)"
            >
              <template #icon>
                <n-icon><TrashOutline /></n-icon>
              </template>
            </n-button>
          </div>

          <div class="item-variants" v-if="item.variants">
            <CustomTag
              v-for="(variant, key) in item.variants"
              :key="key"
              size="small"
              type="info"
            >
              {{ variant }}
            </CustomTag>
          </div>

          <div class="item-price">
            <span class="current-price">
              ${{ (item.salePrice || item.price).toFixed(2) }}
            </span>
            <span v-if="item.isOnSale" class="original-price">
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
            @update:value="shoppingCartStore.updateQuantity(item.id, $event)"
          />
          <span class="item-total">
            ${{ calculateItemTotal(item).toFixed(2) }}
          </span>
        </div>
      </div>
    </div>
  </n-card>
</template>

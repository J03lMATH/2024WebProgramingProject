<script setup lang="ts">
import type { Product } from '@/models/products'
import { addToCart } from '@/models/shoppingCart'
const props = defineProps<{
  product: Product
}>()

const { product } = props
</script>
<template>
  <div class="box">
    <div class="box-image">
      <img :src="product.thumbnail" alt="product.name" />
    </div>
    <div class="box-content">
      <h3>{{ product.title }}</h3>
      <i>{{ product.brand }}</i>
      <p>{{ product.description }}</p>
      <p class="price">${{ product.price }}</p>
      <button class="button is-success" @click="addToCart(product)">
        Add to Cart
      </button>
    </div>
  </div>
</template>
<style scoped>
h3 {
  font-weight: bold;
}

.price {
  font-weight: bold;
  font-size: 2rem;
  float: right;
  color: chocolate;
}

i {
  color: #888;
}
</style>

<script setup lang="ts">
import { refCart, count, total } from '@/models/shoppingCart'
const cart = refCart()
</script>
<template>
  <div class="cart">
    <h1 class="title">Shopping Cart</h1>
    <div v-if="cart.length === 0">
      <p>Your cart is empty</p>
    </div>
    <div v-else>
      <div v-for="item in cart" :key="item.product.id" class="item">
        <img :src="item.product.thumbnail" :alt="item.product.title" />
        <h3>{{ item.product.title }}</h3>
        <div>
          ${{ item.product.price }} * {{ item.quantity }} = ${{
            (item.product.price * item.quantity).toFixed(2)
          }}
        </div>
        <div>{{ item.quantity }}</div>
      </div>
      <div>
        <p>Total: {{ count }} items = ${{ total.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
h3 {
  font-weight: bold;
}
.cart {
  padding: 1rem;
  overflow-y: auto;
}

.cart img {
  width: 50px;
  height: 50px;
  float: left;
}

item {
  padding-bottom: 0.5em;
  margin-bottom: 0.5em;
  border-bottom: ridge;
}
</style>

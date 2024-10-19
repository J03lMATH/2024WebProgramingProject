<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>
  <body>
    <div class="container">
      <RouterView />
    </div>
  </body>
</template>

<style scoped>
body {
  background-color: #2b2b30;
}
.container {
  background-color: #2b2b30;
  box-shadow: drop-shadow(0 0 10px rgba(0, 0, 0, 0.8));
  min-height: 100vh;
}
</style>

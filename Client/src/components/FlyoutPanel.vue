<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
}>()
</script>

<template>
  <div class="flyout" :class="{ isOpen }">
    <slot />
  </div>
</template>

<style scoped>
.flyout {
  position: fixed;
  right: 0;
  top: 56px;
  width: 20rem;
  height: 100%;
  background-color: rgb(255, 255, 255);
  box-shadow: -2px 0 5px rgba(0, 0, 0, 7);
  padding: 20px;
  z-index: 1000;
  transform: translate(85%);
  transition: transform 0.3s ease-in-out;
}

.flyout:hover,
.flyout.isOpen {
  transform: translateX(0);
}
</style>

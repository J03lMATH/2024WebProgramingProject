<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
</script>

<template>
  <nav class="navbar is-danger" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/logo.svg"
          width="30"
          height="30"
        />

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          :class="{ 'is-active': isOpen }"
          @click="isOpen = !isOpen"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start">
          <RouterLink to="/" class="navbar-item">Home</RouterLink>
          <RouterLink to="/activity" class="navbar-item"
            >My Activities</RouterLink
          >
          <RouterLink to="/friends" class="navbar-item">Friends</RouterLink>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> Admin </a>

            <div class="navbar-dropdown">
              <RouterLink to="/user" class="navbar-item"> User </RouterLink>
              <RouterLink to="/noFrame" class="navbar-item">
                No Frame
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link"> More </a>

              <div class="navbar-dropdown">
                <RouterLink to="/about" class="navbar-item"> About </RouterLink>
                <RouterLink to="/jobs" class="navbar-item"> Jobs </RouterLink>
                <RouterLink to="/contact" class="navbar-item">
                  Contact
                </RouterLink>
                <RouterLink to="/products" class="navbar-item">
                  Shop
                </RouterLink>
                <hr class="navbar-divider" />
                <a class="navbar-item"> Report an issue </a>
              </div>
            </div>

            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light"> Log in </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid rgb(95, 15, 15);
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import FlyoutPanel from '@/components/FlyoutPanel.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
import { refUser, logOut } from '@/models/userData'
import { getAll, type User } from '@/models/users'
import UserLogin from '@/components/UserLogin.vue'

const users = ref<User[]>([])
users.value = getAll().data

const currentUser = refUser()

function checkAdmin() {
  if (currentUser.value.length === 0) {
    return false
  }
  return currentUser.value[0].user.admin
}
const isOpen = ref(false)

const isCartOpen = ref(false)
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
          <RouterLink to="/activity" class="navbar-item">
            <!-- <span class="icon-text has-text-primary-100">
              <i class="fas fa-fire"></i>
            </span> -->
            <span>My Activives</span>
          </RouterLink>
          <RouterLink to="/friends" class="navbar-item">Friends</RouterLink>

          <div
            class="navbar-item has-dropdown is-hoverable"
            v-if="checkAdmin()"
          >
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
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> More </a>

            <div class="navbar-dropdown">
              <RouterLink to="/about" class="navbar-item"> About </RouterLink>
              <!-- <RouterLink to="/jobs" class="navbar-item"> Jobs </RouterLink> -->
              <RouterLink to="/contact" class="navbar-item">
                Contact
              </RouterLink>
              <RouterLink to="/products" class="navbar-item"> Shop </RouterLink>
              <hr class="navbar-divider" />
              <a class="navbar-item"> Report an issue </a>
            </div>
          </div>

          <div
            class="navbar-item has-dropdown is-hoverable"
            v-if="currentUser.length === 0"
          >
            <a class="navbar-link">Login</a>

            <div class="navbar-dropdown">
              <UserLogin
                class="dropdown-item"
                v-for="user in users"
                :key="user.id"
                :user="user"
              />
              <hr class="navbar-divider" />
              <RouterLink to="/login" class="dropdown-item has-text-grey-light">
                Log in
              </RouterLink>
            </div>
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
            </div>
          </div>

          <div class="navbar-item" v-else>
            <img
              v-for="profile in currentUser"
              :key="profile.user.id"
              :src="profile.user.image"
            />

            <p v-for="profile in currentUser" :key="profile.user.id">
              {{ profile.user.name }}
            </p>
            <button class="button" @click="logOut()">LogOut</button>
          </div>

          <div class="buttons">
            <button
              class="button is-light is-active"
              :class="{ 'is-focused': isCartOpen }"
              @click="isCartOpen = !isCartOpen"
            >
              <span class="icon">
                <i class="fas fa-shopping-cart"> </i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <FlyoutPanel :is-open="isCartOpen">
    <ShoppingCart />
  </FlyoutPanel>
</template>
<style scoped>
.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid rgb(95, 15, 15);
}
.icon-text {
  margin-right: -0.6rem;
}
.button.is-light.is-active {
  margin-left: 0.5rem;
}
</style>

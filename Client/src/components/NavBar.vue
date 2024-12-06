<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getAll, refsUser, logOutbutt, type User } from '@/models/user'

const users = ref<User[]>([])

getAll().then(data => {
  users.value = data.data
})

const currUser = refsUser()

function checkAdmin() {
  return currUser.value?.admin
}
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
              <hr class="navbar-divider" />
              <a class="navbar-item"> Report an issue </a>
            </div>
          </div>

          <RouterLink to="/login" class="navbar-item" v-if="currUser === null">
            Login
          </RouterLink>

          <RouterLink to="/signUp" class="navbar-item" v-if="currUser === null">
            SignUp
          </RouterLink>
          <div class="navbar-item" v-else>
            <img :src="currUser.image" />

            <p>
              {{ currUser.name }}
            </p>
            <RouterLink to="/login">
              <button class="button" @click="logOutbutt()">
                LogOut
              </button></RouterLink
            >
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
.icon-text {
  margin-right: -0.6rem;
}
.button.is-light.is-active {
  margin-left: 0.5rem;
}
</style>

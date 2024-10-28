<script setup lang="ts">
import { refUser } from '@/models/userData'
import Tracker from '@/components/Tracker.vue'

const currentUser = refUser()
</script>

<template>
  <div v-if="currentUser.length === 0">
    <div class="notification is-warning">
      <p>
        You must log in to see Statistics and to see Your Admin Page Login as
        Joel Mathew.
      </p>
    </div>
  </div>

  <div v-else>
    <h1 class="title">User Statistics</h1>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-two-thirds">
          <!-- User Statistics Section -->
          <Tracker />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.column {
  margin-top: 1rem;
}
.box {
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 5px;
}
</style>

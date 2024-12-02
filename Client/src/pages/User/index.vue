<script setup lang="ts">
import { ref } from 'vue'
import { refUser } from '@/models/userData'
import UserList from '@/components/UserList.vue'
import UserForm from '@/components/UserForm.vue'
import type { User } from '@/models/user'

const currentUser = refUser()

const checkAdmin = () => {
  if (currentUser.value.length === 0) {
    return false
  }
  return currentUser.value[0].user.admin
}

const selectedUser = ref<User | null>(null)

function editUser(user: User) {
  selectedUser.value = user
}
function handleUserUpdated(updatedUser: User) {
  console.log('User updated:', updatedUser)
  // Perform any additional actions needed when a user is updated
}
</script>

<template>
  <div v-if="!checkAdmin()">
    <div class="notification is-warning">
      <p>You must log in as Admin "Joel Mathew" to see this page.</p>
    </div>
  </div>
  <div v-else>
    <h1 class="title">Admin</h1>
    <UserForm :selectedUser="selectedUser" @user-updated="handleUserUpdated" />
    <UserList @editUser="editUser" />
  </div>
</template>

<style></style>

<script setup lang="ts">
import { ref } from 'vue'
import { refUser } from '@/models/userData'
import UserList from '@/components/UserList.vue'
import UserForm from '@/components/UserForm.vue'
import type { User } from '@/models/users'

const currentUser = refUser()
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
  <div>
    <h1 class="title">Admin</h1>
    <UserForm :selectedUser="selectedUser" @user-updated="handleUserUpdated" />
    <UserList @editUser="editUser" />
  </div>
</template>

<style></style>

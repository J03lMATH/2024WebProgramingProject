<script setup lang="ts">
import { ref } from 'vue'
//import { refUser } from '@/models/userData'
import UserList from '@/components/UserList.vue'
import UserForm from '@/components/UserForm.vue'
import { update, refsUser, type User } from '@/models/user'

const currUser = refsUser()

function checkAdmin() {
  return currUser.value?.admin
}

const selectedUser = ref<User | null>(null)

function editUser(user: User) {
  update(user).then(() => {
    selectedUser.value = user
  })
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
    <UserForm :selectedUser="selectedUser" />
    <UserList @editUser="editUser" />
  </div>
</template>

<style></style>

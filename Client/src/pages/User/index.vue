<script setup lang="ts">
import { ref } from 'vue'
import UserList from '@/components/UserList.vue'
import UserForm from '@/components/UserForm.vue'
import { refsUser, getAll, type User } from '@/models/user'

const currUser = refsUser()

function checkAdmin() {
  return currUser.value?.admin
}

const users = ref<User[]>([])
getAll().then(data => {
  users.value = data.data
})

const selectedUser = ref<User | null>(null)
function updateUser(user: User) {
  selectedUser.value = user
  console.log(selectedUser.value)
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
    <UserList
      v-for="user in users"
      :key="user.id"
      :user="user"
      @updateUser="updateUser"
    />
  </div>
</template>

<style></style>

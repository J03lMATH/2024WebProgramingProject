<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { getAll, remove, type User } from '@/models/user'

const users = ref<User[]>([])
getAll().then(data => {
  users.value = data.data
})

const emit = defineEmits(['editUser'])

function updateUser(user: User) {
  emit('editUser', user)
}
function removeUser(id: number) {
  remove(id).then(() => {
    users.value = users.value.filter(user => user.id !== id)
  })
}
</script>

<template>
  <div>
    <h2 class="subtitle">User List</h2>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="profile in users" :key="profile.id">
          <td>{{ profile.name }}</td>
          <td>{{ profile.email }}</td>
          <td>
            <button
              class="button is-small is-info"
              @click="updateUser(profile)"
            >
              Edit
            </button>
            <button
              class="button is-small is-danger"
              @click="removeUser(profile.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
button {
  margin-right: 0.5rem;
}
</style>

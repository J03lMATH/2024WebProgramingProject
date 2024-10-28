<script setup lang="ts">
import { removeUser } from '@/models/userData'
import { ref, defineEmits } from 'vue'
import { getAll, type User } from '@/models/users'

const users = ref<User[]>([])
users.value = getAll().data

const emit = defineEmits(['editUser'])

function emitEditUser(user: User) {
  emit('editUser', user)
}
function deleteUser(id: number) {
  removeUser(users.value, id)
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
              @click="emitEditUser(profile)"
            >
              Edit
            </button>
            <button
              class="button is-small is-danger"
              @click="deleteUser(profile.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

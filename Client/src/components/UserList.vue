<script setup lang="ts">
import { ref } from 'vue'
import { remove, type User } from '@/models/user'
import EditUserForm from './EditUserForm.vue'

const props = defineProps<{
  user: User
}>()

const { user } = props

const selectedUser = ref<User | null>(null)
function updateUser(user: User) {
  selectedUser.value = user
  console.log(selectedUser.value)
}
</script>

<template>
  <div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button class="button is-small is-info">
              <EditUserForm :selectedUser="user" />
            </button>
            <button class="button is-small is-danger" @click="remove(user.id)">
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

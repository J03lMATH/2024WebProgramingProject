<script setup lang="ts">
import { type User, setUsers } from '@/models/user'
//import { setUser } from '@/models/userData'

const props = defineProps<{
  user: User
}>()

const { user } = props
</script>

<template>
  <a class="dropdown-item has-text-grey-light" @click="setUsers(user)">
    {{ user.name }}
  </a>
</template>

<style scoped></style>

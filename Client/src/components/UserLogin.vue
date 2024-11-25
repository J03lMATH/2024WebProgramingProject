<script setup lang="ts">
import type { User } from '@/models/user'
import { setUser } from '@/models/userData'

const props = defineProps<{
  user: User
}>()

const { user } = props
</script>

<template>
  <a class="dropdown-item has-text-grey-light" @click="setUser(user)">
    {{ user.name }}
  </a>
</template>

<style scoped></style>

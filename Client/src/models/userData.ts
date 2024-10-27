import { ref } from 'vue'
import type { User } from './users'

export interface UserData {
  user: User
}

const currentUser = ref<UserData[]>([])

export const refUser = () => currentUser

export function setUser(user: User) {
  currentUser.value.push({ user })
}

export function logOut() {
  currentUser.value.pop()
}

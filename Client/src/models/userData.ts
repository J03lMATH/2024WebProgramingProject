import { ref } from 'vue'
import type { User } from './users'
import type { Track } from './tracks'

export interface UserData {
  user: User
  track: Track
}

const currentUser = ref<UserData[]>([])

export const refUser = () => currentUser

export function setUser(user: UserData) {
  currentUser.value.push(user)
}

export function logOut() {
  currentUser.value.pop()
}

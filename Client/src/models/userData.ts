import { ref } from 'vue'
import type { User } from './users'
import type { Info } from './infos'

export interface UserData {
  user: User
}

const currentUser = ref<UserData[]>([])

export const refUser = () => currentUser

export function setUser(user: User) {
  currentUser.value.push({ user }) // Initialize infos as an empty array
}

export function logOut() {
  currentUser.value.pop()
}

export function addInfo(user: User, newInfo: Info) {
  // Add the new Info object to the user's infos array
  user.infos.push(newInfo)
  // Return the updated user
  return user
}

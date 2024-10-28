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

export function removeInfo(user: User, infoId: number) {
  // Find the index of the Info object with the given id
  const index = user.infos.findIndex(info => info.id === infoId)
  // Remove the Info object from the user's infos array
  user.infos.splice(index, 1)
  // Return the updated user
  return user
}

export function sortUsersInfoByDate(
  users: User[],
  ascending: boolean = true,
): User[] {
  return users.map(user => {
    // Sort the user's infos array by date
    user.infos.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return ascending ? dateA - dateB : dateB - dateA
    })

    return user // Return the updated user with sorted infos
  })
}

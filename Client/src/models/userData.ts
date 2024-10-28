import { ref } from 'vue'
import type { User } from './users'
import type { Info } from './infos'

export interface UserData {
  user: User
  infos: Info[]
}

const currentUser = ref<UserData[]>([])

export const refUser = () => currentUser

export function setUser(user: User) {
  currentUser.value.push({ user, infos: [] }) // Initialize infos as an empty array
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

export function updateInfo(user: User, updatedInfo: Info) {
  // Find the index of the Info object with the given id
  const index = user.infos.findIndex(info => info.id === updatedInfo.id)
  // Replace the Info object at the index with the updated Info object
  user.infos[index] = updatedInfo
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

export function sortUsersInfoByDateForFriends(
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

export function sortInfosByDate(infos: Info[]) {
  return infos.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export function generateNewUserId(users: User[]): number {
  if (users.length === 0) return 1
  return users[users.length - 1].id + 1
}

// Function to add a new user to the list
export function addUser(users: User[], newUser: Omit<User, 'id'>): User {
  const newUserId = generateNewUserId(users) // Get a new ID
  const userToAdd: User = { id: newUserId, ...newUser } // Create a full user object with the new ID

  users.push(userToAdd) // Add the new user to the array
  return userToAdd // Return the added user
}

export function updateUser(users: User[], updatedUser: User) {
  const index = users.findIndex(user => user.id === updatedUser.id) // Find the index of the user to update
  users[index] = updatedUser // Update the user at the index
  return updatedUser // Return the updated user
}

export function removeUser(users: User[], userId: number) {
  const index = users.findIndex(user => user.id === userId) // Find the index of the user to remove
  const removedUser = users.splice(index, 1)[0] // Remove the user at the index and store it
  return removedUser // Return the removed user
}

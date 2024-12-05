import type { Info } from './infos'
import type { DataListEnvelope } from './dataEnvelope'
import { restAPI } from './myFetch'
import { ref } from 'vue'

export async function getAll() {
  return restAPI<DataListEnvelope<User>>('users')
}
export async function getById(id: number) {
  return restAPI<User>(`users/${id}`)
}
export function create(user: User) {
  return restAPI<User>('users', user)
}
export function update(user: User) {
  return restAPI<User>(`users/${user.id}`, user, 'PATCH')
}
export function remove(id: number) {
  return restAPI<User>(`users/${id}`, undefined, 'DELETE')
}

//gets the infos from the specific user
export function getInfos(userId: number) {
  return restAPI<DataListEnvelope<Info>>(`users/${userId}/infos`)
}

//logins in user
export function login(email: string, password: string) {
  return restAPI<User>('users/login', { email, password })
}

//signup user
export function signup(email: string, password: string) {
  return restAPI<User>('users/signup', { email, password })
}

export function getByEmail(email: string) {
  return restAPI<User>(`users/${email}/logingInByEmail`)
}

export interface User {
  id: number
  name: string
  email: string
  username: string
  password: string
  age: number
  admin: boolean
  image: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  infos: Info[]
}

const currUser = ref<User | null>(null)

export const refsUser = () => currUser

export function setUsers(user: User) {
  currUser.value = user // Initialize infos as an empty array
}

export function logOutbutt() {
  currUser.value = null
}

export function getId() {
  return currUser.value?.id
}

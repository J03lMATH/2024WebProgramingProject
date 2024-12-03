import type { Info } from './infos'
import type { DataListEnvelope } from './dataEnvelope'
import { restAPI } from './myFetch'

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

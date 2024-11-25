import data from '../data/user.json'
import type { Info } from './infos'
import type { DataListEnvelope } from './dataEnvelope'

// Define the User interface
export function getAll(): DataListEnvelope<User> {
  return {
    data: data.items,
    total: data.total,
  }
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

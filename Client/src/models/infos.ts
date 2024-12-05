import type { DataListEnvelope } from './dataEnvelope'
import { restAPI } from './myFetch'

export async function getAll() {
  return restAPI<DataListEnvelope<Info>>('infos')
}

export async function getById(id: number) {
  return restAPI<Info>(`infos/${id}`)
}

export function create(userId: number, info: Info) {
  return restAPI<Info>(`users//infos/add/${userId}`, info)
}

export function update(info: Info) {
  return restAPI<Info>(`infos/${info.id}`, info, 'PATCH')
}

export function remove(id: number) {
  return restAPI<Info>(`infos/${id}`, undefined, 'DELETE')
}

export interface Info {
  id: number
  userId: number
  title: string
  type: string
  date: string
  distance: number
  duration: number
  calories: number
  avgPace: number
  image: string
}

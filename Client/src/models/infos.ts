import type { DataListEnvelope, DataEnvelope } from './dataEnvelope'
import { restAPI } from './myFetch'

export async function getAll() {
  return restAPI<DataListEnvelope<Info>>('infos')
}
export async function getByUserId(userId: number) {
  return restAPI<DataListEnvelope<Info>>(`infos/user/${userId}`)
}

export async function getById(id: number) {
  return restAPI<DataEnvelope<Info>>(`infos/${id}`)
}
export function create(info: Info) {
  return restAPI<DataEnvelope<Info>>('infos', info)
}
export function update(info: Info) {
  return restAPI<DataEnvelope<Info>>(`infos/${info.id}`, info, 'PATCH')
}
export function remove(id: number) {
  return restAPI<DataEnvelope<Info>>(`infos/${id}`, undefined, 'DELETE')
}

export interface Info {
  id: number
  title: string
  type: string
  date: string
  distance: number
  duration: number
  calories: number
  avgPace: number
  image: string
}

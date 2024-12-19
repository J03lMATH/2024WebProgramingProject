export type { Hashtag } from './hashtags'
import type { DataListEnvelope } from './dataEnvelope'
import type { Hashtag } from './hashtags'
import { restAPI } from './myFetch'

export async function getAllInfos() {
  return restAPI<DataListEnvelope<Info>>('infos')
}

export async function getById(id: number) {
  return restAPI<Info>(`infos/${id}`)
}

export function createInfo(id: number, info: Info) {
  return restAPI<Info>(`infos/add/${id}`, info)
}

export function updateInfo(info: Info) {
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
  hashtags: Hashtag[]
}

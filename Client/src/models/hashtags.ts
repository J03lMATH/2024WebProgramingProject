import { type DataListEnvelope } from './dataEnvelope'
import { restAPI } from './myFetch'

export async function getAllHashtags() {
  return restAPI<DataListEnvelope<Hashtag>>('hashtags')
}

export async function addById(id: number, hashtag: Hashtag) {
  return restAPI<Hashtag>(`hashtags/${id}`, hashtag)
}

export interface Hashtag {
  id: number
  infoId: number
  name: string
}

import data from '../data/tracks.json'
import type { DataListEnvelope } from './dataEnvelope'

export function getAll(): DataListEnvelope<Track> {
  return {
    data: data.workouts,
    total: data.total,
  }
}

export interface Track {
  id: number
  title: string
  type: string
  date: string
  distance: number
  duration: number
  calories: number
  avgPace: number
}

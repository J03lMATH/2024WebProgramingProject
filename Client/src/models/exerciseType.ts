import type { DataListEnvelope } from './dataEnvelope'
import { restAPI } from './myFetch'

export async function getAllEx() {
  console.log('getting all exercise types')
  return restAPI<DataListEnvelope<ExerciseType>>('exerciseType')
}

export async function getById(id: number) {
  return restAPI<ExerciseType>(`exerciseType/${id}`)
}

export function createEx(exerciseType: ExerciseType) {
  return restAPI<ExerciseType>('exerciseType', exerciseType)
}

export function updateEx(exerciseType: ExerciseType) {
  return restAPI<ExerciseType>(
    `exerciseType/${exerciseType.id}`,
    exerciseType,
    'PATCH',
  )
}

export function remove(id: number) {
  return restAPI<ExerciseType>(`exerciseType/${id}`, undefined, 'DELETE')
}

export interface ExerciseType {
  id: number
  name: string
  description: string
}

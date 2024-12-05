import type { DataListEnvelope } from './dataEnvelope'
import { restAPI } from './myFetch'

export async function getAll() {
  return restAPI<DataListEnvelope<ExerciseType>>('exerciseTypes')
}

export async function getById(id: number) {
  return restAPI<ExerciseType>(`exerciseTypes/${id}`)
}

export function create(exerciseType: ExerciseType) {
  return restAPI<ExerciseType>('exerciseTypes', exerciseType)
}

export function update(exerciseType: ExerciseType) {
  return restAPI<ExerciseType>(
    `exerciseTypes/${exerciseType.id}`,
    exerciseType,
    'PATCH',
  )
}

export function remove(id: number) {
  return restAPI<ExerciseType>(`exerciseTypes/${id}`, undefined, 'DELETE')
}

export interface ExerciseType {
  id: number
  name: string
  description: string
}

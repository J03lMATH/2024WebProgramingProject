<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import { type Info, createInfo, updateInfo } from '@/models/infos'
import { refsUser } from '@/models/user'
import { getAllEx, type ExerciseType } from '@/models/exerciseType'

const props = defineProps<{ selectedWorkout: Info | null }>()

const currentUser = refsUser()
const exerciseTypes = ref<ExerciseType[]>([])
getAllEx().then(data => {
  exerciseTypes.value = data.data
})

const title = ref('')
const date = ref('')
const type = ref('')
const distance = ref(0)
const duration = ref(0)
const calories = ref(0)
const avgPace = ref(0)
const image = ref('')
const isOpen = ref(false)
const selectedWorkoutId = ref<number | null>(null)

watch(
  () => props.selectedWorkout,
  newWorkout => {
    if (newWorkout) {
      selectedWorkoutId.value = newWorkout.id
      title.value = newWorkout.title
      date.value = newWorkout.date
      type.value = newWorkout.type
      distance.value = newWorkout.distance
      duration.value = newWorkout.duration
      calories.value = newWorkout.calories
      avgPace.value = newWorkout.avgPace
      image.value = newWorkout.image
      isOpen.value = true
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

function resetForm() {
  title.value = ''
  date.value = ''
  type.value = ''
  distance.value = 0
  duration.value = 0
  calories.value = 0
  avgPace.value = 0
  image.value = ''
  selectedWorkoutId.value = null
  isOpen.value = false
}

function saveWorkout() {
  const userId = currentUser.value?.id
  console.log(userId)
  if (userId !== undefined) {
    const newInfo = {
      id: selectedWorkoutId.value ?? 0,
      userId: userId,
      title: title.value,
      type: type.value,
      date: date.value,
      distance: distance.value,
      duration: duration.value,
      calories: calories.value,
      avgPace: avgPace.value,
      image: image.value,
    }
    debugger
    console.log(newInfo)

    if (selectedWorkoutId.value === null) {
      createInfo(userId, newInfo)
    } else {
      updateInfo(newInfo)
    }
    resetForm()

    resetForm()
  } else {
    console.log('User not found/cant be created')
  }
}
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-half media">
      <a
        class="button is-info is-fullwidth"
        :class="{ 'is-active': isOpen }"
        @click="isOpen = !isOpen"
      >
        Add Workout
      </a>
      <form @submit.prevent="saveWorkout">
        <div class="modal" :class="{ 'is-active': isOpen }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head has-background-danger-bold">
              <p class="modal-card-title has-text-text-45">Add Workout</p>
              <button
                class="delete"
                aria-label="close"
                type="button"
                @click="isOpen = false"
              ></button>
            </header>

            <section class="modal-card-body has-background-text-bold">
              <div class="field">
                <label class="label has-text-text-45" for="title">Title</label>
                <div class="control">
                  <input
                    type="text"
                    class="input has-background-text-100 has-text-text-45"
                    id="title"
                    v-model="title"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="date">Date</label>
                <div class="control">
                  <input
                    type="date"
                    class="input has-background-text-100 has-text-text-45"
                    id="date"
                    v-model="date"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="type"
                  >Types Of Exercise</label
                >
                <div
                  v-for="exerciseType in exerciseTypes"
                  :key="exerciseType.id"
                >
                  <div class="control">
                    <label>
                      <input
                        type="radio"
                        class="radio"
                        :name="'exercise-type'"
                        :value="exerciseType.name"
                        v-model="type"
                      />
                      {{ exerciseType.name }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="distance"
                  >Distance</label
                >
                <div class="control">
                  <input
                    type="number"
                    class="input has-background-text-100 has-text-text-45"
                    id="distance"
                    v-model="distance"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="duration"
                  >Duration</label
                >
                <div class="control">
                  <input
                    type="number"
                    class="input has-background-text-100 has-text-text-45"
                    id="duration"
                    v-model="duration"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="calories"
                  >Calories</label
                >
                <div class="control">
                  <input
                    type="number"
                    class="input has-background-text-100 has-text-text-45"
                    id="calories"
                    v-model="calories"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="avgPace"
                  >Avg Pace</label
                >
                <div class="control">
                  <input
                    type="number"
                    class="input has-background-text-100 has-text-text-45"
                    id="avgPace"
                    v-model="avgPace"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="image"
                  >Image URL</label
                >
                <div class="control">
                  <input
                    type="text"
                    class="input has-background-text-100 has-text-text-45"
                    id="image"
                    v-model="image"
                  />
                </div>
              </div>
            </section>

            <footer class="modal-card-foot has-background-danger-bold">
              <button
                class="button is-success"
                type="submit"
                @click="isOpen = false"
              >
                Save changes
              </button>
              <button class="button" type="button" @click="resetForm">
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

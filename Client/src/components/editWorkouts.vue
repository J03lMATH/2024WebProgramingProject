<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import { type Info, updateInfo } from '@/models/infos'
import { getAllEx, type ExerciseType } from '@/models/exerciseType'
const props = defineProps<{ selectedWorkout: Info | null }>()

const exerciseTypes = ref<ExerciseType[]>([])
getAllEx().then(data => {
  exerciseTypes.value = data.data
})

//creating all the const
const title = ref(props.selectedWorkout?.title || '')
const date = ref(props.selectedWorkout?.date || '')
const type = ref(props.selectedWorkout?.type || '')
const distance = ref(props.selectedWorkout?.distance || 0)
const duration = ref(props.selectedWorkout?.duration || 0)
const calories = ref(props.selectedWorkout?.calories || 0)
const avgPace = ref(props.selectedWorkout?.avgPace || 0)
const image = ref(props.selectedWorkout?.image || '')
const isOpen = ref(false)
const selectedWorkoutId = ref(props.selectedWorkout?.id || 0)
const userId = ref(props.selectedWorkout?.userId || 0)

watch(
  () => props.selectedWorkout,
  updateWorkout => {
    if (updateWorkout) {
      selectedWorkoutId.value = updateWorkout.id
      userId.value = updateWorkout.userId
      title.value = updateWorkout.title
      date.value = updateWorkout.date
      type.value = updateWorkout.type
      distance.value = updateWorkout.distance
      duration.value = updateWorkout.duration
      calories.value = updateWorkout.calories
      avgPace.value = updateWorkout.avgPace
      image.value = updateWorkout.image
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

function resetForm() {
  title.value = props.selectedWorkout?.title || ''
  date.value = props.selectedWorkout?.date || ''
  type.value = props.selectedWorkout?.type || ''
  distance.value = props.selectedWorkout?.distance || 0
  duration.value = props.selectedWorkout?.duration || 0
  calories.value = props.selectedWorkout?.calories || 0
  avgPace.value = props.selectedWorkout?.avgPace || 0
  image.value = props.selectedWorkout?.image || ''
  selectedWorkoutId.value = props.selectedWorkout?.id || 0
  userId.value = props.selectedWorkout?.userId || 0
  isOpen.value = false
}

function saveWorkout() {
  const newInfo = {
    id: selectedWorkoutId.value,
    userId: userId.value,
    title: title.value,
    type: type.value,
    date: date.value,
    distance: distance.value,
    duration: duration.value,
    calories: calories.value,
    avgPace: avgPace.value,
    image: image.value,
    hashtags: props.selectedWorkout?.hashtags || [],
  }

  if (selectedWorkoutId.value) {
    updateInfo(newInfo)
  } else {
    console.log('bad Update')
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
        Edit
      </a>
      <form @submit.prevent="saveWorkout">
        <div class="modal" :class="{ 'is-active': isOpen }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head has-background-danger-bold">
              <p class="modal-card-title has-text-text-45">Edit Workout</p>
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

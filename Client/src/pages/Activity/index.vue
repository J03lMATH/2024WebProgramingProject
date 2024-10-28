<script setup lang="ts">
import Activities from '@/components/Activities.vue'
import { ref } from 'vue'
import { refUser, addInfo } from '@/models/userData'

const currentUser = refUser()

const title = ref('')
const date = ref('')
const type = ref('')
const distance = ref(0)
const duration = ref(0)
const calories = ref(0)
const avgPace = ref(0)
const image = ref('')
const isOpen = ref(false)

function addWorkout() {
  const newInfo = {
    id: Date.now(),
    title: title.value,
    type: type.value,
    date: date.value,
    distance: distance.value,
    duration: duration.value,
    calories: calories.value,
    avgPace: avgPace.value,
    image: image.value,
  }

  const userId = currentUser.value[0].user
  addInfo(userId, newInfo)

  //reset form fields
  title.value = ''
  type.value = ''
  date.value = ''
  distance.value = 0
  duration.value = 0
  calories.value = 0
  avgPace.value = 0
  image.value = ''
}
</script>
<template>
  <h1 class="title">My Activities</h1>
  <div v-if="currentUser.length === 0">
    <div class="notification is-warning">
      <p>You must log in to add workouts and see your workouts.</p>
    </div>
  </div>
  <div class="columns is-centered" v-else>
    <div class="column is-half media">
      <a
        class="button is-info is-fullwidth"
        :class="{ 'is-active': isOpen }"
        @click="isOpen = !isOpen"
      >
        Add Workout
      </a>
      <form @submit.prevent="addWorkout">
        <div class="modal" :class="{ 'is-active': isOpen }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head has-background-danger-bold">
              <p class="modal-card-title has-text-text-45">Add Workout</p>
              <button
                class="delete"
                aria-label="close"
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
                <label class="label has-text-text-45" for="type">Type</label>
                <div class="control">
                  <input
                    type="text"
                    class="input has-background-text-100 has-text-text-45"
                    id="type"
                    v-model="type"
                  />
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
              <button class="button" type="button" @click="isOpen = false">
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </form>
    </div>
  </div>

  <Activities />
</template>
<style scoped></style>

<script setup lang="ts">
import Activities from '@/components/Activities.vue'
import { ref } from 'vue'

const isOpen = ref(false)
</script>
<template>
  <h1 class="title">My Activities</h1>
  <div class="columns is-centered">
    <div class="column is-half media">
      <a
        class="button is-info is-fullwidth"
        :class="{ 'is-active': isOpen }"
        @click="isOpen = !isOpen"
      >
        Add Workout
      </a>
      <form>
        <div class="modal" :class="{ 'is-active': isOpen }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head has-background-danger-bold">
              <p class="modal-card-title has-text-text-45">Add Workout</p>
              <button class="delete" aria-label="close"></button>
            </header>

            <section class="model-card-body has-background-text-bold">
              <div class="field">
                <label class="label has-text-text-45" for="title">Title</label>
                <div class="control">
                  <input
                    type="text"
                    class="input has-background-text-100 has-text-text-45"
                    id="title"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="date">Date</label>
                <div class="control">
                  <input
                    class="input has-background-text-100 has-text-text-45"
                    type="date"
                    id="date"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="type"
                  >Type of Workout</label
                >
                <div class="select is-full-witdh">
                  <select
                    class="form-control has-background-text-100 has-text-text-45"
                    id="type"
                  >
                    <option value="run">Run</option>
                    <option value="bike">Bike</option>
                    <option value="swim">Swim</option>
                    <option value="walk">Walk</option>
                    <option value="swim">Strength</option>
                    <option value="swim">Hike</option>
                  </select>
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="distance"
                  >Distance</label
                >
                <div class="control">
                  <input
                    class="input has-background-text-100 has-text-text-45"
                    type="number"
                    id="distance"
                    placeholder="by Feet"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="duration"
                  >Duration</label
                >
                <div class="control">
                  <input
                    class="input has-background-text-100 has-text-text-45"
                    type="number"
                    id="duration"
                    placeholder="by Minutes"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="calories"
                  >Calories</label
                >
                <input
                  type="number"
                  class="input has-background-text-100 has-text-text-45"
                  id="calories"
                />
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="avgPace"
                  >Average Pace</label
                >
                <input
                  type="number"
                  class="input has-background-text-100 has-text-text-45"
                  id="avgPace"
                  placeholder="by mph"
                />
              </div>
            </section>

            <footer class="modal-card-foot has-background-danger-bold">
              <button class="button is-success">Save</button>
              <button class="button">Cancel</button>
            </footer>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped></style>

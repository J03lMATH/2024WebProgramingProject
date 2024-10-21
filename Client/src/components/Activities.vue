<script setup lang="ts">
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
            <header class="modal-card-head">
              <p class="modal-card-title">Add Workout</p>
              <button class="delete" aria-label="close"></button>
            </header>

            <section class="model-card-body">
              <div class="field">
                <label class="label" for="title">Title</label>
                <input type="text" class="input" id="title" />
              </div>
              <div class="field">
                <label class="label" for="date">Date</label>

                <input class="input" type="date" id="date" />
              </div>
              <div class="field">
                <label class="label" for="type">Type of Workout</label>
                <div class="slect is-full-witdh">
                  <select class="form-control" id="type">
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
                <label class="label" for="distance">Distance</label>
                <input type="number" class="input" id="distance" />
              </div>
              <div class="field">
                <label class="label" for="duration">Duration</label>
                <input type="number" class="input" id="duration" />
              </div>
              <div class="field">
                <label class="label" for="calories">Calories</label>
                <input type="number" class="input" id="calories" />
              </div>
              <div class="field">
                <label class="label" for="avgPace">Average Pace</label>
                <input type="number" class="input" id="avgPace" />
              </div>
            </section>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

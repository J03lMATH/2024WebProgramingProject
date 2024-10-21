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
                <label class="label">Date</label>
                <div class="control">
                  <input class="input" type="date" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

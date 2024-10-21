<script setup lang="ts">
import { Track } from '@/models/track'

defineProps<{
  tracks: Track
}>()
</script>

<template>
  <div
    class="box has-text-success has-background-grey-darker summary"
    v-for="track in tracks"
    :key="track.id"
  >
    <div class="columns is-centered">
      <h5 class="title is-5">{{ track.date }}</h5>
    </div>
    <div class="columns is-multiline">
      <div class="column is-half">
        <div class="container">
          <h3 class="subtitle is-3">{{ track.avgPace }} mph</h3>
          <p>Avg Pace</p>
        </div>
      </div>
      <div class="column is-half">
        <div class="container">
          <h3 class="subtitle is-3">{{ track.distance }} miles</h3>
          <p>Distance</p>
        </div>
      </div>
      <div class="column is-half">
        <div class="container">
          <h3 class="subtitle is-3">{{ track.duration }} minutes</h3>
          <p>Duration</p>
        </div>
      </div>
      <div class="column is-half">
        <div class="container">
          <h3 class="subtitle is-3">{{ track.calories }} cal</h3>
          <p>Calories</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  box-shadow: drop-shadow(0 0 10px rgba(0, 0, 0, 0.8));
  padding: 1rem;
  text-align: center;
}
</style>

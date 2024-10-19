<script setup lang="ts">
const tracks = [
  {
    id: 1,
    date: '10/01/2023',
    distance: 2.5 + ' miles',
    duration: 30 + ' min',
    calories: 200 + ' cal',
    avgPace: 12 + ' mph',
  },
  {
    id: 2,
    date: '10/02/2023',
    distance: 3.0 + ' miles',
    duration: 35 + ' min',
    calories: 250 + ' cal',
    avgPace: 10 + ' mph',
  },
  {
    id: 3,
    date: '10/03/2023',
    distance: 4.2 + ' miles',
    duration: 50 + ' min',
    calories: 300 + ' cal',
    avgPace: 8 + ' mph',
  },
  {
    id: 4,
    date: '10/04/2023',
    distance: 5.0 + ' miles',
    duration: 60 + ' min',
    calories: 350 + ' cal',
    avgPace: 9 + ' mph',
  },
]
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
          <h3 class="subtitle is-3">{{ track.avgPace }}</h3>
          <p>Avg Pace</p>
        </div>
      </div>
      <div class="column is-half">
        <div class="container">
          <h3 class="subtitle is-3">{{ track.distance }}</h3>
          <p>Distance</p>
        </div>
      </div>
      <div class="column is-half">
        <div class="container">
          <h3 class="subtitle is-3">{{ track.duration }}</h3>
          <p>Duration</p>
        </div>
      </div>
      <div class="column is-half">
        <div class="container">
          <h3 class="subtitle is-3">{{ track.calories }}</h3>
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

<script setup lang="ts">
import { ref } from 'vue'
import { type Track } from '@/models/tracks'
import { refUser } from '@/models/userData'

const currentUser = refUser()

defineProps<{
  tracks: Track[]
}>()
</script>

<template>
  <div v-for="profile in currentUser" :key="profile.user.id"></div>
  <div class="box has-text-success has-background-grey-darker summary">
    <div class="columns is-centered">
      <h5 class="title is-5">{{ profile.tracks.date }}</h5>
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
          <h3 class="subtitle is-3">{{ track.distance }} ft</h3>
          <p>Distance</p>
        </div>
      </div>
      <div class="column is-half">
        <div class="container">
          <h3 class="subtitle is-3">{{ track.duration }} min</h3>
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
p {
  font-weight: bold;
}

label {
  font-weight: bold;
  margin-top: 0.3rem;
  margin-left: 0.5rem;
}
input {
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  width: 95%;
}
input::placeholder {
  color: #909090;
}

button {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  width: 95%;
}

select {
  margin-left: 0.5rem;
}
</style>

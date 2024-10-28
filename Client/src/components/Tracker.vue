<script setup lang="ts">
import { computed } from 'vue'
import { refUser, sortInfosByDate } from '@/models/userData'

const currentUser = refUser()

const sortedInfos = computed(() => {
  return currentUser.value.map(userData => ({
    ...userData,
    user: {
      ...userData.user,
      infos: sortInfosByDate(userData.user.infos),
    },
  }))
})

const totalDistance = computed(() => {
  return sortedInfos.value.reduce((total, userData) => {
    return (
      total +
      userData.user.infos.reduce((userTotal, info) => {
        return userTotal + (info.distance || 0)
      }, 0)
    )
  }, 0)
})
const totalCalories = computed(() => {
  return sortedInfos.value.reduce((total, userData) => {
    return (
      total +
      userData.user.infos.reduce((userTotal, info) => {
        return userTotal + (info.calories || 0)
      }, 0)
    )
  }, 0)
})
const totalDuration = computed(() => {
  return sortedInfos.value.reduce((total, userData) => {
    return (
      total +
      userData.user.infos.reduce((userTotal, info) => {
        return userTotal + (info.duration || 0)
      }, 0)
    )
  }, 0)
})

const totalAvgPace = computed(() => {
  return sortedInfos.value.reduce((total, userData) => {
    return (
      total +
      userData.user.infos.reduce((userTotal, info) => {
        return userTotal + (info.avgPace || 0)
      }, 0)
    )
  }, 0)
})
</script>

<template>
  <div class="box has-text-success has-background-grey-darker summary">
    <div class="columns is-centered">
      <h5 class="title is-5">Total Stats</h5>
    </div>
    <div class="columns is-multiline">
      <div class="column is-half">
        <div class="container">
          <h3 class="subtitle is-3">{{ totalAvgPace }} mph</h3>
          <p>Avg Pace</p>
        </div>
      </div>
      <div class="column is-half">
        <div class="container">
          <h3 class="subtitle is-3">{{ totalDistance }} ft</h3>
          <p>Distance</p>
        </div>
      </div>
      <div class="column is-half">
        <div class="container">
          <h3 class="subtitle is-3">{{ totalDuration }} min</h3>
          <p>Duration</p>
        </div>
      </div>
      <div class="column is-half">
        <div class="container">
          <h3 class="subtitle is-3">{{ totalCalories }} cal</h3>
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

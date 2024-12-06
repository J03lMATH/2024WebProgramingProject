<script setup lang="ts">
import { computed, ref } from 'vue'
import { sortInfosByDate } from '@/models/userData'
import { type Info, getAllInfos } from '@/models/infos'
import { refsUser } from '@/models/user'

const infos = ref<Info[]>([])

getAllInfos().then(data => {
  infos.value = data.data
})

const currentUser = refsUser()

const selectedUserId = ref<number | null>(null)
if (currentUser.value) {
  selectedUserId.value = currentUser.value.id
}

function sortByIdInfos(selectedUserId: number | null, infos: Info[]): Info[] {
  return infos.filter(info => info.userId === selectedUserId)
}

const sortedInfos = computed(() => {
  return sortInfosByDate(sortByIdInfos(selectedUserId.value, infos.value))
})

const totalDistance = computed(() => {
  return sortedInfos.value.reduce((total, info) => {
    return total + (info.distance || 0)
  }, 0)
})
const totalCalories = computed(() => {
  return sortedInfos.value.reduce((total, info) => {
    return total + (info.calories || 0)
  }, 0)
})
const totalDuration = computed(() => {
  return sortedInfos.value.reduce((total, info) => {
    return total + (info.duration || 0)
  }, 0)
})

const totalAvgPace = computed(() => {
  return sortedInfos.value.reduce((total, info) => {
    return total + (info.avgPace || 0)
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

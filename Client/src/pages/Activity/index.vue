<script setup lang="ts">
import Activities from '@/components/Activities.vue'
import { refsUser, getInfos, getId } from '@/models/user'
import MakeWorkout from '@/components/MakeWorkout.vue'
import { ref } from 'vue'
import type { Info } from '@/models/infos'

const currentUser = refsUser()
const selectedWorkout = ref<Info | null>(null)

function editWorkout(workout: Info) {
  selectedWorkout.value = workout
}

let UserId = undefined
if (currentUser !== null) {
  UserId = getId()
} else {
  UserId = undefined
}

const infos = ref<Info[]>([])

if (UserId !== undefined) {
  getInfos(UserId).then(data => {
    infos.value = data.data
  })
} else {
  infos.value = []
}
</script>

<template>
  <h1 class="title">My Activities</h1>
  <div v-if="currentUser === null">
    <div class="notification is-warning">
      <p>You must log in to add workouts and see your workouts.</p>
    </div>
  </div>
  <div class="forms" v-else>
    <MakeWorkout :selectedWorkout="selectedWorkout" />
  </div>
  <Activities
    v-for="info in infos"
    :key="info.id"
    :info="info"
    @editWorkout="editWorkout"
  />
</template>

<style scoped>
.forms {
  margin-bottom: 1rem;
}
</style>

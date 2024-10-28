<script setup lang="ts">
import AvgPace from '@/components/trackbox/AvgPace.vue'
import Distance from '@/components/trackbox/Distance.vue'
import Duration from '@/components/trackbox/Duration.vue'
import Calories from '@/components/trackbox/Calories.vue'

//array of tracks
import Tracker from '@/components/Tracker.vue'
import { ref } from 'vue'
import { getAll, type Track } from '@/models/tracks'
import { refUser } from '@/models/userData'
const tracks = ref<Track[]>([])
tracks.value = getAll().data

const currentUser = refUser()
</script>

<template>
  <div v-if="currentUser.length === 0">
    <div class="notification is-warning">
      <p>You must log in to see Statistics</p>
    </div>
  </div>

  <div v-else>
    <h1 class="title">Statistics</h1>
  </div>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-two-thirds">
        <Tracker :tracks="tracks" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.column {
  margin-top: 1rem;
}
</style>

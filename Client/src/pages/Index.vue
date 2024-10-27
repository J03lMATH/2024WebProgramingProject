<script setup lang="ts">
import AvgPace from '@/components/trackbox/AvgPace.vue'
import Distance from '@/components/trackbox/Distance.vue'
import Duration from '@/components/trackbox/Duration.vue'
import Calories from '@/components/trackbox/Calories.vue'

//array of tracks
import Tracker from '@/components/Tracker.vue'
import { ref } from 'vue'
import { getAll, type Track } from '@/models/tracks'
const tracks = ref<Track[]>([])
tracks.value = getAll().data
</script>

<template>
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

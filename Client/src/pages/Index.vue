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
        <div class="box has-text-success has-background-grey-darker summary">
          <div class="columns is-centered">
            <h5 class="title is-5">Today</h5>
          </div>

          <div class="columns is-multiline">
            <div class="column is-half">
              <AvgPace />
            </div>
            <div class="column is-half">
              <Distance />
            </div>
            <div class="column is-half">
              <Duration />
            </div>
            <div class="column is-half">
              <Calories />
            </div>
          </div>
        </div>

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

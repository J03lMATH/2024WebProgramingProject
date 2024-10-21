<script setup lang="ts">
import AvgPace from '@/components/trackbox/AvgPace.vue'
import Distance from '@/components/trackbox/Distance.vue'
import Duration from '@/components/trackbox/Duration.vue'
import Calories from '@/components/trackbox/Calories.vue'
import Tracker from '@/components/Tracker.vue'
import { ref } from 'vue'

//for the tracker component
const tracks = ref([
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
])
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

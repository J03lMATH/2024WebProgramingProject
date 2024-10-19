<script setup lang="ts">
import AvgPace from '@/components/AvgPace.vue'
import Distance from '@/components/Distance.vue'
import Duration from '@/components/Duration.vue'
import Calories from '@/components/Calories.vue'
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
      </div>
    </div>
  </div>
</template>

<style scoped></style>

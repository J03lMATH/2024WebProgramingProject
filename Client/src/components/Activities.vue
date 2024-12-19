<script setup lang="ts">
import { refsUser } from '@/models/user'
import { type Info, remove } from '@/models/infos'
import editWorkouts from './editWorkouts.vue'

const currUser = refsUser()
const props = defineProps<{
  info: Info
}>()

const { info } = props
</script>

<template>
  <div class="holders">
    <div class="media box is-half">
      <div class="media-left">
        <figure class="image is-64x64">
          <img class="is-rounded" :src="currUser?.image" alt="Avatar" />
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p v-if="currUser">
            <strong>{{ currUser.name }} </strong>
            <small class="indent">{{ currUser.email }}</small>
            <br />
            <strong> {{ info.title }}</strong>
            <small class="indent"> {{ info.type }}</small>
            <small class="indent"> {{ info.date }}</small>

            <br />
            <br />
          </p>
          <div class="columns">
            <div class="columns is-multiline is-half">
              <div class="column is-half">
                <div class="container">
                  <h3 class="subtitle is-3">{{ info.avgPace }} mph</h3>
                  <p>Avg Pace</p>
                </div>
              </div>
              <div class="column is-half">
                <div class="container">
                  <h3 class="subtitle is-3">{{ info.distance }} ft</h3>
                  <p>Distance</p>
                </div>
              </div>
              <div class="column is-half">
                <div class="container">
                  <h3 class="subtitle is-3">{{ info.duration }} min</h3>
                  <p>Duration</p>
                </div>
              </div>
              <div class="column is-one-half">
                <div class="container">
                  <h3 class="subtitle is-3">{{ info.calories }} cal</h3>
                  <p>Calories</p>
                </div>
              </div>
            </div>
            <div class="column is-half">
              <figure class="image">
                <img :src="info.image" />
              </figure>
            </div>
            <div class="column is-one-third">
              <p>{{ info.hashtags }}</p>
              <div v-for="hashtag in info.hashtags" :key="hashtag.id">
                <p>{{ hashtag.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="media-right">
        <div class="columns">
          <button><editWorkouts :selectedWorkout="info" /></button>
          <button
            class="delete is-background-danger"
            @click="remove(info.id)"
          ></button>
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
.indent {
  margin-left: 0.5rem;
}

.delete {
  margin-top: 0rem;
  margin-left: 0.5rem;
  width: 100%;
}
.holders {
  margin-bottom: 1rem;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { refUser } from '@/models/userData'

const currentUser = refUser()
</script>

<template>
  <div class="holders" v-for="profile in currentUser" :key="profile.user.id">
    <div
      class="media box is-half"
      v-for="track in profile.user.tracks"
      :key="track.id"
    >
      <div class="media-left">
        <figure class="image is-64x64">
          <img class="is-rounded" :src="profile.user.image" alt="Avatar" />
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ profile.user.name }} </strong>
            <small class="indent">{{ profile.user.email }}</small>
            <br />
            <strong> {{ track.title }}</strong>
            <small class="indent"> {{ track.type }}</small>
            <br />
            <br />
          </p>
          <div class="columns">
            <div class="columns is-multiline is-half">
              <div class="column is-half">
                <div class="container">
                  <h4 class="subtitle is-4">{{ track.avgPace }} mph</h4>
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
              <div class="column is-one-half">
                <div class="container">
                  <h3 class="subtitle is-3">{{ track.calories }} cal</h3>
                  <p>Calories</p>
                </div>
              </div>
            </div>
            <div class="column is-half">
              <figure class="image">
                <img :src="track.image" />
              </figure>
            </div>
          </div>
        </div>
      </div>
      <div class="media-right">
        <small> {{ track.date }}</small>
        <button class="delete is-background-danger"></button>
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
  width: 95%;
}
.holders {
  margin-bottom: 1rem;
}
</style>

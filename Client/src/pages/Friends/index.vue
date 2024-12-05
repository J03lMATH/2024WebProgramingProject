<script setup lang="ts">
import { type User, refsUser, getAllWithInfos } from '@/models/user'
import { ref } from 'vue'

import { remove } from '@/models/infos'

const currentUser = refsUser()

const users = ref<User[]>([])
getAllWithInfos().then(data => {
  users.value = data.data
})
</script>

<template>
  <h1 class="title">Friends</h1>
  <div v-if="currentUser === null">
    <div class="notification is-warning">
      <p>You must log in to see Friends</p>
    </div>
  </div>
  <div v-else>
    <div class="holders" v-for="profile in users" :key="profile.id">
      <div
        class="media box is-half"
        v-for="info in profile.infos"
        :key="info.id"
      >
        <div class="media-left">
          <figure class="image is-64x64">
            <img class="is-rounded" :src="profile.image" alt="Avatar" />
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ profile.name }} </strong>
              <small class="indent">{{ profile.email }}</small>
              <br />
              <strong> {{ info.title }}</strong>
              <small class="indent"> {{ info.type }}</small>
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
              <div class="column is-two-fifths">
                <figure class="image">
                  <img :src="info.image" />
                </figure>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="media-right" v-if="currentUser.id === profile.id">
            <strong>{{ info.date }}</strong>
            <button
              class="delete is-background-danger"
              @click="remove(info.id)"
            ></button>
          </div>
          <div class="media-right" v-else>
            <strong> {{ info.date }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.indent {
  margin-left: 0.5rem;
}
.holders {
  margin-bottom: 1rem;
}
.delete {
  margin-top: 0rem;
  margin-left: 0.5rem;
  width: 95%;
}
button {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  width: 95%;
}
</style>

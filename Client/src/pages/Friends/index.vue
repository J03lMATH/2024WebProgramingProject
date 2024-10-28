<script setup lang="ts">
import { type User, getAll } from '@/models/users'
import { ref } from 'vue'
import { refUser, sortUsersInfoByDate } from '@/models/userData'

const currentUser = refUser()
const users = ref<User[]>([])
users.value = getAll().data

const sortedUsers = sortUsersInfoByDate(users.value, false)
</script>

<template>
  <h1 class="title">Friends</h1>
  <div v-if="currentUser.length === 0">
    <div class="notification is-warning">
      <p>You must log in to see Friends</p>
    </div>
  </div>
  <div v-else>
    <div class="holders" v-for="profile in sortedUsers" :key="profile.id">
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
              <div class="column is-half">
                <figure class="image">
                  <img :src="info.image" />
                </figure>
              </div>
            </div>
          </div>
        </div>
        <div class="media-right">
          <strong> {{ info.date }}</strong>
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
</style>

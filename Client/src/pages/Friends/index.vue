<script setup lang="ts">
import { type User, getAll } from '@/models/user'
import { ref } from 'vue'
import {
  refUser,
  sortUsersInfoByDateForFriends,
  removeInfo,
} from '@/models/userData'

const currentUser = refUser()
const users = ref<User[]>([])
users.value = getAll().data

const sortedUsers = sortUsersInfoByDateForFriends(users.value, false)
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
              <div class="column is-two-fifths">
                <figure class="image">
                  <img :src="info.image" />
                </figure>
              </div>
            </div>
          </div>
        </div>

        <div v-for="cur in currentUser" :key="cur.user.id">
          <div class="media-right" v-if="cur.user.id === profile.id">
            <strong>{{ info.date }}</strong>
            <button
              class="delete is-background-danger"
              @click="removeInfo(cur.user, info.id)"
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

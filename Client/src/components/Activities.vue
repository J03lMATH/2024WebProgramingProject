<script setup lang="ts">
import { refUser, sortInfosByDate, removeInfo } from '@/models/userData'
import { ref, computed, defineEmits } from 'vue'
import type { Info } from '@/models/infos'

const emit = defineEmits(['editWorkout'])
const currentUser = refUser()

const sortedInfos = computed(() => {
  return currentUser.value.map(userData => ({
    ...userData,
    user: {
      ...userData.user,
      infos: sortInfosByDate(userData.user.infos),
    },
  }))
})

function emitEditWorkout(info: Info) {
  emit('editWorkout', info)
}
</script>

<template>
  <div class="holders" v-for="profile in sortedInfos" :key="profile.user.id">
    <div
      class="media box is-half"
      v-for="info in profile.user.infos"
      :key="info.id"
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
          </div>
        </div>
      </div>
      <div class="media-right">
        <div class="columns">
          <button class="edit" @click="emitEditWorkout(info)">Edit</button>
          <button
            class="delete is-background-danger"
            @click="removeInfo(profile.user, info.id)"
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

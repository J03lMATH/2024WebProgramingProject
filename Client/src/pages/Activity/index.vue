<script setup lang="ts">
import { ref, computed } from 'vue'

interface Activity {
  date: string
  title: string
  distance: string
  duration: string
}

const newActivity = ref<Activity>({
  date: '',
  title: '',
  distance: '',
  duration: '',
})

const activities = ref<Activity[]>([])

const addActivity = () => {
  if (
    newActivity.value.date &&
    newActivity.value.title &&
    newActivity.value.distance &&
    newActivity.value.duration
  ) {
    activities.value.push({ ...newActivity.value })
    newActivity.value = { date: '', title: '', distance: '', duration: '' }
  } else {
    alert('Please fill in all fields.')
  }
}
</script>

<template>
  <h1 class="title">My Activities</h1>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-two-thirds">
        <div class="activity-maker">
          <input
            v-model="newActivity.date"
            type="date"
            placeholder="Date"
            class="input"
          />
          <input
            v-model="newActivity.title"
            type="text"
            placeholder="Title"
            class="input"
          />
          <input
            v-model="newActivity.distance"
            type="text"
            placeholder="Distance"
            class="input"
          />
          <input
            v-model="newActivity.duration"
            type="text"
            placeholder="Duration"
            class="input"
          />
          <button @click="addActivity" class="button is-primary">
            Add Activity
          </button>
        </div>
        <ul>
          <li v-for="(activity, index) in activities" :key="index">
            <strong>{{ activity.date }}</strong> - {{ activity.title }}:
            {{ activity.distance }}, {{ activity.duration }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity-maker {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
}

.input {
  margin-bottom: 1rem;
}

.button {
  align-self: flex-start;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-top: 2rem;
}

li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ccc;
}
</style>

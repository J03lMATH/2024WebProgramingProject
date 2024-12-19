<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import { type Hashtag, addById } from '@/models/hashtags'

const props = defineProps<{ selectedWorkout: Hashtag | null }>()

const currentInfo = ref()
const hashtags = ref<Hashtag[]>([])

const selectedWorkoutId = ref<number | null>(null)
const isOpen = ref(false)
const name = ref('')

watch(
  () => props.selectedWorkout,
  newHashtag => {
    if (newHashtag) {
      selectedWorkoutId.value = newHashtag.id
      name.value = newHashtag.name
      isOpen.value = true
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

function resetForm() {
  name.value = ''
  selectedWorkoutId.value = null
  isOpen.value = false
}

function saveHashtag() {
  const newHashtag = {
    id: selectedWorkoutId.value ?? 0,
    infoId: currentInfo.value.id,
    name: name.value,
  }
  if (selectedWorkoutId.value !== null) {
    addById(selectedWorkoutId.value, newHashtag)
  }
}
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-half media">
      <a
        class="button is-info is-fullwidth"
        :class="{ 'is-active': isOpen }"
        @click="isOpen = !isOpen"
      >
        Add Workout
      </a>
      <form @submit.prevent="saveHashtag">
        <div class="modal" :class="{ 'is-active': isOpen }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head has-background-danger-bold">
              <p class="modal-card-title has-text-text-45">+</p>
              <button
                class="delete"
                aria-label="close"
                type="button"
                @click="isOpen = false"
              ></button>
            </header>

            <section class="modal-card-body has-background-text-bold">
              <div class="field">
                <label class="label has-text-text-45" for="title">Name</label>
                <div class="control">
                  <input
                    type="text"
                    class="input has-background-text-100 has-text-text-45"
                    id="title"
                    v-model="name"
                  />
                </div>
              </div>
            </section>

            <footer class="modal-card-foot has-background-danger-bold">
              <button
                class="button is-success"
                type="submit"
                @click="isOpen = false"
              >
                Save changes
              </button>
              <button class="button" type="button" @click="resetForm">
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

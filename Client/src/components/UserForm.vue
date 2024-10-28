<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import { refUser, addUser, updateUser } from '@/models/userData'
import { getAll, type User } from '@/models/users'

const props = defineProps<{ selectedUser: User | null }>()
const users = ref<User[]>([])
users.value = getAll().data

const currentUser = refUser()

const name = ref('')
const email = ref('')
const username = ref('')
const password = ref('')
const age = ref(0)
const admin = ref(false)
const image = ref('')
const address = ref({
  street: '',
  city: '',
  state: '',
  zip: '',
})
const selectedUserId = ref<number | null>(null)

watch(
  () => props.selectedUser,
  newUser => {
    if (newUser) {
      selectedUserId.value = newUser.id
      name.value = newUser.name
      email.value = newUser.email
      username.value = newUser.username
      password.value = newUser.password
      age.value = newUser.age
      admin.value = newUser.admin
      image.value = newUser.image
      address.value = newUser.address
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

function resetForm() {
  name.value = ''
  email.value = ''
  username.value = ''
  password.value = ''
  age.value = 0
  admin.value = false
  image.value = ''
  address.value = {
    street: '',
    city: '',
    state: '',
    zip: '',
  }
  selectedUserId.value = null
}

function saveUser() {
  const newUser = {
    id: users.value.length + 1,
    name: name.value,
    email: email.value,
    username: username.value,
    password: password.value,
    age: age.value,
    admin: admin.value,
    image: image.value,
    address: address.value,
    infos: [], // Add an empty array or populate it with appropriate data
  }

  if (selectedUserId.value === null) {
    addUser(users.value, newUser)
  } else {
    updateUser(users.value, newUser)
  }

  resetForm()
}
const isOpen = ref(false)
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-half media">
      <a
        class="button is-info is-fullwidth"
        :class="{ 'is-active': isOpen }"
        @click="isOpen = !isOpen"
      >
        Add User
      </a>
      <form @submit.prevent="saveUser">
        <div class="modal" :class="{ 'is-active': isOpen }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head has-background-danger-bold">
              <p class="modal-card-title has-text-text-45">Add User</p>
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
                    id="name"
                    v-model="name"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="date">Email</label>
                <div class="control">
                  <input
                    type="email"
                    class="input has-background-text-100 has-text-text-45"
                    id="date"
                    v-model="email"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="username"
                  >Username</label
                >
                <div class="control">
                  <input
                    type="text"
                    class="input has-background-text-100 has-text-text-45"
                    id="type"
                    v-model="username"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="password"
                  >Password</label
                >
                <div class="control">
                  <input
                    type="password"
                    class="input has-background-text-100 has-text-text-45"
                    id="distance"
                    v-model="password"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="age">Age</label>
                <div class="control">
                  <input
                    type="number"
                    class="input has-background-text-100 has-text-text-45"
                    id="duration"
                    v-model="age"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="admin">Admin</label>
                <div class="control">
                  <input
                    type="checkbox"
                    class="input has-background-text-100 has-text-text-45"
                    id="calories"
                    v-model="admin"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="Icon">Icon</label>
                <div class="control">
                  <input
                    type="text"
                    class="input has-background-text-100 has-text-text-45"
                    id="avgPace"
                    v-model="image"
                  />
                </div>
              </div>
              <h4 class="subtitle">Address</h4>
              <div class="field">
                <label class="label has-text-text-45" for="street"
                  >Street</label
                >
                <div class="control">
                  <input
                    type="text"
                    class="input has-background-text-100 has-text-text-45"
                    id="image"
                    v-model="address.street"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="city">City</label>
                <div class="control">
                  <input
                    type="text"
                    class="input has-background-text-100 has-text-text-45"
                    id="image"
                    v-model="address.city"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="state">State</label>
                <div class="control">
                  <input
                    type="text"
                    class="input has-background-text-100 has-text-text-45"
                    id="image"
                    v-model="address.state"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label has-text-text-45" for="zip">Zip</label>
                <div class="control">
                  <input
                    type="text"
                    class="input has-background-text-100 has-text-text-45"
                    id="image"
                    v-model="address.zip"
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

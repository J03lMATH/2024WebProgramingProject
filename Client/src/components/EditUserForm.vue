<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import { update, type User } from '@/models/user'
const props = defineProps<{ selectedUser: User | null }>()

const SelectedUserId = ref(props.selectedUser?.id || 0)
const name = ref(props.selectedUser?.name || '')
const email = ref(props.selectedUser?.email || '')
const username = ref(props.selectedUser?.username || '')
const password = ref(props.selectedUser?.password || '')
const age = ref(props.selectedUser?.age || 0)
const admin = ref(props.selectedUser?.admin || false)
const image = ref(props.selectedUser?.image || '')
const address = ref({
  street: props.selectedUser?.address.street || '',
  city: props.selectedUser?.address.city || '',
  state: props.selectedUser?.address.state || '',
  zip: props.selectedUser?.address.zip || '',
})
watch(
  () => props.selectedUser,
  editUser => {
    if (editUser) {
      SelectedUserId.value = editUser.id
      name.value = editUser.name
      email.value = editUser.email
      username.value = editUser.username
      password.value = editUser.password
      age.value = editUser.age
      admin.value = editUser.admin
      image.value = editUser.image
      address.value = editUser.address
    }
    console.log(editUser)
  },
)

function resetForm() {
  SelectedUserId.value = props.selectedUser?.id || 0
  name.value = props.selectedUser?.name || ''
  email.value = props.selectedUser?.email || ''
  username.value = props.selectedUser?.username || ''
  password.value = props.selectedUser?.password || ''
  age.value = props.selectedUser?.age || 0
  admin.value = props.selectedUser?.admin || false
  image.value = props.selectedUser?.image || ''
  address.value = {
    street: props.selectedUser?.address.street || '',
    city: props.selectedUser?.address.city || '',
    state: props.selectedUser?.address.state || '',
    zip: props.selectedUser?.address.zip || '',
  }
}

async function saveUser() {
  const editUser = {
    id: SelectedUserId.value,
    name: name.value,
    email: email.value,
    username: username.value,
    password: password.value,
    age: age.value,
    admin: admin.value,
    image: image.value,
    address: address.value,
    infos: [],
  }

  if (SelectedUserId.value) {
    update(editUser)
    console.log(editUser)
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
        Edit
      </a>
      <form @submit.prevent="saveUser">
        <div class="modal" :class="{ 'is-active': isOpen }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head has-background-danger-bold">
              <p class="modal-card-title has-text-text-45">Edit User</p>
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
                    class="boxings"
                    id="admin"
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

<style scoped>
checkbox {
  size: 5rem;
}
.boxings {
  transform: scale();
}
</style>

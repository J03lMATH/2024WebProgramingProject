<script setup lang="ts">
import { ref, watch } from 'vue'
import { create, signup, type User } from '@/models/user'

const user = ref<User | null>(null)
const props = defineProps<{ selectedUser: User | null }>()

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

//resets the form

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
}

//watch the props
watch(
  () => props.selectedUser,
  newUser => {
    if (newUser) {
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

//saves the new user
function saveUser() {
  const newUser = {
    id: 0, // generate a unique id in the database
    name: name.value,
    email: email.value,
    username: 'N/A',
    password: password.value,
    age: 21,
    admin: false,
    image: '',
    address: {
      street: 'N/A',
      city: 'N/A',
      state: 'N/A',
      zip: 'N/A',
    },
    infos: [], // Add an empty array or populate it with appropriate data
  }

  if (email.value != '' && password.value != '') {
    signup(email.value, password.value)
    create(newUser).then(data => {
      user.value = data
      console.log('email:', email.value)
      console.log('password', password.value)
      console.log('User created:', newUser)
    })
  } else {
    resetForm()
    alert('Please enter both username and password.')
  }
}
</script>

<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-two-thirds">
        <h1 class="title">Login</h1>
        <div class="box has-background-grey-darker">
          <form @submit.prevent="saveUser">
            <div class="columns">
              <h5 class="subtitle is-5">Name</h5>
            </div>
            <div class="columns">
              <input type="text" id="name" v-model="name" required />
            </div>
            <div class="columns">
              <h5 class="subtitle is-5">Email</h5>
            </div>
            <div class="columns">
              <input type="text" id="email" v-model="email" required />
            </div>

            <div class="columns">
              <h5 class="subtitle is-5">Password</h5>
            </div>

            <div class="columns">
              <input
                type="password"
                id="password"
                v-model="password"
                required
              />
            </div>

            <RouterLink to="/login"
              ><button type="submit">SignUp</button></RouterLink
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 0.5rem;
  margin-bottom: 0.6rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>

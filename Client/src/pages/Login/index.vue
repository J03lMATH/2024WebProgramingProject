<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const handleSubmit = () => {
  if (username.value && password.value) {
    // Handle login logic here
    console.log('Username:', username.value)
    console.log('Password:', password.value)
    alert('Login successful!')
  } else {
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
          <form @submit.prevent="handleSubmit">
            <div class="columns">
              <h5 class="subtitle is-5">Username</h5>
            </div>

            <div class="columns">
              <input type="text" id="username" v-model="username" required />
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

            <button type="submit">Login</button>
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

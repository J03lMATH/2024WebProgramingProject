<script setup lang="ts">
import { type User, searchUsers } from '@/models/user'
import { ref } from 'vue'
import type { OptionsProp } from '@oruga-ui/oruga-next'

const selected = ref()
const options = ref<OptionsProp[]>([])

const search = async (query: string) => {
  if (query) {
    const data = await searchUsers(query)
    console.log(data)
    options.value = data.data.map((user: User) => ({
      value: user.name,
      label: user.name,
    }))
  } else {
    options.value = []
  }
}
</script>

<template>
  <div>
    <section>
      <o-field label="Find a User's name to Tag">
        <o-autocomplete
          v-model="selected"
          :options="options"
          rounded
          expanded
          placeholder="e.g. John Doe"
          icon="search"
          clearable
          @input="search"
          open-on-focus
        >
          <template #empty>No results found</template>
        </o-autocomplete>
      </o-field>

      <p><b>Selected:</b> {{ selected }}</p>
    </section>
  </div>
</template>

<style scoped></style>

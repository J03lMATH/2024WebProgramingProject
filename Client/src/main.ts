import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/main.css'
import { Oruga } from '@oruga-ui/oruga-next'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(Oruga)

app.mount('#app')

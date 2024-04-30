import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import App from './App.vue'

import router from './routes'

import { echoInstance } from './configs/echo'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.config.globalProperties.$echo = echoInstance

app.use(pinia)
app.use(router)

app.mount('#app')

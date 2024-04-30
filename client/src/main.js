import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import App from './App.vue'

import router from './routes'

import { echo } from './configs/echo'

// import Echo from 'laravel-echo'
// import Pusher from 'pusher-js'

// window.Pusher = Pusher

// import { gtka } from './configs/connectServer'
// const token = gtka()

// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: import.meta.env.VITE_PUSHER_APP_KEY,
//   wsHost: import.meta.env.VITE_PUSHER_HOST ?? `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//   wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//   wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//   forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//   authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
//   cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//   enabledTransports: ['ws', 'wss'],
//   auth: {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }
// })

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.config.globalProperties.$echo = echo

app.use(pinia)
app.use(router)

app.mount('#app')

import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { gtka } from './connectServer'

window.Pusher = Pusher

const echo = () => {
  const token = gtka()

  return new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    wsHost: import.meta.env.VITE_PUSHER_HOST ?? `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
    wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
    wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
    authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    enabledTransports: ['ws', 'wss'],
    auth: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  })
}

export { echo }

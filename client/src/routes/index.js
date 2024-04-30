import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/modules/userStore'
import { gtka } from '../configs/connectServer'

const routes = [
  {
    path: '/auth',
    name: 'auth',
    meta: {
      isAuthenticated: false
    },
    component: () => import('@/layouts/Auth.vue'),
    children: [
      {
        path: 'login',
        name: 'auth-login',
        component: () => import('@/pages/Auth/Login.vue')
      },
      {
        path: 'signup',
        name: 'auth-signup',
        component: () => import('@/pages/Auth/Register.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/layouts/Home.vue'),
    meta: {
      isAuthenticated: true
    },
    children: [
      {
        path: '',
        name: 'home-chat',
        component: () => import('@/pages/Home/Home.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const token = gtka()
  if (to?.meta.isAuthenticated) {
    if (userStore.user && token) {
      next()
    } else {
      next({ name: 'auth-login' })
    }
  } else {
    if (userStore.user && token && (to.name === 'auth-login' || to.name === 'auth-signup')) {
      next({ name: 'home-chat' })
    } else {
      next()
    }
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/modules/userStore'
import { gtka } from '../configs/connectServer'

const routes = [
  {
    path: '/auth/login',
    name: 'auth-login',
    component: () => import('@/pages/Auth/Login.vue')
  },
  {
    path: '/auth/signup',
    name: 'auth-signup',
    component: () => import('@/pages/Auth/Register.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home/Home.vue'),
    meta: {
      isAuthenticated: true
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'error',
    component: () => import('../pages/Error/Error.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const user = userStore.user
  const token = gtka()

  if (to?.meta.isAuthenticated) {
    if (user && token) {
      next()
    } else {
      next('/auth/login')
    }
  } else if (user && token && (to.path === '/auth/login' || to.path === '/auth/signup')) {
    next('/')
  } else {
    next()
  }
})

export default router
